# Router Backends & Embedded Services — architecture contract (ADR) (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Hali:** Imekubaliwa · **Muktadha:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Mkataba:** `domain/routing/routerBackends.ts`
> (rejista yenye aina — msimbo unaingia kupitia [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR hii inabainisha jinsi injini za `ts` (asili), `bifrost`, `cliproxy`, `9router`, na
zinazooana na VibeProxy zinavyohusiana, ili wachangiaji waache kuchanganya
mambo mawili ambayo ni tofauti kimusanifu. Inaweka kumbukumbu ya rejista yenye aina
iliyoanzishwa na kazi ya router-backend-registry kama chanzo pekee cha
ukweli wa modeli hiyo.

## Tofauti ya msingi — mihimili miwili inayojitegemea

Jukumu la injini linafafanuliwa na **mihimili miwili huru**, iliyosimbwa pamoja katika
`RouterBackendDefinition` ya rejista:

1. **Mzunguko wa maisha** (`RouterBackendLifecycle`) — _jinsi injini inavyoendeshwa_:
   - `in-process` — inaendeshwa ndani ya mchakato wa Node wa OmniRoute (mfululizo asili wa TS).
   - `supervised` — mchakato-toto wa ndani ambao OmniRoute husakinisha/huanzisha/husimamisha/hukagua afya yake
     kupitia `ServiceSupervisor`, kisha huitumia kama muunganisho wa mtoa huduma.
   - `external` — endpoint ya HTTP ambayo OmniRoute hutuma maombi kwake lakini **haisimamii**
     (imesanidiwa kwa URL ya msingi ya env).
   - `disabled` — imesajiliwa lakini haiwezi kuchaguliwa.
2. **Mhimili wa uteuzi** (backend ya uelekezaji wa relay) — _ikiwa relay hutuma maombi kwake_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` katika
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Kosa la kuepuka: kuchukulia "huduma iliyopachikwa" na "backend ya uelekezaji" kama
orodha moja. Si hivyo. Injini ya `supervised` (9router/cliproxy) ni **muunganisho wa
mtoa huduma unaotumiwa na mfululizo asili**, si backend mbadala ya utumaji wa relay.
`bifrost` ni kinyume chake — backend ya utumaji wa relay ambayo (kihistoria)
ilikuwa ya `external` pekee.

## Rejista — chanzo pekee cha ukweli

Mkataba wa `domain/routing/routerBackends.ts` (msimbo unaingia kupitia
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) hutangaza kila injini mara moja, pamoja na
mzunguko wake wa maisha, uwezo, utambulisho wa huduma, port chaguomsingi, usanidi wa
afya, na usaidizi wa telemetria. Watumiaji hutafuta injini kupitia `getRouterBackend(id)`,
`listRouterBackends()`, na `listRouterBackendsByCapability(cap)` badala ya
kuweka masharti maalumu kwa kila sidecar.

| Backend     | Mzunguko wa maisha | Huduma (mhimili A) | Backend ya relay (mhimili B) | Afya          | Port chaguomsingi |
| ----------- | ------------------ | ------------------ | ---------------------------- | ------------- | ----------------- |
| `ts`        | `in-process`       | —                  | `ts` (asili)                 | —             | —                 |
| `bifrost`   | `external`¹        | —¹                 | `bifrost` / `auto`           | `/health`     | —                 |
| `cliproxy`  | `supervised`       | `cliproxy`         | — (mtoa huduma)              | `/v1/models`  | 8317              |
| `9router`   | `supervised`       | `9router`          | — (mtoa huduma)              | `/api/health` | 20130             |
| `vibeproxy` | `external`         | —                  | — (adapta ya mtoa huduma)    | `/v1/models`  | —                 |

¹ Kupandishwa kwa Bifrost kuwa huduma iliyopachikwa ya `supervised` (inayoweza kusakinishwa/kuanzishwa
kutoka `/api/services/bifrost/`) kunafuatiliwa katika
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); hadi iunganishwe,
Bifrost ni ya `external` pekee (inafikiwa tu kupitia `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) huwaruhusu watumiaji
kuchuja kulingana na kile ambacho injini inaweza kufanya kwa kweli badala ya kuweka matawi ya masharti
yaliyowekwa moja kwa moja kwa kila id.

## Mhimili A — huduma zilizopachikwa (upande wa mchakato unaosimamiwa)

- **Rejista ya michakato inayosimamiwa:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (kwa sasa: `9router`, `cliproxy`).
- **Mmiliki wa mzunguko wa maisha:** `src/lib/services/ServiceSupervisor.ts` — `start()` huanzisha
  mchakato-toto, husubiri `waitForHealthy()`, na kuelekeza stdout/stderr kwenye bafa ya mzunguko;
  `stop()` hutumia SIGTERM→SIGKILL; yote hufanywa kwa mfuatano chini ya kufuli.
- **Muungano wa hali** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, pamoja na
  `HealthState = healthy | unhealthy | unknown` iliyo huru.
- **Kwa nini mchakato tofauti (badala ya SDK ya ndani ya mchakato)?** Utengaji wa michakato ndio unaowezesha
  usakinishaji/uanzishaji/usimamishaji/afya/kumbukumbu kudhibitiwa kwa kujitegemea kwa kila sidecar na kuruhusu
  kizuizi cha uanzishaji cha loopback kutumika. Kuunda muundo wa adapta ya ndani ya mchakato ni kazi ya baadaye —
  alama ya uwezo ya `native-hot-path` ndiyo sehemu ambapo hilo litaelezwa.

### Mkataba wa njia za mzunguko wa maisha (`/api/services/<tool>/…`)

Misimbo ya hali **imeundwa mahsusi kulingana na hali/kitenzi/njia** — huu ndio mkataba, si
kutokuwiana:

| Ombi                         | Hali                                | Hali                                 |
| ---------------------------- | ----------------------------------- | ------------------------------------ |
| `POST .../start`             | huduma iko `not_installed`          | **409** (sharti la awali)            |
| `POST .../stop`              | tayari imesimamishwa                | **200** (hakuna kitendo, idempotent) |
| `GET .../status`             | Sawa                                | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | kushindwa kuanzisha mchakato        | **503** (ya muda)                    |
| `GET .../status`, `.../stop` | hitilafu isiyonaswa                 | **500**                              |
| `GET /api/services/<x>/logs` | zana isiyojulikana `<x>`            | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` haipo       | **403** (`9router` pekee)            |
| **yoyote** `/api/services/*` | mwombaji si wa loopback/LAN binafsi | **403 LOCAL_ONLY**                   |

Miili yote ya hitilafu huundwa na `createErrorResponse()` →
`{ error: { message, type }, requestId }`, ambapo `type` hutokana na hali
(`500→server_error`, `404→not_found`, `409→conflict`, vinginevyo `invalid_request`) na ndiyo
kitofautishi kinachoweza kutumiwa na mashine. Ujumbe husafishwa mapema
(`sanitizeErrorMessage()`, Kanuni Kali #12).

**Kizuizi cha loopback** ndicho chanzo cha kawaida zaidi cha `403`: `/api/services/` imo ndani ya
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) na
`src/server/authz/policies/management.ts` hukataa mwombaji yeyote asiye wa loopback / LAN binafsi
**kabla ya uthibitishaji**, kwa sababu njia hizi huanzisha michakato-toto (Kanuni Kali 15
na 17). Kuzifikia kupitia handaki la umma husababisha `403` kwa mujibu wa usanifu.

## Mhimili B — mfumo wa nyuma wa uelekezaji wa relay (upande wa usambazaji)

Ni njia ya proksi ya relay `/api/v1/relay/chat/completions` pekee inayochagua mfumo wa nyuma
wa usambazaji; kiolesura kikuu cha `/api/v1/chat/completions` hakitumii kamwe
`routingBackend.ts`.

- **Uteuzi** (`resolveRelayRoutingBackend`): swichi moja ya kimataifa ya env —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ikiwa haijawekwa, huwa `auto` wakati Bifrost imesanidiwa+imewezeshwa, vinginevyo `ts`.
- **Tabia:**
  - `bifrost` (imelazimishwa): Bifrost ikishindwa → `502` thabiti, bila mbadala.
  - `auto`: jaribu Bifrost; ikishindwa/ikiwa kwenye kipindi cha kusubiri, endelea kimyakimya kutumia mfumo asilia.
  - `ts` / baada ya kutumia mbadala: mfululizo asilia wa kitafsiri/kitekelezaji wa `open-sse`.
- **Kipindi cha kusubiri:** kipindi cha kusubiri baada ya hitilafu kwa kila `baseUrl` katika `bifrostCooldown.ts`.

Kwa sasa uteuzi ni wa **yote-au-hakuna katika kiwango cha relay** — hakuna ubadilishaji wa injini
kwa kila mtoa huduma au kwa kila ombi kwenye `release/v3.8.43`. Kizuizi cha kila ombi kinaongezwa
kupitia kazi ya manifest ya sidecar
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ambacho huruhusu `auto` kuelekeza kupitia Bifrost watoa huduma wanaostahiki kulingana na manifest pekee.

## Ujumuishaji wa dashibodi

Dashibodi ya huduma huuliza `GET /api/services/<tool>/status` kila sekunde 5 kupitia
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
na kurejesha `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Hakuna mtoa muktadha wa pamoja wa upatikanaji —
kila kijenzi huita hook kwa kila zana. Kwenye `!res.ok`, hook kwa sasa huonyesha
`HTTP <status>` pekee; kuoanisha sehemu ya `error.type` na maelezo yanayoeleweka na
mtumiaji ni uboreshaji wa UX unaofuatiliwa, si mabadiliko ya mkataba.

## Matokeo

- Injini mpya husajiliwa mara moja katika `ROUTER_BACKENDS`; watumiaji huzipata kupitia
  hoja za uwezo bila matawi mapya mahususi kwa kila id.
- "Je, hii ni huduma au backend ya uelekezaji?" hujibiwa na sehemu ya `lifecycle`, si
  kwa kutegemea ni katika orodha ipi id imejitokeza.
- Usimamizi wa Bifrost (#5817) na uhamishaji asilia wa hot-path (#5670) hujengwa juu ya
  mkataba huu wa pamoja badala ya kushughulikia kila sidecar kwa njia maalum.
