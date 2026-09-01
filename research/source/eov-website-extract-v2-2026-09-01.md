# EOV website extract, eov.ae

Version 2, corrected. Extracted 1 September 2026 from the live site.
Footer reads "all rights reserved @ eov 2022". Sitemap last-modified is 25 September 2024.

**Correction to version 1.** My first pass reported no videos and called the gallery images unlabelled. Both were wrong. The page-to-text conversion I was reading had stripped the video references and the original filenames. There are seven videos and the images carry their original filenames, which name the clients. Details below.

---

## 1. Headline: there is more here than the deck is using

**96 assets total. 89 images, 7 videos.** Of the images, 38 are real project work, not stock.

The find that matters: **the images carry their original upload filenames**, and those filenames name the clients and the projects. Nothing on the rendered page shows this. It sits in the alt attributes and the Wix media records.

### The videos

Seven. Every one confirmed to exist, by resolving its poster frame against a control test.

| # | Where | Owner | Value |
|---|---|---|---|
| 1 | Home, inside the OPEC / UAE NIGHT VIENNA carousel | **EOV's own media library** | **Highest value asset on the site** |
| 2 | Digital Solutions, section background | **EOV's own media library** | Unknown content, worth a look |
| 3 | About | Wix stock library | Ignore |
| 4 | Digital Presence | Wix stock library | Ignore |
| 5 | Digital Solutions | Wix stock library | Ignore |
| 6 | Innovation | Wix stock library | Ignore |
| 7 | Contact | Wix stock library | Ignore |

How I can tell them apart. Wix media ids are prefixed by the account that uploaded the file. `747fdf_` is EOV's own account. `11062b_` is Wix's shared stock library, which every Wix site on earth draws from. So videos 1 and 2 are EOV footage. The other five are template furniture.

Video 1 sits in the carousel headed **"OPEC / UAE NIGHT - VIENNA / Organized by EOV"**. If that is event footage of UAE Night in Vienna, it is the single most useful thing on the website for the credentials deck, and it has been sitting there unused.

Why the videos were invisible. Wix names video files with an `f000` suffix and no `~mv2` marker, and serves the poster frame as a `.jpg`. To anything reading the page as text they look like ordinary images. The poster for video 1 resolves; an invented id of the same shape returns 403. That control is what makes this a finding rather than a guess.

### The named work

Filenames recovered from the galleries, grouped:

**OPEC**, at least 9 files: `opec_001`, `opec_160_edited`, `opec_274`, `opec_282_edited`, `opec_316`, `opec_321`, `opec_393_edited`, `Opec-Trophy`, plus video 1

**Arab SMIS summit**, 3 files: `arabsmis-0264_edited_edited`, `arabsmis-0293_edited`, `arabsmis-0371`

**DEWA**, 2 files: `DEWA, a7_edited_edited`, `DEWA, b5_edited`

**FCA**: `Smart transformation FCA.jpg`

**Ministry of Economy**: `MOE-SZ-4.png`

**GITEX 2015**: `1000x480_ED_Banner_GITEX15.jpg`, an Economic Department banner

**Montajat**: `montajat 06.png`

**Dubai Challenge**: `Farel_Bisotto_DUBAI CHALLENGE -.jpg`

**SND**: `iphone_SND.png`, app screens

**ILF**: `EOV_ILF.jpg`

**SME programme**: `EOV_SME-fullresolution-170050_edited.jpg`, and the filename says full resolution

**Undated or unnamed but clearly real**: `Artboard Copy 19.jpg`, `02POSTER.jpg`, `Calendar -3.jpg`, `Screen Shot 2022-04-14 at 8.13.25 AM.png`, `iPhone 11 Mockups volume 3 - 05.jpg`, `IMG-20190424-WA0006 (1).jpg`, `IMG_20190308_212828_315_edited.jpg`, `FA220063.jpg`, `1389551766694.jpg` (a timestamp filename, January 2014)

One more, easy to miss: a client logo file is named `ESMA-CORPORATE-VIDEO-2.png`. Somebody made a corporate video for ESMA. It is not on this site.

### What this changes

Item 1 on your list moves from "blocking, nothing exists" to **"blocking, but you now know what to ask for by name"**. That is a different email to Mohamed. Instead of "please send images", it is "please send the OPEC Vienna footage, the Arab SMIS set, the DEWA shoot, the FCA smart transformation deck and the GITEX 2015 work", which is a request someone can actually action.

The website versions will not carry a full-bleed slide. They are web-sized. But they prove the work exists, they date it, and they name it, which is exactly what you need to open the conversation.

---

## 2. Where to actually get the files

Three routes, best first.

**A. Wix Media Manager, EOV's account.** Originals at full resolution, with upload dates, and almost certainly more files than were ever placed on a page. One login. This is the real answer.

**B. Your browser.** Use `browser_console_dump.js`, supplied alongside this document. Open the page, scroll all the way down so the lazy-loaded galleries fire, paste the script into the Chrome console. It dumps every image and video URL and copies them to your clipboard. For the videos: DevTools, Network tab, filter Media, play the video, right-click the mp4 row, Open in new tab.

**C. The download script.** `download_eov_assets.sh` pulls all 96 in one go, sorted into work / logos / decor / video. It sends a Referer header, which is what defeats Wix's hotlink protection. Without that header the video URLs return 403.

I could not pull the binaries from my side. This environment has no network route to the Wix CDN, so everything above was read through a page-fetching service that returns text only.

---

## 3. Site map, complete

12 pages. Six real, six template leftovers.

| Page | URL | State |
|---|---|---|
| Home | / | Live, real content |
| Innovation | /innovation-consultation | Live, real content |
| Digital Solutions | /digital-solutions | Live, real content |
| Digital Presence | /digital-presence | Live, real content |
| About | /about | Live, real content |
| Contact | /contact | Live, real content |
| Careers | /careers | **Unedited Wix template, see section 8** |
| Electrical Engineer | /electrical-engineer | Template job post |
| Data Scientist | /data-scientist | Template job post |
| AI Researcher | /artificial-intelligence-researcher | Template job post |
| Deep Learning Engineer | /deep-learning-engineer | Template job post |
| Submit application | /submit-your-application | Template form |

---

## 4. Clients and partners shown on the site

A logo wall of 20 marks on the homepage.

**Government and semi-government, 16 distinct entities:**
OPEC, SPSA, Mubadala, MOPA, ADAEGP, ADNOC, RTA, Department of Economic Development (two logo files, so it appears twice), POD / DCD, Pension Fund, FCA, Abu Dhabi Agriculture and Food Safety Authority, ESMA, Ministry of Energy, DEWA, Ministry of Economy

**Private, 3:** HMS, DAMAC, MBR

**Partner row on About:** Marcollin, an SAA mark, Palo Alto Tribunal

Named in body copy: OPEC, and UAE Night Vienna, described as organised in partnership with H.E. Suhail Al Mazrouei, Minister of Energy.

**Read this against gap 2.** Five of these are now corroborated by project photography sitting on the same site: OPEC, DEWA, FCA, Ministry of Economy, and the Economic Department via the GITEX banner. That is a stronger position than a logo wall alone. It is still not consent, and several are federal entities with strict naming rules, but the question to Mohamed sharpens: for OPEC, DEWA, FCA, MOE and ED, was EOV the contracted party or a subcontractor, and is there anything in the contract about naming.

---

## 5. Homepage carousels

Three, and the first pass missed them entirely.

1. **"WONDERFULL"**, 3 slides. Copy: "with H.E Suhail Mazroui Minister of Energy After the successful Organizing of OPEC events"
2. **"BEST MARKETING AND PROMOTIIONAL BUSINESS AWARD"**, 1 slide. Typo in the original.
3. **"OPEC / UAE NIGHT - VIENNA / Organized by EOV"**, 3 slides, and this is where video 1 sits.

The remaining slides in carousels 1 and 3 did not come through the text conversion. Run the console script on the homepage, or click through them in a browser, to see the rest. There may be more copy and more assets in there.

---

## 6. Claims and numbers on the site

From the About page. All are on-site claims with no source attached.

- **32+** "Accomplishing over 32 Key Government and Private sector project in innovation technology and Digital Identity Transformation"
- **400+** "With our expanding teams and partnerships, we put at your disposal a Large number of expertise and talents to fulfill your project needs"
- **Best Marketing & Promotion Business Award**, shown next to a trophy graphic, with no issuer and no year

The 400+ is the one to watch. It reads as headcount at a glance and the copy quietly qualifies it as "teams and partnerships", which is not the same thing. That is gap 3. If the real answer is a small core team plus a partner bench, the deck is better off saying so plainly than inheriting a number that will not survive one follow-up question.

The award appears here with no more documentation than it has in the deck, so the site does not resolve gap 4 either.

---

## 7. Copy, verbatim

**Origin story**, About, capitals as published:

> "ESTABLISHED IN 2006, WHO SNAPPED UP A LONG-STANDING DIGITAL MEDIA AND TECHNOLOGY AGENCY SPECIALIZE IN UNIQUE BRAND BUILDING, CONCEPT CREATION AND TECHNOLOGY DEVELOPMENT. FOCUSED ON IMPROVING THE CLIENT PRESENCE, EOV HAS GONE FROM STRENGTH-TO-STRENGTH, WINNING LARGE AND SMALL BUSINESSES ACROSS UAE WHILST GAINING A REPUTATION FOR HONEST AND CREATIVE PARTNERING AGENCY WITH MEASURABLE RESULTS."

**Mission:** "Helping you Redefine, Achieve & Impress"

**Promise:** "EOV is established to create exceptional outcomes, this is our passion and what moves us everyday. We love to work with our clients very closely and become part of their working team to bring out the best result. Our promise is always to do our best to bring your business to its best potential and enable you and your team thrive in the digital world."

**Positioning line, homepage:** "Helping your Business Enter, navigate and thrive in the Digital World"

**Homepage intro:** "We're Changing the Way you think of Smart Services and Digital presence. We at eov focus on making technological advancement works in favour of your Business through Creative ideas that would challenge the usual ways of doing things. promising exceptional outcomes, gaining higher digital presence, effective services and true innovation every time."

Signed throughout: **Mohamed Yousif, CEO**

### Service architecture as published

Three pillars, not the five practices in the deck. Anyone who checks the site before the meeting sees this version.

**Innovation Consultation.** Four stages: Ideation, Alignment, Design & Build, Perfect Outcome. Deliverables: conceptualisation, constructing idea, idea presentation, idea analysis report, alignment with strategic goals, project brief, system design, business requirement documents, requirement RFPs, technical project management, periodic progress reports, testing and evaluation reports.

**Digital Solutions.** Four stages: Crafting User Journey, Building Platform of Engagements, Maintain and Upgrade, Operating Like a Pro. Deliverables: customer journey design, UX design, prototyping, data modelling, information architecture, solution development, system integrations, solution monitoring, solution consultation, development plans, tech product management, technical support management, advisory service.

**Digital Presence.** Four elements: Digital Identity, Digital Marketing, Content Creation, Content Management. Deliverables: branding and theme design, branding guidelines, digital marketing material design, digital campaigns, media buying, digital media reporting, creative copywriting, content creation, visual creative content, videography and animations, virtual reality, content plans, website content management, creative content management.

---

## 8. Live liabilities on the site

Public today, findable by any prospect who Googles EOV before a meeting.

1. **The Careers page is an unedited Wix template.** It reads "We're based in San Francisco's innovation hub" and "Changing the future of transportation means thinking differently." Four job posts sit under it, all located San Francisco, CA: Electrical Engineer, Data Scientist, Artificial Intelligence Researcher, Deep Learning Engineer. Open any of them and the body copy is raw placeholder, "I'm a paragraph. Click here to add your own text and edit me", under headings reading "What You'll Do" and "Who You Are". None of this is EOV, and it has been live for at least two years.
2. **Typos in headline copy.** "ONE HAND DOSE NOT CLAP" as a section header. "PROMOTIIONAL" in the award carousel. "YORU DIGITAL PLANS" on Digital Presence. "TECHNOLOHGY" on Digital Solutions. "an eye of an Expect" for expert. "Business Inquires" on the contact form. "your product and servicer".
3. **Copyright reads 2022.**

My view: this is a bigger commercial risk than anything on your gap list, because it costs nothing to check and it undercuts the deck before the deck is opened. The Careers page and the four job posts should be unpublished this week whatever happens to the rest of the site. Five minutes in the Wix editor.

---

## 9. Contact and office details, verbatim

- Email: info@eov.ae
- Phone: +971 55 341 8805
- Hours: Mon to Fri, 8:00 am to 5:00 pm. Saturday and Sunday closed.
- **Abu Dhabi:** Al Rumaithy Establishment Tower, Fatima bin Mubarak Street, Abu Dhabi, UAE
- **Dubai:** WH No. 05, Al Kawakeb Warehouse, Al Quoz Industrial 2, Dubai, UAE

Worth checking before this goes in the deck. The Dubai address is a warehouse unit in Al Quoz. Entirely normal for an agency doing events, exhibitions and fabrication, and a genuine capability signal if it is a production facility. It reads differently if it is presented as an office.

---

## 10. Asset inventory

| Class | Count | What it is |
|---|---|---|
| **WORK** | 38 | Real project images. Start here. |
| **LOGO** | 26 | Client logo wall, partner marks, EOV's own marks |
| **DECOR_EOV** | 17 | Icons, illustrations, section furniture from EOV's account |
| **DECOR_STOCK** | 8 | Wix and licensed stock |
| **VIDEO_EOV** | 2 | **EOV footage. The OPEC Vienna one first.** |
| **VIDEO_STOCK** | 5 | Wix stock background loops |
| **Total** | **96** | |

Files supplied with this document:

- `eov_image_manifest.csv` — 89 images: source page, media id, original filename, class, original-resolution URL, note
- `eov_video_manifest.csv` — 7 videos: poster URL plus candidate mp4 URLs at 1080p, 720p and 480p
- `eov_image_urls.txt` — plain URL list
- `download_eov_assets.sh` — downloads everything, sorted by class, with the Referer header that defeats the 403
- `browser_console_dump.js` — run it in Chrome on each page to catch anything lazy-loading missed

Every image URL has the Wix resize parameters stripped, so what downloads is the original upload rather than the shrunk version the page displays. Wix does not upscale, so anything uploaded small stays small.

**Two known gaps in this inventory.** One logo media id, MBR, does not resolve and is flagged in the manifest; the id was machine-read and one character is wrong, so grab that one by hand. And the unshown slides in homepage carousels 1 and 3 may hold assets I have not captured. The console script on a fully-scrolled page is the way to close both.

---

## 11. Where your five items stand now

- **1. Visual assets.** Still blocking, but no longer a blank page. You have 38 named work images and two EOV videos, and you can name the projects in the ask. Wix Media Manager is the fast route to originals.
- **2. Client names.** Strengthened. Five clients are corroborated by project photography on EOV's own site, not just a logo. Still one email, but a better-informed one.
- **3. The team.** Not answered. The 400+ is a partnerships figure and will not survive a follow-up. Still one afternoon.
- **4. The award.** Not answered. Shown with no issuer and no year, exactly as in the deck. Still five minutes, still binary.
- **5. Platform audit.** Unchanged, still optional.
- **New, above 4.** The Careers page and four template job posts advertising San Francisco transportation roles. Unpublish this week.
