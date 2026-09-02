# Image placement map

Every dashed field in the deck names the Drive file that belongs in it.
Source: `deck2026/` in the shared Drive folder.

| Slide | Field | Drive file |
|---|---|---|
| 01 Cover | full bleed | `eov-opec-vienna.jpg` |
| 02 Who we are | right half | `mohamed-yousif.png` or a team shot |
| 07 Forrey & Galland · context | band | `fg-kinara-1.png` |
| 08 F&G · case | right half | `ceylon-range.png` |
| 09 F&G · gallery | 3 frames | `fg-kinara-4.png` · `fg-kinara-2.png` · `retail-activation.png` |
| 10 F&G · calendar | 4 frames | `hatta-ramadan.png` · `uae-national-day.png` · 2 more occasions |
| 11 Bridge | left / right | `exhibition-stand.png` · `ferronato-product.png` |
| 12 KGS · case | right half | `ferronato-product.png` (or a KGS application shot) |
| 13 KGS · gallery | 3 frames | **needed** — vessel, aircraft wiring, material detail |
| 14 Ferronato · case | right half | `ferronato-store.png` |
| 15 Ferronato · gallery | 3 frames | `ferronato-store.png` · `ferronato-campaign.png` · `ferronato-atelier.png` |
| 16 Ferronato · films | 3 frames | **needed** — stills from the three festive films |
| 17 OPEC · context | band | `eov-opec-minister.jpg` |
| 18 OPEC · case | right half | `eov-opec-vienna.jpg` |
| 19 OPEC · gallery | 3 frames | `eov-opec-vienna.jpg` · **needed** · `eov-opec-minister.jpg` |
| 20 The close | left half | the Vienna film, or `eov-opec-minister.jpg` |
| 21 Selected projects | 10 tiles | **needed** — one per project |
| 24 Disciplines | — | no image |
| 27 The team | 4 portraits | `mohamed-yousif.png` + three more |
| 29 Close | — | `brand-band.jpg` if a background is wanted |

Also available and unplaced: `hatta-packaging.png`, `island-ceylon.png`,
`walkway-kiosk.png`, `kiosk-interior.jpg`, `lootah-interior.png`,
`retail-unit-build.png`, `comvita-ecom.png`, `dmc-publication.png`,
`award-ceremony.png`, `identity-applied.jpg`, `digital-band.jpg`,
`dot-matrix.png`, `eov-ring.png`.

## Still needed

- KGS application photography (vessel, aircraft wiring, material)
- Stills from the three festive films
- Project images for the ten selected projects
- Three further team portraits

---

## Image transfer — status, 2 Sep 2026

The Drive folder `deck2026/` (38 files, 28.6 MB) is readable through the Google Drive
connector, but the connector returns file bytes as base64 **inline**. There is no path
to disk that does not route the whole payload through the conversation twice, and all
direct HTTP is refused at the proxy (`drive.google.com` and `drive.usercontent.google.com`
both return `CONNECT tunnel failed, response 403`, same as every other host).

Two files were pulled and inspected:

| File | Size | Verdict |
|---|---|---|
| `eov-opec-vienna.jpg` | 24 KB | **Unusable.** 1920×1080, degenerate Huffman tables and an all-zero scan — a solid black frame extracted by FFmpeg (`Lavc58.54.100` in the header). Not a photograph. |
| `fmcg-half.jpg` | 23 KB | Real photographic content, but only 980×360 — a web crop, too small for a 1280×720 stage. |

That is the shape of the problem: everything small enough to move is a low-resolution
web crop or a blank frame, and every genuinely slide-grade file — `ferronato-store.png`,
`ferronato-campaign.png`, `ferronato-product.png`, `eov-opec-minister.jpg`,
`ceylon-range.png`, `hatta-ramadan.png`, `uae-national-day.png`, `exhibition-stand.png`,
`retail-activation.png`, `fg-kinara-1.png` — sits between 0.4 MB and 4 MB.

Filling the deck with 980px crops would cost more than the labelled fields do. So the
fields stay labelled, and the images go in directly.

### Dropping the images in

Every image field in the PPTX is a rounded rectangle labelled with its filename.
In PowerPoint or Keynote: right-click the shape → **Change Picture** → pick the file
from `deck2026/`. The shape keeps its position, size and 10px radius; only the fill
changes. Nothing else in the deck moves.

Alternatively, commit the files to `deck-pptx/assets/` in this repo and the build
script can place them programmatically — `img()` in `build.js` becomes
`s.addImage({ path, x, y, w, h, sizing:{ type:"cover" } })` and the deck rebuilds
end to end.

**Check `eov-opec-vienna.jpg` before using it.** As it stands in Drive it is a black frame.
