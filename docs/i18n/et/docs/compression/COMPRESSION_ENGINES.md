# Compression Engines (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute'i tihendus põhineb mootorilepingutel. Režiim võib käitada otse üht mootorit
(`caveman` või `rtk`) või deterministlikku virnastatud konveierit, mis käivitab järjest mitu mootorit.

## Režiimid

| Režiim       | Mootori tee                            | Ettenähtud sisend                                   |
| ------------ | -------------------------------------- | --------------------------------------------------- |
| `off`        | puudub                                 | Viiba täpne säilitamine                             |
| `lite`       | Cavemani lihtrežiimi abifunktsioonid   | Madala riskiga alati aktiivne korrastus             |
| `standard`   | Caveman                                | Loomulikus keeles viiba tihendamine                 |
| `aggressive` | Caveman + ajaloo-/tööriistakokkuvõtjad | Pikad vestlusseansid                                |
| `ultra`      | Caveman + kärpimise abifunktsioonid    | Kontekstipiirangu ületamisest taastumine            |
| `rtk`        | RTK                                    | Terminali, kesta, järgu, testide ja giti väljund    |
| `omniglyph`  | OmniGlyph                              | Kontekst pildina teenusepakkuja omaliideses         |
| `stacked`    | Konveier, vaikimisi `rtk -> caveman`   | Segatud tööriistalogid ja proosa, maksimaalne sääst |

### OmniGlyphi tihendusprofiilid

Mootor `omniglyph` (pakett `omniglyph`, 1.4.0+) aktsepteerib nimega semantilist profiili, mis määratakse
globaalselt tihendussätete `omniglyph.profile` kaudu või iga etapi jaoks eraldi
virnastatud konveieri etapi konfiguratsioonis:

| Profiil       | Piirang                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Vaikimisi. Avaldatud mõõtmistes kasutatud reeglistik — teisendab süsteemi, tööriistade dokumentatsiooni ja tiheda ajaloo piltideks |
| `balanced`    | Hoiab aktiivse oleku algkujul, kaitseb viimast 8 vooru, koondab vanema lõpetatud ajaloo                                            |
| `coding-safe` | Hoiab volitused, tööriistaskeemid ja aktiivse tööriistaväljundi algkujul, kaitseb viimast 12 vooru                                 |
| `passthrough` | Suunab ilma teisendamata; mootor jäetakse vahele                                                                                   |

Profiil on **ülempiir, mitte alampiir**: paketi `mergeCompressionProfileOptions`
ei luba kutsujapoolsel ülekirjutusel taasavada kadudega töötlussuunda, mille profiil sulges, seega ei saa etapipõhine
`preserveSystemPrompt: false` süsteemi tihendamist profiili `coding-safe` korral uuesti lubada.

Selle koodibaasi põhjal mõõdetuna tõstavad `coding-safe` ja `balanced` väärtuse `minCompressChars`
maksimumini ning hoiavad süsteemi, tööriistaskeemid ja tööriistade tulemused algkujul, mistõttu seanss, kuhu pole
veel ajalugu kogunenud, peatub olekus `below_min_chars` ja mootor ei teisenda midagi. Seetõttu
on vaikimisi kasutusel `aggressive`, mitte kõige turvalisem profiil.

Pakett tuletab oma mudeli ulatuse ja profiili keskkonnakonfiguratsioonist.
OmniRoute ei delegeeri kunagi seda otsust: adapter fikseerib mudelilüüsi paketi
kõige piiravama ulatuse järgi, mistõttu saavad hosti keskkonnasätted lubatud loendit ainult kitsendada, mitte
laiendada seda OmniRoute'i mõõdetud kviitungitest kaugemale.

## Mootoriregister

Register asub failis `open-sse/services/compression/engines/registry.ts`. Mootorid pakuvad ühist
lepingut:

- `id`: stabiilne mootori ID, näiteks `caveman` või `rtk`
- `apply(text, config)`: pärandkäivitustee, mida kasutavad virnastatud konveierid
- `compress(input, config)`: peamine käivitustee, mis tagastab teksti ja statistika
- `getConfigSchema()`: tagastab kehtiva konfiguratsiooni JSON Schema laadse struktuuri
- `validateConfig(config)`: tagastab `{ valid, errors[] }`

Registreerimiseks kasutatakse funktsiooni `registerCompressionEngine(engine)` (või täiustatud juhtudel
funktsiooni `registerEngine`), mis kutsub enne vastuvõtmist välja `assertValidEngine()` ja `validateConfig(defaultConfig)`.
Mootori eemaldamiseks käitusajal kasutage funktsiooni `unregisterCompressionEngine(id)`.

`strategySelector.ts` registreerib sisseehitatud mootorid enne tihendamise käivitamist. See võimaldab eelvaatel,
käitusaegsel tihendamisel, virnastatud režiimil, testidel ja tulevastel mootoritel kasutada sama käivitusteed.

### MCP kirjelduste tihendamine (seotud)

Eraldi register tihendab MCP tööriistade kirjelduste metaandmeid registri tasemel — vaadake
`open-sse/mcp-server/descriptionCompressor.ts` ja [MCP-SERVER.md](../frameworks/MCP-SERVER.md). See taaskasutab
Cavemani reegleid, kuid töötab tööriistade metaandmete, mitte päringute lastidega.

### Täiendavad sisseehitatud mootorid

Lisaks Cavemanile, RTK-le ja LLMLingua-2-le sisaldab register mitut spetsiaalset kadudeta /
struktuurset mootorit (mida kasutavad virnastatud konveierid, mänguväljak ja testid):

| Mootor        | ID              | Mida see teeb                                                                                                                                                                    |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): asendab suured järjestikused tekstiplokid sisupõhiste viidetega, nii et korduvad/suured plokid saadetakse üks kord ja neile viidatakse edaspidi. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): homogeensete JSON-massiivi lastide kadudeta tabelkompaktimine veerupõhisele kujule `[N rows]`.                                                           |
| ionizer       | `ionizer`       | Väga suurte homogeensete plokkide ridade valim päise/keskosa/lõpu põhjal, salvestades väljajäetud keskosa CCR-i sisupõhise viitena.                                              |
| session-dedup | `session-dedup` | Seanssideülene sisupõhine deduplikeerimine (inspireeritud TokenMizerist): jätab välja teksti, mida sama seansi varasemates voorudes juba nähti.                                  |

**CCR-i hankimisprotokolli juhis (#8033):** kui CCR asendab päringus esimest korda ≥1 ploki,
lisab mootor ette ühe idempotentse `system`-sõnumi (mis algab
sentinelliga `[CCR protocol]`), et õpetada kutsujale markeri → tööriista lepingut: mida
marker `[CCR retrieve hash=<24hex> chars=N]` tähendab, et räsi tuleb kopeerida muutmata kujul
(kõik 24 kuueteistkümnendmärki — valesti kopeeritud räsid on tõenäoline „plokki ei leitud”
vigade põhjus) ja et marker `[dedup:ref sha=...]` tähendab „vaata ajaloost”, mitte „kutsu
tööriista”. Märkus sisestatakse **ainult siis, kui kutsuja avaldatud `tools[]` tõendab, et see
suudab tegelikult jõuda tööriistani `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` failis
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — tavaline
OpenAI-ga ühilduv kutsuja, millel seda tööriista pole, ei saa kunagi juhist kutsuda midagi,
milleni see ei pääse. Idempotentsus tagatakse enne sisestamist sentinelli otsimisega
sõnumiajaloost, mistõttu mitmevoorulised päringud (mis taasesitavad varasemaid sõnumeid) ei kuhja
märkust iga vooruga.

## Caveman

Cavemani režiim keskendub tavaproosa semantilisele tihendamisele:

- säilitab koodiplokid, URL-id, JSON-i, teed ja struktureeritud andmed
- eemaldab täitesõnad, ebakindlad väljendid, korduva konteksti ja paljusõnalised siduvad fraasid
- toetab keeleteadlikke failireeglistikke kaustas `open-sse/services/compression/rules/`
- on jätkuvalt saadaval pärandrežiimide `standard`, `aggressive` ja `ultra` kaudu

Juhtpaneelil asub see jaotises `Dashboard -> Context & Cache -> Caveman`.

Cavemani lähteprojekt teatab `~75%` võrra väiksemast väljundtokenite arvust, võrdlustestide keskmisest
väljundisäästust `65%` vahemikus `22-87%` ning `~46%` sisendtihendusest. OmniRoute kasutab Cavemani sisendpoole
näitajat kombineeritud viiba-/kontekstisäästu dokumenteerimisel; Cavemani väljundrežiim jääb eraldiseisvaks
vastuse käitumise funktsiooniks.

## RTK

RTK-režiim keskendub käskude ja tööriistade väljundile:

- tuvastab sellised väljundiklassid nagu `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go testid, TypeScripti/Vite'i/Webpacki järgud, ESLint, npm-i auditid/paigaldused, Dockeri logid,
  käsurea `find`/`grep`, pinujäljed ja üldised logid
- rakendab 49 JSON-filtrit kaustast `open-sse/services/compression/engines/rtk/filters/`
- toetab RTK-stiilis deklaratiivset konveierit: ANSI eemaldamine, asendamine, väljundi sobitamisel lühistamine,
  ridade eemaldamine/säilitamine, reahaaval kärpimine, alguse/lõpu/maksimaalse ridade arvu järgi kärpimine ja tühja tulemuse korral varuväljund
- toetab usalduskontrolliga projektifiltreid failis `.rtk/filters.json` ja globaalseid filtreid failis
  `DATA_DIR/rtk/filters.json`
- eemaldab ANSI-jadad, edenemismüra, korduvad read ja ebavajaliku standardteksti
- säilitab lahendamist vajavad tõrked, hoiatused, kokkuvõtted, muudetud failid ja lõpuosa konteksti
- võib autentitud haldusmarsruutide kaudu taastamiseks/silumiseks soovi korral säilitada redigeeritud toorväljundi

Juhtpaneelil asub see jaotises `Dashboard -> Context & Cache -> RTK`.

Kohandatud filtrite, usalduse, kontrollimise ja toorväljundi taastamise tööpõhimõtete üksikasjad asuvad failis
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK lähteprojekt teatab käsuväljundi tihendamisel `60-90%` säästust. Selle README näites väheneb
30-minutilise Claude Code'i seansi maht `~118,000` tokenilt `~23,900` tokenile ehk sääst on `79.7%`.

## LLMLingua-2 (semantiline kärpimine)

LLMLingua-2 režiim teostab proosal väikese ONNX-i tokeniklassifikaatori abil **semantilist tokenite kärpimist**,
täiendades reeglipõhiseid Cavemani ja RTK mootoreid:

- tihendab proosat ainult süsteemivälistes sõnumites; piirdega koodiplokke ja muid säilitatavaid
  konstruktsioone ei muudeta kunagi
- käitab `@atjsh/llmlingua-2` taustsüsteemi (ONNX `@huggingface/transformers` kaudu)
  töölõimes, mistõttu mudeli järeldamine ei blokeeri kunagi päringu sündmusetsüklit
- on **kombineeritav** (`stackPriority` 35): kombineeritud konveieris käivitub see pärast
  struktuurseid mootoreid (CCR, session-dedup, headroom, Caveman), kuid enne režiimi `ultra`, sest
  semantiline kärpimine on kõige tõhusam juba struktuurselt tihendatud tekstil — nt
  `rtk -> caveman -> llmlingua`
- **jätkab iga vea korral algandmetega** (puuduvad valikulised sõltuvused, töölõime loomine, mudeli laadimine, järeldamine
  või ajalõpp) → algtekst tagastatakse muutmata kujul, mitte kunagi veateatena

Mootori asukoht: `open-sse/services/compression/engines/llmlingua/`. Juhtpaneelil asub see jaotises
`Dashboard -> Context & Cache -> LLMLingua`.

### Mudelid

Vaikemudel on **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
kiire). Täpsem **BERT-base** mudel (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) on saadaval mootori konfiguratsiooni välja `model` kaudu. `@huggingface/transformers`
laadib valitud mudeli esimesel väljakutsel laisalt HuggingFace Hubist kausta
`${DATA_DIR}/models/llmlingua` (`modelStore.ts`); konfiguratsiooni `modelPath` ülekirjutus
suunab selle hoopis kohalikule koopiale (võrguühenduseta / õhuvahega paigaldused).

### Valikulised sõltuvused ja nõudmisel paigaldamine

Kärbitav LLMLingua käituskeskkonna partnersõltuvuste kogum on **valikuline**. Kaks paketti on failis
`package.json` deklareeritud kui `optionalDependencies` ja tootmisjärgus jäetud **väliseks**
(`scripts/build/prepublish.ts` ei pakenda neid kaasa):

| Pakett               | Versioon (fikseeritud) | Märkused                                                |
| -------------------- | ---------------------- | ------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`                | Sisenemispakett; deklareerib teised partnersõltuvustena |
| `js-tiktoken`        | `^1.0.20`              | Tokeniseerija                                           |

`@huggingface/transformers` on fikseeritud versioonile `^4.2.0` (jagatud kohalike manuste teega ja
ka eraldiseisvasse paketti jälitatud); `@atjsh/llmlingua-2@2.0.5` kasutab seda partnersõltuvusena vahemikuga
`"^3.5.2 || ^4.0.0"`, seega toetatakse nii Transformers.js-i versiooni 3 kui ka versiooni 4. Alates versioonist 2.0.4
ei vaja `@atjsh/llmlingua-2` enam paketti `@tensorflow/tfjs`, mis eemaldas SLM-i kogumist suurima üksiku
komponendi (TensorFlow.js). Ainult kaks ülaltoodud paketti on kärbitavad SLM-i
partnersõltuvused. Tavaline `npm install` (arendus) paigaldab valikulise kogumi automaatselt, kui valikulisi
sõltuvusi ei jäeta välja.

**Miks nõudmisel:** npm-is avaldatud pakett, eraldiseisev komplekt ja Dockeri tõmmis
tarnitakse mahu vähendamiseks **ilma** nende sõltuvusteta. Kui need puuduvad, nurjub töölõime sõltuvuste
kontroll (`@atjsh/llmlingua-2` lahendamise proov failis `worker.ts`) ja mootor
**jätkab vaikides algandmetega** — LLMLingua valimine ei tee midagi (tekst tagastatakse muutmata kujul ja
viga ei logita). Selle aktiveerimiseks kärbitud keskkonnas paigaldage valikuline kogum:

```bash
# fikseerige versioonid package.json-i optionalDependencies väljal deklareeritud versioonidele
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` eemaldamine (2.0.4+) kõrvaldab varem domineerinud ~800 MB
komponendi — allesjääva mahu moodustavad transformers.js-i ja onnxruntime-node'i käituskeskkonnad
ning esmakasutusel allalaaditav TinyBERT-i mudel (~57 MB) (mitte npm-i kaudu).

Keskkonniti:

- **Arendus / `npm install`** — installitakse automaatselt, välja arvatud juhul, kui kasutasite suvandit `--omit=optional`
  (või `--no-optional`). Midagi pole vaja teha.
- **Globaalne npm (`npm i -g omniroute`) / autonoomne install** — käivitage ülaltoodud installikäsk
  installitud paketi kataloogis või installige uuesti ilma valikulisi sõltuvusi välja jätmata.
- **Docker** — lisage installikäsk tuletatud tõmmise kihti; avaldatud tõmmis
  on teadlikult minimaalne.
- **VPS (PM2)** — installige rakenduse kataloogi `node_modules`, seejärel taaskäivitage protsess,
  et tööprotsess kontrolliks lüüsi uuesti.
- **Nexti töötlemata autonoomne versioon (`npm run build` → `.build/next/standalone/server.js`)** — autonoomse
  versiooni jälg ei sisalda EI tööprotsessi EGA valikulisi sõltuvusi, mistõttu mootor läheb tõrke korral
  märkamatult avatud režiimi. `scripts/build/colocate-standalone.mjs` lisab mõlemad uuesti (tööprotsessi esbuild +
  valikuliste sõltuvuste sulund autonoomse versiooni kataloogipuusse); see käivitub pärast iga koostamist
  automaatselt npm-i `postbuild`-haagi kaudu. Idempotentne ja jätkab puuduvate sõltuvuste korral tööd ilma veata.

**Kontrollige, et see oleks aktiivne:** kui LLMLingua on valitud, muutub tegelik proosatekst tõepoolest
lühemaks (mootor ei lähe enam tõrke korral avatud režiimi) ning esimene päring käivitab mudeli allalaadimise
kataloogi `${DATA_DIR}/models/llmlingua`. Lüüs kontrollib teadlikult ainult paketti `@atjsh/llmlingua-2` —
teised partnerpaketid on ainult ESM-vormingus ja `require.resolve` tekitab nende puhul erindi isegi siis,
kui need on olemas — seega läheb tööprotsess endiselt tõrke korral avatud režiimi, kui mõni partnerpakett
on funktsiooni `import()` käitamise ajal tegelikult puudu.

## Virnastatud konveierid

Virnastatud režiim käitab konveieri etappe järjekorras. Vaikimisi on järjestus järgmine:

```txt
rtk -> caveman
```

Kasutage seda kodeerimisagendi seansside jaoks, kus viip ühendab käsuväljundi inimese või assistendi
proosaga. RTK vähendab esmalt mürarikkaid tööriistaloge, seejärel tihendab Caveman ülejäänud loomulikku keelt.

Konveieri etapid seadistatakse tihendussätetes `stackedPipeline` abil või tihenduskombinatsioonide
kaudu.

Kui mõlemad mootorid vähendavad sama sobivat sisu, siis sääst kumuleerub:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP juurdepääsetavuspuu filter

MCP juurdepääsetavuspuu nutifilter on käivitamisjärgne tihenduskiht, mis töötab MCP
**tööriistatulemustel**, mitte viipadel ega kontekstil. See on suunatud mahukatele juurdepääsetavuspuu ja brauseri
hetktõmmise andmetele, mille tagastavad sellised tööriistad nagu Playwright, computer-use ja brauseri automatiseerimise MCP
serverid.

### Mida see teeb

1. **Müra eemaldamine** — eemaldab tühjad üldised/tekstikirjed (`- generic:`, `- text: ""`)
2. **Naaberelementide koondamine** — kui ≥ `collapseThreshold` (vaikimisi 30) järjestikust rida on struktuurilised
   kordused, koondatakse need esimeseks `collapseKeepHead` (vaikimisi 10) reaks + arvuliseks kokkuvõtteks +
   viimaseks `collapseKeepTail` (vaikimisi 5) reaks
3. **Viidete säilitamine** — Playwrighti/computer-use'i jaoks vajalikud `[ref=eXX]` ankrud jäetakse alati puutumata
4. **Jäik kärpimine** — kui tekst ületab pärast koondamist endiselt `maxTextChars` (vaikimisi 50 000),
   kärbitakse seda navigeerimisvihjega, et agent saaks tööd jätkata

### Mootori asukoht

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← funktsiooni smartFilterText() sisenemispunkt
  collapseRepeated.ts ← naaberelementide koondamise algoritm
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Seadistamine

Seda juhib globaalsetes sätetes `compression.mcpAccessibility` (migratsioon 056). Vaikekonfiguratsioon:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filtrit rakendatakse ainult neile tööriistatulemuste andmetele, mille `type` on `"text"` ja mille pikkus
ületab väärtust `minLengthToProcess`. See ei mõjuta viipade tihendamist ega päringuandmeid.

### Eeldatav sääst

Brauseri hetktõmmiste tööriistatulemuste puhul 60–80%, sõltuvalt lehe keerukusest. Koondamisalgoritmi
keerukus on ridade arvu suhtes O(n) ja see lisab tühise latentsuse.

### Selle filtri võrdlus ülaltoodud tihendusmootoritega

| Aspekt      | Caveman / RTK / virnastatud | MCP juurdepääsetavusfilter             |
| ----------- | --------------------------- | -------------------------------------- |
| Siht        | Päringuviibad / kontekst    | MCP tööriistatulemused                 |
| Käivitaja   | Tihendusrežiimi säte        | `compression.mcpAccessibility.enabled` |
| Ulatus      | Kõik SSE sõnumid            | Ainult tööriistatulemused              |
| Viiteankrud | Ei kohaldu                  | Säilitatakse tingimusteta              |

---

## Tihenduskombod

Tihenduskombod on nimelised tihendusprofiilid, mida saab määrata marsruutimiskombodele:

- `compression_combos`: talletab režiimi, konveieri, RTK konfiguratsiooni, keelekonfiguratsiooni ja vaikemarkerit
- `compression_combo_assignments`: seob tihenduskombinatsiooni marsruutimiskomboga
- käitusaegne integratsioon lahendab määratud tihenduskombinatsiooni enne üldisi kombo ülekirjutusi
- analüütika sisaldab välju `compression_combo_id` ja `engine`

Töölaua asukoht: `Töölaud -> Kontekst ja vahemälu -> Tihenduskombod`.

## API-liides

| Marsruut                               | Eesmärk                                                               |
| -------------------------------------- | --------------------------------------------------------------------- |
| `/api/settings/compression`            | Üldised tihendussätted (sisaldab `mcpAccessibility` konfiguratsiooni) |
| `/api/compression/preview`             | Mis tahes tihendusrežiimi eelvaade                                    |
| `/api/compression/language-packs`      | Saadaolevate Cavemani keelepakettide loend                            |
| `/api/context/caveman/config`          | Cavemani sätete alias                                                 |
| `/api/context/rtk/config`              | RTK vaikeväärtused ja sätted                                          |
| `/api/context/rtk/filters`             | RTK filtrite kataloog                                                 |
| `/api/context/rtk/test`                | RTK eelvaate-/testimislõpp-punkt                                      |
| `/api/context/rtk/raw-output/[id]`     | Autenditud ja redigeeritud toorväljundi taastamine                    |
| `/api/context/combos`                  | Tihenduskombode CRUD                                                  |
| `/api/context/combos/[id]/assignments` | Marsruutimiskombode määrangute CRUD                                   |
| `/api/context/analytics`               | Tihendusanalüütika alias                                              |

Haldusmarsruudid nõuavad halduse autentimist või API-võtme poliitikakontrolle.

## MCP tööriistad

Tihendus pakub viit MCP tööriista:

| Tööriist                            | Ulatus              | Eesmärk                                   |
| ----------------------------------- | ------------------- | ----------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Sätted, analüütika, vahemälu statistika   |
| `omniroute_compression_configure`   | `write:compression` | Üldiste sätete värskendamine              |
| `omniroute_set_compression_engine`  | `write:compression` | Režiimi ja valikulise konveieri määramine |
| `omniroute_list_compression_combos` | `read:compression`  | Tihenduskombode loend                     |
| `omniroute_compression_combo_stats` | `read:compression`  | Kombo-/mootorianalüütika lugemine         |

## Ulatus ja välistused

**Manuseid ei tihendata kunagi.** `open-sse/handlers/embeddings.ts` ei kutsu kunagi ühtegi
tihendusmootorit — päringu- ja vastusekehad edastatakse täitjale otse ning muutmata kujul.
Praegu on see struktuurne omadus (manustel ja vestluse lõpetamistel on eraldiseisvad töötlejad),
mitte käitusaegne kontroll, kuid see tähendab, et probleemi #8034 vektorite moonutamise murel
puudub manuste teel avalduspind.

**Mudelipõhine/lõpp-punktipõhine välistusfilter (#8034).** Vestluse lõpetamiste puhul saab operaator
määrata mudeli ID-d / `provider/model` sihtmärgid, mida ei tohi kunagi tihendada — see on kaitsemeede,
mis on kasulik juhul, kui tihendus ühendatakse hiljem manustega külgnevale teele lähemale, ning
üldiselt kasulik iga mudeli puhul, mille jaoks on oluline viiba täpne bait-baidi-vastu kuju
(deterministlikud hindamised, vahemälutundlikud prefiksid jne).

- Sätete väli: `exclusions?: string[]` üldises tihenduskonfiguratsioonis
  (`GET`/`PUT /api/settings/compression`), mis talletatakse olemasoleva `key_value` tihenduse
  nimeruumi (`src/lib/db/compression.ts`) kaudu — uut tabelit ei lisata.
- Töölaua vahekaart: **Töölaud → Tihendus → Välistused**
  (`/dashboard/compression/exclusions`).
- Mustri süntaks: `*` on ainus metamärk. Kõik muud regulaaravaldise metamärgid mustris
  varjestatakse enne sobitamist, seega vastab `gpt-5.6` ainult literaalsele stringile, mitte kunagi
  väärtusele `gpt-5x6` (ReDoS-kindel, piiratud, ilma pesastatud kvantorita). Mustrid sobitatakse
  tõstutundetult nii palja mudeli ID kui ka `provider/model` liitväärtusega — `gpt-5-6`,
  `openai/gpt-5-6` ja `openai/*` kõik toimivad ning `*` üksi välistab iga mudeli.
- Sobitamine: `isCompressionExcluded()` / `normalizeCompressionExclusions()` failis
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kontrollib välistatud sihtmärki
  kohe pärast tihendussätete lahendamist, **enne mis tahes mootori käivitamist**, ning käsitleb
  vastet täpselt nii, nagu tihendus oleks üldiselt keelatud — päringu keha on tõendatavalt
  bait-baidi-vastu identne. Vahelejätmine salvestatakse analüütikas nähtavuse tagamiseks funktsiooniga
  `writeCompressionSkip(..., "excluded")`.
- Vaikeväärtus (tühi/puuduv loend): identne versioonile #8034 eelnenud käitumisega — midagi ei välistata.

## Teadaolevad piirangud

- **LLMLingua-2 (SLM) nõuab samasse asukohta paigutatud valikulisi sõltuvusi.** Töötaja töötab
  produktsioonijärgus ainult siis, kui `@atjsh/llmlingua-2` ja selle kaassõltuvused on paigutatud
  asukohta `dist/node_modules` (vt `scripts/build/colocateOptionals.mjs`, #4286). Ilma nendeta
  jätkab mootor tõrke korral tööd algse tekstiga (tagastab algse teksti). Töötaja lahendamine ei
  sõltu enam väärtusest `import.meta.url` (see ei tööta autonoomses komplektis) — lähtepunktina
  kasutatakse käitusaegset töökataloogi / väärtust `argv[1]`.
- **Cavemani keelepaketid `de` / `fr` / `ja` on osalised.** Need sisaldavad `context` +
  `filler` + `structural` reegleid, kuid mitte `dedup` / `ultra` pakette, mistõttu pole
  `ultra` intensiivsus nende keelte puhul tugevam kui `full` (need kasutavad ainult oma
  reegleid — vaikimisi ei võeta kasutusele ingliskeelseid `dedup`/`ultra` reegleid, mis
  moonutaksid võõrkeelset teksti). `en` / `es` / `id` / `pt-BR` on täielikud. Osaliste
  pakettide täiendused failidega `dedup.json` + `ultra.json` on teretulnud.
- **Virnastatud telemeetria loetleb ainult tihendamist rakendanud mootorid.** Virnastatud
  konveieri etapp, mille mootor käivitus, kuid saavutas 0 % säästu, tagastab `stats:null`
  ega ilmu seetõttu jaotises `engineBreakdown` — seda ei saa eristada vahele jäetud etapist.
  Erinevuse „käivitus, 0 %“ ja „jäeti vahele“ tuvastamine nõuaks jaotusmudeli muutmist ning
  on edasi lükatud.

## Valideerimine

Selle valdkonna sihitud kontrollid on järgmised:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
