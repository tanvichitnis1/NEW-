#!/usr/bin/env python3
"""
Download every EOV website asset and triage it by real pixel size.

Why this exists: the question is not "can we download these" but "which of
these can actually fill a slide". Wix never upscales, so anything uploaded
small stays small. This fetches everything, reads true dimensions from the
file headers, and sorts the result into slide-ready / usable / too-small.

Python 3, standard library only. No pip install. Works on macOS out of the box.

USAGE
    Put this file in the same folder as eov_image_manifest.csv and
    eov_video_manifest.csv, then:

        python3 eov_fetch_triage.py

    Output lands in ./eov_assets/ and a report at ./eov_asset_report.csv
"""

import csv, io, os, ssl, sys, struct, urllib.request, urllib.error
from pathlib import Path

REFERER = "https://www.eov.ae/"          # defeats Wix hotlink protection
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

SLIDE_READY = 1600      # px on the long edge: safe for a full-bleed 16:9 slide
USABLE      = 900       # px: fine inset, in a grid, or as a supporting image

OUT = Path("eov_assets")
CTX = ssl.create_default_context()


def fetch(url, timeout=120):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": REFERER})
    with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
        return r.read()


def dimensions(buf):
    """Return (width, height) from raw bytes. Header parsing only, no deps."""
    # PNG
    if buf[:8] == b"\x89PNG\r\n\x1a\n" and buf[12:16] == b"IHDR":
        return struct.unpack(">II", buf[16:24])
    # GIF
    if buf[:6] in (b"GIF87a", b"GIF89a"):
        return struct.unpack("<HH", buf[6:10])
    # WebP
    if buf[:4] == b"RIFF" and buf[8:12] == b"WEBP":
        if buf[12:16] == b"VP8X":
            w = int.from_bytes(buf[24:27], "little") + 1
            h = int.from_bytes(buf[27:30], "little") + 1
            return w, h
        if buf[12:16] == b"VP8 ":
            return struct.unpack("<HH", buf[26:30])
        if buf[12:16] == b"VP8L":
            b0 = int.from_bytes(buf[21:25], "little")
            return (b0 & 0x3FFF) + 1, ((b0 >> 14) & 0x3FFF) + 1
    # JPEG: walk the segments to a Start-Of-Frame marker
    if buf[:2] == b"\xff\xd8":
        i, n = 2, len(buf)
        while i < n - 9:
            if buf[i] != 0xFF:
                i += 1
                continue
            m = buf[i + 1]
            if m in (0xD8, 0x01) or 0xD0 <= m <= 0xD7:
                i += 2
                continue
            seglen = struct.unpack(">H", buf[i + 2:i + 4])[0]
            # SOF0-SOF15, excluding DHT(C4), JPG(C8), DAC(CC)
            if 0xC0 <= m <= 0xCF and m not in (0xC4, 0xC8, 0xCC):
                h, w = struct.unpack(">HH", buf[i + 5:i + 9])
                return w, h
            i += 2 + seglen
    return None, None


def bucket(w, h):
    if not w:
        return "unknown"
    long_edge = max(w, h)
    if long_edge >= SLIDE_READY:
        return "slide-ready"
    if long_edge >= USABLE:
        return "usable"
    return "too-small"


def read_manifest(path):
    """csv module, not a naive split — several rows have commas inside quotes."""
    if not Path(path).exists():
        print(f"  ! {path} not found, skipping")
        return []
    with open(path, newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def do_images(rows, report):
    print(f"\n== IMAGES ({len(rows)}) ==")
    for r in rows:
        url = (r.get("original_url") or "").strip()
        cls = (r.get("class") or "OTHER").strip()
        mid = (r.get("media_id") or "").strip()
        if not url:
            continue
        folder = {"WORK": "work", "LOGO": "logos"}.get(cls, "decor")
        ext = "png" if mid.lower().endswith("png") else "jpg"
        stem = mid.split("~")[0] or "asset"
        dest = OUT / folder / f"{r.get('page','')}__{stem}.{ext}"
        dest.parent.mkdir(parents=True, exist_ok=True)

        if dest.exists():
            data = dest.read_bytes()
        else:
            try:
                data = fetch(url)
                dest.write_bytes(data)
            except Exception as e:
                print(f"  FAIL {stem[:28]:30} {e}")
                report.append({"kind": "image", "page": r.get("page", ""),
                               "class": cls, "original_filename": r.get("original_filename", ""),
                               "file": "", "width": "", "height": "", "kb": "",
                               "bucket": "FAILED", "note": str(e), "url": url})
                continue

        w, h = dimensions(data)
        b = bucket(w, h)
        kb = round(len(data) / 1024)
        flag = {"slide-ready": "++", "usable": " +", "too-small": " -"}.get(b, " ?")
        print(f"  {flag} {str(w or '?'):>5}x{str(h or '?'):<5} {kb:>6}kB  {cls:<5} "
              f"{(r.get('original_filename') or stem)[:44]}")
        report.append({"kind": "image", "page": r.get("page", ""), "class": cls,
                       "original_filename": r.get("original_filename", ""),
                       "file": str(dest), "width": w or "", "height": h or "",
                       "kb": kb, "bucket": b, "note": r.get("note", ""), "url": url})


def do_videos(rows, report):
    print(f"\n== VIDEOS ({len(rows)}) ==")
    (OUT / "video").mkdir(parents=True, exist_ok=True)
    for r in rows:
        mid = (r.get("media_id") or "").strip()
        if not mid:
            continue
        cls = (r.get("class") or "").strip()
        if cls == "VIDEO_STOCK":
            print(f"  skip  {mid[:24]}  (Wix stock)")
            continue

        poster = (r.get("poster_url") or "").strip()
        if poster:
            try:
                (OUT / "video" / f"{mid}_poster.jpg").write_bytes(fetch(poster))
            except Exception:
                pass

        for key in ("video_1080p", "video_720p", "video_480p"):
            u = (r.get(key) or "").strip()
            if not u:
                continue
            q = key.split("_")[-1]
            dest = OUT / "video" / f"{r.get('page','')}__{mid}_{q}.mp4"
            try:
                data = fetch(u, timeout=600)
            except Exception:
                continue
            dest.write_bytes(data)
            mb = round(len(data) / 1048576, 1)
            print(f"  ++ {q:>6}  {mb:>6} MB  {dest.name}")
            report.append({"kind": "video", "page": r.get("page", ""), "class": cls,
                           "original_filename": "", "file": str(dest),
                           "width": q, "height": "", "kb": round(len(data) / 1024),
                           "bucket": "video", "note": r.get("note", ""), "url": u})
            break
        else:
            print(f"  FAIL  {mid[:24]}  no quality resolved")


def main():
    report = []
    do_images(read_manifest("eov_image_manifest.csv"), report)
    do_videos(read_manifest("eov_video_manifest.csv"), report)

    cols = ["kind", "page", "class", "original_filename", "file",
            "width", "height", "kb", "bucket", "note", "url"]
    with open("eov_asset_report.csv", "w", newline="", encoding="utf-8") as f:
        wtr = csv.DictWriter(f, fieldnames=cols)
        wtr.writeheader()
        wtr.writerows(report)

    work = [r for r in report if r["class"] == "WORK"]
    def count(b, rows=work):
        return sum(1 for r in rows if r["bucket"] == b)

    print("\n" + "=" * 62)
    print("WORK IMAGES — the only ones that matter for the deck")
    print(f"  slide-ready  (long edge >= {SLIDE_READY}px)   {count('slide-ready'):>3}")
    print(f"  usable       ({USABLE}-{SLIDE_READY-1}px)            {count('usable'):>3}")
    print(f"  too small    (< {USABLE}px)                {count('too-small'):>3}")
    print(f"  failed                              {count('FAILED'):>3}")
    print(f"\n  videos saved  {sum(1 for r in report if r['kind']=='video'):>3}")
    print("=" * 62)
    print("\nFull detail in eov_asset_report.csv. Sort by bucket, then by class.")
    print("If slide-ready is low, the Wix Media Manager originals are the answer —")
    print("these are the web-sized copies, and Wix never upscales.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(1)
