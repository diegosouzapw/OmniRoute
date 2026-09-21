# Router Backends & Embedded Services — architecture contract (ADR) (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **ਸਥਿਤੀ:** ਸਵੀਕਾਰਿਆ ਗਿਆ · **ਸੰਦਰਭ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **ਕਾਂਟ੍ਰੈਕਟ:** `domain/routing/routerBackends.ts`
> (ਟਾਈਪਡ ਰਜਿਸਟਰੀ — ਕੋਡ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ਨਾਲ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ)

ਇਹ ADR ਸਪਸ਼ਟ ਕਰਦਾ ਹੈ ਕਿ `ts` (ਨੇਟਿਵ), `bifrost`, `cliproxy`, `9router`, ਅਤੇ
VibeProxy-ਅਨੁਕੂਲ ਇੰਜਣਾਂ ਦਾ ਆਪਸ ਵਿੱਚ ਕੀ ਸੰਬੰਧ ਹੈ, ਤਾਂ ਜੋ ਯੋਗਦਾਨਕਾਰ ਆਰਕੀਟੈਕਚਰ ਦੇ ਪੱਖੋਂ
ਵੱਖਰੀਆਂ ਦੋ ਚੀਜ਼ਾਂ ਨੂੰ ਇੱਕੋ ਨਾ ਸਮਝਣ। ਇਹ router-backend-registry ਕੰਮ ਦੁਆਰਾ ਪੇਸ਼ ਕੀਤੀ ਗਈ
ਟਾਈਪਡ ਰਜਿਸਟਰੀ ਨੂੰ ਇਸ ਮਾਡਲ ਲਈ ਸੱਚਾਈ ਦੇ ਇੱਕੋ-ਇੱਕ ਸਰੋਤ ਵਜੋਂ ਦਸਤਾਵੇਜ਼ਬੱਧ ਕਰਦਾ ਹੈ।

## ਮੁੱਖ ਅੰਤਰ — ਦੋ ਸੁਤੰਤਰ ਧੁਰੇ

ਕਿਸੇ ਇੰਜਣ ਦੀ ਭੂਮਿਕਾ ਨੂੰ **ਦੋ ਸੁਤੰਤਰ ਧੁਰਿਆਂ** ਰਾਹੀਂ ਦਰਸਾਇਆ ਜਾਂਦਾ ਹੈ, ਜਿਨ੍ਹਾਂ ਨੂੰ
ਰਜਿਸਟਰੀ ਦੇ `RouterBackendDefinition` ਵਿੱਚ ਇਕੱਠੇ ਐਨਕੋਡ ਕੀਤਾ ਗਿਆ ਹੈ:

1. **ਜੀਵਨ-ਚੱਕਰ** (`RouterBackendLifecycle`) — _ਇੰਜਣ ਕਿਵੇਂ ਚੱਲਦਾ ਹੈ_:
   - `in-process` — OmniRoute Node ਪ੍ਰੋਸੈਸ ਦੇ ਅੰਦਰ ਚੱਲਦਾ ਹੈ (ਨੇਟਿਵ TS ਪਾਈਪਲਾਈਨ)।
   - `supervised` — ਇੱਕ ਲੋਕਲ ਚਾਈਲਡ ਪ੍ਰੋਸੈਸ, ਜਿਸਨੂੰ OmniRoute
     `ServiceSupervisor` ਰਾਹੀਂ ਇੰਸਟਾਲ/ਸ਼ੁਰੂ/ਬੰਦ/ਸਿਹਤ-ਜਾਂਚਦਾ ਹੈ, ਅਤੇ ਫਿਰ ਇੱਕ ਪ੍ਰਦਾਤਾ
     ਕਨੈਕਸ਼ਨ ਵਜੋਂ ਵਰਤਦਾ ਹੈ।
   - `external` — ਇੱਕ HTTP ਐਂਡਪੌਇੰਟ, ਜਿਸ ਵੱਲ OmniRoute ਡਿਸਪੈਚ ਕਰਦਾ ਹੈ ਪਰ ਜਿਸਦਾ
     ਪ੍ਰਬੰਧਨ **ਨਹੀਂ** ਕਰਦਾ (ਇੱਕ env ਬੇਸ URL ਰਾਹੀਂ ਕਨਫਿਗਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ)।
   - `disabled` — ਰਜਿਸਟਰਡ ਹੈ ਪਰ ਚੁਣਨਯੋਗ ਨਹੀਂ।
2. **ਚੋਣ ਧੁਰਾ** (ਰੀਲੇ ਰੂਟਿੰਗ ਬੈਕਐਂਡ) — _ਕੀ ਰੀਲੇ ਇਸ ਵੱਲ ਡਿਸਪੈਚ ਕਰਦਾ ਹੈ_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` ਵਿੱਚ।

ਬਚਣ ਵਾਲੀ ਗਲਤੀ: "ਐਂਬੈਡਿਡ ਸਰਵਿਸ" ਅਤੇ "ਰੂਟਿੰਗ ਬੈਕਐਂਡ" ਨੂੰ ਇੱਕੋ ਸੂਚੀ ਮੰਨਣਾ।
ਇਹ ਇੱਕੋ ਨਹੀਂ ਹਨ। ਇੱਕ `supervised` ਇੰਜਣ (9router/cliproxy) **ਨੇਟਿਵ ਪਾਈਪਲਾਈਨ ਦੁਆਰਾ
ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਪ੍ਰਦਾਤਾ ਕਨੈਕਸ਼ਨ** ਹੈ, ਕੋਈ ਵਿਕਲਪਿਕ ਰੀਲੇ ਡਿਸਪੈਚ ਬੈਕਐਂਡ ਨਹੀਂ।
`bifrost` ਇਸਦਾ ਉਲਟ ਹੈ — ਇੱਕ ਰੀਲੇ ਡਿਸਪੈਚ ਬੈਕਐਂਡ, ਜੋ (ਇਤਿਹਾਸਕ ਤੌਰ 'ਤੇ)
ਸਿਰਫ਼ `external` ਸੀ।

## ਰਜਿਸਟਰੀ — ਸੱਚਾਈ ਦਾ ਇੱਕੋ-ਇੱਕ ਸਰੋਤ

`domain/routing/routerBackends.ts` ਕਾਂਟ੍ਰੈਕਟ (ਕੋਡ
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ਨਾਲ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ) ਹਰੇਕ ਇੰਜਣ ਨੂੰ ਉਸਦੇ
ਜੀਵਨ-ਚੱਕਰ, ਸਮਰੱਥਾਵਾਂ, ਸਰਵਿਸ ਪਛਾਣ, ਡਿਫਾਲਟ ਪੋਰਟ, ਸਿਹਤ ਕਨਫਿਗਰੇਸ਼ਨ, ਅਤੇ
ਟੈਲੀਮੀਟਰੀ ਸਮਰਥਨ ਸਮੇਤ ਇੱਕ ਵਾਰ ਘੋਸ਼ਿਤ ਕਰਦਾ ਹੈ। ਵਰਤੋਂਕਾਰ ਹਰੇਕ ਸਾਈਡਕਾਰ ਲਈ
ਖਾਸ ਸ਼ਰਤਾਂ ਲਿਖਣ ਦੀ ਬਜਾਏ `getRouterBackend(id)`, `listRouterBackends()`, ਅਤੇ
`listRouterBackendsByCapability(cap)` ਰਾਹੀਂ ਇੰਜਣ ਲੱਭਦੇ ਹਨ।

| ਬੈਕਐਂਡ      | ਜੀਵਨ-ਚੱਕਰ    | ਸਰਵਿਸ (ਧੁਰਾ A) | ਰੀਲੇ ਬੈਕਐਂਡ (ਧੁਰਾ B) | ਸਿਹਤ          | ਡਿਫਾਲਟ ਪੋਰਟ |
| ----------- | ------------ | -------------- | -------------------- | ------------- | ----------- |
| `ts`        | `in-process` | —              | `ts` (ਨੇਟਿਵ)         | —             | —           |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`   | `/health`     | —           |
| `cliproxy`  | `supervised` | `cliproxy`     | — (ਪ੍ਰਦਾਤਾ)          | `/v1/models`  | 8317        |
| `9router`   | `supervised` | `9router`      | — (ਪ੍ਰਦਾਤਾ)          | `/api/health` | 20130       |
| `vibeproxy` | `external`   | —              | — (ਪ੍ਰਦਾਤਾ ਅਡੈਪਟਰ)   | `/v1/models`  | —           |

¹ Bifrost ਨੂੰ ਇੱਕ `supervised` ਐਂਬੈਡਿਡ ਸਰਵਿਸ ਵਜੋਂ ਉੱਨਤ ਕਰਨਾ (`/api/services/bifrost/`
ਤੋਂ ਇੰਸਟਾਲ/ਸ਼ੁਰੂ ਕਰਨਯੋਗ)
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) ਵਿੱਚ ਟ੍ਰੈਕ ਕੀਤਾ ਗਿਆ ਹੈ; ਇਸਦੇ ਮਰਜ ਹੋਣ ਤੱਕ,
Bifrost ਸਿਰਫ਼ `external` ਹੈ (ਕੇਵਲ `BIFROST_BASE_URL` ਰਾਹੀਂ ਪਹੁੰਚਯੋਗ)।

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ਕਾਲਰਾਂ ਨੂੰ
ਹਰੇਕ id ਲਈ ਸ਼ਾਖਾਵਾਂ ਹਾਰਡ-ਕੋਡ ਕਰਨ ਦੀ ਬਜਾਏ ਕਿਸੇ ਇੰਜਣ ਦੀਆਂ ਅਸਲ ਸਮਰੱਥਾਵਾਂ ਦੇ ਆਧਾਰ 'ਤੇ
ਫਿਲਟਰ ਕਰਨ ਦਿੰਦੀਆਂ ਹਨ।

## ਧੁਰਾ A — ਐਂਬੈੱਡ ਕੀਤੀਆਂ ਸੇਵਾਵਾਂ (ਨਿਗਰਾਨੀ ਅਧੀਨ ਪ੍ਰਕਿਰਿਆ ਵਾਲਾ ਪਾਸਾ)

- **ਨਿਗਰਾਨੀ ਅਧੀਨ ਪ੍ਰਕਿਰਿਆਵਾਂ ਦੀ ਰਜਿਸਟਰੀ:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ਮੌਜੂਦਾ ਸਮੇਂ: `9router`, `cliproxy`)।
- **ਲਾਈਫਸਾਈਕਲ ਮਾਲਕ:** `src/lib/services/ServiceSupervisor.ts` — `start()` ਚਾਈਲਡ
  ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸਪੌਨ ਕਰਦਾ ਹੈ, `waitForHealthy()` ਉੱਤੇ ਗੇਟ ਕਰਦਾ ਹੈ ਅਤੇ stdout/stderr ਨੂੰ ਇੱਕ ਰਿੰਗ ਬਫ਼ਰ ਵਿੱਚ ਟੈਪ ਕਰਦਾ ਹੈ;
  `stop()` SIGTERM→SIGKILL; ਸਭ ਕੁਝ ਇੱਕ ਲੌਕ ਹੇਠ ਕ੍ਰਮਵਾਰ ਚਲਾਇਆ ਜਾਂਦਾ ਹੈ।
- **ਸਟੇਟ ਯੂਨੀਅਨ** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, ਨਾਲ ਹੀ ਇੱਕ
  ਸੁਤੰਤਰ `HealthState = healthy | unhealthy | unknown`।
- **ਇੱਕ ਵੱਖਰੀ ਪ੍ਰਕਿਰਿਆ ਕਿਉਂ (in-proc SDK ਕਿਉਂ ਨਹੀਂ)?** ਪ੍ਰਕਿਰਿਆ ਅਲੱਗਾਵ ਹੀ ਹਰ
  ਸਾਈਡਕਾਰ ਲਈ install/start/stop/health/logs ਨੂੰ ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ ਨਿਯੰਤਰਿਤ ਕਰਨ ਯੋਗ ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ
  loopback spawn-guard ਨੂੰ ਲਾਗੂ ਹੋਣ ਦਿੰਦਾ ਹੈ। ਇੱਕ in-proc ਅਡੈਪਟਰ ਦਾ ਮਾਡਲ ਬਣਾਉਣਾ ਭਵਿੱਖ ਦਾ ਕੰਮ ਹੈ —
  `native-hot-path` ਸਮਰੱਥਾ ਫਲੈਗ ਉਹ ਥਾਂ ਹੈ ਜਿੱਥੇ ਇਸਨੂੰ ਦਰਸਾਇਆ ਜਾਵੇਗਾ।

### ਲਾਈਫਸਾਈਕਲ ਰੂਟ ਇਕਰਾਰਨਾਮਾ (`/api/services/<tool>/…`)

ਸਟੇਟਸ ਕੋਡ **ਡਿਜ਼ਾਈਨ ਅਨੁਸਾਰ state/verb/path-ਵਿਸ਼ੇਸ਼ ਹਨ** — ਇਹ ਇਕਰਾਰਨਾਮਾ ਹੈ, ਕੋਈ
ਅਸੰਗਤਤਾ ਨਹੀਂ:

| ਕਾਲ                          | ਸ਼ਰਤ                             | ਸਟੇਟਸ                                |
| ---------------------------- | -------------------------------- | ------------------------------------ |
| `POST .../start`             | ਸੇਵਾ `not_installed` ਹੈ          | **409** (ਪੂਰਵ-ਸ਼ਰਤ)                  |
| `POST .../stop`              | ਪਹਿਲਾਂ ਹੀ ਰੁਕੀ ਹੋਈ               | **200** (idempotent no-op)           |
| `GET .../status`             | ਠੀਕ                              | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | ਸਪੌਨ ਅਸਫਲਤਾ                      | **503** (ਅਸਥਾਈ)                      |
| `GET .../status`, `.../stop` | ਨਾ-ਫੜੀ ਗਈ ਗਲਤੀ                   | **500**                              |
| `GET /api/services/<x>/logs` | ਅਣਜਾਣ ਟੂਲ `<x>`                  | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` ਗੈਰਹਾਜ਼ਰ | **403** (ਸਿਰਫ਼ 9router)              |
| **ਕੋਈ ਵੀ** `/api/services/*` | ਕਾਲਰ loopback/private-LAN ਨਹੀਂ   | **403 LOCAL_ONLY**                   |

ਸਾਰੀਆਂ ਗਲਤੀ ਬਾਡੀਆਂ `createErrorResponse()` ਦੁਆਰਾ ਇਸ ਰੂਪ ਵਿੱਚ ਬਣਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ →
`{ error: { message, type }, requestId }`, ਜਿੱਥੇ `type` ਸਟੇਟਸ ਤੋਂ ਪ੍ਰਾਪਤ ਹੁੰਦਾ ਹੈ
(`500→server_error`, `404→not_found`, `409→conflict`, ਨਹੀਂ ਤਾਂ `invalid_request`) ਅਤੇ ਇਹ
ਮਸ਼ੀਨ ਦੁਆਰਾ ਕਾਰਵਾਈਯੋਗ ਭੇਦਕ ਹੈ। ਸੁਨੇਹੇ ਪਹਿਲਾਂ ਹੀ ਸੈਨੀਟਾਈਜ਼ ਕੀਤੇ ਜਾਂਦੇ ਹਨ
(`sanitizeErrorMessage()`, ਸਖ਼ਤ ਨਿਯਮ #12)।

**loopback guard** ਇੱਕ `403` ਦਾ ਸਭ ਤੋਂ ਆਮ ਸਰੋਤ ਹੈ: `/api/services/`,
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ਵਿੱਚ ਹੈ ਅਤੇ
`src/server/authz/policies/management.ts` ਕਿਸੇ ਵੀ non-loopback / non-private-LAN
ਕਾਲਰ ਨੂੰ **ਪ੍ਰਮਾਣੀਕਰਨ ਤੋਂ ਪਹਿਲਾਂ** ਰੱਦ ਕਰਦਾ ਹੈ, ਕਿਉਂਕਿ ਇਹ ਰੂਟ ਚਾਈਲਡ ਪ੍ਰਕਿਰਿਆਵਾਂ ਸਪੌਨ ਕਰਦੇ ਹਨ (ਸਖ਼ਤ ਨਿਯਮ 15
ਅਤੇ 17)। ਕਿਸੇ ਜਨਤਕ ਟਨਲ ਰਾਹੀਂ ਇਨ੍ਹਾਂ ਤੱਕ ਪਹੁੰਚਣ 'ਤੇ ਡਿਜ਼ਾਈਨ ਅਨੁਸਾਰ `403` ਮਿਲਦਾ ਹੈ।

## ਧੁਰਾ B — ਰੀਲੇ ਰੂਟਿੰਗ ਬੈਕਐਂਡ (ਡਿਸਪੈਚ ਵਾਲਾ ਪਾਸਾ)

ਕੇਵਲ ਰੀਲੇ ਪ੍ਰੌਕਸੀ ਪਾਥ `/api/v1/relay/chat/completions` ਹੀ ਇੱਕ ਡਿਸਪੈਚ
ਬੈਕਐਂਡ ਚੁਣਦਾ ਹੈ; ਮੁੱਖ `/api/v1/chat/completions` ਸਰਫੇਸ ਕਦੇ ਵੀ
`routingBackend.ts` ਨਾਲ ਸਲਾਹ ਨਹੀਂ ਕਰਦੀ।

- **ਚੋਣ** (`resolveRelayRoutingBackend`): ਇੱਕੋ ਗਲੋਬਲ env ਟੌਗਲ —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}।
  ਜੇ ਸੈੱਟ ਨਾ ਹੋਵੇ, ਤਾਂ Bifrost ਦੇ ਸੰਰਚਿਤ+ਸਮਰੱਥ ਹੋਣ 'ਤੇ `auto`, ਨਹੀਂ ਤਾਂ `ts`।
- **ਵਿਵਹਾਰ:**
  - `bifrost` (ਜ਼ਬਰਦਸਤੀ): Bifrost ਅਸਫਲਤਾ → ਸਖ਼ਤ `502`, ਕੋਈ fallback ਨਹੀਂ।
  - `auto`: Bifrost ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ; ਅਸਫਲਤਾ/cooldown ਉੱਤੇ ਚੁੱਪਚਾਪ native ਵੱਲ ਚਲੇ ਜਾਓ।
  - `ts` / fallback ਤੋਂ ਬਾਅਦ: native `open-sse` ਅਨੁਵਾਦਕ/ਐਗਜ਼ੀਕਿਊਟਰ ਪਾਈਪਲਾਈਨ।
- **Cooldown:** `bifrostCooldown.ts` ਵਿੱਚ ਪ੍ਰਤੀ-`baseUrl` ਅਸਫਲਤਾ cooldown।

ਅੱਜ ਰੀਲੇ ਪੱਧਰ 'ਤੇ ਚੋਣ **ਪੂਰੀ ਤਰ੍ਹਾਂ ਜਾਂ ਬਿਲਕੁਲ ਨਹੀਂ** ਹੈ — `release/v3.8.43` ਉੱਤੇ ਕੋਈ ਪ੍ਰਤੀ-provider
ਜਾਂ ਪ੍ਰਤੀ-request ਇੰਜਣ ਤਬਦੀਲੀ ਨਹੀਂ ਹੈ। ਪ੍ਰਤੀ-request ਗੇਟ ਨੂੰ sidecar-manifest ਕੰਮ ਦੁਆਰਾ ਜੋੜਿਆ ਜਾ ਰਿਹਾ ਹੈ
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ਜੋ `auto` ਨੂੰ ਕੇਵਲ manifest-ਯੋਗ providers ਨੂੰ Bifrost ਰਾਹੀਂ ਰੂਟ ਕਰਨ ਦਿੰਦਾ ਹੈ।

## ਡੈਸ਼ਬੋਰਡ ਇੰਟੀਗ੍ਰੇਸ਼ਨ

ਸੇਵਾਵਾਂ ਦਾ ਡੈਸ਼ਬੋਰਡ `src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` ਰਾਹੀਂ ਹਰ 5 ਸਕਿੰਟਾਂ ਬਾਅਦ `GET /api/services/<tool>/status` ਨੂੰ ਪੋਲ ਕਰਦਾ ਹੈ, ਜੋ `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` ਵਾਪਸ ਕਰਦਾ ਹੈ। ਕੋਈ ਸਾਂਝਾ availability-context ਪ੍ਰੋਵਾਈਡਰ ਨਹੀਂ ਹੈ —
ਹਰੇਕ ਕੰਪੋਨੈਂਟ ਹਰ ਟੂਲ ਲਈ ਹੁੱਕ ਨੂੰ ਕਾਲ ਕਰਦਾ ਹੈ। `!res.ok` ਹੋਣ 'ਤੇ, ਹੁੱਕ ਇਸ ਵੇਲੇ ਸਿਰਫ਼
`HTTP <status>` ਦਿਖਾਉਂਦਾ ਹੈ; `error.type` ਫੀਲਡ ਨੂੰ ਮਨੁੱਖੀ ਤੌਰ 'ਤੇ ਸਮਝ ਆਉਣ ਵਾਲੀ ਵਿਆਖਿਆ ਨਾਲ ਮੈਪ ਕਰਨਾ ਇੱਕ
ਟਰੈਕ ਕੀਤਾ ਗਿਆ UX ਸੁਧਾਰ ਹੈ, ਕਾਂਟ੍ਰੈਕਟ ਵਿੱਚ ਤਬਦੀਲੀ ਨਹੀਂ।

## ਨਤੀਜੇ

- ਨਵੇਂ ਇੰਜਣ `ROUTER_BACKENDS` ਵਿੱਚ ਇੱਕ ਵਾਰ ਰਜਿਸਟਰ ਹੁੰਦੇ ਹਨ; ਖਪਤਕਾਰ ਬਿਨਾਂ ਨਵੀਆਂ ਪ੍ਰਤੀ-id ਬ੍ਰਾਂਚਾਂ ਦੇ capability
  ਕਵੇਰੀਆਂ ਰਾਹੀਂ ਉਨ੍ਹਾਂ ਤੱਕ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਕਰਦੇ ਹਨ।
- "ਕੀ ਇਹ ਇੱਕ ਸੇਵਾ ਹੈ ਜਾਂ ਰਾਊਟਿੰਗ ਬੈਕਐਂਡ?" ਦਾ ਜਵਾਬ `lifecycle` ਫੀਲਡ ਦੁਆਰਾ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ, ਨਾ ਕਿ
  ਇਸ ਆਧਾਰ 'ਤੇ ਕਿ ਕੋਈ id ਸੰਯੋਗਵਸ਼ ਕਿਸ ਸੂਚੀ ਵਿੱਚ ਦਿਖਾਈ ਦਿੰਦੀ ਹੈ।
- Bifrost ਨਿਗਰਾਨੀ (#5817) ਅਤੇ ਮੂਲ hot-path ਮਾਈਗ੍ਰੇਸ਼ਨ (#5670), ਹਰ sidecar ਲਈ ਵਿਸ਼ੇਸ਼ ਕੇਸ ਬਣਾਉਣ ਦੀ ਬਜਾਏ,
  ਇਸ ਸਾਂਝੇ ਕਾਂਟ੍ਰੈਕਟ ਉੱਤੇ ਨਿਰਮਿਤ ਹੁੰਦੇ ਹਨ।
