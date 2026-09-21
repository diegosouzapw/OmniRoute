# Management Authentication (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute တွင် စီမံခန့်ခွဲမှု route များကို ခွင့်ပြုနိုင်သော **အထောက်အထားအမျိုးအစား လေးမျိုး** ရှိသည်။
၎င်းတို့ကို အပြန်အလှန် အစားထိုးအသုံးပြု၍ မရပါ။ Inference API key များ (`sk-…`) ကို
`manage` သို့မဟုတ် `admin` scope အတိအလင်း ပေးထားခြင်းမရှိပါက ဆာဗာကို စီမံခန့်ခွဲနိုင်မည် **မဟုတ်ပါ**။

စံသတ်မှတ်ထားသော implementation: `src/lib/api/requireManagementAuth.ts`။

| အထောက်အထား                       | ပုံမှန်ပုံစံ                             | ဖန်တီးသည့်နေရာ                                             | ရည်ရွယ်ထားသော အသုံးပြုမှု           | စီမံခန့်ခွဲနိုင်စွမ်း                                                                                       |
| -------------------------------- | ---------------------------------------- | ---------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Dashboard JWT session            | `auth_token` cookie                      | Dashboard အကောင့်ဝင်ခြင်း                                  | Browser UI                          | CSRF၊ တည်နေရာနှင့် အမြဲကာကွယ်ထားသော route စည်းမျဉ်းများကို လိုက်နာရသည့် dashboard စီမံခန့်ခွဲမှု အပြည့်အစုံ |
| CLI machine-id token             | အတွင်းပိုင်း / local                     | CLI bootstrap (စက်တစ်လုံးတည်းပေါ်ရှိ `omniroute`)          | Local CLI                           | Local စီမံခန့်ခွဲမှုသာ                                                                                      |
| Scope သတ်မှတ်ထားသော Access Token | `oma_live_…`                             | **Settings → Access Tokens** သို့မဟုတ် `omniroute connect` | Remote CLI နှင့် စီမံခန့်ခွဲမှု API | Route က လိုအပ်သော `read`၊ `write` သို့မဟုတ် `admin` scope ကို ပြည့်မီရမည်                                   |
| Inference API key                | `sk-…` (နှင့် အခြား API-key prefix များ) | **API Manager / API Keys**                                 | `/v1/*` inference                   | Key metadata တွင် `manage` သို့မဟုတ် `admin` ပါဝင်ခြင်းမရှိလျှင် **လုံးဝမရှိပါ**                            |

`oma_` အထောက်အထားများသည် စီမံခန့်ခွဲမှု/CLI အထောက်အထားများ ဖြစ်သည်။ ၎င်းတို့သည် inference API key များ **မဟုတ်ပါ**။

ဆာဗာအတွက် login/API-key auth ကို ပိတ်ထားပါက စီမံခန့်ခွဲမှု route အချို့သည်
အထောက်အထားမပြုဘဲ ခေါ်ဆိုမှုများကို လက်ခံနိုင်သည်။ Local-only နှင့် အမြဲကာကွယ်ထားသော route များတွင်
၎င်းတို့၏ ကိုယ်ပိုင်စည်းမျဉ်းများ ဆက်လက်သက်ရောက်သည်။ ထို့ကြောင့် ဤအထောက်အထားများထဲမှ တစ်ခုကို တင်ပြခြင်းသည်
နေရာတိုင်းတွင် မဖြစ်မနေ လိုအပ်သည်မဟုတ်သကဲ့သို့၊ လိုအပ်သော scope နှင့် route တည်နေရာ သတ်မှတ်ချက်များ
မပြည့်မီဘဲ ထိုအထောက်အထားတစ်ခု ပိုင်ဆိုင်ရုံဖြင့်လည်း နေရာတိုင်းအတွက် လုံလောက်သည်မဟုတ်ပါ။

ဆက်စပ်အကြောင်းအရာ: [Remote Mode](./REMOTE-MODE.md) (remote CLI အတွက် `oma_live_…` ကို ထုတ်ပေးပုံ)။

---

## Scope ဇယားများ

ဤ scope ဝေါဟာရအုပ်စုနှစ်ခုသည် **မတူညီပါ**။ ၎င်းတို့ကို ရောနှောအသုံးမပြုပါနှင့်။

### Access Token scope များ (`oma_live_…`)

| Scope   | ပုံမှန်လုပ်ဆောင်ချက်များ                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------ |
| `read`  | Token က ကြည့်ရှုခွင့်ရှိသော စာရင်း/အခြေအနေ GET များ                                                    |
| `write` | Admin အဆင့်အောက်ရှိ ပြောင်းလဲမှုများ (ဖန်တီးခြင်း/အပ်ဒိတ်လုပ်ခြင်း/ဖျက်ခြင်း)                          |
| `admin` | Remote CLI / connect token အပြည့်အစုံ (password bootstrap သည် ပုံမှန်အားဖြင့် ဤ scope ကို အသုံးပြုသည်) |

`read` ပါသော token သည် `write` route ကို ခေါ်ဆို၍မရပါ။ Runtime message ပုံစံ:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-key စီမံခန့်ခွဲမှု scope များ

| Scope    | အဓိပ္ပာယ်                                                                        |
| -------- | -------------------------------------------------------------------------------- |
| (မရှိ)   | Inference အတွက်သာ။ စီမံခန့်ခွဲမှု route များက 403 ပြန်ပေးသည်။                    |
| `manage` | စီမံခန့်ခွဲမှု API (`requireManagementAuth` ၏ API-key branch နှင့် တူညီသော gate) |
| `admin`  | `hasManageScope` ကိုလည်း ပြည့်မီစေသည် (စီမံခန့်ခွဲနိုင်စွမ်းရှိသည်ဟု သတ်မှတ်သည်) |

API Keys / API Manager UI ထဲရှိ key တွင် `manage` ကို ဖွင့်ပါ။ ထို scope ကို တမင်တကာ
ပေးထားခြင်းမရှိပါက အလိုအလျောက်လုပ်ဆောင်မှုအတွက် chat client key ကို ပြန်လည်အသုံးမပြုပါနှင့်။

---

## ဖန်တီးပုံနှင့် ရုပ်သိမ်းပုံ

### Dashboard JWT session

1. `/login` ကို ဖွင့်ပြီး စီမံခန့်ခွဲမှု password ဖြင့် အကောင့်ဝင်ပါ (ပထမဆုံး boot တွင် `INITIAL_PASSWORD`)။
2. `auth_token` cookie သည် HttpOnly ဖြစ်သည်။ Browser dashboard က ၎င်းကို အလိုအလျောက် အသုံးပြုသည်။
3. `/api/auth/logout` မှတစ်ဆင့် အကောင့်ထွက်ပါ။ ကူးယူရန် သက်တမ်းရှည် secret မရှိပါ။

### CLI machine-id token

1. ဆာဗာနှင့် **host တစ်ခုတည်းပေါ်တွင်** `omniroute` ကို run ပါ (loopback)။
2. CLI က `~/.omniroute/` အောက်တွင် machine-id token တစ်ခုကို bootstrap လုပ်သည် (chmod 600)။
3. ၎င်းသည် အခြားစက်မှ အလုပ်လုပ်မည် **မဟုတ်ပါ**။ Remote CLI အတွက် Access Token ကို အသုံးပြုပါ။

### Scope သတ်မှတ်ထားသော Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → ဖန်တီးပါ (အမည် + scope)။ **Secret ကို တစ်ကြိမ်သာ ပြသသည်။**
2. သို့မဟုတ် CLI: `omniroute connect <host>` (password → token)။ [Remote Mode](./REMOTE-MODE.md) ကို ကြည့်ပါ။
3. Header: `Authorization: Bearer oma_live_…`
4. တူညီသော Access Tokens စာမျက်နှာမှ ရုပ်သိမ်းပါ (သို့မဟုတ် CLI context ကို ဖျက်ပါ)။
5. ဆာဗာသည် hash ကိုသာ သိမ်းဆည်းသည်။ Plaintext ကို password ကဲ့သို့ လုံခြုံစွာ ကိုင်တွယ်ပါ။

### `manage` scope ပါသော API key

1. Dashboard: **API Manager / API Keys** → key တစ်ခုကို ဖန်တီးပါ သို့မဟုတ် ပြင်ဆင်ပါ → `manage` (သို့မဟုတ် `admin`) ကို ဖွင့်ပါ။
2. Header: `Authorization: Bearer sk-…` (key ၏ အမှန်တကယ် prefix)။
3. တူညီသော UI ထဲတွင် ရုပ်သိမ်းပါ သို့မဟုတ် `manage` ကို ဖယ်ရှားပါ။
4. CLI မဟုတ်သော အလိုအလျောက်လုပ်ဆောင်မှုများအတွက် အနည်းဆုံးအခွင့်အရေးကို သုံးပါ။ GET-only job များအတွက် `read` Access Token ကို ဦးစားပေးပါ။ ခေါ်ဆိုသူက `/v1` နှင့် စီမံခန့်ခွဲမှု နှစ်မျိုးလုံးကို အသုံးပြုရမည့်အခါမှသာ API key တွင် `manage` ကို အသုံးပြုပါ။

---

## Header ဖော်မတ်

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

စီမံခန့်ခွဲမှုဆိုင်ရာ အထောက်အထားများကို URL path သို့မဟုတ် query string တွင် မထည့်ပါနှင့်။ စီမံခန့်ခွဲမှု အထောက်အထားစိစစ်ခြင်းကို header/cookie မှတစ်ဆင့်သာ ပြုလုပ်ရမည်။

---

## တိုက်ရိုက်ကူးယူအသုံးပြုနိုင်သော နမူနာများ

ဖတ်ရှုရန်သာ (provider များကို စာရင်းပြုစုခြင်း)။ `read` Access Token ကို အသုံးပြုပါ-

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ပြင်ဆင်ခြင်း (provider ချိတ်ဆက်မှုတစ်ခု ဖန်တီးခြင်း)။ `write`/`admin` Access Token သို့မဟုတ် `manage` scope ပါသော API key ကို အသုံးပြုပါ-

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (စီမံခန့်ခွဲမှု မဟုတ်ပါ)။ ပုံမှန် API key ကို အသုံးပြုနိုင်ပြီး `manage` မလိုအပ်ပါ-

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## လက်ရှိ runtime error များ (လျှို့ဝှက်အချက်အလက်များကို ပြန်မဖော်ပြပါနှင့်)

| အခြေအနေ                                                    | ပုံမှန် status | မက်ဆေ့ချ် (အရေးကြီးအချက်အလက်များ ဖယ်ရှားထားသည်)                      |
| ---------------------------------------------------------- | -------------- | -------------------------------------------------------------------- |
| အထောက်အထားမရှိခြင်း                                        | 401            | `Authentication required`                                            |
| မမှန်ကန်သော/သက်တမ်းကုန်ဆုံးနေသော `oma_live_…`              | 401            | `Invalid or expired access token`                                    |
| `manage`/`admin` မပါသော မှန်ကန်သည့် API key                | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| စီမံခန့်ခွဲမှု route တစ်ခုတွင် မမှန်ကန်သော ပုံမှန် API key | 403            | `Invalid management token`                                           |
| Access Token scope နိမ့်လွန်းခြင်း                         | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" ဆိုသည်မှာ bearer ကို စီမံခန့်ခွဲမှု အထောက်အထားတစ်ခုအဖြစ် **လက်မခံခဲ့ခြင်း** ကို ဆိုလိုသည်။ မည်သည့်အမျိုးအစားကို ထုတ်ပေးရမည်ဆိုသည်ကို ၎င်းက **မဖော်ပြပါ**။ အထက်ပါဇယားကို အသုံးပြုပါ- inference key များတွင် `manage` scope လိုအပ်သည်၊ remote CLI တွင် `oma_live_…` လိုအပ်သည်၊ dashboard က session cookie ကို အသုံးပြုသည်။

---

## အကြံပြုထားသော အနည်းဆုံးအခွင့်အရေး ရွေးချယ်မှု

| ခေါ်ယူသူ                                           | အသုံးပြုရန်                                           |
| -------------------------------------------------- | ----------------------------------------------------- |
| Browser                                            | Dashboard session                                     |
| Server host ပေါ်ရှိ CLI                            | Machine token                                         |
| Remote server နှင့် ဆက်သွယ်သည့် laptop ပေါ်ရှိ CLI | `omniroute connect` မှ ရရှိသော `oma_live_…`           |
| CI / script များ (စီမံခန့်ခွဲမှုအတွက်သာ)           | အလုပ်လုပ်နိုင်သည့် အငယ်ဆုံး scope ပါသော `oma_live_…`  |
| `/v1` နှင့် `/api` နှစ်ခုစလုံးကို ခေါ်ယူရမည့် CI   | `manage` ပါသော API key **သို့မဟုတ်** အထောက်အထားနှစ်ခု |
