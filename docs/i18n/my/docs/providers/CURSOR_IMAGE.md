# Cursor Image Generation (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute သည် chat နှင့် တူညီသော provider id ဖြစ်သည့် `cursor` (alias `cu`) ကို အသုံးပြု၍ `POST /v1/images/generations` တွင် Cursor plan ၏ **ပုံဖန်တီးခြင်း** ကို ပံ့ပိုးပေးသည်။

| အကွက်                | တန်ဖိုး                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                    |
| ဖော်မတ်              | `cursor-agent-image`                                                                        |
| အထောက်အထားစိစစ်ခြင်း | Chat နှင့် တူညီသော OAuth / API-key ချိတ်ဆက်မှု (`provider_connections.provider = "cursor"`) |
| မော်ဒယ်များ          | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                   |

## Agent CLI ကို အသုံးပြုရသည့်အကြောင်းရင်း

OmniRoute ရှိ Cursor chat သည် `agent.v1.AgentService/Run` (protobuf) ကို အသုံးပြုသည်။ ထိုလမ်းကြောင်းသည် built-in client tools များ (shell, write၊ …) ကို **ငြင်းပယ်သည်**။ ပုံဖန်တီးခြင်းသည် seat ကို အသုံးပြု၍ **`agent` CLI** မှ လုပ်ဆောင်ပေးသည့် Cursor-native tool တစ်ခုဖြစ်သည်။ ထို့ကြောင့် image handler သည် ကန့်သတ်ထားသော prompt နှင့် request တစ်ခုချင်းစီအတွက် ယာယီ workspace တစ်ခုဖြင့် `agent` ကို spawn လုပ်ပြီး (community seat bridges များနှင့် ပုံစံတူ) ထို့နောက် OpenAI နှင့် ကိုက်ညီသော `b64_json` ကို ပြန်ပေးသည်။

## ဝင်ရောက်ခွင့်ကန့်သတ်ချက် (Hard Rules #15 + #17)

ဤဖော်မတ်သည် child process (`agent` binary) ကို spawn လုပ်သည့် တစ်ခုတည်းသော `IMAGE_PROVIDERS` ဖော်မတ်ဖြစ်သည်။ `POST /v1/images/generations` ကို remote caller များက တရားဝင်အသုံးပြုနေသော spawn မလုပ်သည့် အခြား image provider ~40 ခုနှင့် မျှဝေအသုံးပြုထားသောကြောင့် route တစ်ခုလုံးကို **`LOCAL_ONLY`** အဖြစ် မသတ်မှတ်ထားပါ — ထိုအစား `handleCursorAgentImageGeneration` သည် request တိုင်းတွင် authz pipeline က သတ်မှတ်ပေးထားသော ယုံကြည်စိတ်ချရသည့် `AUTHZ_HEADER_PEER_LOCALITY` ဆုံးဖြတ်ချက်ကို အသုံးပြု၍ ၎င်း၏ကိုယ်ပိုင် gate ကို ပြဋ္ဌာန်းသည် (အတုပြုလုပ်နိုင်သည့် `Host` header မှ မဟုတ်ဘဲ တကယ့် TCP peer မှ ရရှိသည်)။ `loopback` နှင့် `lan` caller များသာ spawn ကို ဝင်ရောက်နိုင်ပြီး အခြားအရာအားလုံး (အများသုံး tunnel မှတစ်ဆင့် ပြန်လည်အသုံးပြုထားသော ပေါက်ကြားသည့် API key အပါအဝင်) သည် credential lookup သို့မဟုတ် process spawn တစ်ခုခု မဖြစ်ပွားမီ `403` ကို ရရှိမည်ဖြစ်သည်။ ကျန်ရှိသော `LOCAL_ONLY` အဆင့်အတွက် တူညီသည့် policy ကို အသုံးပြုထားပုံကို `src/server/authz/policies/management.ts` တွင် ကြည့်ပါ။

## Concurrency gate သည် module အဆင့်တွင်ရှိသည် (instance တစ်ခုတည်းအတွက်သာ ကန့်သတ်ချက်)

`CURSOR_IMG_MAX_CONCURRENT` ကို Node module instance (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) အတွင်း သီးသန့်သတ်မှတ်ထားသော in-memory counter/queue ဖြင့် ပြဋ္ဌာန်းထားသည်။ ၎င်းသည် OmniRoute process တစ်ခုအတွင်း တစ်ပြိုင်နက်တည်း လုပ်ဆောင်နေသော `agent` spawn များကို မှန်ကန်စွာ ကန့်သတ်ပေးသော်လည်း တူညီသော Cursor seat ကို မျှဝေအသုံးပြုသည့် process/instance များစွာအကြား (ဥပမာ multi-replica deployment) **ညှိနှိုင်းပေးခြင်းမရှိပါ** — instance တစ်ခုချင်းစီသည် ၎င်း၏ကိုယ်ပိုင် သီးခြားကန့်သတ်ချက်ကို ပြဋ္ဌာန်းသည်။ Instance တစ်ခုတည်းပါဝင်သော deployment (မူလပုံသေ) အတွက် ဤကန့်သတ်ချက်သည် တိကျသည်။ Horizontally scaled deployment များတွင် instance တစ်ခုချင်းစီအတွက် `CURSOR_IMG_MAX_CONCURRENT` ကို အနိမ့်ဘက်တွင် ထိန်းသိမ်းထားသင့်သည်၊ သို့မဟုတ် Cursor image traffic ကို instance တစ်ခုတည်းသို့ route လုပ်သင့်သည်။

## လိုအပ်ချက်များ

1. Dashboard တွင် ချိတ်ဆက်ထားသော Cursor account တစ်ခု (OAuth သို့မဟုတ် `crsr_…` API key)။
2. OmniRoute process က အသုံးပြုနိုင်သော Cursor Agent binary:
   - env `CURSOR_AGENT_BIN=/path/to/agent`၊ သို့မဟုတ်
   - `~/.local/bin/agent`၊ သို့မဟုတ်
   - Cursor connection ရှိ `providerSpecificData.agentBin`။

စိတ်ကြိုက်ချိန်ညှိနိုင်သော အရာများ-

| Env                         | မူလတန်ဖိုး               | အဓိပ္ပာယ်                                |
| --------------------------- | ------------------------ | ---------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | ပုံတစ်ပုံချင်းစီအတွက် စုစုပေါင်းကြာချိန် |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Shared-seat concurrency gate             |
| `CURSOR_IMG_MODEL`          | (request model / `auto`) | CLI `--model` ကို အစားထိုးသတ်မှတ်ရန်     |

## ဥပမာ

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

ပုံဖန်တီးခြင်းသည် ပုံမှန်အားဖြင့် 1–2 မိနစ်ခန့် ကြာသည်။ Internal network လမ်းကြောင်းကို ဦးစားပေးအသုံးပြုပါ။ ~100s timeout ရှိသော edge proxy များတွင် မအောင်မြင်နိုင်ပါ။

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1` နှင့် `model: openai/cursor/auto` တို့ဖြင့် image model တစ်ခုကို မှတ်ပုံတင်ပါ (သို့မဟုတ် သင်၏ LiteLLM version ပေါ် မူတည်၍ `cursor/auto` ကို တိုက်ရိုက်အသုံးပြုပါ)။
