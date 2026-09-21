# Cost & Spend Tracking (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Paano tinatantiya, itinatala, at iniuulat ng OmniRoute ang gastos ng bawat request — at kung bakit ang
numero sa dashboard ay isang **tagasubaybay ng natitipid**, hindi isang singil.

Tingnan din: [Gabay ng User](./USER_GUIDE.md) · [Gallery ng mga Feature](./FEATURES.md)

---

## Ano ito (at ano ang hindi nito ginagawa)

Nagtatalaga ang OmniRoute ng gastos sa USD sa bawat request para sa bawat completion sa pamamagitan ng pag-multiply ng bilang
ng mga token sa mga rate ng pagpepresyo ng isang model. Ang mga numerong ito ang ginagamit ng **Costs** dashboard, ng
`omniroute cost` / `omniroute usage` CLI, ng mga CSV/JSON export, at ng mga budget para sa bawat API key.

> **Ang "gastos" sa dashboard ay isang tagasubaybay ng natitipid, hindi isang singil.** Hindi ka kailanman sinisingil ng OmniRoute
> — niruruta nito ang iyong mga request sa mga provider na naikonekta mo na (ang sarili mong
> mga subscription, free tier, at API key). Ang "$290 kabuuang gastos" na ganap na naipon sa mga libreng
> model ay nangangahulugang humigit-kumulang **$290 ang _hindi_ mo ibinayad** sa isang may-bayad na API. Ang halagang ito ay isang _pagtatantiya_
> ng magiging gastos para sa parehong traffic batay sa mga karaniwang list price, upang makita mo kung saan
> nakatuon ang iyong paggamit at kung magkano ang natitipid mo sa pag-route sa mga mas mura/libreng provider.

Direktang nakasaad ang paliwanag na ito sa [README](../../README.md) ng proyekto ("ang
'gastos' sa dashboard ay isang tagasubaybay ng natitipid, hindi isang singil").

Dahil pagtatantiya ang numero:

- Nakadepende ito sa pricing table na mayroon ang OmniRoute para sa bawat model. Ang isang model na walang pricing
  entry ay nag-aambag ng `0` na gastos (ipinapakita ito bilang row na "Legacy / Free" sa explorer).
- Nagkakaroon pa rin ng _tinatantiyang_ gastos ang traffic mula sa free tier at subscription — ito ang
  halagang natitipid mo, hindi halagang dapat bayaran.

---

## Paano tinatantiya ang mga gastos

### Ang pinagmulan ng pagpepresyo

Nagmumula ang mga gastos sa isang pricing table na tinutukoy ayon sa sumusunod na pagkakasunod-sunod ng priyoridad
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Mga override ng user** — mga presyong itinakda mo sa dashboard / sa pamamagitan ng `PATCH /api/pricing`.
2. **Naka-sync na external pricing** — kinukuha mula sa pampublikong
   `model_prices_and_context_window.json` ng LiteLLM kapag naka-enable ang sync (iniimbak sa hiwalay na
   `pricing_synced` namespace upang hindi nito kailanman ma-overwrite ang iyong mga override).
3. **Mga hardcoded na default** — kasama sa OmniRoute.

Ang external pricing sync ay **opt-in** at naka-disable bilang default. Mga nauugnay na env var
(tingnan ang [`.env.example`](../../.env.example)):

| Env var                 | Default   | Layunin                                                                                                 |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | I-enable ang background na LiteLLM pricing sync sa startup.                                             |
| `PRICING_SYNC_INTERVAL` | `86400`   | Interval ng sync sa **segundo** (araw-araw bilang default).                                             |
| `PRICING_SYNC_SOURCES`  | `litellm` | Listahan ng mga source na pinaghihiwalay ng kuwit (`litellm` lamang ang sinusuportahan sa kasalukuyan). |

### Ang formula ng gastos

Kinakalkula ang gastos para sa bawat request mula sa bilang ng mga token at mga rate sa bawat isang milyong token sa
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Mga input token** (ibinawas ang mga cache read at cache-creation token) × `input` rate.
- **Mga cache-read token** × `cached` rate (gagamitin ang input rate bilang fallback).
- **Mga cache-creation token** × `cache_creation` rate (gagamitin ang input rate bilang fallback).
- **Mga output token** × `output` rate.
- **Mga reasoning token** × `reasoning` rate (gagamitin ang output rate bilang fallback).

Itinuturing ang lahat ng rate bilang USD sa bawat 1,000,000 token. Naglalapat ang Codex "fast"/"priority" o
"flex" service tier ng cost multiplier (`getCodexFastCostMultiplier`) — hal., sinisingil ang flex
nang may 50% diskuwento sa mga token, na ipinapakita bilang **flex savings** sa dashboard.

Nino-normalize muna ang mga pangalan ng model (inaalis ang mga provider-path prefix gaya ng `openai/` o
`accounts/fireworks/models/`) upang maitugma pa rin ang mga historical row sa isang presyo.

### Paano itinatala ang paggastos

- Kinakalkula ang gastos para sa bawat request pagkatapos ng response at itinatala sa paraang fire-and-forget upang
  hindi ito kailanman magdagdag ng latency para sa client. Isine-schedule ang paggamit ng shared quota sa susunod na
  event-loop tick sa pamamagitan ng [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Binu-buffer at fina-flush nang batch ang paggastos ng API key ng
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (default na 60s flush interval,
  1,000-entry buffer). Maaaring isaayos sa pamamagitan ng:

  | Env var                             | Default | Layunin                                         |
  | ----------------------------------- | ------- | ----------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Interval ng flush sa millisecond.               |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Maximum na naka-buffer na entry bago mag-flush. |

Ang mga halaga ng gastos sa dashboard ay **hindi** binabasa mula sa nakaimbak na halagang dolyar para sa bawat row — ang mga ito
ay muling kinakalkula kaagad mula sa bilang ng mga token at sa kasalukuyang pricing table sa tuwing
tumatakbo ang analytics endpoint. Nangangahulugan itong ang pagwawasto ng maling presyo (at muling pag-sync) ay
nag-a-update sa mga historical na pagtatantiya ng gastos nang retroaktibo.

---

## Dashboard: ang pahina ng Mga Gastos

Makikita ang pahina ng **Mga Gastos** sa `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Ang pangunahing view nito ay ang tab na **Pangkalahatang-ideya ng Gastos**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
na naglo-load ng lahat mula sa `GET /api/usage/analytics`.

Ang ipinapakita nito:

- **Mga tile ng paggastos** — tinatayang gastos para sa _Ngayong araw (1d)_, _7d_, _30d_, at sa napiling
  saklaw. Tagapili ng saklaw: `7d`, `30d`, `90d`, `all`.
- **Mga pangunahing sukatan** — mga request sa loob ng saklaw, mga aktibong provider, mga aktibong model, average na
  gastos bawat request.
- **Cost Explorer** — isang sortable/filterable na talahanayang nakapangkat ayon sa **provider**, **model**,
  **API key**, **account**, o **service tier**, kasama ang gastos, mga request, mga token, average na
  gastos/request, at porsiyentong bahagi ng kabuuan.
- **Paggamit ng token** — kabuuang / input / output na mga token at ratio ng input:output.
- **Kahusayan sa pag-route** — bilang ng fallback, rate ng fallback, at coverage ng hiniling na model.
- **Buwanang forecast** — tinatantiya ang gastos sa katapusan ng buwan mula sa kamakailang pang-araw-araw na average.
- **Paghahambing ng panahon** — % ng pagbabago sa pagitan ng una at ikalawang kalahati ng saklaw.
- **Mga chart** — trend ng pang-araw-araw na gastos, bahagi ng provider (pie), mga nangungunang provider, mga nangungunang model, gastos
  ayon sa API key, gastos ayon sa account, lingguhang pattern ng paggamit, at isang activity heatmap.
- **Pag-export** — i-download ang kasalukuyang saklaw bilang **CSV** o **JSON** (lalabas ang mga button
  kapag mayroon nang datos ng gastos na hindi zero).

Kapag walang trapikong may presyo, nire-render ang mga row na may label na "Legacy / Libre" sa halip na `$0`,
na sumasalamin sa modelo ng savings tracker.

### Mga kaugnay na subpage ng Mga Gastos

Makikita rin sa bahagi ng Mga Gastos ang mga sumusunod (lahat ay nasa ilalim ng `/dashboard/costs/`):

- **Pagpepresyo** (`/dashboard/costs/pricing`) — tingnan at i-override ang mga presyo ng bawat model (nire-render
  ang shared na tab ng Pagpepresyo).
- **Badyet** (`/dashboard/costs/budget`) — magtakda ng mga limitasyon sa paggastos para sa bawat saklaw (nire-render ang shared
  na tab ng Badyet).
- **Pagbabahagi ng Quota** (`/dashboard/costs/quota-share`) — mga pool ng shared na quota at mga view ng burn rate.

---

## Mga API endpoint

Nangangailangan ang lahat ng ito ng management auth (loopback/JWT, sa pamamagitan ng `requireManagementAuth`) maliban kung
may ibang nakasaad.

### Analytics ng paggamit at gastos

| Paraan | Endpoint                 | Layunin                                                                                                                                                                              |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/usage/analytics`   | Kumpletong analytics ng gastos/paggamit: buod, pang-araw-araw na trend, ayon sa provider/model/API key/account/tier. Query: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Paggamit ng quota ng bawat provider sa paglipas ng panahon. Query: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                      |
| `GET`  | `/api/usage/history`     | Mga raw na row ng history ng paggamit.                                                                                                                                               |
| `GET`  | `/api/usage/call-logs`   | Mga log ng tawag sa bawat request (model, mga token, gastos, latency, status).                                                                                                       |
| `GET`  | `/api/usage/quota`       | Status ng quota ng provider.                                                                                                                                                         |
| `GET`  | `/api/usage/proxy-logs`  | Mga log ng proxy request.                                                                                                                                                            |

### Mga badyet

| Paraan | Endpoint                 | Layunin                                                                                                              |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Buod ng gastos + pagsusuri ng badyet para sa isang API key (kinakailangan ang `apiKeyId` query param).               |
| `POST` | `/api/usage/budget`      | Magtakda ng pang-araw-araw/panglingguhan/pangbuwanang limitasyon sa USD + threshold ng babala para sa isang API key. |
| `GET`  | `/api/usage/budget/bulk` | Maramihang buod ng badyet sa lahat ng API key.                                                                       |

> Nakatuon ang budget API sa bawat **API key** (`apiKeyId`). Kasama sa mga limitasyong ibinabalik ng
> `GET /api/usage/budget` ang `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> isang `warningThreshold`, at ang mga kasalukuyang kabuuan (`totalCostToday`, `totalCostMonth`, …).

### Pagpepresyo

| Paraan   | Endpoint                | Layunin                                                                                                                         |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Kasalukuyang pinagsamang pagpepresyo (user + synced + mga default). `?includeSources=1` upang makita ang source ng bawat entry. |
| `PATCH`  | `/api/pricing`          | I-override ang pagpepresyo para sa `{ provider: { model: { input, output, cached, … } } }`.                                     |
| `DELETE` | `/api/pricing`          | I-reset ang pagpepresyo sa mga default (opsyonal na nililimitahan ayon sa `?provider=&model=`).                                 |
| `GET`    | `/api/pricing/defaults` | Ipakita ang mga default na fallback rate sa bawat 1M.                                                                           |
| `GET`    | `/api/pricing/models`   | Pagpepresyong naka-key ayon sa model.                                                                                           |
| `POST`   | `/api/pricing/sync`     | Mag-trigger ng manual na pag-sync mula sa mga external source (LiteLLM).                                                        |
| `GET`    | `/api/pricing/sync`     | Kasalukuyang status ng pag-sync.                                                                                                |
| `DELETE` | `/api/pricing/sync`     | I-clear ang lahat ng naka-sync na datos ng pagpepresyo.                                                                         |

### Iba pang mga endpoint na nauugnay sa gastos

| Paraan | Endpoint                      | Layunin                                                                                   |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Kabuuang token ng libreng modelo, nagamit ngayong buwan, at natitirang libreng allowance. |
| `GET`  | `/api/quota/pools/[id]/usage` | Paggamit para sa isang pool ng nakabahaging quota.                                        |

---

## CLI

Inilalantad ng CLI ng OmniRoute ang mga command para sa gastos, paggamit, at pagpepresyo (nakarehistro sa
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Isang ulat ng gastos na pinagsama-sama mula sa `/api/usage/analytics`.

```bash
omniroute cost                          # huling 30d, pinangkat ayon sa provider
omniroute cost --period 7d              # huling 7 araw
omniroute cost --group-by model         # pagpangkat ayon sa provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Mga column: pangkat, mga request, mga token na papasok/palabas, gastos (USD), at % ng kabuuan. Isang linya ng kabuuang halaga
ang inilalabas sa dulo (hindi ipinapakita kapag ginamit ang `--quiet` o `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # buod ng gastos para sa bawat provider
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Mga badyet
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> Binabasa ng `pricing defaults show` ang `GET /api/pricing/defaults`. Upang baguhin sa halip ang mga presyo ng indibidwal na model,
> gamitin ang pahina ng dashboard na **Pricing** o ang `PATCH /api/pricing`.

---

## Pag-troubleshoot

- **Lahat ng gastos ay nagpapakita ng $0 / "Legacy / Free".** Walang entry sa pagpepresyo ang mga model na ginagamit.
  I-enable ang panlabas na pag-sync (`PRICING_SYNC_ENABLED=true`) at patakbuhin ang `omniroute pricing sync`, o
  manu-manong itakda ang mga presyo sa pamamagitan ng pahina ng Pricing / `PATCH /api/pricing`.
- **Mali ang presyo ng isang dating model.** Ayusin ang presyo (i-override o muling i-sync) — muling
  kinukuwenta ang gastos mula sa bilang ng mga token sa bawat pagbasa ng analytics, kaya retroaktibong naa-update ang mga pagtataya.
- **Nahuhuli ang paggastos kumpara sa real time.** Pinoproseso nang maramihan ang paggastos ng bawat key; babaan ang
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` kung kailangan mo ng mas bagong mga numero.

---

Upang makita kung saan ito kabilang sa mas malawak na dashboard, tingnan ang [Gabay ng User](./USER_GUIDE.md) at
ang [Gallery ng Mga Feature](./FEATURES.md).
