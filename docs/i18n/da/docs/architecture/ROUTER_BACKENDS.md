# Router Backends & Embedded Services — architecture contract (ADR) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Accepteret · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrakt:** `domain/routing/routerBackends.ts`
> (typet register — koden lander med [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Denne ADR fastlægger, hvordan `ts` (native), `bifrost`, `cliproxy`, `9router` og
VibeProxy-kompatible motorer forholder sig til hinanden, så bidragydere holder op
med at sammenblande to ting, der er arkitektonisk adskilte. Den dokumenterer det
typede register, som blev introduceret af arbejdet med router-backend-registret,
som den eneste autoritative kilde til denne model.

## Den centrale sondring — to ortogonale akser

En motors rolle beskrives af **to uafhængige akser**, som er kodet samlet i
registrets `RouterBackendDefinition`:

1. **Livscyklus** (`RouterBackendLifecycle`) — _hvordan motoren kører_:
   - `in-process` — kører inde i OmniRoutes Node-proces (den native TS-pipeline).
   - `supervised` — en lokal underproces, som OmniRoute installerer/starter/stopper/sundhedstjekker
     via `ServiceSupervisor` og derefter bruger som en udbyderforbindelse.
   - `external` — et HTTP-slutpunkt, som OmniRoute sender anmodninger til, men **ikke** administrerer
     (konfigureret via en basis-URL i en miljøvariabel).
   - `disabled` — registreret, men kan ikke vælges.
2. **Valgakse** (relay-routingbackend) — _om relay-laget sender anmodninger til den_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` i
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Fejlen, der skal undgås, er at behandle "indlejret tjeneste" og "routingbackend"
som én liste. Det er de ikke. En `supervised` motor (9router/cliproxy) er en
**udbyderforbindelse, der bruges af den native pipeline**, ikke en alternativ
backend til relay-dispatch. `bifrost` er det omvendte — en backend til
relay-dispatch, som historisk set kun var `external`.

## Registret — den eneste autoritative kilde

Kontrakten `domain/routing/routerBackends.ts` (koden lander med
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklarerer hver motor én gang med dens
livscyklus, kapabiliteter, tjenesteidentitet, standardport, sundhedskonfiguration
og understøttelse af telemetri. Forbrugere slår motorer op via
`getRouterBackend(id)`, `listRouterBackends()` og
`listRouterBackendsByCapability(cap)` i stedet for at særbehandle hver sidecar.

| Backend     | Livscyklus   | Tjeneste (akse A) | Relay-backend (akse B) | Sundhed       | Standardport |
| ----------- | ------------ | ----------------- | ---------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —                 | `ts` (native)          | —             | —            |
| `bifrost`   | `external`¹  | —¹                | `bifrost` / `auto`     | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`        | — (udbyder)            | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`         | — (udbyder)            | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —                 | — (udbyderadapter)     | `/v1/models`  | —            |

¹ Bifrosts opgradering til en `supervised` indlejret tjeneste (som kan installeres/startes
fra `/api/services/bifrost/`) spores i
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); indtil den flettes,
er Bifrost udelukkende `external` (kan kun nås via `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) gør det muligt
for kaldende kode at filtrere efter, hvad en motor faktisk kan, i stedet for at
hardkode forgreninger for hvert id.

## Akse A — indlejrede tjenester (siden med overvågede processer)

- **Register over overvågede processer:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (i dag: `9router`, `cliproxy`).
- **Livscyklusejer:** `src/lib/services/ServiceSupervisor.ts` — `start()` starter
  underprocessen, afventer `waitForHealthy()`, leder stdout/stderr ind i en ringbuffer;
  `stop()` SIGTERM→SIGKILL; alt serialiseres under en lås.
- **Tilstandsunion** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, plus en
  ortogonal `HealthState = healthy | unhealthy | unknown`.
- **Hvorfor en separat proces (og ikke et SDK i processen)?** Procesisolering er det,
  der gør installation/start/stop/helbred/logfiler uafhængigt kontrollerbare for hver
  sidecar og gør det muligt at anvende loopback-startbeskyttelsen. Modellering af en
  adapter i processen er fremtidigt arbejde — capability-flaget `native-hot-path` er
  stedet, hvor dette ville blive udtrykt.

### Kontrakt for livscyklusruter (`/api/services/<tool>/…`)

Statuskoder er **tilstands-/verbum-/stispecifikke med vilje** — dette er kontrakten,
ikke inkonsistens:

| Kald                         | Betingelse                         | Status                               |
| ---------------------------- | ---------------------------------- | ------------------------------------ |
| `POST .../start`             | tjenesten er `not_installed`       | **409** (forudsætning)               |
| `POST .../stop`              | allerede stoppet                   | **200** (idempotent no-op)           |
| `GET .../status`             | OK                                 | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | startfejl                          | **503** (midlertidig)                |
| `GET .../status`, `.../stop` | ikke-opfanget fejl                 | **500**                              |
| `GET /api/services/<x>/logs` | ukendt værktøj `<x>`               | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | mangler `X-Reveal-Confirm: yes`    | **403** (kun 9router)                |
| **alle** `/api/services/*`   | kalder er ikke loopback/privat LAN | **403 LOCAL_ONLY**                   |

Alle fejlorganer formes af `createErrorResponse()` →
`{ error: { message, type }, requestId }`, hvor `type` afledes af statuskoden
(`500→server_error`, `404→not_found`, `409→conflict`, ellers `invalid_request`) og er
den maskinhandlingsrettede diskriminator. Meddelelser er forhåndssaniterede
(`sanitizeErrorMessage()`, fast regel nr. 12).

**Loopback-beskyttelsen** er den mest almindelige årsag til en `403`:
`/api/services/` findes i `LOCAL_ONLY_API_PREFIXES`
(`src/server/authz/routeGuard.ts`), og
`src/server/authz/policies/management.ts` afviser enhver kalder, som ikke er
loopback eller på et privat LAN, **før autentificering**, fordi disse ruter starter
underprocesser (faste regler 15 og 17). At tilgå dem gennem en offentlig tunnel giver
en `403` med vilje.

## Akse B — backend til relay-routing (dispatch-siden)

Kun relay-proxystien `/api/v1/relay/chat/completions` vælger en dispatch-backend;
hovedgrænsefladen `/api/v1/chat/completions` konsulterer aldrig
`routingBackend.ts`.

- **Valg** (`resolveRelayRoutingBackend`): én enkelt global miljøvariabel —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Hvis den ikke er angivet, bruges `auto`, når Bifrost er konfigureret+aktiveret,
  ellers `ts`.
- **Adfærd:**
  - `bifrost` (tvunget): Bifrost-fejl → definitiv `502`, intet fallback.
  - `auto`: prøv Bifrost; ved fejl/cooldown fortsættes lydløst til den native løsning.
  - `ts` / efter fallback: den native `open-sse`-translator-/executor-pipeline.
- **Cooldown:** fejl-cooldown pr. `baseUrl` i `bifrostCooldown.ts`.

Valget er **alt-eller-intet på relay-niveau i dag** — der er intet engineskift pr.
udbyder eller pr. anmodning på `release/v3.8.43`. Gate-funktionen pr. anmodning
tilføjes gennem arbejdet med sidecar-manifestet
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
hvilket gør det muligt for `auto` kun at dirigere udbydere, der er kvalificerede
ifølge manifestet, gennem Bifrost.

## Integration med dashboardet

Tjeneste-dashboardet poller `GET /api/services/<tool>/status` hvert 5. sekund via
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
som returnerer `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Der findes ingen delt kontekstprovider for tilgængelighed —
hver komponent kalder hooket for hvert værktøj. Ved `!res.ok` viser hooket i øjeblikket blot
`HTTP <status>`; at mappe feltet `error.type` til en letforståelig forklaring er en
planlagt UX-forbedring, ikke en kontraktændring.

## Konsekvenser

- Nye engines registreres én gang i `ROUTER_BACKENDS`; consumers får adgang til dem via capability-
  forespørgsler uden nye forgreninger pr. id.
- "Er dette en tjeneste eller en routing-backend?" besvares af feltet `lifecycle`, ikke
  af hvilken liste et id tilfældigvis optræder i.
- Bifrost-supervision (#5817) og migreringen af native hot paths (#5670) bygger videre på denne
  delte kontrakt i stedet for at særbehandle hver sidecar.
