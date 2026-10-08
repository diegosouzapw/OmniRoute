# Router Backends & Embedded Services — architecture contract (ADR) (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **තත්ත්වය:** පිළිගෙන ඇත · **සන්දර්භය:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **ගිවිසුම:** `domain/routing/routerBackends.ts`
> (ටයිප් කළ රෙජිස්ට්රිය — කේතය [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) සමඟ එක් වේ)

මෙම ADR මඟින් `ts` (ස්වදේශීය), `bifrost`, `cliproxy`, `9router`, සහ
VibeProxy-අනුකූල එන්ජින් එකිනෙකට සම්බන්ධ වන ආකාරය නිශ්චිතව දක්වයි, එමඟින් දායකයන්
වාස්තු විද්යාත්මකව වෙනස් කරුණු දෙකක් එකක් ලෙස වරදවා වටහා ගැනීම වළක්වයි. එම ආකෘතිය සඳහා
සත්යයේ එකම මූලාශ්රය ලෙස router-backend-registry කාර්යය මඟින් හඳුන්වා දුන් ටයිප් කළ
රෙජිස්ට්රිය මෙය ලේඛනගත කරයි.

## මූලික වෙනස — එකිනෙකට ස්වායත්ත අක්ෂ දෙකක්

එන්ජිමක භූමිකාව **ස්වාධීන අක්ෂ දෙකක්** මඟින් විස්තර කර ඇති අතර, ඒවා රෙජිස්ට්රියේ
`RouterBackendDefinition` තුළ එක්ව කේතනය කර ඇත:

1. **ජීවන චක්රය** (`RouterBackendLifecycle`) — _එන්ජිම ක්රියාත්මක වන ආකාරය_:
   - `in-process` — OmniRoute Node ක්රියාවලිය තුළ ක්රියාත්මක වේ (ස්වදේශීය TS නළ මාර්ගය).
   - `supervised` — OmniRoute විසින් `ServiceSupervisor` හරහා ස්ථාපනය/ආරම්භ/නතර/සෞඛ්ය පරීක්ෂා කර,
     පසුව සැපයුම්කරු සම්බන්ධතාවක් ලෙස භාවිත කරන දේශීය උප ක්රියාවලියකි.
   - `external` — OmniRoute විසින් ඉල්ලීම් යොමු කරන නමුත් කළමනාකරණය **නොකරන**
     HTTP අන්ත ලක්ෂ්යයකි (env මූලික URL එකකින් වින්යාස කර ඇත).
   - `disabled` — ලියාපදිංචි කර ඇති නමුත් තෝරාගත නොහැක.
2. **තේරීම් අක්ෂය** (relay routing backend) — _relay එක එයට ඉල්ලීම් යොමු කරන්නේද යන්න_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` යන්න
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` තුළ ඇත.

වළක්වා ගත යුතු වරද: "කාවැද්දූ සේවාව" සහ "routing backend" එකම
ලැයිස්තුවක් ලෙස සැලකීමයි. ඒවා එකක් නොවේ. `supervised` එන්ජිමක් (9router/cliproxy) යනු
**ස්වදේශීය නළ මාර්ගය විසින් භාවිත කරන සැපයුම්කරු සම්බන්ධතාවක්** මිස විකල්ප relay dispatch
backend එකක් නොවේ. `bifrost` එහි ප්රතිවිරුද්ධයයි — (ඓතිහාසිකව)
`external`-පමණක් වූ relay dispatch backend එකකි.

## රෙජිස්ට්රිය — සත්යයේ එකම මූලාශ්රය

`domain/routing/routerBackends.ts` ගිවිසුම ([#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) සමඟ කේතය එක් වේ) සෑම එන්ජිමක්ම එහි
ජීවන චක්රය, හැකියාවන්, සේවා අනන්යතාව, පෙරනිමි port එක, සෞඛ්ය වින්යාසය සහ
telemetry සහාය සමඟ එක් වරක් ප්රකාශ කරයි. එක් එක් sidecar සඳහා වෙන වෙනම විශේෂ අවස්ථා
යෙදීම වෙනුවට, භාවිත කරන්නන් `getRouterBackend(id)`,
`listRouterBackends()`, සහ `listRouterBackendsByCapability(cap)` හරහා එන්ජින්
සොයා බලයි.

| Backend     | ජීවන චක්රය   | සේවාව (අක්ෂය A) | Relay backend (අක්ෂය B) | සෞඛ්යය        | පෙරනිමි port එක |
| ----------- | ------------ | --------------- | ----------------------- | ------------- | --------------- |
| `ts`        | `in-process` | —               | `ts` (ස්වදේශීය)         | —             | —               |
| `bifrost`   | `external`¹  | —¹              | `bifrost` / `auto`      | `/health`     | —               |
| `cliproxy`  | `supervised` | `cliproxy`      | — (සැපයුම්කරු)          | `/v1/models`  | 8317            |
| `9router`   | `supervised` | `9router`       | — (සැපයුම්කරු)          | `/api/health` | 20130           |
| `vibeproxy` | `external`   | —               | — (සැපයුම්කරු ඇඩැප්ටරය) | `/v1/models`  | —               |

¹ Bifrost, `supervised` කාවැද්දූ සේවාවක් ලෙස උසස් කිරීම (`/api/services/bifrost/`
වෙතින් ස්ථාපනය/ආරම්භ කළ හැකි වීම)
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) තුළ නිරීක්ෂණය කරයි; එය ඒකාබද්ධ වන තුරු,
Bifrost `external`-පමණි (`BIFROST_BASE_URL` හරහා පමණක් ළඟා විය හැක).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) මඟින් කැඳවුම්කරුවන්ට
එක් එක් id සඳහා ශාඛා දෘඪ-කේතනය කිරීම වෙනුවට, එන්ජිමකට සැබවින්ම කළ හැකි දේ අනුව
පෙරීමට ඉඩ සලසයි.

## අක්ෂය A — අන්තර්ගත සේවා (අධීක්ෂිත ක්රියාවලි පැත්ත)

- **අධීක්ෂිත ක්රියාවලි ලේඛනය:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (දැනට: `9router`, `cliproxy`).
- **ජීවන චක්රයේ හිමිකරු:** `src/lib/services/ServiceSupervisor.ts` — `start()` මඟින්
  අනු ක්රියාවලිය ආරම්භ කරයි, `waitForHealthy()` මත පදනම්ව ඉදිරියට යාම පාලනය කරයි, stdout/stderr වළලු බෆරයකට සම්බන්ධ කරයි;
  `stop()` SIGTERM→SIGKILL; සියල්ල අගුලක් යටතේ අනුක්රමිකව ක්රියාත්මක වේ.
- **තත්ත්ව එකතුව** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, ඊට අමතරව
  ස්වායත්ත `HealthState = healthy | unhealthy | unknown`.
- **වෙනම ක්රියාවලියක් ඇයි (in-proc SDK එකක් නොවන්නේ ඇයි)?** සෑම sidecar එකක් සඳහාම
  ස්ථාපනය/ආරම්භය/නැවැත්වීම/සෞඛ්යය/ලොග් ස්වාධීනව පාලනය කිරීමටත්,
  loopback spawn-guard එක යෙදීමටත් හැකි වන්නේ ක්රියාවලි හුදකලා කිරීම නිසාය. in-proc adapter එකක් ආකෘතිගත කිරීම අනාගත කාර්යයකි — එය ප්රකාශ කෙරෙන්නේ
  `native-hot-path` හැකියා ධජය තුළය.

### ජීවන චක්ර route ගිවිසුම (`/api/services/<tool>/…`)

තත්ත්ව කේත **සැලසුම අනුව තත්ත්වය/ක්රියාව/path එකට විශේෂිතය** — මෙය ගිවිසුමයි,
නොගැළපීමක් නොවේ:

| ඇමතුම                        | කොන්දේසිය                           | තත්ත්වය                              |
| ---------------------------- | ----------------------------------- | ------------------------------------ |
| `POST .../start`             | සේවාව `not_installed`               | **409** (පූර්ව කොන්දේසිය)            |
| `POST .../stop`              | දැනටමත් නවතා ඇත                     | **200** (idempotent කිසිවක් නොකිරීම) |
| `GET .../status`             | හරි                                 | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | spawn අසමත් වීම                     | **503** (තාවකාලික)                   |
| `GET .../status`, `.../stop` | හසු නොකළ දෝෂයක්                     | **500**                              |
| `GET /api/services/<x>/logs` | නොදන්නා මෙවලමක් `<x>`               | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` නොමැත       | **403** (9router සඳහා පමණි)          |
| **ඕනෑම** `/api/services/*`   | ඇමතුම්කරු loopback/private-LAN නොවේ | **403 LOCAL_ONLY**                   |

සියලු දෝෂ body, `createErrorResponse()` මඟින් →
`{ error: { message, type }, requestId }` ලෙස හැඩගන්වා ඇත; මෙහි `type` තත්ත්වයෙන්
ව්යුත්පන්න වේ (`500→server_error`, `404→not_found`, `409→conflict`, අනෙක් ඒවා `invalid_request`)
සහ එය යන්ත්රයකින් ක්රියාත්මක කළ හැකි වෙනස්කම් හඳුනාගැනීමේ අගය වේ. පණිවිඩ කලින්ම සනීපාරක්ෂිත කර ඇත
(`sanitizeErrorMessage()`, දැඩි රීතිය #12).

**loopback guard එක** `403` එකකට වඩාත් පොදු හේතුවයි: `/api/services/` යනු
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) තුළ ඇති අතර,
මෙම route අනු ක්රියාවලි ආරම්භ කරන බැවින් (දැඩි රීති 15
සහ 17), `src/server/authz/policies/management.ts` ඕනෑම loopback නොවන / private-LAN නොවන
ඇමතුම්කරුවෙකු **සත්යාපනයට පෙර** ප්රතික්ෂේප කරයි. පොදු tunnel එකක් හරහා ඒවාට ළඟාවීම සැලසුම අනුවම `403` වේ.

## අක්ෂය B — relay routing backend (dispatch පැත්ත)

dispatch backend එකක් තෝරන්නේ relay proxy path එක වන `/api/v1/relay/chat/completions`
පමණි; ප්රධාන `/api/v1/chat/completions` පෘෂ්ඨය කිසිවිටෙකත්
`routingBackend.ts` විමසන්නේ නැත.

- **තේරීම** (`resolveRelayRoutingBackend`): තනි ගෝලීය env toggle එකක් —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  එය සකසා නොමැති නම්, Bifrost වින්යාස කර+සක්රීය කර ඇති විට `auto`, නැතිනම් `ts`.
- **හැසිරීම:**
  - `bifrost` (බලකරන ලද): Bifrost අසමත් වීම → ස්ථිර `502`, fallback එකක් නැත.
  - `auto`: Bifrost උත්සාහ කරයි; අසමත් වීමකදී/cooldown අවස්ථාවකදී නිහඬව native වෙත යයි.
  - `ts` / fallback එකෙන් පසු: native `open-sse` පරිවර්තක/ක්රියාත්මකකාරක pipeline එක.
- **Cooldown:** `bifrostCooldown.ts` තුළ එක් එක් `baseUrl` සඳහා අසමත් වීමේ cooldown එකක්.

අද වන විට තේරීම relay මට්ටමේදී **සියල්ල-හෝ-කිසිවක්-නැත** ආකාරයේය —
`release/v3.8.43` මත එක් එක් provider හෝ එක් එක් request සඳහා engine මාරු කිරීමක් නොමැත. එක් එක් request සඳහා වන gate එක sidecar-manifest කාර්යය මඟින් එක් කෙරෙමින් පවතී
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`);
එමඟින් `auto` හට manifest-සුදුසුකම් ඇති providers පමණක් Bifrost හරහා route කිරීමට ඉඩ ලැබේ.

## උපකරණ පුවරු ඒකාබද්ධ කිරීම

සේවා උපකරණ පුවරුව,
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` හරහා සෑම තත්පර 5කට වරක්ම `GET /api/services/<tool>/status` විමසමින්,
`{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` ආපසු ලබා දෙයි. හවුල් availability-context සැපයුම්කරුවෙකු නොමැත —
සෑම සංරචකයක්ම එක් එක් මෙවලම සඳහා hook එක අමතයි. `!res.ok` වූ විට, hook එක දැනට
සරල `HTTP <status>` පමණක් පෙන්වයි; `error.type` ක්ෂේත්රය මිනිසුන්ට තේරුම්ගත හැකි පැහැදිලි කිරීමකට
සිතියම්ගත කිරීම, ගිවිසුම් වෙනසක් නොව, ලුහුබඳින ලද UX වැඩිදියුණු කිරීමකි.

## ප්රතිවිපාක

- නව එන්ජින් `ROUTER_BACKENDS` තුළ එක් වරක් ලියාපදිංචි වේ; නව එක් එක් id සඳහා ශාඛා නොමැතිව,
  හැකියා විමසුම් හරහා පාරිභෝගිකයන්ට ඒවා ලැබේ.
- "මෙය සේවාවක්ද නැතහොත් මාර්ගගත කිරීමේ පසුබිම් පද්ධතියක්ද?" යන්න තීරණය වන්නේ `lifecycle` ක්ෂේත්රය මඟින් මිස,
  යම් id එකක් අහඹු ලෙස දිස්වන ලැයිස්තුව අනුව නොවේ.
- Bifrost අධීක්ෂණය (#5817) සහ ස්වදේශීය hot-path සංක්රමණය (#5670), එක් එක් sidecar එක
  විශේෂ අවස්ථාවක් ලෙස සැලකීම වෙනුවට මෙම හවුල් ගිවිසුම මත ගොඩනැගේ.
