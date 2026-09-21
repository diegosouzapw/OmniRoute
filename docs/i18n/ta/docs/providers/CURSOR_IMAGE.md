# Cursor Image Generation (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute, அரட்டைக்கு பயன்படுத்தப்படும் அதே provider id ஆன `cursor` (மாற்றுப்பெயர் `cu`) மூலம் `POST /v1/images/generations` இல் Cursor திட்டத்தின் **பட உருவாக்கத்தை** வழங்குகிறது.

| புலம்                | மதிப்பு                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` id | `cursor`                                                                             |
| வடிவம்               | `cursor-agent-image`                                                                 |
| அங்கீகாரம்           | அரட்டைக்கான அதே OAuth / API-key இணைப்பு (`provider_connections.provider = "cursor"`) |
| மாதிரிகள்            | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                            |

## ஏன் Agent CLI

OmniRoute இல் உள்ள Cursor அரட்டை `agent.v1.AgentService/Run` (protobuf) ஐப் பயன்படுத்துகிறது. அந்தப் பாதை உள்ளமைக்கப்பட்ட கிளையன்ட் கருவிகளை (shell, write, …) **நிராகரிக்கிறது**. பட உருவாக்கம் என்பது seat-க்கு எதிராக **`agent` CLI** மூலம் இயக்கப்படும் Cursor-இன் சொந்தக் கருவியாகும். எனவே படக் கையாளுநர், பூட்டப்பட்ட prompt மற்றும் ஒவ்வொரு கோரிக்கைக்கும் தனித்தற்காலிக workspace உடன் `agent` ஐத் தொடங்குகிறது (சமூக seat bridge-களின் அதே அமைப்பு), பின்னர் OpenAI-இணக்கமான `b64_json` ஐ வழங்குகிறது.

## அணுகல் கட்டுப்பாடு (கடுமையான விதிகள் #15 + #17)

child process (`agent`
binary) ஒன்றைத் தொடங்கும் ஒரே `IMAGE_PROVIDERS` வடிவம் இதுவாகும். `POST /v1/images/generations` என்பது தொலைநிலை அழைப்பாளர்கள் சட்டபூர்வமாகப் பயன்படுத்தும், process-ஐத் தொடங்காத ~40 பிற
பட provider-களாலும் பகிரப்படுவதால், முழு route-உம் **`LOCAL_ONLY`** என
வகைப்படுத்தப்படவில்லை — அதற்கு பதிலாக `handleCursorAgentImageGeneration`, ஒவ்வொரு
கோரிக்கையிலும் authz pipeline பதிக்கும் நம்பகமான `AUTHZ_HEADER_PEER_LOCALITY` தீர்ப்பைப்
பயன்படுத்தி அதன் சொந்த gate-ஐ அமல்படுத்துகிறது (இது உண்மையான TCP peer-இலிருந்து பெறப்படுகிறது; போலியாக்கக்கூடிய `Host` header-இலிருந்து ஒருபோதும் பெறப்படாது): `loopback`
மற்றும் `lan` அழைப்பாளர்கள் மட்டுமே process தொடக்கத்தை அணுக முடியும்; மற்ற அனைவரும் (பொது tunnel வழியாக மீண்டும் பயன்படுத்தப்படும் கசிந்த
API key உட்பட) எந்த credential தேடலோ
process தொடக்கமோ நிகழ்வதற்கு முன்பே `403` பெறுவார்கள். மீதமுள்ள `LOCAL_ONLY` அடுக்கிற்குப் பயன்படுத்தப்படும் இதே
கொள்கைக்கு `src/server/authz/policies/management.ts` ஐப் பார்க்கவும்.

## Concurrency gate module-level ஆகும் (ஒற்றை-instance வரம்பு)

`CURSOR_IMG_MAX_CONCURRENT`, Node module instance-க்கு உட்பட்ட in-memory counter/queue மூலம் அமல்படுத்தப்படுகிறது
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
இது ஒரு OmniRoute process-க்குள் ஒரே நேரத்தில் நடைபெறும் `agent` தொடக்கங்களைச் சரியாகக் கட்டுப்படுத்துகிறது, ஆனால்
ஒரே Cursor seat-ஐப் பகிரும் பல process/instance-களுக்கு இடையே
(எ.கா. multi-replica deployment) ஒருங்கிணைக்காது — ஒவ்வொரு instance-உம் அதன் சொந்தத் தனித்தனி வரம்பை அமல்படுத்துகிறது.
ஒற்றை-instance deployment-க்கு (இயல்புநிலை) இது துல்லியமானது; கிடைமட்டமாக அளவிடப்பட்ட
deployment-கள் ஒவ்வொரு instance-க்கும் `CURSOR_IMG_MAX_CONCURRENT` ஐக் குறைவாக வைத்திருக்க வேண்டும் அல்லது
Cursor படப் போக்குவரத்தை ஒரே instance-க்கு அனுப்ப வேண்டும்.

## தேவைகள்

1. dashboard-இல் இணைக்கப்பட்ட Cursor கணக்கு (OAuth அல்லது `crsr_…` API key).
2. OmniRoute process-க்கு Cursor Agent binary கிடைக்க வேண்டும்:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, அல்லது
   - `~/.local/bin/agent`, அல்லது
   - Cursor இணைப்பில் `providerSpecificData.agentBin`.

விருப்பத் தேர்வான சரிசெய்தல்கள்:

| Env                         | இயல்புநிலை                 | பொருள்                                 |
| --------------------------- | -------------------------- | -------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                   | ஒவ்வொரு படத்திற்குமான மொத்த நேர வரம்பு |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                        | பகிரப்பட்ட seat-க்கான concurrency gate |
| `CURSOR_IMG_MODEL`          | (கோரிக்கை மாதிரி / `auto`) | CLI `--model` ஐ மேலெழுதும்             |

## எடுத்துக்காட்டு

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

உருவாக்கத்திற்கு பொதுவாக 1–2 நிமிடங்கள் ஆகும். உள் நெட்வொர்க் பாதையைப் பயன்படுத்துவது சிறந்தது; ~100s timeout கொண்ட edge proxy-கள் தோல்வியடையும்.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, மற்றும் `model: openai/cursor/auto` (அல்லது உங்கள் LiteLLM பதிப்பைப் பொறுத்து வெறும் `cursor/auto`) ஆகியவற்றுடன் ஒரு பட மாதிரியைப் பதிவு செய்யவும்.
