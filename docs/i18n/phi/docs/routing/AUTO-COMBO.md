# OmniRoute Auto-Combo Engine (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Para sa mga User**: Naghahanap ba ng mabilisang pagsisimula? Tingnan ang [Gabay ng User para sa Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) para sa mga simpleng paliwanag at halimbawa.

> Mga chain ng model na kusang namamahala gamit ang adaptive scoring + zero-config na auto-routing

## Zero-Config na Auto-Routing (`auto/` prefix)

> **BAGO:** Hindi kailangang gumawa ng combo. Direktang gamitin ang `auto/` prefix sa anumang client.

### Mabilisang mga Halimbawa

| Model ID       | Variant | Gawi                                                                                           |
| -------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `auto`         | default | Lahat ng nakakonektang provider, LKGP strategy, balanseng mga weight                           |
| `auto/coding`  | coding  | Quality-first na mga weight, angkop para sa pagbuo ng code                                     |
| `auto/fast`    | fast    | Weighted selection na may mababang latency                                                     |
| `auto/cheap`   | cheap   | Cost-optimized na routing (pinakamababang gastos muna)                                         |
| `auto/offline` | offline | Pinapaboran ang mga provider na may pinakamataas na available na quota                         |
| `auto/smart`   | smart   | Quality-first + mas mataas na exploration rate (10%) para sa mas mahusay na pagtuklas ng model |
| `auto/lkgp`    | lkgp    | Tiyak na LKGP (kapareho ng default na `auto`)                                                  |
| `auto/chaos`   | chaos   | Mga weight para sa fault injection upang subukan ang resilience (chaos engineering)            |

### Komposisyong Category × Tier (`auto/<category>:<tier>`)

Pinaghihiwalay ng mga OpenRouter-style suffix ang **kung anong uri ng route** (category) mula sa **kung paano ito io-optimize** (tier), kaya maaari mong pagsamahin ang mga ito nang malaya (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Mga Category** (sinasala ang candidate pool ayon sa capability): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. Pinananatili ng `vision`/`multimodal` ang mga model na may kakayahang gumamit ng vision; pinananatili ng `reasoning` ang mga reasoning/thinking model.
- **Mga Tier** (pinipili ang mga scoring weight / pool filter): `fast` (ship-fast) · `cheap` (alias na `floor`, cost-saver) · `reliable` (kalagayan ng circuit breaker + katatagan ng latency) · `free` / `pro` (sinasala ang pool ayon sa model tier sa pamamagitan ng `classifyTier` — free-tier kumpara sa premium).

| Halimbawa              | Nagre-resolve sa                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `auto/coding:fast`     | coding pool, mga weight na may mababang latency                                    |
| `auto/coding:cheap`    | coding pool, cost-optimized (alias na `auto/coding:floor`)                         |
| `auto/reasoning:pro`   | mga reasoning/thinking model lamang, premium tier                                  |
| `auto/vision`          | mga model na may kakayahang gumamit ng vision (walang tier → balanseng mga weight) |
| `auto/multimodal:free` | mga model na may kakayahang multimodal, free tier lamang                           |

Ang anumang valid na `auto/<category>[:<tier>]` ay nagre-resolve kapag kinakailangan; isang piniling subset ang ipinapakita sa `/v1/models` at sa dashboard (`AUTO_SUFFIX_VARIANTS` sa `open-sse/services/autoCombo/builtinCatalog.ts`). Ang pag-filter ay **fail-open** — kung walang nakakonektang model na tumutugma sa isang constraint, gagamitin ang buong pool upang hindi kailanman masira ang routing. Hindi binago ang pangunahing scorer (`combo.ts`); inilalapat ang category/tier filter sa `buildAutoCandidates`.

> **Live na model intelligence:** ang pagiging angkop para sa auto-routing ay ginagabayan ng live na mga ranking ng **Arena ELO** + tier data mula sa **models.dev** kapag naka-on ang `ARENA_ELO_SYNC_ENABLED` flag (kung hindi, bumabalik ito sa static fitness map).

**Paano gamitin:**

```bash
# Anumang IDE o CLI tool na sumusuporta sa format ng OpenAI
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# Sa iyong code/config, itakda ang model sa:
model: "auto"                 # balanseng default
model: "auto/coding"          # pinakamahusay para sa mga coding task
model: "auto/fast"            # pinakamabilis na available
model: "auto/cheap"           # pinakamura kada token
```

**Ano ang nangyayari:**

1. Dinedetect ng OmniRoute ang `auto/` prefix sa `src/sse/handlers/chat.ts`
2. Kinukuha mula sa database ang lahat ng **active provider connection**
3. Sinasala ang mga may valid na credential (API key o OAuth token)
4. Tinutukoy ang model para sa bawat connection (`connection.defaultModel` o ang unang model ng provider)
5. Bumubuo ng **virtual combo** sa memory (hindi iniimbak sa DB)
6. Nagra-route gamit ang weight profile ng napiling variant + LKGP strategy

**Mga pangunahing katangian:**

- ✅ **Palaging naka-on:** Walang toggle, hindi kailangang gumawa ng combo, at walang kinakailangang configuration
- ✅ **Dynamic:** Awtomatikong ipinapakita ang kasalukuyang nakakonektang mga provider
- ✅ **Session stickiness:** Tinitiyak ng LKGP na binibigyan ng prayoridad ang huling matagumpay na provider
- ✅ **May kaalaman sa multi-account:** Ang bawat provider connection ay nagiging hiwalay na candidate
- ✅ **Walang pagsusulat sa DB:** Umiiral lamang ang virtual combo para sa request, kaya walang persistence overhead

### Kontrol sa candidate para sa bawat key (#7819, Level 1+2)

Ang `GET /v1/auto-combo/{channel}/candidates` (`{channel}` = ang suffix pagkatapos ng `auto/`, o
ang literal na `auto` para sa base channel) ay isang **read-only** endpoint na naglilista ng
kasalukuyang candidate pool ng isang `auto/*` channel na may kasamang live reachability, gamit muli
ang kasalukuyang mga resilience read (hindi kailanman ang raw na `state` ng breaker):

- provider circuit breaker — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- connection cooldown — `rateLimitedUntil` / `testStatus` sa na-resolve na
  `provider_connections` row
- model lockout — `isModelLocked(provider, connectionId, model)`

Taglay rin ng bawat candidate ang `excluded` flag ng API key na ito. Iniimbak ang mga exclusion
para sa bawat API key (`auto_candidate_overrides` table, migration `128`) — single-tenant ang
OmniRoute at walang `users` table, kaya ang `apiKeyId` ang pinakamalapit na tunay na per-caller
identity — at ipinapatupad ang mga ito sa chokepoint ng candidate pool sa
`open-sse/services/autoCombo/virtualFactory.ts` sa pamamagitan ng pure at unit-tested na
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Ang filter ay **fail-open**: kapwa hinahayaan ng hindi nakatakdang apiKeyId/channel o pagkabigo
ng DB lookup na manatiling hindi naka-filter ang pool, kaya ang isang operator na walang
naka-configure na override ay nakakakita ng routing na byte-identical sa routing bago idagdag ang feature na ito.

**Ipinagpaliban sa isang follow-up na isyu:** mga timbang para sa bawat kandidato + tahasang pagkakasunod-sunod (Antas 3
— ipinapasok sa mga kasalukuyang path ng may-timbang/prayoridad na estratehiya) at pag-pin ng isang partikular na
estratehiyang `combo.ts` para sa bawat channel na `auto/*` (Antas 4). Tingnan ang plano sa #7819 para sa bukas na
tanong kung dapat manatiling para sa bawat API key ang mga override o maging pandaigdigan dahil sa
single-tenant na modelo.

**Sa likod ng mga eksena:**

```txt
Kahilingan: { model: "auto/coding" }
   ↓
Tinutukoy ng src/sse/handlers/chat.ts ang prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool mula sa mga aktibong koneksyon
   ↓
handleComboChat (kaparehong engine ng mga naka-persist na combo)
   ↓
Pinipili ng awtomatikong pagmamarka ang pinakamahusay na provider/model para sa bawat kahilingan
```

**Mga file ng implementasyon:**

| File                                                      | Layunin                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser ng prefix (`parseAutoPrefix`)                          |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Gumagawa ng mga virtual na object na `AutoComboConfig`        |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test hook para sa pag-mock ng registry ng provider            |
| `src/sse/handlers/chat.ts`                                | Integrasyon: maagang pag-short-circuit ng awtomatikong prefix |
| `src/shared/constants/providers.ts`                       | System entry na `SYSTEM_PROVIDERS.auto`                       |

## Mga Pangalan ng Combo na Tumutugma sa Tunay na Model Id

Ang combo na ang `name` ay kapareho ng isang bare model id (hal. combo na
pinangalanang `gpt-5.5`) ay isang **sinadya at suportadong pattern**, hindi bug:
ito ang mekanismo para sa fallback ng provider ayon sa model id na nakadokumento sa
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Dahil sinusuri
ang resolution ng combo bago ang resolution ng bare model id
(`getComboForModel()` sa `src/sse/services/model.ts`), ang isang request para sa bare
id na `gpt-5.5` ay idinadaan sa mga target ng combo (hal.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) sa halip na direkta sa
iisang provider — muli nitong ginagamit ang combo-before-rewrite precedence na ginawa para sa
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) at
sinusuri laban sa regression ng `tests/unit/responses-combo-resolution-3227.test.ts` at
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Ang paggawa o pagpapalit ng pangalan ng combo sa pangalang nagtatakip sa isang tunay na model id ay
**hindi kailanman tinatanggihan** — masisira ng pagtanggi rito ang nakadokumentong workflow. Sa halip
(#8530), naglalakip ang `POST /api/combos` at `PUT /api/combos/[id]` ng hindi nakahahadlang na
`warning` field sa response kapag sumasalungat ang (bagong) pangalan sa isang tunay na
model id:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Sa pag-boot, nagla-log din ang `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) ng isang linyang `[STARTUP]` warning na
naglilista sa bawat umiiral na combo na nagtatakip sa isang model id, upang magkaroon ng
senyales ang mga operator na aksidenteng nakatagpo nito (sa halip na sinadya, ayon sa #6940).
Matatagpuan ang detection helper sa `src/lib/combos/modelNameCollision.ts`.

## Pagtawag sa Custom na Combo Mula sa Client

Ginagamit lamang ang mga naka-persist na combo (Settings → Combos) kapag ipinadala ng client ang **eksaktong pangalan** ng combo sa `model` field — walang malabo o bahagyang pagtutugma sa pangalan ng combo, at walang kasangkot na `auto/` prefix. Pagkakasunod-sunod ng resolution (`getComboForModel()` sa `src/sse/services/model.ts`):

1. eksaktong pagtutugma sa pangalan ng combo (`model: "my-combo"`),
2. `combo/<name>` prefix (`model: "combo/my-combo"`),
3. mga model→combo glob mapping (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dalawang karaniwang problema:

- **Hindi ginagamit ng `auto` ang iyong mga combo.** Gumagawa ang `auto`/`auto/*` ng sarili nitong zero-config candidate pool at kumokonsulta lamang sa mga naka-persist na combo kung may combo na literal na pinangalanang `auto` (hindi inirerekomenda). Upang mag-route sa pamamagitan ng combo, ipadala ang eksaktong pangalan nito — hindi `auto`.
- **Ang `openrouter/auto` ay isang tunay at may bayad na produkto ng OpenRouter** ("Auto Best Available"), hindi isang alias ng OmniRoute. Ito ang nag-iisang static model entry ng OpenRouter registry (`open-sse/config/providers/registry/openrouter/index.ts`) at hiwalay ang pagsingil dito. Gamitin ang Settings → Routing → Hide paid models upang hindi ito isama sa mga `auto` pool.

Tingnan ang [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) at [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) para sa orihinal na kalituhang nililinaw ng dokumentasyong ito.

## Paano Ito Gumagana (Naka-persist na Mga Auto-Combo)

Dinamikong pinipili ng Auto-Combo Engine ang pinakamahusay na provider/model para sa bawat request gamit ang isang **16-factor scoring function** (tinukoy sa `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Ang kabuuan ng mga default na weight ay `1.0`; muling ninonormalisa ang mga custom na weight ng `normalizeScoringWeights()`. Dalawa sa labing-anim — `cacheAffinity` at `resetWindowAffinity` — ang may default na weight na `0`; ang `reliability` ay may `0` sa `DEFAULT_WEIGHTS` ngunit `0.03` sa mga generic na pack at `0.04` sa `reliability-first`, at ang `quality` ay may `0.02` sa mga pack (`0.03` sa `quality-first`): kinukuwenta pa rin ang mga ito para sa bawat candidate, at kinokontrol ng `cacheAffinity` ang prompt-cache deduplication sa labas ng score, kaya sadyang hindi bumoboto bilang default ang mga factor na may zero-default habang bumoboto naman ang mga pack.

![16-factor scoring ng Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Pinagmulan: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (muling buuin sa pamamagitan ng `npm run docs:render-diagrams`). Makasaysayan ang filename; ipinapakita ng source at na-render na diagram ang lahat ng 16 na factor na idineklara sa `DEFAULT_WEIGHTS`.

| Factor                | Default na Weight | Paglalarawan                                                                                                                                                                                                                                          |
| :-------------------- | :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429            | Natitirang quota / espasyo bago maabot ang rate limit [0..1]                                                                                                                                                                                          |
| `health`              | 0.1605            | Health score mula sa circuit breaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                            |
| `costInv`             | 0.1429            | Kabaligtaran ng **pinagsamang** gastos (60% presyo ng input token + 40% presyo ng output token, na-normalize) — mas mura = mas mataas na score                                                                                                        |
| `latencyInv`          | 0.1143            | Kabaligtaran ng p95 latency na na-normalize sa pool — mas mabilis = mas mataas na score                                                                                                                                                               |
| `taskFit`             | 0.0762            | Pagiging angkop sa uri ng gawain (coding, review, planning, analysis, debugging, docs)                                                                                                                                                                |
| `stability`           | 0.0476            | Stability na batay sa variance mula sa standard deviation ng latency — mas mababa ang score ng candidate na pabagu-bago ang response time                                                                                                             |
| `tierPriority`        | 0.0476            | Priyoridad ng account tier — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                             |
| `tierAffinity`        | 0.0476            | Affinity sa pagitan ng tier ng candidate at ng tier na inirerekomenda ng manifest                                                                                                                                                                     |
| `specificityMatch`    | 0.0476            | Pagtutugma sa pagitan ng specificity ng request (hint ng manifest) at tier ng model                                                                                                                                                                   |
| `contextAffinity`     | 0.0476            | Affinity sa pagitan ng pangangailangan ng request sa context window at ng context window ng model                                                                                                                                                     |
| `sessionAvailability` | 0.0476            | Availability ng OAuth session ng candidate connection para sa session na ito (`getOAuthSessionAvailability()`; may score na 1.0 ang mga non-OAuth na connection)                                                                                      |
| `connectionDensity`   | 0.0476            | Ipinamamahagi ang load sa mga connection ng parehong provider (laban sa konsentrasyon)                                                                                                                                                                |
| `cacheAffinity`       | 0.00              | Rendezvous-hash affinity patungo sa connection na pinakamalamang na mayroon na ng prompt-cache prefix ng request na ito (`open-sse/services/combo/promptCacheAffinity.ts`); naka-disable bilang default (#8008)                                       |
| `resetWindowAffinity` | 0.00              | Pagkiling sa mga connection na may mas kanais-nais na window ng pag-reset ng quota (naka-disable bilang default)                                                                                                                                      |
| `quality`             | 0.03              | Signal ng kalidad ng output na hinihimok ng feedback mula sa quality tracker ng routing event; nakatatanggap ng neutral na 0.5 ang mga candidate na walang observation                                                                                |
| `reliability`         | 0.00              | Naobserbahang bahagi ng tagumpay, `1 - failureRate`, mula sa 24h ng history ng paggamit sa likod ng minimum na sampung sample (real-time metrics kung hindi); itinuturing na 1.0 ang mga candidate na walang observation. Naka-disable bilang default |

**Kabuuan:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` gaya ng idineklara sa `DEFAULT_WEIGHTS`; muling ninonormalisa ang mga weight na kino-configure ng user upang maging isang distribution ng `normalizeScoringWeights()` bago ang scoring.

## Mga Mode Pack

6 na paunang tinukoy na profile ng timbang sa `open-sse/services/autoCombo/modePacks.ts`. Ganap na pinapalitan ng bawat pack ang mga default na timbang upang ikiling ang pagpili tungo sa isang layunin. Ang kabuuan ng bawat pack ay `1.0` na (`0.9999` kapag ipinakita sa apat na decimal), kaya walang makabuluhang kailangang itama ang `normalizeScoringWeights()` kapag aktibo ang isang pack — ang mga value sa ibaba, maliban sa rounding, ang ginagamit ng scorer.

| Salik                 | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Mga Tala:

- **Kasama sa mga pack ang `quality` at `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) at ganap na pinapalitan ang weight map (`weights = pack`, hindi merge). Taglay ng `DEFAULT_WEIGHTS` ang `quality 0.03 / reliability 0`; kapag pinili ang `balanced`/`default`, mananatili ang mga default na iyon, samantalang kapag pinili ang isang pack, gagamitin ang mga value nito sa itaas. Sa isang cold pool (wala pang mga obserbasyon, kaya `quality 0.5` at `reliability 1`), nagdaragdag ang dalawang salik na ito ng `+0.04` sa isang generic na pack (`0.03 + 0.01`), `+0.045` sa `quality-first`, at `+0.05` sa `reliability-first`.
- Tahasang `0` ang `tierAffinity`, `specificityMatch`, at `resetWindowAffinity` sa bawat pack.
- Buod ng binibigyang-diin ng bawat pack:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (mga malusog na koneksiyong mababa ang latency)
  - **cost-saver** → costInv 0.3324 (pinakamurang mga token ang mananaig)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, ang pinakamataas sa lahat ng pack (pinakamahusay na modelo para sa gawain, pare-pareho)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (pinakamalaking headroom anuman ang bilis/gastos)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, ang pinakamataas sa lahat ng pack (pinakakaunting hindi inaasahang pangyayari)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profile para sa fault injection)

### Mga Kontrol Kada Request (mga header) — #6023 / #6024 / #6025 / #3470

Maaaring kontrolin ang isang `auto` combo **sa bawat request** sa pamamagitan ng tatlong header, nang hindi binabago ang
naka-store na config ng combo. Nalalapat lamang ang mga ito sa `auto` strategy at sa request lamang
na naglalaman ng mga ito; ginagamit ang naka-save na `modePack`/`budgetCap`/`budgetFallback` ng combo
kapag wala ang header.

| Header                        | Tinatanggap                                                                                                                                                                                    | Epekto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | isang preset alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) o isang raw pack name (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Ino-override ang mga scoring weight para sa request na ito. Pinipilit ng `balanced`/`default` ang mga default na weight (walang pack). Binabalewala ang mga hindi kilalang value (pinananatili ang config).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `X-OmniRoute-Budget`          | isang positibong numero (maximum na USD bawat request)                                                                                                                                         | Mahigpit na limitasyon sa gastos: ang mga kandidatong lumalampas dito ang tinatayang gastos ay sinasala bago ang pagpili. Ang mangyayari kapag lumampas dito ang **bawat** kandidato ay kinokontrol ng `X-OmniRoute-Budget-Fallback` sa ibaba.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (default, mga alias: `cheapest-viable`, `soft`) o `strict` (mga alias: `block`, `hard`)                                                                                             | `cheapest`: bumabalik sa kandidatong pinakamura sa kabuuan kahit lumalampas pa rin ito sa limitasyon (dating gawi). `strict`: tumatangging pumili — agad na nabibigo ang request na may `HTTP 402` sa halip na tahimik na lumampas sa badyet. Binabalewala ang mga hindi kilalang value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Effort`          | `auto` (nakalaan ang ibang mga value)                                                                                                                                                          | Agpang na badyet sa pag-iisip: kapag **walang** reasoning field sa anumang anyo (`reasoning_effort`, `reasoning`, `thinking`) ang request, nireresolba ng gateway ang `auto` bilang `low`/`medium`/`high` mula sa mga deterministikong signal ng hugis ng request (haba ng huling mensahe ng user, laki ng konteksto hanggang sa huling mensahe ng user, mga naunang resulta ng tool, lalim ng tool loop). Saklaw lamang ng mga signal ang kasalukuyang turn — binabalewala ang lahat pagkatapos ng huling mensahe ng user — kaya nireresolba sa parehong antas ang bawat request sa isang tool loop (stateless na per-turn pin, walang session state, walang pagtaas sa gitna ng loop na makasisira sa mga upstream na prefix ng prompt cache). Palaging nangingibabaw ang tahasang reasoning field ng client. Saklaw lamang ito ng mga request na ang upstream dispatch ay nireresolba sa anyong OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — ang `reasoning_effort` ay isang field na may anyong OpenAI, kaya walang epekto ang header sa request na naka-target sa Claude o Gemini (tingnan ang `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Pilitin ang pinakamabilis na profile, limitahan ang kahilingang ito sa $0.05, at mahigpit na i-block sa halip na lumampas sa badyet
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Ang resolution ay isang pure function (`open-sse/services/autoCombo/requestControls.ts`); ang mga
na-resolve na value ay ipinapasa sa mga umiiral na input na `config.modePack` / `config.budgetCap` /
`config.budgetFallback` ng engine. Itinatakda ng naka-store na `config.budgetFallback` ("strict" |
"cheapest") ng isang combo ang persistent policy; ino-override ito ng header para sa iisang request.

## Lahat ng Estratehiya sa Pag-route

Sinusuportahan ng combo engine ng OmniRoute ang **19 na estratehiya sa pag-route** (idineklara sa `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Ang mismong Auto Combo engine ay makukuha sa ilalim ng estratehiyang `auto`; ang iba ay magagamit para sa mga naka-persist na combo.

| Estratehiya         | Paglalarawan                                                                                                                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Nakaayos na listahan ng unang target na may tahasang priyoridad                                                                                                                                                                        |
| `weighted`          | May-timbang na random na pagpili batay sa timbang ng bawat target                                                                                                                                                                      |
| `round-robin`       | Paikuting daanan ang mga target ayon sa pagkakasunod-sunod                                                                                                                                                                             |
| `context-relay`     | Ipasa ang konteksto sa iba't ibang target (mahahabang pag-uusap)                                                                                                                                                                       |
| `fill-first`        | Punuin ang quota ng bawat target bago lumipat sa susunod                                                                                                                                                                               |
| `p2c`               | Random na pagbabalanse ng load gamit ang power-of-2-choices                                                                                                                                                                            |
| `random`            | Pantay-pantay na random na pagpili                                                                                                                                                                                                     |
| `least-used`        | Piliin ang target na may pinakamababang kasalukuyang load                                                                                                                                                                              |
| `cost-optimized`    | Bawasan sa pinakamababa ang $ bawat request batay sa pagpepresyo sa catalog                                                                                                                                                            |
| `reset-aware` ⭐    | Magtakda ng priyoridad batay sa oras ng pag-reset ng quota — mas mataas ang ranggo ng maiikling reset window                                                                                                                           |
| `reset-window`      | Piliin ang mga target na pinakamalapit nang ma-reset ang quota window                                                                                                                                                                  |
| `headroom`          | Piliin ang target na may pinakamaraming natitirang puwang sa quota                                                                                                                                                                     |
| `strict-random`     | Random na pagpili nang walang pag-aalis ng mga pag-uulit                                                                                                                                                                               |
| `auto`              | Gamitin ang Auto Combo scoring (16 na salik) — **inirerekomenda**                                                                                                                                                                      |
| `lkgp`              | Last-Known-Good Path (pinananatili sa huling matagumpay na provider, pagkatapos ay bumabalik sa mga panuntunan kung kailangan)                                                                                                         |
| `context-optimized` | Piliin ang target na pinakaangkop sa kasalukuyang laki ng konteksto                                                                                                                                                                    |
| `cache-optimized`   | Muling ayusin ang mga target ayon sa affinity sa prompt cache — unang sinusubukan ang koneksiyong pinakamalamang na nagtataglay na ng naka-cache na prefix ng request na ito (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Magpadala sa isang panel ng mga modelo nang sabay-sabay, pagkatapos ay bumuo ng isang sagot sa pamamagitan ng isang tagahatol (tingnan sa ibaba)                                                                                       |
| `pipeline`          | Patakbuhin ang mga target nang sunod-sunod, na ipinapasa ang output ng bawat hakbang bilang input ng susunod na hakbang; ang panghuling sagot lamang ang ibinabalik (#6396)                                                            |

⭐ = Bago sa v3.8.0 · 🧬 = Bago sa v3.8.36

### Semantika ng `weighted`

Ang `weighted` ay isang **proporsyonal na random na pagpili sa bawat request**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), hindi isang equalizer:

- Sa bawat request, pumipili ng **isang** hakbang na may probabilidad na `weight / totalWeight`; ang mga natitirang hakbang
  ay inaayos ayon sa pababang timbang bilang fallback chain para sa request na iyon.
- Ang isang hakbang na may timbang na `0` (o walang timbang) ay **hindi kailanman pinipili** habang may iba pang hakbang na
  may timbang > 0 — maaari lamang itong magsilbing fallback kapag nabigo ang napiling hakbang. Kapag **lahat** lamang ng
  timbang ay 0, nagiging pantay-pantay ang pagpili.
- Ang mga hakbang na ang lahat ng target ay hindi available — provider circuit breaker na `OPEN`, cooldown ng koneksiyon,
  lockout ng modelo — ay inaalis sa pagpipilian bago isagawa ang pagpili
  (`open-sse/services/combo/targetResolution.ts`), kaya maaaring pansamantalang mapili sa bawat request ang nag-iisang maayos na hakbang.
- Ang `stickyWeightedLimit` (combo config, default na `1` = naka-off) ay nagpapanatili sa napiling hakbang para sa ganoong
  karaming magkakasunod na tagumpay bago muling pumili.

Para sa mahigpit na pag-ikot, gamitin ang `round-robin`; ang magkakapantay na timbang sa `weighted` ay nagbibigay ng estadistikal — hindi
mahigpit — na balanse.

## Estratehiya ng Fusion

Ang `fusion` ang nag-iisang estratehiya na **hindi** pumipili ng iisang target. Ipinapadala nito ang prompt
sa **bawat modelo sa panel nang sabay-sabay**, pagkatapos ay isang nako-configure na **judge model** ang bumubuo
ng iisang panghuling sagot mula sa lahat ng tugon ng panel. Inangkop mula sa upstream na `decolua/9router`
(disenyo ng Fusion ng OpenRouter); nasa `open-sse/services/fusion.ts` ang implementasyon.

Paano ito gumagana:

0. **Pag-bypass kapag may tool** — ang isang request na may hindi bakanteng `tools` array at
   `tool_choice` na hindi tahasang `"none"` ay lubusang lumalaktaw sa panel: direktang niruruta ito sa
   iisang modelo (ang naka-configure na judge, o `panel[0]`) habang ipinapasa ang `tools`/`tool_choice`
   nang walang pagbabago. Walang access sa tool ang mga miyembro ng panel, at hindi hinihikayat ng
   synthesis directive ng judge ang paglalabas ng tool call, kaya nakakakuha ang mga agentic/tool-calling
   client ng tunay na desisyon sa tool call sa halip na binuong prosa (#6771).
1. **Fan-out** (para lamang sa mga request na walang tool) — ipinapadala nang sabay-sabay ang prompt sa bawat modelo
   sa panel, sapilitang hindi naka-stream at inaalis ang mga tool (kailangan ng judge ang kumpletong
   prosa upang makabuo ng sagot).
2. **Pangongolekta gamit ang quorum-grace** — sa sandaling dumating ang `minPanel` na mga sagot, magsisimula ang isang maikling grace
   timer para sa mga nahuhuli, pagkatapos ay magpapatuloy ang fusion gamit ang anumang nakolekta.
   Nililimitahan nito ang epekto ng pinakamabagal na modelo sa kabuuang oras, na saklaw ng isang mahigpit na timeout.
3. **Synthesis ng judge** — ginagawang anonymous ang mga sagot ng panel (`Source 1`, `Source 2`, … — upang
   timbangin ng judge ang nilalaman, hindi ang brand ng modelo) at ibinibigay sa judge, na sumusuri sa
   pagkakasundo / mga kontradiksyon / bahagyang saklaw / mga natatanging insight / mga hindi napansing aspeto, at pagkatapos ay
   sumusulat ng **isang** mapagkakatiwalaang sagot. Pinananatili ng call sa judge ang orihinal na
   `stream` flag + tools ng client, kaya gumagana pa rin ang streaming at paggamit ng tool sa downstream.
4. **Maayos na degradation** — 0 sagot mula sa panel → `503`; eksaktong 1 natitirang sagot → direktang ibinabalik
   ang sagot na iyon (walang pagsasamahin); direktang sumasagot ang panel na may iisang modelo.

Maaari ring maging `combo-ref` step ang isang miyembro ng panel (`{kind: "combo-ref", comboName: "..."}`) na tumutukoy
sa isa pang combo — nireresolba ito bilang **isang black-box na boses ng panel** (isang buong recursive dispatch papunta sa
tinukoy na combo, hindi isang fan-out sa sariling mga target ng combo na iyon), na may kaparehong proteksyon laban sa lalim/cycle
na ginagamit na ng bawat iba pang estratehiyang gumagamit ng combo-ref (#6764).

### Configuration

Kino-configure sa `config` blob ng combo (walang schema migration — muli nitong ginagamit ang umiiral na
`combos` table):

| Field                                    | Type     | Default               | Layunin                                                                                                 |
| :--------------------------------------- | :------- | :-------------------- | :------------------------------------------------------------------------------------------------------ |
| `config.judgeModel`                      | `string` | unang modelo sa panel | Modelong bumubuo ng panghuling sagot                                                                    |
| `config.fusionTuning.minPanel`           | `number` | `2`                   | Mga matagumpay na sagot na kailangan bago magsimula ang grace timer (nililimitahan sa `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                | Tagal ng paghihintay sa mga nahuhuli kapag naabot na ang quorum                                         |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`               | Ganap na limitasyon upang hindi mapatigil ng isang nakabitin na modelo ang request                      |

Nasa `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`) ang mga default.

### Halimbawa

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Pagkatapos, tawagin ito tulad ng anumang combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtual na Pabrika ng Auto-Combo

Hindi nangangailangan ang Auto Combo engine ng mga paunang itinakdang combo. Sa halip, bumubuo ang `open-sse/services/autoCombo/virtualFactory.ts` ng mga kandidato habang tumatakbo:

1. Kinukuha ang `getProviderConnections({ isActive: true })` (lahat ng naka-enable na koneksyon)
2. Sinasala ang mga may wastong kredensyal (API key o hindi pa nag-expire na OAuth token sa pamamagitan ng `hasUsableOAuthToken()`)
3. Ikinukumpara sa `getProviderRegistry()` para sa availability ng modelo + pagpepresyo
4. Para sa bawat tuple na `(provider, model, connection)`, bumubuo ng `VirtualAutoComboCandidate`
5. Pinipili ang `connection.defaultModel` (o ang unang modelo ng registry) bilang target ng dispatch
6. Binibigyan ng score ang bawat kandidato gamit ang 16-factor na `scorePool()` at weight pack ng variant
7. Ibinabalik ang nabuong in-memory na `AutoComboConfig` para sa `handleComboChat()` — hindi kailanman sine-save sa DB

Nangangahulugan ito na **ang pagdaragdag ng bagong provider na naka-enable ang `auto/*` ay awtomatikong nagpapalawak sa candidate pool** — hindi kailangan ang manu-manong pag-edit ng combo. Muling binubuo ang virtual combo sa bawat request, kaya agad na nasasama ang mga bagong idinagdag o bagong naging maayos na koneksyon.

## Sariling Pag-aayos

- **Pansamantalang pagbubukod**: Score < 0.2 → ibinubukod nang 5 min (progresibong backoff, max 30 min)
- **Kaalaman sa circuit breaker**: OPEN → awtomatikong ibinubukod; HALF_OPEN → mga probe request
- **Incident mode**: >50% OPEN → i-disable ang exploration, i-maximize ang stability
- **Pagbawi pagkatapos ng cooldown**: Pagkatapos ng pagbubukod, ang unang request ay isang "probe" na may pinaikling timeout

## Bandit Exploration

5% ng mga request (maaaring i-configure) ang niruruta sa mga random na provider para sa exploration. Naka-disable ito sa incident mode.

## API

**Walang nakalaang `POST /api/combos/auto` endpoint** — ginagamit ang Auto-Combo sa dalawang paraan:

1. **Zero-config (inirerekomenda):** Magpadala ng anumang chat completion request na may `model: "auto"` o `model: "auto/<variant>"`. Binubuo ng virtual factory ang combo sa bawat request — walang persistence at walang kinakailangang API call.

2. **Naka-save na combo na may `strategy: "auto"`:** Gumawa ng regular na combo sa pamamagitan ng `POST /api/combos` at itakda ang `strategy: "auto"` kasama ang `config.auto.weights` / `config.auto.candidatePool`. Ginagamit ang parehong scoring engine; sine-save ang combo sa `combos` at maaari itong gamiting muli sa pamamagitan ng ID.

Para sa discovery, inililista ng `GET /api/combos/auto` ang bawat variant kasama ang na-resolve nitong candidate pool at ang `context_length` / `max_output_tokens` — ang MAX sa lahat ng window ng candidate pool. Dapat i-advertise ng mga client (hal. ang opencode plugin) ang mga value na ito sa halip na `0`: ganap na dini-disable ng zero na context ang auto-compaction ng opencode, kaya patuloy na lumalaki ang mga session hanggang sirain ng history purge ng gateway ang context. Ligtas i-advertise ang MAX dahil niruruta ng context pre-filter ng auto-combo ang malalaking request sa mga kandidatong may malalaking window.

```bash
# Paggamit ng zero-config (walang paggawa ng combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Naka-save na auto combo sa pamamagitan ng regular na combos endpoint
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Mga strategy ng auto router

Maaaring itakda ng mga naka-save na combo na may `strategy: "auto"` ang `config.routerStrategy` (o ang legacy na
`config.auto.routerStrategy`) sa isa sa mga sumusunod:

- `rules` — default na weighted scoring
- `score` — pinipili ang pinakamataas na naka-configure na weighted score. Sa eksaktong tabla, pinananatili ang naka-configure na
  pagkakasunod-sunod ng mga kandidato; kumukuha ang umiiral na `explorationRate` ng sample mula sa buong ranked pool.
- `cost` / `eco` — pinakamurang maayos na provider
- `latency` / `fast` — pinakamababang p95 latency na may reliability penalty
- `sla-aware` / `sla` — binibigyang-priyoridad ang mga kandidatong nakatutugon sa p95 latency, error-rate, at opsyonal na
  cost SLOs
- `lkgp` — inuuna ang huling provider na nalamang maayos

### Detalyadong paliwanag ng mga router strategy

Nagbibigay ang auto-combo engine ng 6 na naisasaksak na implementasyon ng **RouterStrategy** na
maaari mong palitan sa pamamagitan ng `config.routerStrategy` (o ng legacy na `config.auto.routerStrategy`).
Pumipili ang bawat strategy ng isang provider mula sa candidate pool, batay sa isang `RoutingContext`
(uri ng task, mga pahiwatig tungkol sa tool/vision, pagtataya ng token, opsyonal na SLA policy, opsyonal na
huling provider na nalamang maayos).

#### 1. `rules` (default) — 16-factor na weighted scoring

Binabalot ang umiiral na scoring engine. Sinasala ang mga kandidatong may `OPEN` na circuit-breaker,
pagkatapos ay pinapatakbo ang `scorePool()` gamit ang kasalukuyang uri ng task at `getTaskFitness()`,
at pinipili ang provider na may pinakamataas na score.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Kailan gagamitin**: Default. Gamitin kapag nais mo ng balanseng trade-off sa lahat ng signal.

**Alias**: `rules` (walang alias)

---

#### 2. `cost` / `eco` — pinakamurang maayos na provider

Inaayos ang candidate pool ayon sa `costPer1MTokens` (pataas) at pinipili ang pinakamura.
Sinasala muna ang mga kandidatong `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kailan gagamitin**: Mga workload na sensitibo sa gastos, batch processing, o mga background job.

**Mga alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` — pinakamababang p95 latency na may reliability penalty

Nagsa-sort ayon sa `p95LatencyMs + (errorRate * 1000)`. Tinitiyak ng parusa sa rate ng error na
mas mababa ang ranggo ng mga hindi maaasahang provider kahit mababa ang kanilang nominal na latency.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kailan gagamitin**: Mga workload na sensitibo sa latency, tulad ng real-time na chat, autocomplete, o
mga interactive coding assistant.

**Mga alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — pagsunod sa SLO ng latency/error/gastos

Binibigyan ng score ang bawat kandidato batay sa kung gaano kahusay nitong natutugunan ang naka-configure na patakaran ng SLO:

| Salik              | Timbang | Formula                                           |
| ------------------ | ------- | ------------------------------------------------- |
| Score ng latency   | 35%     | `threshold / max(value, ε)`                       |
| Score ng error     | 35%     | `threshold / max(value, ε)`                       |
| Score ng kalusugan | 15%     | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Score ng gastos    | 10%     | `threshold / max(value, ε)` o inverse normalized  |
| Score ng stability | 5%      | inverse normalized latency stddev                 |

Kapag `hardConstraints: true`, pangunahing isinasaayos ang mga kandidato ayon sa **score ng paglabag**
(kung gaano nila nilalampasan ang anumang SLO), at pagkatapos ay ayon sa composite score. Kung hindi, ang
composite score lamang ang ginagamit.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... binibigyan ng score ang bawat kandidato ayon sa patakaran: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Mga field ng SLA** (itakda sa combo config):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Kailan gagamitin**: Mga production workload na may mahigpit na budget para sa latency, rate ng error, o gastos.

**Mga alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — unahin ang huling kilalang mahusay na provider

Sinusubukan muna ang **huling kilalang mahusay na provider** (kung nakatakda), pagkatapos ay gumagamit ng
`rules` strategy bilang fallback. Kapaki-pakinabang para sa session stickiness — iisang provider ang humahawak
sa mga follow-up request sa isang pag-uusap.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Gamitin ang rules strategy bilang fallback
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kailan gagamitin**: Mga multi-turn na pag-uusap kung saan nais mong iisang provider ang humawak sa
mga follow-up request (hal., para sa caching, pagpapanatili ng konteksto, o pagkakapare-pareho ng pagpepresyo).

**Alias**: `lkgp` (walang alias)

---

### Mga custom na router strategy

Maaari mong i-register ang sarili mong implementation ng `RouterStrategy` sa pamamagitan ng pampublikong API:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Ilagay rito ang iyong routing logic
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Pagkatapos, gamitin ito:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Gabay sa pagpili ng router strategy

| Gamit               | Strategy    | Dahilan                                            |
| ------------------- | ----------- | -------------------------------------------------- |
| Balanseng workload  | `rules`     | Default — isinasaalang-alang ang lahat ng salik    |
| Bawasan ang gastos  | `cost`      | Palaging pinipili ang pinakamura                   |
| Bawasan ang latency | `latency`   | Pinipili ang pinakamabilis na maaasahang provider  |
| Mahihigpit na SLO   | `sla-aware` | Sinasala ayon sa mga threshold ng p95/error/gastos |
| Multi-turn na chat  | `lkgp`      | Session stickiness                                 |

Mga field na SLA-aware:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Kaangkupan sa Gawain

30+ modelo ang binigyan ng marka sa 6 na uri ng gawain (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Sinusuportahan ang mga wildcard pattern (hal., `*-coder` → mataas na marka sa coding).

## Buod ng mga Auto Variant

Kasama ang payak na `auto` (default) at ang 6 na value ng `AutoVariant` na idineklara sa `autoPrefix.ts`, mayroong **7 model ID na maaaring gamitin**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(Ang `AutoVariant` mismo ay naglilista ng 6 na value; ang ika-7 opsyon ay "walang variant" — ang payak na `auto` — na pinangangasiwaan ng `parseAutoPrefix()` bilang `variant: undefined`.)

## Paano umaangkop ang mga tier sa Auto-Combo

Itinuturing ng 16-factor scoring function (`open-sse/services/autoCombo/scoring.ts`) ang pagiging kabilang sa isang tier bilang dalawang signal: `tierPriority` (0.0476) at `tierAffinity` (0.0476). Tingnan ang kanonikal na [talahanayan ng mga scoring factor](#how-it-works-persisted-auto-combos) sa itaas para sa kumpletong hanay ng `DEFAULT_WEIGHTS` — nakalista sa talahanayang "Weight profiles per pack" ang mga override para sa bawat pack (ship-fast/cost-saver/quality-first/
offline-friendly).

Hindi **awtomatikong** inuuna ng tier lamang ang Tier 1 — kung hindi maganda ang latency ng Tier 1 o hindi pinakamainam ang ugnayan ng gastos at kalidad, mananaig ang Tier 2. Upang ipilit ang pagkakasunod-sunod ng mga tier, gamitin ang combo strategy na `priority` at ayusin ang mga provider ayon sa tier.

Upang lubos na paboran ang Tier 1 (subscription), dagdagan ang bigat ng `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Tingnan ang `docs/marketing/TIERS.md` para sa mga depinisyon ng tier at klasipikasyon ng provider.

## Pagsubok at Saklaw

### Deterministikong matrix ng desisyon sa pagruruta (`npm run test:combo:matrix`)

Pinatutunayan ng `tests/integration/combo-matrix/*.test.ts` ang **desisyon** sa pagruruta ng lahat ng 19 na pampublikong strategy mula simula hanggang dulo sa pamamagitan ng tunay na combo pipeline na may mock na upstream.
Kabilang sa saklaw ang:

- Lahat ng 19 na strategy ng `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (internal) mula simula hanggang dulo: pagiging patas ng DRR + pagbaba ng priyoridad dahil sa saturation sa pamamagitan ng tunay na seam na `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Saklaw ng universal handoff ng `context-relay` sa bawat bilang ng target.

Tumatakbo ang suite na ito sa CI (`test:integration` job) gamit ang `--test-concurrency=1` at `--test-force-exit` upang maging deterministiko ito at hindi mangailangan ng mga aktuwal na credential.

### Gated live smoke (HINDI nasa CI — mga tunay na provider)

| Command                                | Ano ang ginagawa nito                                                                                       |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Tunay na in-process na pagruruta gamit ang `RUN_COMBO_LIVE=1`; kumukuha ng snapshot ng live na OmniRoute DB |
| `npm run test:combo:live:vps`          | Mga HTTP call laban sa live na OmniRoute server (itakda ang `COMBO_LIVE_BASE_URL`)                          |
| `npm run test:combo:live:vps:failover` | Pareho, ngunit may mga sinasadyang senaryo ng failover                                                      |

Sinusubukan ng mga smoke test na ito ang tunay na wire path (combo → provider → completion). Sadyang hindi isinasama ang mga ito sa CI dahil nangangailangan ang mga ito ng mga aktuwal na credential at access sa VPS.

---

## Mga File

| File                                                      | Layunin                                                                                                         |
| :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16-factor na scoring function, `DEFAULT_WEIGHTS`, pool norm                                                     |
| `open-sse/services/autoCombo/taskFitness.ts`              | Lookup ng pagiging angkop ng model × gawain                                                                     |
| `open-sse/services/autoCombo/engine.ts`                   | Lohika ng pagpili, bandit, limitasyon sa badyet                                                                 |
| `open-sse/services/autoCombo/selfHealing.ts`              | Pagbubukod, mga probe, incident mode                                                                            |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 na profile ng timbang (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser ng prefix na `auto/` + 6 na variant                                                                      |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Bumubuo ng in-memory na `AutoComboConfig` mula sa mga live na koneksyon                                         |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test hook para sa pag-mock ng provider registry                                                                 |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 na strategy)                                                                      |
| `src/sse/handlers/chat.ts`                                | Integrasyon: auto-prefix short-circuit                                                                          |
