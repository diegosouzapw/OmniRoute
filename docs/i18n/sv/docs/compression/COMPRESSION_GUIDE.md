# 🗜️ Prompt Compression Guide — OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spara automatiskt 15–95 % av kvalificerad kontext. En snabb översikt finns i [README-avsnittet om komprimering](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Översikt

OmniRoute implementerar en modulär pipeline för promptkomprimering som körs **proaktivt** innan förfrågningar når uppströmsleverantörer. Det innebär att dina tokenbesparingar sker transparent — inga ändringar av ditt arbetsflöde krävs.

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
    → Standard: Borttagning av utfyllnad med telegramstil (~30 %)
    → Aggressivt: Åldring av historik + sammanfattning (~50 %)
    → Ultra: Heuristisk beskärning + uttunning av kodblock (~75 %)
    → RTK: Kommandomedveten filtrering av terminal-/verktygsutdata (60–90 % uppströmsintervall)
    → Staplat: Ordnad pipeline med flera motorer, vanligtvis RTK följt av Caveman (78–95 % kvalificerat intervall)
  → Komprimerad förfrågan → Leverantör
```

---

## Komprimeringslägen

### Av

Ingen komprimering tillämpas. Alla meddelanden skickas vidare oförändrade.

### Lätt läge (~15 % besparing, <1 ms latens)

Det säkraste läget — ingen semantisk förändring, endast rensning av formatering:

| Teknik                   | Beskrivning                                                |
| ------------------------ | ---------------------------------------------------------- |
| `collapseWhitespace`     | Slå samman efterföljande tomrader och avslutande blanksteg |
| `dedupSystemPrompt`      | Ta bort duplicerade systemmeddelanden                      |
| `compressToolResults`    | Komprimera utförliga verktygs-/funktionsutdata             |
| `removeRedundantContent` | Ta bort upprepade instruktioner                            |
| `replaceImageUrls`       | Förkorta data-URI:er för base64-bilder                     |

**Bäst för:** Alltid aktiv användning och säkerhetskritiska arbetsflöden.

### Standardläge (~30 % besparing)

Inspirerat av [Caveman](https://github.com/JuliusBrussee/caveman) — tar bort utfyllnadsord och omständliga formuleringar samtidigt som betydelsen bevaras:

- Tar bort utfyllnadsord ("snälla", "jag tror", "i princip", "faktiskt")
- Kortar ned omständliga fraser ("för att kunna" → "för att", "som ett resultat av" → "eftersom")
- Tar bort artiga förbehåll ("Skulle du kunna...", "Om du möjligen kunde...")
- Över 30 regex-regler anpassade för kodningsprompter

**Bäst för:** Dagliga kodningsarbetsflöden och kostnadsmedvetna team.

### Aggressivt läge (~50 % besparing)

Smart historikhantering för långa sessioner:

- **Åldring av meddelanden** — äldre meddelanden komprimeras gradvis
- **Komprimering av verktygsresultat** — långa verktygsutdata trunkeras eller utelämnas (första/sista raderna,
  filtrering av matchande rader, kompaktering av JSON-nycklar)
- **Skydd för strukturell integritet** — säkerställer att par av `tool_use` + `tool_result` förblir konsekventa
- **Medvetenhet om kontextfönstret** — respekterar tokenbegränsningar per modell

**Bäst för:** Långa felsökningssessioner och stora kodbaser.

### Ultra-läge (~75 % besparing)

Maximal komprimering för scenarier där tokenanvändningen är kritisk:

- **Heuristisk beskärning** — poängbaserad tokenbeskärning av prosa
- **Bevarande av struktur** — inhägnade kodblock, infogad kod, URL:er och identifierare
  ersätts tillfälligt med markörer och återinfogas ordagrant; de beskärs aldrig
- **Valfri SLM-nivå** — en liten lokal modell kan förfina beskärningen när den är konfigurerad
- Oberoende av aggressivt läge: det kör inte åldring av meddelanden, komprimering av verktygsresultat
  eller reservsammanfattaren (endast ett fel på SLM-nivån kan dirigera en reservkörning genom
  aggressivt läge)

**Bäst för:** När du upprepade gånger når kontextgränserna.

### RTK-läge (60–90 % uppströmsintervall)

RTK-läget är optimerat för utförliga verktygsutdata som förekommer i sessioner med kodningsagenter:

- Identifierar kommando-/utdataklasser som `git status`, `git diff`, `git log`, testkörare,
  TypeScript-/Vite-/Webpack-byggen, ESLint/Biome/Prettier, npm-granskningar/-installationer, Docker-loggar, infrastrukturutdata
  och generiska skalutdata
- Tillämpar JSON-filterpaket från `open-sse/services/compression/engines/rtk/filters/`
- Importerar RTK-filter med TOML-schema v1 från projektets eller globala `filters.toml`-filer, med validering
  genom inbäddade tester och förtroendestyrning för projektfiler
- Levereras med 55 inbyggda filter med inbäddade verifieringsexempel
- Tar bort ANSI-styrsekvenser, förloppsindikatorer, upprepade rader och brus som inte går att agera på
- Bevarar misslyckanden, fel, varningar, ändrade filer, sammanfattningar och slutet av långa utdata
- Stöder förtroendestyrda projektfilter, globala filter och valfri återställning av maskerade råutdata

**Bäst för:** Agentsessioner med transkript från skal, byggen, tester, git, grep och filutdata.

### Staplat läge (78–95 % kvalificerat intervall)

Staplat läge kör flera komprimeringsmotorer i en deterministisk ordning. Standardpipelinen är:

```txt
RTK -> Caveman
```

Den ordningen komprimerar först terminal-/verktygsutdata och tillämpar sedan semantisk kondensering med Caveman på
den återstående prompten i naturligt språk. Staplade pipelines kan konfigureras globalt eller via
komprimeringskombinationer som tilldelats routningskombinationer.

**Bäst för:** Blandad kontext med stora verktygsloggar samt mänskliga instruktioner eller assistentsammanfattningar.

---

## Matematik för uppströmsbesparingar

OmniRoute dokumenterar komprimeringsbesparingar från två källor: riktmärken från uppströmsprojekt och
OmniRoutes egen motorsammansättning.

| Källa   | Siffra från uppströmsprojektets README som används här                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` färre utdata-tokens, `65%` genomsnittlig besparing av utdata i riktmärken, intervallet `22-87%` och ett verktyg för `~46%` komprimering av indata |
| RTK     | `60-90%` besparing för kommandoutdata; exempelsession med `~118,000 -> ~23,900` tokens, eller `79.7%` sparat (`~80%`)                                    |

För överlappande verktygs-/kontextnyttolaster staplar OmniRoutes standardkombination motorerna:

```txt
RTK -> Caveman
```

De kombinerade besparingarna är multiplikativa, inte additiva:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Siffran `78-95%` gäller när både RTK och Caveman kan reducera samma indata-/kontextnyttolast.
Cavemans läge för svarsutdata är separat: när det är aktiverat används Cavemans egna besparingar för utdata (`65%`
i genomsnitt, `~75%` som huvudbudskap, intervallet `22-87%`). De totala faktureringsbesparingarna beror på din fördelning mellan prompt och utdata.

### Vad ”berättigad” faktiskt innebär

Det angivna intervallet 15-95% är verkligt, men det gäller endast **redundant eller mångordigt** innehåll — upprepade
felrader, en bygglogg som spammar samma varning eller en alltför stor dump från `grep`/filläsning. Det innebär
**inte** att varje begäran sparar så mycket.

Empiriskt verifierat (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): en
`stacked`-körning (RTK + Caveman) mot ett `tool_result`-block i Anthropic-format som innehöll 300 identiska
felrader gav **95.93% tokenbesparing / 96.26% teckenbesparing** — helt i linje med det angivna
intervallet. Men när samma pipeline körs mot normala, icke-redundanta verktygsutdata (en ren lista med `grep`-träffar,
en kort filläsning eller vanlig samtalstext) ger den korrekt **nära noll i besparing**, eftersom
det inte finns något repetitivt att ta bort och `validateCompression()` (`validation.ts`) vägrar att leverera en
omskrivning som skulle ta bort eller ändra kodblock, URL:er, rubriker, versioner eller konstantidentifierare med ENBART VERSALER.

Detta är förväntat och säkert beteende, inte en bugg: en kodningssession som mestadels läser/söker med grep i rena filer får
måttliga totala besparingar även när komprimering är fullt aktiverad, medan en session som fastnar i en felande
loop eller möter en pratglad linter får hela intervallet 78-95% för den trafiken. Använd inte en enskild sessions
låga aggregerade besparingsprocent som bevis för att komprimeringen är felkonfigurerad — kontrollera först om
de underliggande verktygsutdata faktiskt var redundanta.

---

## Visualisering av tokenbesparingar

```
Utan komprimering: 47K tokens skickade till LLM
Med Lite:          40K tokens skickade          (15% sparat — säkert, alltid aktivt)
Med Standard:      33K tokens skickade          (30% sparat — caveman-speak-regler)
Med Aggressive:    24K tokens skickade          (50% sparat — åldrande + sammanfattning)
Med Ultra:         12K tokens skickade          (75% sparat — heuristisk beskärning)
Med RTK:           19K-5K tokens skickade       (60-90% sparat på kommando-/verktygsutdata)
Med Stacked:       10K-2.5K tokens skickade     (78-95% berättigat intervall för RTK+Caveman)
```

---

## Konfiguration

### Instrumentpanel

Gå till `Instrumentpanel → Kontext och cache`:

- **Caveman** — val av läge, språkpaket, förhandsgranskning och globala standardvärden
- **RTK** — förhandsgranskning av kommandofilter, RTK-säkerhetsinställningar och filterkatalog
- **Komprimeringskombinationer** — namngivna motorpipelines som tilldelas routningskombinationer
- **Tröskelvärde för automatisk aktivering** — aktivera komprimering automatiskt när antalet token överskrider tröskelvärdet

### Åsidosättning per kombination

I `Instrumentpanel → Kontext och cache → Komprimeringskombinationer` tilldelar du en komprimeringskombination till en
routningskombination:

```txt
Kombination: "free-tier-fallback"
  Komprimeringskombination: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Mål:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Detta gör att du kan använda staplad komprimering för kostnadsfria leverantörer och kodningsleverantörer, samtidigt som du behåller lite-läget för betalda
prenumerationer.

Denna tilldelning av en ”åsidosättning per kombination” är en annan kontroll än åsidosättningen av **routningskombinationens komprimeringsläge**
(Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — fältets
schema godtar även `rtk`, `stacked` och `omniglyph`) — den åsidosättningen väljer inte en namngiven
pipeline för en komprimeringskombination, utan anger endast fältet `compressionMode` som används av
`resolveCompressionPlan`. Den kan anges antingen på kombinationskortet (`Instrumentpanel → Kombinationer`) eller, sedan
#6760, per routningskombination i listan ”Tilldela till routning” under
`Instrumentpanel → Kontext och cache → Komprimeringskombinationer`, precis bredvid kryssrutan för pipeline-tilldelning
som dokumenteras ovan. Båda gränssnitten sparar via samma slutpunkt `PUT /api/combos/{id}`.

### Åsidosättning per begäran

Skicka begärandehuvudet `x-omniroute-compression` för att åsidosätta komprimeringsplanen för en enskild
begäran. Det har högst prioritet — det går före åsidosättningen för routningskombinationen, den aktiva profilen,
automatisk aktivering och panelens standardvärde. Okända värden ignoreras (begäran avvisas aldrig), och
den globala huvudbrytaren styr fortfarande allt: när komprimering är globalt avstängd kan huvudet inte
aktivera den. Värden:

| Värde         | Effekt                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `off`         | Ingen komprimering för denna begäran.                                                                        |
| `default`     | Den panelbaserade standardprofilen (ignorerar den aktiva profilen). Förstörande motorer lämnas avstängda.    |
| `safe`        | Samma som att utelämna huvudet: endast deduplicering och reducering av blanksteg.                            |
| `allow-lossy` | Behåll begärans operatörsplan, inklusive sammanfattningar, relevansfilter och stilomskrivningar.             |
| `engine:<id>` | En enskild motor när den är aktiverad, t.ex. `engine:rtk`. Detta är aktiveringen per begäran för den motorn. |
| `<combo>`     | En namngiven kombination som först matchas efter namn (skiftlägesokänsligt) och därefter efter id.           |

Utan `allow-lossy`, `engine:<id>` eller en namngiven kombination tillämpas inga förstörande motorer. Begäran
får fortfarande sessionsdeduplicering och reducering av blanksteg när komprimering är aktiverad.

Den tillämpade planen återges i svarshuvudet `X-OmniRoute-Compression: <mode>; source=<source>`,
där `<source>` är ett av `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` eller `off`.

### API

```bash
# Hämta komprimeringsinställningar
curl http://localhost:20128/api/settings/compression

# Uppdatera komprimeringsinställningar
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Förhandsgranska en specifik RTK-/stacked-nyttolast
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
- ✅ Systempromptar (i lite-läge)

RTK:s återställning av råutdata maskerar vanliga API-nycklar, bearer-token, Slack-token, AWS-åtkomstnycklar,
lösenord, token och hemligheter innan något sparas.

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

| Fas    | Lägen                                                                                                                                                      | Status      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Fas 1  | Off, Lite                                                                                                                                                  | ✅ Lanserad |
| Fas 2  | Standard, Aggressive, Ultra                                                                                                                                | ✅ Lanserad |
| Fas 3  | RTK, Stacked, Compression Combos                                                                                                                           | ✅ Lanserad |
| Fas 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                | ✅ Lanserad |
| Fas 4C | Adaptiv kontextbudget ("reglage") — beräkningsmotor + API (`contextBudget` på `PUT /api/settings/compression`) + läges-/policykontroller i kontrollpanelen | ✅ Lanserad |

---

## Erkännanden

Komprimeringsreglerna för Standard-läget är inspirerade av **[Caveman](https://github.com/JuliusBrussee/caveman)** av **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virala projektet "why use many token when few token do trick". Caveman rapporterar `~75%` färre token i utdata, en genomsnittlig besparing på `65%` i benchmark-utdata, ett intervall på `22-87%` för utdata och ett verktyg för indatakomprimering på `~46%`.

RTK-läget är inspirerat av **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** av **[RTK AI](https://github.com/rtk-ai)** — högprestandaprojektet för komprimering av kommandoutdata för terminal-, bygg-, test-, git- och verktygsutdatafiltrering. RTK rapporterar besparingar på `60-90%`, där exempelsessionen i dess README visar en besparing på `~80%`.

---

## Avancerade komprimeringssystem

Utöver de 7 lägen som beskrivs ovan (källan accepterar även lägena `codex-responses` och
`omniglyph`, vilka inte behandlas i den här guiden) beskriver avsnitten nedan funktioner
som fungerar inuti eller tillsammans med dessa lägen: Komprimering av verktygsresultat och Progressivt åldrande
är steg 1 och 2 i den aggressiva motorn (Aggressive-läget och ett `aggressive`-steg i en
staplad pipeline), Staplad pipeline är hur Stacked-läget körs, Cachemedveten komprimering
nedgraderar `aggressive` och `ultra` till `standard` för cachelagrande leverantörer medan komprimering
är aktiverad, och Caveman-utdataläge och Utdatastilar är valfria instruktioner i systemprompten,
inaktiverade som standard, som formar modellens utdata i stället för att komprimera begäran.

### Cachemedveten komprimering

Vissa leverantörer (som Anthropic med promptcachelagring) stöder **promptcachelagring**,
vilket gör att de kan cachelagra delar av prompten för att minska kostnader och latens. När
cachelagring är aktiverad kan aggressiv komprimering faktiskt **försämra** prestandan
eftersom den ändrar de cachelagrade tokenen och därmed ogiltigförklarar cachen.

Modulen `cachingAware.ts` löser detta genom att **identifiera cachelagringskontexten** och
**justera komprimeringsstrategin** därefter.

#### Så fungerar det

1. **Identifiera cachelagringskontext** — Söker igenom begärans innehåll efter `cache_control`-markörer
2. **Identifiera cachelagrande leverantörer** — Kontrollerar om målleverantören stöder cachelagring
3. **Justera strategin** — Nedgraderar `aggressive`/`ultra` till `standard` för cachelagrande leverantörer
4. **Hoppa över systemprompten** — Systempromptar cachelagras vanligtvis, så komprimera dem inte

Strategihjälparen returnerar också en `deterministicOnly`-flagga, men plangeneratorn använder
endast strategin — inget nedströms läser flaggan i dag.

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
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### När det ska användas

Cachemedveten komprimering är **alltid aktiverad** — ingen konfiguration behövs. Den aktiveras när
komprimering är påslagen och målleverantören stöder promptcachelagring (Anthropic, OpenAI
med flera); uttryckliga `cache_control`-markörer krävs inte — enbart en cachelagrande leverantör
utlöser nedgraderingen, medan enbart markörer aldrig gör det (marköridentifiering används för
cachetelemetri, inte för strategibeslutet).

### Progressivt åldrande

Långa konversationer samlar på sig många meddelandeomgångar, men äldre omgångar blir mindre
relevanta. Modulen `progressiveAging.ts` **degraderar meddelanden baserat på avståndet i omgångar**
(avståndet mäts från slutet av konversationen). Med de levererade standardvärdena
(`verbatim: 2, light: 2, moderate: 3`):

- **Senaste 2 turerna (avstånd ≤ 2)**: Bevaras ordagrant
- **Avstånd 3**: Grottmänniskokomprimering (utfyllnad tas bort)
- **Avstånd 4+**: Assistentmeddelanden sammanfattas; användarmeddelanden reduceras till sin första
  rad, begränsad till 120 tecken; övriga roller lämnas orörda. Systempromptar, redan åldrade
  meddelanden och det senaste användarmeddelandet bevaras alltid ordagrant oavsett avstånd.
  Ingenting tas bort helt, och bandet `light`
  kan inte nås med de medföljande standardinställningarna (`light` är lika med `verbatim`).

#### Kodexempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... ytterligare 50 turer ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // de senaste 3 turerna: ordagrant
  light: 8, // avstånd <= 8: lätt komprimering
  moderate: 20, // avstånd <= 20: grottmänniskokomprimering
  fullSummary: 5, // krävs av typen, läses inte av bandindelningskoden
  // avstånd > 20: sammanfattas (assistent) / första raden bevaras (användare)
});

// saved = antal sparade token
```

#### När det ska användas

Progressiv åldring är **alltid aktiverad** i läget `aggressive` — det är steg 2 i
`compressAggressive()`. Ultra-läget kör det inte. Det är
särskilt effektivt för:

- Långvariga kodningssessioner
- Konversationer som pågår i flera dagar
- Agentbaserade arbetsflöden med många verktygsanrop

### Utmatningsläget Caveman

Utmatningsläget Caveman lägger till **instruktioner i systemprompten** som ber själva modellen att ge
kortfattad utmatning — nivån `lite` ber om koncisa svar som behåller fullständiga meningar, `full`
ber den att "svara kortfattat som en smart grottmänniska", och `ultra` ber om telegrafisk utmatning;
instruktionerna ber bara om detta, de kan inte garantera det. Förfrågningar får dem via
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` löser först valet med bakåtkompatibilitetsmellanlägget
(`resolveOutputStyleSelection()` i
`open-sse/services/compression/outputStyles/backCompat.ts`), som, medan `outputStyles`
är tomt, mappar ett aktiverat `cavemanOutputMode` till utmatningsstilen `terse-prose` med
`cavemanOutputMode.intensity` (se Bakåtkompatibilitet nedan); ett icke-tomt val av `outputStyles`
används som det är, och `cavemanOutputMode.enabled` och `intensity` har då ingen
effekt, medan dess reglage `autoClarity` fortfarande gäller. `outputMode.ts` innehåller
instruktionstexterna (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), förbikopplingen baserad på innehåll och
placeringshjälparen som injiceringen använder; dess egen injicerare `applyCavemanOutputMode()` har ingen
anropare i produktion.

#### Så fungerar det

Det här läget komprimerar inte indata. Det lägger till ett instruktionsblock i systemprompten
(se Så fungerar injiceringen nedan), och eventuellt indatakomprimeringsläge som valts för förfrågningen
körs fortfarande efteråt, på brödtexten som nu innehåller blocket. Före den gemensamma
begränsningsklausulen som varje nivå avslutas med lyder den engelska nivån `full`:

> "Svara kortfattat som en smart grottmänniska. Utelämna artiklar (a/an/the), utfyllnad (just/really/basically/actually/simply), artighetsfraser, garderingar. Fragment är OK. Korta synonymer (big, inte extensive; fix, inte implement). Behåll all teknisk substans, kod, fel, URL:er och identifierare exakt."

Detta fungerar särskilt bra för:

- Kodgenerering (kortare utmatning = färre token)
- Snabba frågor och svar (inget behov av utförliga förklaringar)
- Batchbearbetning (maximerar genomströmningen)

#### När det ska användas

Utmatningsläget Caveman är **valfritt**. Med komprimering aktiverad (`enabled: true`, huvudreglaget
på sidan Komprimeringsinställningar), aktivera det med `cavemanOutputMode.enabled`; `intensity`
väljer `lite`, `full` eller `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Reglaget **Utmatningsläge** för en komprimeringskombination (`outputMode`, med nivån i `outputModeIntensity`)
ställer in samma reglage för de förfrågningar som kombinationen gäller för, och MCP-verktyget
`omniroute_set_compression_engine` skriver det via sitt booleska argument `outputMode`.
Ett icke-tomt val av `outputStyles` har företräde framför det här reglaget. När utmatningsstilen
**Koncis prosa** aktiveras i kontrollpanelen injiceras samma block (se Utmatningsstilar nedan).

### Utmatningsstilar (katalog)

Utmatningsläget Caveman ovan är den **äldre vägen för en enda stil**. Fas 4 generaliserade det
till en katalog med kombinerbara utmatningsstilar: `OUTPUT_STYLE_CATALOG` i
`open-sse/services/compression/outputStyles/catalog.ts`. Varje stil är en instruktion i systemprompten
som ber själva modellen att ge billigare utmatning; stilar kan aktiveras
tillsammans och injiceras i katalogordning.

| Stil                             | `id`          | Vad den gör                                                                                                                                                                                                                          | Instruktionsspråk                             |
| -------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Kortfattad prosa                 | `terse-prose` | Ta bort utfyllnad/artiklar/reservationer; behåll den tekniska innebörden exakt. Samma text som det äldre utmatningsläget caveman (refererad, inte omskriven).                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mindre kod                       | `less-code`   | YAGNI-trappa: minsta fungerande ändring, inga abstraktioner som inte efterfrågats.                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Hästsvans (lat seniorutvecklare) | `ponytail`    | ”Den bästa koden är koden som aldrig skrivs”: återanvändning > omskrivning, grundorsak > symtom, kortast fungerande diff.                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Jag har ADHD (åtgärd först)      | `i-have-adhd` | Åtgärd först (kommando/sökväg/kodavsnitt före prosa), numrerade avgränsade steg, ETT konkret nästa steg, ingen inledning/sammanfattning/avslutning. Anpassad från [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kortfattad CJK (文言)            | `terse-cjk`   | `full`/`ultra`-svar på klassisk kinesiska (文言); `lite` ber endast om korta svar utan funktionsord, artighetsfraser eller utsmyckning.                                                                                              | zh (språkvariantbegränsad, se nedan)          |

Varje stil levereras med tre intensitetsnivåer — `lite`, `full`, `ultra` — och varje nivå
avslutas med den gemensamma avgränsningsklausulen (`SHARED_BOUNDARIES` i `outputMode.ts`), som
bevarar kodblock, filsökvägar, kommandon, fel och URL:er exakt. Nivåtexterna för `terse-prose` och
`terse-cjk` lägger till identifierare i den listan.

`terse-cjk` är begränsad till språkvarianten `zh` på två ställen. Sidan Komprimeringsinställningar visar
dess rad endast när instrumentpanelens gränssnittsspråk är kinesiska (`zh-CN` eller `zh-TW`), och
`applyOutputStyles()` injicerar den endast när begärans fastställda språk (se Språkval
nedan) är `zh`. Att dölja raden rensar inte ett sparat `terse-cjk`-val:
inställnings-API:et accepterar alla stil-id:n, och det behålls när andra stilar sparas på sidan. Vid
tidpunkten för begäran är språkkontrollen i `applyOutputStyles()` den enda språkvariantsspärren.

#### Så fungerar injiceringen

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) matchar
valet mot katalogen (okända id:n och stilar med fel språkvariant
ignoreras, aldrig ett fel; ett val som inte resulterar i någon stil lämnar kroppen
oförändrad och hoppas över som `no_styles`), sammanfogar de valda instruktionerna i katalogens
ordning,
lägger till avgränsningsklausulen **en gång** (samt säkerhetsklausulen, `SAFETY_BOUNDARIES` eller dess
översättning, när `less-code` eller `ponytail` har valts) och inleder blocket med en
enda idempotensmarkör (`[OmniRoute Output Styles]`), så att en ny tillämpning inte gör något. När
det fastställda språket (se Språkval nedan) har en översättning injiceras den lokaliserade
instruktionen i stället för den engelska.

För en kropp med en icke-tom `messages`-array körs idempotenskontrollen före
innehållsförbikopplingen: när markören `[OmniRoute Output Styles]` redan finns i
`system`-fältet på toppnivå (en sträng eller en innehållsblocksarray) eller i ett systemmeddelande med
stränginnehåll lämnas kroppen oförändrad som `already_applied` och ingen nyckelordskontroll körs.
Annars kontrollerar en innehållsförbikoppling (`shouldBypassCavemanOutputMode()` i
`open-sse/services/compression/outputMode.ts`) texten i de tre senaste
meddelandena, oavsett deras roll, och hoppar över stilarna för hela turen när texten
matchar dess nyckelord för säkerhet, oåterkalleliga åtgärder eller förtydliganden, eller en
ordningskänslig sekvens: `first`, `then`, `after that`, `before`, `rollback` eller
`backup` följt inom 240 tecken av `delete`, `drop`, `migrate`, `deploy` eller
`release`. Förbikopplingen körs medan reglaget **Automatisk tydlighetsförbikoppling**
(`cavemanOutputMode.autoClarity`, aktiverat som standard) är på; om reglaget stängs av hoppas
nyckelordskontrollen över.

När förbikopplingen släpper igenom turen placerar `placeSystemInstruction()` (samma fil), som
aldrig skapar ett nytt `messages[0]`, blocket på den första av följande platser som hittas:

1. Ett inledande systemmeddelande med stränginnehåll: blocket läggs till efter dess text.
2. `system`-fältet på toppnivå: blocket läggs till efter texten i en sträng eller
   läggs till som ett nytt textblock i en innehållsblocksarray.
3. Det första senare systemmeddelandet med stränginnehåll: blocket läggs till efter dess
   text.
4. Inget av ovanstående: blocket placeras i ett nytt systemmeddelande i slutet av `messages`.

För en kropp utan en `messages`-array (eller med en tom sådan) körs ingen innehållsförbikoppling och
ett `system`-fält på toppnivå kontrolleras inte. Blocket läggs till efter texten i ett
`instructions`-fält av strängtyp, såvida inte det fältet redan innehåller
markören `[OmniRoute Output Styles]`, i vilket fall kroppen lämnas oförändrad som
`already_applied`. När kroppen saknar ett `instructions`-fält av strängtyp men innehåller `input`
(en sträng eller en array) blir blocket `instructions` och ersätter eventuellt icke-strängvärde
som fältet innehöll. En kropp som varken har ett `instructions`-fält av strängtyp eller ett `input`
som är en sträng eller array lämnas oförändrad och hoppas över som `no_messages`.

#### Så aktiverar du det

I kontrollpanelen: **Komprimeringskontext → Komprimeringsinställningar**
(`/dashboard/context/settings`), avsnittet Utdataformat: en rad per format med en
på/av-växel och en nivåväljare. Format injiceras medan själva komprimeringen är aktiverad
(sidans huvudväxel, `enabled`). Växeln **Automatisk tydlighetsförbikoppling** finns på
sidan **Caveman** (`/dashboard/context/caveman`), i dess kort **Utdataläge**. Programmatiskt
sparar komprimeringskonfigurationen valet som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Bakåtkompatibilitet: medan `outputStyles` är tom mappar den äldre inställningen
`cavemanOutputMode.enabled` till `terse-prose` vid `cavemanOutputMode.intensity`. Blocket
börjar sedan med markören `[OmniRoute Output Styles]`, där den äldre injiceraren
`applyCavemanOutputMode()` skrev `[OmniRoute Caveman Output Mode]`. Under markören
överensstämmer texten med den äldre injiceringen på en, pt-BR, es, de, fr, it, ru, id och
vi; på ja och zh innehåller den ett extra blanksteg före gränsvillkoret. `terse-prose`
översätts till pt-BR, es, de, fr, it, ru, zh, ja, id och vi, så en begäran vars fastställda
språk är `hu` får den engelska texten, medan den äldre injiceraren använde sin ungerska
text.

Språkval för utdataformat (`resolveOutputStyleLanguage()` i
`outputStyles/apply.ts`): när `languageConfig.enabled` är aktiverat hämtar `autoDetect`
det senaste användarmeddelandet i begärans `messages`-matris som innehåller text
(stränginnehåll eller `text` från dess innehållsdelar) och kör Caveman-motorns detektor
(`detectCompressionLanguage()`) på det. Detektorn returnerar `zh` för text med
Han-tecken och utan kana; annars returnerar den det av `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` och `id` som har flest ledtrådsmatchningar, samt `en` när inget matchar —
text som den inte kan klassificera får engelska, aldrig `defaultLanguage`, och `vi`
identifieras aldrig trots att formaten levereras med `vi`-text. En brödtext för Responses
API behåller sina turer i `input`, som inte används som underlag, och får därför
`defaultLanguage`, sedan engelska. När inget användarmeddelande i `messages` innehåller
text, eller när `autoDetect` är avstängt, används `defaultLanguage`, sedan engelska. När
`languageConfig.enabled` är avstängt är språket engelska — såvida inte en
komprimeringskombination tillämpas på begäran (en kombination som tilldelats begärans
routningskombination, eller den standardkombination för komprimering som chatCore
faller tillbaka på för den inbyggda staplade pipelinen): när en kombination tillämpas
aktiveras `languageConfig.enabled` för den begäran och `defaultLanguage` anges utifrån
kombinationens språkpaket (det sparade värdet om det ingår bland kombinationens paket,
annars kombinationens första paket, som som standard är `en`), medan den sparade
inställningen `autoDetect` (aktiverad som standard) fortfarande gäller. Caveman-motorn
för indata väljer språk för sitt regelpaket på ett annat sätt — per textdel och, när
automatisk identifiering är avstängd, villkorat av `enabledPacks`.

Matrisen format × språk låses av
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: varje format i katalogen
måste ha en post i testets `BASELINE_LANGUAGES`; ett format som inte är
språkvariantbegränsat måste levereras med en pt-BR-översättning (det
språkvariantbegränsade `terse-cjk` är undantaget från den här regeln), såvida det inte
finns med i `KNOWN_ENGLISH_ONLY`, som endast får innehålla format helt utan
översättningar — ett listat format som har någon översättning underkänns i testet; och
ett format underkänns i testet om det förlorar ett språk som anges i dess post i
`BASELINE_LANGUAGES`. Information om hur du lägger till ett format finns i
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprimering av verktygsresultat

`compressToolResult()` i `open-sse/services/compression/toolResultCompressor.ts`
komprimerar text från verktygsresultat med **5 strategier**. Den provar dem i den här
ordningen, och den första aktiverade strategin vars kontroll matchar innehållet avgör
resultatet:

1. **`fileContent`**: innehåll med 3 eller fler rader där minst en rad, om inledande
   indrag ignoreras, börjar med `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` eller `return ` (nyckelordet plus ett blanksteg), eller med `if`,
   `for` eller `while` följt av `(` eller ` (`, behåller de första 20 och sista 5 raderna,
   med den utelämnade mitten markerad.
2. **`grepSearch`**: innehåll med minst en rad i formatet `<path>:<digits>:`,
   där texten före det första kolonet inte innehåller blanksteg, behåller endast dessa rader,
   som mest 30, följda av antalet eventuella ytterligare träffar och listan över matchande filer;
   alla andra rader tas bort. En enda sådan rad räcker för att utlösa strategin, så en
   loggrad som börjar med en tidsstämpel som `12:30:45` räknas också.
3. **`shellOutput`**: utdata som innehåller en ANSI CSI-sekvens (`ESC[` följt av siffror eller
   semikolon och sedan en bokstav, som i färgkoder) eller ett `$` följt av blanksteg
   någonstans i texten förlorar dessa sekvenser (andra escape-sekvenser, såsom `ESC[?25l` eller en
   OSC-sekvens för fönstertiteln, behålls) och behåller sina sista 50 rader, där på varandra
   följande upprepade rader slås samman. Eftersom den här kontrollen körs före `json` och `errorMessage`
   når JSON- eller felutdata som innehåller ett sådant `$` aldrig dem när
   `shellOutput` är aktiverat.
4. **`json`**: en JSON-nyttolast på över 2 000 tecken som börjar med `{` eller `[` (efter
   valfria blanksteg) och kan parsas sammanfattas: en array med fler än 7 element behåller
   sina första 5 och sista 2 element samt sitt totala antal, och ett objekt behåller sina första 20
   nycklar, där varje nästlat objekt- eller arrayvärde ersätts med en platshållare av typen `{…N keys}`
   (för en array är N dess längd) samt en `_remaining_<N>_keys`-markör som anger antalet nycklar
   som utelämnats efter de första 20. Skalära värden kopieras i sin helhet, så ett objekt med 20
   nycklar eller färre utan nästlade värden får endast nya indrag — ett minifierat objekt får fler tecken
   och förblir oförändrat.
5. **`errorMessage`**: utdata som någonstans, oavsett skiftläge, innehåller `error:`,
   `error ` (ordet följt av ett blanksteg, som i `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` eller `traceback` behåller sin första rad, de
   följande 10 raderna och de sista 3, med en `… [N frames elided] …`-markör i stället för
   raderna mellan dem. Markören visas endast när fler än 13 rader följer efter den första
   raden, så felutdata med 14 rader eller färre förkortas inte (vid 12 eller 13 rader
   upprepar de sista 3 rader som redan behållits).

När en strategi matchar provas inte de senare strategierna, även om den inte sparar
något. När den matchande strategin inte sparar några uppskattade token (längd ÷ 4, avrundat uppåt) —
till exempel en kodliknande fil med 25 rader eller färre, eller en JSON-array på över 2 000
tecken med 7 element eller färre — behåller den aggressiva motorn det ursprungliga
verktygsresultatet: båda anroparna (`compressAggressive()` och `compressAnthropicToolResultBlock()`)
behåller originalet när `saved` är 0 eller lägre, medan `compressToolResult()` självt fortfarande
returnerar strategins utdata. Verktygsresultatsteget är inte sista ordet:
motorns reservsammanfattare kan fortfarande förkorta ett `tool`- eller `function`-meddelande som är längre
än 8 192 tecken (`maxTokensPerMessage`, 2 048, multiplicerat med 4).

#### När det ska användas

Komprimering av verktygsresultat är steg 1 i den aggressiva motorn (`compressAggressive()` i
`open-sse/services/compression/aggressive.ts`), så den körs i läget Aggressive och i ett
`aggressive`-steg i en staplad pipeline. Den komprimerar `tool`- och `function`-meddelanden
i OpenAI-format samt texten inuti Anthropics `tool_result`-block. Varje strategi har en egen
omkopplare under `aggressive.toolStrategies`, och alla är aktiverade som standard. På instrumentpanelen
finns omkopplarna i vyn **Advanced** på Caveman-sidan när komprimering är aktiverad och
standardläget är Aggressive.

### Staplad pipeline

Det staplade läget kör **flera motorer i följd** — vanligtvis RTK först
(60–90 % besparing på verktygsutdata), därefter Caveman på den återstående texten (~46 % besparing
på indata). Tillsammans ger det det **berättigade intervallet 78–95 %** (se Beräkning av besparingar
i tidigare led ovan): `1 - (1 - 0.60..0.90) × (1 - 0.46)` ger ett genomsnitt på ≈89 %.

#### Så fungerar det

```
Indata (1000 token)
  → RTK (kommandomedvetet filter) → 200 token
    → Caveman (borttagning av utfyllnad) → 108 token
  → Utdata (108 token, ~89 % besparing)
```

#### När det ska användas

Använd staplat läge för:

- Arbetsflöden med omfattande verktygsanvändning (agentbaserad kodning, forskning)
- Kostnadskänslig batchbearbetning
- När du behöver maximala tokenbesparingar

Staplade pipelines konfigureras genom den globala komprimeringsinställningen
`stackedPipeline` eller genom en namngiven komprimeringskombination som tilldelats en
routningskombination (se Åsidosättning per kombination ovan) — inte genom `modePack` för en
automatisk kombination (det fältet viktar endast om modellvalet för automatiska kombinationer,
och `stacked` är inte ett giltigt paketnamn).

---

## Åsidosättningar för komprimering per kombination

Du kan åsidosätta det globala komprimeringsläget **per kombination** för att finjustera beteendet
för olika användningsfall:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Detta är användbart för:

- **Kodningskombinationer**: Använd läget `aggressive` för långa sessioner
- **Snabba fråge- och svarskombinationer**: Använd läget `lite` för snabba svar
- **Verktygsintensiva kombinationer**: Använd läget `stacked` för maximala besparingar
- **Produktionskombinationer**: lämna åsidosättningen avstängd för leverantörer med cachning — den ständigt aktiva
  cachemedvetna justeringen nedgraderar automatiskt `aggressive`/`ultra` till `standard`
  (det finns inget valbart `cache-aware`-läge)

---

## Se även

- [Miljökonfiguration](../reference/ENVIRONMENT.md) — Miljövariabler för komprimering
- [Arkitekturguide](../architecture/ARCHITECTURE.md) — Komprimeringspipelinens interna funktion
- [Användarguide](../guides/USER_GUIDE.md) — Kom igång med komprimering
- [RTK-komprimering](./RTK_COMPRESSION.md) — RTK-filter, tillitsmodell, verifieringsspärr och återställning av rådatautdata
- [Komprimeringsmotorer](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API:er, MCP och instrumentpanel
- [Format för komprimeringsregler](./COMPRESSION_RULES_FORMAT.md) — JSON-format för regelpaket
- [Språkpaket för komprimering](./COMPRESSION_LANGUAGE_PACKS.md) — Språkspecifika Caveman-regler
