# Adaptive Routing: Routing Events, Quality Feedback & Explainability (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

මෙම ලේඛනය OmniRoute වෙත එක් කරන ලද ප්රතිපෝෂණ-මෙහෙයවන අනුවර්තනීය මාර්ගගත කිරීමේ පදනම විස්තර කරයි. එය හිතාමතාම කුඩා පරාසයක තබා ඇත: එය ටයිප් කළ මාර්ගගත කිරීමේ ප්රතිඵල නාලිකාවක්, පවතින auto-combo ලකුණුකරණයට දත්ත සපයන මාර්ගගත තත්ත්ව සංඥාවක්, විකල්ප OpenTelemetry නිර්යාතකයක් සහ පැහැදිලි කිරීමේ හැකියාව සපයන අන්ත ලක්ෂ්යයක් හඳුන්වා දෙයි. එය පවතින ප්රත්යස්ථතා තොගය (circuit breaker, connection cooldown, model lockout, health matrix, autopilot) **ප්රතිස්ථාපනය නොකරයි** — එයට අනුපූරක වේ.

## 1. වාස්තු විද්යාත්මක සන්දර්භය

OmniRoute යනු **ඉල්ලීම් උණුසුම් මාර්ගයක්** සහ **පාලන/බුද්ධි තලයක්** සහිත දත්ත තලයකි. උණුසුම් මාර්ගය වේගවත්, මතක-කාර්යක්ෂම, අසමමුහුර්ත, ප්රත්යස්ථ සහ පුරෝකථනය කළ හැකි ලෙස පැවතිය යුතුය. ඇගයීම, තත්ත්ව ලකුණුකරණය, අත්හදා බැලීම් සහ ඓතිහාසික විශ්ලේෂණය පාලන තලයට අයත් වේ.

```
AI නියෝජිතයා / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   දත්ත තලය (වේගවත්, සමමුහුර්ත, මතකය තුළ)
│  මාර්ගගත කිරීම / අසාර්ථකවීම් මාරුව │
│  සෞඛ්යය / ආරක්ෂක සීමාව │
│  හැඹිලිය / ප්රවාහනය  │
└──────────┬──────────┘
           │ RoutingEvent (යවා-අමතක කරන්න, ~0.2µs)
           ▼
┌─────────────────────┐
│  ප්රතිපෝෂණ ග්රාහක │   පාලන තලය (අසමමුහුර්ත, හැකි උපරිමයෙන්)
│  තත්ත්ව හඹායන්නා   │
│  OTel නිර්යාතකය    │
│  පැහැදිලි කිරීමේ ගබඩාව │
└──────────┬──────────┘
           ▼  තත්ත්ව ලකුණ
      auto-combo ලකුණුකරණය
```

### දැනටමත් පැවති දේ (විගණනය කරන ලදී, අනුපිටපත් නොකරන ලදී)

| සංකල්පය                                   | පවතින ක්රියාත්මක කිරීම                                                                               |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ලබාගත හැකි බව (අපට ගමනාගමනය යැවිය හැකිද?) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB තුළ සුරකින), connection cooldown, model lockout  |
| සෞඛ්ය වාර්තාකරණය                          | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                              |
| ඡායා ගමනාගමනය                             | `open-sse/services/combo/shadowRouting.ts`                                                           |
| ආරක්ෂක සීමා                               | `src/lib/guardrails/` (පෙර/පසු hooks)                                                                |
| නිශ්චිත හැඹිලිය                           | `src/lib/semanticCache.ts` (signature-පාදක)                                                          |
| ඇගයුම්කාරක / ඇගයීම්-මෙහෙයවන මාර්ගගත කිරීම | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                 |
| Combo තීරණ පැහැදිලි කිරීමේ හැකියාව        | `open-sse/services/combo/decisionTrace.ts`                                                           |
| උපකරණ පුවරුවේ තත්ය කාලීන සිදුවීම්         | `src/lib/events/eventBus.ts` (UI දැනුම්දීම් නාලිකාව, `unknown` payloads, ඇතුළත් කිරීම් 100ක ඉතිහාසය) |

මාර්ගගත කිරීමේ සිදුවීම් ස්තරය `eventBus` හි නැවත ක්රියාත්මක කිරීමක් **නොවේ**: එම bus එක උපකරණ පුවරුවේ තත්ය කාලීන දැනුම්දීම් නාලිකාවයි (ටයිප් කළ _සිදුවීම් නම්_, අපැහැදිලි payloads, UI පරිභෝජකයන්). `RoutingEvent` යනු පාලන තලයේ ප්රතිපෝෂණ ග්රාහකයන් (තත්ත්ව හඹායන්නා, OTel නිර්යාතකය, පැහැදිලි කිරීමේ ගබඩාව) විසින් පරිභෝජනය කරන ටයිප් කළ _ප්රතිඵල_ ව්යුහයකි (ප්රමාදය/tokens/පිරිවැය/ප්රතිඵලය/අවසන්-කිරීමේ-හේතුව).

### නොතිබුණු දේ (මෙහි එක් කරන ලදී)

1. **ටයිප් කළ මාර්ගගත කිරීමේ ප්රතිඵල සිදුවීමක් + ග්රාහක වියුක්තකරණයක්** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` යනු combo වෙත සීමා වූ සහ මතකය තුළ පමණක් පවතින්නකි;
   `comboMetrics` යනු සමුච්චිත ගණක වේ; `call_logs` යනු අමු අසමමුහුර්ත ස්ථායී ගබඩාකරණයකි.
   තත්ත්ව හඹායන්නෙකුට, OTel නිර්යාතකයකට හෝ Future-AGI-ශෛලියේ ඇගයුම්කාරකයකට දායක විය හැකි
   ටයිප් කළ, ග්රාහක-පාදක ප්රතිඵල නාලිකාවක් ඒ කිසිවක් නොවේ.
2. ප්රතිදාන තත්ත්වය සඳහා **මාර්ගගත තත්ත්ව සංඥාවක්** (EWMA) — මීට පෙර ලකුණුකරණය "තත්ත්වය"
   සඳහා ආදේශක ලෙස භාවිත කළේ ස්ථිතික කාර්ය යෝග්යතාව සහ තෝරා-සක්රීය කරන ඇගයීම් සමත් වීමේ අනුපාත පමණි.
3. GenAI අර්ථකථන සම්මුතීන් භාවිත කරන **විකල්ප, පරායත්තතා-රහිත OTel නිර්යාතකයක්**.
4. සැබෑ මාර්ගගත කිරීමේ තීරණ + තත්ත්ව තත්ත්වය ආපසු ලබා දෙන **පැහැදිලි කිරීමේ හැකියාව සපයන අන්ත ලක්ෂ්යයක්**.

## 2. මාර්ගගත කිරීමේ සිදුවීම් (ප්රතිපෝෂණ පදනම)

ගොනු: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` එකක ඇත්තේ මාර්ගගත කිරීමේ පාර-දත්ත පමණි:

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
  outcome: RoutingOutcome; // අවසර ලත් union එක
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` යනු TypeScript තුළ `Send+Sync`-ආකාරයේ trait එකකි:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) විය යුතුය, සමමුහුර්ත I/O නොතිබිය යුතුය
}
```

සම්පූර්ණ වූ සෑම ඉල්ලීමකටම hot path එක `emitRoutingEvent(event)` එක් වරක් අමතයි
(streaming-completion callback එක, non-streaming සාර්ථක මාර්ගය සහ
`handleChatCore` තුළ malformed-200 අසාර්ථක මාර්ගය). ලියාපදිංචි කළ sinks වෙත යැවීම සමමුහුර්ත fan-out
ක්රමයට සිදු වුවද, සෑම sink එකක්ම කරන්නේ පෝලිමකට එක් කිරීම/මතකය තුළ ඇති තත්ත්වය යාවත්කාලීන කිරීම පමණි. **hot path එක මත
සමමුහුර්ත දත්ත සමුදා ලිවීම් හෝ ජාල I/O නොමැත.**

පෙරනිමි sinks:

- `MemoryRoutingEventStore` — explain endpoint එක සඳහා, සීමා කළ (500)
  ring buffer එකක්; නවතම ඒවා පළමුව.
- `QualityTracker` පාරිභෝගිකයා — EWMA තත්ත්ව ඇස්තමේන්තුව යාවත්කාලීන කරයි.
- `OtlpHttpsEventSink` — විකල්පයකි; `OMNIROUTE_OTEL_ENDPOINT`
  (හෝ `OTEL_EXPORTER_OTLP_ENDPOINT`) සකසා ඇති විට පමණක් සබල වේ.

### මනින ලද අමතර වියදම (අවංක සැසඳීම)

මෙම වැඩපොළේ `npm run bench:routing-events` (පුනරාවර්තන 100k; එක් මෙහෙයුමකට අදාළ ප්රතිශතක
`performance.now()` කාලමාපක විභේදනයට වඩා පහළ බැවින්, sub-µs මෙහෙයුම්
සමස්ත µs/op ලෙස මනින ලදී):

| අවස්ථාව                                   | µs/op  | ops/s  |
| ----------------------------------------- | ------ | ------ |
| මූලික මට්ටම (ලකුණු කිරීම පමණි)            | ~0.045 | ~22 M  |
| මූලික මට්ටම + RoutingEvent (sinks 2ක්)    | ~0.168 | ~5.9 M |
| මූලික මට්ටම + event + OTel පෝලිම්ගත කිරීම | ~0.163 | ~6.1 M |
| සමගාමී (අන්තර්මිශ්ර bursts 8ක්)           | ~0.18  | —      |

මූලික ලකුණු කිරීමට සාපේක්ෂව event-dispatch වෙනස ~0.12 µs/request වේ; OTel sink එක
කරන්නේ පෝලිම්ගත කිරීම පමණි (O(1) buffer push), එබැවින් මැනිය හැකි කිසිවක් එකතු නොකරයි. මෙම සංඛ්යා
යන්ත්රයට විශේෂිත සහ සාපේක්ෂ ඒවාය — නිෂ්පාදන සහතිකයක් නොවේ. v1 හි "~0.2 µs"
අගය සමස්ත ඇස්තමේන්තුවක් විය; මෙම ක්රමවේදය මූලික ලකුණු කිරීම
event-dispatch වියදමෙන් වෙන් කරයි.

## 3. තත්ත්ව සංඥාව (ප්රතිපෝෂණය මගින් මෙහෙයවන සැපයුම්කරුගේ තත්ත්වය)

ගොනු: `open-sse/services/routing/quality.ts`

v2 විසින් **මෙහෙයුම්මය** තත්ත්වය **අර්ථමය** තත්ත්වයෙන් වෙන් කරයි:

- **මෙහෙයුම්මය** — routing hot path එකෙන් ව්යුත්පන්න වේ (HTTP 4xx/5xx, සම්බන්ධතා
  අසාර්ථක වීම්, 429s, විකෘති ප්රතිචාර, stream බාධා, `finish_reason=length`,
  ප්රතිදානය-ශූන්ය සාර්ථක වීම්, latency/TTFT EWMA). 200 ප්රතිචාරයක් අර්ථමය
  තත්ත්වය ලෙස නොසලකයි.
- **අර්ථමය** — ජනනය කළ ප්රතිදානයේ සත්ය වටිනාකම. මෙය නිපදවන්නේ
  evaluator එකක් විසින් `setSemanticQuality()` හරහා පමණි. එකක් ලබා දෙන තුරු එය `null` වන අතර
  කිසිවිටෙක මෙහෙයුම්මය ලකුණට කාන්දු නොවේ.

එක් එක් (provider, model) යුගලය සඳහා තත්ත්වය (EWMA + සීමා කළ ගණක):

- `successEwma` — ප්රතිඵල සාර්ථකත්වයේ EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — latency හි EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — model එක අවසන් වරට නිරීක්ෂණය කර කොපමණ මෑතකදීද යන්න.

### විශ්වාසනීයත්වය / නියැදි පිළිබඳ දැනුවත්භාවය

`confidence = clamp01(samples / 50)`, සහ scorer වෙත ආපසු ලබා දෙන ලකුණ
මධ්යස්ථ මධ්ය ලක්ෂ්යය දෙසට මිශ්ර කරනු ලැබේ:

```
score = 0.5 + confidence * (operational - 0.5)
```

ප්රතිවිපාක (පරීක්ෂණ මගින් තහවුරු කර ඇත):

- cold provider කෙනෙකුට (නියැදි 0ක්) ලැබෙන්නේ **0.5**කි — අසාධාරණ ලෙස දඬුවම් නොලබන නමුත්,
  ස්ථාවර නිරීක්ෂණ දහස් ගණනක් ඇති provider කෙනෙකු අභිබවා යා නොහැක.
- වාසනාවන්ත සාර්ථකත්ව 7ක් ඇති provider කෙනෙකු 0.5 දෙසට ඇදෙයි (සුභවාදී
  ආරම්භක අගයකින් කිසිවිටෙක ප්රමුඛ නොවේ).
- නියැදි 50+ ඇති provider කෙනෙකුගේ ලකුණ එහි සැබෑ මෙහෙයුම්මය ලකුණ වෙත අභිසාරී වේ.
- පිරිහීම සහ ප්රකෘතිමත් වීම ක්රමිකය (EWMA), තනි හුදෙකලා අසාර්ථක වීමක්
  සෞඛ්ය සම්පන්න provider කෙනෙකු විනාශ නොකරයි.

`ProviderQuality` මගින් `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` නිරාවරණය කරයි.

මෙය `quality` ලකුණු කිරීමේ සාධකය ලෙස auto-combo scorer වෙත සැපයේ:

- `open-sse/services/autoCombo/scoring.ts` තුළ
  `ScoringFactors.quality` / `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. එකතුව 1.0 ලෙස පවතී.
- `buildAutoCandidates` විසින් tracker වෙතින් `candidate.quality` පුරවයි; දත්ත
  නොමැති candidates පෙරනිමියෙන් මධ්යස්ථ **0.5** ලෙස සලකයි (cold candidate එකක් උසස් කිරීම හෝ
  දඬුවම් කිරීම සිදු නොවේ).

සංවෘත චක්රය:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo quality factor
      ↑                                                    │
      └────── request outcome (handleChatCore) ←────────────┘
```

### දැඩි බැහැර කිරීම එදිරිව මෘදු දඬුවම

තත්ත්ව සංඥාව යනු **මෘදු අනුවර්තන මනාපයක්** පමණි. දැඩි බැහැර කිරීම
දැනට පවතින resilience stack එක සතුවම පවතී: circuit breaker OPEN, quota අවසන් වීම,
auth අසාර්ථක වීම, model lockout — මේ කිසිවකට තත්ත්ව ලකුණ බලපාන්නේ නැත.
තත්ත්ව ලකුණ තාවකාලිකව පහළ යන provider කෙනෙකුට ලැබෙන මනාපය අඩු වන අතර,
කිසිවිටෙක සම්පූර්ණයෙන් අක්රිය නොකරයි.

## 3b. සම්මත ප්රවාහ කාලනය (TTFT / ITL)

ගොනු: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` යනු ප්රවාහ මාර්ගය සඳහා වන එකම උපකරණකරණ සන්ධිය වන අතර,
එය `createSSEStream` (`open-sse/utils/stream.ts`) වෙත සම්බන්ධ කර ඇත:

- `markByte()` — upstream වෙතින් ලැබුණු පළමු chunk එක.
- `markForward()` — සේවාලාභියා වෙත යොමු කළ පළමු chunk එක (TTFT සඳහා භාවිත වේ).
- `markInterrupted()` — නිසි ලෙස අවසන් වීමට පෙර සිදු වූ ප්රවාහ timeout/abort/error තත්ත්වයක්.
- `ttft()` = ඉදිරියට යැවූ පළමු SSE chunk එකේ ප්රමාදය. **මෙය token මට්ටමේ TTFT නොවේ** —
  එක් SSE chunk එකක tokens ශුන්යයක්/එකක්/බොහොමයක් තිබිය හැක. මෙය නිවැරදිව ලේඛනගත කර ඇත.
- `avgItlMs()` = chunks අතර සාමාන්ය කාල පරතරය (ITL සඳහා chunk-ප්රමාද ප්රතිනිධියක්).

TTFT/ITL/interrupted අගයන් `RoutingEvent` (`ttftMs`, `itlMs`) වෙත ගලා යන අතර,
OTel sink මඟින් GenAI/OmniRoute span attributes ලෙස නිර්යාත කරනු ලැබේ.

## 4. OpenTelemetry / GenAI නිරීක්ෂණ හැකියාව

ගොනු: `open-sse/services/routing/otel.ts`

- පරායත්තතා-රහිත OTLP/HTTP JSON exporter එකක් (ගෝලීය `fetch` භාවිත කරයි,
  `@opentelemetry/*` SDK නොවේ).
- Spans, GenAI semantic conventions (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) සහ OmniRoute routing
  attributes (ප්රතිඵලය, තත්ත්වය, ttft, නැවත උත්සාහ, fallback) අනුගමනය කරයි.
- `record()` සිදු කරන්නේ සීමිත buffer එකකට පෝලිම්ගත කිරීම පමණි (O(1)); පසුබිම් timer එකක්
  `POST {endpoint}/v1/traces` හරහා අසමමුහුර්තව flush කරයි. අධිභාරයක් යටතේ
  පැරණිතම events ඉවත් කරනු ලැබේ (`dropped` counter එක) — data
  plane එකට කිසිවිටෙකත් backpressure යොදන්නේ නැත.
- **වින්යාස කර නොමැති නම් අක්රියයි.** `OMNIROUTE_OTEL_ENDPOINT` (හෝ
  `OTEL_EXPORTER_OTLP_ENDPOINT`) සකසා තිබිය යුතුය; එසේ නොමැති නම් sink එක
  ලියාපදිංචි නොවන අතර කිසිදු OTel කේතයක් ක්රියාත්මක නොවේ.

## 5. පැහැදිලි කළ හැකි බව

- `GET /v1/explain/routing` මඟින් මෑතකාලීන `RoutingEvent`s (සත්ය
  තීරණ, නවතම ඒවා පළමුව) සහ එක් එක් provider/model සඳහා වන quality snapshot එක ලබා දෙයි.
- සත්යාපනය `/v1/combos` ආකාරයටම ක්රියා කරයි (Bearer API key එකක් හෝ dashboard session එකක්;
  `REQUIRE_API_KEY=false` සහිත single-user local deployments සඳහා නිර්නාමික ප්රවේශය).
- Combo මට්ටමේ, එක් එක් invocation සඳහා වන traces, දැනට පවතින
  `decisionTrace.ts` (`X-OmniRoute-Combo-Trace` header එක) හරහා දිගටම ලබාගත හැක.
- ආරක්ෂාව: events තුළ routing metadata පමණක් අඩංගු වන අතර, prompts/bodies/credentials කිසිවිටෙකත් අඩංගු නොවේ.

## 6. ඇගයීම් තල ඒකාබද්ධ කිරීම (Future AGI සූදානම)

OmniRoute විසින් Future AGI (හෝ ඕනෑම evaluator එකක්) **විභව
බුද්ධිමය/ඇගයීම් backend එකක් ලෙස සලකනු ලබන අතර, පරායත්තතාවක් ලෙස නොසලකයි**. ඒ සඳහා වන සන්ධි:

- `RoutingEventSink` එකකට events අසමමුහුර්තව evaluator එකක් වෙත යොමු කළ හැක.
- `MemoryRoutingEventStore` + quality snapshot එක මඟින් evaluator එකකට අමු
  තීරණ ප්රවාහය ලබා දෙයි.
- අනාගත `Evaluator` එකක් (deterministic, local judge, HTTP, WASM) විසින්
  events/traces පරිභෝජනය කර, එම
  `getQualityScore`/quality-factor මාර්ගයටම සපයන `QualityScore` එකක් ආපසු ලබා දෙනු ඇත.
- දැනට පවතින eval-මඟින් මෙහෙයවන routing (`open-sse/services/evalRouting.ts`) සක්රීය කළ විට,
  `eval_runs` pass-rates අනුව combo targets දැනටමත් නැවත අනුපිළිවෙළගස්වයි.

කිසිදු evaluation එකක් request path එක මත සමමුහුර්තව ක්රියාත්මක නොවන අතර,
evaluator එක නොමැතිවද gateway එක සම්පූර්ණයෙන් ක්රියාත්මක වේ.

## 7. අවසාන ගෘහනිර්මාණ සමාලෝචනය

1. **සමමුහුර්ත hot path එකේ ඉතිරිව ඇත්තේ කුමක්ද?** Routing/scoring, guardrail
   පූර්ව පරීක්ෂා, cache lookup සහ in-memory sinks වෙත එක් `emitRoutingEvent` fan-out එකක්
   (මූලික scoring එකට සාපේක්ෂව ~0.12 µs).
2. **අසමමුහුර්ත සැකසීම වෙත මාරු කළේ කුමක්ද?** OTel export (timer + fetch),
   `call_logs`/usage persistence, semantic-cache writes; quality එක in-memory
   සහ O(1) වේ (async අවශ්ය නොවේ).
3. **Routing ප්රතිඵලයක් feedback බවට පත්වන්නේ කෙසේද?** `handleChatCore` විසින්
   `RoutingEvent` එකක් නිකුත් කරයි → `QualityTracker` විසින් EWMA state එක යාවත්කාලීන කරයි →
   `getQualityScore` විසින් auto-combo `quality` factor එකට අගය සපයයි.
4. **Quality එක අනාගත routing සඳහා බලපාන්නේ කෙසේද?** අඩු quality score එකක්
   `scoreAutoTargets` තුළ එම provider/model එකේ බරිත score එක අඩු කරයි; එම නිසා පිරිහුණු
   models ක්රමයෙන් අඩු ප්රමුඛතාවකට පත් වන අතර, ඒවායේ EWMA වැඩිදියුණු වන විට යළි ප්රකෘතිමත් වේ.
5. **Future AGI පරායත්තතාවක් නොවී ඒකාබද්ධ වන්නේ කෙසේද?** `RoutingEventSink`
   interface එක / අනාගත `Evaluator` adapter එකක් හරහාය — hardcoded
   පරායත්තතාවක් නොමැත.
6. **Evaluator එක නොලැබෙන විට කුමක් සිදුවේද?** Routing එකට බලපෑමක් නැත;
   නිරීක්ෂිත signal එකක් නොමැති models සඳහා quality එක මධ්යස්ථ අගයට (1.0) fallback වේ.
7. **Telemetry නොලැබෙන විට කුමක් සිදුවේද?** OTel sink එක සරලවම
   ලියාපදිංචි නොවේ; routing layer එකේ ඉතිරි කොටස් කිසිදු වෙනසක් නොමැතිව ක්රියාත්මක වේ.
8. **අධිභාරයක් යටතේ කුමක් සිදුවේද?** OTel buffer එක පැරණිතම events ඉවත් කරයි; quality
   සහ ring buffer එක සැලසුමෙන්ම සීමා කර ඇත; backpressure නොමැත.
9. **පිරිහීමකින් පසු provider state එක යළි ප්රකෘතිමත් වන්නේ කෙසේද?** සාර්ථකත්වයන්
   එකතු වන විට EWMA යළි අභිසාරී වේ; warmup මඟින් cold models මධ්යස්ථව තබයි; circuit breaker එක
   HALF_OPEN probes හරහා ස්වාධීනව ප්රකෘතිමත් වේ.
10. **යෝජිත විශේෂාංග අතරින් හිතාමතාම ක්රියාත්මක නොකළේ මොනවාද, සහ ඒ ඇයි?**
    - Shadow traffic / experiments — දැනටමත් ක්රියාත්මක කර ඇත
      (`combo/shadowRouting.ts`); නැවත ගොඩනැඟුවේ නැත.
    - Guardrails — දැනටමත් ක්රියාත්මක කර ඇත (`src/lib/guardrails/`); අනුපිටපත් කළේ නැත.
    - Semantic cache — දැනටමත් ක්රියාත්මක කර ඇත (`src/lib/semanticCache.ts`); අනුපිටපත්
      කළේ නැත.
    - සම්පූර්ණ experiment-management platform එකක්, dataset tooling, prompt-optimization
      platform එකක්, vector DB එකක්, හෝ අනිවාර්ය බාහිර OTel යටිතල පහසුකම් — සැහැල්ලු data plane එකක
      විෂය පථයෙන් බැහැරය.
    - Rust `RoutingEvent` struct එකක් — data plane එක TypeScript වේ; TS type එක
      අනුවර්තනය කළ සමානකමයි.

## 8. වින්යාස යොමුව

| විචල්යය                       | පෙරනිමිය    | බලපෑම                                                                               |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | සකසා නැත    | සකසා ඇති විට, OTLP/HTTP traces exporter සක්රීය කරයි (උදා. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | සකසා නැත    | OTLP endpoint සඳහා විකල්ප alias එකකි.                                               |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name` resource attribute එකයි.                                             |

## 9. පරීක්ෂණ

- `tests/unit/routing-events.test.ts` — event normalization, status
  classification, සීමා කළ ring buffer, sink fan-out + isolation.
- `tests/unit/routing-quality.test.ts` — EWMA warmup, failure/success recovery,
  anomaly penalties, 429 transient handling, snapshot, reset.
- `tests/unit/routing-scoring-quality.test.ts` — weight integrity, neutral
  default, quality factor ranking.
- `tests/unit/routing-otel.test.ts` — enable gating, GenAI span payload, async
  flush, overload යටතේ drop කිරීම.
- `tests/unit/routing-events-concurrency.test.ts` — event දහස් ගණනක්, ring
  buffer boundedness, throwing-sink isolation, interleaved async bursts,
  insert කිරීම් අතරතුර reset කිරීම.
- `tests/unit/routing-adaptive-e2e.test.ts` — සැබෑ
  `scoreAutoTargets` scorer හරහා deterministic end-to-end loop එකක්: healthy → degrade → recover → blip, සහ
  cold-start හා lucky-cold-provider scenarios.
- `tests/unit/stream-timing.test.ts` — TTFT (පළමුව forward කළ chunk එක), ITL,
  first-byte එදිරිව first-forward, interruption, malformed/empty chunk safety.

## 10. පෙර සිට පැවති ගැටලුවල තත්ත්වය (Phase 18)

| ගැටලුව                                                | තත්ත්වය                           | සටහන්                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` export නොගැළපීම                           | **නිවැරදි කරන ලදී (පාරිසරික)**    | `node_modules`, `package-lock.json` සමඟ සමමුහුර්තව නොතිබුණි (ස්ථාපිත 1.3.1 එදිරිව lock කළ 1.4.0). `npm install omniglyph@1.4.0` ධාවනය කිරීමෙන් lock කළ අනුවාදය යළි ස්ථාපිත විය; type errors 0 දක්වා අඩු විය. Manifests වෙනස් නොකළේය.                                                      |
| කල් ඉකුත් වූ `getKnownContextOverflow` පරීක්ෂණ        | **දන්නා කරුණකි — නිවැරදි කර නැත** | `combo-context-overflow-compression-probe.test.ts`, `open-sse/services/combo.ts` තුළ තවදුරටත් නොපවතින function එකක් import කරයි (එය සඳහන් වන්නේ comments තුළ පමණි). මෙය නිවැරදි කිරීමට එම පරීක්ෂණ යළි ක්රියාත්මක කිරීම හෝ යළි ලිවීම අවශ්ය වේ — මෙය අදාළ නොවන වාස්තු විද්යාත්මක වෙනස්කමකි. |
| `combo-runtime-unit-concurrency.test.ts` DB isolation | **දන්නා කරුණකි — නිවැරදි කර නැත** | සෘජුව ධාවනය කරන විට test-harness SQLite-isolation assertion එක අසමත් වේ; base branch එකේද එලෙසම අසමත් වේ.                                                                                                                                                                                 |
| i18n `llm.txt` drift                                  | **දන්නා කරුණකි — නිවැරදි කර නැත** | `docs/i18n/*/llm.txt`, root එකෙන් වෙනස් වේ; මෙය පෙර සිට පැවති අතර docs-sync pre-commit gate එක අවහිර කරයි.                                                                                                                                                                                |

පාරිසරික සහ code ගැටලු වෙන් වෙන්ව තබා ඇත; වෙනස් කළ test filters
පසුපස අදාළ නොවන අසාර්ථකවීම් කිසිවක් සඟවා නැත.
