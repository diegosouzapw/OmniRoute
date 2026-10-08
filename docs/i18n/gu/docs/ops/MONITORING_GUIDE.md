# Monitoring & Observability Guide (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **ટૂંકમાં**: OmniRoute બિલ્ટ-ઇન હેલ્થ મોનિટરિંગ, પ્રોવાઇડર ઑટોપાઇલટ, ક્વોટા ટ્રેકિંગ અને ઑબ્ઝર્વેબિલિટી હુક્સ સાથે આવે છે. આ માર્ગદર્શિકા ડૅશબોર્ડ, ચેતવણીઓ અને સમસ્યાનિવારણને આવરી લે છે.

**સ્રોતો:**

- `src/lib/monitoring/observability.ts` — ઑબ્ઝર્વેબિલિટી સ્નૅપશૉટ
- `src/lib/monitoring/comboHealthAutopilot.ts` — કૉમ્બો હેલ્થ ઑટોપાઇલટ
- `src/lib/monitoring/providerHealthAutopilot.ts` — પ્રોવાઇડર ઑટોપાઇલટ
- `src/lib/monitoring/providerHealthMatrix.ts` — પ્રોવાઇડર હેલ્થ મૅટ્રિક્સ
- `src/lib/localHealthCheck.ts` — સ્થાનિક હેલ્થ ચેક
- `src/lib/tokenHealthCheck.ts` — ટોકન રિફ્રેશ હેલ્થ
- `src/lib/proxyHealth.ts` — પ્રૉક્સી હેલ્થ કૅશ (PROXY_GUIDE.mdમાં આવરી લેવાયેલ)

---

## વિહંગાવલોકન

OmniRouteમાં **મોનિટરિંગનાં 3 સ્તરો** છે:

```
┌──────────────────────────────────────────────────────────────┐
│  સ્તર 1: સિસ્ટમ હેલ્થ (સર્વર-સ્તર)                           │
│  ├─ localHealthCheck.ts — DB, પોર્ટ્સ, નેટિવ ડિપેન્ડન્સીઓ     │
│  ├─ db/healthCheck.ts — અખંડિતતા, FK, અનાથ આર્ટિફૅક્ટ્સ      │
│  └─ ડૅશબોર્ડ: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  સ્તર 2: પ્રોવાઇડર હેલ્થ (પ્રતિ-પ્રોવાઇડર સ્થિતિસ્થાપકતા)     │
│  ├─ providerHealthAutopilot.ts — સર્કિટ બ્રેકર, કૂલડાઉન્સ    │
│  ├─ providerHealthMatrix.ts — પ્રોવાઇડર/મોડલ મુજબ હેલ્થ સ્કોર │
│  └─ ડૅશબોર્ડ: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  સ્તર 3: લાઇવ ઑબ્ઝર્વેબિલિટી (રનટાઇમ સ્નૅપશૉટ્સ)             │
│  ├─ observability.ts — સર્કિટ બ્રેકર્સ, સેશન્સ, ક્વોટા        │
│  ├─ tokenHealthCheck.ts — OAuth ટોકન રિફ્રેશ હેલ્થ           │
│  └─ MCP ટૂલ્સ: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ડૅશબોર્ડ પેજ

### `/dashboard/health` (સિસ્ટમ હેલ્થ)

ટોચ-સ્તરનું હેલ્થ ડૅશબોર્ડ આ માહિતી દર્શાવે છે:

| વિભાગ                | તે શું દર્શાવે છે                                    |
| -------------------- | ---------------------------------------------------- |
| **સર્વર સ્થિતિ**     | અપટાઇમ, વર્ઝન, પોર્ટ, સક્રિય કનેક્શન્સ               |
| **ડેટાબેઝ**          | કનેક્શન, અખંડિતતા, WAL કદ, તાજેતરનાં માઇગ્રેશન્સ     |
| **પ્રોવાઇડર સારાંશ** | સક્રિય સંખ્યા, સ્વસ્થ સંખ્યા, ખુલ્લા બ્રેકરની સંખ્યા |
| **ક્વોટા મોનિટર્સ**  | સક્રિય સેશન્સ, ચેતવણીઓ, સમાપ્ત ક્વોટા                |
| **તાજેતરની ભૂલો**    | સ્ટૅક ટ્રેસ સાથેની છેલ્લી 10 ભૂલો                    |
| **રિસોર્સ વપરાશ**    | મેમરી, CPU, હીપ પ્રેશર સૂચક                          |

### `/dashboard/providers` (પ્રોવાઇડર હેલ્થ)

પ્રતિ-પ્રોવાઇડર ડૅશબોર્ડ:

| કૉલમ      | વર્ણન                                          |
| --------- | ---------------------------------------------- |
| પ્રોવાઇડર | પ્રોવાઇડર ID + ડિસ્પ્લે નામ                    |
| હેલ્થ     | લીલી/પીળી/લાલ સ્થિતિ                           |
| સર્કિટ    | ખુલ્લી/બંધ/અર્ધ-ખુલ્લી સ્થિતિ                  |
| કનેક્શન્સ | કનેક્શન્સની સંખ્યા, છેલ્લું રિફ્રેશ            |
| મોડલ્સ    | ઉપલબ્ધ મોડલ્સ, પ્રતિ-મોડલ હેલ્થ                |
| ખર્ચ      | આજનો ખર્ચ, 7-દિવસનો ટ્રેન્ડ                    |
| ભૂલો      | છેલ્લા 24 કલાકની ભૂલોની સંખ્યા, મુખ્ય ભૂલ વર્ગ |

પ્રોવાઇડર પર ક્લિક કરીને આ માહિતી જુઓ:

- લેટન્સીના વિગતવાર વિભાજન સાથેની તાજેતરની રિક્વેસ્ટ્સ
- પ્રતિ-કનેક્શન હેલ્થ સ્કોર
- પ્રતિ-મોડલ લૉકઆઉટ્સ
- ઑટોપાઇલટ ભલામણો

### `/dashboard/quota` (ક્વોટા ટ્રેકિંગ)

દરેક API કી માટે:

- મર્યાદાની સરખામણીમાં વર્તમાન વપરાશ (પ્રોગ્રેસ બાર)
- ક્વોટા ટ્રેન્ડ (30-દિવસનો ચાર્ટ)
- આગામી રીસેટ સમય
- ચેતવણી ઇતિહાસ

### `/dashboard/combos` (કૉમ્બો હેલ્થ)

પ્રતિ-કૉમ્બો:

- વ્યૂહરચના + લક્ષ્યો
- પ્રતિ-લક્ષ્ય હેલ્થ
- તાજેતરની ફૉલબૅક ઘટનાઓ
- સફળતા દર (24 કલાક, 7 દિવસ, 30 દિવસ)

---

## હેલ્થ ચેક API

OmniRoute **બે** HTTP હેલ્થ સરફેસ ઉપલબ્ધ કરાવે છે. ઓર્કેસ્ટ્રેટર્સ માટે તેઓ એકબીજાના સ્થાને વાપરી શકાય તેવા નથી.

| પાથ                          | હેતુ                                                       | ભાર                              | આ માટે ઉપયોગ કરો                                                   |
| ---------------------------- | ---------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `GET /healthz`               | લાઇફસાઇકલ લાઇવનેસ/રેડીનેસ (`ok` / `starting` / `stopping`) | નગણ્ય (માત્ર ફેઝ ફ્લૅગ)          | Kubernetes **રેડીનેસ**; જો HTTP વાપરવું જ પડે તો સોફ્ટ **લાઇવનેસ** |
| `GET /api/monitoring/health` | ઊંડો સિસ્ટમ + પ્રોવાઇડર સારાંશ (DB, હીપ, કૅટલૉગ ગણતરીઓ, …) | ભારે (સિંક DB / મોનિટરિંગ કાર્ય) | ડૅશબોર્ડ્સ, બ્લૅકબૉક્સ ડીપ ચેક્સ, Dockerનું બિલ્ટ-ઇન હેલ્થચેક      |

> **નોંધ:** પ્રોવાઇડર હેલ્થ મેટ્રિક્સ, ઑટોપાઇલટ સમસ્યાઓ, ક્વોટા મોનિટર્સ, ટોકન હેલ્થ અને `/api/monitoring/health`થી આગળની લેટન્સી વિગતો **MCP ટૂલ** `observability_snapshot` અથવા **ડૅશબોર્ડ** પેજ દ્વારા ઉપલબ્ધ છે — તેમના માટે કોઈ સમર્પિત REST રૂટ્સ નથી.

બંને રૂટ્સ રિક્વેસ્ટ હેન્ડલિંગ જેવા જ **Node ઇવેન્ટ લૂપ** પર ચાલે છે. CPU-બાઉન્ડ પાથ (મોટા `GET /v1/models` કૅટલૉગનું કાર્ય, લાંબા-કૉન્ટેક્સ્ટનું કમ્પ્રેશન / ટોકન ગણતરી) `/healthz` સહિતના **તમામ** HTTP હેન્ડલર્સમાં વિલંબ કરી શકે છે. ઇવેન્ટ-લૂપ વ્યસ્ત ≠ પ્રોસેસ બંધ. ભાર ઊભો કરતું કારણ સુધારવાનું પ્રાધાન્ય આપો; પ્રોબ ટ્યુનિંગ માત્ર ખોટી રીતે પ્રોસેસ બંધ થવાની ઘટનાઓ ઘટાડે છે.

### હળવું ઓર્કેસ્ટ્રેટર પ્રોબ

```bash
GET /healthz
# અથવા HEAD /healthz
```

- સર્વર લાઇફસાઇકલ ફેઝ તૈયાર હોય ત્યારે **200** + બૉડી `ok`
- બૂટ અથવા શટડાઉન દરમિયાન **503** + `starting` / `stopping`
- અમલીકરણ: `src/app/healthz/route.ts` (કોઈ DB પિંગ નહીં)

### સિસ્ટમ હેલ્થ (ઊંડું)

```bash
GET /api/monitoring/health
```

પ્રતિસાદ:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: પ્રોબ-કૅશ વિરુદ્ધ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` એ **ઇન-મેમરી પ્રોબ-કૅશ
ગેજ** છે, `provider_connections.test_status`નો લાઇવ ડમ્પ નહીં. #12532 પછી
રિક્વેસ્ટ પાથ ફક્ત `getCachedCredentialHealthSummary()` વાંચે છે; બૅકગ્રાઉન્ડ પ્રોબ્સ
ઇવેન્ટ લૂપથી અલગ રહીને કૅશ રિફ્રેશ કરે છે.

| સ્તર                  | સ્થાન                                                                 | તેનો અર્થ                                                                                                                                                                                                                               |
| --------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| પ્રોબ-કૅશ ગેજ         | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | પ્રોસેસ મેમરીમાં હજુ જાળવેલા છેલ્લાં ક્રેડેન્શિયલ-હેલ્થ પ્રોબ પરિણામો. `source` હંમેશાં `probe-cache` હોય છે.                                                                                                                           |
| નિષ્ફળ કનેક્શનની વિગત | `credentialHealth.failedConnections`                                  | **ફક્ત `failed > 0` હોય ત્યારે** હાજર હોય છે. `status=error` ધરાવતી કૅશ રોઝની મર્યાદિત સૂચિ (`connectionId`, `status`, સૅનિટાઇઝ કરેલું `lastError` / `lastErrorType`). સૂચિ મર્યાદિત કરવામાં આવી હોય ત્યારે `failedOmitted` સેટ થાય છે. |
| SQLite સ્ટિકી સ્ટેટસ  | `credentialHealth.staleDbNonOkCount`                                  | એવા **સક્રિય** (`is_active=1`) કનેક્શન રોઝની ગણતરી, જેમનું સંગ્રહિત `test_status` જાણીતું non-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) હોય.                                                 |

બંને સ્તરો ઇરાદાપૂર્વક અસંમત હોઈ શકે છે:

- ગેજ `failed=0` જ્યારે `staleDbNonOkCount>0` — SQLiteમાં હજુ પણ સ્ટિકી
  `test_status` (ઉદાહરણ તરીકે `expired` અથવા `credits_exhausted`) છે, જેને નવીનતમ
  પ્રોબ-કૅશ સ્નૅપશૉટ `status=error` તરીકે ગણતું નથી.
- ગેજ `failed>0` જ્યારે SQLite સ્વસ્થ દેખાય — તાજેતરનું પ્રોબ નિષ્ફળ થયું છે અને
  કૅશ થયેલું છે; DB રો અપડેટ થયું નથી અથવા પછીથી ક્લિયર થયું હતું.

આ એન્ડપૉઇન્ટને સ્ક્રેપ કરતી વખતે માત્ર `provider_connections.test_status`ના આધારે
અલર્ટ ન કરો. લાઇવ પ્રોબ નિષ્ફળતાઓ માટે `failed` + `failedConnections`નો અને
સંગ્રહિત સ્ટિકી-સ્ટેટસની ગણતરીની જરૂર હોય ત્યારે `staleDbNonOkCount`નો ઉપયોગ કરો.

### Kubernetes પ્રોબ ભલામણો

OmniRoute એક **સિંગલ Node પ્રોસેસ** (એક ઇવેન્ટ લૂપ) છે. સ્ટૉક Docker `HEALTHCHECK` હળવા `/healthz`ને લક્ષ્ય બનાવે છે. kubelet લાઇવનેસ ઇન્ટરવલ્સ માટે `/api/monitoring/health` **ખૂબ ભારે** છે.

| પ્રોબ                        | ભલામણ કરેલ લક્ષ્ય                                                               | નોંધો                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **સ્ટાર્ટઅપ**                | લાંબા `failureThreshold` (અથવા મોટા `startPeriod`) સાથે HTTP `GET /healthz`     | કોલ્ડ સ્ટાર્ટ + SQLite માઇગ્રેશનમાં થોડી સેકન્ડ કરતાં વધુ સમય લાગી શકે છે                                                                                                                                                                                                                                                                                                |
| **તત્પરતા**                  | HTTP `GET /healthz`                                                             | લાઇફસાઇકલ `ok` / `starting` / `stopping` (200 વિરુદ્ધ 503). લૂપ CPU દ્વારા બ્લૉક હોય તો હજુ પણ સ્થિતિ બદલાતી રહે છે. **ઘણી સેકન્ડ પછી મળતો 200 સ્વસ્થ હોવાનો સંકેત નથી** (#10303) — તેનો અર્થ એ છે કે 3-બાઇટ હૅન્ડલર ચાલ્યો તે પહેલાં ઇવેન્ટ લૂપને પૂરતો સમય મળ્યો નહોતો                                                                                                 |
| **સજીવતા**                   | HTTP `GET /livez`, **અથવા મુખ્ય સર્વિસ પોર્ટ પર TCP** (`PORT`, ડિફૉલ્ટ `20128`) | `/livez` માત્ર પ્રોસેસ જીવંત છે કે નહીં તે દર્શાવે છે (હૅન્ડલર ચાલે તો હંમેશાં 200). તે હજુ પણ ઇવેન્ટ લૂપ શેર કરે છે — વ્યસ્ત ≠ બંધ, અને તે TCP કરતાં વધુ સારી રીતે ઇવેન્ટ-લૂપ સ્ટાર્વેશન (#10303) શોધી શકતું નથી. કૅટલૉગ/કમ્પ્રેશન લોડ હેઠળ HTTP પ્રોબનો સમય સમાપ્ત થતો હોય તો **TCP** ને પ્રાધાન્ય આપો; કોઈપણ રીતે ટૂંકા ઇવેન્ટ-લૂપ અવરોધને કારણે pod ને બંધ **ન કરો** |
| **ઊંડાણપૂર્વકનું સ્વાસ્થ્ય** | બાહ્ય ચેકરમાંથી `GET /api/monitoring/health`                                    | kubelet `livenessProbe` / ચુસ્ત `readinessProbe` માટે નથી                                                                                                                                                                                                                                                                                                                |

ઉદાહરણનું માળખું (તમારા કોલ્ડ-સ્ટાર્ટ અને કમ્પ્રેશન લોડ અનુસાર થ્રેશોલ્ડ સમાયોજિત કરો):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # ઇવેન્ટ-લૂપ અવરોધ દરમિયાન HTTP /livez નો સમય હજુ પણ સમાપ્ત થઈ શકે છે. TCP એ
  # સાવચેતીભર્યો વિકલ્પ છે:
  # tcpSocket:
  #   port: http
```

kubelet **સજીવતા**ને `/api/monitoring/health` તરફ નિર્દેશિત **ન કરો**. આ પાથ વાસ્તવિક DB/મોનિટરિંગ કાર્ય કરે છે અને લોડ હેઠળ ખોટો પોઝિટિવ આપશે.

સંબંધિત: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (ઇવેન્ટ લૂપ વ્યસ્ત હોય ત્યારે પ્રોબ), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (કૅટલૉગ પ્રાઇસિંગ દ્વારા સંસાધનોનો વધુ પડતો ઉપયોગ), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (કમ્પ્રેશન ટોકન-કાઉન્ટ દ્વારા સંસાધનોનો વધુ પડતો ઉપયોગ).

### વૈકલ્પિક રિક્વેસ્ટ-પાથ કાર્ય (મેમરી, સ્કિલ્સ, ટોકન રિફ્રેશ)

મેમરી એક્સટ્રેક્શન, સ્કિલ્સ ઇન્જેક્શન અને OAuth ટોકન રિફ્રેશ `/healthz` સાથે **મુખ્ય Node ઇવેન્ટ લૂપ** શેર કરે છે. તે ડૅશબોર્ડ-ટૉગલ સુવિધાઓ (`memoryEnabled`, `skillsEnabled`) છે, વર્કર પૂલ નથી. [પર્યાવરણ — ઇવેન્ટ-લૂપ ખર્ચ](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) જુઓ.

### પ્રોવાઇડરનું સ્વાસ્થ્ય

> **કોઈ REST એન્ડપોઇન્ટ નથી.** પ્રોવાઇડરનું સ્વાસ્થ્ય ડેટા MCP ટૂલ `observability_snapshot` અથવા ડૅશબોર્ડના `/dashboard/providers` પેજ દ્વારા ઉપલબ્ધ છે.

### પ્રોવાઇડરની વિગતો

> **કોઈ REST એન્ડપોઇન્ટ નથી.** દરેક પ્રોવાઇડરની વિગતો ડૅશબોર્ડના `/dashboard/providers` પેજ દ્વારા ઉપલબ્ધ છે.

---

## પ્રદાતા આરોગ્ય ઑટોપાઇલટ

`providerHealthAutopilot.ts` મોડ્યુલ એક **સ્વ-સુધારક સિસ્ટમ** છે, જે:

1. પ્રદાતાની સમસ્યાઓ શોધે છે (સર્કિટ ખુલ્લું હોવું, કૂલડાઉન, લૉકઆઉટ, ક્વોટા ચેતવણીઓ)
2. તેમને ઉકેલવા માટે **ભલામણ કરેલી ક્રિયાઓ** બનાવે છે
3. વૈકલ્પિક રીતે ઓછા જોખમવાળી ક્રિયાઓ **આપમેળે અમલમાં મૂકે છે**

### શોધવામાં આવતી સમસ્યાઓના પ્રકાર

| સમસ્યાનો પ્રકાર              | ગંભીરતા | ઉદાહરણ સ્થિતિ                                   |
| ---------------------------- | ------- | ----------------------------------------------- |
| `provider_circuit_open`      | ગંભીર   | 5 નિષ્ફળતાઓ પછી સર્કિટ બ્રેકર ખુલ્લું છે        |
| `provider_circuit_half_open` | ચેતવણી  | સર્કિટની પુનઃપ્રાપ્તિનું પરીક્ષણ ચાલી રહ્યું છે |
| `connection_cooldown`        | ચેતવણી  | 429 પછી કનેક્શન કૂલડાઉનમાં છે                   |
| `stale_connection_error`     | ચેતવણી  | છેલ્લું રિફ્રેશ 30+ મિનિટ પહેલાં નિષ્ફળ થયું    |
| `terminal_connection_error`  | ગંભીર   | OAuth રદ થયું, કી અમાન્ય છે                     |
| `inactive_connection`        | માહિતી  | સેટિંગ્સમાં કનેક્શન અક્ષમ કરેલું છે             |
| `model_lockout`              | ચેતવણી  | ચોક્કસ મોડલ ક્વોરન્ટાઇનમાં છે                   |
| `quota_monitor_warning`      | ચેતવણી  | ક્વોટાનો 80%+ ઉપયોગ થયો છે                      |

### જનરેટ થતી ક્રિયાઓના પ્રકાર

| ક્રિયા                         | જોખમ  | વર્ણન                                   |
| ------------------------------ | ----- | --------------------------------------- |
| `clear_provider_breaker`       | મધ્યમ | સર્કિટ બ્રેકરને બંધ સ્થિતિમાં રીસેટ કરો |
| `clear_connection_cooldown`    | ઓછું  | કનેક્શન પરથી કૂલડાઉન દૂર કરો            |
| `clear_stale_connection_error` | ઓછું  | જૂના એરરનું ફ્લૅગ સાફ કરો               |
| `clear_model_lockout`          | ઓછું  | ક્વોરન્ટાઇન કરેલું મોડલ ફરી સક્ષમ કરો   |
| `reactivate_connection`        | મધ્યમ | નિષ્ક્રિય કરેલું કનેક્શન ફરી સક્ષમ કરો  |
| `deactivate_connection`        | ઊંચું | સમસ્યાજનક કનેક્શન અક્ષમ કરો             |

### API

> **કોઈ REST એન્ડપોઇન્ટ નથી.** ઑટોપાઇલટની સમસ્યાઓ MCP ટૂલ `observability_snapshot` અથવા ડૅશબોર્ડ દ્વારા ઉપલબ્ધ છે. ઑટોપાઇલટ આંતરિક રીતે ચાલે છે; તેનું વર્તન સેટિંગ્સ DB દ્વારા ગોઠવાય છે (દરેક કનેક્શનનું `autopilotMode` ફીલ્ડ), એન્વાયર્નમેન્ટ વેરિએબલ્સ દ્વારા નહીં — ઑટોપાઇલટ-મોડના એન્વાયર્નમેન્ટ વેરિએબલ માટે `grep -rn` ચલાવવાથી કોઈ પરિણામ મળતું નથી.

### ઑટોપાઇલટ મોડ

ઑટોપાઇલટ ડિફૉલ્ટ રૂપે **મેન્યુઅલ મોડ**માં કાર્ય કરે છે — તે સમસ્યાઓ શોધે છે અને ભલામણ કરેલી ક્રિયાઓ બનાવે છે, પરંતુ તેમને આપમેળે લાગુ કરતું નથી. ક્રિયાઓ ડૅશબોર્ડ દ્વારા લાગુ કરી શકાય છે.

---

## કૉમ્બો આરોગ્ય ઑટોપાઇલટ

`comboHealthAutopilot.ts` એ પ્રદાતા ઑટોપાઇલટનું **કૉમ્બો-વિશિષ્ટ** સમકક્ષ છે. તે:

- અસ્વસ્થ કૉમ્બો શોધે છે
- લક્ષ્યોનો ક્રમ બદલવાની ભલામણ કરે છે
- ખામીયુક્ત લક્ષ્યોને અક્ષમ કરવાનું સૂચવે છે
- N નિષ્ફળતાઓ પછી નિષ્ક્રિય લક્ષ્યોને આપમેળે દૂર કરે છે

### કૉમ્બો સમસ્યાઓનાં ઉદાહરણો

```
કૉમ્બો "always-on" (પ્રાથમિકતા વ્યૂહરચના)
├─ લક્ષ્ય 1: openai/gpt-5 (સ્વસ્થ)
├─ લક્ષ્ય 2: anthropic/claude-opus-4-6 (⚠️ 14:00 સુધી મોડલ લૉકઆઉટ)
└─ લક્ષ્ય 3: kiro/claude-sonnet-4-5 (સ્વસ્થ)

ભલામણ કરેલી ક્રિયા: ક્રમ બદલો — લૉકઆઉટ સમાપ્ત થાય ત્યાં સુધી kiroને anthropicથી ઉપર ખસેડો
```

---

## ક્વોટા મોનિટર્સ

`observability.ts` સબ્સ્ક્રિપ્શન પ્રદાતાઓ (Claude Code, Codex, GitHub Copilot) માટે **દર-સેશન ક્વોટા મોનિટર્સ** પ્રદાન કરે છે:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### સ્થિતિઓના અર્થ

| સ્થિતિ      | ક્યારે                     | UI ક્રિયા                             |
| ----------- | -------------------------- | ------------------------------------- |
| `starting`  | પ્રારંભિક પોલ ચાલુ છે      | સ્પિનર                                |
| `idle`      | કોઈ તાજેતરની પ્રવૃત્તિ નથી | ડૅશબોર્ડથી છુપાયેલું                  |
| `healthy`   | 50%થી વધુ ક્વોટા બાકી છે   | લીલું બિંદુ                           |
| `warning`   | 50%થી ઓછો ક્વોટા બાકી છે   | પીળી ચેતવણી                           |
| `exhausted` | ક્વોટા = 0%                | લાલ બ્લૉક, આગળના પ્રદાતા તરફ રૂટ કરો  |
| `error`     | પોલિંગ નિષ્ફળ થયું         | લાલ બિંદુ, ટૂંક સમયમાં ફરી પ્રયાસ કરો |

### API

> **કોઈ REST એન્ડપોઇન્ટ નથી.** ક્વોટા મોનિટરનો ડેટા MCP ટૂલ `observability_snapshot` અથવા ડૅશબોર્ડ દ્વારા ઉપલબ્ધ છે.

---

## અવલોકનક્ષમતા સ્નૅપશૉટ

MCP ટૂલ `observability_snapshot` AI એજન્ટો માટે **સંપૂર્ણ સિસ્ટમ સ્નૅપશૉટ** પરત કરે છે:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ઉપર જુઓ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

એજન્ટો તેનો ઉપયોગ **રાઉટિંગ નિર્ણયો** લેવા માટે કરે છે — ઉદાહરણ તરીકે, "જો openaiનું સર્કિટ ખુલ્લું હોય, તો પહેલાં anthropic પર રાઉટ કરો".

---

## ટોકન સ્વાસ્થ્ય તપાસ

OAuth પ્રદાતાઓ (Claude Code, GitHub Copilot, Cursor)ને **સમયાંતરે ટોકન રિફ્રેશ** કરવાની જરૂર પડે છે. `src/lib/tokenHealthCheck.ts` પૃષ્ઠભૂમિ શેડ્યૂલર ચલાવે છે:

- **સ્વીપ ટિક**: દર 60 સેકન્ડે (`src/lib/tokenHealthCheck.ts:30` પર `TICK_MS = 60 * 1000` મુજબ સ્વીપ)
- **દરેક કનેક્શનનો સ્વાસ્થ્ય તપાસ અંતરાલ**: ડિફૉલ્ટ રૂપે 60 મિનિટ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); સેટિંગ્સ DB મારફતે રૂપરેખાંકિત કરી શકાય છે
- **401 પર આગોતરું રિફ્રેશ**: દરેક કનેક્શનના ઇન્ટરસેપ્ટર દ્વારા સંચાલિત થાય છે

### ટોકન સ્વાસ્થ્ય સ્થિતિ

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### રૂપરેખાંકન

ટોકન સ્વાસ્થ્ય તપાસનું રૂપરેખાંકન `tokenHealthCheck.ts` દ્વારા આંતરિક રીતે સંચાલિત થાય છે.

### ટોકન સ્વાસ્થ્ય

> **કોઈ REST એન્ડપોઇન્ટ નથી.** ટોકન સ્વાસ્થ્ય ડેટા ડૅશબોર્ડ અથવા MCP ટૂલ `observability_snapshot` મારફતે ઉપલબ્ધ છે.

---

## ચેતવણીઓ

### બિલ્ટ-ઇન ચૅનલો

OmniRoute **3 ચેતવણી ચૅનલો**ને સપોર્ટ કરે છે:

| ચૅનલ          | સેટઅપ               | ઉપયોગનો પ્રસંગ            |
| ------------- | ------------------- | ------------------------- |
| ડૅશબોર્ડ બૅનર | હંમેશાં ચાલુ        | ઍપની અંદરની સૂચનાઓ        |
| Webhook       | URL રૂપરેખાંકિત કરો | Slack, Discord, PagerDuty |
| લૉગ           | ડિફૉલ્ટ             | બાહ્ય લૉગ એકત્રીકરણ માટે  |

### Webhook રૂપરેખાંકન

> **નોંધ:** Webhook ચેતવણીનું રૂપરેખાંકન ડૅશબોર્ડના Settings પેજ મારફતે સંચાલિત થાય છે. Webhook URL, ઇવેન્ટ ફિલ્ટરિંગ અને પેલોડ કસ્ટમાઇઝેશન માટે Settings UI જુઓ.

### ચેતવણીના પ્રકારો

| ચેતવણી                       | ક્યારે                                                     | ડિફૉલ્ટ ગંભીરતા |
| ---------------------------- | ---------------------------------------------------------- | --------------- |
| `provider_circuit_open`      | સર્કિટ ખુલે ત્યારે                                         | ગંભીર           |
| `provider_circuit_half_open` | સર્કિટ પુનઃપ્રાપ્તિનું પરીક્ષણ કરે ત્યારે                  | માહિતીપ્રદ      |
| `quota_warning`              | ક્વોટા 80%+ પર હોય ત્યારે                                  | ચેતવણી          |
| `quota_exhausted`            | ક્વોટા 100% પર હોય ત્યારે                                  | ગંભીર           |
| `token_refresh_failed`       | સતત 3+ રિફ્રેશ નિષ્ફળતાઓ થાય ત્યારે                        | ચેતવણી          |
| `token_expired`              | ટોકનની સમાપ્તિ અવધિ વીતી જાય ત્યારે                        | ગંભીર           |
| `combo_target_unhealthy`     | કૉમ્બો ટાર્ગેટ 1 કલાકથી વધુ સમય માટે કૂલડાઉનમાં હોય ત્યારે | ચેતવણી          |
| `db_integrity_warning`       | FK ઉલ્લંઘનો > 0 હોય ત્યારે                                 | ચેતવણી          |
| `heap_pressure`              | હીપનો ઉપયોગ થ્રેશોલ્ડના 80% કરતાં વધુ હોય ત્યારે           | ચેતવણી          |

---

## કામગીરી મેટ્રિક્સ

### ટ્રૅક કરાયેલા મેટ્રિક્સ

| મેટ્રિક                 | પ્રકાર      | સ્રોત                           |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | કાઉન્ટર     | `services/usage.ts`             |
| `request_latency_ms`    | હિસ્ટોગ્રામ | `services/usage.ts`             |
| `tokens_consumed`       | કાઉન્ટર     | `services/usage.ts`             |
| `cost_usd`              | કાઉન્ટર     | `services/usage.ts`             |
| `provider_errors`       | કાઉન્ટર     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | કાઉન્ટર     | `services/resilience.ts`        |
| `cache_hits`            | કાઉન્ટર     | `services/signatureCache.ts`    |
| `compression_savings`   | હિસ્ટોગ્રામ | `services/compression/stats.ts` |
| `quota_used`            | ગેજ         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ગેજ         | `observability.ts`              |

### લેટન્સી પર્સેન્ટાઇલ્સ (p50/p95/p99)

> **કોઈ REST એન્ડપોઇન્ટ નથી.** લેટન્સી પર્સેન્ટાઇલ ડેટા ડૅશબોર્ડના `/dashboard/health` પેજ દ્વારા ઉપલબ્ધ છે. Prometheus/OpenTelemetry નિકાસ v3.9 માટે આયોજિત છે.

### Prometheus / OpenTelemetry નિકાસ (તબક્કો 2)

v3.9 માટે આયોજિત: Prometheus, OpenTelemetry, Datadog પર નેટિવ નિકાસ.

હાલ માટે, કોઈપણ HTTP-આધારિત મોનિટરિંગ સિસ્ટમ (Prometheus blackbox exporter, Datadog HTTP check વગેરે) વડે `/api/monitoring/health` સ્ક્રેપ કરો.

---

## ચેતવણી રેસિપીઓ

### Slack

> **નોંધ:** Webhook ચેતવણી ડૅશબોર્ડના Settings પેજ દ્વારા ગોઠવવામાં આવે છે — કોઈ સમર્પિત webhook env vars નથી (`grep -rn` શૂન્ય પરિણામો આપે છે). webhook URL, ઇવેન્ટ ફિલ્ટરિંગ અને પેલોડ કસ્ટમાઇઝેશન માટે Settings UI જુઓ.

### Discord

> Webhook ચેતવણી Slack જેવી જ Settings UI પ્રક્રિયાનો ઉપયોગ કરે છે. Discord સમાન JSON પેલોડ સ્વરૂપ સ્વીકારે છે.

### PagerDuty

> Webhook ચેતવણી સમાન Settings UI પ્રક્રિયાનો ઉપયોગ કરે છે. PagerDuty Events API v2 રાઉટિંગ કીઓ Settings UI માં ગોઠવવામાં આવે છે.

### કસ્ટમ Webhook (JSON)

> JSON બોડી સાથે POST સ્વીકારતું કોઈપણ HTTP એન્ડપોઇન્ટ કાર્ય કરશે. URL ને Settings UI માં ગોઠવો.

---

## ડૅશબોર્ડ ગોઠવણી

### હેલ્થ ડૅશબોર્ડને કસ્ટમાઇઝ કરો

એક `~/.omniroute/dashboard.json` બનાવો:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### પ્રદાતાને ટોચ પર પિન કરો

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## સમસ્યાનિવારણ

### "પ્રદાતા સ્વસ્થ હોવાનું કહે છે, પરંતુ વિનંતીઓ નિષ્ફળ થાય છે"

1. **autopilot સમસ્યાઓ** તપાસો — કદાચ કોઈ મોડેલ લૉક આઉટ થયેલું હોય
2. ચોક્કસ ભૂલ વર્ગ માટે **તાજેતરની ભૂલો** જુઓ
3. પ્રદાતા કાર્ડમાં **કનેક્શન ટેસ્ટ** અજમાવો
4. તપાસો કે પ્રદાતા **અપસ્ટ્રીમ પર રેટ-લિમિટેડ** છે કે નહીં (સ્થાનિક રીતે દેખાતું નથી)

### "ક્વોટા સ્વસ્થ હોવાનું કહે છે, પરંતુ મને 429s દેખાય છે"

- 429 નો અર્થ છે કે પ્રદાતા કહે છે કે તમે તમારો ક્વોટા વાપરી લીધો છે
- OmniRoute નું ક્વોટા ટ્રૅકિંગ **જૂનું** હોઈ શકે છે — પ્રદાતાની અપસ્ટ્રીમ માહિતી જ અધિકૃત છે
- આંતરિક ક્વોટા મોનિટર દ્વારા ક્વોટા ડેટા આપમેળે રિફ્રેશ થાય છે

### "કોમ્બો નિષ્ફળ થઈ રહ્યું છે, પરંતુ બધા લક્ષ્યો સ્વસ્થ દેખાય છે"

- લક્ષ્યોના ક્રમ સંબંધિત સમસ્યાઓ માટે **કોમ્બો હેલ્થ** ડૅશબોર્ડ તપાસો
- **ફૉલબૅક ઇવેન્ટ્સ** જુઓ — કદાચ કોમ્બો ખૂબ ઝડપથી બધા વિકલ્પો વાપરી રહ્યું છે
- ખાતરી કરો કે **વ્યૂહરચના** તમારા ઉપયોગના કિસ્સા સાથે મેળ ખાય છે (પ્રાથમિકતા વિરુદ્ધ રાઉન્ડ-રોબિન વિરુદ્ધ ઑટો)

### "ડેટાબેઝ હેલ્થ ચેક નિષ્ફળ થઈ રહ્યું છે"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ચલાવો
- જો "ok" હોય — આ ખોટી ચેતવણી છે, હેલ્થ ચેક અતિશય કડક છે
- જો કંઈ બીજું હોય — **OmniRoute બંધ કરો** અને [આપત્તિ પુનઃપ્રાપ્તિ માર્ગદર્શિકા](./DATABASE_GUIDE.md#disaster-recovery) અનુસરો

### "મેમરી હીપ પરનું દબાણ ગંભીર છે"

```bash
# વર્તમાન હીપ તપાસો
node -e "console.log(process.memoryUsage())"

# મેન્યુઅલ GC ટ્રિગર કરો (જો --expose-gc હોય)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# સમકાલીન વિનંતીઓ ઘટાડો (ડૅશબોર્ડના Settings પેજ દ્વારા સેટ કરો, env var દ્વારા નહીં)
# કોઈ `MAX_CONCURRENT_REQUESTS` env var નથી — તેને Settings → Concurrency માં ગોઠવો.
```

---

## આ પણ જુઓ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — વપરાશ અને ખર્ચનું ટ્રૅકિંગ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB સ્કીમા + આરોગ્ય
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — પ્રોક્સી આરોગ્ય (અલગ કૅશ)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — સિસ્ટમ આર્કિટેક્ચર
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — સર્કિટ બ્રેકરની વિગતો
- સ્રોત: `src/lib/monitoring/` (4 ફાઇલો, 2121 LOC)
