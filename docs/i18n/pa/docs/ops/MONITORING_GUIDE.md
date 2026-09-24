# Monitoring & Observability Guide (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute ਵਿੱਚ ਅੰਦਰੂਨੀ ਸਿਹਤ ਨਿਗਰਾਨੀ, ਪ੍ਰਦਾਤਾ ਆਟੋਪਾਇਲਟ, ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ ਅਤੇ ਪਰਵੇਖਣਯੋਗਤਾ ਹੁੱਕ ਸ਼ਾਮਲ ਹਨ। ਇਹ ਗਾਈਡ ਡੈਸ਼ਬੋਰਡ, ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਸਮੱਸਿਆ-ਨਿਵਾਰਣ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿੰਦੀ ਹੈ।

**ਸਰੋਤ:**

- `src/lib/monitoring/observability.ts` — ਪਰਵੇਖਣਯੋਗਤਾ ਸਨੈਪਸ਼ਾਟ
- `src/lib/monitoring/comboHealthAutopilot.ts` — ਕੌਂਬੋ ਸਿਹਤ ਆਟੋਪਾਇਲਟ
- `src/lib/monitoring/providerHealthAutopilot.ts` — ਪ੍ਰਦਾਤਾ ਆਟੋਪਾਇਲਟ
- `src/lib/monitoring/providerHealthMatrix.ts` — ਪ੍ਰਦਾਤਾ ਸਿਹਤ ਮੈਟ੍ਰਿਕਸ
- `src/lib/localHealthCheck.ts` — ਸਥਾਨਕ ਸਿਹਤ ਜਾਂਚ
- `src/lib/tokenHealthCheck.ts` — ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼ ਸਿਹਤ
- `src/lib/proxyHealth.ts` — ਪ੍ਰੌਕਸੀ ਸਿਹਤ ਕੈਸ਼ (PROXY_GUIDE.md ਵਿੱਚ ਸ਼ਾਮਲ)

---

## ਸੰਖੇਪ ਜਾਣਕਾਰੀ

OmniRoute ਵਿੱਚ **ਨਿਗਰਾਨੀ ਦੀਆਂ 3 ਪਰਤਾਂ** ਹਨ:

```
┌──────────────────────────────────────────────────────────────┐
│  ਪਰਤ 1: ਸਿਸਟਮ ਸਿਹਤ (ਸਰਵਰ-ਪੱਧਰ)                              │
│  ├─ localHealthCheck.ts — DB, ਪੋਰਟ, ਨੇਟਿਵ ਨਿਰਭਰਤਾਵਾਂ         │
│  ├─ db/healthCheck.ts — ਅਖੰਡਤਾ, FK, ਅਨਾਥ ਆਰਟੀਫੈਕਟ            │
│  └─ ਡੈਸ਼ਬੋਰਡ: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  ਪਰਤ 2: ਪ੍ਰਦਾਤਾ ਸਿਹਤ (ਹਰੇਕ ਪ੍ਰਦਾਤਾ ਲਈ ਲਚਕੀਲਾਪਣ)               │
│  ├─ providerHealthAutopilot.ts — ਸਰਕਟ ਬ੍ਰੇਕਰ, ਕੂਲਡਾਊਨ         │
│  ├─ providerHealthMatrix.ts — ਪ੍ਰਦਾਤਾ/ਮਾਡਲ ਅਨੁਸਾਰ ਸਿਹਤ ਸਕੋਰ  │
│  └─ ਡੈਸ਼ਬੋਰਡ: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  ਪਰਤ 3: ਲਾਈਵ ਪਰਵੇਖਣਯੋਗਤਾ (ਰਨਟਾਈਮ ਸਨੈਪਸ਼ਾਟ)                  │
│  ├─ observability.ts — ਸਰਕਟ ਬ੍ਰੇਕਰ, ਸੈਸ਼ਨ, ਕੋਟਾ                │
│  ├─ tokenHealthCheck.ts — OAuth ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼ ਸਿਹਤ            │
│  └─ MCP ਟੂਲ: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ਡੈਸ਼ਬੋਰਡ ਪੰਨੇ

### `/dashboard/health` (ਸਿਸਟਮ ਸਿਹਤ)

ਉੱਚ-ਪੱਧਰੀ ਸਿਹਤ ਡੈਸ਼ਬੋਰਡ ਇਹ ਦਿਖਾਉਂਦਾ ਹੈ:

| ਭਾਗ               | ਇਹ ਕੀ ਦਿਖਾਉਂਦਾ ਹੈ                                     |
| ----------------- | ----------------------------------------------------- |
| **ਸਰਵਰ ਸਥਿਤੀ**    | ਅੱਪਟਾਈਮ, ਵਰਜਨ, ਪੋਰਟ, ਸਰਗਰਮ ਕਨੈਕਸ਼ਨ                    |
| **ਡੇਟਾਬੇਸ**       | ਕਨੈਕਸ਼ਨ, ਅਖੰਡਤਾ, WAL ਆਕਾਰ, ਹਾਲੀਆ ਮਾਈਗ੍ਰੇਸ਼ਨ           |
| **ਪ੍ਰਦਾਤਾ ਸੰਖੇਪ** | ਸਰਗਰਮ ਗਿਣਤੀ, ਸਿਹਤਮੰਦ ਗਿਣਤੀ, ਖੁੱਲ੍ਹੇ ਬ੍ਰੇਕਰਾਂ ਦੀ ਗਿਣਤੀ |
| **ਕੋਟਾ ਮਾਨੀਟਰ**   | ਸਰਗਰਮ ਸੈਸ਼ਨ, ਚੇਤਾਵਨੀ ਸਥਿਤੀ, ਸਮਾਪਤ ਕੋਟਾ                |
| **ਹਾਲੀਆ ਗਲਤੀਆਂ**  | ਸਟੈਕ ਟ੍ਰੇਸ ਸਮੇਤ ਆਖਰੀ 10 ਗਲਤੀਆਂ                        |
| **ਸਰੋਤ ਵਰਤੋਂ**    | ਮੈਮੋਰੀ, CPU, ਹੀਪ ਦਬਾਅ ਸੂਚਕ                            |

### `/dashboard/providers` (ਪ੍ਰਦਾਤਾ ਸਿਹਤ)

ਹਰੇਕ ਪ੍ਰਦਾਤਾ ਲਈ ਡੈਸ਼ਬੋਰਡ:

| ਕਾਲਮ    | ਵੇਰਵਾ                                                   |
| ------- | ------------------------------------------------------- |
| ਪ੍ਰਦਾਤਾ | ਪ੍ਰਦਾਤਾ ID + ਡਿਸਪਲੇ ਨਾਮ                                 |
| ਸਿਹਤ    | ਹਰੀ/ਪੀਲੀ/ਲਾਲ ਸਥਿਤੀ                                      |
| ਸਰਕਟ    | ਖੁੱਲ੍ਹੀ/ਬੰਦ/ਅੱਧ-ਖੁੱਲ੍ਹੀ ਸਥਿਤੀ                           |
| ਕਨੈਕਸ਼ਨ | ਕਨੈਕਸ਼ਨਾਂ ਦੀ ਗਿਣਤੀ, ਆਖਰੀ ਰਿਫ੍ਰੈਸ਼                       |
| ਮਾਡਲ    | ਉਪਲਬਧ ਮਾਡਲ, ਹਰੇਕ ਮਾਡਲ ਦੀ ਸਿਹਤ                           |
| ਲਾਗਤ    | ਅੱਜ ਦੀ ਲਾਗਤ, 7-ਦਿਨਾਂ ਦਾ ਰੁਝਾਨ                           |
| ਗਲਤੀਆਂ  | ਪਿਛਲੇ 24 ਘੰਟਿਆਂ ਦੀਆਂ ਗਲਤੀਆਂ ਦੀ ਗਿਣਤੀ, ਪ੍ਰਮੁੱਖ ਗਲਤੀ ਕਲਾਸ |

ਇਹ ਦੇਖਣ ਲਈ ਕਿਸੇ ਪ੍ਰਦਾਤਾ 'ਤੇ ਕਲਿੱਕ ਕਰੋ:

- ਲੇਟੈਂਸੀ ਦੇ ਵਿਸਤ੍ਰਿਤ ਵੇਰਵੇ ਸਮੇਤ ਹਾਲੀਆ ਬੇਨਤੀਆਂ
- ਹਰੇਕ ਕਨੈਕਸ਼ਨ ਦੇ ਸਿਹਤ ਸਕੋਰ
- ਹਰੇਕ ਮਾਡਲ ਲਈ ਲੌਕਆਊਟ
- ਆਟੋਪਾਇਲਟ ਸਿਫ਼ਾਰਸ਼ਾਂ

### `/dashboard/quota` (ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ)

ਹਰੇਕ API ਕੁੰਜੀ ਲਈ:

- ਮੌਜੂਦਾ ਵਰਤੋਂ ਬਨਾਮ ਸੀਮਾ (ਪ੍ਰਗਤੀ ਪੱਟੀ)
- ਕੋਟਾ ਰੁਝਾਨ (30-ਦਿਨਾਂ ਦਾ ਚਾਰਟ)
- ਅਗਲਾ ਰੀਸੈੱਟ ਸਮਾਂ
- ਚੇਤਾਵਨੀ ਇਤਿਹਾਸ

### `/dashboard/combos` (ਕੌਂਬੋ ਸਿਹਤ)

ਹਰੇਕ ਕੌਂਬੋ ਲਈ:

- ਰਣਨੀਤੀ + ਟੀਚੇ
- ਹਰੇਕ ਟੀਚੇ ਦੀ ਸਿਹਤ
- ਹਾਲੀਆ ਫਾਲਬੈਕ ਘਟਨਾਵਾਂ
- ਸਫਲਤਾ ਦਰ (24 ਘੰਟੇ, 7 ਦਿਨ, 30 ਦਿਨ)

---

## ਹੈਲਥ ਚੈੱਕ API

OmniRoute **ਦੋ** HTTP ਹੈਲਥ ਸਰਫੇਸ ਉਪਲਬਧ ਕਰਦਾ ਹੈ। ਆਰਕੈਸਟ੍ਰੇਟਰਾਂ ਲਈ ਇਹ ਇੱਕ-ਦੂਜੇ ਦੀ ਥਾਂ ਵਰਤੇ ਨਹੀਂ ਜਾ ਸਕਦੇ।

| ਪਾਥ                          | ਉਦੇਸ਼                                                        | ਭਾਰ                                 | ਇਸ ਲਈ ਵਰਤੋਂ                                                              |
| ---------------------------- | ------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------ |
| `GET /healthz`               | ਲਾਈਫਸਾਈਕਲ ਲਾਈਵਨੈੱਸ/ਰੈਡੀਨੈੱਸ (`ok` / `starting` / `stopping`) | ਬਹੁਤ ਹਲਕਾ (ਕੇਵਲ ਫੇਜ਼ ਫਲੈਗ)          | Kubernetes **readiness**; ਜੇ HTTP ਵਰਤਣਾ ਲਾਜ਼ਮੀ ਹੋਵੇ ਤਾਂ ਨਰਮ **liveness** |
| `GET /api/monitoring/health` | ਡੂੰਘਾ ਸਿਸਟਮ + ਪ੍ਰੋਵਾਈਡਰ ਸੰਖੇਪ (DB, ਹੀਪ, ਕੈਟਾਲਾਗ ਗਿਣਤੀਆਂ, …)  | ਭਾਰੀ (ਸਿੰਕ੍ਰੋਨਸ DB / ਮਾਨੀਟਰਿੰਗ ਕੰਮ) | ਡੈਸ਼ਬੋਰਡ, ਬਲੈਕਬਾਕਸ ਡੂੰਘੀਆਂ ਜਾਂਚਾਂ, Docker ਦੀ ਬਿਲਟ-ਇਨ ਹੈਲਥਚੈੱਕ            |

> **ਨੋਟ:** ਪ੍ਰੋਵਾਈਡਰ ਹੈਲਥ ਮੈਟ੍ਰਿਕਸ, ਆਟੋਪਾਇਲਟ ਸਮੱਸਿਆਵਾਂ, ਕੋਟਾ ਮਾਨੀਟਰ, ਟੋਕਨ ਹੈਲਥ, ਅਤੇ `/api/monitoring/health` ਤੋਂ ਪਰੇ ਲੇਟੈਂਸੀ ਵੇਰਵੇ **MCP ਟੂਲ** `observability_snapshot` ਜਾਂ **ਡੈਸ਼ਬੋਰਡ** ਪੰਨਿਆਂ ਰਾਹੀਂ ਉਪਲਬਧ ਹਨ — ਇਨ੍ਹਾਂ ਲਈ ਕੋਈ ਸਮਰਪਿਤ REST ਰੂਟ ਨਹੀਂ ਹਨ।

ਦੋਵੇਂ ਰੂਟ ਬੇਨਤੀ ਸੰਭਾਲਣ ਵਾਲੇ **ਉਸੇ Node ਇਵੈਂਟ ਲੂਪ** ਉੱਤੇ ਚੱਲਦੇ ਹਨ। CPU-ਬਾਊਂਡ ਪਾਥ (ਵੱਡੇ `GET /v1/models` ਕੈਟਾਲਾਗ ਦਾ ਕੰਮ, ਲੰਮੇ-ਕਾਂਟੈਕਸਟ ਦੀ ਕੰਪ੍ਰੈਸ਼ਨ / ਟੋਕਨ ਗਿਣਤੀ) `/healthz` ਸਮੇਤ **ਸਾਰੇ** HTTP ਹੈਂਡਲਰਾਂ ਨੂੰ ਦੇਰੀ ਕਰਵਾ ਸਕਦਾ ਹੈ। ਇਵੈਂਟ-ਲੂਪ ਵਿਅਸਤ ≠ ਪ੍ਰੋਸੈੱਸ ਬੰਦ। ਸਰੋਤਾਂ ਦੀ ਅਤਿਅਧਿਕ ਵਰਤੋਂ ਕਰਨ ਵਾਲੇ ਕੰਮ ਨੂੰ ਠੀਕ ਕਰਨ ਨੂੰ ਤਰਜੀਹ ਦਿਓ; ਪ੍ਰੋਬ ਟਿਊਨਿੰਗ ਸਿਰਫ਼ ਗਲਤ ਢੰਗ ਨਾਲ ਬੰਦ ਕੀਤੇ ਜਾਣ ਦੀ ਸੰਭਾਵਨਾ ਘਟਾਉਂਦੀ ਹੈ।

### ਹਲਕਾ ਆਰਕੈਸਟ੍ਰੇਟਰ ਪ੍ਰੋਬ

```bash
GET /healthz
# ਜਾਂ HEAD /healthz
```

- ਸਰਵਰ ਲਾਈਫਸਾਈਕਲ ਫੇਜ਼ ਤਿਆਰ ਹੋਣ 'ਤੇ **200** + ਬਾਡੀ `ok`
- ਬੂਟ ਜਾਂ ਸ਼ਟਡਾਊਨ ਦੌਰਾਨ **503** + `starting` / `stopping`
- ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ: `src/app/healthz/route.ts` (ਕੋਈ DB ਪਿੰਗ ਨਹੀਂ)

### ਸਿਸਟਮ ਹੈਲਥ (ਡੂੰਘੀ)

```bash
GET /api/monitoring/health
```

ਜਵਾਬ:

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

#### `credentialHealth`: ਪ੍ਰੋਬ-ਕੈਸ਼ ਬਨਾਮ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth`, `provider_connections.test_status` ਦਾ ਲਾਈਵ ਡੰਪ ਨਹੀਂ, ਸਗੋਂ **ਇਨ-ਮੈਮੋਰੀ ਪ੍ਰੋਬ-ਕੈਸ਼
ਗੇਜ** ਹੈ। #12532 ਤੋਂ ਬਾਅਦ ਬੇਨਤੀ ਪਾਥ ਕੇਵਲ `getCachedCredentialHealthSummary()` ਨੂੰ
ਪੜ੍ਹਦਾ ਹੈ; ਬੈਕਗ੍ਰਾਊਂਡ ਪ੍ਰੋਬ ਇਵੈਂਟ ਲੂਪ ਤੋਂ ਬਾਹਰ ਕੈਸ਼ ਨੂੰ ਰਿਫ੍ਰੈਸ਼ ਕਰਦੇ ਹਨ।

| ਪਰਤ                 | ਕਿੱਥੇ                                                                 | ਇਸਦਾ ਕੀ ਅਰਥ ਹੈ                                                                                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ਪ੍ਰੋਬ-ਕੈਸ਼ ਗੇਜ      | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ਆਖਰੀ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ-ਹੈਲਥ ਪ੍ਰੋਬ ਨਤੀਜੇ ਜੋ ਹਾਲੇ ਵੀ ਪ੍ਰੋਸੈੱਸ ਮੈਮੋਰੀ ਵਿੱਚ ਮੌਜੂਦ ਹਨ। `source` ਹਮੇਸ਼ਾ `probe-cache` ਹੁੰਦਾ ਹੈ।                                                                                                  |
| ਅਸਫਲ ਕਨੈਕਸ਼ਨ ਵੇਰਵਾ  | `credentialHealth.failedConnections`                                  | **ਕੇਵਲ `failed > 0` ਹੋਣ 'ਤੇ** ਮੌਜੂਦ। `status=error` ਵਾਲੀਆਂ ਕੈਸ਼ ਕਤਾਰਾਂ ਦੀ ਸੀਮਿਤ ਸੂਚੀ (`connectionId`, `status`, ਸੈਨੀਟਾਈਜ਼ ਕੀਤਾ `lastError` / `lastErrorType`)। ਸੂਚੀ ਸੀਮਿਤ ਕੀਤੇ ਜਾਣ 'ਤੇ `failedOmitted` ਸੈੱਟ ਹੁੰਦਾ ਹੈ। |
| SQLite ਸਟਿੱਕੀ ਸਥਿਤੀ | `credentialHealth.staleDbNonOkCount`                                  | ਉਨ੍ਹਾਂ **ਸਰਗਰਮ** (`is_active=1`) ਕਨੈਕਸ਼ਨ ਕਤਾਰਾਂ ਦੀ ਗਿਣਤੀ ਜਿਨ੍ਹਾਂ ਦਾ ਸਥਾਈ `test_status` ਇੱਕ ਜਾਣਿਆ-ਪਛਾਣਿਆ ਗੈਰ-ok ਮੁੱਲ ਹੈ (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)।             |

ਦੋਵੇਂ ਪਰਤਾਂ ਜਾਣਬੁੱਝ ਕੇ ਅਸਹਿਮਤ ਹੋ ਸਕਦੀਆਂ ਹਨ:

- ਗੇਜ `failed=0`, ਜਦਕਿ `staleDbNonOkCount>0` — SQLite ਵਿੱਚ ਹਾਲੇ ਵੀ ਇੱਕ ਸਟਿੱਕੀ
  `test_status` (ਉਦਾਹਰਨ ਲਈ `expired` ਜਾਂ `credits_exhausted`) ਮੌਜੂਦ ਹੈ, ਜਿਸਨੂੰ ਨਵੀਨਤਮ
  ਪ੍ਰੋਬ-ਕੈਸ਼ ਸਨੈਪਸ਼ਾਟ `status=error` ਵਜੋਂ ਨਹੀਂ ਗਿਣਦਾ।
- ਗੇਜ `failed>0`, ਜਦਕਿ SQLite ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ — ਹਾਲੀਆ ਪ੍ਰੋਬ ਅਸਫਲ ਹੋਇਆ ਅਤੇ
  ਕੈਸ਼ ਵਿੱਚ ਹੈ; DB ਕਤਾਰ ਅੱਪਡੇਟ ਨਹੀਂ ਹੋਈ, ਜਾਂ ਬਾਅਦ ਵਿੱਚ ਸਾਫ਼ ਕਰ ਦਿੱਤੀ ਗਈ ਸੀ।

ਇਸ ਐਂਡਪੌਇੰਟ ਨੂੰ ਸਕ੍ਰੈਪ ਕਰਦੇ ਸਮੇਂ ਸਿਰਫ਼ `provider_connections.test_status` ਦੇ ਆਧਾਰ 'ਤੇ
ਅਲਰਟ ਨਾ ਕਰੋ। ਲਾਈਵ ਪ੍ਰੋਬ ਅਸਫਲਤਾਵਾਂ ਲਈ `failed` + `failedConnections` ਵਰਤੋ, ਅਤੇ
ਜਦੋਂ ਸਥਾਈ ਸਟਿੱਕੀ-ਸਟੇਟਸ ਗਿਣਤੀ ਦੀ ਲੋੜ ਹੋਵੇ ਤਾਂ `staleDbNonOkCount` ਵਰਤੋ।

### Kubernetes ਪ੍ਰੋਬ ਸਿਫ਼ਾਰਸ਼ਾਂ

OmniRoute ਇੱਕ **ਸਿੰਗਲ Node ਪ੍ਰੋਸੈੱਸ** (ਇੱਕ ਇਵੈਂਟ ਲੂਪ) ਹੈ। ਮਿਆਰੀ Docker `HEALTHCHECK` ਹਲਕੇ `/healthz` ਨੂੰ ਟਾਰਗੇਟ ਕਰਦਾ ਹੈ। `/api/monitoring/health`, kubelet ਲਾਈਵਨੈੱਸ ਅੰਤਰਾਲਾਂ ਲਈ **ਬਹੁਤ ਭਾਰੀ** ਹੈ।

| ਪ੍ਰੋਬ               | ਸਿਫ਼ਾਰਸ਼ੀ ਟਾਰਗੇਟ                                                            | ਨੋਟਸ                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ਸਟਾਰਟਅੱਪ**        | ਲੰਮੇ `failureThreshold` (ਜਾਂ ਵੱਡੇ `startPeriod`) ਨਾਲ HTTP `GET /healthz`    | ਕੋਲਡ ਸਟਾਰਟ + SQLite ਮਾਈਗ੍ਰੇਸ਼ਨ ਨੂੰ ਕੁਝ ਸਕਿੰਟਾਂ ਤੋਂ ਵੱਧ ਸਮਾਂ ਲੱਗ ਸਕਦਾ ਹੈ                                                                                                                                                                                                                                                                                                            |
| **ਤਿਆਰੀ**           | HTTP `GET /healthz`                                                         | ਲਾਈਫਸਾਈਕਲ `ok` / `starting` / `stopping` (200 ਬਨਾਮ 503)। ਜੇ ਲੂਪ CPU ਦੁਆਰਾ ਬਲੌਕ ਹੋਵੇ ਤਾਂ ਇਹ ਅਜੇ ਵੀ ਅਸਥਿਰ ਹੁੰਦਾ ਹੈ। **ਕਈ ਸਕਿੰਟਾਂ ਬਾਅਦ ਮਿਲਿਆ 200 ਸਿਹਤਮੰਦ ਹੋਣ ਦਾ ਸੰਕੇਤ ਨਹੀਂ ਹੈ** (#10303) — ਇਸਦਾ ਮਤਲਬ ਹੈ ਕਿ 3-ਬਾਈਟ ਹੈਂਡਲਰ ਦੇ ਚੱਲਣ ਤੋਂ ਪਹਿਲਾਂ ਈਵੈਂਟ ਲੂਪ ਨੂੰ ਸਰੋਤ ਨਹੀਂ ਮਿਲੇ                                                                                                              |
| **ਜੀਵੰਤਾ**          | HTTP `GET /livez`, **ਜਾਂ ਮੁੱਖ ਸੇਵਾ ਪੋਰਟ ਉੱਤੇ TCP** (`PORT`, ਡਿਫੌਲਟ `20128`) | `/livez` ਸਿਰਫ਼ ਪ੍ਰਕਿਰਿਆ ਦੇ ਚੱਲ ਰਹੇ ਹੋਣ ਦੀ ਜਾਂਚ ਹੈ (ਜੇ ਹੈਂਡਲਰ ਚੱਲਦਾ ਹੈ ਤਾਂ ਹਮੇਸ਼ਾ 200)। ਇਹ ਫਿਰ ਵੀ ਈਵੈਂਟ ਲੂਪ ਸਾਂਝਾ ਕਰਦਾ ਹੈ — ਰੁੱਝਿਆ ਹੋਣਾ ≠ ਬੰਦ ਹੋਣਾ, ਅਤੇ ਇਹ ਈਵੈਂਟ-ਲੂਪ ਸਟਾਰਵੇਸ਼ਨ (#10303) ਨੂੰ TCP ਨਾਲੋਂ ਬਿਹਤਰ ਢੰਗ ਨਾਲ ਨਹੀਂ ਪਛਾਣਦਾ। ਜੇ ਕੈਟਾਲੌਗ/ਕੰਪ੍ਰੈਸ਼ਨ ਲੋਡ ਹੇਠ HTTP ਪ੍ਰੋਬ ਟਾਈਮ ਆਊਟ ਹੋਣ ਤਾਂ **TCP** ਨੂੰ ਤਰਜੀਹ ਦਿਓ; ਕਿਸੇ ਵੀ ਤਰੀਕੇ ਨਾਲ ਛੋਟੇ ਈਵੈਂਟ-ਲੂਪ ਠਹਿਰਾਵਾਂ ਕਾਰਨ ਪੌਡ ਨੂੰ **ਨਾ** ਰੋਕੋ |
| **ਡੂੰਘੀ ਸਿਹਤ ਜਾਂਚ** | ਬਾਹਰੀ ਚੈਕਰ ਤੋਂ `GET /api/monitoring/health`                                 | kubelet `livenessProbe` / ਸਖ਼ਤ `readinessProbe` ਲਈ ਨਹੀਂ                                                                                                                                                                                                                                                                                                                            |

ਉਦਾਹਰਨ ਸੰਰਚਨਾ (ਥ੍ਰੈਸ਼ਹੋਲਡਾਂ ਨੂੰ ਆਪਣੇ ਕੋਲਡ-ਸਟਾਰਟ ਅਤੇ ਕੰਪ੍ਰੈਸ਼ਨ ਲੋਡ ਮੁਤਾਬਕ ਢਾਲੋ):

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
  # ਈਵੈਂਟ-ਲੂਪ ਦੇ ਠਹਿਰਨ ਦੌਰਾਨ HTTP /livez ਫਿਰ ਵੀ ਟਾਈਮ ਆਊਟ ਹੋ ਸਕਦਾ ਹੈ। TCP
  # ਵਧੇਰੇ ਸਾਵਧਾਨੀ ਵਾਲਾ ਵਿਕਲਪ ਹੈ:
  # tcpSocket:
  #   port: http
```

kubelet **ਜੀਵੰਤਾ ਜਾਂਚ** ਨੂੰ `/api/monitoring/health` ਵੱਲ **ਨਾ** ਭੇਜੋ। ਉਹ ਪਾਥ ਅਸਲ DB/ਮਾਨੀਟਰਿੰਗ ਕੰਮ ਕਰਦਾ ਹੈ ਅਤੇ ਲੋਡ ਹੇਠ ਗ਼ਲਤ ਪਾਜ਼ਿਟਿਵ ਦੇਵੇਗਾ।

ਸੰਬੰਧਿਤ: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (ਈਵੈਂਟ ਲੂਪ ਰੁੱਝਿਆ ਹੋਣ ਵੇਲੇ ਪ੍ਰੋਬ), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (ਕੈਟਾਲੌਗ ਕੀਮਤ-ਗਣਨਾ ਦਾ ਸਰੋਤਾਂ ਉੱਤੇ ਕਬਜ਼ਾ), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (ਕੰਪ੍ਰੈਸ਼ਨ ਟੋਕਨ-ਗਿਣਤੀ ਦਾ ਸਰੋਤਾਂ ਉੱਤੇ ਕਬਜ਼ਾ)।

### ਵਿਕਲਪਿਕ ਬੇਨਤੀ-ਪਾਥ ਕੰਮ (ਮੈਮੋਰੀ, ਸਕਿੱਲ, ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼)

ਮੈਮੋਰੀ ਐਕਸਟ੍ਰੈਕਸ਼ਨ, ਸਕਿੱਲ ਇੰਜੈਕਸ਼ਨ ਅਤੇ OAuth ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼ `/healthz` ਨਾਲ **ਮੁੱਖ Node ਈਵੈਂਟ ਲੂਪ** ਸਾਂਝਾ ਕਰਦੇ ਹਨ। ਇਹ ਡੈਸ਼ਬੋਰਡ-ਟੌਗਲ ਫੀਚਰ (`memoryEnabled`, `skillsEnabled`) ਹਨ, ਵਰਕਰ ਪੂਲ ਨਹੀਂ। [ਵਾਤਾਵਰਣ — ਈਵੈਂਟ-ਲੂਪ ਲਾਗਤ](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ਵੇਖੋ।

### ਪ੍ਰੋਵਾਈਡਰ ਸਿਹਤ

> **ਕੋਈ REST ਐਂਡਪੌਇੰਟ ਨਹੀਂ।** ਪ੍ਰੋਵਾਈਡਰ ਸਿਹਤ ਡਾਟਾ MCP ਟੂਲ `observability_snapshot` ਜਾਂ ਡੈਸ਼ਬੋਰਡ ਦੇ `/dashboard/providers` ਪੰਨੇ ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ।

### ਪ੍ਰੋਵਾਈਡਰ ਵੇਰਵਾ

> **ਕੋਈ REST ਐਂਡਪੌਇੰਟ ਨਹੀਂ।** ਹਰੇਕ ਪ੍ਰੋਵਾਈਡਰ ਦਾ ਵੇਰਵਾ ਡੈਸ਼ਬੋਰਡ ਦੇ `/dashboard/providers` ਪੰਨੇ ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ।

---

## ਪ੍ਰੋਵਾਈਡਰ ਹੈਲਥ ਆਟੋਪਾਇਲਟ

`providerHealthAutopilot.ts` ਮੋਡੀਊਲ ਇੱਕ **ਸਵੈ-ਮੁਰੰਮਤ ਪ੍ਰਣਾਲੀ** ਹੈ ਜੋ:

1. ਪ੍ਰੋਵਾਈਡਰ ਸਮੱਸਿਆਵਾਂ ਦਾ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ (ਸਰਕਿਟ ਖੁੱਲ੍ਹਾ ਹੋਣਾ, ਕੂਲਡਾਊਨ, ਲਾਕਆਉਟ, ਕੋਟਾ ਚੇਤਾਵਨੀਆਂ)
2. ਉਨ੍ਹਾਂ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ **ਸਿਫ਼ਾਰਸ਼ੀ ਕਾਰਵਾਈਆਂ** ਤਿਆਰ ਕਰਦਾ ਹੈ
3. ਵਿਕਲਪਿਕ ਤੌਰ 'ਤੇ ਘੱਟ-ਜੋਖਮ ਵਾਲੀਆਂ ਕਾਰਵਾਈਆਂ ਨੂੰ **ਆਪਣੇ-ਆਪ ਚਲਾਉਂਦਾ** ਹੈ

### ਪਤਾ ਲਗਾਈਆਂ ਜਾਣ ਵਾਲੀਆਂ ਸਮੱਸਿਆ ਕਿਸਮਾਂ

| ਸਮੱਸਿਆ ਦੀ ਕਿਸਮ               | ਗੰਭੀਰਤਾ | ਉਦਾਹਰਨ ਸਥਿਤੀ                              |
| ---------------------------- | ------- | ----------------------------------------- |
| `provider_circuit_open`      | ਨਾਜ਼ੁਕ  | 5 ਅਸਫਲਤਾਵਾਂ ਤੋਂ ਬਾਅਦ ਸਰਕਿਟ ਬ੍ਰੇਕਰ ਖੁੱਲ੍ਹਾ |
| `provider_circuit_half_open` | ਚੇਤਾਵਨੀ | ਸਰਕਿਟ ਵੱਲੋਂ ਰਿਕਵਰੀ ਦੀ ਜਾਂਚ                |
| `connection_cooldown`        | ਚੇਤਾਵਨੀ | 429 ਤੋਂ ਬਾਅਦ ਕਨੈਕਸ਼ਨ ਕੂਲਡਾਊਨ ਵਿੱਚ         |
| `stale_connection_error`     | ਚੇਤਾਵਨੀ | ਆਖਰੀ ਰਿਫ੍ਰੈਸ਼ 30+ ਮਿੰਟ ਪਹਿਲਾਂ ਅਸਫਲ ਹੋਇਆ   |
| `terminal_connection_error`  | ਨਾਜ਼ੁਕ  | OAuth ਰੱਦ, ਕੁੰਜੀ ਅਵੈਧ                     |
| `inactive_connection`        | ਜਾਣਕਾਰੀ | ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਕਨੈਕਸ਼ਨ ਅਸਮਰੱਥ ਕੀਤਾ ਹੋਇਆ    |
| `model_lockout`              | ਚੇਤਾਵਨੀ | ਖ਼ਾਸ ਮਾਡਲ ਕਵਾਰੰਟੀਨ ਵਿੱਚ                   |
| `quota_monitor_warning`      | ਚੇਤਾਵਨੀ | ਕੋਟੇ ਦੀ 80%+ ਵਰਤੋਂ                        |

### ਤਿਆਰ ਕੀਤੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਕਾਰਵਾਈ ਕਿਸਮਾਂ

| ਕਾਰਵਾਈ                         | ਜੋਖਮ    | ਵੇਰਵਾ                                      |
| ------------------------------ | ------- | ------------------------------------------ |
| `clear_provider_breaker`       | ਦਰਮਿਆਨਾ | ਸਰਕਿਟ ਬ੍ਰੇਕਰ ਨੂੰ ਬੰਦ ਸਥਿਤੀ ਵਿੱਚ ਰੀਸੈੱਟ ਕਰੋ |
| `clear_connection_cooldown`    | ਘੱਟ     | ਕਨੈਕਸ਼ਨ ਤੋਂ ਕੂਲਡਾਊਨ ਹਟਾਓ                   |
| `clear_stale_connection_error` | ਘੱਟ     | ਪੁਰਾਣਾ ਗਲਤੀ ਫਲੈਗ ਸਾਫ਼ ਕਰੋ                  |
| `clear_model_lockout`          | ਘੱਟ     | ਕਵਾਰੰਟੀਨ ਕੀਤੇ ਮਾਡਲ ਨੂੰ ਮੁੜ ਸਮਰੱਥ ਕਰੋ       |
| `reactivate_connection`        | ਦਰਮਿਆਨਾ | ਅਕਿਰਿਆਸ਼ੀਲ ਕੀਤੇ ਕਨੈਕਸ਼ਨ ਨੂੰ ਮੁੜ ਸਮਰੱਥ ਕਰੋ  |
| `deactivate_connection`        | ਉੱਚਾ    | ਸਮੱਸਿਆ ਵਾਲੇ ਕਨੈਕਸ਼ਨ ਨੂੰ ਅਸਮਰੱਥ ਕਰੋ         |

### API

> **ਕੋਈ REST ਐਂਡਪੁਆਇੰਟ ਨਹੀਂ ਹੈ।** ਆਟੋਪਾਇਲਟ ਸਮੱਸਿਆਵਾਂ MCP ਟੂਲ `observability_snapshot` ਜਾਂ ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਉਪਲਬਧ ਹਨ। ਆਟੋਪਾਇਲਟ ਅੰਦਰੂਨੀ ਤੌਰ 'ਤੇ ਚੱਲਦਾ ਹੈ; ਇਸਦਾ ਵਿਵਹਾਰ ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲਾਂ ਦੀ ਬਜਾਏ ਸੈਟਿੰਗਾਂ DB (ਹਰੇਕ ਕਨੈਕਸ਼ਨ ਦੇ `autopilotMode` ਫ਼ੀਲਡ) ਰਾਹੀਂ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ — ਕਿਸੇ ਆਟੋਪਾਇਲਟ-ਮੋਡ env var ਲਈ `grep -rn` ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਦਿੰਦਾ।

### ਆਟੋਪਾਇਲਟ ਮੋਡ

ਆਟੋਪਾਇਲਟ ਮੂਲ ਰੂਪ ਵਿੱਚ **ਮੈਨੁਅਲ ਮੋਡ** ਵਿੱਚ ਕੰਮ ਕਰਦਾ ਹੈ — ਇਹ ਸਮੱਸਿਆਵਾਂ ਦਾ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ ਅਤੇ ਸਿਫ਼ਾਰਸ਼ੀ ਕਾਰਵਾਈਆਂ ਤਿਆਰ ਕਰਦਾ ਹੈ, ਪਰ ਉਨ੍ਹਾਂ ਨੂੰ ਆਪਣੇ-ਆਪ ਲਾਗੂ ਨਹੀਂ ਕਰਦਾ। ਕਾਰਵਾਈਆਂ ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਲਾਗੂ ਕੀਤੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।

---

## ਕੌਂਬੋ ਹੈਲਥ ਆਟੋਪਾਇਲਟ

`comboHealthAutopilot.ts`, ਪ੍ਰੋਵਾਈਡਰ ਆਟੋਪਾਇਲਟ ਦਾ **ਕੌਂਬੋ-ਵਿਸ਼ੇਸ਼** ਸਮਕੱਖ ਹੈ। ਇਹ:

- ਅਸਿਹਤਮੰਦ ਕੌਂਬੋਆਂ ਦਾ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ
- ਟਾਰਗੇਟਾਂ ਨੂੰ ਮੁੜ ਕ੍ਰਮਬੱਧ ਕਰਨ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕਰਦਾ ਹੈ
- ਖ਼ਰਾਬ ਟਾਰਗੇਟਾਂ ਨੂੰ ਅਸਮਰੱਥ ਕਰਨ ਦਾ ਸੁਝਾਅ ਦਿੰਦਾ ਹੈ
- N ਅਸਫਲਤਾਵਾਂ ਤੋਂ ਬਾਅਦ ਬੰਦ ਹੋ ਚੁੱਕੇ ਟਾਰਗੇਟਾਂ ਨੂੰ ਆਪਣੇ-ਆਪ ਹਟਾਉਂਦਾ ਹੈ

### ਕੌਂਬੋ ਸਮੱਸਿਆਵਾਂ ਦੀਆਂ ਉਦਾਹਰਨਾਂ

```
ਕੌਂਬੋ "always-on" (ਤਰਜੀਹ ਰਣਨੀਤੀ)
├─ ਟਾਰਗੇਟ 1: openai/gpt-5 (ਸਿਹਤਮੰਦ)
├─ ਟਾਰਗੇਟ 2: anthropic/claude-opus-4-6 (⚠️ 14:00 ਤੱਕ ਮਾਡਲ ਲਾਕਆਉਟ)
└─ ਟਾਰਗੇਟ 3: kiro/claude-sonnet-4-5 (ਸਿਹਤਮੰਦ)

ਸਿਫ਼ਾਰਸ਼ੀ ਕਾਰਵਾਈ: ਮੁੜ ਕ੍ਰਮਬੱਧ ਕਰੋ — ਲਾਕਆਉਟ ਦੀ ਮਿਆਦ ਖ਼ਤਮ ਹੋਣ ਤੱਕ kiro ਨੂੰ anthropic ਤੋਂ ਉੱਪਰ ਲਿਜਾਓ
```

---

## ਕੋਟਾ ਮਾਨੀਟਰ

`observability.ts`, ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਪ੍ਰੋਵਾਈਡਰਾਂ (Claude Code, Codex, GitHub Copilot) ਲਈ **ਪ੍ਰਤੀ-ਸੈਸ਼ਨ ਕੋਟਾ ਮਾਨੀਟਰ** ਉਪਲਬਧ ਕਰਾਉਂਦਾ ਹੈ:

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

### ਸਥਿਤੀਆਂ ਦੇ ਅਰਥ

| ਸਥਿਤੀ       | ਕਦੋਂ                     | UI ਕਾਰਵਾਈ                            |
| ----------- | ------------------------ | ------------------------------------ |
| `starting`  | ਸ਼ੁਰੂਆਤੀ ਪੋਲ ਜਾਰੀ ਹੈ     | ਸਪਿਨਰ                                |
| `idle`      | ਕੋਈ ਹਾਲੀਆ ਸਰਗਰਮੀ ਨਹੀਂ    | ਡੈਸ਼ਬੋਰਡ ਤੋਂ ਲੁਕਾਇਆ ਜਾਂਦਾ ਹੈ         |
| `healthy`   | 50% ਤੋਂ ਵੱਧ ਕੋਟਾ ਬਾਕੀ ਹੈ | ਹਰਾ ਬਿੰਦੂ                            |
| `warning`   | 50% ਤੋਂ ਘੱਟ ਕੋਟਾ ਬਾਕੀ ਹੈ | ਪੀਲੀ ਚੇਤਾਵਨੀ                         |
| `exhausted` | ਕੋਟਾ = 0%                | ਲਾਲ ਬਲਾਕ, ਅਗਲੇ ਪ੍ਰੋਵਾਈਡਰ ਵੱਲ ਰੂਟ ਕਰੋ |
| `error`     | ਪੋਲਿੰਗ ਅਸਫਲ ਹੋਈ          | ਲਾਲ ਬਿੰਦੂ, ਛੇਤੀ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ      |

### API

> **ਕੋਈ REST ਐਂਡਪੁਆਇੰਟ ਨਹੀਂ ਹੈ।** ਕੋਟਾ ਮਾਨੀਟਰ ਡਾਟਾ MCP ਟੂਲ `observability_snapshot` ਜਾਂ ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ।

---

## ਨਿਰੀਖਣਯੋਗਤਾ ਸਨੈਪਸ਼ਾਟ

MCP ਟੂਲ `observability_snapshot` AI ਏਜੰਟਾਂ ਲਈ ਇੱਕ **ਸੰਪੂਰਨ ਸਿਸਟਮ ਸਨੈਪਸ਼ਾਟ** ਵਾਪਸ ਕਰਦਾ ਹੈ:

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
  "quotaMonitors": {/* ਉੱਪਰ ਵੇਖੋ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ਏਜੰਟ ਇਸਦੀ ਵਰਤੋਂ **ਰੂਟਿੰਗ ਫ਼ੈਸਲੇ** ਲੈਣ ਲਈ ਕਰਦੇ ਹਨ — ਉਦਾਹਰਨ ਲਈ, "ਜੇ openai ਦਾ ਸਰਕਿਟ ਖੁੱਲ੍ਹਾ ਹੈ, ਤਾਂ ਪਹਿਲਾਂ anthropic ਵੱਲ ਰੂਟ ਕਰੋ"।

---

## ਟੋਕਨ ਸਿਹਤ ਜਾਂਚ

OAuth ਪ੍ਰਦਾਤਾਵਾਂ (Claude Code, GitHub Copilot, Cursor) ਨੂੰ **ਸਮੇਂ-ਸਮੇਂ 'ਤੇ ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼** ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। `src/lib/tokenHealthCheck.ts` ਇੱਕ ਬੈਕਗ੍ਰਾਊਂਡ ਸ਼ਡਿਊਲਰ ਚਲਾਉਂਦਾ ਹੈ:

- **ਸਵੀਪ ਟਿਕ**: ਹਰ 60 ਸਕਿੰਟ ਬਾਅਦ (`src/lib/tokenHealthCheck.ts:30` ਵਿੱਚ `TICK_MS = 60 * 1000` ਅਨੁਸਾਰ ਸਵੀਪ)
- **ਪ੍ਰਤੀ-ਕਨੈਕਸ਼ਨ ਸਿਹਤ ਜਾਂਚ ਅੰਤਰਾਲ**: ਮੂਲ ਰੂਪ ਵਿੱਚ 60 ਮਿੰਟ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ਸੈਟਿੰਗਾਂ DB ਰਾਹੀਂ ਸੰਰਚਨਾਯੋਗ
- **401 'ਤੇ ਅਗਾਊਂ ਰਿਫ੍ਰੈਸ਼**: ਪ੍ਰਤੀ-ਕਨੈਕਸ਼ਨ ਇੰਟਰਸੈਪਟਰ ਦੁਆਰਾ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ

### ਟੋਕਨ ਸਿਹਤ ਸਥਿਤੀ

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

### ਸੰਰਚਨਾ

ਟੋਕਨ ਸਿਹਤ ਜਾਂਚ ਸੰਰਚਨਾ ਨੂੰ `tokenHealthCheck.ts` ਦੁਆਰਾ ਅੰਦਰੂਨੀ ਤੌਰ 'ਤੇ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ।

### ਟੋਕਨ ਸਿਹਤ

> **ਕੋਈ REST ਐਂਡਪੌਇੰਟ ਨਹੀਂ।** ਟੋਕਨ ਸਿਹਤ ਡਾਟਾ ਡੈਸ਼ਬੋਰਡ ਜਾਂ MCP ਟੂਲ `observability_snapshot` ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ।

---

## ਚੇਤਾਵਨੀਆਂ

### ਬਿਲਟ-ਇਨ ਚੈਨਲ

OmniRoute **3 ਚੇਤਾਵਨੀ ਚੈਨਲਾਂ** ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ:

| ਚੈਨਲ          | ਸੈੱਟਅੱਪ        | ਵਰਤੋਂ ਦਾ ਮਾਮਲਾ            |
| ------------- | -------------- | ------------------------- |
| ਡੈਸ਼ਬੋਰਡ ਬੈਨਰ | ਹਮੇਸ਼ਾ ਚਾਲੂ    | ਐਪ-ਅੰਦਰੂਨੀ ਸੂਚਨਾਵਾਂ       |
| Webhook       | URL ਸੰਰਚਿਤ ਕਰੋ | Slack, Discord, PagerDuty |
| ਲੌਗ           | ਮੂਲ            | ਬਾਹਰੀ ਲੌਗ ਏਕੀਕਰਨ ਲਈ       |

### Webhook ਸੰਰਚਨਾ

> **ਨੋਟ:** Webhook ਚੇਤਾਵਨੀ ਸੰਰਚਨਾ ਨੂੰ ਡੈਸ਼ਬੋਰਡ ਦੇ Settings ਪੰਨੇ ਰਾਹੀਂ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ। Webhook URL, ਇਵੈਂਟ ਫਿਲਟਰਿੰਗ ਅਤੇ ਪੇਲੋਡ ਅਨੁਕੂਲਨ ਲਈ Settings UI ਵੇਖੋ।

### ਚੇਤਾਵਨੀ ਦੀਆਂ ਕਿਸਮਾਂ

| ਚੇਤਾਵਨੀ                      | ਕਦੋਂ                                 | ਮੂਲ ਗੰਭੀਰਤਾ |
| ---------------------------- | ------------------------------------ | ----------- |
| `provider_circuit_open`      | ਸਰਕਿਟ ਖੁੱਲ੍ਹਦਾ ਹੈ                    | ਗੰਭੀਰ       |
| `provider_circuit_half_open` | ਸਰਕਿਟ ਰਿਕਵਰੀ ਦੀ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹੈ      | ਜਾਣਕਾਰੀ     |
| `quota_warning`              | ਕੋਟਾ 80%+ 'ਤੇ                        | ਚੇਤਾਵਨੀ     |
| `quota_exhausted`            | ਕੋਟਾ 100% 'ਤੇ                        | ਗੰਭੀਰ       |
| `token_refresh_failed`       | ਲਗਾਤਾਰ 3+ ਰਿਫ੍ਰੈਸ਼ ਅਸਫਲਤਾਵਾਂ         | ਚੇਤਾਵਨੀ     |
| `token_expired`              | ਟੋਕਨ ਦੀ ਮਿਆਦ ਲੰਘ ਗਈ                  | ਗੰਭੀਰ       |
| `combo_target_unhealthy`     | ਕੌਂਬੋ ਟਾਰਗੇਟ 1 ਘੰਟੇ+ ਲਈ ਕੂਲਡਾਊਨ ਵਿੱਚ | ਚੇਤਾਵਨੀ     |
| `db_integrity_warning`       | FK ਉਲੰਘਣਾਵਾਂ > 0                     | ਚੇਤਾਵਨੀ     |
| `heap_pressure`              | ਹੀਪ ਵਰਤੋਂ ਥ੍ਰੈਸ਼ਹੋਲਡ ਦੇ 80% ਤੋਂ ਵੱਧ  | ਚੇਤਾਵਨੀ     |

---

## ਕਾਰਗੁਜ਼ਾਰੀ ਮੈਟ੍ਰਿਕਸ

### ਟ੍ਰੈਕ ਕੀਤੇ ਮੈਟ੍ਰਿਕਸ

| ਮੈਟ੍ਰਿਕ                 | ਕਿਸਮ       | ਸਰੋਤ                            |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | ਕਾਊਂਟਰ     | `services/usage.ts`             |
| `request_latency_ms`    | ਹਿਸਟੋਗ੍ਰਾਮ | `services/usage.ts`             |
| `tokens_consumed`       | ਕਾਊਂਟਰ     | `services/usage.ts`             |
| `cost_usd`              | ਕਾਊਂਟਰ     | `services/usage.ts`             |
| `provider_errors`       | ਕਾਊਂਟਰ     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ਕਾਊਂਟਰ     | `services/resilience.ts`        |
| `cache_hits`            | ਕਾਊਂਟਰ     | `services/signatureCache.ts`    |
| `compression_savings`   | ਹਿਸਟੋਗ੍ਰਾਮ | `services/compression/stats.ts` |
| `quota_used`            | ਗੇਜ        | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ਗੇਜ        | `observability.ts`              |

### ਲੇਟੈਂਸੀ ਪ੍ਰਤੀਸ਼ਤਕ (p50/p95/p99)

> **ਕੋਈ REST ਐਂਡਪੌਇੰਟ ਨਹੀਂ ਹੈ।** ਲੇਟੈਂਸੀ ਪ੍ਰਤੀਸ਼ਤਕ ਡਾਟਾ ਡੈਸ਼ਬੋਰਡ ਦੇ `/dashboard/health` ਸਫ਼ੇ ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ। Prometheus/OpenTelemetry ਐਕਸਪੋਰਟ v3.9 ਲਈ ਯੋਜਨਾਬੱਧ ਹੈ।

### Prometheus / OpenTelemetry ਐਕਸਪੋਰਟ (ਪੜਾਅ 2)

v3.9 ਲਈ ਯੋਜਨਾਬੱਧ: Prometheus, OpenTelemetry, Datadog ਲਈ ਮੂਲ ਐਕਸਪੋਰਟ।

ਫਿਲਹਾਲ, ਕਿਸੇ ਵੀ HTTP-ਅਧਾਰਿਤ ਨਿਗਰਾਨੀ ਸਿਸਟਮ (Prometheus blackbox exporter, Datadog HTTP check, ਆਦਿ) ਨਾਲ `/api/monitoring/health` ਨੂੰ ਸਕ੍ਰੇਪ ਕਰੋ।

---

## ਅਲਰਟਿੰਗ ਵਿਧੀਆਂ

### Slack

> **ਨੋਟ:** Webhook ਅਲਰਟਿੰਗ ਨੂੰ ਡੈਸ਼ਬੋਰਡ ਦੇ Settings ਸਫ਼ੇ ਰਾਹੀਂ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ—ਕੋਈ ਸਮਰਪਿਤ webhook env vars ਨਹੀਂ ਹਨ (`grep -rn` ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਦਿੰਦਾ)। Webhook URL, ਇਵੈਂਟ ਫਿਲਟਰਿੰਗ ਅਤੇ ਪੇਲੋਡ ਅਨੁਕੂਲਨ ਲਈ Settings UI ਵੇਖੋ।

### Discord

> Webhook ਅਲਰਟਿੰਗ Slack ਵਾਂਗ ਹੀ Settings UI ਪ੍ਰਵਾਹ ਦੀ ਵਰਤੋਂ ਕਰਦੀ ਹੈ। Discord ਉਸੇ JSON ਪੇਲੋਡ ਬਣਤਰ ਨੂੰ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ।

### PagerDuty

> Webhook ਅਲਰਟਿੰਗ ਉਸੇ Settings UI ਪ੍ਰਵਾਹ ਦੀ ਵਰਤੋਂ ਕਰਦੀ ਹੈ। PagerDuty Events API v2 ਰਾਊਟਿੰਗ ਕੁੰਜੀਆਂ ਨੂੰ Settings UI ਵਿੱਚ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

### ਕਸਟਮ Webhook (JSON)

> JSON ਬਾਡੀ ਨਾਲ POST ਸਵੀਕਾਰ ਕਰਨ ਵਾਲਾ ਕੋਈ ਵੀ HTTP ਐਂਡਪੌਇੰਟ ਕੰਮ ਕਰੇਗਾ। URL ਨੂੰ Settings UI ਵਿੱਚ ਸੰਰਚਿਤ ਕਰੋ।

---

## ਡੈਸ਼ਬੋਰਡ ਸੰਰਚਨਾ

### ਸਿਹਤ ਡੈਸ਼ਬੋਰਡ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰੋ

ਇੱਕ `~/.omniroute/dashboard.json` ਬਣਾਓ:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ਕਿਸੇ ਪ੍ਰਦਾਤਾ ਨੂੰ ਸਿਖਰ 'ਤੇ ਪਿੰਨ ਕਰੋ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ਸਮੱਸਿਆ-ਨਿਵਾਰਣ

### "ਪ੍ਰਦਾਤਾ ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ ਪਰ ਬੇਨਤੀਆਂ ਅਸਫਲ ਹੁੰਦੀਆਂ ਹਨ"

1. **autopilot ਸਮੱਸਿਆਵਾਂ** ਦੀ ਜਾਂਚ ਕਰੋ—ਸ਼ਾਇਦ ਕੋਈ ਮਾਡਲ ਲੌਕ ਆਉਟ ਹੋਇਆ ਹੋਵੇ
2. ਖ਼ਾਸ ਤਰੁੱਟੀ ਸ਼੍ਰੇਣੀ ਲਈ **ਹਾਲੀਆ ਤਰੁੱਟੀਆਂ** ਵੇਖੋ
3. ਪ੍ਰਦਾਤਾ ਕਾਰਡ ਵਿੱਚ **ਕਨੈਕਸ਼ਨ ਟੈਸਟ** ਅਜ਼ਮਾਓ
4. ਜਾਂਚ ਕਰੋ ਕਿ ਕੀ ਪ੍ਰਦਾਤਾ **ਅੱਪਸਟ੍ਰੀਮ 'ਤੇ ਰੇਟ-ਲਿਮਿਟਡ** ਹੈ (ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਦਿਖਾਈ ਨਹੀਂ ਦਿੰਦਾ)

### "ਕੋਟਾ ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ ਪਰ ਮੈਨੂੰ 429 ਤਰੁੱਟੀਆਂ ਦਿਖਾਈ ਦਿੰਦੀਆਂ ਹਨ"

- 429 ਦਾ ਅਰਥ ਹੈ ਕਿ ਪ੍ਰਦਾਤਾ ਮੁਤਾਬਕ ਤੁਸੀਂ ਆਪਣਾ ਕੋਟਾ ਵਰਤ ਚੁੱਕੇ ਹੋ
- OmniRoute ਦੀ ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ **ਪੁਰਾਣੀ** ਹੋ ਸਕਦੀ ਹੈ—ਅਸਲ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਤਾ ਦੇ ਅੱਪਸਟ੍ਰੀਮ ਕੋਲ ਹੁੰਦੀ ਹੈ
- ਅੰਦਰੂਨੀ ਕੋਟਾ ਮਾਨੀਟਰ ਰਾਹੀਂ ਕੋਟਾ ਡਾਟਾ ਆਪਣੇ ਆਪ ਤਾਜ਼ਾ ਹੁੰਦਾ ਹੈ

### "ਕੌਂਬੋ ਅਸਫਲ ਹੋ ਰਿਹਾ ਹੈ ਪਰ ਸਾਰੇ ਟਾਰਗੇਟ ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ"

- ਟਾਰਗੇਟ ਕ੍ਰਮਬੱਧਤਾ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਲਈ **ਕੌਂਬੋ ਸਿਹਤ** ਡੈਸ਼ਬੋਰਡ ਦੀ ਜਾਂਚ ਕਰੋ
- **ਫਾਲਬੈਕ ਇਵੈਂਟਸ** ਵੇਖੋ—ਸ਼ਾਇਦ ਕੌਂਬੋ ਬਹੁਤ ਤੇਜ਼ੀ ਨਾਲ ਸਾਰੇ ਵਿਕਲਪ ਵਰਤ ਰਿਹਾ ਹੋਵੇ
- ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ **ਰਣਨੀਤੀ** ਤੁਹਾਡੇ ਵਰਤੋਂ ਮਾਮਲੇ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ (ਤਰਜੀਹ ਬਨਾਮ ਰਾਊਂਡ-ਰੌਬਿਨ ਬਨਾਮ ਆਟੋ)

### "ਡਾਟਾਬੇਸ ਸਿਹਤ ਜਾਂਚ ਅਸਫਲ ਹੋ ਰਹੀ ਹੈ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ਚਲਾਓ
- ਜੇ "ok" ਆਵੇ—ਇਹ ਝੂਠਾ ਅਲਾਰਮ ਹੈ, ਸਿਹਤ ਜਾਂਚ ਲੋੜ ਤੋਂ ਵੱਧ ਸਖ਼ਤ ਹੈ
- ਜੇ ਕੁਝ ਹੋਰ ਆਵੇ—**OmniRoute ਨੂੰ ਰੋਕੋ** ਅਤੇ [ਆਫ਼ਤ ਰਿਕਵਰੀ ਗਾਈਡ](./DATABASE_GUIDE.md#disaster-recovery) ਦੀ ਪਾਲਣਾ ਕਰੋ

### "ਮੈਮੋਰੀ ਹੀਪ ਦਾ ਦਬਾਅ ਨਾਜ਼ੁਕ ਹੈ"

```bash
# ਮੌਜੂਦਾ ਹੀਪ ਦੀ ਜਾਂਚ ਕਰੋ
node -e "console.log(process.memoryUsage())"

# ਮੈਨੂਅਲ GC ਟ੍ਰਿਗਰ ਕਰੋ (ਜੇ --expose-gc ਹੋਵੇ)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ਸਮਕਾਲੀ ਬੇਨਤੀਆਂ ਘਟਾਓ (ਡੈਸ਼ਬੋਰਡ ਦੇ Settings ਸਫ਼ੇ ਰਾਹੀਂ ਸੈੱਟ ਕਰੋ, env var ਰਾਹੀਂ ਨਹੀਂ)
# ਕੋਈ `MAX_CONCURRENT_REQUESTS` env var ਨਹੀਂ ਹੈ—ਇਸਨੂੰ Settings → Concurrency ਵਿੱਚ ਸੰਰਚਿਤ ਕਰੋ।
```

---

## ਇਹ ਵੀ ਵੇਖੋ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ਵਰਤੋਂ ਅਤੇ ਲਾਗਤ ਦੀ ਟ੍ਰੈਕਿੰਗ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB ਸਕੀਮਾ + ਸਥਿਤੀ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ਪ੍ਰਾਕਸੀ ਸਥਿਤੀ (ਵੱਖਰਾ ਕੈਸ਼)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ਸਿਸਟਮ ਆਰਕੀਟੈਕਚਰ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ਸਰਕਿਟ ਬ੍ਰੇਕਰ ਦੇ ਵੇਰਵੇ
- ਸਰੋਤ: `src/lib/monitoring/` (4 ਫ਼ਾਈਲਾਂ, 2121 LOC)
