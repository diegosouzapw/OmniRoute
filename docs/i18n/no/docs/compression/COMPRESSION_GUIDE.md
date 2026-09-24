# 🗜️ Prompt Compression Guide — OmniRoute (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spar automatisk 15–95 % på kvalifisert kontekst. For en rask oversikt, se [delen om komprimering i README-filen](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Oversikt

OmniRoute implementerer en modulær pipeline for promptkomprimering som kjører **proaktivt** før forespørsler når oppstrømsleverandører. Dette betyr at tokenbesparelsene skjer transparent — uten at du trenger å endre arbeidsflyten.

```
Klientforespørsel
  → Valg av komprimeringsstrategi
    → Overstyring via kombinasjon? → Bruk kombinasjonsinnstillingen
    → Terskel for automatisk aktivering? → Bruk automatisk modus
    → Standardmodus? → Bruk global innstilling
    → Av? → Hopp over komprimering
  → Valgt komprimeringsmodus
    → Av: Ingen komprimering
    → Lett: Trygg opprydding av mellomrom/formatering (~15 %)
    → Standard: Fjerning av fyllord med Caveman (~30 %)
    → Aggressiv: Aldring av historikk + oppsummering (~50 %)
    → Ultra: Heuristisk beskjæring + uttynning av kodeblokker (~75 %)
    → RTK: Kommandobevisst filtrering av terminal-/verktøyutdata (60–90 % oppstrømsintervall)
    → Stablet: Ordnet pipeline med flere motorer, vanligvis RTK og deretter Caveman (78–95 % kvalifisert intervall)
  → Komprimert forespørsel → Leverandør
```

---

## Komprimeringsmoduser

### Av

Ingen komprimering brukes. Alle meldinger sendes gjennom uendret.

### Lett modus (~15 % besparelse, <1 ms ventetid)

Den tryggeste modusen — ingen semantisk endring, bare opprydding av formatering:

| Teknikk                  | Beskrivelse                                                     |
| ------------------------ | --------------------------------------------------------------- |
| `collapseWhitespace`     | Slår sammen etterfølgende tomme linjer og avsluttende mellomrom |
| `dedupSystemPrompt`      | Fjerner dupliserte systemmeldinger                              |
| `compressToolResults`    | Komprimerer omfattende verktøy-/funksjonsutdata                 |
| `removeRedundantContent` | Fjerner gjentatte instruksjoner                                 |
| `replaceImageUrls`       | Forkorter base64-data-URI-er for bilder                         |

**Best for:** Alltid aktiv bruk og sikkerhetskritiske arbeidsflyter.

### Standardmodus (~30 % besparelse)

Inspirert av [Caveman](https://github.com/JuliusBrussee/caveman) — fjerner fyllord og omstendelige formuleringer samtidig som meningen bevares:

- Fjerner fyllord («please», «I think», «basically», «actually»)
- Forkorter omstendelige fraser («in order to» → «to», «as a result of» → «because»)
- Fjerner høflige forbehold («Would you mind...», «If you could possibly...»)
- Over 30 regex-regler tilpasset kodeprompter

**Best for:** Daglige arbeidsflyter for koding og kostnadsbevisste team.

### Aggressiv modus (~50 % besparelse)

Smart historikkhåndtering for lange økter:

- **Aldring av meldinger** — eldre meldinger komprimeres gradvis
- **Oppsummering av verktøyresultater** — lange verktøyutdata erstattes med oppsummeringer
- **Vern av strukturell integritet** — sikrer at par med `tool_use` + `tool_result` forblir konsistente
- **Bevissthet om kontekstvinduet** — tar hensyn til tokengrenser per modell

**Best for:** Langvarige feilsøkingsøkter og store kodebaser.

### Ultra-modus (~75 % besparelse)

Maksimal komprimering for scenarier der tokenbruk er kritisk:

- **Heuristisk beskjæring** — fjerner meldinger under relevansterskelen
- **Uttynning av kodeblokker** — komprimerer repetitive kodeeksempler
- **Avkorting med binærsøk** — finner det optimale avkortingspunktet for kontekstvinduet
- Inkluderer alle funksjonene fra aggressiv modus

**Best for:** Når du gjentatte ganger når kontekstgrensene.

### RTK-modus (60–90 % oppstrømsintervall)

RTK-modus er optimalisert for omfattende verktøyutdata som forekommer i økter med kodeagenter:

- Oppdager kommando-/utdataklasser som `git status`, `git diff`, `git log`, testkjørere,
  TypeScript/Vite/Webpack-bygg, ESLint/Biome/Prettier, npm-revisjoner/-installasjoner, Docker-logger, infrastrukturutdata
  og generiske shell-utdata
- Bruker JSON-filterpakker fra `open-sse/services/compression/engines/rtk/filters/`
- Importerer RTK TOML schema v1-filtre fra prosjektets eller globale `filters.toml`-filer, med validering
  av innebygde tester og tillitskontroll for prosjektfiler
- Leveres med 49 innebygde filtre med innebygde verifiseringseksempler
- Fjerner ANSI-kontrollsekvenser, fremdriftsindikatorer, gjentatte linjer og irrelevant støy
- Bevarer feil, advarsler, endrede filer, oppsummeringer og slutten av lange utdata
- Støtter tillitskontrollerte prosjektfiltre, globale filtre og valgfri gjenoppretting av sladdede råutdata

**Best for:** Agentøkter med shell-, bygge-, test-, git-, grep- og filutdatatranskripsjoner.

### Stablet modus (78–95 % kvalifisert intervall)

Stablet modus kjører flere komprimeringsmotorer i en deterministisk rekkefølge. Standard-pipelinen er:

```txt
RTK -> Caveman
```

Denne rekkefølgen komprimerer først terminal-/verktøyutdata og bruker deretter semantisk kondensering med Caveman på
den gjenværende prompten i naturlig språk. Stablede pipelines kan konfigureres globalt eller gjennom
komprimeringskombinasjoner som er tilordnet rutingskombinasjoner.

**Best for:** Blandet kontekst med store verktøylogger samt instruksjoner fra brukere eller oppsummeringer fra assistenten.

---

## Utregning av oppstrømsbesparelser

OmniRoute dokumenterer komprimeringsbesparelser fra to kilder: referansemålinger fra oppstrømsprosjekter og
OmniRoutes egen kombinasjon av motorer.

| Kilde   | Tall fra oppstrøms-README som brukes her                                                                                                                       |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` færre utdatatokener, `65%` gjennomsnittlig utdatasparing i referansemålinger, et intervall på `22-87%` og et verktøy for `~46%` komprimering av inndata |
| RTK     | `60-90%` besparelse på kommandoutdata; eksempeløkt med `~118,000 -> ~23,900` tokener, eller `79.7%` spart (`~80%`)                                             |

For overlappende verktøy-/kontekstnyttelaster stabler OmniRoutes standardkombinasjon motorene:

```txt
RTK -> Caveman
```

De kombinerte besparelsene er multiplikative, ikke additive:

```txt
kombinert    = 1 - (1 - RTK-besparelse) * (1 - Caveman-inndatabesparelse)
gjennomsnitt = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervall    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Tallet `78-95%` gjelder når både RTK og Caveman kan redusere den samme inndata-/kontekstnyttelasten.
Cavemans modus for responsutdata er separat: Når den er aktivert, brukes Cavemans egne utdatabesparelser (`65%`
i gjennomsnitt, `~75%` som hovedtall, et intervall på `22-87%`). De totale faktureringsbesparelsene avhenger av blandingen av ledetekster og utdata.

### Hva «kvalifisert» faktisk betyr

Hovedintervallet på 15-95% er reelt, men det gjelder bare for **overflødig eller omstendelig** innhold — gjentatte
feillinjer, en byggelogg som spammer den samme advarselen, en overdimensjonert `grep`-/fillesingsdump. Det betyr
**ikke** at hver forespørsel sparer så mye.

Empirisk verifisert (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): En
`stacked`-kjøring (RTK + Caveman) mot en Anthropic-formet `tool_result`-blokk med 300 identiske
feillinjer ga **95.93% tokenbesparelse / 96.26% tegnbesparelse** — klart innenfor det annonserte
intervallet. Men når den samme prosesseringskjeden kjøres mot normale, ikke-overflødige verktøyutdata (en ren liste over `grep`-treff,
en kort fillesing, vanlig samtaletekst), gir den korrekt nok **nær null besparelse**, fordi
det ikke finnes noe repetitivt å fjerne, og `validateCompression()` (`validation.ts`) nekter å levere en
omskriving som ville fjernet eller endret kodeblokker, URL-er, overskrifter, versjoner eller konstantidentifikatorer med BARE STORE BOKSTAVER.

Dette er forventet og trygg atferd, ikke en feil: En kodeøkt som for det meste leser/søker med grep i ryddige filer, vil
gi beskjedne totale besparelser selv når komprimering er fullt aktivert, mens en økt som støter på en feilsløyfe
eller en pratsom linter, vil oppnå hele intervallet på 78-95% for den trafikken. Ikke bruk én enkelt økts
lave samlede besparelsesprosent som bevis på at komprimeringen er feilkonfigurert — sjekk først om de
underliggende verktøyutdataene faktisk var overflødige.

---

## Visualisering av tokenbesparelser

```
Uten komprimering: 47K tokener sendt til LLM
Med Lite:          40K tokener sendt          (15% spart — trygt, alltid aktivert)
Med Standard:      33K tokener sendt          (30% spart — regler for caveman-språk)
Med Aggressive:    24K tokener sendt          (50% spart — aldring + oppsummering)
Med Ultra:         12K tokener sendt          (75% spart — heuristisk beskjæring)
Med RTK:           19K-5K tokener sendt       (60-90% spart på kommando-/verktøyutdata)
Med Stacked:       10K-2.5K tokener sendt     (78-95% kvalifisert RTK+Caveman-intervall)
```

---

## Konfigurasjon

### Dashbord

Naviger til `Dashbord → Context & Cache`:

- **Caveman** — valg av modus, språkpakker, forhåndsvisning og globale standardinnstillinger
- **RTK** — forhåndsvisning av kommandofilter, RTK sikkerhetsinnstillinger og filterkatalog
- **Compression Combos** — navngitte motor-pipelines tildelt ruting-kombinasjoner
- **Auto-riggerterskel** — aktiverer automatisk komprimering når antall tokens overskrider terskelen

### Per-kombinasjon overstyring

I `Dashbord → Context & Cache → Compression Combos`, tildel en komprimeringskombinasjon til en ruting-kombinasjon:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dette lar deg bruke stablet komprimering på gratis-/kodeleverandører, samtidig som du beholder lettmodus på betalte abonnementer.

Denne "Per-kombinasjon overstyring"-tildelingen er en annen kontroll enn overstyringen av **ruting-kombinasjon komprimeringsmodus** (Default/Off/Lite/Standard/Aggressive/Ultra) — den overstyringen velger ikke en navngitt komprimerings-pipeline; den setter bare `compressionMode`-feltet som `resolveCompressionPlan` konsulterer. Den kan settes enten på kombinasjonskortet (`Dashbord → Combos`) eller, siden #6760, per ruting-kombinasjon i "Tildel til ruting"-listen på `Dashbord → Context & Cache → Compression Combos`, rett ved siden av avkrysningsboksen for pipeline-tildeling dokumentert ovenfor. Begge grensesnittene vedvarer gjennom det samme `PUT /api/combos/{id}` endepunktet.

### Per-forespørsel overstyring

Send `x-omniroute-compression` forespørselshodet for å overstyre komprimeringsplanen for en enkelt forespørsel. Det har høyest presedens — det overstyrer ruting-kombinasjon overstyringen, den aktive profilen, auto-utløseren og panelstandardinnstillingen. Ukjente verdier ignoreres (forespørselen avvises aldri), og den globale hovedbryteren styrer fortsatt alt: når komprimering er globalt deaktivert, kan hodet ikke slå det på. Verdier:

| Verdi         | Effekt                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | Ingen komprimering for denne forespørselen.                                                                    |
| `default`     | Den panel-avledede standardprofilen (ignorerer den aktive profilen). Tapende motorer er deaktivert.            |
| `safe`        | Samme som å utelate hodet: kun deduplisering og sammenslåing av mellomrom.                                     |
| `allow-lossy` | Behold denne forespørselens operatørplan, inkludert sammendrag, relevansfiltre og stilomskrivinger.            |
| `engine:<id>` | En enkelt motor når aktivert, f.eks. `engine:rtk`. Dette er per-forespørsel opt-in for den motoren.            |
| `<combo>`     | En navngitt kombinasjon, matchet først etter navn (ikke-sensitive for store/små bokstaver), deretter etter ID. |

Uten `allow-lossy`, `engine:<id>`, eller en navngitt kombinasjon, blir tapende motorer ikke brukt. Forespørselen får fortsatt sesjonsdeduplisering og sammenslåing av mellomrom når komprimering er aktivert.

Den anvendte planen returneres i `X-OmniRoute-Compression: <mode>; source=<source>` respons-hodet, hvor `<source>` er en av `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, eller `off`.

### API

```bash
# Hent komprimeringsinnstillinger
curl http://localhost:20128/api/settings/compression

# Oppdater komprimeringsinnstillinger
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Forhåndsvis en spesifikk RTK/stablet nyttelast
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List opp RTK filterpakker
curl http://localhost:20128/api/context/rtk/filters

# Test RTK direkte med valgfri kommandometadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Hva som beskyttes

Komprimeringsmotoren **bevarer alltid:**

- ✅ Kodeblokker (inngjerdede og innebygde)
- ✅ URL-er og filbaner
- ✅ JSON-strukturer og strukturerte data
- ✅ Identifikatorer og beskyttede tekniske symboler
- ✅ Matematiske uttrykk
- ✅ Definisjoner av verktøy-/funksjonskall
- ✅ Systeminstruksjoner (i lite-modus)

Gjenoppretting av rådata fra RTK sladder vanlige API-nøkler, bearer-tokener, Slack-tokener, AWS-tilgangsnøkler,
passord, tokener og hemmeligheter før noe lagres.

---

## Komprimeringsstatistikk

Hver komprimerte forespørsel inkluderer statistikk i serverloggene:

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

## Fasert veikart

| Fase    | Moduser                                                                                                                                                | Status    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| Fase 1  | Av, Lett                                                                                                                                               | ✅ Levert |
| Fase 2  | Standard, Aggressiv, Ultra                                                                                                                             | ✅ Levert |
| Fase 3  | RTK, Stablet, Kompresjonskombinasjoner                                                                                                                 | ✅ Levert |
| Fase 4  | Utdataformater, SLM-nivå Ultra, evalueringsverktøy                                                                                                     | ✅ Levert |
| Fase 4C | Adaptivt kontekstbudsjett ("skive") — beregningsmotor + API (`contextBudget` on `PUT /api/settings/compression`) + kontroller for dashbordmodus/policy | ✅ Levert |

---

## Takk

Komprimeringsreglene for standard-modus er inspirert av **[Caveman](https://github.com/JuliusBrussee/caveman)** av **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — det virale prosjektet «why use many token when few token do trick». Caveman rapporterer `~75%` færre utdatatokener, `65%` gjennomsnittlig besparelse av utdatatokener i referansetester, et utdataområde på `22-87%` og et verktøy for inndatakomprimering på `~46%`.

RTK-modus er inspirert av **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** av **[RTK AI](https://github.com/rtk-ai)** — prosjektet for høyytelseskomprimering av kommandoutdata fra terminaler, bygg, tester, git og filtrering av verktøyutdata. RTK rapporterer besparelser på `60-90%`, og eksempeløkten i README-filen viser at `~80%` ble spart.

---

## Avanserte kompresjonssystemer

Utover de 7 standardmodusene inkluderer OmniRoute flere avanserte kompresjonssystemer som fungerer automatisk basert på kontekst.

### Cache-bevisst kompresjon

Noen leverandører (som Anthropic med hurtigbufring av prompter) støtter **hurtigbufring av prompter**, noe som lar dem hurtigbufre deler av prompten for å redusere kostnader og latens. Når hurtigbufring er aktivert, kan aggressiv kompresjon faktisk **skade** ytelsen fordi den endrer de hurtigbufrede tokenene, noe som ugyldiggjør hurtigbufferen.

Modulen `cachingAware.ts` løser dette ved å **oppdage hurtigbufringskontekst** og **justere kompresjonsstrategien** deretter.

#### Hvordan det fungerer

1. **Oppdag hurtigbufringskontekst** – Skanner forespørselsteksten for `cache_control`-markører
2. **Identifiser hurtigbufringsleverandører** – Sjekker om målleverandøren støtter hurtigbufring
3. **Juster strategi** – Nedgraderer `aggressive`/`ultra` til `standard` for hurtigbufringsleverandører
4. **Hopp over systemprompt** – Systemprompter er vanligvis hurtigbufret, så ikke komprimer dem
5. **Bruk deterministiske transformasjoner** – Bruk kun transformasjoner som produserer konsistent utdata

#### Kodeeksempel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Når skal det brukes

Cache-bevisst kompresjon er **alltid på** – ingen konfigurasjon nødvendig. Det trer kun i kraft når:

- Forespørselen har `cache_control`-markører
- Målleverandøren støtter hurtigbufring av prompter (Anthropic, OpenAI, etc.)

### Progressiv aldring

Lange samtaler akkumulerer mange meldingsrunder, men eldre runder blir mindre relevante. Modulen `progressiveAging.ts` **degraderer meldinger etter rundedistanse**:

- **Nylige runder (0-3)**: Beholdes ordrett (full detalj)
- **Middels runder (4-8)**: Lett kompresjon (mellomrom, formateringsopprydding)
- **Gamle runder (9+)**: Huleboerkompresjon (fjerning av fyllord, oppsummering)
- **Veldig gamle runder (20+)**: Sterkt oppsummert eller droppet

#### Kodeeksempel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // First 3 turns: verbatim
  light: 8, // Turns 4-8: lite compression
  moderate: 20, // Turns 9-20: caveman compression
  // Turns 21+: heavy summarization
});

// saved = number of tokens saved
```

#### Når skal det brukes

Progressiv aldring er **alltid på** for `aggressive` og `ultra` moduser. Det er spesielt effektivt for:

- Langvarige kodesesjoner
- Flerdagers samtaler
- Agentbaserte arbeidsflyter med mange verktøykall

### Huleboer utdatamodus (Caveman Output Mode)

Modulen `outputMode.ts` injiserer **systempromptinstruksjoner** for å få modellen selv til å produsere komprimert, kortfattet utdata (en "huleboer"-stil).

#### Hvordan det fungerer

I stedet for å komprimere input, legger denne modusen til en systemprompt som:

> "Svar med minimale ord. Dropp høfligheter. Bruk korte setninger."

Dette fungerer spesielt bra for:

- Kodegenerering (kortere utdata = færre tokens)
- Rask spørsmål og svar (ikke behov for forseggjorte forklaringer)
- Batchbehandling (maksimere gjennomstrømning)

#### Når skal det brukes

Huleboer utdatamodus er **opt-in** – sett den via kombinasjonskonfigurasjonen:

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

### Utdata-stiler (katalog)

Huleboer utdatamodus ovenfor er den **eldre enkeltstil-banen**. Fase 4 generaliserte den til en katalog med sammensettbare utdata-stiler: `OUTPUT_STYLE_CATALOG` i `open-sse/services/compression/outputStyles/catalog.ts`. Hver stil er en systempromptinstruksjon som får modellen selv til å produsere billigere utdata; stiler kan aktiveres sammen og injiseres i katalogrekkefølge.

| Stil                          | `id`          | Hva den gjør                                                                                                                                                                                                                      | Instruksjonsspråk                                               |
| :---------------------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| Knapp prosa                   | `terse-prose` | Dropper fyllord/artikler/forbehold; beholder teknisk substans nøyaktig. Samme tekst som den eldre caveman-utdatamodusen (referert, ikke omskrevet).                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Mindre kode                   | `less-code`   | YAGNI-stige: minste fungerende endring, ingen uønskede abstraksjoner.                                                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Ponytail (lat seniorutvikler) | `ponytail`    | "Den beste koden er koden som aldri ble skrevet": gjenbruk > omskriving, rotårsak > symptom, korteste fungerende diff.                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Jeg har ADHD (handling-først) | `i-have-adhd` | Handling først (kommando/sti/kodebit før prosa), nummererte avgrensede trinn, ETT konkret neste trinn, ingen innledning/oppsummering/avslutning. Tilpasset fra [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                   |
| Knapp CJK (文言)              | `terse-cjk`   | Klassisk kinesisk ultra-knapp stil.                                                                                                                                                                                               | zh (lokale-begrenset: tilbys kun når det løste språket er `zh`) |

Hver stil leveres med tre intensitetsnivåer — `lite`, `full`, `ultra` — og hvert nivå
avsluttes med den delte grenseklausulen, som beholder kodeblokker, filstier, kommandoer,
feilstrenger, URL-er og identifikatorer ordrett.

#### Hvordan injeksjon fungerer

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) løser
utvalget mot katalogen (ukjente ID-er og språk-uoverensstemmende stiler droppes, aldri en feil),
sammenføyer de valgte instruksjonene i katalogrekkefølge,
legger til grenseklausulen **én gang**, og forhåndslaster resultatet inn i systemprompten
bak en enkelt idempotensmarkør (`[OmniRoute Output Styles]`) — gjenanvendelse
er en no-op. Når det oppdagede forespørselsspråket har en oversettelse, injiseres den
lokaliserte instruksjonen i stedet for engelsk.

#### Hvordan aktivere

I dashbordet: **Context → Settings → Compression** — én rad per stil med en
på/av-bryter og en nivåvelger. Programmatisk vedvarer komprimeringskonfigurasjonen
utvalget som:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Bakoverkompatibilitet: den eldre `outputMode: "caveman"` kombinasjonsinnstillingen fungerer fortsatt og
mapper til `terse-prose`, byte-identisk med den gamle injeksjonen i alle eldre språk.

Språkvalg: med `languageConfig.enabled` på, velger `autoDetect`
språket i den siste brukermeldingen (samme detektor som input-motorene);
å slå `autoDetect` av låser `defaultLanguage`. Av → Engelsk.

Stil × språk-matrisen er festet av
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: en ny stil kan ikke sendes
uten minst en pt-BR-oversettelse (eller et eksplisitt sporet unntak), og en
eksisterende stil kan ikke stille miste et språk. For å legge til en stil, se
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Verktøyresultatkomprimering

`toolResultCompressor.ts`-modulen tilbyr **5 spesialiserte komprimeringsstrategier**
for verktøyresultater (funksjonskall, agentutdata, søkeresultater, etc.):

1.  **Søkeresultatkomprimering** — Fjerner redundante resultater, beholder topp-N
2.  **Filinnlesingskomprimering** — Avkorter store filer, bevarer headere/importer
3.  **Kodeutførelseskomprimering** — Beholder kun essensiell stdout/stderr
4.  **Databaseforespørselkomprimering** — Begrenser rader, fjerner verbose metadata
5.  **API-svarkomprimering** — Fjerner null-felt, kondenserer arrayer

#### Når skal det brukes

Verktøyresultatkomprimering er **alltid på** når verktøykall er til stede. Ingen
konfigurasjon nødvendig.

### Stablet pipeline

Den stablede modusen kjører **flere motorer i sekvens** — vanligvis RTK først
(60-90 % besparelser på verktøyutdata), deretter Caveman (30 % ytterligere besparelser på den
gjenværende teksten). Dette oppnår **78-95 % totale besparelser**.

#### Hvordan det fungerer

```
Input (1000 tokens)
  → RTK (kommando-bevisst filter) → 200 tokens
    → Caveman (fjerning av fyllord) → 140 tokens
  → Output (140 tokens, 86 % besparelse)
```

#### Når skal det brukes

Bruk stablet modus for:

- Verktøytunge arbeidsflyter (agentisk koding, forskning)
- Kostnadssensitiv batchbehandling
- Når du trenger maksimale token-besparelser

Konfigurer via kombinasjon:

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

## Overstyringer for komprimeringskombinasjoner

Du kan overstyre den globale komprimeringsmodusen **per kombinasjon** for å finjustere virkemåten
for ulike brukstilfeller:

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

Dette er nyttig for:

- **Kodekombinasjoner**: Bruk modusen `aggressive` for lange økter
- **Kombinasjoner for raske spørsmål og svar**: Bruk modusen `lite` for raske svar
- **Verktøytunge kombinasjoner**: Bruk modusen `stacked` for maksimal besparelse
- **Produksjonskombinasjoner**: Bruk modusen `cache-aware` for leverandører som støtter hurtigbufring

---

## Se også

- [Miljøkonfigurasjon](../reference/ENVIRONMENT.md) — Miljøvariabler for komprimering
- [Arkitekturveiledning](../architecture/ARCHITECTURE.md) — Intern virkemåte for komprimeringsprosessen
- [Brukerveiledning](../guides/USER_GUIDE.md) — Kom i gang med komprimering
- [RTK-komprimering](./RTK_COMPRESSION.md) — RTK-filtre, tillitsmodell, verifiseringsport, gjenoppretting av råutdata
- [Komprimeringsmotorer](./COMPRESSION_ENGINES.md) — Caveman, RTK, stabling, API-er, MCP, kontrollpanel
- [Format for komprimeringsregler](./COMPRESSION_RULES_FORMAT.md) — JSON-format for regelpakker
- [Språkpakker for komprimering](./COMPRESSION_LANGUAGE_PACKS.md) — Språkspesifikke Caveman-regler
