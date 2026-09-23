# 🗜️ Prompt Compression Guide — OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spar automatisk 15-95 % på kvalificeret kontekst. Du kan få et hurtigt overblik i [README-afsnittet om komprimering](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Oversigt

OmniRoute implementerer en modulær pipeline til promptkomprimering, der kører **proaktivt**, før anmodninger når upstream-udbydere. Det betyder, at dine tokenbesparelser sker transparent — uden at du behøver at ændre din arbejdsgang.

```
Klientanmodning
  → Valg af komprimeringsstrategi
    → Combo-tilsidesættelse? → Brug combo-indstillingen
    → Tærskel for automatisk aktivering? → Brug automatisk tilstand
    → Standardtilstand? → Brug global indstilling
    → Deaktiveret? → Spring komprimering over
  → Valgt komprimeringstilstand
    → Deaktiveret: Ingen komprimering
    → Let: Sikker oprydning af mellemrum/formatering (~15 %)
    → Standard: Fjernelse af fyldord i telegramstil (~30 %)
    → Aggressiv: Aldring af historik + opsummering (~50 %)
    → Ultra: Heuristisk beskæring + udtynding af kodeblokke (~75 %)
    → RTK: Kommandobevidst filtrering af terminal-/værktøjsoutput (60-90 % upstream-interval)
    → Stablet: Ordnet pipeline med flere motorer, normalt RTK efterfulgt af Caveman (78-95 % kvalificeret interval)
  → Komprimeret anmodning → Udbyder
```

---

## Komprimeringstilstande

### Deaktiveret

Der anvendes ingen komprimering. Alle meddelelser sendes uændret igennem.

### Let tilstand (~15 % besparelse, <1 ms latenstid)

Den sikreste tilstand — ingen semantiske ændringer, kun oprydning af formatering:

| Teknik                   | Beskrivelse                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `collapseWhitespace`     | Flet fortløbende tomme linjer, og fjern afsluttende mellemrum |
| `dedupSystemPrompt`      | Fjern identiske systemmeddelelser                             |
| `compressToolResults`    | Komprimer detaljeret værktøjs-/funktionsoutput                |
| `removeRedundantContent` | Fjern gentagne instruktioner                                  |
| `replaceImageUrls`       | Forkort base64-billeddata-URI'er                              |

**Bedst til:** Konstant brug og sikkerhedskritiske arbejdsgange.

### Standardtilstand (~30 % besparelse)

Inspireret af [Caveman](https://github.com/JuliusBrussee/caveman) — fjerner fyldord og omstændelige formuleringer uden at ændre betydningen:

- Fjerner fyldord ("please", "I think", "basically", "actually")
- Forkorter omstændelige vendinger ("in order to" → "to", "as a result of" → "because")
- Fjerner høflige forbehold ("Would you mind...", "If you could possibly...")
- Mere end 30 regex-regler, der er finjusteret til kodningsprompter

**Bedst til:** Daglige kodningsarbejdsgange og omkostningsbevidste teams.

### Aggressiv tilstand (~50 % besparelse)

Intelligent historikhåndtering til lange sessioner:

- **Aldring af meddelelser** — ældre meddelelser komprimeres gradvist
- **Opsummering af værktøjsresultater** — lange værktøjsoutput erstattes med opsummeringer
- **Kontrol af strukturel integritet** — sikrer, at `tool_use`- og `tool_result`-par forbliver konsistente
- **Kontekstvinduebevidsthed** — overholder tokengrænserne for hver model

**Bedst til:** Længere fejlfindingssessioner og store kodebaser.

### Ultra-tilstand (~75 % besparelse)

Maksimal komprimering til scenarier med kritiske tokenbegrænsninger:

- **Heuristisk beskæring** — fjerner meddelelser under relevanstærsklen
- **Udtynding af kodeblokke** — komprimerer gentagne kodeeksempler
- **Trunkering med binær søgning** — finder det optimale afskæringspunkt for kontekstvinduet
- Indeholder alle funktioner fra Aggressiv tilstand

**Bedst til:** Når du gentagne gange når kontekstgrænserne.

### RTK-tilstand (60-90 % upstream-interval)

RTK-tilstand er optimeret til detaljerede værktøjsoutput, der forekommer i sessioner med kodningsagenter:

- Registrerer kommando-/outputklasser såsom `git status`, `git diff`, `git log`, testkørsler,
  TypeScript-/Vite-/Webpack-builds, ESLint/Biome/Prettier, npm-revisioner/-installationer, Docker-logfiler, infrastrukturoutput
  og generisk shell-output
- Anvender JSON-filterpakker fra `open-sse/services/compression/engines/rtk/filters/`
- Importerer filtre med RTK TOML-skema v1 fra projektets eller globale `filters.toml`-filer med validering
  via indlejrede test og tillidskontrol af projektfiler
- Leveres med 49 indbyggede filtre med indlejrede verifikationseksempler
- Fjerner ANSI-kontrolsekvenser, statuslinjer, gentagne linjer og støj, der ikke kan handles på
- Bevarer fejl, advarsler, ændrede filer, opsummeringer og afslutningen på lange output
- Understøtter tillidskontrollerede projektfiltre, globale filtre og valgfri gendannelse af råoutput med bortredigerede oplysninger

**Bedst til:** Agentsessioner med transskripter fra shell, builds, test, git, grep og filoutput.

### Stablet tilstand (78-95 % kvalificeret interval)

Stablet tilstand kører flere komprimeringsmotorer i en deterministisk rækkefølge. Standardpipelinen er:

```txt
RTK -> Caveman
```

Denne rækkefølge komprimerer først terminal-/værktøjsoutput og anvender derefter Cavemans semantiske kondensering på
den resterende prompt i naturligt sprog. Stablede pipelines kan konfigureres globalt eller gennem
komprimeringscomboer, der er tildelt routingcomboer.

**Bedst til:** Blandet kontekst med store værktøjslogfiler samt menneskelige instruktioner eller assistentopsummeringer.

---

## Beregning af upstream-besparelser

OmniRoute dokumenterer komprimeringsbesparelser fra to kilder: benchmarks fra upstream-projekter og
OmniRoutes egen kombination af motorer.

| Kilde   | Tal fra upstream-README anvendt her                                                                                                           |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` færre outputtokens, `65%` gennemsnitlig outputbesparelse i benchmarks, interval på `22-87%` og et værktøj til `~46%` inputkomprimering |
| RTK     | `60-90%` besparelse på kommandooutput; eksempelsession med `~118,000 -> ~23,900` tokens eller `79.7%` sparet (`~80%`)                         |

For overlappende værktøjs-/kontekstpayloads stakker OmniRoutes standardkombination motorerne:

```txt
RTK -> Caveman
```

De kombinerede besparelser er multiplikative, ikke additive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Tallet `78-95%` gælder, når både RTK og Caveman kan reducere den samme input-/kontekstpayload.
Cavemans outputtilstand for svar er separat: Når den er aktiveret, anvendes Cavemans egne outputbesparelser (`65%`
i gennemsnit, `~75%` som hovedtal, interval på `22-87%`). De samlede faktureringsbesparelser afhænger af din blanding af prompts og output.

### Hvad "kvalificeret" faktisk betyder

Det angivne interval på 15-95% er reelt, men det gælder kun for **redundant eller omstændeligt** indhold — gentagne
fejllinjer, en buildlog, der spammer den samme advarsel, eller et overdimensioneret `grep`-/fillæsningsdump. Det
betyder **ikke**, at hver anmodning sparer så meget.

Empirisk verificeret (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): En
`stacked`-kørsel (RTK + Caveman) mod en Anthropic-formet `tool_result`-blok med 300 identiske
fejllinjer gav **95.93% tokenbesparelse / 96.26% tegnbesparelse** — helt inden for det annoncerede
interval. Men når den samme pipeline køres mod normalt, ikke-redundant værktøjsoutput (en ren `grep`-matchliste,
en kort fillæsning eller almindelig samtaletekst), giver den korrekt **næsten ingen besparelse**, fordi
der ikke er noget gentaget at fjerne, og `validateCompression()` (`validation.ts`) nægter at levere en
omskrivning, der ville fjerne eller ændre kodeblokke, URL'er, overskrifter, versioner eller konstantidentifikatorer skrevet med STORE BOGSTAVER.

Dette er forventet og sikker adfærd, ikke en fejl: En kodningssession, der primært læser/søger med grep i rene filer, vil
opleve beskedne samlede besparelser, selv når komprimering er fuldt aktiveret, mens en session, der rammer en fejlende
løkke eller en snakkesalig linter, vil opleve hele intervallet på 78-95% for den trafik. Brug ikke en enkelt sessions
lave samlede besparelsesprocent som bevis på, at komprimeringen er fejlkonfigureret — kontrollér først, om det
underliggende værktøjsoutput faktisk var redundant.

---

## Visualisering af tokenbesparelser

```
Uden komprimering: 47K tokens sendt til LLM
Med Lite:          40K tokens sendt          (15% sparet — sikkert, altid aktiveret)
Med Standard:      33K tokens sendt          (30% sparet — caveman-speak-regler)
Med Aggressive:    24K tokens sendt          (50% sparet — aldring + opsummering)
Med Ultra:         12K tokens sendt          (75% sparet — heuristisk beskæring)
Med RTK:           19K-5K tokens sendt       (60-90% sparet på kommando-/værktøjsoutput)
Med Stacked:       10K-2.5K tokens sendt     (kvalificeret RTK+Caveman-interval på 78-95%)
```

---

## Konfiguration

### Dashboard

Gå til `Dashboard → Context & Cache`:

- **Caveman** — valg af tilstand, sprogpakker, forhåndsvisning og globale standardindstillinger
- **RTK** — forhåndsvisning af kommandofilter, RTK-sikkerhedsindstillinger og filterkatalog
- **Komprimeringskombinationer** — navngivne pipelines af motorer, som er tildelt routingkombinationer
- **Tærskel for automatisk aktivering** — aktivér automatisk komprimering, når antallet af tokens overstiger tærsklen

### Tilsidesættelse pr. kombination

I `Dashboard → Context & Cache → Compression Combos` skal du tildele en komprimeringskombination til
en routingkombination:

```txt
Kombination: "free-tier-fallback"
  Komprimeringskombination: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Mål:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dette giver dig mulighed for at bruge stablet komprimering hos gratis udbydere/kodningsudbydere,
mens let tilstand bevares for betalte abonnementer.

Denne tildeling af en "tilsidesættelse pr. kombination" er en anden indstilling end tilsidesættelsen
af **routingkombinationens komprimeringstilstand** (Default/Off/Lite/Standard/Aggressive/Ultra) —
denne tilsidesættelse vælger ikke en navngiven pipeline for en komprimeringskombination; den angiver
blot feltet `compressionMode`, som anvendes af `resolveCompressionPlan`. Den kan enten angives på
kombinationskortet (`Dashboard → Combos`) eller, siden #6760, pr. routingkombination på listen
"Assign to routing" under `Dashboard → Context & Cache → Compression Combos`, lige ved siden af
afkrydsningsfeltet til tildeling af pipeline, som er dokumenteret ovenfor. Begge grænseflader gemmer
via det samme `PUT /api/combos/{id}`-slutpunkt.

### Tilsidesættelse pr. anmodning

Send anmodningsheaderen `x-omniroute-compression` for at tilsidesætte komprimeringsplanen for en
enkelt anmodning. Den har højeste prioritet — den går forud for tilsidesættelsen for
routingkombinationen, den aktive profil, automatisk aktivering og panelets standardindstilling.
Ukendte værdier ignoreres (anmodningen afvises aldrig), og den globale hovedkontakt styrer stadig
alt: Når komprimering er slået fra globalt, kan headeren ikke slå den til. Værdier:

| Værdi         | Effekt                                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering for denne anmodning.                                                                           |
| `default`     | Panelets afledte standardprofil (ignorerer den aktive profil).                                                    |
| `engine:<id>` | En enkelt motor, når den er aktiveret, f.eks. `engine:rtk`.                                                       |
| `<combo>`     | En navngiven kombination, først matchet efter navn (uden forskel på store og små bogstaver) og derefter efter id. |

Den anvendte plan returneres i responsheaderen
`X-OmniRoute-Compression: <mode>; source=<source>`, hvor `<source>` er én af `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` eller `off`.

### API

```bash
# Hent komprimeringsindstillinger
curl http://localhost:20128/api/settings/compression

# Opdater komprimeringsindstillinger
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Forhåndsvis en bestemt RTK/stablet payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Vis RTK-filterpakker
curl http://localhost:20128/api/context/rtk/filters

# Test RTK direkte med valgfri kommandometadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Hvad der beskyttes

Komprimeringsmotoren **bevarer altid:**

- ✅ Kodeblokke (indhegnede og integrerede)
- ✅ URL'er og filstier
- ✅ JSON-strukturer og strukturerede data
- ✅ Identifikatorer og beskyttede tekniske tokens
- ✅ Matematiske udtryk
- ✅ Definitioner af værktøjs-/funktionskald
- ✅ Systemprompter (i let tilstand)

RTK's gendannelse af råt output maskerer almindelige API-nøgler, bearer-tokens, Slack-tokens, AWS-adgangsnøgler,
adgangskoder, tokens og hemmeligheder, før noget gemmes.

---

## Komprimeringsstatistik

Hver komprimeret anmodning inkluderer statistik i serverloggene:

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

## Faseplan

| Fase    | Tilstande                                                                                                                                                         | Status     |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fase 1  | Fra, Let                                                                                                                                                          | ✅ Udgivet |
| Fase 2  | Standard, Aggressiv, Ultra                                                                                                                                        | ✅ Udgivet |
| Fase 3  | RTK, Stablet, Komprimeringskombinationer                                                                                                                          | ✅ Udgivet |
| Fase 4  | Outputformater, Ultra på SLM-niveau, evalueringsrammeværk                                                                                                         | ✅ Udgivet |
| Fase 4C | Adaptivt kontekstbudget ("drejeknap") — beregningsmotor + API (`contextBudget` på `PUT /api/settings/compression`) + kontrolpanel til styring af tilstand/politik | ✅ Udgivet |

---

## Anerkendelser

Komprimeringsreglerne i standardtilstand er inspireret af **[Caveman](https://github.com/JuliusBrussee/caveman)** af **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virale projekt "why use many token when few token do trick". Caveman rapporterer `~75%` færre outputtokens, en gennemsnitlig outputbesparelse på `65%` i benchmarks, et outputinterval på `22-87%` og et værktøj til inputkomprimering på `~46%`.

RTK-tilstanden er inspireret af **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** af **[RTK AI](https://github.com/rtk-ai)** — højtydende komprimering af kommandooutput til filtrering af terminal-, build-, test-, git- og værktøjsoutput. RTK rapporterer besparelser på `60-90%`, hvor eksempelsessionen i projektets README viser en besparelse på `~80%`.

---

## Avancerede komprimeringssystemer

Ud over de 7 standardtilstande indeholder OmniRoute flere avancerede komprimeringssystemer,
der fungerer automatisk ud fra konteksten.

### Cachebevidst komprimering

Nogle udbydere (som Anthropic med promptcachelagring) understøtter **promptcachelagring**,
som giver dem mulighed for at cachelagre dele af prompten for at reducere omkostninger og latenstid. Når
cachelagring er aktiveret, kan aggressiv komprimering faktisk **forringe** ydeevnen,
fordi den ændrer de cachelagrede tokens og dermed ugyldiggør cachen.

Modulet `cachingAware.ts` løser dette ved at **registrere cachekontekst** og
**justere komprimeringsstrategien** tilsvarende.

#### Sådan fungerer det

1. **Registrer cachekontekst** — Gennemsøger anmodningens brødtekst for `cache_control`-markører
2. **Identificer cacheudbydere** — Kontrollerer, om måludbyderen understøtter cachelagring
3. **Juster strategi** — Nedgraderer `aggressive`/`ultra` til `standard` for cacheudbydere
4. **Spring systemprompten over** — Systemprompter cachelagres normalt, så de skal ikke komprimeres
5. **Brug deterministiske transformationer** — Brug kun transformationer, der giver ensartet output

#### Kodeeksempel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cachemarkør
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Hvornår det skal bruges

Cachebevidst komprimering er **altid aktiveret** — ingen konfiguration er nødvendig. Den træder kun i kraft,
når:

- Anmodningen har `cache_control`-markører
- Måludbyderen understøtter promptcachelagring (Anthropic, OpenAI osv.)

### Progressiv aldring

Lange samtaler akkumulerer mange beskedudvekslinger, men ældre udvekslinger bliver mindre
relevante. Modulet `progressiveAging.ts` **forringer beskeder baseret på afstanden mellem udvekslinger**:

- **Nylige udvekslinger (0-3)**: Bevares ordret (alle detaljer)
- **Mellemliggende udvekslinger (4-8)**: Let komprimering (oprydning af blanktegn og formatering)
- **Gamle udvekslinger (9+)**: Caveman-komprimering (fjernelse af fyldord, opsummering)
- **Meget gamle udvekslinger (20+)**: Opsummeres kraftigt eller udelades

#### Kodeeksempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 yderligere udvekslinger ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // De første 3 udvekslinger: ordret
  light: 8, // Udveksling 4-8: let komprimering
  moderate: 20, // Udveksling 9-20: Caveman-komprimering
  // Udveksling 21+: kraftig opsummering
});

// saved = antal sparede tokens
```

#### Hvornår det skal bruges

Progressiv aldring er **altid aktiveret** for tilstandene `aggressive` og `ultra`. Det er
særligt effektivt til:

- Langvarige kodningssessioner
- Samtaler over flere dage
- Agentbaserede arbejdsgange med mange værktøjskald

### Caveman-outputtilstand

Modulet `outputMode.ts` indsætter **systempromptinstruktioner**, der får selve
modellen til at generere komprimeret, kortfattet output (en "hulemandsstil").

#### Sådan fungerer det

I stedet for at komprimere inputtet tilføjer denne tilstand en systemprompt såsom:

> "Svar med så få ord som muligt. Spring høflighedsfraser over. Brug korte sætninger."

Dette fungerer særligt godt til:

- Kodegenerering (mere kortfattet output = færre tokens)
- Hurtige spørgsmål og svar (intet behov for udførlige forklaringer)
- Batchbehandling (maksimer gennemløbet)

#### Hvornår det skal bruges

Caveman-outputtilstand er **valgfri** — indstil den via kombinationskonfigurationen:

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

### Outputstile (katalog)

Caveman-outputtilstanden ovenfor er den **ældre vej med én enkelt stil**. Fase 4 generaliserede den
til et katalog over outputstile, der kan kombineres: `OUTPUT_STYLE_CATALOG` i
`open-sse/services/compression/outputStyles/catalog.ts`. Hver stil er en systempromptinstruktion,
der får selve modellen til at generere billigere output; stilarter kan aktiveres
sammen og indsættes i katalogrækkefølge.

| Stil                             | `id`          | Hvad den gør                                                                                                                                                                                                                                   | Instruktionssprog                                                                 |
| -------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Kortfattet prosa                 | `terse-prose` | Fjerner fyldord/artikler/forbehold; bevarer det tekniske indhold præcist. Samme tekst som den ældre Caveman-outputtilstand (refereret, ikke skrevet igen).                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| Mindre kode                      | `less-code`   | YAGNI-trin: mindste fungerende ændring, ingen uønskede abstraktioner.                                                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| Hestehale (doven seniorudvikler) | `ponytail`    | "Den bedste kode er den kode, der aldrig blev skrevet": genbrug > omskrivning, grundårsag > symptom, korteste fungerende diff.                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| Jeg har ADHD (handling først)    | `i-have-adhd` | Handling først (kommando/sti/kodestykke før prosa), nummererede afgrænsede trin, ÉT konkret næste trin, ingen indledning/opsummering/afslutningsbemærkninger. Tilpasset fra [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| Kortfattet CJK (文言)            | `terse-cjk`   | Ultrakortfattet stil på klassisk kinesisk.                                                                                                                                                                                                     | zh (begrænset efter landestandard: tilbydes kun, når det fastlagte sprog er `zh`) |

Hver stil leveres med tre intensitetsniveauer — `lite`, `full`, `ultra` — og hvert niveau
slutter med den fælles afgrænsningsklausul, som bevarer kodeblokke, filstier, kommandoer,
fejlstrenge, URL'er og identifikatorer ordret.

#### Sådan fungerer indsættelsen

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) sammenholder
valget med kataloget (ukendte id'er og stilarter, der ikke matcher landestandarden,
udelades og medfører aldrig en fejl), sammenkæder de valgte instruktioner i katalogrækkefølge,
tilføjer afgrænsningsklausulen **én gang** og placerer resultatet forrest i systemprompten
efter én enkelt idempotensmarkør (`[OmniRoute Output Styles]`) — gentagen anvendelse
gør intet. Når det registrerede anmodningssprog har en oversættelse, indsættes den
lokaliserede instruktion i stedet for den engelske.

#### Sådan aktiveres det

I dashboardet: **Kontekst → Indstillinger → Komprimering** — én række pr. stil med en
til/fra-knap og en niveauvælger. Programmatisk gemmer komprimeringskonfigurationen
valget som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Bagudkompatibilitet: Den ældre kombinationsindstilling `outputMode: "caveman"` fungerer stadig og knyttes til
`terse-prose`, byte-identisk med den gamle indsættelse på alle ældre sprog.

Sprogvalg: Når `languageConfig.enabled` er slået til, vælger `autoDetect`
sproget i den seneste brugermeddelelse (samme detektor som inputmotorerne);
hvis `autoDetect` slås fra, fastholdes `defaultLanguage`. Fra → engelsk.

Stil × sprog-matricen fastholdes af
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: En ny stil kan ikke udgives
uden mindst en pt-BR-oversættelse (eller en eksplicit registreret undtagelse), og en
eksisterende stil kan ikke ubemærket miste en landestandard. Se
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) for at tilføje en stil.

### Komprimering af værktøjsresultater

Modulet `toolResultCompressor.ts` leverer **5 specialiserede komprimeringsstrategier**
til værktøjsresultater (funktionskald, agentoutput, søgeresultater osv.):

1. **Komprimering af søgeresultater** — Fjerner overflødige resultater og beholder de bedste N
2. **Komprimering af fillæsning** — Afkorter store filer og bevarer headere/importer
3. **Komprimering af kodekørsel** — Beholder kun nødvendig stdout/stderr
4. **Komprimering af databaseforespørgsler** — Begrænser rækker og fjerner udførlige metadata
5. **Komprimering af API-svar** — Fjerner null-felter og forkorter arrays

#### Hvornår det skal bruges

Komprimering af værktøjsresultater er **altid aktiveret**, når der forekommer værktøjskald. Ingen
konfiguration er nødvendig.

### Stablet pipeline

Stablet tilstand kører **flere motorer i rækkefølge** — normalt først RTK
(60-90 % besparelse på værktøjsoutput), derefter Caveman (yderligere 30 % besparelse på den
resterende tekst). Dette giver en **samlet besparelse på 78-95 %**.

#### Sådan fungerer det

```
Input (1000 tokens)
  → RTK (kommandobevidst filter) → 200 tokens
    → Caveman (fjernelse af fyldord) → 140 tokens
  → Output (140 tokens, 86 % besparelse)
```

#### Hvornår det skal bruges

Brug stablet tilstand til:

- Værktøjstunge arbejdsgange (agentbaseret kodning, research)
- Omkostningsfølsom batchbehandling
- Når du har brug for maksimale tokenbesparelser

Konfigurer via kombination:

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

## Tilsidesættelser for komprimeringskombinationer

Du kan tilsidesætte den globale komprimeringstilstand **for hver kombination** for at finjustere funktionsmåden
til forskellige brugsscenarier:

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

Dette er nyttigt til:

- **Kombinationer til kodning**: Brug tilstanden `aggressive` til lange sessioner
- **Kombinationer til hurtige spørgsmål og svar**: Brug tilstanden `lite` til hurtige svar
- **Værktøjstunge kombinationer**: Brug tilstanden `stacked` for maksimale besparelser
- **Produktionskombinationer**: Brug tilstanden `cache-aware` til udbydere med caching

---

## Se også

- [Miljøkonfiguration](../reference/ENVIRONMENT.md) — Miljøvariabler til komprimering
- [Arkitekturvejledning](../architecture/ARCHITECTURE.md) — Interne funktioner i komprimeringspipelinen
- [Brugervejledning](../guides/USER_GUIDE.md) — Kom godt i gang med komprimering
- [RTK-komprimering](./RTK_COMPRESSION.md) — RTK-filtre, tillidsmodel, verifikationsport og gendannelse af råt output
- [Komprimeringsmotorer](./COMPRESSION_ENGINES.md) — Caveman, RTK, stabling, API'er, MCP og dashboard
- [Format for komprimeringsregler](./COMPRESSION_RULES_FORMAT.md) — JSON-format til regelpakker
- [Sprogpakker til komprimering](./COMPRESSION_LANGUAGE_PACKS.md) — Sprogspecifikke Caveman-regler
