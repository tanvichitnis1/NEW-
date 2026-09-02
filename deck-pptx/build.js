const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";                    // 13.3 x 7.5
p.author = "EOV"; p.company = "EOV"; p.title = "EOV Credentials";

const W = 13.3, H = 7.5, M = 0.85;
const PAPER="F2EDE4", INK="2A2118", ACC="8A6A3A", MUT="6E6355", RULE="D9D1C2", TINT="E7E0D3";
const DBG="221B14", DINK="EFE8DA", DMUT="A4988A", DACC="C29A5C", DRULE="3A3026";
const SER="Cambria", SAN="Calibri";

// ---- FIXED CASE GEOMETRY. Every case slide uses these. Nothing drifts. ----
const CX = M, CW = 6.15;                     // left copy column
const IX = 7.65, IY = 1.05, IW = 4.8, IH = 5.4;   // right image area
const Y_TITLE = 1.05, Y_CHAL = 2.62, Y_DID = 4.02, Y_RES = 5.42;

let n = 0;
function slide(dark){
  n++;
  const s = p.addSlide();
  s.background = { color: dark ? DBG : PAPER };
  if (n > 1) s.addText(String(n).padStart(2,"0"), { x:W-1.15, y:H-0.6, w:0.6, h:0.3,
    fontFace:SAN, fontSize:9, bold:true, charSpacing:1.5, color: dark?DMUT:"A79C8C", align:"right", isTextBox:true });
  return s;
}
function eyebrow(s, t, dark){
  s.addText(t.toUpperCase(), { x:M, y:0.6, w:9.5, h:0.28, fontFace:SAN, fontSize:9.5, bold:true,
    charSpacing:2.6, color: dark?DACC:ACC, margin:0, isTextBox:true });
}
function title(s, t, o){
  o = o||{};
  s.addText(t, { x:M, y:o.y||Y_TITLE, w:o.w||8.6, h:o.h||1.4, fontFace:SER, fontSize:o.size||32,
    color:o.color||INK, lineSpacing:o.ls||38, margin:0, valign:"top", isTextBox:true });
}
function label(s, t, y, x, w){
  s.addText(t.toUpperCase(), { x:x||CX, y, w:w||CW, h:0.24, fontFace:SAN, fontSize:8.5, bold:true,
    charSpacing:1.8, color:ACC, margin:0, isTextBox:true });
}
function para(s, t, y, o){
  o = o||{};
  s.addText(t, { x:o.x||CX, y, w:o.w||CW, h:o.h||1.05, fontFace:SAN, fontSize:o.size||13,
    color:o.color||MUT, lineSpacing:o.ls||18, margin:0, valign:"top", isTextBox:true });
}
function ph(s, x, y, w, h, txt, dark){
  s.addShape(p.ShapeType.rect, { x:x, y:y, w:w, h:h, fill:{ color: dark?DBG:PAPER },
    line:{ color: dark?DRULE:RULE, width:1, dashType:"dash" } });
  s.addText(txt, { x:x+0.12, y:y+h/2-0.4, w:w-0.24, h:0.8, fontFace:SAN, fontSize:9.5, bold:true,
    charSpacing:1.3, color: dark?DMUT:"A79C8C", align:"center", valign:"middle", isTextBox:true });
}
// the repeating motif: a solid bronze result block
function results(s, arr, y){
  const gap = 0.14, bw = (CW - gap*(arr.length-1)) / arr.length;
  arr.forEach((t,i) => {
    const x = CX + i*(bw+gap);
    s.addShape(p.ShapeType.rect, { x:x, y:y, w:bw, h:0.66, fill:{ color:ACC } });
    s.addText(t, { x:x+0.14, y:y, w:bw-0.28, h:0.66, fontFace:SAN, fontSize:10.5, bold:true,
      color:"FFFFFF", valign:"middle", isTextBox:true });
  });
}

// ===== THE ONE CASE TEMPLATE — challenge, what we did, result, image =====
function caseSlide(o){
  const s = slide();
  eyebrow(s, o.eyebrow);
  title(s, o.title, { w:CW+0.35, size:o.size||29, ls:o.ls||35, h:1.5 });
  label(s, "The challenge", Y_CHAL);
  para(s, o.challenge, Y_CHAL+0.3);
  label(s, "What we did", Y_DID);
  para(s, o.did, Y_DID+0.3);
  results(s, o.results, Y_RES);
  ph(s, IX, IY, IW, IH, o.image);
  if (o.notes) s.addNotes(o.notes);
  return s;
}
// ===== THE ONE GALLERY TEMPLATE — same grid, every case =====
function gallerySlide(o){
  const s = slide();
  eyebrow(s, o.eyebrow);
  title(s, o.title, { w:10.6, size:26, ls:32, h:0.95 });
  const gx = M, gy = 2.35, gw = 11.6, gh = 4.15, gap = 0.18;
  const bigW = gw*0.545, smW = gw - bigW - gap, smH = (gh - gap)/2;
  ph(s, gx, gy, bigW, gh, o.frames[0]);
  ph(s, gx+bigW+gap, gy, smW, smH, o.frames[1]);
  ph(s, gx+bigW+gap, gy+smH+gap, smW, smH, o.frames[2]);
  if (o.notes) s.addNotes(o.notes);
  return s;
}
function divider(t, sub){
  const s = slide(true);
  s.addText(t, { x:M, y:2.75, w:11, h:1.4, fontFace:SER, fontSize:58, color:DINK, margin:0, isTextBox:true });
  if (sub) s.addText(sub, { x:M, y:4.2, w:9, h:0.5, fontFace:SAN, fontSize:14, color:DMUT, margin:0, isTextBox:true });
  return s;
}

/* 01 COVER */
{ const s = slide(true);
  s.addText("EOV", { x:M, y:1.5, w:6, h:1.7, fontFace:SER, fontSize:80, bold:true, color:DINK, charSpacing:-2, margin:0, isTextBox:true });
  s.addShape(p.ShapeType.rect, { x:M, y:3.5, w:0.75, h:0.035, fill:{ color:DACC } });
  s.addText("Integrated marketing.\nAbu Dhabi and Dubai. Since 2006.",
    { x:M, y:3.9, w:6.5, h:1.1, fontFace:SAN, fontSize:19, color:DINK, lineSpacing:30, margin:0, isTextBox:true });
  s.addText("[NAME] · [TITLE] · [EMAIL] · [PHONE]",
    { x:M, y:6.35, w:7, h:0.35, fontFace:SAN, fontSize:11, bold:true, charSpacing:1, color:DMUT, margin:0, isTextBox:true });
  ph(s, 7.65, 1.3, 4.8, 4.9, "Cover image", true);
}

/* 02 WHO WE ARE */
{ const s = slide();
  eyebrow(s, "Who we are");
  title(s, "An Emirati-founded integrated marketing agency, working here since 2006.", { w:6.5, size:30, ls:36, h:2.0 });
  para(s, "Abu Dhabi office, Dubai production facility. Strategy, brand, digital platforms, communications, media and production — one team.",
    3.25, { size:14.5, ls:21, h:1.1 });
  [["2006","Working in the UAE since"],["2","Emirates"],["6","Disciplines, one team"]].forEach((it,i) => {
    const x = M + i*2.2;
    s.addText(it[0], { x:x, y:4.85, w:2.0, h:0.6, fontFace:SER, fontSize:30, bold:true, color:ACC, margin:0, isTextBox:true });
    s.addText(it[1].toUpperCase(), { x:x, y:5.45, w:1.95, h:0.55, fontFace:SAN, fontSize:8.5, bold:true,
      charSpacing:1.3, color:MUT, lineSpacing:12, margin:0, valign:"top", isTextBox:true });
  });
  ph(s, IX, IY, IW, IH, "Team or office photograph");
  s.addNotes("Confirm the Al Quoz unit is a working production facility. Do not use the website's 400+ figure.");
}

/* 03 THE PROBLEM */
{ const s = slide();
  eyebrow(s, "The problem we are set up for");
  title(s, "Most companies buy marketing in pieces. Nobody is answerable for the whole.", { w:9.6, size:36, ls:44, h:2.0 });
  para(s, "Brand here. Media there. A web developer, a PR firm, a production house. Each does its part competently.",
    3.35, { w:8.2, size:15.5, ls:22, h:0.8 });
  s.addText("It works — until something cannot be done twice.",
    { x:M, y:4.95, w:9, h:0.8, fontFace:SER, fontSize:26, italic:true, color:INK, margin:0, isTextBox:true });
  s.addNotes("Closes on the line that opens the claim. Do not summarise it.");
}

/* 04 THE CLAIM */
{ const s = slide(true);
  eyebrow(s, "What we are for", true);
  s.addText("Twenty years of work that had to be right the first time.",
    { x:M, y:1.7, w:9.4, h:2.6, fontFace:SER, fontSize:52, color:DINK, lineSpacing:60, margin:0, isTextBox:true });
  s.addText("An event staged abroad on a fixed date. A season that arrives whether you are ready. A launch with one window.",
    { x:M, y:4.75, w:8.4, h:0.9, fontFace:SAN, fontSize:16, color:DMUT, lineSpacing:24, margin:0, isTextBox:true });
  s.addNotes("The hinge. Stated once and never repeated — slide 16 echoes it without restating it.");
}

/* 05 DIVIDER */
divider("The work.", "Four clients. Rising stakes.");

/* 06 CLIENTS */
{ const s = slide();
  eyebrow(s, "Clients");
  title(s, "Twenty years across government, luxury goods, retail, food and manufacturing.", { w:10.6, size:29, ls:35, h:1.3 });
  [["Government &\nsemi-government","OPEC · Mubadala · ADNOC · RTA · DEWA · ESMA · Ministry of Energy · Ministry of Economy · FCA · MOPA · SPSA · ADAEGP · POD/DCD · Pension Fund · ADAFSA · Dept. of Economic Development"],
   ["Private sector","DAMAC · HMS · MBR"],
   ["Luxury, retail\n& industrial","Ferronato · Forrey & Galland · KGS"]].forEach((r,i) => {
    const y = 2.85 + i*1.2;
    s.addShape(p.ShapeType.rect, { x:M, y:y, w:3.0, h:1.0, fill:{ color:TINT } });
    s.addText(r[0], { x:M+0.18, y:y, w:2.65, h:1.0, fontFace:SAN, fontSize:11, bold:true, color:INK, lineSpacing:14, valign:"middle", isTextBox:true });
    s.addText(r[1], { x:M+3.25, y:y, w:8.2, h:1.0, fontFace:SAN, fontSize:11.5, color:MUT, lineSpacing:16, valign:"middle", isTextBox:true });
  });
  s.addText("Client logos replace this list once naming consent is confirmed.",
    { x:M, y:6.6, w:9, h:0.3, fontFace:SAN, fontSize:9.5, italic:true, color:"A79C8C", margin:0, isTextBox:true });
  s.addNotes("A logo on a 2022 website is not 2026 consent. Confirm per client: contracted directly, subcontracted, or decorative.");
}

/* 07-08 FORREY & GALLAND */
caseSlide({ eyebrow:"Forrey & Galland · luxury confectionery · UAE",
  title:"Search visibility up 3.4×, with no paid media at all.",
  challenge:"A luxury confectioner whose business runs on occasions, competing for attention in a category where everyone buys the same seasonal media at the same time, at the same rising cost.",
  did:"Built visibility structurally instead of buying it. The catalogue, the occasion pages and the search architecture were rebuilt so the brand could be found on its own terms across the whole calendar.",
  results:["75 → 254 keywords","Zero paid search","1,510 peak visits"],
  image:"Product and retail photography" });
gallerySlide({ eyebrow:"Forrey & Galland · the work",
  title:"For a business built on occasions, the calendar is the strategy.",
  frames:["Campaign photography","Shoot stills","Event and retail"],
  notes:"Ramadan, Eid al-Fitr, Eid al-Adha, Diwali. Each an entire programme. The lunar calendar moves roughly eleven days a year, so the plan is rebuilt annually rather than repeated." });

/* 09 BRIDGE */
{ const s = slide();
  eyebrow(s, "One group, two brands");
  title(s, "One material. Engineers on one side, luxury buyers on the other.", { w:10.4, size:32, ls:38, h:1.4 });
  para(s, "The same group makes shielding fabric for naval vessels, and a luxury accessory brand built on privacy. Two brands, two markets, nothing shared but the physics.",
    2.85, { w:10.4, size:15, ls:22, h:0.85 });
  ph(s, M, 3.95, 5.7, 2.6, "Naval or aerospace application");
  ph(s, 6.75, 3.95, 5.7, 2.6, "Finished leather product");
}

/* 10-11 KGS */
caseSlide({ eyebrow:"KGS · MetaFab® · industrial B2B · India and Middle East",
  title:"Marketing a material that shields naval vessels.",
  challenge:"A metallised fabric attenuating EMF, EMI and RF at material level, sold to engineers and procurement teams working to specification on cycles measured in quarters. Most agencies decline this brief.",
  did:"Learned the specification, then built the search and content architecture around how engineers actually look for shielding performance — by decibel rating and application, not by brand.",
  results:["17 → 96 keywords","5.6× visibility","40–90 dB shielding"],
  image:"Application imagery" });
gallerySlide({ eyebrow:"KGS · the work",
  title:"Naval vessels, aircraft wiring systems, secure courtrooms.",
  frames:["Vessel or installation","Aircraft wiring","Material detail"] });

/* 12-13 FERRONATO */
caseSlide({ eyebrow:"Ferronato · luxury accessories · Switzerland and export",
  title:"Every rival sold protection. We launched the first luxury range built on privacy.",
  challenge:"A fourth-generation family with thirty years of privacy technology in defence and aerospace wanted to reach consumers. Every brand already in the category sold protection to people who felt threatened.",
  did:"Positioned the other way — discretion, for people who feel watched. Italian leather, Swiss engineering, and a launch built around a category-first claim rather than a feature list.",
  results:["300,000+ at Expo debut","May 2023 first boutique","US + EU distribution"],
  size:27, ls:33,
  image:"Product and boutique photography",
  notes:"Send the PR record and this slide is finished: publications with dates and tier, retail doors, awareness study, influencer reach, and which markets US/EU covers." });
gallerySlide({ eyebrow:"Ferronato · the work",
  title:"Same owner. Same agency. Two entirely different jobs.",
  frames:["Campaign photography","Boutique","Atelier or product detail"] });

/* 14-15 OPEC */
caseSlide({ eyebrow:"OPEC · UAE Night, Vienna · national representation",
  title:"A national event, delivered in a foreign capital.",
  challenge:"A country represented abroad, on a date fixed by the OPEC calendar, in a city with none of the suppliers, permissions or margins for error that a home market provides.",
  did:"[CONCEPT] · [PRODUCTION] · [GUEST MANAGEMENT] · [CONTENT] · [STAGING] — organised by EOV in partnership with H.E. Suhail Al Mazrouei, Minister of Energy.",
  results:["Vienna","Ministerial partnership","Fixed date"],
  image:"Event photography",
  notes:"Consent required — OPEC is intergovernmental and the Ministry federal. Strike the scope items that do not apply. The site says 'OPEC events' plural; if Vienna was not the only one, that is a stronger claim." });
gallerySlide({ eyebrow:"OPEC · UAE Night, Vienna",
  title:"Nine photographs and a film exist. None have been in a deck.",
  frames:["Arrival or venue","The room, mid-event","Ministerial moment"] });

/* 16 THE CLOSE */
{ const s = slide(true);
  s.addText("A fixed date. A foreign city. A country being represented.",
    { x:M, y:2.3, w:6.1, h:0.9, fontFace:SAN, fontSize:15, color:DMUT, lineSpacing:22, margin:0, isTextBox:true });
  s.addShape(p.ShapeType.rect, { x:M, y:3.4, w:0.68, h:0.03, fill:{ color:DACC } });
  s.addText("Nothing about that brief allowed a second attempt.",
    { x:M, y:3.75, w:5.9, h:2.2, fontFace:SER, fontSize:36, color:DINK, lineSpacing:44, margin:0, isTextBox:true });
  ph(s, 7.4, 1.5, 5.05, 4.5, "The Vienna film, or its strongest frame", true);
  s.addNotes("The argument. Everything after this slide is administration.");
}

/* 17 SELECTED PROJECTS */
{ const s = slide();
  eyebrow(s, "Selected projects");
  title(s, "Further work across government, industry and retail.", { w:10, size:29, ls:35, h:1.0 });
  [["Arab SMIS Summit","Institutional event"],["DEWA","Government"],["FCA","Smart transformation"],
   ["Ministry of Economy","Government"],["GITEX 2015","Economic Department"],["SME Programme","Government"],
   ["Montajat","Brand"],["Dubai Challenge","Event"],["SND","App and platform"],["ILF","Identity"]]
  .forEach((it,i) => {
    const col = i % 5, row = Math.floor(i/5);
    const x = M + col*2.4, y = 2.6 + row*1.8;
    s.addShape(p.ShapeType.rect, { x:x, y:y, w:2.25, h:1.55, fill:{ color:TINT } });
    s.addText(it[0], { x:x+0.16, y:y+0.2, w:1.95, h:0.65, fontFace:SER, fontSize:14, bold:true, color:INK, lineSpacing:17, valign:"top", isTextBox:true });
    s.addText(it[1], { x:x+0.16, y:y+0.95, w:1.95, h:0.4, fontFace:SAN, fontSize:9.5, color:MUT, valign:"top", isTextBox:true });
  });
  s.addNotes("Replace tiles with project imagery as assets land. All ten are evidenced by files on eov.ae.");
}

/* 18 DIVIDER */
divider("How we work.", "The firm, the method, and how an engagement starts.");

/* 19 SIX DISCIPLINES */
{ const s = slide();
  eyebrow(s, "What we do");
  title(s, "Six disciplines, one brief, one team.", { w:9, size:32, ls:38, h:1.0 });
  [["Strategy and research","Market evidence, positioning, planning"],
   ["Brand and creative","Identity, campaign, art direction"],
   ["Digital platforms and ecommerce","Websites, platforms, commerce"],
   ["Communications and PR","Media relations, content, reputation"],
   ["Media planning and buying","Paid media across channels"],
   ["Production, photography and events","Shoots, fabrication, delivery"]].forEach((it,i) => {
    const col = i % 2, row = Math.floor(i/2);
    const x = M + col*5.95, y = 2.55 + row*1.4;
    s.addShape(p.ShapeType.ellipse, { x:x, y:y+0.06, w:0.32, h:0.32, fill:{ color:ACC } });
    s.addText(it[0], { x:x+0.52, y:y, w:5.0, h:0.4, fontFace:SER, fontSize:16, bold:true, color:INK, margin:0, valign:"top", isTextBox:true });
    s.addText(it[1], { x:x+0.52, y:y+0.45, w:5.0, h:0.4, fontFace:SAN, fontSize:11.5, color:MUT, margin:0, valign:"top", isTextBox:true });
  });
  s.addText("[MARK EACH — IN-HOUSE OR PARTNER]",
    { x:M, y:6.6, w:8, h:0.3, fontFace:SAN, fontSize:10, bold:true, charSpacing:1, color:"A79C8C", margin:0, isTextBox:true });
  s.addNotes("The website publishes three pillars, the old deck five practices, this six disciplines. Pick one and change the other two.");
}

/* 20 THREE RULES */
{ const s = slide();
  eyebrow(s, "How we work");
  title(s, "Three things we do before anything goes live.", { w:9, size:32, ls:38, h:1.0 });
  [["Success defined before spend","The objective, the audience and the measure are written down first, so there is no argument about it afterwards."],
   ["Measurement built before launch","Tracking, conversions and reporting are built and tested before the first impression, not retrofitted."],
   ["Everything built in your name","Platforms, advertising accounts, analytics and CRM are created under your company. The data and the history are yours."]]
  .forEach((it,i) => {
    const y = 2.6 + i*1.45;
    s.addText(String(i+1).padStart(2,"0"), { x:M, y:y, w:0.85, h:0.7, fontFace:SER, fontSize:30, bold:true, color:ACC, margin:0, isTextBox:true });
    s.addText(it[0], { x:M+1.0, y:y+0.02, w:10.4, h:0.42, fontFace:SER, fontSize:18, bold:true, color:INK, margin:0, valign:"top", isTextBox:true });
    s.addText(it[1], { x:M+1.0, y:y+0.5, w:10.2, h:0.7, fontFace:SAN, fontSize:12.5, color:MUT, lineSpacing:17, margin:0, valign:"top", isTextBox:true });
  });
  s.addNotes("The third line must be true today, or it comes out. Easiest claim in the deck to check.");
}

/* 21 ENGAGEMENT */
{ const s = slide();
  eyebrow(s, "How an engagement runs");
  title(s, "One contract, one team, one point of accountability.", { w:9.5, size:30, ls:36, h:1.0 });
  [["Definition","A short paid stage. Objective, audience, positioning and the measure of success, agreed and written down."],
   ["Build","Platforms, measurement and creative built against that definition, in your name."],
   ["Run","Delivery, reporting and optimisation on a fixed cadence, with one senior contact throughout."]]
  .forEach((it,i) => {
    const x = M + i*3.95;
    s.addShape(p.ShapeType.rect, { x:x, y:2.65, w:3.6, h:2.95, fill:{ color:TINT } });
    s.addText(String(i+1), { x:x+0.28, y:2.9, w:0.6, h:0.6, fontFace:SER, fontSize:26, bold:true, color:ACC, margin:0, isTextBox:true });
    s.addText(it[0], { x:x+0.28, y:3.55, w:3.0, h:0.45, fontFace:SER, fontSize:19, bold:true, color:INK, margin:0, valign:"top", isTextBox:true });
    s.addText(it[1], { x:x+0.28, y:4.12, w:3.05, h:1.35, fontFace:SAN, fontSize:11.5, color:MUT, lineSpacing:16, margin:0, valign:"top", isTextBox:true });
  });
  s.addNotes("Confirm the definition stage is real practice, and paid.");
}

/* 22 THE PEOPLE */
{ const s = slide();
  eyebrow(s, "The team");
  title(s, "The people who would run your account.", { w:9, size:32, ls:38, h:1.0 });
  for (let i=0;i<4;i++){
    const x = M + i*2.98;
    ph(s, x, 2.6, 2.7, 2.55, "Portrait");
    s.addText("[NAME]", { x:x, y:5.3, w:2.7, h:0.35, fontFace:SER, fontSize:15, bold:true, color:INK, margin:0, isTextBox:true });
    s.addText("[Role] · [one line]", { x:x, y:5.68, w:2.7, h:0.55, fontFace:SAN, fontSize:11, color:MUT, lineSpacing:15, margin:0, valign:"top", isTextBox:true });
  }
  s.addNotes("Three to five named people, not the org chart. Also state how many work in Arabic to professional standard.");
}

/* 23 PARTNERS */
{ const s = slide();
  eyebrow(s, "Partners");
  title(s, "Named partners, where depth is better bought than built.", { w:9.5, size:30, ls:36, h:1.1 });
  para(s, "Capacity is the standing question asked of any agency this size. These are the relationships that answer it.",
    2.8, { w:9.5, size:14, ls:20, h:0.7 });
  ["Marcollin","SAA","Palo Alto Tribunal"].forEach((t,i) => {
    const x = M + i*3.95;
    s.addShape(p.ShapeType.rect, { x:x, y:3.8, w:3.6, h:1.9, fill:{ color:TINT } });
    s.addText(t, { x:x+0.25, y:3.8, w:3.1, h:1.9, fontFace:SER, fontSize:20, bold:true, color:INK, valign:"middle", isTextBox:true });
  });
  s.addNotes("These three sit on EOV's own About page and have never appeared in a deck.");
}

/* 24 NEXT STEP */
{ const s = slide(true);
  eyebrow(s, "Next step", true);
  s.addText("Tell us what has to be right the first time.",
    { x:M, y:1.75, w:8.6, h:2.0, fontFace:SER, fontSize:44, color:DINK, lineSpacing:52, margin:0, isTextBox:true });
  s.addShape(p.ShapeType.rect, { x:M, y:4.15, w:0.68, h:0.03, fill:{ color:DACC } });
  s.addText("[NAME], [TITLE]\n[EMAIL]  ·  [PHONE]",
    { x:M, y:4.55, w:6, h:1.0, fontFace:SAN, fontSize:16, color:DINK, lineSpacing:26, margin:0, isTextBox:true });
  s.addText("eov.ae  ·  Abu Dhabi  ·  Dubai",
    { x:M, y:5.8, w:6, h:0.4, fontFace:SAN, fontSize:12.5, color:DMUT, margin:0, isTextBox:true });
}

p.writeFile({ fileName: "EOV-Credentials-2026.pptx" }).then(f => console.log("wrote", f, "-", n, "slides"));
