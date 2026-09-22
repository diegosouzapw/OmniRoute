# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Inilalarawan ng dokumentong ito ang pundasyon ng adaptive routing na ginagabayan ng feedback na idinagdag sa
OmniRoute. Sadyang maliit ang saklaw nito: nagpapakilala ito ng typed routing-outcome
channel, isang online na signal ng kalidad na nagbibigay ng input sa kasalukuyang auto-combo scorer, isang
opsyonal na OpenTelemetry exporter, at isang endpoint para sa explainability. **Hindi** nito
pinapalitan ang kasalukuyang resilience stack (circuit breaker, connection cooldown,
model lockout, health matrix, autopilot) — dinaragdagan nito ang mga iyon.

## 1. Konteksto ng arkitektura

Ang OmniRoute ay isang data plane na may **request hot path** at isang **control/intelligence
plane**. Kailangang manatiling mabilis, matipid sa memory, asynchronous, resilient, at
predictable ang hot path. Nabibilang sa control plane ang evaluation, quality scoring,
mga eksperimento, at historikal na pagsusuri.

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (mabilis, sync, nasa memory)
│ routing / failover  │
│ health / guardrail  │
│ cache / streaming   │
└──────────┬──────────┘
           │ RoutingEvent (ipadala at huwag hintayin, ~0.2µs)
           ▼
┌─────────────────────┐
│ Mga feedback sink   │   control plane (async, best-effort)
│ quality tracker     │
│ OTel exporter       │
│ explain store       │
└──────────┬──────────┘
           ▼  score ng kalidad
      auto-combo scorer
```

### Ang mayroon na dati (na-audit, hindi dinoble)

| Konsepto                                              | Kasalukuyang implementasyon                                                                                |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Availability (maaari ba tayong magpadala ng traffic?) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, naka-persist sa DB), connection cooldown, model lockout   |
| Pag-uulat ng health                                   | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                    |
| Shadow traffic                                        | `open-sse/services/combo/shadowRouting.ts`                                                                 |
| Mga guardrail                                         | `src/lib/guardrails/` (mga pre/post hook)                                                                  |
| Exact cache                                           | `src/lib/semanticCache.ts` (batay sa signature)                                                            |
| Mga evaluator / routing na ginagabayan ng eval        | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                       |
| Explainability ng combo decision                      | `open-sse/services/combo/decisionTrace.ts`                                                                 |
| Mga real-time event ng dashboard                      | `src/lib/events/eventBus.ts` (channel ng UI notification, mga `unknown` payload, history na may 100 entry) |

Ang routing-event layer ay **hindi** muling implementasyon ng `eventBus`: ang bus na iyon ang
real-time notification channel ng dashboard (mga typed na _pangalan ng event_, mga opaque na
payload, mga consumer ng UI). Ang `RoutingEvent` ay isang typed na _outcome_ struct
(latency/tokens/cost/outcome/finish-reason) na ginagamit ng mga
feedback sink ng control plane (quality tracker, OTel exporter, explain store).

### Ang nawawala dati (idinagdag dito)

1. Isang **typed routing-outcome event + sink abstraction** (`RoutingEvent` /
   `RoutingEventSink`). Nakasaklaw lamang sa combo at nasa memory lamang ang `decisionTrace`;
   mga cumulative counter ang `comboMetrics`; raw async persistence ang `call_logs`.
   Wala sa mga ito ang isang typed at nakabatay sa sink na outcome channel na maaaring i-subscribe ng
   quality tracker, OTel exporter, o evaluator na tulad ng Future-AGI.
2. Isang **online na signal ng kalidad** (EWMA) para sa kalidad ng output — dati, kinakatawan lamang
   ng scorer ang "kalidad" sa pamamagitan ng static task fitness at mga opt-in eval pass-rate.
3. Isang **opsyonal at dependency-free na OTel exporter** na gumagamit ng mga GenAI semantic convention.
4. Isang **endpoint para sa explainability** na nagbabalik ng mga aktuwal na routing decision + quality state.

## 2. Mga Routing Event (pundasyon ng feedback)

Mga file: `open-sse/services/routing/events.ts`, `.../index.ts`

Ang isang `RoutingEvent` ay naglalaman lamang ng routing metadata:

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
  outcome: RoutingOutcome; // union na nasa allowlist
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

Ang `RoutingEventSink` ay isang trait na istilong `Send+Sync` sa TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // dapat O(1), walang kasabayang I/O
}
```

Tinatawag ng hot path ang `emitRoutingEvent(event)` nang isang beses sa bawat nakumpletong request
(ang callback sa pagkumpleto ng streaming, ang success path na hindi streaming, at ang
failure path para sa malformed-200 sa `handleChatCore`). Ang dispatch ay synchronous fan-out
patungo sa mga nakarehistrong sink, ngunit ang bawat sink ay nag-e-enqueue/nag-a-update lamang ng
in-memory na state. **Walang synchronous na pagsusulat sa database, walang network I/O sa hot path.**

Mga default na sink:

- `MemoryRoutingEventStore` — bounded (500) na ring buffer, pinakabago muna, para sa
  explain endpoint.
- Consumer na `QualityTracker` — ina-update ang pagtatantya ng kalidad gamit ang EWMA.
- `OtlpHttpsEventSink` — opsyonal, pinapagana lamang kapag nakatakda ang `OMNIROUTE_OTEL_ENDPOINT`
  (o `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Nasukat na overhead (tapat na paghahambing)

`npm run bench:routing-events` sa workstation na ito (100k pag-uulit; ang mga operasyong sub-µs
ay sinusukat bilang pinagsama-samang µs/op dahil ang mga percentile bawat operasyon ay mas mababa
sa resolution ng timer na `performance.now()`):

| Senaryo                             | µs/op  | ops/s  |
| ----------------------------------- | ------ | ------ |
| baseline (scoring lamang)           | ~0.045 | ~22 M  |
| baseline + RoutingEvent (2 sink)    | ~0.168 | ~5.9 M |
| baseline + event + OTel enqueue     | ~0.163 | ~6.1 M |
| concurrent (8 salit-salit na burst) | ~0.18  | —      |

Ang delta ng event dispatch kumpara sa baseline scoring ay ~0.12 µs/request; nag-e-enqueue
lamang ang OTel sink (O(1) buffer push), kaya wala itong naidaragdag na masusukat. Ang mga numerong
ito ay partikular sa makina at relatibo — hindi garantiya para sa production. Ang numerong
"~0.2 µs" sa v1 ay isang pinagsama-samang pagtatantya; pinaghihiwalay ng metodolohiyang ito ang
scoring baseline mula sa gastos ng event dispatch.

## 3. Signal ng Kalidad (state ng provider na pinapatakbo ng feedback)

Mga file: `open-sse/services/routing/quality.ts`

Pinaghihiwalay ng v2 ang **operational** na kalidad mula sa **semantic** na kalidad:

- **Operational** — hinango mula sa routing hot path (HTTP 4xx/5xx, mga pagkabigo sa
  koneksyon, 429s, mga malformed na response, mga pagkaantala ng stream, `finish_reason=length`,
  mga matagumpay na request na walang output, latency/TTFT EWMA). Ang 200 ay HINDI itinuturing
  na semantic na kalidad.
- **Semantic** — ang aktuwal na halaga ng nabuong output. LAGING evaluator lamang ang lumilikha
  nito sa pamamagitan ng `setSemanticQuality()`. Ito ay `null` hanggang may magbigay nito at
  hindi kailanman nakakahalo sa operational score.

State para sa bawat (provider, model) (EWMA + mga bounded na counter):

- `successEwma` — EWMA (α=0.2) ng tagumpay ng outcome.
- `latencyEwma` / `ttftEwma` — EWMA ng latency (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — kung gaano kamakailan huling naobserbahan ang model.

### Kamalayan sa confidence / dami ng sample

`confidence = clamp01(samples / 50)`, at ang score na ibinabalik sa scorer ay
hinahalo patungo sa neutral na midpoint:

```
score = 0.5 + confidence * (operational - 0.5)
```

Mga kahihinatnan (beripikado ng mga test):

- Ang cold provider (0 sample) ay may score na **0.5** — hindi ito pinaparusahan nang hindi patas,
  ngunit hindi nito kayang mangibabaw sa isang provider na may libo-libong matitibay na obserbasyon.
- Ang isang provider na may 7 masuwerteng tagumpay ay hinihila patungo sa 0.5 (hindi kailanman
  nangingibabaw dahil sa optimistikong initialization).
- Ang isang provider na may 50+ sample ay nagko-converge sa tunay nitong operational score.
- Unti-unti ang degradation at recovery (EWMA), at hindi sinisira ng isang nakahiwalay na
  pagkabigo ang isang malusog na provider.

Inilalantad ng `ProviderQuality` ang `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Ipinapasa ito sa auto-combo scorer bilang scoring factor na `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` sa
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Nananatiling 1.0 ang kabuuan.
- Pinupunan ng `buildAutoCandidates` ang `candidate.quality` mula sa tracker; ang mga candidate
  na walang data ay nagde-default sa neutral na **0.5** (ang cold candidate ay hindi binibigyan
  ng boost ni pinaparusahan).

Ang closed loop:

```
RoutingEvent → QualityTracker → getQualityScore → salik ng kalidad ng auto-combo
      ↑                                                    │
      └────── outcome ng request (handleChatCore) ←─────────┘
```

### Hard exclusion kumpara sa soft penalty

Ang signal ng kalidad ay isa lamang **soft adaptive preference**. Nananatili ang hard exclusion
sa kasalukuyang resilience stack: circuit breaker na OPEN, naubos na quota,
pagkabigo sa auth, model lockout — walang naaapektuhan sa mga ito ng quality score.
Ang provider na pansamantalang bumababa ang quality score ay binibigyan ng mas mababang
preference, at hindi kailanman hard-disabled.

## 3b. Kanonikal na timing ng stream (TTFT / ITL)

Mga file: `open-sse/utils/streamTiming.ts`

Ang `createStreamTiming()` ang nag-iisang instrumentation seam para sa streaming path,
na nakakabit sa `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — natanggap ang unang upstream chunk.
- `markForward()` — ipinasa sa client ang unang chunk (ginagamit para sa TTFT).
- `markInterrupted()` — nagkaroon ng timeout/abort/error ang stream bago ang maayos na pagtatapos.
- `ttft()` = latency ng unang ipinasa na SSE chunk. **HINDI ito token-level na TTFT** —
  maaaring maglaman ang isang SSE chunk ng wala, isa, o maraming token. Tumpak itong nakadokumento.
- `avgItlMs()` = mean na agwat sa pagitan ng mga chunk (isang proxy ng chunk latency para sa ITL).

Ang TTFT/ITL/interrupted ay dumadaloy sa `RoutingEvent` (`ttftMs`, `itlMs`) at
ine-export bilang mga GenAI/OmniRoute span attribute ng OTel sink.

## 4. OpenTelemetry / GenAI observability

Mga file: `open-sse/services/routing/otel.ts`

- OTLP/HTTP JSON exporter na walang dependency (gumagamit ng global na `fetch`, walang
  `@opentelemetry/*` SDK).
- Sinusunod ng mga span ang mga GenAI semantic convention (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) kasama ang mga OmniRoute routing
  attribute (resulta, status, ttft, mga retry, fallback).
- Ang `record()` ay naglalagay lamang sa pila sa loob ng bounded buffer (O(1)); isang background timer
  ang asynchronous na nagfa-flush sa pamamagitan ng `POST {endpoint}/v1/traces`. Kapag overloaded,
  inaalis ang mga pinakalumang event (`dropped` counter) — hindi kailanman naglalagay ng backpressure sa data
  plane.
- **Naka-disable maliban kung naka-configure.** Dapat nakatakda ang `OMNIROUTE_OTEL_ENDPOINT` (o
  `OTEL_EXPORTER_OTLP_ENDPOINT`); kung hindi, hindi irerehistro ang sink at walang
  OTel code na tatakbo.

## 5. Kakayahang maipaliwanag

- Ibinabalik ng `GET /v1/explain/routing` ang mga kamakailang `RoutingEvent` (ang mga aktuwal na
  desisyon, pinakabago muna) at ang snapshot ng kalidad para sa bawat provider/model.
- Katulad ng `/v1/combos` ang auth (Bearer API key o dashboard session; anonymous sa
  mga single-user na lokal na deployment na may `REQUIRE_API_KEY=false`).
- Nananatiling available ang mga per-invocation trace sa antas ng combo sa pamamagitan ng umiiral na
  `decisionTrace.ts` (header na `X-OmniRoute-Combo-Trace`).
- Kaligtasan: routing metadata lamang ang nilalaman ng mga event, at hindi kailanman mga prompt/body/credential.

## 6. Integrasyon ng evaluation plane (Kahandaan para sa Future AGI)

Itinuturing ng OmniRoute ang Future AGI (o anumang evaluator) bilang isang **potensyal na
intelligence/evaluation backend, hindi isang dependency**. Ang mga seam:

- Maaaring asynchronous na mag-forward ng mga event sa evaluator ang isang `RoutingEventSink`.
- Ibinibigay ng `MemoryRoutingEventStore` + snapshot ng kalidad sa evaluator ang raw na
  stream ng mga desisyon.
- Kokonsumo ng mga event/trace ang isang `Evaluator` sa hinaharap (deterministic, lokal na judge, HTTP, WASM)
  at magbabalik ng `QualityScore` na ipapasok sa parehong
  `getQualityScore`/quality-factor path.
- Ang umiiral na eval-driven routing (`open-sse/services/evalRouting.ts`) ay
  muling nagsasaayos na ng mga combo target ayon sa mga pass-rate ng `eval_runs` kapag naka-enable.

Walang evaluation na tumatakbo nang synchronous sa request path, at ganap na gumagana
ang gateway kahit walang evaluator.

## 7. Panghuling pagsusuri sa arkitektura

1. **Ano ang nananatili sa synchronous hot path?** Routing/scoring, mga pre-check ng
   guardrail, cache lookup, at isang `emitRoutingEvent` fan-out (~0.12 µs sa ibabaw ng
   baseline scoring) patungo sa mga in-memory sink.
2. **Ano ang inilipat sa asynchronous processing?** OTel export (timer + fetch),
   persistence ng `call_logs`/usage, mga pagsusulat sa semantic cache; in-memory
   at O(1) ang quality (hindi kailangan ng async).
3. **Paano nagiging feedback ang isang resulta ng routing?** Nag-e-emit ang `handleChatCore` ng
   `RoutingEvent` → ina-update ng `QualityTracker` ang EWMA state → ipinapasok ng `getQualityScore`
   ang auto-combo `quality` factor.
4. **Paano nakaaapekto ang kalidad sa routing sa hinaharap?** Binabawasan ng mababang quality score
   ang weighted score ng provider/model na iyon sa `scoreAutoTargets`, kaya ang mga humihinang
   model ay unti-unting hindi gaanong pinapaboran at nakakabawi habang bumubuti ang kanilang EWMA.
5. **Paano maaaring isama ang Future AGI nang hindi ito nagiging dependency?** Sa pamamagitan ng
   `RoutingEventSink` interface / isang `Evaluator` adapter sa hinaharap — walang hardcoded na
   dependency.
6. **Ano ang mangyayari kapag hindi available ang evaluator?** Hindi naaapektuhan ang routing;
   babalik ang quality sa neutral (1.0) para sa mga model na walang naobserbahang signal.
7. **Ano ang mangyayari kapag hindi available ang telemetry?** Hindi lamang
   irerehistro ang OTel sink; patuloy na tatakbo nang walang pagbabago ang natitirang bahagi ng routing layer.
8. **Ano ang mangyayari kapag overloaded?** Inaalis ng OTel buffer ang mga pinakalumang event; ang quality
   at ring buffer ay bounded ayon sa disenyo; walang backpressure.
9. **Paano nakakabawi ang estado ng provider pagkatapos humina?** Muling nagko-converge ang EWMA habang
   dumarami ang mga tagumpay; pinananatiling neutral ng warmup ang mga cold model; ang circuit breaker
   ay hiwalay na nakakabawi sa pamamagitan ng mga HALF_OPEN probe.
10. **Aling mga iminungkahing feature ang sadyang HINDI ipinatupad, at bakit?**
    - Shadow traffic / mga eksperimento — ipinatupad na
      (`combo/shadowRouting.ts`); hindi muling binuo.
    - Mga guardrail — ipinatupad na (`src/lib/guardrails/`); hindi dinoble.
    - Semantic cache — ipinatupad na (`src/lib/semanticCache.ts`); hindi
      dinoble.
    - Isang kumpletong platform para sa pamamahala ng eksperimento, dataset tooling, platform para sa prompt optimization,
      vector DB, o mandatoryong panlabas na OTel infrastructure — wala sa
      saklaw ng isang lean na data plane.
    - Isang Rust na `RoutingEvent` struct — TypeScript ang data plane; ang TS type
      ang inangkop na katumbas.

## 8. Sanggunian sa configuration

| Variable                      | Default         | Epekto                                                                                          |
| ----------------------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | hindi nakatakda | Kapag nakatakda, pinapagana ang exporter ng mga OTLP/HTTP trace (hal. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | hindi nakatakda | Alternatibong alias para sa OTLP endpoint.                                                      |
| `OTEL_SERVICE_NAME`           | `omniroute`     | Resource attribute na `service.name`.                                                           |

## 9. Mga test

- `tests/unit/routing-events.test.ts` — normalisasyon ng event, klasipikasyon ng
  status, bounded ring buffer, fan-out at isolation ng sink.
- `tests/unit/routing-quality.test.ts` — warmup ng EWMA, pagbawi mula sa kabiguan/tagumpay,
  mga penalty sa anomalya, transient na paghawak sa 429, snapshot, reset.
- `tests/unit/routing-scoring-quality.test.ts` — integridad ng weight, neutral na
  default, pagraranggo ayon sa quality factor.
- `tests/unit/routing-otel.test.ts` — gating sa pagpapagana, payload ng GenAI span, asynchronous na
  flush, pag-drop kapag overloaded.
- `tests/unit/routing-events-concurrency.test.ts` — libo-libong event, boundedness ng ring
  buffer, isolation ng sink na nagtatapon ng error, salit-salitang asynchronous na mga burst,
  reset habang nagsisingit.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministic na end-to-end loop sa pamamagitan
  ng aktuwal na `scoreAutoTargets` scorer: maayos → humina → bumawi → panandaliang aberya, kasama ang
  mga senaryo ng cold-start at mapalad na cold provider.
- `tests/unit/stream-timing.test.ts` — TTFT (unang na-forward na chunk), ITL,
  unang byte kumpara sa unang pag-forward, pagkaantala, kaligtasan sa malformed/walang-lamang chunk.

## 10. Status ng mga dati nang isyu (Phase 18)

| Isyu                                                     | Status                       | Mga tala                                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hindi pagtutugma ng export ng `omniglyph`                | **NAAYOS (pangkapaligiran)** | Hindi naka-sync ang `node_modules` sa `package-lock.json` (naka-install ang 1.3.1 kumpara sa naka-lock na 1.4.0). Naibalik ng pagpapatakbo ng `npm install omniglyph@1.4.0` ang naka-lock na bersyon; bumaba sa 0 ang mga type error. Walang binago sa mga manifest.                          |
| Mga lumang `getKnownContextOverflow` test                | **ALAM — hindi naayos**      | Nag-i-import ang `combo-context-overflow-compression-probe.test.ts` ng function na wala na sa `open-sse/services/combo.ts` (mga komento na lamang ang tumutukoy rito). Kailangan itong muling ipatupad o muling isulat ang mga test upang maayos — hindi kaugnay na pagbabago sa arkitektura. |
| DB isolation ng `combo-runtime-unit-concurrency.test.ts` | **ALAM — hindi naayos**      | Nabibigo ang SQLite-isolation assertion ng test harness kapag direktang pinapatakbo; pareho rin itong nabibigo sa base branch.                                                                                                                                                                |
| Paglihis ng i18n `llm.txt`                               | **ALAM — hindi naayos**      | Naiiba ang `docs/i18n/*/llm.txt` sa root; dati nang umiiral at hinaharangan ang docs-sync pre-commit gate.                                                                                                                                                                                    |

Pinananatiling magkahiwalay ang mga isyung pangkapaligiran at mga isyu sa code; walang itinatagong
hindi kaugnay na kabiguan sa likod ng binagong mga filter ng test.
