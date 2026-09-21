# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ਵਿੱਚ ਵੱਖ-ਵੱਖ ਦਾਇਰਿਆਂ ਵਾਲੀਆਂ **ਦੋ** ਪ੍ਰਕਿਰਿਆ-ਸਥਾਨਕ ਲੇਨ ਪ੍ਰਣਾਲੀਆਂ ਹਨ। ਇਹ
ਇੱਕ-ਦੂਜੇ ਦੀਆਂ ਪੂਰਕ ਹਨ; ਓਪਰੇਟਰਾਂ ਨੂੰ ਪਤਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ ਕਿ ਉਹ ਕਿਸ ਨੂੰ ਦੇਖ ਰਹੇ ਹਨ।

## 1. ਬਾਈਟ-ਪੱਧਰੀ ਪ੍ਰਕਿਰਿਆ-ਵਿਆਪੀ ਦਾਖ਼ਲਾ (`chatBodyAdmission.ts`)

- **ਦਾਇਰਾ:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses`,
  ਅਤੇ ਹੋਰ ਚੈਟ-ਆਕਾਰ ਵਾਲੇ ਰੂਟਾਂ ਲਈ ਬਫ਼ਰ ਕੀਤੀ ਬਾਡੀ/ਹੀਪ ਪਾਥ। ਵੱਡੀਆਂ ਕੋਡਿੰਗ-ਏਜੰਟ
  ਬਾਡੀਆਂ ਕਾਰਨ ਹੋਣ ਵਾਲੇ ਹੀਪ ਵਾਧੇ ਤੋਂ ਸੁਰੱਖਿਆ ਕਰਦਾ ਹੈ (#4380)।
- **ਇੱਕ ਪ੍ਰਕਿਰਿਆ-ਗਲੋਬਲ ਕੰਟਰੋਲਰ, ਪ੍ਰਤੀ-ਕੁੰਜੀ ਲੇਨਾਂ ਨਹੀਂ (#10110)।** ਹਰੇਕ API ਕੁੰਜੀ
  (ਹੈਸ਼ ਕੀਤੀ) ਜਾਂ `anonymous` ਸੈਸ਼ਨ **ਉਸੇ** ਸਾਂਝੇ ਬਜਟ ਦੇ ਵਿਰੁੱਧ ਦਾਖ਼ਲਾ ਲੈਂਦਾ ਹੈ —
  ਹੈਸ਼ ਕੀਤੀ ਸੈਸ਼ਨ ID ਨੂੰ ਸਿਰਫ਼ ਨਿਰਪੱਖਤਾ ਸ਼ਡਿਊਲਿੰਗ ਕੁੰਜੀ ਵਜੋਂ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ
  (ਉਡੀਕਕਰਤਿਆਂ ਵਿਚਕਾਰ ਰਾਊਂਡ-ਰੌਬਿਨ ਡਿਸਪੈਚ), ਸਮਰੱਥਾ ਸ਼ਾਰਡ ਵਜੋਂ ਕਦੇ ਨਹੀਂ। ਇਸ
  ਦਸਤਾਵੇਜ਼ ਦੇ ਪਿਛਲੇ ਸੰਸਕਰਣ ਵਿੱਚ ਸੁਤੰਤਰ ਸਮਰੱਥਾ ਵਾਲੀਆਂ ਪ੍ਰਤੀ-ਕੁੰਜੀ ਲੇਨਾਂ ਦਾ ਵਰਣਨ
  ਕੀਤਾ ਗਿਆ ਸੀ; ਉਹ ਮਾਡਲ #10110 ਵਿੱਚ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਸੀ ਕਿਉਂਕਿ ਉਸ ਨਾਲ ਗੈਰ-ਪ੍ਰਮਾਣਿਤ
  ਜਾਅਲੀ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਪ੍ਰਕਿਰਿਆ-ਵਿਆਪੀ ਹੱਦ ਨੂੰ ਕਈ ਗੁਣਾ ਕਰ ਸਕਦੇ ਸਨ।
- **ਗੇਟ (#503-fanout): ਸਵੈਚਾਲਿਤ ਤੌਰ 'ਤੇ ਨਿਰਧਾਰਤ ਇੰਜੈਸਟ BYTE ਬਜਟ, ਕੋਈ ਸਥਿਰ ਬੇਨਤੀ
  ਗਿਣਤੀ ਨਹੀਂ।** ਪੁਰਾਣੀ `CHAT_MAX_HEAVY_IN_FLIGHT` ਬੇਨਤੀ-ਗਿਣਤੀ ਹੱਦ (ਇਸ ਸੁਧਾਰ
  ਤੋਂ ਪਹਿਲਾਂ ਡਿਫਾਲਟ `1`) ਨੇ ਕੋਡਿੰਗ-ਏਜੰਟ ਫੈਨ-ਆਉਟ (ਕਈ ਸਬ-ਏਜੰਟ/CLI,
  ਬਾਡੀਆਂ ਆਮ ਤੌਰ 'ਤੇ > 256 KB) ਨੂੰ ਲਗਭਗ 1 ਦੀ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸਮਕਾਲੀਤਾ ਤੱਕ ਸੀਮਿਤ ਕਰ
  ਦਿੱਤਾ ਸੀ, ਜਿਸ ਕਾਰਨ ਪੂਰੀ ਤਰ੍ਹਾਂ ਆਮ ਲੋਡ ਹੇਠ 503 ਮਿਲਦਾ ਸੀ। ਹੁਣ ਇਹ ਸਿਰਫ਼ ਉਦੋਂ
  ਲਾਗੂ ਹੁੰਦੀ ਹੈ ਜਦੋਂ ਕੋਈ ਓਪਰੇਟਰ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ਸੈੱਟ ਕਰਦਾ ਹੈ। ਇਸਨੂੰ ਅਣਸੈੱਟ ਛੱਡਣ 'ਤੇ,
  ਦਾਖ਼ਲਾ ਇਸ ਦੀ ਬਜਾਏ `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ਦੁਆਰਾ ਨਿਯੰਤਰਿਤ ਹੁੰਦਾ
  ਹੈ — ਇੱਕ ਬਜਟ ਜੋ ਪ੍ਰਕਿਰਿਆ ਦੀ ਅਸਲ ਮੈਮੋਰੀ ਸੀਮਾ
  (`src/shared/middleware/admissionBudget.ts`) ਤੋਂ ਸਵੈਚਾਲਿਤ ਤੌਰ 'ਤੇ ਨਿਰਧਾਰਤ
  ਹੁੰਦਾ ਹੈ: V8 ਹੀਪ ਸੀਮਾ ਅਤੇ ਕਿਸੇ ਵੀ cgroup/ਕੰਟੇਨਰ ਸੀਮਾ ਵਿੱਚੋਂ ਵਧੇਰੇ ਸਖ਼ਤ ਸੀਮਾ
  ਦਾ 25%, ਜਿਸਨੂੰ 8x ਅਸਥਾਈ-ਵਾਧਾ ਗੁਣਕ ਨਾਲ ਵੰਡਿਆ ਜਾਂਦਾ ਹੈ ਅਤੇ 8 MiB ਤੋਂ
  2 GiB ਵਿਚਕਾਰ ਸੀਮਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਸਪਸ਼ਟ ਓਵਰਰਾਈਡ ਵੀ ਇਹੋ ਸੀਮਾਵਾਂ ਵਰਤਦੇ ਹਨ।
  ਇਹ ਬਿਨਾਂ ਕਿਸੇ env ਟਿਊਨਿੰਗ ਦੇ 512 MB ਕੰਟੇਨਰ ਤੋਂ 32 GB ਡੈਸਕਟਾਪ ਤੱਕ ਆਪਣੇ ਆਪ
  ਸਕੇਲ ਹੁੰਦਾ ਹੈ। ਜਿਹੜੀ ਬਾਡੀ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਬਜਟ ਵਿੱਚ ਫਿੱਟ ਨਹੀਂ ਹੋ ਸਕਦੀ, ਉਹ ਤੁਰੰਤ
  `413 body_exceeds_budget` ਨਾਲ ਅਸਫਲ ਹੋ ਜਾਂਦੀ ਹੈ; ਕੇਵਲ ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਸੇਵਾ-ਯੋਗ
  ਬਾਡੀਆਂ ਵਿਚਕਾਰ ਮੁਕਾਬਲਾ ਹੀ ਸੀਮਿਤ ਨਿਰਪੱਖਤਾ ਕਤਾਰ ਵਿੱਚ ਦਾਖ਼ਲ ਹੁੰਦਾ ਹੈ। ਇੱਕ ਲਾਈਵ
  ਬਹੁ-ਸਿਗਨਲ ਸਰੋਤ-ਦਬਾਅ ਟ੍ਰੈਕਰ (V8 ਹੀਪ ਅਨੁਪਾਤ, cgroup, PSI, OOM ਘਟਨਾਵਾਂ —
  `open-sse/utils/resourcePressurePolicy.ts`) `high` ਦਬਾਅ ਹੇਠ ਸੀਮਿਤ ਉਡੀਕ ਨੂੰ
  ਘਟਾਉਂਦਾ ਹੈ ਅਤੇ `critical` ਦਬਾਅ ਹੇਠ, ਕੋਈ ਵੀ ਬਾਈਟ ਇੰਜੈਸਟ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ,
  `503 resource_pressure` ਨਾਲ ਤੁਰੰਤ ਲੋਡ ਘਟਾਉਂਦਾ ਹੈ।
- **ਟਿਊਨਿੰਗ:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ਸਵੈਚਾਲਿਤ ਤੌਰ 'ਤੇ ਨਿਰਧਾਰਤ ਬਾਈਟ ਬਜਟ ਲਈ ਓਵਰਰਾਈਡ
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ਪੁਰਾਣੀ ਬੇਨਤੀ-ਗਿਣਤੀ ਹੱਦ, ਸਿਰਫ਼ ਚੋਣਵੀਂ
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 ਤੋਂ ਪਹਿਲਾਂ ਕਤਾਰ ਵਿੱਚ ਉਡੀਕ (ਡਿਫਾਲਟ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — ਕਤਾਰਬੱਧ-ਬਾਈਟ ਹੀਪ ਵਾਲਵ (ਡਿਫਾਲਟ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 ਤੋਂ
    ਬਾਅਦ ਅਪ੍ਰਚਲਿਤ ਨੋ-ਆਪ (ਕੌਂਫਿਗ ਅਨੁਕੂਲਤਾ ਲਈ ਸਵੀਕਾਰ ਕੀਤੇ ਜਾਂਦੇ ਹਨ, ਪਰ ਅਣਡਿੱਠੇ ਰਹਿੰਦੇ ਹਨ)
- **ਰਿਪੋਰਟਾਂ:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — ਜਿਸ ਵਿੱਚ
  #503-fanout ਦੇ ਵਾਧੇ `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, ਅਤੇ `countCapEnabled`
  ਸ਼ਾਮਲ ਹਨ (ਡਿਫਾਲਟ ਡਿਪਲੌਇਮੈਂਟ 'ਤੇ false — ਇਹ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ ਕਿ ਅਸਲ ਵਿੱਚ ਬਾਈਟ
  ਬਜਟ ਲਾਗੂ ਹੋ ਰਿਹਾ ਹੈ, ਪੁਰਾਣੀ ਗਿਣਤੀ ਹੱਦ ਨਹੀਂ)।

## 2. ਅਡੈਪਟਿਵ ਰਨਟਾਈਮ ਵਰਚੁਅਲ ਲੇਨਜ਼ (`open-sse/services/admission`)

- **ਦਾਇਰਾ:** ਪ੍ਰੋਵਾਈਡਰ ਡਿਸਪੈਚ ਲਈ ਟੈਨੈਂਟ-ਕੀ ਅਡਮਿਸ਼ਨ — ਕਤਾਰ ਲਾਗਤ, ਲੇਟੈਂਸੀ-ਨਿਰਦੇਸ਼ਿਤ
  ਸੀਮਾ ਅਨੁਕੂਲਨ, ਲੇਨ ਕਤਾਰਬੰਦੀ, ਅਤੇ ਲੇਨ ਮੈਟ੍ਰਿਕਸ।
- **ਗੇਟ:** **ਆਪਟ-ਇਨ।** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` ਤੋਂ ਬਿਨਾਂ ਅਯੋਗ। ਇਸ ਤੋਂ ਬਿਨਾਂ,
  ਅਡੈਪਟਿਵ ਕੰਟਰੋਲਰ ਸਾਂਝੀ ਕਤਾਰ ਵਾਲਾ ਵਿਹਾਰ ਕਾਇਮ ਰੱਖਦਾ ਹੈ (#9654 ਦਾ ਮਾਪਦੰਡ 1 ਸਿਰਫ਼
  ਓਦੋਂ ਹੀ ਪੂਰਾ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਕੋਈ ਆਪਰੇਟਰ ਲੇਨਜ਼ ਨੂੰ ਸਮਰੱਥ ਕਰਦਾ ਹੈ)।
- **ਟਿਊਨਿੰਗ:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + ਅਡੈਪਟਿਵ ਸੰਰਚਨਾ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)।
- **ਰਿਪੋਰਟਾਂ:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ਅਸਪਸ਼ਟ ਲੇਨ IDs, ਕਦੇ ਵੀ ਕੱਚੀਆਂ
  ਕੀਜ਼ ਨਹੀਂ), ਅਤੇ `virtualLanes` — ਸਨੈਪਸ਼ਾਟ ਵਿੱਚ "ਲੇਨਜ਼ ਚਾਲੂ ਹਨ" ਲਈ ਅਧਿਕਾਰਤ ਫਲੈਗ।

## 3. ਫੈਨ-ਆਊਟ ਪ੍ਰੋਬਜ਼ — ਕੌਂਬੋ/ਫਿਊਜ਼ਨ ਲਈ ਪ੍ਰਤੀ-ਟਾਰਗੇਟ ਅਡਮਿਸ਼ਨ (#9654 ਵੇਵ 2)

ਕੌਂਬੋ (ਤਰਜੀਹ / ਰਾਊਂਡ-ਰੌਬਿਨ) ਅਤੇ ਫਿਊਜ਼ਨ ਇੱਕ ਪੇਰੈਂਟ ਬੇਨਤੀ ਅਧੀਨ N ਮਾਡਲ ਟਾਰਗੇਟਾਂ ਨੂੰ
ਫੈਨ-ਆਊਟ ਕਰਦੇ ਹਨ। #9654 ਵੇਵ 2 ਤੋਂ, **ਹਰੇਕ ਫੈਨ-ਆਊਟ ਟਾਰਗੇਟ ਨੂੰ ਡਿਸਪੈਚ ਤੋਂ ਪਹਿਲਾਂ ਗੇਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ**
ਇੱਕ ਪ੍ਰਤੀ-ਟਾਰਗੇਟ ਪ੍ਰੋਬ (`PerTargetAdmissionHook`, ਜਿਸਨੂੰ `createPerTargetAdmissionHook`
ਦੁਆਰਾ ਬਣਾਇਆ ਗਿਆ ਹੈ) ਰਾਹੀਂ, **ਪੇਰੈਂਟ ਦੀ** ਟੈਨੈਂਟ ਲੇਨ ਦੇ ਵਿਰੁੱਧ।

- **ਦਾਇਰਾ:** ਕੌਂਬੋ, ਫਿਊਜ਼ਨ, ਅਤੇ ਕਾਓਸ ਇੰਜਣ ਦੁਆਰਾ ਡਿਸਪੈਚ ਕੀਤਾ ਗਿਆ ਹਰੇਕ ਫੈਨ-ਆਊਟ ਟਾਰਗੇਟ।
  ਸਿਸਟਮ 1 (ਬਾਈਟ-ਪੱਧਰ) ਪ੍ਰਭਾਵਿਤ ਨਹੀਂ ਹੁੰਦਾ — ਇਹ ਕਦੇ ਵੀ ਫੈਨ-ਆਊਟ ਟਾਰਗੇਟਾਂ ਨੂੰ ਪ੍ਰੋਬ ਨਹੀਂ ਕਰਦਾ।
- **ਗੇਟ:** **ਸਿਸਟਮ 2 ਨਾਲ ਆਪਟ-ਇਨ।** ਜਦੋਂ `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ਸੈੱਟ ਨਾ ਹੋਵੇ ਤਾਂ ਇਹ ਕੋਈ ਕਾਰਵਾਈ ਨਹੀਂ ਕਰਦਾ — ਉਸ ਮੋਡ ਵਿੱਚ ਪੇਰੈਂਟ ਬੇਨਤੀ ਕੋਲ ਪਹਿਲਾਂ ਹੀ
  ਸਾਂਝੀ-ਕਤਾਰ ਲੀਜ਼ ਹੁੰਦੀ ਹੈ, ਇਸ ਲਈ ਪ੍ਰੋਬ ਕਰਨ ਨਾਲ ਦੋਹਰੀ ਗਿਣਤੀ ਹੋਵੇਗੀ ਅਤੇ ਕੌਂਬੋ ਟਾਰਗੇਟ ਰੱਦ ਹੋਣਗੇ।
- **ਅਰਥ-ਵਿਵਹਾਰ:**
  - **ਪੂਰੀ ਤਰ੍ਹਾਂ ਨਾਨ-ਬਲਾਕਿੰਗ — ਛੱਡੋ, ਕਦੇ ਕਤਾਰ ਵਿੱਚ ਨਾ ਲਗਾਓ।** `maxWaitMs 0`: ਭਰੀ ਹੋਈ ਲੇਨ
    ਟਾਰਗੇਟ ਨੂੰ ਛੱਡ ਦਿੰਦੀ ਹੈ ਅਤੇ ਇਸ ਦੀ ਬਜਾਏ ਕੌਂਬੋ ਦੀ ਫਾਲਬੈਕ ਵਿਵਸਥਾ (ਜਾਂ ਫਿਊਜ਼ਨ ਦਾ ਬਚਿਆ ਹੋਇਆ
    ਪੈਨਲ) ਸੇਵਾ ਦਿੰਦੀ ਹੈ। ਇਹ ਜਾਣਬੁੱਝ ਕੇ ਹੈ: ਫੈਨ-ਆਊਟ ਟਾਰਗੇਟ ਵਾਧੂ
    ਕੰਮ ਹੈ, ਅਤੇ ਇਸਨੂੰ ਕਤਾਰ ਵਿੱਚ ਲਗਾਉਣ ਨਾਲ ਉਸੇ ਭੀੜ ਵਾਲੀ ਥਾਂ 'ਤੇ ਹੋਰ ਲੋਡ ਪੈਂਦਾ ਹੈ ਜਿਸਨੂੰ ਰੋਕਣ ਲਈ
    ਲੇਨਜ਼ ਮੌਜੂਦ ਹਨ। ਇਸ ਲਈ `defaultMaxWaitMs` ਸਿਰਫ਼ **ਪੇਰੈਂਟ ਬੇਨਤੀ** 'ਤੇ ਲਾਗੂ ਹੁੰਦਾ ਹੈ;
    ਫੈਨ-ਆਊਟ ਪ੍ਰੋਬਜ਼ ਕਦੇ ਉਡੀਕ ਨਹੀਂ ਕਰਦੇ, ਅਤੇ ਜਾਣਬੁੱਝ ਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਉਡੀਕ ਕਰਵਾਉਣ ਲਈ **ਕੋਈ ਨੌਬ ਨਹੀਂ**
    ਹੈ (ਮੁੱਦੇ ਦਾ ਇਤਿਹਾਸ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਉਡੀਕ ਨੌਬਜ਼ ਨੇ ਵੱਡੇ ਪੱਧਰ ਦੀ 502/504 ਸ਼੍ਰੇਣੀ ਪੈਦਾ ਕੀਤੀ
    ਜਿਸਨੂੰ #9654 ਰੋਕਦਾ ਹੈ — ਇਸ 'ਤੇ ਮੁੜ ਵਿਚਾਰ ਸਿਰਫ਼ ਉਦੋਂ ਕਰੋ ਜੇ ਕੋਈ ਆਪਰੇਟਰ ਰਿਪੋਰਟ ਕਰੇ ਕਿ ਛੱਡੇ ਗਏ
    ਫੈਨ-ਆਊਟ ਟਾਰਗੇਟ ਜਵਾਬ ਦੀ ਗੁਣਵੱਤਾ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਰਹੇ ਹਨ)।
  - **ਮਨਜ਼ੂਰੀ ਮਿਲਣ 'ਤੇ ਰਿਲੀਜ਼।** ਮਨਜ਼ੂਰ ਕੀਤਾ ਪ੍ਰੋਬ ਆਪਣੀ ਲੀਜ਼ ਤੁਰੰਤ ਰਿਲੀਜ਼ ਕਰਦਾ ਹੈ: ਇਹ
    ਸਮਰੱਥਾ ਗੇਟ ਹੈ, ਹੋਲਡ ਨਹੀਂ। ਪੇਰੈਂਟ ਦੀ ਲੀਜ਼ ਫੈਨ-ਆਊਟ ਨੂੰ ਕਵਰ ਕਰਦੀ ਹੈ; N
    ਹੋਰ ਲੀਜ਼ਾਂ ਹੋਲਡ ਕਰਨ ਨਾਲ ਸਾਂਝੀ ਸਰਗਰਮ ਲਾਗਤ ਕ੍ਰਿਤ੍ਰਿਮ ਤੌਰ 'ਤੇ ਵਧੇਗੀ ਅਤੇ ਹੋਰ ਟੈਨੈਂਟ ਰੱਦ ਹੋਣਗੇ। ਇਹ
    ਸਰਬੋਤਮ-ਯਤਨ ਹੈ, ਰਿਜ਼ਰਵੇਸ਼ਨ ਨਹੀਂ: ਪ੍ਰੋਬ ਅਤੇ ਡਿਸਪੈਚ ਦੇ ਵਿਚਕਾਰ ਲੇਨ ਮੁੜ ਭਰ ਸਕਦੀ ਹੈ, ਇਸ ਲਈ
    ਭਾਰੀ ਮੁਕਾਬਲੇ ਦੌਰਾਨ ਗੇਟ ਕਿਸੇ ਅਜਿਹੀ ਲੇਨ ਵਿੱਚ ਮਨਜ਼ੂਰੀ ਦੇ ਸਕਦਾ ਹੈ ਜੋ ਟਾਰਗੇਟ ਦੇ ਡਿਸਪੈਚ ਹੋਣ
    ਤੱਕ ਦੁਬਾਰਾ ਭਰ ਚੁੱਕੀ ਹੋਵੇ।
  - **ਅਸਲ ਫੈਨ-ਆਊਟ ਬਾਡੀ ਤੋਂ ਕੀਮਤਬੱਧ।** ਪ੍ਰੋਬ ਟਾਰਗੇਟ ਦੀ ਅਸਲ ਬਾਡੀ ਤੋਂ ਲਾਗਤ ਦਾ
    ਅਨੁਮਾਨ ਲਗਾਉਂਦਾ ਹੈ — ਜਿਸ ਵਿੱਚ ਇਸਦੇ `stream` ਫਲੈਗ ਤੋਂ ਪ੍ਰਾਪਤ ਬੇਨਤੀ ਕਲਾਸ ਵੀ ਸ਼ਾਮਲ ਹੈ,
    ਬਿਲਕੁਲ ਪੇਰੈਂਟ ਪਾਥ ਵਾਂਗ — ਤਾਂ ਜੋ ਫਿਊਜ਼ਨ ਪੈਨਲ ਮੈਂਬਰਾਂ (`stream: false`) ਦੀ ਕੀਮਤ ਉਸ
    ਨਾਨ-ਸਟ੍ਰੀਮਿੰਗ ਕਲਾਸ ਅਨੁਸਾਰ ਹੋਵੇ ਜਿਸਦੀ ਵਰਤੋਂ ਉਹ ਅਸਲ ਵਿੱਚ ਕਰਨਗੇ, ਅਤੇ ਤਰਜੀਹ/RR
    ਟਾਰਗੇਟਾਂ ਦੀ ਕੀਮਤ ਉਪਭੋਗਤਾ ਦੀ ਬੇਨਤੀ ਅਨੁਸਾਰ ਹੋਵੇ।
- **ਰਿਪੋਰਟਾਂ:** ਪਹਿਲੇ ਟਾਰਗੇਟ ਤੋਂ ਬਾਅਦ ਪ੍ਰੋਬ ਛੱਡੇ ਜਾਣ ਨਾਲ ਕੌਂਬੋ ਦਾ ਪ੍ਰਤੀ-ਬੇਨਤੀ
  `fallbackCount` ਵਧਦਾ ਹੈ (ਮੌਜੂਦਾ ਫਾਲਬੈਕ ਅਰਥ-ਵਿਵਹਾਰ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੋਇਆ; ਕੌਂਬੋ
  ਲੌਗਜ਼ ਵਿੱਚ ਦਿਸਦਾ ਹੈ); ਜਦੋਂ ਹਰ ਪੈਨਲ ਮੈਂਬਰ ਛੱਡਿਆ ਜਾਵੇ ਤਾਂ ਫਿਊਜ਼ਨ 503 ਵਾਪਸ ਕਰਦਾ ਹੈ। ਅੱਜ
  ਸਨੈਪਸ਼ਾਟ 'ਤੇ **ਕੋਈ ਸਮੁੱਚਾ ਕਾਊਂਟਰ ਨਹੀਂ** (ਉਦਾਹਰਨ ਲਈ `virtualFanoutSkipped`) —
  ਜੇ ਕੋਈ ਆਪਰੇਟਰ ਰਿਪੋਰਟ ਕਰੇ ਕਿ ਉਹ ਇਹ ਨਹੀਂ ਦੱਸ ਸਕਦਾ ਕਿ ਲੇਨ ਗੇਟ ਫੈਨ-ਆਊਟ
  ਟਾਰਗੇਟਾਂ ਨੂੰ ਕਿੰਨੀ ਵਾਰ ਛੱਡਦਾ ਹੈ, ਤਾਂ ਇਹ ਇੱਕ ਕਾਊਂਟਰ ਜੋੜਨ ਦਾ ਸੰਕੇਤ ਹੈ।

## ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਕਿਹੜਾ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ

- `adaptiveAdmission.laneCount` / `laneTenants` → **ਅਡੈਪਟਿਵ ਵਰਚੁਅਲ ਲੇਨਜ਼** (ਸਿਸਟਮ 2)।
- `adaptiveAdmission.virtualLanes === true` → ਸੈਕਸ਼ਨ 3 ਦੇ ਫੈਨ-ਆਉਟ ਪ੍ਰੋਬ ਵੀ
  ਸਰਗਰਮ ਹਨ। ਜੇ ਪੇਲੋਡ ਵਿੱਚ `virtualLanes` ਮੌਜੂਦ ਨਹੀਂ ਹੈ ਜਾਂ `false` ਹੈ, ਤਾਂ ਇਸਦਾ ਅਰਥ ਹੈ ਕਿ
  `OMNIROUTE_CHAT_VIRTUAL_LANES` ਸੈੱਟ ਨਹੀਂ ਹੈ — ਬਾਈਟ-ਪੱਧਰੀ ਲੇਨਜ਼ (ਸਿਸਟਮ 1)
  ਹਾਲੇ ਵੀ ਸਰਗਰਮ ਹਨ, ਪਰ ਇਸਨੂੰ ਸਮਰੱਥ ਕੀਤੇ ਜਾਣ ਤੱਕ `adaptiveAdmission` ਦੇ ਅਧੀਨ ਕੁਝ ਵੀ
  (ਅਤੇ ਕੋਈ ਫੈਨ-ਆਉਟ ਗੇਟਿੰਗ ਵੀ ਨਹੀਂ) ਪ੍ਰਭਾਵੀ ਨਹੀਂ ਹੁੰਦਾ।

## ਦੋਵੇਂ ਕਿਉਂ ਮੌਜੂਦ ਹਨ

ਬਾਈਟ-ਪੱਧਰੀ ਲੇਨਜ਼ ਮੈਮੋਰੀ-ਭਾਰੀ ਪਾਰਸ/ਕੰਪ੍ਰੈੱਸ ਪਾਥ ਨੂੰ ਸੀਮਿਤ ਕਰਦੀਆਂ ਹਨ; ਅਡੈਪਟਿਵ ਲੇਨਜ਼
ਹਰੇਕ ਟੈਨੈਂਟ ਲਈ ਡਿਸਪੈਚ ਲਾਗਤ ਨੂੰ ਸੀਮਿਤ ਕਰਦੀਆਂ ਹਨ। #9654 ਦਾ ਮਾਪਦੰਡ 1 ("ਇੱਕ ਸੈਸ਼ਨ ਦਾ ਬਰਸਟ
ਦੂਜੇ ਨੂੰ 503 ਨਹੀਂ ਕਰਦਾ") ਸਿਸਟਮ 1 ਵੱਲੋਂ ਬਿਨਾਂ ਕਿਸੇ ਸ਼ਰਤ ਦੇ ਅਤੇ ਆਪਟ-ਇਨ ਸਮਰੱਥ ਹੋਣ ਤੋਂ ਬਾਅਦ
ਸਿਸਟਮ 2 ਵੱਲੋਂ ਲਾਗੂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

## 4. ਇੱਕ-ਪ੍ਰੋਸੈੱਸ ਵਾਲਾ ਲੰਮਾ `/v1/responses` (ਸਿਹਤਮੰਦ ਹੈੱਡਰੂਮ)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ਨੇ
`tryAcquireHealthyHeadroom` ਜੋੜਿਆ, ਤਾਂ ਜੋ ਜਦੋਂ ਹੀਪ
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ਤੋਂ ਹੇਠਾਂ ਹੋਵੇ, ਇੱਕ ਦੂਜੀ ਸੰਰਚਨਾਤਮਕ ਤੌਰ 'ਤੇ ਭਾਰੀ
ਬੇਨਤੀ ਨੂੰ ਦਾਖ਼ਲ ਕੀਤਾ ਜਾ ਸਕੇ। `admitChatRequest` ਵੱਲੋਂ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ BYTE
ਪਾਥ (ਬਾਡੀਆਂ ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
ਡਿਫਾਲਟ 256 KiB, ਜਿਸ ਵਿੱਚ `POST /v1/responses` ਵੀ ਸ਼ਾਮਲ ਹੈ) **ਇਹੀ** ਛੋਟ ਵਰਤਦਾ ਹੈ।

ਦੋ ਤੋਂ ਵੱਧ ਸਮਕਾਲੀ ਲੰਬੇ SSE `/v1/responses` ਲਈ ਇਹ ਸਮਰਥਿਤ **ਇੱਕ-ਪ੍ਰੋਸੈੱਸ**
ਵਿਧੀ ਹੈ: ਪ੍ਰਾਇਮਰੀ + ਸਿਹਤਮੰਦ ਹੈੱਡਰੂਮ ਨੂੰ ਸਿਰਫ਼ ਉਥੋਂ ਤੱਕ ਵਧਾਓ ਜਿੱਥੋਂ ਤੱਕ ਹੀਪ
ਅਤੇ ਪ੍ਰੋਸੈੱਸ-ਵਿਆਪੀ ਇਨਫਲਾਈਟ-ਬਾਈਟ ਬਜਟ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) ਇਜਾਜ਼ਤ ਦਿੰਦੇ ਹਨ। ਦਰਜਨਾਂ ਲੰਬੇ SSE ਕਲਾਇੰਟ (40–50) ਮੈਮੋਰੀ-ਬਜਟ
ਦਾ ਸਵਾਲ ਹਨ, ਨਾ ਕਿ ਉਤਪਾਦ ਦੀ ਕੋਈ ਸਖ਼ਤ “ਵੱਧ ਤੋਂ ਵੱਧ 2” ਸੀਮਾ। ਦਬਾਅ ਹੇਠਲਾ ਹੀਪ ਹਾਲੇ ਵੀ
ਮੁੜ-ਕੋਸ਼ਿਸ਼ਯੋਗ `503` ਨਾਲ ਬੇਨਤੀਆਂ ਨੂੰ ਘਟਾਉਂਦਾ ਹੈ, ਤਾਂ ਜੋ #7849 ਮੁੜ ਨਾ ਆਵੇ।

**ਹੀਪਾਂ ਦੀ ਗਿਣਤੀ ਵਧਾਉਣ** ਲਈ, N ਸੁਤੰਤਰ `DATA_DIR`s ਚਲਾਓ (#11024)। ਇੱਕ SQLite ਫ਼ਾਈਲ ਉੱਤੇ
ਕਦੇ ਵੀ `replicas > 1` ਨਾ ਵਰਤੋ (#10350)। ਇਹ ਸੈਕਸ਼ਨ DATA_DIR ਸਕੇਲ-ਆਉਟ
ਵਿਧੀ ਨੂੰ ਮੁੜ ਖੋਲ੍ਹਣ ਬਾਰੇ ਨਹੀਂ ਹੈ।
