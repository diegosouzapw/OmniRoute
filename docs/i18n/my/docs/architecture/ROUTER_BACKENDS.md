# Router Backends & Embedded Services — architecture contract (ADR) (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **အခြေအနေ:** လက်ခံပြီး · **ဆက်စပ်အကြောင်းအရာ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **သတ်မှတ်ချက်:** `domain/routing/routerBackends.ts`
> (အမျိုးအစားသတ်မှတ်ထားသော registry — code ကို [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) နှင့်အတူ ထည့်သွင်းမည်)

ဤ ADR သည် `ts` (native), `bifrost`, `cliproxy`, `9router` နှင့်
VibeProxy-compatible engine များ အချင်းချင်း မည်သို့ဆက်နွှယ်သည်ကို အတိအကျ သတ်မှတ်ပေးထားသဖြင့် contributor များသည် ဗိသုကာအရ သီးခြားဖြစ်သော အရာနှစ်ခုကို
ရောထွေးမယူတော့ပါ။ ၎င်းသည် router-backend-registry လုပ်ငန်းမှ စတင်မိတ်ဆက်ခဲ့သော အမျိုးအစားသတ်မှတ်ထားသည့်
registry ကို ထို model အတွက် တစ်ခုတည်းသော အမှန်တရားရင်းမြစ်အဖြစ် မှတ်တမ်းတင်ထားသည်။

## အဓိကကွာခြားချက် — တစ်ခုနှင့်တစ်ခု အမှီအခိုကင်းသော ဝင်ရိုးနှစ်ခု

Engine တစ်ခု၏ အခန်းကဏ္ဍကို registry ၏
`RouterBackendDefinition` ထဲတွင် အတူတကွ encode လုပ်ထားသော **အမှီအခိုကင်းသည့် ဝင်ရိုးနှစ်ခု** ဖြင့် ဖော်ပြသည်-

1. **Lifecycle** (`RouterBackendLifecycle`) — _engine ကို မည်သို့ လည်ပတ်စေသည်_:
   - `in-process` — OmniRoute Node process အတွင်းတွင် လည်ပတ်သည် (native TS pipeline)။
   - `supervised` — OmniRoute က `ServiceSupervisor` မှတစ်ဆင့် install/start/stop/health-check လုပ်ဆောင်ပြီးနောက် provider connection တစ်ခုအဖြစ် အသုံးပြုသည့် local child process ဖြစ်သည်။
   - `external` — OmniRoute က request များကို dispatch လုပ်ပေးသော်လည်း **မစီမံ**သည့် HTTP endpoint ဖြစ်သည်
     (env base URL ဖြင့် configure လုပ်ထားသည်)။
   - `disabled` — စာရင်းသွင်းထားသော်လည်း ရွေးချယ်၍မရပါ။
2. **ရွေးချယ်မှုဝင်ရိုး** (relay routing backend) — _relay က ၎င်းထံ dispatch လုပ်ခြင်း ရှိမရှိ_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` ကို
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` တွင် သတ်မှတ်ထားသည်။

ရှောင်ရှားရမည့်အမှားမှာ "embedded service" နှင့် "routing backend" ကို စာရင်းတစ်ခုတည်းအဖြစ် သဘောထားခြင်းဖြစ်သည်။
၎င်းတို့သည် တူညီခြင်းမရှိပါ။ `supervised` engine (9router/cliproxy) သည် **native pipeline က အသုံးပြုသည့် provider
connection** ဖြစ်ပြီး အစားထိုး relay dispatch
backend မဟုတ်ပါ။ `bifrost` မှာမူ ပြောင်းပြန်ဖြစ်ပြီး — (ယခင်က)
`external` အဖြစ်သာ ရရှိနိုင်သော relay dispatch backend တစ်ခုဖြစ်သည်။

## Registry — တစ်ခုတည်းသော အမှန်တရားရင်းမြစ်

`domain/routing/routerBackends.ts` သတ်မှတ်ချက် (code ကို
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) နှင့်အတူ ထည့်သွင်းမည်) သည် engine တစ်ခုစီကို ၎င်း၏
lifecycle, capability များ, service identity, default port, health config နှင့်
telemetry support တို့နှင့်အတူ တစ်ကြိမ်စီ ကြေညာသတ်မှတ်သည်။ Consumer များသည် sidecar တစ်ခုချင်းစီအတွက်
သီးခြား case များ ရေးသားမည့်အစား `getRouterBackend(id)`,
`listRouterBackends()` နှင့် `listRouterBackendsByCapability(cap)` မှတစ်ဆင့် engine များကို ရှာဖွေသည်။

| Backend     | Lifecycle    | Service (ဝင်ရိုး A) | Relay backend (ဝင်ရိုး B) | Health        | Default port |
| ----------- | ------------ | ------------------- | ------------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —                   | `ts` (native)             | —             | —            |
| `bifrost`   | `external`¹  | —¹                  | `bifrost` / `auto`        | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`          | — (provider)              | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`           | — (provider)              | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —                   | — (provider adapter)      | `/v1/models`  | —            |

¹ Bifrost ကို `/api/services/bifrost/` မှ install/start လုပ်နိုင်သော
`supervised` embedded service အဖြစ် အဆင့်မြှင့်တင်မှုကို
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) တွင် ခြေရာခံထားသည်။ ၎င်းကို merge မလုပ်ရသေးသရွေ့
Bifrost ကို `external` အဖြစ်သာ ရရှိနိုင်သည် (`BIFROST_BASE_URL` မှတစ်ဆင့်သာ ချိတ်ဆက်အသုံးပြုနိုင်သည်)။

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) သည် caller များအား id တစ်ခုချင်းစီအလိုက် branch များကို hard-code လုပ်မည့်အစား
engine တစ်ခု အမှန်တကယ် လုပ်ဆောင်နိုင်သည့်အရာများအလိုက် filter လုပ်နိုင်စေသည်။

## Axis A — ထည့်သွင်းထားသော ဝန်ဆောင်မှုများ (ကြီးကြပ်ထားသည့် process ဘက်ခြမ်း)

- **ကြီးကြပ်ထားသည့် process များ၏ registry:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (လက်ရှိ: `9router`, `cliproxy`)။
- **Lifecycle ပိုင်ရှင်:** `src/lib/services/ServiceSupervisor.ts` — `start()` သည် child process ကို
  spawn လုပ်ပြီး `waitForHealthy()` ဖြင့် အဆင်သင့်ဖြစ်သည်အထိ ထိန်းချုပ်ကာ stdout/stderr ကို ring buffer ထဲသို့
  ထည့်သွင်းသည်။ `stop()` သည် SIGTERM→SIGKILL လုပ်သည်။ အားလုံးကို lock တစ်ခုအောက်တွင် အစဉ်လိုက် လုပ်ဆောင်သည်။
- **State union** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error` နှင့် သီးခြားဖြစ်သော
  `HealthState = healthy | unhealthy | unknown`။
- **အဘယ်ကြောင့် သီးခြား process ကို အသုံးပြုသနည်း (in-proc SDK မဟုတ်သနည်း)?** Process isolation ကြောင့်သာ
  sidecar တစ်ခုချင်းစီအလိုက် install/start/stop/health/logs များကို သီးခြားထိန်းချုပ်နိုင်ပြီး
  loopback spawn-guard ကိုလည်း အသုံးချနိုင်သည်။ in-proc adapter ကို မော်ဒယ်ပြုလုပ်ခြင်းသည် အနာဂတ်အလုပ်ဖြစ်သည် —
  ၎င်းကို ဖော်ပြမည့်နေရာမှာ `native-hot-path` capability flag ဖြစ်သည်။

### Lifecycle route စာချုပ် (`/api/services/<tool>/…`)

Status code များကို **state/verb/path အလိုက် ရည်ရွယ်ချက်ရှိရှိ သတ်မှတ်ထားခြင်းဖြစ်သည်** — ၎င်းသည်
စာချုပ်ဖြစ်ပြီး ရှေ့နောက်မညီခြင်း မဟုတ်ပါ။

| Call                               | အခြေအနေ                                         | Status                                        |
| ---------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| `POST .../start`                   | ဝန်ဆောင်မှုက `not_installed` ဖြစ်သည်            | **409** (ကြိုတင်သတ်မှတ်ချက်)                  |
| `POST .../stop`                    | ရပ်တန့်ထားပြီးဖြစ်သည်                           | **200** (ထပ်ခါလုပ်လည်း အကျိုးသက်ရောက်မှုမရှိ) |
| `GET .../status`                   | OK                                              | **200** (`live ?? row ?? "unknown"`)          |
| `POST .../start`                   | spawn မအောင်မြင်မှု                             | **503** (ယာယီ)                                |
| `GET .../status`, `.../stop`       | မဖမ်းယူထားသော error                             | **500**                                       |
| `GET /api/services/<x>/logs`       | မသိသော tool `<x>`                               | **404** `Service '<x>' not found`             |
| `GET .../status?reveal=key`        | `X-Reveal-Confirm: yes` မပါရှိခြင်း             | **403** (`9router` အတွက်သာ)                   |
| **မည်သည့်** `/api/services/*` မဆို | ခေါ်ဆိုသူသည် loopback/private-LAN မှ မဟုတ်ခြင်း | **403 LOCAL_ONLY**                            |

Error body အားလုံးကို `createErrorResponse()` ဖြင့် ပုံဖော်ထားသည် →
`{ error: { message, type }, requestId }`။ ဤနေရာတွင် `type` ကို status မှ ဆင်းသက်သတ်မှတ်ပြီး
(`500→server_error`, `404→not_found`, `409→conflict`၊ အခြားအခြေအနေများတွင် `invalid_request`)
စက်ဖြင့် အရေးယူလုပ်ဆောင်နိုင်သော ခွဲခြားသတ်မှတ်ချက်ဖြစ်သည်။ Message များကို ကြိုတင် sanitize လုပ်ထားသည်
(`sanitizeErrorMessage()`၊ အခိုင်အမာ စည်းမျဉ်း #12)။

**Loopback guard** သည် `403` ဖြစ်ပေါ်စေသည့် အတွေ့ရအများဆုံး အကြောင်းရင်းဖြစ်သည်။ `/api/services/` သည်
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ထဲတွင် ပါဝင်ပြီး
`src/server/authz/policies/management.ts` က loopback / private-LAN မဟုတ်သော
ခေါ်ဆိုသူတိုင်းကို **auth မပြုလုပ်မီ** ငြင်းပယ်သည်။ အကြောင်းမှာ ဤ route များက child process များကို spawn
လုပ်သောကြောင့်ဖြစ်သည် (အခိုင်အမာ စည်းမျဉ်း 15 နှင့် 17)။ Public tunnel မှတစ်ဆင့် ၎င်းတို့ကို ခေါ်ဆိုပါက
ရည်ရွယ်ထားသည့်အတိုင်း `403` ဖြစ်မည်။

## Axis B — relay routing backend (dispatch ဘက်ခြမ်း)

Relay proxy path `/api/v1/relay/chat/completions` ကသာ dispatch
backend တစ်ခုကို ရွေးချယ်သည်။ အဓိက `/api/v1/chat/completions` မျက်နှာပြင်သည်
`routingBackend.ts` ကို လုံးဝ အသုံးမပြုပါ။

- **ရွေးချယ်မှု** (`resolveRelayRoutingBackend`): တစ်ခုတည်းသော global env toggle —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}။
  မသတ်မှတ်ထားပါက Bifrost ကို configure လုပ်ထားပြီး enable လုပ်ထားလျှင် `auto`၊ မဟုတ်ပါက `ts` ဖြစ်သည်။
- **အပြုအမူ:**
  - `bifrost` (အတင်းသတ်မှတ်): Bifrost မအောင်မြင်ပါက → hard `502` ဖြစ်ပြီး fallback မရှိပါ။
  - `auto`: Bifrost ကို စမ်းသပ်ပြီး မအောင်မြင်ပါက သို့မဟုတ် cooldown ဖြစ်နေပါက native သို့ အသံတိတ် fallback လုပ်သည်။
  - `ts` / fallback ပြီးနောက်: native `open-sse` translator/executor pipeline။
- **Cooldown:** `bifrostCooldown.ts` ရှိ `baseUrl` တစ်ခုချင်းစီအလိုက် failure cooldown။

လက်ရှိ relay အဆင့်ရှိ ရွေးချယ်မှုသည် **အားလုံး သို့မဟုတ် ဘာမျှမဟုတ်** ပုံစံဖြစ်သည် —
`release/v3.8.43` တွင် provider တစ်ခုချင်း သို့မဟုတ် request တစ်ခုချင်းအလိုက် engine ပြောင်းလဲခြင်း မရှိသေးပါ။
Request တစ်ခုချင်းအလိုက် gate ကို sidecar-manifest လုပ်ငန်းက ထည့်သွင်းနေသည်
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`)။
၎င်းကြောင့် `auto` သည် manifest အရ အကျုံးဝင်သော provider များကိုသာ Bifrost မှတစ်ဆင့် route လုပ်နိုင်မည်။

## Dashboard ပေါင်းစည်းမှု

ဝန်ဆောင်မှုများ dashboard သည်
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` မှတစ်ဆင့် 5s တိုင်း `GET /api/services/<tool>/status` ကို poll လုပ်ပြီး
`{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` ကို ပြန်ပေးသည်။ မျှဝေထားသော availability-context provider မရှိပါ —
component တစ်ခုစီက tool တစ်ခုချင်းအတွက် hook ကို ခေါ်သည်။ `!res.ok` ဖြစ်သည့်အခါ လက်ရှိတွင် hook က
ရှင်းလင်းချက်မပါသော `HTTP <status>` ကို ဖော်ပြသည်။ `error.type` field ကို လူနားလည်နိုင်သော ရှင်းလင်းချက်နှင့် ချိတ်ဆက်ပေးခြင်းသည်
စောင့်ကြည့်မှတ်တမ်းတင်ထားသော UX တိုးတက်မှုတစ်ခုသာဖြစ်ပြီး contract ပြောင်းလဲမှု မဟုတ်ပါ။

## အကျိုးဆက်များ

- Engine အသစ်များကို `ROUTER_BACKENDS` တွင် တစ်ကြိမ်သာ register လုပ်ရသည်။ အသုံးပြုသူများသည်
  id တစ်ခုချင်းအလိုက် branch အသစ်များ မလိုအပ်ဘဲ capability query များမှတစ်ဆင့် ၎င်းတို့ကို ရရှိသည်။
- "၎င်းသည် service တစ်ခုလား သို့မဟုတ် routing backend တစ်ခုလား?" ဆိုသည်ကို id တစ်ခုက မည်သည့် list တွင် ပါဝင်နေသည်ဟူသောအချက်ဖြင့် မဟုတ်ဘဲ
  `lifecycle` field ဖြင့် ဆုံးဖြတ်သည်။
- Bifrost supervision (#5817) နှင့် native hot-path migration (#5670) တို့သည် sidecar တစ်ခုချင်းစီကို
  အထူးသီးသန့် ကိုင်တွယ်ခြင်းအစား ဤမျှဝေထားသော contract ကို အခြေခံ၍ တည်ဆောက်ထားသည်။
