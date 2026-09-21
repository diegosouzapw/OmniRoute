# CORS Configuration & Security (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute သည် ဗဟိုချုပ်ကိုင်ထားသော allowlist တစ်ခုတည်းမှတစ်ဆင့် မည်သည့် **browser origins** များက cross-origin response များကို ဖတ်ရှုနိုင်သည်ကို ထိန်းချုပ်ပါသည်။ ဤ model သည် **မူလအားဖြင့် fail-closed** ဖြစ်သည်။ origin တစ်ခုကို သင်ကိုယ်တိုင် ခွင့်ပြုစာရင်းထဲ ထည့်မထားမချင်း မည်သည့် origin ကိုမျှ ခွင့်မပြုပါ။ ဤစာမျက်နှာတွင် allowlist ကို ဖြေရှင်းဆုံးဖြတ်ပုံ၊ `CORS_ALLOW_ALL=true` က အမှန်တကယ် ဖော်ထုတ်ပေးသည့်အရာများ (အရေးကြီးသည်မှာ **မဖော်ထုတ်ပေးသည့်** အရာများ)၊ development နှင့် production ပတ်ဝန်းကျင်များအတွက် ဘေးကင်းစွာ စီစဉ်သတ်မှတ်ပုံနှင့် wildcard အသက်ဝင်နေချိန်တွင် dashboard က ပြသသည့် runtime သတိပေးချက်တို့ကို မှတ်တမ်းတင်ထားပါသည်။

**အဓိကအကိုးအကား:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)။ allowlist ကို middleware
(`src/server/authz/pipeline.ts`) တွင် တစ်ကြိမ်သာ အသုံးချပါသည် — route တစ်ခုချင်းစီ၏ handler များသည်
`Access-Control-Allow-Origin` ကို ကိုယ်တိုင် မသတ်မှတ်ပါ။

## Origin တစ်ခုကို ဖြေရှင်းဆုံးဖြတ်ပုံ

Request တစ်ခုစီအတွက် middleware သည် `Access-Control-Allow-Origin` တန်ဖိုးကို အောက်ပါအစီအစဉ်အတိုင်း တွက်ချက်ပါသည်။

1. **`CORS_ALLOW_ALL=true`** (သို့မဟုတ် အဟောင်း `CORS_ORIGIN=*`) → ခေါ်ဆိုသူ၏
   `Origin` ကို ပြန်လည်ဖော်ပြပါသည် (`Origin` header မရှိပါက `*`)။ Cache များ မှန်ကန်နေစေရန်
   `Vary: Origin` ကိုလည်း ထည့်သွင်းပါသည်။ အလားတူ `applyCorsHeaders()` chokepoint သည် token ဖြင့် စစ်မှန်ကြောင်းအတည်ပြုထားသော
   `/v1*`/`/v1beta*` မျက်နှာပြင်ရှိ body ပါဝင်သော 2xx response တိုင်းသို့
   `Vary: Accept-Encoding` ကိုလည်း ထည့်သွင်းပါသည် (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737)။ ထို့ကြောင့်
   downstream/shared cache များသည် compressed နှင့် uncompressed
   variant များကို မှန်ကန်စွာ ခွဲခြားနိုင်ပါသည်။
2. ထိုသို့မဟုတ်ပါက request ၏ `Origin` ကို ပုံမှန်ပုံစံဖြစ်အောင် ပြောင်းလဲပါသည် (စာလုံးအသေးပြောင်းပြီး နောက်ဆုံး slash ကို
   ဖယ်ရှားခြင်း)။ ထို့နောက် **ပေါင်းစည်းထားသော allowlist** နှင့် ကိုက်ညီမှု ရှိမရှိ စစ်ဆေးပါသည်။
   - env **`CORS_ALLOWED_ORIGINS`** — ကော်မာဖြင့် ခွဲထားသော စာရင်း၊ နှင့်
   - runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed
     Origins_)၊ `src/lib/config/runtimeSettings.ts` မှ
     `setRuntimeAllowedOrigins()` ဖြင့် ထည့်သွင်းထားခြင်း။
3. ကိုက်ညီမှုမရှိပါက → **`Access-Control-Allow-Origin` header ကို လုံးဝမထုတ်ပေးပါ**။ Browser သည်
   cross-origin ဖတ်ရှုမှုကို ပိတ်ဆို့ပါသည်။ ဤအပြုအမူသည် ရည်ရွယ်ထားသော fail-closed မူလသတ်မှတ်ချက်ဖြစ်သည်။

| Env var                | အဓိပ္ပာယ်                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ခွင့်ပြုမည့် origin အတိအကျများ၏ CSV စာရင်း (အကြံပြုထားသည်)။                                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → မည်သည့် origin ကိုမဆို ပြန်လည်ဖော်ပြသည် (wildcard)။ Development အတွက်သာ။                               |
| `CORS_ORIGIN`          | အဟောင်းဖြစ်သည်။ `*` သည် `CORS_ALLOW_ALL` ကဲ့သို့ လုပ်ဆောင်ပြီး တန်ဖိုးတစ်ခုတည်းဖြစ်ပါက allowlist သို့ ထည့်သွင်းသည်။ |

## ခြိမ်းခြောက်မှု model — `CORS_ALLOW_ALL=true` က အမှန်တကယ် ဖော်ထုတ်ပေးသည့်အရာ

OWASP ၏ ယေဘုယျသတိပေးချက် ("wildcard CORS = မည်သည့် site မဆို သင့် API ကို ခေါ်ဆိုနိုင်သည်") ကို
အလေးအနက်ထားသင့်သော်လည်း OmniRoute ၏ ဖော်ထုတ်မှုသည် **ယေဘုယျအခြေအနေထက် ပိုမိုကျဉ်းမြောင်းသည်**။
အကြောင်းမှာ တိကျသော implementation အချက်တစ်ခုကြောင့် ဖြစ်သည်။

> **ဗဟို `applyCorsHeaders()` သည်
> `Access-Control-Allow-Credentials` ကို မည်သည့်အခါမျှ မထုတ်ပေးပါ။** Server က
> `Access-Control-Allow-Credentials: true` ကို ပေးပို့ခြင်းမရှိပါက browser သည် _credentialed_
> (cookie ပါဝင်သော) cross-origin response ကို ဖတ်ရှုခွင့်ပြုမည် မဟုတ်ပါ။ OmniRoute ၏ မျှဝေထားသော CORS path သည်
> ယင်းသို့ မည်သည့်အခါမျှ မလုပ်ဆောင်ပါ။

`CORS_ALLOW_ALL=true` ဖြစ်နေသည့်တိုင် မျက်နှာပြင်တစ်ခုချင်းစီအတွက် အဓိပ္ပာယ်မှာ အောက်ပါအတိုင်းဖြစ်သည်။

| မျက်နှာပြင်                                             | Auth ယန္တရား                | Wildcard CORS ၏ အကျိုးသက်ရောက်မှု                                                                                                                                                                                                                                                       |
| ------------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`                         | Cookie session              | Origin ကို ပြန်လည်ဖော်ပြသော်လည်း **`Allow-Credentials` မပါသောကြောင့်** browser သည် credentialed ဖတ်ရှုမှုကို **ပိတ်ဆို့ပါသည်**။ အန္တရာယ်ပြုလိုသော cross-origin site တစ်ခုသည် သင်၏ အတည်ပြုထားသော dashboard response များကို **မဖတ်ရှုနိုင်သကဲ့သို့** session cookie ကိုလည်း မဖော်ထုတ်ပါ။ |
| Client API `/v1/*`, `/v1beta/*`                         | Bearer / `x-api-key` header | **ဒီဇိုင်းအရ** ခွင့်ပြုချက် ကျယ်ပြန့်ပြီးသားဖြစ်သည် (`relaxForTokenAuth`)။ Browser များသည် `Authorization`/`x-api-key` ကို မည်သည့်အခါမျှ အလိုအလျောက် ပူးတွဲမပေးသောကြောင့် တိုက်ခိုက်သူ၏ စာမျက်နှာသည် သင်၏ key ကို မပေးနိုင်ပါ။ `CORS_ALLOW_ALL` သည် ဤခွင့်ပြုချက်ကို ပိုမိုမချဲ့ထွင်ပါ။ |
| အများပြည်သူဖတ်ရှုနိုင်သည့် read-only (`/api/health`, …) | မရှိပါ                      | အရေးမကြီးသော အချက်အလက်ဖြစ်သောကြောင့် wildcard သည် အန္တရာယ်မရှိပါ။                                                                                                                                                                                                                       |

ထို့ကြောင့် `CORS_ALLOW_ALL=true` ၏ **ကျန်ရှိနေသော** ဖော်ထုတ်မှုသည် အောက်ပါတို့တွင်သာ ကန့်သတ်ထားပါသည်။ (a)
အတည်ပြုရန် မလိုအပ်သည့် ဒေတာကို credential မပါဘဲ cross-origin မှ **ဖတ်ရှုခြင်း**၊ နှင့် (b)
management route များတွင် CORS **preflight ကို ဖြတ်သန်းခွင့်ပြုခြင်း** — သို့သော် ယင်း route များသည်
cross-origin စာမျက်နှာတစ်ခုက မပေးနိုင်သည့် auth ကို လိုအပ်နေဆဲဖြစ်သည်။ မျှဝေထားသော CORS path တွင် ၎င်းသည် session hijack သို့မဟုတ်
credential ခိုးယူနိုင်သည့် လမ်းကြောင်း **မဟုတ်ပါ**။

### အမှန်တကယ်ရှိသော ခြွင်းချက်တစ်ခု — `/api/v1/agents/`

Cloud-Agent route များ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) သည်
၎င်းတို့၏ **ကိုယ်ပိုင်** CORS header များကို သတ်မှတ်ပြီး
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`)
`Access-Control-Allow-Origin: <origin>|*` နှင့်အတူ
`Access-Control-Allow-Credentials: true` ကိုလည်း **ထုတ်ပေးပါသည်**။ ဤနေရာသည် origin ပြန်လည်ဖော်ပြမှုနှင့် credential များ အတူတကွ ရှိနေသည့် တစ်ခုတည်းသော မျက်နှာပြင်ဖြစ်ပြီး
`CORS_ALLOW_ALL` နှင့် **မသက်ဆိုင်ဘဲ သီးခြားဖြစ်သည်**။ ဤ route များကို management auth ဖြင့် အတည်ပြုထားပါသည်
(`requireManagementAuth`)။ Dashboard ကို host ပြင်ပမှ ဝင်ရောက်နိုင်အောင် ဖွင့်ထားသည့် operator များအနေဖြင့်
response header များက cross-origin credentialed ဖတ်ရှုမှုကို ခွင့်ပြုထားသည့် တစ်ခုတည်းသောနေရာမှာ ဤနေရာဖြစ်ကြောင်း
သတိပြုသင့်ပါသည်။ ၎င်းကို တိကျသော allowlist တစ်ခုသို့ ကန့်သတ်တင်းကျပ်ရန်ကိစ္စကို
ဤ CORS လမ်းညွှန်ချက်နှင့် သီးခြားစီ ခြေရာခံဆောင်ရွက်ထားပါသည်။

## Production စစ်ဆေးရန်စာရင်း

- **Production တွင် `CORS_ALLOW_ALL=true` ကို မည်သည့်အခါမျှ မသတ်မှတ်ပါနှင့်။** မသတ်မှတ်ဘဲထားပါ။
- **တိကျသော** origin စာရင်းတစ်ခုကို သတ်မှတ်ပါ — env var သို့မဟုတ် Security tab ရှိ field ကို အသုံးပြုနိုင်သည်-

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ကို reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) ၏နောက်ကွယ်တွင် လုပ်ဆောင်ထားပါက CORS သည် သင်၏တစ်ခုတည်းသော
  ထိန်းချုပ်မှု **မဟုတ်ပါ** — loopback route guard သည် spawn လုပ်နိုင်သော route များကို
  ဆက်လက်ကာကွယ်ထားသည်
  ([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ကိုကြည့်ပါ)။ 403 ကို "ဖြေရှင်းရန်"
  `X-Forwarded-For: 127.0.0.1` ကို အတုမပြုလုပ်ပါနှင့်။ ထိုသို့ပြုလုပ်ခြင်းသည် route guard က
  ပိတ်ထားသော RCE အမျိုးအစားကို ပြန်လည်ဖွင့်ပေးလိုက်မည်ဖြစ်သည်။
- Runtime အခြေအနေကို အတည်ပြုပါ- `CORS_ALLOW_ALL=true` အသက်ဝင်နေသည့်အခါတိုင်း
  dashboard သည် Dashboard → Security → Authorization Inventory အောက်တွင်
  **အမြဲတမ်းပေါ်နေသော ပယင်းရောင် banner** ကို ပြသပြီး
  `/api/settings/authz-inventory` သည် စောင့်ကြည့်ရေးကိရိယာများက poll လုပ်နိုင်သည့်
  `cors: { allowAll, allowedOrigins }` envelope ကို ပြန်ပေးသည်။

## Development အဆင်ပြေမှု — သတ်မှတ်ထားသော local origin များကို ခွင့်ပြုခြင်း

Dev တွင်ပင် wildcard ကို အသုံးပြုရန် မလိုအပ်သလောက်ဖြစ်သည်။ သင်အသုံးပြုသည့် dev server
များကိုသာ ခွင့်ပြုပါ-

```bash
# Local OmniRoute ကို ခေါ်သည့် Vite (5173) + Next.js (3000) dev server များ
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origin များကို စာလုံးအကြီးအသေးမခွဲခြားဘဲ နှိုင်းယှဉ်ပြီး နောက်ဆုံးရှိ slash ကို
လျစ်လျူရှုသောကြောင့် `http://localhost:3000` နှင့် `http://localhost:3000/` တို့သည်
အတူတူပင်ဖြစ်သည်။ အလားတူ CSV ကို restart ပြုလုပ်ရန်မလိုဘဲ runtime တွင်
**Dashboard → Security → CORS Allowed Origins** မှတစ်ဆင့် သတ်မှတ်နိုင်သည်။

## API key များနှင့် cookie session များ

- **Bearer / `x-api-key` (`/v1/*` inference surface):** browser များသည်
  ၎င်းတို့ကို မည်သည့်အခါမျှ အလိုအလျောက်မထည့်သွင်းပါ။ ဤနေရာတွင် CORS သည်
  အဓိပ္ပာယ်ရှိသော အတားအဆီးတစ်ခုမဟုတ်ပါ — API key ကသာ အတားအဆီးဖြစ်သည် —
  ထို့ကြောင့် browser နှင့် Electron client များက ၎င်းတို့ဖတ်ရှုခွင့်ရှိပြီးသား
  response များကို ဖတ်နိုင်စေရန် ထို surface ကို ရည်ရွယ်ချက်ရှိရှိ permissive
  ပြုလုပ်ထားခြင်းဖြစ်သည်။
- **Cookie session (dashboard):** fail-closed default **နှင့်**
  မျှဝေထားသော path တွင် `Access-Control-Allow-Credentials` မရှိခြင်းတို့ဖြင့်
  ကာကွယ်ထားသည်။ Management/dashboard origin များကို permissive config
  တစ်ခုခုထဲ မထည့်ပါနှင့်။ ၎င်းတို့သည် fail-closed အတိုင်း တိတိကျကျ
  ဆက်ရှိနေရမည်။

## ဥပမာ- OmniRoute ၏ရှေ့တွင် reverse proxy ထားခြင်း

CORS ကို OmniRoute ကိုယ်တိုင်က စည်းကမ်းသတ်မှတ်သည်။ ထို့ကြောင့် proxy သည်
ယေဘုယျအားဖြင့် `Access-Control-*` header များကို **မထည့်သင့်** သို့မဟုတ်
ပြန်လည်မရေးသင့်ပါ (header နှစ်ထပ်ဖြစ်ခြင်းက browser များကို အလုပ်မလုပ်စေပါ)။
TLS ကို terminate လုပ်ပြီး forward လုပ်ပါ — preflight ကို OmniRoute က
တုံ့ပြန်ပါစေ-

```nginx
# nginx — OmniRoute သို့ forward လုပ်ပါ။ ဤနေရာတွင် Access-Control-* ကို မထည့်သွင်းပါနှင့်
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For ကို 127.0.0.1 အဖြစ် မသတ်မှတ်ပါနှင့် — ထိုသို့ပြုလုပ်ခြင်းသည် loopback route guard ကို အကျိုးမဲ့စေသည်။
}
```

ခွင့်ပြုထားသော browser origin များကို proxy တွင်မဟုတ်ဘဲ OmniRoute
(`CORS_ALLOWED_ORIGINS` သို့မဟုတ် Security tab) တွင် သတ်မှတ်ပါ။

## Source file များ

| သက်ဆိုင်ရာအကြောင်းအရာ                                    | File                                                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist ဖြေရှင်းခြင်း + `getCorsStatus()`              | `src/server/cors/origins.ts`                                         |
| Middleware အသုံးချခြင်း (တစ်ခုတည်းသော အမှန်တရားရင်းမြစ်) | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin ထည့်သွင်းခြင်း                 | `src/lib/config/runtimeSettings.ts`                                  |
| Dashboard အတွက် runtime အခြေအနေ                          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard သတိပေး banner                                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins field                               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Route တစ်ခုချင်းစီအလိုက် Cloud-Agent CORS (ခြွင်းချက်)   | `src/lib/cloudAgent/api.ts`                                          |

## ထပ်မံကြည့်ရှုရန်

- [Route Guard အဆင့်များ](./ROUTE_GUARD_TIERS.md) — process များ စတင်ဖန်တီးနိုင်သည့် route များအတွက် loopback ကန့်သတ်အတည်ပြုခြင်း (သီးခြားဖြစ်သော်လည်း အပြန်အလှန်ဖြည့်စွက်ပေးသည့် ထိန်းချုပ်မှုတစ်ခု)။
- [ခွင့်ပြုချက်လမ်းညွှန်](../architecture/AUTHZ_GUIDE.md) — auth pipeline အပြည့်အစုံ။
