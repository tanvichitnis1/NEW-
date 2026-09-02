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
function beat(s, label, body, y, h){
  s.addText(label.toUpperCase(), { x:MG, y:y, w:X(496), h:X(18), fontFace:F, fontSize:pt(11),
    bold:true, charSpacing:2.6, color:L_MUTED, margin:0, valign:"middle", isTextBox:true });
  s.addText(body, { x:MG, y:y+X(24), w:X(496), h:X(h), fontFace:F, fontSize:pt(15.3),
    color:L_BODY, lineSpacing:pt(21), margin:0, valign:"top", isTextBox:true });
}
function caseSlide(o){
  const s = slide();
  s.addShape(p.ShapeType.rect, { x:IMX, y:0, w:IMW, h:H, fill:{ color:GREY }, line:{ type:"none" } });
  s.addText(o.image.toUpperCase(), { x:IMX+X(30), y:X(228), w:IMW-X(60), h:X(40), fontFace:F,
    fontSize:pt(12.7), bold:true, charSpacing:2.4, color:L_MUTED, align:"center", valign:"middle", isTextBox:true });
  // the figure the case turns on, set on the image rather than in a row of statistics
  s.addShape(p.ShapeType.rect, { x:IMX, y:X(498), w:IMW, h:H-X(498), fill:{ color:BLACK }, line:{ type:"none" } });
  s.addText(o.hero[0], { x:IMX+X(40), y:X(532), w:IMW-X(80), h:X(76), fontFace:F, fontSize:pt(50),
    bold:true, color:D_TEXT, margin:0, valign:"top", isTextBox:true });
  s.addText(o.hero[1].toUpperCase(), { x:IMX+X(40), y:X(614), w:IMW-X(80), h:X(46), fontFace:F,
    fontSize:pt(11.3), bold:true, charSpacing:2.4, color:CYAN, lineSpacing:pt(16), margin:0, valign:"top", isTextBox:true });
  eyebrow(s, o.eyebrow);
  title(s, o.title, false, { w:X(496), size:o.size||pt(30), ls:pt(36), h:X(124) });
  beat(s, "The situation", o.situation, X(228), 78);
  beat(s, "What EOV did",  o.move,      X(346), 122);
  beat(s, "What changed",  o.result,    X(500), 78);
  s.addText(o.scope, { x:MG, y:X(606), w:X(496), h:X(36), fontFace:F, fontSize:pt(11),
    bold:true, charSpacing:1.6, color:L_MUTED, lineSpacing:pt(16), margin:0, valign:"top", isTextBox:true });
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
  s.addText("tanvi@eov.ae  ·  eov.ae  ·  Abu Dhabi and Dubai", { x:MG, y:Y_FOOT, w:X(800), h:X(20),
    fontFace:F, fontSize:pt(12.7), color:D_MUTED, margin:0, valign:"middle", isTextBox:true });
}

/* 02 WHO WE ARE */
{ const s = slide();
  s.addShape(p.ShapeType.rect, { x:IMX, y:0, w:IMW, h:H, fill:{ color:GREY }, line:{ type:"none" } });
  s.addText("mohamed-yousif.png · team", { x:IMX+X(30), y:H/2-X(20), w:IMW-X(60), h:X(40), fontFace:F,
    fontSize:pt(12.7), bold:true, charSpacing:2.4, color:L_MUTED, align:"center", valign:"middle", isTextBox:true });
  eyebrow(s, "Who we are");
  title(s, "An Emirati-founded integrated marketing agency, working in the UAE since 2006.",
    false, { w:X(500), size:pt(34), ls:pt(41), h:X(200) });
  lead(s, "Abu Dhabi office, Dubai production facility. Six disciplines under one team and one contract — which is what turns single accountability from a claim into a structure.",
    false, { y:X(310), w:X(500), h:X(120) });
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
  title(s, "Twenty years across government, luxury, retail and industry.", false, { h:X(62), size:pt(38) });
  lead(s, "Government and semi-government work is won on published criteria and delivered under audit — the least forgiving way to build a client list, and the most durable.",
    false, { y:X(156), w:CW, h:X(46) });
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

/* FORREY & GALLAND */
{ const s = slide(true);
  eyebrow(s, "Forrey & Galland · Paris, La Belle Époque", true);
  title(s, "A Parisian chocolate house, reintroduced to the Gulf.", true, { size:pt(40), ls:pt(48), h:X(130) });
  lead(s, "Two families, Forrey and Galland, founded the house in Paris in the 1900s. It now trades from The Dubai Mall, working saffron, dates, pistachios and rose into a French craft tradition.",
    true, { y:X(230), w:X(900), h:X(70) });
  stat(s, [["1900s","Founded, Paris"],["100","Years of the house"],["Dubai Mall","Flagship boutique"],["5-star","Hotels, airlines, VIP"]],
    X(340), true, MG, X(220));
  img(s, MG, X(480), X(1136), X(150), "fg-kinara-1.png", true);
  footer(s, true);
  s.addNotes("Founding, boutique and ingredient detail from public sources. Confirm the boutique count and whether the Paris founding date may be stated as a fact.");
}
caseSlide({ eyebrow:"Forrey & Galland · luxury confectionery",
  title:"Owning the occasions the business sells into.",
  situation:"A hundred-year-old Parisian house trading in a market that knew the mall but not the name. Its four selling seasons move with the lunar calendar, so nothing carries over.",
  move:"EOV built each occasion as a permanent asset rather than a campaign that expires — product, photography, film, retail and search produced as one programme, so the same work carried the boutique, the feed and the search result. No paid search at any point.",
  result:"Search visibility up 3.4× and a peak of 1,510 visits, in a category where competitors buy their way to the top of the page.",
  hero:["3.4×","Search visibility · zero paid media"],
  scope:"Strategy · brand · photography · film · digital · retail · events",
  image:"ceylon-range.png" });
gallerySlide({ eyebrow:"Forrey & Galland",
  title:"For a business built on occasions, the calendar is the strategy.",
  frames:["fg-kinara-4.png","fg-kinara-2.png","retail-activation.png"] });

/* F&G — THE CALENDAR */
{ const s = slide();
  eyebrow(s, "Forrey & Galland · the calendar");
  title(s, "Four occasions, rebuilt every year.", false, { h:X(70), size:pt(38) });
  lead(s, "The lunar calendar moves roughly eleven days a year, so nothing carries over and nothing can be rescheduled. Each occasion is rebuilt from scratch as a full programme — product, photography, campaign, events and retail — against a shelf date that does not move.",
    false, { y:X(176), w:X(1000), h:X(80) });
  ["Ramadan","Eid al-Fitr","Eid al-Adha","Diwali"].forEach((t,i) => {
    const x = MG + i*X(288);
    img(s, x, X(270), X(269), X(180), "hatta-ramadan.png / uae-national-day.png", false);
    s.addText(t, { x:x, y:X(468), w:X(269), h:X(34), fontFace:F, fontSize:pt(18.7), bold:true,
      color:L_HEAD, margin:0, isTextBox:true });
  });
  footer(s, false);
  s.addNotes("Eight occasion pages exist on the site. Confirm which occasions may be shown and supply campaign imagery per occasion.");
}

/* 09 BRIDGE */
{ const s = slide(true);
  eyebrow(s, "Ferronato KGS Group · Lugano, 1906", true);
  title(s, "One group. Engineers on one side, luxury buyers on the other.", true, { size:pt(40), ls:pt(48), h:X(130) });
  lead(s, "A leading manufacturer of flexible diamond abrasives and metallised fabrics, entering the lifestyle category on its own industrial technology.",
    true, { y:X(230), w:X(900), h:X(56) });
  stat(s, [["1906","Founded, Lugano"],["4th","Generation"],["16","Countries"],["100+","Markets supplied"]],
    X(320), true, MG, X(220));
  img(s, MG, X(470), X(552), X(160), "exhibition-stand.png", true);
  img(s, MG+X(584), X(470), X(552), X(160), "ferronato-product.png", true);
  footer(s, true);
  s.addNotes("Confirmed by the client: KGS and Ferronato are two brands in one group. This slide is the hinge of the range argument.");
}

/* 10-11 KGS */
caseSlide({ eyebrow:"KGS · MetaFab® · industrial B2B",
  title:"Marketing a material that shields naval vessels.",
  situation:"Metallised fabric attenuating EMF, EMI and RF at material level, sold to engineers buying against a specification. Most agencies decline this brief.",
  move:"EOV stopped marketing the material and started marketing where it ends up. The specification stayed intact; the language moved to naval vessels, aircraft wiring and secure rooms — so a search that begins with a problem ends on the product.",
  result:"Visibility up 5.6× across 96 ranked terms, in a category with no consumer search behaviour to borrow.",
  hero:["5.6×","Visibility · 96 ranked terms · 40–90 dB"],
  scope:"Positioning · technical content · search · trade collateral",
  image:"ferronato-product.png" });
gallerySlide({ eyebrow:"KGS · MetaFab®",
  title:"Naval vessels. Aircraft wiring. Secure courtrooms.",
  frames:["[KGS application]","[KGS wiring]","[KGS material]"] });

/* 12-13 FERRONATO */
caseSlide({ eyebrow:"Ferronato Switzerland · smart accessories",
  title:"Privacy as a product, not a promise.",
  situation:"The same group’s industrial technology entering a lifestyle category where privacy was being promised by everyone and proven by no one.",
  move:"EOV built the brand on the one claim competitors could not copy: a benefit the buyer can test in their own hand. The product became the proof, and the launch was staged where Swiss credibility is already assumed — the Swiss Pavilion at Expo 2020 Dubai.",
  result:"Global debut in front of a pavilion audience of 300,000+, four product lines in market, and the first Swiss boutique open by May 2023.",
  hero:["300k+","Pavilion audience at global debut"],
  scope:"Brand · product marketing · retail · film · PR · launch",
  image:"ferronato-store.png",
  notes:"Send the PR record and this slide is finished: publications with dates and tier, retail doors, awareness study, influencer reach, and which markets US and EU distribution covers." });
gallerySlide({ eyebrow:"Ferronato Switzerland",
  title:"One brand system across retail, film and product.",
  frames:["ferronato-store.png","ferronato-campaign.png","ferronato-atelier.png"] });

/* FILMS */
{ const s = slide();
  eyebrow(s, "Ferronato Switzerland · campaign");
  title(s, "Three festive films, one idea.", false, { h:X(70), size:pt(38) });
  lead(s, "The gift nobody thinks to ask for: an hour of being unreachable. One idea, carried across three films and a festive retail season.",
    false, { y:X(176), w:X(900), h:X(60) });
  [["Gift of Privacy",""],["Disconnect and Connect",""],["Stay off-grid",""]].forEach((it,i) => {
    const x = MG + i*X(386);
    img(s, x, X(250), X(357), X(200), "[festive film still]", false);
    s.addText(it[0], { x:x, y:X(468), w:X(357), h:X(34), fontFace:F, fontSize:pt(18.7), bold:true,
      color:L_HEAD, margin:0, isTextBox:true });
  });
  footer(s, false);
  s.addNotes("Three films exist. Stills or the films themselves are the strongest asset on this case after the boutique photography.");
}

/* OPEC */
{ const s = slide(true);
  eyebrow(s, "OPEC International Seminar · Hofburg, Vienna", true);
  title(s, "The room the UAE had to host.", true, { size:pt(45.3), ls:pt(54), h:X(110) });
  lead(s, "The OPEC International Seminar gathers energy ministers, decision makers, diplomats and international media in Vienna. The UAE delegation is led by the Minister of Energy, with officials from ADNOC and Mubadala.",
    true, { y:X(215), w:X(920), h:X(80) });
  stat(s, [["700+","Delegates at the UAE dinner"],["Hofburg","Vienna"],["Ministerial","Delegation"]],
    X(330), true, MG, X(280));
  img(s, MG, X(470), X(1136), X(160), "eov-opec-minister.jpg", true);
  footer(s, true);
  s.addNotes("Delegate count, venue and delegation composition are externally documented for the OPEC International Seminar. CONFIRM which edition EOV delivered before stating the linkage — the site says 'OPEC events' plural.");
}
caseSlide({ eyebrow:"OPEC · UAE Night, Vienna",
  title:"A national event, delivered in a foreign capital.",
  situation:"A fixed date in the OPEC calendar at the Hofburg, Vienna, hosting ministers, diplomats and international media — with none of a home market’s suppliers to fall back on.",
  move:"EOV treated the room as the deliverable and worked backwards from it. Protocol was settled before any creative decision was taken, and sourcing, production and rehearsal were built in Vienna to a standard set in Abu Dhabi.",
  result:"700+ delegates hosted at UAE Night, in partnership with H.E. Suhail Al Mazrouei, Minister of Energy.",
  hero:["700+","Delegates hosted · UAE Night"],
  scope:"Event strategy · protocol · production · content · media",
  image:"eov-opec-vienna.jpg",
  notes:"Consent required — OPEC is intergovernmental and the Ministry federal. Still needed: the year, scope delivered, attendance." });
gallerySlide({ eyebrow:"OPEC · UAE Night, Vienna",
  title:"Nine photographs and a film exist. None have been in a deck.",
  frames:["eov-opec-vienna.jpg","[Vienna room]","eov-opec-minister.jpg"] });

/* OPEC — THE STRAND */
{ const s = slide();
  eyebrow(s, "Institutional events");
  title(s, "Not once. A standing capability.", false, { h:X(70), size:pt(38) });
  lead(s, "The website records OPEC events in the plural, alongside the Arab SMIS Summit. Institutional event delivery is a strand of the practice rather than a single engagement.",
    false, { y:X(180), w:X(1000), h:X(56) });
  [["OPEC · UAE Night","Vienna"],["OPEC events","Multiple editions [CONFIRM]"],["Arab SMIS Summit","Institutional"]].forEach((it,i) => {
    const x = MG + i*X(386);
    img(s, x, X(265), X(357), X(190), "Event photography", false);
    s.addText(it[0], { x:x, y:X(472), w:X(357), h:X(32), fontFace:F, fontSize:pt(18.7), bold:true,
      color:L_HEAD, margin:0, isTextBox:true });
    s.addText(it[1], { x:x, y:X(506), w:X(357), h:X(28), fontFace:F, fontSize:pt(15.3),
      color:L_BODY, margin:0, isTextBox:true });
  });
  footer(s, false);
  s.addNotes("This slide only ships if the plural is confirmed. If Vienna was the only one, cut it — a single event overclaimed as a capability is exactly the kind of thing a government buyer checks.");
}

/* 16 THE CLOSE */
{ const s = slide(true);
  img(s, 0, 0, X(640), H, "Vienna film · or eov-opec-minister.jpg", true);
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
    img(s, x, y, X(209), X(140), "[project image]", false);
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
    ["PARTNERED", ["Specialist production and media depth",
      "Brought in by name, on the record, and","disclosed on every engagement.","",
      "Never sub-contracted quietly, and never","billed as in-house."], PANEL, D_TEXT, CYAN]];
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
  [["01","Success defined before spend","The objective, the audience and the measure are agreed and written down before budget is committed. Disagreement surfaces in week one, not at the review."],
   ["02","Measurement built before launch","Tracking and reporting are built and tested before the first impression is bought, so the first report is a reading rather than a reconstruction."],
   ["03","Accounts built in the client's name","Platforms, advertising accounts, analytics and CRM are created under the client's entity. When an agency leaves, the history stays."]]
  .forEach((it,i) => {
    const y = X(220) + i*X(112);
    s.addShape(p.ShapeType.roundRect, { x:MG, y:y, w:CW, h:X(96), rectRadius:X(10),
      fill:{ color:GREY }, line:{ type:"none" } });
    s.addText(it[0], { x:MG+X(28), y:y, w:X(60), h:X(96), fontFace:F, fontSize:pt(25.3), bold:true,
      color:L_MUTED, valign:"middle", isTextBox:true });
    s.addText(it[1], { x:MG+X(104), y:y+X(22), w:X(420), h:X(30), fontFace:F, fontSize:pt(18.7),
      bold:true, color:L_HEAD, margin:0, valign:"top", isTextBox:true });
    s.addText(it[2], { x:MG+X(540), y:y+X(18), w:X(560), h:X(66), fontFace:F, fontSize:pt(14.7),
      color:L_BODY, lineSpacing:pt(20), margin:0, valign:"top", isTextBox:true });
  });
  footer(s, false);
  s.addNotes("The third rule must be true today, or it comes out. It is the easiest claim in the deck for a client's technical lead to check.");
}

/* 21 ENGAGEMENT */
{ const s = slide();
  eyebrow(s, "How an engagement runs");
  title(s, "One contract, one team, one point of accountability.", false, { h:X(70), size:pt(38) });
  [["Definition","A short paid stage that ends in a written definition rather than a proposal: objective, audience, and the measure of success."],
   ["Build","Platforms, measurement and creative built against that definition, in the client's name."],
   ["Run","Delivery and reporting on a fixed cadence, with one senior contact who does not change."]]
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
  const people = [["Mohamed Yousif","Chief Executive · founder","mohamed-yousif.png"],
    ["[NAME]","[Role]","[portrait]"],["[NAME]","[Role]","[portrait]"],["[NAME]","[Role]","[portrait]"]];
  people.forEach((pr,i) => {
    const x = MG + i*X(292);
    img(s, x, X(215), X(269), X(280), pr[2], false);
    s.addText(pr[0], { x:x, y:X(510), w:X(269), h:X(30), fontFace:F, fontSize:pt(18.7), bold:true,
      color:L_HEAD, margin:0, isTextBox:true });
    s.addText(pr[1], { x:x, y:X(544), w:X(269), h:X(28), fontFace:F, fontSize:pt(15.3),
      color:L_BODY, margin:0, isTextBox:true });
  });
  footer(s, false);
  s.addNotes("Three to five named people, not the org chart. Also state how many work in Arabic to professional standard — buyers ask and most UAE agencies answer vaguely.");
}

/* 23 PARTNERS */
{ const s = slide();
  eyebrow(s, "Partners");
  title(s, "Depth bought where it is better bought than built.", false, { h:X(70), size:pt(38) });
  lead(s, "Capacity is the standing question asked of any agency this size. EOV answers it by naming the partners rather than absorbing them into a headcount figure.",
    false, { y:X(198), w:X(940), h:X(60) });
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
  s.addText("EOV Technology Innovation", { x:MG+X(40), y:X(408), w:X(500), h:X(30), fontFace:F, fontSize:pt(18.7),
    bold:true, color:D_TEXT, margin:0, isTextBox:true });
  s.addText("tanvi@eov.ae  ·  [direct line]", { x:MG+X(40), y:X(444), w:X(500), h:X(28), fontFace:F,
    fontSize:pt(15.3), color:D_LIST, margin:0, isTextBox:true });
  s.addText("eov.ae  ·  Abu Dhabi  ·  Dubai", { x:MG+X(40), y:X(478), w:X(500), h:X(28), fontFace:F,
    fontSize:pt(15.3), color:D_MUTED, margin:0, isTextBox:true });
  s.addImage({ path:"assets/eov-wordmark-white.png", x:X(940), y:X(430), w:X(200), h:X(67) });
  s.addText("EOV Technology Innovation  ·  Commercial-in-confidence",
    { x:MG, y:Y_FOOT, w:CW, h:X(20), fontFace:F, fontSize:pt(12.7), color:D_MUTED, margin:0, valign:"middle", isTextBox:true });
}

p.writeFile({ fileName: "EOV-Credentials-2026.pptx" }).then(f => console.log("wrote", f, "-", n, "slides"));
