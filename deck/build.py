# -*- coding: utf-8 -*-
import json, os

W, H = 1280, 720
INK   = "#2A2118"; PAPER = "#F2EDE4"; SLATE = "#6E6355"
ACC   = "#8A6A3A"; RULE  = "#D9D1C2"
D_PAPER = "#221B14"; D_INK = "#EFE8DA"; D_SLATE = "#A4988A"; D_ACC = "#C29A5C"; D_RULE = "#3A3026"

FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
         'family=Archivo:wght@400;500;600&'
         'family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400&display=swap">')
SER = "Newsreader, Georgia, 'Times New Roman', serif"
SAN = "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"

def shell(body, dark=False):
    bg = D_PAPER if dark else PAPER
    fg = D_INK if dark else INK
    a  = D_ACC if dark else ACC
    return f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  {FONTS}
  <style>
    body {{ margin: 0; background: {bg}; }}
    a {{ color: {a}; text-decoration: none; }}
    a:hover {{ color: {fg}; }}
    * {{ box-sizing: border-box; }}
  </style>
</helmet>
<div style="width: {W}px; height: {H}px; background: {bg}; color: {fg}; font-family: {SAN}; position: relative; overflow: hidden;">
{body}
</div>
</x-dc>
</body>
</html>
"""

def num(n, dark=False):
    c = D_SLATE if dark else "#A8AEB6"
    return (f'<div style="position: absolute; right: 56px; bottom: 44px; font-family: {SAN}; '
            f'font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: {c};">{n}</div>')

def eyebrow(t, dark=False):
    c = D_ACC if dark else ACC
    r = D_RULE if dark else RULE
    return (f'<div style="margin-bottom: 30px;">'
            f'<div style="font-family: {SAN}; font-size: 10.5px; font-weight: 600; letter-spacing: 0.22em; '
            f'text-transform: uppercase; color: {c}; margin-bottom: 12px;">{t}</div>'
            f'<div style="width: 100%; height: 1px; background: {r};"></div></div>')

def hl(t, size=52, dark=False, mb=22):
    c = D_INK if dark else INK
    return (f'<div style="font-family: {SER}; font-weight: 400; font-size: {int(size*1.16)}px; line-height: 1.03; '
            f'letter-spacing: -0.025em; color: {c}; margin-bottom: {mb}px; max-width: 19ch; text-wrap: balance;">{t}</div>')

def body(t, dark=False, mw="48ch", size=19):
    c = D_SLATE if dark else SLATE
    return (f'<div style="font-family: {SAN}; font-size: {size}px; font-weight: 400; line-height: 1.55; '
            f'color: {c}; max-width: {mw};">{t}</div>')

def pad(inner, top=76, side=88):
    return f'<div style="position: absolute; inset: {top}px {side}px; display: flex; flex-direction: column; justify-content: center;">{inner}</div>'

def figs(items, dark=False):
    c_v = D_ACC if dark else ACC
    c_k = D_SLATE if dark else SLATE
    cells = "".join(
        f'<div style="display: flex; flex-direction: column; gap: 8px;">'
        f'<div style="font-family: {SER}; font-weight: 400; font-size: 54px; line-height: 1; color: {c_v}; letter-spacing: -0.02em;">{v}</div>'
        f'<div style="font-family: {SAN}; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; '
        f'text-transform: uppercase; color: {c_k}; max-width: 17ch; line-height: 1.45;">{k}</div></div>'
        for v, k in items)
    return f'<div style="display: flex; gap: 64px; margin: 30px 0 26px;">{cells}</div>'

def lines(items, dark=False):
    c = D_INK if dark else INK
    a = D_ACC if dark else ACC
    rows = "".join(
        f'<div style="display: flex; gap: 16px; align-items: baseline;">'
        f'<span style="color: {a}; font-family: {SAN}; font-size: 15px;">—</span>'
        f'<span style="font-family: {SAN}; font-size: 21px; font-weight: 400; color: {c};">{t}</span></div>'
        for t in items)
    return f'<div style="display: flex; flex-direction: column; gap: 14px; margin-top: 8px;">{rows}</div>'

def ph(label, h=None, dark=False, w="100%"):
    b = D_RULE if dark else RULE
    c = D_SLATE if dark else "#9BA3AC"
    hh = f"height: {h}px;" if h else "flex-grow: 1;"
    return (f'<div style="width: {w}; {hh} border: 1px dashed {b}; display: flex; align-items: center; '
            f'justify-content: center; font-family: {SAN}; font-size: 10.5px; font-weight: 600; '
            f'letter-spacing: 0.12em; text-transform: uppercase; color: {c}; text-align: center; padding: 12px;">{label}</div>')

def grid_ph(labels, cols=6, dark=False):
    b = D_RULE if dark else RULE
    c = D_SLATE if dark else "#9BA3AC"
    cells = "".join(
        f'<div style="height: 76px; border: 1px dashed {b}; display: flex; align-items: center; '
        f'justify-content: center; font-family: {SAN}; font-size: 9.5px; font-weight: 600; '
        f'letter-spacing: 0.08em; color: {c}; text-align: center; padding: 6px;">{l}</div>' for l in labels)
    return (f'<div style="display: grid; grid-template-columns: repeat({cols}, minmax(0, 1fr)); '
            f'gap: 14px; margin-top: 26px;">{cells}</div>')

S = {}

# 01 COVER — dark
S["Cover"] = shell(
    f'<div style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 76px 88px;">'
    f'<div style="font-family: {SER}; font-size: 104px; line-height: 1; color: {D_INK}; letter-spacing: -0.035em;">EOV</div>'
    f'<div>'
    f'<div style="width: 64px; height: 2px; background: {D_ACC}; margin-bottom: 26px;"></div>'
    f'<div style="font-family: {SAN}; font-size: 21px; font-weight: 400; color: {D_INK}; line-height: 1.5;">'
    f'Integrated marketing.<br>Abu Dhabi and Dubai. Since 2006.</div>'
    f'<div style="font-family: {SAN}; font-size: 12px; font-weight: 500; letter-spacing: 0.1em; color: {D_SLATE}; margin-top: 30px;">'
    f'[NAME] · [TITLE] · [EMAIL] · [PHONE]</div>'
    f'</div></div>', dark=True)

# 02 WHO WE ARE
S["WhoWeAre"] = shell(pad(
    eyebrow("Who we are") +
    hl("An Emirati-founded integrated marketing agency, working here since 2006.", 50) +
    body("Abu Dhabi office, Dubai production facility. Strategy, brand, digital, communications, media and production — one team.") +
    ph("Team or office photograph", h=176) ) + num("02"))

# 03 THE PROBLEM
S["TheProblem"] = shell(pad(
    eyebrow("The problem") +
    hl("Most companies buy marketing in pieces. Nobody is answerable for the whole.", 50) +
    body("Brand here. Media there. A web developer, a PR firm, a production house. Each does its part.") +
    f'<div style="margin-top: 44px; padding-top: 26px; border-top: 1px solid {RULE}; font-family: {SER}; '
    f'font-size: 29px; font-style: italic; color: {INK}; max-width: 34ch;">'
    f'It works — until something cannot be done twice.</div>' ) + num("03"))

# 04 THE CLAIM — dark, the hinge
S["TheClaim"] = shell(
    f'<div style="position: absolute; inset: 76px 88px; display: flex; flex-direction: column; justify-content: center;">'
    + eyebrow("What we are for", dark=True) +
    f'<div style="font-family: {SER}; font-size: 88px; line-height: 1.0; letter-spacing: -0.03em; '
    f'color: {D_INK}; max-width: 18ch; margin-bottom: 34px; text-wrap: balance;">'
    f'Twenty years of work that had to be right the first time.</div>'
    + body("An event staged abroad on a fixed date. A season that arrives whether you are ready. A launch with one window.", dark=True, mw="52ch")
    + '</div>' + num("04", dark=True), dark=True)

# 05 CLIENTS
S["Clients"] = shell(pad(
    eyebrow("Clients") +
    hl("Twenty years across government, luxury goods, retail, food and manufacturing.", 46, mb=6) +
    grid_ph(["OPEC","MUBADALA","ADNOC","RTA","DEWA","ESMA",
             "MINISTRY OF<br>ENERGY","MINISTRY OF<br>ECONOMY","FCA","MOPA","DAMAC","HMS"], 6),
    top=68) + num("05"))

# 06 F&G BASELINE
S["ForreyBaseline"] = shell(pad(
    eyebrow("Forrey &amp; Galland") +
    hl("Search visibility up 3.4×, with no paid media at all.", 50) +
    figs([("75 → 254","Ranking keywords"),("Zero","Paid search"),("1,510","Peak monthly visits")]) +
    body("A UAE luxury confectioner. Growth bought with structure rather than budget.") ) + num("06"))

# 07 F&G CALENDAR
S["ForreyCalendar"] = shell(
    f'<div style="position: absolute; inset: 0; display: flex;">'
    f'<div style="width: 56%; padding: 76px 46px 76px 88px; display: flex; flex-direction: column; justify-content: center;">'
    + eyebrow("Forrey &amp; Galland")
    + hl("For a business built on occasions, the calendar is the strategy.", 44)
    + body("Ramadan. Eid al-Fitr. Eid al-Adha. Diwali. Each a full programme — and the dates move eleven days a year.", mw="34ch")
    + f'<div style="margin-top: 32px; padding-top: 22px; border-top: 1px solid {RULE}; font-family: {SER}; '
      f'font-size: 25px; font-style: italic; color: {INK}; max-width: 30ch;">'
      f'That is one business. The next is one owner with two.</div>'
    + '</div>'
    f'<div style="width: 44%; padding: 76px 88px 76px 0; display: flex;">'
    + ph("Campaign, shoot and<br>event photography") + '</div></div>' + num("07"))

# 08 ONE GROUP
S["OneGroup"] = shell(
    f'<div style="position: absolute; inset: 0; display: flex; flex-direction: column;">'
    f'<div style="padding: 72px 88px 30px;">'
    + eyebrow("One group, two brands")
    + hl("One material. Engineers on one side, luxury buyers on the other.", 46, mb=16)
    + body("The same group makes shielding fabric for naval vessels, and a luxury brand built on privacy.", mw="60ch")
    + '</div>'
    f'<div style="flex-grow: 1; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; padding: 0 88px 72px;">'
    + ph("Naval or aerospace application") + ph("Finished leather product") + '</div></div>' + num("08"))

# 09 KGS
S["KGS"] = shell(pad(
    eyebrow("KGS · the industrial half") +
    hl("Marketing a material that shields naval vessels.", 50) +
    figs([("17 → 96","Ranking keywords"),("5.6×","Organic visibility"),("40–90 dB","Shielding, material level")]) +
    body("Engineers buying to specification, on cycles measured in quarters.") ) + num("09"))

# 10 FERRONATO
S["Ferronato"] = shell(pad(
    eyebrow("Ferronato · the consumer half") +
    hl("Every rival sold protection. We launched the first luxury range built on privacy.", 44) +
    figs([("300,000+","Visitors at the Expo 2020 Dubai debut"),("May 2023","First Swiss boutique opened"),("US + EU","Distribution expanded into")]) +
    body("A category-first launch is measured in coverage and doors, not clicks.") +
    f'<div style="margin-top: 26px; padding-top: 20px; border-top: 1px solid {RULE}; font-family: {SER}; '
    f'font-size: 25px; font-style: italic; color: {INK};">'
    f'Same owner. Same agency. Two entirely different jobs.</div>', top=64) + num("10"))

# 11 OPEC VIENNA
S["Vienna"] = shell(
    f'<div style="position: absolute; inset: 0; display: flex;">'
    f'<div style="width: 46%; padding: 76px 40px 76px 88px; display: flex; flex-direction: column; justify-content: center;">'
    + eyebrow("OPEC · Vienna")
    + hl("UAE Night, Vienna. Organised by EOV.", 46)
    + body("A national event delivered in a foreign capital, in partnership with H.E. Suhail Al Mazrouei, Minister of Energy.", mw="30ch")
    + '</div>'
    f'<div style="width: 54%; padding: 76px 88px 76px 0; display: flex;">'
    + ph("Event photography<br>Nine images exist on the site today") + '</div></div>' + num("11"))

# 12 THE CLOSE — dark
S["TheClose"] = shell(
    f'<div style="position: absolute; inset: 0; display: flex; flex-direction: column;">'
    f'<div style="flex-grow: 1; padding: 72px 88px 0; display: flex;">'
    + ph("The Vienna video, or its strongest single frame", dark=True) + '</div>'
    f'<div style="padding: 34px 88px 72px;">'
    f'<div style="font-family: {SAN}; font-size: 19px; font-weight: 400; color: {D_SLATE}; margin-bottom: 16px;">'
    f'A fixed date. A foreign city. A country being represented.</div>'
    f'<div style="font-family: {SER}; font-size: 52px; line-height: 1.06; color: {D_INK}; letter-spacing: -0.025em;">'
    f'Nothing about that brief allowed a second attempt.</div>'
    f'</div></div>' + num("12", dark=True), dark=True)

# 13 WHAT WE DO
S["WhatWeDo"] = shell(pad(
    eyebrow("What we do") +
    hl("Six disciplines, one brief, one team.", 50, mb=28) +
    lines(["Strategy and research","Brand and creative","Digital platforms and ecommerce",
           "Communications and PR","Media planning and buying","Production, photography and events"]) +
    f'<div style="margin-top: 26px; font-family: {SAN}; font-size: 13px; color: #9BA3AC; letter-spacing: 0.04em;">'
    f'[MARK EACH — IN-HOUSE OR PARTNER]</div>' ) + num("13"))

# 14 HOW WE WORK
S["HowWeWork"] = shell(pad(
    eyebrow("How we work") +
    hl("Three things we do before anything goes live.", 50, mb=32) +
    lines(["Success defined before spend","Measurement built before launch","Everything built in your name"]) ) + num("14"))

# 15 THE PEOPLE
S["ThePeople"] = shell(
    f'<div style="position: absolute; inset: 0; display: flex; flex-direction: column;">'
    f'<div style="padding: 72px 88px 26px;">' + eyebrow("The team")
    + hl("The people who would run your account.", 46, mb=0) + '</div>'
    f'<div style="flex-grow: 1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; padding: 0 88px 72px;">'
    + "".join(ph("Portrait<br>Name · Role<br>One line") for _ in range(4)) + '</div></div>' + num("15"))

# 16 HOW TO START
S["Main"] = shell(pad(
    eyebrow("Next step") +
    hl("One contract, one team, one point of accountability.", 50) +
    body("We start with a short paid definition stage. Everything after is built against it.") +
    f'<div style="margin-top: 46px; padding-top: 26px; border-top: 1px solid {RULE}; font-family: {SAN}; '
    f'font-size: 17px; line-height: 1.7; color: {INK};">'
    f'[NAME], [TITLE]<br>[EMAIL] · [PHONE]<br>'
    f'<span style="color: {SLATE};">eov.ae · Abu Dhabi · Dubai</span></div>' ) + num("16"))


for name, src in S.items():
    open(f"{name}.dc.html", "w").write(src)

order = ["Cover","WhoWeAre","TheProblem","TheClaim","Clients","ForreyBaseline","ForreyCalendar",
         "OneGroup","KGS","Ferronato","Vienna","TheClose","WhatWeDo","HowWeWork","ThePeople","Main"]
arts = [{"file": f"{n}.dc.html", "x": (i % 4) * (W + 130), "y": (i // 4) * (H + 190), "w": W, "h": H}
        for i, n in enumerate(order)]

canvas = {
  "artboards": arts,
  "annotations": [
    {"id": "beat-1", "x": 0, "y": -150, "w": 560,
     "text": "BEAT 1-2 · Orientation, then recognition.\nSlide 03 closes on the line that opens the claim."},
    {"id": "beat-3", "x": 4230, "y": -150, "w": 520,
     "text": "BEAT 3 · The hinge. Inverted on purpose.\nStated once, never repeated."},
    {"id": "beat-4", "x": 0, "y": 755, "w": 640,
     "text": "BEAT 4 · Evidence, rising in stakes.\nForrey & Galland sets the baseline; KGS + Ferronato demonstrate range side by side; Vienna closes."},
    {"id": "beat-5", "x": 0, "y": 2495, "w": 560,
     "text": "BEAT 5 · Risk. Disciplines sit here, after the proof — a list read before the evidence is a claim."}
  ],
  "launch": {"view": "canvas"}
}
import json
open("canvas.json","w").write(json.dumps(canvas, indent=2))
print("wrote", len(S), "artboards")
