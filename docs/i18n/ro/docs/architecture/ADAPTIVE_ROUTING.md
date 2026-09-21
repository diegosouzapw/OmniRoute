# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Acest document descrie fundația de rutare adaptivă bazată pe feedback adăugată în
OmniRoute. Este intenționat restrânsă: introduce un canal tipizat pentru rezultatele
rutării, un semnal online de calitate care alimentează mecanismul existent de evaluare
auto-combo, un exportator OpenTelemetry opțional și un endpoint de explicabilitate.
Acesta **nu** înlocuiește stiva existentă de reziliență (circuit breaker, perioada de
așteptare a conexiunii, blocarea modelului, matricea de sănătate, pilotul automat) —
ci o completează.

## 1. Context arhitectural

OmniRoute este un plan de date cu o **cale critică a cererilor** și un **plan de
control/inteligență**. Calea critică trebuie să rămână rapidă, eficientă din punctul
de vedere al memoriei, asincronă, rezilientă și predictibilă. Evaluarea, calcularea
scorului de calitate, experimentele și analiza istorică aparțin planului de control.

```
Agent AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   plan de date (rapid, sincron, în memorie)
│  rutare / failover  │
│  sănătate / protecție│
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  Destinații feedback│   plan de control (asincron, best-effort)
│  monitor calitate   │
│  exportator OTel    │
│  stocare explicații │
└──────────┬──────────┘
           ▼  scor de calitate
      evaluator auto-combo
```

### Ce exista deja (auditat, nu duplicat)

| Concept                                  | Implementare existentă                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Disponibilitate (putem trimite trafic?)  | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, persistat în DB), perioada de așteptare a conexiunii, blocarea modelului |
| Raportarea stării de sănătate            | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                   |
| Trafic în umbră                          | `open-sse/services/combo/shadowRouting.ts`                                                                                |
| Mecanisme de protecție                   | `src/lib/guardrails/` (hook-uri pre/post)                                                                                 |
| Cache exact                              | `src/lib/semanticCache.ts` (bazat pe semnătură)                                                                           |
| Evaluatoare / rutare bazată pe evaluări  | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                      |
| Explicabilitatea deciziei combo          | `open-sse/services/combo/decisionTrace.ts`                                                                                |
| Evenimente în timp real pentru dashboard | `src/lib/events/eventBus.ts` (canal de notificare UI, payload-uri `unknown`, istoric cu 100 de intrări)                   |

Stratul de evenimente de rutare **nu** este o reimplementare a `eventBus`: acel bus
este canalul de notificare în timp real al dashboardului (nume de _evenimente_
tipizate, payload-uri opace, consumatori UI). `RoutingEvent` este o structură
_tipizată_ pentru rezultate (latență/tokenuri/cost/rezultat/motivul finalizării),
consumată de destinațiile de feedback ale planului de control (monitorul de calitate,
exportatorul OTel, stocarea explicațiilor).

### Ce lipsea (adăugat aici)

1. Un **eveniment tipizat pentru rezultatul rutării + o abstractizare pentru destinații**
   (`RoutingEvent` / `RoutingEventSink`). `decisionTrace` este limitat la combo și
   doar în memorie; `comboMetrics` sunt contoare cumulative; `call_logs` reprezintă
   persistență asincronă brută. Niciunul nu este un canal tipizat, bazat pe destinații,
   pentru rezultate, la care se poate abona un monitor de calitate, un exportator OTel
   sau un evaluator de tip Future-AGI.
2. Un **semnal online de calitate** (EWMA) pentru calitatea rezultatului — anterior,
   mecanismul de evaluare aproxima „calitatea” doar prin adecvarea statică pentru
   sarcină și ratele de promovare ale evaluărilor opționale.
3. Un **exportator OTel opțional, fără dependențe**, care utilizează convențiile
   semantice GenAI.
4. Un **endpoint de explicabilitate** care returnează deciziile reale de rutare +
   starea calității.

## 2. Evenimente de rutare (baza feedbackului)

Fișiere: `open-sse/services/routing/events.ts`, `.../index.ts`

Un `RoutingEvent` conține numai metadate de rutare:

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
  outcome: RoutingOutcome; // uniune cu valori permise
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` este un trait în stil `Send+Sync` în TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // trebuie să fie O(1), fără I/O sincron
}
```

Calea critică apelează `emitRoutingEvent(event)` o singură dată pentru fiecare cerere finalizată
(callback-ul de finalizare pentru streaming, calea de succes fără streaming și
calea de eșec pentru răspunsuri 200 incorecte din `handleChatCore`). Distribuirea este un fan-out sincron
către sink-urile înregistrate, dar fiecare sink doar pune în coadă/actualizează starea din memorie. **Fără
scrieri sincrone în baza de date și fără I/O de rețea pe calea critică.**

Sink-uri implicite:

- `MemoryRoutingEventStore` — buffer circular limitat (500), cu cele mai noi elemente primele, pentru
  endpoint-ul de explicare.
- Consumatorul `QualityTracker` — actualizează estimarea EWMA a calității.
- `OtlpHttpsEventSink` — opțional, activat numai când este setat `OMNIROUTE_OTEL_ENDPOINT`
  (sau `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Suprasarcină măsurată (comparație realistă)

`npm run bench:routing-events` pe această stație de lucru (100k iterații; operațiile sub-µs
sunt măsurate agregat în µs/op, deoarece percentilele per operație se află sub
rezoluția temporizatorului `performance.now()`):

| Scenariu                                       | µs/op  | operații/s |
| ---------------------------------------------- | ------ | ---------- |
| referință (numai calculul scorului)            | ~0.045 | ~22 M      |
| referință + RoutingEvent (2 sink-uri)          | ~0.168 | ~5.9 M     |
| referință + eveniment + adăugare în coada OTel | ~0.163 | ~6.1 M     |
| concurent (8 rafale intercalate)               | ~0.18  | —          |

Diferența introdusă de distribuirea evenimentelor față de calculul scorului de referință este de ~0.12 µs/cerere; sink-ul OTel
doar adaugă în coadă (inserare O(1) în buffer), fără a adăuga nimic măsurabil. Aceste valori sunt
specifice acestei mașini și relative — nu reprezintă o garanție pentru producție. Valoarea „~0.2 µs”
din v1 a fost o estimare agregată; această metodologie separă calculul scorului de referință
de costul distribuirii evenimentelor.

## 3. Semnal de calitate (starea furnizorului determinată de feedback)

Fișiere: `open-sse/services/routing/quality.ts`

v2 separă calitatea **operațională** de cea **semantică**:

- **Operațională** — derivată din calea critică de rutare (HTTP 4xx/5xx, erori de
  conexiune, răspunsuri 429, răspunsuri incorecte, întreruperi ale fluxului, `finish_reason=length`,
  succese fără niciun rezultat, EWMA pentru latență/TTFT). Un răspuns 200 NU este tratat drept calitate
  semantică.
- **Semantică** — valoarea efectivă a rezultatului generat. Este produsă NUMAI de
  un evaluator prin `setSemanticQuality()`. Valoarea sa este `null` până când un evaluator o furnizează și
  nu influențează niciodată scorul operațional.

Starea pentru fiecare pereche (furnizor, model) (EWMA + contoare limitate):

- `successEwma` — EWMA (α=0.2) pentru reușita rezultatului.
- `latencyEwma` / `ttftEwma` — EWMA pentru latență (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — cât de recent a fost observat ultima dată modelul.

### Încredere / luarea în considerare a numărului de eșantioane

`confidence = clamp01(samples / 50)`, iar scorul returnat către mecanismul de evaluare
este ponderat către punctul median neutru:

```
score = 0.5 + confidence * (operational - 0.5)
```

Consecințe (verificate prin teste):

- Un furnizor fără istoric (0 eșantioane) primește scorul **0.5** — nu este penalizat în mod incorect, dar
  nu poate domina un furnizor cu mii de observații solide.
- Un furnizor cu 7 succese norocoase este tras către 0.5 (nu ajunge niciodată să domine pe baza
  unei inițializări optimiste).
- Un furnizor cu cel puțin 50 de eșantioane converge către scorul său operațional real.
- Degradarea și recuperarea sunt graduale (EWMA), iar un singur eșec izolat nu
  compromite un furnizor sănătos.

`ProviderQuality` expune `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Aceste date alimentează mecanismul de evaluare auto-combo drept factorul de evaluare `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` în
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Suma rămâne 1.0.
- `buildAutoCandidates` completează `candidate.quality` din tracker; candidații
  fără date primesc implicit valoarea neutră **0.5** (un candidat fără istoric nu este nici favorizat, nici
  penalizat).

Bucla închisă:

```
RoutingEvent → QualityTracker → getQualityScore → factorul de calitate auto-combo
      ↑                                                    │
      └────── rezultatul cererii (handleChatCore) ←────────┘
```

### Excludere strictă vs penalizare moderată

Semnalul de calitate reprezintă numai o **preferință adaptivă moderată**. Excluderea strictă rămâne
în responsabilitatea mecanismelor existente de reziliență: circuit breaker OPEN, cotă epuizată,
eroare de autentificare, blocarea modelului — niciunul dintre acestea nu este afectat de scorul de calitate.
Un furnizor al cărui scor de calitate scade temporar devine mai puțin preferat, dar nu este niciodată
dezactivat complet.

## 3b. Măsurarea canonică a timpilor fluxului (TTFT / ITL)

Fișiere: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` este punctul unic de instrumentare pentru calea de streaming,
integrat în `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — primul fragment primit din amonte.
- `markForward()` — primul fragment redirecționat către client (utilizat pentru TTFT).
- `markInterrupted()` — expirarea timpului fluxului/abandonare/eroare înainte de o finalizare normală.
- `ttft()` = latența primului fragment SSE redirecționat. **Acesta NU este TTFT la nivel de token** —
  un singur fragment SSE poate conține zero/unul/mai multe tokenuri. Documentat cu precizie.
- `avgItlMs()` = intervalul mediu dintre fragmente (un indicator indirect al latenței fragmentelor pentru ITL).

TTFT/ITL/starea de întrerupere sunt transmise în `RoutingEvent` (`ttftMs`, `itlMs`) și sunt
exportate drept atribute de span GenAI/OmniRoute de către destinația OTel.

## 4. Observabilitate OpenTelemetry / GenAI

Fișiere: `open-sse/services/routing/otel.ts`

- Exportator OTLP/HTTP JSON fără dependențe (utilizează `fetch` global, fără
  SDK-ul `@opentelemetry/*`).
- Spanurile respectă convențiile semantice GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), plus atributele de rutare
  OmniRoute (rezultat, stare, ttft, reîncercări, rezervă).
- `record()` doar adaugă într-un buffer cu dimensiune limitată (O(1)); un temporizator din fundal
  golește bufferul asincron prin `POST {endpoint}/v1/traces`. În caz de supraîncărcare,
  cele mai vechi evenimente sunt eliminate (contorul `dropped`) — fără a aplica vreodată contrapresiune
  planului de date.
- **Dezactivat dacă nu este configurat.** `OMNIROUTE_OTEL_ENDPOINT` (sau
  `OTEL_EXPORTER_OTLP_ENDPOINT`) trebuie să fie setată; în caz contrar, destinația nu este
  înregistrată și nu se execută niciun cod OTel.

## 5. Explicabilitate

- `GET /v1/explain/routing` returnează evenimentele `RoutingEvent` recente (deciziile
  reale, cele mai noi primele) și instantaneul calității pentru fiecare furnizor/model.
- Autentificarea o reflectă pe cea pentru `/v1/combos` (cheie API Bearer sau sesiune de panou; acces anonim în
  implementările locale cu un singur utilizator și `REQUIRE_API_KEY=false`).
- Urmele per invocare la nivel de combinație rămân disponibile prin
  `decisionTrace.ts` existent (antetul `X-OmniRoute-Combo-Trace`).
- Siguranță: evenimentele conțin doar metadate de rutare, niciodată prompturi/corpuri de cerere/credențiale.

## 6. Integrarea planului de evaluare (pregătire pentru Future AGI)

OmniRoute tratează Future AGI (sau orice evaluator) drept un **potențial
backend de inteligență/evaluare, nu o dependență**. Punctele de integrare:

- Un `RoutingEventSink` poate redirecționa asincron evenimentele către un evaluator.
- `MemoryRoutingEventStore` + instantaneul calității îi oferă unui evaluator fluxul brut
  de decizii.
- Un viitor `Evaluator` (determinist, evaluator local, HTTP, WASM) ar consuma
  evenimente/urme și ar returna un `QualityScore` care alimentează aceeași cale
  `getQualityScore`/factor-de-calitate.
- Rutarea existentă bazată pe evaluări (`open-sse/services/evalRouting.ts`) deja
  reordonează țintele combinației în funcție de ratele de succes `eval_runs` atunci când este activată.

Nicio evaluare nu rulează sincron pe calea cererii, iar gateway-ul funcționează
complet în absența evaluatorului.

## 7. Revizuirea arhitecturală finală

1. **Ce rămâne pe calea critică sincronă?** Rutarea/scorarea, verificările preliminare
   ale mecanismelor de protecție, căutarea în cache și o distribuire `emitRoutingEvent` (~0.12 µs peste
   scorarea de bază) către destinațiile din memorie.
2. **Ce a fost mutat în procesarea asincronă?** Exportul OTel (temporizator + fetch),
   persistența `call_logs`/utilizării, scrierile în cache-ul semantic; calitatea este menținută în memorie
   și este O(1) (nu este necesară procesare asincronă).
3. **Cum devine feedback un rezultat al rutării?** `handleChatCore` emite un
   `RoutingEvent` → `QualityTracker` actualizează starea EWMA → `getQualityScore`
   alimentează factorul `quality` al combinației automate.
4. **Cum influențează calitatea rutarea viitoare?** Un scor de calitate scăzut reduce
   scorul ponderat al respectivului furnizor/model în `scoreAutoTargets`, astfel încât modelele
   degradate sunt defavorizate treptat și se recuperează pe măsură ce EWMA-ul lor se îmbunătățește.
5. **Cum se poate integra Future AGI fără a deveni o dependență?** Prin interfața
   `RoutingEventSink` / un viitor adaptor `Evaluator` — fără dependență codificată explicit.
6. **Ce se întâmplă când evaluatorul nu este disponibil?** Rutarea nu este afectată;
   calitatea revine la valoarea neutră (1.0) pentru modelele fără semnal observat.
7. **Ce se întâmplă când telemetria nu este disponibilă?** Destinația OTel pur și simplu nu este
   înregistrată; restul stratului de rutare rulează neschimbat.
8. **Ce se întâmplă în caz de supraîncărcare?** Bufferul OTel elimină cele mai vechi evenimente; calitatea
   și bufferul circular sunt limitate prin construcție; fără contrapresiune.
9. **Cum se recuperează starea furnizorului după degradare?** EWMA reconverge pe măsură ce
   se acumulează reușite; perioada de încălzire menține modelele noi într-o stare neutră; întrerupătorul de circuit
   se recuperează independent prin probe HALF_OPEN.
10. **Care dintre funcționalitățile propuse NU au fost implementate intenționat și de ce?**
    - Trafic din umbră / experimente — deja implementate
      (`combo/shadowRouting.ts`); nu au fost reconstruite.
    - Mecanisme de protecție — deja implementate (`src/lib/guardrails/`); nu au fost duplicate.
    - Cache semantic — deja implementat (`src/lib/semanticCache.ts`); nu a fost
      duplicat.
    - O platformă completă de gestionare a experimentelor, instrumente pentru seturi de date, o platformă de optimizare
      a prompturilor, o bază de date vectorială sau infrastructură OTel externă obligatorie — în afara
      domeniului de aplicare al unui plan de date suplu.
    - O structură Rust `RoutingEvent` — planul de date este TypeScript; tipul TS
      este echivalentul adaptat.

## 8. Referință de configurare

| Variabilă                     | Valoare implicită | Efect                                                                                        |
| ----------------------------- | ----------------- | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | nesetat           | Când este setată, activează exportatorul de urme OTLP/HTTP (de ex. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nesetat           | Alias de rezervă pentru endpoint-ul OTLP.                                                    |
| `OTEL_SERVICE_NAME`           | `omniroute`       | Atributul de resursă `service.name`.                                                         |

## 9. Teste

- `tests/unit/routing-events.test.ts` — normalizarea evenimentelor, clasificarea
  stărilor, buffer circular cu dimensiune limitată, distribuirea către receptoare + izolare.
- `tests/unit/routing-quality.test.ts` — încălzirea EWMA, recuperarea după eșec/succes,
  penalizările pentru anomalii, gestionarea tranzitorie a erorilor 429, instantaneu, resetare.
- `tests/unit/routing-scoring-quality.test.ts` — integritatea ponderilor, valoarea implicită
  neutră, clasificarea după factorul de calitate.
- `tests/unit/routing-otel.test.ts` — condiționarea activării, conținutul intervalului GenAI, golirea
  asincronă, eliminarea în caz de supraîncărcare.
- `tests/unit/routing-events-concurrency.test.ts` — mii de evenimente, dimensiunea limitată a bufferului
  circular, izolarea receptoarelor care aruncă excepții, rafale asincrone intercalate,
  resetarea în timpul inserărilor.
- `tests/unit/routing-adaptive-e2e.test.ts` — buclă deterministă completă prin
  evaluatorul real `scoreAutoTargets`: sănătos → degradare → recuperare → întrerupere temporară, plus
  scenarii de pornire la rece și de furnizor la rece favorizat de noroc.
- `tests/unit/stream-timing.test.ts` — TTFT (primul fragment redirecționat), ITL,
  primul octet față de prima redirecționare, întrerupere, siguranță pentru fragmente incorecte/goale.

## 10. Starea problemelor preexistente (Faza 18)

| Problemă                                                | Stare                       | Note                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nepotrivirea exportului `omniglyph`                     | **REMEDIATĂ (de mediu)**    | `node_modules` nu era sincronizat cu `package-lock.json` (versiunea instalată era 1.3.1, iar cea blocată era 1.4.0). Rularea comenzii `npm install omniglyph@1.4.0` a restaurat versiunea blocată; numărul erorilor de tip a scăzut la 0. Manifestele au rămas neschimbate.                           |
| Teste `getKnownContextOverflow` neactualizate           | **CUNOSCUTĂ — neremediată** | `combo-context-overflow-compression-probe.test.ts` importă o funcție care nu mai există în `open-sse/services/combo.ts` (doar comentariile fac referire la aceasta). Remedierea necesită reimplementarea sau rescrierea acelor teste — o modificare arhitecturală fără legătură cu obiectivul curent. |
| Izolarea BD în `combo-runtime-unit-concurrency.test.ts` | **CUNOSCUTĂ — neremediată** | Verificarea izolării SQLite din infrastructura de testare eșuează când testul este rulat direct; eșuează în mod identic și pe ramura de bază.                                                                                                                                                         |
| Divergență i18n pentru `llm.txt`                        | **CUNOSCUTĂ — neremediată** | Fișierele `docs/i18n/*/llm.txt` diferă de cel din rădăcină; problema este preexistentă și blochează verificarea pre-commit pentru sincronizarea documentației.                                                                                                                                        |

Problemele de mediu și cele de cod sunt menținute distincte; niciun eșec fără legătură
nu este ascuns prin filtre de testare modificate.
