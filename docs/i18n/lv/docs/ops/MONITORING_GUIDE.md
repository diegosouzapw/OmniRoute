# Monitoring & Observability Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Īsumā**: OmniRoute ietver iebūvētu darbspējas uzraudzību, pakalpojumu sniedzēju autopilotu, kvotu uzskaiti un novērojamības integrācijas punktus. Šajā ceļvedī ir aprakstīts informācijas panelis, brīdinājumi un problēmu novēršana.

**Avoti:**

- `src/lib/monitoring/observability.ts` — novērojamības momentuzņēmums
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombināciju darbspējas autopilots
- `src/lib/monitoring/providerHealthAutopilot.ts` — pakalpojumu sniedzēju autopilots
- `src/lib/monitoring/providerHealthMatrix.ts` — pakalpojumu sniedzēju darbspējas matrica
- `src/lib/localHealthCheck.ts` — lokālā darbspējas pārbaude
- `src/lib/tokenHealthCheck.ts` — marķieru atsvaidzināšanas darbspēja
- `src/lib/proxyHealth.ts` — starpniekservera darbspējas kešatmiņa (aprakstīta PROXY_GUIDE.md)

---

## Pārskats

OmniRoute ir **3 uzraudzības slāņi**:

```
┌──────────────────────────────────────────────────────────────┐
│  1. slānis: Sistēmas darbspēja (servera līmenī)              │
│  ├─ localHealthCheck.ts — DB, porti, vietējās atkarības       │
│  ├─ db/healthCheck.ts — integritāte, FK, bāreņartefakti       │
│  └─ Informācijas panelis: /dashboard/health                   │
├──────────────────────────────────────────────────────────────┤
│  2. slānis: Pakalpojumu sniedzēju darbspēja (noturība katram  │
│  │  pakalpojumu sniedzējam)                                  │
│  ├─ providerHealthAutopilot.ts — ķēdes pārtraucējs, nogaides  │
│  ├─ providerHealthMatrix.ts — darbspējas vērtējumi pēc        │
│  │  pakalpojumu sniedzēja/modeļa                             │
│  └─ Informācijas panelis: /dashboard/providers                │
├──────────────────────────────────────────────────────────────┤
│  3. slānis: Aktīvā novērojamība (izpildlaika momentuzņēmumi)  │
│  ├─ observability.ts — ķēdes pārtraucēji, sesijas, kvotas     │
│  ├─ tokenHealthCheck.ts — OAuth marķieru atsvaidzināšanas     │
│  │  darbspēja                                                │
│  └─ MCP rīki: omniroute_get_health,                           │
│     omniroute_get_session_snapshot                            │
└──────────────────────────────────────────────────────────────┘
```

---

## Informācijas paneļa lapas

### `/dashboard/health` (Sistēmas darbspēja)

Augstākā līmeņa darbspējas informācijas panelī tiek rādīts:

| Sadaļa                                 | Ko tā rāda                                                |
| -------------------------------------- | --------------------------------------------------------- |
| **Servera statuss**                    | Darbības laiks, versija, ports, aktīvie savienojumi       |
| **Datubāze**                           | Savienojums, integritāte, WAL lielums, nesenās migrācijas |
| **Pakalpojumu sniedzēju kopsavilkums** | Aktīvo un darbspējīgo skaits, atvērto pārtraucēju skaits  |
| **Kvotu uzraugi**                      | Aktīvās sesijas, brīdinājumi, izsmeltās kvotas            |
| **Nesenās kļūdas**                     | Pēdējās 10 kļūdas ar steka trasējumiem                    |
| **Resursu lietojums**                  | Atmiņa, CPU, kaudzes noslodzes indikators                 |

### `/dashboard/providers` (Pakalpojumu sniedzēju darbspēja)

Katra pakalpojumu sniedzēja informācijas panelis:

| Kolonna               | Apraksts                                             |
| --------------------- | ---------------------------------------------------- |
| Pakalpojumu sniedzējs | Pakalpojumu sniedzēja ID un attēlojamais nosaukums   |
| Darbspēja             | Zaļš/dzeltens/sarkans statuss                        |
| Ķēde                  | Atvērts/aizvērts/daļēji atvērts stāvoklis            |
| Savienojumi           | Savienojumu skaits, pēdējā atsvaidzināšana           |
| Modeļi                | Pieejamie modeļi, katra modeļa darbspēja             |
| Izmaksas              | Šodienas izmaksas, 7 dienu tendence                  |
| Kļūdas                | Kļūdu skaits pēdējās 24 stundās, biežākā kļūdu klase |

Noklikšķiniet uz pakalpojumu sniedzēja, lai skatītu:

- Nesenos pieprasījumus ar latentuma sadalījumu
- Katra savienojuma darbspējas vērtējumus
- Katra modeļa bloķējumus
- Autopilota ieteikumus

### `/dashboard/quota` (Kvotu uzskaite)

Katrai API atslēgai:

- Pašreizējais lietojums salīdzinājumā ar ierobežojumu (progresa josla)
- Kvotas tendence (30 dienu diagramma)
- Nākamās atiestatīšanas laiks
- Brīdinājumu vēsture

### `/dashboard/combos` (Kombināciju darbspēja)

Katrai kombinācijai:

- Stratēģija un mērķi
- Katra mērķa darbspēja
- Nesenie pārslēgšanās uz rezerves variantu notikumi
- Sekmīguma rādītājs (24 h, 7 d., 30 d.)

## Veselības pārbaudes API

OmniRoute nodrošina **divas** HTTP veselības pārbaudes saskarnes. Orķestratoriem tās nav savstarpēji aizvietojamas.

| Ceļš                         | Nolūks                                                                                  | Noslodze                              | Lietojums                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `GET /healthz`               | Dzīves cikla darbspējas/gatavības pārbaude (`ok` / `starting` / `stopping`)             | Minimāla (tikai fāzes karodziņš)      | Kubernetes **gatavības** pārbaudei; vienkāršotai **darbspējas** pārbaudei, ja jāizmanto HTTP |
| `GET /api/monitoring/health` | Padziļināts sistēmas un nodrošinātāju kopsavilkums (DB, kaudze, kataloga skaitītāji, …) | Liela (sinhrons DB/uzraudzības darbs) | Informācijas paneļiem, padziļinātām ārējām pārbaudēm, Docker iebūvētajai veselības pārbaudei |

> **Piezīme:** Nodrošinātāju veselības matricas, autopilota problēmas, kvotu pārraugi, marķieru veselība un detalizēta latentuma informācija papildus `/api/monitoring/health` ir pieejama, izmantojot **MCP rīku** `observability_snapshot` vai **informācijas paneļa** lapas — tiem nav atsevišķu REST maršrutu.

Abi maršruti darbojas tajā pašā **Node notikumu ciklā**, kurā notiek pieprasījumu apstrāde. CPU intensīvs ceļš (apjomīga `GET /v1/models` kataloga apstrāde, gara konteksta saspiešana/marķieru skaitīšana) var aizkavēt **visus** HTTP apstrādātājus, tostarp `/healthz`. Noslogots notikumu cikls ≠ apturēts process. Ieteicams novērst noslodzes cēloni; pārbaužu pielāgošana tikai samazina kļūdainas procesa apturēšanas iespējamību.

### Viegla orķestratora pārbaude

```bash
GET /healthz
# vai HEAD /healthz
```

- **200** un atbildes pamatteksts `ok`, kad servera dzīves cikla fāze ir gatava
- **503** un `starting` / `stopping` palaišanas vai izslēgšanas laikā
- Realizācija: `src/app/healthz/route.ts` (bez DB pieejamības pārbaudes)

### Sistēmas veselība (padziļināta)

```bash
GET /api/monitoring/health
```

Atbilde:

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

#### `credentialHealth`: pārbaužu kešatmiņa pret SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ir **atmiņā glabāts pārbaužu kešatmiņas
rādītājs**, nevis aktuāls `provider_connections.test_status` izgūto datu kopums. Pēc #12532
pieprasījuma ceļš nolasa tikai `getCachedCredentialHealthSummary()`; fona pārbaudes
atsvaidzina kešatmiņu ārpus notikumu cikla.

| Slānis                              | Atrašanās vieta                                                       | Nozīme                                                                                                                                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pārbaužu kešatmiņas rādītājs        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Pēdējo akreditācijas datu veselības pārbaužu rezultāti, kas joprojām tiek glabāti procesa atmiņā. `source` vienmēr ir `probe-cache`.                                                                                                 |
| Neizdevušos savienojumu informācija | `credentialHealth.failedConnections`                                  | Pieejama **tikai tad, ja `failed > 0`**. Ierobežots kešatmiņas rindu saraksts ar `status=error` (`connectionId`, `status`, attīrīti `lastError` / `lastErrorType`). `failedOmitted` tiek iestatīts, ja saraksts ir ticis ierobežots. |
| SQLite nemainīgais statuss          | `credentialHealth.staleDbNonOkCount`                                  | **Aktīvo** (`is_active=1`) savienojumu rindu skaits, kuru saglabātais `test_status` ir zināma kļūdas vērtība (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                      |

Abi slāņi var apzināti nesakrist:

- Rādītājs `failed=0`, kamēr `staleDbNonOkCount>0` — SQLite joprojām ir nemainīgs
  `test_status` (piemēram, `expired` vai `credits_exhausted`), ko jaunākais
  pārbaužu kešatmiņas momentuzņēmums neuzskaita kā `status=error`.
- Rādītājs `failed>0`, kamēr SQLite izskatās vesela — nesena pārbaude neizdevās un tās rezultāts ir
  saglabāts kešatmiņā; DB rinda vēl nav atjaunināta vai vēlāk ir notīrīta.

Veicot šī galapunkta datu iegūšanu, neaktivizējiet brīdinājumus, pamatojoties tikai uz `provider_connections.test_status`.
Aktuālām pārbaužu kļūmēm izmantojiet `failed` + `failedConnections`, bet
`staleDbNonOkCount` izmantojiet, ja nepieciešams saglabāto nemainīgo statusu skaits.

### Kubernetes pārbaužu ieteikumi

OmniRoute ir **viens Node process** (viens notikumu cikls). Standarta Docker `HEALTHCHECK` izmanto vieglo `/healthz`. `/api/monitoring/health` ir **pārāk resursietilpīgs** kubelet darbspējas pārbaužu intervāliem.

| Zonde                              | Ieteicamais mērķis                                                                          | Piezīmes                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Palaišana**                      | HTTP `GET /healthz` ar lielu `failureThreshold` (vai lielu `startPeriod`)                   | Aukstā palaišana un SQLite migrācija var ilgt vairākas sekundes                                                                                                                                                                                                                                                                                                                                                   |
| **Gatavība**                       | HTTP `GET /healthz`                                                                         | Dzīves cikla stāvokļi `ok` / `starting` / `stopping` (200 vai 503). Joprojām var svārstīties, ja ciklu bloķē centrālā procesora noslodze. **200 atbilde pēc vairākām sekundēm neliecina par veselīgu stāvokli** (#10303) — tas nozīmē, ka notikumu cikls bija nobloķēts, pirms tika izpildīts 3 baitu apdarinātājs                                                                                                |
| **Dzīvīgums**                      | HTTP `GET /livez` **vai TCP** galvenajā pakalpojuma portā (`PORT`, pēc noklusējuma `20128`) | `/livez` pārbauda tikai to, vai process darbojas (vienmēr 200, ja apdarinātājs tiek izpildīts). Tas joprojām izmanto to pašu notikumu ciklu — aizņemts ≠ nedarbojas, un notikumu cikla bloķēšanu (#10303) tas nekonstatē labāk par TCP. Dodiet priekšroku **TCP**, ja HTTP zonžu noildze iestājas kataloga/saspiešanas slodzes laikā; jebkurā gadījumā **neapturiet** podu īslaicīgas notikumu cikla aiztures dēļ |
| **Padziļināta veselības pārbaude** | `GET /api/monitoring/health` no ārēja pārbaudītāja                                          | Nav paredzēta kubelet `livenessProbe` / biežai `readinessProbe`                                                                                                                                                                                                                                                                                                                                                   |

Konfigurācijas piemērs (pielāgojiet sliekšņus savai aukstās palaišanas un saspiešanas slodzei):

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
  # Notikumu cikla aiztures laikā HTTP /livez joprojām var iestāties noildze. TCP ir
  # konservatīva alternatīva:
  # tcpSocket:
  #   port: http
```

**Nenorādiet** kubelet **dzīvīguma pārbaudei** ceļu `/api/monitoring/health`. Šis ceļš veic reālas datubāzes/uzraudzības darbības un slodzes apstākļos radīs kļūdaini pozitīvus rezultātus.

Saistīts: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (zondes, kamēr notikumu cikls ir aizņemts), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (kataloga cenu noteikšanas resursu pārmērīgs patēriņš), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (saspiešanas marķieru skaitīšanas resursu pārmērīgs patēriņš).

### Neobligātās darbības pieprasījuma ceļā (atmiņa, prasmes, marķieru atsvaidzināšana)

Atmiņas izgūšana, prasmju ievietošana un OAuth marķieru atsvaidzināšana koplieto **galveno Node notikumu ciklu** ar `/healthz`. Tās ir informācijas panelī pārslēdzamas funkcijas (`memoryEnabled`, `skillsEnabled`), nevis izpildītāju pūls. Skatiet [Vide — notikumu cikla izmaksas](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Pakalpojumu sniedzēju veselība

> **Nav REST galapunkta.** Pakalpojumu sniedzēju veselības dati ir pieejami, izmantojot MCP rīku `observability_snapshot` vai informācijas paneļa lapu `/dashboard/providers`.

### Informācija par pakalpojumu sniedzēju

> **Nav REST galapunkta.** Detalizēta informācija par katru pakalpojumu sniedzēju ir pieejama informācijas paneļa lapā `/dashboard/providers`.

---

## Pakalpojumu sniedzēju veselības autopilots

Modulis `providerHealthAutopilot.ts` ir **pašatjaunojoša sistēma**, kas:

1. Konstatē pakalpojumu sniedzēju problēmas (atvērta ķēde, nogaidīšanas periodi, bloķējumi, kvotas brīdinājumi)
2. Ģenerē **ieteicamās darbības** to novēršanai
3. Pēc izvēles **automātiski izpilda** zema riska darbības

### Konstatēto problēmu veidi

| Problēmas veids              | Nopietnība  | Nosacījuma piemērs                                            |
| ---------------------------- | ----------- | ------------------------------------------------------------- |
| `provider_circuit_open`      | kritiska    | Ķēdes pārtraucējs atvērts pēc 5 kļūmēm                        |
| `provider_circuit_half_open` | brīdinājums | Ķēde pārbauda atkopšanos                                      |
| `connection_cooldown`        | brīdinājums | Savienojumam piemērots nogaidīšanas periods pēc 429           |
| `stale_connection_error`     | brīdinājums | Pēdējā atsvaidzināšana neizdevās pirms vairāk nekā 30 minūtēm |
| `terminal_connection_error`  | kritiska    | OAuth atsaukts, atslēga nederīga                              |
| `inactive_connection`        | informācija | Savienojums atspējots iestatījumos                            |
| `model_lockout`              | brīdinājums | Konkrētais modelis atrodas karantīnā                          |
| `quota_monitor_warning`      | brīdinājums | Kvotas izmantojums sasniedzis 80% vai vairāk                  |

### Ģenerēto darbību veidi

| Darbība                        | Risks  | Apraksts                                      |
| ------------------------------ | ------ | --------------------------------------------- |
| `clear_provider_breaker`       | vidējs | Atiestatīt ķēdes pārtraucēju slēgtā stāvoklī  |
| `clear_connection_cooldown`    | zems   | Noņemt savienojuma nogaidīšanas periodu       |
| `clear_stale_connection_error` | zems   | Notīrīt novecojušas kļūdas karodziņu          |
| `clear_model_lockout`          | zems   | Atkārtoti iespējot karantīnā ievietotu modeli |
| `reactivate_connection`        | vidējs | Atkārtoti iespējot deaktivizētu savienojumu   |
| `deactivate_connection`        | augsts | Atspējot problemātisku savienojumu            |

### API

> **Nav REST galapunkta.** Autopilota problēmas ir pieejamas, izmantojot MCP rīku `observability_snapshot` vai informācijas paneli. Autopilots darbojas iekšēji; tā darbība tiek konfigurēta iestatījumu datubāzē (katra savienojuma laukā `autopilotMode`), nevis ar vides mainīgajiem — `grep -rn`, meklējot autopilota režīma vides mainīgo, neatgriež nevienu rezultātu.

### Autopilota režīms

Pēc noklusējuma autopilots darbojas **manuālajā režīmā** — tas konstatē problēmas un ģenerē ieteicamās darbības, taču tās automātiski nepiemēro. Darbības var piemērot, izmantojot informācijas paneli.

---

## Kombināciju veselības autopilots

`comboHealthAutopilot.ts` ir pakalpojumu sniedzēju autopilota **kombinācijām paredzētais** ekvivalents. Tas:

- Konstatē neveselīgas kombinācijas
- Iesaka mainīt mērķu secību
- Iesaka atspējot bojātus mērķus
- Pēc N kļūmēm automātiski noņem nedarbojošos mērķus

### Kombināciju problēmu piemēri

```
Kombinācija "always-on" (prioritātes stratēģija)
├─ 1. mērķis: openai/gpt-5 (veselīgs)
├─ 2. mērķis: anthropic/claude-opus-4-6 (⚠️ modeļa bloķējums līdz plkst. 14:00)
└─ 3. mērķis: kiro/claude-sonnet-4-5 (veselīgs)

Ieteicamā darbība: mainīt secību — pārvietot kiro virs anthropic, līdz beidzas bloķējums
```

---

## Kvotu pārraugi

`observability.ts` nodrošina **katras sesijas kvotu pārraugus** abonementu pakalpojumu sniedzējiem (Claude Code, Codex, GitHub Copilot):

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

### Statusu nozīme

| Statuss     | Kad                             | Lietotāja saskarnes darbība                             |
| ----------- | ------------------------------- | ------------------------------------------------------- |
| `starting`  | Notiek sākotnējā aptauja        | Ielādes indikators                                      |
| `idle`      | Nav nesenu darbību              | Paslēpts informācijas panelī                            |
| `healthy`   | Atlikuši vairāk nekā 50% kvotas | Zaļš punkts                                             |
| `warning`   | Atlikuši mazāk nekā 50% kvotas  | Dzeltens brīdinājums                                    |
| `exhausted` | Kvota = 0%                      | Sarkans bloks, novirzīt uz nākamo pakalpojumu sniedzēju |
| `error`     | Aptauja neizdevās               | Sarkans punkts, drīzumā mēģināt vēlreiz                 |

### API

> **Nav REST galapunkta.** Kvotu pārraugu dati ir pieejami, izmantojot MCP rīku `observability_snapshot` vai informācijas paneli.

---

## Novērojamības momentuzņēmums

MCP rīks `observability_snapshot` AI aģentiem atgriež **pilnīgu sistēmas momentuzņēmumu**:

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
  "quotaMonitors": {/* skatiet iepriekš */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Aģenti to izmanto, lai pieņemtu **maršrutēšanas lēmumus** — piemēram, „ja openai ķēde ir atvērta, vispirms maršrutēt uz anthropic”.

---

## Tokena darbspējas pārbaude

OAuth nodrošinātājiem (Claude Code, GitHub Copilot, Cursor) nepieciešama **periodiska tokenu atsvaidzināšana**. `src/lib/tokenHealthCheck.ts` izpilda fona plānotāju:

- **Pārbaudes cikls**: ik pēc 60 sekundēm (cikls faila `src/lib/tokenHealthCheck.ts:30` vērtībā `TICK_MS = 60 * 1000`)
- **Darbspējas pārbaužu intervāls katram savienojumam**: pēc noklusējuma 60 minūtes (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); konfigurējams iestatījumu datubāzē
- **Preventīva atsvaidzināšana, saņemot 401**: to apstrādā katra savienojuma pārtvērējs

### Tokena darbspējas statuss

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

### Konfigurācija

Tokena darbspējas pārbaudes konfigurāciju iekšēji apstrādā `tokenHealthCheck.ts`.

### Tokena darbspēja

> **Nav REST galapunkta.** Tokena darbspējas dati ir pieejami informācijas panelī vai ar MCP rīku `observability_snapshot`.

---

## Brīdinājumi

### Iebūvētie kanāli

OmniRoute atbalsta **3 brīdinājumu kanālus**:

| Kanāls                          | Iestatīšana       | Lietojums                  |
| ------------------------------- | ----------------- | -------------------------- |
| Informācijas paneļa reklāmjosla | Vienmēr ieslēgta  | Paziņojumi lietotnē        |
| Tīmekļa aizķere                 | Konfigurējiet URL | Slack, Discord, PagerDuty  |
| Žurnāls                         | Noklusējums       | Ārējai žurnālu apkopošanai |

### Tīmekļa aizķeres konfigurācija

> **Piezīme:** Tīmekļa aizķeres brīdinājumu konfigurācija tiek pārvaldīta informācijas paneļa lapā Iestatījumi. Informāciju par tīmekļa aizķeres URL, notikumu filtrēšanu un datu sūtījuma pielāgošanu skatiet iestatījumu lietotāja saskarnē.

### Brīdinājumu veidi

| Brīdinājums                  | Kad                                                  | Noklusējuma nopietnība |
| ---------------------------- | ---------------------------------------------------- | ---------------------- |
| `provider_circuit_open`      | Ķēde tiek atvērta                                    | kritiska               |
| `provider_circuit_half_open` | Ķēde pārbauda darbības atjaunošanos                  | informatīva            |
| `quota_warning`              | Kvota sasniegusi vismaz 80%                          | brīdinājums            |
| `quota_exhausted`            | Kvota sasniegusi 100%                                | kritiska               |
| `token_refresh_failed`       | Vismaz 3 secīgas atsvaidzināšanas kļūmes             | brīdinājums            |
| `token_expired`              | Beidzies tokena derīguma termiņš                     | kritiska               |
| `combo_target_unhealthy`     | Kombinētais mērķis atdzišanas režīmā vismaz 1 stundu | brīdinājums            |
| `db_integrity_warning`       | FK pārkāpumu skaits > 0                              | brīdinājums            |
| `heap_pressure`              | Kaudzes lietojums > 80% no robežvērtības             | brīdinājums            |

---

## Veiktspējas metrikas

### Izsekotās metrikas

| Metrika                 | Tips        | Avots                           |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | skaitītājs  | `services/usage.ts`             |
| `request_latency_ms`    | histogramma | `services/usage.ts`             |
| `tokens_consumed`       | skaitītājs  | `services/usage.ts`             |
| `cost_usd`              | skaitītājs  | `services/usage.ts`             |
| `provider_errors`       | skaitītājs  | `services/errorClassifier.ts`   |
| `circuit_state_changes` | skaitītājs  | `services/resilience.ts`        |
| `cache_hits`            | skaitītājs  | `services/signatureCache.ts`    |
| `compression_savings`   | histogramma | `services/compression/stats.ts` |
| `quota_used`            | mērītājs    | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | mērītājs    | `observability.ts`              |

### Latentuma procentiles (p50/p95/p99)

> **Nav REST galapunkta.** Latentuma procentiļu dati ir pieejami informācijas paneļa lapā `/dashboard/health`. Prometheus/OpenTelemetry eksportēšana ir plānota versijai v3.9.

### Prometheus / OpenTelemetry eksportēšana (2. posms)

Versijai v3.9 ir plānota vietējā eksportēšana uz Prometheus, OpenTelemetry un Datadog.

Pagaidām izgūstiet datus no `/api/monitoring/health`, izmantojot jebkuru HTTP balstītu uzraudzības sistēmu (Prometheus blackbox exporter, Datadog HTTP pārbaudi u.c.).

---

## Brīdinājumu konfigurēšanas piemēri

### Slack

> **Piezīme:** Tīmekļa aizķeres brīdinājumi tiek konfigurēti informācijas paneļa iestatījumu lapā — tiem nav paredzētu tīmekļa aizķeres vides mainīgo (`grep -rn` neatgriež nevienu rezultātu). Tīmekļa aizķeres URL, notikumu filtrēšanu un datu slodzes pielāgošanu skatiet iestatījumu lietotāja saskarnē.

### Discord

> Tīmekļa aizķeres brīdinājumiem tiek izmantota tā pati iestatījumu lietotāja saskarnes darbplūsma kā Slack. Discord pieņem tādas pašas formas JSON datu slodzi.

### PagerDuty

> Tīmekļa aizķeres brīdinājumiem tiek izmantota tā pati iestatījumu lietotāja saskarnes darbplūsma. PagerDuty Events API v2 maršrutēšanas atslēgas tiek konfigurētas iestatījumu lietotāja saskarnē.

### Pielāgota tīmekļa aizķere (JSON)

> Darbosies jebkurš HTTP galapunkts, kas pieņem POST pieprasījumus ar JSON pamattekstu. Konfigurējiet URL iestatījumu lietotāja saskarnē.

---

## Informācijas paneļa konfigurācija

### Veselības informācijas paneļa pielāgošana

Izveidojiet `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Pakalpojumu sniedzēja piespraušana augšpusē

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Problēmu novēršana

### „Pakalpojumu sniedzējs norāda, ka viss ir kārtībā, bet pieprasījumi neizdodas”

1. Pārbaudiet **autopilota problēmas** — iespējams, kāds modelis ir bloķēts
2. Skatiet **nesenās kļūdas**, lai atrastu konkrēto kļūdas klasi
3. Pakalpojumu sniedzēja kartītē izmēģiniet **savienojuma pārbaudi**
4. Pārbaudiet, vai pakalpojumu sniedzējs **nav ierobežojis pieprasījumu biežumu savā pusē** (lokāli tas nav redzams)

### „Kvotas statuss ir kārtībā, bet es redzu 429 kļūdas”

- 429 nozīmē, ka pakalpojumu sniedzējs norāda uz kvotas izlietojumu
- OmniRoute kvotas uzskaites dati var būt **novecojuši** — noteicošie ir pakalpojumu sniedzēja pusē esošie dati
- Kvotas dati tiek automātiski atsvaidzināti, izmantojot iekšējo kvotu pārraugu

### „Kombinācija nedarbojas, bet visi mērķi izskatās pieejami”

- Pārbaudiet **kombināciju veselības** informācijas paneli, lai atrastu mērķu secības problēmas
- Skatiet **atkāpšanās notikumus** — iespējams, kombinācija pārāk ātri izsmeļ visas iespējas
- Pārbaudiet, vai **stratēģija** atbilst jūsu lietošanas gadījumam (prioritāra, cikliska vai automātiska)

### „Datubāzes veselības pārbaude neizdodas”

- Palaidiet `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ja rezultāts ir „ok” — tā ir viltus trauksme, veselības pārbaude ir pārāk stingra
- Ja rezultāts ir jebkas cits — **apturiet OmniRoute** un izpildiet [avārijas atkopšanas rokasgrāmatā](./DATABASE_GUIDE.md#disaster-recovery) sniegtos norādījumus

### „Atmiņas kaudzes noslodze ir kritiska”

```bash
# Pārbaudiet pašreizējo kaudzi
node -e "console.log(process.memoryUsage())"

# Manuāli aktivizējiet GC (ja izmantots --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Samaziniet vienlaicīgo pieprasījumu skaitu (iestatiet informācijas paneļa iestatījumu lapā, nevis ar vides mainīgo)
# Vides mainīgais `MAX_CONCURRENT_REQUESTS` nepastāv — konfigurējiet to sadaļā Iestatījumi → Vienlaicīgums.
```

---

## Skatiet arī

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — lietojuma un izmaksu uzskaite
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB shēma un darbspēja
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — starpniekservera darbspēja (atsevišķa kešatmiņa)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sistēmas arhitektūra
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detalizēta informācija par circuit breaker
- Avots: `src/lib/monitoring/` (4 faili, 2121 koda rinda)
