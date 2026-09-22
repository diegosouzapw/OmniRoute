# Cursor Image Generation (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute، chat کی طرح اسی provider id یعنی `cursor` (عرف `cu`) کے ذریعے `POST /v1/images/generations` پر Cursor پلان کی **تصویر سازی** فراہم کرتا ہے۔

| فیلڈ                 | قدر                                                                             |
| -------------------- | ------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                        |
| فارمیٹ               | `cursor-agent-image`                                                            |
| توثیق                | chat والا ہی OAuth / API-key کنکشن (`provider_connections.provider = "cursor"`) |
| ماڈلز                | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                       |

## Agent CLI کیوں

OmniRoute میں Cursor chat، `agent.v1.AgentService/Run` (protobuf) استعمال کرتا ہے۔ یہ راستہ پہلے سے موجود کلائنٹ ٹولز (shell، write، …) کو **مسترد** کرتا ہے۔ تصویر سازی Cursor کا مقامی ٹول ہے، جسے seat کے خلاف **`agent` CLI** کے ذریعے چلایا جاتا ہے۔ لہٰذا image handler ایک مقفل prompt اور ہر درخواست کے لیے عارضی workspace کے ساتھ `agent` کو spawn کرتا ہے (community seat bridges کی ساخت کی طرح)، اور پھر OpenAI سے ہم آہنگ `b64_json` واپس کرتا ہے۔

## رسائی کی پابندی (Hard Rules #15 + #17)

یہ واحد `IMAGE_PROVIDERS` فارمیٹ ہے جو child process (یعنی `agent`
binary) کو spawn کرتا ہے۔ چونکہ `POST /v1/images/generations` تقریباً 40 دیگر، spawn نہ کرنے والے
image providers کے ساتھ مشترک ہے جنہیں remote callers جائز طور پر استعمال کرتے ہیں، اس لیے پورا route
`LOCAL_ONLY` کے طور پر درجہ بند **نہیں** ہے — اس کے بجائے `handleCursorAgentImageGeneration` اپنی
gate نافذ کرتا ہے، جو اس قابلِ اعتماد `AUTHZ_HEADER_PEER_LOCALITY` فیصلے کو استعمال کرتی ہے جسے authz pipeline
ہر درخواست پر درج کرتی ہے (حقیقی TCP peer کی بنیاد پر، نہ کہ جعل سازی کے قابل `Host` header پر): صرف
`loopback` اور `lan` callers ہی spawn تک پہنچ سکتے ہیں؛ باقی سب کو (بشمول عوامی tunnel پر دوبارہ استعمال کی گئی
لیک شدہ API key) کسی credential lookup یا process spawn سے پہلے `403` ملتا ہے۔
باقی `LOCAL_ONLY` tier پر لاگو اسی policy کے لیے
`src/server/authz/policies/management.ts` دیکھیں۔

## Concurrency gate ماڈیول کی سطح پر ہے (single-instance کی حد)

`CURSOR_IMG_MAX_CONCURRENT` ایک in-memory counter/queue کے ذریعے نافذ کیا جاتا ہے، جس کا دائرۂ کار
Node module instance (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) تک ہے۔
یہ ایک OmniRoute process کے اندر بیک وقت ہونے والے `agent` spawns کو درست طور پر محدود کرتا ہے، لیکن
ایک ہی Cursor seat استعمال کرنے والے متعدد processes/instances
(مثلاً multi-replica deployment) کے درمیان ہم آہنگی **نہیں** کرتا — ہر instance اپنی الگ حد نافذ کرتا ہے۔
single-instance deployment (جو default ہے) کے لیے یہ حد بالکل درست ہے؛ horizontally scaled
deployments کو ہر instance کے لیے `CURSOR_IMG_MAX_CONCURRENT` محتاط طور پر کم رکھنا چاہیے، یا
Cursor image traffic کو کسی ایک instance کی طرف route کرنا چاہیے۔

## تقاضے

1. dashboard میں منسلک Cursor account (OAuth یا `crsr_…` API key)۔
2. OmniRoute process کے لیے دستیاب Cursor Agent binary:
   - env `CURSOR_AGENT_BIN=/path/to/agent`، یا
   - `~/.local/bin/agent`، یا
   - Cursor connection پر `providerSpecificData.agentBin`۔

اختیاری ترتیبات:

| Env                         | Default                     | مفہوم                               |
| --------------------------- | --------------------------- | ----------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | ہر تصویر کے لیے wall clock وقت      |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | مشترکہ seat کے لیے concurrency gate |
| `CURSOR_IMG_MODEL`          | (درخواست کا model / `auto`) | CLI `--model` کو override کریں      |

## مثال

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

تصویر سازی میں عموماً 1–2 منٹ لگتے ہیں۔ داخلی network path کو ترجیح دیں؛ تقریباً 100s timeouts والے edge proxies ناکام ہو جائیں گے۔

## LiteLLM

ایک image model کو `mode: image_generation`، `api_base: http://omniroute:20128/v1`، اور `model: openai/cursor/auto` کے ساتھ رجسٹر کریں (یا آپ کے LiteLLM version کے لحاظ سے صرف `cursor/auto`)۔
