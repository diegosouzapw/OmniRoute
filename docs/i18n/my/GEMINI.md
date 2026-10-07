# GEMINI.md (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇪🇹 [am](../am/GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇦🇿 [az](../az/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇧🇩 [bn](../bn/GEMINI.md) · 🇧🇦 [bs](../bs/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇬🇷 [el](../el/GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇪🇪 [et](../et/GEMINI.md) · 🇮🇷 [fa](../fa/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇮🇪 [ga](../ga/GEMINI.md) · 🇮🇳 [gu](../gu/GEMINI.md) · 🇳🇬 [ha](../ha/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇭🇷 [hr](../hr/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇦🇲 [hy](../hy/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇳🇬 [ig](../ig/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇬🇪 [ka](../ka/GEMINI.md) · 🇰🇭 [km](../km/GEMINI.md) · 🇮🇳 [kn](../kn/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇱🇹 [lt](../lt/GEMINI.md) · 🇱🇻 [lv](../lv/GEMINI.md) · 🇮🇳 [ml](../ml/GEMINI.md) · 🇮🇳 [mr](../mr/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇲🇹 [mt](../mt/GEMINI.md) · 🇳🇵 [ne](../ne/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇮🇳 [or](../or/GEMINI.md) · 🇮🇳 [pa](../pa/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇱🇰 [si](../si/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇸🇮 [sl](../sl/GEMINI.md) · 🇷🇸 [sr](../sr/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇰🇪 [sw](../sw/GEMINI.md) · 🇮🇳 [ta](../ta/GEMINI.md) · 🇮🇳 [te](../te/GEMINI.md) · 🇹🇭 [th](../th/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇵🇰 [ur](../ur/GEMINI.md) · 🇺🇿 [uz](../uz/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇳🇬 [yo](../yo/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md) · 🇹🇼 [zh-TW](../zh-TW/GEMINI.md)

---

> **တစ်ခုတည်းသော အမှန်တရားရင်းမြစ်:** AI assistant များအတွက် project စည်းမျဉ်းအားလုံးကို
> [`AGENTS.md`](AGENTS.md) တွင် ထည့်သွင်းထားသည်။ မည်သည့်ပြောင်းလဲမှုကိုမဆို မပြုလုပ်မီ ၎င်းကို အပြည့်အစုံဖတ်ပါ — ၎င်းတွင် Hard Rules 23 ချက်၊
> quality gates များ၊ code conventions များ၊ file-placement / repo-root hygiene စည်းမျဉ်းများ၊ repository map
> နှင့် ယခင်က ဤဖိုင်တွင် ပါဝင်ခဲ့သော local development access မှတ်စုများ ပါဝင်သည်။

Gemini သီးသန့်မှတ်စုများ:

- Skills များကို `activate_skill` tool မှတစ်ဆင့် အသက်သွင်းနိုင်သည် (skill metadata ကို session စတင်ချိန်တွင် load လုပ်ထားပြီး
  အကြောင်းအရာအပြည့်အစုံကို လိုအပ်သည့်အခါ အသက်သွင်းသည်)။
- လက်ရှိတွင် အခြား Gemini သီးသန့်စည်းမျဉ်းများ မရှိပါ။ Project စည်းမျဉ်းများကို ဤနေရာတွင် ပြန်မထည့်ပါနှင့် — assistant တိုင်း တူညီသောညွှန်ကြားချက်များကို မြင်နိုင်စေရန်
  `AGENTS.md` ကိုသာ ပြင်ဆင်ပါ။
