# Cursor Image Generation (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute, ಚಾಟ್ಗೆ ಬಳಸುವ ಅದೇ ಪೂರೈಕೆದಾರ id ಮೂಲಕ `POST /v1/images/generations` ನಲ್ಲಿ Cursor ಪ್ಲಾನ್ನ **ಚಿತ್ರ ರಚನೆ** ಸೌಲಭ್ಯವನ್ನು ಒದಗಿಸುತ್ತದೆ: `cursor` (ಅಲಿಯಾಸ್ `cu`).

| ಕ್ಷೇತ್ರ              | ಮೌಲ್ಯ                                                                              |
| -------------------- | ---------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                           |
| ಸ್ವರೂಪ               | `cursor-agent-image`                                                               |
| ದೃಢೀಕರಣ              | ಚಾಟ್ನಂತೆಯೇ ಅದೇ OAuth / API-key ಸಂಪರ್ಕ (`provider_connections.provider = "cursor"`) |
| ಮಾದರಿಗಳು             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                          |

## Agent CLI ಏಕೆ

OmniRouteನಲ್ಲಿನ Cursor ಚಾಟ್ `agent.v1.AgentService/Run` (protobuf) ಅನ್ನು ಬಳಸುತ್ತದೆ. ಆ ಮಾರ್ಗವು ಅಂತರ್ನಿರ್ಮಿತ ಕ್ಲೈಂಟ್ ಪರಿಕರಗಳನ್ನು (shell, write, …) **ತಿರಸ್ಕರಿಸುತ್ತದೆ**. ಚಿತ್ರ ರಚನೆಯು ಸೀಟ್ ವಿರುದ್ಧ **`agent` CLI** ಮೂಲಕ ಕಾರ್ಯಗತಗೊಳ್ಳುವ Cursor-ಸ್ಥಳೀಯ ಪರಿಕರವಾಗಿದೆ. ಆದ್ದರಿಂದ ಚಿತ್ರ ಹ್ಯಾಂಡ್ಲರ್ ಲಾಕ್ ಮಾಡಿದ ಪ್ರಾಂಪ್ಟ್ ಮತ್ತು ಪ್ರತಿ ವಿನಂತಿಗೆ ತಾತ್ಕಾಲಿಕ ವರ್ಕ್ಸ್ಪೇಸ್ನೊಂದಿಗೆ `agent` ಅನ್ನು ಸ್ಪಾನ್ ಮಾಡುತ್ತದೆ (ಸಮುದಾಯದ ಸೀಟ್ ಬ್ರಿಡ್ಜ್ಗಳಂತೆಯೇ), ನಂತರ OpenAI-ಹೊಂದಾಣಿಕೆಯ `b64_json` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

## ಪ್ರವೇಶ ನಿರ್ಬಂಧ (ಕಠಿಣ ನಿಯಮಗಳು #15 + #17)

ಮಕ್ಕಳ ಪ್ರಕ್ರಿಯೆಯನ್ನು (`agent` ಬೈನರಿ) ಸ್ಪಾನ್ ಮಾಡುವ ಏಕೈಕ `IMAGE_PROVIDERS` ಸ್ವರೂಪ ಇದಾಗಿದೆ. `POST /v1/images/generations` ಅನ್ನು ದೂರಸ್ಥ ಕರೆಗಾರರು ನ್ಯಾಯಸಮ್ಮತವಾಗಿ ಬಳಸುವ, ಸ್ಪಾನ್ ಮಾಡದ ಸುಮಾರು 40 ಇತರ ಚಿತ್ರ ಪೂರೈಕೆದಾರರು ಹಂಚಿಕೊಳ್ಳುವುದರಿಂದ, ಸಂಪೂರ್ಣ ರೂಟ್ ಅನ್ನು **`LOCAL_ONLY`** ಎಂದು ವರ್ಗೀಕರಿಸಲಾಗಿಲ್ಲ — ಬದಲಿಗೆ, authz ಪೈಪ್ಲೈನ್ ಪ್ರತಿಯೊಂದು ವಿನಂತಿಯ ಮೇಲೆ ಮುದ್ರಿಸುವ ವಿಶ್ವಾಸಾರ್ಹ `AUTHZ_HEADER_PEER_LOCALITY` ತೀರ್ಪನ್ನು ಬಳಸಿಕೊಂಡು `handleCursorAgentImageGeneration` ತನ್ನದೇ ಆದ ಗೇಟ್ ಅನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತದೆ (ನೈಜ TCP ಪೀರ್ನಿಂದ ಪಡೆಯಲಾಗುತ್ತದೆ, ವಂಚಿಸಬಹುದಾದ `Host` ಹೆಡರ್ನಿಂದ ಎಂದಿಗೂ ಅಲ್ಲ): `loopback` ಮತ್ತು `lan` ಕರೆಗಾರರು ಮಾತ್ರ ಸ್ಪಾನ್ ಅನ್ನು ತಲುಪಬಹುದು; ಉಳಿದ ಎಲ್ಲರೂ (ಸೋರಿಕೆಯಾದ API ಕೀಲಿಯನ್ನು ಸಾರ್ವಜನಿಕ ಟನಲ್ ಮೂಲಕ ಮರುಬಳಕೆ ಮಾಡುವ ಸಂದರ್ಭವೂ ಸೇರಿದಂತೆ) ಯಾವುದೇ ರುಜುವಾತು ಹುಡುಕಾಟ ಅಥವಾ ಪ್ರಕ್ರಿಯೆ ಸ್ಪಾನ್ ನಡೆಯುವ ಮೊದಲು `403` ಪಡೆಯುತ್ತಾರೆ. ಉಳಿದ `LOCAL_ONLY` ಹಂತಕ್ಕೆ ಅನ್ವಯಿಸಲಾದ ಅದೇ ನೀತಿಗಾಗಿ `src/server/authz/policies/management.ts` ನೋಡಿ.

## ಸಮಕಾಲಿಕತೆ ಗೇಟ್ ಮಾಡ್ಯೂಲ್ ಮಟ್ಟದಲ್ಲಿದೆ (ಏಕ-ಇನ್ಸ್ಟೆನ್ಸ್ ಮಿತಿ)

`CURSOR_IMG_MAX_CONCURRENT` ಅನ್ನು Node ಮಾಡ್ಯೂಲ್ ಇನ್ಸ್ಟೆನ್ಸ್ಗೆ ಸೀಮಿತವಾದ ಇನ್-ಮೆಮೊರಿ ಕೌಂಟರ್/ಕ್ಯೂ ಮೂಲಕ ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತದೆ (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). ಇದು ಒಂದೇ OmniRoute ಪ್ರಕ್ರಿಯೆಯೊಳಗಿನ ಸಮಕಾಲೀನ `agent` ಸ್ಪಾನ್ಗಳನ್ನು ಸರಿಯಾಗಿ ಮಿತಿಗೊಳಿಸುತ್ತದೆ, ಆದರೆ ಒಂದೇ Cursor ಸೀಟ್ ಅನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಅನೇಕ ಪ್ರಕ್ರಿಯೆಗಳು/ಇನ್ಸ್ಟೆನ್ಸ್ಗಳ ನಡುವೆ (ಉದಾ. ಬಹು-ರೆಪ್ಲಿಕಾ ನಿಯೋಜನೆ) ಸಮನ್ವಯಗೊಳಿಸುವುದಿಲ್ಲ — ಪ್ರತಿಯೊಂದು ಇನ್ಸ್ಟೆನ್ಸ್ ತನ್ನದೇ ಆದ ಸ್ವತಂತ್ರ ಮಿತಿಯನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತದೆ. ಏಕ-ಇನ್ಸ್ಟೆನ್ಸ್ ನಿಯೋಜನೆಗೆ (ಡೀಫಾಲ್ಟ್) ಇದು ನಿಖರವಾಗಿದೆ; ಸಮತಲವಾಗಿ ಸ್ಕೇಲ್ ಮಾಡಿದ ನಿಯೋಜನೆಗಳು ಪ್ರತಿ ಇನ್ಸ್ಟೆನ್ಸ್ಗೆ `CURSOR_IMG_MAX_CONCURRENT` ಅನ್ನು ಮಿತವಾಗಿ ಇರಿಸಬೇಕು ಅಥವಾ Cursor ಚಿತ್ರ ಟ್ರಾಫಿಕ್ ಅನ್ನು ಒಂದೇ ಇನ್ಸ್ಟೆನ್ಸ್ಗೆ ರೂಟ್ ಮಾಡಬೇಕು.

## ಅವಶ್ಯಕತೆಗಳು

1. ಡ್ಯಾಶ್ಬೋರ್ಡ್ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಲಾದ Cursor ಖಾತೆ (OAuth ಅಥವಾ `crsr_…` API ಕೀ).
2. OmniRoute ಪ್ರಕ್ರಿಯೆಗೆ ಲಭ್ಯವಿರುವ Cursor Agent ಬೈನರಿ:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, ಅಥವಾ
   - `~/.local/bin/agent`, ಅಥವಾ
   - Cursor ಸಂಪರ್ಕದಲ್ಲಿನ `providerSpecificData.agentBin`.

ಐಚ್ಛಿಕ ಹೊಂದಾಣಿಕೆ:

| Env                         | ಡೀಫಾಲ್ಟ್                 | ಅರ್ಥ                           |
| --------------------------- | ------------------------ | ------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | ಪ್ರತಿ ಚಿತ್ರದ ಒಟ್ಟು ಸಮಯ ಮಿತಿ    |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | ಹಂಚಿಕೊಂಡ ಸೀಟ್ನ ಸಮಕಾಲಿಕತೆ ಗೇಟ್  |
| `CURSOR_IMG_MODEL`          | (ವಿನಂತಿಯ ಮಾದರಿ / `auto`) | CLI `--model` ಅನ್ನು ಅತಿಕ್ರಮಿಸಿ |

## ಉದಾಹರಣೆ

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

ರಚನೆಗೆ ಸಾಮಾನ್ಯವಾಗಿ 1–2 ನಿಮಿಷಗಳು ಬೇಕಾಗುತ್ತವೆ. ಆಂತರಿಕ ನೆಟ್ವರ್ಕ್ ಮಾರ್ಗಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಿ; ಸುಮಾರು 100 ಸೆಕೆಂಡ್ಗಳ ಕಾಲಾವಧಿ ಮಿತಿಯನ್ನು ಹೊಂದಿರುವ ಎಡ್ಜ್ ಪ್ರಾಕ್ಸಿಗಳು ವಿಫಲಗೊಳ್ಳುತ್ತವೆ.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, ಮತ್ತು `model: openai/cursor/auto` (ಅಥವಾ ನಿಮ್ಮ LiteLLM ಆವೃತ್ತಿಯನ್ನು ಅವಲಂಬಿಸಿ ಕೇವಲ `cursor/auto`) ಜೊತೆಗೆ ಚಿತ್ರ ಮಾದರಿಯನ್ನು ನೋಂದಾಯಿಸಿ.
