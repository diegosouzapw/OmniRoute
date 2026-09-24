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

### Armatuurlaud

Navigeerige jaotisesse `Dashboard → Context & Cache`:

- **Caveman** — režiimi valik, keelepaketid, eelvaade ja globaalsed vaikeseaded
- **RTK** — käskude filtri eelvaade, RTK ohutusseaded ja filtrikataloog
- **Compression Combos** — nimetatud mootorite torujuhtmed, mis on määratud marsruutimis-kombodele
- **Auto-Trigger Threshold** — automaatselt käivitab tihendamise, kui märkide arv ületab läve

### Kombopõhine alistamine

Jaotises `Dashboard → Context & Cache → Compression Combos` määrake tihenduskombinatsioon marsruutimis-kombinatsioonile:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

See võimaldab teil kasutada virnastatud tihendamist tasuta/kodeerimispakkujatel, hoides samal ajal tasulistel tellimustel lite-režiimi.

See "Per-Combo Override" määramine on erinev juhtelement **marsruutimis-kombo tihendusrežiimi** alistamisest (Default/Off/Lite/Standard/Aggressive/Ultra) – see alistamine ei vali nimetatud tihendus-kombo torujuhet; see lihtsalt määrab `compressionMode` välja, mida `resolveCompressionPlan` konsulteerib. Seda saab seadistada kas kombo kaardil (`Dashboard → Combos`) või, alates #6760, marsruutimis-kombo kohta jaotises "Assign to routing" loendis `Dashboard → Context & Cache → Compression Combos`, otse ülalpool dokumenteeritud torujuhtme määramise märkeruudu kõrval. Mõlemad liidesed püsivad sama `PUT /api/combos/{id}` lõpp-punkti kaudu.

### Päringupõhine alistamine

Saatke päringupäis `x-omniroute-compression`, et alistada tihendusplaan ühe päringu jaoks. Sellel on kõrgeim prioriteet – see alistab marsruutimis-kombo alistamise, aktiivse profiili, automaatse käivituse ja paneeli vaikesätte. Tundmatud väärtused ignoreeritakse (päringut ei lükata kunagi tagasi) ja globaalne pealüliti reguleerib endiselt kõike: kui tihendamine on globaalselt välja lülitatud, ei saa päis seda sisse lülitada. Väärtused:

| Väärtus       | Mõju                                                                                                            |
| :------------ | :-------------------------------------------------------------------------------------------------------------- |
| `off`         | Selle päringu jaoks tihendamist ei toimu.                                                                       |
| `default`     | Paneelist tuletatud vaike-profiil (ignoreerib aktiivset profiili). Kadudega mootorid jäävad välja.              |
| `safe`        | Sama, mis päise ära jätmine: ainult dublikaatide eemaldamine ja tühikute kokkuvoltimine.                        |
| `allow-lossy` | Hoidke selle päringu operaatoriplaani, sealhulgas kokkuvõtteid, asjakohasuse filtreid ja stiili ümberkirjutusi. |
| `engine:<id>` | Üks mootor, kui see on lubatud, nt `engine:rtk`. See on selle mootori päringupõhine valik.                      |
| `<combo>`     | Nimetatud kombo, mis sobitatakse esmalt nime (tõstutundetu) ja seejärel ID järgi.                               |

Ilma `allow-lossy`, `engine:<id>` või nimetatud kombota ei rakendata kadudega mootoreid. Päring saab endiselt seansi dublikaatide eemaldamise ja tühikute kokkuvoltimise, kui tihendamine on sisse lülitatud.

Rakendatud plaan kajastatakse vastuse päises `X-OmniRoute-Compression: <mode>; source=<source>`, kus `<source>` on üks järgmistest: `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` või `off`.

### API

```bash
# Hangi tihendusseaded
curl http://localhost:20128/api/settings/compression

# Uuenda tihendusseadeid
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Eelvaata spetsiifilist RTK/virnastatud andmepaketti
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Loetle RTK filtripaketid
curl http://localhost:20128/api/context/rtk/filters

# Testi RTK-d otse valikulise käsu metaandmetega
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

## Faasi teekaart

| Faas    | Režiimid                                                                                                                                                    | Olek        |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Faas 1  | Väljas, Lite                                                                                                                                                | ✅ Tarnitud |
| Faas 2  | Standard, Agressiivne, Ultra                                                                                                                                | ✅ Tarnitud |
| Faas 3  | RTK, Virnastatud, Kompressioonikombinatsioonid                                                                                                              | ✅ Tarnitud |
| Faas 4  | Väljundstiilid, SLM-taseme Ultra, hindamisrakendus                                                                                                          | ✅ Tarnitud |
| Faas 4C | Adaptiivne kontekstieelarve ("ketas") — arvutusmootor + API (`contextBudget` PUT /api/settings/compression peal) + armatuurlaua režiimi/poliitika juhtnupud | ✅ Tarnitud |

---

## Tänuavaldused

Standard-režiimi tihendusreeglid on inspireeritud **[Cavemanist](https://github.com/JuliusBrussee/caveman)**, mille autor on **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viraalne projekt „miks kasutada palju sõnesid, kui vähesed teevad töö ära“. Cavemani andmetel kasutab see väljundis `~75%` vähem sõnesid, säästab võrdlustestides keskmiselt `65%` väljundist, väljundi säästuvahemik on `22-87%` ning sisendi tihendamise tööriist saavutab `~46%` säästu.

RTK-režiim on inspireeritud projektist **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, mille autor on **[RTK AI](https://github.com/rtk-ai)** — suure jõudlusega käsuväljundi tihendamise projekt terminali-, kompileerimis-, testimis-, git- ja tööriistaväljundi filtreerimiseks. RTK andmetel saavutab see `60-90%` säästu ning README näidisseansi järgi säästetakse `~80%`.

---

## Täiustatud tihendussüsteemid

Lisaks 7 standardrežiimile sisaldab OmniRoute mitmeid täiustatud tihendussüsteeme, mis töötavad automaatselt konteksti alusel.

### Vahemäluteadlik tihendamine

Mõned pakkujad (nagu Anthropic koos viipade vahemällu salvestamisega) toetavad **viipade vahemällu salvestamist**, mis võimaldab neil vahemällu salvestada viipade osi kulude ja latentsuse vähendamiseks. Kui vahemällu salvestamine on lubatud, võib agressiivne tihendamine tegelikult **kahjustada** jõudlust, sest see muudab vahemällu salvestatud märke, muutes vahemälu kehtetuks.

Moodul `cachingAware.ts` lahendab selle probleemi, **tuvastades vahemällu salvestamise konteksti** ja **kohandades tihendusstrateegiat** vastavalt.

#### Kuidas see töötab

1. **Tuvastab vahemällu salvestamise konteksti** – skaneerib päringu keha `cache_control` markerite osas
2. **Tuvastab vahemällu salvestavad pakkujad** – kontrollib, kas sihtpakkuja toetab vahemällu salvestamist
3. **Kohandab strateegiat** – alandab `aggressive`/`ultra` tasemele `standard` vahemällu salvestavate pakkujate jaoks
4. **Jätab süsteemiviiba vahele** – süsteemiviibad on tavaliselt vahemällu salvestatud, seega ärge neid tihendage
5. **Kasutab deterministlikke teisendusi** – kasutab ainult teisendusi, mis annavad järjepideva väljundi

#### Koodinäide

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Vahemälu marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Millal kasutada

Vahemäluteadlik tihendamine on **alati sisse lülitatud** – konfiguratsiooni pole vaja. See käivitub ainult siis, kui:

- Päringul on `cache_control` markerid
- Sihtpakkuja toetab viipade vahemällu salvestamist (Anthropic, OpenAI jne)

### Progressiivne vananemine

Pikad vestlused koguvad palju sõnumivahetusi, kuid vanemad vahetused muutuvad vähem asjakohaseks. Moodul `progressiveAging.ts` **halvendab sõnumeid vahetuste kauguse järgi**:

- **Hiljutised vahetused (0-3)**: Säilitatakse sõna-sõnalt (täielik detail)
- **Keskmised vahetused (4-8)**: Kerge tihendamine (tühikud, vorminduse puhastamine)
- **Vanad vahetused (9+)**: Koopainimese tihendamine (täiteainete eemaldamine, kokkuvõte)
- **Väga vanad vahetused (20+)**: Tugevalt kokkuvõtlikud või eemaldatud

#### Koodinäide

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Esimesed 3 vahetust: sõna-sõnalt
  light: 8, // Vahetused 4-8: kerge tihendamine
  moderate: 20, // Vahetused 9-20: koopainimese tihendamine
  // Vahetused 21+: tugev kokkuvõte
});

// saved = salvestatud märkide arv
```

#### Millal kasutada

Progressiivne vananemine on **alati sisse lülitatud** režiimide `aggressive` ja `ultra` puhul. See on eriti tõhus:

- Pikaajaliste kodeerimissessioonide puhul
- Mitmepäevaste vestluste puhul
- Agentlike töövoogude puhul paljude tööriistakutsetega

### Koopainimese väljundrežiim

Moodul `outputMode.ts` süstib **süsteemiviiba juhiseid**, et mudel ise toodaks tihendatud, lühikest väljundit ("koopainimese" stiilis).

#### Kuidas see töötab

Selle asemel, et sisendit tihendada, lisab see režiim süsteemiviiba, näiteks:

> "Vasta minimaalsete sõnadega. Jäta viisakused vahele. Kasuta lühikesi lauseid."

See töötab eriti hästi:

- Koodi genereerimisel (lühike väljund = vähem märke)
- Kiirete küsimuste ja vastuste puhul (pole vaja keerulisi selgitusi)
- Partii töötlemisel (maksimeerida läbilaskevõimet)

#### Millal kasutada

Koopainimese väljundrežiim on **valikuline** – seadistage see kombineeritud konfiguratsiooni kaudu:

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

Ülaltoodud koopainimese väljundrežiim on **pärand ühe stiili tee**. Faas 4 üldistas selle kompositsiooniliste väljundstiilide kataloogiks: `OUTPUT_STYLE_CATALOG` failis `open-sse/services/compression/outputStyles/catalog.ts`. Iga stiil on süsteemiviiba juhis, mis paneb mudeli ise tootma odavamat väljundit; stiile saab koos lubada ja need süstitakse kataloogi järjekorras.

| Stiil                            | `id`          | Mida see teeb                                                                                                                                                                                                                | Juhendkeeled                                                                |
| -------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Lühike proosa                    | `terse-prose` | Jätab välja täitesõnad/artiklid/kahtlused; hoiab tehnilise sisu täpsena. Sama tekst nagu pärand-koopainimese väljundrežiimis (viidatud, mitte uuesti trükitud).                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Vähem koodi                      | `less-code`   | YAGNI redel: väikseim töötav muudatus, pole soovimatuid abstraktsioone.                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Hobusesaba (laisk vanemarendaja) | `ponytail`    | "Parim kood on kood, mida pole kunagi kirjutatud": taaskasutus > ümberkirjutamine, algpõhjus > sümptom, lühim töötav diff.                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Mul on ADHD (tegevus-esimene)    | `i-have-adhd` | Tegevus esimesena (käsk/tee/lõik enne proosat), nummerdatud piiratud sammud, ÜKS konkreetne järgmine samm, pole eessõna/kokkuvõtet/lõpetajaid. Kohandatud [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Lühike CJK (文言)                | `terse-cjk`   | Klassikaline hiina üli-lühike stiil.                                                                                                                                                                                         | zh (lokaaliga piiratud: pakutakse ainult siis, kui lahendatud keel on `zh`) |

Igal stiilil on kolm intensiivsuse taset — `lite`, `full`, `ultra` — ja iga tase
lõpeb jagatud piiride klausliga, mis hoiab koodiplokid, failiteed, käsud,
veateated, URL-id ja identifikaatorid muutumatuna.

#### Kuidas süstimine töötab

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) lahendab
valiku kataloogi vastu (tundmatud id-d ja lokaaliga mittesobivad stiilid
jäetakse välja, see pole kunagi viga), liidab valitud juhised kataloogi järjekorras,
lisab piiride klausli **üks kord** ja laadib tulemuse süsteemi
viipa ette ühe idempotentsuse märgise (`[OmniRoute Output Styles]`) taha — uuesti rakendamine
ei tee midagi. Kui tuvastatud päringu keelel on tõlge, süstitakse
lokaliseeritud juhis inglise keele asemel.

#### Kuidas lubada

Armatuurlaual: **Context → Settings → Compression** — iga stiili kohta üks rida
sisse/välja lülitiga ja taseme valijaga. Programmilises mõttes säilitab tihenduskonfiguratsioon
valiku järgmiselt:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Tagasiühilduvus: pärand `outputMode: "caveman"` kombineeritud seade töötab endiselt ja vastab
`terse-prose`-le, olles bait-identne vana süstimisega igas pärandkeeles.

Keelevalik: kui `languageConfig.enabled` on sisse lülitatud, valib `autoDetect`
viimase kasutaja sõnumi keele (sama detektor nagu sisendmootoritel);
`autoDetect` väljalülitamine fikseerib `defaultLanguage`. Väljas → inglise keel.

Stiili × keele maatriks on fikseeritud
`tests/unit/compression/output-styles-i18n-matrix.test.ts` abil: uus stiil ei saa ilmuda
ilma vähemalt pt-BR tõlketa (või selgesõnalise jälgitava erandita) ja
olemasolev stiil ei saa vaikselt kaotada lokaali. Stiili lisamiseks vaadake
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Tööriista tulemuste tihendamine

Moodul `toolResultCompressor.ts` pakub **5 spetsialiseeritud tihendusstrateegiat**
tööriista tulemuste jaoks (funktsioonikutsed, agendi väljundid, otsingutulemused jne):

1. **Otsingutulemuste tihendamine** — Eemaldab üleliigsed tulemused, säilitab top-N
2. **Faili lugemise tihendamine** — Kärbib suuri faile, säilitab päised/impordid
3. **Koodi täitmise tihendamine** — Säilitab ainult olulise stdout/stderr
4. **Andmebaasi päringu tihendamine** — Piirab ridu, eemaldab verbaalse metaandmed
5. **API vastuse tihendamine** — Eemaldab nullväärtusega väljad, tihendab massiive

#### Millal kasutada

Tööriista tulemuste tihendamine on **alati sisse lülitatud**, kui tööriistakutsed on olemas.
Konfiguratsiooni pole vaja.

### Virnastatud torujuhe

Virnastatud režiim käivitab **mitu mootorit järjest** — tavaliselt esmalt RTK
(60-90% kokkuhoidu tööriista väljundil), seejärel Caveman (30% täiendavat kokkuhoidu
ülejäänud tekstil). See saavutab **78-95% kogu kokkuhoiu**.

#### Kuidas see töötab

```
Sisend (1000 märki)
  → RTK (käsu-teadlik filter) → 200 märki
    → Caveman (täitesõnade eemaldamine) → 140 märki
  → Väljund (140 märki, 86% kokkuhoidu)
```

#### Millal kasutada

Kasutage virnastatud režiimi järgmistel juhtudel:

- Tööriistamahukad töövoogud (agendiline kodeerimine, uurimistöö)
- Kulutundlik partii töötlemine
- Kui vajate maksimaalset märgi kokkuhoidu

Konfigureerige kombineeritult:

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
