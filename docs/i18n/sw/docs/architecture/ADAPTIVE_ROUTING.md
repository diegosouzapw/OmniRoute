# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Hati hii inaelezea msingi wa uelekezaji unaobadilika kulingana na mrejesho ulioongezwa kwenye
OmniRoute. Umewekwa mdogo kimakusudi: unaanzisha mkondo wa matokeo ya uelekezaji
wenye aina zilizobainishwa, ishara ya ubora ya wakati halisi inayolisha kikokotoaji kilichopo cha auto-combo,
kisafirishaji cha hiari cha OpenTelemetry, na endpoint ya ufafanuzi. **Haubadilishi**
mfumo uliopo wa ustahimilivu (circuit breaker, connection cooldown,
model lockout, health matrix, autopilot) — unaukamilisha.

## 1. Muktadha wa usanifu

OmniRoute ni data plane yenye **njia kuu ya maombi** na **control/intelligence
plane**. Njia kuu lazima ibaki ya haraka, yenye matumizi bora ya kumbukumbu, asynchronous, stahimilivu na
inayotabirika. Tathmini, ukadiriaji wa ubora, majaribio na uchanganuzi wa kihistoria ni
sehemu ya control plane.

```
Ajenti ya AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (haraka, sync, ndani ya kumbukumbu)
│  uelekezaji / failover │
│  afya / guardrail   │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (tuma-na-usahau, ~0.2µs)
           ▼
┌─────────────────────┐
│  Vipokezi vya mrejesho │   control plane (async, kwa kadiri iwezekanavyo)
│  kifuatiliaji ubora │
│  kisafirishaji cha OTel │
│  hifadhi ya ufafanuzi │
└──────────┬──────────┘
           ▼  alama ya ubora
      kikokotoaji cha auto-combo
```

### Kilichokuwepo tayari (kimekaguliwa, hakijarudiwa)

| Dhana                                           | Utekelezaji uliopo                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Upatikanaji (tunaweza kutuma trafiki?)          | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, imehifadhiwa kwenye DB), connection cooldown, model lockout |
| Ripoti za afya                                  | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                      |
| Trafiki kivuli                                  | `open-sse/services/combo/shadowRouting.ts`                                                                   |
| Guardrail                                       | `src/lib/guardrails/` (hooks za kabla/baada)                                                                 |
| Cache halisi                                    | `src/lib/semanticCache.ts` (inayotegemea signature)                                                          |
| Vitathmini / uelekezaji unaoongozwa na tathmini | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                         |
| Ufafanuzi wa maamuzi ya combo                   | `open-sse/services/combo/decisionTrace.ts`                                                                   |
| Matukio ya wakati halisi ya dashboard           | `src/lib/events/eventBus.ts` (mkondo wa arifa za UI, payload za `unknown`, historia ya maingizo 100)         |

Safu ya matukio ya uelekezaji **si** utekelezaji mpya wa `eventBus`: bus hiyo ni
mkondo wa arifa za wakati halisi wa dashboard (majina ya _matukio_ yenye aina zilizobainishwa, payload
zisizo wazi, watumiaji wa UI). `RoutingEvent` ni muundo wa _matokeo_ wenye aina zilizobainishwa
(latency/tokens/cost/outcome/finish-reason) unaotumiwa na
vipokezi vya mrejesho vya control plane (kifuatiliaji ubora, kisafirishaji cha OTel, hifadhi ya ufafanuzi).

### Kilichokosekana (kimeongezwa hapa)

1. **Tukio la matokeo ya uelekezaji lenye aina zilizobainishwa + dhana ya sink** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` imewekewa upeo wa combo na ipo ndani ya kumbukumbu pekee;
   `comboMetrics` ni vihesabu limbikizi; `call_logs` ni uhifadhi ghafi wa async.
   Hakuna hata kimoja ambacho ni mkondo wa matokeo wenye aina zilizobainishwa na unaotegemea sink, ambao kifuatiliaji ubora, kisafirishaji cha OTel,
   au kitathmini cha mtindo wa Future-AGI kinaweza kujisajili kuupokea.
2. **Ishara ya ubora ya wakati halisi** (EWMA) kwa ajili ya ubora wa matokeo — hapo awali kikokotoaji
   kiliwakilisha "ubora" kupitia tu ufaafu tuli wa kazi na viwango vya kufaulu kwa tathmini vinavyowashwa kwa hiari.
3. **Kisafirishaji cha hiari cha OTel kisichohitaji dependency** kinachotumia kanuni za kisemantiki za GenAI.
4. **Endpoint ya ufafanuzi** inayorejesha maamuzi halisi ya uelekezaji + hali ya ubora.

## 2. Matukio ya Uelekezaji (msingi wa mrejesho)

Faili: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` hubeba metadata ya uelekezaji pekee:

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
  outcome: RoutingOutcome; // muungano wenye orodha ya thamani zinazoruhusiwa
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` ni trait ya mtindo wa `Send+Sync` katika TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // lazima iwe O(1), bila I/O ya ulandanishi
}
```

Njia kuu yenye shughuli nyingi huita `emitRoutingEvent(event)` mara moja kwa kila ombi lililokamilika
(callback ya ukamilishaji wa utiririshaji, njia ya mafanikio isiyo ya utiririshaji, na
njia ya kutofaulu kwa jibu batili la 200 katika `handleChatCore`). Usambazaji ni fan-out ya ulandanishi
kwa sinks zilizosajiliwa, lakini kila sink huingiza kwenye foleni/kusasisha hali ya kumbukumbu pekee. **Hakuna
uandishi wa hifadhidata wa ulandanishi, wala I/O ya mtandao kwenye njia hii yenye shughuli nyingi.**

Sinks chaguomsingi:

- `MemoryRoutingEventStore` — ring buffer yenye kikomo (500), vipya kwanza, kwa
  endpoint ya maelezo.
- Mtumiaji wa `QualityTracker` — husasisha makadirio ya ubora ya EWMA.
- `OtlpHttpsEventSink` — ya hiari, huwezeshwa tu wakati `OMNIROUTE_OTEL_ENDPOINT`
  (au `OTEL_EXPORTER_OTLP_ENDPOINT`) imewekwa.

### Overhead iliyopimwa (ulinganisho wa uaminifu)

`npm run bench:routing-events` kwenye kituo hiki cha kazi (marudio 100k; oparesheni za chini ya µs
zimepimwa kama jumla ya µs/op kwa sababu percentaili za kila oparesheni ziko chini ya
ubainifu wa kipima muda cha `performance.now()`):

| Hali                                           | µs/op  | ops/s  |
| ---------------------------------------------- | ------ | ------ |
| msingi (ukokotoaji wa alama pekee)             | ~0.045 | ~22 M  |
| msingi + RoutingEvent (sinks 2)                | ~0.168 | ~5.9 M |
| msingi + tukio + uwekaji wa OTel kwenye foleni | ~0.163 | ~6.1 M |
| sambamba (milipuko 8 iliyopishana)             | ~0.18  | —      |

Tofauti ya usambazaji wa tukio dhidi ya ukokotoaji wa alama wa msingi ni ~0.12 µs/ombi; sink ya OTel
huweka kwenye foleni pekee (uingizaji kwenye buffer wa O(1)), bila kuongeza chochote kinachoweza kupimika. Namba hizi ni
mahususi kwa mashine na ni za kulinganisha — si hakikisho la uzalishaji. Thamani ya v1 ya "~0.2 µs"
ilikuwa makadirio ya jumla; mbinu hii hutenganisha msingi wa ukokotoaji wa alama
na gharama ya usambazaji wa tukio.

## 3. Ishara ya Ubora (hali ya mtoa huduma inayoendeshwa na mrejesho)

Faili: `open-sse/services/routing/quality.ts`

v2 hutenganisha ubora wa **kiutendaji** na wa **kisemantiki**:

- **Kiutendaji** — hutokana na njia kuu ya uelekezaji yenye shughuli nyingi (HTTP 4xx/5xx, hitilafu za
  muunganisho, 429s, majibu batili, kukatizwa kwa mitiririko, `finish_reason=length`,
  mafanikio yenye matokeo sifuri, EWMA ya ucheleweshaji/TTFT). Jibu la 200 HALICHUKULIWI kama ubora
  wa kisemantiki.
- **Kisemantiki** — thamani halisi ya matokeo yaliyotolewa. Huzalishwa TU na
  mtathmini kupitia `setSemanticQuality()`. Ni `null` hadi mtathmini atakapoit提供 na
  kamwe haiingii kwenye alama ya kiutendaji.

Hali ya kila (mtoa huduma, modeli) (EWMA + vihesabu vyenye mipaka):

- `successEwma` — EWMA (α=0.2) ya mafanikio ya matokeo.
- `latencyEwma` / `ttftEwma` — EWMA ya ucheleweshaji (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — muda uliopita tangu modeli ilipoonekana mara ya mwisho.

### Ufahamu wa kiwango cha uhakika / sampuli

`confidence = clamp01(samples / 50)`, na alama inayorejeshwa kwa kikokotoaji cha alama
huchanganywa kuelekea kitovu kisichoegemea upande wowote:

```
score = 0.5 + confidence * (operational - 0.5)
```

Matokeo yake (yamethibitishwa na majaribio):

- Mtoa huduma asiye na historia (sampuli 0) hupata alama ya **0.5** — haadhibiwi isivyo haki, lakini
  hawezi kumzidi mtoa huduma mwenye maelfu ya uchunguzi thabiti.
- Mtoa huduma mwenye mafanikio 7 ya bahati huvutwa kuelekea 0.5 (kamwe hatawali kutokana na
  uanzishaji wenye matumaini).
- Mtoa huduma mwenye sampuli 50+ hukaribia alama yake halisi ya kiutendaji.
- Kushuka kwa ubora na kurejea kwake hutokea taratibu (EWMA), na hitilafu moja ya pekee
  haimuharibu mtoa huduma mwenye afya nzuri.

`ProviderQuality` hufichua `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Hii hulisha kikokotoaji cha alama cha auto-combo kama kipengele cha ukokotoaji wa alama cha `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` katika
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Jumla hubaki 1.0.
- `buildAutoCandidates` hujaza `candidate.quality` kutoka kwenye kifuatiliaji; candidates
  zisizo na data hupewa thamani chaguomsingi isiyoegemea upande wowote ya **0.5** (candidate asiye na historia
  haongezewi wala kupunguziwa upendeleo).

Mzunguko funge:

```
RoutingEvent → QualityTracker → getQualityScore → kipengele cha ubora cha auto-combo
      ↑                                                    │
      └────── matokeo ya ombi (handleChatCore) ←────────────┘
```

### Kutenga kabisa dhidi ya adhabu laini

Ishara ya ubora ni **upendeleo laini unaojirekebisha** pekee. Kutenga kabisa hubaki
kwa mfumo uliopo wa ustahimilivu: circuit breaker OPEN, quota exhausted,
auth failure, model lockout — hakuna mojawapo inayoathiriwa na alama ya ubora.
Mtoa huduma ambaye alama yake ya ubora inashuka kwa muda hupewa upendeleo mdogo, lakini kamwe
hazimwi kabisa.

## 3b. Upimaji sanifu wa muda wa mtiririko (TTFT / ITL)

Faili: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` ndiyo sehemu pekee ya uwekaji ala kwa njia ya mtiririko,
iliyounganishwa kwenye `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — kipande cha kwanza kutoka chanzo cha juu kimepokelewa.
- `markForward()` — kipande cha kwanza kimetumwa kwa mteja (hutumika kwa TTFT).
- `markInterrupted()` — muda wa mtiririko kuisha/ukatishwaji/hitilafu kabla ya kukamilika vizuri.
- `ttft()` = muda wa kusubiri kipande cha kwanza cha SSE kilichotumwa. **Hii SI TTFT ya kiwango cha tokeni** —
  kipande kimoja cha SSE kinaweza kuwa na tokeni sifuri/moja/nyingi. Imefafanuliwa kwa usahihi.
- `avgItlMs()` = wastani wa pengo kati ya vipande (kipimo mbadala cha muda wa kusubiri kipande kwa ITL).

TTFT/ITL/hali ya kukatizwa huingia kwenye `RoutingEvent` (`ttftMs`, `itlMs`) na
husafirishwa kama sifa za span za GenAI/OmniRoute kupitia sinki ya OTel.

## 4. Uangalizi wa OpenTelemetry / GenAI

Faili: `open-sse/services/routing/otel.ts`

- Kisafirishaji cha OTLP/HTTP JSON kisichotegemea utegemezi mwingine (hutumia `fetch` ya kimataifa, bila
  SDK ya `@opentelemetry/*`).
- Span hufuata kanuni za kisemantiki za GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) pamoja na sifa za uelekezaji za
  OmniRoute (matokeo, hali, ttft, majaribio ya kurudia, njia mbadala).
- `record()` huingiza tu kwenye bafa yenye kikomo (O(1)); kipima muda cha usuli
  hutuma kwa `POST {endpoint}/v1/traces` kwa njia isiyosawazishwa. Wakati wa mzigo kupita kiasi,
  matukio ya zamani zaidi huondolewa (kihesabu cha `dropped`) — kamwe haitoi shinikizo la nyuma kwenye
  safu ya data.
- **Imezimwa isipokuwa ikiwa imesanidiwa.** `OMNIROUTE_OTEL_ENDPOINT` (au
  `OTEL_EXPORTER_OTLP_ENDPOINT`) lazima iwekwe; vinginevyo sinki haisajiliwi
  na hakuna msimbo wa OTel unaoendeshwa.

## 5. Uwezo wa kueleza

- `GET /v1/explain/routing` hurudisha `RoutingEvent` za hivi karibuni (maamuzi halisi,
  mapya zaidi kwanza) na muhtasari wa ubora kwa kila mtoa huduma/modeli.
- Uthibitishaji unafanana na `/v1/combos` (ufunguo wa API wa Bearer au kipindi cha dashibodi; bila utambulisho kwenye
  usakinishaji wa ndani wa mtumiaji mmoja wenye `REQUIRE_API_KEY=false`).
- Ufuatiliaji wa kila mwito katika kiwango cha mchanganyiko bado unapatikana kupitia
  `decisionTrace.ts` iliyopo (kichwa `X-OmniRoute-Combo-Trace`).
- Usalama: matukio hubeba metadata ya uelekezaji pekee, kamwe si vidokezo/miili/vitambulisho vya siri.

## 6. Ujumuishaji wa safu ya tathmini (utayari kwa Future AGI)

OmniRoute huchukulia Future AGI (au mtathmini yeyote) kama **sehemu ya nyuma inayowezekana ya
akili/tathmini, si utegemezi**. Sehemu za ujumuishaji ni:

- `RoutingEventSink` inaweza kutuma matukio kwa mtathmini kwa njia isiyosawazishwa.
- `MemoryRoutingEventStore` + muhtasari wa ubora humpa mtathmini mtiririko ghafi wa
  maamuzi.
- `Evaluator` ya baadaye (ya kuamuliwa kikamilifu, kihukumu cha ndani, HTTP, WASM) ingetumia
  matukio/ufuatiliaji na kurudisha `QualityScore` inayotumika kwenye njia ileile ya
  `getQualityScore`/kipengele cha ubora.
- Uelekezaji uliopo unaoongozwa na tathmini (`open-sse/services/evalRouting.ts`) tayari
  hupanga upya malengo ya mchanganyiko kwa viwango vya ufaulu vya `eval_runs` unapowezeshwa.

Hakuna tathmini inayoendeshwa kisawazishwa kwenye njia ya ombi, na lango hufanya kazi
kikamilifu bila kuwepo kwa mtathmini.

## 7. Ukaguzi wa mwisho wa usanifu

1. **Ni nini kinachobaki kwenye njia moto iliyosawazishwa?** Uelekezaji/upimaji alama, ukaguzi wa awali wa
   vizuizi vya usalama, utafutaji kwenye kache, na usambazaji mmoja wa `emitRoutingEvent` (~0.12 µs zaidi ya
   upimaji wa msingi) kwenda kwenye sinki za kumbukumbu.
2. **Ni nini kilichohamishwa kwenda kwenye uchakataji usiosawazishwa?** Usafirishaji wa OTel (kipima muda + fetch),
   uhifadhi wa `call_logs`/matumizi, uandishi wa kache ya kisemantiki; ubora uko kwenye kumbukumbu
   na ni O(1) (hauhitaji uchakataji usiosawazishwa).
3. **Matokeo ya uelekezaji yanakuwaje mrejesho?** `handleChatCore` hutoa
   `RoutingEvent` → `QualityTracker` husasisha hali ya EWMA → `getQualityScore`
   hutumika kwenye kipengele cha `quality` cha mchanganyiko otomatiki.
4. **Ubora unaathirije uelekezaji wa baadaye?** Alama ya chini ya ubora hupunguza
   alama yenye uzani ya mtoa huduma/modeli hiyo kwenye `scoreAutoTargets`, hivyo modeli zilizodorora
   hupunguziwa upendeleo hatua kwa hatua na huimarika kadiri EWMA yao inavyoboreka.
5. **Future AGI inaweza kuunganishwaje bila kuwa utegemezi?** Kupitia kiolesura cha
   `RoutingEventSink` / adapta ya `Evaluator` ya baadaye — hakuna utegemezi uliowekwa moja kwa moja kwenye msimbo.
6. **Nini hutokea mtathmini asipopatikana?** Uelekezaji hauathiriki;
   ubora hurudi kwenye thamani isiyoegemea upande wowote (1.0) kwa modeli zisizo na ishara iliyobainika.
7. **Nini hutokea telemetria isipatikane?** Sinki ya OTel haisajiliwi tu;
   sehemu nyingine ya safu ya uelekezaji huendelea kufanya kazi bila mabadiliko.
8. **Nini hutokea wakati wa mzigo kupita kiasi?** Bafa ya OTel huondoa matukio ya zamani zaidi; ubora
   na bafa ya mzunguko zina kikomo kwa muundo; hakuna shinikizo la nyuma.
9. **Hali ya mtoa huduma hurejeaje baada ya kudorora?** EWMA hukaribia tena thamani yake
   kadiri mafanikio yanavyokusanyika; awamu ya awali huweka modeli zisizo na historia katika hali isiyoegemea upande wowote; kivunja saketi
   hupona kivyake kupitia majaribio ya HALF_OPEN.
10. **Ni vipengele gani vilivyopendekezwa ambavyo kwa makusudi HAVIKUTEKELEZWA, na kwa nini?**
    - Trafiki kivuli / majaribio — tayari yametekelezwa
      (`combo/shadowRouting.ts`); hayakujengwa upya.
    - Vizuizi vya usalama — tayari vimetekelezwa (`src/lib/guardrails/`); havikurudiwa.
    - Kache ya kisemantiki — tayari imetekelezwa (`src/lib/semanticCache.ts`); haikurudiwa.
    - Jukwaa kamili la usimamizi wa majaribio, zana za seti za data, jukwaa la uboreshaji wa vidokezo,
      hifadhidata ya vekta, au miundombinu ya nje ya OTel ya lazima — viko nje ya
      wigo wa safu nyepesi ya data.
    - Muundo wa Rust wa `RoutingEvent` — safu ya data ni TypeScript; aina ya TS
      ndiyo toleo sawia lililorekebishwa.

## 8. Marejeleo ya usanidi

| Kigezo                        | Chaguo-msingi | Athari                                                                                           |
| ----------------------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | hakijawekwa   | Kikiwekwa, huwezesha kisafirishaji cha ufuatiliaji cha OTLP/HTTP (k.m. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | hakijawekwa   | Lakabu mbadala ya endpoint ya OTLP.                                                              |
| `OTEL_SERVICE_NAME`           | `omniroute`   | Sifa ya rasilimali ya `service.name`.                                                            |

## 9. Majaribio

- `tests/unit/routing-events.test.ts` — usawazishaji wa matukio, uainishaji wa
  hali, bafa ya pete yenye kikomo, usambazaji kwa sinki nyingi + utengaji.
- `tests/unit/routing-quality.test.ts` — uanzishaji wa EWMA, urejeshaji baada ya kushindwa/kufaulu,
  adhabu za hitilafu, ushughulikiaji wa muda wa 429, snapshot, uwekaji upya.
- `tests/unit/routing-scoring-quality.test.ts` — uadilifu wa uzani, chaguo-msingi
  lisiloegemea upande wowote, upangaji kwa kipengele cha ubora.
- `tests/unit/routing-otel.test.ts` — udhibiti wa uwezeshaji, payload ya span ya GenAI, flush
  isiyosawazishwa, kutupa chini ya mzigo kupita kiasi.
- `tests/unit/routing-events-concurrency.test.ts` — maelfu ya matukio, uwekaji kikomo wa
  bafa ya pete, utengaji wa sinki inayotupa hitilafu, milipuko isiyosawazishwa iliyochanganywa,
  uwekaji upya wakati wa uingizaji.
- `tests/unit/routing-adaptive-e2e.test.ts` — mzunguko bainifu wa mwanzo hadi mwisho kupitia
  kikokotoaji halisi cha `scoreAutoTargets`: nzuri → dhoofika → rejesheka → hitilafu ya muda mfupi, pamoja na
  hali za uanzishaji baridi na mtoa huduma baridi mwenye bahati.
- `tests/unit/stream-timing.test.ts` — TTFT (kipande cha kwanza kilichopelekwa mbele), ITL,
  baiti ya kwanza dhidi ya upelekaji wa kwanza, ukatizaji, usalama wa vipande vilivyoharibika/vitupu.

## 10. Hali ya matatizo yaliyokuwepo awali (Awamu ya 18)

| Tatizo                                                     | Hali                                | Maelezo                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kutolingana kwa export ya `omniglyph`                      | **LIMEREKEBISHWA (kimazingira)**    | `node_modules` haikuwa imelandanishwa na `package-lock.json` (1.3.1 ilikuwa imesakinishwa dhidi ya 1.4.0 iliyofungwa). Kutekeleza `npm install omniglyph@1.4.0` kulirejesha toleo lililofungwa; hitilafu za aina zilipungua hadi 0. Manifest hazikubadilishwa.                |
| Majaribio ya zamani ya `getKnownContextOverflow`           | **LINAJULIKANA — halijarekebishwa** | `combo-context-overflow-compression-probe.test.ts` huingiza function ambayo haipo tena katika `open-sse/services/combo.ts` (maoni pekee ndiyo yanayoirejelea). Kurekebisha kunahitaji kuitekeleza upya au kuandika upya majaribio hayo — mabadiliko ya usanifu yasiyohusiana. |
| Utengaji wa DB wa `combo-runtime-unit-concurrency.test.ts` | **LINAJULIKANA — halijarekebishwa** | Dai la utengaji wa SQLite katika zana ya majaribio hushindwa linapoendeshwa moja kwa moja; hushindwa kwa namna ileile kwenye tawi msingi.                                                                                                                                     |
| Mkengeuko wa i18n `llm.txt`                                | **LINAJULIKANA — halijarekebishwa** | `docs/i18n/*/llm.txt` hutofautiana na mzizi; hili lilikuwepo awali na huzuia kizuizi cha docs-sync cha kabla ya commit.                                                                                                                                                       |

Matatizo ya kimazingira na ya msimbo yanatenganishwa; hakuna kushindwa kusikohusiana kunakofichwa
nyuma ya vichujio vya majaribio vilivyobadilishwa.
