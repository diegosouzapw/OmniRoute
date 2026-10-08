# Router Backends & Embedded Services — architecture contract (ADR) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Godkänd · **Kontext:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrakt:** `domain/routing/routerBackends.ts`
> (typat register — koden levereras med [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Detta ADR fastställer hur `ts` (inbyggd), `bifrost`, `cliproxy`, `9router` och
VibeProxy-kompatibla motorer förhåller sig till varandra, så att bidragsgivare slutar
blanda ihop två saker som är arkitektoniskt åtskilda. Det dokumenterar det typade
register som introduceras av arbetet med router-backend-registret som den enda
sanningskällan för denna modell.

## Den grundläggande skillnaden — två ortogonala axlar

En motors roll beskrivs av **två oberoende axlar**, som tillsammans kodas i
registrets `RouterBackendDefinition`:

1. **Livscykel** (`RouterBackendLifecycle`) — _hur motorn körs_:
   - `in-process` — körs inuti OmniRoutes Node-process (den inbyggda TS-pipelinen).
   - `supervised` — en lokal underprocess som OmniRoute installerar/startar/stoppar/hälsokontrollerar
     via `ServiceSupervisor` och sedan använder som en leverantörsanslutning.
   - `external` — en HTTP-slutpunkt som OmniRoute skickar anrop till men **inte** hanterar
     (konfigureras genom en bas-URL i en miljövariabel).
   - `disabled` — registrerad men inte valbar.
2. **Urvalsaxel** (reläets routningsbackend) — _om reläet skickar anrop till den_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` i
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Misstaget som ska undvikas är att behandla ”inbäddad tjänst” och ”routningsbackend” som en
och samma lista. Det är de inte. En `supervised`-motor (9router/cliproxy) är en **leverantörsanslutning
som används av den inbyggda pipelinen**, inte en alternativ backend för relädispatch.
`bifrost` är motsatsen — en backend för relädispatch som (historiskt)
endast var `external`.

## Registret — den enda sanningskällan

Kontraktet `domain/routing/routerBackends.ts` (koden levereras med
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklarerar varje motor en gång, med dess
livscykel, funktioner, tjänsteidentitet, standardport, hälsokonfiguration och
telemetristöd. Konsumenter slår upp motorer via `getRouterBackend(id)`,
`listRouterBackends()` och `listRouterBackendsByCapability(cap)` i stället för
att specialhantera varje sidoprocess.

| Backend     | Livscykel    | Tjänst (axel A) | Reläbackend (axel B)   | Hälsa         | Standardport |
| ----------- | ------------ | --------------- | ---------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —               | `ts` (inbyggd)         | —             | —            |
| `bifrost`   | `external`¹  | —¹              | `bifrost` / `auto`     | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`      | — (leverantör)         | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`       | — (leverantör)         | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —               | — (leverantörsadapter) | `/v1/models`  | —            |

¹ Bifrosts uppgradering till en `supervised` inbäddad tjänst (som kan installeras/startas
från `/api/services/bifrost/`) följs i
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); fram till dess att den slås samman
är Bifrost endast `external` (kan enbart nås via `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) låter anropare
filtrera efter vad en motor faktiskt kan göra i stället för att hårdkoda förgreningar per id.

## Axel A — inbäddade tjänster (sidan för övervakade processer)

- **Register över övervakade processer:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (i dag: `9router`, `cliproxy`).
- **Livscykelägare:** `src/lib/services/ServiceSupervisor.ts` — `start()` startar
  underprocessen, inväntar `waitForHealthy()` och leder stdout/stderr till en ringbuffert;
  `stop()` SIGTERM→SIGKILL; allt serialiseras under ett lås.
- **Tillståndsunion** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, plus ett
  ortogonalt `HealthState = healthy | unhealthy | unknown`.
- **Varför en separat process (och inte ett SDK i samma process)?** Processisolering är det som gör
  installation/start/stopp/hälsa/loggar oberoende styrbara för varje sidecar och gör att
  skyddet för start via loopback kan tillämpas. Modellering av en adapter i samma process är framtida arbete —
  kapabilitetsflaggan `native-hot-path` är där detta skulle uttryckas.

### Kontrakt för livscykelrutter (`/api/services/<tool>/…`)

Statuskoderna är **avsiktligt specifika för tillstånd/verb/sökväg** — detta är kontraktet, inte
inkonsekvens:

| Anrop                        | Villkor                               | Status                               |
| ---------------------------- | ------------------------------------- | ------------------------------------ |
| `POST .../start`             | tjänsten är `not_installed`           | **409** (förvillkor)                 |
| `POST .../stop`              | redan stoppad                         | **200** (idempotent no-op)           |
| `GET .../status`             | OK                                    | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | startfel                              | **503** (övergående)                 |
| `GET .../status`, `.../stop` | ofångat fel                           | **500**                              |
| `GET /api/services/<x>/logs` | okänt verktyg `<x>`                   | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` saknas        | **403** (endast 9router)             |
| **alla** `/api/services/*`   | anroparen är inte loopback/privat LAN | **403 LOCAL_ONLY**                   |

Alla felkroppar formas av `createErrorResponse()` →
`{ error: { message, type }, requestId }`, där `type` härleds från statusen
(`500→server_error`, `404→not_found`, `409→conflict`, annars `invalid_request`) och är
den maskinåtgärdbara särskiljaren. Meddelandena saneras i förväg
(`sanitizeErrorMessage()`, strikt regel nr 12).

**Loopback-skyddet** är den vanligaste orsaken till en `403`: `/api/services/` finns i
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) och
`src/server/authz/policies/management.ts` avvisar alla anropare som inte kommer från loopback eller ett privat LAN
**före autentisering**, eftersom dessa rutter startar underprocesser (strikta regler 15
och 17). Att nå dem via en offentlig tunnel ger avsiktligt `403`.

## Axel B — routningsbackend för relä (dirigeringssidan)

Endast reläproxysökvägen `/api/v1/relay/chat/completions` väljer en backend för
dirigering; huvudytan `/api/v1/chat/completions` konsulterar aldrig
`routingBackend.ts`.

- **Val** (`resolveRelayRoutingBackend`): en enda global miljövariabel —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Om den inte är angiven används `auto` när Bifrost är konfigurerat och aktiverat, annars `ts`.
- **Beteende:**
  - `bifrost` (framtvingat): Bifrost-fel → direkt `502`, ingen reservlösning.
  - `auto`: prova Bifrost och fall tyst tillbaka till den inbyggda lösningen vid fel/nedkylning.
  - `ts` / efter reservlösning: den inbyggda `open-sse`-pipelinekedjan för översättning/exekvering.
- **Nedkylning:** felbaserad nedkylning per `baseUrl` i `bifrostCooldown.ts`.

Valet är **allt-eller-inget på relänivå i dag** — det finns inget byte av motor per leverantör
eller per begäran i `release/v3.8.43`. Grinden per begäran läggs till
genom arbetet med sidecar-manifestet
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
vilket gör att `auto` endast kan routa manifestberättigade leverantörer genom Bifrost.

## Dashboardintegration

Tjänstedashboarden avfrågar `GET /api/services/<tool>/status` var 5:e sekund via
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
och returnerar `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Det finns ingen gemensam kontextprovider för tillgänglighet —
varje komponent anropar hooken per verktyg. Vid `!res.ok` visar hooken för närvarande endast
`HTTP <status>`; att mappa fältet `error.type` till en begriplig förklaring är en
planerad UX-förbättring, inte en kontraktsändring.

## Konsekvenser

- Nya motorer registreras en gång i `ROUTER_BACKENDS`; konsumenter får tillgång till dem via kapabilitetsfrågor
  utan nya grenar per id.
- Frågan ”Är detta en tjänst eller en routingbackend?” besvaras av fältet `lifecycle`, inte
  av vilken lista ett id råkar förekomma i.
- Bifrost-övervakningen (#5817) och den inbyggda migreringen av den prestandakritiska kodvägen (#5670) bygger vidare på detta
  gemensamma kontrakt i stället för att specialhantera varje sidecar.
