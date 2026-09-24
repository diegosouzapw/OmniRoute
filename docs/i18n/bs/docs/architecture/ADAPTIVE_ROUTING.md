# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

# Prilagodljivo usmjeravanje: Događaji usmjeravanja, povratne informacije o kvaliteti i objašnjivost

Ovaj dokument opisuje temelj prilagodljivog usmjeravanja vođenog povratnim informacijama koji je dodan u OmniRoute. Namjerno je malen: uvodi tipizirani kanal ishoda usmjeravanja, signal kvalitete na mreži (online) koji napaja postojeći auto-combo scorer, opcionalni OpenTelemetry izvoznik i krajnju točku za objašnjivost. On **ne** zamjenjuje postojeći skup otpornosti (circuit breaker, connection cooldown, model lockout, health matrix, autopilot) — on ga nadopunjuje.

## 1. Arhitektonski kontekst

OmniRoute je podatkovna ravnina (data plane) s **vrućom putanjom zahtjeva** (request hot path) i **kontrolnom/obavještajnom ravninom** (control/intelligence plane). Vruća putanja mora ostati brza, memorijski učinkovita, asinkrona, otporna i predvidljiva. Evaluacija, bodovanje kvalitete, eksperimenti i povijesna analiza pripadaju kontrolnoj ravnini.

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   podatkovna ravnina (brza, sinkrona, u memoriji)
│  usmjeravanje / failover │
│  zdravlje / guardrail │
│  predmemorija / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  Spremnici povratnih informacija │   kontrolna ravnina (asinkrona, best-effort)
│  praćenje kvalitete    │
│  OTel izvoznik      │
│  spremište objašnjenja      │
└──────────┬──────────┘
           ▼  rezultat kvalitete
      auto-combo scorer
```

### Što je već postojalo (revidirano, nije duplicirano)

| Koncept                                      | Postojeća implementacija                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Dostupnost (možemo li slati promet?)         | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB-persisted), connection cooldown, model lockout |
| Izvještavanje o zdravlju                     | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                            |
| Shadow promet                                | `open-sse/services/combo/shadowRouting.ts`                                                         |
| Guardrails                                   | `src/lib/guardrails/` (pre/post hooks)                                                             |
| Točna predmemorija                           | `src/lib/semanticCache.ts` (signature-based)                                                       |
| Evaluatori / usmjeravanje vođeno evaluacijom | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                               |
| Objašnjivost combo odluka                    | `open-sse/services/combo/decisionTrace.ts`                                                         |
| Događaji nadzorne ploče u stvarnom vremenu   | `src/lib/events/eventBus.ts` (UI notification channel, `unknown` payloads, 100-entry history)      |

Sloj događaja usmjeravanja (routing-event layer) **nije** ponovna implementacija `eventBus`-a: taj bus je kanal obavijesti nadzorne ploče u stvarnom vremenu (tipizirana _imena događaja_, neprozirni korisni tereti, UI potrošači). `RoutingEvent` je tipizirana struktura _ishoda_ (latencija/tokeni/trošak/ishod/razlog završetka) koju konzumiraju spremnici povratnih informacija kontrolne ravnine (praćenje kvalitete, OTel izvoznik, spremište objašnjenja).

### Što je nedostajalo (ovdje dodano)

1. **Apstrakcija tipiziranog događaja ishoda usmjeravanja + spremnika** (`RoutingEvent` / `RoutingEventSink`). `decisionTrace` je ograničen na combo i samo u memoriji; `comboMetrics` su kumulativni brojači; `call_logs` je sirova asinkrona perzistencija. Nijedan nije tipizirani kanal ishoda temeljen na spremniku na koji se može pretplatiti praćenje kvalitete, OTel izvoznik ili evaluator u stilu Future-AGI.
2. **Signal kvalitete na mreži** (EWMA) za kvalitetu izlaza — scorer je prethodno posredovao "kvalitetu" samo kroz statičku prikladnost zadatka i stope prolaznosti evaluacije na temelju odabira (opt-in).
3. **Opcionalni OTel izvoznik bez ovisnosti** koji koristi GenAI semantičke konvencije.
4. **Krajnja točka za objašnjivost** koja vraća stvarne odluke o usmjeravanju + stanje kvalitete.

## 2. Događaji rutiranja (osnova povratnih informacija)

Datoteke: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` nosi samo metapodatke o rutiranju:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // allowlisted union
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` je trait u stilu `Send+Sync` u TypeScript-u:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // must be O(1), no sync I/O
}
```

Hot path poziva `emitRoutingEvent(event)` jednom po završenom zahtjevu
(povratni poziv za završetak strimovanja, putanja uspjeha bez strimovanja i
putanja neuspjeha sa malformisanim 200 odgovorom u `handleChatCore`). Dispečiranje je
sinhrono grananje (fan-out) ka registrovanim sinkovima, ali svaki sink samo stavlja u red/ažurira
stanje u memoriji. **Nema sinhronih upisa u bazu podataka, nema mrežnog I/O na hot path-u.**

Podrazumijevani sinkovi:

- `MemoryRoutingEventStore` — ograničeni (500) kružni bafer, najnoviji-prvi, za
  explain endpoint.
- `QualityTracker` potrošač — ažurira EWMA procjenu kvaliteta.
- `OtlpHttpsEventSink` — opcionalno, omogućeno samo kada je postavljeno
  `OMNIROUTE_OTEL_ENDPOINT` (ili `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Izmjereni režijski troškovi (iskreno poređenje)

`npm run bench:routing-events` na ovoj radnoj stanici (100k iteracija; operacije
ispod µs mjerene kao agregatni µs/op jer su percentili po operaciji ispod
rezolucije tajmera `performance.now()`):

| Scenario                          | µs/op  | ops/s  |
| --------------------------------- | ------ | ------ |
| baseline (scoring only)           | ~0.045 | ~22 M  |
| baseline + RoutingEvent (2 sinks) | ~0.168 | ~5.9 M |
| baseline + event + OTel enqueue   | ~0.163 | ~6.1 M |
| concurrent (8 interleaved bursts) | ~0.18  | —      |

Delta dispečiranja događaja u odnosu na osnovno bodovanje je ~0.12 µs/zahtjevu;
OTel sink samo stavlja u red (O(1) push u bafer), ne dodajući ništa mjerljivo.
Ovi brojevi su specifični za mašinu i relativni — nisu garancija za produkciju.
Vrijednost v1 "~0.2 µs" bila je agregatna procjena; ova metodologija odvaja
osnovu bodovanja od troška dispečiranja događaja.

## 3. Signal kvaliteta (stanje provajdera vođeno povratnim informacijama)

Datoteke: `open-sse/services/routing/quality.ts`

v2 razdvaja **operativni** od **semantičkog** kvaliteta:

- **Operativni** — izveden iz hot path-a rutiranja (HTTP 4xx/5xx, prekidi veze,
  429, malformisani odgovori, prekidi strimovanja, `finish_reason=length`,
  uspjesi sa nultim izlazom, EWMA latencije/TTFT). 200 se NE tretira kao
  semantički kvalitet.
- **Semantički** — stvarna vrijednost generisanog izlaza. SAMO ga proizvodi
  evaluator putem `setSemanticQuality()`. On je `null` dok ga neko ne obezbijedi
  i nikada ne curi u operativni rezultat.

Stanje po (provajderu, modelu) (EWMA + ograničeni brojači):

- `successEwma` — EWMA (α=0.2) uspjeha ishoda.
- `latencyEwma` / `ttftEwma` — EWMA latencije (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — koliko nedavno je model posljednji put primijećen.

### Povjerenje / svjesnost o uzorcima

`confidence = clamp01(samples / 50)`, a rezultat koji se vraća bodovatelju se
miješa prema neutralnoj sredini:

```
score = 0.5 + confidence * (operational - 0.5)
```

Posljedice (potvrđene testovima):

- Hladan provajder (0 uzoraka) dobija ocjenu **0.5** — nije nepravedno kažnjen,
  ali nije u stanju da dominira nad provajderom sa hiljadama čvrstih zapažanja.
- Provajder sa 7 sretnih uspjeha se povlači ka 0.5 (nikada ne dominira iz
  optimistične inicijalizacije).
- Provajder sa 50+ uzoraka konvergira ka svom pravom operativnom rezultatu.
- Degradacija i oporavak su postepeni (EWMA), i jedan izolovani neuspjeh ne
  uništava zdravog provajdera.

`ProviderQuality` izlaže `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Ovo hrani auto-combo bodovatelja kao faktor bodovanja kvaliteta:

- `ScoringFactors.quality` / `ScoringWeights.quality` u
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Suma ostaje 1.0.
- `buildAutoCandidates` popunjava `candidate.quality` iz trackera; kandidati bez
  podataka podrazumijevano dobijaju neutralnih **0.5** (hladan kandidat nije ni
  pojačan ni kažnjen).

Zatvorena petlja:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo quality factor
      ↑                                                    │
      └────── request outcome (handleChatCore) ←────────────┘
```

### Tvrda isključenost naspram meke kazne

Signal kvaliteta je samo **meka adaptivna preferencija**. Tvrda isključenost
ostaje pri postojećem stack-u otpornosti: circuit breaker OTVOREN, kvota
iscrpljena, greška autentifikacije, zaključavanje modela — ništa od ovoga nije
pogođeno rezultatom kvaliteta. Provajder čiji rezultat kvaliteta privremeno
padne biva manje preferiran, nikada tvrdo onemogućen.

## 3b. Kanonicko mjerenje vremena strima (TTFT / ITL)

Datoteke: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` je jedinstveni spoj za instrumentaciju za putanju strimovanja, povezan u `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — prvi primljeni uzvodni dio.
- `markForward()` — prvi dio proslijeđen klijentu (koristi se za TTFT).
- `markInterrupted()` — timeout/prekid/greška strima prije čistog završetka.
- `ttft()` = latencija prvog proslijeđenog SSE dijela. **Ovo NIJE TTFT na nivou tokena** — jedan SSE dio može nositi nula/jedan/više tokena. Precizno dokumentovano.
- `avgItlMs()` = srednji razmak između dijelova (proxy latencije dijela za ITL).

TTFT/ITL/prekidi teku u `RoutingEvent` (`ttftMs`, `itlMs`) i izvoze se kao GenAI/OmniRoute atributi span-a od strane OTel sink-a.

## 4. OpenTelemetry / GenAI opservabilnost

Datoteke: `open-sse/services/routing/otel.ts`

- OTLP/HTTP JSON izvoznik bez zavisnosti (koristi globalni `fetch`, bez `@opentelemetry/*` SDK).
- Spanovi prate GenAI semantičke konvencije (`gen_ai.provider.name`, `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`, `gen_ai.completion.finish_reason`, `gen_ai.system`) plus OmniRoute atributi rutiranja (outcome, status, ttft, retries, fallback).
- `record()` samo stavlja u red u ograničeni bafer (O(1)); pozadinski tajmer vrši flush putem `POST {endpoint}/v1/traces` asinhrono. Pod preopterećenjem, najstariji događaji se odbacuju (`dropped` brojač) — nikada ne vršite povratni pritisak (backpressure) na ravan podataka (data plane).
- **Onemogućeno osim ako nije konfigurisano.** `OMNIROUTE_OTEL_ENDPOINT` (ili `OTEL_EXPORTER_OTLP_ENDPOINT`) mora biti postavljen; u suprotnom, sink nije registrovan i nula OTel koda se izvršava.

## 5. Objašnjivost

- `GET /v1/explain/routing` vraća nedavne `RoutingEvent`-e (stvarne odluke, najnovije prvo) i snimak kvaliteta po provajderu/modelu.
- Autentifikacija preslikava `/v1/combos` (Bearer API ključ ili sesija kontrolne table; anonimno na lokalnim implementacijama za jednog korisnika sa `REQUIRE_API_KEY=false`).
- Tragovi po pozivu na nivou kombinacije ostaju dostupni putem postojećeg `decisionTrace.ts` (zaglavlje `X-OmniRoute-Combo-Trace`).
- Sigurnost: događaji nose samo metapodatke rutiranja, nikada promptove/tijela/akreditive.

## 6. Integracija ravni evaluacije (Spremnost za budući AGI)

OmniRoute tretira Future AGI (ili bilo koji evaluator) kao **potencijalni backend za inteligenciju/evaluaciju, a ne kao zavisnost**. Spojevi:

- `RoutingEventSink` može proslijediti događaje evaluatoru asinhrono.
- `MemoryRoutingEventStore` + snimak kvaliteta daju evaluatoru sirovi tok odluka.
- Budući `Evaluator` (deterministički, lokalni sudija, HTTP, WASM) bi konzumirao događaje/tragove i vraćao `QualityScore` koji hrani istu `getQualityScore`/quality-factor putanju.
- Postojeće rutiranje vođeno evaluacijom (`open-sse/services/evalRouting.ts`) već preuređuje ciljeve kombinacija prema stopama prolaznosti `eval_runs` kada je omogućeno.

Nijedna evaluacija se ne izvršava sinhrono na putanji zahtjeva, a gateway radi u potpunosti i kada evaluator nije prisutan.

## 7. Konačni arhitektonski pregled

1. **Šta ostaje na sinhronoj "vrućoj" putanji (hot path)?** Rutiranje/bodovanje, provjere zaštitnih ograda (guardrail), pretraga keša i jedan `emitRoutingEvent` fan-out (~0.12 µs iznad osnovnog bodovanja) ka in-memory sinkovima.
2. **Šta je prebačeno na asinhronu obradu?** OTel export (tajmer + fetch), `call_logs`/trajnost upotrebe (usage persistence), upisi u semantički keš, kvalitet je u memoriji i O(1) (nije potreban async).
3. **Kako ishod rutiranja postaje povratna informacija?** `handleChatCore` emituje `RoutingEvent` → `QualityTracker` ažurira EWMA stanje → `getQualityScore` hrani `quality` faktor auto-kombinacije.
4. **Kako kvalitet utiče na buduće rutiranje?** Niska ocjena kvaliteta smanjuje ponderisani rezultat tog provajdera/modela u `scoreAutoTargets`, tako da se degradirani modeli postepeno manje preferiraju i oporavljaju kako se njihov EWMA poboljšava.
5. **Kako se Future AGI može integrisati bez postajanja zavisnošću?** Putem `RoutingEventSink` interfejsa / budućeg `Evaluator` adaptera — bez hardkodirane zavisnosti.
6. **Šta se dešava kada evaluator nije dostupan?** Rutiranje ostaje nepromijenjeno; kvalitet se vraća na neutralan (1.0) za modele bez uočenog signala.
7. **Šta se dešava kada telemetrija nije dostupna?** OTel sink jednostavno nije registrovan; ostatak sloja za rutiranje radi nepromijenjeno.
8. **Šta se dešava pod preopterećenjem?** OTel bafer odbacuje najstarije događaje; kvalitet i kružni bafer (ring buffer) su ograničeni konstrukcijom; nema povratnog pritiska (backpressure).
9. **Kako se stanje provajdera oporavlja nakon degradacije?** EWMA se ponovo konvergira kako se uspjesi akumuliraju; zagrijavanje (warmup) održava hladne modele neutralnim; prekidač strujnog kola (circuit breaker) se nezavisno oporavlja putem HALF_OPEN proba.
10. **Koje predložene funkcije namjerno NISU implementirane i zašto?**
    - Shadow traffic / eksperimenti — već implementirano (`combo/shadowRouting.ts`); nije ponovo građeno.
    - Guardrails — već implementirano (`src/lib/guardrails/`); nije duplicirano.
    - Semantički keš — već implementirano (`src/lib/semanticCache.ts`); nije duplicirano.
    - Potpuna platforma za upravljanje eksperimentima, alati za skupove podataka, platforma za optimizaciju promptova, vektorska baza podataka ili obavezna eksterna OTel infrastruktura — izvan opsega za lean ravan podataka (data plane).
    - Rust `RoutingEvent` struktura — ravan podataka je TypeScript; TS tip je adaptirani ekvivalent.

## 8. Referenca konfiguracije

| Varijabla                     | Zadano      | Efekat                                                                                    |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | unset       | Kada je postavljeno, omogućava OTLP/HTTP izvoznik tragova (npr. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | unset       | Rezervni alias za OTLP krajnju tačku (endpoint).                                          |
| `OTEL_SERVICE_NAME`           | `omniroute` | Atribut resursa `service.name`.                                                           |

## 9. Testovi

- `tests/unit/routing-events.test.ts` — normalizacija događaja, klasifikacija statusa, ograničeni kružni bafer (bounded ring buffer), sink fan-out + izolacija.
- `tests/unit/routing-quality.test.ts` — EWMA zagrijavanje, oporavak od neuspjeha/uspjeha, kazne za anomalije, rukovanje prolaznim 429 greškama, snimak (snapshot), resetovanje.
- `tests/unit/routing-scoring-quality.test.ts` — integritet težine, neutralna zadana vrijednost, rangiranje faktora kvaliteta.
- `tests/unit/routing-otel.test.ts` — omogućavanje gating-a, GenAI span payload, asinhrono pražnjenje (flush), odbacivanje pri preopterećenju (drop-under-overload).
- `tests/unit/routing-events-concurrency.test.ts` — hiljade događaja, ograničenost kružnog bafera, izolacija throwing-sink-a, isprepleteni asinhroni rafali, resetovanje tokom umetanja.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministička end-to-end petlja putem stvarnog `scoreAutoTargets` skorera: zdrav → degradacija → oporavak → blip, plus scenariji hladnog starta (cold-start) i lucky-cold-provider.
- `tests/unit/stream-timing.test.ts` — TTFT (prvi proslijeđeni chunk), ITL, prvi bajt naspram prvog prosljeđivanja, prekid, sigurnost od malformiranih/praznih chunkova.

## 10. Status postojećih problema (Faza 18)

| Problem                                               | Status                      | Napomene                                                                                                                                                                                                                                                                |
| ----------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` neusklađenost izvoza                      | **RIJEŠENO (okruženje)**    | `node_modules` nije bio sinhronizovan sa `package-lock.json` (instalirana verzija 1.3.1 naspram zaključane 1.4.0). Pokretanje `npm install omniglyph@1.4.0` je vratilo zaključanu verziju; greške tipova su pale na 0. Manifesti nepromijenjeni.                        |
| Zastarjeli `getKnownContextOverflow` testovi          | **POZNATO — nije riješeno** | `combo-context-overflow-compression-probe.test.ts` uvozi funkciju koja više ne postoji u `open-sse/services/combo.ts` (samo je komentari referenciraju). Popravka zahtijeva ponovnu implementaciju ili ponovno pisanje tih testova — nepovezane arhitektonske promjene. |
| `combo-runtime-unit-concurrency.test.ts` DB izolacija | **POZNATO — nije riješeno** | Tvrdnja (assertion) o SQLite izolaciji testnog okvira ne uspijeva kada se pokrene direktno; ne uspijeva identično na osnovnoj grani.                                                                                                                                    |
| i18n `llm.txt` odstupanje                             | **POZNATO — nije riješeno** | `docs/i18n/*/llm.txt` se razlikuju od korijenskog; postojeće, blokira docs-sync pre-commit gate.                                                                                                                                                                        |

Problemi okruženja i problemi koda se drže odvojeno; nikakvi nepovezani kvarovi nisu skriveni iza promijenjenih filtera testova.
