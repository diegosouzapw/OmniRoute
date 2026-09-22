# 🗜️ Prompt Compression Guide — OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spara automatiskt 15–95 % av berättigad kontext. En snabb översikt finns i [README-avsnittet om komprimering](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Översikt

OmniRoute implementerar en modulär pipeline för promptkomprimering som körs **proaktivt** innan förfrågningar når externa leverantörer. Det innebär att tokenbesparingarna sker transparent — inga ändringar krävs i ditt arbetsflöde.

```
Klientförfrågan
  → Val av komprimeringsstrategi
    → Åsidosättning via kombination? → Använd kombinationsinställningen
    → Tröskelvärde för automatisk aktivering? → Använd automatiskt läge
    → Standardläge? → Använd global inställning
    → Av? → Hoppa över komprimering
  → Valt komprimeringsläge
    → Av: Ingen komprimering
    → Lätt: Säker rensning av blanksteg/formatering (~15 %)
    → Standard: Borttagning av utfyllnad i telegramstil (~30 %)
    → Aggressiv: Åldring av historik + sammanfattning (~50 %)
    → Ultra: Heuristisk gallring + uttunning av kodblock (~75 %)
    → RTK: Kommandomedveten filtrering av terminal-/verktygsutdata (60–90 % av externt intervall)
    → Staplad: Ordnad pipeline med flera motorer, vanligtvis RTK följt av Caveman (78–95 % av berättigat intervall)
  → Komprimerad förfrågan → Leverantör
```

---

## Komprimeringslägen

### Av

Ingen komprimering tillämpas. Alla meddelanden skickas vidare oförändrade.

### Lätt läge (~15 % besparing, <1 ms latens)

Det säkraste läget — ingen semantisk förändring, endast rensning av formatering:

| Teknik                   | Beskrivning                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `collapseWhitespace`     | Slår samman efterföljande tomrader och avslutande blanksteg |
| `dedupSystemPrompt`      | Tar bort duplicerade systemmeddelanden                      |
| `compressToolResults`    | Komprimerar utförliga verktygs-/funktionsutdata             |
| `removeRedundantContent` | Tar bort upprepade instruktioner                            |
| `replaceImageUrls`       | Förkortar base64-data-URI:er för bilder                     |

**Bäst för:** Kontinuerlig användning och säkerhetskritiska arbetsflöden.

### Standardläge (~30 % besparing)

Inspirerat av [Caveman](https://github.com/JuliusBrussee/caveman) — tar bort utfyllnadsord och omständliga formuleringar samtidigt som innebörden bevaras:

- Tar bort utfyllnadsord ("please", "I think", "basically", "actually")
- Förkortar omständliga fraser ("in order to" → "to", "as a result of" → "because")
- Tar bort artiga garderingar ("Would you mind...", "If you could possibly...")
- Över 30 regex-regler anpassade för kodningsprompter

**Bäst för:** Dagliga arbetsflöden för kodning och kostnadsmedvetna team.

### Aggressivt läge (~50 % besparing)

Smart hantering av historik för långa sessioner:

- **Åldring av meddelanden** — äldre meddelanden komprimeras successivt
- **Sammanfattning av verktygsresultat** — långa verktygsutdata ersätts med sammanfattningar
- **Skydd för strukturell integritet** — säkerställer att par av `tool_use` + `tool_result` förblir konsekventa
- **Medvetenhet om kontextfönster** — respekterar tokensgränser för respektive modell

**Bäst för:** Längre felsökningssessioner och stora kodbaser.

### Ultraläge (~75 % besparing)

Maximal komprimering för scenarier där tokens är kritiska:

- **Heuristisk gallring** — tar bort meddelanden under relevanströskeln
- **Uttunning av kodblock** — komprimerar repetitiva kodexempel
- **Trunkering med binärsökning** — hittar den optimala brytpunkten för kontextfönstret
- Alla funktioner från aggressivt läge ingår

**Bäst för:** När du upprepade gånger når kontextgränserna.

### RTK-läge (60–90 % av externt intervall)

RTK-läget är optimerat för utförliga verktygsutdata som förekommer i sessioner med kodningsagenter:

- Identifierar kommando-/utdataklasser som `git status`, `git diff`, `git log`, testkörare,
  TypeScript/Vite/Webpack-byggen, ESLint/Biome/Prettier, npm-granskningar/-installationer, Docker-loggar, infrastrukturutdata
  och generiska skalutdata
- Tillämpar JSON-filterpaket från `open-sse/services/compression/engines/rtk/filters/`
- Importerar RTK-filter med TOML-schema v1 från projektets eller globala `filters.toml`-filer, med validering
  genom infogade tester och förtroendestyrning för projektfiler
- Levereras med 49 inbyggda filter med infogade verifieringsexempel
- Tar bort ANSI-kontrollsekvenser, förloppsindikatorer, upprepade rader och icke-åtgärdsbar brustext
- Bevarar misslyckanden, fel, varningar, ändrade filer, sammanfattningar och slutet av långa utdata
- Stöder förtroendestyrda projektfilter, globala filter och valfri återställning av råutdata med maskerade känsliga uppgifter

**Bäst för:** Agentsessioner med transkript från skal, byggen, tester, git, grep och filutdata.

### Staplat läge (78–95 % av berättigat intervall)

Staplat läge kör flera komprimeringsmotorer i en deterministisk ordning. Standardpipelinen är:

```txt
RTK -> Caveman
```

Den ordningen gör först terminal-/verktygsutdata kompakta och tillämpar sedan Cavemans semantiska kondensering på
den återstående prompten i naturligt språk. Staplade pipelines kan konfigureras globalt eller genom
komprimeringskombinationer som tilldelats routningskombinationer.

**Bäst för:** Blandad kontext med stora verktygsloggar samt mänskliga instruktioner eller assistentsammanfattningar.

---

## Beräkning av besparingar från upstream-projekt

OmniRoute dokumenterar komprimeringsbesparingar från två källor: benchmarks från upstream-projekt och
OmniRoutes egen motorsammansättning.

| Källa   | Siffra från upstream-projektets README som används här                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` färre utdatatoken, `65%` genomsnittlig utdatasbesparing i benchmarks, intervallet `22-87%` och ett verktyg för `~46%` indatakomprimering |
| RTK     | `60-90%` besparing på kommandoutdata; exempelsession med `~118,000 -> ~23,900` token, eller `79.7%` besparing (`~80%`)                          |

För överlappande verktygs-/kontextnyttolaster staplar OmniRoutes standardkombination motorerna:

```txt
RTK -> Caveman
```

De kombinerade besparingarna är multiplikativa, inte additiva:

```txt
kombinerat = 1 - (1 - RTK-besparing) * (1 - Caveman-indatabesparing)
genomsnitt = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervall  = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Siffran `78-95%` gäller när både RTK och Caveman kan reducera samma indata-/kontextnyttolast.
Cavemans läge för svarsutdata är separat: när det är aktiverat används Cavemans egna utdatabesparingar (`65%`
i genomsnitt, `~75%` som huvudbudskap och intervallet `22-87%`). Den totala faktureringsbesparingen beror på din blandning av promptar och utdata.

### Vad ”berättigad” faktiskt innebär

Det angivna intervallet 15–95 % är verkligt, men det gäller endast **redundant eller utförligt** innehåll — upprepade
felrader, en bygglogg som spammar samma varning eller en överdimensionerad `grep`-/filläsningsdump. Det
betyder **inte** att varje begäran sparar så mycket.

Empiriskt verifierat (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): en
`stacked`-körning (RTK + Caveman) mot ett Anthropic-format `tool_result`-block med 300 identiska
felrader gav **95.93% tokenbesparing / 96.26% teckenbesparing** — helt inom det marknadsförda
intervallet. Men när samma pipeline körs mot normala, icke-redundanta verktygsutdata (en ren lista med `grep`-träffar,
en kort filläsning eller vanlig samtalstext) ger den korrekt **nära noll i besparing**, eftersom
det inte finns något repetitivt att ta bort och `validateCompression()` (`validation.ts`) vägrar att leverera en
omskrivning som skulle ta bort eller ändra kodblock, URL:er, rubriker, versioner eller konstantidentifierare med ENBART VERSALER.

Detta är förväntat och säkert beteende, inte en bugg: en kodningssession som huvudsakligen läser/söker med grep i rena filer får
måttliga totala besparingar även när komprimering är fullt aktiverad, medan en session som fastnar i en misslyckad
loop eller använder en pratsam linter får hela intervallet 78–95 % för den trafiken. Använd inte en enskild sessions
låga sammanlagda besparingsprocent som bevis för att komprimeringen är felkonfigurerad — kontrollera först om
de underliggande verktygsutdata faktiskt var redundanta.

---

## Visualisering av tokenbesparingar

```
Utan komprimering: 47K token skickade till LLM
Med Lite:          40K token skickade          (15% sparat — säkert, alltid aktiverat)
Med Standard:      33K token skickade          (30% sparat — regler för caveman-speak)
Med Aggressive:    24K token skickade          (50% sparat — åldring + sammanfattning)
Med Ultra:         12K token skickade          (75% sparat — heuristisk beskärning)
Med RTK:           19K-5K token skickade       (60-90% sparat på kommando-/verktygsutdata)
Med Stacked:       10K-2.5K token skickade     (78-95% berättigat intervall för RTK+Caveman)
```

---

## Konfiguration

### Kontrollpanel

Gå till `Dashboard → Context & Cache`:

- **Caveman** — val av läge, språkpaket, förhandsgranskning och globala standardinställningar
- **RTK** — förhandsgranskning av kommandofilter, säkerhetsinställningar för RTK och filterkatalog
- **Compression Combos** — namngivna motorpipelines som tilldelas routningskombinationer
- **Auto-Trigger Threshold** — aktiverar automatiskt komprimering när antalet tokens överskrider tröskelvärdet

### Åsidosättning per kombination

I `Dashboard → Context & Cache → Compression Combos` tilldelar du en komprimeringskombination till en
routningskombination:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Detta gör att du kan använda staplad komprimering för kostnadsfria leverantörer och kodningsleverantörer,
samtidigt som du behåller lite-läget för betalda abonnemang.

Denna tilldelning för ”Åsidosättning per kombination” är en annan inställning än åsidosättningen av
**routningskombinationens komprimeringsläge** (Default/Off/Lite/Standard/Aggressive/Ultra) — den
åsidosättningen väljer inte en namngiven pipeline för en komprimeringskombination, utan anger endast
fältet `compressionMode` som används av `resolveCompressionPlan`. Den kan anges antingen på
kombinationskortet (`Dashboard → Combos`) eller, sedan #6760, per routningskombination i listan
”Assign to routing” under `Dashboard → Context & Cache → Compression Combos`, precis bredvid
kryssrutan för pipelinetilldelning som dokumenteras ovan. Båda gränssnitten sparar via samma
slutpunkt, `PUT /api/combos/{id}`.

### Åsidosättning per begäran

Skicka begäranderubriken `x-omniroute-compression` för att åsidosätta komprimeringsplanen för en
enskild begäran. Den har högst prioritet — den gäller framför åsidosättningen för routningskombinationen,
den aktiva profilen, automatisk aktivering och panelens standardinställning. Okända värden ignoreras
(begäran avvisas aldrig), och den globala huvudbrytaren styr fortfarande allt: när komprimering är
globalt avstängd kan rubriken inte aktivera den. Värden:

| Värde         | Effekt                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering för denna begäran.                                                           |
| `default`     | Standardprofilen som härleds från panelen (ignorerar den aktiva profilen).                      |
| `engine:<id>` | En enskild motor när den är aktiverad, t.ex. `engine:rtk`.                                      |
| `<combo>`     | En namngiven kombination, först matchad efter namn (skiftlägesokänsligt) och därefter efter id. |

Den tillämpade planen returneras i svarsrubriken
`X-OmniRoute-Compression: <mode>; source=<source>`, där `<source>` är ett av `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

### API

```bash
# Hämta komprimeringsinställningar
curl http://localhost:20128/api/settings/compression

# Uppdatera komprimeringsinställningar
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Förhandsgranska en specifik RTK-/staplad nyttolast
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Lista RTK-filterpaket
curl http://localhost:20128/api/context/rtk/filters

# Testa RTK direkt med valfria kommandometadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Vad som skyddas

Komprimeringsmotorn **bevarar alltid:**

- ✅ Kodblock (inhägnade och infogade)
- ✅ URL:er och filsökvägar
- ✅ JSON-strukturer och strukturerade data
- ✅ Identifierare och skyddade tekniska token
- ✅ Matematiska uttryck
- ✅ Definitioner av verktygs-/funktionsanrop
- ✅ Systeminstruktioner (i lite-läge)

RTK:s återställning av råutdata maskerar vanliga API-nycklar, bearer-token, Slack-token, AWS-åtkomstnycklar,
lösenord, token och hemligheter innan något lagras.

---

## Komprimeringsstatistik

Varje komprimerad begäran inkluderar statistik i serverloggarna:

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

## Färdplan för faser

| Fas    | Lägen                                                                                                                                                            | Status      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Fas 1  | Av, Lite                                                                                                                                                         | ✅ Lanserad |
| Fas 2  | Standard, Aggressiv, Ultra                                                                                                                                       | ✅ Lanserad |
| Fas 3  | RTK, Staplad, komprimeringskombinationer                                                                                                                         | ✅ Lanserad |
| Fas 4  | Utdatastilar, Ultra på SLM-nivå, eval-ramverk                                                                                                                    | ✅ Lanserad |
| Fas 4C | Adaptiv kontextbudget (”reglage”) — beräkningsmotor + API (`contextBudget` på `PUT /api/settings/compression`) + kontroller för läge/policy på instrumentpanelen | ✅ Lanserad |

---

## Erkännanden

Komprimeringsreglerna för standardläget är inspirerade av **[Caveman](https://github.com/JuliusBrussee/caveman)** av **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virala projektet ”why use many token when few token do trick”. Caveman rapporterar `~75%` färre token i utdata, en genomsnittlig besparing av token i utdata på `65%` i benchmarktester, ett utdataintervall på `22-87%` och ett verktyg för indatakomprimering på `~46%`.

RTK-läget är inspirerat av **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** av **[RTK AI](https://github.com/rtk-ai)** — det högpresterande projektet för komprimering av kommandoutdata för filtrering av terminal-, bygg-, test-, git- och verktygsutdata. RTK rapporterar besparingar på `60-90%`, där exempelsessionen i dess README visar en besparing på `~80%`.

---

## Avancerade komprimeringssystem

Utöver de 7 standardlägena innehåller OmniRoute flera avancerade komprimeringssystem
som fungerar automatiskt utifrån kontexten.

### Cachemedveten komprimering

Vissa leverantörer (som Anthropic med promptcachelagring) stöder **promptcachelagring**,
vilket gör att de kan cachelagra delar av prompten för att minska kostnader och latens. När
cachelagring är aktiverad kan aggressiv komprimering faktiskt **försämra** prestandan
eftersom den ändrar de cachelagrade token, vilket ogiltigförklarar cachen.

Modulen `cachingAware.ts` löser detta genom att **identifiera cachelagringskontexten** och
**anpassa komprimeringsstrategin** därefter.

#### Så fungerar det

1. **Identifiera cachelagringskontext** — Söker igenom begärans kropp efter `cache_control`-markörer
2. **Identifiera cachelagringsleverantörer** — Kontrollerar om målleverantören stöder cachelagring
3. **Anpassa strategin** — Nedgraderar `aggressive`/`ultra` till `standard` för cachelagringsleverantörer
4. **Hoppa över systeminstruktionen** — Systeminstruktioner cachelagras vanligtvis, så komprimera dem inte
5. **Använd deterministiska transformationer** — Använd endast transformationer som ger konsekvent utdata

#### Kodexempel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cachemarkör
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### När det ska användas

Cachemedveten komprimering är **alltid aktiverad** — ingen konfiguration behövs. Den aktiveras endast
när:

- Begäran har `cache_control`-markörer
- Målleverantören stöder promptcachelagring (Anthropic, OpenAI osv.)

### Progressivt åldrande

Långa konversationer samlar på sig många meddelandeomgångar, men äldre omgångar blir mindre
relevanta. Modulen `progressiveAging.ts` **försämrar meddelanden utifrån avståndet i antal omgångar**:

- **Senaste omgångarna (0-3)**: Bevaras ordagrant (fullständig detaljnivå)
- **Mellangamla omgångar (4-8)**: Lite-komprimering (rensning av blanksteg och formatering)
- **Gamla omgångar (9+)**: Caveman-komprimering (borttagning av utfyllnad, sammanfattning)
- **Mycket gamla omgångar (20+)**: Sammanfattas kraftigt eller tas bort

#### Kodexempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... ytterligare 50 omgångar ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // De första 3 omgångarna: ordagrant
  light: 8, // Omgång 4–8: lite-komprimering
  moderate: 20, // Omgång 9–20: caveman-komprimering
  // Omgång 21+: kraftig sammanfattning
});

// saved = antal sparade token
```

#### När det ska användas

Progressiv åldring är **alltid aktiverad** för lägena `aggressive` och `ultra`. Den är
särskilt effektiv för:

- Långvariga kodningssessioner
- Konversationer som pågår i flera dagar
- Agentbaserade arbetsflöden med många verktygsanrop

### Grottmänniskoläge för utdata

Modulen `outputMode.ts` injicerar **instruktioner i systemprompten** för att få
modellen att själv producera komprimerade, kortfattade utdata (en "grottmänniskostil").

#### Så fungerar det

I stället för att komprimera indata lägger det här läget till en systemprompt som:

> "Svara med minsta möjliga antal ord. Hoppa över artighetsfraser. Använd korta meningar."

Det fungerar särskilt bra för:

- Kodgenerering (kortare utdata = färre token)
- Snabba frågor och svar (inget behov av utförliga förklaringar)
- Batchbearbetning (maximera genomströmningen)

#### När det ska användas

Grottmänniskoläget för utdata är **valfritt** — ange det via kombinationskonfigurationen:

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

### Utdatastilar (katalog)

Grottmänniskoläget för utdata ovan är den **äldre vägen med en enda stil**. Fas 4 generaliserade det
till en katalog med kombinerbara utdatastilar: `OUTPUT_STYLE_CATALOG` i
`open-sse/services/compression/outputStyles/catalog.ts`. Varje stil är en systempromptinstruktion
som får modellen att själv producera billigare utdata. Stilar kan aktiveras
tillsammans och injiceras i katalogordning.

| Stil                             | `id`          | Vad den gör                                                                                                                                                                                                                            | Instruktionsspråk                                                              |
| -------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Kortfattad prosa                 | `terse-prose` | Tar bort utfyllnad/artiklar/reservationer och behåller det tekniska innehållet exakt. Samma text som i det äldre grottmänniskoläget för utdata (refererad, inte återgiven på nytt).                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Mindre kod                       | `less-code`   | YAGNI-trappa: minsta fungerande ändring, inga abstraktioner som inte efterfrågats.                                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Hästsvans (lat seniorutvecklare) | `ponytail`    | "Den bästa koden är koden som aldrig skrevs": återanvändning > omskrivning, grundorsak > symptom, kortaste fungerande diff.                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Jag har ADHD (handling först)    | `i-have-adhd` | Handling först (kommando/sökväg/kodavsnitt före prosa), numrerade avgränsade steg, ETT konkret nästa steg, ingen inledning/sammanfattning/avslutning. Anpassad från [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Kortfattad CJK (文言)            | `terse-cjk`   | Ultrakortfattad stil på klassisk kinesiska.                                                                                                                                                                                            | zh (språkvariantbegränsad: erbjuds endast när det fastställda språket är `zh`) |

Varje stil har tre intensitetsnivåer — `lite`, `full`, `ultra` — och varje nivå
avslutas med den gemensamma begränsningsklausulen, som bevarar kodblock, filsökvägar, kommandon,
felsträngar, URL:er och identifierare ordagrant.

#### Så fungerar injiceringen

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) matchar
valet mot katalogen (okända id:n och stilar som inte matchar språkvarianten
tas bort utan att något fel uppstår), sammanfogar de valda instruktionerna i katalogordning,
lägger till begränsningsklausulen **en gång** och placerar resultatet först i systemprompten
bakom en enda idempotensmarkör (`[OmniRoute Output Styles]`) — ytterligare tillämpningar
gör ingenting. När det identifierade språket i begäran har en översättning injiceras
den lokaliserade instruktionen i stället för den engelska.

#### Så aktiverar du funktionen

I kontrollpanelen: **Kontext → Inställningar → Komprimering** — en rad per stil med en
på/av-knapp och en nivåväljare. Programmatiskt sparar komprimeringskonfigurationen
valet som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Bakåtkompatibilitet: den äldre kombinationsinställningen `outputMode: "caveman"` fungerar fortfarande och mappas till
`terse-prose`, byte-identiskt med den gamla injiceringen på alla äldre språk.

Språkval: när `languageConfig.enabled` är aktiverat väljer `autoDetect`
språket i det senaste användarmeddelandet (samma detektor som indatamotorerna).
Om `autoDetect` inaktiveras låses `defaultLanguage`. Av → engelska.

Matrisen stil × språk är fixerad genom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: en ny stil kan inte levereras
utan åtminstone en pt-BR-översättning (eller ett uttryckligt spårat undantag), och en
befintlig stil kan inte obemärkt förlora en språkvariant. Information om hur du lägger till en stil finns i
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprimering av verktygsresultat

Modulen `toolResultCompressor.ts` tillhandahåller **5 specialiserade komprimeringsstrategier**
för verktygsresultat (funktionsanrop, agentutdata, sökresultat osv.):

1. **Komprimering av sökresultat** — Tar bort redundanta resultat och behåller de N främsta
2. **Komprimering av filläsning** — Trunkerar stora filer och bevarar huvuden/importer
3. **Komprimering av kodkörning** — Behåller endast nödvändiga stdout/stderr
4. **Komprimering av databasfrågor** — Begränsar rader och tar bort utförliga metadata
5. **Komprimering av API-svar** — Tar bort null-fält och sammanfattar arrayer

#### När det ska användas

Komprimering av verktygsresultat är **alltid aktiverad** när verktygsanrop förekommer. Ingen
konfiguration behövs.

### Staplad pipeline

Det staplade läget kör **flera motorer i följd** — vanligtvis RTK först
(60–90 % besparing på verktygsutdata), därefter Caveman (ytterligare 30 % besparing på den
återstående texten). Detta ger **78–95 % total besparing**.

#### Så fungerar det

```
Indata (1000 token)
  → RTK (kommandomedvetet filter) → 200 token
    → Caveman (borttagning av utfyllnad) → 140 token
  → Utdata (140 token, 86 % besparing)
```

#### När det ska användas

Använd staplat läge för:

- Verktygstunga arbetsflöden (agentbaserad kodning, forskning)
- Kostnadskänslig batchbearbetning
- När du behöver maximala tokenbesparingar

Konfigurera via kombinationskonfigurationen:

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

## Åsidosättningar av komprimeringskombinationer

Du kan åsidosätta det globala komprimeringsläget **per kombination** för att finjustera beteendet
för olika användningsfall:

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

Detta är användbart för:

- **Kodningskombinationer**: Använd läget `aggressive` för långa sessioner
- **Kombinationer för snabba frågor och svar**: Använd läget `lite` för snabba svar
- **Verktygsintensiva kombinationer**: Använd läget `stacked` för maximala besparingar
- **Produktionskombinationer**: Använd läget `cache-aware` för leverantörer med cachning

---

## Se även

- [Miljökonfiguration](../reference/ENVIRONMENT.md) — Miljövariabler för komprimering
- [Arkitekturguide](../architecture/ARCHITECTURE.md) — Komprimeringspipelinen internt
- [Användarguide](../guides/USER_GUIDE.md) — Kom igång med komprimering
- [RTK-komprimering](./RTK_COMPRESSION.md) — RTK-filter, tillitsmodell, verifieringsgrind och återställning av rådata
- [Komprimeringsmotorer](./COMPRESSION_ENGINES.md) — Caveman, RTK, stapling, API:er, MCP och instrumentpanel
- [Format för komprimeringsregler](./COMPRESSION_RULES_FORMAT.md) — JSON-format för regelpaket
- [Språkpaket för komprimering](./COMPRESSION_LANGUAGE_PACKS.md) — Språkspecifika Caveman-regler
