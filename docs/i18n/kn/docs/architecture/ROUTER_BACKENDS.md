# Router Backends & Embedded Services — architecture contract (ADR) (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **ಸ್ಥಿತಿ:** ಅಂಗೀಕರಿಸಲಾಗಿದೆ · **ಸಂದರ್ಭ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **ಒಪ್ಪಂದ:** `domain/routing/routerBackends.ts`
> (ಟೈಪ್ಡ್ ರಿಜಿಸ್ಟ್ರಿ — ಕೋಡ್ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ಜೊತೆಗೆ ಲಭ್ಯವಾಗುತ್ತದೆ)

ಈ ADR, `ts` (ನೇಟಿವ್), `bifrost`, `cliproxy`, `9router`, ಮತ್ತು
VibeProxy-ಹೊಂದಾಣಿಕೆಯ ಎಂಜಿನ್ಗಳು ಪರಸ್ಪರ ಹೇಗೆ ಸಂಬಂಧಿಸಿವೆ ಎಂಬುದನ್ನು ನಿಖರವಾಗಿ ನಿರ್ಧರಿಸುತ್ತದೆ, ಇದರಿಂದ ಕೊಡುಗೆದಾರರು
ವಾಸ್ತುಶಿಲ್ಪದ ದೃಷ್ಟಿಯಿಂದ ವಿಭಿನ್ನವಾಗಿರುವ ಎರಡು ವಿಷಯಗಳನ್ನು ಒಂದೇ ಎಂದು ಭಾವಿಸುವುದು ತಪ್ಪುತ್ತದೆ. ಇದು router-backend-registry ಕೆಲಸವು ಪರಿಚಯಿಸಿದ ಟೈಪ್ಡ್
ರಿಜಿಸ್ಟ್ರಿಯನ್ನು ಆ ಮಾದರಿಯ ಏಕೈಕ ಅಧಿಕೃತ ಮೂಲವಾಗಿ ದಾಖಲಿಸುತ್ತದೆ.

## ಮೂಲಭೂತ ವ್ಯತ್ಯಾಸ — ಎರಡು ಪರಸ್ಪರ ಸ್ವತಂತ್ರ ಅಕ್ಷಗಳು

ಎಂಜಿನ್ನ ಪಾತ್ರವನ್ನು **ಎರಡು ಸ್ವತಂತ್ರ ಅಕ್ಷಗಳ** ಮೂಲಕ ವಿವರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಅವುಗಳನ್ನು
ರಿಜಿಸ್ಟ್ರಿಯ `RouterBackendDefinition` ನಲ್ಲಿ ಒಟ್ಟಿಗೆ ಎನ್ಕೋಡ್ ಮಾಡಲಾಗಿದೆ:

1. **ಜೀವನಚಕ್ರ** (`RouterBackendLifecycle`) — _ಎಂಜಿನ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ_:
   - `in-process` — OmniRoute Node ಪ್ರಕ್ರಿಯೆಯೊಳಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ (ನೇಟಿವ್ TS ಪೈಪ್ಲೈನ್).
   - `supervised` — OmniRoute, `ServiceSupervisor` ಮೂಲಕ ಸ್ಥಾಪಿಸುವ/ಪ್ರಾರಂಭಿಸುವ/ನಿಲ್ಲಿಸುವ/ಆರೋಗ್ಯ ಪರಿಶೀಲಿಸುವ
     ಸ್ಥಳೀಯ ಚೈಲ್ಡ್ ಪ್ರಕ್ರಿಯೆ; ನಂತರ ಅದನ್ನು ಪ್ರೊವೈಡರ್ ಸಂಪರ್ಕವಾಗಿ ಬಳಸುತ್ತದೆ.
   - `external` — OmniRoute ವಿನಂತಿಗಳನ್ನು ರವಾನಿಸುವ, ಆದರೆ ನಿರ್ವಹಿಸದ
     HTTP ಎಂಡ್ಪಾಯಿಂಟ್ (env ಮೂಲ URL ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗುತ್ತದೆ).
   - `disabled` — ನೋಂದಾಯಿಸಲಾಗಿದೆ, ಆದರೆ ಆಯ್ಕೆಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.
2. **ಆಯ್ಕೆ ಅಕ್ಷ** (ರಿಲೇ ರೂಟಿಂಗ್ ಬ್ಯಾಕೆಂಡ್) — _ರಿಲೇ ಅದಕ್ಕೆ ವಿನಂತಿಗಳನ್ನು ರವಾನಿಸುತ್ತದೆಯೇ ಎಂಬುದು_:
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` ನಲ್ಲಿ
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`.

ತಪ್ಪಿಸಬೇಕಾದ ತಪ್ಪು: "ಎಂಬೆಡೆಡ್ ಸರ್ವಿಸ್" ಮತ್ತು "ರೂಟಿಂಗ್ ಬ್ಯಾಕೆಂಡ್" ಅನ್ನು ಒಂದೇ
ಪಟ್ಟಿಯೆಂದು ಪರಿಗಣಿಸುವುದು. ಅವು ಒಂದೇ ಅಲ್ಲ. `supervised` ಎಂಜಿನ್ (9router/cliproxy) ಎಂಬುದು **ನೇಟಿವ್ ಪೈಪ್ಲೈನ್ ಬಳಸುವ
ಪ್ರೊವೈಡರ್ ಸಂಪರ್ಕವೇ ಹೊರತು**, ಪರ್ಯಾಯ ರಿಲೇ ಡಿಸ್ಪ್ಯಾಚ್
ಬ್ಯಾಕೆಂಡ್ ಅಲ್ಲ. `bifrost` ಇದಕ್ಕೆ ವಿರುದ್ಧವಾದದ್ದು — ಅದು (ಐತಿಹಾಸಿಕವಾಗಿ)
`external`-ಮಾತ್ರವಾಗಿದ್ದ ರಿಲೇ ಡಿಸ್ಪ್ಯಾಚ್ ಬ್ಯಾಕೆಂಡ್ ಆಗಿದೆ.

## ರಿಜಿಸ್ಟ್ರಿ — ಏಕೈಕ ಅಧಿಕೃತ ಮೂಲ

`domain/routing/routerBackends.ts` ಒಪ್ಪಂದವು (ಕೋಡ್
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ಜೊತೆಗೆ ಲಭ್ಯವಾಗುತ್ತದೆ) ಪ್ರತಿಯೊಂದು ಎಂಜಿನ್ ಅನ್ನು ಅದರ
ಜೀವನಚಕ್ರ, ಸಾಮರ್ಥ್ಯಗಳು, ಸರ್ವಿಸ್ ಗುರುತು, ಡೀಫಾಲ್ಟ್ ಪೋರ್ಟ್, ಆರೋಗ್ಯ ಕಾನ್ಫಿಗರೇಶನ್ ಮತ್ತು
ಟೆಲಿಮೆಟ್ರಿ ಬೆಂಬಲದೊಂದಿಗೆ ಒಂದೇ ಬಾರಿ ಘೋಷಿಸುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಸೈಡ್ಕಾರ್ಗಾಗಿ
ವಿಶೇಷ ಷರತ್ತುಗಳನ್ನು ಬರೆಯುವ ಬದಲು, ಬಳಕೆದಾರರು `getRouterBackend(id)`,
`listRouterBackends()`, ಮತ್ತು `listRouterBackendsByCapability(cap)` ಮೂಲಕ ಎಂಜಿನ್ಗಳನ್ನು ಹುಡುಕುತ್ತಾರೆ.

| ಬ್ಯಾಕೆಂಡ್   | ಜೀವನಚಕ್ರ     | ಸರ್ವಿಸ್ (ಅಕ್ಷ A) | ರಿಲೇ ಬ್ಯಾಕೆಂಡ್ (ಅಕ್ಷ B) | ಆರೋಗ್ಯ        | ಡೀಫಾಲ್ಟ್ ಪೋರ್ಟ್ |
| ----------- | ------------ | ---------------- | ----------------------- | ------------- | --------------- |
| `ts`        | `in-process` | —                | `ts` (ನೇಟಿವ್)           | —             | —               |
| `bifrost`   | `external`¹  | —¹               | `bifrost` / `auto`      | `/health`     | —               |
| `cliproxy`  | `supervised` | `cliproxy`       | — (ಪ್ರೊವೈಡರ್)           | `/v1/models`  | 8317            |
| `9router`   | `supervised` | `9router`        | — (ಪ್ರೊವೈಡರ್)           | `/api/health` | 20130           |
| `vibeproxy` | `external`   | —                | — (ಪ್ರೊವೈಡರ್ ಅಡಾಪ್ಟರ್)  | `/v1/models`  | —               |

¹ Bifrost ಅನ್ನು `/api/services/bifrost/` ನಿಂದ ಸ್ಥಾಪಿಸಬಹುದಾದ/ಪ್ರಾರಂಭಿಸಬಹುದಾದ
`supervised` ಎಂಬೆಡೆಡ್ ಸರ್ವಿಸ್ ಆಗಿ ಉತ್ತೇಜಿಸುವ ಕೆಲಸವನ್ನು
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) ನಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ; ಅದು ಮರ್ಜ್ ಆಗುವವರೆಗೆ,
Bifrost `external`-ಮಾತ್ರವಾಗಿರುತ್ತದೆ (`BIFROST_BASE_URL` ಮೂಲಕ ಮಾತ್ರ ತಲುಪಬಹುದು).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ಕಾಲರ್ಗಳಿಗೆ
ಪ್ರತಿ id ಗಾಗಿ ಶಾಖೆಗಳನ್ನು ಹಾರ್ಡ್-ಕೋಡ್ ಮಾಡುವ ಬದಲು, ಎಂಜಿನ್ ನಿಜವಾಗಿ ಏನು ಮಾಡಬಲ್ಲದು ಎಂಬುದರ ಆಧಾರದ ಮೇಲೆ
ಫಿಲ್ಟರ್ ಮಾಡಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ.

## ಅಕ್ಷ A — ಎಂಬೆಡೆಡ್ ಸೇವೆಗಳು (ಮೇಲ್ವಿಚಾರಿತ ಪ್ರಕ್ರಿಯೆಯ ಭಾಗ)

- **ಮೇಲ್ವಿಚಾರಿತ ಪ್ರಕ್ರಿಯೆಗಳ ರಿಜಿಸ್ಟ್ರಿ:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ಪ್ರಸ್ತುತ: `9router`, `cliproxy`).
- **ಲೈಫ್ಸೈಕಲ್ ಮಾಲೀಕ:** `src/lib/services/ServiceSupervisor.ts` — `start()` ಚೈಲ್ಡ್
  ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸ್ಪಾನ್ ಮಾಡುತ್ತದೆ, `waitForHealthy()` ಮೂಲಕ ಗೇಟ್ ಮಾಡುತ್ತದೆ ಮತ್ತು stdout/stderr ಅನ್ನು ರಿಂಗ್ ಬಫರ್ಗೆ ಸೆರೆಹಿಡಿಯುತ್ತದೆ;
  `stop()` SIGTERM→SIGKILL; ಎಲ್ಲವನ್ನೂ ಲಾಕ್ ಅಡಿಯಲ್ಲಿ ಅನುಕ್ರಮವಾಗಿ ಕಾರ್ಯಗತಗೊಳಿಸಲಾಗುತ್ತದೆ.
- **ಸ್ಥಿತಿ ಯೂನಿಯನ್** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, ಜೊತೆಗೆ
  ಸ್ವತಂತ್ರವಾದ `HealthState = healthy | unhealthy | unknown`.
- **ಪ್ರತ್ಯೇಕ ಪ್ರಕ್ರಿಯೆ ಏಕೆ (ಇನ್-ಪ್ರೊಕ್ SDK ಅಲ್ಲ)?** ಪ್ರಕ್ರಿಯೆಯ ಪ್ರತ್ಯೇಕತೆಯೇ ಪ್ರತಿ ಸೈಡ್ಕಾರ್ನ
  ಸ್ಥಾಪನೆ/ಪ್ರಾರಂಭ/ನಿಲ್ಲಿಸುವಿಕೆ/ಆರೋಗ್ಯ/ಲಾಗ್ಗಳನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ನಿಯಂತ್ರಿಸಲು ಸಾಧ್ಯವಾಗಿಸುತ್ತದೆ ಮತ್ತು
  ಲೂಪ್ಬ್ಯಾಕ್ ಸ್ಪಾನ್-ಗಾರ್ಡ್ ಅನ್ವಯವಾಗಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ. ಇನ್-ಪ್ರೊಕ್ ಅಡಾಪ್ಟರ್ ಅನ್ನು ಮಾದರಿಗೊಳಿಸುವುದು ಭವಿಷ್ಯದ ಕೆಲಸ —
  ಅದನ್ನು ವ್ಯಕ್ತಪಡಿಸಲು `native-hot-path` ಸಾಮರ್ಥ್ಯ ಫ್ಲ್ಯಾಗ್ ಬಳಸಲಾಗುತ್ತದೆ.

### ಲೈಫ್ಸೈಕಲ್ ರೂಟ್ ಒಪ್ಪಂದ (`/api/services/<tool>/…`)

ಸ್ಥಿತಿ ಕೋಡ್ಗಳು ವಿನ್ಯಾಸದ ಪ್ರಕಾರವೇ **ಸ್ಥಿತಿ/ಕ್ರಿಯಾಪದ/ಪಥಕ್ಕೆ ನಿರ್ದಿಷ್ಟವಾಗಿವೆ** — ಇದು ಒಪ್ಪಂದವೇ ಹೊರತು
ಅಸಂಗತತೆಯಲ್ಲ:

| ಕರೆ                          | ಸ್ಥಿತಿ                                 | ಸ್ಥಿತಿ ಕೋಡ್                          |
| ---------------------------- | -------------------------------------- | ------------------------------------ |
| `POST .../start`             | ಸೇವೆ `not_installed`                   | **409** (ಪೂರ್ವಷರತ್ತು)                |
| `POST .../stop`              | ಈಗಾಗಲೇ ನಿಲ್ಲಿಸಲಾಗಿದೆ                   | **200** (ಐಡೆಂಪೊಟೆಂಟ್ ನೋ-ಆಪ್)         |
| `GET .../status`             | ಸರಿ                                    | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | ಸ್ಪಾನ್ ವೈಫಲ್ಯ                          | **503** (ತಾತ್ಕಾಲಿಕ)                  |
| `GET .../status`, `.../stop` | ಹಿಡಿಯದ ದೋಷ                             | **500**                              |
| `GET /api/services/<x>/logs` | ಅಜ್ಞಾತ ಟೂಲ್ `<x>`                      | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` ಕಾಣೆಯಾಗಿದೆ     | **403** (`9router`ಗೆ ಮಾತ್ರ)          |
| **ಯಾವುದೇ** `/api/services/*` | ಕರೆ ಮಾಡುವವರು ಲೂಪ್ಬ್ಯಾಕ್/ಖಾಸಗಿ-LAN ಅಲ್ಲ | **403 LOCAL_ONLY**                   |

ಎಲ್ಲಾ ದೋಷ ಬಾಡಿಗಳನ್ನು `createErrorResponse()` ಈ ಆಕಾರದಲ್ಲಿ ರೂಪಿಸುತ್ತದೆ →
`{ error: { message, type }, requestId }`, ಇಲ್ಲಿ `type` ಅನ್ನು ಸ್ಥಿತಿ ಕೋಡ್ನಿಂದ
(`500→server_error`, `404→not_found`, `409→conflict`, ಇಲ್ಲದಿದ್ದರೆ `invalid_request`)
ಪಡೆಯಲಾಗುತ್ತದೆ ಮತ್ತು ಅದು ಯಂತ್ರದಿಂದ ಕಾರ್ಯಗತಗೊಳಿಸಬಹುದಾದ ವಿಭೇದಕವಾಗಿದೆ. ಸಂದೇಶಗಳನ್ನು ಮೊದಲೇ ಸ್ಯಾನಿಟೈಸ್ ಮಾಡಲಾಗುತ್ತದೆ
(`sanitizeErrorMessage()`, ಕಠಿಣ ನಿಯಮ #12).

**ಲೂಪ್ಬ್ಯಾಕ್ ಗಾರ್ಡ್** ಒಂದು `403`ಗೆ ಅತ್ಯಂತ ಸಾಮಾನ್ಯ ಕಾರಣವಾಗಿದೆ: `/api/services/` ಎಂಬುದು
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ಒಳಗೊಂಡಿದೆ ಮತ್ತು
`src/server/authz/policies/management.ts` ಯಾವುದೇ ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ / ಖಾಸಗಿ-LAN ಅಲ್ಲದ
ಕರೆ ಮಾಡುವವರನ್ನು **ದೃಢೀಕರಣಕ್ಕೂ ಮೊದಲು** ತಿರಸ್ಕರಿಸುತ್ತದೆ, ಏಕೆಂದರೆ ಈ ರೂಟ್ಗಳು ಚೈಲ್ಡ್ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಸ್ಪಾನ್ ಮಾಡುತ್ತವೆ (ಕಠಿಣ ನಿಯಮಗಳು 15
ಮತ್ತು 17). ಸಾರ್ವಜನಿಕ ಟನಲ್ ಮೂಲಕ ಅವುಗಳನ್ನು ತಲುಪಿದಾಗ ವಿನ್ಯಾಸದ ಪ್ರಕಾರವೇ `403` ದೊರೆಯುತ್ತದೆ.

## ಅಕ್ಷ B — ರಿಲೇ ರೂಟಿಂಗ್ ಬ್ಯಾಕೆಂಡ್ (ಡಿಸ್ಪ್ಯಾಚ್ ಭಾಗ)

ರಿಲೇ ಪ್ರಾಕ್ಸಿ ಪಥ `/api/v1/relay/chat/completions` ಮಾತ್ರ ಡಿಸ್ಪ್ಯಾಚ್
ಬ್ಯಾಕೆಂಡ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತದೆ; ಮುಖ್ಯ `/api/v1/chat/completions` ಮೇಲ್ಮೈ ಎಂದಿಗೂ
`routingBackend.ts` ಅನ್ನು ಪರಿಗಣಿಸುವುದಿಲ್ಲ.

- **ಆಯ್ಕೆ** (`resolveRelayRoutingBackend`): ಒಂದೇ ಜಾಗತಿಕ env ಟಾಗಲ್ —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  ಹೊಂದಿಸದಿದ್ದರೆ, Bifrost ಕಾನ್ಫಿಗರ್ ಆಗಿ ಸಕ್ರಿಯಗೊಂಡಿರುವಾಗ `auto`, ಇಲ್ಲದಿದ್ದರೆ `ts`.
- **ವರ್ತನೆ:**
  - `bifrost` (ಬಲವಂತಪಡಿಸಿದ): Bifrost ವೈಫಲ್ಯ → ನೇರ `502`, ಯಾವುದೇ ಫಾಲ್ಬ್ಯಾಕ್ ಇಲ್ಲ.
  - `auto`: Bifrost ಅನ್ನು ಪ್ರಯತ್ನಿಸುತ್ತದೆ; ವೈಫಲ್ಯ/ಕೂಲ್ಡೌನ್ ಉಂಟಾದರೆ ಮೌನವಾಗಿ ನೇಟಿವ್ಗೆ ಮುಂದುವರಿಯುತ್ತದೆ.
  - `ts` / ಫಾಲ್ಬ್ಯಾಕ್ ನಂತರ: ನೇಟಿವ್ `open-sse` ಅನುವಾದಕ/ಎಕ್ಸಿಕ್ಯೂಟರ್ ಪೈಪ್ಲೈನ್.
- **ಕೂಲ್ಡೌನ್:** `bifrostCooldown.ts`ನಲ್ಲಿ ಪ್ರತಿ-`baseUrl` ವೈಫಲ್ಯ ಕೂಲ್ಡೌನ್.

ಪ್ರಸ್ತುತ ಆಯ್ಕೆಯು ರಿಲೇ ಮಟ್ಟದಲ್ಲಿ **ಸಂಪೂರ್ಣವಾಗಿ ಅನ್ವಯಿಸುತ್ತದೆ ಅಥವಾ ಅನ್ವಯಿಸುವುದೇ ಇಲ್ಲ** — `release/v3.8.43`ನಲ್ಲಿ
ಪ್ರತಿ-ಪ್ರೊವೈಡರ್ ಅಥವಾ ಪ್ರತಿ-ವಿನಂತಿ ಎಂಜಿನ್ ಬದಲಾವಣೆ ಇಲ್ಲ. ಪ್ರತಿ-ವಿನಂತಿ ಗೇಟ್ ಅನ್ನು
ಸೈಡ್ಕಾರ್-ಮ್ಯಾನಿಫೆಸ್ಟ್ ಕೆಲಸದ ಮೂಲಕ ಸೇರಿಸಲಾಗುತ್ತಿದೆ
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) ಮ್ಯಾನಿಫೆಸ್ಟ್ +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ಇದು ಮ್ಯಾನಿಫೆಸ್ಟ್ಗೆ ಅರ್ಹವಾಗಿರುವ ಪ್ರೊವೈಡರ್ಗಳನ್ನು ಮಾತ್ರ Bifrost ಮೂಲಕ ರೂಟ್ ಮಾಡಲು `auto`ಗೆ ಅವಕಾಶ ನೀಡುತ್ತದೆ.

## ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಏಕೀಕರಣ

ಸೇವೆಗಳ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪ್ರತಿ 5s ಗೆ
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` ಮೂಲಕ
`GET /api/services/<tool>/status` ಅನ್ನು ಪೋಲ್ ಮಾಡುತ್ತದೆ ಮತ್ತು `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಯಾವುದೇ ಹಂಚಿಕೆಯ ಲಭ್ಯತೆ-ಸಂದರ್ಭ ಪೂರೈಕೆದಾರವಿಲ್ಲ —
ಪ್ರತಿಯೊಂದು ಘಟಕವು ಪ್ರತಿ ಟೂಲ್ಗೆ ಹುಕ್ ಅನ್ನು ಕರೆಮಾಡುತ್ತದೆ. `!res.ok` ಸಂದರ್ಭದಲ್ಲಿ ಹುಕ್ ಪ್ರಸ್ತುತ
ಕೇವಲ `HTTP <status>` ಅನ್ನು ತೋರಿಸುತ್ತದೆ; `error.type` ಕ್ಷೇತ್ರವನ್ನು ಮಾನವ-ಗ್ರಾಹ್ಯ ವಿವರಣೆಗೆ ಮ್ಯಾಪ್ ಮಾಡುವುದು
ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾದ UX ಸುಧಾರಣೆಯೇ ಹೊರತು ಒಪ್ಪಂದದ ಬದಲಾವಣೆಯಲ್ಲ.

## ಪರಿಣಾಮಗಳು

- ಹೊಸ ಎಂಜಿನ್ಗಳು `ROUTER_BACKENDS` ನಲ್ಲಿ ಒಮ್ಮೆ ನೋಂದಾಯಿಸಿಕೊಳ್ಳುತ್ತವೆ; ಗ್ರಾಹಕರು ಹೊಸ ಪ್ರತಿ-id ಶಾಖೆಗಳಿಲ್ಲದೆ ಸಾಮರ್ಥ್ಯ
  ಕ್ವೆರಿಗಳ ಮೂಲಕ ಅವುಗಳನ್ನು ಪಡೆಯುತ್ತಾರೆ.
- "ಇದು ಸೇವೆಯೇ ಅಥವಾ ರೂಟಿಂಗ್ ಬ್ಯಾಕೆಂಡ್ ಆಗಿದೆಯೇ?" ಎಂಬುದಕ್ಕೆ ಉತ್ತರವನ್ನು `lifecycle` ಕ್ಷೇತ್ರವು ನಿರ್ಧರಿಸುತ್ತದೆ,
  ಯಾವುದೋ ಪಟ್ಟಿಯಲ್ಲಿ id ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ ಎಂಬುದಲ್ಲ.
- Bifrost ಮೇಲ್ವಿಚಾರಣೆ (#5817) ಮತ್ತು ನೆಟಿವ್ ಹಾಟ್-ಪಾತ್ ವಲಸೆ (#5670) ಪ್ರತಿಯೊಂದು
  ಸೈಡ್ಕಾರ್ಗೆ ವಿಶೇಷ-ಪ್ರಕರಣಗಳನ್ನು ಸೇರಿಸುವ ಬದಲು ಈ ಹಂಚಿಕೆಯ ಒಪ್ಪಂದದ ಮೇಲೆ ನಿರ್ಮಾಣಗೊಳ್ಳುತ್ತವೆ.
