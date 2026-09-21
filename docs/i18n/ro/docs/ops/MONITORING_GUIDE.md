# Monitoring & Observability Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Pe scurt**: OmniRoute include monitorizarea integrată a stării de funcționare, pilot automat pentru furnizori, urmărirea cotelor și mecanisme de observabilitate. Acest ghid prezintă panoul de control, alertele și depanarea.

**Surse:**

- `src/lib/monitoring/observability.ts` — instantaneu de observabilitate
- `src/lib/monitoring/comboHealthAutopilot.ts` — pilot automat pentru starea combinațiilor
- `src/lib/monitoring/providerHealthAutopilot.ts` — pilot automat pentru furnizori
- `src/lib/monitoring/providerHealthMatrix.ts` — matricea stării furnizorilor
- `src/lib/localHealthCheck.ts` — verificarea locală a stării
- `src/lib/tokenHealthCheck.ts` — starea reîmprospătării tokenurilor
- `src/lib/proxyHealth.ts` — cache-ul stării proxy-ului (prezentat în PROXY_GUIDE.md)

---

## Prezentare generală

OmniRoute are **3 niveluri de monitorizare**:

```
┌──────────────────────────────────────────────────────────────┐
│  Nivelul 1: Starea sistemului (la nivel de server)            │
│  ├─ localHealthCheck.ts — BD, porturi, dependențe native      │
│  ├─ db/healthCheck.ts — integritate, FK, artefacte orfane     │
│  └─ Panou de control: /dashboard/health                       │
├──────────────────────────────────────────────────────────────┤
│  Nivelul 2: Starea furnizorilor (reziliență per furnizor)     │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldown-uri│
│  ├─ providerHealthMatrix.ts — scoruri per furnizor/model      │
│  └─ Panou de control: /dashboard/providers                    │
├──────────────────────────────────────────────────────────────┤
│  Nivelul 3: Observabilitate în timp real (instantanee runtime)│
│  ├─ observability.ts — circuit breakere, sesiuni, cotă        │
│  ├─ tokenHealthCheck.ts — starea reîmprospătării tokenurilor OAuth │
│  └─ Instrumente MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Paginile panoului de control

### `/dashboard/health` (Starea sistemului)

Panoul principal pentru starea de funcționare afișează:

| Secțiune                  | Ce afișează                                              |
| ------------------------- | -------------------------------------------------------- |
| **Starea serverului**     | Timp de funcționare, versiune, port, conexiuni active    |
| **Baza de date**          | Conexiune, integritate, dimensiunea WAL, migrări recente |
| **Rezumat furnizori**     | Număr activ, număr sănătos, număr de breakere deschise   |
| **Monitoare de cotă**     | Sesiuni active, alerte, cote epuizate                    |
| **Erori recente**         | Ultimele 10 erori, cu traseele stivei                    |
| **Utilizarea resurselor** | Memorie, CPU, indicator de presiune asupra heap-ului     |

### `/dashboard/providers` (Starea furnizorilor)

Panou de control pentru fiecare furnizor:

| Coloană   | Descriere                                                     |
| --------- | ------------------------------------------------------------- |
| Furnizor  | ID-ul furnizorului + numele afișat                            |
| Stare     | Stare verde/galbenă/roșie                                     |
| Circuit   | Stare deschisă/închisă/semi-deschisă                          |
| Conexiuni | Numărul de conexiuni, ultima reîmprospătare                   |
| Modele    | Modele disponibile, starea fiecărui model                     |
| Cost      | Costul de astăzi, tendința pe 7 zile                          |
| Erori     | Numărul de erori din ultimele 24 h, clasa principală de erori |

Faceți clic pe un furnizor pentru a vedea:

- Solicitările recente, cu defalcarea latenței
- Scorurile de sănătate pentru fiecare conexiune
- Blocările pentru fiecare model
- Recomandările pilotului automat

### `/dashboard/quota` (Urmărirea cotelor)

Pentru fiecare cheie API:

- Utilizarea curentă în raport cu limita (bară de progres)
- Tendința cotei (grafic pe 30 de zile)
- Ora următoarei resetări
- Istoricul alertelor

### `/dashboard/combos` (Starea combinațiilor)

Pentru fiecare combinație:

- Strategie + destinații
- Starea fiecărei destinații
- Evenimente recente de rezervă
- Rata de succes (24 h, 7 zile, 30 de zile)

---

## API pentru verificarea stării de sănătate

OmniRoute expune **două** suprafețe HTTP pentru verificarea stării de sănătate. Acestea nu sunt interschimbabile pentru orchestratoare.

| Cale                         | Scop                                                                                          | Cost                                                      | Utilizare                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `GET /healthz`               | Disponibilitate operațională/de pregătire (`ok` / `starting` / `stopping`)                    | Neglijabil (doar indicatorul fazei)                       | **Disponibilitate** Kubernetes; verificare moderată a **funcționării** dacă trebuie să utilizați HTTP |
| `GET /api/monitoring/health` | Rezumat detaliat al sistemului și furnizorilor (DB, heap, numărul de elemente din catalog, …) | Ridicat (operațiuni sincrone asupra DB / de monitorizare) | Panouri de control, verificări blackbox detaliate, verificarea de sănătate încorporată în Docker      |

> **Notă:** Matricele privind starea furnizorilor, problemele autopilotului, monitoarele de cote, starea tokenurilor și detaliile despre latență care depășesc `/api/monitoring/health` sunt disponibile prin **instrumentul MCP** `observability_snapshot` sau în paginile **panoului de control** — nu există rute REST dedicate pentru acestea.

Ambele rute rulează în **aceeași buclă de evenimente Node** ca procesarea cererilor. O cale care solicită intens procesorul (procesarea unui catalog mare prin `GET /v1/models`, compresia contextelor lungi / numărarea tokenurilor) poate întârzia **toate** rutinele de tratare HTTP, inclusiv `/healthz`. Buclă de evenimente ocupată ≠ proces oprit. Este preferabil să remediați cauza consumului excesiv; ajustarea verificărilor doar reduce opririle eronate.

### Verificare simplă pentru orchestrator

```bash
GET /healthz
# sau HEAD /healthz
```

- **200** + corpul `ok` când faza ciclului de viață al serverului este pregătită
- **503** + `starting` / `stopping` în timpul pornirii sau opririi
- Implementare: `src/app/healthz/route.ts` (fără verificarea DB)

### Starea sistemului (detaliată)

```bash
GET /api/monitoring/health
```

Răspuns:

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

#### `credentialHealth`: memoria cache a verificărilor vs `test_status` din SQLite

`GET /api/monitoring/health` → `credentialHealth` este **indicatorul din memoria cache
a verificărilor**, nu o afișare în timp real a `provider_connections.test_status`. După #12532,
calea cererii citește numai `getCachedCredentialHealthSummary()`; verificările din fundal
actualizează memoria cache în afara buclei de evenimente.

| Strat                                      | Unde                                                                  | Ce înseamnă                                                                                                                                                                                                                          |
| ------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Indicatorul memoriei cache a verificărilor | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Ultimele rezultate ale verificărilor de sănătate a acreditărilor păstrate încă în memoria procesului. `source` este întotdeauna `probe-cache`.                                                                                       |
| Detalii despre conexiunile eșuate          | `credentialHealth.failedConnections`                                  | Prezent **numai când `failed > 0`**. Listă limitată de înregistrări din memoria cache cu `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` sanitizate). `failedOmitted` este setat când lista a fost limitată. |
| Stare persistentă SQLite                   | `credentialHealth.staleDbNonOkCount`                                  | Numărul rândurilor de conexiuni **active** (`is_active=1`) al căror `test_status` persistent are o valoare cunoscută diferită de „ok” (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).             |

Cele două straturi pot diferi în mod intenționat:

- Indicatorul `failed=0` în timp ce `staleDbNonOkCount>0` — SQLite are încă un
  `test_status` persistent (de exemplu, `expired` sau `credits_exhausted`) pe care cel mai recent
  instantaneu din memoria cache a verificărilor nu îl numără ca `status=error`.
- Indicatorul `failed>0` în timp ce SQLite pare sănătos — o verificare recentă a eșuat și este
  stocată în memoria cache; rândul din DB nu a fost actualizat sau a fost șters ulterior.

Nu declanșați alerte exclusiv pe baza `provider_connections.test_status` atunci când colectați date de la acest
endpoint. Utilizați `failed` + `failedConnections` pentru eșecurile actuale ale verificărilor și
`staleDbNonOkCount` când aveți nevoie de numărul stărilor persistente.

### Recomandări pentru verificările Kubernetes

OmniRoute este un **singur proces Node** (o singură buclă de evenimente). Configurația Docker standard `HEALTHCHECK` vizează ruta simplă `/healthz`. `/api/monitoring/health` este **prea costisitoare** pentru intervalele verificărilor de funcționare kubelet.

| Sondă                 | Țintă recomandată                                                                        | Note                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pornire**           | HTTP `GET /healthz` cu un `failureThreshold` mare (sau un `startPeriod` mare)            | Pornirea la rece + migrarea SQLite pot dura mai mult de câteva secunde                                                                                                                                                                                                                                                                                                                                      |
| **Disponibilitate**   | HTTP `GET /healthz`                                                                      | Starea ciclului de viață `ok` / `starting` / `stopping` (200 vs 503). Poate oscila în continuare dacă bucla este blocată de CPU. Un răspuns **200 după mai multe secunde nu indică o stare sănătoasă** (#10303) — înseamnă că bucla de evenimente a fost privată de resurse înainte ca handlerul de 3 octeți să ruleze                                                                                      |
| **Viabilitate**       | HTTP `GET /livez` **sau TCP** pe portul serviciului principal (`PORT`, implicit `20128`) | `/livez` indică doar că procesul este activ (întotdeauna 200 dacă handlerul rulează). Folosește totuși aceeași buclă de evenimente — ocupat ≠ mort și nu detectează privarea de resurse a buclei de evenimente (#10303) mai bine decât TCP. Preferați **TCP** dacă sondele HTTP expiră sub sarcina catalogului/compresiei; în niciun caz **nu** opriți podul pentru blocări scurte ale buclei de evenimente |
| **Stare aprofundată** | `GET /api/monitoring/health` de la un verificator extern                                 | Nu este destinat pentru `livenessProbe` kubelet / `readinessProbe` cu intervale scurte                                                                                                                                                                                                                                                                                                                      |

Exemplu de structură (ajustați pragurile în funcție de pornirea la rece și sarcina de compresie):

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
  # În timpul blocării buclei de evenimente, solicitarea HTTP /livez poate expira.
  # TCP este alternativa conservatoare:
  # tcpSocket:
  #   port: http
```

**Nu** direcționați verificarea de **viabilitate** kubelet către `/api/monitoring/health`. Această cale efectuează operațiuni reale asupra bazei de date și de monitorizare și va genera rezultate fals pozitive sub sarcină.

Subiecte asociate: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sonde în timp ce bucla de evenimente este ocupată), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (consum excesiv de resurse la calcularea prețurilor catalogului), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (consum excesiv de resurse la numărarea tokenurilor pentru compresie).

### Operațiuni opționale pe calea solicitării (memorie, abilități, reîmprospătarea tokenurilor)

Extragerea memoriei, injectarea abilităților și reîmprospătarea tokenurilor OAuth folosesc aceeași **buclă principală de evenimente Node** ca `/healthz`. Acestea sunt funcționalități activate sau dezactivate din panoul de control (`memoryEnabled`, `skillsEnabled`), nu un grup de procese worker. Consultați [Mediu — costul buclei de evenimente](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Starea furnizorilor

> **Niciun endpoint REST.** Datele privind starea furnizorilor sunt disponibile prin instrumentul MCP `observability_snapshot` sau pe pagina `/dashboard/providers` din panoul de control.

### Detaliile furnizorului

> **Niciun endpoint REST.** Detaliile pentru fiecare furnizor sunt disponibile pe pagina `/dashboard/providers` din panoul de control.

---

## Pilot automat pentru starea furnizorilor

Modulul `providerHealthAutopilot.ts` este un **sistem cu autoremediere** care:

1. Detectează problemele furnizorilor (circuit deschis, perioade de așteptare, blocări, avertismente privind cota)
2. Generează **acțiuni recomandate** pentru rezolvarea acestora
3. Opțional, **execută automat** acțiunile cu risc scăzut

### Tipuri de probleme detectate

| Tipul problemei              | Severitate  | Exemplu de condiție                                   |
| ---------------------------- | ----------- | ----------------------------------------------------- |
| `provider_circuit_open`      | critică     | Întrerupător de circuit deschis după 5 erori          |
| `provider_circuit_half_open` | avertisment | Circuitul testează recuperarea                        |
| `connection_cooldown`        | avertisment | Conexiune în așteptare după 429                       |
| `stale_connection_error`     | avertisment | Ultima reîmprospătare a eșuat acum peste 30 de minute |
| `terminal_connection_error`  | critică     | OAuth revocat, cheie nevalidă                         |
| `inactive_connection`        | informativă | Conexiune dezactivată în setări                       |
| `model_lockout`              | avertisment | Model specific aflat în carantină                     |
| `quota_monitor_warning`      | avertisment | Cota este utilizată în proporție de peste 80%         |

### Tipuri de acțiuni generate

| Acțiune                        | Risc    | Descriere                                             |
| ------------------------------ | ------- | ----------------------------------------------------- |
| `clear_provider_breaker`       | mediu   | Resetează întrerupătorul de circuit la starea închisă |
| `clear_connection_cooldown`    | scăzut  | Elimină perioada de așteptare a unei conexiuni        |
| `clear_stale_connection_error` | scăzut  | Șterge indicatorul de eroare învechită                |
| `clear_model_lockout`          | scăzut  | Reactivează un model aflat în carantină               |
| `reactivate_connection`        | mediu   | Reactivează o conexiune dezactivată                   |
| `deactivate_connection`        | ridicat | Dezactivează o conexiune problematică                 |

### API

> **Niciun endpoint REST.** Problemele pilotului automat sunt disponibile prin instrumentul MCP `observability_snapshot` sau prin panoul de control. Pilotul automat rulează intern; comportamentul său este configurat prin baza de date de setări (câmpul `autopilotMode` pentru fiecare conexiune), nu prin variabile de mediu — `grep -rn` pentru o variabilă de mediu aferentă modului pilot automat nu returnează niciun rezultat.

### Modul pilot automat

Pilotul automat funcționează implicit în **mod manual** — detectează probleme și generează acțiuni recomandate, dar nu le aplică automat. Acțiunile pot fi aplicate prin intermediul panoului de control.

---

## Pilot automat pentru starea combinațiilor

`comboHealthAutopilot.ts` este echivalentul **specific combinațiilor** al pilotului automat pentru furnizori. Acesta:

- Detectează combinațiile nesănătoase
- Recomandă reordonarea destinațiilor
- Sugerează dezactivarea destinațiilor defecte
- Elimină automat destinațiile inactive după N erori

### Exemple de probleme ale combinațiilor

```
Combinația "always-on" (strategie bazată pe prioritate)
├─ Destinația 1: openai/gpt-5 (sănătoasă)
├─ Destinația 2: anthropic/claude-opus-4-6 (⚠️ model blocat până la 14:00)
└─ Destinația 3: kiro/claude-sonnet-4-5 (sănătoasă)

Acțiune recomandată: Reordonați — mutați kiro deasupra anthropic până la expirarea blocării
```

---

## Monitoare de cotă

`observability.ts` expune **monitoare de cotă pentru fiecare sesiune** pentru furnizorii pe bază de abonament (Claude Code, Codex, GitHub Copilot):

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

### Semnificațiile stărilor

| Stare       | Când                                  | Acțiunea interfeței                              |
| ----------- | ------------------------------------- | ------------------------------------------------ |
| `starting`  | Sondarea inițială este în desfășurare | Indicator de încărcare                           |
| `idle`      | Nicio activitate recentă              | Ascuns din panoul de control                     |
| `healthy`   | Mai mult de 50% din cotă rămasă       | Punct verde                                      |
| `warning`   | Mai puțin de 50% din cotă rămasă      | Alertă galbenă                                   |
| `exhausted` | Cotă = 0%                             | Bloc roșu, direcționare către următorul furnizor |
| `error`     | Sondarea a eșuat                      | Punct roșu, reîncercare în curând                |

### API

> **Niciun endpoint REST.** Datele monitoarelor de cotă sunt disponibile prin instrumentul MCP `observability_snapshot` sau prin panoul de control.

---

## Instantaneu de observabilitate

Instrumentul MCP `observability_snapshot` returnează un **instantaneu complet al sistemului** pentru agenții AI:

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
  "quotaMonitors": {/* consultați informațiile de mai sus */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenții utilizează aceste date pentru a lua **decizii de rutare** — de exemplu, „dacă circuitul openai este deschis, rutează mai întâi către anthropic”.

---

## Verificarea stării tokenurilor

Furnizorii OAuth (Claude Code, GitHub Copilot, Cursor) necesită **reîmprospătarea periodică a tokenurilor**. `src/lib/tokenHealthCheck.ts` rulează un planificator în fundal:

- **Ciclu de verificare**: la fiecare 60 de secunde (ciclul din `TICK_MS = 60 * 1000` la `src/lib/tokenHealthCheck.ts:30`)
- **Intervalul verificării stării pentru fiecare conexiune**: implicit, 60 de minute (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configurabil prin baza de date cu setări
- **Reîmprospătare preventivă la 401**: gestionată de interceptorul fiecărei conexiuni

### Starea tokenurilor

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

### Configurare

Configurarea verificării stării tokenurilor este gestionată intern de `tokenHealthCheck.ts`.

### Starea tokenurilor

> **Nu există niciun endpoint REST.** Datele privind starea tokenurilor sunt disponibile prin tabloul de bord sau instrumentul MCP `observability_snapshot`.

---

## Alertare

### Canale încorporate

OmniRoute acceptă **3 canale de alertare**:

| Canal                     | Configurare        | Caz de utilizare                      |
| ------------------------- | ------------------ | ------------------------------------- |
| Banner în tabloul de bord | Activ permanent    | Notificări în cadrul aplicației       |
| Webhook                   | Configurați URL-ul | Slack, Discord, PagerDuty             |
| Jurnal                    | Implicit           | Pentru agregarea externă a jurnalelor |

### Configurarea webhookului

> **Notă:** Configurarea alertelor prin webhook este gestionată prin pagina Setări a tabloului de bord. Consultați interfața Setări pentru URL-ul webhookului, filtrarea evenimentelor și personalizarea sarcinii utile.

### Tipuri de alerte

| Alertă                       | Când                                                         | Severitate implicită |
| ---------------------------- | ------------------------------------------------------------ | -------------------- |
| `provider_circuit_open`      | Circuitul se deschide                                        | critică              |
| `provider_circuit_half_open` | Circuitul testează recuperarea                               | informativă          |
| `quota_warning`              | Cota este la 80% sau mai mult                                | avertisment          |
| `quota_exhausted`            | Cota este la 100%                                            | critică              |
| `token_refresh_failed`       | Peste 3 reîmprospătări consecutive eșuate                    | avertisment          |
| `token_expired`              | Tokenul a depășit data expirării                             | critică              |
| `combo_target_unhealthy`     | Ținta combinată este în perioada de așteptare de peste 1 oră | avertisment          |
| `db_integrity_warning`       | Încălcări FK > 0                                             | avertisment          |
| `heap_pressure`              | Utilizarea heapului > 80% din prag                           | avertisment          |

---

## Metrici de performanță

### Metrici monitorizate

| Metrică                 | Tip        | Sursă                           |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | contor     | `services/usage.ts`             |
| `request_latency_ms`    | histogramă | `services/usage.ts`             |
| `tokens_consumed`       | contor     | `services/usage.ts`             |
| `cost_usd`              | contor     | `services/usage.ts`             |
| `provider_errors`       | contor     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | contor     | `services/resilience.ts`        |
| `cache_hits`            | contor     | `services/signatureCache.ts`    |
| `compression_savings`   | histogramă | `services/compression/stats.ts` |
| `quota_used`            | indicator  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | indicator  | `observability.ts`              |

### Percentile de latență (p50/p95/p99)

> **Nu există un endpoint REST.** Datele privind percentilele de latență sunt disponibile prin pagina `/dashboard/health` a panoului de control. Exportul Prometheus/OpenTelemetry este planificat pentru v3.9.

### Export Prometheus / OpenTelemetry (Faza 2)

Planificat pentru v3.9: export nativ către Prometheus, OpenTelemetry, Datadog.

Deocamdată, colectați date de la `/api/monitoring/health` cu orice sistem de monitorizare bazat pe HTTP (exportatorul blackbox Prometheus, verificarea HTTP Datadog etc.).

---

## Rețete pentru alerte

### Slack

> **Notă:** Alertele prin webhook sunt configurate prin pagina Settings a panoului de control — nu există variabile de mediu dedicate webhookurilor (`grep -rn` nu returnează niciun rezultat). Consultați interfața Settings pentru URL-ul webhookului, filtrarea evenimentelor și personalizarea payloadului.

### Discord

> Alertele prin webhook utilizează același flux din interfața Settings ca Slack. Discord acceptă aceeași structură a payloadului JSON.

### PagerDuty

> Alertele prin webhook utilizează același flux din interfața Settings. Cheile de rutare PagerDuty Events API v2 sunt configurate în interfața Settings.

### Webhook personalizat (JSON)

> Orice endpoint HTTP care acceptă POST cu un corp JSON va funcționa. Configurați URL-ul în interfața Settings.

---

## Configurarea panoului de control

### Personalizarea panoului de control pentru stare

Creați un fișier `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fixarea unui furnizor în partea de sus

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Depanare

### „Furnizorul este indicat ca funcțional, dar solicitările eșuează”

1. Verificați **problemele autopilotului** — este posibil ca un model să fie blocat
2. Consultați **erorile recente** pentru clasa specifică de eroare
3. Încercați **testul de conexiune** din cardul furnizorului
4. Verificați dacă furnizorul este **limitat în amonte din cauza ratei solicitărilor** (acest lucru nu este vizibil local)

### „Cota este indicată ca fiind în regulă, dar văd răspunsuri 429”

- 429 înseamnă că furnizorul indică faptul că v-ați consumat cota
- Monitorizarea cotei de către OmniRoute poate fi **învechită** — datele reale ale furnizorului se află în amonte
- Datele despre cotă sunt reîmprospătate automat prin monitorul intern de cote

### „Combinația eșuează, dar toate țintele par funcționale”

- Verificați panoul de control pentru **starea combinației** pentru a identifica problemele de ordonare a țintelor
- Consultați **evenimentele de fallback** — este posibil ca această combinație să epuizeze opțiunile prea repede
- Verificați dacă **strategia** corespunde cazului dumneavoastră de utilizare (prioritate vs round-robin vs automat)

### „Verificarea stării bazei de date eșuează”

- Rulați `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Dacă rezultatul este „ok” — este o alarmă falsă, verificarea stării este prea strictă
- Dacă rezultatul este orice altceva — **opriți OmniRoute** și urmați [ghidul de recuperare în caz de dezastru](./DATABASE_GUIDE.md#disaster-recovery)

### „Presiunea asupra memoriei heap este critică”

```bash
# Verificați memoria heap curentă
node -e "console.log(process.memoryUsage())"

# Declanșați manual colectarea memoriei neutilizate (dacă se folosește --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduceți solicitările concurente (configurați prin pagina Settings a panoului de control, nu printr-o variabilă de mediu)
# Nu există variabila de mediu `MAX_CONCURRENT_REQUESTS` — configurați această valoare în Settings → Concurrency.
```

---

## Consultați și

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — monitorizarea utilizării și a costurilor
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schema bazei de date + starea de funcționare
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — starea de funcționare a proxy-ului (cache separat)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arhitectura sistemului
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detalii despre mecanismul circuit breaker
- Sursă: `src/lib/monitoring/` (4 fișiere, 2121 linii de cod)
