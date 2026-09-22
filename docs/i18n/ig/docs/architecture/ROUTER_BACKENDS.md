# Router Backends & Embedded Services — architecture contract (ADR) (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Ọnọdụ:** A nabatara · **Ọnọdụ gbara ya gburugburu:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Nkwekọrịta:** `domain/routing/routerBackends.ts`
> (ndekọ nwere ụdị — koodu ga-abata na [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR a na-akọwapụta kpọmkwem otú injin `ts` (nke dị n'ime sistemụ), `bifrost`, `cliproxy`, `9router`, na injin ndị kwekọrọ na VibeProxy si metụta ibe ha, ka ndị na-enye onyinye kwụsị ịgwakọta ihe abụọ dị iche n'ihe owuwu ha. Ọ na-edekọ ndekọ nwere ụdị nke ọrụ router-backend-registry webatara dịka otu ebe eziokwu niile gbasara ụdị ahụ si apụta.

## Ọdịiche bụ isi — axis abụọ na-adabereghị na ibe ha

A na-akọwa ọrụ injin site na **axis abụọ na-adabereghị na ibe ha**, ndị e jikọtara ọnụ n'ime `RouterBackendDefinition` nke ndekọ ahụ:

1. **Usoro ndụ** (`RouterBackendLifecycle`) — _otu injin si arụ ọrụ_:
   - `in-process` — na-arụ ọrụ n'ime usoro Node nke OmniRoute (pipeline TS nke dị n'ime sistemụ).
   - `supervised` — usoro nwa dị na mpaghara nke OmniRoute na-etinye/na-amalite/na-akwụsị/na-enyocha ahụike ya site na `ServiceSupervisor`, ma mesịa jiri ya dịka njikọ onye na-eweta ọrụ.
   - `external` — endpoint HTTP nke OmniRoute na-ezigara arịrịọ ma ọ **naghị** ejikwa ya (a na-ahazi ya site na URL ntọala env).
   - `disabled` — edebanyere ya n'akwụkwọ mana enweghị ike ịhọrọ ya.
2. **Axis nhọrọ** (backend nhazi ụzọ relay) — _ma relay ọ na-ezigara ya arịrịọ_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` n'ime
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Mmejọ a ga-ezere: ile “ọrụ agbakwunyere n'ime sistemụ” na “backend nhazi ụzọ” anya dịka otu ndepụta. Ha abụghị otu. Injin `supervised` (9router/cliproxy) bụ **njikọ onye na-eweta ọrụ nke pipeline dị n'ime sistemụ na-eji**, ọ bụghị backend ọzọ relay nwere ike izigara arịrịọ. `bifrost` bụ ntụgharị nke a — backend relay na-ezigara arịrịọ nke (n'akụkọ ihe mere eme) bụ naanị `external`.

## Ndekọ ahụ — otu ebe eziokwu niile si apụta

Nkwekọrịta `domain/routing/routerBackends.ts` (koodu ga-abata na
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) na-ekwupụta injin ọ bụla naanị otu ugboro, tinyere usoro ndụ ya, ike ya, njirimara ọrụ ya, port ndabara ya, nhazi ahụike ya, na nkwado telemetry ya. Ndị na-eji ya na-achọ injin site na `getRouterBackend(id)`, `listRouterBackends()`, na `listRouterBackendsByCapability(cap)` kama ide ọnọdụ pụrụ iche maka sidecar nke ọ bụla.

| Backend     | Usoro ndụ    | Ọrụ (axis A) | Backend relay (axis B)        | Ahụike        | Port ndabara |
| ----------- | ------------ | ------------ | ----------------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —            | `ts` (nke dị n'ime sistemụ)   | —             | —            |
| `bifrost`   | `external`¹  | —¹           | `bifrost` / `auto`            | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`   | — (onye na-eweta ọrụ)         | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`    | — (onye na-eweta ọrụ)         | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —            | — (adapter onye na-eweta ọrụ) | `/v1/models`  | —            |

¹ A na-enyocha nkwalite Bifrost ka ọ bụrụ ọrụ `supervised` agbakwunyere n'ime sistemụ (nke enwere ike ịwụnye/ịmalite
site na `/api/services/bifrost/`) na
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); ruo mgbe e jikọtara ya,
Bifrost bụ naanị `external` (a na-enweta ya naanị site na `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) na-enye ndị na-akpọ ọrụ ohere inyocha dabere n'ihe injin nwere ike ime n'ezie kama ide ngalaba ọnọdụ kpọmkwem maka id nke ọ bụla.

## Akụkụ A — ọrụ ndị etinyere n'ime ya (akụkụ usoro a na-elekọta)

- **Ndebanye usoro ndị a na-elekọta:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ugbu a: `9router`, `cliproxy`).
- **Onye nwe okirikiri ndụ:** `src/lib/services/ServiceSupervisor.ts` — `start()` na-amalite
  usoro nwa, na-egbochi ruo mgbe `waitForHealthy()` mezuru, ma na-etinye stdout/stderr n'ime ring buffer;
  `stop()` SIGTERM→SIGKILL; a na-ahazi ha niile n'usoro n'okpuru mkpọchi.
- **Njikọ steeti** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, tinyere
  `HealthState = healthy | unhealthy | unknown` nke nọọrọ onwe ya.
- **Gịnị mere e ji eji usoro dị iche (ọ bụghị SDK dị n'ime usoro)?** Ikewapụ usoro bụ ihe na-eme ka
  a nwee ike ijikwa nrụnye/mmalite/nkwụsị/ahụike/ndekọ nke sidecar ọ bụla n'onwe ya, ma na-emekwa ka
  ihe nche spawn nke loopback rụọ ọrụ. Ịmepụta ụdị adapter dị n'ime usoro bụ ọrụ ọdịnihu — ọkọlọtọ
  ikike `native-hot-path` bụ ebe a ga-egosipụta nke ahụ.

### Nkwekọrịta ụzọ okirikiri ndụ (`/api/services/<tool>/…`)

A haziri koodu steeti ka ha bụrụ **ndị dabere kpọmkwem na steeti/verb/ụzọ** — nke a bụ nkwekọrịta ahụ, ọ bụghị
enweghị nkwekọ:

| Oku                          | Ọnọdụ                                    | Steeti                                        |
| ---------------------------- | ---------------------------------------- | --------------------------------------------- |
| `POST .../start`             | ọrụ bụ `not_installed`                   | **409** (ọnọdụ ga-ebu ụzọ mezuo)              |
| `POST .../stop`              | akwụsịlarị ya                            | **200** (enweghị ihe a na-eme nke idempotent) |
| `GET .../status`             | Ọ dị mma                                 | **200** (`live ?? row ?? "unknown"`)          |
| `POST .../start`             | ọdịda spawn                              | **503** (nke nwa oge)                         |
| `GET .../status`, `.../stop` | njehie a na-ejideghị                     | **500**                                       |
| `GET /api/services/<x>/logs` | ngwá ọrụ `<x>` amaghị ama                | **404** `Service '<x>' not found`             |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` adịghị           | **403** (naanị 9router)                       |
| **ọ bụla** `/api/services/*` | onye na-akpọ abụghị loopback/private-LAN | **403 LOCAL_ONLY**                            |

A na-enye body njehie niile ọdịdị site na `createErrorResponse()` →
`{ error: { message, type }, requestId }`, ebe a na-enweta `type` site na steeti ahụ
(`500→server_error`, `404→not_found`, `409→conflict`, ma ọ bụghị ya `invalid_request`) ma ọ bụ
ihe e ji amata njehie nke igwe nwere ike ime ihe na ya. A na-ehicha ozi tupu oge eruo
(`sanitizeErrorMessage()`, Iwu Siri Ike #12).

**Ihe nche loopback** bụ ihe na-ebutekarị `403`: `/api/services/` dị n'ime
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ma
`src/server/authz/policies/management.ts` na-ajụ onye ọ bụla na-akpọ nke na-abụghị loopback / private-LAN
**tupu nyocha njirimara**, n'ihi na ụzọ ndị a na-amalite usoro nwa (Iwu Siri Ike 15
na 17). Iji ọwara ọha rute ha na-enye `403` dịka e siri hazie ya.

## Akụkụ B — backend ntụgharị relay (akụkụ dispatch)

Ọ bụ naanị ụzọ proxy relay `/api/v1/relay/chat/completions` na-ahọrọ backend
dispatch; akụkụ isi `/api/v1/chat/completions` anaghị ele
`routingBackend.ts` anya ma ọlị.

- **Nhọrọ** (`resolveRelayRoutingBackend`): otu ngbanwe env zuru ụwa ọnụ —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ọ bụrụ na edobeghị ya, ọ bụ `auto` mgbe ahaziri+gbanyere Bifrost, ma ọ bụghị ya ọ bụ `ts`.
- **Omume:**
  - `bifrost` (amanye): ọdịda Bifrost → `502` siri ike, enweghị fallback.
  - `auto`: nwaa Bifrost, mgbe ọdịda/cooldown mere, jiri nwayọ gafere gaa na native.
  - `ts` / mgbe fallback gasịrị: usoro translator/executor `open-sse` nke native.
- **Cooldown:** cooldown ọdịda maka `baseUrl` ọ bụla dị na `bifrostCooldown.ts`.

Nhọrọ ahụ bụ **ihe niile-ma-ọ-bụ-ọnweghị-ihe n'ogo relay ugbu a** — enweghị mgbanwe engine
maka provider ọ bụla ma ọ bụ request ọ bụla na `release/v3.8.43`. Ọrụ sidecar-manifest
na-agbakwunye ihe mgbochi maka request ọ bụla
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
nke na-eme ka `auto` ziga naanị provider ndị manifest kwadoro site na Bifrost.

## Njikọ dashboard

Dashboard ọrụ na-ajụ `GET /api/services/<tool>/status` kwa sekọnd 5 site na
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
ma na-eweghachi `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Enweghị provider availability-context a na-ekekọrịta —
akụkụ ọ bụla na-akpọ hook ahụ maka tool nke ọ bụla. Mgbe `!res.ok`, hook ahụ na-egosi ugbu a naanị
`HTTP <status>`; ijikọ field `error.type` na nkọwa mmadụ ga-aghọta bụ
mmelite UX a na-enyocha, ọ bụghị mgbanwe contract.

## Nsonaazụ

- Engines ọhụrụ na-edebanye aha otu ugboro na `ROUTER_BACKENDS`; ndị na-eji ha na-enweta ha site na ajụjụ
  capability n'enweghị branches ọhụrụ nke dabere na id.
- A na-aza "Nke a ọ bụ service ka ọ bụ routing backend?" site na field `lifecycle`, ọ bụghị
  site na list nke id pụtara na ya.
- Nlekọta Bifrost (#5817) na mbugharị native hot-path (#5670) na-adabere na
  contract a a na-ekekọrịta kama ịmepụta ọnọdụ pụrụ iche maka sidecar nke ọ bụla.
