# -*- coding: utf-8 -*-
import base64, subprocess, os, glob
LOGO = base64.b64encode(open('eov-wordmark-black-sm.png','rb').read()).decode()

CY="#54D2FE"; INK="#111111"; BODY="#5A6068"; MUT="#8A8F98"; GREY="#F4F6F8"; LINE="#E3E7EB"

SHEETS = [
 dict(slug="luxury-retail", sector="Luxury · retail · direct to consumer",
   head="Every rival sold protection.<br>Ferronato sold discretion.",
   lead="A fourth-generation Swiss group with thirty years of privacy technology in defence and aerospace entered the consumer market for the first time. Every brand already in the category sold protection to people who felt threatened. EOV positioned the other way.",
   stats=[("300k+","Visitors at the Expo debut"),("May 2023","First boutique"),("1906","Founded in Lugano")],
   detail=[("The decision","Privacy as a product, not a promise. Sleeves, pouches, totes and briefcases in metallised fabric — the benefit is physical, which is what made it provable."),
           ("The launch","Global debut at the Swiss Pavilion, Expo 2020 Dubai. One brand system across boutique, campaign and atelier, plus three festive films."),
           ("The limit","Organic search was never the channel for this category and was not treated as one. A category-first launch is measured in coverage and doors.")],
   caseline="Ferronato KGS Group · Lugano · 16 countries · 100+ markets",
   imgs=["ferronato-store.png","ferronato-campaign.png","ferronato-atelier.png"]),
 dict(slug="retail-food", sector="Retail · food · consumer",
   head="Search visibility up 3.4×,<br>with no paid media.",
   lead="A Parisian chocolate house founded in the 1900s, reintroduced to the Gulf and trading from The Dubai Mall. Visibility was built structurally rather than bought, across a calendar that never repeats.",
   stats=[("75 → 254","Ranking keywords"),("Zero","Paid search"),("1,510","Peak monthly visits")],
   detail=[("The decision","The calendar is the strategy. Ramadan, Eid al-Fitr, Eid al-Adha and Diwali each run as a full programme of product, photography, campaign, events and retail."),
           ("The constraint","The lunar calendar moves roughly eleven days a year, so nothing carries over. The plan is rebuilt annually rather than repeated."),
           ("The limit","Growth here was bought with structure, not budget. That is a slower route than paid media and it was chosen deliberately.")],
   caseline="Forrey &amp; Galland · founded Paris, 1900s · The Dubai Mall",
   imgs=["fg-kinara-4.png","ceylon-range.png","retail-activation.png"]),
 dict(slug="industrial-b2b", sector="Industrial · technical B2B · export",
   head="Marketing a material that<br>shields naval vessels.",
   lead="MetaFab® is a metallised fabric attenuating EMF, EMI and RF at material level — no power supply, no enclosure. It is sold to engineers and procurement teams working to specification, on cycles measured in quarters.",
   stats=[("17 → 96","Ranking keywords"),("5.6×","Organic visibility"),("40–90 dB","Material-level shielding")],
   detail=[("The decision","Learn the specification first. The content and search architecture were built around how engineers actually look for shielding performance — by decibel rating and application, not by brand."),
           ("The applications","Naval vessels, aircraft wiring systems, secure courtrooms and industrial installations."),
           ("The limit","This is a long-cycle, specification-led sale. Consumer tactics do not move it, and were not used.")],
   caseline="KGS · MetaFab® · India and the Middle East",
   imgs=["[application]","[material detail]","exhibition-stand.png"]),
]

TPL = '''<!doctype html><html><head><meta charset="utf-8">
<style>
@page {{ size: 794px 1123px; margin: 0; }}
html,body {{ margin:0; padding:0; }}
body {{ width:794px; height:1123px; font-family: Arial, Helvetica, sans-serif; color:{INK};
        position:relative; background:#fff; }}
.pad {{ position:absolute; left:56px; right:56px; }}
.eyebrow {{ font-size:10px; font-weight:700; letter-spacing:2.6px; text-transform:uppercase; color:{MUT}; }}
h1 {{ font-size:34px; line-height:41px; font-weight:700; margin:16px 0 0; letter-spacing:-0.6px; }}
.lead {{ font-size:13.5px; line-height:21px; color:{BODY}; margin-top:18px; }}
.stats {{ display:flex; gap:34px; margin-top:26px; padding-top:22px; border-top:1px solid {LINE}; }}
.stat .v {{ font-size:27px; font-weight:700; letter-spacing:-0.6px; }}
.stat .k {{ font-size:8.5px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase;
            color:{MUT}; margin-top:6px; line-height:12px; width:150px; }}
.band {{ background:{GREY}; border-radius:10px; margin-top:26px; padding:22px 24px; }}
.row {{ display:flex; gap:18px; margin-bottom:16px; }}
.row:last-child {{ margin-bottom:0; }}
.row .lab {{ font-size:9px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase;
             color:{MUT}; width:88px; flex:none; padding-top:2px; }}
.row .txt {{ font-size:12.5px; line-height:19px; color:{BODY}; }}
.dark {{ background:{INK}; border-radius:10px; margin-top:22px; padding:22px 24px; color:#fff; }}
.dark .k {{ font-size:9px; font-weight:700; letter-spacing:2.2px; text-transform:uppercase; color:{CY}; }}
.dark p {{ font-size:12.5px; line-height:19px; color:#C9CED4; margin:10px 0 0; }}
.imgband {{ display:flex; gap:8px; margin-top:22px; }}
.imgband div {{ flex:1; height:186px; background:{GREY}; border-radius:10px;
   display:flex; align-items:center; justify-content:center;
   font-size:8.5px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; color:#B9BEC5; }}
.foot {{ position:absolute; left:56px; right:56px; bottom:48px; display:flex;
         justify-content:space-between; align-items:flex-end; border-top:1px solid {LINE}; padding-top:16px; }}
.foot .c {{ font-size:11.5px; line-height:18px; color:{BODY}; }}
.foot .c b {{ color:{INK}; }}
img.wm {{ width:62px; }}
.caseline {{ font-size:10px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase;
             color:{MUT}; margin-top:14px; }}
</style></head><body>
<div class="pad" style="top:56px">
  <div class="eyebrow">{sector}</div>
  <h1>{head}</h1>
  <div class="caseline">{caseline}</div>
  <div class="lead">{lead}</div>
  <div class="stats">{stats}</div>
  <div class="band">{detail}</div>
  <div class="dark">
    <div class="k">How EOV works</div>
    <p>Success defined before spend · measurement built before launch · accounts built in the client's name.
       An Emirati-founded integrated marketing agency in Abu Dhabi and Dubai, working in the UAE since 2006.</p>
  </div>
  <div class="imgband">{imgband}</div>
</div>
<div class="foot">
  <div class="c"><b>[NAME], [TITLE]</b><br>[EMAIL] · [PHONE]<br>eov.ae · Abu Dhabi · Dubai</div>
  <img class="wm" src="data:image/png;base64,{LOGO}">
</div>
</body></html>'''

for s in SHEETS:
    stats = ''.join(f'<div class="stat"><div class="v">{v}</div><div class="k">{k}</div></div>' for v,k in s['stats'])
    detail = ''.join(f'<div class="row"><div class="lab">{l}</div><div class="txt">{t}</div></div>' for l,t in s['detail'])
    imgband = ''.join(f'<div>{i}</div>' for i in s['imgs'])
    html = TPL.format(INK=INK, BODY=BODY, MUT=MUT, GREY=GREY, LINE=LINE, CY=CY, LOGO=LOGO,
                      sector=s['sector'], head=s['head'], lead=s['lead'],
                      caseline=s['caseline'], stats=stats, detail=detail, imgband=imgband)
    open(f"{s['slug']}.html",'w').write(html)
    print('wrote', s['slug'])
