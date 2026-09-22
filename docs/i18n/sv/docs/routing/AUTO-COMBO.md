# OmniRoute Auto-Combo Engine (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **För användare**: Letar du efter en snabbstart? Se [användarguiden för Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) för enkla förklaringar och exempel.

> Självhanterande modellkedjor med adaptiv poängsättning + automatisk dirigering utan konfiguration

## Automatisk dirigering utan konfiguration (prefixet `auto/`)

> **NYTT:** Inget combo-skapande krävs. Använd prefixet `auto/` direkt i valfri klient.

### Snabba exempel

| Modell-ID      | Variant  | Beteende                                                                        |
| -------------- | -------- | ------------------------------------------------------------------------------- |
| `auto`         | standard | Alla anslutna leverantörer, LKGP-strategi, balanserade vikter                   |
| `auto/coding`  | coding   | Kvalitetsprioriterade vikter, lämpligt för kodgenerering                        |
| `auto/fast`    | fast     | Viktat val med låg latens                                                       |
| `auto/cheap`   | cheap    | Kostnadsoptimerad dirigering (lägsta kostnad först)                             |
| `auto/offline` | offline  | Prioriterar leverantörer med högst tillgänglig kvot                             |
| `auto/smart`   | smart    | Kvalitetsprioritering + högre utforskningsgrad (10 %) för bättre modellupptäckt |
| `auto/lkgp`    | lkgp     | Explicit LKGP (samma som standardalternativet `auto`)                           |
| `auto/chaos`   | chaos    | Vikter för felinjektion vid resiliensstestning (chaos engineering)              |

### Sammansättning av kategori × nivå (`auto/<category>:<tier>`)

Suffix i OpenRouter-stil separerar **vilken typ av rutt** (kategori) från **hur den ska optimeras** (nivå), så att du kan kombinera dem fritt (#4235 fas B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorier** (filtrerar kandidatpoolen efter kapacitet): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` behåller modeller med stöd för bildbehandling; `reasoning` behåller modeller för resonemang/tänkande.
- **Nivåer** (väljer poängvikter/poolfilter): `fast` (snabb leverans) · `cheap` (alias `floor`, kostnadsbesparande) · `reliable` (hälsostatus för kretsbrytare + latensstabilitet) · `free` / `pro` (filtrerar poolen efter modellnivå via `classifyTier` — kostnadsfri nivå kontra premiumnivå).

| Exempel                | Matchas mot                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `auto/coding:fast`     | kodningspool, vikter för låg latens                                    |
| `auto/coding:cheap`    | kodningspool, kostnadsoptimerad (alias `auto/coding:floor`)            |
| `auto/reasoning:pro`   | endast modeller för resonemang/tänkande, premiumnivå                   |
| `auto/vision`          | modeller med stöd för bildbehandling (ingen nivå → balanserade vikter) |
| `auto/multimodal:free` | multimodala modeller, endast kostnadsfri nivå                          |

Alla giltiga `auto/<category>[:<tier>]` matchas vid behov. Ett utvalt delmängd annonseras i `/v1/models` och instrumentpanelen (`AUTO_SUFFIX_VARIANTS` i `open-sse/services/autoCombo/builtinCatalog.ts`). Filtreringen är **fail-open** — om ett villkor inte matchar några anslutna modeller används hela poolen, så att dirigeringen aldrig slutar fungera. Kärnpoängsättaren (`combo.ts`) är oförändrad; kategori-/nivåfiltret tillämpas i `buildAutoCandidates`.

> **Aktuell modellinformation:** lämpligheten för automatisk dirigering baseras på aktuella rankningar från **Arena ELO** + nivådata från **models.dev** när flaggan `ARENA_ELO_SYNC_ENABLED` är aktiverad (annars används den statiska lämplighetskartan som reserv).

**Så här använder du funktionen:**

```bash
# Valfritt IDE- eller CLI-verktyg som stöder OpenAI-formatet
Base URL: http://localhost:20128/v1
API Key:  <din-slutpunktsnyckel>

# Ange följande modell i din kod/konfiguration:
model: "auto"                 # balanserat standardalternativ
model: "auto/coding"          # bäst för kodningsuppgifter
model: "auto/fast"            # snabbast tillgängliga
model: "auto/cheap"           # billigast per token
```

**Detta händer:**

1. OmniRoute identifierar prefixet `auto/` i `src/sse/handlers/chat.ts`
2. Hämtar alla **aktiva leverantörsanslutningar** från databasen
3. Filtrerar fram dem som har giltiga autentiseringsuppgifter (API-nyckel eller OAuth-token)
4. Fastställer modellen per anslutning (`connection.defaultModel` eller leverantörens första modell)
5. Skapar en **virtuell combo** i minnet (lagras inte i databasen)
6. Dirigerar med den valda variantens viktprofil + LKGP-strategi

**Viktiga egenskaper:**

- ✅ **Alltid aktiverad:** Ingen växlingsknapp, inget combo-skapande och ingen konfiguration behövs
- ✅ **Dynamisk:** Återspeglar automatiskt de leverantörer som för närvarande är anslutna
- ✅ **Sessionsaffinitet:** LKGP säkerställer att den senast fungerande leverantören prioriteras
- ✅ **Stöd för flera konton:** Varje leverantörsanslutning blir en separat kandidat
- ✅ **Inga databasskrivningar:** Den virtuella combon finns endast under begäran, utan beständig lagringskostnad

### Kandidatstyrning per nyckel (#7819, nivå 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = suffixet efter `auto/`, eller
det literala värdet `auto` för baskanalen) är en **skrivskyddad** slutpunkt som listar
den aktuella kandidatpoolen för en `auto/*`-kanal, kompletterad med aktuell nåbarhet genom
återanvändning av befintliga resiliensavläsningar (aldrig det råa `state`-värdet från kretsbrytaren):

- leverantörens kretsbrytare — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- nedkylningsperiod för anslutningen — `rateLimitedUntil` / `testStatus` på den matchade
  raden i `provider_connections`
- modellspärr — `isModelLocked(provider, connectionId, model)`

Varje kandidat innehåller även den här API-nyckelns `excluded`-flagga. Undantag lagras
per API-nyckel (tabellen `auto_candidate_overrides`, migrering `128`) — OmniRoute är
single-tenant och saknar tabellen `users`, så `apiKeyId` är den närmaste verkliga identiteten
per anropare — och tillämpas vid kandidatpoolens centrala kontrollpunkt i
`open-sse/services/autoCombo/virtualFactory.ts` via den rena, enhetstestade
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filtret är **fail-open**: ett ej angivet apiKeyId/en ej angiven kanal eller ett misslyckat databasuppslag
lämnar båda poolen ofiltrerad, så en operatör utan konfigurerade undantag får en dirigering
som är identisk byte för byte med beteendet före den här funktionen.

**Skjuts upp till ett uppföljningsärende:** vikter per kandidat + explicit ordning (nivå 3
— matas in i de befintliga strategiflödena för viktning/prioritering) och fästning av en specifik
`combo.ts`-strategi per `auto/*`-kanal (nivå 4). Se planen för #7819 angående den öppna
frågan om åsidosättningar ska förbli per API-nyckel eller bli globala med tanke på
modellen med en enda klientorganisation.

**Bakom kulisserna:**

```txt
Begäran: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts identifierar prefixet
   ↓
createVirtualAutoCombo('coding') → candidatePool från aktiva anslutningar
   ↓
handleComboChat (samma motor som för beständiga kombinationer)
   ↓
Automatisk poängsättning väljer den bästa leverantören/modellen per begäran
```

**Implementeringsfiler:**

| Fil                                                       | Syfte                                          |
| --------------------------------------------------------- | ---------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefixtolk (`parseAutoPrefix`)                 |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Skapar virtuella `AutoComboConfig`-objekt      |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testkrok för att simulera leverantörsregistret |
| `src/sse/handlers/chat.ts`                                | Integrering: genväg för auto-prefix            |
| `src/shared/constants/providers.ts`                       | Systemposten `SYSTEM_PROVIDERS.auto`           |

## Combo-namn som matchar ett verkligt modell-id

En combo vars `name` är identiskt med ett fristående modell-id (t.ex. en combo med namnet
`gpt-5.5`) är ett **avsiktligt mönster som stöds**, inte ett fel: det är
mekanismen för reservleverantörer per modell-id som dokumenteras i
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Eftersom combo-
matchning kontrolleras före matchning av fristående modell-id
(`getComboForModel()` i `src/sse/services/model.ts`) dirigeras en begäran för det fristående
id:t `gpt-5.5` genom combons mål (t.ex.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) i stället för direkt till
en enda leverantör — detta återanvänder prioriteringen combo före omskrivning som skapades för
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) och
regressionstestas av `tests/unit/responses-combo-resolution-3227.test.ts` och
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Att skapa eller byta namn på en combo så att dess namn överskuggar ett verkligt modell-id
**avvisas aldrig** — det skulle bryta detta dokumenterade arbetsflöde. I stället
(#8530) lägger `POST /api/combos` och `PUT /api/combos/[id]` till ett icke-blockerande
`warning`-fält i svaret när det (nya) namnet kolliderar med ett verkligt
modell-id:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Vid uppstart loggar `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) även en enradsvarning med `[STARTUP]` som
räknar upp varje befintlig combo som överskuggar ett modell-id, så att operatörer som
råkar ut för detta av misstag (snarare än avsiktligt, enligt #6940) får en indikation.
Hjälpfunktionen för identifiering finns i `src/lib/combos/modelNameCollision.ts`.

## Anropa en anpassad combo från en klient

Beständiga combos (Inställningar → Combos) används endast när klienten skickar combons **exakta namn** i fältet `model` — det finns ingen ungefärlig eller partiell matchning av combo-namnet och inget `auto/`-prefix används. Matchningsordning (`getComboForModel()` i `src/sse/services/model.ts`):

1. exakt matchning av combo-namn (`model: "my-combo"`),
2. prefixet `combo/<name>` (`model: "combo/my-combo"`),
3. glob-mappningar från modell till combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Två vanliga fallgropar:

- **`auto` använder inte dina combos.** `auto`/`auto/*` bygger sin egen kandidatpool utan konfiguration och använder endast beständiga combos om en combo bokstavligen heter `auto` (rekommenderas inte). För att dirigera genom en combo ska du skicka dess exakta namn — inte `auto`.
- **`openrouter/auto` är en verklig betald OpenRouter-produkt** ("Auto Best Available"), inte ett OmniRoute-alias. Det är den enda statiska modellposten i OpenRouter-registret (`open-sse/config/providers/registry/openrouter/index.ts`) och faktureras separat. Använd Inställningar → Dirigering → Dölj betalda modeller för att utesluta den från `auto`-pooler.

Se [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) och [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) för den ursprungliga förvirring som detta dokumenterar.

## Så fungerar det (beständiga Auto-Combos)

Auto-Combo-motorn väljer dynamiskt den bästa leverantören/modellen för varje begäran med hjälp av en **poängfunktion med 16 faktorer** (definierad i `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Standardvikterna summeras till `1.0`; anpassade vikter normaliseras om av `normalizeScoringWeights()`. Två av de sexton — `cacheAffinity` och `resetWindowAffinity` — har standardvikten `0`; `reliability` har `0` i `DEFAULT_WEIGHTS` men `0.03` i generiska paket och `0.04` i `reliability-first`, och `quality` har `0.02` i paket (`0.03` i `quality-first`): de beräknas fortfarande för varje kandidat, och `cacheAffinity` styr deduplicering av promptcachen utanför poängberäkningen. Faktorerna med standardvikten noll påverkar alltså inte resultatet som standard, medan paketen gör det.

![Auto-Combos poängberäkning med 16 faktorer](../diagrams/exported/auto-combo-scoring.svg)

> Källa: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (generera om via `npm run docs:render-diagrams`). Filnamnet är historiskt; källan och det renderade diagrammet visar samtliga 16 faktorer som deklareras i `DEFAULT_WEIGHTS`.

| Faktor                | Standardvikt | Beskrivning                                                                                                                                                                                                              |
| :-------------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429       | Återstående kvot/utrymme till frekvensgränsen [0..1]                                                                                                                                                                     |
| `health`              | 0.1605       | Hälsopoäng från kretsbrytaren (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                      |
| `costInv`             | 0.1429       | Inverterad **blandad** kost (60 % pris för indatatoken + 40 % pris för utdatatoken, normaliserat) — billigare = högre poäng                                                                                              |
| `latencyInv`          | 0.1143       | Inverterad p95-latens normaliserad mot poolen — snabbare = högre poäng                                                                                                                                                   |
| `taskFit`             | 0.0762       | Lämplighet för uppgiftstypen (kodning, granskning, planering, analys, felsökning, dokumentation)                                                                                                                         |
| `stability`           | 0.0476       | Variansbaserad stabilitet utifrån latensens standardavvikelse — en kandidat vars svarstid varierar får lägre poäng                                                                                                       |
| `tierPriority`        | 0.0476       | Kontonivåns prioritet — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                     |
| `tierAffinity`        | 0.0476       | Överensstämmelse mellan kandidatens nivå och den nivå som rekommenderas i manifestet                                                                                                                                     |
| `specificityMatch`    | 0.0476       | Matchning mellan begärans specificitet (ledtråd i manifestet) och modellnivån                                                                                                                                            |
| `contextAffinity`     | 0.0476       | Överensstämmelse mellan begärans behov av kontextfönster och modellens kontextfönster                                                                                                                                    |
| `sessionAvailability` | 0.0476       | Tillgänglighet för OAuth-sessionen för kandidatanslutningen i den här sessionen (`getOAuthSessionAvailability()`; anslutningar utan OAuth får poängen 1.0)                                                               |
| `connectionDensity`   | 0.0476       | Fördelar belastningen mellan anslutningar från samma leverantör (motverkar koncentration)                                                                                                                                |
| `cacheAffinity`       | 0.00         | Rendezvous-hashöverensstämmelse med den anslutning som troligast redan innehåller den här begärans prefix i promptcachen (`open-sse/services/combo/promptCacheAffinity.ts`); inaktiverad som standard (#8008)            |
| `resetWindowAffinity` | 0.00         | Gynnar anslutningar vars återställningsfönster för kvoten är fördelaktigt (inaktiverad som standard)                                                                                                                     |
| `quality`             | 0.03         | Återkopplingsdriven signal för utdatakvalitet från kvalitetsmätaren för routningshändelser; kandidater utan observationer får neutrala 0.5                                                                               |
| `reliability`         | 0.00         | Observerad andel lyckade anrop, `1 - failureRate`, från 24 timmars användningshistorik med ett golv på tio stickprov (annars realtidsmätvärden); kandidater utan observationer avläses som 1.0. Inaktiverad som standard |

**Summa:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` enligt deklarationen i `DEFAULT_WEIGHTS`; användarkonfigurerade vikter normaliseras om till en fördelning av `normalizeScoringWeights()` före poängberäkningen.

## Lägespaket

6 fördefinierade viktprofiler i `open-sse/services/autoCombo/modePacks.ts`. Varje paket ersätter standardvikterna helt för att styra urvalet mot ett mål. Varje paket summerar redan till `1.0` (`0.9999` vid utskrift med fyra decimaler), så `normalizeScoringWeights()` har inget meningsfullt att korrigera när ett paket är aktivt — värdena nedan är, med hänsyn till avrundning, de som poängsättaren tillämpar.

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

Anmärkningar:

- **Paketen innehåller `quality` och `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) och ersätter viktmappningen i sin helhet (`weights = pack`, inte en sammanslagning). `DEFAULT_WEIGHTS` innehåller `quality 0.03 / reliability 0`; om `balanced`/`default` väljs behålls dessa standardvärden, medan valet av ett paket använder paketets värden ovan. I en kall pool (inga observationer ännu, alltså `quality 0.5` och `reliability 1`) bidrar dessa två faktorer med `+0.04` för ett generiskt paket (`0.03 + 0.01`), `+0.045` för `quality-first` och `+0.05` för `reliability-first`.
- `tierAffinity`, `specificityMatch` och `resetWindowAffinity` är uttryckligen `0` i varje paket.
- En snabb överblick över vad varje paket betonar:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (anslutningar med låg latens och god hälsa)
  - **cost-saver** → costInv 0.3324 (de billigaste tokenen vinner)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, högst av alla paket (bästa modellen för uppgiften, konsekvent)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximalt utrymme oavsett hastighet/kostnad)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, högst av alla paket (minst antal överraskningar)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil för felinjektion)

### Kontroller per begäran (headers) — #6023 / #6024 / #6025 / #3470

En `auto`-kombination kan styras **per begäran** via tre headers, utan att ändra kombinationens
lagrade konfiguration. Dessa gäller endast för strategin `auto` och endast för begäran
som innehåller dem; kombinationens sparade `modePack`/`budgetCap`/`budgetFallback` används
när headern saknas.

| Header                        | Accepterar                                                                                                                                                                                                 | Effekt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | ett förinställt alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) eller ett obearbetat paketnamn (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Åsidosätter poängsättningsvikterna för denna begäran. `balanced`/`default` framtvingar standardvikterna (inget paket). Okända värden ignoreras (konfigurationen bevaras).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget`          | ett positivt tal (maximalt antal USD per begäran)                                                                                                                                                          | Hård kostnadsgräns: kandidater vars uppskattade kostnad överskrider den filtreras bort före valet. Vad som händer när **alla** kandidater överskrider den styrs av `X-OmniRoute-Budget-Fallback` nedan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (standard, alias: `cheapest-viable`, `soft`) eller `strict` (alias: `block`, `hard`)                                                                                                            | `cheapest`: återgår till den totalt sett billigaste kandidaten trots att den fortfarande överskrider gränsen (tidigare beteende). `strict`: vägrar att göra ett val — begäran misslyckas omedelbart med `HTTP 402` i stället för att tyst överskrida budgeten. Okända värden ignoreras.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `X-OmniRoute-Effort`          | `auto` (andra värden är reserverade)                                                                                                                                                                       | Adaptiv tankebudget: när begäran **inte** innehåller något resonemangsfält av någon form (`reasoning_effort`, `reasoning`, `thinking`) omvandlar gatewayen `auto` till `low`/`medium`/`high` utifrån deterministiska signaler i begärans struktur (längden på det senaste användarmeddelandet, kontextstorleken fram till och med det senaste användarmeddelandet, tidigare verktygsresultat, verktygsloopens djup). Signalerna är avgränsade till den aktuella turen — allt efter det senaste användarmeddelandet ignoreras — så varje begäran i en verktygsloop får samma nivå (tillståndslös låsning per tur, inget sessionstillstånd, ingen eskalering mitt i loopen som skulle bryta prefixen i uppströms promptcache). Ett explicit resonemangsfält från klienten har alltid företräde. Begränsat till begäranden vars uppströmsdirigering resulterar i formatet OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` är ett OpenAI-formatfält, så headern har ingen effekt på en begäran riktad till Claude eller Gemini (se `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Tvinga fram den snabbaste profilen, begränsa denna begäran till 0,05 USD och blockera helt i stället för att överskrida budgeten
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Upplösningen är en ren funktion (`open-sse/services/autoCombo/requestControls.ts`); de
upplösta värdena matas in i motorns befintliga indata `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. En kombinations lagrade `config.budgetFallback` ("strict" |
"cheapest") anger den beständiga policyn; headern åsidosätter den för en enskild begäran.

## Alla routningsstrategier

OmniRoutes kombinationsmotor stöder **19 routningsstrategier** (deklarerade i `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Själva Auto Combo-motorn exponeras genom strategin `auto`; de övriga är tillgängliga för beständiga kombinationer.

| Strategi            | Beskrivning                                                                                                                                                                                    |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Ordnad lista där det första målet prioriteras, med uttrycklig prioritet                                                                                                                        |
| `weighted`          | Viktat slumpmässigt val baserat på vikt per mål                                                                                                                                                |
| `round-robin`       | Växla mellan målen i tur och ordning                                                                                                                                                           |
| `context-relay`     | Överför kontext mellan mål (långa konversationer)                                                                                                                                              |
| `fill-first`        | Fyll varje måls kvot innan nästa mål används                                                                                                                                                   |
| `p2c`               | Slumpmässig lastbalansering enligt principen power-of-2-choices                                                                                                                                |
| `random`            | Likformigt slumpmässigt val                                                                                                                                                                    |
| `least-used`        | Välj målet med lägst aktuell belastning                                                                                                                                                        |
| `cost-optimized`    | Minimera kostnaden per begäran utifrån katalogpriser                                                                                                                                           |
| `reset-aware` ⭐    | Prioritera efter tidpunkt för kvotåterställning — korta återställningsfönster rankas högre                                                                                                     |
| `reset-window`      | Föredra mål vars kvotfönster återställs tidigast                                                                                                                                               |
| `headroom`          | Välj målet med störst återstående kvotmarginal                                                                                                                                                 |
| `strict-random`     | Slumpmässigt val utan deduplicering av upprepningar                                                                                                                                            |
| `auto`              | Använd Auto Combo-poängsättning (16 faktorer) — **rekommenderas**                                                                                                                              |
| `lkgp`              | Senast kända fungerande väg (låser till den senaste leverantören som lyckades och faller sedan tillbaka på reglerna)                                                                           |
| `context-optimized` | Välj målet som passar bäst för den aktuella kontextstorleken                                                                                                                                   |
| `cache-optimized`   | Ordna om mål efter affinitet till promptcache — anslutningen som mest sannolikt redan har denna begärans cachade prefix provas först (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Skicka parallellt till en panel av modeller och sammanställ sedan ett svar via en bedömningsmodell (se nedan)                                                                                  |
| `pipeline`          | Kör målen sekventiellt och vidarebefordra varje stegs utdata som indata till nästa steg; endast det slutliga svaret returneras (#6396)                                                         |

⭐ = Nytt i v3.8.0 · 🧬 = Nytt i v3.8.36

### Semantik för `weighted`

`weighted` är ett **proportionellt slumpmässigt val per begäran**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), inte en utjämningsmekanism:

- För varje begäran väljs **ett** steg med sannolikheten `weight / totalWeight`; de återstående stegen
  ordnas efter fallande vikt som reservkedja för den aktuella begäran.
- Ett steg vars vikt är `0` (eller saknas) **väljs aldrig** så länge något annat steg har en
  vikt > 0 — det kan endast fungera som reserv efter att det valda steget har misslyckats. Endast när **alla**
  vikter är 0 blir valet likformigt.
- Steg vars mål inte är tillgängliga — leverantörens kretsbrytare är `OPEN`, anslutningen
  befinner sig i en nedkylningsperiod eller modellen är spärrad — tas bort från urvalet innan det görs
  (`open-sse/services/combo/targetResolution.ts`), så ett enda fungerande steg kan tillfälligt
  vinna varje begäran.
- `stickyWeightedLimit` (kombinationskonfiguration, standardvärde `1` = av) låser det valda steget under så många
  lyckade körningar i följd innan ett nytt val görs.

Använd `round-robin` för strikt rotation; lika vikter med `weighted` ger statistisk — inte
strikt — balans.

## Fusionsstrategi

`fusion` är den enda strategin som **inte** väljer ett enskilt mål. Den skickar prompten
till **varje panelmodell parallellt**, varefter en konfigurerbar **domarmodell** sammanställer
ett enda slutgiltigt svar från alla panelsvar. Porterad från uppströmsprojektet `decolua/9router`
(OpenRouters Fusion-design); implementeringen finns i `open-sse/services/fusion.ts`.

Så fungerar det:

0. **Förbikoppling vid verktyg** — en begäran som innehåller en icke-tom `tools`-array där
   `tool_choice` inte uttryckligen är `"none"` hoppar över panelen helt: den dirigeras direkt till
   en enda modell (den konfigurerade domaren eller `panel[0]`) med `tools`/`tool_choice`
   vidarebefordrade oförändrade. Panelmedlemmarna har ingen åtkomst till verktyg och domarens
   sammanställningsdirektiv avråder från att generera verktygsanrop, så agentbaserade klienter
   och klienter som anropar verktyg får ett verkligt beslut om verktygsanrop i stället för
   sammanställd prosa (#6771).
1. **Utspridning** (endast begäranden utan verktyg) — prompten skickas till alla panelmodeller
   samtidigt, med icke-strömmande läge påtvingat och verktygen borttagna (domaren behöver
   fullständig prosa för att kunna sammanställa).
2. **Insamling med kvorumfrist** — så snart `minPanel` svar har inkommit startar en kort
   respittimer för eftersläntrarna, varefter fusionen fortsätter med det som har samlats in.
   Detta begränsar den långsammaste modellens inverkan på den totala tiden, inom ramen för
   en fast tidsgräns.
3. **Domarsammanställning** — panelsvaren anonymiseras (`Source 1`, `Source 2`, … — så att
   domaren väger innehållet, inte modellvarumärket) och överlämnas till domaren, som analyserar
   samstämmighet / motsägelser / ofullständig täckning / unika insikter / blinda fläckar och
   därefter skriver **ett** auktoritativt svar. Domaranropet behåller klientens ursprungliga
   `stream`-flagga och verktyg, så strömning och efterföljande verktygsanvändning fungerar fortfarande.
4. **Gradvis degradering** — 0 panelsvar → `503`; exakt 1 kvarvarande svar → det svaret
   returneras direkt (det finns inget att fusionera); en panel med en enda modell svarar direkt.

En panelmedlem kan också vara ett `combo-ref`-steg (`{kind: "combo-ref", comboName: "..."}`) som refererar
till en annan combo — den löses upp som **en enda panelröst i form av en svart låda** (en fullständig
rekursiv dirigering till den refererade combon, inte en utspridning till den combons egna mål), med samma
skydd för djup och cykler som alla andra strategier som använder combo-ref redan tillämpar (#6764).

### Konfiguration

Konfigureras i combons `config`-blob (ingen schemamigrering — den återanvänder den befintliga
tabellen `combos`):

| Fält                                     | Typ      | Standardvärde        | Syfte                                                                                     |
| :--------------------------------------- | :------- | :------------------- | :---------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | första panelmodellen | Modell som sammanställer det slutgiltiga svaret                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`                  | Antal lyckade svar som krävs innan respittimern startar (begränsas till `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`               | Hur länge eftersläntrare inväntas efter att kvorum har uppnåtts                           |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`              | Absolut gräns så att en modell som har hängt sig inte kan blockera begäran                |

Standardvärdena finns i `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exempel

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

Anropa den sedan som vilken combo som helst: `{"model":"fusion-panel","messages":[...]}`.

## Virtuell Auto-Combo-fabrik

Auto Combo-motorn kräver inte fördefinierade kombinationer. I stället skapar `open-sse/services/autoCombo/virtualFactory.ts` kandidater dynamiskt:

1. Hämtar `getProviderConnections({ isActive: true })` (alla aktiverade anslutningar)
2. Filtrerar fram dem som har giltiga autentiseringsuppgifter (API-nyckel eller OAuth-token som inte har löpt ut via `hasUsableOAuthToken()`)
3. Jämför med `getProviderRegistry()` för modelltillgänglighet och prissättning
4. Skapar en `VirtualAutoComboCandidate` för varje tupel `(provider, model, connection)`
5. Väljer `connection.defaultModel` (eller registrets första modell) som mål för dirigeringen
6. Poängsätter varje kandidat med `scorePool()` och variantens viktpaket med 16 faktorer
7. Returnerar den resulterande minnesbaserade `AutoComboConfig` till `handleComboChat()` — den lagras aldrig i databasen

Det innebär att **om en ny leverantör läggs till med `auto/*` aktiverat utökas kandidatpoolen automatiskt** — ingen manuell redigering av kombinationer krävs. Den virtuella kombinationen byggs om för varje begäran, så nya anslutningar eller anslutningar som återfått god status tas med omedelbart.

## Självläkning

- **Tillfällig exkludering**: Poäng < 0,2 → exkluderas i 5 min (progressiv backoff, högst 30 min)
- **Medvetenhet om kretsbrytare**: OPEN → exkluderas automatiskt; HALF_OPEN → sonderingsbegäranden
- **Incidentläge**: >50 % OPEN → inaktivera utforskning, maximera stabiliteten
- **Återhämtning efter väntetid**: Efter exkludering är den första begäran en ”sondering” med kortare tidsgräns

## Banditutforskning

5 % av begärandena (konfigurerbart) dirigeras till slumpmässiga leverantörer för utforskning. Inaktiverat i incidentläge.

## API

Det finns **ingen särskild slutpunkt `POST /api/combos/auto`** — Auto-Combo används på två sätt:

1. **Utan konfiguration (rekommenderas):** Skicka valfri begäran om chattkomplettering med `model: "auto"` eller `model: "auto/<variant>"`. Den virtuella fabriken skapar kombinationen för varje begäran — ingen beständig lagring och inga API-anrop krävs.

2. **Beständigt lagrad kombination med `strategy: "auto"`:** Skapa en vanlig kombination via `POST /api/combos` och ange `strategy: "auto"` samt `config.auto.weights` / `config.auto.candidatePool`. Samma poängsättningsmotor används; kombinationen lagras i `combos` och kan återanvändas via ID.

För identifiering listar `GET /api/combos/auto` varje variant med dess upplösta kandidatpool samt `context_length` / `max_output_tokens` — MAX-värdet för fönstren i kandidatpoolen. Klienter (t.ex. opencode-insticksprogrammet) måste annonsera dessa värden i stället för `0`: en kontext på noll inaktiverar opencodes automatiska komprimering helt, vilket gör att sessioner växer tills gatewayens historikrensning förstör kontexten. Det är säkert att annonsera MAX eftersom Auto-Combos kontextförfilter dirigerar överdimensionerade begäranden till kandidater med stora fönster.

```bash
# Användning utan konfiguration (ingen kombination skapas)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Beständigt lagrad automatisk kombination via den vanliga slutpunkten för kombinationer
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategier för automatisk dirigering

Beständigt lagrade kombinationer med `strategy: "auto"` kan ställa in `config.routerStrategy` (eller äldre
`config.auto.routerStrategy`) på något av följande:

- `rules` — viktad standardpoängsättning
- `score` — väljer den högsta konfigurerade viktade poängen. Vid exakt lika resultat bevaras den konfigurerade
  kandidatordningen; befintliga `explorationRate` samplar från hela den rangordnade poolen.
- `cost` / `eco` — billigaste friska leverantören
- `latency` / `fast` — lägsta p95-latens med tillförlitlighetsavdrag
- `sla-aware` / `sla` — prioritera kandidater som uppfyller SLO:er för p95-latens, felfrekvens och valfri
  kostnad
- `lkgp` — senast kända fungerande leverantör först

### Dirigeringsstrategier i detalj

Auto-Combo-motorn tillhandahåller 6 utbytbara **RouterStrategy**-implementationer som
du kan växla mellan via `config.routerStrategy` (eller den äldre `config.auto.routerStrategy`).
Varje strategi väljer en leverantör ur kandidatpoolen utifrån en `RoutingContext`
(uppgiftstyp, verktygs-/visionstips, tokenuppskattning, valfri SLA-policy och valfri
senast kända fungerande leverantör).

#### 1. `rules` (standard) — viktad poängsättning med 16 faktorer

Omsluter den befintliga poängsättningsmotorn. Filtrerar bort kandidater vars kretsbrytare har statusen `OPEN`
och kör sedan `scorePool()` med den aktuella uppgiftstypen och `getTaskFitness()`,
varefter leverantören med högst poäng väljs.

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

**När den ska användas**: Standardalternativet. Använd när du vill ha en balanserad avvägning mellan alla signaler.

**Alias**: `rules` (inget alias)

---

#### 2. `cost` / `eco` — billigaste friska leverantören

Sorterar kandidatpoolen efter `costPer1MTokens` (stigande) och väljer den billigaste.
Filtrerar först bort kandidater med statusen `OPEN`.

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

**När den ska användas**: Kostnadskänsliga arbetslaster, batchbearbetning eller bakgrundsjobb.

**Alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` — lägsta p95-latens med tillförlitlighetsavdrag

Sorterar efter `p95LatencyMs + (errorRate * 1000)`. Straffet för felfrekvens säkerställer att
otillförlitliga leverantörer rankas lägre även om deras nominella latens är låg.

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

**När den bör användas**: Latenskänsliga arbetslaster som realtidschatt, automatisk komplettering eller
interaktiva kodningsassistenter.

**Alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — efterlevnad av SLO för latens/fel/kostnad

Poängsätter varje kandidat efter hur väl den uppfyller den konfigurerade SLO-policyn:

| Faktor           | Vikt | Formel                                                |
| ---------------- | ---- | ----------------------------------------------------- |
| Latenspoäng      | 35%  | `threshold / max(value, ε)`                           |
| Felpoäng         | 35%  | `threshold / max(value, ε)`                           |
| Hälsopoäng       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)     |
| Kostnadspoäng    | 10%  | `threshold / max(value, ε)` eller omvänt normaliserad |
| Stabilitetspoäng | 5%   | omvänt normaliserad standardavvikelse för latens      |

När `hardConstraints: true` sorteras kandidaterna i första hand efter **överträdelsepoäng**
(hur mycket de överskrider en SLO), och därefter efter sammansatt poäng. Annars används endast
den sammansatta poängen.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... poängsätter varje kandidat mot policyn: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-fält** (anges i kombinationskonfigurationen):

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

**När den bör användas**: Produktionsarbetslaster med strikta budgetar för latens, felfrekvens eller kostnad.

**Alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — senast kända fungerande leverantör först

Provar först den **senast kända fungerande leverantören** (om en sådan har angetts) och faller sedan tillbaka på
strategin `rules`. Användbart för sessionsaffinitet — samma leverantör hanterar
uppföljningsförfrågningar i en konversation.

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

    // Faller tillbaka på strategin rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**När den bör användas**: Konversationer med flera turer där samma leverantör ska hantera
uppföljningsförfrågningar (t.ex. för cachning, kontextkontinuitet eller konsekvent prissättning).

**Alias**: `lkgp` (inget annat alias)

---

### Anpassade routerstrategier

Du kan registrera en egen implementation av `RouterStrategy` via det publika API:et:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Din routningslogik här
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

Använd den sedan:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guide för val av routerstrategi

| Användningsfall       | Strategi    | Orsak                                             |
| --------------------- | ----------- | ------------------------------------------------- |
| Balanserad arbetslast | `rules`     | Standard — tar hänsyn till alla faktorer          |
| Minimera kostnad      | `cost`      | Väljer alltid den billigaste                      |
| Minimera latens       | `latency`   | Väljer den snabbaste pålitliga leverantören       |
| Strikta SLO:er        | `sla-aware` | Filtrerar efter tröskelvärden för p95/fel/kostnad |
| Chatt med flera turer | `lkgp`      | Sessionsaffinitet                                 |

SLA-medvetna fält:

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

## Uppgiftslämplighet

Över 30 modeller har poängsatts inom 6 uppgiftstyper (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Stöder jokerteckenmönster (t.ex. `*-coder` → högt kodningsresultat).

## Sammanfattning av automatiska varianter

Inklusive enbart `auto` (standard) samt de 6 `AutoVariant`-värdena som deklareras i `autoPrefix.ts` finns det **7 anropbara modell-ID:n**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` i sig räknar upp 6 värden; det sjunde alternativet är ”ingen variant” — enbart `auto` — som hanteras av `parseAutoPrefix()` som `variant: undefined`.)

## Hur nivåer passar in i Auto-Combo

Poängfunktionen med 16 faktorer (`open-sse/services/autoCombo/scoring.ts`) behandlar nivåmedlemskap som två signaler: `tierPriority` (0.0476) och `tierAffinity` (0.0476). Se den kanoniska [tabellen över poängfaktorer](#how-it-works-persisted-auto-combos) ovan för hela uppsättningen `DEFAULT_WEIGHTS` — åsidosättningarna per paket (ship-fast/cost-saver/quality-first/offline-friendly) anges i tabellen ”Viktprofiler per paket”.

Enbart nivå tvingar **inte** nivå 1 att väljas först — om latensen för nivå 1 är dålig eller förhållandet mellan kostnad och kvalitet är suboptimalt vinner nivå 2. Om du vill tvinga fram nivåordning använder du kombinationsstrategin `priority` och ordnar leverantörerna efter nivå.

Öka vikten för `tierPriority` för att tydligt prioritera nivå 1 (prenumeration):

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Se `docs/marketing/TIERS.md` för nivådefinitioner och leverantörsklassificering.

## Testning och täckning

### Deterministisk matris för routningsbeslut (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` verifierar routnings**beslutet** för alla 19 offentliga strategier från början till slut genom den verkliga kombinationspipelinen med en simulerad uppströmsleverantör. Täckningen omfattar:

- Alla 19 `ROUTING_STRATEGY_VALUES`-strategier (ordered, weighted, cost, context, fusion, …).
- `quota-share` (intern) från början till slut: DRR-rättvisa + nedprioritering vid mättnad via den verkliga `selectQuotaShareTarget`-skarven (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay`-täckning för universell överlämning för varje antal mål.

Den här testsviten körs i CI (`test:integration`-jobbet) med `--test-concurrency=1` och `--test-force-exit`, så att den är deterministisk och inte kräver autentiseringsuppgifter för livetjänster.

### Villkorad röktestning mot livetjänster (INTE i CI — verkliga leverantörer)

| Kommando                               | Vad det gör                                                                                                 |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Verklig routning i processen med `RUN_COMBO_LIVE=1`; skapar en ögonblicksbild av en aktiv OmniRoute-databas |
| `npm run test:combo:live:vps`          | HTTP-anrop mot en aktiv OmniRoute-server (ange `COMBO_LIVE_BASE_URL`)                                       |
| `npm run test:combo:live:vps:failover` | Samma sak, med avsiktliga redundansväxlingsscenarier                                                        |

Dessa röktester testar den verkliga kommunikationsvägen (kombination → leverantör → slutförande). De är avsiktligt undantagna från CI eftersom de kräver autentiseringsuppgifter för livetjänster och VPS-åtkomst.

---

## Filer

| Fil                                                       | Syfte                                                                                                               |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`                  | Poängsättningsfunktion med 16 faktorer, `DEFAULT_WEIGHTS`, poolnorm                                                 |
| `open-sse/services/autoCombo/taskFitness.ts`              | Uppslagning av lämplighet för modell × uppgift                                                                      |
| `open-sse/services/autoCombo/engine.ts`                   | Urvalslogik, bandit, budgettak                                                                                      |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exkludering, sonderingar, incidentläge                                                                              |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 viktprofiler (snabb leverans, kostnadsbesparing, kvalitet först, offlinevänlig, tillförlitlighet först, kaosläge) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser för prefixet `auto/` + 6 varianter                                                                           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Skapar `AutoComboConfig` i minnet från aktiva anslutningar                                                          |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testkrok för att mocka leverantörsregistret                                                                         |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategier)                                                                           |
| `src/sse/handlers/chat.ts`                                | Integration: kortslutning för auto-prefix                                                                           |
