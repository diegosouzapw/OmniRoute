# Embedded Services (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Bersyon:** v3.8.44
> **Huling na-update:** 2026-07-03
> **Mambabasa:** Mga engineer na nagdaragdag, nagpapanatili, o nagde-debug ng mga naka-embed na serbisyo (9Router, CLIProxyAPI, Mux, Bifrost).

Ang mga naka-embed na serbisyo ay mga lokal na naka-install na process sidecar tool na ini-install, pinangangasiwaan, at
inilalantad ng OmniRoute bilang mga pangunahing target sa pagruruta. Hindi tulad ng mga external provider (na ina-access sa internet
gamit ang mga API key), tumatakbo ang mga naka-embed na serbisyo sa parehong machine kung saan tumatakbo ang OmniRoute at nakikipag-ugnayan sa pamamagitan ng loopback.

---

## Talaan ng mga Nilalaman

1. [Pangkalahatang-ideya](#1-overview)
2. [Arkitektura — 4 na layer](#2-architecture--4-layers)
3. [State machine ng lifecycle](#3-lifecycle-state-machine)
4. [Sanggunian ng API](#4-api-reference)
5. [Seguridad](#5-security)
6. [Pagdaragdag ng bagong naka-embed na serbisyo](#6-adding-a-new-embedded-service)
7. [Pag-troubleshoot](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. Pangkalahatang-ideya

### Bakit gumagamit ng mga naka-embed na serbisyo?

Limang serbisyo ang naka-embed:

| Serbisyo        | npm package                                | Default na port | Layunin                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------ | :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **9Router**     | `9router`                                  |      20130      | AI router na magagamit ng OmniRoute bilang sub-provider. Inilalantad ang mga model bilang `9router/{sub}/{model}`                                                                                                        |
| **CLIProxyAPI** | Binary mula sa GitHub release (`cliproxy`) |      8317       | Lokal na proxy adapter para sa mga daloy ng pag-authenticate ng Anthropic CLI. Nagbibigay ng fallback na pagruruta kapag nag-expire ang mga OAuth token                                                                  |
| **Mux**         | `mux` (headless na `mux server`)           |      8322       | Lokal na daemon para sa pag-oorkestra ng agent (coder/mux). Lifecycle-managed lamang — hindi isang target sa pagruruta (walang LLM proxying).                                                                            |
| **Bifrost**     | `@maximhq/bifrost`                         |      8080       | Go AI-gateway relay backend. Kapag tumatakbo, awtomatikong pinipili ng relay route (`/v1/relay/`)                                                                                                                        |
| **Dario**       | `@askalf/dario`                            |      3456       | Proxy ng subscription sa Claude — alternatibo/failover sa CLIProxyAPI para sa traffic na nakaayon sa Claude Code; ang ini-inject na key ay nagiging `DARIO_ADMIN_TOKEN` na kumokontrol sa `/admin/*` OAuth control plane |

Sinusunod ng lahat ng lima ang parehong modelo ng pangangasiwa:

- Ini-install sila ng OmniRoute sa ilalim ng `DATA_DIR/services/{name}/` (nakahiwalay sa sariling `package.json` ng OmniRoute)
- Sinisimulan at sinusubaybayan sila ng OmniRoute bilang mga child process
- Nag-i-inject ang OmniRoute ng pansamantalang API key sa environment ng child at iniikot ito nang walang downtime (kung naaangkop)
- Ang lahat ng management route (`/api/services/*`) ay **LOCAL_ONLY** — maa-access lamang mula sa loopback (mahigpit na panuntunan #17)

### Mga pangunahing pasya (mula sa plano ng disenyo)

| Pasya                                       | Halaga                                                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Access ng dashboard sa native UI ng 9Router | Reverse proxy sa `/dashboard/providers/services/9router/embed/*`                                           |
| Mekanismo ng pag-install                    | `npm install {package}` sa pamamagitan ng `execFile` (walang shell interpolation)                          |
| Mode ng paggamit                            | Provider na nakarehistro bilang `9router/{sub}/{model}` sa routing engine                                  |
| Pamamahala ng API key                       | Bumubuo ang OmniRoute, nag-e-encrypt habang nakaimbak (AES-256-GCM), at nag-i-inject sa pamamagitan ng env |
| Lokasyon ng dashboard                       | `/dashboard/providers/services` (tatlong tab)                                                              |
| Awtomatikong pagsisimula                    | Toggle para sa bawat serbisyo, default na OFF                                                              |

---

## 2. Arkitektura — 4 na patong

```
┌────────────────────────────────────────────────────────────────────┐
│  Patong 1 — UI                                                     │
│  /dashboard/providers/services  (mga tab: CLIProxyAPI | 9Router | Mux)│
│  Mga live na log (SSE), Start/Stop/Restart/Update, Mga Setting, Pag-install│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Shell + pagruruta ng tab ayon sa ?tab=│
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Patong 2 — API (LOCAL_ONLY — loopback lamang)                     │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (reverse HTTP + WebSocket proxy → 9Router upstream)             │
│                                                                    │
│  Harang: kasama sa LOCAL_ONLY_API_PREFIXES ang "/api/services/" at │
│          "/dashboard/providers/services/*/embed/"                  │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ mga tawag sa loob ng proseso
┌──────────────────────▼─────────────────────────────────────────────┐
│  Patong 3 — ServiceSupervisor (src/lib/services/)                  │
│                                                                    │
│  ServiceSupervisor.ts   Pangkalahatang supervisor (child_process.spawn)│
│    ├── pag-install: execFile('npm', ['install', pkg, '--prefix'])  │
│    ├── pagsisimula: spawn(node, [entrypoint], {env, cwd})          │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 para sa 9Router (maaaring i-configure)    │
│    ├── mga log:    stdio ring buffer na 5 MB → mga SSE event       │
│    ├── health:     HTTP GET /health bawat 2–5 s, lazy recovery     │
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Bina-bootstrap ang lahat ng SERVICES[] sa pagsisimula ng proseso│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Pana-panahong GET /v1/models → service_models table│
│  ringBuffer.ts      Paikot na buffer ng log (5 MB bawat serbisyo)  │
│  healthCheck.ts     Paulit-ulit na HTTP health probe               │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (mga adapter ng installer)                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-compatible na HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Patong 4 — Provider / Pagruruta                                   │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Muling kinukuha ang port at API key sa bawat request (walang caching).│
│    Tinatanggal ang prefix na "9router/" sa model id bago i-proxy.  │
│    Nagbabalik ng 503 service_not_running kung wala sa "running" ang supervisor.│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entry para sa "9router": isEmbeddedService: true                │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Iniimbak ang mga model bilang "9router/{sub}/{model}" (may prefix).│
│    Sini-sync bawat 5 min ng modelSync.ts.                          │
│                                                                    │
│  Ang Mux ay lifecycle-managed LAMANG (mga Patong 1-3) — isa itong  │
│  daemon para sa orkestrasyon ng agent, hindi LLM proxy, kaya wala  │
│  itong executor/provider entry sa Patong 4 at hindi kailanman      │
│  nagiging target ng pagruruta.                                     │
└────────────────────────────────────────────────────────────────────┘
```

### Mahahalagang source file

| File                                        | Tungkulin                                                       |
| ------------------------------------------- | --------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Pangunahing class: lifecycle, lock, health, ring buffer         |
| `src/lib/services/bootstrap.ts`             | Pagpaparehistro sa antas ng proseso at awtomatikong pagsisimula |
| `src/lib/services/registry.ts`              | Singleton map na `tool → supervisor`                            |
| `src/lib/services/apiKey.ts`                | Pagbuo ng key, AES-256-GCM encryption habang nakaimbak          |
| `src/lib/services/modelSync.ts`             | Pana-panahong model sync (5 min) + kapag hiniling               |
| `src/lib/services/ringBuffer.ts`            | 5 MB circular log buffer na may SSE subscribe                   |
| `src/lib/services/healthCheck.ts`           | HTTP health probe (maaaring i-configure ang interval)           |
| `src/lib/services/installers/ninerouter.ts` | npm install/update/uninstall para sa 9Router                    |
| `src/lib/services/installers/cliproxy.ts`   | npm install/update/uninstall para sa CLIProxyAPI                |
| `src/lib/services/installers/mux.ts`        | npm install/update/uninstall para sa Mux                        |
| `src/app/api/services/9router/_lib.ts`      | `getOrInitSupervisor()` helper                                  |
| `src/app/api/services/[name]/logs/route.ts` | Nakabahaging endpoint ng mga SSE log                            |
| `open-sse/executors/ninerouter.ts`          | Provider executor (Layer 4)                                     |

---

## 3. State machine ng lifecycle

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
             maayos ang health probe│         pag-crash / SIGTERM│
                               ┌────▼─────┐  (exit sa loob ng 5s)│
                               │ running  │──── pag-crash ──────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Iniimbak ang mga state sa DB table na `version_manager` (`status` column) at sinasalamin
sa in-memory state ng `ServiceSupervisor`. Ang in-memory state ang awtoritatibo para sa
isang tumatakbong proseso; ang DB state ang matibay na fallback sa pag-boot.

### Mga transition ng state

| Mula            | Event                                         | Patungo                        |
| --------------- | --------------------------------------------- | ------------------------------ |
| `not_installed` | matagumpay ang `install()`                    | `stopped`                      |
| `stopped`       | tinawag ang `start()`                         | `starting`                     |
| `starting`      | nagbalik ng 200 ang health probe              | `running`                      |
| `starting`      | nag-exit ang proseso bago maging healthy      | `error`                        |
| `running`       | tinawag ang `stop()`                          | `stopping` → `stopped`         |
| `running`       | hindi inaasahang nag-exit ang proseso (< 5 s) | `error` (mabilis na pag-crash) |
| `running`       | hindi inaasahang nag-exit ang proseso (> 5 s) | `error`                        |
| `error`         | tinawag ang `start()`                         | `starting`                     |
| anuman          | `stop()` habang `stopping`                    | walang gagawin                 |

### Lock ng operasyon

Isinasagawa ng `ServiceSupervisor` nang sunod-sunod ang mga lifecycle operation sa pamamagitan ng async operation lock
(`withLock()`). Kapag sabay na tinawag ang `start()` sa iisang supervisor, eksaktong
isang proseso lamang ang isa-spawn; maghihintay ang ikalawang caller at ibabalik nito ang kasalukuyang status. Pinipigilan nito
ang mga race condition kapag, halimbawa, sabay na na-trigger ang auto-start at isang UI button.

---

## 4. Sanggunian ng API

Ang lahat ng route sa ilalim ng `/api/services/` ay **LOCAL_ONLY** (loopback lamang, mahigpit na panuntunan #17).
Makakatanggap ang mga non-loopback request ng `403 LOCAL_ONLY` anuman ang auth token.

### 4.1 Mga endpoint ng 9Router (11 route)

#### `POST /api/services/9router/install`

I-install ang 9Router mula sa npm. Gumagawa ito ng `DATA_DIR/services/9router/` na may sarili nitong
`package.json` at `node_modules/`. Hindi ito sumasalungat sa sariling mga dependency ng OmniRoute.

**Body ng request** (opsyonal ang lahat):

```json
{ "version": "latest" }
```

| Field     | Uri      | Default    | Paglalarawan                           |
| --------- | -------- | ---------- | -------------------------------------- |
| `version` | `string` | `"latest"` | npm version tag o semver na ii-install |

**Mga response:**

| Status | Paglalarawan                                                                     |
| ------ | -------------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                           |
| `400`  | Di-wastong body ng request (kabiguan sa Zod validation)                          |
| `409`  | Kasalukuyan nang nag-i-install (hawak ang lock)                                  |
| `500`  | Nabigo ang npm install — tingnan ang `message` para sa madaling maunawaang error |

**Mga tala:** Gumagamit ng `execFile('npm', [...])` — walang shell, walang interpolation (mahigpit na panuntunan #13).
Ipinapakita ang mga EACCES error bilang madaling maunawaang mga mensahe.

---

#### `POST /api/services/9router/start`

Simulan ang 9Router. Nagrerehistro ng supervisor kung hindi pa ito nakarehistro, pagkatapos ay tinatawag ang
`supervisor.start()`. Idempotent kapag tumatakbo na.

**Body ng request:** wala

**Mga response:**

| Status | Paglalarawan                                                        |
| ------ | ------------------------------------------------------------------- |
| `200`  | `ServiceStatus` object (tingnan ang schema sa ibaba)                |
| `409`  | Hindi naka-install ang 9Router (`status: "not_installed"`)          |
| `503`  | Nabigo ang pagsisimula (error sa proseso — tingnan ang `lastError`) |

**ServiceStatus schema:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Maayos na ihinto ang 9Router. Nagpapadala ng SIGTERM, naghihintay nang 15 s, pagkatapos ay nagpapadala ng SIGKILL kung tumatakbo pa rin.
Idempotent kapag nakahinto na.

**Body ng request:** wala

**Mga response:**

| Status | Paglalarawan                         |
| ------ | ------------------------------------ |
| `200`  | `ServiceStatus` (state: "stopped")   |
| `503`  | Hindi inaasahang nabigo ang paghinto |

---

#### `POST /api/services/9router/restart`

Katumbas ng `stop()` na sinusundan ng `start()` sa ilalim ng operation lock.

**Body ng request:** wala

**Mga response:** kapareho ng `start` (ibinabalik ang huling `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Ina-update ang 9Router sa mas bagong npm version. Kung tumatakbo ang serbisyo, ihihinto muna ito,
isasagawa ang npm install (ini-install ang mas bagong version sa kasalukuyang lokasyon), at pagkatapos ay
ire-restart ang serbisyo.

**Body ng request** (opsyonal ang lahat):

```json
{ "version": "latest" }
```

**Mga response:**

| Status | Paglalarawan                                                    |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Di-wastong body                                                 |
| `500`  | Nabigo ang npm update                                           |

---

#### `POST /api/services/9router/rotate-key`

Bumubuo ng bagong API key para sa 9Router, ine-encrypt ito habang nakaimbak, at nire-restart ang serbisyo
(kung tumatakbo) upang magamit nito ang bagong key mula sa environment nito. Agad na
pinapawalang-bisa ang lumang key.

**Request body:** wala

**Mga tugon:**

| Status | Paglalarawan                               |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Nabigo ang pag-rotate                      |

**Seguridad:** Hindi kailanman ibinabalik ang bagong key sa tugon (walang pagtagas ng credential).
Iniimbak ito nang naka-encrypt (AES-256-GCM) sa talahanayang `version_manager`.

---

#### `GET /api/services/9router/status`

Ibinabalik ang pinagsamang live + DB status, kabilang ang metadata ng bersyon at preview ng API key.

**Mga tugon:**

| Status | Paglalarawan                 |
| ------ | ---------------------------- |
| `200`  | Tingnan ang schema sa ibaba  |
| `500`  | Nabigo ang pagbasa ng status |

**Schema ng tugon:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

I-toggle ang auto-start flag. Kapag `enabled: true`, awtomatikong magsisimula ang serbisyo
sa susunod na pag-boot ng OmniRoute (kung naka-install ang serbisyo).

**Request body:**

```json
{ "enabled": true }
```

**Mga tugon:**

| Status | Paglalarawan          |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Hindi wastong body    |

---

#### `GET /api/services/9router/logs`

SSE stream ng mga live log mula sa stdout/stderr ring buffer ng 9Router.

**Mga parameter ng query:**

| Param    | Uri       | Default | Paglalarawan                                                          |
| -------- | --------- | ------- | --------------------------------------------------------------------- |
| `tail`   | `integer` | 200     | Dami ng mga makasaysayang linyang unang ipapadala (maximum na 1000)   |
| `filter` | `string`  | wala    | Case-insensitive na substring filter (walang regex — ligtas sa ReDoS) |

**Mga SSE event:**

| Event       | Data        | Paglalarawan                 |
| ----------- | ----------- | ---------------------------- |
| `snapshot`  | `LogLine[]` | Paunang makasaysayang tail   |
| `log`       | `LogLine`   | Linya ng live log            |
| `heartbeat` | `{}`        | Keep-alive tuwing 15 segundo |

**LogLine schema:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Mga tugon:**

| Status | Paglalarawan                                                   |
| ------ | -------------------------------------------------------------- |
| `200`  | `text/event-stream`                                            |
| `400`  | Masyadong mahaba ang parameter na `filter` (> 200 chars)       |
| `404`  | Hindi nahanap ang serbisyo (hindi nakarehistro ang supervisor) |

---

### 4.2 Mga endpoint ng CLIProxyAPI (10 route)

Kapareho ng 9Router ang anyo ng mga endpoint ng CLIProxyAPI maliban sa `rotate-key`, at may dagdag na
`accounts`, `provider-expose` at `auto-restart-adopted`. Tumatanggap na ito ngayon ng
nakalaang data-plane API key na ini-inject sa pag-spawn (`needsApiKey: true` sa
`bootstrap.ts`, ginagamit para sa pag-sync ng modelo); mas kaunti ang mga field na kasama sa `status`.

| Paraan | Path                                | Paglalarawan                             |
| ------ | ----------------------------------- | ---------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | I-install ang CLIProxyAPI mula sa npm    |
| `POST` | `/api/services/cliproxy/start`      | Simulan ang CLIProxyAPI                  |
| `POST` | `/api/services/cliproxy/stop`       | Ihinto ang CLIProxyAPI                   |
| `POST` | `/api/services/cliproxy/restart`    | I-restart ang CLIProxyAPI                |
| `POST` | `/api/services/cliproxy/update`     | Mag-update sa mas bagong bersyon         |
| `GET`  | `/api/services/cliproxy/status`     | Live + DB status (walang `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | I-toggle ang auto-start                  |

Gumagana ang pinagsasaluhang endpoint na `GET /api/services/{name}/logs` (tingnan ang §4.1) para sa lahat ng
apat na serbisyo gamit ang dynamic segment na `[name]`.

---

### 4.3 Mga endpoint ng Mux (8 route)

Kapareho ng CLIProxyAPI ang anyo ng mga endpoint ng Mux — walang route na `rotate-key` sa API
surface (binubuo ang bearer token sa parehong paraan gaya ng sa 9Router sa pamamagitan ng
`getOrCreateApiKey("mux")` at ini-inject sa pamamagitan ng env var na `MUX_SERVER_AUTH_TOKEN`, ngunit
wala pang nakalaang endpoint para sa pag-rotate). Lifecycle-managed lamang ang Mux: hindi tulad ng
9Router, wala itong Layer 4 executor at hindi ito kailanman nirerehistro bilang routing provider.

| Paraan | Path                           | Paglalarawan                                |
| ------ | ------------------------------ | ------------------------------------------- |
| `POST` | `/api/services/mux/install`    | I-install ang Mux mula sa npm (`npm i mux`) |
| `POST` | `/api/services/mux/start`      | Simulan ang Mux (`mux server`)              |
| `POST` | `/api/services/mux/stop`       | Ihinto ang Mux                              |
| `POST` | `/api/services/mux/restart`    | I-restart ang Mux                           |
| `POST` | `/api/services/mux/update`     | Mag-update sa mas bagong bersyon ng npm     |
| `GET`  | `/api/services/mux/status`     | Live + DB status                            |
| `POST` | `/api/services/mux/auto-start` | I-toggle ang auto-start                     |

---

### 4.4 Mga endpoint ng Bifrost (8 route)

Ang Bifrost ay isang Go AI-gateway relay backend (`@maximhq/bifrost`). Ginagamit nito ang parehong
anyo ng endpoint gaya ng CLIProxyAPI (walang `rotate-key` — pinamamahalaan ng Bifrost ang sarili nitong mga provider
key sa `config.json` sa ilalim ng `-app-dir`).

| Paraan | Path                               | Paglalarawan                                                                 |
| ------ | ---------------------------------- | ---------------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | I-install ang Bifrost mula sa npm (`@maximhq/bifrost`)                       |
| `POST` | `/api/services/bifrost/start`      | Simulan ang Bifrost sa port 8080 (default)                                   |
| `POST` | `/api/services/bifrost/stop`       | Ihinto ang Bifrost                                                           |
| `POST` | `/api/services/bifrost/restart`    | I-restart ang Bifrost                                                        |
| `POST` | `/api/services/bifrost/update`     | Mag-update sa mas bagong bersyon                                             |
| `GET`  | `/api/services/bifrost/status`     | Live + katayuan sa DB                                                        |
| `POST` | `/api/services/bifrost/auto-start` | I-toggle ang awtomatikong pagsisimula                                        |
| `GET`  | `/api/services/bifrost/logs`       | SSE log tail (sa pamamagitan ng nakabahaging dynamic route na `[name]/logs`) |

**Pagkakawing ng routing:** Kapag hindi nakatakda ang `BIFROST_BASE_URL` at tumatakbo ang pinangangasiwaang instance ng Bifrost,
awtomatikong ginagamit ng `getBifrostRoutingConfig()` (sa `routingBackend.ts`) ang
`http://127.0.0.1:{port}` bilang relay base URL. Palaging inuuna ang tahasang itinakdang
`BIFROST_BASE_URL` env.

---

### 4.5 Mga endpoint ng Dario (12 route)

Parehong lifecycle structure tulad ng iba pang mga serbisyo (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`) kasama ang isang token-gated na OAuth
control plane sa ilalim ng `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (lahat ay protektado ng `DARIO_ADMIN_TOKEN`).

### 4.6 Reverse proxy (embed ng dashboard ng 9Router)

Ini-embed ng dashboard ang web UI ng 9Router sa loob ng iframe sa pamamagitan ng internal na reverse
proxy sa:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Ang proxy na ito ay:

- Nagpapasa ng request sa `http://127.0.0.1:{port}/{path}` (loopback lamang)
- Nag-aalis ng mga papasok na `cookie` at `authorization` header (walang pagtagas ng session ng OmniRoute)
- Nag-i-inject ng `Authorization: Bearer {apiKey}` para sa authentication ng 9Router
- Nag-aalis ng `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` mula sa response
- Nire-rewrite ang mga HTML response upang mag-inject ng `<base href>` at gawing pare-pareho ang mga absolute path (`/foo` → `/dashboard/.../embed/foo`)

Ang mga WebSocket upgrade para sa naka-embed na dashboard ay pinangangasiwaan ng isang companion server sa isang
nakalaang port (tingnan ang `src/lib/services/embedWsProxy.ts`).

**Seguridad:** Ang mga route ng embed proxy ay inuuri sa ilalim ng `LOCAL_ONLY_API_PREFIXES`
at maa-access lamang mula sa loopback. Ang isang attacker na makakuha ng JWT sa pamamagitan ng
Cloudflare/Ngrok tunnel ay hindi makakapag-proxy papunta sa mga naka-embed na serbisyo.

---

## 5. Seguridad

### Pagpapatupad ng LOCAL_ONLY (mahigpit na tuntunin #17)

Ang lahat ng route sa ilalim ng `/api/services/` at `/dashboard/providers/services/*/embed/` ay
inuuri bilang LOCAL_ONLY sa `src/server/authz/routeGuard.ts`. Ang loopback check ay
palaging isinasagawa bago ang anumang sangay ng auth:

```
dumarating ang request
  → isLocalOnlyPath(path)?
      → hindi loopback → 403 LOCAL_ONLY (palagi, bago ang auth check)
      → loopback       → magpatuloy sa karaniwang auth
```

Pinipigilan nito ang isang na-leak na JWT (hal., sa pamamagitan ng tunnel) na mag-trigger ng `npm install` o
pag-spawn ng process. Tingnan ang `docs/security/ROUTE_GUARD_TIERS.md` para sa kumpletong tier
matrix.

### Pag-inject ng API key

Nangangailangan ang 9Router at Mux ng API key/bearer token para sa sarili nilang mga HTTP endpoint.
Ang OmniRoute ay:

1. Gumagawa ng key sa pamamagitan ng `crypto.randomBytes(32).toString("base64url")` na may
   prefix na partikular sa serbisyo (`nr_` para sa 9Router, `mx_` para sa Mux).
2. Ini-encrypt ito habang nakaimbak gamit ang AES-256-GCM (ang parehong cipher na ginagamit para sa mga credential ng provider).
3. Dini-decrypt at ini-inject ito bilang environment variable sa oras ng pag-spawn —
   `NINEROUTER_API_KEY` para sa 9Router, `MUX_SERVER_AUTH_TOKEN` para sa Mux (hindi kailanman bilang CLI
   flag, kaya hindi kailanman lumalabas ang token sa `ps`/mga listahan ng process).
4. Hindi kailanman ibinabalik ang plaintext key sa anumang HTTP response.

Tumatanggap ang CLIProxyAPI ng nakalaang data-plane key na ini-inject sa oras ng pag-spawn
(`needsApiKey: true` — ginagamit para sa pag-sync ng model laban sa adapter).

### Depensa laban sa SSRF

Ang reverse HTTP proxy (`/dashboard/.../embed/[...path]`) ay hardcoded upang mag-forward
lamang sa `http://127.0.0.1:{port}`. Hindi ito kailanman sumusunod sa mga redirect patungo sa mga
destinasyong hindi loopback. Ginagamit ang library na `ssrf-req-filter` upang tanggihan ang anumang upstream URL na
nagre-resolve sa labas ng loopback range.

### Kaligtasan ng shell (mahigpit na tuntunin #13)

Ang `npm install` ay tinatawag sa pamamagitan ng `execFile('npm', ['install', pkg, '--prefix', dir])` —
walang template literals, walang shell, at walang interpolation ng mga external path sa command
string. Ang mga runtime value (mga port, API key) ay ipinapasa sa pamamagitan ng `env` object ng child.

### Pag-sanitize ng error (mahigpit na tuntunin #12)

Ang lahat ng error response mula sa `/api/services/*` ay dumadaan sa `buildErrorBody()` o
`sanitizeErrorMessage()`. Ang raw na `err.stack` at `err.message` ay hindi kailanman ibinabalik
nang verbatim sa tumatawag.

---

## 6. Pagdaragdag ng bagong naka-embed na serbisyo

Sundin ang 8 hakbang na ito. Basahin ang mga kasalukuyang implementation sa `src/lib/services/installers/`
at `src/app/api/services/` bilang kanonikal na sanggunian.

### Hakbang 1 — Gumawa ng installer

Gumawa ng `src/lib/services/installers/{name}.ts` na nakabatay sa `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // pumili ng libreng port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Gamitin ang `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` mula sa `installers/utils.ts`
— huwag kailanman gumamit ng `execSync` o shell interpolation.

### Hakbang 2 — Irehistro sa bootstrap

Magdagdag ng `ServiceEntry` sa `SERVICES` array sa `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false kung hindi kailangan ang API key
}
```

Palawakin ang `buildSpawnArgsFactory()` upang pangasiwaan ang `cfg.tool === "myservice"`.

#### Pluggable na kontrata ng provider-plugin (Phase 1, #7333)

Ang `src/lib/services/providerPlugins/` ay nagpapakilala ng kontratang `ServiceProviderPlugin` na
nagsasama sa mga field ng `ServiceEntry` sa `bootstrap.ts` ng isang backend at sa mga
manifest-template field ng `serviceBackends.ts` sa iisang object, sa halip na magkahiwalay na
ipahayag ang hugis ng parehong backend sa dalawang hindi magkaugnay na file. Sa oras ng pagsulat nito, **`9router` lamang ang
na-migrate** — kinukuha ng `bootstrap.ts` ang entry nito sa `SERVICES[]` mula sa
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
at nagti-trigger ng startup error kung mawawala ang plugin. Ang `cliproxy`, `mux`, at `bifrost`
ay nananatili sa mga dati nang inline na literal ng `SERVICES[]` nang walang pagbabago.

Nagdagdag din ang `open-sse/config/providerPluginManifest.ts` ng additive na
helper na `createServiceBackendManifestEntry(pluginId, template)` na bumubuo ng wastong
`ProviderPluginManifestEntry` mula sa isang entry ng `SERVICE_BACKEND_MANIFEST_TEMPLATE` — **hindi**
pa ito nakakonekta sa anumang aktibong request path (maging sa `generateProviderPluginManifestFromRegistry()`
o sa `/v1/providers/[provider]/models`); mananatili itong follow-up kapag napatunayan na ang kontrata
para sa pangalawang backend.

Ipinagpaliban sa mga follow-up PR, na sinusubaybayan sa ilalim ng issue #7333: ang pag-migrate sa `cliproxyapi` sa pamamagitan ng
parehong registry, pag-generalize sa `mux`/`bifrost` sa union na `ServiceBackendPluginId`,
pagsasama sa kontrata ng plugin ng espesyal na pagproseso sa executor-routing (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`), at pagkonekta ng
`createServiceBackendManifestEntry()` sa isang aktibong manifest/models code path.

### Hakbang 3 — Magdagdag ng migration at DB seed

Tiyaking may row ang serbisyo sa `version_manager` sa pamamagitan ng migration sa
`src/lib/db/migrations/`. Dapat taglayin ng row ang:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Hakbang 4 — Gumawa ng 7 API endpoint

Sa ilalim ng `src/app/api/services/{name}/`:

```
_lib.ts            helper na getOrInitSupervisor()
install/route.ts   POST — tinatawag ang installer.install()
start/route.ts     POST — tinatawag ang supervisor.start()
stop/route.ts      POST — tinatawag ang supervisor.stop()
restart/route.ts   POST — tinatawag ang supervisor.restart()
update/route.ts    POST — tinatawag ang installer.update()
status/route.ts    GET  — pinagsasama ang live + DB status
auto-start/route.ts POST — ini-toggle ang auto_start flag
```

Ang nakabahaging route na `GET /api/services/[name]/logs` ay naka-wire na — walang kailangang baguhin doon.

Ipadaan ang lahat ng error response sa `createErrorResponse()` / `buildErrorBody()`.

### Hakbang 5 — Idagdag sa LOCAL_ONLY_API_PREFIXES

Sa `src/server/authz/routeGuard.ts`, tiyaking nakalista na ang `/api/services/`.
Kung magdaragdag ka ng bagong prefix (hal., `/api/tools/`), idagdag ito sa parehong
`LOCAL_ONLY_API_PREFIXES` at, kung naglulunsad ito ng mga proseso, sa `SPAWN_CAPABLE_PREFIXES`.
Magdagdag ng test sa `tests/unit/authz/routeGuard.test.ts`.

### Hakbang 6 — Idagdag ang UI tab

Gumawa ng `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Muling gamitin ang mga nakabahaging component:

- `ServiceStatusCard` — live na estado + badge ng kalusugan
- `ServiceLifecycleButtons` — Simulan / Ihinto / I-restart / I-update
- `ServiceLogsPanel` — SSE log tail (kumokonekta sa `/api/services/{name}/logs`)
- `ApiKeyCard` — ipakita + i-rotate ang key (kung `needsApiKey: true`)

Irehistro ang tab sa `ServicesPageShell.tsx`.

### Hakbang 7 — Idagdag ang provider entry (kung routing target ang serbisyo)

Kung naglalantad ang naka-embed na serbisyo ng OpenAI-compatible na `/v1/chat/completions` endpoint:

1. Magdagdag ng provider entry sa `src/shared/constants/providers.ts` na may `isEmbeddedService: true`.
2. Gumawa ng `open-sse/executors/{name}.ts` na nag-e-extend sa `BaseExecutor`. Hanaping muli ang port at
   API key sa bawat request (huwag kailanman i-cache sa constructor). Magbalik ng `503 service_not_running`
   response kapag ang estado ng supervisor ay hindi `"running"`.
3. Irehistro ang mga model sa `open-sse/config/providerRegistry.ts` gamit ang prefix ng serbisyo
   (hal., `myservice/sub/model`). Pananatilihin itong updated ng `modelSync.ts`.

### Hakbang 8 — Idokumento at i-test

1. I-update ang `docs/frameworks/EMBEDDED-SERVICES.md` (ang file na ito) — idagdag ang serbisyo sa
   talahanayan sa §1 at ang anumang bagong endpoint sa §4.
2. Magdagdag ng mga unit test sa `tests/unit/services/` (lifecycle, installer, hugis ng API).
3. Magdagdag ng integration test sa `tests/integration/services/` (sa likod ng `RUN_SERVICES_INT=1`).
4. I-update ang `docs/openapi.yaml` gamit ang mga bagong endpoint.

---

## 7. Pag-troubleshoot

### Hindi nagsisimula ang serbisyo

**Mga sintomas:** Nagbabalik ng 503 ang Start button, at nananatiling `"error"` o `"starting"` ang estado.

**Checklist:**

1. Suriin ang `GET /api/services/{name}/logs` (o ang Logs panel sa dashboard). Hanapin
   ang mga linyang gaya ng `Error: ENOENT`, `address already in use`, o `Cannot find module`.
2. Tiyaking nasa PATH ang `npm`: patakbuhin ang `which npm` mula sa parehong user account na nagpapatakbo sa OmniRoute.
3. Tiyaking naka-install ang serbisyo: suriin ang `GET /api/services/{name}/status` para sa
   `installedVersion`. Kung `null`, patakbuhin muna ang pag-install.
4. Tiyaking umiiral at hindi walang laman ang `DATA_DIR/services/{name}/node_modules/`.
5. Suriin ang field na `lastError` sa tugon ng status para sa nilinis na dahilan ng pag-exit.

---

### Mabagal ang cold start (> 10 s bago maging `running`)

**Mga sintomas:** Nananatiling `"starting"` ang estado nang matagal bago maging `"running"` o `"error"`.

**Paliwanag:** Kasama sa cold start ng 9Router ang pag-import ng malalaking dependency tree (mga module ng DNS,
tunnel, at MITM). Ang default na health interval ay 2 s na may 3 pagtatangka bago
magdeklara ng timeout ang supervisor (ngunit nagpapatuloy ito sa pag-poll).

**Solusyon:** Maaaring i-configure sa `bootstrap.ts` ang `healthIntervalMs` at ang timeout ng `waitForHealthy`
(`healthIntervalMs * 3`). Para sa mga serbisyong mas matagal
magsimula, itaas ang `healthIntervalMs` sa 5000 at ang `stopTimeoutMs` sa 30 000.

---

### Salungatan sa port (`EADDRINUSE`)

**Mga sintomas:** Ipinapakita ng mga log ang `address already in use :::20130`.

**Mga sanhi:**

- Ginagamit na ng ibang proseso ang port 20130.
- Hindi ganap na nahinto ang nakaraang proseso ng 9Router (zombie PID).

**Solusyon:**

1. Baguhin ang default na port sa pamamagitan ng environment variable na `NINEROUTER_PORT` sa `.env`.
2. Hanapin at patayin ang sumasalungat na proseso: `lsof -ti :20130 | xargs kill -9`.
3. Maaaring i-configure ang port para sa bawat serbisyo sa `bootstrap.ts` sa pamamagitan ng field na `port`.

**Tandaan:** Gumagamit ang 9Router ng port 20130 bilang default upang maiwasan ang pagsalungat sa
default na port 20128 ng OmniRoute.

---

### Tinanggihan ang pahintulot (EACCES) sa pag-install

**Mga sintomas:** Nagbabalik ng 500 ang pag-install, at ipinapakita ng mga log ang `EACCES` o `permission denied`.

**Mga sanhi:**

- Hindi masusulatan ng proseso ng OmniRoute ang `DATA_DIR` o ang parent directory nito.
- Tumatakbo sa loob ng rootless Docker nang walang pahintulot na magsulat sa naka-map na volume.

**Solusyon:**

1. Suriin ang `DATA_DIR` (default: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Tiyaking pagmamay-ari ng user ng proseso ng OmniRoute ang directory: `chown -R $USER ~/.omniroute/`
3. Sa Docker, tiyaking may tamang mga pahintulot ang volume mount para sa user ng container.

---

### Nabibigo ang pag-update (`npm install` timeout o error sa network)

**Mga sintomas:** Nagbabalik ng 500 na may `InstallError` ang pag-update, at ipinapakita ng mga log ang network timeout.

**Checklist:**

1. Kumpirmahing naaabot ang npm registry: `npm ping`.
2. Suriin kung may corporate proxy: `npm config get proxy`, `npm config get https-proxy`.
3. Subukang manu-manong i-install: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Kung nasa likod ng air gap, i-download muna ang tarball at gamitin ang `npm install /path/to/tarball.tgz`.

---

### Agad na nagpapakita ang serbisyo ng estadong `"error"` pagkatapos magsimula (mabilis na pag-crash)

**Mga sintomas:** Nagbabago ang estado mula `"starting"` patungong `"error"` sa loob ng wala pang 5 segundo.
Ipinapakita ng `lastError` ang `"Fast crash (exited with code 1)"`.

**Checklist:**

1. Basahin ang buong hulihan ng log: `GET /api/services/{name}/logs?tail=500`.
2. Karaniwang sanhi: nawawalang mga environment variable na inaasahan ng serbisyo.
3. Para sa 9Router: tiyaking kasama ang `NINEROUTER_DISABLE_MITM=true` at
   `NINEROUTER_DISABLE_TUNNEL=true` sa env na ipinapasa sa pag-spawn (tingnan ang
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. FAQ

**T: Maaari ko bang ilantad ang mga endpoint ng naka-embed na serbisyo sa mga client na hindi loopback?**

Hindi. Sinasadya ang LOCAL_ONLY tier (mahigpit na panuntunan #17). Ang mga route na maaaring magpatakbo ng
`npm install` o mag-spawn ng mga prosesong `node` ay hindi dapat ma-access mula sa trapikong hindi loopback,
dahil kung hindi, ang isang na-leak na JWT sa pamamagitan ng tunnel (Cloudflare, Ngrok, Tailscale) ay
magbibigay-daan sa arbitraryong pag-spawn ng proseso. Walang opsyong mag-opt out para sa
`/api/services/` — hindi tulad ng `/api/mcp/`, hindi ito kasama sa listahan ng bypass para sa manage scope.
Tingnan ang `docs/security/ROUTE_GUARD_TIERS.md`.

---

**T: Magiging available ba ang 9Router at CLIProxyAPI sa mga production/cloud deployment?**

Oo. Parehong sinusunod ng dalawang serbisyo ang local-first na modelo ng OmniRoute mismo. Tumatakbo ang mga ito
sa parehong machine at nakikipag-ugnayan sa pamamagitan ng loopback. Ang ibig sabihin ng "Production" dito ay ang VPS
o lokal na server kung saan naka-deploy ang OmniRoute, hindi isang remote na cloud provider.

---

**T: Paano ko ide-debug ang supervisor?**

1. Subaybayan ang SSE log stream: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Suriin ang mga structured log sa pino output ng OmniRoute na na-filter ayon sa
   namespace na `service:supervisor`.
3. Siyasatin ang row sa DB: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Gamitin ang `GET /api/services/9router/status` upang makita sa iisang call ang kasalukuyang live state, PID, health,
   at `lastError`.

---

**T: Ipinapakita ng supervisor ang `health: "degraded"` o `health: "unknown"` ngunit ang state ay `"running"`. Problema ba iyon?**

Ang `"degraded"` ay nangangahulugang nagbalik ang health probe ng tugong hindi 200. Ang `"unknown"` ay nangangahulugang wala pang
natatapos na probe (nagkakasabay sa unang poll). Parehong pansamantala ang mga ito habang nagsisimula.
Kung mananatiling `"degraded"` ang health nang mahigit sa `healthIntervalMs * 3` ms pagkatapos ng
`"running"`, tumatakbo ang naka-embed na serbisyo ngunit hindi tumutugon ang HTTP API nito. Suriin
kung tama ang port sa status response at kung aktuwal na nakikinig ang serbisyo
sa port na iyon.

---

**T: Maaari ko bang baguhin ang API key ng 9Router nang walang buong pag-restart?**

Hindi. Ipinapasa ang API key sa 9Router sa pamamagitan ng environment variable sa oras ng pag-spawn.
Hindi maaaring baguhin ang mga environment variable sa tumatakbong proseso. Awtomatikong pinatitigil at nire-restart ng `POST .../rotate-key`
ang serbisyo upang ilapat ang bagong key. Magkakabisa ang pag-rotate ng key sa loob ng `stopTimeoutMs` ng serbisyo (default na 15 s) kasama ang oras ng
pagsisimula nito.

---

**T: Ano ang limitasyon ng ring buffer at ano ang mangyayari kapag napuno ito?**

May nakalaang 5 MB na ring buffer ang bawat serbisyo. Kapag puno na ang buffer, inaalis ang mga pinakalumang
linya ng log upang magkaroon ng puwang para sa mga bago. Ibinabalik ng SSE event na `snapshot`
ang mga pinakabagong linya na pasok sa limitasyong `tail`. Hindi pine-persist sa disk ang mga log maliban kung
nakatakda ang `logsBufferPath` sa row ng DB.

---

## Tingnan din

- `docs/security/ROUTE_GUARD_TIERS.md` — mga detalye ng LOCAL_ONLY tier
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 pagmamapa ng module ng Mga Naka-embed na Serbisyo
- `docs/architecture/ARCHITECTURE.md` — konteksto sa antas ng system
- `docs/openapi.yaml` — mga machine-readable na depinisyon ng endpoint
- `CLAUDE.md` §"Pagdaragdag ng Bagong Naka-embed na Serbisyo" — checklist para sa mabilisang sanggunian
