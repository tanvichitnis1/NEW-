# 27 · Asset Intelligence — what the site was hiding

**Artifact:** https://claude.ai/code/artifact/f540df3a-3275-4701-a8fb-bb67e3a94e82

**Source:** second, deeper client-supplied extract of eov.ae, 1 September 2026,
with classified image and video manifests. Archived at `research/source/`.
Supersedes parts of `26`.

---

## 1 · Inventory

| Class | Count | What it is |
|---|---|---|
| **WORK** | 38 | Real project images |
| LOGO | 26 | Client wall, partner marks, EOV's own marks |
| DECOR_EOV | 17 | Icons, illustrations, section furniture |
| DECOR_STOCK | 8 | Wix and licensed stock |
| **VIDEO_EOV** | **2** | **EOV footage** |
| VIDEO_STOCK | 5 | Wix stock background loops |
| **Total** | **96** | 89 images, 7 videos |

**The find is not the count.** The images kept their **original upload
filenames**, and those filenames name the clients and projects. Nothing on the
rendered page shows this — it sits in alt attributes and Wix media records.

---

## 2 · Two corrections to my own prior conclusions

### 2.1 "No video anywhere" (`26` §7) — wrong
Seven videos exist. Five are Wix stock loops from the shared library account
(`11062b_`), ignorable. **Two are EOV's own** (`747fdf_`):

| Where | Note |
|---|---|
| Home, inside the **OPEC / UAE NIGHT — VIENNA** carousel | **Highest-value asset on the site** |
| Digital Solutions, section background | Content unknown, worth a look |

Invisible to the first pass because Wix names video files with an `f000`
suffix and no `~mv2` marker, and serves the poster frame as a plain `.jpg` —
so to a text reader they look like ordinary images. The extract confirmed them
by resolving poster frames against a control (an invented id of the same shape
returns 403).

### 2.2 "No nameable government case" (`24` §4) — wrong
**Five government clients are corroborated by project photography on EOV's own
site**, not merely a logo wall: **OPEC · DEWA · FCA · Ministry of Economy ·
Economic Department**.

---

## 3 · The named work

| Client / project | Files | Filenames |
|---|---|---|
| **OPEC** | 9 + video | `opec_001` · `opec_160` · `opec_274` · `opec_282` · `opec_316` · `opec_321` · `opec_393` · `Opec-Trophy` + Vienna carousel video |
| Arab SMIS summit | 3 | `arabsmis-0264` · `arabsmis-0293` · `arabsmis-0371` |
| DEWA | 2 | `DEWA, a7_edited` · `DEWA, b5_edited` |
| FCA | 1 | `Smart transformation FCA.jpg` |
| Ministry of Economy | 1 | `MOE-SZ-4.png` |
| Economic Department | 1 | `1000x480_ED_Banner_GITEX15.jpg` — GITEX 2015 |
| SME programme | 1 | `EOV_SME-fullresolution-170050` |
| Montajat · Dubai Challenge · SND · ILF | 4 | Brand, event, app screens, identity |
| Undated but real | 9 | Posters, artboards, a calendar, a platform screen dated Apr 2022, event photos Mar and Apr 2019, one timestamped Jan 2014 |

**Easy to miss:** a logo file named `ESMA-CORPORATE-VIDEO-2.png`. Someone made
a corporate video for ESMA. **It is not on the site.** Ask whether it survives.

---

## 4 · Homepage carousels — missed by the first pass

Three, and the first extract saw none of them:

1. **"WONDERFULL"**, 3 slides — *"with H.E Suhail Mazroui Minister of Energy
   After the successful Organizing of OPEC events"* (typos as published)
2. **"BEST MARKETING AND PROMOTIIONAL BUSINESS AWARD"**, 1 slide (typo original)
3. **"OPEC / UAE NIGHT - VIENNA / Organized by EOV"**, 3 slides — video 1 sits here

Some slides did not survive text conversion. More copy and assets may be in
them; the console dumper on a fully-scrolled homepage is the way to see.

---

## 5 · The OPEC case — drafted, held pending consent

Closes the gap `24` called unclosable. **Four cases now cover all five
segments**, and the government one is photographed and filmed rather than
asserted.

**Slide A** — *UAE Night, Vienna. Organised by EOV.*
> A national event delivered in a foreign capital, in partnership with
> H.E. Suhail Al Mazrouei, Minister of Energy, around the OPEC calendar.

**Slide B** — *Delivered abroad, to a ministerial standard, on a fixed date that could not move.*
> Nothing about this brief allowed a second attempt.

**Needed:** year · what EOV actually delivered (concept, production, guest
management, content?) · rough attendance. Without these the slide states a
fact but proves no capability.

**Consent is the whole question.** OPEC is intergovernmental and the Ministry
federal — naming rules are strict. Draft it, hold it, ship the day Mohamed
confirms.

**Why it earns its place:** it is the only case demonstrating **event delivery
at national-representation level** — precisely what a government or large
institutional buyer scans for, and the one thing Ferronato, Forrey & Galland
and KGS cannot show.

---

## 6 · The ask to Mohamed

Item 1 moves from *"blocking, nothing exists"* to *"blocking, but you can name
what you want."*

1. **Wix Media Manager access or export.** Site copies are web-sized and will
   not fill a slide. Media Manager holds originals at full resolution with
   upload dates, and almost certainly more files than were published.
2. **The OPEC / UAE Night Vienna material** — video, stills, trophy shot, any
   coverage that never made the site.
3. **Named projects:** Arab SMIS summit · DEWA · FCA smart transformation ·
   Ministry of Economy · GITEX 2015 (Economic Department) · Montajat · Dubai
   Challenge · SND · ILF · SME programme. Plus **the ESMA corporate video**.
4. **Consent for five:** OPEC, DEWA, FCA, Ministry of Economy, Economic
   Department. Per client — contracted party or subcontractor, and does the
   contract say anything about naming?
5. **Team facts** — headcount, in-house vs partnered by discipline, Arabic
   capability. **Do not use the site's 400+ figure**; it reads as headcount and
   is qualified as "teams and partnerships".

**Separately, this week:** unpublish the Careers page and the four San
Francisco job posts.

---

## 7 · Loose ends

- **MBR logo id does not resolve** — machine-read, one character wrong. Grab
  by hand from the live page.
- **Unshown carousel slides** may hold further assets.
- **This session cannot fetch any of it.** static.wixstatic.com and
  video.wixstatic.com both return 403 at the proxy. The download script and
  console dumper must run on the client's machine.

---

## 8 · Effect on prior documents

- `26` §7 — "no video anywhere" **wrong**, corrected in place with a pointer here.
- `26` §1 — understated; five clients corroborated by photography, not logos alone.
- `24` §4 — "no nameable government case" **wrong**. OPEC is a real case.
- `25` — deck gains a fourth case, conditional on consent. With the EOV
  platform slide still held, the deck runs 16 slides with OPEC in, 14 without.
- **Client attribution throughout is inferred from filenames**, not confirmed
  against contracts. Consent question in §6.4 settles it.
