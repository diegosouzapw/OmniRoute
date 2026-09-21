# Cursor Provider in Docker Environments (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute ကို Docker အတွင်း လည်ပတ်သည့်အခါ container က host ပေါ်ရှိ Cursor
တပ်ဆင်မှုကို မမြင်နိုင်သောကြောင့် ယခင် **Cursor IDE မှ Import လုပ်ရန်** /
`cursor-agent` လုပ်ငန်းစဉ်များ မအောင်မြင်ပါ။ ယင်းအစား **Cursor ဖြင့် Login ဝင်ရန်**
(deep-control PKCE) ကို အသုံးပြုပါ။

## Docker တွင် IDE / CLI Import မအောင်မြင်ရသည့်အကြောင်းရင်း

1. **ဖိုင်စနစ် သီးခြားခွဲထားခြင်း** — အလိုအလျောက် import သည် container
   _အတွင်းရှိ_ `~/.config/Cursor/User/globalStorage/state.vscdb` ကဲ့သို့သော Linux
   path များကို ရှာဖွေပါသည်။ macOS အတွက် Docker Desktop တွင် host IDE DB ကို
   ပုံမှန်အားဖြင့် mount မလုပ်ထားသည့်အပြင် host က Darwin ဖြစ်နေလျှင်ပင် container
   OS သည် Linux ဖြစ်ပါသည်။
2. **`cursor-agent` binary မရှိခြင်း** — တရားဝင် OmniRoute image များတွင်
   `cursor-agent` မပါဝင်ပါ။ ယခင်က ရရှိနိုင်သော မော်ဒယ်များကို ရှာဖွေရန်
   `cursor-agent --list-models` ကို shell မှတစ်ဆင့် လုပ်ဆောင်ခဲ့ပြီး မအောင်မြင်ပါက
   static catalog ကို ပြန်လည်အသုံးပြုခဲ့သည်။
3. **Binary မှားယွင်းခြင်း** — macOS `cursor-agent` ကို Linux container ထဲသို့
   bind-mount **မလုပ်ပါနှင့်**။ ၎င်းကို လုပ်ဆောင်နိုင်မည် မဟုတ်ပါ။

## အကြံပြုချက်: Cursor ဖြင့် Login ဝင်ခြင်း

1. **Dashboard → Providers → Cursor** ကို ဖွင့်ပါ။
2. **Cursor ဖြင့် Login ဝင်ရန်** tab ကို ရွေးပါ။
3. **Cursor ဖြင့် Login ဝင်ရန်** ကို နှိပ်ပါ — OmniRoute သည် သင့် **host**
   browser တွင် `https://cursor.com/loginDeepControl?…` ကို ဖွင့်ပေးပါမည်။
4. Browser ထဲတွင် login ကို အတည်ပြုပြီးနောက် dashboard သို့ ပြန်သွားပါ။ Token
   များ ရောက်လာသည်အထိ OmniRoute က `api2.cursor.sh/auth/poll` ကို အကြိမ်ကြိမ်
   စစ်ဆေးပါသည်။
5. OmniRoute သည် **access + refresh** token များကို သိမ်းဆည်းပြီး
   `https://api2.cursor.sh/auth/exchange_user_api_key` မှတစ်ဆင့် refresh
   လုပ်ပါသည်။

ဤနည်းလမ်းတွင် container အတွင်း Cursor IDE သို့မဟုတ် `cursor-agent`
မလိုအပ်ပါ။

## မော်ဒယ်ရှာဖွေခြင်း

Login ဝင်ထားသော connection ရှိပါက **ရရှိနိုင်သော မော်ဒယ်များ / အလိုအလျောက်
Sync** သည် connection bearer token ကို အသုံးပြုသည့် Cursor ၏ HTTP
`AiService/AvailableModels` catalog ကို ဦးစားပေးပါသည်။ ထိုနည်းလမ်း မအောင်မြင်ပါက
OmniRoute သည် host ပေါ်ရှိ `cursor-agent` ကို ဆက်လက်စမ်းသပ်ပြီး (ရှိသည့်အခါ)
နောက်ဆုံးတွင် static registry seed ကို အသုံးပြုပါသည်။

OmniRoute သည် catalog ထဲတွင် **`auto`** (ပြသမည့်အမည် “Auto”) အပြင်
OpenCodex ပုံစံ router mode များဖြစ်သည့် **`auto-cost`**, **`auto-balance`** နှင့်
**`auto-intelligence`** တို့ကို အမြဲဖော်ပြပေးပါသည်။ Wire ပေါ်တွင် ၎င်းတို့သည်
Cursor ၏ `default` မော်ဒယ်နှင့် ချိတ်ဆက်ထားပြီး variant သုံးခုအတွက်
`optimization` ModelParameter ပါဝင်ပါသည်။ Premium မော်ဒယ်များ၏ အသုံးပြုခွင့်
ကုန်သွားသည့်အခါ `cu/auto` ကို ဦးစားပေးပါ — Auto တွင် budget ကျန်ရှိနေနိုင်ပါသည်။

### Sync လုပ်ပြီးသည့်အခါ live catalog တစ်ခုတည်းကိုသာ အသုံးပြုခြင်း

Cursor မော်ဒယ် sync အောင်မြင်ပြီးနောက် (`cursor-agent --list-models` → သိမ်းဆည်းထားသော
synced catalog သို့မဟုတ် အထက်ပါ bearer-authenticated `AvailableModels` fetch)
**dashboard**, **`/v1/models`** နှင့် **အားလုံးကို စမ်းသပ်ရန်** စာရင်းတွင်
အောက်ပါတို့ ပါဝင်ပါသည်-

1. Live sync မှ ပြန်ပေးသော မော်ဒယ်များ
2. ထည့်သွင်းထားသော auto-router id များ- `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operator ၏ **စိတ်ကြိုက်** မော်ဒယ်များ (Import / manual) — sync ကြောင့် မည်သည့်အခါမျှ မဖယ်ရှားပါ

`open-sse/config/providers/registry/cursor/` အောက်ရှိ static registry အကြီးစားသည်
**offline fallback အတွက်သာ** ဖြစ်ပါသည်။ Synced စာရင်း ဗလာဖြစ်နေသည့်အခါ
(သို့မဟုတ် ရှာဖွေမှု မအောင်မြင်သည့်အခါ) စာရင်းပြုစုခြင်းသည် ထို registry ကို
ပြန်လည်အသုံးပြုပါသည်။

Effort suffix ပါသော id များ (ဥပမာ `claude-4.6-sonnet-high`) ကို runtime တွင်
**တောင်းဆို** နိုင်ဆဲဖြစ်သည်- `resolveRequestedModel` သည် suffix ကို ဖယ်ရှားပြီး
wire `ModelParameter` အဖြစ် ပြောင်းလဲပါသည်။ သီးသန့်စာရင်းပြုစုမှုသည် ထို static
variant များကို အားလုံးကို စမ်းသပ်ရန် စာရင်းမှ ရည်ရွယ်ချက်ရှိရှိ ဖျောက်ထားခြင်းဖြင့်
စမ်းသပ်တောင်းဆိုမှုများကို Cursor က အမှန်တကယ် ရရှိနိုင်သည်ဟု ပြန်ပေးသော မော်ဒယ်များနှင့်
ကိုက်ညီစေပါသည်။

### အကူလုပ်ဆောင်ချက်များ

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — dashboard ပေါင်းစည်းမှု
- `ensureCursorAutoCatalogEntry` — ရှာဖွေမှုနှင့် စာရင်းပြုစုမှုအတွင်း auto* ထည့်သွင်းခြင်း
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` static loop

## Provider ကန့်သတ်ချက်များ (quota)

Cursor အတွက် **Usage → Provider Limits** သည် PKCE သို့မဟုတ် token import
ပြုလုပ်ပြီးနောက် `api2.cursor.sh` ပေါ်ရှိ Bearer API များ
(`GetCurrentPeriodUsage` → အသုံးပြုမှုအနှစ်ချုပ် → auth/usage) ကို အသုံးပြုပါသည်။
ယခင် IDE-imported session များအတွက် legacy cookie/`cursor.com` dashboard
လမ်းကြောင်းကို နောက်ဆုံး fallback အဖြစ် ဆက်လက်ထားရှိပါသည်။

Window များတွင် ပုံမှန်အားဖြင့် **Total**, **Auto + Composer** နှင့် **API**
တို့ ပါဝင်ပါသည်။ ကန့်သတ်ချက်များ ဗလာဖြစ်နေပါက **Cursor ဖြင့် Login ဝင်ရန်** ကို
ထပ်မံလုပ်ဆောင်ပါ သို့မဟုတ် token များကို ပြန်လည် import လုပ်ပါ (IDE import
တစ်ခုတည်းကို မလိုအပ်တော့ပါ)။

## ဗလာ turn များ / အသုံးပြုခွင့်ကုန်ဆုံးခြင်း

Cursor က Run ကို လက်ခံသော်လည်း assistant စာသားကို ပြန်မပေးသည့်အခါ (premium
အသုံးပြုခွင့် ကုန်ဆုံးချိန်တွင် အဖြစ်များသည်) OmniRoute သည် လုပ်ဆောင်ဖြေရှင်းနိုင်သော
**429** (quota အချက်ပြမှုများ) သို့မဟုတ် လမ်းညွှန်ချက်ပါသော **502** ကို
ဖော်ပြပေးသည် — “Provider returned empty content” တစ်ခုတည်းကို မပြပါ။
`not_found: AI Model Not Found` (အသုံးပြုမှု window ကုန်ဆုံးခြင်း) ကဲ့သို့သော
streaming မအောင်မြင်မှုများကို **Cursor နှုန်းကန့်သတ်ချက် / အသုံးပြုမှုကျော်လွန်ခြင်း**
အဖြစ် သတ်မှတ်ပြီး SSE pipeline တစ်လျှောက် ထို message ကို ထိန်းသိမ်းထားပါသည်
(မျှဝေသုံးသော empty-stream guard သည် ထုတ်လွှင့်ပြီးသား error ကို ထပ်မရေးပါ)။
Provider Limits ကို စစ်ဆေးပါ၊ **`auto`** မော်ဒယ်ကို စမ်းသပ်ပါ သို့မဟုတ် Cursor
အစီအစဉ်၏ ကန့်သတ်ချက်များကို မြှင့်တင်ပါ။

## Client version (headless)

Local `cursor-agent` တပ်ဆင်မှု မရှိပါက OmniRoute သည်
`x-cursor-client-version` ကို env `CURSOR_AGENT_CLI_VERSION` မှ ပထမဦးစွာ
သတ်မှတ်ပြီးနောက် Cursor installer script ကို disk-cached scrape လုပ်ထားသည့်
ရလဒ်မှ သတ်မှတ်ကာ နောက်ဆုံးတွင် pinned build id ကို အသုံးပြုပါသည်။ လိုအပ်သည့်အခါ
`CURSOR_AGENT_CLI_VERSION` ဖြင့် override လုပ်ပါ။

## Fallback: Token ကို ကိုယ်တိုင် Import လုပ်ခြင်း

Browser login ကို မပြီးမြောက်နိုင်ပါက-

1. Host ပေါ်ရှိ Cursor ၏ `state.vscdb` မှ token များကို ထုတ်ယူပါ-

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor auth modal တွင် **Token import လုပ်ရန်** ကို ဖွင့်ပါ။
3. **Access Token** နှင့် ရရှိနိုင်ပါက **Refresh Token** ကို ကူးထည့်ပါ
   (အလိုအလျောက် refresh လုပ်ရန် လိုအပ်သည်)။ Machine ID သည် မဖြစ်မနေ မလိုအပ်ပါ။

Access token သာ ပါသော import များကို အသုံးပြုနိုင်ဆဲဖြစ်သော်လည်း refresh token
မရှိပါက သက်တမ်းကုန်ဆုံးပါမည် — chat က authentication error များ ပြန်ပေးသည့်အခါ
ပြန်လည် import လုပ်ပါ။

## ဆက်စပ်အကြောင်းအရာများ

- Zed Docker လမ်းညွှန်ချက်- [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor login ကိုးကားချက် (ပြင်ပ)-
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
