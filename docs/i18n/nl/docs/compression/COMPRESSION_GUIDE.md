# 🗜️ Prompt Compression Guide — OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Bespaar automatisch 15-95% op geschikte context. Zie voor een snel overzicht de [sectie over compressie in de README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Overzicht

OmniRoute implementeert een modulaire pipeline voor promptcompressie die **proactief** wordt uitgevoerd voordat verzoeken upstreamproviders bereiken. Dit betekent dat tokens transparant worden bespaard — er zijn geen wijzigingen in je workflow nodig.

```
Clientverzoek
  → Selectie van compressiestrategie
    → Combo-overschrijving? → Gebruik combo-instelling
    → Drempelwaarde voor automatische activering? → Gebruik automatische modus
    → Standaardmodus? → Gebruik globale instelling
    → Uit? → Sla compressie over
  → Geselecteerde compressiemodus
    → Uit: Geen compressie
    → Lite: Veilige opschoning van witruimte/opmaak (~15%)
    → Standard: Verwijdering van stopwoorden in telegramstijl (~30%)
    → Aggressive: Veroudering en samenvatting van geschiedenis (~50%)
    → Ultra: Heuristisch snoeien en uitdunnen van codeblokken (~75%)
    → RTK: Opdrachtherkenning voor het filteren van terminal-/tooluitvoer (upstreambereik van 60-90%)
    → Stacked: Geordende pipeline met meerdere engines, doorgaans eerst RTK en dan Caveman (geschikt bereik van 78-95%)
  → Gecomprimeerd verzoek → Provider
```

---

## Compressiemodi

### Uit

Er wordt geen compressie toegepast. Alle berichten worden ongewijzigd doorgegeven.

### Lite-modus (~15% besparing, <1ms latentie)

De veiligste modus — geen semantische wijzigingen, alleen opschoning van de opmaak:

| Techniek                 | Beschrijving                                                 |
| ------------------------ | ------------------------------------------------------------ |
| `collapseWhitespace`     | Opeenvolgende lege regels en afsluitende spaties samenvoegen |
| `dedupSystemPrompt`      | Dubbele systeemberichten verwijderen                         |
| `compressToolResults`    | Uitvoerige tool-/functie-uitvoer comprimeren                 |
| `removeRedundantContent` | Herhaalde instructies verwijderen                            |
| `replaceImageUrls`       | Base64-data-URI's van afbeeldingen verkorten                 |

**Meest geschikt voor:** Altijd ingeschakeld gebruik, veiligheidskritieke workflows.

### Standard-modus (~30% besparing)

Geïnspireerd door [Caveman](https://github.com/JuliusBrussee/caveman) — verwijdert stopwoorden en omslachtige formuleringen met behoud van de betekenis:

- Verwijdert stopwoorden ("please", "I think", "basically", "actually")
- Verkort omslachtige formuleringen ("in order to" → "to", "as a result of" → "because")
- Verwijdert beleefde afzwakkingen ("Would you mind...", "If you could possibly...")
- Meer dan 30 regex-regels, afgestemd op programmeerprompts

**Meest geschikt voor:** Dagelijkse programmeerworkflows, kostenbewuste teams.

### Aggressive-modus (~50% besparing)

Slim beheer van de geschiedenis voor lange sessies:

- **Berichtveroudering** — oudere berichten worden steeds verder gecomprimeerd
- **Samenvatting van toolresultaten** — lange tooluitvoer wordt vervangen door samenvattingen
- **Bewaking van structurele integriteit** — zorgt ervoor dat paren van `tool_use` en `tool_result` consistent blijven
- **Bewustzijn van het contextvenster** — houdt rekening met tokenlimieten per model

**Meest geschikt voor:** Langdurige foutopsporingssessies, grote codebases.

### Ultra-modus (~75% besparing)

Maximale compressie voor scenario's waarin tokens kritiek zijn:

- **Heuristisch snoeien** — verwijdert berichten onder de relevantiedrempel
- **Uitdunnen van codeblokken** — comprimeert repetitieve codevoorbeelden
- **Afkapping via binair zoeken** — vindt het optimale afkappunt voor het contextvenster
- Bevat alle functies van de Aggressive-modus

**Meest geschikt voor:** Wanneer je herhaaldelijk de contextlimieten bereikt.

### RTK-modus (upstreambereik van 60-90%)

De RTK-modus is geoptimaliseerd voor uitvoerige tooluitvoer die voorkomt in sessies met programmeeragents:

- Detecteert klassen van opdrachten/uitvoer, zoals `git status`, `git diff`, `git log`, test-runners,
  builds van TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm-audits/-installaties, Docker-logboeken, infrastructuuruitvoer
  en algemene shell-uitvoer
- Past JSON-filterpakketten uit `open-sse/services/compression/engines/rtk/filters/` toe
- Importeert filters volgens RTK TOML-schema v1 uit `filters.toml`-bestanden van het project of uit globale bestanden, met validatie
  via inline-tests en vertrouwenscontrole voor projectbestanden
- Bevat 49 ingebouwde filters met inline-verificatievoorbeelden
- Verwijdert ANSI-besturingssequenties, voortgangsbalken, herhaalde regels en niet-relevante ruis
- Behoudt mislukkingen, fouten, waarschuwingen, gewijzigde bestanden, samenvattingen en het einde van lange uitvoer
- Ondersteunt projectfilters met vertrouwenscontrole, globale filters en optioneel herstel van geredigeerde onbewerkte uitvoer

**Meest geschikt voor:** Agentsessies met transcripties van shell-, build-, test-, git-, grep- en bestandsuitvoer.

### Stacked-modus (geschikt bereik van 78-95%)

De Stacked-modus voert meerdere compressie-engines in een deterministische volgorde uit. De standaardpipeline is:

```txt
RTK -> Caveman
```

Door deze volgorde wordt terminal-/tooluitvoer eerst compact gehouden, waarna Caveman semantische condensatie toepast op
de resterende prompt in natuurlijke taal. Stacked-pipelines kunnen globaal worden geconfigureerd of via
compressiecombo's die aan routeringscombo's zijn toegewezen.

**Meest geschikt voor:** Gemengde context met grote toollogboeken plus menselijke instructies of assistentsamenvattingen.

---

## Berekening van upstreambesparingen

OmniRoute documenteert compressiebesparingen uit twee bronnen: benchmarks van upstreamprojecten en
de eigen enginecompositie van OmniRoute.

| Bron    | Getal uit upstream-README dat hier wordt gebruikt                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` minder uitvoertokens, gemiddeld `65%` uitvoerbesparing in benchmarks, een bereik van `22-87%` en een invoercompressietool van `~46%` |
| RTK     | `60-90%` besparing op opdrachtuitvoer; voorbeeldsessie van `~118,000 -> ~23,900` tokens, oftewel `79.7%` bespaard (`~80%`)                  |

Voor overlappende tool-/contextpayloads stapelt de standaardcombinatie van OmniRoute de engines:

```txt
RTK -> Caveman
```

De gecombineerde besparingen zijn multiplicatief, niet additief:

```txt
combined = 1 - (1 - RTK-besparing) * (1 - Caveman-invoerbesparing)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Dat getal van `78-95%` is van toepassing wanneer zowel RTK als Caveman dezelfde invoer-/contextpayload
kunnen verkleinen. De Caveman-modus voor responsuitvoer staat hiervan los: gebruik wanneer deze is
ingeschakeld de eigen uitvoerbesparingen van Caveman (gemiddeld `65%`, `~75%` als hoofdgetal, bereik
van `22-87%`). De totale besparing op factureringskosten hangt af van uw verhouding tussen prompts en uitvoer.

### Wat "geschikt" daadwerkelijk betekent

Het genoemde bereik van 15-95% is reëel, maar geldt alleen voor **redundante of breedsprakige** inhoud —
herhaalde foutregels, een buildlogboek dat steeds dezelfde waarschuwing spamt, een buitensporig grote
`grep`-/bestandsleesdump. Het betekent **niet** dat elk verzoek zoveel bespaart.

Empirisch geverifieerd (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): een
`stacked`-uitvoering (RTK + Caveman) op een `tool_result`-blok in Anthropic-indeling met 300 identieke
foutregels leverde **95.93% tokenbesparing / 96.26% tekenbesparing** op — precies binnen het geadverteerde
bereik. Maar dezelfde pipeline levert bij normale, niet-redundante tooluitvoer (een overzichtelijke lijst
met `grep`-overeenkomsten, een korte bestandslezing, gewone gesprekstekst) terecht **vrijwel geen besparing**
op, omdat er niets repetitiefs te verwijderen valt en `validateCompression()` (`validation.ts`) weigert
een herschreven versie te verzenden die codeblokken, URL's, koppen, versies of constante-identificatoren
in ALL-CAPS zou weglaten of wijzigen.

Dit is verwacht en veilig gedrag, geen bug: een programmeersessie waarin voornamelijk overzichtelijke
bestanden worden gelezen/doorzocht, zal zelfs met volledig ingeschakelde compressie een bescheiden totale
besparing opleveren, terwijl een sessie die in een foutlus terechtkomt of een breedsprakige linter gebruikt,
op dat verkeer het volledige bereik van 78-95% zal behalen. Gebruik het lage totale besparingspercentage van
één sessie niet als bewijs dat compressie verkeerd is geconfigureerd — controleer eerst of de onderliggende
tooluitvoer daadwerkelijk redundant was.

---

## Visualisatie van tokenbesparingen

```
Zonder compressie: 47K tokens naar LLM verzonden
Met Lite:          40K tokens verzonden          (15% bespaard — veilig, altijd actief)
Met Standard:      33K tokens verzonden          (30% bespaard — Caveman-spraakregels)
Met Aggressive:    24K tokens verzonden          (50% bespaard — veroudering + samenvatting)
Met Ultra:         12K tokens verzonden          (75% bespaard — heuristisch snoeien)
Met RTK:           19K-5K tokens verzonden       (60-90% bespaard op opdracht-/tooluitvoer)
Met Stacked:       10K-2.5K tokens verzonden     (78-95% geschikt RTK+Caveman-bereik)
```

---

## Configuratie

### Dashboard

Navigeer naar `Dashboard → Context & Cache`:

- **Caveman** — modusselectie, taalpakken, preview en globale standaardinstellingen
- **RTK** — command-filter preview, RTK veiligheidsinstellingen en filtercatalogus
- **Compression Combos** — benoemde engine-pipelines toegewezen aan routing-combo's
- **Auto-Trigger Threshold** — schakelt automatisch compressie in wanneer het aantal tokens de drempel overschrijdt

### Per-Combo Override

Wijs in `Dashboard → Context & Cache → Compression Combos` een compressie-combo toe aan een routing-combo:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dit stelt u in staat om gestapelde compressie te gebruiken op gratis/coderingsproviders, terwijl de lite-modus behouden blijft voor betaalde abonnementen.

Deze "Per-Combo Override"-toewijzing is een andere controle dan de **routing-combo compressiemodus** override (Standaard/Uit/Lite/Standaard/Agressief/Ultra) — die override kiest geen benoemde compressie-combo pipeline; het stelt alleen het `compressionMode`-veld in dat wordt geraadpleegd door `resolveCompressionPlan`. Het kan worden ingesteld op de combo-kaart (`Dashboard → Combos`) of, sinds #6760, per routing-combo in de "Toewijzen aan routing"-lijst op `Dashboard → Context & Cache → Compression Combos`, direct naast het hierboven gedocumenteerde selectievakje voor pipeline-toewijzing. Beide interfaces blijven behouden via hetzelfde `PUT /api/combos/{id}`-eindpunt.

### Per-verzoek override

Stuur de `x-omniroute-compression` verzoekheader om het compressieplan voor een enkel verzoek te overschrijven. Het heeft de hoogste prioriteit — het overtreft de routing-combo override, het actieve profiel, auto-trigger en de paneelstandaard. Onbekende waarden worden genegeerd (het verzoek wordt nooit afgewezen) en de globale hoofdschakelaar regelt nog steeds alles: wanneer compressie globaal is uitgeschakeld, kan de header het niet inschakelen. Waarden:

| Waarde        | Effect                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `off`         | Geen compressie voor dit verzoek.                                                                             |
| `default`     | Het paneel-afgeleide standaardprofiel (negeert het actieve profiel). Lossy engines blijven uit.               |
| `safe`        | Hetzelfde als het weglaten van de header: alleen dedup en witruimte vouwen.                                   |
| `allow-lossy` | Behoud het operatorplan van dit verzoek, inclusief samenvattingen, relevantiefilters en stijlherschrijvingen. |
| `engine:<id>` | Een enkele engine wanneer ingeschakeld, bijv. `engine:rtk`. Dit is de per-verzoek opt-in voor die engine.     |
| `<combo>`     | Een benoemde combo, eerst gematcht op naam (hoofdletterongevoelig), daarna op id.                             |

Zonder `allow-lossy`, `engine:<id>` of een benoemde combo worden lossy engines niet toegepast. Het verzoek krijgt nog steeds sessie-dedup en witruimte vouwen wanneer compressie is ingeschakeld.

Het toegepaste plan wordt teruggestuurd in de `X-OmniRoute-Compression: <mode>; source=<source>` antwoordheader, waarbij `<source>` een van `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` of `off` is.

### API

```bash
# Compressie-instellingen ophalen
curl http://localhost:20128/api/settings/compression

# Compressie-instellingen bijwerken
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Een specifieke RTK/gestapelde payload bekijken
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filterpakketten weergeven
curl http://localhost:20128/api/context/rtk/filters

# RTK direct testen met optionele commandometadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Wat wordt beschermd

De compressie-engine **behoudt altijd:**

- ✅ Codeblokken (omheind en inline)
- ✅ URL's en bestandspaden
- ✅ JSON-structuren en gestructureerde gegevens
- ✅ Identifiers en beschermde technische tokens
- ✅ Wiskundige uitdrukkingen
- ✅ Definities van tool-/functieaanroepen
- ✅ Systeemprompts (in lite-modus)

RTK-herstel van onbewerkte uitvoer censureert veelvoorkomende API-sleutels, bearer-tokens, Slack-tokens, AWS-toegangssleutels,
wachtwoorden, tokens en geheimen voordat er iets wordt opgeslagen.

---

## Compressiestatistieken

Elke gecomprimeerde aanvraag bevat statistieken in de serverlogboeken:

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

## Fasenoverzicht

| Fase    | Modi                                                                                                                                            | Status       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Fase 1  | Uit, Lite                                                                                                                                       | ✅ Verzonden |
| Fase 2  | Standaard, Agressief, Ultra                                                                                                                     | ✅ Verzonden |
| Fase 3  | RTK, Gestapeld, Compressiecombinaties                                                                                                           | ✅ Verzonden |
| Fase 4  | Uitvoerstijlen, SLM-tier Ultra, eval-harnas                                                                                                     | ✅ Verzonden |
| Fase 4C | Adaptief contextbudget ("draaiknop") — rekenengine + API (`contextBudget` op `PUT /api/settings/compression`) + dashboardmodus/beleidscontroles | ✅ Verzonden |

---

## Dankbetuigingen

De compressieregels van de Standard-modus zijn geïnspireerd op **[Caveman](https://github.com/JuliusBrussee/caveman)** van **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — het virale project "waarom veel tokens gebruiken als weinig tokens ook werken". Caveman rapporteert `~75%` minder uitvoertokens, een gemiddelde uitvoerbesparing van `65%` in benchmarks, een uitvoerbereik van `22-87%` en een tool voor invoercompressie van `~46%`.

De RTK-modus is geïnspireerd op **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** van **[RTK AI](https://github.com/rtk-ai)** — het hoogwaardige project voor compressie van opdrachtuitvoer voor terminal-, build-, test-, git- en tooluitvoerfiltering. RTK rapporteert een besparing van `60-90%`, waarbij de voorbeeldsessie in de README een besparing van `~80%` laat zien.

---

## Geavanceerde compressiesystemen

Naast de 7 standaardmodi bevat OmniRoute diverse geavanceerde compressiesystemen
die automatisch werken op basis van de context.

### Cachebewuste compressie

Sommige providers (zoals Anthropic met promptcaching) ondersteunen **promptcaching**,
waarmee ze delen van de prompt kunnen cachen om kosten en latentie te verlagen. Wanneer
caching is ingeschakeld, kan agressieve compressie de prestaties juist **verslechteren**,
omdat hierdoor de gecachte tokens veranderen en de cache ongeldig wordt.

De module `cachingAware.ts` lost dit op door **de cachingcontext te detecteren** en
**de compressiestrategie dienovereenkomstig aan te passen**.

#### Hoe het werkt

1. **Cachingcontext detecteren** — Scant de requestbody op `cache_control`-markeringen
2. **Cachingproviders identificeren** — Controleert of de doelprovider caching ondersteunt
3. **Strategie aanpassen** — Schakelt voor cachingproviders terug van `aggressive`/`ultra` naar `standard`
4. **Systeemprompt overslaan** — Systeemprompts worden meestal gecacht, dus comprimeer ze niet
5. **Deterministische transformaties gebruiken** — Gebruikt alleen transformaties die consistente uitvoer produceren

#### Codevoorbeeld

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cachemarkering
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Wanneer te gebruiken

Cachebewuste compressie is **altijd actief** — er is geen configuratie nodig. Deze wordt
alleen geactiveerd wanneer:

- De request `cache_control`-markeringen bevat
- De doelprovider promptcaching ondersteunt (Anthropic, OpenAI enz.)

### Progressieve veroudering

Lange gesprekken verzamelen veel berichtbeurten, maar oudere beurten worden minder
relevant. De module `progressiveAging.ts` **reduceert berichten op basis van de afstand in beurten**:

- **Recente beurten (0-3)**: Ongewijzigd behouden (volledig detail)
- **Middellange beurten (4-8)**: Lichte compressie (opschonen van witruimte en opmaak)
- **Oude beurten (9+)**: Holbewonercompressie (stopwoorden verwijderen, samenvatten)
- **Zeer oude beurten (20+)**: Sterk samengevat of verwijderd

#### Codevoorbeeld

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... Nog 50 beurten ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Eerste 3 beurten: ongewijzigd
  light: 8, // Beurten 4-8: lichte compressie
  moderate: 20, // Beurten 9-20: holbewonercompressie
  // Beurten 21+: sterke samenvatting
});

// saved = aantal bespaarde tokens
```

#### Wanneer te gebruiken

Progressieve veroudering is **altijd actief** voor de modi `aggressive` en `ultra`. Dit is
met name effectief voor:

- Langlopende programmeersessies
- Gesprekken die meerdere dagen duren
- Agentische workflows met veel toolaanroepen

### Holbewoneruitvoermodus

De module `outputMode.ts` injecteert **systeempromptinstructies** om het model
zelf gecomprimeerde, bondige uitvoer te laten produceren (een ‘holbewonerstijl’).

#### Hoe het werkt

In plaats van de invoer te comprimeren, voegt deze modus een systeemprompt toe zoals:

> "Antwoord met zo min mogelijk woorden. Sla beleefdheden over. Gebruik korte zinnen."

Dit werkt bijzonder goed voor:

- Codegeneratie (beknoptere uitvoer = minder tokens)
- Snelle vragen en antwoorden (geen uitgebreide uitleg nodig)
- Batchverwerking (maximale doorvoer)

#### Wanneer te gebruiken

De holbewoneruitvoermodus is **optioneel** — stel deze in via de comboconfiguratie:

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

### Uitvoerstijlen (catalogus)

De bovenstaande holbewoneruitvoermodus is het **verouderde pad met één stijl**. Fase 4 heeft dit
gegeneraliseerd tot een catalogus van combineerbare uitvoerstijlen: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Elke stijl is een systeempromptinstructie
die het model zelf goedkopere uitvoer laat produceren; stijlen kunnen samen worden ingeschakeld
en worden in de volgorde van de catalogus geïnjecteerd.

| Stijl                                    | `id`          | Wat het doet                                                                                                                                                                                                                      | Instructietalen                                                         |
| ---------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Beknopt proza                            | `terse-prose` | Laat opvulling/lidwoorden/voorbehouden weg; behoud de technische inhoud exact. Dezelfde tekst als de verouderde holbewonermodus (waarnaar wordt verwezen, niet opnieuw uitgeschreven).                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| Minder code                              | `less-code`   | YAGNI-ladder: kleinste werkende wijziging, geen niet-gevraagde abstracties.                                                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| Paardenstaart (luie senior ontwikkelaar) | `ponytail`    | "De beste code is code die nooit is geschreven": hergebruik > herschrijven, hoofdoorzaak > symptoom, kortste werkende diff.                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| Ik heb ADHD (actie eerst)                | `i-have-adhd` | Actie eerst (opdracht/pad/fragment vóór proza), genummerde begrensde stappen, ÉÉN concrete volgende stap, geen inleiding/samenvatting/afsluiting. Gebaseerd op [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| Beknopt CJK (文言)                       | `terse-cjk`   | Ultrakorte klassiek-Chinese stijl.                                                                                                                                                                                                | zh (localegebonden: alleen aangeboden wanneer de bepaalde taal `zh` is) |

Elke stijl wordt geleverd met drie intensiteitsniveaus — `lite`, `full`, `ultra` — en elk niveau
eindigt met de gedeelde begrenzingsclausule, die codeblokken, bestandspaden, opdrachten,
foutmeldingen, URL's en identificatoren ongewijzigd laat.

#### Hoe injectie werkt

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) toetst
de selectie aan de catalogus (onbekende id's en stijlen die niet bij de locale passen
worden verwijderd, nooit als fout behandeld), voegt de geselecteerde instructies in catalogusvolgorde samen,
voegt de begrenzingsclausule **eenmaal** toe en begint het blok met één idempotentiemarkering
(`[OmniRoute Output Styles]`), zodat opnieuw toepassen niets doet. Wanneer voor de bepaalde
taal (zie Taalselectie hieronder) een vertaling beschikbaar is, wordt de gelokaliseerde instructie
geïnjecteerd in plaats van de Engelse.

Bij een body met `messages` controleert een inhoudsbypass (`shouldBypassCavemanOutputMode()` in
`open-sse/services/compression/outputMode.ts`) de laatste drie berichten en slaat
de stijlen voor de hele beurt over wanneer deze overeenkomen met trefwoorden voor beveiliging,
onomkeerbare acties, verduidelijking of volgordegevoeligheid. De bypass wordt uitgevoerd volgens de instelling van
de schakelaar **Automatische duidelijkheidsbypass** (`cavemanOutputMode.autoClarity`) in het dashboard.

Wanneer de bypass de beurt doorlaat, plaatst `placeSystemInstruction()` (hetzelfde bestand), dat
nooit een nieuwe `messages[0]` aanmaakt, het blok op de eerste van deze gevonden locaties:

1. Een vooraanstaand systeembericht met tekenreeksinhoud: het blok wordt na de tekst toegevoegd.
2. Het `system`-veld op het hoogste niveau: het blok wordt na de tekst van een tekenreeks toegevoegd, of
   als een nieuw tekstblok aan een array met inhoudsblokken toegevoegd.
3. Het eerste latere systeembericht met tekenreeksinhoud: het blok wordt na de
   tekst toegevoegd.
4. Geen van bovenstaande: het blok wordt in een nieuw systeembericht aan het einde van `messages` geplaatst.

Bij een body zonder `messages` wordt het blok toegevoegd aan een `instructions`-veld met een tekenreeks,
of wordt het `instructions` wanneer de body `input` bevat (een tekenreeks of een array). Een body
zonder `instructions` én zonder `input` wordt overgeslagen als `no_messages`.

#### Inschakelen

In het dashboard: **Context → Instellingen → Compressie** — één rij per stijl met een
aan/uit-schakelaar en een niveaukiezer. Programmatisch bewaart de compressieconfiguratie
de selectie als:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Achterwaartse compatibiliteit: de verouderde combinatie-instelling `outputMode: "caveman"` werkt nog steeds en wordt toegewezen aan
`terse-prose`, byte-identiek aan de oude injectie in elke verouderde taal.

Taalselectie: als `languageConfig.enabled` is ingeschakeld, kiest `autoDetect` de
taal van het meest recente gebruikersbericht (dezelfde detector als de invoerengines);
als `autoDetect` wordt uitgeschakeld, wordt `defaultLanguage` vastgezet. Uitgeschakeld → Engels.

De stijl-×-taalmatrix wordt vastgelegd door
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: een nieuwe stijl kan niet worden uitgebracht
zonder ten minste een pt-BR-vertaling (of een expliciet bijgehouden uitzondering), en een
bestaande stijl kan niet stilzwijgend een locale verliezen. Zie
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) om een stijl toe te voegen.

### Compressie van toolresultaten

De module `toolResultCompressor.ts` biedt **5 gespecialiseerde compressiestrategieën**
voor toolresultaten (functieaanroepen, agentuitvoer, zoekresultaten, enz.):

1. **Compressie van zoekresultaten** — Verwijdert redundante resultaten, behoudt de beste N
2. **Compressie van gelezen bestanden** — Kapt grote bestanden af, behoudt headers/imports
3. **Compressie van code-uitvoering** — Behoudt alleen essentiële stdout/stderr
4. **Compressie van databasequery's** — Beperkt rijen, verwijdert uitgebreide metadata
5. **Compressie van API-responsen** — Verwijdert null-velden, verkort arrays

#### Wanneer te gebruiken

Compressie van toolresultaten staat **altijd aan** wanneer er toolaanroepen aanwezig zijn. Er is geen
configuratie nodig.

### Gestapelde pijplijn

De gestapelde modus voert **meerdere engines na elkaar uit** — doorgaans eerst RTK
(60-90% besparing op tooluitvoer), gevolgd door Caveman (30% extra besparing op de
resterende tekst). Dit levert een **totale besparing van 78-95%** op.

#### Hoe het werkt

```
Invoer (1000 tokens)
  → RTK (opdrachtherkennend filter) → 200 tokens
    → Caveman (verwijdering van opvultekst) → 140 tokens
  → Uitvoer (140 tokens, 86% besparing)
```

#### Wanneer te gebruiken

Gebruik de gestapelde modus voor:

- Workflows met veel toolgebruik (agentgestuurd programmeren, onderzoek)
- Kostengevoelige batchverwerking
- Wanneer je maximale tokenbesparing nodig hebt

Configureer via combo:

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

## Overschrijvingen voor compressiecombinaties

Je kunt de globale compressiemodus **per combinatie** overschrijven om het gedrag
voor verschillende gebruikssituaties nauwkeurig af te stemmen:

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

Dit is nuttig voor:

- **Codeercombinaties**: Gebruik de modus `aggressive` voor lange sessies
- **Snelle vraag-en-antwoordcombinaties**: Gebruik de modus `lite` voor snelle antwoorden
- **Combinaties met veel tools**: Gebruik de modus `stacked` voor maximale besparingen
- **Productiecombinaties**: Gebruik de modus `cache-aware` voor providers met caching

---

## Zie ook

- [Omgevingsconfiguratie](../reference/ENVIRONMENT.md) — Omgevingsvariabelen voor compressie
- [Architectuurgids](../architecture/ARCHITECTURE.md) — Interne werking van de compressiepijplijn
- [Gebruikershandleiding](../guides/USER_GUIDE.md) — Aan de slag met compressie
- [RTK-compressie](./RTK_COMPRESSION.md) — RTK-filters, vertrouwensmodel, verificatiepoort en herstel van onbewerkte uitvoer
- [Compressie-engines](./COMPRESSION_ENGINES.md) — Caveman, RTK, gestapelde verwerking, API's, MCP en dashboard
- [Indeling van compressieregels](./COMPRESSION_RULES_FORMAT.md) — Indeling van JSON-regelpakketten
- [Taalpakketten voor compressie](./COMPRESSION_LANGUAGE_PACKS.md) — Taalspecifieke Caveman-regels
