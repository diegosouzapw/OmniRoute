# Router Backends & Embedded Services — architecture contract (ADR) (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **સ્થિતિ:** સ્વીકૃત · **સંદર્ભ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **કરાર:** `domain/routing/routerBackends.ts`
> (ટાઇપ્ડ રજિસ્ટ્રી — કોડ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) સાથે આવે છે)

આ ADR `ts` (નેટિવ), `bifrost`, `cliproxy`, `9router`, અને
VibeProxy-સુસંગત એન્જિનો એકબીજા સાથે કેવી રીતે સંબંધિત છે તે નિશ્ચિત કરે છે, જેથી યોગદાનકર્તાઓ
આર્કિટેક્ચરની દૃષ્ટિએ અલગ એવી બે બાબતોને એકરૂપ ન ગણે. તે router-backend-registry કાર્ય દ્વારા રજૂ કરાયેલી ટાઇપ્ડ
રજિસ્ટ્રીને આ મોડેલ માટે સત્યના એકમાત્ર સ્રોત તરીકે દસ્તાવેજીકૃત કરે છે.

## મુખ્ય તફાવત — બે પરસ્પર સ્વતંત્ર અક્ષો

એન્જિનની ભૂમિકા **બે સ્વતંત્ર અક્ષો** દ્વારા વર્ણવાય છે, જે રજિસ્ટ્રીના
`RouterBackendDefinition`માં એકસાથે એન્કોડ કરેલા છે:

1. **લાઇફસાઇકલ** (`RouterBackendLifecycle`) — _એન્જિન કેવી રીતે ચાલે છે_:
   - `in-process` — OmniRoute Node પ્રોસેસની અંદર ચાલે છે (નેટિવ TS પાઇપલાઇન).
   - `supervised` — એક સ્થાનિક ચાઇલ્ડ પ્રોસેસ, જેને OmniRoute `ServiceSupervisor`
     મારફતે ઇન્સ્ટોલ/શરૂ/બંધ કરે છે અને તેનું હેલ્થ-ચેક કરે છે, ત્યારબાદ તેને પ્રોવાઇડર કનેક્શન તરીકે વાપરે છે.
   - `external` — એક HTTP એન્ડપોઇન્ટ, જેના પર OmniRoute વિનંતીઓ મોકલે છે પરંતુ તેને મેનેજ
     **કરતું નથી** (env બેઝ URL દ્વારા કૉન્ફિગર કરેલું).
   - `disabled` — નોંધાયેલું છે, પરંતુ પસંદ કરી શકાતું નથી.
2. **પસંદગી અક્ષ** (રિલે રૂટિંગ બેકએન્ડ) — _રિલે તેના પર વિનંતીઓ મોકલે છે કે નહીં_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`માં.

ટાળવાની ભૂલ: "એમ્બેડેડ સર્વિસ" અને "રૂટિંગ બેકએન્ડ"ને એક જ
યાદી માનવી. તેઓ એક નથી. `supervised` એન્જિન (9router/cliproxy) એ **નેટિવ પાઇપલાઇન દ્વારા વપરાતું પ્રોવાઇડર
કનેક્શન** છે, વૈકલ્પિક રિલે ડિસ્પેચ બેકએન્ડ નહીં. `bifrost` તેનાથી વિપરીત છે — એક એવું રિલે ડિસ્પેચ બેકએન્ડ જે (ઐતિહાસિક રીતે)
માત્ર `external` હતું.

## રજિસ્ટ્રી — સત્યનો એકમાત્ર સ્રોત

`domain/routing/routerBackends.ts` કરાર (કોડ
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) સાથે આવે છે) દરેક એન્જિનને તેના
લાઇફસાઇકલ, ક્ષમતાઓ, સર્વિસ ઓળખ, ડિફૉલ્ટ પોર્ટ, હેલ્થ કૉન્ફિગરેશન અને
ટેલિમેટ્રી સપોર્ટ સાથે એક જ વાર જાહેર કરે છે. દરેક સાઇડકાર માટે અલગ વિશિષ્ટ શરતો લખવાને બદલે, ઉપભોક્તાઓ `getRouterBackend(id)`,
`listRouterBackends()`, અને `listRouterBackendsByCapability(cap)` મારફતે
એન્જિન શોધે છે.

| બેકએન્ડ     | લાઇફસાઇકલ    | સર્વિસ (અક્ષ A) | રિલે બેકએન્ડ (અક્ષ B) | હેલ્થ         | ડિફૉલ્ટ પોર્ટ |
| ----------- | ------------ | --------------- | --------------------- | ------------- | ------------- |
| `ts`        | `in-process` | —               | `ts` (નેટિવ)          | —             | —             |
| `bifrost`   | `external`¹  | —¹              | `bifrost` / `auto`    | `/health`     | —             |
| `cliproxy`  | `supervised` | `cliproxy`      | — (પ્રોવાઇડર)         | `/v1/models`  | 8317          |
| `9router`   | `supervised` | `9router`       | — (પ્રોવાઇડર)         | `/api/health` | 20130         |
| `vibeproxy` | `external`   | —               | — (પ્રોવાઇડર ઍડૅપ્ટર) | `/v1/models`  | —             |

¹ Bifrostને `supervised` એમ્બેડેડ સર્વિસ તરીકે પ્રમોટ કરવાનું (જેને
`/api/services/bifrost/`માંથી ઇન્સ્ટોલ/શરૂ કરી શકાય) કાર્ય
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)માં ટ્રૅક કરવામાં આવ્યું છે; તે મર્જ થાય ત્યાં સુધી,
Bifrost માત્ર `external` છે (માત્ર `BIFROST_BASE_URL` મારફતે ઍક્સેસ કરી શકાય છે).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) કોલર્સને
દરેક id માટે હાર્ડ-કોડેડ શાખાઓ લખવાને બદલે, એન્જિન વાસ્તવમાં શું કરી શકે છે તેના આધારે ફિલ્ટર કરવાની સુવિધા આપે છે.

## અક્ષ A — એમ્બેડેડ સેવાઓ (સુપરવાઇઝ્ડ પ્રોસેસ બાજુ)

- **સુપરવાઇઝ્ડ પ્રોસેસોની રજિસ્ટ્રી:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (હાલમાં: `9router`, `cliproxy`).
- **લાઇફસાઇકલ માલિક:** `src/lib/services/ServiceSupervisor.ts` — `start()` ચાઇલ્ડ પ્રોસેસ
  સ્પોન કરે છે, `waitForHealthy()` પર ગેટ કરે છે, stdout/stderrને રિંગ બફરમાં
  કૅપ્ચર કરે છે; `stop()` SIGTERM→SIGKILL કરે છે; આ બધું લૉક હેઠળ ક્રમબદ્ધ થાય છે.
- **સ્ટેટ યુનિયન** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, ઉપરાંત એક
  સ્વતંત્ર `HealthState = healthy | unhealthy | unknown`.
- **અલગ પ્રોસેસ શા માટે (ઇન-પ્રોક SDK કેમ નહીં)?** પ્રોસેસ આઇસોલેશનના કારણે
  દરેક સાઇડકાર માટે install/start/stop/health/logsને સ્વતંત્ર રીતે નિયંત્રિત કરી શકાય
  છે અને લૂપબૅક સ્પોન-ગાર્ડ લાગુ કરી શકાય છે. ઇન-પ્રોક ઍડેપ્ટરનું મોડેલિંગ ભવિષ્યનું
  કાર્ય છે — તેને `native-hot-path` ક્ષમતા ફ્લૅગમાં વ્યક્ત કરવામાં આવશે.

### લાઇફસાઇકલ રૂટ કોન્ટ્રાક્ટ (`/api/services/<tool>/…`)

સ્ટેટસ કોડ્સ **ડિઝાઇન પ્રમાણે state/verb/path-વિશિષ્ટ છે** — આ કોન્ટ્રાક્ટ છે,
અસંગતતા નહીં:

| કૉલ                          | શરત                             | સ્ટેટસ                               |
| ---------------------------- | ------------------------------- | ------------------------------------ |
| `POST .../start`             | સેવા `not_installed`            | **409** (પૂર્વશરત)                   |
| `POST .../stop`              | પહેલેથી જ બંધ                   | **200** (ઇડેમ્પોટન્ટ નો-ઓપ)          |
| `GET .../status`             | બરાબર                           | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | સ્પોન નિષ્ફળતા                  | **503** (કામચલાઉ)                    |
| `GET .../status`, `.../stop` | ન પકડાયેલી ભૂલ                  | **500**                              |
| `GET /api/services/<x>/logs` | અજાણ્યું ટૂલ `<x>`              | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` ગેરહાજર | **403** (માત્ર 9router)              |
| **કોઈપણ** `/api/services/*`  | કૉલર loopback/private-LAN નથી   | **403 LOCAL_ONLY**                   |

બધા એરર બોડી `createErrorResponse()` દ્વારા આ સ્વરૂપમાં બને છે →
`{ error: { message, type }, requestId }`, જ્યાં `type` સ્ટેટસ પરથી મેળવવામાં આવે છે
(`500→server_error`, `404→not_found`, `409→conflict`, અન્યથા `invalid_request`) અને
તે મશીન દ્વારા કાર્યવાહી કરી શકાય તેવો ભેદક છે. સંદેશાઓ અગાઉથી સૅનિટાઇઝ કરવામાં
આવે છે (`sanitizeErrorMessage()`, કડક નિયમ #12).

**લૂપબૅક ગાર્ડ** એ `403`નું સૌથી સામાન્ય કારણ છે: `/api/services/`નો સમાવેશ
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`)માં થાય છે અને
`src/server/authz/policies/management.ts` કોઈપણ નોન-લૂપબૅક / નોન-પ્રાઇવેટ-LAN
કૉલરને **ઑથ પહેલાં** નકારે છે, કારણ કે આ રૂટ્સ ચાઇલ્ડ પ્રોસેસોને સ્પોન કરે છે
(કડક નિયમો 15 અને 17). પબ્લિક ટનલ મારફતે તેમના સુધી પહોંચવા પર ડિઝાઇન પ્રમાણે
`403` મળે છે.

## અક્ષ B — રિલે રાઉટિંગ બૅકએન્ડ (ડિસ્પૅચ બાજુ)

માત્ર રિલે પ્રોક્સી પાથ `/api/v1/relay/chat/completions` ડિસ્પૅચ બૅકએન્ડ પસંદ
કરે છે; મુખ્ય `/api/v1/chat/completions` સપાટી ક્યારેય `routingBackend.ts`નો
પરામર્શ કરતી નથી.

- **પસંદગી** (`resolveRelayRoutingBackend`): એકમાત્ર વૈશ્વિક env ટૉગલ —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  જો સેટ ન હોય, તો Bifrost કૉન્ફિગર અને સક્ષમ હોય ત્યારે `auto`, અન્યથા `ts`.
- **વર્તણૂક:**
  - `bifrost` (બળજબરીથી): Bifrost નિષ્ફળતા → હાર્ડ `502`, કોઈ ફૉલબૅક નહીં.
  - `auto`: Bifrost અજમાવે છે; નિષ્ફળતા/કૂલડાઉન પર મૌન રીતે નેટિવ પર આગળ વધે છે.
  - `ts` / ફૉલબૅક પછી: નેટિવ `open-sse` ટ્રાન્સલેટર/એક્ઝિક્યુટર પાઇપલાઇન.
- **કૂલડાઉન:** `bifrostCooldown.ts`માં દરેક `baseUrl` માટે નિષ્ફળતા કૂલડાઉન.

હાલમાં રિલે સ્તરે પસંદગી **સંપૂર્ણપણે એક અથવા બીજું છે** — `release/v3.8.43` પર
પ્રતિ-પ્રોવાઇડર અથવા પ્રતિ-રિક્વેસ્ટ એન્જિન સ્વૅપ ઉપલબ્ધ નથી. પ્રતિ-રિક્વેસ્ટ ગેટ
સાઇડકાર-મૅનિફેસ્ટ કાર્ય દ્વારા ઉમેરવામાં આવી રહ્યો છે
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) મૅનિફેસ્ટ +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
જેના કારણે `auto` માત્ર મૅનિફેસ્ટ-પાત્ર પ્રોવાઇડર્સને Bifrost મારફતે રૂટ કરી શકે છે.

## ડૅશબોર્ડ એકીકરણ

સેવાઓનું ડૅશબોર્ડ
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
મારફતે દર 5s એ `GET /api/services/<tool>/status` પોલ કરે છે, જે
`{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` પરત કરે છે. કોઈ સહિયારું availability-context provider નથી —
દરેક component દરેક tool માટે hookને કૉલ કરે છે. `!res.ok` થવા પર hook હાલમાં માત્ર
`HTTP <status>` દર્શાવે છે; `error.type` fieldને માનવી સમજી શકે તેવી સમજૂતી સાથે મેપ કરવું
એ ટ્રૅક કરાયેલો UX સુધારો છે, contractમાં ફેરફાર નથી.

## પરિણામો

- નવા engines `ROUTER_BACKENDS`માં એક વાર register થાય છે; consumersને નવી per-id branches
  વિના capability queries મારફતે તે ઉપલબ્ધ થાય છે.
- "આ service છે કે routing backend?" તેનો જવાબ કોઈ id કઈ listમાં દેખાય છે તેના આધારે નહીં,
  પરંતુ `lifecycle` field દ્વારા મળે છે.
- Bifrost supervision (#5817) અને native hot-path migration (#5670), દરેક sidecarને
  વિશિષ્ટ રીતે હેન્ડલ કરવાને બદલે, આ સહિયારા contract પર આધારિત છે.
