# OmniRoute Auto-Combo Engine (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Til brugere**: Leder du efter en hurtig start? Se [brugervejledningen til Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) for enkle forklaringer og eksempler.

> Selvstyrende modelkæder med adaptiv scoring + automatisk routing uden konfiguration

## Automatisk routing uden konfiguration (`auto/`-præfiks)

> **NYT:** Det er ikke nødvendigt at oprette en kombination. Brug `auto/`-præfikset direkte i enhver klient.

### Hurtige eksempler

| Model-id       | Variant  | Adfærd                                                                   |
| -------------- | -------- | ------------------------------------------------------------------------ |
| `auto`         | standard | Alle tilsluttede udbydere, LKGP-strategi, afbalancerede vægte            |
| `auto/coding`  | kodning  | Kvalitetsprioriterede vægte, velegnet til kodegenerering                 |
| `auto/fast`    | hurtig   | Vægtet valg med lav latenstid                                            |
| `auto/cheap`   | billig   | Omkostningsoptimeret routing (laveste omkostning først)                  |
| `auto/offline` | offline  | Foretrækker udbydere med størst kvotetilgængelighed                      |
| `auto/smart`   | smart    | Kvalitet først + højere udforskningsrate (10 %) for bedre modelopdagelse |
| `auto/lkgp`    | lkgp     | Eksplicit LKGP (samme som standard-`auto`)                               |
| `auto/chaos`   | chaos    | Fejlinjektionsvægte til robusthedstest (chaos engineering)               |

### Sammensætning af kategori × niveau (`auto/<category>:<tier>`)

Suffikser i OpenRouter-stil adskiller **hvilken type rute** (kategori) fra **hvordan den optimeres** (niveau), så de frit kan kombineres (#4235 fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorier** (filtrerer kandidatpuljen efter funktionalitet): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` beholder modeller med visionsfunktionalitet; `reasoning` beholder modeller med ræsonnerings-/tænkefunktionalitet.
- **Niveauer** (vælger scoringsvægte/puljefilter): `fast` (hurtig levering) · `cheap` (alias `floor`, omkostningsbesparende) · `reliable` (circuit breaker-tilstand + latenstidsstabilitet) · `free` / `pro` (filtrerer puljen efter modelniveau via `classifyTier` — gratisniveau kontra premium).

| Eksempel               | Opløses til                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `auto/coding:fast`     | kodningspulje, vægte med lav latenstid                                  |
| `auto/coding:cheap`    | kodningspulje, omkostningsoptimeret (alias `auto/coding:floor`)         |
| `auto/reasoning:pro`   | kun ræsonnerings-/tænkemodeller, premium-niveau                         |
| `auto/vision`          | modeller med visionsfunktionalitet (intet niveau → afbalancerede vægte) |
| `auto/multimodal:free` | modeller med multimodal funktionalitet, kun gratisniveau                |

Enhver gyldig `auto/<category>[:<tier>]` opløses efter behov; et kurateret udvalg annonceres i `/v1/models` og dashboardet (`AUTO_SUFFIX_VARIANTS` i `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrering er **fail-open** — hvis en begrænsning ikke matcher nogen tilsluttede modeller, anvendes hele puljen, så routingen aldrig bryder sammen. Kernescoreren (`combo.ts`) er uændret; kategori-/niveaufilteret anvendes i `buildAutoCandidates`.

> **Live-modelintelligens:** Auto-routingens egnethed baseres på live-rangeringer fra **Arena ELO** + niveaudata fra **models.dev**, når flaget `ARENA_ELO_SYNC_ENABLED` er aktiveret (ellers bruges det statiske egnethedskort som reserve).

**Sådan bruges det:**

```bash
# Ethvert IDE- eller CLI-værktøj, der understøtter OpenAI-formatet
Basis-URL: http://localhost:20128/v1
API-nøgle: <din-slutpunktsnøgle>

# Indstil modellen i din kode/konfiguration til:
model: "auto"                 # afbalanceret standard
model: "auto/coding"          # bedst til kodningsopgaver
model: "auto/fast"            # hurtigst tilgængelige
model: "auto/cheap"           # billigst pr. token
```

**Det sker der:**

1. OmniRoute registrerer `auto/`-præfikset i `src/sse/handlers/chat.ts`
2. Forespørger databasen om alle **aktive udbyderforbindelser**
3. Filtrerer til dem med gyldige legitimationsoplysninger (API-nøgle eller OAuth-token)
4. Bestemmer modellen pr. forbindelse (`connection.defaultModel` eller udbyderens første model)
5. Opretter en **virtuel kombination** i hukommelsen (gemmes ikke i databasen)
6. Router ved hjælp af den valgte variants vægtprofil + LKGP-strategi

**Vigtige egenskaber:**

- ✅ **Altid aktiv:** Ingen kontakt, ingen oprettelse af kombination og ingen konfiguration nødvendig
- ✅ **Dynamisk:** Afspejler automatisk de aktuelt tilsluttede udbydere
- ✅ **Sessionsfastholdelse:** LKGP sikrer, at den senest vellykkede udbyder prioriteres
- ✅ **Understøtter flere konti:** Hver udbyderforbindelse bliver en separat kandidat
- ✅ **Ingen databaseskrivninger:** Den virtuelle kombination findes kun for anmodningen, helt uden persistensoverhead

### Kandidatstyring pr. nøgle (#7819, niveau 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = suffikset efter `auto/` eller
den bogstavelige værdi `auto` for basiskanalen) er et **skrivebeskyttet** slutpunkt, der viser den
aktuelle kandidatpulje for en `auto/*`-kanal med live-tilgængelighedsoplysninger ved at genbruge
de eksisterende robusthedsaflæsninger (aldrig den rå breaker-`state`):

- udbyderens circuit breaker — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- forbindelsens nedkøling — `rateLimitedUntil` / `testStatus` på den opløste
  `provider_connections`-række
- modellåsning — `isModelLocked(provider, connectionId, model)`

Hver kandidat indeholder også denne API-nøgles `excluded`-flag. Udelukkelser gemmes
pr. API-nøgle (`auto_candidate_overrides`-tabellen, migrering `128`) — OmniRoute er
single-tenant uden en `users`-tabel, så `apiKeyId` er den nærmeste reelle identitet
pr. kalder — og håndhæves ved kandidatpuljens samlingspunkt i
`open-sse/services/autoCombo/virtualFactory.ts` via den rene, enhedstestede
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filteret er **fail-open**: Et ikke-angivet apiKeyId/en ikke-angivet kanal eller en fejl ved databaseopslag
efterlader begge puljen ufiltreret, så en operatør uden konfigurerede tilsidesættelser oplever routing,
der byte for byte er identisk med før denne funktion.

**Udskudt til en opfølgende issue:** vægte pr. kandidat + eksplicit rækkefølge (niveau 3
— føder ind i de eksisterende vægtede/prioritetsbaserede strategiforløb) og fastlåsning af en specifik
`combo.ts`-strategi pr. `auto/*`-kanal (niveau 4). Se planen i #7819 vedrørende det åbne
spørgsmål om, hvorvidt tilsidesættelser fortsat skal være pr. API-nøgle eller gøres globale i lyset af
single-tenant-modellen.

**Bag kulisserne:**

```txt
Anmodning: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts registrerer præfikset
   ↓
createVirtualAutoCombo('coding') → candidatePool fra aktive forbindelser
   ↓
handleComboChat (samme motor som permanente kombinationer)
   ↓
Automatisk scoring vælger den bedste udbyder/model pr. anmodning
```

**Implementeringsfiler:**

| Fil                                                       | Formål                                          |
| --------------------------------------------------------- | ----------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Præfiksparser (`parseAutoPrefix`)               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Opretter virtuelle `AutoComboConfig`-objekter   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test-hook til mocking af udbyderregisteret      |
| `src/sse/handlers/chat.ts`                                | Integration: tidlig afslutning for auto-præfiks |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto`-systempost              |

## Kombinationsnavne, der matcher et reelt model-id

En kombination, hvis `name` er identisk med et model-id uden præfiks (f.eks. en kombination med navnet `gpt-5.5`), er et **tilsigtet og understøttet mønster**, ikke en fejl: Det er mekanismen til reserveudbydere pr. model-id, som er dokumenteret i [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Da kombinationsopslag udføres før opslag af model-id'er uden præfiks (`getComboForModel()` i `src/sse/services/model.ts`), dirigeres en anmodning om id'et `gpt-5.5` uden præfiks gennem kombinationens destinationer (f.eks. `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) i stedet for direkte til en enkelt udbyder — dette genbruger prioriteten af kombinationer før omskrivning, som blev udviklet til [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), og regressionstestes af `tests/unit/responses-combo-resolution-3227.test.ts` og `tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Oprettelse eller omdøbning af en kombination til et navn, der overskygger et reelt model-id, **afvises aldrig** — det ville ødelægge denne dokumenterede arbejdsgang. I stedet tilføjer `POST /api/combos` og `PUT /api/combos/[id]` (#8530) et ikke-blokerende `warning`-felt til svaret, når det (nye) navn kolliderer med et reelt model-id:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Ved opstart logger `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) også en `[STARTUP]`-advarsel på én linje, der oplister alle eksisterende kombinationer, som overskygger et model-id, så operatører, der rammer dette ved et uheld (frem for med vilje som beskrevet i #6940), får et signal. Hjælpefunktionen til registrering findes i `src/lib/combos/modelNameCollision.ts`.

## Kald af en brugerdefineret kombination fra en klient

Gemte kombinationer (Indstillinger → Kombinationer) bruges kun, når klienten sender kombinationens **nøjagtige navn** i feltet `model` — der foretages ingen uklar eller delvis matchning af kombinationsnavnet, og præfikset `auto/` er ikke involveret. Opløsningsrækkefølge (`getComboForModel()` i `src/sse/services/model.ts`):

1. nøjagtigt match af kombinationsnavn (`model: "my-combo"`),
2. præfikset `combo/<name>` (`model: "combo/my-combo"`),
3. glob-tilknytninger fra model til kombination (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

To almindelige faldgruber:

- **`auto` bruger ikke dine kombinationer.** `auto`/`auto/*` opbygger sin egen kandidatpulje uden konfiguration og konsulterer kun gemte kombinationer, hvis en kombination bogstaveligt talt hedder `auto` (anbefales ikke). For at dirigere gennem en kombination skal du sende dens nøjagtige navn — ikke `auto`.
- **`openrouter/auto` er et reelt, betalt OpenRouter-produkt** ("Auto Best Available"), ikke et OmniRoute-alias. Det er den eneste statiske modelpost i OpenRouter-registret (`open-sse/config/providers/registry/openrouter/index.ts`) og faktureres separat. Brug Indstillinger → Routing → Skjul betalte modeller for at udelukke det fra `auto`-puljer.

Se [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) og [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) for den oprindelige forvirring, som dette dokumenterer.

## Sådan fungerer det (lagrede Auto-Combos)

Auto-Combo-motoren vælger dynamisk den bedste udbyder/model til hver anmodning ved hjælp af en **scoringsfunktion med 16 faktorer** (defineret i `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Standardvægtene summerer til `1.0`; brugerdefinerede vægte normaliseres igen af `normalizeScoringWeights()`. To af de seksten — `cacheAffinity` og `resetWindowAffinity` — har en standardvægt på `0`; `reliability` har `0` i `DEFAULT_WEIGHTS`, men `0.03` i generiske pakker og `0.04` i `reliability-first`, og `quality` har `0.02` i pakker (`0.03` i `quality-first`): De beregnes stadig for hver kandidat, og `cacheAffinity` styrer deduplikering af promptcachen uden for scoren, så faktorerne med standardværdien nul har som udgangspunkt ingen indflydelse, mens de har det i pakkerne.

![Auto-Combo-scoring med 16 faktorer](../diagrams/exported/auto-combo-scoring.svg)

> Kilde: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (generér igen via `npm run docs:render-diagrams`). Filnavnet er historisk; kilden og det renderede diagram viser alle 16 faktorer, der er erklæret i `DEFAULT_WEIGHTS`.

| Faktor                | Standardvægt | Beskrivelse                                                                                                                                                                                                                |
| :-------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429       | Resterende kvote / råderum inden for hastighedsgrænsen [0..1]                                                                                                                                                              |
| `health`              | 0.1605       | Tilstandsscore fra circuit breaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                   |
| `costInv`             | 0.1429       | Omvendt **kombineret** omkostning (60 % input- + 40 % outputtokenpris, normaliseret) — billigere = højere score                                                                                                            |
| `latencyInv`          | 0.1143       | Omvendt p95-latenstid normaliseret i forhold til puljen — hurtigere = højere score                                                                                                                                         |
| `taskFit`             | 0.0762       | Egnethed til opgavetypen (kodning, gennemgang, planlægning, analyse, fejlfinding, dokumentation)                                                                                                                           |
| `stability`           | 0.0476       | Variansbaseret stabilitet ud fra latenstidens standardafvigelse — en kandidat med meget svingende svartider scorer lavere                                                                                                  |
| `tierPriority`        | 0.0476       | Kontoniveauets prioritet — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                    |
| `tierAffinity`        | 0.0476       | Overensstemmelse mellem kandidatens niveau og det niveau, som manifestet anbefaler                                                                                                                                         |
| `specificityMatch`    | 0.0476       | Overensstemmelse mellem anmodningens specificitet (tip fra manifestet) og modelniveauet                                                                                                                                    |
| `contextAffinity`     | 0.0476       | Overensstemmelse mellem anmodningens behov for kontekstvindue og modellens kontekstvindue                                                                                                                                  |
| `sessionAvailability` | 0.0476       | Tilgængelighed af OAuth-sessionen for kandidatforbindelsen i denne session (`getOAuthSessionAvailability()`; forbindelser uden OAuth scorer 1.0)                                                                           |
| `connectionDensity`   | 0.0476       | Fordeler belastningen på tværs af forbindelser fra samme udbyder (modvirker koncentration)                                                                                                                                 |
| `cacheAffinity`       | 0.00         | Rendezvous-hash-tilknytning til den forbindelse, der med størst sandsynlighed allerede indeholder denne anmodnings promptcachepræfiks (`open-sse/services/combo/promptCacheAffinity.ts`); deaktiveret som standard (#8008) |
| `resetWindowAffinity` | 0.00         | Prioritering af forbindelser, hvis vindue for kvotenulstilling er fordelagtigt (deaktiveret som standard)                                                                                                                  |
| `quality`             | 0.03         | Feedbackbaseret signal for outputkvalitet fra routinghændelsernes kvalitetssporing; kandidater uden observationer får den neutrale værdi 0.5                                                                               |
| `reliability`         | 0.00         | Observeret succesandel, `1 - failureRate`, fra 24 timers brugshistorik med et minimum på ti stikprøver (ellers målinger i realtid); kandidater uden observationer aflæses som 1.0. Deaktiveret som standard                |

**Sum:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` som erklæret i `DEFAULT_WEIGHTS`; brugerkonfigurerede vægte normaliseres igen til en fordeling af `normalizeScoringWeights()` før beregningen af scoren.

## Tilstandspakker

6 foruddefinerede vægtprofiler i `open-sse/services/autoCombo/modePacks.ts`. Hver pakke erstatter standardvægtene fuldstændigt for at styre udvælgelsen mod ét mål. Hver pakke har allerede en samlet sum på `1.0` (`0.9999`, når den vises med fire decimaler), så `normalizeScoringWeights()` har ikke noget væsentligt at korrigere, når en pakke er aktiv — værdierne nedenfor er, med forbehold for afrunding, dem, som scoringsfunktionen anvender.

| Faktor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Bemærkninger:

- **Pakker indeholder `quality` og `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) og erstatter hele vægtkortet (`weights = pack`, ikke en sammenfletning). `DEFAULT_WEIGHTS` indeholder `quality 0.03 / reliability 0`; valg af `balanced`/`default` bevarer disse standardværdier, mens valg af en pakke bruger pakkens værdier ovenfor. I en kold pulje (ingen observationer endnu, så `quality 0.5` og `reliability 1`) bidrager disse to faktorer med `+0.04` under en generisk pakke (`0.03 + 0.01`), `+0.045` under `quality-first` og `+0.05` under `reliability-first`.
- `tierAffinity`, `specificityMatch` og `resetWindowAffinity` er eksplicit sat til `0` i hver pakke.
- Et hurtigt overblik over hver pakkes fokus:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (forbindelser med lav latenstid og god tilstand)
  - **cost-saver** → costInv 0.3324 (de billigste tokens vinder)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, den højeste værdi blandt alle pakker (den bedste model til opgaven, konsistent)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maksimalt råderum uanset hastighed/omkostninger)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, den højeste værdi blandt alle pakker (færrest overraskelser)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil til fejlinjektion)

### Styring pr. anmodning (headere) — #6023 / #6024 / #6025 / #3470

En `auto`-kombination kan styres **pr. anmodning** via tre headere uden at ændre kombinationens
gemte konfiguration. Disse gælder kun for `auto`-strategien og kun for den anmodning,
der indeholder dem; kombinationens gemte `modePack`/`budgetCap`/`budgetFallback` anvendes,
når headeren ikke er til stede.

| Header                        | Accepterer                                                                                                                                                                                           | Effekt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | et foruddefineret alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) eller et råt pakkenavn (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Tilsidesætter vægtningen af scorer for denne anmodning. `balanced`/`default` gennemtvinger standardvægtningen (ingen pakke). Ukendte værdier ignoreres (konfigurationen bevares).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Budget`          | et positivt tal (maks. USD pr. anmodning)                                                                                                                                                            | Fast omkostningsloft: Kandidater, hvis estimerede omkostning overstiger det, filtreres fra før valget. Hvad der sker, når **alle** kandidater overstiger det, styres af `X-OmniRoute-Budget-Fallback` nedenfor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (standard, aliaser: `cheapest-viable`, `soft`) eller `strict` (aliaser: `block`, `hard`)                                                                                                  | `cheapest`: Falder tilbage til den globalt billigste kandidat, selvom den stadig overstiger loftet (ældre adfærd). `strict`: Afviser at vælge — anmodningen fejler straks med `HTTP 402` i stedet for stiltiende at bruge for mange penge. Ukendte værdier ignoreres.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `X-OmniRoute-Effort`          | `auto` (andre værdier er reserveret)                                                                                                                                                                 | Adaptivt tænkningsbudget: Når anmodningen **ikke** indeholder et ræsonneringsfelt af nogen art (`reasoning_effort`, `reasoning`, `thinking`), omsætter gatewayen `auto` til `low`/`medium`/`high` ud fra deterministiske signaler i anmodningens struktur (længden af den seneste brugermeddelelse, kontekststørrelsen frem til den seneste brugermeddelelse, tidligere værktøjsresultater og værktøjsløkkens dybde). Signalerne er afgrænset til den aktuelle tur — alt efter den seneste brugermeddelelse ignoreres — så hver anmodning i en værktøjsløkke får samme niveau (tilstandsløs binding pr. tur, ingen sessionstilstand og ingen eskalering midt i løkken, som ville bryde upstream-promptcachens præfikser). Et eksplicit ræsonneringsfelt fra klienten har altid forrang. Afgrænset til anmodninger, hvis upstream-dispatch omsættes til OpenAI Chat Completions-formatet (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` er et OpenAI-formateret felt, så headeren har ingen effekt på en anmodning målrettet Claude eller Gemini (se `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Gennemtving den hurtigste profil, begræns denne anmodning til $0.05, og blokér konsekvent i stedet for at overskride budgettet
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Evalueringen er en ren funktion (`open-sse/services/autoCombo/requestControls.ts`); de
evaluerede værdier føres ind i motorens eksisterende `config.modePack`- /
`config.budgetCap`- / `config.budgetFallback`-input. En kombinations gemte
`config.budgetFallback` ("strict" | "cheapest") angiver den vedvarende politik;
headeren tilsidesætter den for en enkelt anmodning.

## Alle routingstrategier

OmniRoutes combo-motor understøtter **19 routingstrategier** (deklareret i `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Selve Auto Combo-motoren er tilgængelig under strategien `auto`; de øvrige er tilgængelige for gemte comboer.

| Strategi            | Beskrivelse                                                                                                                                                                                                               |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Ordnet liste med første mål og eksplicit prioritet                                                                                                                                                                        |
| `weighted`          | Vægtet tilfældig udvælgelse baseret på vægten pr. mål                                                                                                                                                                     |
| `round-robin`       | Gå gennem målene i rækkefølge                                                                                                                                                                                             |
| `context-relay`     | Overdrag kontekst mellem mål (lange samtaler)                                                                                                                                                                             |
| `fill-first`        | Opbruger hvert måls kvote, før der fortsættes til det næste                                                                                                                                                               |
| `p2c`               | Tilfældig belastningsfordeling med Power of 2 Choices                                                                                                                                                                     |
| `random`            | Ensartet tilfældig udvælgelse                                                                                                                                                                                             |
| `least-used`        | Vælg målet med den laveste aktuelle belastning                                                                                                                                                                            |
| `cost-optimized`    | Minimer $ pr. anmodning ud fra katalogpriser                                                                                                                                                                              |
| `reset-aware` ⭐    | Prioriter efter tidspunktet for nulstilling af kvoten — korte nulstillingsvinduer rangeres højere                                                                                                                         |
| `reset-window`      | Foretræk mål, hvis kvotevindue nulstilles først                                                                                                                                                                           |
| `headroom`          | Vælg målet med den største resterende kvotemargen                                                                                                                                                                         |
| `strict-random`     | Tilfældig udvælgelse uden deduplikering af gentagelser                                                                                                                                                                    |
| `auto`              | Brug Auto Combo-pointberegning (16 faktorer) — **anbefales**                                                                                                                                                              |
| `lkgp`              | Senest kendte fungerende sti (fastholder den senest vellykkede udbyder og falder derefter tilbage på reglerne)                                                                                                            |
| `context-optimized` | Vælg det mål, der passer bedst til den aktuelle kontekststørrelse                                                                                                                                                         |
| `cache-optimized`   | Omarranger mål efter tilknytning til promptcachen — den forbindelse, der med størst sandsynlighed allerede har denne anmodnings cachede præfiks, afprøves først (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Send parallelt til et panel af modeller, og syntetiser derefter ét svar via en bedømmelsesmodel (se nedenfor)                                                                                                             |
| `pipeline`          | Kør målene sekventielt, hvor hvert trins output føres videre som input til det næste trin; kun det endelige svar returneres (#6396)                                                                                       |

⭐ = Nyt i v3.8.0 · 🧬 = Nyt i v3.8.36

### Semantik for `weighted`

`weighted` er en **proportional tilfældig udvælgelse pr. anmodning**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), ikke en udligningsmekanisme:

- Hver anmodning vælger **ét** trin med sandsynligheden `weight / totalWeight`; de resterende trin
  sorteres efter faldende vægt som fallback-kæde for den pågældende anmodning.
- Et trin, hvis vægt er `0` (eller mangler), bliver **aldrig valgt**, så længe et andet trin har en
  vægt > 0 — det kan kun fungere som fallback, efter det valgte trin fejler. Kun når **alle**
  vægte er 0, bliver udvælgelsen ensartet.
- Trin, hvis mål alle er utilgængelige — udbyderens circuit breaker er `OPEN`, forbindelsen
  er i cooldown, eller modellen er låst ude — fjernes fra udvælgelsen, før den foretages
  (`open-sse/services/combo/targetResolution.ts`), så et enkelt fungerende trin midlertidigt kan
  vinde hver eneste anmodning.
- `stickyWeightedLimit` (combo-konfiguration, standardværdi `1` = deaktiveret) fastholder det valgte trin i dette antal
  vellykkede kørsler i træk, før der foretages en ny udvælgelse.

Brug `round-robin` til streng rotation; ens vægte med `weighted` giver statistisk — ikke
streng — balance.

## Fusionsstrategi

`fusion` er den eneste strategi, der **ikke** vælger et enkelt mål. Den sender prompten
ud til **alle panelmodeller parallelt**, hvorefter en konfigurerbar **dommermodel** sammenfatter
ét endeligt svar ud fra alle panelsvar. Porteret fra upstream-projektet `decolua/9router`
(OpenRouters Fusion-design); implementeret i `open-sse/services/fusion.ts`.

Sådan fungerer det:

0. **Omgåelse ved brug af værktøjer** — en anmodning, der indeholder et ikke-tomt `tools`-array,
   hvor `tool_choice` ikke udtrykkeligt er `"none"`, springer panelet helt over: Den dirigeres direkte
   til en enkelt model (den konfigurerede dommer eller `panel[0]`), mens `tools`/`tool_choice`
   videresendes uændret. Panelmedlemmer har ikke adgang til værktøjer, og dommerens
   sammenfatningsinstruks fraråder generering af værktøjskald, så agentbaserede klienter og klienter,
   der bruger værktøjskald, får en reel beslutning om værktøjskald i stedet for sammenfattet prosa (#6771).
1. **Udsendelse** (kun anmodninger uden værktøjer) — prompten sendes til alle panelmodeller
   på én gang, tvunget til ikke-streaming og uden værktøjer (dommeren skal bruge komplet
   prosa for at kunne sammenfatte).
2. **Indsamling med kvorum og henstandsperiode** — så snart `minPanel` svar er modtaget, starter
   en kort henstandsperiode for de resterende modeller, hvorefter fusionen fortsætter med det,
   der er blevet indsamlet. Dette begrænser den langsomste models påvirkning af den samlede
   svartid inden for rammerne af en fast timeout.
3. **Dommerens sammenfatning** — panelsvar anonymiseres (`Kilde 1`, `Kilde 2`, … — så
   dommeren vurderer indholdet, ikke modellens mærke) og overdrages til dommeren, som analyserer
   konsensus/modsigelser/delvis dækning/unikke indsigter/blinde vinkler og derefter
   skriver **ét** autoritativt svar. Dommerkaldet beholder klientens oprindelige
   `stream`-flag samt værktøjer, så streaming og efterfølgende brug af værktøjer stadig fungerer.
4. **Kontrolleret degradering** — 0 panelsvar → `503`; præcis 1 overlevende → det pågældende svar
   returneres direkte (der er intet at fusionere); et panel med én model svarer direkte.

Et panelmedlem kan også være et `combo-ref`-trin (`{kind: "combo-ref", comboName: "..."}`), der refererer
til en anden kombination — det behandles som **én selvstændig panelstemme** (en fuldstændig rekursiv videresendelse
til den refererede kombination, ikke en udsendelse til denne kombinations egne mål) med den samme dybde-/cyklusbeskyttelse,
som alle andre strategier, der anvender combo-ref, allerede bruger (#6764).

### Konfiguration

Konfigureres i kombinationens `config`-blob (ingen skemamigrering — den genbruger den eksisterende
`combos`-tabel):

| Felt                                     | Type     | Standardværdi     | Formål                                                                                            |
| :--------------------------------------- | :------- | :---------------- | :------------------------------------------------------------------------------------------------ |
| `config.judgeModel`                      | `string` | første panelmodel | Model, der sammenfatter det endelige svar                                                         |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Antal vellykkede svar, der kræves, før henstandsperioden starter (begrænset til `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Hvor længe der ventes på efternølere, efter at kvorummet er nået                                  |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Absolut grænse, så én fastlåst model ikke kan forsinke anmodningen                                |

Standardværdierne findes i `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Eksempel

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Kald den derefter som enhver anden kombination: `{"model":"fusion-panel","messages":[...]}`.

## Virtuel Auto-Combo-fabrik

Auto Combo-motoren kræver ikke foruddefinerede combos. I stedet bygger `open-sse/services/autoCombo/virtualFactory.ts` kandidater dynamisk:

1. Henter `getProviderConnections({ isActive: true })` (alle aktiverede forbindelser)
2. Filtrerer dem til forbindelser med gyldige legitimationsoplysninger (API-nøgle eller ikke-udløbet OAuth-token via `hasUsableOAuthToken()`)
3. Sammenholder dem med `getProviderRegistry()` for modeltilgængelighed + priser
4. Bygger en `VirtualAutoComboCandidate` for hver tuple `(provider, model, connection)`
5. Vælger `connection.defaultModel` (eller registreringsdatabasens første model) som afsendelsesmål
6. Bedømmer hver kandidat ved hjælp af `scorePool()` med 16 faktorer og variantens vægtpakke
7. Returnerer den resulterende `AutoComboConfig` i hukommelsen til `handleComboChat()` — den gemmes aldrig i databasen

Det betyder, at **tilføjelse af en ny udbyder med `auto/*` aktiveret automatisk udvider kandidatpuljen** — der er ikke behov for manuel redigering af combos. Den virtuelle combo genopbygges for hver anmodning, så nyligt tilføjede eller nyligt velfungerende forbindelser medtages med det samme.

## Selvhelbredelse

- **Midlertidig udelukkelse**: Score < 0.2 → udelukkes i 5 min. (progressiv backoff, maks. 30 min.)
- **Bevidsthed om circuit breaker**: OPEN → udelukkes automatisk; HALF_OPEN → probeanmodninger
- **Hændelsestilstand**: >50% OPEN → deaktiver udforskning, maksimer stabiliteten
- **Genopretning efter nedkøling**: Efter udelukkelse er den første anmodning en "probe" med reduceret timeout

## Bandit-udforskning

5% af anmodningerne (kan konfigureres) dirigeres til tilfældige udbydere med henblik på udforskning. Deaktiveret i hændelsestilstand.

## API

Der findes **ikke et dedikeret `POST /api/combos/auto`-slutpunkt** — Auto-Combo anvendes på to måder:

1. **Uden konfiguration (anbefalet):** Send en vilkårlig chat completion-anmodning med `model: "auto"` eller `model: "auto/<variant>"`. Den virtuelle fabrik bygger comboen for hver anmodning — ingen lagring og ingen API-kald er nødvendige.

2. **Gemt combo med `strategy: "auto"`:** Opret en almindelig combo via `POST /api/combos`, og angiv `strategy: "auto"` sammen med `config.auto.weights` / `config.auto.candidatePool`. Den samme scoringsmotor anvendes; comboen gemmes i `combos` og kan genbruges via ID.

Til registrering viser `GET /api/combos/auto` alle varianter med deres opløste kandidatpulje samt `context_length` / `max_output_tokens` — MAKSIMUM på tværs af kandidatpuljens vinduer. Klienter (f.eks. opencode-pluginet) skal annoncere disse værdier i stedet for `0`: en kontekst på nul deaktiverer opencodes automatiske komprimering fuldstændigt, så sessioner kan vokse, indtil gatewayens rydning af historik ødelægger konteksten. MAKSIMUM er sikkert at annoncere, fordi auto-comboens kontekstforfilter dirigerer for store anmodninger til kandidater med store vinduer.

```bash
# Brug uden konfiguration (ingen oprettelse af combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Gemt auto-combo via det almindelige combos-slutpunkt
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto-routerstrategier

Gemte combos med `strategy: "auto"` kan angive `config.routerStrategy` (eller den ældre
`config.auto.routerStrategy`) til én af følgende:

- `rules` — vægtet standardscoring
- `score` — vælger den højest konfigurerede vægtede score. Ved helt ens scorer bevares den konfigurerede
  kandidatrækkefølge; den eksisterende `explorationRate` udtager prøver fra hele den rangerede pulje.
- `cost` / `eco` — billigste velfungerende udbyder
- `latency` / `fast` — laveste p95-latenstid med pålidelighedsfradrag
- `sla-aware` / `sla` — foretræk kandidater, der opfylder SLO'er for p95-latenstid, fejlrate og valgfrie
  omkostninger
- `lkgp` — senest kendte velfungerende udbyder først

### Routerstrategier i detaljer

Auto-combo-motoren stiller 6 udskiftelige **RouterStrategy**-implementeringer til rådighed, som
du kan skifte mellem via `config.routerStrategy` (eller den ældre `config.auto.routerStrategy`).
Hver strategi vælger én udbyder fra kandidatpuljen ud fra en `RoutingContext`
(opgavetype, værktøjs-/billedinput, tokenestimat, valgfri SLA-politik, valgfri
senest kendte velfungerende udbyder).

#### 1. `rules` (standard) — vægtet scoring med 16 faktorer

Indkapsler den eksisterende scoringsmotor. Filtrerer circuit breaker-kandidater
med tilstanden `OPEN` fra og kører derefter `scorePool()` med den aktuelle opgavetype og `getTaskFitness()`,
hvorefter udbyderen med den højeste score vælges.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Hvornår den skal bruges**: Standard. Brug den, når du ønsker en afbalanceret afvejning på tværs af alle signaler.

**Alias**: `rules` (intet alias)

---

#### 2. `cost` / `eco` — billigste velfungerende udbyder

Sorterer kandidatpuljen efter `costPer1MTokens` (stigende) og vælger den billigste.
Filtrerer først kandidater med tilstanden `OPEN` fra.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Hvornår den skal bruges**: Omkostningsfølsomme arbejdsbelastninger, batchbehandling eller baggrundsjob.

**Aliasser**: `cost`, `eco`

---

#### 3. `latency` / `fast` — laveste p95-latenstid med pålidelighedsfradrag

Sorterer efter `p95LatencyMs + (errorRate * 1000)`. Fejlrate-straffen sikrer, at
upålidelige udbydere rangeres lavere, selv hvis deres nominelle latenstid er lav.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Hvornår den skal bruges**: Latensfølsomme arbejdsbelastninger såsom chat i realtid, autofuldførelse eller
interaktive kodningsassistenter.

**Aliasser**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — overholdelse af SLO'er for latenstid/fejl/omkostninger

Giver hver kandidat en score baseret på, hvor godt den opfylder den konfigurerede SLO-politik:

| Faktor           | Vægt | Formel                                                 |
| ---------------- | ---- | ------------------------------------------------------ |
| Latensscore      | 35%  | `threshold / max(value, ε)`                            |
| Fejlscore        | 35%  | `threshold / max(value, ε)`                            |
| Helbredsscore    | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)      |
| Omkostningsscore | 10%  | `threshold / max(value, ε)` eller omvendt normaliseret |
| Stabilitetsscore | 5%   | omvendt normaliseret standardafvigelse for latenstid   |

Når `hardConstraints: true`, sorteres kandidaterne primært efter **overtrædelsesscore**
(hvor meget de overskrider en given SLO) og derefter efter samlet score. Ellers bruges kun
den samlede score.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... tildeler hver kandidat en score i forhold til politikken: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-felter** (angives i kombinationskonfigurationen):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Hvornår den skal bruges**: Produktionsarbejdsbelastninger med strenge budgetter for latenstid, fejlrate eller omkostninger.

**Aliasser**: `sla-aware`, `sla`

---

#### 5. `lkgp` — sidst kendte gode udbyder først

Forsøger først den **sidst kendte gode udbyder** (hvis angivet) og falder derefter tilbage på
`rules`-strategien. Nyttig til sessionstilknytning — den samme udbyder håndterer
opfølgende anmodninger i en samtale.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fald tilbage på rules-strategien
    return getStrategy("rules").select(pool, context);
  }
}
```

**Hvornår den skal bruges**: Samtaler med flere interaktioner, hvor den samme udbyder skal håndtere
opfølgende anmodninger (f.eks. af hensyn til caching, kontekstsammenhæng eller ensartet prissætning).

**Alias**: `lkgp` (intet alias)

---

### Tilpassede routerstrategier

Du kan registrere din egen implementering af `RouterStrategy` via den offentlige API:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Din routinglogik her
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Brug den derefter:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Vejledning til valg af routerstrategi

| Anvendelse                   | Strategi    | Begrundelse                                      |
| ---------------------------- | ----------- | ------------------------------------------------ |
| Balanceret arbejdsbelastning | `rules`     | Standard — tager højde for alle faktorer         |
| Minimer omkostninger         | `cost`      | Vælger altid den billigste                       |
| Minimer latenstid            | `latency`   | Vælger den hurtigste pålidelige udbyder          |
| Strenge SLO'er               | `sla-aware` | Filtrerer efter tærskler for p95/fejl/omkostning |
| Chat med flere interaktioner | `lkgp`      | Sessionstilknytning                              |

SLA-bevidste felter:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Opgaveegnethed

30+ modeller er bedømt på tværs af 6 opgavetyper (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Understøtter jokertegnsmønstre (f.eks. `*-coder` → høj score for kodning).

## Opsummering af Auto-varianter

Når den rene `auto` (standard) medregnes sammen med de 6 `AutoVariant`-værdier, der er deklareret i `autoPrefix.ts`, er der **7 model-id'er, som kan aktiveres**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` selv indeholder 6 værdier; den 7. mulighed er "ingen variant" — ren `auto` — som håndteres af `parseAutoPrefix()` som `variant: undefined`.)

## Sådan passer niveauer ind i Auto-Combo

Scoringsfunktionen med 16 faktorer (`open-sse/services/autoCombo/scoring.ts`) behandler medlemskab af niveauer som to signaler: `tierPriority` (0.0476) og `tierAffinity` (0.0476). Se den kanoniske [tabel over scoringsfaktorer](#how-it-works-persisted-auto-combos) ovenfor for det komplette sæt af `DEFAULT_WEIGHTS` — tilsidesættelserne pr. pakke (ship-fast/cost-saver/quality-first/offline-friendly) er angivet i tabellen "Vægtprofiler pr. pakke".

Niveauet alene tvinger **ikke** Niveau 1 til at komme først — hvis latenstiden for Niveau 1 er dårlig, eller forholdet mellem pris og kvalitet er suboptimalt, vinder Niveau 2. Brug kombinationsstrategien `priority`, og arranger udbyderne efter niveau for at gennemtvinge niveaurækkefølgen.

For at prioritere Niveau 1 (abonnement) markant skal vægten `tierPriority` øges:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Se `docs/marketing/TIERS.md` for definitioner af niveauer og klassificering af udbydere.

## Test og dækning

### Deterministisk matrix for routingbeslutninger (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` dokumenterer routingens **beslutning** for alle 19 offentlige strategier fra ende til anden gennem den rigtige kombinationspipeline med en simuleret upstream-tjeneste. Dækningen omfatter:

- Alle 19 `ROUTING_STRATEGY_VALUES`-strategier (ordered, weighted, cost, context, fusion, …).
- `quota-share` (intern) fra ende til anden: DRR-retfærdighed + nedprioritering ved mætning via det rigtige `selectQuotaShareTarget`-integrationspunkt (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay`-dækning af universel overdragelse på tværs af alle antal destinationer.

Denne testsuite køres i CI (`test:integration`-jobbet) med `--test-concurrency=1` og `--test-force-exit`, så den er deterministisk og ikke kræver aktive legitimationsoplysninger.

### Betinget live-smoketest (IKKE i CI — rigtige udbydere)

| Kommando                               | Hvad den gør                                                                                      |
| :------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `npm run test:combo:live`              | Reel routing i processen med `RUN_COMBO_LIVE=1`; tager et snapshot af en aktiv OmniRoute-database |
| `npm run test:combo:live:vps`          | HTTP-kald mod en aktiv OmniRoute-server (angiv `COMBO_LIVE_BASE_URL`)                             |
| `npm run test:combo:live:vps:failover` | Det samme, med bevidst fremkaldte failover-scenarier                                              |

Disse smoketests afprøver den rigtige kommunikationsvej (kombination → udbyder → fuldførelse). De er bevidst udeladt fra CI, fordi de kræver aktive legitimationsoplysninger og VPS-adgang.

---

## Filer

| Fil                                                       | Formål                                                                                                 |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Scoringsfunktion med 16 faktorer, `DEFAULT_WEIGHTS`, puljenormalisering                                |
| `open-sse/services/autoCombo/taskFitness.ts`              | Opslag af egnethed for model × opgave                                                                  |
| `open-sse/services/autoCombo/engine.ts`                   | Udvælgelseslogik, bandit, budgetloft                                                                   |
| `open-sse/services/autoCombo/selfHealing.ts`              | Ekskludering, sonderinger, hændelsestilstand                                                           |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 vægtprofiler (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser til præfikset `auto/` + 6 varianter                                                             |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Opbygger `AutoComboConfig` i hukommelsen ud fra aktive forbindelser                                    |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test-hook til mocking af udbyderregisteret                                                             |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategier)                                                              |
| `src/sse/handlers/chat.ts`                                | Integration: tidlig afslutning ved auto-præfiks                                                        |
