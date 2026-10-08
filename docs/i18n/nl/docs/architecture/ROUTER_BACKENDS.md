# Router Backends & Embedded Services — architecture contract (ADR) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Geaccepteerd · **Context:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contract:** `domain/routing/routerBackends.ts`
> (getypeerd register — code wordt toegevoegd met [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Deze ADR legt vast hoe `ts` (native), `bifrost`, `cliproxy`, `9router` en
VibeProxy-compatibele engines zich tot elkaar verhouden, zodat bijdragers niet
langer twee architectonisch verschillende zaken door elkaar halen. Het documenteert het
door het router-backend-registry-werk geïntroduceerde getypeerde register als de enige
bron van waarheid voor dat model.

## Het fundamentele onderscheid — twee orthogonale assen

De rol van een engine wordt beschreven door **twee onafhankelijke assen**, die samen zijn
vastgelegd in de `RouterBackendDefinition` van het register:

1. **Levenscyclus** (`RouterBackendLifecycle`) — _hoe de engine wordt uitgevoerd_:
   - `in-process` — wordt uitgevoerd binnen het OmniRoute Node-proces (de native TS-pipeline).
   - `supervised` — een lokaal childproces dat OmniRoute installeert/start/stopt/controleert
     via `ServiceSupervisor` en vervolgens gebruikt als providerverbinding.
   - `external` — een HTTP-endpoint waarnaar OmniRoute aanvragen doorstuurt, maar dat het **niet** beheert
     (geconfigureerd via een basis-URL in een omgevingsvariabele).
   - `disabled` — geregistreerd, maar niet selecteerbaar.
2. **Selectie-as** (routeringsbackend voor de relay) — _of de relay aanvragen ernaar doorstuurt_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` in
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

De fout die moet worden vermeden: een "ingebedde service" en een "routeringsbackend" als één
lijst behandelen. Dat zijn ze niet. Een `supervised` engine (9router/cliproxy) is een **providerverbinding
die door de native pipeline wordt gebruikt**, geen alternatieve backend voor relay-dispatch.
`bifrost` is het omgekeerde — een backend voor relay-dispatch die (historisch gezien)
uitsluitend `external` was.

## Het register — de enige bron van waarheid

Het contract `domain/routing/routerBackends.ts` (code wordt toegevoegd met
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) declareert elke engine één keer, met diens
levenscyclus, mogelijkheden, service-identiteit, standaardpoort, gezondheidsconfiguratie en
ondersteuning voor telemetrie. Consumers zoeken engines op via `getRouterBackend(id)`,
`listRouterBackends()` en `listRouterBackendsByCapability(cap)`, in plaats van
speciale logica voor elke sidecar te gebruiken.

| Backend     | Levenscyclus | Service (as A) | Relay-backend (as B) | Gezondheidscontrole | Standaardpoort |
| ----------- | ------------ | -------------- | -------------------- | ------------------- | -------------- |
| `ts`        | `in-process` | —              | `ts` (native)        | —                   | —              |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`   | `/health`           | —              |
| `cliproxy`  | `supervised` | `cliproxy`     | — (provider)         | `/v1/models`        | 8317           |
| `9router`   | `supervised` | `9router`      | — (provider)         | `/api/health`       | 20130          |
| `vibeproxy` | `external`   | —              | — (provideradapter)  | `/v1/models`        | —              |

¹ De promotie van Bifrost tot een `supervised` ingebedde service (installeerbaar/startbaar
vanuit `/api/services/bifrost/`) wordt bijgehouden in
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); totdat deze wordt samengevoegd,
is Bifrost uitsluitend `external` (alleen bereikbaar via `BIFROST_BASE_URL`).

Met `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) kunnen aanroepers
filteren op wat een engine daadwerkelijk kan, in plaats van per id hardgecodeerde vertakkingen te gebruiken.

## As A — ingebedde services (kant van het bewaakte proces)

- **Register van bewaakte processen:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (momenteel: `9router`, `cliproxy`).
- **Eigenaar van de levenscyclus:** `src/lib/services/ServiceSupervisor.ts` — `start()` start het
  childproces, wacht via `waitForHealthy()` totdat het gezond is en stuurt stdout/stderr naar een ringbuffer;
  `stop()` SIGTERM→SIGKILL; alles wordt onder een lock geserialiseerd.
- **Status-union** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, plus een
  orthogonale `HealthState = healthy | unhealthy | unknown`.
- **Waarom een afzonderlijk proces (en geen SDK in hetzelfde proces)?** Procesisolatie maakt het
  mogelijk om installatie/start/stop/gezondheid/logboeken voor elke sidecar onafhankelijk te beheren en zorgt ervoor dat de
  loopback-spawnbeveiliging kan worden toegepast. Het modelleren van een adapter in hetzelfde proces is toekomstig werk — de
  capabilityflag `native-hot-path` is waar dit zou worden uitgedrukt.

### Contract voor levenscyclusroutes (`/api/services/<tool>/…`)

Statuscodes zijn **bewust specifiek voor status/werkwoord/pad** — dit is het contract, geen
inconsistentie:

| Aanroep                      | Voorwaarde                            | Status                               |
| ---------------------------- | ------------------------------------- | ------------------------------------ |
| `POST .../start`             | service `not_installed`               | **409** (voorwaarde)                 |
| `POST .../stop`              | al gestopt                            | **200** (idempotente no-op)          |
| `GET .../status`             | OK                                    | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | fout bij starten proces               | **503** (tijdelijk)                  |
| `GET .../status`, `.../stop` | niet-afgevangen fout                  | **500**                              |
| `GET /api/services/<x>/logs` | onbekende tool `<x>`                  | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | ontbrekende `X-Reveal-Confirm: yes`   | **403** (alleen 9router)             |
| **elke** `/api/services/*`   | aanroeper niet via loopback/privé-LAN | **403 LOCAL_ONLY**                   |

Alle foutresponslichamen worden door `createErrorResponse()` vormgegeven als →
`{ error: { message, type }, requestId }`, waarbij `type` wordt afgeleid van de status
(`500→server_error`, `404→not_found`, `409→conflict`, anders `invalid_request`) en
de door machines verwerkbare discriminator is. Berichten worden vooraf opgeschoond
(`sanitizeErrorMessage()`, Harde regel #12).

**De loopbackbeveiliging** is de meest voorkomende oorzaak van een `403`: `/api/services/` staat in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) en
`src/server/authz/policies/management.ts` weigert elke aanroeper die niet via loopback of een privé-LAN komt
**vóór authenticatie**, omdat deze routes childprocessen starten (Harde regels 15
en 17). Ze via een openbare tunnel benaderen levert bewust een `403` op.

## As B — backend voor relayroutering (dispatchkant)

Alleen het relayproxypad `/api/v1/relay/chat/completions` selecteert een dispatchbackend;
het hoofdoppervlak `/api/v1/chat/completions` raadpleegt
`routingBackend.ts` nooit.

- **Selectie** (`resolveRelayRoutingBackend`): één globale omgevingsschakelaar —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Indien niet ingesteld: `auto` wanneer Bifrost geconfigureerd+ingeschakeld is, anders `ts`.
- **Gedrag:**
  - `bifrost` (afgedwongen): Bifrost-fout → harde `502`, geen fallback.
  - `auto`: probeer Bifrost; ga bij een fout/cooldown stilzwijgend door naar de native implementatie.
  - `ts` / na fallback: de native `open-sse`-translator-/executorpipeline.
- **Cooldown:** cooldown per `baseUrl` na een fout in `bifrostCooldown.ts`.

De selectie is momenteel **alles-of-niets op relayniveau** — er is geen enginewissel per provider
of per verzoek op `release/v3.8.43`. De gate per verzoek wordt toegevoegd
door het sidecar-manifestwerk
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
waardoor `auto` alleen providers die volgens het manifest in aanmerking komen via Bifrost kan routeren.

## Dashboardintegratie

Het servicedashboard bevraagt elke 5 seconden `GET /api/services/<tool>/status` via
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
waarbij `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` wordt geretourneerd. Er is geen gedeelde contextprovider voor beschikbaarheid —
elke component roept de hook per tool aan. Bij `!res.ok` toont de hook momenteel alleen
`HTTP <status>`; het koppelen van het veld `error.type` aan een begrijpelijke uitleg is een
geplande UX-verbetering, geen contractwijziging.

## Gevolgen

- Nieuwe engines worden eenmaal geregistreerd in `ROUTER_BACKENDS`; consumers krijgen er toegang toe via capabilityquery's
  zonder nieuwe vertakkingen per id.
- "Is dit een service of een routeringsbackend?" wordt bepaald door het veld `lifecycle`, niet
  door de lijst waarin een id toevallig voorkomt.
- De Bifrost-supervisie (#5817) en native hot-path-migratie (#5670) bouwen voort op dit
  gedeelde contract in plaats van elke sidecar als speciaal geval te behandelen.
