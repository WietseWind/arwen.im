# arwen.im

De website van Arwèn. Een statische pagina met tegels die naar haar spellen linken.

## Wat het is

Drie bestanden en een plaatje. Geen build, geen frameworks, geen npm, geen externe
requests — geen CDN, geen webfonts, geen analytics. Dubbelklik `index.html` en het
werkt, ook zonder internet.

```
index.html    de hele pagina, inclusief alle tekeningen als inline SVG
style.css     alle opmaak; het kleurenpalet staat bovenaan als custom properties
script.js     één ding: tik op Loela of Bobbel en ze zeggen iets
img/          de screenshots voor de tegels
_headers      cache-instelling voor Cloudflare Pages
```

## Een tegel toevoegen

Boven `<div class="raster">` in `index.html` staat een commentaarblok met de stappen.
Kort samengevat:

1. Kopieer het hele `<a class="tegel">`-blok en plak het eronder.
2. Vervang de `href`, de `src`, de `<h3>`, het `<p>`-regeltje en de chips.
3. Zet de screenshot in `img/`. Verhouding 16:10, het liefst 1600 × 1000.
4. Schrijf een nieuwe Nederlandse `alt`-tekst die beschrijft wat je op het plaatje ziet.

`tegel--groot` is alleen voor de eerste, brede tegel — laat die class weg bij gewone
tegels. Het raster is 1 kolom op de telefoon en 2 vanaf 620px.

## Kleuren

Alles staat bovenaan `style.css` in `:root`. Eén harde regel: **pastel is nooit een
letterkleur.** Alle tekst is `--inkt` of `--inkt-zacht`; witte tekst bestaat alleen op
`--roze-inkt`. De contrastverhoudingen staan er als commentaar bij — reken opnieuw na
als je een kleur wijzigt.

## De mascottes

- **Loela de uil** en **Bobbel de axolotl** zijn inline SVG in `index.html`, met
  Nederlands commentaar boven de onderdelen.
- Bobbel is expres getekend als hetzelfde beestje als in het spel: dezelfde ronde kop,
  dezelfde grote ogen, dezelfde karmijnroze kieuwpluimen. Zo voelt de tegel als een
  raampje naar dezelfde wereld.
- Aantikken laat ze een zinnetje zeggen. Die zinnetjes staan bovenin `script.js`.
- Elk gezicht gebruikt dezelfde formule: grote ovale ogen met een glimlichtje, een
  w-mondje en twee blosjes. Houd je daaraan, anders valt de stijl uit elkaar.

## Let op

De naam is **altijd `Arwèn`**, met accent grave op de e. Alleen de domeinnamen
`arwen.im` en `tafels.arwen.im` blijven zonder accent. Na een wijziging:

```bash
grep -n "Arwen" index.html style.css script.js README.md
```

Daar hoort niets uit te komen behalve de domeinnamen.

## Deployen

Statische hosting, niets te bouwen. Op Cloudflare Pages: de map zelf als output
directory, geen build command. Het domein is `arwen.im`; het tafelspel komt op
`tafels.arwen.im`, waar de tegel naar linkt.

Gebruik je GitHub Pages, zet er dan nog een `CNAME` met `arwen.im` bij.
