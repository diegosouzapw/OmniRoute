# Router Backends & Embedded Services — architecture contract (ADR) (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Aċċettat · **Kuntest:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kuntratt:** `domain/routing/routerBackends.ts`
> (reġistru tipizzat — il-kodiċi jasal ma’ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Dan l-ADR jistabbilixxi kif `ts` (nattiv), `bifrost`, `cliproxy`, `9router`, u
magni kompatibbli ma’ VibeProxy jirrelataw ma’ xulxin, sabiex il-kontributuri ma
jibqgħux iħalltu żewġ affarijiet li huma arkitettonikament distinti. Jiddokumenta
r-reġistru tipizzat introdott mill-ħidma tar-router-backend-registry bħala s-sors
uniku tal-verità għal dak il-mudell.

## Id-distinzjoni ewlenija — żewġ assi ortogonali

Ir-rwol ta’ magna huwa deskritt minn **żewġ assi indipendenti**, ikkodifikati flimkien
fir-`RouterBackendDefinition` tar-reġistru:

1. **Ċiklu tal-ħajja** (`RouterBackendLifecycle`) — _kif taħdem il-magna_:
   - `in-process` — taħdem fi ħdan il-proċess Node ta’ OmniRoute (il-pipeline nattiv tat-TS).
   - `supervised` — proċess wild lokali li OmniRoute jinstalla/jibda/jwaqqaf/jiċċekkja s-saħħa tiegħu
     permezz ta’ `ServiceSupervisor`, u mbagħad jużah bħala konnessjoni ma’ fornitur.
   - `external` — endpoint HTTP li OmniRoute jibgħatlu t-talbiet iżda **ma** jimmaniġġjahx
     (ikkonfigurat permezz ta’ URL bażi f’varjabbli tal-ambjent).
   - `disabled` — irreġistrat iżda mhux disponibbli għall-għażla.
2. **Assi tal-għażla** (backend tar-routing tar-relay) — _jekk ir-relay jibgħatx it-talbiet lilu_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` f’
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

L-iżball li għandu jiġi evitat: li “servizz inkorporat” u “backend tar-routing” jiġu ttrattati bħala lista
waħda. Mhumiex. Magna `supervised` (9router/cliproxy) hija **konnessjoni
ma’ fornitur użata mill-pipeline nattiv**, mhux backend alternattiv għad-dispaċċ
tar-relay. `bifrost` huwa l-maqlub — backend għad-dispaċċ tar-relay li (storikament)
kien `external` biss.

## Ir-reġistru — sors uniku tal-verità

Il-kuntratt `domain/routing/routerBackends.ts` (il-kodiċi jasal ma’
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) jiddikjara kull magna darba waħda, biċ-ċiklu
tal-ħajja, il-kapaċitajiet, l-identità tas-servizz, il-port default, il-konfigurazzjoni
tas-saħħa, u l-appoġġ għat-telemetrija tagħha. Il-konsumaturi jfittxu l-magni permezz ta’
`getRouterBackend(id)`, `listRouterBackends()`, u `listRouterBackendsByCapability(cap)` minflok
ma jimmaniġġjaw kull sidecar b’każijiet speċjali.

| Backend     | Ċiklu tal-ħajja | Servizz (assi A) | Backend tar-relay (assi B) | Saħħa         | Port default |
| ----------- | --------------- | ---------------- | -------------------------- | ------------- | ------------ |
| `ts`        | `in-process`    | —                | `ts` (nattiv)              | —             | —            |
| `bifrost`   | `external`¹     | —¹               | `bifrost` / `auto`         | `/health`     | —            |
| `cliproxy`  | `supervised`    | `cliproxy`       | — (fornitur)               | `/v1/models`  | 8317         |
| `9router`   | `supervised`    | `9router`        | — (fornitur)               | `/api/health` | 20130        |
| `vibeproxy` | `external`      | —                | — (adapter tal-fornitur)   | `/v1/models`  | —            |

¹ Il-promozzjoni ta’ Bifrost għal servizz inkorporat `supervised` (li jista’ jiġi installat/jinbeda
minn `/api/services/bifrost/`) hija segwita f’
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); sakemm din tingħaqad,
Bifrost huwa `external` biss (aċċessibbli esklussivament permezz ta’ `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) jippermettu lil min isejjaħ
jiffiltra skont dak li magna tista’ tassew tagħmel minflok ma jikkodifika b’mod fiss fergħat għal kull id.

## Assi A — servizzi integrati (in-naħa tal-proċess sorveljat)

- **Reġistru tal-proċessi sorveljati:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (bħalissa: `9router`, `cliproxy`).
- **Sid taċ-ċiklu tal-ħajja:** `src/lib/services/ServiceSupervisor.ts` — `start()` joħloq
  l-proċess wild, jistenna `waitForHealthy()`, u jgħaddi stdout/stderr għal ring buffer;
  `stop()` SIGTERM→SIGKILL; kollox jiġi sserjalizzat taħt lock.
- **Unjoni tal-istati** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, flimkien ma’
  `HealthState = healthy | unhealthy | unknown` ortogonali.
- **Għaliex proċess separat (u mhux SDK fl-istess proċess)?** L-iżolament tal-proċess
  huwa dak li jagħmel l-installazzjoni/il-bidu/il-waqfien/is-saħħa/il-logs kontrollabbli
  indipendentement għal kull sidecar u jippermetti l-applikazzjoni tal-loopback
  spawn-guard. L-immudellar ta’ adapter fl-istess proċess huwa xogħol għall-futur —
  il-flag tal-kapaċità `native-hot-path` huwa fejn dan jiġi espress.

### Kuntratt tar-rotot taċ-ċiklu tal-ħajja (`/api/services/<tool>/…`)

Il-kodiċijiet tal-istatus huma **speċifiċi għall-istat/verb/path apposta** — dan huwa
l-kuntratt, mhux inkonsistenza:

| Sejħa                           | Kundizzjoni                                      | Status                               |
| ------------------------------- | ------------------------------------------------ | ------------------------------------ |
| `POST .../start`                | is-servizz huwa `not_installed`                  | **409** (prekundizzjoni)             |
| `POST .../stop`                 | diġà mwaqqaf                                     | **200** (no-op idempotenti)          |
| `GET .../status`                | OK                                               | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                | falliment fl-ispawn                              | **503** (tranżitorju)                |
| `GET .../status`, `.../stop`    | żball mhux maqbud                                | **500**                              |
| `GET /api/services/<x>/logs`    | għodda mhux magħrufa `<x>`                       | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`     | `X-Reveal-Confirm: yes` nieqes                   | **403** (9router biss)               |
| **kwalunkwe** `/api/services/*` | min jagħmel is-sejħa mhuwiex loopback/LAN privat | **403 LOCAL_ONLY**                   |

Il-bodies kollha tal-iżbalji jingħataw il-forma minn `createErrorResponse()` →
`{ error: { message, type }, requestId }`, fejn `type` jiġi derivat mill-istatus
(`500→server_error`, `404→not_found`, `409→conflict`, inkella `invalid_request`) u
huwa d-diskriminatur li jista’ jintuża mill-magni. Il-messaġġi jiġu sanitizzati minn
qabel (`sanitizeErrorMessage()`, Regola Stretta #12).

**Il-loopback guard** huwa l-aktar sors komuni ta’ `403`: `/api/services/` jinsab
f’`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) u
`src/server/authz/policies/management.ts` jirrifjuta kull min jagħmel sejħa li mhijiex
minn loopback / LAN privat **qabel l-awtentikazzjoni**, minħabba li dawn ir-rotot
joħolqu proċessi wlied (Regoli Stretti 15 u 17). Li jintlaħqu permezz ta’ mina
pubblika jagħti `403` apposta.

## Assi B — backend tar-routing tar-relay (in-naħa tad-dispaċċ)

Il-path tal-proxy tar-relay `/api/v1/relay/chat/completions` biss jagħżel backend
tad-dispaċċ; is-superfiċje ewlenija `/api/v1/chat/completions` qatt ma tikkonsulta
`routingBackend.ts`.

- **Għażla** (`resolveRelayRoutingBackend`): toggle globali wieħed tal-env —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Jekk ma jkunx issettjat, ikun `auto` meta Bifrost ikun ikkonfigurat+attivat,
  inkella `ts`.
- **Imġiba:**
  - `bifrost` (sfurzat): falliment ta’ Bifrost → `502` definittiv, mingħajr fallback.
  - `auto`: jipprova Bifrost u, f’każ ta’ falliment/cooldown, jgħaddi b’mod sieket
    għan-native.
  - `ts` / wara l-fallback: il-pipeline native ta’ traduzzjoni/eżekuzzjoni `open-sse`.
- **Cooldown:** cooldown għal kull falliment ta’ `baseUrl` f’`bifrostCooldown.ts`.

Bħalissa l-għażla hija **kollox jew xejn fil-livell tar-relay** — ma hemm ebda bidla
tal-engine għal kull provider jew għal kull request fuq `release/v3.8.43`. Il-gate
għal kull request qiegħed jiżdied permezz tax-xogħol fuq is-sidecar manifest
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
li jippermetti lil `auto` jgħaddi minn Bifrost biss il-providers eliġibbli skont
il-manifest.

## Integrazzjoni tad-dashboard

Id-dashboard tas-servizzi jinterroga `GET /api/services/<tool>/status` kull 5s permezz ta’
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
u jirritorna `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Ma hemm l-ebda fornitur kondiviż tal-kuntest tad-disponibbiltà —
kull komponent isejjaħ il-hook għal kull għodda. F’każ ta’ `!res.ok`, il-hook bħalissa juri
sempliċement `HTTP <status>`; l-immappjar tal-kamp `error.type` għal spjegazzjoni li tinftiehem
mill-bniedem huwa titjib traċċat tal-UX, mhux bidla fil-kuntratt.

## Konsegwenzi

- Engines ġodda jirreġistraw darba f’`ROUTER_BACKENDS`; il-konsumaturi jiksbuhom permezz ta’
  mistoqsijiet dwar il-kapaċitajiet mingħajr fergħat ġodda għal kull id.
- "Dan huwa servizz jew backend tar-routing?" jitwieġeb mill-kamp `lifecycle`, mhux
  minn f’liema lista jinzerta jidher id.
- Is-superviżjoni ta’ Bifrost (#5817) u l-migrazzjoni nattiva tal-hot path (#5670) jibnu fuq dan
  il-kuntratt kondiviż minflok ma jittrattaw kull sidecar bħala każ speċjali.
