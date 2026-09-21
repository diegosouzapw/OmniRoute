# Monitoring & Observability Guide (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **ಸಂಕ್ಷಿಪ್ತವಾಗಿ**: OmniRoute ಅಂತರ್ನಿರ್ಮಿತ ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ, ಪೂರೈಕೆದಾರ ಆಟೋಪೈಲಟ್, ಕೋಟಾ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ವೀಕ್ಷಣೀಯತಾ ಹುಕ್ಗಳೊಂದಿಗೆ ಬರುತ್ತದೆ. ಈ ಮಾರ್ಗದರ್ಶಿ ಡ್ಯಾಶ್ಬೋರ್ಡ್, ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸಮಸ್ಯೆ ನಿವಾರಣೆಯನ್ನು ಒಳಗೊಂಡಿದೆ.

**ಮೂಲಗಳು:**

- `src/lib/monitoring/observability.ts` — ವೀಕ್ಷಣೀಯತಾ ಸ್ನ್ಯಾಪ್ಶಾಟ್
- `src/lib/monitoring/comboHealthAutopilot.ts` — ಕಾಂಬೊ ಆರೋಗ್ಯ ಆಟೋಪೈಲಟ್
- `src/lib/monitoring/providerHealthAutopilot.ts` — ಪೂರೈಕೆದಾರ ಆಟೋಪೈಲಟ್
- `src/lib/monitoring/providerHealthMatrix.ts` — ಪೂರೈಕೆದಾರ ಆರೋಗ್ಯ ಮ್ಯಾಟ್ರಿಕ್ಸ್
- `src/lib/localHealthCheck.ts` — ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ
- `src/lib/tokenHealthCheck.ts` — ಟೋಕನ್ ರಿಫ್ರೆಶ್ ಆರೋಗ್ಯ
- `src/lib/proxyHealth.ts` — ಪ್ರಾಕ್ಸಿ ಆರೋಗ್ಯ ಕ್ಯಾಶ್ (PROXY_GUIDE.md ನಲ್ಲಿ ವಿವರಿಸಲಾಗಿದೆ)

---

## ಅವಲೋಕನ

OmniRoute **3 ಮೇಲ್ವಿಚಾರಣಾ ಪದರಗಳನ್ನು** ಹೊಂದಿದೆ:

```
┌──────────────────────────────────────────────────────────────┐
│  ಪದರ 1: ಸಿಸ್ಟಮ್ ಆರೋಗ್ಯ (ಸರ್ವರ್-ಮಟ್ಟ)                         │
│  ├─ localHealthCheck.ts — DB, ಪೋರ್ಟ್ಗಳು, ಸ್ಥಳೀಯ ಅವಲಂಬನೆಗಳು   │
│  ├─ db/healthCheck.ts — ಸಮಗ್ರತೆ, FK, ಅನಾಥ ಆರ್ಟಿಫ್ಯಾಕ್ಟ್ಗಳು    │
│  └─ ಡ್ಯಾಶ್ಬೋರ್ಡ್: /dashboard/health                           │
├──────────────────────────────────────────────────────────────┤
│  ಪದರ 2: ಪೂರೈಕೆದಾರ ಆರೋಗ್ಯ (ಪ್ರತಿ-ಪೂರೈಕೆದಾರ ಸ್ಥಿತಿಸ್ಥಾಪಕತೆ)   │
│  ├─ providerHealthAutopilot.ts — ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್, ಕೂಲ್ಡೌನ್ಗಳು │
│  ├─ providerHealthMatrix.ts — ಪೂರೈಕೆದಾರ/ಮಾದರಿ ಪ್ರಕಾರ ಆರೋಗ್ಯ ಸ್ಕೋರ್ಗಳು │
│  └─ ಡ್ಯಾಶ್ಬೋರ್ಡ್: /dashboard/providers                        │
├──────────────────────────────────────────────────────────────┤
│  ಪದರ 3: ಲೈವ್ ವೀಕ್ಷಣೀಯತೆ (ರನ್ಟೈಮ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್ಗಳು)          │
│  ├─ observability.ts — ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ಗಳು, ಸೆಷನ್ಗಳು, ಕೋಟಾ   │
│  ├─ tokenHealthCheck.ts — OAuth ಟೋಕನ್ ರಿಫ್ರೆಶ್ ಆರೋಗ್ಯ         │
│  └─ MCP ಪರಿಕರಗಳು: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟಗಳು

### `/dashboard/health` (ಸಿಸ್ಟಮ್ ಆರೋಗ್ಯ)

ಉನ್ನತ-ಮಟ್ಟದ ಆರೋಗ್ಯ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಈ ಕೆಳಗಿನವುಗಳನ್ನು ತೋರಿಸುತ್ತದೆ:

| ವಿಭಾಗ                | ಇದು ತೋರಿಸುವುದು                                             |
| -------------------- | ---------------------------------------------------------- |
| **ಸರ್ವರ್ ಸ್ಥಿತಿ**    | ಅಪ್ಟೈಮ್, ಆವೃತ್ತಿ, ಪೋರ್ಟ್, ಸಕ್ರಿಯ ಸಂಪರ್ಕಗಳು                 |
| **ಡೇಟಾಬೇಸ್**         | ಸಂಪರ್ಕ, ಸಮಗ್ರತೆ, WAL ಗಾತ್ರ, ಇತ್ತೀಚಿನ ಮೈಗ್ರೇಷನ್ಗಳು          |
| **ಪೂರೈಕೆದಾರ ಸಾರಾಂಶ** | ಸಕ್ರಿಯ ಸಂಖ್ಯೆ, ಆರೋಗ್ಯಕರ ಸಂಖ್ಯೆ, ತೆರೆದಿರುವ ಬ್ರೇಕರ್ಗಳ ಸಂಖ್ಯೆ |
| **ಕೋಟಾ ಮಾನಿಟರ್ಗಳು**  | ಸಕ್ರಿಯ ಸೆಷನ್ಗಳು, ಎಚ್ಚರಿಕೆ ನೀಡುವಿಕೆ, ಖಾಲಿಯಾದವು              |
| **ಇತ್ತೀಚಿನ ದೋಷಗಳು**  | ಸ್ಟ್ಯಾಕ್ ಟ್ರೇಸ್ಗಳೊಂದಿಗೆ ಕೊನೆಯ 10 ದೋಷಗಳು                    |
| **ಸಂಪನ್ಮೂಲ ಬಳಕೆ**    | ಮೆಮೊರಿ, CPU, ಹೀಪ್ ಒತ್ತಡದ ಸೂಚಕ                              |

### `/dashboard/providers` (ಪೂರೈಕೆದಾರ ಆರೋಗ್ಯ)

ಪ್ರತಿ-ಪೂರೈಕೆದಾರ ಡ್ಯಾಶ್ಬೋರ್ಡ್:

| ಕಾಲಮ್     | ವಿವರಣೆ                                  |
| --------- | --------------------------------------- |
| ಪೂರೈಕೆದಾರ | ಪೂರೈಕೆದಾರ ID + ಪ್ರದರ್ಶನ ಹೆಸರು           |
| ಆರೋಗ್ಯ    | ಹಸಿರು/ಹಳದಿ/ಕೆಂಪು ಸ್ಥಿತಿ                 |
| ಸರ್ಕ್ಯೂಟ್ | ತೆರೆದ/ಮುಚ್ಚಿದ/ಅರ್ಧ-ತೆರೆದ ಸ್ಥಿತಿ         |
| ಸಂಪರ್ಕಗಳು | ಸಂಪರ್ಕಗಳ ಸಂಖ್ಯೆ, ಕೊನೆಯ ರಿಫ್ರೆಶ್         |
| ಮಾದರಿಗಳು  | ಲಭ್ಯವಿರುವ ಮಾದರಿಗಳು, ಪ್ರತಿ ಮಾದರಿಯ ಆರೋಗ್ಯ |
| ವೆಚ್ಚ     | ಇಂದಿನ ವೆಚ್ಚ, 7-ದಿನಗಳ ಪ್ರವೃತ್ತಿ          |
| ದೋಷಗಳು    | ಕಳೆದ 24h ದೋಷಗಳ ಸಂಖ್ಯೆ, ಪ್ರಮುಖ ದೋಷ ವರ್ಗ  |

ಈ ಕೆಳಗಿನವುಗಳನ್ನು ನೋಡಲು ಪೂರೈಕೆದಾರನ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ:

- ಲೇಟೆನ್ಸಿ ವಿವರಗಳೊಂದಿಗೆ ಇತ್ತೀಚಿನ ವಿನಂತಿಗಳು
- ಪ್ರತಿ-ಸಂಪರ್ಕದ ಆರೋಗ್ಯ ಸ್ಕೋರ್ಗಳು
- ಪ್ರತಿ-ಮಾದರಿಯ ಲಾಕ್ಔಟ್ಗಳು
- ಆಟೋಪೈಲಟ್ ಶಿಫಾರಸುಗಳು

### `/dashboard/quota` (ಕೋಟಾ ಟ್ರ್ಯಾಕಿಂಗ್)

ಪ್ರತಿ API ಕೀಗಾಗಿ:

- ಮಿತಿಗೆ ಹೋಲಿಸಿದ ಪ್ರಸ್ತುತ ಬಳಕೆ (ಪ್ರಗತಿ ಪಟ್ಟಿ)
- ಕೋಟಾ ಪ್ರವೃತ್ತಿ (30-ದಿನಗಳ ಚಾರ್ಟ್)
- ಮುಂದಿನ ಮರುಹೊಂದಿಸುವ ಸಮಯ
- ಎಚ್ಚರಿಕೆ ಇತಿಹಾಸ

### `/dashboard/combos` (ಕಾಂಬೊ ಆರೋಗ್ಯ)

ಪ್ರತಿ-ಕಾಂಬೊಗೆ:

- ಕಾರ್ಯತಂತ್ರ + ಗುರಿಗಳು
- ಪ್ರತಿ ಗುರಿಯ ಆರೋಗ್ಯ
- ಇತ್ತೀಚಿನ ಫಾಲ್ಬ್ಯಾಕ್ ಘಟನೆಗಳು
- ಯಶಸ್ಸಿನ ದರ (24h, 7d, 30d)

---

## ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ API

OmniRoute **ಎರಡು** HTTP ಆರೋಗ್ಯ ಪರಿಶೀಲನಾ ಮೇಲ್ಮೈಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಆರ್ಕೆಸ್ಟ್ರೇಟರ್ಗಳಿಗಾಗಿ ಅವುಗಳನ್ನು ಪರಸ್ಪರ ಬದಲಿಸಿ ಬಳಸಲಾಗುವುದಿಲ್ಲ.

| ಮಾರ್ಗ                        | ಉದ್ದೇಶ                                                              | ಭಾರ                               | ಯಾವುದಕ್ಕಾಗಿ ಬಳಸಬೇಕು                                                                  |
| ---------------------------- | ------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| `GET /healthz`               | ಜೀವನಚಕ್ರದ ಲೈವ್ನೆಸ್/ರೆಡಿನೆಸ್ (`ok` / `starting` / `stopping`)        | ಅತ್ಯಲ್ಪ (ಹಂತದ ಫ್ಲ್ಯಾಗ್ ಮಾತ್ರ)     | Kubernetes **readiness**; HTTP ಬಳಸಲೇಬೇಕಿದ್ದರೆ ಸೌಮ್ಯ **liveness**                     |
| `GET /api/monitoring/health` | ಆಳವಾದ ಸಿಸ್ಟಮ್ + ಪೂರೈಕೆದಾರರ ಸಾರಾಂಶ (DB, ಹೀಪ್, ಕ್ಯಾಟಲಾಗ್ ಎಣಿಕೆಗಳು, …) | ಅಧಿಕ (ಸಿಂಕ್ DB / ಮಾನಿಟರಿಂಗ್ ಕೆಲಸ) | ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳು, ಬ್ಲ್ಯಾಕ್ಬಾಕ್ಸ್ ಆಳ ಪರಿಶೀಲನೆಗಳು, Dockerನ ಅಂತರ್ನಿರ್ಮಿತ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ |

> **ಗಮನಿಸಿ:** ಪೂರೈಕೆದಾರರ ಆರೋಗ್ಯ ಮ್ಯಾಟ್ರಿಕ್ಸ್ಗಳು, ಆಟೋಪೈಲಟ್ ಸಮಸ್ಯೆಗಳು, ಕೋಟಾ ಮಾನಿಟರ್ಗಳು, ಟೋಕನ್ ಆರೋಗ್ಯ ಮತ್ತು `/api/monitoring/health` ಮೀರಿದ ಲೇಟೆನ್ಸಿ ವಿವರಗಳು **MCP ಉಪಕರಣ** `observability_snapshot` ಅಥವಾ **ಡ್ಯಾಶ್ಬೋರ್ಡ್** ಪುಟಗಳ ಮೂಲಕ ಲಭ್ಯವಿವೆ — ಅವುಗಳಿಗಾಗಿ ಮೀಸಲಾದ REST ಮಾರ್ಗಗಳಿಲ್ಲ.

ಎರಡೂ ಮಾರ್ಗಗಳು ವಿನಂತಿ ನಿರ್ವಹಣೆಯಂತೆಯೇ **ಅದೇ Node event loop**ನಲ್ಲಿ ಚಾಲನೆಯಾಗುತ್ತವೆ. CPU-ಆಧಾರಿತ ಮಾರ್ಗವೊಂದು (ದೊಡ್ಡ `GET /v1/models` ಕ್ಯಾಟಲಾಗ್ ಕೆಲಸ, ದೀರ್ಘ-ಕಾಂಟೆಕ್ಸ್ಟ್ ಸಂಕುಚನ / ಟೋಕನ್ ಎಣಿಕೆ) `/healthz` ಸೇರಿದಂತೆ **ಎಲ್ಲಾ** HTTP ಹ್ಯಾಂಡ್ಲರ್ಗಳನ್ನು ವಿಳಂಬಗೊಳಿಸಬಹುದು. Event-loop ಕಾರ್ಯನಿರತವಾಗಿದೆ ≠ ಪ್ರಕ್ರಿಯೆ ಸತ್ತಿದೆ. ಸಂಪನ್ಮೂಲವನ್ನು ಅತಿಯಾಗಿ ಬಳಸುವ ಕೆಲಸವನ್ನು ಸರಿಪಡಿಸುವುದಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಿ; ಪ್ರೋಬ್ ಟ್ಯೂನಿಂಗ್ ತಪ್ಪಾದ ಟರ್ಮಿನೇಷನ್ಗಳನ್ನು ಮಾತ್ರ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.

### ಹಗುರವಾದ ಆರ್ಕೆಸ್ಟ್ರೇಟರ್ ಪ್ರೋಬ್

```bash
GET /healthz
# ಅಥವಾ HEAD /healthz
```

- ಸರ್ವರ್ ಜೀವನಚಕ್ರದ ಹಂತ ಸಿದ್ಧವಾಗಿರುವಾಗ **200** + ಬಾಡಿ `ok`
- ಬೂಟ್ ಅಥವಾ ಸ್ಥಗಿತಗೊಳಿಸುವಿಕೆಯ ಸಮಯದಲ್ಲಿ **503** + `starting` / `stopping`
- ಅನುಷ್ಠಾನ: `src/app/healthz/route.ts` (DB ಪಿಂಗ್ ಇಲ್ಲ)

### ಸಿಸ್ಟಮ್ ಆರೋಗ್ಯ (ಆಳವಾದ)

```bash
GET /api/monitoring/health
```

ಪ್ರತಿಕ್ರಿಯೆ:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: ಪ್ರೋಬ್-ಕ್ಯಾಶ್ ಮತ್ತು SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ಎಂಬುದು **ಇನ್-ಮೆಮೊರಿ ಪ್ರೋಬ್-ಕ್ಯಾಶ್
ಗೇಜ್** ಆಗಿದೆಯೇ ಹೊರತು `provider_connections.test_status`ನ ಲೈವ್ ಡಂಪ್ ಅಲ್ಲ. #12532 ನಂತರ
ವಿನಂತಿಯ ಮಾರ್ಗವು `getCachedCredentialHealthSummary()` ಅನ್ನು ಮಾತ್ರ ಓದುತ್ತದೆ; ಹಿನ್ನೆಲೆ ಪ್ರೋಬ್ಗಳು
event loopನ ಹೊರಗೆ ಕ್ಯಾಶ್ ಅನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡುತ್ತವೆ.

| ಪದರ                 | ಎಲ್ಲಿ                                                                 | ಇದರ ಅರ್ಥ                                                                                                                                                                                                                              |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ಪ್ರೋಬ್-ಕ್ಯಾಶ್ ಗೇಜ್  | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ಪ್ರಕ್ರಿಯೆಯ ಮೆಮೊರಿಯಲ್ಲಿ ಇನ್ನೂ ಉಳಿದಿರುವ ಕೊನೆಯ ರುಜುವಾತು-ಆರೋಗ್ಯ ಪ್ರೋಬ್ ಫಲಿತಾಂಶಗಳು. `source` ಯಾವಾಗಲೂ `probe-cache` ಆಗಿರುತ್ತದೆ.                                                                                                             |
| ವಿಫಲ ಸಂಪರ್ಕದ ವಿವರ   | `credentialHealth.failedConnections`                                  | **`failed > 0` ಇದ್ದಾಗ ಮಾತ್ರ** ಇರುತ್ತದೆ. `status=error` ಹೊಂದಿರುವ ಕ್ಯಾಶ್ ಸಾಲುಗಳ ಮಿತಿಗೊಳಿಸಲಾದ ಪಟ್ಟಿ (`connectionId`, `status`, ಶುದ್ಧೀಕರಿಸಲಾದ `lastError` / `lastErrorType`). ಪಟ್ಟಿಯನ್ನು ಮಿತಿಗೊಳಿಸಿದ್ದರೆ `failedOmitted` ಹೊಂದಿಸಲಾಗುತ್ತದೆ. |
| SQLite ಸ್ಥಿರ ಸ್ಥಿತಿ | `credentialHealth.staleDbNonOkCount`                                  | ಸಂಗ್ರಹಿಸಲಾದ `test_status` ತಿಳಿದಿರುವ non-ok ಸ್ಥಿತಿಗಳಲ್ಲಿ ಒಂದಾಗಿರುವ (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) **ಸಕ್ರಿಯ** (`is_active=1`) ಸಂಪರ್ಕ ಸಾಲುಗಳ ಎಣಿಕೆ.                                   |

ಈ ಎರಡು ಪದರಗಳು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಭಿನ್ನವಾಗಿರಬಹುದು:

- ಗೇಜ್ನಲ್ಲಿ `failed=0` ಇರುವಾಗ `staleDbNonOkCount>0` — SQLiteನಲ್ಲಿ ಇನ್ನೂ ಸ್ಥಿರ
  `test_status` (ಉದಾಹರಣೆಗೆ `expired` ಅಥವಾ `credits_exhausted`) ಇದೆ, ಆದರೆ ಇತ್ತೀಚಿನ
  ಪ್ರೋಬ್-ಕ್ಯಾಶ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್ ಅದನ್ನು `status=error` ಎಂದು ಎಣಿಸುವುದಿಲ್ಲ.
- ಗೇಜ್ನಲ್ಲಿ `failed>0` ಇರುವಾಗ SQLite ಆರೋಗ್ಯಕರವಾಗಿ ಕಾಣುತ್ತದೆ — ಇತ್ತೀಚಿನ ಪ್ರೋಬ್ ವಿಫಲವಾಗಿದೆ ಮತ್ತು ಅದನ್ನು
  ಕ್ಯಾಶ್ ಮಾಡಲಾಗಿದೆ; DB ಸಾಲನ್ನು ಇನ್ನೂ ನವೀಕರಿಸಿಲ್ಲ, ಅಥವಾ ಅದನ್ನು ನಂತರ ತೆರವುಗೊಳಿಸಲಾಗಿದೆ.

ಈ ಎಂಡ್ಪಾಯಿಂಟ್ ಅನ್ನು ಸ್ಕ್ರೇಪ್ ಮಾಡುವಾಗ ಕೇವಲ `provider_connections.test_status` ಆಧಾರದ ಮೇಲೆ
ಎಚ್ಚರಿಕೆ ನೀಡಬೇಡಿ. ಲೈವ್ ಪ್ರೋಬ್ ವೈಫಲ್ಯಗಳಿಗಾಗಿ `failed` + `failedConnections` ಮತ್ತು
ಸಂಗ್ರಹಿಸಲಾದ ಸ್ಥಿರ-ಸ್ಥಿತಿಯ ಎಣಿಕೆ ಬೇಕಾದಾಗ `staleDbNonOkCount` ಬಳಸಿ.

### Kubernetes ಪ್ರೋಬ್ ಶಿಫಾರಸುಗಳು

OmniRoute ಒಂದು **ಏಕೈಕ Node ಪ್ರಕ್ರಿಯೆ** (ಒಂದು event loop) ಆಗಿದೆ. ಪ್ರಮಾಣಿತ Docker `HEALTHCHECK` ಹಗುರವಾದ `/healthz` ಅನ್ನು ಗುರಿಯಾಗಿಸುತ್ತದೆ. kubelet ಲೈವ್ನೆಸ್ ಮಧ್ಯಂತರಗಳಿಗಾಗಿ `/api/monitoring/health` **ತುಂಬಾ ಭಾರವಾಗಿದೆ**.

| ಪ್ರೋಬ್           | ಶಿಫಾರಸು ಮಾಡಲಾದ ಗುರಿ                                                               | ಟಿಪ್ಪಣಿಗಳು                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ಪ್ರಾರಂಭ**      | ದೀರ್ಘ `failureThreshold` (ಅಥವಾ ದೊಡ್ಡ `startPeriod`) ಹೊಂದಿರುವ HTTP `GET /healthz`  | ಕೋಲ್ಡ್ ಸ್ಟಾರ್ಟ್ + SQLite ಮೈಗ್ರೇಶನ್ ಕೆಲವು ಸೆಕೆಂಡುಗಳನ್ನು ಮೀರಬಹುದು                                                                                                                                                                                                                                                                                                                                              |
| **ಸಿದ್ಧತೆ**      | HTTP `GET /healthz`                                                               | ಲೈಫ್ಸೈಕಲ್ `ok` / `starting` / `stopping` (200 ಮತ್ತು 503). ಲೂಪ್ CPU-ಬ್ಲಾಕ್ ಆಗಿದ್ದರೆ ಇದು ಇನ್ನೂ ಏರುಪೇರಾಗುತ್ತದೆ. **ಪ್ರತಿಕ್ರಿಯೆಗೆ ಹಲವು ಸೆಕೆಂಡು ತೆಗೆದುಕೊಳ್ಳುವ 200 ಆರೋಗ್ಯಕರವಲ್ಲ** (#10303) — ಇದರರ್ಥ 3-ಬೈಟ್ ಹ್ಯಾಂಡ್ಲರ್ ಚಲಿಸುವ ಮೊದಲು ಈವೆಂಟ್ ಲೂಪ್ಗೆ ಸಂಪನ್ಮೂಲ ಸಿಗಲಿಲ್ಲ                                                                                                                                                  |
| **ಜೀವಂತಿಕೆ**     | HTTP `GET /livez`, **ಅಥವಾ ಮುಖ್ಯ ಸೇವಾ ಪೋರ್ಟ್ನಲ್ಲಿ TCP** (`PORT`, ಡೀಫಾಲ್ಟ್ `20128`) | `/livez` ಪ್ರಕ್ರಿಯೆಯ ಜೀವಂತಿಕೆಯನ್ನು ಮಾತ್ರ ಸೂಚಿಸುತ್ತದೆ (ಹ್ಯಾಂಡ್ಲರ್ ಚಲಿಸಿದರೆ ಯಾವಾಗಲೂ 200). ಇದು ಕೂಡ ಅದೇ ಈವೆಂಟ್ ಲೂಪ್ ಅನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತದೆ — ಕಾರ್ಯನಿರತ ≠ ಸ್ಥಗಿತ, ಮತ್ತು TCPಗಿಂತ ಉತ್ತಮವಾಗಿ ಈವೆಂಟ್-ಲೂಪ್ ಸಂಪನ್ಮೂಲ ಕೊರತೆಯನ್ನು (#10303) ಪತ್ತೆಹಚ್ಚುವುದಿಲ್ಲ. ಕ್ಯಾಟಲಾಗ್/ಕಂಪ್ರೆಷನ್ ಲೋಡ್ನಲ್ಲಿ HTTP ಪ್ರೋಬ್ಗಳು ಸಮಯ ಮೀರಿದರೆ **TCP**ಗೆ ಆದ್ಯತೆ ನೀಡಿ; ಯಾವುದೇ ಆಯ್ಕೆಯಲ್ಲಿಯೂ ಸಣ್ಣ ಈವೆಂಟ್-ಲೂಪ್ ಸ್ಥಗಿತಗಳಿಗಾಗಿ ಪಾಡ್ ಅನ್ನು ಸ್ಥಗಿತಗೊಳಿಸಬೇಡಿ |
| **ಆಳವಾದ ಆರೋಗ್ಯ** | ಬಾಹ್ಯ ಪರೀಕ್ಷಕದಿಂದ `GET /api/monitoring/health`                                    | kubelet `livenessProbe` / ಕಡಿಮೆ ಅಂತರದ `readinessProbe`ಗಾಗಿ ಅಲ್ಲ                                                                                                                                                                                                                                                                                                                                              |

ಉದಾಹರಣೆ ಸ್ವರೂಪ (ನಿಮ್ಮ ಕೋಲ್ಡ್-ಸ್ಟಾರ್ಟ್ ಮತ್ತು ಕಂಪ್ರೆಷನ್ ಲೋಡ್ಗೆ ಅನುಗುಣವಾಗಿ ಮಿತಿಗಳನ್ನು ಹೊಂದಿಸಿ):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # ಈವೆಂಟ್-ಲೂಪ್ ಸ್ಥಗಿತದ ಸಂದರ್ಭದಲ್ಲಿ HTTP /livez ಇನ್ನೂ ಸಮಯ ಮೀರಬಹುದು. TCP
  # ಹೆಚ್ಚು ಸುರಕ್ಷಿತ ಪರ್ಯಾಯವಾಗಿದೆ:
  # tcpSocket:
  #   port: http
```

kubelet **ಜೀವಂತಿಕೆ**ಯನ್ನು `/api/monitoring/health`ಗೆ ಸೂಚಿಸಬೇಡಿ. ಆ ಪಥವು ನೈಜ DB/ಮೇಲ್ವಿಚಾರಣಾ ಕಾರ್ಯವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ ಮತ್ತು ಲೋಡ್ನ ಸಂದರ್ಭದಲ್ಲಿ ತಪ್ಪಾಗಿ ಸಮಸ್ಯೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.

ಸಂಬಂಧಿತ: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (ಈವೆಂಟ್ ಲೂಪ್ ಕಾರ್ಯನಿರತವಾಗಿರುವಾಗ ಪ್ರೋಬ್ಗಳು), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (ಕ್ಯಾಟಲಾಗ್ ಬೆಲೆ ಲೆಕ್ಕಾಚಾರದಿಂದ ಸಂಪನ್ಮೂಲ ಬಳಕೆ), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (ಕಂಪ್ರೆಷನ್ ಟೋಕನ್-ಎಣಿಕೆಯಿಂದ ಸಂಪನ್ಮೂಲ ಬಳಕೆ).

### ಐಚ್ಛಿಕ ವಿನಂತಿ-ಪಥದ ಕಾರ್ಯ (ಮೆಮೊರಿ, ಕೌಶಲ್ಯಗಳು, ಟೋಕನ್ ರಿಫ್ರೆಶ್)

ಮೆಮೊರಿ ಹೊರತೆಗೆಯುವಿಕೆ, ಕೌಶಲ್ಯಗಳ ಇಂಜೆಕ್ಷನ್ ಮತ್ತು OAuth ಟೋಕನ್ ರಿಫ್ರೆಶ್ `/healthz` ಜೊತೆಗೆ **ಮುಖ್ಯ Node ಈವೆಂಟ್ ಲೂಪ್** ಅನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತವೆ. ಅವು ಡ್ಯಾಶ್ಬೋರ್ಡ್-ಟಾಗಲ್ ವೈಶಿಷ್ಟ್ಯಗಳು (`memoryEnabled`, `skillsEnabled`), ವರ್ಕರ್ ಪೂಲ್ ಅಲ್ಲ. [ಪರಿಸರ — ಮೆಮೊರಿ, ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಟೋಕನ್ ರಿಫ್ರೆಶ್ನ ಈವೆಂಟ್-ಲೂಪ್ ವೆಚ್ಚ](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ನೋಡಿ.

### ಪೂರೈಕೆದಾರರ ಆರೋಗ್ಯ

> **REST ಎಂಡ್ಪಾಯಿಂಟ್ ಇಲ್ಲ.** ಪೂರೈಕೆದಾರರ ಆರೋಗ್ಯದ ಡೇಟಾ MCP ಪರಿಕರ `observability_snapshot` ಅಥವಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ `/dashboard/providers` ಪುಟದ ಮೂಲಕ ಲಭ್ಯವಿದೆ.

### ಪೂರೈಕೆದಾರರ ವಿವರ

> **REST ಎಂಡ್ಪಾಯಿಂಟ್ ಇಲ್ಲ.** ಪ್ರತಿ ಪೂರೈಕೆದಾರರ ವಿವರವು ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ `/dashboard/providers` ಪುಟದ ಮೂಲಕ ಲಭ್ಯವಿದೆ.

---

## ಪ್ರೊವೈಡರ್ ಹೆಲ್ತ್ ಆಟೋಪೈಲಟ್

`providerHealthAutopilot.ts` ಮಾಡ್ಯೂಲ್ ಈ ಕೆಳಗಿನ ಕಾರ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸುವ **ಸ್ವಯಂ-ದುರಸ್ತಿ ವ್ಯವಸ್ಥೆ** ಆಗಿದೆ:

1. ಪ್ರೊವೈಡರ್ ಸಮಸ್ಯೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ (ಸರ್ಕ್ಯೂಟ್ ತೆರೆದಿರುವುದು, ಕೂಲ್ಡೌನ್ಗಳು, ಲಾಕ್ಔಟ್ಗಳು, ಕೋಟಾ ಎಚ್ಚರಿಕೆಗಳು)
2. ಅವುಗಳನ್ನು ಪರಿಹರಿಸಲು **ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮಗಳನ್ನು** ರಚಿಸುತ್ತದೆ
3. ಐಚ್ಛಿಕವಾಗಿ ಕಡಿಮೆ-ಅಪಾಯದ ಕ್ರಮಗಳನ್ನು **ಸ್ವಯಂ-ಕಾರ್ಯಗತಗೊಳಿಸುತ್ತದೆ**

### ಪತ್ತೆಹಚ್ಚಲಾದ ಸಮಸ್ಯೆಯ ಪ್ರಕಾರಗಳು

| ಸಮಸ್ಯೆಯ ವಿಧ                  | ತೀವ್ರತೆ  | ಉದಾಹರಣೆ ಸ್ಥಿತಿ                                   |
| ---------------------------- | -------- | ------------------------------------------------ |
| `provider_circuit_open`      | ಗಂಭೀರ    | 5 ವೈಫಲ್ಯಗಳ ನಂತರ ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ ತೆರೆದಿದೆ       |
| `provider_circuit_half_open` | ಎಚ್ಚರಿಕೆ | ಸರ್ಕ್ಯೂಟ್ ಚೇತರಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸುತ್ತಿದೆ           |
| `connection_cooldown`        | ಎಚ್ಚರಿಕೆ | 429 ನಂತರ ಸಂಪರ್ಕವು ಕೂಲ್ಡೌನ್ನಲ್ಲಿದೆ                |
| `stale_connection_error`     | ಎಚ್ಚರಿಕೆ | ಕೊನೆಯ ರಿಫ್ರೆಶ್ 30+ ನಿಮಿಷಗಳ ಹಿಂದೆ ವಿಫಲವಾಗಿದೆ      |
| `terminal_connection_error`  | ಗಂಭೀರ    | OAuth ಹಿಂಪಡೆಯಲಾಗಿದೆ, ಕೀ ಅಮಾನ್ಯವಾಗಿದೆ             |
| `inactive_connection`        | ಮಾಹಿತಿ   | ಸೆಟ್ಟಿಂಗ್ಗಳಲ್ಲಿ ಸಂಪರ್ಕವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ |
| `model_lockout`              | ಎಚ್ಚರಿಕೆ | ನಿರ್ದಿಷ್ಟ ಮಾಡೆಲ್ ಕ್ವಾರಂಟೈನ್ನಲ್ಲಿದೆ               |
| `quota_monitor_warning`      | ಎಚ್ಚರಿಕೆ | ಕೋಟಾ ಬಳಕೆ 80%+ ತಲುಪಿದೆ                           |

### ರಚಿಸಲಾದ ಕ್ರಮಗಳ ಪ್ರಕಾರಗಳು

| ಕ್ರಮ                           | ಅಪಾಯ   | ವಿವರಣೆ                                              |
| ------------------------------ | ------ | --------------------------------------------------- |
| `clear_provider_breaker`       | ಮಧ್ಯಮ  | ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ ಅನ್ನು ಮುಚ್ಚಿದ ಸ್ಥಿತಿಗೆ ಮರುಹೊಂದಿಸಿ |
| `clear_connection_cooldown`    | ಕಡಿಮೆ  | ಸಂಪರ್ಕದಿಂದ ಕೂಲ್ಡೌನ್ ಅನ್ನು ತೆಗೆದುಹಾಕಿ                |
| `clear_stale_connection_error` | ಕಡಿಮೆ  | ಹಳೆಯ ದೋಷ ಫ್ಲ್ಯಾಗ್ ಅನ್ನು ತೆರವುಗೊಳಿಸಿ                 |
| `clear_model_lockout`          | ಕಡಿಮೆ  | ಕ್ವಾರಂಟೈನ್ ಮಾಡಲಾದ ಮಾಡೆಲ್ ಅನ್ನು ಮರುಸಕ್ರಿಯಗೊಳಿಸಿ      |
| `reactivate_connection`        | ಮಧ್ಯಮ  | ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದ ಸಂಪರ್ಕವನ್ನು ಮರುಸಕ್ರಿಯಗೊಳಿಸಿ        |
| `deactivate_connection`        | ಹೆಚ್ಚು | ಸಮಸ್ಯಾತ್ಮಕ ಸಂಪರ್ಕವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ              |

### API

> **ಯಾವುದೇ REST ಎಂಡ್ಪಾಯಿಂಟ್ ಇಲ್ಲ.** ಆಟೋಪೈಲಟ್ ಸಮಸ್ಯೆಗಳು MCP ಪರಿಕರ `observability_snapshot` ಅಥವಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮೂಲಕ ಲಭ್ಯವಿವೆ. ಆಟೋಪೈಲಟ್ ಆಂತರಿಕವಾಗಿ ಚಾಲನೆಯಾಗುತ್ತದೆ; ಅದರ ನಡವಳಿಕೆಯನ್ನು ಪರಿಸರ ವೇರಿಯಬಲ್ಗಳ ಮೂಲಕವಲ್ಲ, ಸೆಟ್ಟಿಂಗ್ಗಳ DB ಮೂಲಕ (ಪ್ರತಿ ಸಂಪರ್ಕದ `autopilotMode` ಫೀಲ್ಡ್) ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗುತ್ತದೆ — ಆಟೋಪೈಲಟ್-ಮೋಡ್ ಪರಿಸರ ವೇರಿಯಬಲ್ಗಾಗಿ `grep -rn` ಶೂನ್ಯ ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡುತ್ತದೆ.

### ಆಟೋಪೈಲಟ್ ಮೋಡ್

ಆಟೋಪೈಲಟ್ ಡೀಫಾಲ್ಟ್ ಆಗಿ **ಮ್ಯಾನುಯಲ್ ಮೋಡ್ನಲ್ಲಿ** ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ — ಇದು ಸಮಸ್ಯೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮಗಳನ್ನು ರಚಿಸುತ್ತದೆ, ಆದರೆ ಅವುಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅನ್ವಯಿಸುವುದಿಲ್ಲ. ಕ್ರಮಗಳನ್ನು ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮೂಲಕ ಅನ್ವಯಿಸಬಹುದು.

---

## ಕಾಂಬೊ ಹೆಲ್ತ್ ಆಟೋಪೈಲಟ್

`comboHealthAutopilot.ts` ಪ್ರೊವೈಡರ್ ಆಟೋಪೈಲಟ್ಗೆ **ಕಾಂಬೊ-ನಿರ್ದಿಷ್ಟ** ಸಮಾನ ವ್ಯವಸ್ಥೆಯಾಗಿದೆ. ಇದು:

- ಅನಾರೋಗ್ಯಕರ ಕಾಂಬೊಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ
- ಟಾರ್ಗೆಟ್ಗಳ ಮರುಕ್ರಮಗೊಳಿಸುವಿಕೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ
- ವಿಫಲವಾದ ಟಾರ್ಗೆಟ್ಗಳನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲು ಸೂಚಿಸುತ್ತದೆ
- N ವೈಫಲ್ಯಗಳ ನಂತರ ಕಾರ್ಯನಿರ್ವಹಿಸದ ಟಾರ್ಗೆಟ್ಗಳನ್ನು ಸ್ವಯಂ-ತೆಗೆದುಹಾಕುತ್ತದೆ

### ಕಾಂಬೊ ಸಮಸ್ಯೆಗಳ ಉದಾಹರಣೆಗಳು

```
ಕಾಂಬೊ "always-on" (ಆದ್ಯತಾ ಕಾರ್ಯತಂತ್ರ)
├─ ಟಾರ್ಗೆಟ್ 1: openai/gpt-5 (ಆರೋಗ್ಯಕರ)
├─ ಟಾರ್ಗೆಟ್ 2: anthropic/claude-opus-4-6 (⚠️ 14:00 ರವರೆಗೆ ಮಾಡೆಲ್ ಲಾಕ್ಔಟ್)
└─ ಟಾರ್ಗೆಟ್ 3: kiro/claude-sonnet-4-5 (ಆರೋಗ್ಯಕರ)

ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ: ಮರುಕ್ರಮಗೊಳಿಸಿ — ಲಾಕ್ಔಟ್ ಅವಧಿ ಮುಗಿಯುವವರೆಗೆ kiro ಅನ್ನು anthropic ಗಿಂತ ಮೇಲಕ್ಕೆ ಸರಿಸಿ
```

---

## ಕೋಟಾ ಮಾನಿಟರ್ಗಳು

`observability.ts` ಸಬ್ಸ್ಕ್ರಿಪ್ಷನ್ ಪ್ರೊವೈಡರ್ಗಳಿಗಾಗಿ (Claude Code, Codex, GitHub Copilot) **ಪ್ರತಿ-ಸೆಷನ್ ಕೋಟಾ ಮಾನಿಟರ್ಗಳನ್ನು** ಒದಗಿಸುತ್ತದೆ:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### ಸ್ಥಿತಿಗಳ ಅರ್ಥಗಳು

| ಸ್ಥಿತಿ      | ಯಾವಾಗ                         | UI ಕ್ರಮ                                    |
| ----------- | ----------------------------- | ------------------------------------------ |
| `starting`  | ಆರಂಭಿಕ ಪೋಲಿಂಗ್ ಪ್ರಗತಿಯಲ್ಲಿದೆ  | ಸ್ಪಿನ್ನರ್                                  |
| `idle`      | ಇತ್ತೀಚಿನ ಯಾವುದೇ ಚಟುವಟಿಕೆ ಇಲ್ಲ | ಡ್ಯಾಶ್ಬೋರ್ಡ್ನಿಂದ ಮರೆಮಾಡಲಾಗಿದೆ              |
| `healthy`   | ಕೋಟಾದಲ್ಲಿ > 50% ಉಳಿದಿದೆ       | ಹಸಿರು ಚುಕ್ಕೆ                               |
| `warning`   | ಕೋಟಾದಲ್ಲಿ < 50% ಉಳಿದಿದೆ       | ಹಳದಿ ಎಚ್ಚರಿಕೆ                              |
| `exhausted` | ಕೋಟಾ = 0%                     | ಕೆಂಪು ಬ್ಲಾಕ್, ಮುಂದಿನ ಪ್ರೊವೈಡರ್ಗೆ ರೂಟ್ ಮಾಡಿ |
| `error`     | ಪೋಲಿಂಗ್ ವಿಫಲವಾಗಿದೆ            | ಕೆಂಪು ಚುಕ್ಕೆ, ಶೀಘ್ರದಲ್ಲೇ ಮರುಪ್ರಯತ್ನಿಸಿ     |

### API

> **ಯಾವುದೇ REST ಎಂಡ್ಪಾಯಿಂಟ್ ಇಲ್ಲ.** ಕೋಟಾ ಮಾನಿಟರ್ ಡೇಟಾವು MCP ಪರಿಕರ `observability_snapshot` ಅಥವಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮೂಲಕ ಲಭ್ಯವಿದೆ.

---

## ಅವಲೋಕನೀಯತೆ ಸ್ನ್ಯಾಪ್ಶಾಟ್

MCP ಟೂಲ್ `observability_snapshot` AI ಏಜೆಂಟ್ಗಳಿಗಾಗಿ **ಸಂಪೂರ್ಣ ಸಿಸ್ಟಮ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್** ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ಮೇಲೆ ನೋಡಿ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ಏಜೆಂಟ್ಗಳು **ರೂಟಿಂಗ್ ನಿರ್ಧಾರಗಳನ್ನು** ತೆಗೆದುಕೊಳ್ಳಲು ಇದನ್ನು ಬಳಸುತ್ತವೆ — ಉದಾಹರಣೆಗೆ, "openai ಸರ್ಕ್ಯೂಟ್ ತೆರೆದಿದ್ದರೆ, ಮೊದಲು anthropic ಗೆ ರೂಟ್ ಮಾಡಿ".

---

## ಟೋಕನ್ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ

OAuth ಪೂರೈಕೆದಾರರಿಗೆ (Claude Code, GitHub Copilot, Cursor) **ನಿಯತಕಾಲಿಕ ಟೋಕನ್ ರಿಫ್ರೆಶ್** ಅಗತ್ಯವಿದೆ. `src/lib/tokenHealthCheck.ts` ಹಿನ್ನೆಲೆ ಶೆಡ್ಯೂಲರ್ ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ:

- **ಸ್ವೀಪ್ ಟಿಕ್**: ಪ್ರತಿ 60 ಸೆಕೆಂಡುಗಳಿಗೆ (`src/lib/tokenHealthCheck.ts:30` ನಲ್ಲಿ `TICK_MS = 60 * 1000` ಸ್ವೀಪ್)
- **ಪ್ರತಿ-ಕನೆಕ್ಷನ್ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆಯ ಮಧ್ಯಂತರ**: ಡೀಫಾಲ್ಟ್ ಆಗಿ 60 ನಿಮಿಷಗಳು (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ಸೆಟ್ಟಿಂಗ್ಗಳ DB ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದು
- **401 ಸಂಭವಿಸಿದಾಗ ಮುನ್ನೆಚ್ಚರಿಕೆಯ ರಿಫ್ರೆಶ್**: ಪ್ರತಿ-ಕನೆಕ್ಷನ್ ಇಂಟರ್ಸೆಪ್ಟರ್ನಿಂದ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ

### ಟೋಕನ್ ಆರೋಗ್ಯ ಸ್ಥಿತಿ

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### ಕಾನ್ಫಿಗರೇಶನ್

ಟೋಕನ್ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆಯ ಕಾನ್ಫಿಗರೇಶನ್ ಅನ್ನು `tokenHealthCheck.ts` ಆಂತರಿಕವಾಗಿ ನಿರ್ವಹಿಸುತ್ತದೆ.

### ಟೋಕನ್ ಆರೋಗ್ಯ

> **REST ಎಂಡ್ಪಾಯಿಂಟ್ ಇಲ್ಲ.** ಟೋಕನ್ ಆರೋಗ್ಯದ ಡೇಟಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅಥವಾ MCP ಟೂಲ್ `observability_snapshot` ಮೂಲಕ ಲಭ್ಯವಿದೆ.

---

## ಎಚ್ಚರಿಕೆ ನೀಡುವಿಕೆ

### ಅಂತರ್ನಿರ್ಮಿತ ಚಾನಲ್ಗಳು

OmniRoute **3 ಎಚ್ಚರಿಕೆ ಚಾನಲ್ಗಳನ್ನು** ಬೆಂಬಲಿಸುತ್ತದೆ:

| ಚಾನಲ್                | ಸೆಟಪ್              | ಬಳಕೆಯ ಸಂದರ್ಭ                   |
| -------------------- | ------------------ | ------------------------------ |
| ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಬ್ಯಾನರ್ | ಯಾವಾಗಲೂ ಸಕ್ರಿಯ     | ಅಪ್ಲಿಕೇಶನ್ನೊಳಗಿನ ಅಧಿಸೂಚನೆಗಳು   |
| Webhook              | URL ಕಾನ್ಫಿಗರ್ ಮಾಡಿ | Slack, Discord, PagerDuty      |
| ಲಾಗ್                 | ಡೀಫಾಲ್ಟ್           | ಬಾಹ್ಯ ಲಾಗ್ ಒಟ್ಟುಗೂಡಿಸುವಿಕೆಗಾಗಿ |

### Webhook ಕಾನ್ಫಿಗರೇಶನ್

> **ಗಮನಿಸಿ:** Webhook ಎಚ್ಚರಿಕೆಯ ಕಾನ್ಫಿಗರೇಶನ್ ಅನ್ನು ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ Settings ಪುಟದ ಮೂಲಕ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ. Webhook URL, ಈವೆಂಟ್ ಫಿಲ್ಟರಿಂಗ್ ಮತ್ತು ಪೇಲೋಡ್ ಕಸ್ಟಮೈಸೇಶನ್ಗಾಗಿ Settings UI ನೋಡಿ.

### ಎಚ್ಚರಿಕೆಯ ಪ್ರಕಾರಗಳು

| ಎಚ್ಚರಿಕೆ                     | ಯಾವಾಗ                                     | ಡೀಫಾಲ್ಟ್ ತೀವ್ರತೆ |
| ---------------------------- | ----------------------------------------- | ---------------- |
| `provider_circuit_open`      | ಸರ್ಕ್ಯೂಟ್ ತೆರೆಯುವಾಗ                       | ನಿರ್ಣಾಯಕ         |
| `provider_circuit_half_open` | ಸರ್ಕ್ಯೂಟ್ ಚೇತರಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸುವಾಗ       | ಮಾಹಿತಿ           |
| `quota_warning`              | ಕೋಟಾ 80%+ ತಲುಪಿದಾಗ                        | ಎಚ್ಚರಿಕೆ         |
| `quota_exhausted`            | ಕೋಟಾ 100% ತಲುಪಿದಾಗ                        | ನಿರ್ಣಾಯಕ         |
| `token_refresh_failed`       | ಸತತವಾಗಿ 3+ ರಿಫ್ರೆಶ್ ವೈಫಲ್ಯಗಳು ಸಂಭವಿಸಿದಾಗ  | ಎಚ್ಚರಿಕೆ         |
| `token_expired`              | ಟೋಕನ್ನ ಅವಧಿ ಮುಗಿದಾಗ                       | ನಿರ್ಣಾಯಕ         |
| `combo_target_unhealthy`     | ಕಾಂಬೊ ಟಾರ್ಗೆಟ್ 1h+ ಕಾಲ ಕೂಲ್ಡೌನ್ನಲ್ಲಿದ್ದಾಗ | ಎಚ್ಚರಿಕೆ         |
| `db_integrity_warning`       | FK ಉಲ್ಲಂಘನೆಗಳು > 0 ಇದ್ದಾಗ                 | ಎಚ್ಚರಿಕೆ         |
| `heap_pressure`              | ಹೀಪ್ ಬಳಕೆ ಥ್ರೆಶೋಲ್ಡ್ನ 80% ಮೀರಿದಾಗ         | ಎಚ್ಚರಿಕೆ         |

---

## ಕಾರ್ಯಕ್ಷಮತಾ ಮೆಟ್ರಿಕ್ಗಳು

### ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾದ ಮೆಟ್ರಿಕ್ಗಳು

| ಮೆಟ್ರಿಕ್                | ಪ್ರಕಾರ       | ಮೂಲ                             |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | ಕೌಂಟರ್       | `services/usage.ts`             |
| `request_latency_ms`    | ಹಿಸ್ಟೋಗ್ರಾಮ್ | `services/usage.ts`             |
| `tokens_consumed`       | ಕೌಂಟರ್       | `services/usage.ts`             |
| `cost_usd`              | ಕೌಂಟರ್       | `services/usage.ts`             |
| `provider_errors`       | ಕೌಂಟರ್       | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ಕೌಂಟರ್       | `services/resilience.ts`        |
| `cache_hits`            | ಕೌಂಟರ್       | `services/signatureCache.ts`    |
| `compression_savings`   | ಹಿಸ್ಟೋಗ್ರಾಮ್ | `services/compression/stats.ts` |
| `quota_used`            | ಗೇಜ್         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ಗೇಜ್         | `observability.ts`              |

### ಲೇಟೆನ್ಸಿ ಪರ್ಸೆಂಟೈಲ್ಗಳು (p50/p95/p99)

> **REST ಎಂಡ್ಪಾಯಿಂಟ್ ಇಲ್ಲ.** ಲೇಟೆನ್ಸಿ ಪರ್ಸೆಂಟೈಲ್ ಡೇಟಾವು ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ `/dashboard/health` ಪುಟದ ಮೂಲಕ ಲಭ್ಯವಿದೆ. Prometheus/OpenTelemetry ರಫ್ತನ್ನು v3.9 ಗಾಗಿ ಯೋಜಿಸಲಾಗಿದೆ.

### Prometheus / OpenTelemetry ರಫ್ತು (ಹಂತ 2)

v3.9 ಗಾಗಿ ಯೋಜಿಸಲಾಗಿದೆ: Prometheus, OpenTelemetry, Datadog ಗೆ ಸ್ಥಳೀಯ ರಫ್ತು.

ಸದ್ಯಕ್ಕೆ, ಯಾವುದೇ HTTP-ಆಧಾರಿತ ಮೇಲ್ವಿಚಾರಣಾ ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ `/api/monitoring/health` ಅನ್ನು ಸ್ಕ್ರೇಪ್ ಮಾಡಿ (Prometheus blackbox exporter, Datadog HTTP check, ಇತ್ಯಾದಿ).

---

## ಎಚ್ಚರಿಕೆ ನೀಡುವ ವಿಧಾನಗಳು

### Slack

> **ಗಮನಿಸಿ:** ವೆಬ್ಹುಕ್ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ Settings ಪುಟದ ಮೂಲಕ ಸಂರಚಿಸಲಾಗುತ್ತದೆ — ಪ್ರತ್ಯೇಕ ವೆಬ್ಹುಕ್ ಪರಿಸರ ಚರಗಳು ಇಲ್ಲ (`grep -rn` ಶೂನ್ಯ ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡುತ್ತದೆ). ವೆಬ್ಹುಕ್ URL, ಈವೆಂಟ್ ಫಿಲ್ಟರಿಂಗ್ ಮತ್ತು ಪೇಲೋಡ್ ಗ್ರಾಹಕೀಕರಣಕ್ಕಾಗಿ Settings UI ಅನ್ನು ನೋಡಿ.

### Discord

> ವೆಬ್ಹುಕ್ ಎಚ್ಚರಿಕೆಗಳು Slack ನಂತೆಯೇ ಅದೇ Settings UI ಪ್ರಕ್ರಿಯೆಯನ್ನು ಬಳಸುತ್ತವೆ. Discord ಅದೇ JSON ಪೇಲೋಡ್ ಸ್ವರೂಪವನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ.

### PagerDuty

> ವೆಬ್ಹುಕ್ ಎಚ್ಚರಿಕೆಗಳು ಅದೇ Settings UI ಪ್ರಕ್ರಿಯೆಯನ್ನು ಬಳಸುತ್ತವೆ. PagerDuty Events API v2 ರೂಟಿಂಗ್ ಕೀಗಳನ್ನು Settings UI ನಲ್ಲಿ ಸಂರಚಿಸಲಾಗುತ್ತದೆ.

### ಕಸ್ಟಮ್ ವೆಬ್ಹುಕ್ (JSON)

> JSON ಬಾಡಿಯೊಂದಿಗೆ POST ಅನ್ನು ಸ್ವೀಕರಿಸುವ ಯಾವುದೇ HTTP ಎಂಡ್ಪಾಯಿಂಟ್ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. URL ಅನ್ನು Settings UI ನಲ್ಲಿ ಸಂರಚಿಸಿ.

---

## ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸಂರಚನೆ

### Health ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅನ್ನು ಗ್ರಾಹಕೀಕರಿಸಿ

`~/.omniroute/dashboard.json` ಅನ್ನು ರಚಿಸಿ:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ಒದಗಿಸುವವರನ್ನು ಮೇಲ್ಭಾಗಕ್ಕೆ ಪಿನ್ ಮಾಡಿ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ದೋಷನಿವಾರಣೆ

### "ಒದಗಿಸುವವರು ಆರೋಗ್ಯಕರವಾಗಿದೆ ಎಂದು ಹೇಳುತ್ತಾರೆ, ಆದರೆ ವಿನಂತಿಗಳು ವಿಫಲವಾಗುತ್ತವೆ"

1. **autopilot ಸಮಸ್ಯೆಗಳನ್ನು** ಪರಿಶೀಲಿಸಿ — ಯಾವುದಾದರೂ ಮಾದರಿಯನ್ನು ಲಾಕ್ ಮಾಡಿರಬಹುದು
2. ನಿರ್ದಿಷ್ಟ ದೋಷ ವರ್ಗಕ್ಕಾಗಿ **ಇತ್ತೀಚಿನ ದೋಷಗಳನ್ನು** ನೋಡಿ
3. ಒದಗಿಸುವವರ ಕಾರ್ಡ್ನಲ್ಲಿರುವ **ಸಂಪರ್ಕ ಪರೀಕ್ಷೆಯನ್ನು** ಪ್ರಯತ್ನಿಸಿ
4. ಒದಗಿಸುವವರಿಗೆ **ಅಪ್ಸ್ಟ್ರೀಮ್ನಲ್ಲಿ ದರ ಮಿತಿ ವಿಧಿಸಲಾಗಿದೆಯೇ** ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ (ಸ್ಥಳೀಯವಾಗಿ ಗೋಚರಿಸುವುದಿಲ್ಲ)

### "ಕೋಟಾ ಆರೋಗ್ಯಕರವಾಗಿದೆ ಎಂದು ಹೇಳುತ್ತದೆ, ಆದರೆ ನನಗೆ 429 ದೋಷಗಳು ಕಾಣಿಸುತ್ತಿವೆ"

- 429 ಎಂದರೆ ನಿಮ್ಮ ಕೋಟಾವನ್ನು ನೀವು ಬಳಸಿದ್ದೀರಿ ಎಂದು ಒದಗಿಸುವವರು ಹೇಳುತ್ತಿದ್ದಾರೆ
- OmniRoute ನ ಕೋಟಾ ಟ್ರ್ಯಾಕಿಂಗ್ **ಹಳೆಯದಾಗಿರಬಹುದು** — ಒದಗಿಸುವವರ ಅಪ್ಸ್ಟ್ರೀಮ್ ಮಾಹಿತಿಯೇ ಅಧಿಕೃತ
- ಆಂತರಿಕ ಕೋಟಾ ಮಾನಿಟರ್ ಮೂಲಕ ಕೋಟಾ ಡೇಟಾ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಿಫ್ರೆಶ್ ಆಗುತ್ತದೆ

### "ಎಲ್ಲಾ ಗುರಿಗಳು ಆರೋಗ್ಯಕರವಾಗಿ ಕಂಡರೂ Combo ವಿಫಲವಾಗುತ್ತಿದೆ"

- ಗುರಿಗಳ ಕ್ರಮವಿನ್ಯಾಸದ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ **combo health** ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ
- **ಫಾಲ್ಬ್ಯಾಕ್ ಈವೆಂಟ್ಗಳನ್ನು** ನೋಡಿ — Combo ಬಹುಶಃ ತುಂಬಾ ಬೇಗ ಎಲ್ಲಾ ಆಯ್ಕೆಗಳನ್ನು ಖಾಲಿ ಮಾಡುತ್ತಿರಬಹುದು
- **ಕಾರ್ಯತಂತ್ರವು** ನಿಮ್ಮ ಬಳಕೆಯ ಸಂದರ್ಭಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆಯೇ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ (priority vs round-robin vs auto)

### "ಡೇಟಾಬೇಸ್ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ ವಿಫಲವಾಗುತ್ತಿದೆ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ಅನ್ನು ಚಲಾಯಿಸಿ
- "ok" ಆಗಿದ್ದರೆ — ಇದು ತಪ್ಪು ಎಚ್ಚರಿಕೆ; ಆರೋಗ್ಯ ಪರಿಶೀಲನೆಯು ಅಗತ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚು ಕಟ್ಟುನಿಟ್ಟಾಗಿದೆ
- ಬೇರೆ ಏನಾದರೂ ಆಗಿದ್ದರೆ — **OmniRoute ಅನ್ನು ನಿಲ್ಲಿಸಿ** ಮತ್ತು [ವಿಪತ್ತು ಮರುಪಡೆಯುವಿಕೆ ಮಾರ್ಗದರ್ಶಿಯನ್ನು](./DATABASE_GUIDE.md#disaster-recovery) ಅನುಸರಿಸಿ

### "ಮೆಮೊರಿ ಹೀಪ್ ಒತ್ತಡವು ಗಂಭೀರವಾಗಿದೆ"

```bash
# ಪ್ರಸ್ತುತ ಹೀಪ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ
node -e "console.log(process.memoryUsage())"

# ಹಸ್ತಚಾಲಿತ GC ಅನ್ನು ಪ್ರಚೋದಿಸಿ (--expose-gc ಆಗಿದ್ದರೆ)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ಏಕಕಾಲೀನ ವಿನಂತಿಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ (ಪರಿಸರ ಚರದ ಮೂಲಕವಲ್ಲ, ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ Settings ಪುಟದ ಮೂಲಕ ಹೊಂದಿಸಿ)
# `MAX_CONCURRENT_REQUESTS` ಪರಿಸರ ಚರ ಇಲ್ಲ — ಅದನ್ನು Settings → Concurrency ನಲ್ಲಿ ಸಂರಚಿಸಿ.
```

---

## ಇದನ್ನೂ ನೋಡಿ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ಬಳಕೆ ಮತ್ತು ವೆಚ್ಚದ ಟ್ರ್ಯಾಕಿಂಗ್
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB ಸ್ಕೀಮಾ + ಸ್ಥಿತಿಗತಿ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ಪ್ರಾಕ್ಸಿ ಸ್ಥಿತಿಗತಿ (ಪ್ರತ್ಯೇಕ ಕ್ಯಾಶ್)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ಸಿಸ್ಟಮ್ ಆರ್ಕಿಟೆಕ್ಚರ್
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ ವಿವರಗಳು
- ಮೂಲ: `src/lib/monitoring/` (4 ಫೈಲ್ಗಳು, 2121 LOC)
