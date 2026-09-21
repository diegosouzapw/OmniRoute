# Monitoring & Observability Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute dolazi s ugrađenim nadzorom stanja, autopilotom pružatelja usluga, praćenjem kvota i priključnim točkama za opservabilnost. Ovaj vodič obuhvaća nadzornu ploču, upozorenja i rješavanje problema.

**Izvori:**

- `src/lib/monitoring/observability.ts` — snimka opservabilnosti
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot stanja kombinacija
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot pružatelja usluga
- `src/lib/monitoring/providerHealthMatrix.ts` — matrica stanja pružatelja usluga
- `src/lib/localHealthCheck.ts` — lokalna provjera stanja
- `src/lib/tokenHealthCheck.ts` — stanje osvježavanja tokena
- `src/lib/proxyHealth.ts` — predmemorija stanja proxyja (obrađeno u PROXY_GUIDE.md)

---

## Pregled

OmniRoute ima **3 sloja nadzora**:

```
┌──────────────────────────────────────────────────────────────┐
│  Sloj 1: Stanje sustava (na razini poslužitelja)              │
│  ├─ localHealthCheck.ts — baza podataka, priključci, izvorne ovisnosti │
│  ├─ db/healthCheck.ts — integritet, strani ključevi, napušteni artefakti │
│  └─ Nadzorna ploča: /dashboard/health                         │
├──────────────────────────────────────────────────────────────┤
│  Sloj 2: Stanje pružatelja usluga (otpornost po pružatelju)   │
│  ├─ providerHealthAutopilot.ts — prekidač strujnog kruga, razdoblja čekanja │
│  ├─ providerHealthMatrix.ts — ocjene stanja po pružatelju/modelu │
│  └─ Nadzorna ploča: /dashboard/providers                      │
├──────────────────────────────────────────────────────────────┤
│  Sloj 3: Opservabilnost uživo (snimke tijekom izvođenja)      │
│  ├─ observability.ts — prekidači strujnog kruga, sesije, kvota │
│  ├─ tokenHealthCheck.ts — stanje osvježavanja OAuth tokena    │
│  └─ MCP alati: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Stranice nadzorne ploče

### `/dashboard/health` (Stanje sustava)

Nadzorna ploča stanja najviše razine prikazuje:

| Odjeljak                | Što prikazuje                                           |
| ----------------------- | ------------------------------------------------------- |
| **Status poslužitelja** | Vrijeme rada, verziju, priključak, aktivne veze         |
| **Baza podataka**       | Vezu, integritet, veličinu WAL-a, nedavne migracije     |
| **Sažetak pružatelja**  | Broj aktivnih, broj dostupnih, broj otvorenih prekidača |
| **Nadzornici kvota**    | Aktivne sesije, upozorenja, iscrpljene kvote            |
| **Nedavne pogreške**    | Posljednjih 10 pogrešaka s tragovima stoga              |
| **Upotreba resursa**    | Memoriju, CPU, pokazatelj opterećenja gomile            |

### `/dashboard/providers` (Stanje pružatelja usluga)

Nadzorna ploča po pružatelju usluga:

| Stupac    | Opis                                                      |
| --------- | --------------------------------------------------------- |
| Pružatelj | ID pružatelja + naziv za prikaz                           |
| Stanje    | Zeleni/žuti/crveni status                                 |
| Krug      | Otvoreno/zatvoreno/poluotvoreno stanje                    |
| Veze      | Broj veza, posljednje osvježavanje                        |
| Modeli    | Dostupni modeli, stanje po modelu                         |
| Trošak    | Današnji trošak, trend tijekom 7 dana                     |
| Pogreške  | Broj pogrešaka u posljednja 24 h, najčešća klasa pogreške |

Kliknite pružatelja usluga kako biste vidjeli:

- Nedavne zahtjeve s raščlambom latencije
- Ocjene stanja po vezi
- Blokade po modelu
- Preporuke autopilota

### `/dashboard/quota` (Praćenje kvota)

Za svaki API ključ:

- Trenutačna upotreba u odnosu na ograničenje (traka napretka)
- Trend kvote (30-dnevni grafikon)
- Vrijeme sljedećeg poništavanja
- Povijest upozorenja

### `/dashboard/combos` (Stanje kombinacija)

Za svaku kombinaciju:

- Strategija + ciljevi
- Stanje po cilju
- Nedavni događaji prebacivanja na rezervnu opciju
- Stopa uspješnosti (24 h, 7 d, 30 d)

---

## API za provjeru stanja

OmniRoute izlaže **dvije** HTTP površine za provjeru stanja. Nisu međusobno zamjenjive za orkestratore.

| Putanja                      | Svrha                                                                     | Opterećenje                              | Upotreba                                                                       |
| ---------------------------- | ------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `GET /healthz`               | Živost/spremnost životnog ciklusa (`ok` / `starting` / `stopping`)        | Zanemarivo (samo oznaka faze)            | Kubernetes **spremnost**; blaga provjera **živosti** ako morate koristiti HTTP |
| `GET /api/monitoring/health` | Detaljan sažetak sustava i pružatelja (DB, heap, broj stavki kataloga, …) | Veliko (sinkroni rad s DB-om / nadzorom) | Nadzorne ploče, detaljne blackbox provjere, ugrađeni Dockerov healthcheck      |

> **Napomena:** Matrice stanja pružatelja, problemi autopilota, nadzornici kvota, stanje tokena i detalji latencije izvan `/api/monitoring/health` dostupni su putem **MCP alata** `observability_snapshot` ili stranica **nadzorne ploče** — za njih ne postoje zasebne REST rute.

Obje se rute izvršavaju na **istoj Node petlji događaja** kao i obrada zahtjeva. Putanja koja intenzivno koristi CPU (velik kataloški posao za `GET /v1/models`, kompresija dugog konteksta / brojanje tokena) može odgoditi **sve** HTTP obrađivače, uključujući `/healthz`. Zauzeta petlja događaja ≠ mrtav proces. Prednost dajte otklanjanju uzroka opterećenja; podešavanje provjera samo smanjuje broj lažnih prekida procesa.

### Jednostavna provjera za orkestrator

```bash
GET /healthz
# ili HEAD /healthz
```

- **200** + tijelo `ok` kada je faza životnog ciklusa poslužitelja spremna
- **503** + `starting` / `stopping` tijekom pokretanja ili isključivanja
- Implementacija: `src/app/healthz/route.ts` (bez provjere DB-a)

### Stanje sustava (detaljno)

```bash
GET /api/monitoring/health
```

Odgovor:

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

#### `credentialHealth`: predmemorija provjera u odnosu na SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` je **mjerač predmemorije provjera u memoriji**, a ne izravni ispis vrijednosti `provider_connections.test_status`. Nakon #12532 putanja zahtjeva čita samo `getCachedCredentialHealthSummary()`; pozadinske provjere osvježavaju predmemoriju izvan petlje događaja.

| Sloj                         | Gdje                                                                  | Što znači                                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mjerač predmemorije provjera | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Posljednji rezultati provjere stanja vjerodajnica koji se još uvijek čuvaju u memoriji procesa. `source` je uvijek `probe-cache`.                                                                                         |
| Pojedinosti neuspjele veze   | `credentialHealth.failedConnections`                                  | Prisutno **samo kada je `failed > 0`**. Ograničen popis redaka predmemorije sa `status=error` (`connectionId`, `status`, pročišćeni `lastError` / `lastErrorType`). `failedOmitted` se postavlja kada je popis ograničen. |
| Trajno stanje u SQLiteu      | `credentialHealth.staleDbNonOkCount`                                  | Broj redaka **aktivnih** (`is_active=1`) veza čiji je pohranjeni `test_status` poznata vrijednost koja nije ispravna (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                   |

Ta se dva sloja namjerno mogu razlikovati:

- Mjerač `failed=0` dok je `staleDbNonOkCount>0` — SQLite još uvijek ima trajni
  `test_status` (primjerice `expired` ili `credits_exhausted`) koji najnovija
  snimka predmemorije provjera ne računa kao `status=error`.
- Mjerač `failed>0` dok SQLite izgleda ispravno — nedavna provjera nije uspjela i
  pohranjena je u predmemoriju; redak u DB-u nije ažuriran ili je naknadno očišćen.

Pri prikupljanju podataka s ove krajnje točke nemojte upozoravati samo na temelju
`provider_connections.test_status`. Koristite `failed` + `failedConnections` za
trenutačne neuspjehe provjera, a `staleDbNonOkCount` kada vam je potreban broj
pohranjenih trajnih statusa.

### Preporuke za Kubernetes provjere

OmniRoute je **jedan Node proces** (jedna petlja događaja). Standardni Dockerov `HEALTHCHECK` cilja jednostavnu rutu `/healthz`. `/api/monitoring/health` je **prezahtjevan** za intervale kubelet provjere živosti.

| Provjera                     | Preporučeni cilj                                                                    | Napomene                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pokretanje**               | HTTP `GET /healthz` s dugim `failureThreshold` (ili velikim `startPeriod`)          | Hladno pokretanje + SQLite migracija mogu trajati dulje od nekoliko sekundi                                                                                                                                                                                                                                                                                                                  |
| **Spremnost**                | HTTP `GET /healthz`                                                                 | Stanje životnog ciklusa `ok` / `starting` / `stopping` (200 naspram 503). I dalje oscilira ako je petlja blokirana CPU-om. **Odgovor 200 nakon više sekundi nije znak ispravnog stanja** (#10303) — znači da je petlja događaja bila zagušena prije nego što se izvršio rukovatelj od 3 bajta                                                                                                |
| **Aktivnost**                | HTTP `GET /livez` **ili TCP** na glavnom priključku usluge (`PORT`, zadano `20128`) | `/livez` provjerava samo je li proces aktivan (uvijek vraća 200 ako se rukovatelj izvrši). I dalje dijeli petlju događaja — zauzeto ≠ mrtvo i ne otkriva zagušenje petlje događaja (#10303) ništa bolje od TCP-a. Dajte prednost **TCP-u** ako HTTP provjere isteknu pod opterećenjem kataloga/kompresije; ni u kojem slučaju **nemojte** prekinuti pod zbog kratkih zastoja petlje događaja |
| **Dubinska provjera stanja** | `GET /api/monitoring/health` iz vanjskog sustava za provjeru                        | Nije namijenjeno za kubelet `livenessProbe` / učestali `readinessProbe`                                                                                                                                                                                                                                                                                                                      |

Primjer strukture (prilagodite pragove svojem hladnom pokretanju i opterećenju kompresije):

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
  # Tijekom zastoja petlje događaja HTTP /livez i dalje može isteći. TCP je
  # konzervativna alternativa:
  # tcpSocket:
  #   port: http
```

**Nemojte** usmjeravati kubelet provjeru **aktivnosti** na `/api/monitoring/health`. Ta putanja obavlja stvarne operacije nad bazom podataka i nadzorom te će pod opterećenjem davati lažno pozitivne rezultate.

Povezano: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (provjere dok je petlja događaja zauzeta), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (izračun cijena kataloga monopolizira resurse), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (brojanje tokena za kompresiju monopolizira resurse).

### Neobavezne operacije na putanji zahtjeva (memorija, vještine, osvježavanje tokena)

Izdvajanje memorije, umetanje vještina i osvježavanje OAuth tokena dijele **glavnu Node petlju događaja** s `/healthz`. To su značajke koje se uključuju i isključuju putem nadzorne ploče (`memoryEnabled`, `skillsEnabled`), a ne skup radnih procesa. Pogledajte [Okruženje — opterećenje petlje događaja](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Stanje pružatelja usluga

> **Nema REST krajnje točke.** Podaci o stanju pružatelja usluga dostupni su putem MCP alata `observability_snapshot` ili stranice `/dashboard/providers` na nadzornoj ploči.

### Pojedinosti o pružatelju usluga

> **Nema REST krajnje točke.** Pojedinosti za svakog pružatelja usluga dostupne su putem stranice `/dashboard/providers` na nadzornoj ploči.

---

## Autopilot za zdravlje pružatelja

Modul `providerHealthAutopilot.ts` je **sustav sa samostalnim oporavkom** koji:

1. Otkriva probleme s pružateljima (otvoren strujni prekidač, razdoblja hlađenja, blokade, upozorenja o kvoti)
2. Generira **preporučene radnje** za njihovo rješavanje
3. Po želji **automatski izvršava** radnje niskog rizika

### Otkrivene vrste problema

| Vrsta problema               | Ozbiljnost  | Primjer uvjeta                                               |
| ---------------------------- | ----------- | ------------------------------------------------------------ |
| `provider_circuit_open`      | kritično    | Strujni prekidač otvoren nakon 5 neuspjeha                   |
| `provider_circuit_half_open` | upozorenje  | Strujni prekidač testira oporavak                            |
| `connection_cooldown`        | upozorenje  | Veza u razdoblju hlađenja nakon odgovora 429                 |
| `stale_connection_error`     | upozorenje  | Posljednje osvježavanje nije uspjelo prije više od 30 minuta |
| `terminal_connection_error`  | kritično    | OAuth opozvan, ključ nije valjan                             |
| `inactive_connection`        | informacije | Veza onemogućena u postavkama                                |
| `model_lockout`              | upozorenje  | Određeni model u karanteni                                   |
| `quota_monitor_warning`      | upozorenje  | Iskorišteno 80% ili više kvote                               |

### Generirane vrste radnji

| Radnja                         | Rizik   | Opis                                           |
| ------------------------------ | ------- | ---------------------------------------------- |
| `clear_provider_breaker`       | srednji | Vraćanje strujnog prekidača u zatvoreno stanje |
| `clear_connection_cooldown`    | nizak   | Uklanjanje razdoblja hlađenja s veze           |
| `clear_stale_connection_error` | nizak   | Uklanjanje oznake zastarjele pogreške          |
| `clear_model_lockout`          | nizak   | Ponovno omogućavanje modela u karanteni        |
| `reactivate_connection`        | srednji | Ponovno omogućavanje deaktivirane veze         |
| `deactivate_connection`        | visok   | Onemogućavanje problematične veze              |

### API

> **Nema REST krajnje točke.** Problemi koje otkrije autopilot dostupni su putem MCP alata `observability_snapshot` ili nadzorne ploče. Autopilot se izvršava interno; njegovo se ponašanje konfigurira putem baze podataka postavki (polje `autopilotMode` za pojedinu vezu), a ne putem varijabli okruženja — `grep -rn` za varijablu okruženja načina rada autopilota ne vraća nijedan rezultat.

### Način rada autopilota

Autopilot prema zadanim postavkama radi u **ručnom načinu rada** — otkriva probleme i generira preporučene radnje, ali ih ne primjenjuje automatski. Radnje se mogu primijeniti putem nadzorne ploče.

---

## Autopilot za zdravlje kombinacija

`comboHealthAutopilot.ts` je ekvivalent autopilota za pružatelje, ali **specifičan za kombinacije**. On:

- Otkriva nezdrave kombinacije
- Preporučuje promjenu redoslijeda odredišta
- Predlaže onemogućavanje neispravnih odredišta
- Automatski uklanja nedostupna odredišta nakon N neuspjeha

### Primjeri problema s kombinacijama

```
Kombinacija "always-on" (strategija prioriteta)
├─ Odredište 1: openai/gpt-5 (zdravo)
├─ Odredište 2: anthropic/claude-opus-4-6 (⚠️ blokada modela do 14:00)
└─ Odredište 3: kiro/claude-sonnet-4-5 (zdravo)

Preporučena radnja: Promijenite redoslijed — premjestite kiro iznad anthropic dok blokada ne istekne
```

---

## Nadzornici kvota

`observability.ts` izlaže **nadzornike kvota za pojedinačne sesije** za pružatelje pretplatničkih usluga (Claude Code, Codex, GitHub Copilot):

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

### Značenja statusa

| Status      | Kada                                 | Radnja korisničkog sučelja                           |
| ----------- | ------------------------------------ | ---------------------------------------------------- |
| `starting`  | Početno dohvaćanje podataka u tijeku | Indikator učitavanja                                 |
| `idle`      | Nema nedavne aktivnosti              | Skriveno s nadzorne ploče                            |
| `healthy`   | Preostalo je više od 50% kvote       | Zelena točka                                         |
| `warning`   | Preostalo je manje od 50% kvote      | Žuto upozorenje                                      |
| `exhausted` | Kvota = 0%                           | Crvena blokada, preusmjeravanje sljedećem pružatelju |
| `error`     | Dohvaćanje podataka nije uspjelo     | Crvena točka, uskoro ponoviti pokušaj                |

### API

> **Nema REST krajnje točke.** Podaci nadzornika kvota dostupni su putem MCP alata `observability_snapshot` ili nadzorne ploče.

---

## Snimka opservabilnosti

MCP alat `observability_snapshot` vraća **potpunu snimku sustava** za AI agente:

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
  "quotaMonitors": {/* pogledajte iznad */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenti to koriste za donošenje **odluka o usmjeravanju** — primjerice, „ako je strujni krug pružatelja openai otvoren, najprije usmjeri na anthropic”.

---

## Provjera ispravnosti tokena

OAuth pružatelji (Claude Code, GitHub Copilot, Cursor) zahtijevaju **periodičko osvježavanje tokena**. `src/lib/tokenHealthCheck.ts` pokreće pozadinski raspoređivač:

- **Ciklus provjere**: svakih 60 sekundi (provjera u `TICK_MS = 60 * 1000` na `src/lib/tokenHealthCheck.ts:30`)
- **Interval provjere ispravnosti po vezi**: zadano 60 minuta (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); može se konfigurirati putem baze podataka postavki
- **Preventivno osvježavanje nakon odgovora 401**: obrađuje ga presretač za pojedinu vezu

### Status ispravnosti tokena

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

### Konfiguracija

Konfiguracijom provjere ispravnosti tokena interno upravlja `tokenHealthCheck.ts`.

### Ispravnost tokena

> **Nema REST krajnje točke.** Podaci o ispravnosti tokena dostupni su putem nadzorne ploče ili MCP alata `observability_snapshot`.

---

## Upozoravanje

### Ugrađeni kanali

OmniRoute podržava **3 kanala za upozorenja**:

| Kanal                 | Postavljanje       | Slučaj upotrebe                     |
| --------------------- | ------------------ | ----------------------------------- |
| Natpis nadzorne ploče | Uvijek uključen    | Obavijesti unutar aplikacije        |
| Webhook               | Konfigurirajte URL | Slack, Discord, PagerDuty           |
| Zapisnik              | Zadano             | Za vanjsko objedinjavanje zapisnika |

### Konfiguracija webhooka

> **Napomena:** Konfiguracijom webhook upozorenja upravlja se putem stranice Postavke na nadzornoj ploči. U korisničkom sučelju Postavke možete pronaći URL webhooka, filtriranje događaja i prilagodbu korisnog sadržaja.

### Vrste upozorenja

| Upozorenje                   | Kada                                              | Zadana razina ozbiljnosti |
| ---------------------------- | ------------------------------------------------- | ------------------------- |
| `provider_circuit_open`      | Strujni krug se otvori                            | kritično                  |
| `provider_circuit_half_open` | Strujni krug testira oporavak                     | informativno              |
| `quota_warning`              | Kvota je na 80% ili više                          | upozorenje                |
| `quota_exhausted`            | Kvota je na 100%                                  | kritično                  |
| `token_refresh_failed`       | 3 ili više uzastopnih neuspjeha osvježavanja      | upozorenje                |
| `token_expired`              | Tokenu je istekao rok valjanosti                  | kritično                  |
| `combo_target_unhealthy`     | Kombinirano odredište u hlađenju je 1 h ili dulje | upozorenje                |
| `db_integrity_warning`       | Broj kršenja stranih ključeva veći je od 0        | upozorenje                |
| `heap_pressure`              | Upotreba hrpe veća je od 80% praga                | upozorenje                |

---

## Metrike performansi

### Praćene metrike

| Metrika                 | Vrsta     | Izvor                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | brojač    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | brojač    | `services/usage.ts`             |
| `cost_usd`              | brojač    | `services/usage.ts`             |
| `provider_errors`       | brojač    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | brojač    | `services/resilience.ts`        |
| `cache_hits`            | brojač    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | mjerač    | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | mjerač    | `observability.ts`              |

### Percentili latencije (p50/p95/p99)

> **Nema REST krajnje točke.** Podaci o percentilima latencije dostupni su na stranici nadzorne ploče `/dashboard/health`. Izvoz u Prometheus/OpenTelemetry planiran je za v3.9.

### Izvoz u Prometheus / OpenTelemetry (2. faza)

Za v3.9 planiran je izvorni izvoz u Prometheus, OpenTelemetry i Datadog.

Za sada dohvaćajte `/api/monitoring/health` bilo kojim sustavom za nadzor temeljenim na HTTP-u (Prometheus blackbox exporter, Datadog HTTP check itd.).

---

## Primjeri konfiguracije upozorenja

### Slack

> **Napomena:** Upozorenja putem webhooka konfiguriraju se na stranici Postavke nadzorne ploče — ne postoje namjenske varijable okruženja za webhook (`grep -rn` ne vraća nijedan rezultat). U korisničkom sučelju Postavke možete postaviti URL webhooka, filtriranje događaja i prilagodbu sadržaja zahtjeva.

### Discord

> Upozorenja putem webhooka koriste isti postupak u korisničkom sučelju Postavke kao Slack. Discord prihvaća isti oblik JSON sadržaja zahtjeva.

### PagerDuty

> Upozorenja putem webhooka koriste isti postupak u korisničkom sučelju Postavke. Ključevi usmjeravanja za PagerDuty Events API v2 konfiguriraju se u korisničkom sučelju Postavke.

### Prilagođeni webhook (JSON)

> Funkcionirat će bilo koja HTTP krajnja točka koja prihvaća POST s JSON tijelom. Konfigurirajte URL u korisničkom sučelju Postavke.

---

## Konfiguracija nadzorne ploče

### Prilagodba nadzorne ploče stanja

Izradite `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Prikvačivanje pružatelja usluga na vrh

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Otklanjanje poteškoća

### "Pružatelj usluge prijavljuje ispravno stanje, ali zahtjevi ne uspijevaju"

1. Provjerite **probleme autopilota** — možda je model blokiran
2. Pregledajte **nedavne pogreške** za određenu klasu pogreške
3. Pokušajte izvršiti **test veze** na kartici pružatelja usluge
4. Provjerite je li pružatelj usluge **ograničio stopu zahtjeva na nadređenom sustavu** (nije vidljivo lokalno)

### "Kvota se prikazuje kao dostupna, ali pojavljuju se odgovori 429"

- 429 znači da pružatelj usluge navodi kako ste iskoristili svoju kvotu
- Praćenje kvote u sustavu OmniRoute može biti **zastarjelo** — mjerodavni su podaci pružatelja usluge na nadređenom sustavu
- Podaci o kvoti automatski se osvježavaju putem internog nadzornika kvote

### "Kombinacija ne uspijeva, ali svi ciljevi izgledaju ispravno"

- Na nadzornoj ploči **stanja kombinacije** provjerite postoje li problemi s redoslijedom ciljeva
- Pregledajte **događaje prebacivanja na pričuvnu opciju** — možda kombinacija prebrzo iscrpljuje sve mogućnosti
- Provjerite odgovara li **strategija** vašem slučaju upotrebe (prioritetna, kružna ili automatska)

### "Provjera stanja baze podataka ne uspijeva"

- Pokrenite `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ako je rezultat "ok" — riječ je o lažnoj uzbuni jer je provjera stanja prestroga
- Ako je rezultat bilo što drugo — **zaustavite OmniRoute** i slijedite [vodič za oporavak od katastrofe](./DATABASE_GUIDE.md#disaster-recovery)

### "Opterećenje memorije hrpe kritično je"

```bash
# Provjerite trenutačno stanje hrpe
node -e "console.log(process.memoryUsage())"

# Pokrenite ručno prikupljanje otpada (ako je postavljeno --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Smanjite broj istodobnih zahtjeva (postavlja se putem stranice Postavke na nadzornoj ploči, a ne varijablom okruženja)
# Ne postoji varijabla okruženja `MAX_CONCURRENT_REQUESTS` — konfigurirajte je u Postavke → Istodobnost.
```

---

## Također pogledajte

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — praćenje korištenja i troškova
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — shema baze podataka + stanje
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — stanje proxy poslužitelja (zasebna predmemorija)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arhitektura sustava
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pojedinosti o prekidaču strujnog kruga
- Izvor: `src/lib/monitoring/` (4 datoteke, 2121 redak koda)
