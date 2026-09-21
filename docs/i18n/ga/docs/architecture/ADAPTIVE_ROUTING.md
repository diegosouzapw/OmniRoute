# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Déanann an cháipéis seo cur síos ar an mbunús ródúcháin oiriúnaithigh faoi stiúir aiseolais a cuireadh le
OmniRoute. Tá sé beag d’aon ghnó: tugann sé isteach cainéal clóscríofa do thoradh
ródúcháin, comhartha cáilíochta ar líne a chuireann leis an scórálaí auto-combo atá ann cheana, easpórtálaí
roghnach OpenTelemetry, agus críochphointe inmhínitheachta. **Ní thagann sé**
in ionad na sraithe athléimneachta atá ann cheana (scoradán ciorcaid, tréimhse shuaimhnithe naisc,
frithdhúnadh samhla, maitrís sláinte, uathphíolóta) — comhlánaíonn sé í.

## 1. Comhthéacs ailtireachta

Is plána sonraí é OmniRoute ina bhfuil **conair the iarratais** agus **plána rialaithe/intleachta**.
Ní mór don chonair the fanacht tapa, éifeachtúil ó thaobh cuimhne de, aisioncrónach, athléimneach agus
intuartha. Is leis an bplána rialaithe a bhaineann meastóireacht, scóráil cáilíochta, turgnaimh agus anailís stairiúil.

```
Gníomhaire AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   plána sonraí (tapa, sioncrónach, sa chuimhne)
│  ródú / teipaistriú │
│  sláinte / ráille cosanta │
│  taisce / sruthú    │
└──────────┬──────────┘
           │ RoutingEvent (seol-agus-déan-dearmad, ~0.2µs)
           ▼
┌─────────────────────┐
│  Slogaidí aiseolais │   plána rialaithe (aisioncrónach, iarracht is fearr)
│  rianaire cáilíochta│
│  easpórtálaí OTel   │
│  stór mínithe       │
└──────────┬──────────┘
           ▼  scór cáilíochta
      scórálaí auto-combo
```

### An méid a bhí ann cheana (iniúchta, gan dúbláil)

| Coincheap                                          | Cur chun feidhme atá ann cheana                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Infhaighteacht (an féidir linn trácht a sheoladh?) | Scoradán ciorcaid (CLOSED/DEGRADED/OPEN/HALF_OPEN, marthanaithe sa DB), tréimhse shuaimhnithe naisc, frithdhúnadh samhla |
| Tuairisciú sláinte                                 | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                  |
| Scáth-thrácht                                      | `open-sse/services/combo/shadowRouting.ts`                                                                               |
| Ráillí cosanta                                     | `src/lib/guardrails/` (crúcaí réamh-/iar-)                                                                               |
| Taisce bheacht                                     | `src/lib/semanticCache.ts` (bunaithe ar shíniú)                                                                          |
| Meastóirí / ródú faoi stiúir meastóireachtaí       | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                     |
| Inmhínitheacht cinnidh combo                       | `open-sse/services/combo/decisionTrace.ts`                                                                               |
| Teagmhais fíor-ama an deais                        | `src/lib/events/eventBus.ts` (cainéal fógraí UI, ualaí pála `unknown`, stair 100 iontráil)                               |

Ní athchur chun feidhme ar `eventBus` í an tsraith teagmhas ródúcháin: is é an bus sin
cainéal fógraí fíor-ama an deais (ainmneacha _teagmhas_ clóscríofa, ualaí pála
teimhneacha, tomhaltóirí UI). Is struchtúr _toraidh_ clóscríofa é `RoutingEvent`
(fanacht/comharthaí/costas/toradh/cúis-chríochnaithe) a ídíonn
slogaidí aiseolais an phlána rialaithe (rianaitheoir cáilíochta, easpórtálaí OTel, stór mínithe).

### An méid a bhí in easnamh (curtha leis anseo)

1. **Teagmhas toraidh ródúcháin clóscríofa + astarraingt sloig** (`RoutingEvent` /
   `RoutingEventSink`). Tá `decisionTrace` teoranta do combo agus don chuimhne amháin;
   is cuntair charnacha iad `comboMetrics`; is marthanú amh aisioncrónach é `call_logs`.
   Níl aon cheann díobh ina chainéal toraidh clóscríofa bunaithe ar shlogaidí ar féidir le rianaire cáilíochta, easpórtálaí OTel,
   nó meastóir ar nós Future-AGI liostáil leis.
2. **Comhartha cáilíochta ar líne** (EWMA) do cháilíocht aschuir — roimhe seo, ní dhearna an scórálaí
   ach ionadú do “cháilíocht” trí oiriúnacht statach taisc agus rátaí pasála meastóireachta roghnacha.
3. **Easpórtálaí OTel roghnach, saor ó spleáchais** a úsáideann coinbhinsiúin shéimeantacha GenAI.
4. **Críochphointe inmhínitheachta** a thugann ar ais na fíorchinntí ródúcháin + staid na cáilíochta.

## 2. Teagmhais Ródúcháin (bunús an aiseolais)

Comhaid: `open-sse/services/routing/events.ts`, `.../index.ts`

Ní iompraíonn `RoutingEvent` ach meiteashonraí ródúcháin:

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
  outcome: RoutingOutcome; // aontas ar liosta ceadaithe
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

Is tréith ar nós `Send+Sync` in TypeScript é `RoutingEventSink`:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // caithfidh sé a bheith O(1), gan I/A sioncronach
}
```

Glaonn an chonair the ar `emitRoutingEvent(event)` uair amháin in aghaidh gach iarratais chríochnaithe
(an aisghlao críochnaithe sruthaithe, an chonair ratha neamhshruthaithe, agus an
chonair teipe do 200 míchumtha in `handleChatCore`). Is leathadh amach sioncronach
chuig sloic chláraithe é an dáileadh, ach ní dhéanann gach sloc ach staid sa chuimhne
a chur i scuaine/a nuashonrú. **Níl aon scríobh sioncronach chuig bunachar sonraí
ná aon I/A líonra ar an gconair the.**

Sloic réamhshocraithe:

- `MemoryRoutingEventStore` — maolán fáinne teoranta (500), na cinn is nuaí ar
  dtús, don chríochphointe mínithe.
- Tomhaltóir `QualityTracker` — nuashonraíonn sé meastachán cáilíochta EWMA.
- `OtlpHttpsEventSink` — roghnach, cumasaithe nuair a bhíonn
  `OMNIROUTE_OTEL_ENDPOINT` (nó `OTEL_EXPORTER_OTLP_ENDPOINT`) socraithe.

### Forchostas tomhaiste (comparáid ionraic)

`npm run bench:routing-events` ar an stáisiún oibre seo (100k atriall; tomhaistear
oibríochtaí faoi bhun µs mar µs/op comhiomlán toisc go bhfuil na peircintílí in
aghaidh na hoibríochta faoi thaifeach uaineadóir `performance.now()`):

| Cás                                       | µs/op  | ops/s  |
| ----------------------------------------- | ------ | ------ |
| bonnlíne (scóráil amháin)                 | ~0.045 | ~22 M  |
| bonnlíne + RoutingEvent (2 shloc)         | ~0.168 | ~5.9 M |
| bonnlíne + teagmhas + cur OTel sa scuaine | ~0.163 | ~6.1 M |
| comhthráthach (8 ráig idirfhite)          | ~0.18  | —      |

Is é ~0.12 µs/iarratas an difríocht i ndáileadh teagmhas os cionn na scórála
bonnlíne; ní dhéanann an sloc OTel ach cur i scuaine (brú maoláin O(1)), gan aon
mhéid intomhaiste a chur leis. Baineann na huimhreacha seo go sonrach leis an
meaisín agus is uimhreacha coibhneasta iad — ní ráthaíocht táirgthe iad. Meastachán
comhiomlán ab ea an figiúr "~0.2 µs" in v1; scarann an mhodheolaíocht seo an
bhonnlíne scórála ó chostas dáileacháin na dteagmhas.

## 3. Comhartha Cáilíochta (staid soláthraí atá faoi stiúir aiseolais)

Comhaid: `open-sse/services/routing/quality.ts`

Scarann v2 cáilíocht **oibríochtúil** ó cháilíocht **shéimeantach**:

- **Oibríochtúil** — díorthaithe ón gconair the ródúcháin (HTTP 4xx/5xx, teipeanna
  ceangail, 429anna, freagraí míchumtha, bristí srutha, `finish_reason=length`,
  freagraí rathúla gan aschur, EWMA folaigh/TTFT). NÍ chaitear le 200 mar cháilíocht
  shéimeantach.
- **Séimeantach** — luach iarbhír an aschuir ghinte. Ní tháirgeann ach meastóir
  amháin é riamh trí `setSemanticQuality()`. Bíonn sé `null` go dtí go soláthraíonn
  meastóir é agus ní sceitheann sé isteach sa scór oibríochtúil choíche.

Staid in aghaidh (soláthraí, samhail) (EWMA + áiritheoirí teoranta):

- `successEwma` — EWMA (α=0.2) de rath an toraidh.
- `latencyEwma` / `ttftEwma` — EWMA den fholach (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — cé chomh gairid is atá sé ó breathnaíodh an tsamhail go deireanach.

### Feasacht ar mhuinín / shamplaí

`confidence = clamp01(samples / 50)`, agus déantar an scór a chuirtear ar ais chuig
an scórálaí a chumasc i dtreo an lárphointe neodraigh:

```
score = 0.5 + confidence * (operational - 0.5)
```

Iarmhairtí (deimhnithe ag tástálacha):

- Faigheann soláthraí fuar (0 sampla) scór **0.5** — ní ghearrtar pionós éagórach
  air, ach ní féidir leis ceannas a fháil ar sholáthraí a bhfuil na mílte breathnuithe
  láidre aige.
- Tarraingítear soláthraí a bhfuil 7 rath ámharacha aige i dtreo 0.5 (ní fhaigheann
  sé ceannas riamh mar thoradh ar thúsú dóchasach).
- Tagann soláthraí a bhfuil 50+ sampla aige le chéile lena fhíorscór oibríochtúil.
- Tarlaíonn díghrádú agus téarnamh de réir a chéile (EWMA), agus ní scriosann teip
  aonair scoite soláthraí sláintiúil.

Nochtann `ProviderQuality` `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Cothaíonn sé seo an scórálaí teaglaim uathoibríoch mar an fachtóir scórála `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` in
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Fanann an tsuim ag 1.0.
- Líonann `buildAutoCandidates` `candidate.quality` ón lorgaire; is é **0.5**
  neodrach an réamhshocrú d’iarrthóirí gan sonraí (ní fhaigheann iarrthóir fuar
  borradh ná pionós).

An lúb iata:

```
RoutingEvent → QualityTracker → getQualityScore → fachtóir cáilíochta teaglaim uathoibríoch
      ↑                                                    │
      └────── toradh iarratais (handleChatCore) ←──────────┘
```

### Eisiamh crua i gcoinne pionóis bhoig

Níl sa chomhartha cáilíochta ach **sainrogha bhog oiriúnaitheach**. Fanann eisiamh
crua leis an gcruach athléimneachta atá ann cheana: scoradán ciorcaid OPEN, cuóta
ídithe, teip fíordheimhnithe, frithdhúnadh samhla — ní théann an scór cáilíochta i
bhfeidhm ar aon cheann díobh seo. Má thiteann scór cáilíochta soláthraí go sealadach,
tugtar níos lú tosaíochta dó, ach ní dhíchumasaítear go crua riamh é.

## 3b. Uainiú canónach srutha (TTFT / ITL)

Comhaid: `open-sse/utils/streamTiming.ts`

Is é `createStreamTiming()` an t-aon phointe ionstraimíochta don chonair sruthaithe,
agus tá sé sreangaithe isteach in `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — an chéad smután réamhtheachtach faighte.
- `markForward()` — an chéad smután curtha ar aghaidh chuig an gcliant (úsáidtear é le haghaidh TTFT).
- `markInterrupted()` — teorainn ama/tobscoir/earráid srutha roimh chríochnú glan.
- `ttft()` = aga folaigh an chéad smutáin SSE a cuireadh ar aghaidh. **NÍ TTFT ar leibhéal na ndearbhchomharthaí é seo** —
  féadfaidh náid/dearbhchomhartha amháin/go leor dearbhchomharthaí a bheith in aon smután SSE amháin. Tá sé doiciméadaithe go beacht.
- `avgItlMs()` = meánbhearna idir smutáin (seachthomhas ar aga folaigh smután le haghaidh ITL).

Sreabhann TTFT/ITL/interrupted isteach sa `RoutingEvent` (`ttftMs`, `itlMs`) agus
easpórtálann an glacadóir OTel iad mar thréithe réise GenAI/OmniRoute.

## 4. Inbhraiteacht OpenTelemetry / GenAI

Comhaid: `open-sse/services/routing/otel.ts`

- Easpórtálaí OTLP/HTTP JSON saor ó spleáchais (úsáideann sé `fetch` domhanda, gan
  SDK `@opentelemetry/*`).
- Leanann réisí coinbhinsiúin shéimeantacha GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) mar aon le tréithe ródúcháin
  OmniRoute (toradh, stádas, ttft, atrialacha, cúlteagmhas).
- Ní chuireann `record()` ach míreanna i scuaine i maolán teoranta (O(1)); déanann amadóir cúlra
  folmhú go neamhshioncrónach trí `POST {endpoint}/v1/traces`. Faoi ró-ualach,
  caitear amach na teagmhais is sine (áiritheoir `dropped`) — ní chuirtear frithbhrú ar an
  bplána sonraí riamh.
- **Díchumasaithe mura bhfuil sé cumraithe.** Ní mór `OMNIROUTE_OTEL_ENDPOINT` (nó
  `OTEL_EXPORTER_OTLP_ENDPOINT`) a shocrú; murach sin ní chláraítear an glacadóir
  agus ní ritheann aon chód OTel.

## 5. Inmhínitheacht

- Tugann `GET /v1/explain/routing` na `RoutingEvent`anna is déanaí ar ais (na
  cinntí iarbhír, an ceann is nuaí ar dtús) agus an léargas cáilíochta de réir soláthraí/samhla.
- Is ionann an fíordheimhniú agus fíordheimhniú `/v1/combos` (eochair API Bearer nó seisiún deais; rochtain anaithnid ar
  imscaradh áitiúil aonúsáideora le `REQUIRE_API_KEY=false`).
- Tá rianta in aghaidh agairt ar leibhéal teaglama fós ar fáil tríd an
  `decisionTrace.ts` atá ann cheana (ceanntásc `X-OmniRoute-Combo-Trace`).
- Sábháilteacht: ní bhíonn i dteagmhais ach meiteashonraí ródúcháin, agus ní bhíonn leideanna/coirp/dintiúir iontu riamh.

## 6. Comhtháthú an phlána meastóireachta (ullmhacht do Future AGI)

Caitheann OmniRoute le Future AGI (nó le haon mheastóir) mar **inneall
faisnéise/meastóireachta féideartha, ní mar spleáchas**. Seo iad na pointí comhtháthaithe:

- Is féidir le `RoutingEventSink` teagmhais a chur ar aghaidh chuig meastóir go neamhshioncrónach.
- Tugann `MemoryRoutingEventStore` + an léargas cáilíochta an sruth amh cinntí do mheastóir.
- D’ídeodh `Evaluator` amach anseo (cinntitheach, moltóir áitiúil, HTTP, WASM)
  teagmhais/rianta agus thabharfadh sé `QualityScore` ar ais a chuirfí isteach sa chonair chéanna
  `getQualityScore`/fachtóir cáilíochta.
- Déanann an ródú atá bunaithe ar mheastóireacht cheana (`open-sse/services/evalRouting.ts`)
  spriocanna teaglama a athordú de réir rátaí pasála `eval_runs` nuair atá sé cumasaithe.

Ní ritheann aon mheastóireacht go sioncrónach ar chonair na hiarrata, agus feidhmíonn an geata
go hiomlán gan an meastóir a bheith ann.

## 7. Athbhreithniú deiridh ailtireachta

1. **Cad atá fágtha ar an gconair the shioncrónach?** Ródú/scóráil, réamhsheiceálacha
   ráillí cosanta, cuardach taisce, agus scaipeadh aonair `emitRoutingEvent` (~0.12 µs os cionn
   na scórála bonnlíne) chuig glacadóirí sa chuimhne.
2. **Cad a aistríodh chuig próiseáil neamhshioncrónach?** Easpórtáil OTel (amadóir + fetch),
   marthanú `call_logs`/úsáide, scríbhinní taisce shéimeantaigh; tá an cháilíocht sa chuimhne
   agus O(1) (níl próiseáil neamhshioncrónach ag teastáil).
3. **Conas a dhéantar aiseolas de thoradh ródúcháin?** Astaíonn `handleChatCore`
   `RoutingEvent` → nuashonraíonn `QualityTracker` staid EWMA → cuireann `getQualityScore`
   luach ar fáil don fhachtóir `quality` sa teaglama uathoibríoch.
4. **Conas a théann cáilíocht i bhfeidhm ar ródú amach anseo?** Laghdaíonn scór íseal cáilíochta
   scór ualaithe an tsoláthraí/na samhla sin in `scoreAutoTargets`, ionas go dtugtar
   níos lú tosaíochta de réir a chéile do shamhlacha díghrádaithe agus go dtagann siad chucu féin de réir mar a fheabhsaíonn a EWMA.
5. **Conas is féidir le Future AGI comhtháthú gan bheith ina spleáchas?** Trí chomhéadan
   `RoutingEventSink` / cuibheoir `Evaluator` amach anseo — gan aon
   spleáchas crua-chódaithe.
6. **Cad a tharlaíonn nuair nach bhfuil an meastóir ar fáil?** Ní chuirtear isteach ar an ródú;
   filleann an cháilíocht ar luach neodrach (1.0) do shamhlacha nach bhfuil aon chomhartha breathnaithe acu.
7. **Cad a tharlaíonn nuair nach bhfuil teiliméadracht ar fáil?** Ní chláraítear an glacadóir OTel;
   ritheann an chuid eile den tsraith ródúcháin gan athrú.
8. **Cad a tharlaíonn faoi ró-ualach?** Caitheann an maolán OTel amach na teagmhais is sine; tá an cháilíocht
   agus an maolán fáinne teoranta de réir dearaidh; níl aon fhrithbhrú ann.
9. **Conas a thagann staid soláthraí chuici féin tar éis díghrádaithe?** Athchóineasaíonn EWMA de réir mar a
   charntar rathanna; coimeádann téamh samhlacha fuara neodrach; tagann an scoradán ciorcaid
   chuige féin go neamhspleách trí thóireadóirí HALF_OPEN.
10. **Cé na gnéithe molta nár cuireadh i bhfeidhm d’aon ghnó, agus cén fáth?**
    - Trácht scátha / turgnaimh — curtha i bhfeidhm cheana
      (`combo/shadowRouting.ts`); níor atógadh iad.
    - Ráillí cosanta — curtha i bhfeidhm cheana (`src/lib/guardrails/`); níor dúbláladh iad.
    - Taisce shéimeantach — curtha i bhfeidhm cheana (`src/lib/semanticCache.ts`); níor
      dúbláladh í.
    - Ardán iomlán bainistíochta turgnamh, uirlisí tacair sonraí, ardán optamaithe leideanna,
      bunachar sonraí veicteoirí, nó bonneagar seachtrach éigeantach OTel — lasmuigh de
      raon feidhme do phlána sonraí éadrom.
    - Struchtúr Rust `RoutingEvent` — is TypeScript atá sa phlána sonraí; is é an cineál TS
      an choibhéis oiriúnaithe.

## 8. Tagairt chumraíochta

| Athróg                        | Réamhshocrú | Éifeacht                                                                                        |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | gan socrú   | Nuair a shocraítear í, cumasaítear easpórtálaí rianta OTLP/HTTP (e.g. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | gan socrú   | Ailias cúltaca don chríochphointe OTLP.                                                         |
| `OTEL_SERVICE_NAME`           | `omniroute` | Tréith acmhainne `service.name`.                                                                |

## 9. Tástálacha

- `tests/unit/routing-events.test.ts` — normalú teagmhas, aicmiú stádais,
  maolán fáinne teoranta, leathadh chuig cinn scríbe + aonrú.
- `tests/unit/routing-quality.test.ts` — réamhthéamh EWMA, téarnamh ó theip/rath,
  pionóis aimhrialtachta, láimhseáil neamhbhuan 429, léargas, athshocrú.
- `tests/unit/routing-scoring-quality.test.ts` — sláine meáchain, réamhshocrú
  neodrach, rangú de réir fachtóir cáilíochta.
- `tests/unit/routing-otel.test.ts` — geata cumasaithe, pálasta réise GenAI, sruthlú
  aisioncronach, ligean ar lár faoi ró-ualach.
- `tests/unit/routing-events-concurrency.test.ts` — na mílte teagmhas, teorantacht
  an mhaoláin fáinne, aonrú cinn scríbe a chaitheann earráid, ráigeanna aisioncronacha
  idirmheasctha, athshocrú le linn ionsáite.
- `tests/unit/routing-adaptive-e2e.test.ts` — lúb chinntitheach ó cheann ceann tríd
  an scórálaí iarbhír `scoreAutoTargets`: sláintiúil → meath → téarnamh → corraíl, chomh maith
  le cásanna tosaithe fhuair agus soláthraí fhuair a raibh an t-ádh leis.
- `tests/unit/stream-timing.test.ts` — TTFT (an chéad smután curtha ar aghaidh), ITL,
  an chéad bheart i gcomparáid leis an gcéad chur ar aghaidh, briseadh, sábháilteacht i gcás
  smután míchumtha/folamh.

## 10. Stádas saincheisteanna a bhí ann cheana (Céim 18)

| Saincheist                                           | Stádas                      | Nótaí                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neamhréir easpórtála `omniglyph`                     | **CEARTAITHE (comhshaoil)** | Ní raibh `node_modules` sioncronaithe le `package-lock.json` (1.3.1 suiteáilte vs 1.4.0 faoi ghlas). Le `npm install omniglyph@1.4.0` a rith, athbhunaíodh an leagan faoi ghlas; thit earráidí cineáil go 0. Níor athraíodh na forléirithe.                                                               |
| Tástálacha seanda `getKnownContextOverflow`          | **AR EOLAS — gan cheartú**  | Iompórtálann `combo-context-overflow-compression-probe.test.ts` feidhm nach bhfuil ann a thuilleadh in `open-sse/services/combo.ts` (ní dhéanann ach tráchtanna tagairt di). Chun é seo a cheartú, chaithfí na tástálacha sin a athchur chun feidhme nó a athscríobh — athrú ailtireachta neamhghaolmhar. |
| Aonrú BD in `combo-runtime-unit-concurrency.test.ts` | **AR EOLAS — gan cheartú**  | Teipeann ar dhearbhú aonraithe SQLite an úim tástála nuair a ritear go díreach é; teipeann air ar an mbealach céanna ar an mbrainse bonn.                                                                                                                                                                 |
| Éagsúlacht i18n `llm.txt`                            | **AR EOLAS — gan cheartú**  | Tá `docs/i18n/*/llm.txt` éagsúil ón bhfréamhchomhad; bhí sé seo ann cheana agus cuireann sé bac ar gheata réamh-churtha docs-sync.                                                                                                                                                                        |

Coinnítear saincheisteanna comhshaoil agus saincheisteanna cóid ar leithligh; ní cheiltear
aon teipeanna neamhghaolmhara taobh thiar de scagairí tástála athraithe.
