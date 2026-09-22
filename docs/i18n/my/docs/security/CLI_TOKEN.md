# CLI Machine-ID Token (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## အကျဉ်းချုပ်

OmniRoute CLI command များသည် `x-omniroute-cli-token` request header မှတစ်ဆင့် ပေးပို့သော
`HMAC-SHA256(machine-id, salt)` token ကို အသုံးပြုပြီး local management API တွင်
စစ်မှန်ကြောင်းအတည်ပြုသည်။

ဤနည်းလမ်းကြောင့် CLI subcommand များ (`omniroute status`, `omniroute providers` စသည်တို့)
သည် အသုံးပြုသူက ခေါ်ယူမှုတိုင်းတွင် JWT သို့မဟုတ် password ပေးရန်မလိုဘဲ
management endpoint များကို ခေါ်ဆိုနိုင်သည်။

## အလုပ်လုပ်ပုံ

1. `getMachineTokenSync()` သည် `node-machine-id` မှတစ်ဆင့် hardware machine ID ကို
   ဖတ်သည် (မအောင်မြင်ပါက string အလွတ်ကို အစားထိုးအသုံးပြုသဖြင့် CLI auth ကို ပိတ်ထားမည်)။
2. ၎င်းသည် `HMAC-SHA256(machine_id, salt)` ကို တွက်ချက်ပြီး စာလုံး 64 လုံးပါသော
   hex digest အပြည့်အစုံကို ပြန်ပေးသည် — ၎င်းမှာ ဤစက်နှင့် ချိတ်ဆက်ထားသော၊ တူညီသည့် input အတွက် အမြဲတူညီပြီး
   မူလတန်ဖိုးသို့ ပြန်ပြောင်း၍မရသော token ဖြစ်သည်။
3. ဖြေရှင်းရရှိသည့် destination သည် တိကျစွာ သတ်မှတ်ထားသော loopback URL (`localhost`, `127.0.0.0/8`
   သို့မဟုတ် loopback IPv6) ဖြစ်သည့်အခါမှသာ CLI က token ကို `x-omniroute-cli-token` အဖြစ်
   ပေးပို့သည်။ Token ပါရှိသော request များသည် `redirect: error` ကို အသုံးပြုသောကြောင့် local
   redirect တစ်ခုက ၎င်းကို အခြား origin တစ်ခုသို့ ဆက်လက်ပေးပို့၍မရပါ။ Remote context များတွင် scoped
   access token များကို အစားထိုးအသုံးပြုသည်။ Token ထုတ်ယူတွက်ချက်ခြင်း မပြုလုပ်နိုင်ပါက CLI သည် header ကို
   ချန်လှပ်ထားပြီး token အလွတ်ကို မှန်ကန်သည်ဟု သတ်မှတ်မည့်အစား `omniroute doctor` က
   မအောင်မြင်မှုကို အစီရင်ခံသည်။
4. Server (`src/server/authz/policies/management.ts`) သည် တူညီသော salt ဖြင့်
   မျှော်မှန်းထားသည့် token ကို ပြန်လည်တွက်ချက်ပြီး timing အပေါ် အခြေခံသော token ထုတ်ယူမှုကို
   ကာကွယ်ရန် `timingSafeEqual` ဖြင့် နှိုင်းယှဉ်သည်။

## လုံခြုံရေးဆိုင်ရာ ဂုဏ်သတ္တိများ

| ဂုဏ်သတ္တိ                                             | အသေးစိတ်                                                                                                                                                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback အတွက်သာ**                                  | Server ၏ ယုံကြည်စိတ်ချရသော peer-locality stamp (TCP peer address အစစ်မှ ထုတ်ယူထားသည်) က loopback ဖြစ်ကြောင်း ဖော်ပြသည့်အခါမှသာ လက်ခံသည်။ Client က ထိန်းချုပ်နိုင်သော `Host` header ကို locality ဆုံးဖြတ်ရန် မည်သည့်အခါမျှ မယုံကြည်ပါ။ |
| **အချိန်ကာလတူညီသော နှိုင်းယှဉ်မှု**                   | `crypto.timingSafeEqual` သည် timing attack များကို ကာကွယ်ပေးသည်။                                                                                                                                                                      |
| **မူလတန်ဖိုးသို့ ပြန်ပြောင်း၍မရခြင်း**                | HMAC output မှ machine-id ကို ပြန်လည်ရယူ၍မရပါ။                                                                                                                                                                                        |
| **`always` ဖြင့် ကာကွယ်ထားမှုကို ကျော်လွှား၍မရခြင်း** | CLI token ကို စစ်ဆေးခြင်းမပြုမီ `isAlwaysProtectedPath()` ကို အကဲဖြတ်သည်။ `/api/shutdown` နှင့် `/api/settings/database` တို့သည် JWT ကို အမြဲလိုအပ်သည်။                                                                               |
| **Export မလုပ်နိုင်ခြင်း**                            | Token ကို disk တွင် မည်သည့်အခါမျှ ရေးသားသိမ်းဆည်းခြင်း သို့မဟုတ် log မှတ်တမ်းတင်ခြင်း မပြုပါ။                                                                                                                                         |

## မူလသတ်မှတ်ထားသော salt (install တစ်ခုစီအတွက် ကျပန်း)

`OMNIROUTE_CLI_SALT` ကို မသတ်မှတ်ထားသည့်အခါ salt သည် တစ်ကြိမ်တည်း ထုတ်လုပ်ပြီး
`<DATA_DIR>/cli-token-salt.json` တွင် သိမ်းဆည်းထားသော ကျပန်း စာလုံး 64 လုံးပါ hex string ဖြစ်သည်
(mode `0600`) — repository ထဲတွင် ထည့်သွင်းထားသော literal `omniroute-cli-auth-v1` မဟုတ်ပါ။
`src/lib/machineToken.ts` ရှိ `getActiveSalt()` နှင့်
`bin/cli/utils/cliToken.mjs` ရှိ ၎င်း၏ mirror နှစ်ခုစလုံးသည် တူညီသော file ကို ဖတ်သောကြောင့်
ဤ install ရှိ server နှင့် CLI ခေါ်ယူမှုတိုင်းသည် တူညီသောတန်ဖိုးကို အသုံးပြုနိုင်သည်။
သိမ်းဆည်းထားသော salt သို့မဟုတ် env salt ကို မသတ်မှတ်နိုင်သေးသည့်အခါမှသာ repository ထဲတွင် ထည့်သွင်းထားသော literal ကို
နောက်ဆုံး fallback အဖြစ် အသုံးပြုသည် (ဥပမာ၊ server ကို တစ်ကြိမ်မျှ မ run ရသေးမီ အသစ်ပြုလုပ်ထားသော CLI-only install)။
ဤပြောင်းလဲမှုသည် ယခင်ပုံသေ literal default ၏ အားနည်းချက်ကို ဖြေရှင်းပေးသည်—
`/etc/machine-id` ကို အများအားဖြင့် user အားလုံး ဖတ်နိုင်သောကြောင့်
`OMNIROUTE_CLI_SALT` ကို မသတ်မှတ်ထားသည့် install တိုင်းအတွက် မည်သည့် local user မဆို
တူညီသော token ကို ထုတ်ယူတွက်ချက်နိုင်ခဲ့ခြင်း ဖြစ်သည်။

## Salt လဲလှယ်ခြင်း

ကုဒ်ပြောင်းလဲရန်မလိုဘဲ ဆင်းသက်ရရှိသော token ကို လဲလှယ်ရန် `OMNIROUTE_CLI_SALT` ကို သတ်မှတ်ပါ — ၎င်းသည် သိမ်းဆည်းထားသော installation တစ်ခုချင်းစီ၏ salt ထက် အမြဲတမ်း ဦးစားပေးပါသည်။ လဲလှယ်ပြီးနောက် ဤစက်ပေါ်ရှိ CLI process အားလုံးသည် token အသစ်ကို အလိုအလျောက် အသုံးပြုပါမည်။ ယခင်ဆင်းသက်ရရှိသော တန်ဖိုးကို ဖော်ထုတ်မိနိုင်သည့် process-list ပေါက်ကြားမှုဖြစ်ပြီးနောက် အသုံးဝင်ပါသည်။

```bash
# အမြဲတမ်းအသုံးပြုမည့် လဲလှယ်မှု (shell profile ထဲသို့ ထည့်ပါ)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Token အသစ်ကို အသုံးပြုနေကြောင်း စစ်ဆေးပါ
omniroute status
```

## အမွေဆက်ခံ format (SHA-256၊ စာလုံး 32 လုံး) — လက်ခံဆဲဖြစ်သည်

အထက်ပါ HMAC format မတိုင်မီ CLI သည် ၎င်း၏ token ကို
`bin/cli/utils/cliToken.mjs` ရှိ `SHA-256(machineId + salt).hex[0..32]`
(စာလုံး 32 လုံးပါ prefix) အဖြစ် ဆင်းသက်တွက်ချက်ခဲ့သည် (`src/lib/machineToken.ts` ရှိ
`getLegacyCliTokenSync`)။

နောက်ပြန်လိုက်ဖက်ညီမှုအတွက် server သည် format **နှစ်မျိုးလုံး** ကို လက်ခံသည်။ verifier က
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ကို တည်ဆောက်ပြီး
ဝင်လာသော header ကို တစ်ခုချင်းစီနှင့် `timingSafeEqual` အသုံးပြု၍ နှိုင်းယှဉ်သည်
(`src/server/authz/policies/management.ts` နှင့် `src/lib/middleware/cliTokenAuth.ts`)။
ထို့ကြောင့် token တစ်ခုသည် စာလုံး 64 လုံးပါ HMAC digest သို့မဟုတ် စာလုံး 32 လုံးပါ
အမွေဆက်ခံ SHA-256 prefix **တစ်ခုခု** နှင့် ကိုက်ညီပါက အကျုံးဝင်သည်။

**မသုံးရန် ရွေးချယ်ခြင်း:** CLI token စနစ်ကို လုံးဝပိတ်ရန် `OMNIROUTE_DISABLE_CLI_TOKEN=true`
(env သို့မဟုတ် `.env`) ဟု သတ်မှတ်ပါ။ ထို့နောက် ဝင်ရောက်အသုံးပြုမှုအားလုံးအတွက် တိကျစွာ
ပေးထားသော API key တစ်ခု လိုအပ်ပါမည်။ အသုံးပြုသူများစွာရှိသော host များတွင် ဤနည်းလမ်းကို
အကြံပြုထားသည်။ အကြောင်းမှာ `machine-id` သည် အသုံးပြုသူတစ်ဦးချင်းအလိုက် မဟုတ်ဘဲ
စက်တစ်လုံးချင်းအလိုက် ဖြစ်သောကြောင့် host တစ်ခုတည်းပေါ်ရှိ အခြားအသုံးပြုသူက တူညီသော
token ကို တွက်ချက်နိုင်ခြင်းကြောင့်ဖြစ်သည်။

## ဖိုင်များ

| ဖိုင်                                     | ရည်ရွယ်ချက်                                            |
| ----------------------------------------- | ------------------------------------------------------ |
| `src/lib/machineToken.ts`                 | Token ဆင်းသက်တွက်ချက်ခြင်း (`getMachineTokenSync`)     |
| `bin/cli/utils/cliToken.mjs`              | တူညီသော ဆင်းသက်တွက်ချက်မှု၏ CLI ဘက်ခြမ်း မိတ္တူ        |
| `<DATA_DIR>/cli-token-salt.json`          | သိမ်းဆည်းထားသော installation တစ်ခုချင်းစီ၏ ကျပန်း salt |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` ကိန်းသေတန်ဖိုး                      |
| `src/server/authz/policies/management.ts` | Server ဘက်ခြမ်း အတည်ပြုစစ်ဆေးမှု                       |
| `src/server/authz/routeGuard.ts`          | Loopback host စစ်ဆေးမှု (`isLoopbackHost`)             |

## ထပ်မံကြည့်ရှုရန်

- `docs/security/ROUTE_GUARD_TIERS.md` — route ကာကွယ်မှု အဆင့်များ
- `docs/architecture/AUTHZ_GUIDE.md` — authorization pipeline အပြည့်အစုံ
