# Monitoring & Observability Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute තුළ අන්තර්නිර්මිත සෞඛ්ය නිරීක්ෂණය, සැපයුම්කරු ස්වයංක්රීය නියමු පද්ධතිය, කෝටා ලුහුබැඳීම සහ නිරීක්ෂණ හැකියා හුක් ඇතුළත් වේ. මෙම මාර්ගෝපදේශය උපකරණ පුවරුව, අනතුරු ඇඟවීම් සහ දෝෂ නිරාකරණය ආවරණය කරයි.

**මූලාශ්ර:**

- `src/lib/monitoring/observability.ts` — නිරීක්ෂණ හැකියා සැණරුව
- `src/lib/monitoring/comboHealthAutopilot.ts` — සංයෝජන සෞඛ්ය ස්වයංක්රීය නියමුව
- `src/lib/monitoring/providerHealthAutopilot.ts` — සැපයුම්කරු ස්වයංක්රීය නියමුව
- `src/lib/monitoring/providerHealthMatrix.ts` — සැපයුම්කරු සෞඛ්ය අනුකෘතිය
- `src/lib/localHealthCheck.ts` — දේශීය සෞඛ්ය පරීක්ෂාව
- `src/lib/tokenHealthCheck.ts` — ටෝකන නැවුම් කිරීමේ සෞඛ්යය
- `src/lib/proxyHealth.ts` — ප්රොක්සි සෞඛ්ය හැඹිලිය (PROXY_GUIDE.md තුළ ආවරණය කර ඇත)

---

## දළ විශ්ලේෂණය

OmniRoute සතුව **නිරීක්ෂණ ස්තර 3ක්** ඇත:

```
┌──────────────────────────────────────────────────────────────┐
│  ස්තරය 1: පද්ධති සෞඛ්යය (සේවාදායක මට්ටම)                  │
│  ├─ localHealthCheck.ts — DB, පෝට්, ස්වදේශීය පරායත්තතා       │
│  ├─ db/healthCheck.ts — අඛණ්ඩතාව, FK, අනාථ කෘත්රිමක         │
│  └─ උපකරණ පුවරුව: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  ස්තරය 2: සැපයුම්කරු සෞඛ්යය (සැපයුම්කරු අනුව ඔරොත්තු දීම) │
│  ├─ providerHealthAutopilot.ts — පරිපථ බිඳිනය, සිසිලන කාල   │
│  ├─ providerHealthMatrix.ts — සැපයුම්කරු/මාදිලිය අනුව සෞඛ්ය ලකුණු │
│  └─ උපකරණ පුවරුව: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  ස්තරය 3: සජීවී නිරීක්ෂණ හැකියාව (ධාවනකාල සැණරු)           │
│  ├─ observability.ts — පරිපථ බිඳින, සැසි, කෝටාව              │
│  ├─ tokenHealthCheck.ts — OAuth ටෝකන නැවුම් කිරීමේ සෞඛ්යය  │
│  └─ MCP මෙවලම්: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## උපකරණ පුවරු පිටු

### `/dashboard/health` (පද්ධති සෞඛ්යය)

ඉහළ මට්ටමේ සෞඛ්ය උපකරණ පුවරුව පෙන්වන්නේ:

| කොටස                   | එය පෙන්වන දේ                                               |
| ---------------------- | ---------------------------------------------------------- |
| **සේවාදායක තත්ත්වය**   | ක්රියාකාලය, අනුවාදය, පෝට් එක, සක්රිය සම්බන්ධතා             |
| **දත්ත සමුදාය**        | සම්බන්ධතාව, අඛණ්ඩතාව, WAL ප්රමාණය, මෑත සංක්රමණ             |
| **සැපයුම්කරු සාරාංශය** | සක්රිය සංඛ්යාව, සෞඛ්ය සම්පන්න සංඛ්යාව, විවෘත බිඳින සංඛ්යාව |
| **කෝටා නිරීක්ෂක**      | සක්රිය සැසි, අනතුරු ඇඟවීම්, අවසන් වීම්                     |
| **මෑත දෝෂ**            | ස්ටැක් අනුරේඛන සහිත අවසන් දෝෂ 10                           |
| **සම්පත් භාවිතය**      | මතකය, CPU, හීප් පීඩන දර්ශකය                                |

### `/dashboard/providers` (සැපයුම්කරු සෞඛ්යය)

එක් එක් සැපයුම්කරු සඳහා උපකරණ පුවරුව:

| තීරුව      | විස්තරය                                       |
| ---------- | --------------------------------------------- |
| සැපයුම්කරු | සැපයුම්කරු ID + ප්රදර්ශන නාමය                 |
| සෞඛ්යය     | කොළ/කහ/රතු තත්ත්වය                            |
| පරිපථය     | විවෘත/වසා ඇති/අර්ධ-විවෘත තත්ත්වය              |
| සම්බන්ධතා  | සම්බන්ධතා සංඛ්යාව, අවසන් නැවුම් කිරීම         |
| මාදිලි     | ලබාගත හැකි මාදිලි, එක් එක් මාදිලියේ සෞඛ්යය    |
| පිරිවැය    | අද පිරිවැය, දින 7ක ප්රවණතාව                   |
| දෝෂ        | අවසන් පැය 24 තුළ දෝෂ සංඛ්යාව, ඉහළම දෝෂ පන්තිය |

බැලීමට සැපයුම්කරුවකු ක්ලික් කරන්න:

- ප්රමාද බිඳවැටීම සමඟ මෑත ඉල්ලීම්
- එක් එක් සම්බන්ධතාව සඳහා සෞඛ්ය ලකුණු
- එක් එක් මාදිලිය සඳහා අගුලු දැමීම්
- ස්වයංක්රීය නියමු නිර්දේශ

### `/dashboard/quota` (කෝටා ලුහුබැඳීම)

එක් එක් API යතුර සඳහා:

- වත්මන් භාවිතය සහ සීමාව අතර සැසඳීම (ප්රගති තීරුව)
- කෝටා ප්රවණතාව (දින 30ක ප්රස්තාරය)
- ඊළඟ යළි සැකසීමේ වේලාව
- අනතුරු ඇඟවීම් ඉතිහාසය

### `/dashboard/combos` (සංයෝජන සෞඛ්යය)

එක් එක් සංයෝජනය සඳහා:

- උපායමාර්ගය + ඉලක්ක
- එක් එක් ඉලක්කයේ සෞඛ්යය
- මෑත පසුබැසීමේ සිදුවීම්
- සාර්ථකත්ව අනුපාතය (පැය 24, දින 7, දින 30)

---

## සෞඛ්ය පරීක්ෂණ API

OmniRoute විසින් HTTP සෞඛ්ය අතුරුමුහුණත් **දෙකක්** සපයයි. Orchestrator සඳහා ඒවා එකිනෙක හුවමාරු කර භාවිත කළ නොහැක.

| මාර්ගය                       | අරමුණ                                                                | බර                                   | භාවිත කළ යුත්තේ                                                         |
| ---------------------------- | -------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| `GET /healthz`               | ජීවනචක්ර සජීවීභාවය/සූදානම්භාවය (`ok` / `starting` / `stopping`)      | ඉතා සුළු (අදියර ධජය පමණි)            | Kubernetes **සූදානම්භාවය**; HTTP භාවිතය අත්යවශ්ය නම් මෘදු **සජීවීභාවය** |
| `GET /api/monitoring/health` | පද්ධතිය + provider පිළිබඳ ගැඹුරු සාරාංශය (DB, heap, catalog ගණන්, …) | අධික (සමමුහුර්ත DB / අධීක්ෂණ කාර්යය) | Dashboard, blackbox ගැඹුරු පරීක්ෂණ, Docker හි අන්තර්ගත healthcheck      |

> **සටහන:** Provider සෞඛ්ය න්යාස, autopilot ගැටලු, quota අධීක්ෂක, token සෞඛ්යය සහ `/api/monitoring/health` ඉක්මවා යන latency විස්තර **MCP මෙවලම** `observability_snapshot` හෝ **dashboard** පිටු හරහා ලබා ගත හැක — ඒවා සඳහා වෙනම REST මාර්ග නොමැත.

මාර්ග දෙකම ඉල්ලීම් හැසිරවීමට භාවිත කරන **එකම Node event loop එක** මත ක්රියාත්මක වේ. CPU-මූලික මාර්ගයක් (විශාල `GET /v1/models` catalog කාර්යයක්, දිගු-context සම්පීඩනය / token ගණනය) `/healthz` ඇතුළුව **සියලුම** HTTP handler ප්රමාද කළ හැක. Event-loop එක කාර්යබහුල වීම ≠ process එක මිය යාම. සම්පත් අධිකව භාවිත කරන කාර්යය නිවැරදි කිරීමට ප්රමුඛතාව දෙන්න; probe සුසර කිරීමෙන් සිදුවන්නේ වැරදි kill කිරීම් අඩු කිරීම පමණි.

### සැහැල්ලු orchestrator probe එක

```bash
GET /healthz
# හෝ HEAD /healthz
```

- server ජීවනචක්ර අදියර සූදානම් වූ විට **200** + body එක `ok`
- ආරම්භ කිරීමේදී හෝ වසා දැමීමේදී **503** + `starting` / `stopping`
- ක්රියාත්මක කිරීම: `src/app/healthz/route.ts` (DB ping එකක් නොමැත)

### පද්ධති සෞඛ්යය (ගැඹුරු)

```bash
GET /api/monitoring/health
```

ප්රතිචාරය:

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

#### `credentialHealth`: probe-cache එදිරිව SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` යනු `provider_connections.test_status` හි සජීවී dump එකක් නොව, **මතකයේ පවතින probe-cache
මාපකයයි**. #12532 පසු ඉල්ලීම් මාර්ගය කියවන්නේ `getCachedCredentialHealthSummary()` පමණි; පසුබිම් probe මඟින් event loop එකෙන් පිටත cache එක
නැවුම් කරයි.

| ස්තරය                     | තිබෙන ස්ථානය                                                          | එයින් අදහස් වන්නේ                                                                                                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache මාපකය         | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | process මතකයේ තවමත් රඳවා ඇති අවසන් credential-health probe ප්රතිඵල. `source` සැමවිටම `probe-cache` වේ.                                                                                                            |
| අසාර්ථක connection විස්තර | `credentialHealth.failedConnections`                                  | **`failed > 0` වන විට පමණක්** පවතී. `status=error` සහිත cache row වල සීමා කළ ලැයිස්තුවකි (`connectionId`, `status`, පිරිසිදු කළ `lastError` / `lastErrorType`). ලැයිස්තුව සීමා කළ විට `failedOmitted` සකසනු ලැබේ. |
| SQLite ස්ථිර තත්ත්වය      | `credentialHealth.staleDbNonOkCount`                                  | සුරැකි `test_status` අගය දන්නා non-ok අගයක් (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) වන **සක්රිය** (`is_active=1`) connection row ගණන.                                   |

මෙම ස්තර දෙක සැලසුම් කළ පරිදි එකඟ නොවිය හැක:

- මාපකයේ `failed=0` නමුත් `staleDbNonOkCount>0` — නවතම
  probe-cache snapshot එක `status=error` ලෙස ගණන් නොගන්නා ස්ථිර
  `test_status` අගයක් (උදාහරණයක් ලෙස `expired` හෝ `credits_exhausted`) තවමත් SQLite තුළ ඇත.
- මාපකයේ `failed>0` නමුත් SQLite සෞඛ්ය සම්පන්න ලෙස පෙනේ — මෑත probe එකක් අසාර්ථක වී
  cache කර ඇත; DB row එක යාවත්කාලීන කර නොමැති හෝ පසුව ඉවත් කර ඇත.

මෙම endpoint එක scrape කරන විට `provider_connections.test_status` මත පමණක් පදනම්ව අනතුරු ඇඟවීම් නොයවන්න.
සජීවී probe අසාර්ථකතා සඳහා `failed` + `failedConnections` භාවිත කරන්න, සහ
සුරැකි ස්ථිර-තත්ත්ව ගණන අවශ්ය විට `staleDbNonOkCount` භාවිත කරන්න.

### Kubernetes probe නිර්දේශ

OmniRoute යනු **තනි Node process එකකි** (එක් event loop එකකි). සම්මත Docker `HEALTHCHECK` එක සැහැල්ලු `/healthz` ඉලක්ක කරයි. kubelet සජීවීභාව පරතර සඳහා `/api/monitoring/health` **අධික බරක් සහිතය**.

| පරීක්ෂණය                  | නිර්දේශිත ඉලක්කය                                                                    | සටහන්                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ආරම්භය**                | දිගු `failureThreshold` එකක් (හෝ විශාල `startPeriod` එකක්) සහිත HTTP `GET /healthz` | ශීත ආරම්භය + SQLite සංක්රමණය තත්පර කිහිපයක් ඉක්මවිය හැක                                                                                                                                                                                                                                                                                                                                        |
| **සූදානම**                | HTTP `GET /healthz`                                                                 | ජීවන චක්රය `ok` / `starting` / `stopping` (200 එදිරිව 503). ලූපය CPU මඟින් අවහිර වී ඇත්නම් තවමත් තත්ත්වය වෙනස් වේ. **තත්පර කිහිපයකට පසු ලැබෙන 200 ප්රතිචාරයක් සෞඛ්ය සම්පන්න බවක් නොපෙන්වයි** (#10303) — එයින් අදහස් වන්නේ බයිට් 3ක හසුරුවනය ක්රියාත්මක වීමට පෙර event loop එකට සම්පත් නොලැබුණු බවයි                                                                                            |
| **සජීවී බව**              | HTTP `GET /livez`, **හෝ ප්රධාන සේවා port එකෙහි TCP** (`PORT`, පෙරනිමිය `20128`)     | `/livez` මඟින් පෙන්වන්නේ process එක සජීවී බව පමණි (හසුරුවනය ක්රියාත්මක වුවහොත් සැමවිටම 200). එයද එකම event loop එක බෙදා ගනී — කාර්යබහුල ≠ අක්රිය, එමෙන්ම TCP වලට වඩා හොඳින් event-loop සම්පත් හිඟය (#10303) හඳුනා නොගනී. catalog/compression භාරය යටතේ HTTP පරීක්ෂණ කල් ඉකුත් වන්නේ නම් **TCP** වඩාත් යෝග්යය; කුමන ක්රමය භාවිත කළත් කෙටි event-loop ඇණහිටීම් හේතුවෙන් pod එක අවසන් **නොකරන්න** |
| **ගැඹුරු සෞඛ්ය පරීක්ෂාව** | බාහිර පරීක්ෂකයකුගෙන් `GET /api/monitoring/health`                                   | kubelet `livenessProbe` / දැඩි `readinessProbe` සඳහා නොවේ                                                                                                                                                                                                                                                                                                                                      |

උදාහරණ ව්යුහය (ඔබගේ ශීත ආරම්භයට සහ compression භාරයට ගැළපෙන පරිදි සීමාවන් සකසන්න):

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
  # event-loop ඇණහිටීමක් යටතේ HTTP /livez තවමත් කල් ඉකුත් විය හැක. TCP යනු
  # ආරක්ෂාකාරී විකල්පයයි:
  # tcpSocket:
  #   port: http
```

kubelet **liveness** පරීක්ෂණය `/api/monitoring/health` වෙත යොමු **නොකරන්න**. එම path එක සැබෑ DB/monitoring කාර්යයන් සිදු කරන අතර භාරය යටතේ වැරදි ධනාත්මක ප්රතිඵල ලබා දෙනු ඇත.

අදාළ: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (event loop එක කාර්යබහුලව තිබියදී සිදු කරන පරීක්ෂණ), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (catalog මිල ගණනය සම්පත් අධික ලෙස භාවිත කිරීම), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (compression token ගණනය සම්පත් අධික ලෙස භාවිත කිරීම).

### විකල්ප request-path කාර්යයන් (memory, skills, token refresh)

Memory extraction, skills injection සහ OAuth token refresh, `/healthz` සමඟ **ප්රධාන Node event loop** එක බෙදා ගනී. ඒවා worker pool එකක් නොව dashboard එකෙන් මාරු කළ හැකි විශේෂාංග (`memoryEnabled`, `skillsEnabled`) වේ. [Environment — event-loop පිරිවැය](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) බලන්න.

### Provider සෞඛ්යය

> **REST endpoint එකක් නොමැත.** Provider සෞඛ්ය දත්ත MCP tool එක වන `observability_snapshot` හරහා හෝ dashboard හි `/dashboard/providers` පිටුව හරහා ලබාගත හැක.

### Provider විස්තර

> **REST endpoint එකක් නොමැත.** එක් එක් provider සඳහා වන විස්තර dashboard හි `/dashboard/providers` පිටුව හරහා ලබාගත හැක.

---

## සැපයුම්කරු සෞඛ්ය ස්වයංක්රීය නියමු පද්ධතිය

`providerHealthAutopilot.ts` මොඩියුලය පහත දෑ සිදු කරන **ස්වයං-ප්රතිසාධන පද්ධතියකි**:

1. සැපයුම්කරු සම්බන්ධ ගැටලු හඳුනා ගනී (පරිපථය විවෘත වීම, ශීතකාල, අගුලු දැමීම්, කෝටා අනතුරු ඇඟවීම්)
2. ඒවා විසඳීම සඳහා **නිර්දේශිත ක්රියාමාර්ග** ජනනය කරයි
3. අඩු අවදානම් ක්රියාමාර්ග විකල්පයක් ලෙස **ස්වයංක්රීයව ක්රියාත්මක කරයි**

### හඳුනා ගන්නා ගැටලු වර්ග

| ගැටලු වර්ගය                  | බරපතළභාවය    | උදාහරණ තත්ත්වය                                   |
| ---------------------------- | ------------ | ------------------------------------------------ |
| `provider_circuit_open`      | තීරණාත්මක    | අසාර්ථක වීම් 5කට පසු පරිපථ බිඳිනය විවෘත වීම      |
| `provider_circuit_half_open` | අනතුරු ඇඟවීම | පරිපථය ප්රතිසාධනය පරීක්ෂා කරමින් සිටීම           |
| `connection_cooldown`        | අනතුරු ඇඟවීම | 429කට පසු සම්බන්ධතාව ශීතකාලයක පැවතීම             |
| `stale_connection_error`     | අනතුරු ඇඟවීම | අවසන් නැවුම් කිරීම මිනිත්තු 30කට පෙර අසාර්ථක වීම |
| `terminal_connection_error`  | තීරණාත්මක    | OAuth අවලංගු කර තිබීම, යතුර වලංගු නොවීම          |
| `inactive_connection`        | තොරතුරු      | සැකසුම් තුළ සම්බන්ධතාව අක්රිය කර තිබීම           |
| `model_lockout`              | අනතුරු ඇඟවීම | නිශ්චිත ආකෘතියක් නිරෝධායනය කර තිබීම              |
| `quota_monitor_warning`      | අනතුරු ඇඟවීම | කෝටා භාවිතය 80% හෝ ඊට වැඩි වීම                   |

### ජනනය කරන ක්රියාමාර්ග වර්ග

| ක්රියාමාර්ගය                   | අවදානම | විස්තරය                                 |
| ------------------------------ | ------ | --------------------------------------- |
| `clear_provider_breaker`       | මධ්යම  | පරිපථ බිඳිනය සංවෘත තත්ත්වයට යළි සකසන්න  |
| `clear_connection_cooldown`    | අඩු    | සම්බන්ධතාවයක ශීතකාලය ඉවත් කරන්න         |
| `clear_stale_connection_error` | අඩු    | කල් ඉකුත් වූ දෝෂ සලකුණ ඉවත් කරන්න       |
| `clear_model_lockout`          | අඩු    | නිරෝධායනය කළ ආකෘතියක් යළි සක්රිය කරන්න  |
| `reactivate_connection`        | මධ්යම  | අක්රිය කළ සම්බන්ධතාවක් යළි සක්රිය කරන්න |
| `deactivate_connection`        | ඉහළ    | ගැටලුකාරී සම්බන්ධතාවක් අක්රිය කරන්න     |

### API

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** ස්වයංක්රීය නියමු පද්ධතියේ ගැටලු MCP මෙවලම වන `observability_snapshot` හෝ උපකරණ පුවරුව හරහා ලබා ගත හැක. ස්වයංක්රීය නියමු පද්ධතිය අභ්යන්තරව ධාවනය වේ; එහි හැසිරීම පරිසර විචල්ය මඟින් නොව, සැකසුම් DB හරහා (එක් එක් සම්බන්ධතාවයේ `autopilotMode` ක්ෂේත්රය මඟින්) වින්යාස කරයි — ස්වයංක්රීය නියමු ප්රකාර පරිසර විචල්යයක් සඳහා `grep -rn` ධාවනය කළ විට ගැළපීම් කිසිවක් නොලැබේ.

### ස්වයංක්රීය නියමු ප්රකාරය

ස්වයංක්රීය නියමු පද්ධතිය පෙරනිමියෙන් **අතින් ක්රියාත්මක කරන ප්රකාරයේ** ක්රියා කරයි — එය ගැටලු හඳුනාගෙන නිර්දේශිත ක්රියාමාර්ග ජනනය කරන නමුත් ඒවා ස්වයංක්රීයව යොදන්නේ නැත. උපකරණ පුවරුව හරහා ක්රියාමාර්ග යෙදිය හැක.

---

## සංයෝජන සෞඛ්ය ස්වයංක්රීය නියමු පද්ධතිය

`comboHealthAutopilot.ts` යනු සැපයුම්කරු ස්වයංක්රීය නියමු පද්ධතියට සමාන **සංයෝජන-විශේෂිත** පද්ධතියයි. එය:

- සෞඛ්ය සම්පන්න නොවන සංයෝජන හඳුනා ගනී
- ඉලක්ක නැවත අනුපිළිවෙළට සැකසීම නිර්දේශ කරයි
- බිඳවැටුණු ඉලක්ක අක්රිය කිරීමට යෝජනා කරයි
- අසාර්ථක වීම් Nකට පසු ක්රියා විරහිත ඉලක්ක ස්වයංක්රීයව ඉවත් කරයි

### සංයෝජන ගැටලු සඳහා උදාහරණ

```
"always-on" සංයෝජනය (ප්රමුඛතා උපායමාර්ගය)
├─ ඉලක්කය 1: openai/gpt-5 (සෞඛ්ය සම්පන්නයි)
├─ ඉලක්කය 2: anthropic/claude-opus-4-6 (⚠️ 14:00 දක්වා ආකෘතිය අගුලු දමා ඇත)
└─ ඉලක්කය 3: kiro/claude-sonnet-4-5 (සෞඛ්ය සම්පන්නයි)

නිර්දේශිත ක්රියාමාර්ගය: නැවත අනුපිළිවෙළට සකසන්න — අගුලු දැමීම කල් ඉකුත් වන තෙක් kiro, anthropicට ඉහළින් තබන්න
```

---

## කෝටා නිරීක්ෂක

`observability.ts` මඟින් දායකත්ව සැපයුම්කරුවන් සඳහා (Claude Code, Codex, GitHub Copilot) **එක් එක් සැසියට අදාළ කෝටා නිරීක්ෂක** නිරාවරණය කරයි:

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

### තත්ත්වවල අර්ථ

| තත්ත්වය     | අවස්ථාව                        | UI ක්රියාව                               |
| ----------- | ------------------------------ | ---------------------------------------- |
| `starting`  | ආරම්භක විමසුම සිදු වෙමින් පවතී | භ්රමණ දර්ශකය                             |
| `idle`      | මෑත ක්රියාකාරකමක් නොමැත        | උපකරණ පුවරුවෙන් සඟවයි                    |
| `healthy`   | කෝටාවෙන් > 50%ක් ඉතිරිව ඇත     | කොළ පැහැති තිත                           |
| `warning`   | කෝටාවෙන් < 50%ක් ඉතිරිව ඇත     | කහ පැහැති අනතුරු ඇඟවීම                   |
| `exhausted` | කෝටාව = 0%                     | රතු අවහිරය, ඊළඟ සැපයුම්කරු වෙත යොමු කරයි |
| `error`     | විමසීම අසාර්ථක විය             | රතු තිත, ඉක්මනින් නැවත උත්සාහ කරයි       |

### API

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** කෝටා නිරීක්ෂක දත්ත MCP මෙවලම වන `observability_snapshot` හෝ උපකරණ පුවරුව හරහා ලබා ගත හැක.

---

## නිරීක්ෂණ හැකියා සැණරුව

MCP මෙවලම වන `observability_snapshot`, AI නියෝජිතයන් සඳහා **සම්පූර්ණ පද්ධති සැණරුවක්** ලබා දෙයි:

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
  "quotaMonitors": {/* ඉහත බලන්න */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

නියෝජිතයන් **මාර්ගගත කිරීමේ තීරණ** ගැනීමට මෙය භාවිත කරයි — උදාහරණයක් ලෙස, "openai පරිපථය විවෘත නම්, පළමුව anthropic වෙත මාර්ගගත කරන්න".

---

## ටෝකන සෞඛ්ය පරීක්ෂාව

OAuth සපයන්නන්ට (Claude Code, GitHub Copilot, Cursor) **කාලානුරූපී ටෝකන නැවුම් කිරීම** අවශ්ය වේ. `src/lib/tokenHealthCheck.ts` පසුබිම් කාලසටහන්කරුවක් ධාවනය කරයි:

- **පිරික්සුම් ක්රියා වාරය**: සෑම තත්පර 60කට වරක් (`src/lib/tokenHealthCheck.ts:30` හි `TICK_MS = 60 * 1000` ලෙස පිරික්සයි)
- **එක් සම්බන්ධතාවකට සෞඛ්ය පරීක්ෂා කාලාන්තරය**: පෙරනිමියෙන් මිනිත්තු 60කි (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); සැකසුම් DB හරහා වින්යාස කළ හැක
- **401 මත පූර්ව-ක්රියාකාරී නැවුම් කිරීම**: එක් එක් සම්බන්ධතාවේ interceptor මඟින් හසුරුවයි

### ටෝකන සෞඛ්ය තත්ත්වය

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

### වින්යාසය

ටෝකන සෞඛ්ය පරීක්ෂා වින්යාසය `tokenHealthCheck.ts` මඟින් අභ්යන්තරව හසුරුවයි.

### ටෝකන සෞඛ්යය

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** ටෝකන සෞඛ්ය දත්ත උපකරණ පුවරුව හෝ MCP මෙවලම වන `observability_snapshot` හරහා ලබාගත හැක.

---

## අනතුරු ඇඟවීම්

### අන්තර්ගත නාලිකා

OmniRoute **අනතුරු ඇඟවීම් නාලිකා 3කට** සහාය දක්වයි:

| නාලිකාව           | පිහිටුවීම            | භාවිත අවස්ථාව             |
| ----------------- | -------------------- | ------------------------- |
| උපකරණ පුවරු බැනරය | සැමවිටම සක්රියයි     | යෙදුම තුළ දැනුම්දීම්      |
| Webhook           | URL එක වින්යාස කරන්න | Slack, Discord, PagerDuty |
| ලොගය              | පෙරනිමිය             | බාහිර ලොග් සමුච්චය සඳහා   |

### Webhook වින්යාසය

> **සටහන:** Webhook අනතුරු ඇඟවීම් වින්යාසය උපකරණ පුවරුවේ Settings පිටුව හරහා හසුරුවයි. Webhook URL, සිදුවීම් පෙරීම සහ payload අභිරුචිකරණය සඳහා Settings UI බලන්න.

### අනතුරු ඇඟවීම් වර්ග

| අනතුරු ඇඟවීම                 | ඇති වන අවස්ථාව                                                | පෙරනිමි බරපතළතාව |
| ---------------------------- | ------------------------------------------------------------- | ---------------- |
| `provider_circuit_open`      | පරිපථය විවෘත වන විට                                           | තීරණාත්මක        |
| `provider_circuit_half_open` | පරිපථයේ ප්රතිසාධනය පරීක්ෂා කරන විට                            | තොරතුරු          |
| `quota_warning`              | කෝටාව 80% හෝ ඊට වැඩි විට                                      | අනතුරු ඇඟවීම     |
| `quota_exhausted`            | කෝටාව 100% වන විට                                             | තීරණාත්මක        |
| `token_refresh_failed`       | අඛණ්ඩ නැවුම් කිරීමේ අසාර්ථකවීම් 3ක් හෝ වැඩි විට               | අනතුරු ඇඟවීම     |
| `token_expired`              | ටෝකනයේ කල් ඉකුත් වීමේ කාලය පසු වූ විට                         | තීරණාත්මක        |
| `combo_target_unhealthy`     | Combo ඉලක්කය පැය 1ක් හෝ වැඩි කාලයක් cooldown තත්ත්වයේ ඇති විට | අනතුරු ඇඟවීම     |
| `db_integrity_warning`       | FK උල්ලංඝන ගණන 0ට වැඩි විට                                    | අනතුරු ඇඟවීම     |
| `heap_pressure`              | Heap භාවිතය සීමාවේ 80% ඉක්මවන විට                             | අනතුරු ඇඟවීම     |

---

## කාර්යසාධන ප්රමිතික

### නිරීක්ෂණය කරන ප්රමිතික

| ප්රමිතිකය               | වර්ගය        | මූලාශ්රය                        |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | ගණකය         | `services/usage.ts`             |
| `request_latency_ms`    | හිස්ටෝග්රෑමය | `services/usage.ts`             |
| `tokens_consumed`       | ගණකය         | `services/usage.ts`             |
| `cost_usd`              | ගණකය         | `services/usage.ts`             |
| `provider_errors`       | ගණකය         | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ගණකය         | `services/resilience.ts`        |
| `cache_hits`            | ගණකය         | `services/signatureCache.ts`    |
| `compression_savings`   | හිස්ටෝග්රෑමය | `services/compression/stats.ts` |
| `quota_used`            | මාපකය        | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | මාපකය        | `observability.ts`              |

### ප්රමාද ප්රතිශතක (p50/p95/p99)

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** ප්රමාද ප්රතිශතක දත්ත උපකරණ පුවරුවේ `/dashboard/health` පිටුව හරහා ලබාගත හැක. Prometheus/OpenTelemetry නිර්යාත කිරීම v3.9 සඳහා සැලසුම් කර ඇත.

### Prometheus / OpenTelemetry නිර්යාත කිරීම (අදියර 2)

v3.9 සඳහා සැලසුම් කර ඇත: Prometheus, OpenTelemetry සහ Datadog වෙත ස්වදේශීය නිර්යාත කිරීම.

දැනට, ඕනෑම HTTP-පාදක නිරීක්ෂණ පද්ධතියක් (Prometheus blackbox exporter, Datadog HTTP check, ආදිය) සමඟ `/api/monitoring/health` වෙතින් දත්ත රැස් කරන්න.

---

## ඇඟවීම් සැකසීමේ ක්රම

### Slack

> **සටහන:** Webhook ඇඟවීම් උපකරණ පුවරුවේ Settings පිටුව හරහා වින්යාස කරයි — ඒ සඳහා කැපවූ webhook පරිසර විචල්ය නොමැත (`grep -rn` ප්රතිඵල ශුන්යයක් ලබා දෙයි). Webhook URL, සිදුවීම් පෙරීම සහ payload අභිරුචිකරණය සඳහා Settings UI බලන්න.

### Discord

> Webhook ඇඟවීම් Slack සඳහා භාවිත කරන Settings UI ප්රවාහයම භාවිත කරයි. Discord එකම JSON payload ව්යුහය පිළිගනී.

### PagerDuty

> Webhook ඇඟවීම් එකම Settings UI ප්රවාහය භාවිත කරයි. PagerDuty Events API v2 මාර්ගගත කිරීමේ යතුරු Settings UI තුළ වින්යාස කරයි.

### අභිරුචි Webhook (JSON)

> JSON body එකක් සහිත POST පිළිගන්නා ඕනෑම HTTP අන්ත ලක්ෂ්යයක් ක්රියා කරයි. Settings UI තුළ URL එක වින්යාස කරන්න.

---

## උපකරණ පුවරු වින්යාසය

### සෞඛ්ය උපකරණ පුවරුව අභිරුචිකරණය කිරීම

`~/.omniroute/dashboard.json` එකක් සාදන්න:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### සැපයුම්කරුවෙකු ඉහළින් සවිකිරීම

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## දෝෂ නිරාකරණය

### "සැපයුම්කරු සෞඛ්ය සම්පන්න බව පවසන නමුත් ඉල්ලීම් අසාර්ථක වේ"

1. **autopilot ගැටලු** පරීක්ෂා කරන්න — ඇතැම්විට ආකෘතියක් අගුළු දමා තිබිය හැක
2. නිශ්චිත දෝෂ පන්තිය සඳහා **මෑත දෝෂ** බලන්න
3. සැපයුම්කරුගේ කාඩ්පතේ ඇති **සම්බන්ධතා පරීක්ෂණය** උත්සාහ කරන්න
4. සැපයුම්කරුට **ඉහළ මූලාශ්රයේදී අනුපාත සීමාවක් පනවා තිබේද** යන්න පරීක්ෂා කරන්න (දේශීයව නොපෙනේ)

### "කෝටාව සෞඛ්ය සම්පන්න බව පවසන නමුත් මට 429 දෝෂ පෙනේ"

- 429 යනු ඔබ ඔබේ කෝටාව භාවිත කර අවසන් බව සැපයුම්කරු පවසන බවයි
- OmniRoute හි කෝටා නිරීක්ෂණය **යල් පැන තිබිය** හැක — සැපයුම්කරුගේ සත්ය තත්ත්වය ඉහළ මූලාශ්රයේ පවතී
- අභ්යන්තර කෝටා නිරීක්ෂකය හරහා කෝටා දත්ත ස්වයංක්රීයව නැවුම් වේ

### "සියලු ඉලක්ක සෞඛ්ය සම්පන්න ලෙස පෙනුණත් Combo එක අසාර්ථක වේ"

- ඉලක්ක අනුපිළිවෙළේ ගැටලු සඳහා **Combo සෞඛ්ය** උපකරණ පුවරුව පරීක්ෂා කරන්න
- **Fallback සිදුවීම්** බලන්න — ඇතැම්විට Combo එක ඉතා ඉක්මනින් සියලු විකල්ප අවසන් කරයි
- **උපායමාර්ගය** ඔබේ භාවිත අවස්ථාවට ගැළපෙන බව තහවුරු කරන්න (ප්රමුඛතාව එදිරිව round-robin එදිරිව auto)

### "දත්ත සමුදා සෞඛ්ය පරීක්ෂාව අසාර්ථක වේ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ධාවනය කරන්න
- "ok" නම් — එය සාවද්ය අනතුරු ඇඟවීමකි; සෞඛ්ය පරීක්ෂාව අතිශයින් දැඩි ලෙස ක්රියා කරයි
- වෙනත් යමක් ලැබේ නම් — **OmniRoute නවතා** [ආපදා ප්රතිසාධන මාර්ගෝපදේශය](./DATABASE_GUIDE.md#disaster-recovery) අනුගමනය කරන්න

### "මතක heap පීඩනය තීරණාත්මක මට්ටමක පවතී"

```bash
# වත්මන් heap එක පරීක්ෂා කරන්න
node -e "console.log(process.memoryUsage())"

# අතින් GC ක්රියාත්මක කරන්න (--expose-gc නම්)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# සමගාමී ඉල්ලීම් අඩු කරන්න (පරිසර විචල්යයකින් නොව, උපකරණ පුවරුවේ Settings පිටුව හරහා සකසන්න)
# `MAX_CONCURRENT_REQUESTS` පරිසර විචල්යයක් නොමැත — Settings → Concurrency තුළ එය වින්යාස කරන්න.
```

---

## තවද බලන්න

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — භාවිතය සහ පිරිවැය නිරීක්ෂණය
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB යෝජනා ක්රමය + සෞඛ්ය තත්ත්වය
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ප්රොක්සි සෞඛ්ය තත්ත්වය (වෙනම හැඹිලිය)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — පද්ධති ගෘහනිර්මාණය
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — පරිපථ බිඳිනය පිළිබඳ විස්තර
- මූලාශ්රය: `src/lib/monitoring/` (ගොනු 4ක්, LOC 2121ක්)
