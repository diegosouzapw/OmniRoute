# 🗜️ Prompt Compression Guide — OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Säästke sobiva konteksti puhul automaatselt 15–95%. Kiire ülevaate leiate [README tihendamise jaotisest](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ülevaade

OmniRoute rakendab modulaarset viipade tihendamise konveierit, mis käivitatakse **ennetavalt** enne päringute edastamist teenusepakkujatele. See tähendab, et tokenite säästmine toimub läbipaistvalt — teie töövoogu pole vaja muuta.

```
Kliendi päring
  → Tihendusstrateegia valija
    → Kombinatsiooni alistus? → Kasuta kombinatsiooni seadistust
    → Automaatse käivitamise lävi? → Kasuta automaatrežiimi
    → Vaikerežiim? → Kasuta üldist seadistust
    → Väljas? → Jäta tihendamine vahele
  → Valitud tihendusrežiim
    → Väljas: tihendamist ei toimu
    → Kerge: turvaline tühimärkide/vorminduse korrastus (~15%)
    → Standardne: Cavemani-stiilis täitesõnade eemaldamine (~30%)
    → Agressiivne: ajaloo vanandamine + kokkuvõtete loomine (~50%)
    → Ultra: heuristiline kärpimine + koodiplokkide hõrendamine (~75%)
    → RTK: käsuteadlik terminali-/tööriistaväljundi filtreerimine (60–90% ülesvooluvahemik)
    → Virnastatud: järjestatud mitme mootoriga konveier, tavaliselt RTK ja seejärel Caveman (78–95% sobivusvahemik)
  → Tihendatud päring → Teenusepakkuja
```

---

## Tihendusrežiimid

### Väljas

Tihendamist ei rakendata. Kõik sõnumid edastatakse muutmata kujul.

### Kerge režiim (~15% säästu, <1ms latentsus)

Kõige turvalisem režiim — semantilisi muudatusi pole, korrastatakse ainult vormindust:

| Tehnika                  | Kirjeldus                                                   |
| ------------------------ | ----------------------------------------------------------- |
| `collapseWhitespace`     | Järjestikuste tühjade ridade ja lõputühikute ühendamine     |
| `dedupSystemPrompt`      | Dubleerivate süsteemisõnumite eemaldamine                   |
| `compressToolResults`    | Paljusõnaliste tööriista-/funktsiooniväljundite tihendamine |
| `removeRedundantContent` | Korduvate juhiste eemaldamine                               |
| `replaceImageUrls`       | Base64-kujutiste andme-URI-de lühendamine                   |

**Sobib kõige paremini:** pidevaks kasutamiseks ja ohutuskriitilisteks töövoogudeks.

### Standardrežiim (~30% säästu)

Inspireeritud projektist [Caveman](https://github.com/JuliusBrussee/caveman) — eemaldab täitesõnu ja paljusõnalisi väljendeid, säilitades samal ajal tähenduse:

- Eemaldab täitesõnad („palun“, „ma arvan“, „põhimõtteliselt“, „tegelikult“)
- Lühendab paljusõnalisi väljendeid („selleks, et“ → „et“, „selle tulemusena“ → „sest“)
- Eemaldab viisaka pehmendamise („Kas teil oleks võimalik...“, „Kui saaksite ehk...“)
- Üle 30 regulaaravaldise reegli, mis on kohandatud programmeerimisviipadele

**Sobib kõige paremini:** igapäevasteks programmeerimistöövoogudeks ja kuluteadlikele meeskondadele.

### Agressiivne režiim (~50% säästu)

Nutikas ajaloo haldamine pikkade seansside jaoks:

- **Sõnumite vanandamine** — vanemaid sõnumeid tihendatakse järjest rohkem
- **Tööriistatulemuste tihendamine** — pikad tööriistaväljundid kärbitakse või jäetakse välja (esimesed/viimased read,
  sobivate ridade filtreerimine, JSON-võtmete tihendamine)
- **Struktuurse tervikluse kaitsed** — tagavad, et `tool_use` + `tool_result` paarid püsivad kooskõlas
- **Kontekstiakna arvestamine** — järgib iga mudeli tokenipiiranguid

**Sobib kõige paremini:** pikkadeks silumisseanssideks ja suurte koodibaaside jaoks.

### Ultra-režiim (~75% säästu)

Maksimaalne tihendamine tokenikriitiliste olukordade jaoks:

- **Heuristiline kärpimine** — proosa skooripõhine tokenite kärpimine
- **Struktuuri säilitamine** — piirdega koodiplokid, reasisesed koodiosad, URL-id ja identifikaatorid
  asendatakse ajutiste tähistega ning taastatakse sõna-sõnalt; neid ei kärbita kunagi
- **Valikuline SLM-aste** — seadistamise korral saab väike kohalik mudel kärpimist täiustada
- Agressiivsest režiimist sõltumatu: see ei kasuta sõnumite vanandamist, tööriistatulemuste tihendamist
  ega varukokkuvõtjat (ainult SLM-astme tõrge võib suunata varutöötluse läbi
  agressiivse režiimi)

**Sobib kõige paremini:** kui jõuate korduvalt kontekstipiiranguteni.

### RTK-režiim (60–90% ülesvooluvahemik)

RTK-režiim on optimeeritud programmeerimisagentide seanssides esinevate paljusõnaliste tööriistaväljundite jaoks:

- Tuvastab käsu-/väljundiklassid, nagu `git status`, `git diff`, `git log`, testikäitajad,
  TypeScripti/Vite'i/Webpacki järgud, ESLint/Biome/Prettier, npm-i auditid/paigaldused, Dockeri logid, taristu
  väljund ja üldine kestaväljund
- Rakendab JSON-filtripakette asukohast `open-sse/services/compression/engines/rtk/filters/`
- Impordib RTK TOML-i skeemi v1 filtrid projekti või üldistest `filters.toml` failidest koos tekstisiseste testide
  valideerimise ja projektifailide usalduspõhise piiramisega
- Sisaldab 55 sisseehitatud filtrit koos tekstisiseste kontrollnäidistega
- Eemaldab ANSI juhtjärjendid, edenemisribad, korduvad read ja mittevajaliku müra
- Säilitab nurjumised, vead, hoiatused, muudetud failid, kokkuvõtted ja pika väljundi lõpuosa
- Toetab usalduspõhiselt piiratud projektifiltreid, üldisi filtreid ja valikulist redigeeritud toorväljundi taastamist

**Sobib kõige paremini:** agendiseanssideks, mis sisaldavad kesta-, järgu-, testi-, git-, grep- ja failiväljundite transkripte.

### Virnastatud režiim (78–95% sobivusvahemik)

Virnastatud režiim käitab mitut tihendusmootorit deterministlikus järjestuses. Vaikekonveier on:

```txt
RTK -> Caveman
```

See järjestus tihendab esmalt terminali-/tööriistaväljundi ning rakendab seejärel ülejäänud
loomulikus keeles viibale Cavemani semantilist lühendamist. Virnastatud konveiereid saab seadistada üldiselt või
marsruutimiskombinatsioonidele määratud tihenduskombinatsioonide kaudu.

**Sobib kõige paremini:** segakonteksti jaoks, mis sisaldab suuri tööriistaloge koos inimese juhiste või assistendi kokkuvõtetega.

---

## Ülesvoo kokkuhoiu arvutus

OmniRoute dokumenteerib tihendamisest saadava kokkuhoiu kahe allika põhjal: ülesvooprojektide võrdlustestid ja
OmniRoute'i enda mootorite kombinatsioon.

| Allikas | Siin kasutatud ülesvoo README näitaja                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` vähem väljundtokeneid, võrdlustestide keskmine väljundisääst `65%`, vahemik `22-87%` ja sisendi tihendamise tööriist `~46%` |
| RTK     | Käsuväljundi sääst `60-90%`; näidisseanss `~118,000 -> ~23,900` tokenit ehk sääst `79.7%` (`~80%`)                                 |

Kattuvate tööriista-/kontekstikoormuste puhul rakendab OmniRoute'i vaikekombinatsioon mootoreid järjestikku:

```txt
RTK -> Caveman
```

Kombineeritud sääst on korrutav, mitte liitev:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Näitaja `78-95%` kehtib siis, kui nii RTK kui ka Caveman saavad vähendada sama sisendi-/kontekstikoormust.
Cavemani vastuse väljundrežiim on eraldiseisev: kui see on lubatud, kasutage Cavemani enda väljundisäästu (keskmiselt `65%`,
põhinäitaja `~75%`, vahemik `22-87%`). Arvelduse kogusääst sõltub teie viipade ja väljundite suhtest.

### Mida „sobiv” tegelikult tähendab

Põhinäitajana esitatud vahemik 15-95% on reaalne, kuid see kehtib ainult **liigse või paljusõnalise** sisu kohta — korduvad
vearead, sama hoiatust massiliselt väljastav koostamislogi või ülemõõduline `grep`-i/faili lugemise väljund. See
**ei** tähenda, et iga päring säästaks nii palju.

Empiiriliselt kontrollitud (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): käitus
`stacked` (RTK + Caveman) Anthropic-vormingus `tool_result`-ploki puhul, mis sisaldas 300 identset
vearida, andis tulemuseks **95.93% tokenisäästu / 96.26% märgisäästu** — täpselt reklaamitud
vahemikus. Kuid sama töötlusahel tavapärase, mittekorduva tööriistaväljundi puhul (puhas `grep`-i vastete loend,
lühike faililugem, tavaline vestlustekst) annab õigesti **nullilähedase säästu**, sest
eemaldatavaid kordusi pole ning `validateCompression()` (`validation.ts`) keeldub edastamast
ümberkirjutust, mis eemaldaks või muudaks koodiplokke, URL-e, pealkirju, versioone või SUURTÄHTEDEGA konstantide identifikaatoreid.

See on oodatud ja turvaline käitumine, mitte viga: kodeerimisseanss, mis peamiselt loeb puhtaid faile või otsib neist `grep`-iga,
annab tagasihoidliku kogusäästu isegi siis, kui tihendamine on täielikult lubatud, samas kui seanss, mis satub tõrkuvasse
tsüklisse või paljusõnalise linteri otsa, saavutab selle liikluse puhul täieliku 78-95% vahemiku. Ärge kasutage ühe seansi
madalat koondsäästu protsenti tõendina, et tihendamine on valesti seadistatud — kontrollige kõigepealt, kas
aluseks olev tööriistaväljund oli tegelikult korduv.

---

## Tokenisäästu visualiseering

```
Ilma tihendamiseta: 47K tokenit saadetud LLM-ile
Lite'iga:           40K tokenit saadetud          (15% säästetud — turvaline, alati aktiivne)
Standardiga:        33K tokenit saadetud          (30% säästetud — caveman-speak'i reeglid)
Aggressive'iga:     24K tokenit saadetud          (50% säästetud — vanandamine + kokkuvõtete tegemine)
Ultraga:            12K tokenit saadetud          (75% säästetud — heuristiline kärpimine)
RTK-ga:             19K-5K tokenit saadetud       (60-90% säästetud käsu-/tööriistaväljundilt)
Stackediga:         10K-2.5K tokenit saadetud     (sobiva RTK+Caveman-sisu puhul vahemik 78-95%)
```

---

## Seadistamine

### Töölaud

Liikuge jaotisse `Dashboard → Context & Cache`:

- **Caveman** — režiimi valimine, keelepaketid, eelvaade ja globaalsed vaikeseaded
- **RTK** — käsufiltri eelvaade, RTK turvaseaded ja filtrikataloog
- **Compression Combos** — nimega mootorikonveierid, mis on määratud marsruutimiskombodele
- **Auto-Trigger Threshold** — tihendamise automaatne aktiveerimine, kui tokenite arv ületab lävendi

### Kombopõhine alistus

Jaotises `Dashboard → Context & Cache → Compression Combos` määrake tihendamiskombo marsruutimiskombole:

```txt
Kombo: "free-tier-fallback"
  Tihendamiskombo: "coding-agent-stack"
  Konveier: RTK -> Caveman
  Sihtmärgid:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

See võimaldab kasutada tasuta/kodeerimisteenuse pakkujatel kihilist tihendamist, säilitades tasuliste
tellimuste puhul lihtrežiimi.

See „kombopõhise alistuse” määrang on erinev juhtelement **marsruutimiskombo tihendusrežiimi**
alistusest (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — välja
skeem aktsepteerib ka väärtusi `rtk`, `stacked` ja `omniglyph`) — see alistus ei vali nimega
tihendamiskombo konveierit, vaid määrab üksnes välja `compressionMode`, mida kasutab
`resolveCompressionPlan`. Selle saab määrata kas kombokaardil (`Dashboard → Combos`) või alates
versioonist #6760 iga marsruutimiskombo kohta loendis „Assign to routing” lehel
`Dashboard → Context & Cache → Compression Combos`, otse eespool kirjeldatud konveieri määramise
märkeruudu kõrval. Mõlemal juhul salvestatakse muudatused sama `PUT /api/combos/{id}` lõpp-punkti kaudu.

### Päringupõhine alistus

Saatke päringu päis `x-omniroute-compression`, et alistada ühe päringu tihendusplaan.
Sellel on kõrgeim prioriteet — see alistab marsruutimiskombo alistuse, aktiivse profiili,
automaatse käivituse ja paneeli vaikesätte. Tundmatuid väärtusi eiratakse (päringut ei lükata kunagi
tagasi) ning globaalne pealüliti kehtib endiselt kõigele: kui tihendamine on globaalselt välja
lülitatud, ei saa päis seda sisse lülitada. Väärtused:

| Väärtus       | Mõju                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `off`         | Selle päringu puhul tihendamist ei kasutata.                                                             |
| `default`     | Paneelist tuletatud vaikeprofiil (aktiivset profiili eiratakse). Kadudega mootorid jäävad välja.         |
| `safe`        | Sama mis päise ärajätmine: ainult duplikaatide eemaldamine ja tühimärkide koondamine.                    |
| `allow-lossy` | Säilitab selle päringu operaatoriplaani, sealhulgas kokkuvõtted, asjakohasusfiltrid ja stiilimuudatused. |
| `engine:<id>` | Üks mootor, kui see on lubatud, nt `engine:rtk`. See on selle mootori päringupõhine lubamine.            |
| `<combo>`     | Nimega kombo, mis sobitatakse esmalt nime järgi (tõstutundetult) ja seejärel ID järgi.                   |

Ilma väärtuseta `allow-lossy`, `engine:<id>` või nimega kombota kadudega mootoreid ei rakendata.
Kui tihendamine on sisse lülitatud, rakendatakse päringule endiselt seansi duplikaatide eemaldamist ja tühimärkide koondamist.

Rakendatud plaan tagastatakse vastuse päises `X-OmniRoute-Compression: <mode>; source=<source>`,
kus `<source>` on üks väärtustest `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` või `off`.

### API

```bash
# Tihendusseadete hankimine
curl http://localhost:20128/api/settings/compression

# Tihendusseadete värskendamine
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Konkreetse RTK/stacked andmestiku eelvaade
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtrikomplektide loetlemine
curl http://localhost:20128/api/context/rtk/filters

# RTK vahetu testimine valikuliste käsu metaandmetega
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Mida kaitstakse

Tihendusmootor **säilitab alati:**

- ✅ Koodiplokid (eraldatud ja tekstisisesed)
- ✅ URL-id ja failiteed
- ✅ JSON-struktuurid ja struktureeritud andmed
- ✅ Identifikaatorid ja kaitstud tehnilised sõned
- ✅ Matemaatilised avaldised
- ✅ Tööriista-/funktsioonikutsete definitsioonid
- ✅ Süsteemiviibad (Lite-režiimis)

RTK toorväljundi taastamine eemaldab levinud API-võtmed, kandjatõendid, Slacki tõendid, AWS-i juurdepääsuvõtmed,
paroolid, tõendid ja saladused enne, kui midagi püsivalt salvestatakse.

---

## Tihendusstatistika

Iga tihendatud päringu statistika lisatakse serverilogidesse:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Etappide tegevuskava

| Etapp    | Režiimid                                                                                                                                                       | Olek        |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Etapp 1  | Off, Lite                                                                                                                                                      | ✅ Tarnitud |
| Etapp 2  | Standard, Aggressive, Ultra                                                                                                                                    | ✅ Tarnitud |
| Etapp 3  | RTK, Stacked, Compression Combos                                                                                                                               | ✅ Tarnitud |
| Etapp 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                    | ✅ Tarnitud |
| Etapp 4C | Kohanduv kontekstieelarve („dial”) — arvutusmootor + API (`contextBudget` päringus `PUT /api/settings/compression`) + juhtpaneeli režiimi-/reeglijuhtelemendid | ✅ Tarnitud |

---

## Tänuavaldused

Standard-režiimi tihendusreeglid on inspireeritud projektist **[Caveman](https://github.com/JuliusBrussee/caveman)**, mille autor on **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viraalne projekt „miks kasutada palju tõendeid, kui vähesed teevad töö ära”. Cavemani andmetel kasutab see `~75%` vähem väljundtõendeid, saavutab võrdlustestides keskmiselt `65%` väljundisäästu, väljundisäästu vahemiku `22-87%` ning pakub `~46%` sisendtihendusega tööriista.

RTK-režiim on inspireeritud projektist **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, mille autor on **[RTK AI](https://github.com/rtk-ai)** — suure jõudlusega käsuväljundi tihendusprojekt terminali-, kooste-, testi-, git- ja tööriistaväljundi filtreerimiseks. RTK andmetel ulatub sääst `60-90%`-ni ning selle README näidisseanss näitab `~80%` säästu.

---

## Täiustatud tihendussüsteemid

Lisaks eespool kirjeldatud 7 režiimile (lähtekood aktsepteerib ka režiime `codex-responses` ja
`omniglyph`, mida selles juhendis ei käsitleta) kirjeldavad allolevad jaotised funktsioone,
mis töötavad nendes režiimides või nende kõrval: tööriistatulemuste tihendamine ja progressiivne vanandamine
on agressiivse mootori 1. ja 2. etapp (Aggressive-režiim ja virnastatud konveieri
`aggressive`-etapp), virnastatud konveier määrab Stacked-režiimi töökorra, vahemäluteadlik tihendamine
alandab `aggressive`- ja `ultra`-režiimi vahemälu kasutavate teenusepakkujate puhul `standard`-režiimile, kui tihendamine
on sisse lülitatud, ning Cavemani väljundrežiim ja väljundstiilid on valikulised süsteemiviiba juhised,
mis on vaikimisi välja lülitatud ja kujundavad päringu tihendamise asemel mudeli väljundit.

### Vahemäluteadlik tihendamine

Mõned teenusepakkujad (näiteks Anthropic viipade vahemällu salvestamisega) toetavad **viipade vahemällu salvestamist**,
mis võimaldab neil kulude ja latentsuse vähendamiseks viiba osi vahemällu salvestada. Kui
vahemällu salvestamine on lubatud, võib agressiivne tihendamine jõudlust tegelikult **halvendada**,
sest see muudab vahemällu salvestatud tõendeid ja muudab vahemälu kehtetuks.

Moodul `cachingAware.ts` lahendab selle, **tuvastades vahemällu salvestamise konteksti** ja
**kohandades tihendusstrateegiat** vastavalt.

#### Kuidas see töötab

1. **Vahemällu salvestamise konteksti tuvastamine** — päringu kehast otsitakse `cache_control`-markereid
2. **Vahemällu salvestavate teenusepakkujate tuvastamine** — kontrollitakse, kas sihtteenusepakkuja toetab vahemällu salvestamist
3. **Strateegia kohandamine** — vahemällu salvestavate teenusepakkujate puhul alandatakse `aggressive`/`ultra` režiimile `standard`
4. **Süsteemiviiba vahelejätmine** — süsteemiviibad salvestatakse tavaliselt vahemällu, mistõttu neid ei tihendata

Strateegia abifunktsioon tagastab ka lipu `deterministicOnly`, kuid plaani koostaja kasutab
ainult strateegiat — praegu ei loe seda lippu ükski järgnev komponent.

#### Koodinäide

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Vahemälumarker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Millal kasutada

Vahemäluteadlik tihendamine on **alati sisse lülitatud** — seadistamine pole vajalik. See aktiveerub alati,
kui tihendamine on sisse lülitatud ja sihtteenusepakkuja toetab viipade vahemällu salvestamist (Anthropic, OpenAI
jne); selgesõnalised `cache_control`-markerid pole vajalikud — alandamise käivitab üksnes
vahemällu salvestav teenusepakkuja, markerid üksi seda kunagi ei tee (markerite tuvastamine edastab vahemälu
telemeetriaandmeid, mitte ei mõjuta strateegiaotsust).

### Progressiivne vanandamine

Pikad vestlused koguvad palju sõnumivoore, kuid vanemad voorud muutuvad vähem
asjakohaseks. Moodul `progressiveAging.ts` **vähendab sõnumite detailsust vastavalt voorude kaugusele**
(kaugust mõõdetakse vestluse lõpust). Tarnitud vaikesätetega
(`verbatim: 2, light: 2, moderate: 3`):

- **Viimased 2 vooru (kaugus ≤ 2)**: Säilitatakse sõna-sõnalt
- **Kaugus 3**: Koopainimese-kompressioon (täitesõnade eemaldamine)
- **Kaugus 4+**: Assistendi sõnumid võetakse kokku; kasutaja sõnumitest säilitatakse ainult esimene
  rida, maksimaalselt 120 märki; muud rollid jäetakse muutmata. Süsteemiviibad, juba vanandatud
  sõnumid ja kasutaja uusim sõnum säilitatakse kaugusest olenemata alati sõna-sõnalt.
  Midagi ei jäeta täielikult välja ning vahemik `light`
  ei ole kaasasolevate vaikeväärtustega saavutatav (`light` võrdub `verbatim`).

#### Koodinäide

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... veel 50 vooru ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // viimased 3 vooru: sõna-sõnalt
  light: 8, // kaugus <= 8: kerge kompressioon
  moderate: 20, // kaugus <= 20: koopainimese-kompressioon
  fullSummary: 5, // tüüp nõuab seda, kuid vahemike määramise kood seda ei loe
  // kaugus > 20: kokkuvõte (assistant) / säilitatakse esimene rida (user)
});

// saved = säästetud sõnede arv
```

#### Millal kasutada

Progressiivne vanandamine on režiimis `aggressive` **alati sisse lülitatud** — see on
`compressAggressive()` 2. etapp. Ultra-režiim seda ei kasuta. See on eriti tõhus järgmiste
kasutusjuhtude puhul:

- Pikaajalised programmeerimisseansid
- Mitmepäevased vestlused
- Agenttöövood paljude tööriistakutsetega

### Koopainimese-väljundrežiim

Koopainimese-väljundrežiim lisab **süsteemiviiba juhised**, mis paluvad mudelil endal
vastata napisõnaliselt — tase `lite` palub anda lühikesi vastuseid, säilitades täislaused, `full`
palub „vastata napisõnaliselt nagu tark koopainimene“ ning `ultra` palub telegraafilist väljundit;
juhised ainult paluvad, mitte ei garanteeri seda. Päringud saavad need funktsiooni
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) kaudu:
`open-sse/handlers/chatCore.ts` lahendab esmalt valiku tagasiühilduvusadapteriga
(`resolveOutputStyleSelection()` failis
`open-sse/services/compression/outputStyles/backCompat.ts`), mis juhul, kui `outputStyles`
on tühi, vastendab lubatud `cavemanOutputMode`-i väljundstiiliga `terse-prose` intensiivsusel
`cavemanOutputMode.intensity` (vt allpool jaotist Tagasiühilduvus); mittetühja `outputStyles`
valikut kasutatakse muutmata kujul ning `cavemanOutputMode.enabled` ja `intensity` ei avalda
siis mingit mõju, kuid selle lüliti `autoClarity` rakendub endiselt. `outputMode.ts` sisaldab
juhisetekste (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), sisust möödahiilimist ja paigutusabimeetodit,
mida sisestamine kasutab; selle enda sisestajal `applyCavemanOutputMode()` pole
tootmiskeskkonnas ühtegi väljakutsujat.

#### Kuidas see töötab

See režiim ei tihenda sisendit. See lisab süsteemiviibale juhiste ploki
(vt allpool jaotist „Kuidas sisestamine töötab“) ning päringu jaoks valitud sisendi
kompressioonirežiim käivitatakse endiselt pärast seda kehal, mis nüüd seda plokki sisaldab.
Enne jagatud piiranguklauslit, millega iga tase lõpeb, on ingliskeelse taseme `full` tekst järgmine:

> „Vasta napisõnaliselt nagu tark koopainimene. Jäta välja artiklid (a/an/the), täitesõnad (just/really/basically/actually/simply), viisakusväljendid ja ebakindlust väljendavad sõnad. Lauselühendid on sobivad. Kasuta lühikesi sünonüüme (big, mitte extensive; fix, mitte implement). Säilita täpselt kogu tehniline sisu, kood, vead, URL-id ja identifikaatorid.“

See toimib eriti hästi järgmiste kasutusjuhtude puhul:

- Koodi genereerimine (napim väljund = vähem sõnesid)
- Kiired küsimused ja vastused (põhjalikke selgitusi pole vaja)
- Pakktöötlus (maksimaalne läbilaskevõime)

#### Millal kasutada

Koopainimese-väljundrežiim on **valikuline**. Kui kompressioon on sisse lülitatud
(`enabled: true`, üldlüliti lehel Compression Settings), lülitage see sisse väärtusega
`cavemanOutputMode.enabled`; `intensity` valib taseme `lite`, `full` või `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompressioonikombinatsiooni lüliti **Output Mode** (`outputMode`, tase väljal `outputModeIntensity`)
seab sama lüliti päringutele, millele see kombinatsioon rakendub, ning MCP-tööriist
`omniroute_set_compression_engine` kirjutab selle oma tõeväärtusargumendi `outputMode`
kaudu. Mittetühi `outputStyles` valik on selle lüliti suhtes ülimuslik. Juhtpaneelil sisestab
väljundstiili **Terse prose** lubamine sama ploki (vt allpool jaotist Väljundstiilid).

### Väljundstiilid (kataloog)

Eespool kirjeldatud koopainimese-väljundrežiim on **pärandiks olev ühe stiili tee**. 4. etapp
üldistas selle kombineeritavate väljundstiilide kataloogiks: `OUTPUT_STYLE_CATALOG` failis
`open-sse/services/compression/outputStyles/catalog.ts`. Iga stiil on süsteemiviiba juhis,
mis palub mudelil endal väljastada odavamat väljundit; stiile saab lubada koos
ning need sisestatakse kataloogi järjekorras.

| Stiil                            | `id`          | Mida see teeb                                                                                                                                                                                                                                              | Juhiste keeled                                |
| -------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Napp proosa                      | `terse-prose` | Eemaldab täitesõnad, artiklid ja ebakindlad mööndused; säilitab tehnilise sisu täpsuse. Sama tekst mis pärandrežiimis caveman output (viidatud, mitte uuesti sisestatud).                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Vähem koodi                      | `less-code`   | YAGNI-redel: väikseim toimiv muudatus, ilma soovimata abstraktsioonideta.                                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hobusesaba (laisk vanemarendaja) | `ponytail`    | „Parim kood on kood, mida pole kunagi kirjutatud“: taaskasutus > ümberkirjutamine, algpõhjus > sümptom, lühim toimiv diff.                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mul on ADHD (tegevus enne)       | `i-have-adhd` | Kõigepealt tegevus (käsk/tee/koodilõik enne proosat), nummerdatud piiratud sammud, ÜKS konkreetne järgmine samm, ilma sissejuhatuse/kokkuvõtte/lõpusõnadeta. Kohandatud projekti [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) põhjal. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Napp CJK (文言)                  | `terse-cjk`   | `full`/`ultra` vastus klassikalises hiina keeles (文言); `lite` palub üksnes lühikesi vastuseid ilma funktsioonisõnade, viisakusväljendite või ilustusteta.                                                                                                | zh (lokaadiga piiratud, vt allpool)           |

Igal stiilil on kolm intensiivsustaset — `lite`, `full`, `ultra` — ja iga tase
lõpeb ühise piiranguklausliga (`SHARED_BOUNDARIES` failis `outputMode.ts`), mis
säilitab koodiplokid, failiteed, käsud, vead ja URL-id täpselt. Tasemete `terse-prose` ja
`terse-cjk` tekstid lisavad sellesse loendisse ka identifikaatorid.

`terse-cjk` on kahes kohas piiratud lokaadiga `zh`. Tihendussätete leht kuvab
selle rea ainult siis, kui töölaua kasutajaliidese keel on hiina keel (`zh-CN` või `zh-TW`), ning
`applyOutputStyles()` lisab selle ainult siis, kui päringu tuvastatud keel (vt allpool jaotist Keele
valimine) on `zh`. Rea peitmine ei kustuta salvestatud `terse-cjk` valikut:
sätete API aktsepteerib mis tahes stiili ID-d ja teiste stiilide salvestamine lehel säilitab selle. Päringu
töötlemisel on `applyOutputStyles()` keelekontroll ainus lokaadipiirang.

#### Kuidas lisamine toimib

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) sobitab
valiku kataloogiga (tundmatud ID-d ja lokaadile mittevastavad stiilid
jäetakse välja, kuid need ei põhjusta kunagi viga; valik, millest ei lahene ühtegi stiili, jätab keha
muutmata ja see jäetakse vahele põhjusega `no_styles`), ühendab valitud juhised kataloogi
järjekorras,
lisab piiranguklausli **ühe korra** (ning ohutusklausli, `SAFETY_BOUNDARIES` või selle
tõlke, kui valitud on `less-code` või `ponytail`) ja alustab plokki ühe
idempotentsusmarkeriga (`[OmniRoute Output Styles]`), mistõttu uuesti rakendamine ei tee midagi. Kui
tuvastatud keelele (vt allpool jaotist Keele valimine) on olemas tõlge, lisatakse ingliskeelse
juhise asemel lokaliseeritud juhis.

Mitte-tühja `messages` massiiviga kehas käivitatakse idempotentsuskontroll enne
sisupõhist möödumist: kui marker `[OmniRoute Output Styles]` on juba tipptaseme
`system` väljal (stringi või sisuplokkide massiivina) või stringist
sisuga süsteemisõnumis, jäetakse keha muutmata põhjusega `already_applied` ja märksõnu ei kontrollita.
Vastasel juhul kontrollib sisupõhine möödumine (`shouldBypassCavemanOutputMode()` failis
`open-sse/services/compression/outputMode.ts`) kolme viimase
sõnumi teksti sõltumata nende rollist ning jätab stiilid kogu vooruks rakendamata, kui tekst
vastab turvalisuse, pöördumatu tegevuse või täpsustamise märksõnadele või
järjekorratundlikule jadale: `first`, `then`, `after that`, `before`, `rollback` või
`backup`, millele järgneb 240 märgi jooksul `delete`, `drop`, `migrate`, `deploy` või
`release`. Möödumist rakendatakse seni, kuni lüliti **Automaatse selguse möödumine**
(`cavemanOutputMode.autoClarity`, vaikimisi sisse lülitatud) on sees; lüliti väljalülitamisel
jäetakse märksõnakontroll vahele.

Kui möödumiskontroll lubab vooru läbi, paigutab `placeSystemInstruction()` (samas failis), mis
ei loo kunagi uut `messages[0]` elementi, ploki esimesse sobivasse kohta järgmises järjekorras:

1. Algne stringist sisuga süsteemisõnum: plokk lisatakse selle teksti järele.
2. Tipptaseme `system` väli: plokk lisatakse stringi teksti järele või
   uue tekstiplokina sisuplokkide massiivi.
3. Esimene hilisem stringist sisuga süsteemisõnum: plokk lisatakse selle
   teksti järele.
4. Kui ükski eelnev ei sobi: plokk lisatakse uue süsteemisõnumina `messages` lõppu.

Ilma `messages` massiivita (või tühja massiiviga) kehas sisupõhist möödumist ei rakendata ja
tipptaseme `system` välja ei kontrollita. Plokk lisatakse stringist
`instructions` välja teksti järele, välja arvatud juhul, kui see väli juba sisaldab
markerit `[OmniRoute Output Styles]`; sellisel juhul jäetakse keha muutmata põhjusega
`already_applied`. Kui kehal puudub stringist `instructions` väli, kuid see sisaldab `input`
välja (stringi või massiivina), saab plokist `instructions`, asendades selle välja varasema
mittestringilise väärtuse. Keha, millel pole ei stringist `instructions` välja ega stringist või massiivist
`input` välja, jäetakse muutmata ja vahele põhjusega `no_messages`.

#### Kuidas lubada

Juhtpaneelil: **Tihendamise kontekst → Tihendamise sätted**
(`/dashboard/context/settings`), väljundstiilide jaotises: iga stiili kohta üks rida koos sisse-/väljalüliti
ja tasemevalijaga. Stiile lisatakse, kui tihendamine ise on sisse lülitatud (lehe
pealüliti `enabled`). Lüliti **Automaatse selguse möödaviik** asub lehel **Koopainimene**
(`/dashboard/context/caveman`) selle kaardil **Väljundrežiim**. Programmiliselt säilitab
tihendamise konfiguratsioon valiku järgmisel kujul:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Tagasiühilduvus: kuni `outputStyles` on tühi, vastendatakse pärandsäte
`cavemanOutputMode.enabled` stiiliga `terse-prose` tasemel
`cavemanOutputMode.intensity`. Plokk algab seejärel markeriga
`[OmniRoute Output Styles]`, samas kui pärand-injektor `applyCavemanOutputMode()`
lisas markeri `[OmniRoute Caveman Output Mode]`. Markeri all vastab tekst
pärandvariandi lisatud tekstile keeltes en, pt-BR, es, de, fr, it, ru, id ja vi; keeltes
ja ja zh on piiride klausli ees üks lisatühik. `terse-prose` on tõlgitud keeltesse
pt-BR, es, de, fr, it, ru, zh, ja, id ja vi, mistõttu päring, mille tuvastatud keel on
`hu`, saab ingliskeelse teksti, ehkki pärand-injektor kasutas ungarikeelset teksti.

Väljundstiili keele valimine (`resolveOutputStyleLanguage()` failis
`outputStyles/apply.ts`): kui `languageConfig.enabled` on sisse lülitatud, võtab
`autoDetect` näidiseks päringu massiivi `messages` viimase tekstiga kasutajasõnumi
(sisu on string või selle sisuosade `text`) ja käitab sellel Koopainimese mootori
tuvastajat (`detectCompressionLanguage()`). Tuvastaja tagastab `zh`, kui tekst sisaldab
hani märke, kuid mitte kana märke; muul juhul tagastab see selle keeltest `it`, `pt-BR`,
`es`, `de`, `fr`, `ru`, `ja`, `hu` ja `id`, mille vihjetega leidub kõige rohkem vasteid,
ning juhul, kui vasteid pole, `en` — tekst, mida see ei suuda liigitada, saab inglise
keele, mitte kunagi `defaultLanguage`, ning keelt `vi` ei tuvastata kunagi, kuigi
stiilidega on kaasas `vi` tekst. Responses API päringu keha hoiab oma voorusid väljal
`input`, millest näidist ei võeta, mistõttu rakendub `defaultLanguage` ja seejärel
inglise keel. Kui üheski massiivi `messages` kasutajasõnumis pole teksti või kui
`autoDetect` on välja lülitatud, rakendub `defaultLanguage` ja seejärel inglise keel.
Kui `languageConfig.enabled` on välja lülitatud, on keeleks inglise keel — välja arvatud
juhul, kui päringule rakendub tihendamiskombinatsioon (päringu marsruutimiskombinatsioonile
määratud kombinatsioon või tihendamise vaikekombinatsioon, mida chatCore kasutab
sisseehitatud virnastatud konveieri varuvariandina): kombinatsiooni rakendamine lülitab
selle päringu jaoks `languageConfig.enabled` sisse ja määrab `defaultLanguage` väärtuse
kombinatsiooni keelepakettide põhjal (salvestatud väärtus, kui see on üks kombinatsiooni
pakettidest; vastasel juhul kombinatsiooni esimene pakett, mille vaikeväärtus on `en`),
samas kui salvestatud `autoDetect` (vaikimisi sisse lülitatud) jääb kehtima.
Koopainimese sisendmootor valib oma reeglipaketi keele teisiti — iga tekstiosa kohta
eraldi ning väljalülitatud automaattuvastuse korral sõltuvalt väljast `enabledPacks`.

Stiili × keele maatriks on fikseeritud testiga
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: iga kataloogistiili jaoks
peab testi `BASELINE_LANGUAGES` sisaldama kirjet; stiiliga, mis pole lokaadiga piiratud,
peab kaasas olema pt-BR tõlge (lokaadiga piiratud `terse-cjk` on sellest reeglist
vabastatud), välja arvatud juhul, kui stiil on loendis `KNOWN_ENGLISH_ONLY`, mis võib
sisaldada ainult stiile, millel tõlked täielikult puuduvad — kui loetletud stiilil on
mõni tõlge, kukub test läbi; samuti kukub stiili test läbi, kui kaob keel, mis on
loetletud selle `BASELINE_LANGUAGES` kirjes. Stiili lisamise kohta vaadake
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Tööriistatulemuste tihendamine

`compressToolResult()` failis `open-sse/services/compression/toolResultCompressor.ts`
tihendab tööriistatulemuse teksti **5 strateegia** abil. See proovib neid järgmises
järjekorras ning tulemuse määrab esimene lubatud strateegia, mille kontroll vastab
sisule:

1. **`fileContent`**: vähemalt 3-realine sisu, milles vähemalt üks rida algab pärast
   algtaande eiramist märksõnaga `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` või `return ` (märksõna koos järgneva tühikuga) või märksõnaga `if`,
   `for` või `while`, millele järgneb `(` või ` (`, säilitab esimesed 20 ja viimased 5 rida ning
   väljajäetud keskosa märgistatakse.
2. **`grepSearch`**: sisu, milles on vähemalt üks rida kujul `<path>:<digits>:`,
   kus esimesele koolonile eelnevas tekstis pole tühimärke, säilitab ainult sellised read,
   maksimaalselt 30, millele järgneb ülejäänud vastete arv ja vasted sisaldavate failide loend;
   kõik muud read eemaldatakse. Strateegia käivitamiseks piisab ühest sellisest reast, seega
   läheb arvesse ka ajatempliga, näiteks `12:30:45`, algav logirida.
3. **`shellOutput`**: väljundist, mis sisaldab ANSI CSI-jada (`ESC[`, seejärel numbrid või
   semikoolonid ja siis täht, nagu värvikoodides) või märki `$`, millele järgneb kus tahes
   tekstis tühimärk, eemaldatakse need jadad (muud paojadad, näiteks `ESC[?25l` või
   OSC aknapealkirja jada, säilitatakse) ning alles jäetakse viimased 50 rida, koondades
   järjestikused korduvad read. Kuna see kontroll käivitatakse enne strateegiaid `json` ja `errorMessage`,
   ei jõua sellist märki `$` sisaldav JSON- või veaväljund nendeni, kui
   `shellOutput` on sisse lülitatud.
4. **`json`**: üle 2000 märgi pikkune JSON-andmestik, mis algab (pärast
   valikulisi tühimärke) märgiga `{` või `[` ja mille parsimine õnnestub, võetakse kokku: enam kui 7
   elemendiga massiivist säilitatakse esimesed 5 ja viimased 2 elementi ning elementide koguarv,
   objektist aga esimesed 20 võtit, kusjuures iga pesastatud objekti või massiivi väärtus asendatakse
   kohatäitega `{…N keys}` (massiivi puhul on N selle pikkus) ning lisatakse marker
   `_remaining_<N>_keys`, mis loendab pärast esimest 20 võtit väljajäetud võtmed.
   Skalaarväärtused kopeeritakse tervikuna, seega kuni 20 võtmega objekt, millel pole pesastatud
   väärtusi, ainult taandatakse ümber — minimeeritud objekt pikeneb
   ja jääb muutmata.
5. **`errorMessage`**: väljund, mis sisaldab kus tahes ja mis tahes tähesuuruses teksti `error:`,
   `error ` (sõna, millele järgneb tühik, nagu tekstis `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` või `traceback`, säilitab esimese rea,
   järgmised 10 rida ja viimased 3 ning nende vahele jäävad read asendatakse markeriga
   `… [N frames elided] …`. Marker kuvatakse ainult siis, kui esimesele reale järgneb üle 13
   rea, seega kuni 14-realist veaväljundit ei lühendata (12 või 13 rea puhul
   kordavad viimased 3 juba säilitatud ridu).

Pärast strateegia sobivuse tuvastamist ei proovita hilisemaid strateegiaid isegi siis,
kui see strateegia ei anna mingit säästu. Kui sobiv strateegia ei säästa hinnanguliselt
ühtegi tokenit (pikkus ÷ 4, ümardatuna üles) — näiteks kuni 25-realine koodilaadne fail
või üle 2000 märgi pikkune kuni 7 elemendiga JSON-massiiv — säilitab agressiivne mootor
algse tööriistatulemuse: mõlemad kutsujad (`compressAggressive()` ja `compressAnthropicToolResultBlock()`)
säilitavad algse tulemuse, kui `saved` on 0 või väiksem, samas kui `compressToolResult()` ise
tagastab siiski selle strateegia väljundi. Tööriistatulemuse etapp ei ole lõplik:
mootori varukokkuvõtja võib siiski lühendada `tool`- või `function`-sõnumit, mis on pikem
kui 8192 märki (`maxTokensPerMessage`, 2048, korda 4).

#### Millal kasutada

Tööriistatulemuse tihendamine on agressiivse mootori 1. etapp (`compressAggressive()` failis
`open-sse/services/compression/aggressive.ts`), seega käivitatakse see agressiivses režiimis ja
virnastatud konveieri `aggressive`-etapis. See tihendab OpenAI vorminguga `tool`- ja `function`-
sõnumeid ning Anthropic-vormingu `tool_result`-plokkides olevat teksti. Igal strateegial on oma
lüliti jaotises `aggressive.toolStrategies`; vaikimisi on need kõik sisse lülitatud. Juhtpaneelil
asuvad lülitid Cavemani lehe vaates **Täpsem**, kui tihendamine on sisse lülitatud ja
vaikerežiim on Agressiivne.

### Virnastatud konveier

Virnastatud režiim käitab **mitut mootorit järjestikku** — tavaliselt esmalt RTK-d
(60–90% sääst tööriistaväljundis), seejärel Cavemani ülejäänud tekstil (~46% sisendi
sääst). Koos annavad need **78–95% sobiva vahemiku** (vt ülalt ülesvoolu säästu arvutust):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` annab keskmiselt ≈89%.

#### Kuidas see töötab

```
Sisend (1000 tokenit)
  → RTK (käsuteadlik filter) → 200 tokenit
    → Caveman (täiteteksti eemaldamine) → 108 tokenit
  → Väljund (108 tokenit, ~89% säästu)
```

#### Millal kasutada

Kasutage virnastatud režiimi järgmistel juhtudel:

- Tööriistarohked töövood (agentne programmeerimine, uurimistöö)
- Kulutundlik pakktöötlus
- Kui vajate maksimaalset tokenisäästu

Virnastatud konveierid seadistatakse globaalse tihendussätte `stackedPipeline`
kaudu või nimega tihenduskombinatsiooni kaudu, mis on määratud marsruutimiskombinatsioonile (vt
ülalt jaotist Kombinatsioonipõhine alistus) — mitte automaatkombinatsiooni `modePack` kaudu (see väli
muudab ainult automaatkombinatsiooni mudelivaliku kaalusid ning `stacked` ei ole kehtiv paketimi).

---

## Kombinatsioonipõhised tihendamise alistused

Globaalset tihendusrežiimi saab **iga kombinatsiooni jaoks eraldi** alistada, et eri kasutusjuhtude käitumist täpsustada:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

See on kasulik järgmistel juhtudel:

- **Programmeerimiskombinatsioonid**: pikkade seansside jaoks kasutage režiimi `aggressive`
- **Kiirküsimuste ja -vastuste kombinatsioonid**: kiirete vastuste jaoks kasutage režiimi `lite`
- **Tööriistarohked kombinatsioonid**: maksimaalse kokkuhoiu jaoks kasutage režiimi `stacked`
- **Tootmiskombinatsioonid**: vahemällu salvestavate teenusepakkujate puhul jätke alistus välja — alati aktiivne
  vahemäluteadlik kohandus muudab `aggressive`/`ultra` automaatselt režiimiks `standard`
  (valitavat režiimi `cache-aware` ei ole)

---

## Vaadake ka

- [Keskkonna konfiguratsioon](../reference/ENVIRONMENT.md) — tihendamise keskkonnamuutujad
- [Arhitektuurijuhend](../architecture/ARCHITECTURE.md) — tihenduskonveieri sisemine toimimine
- [Kasutusjuhend](../guides/USER_GUIDE.md) — tihendamisega alustamine
- [RTK tihendamine](./RTK_COMPRESSION.md) — RTK-filtrid, usaldusmudel, kontrollvärav, toorväljundi taastamine
- [Tihendusmootorid](./COMPRESSION_ENGINES.md) — Caveman, RTK, virnastamine, API-d, MCP, juhtpaneel
- [Tihendusreeglite vorming](./COMPRESSION_RULES_FORMAT.md) — JSON-reeglipaketi vorming
- [Tihendamise keelepaketid](./COMPRESSION_LANGUAGE_PACKS.md) — keelepõhised Cavemani reeglid
