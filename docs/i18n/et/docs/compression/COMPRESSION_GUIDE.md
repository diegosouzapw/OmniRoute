# 🗜️ Prompt Compression Guide — OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Säästke automaatselt 15–95% sobivast kontekstist. Kiire ülevaate saamiseks vaadake [README tihendamise jaotist](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ülevaade

OmniRoute rakendab modulaarset viipade tihendamise konveierit, mis käivitatakse **ennetavalt** enne, kui päringud jõuavad ülesvoolu teenusepakkujateni. See tähendab, et tokenite säästmine toimub läbipaistvalt — teie töövoogu pole vaja muuta.

```
Kliendi päring
  → Tihendusstrateegia valija
    → Kombinatsiooni alistus? → Kasuta kombinatsiooni seadistust
    → Automaatse käivitamise lävi? → Kasuta automaatrežiimi
    → Vaikerežiim? → Kasuta globaalset seadistust
    → Väljas? → Jäta tihendamine vahele
  → Valitud tihendusrežiim
    → Väljas: tihendamist ei toimu
    → Kerge: turvaline tühimärkide/vorminduse puhastamine (~15%)
    → Standardne: täitesõnade eemaldamine „koopainimese“ stiilis (~30%)
    → Agressiivne: ajaloo vanandamine + kokkuvõtete tegemine (~50%)
    → Ultra: heuristiline kärpimine + koodiplokkide hõrendamine (~75%)
    → RTK: käsuteadlik terminali-/tööriistaväljundi filtreerimine (ülesvoolu vahemik 60–90%)
    → Virnastatud: järjestatud mitme mootoriga konveier, tavaliselt RTK ja seejärel Caveman (sobiv vahemik 78–95%)
  → Tihendatud päring → Teenusepakkuja
```

---

## Tihendusrežiimid

### Väljas

Tihendamist ei rakendata. Kõik sõnumid edastatakse muutmata kujul.

### Kerge režiim (~15% säästu, <1ms latentsus)

Kõige turvalisem režiim — semantikat ei muudeta, puhastatakse ainult vormindust:

| Tehnika                  | Kirjeldus                                                |
| ------------------------ | -------------------------------------------------------- |
| `collapseWhitespace`     | Liidab järjestikused tühjad read ja eemaldab lõputühikud |
| `dedupSystemPrompt`      | Eemaldab dubleerivad süsteemisõnumid                     |
| `compressToolResults`    | Tihendab paljusõnalisi tööriista-/funktsiooniväljundeid  |
| `removeRedundantContent` | Eemaldab korduvad juhised                                |
| `replaceImageUrls`       | Lühendab base64-pildiandmete URI-sid                     |

**Sobib kõige paremini:** pidevaks kasutamiseks ja ohutuskriitilisteks töövoogudeks.

### Standardrežiim (~30% säästu)

Inspireeritud projektist [Caveman](https://github.com/JuliusBrussee/caveman) — eemaldab täitesõnad ja paljusõnalised väljendid, säilitades samal ajal tähenduse:

- Eemaldab täitesõnad („palun“, „ma arvan“, „põhimõtteliselt“, „tegelikult“)
- Lühendab paljusõnalisi väljendeid („selleks, et“ → „et“, „selle tulemusena“ → „sest“)
- Eemaldab viisaka ebakindluse („Kas te oleksite nii lahke...“, „Kui te saaksite ehk...“)
- Üle 30 regulaaravaldise reegli, mis on kohandatud programmeerimisviipade jaoks

**Sobib kõige paremini:** igapäevasteks programmeerimistöövoogudeks ja kuluteadlikele meeskondadele.

### Agressiivne režiim (~50% säästu)

Nutikas ajaloo haldamine pikkade seansside jaoks:

- **Sõnumite vanandamine** — vanemaid sõnumeid tihendatakse järk-järgult rohkem
- **Tööriistatulemuste kokkuvõtmine** — pikad tööriistaväljundid asendatakse kokkuvõtetega
- **Struktuurse tervikluse kaitsed** — tagavad, et `tool_use` + `tool_result` paarid püsivad kooskõlas
- **Kontekstiakna arvestamine** — järgib iga mudeli tokenipiiranguid

**Sobib kõige paremini:** pikkadeks silumisseanssideks ja suurte koodibaasidega töötamiseks.

### Ultra-režiim (~75% säästu)

Maksimaalne tihendamine olukordadeks, kus tokenite säästmine on kriitilise tähtsusega:

- **Heuristiline kärpimine** — eemaldab sõnumid, mille asjakohasus jääb alla läve
- **Koodiplokkide hõrendamine** — tihendab korduvaid koodinäiteid
- **Kahendotsinguga kärpimine** — leiab kontekstiakna jaoks optimaalse lõikekoha
- Sisaldab kõiki agressiivse režiimi funktsioone

**Sobib kõige paremini:** kui jõuate korduvalt kontekstipiiranguteni.

### RTK-režiim (ülesvoolu vahemik 60–90%)

RTK-režiim on optimeeritud programmeerimisagentide seanssides esinevate mahukate tööriistaväljundite jaoks:

- Tuvastab käsu-/väljundiklassid, nagu `git status`, `git diff`, `git log`, testikäitajad,
  TypeScripti/Vite’i/Webpacki järgud, ESLint/Biome/Prettier, npm-i auditid/paigaldused, Dockeri logid, taristu
  väljund ja üldine kestaväljund
- Rakendab JSON-filtripakette asukohast `open-sse/services/compression/engines/rtk/filters/`
- Impordib RTK TOML-skeemi v1 filtrid projekti või globaalsetest `filters.toml` failidest koos tekstisiseste testide
  valideerimise ja projektifailide usalduskontrolliga
- Sisaldab 49 sisseehitatud filtrit koos tekstisiseste kontrollnäidistega
- Eemaldab ANSI juhtjadad, edenemisribad, korduvad read ja mittevajaliku müra
- Säilitab tõrked, vead, hoiatused, muudetud failid, kokkuvõtted ja pika väljundi lõpuosa
- Toetab usalduskontrolliga projektifiltreid, globaalseid filtreid ja valikulist redigeeritud toorväljundi taastamist

**Sobib kõige paremini:** agendiseanssideks, mis sisaldavad kesta-, järgu-, testi-, git-, grep- ja failiväljundi transkripte.

### Virnastatud režiim (sobiv vahemik 78–95%)

Virnastatud režiim käitab mitut tihendusmootorit deterministlikus järjekorras. Vaikekonveier on:

```txt
RTK -> Caveman
```

Selline järjestus tihendab esmalt terminali-/tööriistaväljundi ning rakendab seejärel ülejäänud
loomulikus keeles viibale Cavemani semantilist tihendamist. Virnastatud konveiereid saab seadistada globaalselt või
marsruutimiskombinatsioonidele määratud tihenduskombinatsioonide kaudu.

**Sobib kõige paremini:** segakonteksti jaoks, mis sisaldab suuri tööriistaloge koos inimese juhiste või assistendi kokkuvõtetega.

---

## Ülesvoolu säästu arvutamine

OmniRoute dokumenteerib tihendamisest saadavat säästu kahe allika põhjal: ülesvooluprojektide jõudlustestid ja
OmniRoute'i enda mootorite kombineerimine.

| Allikas | Siin kasutatud ülesvoolu README arv                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` vähem väljundtokeneid, jõudlustestide keskmine väljundisääst `65%`, vahemik `22-87%` ja sisendi tihendamise tööriist `~46%` |
| RTK     | Käsuväljundi sääst `60-90%`; näidisseanss `~118,000 -> ~23,900` tokenit ehk sääst `79.7%` (`~80%`)                                 |

Kattuvate tööriista-/kontekstikoormuste korral rakendab OmniRoute'i vaikekombinatsioon mootoreid järjestikku:

```txt
RTK -> Caveman
```

Kombineeritud sääst on multiplikatiivne, mitte aditiivne:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

See `78-95%` näit kehtib siis, kui nii RTK kui ka Caveman saavad vähendada sama sisend-/kontekstikoormust.
Cavemani vastuse väljundirežiim on eraldiseisev: kui see on lubatud, kasutage Cavemani enda väljundisäästu (keskmiselt `65%`,
esiletõstetud näit `~75%`, vahemik `22-87%`). Kogu arveldussääst oleneb teie viipade ja väljundite suhtest.

### Mida „sobiv” tegelikult tähendab

Esiletõstetud vahemik 15-95% on reaalne, kuid see kehtib ainult **liiasisuga või paljusõnalise** sisu puhul — korduvad
vearead, sama hoiatust pidevalt väljastav koostamislogi või ülemääraselt mahukas `grep`-i/faili lugemise väljund. See
**ei** tähenda, et iga päring säästab nii palju.

Empiiriliselt kontrollitud (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): käitus
`stacked` (RTK + Caveman) Anthropicu vormingus `tool_result`-plokiga, mis sisaldas 300 identset
vearida, andis tulemuseks **95.93% tokenisäästu / 96.26% märgisäästu** — täpselt reklaamitud
vahemikus. Kuid sama konveier tavalise, liiasuseta tööriistaväljundiga (puhas `grep`-i vastete loend,
lühike faililugem, tavaline vestlustekst) annab õigesti **nullilähedase säästu**, sest
eemaldatavat korduvat sisu pole ning `validateCompression()` (`validation.ts`) keeldub edastamast
ümberkirjutust, mis eemaldaks või muudaks koodiplokke, URL-e, pealkirju, versioone või SUURTÄHTEDEGA konstantide identifikaatoreid.

See on ootuspärane ja ohutu käitumine, mitte viga: programmeerimisseanss, mis peamiselt loeb puhtaid faile või otsib neist `grep`-iga,
annab isegi täielikult lubatud tihendamise korral tagasihoidliku kogusäästu, samas kui nurjuvasse
tsüklisse sattuv või jutuka linteriga seanss saavutab selle liikluse puhul täieliku 78-95% vahemiku. Ärge kasutage ühe seansi
madalat üldist säästuprotsenti tõendina, et tihendamine on valesti seadistatud — kontrollige esmalt, kas
aluseks olev tööriistaväljund oli tegelikult liiasusega.

---

## Tokenisäästu visualiseering

```
Ilma tihendamiseta: 47K tokenit saadetud LLM-ile
Lite'iga:           40K tokenit saadetud          (15% säästetud — ohutu, alati aktiivne)
Standardiga:        33K tokenit saadetud          (30% säästetud — caveman-speak-reeglid)
Aggressive'iga:     24K tokenit saadetud          (50% säästetud — vanandamine + kokkuvõtete tegemine)
Ultraga:            12K tokenit saadetud          (75% säästetud — heuristiline kärpimine)
RTK-ga:             19K-5K tokenit saadetud       (60-90% säästetud käsu-/tööriistaväljundilt)
Stackediga:         10K-2.5K tokenit saadetud     (78-95% sobiva RTK+Cavemani vahemik)
```

---

## Konfiguratsioon

### Töölaud

Liikuge jaotisse `Töölaud → Kontekst ja vahemälu`:

- **Caveman** — režiimi valik, keelepaketid, eelvaade ja globaalsed vaikesätted
- **RTK** — käsufiltri eelvaade, RTK turvasätted ja filtrikataloog
- **Tihenduskombod** — nimega mootorikonveierid, mis on määratud marsruutimiskombodele
- **Automaatse käivitamise lävi** — käivitab tihendamise automaatselt, kui tokenite arv ületab läve

### Kombopõhine alistus

Jaotises `Töölaud → Kontekst ja vahemälu → Tihenduskombod` määrake marsruutimiskombole tihenduskombinatsioon:

```txt
Kombo: "free-tier-fallback"
  Tihenduskombo: "coding-agent-stack"
  Konveier: RTK -> Caveman
  Sihtmärgid:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

See võimaldab kasutada tasuta/kodeerimisteenuse pakkujate puhul mitmeastmelist tihendamist, säilitades tasuliste tellimuste puhul lihtrežiimi.

See „kombopõhine alistus” on **marsruutimiskombo tihendusrežiimi** alistusest (Vaikimisi/Väljas/Lihtne/Standardne/Agressiivne/Ultra) erinev juhtelement — see alistus ei vali nimega tihenduskombinatsiooni konveierit, vaid määrab üksnes välja `compressionMode`, mida `resolveCompressionPlan` kasutab. Seda saab määrata kas kombokaardil (`Töölaud → Kombod`) või alates versioonist #6760 iga marsruutimiskombo jaoks loendis „Määra marsruutimisele” jaotises `Töölaud → Kontekst ja vahemälu → Tihenduskombod`, otse eespool kirjeldatud konveieri määramise märkeruudu kõrval. Mõlemal juhul salvestatakse muudatused sama lõpp-punkti `PUT /api/combos/{id}` kaudu.

### Päringupõhine alistus

Ühe päringu tihendusplaani alistamiseks saatke päringupäis `x-omniroute-compression`. Sellel on kõrgeim prioriteet — see alistab marsruutimiskombo alistuse, aktiivse profiili, automaatse käivitamise ja paneeli vaikesätte. Tundmatuid väärtusi eiratakse (päringut ei lükata kunagi tagasi) ning globaalne pealüliti piirab endiselt kõike: kui tihendamine on globaalselt välja lülitatud, ei saa seda päisega sisse lülitada. Väärtused:

| Väärtus       | Mõju                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| `off`         | Selle päringu puhul tihendamist ei kasutata.                                    |
| `default`     | Paneelist tuletatud vaikeprofiil (eirab aktiivset profiili).                    |
| `engine:<id>` | Üks mootor, kui see on lubatud, nt `engine:rtk`.                                |
| `<combo>`     | Nimega kombo, mida võrreldakse esmalt nime (tõstutundetult), seejärel ID järgi. |

Rakendatud plaan tagastatakse vastusepäises `X-OmniRoute-Compression: <mode>; source=<source>`, kus `<source>` on üks järgmistest: `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` või `off`.

### API

```bash
# Tihendussätete hankimine
curl http://localhost:20128/api/settings/compression

# Tihendussätete uuendamine
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Konkreetse RTK/mitmeastmelise kasuliku koormuse eelvaade
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtripakettide loetlemine
curl http://localhost:20128/api/context/rtk/filters

# RTK vahetu testimine valikuliste käsu metaandmetega
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Mida kaitstakse

Tihendusmootor **säilitab alati:**

- ✅ Koodiplokid (piirdega ja tekstisisesed)
- ✅ URL-id ja failiteed
- ✅ JSON-struktuurid ja struktureeritud andmed
- ✅ Identifikaatorid ja kaitstud tehnilised sõned
- ✅ Matemaatilised avaldised
- ✅ Tööriista-/funktsioonikutsete definitsioonid
- ✅ Süsteemiviibad (lite-režiimis)

RTK töötlemata väljundi taastamine eemaldab enne andmete salvestamist levinud API-võtmed, kandja autentimistõendid, Slacki autentimistõendid, AWS-i pääsuvõtmed, paroolid, autentimistõendid ja saladused.

---

## Tihendusstatistika

Iga tihendatud päringu statistika lisatakse serveri logidesse:

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

| Etapp    | Režiimid                                                                                                                                                            | Olek           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 1. etapp | Off, Lite                                                                                                                                                           | ✅ Välja antud |
| 2. etapp | Standard, Aggressive, Ultra                                                                                                                                         | ✅ Välja antud |
| 3. etapp | RTK, Stacked, Compression Combos                                                                                                                                    | ✅ Välja antud |
| 4. etapp | Output Styles, SLM-tier Ultra, hindamisraamistik                                                                                                                    | ✅ Välja antud |
| Etapp 4C | Kohanduv kontekstieelarve („regulaator“) — arvutusmootor + API (`contextBudget` päringul `PUT /api/settings/compression`) + töölaua režiimi-/poliitikajuhtelemendid | ✅ Välja antud |

---

## Tänuavaldused

Standard-režiimi tihendusreeglid on inspireeritud **[Cavemanist](https://github.com/JuliusBrussee/caveman)**, mille autor on **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viraalne projekt „miks kasutada palju sõnesid, kui vähesed teevad töö ära“. Cavemani andmetel kasutab see väljundis `~75%` vähem sõnesid, säästab võrdlustestides keskmiselt `65%` väljundist, väljundi säästuvahemik on `22-87%` ning sisendi tihendamise tööriist saavutab `~46%` säästu.

RTK-režiim on inspireeritud projektist **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, mille autor on **[RTK AI](https://github.com/rtk-ai)** — suure jõudlusega käsuväljundi tihendamise projekt terminali-, kompileerimis-, testimis-, git- ja tööriistaväljundi filtreerimiseks. RTK andmetel saavutab see `60-90%` säästu ning README näidisseansi järgi säästetakse `~80%`.

---

## Täiustatud tihendussüsteemid

Lisaks seitsmele standardrežiimile sisaldab OmniRoute mitut täiustatud tihendussüsteemi,
mis töötavad konteksti põhjal automaatselt.

### Vahemäluteadlik tihendamine

Mõned teenusepakkujad (näiteks Anthropic viipade vahemällu salvestamisega) toetavad **viipade vahemällu salvestamist**,
mis võimaldab neil kulude ja latentsuse vähendamiseks viiba osi vahemällu salvestada. Kui
vahemällu salvestamine on lubatud, võib agressiivne tihendamine jõudlust hoopis **halvendada**,
sest see muudab vahemällu salvestatud sõnesid ja muudab vahemälu kehtetuks.

Moodul `cachingAware.ts` lahendab selle, **tuvastades vahemällu salvestamise konteksti** ja
**kohandades tihendusstrateegiat** vastavalt.

#### Kuidas see töötab

1. **Vahemällu salvestamise konteksti tuvastamine** — otsib päringu kehast `cache_control`-markereid
2. **Vahemällu salvestamist toetavate teenusepakkujate tuvastamine** — kontrollib, kas sihtteenuse pakkuja toetab vahemällu salvestamist
3. **Strateegia kohandamine** — viib `aggressive`/`ultra` režiimi vahemällu salvestamist toetavate teenusepakkujate puhul üle režiimile `standard`
4. **Süsteemiviiba vahelejätmine** — süsteemiviibad salvestatakse tavaliselt vahemällu, seega neid ei tihendata
5. **Deterministlike teisenduste kasutamine** — kasutatakse ainult järjepidevat väljundit andvaid teisendusi

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Millal kasutada

Vahemäluteadlik tihendamine on **alati sisse lülitatud** — seadistamine pole vajalik. See aktiveerub ainult
järgmistel juhtudel:

- Päring sisaldab `cache_control`-markereid
- Sihtteenuse pakkuja toetab viipade vahemällu salvestamist (Anthropic, OpenAI jne)

### Järk-järguline vanandamine

Pikkadesse vestlustesse koguneb palju sõnumivoore, kuid vanemad voorud muutuvad järjest vähem
asjakohaseks. Moodul `progressiveAging.ts` **vähendab sõnumite detailsust vastavalt vooru kaugusele**:

- **Hiljutised voorud (0-3)**: säilitatakse sõna-sõnalt (täielik detailsus)
- **Keskmise vanusega voorud (4-8)**: Lite-tihendus (tühimärkide ja vorminduse korrastamine)
- **Vanad voorud (9+)**: Caveman-tihendus (täitesõnade eemaldamine, kokkuvõtete tegemine)
- **Väga vanad voorud (20+)**: tehakse põhjalik kokkuvõte või eemaldatakse

#### Koodinäide

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... Veel 50 vooru ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Esimesed 3 vooru: sõna-sõnalt
  light: 8, // Voorud 4–8: Lite-tihendus
  moderate: 20, // Voorud 9–20: Caveman-tihendus
  // Voorud 21+: põhjalik kokkuvõte
});

// saved = säästetud sõnede arv
```

#### Millal kasutada

Progressiivne vanandamine on režiimides `aggressive` ja `ultra` **alati sisse lülitatud**. See on eriti tõhus järgmiste kasutusjuhtude puhul:

- Pikad programmeerimisseansid
- Mitmepäevased vestlused
- Paljude tööriistakutsetega agenttöövood

### Koopainimese väljundirežiim

Moodul `outputMode.ts` lisab **süsteemiviiba juhised**, et mudel ise genereeriks tihendatud ja napi väljundi („koopainimese“ stiilis).

#### Kuidas see töötab

Sisendi tihendamise asemel lisab see režiim järgmise süsteemiviiba:

> „Vasta võimalikult väheste sõnadega. Jäta viisakusvormelid vahele. Kasuta lühikesi lauseid.“

See toimib eriti hästi järgmiste kasutusjuhtude puhul:

- Koodi genereerimine (napim väljund = vähem sõnesid)
- Kiired küsimused ja vastused (põhjalikke selgitusi pole vaja)
- Pakktöötlus (maksimaalse läbilaskevõime saavutamiseks)

#### Millal seda kasutada

Koopainimese väljundirežiim on **valikuline** — määrake see kombineeritud konfiguratsioonis:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Väljundstiilid (kataloog)

Eespool kirjeldatud koopainimese väljundirežiim on **pärandvariant, mis toetab ainult üht stiili**. 4. etapis üldistati see kombineeritavate väljundstiilide kataloogiks: `OUTPUT_STYLE_CATALOG` failis `open-sse/services/compression/outputStyles/catalog.ts`. Iga stiil on süsteemiviiba juhis, mis paneb mudeli enda genereerima ressursisäästlikumat väljundit; stiile saab lubada korraga ning need lisatakse kataloogi järjekorras.

| Stiil                            | `id`          | Mida see teeb                                                                                                                                                                                                                                            | Juhiste keeled                                                              |
| -------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Napp proosa                      | `terse-prose` | Eemaldab täitesõnad, artiklid ja ebalevuse; säilitab tehnilise sisu täpsuse. Sama tekst mis pärandvariandi koopainimese väljundirežiimis (sellele viidatakse, mitte ei kirjutata seda uuesti).                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Vähem koodi                      | `less-code`   | YAGNI-redel: väikseim toimiv muudatus, ei mingeid soovimata abstraktsioone.                                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Hobusesaba (laisk vanemarendaja) | `ponytail`    | „Parim kood on kood, mida kunagi ei kirjutatud“: taaskasutus > ümberkirjutamine, algpõhjus > sümptom, lühim toimiv muudatuste kogum.                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Mul on ATH (tegevus ennekõike)   | `i-have-adhd` | Esmalt tegevus (käsk/tee/koodilõik enne proosat), nummerdatud ja piiritletud sammud, ÜKS konkreetne järgmine samm, ei mingit sissejuhatust/kokkuvõtet/lõpusõnu. Kohandatud projektist [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Napp CJK (文言)                  | `terse-cjk`   | Ülinapp klassikalise hiina keele stiil.                                                                                                                                                                                                                  | zh (piiratud lokaadiga: pakutakse ainult siis, kui tuvastatud keel on `zh`) |

Igal stiilil on kolm intensiivsustaset — `lite`, `full`, `ultra` — ning iga tase lõpeb ühise piiranguklausliga, mis säilitab koodiplokid, failiteed, käsud, veateated, URL-id ja identifikaatorid muutmata kujul.

#### Kuidas lisamine töötab

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) sobitab valiku kataloogiga (tundmatud ID-d ja lokaadile mittevastavad stiilid jäetakse kõrvale ning need ei põhjusta kunagi viga), ühendab valitud juhised kataloogi järjekorras, lisab piiranguklausli **ühe korra** ning paigutab tulemuse süsteemiviiba algusse ühe idempotentsusmarkeri (`[OmniRoute Output Styles]`) järele — uuesti rakendamine ei tee midagi. Kui tuvastatud päringukeele jaoks on tõlge olemas, lisatakse ingliskeelse juhise asemel lokaliseeritud juhis.

#### Kuidas lubada

Juhtpaneelil: **Kontekst → Seaded → Tihendamine** — iga stiili jaoks üks rida koos sisse-/väljalülitamise lüliti ja tasemevalijaga. Programmiliselt salvestab tihenduskonfiguratsioon valiku järgmisel kujul:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Tagasiühilduvus: pärandvariandi kombineeritud säte `outputMode: "caveman"` töötab endiselt ja vastendatakse stiilile `terse-prose`; tulemus on igas pärandkeeles vana lisamisega baiditäpsusega identne.

Keele valimine: kui `languageConfig.enabled` on sisse lülitatud, valib `autoDetect` viimase kasutajasõnumi keele (sama tuvastaja, mida kasutavad sisendimootorid); `autoDetect` väljalülitamisel kinnistatakse `defaultLanguage`. Väljas → inglise keel.

Stiili × keele maatriks on fikseeritud testiga `tests/unit/compression/output-styles-i18n-matrix.test.ts`: uut stiili ei saa avaldada ilma vähemalt pt-BR tõlketa (või selgesõnaliselt jälgitava erandita) ning olemasolev stiil ei saa lokaati märkamatult kaotada. Stiili lisamise kohta vaadake faili [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Tööriistatulemuste tihendamine

Moodul `toolResultCompressor.ts` pakub tööriistatulemuste (funktsioonikutsed, agentide väljundid, otsingutulemused jne) jaoks **viit spetsiaalset tihendusstrateegiat**:

1. **Otsingutulemuste tihendamine** — eemaldab üleliigsed tulemused, säilitab N parimat
2. **Faili lugemistulemuse tihendamine** — kärbib suuri faile, säilitab päised ja impordid
3. **Koodikäivituse tulemuse tihendamine** — säilitab ainult olulise stdout/stderr-väljundi
4. **Andmebaasipäringu tulemuse tihendamine** — piirab ridu, eemaldab paljusõnalised metaandmed
5. **API vastuse tihendamine** — eemaldab null-väljad, tihendab massiive

#### Millal seda kasutada

Tööriistatulemuste tihendamine on tööriistakutsete olemasolul **alati sisse lülitatud**. Konfigureerimine pole vajalik.

### Virnastatud konveier

Virnastatud režiim käitab **mitut mootorit järjestikku** — tavaliselt esmalt RTK (60–90% sääst tööriistaväljundis), seejärel Caveman (30% lisasääst ülejäänud tekstis). Nii saavutatakse **78–95% kogusääst**.

#### Kuidas see töötab

```
Sisend (1000 sõnet)
  → RTK (käsuteadlik filter) → 200 sõnet
    → Caveman (täitesõnade eemaldamine) → 140 sõnet
  → Väljund (140 sõnet, 86% sääst)
```

#### Millal seda kasutada

Kasutage virnastatud režiimi järgmiste kasutusjuhtude puhul:

- Tööriistamahukad töövood (agentprogrammeerimine, uurimistöö)
- Kulutundlik pakktöötlus
- Kui vajate maksimaalset sõnede kokkuhoidu

Konfigureerige kombineeritud konfiguratsiooni kaudu:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Kompressioonikombode alistused

Saate globaalse kompressioonirežiimi **iga kombo jaoks eraldi** alistada, et kohandada käitumist
erinevate kasutusjuhtude jaoks:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

See on kasulik järgmisteks juhtudeks:

- **Programmeerimiskombod**: kasutage pikkade seansside jaoks režiimi `aggressive`
- **Kiirküsimuste ja -vastuste kombod**: kasutage kiirete vastuste jaoks režiimi `lite`
- **Tööriistamahukad kombod**: kasutage maksimaalse kokkuhoiu saavutamiseks režiimi `stacked`
- **Tootmiskombod**: kasutage vahemällu salvestamist toetavate pakkujate jaoks režiimi `cache-aware`

---

## Vaadake ka

- [Keskkonna konfiguratsioon](../reference/ENVIRONMENT.md) — kompressiooni keskkonnamuutujad
- [Arhitektuurijuhend](../architecture/ARCHITECTURE.md) — kompressioonikonveieri sisemine toimimine
- [Kasutusjuhend](../guides/USER_GUIDE.md) — kompressiooniga alustamine
- [RTK-kompressioon](./RTK_COMPRESSION.md) — RTK filtrid, usaldusmudel, kontrollvärav ja toorväljundi taastamine
- [Kompressioonimootorid](./COMPRESSION_ENGINES.md) — Caveman, RTK, virnastamine, API-d, MCP ja töölaud
- [Kompressioonireeglite vorming](./COMPRESSION_RULES_FORMAT.md) — JSON-reeglipaketi vorming
- [Kompressiooni keelepaketid](./COMPRESSION_LANGUAGE_PACKS.md) — keelespetsiifilised Cavemani reeglid
