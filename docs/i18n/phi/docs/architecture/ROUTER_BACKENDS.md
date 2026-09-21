# Router Backends & Embedded Services — architecture contract (ADR) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Katayuan:** Tinanggap · **Konteksto:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrata:** `domain/routing/routerBackends.ts`
> (may-type na registry — kasama ang code sa [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Itinatakda ng ADR na ito kung paano nauugnay sa isa't isa ang `ts` (native), `bifrost`, `cliproxy`, `9router`, at mga engine na compatible sa VibeProxy, upang hindi na pag-isahin ng mga contributor ang dalawang bagay na magkaiba sa arkitektura. Idinudokumento nito ang may-type na registry na ipinakilala ng gawain sa router-backend-registry bilang nag-iisang source of truth para sa modelong iyon.

## Ang pangunahing pagkakaiba — dalawang orthogonal na axis

Inilalarawan ang tungkulin ng isang engine gamit ang **dalawang hiwalay na axis**, na magkasamang naka-encode sa `RouterBackendDefinition` ng registry:

1. **Lifecycle** (`RouterBackendLifecycle`) — _kung paano tumatakbo ang engine_:
   - `in-process` — tumatakbo sa loob ng proseso ng OmniRoute Node (ang native na TS pipeline).
   - `supervised` — isang lokal na child process na ini-install/sinisimulan/ihihinto/sinusuri ang kalagayan ng OmniRoute sa pamamagitan ng `ServiceSupervisor`, at pagkatapos ay ginagamit bilang isang provider connection.
   - `external` — isang HTTP endpoint na pinapadalhan ng OmniRoute ngunit **hindi** nito pinamamahalaan
     (kino-configure gamit ang env base URL).
   - `disabled` — nakarehistro ngunit hindi mapipili.
2. **Selection axis** (relay routing backend) — _kung ipinapadala rito ng relay ang kahilingan_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` sa
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Ang pagkakamaling dapat iwasan: ang pagturing sa "embedded service" at "routing backend" bilang iisang listahan. Hindi magkapareho ang mga ito. Ang isang `supervised` na engine (9router/cliproxy) ay isang **provider connection na ginagamit ng native pipeline**, hindi isang alternatibong relay dispatch backend. Kabaligtaran naman ang `bifrost` — isa itong relay dispatch backend na (sa kasaysayan) ay `external`-only.

## Ang registry — nag-iisang source of truth

Idinedeklara nang isang beses ng kontratang `domain/routing/routerBackends.ts` (kasama ang code sa [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) ang bawat engine, kasama ang lifecycle, capabilities, service identity, default port, health config, at suporta sa telemetry nito. Hinahanap ng mga consumer ang mga engine sa pamamagitan ng `getRouterBackend(id)`, `listRouterBackends()`, at `listRouterBackendsByCapability(cap)` sa halip na maglagay ng espesyal na kundisyon para sa bawat sidecar.

| Backend     | Lifecycle    | Serbisyo (axis A) | Relay backend (axis B) | Kalagayan     | Default na port |
| ----------- | ------------ | ----------------- | ---------------------- | ------------- | --------------- |
| `ts`        | `in-process` | —                 | `ts` (native)          | —             | —               |
| `bifrost`   | `external`¹  | —¹                | `bifrost` / `auto`     | `/health`     | —               |
| `cliproxy`  | `supervised` | `cliproxy`        | — (provider)           | `/v1/models`  | 8317            |
| `9router`   | `supervised` | `9router`         | — (provider)           | `/api/health` | 20130           |
| `vibeproxy` | `external`   | —                 | — (provider adapter)   | `/v1/models`  | —               |

¹ Ang pag-promote sa Bifrost bilang isang `supervised` na embedded service (maaaring i-install/simulan mula sa `/api/services/bifrost/`) ay sinusubaybayan sa [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); hanggang sa ma-merge ito, ang Bifrost ay `external`-only (maaabot lamang sa pamamagitan ng `BIFROST_BASE_URL`).

Nagbibigay-daan ang `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) sa mga caller na mag-filter batay sa kung ano talaga ang kayang gawin ng isang engine sa halip na mag-hard-code ng mga branch para sa bawat id.

## Axis A — mga naka-embed na serbisyo (panig ng pinangangasiwaang proseso)

- **Registry ng mga pinangangasiwaang proseso:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (sa kasalukuyan: `9router`, `cliproxy`).
- **May-ari ng lifecycle:** `src/lib/services/ServiceSupervisor.ts` — ang `start()` ay naglulunsad ng
  child process, naghihintay sa `waitForHealthy()`, at naglalagay ng stdout/stderr sa isang ring buffer;
  ang `stop()` ay SIGTERM→SIGKILL; lahat ay sunud-sunod na isinasagawa sa ilalim ng isang lock.
- **Union ng estado** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, kasama ang isang
  hiwalay na `HealthState = healthy | unhealthy | unknown`.
- **Bakit hiwalay na proseso (at hindi in-proc SDK)?** Ang process isolation ang dahilan kung bakit
  maaaring kontrolin nang hiwalay ang install/start/stop/health/logs para sa bawat sidecar at
  mailapat ang loopback spawn-guard. Ang pagmomodelo ng in-proc adapter ay gawain para sa hinaharap — sa
  capability flag na `native-hot-path` ito ipapahayag.

### Kontrata ng lifecycle route (`/api/services/<tool>/…`)

Ang mga status code ay **sadyang nakabatay sa partikular na estado/pandiwa/path** — ito ang kontrata,
hindi isang hindi pagkakapare-pareho:

| Tawag                         | Kondisyon                                | Status                               |
| ----------------------------- | ---------------------------------------- | ------------------------------------ |
| `POST .../start`              | `not_installed` ang serbisyo             | **409** (precondition)               |
| `POST .../stop`               | nakahinto na                             | **200** (idempotent na no-op)        |
| `GET .../status`              | OK                                       | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`              | pagkabigo sa pag-spawn                   | **503** (pansamantala)               |
| `GET .../status`, `.../stop`  | hindi nahuling error                     | **500**                              |
| `GET /api/services/<x>/logs`  | hindi kilalang tool na `<x>`             | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`   | nawawala ang `X-Reveal-Confirm: yes`     | **403** (9router lamang)             |
| **anumang** `/api/services/*` | hindi loopback/private-LAN ang tumatawag | **403 LOCAL_ONLY**                   |

Ang lahat ng error body ay hinuhubog ng `createErrorResponse()` →
`{ error: { message, type }, requestId }`, kung saan ang `type` ay hinango mula sa status
(`500→server_error`, `404→not_found`, `409→conflict`, kung hindi ay `invalid_request`) at ito ang
discriminator na maaaring aksiyunan ng makina. Paunang sina-sanitize ang mga mensahe
(`sanitizeErrorMessage()`, Mahigpit na Panuntunan #12).

**Ang loopback guard** ang pinakakaraniwang pinagmumulan ng `403`: kasama ang `/api/services/` sa
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) at tinatanggihan ng
`src/server/authz/policies/management.ts` ang sinumang tumatawag na hindi loopback / hindi private-LAN
**bago ang auth**, dahil naglulunsad ng mga child process ang mga route na ito (Mahihigpit na Panuntunan 15
at 17). Ang pag-access sa mga ito sa pamamagitan ng pampublikong tunnel ay sadyang nagbabalik ng `403`.

## Axis B — backend ng relay routing (panig ng dispatch)

Tanging ang relay proxy path na `/api/v1/relay/chat/completions` ang pumipili ng dispatch
backend; hindi kailanman kumokonsulta sa `routingBackend.ts` ang pangunahing
surface na `/api/v1/chat/completions`.

- **Pagpili** (`resolveRelayRoutingBackend`): iisang pandaigdigang env toggle —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Kung hindi nakatakda, `auto` kapag naka-configure+naka-enable ang Bifrost, kung hindi ay `ts`.
- **Pag-uugali:**
  - `bifrost` (sapilitan): pagkabigo ng Bifrost → hard `502`, walang fallback.
  - `auto`: subukan ang Bifrost; kapag nabigo/nasa cooldown, tahimik na lumipat sa native.
  - `ts` / pagkatapos ng fallback: ang native na `open-sse` translator/executor pipeline.
- **Cooldown:** cooldown sa pagkabigo para sa bawat `baseUrl` sa `bifrostCooldown.ts`.

Ang pagpili ay **all-or-nothing sa antas ng relay sa kasalukuyan** — walang per-provider
o per-request na pagpapalit ng engine sa `release/v3.8.43`. Idinaragdag ang per-request gate
sa pamamagitan ng sidecar-manifest work
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
na nagbibigay-daan sa `auto` na idaan lamang sa Bifrost ang mga provider na kuwalipikado ayon sa manifest.

## Integrasyon ng dashboard

Pana-panahong nagpapadala ang dashboard ng mga serbisyo ng request sa `GET /api/services/<tool>/status` bawat 5s sa pamamagitan ng
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
na nagbabalik ng `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Walang nakabahaging availability-context provider —
tinatawag ng bawat component ang hook para sa bawat tool. Sa `!res.ok`, kasalukuyang nagpapakita
ang hook ng payak na `HTTP <status>`; ang pagmamapa ng `error.type` field sa isang
paliwanag na madaling maunawaan ay isang sinusubaybayang pagpapahusay sa UX, hindi pagbabago sa contract.

## Mga kahihinatnan

- Isang beses lang nirerehistro ang mga bagong engine sa `ROUTER_BACKENDS`; nakukuha
  ng mga consumer ang mga ito sa pamamagitan ng mga capability query nang walang mga bagong branch para sa bawat id.
- Ang "Serbisyo ba ito o routing backend?" ay sinasagot ng `lifecycle` field, hindi
  ng kung saang listahan nagkataong lumitaw ang isang id.
- Nakabatay ang Bifrost supervision (#5817) at native hot-path migration (#5670) sa
  nakabahaging contract na ito sa halip na espesyal na pangasiwaan ang bawat sidecar.
