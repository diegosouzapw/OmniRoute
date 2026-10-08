# Developer environment notes (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

ဤစာမျက်နှာတွင် ပရောဂျက်၏ local `.env` လုပ်ဆောင်ပုံနှင့် OmniRoute ကို ဖွံ့ဖြိုးတိုးတက်ရေးလုပ်ဆောင်ရာတွင် environment ဖိုင်များနှင့် လျှို့ဝှက်အချက်အလက်များကို မည်သို့ကိုင်တွယ်ရမည်ကို ရှင်းပြထားသည်။

## .env postinstall လုပ်ဆောင်ပုံ

Developer များ အဆင်ပြေစေရန် ပရောဂျက်သည် `npm install` / `postinstall` ပြုလုပ်စဉ် local `.env` ဖိုင်တစ်ခုကို ထုတ်လုပ်နိုင်သည်။ ဤဖိုင်ကို local development နှင့် testing အတွက်သာ ရည်ရွယ်ထားပြီး version control ထဲသို့ မည်သည့်အခါမျှ commit မလုပ်ရပါ။

အဓိကအချက်များ-

- Repository ၏ `.gitignore` သည် `.env*` ဖိုင်များကို လျစ်လျူရှုထားပြီးဖြစ်သည် (`.gitignore` entry ကို ကြည့်ပါ)။ သတ်မှတ်ထားသော နမူနာဖိုင်တစ်ခုကို တမင်တကာ commit လုပ်ရန် ရည်ရွယ်ထားပြီး ယင်းအတွက် မှတ်တမ်းတင်ထားသော လုပ်ငန်းစဉ်တစ်ခုရှိခြင်းမဟုတ်ပါက ထိုစည်းမျဉ်းကို မဖယ်ရှားပါနှင့် သို့မဟုတ် မပြောင်းလဲပါနှင့်။
- အမှန်တကယ်အသုံးပြုနေသော လျှို့ဝှက်အချက်အလက်တစ်ခုကို repo ထဲသို့ မတော်တဆ commit လုပ်မိပါက credential ကို ချက်ချင်း ပြောင်းလဲ/ရုပ်သိမ်းပြီး repository history မှ ဖယ်ရှားပါ (ဥပမာ `git filter-repo` သို့မဟုတ် အလားတူ ပြန်လည်ပြင်ဆင်ရေး workflow ကို အသုံးပြုပါ)။ အကူအညီလိုအပ်ပါက လုံခြုံရေး/ဆက်သွယ်ရန် တာဝန်ရှိသူကို ဆက်သွယ်ပါ။
- CI နှင့် production အတွက် လျှို့ဝှက်အချက်အလက်များကို ဖိုင်များထဲသို့ commit လုပ်မည့်အစား CI secrets သို့မဟုတ် secrets manager (GitHub Actions Secrets၊ Azure Key Vault၊ HashiCorp Vault စသည်တို့) ကို အသုံးပြုပါ။

## အကြံပြုထားသော local workflow

- `.env` ကို သင်၏ local workspace တွင်သာ ထားရှိပါ။ လိုအပ်သော variable များနှင့် လက်ခံနိုင်သော နမူနာတန်ဖိုးများကို မှတ်တမ်းတင်ရန် `.env.example` (track လုပ်ထားပြီးဖြစ်သည်) ကို အသုံးပြုပါ။
- လျှို့ဝှက်အချက်အလက်နှင့် ဆင်တူသော တန်ဖိုးများ လိုအပ်သည့် test များကို local တွင် လုပ်ဆောင်သည့်အခါ အမှန်တကယ် credential များအစား ဖန်တီးထားသော placeholder များ သို့မဟုတ် runtime တွင် ထုတ်လုပ်သည့် ယာယီ key များကို ဦးစားပေး အသုံးပြုပါ။
- Placeholder များကို အသုံးပြုထားသော test များတွင် fixture သည် ဖန်တီးထားသည့်အရာဖြစ်ကြောင်း reviewer များ နားလည်စေရန် တိုတောင်းသော comment တစ်ခု ထည့်ပါ။

## Scanner မှတ်ချက်များ

- Compile လုပ်ထားသော asset သို့မဟုတ် binary asset အချို့ (ဥပမာ ထည့်သွင်းထားသော base64 WASM blob များ) တွင် credential များနှင့် တူသော ASCII substring များ ပါဝင်နိုင်ပြီး text-based secret scanner များကို trigger ဖြစ်စေနိုင်သည်။ ဤ asset များသည် တရားဝင်ပါက scanner ၏ allowlist တွင် မှတ်သားပါ သို့မဟုတ် scanner config ထဲရှိ directory များကို scan မလုပ်ရန် သတ်မှတ်ပါ။

## ပေါက်ကြားမှုတစ်ခုကို တွေ့ရှိပါက

1. Key ကို ချက်ချင်း ပြောင်းလဲ/ရုပ်သိမ်းပါ။
2. လျှို့ဝှက်အချက်အလက်ကို history မှ ဖယ်ရှားပြီး လိုအပ်ပါက ရှင်းလင်းထားသော branch ကို force-push လုပ်ပါ။
3. Maintainer များကို အသိပေးပြီး သင့်အဖွဲ့အစည်း၏ incident response checklist ကို လိုက်နာပါ။
