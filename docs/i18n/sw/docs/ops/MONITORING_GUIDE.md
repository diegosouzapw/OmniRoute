# Monitoring & Observability Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute huja na ufuatiliaji wa afya uliojengewa ndani, rubani otomatiki wa watoa huduma, ufuatiliaji wa kiwango cha matumizi, na viunganishi vya uangalizi. Mwongozo huu unaelezea dashibodi, arifa, na utatuzi wa matatizo.

**Vyanzo:**

- `src/lib/monitoring/observability.ts` — muhtasari wa uangalizi
- `src/lib/monitoring/comboHealthAutopilot.ts` — rubani otomatiki wa afya ya mchanganyiko
- `src/lib/monitoring/providerHealthAutopilot.ts` — rubani otomatiki wa mtoa huduma
- `src/lib/monitoring/providerHealthMatrix.ts` — matriki ya afya ya watoa huduma
- `src/lib/localHealthCheck.ts` — ukaguzi wa afya wa ndani
- `src/lib/tokenHealthCheck.ts` — afya ya uonyeshaji upya wa tokeni
- `src/lib/proxyHealth.ts` — akiba ya afya ya proksi (imeelezewa katika PROXY_GUIDE.md)

---

## Muhtasari

OmniRoute ina **tabaka 3 za ufuatiliaji**:

```
┌──────────────────────────────────────────────────────────────┐
│  Tabaka la 1: Afya ya Mfumo (kiwango cha seva)                │
│  ├─ localHealthCheck.ts — DB, milango, vitegemezi asilia      │
│  ├─ db/healthCheck.ts — uadilifu, FK, mabaki yasiyo na rejea  │
│  └─ Dashibodi: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Tabaka la 2: Afya ya Watoa Huduma (ustahimilivu kwa kila mtoa)│
│  ├─ providerHealthAutopilot.ts — kivunja mzunguko, vipindi vya kusubiri │
│  ├─ providerHealthMatrix.ts — alama za afya kwa mtoa/modeli   │
│  └─ Dashibodi: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Tabaka la 3: Uangalizi wa Moja kwa Moja (muhtasari wa wakati wa utekelezaji) │
│  ├─ observability.ts — vivunja mzunguko, vipindi, kiwango cha matumizi │
│  ├─ tokenHealthCheck.ts — afya ya uonyeshaji upya wa tokeni ya OAuth │
│  └─ Zana za MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Kurasa za Dashibodi

### `/dashboard/health` (Afya ya Mfumo)

Dashibodi ya afya ya kiwango cha juu inaonyesha:

| Sehemu                                    | Inachoonyesha                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| **Hali ya seva**                          | Muda wa kufanya kazi, toleo, mlango, miunganisho amilifu                |
| **Hifadhidata**                           | Muunganisho, uadilifu, ukubwa wa WAL, uhamishaji wa hivi karibuni       |
| **Muhtasari wa watoa huduma**             | Idadi amilifu, idadi yenye afya, idadi ya vivunja mzunguko vilivyo wazi |
| **Vifuatiliaji vya kiwango cha matumizi** | Vipindi amilifu, utoaji wa arifa, vilivyoisha                           |
| **Hitilafu za hivi karibuni**             | Hitilafu 10 za mwisho pamoja na mfuatano wa rafu                        |
| **Matumizi ya rasilimali**                | Kumbukumbu, CPU, kiashirio cha shinikizo la heap                        |

### `/dashboard/providers` (Afya ya Watoa Huduma)

Dashibodi ya kila mtoa huduma:

| Safu        | Maelezo                                                      |
| ----------- | ------------------------------------------------------------ |
| Mtoa huduma | Kitambulisho cha mtoa huduma + jina la kuonyeshwa            |
| Afya        | Hali ya kijani/manjano/nyekundu                              |
| Mzunguko    | Hali ya wazi/iliyofungwa/nusu-wazi                           |
| Miunganisho | Idadi ya miunganisho, uonyeshaji upya wa mwisho              |
| Modeli      | Modeli zinazopatikana, afya kwa kila modeli                  |
| Gharama     | Gharama ya leo, mwenendo wa siku 7                           |
| Hitilafu    | Idadi ya hitilafu za saa 24 zilizopita, aina kuu ya hitilafu |

Bofya mtoa huduma ili kuona:

- Maombi ya hivi karibuni pamoja na uchanganuzi wa muda wa kusubiri
- Alama za afya kwa kila muunganisho
- Uzuiaji kwa kila modeli
- Mapendekezo ya rubani otomatiki

### `/dashboard/quota` (Ufuatiliaji wa Kiwango cha Matumizi)

Kwa kila ufunguo wa API:

- Matumizi ya sasa dhidi ya kikomo (upau wa maendeleo)
- Mwenendo wa kiwango cha matumizi (chati ya siku 30)
- Wakati unaofuata wa kuweka upya
- Historia ya arifa

### `/dashboard/combos` (Afya ya Mchanganyiko)

Kwa kila mchanganyiko:

- Mkakati + malengo
- Afya kwa kila lengo
- Matukio ya hivi karibuni ya kutumia chaguo mbadala
- Kiwango cha mafanikio (saa 24, siku 7, siku 30)

---

## API ya Ukaguzi wa Afya

OmniRoute hutoa sehemu **mbili** za afya kupitia HTTP. Haziwezi kutumika kwa kubadilishana katika viratibu.

| Njia                         | Madhumuni                                                                  | Uzito                                                   | Tumia kwa                                                                           |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /healthz`               | Uhai/utayari wa mzunguko wa maisha (`ok` / `starting` / `stopping`)        | Mwepesi sana (alama ya awamu pekee)                     | **Utayari** wa Kubernetes; **uhai** usio mkali ikiwa ni lazima utumie HTTP          |
| `GET /api/monitoring/health` | Muhtasari wa kina wa mfumo + watoa huduma (DB, heap, idadi za katalogi, …) | Mzito (kazi ya DB / ufuatiliaji inayosubiri kukamilika) | Dashibodi, ukaguzi wa kina wa blackbox, ukaguzi wa afya uliojengewa ndani wa Docker |

> **Kumbuka:** Majedwali ya afya ya watoa huduma, matatizo ya autopilot, vifuatiliaji vya kikomo cha matumizi, afya ya tokeni, na maelezo ya muda wa kusubiri yanayozidi `/api/monitoring/health` yanapatikana kupitia **zana ya MCP** `observability_snapshot` au kurasa za **dashibodi** — hakuna njia mahususi za REST kwa hayo.

Njia zote mbili hutekelezwa kwenye **event loop ileile ya Node** inayoshughulikia maombi. Njia inayotumia CPU kwa kiwango kikubwa (kazi ya katalogi kubwa ya `GET /v1/models`, ufinyaji wa muktadha mrefu / kuhesabu tokeni) inaweza kuchelewesha vishughulikiaji **vyote** vya HTTP, ikiwemo `/healthz`. Event loop kuwa na shughuli nyingi ≠ mchakato kufa. Pendelea kurekebisha kinachosababisha mzigo; kurekebisha mipangilio ya probe hupunguza tu kusitishwa kimakosa.

### Probe nyepesi ya kiratibu

```bash
GET /healthz
# au HEAD /healthz
```

- **200** + mwili `ok` wakati awamu ya mzunguko wa maisha wa seva iko tayari
- **503** + `starting` / `stopping` wakati wa kuwasha au kuzima
- Utekelezaji: `src/app/healthz/route.ts` (hakuna ping ya DB)

### Afya ya Mfumo (ya kina)

```bash
GET /api/monitoring/health
```

Jibu:

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

#### `credentialHealth`: akiba ya probe dhidi ya `test_status` ya SQLite

`GET /api/monitoring/health` → `credentialHealth` ni **kipimo cha akiba ya probe kilicho
kwenye kumbukumbu**, si nakala ya moja kwa moja ya `provider_connections.test_status`. Baada ya #12532,
njia ya ombi husoma `getCachedCredentialHealthSummary()` pekee; probe za usuli
husasisha akiba nje ya event loop.

| Tabaka                             | Mahali                                                                | Maana yake                                                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kipimo cha akiba ya probe          | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Matokeo ya mwisho ya probe ya afya ya kitambulisho ambayo bado yamehifadhiwa kwenye kumbukumbu ya mchakato. `source` daima ni `probe-cache`.                                                                                  |
| Maelezo ya muunganisho ulioshindwa | `credentialHealth.failedConnections`                                  | Huwepo **tu wakati `failed > 0`**. Orodha yenye kikomo ya safu za akiba zenye `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` zilizosafishwa). `failedOmitted` huwekwa wakati orodha imefikia kikomo. |
| Hali ya kudumu ya SQLite           | `credentialHealth.staleDbNonOkCount`                                  | Idadi ya safu za miunganisho **inayotumika** (`is_active=1`) ambazo `test_status` yake iliyohifadhiwa ni hali inayojulikana kuwa si sawa (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).   |

Tabaka hizi mbili zinaweza kutofautiana kwa makusudi:

- Kipimo `failed=0` huku `staleDbNonOkCount>0` — SQLite bado ina
  `test_status` ya kudumu (kwa mfano `expired` au `credits_exhausted`) ambayo snapshot ya hivi karibuni
  ya akiba ya probe haihesabu kama `status=error`.
- Kipimo `failed>0` huku SQLite ikionekana kuwa na afya — probe ya hivi karibuni ilishindwa na
  imehifadhiwa kwenye akiba; safu ya DB haijasasishwa, au ilisafishwa baadaye.

Usitoe tahadhari kwa kutegemea tu `provider_connections.test_status` unapochota data kutoka
endpoint hii. Tumia `failed` + `failedConnections` kwa hitilafu za moja kwa moja za probe, na
`staleDbNonOkCount` unapohitaji idadi ya hali za kudumu zilizohifadhiwa.

### Mapendekezo ya probe za Kubernetes

OmniRoute ni **mchakato mmoja wa Node** (event loop moja). `HEALTHCHECK` ya kawaida ya Docker hulenga `/healthz` iliyo nyepesi. `/api/monitoring/health` ni **nzito mno** kwa vipindi vya ukaguzi wa uhai vya kubelet.

| Uchunguzi        | Lengo linalopendekezwa                                                                  | Vidokezo                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Uanzishaji**   | HTTP `GET /healthz` yenye `failureThreshold` ndefu (au `startPeriod` kubwa)             | Uanzishaji wa kwanza + uhamishaji wa SQLite unaweza kuzidi sekunde chache                                                                                                                                                                                                                                                                                                                                                                           |
| **Utayari**      | HTTP `GET /healthz`                                                                     | Hali za mzunguko wa maisha `ok` / `starting` / `stopping` (200 dhidi ya 503). Bado hubadilika-badilika ikiwa kitanzi kimezuiwa na CPU. **Jibu la 200 linalochukua sekunde kadhaa si dalili ya afya nzuri** (#10303) — linamaanisha kitanzi cha matukio kilikosa muda wa kuchakata kabla ya kishughulikiaji cha baiti 3 kutekelezwa                                                                                                                  |
| **Uhai**         | HTTP `GET /livez`, **au TCP** kwenye port kuu ya huduma (`PORT`, chaguo-msingi `20128`) | `/livez` huonyesha tu kuwa mchakato uko hai (daima 200 ikiwa kishughulikiaji kinatekelezwa). Bado hutumia kitanzi kilekile cha matukio — kuwa na shughuli nyingi ≠ kufa, na haitambui kunyimwa muda kwa kitanzi cha matukio (#10303) vizuri zaidi kuliko TCP. Pendelea **TCP** ikiwa uchunguzi wa HTTP unaisha muda chini ya mzigo wa katalogi/mbano; **usiue** pod kwa sababu ya kusimama kwa muda mfupi kwa kitanzi cha matukio kwa vyovyote vile |
| **Afya ya kina** | `GET /api/monitoring/health` kutoka kwa kikaguzi cha nje                                | Si ya `livenessProbe` ya kubelet / `readinessProbe` yenye vipindi vifupi                                                                                                                                                                                                                                                                                                                                                                            |

Mfano wa muundo (rekebisha viwango kulingana na mzigo wako wa uanzishaji wa kwanza na mbano):

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
  # Kitanzi cha matukio kikisimama, HTTP /livez bado inaweza kuisha muda. TCP ndiyo
  # njia mbadala ya tahadhari zaidi:
  # tcpSocket:
  #   port: http
```

**Usielekeze** **liveness** ya kubelet kwenye `/api/monitoring/health`. Njia hiyo hufanya kazi halisi ya DB/ufuatiliaji na itatoa matokeo chanya ya uongo chini ya mzigo.

Yanayohusiana: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (uchunguzi wakati kitanzi cha matukio kina shughuli nyingi), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (bei za katalogi zinazotumia rasilimali nyingi), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (uhesabuji wa tokeni za mbano unaotumia rasilimali nyingi).

### Kazi ya hiari ya njia ya ombi (kumbukumbu, ujuzi, kuonyesha upya tokeni)

Uchimbaji wa kumbukumbu, uingizaji wa ujuzi, na kuonyesha upya tokeni ya OAuth hutumia **kitanzi kikuu cha matukio cha Node** pamoja na `/healthz`. Hivi ni vipengele vinavyowashwa au kuzimwa kwenye dashibodi (`memoryEnabled`, `skillsEnabled`), si kundi la michakato ya kazi. Tazama [Mazingira — gharama ya kitanzi cha matukio](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Afya ya Mtoa Huduma

> **Hakuna endpoint ya REST.** Data ya afya ya mtoa huduma inapatikana kupitia zana ya MCP `observability_snapshot` au ukurasa wa dashibodi `/dashboard/providers`.

### Maelezo ya Mtoa Huduma

> **Hakuna endpoint ya REST.** Maelezo ya kila mtoa huduma yanapatikana kupitia ukurasa wa dashibodi `/dashboard/providers`.

---

## Otopiloti ya Afya ya Mtoa Huduma

Moduli ya `providerHealthAutopilot.ts` ni **mfumo wa kujirekebisha wenyewe** ambao:

1. Hugundua matatizo ya mtoa huduma (saketi kuwa wazi, vipindi vya kusubiri, vizuizi, maonyo ya kikomo)
2. Huzalisha **vitendo vinavyopendekezwa** ili kuyatatua
3. Kwa hiari, **hutekeleza kiotomatiki** vitendo vyenye hatari ndogo

### Aina za Matatizo Yanayogunduliwa

| Aina ya tatizo               | Ukali   | Mfano wa hali                                              |
| ---------------------------- | ------- | ---------------------------------------------------------- |
| `provider_circuit_open`      | muhimu  | Kivunja saketi kiko wazi baada ya hitilafu 5               |
| `provider_circuit_half_open` | onyo    | Saketi inapima urejeshaji                                  |
| `connection_cooldown`        | onyo    | Muunganisho uko katika kipindi cha kusubiri baada ya 429   |
| `stale_connection_error`     | onyo    | Uonyeshaji upya wa mwisho ulishindwa dakika 30+ zilizopita |
| `terminal_connection_error`  | muhimu  | OAuth imebatilishwa, ufunguo si halali                     |
| `inactive_connection`        | taarifa | Muunganisho umezimwa katika mipangilio                     |
| `model_lockout`              | onyo    | Modeli mahususi iko karantini                              |
| `quota_monitor_warning`      | onyo    | Matumizi ya kikomo yamefikia 80%+                          |

### Aina za Vitendo Vinavyozalishwa

| Kitendo                        | Hatari  | Maelezo                                          |
| ------------------------------ | ------- | ------------------------------------------------ |
| `clear_provider_breaker`       | wastani | Weka upya kivunja saketi katika hali iliyofungwa |
| `clear_connection_cooldown`    | ndogo   | Ondoa kipindi cha kusubiri kwenye muunganisho    |
| `clear_stale_connection_error` | ndogo   | Futa kiashiria cha hitilafu ya zamani            |
| `clear_model_lockout`          | ndogo   | Washa tena modeli iliyowekwa karantini           |
| `reactivate_connection`        | wastani | Washa tena muunganisho uliozimwa                 |
| `deactivate_connection`        | kubwa   | Zima muunganisho wenye matatizo                  |

### API

> **Hakuna REST endpoint.** Matatizo ya otopiloti yanapatikana kupitia zana ya MCP `observability_snapshot` au dashibodi. Otopiloti huendeshwa ndani ya mfumo; tabia yake husanidiwa kupitia hifadhidata ya mipangilio (sehemu ya `autopilotMode` kwa kila muunganisho), si kupitia vigeu vya mazingira — `grep -rn` ya kigeu cha mazingira cha hali ya otopiloti hurejesha matokeo sifuri.

### Hali ya Otopiloti

Kwa chaguo-msingi, otopiloti hufanya kazi katika **hali ya kuendeshwa kwa mikono** — hugundua matatizo na kuzalisha vitendo vinavyopendekezwa, lakini haivitekelezi kiotomatiki. Vitendo vinaweza kutekelezwa kupitia dashibodi.

---

## Otopiloti ya Afya ya Mseto

`comboHealthAutopilot.ts` ni toleo **mahususi kwa miseto** linalolingana na otopiloti ya mtoa huduma. Moduli hii:

- Hugundua miseto isiyo katika hali nzuri
- Hupendekeza upangaji upya wa malengo
- Hupendekeza kuzima malengo yaliyoharibika
- Huondoa kiotomatiki malengo yasiyofanya kazi baada ya hitilafu N

### Mifano ya Matatizo ya Mseto

```
Mseto "always-on" (mkakati wa kipaumbele)
├─ Lengo la 1: openai/gpt-5 (hali nzuri)
├─ Lengo la 2: anthropic/claude-opus-4-6 (⚠️ modeli imezuiwa hadi 14:00)
└─ Lengo la 3: kiro/claude-sonnet-4-5 (hali nzuri)

Kitendo kinachopendekezwa: Panga upya — sogeza kiro juu ya anthropic hadi kizuizi kitakapoisha
```

---

## Vifuatiliaji vya Kikomo

`observability.ts` hutoa **vifuatiliaji vya kikomo kwa kila kipindi** kwa watoa huduma wa usajili (Claude Code, Codex, GitHub Copilot):

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

### Maana za Hali

| Hali        | Wakati                           | Kitendo cha UI                                       |
| ----------- | -------------------------------- | ---------------------------------------------------- |
| `starting`  | Ukaguzi wa awali unaendelea      | Kionyeshi cha kuzunguka                              |
| `idle`      | Hakuna shughuli ya hivi karibuni | Imefichwa kwenye dashibodi                           |
| `healthy`   | Zaidi ya 50% ya kikomo imesalia  | Kitone cha kijani                                    |
| `warning`   | Chini ya 50% ya kikomo imesalia  | Tahadhari ya manjano                                 |
| `exhausted` | Kikomo = 0%                      | Kizuizi chekundu, elekeza kwa mtoa huduma anayefuata |
| `error`     | Ukaguzi umeshindwa               | Kitone chekundu, jaribu tena hivi karibuni           |

### API

> **Hakuna REST endpoint.** Data ya kifuatiliaji cha kikomo inapatikana kupitia zana ya MCP `observability_snapshot` au dashibodi.

---

## Muhtasari wa Uangalizi

Zana ya MCP `observability_snapshot` hurejesha **muhtasari kamili wa mfumo** kwa mawakala wa AI:

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
  "quotaMonitors": {/* tazama hapo juu */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Mawakala hutumia hii kufanya **maamuzi ya uelekezaji** — kwa mfano, "ikiwa saketi ya openai iko wazi, elekeza kwa anthropic kwanza".

---

## Ukaguzi wa Afya ya Tokeni

Watoa huduma wa OAuth (Claude Code, GitHub Copilot, Cursor) wanahitaji **uonyeshaji upya wa tokeni mara kwa mara**. `src/lib/tokenHealthCheck.ts` huendesha kipanga ratiba cha chinichini:

- **Mzunguko wa ukaguzi**: kila sekunde 60 (ukaguzi katika `TICK_MS = 60 * 1000` kwenye `src/lib/tokenHealthCheck.ts:30`)
- **Muda baina ya ukaguzi wa afya kwa kila muunganisho**: chaguo-msingi ni dakika 60 (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); unaweza kusanidiwa kupitia hifadhidata ya mipangilio
- **Uonyeshaji upya wa mapema unapopokea 401**: hushughulikiwa na kinasa kati cha kila muunganisho

### Hali ya Afya ya Tokeni

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

### Usanidi

Usanidi wa ukaguzi wa afya ya tokeni hushughulikiwa kwa ndani na `tokenHealthCheck.ts`.

### Afya ya Tokeni

> **Hakuna sehemu ya mwisho ya REST.** Data ya afya ya tokeni inapatikana kupitia dashibodi au zana ya MCP `observability_snapshot`.

---

## Tahadhari

### Njia Zilizojengewa Ndani

OmniRoute inatumia **njia 3 za tahadhari**:

| Njia               | Usanidi        | Matumizi                             |
| ------------------ | -------------- | ------------------------------------ |
| Bango la dashibodi | Huwashwa daima | Arifa za ndani ya programu           |
| Webhook            | Sanidi URL     | Slack, Discord, PagerDuty            |
| Kumbukumbu         | Chaguo-msingi  | Kwa ujumlishaji wa kumbukumbu za nje |

### Usanidi wa Webhook

> **Kumbuka:** Usanidi wa tahadhari za webhook hushughulikiwa kupitia ukurasa wa Mipangilio kwenye dashibodi. Tazama kiolesura cha Mipangilio kwa URL ya webhook, uchujaji wa matukio na ubinafsishaji wa data inayotumwa.

### Aina za Tahadhari

| Tahadhari                    | Wakati                                                              | Ukali chaguo-msingi |
| ---------------------------- | ------------------------------------------------------------------- | ------------------- |
| `provider_circuit_open`      | Saketi inapofunguka                                                 | muhimu sana         |
| `provider_circuit_half_open` | Saketi inapojaribu kurejea katika hali nzuri                        | taarifa             |
| `quota_warning`              | Mgao unapofikia 80%+                                                | onyo                |
| `quota_exhausted`            | Mgao unapofikia 100%                                                | muhimu sana         |
| `token_refresh_failed`       | Kushindwa kuonyesha upya mara 3+ mfululizo                          | onyo                |
| `token_expired`              | Tokeni inapopita muda wa kuisha                                     | muhimu sana         |
| `combo_target_unhealthy`     | Lengo la mchanganyiko likiwa katika kipindi cha kusubiri kwa saa 1+ | onyo                |
| `db_integrity_warning`       | Ukiukaji wa FK > 0                                                  | onyo                |
| `heap_pressure`              | Matumizi ya heap > 80% ya kiwango                                   | onyo                |

---

## Vipimo vya Utendaji

### Vipimo Vinavyofuatiliwa

| Kipimo                  | Aina       | Chanzo                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | kihesabu   | `services/usage.ts`             |
| `request_latency_ms`    | histogramu | `services/usage.ts`             |
| `tokens_consumed`       | kihesabu   | `services/usage.ts`             |
| `cost_usd`              | kihesabu   | `services/usage.ts`             |
| `provider_errors`       | kihesabu   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | kihesabu   | `services/resilience.ts`        |
| `cache_hits`            | kihesabu   | `services/signatureCache.ts`    |
| `compression_savings`   | histogramu | `services/compression/stats.ts` |
| `quota_used`            | geji       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | geji       | `observability.ts`              |

### Asilimia za Muda wa Kusubiri (p50/p95/p99)

> **Hakuna REST endpoint.** Data ya asilimia za muda wa kusubiri inapatikana kupitia ukurasa wa dashibodi wa `/dashboard/health`. Uhamishaji wa data kwenda Prometheus/OpenTelemetry umepangwa kwa v3.9.

### Uhamishaji wa Data kwenda Prometheus / OpenTelemetry (Awamu ya 2)

Umepangwa kwa v3.9: uhamishaji asilia wa data kwenda Prometheus, OpenTelemetry, Datadog.

Kwa sasa, kusanya data kutoka `/api/monitoring/health` kwa kutumia mfumo wowote wa ufuatiliaji unaotegemea HTTP (Prometheus blackbox exporter, ukaguzi wa HTTP wa Datadog, n.k.).

---

## Mapishi ya Tahadhari

### Slack

> **Kumbuka:** Tahadhari za webhook husanidiwa kupitia ukurasa wa Mipangilio wa dashibodi — hakuna env vars mahususi za webhook (`grep -rn` hairudishi matokeo yoyote). Tazama kiolesura cha Mipangilio kwa URL ya webhook, uchujaji wa matukio, na ubinafsishaji wa payload.

### Discord

> Tahadhari za webhook hutumia mtiririko uleule wa kiolesura cha Mipangilio kama Slack. Discord inakubali muundo uleule wa payload ya JSON.

### PagerDuty

> Tahadhari za webhook hutumia mtiririko uleule wa kiolesura cha Mipangilio. Funguo za uelekezaji za PagerDuty Events API v2 husanidiwa katika kiolesura cha Mipangilio.

### Webhook Maalum (JSON)

> HTTP endpoint yoyote inayokubali POST yenye mwili wa JSON itafanya kazi. Sanidi URL katika kiolesura cha Mipangilio.

---

## Usanidi wa Dashibodi

### Binafsisha Dashibodi ya Afya

Unda `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Bandika Mtoa Huduma Juu

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Utatuzi wa Matatizo

### "Mtoa huduma anasema yuko sawa lakini maombi hayafaulu"

1. Kagua **matatizo ya autopilot** — huenda modeli imefungiwa nje
2. Angalia **hitilafu za hivi karibuni** kwa darasa mahususi la hitilafu
3. Jaribu **jaribio la muunganisho** katika kadi ya mtoa huduma
4. Kagua ikiwa mtoa huduma **amewekewa kikomo cha kiwango na huduma ya juu** (haionekani ndani ya mfumo wa karibu)

### "Kiasi kinachoruhusiwa kinasema kiko sawa lakini ninaona 429"

- 429 inamaanisha mtoa huduma anasema umetumia kiasi chako kinachoruhusiwa
- Ufuatiliaji wa kiasi kinachoruhusiwa wa OmniRoute unaweza kuwa **umepitwa na wakati** — taarifa sahihi ya mtoa huduma iko kwenye huduma ya juu
- Data ya kiasi kinachoruhusiwa huonyeshwa upya kiotomatiki kupitia kifuatiliaji cha ndani cha kiasi kinachoruhusiwa

### "Combo inashindwa lakini malengo yote yanaonekana kuwa sawa"

- Kagua dashibodi ya **afya ya combo** kwa matatizo ya upangaji wa malengo
- Angalia **matukio ya fallback** — huenda combo inamaliza chaguo zake haraka mno
- Thibitisha kuwa **mkakati** unalingana na hali yako ya matumizi (kipaumbele dhidi ya round-robin dhidi ya auto)

### "Ukaguzi wa afya ya hifadhidata unashindwa"

- Endesha `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ikiwa ni "ok" — ni tahadhari ya uongo, ukaguzi wa afya una masharti makali mno
- Ikiwa ni kitu kingine chochote — **simamisha OmniRoute** na ufuate [mwongozo wa urejeshaji baada ya janga](./DATABASE_GUIDE.md#disaster-recovery)

### "Shinikizo la heap ya kumbukumbu ni hatari"

```bash
# Kagua heap ya sasa
node -e "console.log(process.memoryUsage())"

# Anzisha GC mwenyewe (ikiwa --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Punguza maombi yanayotekelezwa kwa wakati mmoja (weka kupitia ukurasa wa Mipangilio wa dashibodi, si env var)
# Hakuna env var ya `MAX_CONCURRENT_REQUESTS` — isanidi katika Mipangilio → Utekelezaji kwa Wakati Mmoja.
```

---

## Tazama Pia

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ufuatiliaji wa matumizi na gharama
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — skima ya DB + hali
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — hali ya proksi (kache tofauti)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — usanifu wa mfumo
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — maelezo ya kikatiza mzunguko
- Chanzo: `src/lib/monitoring/` (faili 4, mistari 2121 ya msimbo)
