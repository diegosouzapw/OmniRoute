# Router Backends & Embedded Services — architecture contract (ADR) (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **നില:** അംഗീകരിച്ചു · **സന്ദർഭം:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **കരാർ:** `domain/routing/routerBackends.ts`
> (ടൈപ്പ് ചെയ്ത രജിസ്ട്രി — കോഡ് [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-നോടൊപ്പം ലഭ്യമാകും)

`ts` (നേറ്റീവ്), `bifrost`, `cliproxy`, `9router`, കൂടാതെ
VibeProxy-അനുയോജ്യമായ എഞ്ചിനുകൾ പരസ്പരം എങ്ങനെ ബന്ധപ്പെട്ടിരിക്കുന്നു എന്ന് ഈ ADR കൃത്യമായി നിർവചിക്കുന്നു; ഇതിലൂടെ വാസ്തുവിദ്യാപരമായി വ്യത്യസ്തമായ രണ്ട് കാര്യങ്ങൾ സംഭാവകർ കൂട്ടിക്കുഴയ്ക്കുന്നത് ഒഴിവാക്കാം. router-backend-registry പ്രവർത്തനത്തിലൂടെ അവതരിപ്പിച്ച ടൈപ്പ് ചെയ്ത
രജിസ്ട്രിയെ ഈ മോഡലിന്റെ ഏക ആധികാരിക സ്രോതസ്സായി ഇത് രേഖപ്പെടുത്തുന്നു.

## അടിസ്ഥാനപരമായ വ്യത്യാസം — പരസ്പരം സ്വതന്ത്രമായ രണ്ട് അക്ഷങ്ങൾ

ഒരു എഞ്ചിന്റെ പങ്ക് **രണ്ട് സ്വതന്ത്ര അക്ഷങ്ങൾ** ഉപയോഗിച്ചാണ് വിവരിക്കുന്നത്; അവ രജിസ്ട്രിയിലെ
`RouterBackendDefinition`-ൽ ഒരുമിച്ച് എൻകോഡ് ചെയ്തിരിക്കുന്നു:

1. **ലൈഫ്സൈക്കിൾ** (`RouterBackendLifecycle`) — _എഞ്ചിൻ എങ്ങനെ പ്രവർത്തിക്കുന്നു_:
   - `in-process` — OmniRoute Node പ്രോസസിനുള്ളിൽ പ്രവർത്തിക്കുന്നു (നേറ്റീവ് TS പൈപ്പ്ലൈൻ).
   - `supervised` — `ServiceSupervisor` വഴി OmniRoute ഇൻസ്റ്റാൾ/ആരംഭിക്കുക/നിർത്തുക/ആരോഗ്യനില പരിശോധിക്കുക ചെയ്യുന്ന
     ഒരു ലോക്കൽ ചൈൽഡ് പ്രോസസ്; തുടർന്ന് അതിനെ ഒരു പ്രൊവൈഡർ കണക്ഷനായി ഉപയോഗിക്കുന്നു.
   - `external` — OmniRoute അഭ്യർത്ഥനകൾ അയയ്ക്കുന്ന, എന്നാൽ മാനേജ് **ചെയ്യാത്ത**
     ഒരു HTTP എൻഡ്പോയിന്റ് (env അടിസ്ഥാന URL ഉപയോഗിച്ച് കോൺഫിഗർ ചെയ്യുന്നത്).
   - `disabled` — രജിസ്റ്റർ ചെയ്തിട്ടുണ്ടെങ്കിലും തിരഞ്ഞെടുക്കാനാകില്ല.
2. **തിരഞ്ഞെടുപ്പ് അക്ഷം** (റിലേ റൂട്ടിംഗ് ബാക്കെൻഡ്) — _റിലേ അതിലേക്ക് അഭ്യർത്ഥനകൾ അയയ്ക്കുന്നുണ്ടോ_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` എന്നത്
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു.

ഒഴിവാക്കേണ്ട തെറ്റ്: "എംബെഡഡ് സർവീസ്", "റൂട്ടിംഗ് ബാക്കെൻഡ്" എന്നിവയെ ഒരേ
പട്ടികയായി കണക്കാക്കുന്നത്. അവ ഒരേ കാര്യമല്ല. ഒരു `supervised` എഞ്ചിൻ (9router/cliproxy) എന്നത് **നേറ്റീവ് പൈപ്പ്ലൈൻ ഉപയോഗിക്കുന്ന ഒരു പ്രൊവൈഡർ
കണക്ഷനാണ്**, മറ്റൊരു റിലേ ഡിസ്പാച്ച് ബാക്കെൻഡ് അല്ല. `bifrost` ഇതിന്റെ വിപരീതമാണ് — (ചരിത്രപരമായി)
`external` മാത്രമായിരുന്ന ഒരു റിലേ ഡിസ്പാച്ച് ബാക്കെൻഡ്.

## രജിസ്ട്രി — ഏക ആധികാരിക സ്രോതസ്സ്

`domain/routing/routerBackends.ts` കരാർ (കോഡ്
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-നോടൊപ്പം ലഭ്യമാകും) ഓരോ എഞ്ചിനെയും അതിന്റെ
ലൈഫ്സൈക്കിൾ, ശേഷികൾ, സർവീസ് ഐഡന്റിറ്റി, ഡിഫോൾട്ട് പോർട്ട്, ആരോഗ്യനില കോൺഫിഗറേഷൻ,
ടെലിമെട്രി പിന്തുണ എന്നിവ സഹിതം ഒരിക്കൽ മാത്രം പ്രഖ്യാപിക്കുന്നു. ഓരോ സൈഡ്കാറിനും പ്രത്യേകം വ്യവസ്ഥകൾ
നൽകുന്നതിനുപകരം, ഉപഭോക്താക്കൾ `getRouterBackend(id)`,
`listRouterBackends()`, `listRouterBackendsByCapability(cap)` എന്നിവ വഴി എഞ്ചിനുകൾ കണ്ടെത്തുന്നു.

| ബാക്കെൻഡ്   | ലൈഫ്സൈക്കിൾ  | സർവീസ് (അക്ഷം A) | റിലേ ബാക്കെൻഡ് (അക്ഷം B) | ആരോഗ്യനില     | ഡിഫോൾട്ട് പോർട്ട് |
| ----------- | ------------ | ---------------- | ------------------------ | ------------- | ----------------- |
| `ts`        | `in-process` | —                | `ts` (നേറ്റീവ്)          | —             | —                 |
| `bifrost`   | `external`¹  | —¹               | `bifrost` / `auto`       | `/health`     | —                 |
| `cliproxy`  | `supervised` | `cliproxy`       | — (പ്രൊവൈഡർ)             | `/v1/models`  | 8317              |
| `9router`   | `supervised` | `9router`        | — (പ്രൊവൈഡർ)             | `/api/health` | 20130             |
| `vibeproxy` | `external`   | —                | — (പ്രൊവൈഡർ അഡാപ്റ്റർ)   | `/v1/models`  | —                 |

¹ Bifrost-നെ `supervised` എംബെഡഡ് സർവീസായി (`/api/services/bifrost/`-ൽ നിന്ന്
ഇൻസ്റ്റാൾ/ആരംഭിക്കാവുന്ന വിധത്തിൽ) ഉയർത്തുന്ന പ്രവർത്തനം
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)-ൽ ട്രാക്ക് ചെയ്യുന്നു; അത് മെർജ് ചെയ്യുന്നതുവരെ,
Bifrost `external` മാത്രമാണ് (`BIFROST_BASE_URL` വഴി മാത്രം ലഭ്യമാകുന്നത്).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ഓരോ id-ക്കും പ്രത്യേകം ബ്രാഞ്ചുകൾ ഹാർഡ്-കോഡ് ചെയ്യുന്നതിനുപകരം,
ഒരു എഞ്ചിന് യഥാർത്ഥത്തിൽ ചെയ്യാൻ കഴിയുന്ന കാര്യങ്ങളുടെ അടിസ്ഥാനത്തിൽ ഫിൽട്ടർ ചെയ്യാൻ കോളർമാരെ അനുവദിക്കുന്നു.

## Axis A — ഉൾച്ചേർത്ത സേവനങ്ങൾ (supervised process വശം)

- **supervised process-കളുടെ registry:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (നിലവിൽ: `9router`, `cliproxy`).
- **Lifecycle owner:** `src/lib/services/ServiceSupervisor.ts` — `start()` child process
  സൃഷ്ടിക്കുകയും, `waitForHealthy()` വഴി നിയന്ത്രിക്കുകയും, stdout/stderr ഒരു ring buffer-ലേക്ക്
  ശേഖരിക്കുകയും ചെയ്യുന്നു; `stop()` SIGTERM→SIGKILL; എല്ലാം ഒരു lock-ന് കീഴിൽ
  ക്രമാനുസൃതമായി നടപ്പാക്കുന്നു.
- **State union** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, കൂടാതെ സ്വതന്ത്രമായ
  `HealthState = healthy | unhealthy | unknown`.
- **എന്തുകൊണ്ട് ഒരു പ്രത്യേക process (in-proc SDK അല്ല)?** Process isolation ആണ് ഓരോ
  sidecar-ന്റെയും install/start/stop/health/logs സ്വതന്ത്രമായി നിയന്ത്രിക്കാനും
  loopback spawn-guard പ്രയോഗിക്കാനും സഹായിക്കുന്നത്. ഒരു in-proc adapter മാതൃകയാക്കുന്നത്
  ഭാവിയിലെ പ്രവർത്തനമാണ് — അത് പ്രകടിപ്പിക്കേണ്ടത് `native-hot-path` capability flag-ലാണ്.

### Lifecycle route കരാർ (`/api/services/<tool>/…`)

Status code-കൾ രൂപകൽപ്പനപ്രകാരം **state/verb/path-നിഷ്ഠമാണ്** — ഇത് കരാറാണ്,
പൊരുത്തക്കേടല്ല:

| Call                             | വ്യവസ്ഥ                          | Status                               |
| -------------------------------- | -------------------------------- | ------------------------------------ |
| `POST .../start`                 | service `not_installed`          | **409** (മുൻവ്യവസ്ഥ)                 |
| `POST .../stop`                  | ഇതിനകം stopped                   | **200** (idempotent no-op)           |
| `GET .../status`                 | OK                               | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                 | spawn പരാജയം                     | **503** (താൽക്കാലികം)                |
| `GET .../status`, `.../stop`     | കൈകാര്യം ചെയ്യാത്ത error         | **500**                              |
| `GET /api/services/<x>/logs`     | അജ്ഞാത tool `<x>`                | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`      | `X-Reveal-Confirm: yes` ഇല്ല     | **403** (9router-ന് മാത്രം)          |
| **ഏതെങ്കിലും** `/api/services/*` | caller loopback/private-LAN അല്ല | **403 LOCAL_ONLY**                   |

എല്ലാ error body-കളും `createErrorResponse()` വഴി →
`{ error: { message, type }, requestId }` എന്ന രൂപത്തിലാണ്. ഇവിടെ `type`, status-ൽ
നിന്ന് നിർണ്ണയിക്കപ്പെടുന്നു (`500→server_error`, `404→not_found`, `409→conflict`,
അല്ലെങ്കിൽ `invalid_request`) കൂടാതെ machine-actionable discriminator ആയി
പ്രവർത്തിക്കുന്നു. Message-കൾ മുൻകൂട്ടി sanitize ചെയ്യപ്പെട്ടവയാണ്
(`sanitizeErrorMessage()`, Hard Rule #12).

**Loopback guard** ആണ് `403`-ന്റെ ഏറ്റവും സാധാരണ കാരണം: `/api/services/` എന്നത്
`LOCAL_ONLY_API_PREFIXES`-ൽ (`src/server/authz/routeGuard.ts`) ഉൾപ്പെടുന്നു. ഈ route-കൾ
child process-കൾ spawn ചെയ്യുന്നതിനാൽ, `src/server/authz/policies/management.ts`
ഏതൊരു non-loopback / non-private-LAN caller-നെയും **auth-ന് മുമ്പ്** നിരസിക്കുന്നു
(Hard Rules 15, 17). ഒരു public tunnel വഴി ഇവയിലെത്തുമ്പോൾ രൂപകൽപ്പനപ്രകാരം `403`
ലഭിക്കും.

## Axis B — relay routing backend (dispatch വശം)

Relay proxy path ആയ `/api/v1/relay/chat/completions` മാത്രമാണ് ഒരു dispatch backend
തിരഞ്ഞെടുക്കുന്നത്; പ്രധാന `/api/v1/chat/completions` surface ഒരിക്കലും
`routingBackend.ts` പരിശോധിക്കുന്നില്ല.

- **തിരഞ്ഞെടുക്കൽ** (`resolveRelayRoutingBackend`): ഒരൊറ്റ global env toggle —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  ഇത് സജ്ജീകരിച്ചിട്ടില്ലെങ്കിൽ, Bifrost configure ചെയ്ത് enable ചെയ്തിട്ടുണ്ടെങ്കിൽ
  `auto`; അല്ലെങ്കിൽ `ts`.
- **പെരുമാറ്റം:**
  - `bifrost` (നിർബന്ധിതം): Bifrost പരാജയം → നേരിട്ട് `502`, fallback ഇല്ല.
  - `auto`: Bifrost പരീക്ഷിക്കുന്നു; പരാജയം/cooldown ഉണ്ടായാൽ നിശ്ശബ്ദമായി native-ലേക്ക്
    മാറുന്നു.
  - `ts` / fallback-ന് ശേഷം: native `open-sse` translator/executor pipeline.
- **Cooldown:** `bifrostCooldown.ts`-ൽ ഓരോ `baseUrl`-നുമുള്ള failure cooldown.

നിലവിൽ relay തലത്തിലുള്ള തിരഞ്ഞെടുപ്പ് **ഒന്നുകിൽ പൂർണ്ണമായി, അല്ലെങ്കിൽ ഒന്നുമില്ല**
എന്ന രീതിയിലാണ് — `release/v3.8.43`-ൽ ഓരോ provider-നോ ഓരോ request-നോ അടിസ്ഥാനമാക്കിയുള്ള
engine swap ഇല്ല. ഓരോ request-നുമുള്ള gate sidecar-manifest പ്രവർത്തനത്തിലൂടെ
ചേർക്കപ്പെടുകയാണ്
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ഇത് manifest-eligible provider-കളെ മാത്രം Bifrost വഴി route ചെയ്യാൻ `auto`-യെ
അനുവദിക്കുന്നു.

## ഡാഷ്ബോർഡ് സംയോജനം

സർവീസസ് ഡാഷ്ബോർഡ് ഓരോ 5s-ലും
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` വഴി
`GET /api/services/<tool>/status` പോൾ ചെയ്യുകയും `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` മടക്കിനൽകുകയും ചെയ്യുന്നു. പങ്കിട്ട availability-context provider ഒന്നുമില്ല —
ഓരോ ഘടകവും ഓരോ ടൂളിനും പ്രത്യേകം hook വിളിക്കുന്നു. `!res.ok` ആകുമ്പോൾ, hook നിലവിൽ
വെറും `HTTP <status>` മാത്രമാണ് പ്രദർശിപ്പിക്കുന്നത്; `error.type` ഫീൽഡിനെ ഉപയോക്താവിന് മനസ്സിലാകുന്ന ഒരു വിശദീകരണവുമായി
മാപ്പ് ചെയ്യുന്നത് ട്രാക്ക് ചെയ്തിട്ടുള്ള ഒരു UX മെച്ചപ്പെടുത്തലാണ്, കരാർ മാറ്റമല്ല.

## അനന്തരഫലങ്ങൾ

- പുതിയ എഞ്ചിനുകൾ `ROUTER_BACKENDS`-ൽ ഒരിക്കൽ രജിസ്റ്റർ ചെയ്യുന്നു; പുതിയ per-id ശാഖകളില്ലാതെ capability
  queries വഴി consumers-ന് അവ ലഭിക്കുന്നു.
- "ഇത് ഒരു സർവീസാണോ അതോ routing backend ആണോ?" എന്നത് ഒരു id ഏത് ലിസ്റ്റിൽ പ്രത്യക്ഷപ്പെടുന്നു എന്നതിനെ അടിസ്ഥാനമാക്കിയല്ല,
  `lifecycle` ഫീൽഡിനെ അടിസ്ഥാനമാക്കിയാണ് നിർണ്ണയിക്കുന്നത്.
- Bifrost supervision (#5817), native hot-path migration (#5670) എന്നിവ ഓരോ sidecar-നെയും
  പ്രത്യേകം കൈകാര്യം ചെയ്യുന്നതിനുപകരം ഈ പങ്കിട്ട കരാറിനെ അടിസ്ഥാനമാക്കി നിർമ്മിക്കുന്നു.
