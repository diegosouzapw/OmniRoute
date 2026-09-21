# Public Credentials Handling (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **အမှန်တရား၏ မူရင်းရင်းမြစ်:** `open-sse/utils/publicCreds.ts`
> **စမ်းသပ်မှုများ:** `tests/unit/publicCreds.test.ts`
> **နောက်ဆုံး အပ်ဒိတ်လုပ်ထားသည့်ရက်:** 2026-08-07 — v3.8.50
> **ရည်ရွယ်ဖတ်ရှုသူများ:** အများသုံး OAuth client_id / client_secret / Firebase Web API keys များကို ၎င်းတို့၏ အများသုံး CLIs များအတွင်း ထည့်သွင်းပေးထားသော provider များနှင့် ပေါင်းစပ်အသုံးပြုနေသည့် အင်ဂျင်နီယာများ။
> **အခြေအနေ:** upstream identifier များကို ထည့်သွင်းထားသည့် ကုဒ်အသစ်အားလုံးအတွက် **မဖြစ်မနေ လိုက်နာရန်**။

## ဤအရာ တည်ရှိရသည့်အကြောင်းရင်း

- [မူရင်း app များအတွက် OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ထည့်သွင်းအသုံးပြုရသော app များအတွက် OAuth client_id / client_secret များသည် အများသုံးဖြစ်ပြီး၊ အမှန်တကယ် လုံခြုံရေးကို PKCE က ပံ့ပိုးပေးသည်။
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Web client identifier များသည် မူလဒီဇိုင်းအရ အများသုံးဖြစ်သည်။

`.env` ကို စီစဉ်သတ်မှတ်မထားသော အသုံးပြုသူများပင် ချက်ချင်းအသုံးပြုနိုင်သည့် OAuth flow ကို ရရှိစေရန် OmniRoute သည် ဤတန်ဖိုးများကို ထည့်သွင်းထားရမည်။ ထည့်သွင်းထားသော အစားထိုးမူလတန်ဖိုး မရှိပါက "ကူးယူပြီး ချက်ချင်း run ပါ" နည်းလမ်းကို လိုက်နာသည့် မည်သည့်အသုံးပြုသူအတွက်မဆို Gemini / Antigravity provider များ အလုပ်မလုပ်တော့ပါ။

သို့သော် `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` ကဲ့သို့သော တိုက်ရိုက်တန်ဖိုးများကို **GitHub Secret Scanning**, **Semgrep** နှင့် အလားတူ pattern scanner များက ကိုက်ညီကြောင်း ရှာဖွေတွေ့ရှိသည်။ Release တစ်ခုစီတွင် မှားယွင်းသော သတိပေးချက်များ ဆူညံစွာ ဆက်တိုက်ပေါ်လာခြင်း၊ push protection က တရားဝင် commit များကို ပိတ်ဆို့ခြင်းတို့ ဖြစ်ပေါ်ကာ operator များသည် alert feed ကို ယုံကြည်မှု မရှိတော့ပါ။

`open-sse/utils/publicCreds.ts` helper သည် ကန့်သတ်ချက်နှစ်ခုလုံးကို တစ်ပြိုင်နက် ဖြေရှင်းပေးသည်-

- အများသုံး identifier ကို **XOR ဖြင့် ဖုံးကွယ်ထားသော byte sequence** အဖြစ် ထည့်သွင်းထားသည် (source ထဲတွင် scanner pattern မရှိပါ)။
- Runtime တွင် `decodePublicCred` / `resolvePublicCred` မှတစ်ဆင့် decode လုပ်သည်။
- လူသိများသော prefix များ (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) နှင့် ကိုက်ညီပြီးသား raw value များကို ရှာဖွေသိရှိကာ မပြောင်းလဲဘဲ တိုက်ရိုက်ပေးပို့သည်။ ထို့ကြောင့် လက်ရှိ `.env` တွင် raw value များရှိသော အသုံးပြုသူများသည် **migration လုံးဝမလိုဘဲ** ဆက်လက်အလုပ်လုပ်နိုင်သည်။

ဤအရာသည် **ဖုံးကွယ်ခြင်းဖြစ်ပြီး၊ ကုဒ်ဝှက်ခြင်း မဟုတ်ပါ။** Source ကို ဖတ်ရှုသူတိုင်း တန်ဖိုးကို ပြန်လည်ဖော်ထုတ်နိုင်သည် — ယင်းတန်ဖိုးသည် မူလဒီဇိုင်းအရ အများသုံးဖြစ်သောကြောင့် ပြဿနာမရှိပါ။ တစ်ခုတည်းသော ရည်ရွယ်ချက်မှာ scanner regex ကိုက်ညီမှုများကို ရှောင်ရှားရန်ဖြစ်သည်။

## မဖြစ်မနေ လိုက်နာရမည့် pattern

### 1. အများသုံး credential အသစ်တစ်ခု ထည့်သွင်းခြင်း

အောက်ပါအချက်များနှင့် ကိုက်ညီသည့် upstream မှ ပံ့ပိုးသော တန်ဖိုးအသစ်တစ်ခုကို ထည့်သွင်းရန် လိုအပ်သည့်အခါ-

- အများသုံး CLI / desktop app / browser bundle တစ်ခုမှ ရရှိထားခြင်း၊ **နှင့်**
- upstream provider က ၎င်းကို အများသုံး client identifier အဖြစ် မှတ်တမ်းပြုထားခြင်း (သို့မဟုတ် ထိုသို့ သဘောထားဆောင်ရွက်ခြင်း)၊ **နှင့်**
- ထိုသို့မလုပ်ပါက pattern scanner က ၎င်းကို ကိုက်ညီကြောင်း ရှာဖွေတွေ့ရှိမည်ဖြစ်ခြင်း (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` စသည်တို့)၊

…ဤစစ်ဆေးစာရင်းကို လိုက်နာပါ-

1. ဖုံးကွယ်ထားသော byte sequence ကို ထုတ်လုပ်ပါ-

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` ရှိ `EMBEDDED_DEFAULTS` ထဲသို့ **ဘက်မလိုက်သော key အမည်** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` စသည်တို့) ဖြင့် entry အသစ်တစ်ခု ထည့်ပါ။ Helper ထဲတွင် `client_secret` သို့မဟုတ် `api_key` ကဲ့သို့သော အမည်များကို **မသုံးပါနှင့်** — ထိုစကားလုံးများသည် Semgrep generic-secret rule များကို trigger လုပ်သည်။

3. Public type union ထဲသို့ `keyof typeof EMBEDDED_DEFAULTS` တစ်ခု ထည့်ပါ (၎င်းကို အလိုအလျောက် infer လုပ်သည်)။

4. Consumer code ထဲရှိ hardcoded literal ကို အောက်ပါတို့ဖြင့် အစားထိုးပါ-

   ```ts
   // env override တစ်ခုတည်း
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // env alias အများအပြား (ဗလာမဟုတ်သော ပထမတန်ဖိုးကို ရွေးသည်)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env override မရှိ (ထည့်သွင်းထားသော မူလတန်ဖိုးကို အမြဲသုံးသည်)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Literal ကို `.env.example` မှ ဖယ်ရှားပါ (ဖတ်ရှုသူများကို ဤနေရာသို့ ညွှန်ပြသည့် comment သီးသန့် မှတ်တမ်းဖြင့် အစားထိုးပါ)-

   ```dotenv
   # ── Provider (Google / Firebase / စသည်တို့) ──
   # အများသုံး OAuth credential များကို
   # open-sse/utils/publicCreds.ts မှတစ်ဆင့် code ထဲတွင် ထည့်သွင်းထားသည်။ သင်၏ကိုယ်ပိုင်တန်ဖိုးများကို အသုံးပြုရန်သာ ဤ var များကို သတ်မှတ်ပါ။
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Key အသစ်အတွက် shape assertion တစ်ခု ထည့်ရန် `tests/unit/publicCreds.test.ts` ကို အပ်ဒိတ်လုပ်ပါ (literal value မဟုတ်ဘဲ format ကို စစ်ဆေးပါ — pattern အတွက် လက်ရှိ test များကို ကြည့်ပါ)။

7. `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literal များကို test file များထဲသို့ **မည်သည့်အခါမျှ** မထည့်ပါနှင့်။ `.join("")` fragment များမှ တည်ဆောက်ထားသော `FAKE_*` constant များကို အသုံးပြုပါ (လက်ရှိ test များကို ကြည့်ပါ)။

### 2. Consumer များ

- **`resolvePublicCred()` / `resolvePublicCredMulti()` မှသာ ဖတ်ယူပါ** — helper ပြင်ပတွင် `decodePublicCredBytes()` ကို မည်သည့်အခါမျှ တိုက်ရိုက်မခေါ်ပါနှင့်။
- Helper သည် ရည်ရွယ်ချက်ရှိရှိ ပေါ့ပါးသည် (linear byte XOR) နှင့် module load လုပ်ချိန်တွင် ခေါ်ယူရန် ဘေးကင်းသည်။ မူလတန်ဖိုးများကို တစ်ကြိမ်သာ တွက်ချက်သည်။
- Env override သည် အမြဲဦးစားပေးသည်။ အသုံးပြုသူတစ်ဦးက `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` ဟု သတ်မှတ်ပါက helper သည် ထို raw value ကို မပြောင်းလဲဘဲ တိုက်ရိုက်ပေးပို့သည်။

### 3. တားမြစ်ထားသော pattern များ

❌ Production code (`src/`, `open-sse/`, `electron/`, `bin/`) တွင် အောက်ပါတို့မှ မည်သည့်အရာကိုမျှ **မည်သည့်အခါမျှ** မလုပ်ပါနှင့်-

```ts
// မကောင်းပါ- literal value က Secret Scanning + Semgrep ကို trigger လုပ်သည်
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// မကောင်းပါ- literal ၏ base64 ဖြစ်ပြီး GitHub က Feb/2025 မှစ၍ ဆက်လက်ရှာဖွေတွေ့ရှိနိုင်သည်
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// မကောင်းပါ- runtime တွင် pattern ကို ပြန်လည်စုစည်းသည့် string concatenation
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// မကောင်းပါ- hex/ROT13 encoding သည် မတူညီသော ဖုံးကွယ်နည်းဖြစ်သော်လည်း ရှာဖွေတွေ့ရှိခံရနိုင်ခြေမှာ အတူတူပင်ဖြစ်သည်
clientSecret: hexDecode("474f4353..."),
```

ဤနည်းလမ်းအားလုံးသည် နောက်ဆုံးတွင် scanner ကို trigger လုပ်မည်ဖြစ်သည်။ `resolvePublicCred()` ကို အသုံးပြုပါ။

❌ Literal credential များကို `.env.example` ထဲသို့ **မည်သည့်အခါမျှ** မထည့်ပါနှင့်။ အမှန်တကယ် upstream value များ လိုအပ်သော အသုံးပြုသူများသည် ၎င်းတို့ကို အများသုံး CLI မှ ကိုယ်တိုင်ထုတ်ယူနိုင်သည် သို့မဟုတ် ၎င်းတို့၏ကိုယ်ပိုင် OAuth registration ကို အသုံးပြုနိုင်သည်။

❌ Credential ကို ဤ helper သို့ ရွှေ့သင့်၊ မရွှေ့သင့်ကို ဦးစွာ မစစ်ဆေးဘဲ secret-scanning alert အသစ်တစ်ခုကို **မည်သည့်အခါမျှ** ပယ်ချမထားပါနှင့်။

## ဆက်စပ် ထိန်းချုပ်မှုများ

- `publicCreds.ts` ရှိ `RAW_VALUE_PATTERN` သည် တိုက်ရိုက်ဖြတ်သန်းစေမှုကို အစပျိုးသည့် prefix များကို စာရင်းပြုစုထားသည် (နောက်ကြောင်းပြန်လိုက်ဖက်ညီမှုအတွက်)။ မှတ်တမ်းတင်ထားသည့် အများသုံး credential format များအတွက်သာ ၎င်းကို တိုးချဲ့ပါ၊ မူပိုင်လျှို့ဝှက်ချက်များအတွက် လုံးဝ မတိုးချဲ့ပါနှင့်။
- `.env.example` ကို CI ၏ `check-env-doc-sync` script က စစ်ဆေးထားသည် — ဤနေရာမှ var တစ်ခုကို ဖယ်ရှားသည့်အခါ docs များနှင့် ကိုက်ညီမှုရှိကြောင်း သေချာပါစေ။
- `npm run test:vitest` နှင့် `node --import tsx/esm --test tests/unit/publicCreds.test.ts` test suite နှစ်ခုစလုံး အောင်မြင်နေအောင် ထိန်းသိမ်းရမည်။

## ဤ helper ကို မသုံးသင့်သည့်အချိန်

ဤ helper သည် အောက်ပါအချက်များနှင့် ကိုက်ညီသော credential များအတွက် **သာလျှင်** ဖြစ်သည်-

1. မူလ provider က အများသုံးအဖြစ် ဖြန့်ဝေထားသော credential များ (CLI binary၊ browser bundle၊ တရားဝင် docs)။
2. လျှို့ဝှက်ထားရန် မလိုအပ်ကြောင်း မှတ်တမ်းတင်ထားသည့် သို့မဟုတ် ခိုင်လုံစွာ ရည်ညွှန်းထားသည့် credential များ (PKCE ဖြင့် ကာကွယ်ထားသော credential၊ Firebase Web key သို့မဟုတ် အလားတူအရာများ)။

အခြားအရာအားလုံး — operator က ထုတ်ပေးသော token များ၊ tenant တစ်ခုချင်းစီအလိုက် secret များ၊ သင်၏ကိုယ်ပိုင် OAuth app ၏ client_secret၊ encryption key များ၊ JWT secret များ၊ database password များ — အတွက် **env var များကိုသာ** အသုံးပြုပါ (`process.env.FOO`၊ ဗလာတန်ဖိုး / တိကျသော error သို့ `||` fallback လုပ်ခြင်း)။ ၎င်းတို့ကို source ထဲတွင် မထားဘဲ `.env` နှင့် [ကုဒ်ဝှက်ထားသော credential store](./COMPLIANCE.md) ထဲတွင် ထားရမည်။

## ကိုးကားချက်များ

- [Google: native app များအတွက် OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: client ခွဲခြားသတ်မှတ်ခြင်းအတွက် API key များ](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning က ပံ့ပိုးထားသော secret များ](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: token များအတွက် base64 ရှာဖွေစစ်ဆေးခြင်း (ဖေဖော်ဝါရီ 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- ဤ helper ကို စတင်ထည့်သွင်းခဲ့သည့် commit: `1a39c31f` — _fix(security): အများသုံး upstream credential များကို ဖုံးကွယ်ပြီး error သန့်စင်မှုကို တစ်နေရာတည်းတွင် စုစည်းခြင်း_
