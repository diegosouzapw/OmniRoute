# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Dan id-dokument jiddeskrivi l-pedament tar-routing adattiv immexxi mill-feedback miżjud ma'
OmniRoute. Huwa intenzjonalment żgħir: jintroduċi kanal ittajpjat għar-riżultati
tar-routing, sinjal ta' kwalità online li jalimenta l-iskorer auto-combo eżistenti,
esportatur OpenTelemetry fakultattiv, u endpoint għall-ispjegabbiltà. Huwa **ma**
jissostitwixxix l-infrastruttura eżistenti ta' reżiljenza (circuit breaker, connection cooldown,
model lockout, health matrix, autopilot) — iżda jikkomplementaha.

## 1. Kuntest arkitettoniku

OmniRoute huwa data plane b'**mogħdija kritika tat-talbiet** u **control/intelligence
plane**. Il-mogħdija kritika trid tibqa' veloċi, effiċjenti fl-użu tal-memorja, asinkronika, reżiljenti u
prevedibbli. L-evalwazzjoni, l-iskorar tal-kwalità, l-esperimenti u l-analiżi storika jagħmlu
parti mill-control plane.

```
Aġent AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (veloċi, sinkroniku, fil-memorja)
│  routing / failover │
│  health / guardrail │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (jintbagħat mingħajr stennija, ~0.2µs)
           ▼
┌─────────────────────┐
│  Sinks tal-feedback │   control plane (asinkroniku, bl-aħjar sforz)
│  tracker tal-kwalità│
│  esportatur OTel    │
│  maħżen tal-ispjegi │
└──────────┬──────────┘
           ▼  punteġġ tal-kwalità
      skorer auto-combo
```

### Dak li kien diġà jeżisti (awditjat, mhux idduplikat)

| Kunċett                                        | Implimentazzjoni eżistenti                                                                               |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Disponibbiltà (nistgħu nibagħtu traffiku?)     | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, ippersistit fid-DB), connection cooldown, model lockout |
| Rappurtar tal-istat tas-sistema                | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                  |
| Traffiku parallel ta' osservazzjoni            | `open-sse/services/combo/shadowRouting.ts`                                                               |
| Guardrails                                     | `src/lib/guardrails/` (hooks ta' qabel/wara)                                                             |
| Cache eżatt                                    | `src/lib/semanticCache.ts` (ibbażat fuq firma)                                                           |
| Evalwaturi / routing immexxi mill-evalwazzjoni | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                     |
| Spjegabbiltà tad-deċiżjonijiet tal-combo       | `open-sse/services/combo/decisionTrace.ts`                                                               |
| Avvenimenti tad-dashboard f'ħin reali          | `src/lib/events/eventBus.ts` (kanal ta' notifiki tal-UI, payloads `unknown`, storja ta' 100 entrata)     |

Is-saff tal-avvenimenti tar-routing **mhuwiex** implimentazzjoni mill-ġdid ta' `eventBus`: dak il-bus huwa
l-kanal ta' notifiki f'ħin reali tad-dashboard (ismijiet ta' _avvenimenti_ ttajpjati, payloads
opaki, konsumaturi tal-UI). `RoutingEvent` huwa struct tar-_riżultat_ ittajpjat
(latency/tokens/cost/outcome/finish-reason) ikkunsmat mis-sinks tal-feedback
tal-control plane (tracker tal-kwalità, esportatur OTel, maħżen tal-ispjegi).

### Dak li kien nieqes (miżjud hawnhekk)

1. **Avveniment ittajpjat tar-riżultat tar-routing + astrazzjoni ta' sink** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` huwa limitat għall-combo u jinżamm biss fil-memorja;
   `comboMetrics` huma counters kumulattivi; `call_logs` huwa persistenza asinkronika mhux ipproċessata.
   L-ebda wieħed minnhom mhu kanal tar-riżultati ttajpjat u bbażat fuq sinks li tracker tal-kwalità, esportatur
   OTel, jew evalwatur fl-istil ta' Future-AGI jista' jabbona għalih.
2. **Sinjal ta' kwalità online** (EWMA) għall-kwalità tal-output — qabel, l-iskorer
   kien jirrappreżenta "kwalità" biss permezz ta' adattament statiku għall-kompitu u rati ta' suċċess tal-evalwazzjonijiet attivati fuq għażla.
3. **Esportatur OTel fakultattiv u mingħajr dipendenzi** li juża l-konvenzjonijiet semantiċi GenAI.
4. **Endpoint tal-ispjegabbiltà** li jirritorna d-deċiżjonijiet reali tar-routing + l-istat tal-kwalità.

## 2. Avvenimenti tar-Rotot (bażi tal-feedback)

Fajls: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` iġorr biss metadejta tar-rotot:

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
  outcome: RoutingOutcome; // unjoni f'lista ta' permessi
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` huwa karatteristika fl-istil `Send+Sync` f'TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // irid ikun O(1), mingħajr I/O sinkroniku
}
```

Il-fluss kritiku jsejjaħ `emitRoutingEvent(event)` darba għal kull talba kompluta
(il-callback tat-tlestija tal-istreaming, il-fluss ta' suċċess mingħajr streaming,
u l-fluss ta' falliment għal 200 malformat f'`handleChatCore`). Id-distribuzzjoni
hija fan-out sinkroniku lejn sinks irreġistrati, iżda kull sink sempliċement
idaħħal fi kju jew jaġġorna stat fil-memorja. **L-ebda kitba sinkronika fid-database,
u l-ebda I/O tan-network fil-fluss kritiku.**

Sinks awtomatiċi:

- `MemoryRoutingEventStore` — ring buffer limitat (500), bl-aktar ġodda l-ewwel,
  għall-endpoint ta' spjegazzjoni.
- Konsumatur `QualityTracker` — jaġġorna l-istima tal-kwalità EWMA.
- `OtlpHttpsEventSink` — fakultattiv, attivat biss meta
  `OMNIROUTE_OTEL_ENDPOINT` (jew `OTEL_EXPORTER_OTLP_ENDPOINT`) ikun issettjat.

### Overhead imkejjel (tqabbil onest)

`npm run bench:routing-events` fuq dan il-workstation (100k iterazzjoni;
operazzjonijiet taħt il-µs imkejla bħala µs/op aggregati minħabba li
l-perċentili għal kull operazzjoni huma taħt ir-riżoluzzjoni tat-tajmer
`performance.now()`):

| Xenarju                            | µs/op  | ops/s  |
| ---------------------------------- | ------ | ------ |
| bażi (punteġġ biss)                | ~0.045 | ~22 M  |
| bażi + RoutingEvent (2 sinks)      | ~0.168 | ~5.9 M |
| bażi + avveniment + enqueue OTel   | ~0.163 | ~6.1 M |
| konkorrenti (8 bursts interleaved) | ~0.18  | —      |

Id-delta tad-distribuzzjoni tal-avvenimenti fuq il-punteġġ bażi hija ta'
~0.12 µs/talba; is-sink OTel sempliċement idaħħal fi kju (push f'buffer O(1)),
u ma jżid xejn li jista' jitkejjel. Dawn iċ-ċifri huma speċifiċi għall-magna u
relattivi — mhumiex garanzija għall-produzzjoni. Iċ-ċifra ta' v1 "~0.2 µs"
kienet stima aggregata; din il-metodoloġija tifred il-punteġġ bażi mill-ispiża
tad-distribuzzjoni tal-avvenimenti.

## 3. Sinjal tal-Kwalità (stat tal-fornitur immexxi mill-feedback)

Fajls: `open-sse/services/routing/quality.ts`

v2 tifred il-kwalità **operazzjonali** minn dik **semantika**:

- **Operazzjonali** — derivata mill-fluss kritiku tar-rotot (HTTP 4xx/5xx,
  fallimenti fil-konnessjoni, 429s, risposti malformati, interruzzjonijiet
  tal-istream, `finish_reason=length`, suċċessi mingħajr output, EWMA
  tal-latency/TTFT). 200 MHUX meqjus bħala kwalità semantika.
- **Semantika** — il-valur proprju tal-output iġġenerat. Tiġi prodotta BISS minn
  evalwatur permezz ta' `setSemanticQuality()`. Tibqa' `null` sakemm xi evalwatur
  jipprovdiha u qatt ma tidħol fil-punteġġ operazzjonali.

Stat għal kull (fornitur, mudell) (EWMA + counters limitati):

- `successEwma` — EWMA (α=0.2) tas-suċċess tar-riżultat.
- `latencyEwma` / `ttftEwma` — EWMA tal-latency (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — kemm ilu li l-mudell ġie osservat l-aħħar.

### Għarfien tal-kunfidenza / kampjuni

`confidence = clamp01(samples / 50)`, u l-punteġġ mogħti lura lill-kalkolatur
tal-punteġġ jitħallat lejn il-punt tan-nofs newtrali:

```
score = 0.5 + confidence * (operational - 0.5)
```

Konsegwenzi (ivverifikati mit-testijiet):

- Fornitur ġdid (0 kampjuni) jikseb punteġġ ta' **0.5** — ma jiġix penalizzat
  b'mod inġust, iżda ma jistax jiddomina fornitur b'eluf ta' osservazzjonijiet
  sodi.
- Fornitur b'7 suċċessi fortunati jinġibed lejn 0.5 (qatt ma jiddomina minħabba
  inizjalizzazzjoni ottimista).
- Fornitur b'50+ kampjun jikkonverġi lejn il-punteġġ operazzjonali reali tiegħu.
- Id-degradazzjoni u l-irkupru huma gradwali (EWMA), u falliment iżolat wieħed
  ma jeqridx fornitur b'saħħtu.

`ProviderQuality` jesponi `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Dan jidħol fil-kalkolatur tal-punteġġ auto-combo bħala l-fattur ta' punteġġ
`quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` f'
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Is-somma tibqa' 1.0.
- `buildAutoCandidates` jimla `candidate.quality` mit-tracker; kandidati mingħajr
  dejta jieħdu l-valur newtrali awtomatiku ta' **0.5** (kandidat ġdid la jingħata
  spinta u lanqas jiġi penalizzat).

Iċ-ċiklu magħluq:

```
RoutingEvent → QualityTracker → getQualityScore → fattur tal-kwalità auto-combo
      ↑                                                    │
      └────── riżultat tat-talba (handleChatCore) ←─────────┘
```

### Esklużjoni stretta kontra penali moderata

Is-sinjal tal-kwalità huwa biss **preferenza adattiva moderata**. L-esklużjoni
stretta tibqa' f'idejn is-sistema eżistenti ta' reżiljenza: circuit breaker OPEN,
kwota eżawrita, falliment fl-awtentikazzjoni, lockout tal-mudell — l-ebda wieħed
minn dawn ma jiġi affettwat mill-punteġġ tal-kwalità. Fornitur li l-punteġġ
tal-kwalità tiegħu jonqos temporanjament jingħata inqas preferenza, iżda qatt ma
jiġi diżattivat kompletament.

## 3b. Kejl kanoniku tal-ħin tal-fluss (TTFT / ITL)

Fajls: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` huwa l-punt uniku ta’ strumentazzjoni għall-perkors tal-istrimjar,
integrat ma’ `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — waslet l-ewwel parti tad-data mis-sors upstream.
- `markForward()` — l-ewwel parti tad-data mibgħuta lill-klijent (użata għal TTFT).
- `markInterrupted()` — skadenza tal-ħin/abort/żball tal-fluss qabel tmiem nadif.
- `ttft()` = latenzi tal-ewwel parti SSE mibgħuta. **Dan MHUX TTFT fil-livell tat-token** —
  parti SSE waħda tista’ ġġorr żero/token wieħed/diversi tokens. Dan huwa ddokumentat b’mod preċiż.
- `avgItlMs()` = id-distakk medju bejn il-partijiet tad-data (indikatur indirett tal-latenza tal-partijiet għal ITL).

TTFT/ITL/interrupted jidħlu fir-`RoutingEvent` (`ttftMs`, `itlMs`) u jiġu
esportati bħala attributi tal-span GenAI/OmniRoute mis-sink OTel.

## 4. Osservabbiltà OpenTelemetry / GenAI

Fajls: `open-sse/services/routing/otel.ts`

- Esportatur OTLP/HTTP JSON mingħajr dipendenzi (juża `fetch` globali, mingħajr
  l-SDK `@opentelemetry/*`).
- L-ispans isegwu l-konvenzjonijiet semantiċi ta’ GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) flimkien mal-attributi tar-routing
  ta’ OmniRoute (riżultat, status, ttft, tentattivi mill-ġdid, fallback).
- `record()` iżid biss ma’ buffer b’limitu (O(1)); tajmer fl-isfond
  jibgħat id-data permezz ta’ `POST {endpoint}/v1/traces` b’mod asinkronu. Meta jkun hemm tagħbija żejda,
  l-eqdem avvenimenti jitwarrbu (counter `dropped`) — qatt ma tiġi applikata backpressure fuq il-pjan
  tad-data.
- **Diżattivat sakemm jiġi kkonfigurat.** `OMNIROUTE_OTEL_ENDPOINT` (jew
  `OTEL_EXPORTER_OTLP_ENDPOINT`) irid ikun issettjat; inkella s-sink ma jiġix
  irreġistrat u ma jitħaddem ebda kodiċi OTel.

## 5. Spjegabbiltà

- `GET /v1/explain/routing` jirritorna r-`RoutingEvent`s reċenti (id-deċiżjonijiet
  reali, bl-aktar ġodda l-ewwel) u s-snapshot tal-kwalità għal kull fornitur/mudell.
- L-awtentikazzjoni tirrifletti dik ta’ `/v1/combos` (ċavetta API Bearer jew sessjoni tad-dashboard; aċċess anonimu fuq
  deployments lokali għal utent wieħed b’`REQUIRE_API_KEY=false`).
- It-traċċi fil-livell tal-combo għal kull invokazzjoni jibqgħu disponibbli permezz tal-
  `decisionTrace.ts` eżistenti (header `X-OmniRoute-Combo-Trace`).
- Sikurezza: l-avvenimenti jġorru biss metadata tar-routing, u qatt prompts/bodies/kredenzjali.

## 6. Integrazzjoni tal-pjan tal-evalwazzjoni (prontezza għal Future AGI)

OmniRoute jittratta lil Future AGI (jew kwalunkwe evalwatur) bħala **backend potenzjali
tal-intelliġenza/evalwazzjoni, mhux bħala dipendenza**. Il-punti ta’ integrazzjoni:

- `RoutingEventSink` jista’ jibgħat l-avvenimenti lil evalwatur b’mod asinkronu.
- Il-`MemoryRoutingEventStore` flimkien mas-snapshot tal-kwalità jagħtu lill-evalwatur il-fluss mhux ipproċessat
  tad-deċiżjonijiet.
- `Evaluator` futur (deterministiku, imħallef lokali, HTTP, WASM) jikkonsma
  l-avvenimenti/traċċi u jirritorna `QualityScore` li jidħol fl-istess
  perkors `getQualityScore`/tal-fattur tal-kwalità.
- Ir-routing eżistenti mmexxi mill-evalwazzjonijiet (`open-sse/services/evalRouting.ts`) diġà
  jerġa’ jordna l-miri tal-combo skont ir-rati ta’ suċċess ta’ `eval_runs` meta jkun attivat.

Ebda evalwazzjoni ma titħaddem b’mod sinkronu fil-perkors tat-talba, u l-gateway jopera
kompletament anki meta l-evalwatur ikun assenti.

## 7. Rieżami arkitettoniku finali

1. **X’jibqa’ fil-perkors sinkronu kritiku?** Routing/punteġġ, verifiki preliminari
   tal-guardrails, tfittxija fil-cache, u fan-out wieħed ta’ `emitRoutingEvent` (~0.12 µs aktar
   mill-punteġġ bażi) lejn sinks fil-memorja.
2. **X’ġie mċaqlaq għall-ipproċessar asinkronu?** Esportazzjoni OTel (tajmer + fetch),
   persistenza ta’ `call_logs`/użu, kitbiet fis-semantic cache; il-kwalità tinżamm fil-memorja
   u hija O(1) (ma teħtieġx asinkronija).
3. **Kif riżultat tar-routing isir feedback?** `handleChatCore` joħroġ
   `RoutingEvent` → `QualityTracker` jaġġorna l-istat EWMA → `getQualityScore`
   jitma’ l-fattur `quality` tal-auto-combo.
4. **Kif tinfluwenza l-kwalità r-routing futur?** Punteġġ baxx tal-kwalità jnaqqas
   il-punteġġ ponderat ta’ dak il-fornitur/mudell f’`scoreAutoTargets`, u għalhekk
   il-mudelli ddegradati gradwalment jingħataw inqas preferenza u jirkupraw hekk kif l-EWMA tagħhom titjieb.
5. **Kif jista’ Future AGI jintegra mingħajr ma jsir dipendenza?** Permezz tal-
   interface `RoutingEventSink` / adapter `Evaluator` futur — mingħajr
   dipendenza hardcoded.
6. **X’jiġri meta l-evalwatur ma jkunx disponibbli?** Ir-routing ma jiġix affettwat;
   il-kwalità terġa’ lura għal valur newtrali (1.0) għal mudelli mingħajr sinjal osservat.
7. **X’jiġri meta t-telemetrija ma tkunx disponibbli?** Is-sink OTel sempliċement ma jiġix
   irreġistrat; il-bqija tas-saff tar-routing jibqa’ jaħdem mingħajr tibdil.
8. **X’jiġri taħt tagħbija żejda?** Il-buffer OTel iwarrab l-eqdem avvenimenti; il-kwalità
   u r-ring buffer għandhom limiti mid-disinn tagħhom; ma jkun hemm ebda backpressure.
9. **Kif jirkupra l-istat tal-fornitur wara degradazzjoni?** L-EWMA jerġa’ jikkonverġi hekk kif
   jakkumulaw is-suċċessi; il-warmup iżomm il-mudelli kesħin fi stat newtrali; is-circuit breaker
   jirkupra b’mod indipendenti permezz ta’ probes `HALF_OPEN`.
10. **Liema funzjonalitajiet proposti intenzjonalment MA ġewx implimentati, u għaliex?**
    - Shadow traffic / esperimenti — diġà implimentati
      (`combo/shadowRouting.ts`); ma reġgħux inbnew.
    - Guardrails — diġà implimentati (`src/lib/guardrails/`); ma ġewx idduplikati.
    - Semantic cache — diġà implimentata (`src/lib/semanticCache.ts`); ma ġietx
      idduplikata.
    - Pjattaforma sħiħa għall-ġestjoni tal-esperimenti, għodod għad-datasets, pjattaforma
      għall-ottimizzazzjoni tal-prompts, vector DB, jew infrastruttura OTel esterna obbligatorja — barra mill-
      ambitu ta’ pjan tad-data ħafif.
    - Struct `RoutingEvent` f’Rust — il-pjan tad-data huwa TypeScript; it-tip TS
      huwa l-ekwivalenti adattat.

## 8. Referenza tal-konfigurazzjoni

| Varjabbli                     | Valur predefinit | Effett                                                                                       |
| ----------------------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | mhux issettjat   | Meta jiġi ssettjat, jattiva l-esportatur tat-traċċi OTLP/HTTP (eż. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | mhux issettjat   | Alias alternattiv għall-endpoint OTLP.                                                       |
| `OTEL_SERVICE_NAME`           | `omniroute`      | Attribut tar-riżorsa `service.name`.                                                         |

## 9. Testijiet

- `tests/unit/routing-events.test.ts` — normalizzazzjoni tal-avvenimenti, klassifikazzjoni
  tal-istatus, ring buffer b'limitu, distribuzzjoni lejn diversi sinkijiet + iżolament.
- `tests/unit/routing-quality.test.ts` — tisħin tal-EWMA, irkupru minn falliment/suċċess,
  penali għall-anomaliji, ġestjoni tranżitorja ta' 429, snapshot, reset.
- `tests/unit/routing-scoring-quality.test.ts` — integrità tal-piżijiet, valur predefinit
  newtrali, klassifikazzjoni skont il-fattur tal-kwalità.
- `tests/unit/routing-otel.test.ts` — kontroll tal-attivazzjoni, payload tal-span GenAI, flush
  asinkronu, skartar waqt tagħbija żejda.
- `tests/unit/routing-events-concurrency.test.ts` — eluf ta' avvenimenti, limitazzjoni tar-ring
  buffer, iżolament ta' sink li jqajjem eċċezzjoni, mewġiet asinkroni interkalati,
  reset waqt l-inserimenti.
- `tests/unit/routing-adaptive-e2e.test.ts` — ċiklu deterministiku minn tarf sa tarf permezz
  tal-iskorer reali `scoreAutoTargets`: f'saħħtu → jiddegrada → jirkupra → intopp qasir, flimkien
  ma' xenarji ta' bidu kiesaħ u fornitur kiesaħ ixxurtjat.
- `tests/unit/stream-timing.test.ts` — TTFT (l-ewwel biċċa mgħoddija), ITL,
  l-ewwel byte kontra l-ewwel trażmissjoni, interruzzjoni, sikurezza għal biċċiet malformati/vojta.

## 10. Status tal-kwistjonijiet preeżistenti (Fażi 18)

| Kwistjoni                                                   | Status                        | Noti                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Diskrepanza fl-esportazzjoni ta' `omniglyph`                | **IRRANĠATA (ambjentali)**    | `node_modules` ma kienx sinkronizzat ma' `package-lock.json` (installata 1.3.1 minflok il-verżjoni msakkra 1.4.0). It-tħaddim ta' `npm install omniglyph@1.4.0` irrestawra l-verżjoni msakkra; l-iżbalji tat-tipi niżlu għal 0. Il-manifesti ma nbidlux.                                     |
| Testijiet skaduti ta' `getKnownContextOverflow`             | **MAGĦRUFA — mhux irranġata** | `combo-context-overflow-compression-probe.test.ts` jimporta funzjoni li m'għadhiex teżisti f'`open-sse/services/combo.ts` (jirreferu għaliha biss il-kummenti). It-tiswija teħtieġ implimentazzjoni mill-ġdid jew kitba mill-ġdid ta' dawk it-testijiet — tibdil arkitettoniku mhux relatat. |
| Iżolament tad-DB f'`combo-runtime-unit-concurrency.test.ts` | **MAGĦRUFA — mhux irranġata** | L-asserzjoni tal-iżolament SQLite tal-qafas tat-testijiet tfalli meta titħaddem direttament; tfalli bl-istess mod fuq il-fergħa bażi.                                                                                                                                                        |
| Devjazzjoni ta' `llm.txt` fl-i18n                           | **MAGĦRUFA — mhux irranġata** | `docs/i18n/*/llm.txt` huma differenti minn dak fl-għerq; kwistjoni preeżistenti li timblokka l-kontroll pre-commit tas-sinkronizzazzjoni tad-dokumentazzjoni.                                                                                                                                |

Il-kwistjonijiet ambjentali u dawk tal-kodiċi jinżammu distinti; l-ebda falliment mhux relatat ma jinħeba
wara filtri tat-testijiet mibdula.
