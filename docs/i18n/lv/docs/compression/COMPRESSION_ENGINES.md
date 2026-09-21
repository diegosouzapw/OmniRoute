# Compression Engines (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute saspiešanas pamatā ir dziņu līgumi. Režīms var tieši darbināt vienu dzini
(`caveman` vai `rtk`) vai deterministisku saliktu konveijeru, kas secīgi izpilda vairākus dziņus.

## Režīmi

| Režīms       | Dziņa ceļš                                   | Paredzētā ievade                                    |
| ------------ | -------------------------------------------- | --------------------------------------------------- |
| `off`        | nav                                          | Precīza uzvednes saglabāšana                        |
| `lite`       | Caveman vieglie palīgrīki                    | Zema riska, vienmēr aktīva tīrīšana                 |
| `standard`   | Caveman                                      | Dabiskās valodas uzvedņu saīsināšana                |
| `aggressive` | Caveman + vēstures/rīku apkopotāji           | Ilgas tērzēšanas sesijas                            |
| `ultra`      | Caveman + apgriešanas palīgrīki              | Atkopšana pēc konteksta ierobežojuma sasniegšanas   |
| `rtk`        | RTK                                          | Termināļa, čaulas, būvēšanas, testu un git izvade   |
| `omniglyph`  | OmniGlyph                                    | Konteksts kā attēls pakalpojumu sniedzēja protokolā |
| `stacked`    | Konveijers, pēc noklusējuma `rtk -> caveman` | Jaukti rīku žurnāli un proza, maksimāls ietaupījums |

### OmniGlyph saspiešanas profili

`omniglyph` dzinis (pakotne `omniglyph`, 1.4.0+) pieņem nosauktu semantisko profilu, kas tiek iestatīts
globāli, izmantojot `omniglyph.profile` saspiešanas iestatījumos, vai katram solim atsevišķi, izmantojot
saliktā konveijera soļa konfigurāciju:

| Profils       | Robeža                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Noklusējums. Publicētajos mērījumos izmantotā politika — sistēma, rīku dokumentācija un blīva vēsture tiek pārveidota attēlos |
| `balanced`    | Saglabā aktīvo stāvokli sākotnējā formā, aizsargā pēdējos 8 dialoga gājienus un sakļauj senāku pabeigto vēsturi               |
| `coding-safe` | Saglabā pilnvarojumu, rīku shēmas un aktīvo rīku izvadi sākotnējā formā, aizsargā pēdējos 12 dialoga gājienus                 |
| `passthrough` | Maršrutē bez pārveidošanas; dzinis tiek izlaists                                                                              |

Profils ir **augšējā, nevis apakšējā robeža**: pakotnes `mergeCompressionProfileOptions`
neļauj izsaucēja pārrakstījumam no jauna atvērt zudumradošu kanālu, kuru profils ir aizvēris, tāpēc
vienam solim norādīts `preserveSystemPrompt: false` nevar atkārtoti iespējot sistēmas saspiešanu profilā `coding-safe`.

Šajā kodu bāzē veiktie mērījumi rāda: `coding-safe` un `balanced` palielina `minCompressChars` līdz tā
maksimālajai vērtībai un saglabā sistēmu, rīku shēmas un rīku rezultātus sākotnējā formā, tāpēc sesija, kurā
vēl nav uzkrāta vēsture, apstājas pie `below_min_chars`, un dzinis neko nepārveido. Tāpēc noklusējuma profils
ir `aggressive`, nevis visdrošākais profils.

Pakotne nosaka sava modeļa tvērumu un profilu no savas vides konfigurācijas.
OmniRoute nekad nedeleģē šo lēmumu: adapteris fiksē modeļa ierobežojumu atbilstoši pakotnes
visstingrākajam tvērumam, tāpēc resursdatora vides iestatījumi var tikai sašaurināt atļauto sarakstu, bet
nekad to nepaplašināt ārpus OmniRoute mērījumos apstiprinātā tvēruma.

## Dzinēju reģistrs

Reģistrs atrodas failā `open-sse/services/compression/engines/registry.ts`. Dzinēji nodrošina kopīgu
saskarni:

- `id`: stabils dzinēja identifikators, piemēram, `caveman` vai `rtk`
- `apply(text, config)`: mantotais izpildes ceļš, ko izmanto secīgajos konveijeros
- `compress(input, config)`: primārais izpildes ceļš, kas atgriež tekstu un statistiku
- `getConfigSchema()`: atgriež derīgas konfigurācijas JSON Schema līdzīgo struktūru
- `validateConfig(config)`: atgriež `{ valid, errors[] }`

Reģistrācijai izmanto `registerCompressionEngine(engine)` (vai `registerEngine` sarežģītākiem gadījumiem),
kas pirms pieņemšanas izsauc `assertValidEngine()` un `validateConfig(defaultConfig)`.
Izmantojiet `unregisterCompressionEngine(id)`, lai izpildlaikā noņemtu dzinēju.

`strategySelector.ts` reģistrē iebūvētos dzinējus pirms saspiešanas izpildes. Tas ļauj priekšskatījumam,
izpildlaika saspiešanai, secīgajam režīmam, testiem un turpmākiem dzinējiem izmantot vienu un to pašu izpildes ceļu.

### MCP aprakstu saspiešana (saistīta tēma)

Atsevišķs reģistrs saspiež MCP rīku aprakstu metadatus reģistra līmenī — skatiet
`open-sse/mcp-server/descriptionCompressor.ts` un [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Tas atkārtoti izmanto
Caveman kārtulas, bet darbojas ar rīku metadatiem, nevis pieprasījumu lietderīgajiem datiem.

### Papildu iebūvētie dzinēji

Papildus Caveman, RTK un LLMLingua-2 reģistrā ir iekļauti vairāki specializēti bezzudumu /
strukturālie dzinēji (tos izmanto secīgie konveijeri, izmēģinājumu vide un testi):

| Dzinējs       | Id              | Ko tas dara                                                                                                                                                                                    |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): aizstāj lielus vienlaidus teksta blokus ar uz saturu balstītām atsaucēm, lai atkārtoti/lieli bloki tiktu nosūtīti vienreiz un pēc tam uz tiem tikai atsauktos. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): viendabīgu JSON masīvu lietderīgo datu bezzudumu tabulāra sablīvēšana kolonnveida `[N rows]` formā.                                                                    |
| ionizer       | `ionizer`       | Sākuma/vidus/beigu rindu atlase ļoti lieliem viendabīgiem blokiem, saglabājot izlaisto vidusdaļu kā CCR uz saturu balstītu atsauci.                                                            |
| session-dedup | `session-dedup` | Uz saturu balstīta starppiegājienu dublēšanās novēršana (iedvesmojoties no TokenMizer): izlaiž tekstu, kas jau redzēts tās pašas sesijas iepriekšējos piegājienos.                             |

**CCR izgūšanas protokola instrukcija (#8033):** pirmajā reizē, kad CCR pieprasījumā aizstāj ≥1 bloku,
dzinējs sākumā pievieno vienu idempotentu `system` ziņojumu (kas sākas ar
`[CCR protocol]` sargvērtību), izskaidrojot izsaucējam marķiera → rīka līgumu: ko nozīmē
`[CCR retrieve hash=<24hex> chars=N]` marķieris, ka jaucējvērtība jānokopē burtiski
(visas 24 heksadecimālās rakstzīmes — nepareizi nokopētas jaucējvērtības, visticamāk, izraisa
kļūdas "bloks nav atrasts"), un ka `[dedup:ref sha=...]` marķieris nozīmē "meklēt iepriekš vēsturē", nevis "izsaukt
rīku". Piezīme tiek ievietota **tikai tad, ja izsaucēja deklarētais `tools[]` apliecina, ka tas
patiešām var piekļūt `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` failā
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — parasts
ar OpenAI saderīgs izsaucējs bez šī rīka nekad nesaņem instrukciju izsaukt kaut ko,
kam tas nevar piekļūt. Idempotenci nodrošina, pirms ievietošanas pārmeklējot ziņojumu vēsturi un meklējot sargvērtību,
tādēļ vairāku piegājienu pieprasījumi (kas atkārtoti atskaņo iepriekšējos ziņojumus) nepievieno
šo piezīmi vēlreiz katrā piegājienā.

## Caveman

Caveman režīms koncentrējas uz parasta teksta semantisku kondensēšanu:

- saglabā koda blokus, URL, JSON, ceļus un strukturētus datus
- noņem liekvārdību, izvairīgus formulējumus, atkārtotu kontekstu un pārlieku izvērstas saikļfrāzes
- atbalsta valodai pielāgotas failu kārtulu pakotnes mapē `open-sse/services/compression/rules/`
- joprojām ir pieejams, izmantojot mantotos `standard`, `aggressive` un `ultra` režīmus

Informācijas paneļa sadaļa ir `Dashboard -> Context & Cache -> Caveman`.

Caveman pirmavots ziņo par `~75%` mazāku izvades tokenu skaitu un vidēji `65%` izvades ietaupījumu etalonpārbaudēs
ar `22-87%` diapazonu, kā arī par `~46%` ievades saspiešanas rīku. OmniRoute izmanto Caveman ievades puses
rādītāju, dokumentējot kombinētos uzvednes/konteksta ietaupījumus; Caveman izvades režīms joprojām ir atsevišķs
atbildes darbības līdzeklis.

## RTK

RTK režīms koncentrējas uz komandu un rīku izvadi:

- nosaka tādas izvades klases kā `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go testi, TypeScript/Vite/Webpack būvējumi, ESLint, npm auditi/instalācijas, Docker žurnāli,
  čaulas `find`/`grep`, steka trasējumi un vispārīgi žurnāli
- lieto 49 JSON filtrus no `open-sse/services/compression/engines/rtk/filters/`
- atbalsta RTK stila deklaratīvo konveijeru: ANSI noņemšanu, aizstāšanu, match-output īssavienojumu,
  rindu noņemšanu/saglabāšanu, katras rindas saīsināšanu, sākuma/beigu/maksimālā rindu skaita ierobežošanu un rezerves darbību tukša rezultāta gadījumā
- atbalsta projektam paredzētus filtrus ar uzticamības pārbaudi failā `.rtk/filters.json` un globālos filtrus failā
  `DATA_DIR/rtk/filters.json`
- noņem ANSI sekvences, progresa troksni, atkārtotas rindas un nederīgu standarttekstu
- saglabā kļūmes, ar kurām iespējams rīkoties, brīdinājumus, kopsavilkumus, mainītos failus un beigu kontekstu
- var pēc izvēles saglabāt rediģētu neapstrādāto izvadi atkopšanai/atkļūdošanai, izmantojot autentificētus pārvaldības
  maršrutus

Informācijas paneļa sadaļa ir `Dashboard -> Context & Cache -> RTK`.

Ekspluatācijas informācija par pielāgotiem filtriem, uzticamību, pārbaudi un neapstrādātās izvades atkopšanu ir pieejama
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK pirmavots ziņo par `60-90%` ietaupījumu komandu izvades saspiešanā. Tā README piemērā 30 minūšu
Claude Code sesija tiek samazināta no `~118,000` tokeniem līdz `~23,900`, ietaupot `79.7%`.

## LLMLingua-2 (semantiskā retināšana)

LLMLingua-2 režīms veic **semantisku tokenu retināšanu** tekstā, izmantojot nelielu ONNX tokenu
klasifikatoru, papildinot uz kārtulām balstītos Caveman un RTK dzinējus:

- saspiež tekstu tikai ziņojumos, kas nav sistēmas ziņojumi; norobežoti koda bloki un citas saglabājamas
  konstrukcijas nekad netiek mainītas
- palaiž `@atjsh/llmlingua-2` aizmugursistēmu (ONNX, izmantojot `@huggingface/transformers`)
  darbinātāja pavedienā, tādēļ modeļa secināšana nekad nebloķē pieprasījumu notikumu cilpu
- ir **kombinējams** (`stackPriority` 35): kombinētā konveijerā tas tiek izpildīts pēc
  strukturālajiem dzinējiem (CCR, session-dedup, headroom, Caveman), bet pirms `ultra`, jo
  semantiskā retināšana ir visefektīvākā jau strukturāli saspiestam tekstam, piemēram,
  `rtk -> caveman -> llmlingua`
- **jebkuras kļūdas gadījumā turpina darbu bez saspiešanas** (trūkstošas izvēles atkarības, darbinātāja izveide, modeļa ielāde, secināšana
  vai taimauts) → sākotnējais teksts tiek atgriezts nemainīts, nekad netiek atgriezta kļūda

Dzinēja atrašanās vieta: `open-sse/services/compression/engines/llmlingua/`. Informācijas paneļa sadaļa
ir `Dashboard -> Context & Cache -> LLMLingua`.

### Modeļi

Noklusējuma modelis ir **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
ātrs). Augstākas precizitātes **BERT-base** modelis (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) ir pieejams, izmantojot dzinēja konfigurācijas lauku `model`. `@huggingface/transformers`
pirmajā izsaukumā laiski lejupielādē atlasīto modeli no HuggingFace Hub mapē
`${DATA_DIR}/models/llmlingua` (`modelStore.ts`); konfigurācijas pārrakstīšana ar `modelPath`
tā vietā norāda uz lokālu kopiju (bezsaistes / no tīkla izolētām instalācijām).

### Izvēles atkarības un instalēšana pēc pieprasījuma

Atmetamais LLMLingua izpildlaika vienādranga atkarību steks ir **neobligāts**. Divas pakotnes failā
`package.json` ir deklarētas kā `optionalDependencies`, un produkcijas būvējumā tās tiek paturētas kā **ārējas**
(`scripts/build/prepublish.ts` tās neiekļauj komplektā):

| Pakotne              | Versija (fiksēta) | Piezīmes                                                 |
| -------------------- | ----------------- | -------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`           | Ieejas pakotne; pārējās deklarē kā vienādranga atkarības |
| `js-tiktoken`        | `^1.0.20`         | Tokenizētājs                                             |

`@huggingface/transformers` ir fiksēta versija `^4.2.0` (koplietota ar lokālo iegulumu ceļu un
iekļauta arī savrupajā komplektā); `@atjsh/llmlingua-2@2.0.5` izmanto to kā vienādranga atkarību ar
`"^3.5.2 || ^4.0.0"`, tādēļ tiek atbalstītas gan Transformers.js v3, gan v4. Kopš 2.0.4
`@atjsh/llmlingua-2` vairs nav nepieciešams `@tensorflow/tfjs`, tādējādi no SLM steka tika noņemts lielākais
atsevišķais komponents (TensorFlow.js). Tikai abas iepriekš minētās pakotnes ir atmetamas SLM
vienādranga atkarības. Standarta `npm install` (izstrādes vidē) automātiski instalē izvēles steku, ja vien izvēles
atkarības netiek izlaistas.

**Kāpēc pēc pieprasījuma:** npm publicētā pakotne, savrupais komplekts un Docker attēls
tiek piegādāti **bez** šīm atkarībām, lai saglabātu mazu apjomu. Ja to nav, darbinātāja atkarību
pārbaude (`@atjsh/llmlingua-2` atrisināšanas zonde failā `worker.ts`) neizdodas, un dzinējs
**klusi turpina darbu bez saspiešanas** — LLMLingua atlasīšana neko nedara (teksts tiek atgriezts nemainīts, un
kļūda netiek reģistrēta). Lai to aktivizētu retinātā vidē, instalējiet izvēles steku:

```bash
# fiksējiet package.json optionalDependencies deklarētās versijas
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` noņemšana (2.0.4+) likvidē iepriekš dominējošo ~800 MB
komponentu — atlikušo apjomu veido transformers.js + onnxruntime-node izpildlaiki,
kā arī TinyBERT modelis (~57 MB), kas tiek lejupielādēts pirmajā lietošanas reizē (nevis ar npm).

Katrai videi:

- **Izstrāde / `npm install`** — tiek instalēts automātiski, ja vien nenorādījāt `--omit=optional`
  (vai `--no-optional`). Nekādas darbības nav nepieciešamas.
- **Globālais npm (`npm i -g omniroute`) / savrupa instalācija** — izpildiet iepriekš norādīto instalēšanas komandu
  instalētās pakotnes direktorijā vai instalējiet atkārtoti, neizlaižot izvēles atkarības.
- **Docker** — pievienojiet instalēšanas komandu atvasinātā attēla slānī; publicētais attēls
  pēc konstrukcijas ir minimāls.
- **VPS (PM2)** — instalējiet lietotnes `node_modules`, pēc tam restartējiet procesu, lai
  darbplūsma atkārtoti pārbaudītu vārteju.
- **Neapstrādāts savrupais Next (`npm run build` → `.build/next/standalone/server.js`)** — savrupajā
  trasē NAV iekļauta ne darbplūsma, ne izvēles atkarības, tāpēc dzinis nemanāmi pāriet atvērtā režīmā kļūmes gadījumā.
  `scripts/build/colocate-standalone.mjs` atkārtoti pievieno abus (darbplūsmas esbuild +
  izvēles atkarību noslēgumu savrupajā kokā); pēc katras būvēšanas tas tiek automātiski palaists,
  izmantojot npm `postbuild` āķi. Idempotents; ja atkarību nav, kļūme neaptur darbību.

**Pārbaudiet, vai tas ir aktīvs:** ja ir atlasīts LLMLingua, reāls prozas teksts patiešām tiek saīsināts (dzinis
vairs nepāriet atvērtā režīmā kļūmes gadījumā), un pirmais pieprasījums izraisa modeļa lejupielādi uz
`${DATA_DIR}/models/llmlingua`. Vārteja apzināti pārbauda tikai `@atjsh/llmlingua-2` —
pārējās līdzvērtīgās atkarības ir paredzētas tikai ESM, un `require.resolve` tām izraisa kļūdu pat tad, ja tās ir instalētas, —
tāpēc darbplūsma joprojām pāriet atvērtā režīmā kļūmes gadījumā, ja `import()` izpildes laikā patiešām trūkst kādas līdzvērtīgās atkarības.

## Secīgi konveijeri

Secīgajā režīmā konveijera darbības tiek izpildītas noteiktā secībā. Noklusējuma secība ir:

```txt
rtk -> caveman
```

Izmantojiet to kodēšanas aģenta sesijām, kurās uzvedne apvieno komandu izvadi ar cilvēka vai asistenta tekstu. RTK vispirms samazina trokšņainos rīku žurnālus, pēc tam Caveman saspiež atlikušo dabisko valodu.

Konveijera darbības tiek konfigurētas, izmantojot `stackedPipeline` saspiešanas iestatījumos vai saspiešanas kombinācijas.

Ja abi dzinēji samazina vienu un to pašu atbilstošo lietderīgo slodzi, ietaupījums summējas:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP pieejamības koka filtrs

MCP pieejamības koka viedais filtrs ir pēcizpildes saspiešanas slānis, kas darbojas ar MCP **rīku rezultātiem**, nevis uzvednēm vai kontekstu. Tas ir paredzēts apjomīgajām pieejamības koka un pārlūkprogrammas momentuzņēmumu lietderīgajām slodzēm, ko atgriež tādi rīki kā Playwright, computer-use un pārlūkprogrammu automatizācijas MCP serveri.

### Ko tas dara

1. **Trokšņa noņemšana** — noņem tukšus vispārīgus/teksta ierakstus (`- generic:`, `- text: ""`)
2. **Blakuselementu sakļaušana** — ja ≥ `collapseThreshold` (pēc noklusējuma 30) secīgas rindas ir strukturāli atkārtojumi, tās tiek sakļautas līdz pirmajām `collapseKeepHead` (pēc noklusējuma 10) rindām + skaita kopsavilkumam + pēdējām `collapseKeepTail` (pēc noklusējuma 5) rindām
3. **Atsauču saglabāšana** — Playwright/computer-use nepieciešamie `[ref=eXX]` enkuri nekad netiek mainīti
4. **Stingra apcirpšana** — ja teksts pēc sakļaušanas joprojām pārsniedz `maxTextChars` (pēc noklusējuma 50,000), tas tiek apcirpts, pievienojot navigācijas norādi, lai aģents varētu turpināt darbu

### Dzinēja atrašanās vieta

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() ieejas punkts
  collapseRepeated.ts ← blakuselementu sakļaušanas algoritms
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurācija

To kontrolē `compression.mcpAccessibility` globālajos iestatījumos (migrācija 056). Noklusējuma konfigurācija:

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

Filtrs tiek lietots tikai tām rīka rezultāta lietderīgajām slodzēm, kuru `type` ir `"text"` un kuru garums pārsniedz `minLengthToProcess`. Tas neietekmē uzvedņu saspiešanu vai pieprasījumu lietderīgās slodzes.

### Paredzamais ietaupījums

60–80% pārlūkprogrammas momentuzņēmumu rīku rezultātiem atkarībā no lapas sarežģītības. Sakļaušanas algoritma sarežģītība pēc rindu skaita ir O(n), un tas rada nenozīmīgu aizkavi.

### Šis filtrs salīdzinājumā ar iepriekš minētajiem saspiešanas dzinējiem

| Aspekts        | Caveman / RTK / Secīgi            | MCP pieejamības filtrs                 |
| -------------- | --------------------------------- | -------------------------------------- |
| Mērķis         | Pieprasījumu uzvednes / konteksts | MCP rīku rezultāti                     |
| Aktivizētājs   | Saspiešanas režīma iestatījums    | `compression.mcpAccessibility.enabled` |
| Tvērums        | Visi SSE ziņojumi                 | Tikai rīku rezultāti                   |
| Atsauču enkuri | Nav piemērojams                   | Saglabāti bez nosacījumiem             |

---

## Saspiešanas kombinācijas

Saspiešanas kombinācijas ir nosaukti saspiešanas profili, kurus var piešķirt maršrutēšanas kombinācijām:

- `compression_combos`: glabā režīmu, konveijeru, RTK konfigurāciju, valodas konfigurāciju un noklusējuma marķieri
- `compression_combo_assignments`: sasaista saspiešanas kombināciju ar maršrutēšanas kombināciju
- izpildlaika integrācija pirms vispārīgām kombināciju ignorēšanas vērtībām atrisina piešķirto saspiešanas kombināciju
- analītika ietver `compression_combo_id` un `engine`

Informācijas paneļa sadaļa: `Dashboard -> Context & Cache -> Compression Combos`.

## API saskarne

| Maršruts                               | Nolūks                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globālie saspiešanas iestatījumi (ietver `mcpAccessibility` konfigurāciju) |
| `/api/compression/preview`             | Jebkura saspiešanas režīma priekšskatījums                                 |
| `/api/compression/language-packs`      | Pieejamo Caveman valodu pakotņu saraksts                                   |
| `/api/context/caveman/config`          | Caveman iestatījumu aizstājvārds                                           |
| `/api/context/rtk/config`              | RTK noklusējuma vērtības un iestatījumi                                    |
| `/api/context/rtk/filters`             | RTK filtru katalogs                                                        |
| `/api/context/rtk/test`                | RTK priekšskatījuma/testa galapunkts                                       |
| `/api/context/rtk/raw-output/[id]`     | Autentificēta rediģētas neapstrādātās izvades atgūšana                     |
| `/api/context/combos`                  | Saspiešanas kombināciju CRUD                                               |
| `/api/context/combos/[id]/assignments` | Maršrutēšanas kombināciju piešķīrumu CRUD                                  |
| `/api/context/analytics`               | Saspiešanas analītikas aizstājvārds                                        |

Pārvaldības maršrutiem ir nepieciešama pārvaldības autentifikācija vai API atslēgas politikas pārbaudes.

## MCP rīki

Saspiešana nodrošina piecus MCP rīkus:

| Rīks                                | Tvērums             | Nolūks                                        |
| ----------------------------------- | ------------------- | --------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Iestatījumi, analītika, kešatmiņas statistika |
| `omniroute_compression_configure`   | `write:compression` | Globālo iestatījumu atjaunināšana             |
| `omniroute_set_compression_engine`  | `write:compression` | Režīma un neobligāta konveijera iestatīšana   |
| `omniroute_list_compression_combos` | `read:compression`  | Saspiešanas kombināciju saraksts              |
| `omniroute_compression_combo_stats` | `read:compression`  | Kombināciju/dzinēju analītikas lasīšana       |

## Tvērums un izņēmumi

**Iegultnes nekad netiek saspiestas.** `open-sse/handlers/embeddings.ts` nekad neizsauc nevienu
saspiešanas dzinēju — pieprasījuma/atbildes ķermeņi nemainīti nonāk tieši pie izpildītāja.
Pašlaik tas ir nodrošināts strukturāli (iegultnes un tērzēšanas pabeigšanas apstrādā atsevišķi apstrādātāji), nevis ar
izpildlaika pārbaudi, taču tas nozīmē, ka problēmai ar vektoru kropļošanu no #8034 nav ietekmes virsmas
iegultņu ceļā.

**Izslēgšanas filtrs katram modelim/galapunktam (#8034).** Tērzēšanas pabeigšanām operators var norādīt
modeļu identifikatorus / `provider/model` mērķus, kurus nekad nedrīkst saspiest — drošības mehānisms, kas ir noderīgs, ja
saspiešana vēlāk tiek integrēta tuvāk iegultnēm blakus esošam ceļam, kā arī kopumā noderīgs
jebkuram modelim, kuram svarīga precīza, baitu līmenī identiska uzvedne (deterministiski novērtējumi, pret kešatmiņu jutīgi
prefiksi u.c.).

- Iestatījumu lauks: `exclusions?: string[]` globālajā saspiešanas konfigurācijā
  (`GET`/`PUT /api/settings/compression`), kas tiek saglabāta, izmantojot esošo `key_value` saspiešanas
  nosaukumvietu (`src/lib/db/compression.ts`) — bez jaunas tabulas.
- Informācijas paneļa cilne: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Šablonu sintakse: `*` ir vienīgā aizstājējzīme. Visas pārējās regulāro izteiksmju metarakstzīmes šablonā pirms
  atbilstības pārbaudes tiek ekranētas, tāpēc `gpt-5.6` atbilst tikai literālajai virknei, nevis `gpt-5x6`
  (drošs pret ReDoS, ierobežots, bez ligzdotiem kvantifikatoriem). Atbilstība tiek pārbaudīta, neņemot vērā reģistru, gan pret
  atsevišķo modeļa identifikatoru, gan `provider/model` salikumu — darbojas `gpt-5-6`, `openai/gpt-5-6`
  un `openai/*`, savukārt `*` viens pats izslēdz visus modeļus.
- Atbilstības noteikšana: `isCompressionExcluded()` / `normalizeCompressionExclusions()` failā
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` pārbauda izslēgto mērķi
  uzreiz pēc saspiešanas iestatījumu atrisināšanas, **pirms tiek palaists jebkurš dzinējs**, un apstrādā atbilstību
  tieši tāpat kā globāli atspējotu saspiešanu — pieprasījuma ķermenis ir pierādāmi
  identisks baitu līmenī. Izlaišana tiek reģistrēta ar `writeCompressionSkip(..., "excluded")`, lai
  tā būtu redzama analītikā.
- Noklusējums (tukšs/neesošs saraksts): identiska darbība kā pirms #8034 — nekas netiek izslēgts.

## Zināmie ierobežojumi

- **LLMLingua-2 (SLM) ir nepieciešamas vienuviet izvietotas neobligātās atkarības.** Darbplūsmas process produkcijas būvē darbojas tikai tad, ja `@atjsh/llmlingua-2` un tā saistītās atkarības ir vienuviet izvietotas direktorijā `dist/node_modules` (skatiet `scripts/build/colocateOptionals.mjs`, #4286). Bez tām dzinis kļūmes gadījumā turpina darbu, atgriežot sākotnējo tekstu. Darbplūsmas procesa atrašanās vietas noteikšana vairs nav atkarīga no `import.meta.url` (savrupajā komplektā tas nedarbojas) — tā tiek piesaistīta izpildlaika cwd / `argv[1]`.
- **Caveman valodu pakotnes `de` / `fr` / `ja` ir daļējas.** Tajās ir iekļauti `context` + `filler` + `structural` kārtulu komplekti, bet nav `dedup` / `ultra` komplektu, tāpēc šīm valodām `ultra` intensitāte nav spēcīgāka par `full` (tās izmanto tikai savas kārtulas — netiek veikta nemanāma atkāpšanās uz angļu valodas `dedup`/`ultra` kārtulām, kas izkropļotu tekstu svešvalodā). `en` / `es` / `id` / `pt-BR` pakotnes ir pilnīgas. Aicinām iesniegt `dedup.json` + `ultra.json` papildinājumus daļējajām pakotnēm.
- **Secīgās telemetrijas datos tiek uzskaitīti tikai tie dziņi, kas veica saspiešanu.** Secīgā konveijera solis, kura dzinis tika izpildīts, bet nodrošināja 0 % ietaupījumu, atgriež `stats:null`, tāpēc tas netiek parādīts sadaļā `engineBreakdown` — to nevar atšķirt no izlaista soļa. Lai atšķirtu «izpildīts, 0 %» no «izlaists», būtu jāmaina sadalījuma modelis, un šīs izmaiņas ir atliktas.

## Validācija

Šīs jomas mērķētās pārbaudes ir:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
