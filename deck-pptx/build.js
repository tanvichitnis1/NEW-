const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "EOV"; p.company = "EOV Technology Innovation"; p.title = "EOV Credentials";

// ---- EOV design system. 1280x720 stage → 13.333x7.5in.  1px = 0.0104167in, 1px = 0.75pt
const PX = 13.3333/1280, pt = px => +(px*0.75).toFixed(1);
const X = px => +(px*PX).toFixed(3);
const W = 13.3333, H = 7.5;

const WHITE="FFFFFF", BLACK="000000", GREY="F4F6F8";
const PANEL="111111", CHIP="141414", ROW="1C1C1C", HAIR="222222";
const CYAN="54D2FE";
const L_HEAD="111111", L_STRONG="444A52", L_BODY="5A6068", L_MUTED="8A8F98", L_LINE="E3E7EB";
const D_TEXT="FFFFFF", D_LIST="C9CED4", D_LEAD="B9BEC5", D_MUTED="6E7379";
const F = "Arial";

// fixed vertical skeleton
const MG = X(72), CW = X(1136);
const Y_EYE = X(53), Y_TITLE = X(84), Y_LEAD = X(168), Y_BODY = X(240), Y_FOOT = X(655);

let n = 0;
function slide(dark){
  n++;
  const s = p.addSlide();
  s.background = { color: dark ? BLACK : WHITE };
  return s;
}
function footer(s, dark, right){
  s.addImage({ path: dark ? "assets/eov-wordmark-white.png" : "assets/eov-wordmark-black-sm.png",
    x:MG, y:Y_FOOT, w:X(60), h:X(20) });
  if (right) s.addText(right, { x:X(300), y:Y_FOOT, w:X(700), h:X(20), fontFace:F, fontSize:pt(11),
    color: dark?D_MUTED:L_MUTED, margin:0, valign:"middle", isTextBox:true });
  s.addText(String(n).padStart(2,"0"), { x:X(1120), y:Y_FOOT, w:X(88), h:X(20), fontFace:F,
    fontSize:pt(12.7), bold:true, color: dark?D_MUTED:L_MUTED, align:"right", margin:0, valign:"middle", isTextBox:true });
}
function eyebrow(s, t, dark){
  s.addText(t.toUpperCase(), { x:MG, y:Y_EYE, w:CW, h:X(20), fontFace:F, fontSize:pt(12.7),
    bold:true, charSpacing:3, color: dark?CYAN:L_MUTED, margin:0, valign:"middle", isTextBox:true });
}
function title(s, t, dark, o){
  o = o||{};
  s.addText(t, { x:MG, y:o.y||Y_TITLE, w:o.w||CW, h:o.h||X(110), fontFace:F, fontSize:o.size||pt(45.3),
    bold:true, color: dark?D_TEXT:L_HEAD, lineSpacing:o.ls||pt(54), margin:0, valign:"top", isTextBox:true });
}
function lead(s, t, dark, o){
  o = o||{};
  s.addText(t, { x:MG, y:o.y||Y_LEAD, w:o.w||CW, h:o.h||X(56), fontFace:F, fontSize:pt(17.3),
    color: dark?D_LEAD:L_BODY, lineSpacing:pt(26), margin:0, valign:"top", isTextBox:true });
}
// image field — grey on light, #111 on dark. Radius 10px.
function img(s, x, y, w, h, txt, dark){
  s.addShape(p.ShapeType.roundRect, { x:x, y:y, w:w, h:h, rectRadius:X(10),
    fill:{ color: dark?PANEL:GREY }, line:{ type:"none" } });
  s.addText(txt.toUpperCase(), { x:x+X(14), y:y+h/2-X(18), w:w-X(28), h:X(36), fontFace:F,
    fontSize:pt(12.7), bold:true, charSpacing:2.4, color: dark?D_MUTED:L_MUTED,
    align:"center", valign:"middle", isTextBox:true });
}
function stat(s, arr, y, dark, x, gap){
  x = x||MG; gap = gap||X(190);
  arr.forEach((it,i) => {
    const fx = x + i*gap;
    s.addText(it[0], { x:fx, y:y, w:gap-X(16), h:X(46), fontFace:F, fontSize:pt(38), bold:true,
      color: dark?D_TEXT:L_HEAD, margin:0, isTextBox:true });
    s.addText(it[1].toUpperCase(), { x:fx, y:y+X(50), w:gap-X(20), h:X(40), fontFace:F, fontSize:pt(12.7),
      bold:true, charSpacing:2.2, color: dark?CYAN:L_MUTED, lineSpacing:pt(16), margin:0, valign:"top", isTextBox:true });
  });
}

/* ===== ONE CASE TEMPLATE ===== */
const IMX = X(624), IMW = W - IMX;   // image bleeds off the right edge
function caseSlide(o){
  const s = slide();
  s.addShape(p.ShapeType.rect, { x:IMX, y:0, w:IMW, h:H, fill:{ color:GREY }, line:{ type:"none" } });
  s.addText(o.image.toUpperCase(), { x:IMX+X(30), y:H/2-X(20), w:IMW-X(60), h:X(40), fontFace:F,
    fontSize:pt(12.7), bold:true, charSpacing:2.4, color:L_MUTED, align:"center", valign:"middle", isTextBox:true });
  eyebrow(s, o.eyebrow);
  title(s, o.title, false, { w:X(500), size:o.size||pt(34), ls:pt(41), h:X(190) });
  lead(s, o.lead, false, { y:X(300), w:X(500), h:X(90) });
  stat(s, o.stats, X(430), false, MG, X(168));
  footer(s, false);
  if (o.notes) s.addNotes(o.notes);
  return s;
}
/* ===== ONE GALLERY TEMPLATE ===== */
function gallerySlide(o){
  const s = slide(true);
  const g = X(8), bw = X(760);
  img(s, 0, 0, bw, H, o.frames[0], true);
  img(s, bw+g, 0, W-bw-g, (H-g)/2, o.frames[1], true);
  img(s, bw+g, (H+g)/2, W-bw-g, (H-g)/2, o.frames[2], true);
  s.addShape(p.ShapeType.rect, { x:0, y:X(500), w:bw, h:H-X(500), fill:{ color:BLACK, transparency:14 } });
  s.addText(o.eyebrow.toUpperCase(), { x:X(56), y:X(548), w:X(650), h:X(20), fontFace:F, fontSize:pt(12.7),
    bold:true, charSpacing:3, color:CYAN, margin:0, valign:"middle", isTextBox:true });
  s.addText(o.title, { x:X(56), y:X(582), w:X(650), h:X(96), fontFace:F, fontSize:pt(25.3), bold:true,
    color:D_TEXT, lineSpacing:pt(32), margin:0, valign:"top", isTextBox:true });
  if (o.notes) s.addNotes(o.notes);
  return s;
}
function divider(t, sub){
  const s = slide(true);
  s.addText(t, { x:MG, y:X(280), w:CW, h:X(90), fontFace:F, fontSize:pt(56), bold:true,
    color:D_TEXT, margin:0, valign:"top", isTextBox:true });
  if (sub) s.addText(sub.toUpperCase(), { x:MG, y:X(390), w:CW, h:X(24), fontFace:F, fontSize:pt(12.7),
    bold:true, charSpacing:3, color:CYAN, margin:0, isTextBox:true });
  footer(s, true);
  return s;
}

/* 01 COVER */
{ const s = slide(true);
  s.addImage({ path:"assets/eov-wordmark-white.png", x:MG, y:X(250), w:X(260), h:X(87) });
  s.addText("Integrated marketing  ·  Abu Dhabi and Dubai  ·  Since 2006",
    { x:MG, y:X(380), w:CW, h:X(30), fontFace:F, fontSize:pt(17.3), color:D_LEAD, margin:0, isTextBox:true });
  s.addText("CREDENTIALS  ·  2026", { x:MG, y:X(53), w:CW, h:X(20), fontFace:F, fontSize:pt(12.7),
    bold:true, charSpacing:3, color:CYAN, margin:0, valign:"middle", isTextBox:true });
  s.addText("[NAME] · [TITLE] · [EMAIL] · [PHONE]", { x:MG, y:Y_FOOT, w:X(800), h:X(20),
    fontFace:F, fontSize:pt(12.7), color:D_MUTED, margin:0, valign:"middle", isTextBox:true });
}

/* 02 WHO WE ARE */
{ const s = slide();
  s.addShape(p.ShapeType.rect, { x:IMX, y:0, w:IMW, h:H, fill:{ color:GREY }, line:{ type:"none" } });
  s.addText("TEAM OR OFFICE PHOTOGRAPH", { x:IMX+X(30), y:H/2-X(20), w:IMW-X(60), h:X(40), fontFace:F,
    fontSize:pt(12.7), bold:true, charSpacing:2.4, color:L_MUTED, align:"center", valign:"middle", isTextBox:true });
  eyebrow(s, "Who we are");
  title(s, "An Emirati-founded integrated marketing agency, working in the UAE since 2006.",
    false, { w:X(500), size:pt(34), ls:pt(41), h:X(200) });
  lead(s, "Abu Dhabi office · Dubai production facility. Six disciplines under one team.",
    false, { y:X(310), w:X(500), h:X(60) });
  stat(s, [["2","Emirates"],["6","Disciplines"],["20","Years"]], X(430), false, MG, X(168));
  footer(s, false);
  s.addNotes("Confirm the Al Quoz unit is a working production facility. Do not use the website's 400+ figure — it reads as headcount and is qualified as teams and partnerships.");
}

/* 03 THE PROBLEM */
{ const s = slide();
  eyebrow(s, "The premise");
  title(s, "Marketing bought in pieces.\nNobody answerable for the whole.", false, { h:X(150) });
  lead(s, "Brand from one supplier, media from another, the website from a third. Each part is delivered competently. The value is lost in the joins.",
    false, { y:X(260), w:X(760) });
  s.addShape(p.ShapeType.roundRect, { x:MG, y:X(400), w:CW, h:X(120), rectRadius:X(10),
    fill:{ color:PANEL }, line:{ type:"none" } });
  s.addText("It works — until something cannot be done twice.",
    { x:MG+X(40), y:X(400), w:CW-X(80), h:X(120), fontFace:F, fontSize:pt(25.3), bold:true,
      color:D_TEXT, valign:"middle", isTextBox:true });
  footer(s, false);
}

/* 04 THE CLAIM */
{ const s = slide(true);
  eyebrow(s, "What EOV is for", true);
  title(s, "Twenty years of work that had to be right the first time.", true, { size:pt(56), ls:pt(66), h:X(230) });
  lead(s, "A national event staged abroad on a fixed date. A retail season that arrives whether the work is ready or not. A category-first launch with one window.",
    true, { y:X(360), w:X(880) });
  footer(s, true);
  s.addNotes("The hinge. Stated once and never repeated — slide 16 echoes it without restating it.");
}

/* 05 DIVIDER */
divider("The work.", "Four clients · rising stakes");

/* 06 CLIENTS */
{ const s = slide();
  eyebrow(s, "Clients");
  title(s, "Twenty years across government, luxury, retail and industry.", false, { h:X(70), size:pt(38) });
  ["OPEC","MUBADALA","ADNOC","RTA","DEWA","ESMA","MIN. OF ENERGY","MIN. OF ECONOMY",
   "FCA","DAMAC","HMS","MBR"].forEach((t,i) => {
    const col = i % 6, row = Math.floor(i/6);
    const x = MG + col*X(192), y = X(215) + row*X(150);
    s.addShape(p.ShapeType.roundRect, { x:x, y:y, w:X(178), h:X(132), rectRadius:X(10),
      fill:{ color:GREY }, line:{ type:"none" } });
    s.addText(t, { x:x+X(10), y:y, w:X(158), h:X(132), fontFace:F, fontSize:pt(12.7), bold:true,
      charSpacing:1.2, color:L_MUTED, align:"center", valign:"middle", isTextBox:true });
  });
  s.addText("Also SPSA · MOPA · ADAEGP · POD/DCD · Pension Fund · ADAFSA · Department of Economic Development",
    { x:MG, y:X(535), w:CW, h:X(26), fontFace:F, fontSize:pt(15.3), color:L_BODY, margin:0, isTextBox:true });
  footer(s, false);
  s.addNotes("Replace tiles with client marks once naming consent is confirmed per client. A logo on a 2022 website is not consent to name a client in 2026.");
}

/* 07-08 FORREY & GALLAND */
caseSlide({ eyebrow:"Forrey & Galland · luxury confectionery",
  title:"Search visibility up 3.4×, with no paid media.",
  lead:"Visibility built structurally rather than bought. The occasion calendar moves roughly eleven days a year, so the plan is rebuilt annually rather than repeated.",
  stats:[["3.4×","Visibility"],["Zero","Paid search"],["1,510","Peak visits"]],
  image:"Product and retail photography" });
gallerySlide({ eyebrow:"Forrey & Galland",
  title:"For a business built on occasions, the calendar is the strategy.",
  frames:["Campaign photography","Shoot stills","Retail and event"],
  notes:"Ramadan · Eid al-Fitr · Eid al-Adha · Diwali. Each an entire programme, not a post." });

/* 09 BRIDGE */
{ const s = slide(true);
  eyebrow(s, "Ferronato KGS Group · Lugano, 1906", true);
  title(s, "One group. Engineers on one side, luxury buyers on the other.", true, { size:pt(40), ls:pt(48), h:X(130) });
  lead(s, "A leading manufacturer of flexible diamond abrasives and metallised fabrics, entering the lifestyle category on its own industrial technology.",
    true, { y:X(230), w:X(900), h:X(56) });
  stat(s, [["1906","Founded, Lugano"],["4th","Generation"],["16","Countries"],["100+","Markets supplied"]],
    X(320), true, MG, X(220));
  img(s, MG, X(470), X(552), X(160), "Metallised fabric · industrial application", true);
  img(s, MG+X(584), X(470), X(552), X(160), "Finished product · consumer range", true);
  footer(s, true);
  s.addNotes("Confirmed by the client: KGS and Ferronato are two brands in one group. This slide is the hinge of the range argument.");
}

/* 10-11 KGS */
caseSlide({ eyebrow:"KGS · MetaFab® · industrial B2B",
  title:"Marketing a material that shields naval vessels.",
  lead:"Metallised fabric attenuating EMF, EMI and RF at material level. Sold to engineers working to specification, on cycles measured in quarters. Most agencies decline this brief.",
  stats:[["5.6×","Visibility"],["96","Keywords"],["40–90","dB shielding"]],
  image:"Application imagery" });
gallerySlide({ eyebrow:"KGS · MetaFab®",
  title:"Naval vessels. Aircraft wiring. Secure courtrooms.",
  frames:["Vessel or installation","Aircraft wiring","Material detail"] });

/* 12-13 FERRONATO */
caseSlide({ eyebrow:"Ferronato Switzerland · smart accessories",
  title:"Privacy as a product, not a promise.",
  lead:"Sleeves, pouches, totes and briefcases in metallised fabric. The benefit is physical, which is what made it provable. Global debut at the Swiss Pavilion, Expo 2020 Dubai.",
  stats:[["300k+","Pavilion visitors"],["2023","First boutique"],["4","Product lines"]],
  image:"Product and boutique photography",
  notes:"Send the PR record and this slide is finished: publications with dates and tier, retail doors, awareness study, influencer reach, and which markets US and EU distribution covers." });
gallerySlide({ eyebrow:"Ferronato Switzerland",
  title:"One brand system across retail, film and product.",
  frames:["Ferronato Switzerland boutique","Campaign photography","Atelier display"] });

/* FILMS */
{ const s = slide();
  eyebrow(s, "Ferronato Switzerland · campaign");
  title(s, "Three festive films, one idea.", false, { h:X(70), size:pt(38) });
  lead(s, "Going untraceable, told through Santa.", false, { y:X(180), w:X(900), h:X(40) });
  [["Gift of Privacy",""],["Disconnect and Connect",""],["Stay off-grid",""]].forEach((it,i) => {
    const x = MG + i*X(386);
    img(s, x, X(250), X(357), X(200), "Film still", false);
    s.addText(it[0], { x:x, y:X(468), w:X(357), h:X(34), fontFace:F, fontSize:pt(18.7), bold:true,
      color:L_HEAD, margin:0, isTextBox:true });
  });
  footer(s, false);
  s.addNotes("Three films exist. Stills or the films themselves are the strongest asset on this case after the boutique photography.");
}

/* 14-15 OPEC */
caseSlide({ eyebrow:"OPEC · UAE Night, Vienna",
  title:"A national event, delivered in a foreign capital.",
  lead:"Organised by EOV in partnership with H.E. Suhail Al Mazrouei, Minister of Energy, around the OPEC calendar.",
  stats:[["Vienna","Foreign capital"],["Fixed","Date"],["H.E.","Ministerial partner"]],
  size:pt(38),
  image:"Event photography",
  notes:"Consent required — OPEC is intergovernmental and the Ministry federal. Still needed: the year, scope delivered, attendance. The website says 'OPEC events' plural." });
gallerySlide({ eyebrow:"OPEC · UAE Night, Vienna",
  title:"Nine photographs and a film exist. None have been in a deck.",
  frames:["Arrival or venue","The room, mid-event","Ministerial moment"] });

/* 16 THE CLOSE */
{ const s = slide(true);
  img(s, 0, 0, X(640), H, "The Vienna film, or its strongest frame", true);
  s.addText("A fixed date · a foreign city · a country represented",
    { x:X(700), y:X(230), w:X(500), h:X(50), fontFace:F, fontSize:pt(15.3), color:D_MUTED,
      lineSpacing:pt(22), margin:0, isTextBox:true });
  s.addText("Nothing about that brief allowed a second attempt.",
    { x:X(700), y:X(300), w:X(490), h:X(240), fontFace:F, fontSize:pt(40), bold:true, color:D_TEXT,
      lineSpacing:pt(50), margin:0, valign:"top", isTextBox:true });
  s.addNotes("The argument. Everything after this slide is administration.");
}

/* 17 SELECTED PROJECTS */
{ const s = slide();
  eyebrow(s, "Selected projects");
  title(s, "Further work across government, industry and retail.", false, { h:X(70), size:pt(38) });
  ["Arab SMIS Summit","DEWA","FCA","Ministry of Economy","GITEX 2015",
   "SME Programme","Montajat","Dubai Challenge","SND","ILF"].forEach((t,i) => {
    const col = i % 5, row = Math.floor(i/5);
    const x = MG + col*X(232), y = X(215) + row*X(200);
    img(s, x, y, X(209), X(140), "Project image", false);
    s.addText(t, { x:x, y:y+X(150), w:X(209), h:X(30), fontFace:F, fontSize:pt(15.3), bold:true,
      color:L_HEAD, margin:0, isTextBox:true });
  });
  footer(s, false);
}

/* 18 DIVIDER */
divider("How the work runs.", "The firm · the method · the first step");

/* 19 DISCIPLINES — with the limit named */
{ const s = slide();
  eyebrow(s, "What EOV does");
  title(s, "Six disciplines, one brief, one team.", false, { h:X(70), size:pt(38) });
  const cols = [["IN-HOUSE", ["Strategy and research","Brand and creative","Digital and ecommerce",
      "Communications and PR","Media planning and buying","Production and events"], GREY, L_HEAD, L_MUTED],
    ["PARTNERED", ["[CONFIRM WHICH]","Named partners disclosed on every engagement.","",
      "","",""], PANEL, D_TEXT, CYAN]];
  cols.forEach((c,i) => {
    const x = MG + i*X(584), dark = i===1;
    s.addShape(p.ShapeType.roundRect, { x:x, y:X(215), w:X(552), h:X(330), rectRadius:X(10),
      fill:{ color:c[2] }, line:{ type:"none" } });
    s.addText(c[0], { x:x+X(32), y:X(245), w:X(490), h:X(20), fontFace:F, fontSize:pt(12.7), bold:true,
      charSpacing:2.6, color:c[4], margin:0, valign:"middle", isTextBox:true });
    c[1].filter(Boolean).forEach((t,j) => {
      s.addText(t, { x:x+X(32), y:X(295)+j*X(42), w:X(490), h:X(34), fontFace:F, fontSize:pt(16.7),
        color:c[3], margin:0, valign:"top", isTextBox:true });
    });
  });
  footer(s, false);
  s.addNotes("Naming the limit alongside the claim is the house move. Confirm which disciplines are in-house. Also reconcile: the website publishes three pillars, the old deck five practices, this six.");
}

/* 20 THREE RULES */
{ const s = slide();
  eyebrow(s, "How EOV works");
  title(s, "Three things settled before anything goes live.", false, { h:X(70), size:pt(38) });
  [["01","Success defined before spend","The objective, the audience and the measure are agreed and written down first."],
   ["02","Measurement built before launch","Tracking and reporting are built and tested before the first impression is bought."],
   ["03","Accounts built in the client's name","Platforms, advertising accounts, analytics and CRM are created under the client's entity."]]
  .forEach((it,i) => {
    const y = X(220) + i*X(112);
    s.addShape(p.ShapeType.roundRect, { x:MG, y:y, w:CW, h:X(96), rectRadius:X(10),
      fill:{ color:GREY }, line:{ type:"none" } });
    s.addText(it[0], { x:MG+X(28), y:y, w:X(60), h:X(96), fontFace:F, fontSize:pt(25.3), bold:true,
      color:L_MUTED, valign:"middle", isTextBox:true });
    s.addText(it[1], { x:MG+X(104), y:y+X(22), w:X(420), h:X(30), fontFace:F, fontSize:pt(18.7),
      bold:true, color:L_HEAD, margin:0, valign:"top", isTextBox:true });
    s.addText(it[2], { x:MG+X(540), y:y+X(24), w:X(560), h:X(56), fontFace:F, fontSize:pt(15.3),
      color:L_BODY, lineSpacing:pt(21), margin:0, valign:"top", isTextBox:true });
  });
  footer(s, false);
  s.addNotes("The third rule must be true today, or it comes out. It is the easiest claim in the deck for a client's technical lead to check.");
}

/* 21 ENGAGEMENT */
{ const s = slide();
  eyebrow(s, "How an engagement runs");
  title(s, "One contract, one team, one point of accountability.", false, { h:X(70), size:pt(38) });
  [["Definition","A short paid stage. Objective, audience and the measure of success, agreed and written down."],
   ["Build","Platforms, measurement and creative built against that definition, in the client's name."],
   ["Run","Delivery and reporting on a fixed cadence, with one senior contact throughout."]]
  .forEach((it,i) => {
    const x = MG + i*X(386);
    s.addShape(p.ShapeType.roundRect, { x:x, y:X(215), w:X(357), h:X(300), rectRadius:X(10),
      fill:{ color:GREY }, line:{ type:"none" } });
    s.addText(String(i+1).padStart(2,"0"), { x:x+X(28), y:X(245), w:X(80), h:X(40), fontFace:F,
      fontSize:pt(18.7), bold:true, color:L_MUTED, margin:0, isTextBox:true });
    s.addText(it[0], { x:x+X(28), y:X(300), w:X(300), h:X(36), fontFace:F, fontSize:pt(25.3),
      bold:true, color:L_HEAD, margin:0, valign:"top", isTextBox:true });
    s.addText(it[1], { x:x+X(28), y:X(350), w:X(300), h:X(140), fontFace:F, fontSize:pt(15.3),
      color:L_BODY, lineSpacing:pt(21), margin:0, valign:"top", isTextBox:true });
  });
  footer(s, false);
  s.addNotes("Confirm the definition stage is real practice, and paid.");
}

/* 22 THE TEAM */
{ const s = slide();
  eyebrow(s, "The team");
  title(s, "The people on the account.", false, { h:X(70), size:pt(38) });
  for (let i=0;i<4;i++){
    const x = MG + i*X(292);
    img(s, x, X(215), X(269), X(280), "Portrait", false);
    s.addText("[NAME]", { x:x, y:X(510), w:X(269), h:X(30), fontFace:F, fontSize:pt(18.7), bold:true,
      color:L_HEAD, margin:0, isTextBox:true });
    s.addText("[Role]", { x:x, y:X(544), w:X(269), h:X(28), fontFace:F, fontSize:pt(15.3),
      color:L_BODY, margin:0, isTextBox:true });
  }
  footer(s, false);
  s.addNotes("Three to five named people, not the org chart. Also state how many work in Arabic to professional standard — buyers ask and most UAE agencies answer vaguely.");
}

/* 23 PARTNERS */
{ const s = slide();
  eyebrow(s, "Partners");
  title(s, "Depth bought where it is better bought than built.", false, { h:X(70), size:pt(38) });
  lead(s, "Capacity is the standing question asked of any agency this size. Named partners are disclosed on every engagement.",
    false, { y:X(200), w:X(900), h:X(50) });
  ["Marcollin","SAA","Palo Alto Tribunal"].forEach((t,i) => {
    const x = MG + i*X(386);
    s.addShape(p.ShapeType.roundRect, { x:x, y:X(300), w:X(357), h:X(210), rectRadius:X(10),
      fill:{ color:GREY }, line:{ type:"none" } });
    s.addText(t, { x:x+X(24), y:X(300), w:X(309), h:X(210), fontFace:F, fontSize:pt(25.3), bold:true,
      color:L_HEAD, align:"center", valign:"middle", isTextBox:true });
  });
  footer(s, false);
}

/* 24 CLOSE */
{ const s = slide(true);
  eyebrow(s, "Next step", true);
  title(s, "The first conversation is about what cannot be done twice.", true, { size:pt(45.3), ls:pt(56), h:X(190) });
  s.addShape(p.ShapeType.roundRect, { x:MG, y:X(380), w:CW, h:X(150), rectRadius:X(10),
    fill:{ color:PANEL }, line:{ type:"none" } });
  s.addText("[NAME], [TITLE]", { x:MG+X(40), y:X(408), w:X(500), h:X(30), fontFace:F, fontSize:pt(18.7),
    bold:true, color:D_TEXT, margin:0, isTextBox:true });
  s.addText("[EMAIL]  ·  [PHONE]", { x:MG+X(40), y:X(444), w:X(500), h:X(28), fontFace:F,
    fontSize:pt(15.3), color:D_LIST, margin:0, isTextBox:true });
  s.addText("eov.ae  ·  Abu Dhabi  ·  Dubai", { x:MG+X(40), y:X(478), w:X(500), h:X(28), fontFace:F,
    fontSize:pt(15.3), color:D_MUTED, margin:0, isTextBox:true });
  s.addImage({ path:"assets/eov-wordmark-white.png", x:X(940), y:X(430), w:X(200), h:X(67) });
  s.addText("EOV Technology Innovation  ·  Commercial-in-confidence",
    { x:MG, y:Y_FOOT, w:CW, h:X(20), fontFace:F, fontSize:pt(12.7), color:D_MUTED, margin:0, valign:"middle", isTextBox:true });
}

p.writeFile({ fileName: "EOV-Credentials-2026.pptx" }).then(f => console.log("wrote", f, "-", n, "slides"));
