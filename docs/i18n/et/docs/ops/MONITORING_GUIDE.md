# Monitoring & Observability Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Lühidalt**: OmniRoute sisaldab sisseehitatud terviseseiret, teenusepakkujate autopilooti, kvootide jälgimist ja jälgitavuse integratsioonipunkte. See juhend käsitleb töölauda, hoiatusi ja tõrkeotsingut.

**Allikad:**

- `src/lib/monitoring/observability.ts` — jälgitavuse hetktõmmis
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinatsioonide tervise autopiloot
- `src/lib/monitoring/providerHealthAutopilot.ts` — teenusepakkujate autopiloot
- `src/lib/monitoring/providerHealthMatrix.ts` — teenusepakkujate tervisemaatriks
- `src/lib/localHealthCheck.ts` — kohalik tervisekontroll
- `src/lib/tokenHealthCheck.ts` — lubade värskendamise tervis
- `src/lib/proxyHealth.ts` — puhverserveri tervise vahemälu (käsitletud failis PROXY_GUIDE.md)

---

## Ülevaade

OmniRoute'il on **3 seirekihti**:

```
┌──────────────────────────────────────────────────────────────┐
│  Kiht 1: Süsteemi tervis (serveri tasand)                    │
│  ├─ localHealthCheck.ts — andmebaas, pordid, omateegid       │
│  ├─ db/healthCheck.ts — terviklus, FK-d, orvuks jäänud artefaktid │
│  └─ Töölaud: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  Kiht 2: Teenusepakkuja tervis (pakkujapõhine töökindlus)    │
│  ├─ providerHealthAutopilot.ts — kaitselüliti, ooteajad       │
│  ├─ providerHealthMatrix.ts — terviseskoorid pakkuja/mudeli järgi │
│  └─ Töölaud: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  Kiht 3: Reaalajaline jälgitavus (käitusaegsed hetktõmmised) │
│  ├─ observability.ts — kaitselülitid, seansid, kvoot          │
│  ├─ tokenHealthCheck.ts — OAuthi lubade värskendamise tervis  │
│  └─ MCP tööriistad: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Töölaua lehed

### `/dashboard/health` (Süsteemi tervis)

Üldine tervise töölaud kuvab järgmist:

| Jaotis                         | Mida see kuvab                                             |
| ------------------------------ | ---------------------------------------------------------- |
| **Serveri olek**               | Tööaeg, versioon, port, aktiivsed ühendused                |
| **Andmebaas**                  | Ühendus, terviklus, WAL-i suurus, hiljutised migratsioonid |
| **Teenusepakkujate kokkuvõte** | Aktiivsete arv, tervete arv, avatud kaitselülitite arv     |
| **Kvoodimonitorid**            | Aktiivsed seansid, hoiatuste olek, ammendatud kvoodid      |
| **Hiljutised vead**            | Viimased 10 viga koos pinujälgedega                        |
| **Ressursikasutus**            | Mälu, CPU, kuhjamälu koormuse näidik                       |

### `/dashboard/providers` (Teenusepakkujate tervis)

Teenusepakkujapõhine töölaud:

| Veerg        | Kirjeldus                                 |
| ------------ | ----------------------------------------- |
| Pakkuja      | Teenusepakkuja ID + kuvatav nimi          |
| Tervis       | Roheline/kollane/punane olek              |
| Kaitselüliti | Avatud/suletud/pooleldi avatud olek       |
| Ühendused    | Ühenduste arv, viimane värskendus         |
| Mudelid      | Saadaolevad mudelid, iga mudeli tervis    |
| Maksumus     | Tänane maksumus, 7 päeva trend            |
| Vead         | Viimase 24 h vigade arv, peamine veaklass |

Teenusepakkuja klõpsamisel kuvatakse:

- Hiljutised päringud koos latentsuse jaotusega
- Ühendusepõhised terviseskoorid
- Mudelipõhised lukustused
- Autopiloodi soovitused

### `/dashboard/quota` (Kvootide jälgimine)

Iga API võtme kohta:

- Praegune kasutus võrreldes piiranguga (edenemisriba)
- Kvooditrend (30 päeva graafik)
- Järgmise lähtestamise aeg
- Hoiatuste ajalugu

### `/dashboard/combos` (Kombinatsioonide tervis)

Iga kombinatsiooni kohta:

- Strateegia + sihtmärgid
- Iga sihtmärgi tervis
- Hiljutised varuvariandile ümberlülitumise sündmused
- Edukuse määr (24 h, 7 p, 30 p)

---

## Tervisekontrolli API

OmniRoute pakub **kahte** HTTP-põhist tervisekontrolli liidest. Need ei ole orkestreerijate jaoks omavahel asendatavad.

| Tee                          | Otstarve                                                                    | Koormus                        | Kasutus                                                                            |
| ---------------------------- | --------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| `GET /healthz`               | Elutsükli elusus/valmisolek (`ok` / `starting` / `stopping`)                | Tühine (ainult faasilipp)      | Kubernetese **valmisolek**; vajaduse korral leebe **elususkontroll** HTTP kaudu    |
| `GET /api/monitoring/health` | Süsteemi ja pakkujate põhjalik kokkuvõte (DB, kuhi, kataloogi loendurid, …) | Suur (sünkroonne DB-/seiretöö) | Juhtpaneelid, põhjalikud välised kontrollid, Dockeri sisseehitatud tervisekontroll |

> **Märkus:** Pakkujate tervisemaatriksid, autopiloodi probleemid, kvoodimonitorid, lubade tervis ja latentsuse üksikasjad, mida `/api/monitoring/health` ei hõlma, on saadaval **MCP tööriista** `observability_snapshot` või **juhtpaneeli** lehtede kaudu — nende jaoks pole eraldi REST-marsruute.

Mõlemad marsruudid töötavad päringute töötlemisega **samas Node’i sündmusetsüklis**. Protsessorimahukas toiming (mahuka `GET /v1/models` kataloogi töötlemine, pika konteksti tihendamine / lubade loendamine) võib viivitada **kõigi** HTTP-töötlejate tööd, sealhulgas `/healthz`. Hõivatud sündmusetsükkel ≠ surnud protsess. Eelistage koormuse põhjustaja parandamist; sondi häälestamine vähendab ainult ekslikke protsesside lõpetamisi.

### Kerge orkestreerija sond

```bash
GET /healthz
# või HEAD /healthz
```

- **200** + vastusekeha `ok`, kui serveri elutsükli faas on valmis
- **503** + `starting` / `stopping` käivitamise või seiskamise ajal
- Teostus: `src/app/healthz/route.ts` (DB-pingi ei tehta)

### Süsteemi tervis (põhjalik)

```bash
GET /api/monitoring/health
```

Vastus:

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

#### `credentialHealth`: sondi vahemälu vs SQLite’i `test_status`

`GET /api/monitoring/health` → `credentialHealth` on **mälusisese sondi vahemälu
näidik**, mitte `provider_connections.test_status` reaalajas väljavõte. Pärast #12532
loeb päringutee ainult funktsiooni `getCachedCredentialHealthSummary()`; taustsondid
värskendavad vahemälu väljaspool sündmusetsüklit.

| Kiht                         | Asukoht                                                               | Tähendus                                                                                                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sondi vahemälu näidik        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Viimased mandaadi tervisesondi tulemused, mida hoitakse endiselt protsessi mälus. `source` on alati `probe-cache`.                                                                                                         |
| Nurjunud ühenduse üksikasjad | `credentialHealth.failedConnections`                                  | Esineb **ainult siis, kui `failed > 0`**. Piiratud loend vahemäluridadest, millel on `status=error` (`connectionId`, `status`, puhastatud `lastError` / `lastErrorType`). `failedOmitted` määratakse, kui loendit piirati. |
| SQLite’i püsiolek            | `credentialHealth.staleDbNonOkCount`                                  | **Aktiivsete** (`is_active=1`) ühenduseridade arv, mille salvestatud `test_status` on teadaolev mitte-OK olek (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                           |

Need kaks kihti võivad sihilikult erineda:

- Näidik `failed=0`, kuid `staleDbNonOkCount>0` — SQLite’is on endiselt püsiv
  `test_status` (näiteks `expired` või `credits_exhausted`), mida uusim
  sondi vahemälu hetktõmmis olekuna `status=error` ei arvesta.
- Näidik `failed>0`, kuid SQLite paistab korras olevat — hiljutine sond nurjus ja
  tulemus on vahemälus; DB-rida pole värskendatud või see puhastati hiljem.

Selle lõpp-punkti seireandmete kogumisel ärge looge häiret ainult
`provider_connections.test_status` põhjal. Kasutage reaalajas sonditõrgete jaoks
välju `failed` + `failedConnections` ning salvestatud püsiolekute arvu jaoks
välja `staleDbNonOkCount`.

### Kubernetese sondide soovitused

OmniRoute on **üks Node’i protsess** (üks sündmusetsükkel). Dockeri standardne `HEALTHCHECK` kasutab kerget `/healthz` lõpp-punkti. `/api/monitoring/health` on kubeleti elususkontrolli intervallide jaoks **liiga koormav**.

| Kontrollsond              | Soovitatav sihtmärk                                                           | Märkused                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Käivitamine**           | HTTP `GET /healthz` pika `failureThreshold`-iga (või suure `startPeriod`-iga) | Külmkäivitus + SQLite'i migratsioon võib võtta üle mõne sekundi                                                                                                                                                                                                                                                                                                                         |
| **Valmisolek**            | HTTP `GET /healthz`                                                           | Elutsükli olek `ok` / `starting` / `stopping` (200 või 503). Kõigub endiselt, kui tsükkel on CPU tõttu blokeeritud. **Mitme sekundi pärast saabuv 200 ei tähenda, et süsteem on töökorras** (#10303) — see tähendab, et sündmusetsükkel oli enne 3-baidise töötleja käivitumist ressurssidest ilma jäetud                                                                               |
| **Elusolek**              | HTTP `GET /livez` **või TCP** põhiteenuse pordil (`PORT`, vaikimisi `20128`)  | `/livez` kontrollib ainult protsessi elusolekut (alati 200, kui töötleja käivitub). See jagab endiselt sündmusetsüklit — hõivatud ≠ surnud — ega tuvasta sündmusetsükli ressurssidest ilmajätmist (#10303) paremini kui TCP. Eelista **TCP-d**, kui HTTP-sondid aeguvad kataloogi-/tihenduskoormuse all; kummalgi juhul **ära** lõpeta pod'i lühikeste sündmusetsükli seiskumiste tõttu |
| **Sügav tervisekontroll** | `GET /api/monitoring/health` välisest kontrollijast                           | Ei sobi kubelet'i `livenessProbe`-i ega lühikese intervalliga `readinessProbe`-i jaoks                                                                                                                                                                                                                                                                                                  |

Näidiskonfiguratsioon (kohanda lävesid vastavalt külmkäivituse ja tihendamise koormusele):

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
  # Sündmusetsükli seiskumise korral võib ka HTTP /livez aeguda. TCP on
  # konservatiivne alternatiiv:
  # tcpSocket:
  #   port: http
```

**Ära** suuna kubelet'i **elusolekukontrolli** aadressile `/api/monitoring/health`. See tee teeb tegelikku andmebaasi-/seiretööd ja annab koormuse all valepositiivseid tulemusi.

Seotud: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sondid ajal, mil sündmusetsükkel on hõivatud), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (kataloogihindade ressursiõgard), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (tihendamise sõneloenduse ressursiõgard).

### Valikuline päringutee töö (mälu, oskused, loa värskendamine)

Mälu eraldamine, oskuste sisestamine ja OAuthi loa värskendamine jagavad `/healthz`-iga **Node'i põhisündmusetsüklit**. Need on töölaual sisse- ja väljalülitatavad funktsioonid (`memoryEnabled`, `skillsEnabled`), mitte töötlejate kogum. Vaata [Keskkond — sündmusetsükli kulu](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Teenusepakkuja seisund

> **REST-lõpp-punkt puudub.** Teenusepakkuja seisundiandmed on saadaval MCP-tööriista `observability_snapshot` või töölaua lehe `/dashboard/providers` kaudu.

### Teenusepakkuja üksikasjad

> **REST-lõpp-punkt puudub.** Iga teenusepakkuja üksikasjad on saadaval töölaua lehe `/dashboard/providers` kaudu.

---

## Pakkuja tervise autopiloot

Moodul `providerHealthAutopilot.ts` on **isetaastuv süsteem**, mis:

1. Tuvastab pakkujaga seotud probleemid (avatud kaitselüliti, ooteajad, lukustused, kvoodihoiatused)
2. Genereerib nende lahendamiseks **soovitatud toiminguid**
3. Soovi korral **käivitab automaatselt** madala riskiga toimingud

### Tuvastatavad probleemitüübid

| Probleemi liik               | Tõsidus    | Näidistingimus                                    |
| ---------------------------- | ---------- | ------------------------------------------------- |
| `provider_circuit_open`      | kriitiline | Kaitselüliti on pärast 5 tõrget avatud            |
| `provider_circuit_half_open` | hoiatus    | Kaitselüliti testib taastumist                    |
| `connection_cooldown`        | hoiatus    | Ühendus on pärast vastust 429 ooteajal            |
| `stale_connection_error`     | hoiatus    | Viimane värskendamine nurjus üle 30 minuti tagasi |
| `terminal_connection_error`  | kriitiline | OAuth on tühistatud, võti on kehtetu              |
| `inactive_connection`        | teave      | Ühendus on seadetes keelatud                      |
| `model_lockout`              | hoiatus    | Konkreetne mudel on karantiinis                   |
| `quota_monitor_warning`      | hoiatus    | Kvoodist on kasutatud vähemalt 80%                |

### Genereeritavad toimingutüübid

| Toiming                        | Risk     | Kirjeldus                              |
| ------------------------------ | -------- | -------------------------------------- |
| `clear_provider_breaker`       | keskmine | Lähtesta kaitselüliti suletud olekusse |
| `clear_connection_cooldown`    | madal    | Eemalda ühenduse ooteaeg               |
| `clear_stale_connection_error` | madal    | Eemalda aegunud vea tähis              |
| `clear_model_lockout`          | madal    | Luba karantiinis olev mudel uuesti     |
| `reactivate_connection`        | keskmine | Luba inaktiveeritud ühendus uuesti     |
| `deactivate_connection`        | kõrge    | Keela probleemne ühendus               |

### API

> **REST-lõpp-punkt puudub.** Autopiloodi probleemid on saadaval MCP-tööriista `observability_snapshot` või töölaua kaudu. Autopiloot töötab süsteemisiseselt; selle käitumist konfigureeritakse seadete andmebaasi kaudu (ühendusepõhine väli `autopilotMode`), mitte keskkonnamuutujatega — autopiloodi režiimi keskkonnamuutuja otsimine käsuga `grep -rn` ei anna ühtegi vastet.

### Autopiloodi režiim

Autopiloot töötab vaikimisi **käsitsi režiimis** — see tuvastab probleemid ja genereerib soovitatud toimingud, kuid ei rakenda neid automaatselt. Toiminguid saab rakendada töölaua kaudu.

---

## Kombinatsiooni tervise autopiloot

`comboHealthAutopilot.ts` on pakkuja autopiloodi **kombinatsioonipõhine** vaste. See:

- Tuvastab ebaterved kombinatsioonid
- Soovitab sihtmärkide järjestust muuta
- Soovitab katkised sihtmärgid keelata
- Eemaldab pärast N tõrget automaatselt mittetoimivad sihtmärgid

### Kombinatsiooniprobleemide näited

```
Kombinatsioon "always-on" (prioriteedistrateegia)
├─ Sihtmärk 1: openai/gpt-5 (terve)
├─ Sihtmärk 2: anthropic/claude-opus-4-6 (⚠️ mudel lukustatud kuni 14:00)
└─ Sihtmärk 3: kiro/claude-sonnet-4-5 (terve)

Soovitatud toiming: järjestuse muutmine — tõsta kiro anthropicust ettepoole kuni lukustuse aegumiseni
```

---

## Kvoodimonitorid

`observability.ts` pakub tellimuspõhiste pakkujate (Claude Code, Codex, GitHub Copilot) jaoks **seansipõhiseid kvoodimonitore**:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0–100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Olekute tähendused

| Olek        | Millal                     | Kasutajaliidese toiming                       |
| ----------- | -------------------------- | --------------------------------------------- |
| `starting`  | Esmane küsitlus on pooleli | Laadimisindikaator                            |
| `idle`      | Hiljutine tegevus puudub   | Töölaual peidetud                             |
| `healthy`   | Kvoodist on alles üle 50%  | Roheline punkt                                |
| `warning`   | Kvoodist on alles alla 50% | Kollane hoiatus                               |
| `exhausted` | Kvoot = 0%                 | Punane blokeering, suuna järgmisele pakkujale |
| `error`     | Küsitlus nurjus            | Punane punkt, proovi varsti uuesti            |

### API

> **REST-lõpp-punkt puudub.** Kvoodimonitori andmed on saadaval MCP-tööriista `observability_snapshot` või töölaua kaudu.

---

## Jälgitavuse hetktõmmis

MCP-tööriist `observability_snapshot` tagastab AI-agentidele **süsteemi täieliku hetktõmmise**:

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
  "quotaMonitors": {/* vt ülalt */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agendid kasutavad seda **marsruutimisotsuste** tegemiseks — näiteks „kui openai kaitselüliti on avatud, suuna esmalt anthropicusse“.

---

## Tokeni seisundi kontroll

OAuthi pakkujad (Claude Code, GitHub Copilot, Cursor) vajavad **tokeni perioodilist värskendamist**. `src/lib/tokenHealthCheck.ts` käivitab taustal ajastatud toimingu:

- **Kontrolltsükkel**: iga 60 sekundi järel (tsükkel parameetris `TICK_MS = 60 * 1000` asukohas `src/lib/tokenHealthCheck.ts:30`)
- **Ühendusepõhise seisundikontrolli intervall**: vaikimisi 60 minutit (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); seadistatav seadete andmebaasi kaudu
- **Ennetav värskendamine vastuse 401 korral**: seda haldab ühendusepõhine vahendaja

### Tokeni seisund

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

### Seadistamine

Tokeni seisundikontrolli seadistamist haldab sisemiselt `tokenHealthCheck.ts`.

### Tokeni seisund

> **REST-lõpp-punkt puudub.** Tokeni seisundiandmed on saadaval töölaua või MCP-tööriista `observability_snapshot` kaudu.

---

## Hoiatused

### Sisseehitatud kanalid

OmniRoute toetab **3 hoiatuskanalit**:

| Kanal          | Seadistamine          | Kasutusjuht                  |
| -------------- | --------------------- | ---------------------------- |
| Töölaua bänner | Alati sisse lülitatud | Rakendusesisesed teavitused  |
| Veebihaak      | Seadista URL          | Slack, Discord, PagerDuty    |
| Logi           | Vaikimisi             | Väliseks logide koondamiseks |

### Veebihaagi seadistamine

> **Märkus:** Veebihaagi hoiatuste seadistamine toimub töölaua seadete lehe kaudu. Veebihaagi URL-i, sündmuste filtreerimise ja lasti kohandamise kohta vaadake seadete kasutajaliidest.

### Hoiatuste tüübid

| Hoiatus                      | Millal                                                   | Vaikimisi raskusaste |
| ---------------------------- | -------------------------------------------------------- | -------------------- |
| `provider_circuit_open`      | Kaitselüliti avaneb                                      | kriitiline           |
| `provider_circuit_half_open` | Kaitselüliti testib taastumist                           | teave                |
| `quota_warning`              | Kvoodist on kasutatud vähemalt 80%                       | hoiatus              |
| `quota_exhausted`            | Kvoodist on kasutatud 100%                               | kriitiline           |
| `token_refresh_failed`       | Vähemalt 3 järjestikust värskendust ebaõnnestub          | hoiatus              |
| `token_expired`              | Tokeni aegumistähtaeg on möödunud                        | kriitiline           |
| `combo_target_unhealthy`     | Kombineeritud sihtmärk on vähemalt 1 h jahtumisperioodil | hoiatus              |
| `db_integrity_warning`       | Võõrvõtme rikkumisi > 0                                  | hoiatus              |
| `heap_pressure`              | Kuhja kasutus > 80% lävendist                            | hoiatus              |

---

## Jõudlusmõõdikud

### Jälgitavad mõõdikud

| Mõõdik                  | Tüüp       | Allikas                         |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | loendur    | `services/usage.ts`             |
| `request_latency_ms`    | histogramm | `services/usage.ts`             |
| `tokens_consumed`       | loendur    | `services/usage.ts`             |
| `cost_usd`              | loendur    | `services/usage.ts`             |
| `provider_errors`       | loendur    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | loendur    | `services/resilience.ts`        |
| `cache_hits`            | loendur    | `services/signatureCache.ts`    |
| `compression_savings`   | histogramm | `services/compression/stats.ts` |
| `quota_used`            | mõõdik     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | mõõdik     | `observability.ts`              |

### Latentsuse protsentiilid (p50/p95/p99)

> **REST-lõpp-punkt puudub.** Latentsuse protsentiilide andmed on saadaval töölaua lehel `/dashboard/health`. Prometheus/OpenTelemetry eksport on kavandatud versioonile v3.9.

### Prometheus / OpenTelemetry eksport (2. etapp)

Versioonile v3.9 on kavandatud omavaheline eksport teenustesse Prometheus, OpenTelemetry ja Datadog.

Praegu pärige lõpp-punkti `/api/monitoring/health` mis tahes HTTP-põhise seiresüsteemiga (Prometheuse blackbox exporter, Datadogi HTTP-kontroll jne).

---

## Hoiatuste seadistamise juhised

### Slack

> **Märkus:** Veebikonksuhoiatused seadistatakse töölaua seadete lehel — spetsiaalseid veebikonksu keskkonnamuutujaid pole (`grep -rn` ei tagasta ühtegi vastet). Veebikonksu URL-i, sündmuste filtreerimise ja lasti kohandamise kohta vaadake seadete kasutajaliidest.

### Discord

> Veebikonksuhoiatused kasutavad sama seadete kasutajaliidese töövoogu nagu Slack. Discord aktsepteerib sama kujuga JSON-lasti.

### PagerDuty

> Veebikonksuhoiatused kasutavad sama seadete kasutajaliidese töövoogu. PagerDuty Events API v2 marsruutimisvõtmed seadistatakse seadete kasutajaliideses.

### Kohandatud veebikonks (JSON)

> Sobib mis tahes HTTP-lõpp-punkt, mis aktsepteerib JSON-kehaga POST-päringuid. Seadistage URL seadete kasutajaliideses.

---

## Töölaua seadistamine

### Seisunditöölaua kohandamine

Looge fail `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Teenusepakkuja kinnitamine loendi ülaossa

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Tõrkeotsing

### „Teenusepakkuja seisund on korras, kuid päringud nurjuvad“

1. Kontrollige **autopiloodi probleeme** — mõni mudel võib olla lukustatud
2. Vaadake konkreetse veaklassi leidmiseks jaotist **hiljutised vead**
3. Proovige teenusepakkuja kaardil **ühenduse testi**
4. Kontrollige, kas teenusepakkuja on **ülesvoolu kiiruspiirangu all** (pole kohapeal nähtav)

### „Kvoodi seisund on korras, kuid näen vastuseid 429“

- 429 tähendab, et teenusepakkuja sõnul olete oma kvoodi ära kasutanud
- OmniRoute'i kvoodijälgimine võib olla **aegunud** — määrav on teenusepakkuja ülesvoolu teave
- Kvoodiandmeid värskendatakse automaatselt sisemise kvoodimonitori kaudu

### „Kombinatsioon nurjub, kuid kõik sihtmärgid näivad korras olevat“

- Kontrollige **kombinatsiooni seisundi** töölaualt sihtmärkide järjestamise probleeme
- Vaadake **varuvariandile ülemineku sündmusi** — kombinatsioon võib valikud liiga kiiresti ammendada
- Veenduge, et **strateegia** vastab teie kasutusjuhule (prioriteet vs pärijärjekord vs automaatne)

### „Andmebaasi seisundikontroll nurjub“

- Käivitage `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Kui tulemus on „ok“ — valehäire, seisundikontroll on liiga range
- Kui tulemus on midagi muud — **peatage OmniRoute** ja järgige [avariitaaste juhendit](./DATABASE_GUIDE.md#disaster-recovery)

### „Mälukuhja koormus on kriitiline“

```bash
# Kontrollige praegust kuhja
node -e "console.log(process.memoryUsage())"

# Käivitage GC käsitsi (kui kasutatakse lippu --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Vähendage samaaegsete päringute arvu (seadistage töölaua seadete lehel, mitte keskkonnamuutujaga)
# Keskkonnamuutujat `MAX_CONCURRENT_REQUESTS` pole — seadistage see jaotises Seaded → Samaaegsus.
```

---

## Vaata ka

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — kasutuse ja kulude jälgimine
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — andmebaasi skeem ja seisund
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — puhverserveri seisund (eraldi vahemälu)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — süsteemi arhitektuur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kaitselüliti üksikasjad
- Lähtekood: `src/lib/monitoring/` (4 faili, 2121 koodirida)
