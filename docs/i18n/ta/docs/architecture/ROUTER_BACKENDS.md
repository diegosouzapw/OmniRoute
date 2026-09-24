# Router Backends & Embedded Services — architecture contract (ADR) (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **நிலை:** ஏற்கப்பட்டது · **சூழல்:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **ஒப்பந்தம்:** `domain/routing/routerBackends.ts`
> (வகையிடப்பட்ட பதிவகம் — குறியீடு [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) உடன் சேர்க்கப்படும்)

`ts` (சொந்தச் செயலாக்கம்), `bifrost`, `cliproxy`, `9router`, மற்றும்
VibeProxy-இணக்கமான எஞ்சின்கள் ஒன்றுக்கொன்று எவ்வாறு தொடர்புடையவை என்பதை இந்த ADR
தெளிவாக வரையறுக்கிறது; இதனால் கட்டமைப்பு ரீதியாக வேறுபட்ட இரண்டு விஷயங்களைப்
பங்களிப்பாளர்கள் ஒன்றாகக் குழப்புவதைத் தவிர்க்கலாம். router-backend-registry பணியால்
அறிமுகப்படுத்தப்பட்ட வகையிடப்பட்ட பதிவகத்தை, இந்த மாதிரிக்கான ஒரே அதிகாரப்பூர்வ
தகவல் மூலமாக இது ஆவணப்படுத்துகிறது.

## முதன்மையான வேறுபாடு — ஒன்றுக்கொன்று சாராத இரண்டு அச்சுகள்

ஓர் எஞ்சினின் பங்கு **ஒன்றுக்கொன்று சாராத இரண்டு அச்சுகள்** மூலம் விவரிக்கப்படுகிறது;
இவை பதிவகத்தின் `RouterBackendDefinition`-இல் ஒன்றாகக் குறியாக்கப்பட்டுள்ளன:

1. **வாழ்க்கைச் சுழற்சி** (`RouterBackendLifecycle`) — _எஞ்சின் எவ்வாறு இயங்குகிறது_:
   - `in-process` — OmniRoute Node செயல்முறைக்குள் இயங்குகிறது (சொந்த TS செயலாக்கப் பாதை).
   - `supervised` — `ServiceSupervisor` வழியாக OmniRoute நிறுவி/தொடங்கி/நிறுத்தி/நிலைச்
     சரிபார்ப்பு செய்யும் ஒரு உள்ளகத் துணைச் செயல்முறை; பின்னர் வழங்குநர் இணைப்பாகப் பயன்படுத்தப்படுகிறது.
   - `external` — OmniRoute கோரிக்கைகளை அனுப்பும், ஆனால் **நிர்வகிக்காத** ஓர் HTTP
     முனைப்புள்ளி (env அடிப்படை URL மூலம் உள்ளமைக்கப்படுகிறது).
   - `disabled` — பதிவுசெய்யப்பட்டிருந்தாலும் தேர்ந்தெடுக்க முடியாது.
2. **தேர்வு அச்சு** (ரிலே வழித்தடப் பின்தளம்) — _ரிலே அதற்குக் கோரிக்கைகளை அனுப்புகிறதா_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` என்பது
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`-இல் உள்ளது.

தவிர்க்க வேண்டிய தவறு: "உட்பொதிக்கப்பட்ட சேவை" மற்றும் "வழித்தடப் பின்தளம்" ஆகியவற்றை
ஒரே பட்டியலாகக் கருதுவது. அவை ஒன்றல்ல. ஒரு `supervised` எஞ்சின்
(9router/cliproxy) என்பது **சொந்தச் செயலாக்கப் பாதையால் பயன்படுத்தப்படும் வழங்குநர்
இணைப்பு**; அது மாற்று ரிலே அனுப்புகைப் பின்தளம் அல்ல. `bifrost` இதற்கு நேர்மாறானது —
அது (வரலாற்று ரீதியாக) `external`-மட்டுமேயான ஒரு ரிலே அனுப்புகைப் பின்தளமாக இருந்தது.

## பதிவகம் — ஒரே அதிகாரப்பூர்வ தகவல் மூலம்

`domain/routing/routerBackends.ts` ஒப்பந்தம் (குறியீடு
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) உடன் சேர்க்கப்படும்) ஒவ்வோர் எஞ்சினையும் அதன்
வாழ்க்கைச் சுழற்சி, திறன்கள், சேவை அடையாளம், இயல்புநிலை முனையம், நிலைச் சரிபார்ப்பு
உள்ளமைவு மற்றும் தொலைஅளவீட்டு ஆதரவுடன் ஒரே முறை அறிவிக்கிறது. ஒவ்வொரு sidecar-க்கும்
தனித்தனி சிறப்புக் கையாளுதலைச் செய்வதற்குப் பதிலாக, நுகர்வோர்
`getRouterBackend(id)`, `listRouterBackends()`, மற்றும்
`listRouterBackendsByCapability(cap)` வழியாக எஞ்சின்களைத் தேடுகின்றனர்.

| பின்தளம்    | வாழ்க்கைச் சுழற்சி | சேவை (அச்சு A) | ரிலே பின்தளம் (அச்சு B)   | நிலைச் சரிபார்ப்பு | இயல்புநிலை முனையம் |
| ----------- | ------------------ | -------------- | ------------------------- | ------------------ | ------------------ |
| `ts`        | `in-process`       | —              | `ts` (சொந்தச் செயலாக்கம்) | —                  | —                  |
| `bifrost`   | `external`¹        | —¹             | `bifrost` / `auto`        | `/health`          | —                  |
| `cliproxy`  | `supervised`       | `cliproxy`     | — (வழங்குநர்)             | `/v1/models`       | 8317               |
| `9router`   | `supervised`       | `9router`      | — (வழங்குநர்)             | `/api/health`      | 20130              |
| `vibeproxy` | `external`         | —              | — (வழங்குநர் ஏற்பி)       | `/v1/models`       | —                  |

¹ Bifrost-ஐ `/api/services/bifrost/` இலிருந்து நிறுவக்கூடிய/தொடங்கக்கூடிய ஒரு
`supervised` உட்பொதிக்கப்பட்ட சேவையாக மேம்படுத்துவது
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)-இல் கண்காணிக்கப்படுகிறது; அது ஒன்றிணைக்கப்படும் வரை,
Bifrost `external`-மட்டுமேயானது (`BIFROST_BASE_URL` வழியாக மட்டுமே அணுகக்கூடியது).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ஒவ்வொரு id-க்கும்
தனித்தனி கிளைகளை hard-code செய்வதற்குப் பதிலாக, ஓர் எஞ்சின் உண்மையில் செய்யக்கூடியவற்றின்
அடிப்படையில் அழைப்பாளர்கள் வடிகட்ட அனுமதிக்கிறது.

## அச்சு A — உட்பொதிக்கப்பட்ட சேவைகள் (மேற்பார்வையிடப்படும் செயல்முறைப் பக்கம்)

- **மேற்பார்வையிடப்படும் செயல்முறைகளின் பதிவேடு:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (தற்போது: `9router`, `cliproxy`).
- **வாழ்க்கைச்சுழற்சி உரிமையாளர்:** `src/lib/services/ServiceSupervisor.ts` — `start()` சேய்
  செயல்முறையை உருவாக்கி, `waitForHealthy()` நிறைவேறும் வரை காத்திருந்து, stdout/stderr வெளியீட்டை ஒரு ring buffer-இல் சேகரிக்கிறது;
  `stop()` SIGTERM→SIGKILL; அனைத்தும் ஒரு lock-இன் கீழ் வரிசைப்படுத்தப்படுகின்றன.
- **நிலை union** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, மேலும் அதிலிருந்து
  தனித்துவமான `HealthState = healthy | unhealthy | unknown`.
- **ஏன் தனிச் செயல்முறை (in-proc SDK அல்ல)?** ஒவ்வொரு sidecar-க்கும்
  நிறுவல்/தொடக்கம்/நிறுத்தம்/ஆரோக்கியம்/logs ஆகியவற்றைத் தனித்தனியாகக் கட்டுப்படுத்துவதையும்,
  loopback spawn-guard-ஐப் பயன்படுத்துவதையும் செயல்முறைத் தனிமைப்படுத்தலே சாத்தியமாக்குகிறது. in-proc adapter-ஐ மாதிரியாக்குவது எதிர்காலப் பணி —
  அது `native-hot-path` capability flag-இல் வெளிப்படுத்தப்படும்.

### வாழ்க்கைச்சுழற்சி route ஒப்பந்தம் (`/api/services/<tool>/…`)

நிலைக் குறியீடுகள் வடிவமைப்பின்படியே **நிலை/வினை/path-க்குக் குறிப்பானவை** — இது ஒப்பந்தம்,
முரண்பாடு அல்ல:

| அழைப்பு                        | நிபந்தனை                             | நிலை                                 |
| ------------------------------ | ------------------------------------ | ------------------------------------ |
| `POST .../start`               | சேவை `not_installed` நிலையில் உள்ளது | **409** (முன்நிபந்தனை)               |
| `POST .../stop`                | ஏற்கனவே நிறுத்தப்பட்டுள்ளது          | **200** (idempotent no-op)           |
| `GET .../status`               | சரி                                  | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | spawn தோல்வி                         | **503** (தற்காலிகம்)                 |
| `GET .../status`, `.../stop`   | கையாளப்படாத பிழை                     | **500**                              |
| `GET /api/services/<x>/logs`   | அறியப்படாத கருவி `<x>`               | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | `X-Reveal-Confirm: yes` இல்லை        | **403** (9router மட்டும்)            |
| **எந்தவொரு** `/api/services/*` | அழைப்பவர் loopback/private-LAN அல்ல  | **403 LOCAL_ONLY**                   |

அனைத்து error body-களும் `createErrorResponse()` மூலம் →
`{ error: { message, type }, requestId }` என்ற வடிவில் அமைக்கப்படுகின்றன; இதில் `type`, நிலைக்
குறியீட்டிலிருந்து பெறப்படுகிறது (`500→server_error`, `404→not_found`, `409→conflict`, இல்லையெனில் `invalid_request`) மற்றும்
இது இயந்திரத்தால் செயல்படுத்தக்கூடிய வேறுபடுத்தியாகும். செய்திகள் முன்கூட்டியே பாதுகாப்பாக்கப்படுகின்றன
(`sanitizeErrorMessage()`, கடுமையான விதி #12).

**loopback guard** ஒரு `403`-க்கான மிகவும் பொதுவான காரணமாகும்: `/api/services/` என்பது
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) என்பதில் உள்ளது, மேலும்
`src/server/authz/policies/management.ts` எந்த non-loopback / non-private-LAN
அழைப்பாளரையும் **அங்கீகாரத்திற்கு முன்பே** நிராகரிக்கிறது; ஏனெனில் இந்த routes சேய் செயல்முறைகளை உருவாக்குகின்றன (கடுமையான விதிகள் 15
மற்றும் 17). பொது tunnel வழியாக அவற்றை அணுகும்போது வடிவமைப்பின்படியே `403` கிடைக்கும்.

## அச்சு B — relay routing backend (dispatch பக்கம்)

relay proxy path ஆன `/api/v1/relay/chat/completions` மட்டுமே dispatch
backend-ஐத் தேர்ந்தெடுக்கிறது; பிரதான `/api/v1/chat/completions` பரப்பு ஒருபோதும்
`routingBackend.ts`-ஐ அணுகாது.

- **தேர்வு** (`resolveRelayRoutingBackend`): ஒரே global env toggle —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  அமைக்கப்படவில்லை என்றால், Bifrost கட்டமைக்கப்பட்டு+இயக்கப்பட்டிருந்தால் `auto`; இல்லையெனில் `ts`.
- **நடத்தை:**
  - `bifrost` (கட்டாயம்): Bifrost தோல்வி → நேரடி `502`, fallback இல்லை.
  - `auto`: Bifrost-ஐ முயற்சித்து, தோல்வி/cooldown ஏற்பட்டால் அமைதியாக native-க்கு மாறும்.
  - `ts` / fallback-க்குப் பின்: native `open-sse` translator/executor pipeline.
- **Cooldown:** `bifrostCooldown.ts`-இல் ஒவ்வொரு `baseUrl`-க்கும் தோல்வி cooldown.

தற்போது relay நிலையில் தேர்வு **முழுமையாக-அல்லது-எதுவுமில்லை** — `release/v3.8.43`-இல் ஒவ்வொரு provider-க்கும்
அல்லது ஒவ்வொரு request-க்கும் தனியான engine மாற்றம் இல்லை. ஒவ்வொரு request-க்குமான gate, sidecar-manifest பணியின் மூலம் சேர்க்கப்பட்டு வருகிறது
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`);
இதன் மூலம் manifest-க்கு தகுதியான provider-களை மட்டும் Bifrost வழியாக route செய்ய `auto`-க்கு முடியும்.

## டாஷ்போர்டு ஒருங்கிணைப்பு

சேவைகள் டாஷ்போர்டு, ஒவ்வொரு 5s-க்கும்
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` வழியாக
`GET /api/services/<tool>/status`-ஐ வினவுகிறது; இது `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` என்பதைத் திருப்பியளிக்கிறது. பகிரப்பட்ட availability-context provider எதுவும் இல்லை —
ஒவ்வொரு கூறும் ஒவ்வொரு tool-க்கும் தனித்தனியாக hook-ஐ அழைக்கிறது. `!res.ok` ஏற்படும்போது, hook தற்போது
வெறும் `HTTP <status>` என்பதை மட்டுமே காட்டுகிறது; `error.type` புலத்தை மனிதர்கள் புரிந்துகொள்ளக்கூடிய விளக்கத்துடன் பொருத்துவது,
கண்காணிக்கப்படும் UX மேம்பாடாகும்; ஒப்பந்த மாற்றம் அல்ல.

## விளைவுகள்

- புதிய engines, `ROUTER_BACKENDS`-இல் ஒருமுறை பதிவு செய்யப்படுகின்றன; புதிய per-id கிளைகள் இல்லாமலேயே consumers அவற்றை capability
  வினவல்கள் வழியாகப் பெறுகின்றன.
- "இது ஒரு service-ஆ அல்லது routing backend-ஆ?" என்பது ஓர் id எந்தப் பட்டியலில் இடம்பெறுகிறது என்பதால் அல்லாமல்,
  `lifecycle` புலத்தால் தீர்மானிக்கப்படுகிறது.
- Bifrost supervision (#5817) மற்றும் native hot-path migration (#5670) ஆகியவை ஒவ்வொரு
  sidecar-ஐயும் தனித்தனியாகச் சிறப்புக் கையாள்வதற்குப் பதிலாக, இந்தப் பகிரப்பட்ட ஒப்பந்தத்தின் அடிப்படையில் உருவாக்கப்படுகின்றன.
