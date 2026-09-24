# Import providers from a CSV or JSON file (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **ဖိုင်မှ တင်သွင်းရန်** သည် CSV သို့မဟုတ် JSON စာရင်းမှ API-key ချိတ်ဆက်မှုများကို ဖန်တီးပေးသည်။ အတန်းတစ်တန်းစီသည် မတူညီသော provider တစ်ခုကို သတ်မှတ်နိုင်သည်။ တစ်စိတ်တစ်ပိုင်း မအောင်မြင်ခြင်းကို ပုံမှန်လုပ်ဆောင်ချက်အဖြစ် သတ်မှတ်ထားသည်။ အချို့အတန်းများ မအောင်မြင်သော်လည်း မှန်ကန်သောအတန်းများကို ဆက်လက်တင်သွင်းပြီး modal တွင် မအောင်မြင်သောအတန်းများကို အဘယ်ကြောင့် ငြင်းပယ်ခဲ့ကြောင်း ဖော်ပြသည်။

ဤတင်သွင်းမှုသည် OpenAI/Anthropic နှင့် ကိုက်ညီသော endpoint node အသစ်များကို **မဖန်တီးပါ**။ ၎င်းတို့ကို ဦးစွာ ဖန်တီးပါ (Dashboard → Providers → Add OpenAI-Compatible သို့မဟုတ် `omniroute nodes add`)၊ ထို့နောက် ယင်း node ၏ id ကို `provider` ကော်လံတွင် ထည့်ထားသောအတန်းများကို တင်သွင်းပါ။ အတန်းအလိုက် `baseUrl` ဖြင့် node ၏ URL ကို အစားထိုးသတ်မှတ်နိုင်သေးသည်။

## CSV (နေရာစဉ်အလိုက်)

ကော်လံအမည်များသည် အပြင်အဆင်အတွက်သာ ဖြစ်သည်။ Parser သည် အတန်းတစ်တန်းစီကို ခွဲခြားပြီး index အလိုက် destructure လုပ်သည်။

| Index | အကွက်      | လိုအပ်သည် | မှတ်ချက်များ                                                                                                                                       |
| ----- | ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | ဟုတ်သည်   | ရှိပြီးသား စီမံထားသော provider id (`openai`, `anthropic`, …) **သို့မဟုတ်** မှတ်ပုံတင်ထားပြီးဖြစ်သော OpenAI/Anthropic နှင့် ကိုက်ညီသည့် **node** id |
| 1     | `name`     | ဟုတ်သည်   | ချိတ်ဆက်မှုတွင် ပြသမည့်အမည်                                                                                                                        |
| 2     | `apiKey`   | ဟုတ်သည်   | API key                                                                                                                                            |
| 3     | `baseUrl`  | မလိုအပ်ပါ | အတန်းအလိုက် URL အစားထိုးသတ်မှတ်ချက်                                                                                                                |
| 4     | `priority` | မလိုအပ်ပါ | ကိန်းပြည့် 1–100                                                                                                                                   |

ပထမကော်လံတွင် `provider` ဟူသော စာသားအတိအကျ (စာလုံးအကြီးအသေး မရွေး) ပါရှိသည့် ပထမစာကြောင်းကို header အဖြစ် ကျော်သွားမည်။ အလွတ်စာကြောင်းများနှင့် `#` comment များကိုလည်း ကျော်သွားမည်။

တင်သွင်းမှု modal မှ စတင်အသုံးပြုနိုင်သောဖိုင်ကို ဒေါင်းလုဒ်လုပ်ပါ (**CSV နမူနာပုံစံကို ဒေါင်းလုဒ်လုပ်ရန်**)။ ဥပမာ-

```csv
# OmniRoute provider တင်သွင်းမှု (နေရာစဉ်အလိုက် ကော်လံများ)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` ကဲ့သို့ ဖန်တီးထားသော id သည် node မဟုတ်ပါ။ ထိုအတန်းအတွက် API က `မသိရှိသော သို့မဟုတ် ပံ့ပိုးမထားသော provider` ဟု ပြန်ပေးပြီး modal တွင် ယင်းကို အတန်းအမည်ဘေး၌ ပြသသည်။

## JSON

တူညီသောအကွက်များ (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) ပါဝင်သည့် object များ၏ JSON array ဖြစ်သည်။ CSV နှင့်မတူဘဲ JSON key များတွင် အမည်များ သတ်မှတ်ထားသည်။

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
