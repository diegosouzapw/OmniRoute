# Monitoring & Observability Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **சுருக்கமாக**: OmniRoute உள்ளமைக்கப்பட்ட ஆரோக்கியக் கண்காணிப்பு, வழங்குநர் தானியக்க இயக்கம், ஒதுக்கீட்டுக் கண்காணிப்பு மற்றும் கண்காணிப்புத்தன்மை ஹுக்குகளுடன் வழங்கப்படுகிறது. இந்த வழிகாட்டி டாஷ்போர்டு, விழிப்பூட்டல்கள் மற்றும் சிக்கல் தீர்த்தல் ஆகியவற்றை விளக்குகிறது.

**மூலங்கள்:**

- `src/lib/monitoring/observability.ts` — கண்காணிப்புத்தன்மை நிலைப்படம்
- `src/lib/monitoring/comboHealthAutopilot.ts` — சேர்க்கை ஆரோக்கியத் தானியக்க இயக்கம்
- `src/lib/monitoring/providerHealthAutopilot.ts` — வழங்குநர் தானியக்க இயக்கம்
- `src/lib/monitoring/providerHealthMatrix.ts` — வழங்குநர் ஆரோக்கிய அணி
- `src/lib/localHealthCheck.ts` — உள்ளூர் ஆரோக்கியச் சரிபார்ப்பு
- `src/lib/tokenHealthCheck.ts` — டோக்கன் புதுப்பிப்பு ஆரோக்கியம்
- `src/lib/proxyHealth.ts` — ப்ராக்ஸி ஆரோக்கியத் தற்காலிகச் சேமிப்பு (PROXY_GUIDE.md-இல் விளக்கப்பட்டுள்ளது)

---

## மேலோட்டம்

OmniRoute-இல் **3 கண்காணிப்பு அடுக்குகள்** உள்ளன:

```
┌──────────────────────────────────────────────────────────────┐
│  அடுக்கு 1: அமைப்பு ஆரோக்கியம் (சேவையக நிலை)                  │
│  ├─ localHealthCheck.ts — DB, போர்ட்கள், சொந்த சார்புகள்      │
│  ├─ db/healthCheck.ts — ஒருமைப்பாடு, FK, தொடர்பற்ற உருவாக்கங்கள் │
│  └─ டாஷ்போர்டு: /dashboard/health                            │
├──────────────────────────────────────────────────────────────┤
│  அடுக்கு 2: வழங்குநர் ஆரோக்கியம் (ஒவ்வொரு வழங்குநரின் மீட்சித்திறன்) │
│  ├─ providerHealthAutopilot.ts — சுற்று முறிப்பான், இடைநிறுத்தங்கள் │
│  ├─ providerHealthMatrix.ts — வழங்குநர்/மாதிரி வாரியான ஆரோக்கிய மதிப்பெண்கள் │
│  └─ டாஷ்போர்டு: /dashboard/providers                         │
├──────────────────────────────────────────────────────────────┤
│  அடுக்கு 3: நேரடி கண்காணிப்புத்தன்மை (இயக்கநேர நிலைப்படங்கள்) │
│  ├─ observability.ts — சுற்று முறிப்பான்கள், அமர்வுகள், ஒதுக்கீடு │
│  ├─ tokenHealthCheck.ts — OAuth டோக்கன் புதுப்பிப்பு ஆரோக்கியம் │
│  └─ MCP கருவிகள்: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## டாஷ்போர்டு பக்கங்கள்

### `/dashboard/health` (அமைப்பு ஆரோக்கியம்)

உயர்நிலை ஆரோக்கிய டாஷ்போர்டு பின்வருவனவற்றைக் காட்டுகிறது:

| பிரிவு                           | அது காட்டுவது                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------- |
| **சேவையக நிலை**                  | இயங்குநேரம், பதிப்பு, போர்ட், செயலில் உள்ள இணைப்புகள்                           |
| **தரவுத்தளம்**                   | இணைப்பு, ஒருமைப்பாடு, WAL அளவு, சமீபத்திய இடம்பெயர்வுகள்                        |
| **வழங்குநர் சுருக்கம்**          | செயலில் உள்ள எண்ணிக்கை, ஆரோக்கியமான எண்ணிக்கை, திறந்த முறிப்பான்களின் எண்ணிக்கை |
| **ஒதுக்கீட்டுக் கண்காணிப்பிகள்** | செயலில் உள்ள அமர்வுகள், விழிப்பூட்டல் நிலை, தீர்ந்துபோனவை                       |
| **சமீபத்திய பிழைகள்**            | ஸ்டாக் தடங்களுடன் கடைசி 10 பிழைகள்                                              |
| **வளப் பயன்பாடு**                | நினைவகம், CPU, ஹீப் அழுத்தக் குறிகாட்டி                                         |

### `/dashboard/providers` (வழங்குநர் ஆரோக்கியம்)

ஒவ்வொரு வழங்குநருக்குமான டாஷ்போர்டு:

| நெடுவரிசை  | விளக்கம்                                            |
| ---------- | --------------------------------------------------- |
| வழங்குநர்  | வழங்குநர் ID + காட்சிப் பெயர்                       |
| ஆரோக்கியம் | பச்சை/மஞ்சள்/சிவப்பு நிலை                           |
| சுற்று     | திறந்த/மூடிய/பாதி-திறந்த நிலை                       |
| இணைப்புகள் | இணைப்புகளின் எண்ணிக்கை, கடைசிப் புதுப்பிப்பு        |
| மாதிரிகள்  | கிடைக்கக்கூடிய மாதிரிகள், மாதிரி வாரியான ஆரோக்கியம் |
| செலவு      | இன்றைய செலவு, 7-நாள் போக்கு                         |
| பிழைகள்    | கடந்த 24h பிழை எண்ணிக்கை, முதன்மைப் பிழை வகுப்பு    |

ஒரு வழங்குநரைக் கிளிக் செய்து பின்வருவனவற்றைக் காணலாம்:

- தாமதப் பகுப்புடன் கூடிய சமீபத்திய கோரிக்கைகள்
- ஒவ்வொரு இணைப்புக்குமான ஆரோக்கிய மதிப்பெண்கள்
- ஒவ்வொரு மாதிரிக்குமான முடக்கங்கள்
- தானியக்க இயக்கப் பரிந்துரைகள்

### `/dashboard/quota` (ஒதுக்கீட்டுக் கண்காணிப்பு)

ஒவ்வொரு API விசைக்கும்:

- வரம்புடன் ஒப்பிடப்பட்ட தற்போதைய பயன்பாடு (முன்னேற்றப் பட்டை)
- ஒதுக்கீட்டுப் போக்கு (30-நாள் விளக்கப்படம்)
- அடுத்த மீட்டமைப்பு நேரம்
- விழிப்பூட்டல் வரலாறு

### `/dashboard/combos` (சேர்க்கை ஆரோக்கியம்)

ஒவ்வொரு சேர்க்கைக்கும்:

- உத்தி + இலக்குகள்
- ஒவ்வொரு இலக்குக்குமான ஆரோக்கியம்
- சமீபத்திய மாற்று வழிமுறை நிகழ்வுகள்
- வெற்றி விகிதம் (24h, 7d, 30d)

---

## ஆரோக்கியச் சரிபார்ப்பு API

OmniRoute **இரண்டு** HTTP ஆரோக்கிய முனைகளை வழங்குகிறது. Orchestrator-களுக்கு இவற்றை ஒன்றுக்கொன்று மாற்றிப் பயன்படுத்த முடியாது.

| பாதை                         | நோக்கம்                                                                    | சுமை                                       | எதற்குப் பயன்படுத்துவது                                                                         |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `GET /healthz`               | வாழ்நிலைச் சுழற்சியின் liveness/readiness (`ok` / `starting` / `stopping`) | மிகக் குறைவு (கட்டக் கொடி மட்டும்)         | Kubernetes **readiness**; HTTP-ஐப் பயன்படுத்த வேண்டிய கட்டாயம் இருந்தால் மென்மையான **liveness** |
| `GET /api/monitoring/health` | ஆழமான அமைப்பு + வழங்குநர் சுருக்கம் (DB, heap, catalog எண்ணிக்கைகள், …)    | அதிகம் (ஒத்திசைவான DB / கண்காணிப்புப் பணி) | Dashboard-கள், blackbox ஆழமான சரிபார்ப்புகள், Docker-இன் உள்ளமைந்த healthcheck                  |

> **குறிப்பு:** வழங்குநர் ஆரோக்கிய அட்டவணைகள், autopilot சிக்கல்கள், quota கண்காணிப்புகள், token ஆரோக்கியம் மற்றும் `/api/monitoring/health`-க்கு அப்பாற்பட்ட latency விவரங்கள் ஆகியவை **MCP கருவி** `observability_snapshot` அல்லது **dashboard** பக்கங்கள் மூலம் கிடைக்கின்றன — அவற்றுக்கென தனிப்பட்ட REST வழிகள் இல்லை.

இரண்டு வழிகளும் கோரிக்கைகளைக் கையாளும் **அதே Node event loop**-இல் இயங்குகின்றன. CPU-ஐ அதிகமாகப் பயன்படுத்தும் ஒரு பாதை (பெரிய `GET /v1/models` catalog பணி, நீண்ட-context compression / token counting) `/healthz` உட்பட **அனைத்து** HTTP handler-களையும் தாமதப்படுத்தலாம். Event-loop பரபரப்பாக உள்ளது ≠ process செயலிழந்துவிட்டது. அதிக வளம் பயன்படுத்தும் செயல்பாட்டைச் சரிசெய்வதற்கு முன்னுரிமை கொடுங்கள்; probe tuning தவறான நிறுத்தங்களைக் குறைப்பதற்கு மட்டுமே உதவும்.

### இலகுரக orchestrator probe

```bash
GET /healthz
# அல்லது HEAD /healthz
```

- server-இன் lifecycle phase தயாராக இருக்கும்போது **200** + body `ok`
- தொடக்கம் அல்லது நிறுத்தத்தின்போது **503** + `starting` / `stopping`
- செயலாக்கம்: `src/app/healthz/route.ts` (DB ping இல்லை)

### அமைப்பு ஆரோக்கியம் (ஆழமானது)

```bash
GET /api/monitoring/health
```

பதில்:

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

#### `credentialHealth`: probe-cache மற்றும் SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` என்பது **நினைவகத்திலுள்ள probe-cache
அளவீடு** ஆகும்; இது `provider_connections.test_status`-இன் நேரடி dump அல்ல. #12532-க்குப் பிறகு,
கோரிக்கைப் பாதை `getCachedCredentialHealthSummary()`-ஐ மட்டுமே படிக்கிறது; பின்னணிச் probes
event loop-க்கு வெளியே cache-ஐப் புதுப்பிக்கின்றன.

| அடுக்கு                       | எங்கு                                                                 | அதன் பொருள்                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Probe-cache அளவீடு            | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | process நினைவகத்தில் இன்னும் வைக்கப்பட்டுள்ள சமீபத்திய credential-health probe முடிவுகள். `source` எப்போதும் `probe-cache` ஆக இருக்கும்.                                                                                                                           |
| தோல்வியுற்ற connection விவரம் | `credentialHealth.failedConnections`                                  | **`failed > 0` ஆக இருக்கும்போது மட்டும்** இருக்கும். `status=error` கொண்ட cache row-களின் வரம்பிடப்பட்ட பட்டியல் (`connectionId`, `status`, சுத்திகரிக்கப்பட்ட `lastError` / `lastErrorType`). பட்டியல் அளவு வரம்பிடப்பட்டிருந்தால் `failedOmitted` அமைக்கப்படும். |
| SQLite நிலைத்த status         | `credentialHealth.staleDbNonOkCount`                                  | சேமிக்கப்பட்ட `test_status`, அறியப்பட்ட non-ok மதிப்பாக (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) இருக்கும் **செயலில் உள்ள** (`is_active=1`) connection row-களின் எண்ணிக்கை.                                               |

இந்த இரண்டு அடுக்குகளும் நோக்கத்துடனேயே வேறுபடலாம்:

- அளவீட்டில் `failed=0`, ஆனால் `staleDbNonOkCount>0` — சமீபத்திய
  probe-cache snapshot, `status=error` என எண்ணாத நிலைத்த
  `test_status` ஒன்றை (எடுத்துக்காட்டாக `expired` அல்லது `credits_exhausted`) SQLite இன்னும் கொண்டுள்ளது.
- அளவீட்டில் `failed>0`, ஆனால் SQLite ஆரோக்கியமாகத் தெரிகிறது — சமீபத்திய probe தோல்வியடைந்து
  cache செய்யப்பட்டுள்ளது; DB row இன்னும் புதுப்பிக்கப்படவில்லை அல்லது பின்னர் அழிக்கப்பட்டுள்ளது.

இந்த endpoint-ஐ scrape செய்யும்போது `provider_connections.test_status`-ஐ மட்டுமே அடிப்படையாகக் கொண்டு alert உருவாக்க வேண்டாம்.
நேரடி probe தோல்விகளுக்கு `failed` + `failedConnections`-ஐயும்,
சேமிக்கப்பட்ட நிலைத்த-status எண்ணிக்கை தேவைப்படும்போது `staleDbNonOkCount`-ஐயும் பயன்படுத்துங்கள்.

### Kubernetes probe பரிந்துரைகள்

OmniRoute என்பது **ஒற்றை Node process** (ஒரு event loop). வழக்கமான Docker `HEALTHCHECK`, இலகுரக `/healthz`-ஐ இலக்காகக் கொள்கிறது. kubelet liveness இடைவெளிகளுக்கு `/api/monitoring/health` **மிகவும் அதிகச் சுமை கொண்டது**.

| சோதனை                 | பரிந்துரைக்கப்பட்ட இலக்கு                                                             | குறிப்புகள்                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **தொடக்கம்**          | நீண்ட `failureThreshold` (அல்லது பெரிய `startPeriod`) உடன் HTTP `GET /healthz`        | தொடக்கநிலைத் துவக்கம் + SQLite இடமாற்றம் சில வினாடிகளுக்கு மேல் ஆகலாம்                                                                                                                                                                                                                                                                                                                                                           |
| **தயார்நிலை**         | HTTP `GET /healthz`                                                                   | வாழ்க்கைச்சுழற்சி `ok` / `starting` / `stopping` (200 எதிராக 503). லூப் CPU-ஆல் தடுக்கப்பட்டால் இன்னும் நிலை மாறிக்கொண்டே இருக்கும். **பல வினாடிகளுக்குப் பிறகு கிடைக்கும் 200 ஆரோக்கியமானதல்ல** (#10303) — 3-பைட் ஹேண்ட்லர் இயங்குவதற்கு முன்பு நிகழ்வு லூப்பிற்கு செயலாக்க நேரம் கிடைக்கவில்லை என்பதைக் குறிக்கிறது                                                                                                            |
| **உயிர்நிலை**         | HTTP `GET /livez`, **அல்லது பிரதான சேவை போர்ட்டில் TCP** (`PORT`, இயல்புநிலை `20128`) | `/livez` செயல்முறை இயங்குகிறதா என்பதை மட்டும் காட்டும் (ஹேண்ட்லர் இயங்கினால் எப்போதும் 200). இதுவும் அதே நிகழ்வு லூப்பைப் பகிர்கிறது — பரபரப்பு ≠ செயலிழப்பு; மேலும், TCP-ஐ விடச் சிறப்பாக நிகழ்வு-லூப் செயலாக்க நேரப் பற்றாக்குறையை (#10303) இது கண்டறியாது. பட்டியல்/சுருக்கச் சுமையின் கீழ் HTTP சோதனைகள் காலாவதியானால் **TCP**-ஐ விரும்பவும்; எந்த வழியிலும் குறுகிய நிகழ்வு-லூப் தடங்கல்களுக்காக pod-ஐ நிறுத்த **வேண்டாம்** |
| **ஆழ்ந்த ஆரோக்கியம்** | வெளிப்புறச் சரிபார்ப்பியிலிருந்து `GET /api/monitoring/health`                        | kubelet `livenessProbe` / குறுகிய இடைவெளியுள்ள `readinessProbe` ஆகியவற்றிற்கானது அல்ல                                                                                                                                                                                                                                                                                                                                            |

எடுத்துக்காட்டு வடிவம் (உங்கள் தொடக்கநிலைத் துவக்கம் மற்றும் சுருக்கச் சுமைக்கு ஏற்ப வரம்புகளைச் சரிசெய்யவும்):

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
  # நிகழ்வு-லூப் தடங்கலின்போது HTTP /livez இன்னும் காலாவதியாகலாம். TCP என்பது
  # எச்சரிக்கையான மாற்றுவழி:
  # tcpSocket:
  #   port: http
```

kubelet **உயிர்நிலைச் சோதனையை** `/api/monitoring/health`-க்குச் சுட்டிக்காட்ட **வேண்டாம்**. அந்தப் பாதை உண்மையான DB/கண்காணிப்புப் பணிகளைச் செய்கிறது; சுமையின் கீழ் தவறான நேர்மறை முடிவுகளை வழங்கும்.

தொடர்புடையவை: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (நிகழ்வு லூப் பரபரப்பாக இருக்கும்போதான சோதனைகள்), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (பட்டியல் விலை நிர்ணயத்தின் அதிகப்படியான வளப் பயன்பாடு), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (சுருக்க token எண்ணிக்கைக் கணக்கீட்டின் அதிகப்படியான வளப் பயன்பாடு).

### விருப்பக் கோரிக்கைப் பாதைப் பணிகள் (நினைவகம், திறன்கள், token புதுப்பித்தல்)

நினைவகப் பிரித்தெடுத்தல், திறன்கள் உட்செலுத்தல் மற்றும் OAuth token புதுப்பித்தல் ஆகியவை `/healthz` உடன் **பிரதான Node நிகழ்வு லூப்பைப்** பகிர்கின்றன. அவை dashboard-இல் மாற்றக்கூடிய அம்சங்கள் (`memoryEnabled`, `skillsEnabled`), worker pool அல்ல. [சூழல் — நிகழ்வு-லூப் செலவு](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) என்பதைப் பார்க்கவும்.

### வழங்குநர் ஆரோக்கியம்

> **REST endpoint இல்லை.** வழங்குநர் ஆரோக்கியத் தரவு MCP கருவியான `observability_snapshot` அல்லது dashboard-இன் `/dashboard/providers` பக்கம் வழியாகக் கிடைக்கும்.

### வழங்குநர் விவரம்

> **REST endpoint இல்லை.** ஒவ்வொரு வழங்குநருக்குமான விவரம் dashboard-இன் `/dashboard/providers` பக்கம் வழியாகக் கிடைக்கும்.

---

## வழங்குநர் ஆரோக்கியத் தானியக்க இயக்கி

`providerHealthAutopilot.ts` தொகுதி பின்வருவனவற்றைச் செய்யும் ஒரு **சுய-சீரமைப்பு அமைப்பு** ஆகும்:

1. வழங்குநர் சிக்கல்களைக் கண்டறிகிறது (சுற்று திறந்திருத்தல், காத்திருப்புக் காலங்கள், பூட்டுதல்கள், ஒதுக்கீட்டு எச்சரிக்கைகள்)
2. அவற்றைத் தீர்ப்பதற்கான **பரிந்துரைக்கப்பட்ட செயல்களை** உருவாக்குகிறது
3. விருப்பத்திற்கேற்ப, குறைந்த ஆபத்துள்ள செயல்களை **தானாகச் செயல்படுத்துகிறது**

### கண்டறியப்படும் சிக்கல் வகைகள்

| சிக்கல் வகை                  | தீவிரத்தன்மை  | எடுத்துக்காட்டு நிலை                                          |
| ---------------------------- | ------------- | ------------------------------------------------------------- |
| `provider_circuit_open`      | மிகத் தீவிரம் | 5 தோல்விகளுக்குப் பிறகு சுற்றுத் தடுப்பான் திறந்துள்ளது       |
| `provider_circuit_half_open` | எச்சரிக்கை    | சுற்று மீட்பைச் சோதிக்கிறது                                   |
| `connection_cooldown`        | எச்சரிக்கை    | 429-க்குப் பிறகு இணைப்பு காத்திருப்புக் காலத்தில் உள்ளது      |
| `stale_connection_error`     | எச்சரிக்கை    | கடைசிப் புதுப்பிப்பு 30+ நிமிடங்களுக்கு முன்பு தோல்வியடைந்தது |
| `terminal_connection_error`  | மிகத் தீவிரம் | OAuth திரும்பப் பெறப்பட்டது, விசை செல்லாது                    |
| `inactive_connection`        | தகவல்         | அமைப்புகளில் இணைப்பு முடக்கப்பட்டுள்ளது                       |
| `model_lockout`              | எச்சரிக்கை    | குறிப்பிட்ட மாதிரி தனிமைப்படுத்தப்பட்டுள்ளது                  |
| `quota_monitor_warning`      | எச்சரிக்கை    | ஒதுக்கீட்டுப் பயன்பாடு 80%+ ஆக உள்ளது                         |

### உருவாக்கப்படும் செயல் வகைகள்

| செயல்                          | ஆபத்து    | விளக்கம்                                             |
| ------------------------------ | --------- | ---------------------------------------------------- |
| `clear_provider_breaker`       | நடுத்தரம் | சுற்றுத் தடுப்பானை மூடிய நிலைக்கு மீட்டமைத்தல்       |
| `clear_connection_cooldown`    | குறைவு    | ஓர் இணைப்பிலிருந்து காத்திருப்புக் காலத்தை அகற்றுதல் |
| `clear_stale_connection_error` | குறைவு    | பழைய பிழைக் குறியீட்டை அழித்தல்                      |
| `clear_model_lockout`          | குறைவு    | தனிமைப்படுத்தப்பட்ட மாதிரியை மீண்டும் இயக்குதல்      |
| `reactivate_connection`        | நடுத்தரம் | செயலிழக்கச் செய்யப்பட்ட இணைப்பை மீண்டும் இயக்குதல்   |
| `deactivate_connection`        | அதிகம்    | சிக்கலான இணைப்பை முடக்குதல்                          |

### API

> **REST முனைப்புள்ளி இல்லை.** தானியக்க இயக்கிச் சிக்கல்கள் MCP கருவியான `observability_snapshot` அல்லது முகப்புப்பலகை வழியாகக் கிடைக்கின்றன. தானியக்க இயக்கி உட்புறமாக இயங்குகிறது; அதன் நடத்தை சூழல் மாறிகள் மூலம் அல்லாமல், அமைப்புகள் DB-யில் உள்ள ஒவ்வொரு இணைப்புக்குமான `autopilotMode` புலத்தின் மூலம் உள்ளமைக்கப்படுகிறது — தானியக்க இயக்கி பயன்முறை சூழல் மாறிக்காக `grep -rn` இயக்கினால் எந்தப் பொருத்தமும் கிடைக்காது.

### தானியக்க இயக்கிப் பயன்முறை

தானியக்க இயக்கி இயல்பாக **கைமுறைப் பயன்முறையில்** செயல்படுகிறது — இது சிக்கல்களைக் கண்டறிந்து பரிந்துரைக்கப்பட்ட செயல்களை உருவாக்குகிறது, ஆனால் அவற்றைத் தானாகப் பயன்படுத்தாது. செயல்களை முகப்புப்பலகை வழியாகப் பயன்படுத்தலாம்.

---

## சேர்க்கை ஆரோக்கியத் தானியக்க இயக்கி

`comboHealthAutopilot.ts` என்பது வழங்குநர் தானியக்க இயக்கிக்குச் சமமான **சேர்க்கை-சார்ந்த** அமைப்பாகும். இது:

- ஆரோக்கியமற்ற சேர்க்கைகளைக் கண்டறிகிறது
- இலக்குகளை மறுவரிசைப்படுத்தப் பரிந்துரைக்கிறது
- செயலிழந்த இலக்குகளை முடக்கப் பரிந்துரைக்கிறது
- N தோல்விகளுக்குப் பிறகு செயலற்ற இலக்குகளைத் தானாக அகற்றுகிறது

### சேர்க்கைச் சிக்கல் எடுத்துக்காட்டுகள்

```
சேர்க்கை "always-on" (முன்னுரிமை உத்தி)
├─ இலக்கு 1: openai/gpt-5 (ஆரோக்கியமாக உள்ளது)
├─ இலக்கு 2: anthropic/claude-opus-4-6 (⚠️ 14:00 வரை மாதிரி பூட்டப்பட்டுள்ளது)
└─ இலக்கு 3: kiro/claude-sonnet-4-5 (ஆரோக்கியமாக உள்ளது)

பரிந்துரைக்கப்பட்ட செயல்: மறுவரிசைப்படுத்தவும் — பூட்டுதல் காலாவதியாகும் வரை kiro-ஐ anthropic-க்கு மேலே நகர்த்தவும்
```

---

## ஒதுக்கீட்டுக் கண்காணிப்பான்கள்

`observability.ts`, சந்தா வழங்குநர்களுக்கான (Claude Code, Codex, GitHub Copilot) **அமர்வு வாரியான ஒதுக்கீட்டுக் கண்காணிப்பான்களை** வழங்குகிறது:

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

### நிலைகளின் பொருள்

| நிலை        | எப்போது                                 | UI செயல்                                             |
| ----------- | --------------------------------------- | ---------------------------------------------------- |
| `starting`  | தொடக்கக் கருத்தாய்வு நடைபெறுகிறது       | சுழல் காட்டி                                         |
| `idle`      | அண்மையில் செயல்பாடு இல்லை               | முகப்புப்பலகையிலிருந்து மறைக்கப்படும்                |
| `healthy`   | 50%-க்கும் அதிகமான ஒதுக்கீடு மீதமுள்ளது | பச்சைப் புள்ளி                                       |
| `warning`   | 50%-க்கும் குறைவான ஒதுக்கீடு மீதமுள்ளது | மஞ்சள் எச்சரிக்கை                                    |
| `exhausted` | ஒதுக்கீடு = 0%                          | சிவப்புத் தடுப்பு, அடுத்த வழங்குநருக்கு வழிமாற்றுதல் |
| `error`     | கருத்தாய்வு தோல்வியடைந்தது              | சிவப்புப் புள்ளி, விரைவில் மீண்டும் முயற்சித்தல்     |

### API

> **REST முனைப்புள்ளி இல்லை.** ஒதுக்கீட்டுக் கண்காணிப்புத் தரவு MCP கருவியான `observability_snapshot` அல்லது முகப்புப்பலகை வழியாகக் கிடைக்கிறது.

---

## கண்காணிப்புத் திறன் ஸ்னாப்ஷாட்

MCP கருவியான `observability_snapshot`, AI முகவர்களுக்காக ஒரு **முழுமையான கணினி ஸ்னாப்ஷாட்டை** வழங்குகிறது:

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
  "quotaMonitors": {/* மேலே பார்க்கவும் */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

**வழிப்படுத்தல் முடிவுகளை** எடுக்க முகவர்கள் இதைப் பயன்படுத்துகின்றனர் — எடுத்துக்காட்டாக, "openai-இன் சுற்று திறந்திருந்தால், முதலில் anthropic-க்கு வழிப்படுத்தவும்".

---

## டோக்கன் நிலைச் சரிபார்ப்பு

OAuth வழங்குநர்களுக்கு (Claude Code, GitHub Copilot, Cursor) **குறிப்பிட்ட இடைவெளியில் டோக்கனைப் புதுப்பித்தல்** அவசியம். `src/lib/tokenHealthCheck.ts` பின்னணித் திட்டமிடுபவர் ஒன்றை இயக்குகிறது:

- **சுழற்சிச் சரிபார்ப்பு**: ஒவ்வொரு 60 வினாடிகளுக்கும் (`src/lib/tokenHealthCheck.ts:30`-இல் `TICK_MS = 60 * 1000` எனச் சுழற்சி நடைபெறும்)
- **ஒவ்வொரு இணைப்பிற்குமான நிலைச் சரிபார்ப்பு இடைவெளி**: இயல்பாக 60 நிமிடங்கள் (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); அமைப்புகள் DB வழியாக உள்ளமைக்கலாம்
- **401 ஏற்பட்டவுடன் முன்கூட்டிய புதுப்பிப்பு**: ஒவ்வொரு இணைப்பிற்குமான interceptor மூலம் கையாளப்படுகிறது

### டோக்கன் நிலை

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

### உள்ளமைவு

டோக்கன் நிலைச் சரிபார்ப்பு உள்ளமைவு, `tokenHealthCheck.ts` மூலம் அகநிலையில் கையாளப்படுகிறது.

### டோக்கன் நிலை

> **REST endpoint இல்லை.** டோக்கன் நிலைத் தரவு, டாஷ்போர்டு அல்லது MCP கருவியான `observability_snapshot` வழியாகக் கிடைக்கும்.

---

## விழிப்பூட்டல்

### உள்ளமைந்த சேனல்கள்

OmniRoute **3 விழிப்பூட்டல் சேனல்களை** ஆதரிக்கிறது:

| சேனல்            | அமைப்பு               | பயன்பாடு                             |
| ---------------- | --------------------- | ------------------------------------ |
| டாஷ்போர்டு பேனர் | எப்போதும் இயக்கத்தில் | பயன்பாட்டிற்குள் அறிவிப்புகள்        |
| Webhook          | URL-ஐ உள்ளமைக்கவும்   | Slack, Discord, PagerDuty            |
| பதிவு            | இயல்புநிலை            | வெளிப்புறப் பதிவு ஒருங்கிணைப்புக்காக |

### Webhook உள்ளமைவு

> **குறிப்பு:** Webhook விழிப்பூட்டல் உள்ளமைவு, டாஷ்போர்டின் அமைப்புகள் பக்கம் வழியாகக் கையாளப்படுகிறது. Webhook URL, நிகழ்வு வடிகட்டல் மற்றும் payload தனிப்பயனாக்கம் ஆகியவற்றிற்கு அமைப்புகள் UI-ஐப் பார்க்கவும்.

### விழிப்பூட்டல் வகைகள்

| விழிப்பூட்டல்                | எப்போது                                            | இயல்புநிலைத் தீவிரம் |
| ---------------------------- | -------------------------------------------------- | -------------------- |
| `provider_circuit_open`      | சுற்று திறக்கப்படும்போது                           | critical             |
| `provider_circuit_half_open` | சுற்று மீட்பைச் சோதிக்கும்போது                     | info                 |
| `quota_warning`              | ஒதுக்கீடு 80%+ ஆக இருக்கும்போது                    | warning              |
| `quota_exhausted`            | ஒதுக்கீடு 100% ஆக இருக்கும்போது                    | critical             |
| `token_refresh_failed`       | தொடர்ச்சியாக 3+ புதுப்பித்தல் தோல்விகள் ஏற்பட்டால் | warning              |
| `token_expired`              | டோக்கன் காலாவதியான பிறகு                           | critical             |
| `combo_target_unhealthy`     | Combo இலக்கு 1h+ வரை cooldown-இல் இருக்கும்போது    | warning              |
| `db_integrity_warning`       | FK மீறல்கள் > 0 ஆக இருக்கும்போது                   | warning              |
| `heap_pressure`              | Heap பயன்பாடு வரம்பின் 80%-ஐ மீறும்போது            | warning              |

---

## செயல்திறன் அளவீடுகள்

### கண்காணிக்கப்படும் அளவீடுகள்

| அளவீடு                  | வகை          | மூலம்                           |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | கவுண்டர்     | `services/usage.ts`             |
| `request_latency_ms`    | ஹிஸ்டோகிராம் | `services/usage.ts`             |
| `tokens_consumed`       | கவுண்டர்     | `services/usage.ts`             |
| `cost_usd`              | கவுண்டர்     | `services/usage.ts`             |
| `provider_errors`       | கவுண்டர்     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | கவுண்டர்     | `services/resilience.ts`        |
| `cache_hits`            | கவுண்டர்     | `services/signatureCache.ts`    |
| `compression_savings`   | ஹிஸ்டோகிராம் | `services/compression/stats.ts` |
| `quota_used`            | கேஜ்         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | கேஜ்         | `observability.ts`              |

### தாமத சதவீத மதிப்புகள் (p50/p95/p99)

> **REST முனைப்புள்ளி இல்லை.** தாமத சதவீதத் தரவு டாஷ்போர்டின் `/dashboard/health` பக்கத்தில் கிடைக்கிறது. Prometheus/OpenTelemetry ஏற்றுமதி v3.9-க்கு திட்டமிடப்பட்டுள்ளது.

### Prometheus / OpenTelemetry ஏற்றுமதி (கட்டம் 2)

v3.9-க்கு திட்டமிடப்பட்டுள்ளது: Prometheus, OpenTelemetry, Datadog ஆகியவற்றுக்கான நேரடி ஏற்றுமதி.

தற்போதைக்கு, ஏதேனும் HTTP-அடிப்படையிலான கண்காணிப்பு அமைப்பைப் பயன்படுத்தி `/api/monitoring/health`-இலிருந்து தரவைச் சேகரிக்கவும் (Prometheus blackbox exporter, Datadog HTTP check போன்றவை).

---

## எச்சரிக்கை அமைப்புக்கான வழிமுறைகள்

### Slack

> **குறிப்பு:** Webhook எச்சரிக்கைகள் டாஷ்போர்டின் Settings பக்கத்தின் மூலம் கட்டமைக்கப்படுகின்றன — இதற்கென தனிப்பட்ட webhook சூழல் மாறிகள் இல்லை (`grep -rn` பூஜ்ஜிய முடிவுகளை வழங்குகிறது). Webhook URL, நிகழ்வு வடிகட்டல் மற்றும் payload தனிப்பயனாக்கத்திற்கு Settings UI-ஐப் பார்க்கவும்.

### Discord

> Webhook எச்சரிக்கை அமைப்பு Slack போலவே அதே Settings UI செயல்முறையைப் பயன்படுத்துகிறது. Discord அதே JSON payload வடிவத்தை ஏற்கிறது.

### PagerDuty

> Webhook எச்சரிக்கை அமைப்பு அதே Settings UI செயல்முறையைப் பயன்படுத்துகிறது. PagerDuty Events API v2 routing keys, Settings UI-இல் கட்டமைக்கப்படுகின்றன.

### தனிப்பயன் Webhook (JSON)

> JSON body-உடன் POST கோரிக்கையை ஏற்கும் எந்த HTTP முனைப்புள்ளியும் செயல்படும். URL-ஐ Settings UI-இல் கட்டமைக்கவும்.

---

## டாஷ்போர்டு கட்டமைப்பு

### Health டாஷ்போர்டைத் தனிப்பயனாக்குதல்

`~/.omniroute/dashboard.json` கோப்பை உருவாக்கவும்:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ஒரு Provider-ஐ மேலே நிலைநிறுத்துதல்

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## சிக்கல் தீர்வு

### "Provider ஆரோக்கியமாக இருப்பதாகக் கூறுகிறது, ஆனால் கோரிக்கைகள் தோல்வியடைகின்றன"

1. **autopilot issues**-ஐச் சரிபார்க்கவும் — ஒரு model முடக்கப்பட்டிருக்கலாம்
2. குறிப்பிட்ட error class-க்கு **recent errors**-ஐப் பார்க்கவும்
3. Provider card-இல் உள்ள **connection test**-ஐ முயற்சிக்கவும்
4. Provider **upstream-இல் rate-limit செய்யப்பட்டுள்ளதா** எனச் சரிபார்க்கவும் (உள்ளூரில் காண முடியாது)

### "Quota ஆரோக்கியமாக இருப்பதாகக் கூறுகிறது, ஆனால் எனக்கு 429 பிழைகள் வருகின்றன"

- 429 என்பது உங்கள் quota-வைப் பயன்படுத்திவிட்டதாக provider கூறுவதைக் குறிக்கிறது
- OmniRoute-இன் quota கண்காணிப்பு **பழையதாக** இருக்கலாம் — provider-இன் upstream தகவலே உண்மையானது
- உள்ளக quota monitor மூலம் quota தரவு தானாகவே புதுப்பிக்கப்படுகிறது

### "அனைத்து targets-உம் ஆரோக்கியமாகத் தெரிந்தாலும் Combo தோல்வியடைகிறது"

- Target வரிசைப்படுத்தல் சிக்கல்களுக்காக **combo health** டாஷ்போர்டைச் சரிபார்க்கவும்
- **fallback events**-ஐப் பார்க்கவும் — combo மிக விரைவாக அனைத்து விருப்பங்களையும் பயன்படுத்திவிடக்கூடும்
- **strategy** உங்கள் பயன்பாட்டிற்கு ஏற்றதா என்பதை உறுதிப்படுத்தவும் (priority vs round-robin vs auto)

### "Database health check தோல்வியடைகிறது"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`-ஐ இயக்கவும்
- "ok" எனில் — இது தவறான எச்சரிக்கை; health check அளவுக்கு அதிகமாகக் கடுமையாக உள்ளது
- வேறு ஏதேனும் முடிவு எனில் — **OmniRoute-ஐ நிறுத்திவிட்டு**, [பேரிடர் மீட்பு வழிகாட்டியைப்](./DATABASE_GUIDE.md#disaster-recovery) பின்பற்றவும்

### "Memory heap அழுத்தம் ஆபத்தான நிலையில் உள்ளது"

```bash
# தற்போதைய heap-ஐச் சரிபார்க்கவும்
node -e "console.log(process.memoryUsage())"

# கைமுறை GC-ஐத் தூண்டவும் (--expose-gc இருந்தால்)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ஒரே நேரத்தில் செயல்படும் கோரிக்கைகளைக் குறைக்கவும் (env var மூலம் அல்லாமல், டாஷ்போர்டின் Settings பக்கத்தில் அமைக்கவும்)
# `MAX_CONCURRENT_REQUESTS` என்ற env var இல்லை — அதை Settings → Concurrency என்பதில் கட்டமைக்கவும்.
```

---

## மேலும் காண்க

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — பயன்பாடு மற்றும் செலவுக் கண்காணிப்பு
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB திட்டவடிவம் + ஆரோக்கியம்
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ப்ராக்ஸி ஆரோக்கியம் (தனித் தற்காலிகச் சேமிப்பகம்)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — கணினி கட்டமைப்பு
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — சர்க்யூட் பிரேக்கர் விவரங்கள்
- மூலம்: `src/lib/monitoring/` (4 கோப்புகள், 2121 LOC)
