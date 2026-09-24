# Compression Engines (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute-komprimering er bygget rundt motorkontrakter. En modus kan kjøre én motor direkte
(`caveman` eller `rtk`) eller en deterministisk, stablet pipeline som kjører flere motorer i rekkefølge.

## Moduser

| Modus        | Motorsti                                                                                  | Tiltenkt input                                    |
| ------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `off`        | ingen                                                                                     | Nøyaktig bevaring av prompt                       |
| `lite`       | Caveman lite-hjelpere                                                                     | Lavrisiko alltid-på-opprydding                    |
| `standard`   | Caveman                                                                                   | Naturlig-språklig prompt-kondensering             |
| `aggressive` | Caveman + historie-/verktøy-oppsummerere                                                  | Lange chat-sesjoner                               |
| `ultra`      | Caveman + beskjæringshjelpere                                                             | Gjenoppretting av kontekstgrense                  |
| `rtk`        | RTK                                                                                       | Terminal-, shell-, bygg-, test- og git-utdata     |
| `omniglyph`  | OmniGlyph                                                                                 | Kontekst-som-bilde på den native leverandørtråden |
| `stacked`    | Pipeline. Standard forespørsel er `session-dedup -> lite`. `rtk -> caveman` er valgfritt. | Blandede verktøylogger og prosa, maks besparelser |

### OmniGlyph komprimeringsprofiler

`omniglyph`-motoren (pakke `omniglyph`, 1.4.0+) aksepterer en navngitt semantisk profil, satt
globalt via `omniglyph.profile` i komprimeringsinnstillingene eller per trinn via
den stablede pipelinens trinnkonfigurasjon:

| Profil        | Grense                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Standard. Retningslinjene de publiserte kvitteringene målte – bildesystem, verktøydokumenter og tett historie |
| `balanced`    | Beholder live-tilstand native, beskytter de siste 8 svingene, kollapser eldre lukket historie                 |
| `coding-safe` | Beholder autoritet, verktøyskjemaer og live verktøyutdata native, beskytter de siste 12 svingene              |
| `passthrough` | Ruter uten transformering; motoren hoppes over                                                                |

Profilen er et **tak, ikke et gulv**: `mergeCompressionProfileOptions` i pakken
nekter å la en anroper overstyre gjenåpning av en tapsbringende bane profilen stengte, så en per-trinn
`preserveSystemPrompt: false` kan ikke gjenaktivere systemkomprimering under `coding-safe`.

Målt på denne kodebasen: `coding-safe` og `balanced` hever `minCompressChars` til sitt
maksimum og beholder system, verktøyskjemaer og verktøyresultater native, så en sesjon som ikke
har akkumulert historie ennå, stopper ved `below_min_chars` og motoren transformerer ingenting. Det
er derfor standard er `aggressive` i stedet for den sikreste profilen.

Pakken løser sitt eget modellomfang og profil fra miljøkonfigurasjonen.
OmniRoute delegerer aldri beslutningen: adapteren fester modellporten til pakkens
mest restriktive omfang, slik at verts-miljøinnstillinger bare kan innsnevre tillatelseslisten, aldri
utvide den utover OmniRoutes målte kvitteringer.

## Motorregister

Registeret finnes i `open-sse/services/compression/engines/registry.ts`. Motorene tilbyr en felles
kontrakt:

- `id`: stabil motor-ID, for eksempel `caveman` eller `rtk`
- `apply(text, config)`: eldre kjøringssti brukt av stablede pipelines
- `compress(input, config)`: primær kjøringssti som returnerer tekst + statistikk
- `getConfigSchema()`: returnerer den JSON-Schema-lignende strukturen for gyldig konfigurasjon
- `validateConfig(config)`: returnerer `{ valid, errors[] }`

Registrering bruker `registerCompressionEngine(engine)` (eller `registerEngine` for avanserte tilfeller),
som kaller `assertValidEngine()` og `validateConfig(defaultConfig)` før motoren godtas.
Bruk `unregisterCompressionEngine(id)` for å fjerne en motor under kjøring.

`strategySelector.ts` registrerer de innebygde motorene før komprimeringen kjøres. Dette gjør at forhåndsvisning,
kjøretidskomprimering, stablet modus, tester og fremtidige motorer kan bruke den samme kjøringsstien.

### Komprimering av MCP-beskrivelser (relatert)

Et separat register komprimerer beskrivelsesmetadata for MCP-verktøy på registernivå – se
`open-sse/mcp-server/descriptionCompressor.ts` og [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Det gjenbruker
Caveman-regler, men opererer på verktøymetadata, ikke forespørselsnyttelaster.

### Ytterligere innebygde motorer

I tillegg til Caveman, RTK og LLMLingua-2 inneholder registeret flere spesialiserte tapsfrie /
strukturelle motorer (brukt av stablede pipelines, testmiljøet og tester):

| Motor         | ID              | Hva den gjør                                                                                                                                                                             |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): erstatter store sammenhengende tekstblokker med innholdsadresserte referanser, slik at gjentatte/store blokker sendes én gang og deretter refereres til. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): tapsfri tabellkomprimering av homogene JSON-array-nyttelaster til et kolonnebasert `[N rows]`-format.                                                            |
| ionizer       | `ionizer`       | Utvalg av rader fra begynnelsen, midten og slutten av svært store homogene blokker, der den utelatte midtdelen lagres som en CCR-innholdsadressert referanse.                            |
| session-dedup | `session-dedup` | Innholdsadressert deduplisering på tvers av dialogrunder (inspirert av TokenMizer): utelater tekst som allerede er sett i tidligere dialogrunder i samme økt.                            |

**Instruksjon for CCR-henteprotokollen (#8033):** Første gang CCR erstatter ≥1 blokk i en
forespørsel, legger motoren til én enkelt, idempotent `system`-melding først (som begynner med
sentinelen `[CCR protocol]`) for å lære opp den som kaller, i kontrakten mellom markør og verktøy: hva en
`[CCR retrieve hash=<24hex> chars=N]`-markør betyr, at hashen må kopieres ordrett
(alle 24 heksadesimale tegn – feilkopierte hasher er den sannsynlige årsaken til treff med «blokk ikke funnet»),
og at en `[dedup:ref sha=...]`-markør betyr «se tilbake i historikken», ikke «kall
verktøyet». Merknaden settes inn **bare når den som kaller, sine annonserte `tools[]` beviser at den
faktisk kan nå `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` i
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) – en vanlig
OpenAI-kompatibel klient uten dette verktøyet mottar aldri en instruksjon om å kalle noe
den ikke kan nå. Idempotens håndheves ved å søke gjennom meldingshistorikken etter sentinelen
før innsetting, slik at forespørsler over flere dialogrunder (som spiller av tidligere meldinger på nytt) ikke stabler
merknaden én gang per dialogrunde.

## Caveman

Caveman-modus fokuserer på semantisk kondensering av vanlig prosa:

- bevarer kodeblokker, URL-er, JSON, stier og strukturerte data
- fjerner fyllord, forbehold, gjentatt kontekst og omstendelige bindeformuleringer
- støtter språktilpassede filregelpakker i `open-sse/services/compression/rules/`
- er fortsatt tilgjengelig gjennom de eldre modusene `standard`, `aggressive` og `ultra`

Dashbordvisningen er `Dashboard -> Context & Cache -> Caveman`.

Oppstrømsprosjektet Caveman rapporterer `~75%` færre utdata-tokener, gjennomsnittlig `65%` reduksjon i utdata i referansetester
med et spenn på `22-87%`, og et verktøy med `~46%` komprimering av inndata. OmniRoute bruker Cavemans tall for inndatasiden
ved dokumentasjon av kombinerte besparelser for ledetekst/kontekst. Cavemans utdatamodus er fortsatt en separat
funksjon for responsatferd.

## RTK

RTK-modus fokuserer på utdata fra kommandoer og verktøy:

- oppdager utdataklasser som `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo-/Go-tester, TypeScript-/Vite-/Webpack-bygg, ESLint, npm-revisjoner/installasjoner, Docker-logger,
  skallkommandoene `find`/`grep`, stakkspor og generiske logger
- bruker 49 JSON-filtre fra `open-sse/services/compression/engines/rtk/filters/`
- støtter den deklarative pipelinen i RTK-stil: fjerning av ANSI, erstatning, kortslutning ved samsvarende utdata,
  fjerning/bevaring av linjer, avkorting per linje, avkorting av begynnelse/slutt/maksimalt antall linjer og reserveverdi ved tomt resultat
- støtter prosjektfiltre underlagt tillitskontroll i `.rtk/filters.json` og globale filtre i
  `DATA_DIR/rtk/filters.json`
- fjerner ANSI-sekvenser, fremdriftsstøy, gjentatte linjer og lite nyttig standardtekst
- bevarer feil som kan følges opp, advarsler, sammendrag, endrede filer og kontekst på slutten
- kan valgfritt beholde sladdede rådata for gjenoppretting/feilsøking gjennom autentiserte administrasjonsruter

Dashbordvisningen er `Dashboard -> Context & Cache -> RTK`.

Driftsdetaljer for egendefinerte filtre, tillit, verifisering og gjenoppretting av rådata finnes i
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Oppstrømsprosjektet RTK rapporterer `60-90%` besparelse ved komprimering av kommandoutdata. Eksempelet i README-filen viser at en
30-minutters Claude Code-økt går fra `~118,000` tokener til `~23,900`, eller en besparelse på `79.7%`.

## LLMLingua-2 (semantisk beskjæring)

LLMLingua-2-modus utfører **semantisk tokenbeskjæring** på prosa ved hjelp av en liten ONNX-tokenklassifikator,
som utfyller de regelbaserte Caveman- og RTK-motorene:

- komprimerer bare prosa i meldinger som ikke er systemmeldinger; inngjerdede kodeblokker og andre bevarte
  konstruksjoner endres aldri
- kjører `@atjsh/llmlingua-2`-bakenden (ONNX via `@huggingface/transformers`) i en
  arbeidertråd, slik at modellinferens aldri blokkerer forespørselens hendelsesløkke
- kan **stables** (`stackPriority` 35): I en stablet pipeline kjører den etter de
  strukturelle motorene (CCR, session-dedup, headroom, Caveman), men før `ultra`, siden
  semantisk beskjæring er mest effektiv på tekst som allerede er strukturelt komprimert – f.eks.
  `rtk -> caveman -> llmlingua`
- **går videre ved enhver feil** (manglende valgfrie avhengigheter, oppstart av arbeider, modellinnlasting, inferens
  eller tidsavbrudd) → originalteksten returneres uendret, aldri en feil

Motorplassering: `open-sse/services/compression/engines/llmlingua/`. Dashbordvisningen
er `Dashboard -> Context & Cache -> LLMLingua`.

### Modeller

Standardmodellen er **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rask). En mer nøyaktig **BERT-base**-modell (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) er tilgjengelig via feltet `model` i motorkonfigurasjonen. `@huggingface/transformers`
laster den valgte modellen ned ved behov fra HuggingFace Hub til
`${DATA_DIR}/models/llmlingua` ved første kall (`modelStore.ts`); en overstyring med `modelPath` i konfigurasjonen
peker i stedet til en lokal kopi (for frakoblede / isolerte installasjoner).

### Valgfrie avhengigheter og behovsstyrt installasjon

Den fjernbare LLMLingua-kjøretidsstakken med peer-avhengigheter er **valgfri**. To pakker er deklarert som
`optionalDependencies` i `package.json` og holdes **eksterne** av produksjonsbygget
(`scripts/build/prepublish.ts` inkluderer dem ikke i pakken):

| Pakke                | Versjon (låst) | Merknader                                          |
| -------------------- | -------------- | -------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`        | Inngangspakke; deklarerer de andre som peer-pakker |
| `js-tiktoken`        | `^1.0.20`      | Tokenisator                                        |

`@huggingface/transformers` er låst til `^4.2.0` (deles med den lokale banen for innebygginger og
spores også inn i den frittstående pakken); `@atjsh/llmlingua-2@2.0.5` bruker den som peer-avhengighet med
`"^3.5.2 || ^4.0.0"`, så både Transformers.js v3 og v4 støttes. Fra og med 2.0.4
krever `@atjsh/llmlingua-2` ikke lenger `@tensorflow/tfjs`, noe som fjernet den største enkeltstående
bidragsyteren (TensorFlow.js) fra SLM-stakken. Bare de to pakkene ovenfor er fjernbare SLM-
peer-avhengigheter. En standard `npm install` (utvikling) installerer den valgfrie stakken automatisk med mindre valgfrie
avhengigheter utelates.

**Hvorfor behovsstyrt:** Den npm-publiserte pakken, den frittstående pakken og Docker-avbildningen
leveres **uten** disse avhengighetene for å holde størrelsen nede. Når de mangler, mislykkes arbeiderens
avhengighetskontroll (en `@atjsh/llmlingua-2`-oppløsningskontroll i `worker.ts`), og motoren
**går stille videre** – valg av LLMLingua blir en no-op (teksten returneres uendret, og ingen
feil logges). Installer den valgfrie stakken for å aktivere den i et redusert miljø:

```bash
# lås til versjonene som er deklarert i package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Fjerningen av `@tensorflow/tfjs` (2.0.4+) eliminerer den tidligere dominerende bidragsyteren på ~800 MB
– det gjenværende fotavtrykket består av kjøretidsmiljøene transformers.js + onnxruntime-node,
samt TinyBERT-modellen (~57 MB), som lastes ned ved første gangs bruk (ikke via npm).

Per miljø:

- **Utvikling / `npm install`** — installeres automatisk med mindre du brukte `--omit=optional`
  (eller `--no-optional`). Ingen handling er nødvendig.
- **Global npm (`npm i -g omniroute`) / frittstående** — kjør installasjonskommandoen ovenfor i
  katalogen til den installerte pakken, eller installer på nytt uten å utelate valgfrie avhengigheter.
- **Docker** — legg til installasjonskommandoen i et avledet bildelag; det publiserte bildet
  leveres bevisst i en minimal utgave.
- **VPS (PM2)** — installer i appens `node_modules`, og start deretter prosessen på nytt slik at
  arbeidsprosessen kontrollerer porten på nytt.
- **Rå Next-frittstående (`npm run build` → `.build/next/standalone/server.js`)** — den
  frittstående sporingen leveres VERKEN med arbeidsprosessen eller de valgfrie avhengighetene, så motoren
  går stille over til åpen modus ved feil. `scripts/build/colocate-standalone.mjs` legger til begge deler på nytt (esbuild for arbeidsprosessen +
  rekursiv inkludering av valgfrie avhengigheter i det frittstående treet); det kjøres automatisk via
  npm-hooken `postbuild` etter hver bygging. Idempotent og fortsetter uten feil når avhengigheter mangler.

**Bekreft at den er aktiv:** Når LLMLingua er valgt, blir faktisk prosa reelt forkortet (motoren
slutter å gå over til åpen modus ved feil), og den første forespørselen utløser nedlasting av modellen til
`${DATA_DIR}/models/llmlingua`. Porten kontrollerer med hensikt bare `@atjsh/llmlingua-2` —
de andre peer-avhengighetene er kun ESM, og `require.resolve` kaster feil for dem selv når de finnes — så
arbeidsprosessen går fortsatt over til åpen modus ved feil hvis en peer-avhengighet faktisk mangler på `import()`-tidspunktet.

## Stablede pipelines

Stablet modus kjører pipeline-trinn i rekkefølge. Standardrekkefølgen er:

```txt
rtk -> caveman
```

Bruk dette for økter med kodeagenter der en ledetekst kombinerer utdata fra kommandoer med tekst fra mennesker eller assistenter. RTK reduserer først støyende verktøylogger, og deretter komprimerer Caveman det gjenværende naturlige språket.

Pipeline-trinn konfigureres med `stackedPipeline` i komprimeringsinnstillingene eller gjennom komprimeringskombinasjoner.

Når begge motorene reduserer den samme kvalifiserte nyttelasten, forsterkes besparelsene:

```txt
kombinert    = 1 - (1 - RTK-besparelse) * (1 - Caveman-inndatabesparelse)
gjennomsnitt = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervall    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP-filter for tilgjengelighetstre

MCP-smartfilteret for tilgjengelighetstrær er et komprimeringslag som kjøres etter utførelse på MCP-**verktøyresultater**, ikke på ledetekster eller kontekst. Det er rettet mot de omfattende nyttelastene med tilgjengelighetstrær og nettleserøyeblikksbilder som returneres av verktøy som Playwright, computer-use og MCP-servere for nettleserautomatisering.

### Hva det gjør

1. **Fjerning av støy** — fjerner tomme generiske oppføringer og tekstoppføringer (`- generic:`, `- text: ""`)
2. **Sammenfolding av sideordnede elementer** — når ≥ `collapseThreshold` (standardverdi 30) sammenhengende linjer er strukturelle gjentakelser, foldes de sammen til de første `collapseKeepHead` (standardverdi 10) linjene + et sammendrag med antall + de siste `collapseKeepTail` (standardverdi 5) linjene
3. **Bevaring av referanser** — `[ref=eXX]`-ankre som kreves av Playwright/computer-use, blir aldri endret
4. **Fast avkorting** — hvis teksten etter sammenfolding fortsatt overstiger `maxTextChars` (standardverdi 50 000), avkortes den med et navigasjonstips slik at agenten kan fortsette arbeidet

### Plassering av motoren

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← inngangspunkt for smartFilterText()
  collapseRepeated.ts ← algoritme for sammenfolding av sideordnede elementer
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurasjon

Styres av `compression.mcpAccessibility` i de globale innstillingene (migrering 056). Standardkonfigurasjon:

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

Filteret brukes bare på nyttelaster med verktøyresultater der `type` er `"text"`, og der lengden overstiger `minLengthToProcess`. Det påvirker ikke komprimering av ledetekster eller forespørselsnyttelaster.

### Forventede besparelser

60–80 % på verktøyresultater med nettleserøyeblikksbilder, avhengig av sidens kompleksitet. Sammenfoldingsalgoritmen er O(n) i antall linjer og gir ubetydelig ekstra forsinkelse.

### Dette filteret sammenlignet med komprimeringsmotorene ovenfor

| Aspekt         | Caveman / RTK / stablet             | MCP-filter for tilgjengelighet         |
| -------------- | ----------------------------------- | -------------------------------------- |
| Mål            | Ledetekster/kontekst i forespørsler | MCP-verktøyresultater                  |
| Utløser        | Innstilling for komprimeringsmodus  | `compression.mcpAccessibility.enabled` |
| Omfang         | Alle SSE-meldinger                  | Bare verktøyresultater                 |
| Referanseankre | Ikke relevant                       | Bevares uten unntak                    |

---

## Komprimeringskombinasjoner

Komprimeringskombinasjoner er navngitte komprimeringsprofiler som kan tilordnes rutingskombinasjoner:

- `compression_combos`: lagrer modus, pipeline, RTK-konfigurasjon, språkkonfigurasjon og standardmarkør
- `compression_combo_assignments`: knytter en komprimeringskombinasjon til en rutingskombinasjon
- kjøretidsintegrasjonen løser en tilordnet komprimeringskombinasjon før generelle overstyringer for kombinasjoner
- analyse inkluderer `compression_combo_id` og `engine`

Plassering i kontrollpanelet: `Dashboard -> Context & Cache -> Compression Combos`.

## API-grensesnitt

| Rute                                   | Formål                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globale komprimeringsinnstillinger (inkluderer `mcpAccessibility`-oppsett) |
| `/api/compression/preview`             | Forhåndsvis en hvilken som helst komprimeringsmodus                        |
| `/api/compression/language-packs`      | Vis tilgjengelige Caveman-språkpakker                                      |
| `/api/context/caveman/config`          | Alias for Caveman-innstillinger                                            |
| `/api/context/rtk/config`              | RTK-standardverdier og -innstillinger                                      |
| `/api/context/rtk/filters`             | RTK-filterkatalog                                                          |
| `/api/context/rtk/test`                | Endepunkt for RTK-forhåndsvisning/-testing                                 |
| `/api/context/rtk/raw-output/[id]`     | Autentisert gjenoppretting av sladdet råutdata                             |
| `/api/context/combos`                  | CRUD for komprimeringskombinasjoner                                        |
| `/api/context/combos/[id]/assignments` | CRUD for tilordning av rutingskombinasjoner                                |
| `/api/context/analytics`               | Alias for komprimeringsanalyse                                             |

Administrasjonsruter krever administrasjonsautentisering eller kontroll av API-nøkkelpolicy.

## MCP-verktøy

Komprimering eksponerer fem MCP-verktøy:

| Verktøy                             | Omfang              | Formål                                           |
| ----------------------------------- | ------------------- | ------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Innstillinger, analyse og hurtigbufferstatistikk |
| `omniroute_compression_configure`   | `write:compression` | Oppdater globale innstillinger                   |
| `omniroute_set_compression_engine`  | `write:compression` | Angi modus og valgfri pipeline                   |
| `omniroute_list_compression_combos` | `read:compression`  | Vis komprimeringskombinasjoner                   |
| `omniroute_compression_combo_stats` | `read:compression`  | Les analyse for kombinasjoner/motorer            |

## Omfang og ekskluderinger

**Embeddings komprimeres aldri.** `open-sse/handlers/embeddings.ts` kaller aldri noen
komprimeringsmotor — forespørsels-/responskroppene sendes rett til eksekveringskomponenten uten endringer.
Dette er strukturelt i dag (embeddings og chat-fullføringer har separate håndteringskomponenter), ikke en
kjøretidskontroll, men det betyr at bekymringen for vektorforvrengning i #8034 ikke har noen eksponeringsflate
i embeddings-flyten.

**Ekskluderingsfilter per modell/endepunkt (#8034).** For chat-fullføringer kan en operatør angi
modell-ID-er / `provider/model`-mål som aldri skal komprimeres — et sikkerhetstiltak som er nyttig hvis
komprimering senere kobles nærmere en embeddings-tilgrensende flyt, og generelt nyttig
for alle modeller der en eksakt byte-for-byte-prompt er viktig (deterministiske evalueringer, hurtigbufferfølsomme
prefikser osv.).

- Innstillingsfelt: `exclusions?: string[]` i den globale komprimeringskonfigurasjonen
  (`GET`/`PUT /api/settings/compression`), lagret via det eksisterende `key_value`-navnerommet for komprimering
  (`src/lib/db/compression.ts`) — ingen ny tabell.
- Fane i kontrollpanelet: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Mønstersyntaks: `*` er det eneste jokertegnet. Alle andre regex-metategn i et mønster blir
  escapet før samsvarskontroll, slik at `gpt-5.6` bare samsvarer med den bokstavelige strengen, aldri `gpt-5x6`
  (ReDoS-sikkert, avgrenset, ingen nestede kvantifikatorer). Mønstre samsvares uten hensyn til store og små bokstaver mot
  både den rene modell-ID-en og den sammensatte `provider/model`-verdien — `gpt-5-6`, `openai/gpt-5-6`
  og `openai/*` fungerer alle, og `*` alene ekskluderer alle modeller.
- Samsvarskontroll: `isCompressionExcluded()` / `normalizeCompressionExclusions()` i
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kontrollerer det ekskluderte målet
  rett etter at komprimeringsinnstillingene er løst, **før noen motor kjører**, og behandler et samsvar
  nøyaktig som om komprimering var globalt deaktivert — forespørselskroppen er beviselig
  byte-for-byte-identisk. Hoppet registreres via `writeCompressionSkip(..., "excluded")` for
  synlighet i analysen.
- Standard (tom/manglende liste): identisk med oppførselen før #8034 — ingenting ekskluderes.

## Kjente begrensninger

- **LLMLingua-2 (SLM) krever samlokaliserte valgfrie avhengigheter.** Workeren kjører bare i et
  produksjonsbygg når `@atjsh/llmlingua-2` + peer-avhengigheter er samlokalisert i
  `dist/node_modules` (se `scripts/build/colocateOptionals.mjs`, #4286). Uten dem går
  motoren over til sikker standardatferd (returnerer originalteksten). Worker-oppløsning avhenger ikke lenger av
  `import.meta.url` (den feiler i den frittstående pakken) — den forankres i kjøretidsmiljøets
  cwd / `argv[1]`.
- **Caveman-språkpakkene `de` / `fr` / `ja` er ufullstendige.** De leveres med regler for `context` +
  `filler` + `structural`, men uten pakker for `dedup` / `ultra`, så intensiteten `ultra` er
  ikke sterkere enn `full` for disse språkene (de bruker bare sine egne regler — det finnes ingen
  skjult tilbakefall til de engelske `dedup`/`ultra`-reglene, som ville ha ødelagt fremmedspråklig tekst).
  `en` / `es` / `id` / `pt-BR` er komplette. Bidrag med `dedup.json` + `ultra.json`
  for de ufullstendige pakkene er velkomne.
- **Stablet telemetri viser bare motorer som utførte komprimering.** Et trinn i en stablet pipeline der
  motoren kjørte, men ga 0 % besparelse, returnerer `stats:null` og vises derfor ikke i
  `engineBreakdown` — det kan ikke skilles fra et trinn som ble hoppet over. Å skille mellom
  «kjørte, 0 %» og «hoppet over» ville kreve en endring i oversiktsmodellen og er utsatt.

## Validering

De fokuserte portene for dette området er:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
