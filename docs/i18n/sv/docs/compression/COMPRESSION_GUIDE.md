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

Navigera till `Kontrollpanel → Kontext & Cache`:

- **Caveman** — val av läge, språkpaket, förhandsgranskning och globala standardinställningar
- **RTK** — förhandsgranskning av kommando-filter, RTK säkerhetsinställningar och filterkatalog
- **Komprimeringskombinationer** — namngivna motorpipelines tilldelade routingkombinationer
- **Automatisk utlösningsgräns** — aktiverar automatiskt komprimering när antalet tokens överskrider gränsen

### Åsidosättning per kombination

I `Kontrollpanel → Kontext & Cache → Komprimeringskombinationer`, tilldela en komprimeringskombination till en routingkombination:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Detta gör att du kan använda staplad komprimering på gratis/kodningsleverantörer samtidigt som du behåller lite-läge på betalda prenumerationer.

Denna "åsidosättning per kombination"-tilldelning är en annan kontroll än åsidosättningen av **routing-kombinationskomprimeringsläget** (Default/Off/Lite/Standard/Aggressive/Ultra) — den åsidosättningen väljer inte en namngiven komprimerings-kombinationspipeline; den ställer bara in fältet `compressionMode` som `resolveCompressionPlan` konsulterar. Den kan ställas in antingen på kombinationskortet (`Kontrollpanel → Kombinationer`) eller, sedan #6760, per routingkombination i listan "Tilldela till routing" på `Kontrollpanel → Kontext & Cache → Komprimeringskombinationer`, precis bredvid kryssrutan för pipeline-tilldelning som dokumenterats ovan. Båda ytorna sparas via samma `PUT /api/combos/{id}`-slutpunkt.

### Åsidosättning per förfrågan

Skicka `x-omniroute-compression` förfrågningshuvudet för att åsidosätta komprimeringsplanen för en enskild förfrågan. Det har högst prioritet — det slår routing-kombinationsåsidosättningen, den aktiva profilen, auto-utlösaren och panelens standardinställning. Okända värden ignoreras (förfrågan avvisas aldrig) och den globala huvudströmbrytaren styr fortfarande allt: när komprimering är avstängd globalt kan huvudet inte slå på den. Värden:

| Värde         | Effekt                                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering för denna förfrågan.                                                                      |
| `default`     | Den panel-härledda standardprofilen (ignorerar den aktiva profilen). Förlustfyllda motorer är avstängda.     |
| `safe`        | Samma som att utelämna huvudet: endast deduplicering och hopfällning av blanksteg.                           |
| `allow-lossy` | Behåll denna förfrågans operatörsplan, inklusive sammanfattningar, relevansfilter och stilomskrivningar.     |
| `engine:<id>` | En enskild motor när den är aktiverad, t.ex. `engine:rtk`. Detta är den per-förfrågan opt-in för den motorn. |
| `<combo>`     | En namngiven kombination, matchad efter namn (skiftlägesokänsligt) först, sedan efter id.                    |

Utan `allow-lossy`, `engine:<id>` eller en namngiven kombination tillämpas inte förlustfyllda motorer. Förfrågan får fortfarande sessionsdeduplicering och hopfällning av blanksteg när komprimering är på.

Den tillämpade planen återges i `X-OmniRoute-Compression: <mode>; source=<source>` svarsrubriken, där `<source>` är en av `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

### API

```bash
# Hämta komprimeringsinställningar
curl http://localhost:20128/api/settings/compression

# Uppdatera komprimeringsinställningar
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Förhandsgranska en specifik RTK/staplad nyttolast
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Lista RTK filterpaket
curl http://localhost:20128/api/context/rtk/filters

# Testa RTK direkt med valfri kommandometadata
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

## Fasplan

| Fas    | Lägen                                                                                                                                                       | Status       |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Fas 1  | Off, Lite                                                                                                                                                   | ✅ Levererad |
| Fas 2  | Standard, Aggressive, Ultra                                                                                                                                 | ✅ Levererad |
| Fas 3  | RTK, Stacked, Compression Combos                                                                                                                            | ✅ Levererad |
| Fas 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                 | ✅ Levererad |
| Fas 4C | Adaptiv kontextbudget ("ratt") — beräkningsmotor + API (`contextBudget` on `PUT /api/settings/compression`) + kontroller för instrumentpanelens läge/policy | ✅ Levererad |

---

## Erkännanden

Komprimeringsreglerna för standardläget är inspirerade av **[Caveman](https://github.com/JuliusBrussee/caveman)** av **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virala projektet ”why use many token when few token do trick”. Caveman rapporterar `~75%` färre token i utdata, en genomsnittlig besparing av token i utdata på `65%` i benchmarktester, ett utdataintervall på `22-87%` och ett verktyg för indatakomprimering på `~46%`.

RTK-läget är inspirerat av **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** av **[RTK AI](https://github.com/rtk-ai)** — det högpresterande projektet för komprimering av kommandoutdata för filtrering av terminal-, bygg-, test-, git- och verktygsutdata. RTK rapporterar besparingar på `60-90%`, där exempelsessionen i dess README visar en besparing på `~80%`.

---

## Avancerade kompressionssystem

Utöver de 7 standardlägena inkluderar OmniRoute flera avancerade kompressionssystem som fungerar automatiskt baserat på kontext.

### Cache-medveten komprimering

Vissa leverantörer (som Anthropic med prompt-caching) stöder **prompt-caching**, vilket gör att de kan cacha delar av prompten för att minska kostnader och latens. När caching är aktiverat kan aggressiv komprimering faktiskt **skada** prestandan eftersom den ändrar de cachade tokenen, vilket ogiltigförklarar cachen.

Modulen `cachingAware.ts` löser detta genom att **upptäcka caching-kontext** och **justera komprimeringsstrategin** därefter.

#### Hur det fungerar

1.  **Upptäck caching-kontext** — Skannar förfrågningskroppen efter `cache_control`-markörer
2.  **Identifiera caching-leverantörer** — Kontrollerar om målleverantören stöder caching
3.  **Justera strategi** — Nedgraderar `aggressive`/`ultra` till `standard` för caching-leverantörer
4.  **Hoppa över systemprompt** — Systemprompter cachas vanligtvis, så komprimera dem inte
5.  **Använd deterministiska transformationer** — Använd endast transformationer som producerar konsekvent utdata

#### Kodexempel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache-markör
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### När ska det användas

Cache-medveten komprimering är **alltid på** — ingen konfiguration behövs. Den aktiveras endast när:

- Förfrågan har `cache_control`-markörer
- Målleverantören stöder prompt-caching (Anthropic, OpenAI, etc.)

### Progressiv åldring

Långa konversationer ackumulerar många meddelandeomgångar, men äldre omgångar blir mindre relevanta. Modulen `progressiveAging.ts` **degraderar meddelanden baserat på omgångsavstånd**:

- **Nyliga omgångar (0-3)**: Behålls ordagrant (fullständig detalj)
- **Medelålders omgångar (4-8)**: Lätt komprimering (mellanslag, formateringsrensning)
- **Gamla omgångar (9+)**: Grottmanskomprimering (borttagning av utfyllnad, sammanfattning)
- **Mycket gamla omgångar (20+)**: Kraftigt sammanfattade eller borttagna

#### Kodexempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 fler omgångar ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Första 3 omgångarna: ordagrant
  light: 8, // Omgångar 4-8: lätt komprimering
  moderate: 20, // Omgångar 9-20: grottmanskomprimering
  // Omgångar 21+: kraftig sammanfattning
});

// saved = antal sparade token
```

#### När ska det användas

Progressiv åldring är **alltid på** för lägena `aggressive` och `ultra`. Det är särskilt effektivt för:

- Långvariga kodningssessioner
- Flerdagarskonversationer
- Agentbaserade arbetsflöden med många verktygsanrop

### Grottmans-utdataläge

Modulen `outputMode.ts` injicerar **systempromptinstruktioner** för att få modellen själv att producera komprimerad, kortfattad utdata (en "grottmansstil").

#### Hur det fungerar

Istället för att komprimera indata lägger detta läge till en systemprompt som:

> "Svara med minimala ord. Hoppa över artigheter. Använd korta meningar."

Detta fungerar särskilt bra för:

- Kodgenerering (kortare utdata = färre token)
- Snabba frågor och svar (inget behov av utförliga förklaringar)
- Batchbearbetning (maximera genomströmningen)

#### När ska det användas

Grottmans-utdataläget är **opt-in** — ställ in det via kombinationskonfigurationen:

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

### Utdataformat (katalog)

Grottmans-utdataläget ovan är den **äldre enkelstils-vägen**. Fas 4 generaliserade det till en katalog av komponerbara utdataformat: `OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`. Varje stil är en systempromptinstruktion som får modellen själv att producera billigare utdata; stilar kan aktiveras tillsammans och injiceras i katalogordning.

| Stil                            | `id`          | Vad den gör                                                                                                                                                                                                                        | Instruktionsspråk                                                 |
| :------------------------------ | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| Kortfattad prosa                | `terse-prose` | Tar bort utfyllnad/artiklar/förbehåll; behåller tekniskt innehåll exakt. Samma text som det äldre "caveman"-utmatningsläget (refererat, ej omformulerat).                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| Mindre kod                      | `less-code`   | YAGNI-principen: minsta fungerande ändring, inga oönskade abstraktioner.                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| Ponytail (lat seniorutvecklare) | `ponytail`    | "Den bästa koden är koden som aldrig skrivits": återanvändning > omskrivning, grundorsak > symptom, kortaste fungerande diff.                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| Jag har ADHD (åtgärd först)     | `i-have-adhd` | Åtgärd först (kommando/sökväg/kodsnutt före prosa), numrerade avgränsade steg, ETT konkret nästa steg, ingen inledning/sammanfattning/avslutning. Anpassad från [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| Kortfattad CJK (文言)           | `terse-cjk`   | Klassisk kinesisk ultrakortfattad stil.                                                                                                                                                                                            | zh (lokalbegränsad: erbjuds endast när det valda språket är `zh`) |

Varje stil levereras med tre intensitetsnivåer – `lite`, `full`, `ultra` – och varje nivå
avslutas med den delade gränsklausulen, som behåller kodblock, filsökvägar, kommandon,
felsträngar, URL:er och identifierare ordagrant.

#### Hur injektion fungerar

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) löser
urvalet mot katalogen (okända ID:n och språkfelaktiga stilar ignoreras, aldrig ett fel),
sammanfogar de valda instruktionerna i katalogordning, lägger till gränsklausulen **en gång**,
och laddar resultatet i systemprompten bakom en enda idempotensmarkör (`[OmniRoute Output Styles]`)
– att återapplicera är en no-op. När det detekterade begärda språket har en översättning,
injiceras den lokaliserade instruktionen istället för engelska.

#### Hur man aktiverar

I kontrollpanelen: **Context → Settings → Compression** – en rad per stil med en
på/av-växling och en nivåväljare. Programmatiskt sparar komprimeringskonfigurationen
urvalet som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Bakåtkompatibilitet: den äldre kombinationsinställningen `outputMode: "caveman"` fungerar
fortfarande och mappas till `terse-prose`, byte-identisk med den gamla injektionen i alla
äldre språk.

Språkval: med `languageConfig.enabled` aktiverat, väljer `autoDetect` språket för det
senaste användarmeddelandet (samma detektor som inmatningsmotorerna); att stänga av
`autoDetect` låser `defaultLanguage`. Av → Engelska.

Stil- och språkmatrisen är fastställd av
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: en ny stil kan inte släppas
utan åtminstone en pt-BR-översättning (eller ett uttryckligt spårat undantag), och en
befintlig stil kan inte tyst förlora en språkinställning. För att lägga till en stil, se
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Verktygsresultatkomprimering

Modulen `toolResultCompressor.ts` tillhandahåller **5 specialiserade komprimeringsstrategier**
för verktygsresultat (funktionsanrop, agentutdata, sökresultat, etc.):

1.  **Komprimering av sökresultat** — Tar bort redundanta resultat, behåller topp-N
2.  **Komprimering av filäsning** — Kortar ner stora filer, bevarar rubriker/importer
3.  **Komprimering av kodexekvering** — Behåller endast väsentlig stdout/stderr
4.  **Komprimering av databasfrågor** — Begränsar rader, tar bort utförlig metadata
5.  **Komprimering av API-svar** — Tar bort null-fält, kondenserar arrayer

#### När det ska användas

Verktygsresultatkomprimering är **alltid på** när verktygsanrop finns. Ingen konfiguration behövs.

### Staplad Pipeline

Det staplade läget kör **flera motorer i sekvens** – vanligtvis RTK först
(60-90% besparingar på verktygsutdata), sedan Caveman (30% ytterligare besparingar på den
återstående texten). Detta uppnår **78-95% totala besparingar**.

#### Hur det fungerar

```
Indata (1000 tokens)
  → RTK (kommando-medvetet filter) → 200 tokens
    → Caveman (borttagning av utfyllnad) → 140 tokens
  → Utdata (140 tokens, 86% besparingar)
```

#### När det ska användas

Använd staplat läge för:

- Verktygsintensiva arbetsflöden (agentisk kodning, forskning)
- Kostnadskänslig batchbearbetning
- När du behöver maximala token-besparingar

Konfigurera via kombination:

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
