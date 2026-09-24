# Monitoring & Observability Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: Tagann OmniRoute le monatóireacht sláinte ionsuite, uathphíolóta soláthraithe, rianú cuótaí, agus crúcaí inbhraiteachta. Clúdaíonn an treoir seo an deais, foláirimh, agus fabhtcheartú.

**Foinsí:**

- `src/lib/monitoring/observability.ts` — léargas inbhraiteachta
- `src/lib/monitoring/comboHealthAutopilot.ts` — uathphíolóta sláinte teaglamaí
- `src/lib/monitoring/providerHealthAutopilot.ts` — uathphíolóta soláthraithe
- `src/lib/monitoring/providerHealthMatrix.ts` — maitrís sláinte soláthraithe
- `src/lib/localHealthCheck.ts` — seiceáil sláinte áitiúil
- `src/lib/tokenHealthCheck.ts` — sláinte athnuachana comharthaí
- `src/lib/proxyHealth.ts` — taisce sláinte seachfhreastalaí (clúdaithe in PROXY_GUIDE.md)

---

## Forléargas

Tá **3 shraith monatóireachta** ag OmniRoute:

```
┌──────────────────────────────────────────────────────────────┐
│  Sraith 1: Sláinte an Chórais (leibhéal an fhreastalaí)       │
│  ├─ localHealthCheck.ts — DB, poirt, spleáchais dhúchasacha   │
│  ├─ db/healthCheck.ts — sláine, FK, déantáin dhílleachtacha   │
│  └─ Deais: /dashboard/health                                  │
├──────────────────────────────────────────────────────────────┤
│  Sraith 2: Sláinte Soláthraithe (athléimneacht de réir soláthraí) │
│  ├─ providerHealthAutopilot.ts — scoradán ciorcaid, tréimhsí suaimhnithe │
│  ├─ providerHealthMatrix.ts — scóir sláinte de réir soláthraí/samhla │
│  └─ Deais: /dashboard/providers                               │
├──────────────────────────────────────────────────────────────┤
│  Sraith 3: Inbhraiteacht Bheo (léargais ag am rite)           │
│  ├─ observability.ts — scoradáin chiorcaid, seisiúin, cuóta    │
│  ├─ tokenHealthCheck.ts — sláinte athnuachana comharthaí OAuth │
│  └─ Uirlisí MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Leathanaigh na Deaise

### `/dashboard/health` (Sláinte an Chórais)

Taispeánann an deais sláinte ardleibhéil:

| Rannán                    | An méid a thaispeánann sé                                  |
| ------------------------- | ---------------------------------------------------------- |
| **Stádas an fhreastalaí** | Aga fónaimh, leagan, port, naisc ghníomhacha               |
| **Bunachar sonraí**       | Nasc, sláine, méid WAL, ascnaimh le déanaí                 |
| **Achoimre soláthraithe** | Líon gníomhach, líon sláintiúil, líon na scoradán oscailte |
| **Monatóirí cuóta**       | Seisiúin ghníomhacha, foláireamh, ídithe                   |
| **Earráidí le déanaí**    | Na 10 n-earráid is déanaí le rianta cruachta               |
| **Úsáid acmhainní**       | Cuimhne, CPU, táscaire brú carn                            |

### `/dashboard/providers` (Sláinte Soláthraithe)

Deais de réir soláthraí:

| Colún     | Cur síos                                                       |
| --------- | -------------------------------------------------------------- |
| Soláthraí | Aitheantas an tsoláthraí + ainm taispeána                      |
| Sláinte   | Stádas glas/buí/dearg                                          |
| Ciorcad   | Staid oscailte/dúnta/leathoscailte                             |
| Naisc     | Líon na nasc, an t-athnuachan is déanaí                        |
| Samhlacha | Samhlacha atá ar fáil, sláinte de réir samhla                  |
| Costas    | Costas an lae inniu, treocht 7 lá                              |
| Earráidí  | Líon earráidí le 24 uair anuas, an aicme earráide is coitianta |

Cliceáil ar sholáthraí chun iad seo a fheiceáil:

- Iarratais le déanaí agus miondealú ar an bhfoighne
- Scóir sláinte de réir naisc
- Frithdhúnadh de réir samhla
- Moltaí an uathphíolóta

### `/dashboard/quota` (Rianú Cuóta)

I gcás gach eochrach API:

- Úsáid reatha i gcomparáid leis an teorainn (barra dul chun cinn)
- Treocht cuóta (cairt 30 lá)
- Am an chéad athshocraithe eile
- Stair foláireamh

### `/dashboard/combos` (Sláinte Teaglamaí)

De réir teaglama:

- Straitéis + spriocanna
- Sláinte de réir sprice
- Teagmhais chúltaca le déanaí
- Ráta ratha (24u, 7l, 30l)

---

## API Seiceála Sláinte

Nochtann OmniRoute **dhá** dhromchla sláinte HTTP. Ní féidir iad a úsáid go hidirmhalartaithe le haghaidh orchestrálaithe.

| Conair                       | Cuspóir                                                                           | Ualach                                        | Úsáid le haghaidh                                                         |
| ---------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| `GET /healthz`               | Beocht/ullmhacht saolré (`ok` / `starting` / `stopping`)                          | Fánach (bratach céime amháin)                 | **Ullmhacht** Kubernetes; **beocht** bhog más gá HTTP a úsáid             |
| `GET /api/monitoring/health` | Achoimre dhomhain ar an gcóras + soláthraithe (DB, carn, comhairimh catalóige, …) | Trom (obair shioncronach DB / monatóireachta) | Deais, seiceálacha doimhne bosca dhuibh, seiceáil sláinte ionsuite Docker |

> **Nóta:** Tá maitrísí sláinte soláthraithe, fadhbanna uathphíolóta, monatóirí cuóta, sláinte comharthaí, agus sonraí folaigh sa bhreis ar `/api/monitoring/health` ar fáil tríd an **uirlis MCP** `observability_snapshot` nó trí leathanaigh na **deaise** — níl aon bhealaí tiomnaithe REST ann dóibh sin.

Ritheann an dá bhealach ar an **lúb imeachtaí Node chéanna** agus a láimhseálann iarratais. Is féidir le conair atá teoranta ag an LAP (obair mhór chatalóige `GET /v1/models`, comhbhrú comhthéacs fhada / comhaireamh comharthaí) moill a chur ar **gach** láimhseálaí HTTP, lena n-áirítear `/healthz`. Lúb imeachtaí gnóthach ≠ próiseas marbh. Is fearr an tranglam a réiteach; ní dhéanann tiúnadh tóireadóirí ach maruithe bréagacha a laghdú.

### Tóraire éadrom orchestrálaithe

```bash
GET /healthz
# nó HEAD /healthz
```

- **200** + corp `ok` nuair atá céim shaolré an fhreastalaí réidh
- **503** + `starting` / `stopping` le linn tosaithe nó múchta
- Cur chun feidhme: `src/app/healthz/route.ts` (gan ping DB)

### Sláinte an Chórais (domhain)

```bash
GET /api/monitoring/health
```

Freagra:

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

#### `credentialHealth`: taisce tóraire i gcomparáid le `test_status` SQLite

Is é `GET /api/monitoring/health` → `credentialHealth` an **tomhascaire taisce tóraire
sa chuimhne**, ní dumpáil bheo de `provider_connections.test_status`. Tar éis #12532,
ní léann conair an iarratais ach `getCachedCredentialHealthSummary()`; déanann tóireadóirí
cúlra an taisce a athnuachan lasmuigh den lúb imeachtaí.

| Sraith                      | Cá háit                                                               | Cad is brí leis                                                                                                                                                                                                                            |
| --------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tomhascaire taisce tóraire  | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Torthaí deireanacha tóireadóra sláinte dintiúr atá fós i gcuimhne an phróisis. Is é `probe-cache` luach `source` i gcónaí.                                                                                                                 |
| Sonraí naisc theipthe       | `credentialHealth.failedConnections`                                  | I láthair **nuair atá `failed > 0` amháin**. Liosta teoranta de rónna taisce le `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` sláintithe). Socraítear `failedOmitted` nuair a chuirtear teorainn leis an liosta. |
| Stádas greamaitheach SQLite | `credentialHealth.staleDbNonOkCount`                                  | Líon na rónna naisc **ghníomhacha** (`is_active=1`) a bhfuil `test_status` marthanach aitheanta nach bhfuil ceart acu (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                   |

Is féidir leis an dá shraith a bheith ar neamhréir d'aon ghnó:

- Tomhascaire `failed=0` agus `staleDbNonOkCount>0` — tá `test_status`
  greamaitheach fós ag SQLite (mar shampla `expired` nó `credits_exhausted`) nach
  n-áiríonn an pictiúr is déanaí den taisce tóraire mar `status=error`.
- Tomhascaire `failed>0` agus cuma shláintiúil ar SQLite — theip ar thóraire le
  déanaí agus tá sé i dtaisce; níor nuashonraíodh ró an DB, nó glanadh é níos déanaí.

Ná heisigh foláireamh bunaithe ar `provider_connections.test_status` amháin agus an
críochphointe seo á scríobadh. Úsáid `failed` + `failedConnections` le haghaidh teipeanna
beo tóraire, agus `staleDbNonOkCount` nuair a bhíonn comhaireamh marthanach na stádas
greamaitheach de dhíth ort.

### Moltaí maidir le tóireadóirí Kubernetes

Is **próiseas Node aonair** é OmniRoute (lúb imeachtaí amháin). Díríonn `HEALTHCHECK` caighdeánach Docker ar `/healthz` éadrom. Tá `/api/monitoring/health` **róthrom** le haghaidh eatraimh bheocht kubelet.

| Tóireadóir           | Sprioc mholta                                                                            | Nótaí                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tosú**             | HTTP `GET /healthz` le `failureThreshold` fada (nó `startPeriod` mór)                    | D’fhéadfadh tosú fuar + aistriú SQLite níos mó ná cúpla soicind a thógáil                                                                                                                                                                                                                                                                                                                                     |
| **Ullmhacht**        | HTTP `GET /healthz`                                                                      | Saolré `ok` / `starting` / `stopping` (200 i gcoinne 503). Beidh sé luaineach fós má chuireann an lúb bac ar an LAP. **Ní comhartha sláinte é 200 tar éis roinnt soicind** (#10303) — ciallaíonn sé gur fágadh an lúb teagmhas ar an ngannchuid sular ritheadh an láimhseálaí 3 bheart                                                                                                                        |
| **Beogacht**         | HTTP `GET /livez`, **nó TCP** ar phríomhphort na seirbhíse (`PORT`, réamhshocrú `20128`) | Ní léiríonn `/livez` ach go bhfuil an próiseas beo (200 i gcónaí má ritheann an láimhseálaí). Roinneann sé an lúb teagmhas fós — gnóthach ≠ marbh, agus ní bhraitheann sé easpa acmhainní sa lúb teagmhas (#10303) níos fearr ná TCP. B’fhearr **TCP** má théann tóireadóirí HTTP thar am faoi ualach catalóige/comhbhrúite; **ná** maraigh an pod de dheasca stadanna gearra sa lúb teagmhas i gceachtar cás |
| **Sláinte dhomhain** | `GET /api/monitoring/health` ó sheiceálaí seachtrach                                     | Ní le haghaidh `livenessProbe` kubelet / `readinessProbe` docht                                                                                                                                                                                                                                                                                                                                               |

Cruth samplach (coigeartaigh na tairseacha de réir d’ualaigh tosaithe fhuair agus comhbhrúite):

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
  # Le linn stad sa lúb teagmhas, d’fhéadfadh HTTP /livez dul thar am fós. Is é TCP an
  # rogha mhalartach choimeádach:
  # tcpSocket:
  #   port: http
```

**Ná** dírigh **beogacht** kubelet ar `/api/monitoring/health`. Déanann an chonair sin fíorobair bunachair sonraí/monatóireachta agus tabharfaidh sí toradh deimhneach bréagach faoi ualach.

Gaolmhar: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (tóireadóirí agus an lúb teagmhas gnóthach), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (próiseas praghsála catalóige a shantaíonn acmhainní), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (comhaireamh comharthaí comhbhrúite a shantaíonn acmhainní).

### Obair roghnach ar chonair na hiarrata (cuimhne, scileanna, athnuachan comharthaí)

Roinneann eastóscadh cuimhne, instealladh scileanna agus athnuachan comharthaí OAuth an **phríomhlúb teagmhas Node** le `/healthz`. Is gnéithe iad a scoránaítear ón deais (`memoryEnabled`, `skillsEnabled`), ní linn oibrithe. Féach [Timpeallacht — costas na lúibe teagmhas](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Sláinte Soláthraithe

> **Níl aon chríochphointe REST ann.** Tá sonraí sláinte soláthraithe ar fáil tríd an uirlis MCP `observability_snapshot` nó ar leathanach na deaise `/dashboard/providers`.

### Sonraí Soláthraí

> **Níl aon chríochphointe REST ann.** Tá sonraí faoi gach soláthraí ar fáil ar leathanach na deaise `/dashboard/providers`.

---

## Uathphíolóta Sláinte Soláthraí

Is **córas féinleasaitheach** é an modúl `providerHealthAutopilot.ts` a dhéanann na nithe seo a leanas:

1. Aimsíonn sé fadhbanna soláthraí (ciorcad oscailte, tréimhsí feithimh, glasálacha, rabhaidh chuóta)
2. Gineann sé **gníomhartha molta** chun iad a réiteach
3. Déanann sé gníomhartha ísealriosca a **fhorghníomhú go huathoibríoch**, más rogha é sin

### Cineálacha Fadhbanna a Aimsítear

| Cineál faidhbe               | Déine      | Sampla de choinníoll                                 |
| ---------------------------- | ---------- | ---------------------------------------------------- |
| `provider_circuit_open`      | criticiúil | Scoradán ciorcaid oscailte tar éis 5 theip           |
| `provider_circuit_half_open` | rabhadh    | Ciorcad ag tástáil an téarnaimh                      |
| `connection_cooldown`        | rabhadh    | Nasc i dtréimhse feithimh tar éis 429                |
| `stale_connection_error`     | rabhadh    | Theip ar an athnuachan deireanach 30+ nóiméad ó shin |
| `terminal_connection_error`  | criticiúil | OAuth cúlghairthe, eochair neamhbhailí               |
| `inactive_connection`        | eolas      | Nasc díchumasaithe sna socruithe                     |
| `model_lockout`              | rabhadh    | Samhail ar leith i gcoraintín                        |
| `quota_monitor_warning`      | rabhadh    | Úsáid an chuóta ag 80%+                              |

### Cineálacha Gníomhartha a Ghintear

| Gníomh                         | Riosca  | Cur síos                                   |
| ------------------------------ | ------- | ------------------------------------------ |
| `clear_provider_breaker`       | meánach | Athshocraigh an scoradán ciorcaid go dúnta |
| `clear_connection_cooldown`    | íseal   | Bain an tréimhse feithimh de nasc          |
| `clear_stale_connection_error` | íseal   | Glan an bhratach earráide seanchaite       |
| `clear_model_lockout`          | íseal   | Athchumasaigh samhail atá i gcoraintín     |
| `reactivate_connection`        | meánach | Athchumasaigh nasc díghníomhachtaithe      |
| `deactivate_connection`        | ard     | Díchumasaigh nasc fadhbach                 |

### API

> **Níl aon chríochphointe REST ann.** Tá fadhbanna an uathphíolóta ar fáil tríd an uirlis MCP `observability_snapshot` nó tríd an deais. Ritheann an t-uathphíolóta go hinmheánach; cumraítear a iompar trí bhunachar sonraí na socruithe (réimse `autopilotMode` in aghaidh an naisc), ní trí athróga timpeallachta — ní aimsíonn `grep -rn` aon toradh le haghaidh athróg timpeallachta do mhód an uathphíolóta.

### Mód Uathphíolóta

Feidhmíonn an t-uathphíolóta i **mód láimhe** de réir réamhshocraithe — aimsíonn sé fadhbanna agus gineann sé gníomhartha molta, ach ní chuireann sé i bhfeidhm go huathoibríoch iad. Is féidir gníomhartha a chur i bhfeidhm tríd an deais.

---

## Uathphíolóta Sláinte Teaglamaí

Is é `comboHealthAutopilot.ts` an choibhéis **a bhaineann go sonrach le teaglamaí** d’uathphíolóta an tsoláthraí. Déanann sé na nithe seo a leanas:

- Aimsíonn sé teaglamaí míshláintiúla
- Molann sé spriocanna a athordú
- Molann sé spriocanna briste a dhíchumasú
- Baineann sé spriocanna neamhfheidhmiúla go huathoibríoch tar éis N teip

### Samplaí d’Fhadhbanna Teaglamaí

```
Teaglama "always-on" (straitéis tosaíochta)
├─ Sprioc 1: openai/gpt-5 (sláintiúil)
├─ Sprioc 2: anthropic/claude-opus-4-6 (⚠️ glasáil samhla go dtí 14:00)
└─ Sprioc 3: kiro/claude-sonnet-4-5 (sláintiúil)

Gníomh molta: Athordaigh — bog kiro os cionn anthropic go dtí go rachaidh an ghlasáil in éag
```

---

## Monatóirí Cuóta

Nochtann `observability.ts` **monatóirí cuóta de réir seisiúin** do sholáthraithe síntiúis (Claude Code, Codex, GitHub Copilot):

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

### Bríonna na Stádas

| Stádas      | Cathain                          | Gníomh sa Chomhéadan Úsáideora                   |
| ----------- | -------------------------------- | ------------------------------------------------ |
| `starting`  | An chéad vótaíocht ar siúl       | Rothlóir                                         |
| `idle`      | Gan aon ghníomhaíocht le déanaí  | Folaithe ón deais                                |
| `healthy`   | Níos mó ná 50% den chuóta fágtha | Ponc glas                                        |
| `warning`   | Níos lú ná 50% den chuóta fágtha | Foláireamh buí                                   |
| `exhausted` | Cuóta = 0%                       | Bloc dearg, ródáil chuig an gcéad soláthraí eile |
| `error`     | Theip ar an vótaíocht            | Ponc dearg, bain triail eile as go luath         |

### API

> **Níl aon chríochphointe REST ann.** Tá sonraí an mhonatóra cuóta ar fáil tríd an uirlis MCP `observability_snapshot` nó tríd an deais.

---

## Léargas Inbhraiteachta

Filleann uirlis MCP `observability_snapshot` **léargas iomlán ar an gcóras** do ghníomhairí AI:

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
  "quotaMonitors": {/* féach thuas */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Úsáideann gníomhairí é seo chun **cinntí ródúcháin** a dhéanamh — mar shampla, "má tá ciorcad openai oscailte, ródú chuig anthropic ar dtús".

---

## Seiceáil Sláinte Comharthaí

Teastaíonn **athnuachan tréimhsiúil comharthaí** ó sholáthraithe OAuth (Claude Code, GitHub Copilot, Cursor). Ritheann `src/lib/tokenHealthCheck.ts` sceidealóir sa chúlra:

- **Tic scuabtha**: gach 60 soicind (scuabadh in `TICK_MS = 60 * 1000` ag `src/lib/tokenHealthCheck.ts:30`)
- **Eatramh seiceála sláinte in aghaidh an naisc**: 60 nóiméad de réir réamhshocraithe (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); inchumraithe trí bhunachar sonraí na socruithe
- **Athnuachan réamhghníomhach ar 401**: láimhseálann idircheapóir gach naisc é

### Stádas Sláinte Comharthaí

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

### Cumraíocht

Láimhseálann `tokenHealthCheck.ts` cumraíocht na seiceála sláinte comharthaí go hinmheánach.

### Sláinte Comharthaí

> **Níl aon chríochphointe REST ann.** Tá sonraí sláinte comharthaí ar fáil tríd an deais nó tríd an uirlis MCP `observability_snapshot`.

---

## Foláireamh

### Cainéil Insuite

Tacaíonn OmniRoute le **3 chainéal foláirimh**:

| Cainéal       | Socrú            | Cás úsáide                               |
| ------------- | ---------------- | ---------------------------------------- |
| Meirge deaise | Ar siúl i gcónaí | Fógraí laistigh den fheidhmchlár         |
| Webhook       | Cumraigh URL     | Slack, Discord, PagerDuty                |
| Loga          | Réamhshocrú      | Le haghaidh comhiomlánú seachtrach logaí |

### Cumraíocht Webhook

> **Nóta:** Láimhseáiltear cumraíocht foláirimh Webhook trí leathanach Socruithe na deaise. Féach ar chomhéadan na Socruithe le haghaidh URL an webhook, scagadh imeachtaí agus saincheapadh pálasta.

### Cineálacha Foláirimh

| Foláireamh                   | Cathain                                                       | Déine réamhshocraithe |
| ---------------------------- | ------------------------------------------------------------- | --------------------- |
| `provider_circuit_open`      | Nuair a osclaíonn an ciorcad                                  | criticiúil            |
| `provider_circuit_half_open` | Nuair atá an ciorcad ag tástáil téarnaimh                     | faisnéis              |
| `quota_warning`              | Nuair atá an cuóta ag 80%+                                    | rabhadh               |
| `quota_exhausted`            | Nuair atá an cuóta ag 100%                                    | criticiúil            |
| `token_refresh_failed`       | 3+ teip athnuachana as a chéile                               | rabhadh               |
| `token_expired`              | Nuair atá an comhartha thar a dháta éaga                      | criticiúil            |
| `combo_target_unhealthy`     | Nuair atá sprioc teaglama i dtréimhse mharbhánta ar feadh 1h+ | rabhadh               |
| `db_integrity_warning`       | Sáruithe FK > 0                                               | rabhadh               |
| `heap_pressure`              | Úsáid na carnóige > 80% den tairseach                         | rabhadh               |

---

## Méadrachtaí Feidhmíochta

### Méadrachtaí a Rianaítear

| Méadracht               | Cineál     | Foinse                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | áiritheoir | `services/usage.ts`             |
| `request_latency_ms`    | histeagram | `services/usage.ts`             |
| `tokens_consumed`       | áiritheoir | `services/usage.ts`             |
| `cost_usd`              | áiritheoir | `services/usage.ts`             |
| `provider_errors`       | áiritheoir | `services/errorClassifier.ts`   |
| `circuit_state_changes` | áiritheoir | `services/resilience.ts`        |
| `cache_hits`            | áiritheoir | `services/signatureCache.ts`    |
| `compression_savings`   | histeagram | `services/compression/stats.ts` |
| `quota_used`            | tomhsaire  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | tomhsaire  | `observability.ts`              |

### Peircintílí Aga Folaigh (p50/p95/p99)

> **Níl aon chríochphointe REST ann.** Tá sonraí maidir le peircintílí aga folaigh ar fáil ar leathanach `/dashboard/health` an deais. Tá easpórtáil Prometheus/OpenTelemetry beartaithe do v3.9.

### Easpórtáil Prometheus / OpenTelemetry (Céim 2)

Beartaithe do v3.9: easpórtáil dhúchasach chuig Prometheus, OpenTelemetry, Datadog.

Idir an dá linn, scríob `/api/monitoring/health` le haon chóras monatóireachta HTTP-bhunaithe (easpórtálaí blackbox Prometheus, seiceáil HTTP Datadog, etc.).

---

## Oidis Foláirimh

### Slack

> **Nóta:** Cumraítear foláirimh webhook trí leathanach Socruithe na deaise — níl aon athróga timpeallachta tiomnaithe webhook ann (`grep -rn` returns zero hits). Féach ar Chomhéadan Úsáideora na Socruithe chun URL an webhook, scagadh imeachtaí agus saincheapadh pálasta a chumrú.

### Discord

> Úsáideann foláirimh webhook an sreabhadh céanna i gComhéadan Úsáideora na Socruithe agus a úsáideann Slack. Glacann Discord leis an gcruth céanna pálasta JSON.

### PagerDuty

> Úsáideann foláirimh webhook an sreabhadh céanna i gComhéadan Úsáideora na Socruithe. Cumraítear eochracha ródaithe PagerDuty Events API v2 i gComhéadan Úsáideora na Socruithe.

### Webhook Saincheaptha (JSON)

> Oibreoidh aon chríochphointe HTTP a ghlacann le POST agus corp JSON aige. Cumraigh an URL i gComhéadan Úsáideora na Socruithe.

---

## Cumraíocht na Deaise

### Saincheap an Deais Sláinte

Cruthaigh `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Pionnáil Soláthraí ag an mBarr

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Fabhtcheartú

### "Deir an soláthraí go bhfuil sé sláintiúil ach teipeann ar iarratais"

1. Seiceáil na **fadhbanna autopilot** — seans go bhfuil samhail glasáilte amach
2. Féach ar **earráidí le déanaí** don aicme earráide ar leith
3. Bain triail as an **tástáil naisc** i gcárta an tsoláthraí
4. Seiceáil an bhfuil an soláthraí **faoi theorainn ráta ag an bhfoinse réamhtheachtach** (níl sé seo le feiceáil go háitiúil)

### "Deir an cuóta go bhfuil sé sláintiúil ach feicim 429anna"

- Ciallaíonn 429 go ndeir an soláthraí go bhfuil do chuóta úsáidte agat
- D'fhéadfadh rianú cuóta OmniRoute a bheith **as dáta** — is í fírinne an tsoláthraí réamhtheachtaigh atá i réim
- Athnuachan an monatóir inmheánach cuóta sonraí cuóta go huathoibríoch

### "Tá an teaglaim ag teip ach tá cuma shláintiúil ar na spriocanna uile"

- Seiceáil an deais **sláinte teaglama** le haghaidh fadhbanna le hordú na spriocanna
- Féach ar **imeachtaí cúltaca** — seans go bhfuil roghanna an teaglama á n-ídiú róthapa
- Deimhnigh go n-oireann an **straitéis** do do chás úsáide (tosaíocht vs babhta-rothlach vs uathoibríoch)

### "Tá seiceáil sláinte an bhunachair sonraí ag teip"

- Rith `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Más "ok" é — aláram bréagach atá ann, tá an tseiceáil sláinte ró-dhian
- Más aon rud eile é — **stop OmniRoute** agus lean an [treoir athshlánaithe ó thubaiste](./DATABASE_GUIDE.md#disaster-recovery)

### "Tá brú carn na cuimhne criticiúil"

```bash
# Seiceáil an carn reatha
node -e "console.log(process.memoryUsage())"

# Spreag GC de láimh (má tá --expose-gc ann)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Laghdaigh iarratais chomhthráthacha (socraigh trí leathanach Socruithe na deaise é, ní trí athróg timpeallachta)
# Níl aon athróg timpeallachta `MAX_CONCURRENT_REQUESTS` ann — cumraigh é in Socruithe → Comhthráthacht.
```

---

## Féach Freisin

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — rianú úsáide & costais
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — scéimre an bhunachair sonraí + sláinte
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — sláinte an tseachfhreastalaí (taisce ar leith)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ailtireacht an chórais
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — sonraí faoin scoradán ciorcaid
- Foinse: `src/lib/monitoring/` (4 chomhad, 2121 LOC)
