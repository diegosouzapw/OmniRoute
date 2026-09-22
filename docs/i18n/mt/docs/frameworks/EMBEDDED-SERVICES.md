# Embedded Services (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Verżjoni:** v3.8.44
> **Aġġornat l-aħħar:** 2026-09-09
> **Udjenza:** Inġiniera li jżidu, iżommu, jew jiddebaggjaw servizzi inkorporati (9Router, CLIProxyAPI, Mux, Bifrost, open-wa).

Is-servizzi inkorporati huma għodod sidecar tal-proċess installati lokalment li OmniRoute jinstalla, jissorvelja u
jesponi bħala miri tar-routing tal-ewwel klassi. Għall-kuntrarju tal-fornituri esterni (li jiġu aċċessati permezz tal-internet
b'ċwievet tal-API), is-servizzi inkorporati jitħaddmu fuq l-istess magna bħal OmniRoute u jikkomunikaw permezz tal-loopback.

---

## Werrej

1. [Ħarsa ġenerali](#1-overview)
2. [Arkitettura — 4 saffi](#2-architecture--4-layers)
3. [Magna tal-istati taċ-ċiklu tal-ħajja](#3-lifecycle-state-machine)
4. [Referenza tal-API](#4-api-reference)
5. [Sigurtà](#5-security)
6. [Żieda ta’ servizz integrat ġdid](#6-adding-a-new-embedded-service)
7. [Soluzzjoni tal-problemi](#7-troubleshooting)
8. [Mistoqsijiet frekwenti](#8-faq)

---

## 1. Ħarsa ġenerali

### Għaliex servizzi integrati?

Hemm sitt servizzi integrati:

| Servizz         | Pakkett npm                                      | Port predefinit | Għan                                                                                                                                                                                                                                            |
| --------------- | ------------------------------------------------ | :-------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                        |      20130      | Router tal-IA li OmniRoute jista’ juża bħala sottoproveditur. Il-mudelli jiġu esposti bħala `9router/{sub}/{model}`                                                                                                                             |
| **CLIProxyAPI** | Binarju tar-rilaxx ta’ GitHub (`cliproxy`)       |      8317       | Adapter proxy lokali għall-flussi ta’ awtentikazzjoni tal-Anthropic CLI. Jipprovdi rotot alternattivi meta jiskadu t-tokens OAuth                                                                                                               |
| **Mux**         | `mux` (`mux server` mingħajr interfaċċa grafika) |      8322       | Daemon lokali għall-orkestrazzjoni tal-aġenti (coder/mux). Tiġi ġestita biss iċ-ċiklu tal-ħajja tiegħu — mhuwiex mira tar-routing (mingħajr proxying tal-LLM).                                                                                  |
| **Bifrost**     | `@maximhq/bifrost`                               |      8080       | Backend relay ta’ gateway tal-IA miktub bil-Go. Meta jkun qed jaħdem, jintgħażel awtomatikament mir-rotta relay (`/v1/relay/`)                                                                                                                  |
| **Dario**       | `@askalf/dario`                                  |      3456       | Proxy għall-abbonament ta’ Claude — alternattiva/failover għal CLIProxyAPI għal traffiku bl-istruttura ta’ Claude Code; iċ-ċavetta injettata ssir `DARIO_ADMIN_TOKEN`, li tirrestrinġi l-aċċess għall-pjan ta’ kontroll OAuth `/admin/*` tiegħu |
| **open-wa**     | `@open-wa/wa-automate`                           |      8323       | Awtomazzjoni ta’ WhatsApp Web (Chromium mingħajr interfaċċa grafika permezz ta’ Puppeteer). Tiġi ġestita biss iċ-ċiklu tal-ħajja tagħha — mhijiex mira tar-routing.                                                                             |

Is-sitt servizzi kollha jsegwu l-istess mudell ta’ superviżjoni:

- OmniRoute jinstallahom taħt `DATA_DIR/services/{name}/` (iżolati mill-`package.json` ta’ OmniRoute stess)
- OmniRoute jniedihom u jimmonitorjahom bħala proċessi sekondarji
- OmniRoute jinjetta ċavetta API temporanja fl-ambjent tal-proċess sekondarju u jdawwarha mingħajr waqfien tas-servizz (fejn applikabbli)
- Ir-rotot kollha tal-ġestjoni (`/api/services/*`) huma **LOCAL_ONLY** — aċċessibbli biss mil-loopback (regola stretta #17)

### Deċiżjonijiet ewlenin (mill-pjan tad-disinn)

| Deċiżjoni                                         | Valur                                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Aċċess tad-dashboard għall-UI nattiva ta’ 9Router | Reverse proxy f’`/dashboard/providers/services/9router/embed/*`                           |
| Mekkaniżmu tal-installazzjoni                     | `npm install {package}` permezz ta’ `execFile` (mingħajr interpolazzjoni tax-shell)       |
| Modalità tal-użu                                  | Il-proveditur jiġi rreġistrat bħala `9router/{sub}/{model}` fil-magna tar-routing         |
| Ġestjoni taċ-ċavetta API                          | OmniRoute jiġġenera, jikkripta waqt il-ħżin (AES-256-GCM), u jinjetta permezz tal-ambjent |
| Post tad-dashboard                                | `/dashboard/providers/services` (tliet tabs)                                              |
| Tnedija awtomatika                                | Swiċċ għal kull servizz, diżattivat b’mod predefinit                                      |

---

## 2. Arkitettura — 4 saffi

```
┌────────────────────────────────────────────────────────────────────┐
│  Saff 1 — UI                                                       │
│  /dashboard/providers/services  (tabs: CLIProxyAPI | 9Router | Mux)│
│  Logs diretti (SSE), Start/Stop/Restart/Update, Settings, Install  │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Qafas + rotta tat-tabs skont ?tab=   │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Saff 2 — API (LOCAL_ONLY — loopback biss)                         │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (proxy invers HTTP + WebSocket → upstream ta’ 9Router)          │
│                                                                    │
│  Kontroll: LOCAL_ONLY_API_PREFIXES jinkludi "/api/services/" u     │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ sejħiet fl-istess proċess
┌──────────────────────▼─────────────────────────────────────────────┐
│  Saff 3 — ServiceSupervisor (src/lib/services/)                    │
│                                                                    │
│  ServiceSupervisor.ts   Superviżur ġeneriku (child_process.spawn)  │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 għal 9Router (konfigurabbli)              │
│    ├── logs:       buffer ċirkolari stdio ta’ 5 MB → avvenimenti SSE│
│    ├── health:     HTTP GET /health kull 2–5 s, irkupru għażżien   │
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Jibda s-SERVICES[] kollha mal-bidu tal-proċess│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       GET /v1/models perjodiku → tabella service_models│
│  ringBuffer.ts      Buffer ċirkolari tal-logs (5 MB għal kull servizz)│
│  healthCheck.ts     Verifika HTTP tas-saħħa permezz ta’ polling    │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (adapters tal-installatur)                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP kompatibbli ma’ OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Saff 4 — Fornitur / Rotot                                         │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Jerġa’ jfittex il-port u ċ-ċavetta API għal kull talba (mingħajr caching).│
│    Ineħħi l-prefiss "9router/" mill-ID tal-mudell qabel il-proxying.│
│    Jirritorna 503 service_not_running jekk is-superviżur mhuwiex fi "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entrata għal "9router": isEmbeddedService: true                 │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Mudelli maħżuna bħala "9router/{sub}/{model}" (bil-prefiss).    │
│    Sinkronizzati kull 5 minuti minn modelSync.ts.                  │
│                                                                    │
│  Mux huwa ġestit BISS tul iċ-ċiklu tal-ħajja (Saffi 1-3) — huwa   │
│  daemon għall-orkestrazzjoni tal-aġenti, mhux proxy LLM, għalhekk  │
│  m’għandu l-ebda entrata ta’ eżekutur/fornitur fis-Saff 4 u qatt  │
│  ma jkun mira tar-rotot.                                           │
└────────────────────────────────────────────────────────────────────┘
```

### Fajls ewlenin tas-sors

| Fajl                                        | Rwol                                                                          |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Klassi ewlenija: ċiklu tal-ħajja, lock, saħħa, ring buffer                    |
| `src/lib/services/bootstrap.ts`             | Reġistrazzjoni fil-livell tal-proċess u bidu awtomatiku                       |
| `src/lib/services/registry.ts`              | Mappa singleton `tool → supervisor`                                           |
| `src/lib/services/apiKey.ts`                | Ġenerazzjoni taċ-ċwievet, kriptaġġ AES-256-GCM waqt il-ħażna                  |
| `src/lib/services/modelSync.ts`             | Sinkronizzazzjoni perjodika tal-mudelli (5 min) + fuq talba                   |
| `src/lib/services/ringBuffer.ts`            | Buffer ċirkolari tar-reġistri ta’ 5 MB b’abbonament SSE                       |
| `src/lib/services/healthCheck.ts`           | Stħarriġ tas-saħħa HTTP (intervall konfigurabbli)                             |
| `src/lib/services/installers/ninerouter.ts` | Installazzjoni/aġġornament/diżinstallazzjoni permezz ta’ npm għal 9Router     |
| `src/lib/services/installers/cliproxy.ts`   | Installazzjoni/aġġornament/diżinstallazzjoni permezz ta’ npm għal CLIProxyAPI |
| `src/lib/services/installers/mux.ts`        | Installazzjoni/aġġornament/diżinstallazzjoni permezz ta’ npm għal Mux         |
| `src/lib/services/installers/openwa.ts`     | Installazzjoni/aġġornament/diżinstallazzjoni permezz ta’ npm għal open-wa     |
| `src/app/api/services/9router/_lib.ts`      | Funzjoni awżiljarja `getOrInitSupervisor()`                                   |
| `src/app/api/services/[name]/logs/route.ts` | Endpoint kondiviż għar-reġistri SSE                                           |
| `open-sse/executors/ninerouter.ts`          | Eżekutur tal-fornitur (Saff 4)                                                |

---

## 3. Magna tal-istati taċ-ċiklu tal-ħajja

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
          is-sonda tas-saħħa ok    │         waqgħa / SIGTERM   │
                               ┌────▼─────┐  (ħruġ fi żmien 5s) │
                               │ running  │──── waqgħa ─────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

L-istati jinħażnu fit-tabella `version_manager` tad-DB (il-kolonna `status`) u jiġu riflessi
fl-istat fil-memorja ta’ `ServiceSupervisor`. L-istat fil-memorja huwa awtoritattiv għal
proċess li jkun qed jaħdem; l-istat tad-DB huwa l-alternattiva persistenti waqt l-ibbutjar.

### Tranżizzjonijiet tal-istat

| Minn            | Avveniment                             | Lejn                    |
| --------------- | -------------------------------------- | ----------------------- |
| `not_installed` | `install()` jirnexxi                   | `stopped`               |
| `stopped`       | tissejjaħ `start()`                    | `starting`              |
| `starting`      | is-sonda tas-saħħa tirritorna 200      | `running`               |
| `starting`      | il-proċess jieqaf qabel ikun b’saħħtu  | `error`                 |
| `running`       | tissejjaħ `stop()`                     | `stopping` → `stopped`  |
| `running`       | il-proċess jieqaf bla mistenni (< 5 s) | `error` (waqgħa rapida) |
| `running`       | il-proċess jieqaf bla mistenni (> 5 s) | `error`                 |
| `error`         | tissejjaħ `start()`                    | `starting`              |
| kwalunkwe       | `stop()` waqt `stopping`               | ebda azzjoni            |

### Lock tal-operazzjonijiet

`ServiceSupervisor` jissekwenzja l-operazzjonijiet taċ-ċiklu tal-ħajja permezz ta’ lock asinkroniku tal-operazzjonijiet
(`withLock()`). Sejħiet konkorrenti lil `start()` fuq l-istess supervisor jirriżultaw eżattament
fi spawn wieħed; it-tieni min isejjaħ jistenna u jirritorna l-istatus eżistenti. Dan jipprevjeni
kundizzjonijiet ta’ tellieqa meta, pereżempju, l-istartjar awtomatiku u buttuna fl-UI jiġu attivati fl-istess ħin.

---

## 4. Referenza tal-API

Ir-rotot kollha taħt `/api/services/` huma **LOCAL_ONLY** (loopback biss, regola stretta #17).
Talbiet mhux minn loopback jirċievu `403 LOCAL_ONLY` irrispettivament mit-token tal-awtentikazzjoni.

### 4.1 Endpoints ta’ 9Router (11-il rotta)

#### `POST /api/services/9router/install`

Jinstalla 9Router minn npm. Joħloq `DATA_DIR/services/9router/` bil-`package.json`
u n-`node_modules/` tiegħu stess. Ma joħloqx kunflitt mad-dipendenzi ta’ OmniRoute stess.

**Korp tat-talba** (kollha fakultattivi):

```json
{ "version": "latest" }
```

| Qasam     | Tip      | Valur predefinit | Deskrizzjoni                                |
| --------- | -------- | ---------------- | ------------------------------------------- |
| `version` | `string` | `"latest"`       | Tag tal-verżjoni npm jew semver x’jinstalla |

**Risposti:**

| Status | Deskrizzjoni                                                |
| ------ | ----------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`      |
| `400`  | Korp tat-talba invalidu (falliment tal-validazzjoni Zod)    |
| `409`  | L-installazzjoni diġà għaddejja (lock miżmum)               |
| `500`  | L-installazzjoni npm falliet — ara `message` għal żball ċar |

**Noti:** Juża `execFile('npm', [...])` — ebda shell, ebda interpolazzjoni (regola stretta #13).
L-iżbalji EACCES jintwerew bħala messaġġi ċari.

---

#### `POST /api/services/9router/start`

Jibda 9Router. Jirreġistra supervisor jekk għadu mhux irreġistrat, imbagħad isejjaħ
`supervisor.start()`. Huwa idempotenti meta jkun diġà qed jaħdem.

**Korp tat-talba:** xejn

**Risposti:**

| Status | Deskrizzjoni                                          |
| ------ | ----------------------------------------------------- |
| `200`  | Oġġett `ServiceStatus` (ara l-iskema hawn taħt)       |
| `409`  | 9Router mhuwiex installat (`status: "not_installed"`) |
| `503`  | Il-bidu falla (żball fil-proċess — ara `lastError`)   |

**Skema ta’ ServiceStatus:**

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

Iwaqqaf lil 9Router b’mod gradwali. Jibgħat SIGTERM, jistenna 15 s, imbagħad SIGKILL jekk ikun għadu attiv.
Huwa idempotenti meta jkun diġà mwaqqaf.

**Korp tat-talba:** xejn

**Risposti:**

| Status | Deskrizzjoni                         |
| ------ | ------------------------------------ |
| `200`  | `ServiceStatus` (state: "stopped")   |
| `503`  | Il-waqfien falla b’mod mhux mistenni |

---

#### `POST /api/services/9router/restart`

Ekwivalenti għal `stop()` segwit minn `start()` taħt il-lock tal-operazzjoni.

**Korp tat-talba:** xejn

**Risposti:** l-istess bħal `start` (jirritorna l-`ServiceStatus` finali).

---

#### `POST /api/services/9router/update`

Jaġġorna 9Router għal verżjoni npm aktar ġdida. Jekk is-servizz ikun qed jaħdem, l-ewwel
jitwaqqaf, titħaddem l-installazzjoni npm (bil-verżjoni l-ġdida tiġi installata fl-istess post),
u mbagħad is-servizz jerġa’ jinbeda.

**Korp tat-talba** (kollha fakultattivi):

```json
{ "version": "latest" }
```

**Risposti:**

| Status | Deskrizzjoni                                                    |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Korp invalidu                                                   |
| `500`  | L-aġġornament npm falla                                         |

---

#### `POST /api/services/9router/rotate-key`

Jiġġenera ċavetta API ġdida għal 9Router, jikkriptaha meta tkun maħżuna, u jerġa’ jibda s-servizz
(jekk ikun qed jaħdem) sabiex jaqra ċ-ċavetta l-ġdida mill-ambjent tiegħu. Iċ-ċavetta l-qadima
tiġi invalidata minnufih.

**Korp tat-talba:** xejn

**Risposti:**

| Status | Deskrizzjoni                               |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Ir-rotazzjoni falliet                      |

**Sigurtà:** Iċ-ċavetta l-ġdida qatt ma tintbagħat fir-risposta (ebda żvelar ta’ kredenzjali).
Tinħażen ikkriptata (AES-256-GCM) fit-tabella `version_manager`.

---

#### `GET /api/services/9router/status`

Jirritorna status ikkombinat dirett + mid-DB, inklużi l-metadata tal-verżjoni u dehra parzjali taċ-ċavetta API.

**Risposti:**

| Status | Deskrizzjoni              |
| ------ | ------------------------- |
| `200`  | Ara l-iskema hawn taħt    |
| `500`  | Il-qari tal-istatus falla |

**Skema tar-risposta:**

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

Jaqleb il-flag tal-bidu awtomatiku. Meta `enabled: true`, is-servizz jibda awtomatikament
id-darba li jmiss li OmniRoute jibda (jekk is-servizz ikun installat).

**Korp tat-talba:**

```json
{ "enabled": true }
```

**Risposti:**

| Status | Deskrizzjoni          |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Korp invalidu         |

---

#### `GET /api/services/9router/logs`

Fluss SSE ta’ logs diretti mill-buffer ċirkolari stdout/stderr ta’ 9Router.

**Parametri tal-query:**

| Param    | Tip       | Valur predefinit | Deskrizzjoni                                                                    |
| -------- | --------- | ---------------- | ------------------------------------------------------------------------------- |
| `tail`   | `integer` | 200              | Kemm-il linja storika jintbagħtu l-ewwel (massimu ta’ 1000)                     |
| `filter` | `string`  | xejn             | Filtru ta’ substring mhux sensittiv għall-każ (ebda regex — sigur kontra ReDoS) |

**Avvenimenti SSE:**

| Avveniment  | Data        | Deskrizzjoni             |
| ----------- | ----------- | ------------------------ |
| `snapshot`  | `LogLine[]` | It-tail storiku inizjali |
| `log`       | `LogLine`   | Linja tal-log diretta    |
| `heartbeat` | `{}`        | Keep-alive kull 15 s     |

**Skema ta’ LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Risposti:**

| Status | Deskrizzjoni                                          |
| ------ | ----------------------------------------------------- |
| `200`  | `text/event-stream`                                   |
| `400`  | Il-parametru `filter` huwa twil wisq (> 200 karattru) |
| `404`  | Is-servizz ma nstabx (is-superviżur mhux irreġistrat) |

---

### 4.2 Endpoints ta' CLIProxyAPI (10 rotot)

CLIProxyAPI għandu l-istess struttura ta' endpoints bħal 9Router, minbarra `rotate-key`, flimkien ma'
`accounts`, `provider-expose` u `auto-restart-adopted`. Issa jirċievi
ċavetta API ddedikata għall-pjan tad-data, injettata mat-tnedija (`needsApiKey: true` f'
`bootstrap.ts`, użata għas-sinkronizzazzjoni tal-mudelli); `status` jinkludi inqas oqsma.

| Metodu | Mogħdija                            | Deskrizzjoni                                  |
| ------ | ----------------------------------- | --------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Installa CLIProxyAPI minn npm                 |
| `POST` | `/api/services/cliproxy/start`      | Ibda CLIProxyAPI                              |
| `POST` | `/api/services/cliproxy/stop`       | Waqqaf CLIProxyAPI                            |
| `POST` | `/api/services/cliproxy/restart`    | Erġa' ibda CLIProxyAPI                        |
| `POST` | `/api/services/cliproxy/update`     | Aġġorna għal verżjoni aktar ġdida             |
| `GET`  | `/api/services/cliproxy/status`     | Status attwali + DB (mingħajr `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Attiva jew iddiżattiva l-bidu awtomatiku      |

L-endpoint kondiviż `GET /api/services/{name}/logs` (ara §4.1) jaħdem għall-
erba' servizzi kollha billi juża s-segment dinamiku `[name]`.

---

### 4.3 Endpoints ta' Mux (8 rotot)

Mux għandu l-istess struttura ta' endpoints bħal CLIProxyAPI — ma hemm l-ebda rotta `rotate-key` fis-
superfiċje tal-API (it-token bearer jiġi ġġenerat bl-istess mod bħal dak ta' 9Router permezz ta'
`getOrCreateApiKey("mux")` u jiġi injettat permezz tal-varjabbli ambjentali `MUX_SERVER_AUTH_TOKEN`, iżda
għad ma hemm l-ebda endpoint iddedikat għar-rotazzjoni). Mux huwa ġestit biss tul iċ-ċiklu tal-ħajja: għall-kuntrarju
ta' 9Router, ma għandu l-ebda eżekutur ta' Saff 4 u qatt ma jiġi rreġistrat bħala fornitur tar-routing.

| Metodu | Mogħdija                       | Deskrizzjoni                             |
| ------ | ------------------------------ | ---------------------------------------- |
| `POST` | `/api/services/mux/install`    | Installa Mux minn npm (`npm i mux`)      |
| `POST` | `/api/services/mux/start`      | Ibda Mux (`mux server`)                  |
| `POST` | `/api/services/mux/stop`       | Waqqaf Mux                               |
| `POST` | `/api/services/mux/restart`    | Erġa' ibda Mux                           |
| `POST` | `/api/services/mux/update`     | Aġġorna għal verżjoni npm aktar ġdida    |
| `GET`  | `/api/services/mux/status`     | Status attwali + DB                      |
| `POST` | `/api/services/mux/auto-start` | Attiva jew iddiżattiva l-bidu awtomatiku |

---

### 4.4 Endpoints ta' Bifrost (8 rotot)

Bifrost huwa backend relay ta' gateway tal-AI miktub bil-Go (`@maximhq/bifrost`). Juża l-istess
struttura ta' endpoints bħal CLIProxyAPI (mingħajr `rotate-key` — Bifrost jiġġestixxi ċ-ċwievet tal-fornituri
tiegħu stess f'`config.json` taħt `-app-dir`).

| Metodu | Mogħdija                           | Deskrizzjoni                                                                                       |
| ------ | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Installa Bifrost minn npm (`@maximhq/bifrost`)                                                     |
| `POST` | `/api/services/bifrost/start`      | Ibda Bifrost fuq il-port 8080 (predefinit)                                                         |
| `POST` | `/api/services/bifrost/stop`       | Waqqaf Bifrost                                                                                     |
| `POST` | `/api/services/bifrost/restart`    | Erġa' ibda Bifrost                                                                                 |
| `POST` | `/api/services/bifrost/update`     | Aġġorna għal verżjoni aktar ġdida                                                                  |
| `GET`  | `/api/services/bifrost/status`     | Status attwali + DB                                                                                |
| `POST` | `/api/services/bifrost/auto-start` | Attiva jew iddiżattiva l-bidu awtomatiku                                                           |
| `GET`  | `/api/services/bifrost/logs`       | Fluss kontinwu tal-aħħar logs permezz ta' SSE (permezz tar-rotta dinamika kondiviża `[name]/logs`) |

**Konfigurazzjoni tar-routing:** Meta `BIFROST_BASE_URL` ma jkunx issettjat u l-istanza sorveljata ta' Bifrost
tkun qed taħdem, `getBifrostRoutingConfig()` (f'`routingBackend.ts`) juża awtomatikament
`http://127.0.0.1:{port}` bħala l-URL bażi tar-relay. Il-varjabbli ambjentali espliċitu `BIFROST_BASE_URL`
dejjem jingħata preċedenza.

---

### 4.5 Endpoints ta' Dario (12-il rotta)

L-istess struttura taċ-ċiklu tal-ħajja bħas-servizzi l-oħra (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`) flimkien ma' pjan ta' kontroll OAuth
protett b'token taħt `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (kollha protetti minn `DARIO_ADMIN_TOKEN`).

### 4.6 Endpoints ta' open-wa (7 rotot)

open-wa (`@open-wa/wa-automate`) iħaddem istanza ta' Chromium mingħajr interfaċċa grafika (permezz ta'
Puppeteer) biex jawtomatizza WhatsApp Web. Juża l-istess struttura ta' endpoints bħal Mux (għad ma hemm l-ebda
rotta `rotate-key`). Huwa ġestit biss tul iċ-ċiklu tal-ħajja — mhuwiex mira tar-routing,
u ma għandu l-ebda entrata ta' eżekutur/fornitur ta' Saff 4.

| Metodu | Mogħdija                          | Deskrizzjoni                                                               |
| ------ | --------------------------------- | -------------------------------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | Installa open-wa minn npm (`@open-wa/wa-automate`)                         |
| `POST` | `/api/services/openwa/start`      | Ibda open-wa fuq il-port 8323 (default)                                    |
| `POST` | `/api/services/openwa/stop`       | Waqqaf open-wa                                                             |
| `POST` | `/api/services/openwa/restart`    | Erġa' ibda open-wa                                                         |
| `POST` | `/api/services/openwa/update`     | Aġġorna għal verżjoni aktar ġdida                                          |
| `GET`  | `/api/services/openwa/status`     | Status dirett + tad-DB                                                     |
| `POST` | `/api/services/openwa/auto-start` | Attiva jew iddiżattiva l-bidu awtomatiku                                   |
| `GET`  | `/api/services/openwa/logs`       | Tmiem tal-log permezz ta' SSE (bir-rotta dinamika kondiviża `[name]/logs`) |

**Ċavetta tal-API:** injettata bħala `WA_KEY` — is-sovrastruttura ġenerika tal-varjabbli
tal-ambjent ta' open-wa bil-prefiss `WA_*` timmappjaha mal-għażla CLI `--key`/`-k`
(`dist/cli/setup.js::envArgs()`, ivverifikat mal-pakkett installat 4.76.0).
Ikollha l-prefiss `ow_` meta tiġi ġġenerata minn `generateServiceApiKey()`. open-wa
jerġa' jaqra ċ-ċavetta minn header HTTP `key`/`api_key` (mhux `Authorization:
Bearer`); `/api-docs*` huwa espliċitament eżentat mill-verifika
(`setupAuthenticationLayer` f'`dist/cli/server.js`), għalhekk il-probe tas-saħħa
ma jeħtieġ l-ebda header ta' awtentikazzjoni.

**Tqabbil:** open-wa mhuwiex uffiċjali u mhuwiex affiljat ma' WhatsApp — in-numru
konness huwa espost għar-riskju ta' projbizzjoni mis-sistema ta' detezzjoni tal-awtomazzjoni
ta' WhatsApp stess. Fl-ewwel bidu, il-kodiċi QR tat-tqabbil jiġi stampat fuq stdout u muri
permezz tal-pannell eżistenti tal-Logs/fluss SSE — għad m'hemm l-ebda endpoint iddedikat
għall-immaġni QR f'din l-integrazzjoni.

---

### 4.7 Reverse proxy (integrazzjoni fid-dashboard ta' 9Router)

Id-dashboard jintegra l-interfaċċa web ta' 9Router ġewwa iframe permezz ta' reverse
proxy intern f':

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Dan il-proxy:

- Jgħaddi t-talba lil `http://127.0.0.1:{port}/{path}` (loopback biss)
- Ineħħi l-headers deħlin `cookie` u `authorization` (l-ebda tnixxija tas-sessjoni ta' OmniRoute)
- Jinjetta `Authorization: Bearer {apiKey}` għall-awtentikazzjoni ta' 9Router
- Ineħħi `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` mit-tweġiba
- Jerġa' jikteb it-tweġibiet HTML biex jinjetta `<base href>` u jinnormalizza l-mogħdijiet assoluti (`/foo` → `/dashboard/.../embed/foo`)

L-aġġornamenti tal-WebSocket għad-dashboard integrat jiġu ttrattati minn server anċillari fuq
port iddedikat (ara `src/lib/services/embedWsProxy.ts`).

**Sigurtà:** Ir-rotot tal-proxy tal-integrazzjoni huma kklassifikati taħt `LOCAL_ONLY_API_PREFIXES`
u jistgħu jintlaħqu biss mil-loopback. Attakkant li jikseb JWT permezz ta'
mina Cloudflare/Ngrok ma jistax juża l-proxy biex jidħol fis-servizzi integrati.

---

## 5. Sigurtà

### Infurzar ta' LOCAL_ONLY (regola stretta #17)

Ir-rotot kollha taħt `/api/services/` u `/dashboard/providers/services/*/embed/` huma
kklassifikati bħala LOCAL_ONLY f’`src/server/authz/routeGuard.ts`. Il-verifika tal-loopback
titħaddem mingħajr kundizzjonijiet qabel kwalunkwe fergħa tal-awtentikazzjoni:

```
tasal it-talba
  → isLocalOnlyPath(path)?
      → mhux loopback → 403 LOCAL_ONLY (dejjem, qabel il-verifika tal-awtentikazzjoni)
      → loopback      → kompli bl-awtentikazzjoni normali
```

Dan jipprevjeni JWT żvelat (eż., permezz ta’ tunnel) milli jattiva `npm install` jew
it-tnedija ta’ proċessi. Ara `docs/security/ROUTE_GUARD_TIERS.md` għall-matriċi sħiħa
tal-livelli.

### Injezzjoni taċ-ċavetta tal-API

9Router u Mux jeħtieġu ċavetta tal-API/token bearer għall-endpoints HTTP tagħhom stess.
OmniRoute:

1. Jiġġenera ċavetta permezz ta’ `crypto.randomBytes(32).toString("base64url")` bi
   prefiss speċifiku għas-servizz (`nr_` għal 9Router, `mx_` għal Mux).
2. Jikkriptaha meta tkun maħżuna permezz ta’ AES-256-GCM (l-istess ċifra użata għall-kredenzjali tal-fornitur).
3. Jiddekriptaha u jinjettaha bħala varjabbli tal-ambjent fil-ħin tat-tnedija —
   `NINEROUTER_API_KEY` għal 9Router, `MUX_SERVER_AUTH_TOKEN` għal Mux (qatt bħala flag tas-CLI,
   sabiex it-token qatt ma jidher f’`ps`/listi tal-proċessi).
4. Qatt ma jirritorna ċ-ċavetta f’test ċar fi kwalunkwe tweġiba HTTP.

CLIProxyAPI jirċievi ċavetta ddedikata għall-pjan tad-data injettata waqt it-tnedija
(`needsApiKey: true` — użata għas-sinkronizzazzjoni tal-mudelli mal-adapter).

### Difiża kontra SSRF

Il-proxy HTTP invers (`/dashboard/.../embed/[...path]`) huwa kkonfigurat b’mod fiss biex jgħaddi
biss lejn `http://127.0.0.1:{port}`. Qatt ma jsegwi redirects lejn destinazzjonijiet
li mhumiex loopback. Il-librerija `ssrf-req-filter` tintuża biex tirrifjuta kwalunkwe URL upstream li
jirriżolvi barra mill-firxa tal-loopback.

### Sigurtà tas-shell (regola stretta #13)

`npm install` jiġi msejjaħ permezz ta’ `execFile('npm', ['install', pkg, '--prefix', dir])` —
mingħajr template literals, mingħajr shell, u mingħajr interpolazzjoni ta’ paths esterni fis-string
tal-kmand. Il-valuri waqt l-eżekuzzjoni (ports, ċwievet tal-API) jgħaddu permezz tal-oġġett `env` tal-proċess child.

### Sanitizzazzjoni tal-iżbalji (regola stretta #12)

It-tweġibiet kollha tal-iżbalji minn `/api/services/*` jgħaddu minn `buildErrorBody()` jew
`sanitizeErrorMessage()`. `err.stack` u `err.message` mhux ipproċessati qatt ma jiġu rritornati
kelma b’kelma lil min jagħmel it-talba.

---

## 6. Żieda ta’ servizz inkorporat ġdid

Segwi dawn it-8 passi. Aqra l-implimentazzjonijiet eżistenti f’`src/lib/services/installers/`
u `src/app/api/services/` bħala r-referenza kanonika.

### Pass 1 — Oħloq l-installatur

Oħloq `src/lib/services/installers/{name}.ts` immudellat fuq `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // agħżel port liberu

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Uża `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` minn `installers/utils.ts`
— qatt `execSync` jew interpolazzjoni tas-shell.

### Pass 2 — Irreġistra fil-bootstrap

Żid `ServiceEntry` mal-array `SERVICES` f’`src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false jekk ma tkun meħtieġa l-ebda ċavetta tal-API
}
```

Estendi `buildSpawnArgsFactory()` biex jittratta `cfg.tool === "myservice"`.

#### Kuntratt ta’ plugin tal-fornitur li jista’ jiġi integrat (Fażi 1, #7333)

`src/lib/services/providerPlugins/` jintroduċi kuntratt `ServiceProviderPlugin` li
jiġbor flimkien l-oqsma `ServiceEntry` ta’ `bootstrap.ts` ta’ backend u l-oqsma tal-mudell tal-manifest
ta’ `serviceBackends.ts` f’oġġett wieħed, minflok ma l-istess struttura tal-backend tiġi
espressa separatament f’żewġ fajls mhux relatati. Sa minn din il-kitba **`9router` biss ġie
migrat** — `bootstrap.ts` jidderiva l-entrata tiegħu ta’ `SERVICES[]` minn
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
u jitfa’ żball tal-istartjar jekk il-plugin qatt ikun nieqes. `cliproxy`, `mux`, u `bifrost`
jibqgħu jużaw il-literals inline preeżistenti ta’ `SERVICES[]` mingħajr tibdil.

`open-sse/config/providerPluginManifest.ts` kiseb ukoll helper addittiv
`createServiceBackendManifestEntry(pluginId, template)` li jibni
`ProviderPluginManifestEntry` iffurmat tajjeb minn entrata `SERVICE_BACKEND_MANIFEST_TEMPLATE` — dan
**għadu mhux** imqabbad ma’ xi path ta’ talba live (la `generateProviderPluginManifestFromRegistry()`
u lanqas `/v1/providers/[provider]/models`); dan jibqa’ xogħol ta’ segwitu ladarba l-kuntratt ikun
ġie ppruvat għal backend ieħor.

Differit għal PRs ta’ segwitu, traċċati taħt il-kwistjoni #7333: il-migrazzjoni ta’ `cliproxyapi` permezz tal-istess
reġistru, il-ġeneralizzazzjoni ta’ `mux`/`bifrost` fl-union `ServiceBackendPluginId`,
l-inkorporazzjoni tat-trattament speċjali tar-routing tal-executor (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) fil-kuntratt tal-plugin, u l-konnessjoni ta’
`createServiceBackendManifestEntry()` ma’ path live tal-kodiċi tal-manifest/mudelli.

### Pass 3 — Żid migrazzjoni u data inizjali fid-DB

Żgura li s-servizz ikollu ringiela f’`version_manager` permezz ta’ migrazzjoni f’
`src/lib/db/migrations/`. Ir-ringiela għandu jkollha:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Pass 4 — Oħloq is-7 endpoints tal-API

Taħt `src/app/api/services/{name}/`:

```
_lib.ts            helper getOrInitSupervisor()
install/route.ts   POST — isejjaħ installer.install()
start/route.ts     POST — isejjaħ supervisor.start()
stop/route.ts      POST — isejjaħ supervisor.stop()
restart/route.ts   POST — isejjaħ supervisor.restart()
update/route.ts    POST — isejjaħ installer.update()
status/route.ts    GET  — jgħaqqad l-istatus live + tad-DB
auto-start/route.ts POST — jaqleb il-flag auto_start
```

Ir-rotta kondiviża `GET /api/services/[name]/logs` diġà hija kkonfigurata — m’hemmx bżonn
ta’ tibdil hemmhekk.

Iddelega t-tweġibiet kollha tal-iżbalji permezz ta’ `createErrorResponse()` / `buildErrorBody()`.

### Pass 5 — Żid ma’ LOCAL_ONLY_API_PREFIXES

F’`src/server/authz/routeGuard.ts`, ivverifika li `/api/services/` diġà tinsab fil-lista.
Jekk tintroduċi prefiss ġdid (eż., `/api/tools/`), żidu kemm ma’
`LOCAL_ONLY_API_PREFIXES` kif ukoll, jekk iniedi proċessi, ma’ `SPAWN_CAPABLE_PREFIXES`.
Żid test f’`tests/unit/authz/routeGuard.test.ts`.

### Pass 6 — Żid it-tab tal-UI

Oħloq `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Uża mill-ġdid il-komponenti kondiviżi:

- `ServiceStatusCard` — stat dirett + badge tas-saħħa
- `ServiceLifecycleButtons` — Start / Stop / Restart / Update
- `ServiceLogsPanel` — l-aħħar entrati tal-log permezz ta’ SSE (jikkonnettja ma’ `/api/services/{name}/logs`)
- `ApiKeyCard` — kxif + rotazzjoni taċ-ċavetta (jekk `needsApiKey: true`)

Irreġistra t-tab f’`ServicesPageShell.tsx`.

### Pass 7 — Żid l-entrata tal-fornitur (jekk is-servizz huwa mira tar-routing)

Jekk is-servizz inkorporat jesponi endpoint `/v1/chat/completions` kompatibbli ma’ OpenAI:

1. Żid entrata ta’ fornitur f’`src/shared/constants/providers.ts` b’`isEmbeddedService: true`.
2. Oħloq `open-sse/executors/{name}.ts` li jestendi `BaseExecutor`. Erġa’ fittex il-port u
   ċ-ċavetta tal-API għal kull talba (qatt taħżinhom temporanjament fil-kostruttur). Irritorna tweġiba
   `503 service_not_running` meta l-istat tas-superviżur ma jkunx `"running"`.
3. Irreġistra l-mudelli f’`open-sse/config/providerRegistry.ts` bil-prefiss tas-servizz
   (eż., `myservice/sub/model`). `modelSync.ts` se jżommhom aġġornati.

### Pass 8 — Iddokumenta u ttestja

1. Aġġorna `docs/frameworks/EMBEDDED-SERVICES.md` (dan il-fajl) — żid is-servizz mat-
   tabella f’§1 u kwalunkwe endpoint ġdid ma’ §4.
2. Żid testijiet unitarji f’`tests/unit/services/` (ċiklu tal-ħajja, installatur, forma tal-API).
3. Żid test ta’ integrazzjoni f’`tests/integration/services/` (wara `RUN_SERVICES_INT=1`).
4. Aġġorna `docs/openapi.yaml` bl-endpoints il-ġodda.

---

## 7. Soluzzjoni tal-problemi

### Is-servizz ma jibdiex

**Sintomi:** Il-buttuna tal-bidu tirritorna 503, u l-istat jibqa' `"error"` jew `"starting"`.

**Lista ta' kontroll:**

1. Iċċekkja `GET /api/services/{name}/logs` (jew il-pannell Logs fid-dashboard). Fittex
   għal linji bħal `Error: ENOENT`, `address already in use`, jew `Cannot find module`.
2. Ivverifika li `npm` jinsab fil-PATH: `which npm` mill-istess kont tal-utent li jħaddem OmniRoute.
3. Ivverifika li s-servizz huwa installat: iċċekkja `GET /api/services/{name}/status` għal
   `installedVersion`. Jekk ikun `null`, l-ewwel ħaddem l-installazzjoni.
4. Iċċekkja li `DATA_DIR/services/{name}/node_modules/` jeżisti u mhuwiex vojt.
5. Iċċekkja l-qasam `lastError` fit-tweġiba tal-istat għar-raġuni sanitizzata tal-ħruġ.

---

### Il-bidu mill-kesħa jieħu fit-tul (> 10 s biex jilħaq `running`)

**Sintomi:** L-istat jibqa' `"starting"` għal ħin twil qabel ma jgħaddi għal `"running"` jew `"error"`.

**Spjegazzjoni:** Il-bidu mill-kesħa ta' 9Router jinkludi l-importazzjoni ta' siġar kbar ta' dipendenzi (moduli
DNS, tunnel u MITM). L-intervall tas-saħħa predefinit huwa ta' 2 s bi 3 tentattivi qabel ma
s-superviżur jiddikjara skadenza tal-ħin (iżda jkompli jiċċekkja).

**Soluzzjoni:** Il-`healthIntervalMs` u l-iskadenza tal-ħin ta' `waitForHealthy`
(`healthIntervalMs * 3`) jistgħu jiġu kkonfigurati f'`bootstrap.ts`. Għal servizzi b'ħinijiet itwal
ta' bidu, żid `healthIntervalMs` għal 5000 u `stopTimeoutMs` għal 30 000.

---

### Kunflitt tal-port (`EADDRINUSE`)

**Sintomi:** Il-logs juru `address already in use :::20130`.

**Kawżi:**

- Proċess ieħor diġà qed juża l-port 20130.
- Proċess preċedenti ta' 9Router ma twaqqafx kompletament (PID zombie).

**Soluzzjoni:**

1. Ibdel il-port predefinit permezz tal-varjabbli tal-ambjent `NINEROUTER_PORT` f'`.env`.
2. Sib u waqqaf il-proċess konfliġġenti: `lsof -ti :20130 | xargs kill -9`.
3. Il-port jista' jiġi kkonfigurat għal kull servizz f'`bootstrap.ts` permezz tal-qasam `port`.

**Nota:** 9Router juża l-port 20130 b'mod predefinit speċifikament biex jevita kunflitt
mal-port predefinit 20128 ta' OmniRoute.

---

### Permess miċħud (EACCES) waqt l-installazzjoni

**Sintomi:** L-installazzjoni tirritorna 500, u l-logs juru `EACCES` jew `permission denied`.

**Kawżi:**

- `DATA_DIR` jew id-direttorju ġenitur tiegħu ma jistax jinkiteb mill-proċess ta' OmniRoute.
- Qed jitħaddem ġewwa Docker rootless mingħajr aċċess għall-kitba fil-volum immappjat.

**Soluzzjoni:**

1. Iċċekkja `DATA_DIR` (predefinit: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Kun żgur li l-utent tal-proċess ta' OmniRoute huwa sid id-direttorju: `chown -R $USER ~/.omniroute/`
3. F'Docker, kun żgur li l-immuntar tal-volum għandu l-permessi korretti għall-utent tal-container.

---

### L-aġġornament ifalli (skadenza tal-ħin ta' `npm install` jew żball tan-network)

**Sintomi:** L-aġġornament jirritorna 500 b'`InstallError`, u l-logs juru skadenza tal-ħin tan-network.

**Lista ta' kontroll:**

1. Ikkonferma li r-reġistru npm jista' jintlaħaq: `npm ping`.
2. Iċċekkja jekk hemmx proxy korporattiv: `npm config get proxy`, `npm config get https-proxy`.
3. Ipprova l-installazzjoni manwalment: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Jekk tinsab wara air-gap, niżżel it-tarball minn qabel u uża `npm install /path/to/tarball.tgz`.

---

### Is-servizz juri l-istat `"error"` immedjatament wara li jinbeda (crash immedjat)

**Sintomi:** L-istat jgħaddi minn `"starting"` għal `"error"` f'inqas minn 5 sekondi.
`lastError` juri `"Fast crash (exited with code 1)"`.

**Lista ta' kontroll:**

1. Aqra l-aħħar parti sħiħa tal-log: `GET /api/services/{name}/logs?tail=500`.
2. Kawża komuni: varjabbli tal-ambjent meħtieġa mis-servizz ikunu neqsin.
3. Għal 9Router: ivverifika li `NINEROUTER_DISABLE_MITM=true` u
   `NINEROUTER_DISABLE_TUNNEL=true` jinsabu fl-env mgħoddi waqt l-ispawn (ara
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Mistoqsijiet Frekwenti

**M: Nista’ nesponi l-endpoints tas-servizzi inkorporati għal klijenti li mhumiex loopback?**

Le. Il-livell LOCAL_ONLY huwa intenzjonat (regola stretta #17). Ir-rotot li jistgħu jħaddmu
`npm install` jew iniedu proċessi `node` ma għandhomx ikunu aċċessibbli minn traffiku li
mhuwiex loopback, għax inkella JWT żvelat permezz ta’ mina (Cloudflare, Ngrok, Tailscale)
jippermetti t-tnedija arbitrarja ta’ proċessi. Ma hemm l-ebda eċċezzjoni fakultattiva għal
`/api/services/` — għall-kuntrarju ta’ `/api/mcp/`, din hija eskluża mil-lista ta’ bypass
tal-kamp ta’ applikazzjoni tal-ġestjoni. Ara `docs/security/ROUTE_GUARD_TIERS.md`.

---

**M: 9Router u CLIProxyAPI se jkunu disponibbli f’deployments tal-produzzjoni/cloud?**

Iva. Iż-żewġ servizzi jsegwu l-istess mudell ibbażat l-ewwel fuq l-użu lokali bħal OmniRoute innifsu. Dawn jaħdmu
fuq l-istess magna u jikkomunikaw permezz tal-loopback. “Produzzjoni” hawnhekk tfisser il-VPS
jew is-server lokali fejn jiġi deployed OmniRoute, mhux fornitur remot tal-cloud.

---

**M: Kif niddibaggja s-superviżur?**

1. Segwi l-fluss tal-logs SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Iċċekkja l-logs strutturati fl-output pino ta’ OmniRoute, iffiltrati skont
   in-namespace `service:supervisor`.
3. Spezzjona r-ringiela fid-DB: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Uża `GET /api/services/9router/status` biex tara l-istat attwali dirett, il-PID, is-saħħa,
   u `lastError` f’sejħa waħda.

---

**M: Is-superviżur juri `health: "degraded"` jew `health: "unknown"` iżda l-istat huwa `"running"`. Din problema?**

`"degraded"` tfisser li l-probe tas-saħħa rritorna risposta mhux 200. `"unknown"` tfisser li
għadu ma tlesta l-ebda probe (kompetizzjoni mal-ewwel stħarriġ). It-tnejn huma temporanji waqt l-istartjar.
Jekk is-saħħa tibqa’ `"degraded"` għal aktar minn `healthIntervalMs * 3` ms wara
`"running"`, is-servizz inkorporat ikun qed jaħdem iżda l-API HTTP tiegħu ma tkunx qed tirrispondi. Iċċekkja
jekk il-port huwiex korrett fir-risposta tal-istatus u jekk is-servizz fil-fatt
huwiex qed jisma’ fuq dak il-port.

---

**M: Nista’ nibdel iċ-ċavetta tal-API ta’ 9Router mingħajr ristartjar sħiħ?**

Le. Iċ-ċavetta tal-API tgħaddi lil 9Router permezz ta’ varjabbli tal-ambjent fil-ħin tat-tnedija.
Il-varjabbli tal-ambjent ma jistgħux jinbidlu fi proċess li jkun qed jaħdem. `POST .../rotate-key`
iwaqqaf u jerġa’ jistartja s-servizz awtomatikament biex japplika ċ-ċavetta l-ġdida. Ir-rotazzjoni taċ-ċavetta
tidħol fis-seħħ fi żmien `stopTimeoutMs` tas-servizz (il-valur default huwa 15 s) flimkien mal-ħin
tal-istartjar tiegħu.

---

**M: X’inhu l-limitu tar-ring buffer u x’jiġri meta jimtela?**

Kull servizz għandu ring buffer dedikat ta’ 5 MB. Meta l-buffer ikun mimli, l-eqdem
linji tal-log jitneħħew biex jagħmlu spazju għal oħrajn ġodda. L-avveniment SSE `snapshot` jirritorna
l-aktar linji reċenti fil-limitu `tail`. Il-logs ma jiġux ippersistiti fuq id-diska sakemm
`logsBufferPath` ma jkunx issettjat fir-ringiela tad-DB.

---

## Ara wkoll

- `docs/security/ROUTE_GUARD_TIERS.md` — dettalji tal-livell LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 immappjar tal-modulu tas-Servizzi Inkorporati
- `docs/architecture/ARCHITECTURE.md` — kuntest fil-livell tas-sistema
- `docs/openapi.yaml` — definizzjonijiet tal-endpoints li jistgħu jinqraw minn magna
- `CLAUDE.md` §“Żieda ta’ Servizz Inkorporat Ġdid” — lista ta’ kontroll ta’ referenza rapida
