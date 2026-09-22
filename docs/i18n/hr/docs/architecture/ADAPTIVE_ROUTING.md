# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Ovaj dokument opisuje temelj prilagodljivog usmjeravanja vođenog povratnim informacijama dodan u
OmniRoute. Namjerno je malog opsega: uvodi tipizirani kanal ishoda usmjeravanja,
mrežni signal kvalitete koji se prosljeđuje postojećem sustavu bodovanja automatskih
kombinacija, opcionalni OpenTelemetry izvoznik i krajnju točku za objašnjivost. **Ne**
zamjenjuje postojeći sloj otpornosti (prekidač strujnog kruga, razdoblje mirovanja veze,
zaključavanje modela, matrica stanja, autopilot) — već ga nadopunjuje.

## 1. Arhitektonski kontekst

OmniRoute je podatkovna ravnina s **kritičnom putanjom zahtjeva** i **upravljačkom/inteligentnom
ravninom**. Kritična putanja mora ostati brza, memorijski učinkovita, asinkrona, otporna i
predvidljiva. Evaluacija, bodovanje kvalitete, eksperimenti i povijesna analiza pripadaju
upravljačkoj ravnini.

```
AI agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   podatkovna ravnina (brza, sinkrona, u memoriji)
│ usmjeravanje / oporavak │
│ stanje / zaštitne mjere │
│ predmemorija / strujanje │
└──────────┬──────────┘
           │ RoutingEvent (pokreni i zaboravi, ~0.2µs)
           ▼
┌─────────────────────┐
│ Odredišta povratnih │   upravljačka ravnina (asinkrona, po principu najboljeg pokušaja)
│ informacija         │
│ praćenje kvalitete  │
│ OTel izvoznik       │
│ spremište objašnjenja │
└──────────┬──────────┘
           ▼  ocjena kvalitete
  sustav bodovanja automatskih kombinacija
```

### Što je već postojalo (pregledano, bez dupliciranja)

| Koncept                                       | Postojeća implementacija                                                                                                            |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Dostupnost (možemo li slati promet?)          | Prekidač strujnog kruga (CLOSED/DEGRADED/OPEN/HALF_OPEN, pohranjen u bazi podataka), razdoblje mirovanja veze, zaključavanje modela |
| Izvješćivanje o stanju                        | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                             |
| Promet u sjeni                                | `open-sse/services/combo/shadowRouting.ts`                                                                                          |
| Zaštitne mjere                                | `src/lib/guardrails/` (kuke prije/poslije)                                                                                          |
| Točna predmemorija                            | `src/lib/semanticCache.ts` (temeljena na potpisu)                                                                                   |
| Evaluatori / usmjeravanje vođeno evaluacijama | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                                |
| Objašnjivost odluke o kombinaciji             | `open-sse/services/combo/decisionTrace.ts`                                                                                          |
| Događaji nadzorne ploče u stvarnom vremenu    | `src/lib/events/eventBus.ts` (kanal obavijesti korisničkog sučelja, korisni sadržaji tipa `unknown`, povijest od 100 zapisa)        |

Sloj događaja usmjeravanja **nije** ponovna implementacija sustava `eventBus`: taj je sustav
kanal nadzorne ploče za obavijesti u stvarnom vremenu (tipizirani _nazivi događaja_, neprozirni
korisni sadržaji, korisnici iz korisničkog sučelja). `RoutingEvent` je tipizirana _struktura ishoda_
(latencija/tokeni/trošak/ishod/razlog završetka) koju koriste odredišta povratnih informacija
upravljačke ravnine (praćenje kvalitete, OTel izvoznik, spremište objašnjenja).

### Što je nedostajalo (dodano ovdje)

1. **Tipizirani događaj ishoda usmjeravanja + apstrakcija odredišta** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` ograničen je na kombinacije i samo na memoriju;
   `comboMetrics` su kumulativna brojila; `call_logs` je sirova asinkrona trajna pohrana.
   Ništa od toga nije tipizirani kanal ishoda temeljen na odredištima na koji se mogu pretplatiti
   sustav za praćenje kvalitete, OTel izvoznik ili evaluator u stilu Future-AGI-ja.
2. **Mrežni signal kvalitete** (EWMA) za kvalitetu izlaza — sustav bodovanja prethodno je
   aproksimirao „kvalitetu” samo putem statičke prikladnosti za zadatak i stopa prolaznosti
   evaluacija uključenih po želji.
3. **Opcionalni OTel izvoznik bez ovisnosti** koji koristi semantičke konvencije GenAI-ja.
4. **Krajnja točka za objašnjivost** koja vraća stvarne odluke o usmjeravanju i stanje kvalitete.

## 2. Događaji usmjeravanja (temelj povratne sprege)

Datoteke: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` sadrži samo metapodatke usmjeravanja:

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
  outcome: RoutingOutcome; // unija dopuštenih vrijednosti
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` je sučelje u TypeScriptu nalik traitu `Send+Sync`:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // mora biti O(1), bez sinkronog I/O-a
}
```

Kritični put poziva `emitRoutingEvent(event)` jednom po dovršenom zahtjevu
(povratni poziv pri završetku strujanja, put uspjeha bez strujanja i put
neuspjeha za neispravan odgovor 200 u `handleChatCore`). Distribucija je sinkrono
prosljeđivanje svim registriranim odredištima, ali svako odredište samo dodaje
podatke u red ili ažurira stanje u memoriji. **Nema sinkronih upisa u bazu podataka
ni mrežnog I/O-a na kritičnom putu.**

Zadana odredišta:

- `MemoryRoutingEventStore` — ograničeni (500) kružni međuspremnik, od najnovijeg
  prema najstarijem, za krajnju točku za objašnjenja.
- Potrošač `QualityTracker` — ažurira EWMA procjenu kvalitete.
- `OtlpHttpsEventSink` — neobavezno, omogućeno samo kada je postavljen
  `OMNIROUTE_OTEL_ENDPOINT` (ili `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Izmjereno dodatno opterećenje (realna usporedba)

`npm run bench:routing-events` na ovoj radnoj stanici (100k iteracija; operacije
ispod µs mjere se kao zbirni µs/op jer su percentili po operaciji ispod
razlučivosti mjerača vremena `performance.now()`):

| Scenarij                                            | µs/op  | ops/s  |
| --------------------------------------------------- | ------ | ------ |
| osnovna vrijednost (samo bodovanje)                 | ~0.045 | ~22 M  |
| osnovna vrijednost + RoutingEvent (2 odredišta)     | ~0.168 | ~5.9 M |
| osnovna vrijednost + događaj + OTel dodavanje u red | ~0.163 | ~6.1 M |
| istodobno (8 isprepletenih nizova)                  | ~0.18  | —      |

Razlika u odnosu na osnovno bodovanje zbog distribucije događaja iznosi
~0.12 µs/zahtjev; OTel odredište samo dodaje u red (O(1) dodavanje u međuspremnik),
bez mjerljivog dodatnog troška. Ove su brojke specifične za računalo i relativne
— nisu jamstvo za produkcijsko okruženje. Vrijednost "~0.2 µs" iz v1 bila je zbirna
procjena; ova metodologija odvaja osnovno bodovanje od troška distribucije
događaja.

## 3. Signal kvalitete (stanje pružatelja vođeno povratnim informacijama)

Datoteke: `open-sse/services/routing/quality.ts`

v2 odvaja **operativnu** od **semantičke** kvalitete:

- **Operativna** — izvedena iz kritičnog puta usmjeravanja (HTTP 4xx/5xx, neuspjesi
  povezivanja, odgovori 429, neispravni odgovori, prekidi strujanja, `finish_reason=length`,
  uspjesi bez izlaznih podataka, EWMA latencije/TTFT-a). Odgovor 200 NE smatra se
  semantičkom kvalitetom.
- **Semantička** — stvarna vrijednost generiranog izlaza. UVIJEK je proizvodi
  isključivo evaluator putem `setSemanticQuality()`. Vrijednost je `null` dok je
  netko ne pruži i nikada ne utječe na operativni rezultat.

Stanje po paru (pružatelj, model) (EWMA + ograničeni brojači):

- `successEwma` — EWMA (α=0.2) uspješnosti ishoda.
- `latencyEwma` / `ttftEwma` — EWMA latencije (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — koliko je nedavno model posljednji put zabilježen.

### Uzimanje pouzdanosti / broja uzoraka u obzir

`confidence = clamp01(samples / 50)`, a rezultat koji se vraća mehanizmu za
bodovanje približava se neutralnoj srednjoj vrijednosti:

```
score = 0.5 + confidence * (operational - 0.5)
```

Posljedice (potvrđene testovima):

- Hladni pružatelj (0 uzoraka) dobiva rezultat **0.5** — nije nepravedno kažnjen,
  ali ne može nadmašiti pružatelja s tisućama pouzdanih opažanja.
- Pružatelj sa 7 slučajnih uspjeha povlači se prema 0.5 (nikada ne dominira zbog
  optimistične inicijalizacije).
- Pružatelj s 50+ uzoraka konvergira svojem stvarnom operativnom rezultatu.
- Pogoršanje i oporavak postupni su (EWMA), a jedan izolirani neuspjeh ne
  uništava zdravog pružatelja.

`ProviderQuality` izlaže `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

To se prosljeđuje mehanizmu za bodovanje automatskih kombinacija kao faktor
bodovanja `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` u
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Zbroj ostaje 1.0.
- `buildAutoCandidates` popunjava `candidate.quality` iz alata za praćenje;
  kandidati bez podataka zadano dobivaju neutralnih **0.5** (hladni kandidat nije
  ni favoriziran ni kažnjen).

Zatvorena petlja:

```
RoutingEvent → QualityTracker → getQualityScore → faktor kvalitete automatske kombinacije
      ↑                                                    │
      └────── ishod zahtjeva (handleChatCore) ←────────────┘
```

### Čvrsto isključivanje nasuprot blagom kažnjavanju

Signal kvalitete služi samo kao **blaga prilagodljiva preferencija**. Čvrsto
isključivanje ostaje u postojećem sloju otpornosti: prekidač strujnog kruga OPEN,
iscrpljena kvota, neuspjeh autentifikacije, blokada modela — rezultat kvalitete
ne utječe ni na što od navedenog. Pružatelj čiji rezultat kvalitete privremeno
padne dobiva niži prioritet, ali nikada nije potpuno onemogućen.

## 3b. Kanonsko mjerenje vremena toka (TTFT / ITL)

Datoteke: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` je jedinstvena točka instrumentacije za putanju strujanja,
povezana s `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — primljen je prvi uzvodni fragment.
- `markForward()` — prvi fragment proslijeđen je klijentu (koristi se za TTFT).
- `markInterrupted()` — istek vremena, prekid ili pogreška toka prije urednog završetka.
- `ttft()` = latencija prvog proslijeđenog SSE fragmenta. **Ovo NIJE TTFT na razini tokena** —
  jedan SSE fragment može sadržavati nula, jedan ili više tokena. Precizno dokumentirano.
- `avgItlMs()` = prosječni razmak između fragmenata (zamjenska mjera latencije fragmenata za ITL).

TTFT/ITL/status prekida ulaze u `RoutingEvent` (`ttftMs`, `itlMs`) i
izvoze se kao atributi GenAI/OmniRoute raspona putem OTel odredišta.

## 4. OpenTelemetry / GenAI opservabilnost

Datoteke: `open-sse/services/routing/otel.ts`

- OTLP/HTTP JSON izvoznik bez ovisnosti (koristi globalni `fetch`, bez
  `@opentelemetry/*` SDK-a).
- Rasponi slijede GenAI semantičke konvencije (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) uz OmniRoute atribute
  usmjeravanja (ishod, status, ttft, ponovni pokušaji, pričuvna opcija).
- `record()` samo dodaje u ograničeni međuspremnik (O(1)); pozadinski vremenski
  okidač asinkrono šalje sadržaj putem `POST {endpoint}/v1/traces`. Pri preopterećenju
  odbacuju se najstariji događaji (brojač `dropped`) — nikad se ne stvara povratni
  pritisak na podatkovnu ravninu.
- **Onemogućeno ako nije konfigurirano.** `OMNIROUTE_OTEL_ENDPOINT` (ili
  `OTEL_EXPORTER_OTLP_ENDPOINT`) mora biti postavljen; u suprotnom se odredište
  ne registrira i ne izvršava se nikakav OTel kôd.

## 5. Objašnjivost

- `GET /v1/explain/routing` vraća nedavne `RoutingEvent` događaje (stvarne
  odluke, prvo najnovije) i snimku kvalitete po pružatelju/modelu.
- Autentifikacija je istovjetna kao za `/v1/combos` (Bearer API ključ ili sesija
  nadzorne ploče; anoniman pristup na lokalnim implementacijama za jednog korisnika
  uz `REQUIRE_API_KEY=false`).
- Tragovi na razini kombinacije za svaki pojedinačni poziv i dalje su dostupni putem postojećeg
  `decisionTrace.ts` (zaglavlje `X-OmniRoute-Combo-Trace`).
- Sigurnost: događaji sadrže samo metapodatke o usmjeravanju, nikad upite/tijela/vjerodajnice.

## 6. Integracija evaluacijske ravnine (spremnost za Future AGI)

OmniRoute tretira Future AGI (ili bilo koji evaluator) kao **potencijalnu
pozadinsku uslugu za inteligenciju/evaluaciju, a ne kao ovisnost**. Točke integracije:

- `RoutingEventSink` može asinkrono prosljeđivati događaje evaluatoru.
- `MemoryRoutingEventStore` + snimka kvalitete pružaju evaluatoru neobrađeni
  tok odluka.
- Budući `Evaluator` (deterministički, lokalni procjenjivač, HTTP, WASM) obrađivao bi
  događaje/tragove i vraćao `QualityScore` koji se prosljeđuje u istu
  putanju `getQualityScore`/faktora kvalitete.
- Postojeće usmjeravanje vođeno evaluacijom (`open-sse/services/evalRouting.ts`) već
  mijenja redoslijed ciljeva kombinacije prema stopama prolaznosti iz `eval_runs` kada je omogućeno.

Nijedna se evaluacija ne izvršava sinkrono na putanji zahtjeva, a pristupnik radi
u potpunosti i bez evaluatora.

## 7. Završni arhitekturni pregled

1. **Što ostaje na sinkronoj kritičnoj putanji?** Usmjeravanje/bodovanje, preliminarne
   provjere zaštitnih mehanizama, dohvat iz predmemorije i jedno `emitRoutingEvent` grananje (~0.12 µs iznad
   osnovnog bodovanja) prema odredištima u memoriji.
2. **Što je premješteno u asinkronu obradu?** OTel izvoz (vremenski okidač + fetch),
   pohrana `call_logs`/potrošnje, zapisi u semantičku predmemoriju; kvaliteta se drži u memoriji
   i izvodi u O(1) (asinkronost nije potrebna).
3. **Kako ishod usmjeravanja postaje povratna informacija?** `handleChatCore` emitira
   `RoutingEvent` → `QualityTracker` ažurira EWMA stanje → `getQualityScore`
   opskrbljuje faktor `quality` automatske kombinacije.
4. **Kako kvaliteta utječe na buduće usmjeravanje?** Niska ocjena kvalitete smanjuje
   ponderiranu ocjenu tog pružatelja/modela u `scoreAutoTargets`, pa se degradiranim
   modelima postupno smanjuje prioritet, a oporavljaju se kako se njihov EWMA poboljšava.
5. **Kako se Future AGI može integrirati bez toga da postane ovisnost?** Putem
   sučelja `RoutingEventSink` / budućeg adaptera `Evaluator` — bez čvrsto ugrađene
   ovisnosti.
6. **Što se događa kada evaluator nije dostupan?** Usmjeravanje ostaje nepromijenjeno;
   kvaliteta se vraća na neutralnu vrijednost (1.0) za modele bez zabilježenog signala.
7. **Što se događa kada telemetrija nije dostupna?** OTel odredište jednostavno se ne
   registrira; ostatak sloja za usmjeravanje radi bez promjena.
8. **Što se događa pri preopterećenju?** OTel međuspremnik odbacuje najstarije događaje; kvaliteta
   i kružni međuspremnik ograničeni su samom konstrukcijom; nema povratnog pritiska.
9. **Kako se stanje pružatelja oporavlja nakon degradacije?** EWMA ponovno konvergira kako
   se uspjesi akumuliraju; faza zagrijavanja održava hladne modele neutralnima; prekidač strujnog kruga
   neovisno se oporavlja putem HALF_OPEN proba.
10. **Koje predložene značajke namjerno NISU implementirane i zašto?**
    - Promet u sjeni / eksperimenti — već implementirano
      (`combo/shadowRouting.ts`); nije ponovno izrađeno.
    - Zaštitni mehanizmi — već implementirano (`src/lib/guardrails/`); nije duplicirano.
    - Semantička predmemorija — već implementirano (`src/lib/semanticCache.ts`); nije
      duplicirano.
    - Potpuna platforma za upravljanje eksperimentima, alati za skupove podataka, platforma
      za optimizaciju upita, vektorska baza podataka ili obvezna vanjska OTel infrastruktura — izvan
      opsega vitke podatkovne ravnine.
    - Rust struktura `RoutingEvent` — podatkovna ravnina je u TypeScriptu; TS tip
      prilagođeni je ekvivalent.

## 8. Referenca konfiguracije

| Varijabla                     | Zadana vrijednost | Učinak                                                                                    |
| ----------------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | nije postavljeno  | Kada je postavljeno, omogućuje izvoznik OTLP/HTTP tragova (npr. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nije postavljeno  | Rezervni pseudonim za OTLP krajnju točku.                                                 |
| `OTEL_SERVICE_NAME`           | `omniroute`       | Atribut resursa `service.name`.                                                           |

## 9. Testovi

- `tests/unit/routing-events.test.ts` — normalizacija događaja, klasifikacija
  statusa, ograničeni kružni međuspremnik, distribucija prema odredištima + izolacija.
- `tests/unit/routing-quality.test.ts` — početno zagrijavanje EWMA-e, oporavak od neuspjeha/uspjeha,
  kazne za anomalije, obrada prolaznog statusa 429, snimka stanja, ponovno postavljanje.
- `tests/unit/routing-scoring-quality.test.ts` — cjelovitost pondera, neutralna
  zadana vrijednost, rangiranje prema faktoru kvalitete.
- `tests/unit/routing-otel.test.ts` — uvjetno omogućavanje, sadržaj GenAI raspona, asinkrono
  pražnjenje, odbacivanje pri preopterećenju.
- `tests/unit/routing-events-concurrency.test.ts` — tisuće događaja, ograničenost kružnog
  međuspremnika, izolacija odredišta koje baca iznimke, isprepleteni asinkroni naleti,
  ponovno postavljanje tijekom umetanja.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministička petlja od početka do kraja putem
  stvarnog ocjenjivača `scoreAutoTargets`: zdravo → degradacija → oporavak → kratkotrajni poremećaj, uz
  scenarije hladnog pokretanja i pružatelja koji je imao sreće pri hladnom pokretanju.
- `tests/unit/stream-timing.test.ts` — TTFT (prvi proslijeđeni fragment), ITL,
  prvi bajt naspram prvog prosljeđivanja, prekid, sigurnost pri neispravnom/praznom fragmentu.

## 10. Status prethodno postojećih problema (Faza 18)

| Problem                                                            | Status                         | Napomene                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nepodudaranje izvoza `omniglyph`                                   | **ISPRAVLJENO (okruženje)**    | `node_modules` nije bio usklađen s datotekom `package-lock.json` (instalirana je verzija 1.3.1, a zaključana 1.4.0). Pokretanjem `npm install omniglyph@1.4.0` vraćena je zaključana verzija; broj pogrešaka tipova pao je na 0. Manifesti nisu promijenjeni.           |
| Zastarjeli testovi `getKnownContextOverflow`                       | **POZNATO — nije ispravljeno** | `combo-context-overflow-compression-probe.test.ts` uvozi funkciju koja više ne postoji u `open-sse/services/combo.ts` (spominje se samo u komentarima). Ispravak zahtijeva ponovnu implementaciju ili prepisivanje tih testova — nepovezano arhitekturno preslagivanje. |
| Izolacija baze podataka u `combo-runtime-unit-concurrency.test.ts` | **POZNATO — nije ispravljeno** | Provjera izolacije SQLite-a u testnom okruženju ne uspijeva pri izravnom pokretanju; na osnovnoj grani ne uspijeva na isti način.                                                                                                                                       |
| Odstupanje i18n datoteke `llm.txt`                                 | **POZNATO — nije ispravljeno** | `docs/i18n/*/llm.txt` razlikuju se od korijenske datoteke; problem je prethodno postojao i blokira provjeru sinkronizacije dokumentacije prije potvrđivanja promjena.                                                                                                   |

Problemi okruženja i problemi u kodu vode se odvojeno; nijedan nepovezani neuspjeh nije skriven
iza promijenjenih filtara testova.
