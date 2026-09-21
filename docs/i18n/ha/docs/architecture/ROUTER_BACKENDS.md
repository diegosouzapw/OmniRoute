# Router Backends & Embedded Services — architecture contract (ADR) (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Matsayi:** An amince · **Mahallin magana:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kwangila:** `domain/routing/routerBackends.ts`
> (rijista mai nau'i — lambar za ta zo tare da [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Wannan ADR yana fayyace yadda injunan `ts` (na asali), `bifrost`, `cliproxy`, `9router`, da
injunan da suka dace da VibeProxy suke da alaƙa da juna, domin masu ba da gudummawa su daina
rikita abubuwa biyu da tsarin gine-ginensu ya bambanta. Yana bayyana rijista mai nau'i
da aikin router-backend-registry ya gabatar a matsayin tushen gaskiya guda ɗaya
na wannan tsari.

## Babban bambanci — ginshiƙai biyu masu zaman kansu

Ana bayyana rawar injin ta hanyar **ginshiƙai biyu masu zaman kansu**, waɗanda aka haɗa a cikin
`RouterBackendDefinition` na rijistar:

1. **Zagayowar rayuwa** (`RouterBackendLifecycle`) — _yadda injin yake aiki_:
   - `in-process` — yana gudana a cikin tsarin aiwatarwa na OmniRoute Node (bututun TS na asali).
   - `supervised` — tsarin aiwatarwa na gida da OmniRoute ke girkawa/farawa/tsayarwa/duba lafiyarsa
     ta hanyar `ServiceSupervisor`, sannan ya yi amfani da shi a matsayin haɗin mai bayarwa.
   - `external` — maƙurar HTTP da OmniRoute ke tura buƙatu zuwa gare ta amma **ba ya** sarrafa ta
     (ana saita ta da URL na tushe daga env).
   - `disabled` — an yi masa rajista amma ba za a iya zaɓarsa ba.
2. **Ginshikin zaɓi** (backend na sarrafa hanya ta relay) — _ko relay yana tura buƙatu zuwa gare shi_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` a cikin
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Kuskuren da ya kamata a guje masa: ɗaukar "sabis da aka saka ciki" da "backend na sarrafa hanya" a matsayin
jeri guda. Ba haka ba ne. Injin `supervised` (9router/cliproxy) **haɗin mai bayarwa ne
da bututun asali ke amfani da shi**, ba wani madadin backend na tura buƙatun relay ba.
`bifrost` kuwa akasin haka ne — backend ne na tura buƙatun relay wanda (a tarihi)
ya kasance `external` kawai.

## Rijistar — tushen gaskiya guda ɗaya

Kwangilar `domain/routing/routerBackends.ts` (lambar za ta zo tare da
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) tana ayyana kowane injin sau ɗaya, tare da
zagayowar rayuwarsa, ƙarfinsa, shaidar sabis, tashar tsoho, saitin lafiya, da
tallafin telemetri. Masu amfani suna nemo injuna ta hanyar `getRouterBackend(id)`,
`listRouterBackends()`, da `listRouterBackendsByCapability(cap)` maimakon
rubuta keɓantacciyar dabara ga kowane sidecar.

| Backend     | Zagayowar rayuwa | Sabis (ginshiƙi A) | Backend na relay (ginshiƙi B) | Lafiya        | Tashar tsoho |
| ----------- | ---------------- | ------------------ | ----------------------------- | ------------- | ------------ |
| `ts`        | `in-process`     | —                  | `ts` (na asali)               | —             | —            |
| `bifrost`   | `external`¹      | —¹                 | `bifrost` / `auto`            | `/health`     | —            |
| `cliproxy`  | `supervised`     | `cliproxy`         | — (mai bayarwa)               | `/v1/models`  | 8317         |
| `9router`   | `supervised`     | `9router`          | — (mai bayarwa)               | `/api/health` | 20130        |
| `vibeproxy` | `external`       | —                  | — (adaftar mai bayarwa)       | `/v1/models`  | —            |

¹ Ɗaukaka Bifrost zuwa sabis ɗin `supervised` da aka saka ciki (wanda za a iya girkawa/farawa
daga `/api/services/bifrost/`) ana bibiyarsa a
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); har sai an haɗa shi,
Bifrost yana kasancewa `external` kawai (ana iya isa gare shi ta `BIFROST_BASE_URL` kaɗai).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) suna bai wa masu kira
damar tacewa bisa abin da injin zai iya yi a zahiri maimakon rubuta rassa masu kebantaccen id.

## Axis A — ayyukan da aka haɗa a ciki (ɓangaren tsarin da ake sa ido)

- **Rajistar matakan aiki da ake sa ido:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (a halin yanzu: `9router`, `cliproxy`).
- **Mai kula da zagayowar rayuwa:** `src/lib/services/ServiceSupervisor.ts` — `start()` yana ƙaddamar da
  child process, yana jira ta hanyar `waitForHealthy()`, sannan yana shigar da stdout/stderr cikin ring buffer;
  `stop()` SIGTERM→SIGKILL; ana jera dukkan ayyukan ƙarƙashin lock.
- **Haɗakar yanayi** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, tare da
  `HealthState = healthy | unhealthy | unknown` mai zaman kansa.
- **Me ya sa ake amfani da process na daban (ba in-proc SDK ba)?** Ware process ne yake sa
  install/start/stop/health/logs su kasance abin sarrafawa dabam-dabam ga kowane sidecar, kuma yana ba da damar
  amfani da loopback spawn-guard. Samar da tsarin in-proc adapter aiki ne na gaba — tutar capability ta
  `native-hot-path` ce wurin da za a bayyana hakan.

### Yarjejeniyar route ta zagayowar rayuwa (`/api/services/<tool>/…`)

Status codes suna da **takamaiman state/verb/path bisa ƙira** — wannan ita ce yarjejeniyar, ba
rashin daidaito ba:

| Kira                         | Yanayi                            | Status                               |
| ---------------------------- | --------------------------------- | ------------------------------------ |
| `POST .../start`             | service yana `not_installed`      | **409** (sharadin farko)             |
| `POST .../stop`              | an riga an dakatar                | **200** (idempotent no-op)           |
| `GET .../status`             | OK                                | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | gazawar spawn                     | **503** (na wucin gadi)              |
| `GET .../status`, `.../stop` | kuskuren da ba a kama ba          | **500**                              |
| `GET /api/services/<x>/logs` | tool `<x>` da ba a sani ba        | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | babu `X-Reveal-Confirm: yes`      | **403** (9router kawai)              |
| **kowane** `/api/services/*` | caller ba loopback/private-LAN ba | **403 LOCAL_ONLY**                   |

Ana tsara dukkan jikin kurakurai ta `createErrorResponse()` →
`{ error: { message, type }, requestId }`, inda ake samo `type` daga status
(`500→server_error`, `404→not_found`, `409→conflict`, in ba haka ba `invalid_request`) kuma shi ne
abin rarrabewa da na'ura za ta iya ɗaukar mataki a kai. An riga an tsaftace saƙonni
(`sanitizeErrorMessage()`, Doka Mai Tsauri #12).

**Loopback guard** shi ne mafi yawan dalilin samun `403`: `/api/services/` yana cikin
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) kuma
`src/server/authz/policies/management.ts` yana ƙin duk caller da ba na loopback / private-LAN ba
**kafin auth**, saboda waɗannan routes suna ƙaddamar da child processes (Dokoki Masu Tsauri 15
da 17). Isa gare su ta public tunnel yana haifar da `403` bisa ƙira.

## Axis B — relay routing backend (ɓangaren dispatch)

Hanyar relay proxy `/api/v1/relay/chat/completions` kaɗai ce ke zaɓar dispatch
backend; babban surface na `/api/v1/chat/completions` ba ya taɓa duba
`routingBackend.ts`.

- **Zaɓi** (`resolveRelayRoutingBackend`): global env toggle guda ɗaya —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Idan ba a saita ba, `auto` idan an saita+kunna Bifrost, in ba haka ba `ts`.
- **Halayya:**
  - `bifrost` (tilas): gazawar Bifrost → cikakken `502`, babu fallback.
  - `auto`: gwada Bifrost, idan ya gaza/yana cooldown sai a wuce cikin shiru zuwa native.
  - `ts` / bayan fallback: tsarin native na translator/executor na `open-sse`.
- **Cooldown:** cooldown na gazawa ga kowane `baseUrl` a cikin `bifrostCooldown.ts`.

Zaɓin **duk ko babu ne a matakin relay a halin yanzu** — babu sauya engine ga kowane provider
ko kowace request a `release/v3.8.43`. Ana ƙara gate na kowace request
ta aikin sidecar-manifest
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
wanda ke ba `auto` damar tura providers da manifest ya amince da su kaɗai ta Bifrost.

## Haɗawa da dashboard

Dashboard ɗin ayyuka yana bincikar `GET /api/services/<tool>/status` kowane sakan 5 ta
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
yana dawo da `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Babu mai samar da mahallin samuwar da aka raba —
kowanne ɓangare yana kiran hook ɗin ga kowane tool. A kan `!res.ok`, a halin yanzu hook ɗin yana nuna
`HTTP <status>` kawai; danganta filin `error.type` da bayani mai sauƙin fahimta
ingantawar UX ce da ake bibiyarta, ba sauyin kwangila ba.

## Sakamako

- Sabbin engines suna yin rajista sau ɗaya a cikin `ROUTER_BACKENDS`; masu amfani suna samunsu ta hanyar tambayoyin
  capability ba tare da sabbin rassa na kowane id ba.
- "Shin wannan service ne ko routing backend?" ana amsa wannan ta filin `lifecycle`, ba
  ta jerin da wani id ya bayyana a ciki ba.
- Kulawar Bifrost (#5817) da ƙaura zuwa native hot-path (#5670) suna dogara da wannan
  kwangilar da aka raba maimakon keɓance kowane sidecar.
