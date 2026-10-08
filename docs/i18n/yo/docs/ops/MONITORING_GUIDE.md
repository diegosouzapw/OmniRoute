# Monitoring & Observability Guide (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Ní ṣókí**: OmniRoute ní àbójútó ìlera tí a ti kọ sínú rẹ̀, autopilot olùpèsè, ìtọ́pa quota, àti àwọn hook àkíyèsí. Ìtọ́sọ́nà yìí ṣàlàyé dashboard, àwọn ìkìlọ̀, àti bí a ṣe ń yanjú àwọn ìṣòro.

**Àwọn orísun:**

- `src/lib/monitoring/observability.ts` — àwòrán-ìṣẹ́jú àkíyèsí
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot ìlera combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot olùpèsè
- `src/lib/monitoring/providerHealthMatrix.ts` — matrix ìlera olùpèsè
- `src/lib/localHealthCheck.ts` — àyẹ̀wò ìlera abẹ́lé
- `src/lib/tokenHealthCheck.ts` — ìlera ìsọdọ̀tun token
- `src/lib/proxyHealth.ts` — cache ìlera proxy (a ṣàlàyé rẹ̀ nínú PROXY_GUIDE.md)

---

## Àkótán

OmniRoute ní **ìpele àbójútó mẹ́ta**:

```
┌──────────────────────────────────────────────────────────────┐
│  Ìpele 1: Ìlera Ètò (ní ìpele server)                         │
│  ├─ localHealthCheck.ts — DB, àwọn port, àwọn native deps     │
│  ├─ db/healthCheck.ts — ìdúróṣinṣin, FK, àwọn artifact aláìní ìbáṣepọ̀ │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Ìpele 2: Ìlera Olùpèsè (ìfaradà fún olùpèsè kọ̀ọ̀kan)         │
│  ├─ providerHealthAutopilot.ts — circuit breaker, àwọn cooldown │
│  ├─ providerHealthMatrix.ts — àwọn àmì ìlera gẹ́gẹ́ bí olùpèsè/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Ìpele 3: Àkíyèsí Lásìkò Gidi (àwọn àwòrán-ìṣẹ́jú runtime)     │
│  ├─ observability.ts — àwọn circuit breaker, session, quota   │
│  ├─ tokenHealthCheck.ts — ìlera ìsọdọ̀tun token OAuth         │
│  └─ Àwọn irinṣẹ́ MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Àwọn Ojú-ìwé Dashboard

### `/dashboard/health` (Ìlera Ètò)

Dashboard ìlera ìpele-gíga ń ṣàfihàn:

| Abala                 | Ohun tí ó ń ṣàfihàn                                 |
| --------------------- | --------------------------------------------------- |
| **Ipò server**        | Àkókò ìṣiṣẹ́, ẹ̀yà, port, àwọn ìsopọ̀ tó ń ṣiṣẹ́        |
| **Database**          | Ìsopọ̀, ìdúróṣinṣin, ìwọ̀n WAL, àwọn migration tuntun |
| **Àkótán olùpèsè**    | Iye tó ń ṣiṣẹ́, iye tó ní ìlera, iye breaker tó ṣí   |
| **Àwọn olùṣọ́ quota**  | Àwọn session tó ń ṣiṣẹ́, ìkìlọ̀, àti èyí tí ó ti tán  |
| **Àwọn àṣìṣe tuntun** | Àwọn àṣìṣe mẹ́wàá tó ṣẹ̀ṣẹ̀ wá pẹ̀lú àwọn stack trace   |
| **Ìlò ohun àmúlò**    | Memory, CPU, àmì ìkìlọ̀ heap pressure                |

### `/dashboard/providers` (Ìlera Olùpèsè)

Dashboard fún olùpèsè kọ̀ọ̀kan:

| Kọ́lámù     | Àpèjúwe                                                |
| ---------- | ------------------------------------------------------ |
| Olùpèsè    | ID olùpèsè + orúkọ àfihàn                              |
| Ìlera      | Ipò aláwọ̀ ewé/ofeefee/pupa                             |
| Circuit    | Ipò ṣí/tí pa/tí ṣí ní ìdajì                            |
| Àwọn ìsopọ̀ | Iye àwọn ìsopọ̀, ìsọdọ̀tun tó kẹ́yìn                      |
| Àwọn model | Àwọn model tó wà, ìlera model kọ̀ọ̀kan                   |
| Iye owó    | Iye owó òní, ìtẹ̀sí ọjọ́ méje                            |
| Àwọn àṣìṣe | Iye àṣìṣe nínú wákàtí 24 tó kọjá, ẹ̀ka àṣìṣe tó wọ́pọ̀ jù |

Tẹ olùpèsè kan láti wo:

- Àwọn request tuntun pẹ̀lú ìpín latency
- Àwọn àmì ìlera fún ìsopọ̀ kọ̀ọ̀kan
- Àwọn lockout fún model kọ̀ọ̀kan
- Àwọn àbá autopilot

### `/dashboard/quota` (Ìtọ́pa Quota)

Fún API key kọ̀ọ̀kan:

- Ìlò lọ́wọ́lọ́wọ́ ní ìfiwéra pẹ̀lú òpin (progress bar)
- Ìtẹ̀sí quota (chart ọjọ́ 30)
- Àkókò ìtúnṣètò tó kàn
- Ìtàn àwọn ìkìlọ̀

### `/dashboard/combos` (Ìlera Combo)

Fún combo kọ̀ọ̀kan:

- Ọgbọ́n + àwọn ibi àfojúsùn
- Ìlera ibi àfojúsùn kọ̀ọ̀kan
- Àwọn ìṣẹ̀lẹ̀ fallback tuntun
- Ìwọ̀n àṣeyọrí (24h, 7d, 30d)

---

## API Àyẹ̀wò Ìlera

OmniRoute ń pèsè ojú-ọ̀nà ìlera HTTP **méjì**. Wọn kò lè rọ́pò ara wọn fún àwọn olùṣètò.

| Ọ̀nà                          | Ìdí                                                            | Ìwọ̀n                         | Lò ó fún                                                          |
| ---------------------------- | -------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `GET /healthz`               | Ìwàláàyè/ìmúrasílẹ̀ ìgbésí-ayé (`ok` / `starting` / `stopping`) | Fúyẹ́ (àmì ìpele nìkan)       | **Ìmúrasílẹ̀** Kubernetes; **ìwàláàyè** rírọ̀ bí o bá gbọ́dọ̀ lo HTTP |
| `GET /api/monitoring/health` | Àkótán jíjinlẹ̀ ti ètò + olùpèsè (DB, heap, iye catalog, …)     | Wúwo (DB sync / iṣẹ́ àbójútó) | Àwọn dashboard, àyẹ̀wò jíjinlẹ̀ blackbox, healthcheck inú Docker    |

> **Àkíyèsí:** Àwọn matrix ìlera olùpèsè, àwọn ìṣòro autopilot, àwọn olùṣọ́ quota, ìlera token, àti àlàyé latency tó ju ti `/api/monitoring/health` lọ wà nípasẹ̀ **irinṣẹ́ MCP** `observability_snapshot` tàbí àwọn ojú-ewé **dashboard** — kò sí àwọn ọ̀nà REST pàtó fún wọn.

Àwọn ọ̀nà méjèèjì ń ṣiṣẹ́ lórí **Node event loop kan náà** tí ó ń bójú tó àwọn ìbéèrè. Ọ̀nà tí CPU ń dí mọ́ (iṣẹ́ catalog ńlá `GET /v1/models`, compression àyíká-ọ̀rọ̀ gígùn / kíkà token) lè dá **gbogbo** olùdarí HTTP dúró, pẹ̀lú `/healthz`. Event-loop tí ó dí ≠ process tí ó kú. Ó dára jù láti ṣàtúnṣe ohun tó ń gba gbogbo agbára; ṣíṣe àtúnṣe probe kàn dín àwọn pípa tí kò tọ́ kù.

### Probe olùṣètò tó fúyẹ́

```bash
GET /healthz
# tàbí HEAD /healthz
```

- **200** + ara `ok` nígbà tí ìpele ìgbésí-ayé server bá ti múra
- **503** + `starting` / `stopping` nígbà ìbẹ̀rẹ̀ tàbí ìdásílẹ̀
- Ìmúṣẹ: `src/app/healthz/route.ts` (kò sí ping DB)

### Ìlera Ètò (jíjinlẹ̀)

```bash
GET /api/monitoring/health
```

Ìdáhùn:

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

#### `credentialHealth`: probe-cache ní ìfiwéra pẹ̀lú SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ni **òṣùwọ̀n probe-cache inú memory**,
kì í ṣe ìtújáde lẹ́sẹ̀kẹsẹ̀ ti `provider_connections.test_status`. Lẹ́yìn #12532,
ọ̀nà ìbéèrè náà ń ka `getCachedCredentialHealthSummary()` nìkan; àwọn probe abẹ́lẹ̀
ń sọ cache náà dọ̀tun níta event loop.

| Ìpele                     | Ibi                                                                   | Ohun tí ó túmọ̀ sí                                                                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Òṣùwọ̀n probe-cache        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Àwọn àbájáde probe ìlera credential tó ṣẹ̀ṣẹ̀ kẹ́yìn tí a ṣì ń pa mọ́ sínú memory process. `source` jẹ́ `probe-cache` ní gbogbo ìgbà.                                                                                                        |
| Àlàyé connection tó kùnà  | `credentialHealth.failedConnections`                                  | Ó wà **nígbà tí `failed > 0` nìkan**. Àtòjọ tó ní ààlà ti àwọn row cache pẹ̀lú `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` tí a ti sọ di mímọ́). A máa ṣètò `failedOmitted` nígbà tí àtòjọ náà bá dé ààlà rẹ̀. |
| Ipo SQLite tó dúró ṣinṣin | `credentialHealth.staleDbNonOkCount`                                  | Iye àwọn row connection tó **ṣiṣẹ́** (`is_active=1`) tí `test_status` tí a fi pamọ́ jẹ́ non-ok tí a mọ̀ (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                                  |

Àwọn ìpele méjèèjì lè yàtọ̀ sí ara wọn láìní àṣìṣe:

- Òṣùwọ̀n `failed=0` nígbà tí `staleDbNonOkCount>0` — SQLite ṣì ní
  `test_status` tó dúró ṣinṣin (fún àpẹẹrẹ `expired` tàbí `credits_exhausted`) tí snapshot
  probe-cache tuntun kò kà sí `status=error`.
- Òṣùwọ̀n `failed>0` nígbà tí SQLite dà bí ẹni pé ó ní ìlera — probe kan tó ṣẹ̀ṣẹ̀ wá kùnà, a sì
  ti fi pamọ́ sínú cache; a kò tíì ṣe ìmúdójúìwọ̀n row DB náà, tàbí a ti parẹ́ rẹ̀ lẹ́yìn náà.

Má ṣe fi ìkìlọ̀ ránṣẹ́ nítorí `provider_connections.test_status` nìkan nígbà tí o bá ń gba data láti
endpoint yìí. Lo `failed` + `failedConnections` fún àwọn ìkùnà probe lẹ́sẹ̀kẹsẹ̀, kí o sì lo
`staleDbNonOkCount` nígbà tí o bá nílò iye ipo tó dúró ṣinṣin tí a fi pamọ́.

### Àwọn àbá probe Kubernetes

OmniRoute jẹ́ **process Node kan ṣoṣo** (event loop kan). Docker `HEALTHCHECK` àkọ́kọ́ ń tọ́ka sí `/healthz` tó fúyẹ́. `/api/monitoring/health` **wúwo jù** fún àwọn àkókò liveness kubelet.

| Ìdánwò            | Àfojúsùn tí a ṣedúrò fún                                                       | Àwọn àkíyèsí                                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ìbẹ̀rẹ̀**         | HTTP `GET /healthz` pẹ̀lú `failureThreshold` gígùn (tàbí `startPeriod` ńlá)     | Ìbẹ̀rẹ̀ tútù + ìṣíkiri SQLite lè ju ìṣẹ́jú-àáyá díẹ̀ lọ                                                                                                                                                                                                                                                                                                                         |
| **Ìmúrasílẹ̀**     | HTTP `GET /healthz`                                                            | Ìpele ìgbésí-ayé `ok` / `starting` / `stopping` (200 sí 503). Ó ṣì lè má dúró ṣinṣin bí CPU bá dí loop náà. **200 tó gba ọ̀pọ̀lọpọ̀ ìṣẹ́jú-àáyá kì í ṣe àmì ìlera** (#10303) — ó túmọ̀ sí pé event loop kò rí àkókò ṣiṣẹ́ kí handler oníbáìtì 3 náà tó ṣiṣẹ́                                                                                                                       |
| **Ìwàláàyè**      | HTTP `GET /livez`, **tàbí TCP** lórí port iṣẹ́ àkọ́kọ́ (`PORT`, àiyipada `20128`) | `/livez` ń ṣàyẹ̀wò pé process wà láàyè nìkan (200 ní gbogbo ìgbà tí handler bá ṣiṣẹ́). Ó ṣì ń lo event loop kan náà — jíjẹ́ oníṣẹ́ púpọ̀ ≠ pípa, kò sì lè ṣàwárí event-loop starvation (#10303) ju bí TCP ṣe lè ṣe lọ. Yan **TCP** bí àwọn ìdánwò HTTP bá ń parí àkókò lábẹ́ ẹrù catalog/compression; má sì **pa** pod náà nítorí ìdádúró event-loop kékeré, láìka èyí tí o lò sí |
| **Ìlera jíjinlẹ̀** | `GET /api/monitoring/health` láti ọ̀dọ̀ olùṣàyẹ̀wò òde                            | Kì í ṣe fún kubelet `livenessProbe` / `readinessProbe` tó máa ń ṣiṣẹ́ léraléra ní àárín àkókò kúkúrú                                                                                                                                                                                                                                                                         |

Àpẹẹrẹ ìṣètò (ṣe àtúnṣe àwọn ààlà gẹ́gẹ́ bí ìbẹ̀rẹ̀ tútù àti ẹrù compression rẹ):

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
  # Nígbà ìdádúró event-loop, HTTP /livez ṣì lè parí àkókò. TCP ni
  # àṣàyàn oníṣọ́ra:
  # tcpSocket:
  #   port: http
```

**Má ṣe** darí **liveness** kubelet sí `/api/monitoring/health`. Ọ̀nà yẹn ń ṣe iṣẹ́ DB/monitoring gidi, yóò sì fúnni ní èsì rere tí kò tọ́ lábẹ́ ẹrù.

Àwọn ohun tó jọmọ́: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (àwọn ìdánwò nígbà tí event loop bá dí), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (catalog pricing tó ń gba agbára púpọ̀), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (compression token-count tó ń gba agbára púpọ̀).

### Iṣẹ́ àfikún lórí ọ̀nà ìbéèrè (ìrántí, ọgbọ́n, ìsọdọtun token)

Yíyọ ìrántí jáde, fífi ọgbọ́n sínú, àti ìsọdọtun OAuth token ń lo **Node event loop àkọ́kọ́** kan náà pẹ̀lú `/healthz`. Wọ́n jẹ́ àwọn ẹ̀ya ara tí a lè tan tàbí pa lórí dashboard (`memoryEnabled`, `skillsEnabled`), kì í ṣe worker pool. Wo [Àyíká — iye owó event-loop](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Ìlera Olùpèsè

> **Kò sí REST endpoint.** Dátà ìlera olùpèsè wà nípasẹ̀ irinṣẹ́ MCP `observability_snapshot` tàbí ojú-ewé dashboard `/dashboard/providers`.

### Àlàyé Olùpèsè

> **Kò sí REST endpoint.** Àlàyé olùpèsè kọ̀ọ̀kan wà nípasẹ̀ ojú-ewé dashboard `/dashboard/providers`.

---

## Autopilot Ìlera Olùpèsè

Módùlù `providerHealthAutopilot.ts` jẹ́ **ètò tí ń tún ara rẹ̀ ṣe** tí ó:

1. Ń ṣàwárí àwọn ìṣòro olùpèsè (circuit tí ó ṣí, àwọn cooldown, àwọn lockout, àwọn ìkìlọ̀ quota)
2. Ń ṣe àgbéjáde **àwọn ìgbésẹ̀ tí a dámọ̀ràn** láti yanjú wọn
3. Ó lè **ṣe àwọn ìgbésẹ̀ tí ewu wọn kéré fúnra rẹ̀**

### Àwọn Irú Ìṣòro Tí A Ṣàwárí

| Irú ìṣòro                    | Ìpele ewu | Àpẹẹrẹ ipò                                |
| ---------------------------- | --------- | ----------------------------------------- |
| `provider_circuit_open`      | líle koko | Circuit breaker ṣí lẹ́yìn ìkùnà 5          |
| `provider_circuit_half_open` | ìkìlọ̀     | Circuit ń dán ìmúpadàbọ̀ wò                |
| `connection_cooldown`        | ìkìlọ̀     | Ìsopọ̀ wà ní cooldown lẹ́yìn 429            |
| `stale_connection_error`     | ìkìlọ̀     | Ìsọdọtun tó kẹ́yìn kùnà ní ìṣẹ́jú 30+ sẹ́yìn |
| `terminal_connection_error`  | líle koko | A fagilé OAuth, kọ́kọ́rọ́ kò tọ́              |
| `inactive_connection`        | ìwífún    | A pa ìsopọ̀ ní àwọn ààtò                   |
| `model_lockout`              | ìkìlọ̀     | Mọ́dẹ́lì kan pàtó wà ní quarantine          |
| `quota_monitor_warning`      | ìkìlọ̀     | Lílo quota ti dé 80%+                     |

### Àwọn Irú Ìgbésẹ̀ Tí A Ṣe Àgbéjáde

| Ìgbésẹ̀                         | Ewu    | Àpèjúwe                             |
| ------------------------------ | ------ | ----------------------------------- |
| `clear_provider_breaker`       | àárín  | Ṣàtúntò circuit breaker sí pípadé   |
| `clear_connection_cooldown`    | kékeré | Yọ cooldown kúrò lórí ìsopọ̀ kan     |
| `clear_stale_connection_error` | kékeré | Pa àmì àṣìṣe tó ti pẹ́ rẹ́            |
| `clear_model_lockout`          | kékeré | Tún mọ́dẹ́lì tó wà ní quarantine ṣiṣẹ́ |
| `reactivate_connection`        | àárín  | Tún ìsopọ̀ tí a ti dáwọ́ dúró ṣiṣẹ́    |
| `deactivate_connection`        | gíga   | Pa ìsopọ̀ tó ń fa ìṣòro              |

### API

> **Kò sí REST endpoint.** Àwọn ìṣòro autopilot wà nípasẹ̀ ohun èlò MCP `observability_snapshot` tàbí dashboard. Autopilot ń ṣiṣẹ́ nínú ètò; a ń ṣètò ìwà rẹ̀ nípasẹ̀ DB àwọn ààtò (àyè `autopilotMode` fún ìsopọ̀ kọ̀ọ̀kan), kì í ṣe àwọn environment variable — `grep -rn` fún env var ti autopilot-mode kò rí ohunkóhun.

### Ìpo Autopilot

Autopilot ń ṣiṣẹ́ ní **ìpo àfọwọ́ṣe** ní àìpé — ó ń ṣàwárí àwọn ìṣòro, ó sì ń ṣe àgbéjáde àwọn ìgbésẹ̀ tí a dámọ̀ràn, ṣùgbọ́n kì í lò wọ́n fúnra rẹ̀. A lè lo àwọn ìgbésẹ̀ náà nípasẹ̀ dashboard.

---

## Autopilot Ìlera Combo

`comboHealthAutopilot.ts` ni ohun tó bá autopilot olùpèsè mu, tí a ṣe **ní pàtó fún combo**. Ó:

- Ń ṣàwárí àwọn combo tí kò ní ìlera
- Ń dámọ̀ràn àtúntò ìtẹ̀lé àwọn target
- Ń dábàá pípa àwọn target tó ti bàjẹ́
- Ń yọ àwọn target tí kò ṣiṣẹ́ mọ́ fúnra rẹ̀ lẹ́yìn ìkùnà N

### Àwọn Àpẹẹrẹ Ìṣòro Combo

```
Combo "always-on" (ọ̀nà priority)
├─ Target 1: openai/gpt-5 (ní ìlera)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model lockout títí di 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (ní ìlera)

Ìgbésẹ̀ tí a dámọ̀ràn: Ṣàtúntò — gbé kiro sókè ju anthropic lọ títí lockout yóò fi parí
```

---

## Àwọn Olùṣọ́ Quota

`observability.ts` ń pèsè **àwọn olùṣọ́ quota fún session kọ̀ọ̀kan** fún àwọn olùpèsè subscription (Claude Code, Codex, GitHub Copilot):

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

### Ìtumọ̀ Àwọn Status

| Status      | Ìgbà wo              | Ìgbésẹ̀ UI                              |
| ----------- | -------------------- | -------------------------------------- |
| `starting`  | Poll àkọ́kọ́ ń lọ lọ́wọ́ | Spinner                                |
| `idle`      | Kò sí ìṣe láìpẹ́      | A fi pamọ́ kúrò ní dashboard            |
| `healthy`   | Quota tó ku > 50%    | Dọ́ọ̀tì àwọ̀ ewé                          |
| `warning`   | Quota tó ku < 50%    | Ìkìlọ̀ aláwọ̀ ọ̀ṣọ̀                        |
| `exhausted` | Quota = 0%           | Àkọsílẹ̀ pupa, darí sí olùpèsè tó kàn   |
| `error`     | Polling kùnà         | Dọ́ọ̀tì pupa, gbìyànjú lẹ́ẹ̀kan sí i láìpẹ́ |

### API

> **Kò sí REST endpoint.** Dátà olùṣọ́ quota wà nípasẹ̀ ohun èlò MCP `observability_snapshot` tàbí dashboard.

---

## Àwòrán Ìpò Àkíyèsí

Ohun èlò MCP `observability_snapshot` ń dá **àwòrán ìpò ẹ̀rọ tó pé** padà fún àwọn aṣojú AI:

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
  "quotaMonitors": {/* wo òkè */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Àwọn aṣojú máa ń lo èyí láti ṣe **àwọn ìpinnu ìdarí ọ̀nà** — fún àpẹẹrẹ, "bí circuit openai bá ṣí, kọ́kọ́ darí sí anthropic".

---

## Àyẹ̀wò Ìlera Tóòkì

Àwọn olùpèsè OAuth (Claude Code, GitHub Copilot, Cursor) nílò **ìmúdójúìwọ̀n tóòkì lẹ́ẹ̀kọ̀ọ̀kan**. `src/lib/tokenHealthCheck.ts` ń ṣiṣẹ́ olùṣètò àkókò kan lẹ́yìn-rẹyìn:

- **Ìlù ìṣàyẹ̀wò:** ní gbogbo ìṣẹ́jú-àáyá 60 (ìṣàyẹ̀wò nínú `TICK_MS = 60 * 1000` ní `src/lib/tokenHealthCheck.ts:30`)
- **Àárín àkókò àyẹ̀wò ìlera fún ìsopọ̀ kọ̀ọ̀kan:** àìyípadà rẹ̀ jẹ́ ìṣẹ́jú 60 (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ó ṣeé ṣètò nípasẹ̀ ibi ìpamọ́ dátà àwọn ààtò
- **Ìmúdójúìwọ̀n ṣáájú àkókò nígbà 401:** interceptor ìsopọ̀ kọ̀ọ̀kan ló ń bójú tó èyí

### Ìpò Ìlera Tóòkì

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

### Ìṣètò

`tokenHealthCheck.ts` ló ń bójú tó ìṣètò àyẹ̀wò ìlera tóòkì nínú ẹ̀rọ.

### Ìlera Tóòkì

> **Kò sí REST endpoint.** Dátà ìlera tóòkì wà nípasẹ̀ dashboard tàbí ohun èlò MCP `observability_snapshot`.

---

## Ìkìlọ̀

### Àwọn Ìkànnì Tí a Kọ́ Sínú Ẹ̀rọ

OmniRoute ṣe àtìlẹ́yìn fún **ìkànnì ìkìlọ̀ 3**:

| Ìkànnì            | Ìṣètò                   | Ohun tí a fi ń lò ó            |
| ----------------- | ----------------------- | ------------------------------ |
| Àkíyèsí dashboard | Máa ń ṣiṣẹ́ nígbà gbogbo | Àwọn ìfitónilétí inú ìṣàfilọ́lẹ̀ |
| Webhook           | Ṣètò URL                | Slack, Discord, PagerDuty      |
| Àkọsílẹ̀           | Àìyípadà                | Fún àkójọpọ̀ àkọsílẹ̀ lóde ẹ̀rọ   |

### Ìṣètò Webhook

> **Àkíyèsí:** Ojú-ewé Settings lórí dashboard ló ń bójú tó ìṣètò ìkìlọ̀ webhook. Wo UI Settings fún URL webhook, yíyan àwọn ìṣẹ̀lẹ̀, àti ṣíṣe payload bí o ṣe fẹ́.

### Àwọn Irú Ìkìlọ̀

| Ìkìlọ̀                        | Ìgbà wo                                                     | Ìpele ìwúwo àìyípadà |
| ---------------------------- | ----------------------------------------------------------- | -------------------- |
| `provider_circuit_open`      | Nígbà tí circuit bá ṣí                                      | critical             |
| `provider_circuit_half_open` | Nígbà tí circuit ń dán ìpadàbọ̀ sípò wò                      | info                 |
| `quota_warning`              | Nígbà tí quota bá dé 80%+                                   | warning              |
| `quota_exhausted`            | Nígbà tí quota bá dé 100%                                   | critical             |
| `token_refresh_failed`       | Ìkùnà ìmúdójúìwọ̀n tó tẹ̀ lé ara wọn ní ìgbà 3+               | warning              |
| `token_expired`              | Nígbà tí tóòkì bá kọjá àkókò ìparí rẹ̀                       | critical             |
| `combo_target_unhealthy`     | Nígbà tí ibi-àfojúsùn combo bá wà ní cooldown fún wákàtí 1+ | warning              |
| `db_integrity_warning`       | Nígbà tí ìrúfin FK bá ju 0 lọ                               | warning              |
| `heap_pressure`              | Nígbà tí lílo heap bá ju 80% ààlà lọ                        | warning              |

---

## Àwọn Ìwọ̀n Ìṣiṣẹ́

### Àwọn Ìwọ̀n Tí A Ń Tọpa

| Ìwọ̀n                    | Irú       | Orísun                          |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | counter   | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | counter   | `services/usage.ts`             |
| `cost_usd`              | counter   | `services/usage.ts`             |
| `provider_errors`       | counter   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | counter   | `services/resilience.ts`        |
| `cache_hits`            | counter   | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gauge     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gauge     | `observability.ts`              |

### Àwọn Ìpín Ogorun Ìdádúró (p50/p95/p99)

> **Kò sí ojú-ọ̀nà REST.** Dátà ìpín ogorun ìdádúró wà nípasẹ̀ ojú-ewé àwo-ìdarí `/dashboard/health`. A ti gbero ìkójáde Prometheus/OpenTelemetry fún v3.9.

### Ìkójáde Prometheus / OpenTelemetry (Ìpele 2)

A ti gbero fún v3.9: ìkójáde abínibí sí Prometheus, OpenTelemetry, Datadog.

Fún báyìí, ṣàkójọ dátà láti `/api/monitoring/health` pẹ̀lú ètò àbójútó èyíkéyìí tó dá lórí HTTP (Prometheus blackbox exporter, Datadog HTTP check, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ).

---

## Àwọn Àpẹẹrẹ Ìkìlọ̀

### Slack

> **Àkíyèsí:** Àtòpọ̀ ìkìlọ̀ webhook ni a ń ṣe nípasẹ̀ ojú-ewé Settings lórí àwo-ìdarí — kò sí àwọn env var webhook pàtó (`grep -rn` máa ń dá àbájáde òfo padà). Wo UI Settings fún URL webhook, àyẹ̀wò àwọn ìṣẹ̀lẹ̀, àti àtúnṣe payload.

### Discord

> Ìkìlọ̀ webhook ń lo ìṣàn UI Settings kan náà bí Slack. Discord ń gba ìrísí payload JSON kan náà.

### PagerDuty

> Ìkìlọ̀ webhook ń lo ìṣàn UI Settings kan náà. Àwọn kọ́kọ́rọ́ ìdarí PagerDuty Events API v2 ni a ń tòpọ̀ nínú UI Settings.

### Webhook Àkànṣe (JSON)

> Ojú-ọ̀nà HTTP èyíkéyìí tó ń gba POST pẹ̀lú ara JSON yóò ṣiṣẹ́. Tòpọ̀ URL náà nínú UI Settings.

---

## Àtòpọ̀ Àwo-Ìdarí

### Ṣe Àwo-Ìdarí Ìlera Ní Àkànṣe

Ṣẹ̀dá `~/.omniroute/dashboard.json` kan:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### So Olùpèsè Kan Mọ́ Òkè

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Ìṣàtúnṣe Ìṣòro

### "Olùpèsè sọ pé ó ní ìlera ṣùgbọ́n àwọn ìbéèrè ń kùnà"

1. Ṣàyẹ̀wò **àwọn ìṣòro autopilot** — ó ṣeé ṣe kí a ti ti model kan mọ́ta
2. Wo **àwọn àṣìṣe àìpẹ́** fún ẹ̀ka àṣìṣe pàtó náà
3. Gbìyànjú **ìdánwò àsopọ̀** nínú káàdì olùpèsè
4. Ṣàyẹ̀wò bóyá olùpèsè náà ní **ààlà ìwọ̀n ní upstream** (èyí kò hàn ní agbègbè)

### "Quota sọ pé ó ní ìlera ṣùgbọ́n mo rí àwọn 429"

- 429 túmọ̀ sí pé olùpèsè náà sọ pé o ti lo quota rẹ
- Ìtọ́pasẹ̀ quota OmniRoute lè ti **dára jù** — òtítọ́ olùpèsè náà wà ní upstream
- Dátà quota máa ń sọ ara rẹ̀ dọ̀tun nípasẹ̀ olùṣọ́ quota inú ètò

### "Combo ń kùnà ṣùgbọ́n gbogbo àwọn ibi-àfojúsùn dàbí ẹni pé wọ́n ní ìlera"

- Ṣàyẹ̀wò àwo-ìdarí **ìlera combo** fún àwọn ìṣòro ìtòlẹ́sẹẹsẹ ibi-àfojúsùn
- Wo **àwọn ìṣẹ̀lẹ̀ fallback** — ó ṣeé ṣe kí combo náà máa parí àwọn àṣàyàn rẹ̀ kíákíá jù
- Jẹ́rìí sí i pé **ọ̀nà ìṣe** náà bá ọ̀ràn lílò rẹ mu (priority vs round-robin vs auto)

### "Ìṣàyẹ̀wò ìlera ibi ìpamọ́ dátà ń kùnà"

- Ṣiṣe `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Tí ó bá jẹ́ "ok" — ìkìlọ̀ èké ni, ìṣàyẹ̀wò ìlera náà le jù
- Tí ó bá jẹ́ ohun mìíràn — **dá OmniRoute dúró** kí o sì tẹ̀lé [ìtọ́sọ́nà ìmúpadàbọ̀sípò lẹ́yìn àjálù](./DATABASE_GUIDE.md#disaster-recovery)

### "Ìfúnpá heap ìrántí ti burú jáì"

```bash
# Ṣàyẹ̀wò heap lọ́wọ́lọ́wọ́
node -e "console.log(process.memoryUsage())"

# Mú GC ṣiṣẹ́ pẹ̀lú ọwọ́ (tí --expose-gc bá wà)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Dín àwọn ìbéèrè tó ń ṣiṣẹ́ lẹ́ẹ̀kan náà kù (ṣètò rẹ̀ nípasẹ̀ ojú-ewé Settings lórí àwo-ìdarí, kì í ṣe env var)
# Kò sí env var `MAX_CONCURRENT_REQUESTS` — tòpọ̀ rẹ̀ nínú Settings → Concurrency.
```

---

## Tún Wo Èyí Pẹ̀lú

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — títọ́pa lílò àti iye owó
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — àwòrán ètò DB + ìlera
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ìlera proxy (cache ọ̀tọ̀)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — àwòrán ètò ẹ̀rọ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — àwọn àlàyé circuit breaker
- Orísun: `src/lib/monitoring/` (fáìlì 4, ìlà kóòdù 2121)
