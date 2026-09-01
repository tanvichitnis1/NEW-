# EOV asset tools

## Why these exist

`download_eov_assets.sh` (supplied with the website extract) has a bug: it
splits the manifest with `IFS=,`, so any row with a comma inside a quoted
field is misparsed. Three rows are affected, including **both DEWA images** —
the script reads `WORK` as the URL and files them under `decor/`.

`eov_fetch_triage.py` replaces it, and answers the question that actually
matters: **not "can we download these" but "which of these can fill a slide".**
Wix never upscales, so anything uploaded small stays small.

## Usage

Needs Python 3 and nothing else — no `pip install`. Present by default on macOS.

```bash
cd tools
python3 eov_fetch_triage.py
```

Both manifests are in this folder already.

## What it does

1. Downloads all 89 images and the 2 EOV videos, sending the `Referer` header
   that defeats Wix hotlink protection. Wix stock videos are skipped.
2. Reads **true pixel dimensions** from each file's header — no ImageMagick,
   no Pillow.
3. Sorts into `eov_assets/work`, `/logos`, `/decor`, `/video`.
4. Writes `eov_asset_report.csv` and prints a summary.

## The summary that matters

Only WORK images are counted, bucketed by long edge:

| Bucket | Long edge | Means |
|---|---|---|
| **slide-ready** | ≥ 1600px | Safe full-bleed on a 16:9 slide |
| **usable** | 900–1599px | Fine inset, in a grid, or supporting |
| **too-small** | < 900px | Web thumbnail. Not usable. |

**If slide-ready comes back low, the Wix Media Manager originals are the
answer.** These are the web-sized copies the page serves.

Re-running is safe — existing files are skipped, so it resumes.

## Note

None of this can run from the Claude session. This environment's network
policy denies all direct outbound HTTP from the shell (`example.com` is denied
identically to `wixstatic.com`), so every download has to happen on a machine
with normal internet access.
