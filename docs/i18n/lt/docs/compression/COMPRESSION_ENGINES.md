# Compression Engines (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

„OmniRoute“ glaudinimas grindžiamas variklių kontraktais. Režimas gali tiesiogiai vykdyti vieną variklį
(`caveman` arba `rtk`) arba deterministinę sudėtinę grandinę, kuri paeiliui vykdo kelis variklius.

## Režimai

| Režimas      | Variklio kelias                          | Numatytoji įvestis                                         |
| ------------ | ---------------------------------------- | ---------------------------------------------------------- |
| `off`        | nėra                                     | Tikslus užklausos išsaugojimas                             |
| `lite`       | „Caveman“ supaprastintos priemonės       | Mažos rizikos nuolatinis valymas                           |
| `standard`   | Caveman                                  | Natūraliosios kalbos užklausų glaudinimas                  |
| `aggressive` | Caveman + istorijos / įrankių santraukos | Ilgos pokalbių sesijos                                     |
| `ultra`      | Caveman + apkarpymo priemonės            | Konteksto limito atkūrimas                                 |
| `rtk`        | RTK                                      | Terminalo, apvalkalo, kūrimo, testų ir git išvestis        |
| `omniglyph`  | OmniGlyph                                | Kontekstas kaip vaizdas savuoju teikėjo protokolu          |
| `stacked`    | Grandinė, numatytoji `rtk -> caveman`    | Mišrūs įrankių žurnalai ir tekstas, didžiausias sutaupymas |

### „OmniGlyph“ glaudinimo profiliai

`omniglyph` variklis (paketas `omniglyph`, 1.4.0+) priima įvardytą semantinį profilį, nustatomą
globaliai glaudinimo nustatymų parinktimi `omniglyph.profile` arba kiekvienam veiksmui atskirai
naudojant sudėtinės grandinės veiksmo konfigūraciją:

| Profilis      | Riba                                                                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Numatytasis. Politika, pagal kurią išmatuoti paskelbti rezultatai — sistema, įrankių dokumentacija ir išsami istorija paverčiami vaizdais |
| `balanced`    | Išlaiko aktyvią būseną savuoju formatu, apsaugo paskutinius 8 dialogo etapus, sutraukia senesnę užbaigtą istoriją                         |
| `coding-safe` | Išlaiko valdymo nurodymus, įrankių schemas ir aktyvią įrankių išvestį savuoju formatu, apsaugo paskutinius 12 dialogo etapų               |
| `passthrough` | Nukreipia netransformuodamas; variklis praleidžiamas                                                                                      |

Profilis yra **viršutinė, o ne apatinė riba**: paketo funkcija `mergeCompressionProfileOptions`
neleidžia kviečiančiojo pakeitimui iš naujo atverti profilio uždaryto nuostolingo kanalo, todėl konkretaus veiksmo
`preserveSystemPrompt: false` negali iš naujo įjungti sistemos glaudinimo naudojant `coding-safe`.

Išmatuota šioje kodų bazėje: `coding-safe` ir `balanced` padidina `minCompressChars` iki
didžiausios vertės ir išlaiko sistemą, įrankių schemas bei įrankių rezultatus savuoju formatu, todėl istorijos
dar nesukaupusi sesija sustoja ties `below_min_chars`, o variklis nieko netransformuoja. Dėl šios
priežasties numatytasis profilis yra `aggressive`, o ne saugiausias profilis.

Paketas nustato savo modelio aprėptį ir profilį pagal aplinkos konfigūraciją.
„OmniRoute“ niekada neperduoda šio sprendimo: adapteris užfiksuoja modelio filtrą ties griežčiausia paketo
aprėptimi, todėl pagrindinės sistemos aplinkos nustatymai gali tik susiaurinti leidžiamų elementų sąrašą, bet niekada
negali jo išplėsti už „OmniRoute“ išmatuotų rezultatų ribų.

## Variklių registras

Registras yra faile `open-sse/services/compression/engines/registry.ts`. Varikliai įgyvendina bendrą
sutartį:

- `id`: nekintantis variklio ID, pvz., `caveman` arba `rtk`
- `apply(text, config)`: senasis vykdymo kelias, naudojamas sudėtinėse konvejerinėse sekose
- `compress(input, config)`: pagrindinis vykdymo kelias, grąžinantis tekstą ir statistiką
- `getConfigSchema()`: grąžina JSON schemą primenančią galiojančios konfigūracijos struktūrą
- `validateConfig(config)`: grąžina `{ valid, errors[] }`

Registracijai naudojama `registerCompressionEngine(engine)` (arba `registerEngine` sudėtingesniais atvejais),
kuri prieš priimdama iškviečia `assertValidEngine()` ir `validateConfig(defaultConfig)`.
Norėdami pašalinti variklį vykdymo metu, naudokite `unregisterCompressionEngine(id)`.

`strategySelector.ts` užregistruoja integruotuosius variklius prieš vykdant glaudinimą. Tai leidžia peržiūrai,
vykdymo meto glaudinimui, sudėtiniam režimui, testams ir būsimiems varikliams naudoti tą patį vykdymo kelią.

### MCP aprašų glaudinimas (susiję)

Atskiras registras glaudina MCP įrankių aprašų metaduomenis registro lygmeniu — žr.
`open-sse/mcp-server/descriptionCompressor.ts` ir [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Jis pakartotinai naudoja
Caveman taisykles, tačiau apdoroja įrankių metaduomenis, o ne užklausų naudingąją apkrovą.

### Papildomi integruotieji varikliai

Be Caveman, RTK ir LLMLingua-2, registre pateikiami keli specializuoti nenuostolingi /
struktūriniai varikliai (naudojami sudėtinėse konvejerinėse sekose, bandomojoje aplinkoje ir testuose):

| Variklis      | ID              | Ką jis daro                                                                                                                                                                                                           |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): didelius vientisus teksto blokus pakeičia turinio adresais pagrįstomis nuorodomis, todėl pasikartojantys / dideli blokai siunčiami vieną kartą, o vėliau į juos pateikiamos nuorodos. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): nenuostolingai lenteliniu būdu suglaudina vienalytes JSON masyvų naudingąsias apkrovas į stulpelinę `[N rows]` formą.                                                                         |
| ionizer       | `ionizer`       | Labai dideliems vienalyčiams blokams atrenka pradžios / vidurio / pabaigos eilučių imtį, o praleistą vidurį išsaugo kaip CCR turinio adresu pagrįstą nuorodą.                                                         |
| session-dedup | `session-dedup` | Turinio adresais pagrįstas pasikartojimų šalinimas tarp dialogo žingsnių (įkvėptas TokenMizer): pašalina tekstą, kuris jau buvo pateiktas ankstesniuose tos pačios sesijos žingsniuose.                               |

**CCR gavimo protokolo instrukcija (#8033):** kai CCR pirmą kartą užklausoje pakeičia ≥1 bloką,
variklis pradžioje prideda vieną idempotentišką `system` pranešimą (prasidedantį
`[CCR protocol]` kontroliniu žymeniu), kuris skambinančiajai šaliai paaiškina žymeklio → įrankio sutartį: ką reiškia
`[CCR retrieve hash=<24hex> chars=N]` žymeklis, kad maiša turi būti nukopijuota pažodžiui
(visi 24 šešioliktainiai simboliai — neteisingai nukopijuotos maišos yra tikėtina „blokas nerastas“
klaidų priežastis) ir kad `[dedup:ref sha=...]` žymeklis reiškia „ieškoti ankstesnėje istorijoje“, o ne „kviesti
įrankį“. Pastaba įterpiama **tik tada, kai skambinančiosios šalies paskelbtas `tools[]` įrodo, kad ji
iš tikrųjų gali pasiekti `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` faile
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — įprasta
su OpenAI suderinama skambinančioji šalis, neturinti šio įrankio, niekada negauna instrukcijos iškviesti to,
ko negali pasiekti. Idempotentiškumas užtikrinamas prieš įterpiant patikrinant, ar pranešimų istorijoje yra kontrolinis žymuo,
todėl kelių dialogo žingsnių užklausose (kurios pakartotinai perduoda ankstesnius pranešimus) ši
pastaba nepridedama iš naujo kiekviename žingsnyje.

## Caveman

Caveman režimas skirtas semantiniam įprasto teksto glaudinimui:

- išsaugo kodo blokus, URL, JSON, kelius ir struktūrinius duomenis
- pašalina perteklinį tekstą, abejojimą išreiškiančias frazes, pasikartojantį kontekstą ir išplėstines jungiamąsias formuluotes
- palaiko kalbai pritaikytus failų taisyklių rinkinius kataloge `open-sse/services/compression/rules/`
- išlieka pasiekiamas per ankstesnius `standard`, `aggressive` ir `ultra` režimus

Valdymo skydelyje ši funkcija pasiekiama per `Dashboard -> Context & Cache -> Caveman`.

Caveman pirminio projekto duomenimis, išvesties žetonų skaičius sumažėja `~75%`, etalonuose vidutiniškai sutaupoma `65%` išvesties, o diapazonas siekia `22-87%`; įvesties glaudinimo priemonė sutaupo `~46%`. Dokumentuodama sudėtines užklausų ir konteksto santaupas, OmniRoute naudoja Caveman įvesties glaudinimo rodiklį; Caveman išvesties režimas išlieka atskira atsakymo elgsenos funkcija.

## RTK

RTK režimas skirtas komandų ir įrankių išvesčiai:

- aptinka tokias išvesties klases kaip `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go testai, TypeScript/Vite/Webpack komponavimas, ESLint, npm auditas / diegimai, Docker žurnalai,
  apvalkalo `find`/`grep`, dėklo pėdsakai ir bendrieji žurnalai
- taiko 49 JSON filtrus iš `open-sse/services/compression/engines/rtk/filters/`
- palaiko RTK stiliaus deklaratyvų konvejerį: ANSI šalinimą, keitimą, trumpojo jungimo veikseną sutapus išvesčiai,
  eilučių šalinimą / išsaugojimą, kiekvienos eilutės trumpinimą, pradžios / pabaigos / maksimalaus eilučių skaičiaus ribojimą ir atsarginę veikseną tuščios išvesties atveju
- palaiko pasitikėjimu apribotus projekto filtrus faile `.rtk/filters.json` ir visuotinius filtrus faile
  `DATA_DIR/rtk/filters.json`
- pašalina ANSI sekas, eigos triukšmą, pasikartojančias eilutes ir nenaudingą standartinį tekstą
- išsaugo taisytinas triktis, įspėjimus, suvestines, pakeistus failus ir kontekstą iš išvesties pabaigos
- pasirinktinai gali išsaugoti nuasmenintą neapdorotą išvestį, kad ją būtų galima atkurti ar derinti naudojant autentifikuotus valdymo maršrutus

Valdymo skydelyje ši funkcija pasiekiama per `Dashboard -> Context & Cache -> RTK`.

Pasirinktinių filtrų, pasitikėjimo, tikrinimo ir neapdorotos išvesties atkūrimo naudojimo informacija pateikta
faile [`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK pirminio projekto duomenimis, komandų išvesties glaudinimas sutaupo `60-90%`. README pavyzdyje parodyta, kaip per 30 minučių Claude Code seansą žetonų skaičius sumažėjo nuo `~118,000` iki `~23,900`, taigi sutaupyta `79.7%`.

## LLMLingua-2 (semantinis retinimas)

LLMLingua-2 režimas atlieka prozos **semantinį žetonų retinimą**, naudodamas nedidelį ONNX žetonų
klasifikatorių, ir papildo taisyklėmis pagrįstus Caveman bei RTK variklius:

- glaudina tik nesisteminių pranešimų tekstą; kodo blokai su aptvarais ir kitos išsaugomos
  konstrukcijos niekada nekeičiamos
- vykdo `@atjsh/llmlingua-2` posistemę (ONNX per `@huggingface/transformers`) darbinėje
  gijoje, todėl modelio išvedimas niekada neblokuoja užklausų įvykių ciklo
- yra **sudedamas** (`stackPriority` 35): sudėtiniame konvejeryje jis vykdomas po
  struktūrinių variklių (CCR, session-dedup, headroom, Caveman), bet prieš `ultra`, nes
  semantinis retinimas veiksmingiausias jau struktūriškai suglaudintam tekstui, pvz.,
  `rtk -> caveman -> llmlingua`
- įvykus **bet kokiai klaidai, netrikdo veikimo** (trūksta pasirinktinių priklausomybių, nepavyksta paleisti darbinio proceso, įkelti modelio, atlikti išvedimo
  arba viršijamas skirtasis laikas) → pradinis tekstas grąžinamas nepakeistas, klaida niekada negrąžinama

Variklio vieta: `open-sse/services/compression/engines/llmlingua/`. Valdymo skydelyje ši funkcija
pasiekiama per `Dashboard -> Context & Cache -> LLMLingua`.

### Modeliai

Numatytasis modelis yra **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
spartus). Didesnio tikslumo **BERT-base** modelį (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) galima pasirinkti variklio konfigūracijos lauke `model`. `@huggingface/transformers`
pirmojo iškvietimo metu atidėtai atsisiunčia pasirinktą modelį iš HuggingFace Hub į
`${DATA_DIR}/models/llmlingua` (`modelStore.ts`); konfigūracijos perrašymo lauku `modelPath`
galima nurodyti vietinę kopiją (dieginiams be interneto ryšio / izoliuotuose tinkluose).

### Pasirinktinės priklausomybės ir diegimas pagal poreikį

Pašalinamas LLMLingua vykdymo aplinkos lygiaverčių priklausomybių rinkinys yra **pasirinktinis**. Du paketai faile
`package.json` deklaruoti kaip `optionalDependencies`, o produkciniame komponavime paliekami **išoriniai**
(`scripts/build/prepublish.ts` jų neįtraukia):

| Paketas              | Versija (fiksuota) | Pastabos                                                         |
| -------------------- | ------------------ | ---------------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Įėjimo paketas; kitus deklaruoja kaip lygiavertes priklausomybes |
| `js-tiktoken`        | `^1.0.20`          | Žetonų skaidytuvas                                               |

`@huggingface/transformers` versija fiksuota kaip `^4.2.0` (ji bendrinama su vietinių vektorinių reprezentacijų keliu ir
taip pat įtraukiama į autonominio paketo priklausomybių sekimą); `@atjsh/llmlingua-2@2.0.5` kaip lygiavertės priklausomybės reikalauja
`"^3.5.2 || ^4.0.0"`, todėl palaikomos ir Transformers.js v3, ir v4. Nuo 2.0.4 versijos
`@atjsh/llmlingua-2` nebereikalauja `@tensorflow/tfjs`, todėl iš SLM rinkinio pašalintas didžiausias pavienis
komponentas (TensorFlow.js). Pašalinamos SLM lygiavertės priklausomybės yra tik du pirmiau nurodyti paketai.
Įprasta komanda `npm install` (kūrimo aplinkoje) pasirinktinį rinkinį įdiegia automatiškai, nebent pasirinktinių
priklausomybių diegimas praleidžiamas.

**Kodėl diegiama pagal poreikį:** npm paskelbtas paketas, autonominis paketas ir Docker atvaizdis
pateikiami **be** šių priklausomybių, kad išliktų nedideli. Kai jų nėra, darbinio proceso priklausomybių
patikra (`@atjsh/llmlingua-2` aptikimo bandymas faile `worker.ts`) nepavyksta, o variklis
**tyliai netrikdo veikimo** — pasirinkus LLMLingua neatliekamas joks veiksmas (tekstas grąžinamas nepakeistas,
klaida neregistruojama). Norėdami jį aktyvinti apkarpytoje aplinkoje, įdiekite pasirinktinį rinkinį:

```bash
# fiksuokite package.json optionalDependencies deklaruotas versijas
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Pašalinus `@tensorflow/tfjs` (2.0.4+) nebeliko anksčiau dominavusio ~800 MB
komponento — likusią apimtį sudaro transformers.js ir onnxruntime-node vykdymo aplinkos
bei pirmą kartą naudojant atsisiunčiamas TinyBERT modelis (~57 MB) (ne per npm).

Pagal aplinką:

- **Kūrimo aplinka / `npm install`** — įdiegiama automatiškai, nebent nurodėte `--omit=optional`
  (arba `--no-optional`). Jokių veiksmų nereikia.
- **Globalus npm (`npm i -g omniroute`) / autonominis diegimas** — paleiskite pirmiau pateiktą diegimo komandą
  įdiegto paketo kataloge arba įdiekite iš naujo, nepraleisdami pasirenkamųjų priklausomybių.
- **Docker** — įtraukite diegimo komandą į išvestinio atvaizdo sluoksnį; publikuojamas atvaizdas
  specialiai pateikiamas sumažintas.
- **VPS (PM2)** — įdiekite į programos `node_modules`, tada paleiskite procesą iš naujo, kad
  darbinis procesas pakartotinai patikrintų užkardą.
- **Neapdorotas Next autonominis paketas (`npm run build` → `.build/next/standalone/server.js`)** — į
  autonominio paketo sekimo rezultatą NEĮTRAUKIAMAS nei darbinis procesas, nei pasirenkamosios priklausomybės, todėl variklis tyliai
  persijungia į atvirą režimą. `scripts/build/colocate-standalone.mjs` iš naujo pritaiko abu elementus (darbinio proceso esbuild +
  pasirenkamųjų priklausomybių uždarinį autonominio paketo medyje); po kiekvieno komponavimo jis automatiškai paleidžiamas naudojant
  npm `postbuild` kablį. Idempotentiškas; jei priklausomybių nėra, klaidos apdorojamos netrikdant veikimo.

**Patikrinkite, ar tai aktyvuota:** pasirinkus LLMLingua, tikras prozos tekstas iš tiesų sutrumpėja (variklis
nustoja persijungti į atvirą režimą), o pirmoji užklausa inicijuoja modelio atsisiuntimą į
`${DATA_DIR}/models/llmlingua`. Užkarda sąmoningai tikrina tik `@atjsh/llmlingua-2` —
kiti lygiaverčiai paketai palaiko tik ESM, todėl `require.resolve` jiems pateikia klaidą net tada, kai jie įdiegti, — taigi
darbinis procesas vis tiek persijungia į atvirą režimą, jei vykdant `import()` iš tiesų trūksta kurio nors lygiaverčio paketo.

## Sudėtinės grandinės

Sudėtiniu režimu grandinės veiksmai vykdomi iš eilės. Numatytoji seka:

```txt
rtk -> caveman
```

Naudokite ją programavimo agento seansams, kuriuose užklausa sujungia komandų išvestį su žmogaus ar asistento tekstu. RTK pirmiausia sumažina perteklinius įrankių žurnalus, tada Caveman suglaudina likusią natūralią kalbą.

Grandinės veiksmai konfigūruojami naudojant `stackedPipeline` glaudinimo nuostatose arba per glaudinimo derinius.

Kai abu moduliai sumažina tą patį tinkamą turinį, sutaupymas sumuojasi:

```txt
combined = 1 - (1 - RTK sutaupymas) * (1 - Caveman įvesties sutaupymas)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP prieinamumo medžio filtras

MCP prieinamumo medžio išmanusis filtras yra po vykdymo veikiantis glaudinimo sluoksnis, taikomas MCP **įrankių rezultatams**, o ne užklausoms ar kontekstui. Jis skirtas išsamiam prieinamumo medžių ir naršyklės momentinių kopijų turiniui, kurį grąžina tokie įrankiai kaip Playwright, kompiuterio valdymo ir naršyklės automatizavimo MCP serveriai.

### Ką jis atlieka

1. **Triukšmo šalinimas** — pašalina tuščius bendruosius ar tekstinius įrašus (`- generic:`, `- text: ""`)
2. **Gretimų elementų sutraukimas** — kai ≥ `collapseThreshold` (numatytoji reikšmė 30) iš eilės einančių eilučių yra struktūriniai pasikartojimai, jos sutraukiamos paliekant pirmąsias `collapseKeepHead` (numatytoji reikšmė 10) eilučių + kiekio suvestinę + paskutines `collapseKeepTail` (numatytoji reikšmė 5) eilutes
3. **Nuorodų išsaugojimas** — Playwright ir kompiuterio valdymui būtini `[ref=eXX]` inkarai niekada nekeičiami
4. **Griežtas sutrumpinimas** — jei po sutraukimo tekstas vis dar viršija `maxTextChars` (numatytoji reikšmė 50 000), jis sutrumpinamas pridedant naršymo užuominą, kad agentas galėtų tęsti darbą

### Modulio vieta

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() pradžios taškas
  collapseRepeated.ts ← gretimų elementų sutraukimo algoritmas
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigūracija

Valdoma naudojant `compression.mcpAccessibility` visuotinėse nuostatose (migracija 056). Numatytoji konfigūracija:

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

Filtras taikomas tik tiems įrankių rezultatų duomenims, kurių `type` yra `"text"` ir kurių ilgis viršija `minLengthToProcess`. Jis neturi įtakos užklausų glaudinimui ar užklausų duomenims.

### Tikėtinas sutaupymas

Naršyklės momentinių kopijų įrankių rezultatų apimtis sumažėja 60–80 %, priklausomai nuo puslapio sudėtingumo. Sutraukimo algoritmo sudėtingumas pagal eilučių skaičių yra O(n), todėl jis beveik nepadidina delsos.

### Šio filtro ir pirmiau aprašytų glaudinimo modulių palyginimas

| Aspektas        | Caveman / RTK / Stacked    | MCP prieinamumo filtras                |
| --------------- | -------------------------- | -------------------------------------- |
| Tikslas         | Užklausos / kontekstas     | MCP įrankių rezultatai                 |
| Suaktyvinimas   | Glaudinimo režimo nuostata | `compression.mcpAccessibility.enabled` |
| Taikymo sritis  | Visi SSE pranešimai        | Tik įrankių rezultatai                 |
| Nuorodų inkarai | Netaikoma                  | Visada išsaugomi                       |

---

## Glaudinimo deriniai

Glaudinimo deriniai – tai pavadinti glaudinimo profiliai, kuriuos galima priskirti maršruto parinkimo deriniams:

- `compression_combos`: saugo režimą, konvejerį, RTK konfigūraciją, kalbos konfigūraciją ir numatytojo pasirinkimo žymą
- `compression_combo_assignments`: susieja glaudinimo derinį su maršruto parinkimo deriniu
- vykdymo aplinkos integracija pirmiausia nustato priskirtą glaudinimo derinį, o tik tada taiko bendrąsias derinių perrašas
- analizėje pateikiami `compression_combo_id` ir `engine`

Valdymo skydelio vieta: `Dashboard -> Context & Cache -> Compression Combos`.

## API sąsaja

| Maršrutas                              | Paskirtis                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `/api/settings/compression`            | Visuotiniai glaudinimo nustatymai (įskaitant `mcpAccessibility` konfigūraciją) |
| `/api/compression/preview`             | Bet kurio glaudinimo režimo peržiūra                                           |
| `/api/compression/language-packs`      | Galimų Caveman kalbos paketų sąrašas                                           |
| `/api/context/caveman/config`          | Caveman nustatymų alternatyvusis vardas                                        |
| `/api/context/rtk/config`              | RTK numatytosios reikšmės ir nustatymai                                        |
| `/api/context/rtk/filters`             | RTK filtrų katalogas                                                           |
| `/api/context/rtk/test`                | RTK peržiūros / testavimo galinis taškas                                       |
| `/api/context/rtk/raw-output/[id]`     | Autentifikuotas užmaskuotos neapdorotos išvesties atkūrimas                    |
| `/api/context/combos`                  | Glaudinimo derinių CRUD                                                        |
| `/api/context/combos/[id]/assignments` | Priskyrimų maršruto parinkimo deriniams CRUD                                   |
| `/api/context/analytics`               | Alternatyvusis glaudinimo analizės vardas                                      |

Valdymo maršrutams reikalingas valdymo autentifikavimas arba API rakto politikos patikros.

## MCP įrankiai

Glaudinimo funkcija pateikia penkis MCP įrankius:

| Įrankis                             | Aprėptis            | Paskirtis                                   |
| ----------------------------------- | ------------------- | ------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nustatymai, analizė ir podėlio statistika   |
| `omniroute_compression_configure`   | `write:compression` | Visuotinių nustatymų atnaujinimas           |
| `omniroute_set_compression_engine`  | `write:compression` | Režimo ir pasirenkamo konvejerio nustatymas |
| `omniroute_list_compression_combos` | `read:compression`  | Glaudinimo derinių sąrašas                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Derinių / variklių analizės nuskaitymas     |

## Aprėptis ir išimtys

**Įterpiniai niekada neglaudinami.** `open-sse/handlers/embeddings.ts` niekada nekviečia jokio
glaudinimo variklio – užklausos / atsakymo turiniai perduodami vykdytojui nepakeisti.
Šiuo metu tai užtikrinama struktūriškai (įterpinius ir pokalbių užbaigimus apdoroja atskiros
tvarkyklės), o ne vykdymo aplinkos patikra, tačiau tai reiškia, kad #8034 nurodyta vektorių
iškraipymo problema neturi jokio poveikio paviršiaus įterpinių kelyje.

**Atskiram modeliui / galiniam taškui taikomas išimčių filtras (#8034).** Pokalbių užbaigimų
atveju operatorius gali nurodyti modelių ID / `provider/model` paskirties vietas, kurios
niekada neturi būti glaudinamos – ši apsaugos priemonė naudinga, jei ateityje glaudinimas
būtų prijungtas arčiau su įterpiniais susijusio kelio, ir apskritai naudinga bet kuriam
modeliui, kuriam svarbi tiksli, baitas po baito nekintanti užklausa (deterministiniai
vertinimai, podėliui jautrūs prefiksai ir t. t.).

- Nustatymų laukas: `exclusions?: string[]` visuotinėje glaudinimo konfigūracijoje
  (`GET`/`PUT /api/settings/compression`), išsaugomas naudojant esamą `key_value` glaudinimo
  vardų sritį (`src/lib/db/compression.ts`) – naujos lentelės nereikia.
- Valdymo skydelio kortelė: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Šablonų sintaksė: `*` yra vienintelis pakaitos simbolis. Visi kiti reguliariųjų išraiškų
  metasimboliai šablone prieš atitikties tikrinimą yra apsaugomi, todėl `gpt-5.6` atitinka
  tik pažodinę eilutę, o ne `gpt-5x6` (atsparu ReDoS, apribota, nėra įdėtųjų kvantifikatorių).
  Šablonų atitiktis, neatsižvelgiant į raidžių registrą, tikrinama ir pagal vien modelio ID,
  ir pagal sudėtinę `provider/model` reikšmę – `gpt-5-6`, `openai/gpt-5-6` ir `openai/*`
  veikia, o vien `*` pašalina iš glaudinimo visus modelius.
- Atitikties nustatymas: `isCompressionExcluded()` / `normalizeCompressionExclusions()`
  faile `open-sse/services/compression/exclusions.ts`. `chatCore.ts` patikrina, ar paskirties
  vieta neįtraukta į išimtis, iškart po glaudinimo nustatymų nustatymo, **dar prieš paleidžiant
  bet kurį variklį**, ir atitiktį traktuoja lygiai taip pat, kaip visuotinai išjungtą
  glaudinimą – įrodyta, kad užklausos turinys išlieka identiškas baitų lygmeniu. Praleidimas
  užregistruojamas naudojant `writeCompressionSkip(..., "excluded")`, kad būtų matomas
  analizėje.
- Numatytoji reikšmė (tuščias sąrašas arba jo nėra): veikimas identiškas buvusiam iki #8034 –
  niekas neįtraukiama į išimtis.

## Žinomi apribojimai

- **LLMLingua-2 (SLM) reikia kartu įdiegtų pasirenkamųjų priklausomybių.** Vykdymo procesas produkcinėje versijoje veikia tik tada, kai `@atjsh/llmlingua-2` ir susijusios priklausomybės yra kartu įdiegtos į `dist/node_modules` (žr. `scripts/build/colocateOptionals.mjs`, #4286). Be jų variklis saugiai grąžina pradinį tekstą. Vykdymo proceso nustatymas nebepriklauso nuo `import.meta.url` (atskirame pakete jis neveikia) — kaip atskaitos tašką jis naudoja vykdymo aplinkos cwd / `argv[1]`.
- **Caveman kalbų paketai `de` / `fr` / `ja` yra daliniai.** Juose pateikiamos `context` + `filler` + `structural` taisyklės, tačiau nėra `dedup` / `ultra` paketų, todėl toms kalboms `ultra` intensyvumas nėra stipresnis už `full` (naudojamos tik jų pačių taisyklės — nėra nebylaus atsarginio perėjimo prie angliškų `dedup`/`ultra` taisyklių, kurios sugadintų tekstą užsienio kalba). `en` / `es` / `id` / `pt-BR` paketai yra išsamūs. Laukiami `dedup.json` + `ultra.json` papildymai daliniams paketams.
- **Sudėtinės telemetrijos duomenyse pateikiami tik glaudinimą atlikę varikliai.** Sudėtinio konvejerio veiksmas, kurio variklis buvo paleistas, bet nesutaupė vietos (0 %), grąžina `stats:null`, todėl nėra rodomas `engineBreakdown` — jo neįmanoma atskirti nuo praleisto veiksmo. Norint atskirti „paleista, 0 %“ nuo „praleista“, reikėtų pakeisti išskaidymo modelį, todėl tai atidedama.

## Tikrinimas

Tikslinės šios srities patikros yra:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
