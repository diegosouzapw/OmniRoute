# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ವಿಭಿನ್ನ ವ್ಯಾಪ್ತಿಗಳನ್ನು ಹೊಂದಿರುವ ಪ್ರಕ್ರಿಯೆ-ಸ್ಥಳೀಯವಾದ **ಎರಡು** ಲೇನ್ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಹೊಂದಿದೆ. ಅವು
ಪರಸ್ಪರ ಪೂರಕವಾಗಿವೆ; ಆಪರೇಟರ್ಗಳು ತಾವು ಯಾವುದನ್ನು ನೋಡುತ್ತಿದ್ದೇವೆ ಎಂಬುದನ್ನು ತಿಳಿದಿರಬೇಕು.

## 1. ಬೈಟ್-ಮಟ್ಟದ ಪ್ರಕ್ರಿಯೆ-ವ್ಯಾಪಿ ಪ್ರವೇಶ ನಿಯಂತ್ರಣ (`chatBodyAdmission.ts`)

- **ವ್ಯಾಪ್ತಿ:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses` ಮತ್ತು ಇತರ ಚಾಟ್-ಸ್ವರೂಪದ ಮಾರ್ಗಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ buffered-body/heap ಪಥ. ದೊಡ್ಡ coding-agent bodyಗಳಿಂದ ಉಂಟಾಗುವ heap amplification ವಿರುದ್ಧ ರಕ್ಷಿಸುತ್ತದೆ (#4380).
- **ಪ್ರತಿ-key laneಗಳ ಬದಲಿಗೆ ಒಂದೇ process-global controller (#10110).** ಪ್ರತಿಯೊಂದು API key (hashed) ಅಥವಾ `anonymous` session **ಅದೇ** ಹಂಚಿಕೆಯ budgetಗೆ ಅನುಗುಣವಾಗಿ ಪ್ರವೇಶ ಪಡೆಯುತ್ತದೆ — hashed session id ಅನ್ನು fairness scheduling key ಆಗಿ (ಕಾಯುತ್ತಿರುವವರ ನಡುವೆ round-robin dispatch) ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ, capacity shard ಆಗಿ ಎಂದಿಗೂ ಬಳಸಲಾಗುವುದಿಲ್ಲ. ಈ ದಾಖಲೆಯ ಹಿಂದಿನ ಆವೃತ್ತಿಯು ಸ್ವತಂತ್ರ capacity ಹೊಂದಿರುವ ಪ್ರತಿ-key laneಗಳನ್ನು ವಿವರಿಸಿತ್ತು; ದೃಢೀಕರಿಸದ ನಕಲಿ credentialಗಳು process-wide bound ಅನ್ನು ಗುಣಿಸಲು ಆ ಮಾದರಿ ಅವಕಾಶ ನೀಡಿದ್ದರಿಂದ, ಅದನ್ನು #10110ರಲ್ಲಿ ತೆಗೆದುಹಾಕಲಾಯಿತು.
- **Gate (#503-fanout): ಸ್ಥಿರ request count ಅಲ್ಲ, ಸ್ವಯಂ-ವ್ಯುತ್ಪನ್ನಗೊಂಡ ingest BYTE budget.** ಹಳೆಯ `CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap (ಈ ತಿದ್ದುಪಡಿಗೆ ಮೊದಲು default `1`) coding-agent fan-out ಅನ್ನು (ಬಹು subagentಗಳು/CLIಗಳು, ಸಾಮಾನ್ಯವಾಗಿ > 256 KB bodyಗಳು) ಪರಿಣಾಮಕಾರಿ concurrency ~1ಕ್ಕೆ ಕುಗ್ಗಿಸಿತು; ಇದರಿಂದ ಸಂಪೂರ್ಣವಾಗಿ ಸಾಮಾನ್ಯವಾದ load ಅಡಿಯಲ್ಲೇ 503 ಪ್ರತಿಕ್ರಿಯೆ ಉಂಟಾಗುತ್ತಿತ್ತು. ಈಗ operator ಒಬ್ಬರು `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ಅನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಹೊಂದಿಸಿದಾಗ ಮಾತ್ರ ಅದು ಅನ್ವಯಿಸುತ್ತದೆ. ಅದನ್ನು ಹೊಂದಿಸದೆ ಬಿಟ್ಟರೆ, ಪ್ರವೇಶವನ್ನು ಬದಲಿಗೆ `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ನಿಯಂತ್ರಿಸುತ್ತದೆ — ಇದು ಪ್ರಕ್ರಿಯೆಯ ನೈಜ memory ceilingನಿಂದ ಸ್ವಯಂ-ವ್ಯುತ್ಪನ್ನಗೊಳ್ಳುವ budget ಆಗಿದೆ (`src/shared/middleware/admissionBudget.ts`): V8 heap limit ಮತ್ತು ಯಾವುದೇ cgroup/container limit ಇವುಗಳಲ್ಲಿ ಹೆಚ್ಚು ಕಟ್ಟುನಿಟ್ಟಾದ ಮಿತಿಯ 25% ಅನ್ನು 8x transient-amplification factorನಿಂದ ಭಾಗಿಸಿ, 8 MiB ಮತ್ತು 2 GiB ನಡುವೆ ಮಿತಿಗೊಳಿಸಲಾಗುತ್ತದೆ. ಸ್ಪಷ್ಟ overrideಗಳು ಇದೇ ಮಿತಿಗಳನ್ನು ಬಳಸುತ್ತವೆ. ಯಾವುದೇ env tuning ಇಲ್ಲದೆಯೇ ಇದು 512 MB containerನಿಂದ 32 GB desktopವರೆಗೆ ಸ್ವತಃ ಹೊಂದಿಕೊಳ್ಳುತ್ತದೆ. ಪರಿಣಾಮಕಾರಿ budget ಒಳಗೆ ಹೊಂದಲಾರದ body ತಕ್ಷಣವೇ `413 body_exceeds_budget` ದೋಷದೊಂದಿಗೆ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ; ಪ್ರತ್ಯೇಕವಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಬಹುದಾದ bodyಗಳ ನಡುವಿನ contention ಮಾತ್ರ ಮಿತಿಗೊಳಿಸಿದ fairness queueಗೆ ಪ್ರವೇಶಿಸುತ್ತದೆ. live multi-signal resource-pressure tracker (V8 heap ratio, cgroup, PSI, OOM eventಗಳು — `open-sse/utils/resourcePressurePolicy.ts`) `high` pressure ಅಡಿಯಲ್ಲಿ ಮಿತಿಗೊಳಿಸಿದ ಕಾಯುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಯಾವುದೇ byteಗಳನ್ನು ingest ಮಾಡುವುದಕ್ಕೂ ಮೊದಲೇ `critical` pressure ಅಡಿಯಲ್ಲಿ `503 resource_pressure` ದೋಷದೊಂದಿಗೆ ತಕ್ಷಣವೇ load ಅನ್ನು ತಿರಸ್ಕರಿಸುತ್ತದೆ. ಲಭ್ಯವಿದ್ದಾಗ, ಈ unitನ cgroup `memory.pressure`ನಿಂದ PSI ಅನ್ನು ಓದಲಾಗುತ್ತದೆ (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` host-wide ಆಗಿದ್ದು, bare metal / cgroup v1ನಲ್ಲಿ ಮಾತ್ರ fallback ಆಗಿದೆ. ಆದ್ದರಿಂದ swapping ಆಗುತ್ತಿರುವ host ಒಂದು idle containerಗೆ 503 ಉಂಟುಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.
- **Tuning:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ಸ್ವಯಂ-ವ್ಯುತ್ಪನ್ನಗೊಂಡ byte budgetಗೆ override
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ಹಳೆಯ request-count cap, opt-in ಮಾತ್ರ
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503ಕ್ಕೂ ಮೊದಲಿನ queue-wait (default 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queued-bytes heap valve (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110ರಿಂದ deprecated
    no-opಗಳು (config compatibilityಗಾಗಿ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ, ನಿರ್ಲಕ್ಷಿಸಲಾಗುತ್ತದೆ)
- **ವರದಿಗಳು:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — #503-fanout ಸೇರ್ಪಡೆಗಳಾದ `inflightBytes`, `maxInflightBytes`, `budgetSource` (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, ಮತ್ತು `countCapEnabled` ಸೇರಿದಂತೆ (default deploymentನಲ್ಲಿ false — ನಿಜವಾಗಿ ಅನ್ವಯವಾಗುತ್ತಿರುವುದು byte budget ಆಗಿದೆಯೇ ಹೊರತು ಹಳೆಯ count cap ಅಲ್ಲ ಎಂಬುದನ್ನು ದೃಢಪಡಿಸುತ್ತದೆ).

## 2. ಹೊಂದಾಣಿಕೆಯಾಗುವ ರನ್ಟೈಮ್ ವರ್ಚುವಲ್ ಲೇನ್ಗಳು (`open-sse/services/admission`)

- **ವ್ಯಾಪ್ತಿ:** ಪ್ರೊವೈಡರ್ ಡಿಸ್ಪ್ಯಾಚ್ಗಾಗಿ tenant-key ಪ್ರವೇಶ — ಕ್ಯೂ ವೆಚ್ಚ, ಲೇಟೆನ್ಸಿ-ಮಾರ್ಗದರ್ಶಿತ
  ಮಿತಿ ಹೊಂದಾಣಿಕೆ, ಲೇನ್ ಕ್ಯೂಯಿಂಗ್ ಮತ್ತು ಲೇನ್ ಮೆಟ್ರಿಕ್ಗಳು.
- **ಗೇಟ್:** **ಆಯ್ಕೆಯ ಮೇರೆಗೆ ಸಕ್ರಿಯಗೊಳಿಸಬೇಕು.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` ಇಲ್ಲದಿದ್ದರೆ ನಿಷ್ಕ್ರಿಯವಾಗಿರುತ್ತದೆ. ಅದು ಇಲ್ಲದೆ,
  ಹೊಂದಾಣಿಕೆಯ ನಿಯಂತ್ರಕವು ಹಂಚಿಕೆಯ ಕ್ಯೂ ವರ್ತನೆಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ (#9654 ರ ಮಾನದಂಡ 1
  ಆಪರೇಟರ್ ಲೇನ್ಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿದ ನಂತರವೇ ಅನ್ವಯಿಸುತ್ತದೆ).
- **ಟ್ಯೂನಿಂಗ್:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + ಹೊಂದಾಣಿಕೆಯ ಕಾನ್ಫಿಗ್ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **ವರದಿಗಳು:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ಅಪಾರದರ್ಶಕ ಲೇನ್ IDಗಳು, ಎಂದಿಗೂ ಮೂಲ
  ಕೀಗಳಲ್ಲ), ಮತ್ತು `virtualLanes` — ಸ್ನ್ಯಾಪ್ಶಾಟ್ನಲ್ಲಿ "ಲೇನ್ಗಳು ಸಕ್ರಿಯವಾಗಿವೆ" ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸುವ ಅಧಿಕೃತ ಫ್ಲ್ಯಾಗ್.

## 3. ಫ್ಯಾನ್-ಔಟ್ ಪ್ರೋಬ್ಗಳು — ಕಾಂಬೊ/ಫ್ಯೂಷನ್ಗಾಗಿ ಪ್ರತಿ-ಟಾರ್ಗೆಟ್ ಪ್ರವೇಶ (#9654 Wave 2)

ಕಾಂಬೊ (ಆದ್ಯತೆ / ರೌಂಡ್-ರಾಬಿನ್) ಮತ್ತು ಫ್ಯೂಷನ್ ಒಂದೇ ಪೇರೆಂಟ್
ರಿಕ್ವೆಸ್ಟ್ ಅಡಿಯಲ್ಲಿ N ಮಾಡೆಲ್ ಟಾರ್ಗೆಟ್ಗಳಿಗೆ ಫ್ಯಾನ್-ಔಟ್ ಮಾಡುತ್ತವೆ. #9654 Wave 2 ರಿಂದ, **ಪ್ರತಿ ಫ್ಯಾನ್-ಔಟ್ ಟಾರ್ಗೆಟ್ ಅನ್ನು ಡಿಸ್ಪ್ಯಾಚ್ಗೆ ಮೊದಲು ಗೇಟ್ ಮಾಡಲಾಗುತ್ತದೆ** —
**ಪೇರೆಂಟ್ನ** tenant ಲೇನ್ಗೆ ವಿರುದ್ಧವಾಗಿ ಪ್ರತಿ-ಟಾರ್ಗೆಟ್ ಪ್ರೋಬ್ (`PerTargetAdmissionHook`, ಇದನ್ನು `createPerTargetAdmissionHook`
ನಿರ್ಮಿಸುತ್ತದೆ) ಮೂಲಕ.

- **ವ್ಯಾಪ್ತಿ:** ಕಾಂಬೊ, ಫ್ಯೂಷನ್ ಮತ್ತು chaos ಎಂಜಿನ್ ಡಿಸ್ಪ್ಯಾಚ್ ಮಾಡುವ ಪ್ರತಿಯೊಂದು ಫ್ಯಾನ್-ಔಟ್ ಟಾರ್ಗೆಟ್.
  System 1 (ಬೈಟ್-ಮಟ್ಟದ) ಮೇಲೆ ಯಾವುದೇ ಪರಿಣಾಮವಿಲ್ಲ — ಅದು ಫ್ಯಾನ್-ಔಟ್ ಟಾರ್ಗೆಟ್ಗಳನ್ನು ಎಂದಿಗೂ ಪ್ರೋಬ್ ಮಾಡುವುದಿಲ್ಲ.
- **ಗೇಟ್:** **system 2 ಜೊತೆಗೆ ಆಯ್ಕೆಯ ಮೇರೆಗೆ ಸಕ್ರಿಯಗೊಳಿಸಬೇಕು.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ಹೊಂದಿಸದಿದ್ದಾಗ ಇದು ಯಾವುದೇ ಕಾರ್ಯ ಮಾಡದು — ಆ ಮೋಡ್ನಲ್ಲಿ ಪೇರೆಂಟ್ ರಿಕ್ವೆಸ್ಟ್ ಈಗಾಗಲೇ ಹಂಚಿಕೆಯ-ಕ್ಯೂ ಲೀಸ್ ಅನ್ನು ಹೊಂದಿರುತ್ತದೆ,
  ಆದ್ದರಿಂದ ಪ್ರೋಬ್ ಮಾಡುವುದರಿಂದ ಎರಡು ಬಾರಿ ಎಣಿಕೆಯಾಗಿ ಕಾಂಬೊ ಟಾರ್ಗೆಟ್ಗಳು ತಿರಸ್ಕೃತವಾಗುತ್ತವೆ.
- **ಸೆಮ್ಯಾಂಟಿಕ್ಸ್:**
  - **ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಾನ್-ಬ್ಲಾಕಿಂಗ್ — ಬಿಟ್ಟುಬಿಡಿ, ಎಂದಿಗೂ ಕ್ಯೂ ಮಾಡಬೇಡಿ.** `maxWaitMs 0`: ತುಂಬಿದ ಲೇನ್
    ಟಾರ್ಗೆಟ್ ಅನ್ನು ಬಿಟ್ಟುಬಿಡುತ್ತದೆ ಮತ್ತು ಬದಲಿಗೆ ಕಾಂಬೊದ ಫಾಲ್ಬ್ಯಾಕ್ ವ್ಯವಸ್ಥೆ (ಅಥವಾ ಫ್ಯೂಷನ್ನ ಸರ್ವೈವರ್
    ಪ್ಯಾನೆಲ್) ಸೇವೆ ಒದಗಿಸುತ್ತದೆ. ಇದು ಉದ್ದೇಶಪೂರ್ವಕ: ಫ್ಯಾನ್-ಔಟ್ ಟಾರ್ಗೆಟ್ ಅನಗತ್ಯವಾಗಿ ಪುನರಾವರ್ತಿತವಾಗುವ
    ಕೆಲಸವಾಗಿದೆ ಮತ್ತು ಅದನ್ನು ಕ್ಯೂ ಮಾಡುವುದರಿಂದ ಲೇನ್ಗಳು ತಡೆಯಲು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಅದೇ ನಿಖರವಾದ ದಟ್ಟಣೆಯ ಮೇಲೆ
    ಮತ್ತಷ್ಟು ಲೋಡ್ ಸೇರುತ್ತದೆ. ಆದ್ದರಿಂದ `defaultMaxWaitMs` **ಪೇರೆಂಟ್ ರಿಕ್ವೆಸ್ಟ್ಗೆ ಮಾತ್ರ** ಅನ್ವಯಿಸುತ್ತದೆ;
    ಫ್ಯಾನ್-ಔಟ್ ಪ್ರೋಬ್ಗಳು ಎಂದಿಗೂ ಕಾಯುವುದಿಲ್ಲ ಮತ್ತು ಅವುಗಳನ್ನು ಕಾಯುವಂತೆ ಮಾಡಲು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ **ಯಾವುದೇ ನಾಬ್ ಇಲ್ಲ**
    (ಸಮಸ್ಯೆಯ ಇತಿಹಾಸವು ಕಾಯುವಿಕೆ ನಾಬ್ಗಳು #9654 ತಡೆಯುವ ಸಾಮೂಹಿಕ-502/504 ವರ್ಗವನ್ನು
    ಉಂಟುಮಾಡಿದ್ದವು ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ — ಬಿಟ್ಟುಬಿಡಲಾದ ಫ್ಯಾನ್-ಔಟ್ ಟಾರ್ಗೆಟ್ಗಳು ಪ್ರತಿಕ್ರಿಯೆಯ ಗುಣಮಟ್ಟಕ್ಕೆ
    ಹಾನಿಮಾಡುತ್ತಿವೆ ಎಂದು ಆಪರೇಟರ್ ವರದಿ ಮಾಡಿದರೆ ಮಾತ್ರ ಮರುಪರಿಶೀಲಿಸಿ).
  - **ಪ್ರವೇಶಿಸಿದಾಗ ಬಿಡುಗಡೆ.** ಪ್ರವೇಶ ಪಡೆದ ಪ್ರೋಬ್ ತನ್ನ ಲೀಸ್ ಅನ್ನು ತಕ್ಷಣವೇ ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ: ಅದು
    ಸಾಮರ್ಥ್ಯದ ಗೇಟ್, ಹಿಡಿತವಲ್ಲ. ಪೇರೆಂಟ್ನ ಲೀಸ್ ಫ್ಯಾನ್-ಔಟ್ ಅನ್ನು ಒಳಗೊಳ್ಳುತ್ತದೆ; ಇನ್ನೂ N
    ಲೀಸ್ಗಳನ್ನು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವುದರಿಂದ ಹಂಚಿಕೆಯ ಸಕ್ರಿಯ ವೆಚ್ಚ ಕೃತಕವಾಗಿ ಹೆಚ್ಚಾಗಿ ಇತರ tenantಗಳು ತಿರಸ್ಕೃತವಾಗುತ್ತವೆ. ಇದು ಅತ್ಯುತ್ತಮ-ಪ್ರಯತ್ನದ
    ಕ್ರಮ, ಕಾಯ್ದಿರಿಸುವಿಕೆಯಲ್ಲ: ಪ್ರೋಬ್ ಮತ್ತು ಡಿಸ್ಪ್ಯಾಚ್ ನಡುವಿನಲ್ಲಿ ಲೇನ್ ಮತ್ತೆ ತುಂಬಬಹುದು, ಆದ್ದರಿಂದ
    ತೀವ್ರ ಪೈಪೋಟಿಯ ಸಂದರ್ಭದಲ್ಲಿ ಟಾರ್ಗೆಟ್ ಡಿಸ್ಪ್ಯಾಚ್ ಆಗುವ ವೇಳೆಗೆ ಮತ್ತೆ ತುಂಬಿರುವ
    ಲೇನ್ಗೆ ಗೇಟ್ ಪ್ರವೇಶ ನೀಡಬಹುದು.
  - **ನೈಜ ಫ್ಯಾನ್-ಔಟ್ ಬಾಡಿಯಿಂದ ಬೆಲೆ ನಿಗದಿ.** ಪ್ರೋಬ್
    ಟಾರ್ಗೆಟ್ನ ನೈಜ ಬಾಡಿಯಿಂದ ವೆಚ್ಚವನ್ನು ಅಂದಾಜಿಸುತ್ತದೆ — ಅದರ `stream`
    ಫ್ಲ್ಯಾಗ್ನಿಂದ ಪಡೆದ ರಿಕ್ವೆಸ್ಟ್ ವರ್ಗವೂ ಸೇರಿದಂತೆ, ಪೇರೆಂಟ್ ಪಥದಂತೆಯೇ — ಆದ್ದರಿಂದ ಫ್ಯೂಷನ್ ಪ್ಯಾನೆಲ್ ಸದಸ್ಯರಿಗೆ (`stream: false`)
    ಅವರು ನಿಜವಾಗಿಯೂ ಬಳಸುವ ನಾನ್-ಸ್ಟ್ರೀಮಿಂಗ್ ವರ್ಗದ ಪ್ರಕಾರ ಮತ್ತು ಆದ್ಯತೆ/RR
    ಟಾರ್ಗೆಟ್ಗಳಿಗೆ ಬಳಕೆದಾರರು ಕೋರಿದ ಪ್ರಕಾರ ಬೆಲೆ ನಿಗದಿಯಾಗುತ್ತದೆ.
- **ವರದಿಗಳು:** ಮೊದಲ ಟಾರ್ಗೆಟ್ ನಂತರ ಪ್ರೋಬ್ ಬಿಟ್ಟುಬಿಡಲ್ಪಟ್ಟರೆ ಕಾಂಬೊದ ಪ್ರತಿ-ರಿಕ್ವೆಸ್ಟ್
  `fallbackCount` ಹೆಚ್ಚುತ್ತದೆ (ಈಗಿರುವ ಫಾಲ್ಬ್ಯಾಕ್ ಸೆಮ್ಯಾಂಟಿಕ್ಸ್ ಅನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ; ಕಾಂಬೊ
  ಲಾಗ್ಗಳಲ್ಲಿ ಗೋಚರಿಸುತ್ತದೆ); ಪ್ರತಿಯೊಂದು ಪ್ಯಾನೆಲ್ ಸದಸ್ಯನನ್ನೂ ಬಿಟ್ಟುಬಿಟ್ಟಾಗ ಫ್ಯೂಷನ್ 503 ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಪ್ರಸ್ತುತ ಸ್ನ್ಯಾಪ್ಶಾಟ್ನಲ್ಲಿ
  **ಯಾವುದೇ ಒಟ್ಟು ಕೌಂಟರ್ ಇಲ್ಲ** (ಉದಾ. `virtualFanoutSkipped`) —
  ಲೇನ್ ಗೇಟ್ ಎಷ್ಟು ಬಾರಿ ಫ್ಯಾನ್-ಔಟ್ ಟಾರ್ಗೆಟ್ಗಳನ್ನು ಬಿಟ್ಟುಬಿಡುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಲಾಗುತ್ತಿಲ್ಲ ಎಂದು ಆಪರೇಟರ್
  ವರದಿ ಮಾಡಿದರೆ, ಅದನ್ನು ಸೇರಿಸಲು ಅದೇ ಪ್ರೇರಕವಾಗುತ್ತದೆ.

## ಡ್ಯಾಶ್ಬೋರ್ಡ್ನಲ್ಲಿ ಯಾವುದು ಕಾಣಿಸುತ್ತಿದೆ

- `adaptiveAdmission.laneCount` / `laneTenants` → **ಅಡಾಪ್ಟಿವ್ ವರ್ಚುವಲ್ ಲೇನ್ಗಳು** (ವ್ಯವಸ್ಥೆ 2).
- `adaptiveAdmission.virtualLanes === true` → ವಿಭಾಗ 3ರ fan-out ಪ್ರೋಬ್ಗಳು ಸಹ
  ಸಕ್ರಿಯವಾಗಿವೆ. `virtualLanes` ಇಲ್ಲದಿರುವ ಅಥವಾ `false` ಆಗಿರುವ payload ಎಂದರೆ
  `OMNIROUTE_CHAT_VIRTUAL_LANES` ಹೊಂದಿಸಲಾಗಿಲ್ಲ — ಬೈಟ್-ಮಟ್ಟದ ಲೇನ್ಗಳು (ವ್ಯವಸ್ಥೆ 1)
  ಇನ್ನೂ ಸಕ್ರಿಯವಾಗಿರುತ್ತವೆ, ಆದರೆ ಅದನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವವರೆಗೆ `adaptiveAdmission` ಅಡಿಯಲ್ಲಿ
  ಯಾವುದೂ (ಮತ್ತು fan-out gating ಕೂಡ) ಜಾರಿಯಲ್ಲಿರುವುದಿಲ್ಲ.

## ಎರಡೂ ಏಕೆ ಅಸ್ತಿತ್ವದಲ್ಲಿವೆ

ಬೈಟ್-ಮಟ್ಟದ ಲೇನ್ಗಳು ಹೆಚ್ಚು ಮೆಮೊರಿ ಬಳಸುವ parse/compress ಮಾರ್ಗವನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತವೆ;
ಅಡಾಪ್ಟಿವ್ ಲೇನ್ಗಳು ಪ್ರತಿ tenantನ dispatch ವೆಚ್ಚವನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತವೆ. #9654ರ ಮಾನದಂಡ 1
("ಒಂದು sessionನ burst ಮತ್ತೊಂದಕ್ಕೆ 503 ಉಂಟುಮಾಡುವುದಿಲ್ಲ") ಅನ್ನು ವ್ಯವಸ್ಥೆ 1 ಬೇಷರತ್ತಾಗಿ
ಮತ್ತು opt-in ಸಕ್ರಿಯಗೊಳಿಸಿದ ನಂತರ ವ್ಯವಸ್ಥೆ 2 ಜಾರಿಗೊಳಿಸುತ್ತವೆ.

## 4. ಒಂದೇ-processನ ದೀರ್ಘ `/v1/responses` (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ನಲ್ಲಿ
`tryAcquireHealthyHeadroom` ಅನ್ನು ಸೇರಿಸಲಾಗಿದೆ; ಇದರಿಂದ heap
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`ಗಿಂತ ಕೆಳಗಿರುವಾಗ ರಚನಾತ್ಮಕವಾಗಿ ಭಾರವಾದ
ಎರಡನೇ request ಅನ್ನು ಅನುಮತಿಸಲಾಗುತ್ತದೆ. `admitChatRequest` ಬಳಸುವ BYTE
ಮಾರ್ಗವು (`OMNIROUTE_CHAT_LARGE_BODY_BYTES`ಗಿಂತ ದೊಡ್ಡ ಅಥವಾ ಸಮಾನ ಗಾತ್ರದ bodies,
ಡೀಫಾಲ್ಟ್ 256 KiB, `POST /v1/responses` ಸೇರಿದಂತೆ) **ಅದೇ** escape ಅನ್ನು ಬಳಸುತ್ತದೆ.

ಎರಡಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಮಕಾಲೀನ ದೀರ್ಘ SSE `/v1/responses`ಗಾಗಿ ಬೆಂಬಲಿತ
**ಒಂದೇ-process** ವಿಧಾನ ಇದು: heap ಮತ್ತು process-ವ್ಯಾಪಿ inflight-byte budget
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ಅನುಮತಿಸುವಷ್ಟು ಮಾತ್ರ primary +
healthy-headroom ಅನ್ನು ಹೆಚ್ಚಿಸಿ. ಹತ್ತಾರು ದೀರ್ಘ SSE clients (40–50) ಎನ್ನುವುದು ಆ
memory-budgetಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಯೇ ಹೊರತು, ಉತ್ಪನ್ನದ ಕಟ್ಟುನಿಟ್ಟಾದ “ಗರಿಷ್ಠ 2” ಮಿತಿಯಲ್ಲ.
ಒತ್ತಡದಲ್ಲಿರುವ heap ಇನ್ನೂ ಮರುಪ್ರಯತ್ನಿಸಬಹುದಾದ `503` ಮೂಲಕ requests ಅನ್ನು ತಿರಸ್ಕರಿಸುತ್ತದೆ,
ಆದ್ದರಿಂದ #7849 ಮತ್ತೆ ಕಾಣಿಸಿಕೊಳ್ಳುವುದಿಲ್ಲ.

**heaps ಅನ್ನು ಗುಣಿಸಲು**, N ಸ್ವತಂತ್ರ `DATA_DIR`ಗಳನ್ನು ಚಲಾಯಿಸಿ (#11024). ಒಂದೇ
SQLite file ಮೇಲೆ ಎಂದಿಗೂ `replicas > 1` ಬಳಸಬೇಡಿ (#10350). ಈ ವಿಭಾಗವು
DATA_DIR scale-out ವಿಧಾನವನ್ನು ಮರುತೆರೆಯುವುದಿಲ್ಲ.
