# Chaos Mode (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ಡ್ಯಾಶ್ಬೋರ್ಡ್:** **Chaos Mode** (ಪಾರ್ಶ್ವಪಟ್ಟಿ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್) · `POST /api/skills/collect/chaos` (API ಕೀ)  
> **ಮೂಲ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ಒಂದೇ ಕಾರ್ಯವನ್ನು ಏಕಕಾಲದಲ್ಲಿ ಹಲವಾರು ಪೂರೈಕೆದಾರರಿಗೆ ಕಳುಹಿಸುತ್ತದೆ** — ಭಾಗವಹಿಸುವ ಪ್ರತಿಯೊಂದು ಪೂರೈಕೆದಾರರು
ಒಂದು ಮಾದರಿ ನಿದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತಾರೆ ಮತ್ತು ನೀವು ಎಲ್ಲಾ ಉತ್ತರಗಳನ್ನು ಅಕ್ಕಪಕ್ಕದಲ್ಲಿ (ಅಥವಾ ಸರಪಳಿಯಾಗಿ) ಪಡೆಯುತ್ತೀರಿ. ಇದು
ಬಹು-ಮಾದರಿ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಮೇಲ್ಮೈ, ರೂಟಿಂಗ್ ತಂತ್ರವಲ್ಲ: ನಿಮ್ಮ ಸಾಮಾನ್ಯ `/v1/chat/completions`
ಟ್ರಾಫಿಕ್ ಮೇಲೆ ಇದು ಎಂದಿಗೂ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.

**ಅಸಂದಿಗ್ಧೀಕರಣ — ಹೆಸರಿನಲ್ಲಿ "chaos" ಇರುವ ಮೂರು ವಿಭಿನ್ನ ವಿಷಯಗಳನ್ನು ಒದಗಿಸಲಾಗಿದೆ:**

| ವಿಷಯ                 | ಅದು ಏನು                                                                                                               | ದಸ್ತಾವೇಜು ಇರುವ ಸ್ಥಳ                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**       | ಇಲ್ಲಿ ವಿವರಿಸಿರುವ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟ + API: ಒಂದು ಕಾರ್ಯವನ್ನು ಅನೇಕ ಪೂರೈಕೆದಾರರಿಗೆ ಹಂಚುವುದು (ಸಮಾನಾಂತರ ಅಥವಾ ಸಹಯೋಗಾತ್ಮಕ).      | ಈ ಮಾರ್ಗದರ್ಶಿ                                 |
| `auto/chaos`         | ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ಪರೀಕ್ಷೆಗಾಗಿ ದೋಷ-ಇಂಜೆಕ್ಷನ್ ಸ್ಕೋರಿಂಗ್ ತೂಕಗಳನ್ನು ಹೊಂದಿರುವ Auto-Combo ಮಾದರಿ id. ಕಾನ್ಫಿಗರ್ ಮಾಡಲು ಏನೂ ಇಲ್ಲ. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos ಕಾಂಬೊ ಕಾನ್ಫಿಗ್ | `config.chaos.enabled` ಹೊಂದಿರುವ ಶಾಶ್ವತ ಕಾಂಬೊ, ಐಚ್ಛಿಕ ತೀರ್ಪುಗಾರ ಮಾದರಿಯೊಂದಿಗೆ ಒಂದು ಫಲಕಕ್ಕೆ ವಿಸ್ತರಿಸುತ್ತದೆ (API-ಮಾತ್ರ).  | `open-sse/services/autoCombo/chaosEngine.ts` |

## ಸೆಟಪ್

1. **ಡ್ಯಾಶ್ಬೋರ್ಡ್ → Chaos Mode** (`/dashboard/chaos`) ತೆರೆಯಿರಿ.
2. ಅದನ್ನು **ಆನ್** ಮಾಡಿ — Chaos Mode ಅನ್ನು **ಡೀಫಾಲ್ಟ್ ಆಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ** ಒದಗಿಸಲಾಗುತ್ತದೆ
   (`src/lib/chaos/chaosConfig.ts` ನಲ್ಲಿ `enabled: false`). ನಿಷ್ಕ್ರಿಯವಾಗಿರುವಾಗ, `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` ಎಂದು ಉತ್ತರಿಸುತ್ತದೆ.
3. ಭಾಗವಹಿಸುವವರು ಮತ್ತು ಡೀಫಾಲ್ಟ್ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ (ಸೆಟ್ಟಿಂಗ್ಗಳ ಸ್ಟೋರ್ ಮೂಲಕ ಪ್ರತಿ ನಿದರ್ಶನಕ್ಕೆ ಶಾಶ್ವತಗೊಳಿಸಲಾಗುತ್ತದೆ):

   | ಕ್ಷೇತ್ರ             | ಅರ್ಥ                                                                     | ಡೀಫಾಲ್ಟ್ / ಮಿತಿಗಳು                             |
   | ------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
   | `enabled`           | ಪ್ರಧಾನ ಸ್ವಿಚ್                                                            | `false`                                        |
   | `defaultMode`       | `parallel` ಅಥವಾ `collaborative` (ಕೆಳಗೆ ನೋಡಿ)                             | `parallel`                                     |
   | `providerOverrides` | ಪ್ರತಿ-ಪೂರೈಕೆದಾರ ಭಾಗವಹಿಸುವಿಕೆ (`providerId`, ಐಚ್ಛಿಕ `modelId`, `enabled`) | ಖಾಲಿ = ಪ್ರತಿಯೊಂದು ಸಕ್ರಿಯ ಪೂರೈಕೆದಾರ, ಗರಿಷ್ಠ 200 |
   | `systemPrompt`      | ಅಂತರ್ನಿರ್ಮಿತ Chaos ಸಿಸ್ಟಮ್ ಪ್ರಾಂಪ್ಟ್ಗೆ ಅತಿಕ್ರಮಣ                          | ಐಚ್ಛಿಕ, ಗರಿಷ್ಠ 10 000 ಅಕ್ಷರಗಳು                 |
   | `timeoutMs`         | ಪ್ರತಿ ಮಾದರಿ ಕರೆಗೆ ಗರಿಷ್ಠ ಸಮಯ                                             | `120000` (5 000–600 000)                       |
   | `maxTokens`         | ಪ್ರತಿ ಮಾದರಿ ಕರೆಗೆ `max_tokens`                                           | `4096` (256–128 000)                           |

4. **ಪುಟದಿಂದಲೇ ಪರೀಕ್ಷೆಯನ್ನು ಚಲಾಯಿಸಿ** — ಫಲಿತಾಂಶಗಳ ಫಲಕವು ಪ್ರತಿಯೊಂದು ಪೂರೈಕೆದಾರರ ಉತ್ತರ,
   ಸ್ಥಿತಿ ಮತ್ತು ಅವಧಿಯನ್ನು ತೋರಿಸುತ್ತದೆ.

## ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಮೋಡ್ಗಳು

- **`parallel`** — ಪ್ರತಿಯೊಂದು ಮಾದರಿಯೂ ಒಂದೇ ಕಾರ್ಯವನ್ನು ಏಕಕಾಲದಲ್ಲಿ ಪಡೆಯುತ್ತದೆ; ನೀವು ಎಲ್ಲಾ ಉತ್ತರಗಳನ್ನು
  ಸ್ವತಂತ್ರವಾಗಿ ಪಡೆಯುತ್ತೀರಿ.
- **`collaborative`** — ಮಾದರಿಗಳು **ಸರಪಳಿಯಲ್ಲಿ** ಚಲಿಸುತ್ತವೆ: ಪ್ರತಿಯೊಂದು ಮಾದರಿಯೂ ಹಿಂದಿನ ಮಾದರಿಯ ಔಟ್ಪುಟ್ ಅನ್ನು ನೋಡಿ,
  ಅದನ್ನು ಪರಿಷ್ಕರಿಸಲು, ವಿಸ್ತರಿಸಲು, ವಿಮರ್ಶಿಸಲು ಅಥವಾ ಪರ್ಯಾಯವನ್ನು ನೀಡಲು ಸೂಚನೆ ಪಡೆಯುತ್ತದೆ. ಪ್ರತಿಕ್ರಿಯೆಯ `summary` ಕ್ಷೇತ್ರವು
  ಯಶಸ್ವಿ ಔಟ್ಪುಟ್ಗಳನ್ನು ಸರಪಳಿಯ ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸುತ್ತದೆ (`parallel` ಚಾಲನೆಗಳು `summary` ಹೊಂದಿರುವುದಿಲ್ಲ).

## API

### `POST /api/chaos/run` — ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್

ಕುಕಿಯಿಂದ ದೃಢೀಕರಿಸಲಾದದ್ದು (ನಿರ್ವಹಣಾ ಸೆಷನ್ — ನೋಡಿ
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟದಿಂದ ಬಳಸಲಾಗುತ್ತದೆ.

```jsonc
// ವಿನಂತಿಯ ಭಾಗ
{
  "task": "Compare approaches to X", // ಅಗತ್ಯವಿದೆ
  "providers": ["glm", "kimi"], // ಐಚ್ಛಿಕ ಫಿಲ್ಟರ್
  "mode": "parallel", // ಐಚ್ಛಿಕ — defaultMode ಅನ್ನು ಅತಿಕ್ರಮಿಸುತ್ತದೆ
  "systemPrompt": "…", // ಐಚ್ಛಿಕ ಅತಿಕ್ರಮಣ
  "maxTokens": 4096, // ಐಚ್ಛಿಕ ಅತಿಕ್ರಮಣ
}
```

### `POST /api/skills/collect/chaos` — API ಕೀ

ಬಾಹ್ಯ ಕರೆಗಾರರಿಗಾಗಿ Bearer-token ರೂಪಾಂತರ. ಕೀ **Chaos Mode ಅನುಮತಿಯನ್ನು**
(`chaosModeEnabled`) ಹೊಂದಿರಬೇಕು; ಇದು **ಡೀಫಾಲ್ಟ್ ಆಗಿ ಆಫ್ ಆಗಿರುತ್ತದೆ** — ಪ್ರತಿ ಕೀಗೆ ಇದನ್ನು
**ಡ್ಯಾಶ್ಬೋರ್ಡ್ → API Manager → ಕೀ ಸಂಪಾದಿಸಿ → ಅನುಮತಿಗಳು → Chaos Mode** ನಲ್ಲಿ ಸಕ್ರಿಯಗೊಳಿಸಿ. ಮೇಲಿನಂತೆಯೇ ಅದೇ ವಿನಂತಿಯ ಭಾಗವನ್ನು ಬಳಸುತ್ತದೆ.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

ಎರಡೂ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು ಒಂದೇ ಸ್ವರೂಪವನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತವೆ:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative ಮೋಡ್ನಲ್ಲಿ ಮಾತ್ರ
}
```

## ಸಮಸ್ಯೆ ನಿವಾರಣೆ

- **`400 Chaos Mode is not enabled`** — ಮೇಲಿನ ಹಂತ 2 ನೋಡಿ: ಜಾಗತಿಕ ಸ್ವಿಚ್ ಆಫ್ ಆಗಿದೆ.
- **`/api/skills/collect/chaos` ನಲ್ಲಿ API ಕೀ ತಿರಸ್ಕರಿಸಲ್ಪಡುತ್ತದೆ** — ಕೀ ಪ್ರತಿ-ಕೀ
  `chaosModeEnabled` ಅನುಮತಿಯನ್ನು ಹೊಂದಿಲ್ಲ (ಡೀಫಾಲ್ಟ್ ಆಗಿ ಆಫ್; ಇದು ಒಂದು ಸೆಟ್ಟಿಂಗ್, ದೋಷವಲ್ಲ).
- **ನೀವು ನಿರೀಕ್ಷಿಸಿದ್ದ ಪೂರೈಕೆದಾರರು ಫಲಿತಾಂಶಗಳಲ್ಲಿ ಕಾಣಿಸುತ್ತಿಲ್ಲ** — Chaos Mode ಪುಟದಲ್ಲಿ `providerOverrides`
  ಪರಿಶೀಲಿಸಿ (ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದ ಅತಿಕ್ರಮಣವು ಅದನ್ನು ಹೊರಗಿಡುತ್ತದೆ) ಮತ್ತು ಪೂರೈಕೆದಾರರ ಸಂಪರ್ಕವು
  ಸಕ್ರಿಯವಾಗಿದೆಯೇ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ.
