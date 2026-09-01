#!/usr/bin/env bash
# Downloads every image AND video from eov.ae at original resolution.
#
# The Referer header below is what defeats Wix hotlink protection. Without it
# video.wixstatic.com returns 403.
#
# Mac: open Terminal, cd into this folder, then:
#   chmod +x download_eov_assets.sh && ./download_eov_assets.sh
# Windows: Git Bash or WSL.

set -u
REF="https://www.eov.ae/"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

mkdir -p eov_assets/work eov_assets/logos eov_assets/decor eov_assets/video

get () { # url  outfile
  curl -fsSL -A "$UA" -e "$REF" --max-time 120 "$1" -o "$2"
}

echo "== IMAGES =="
ok=0; bad=0
tail -n +2 eov_image_manifest.csv | while IFS=, read -r page mid name cls url note; do
  [ -z "${url:-}" ] && continue
  case "$cls" in
    WORK)  dir=work ;;
    LOGO)  dir=logos ;;
    *)     dir=decor ;;
  esac
  ext="jpg"; case "$mid" in *.png|*png) ext="png" ;; esac
  out="eov_assets/$dir/${page}__${mid%%~*}.${ext}"
  [ -f "$out" ] && continue
  if get "$url" "$out"; then echo "ok   $out"; else echo "FAIL $url"; rm -f "$out"; fi
done

echo
echo "== VIDEOS =="
# Tries 1080p, falls back to 720p then 480p. Wix does not keep every quality for every file.
tail -n +2 eov_video_manifest.csv | while IFS=, read -r page mid cls poster v1080 v720 v480 note; do
  [ -z "${mid:-}" ] && continue
  get "$poster" "eov_assets/video/${page}__${mid}_poster.jpg" && echo "ok   poster ${mid}"
  for u in "$v1080" "$v720" "$v480"; do
    q=$(echo "$u" | sed -E 's#.*/([0-9]+p)/.*#\1#')
    if get "$u" "eov_assets/video/${page}__${mid}_${q}.mp4"; then
      echo "ok   video  ${mid} @ ${q}"
      break
    else
      rm -f "eov_assets/video/${page}__${mid}_${q}.mp4"
    fi
  done
done

echo
echo "Done. Files are in ./eov_assets"
echo "  work/   real project images, the ones worth looking at first"
echo "  logos/  client and partner marks"
echo "  decor/  stock and decorative, mostly ignorable"
echo "  video/  posters and mp4s"
echo
echo "Anything that says FAIL is either a misread media id or a file Wix has since removed."
echo "Grab those by hand from the live page: right-click the image, Open image in new tab."
