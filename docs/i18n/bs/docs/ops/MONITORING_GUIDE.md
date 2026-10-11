# Monitoring & Observability Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

# Vodič za nadzor i opservabilnost

> **TL;DR**: OmniRoute dolazi sa ugrađenim nadzorom zdravlja (health monitoring), autopilotom provajdera, praćenjem kvota i kukicama za opservabilnost. Ovaj vodič pokriva kontrolnu tablu, upozorenja i rješavanje problema.

**Izvori:**

- `src/lib/monitoring/observability.ts` — snimak opservabilnosti
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot zdravlja kombinacija
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot provajdera
- `src/lib/monitoring/providerHealthMatrix.ts` — matrica zdravlja provajdera
- `src/lib/localHealthCheck.ts` — lokalna provjera zdravlja
- `src/lib/tokenHealthCheck.ts` — zdravlje osvježavanja tokena
- `src/lib/proxyHealth.ts` — keš zdravlja proksija (pokriveno u PROXY_GUIDE.md)

---

## Pregled

OmniRoute ima **3 sloja nadzora**:

```
┌──────────────────────────────────────────────────────────────┐
│  Sloj 1: Zdravlje sistema (nivo servera)                      │
│  ├─ localHealthCheck.ts — DB, portovi, izvorne zavisnosti     │
│  ├─ db/healthCheck.ts — integritet, FK, napušteni artefakti   │
│  └─ Kontrolna tabla: /dashboard/health                       │
├──────────────────────────────────────────────────────────────┤
│  Sloj 2: Zdravlje provajdera (otpornost po provajderu)        │
│  ├─ providerHealthAutopilot.ts — circuit breaker, hlađenje    │
│  ├─ providerHealthMatrix.ts — ocjene zdravlja po provajderu/modelu │
│  └─ Kontrolna tabla: /dashboard/providers                    │
├──────────────────────────────────────────────────────────────┤
│  Sloj 3: Opservabilnost uživo (snimci vremena izvršavanja)    │
│  ├─ observability.ts — circuit breaker, sesije, kvota         │
│  ├─ tokenHealthCheck.ts — zdravlje osvježavanja OAuth tokena  │
│  └─ MCP alati: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Stranice kontrolne table

### `/dashboard/health` (Zdravlje sistema)

Kontrolna tabla zdravlja najvišeg nivoa prikazuje:

| Sekcija                | Šta prikazuje                                           |
| ---------------------- | ------------------------------------------------------- |
| **Status servera**     | Vrijeme rada (uptime), verzija, port, aktivne konekcije |
| **Baza podataka**      | Konekcija, integritet, WAL veličina, nedavne migracije  |
| **Sažetak provajdera** | Broj aktivnih, broj zdravih, broj otvorenih prekidača   |
| **Monitor kvota**      | Aktivne sesije, upozorenja, iscrpljeno                  |
| **Nedavne greške**     | Posljednjih 10 grešaka sa stack trace-ovima             |
| **Korištenje resursa** | Memorija, CPU, indikator pritiska na heap               |

### `/dashboard/providers` (Zdravlje provajdera)

Kontrolna tabla po provajderu:

| Kolona    | Opis                                               |
| --------- | -------------------------------------------------- |
| Provajder | ID provajdera + prikazano ime                      |
| Zdravlje  | Zeleni/žuti/crveni status                          |
| Circuit   | Otvoreno/zatvoreno/poluotvoreno stanje             |
| Konekcije | Broj konekcija, posljednje osvježavanje            |
| Modeli    | Dostupni modeli, zdravlje po modelu                |
| Trošak    | Današnji trošak, 7-dnevni trend                    |
| Greške    | Broj grešaka u posljednja 24h, glavna klasa greške |

Kliknite na provajdera da vidite:

- Nedavne zahtjeve sa raščlambom latencije
- Ocjene zdravlja po konekciji
- Zaključavanja po modelu
- Preporuke autopilota

### `/dashboard/quota` (Praćenje kvota)

Za svaki API ključ:

- Trenutna upotreba u odnosu na limit (traka napretka)
- Trend kvote (30-dnevni grafikon)
- Vrijeme sljedećeg resetovanja
- Istorija upozorenja

### `/dashboard/combos` (Zdravlje kombinacija)

Po kombinaciji:

- Strategija + ciljevi
- Zdravlje po cilju
- Nedavni događaji prebacivanja (fallback)
- Stopa uspješnosti (24h, 7d, 30d)

---

## API za provjeru stanja

OmniRoute izlaže **dvije** HTTP površine za provjeru stanja. One nisu međusobno zamjenjive za orkestratore.

| Putanja                      | Svrha                                                                  | Opterećenje                             | Koristiti za                                                                       |
| ---------------------------- | ---------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| `GET /healthz`               | Dostupnost/spremnost životnog ciklusa (`ok` / `starting` / `stopping`) | Zanemarivo (samo oznaka faze)           | Kubernetes **spremnost**; blagu **provjeru dostupnosti** ako morate koristiti HTTP |
| `GET /api/monitoring/health` | Detaljan sažetak sistema i provajdera (DB, heap, brojevi kataloga, …)  | Veliko (sinhroni rad s DB-om/praćenjem) | Nadzorne ploče, detaljne blackbox provjere, Dockerova ugrađena provjera stanja     |

> **Napomena:** Matrice stanja provajdera, problemi autopilota, nadzornici kvota, stanje tokena i detalji latencije izvan `/api/monitoring/health` dostupni su putem **MCP alata** `observability_snapshot` ili stranica **nadzorne ploče** — za njih ne postoje namjenske REST rute.

Obje rute se izvršavaju u **istoj Node petlji događaja** kao i obrada zahtjeva. Putanja koja intenzivno koristi CPU (opsežna obrada kataloga `GET /v1/models`, kompresija dugog konteksta / brojanje tokena) može odgoditi **sve** HTTP obrađivače, uključujući `/healthz`. Zauzeta petlja događaja ≠ mrtav proces. Prednost dajte otklanjanju uzroka opterećenja; podešavanje provjera samo smanjuje broj lažnih prekida.

### Lagana provjera za orkestrator

```bash
GET /healthz
# ili HEAD /healthz
```

- **200** + tijelo `ok` kada je faza životnog ciklusa servera spremna
- **503** + `starting` / `stopping` tokom pokretanja ili gašenja
- Implementacija: `src/app/healthz/route.ts` (bez provjere dostupnosti DB-a)

### Stanje sistema (detaljno)

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

`GET /api/monitoring/health` → `credentialHealth` je **mjerač predmemorije provjera u memoriji**,
a ne trenutni ispis vrijednosti `provider_connections.test_status`. Nakon #12532
putanja zahtjeva čita samo `getCachedCredentialHealthSummary()`; pozadinske provjere
osvježavaju predmemoriju izvan petlje događaja.

| Sloj                         | Gdje                                                                  | Šta znači                                                                                                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mjerač predmemorije provjera | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Posljednji rezultati provjere stanja vjerodajnica koji se još uvijek čuvaju u memoriji procesa. `source` je uvijek `probe-cache`.                                                                                           |
| Detalji neuspjele veze       | `credentialHealth.failedConnections`                                  | Prisutno **samo kada je `failed > 0`**. Ograničena lista redova predmemorije sa `status=error` (`connectionId`, `status`, sanitizirani `lastError` / `lastErrorType`). `failedOmitted` se postavlja kada je lista skraćena. |
| SQLite ljepljivi status      | `credentialHealth.staleDbNonOkCount`                                  | Broj redova **aktivnih** (`is_active=1`) veza čiji je pohranjeni `test_status` poznata vrijednost koja nije ispravna (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                     |

Ova dva sloja se namjerno mogu razlikovati:

- Mjerač `failed=0` dok je `staleDbNonOkCount>0` — SQLite i dalje sadrži ljepljivi
  `test_status` (na primjer `expired` ili `credits_exhausted`) koji najnoviji
  snimak predmemorije provjera ne računa kao `status=error`.
- Mjerač `failed>0` dok SQLite izgleda ispravno — nedavna provjera nije uspjela i
  predmemorirana je; red u DB-u nije ažuriran ili je kasnije očišćen.

Nemojte pokretati upozorenje isključivo na osnovu `provider_connections.test_status` prilikom preuzimanja podataka s ove
krajnje tačke. Koristite `failed` + `failedConnections` za trenutne neuspjehe provjera, a
`staleDbNonOkCount` kada vam je potreban broj pohranjenih ljepljivih statusa.

### Preporuke za Kubernetes provjere

OmniRoute je **jedan Node proces** (jedna petlja događaja). Standardni Docker `HEALTHCHECK` cilja laganu rutu `/healthz`. `/api/monitoring/health` je **previše zahtjevan** za kubelet intervale provjere dostupnosti.

| Sonda                        | Preporučeni cilj                                                                | Napomene                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pokretanje**               | HTTP `GET /healthz` s dugim `failureThreshold` (ili velikim `startPeriod`)      | Hladno pokretanje + SQLite migracija mogu trajati duže od nekoliko sekundi                                                                                                                                                                                                                                                                                                                  |
| **Spremnost**                | HTTP `GET /healthz`                                                             | Stanje životnog ciklusa `ok` / `starting` / `stopping` (200 naspram 503). I dalje oscilira ako je petlja blokirana CPU-om. **Odgovor 200 nakon više sekundi nije znak ispravnog stanja** (#10303) — to znači da je petlja događaja bila uskraćena za resurse prije nego što se izvršio rukovalac od 3 bajta                                                                                 |
| **Aktivnost**                | HTTP `GET /livez`, **ili TCP** na glavnom portu usluge (`PORT`, zadano `20128`) | `/livez` provjerava samo je li proces aktivan (uvijek 200 ako se rukovalac izvrši). I dalje dijeli petlju događaja — zauzet ≠ mrtav, a izgladnjivanje petlje događaja (#10303) ne otkriva ništa bolje od TCP-a. Dajte prednost **TCP-u** ako HTTP sonde isteknu pod opterećenjem kataloga/kompresije; ni u jednom slučaju **nemojte** zaustavljati pod zbog kratkih zastoja petlje događaja |
| **Detaljna provjera stanja** | `GET /api/monitoring/health` iz vanjskog alata za provjeru                      | Nije namijenjeno za kubelet `livenessProbe` / strogi `readinessProbe`                                                                                                                                                                                                                                                                                                                       |

Primjer strukture (prilagodite pragove svom hladnom pokretanju i opterećenju kompresije):

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
  # Tokom zastoja petlje događaja HTTP /livez i dalje može isteći. TCP je
  # konzervativna alternativa:
  # tcpSocket:
  #   port: http
```

**Nemojte** usmjeravati kubelet provjeru **aktivnosti** na `/api/monitoring/health`. Ta putanja obavlja stvarni rad s bazom podataka/nadzorom i pod opterećenjem će davati lažno pozitivne rezultate.

Povezano: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sonde dok je petlja događaja zauzeta), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (određivanje cijena kataloga zauzima resurse), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (brojanje tokena za kompresiju zauzima resurse).

### systemd watchdog (zamrznuta petlja događaja)

Na systemd hostu OmniRoute obavještava upravitelja usluge kada je spreman i nastavlja mu slati signale, tako da se server čija je petlja događaja zaglavljena zaustavi i ponovo pokrene umjesto da ostane pokrenut i bez odgovora. Signali dolaze iz vlastite petlje događaja servera: kada se ona blokira, signali prestaju, a systemd ponovo pokreće uslugu kada `WatchdogSec` istekne bez ijednog signala.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) već zapisuje korisničku jedinicu s ovom postavkom. Jedinica koju sami napišete (zadano `Type=simple`) nema watchdog, pa dodajte ove redove u njen odjeljak `[Service]`:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Generisana jedinica postavlja `Restart=on-failure`, pa dodajte i taj red — bez njega watchdog samo zaustavlja zaglavljenu uslugu umjesto da je ponovo pokrene.

- `Type=notify`: usluga se smatra „pokrenutom“ kada server pošalje `READY=1`, a ne kada se proces račva. `TimeoutStartSec` ograničava sporo pokretanje.
- `NotifyAccess=all`: signale šalje serverski proces, koji je podređeni proces nadzornika `omniroute serve`.
- `WatchdogSec`: signali se šalju svakih 60 sekundi, zato koristite **120 ili više**. Manje vrijednosti bi ponovo pokrenule ispravan server.
- Pokrenite `omniroute serve` u prvom planu. `--daemon` odvaja server od cgroup grupe jedinice i rukovanje obavijestima se nikada ne završava.

Nakon ponovnog pokretanja provjerite je li aktivan:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` prikazuje konfigurirano kašnjenje, a `WatchdogTimestamp` se pomjera unaprijed svake minute. Ponovno pokretanje koje uzrokuje watchdog bilježi se kao `Result=watchdog`. Da biste isključili signale uz zadržavanje jedinice u postojećem stanju, postavite `OMNIROUTE_DISABLE_SD_NOTIFY=1`; bez `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) ništa se ne šalje.

Watchdog provjerava samo nastavlja li se petlja događaja izvršavati. Server koji je spor, ali se i dalje izvršava, neće biti ponovo pokrenut.

### Opcionalni rad na putanji zahtjeva (memorija, vještine, osvježavanje tokena)

Ekstrakcija memorije, ubrizgavanje vještina i osvježavanje OAuth tokena dijele **glavnu Node petlju događaja** sa `/healthz`. To su funkcije koje se uključuju i isključuju putem kontrolne ploče (`memoryEnabled`, `skillsEnabled`), a ne skup radnih procesa. Pogledajte [Okruženje — opterećenje petlje događaja](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Stanje pružatelja usluga

> **Nema REST krajnje tačke.** Podaci o stanju pružatelja usluga dostupni su putem MCP alata `observability_snapshot` ili stranice kontrolne ploče `/dashboard/providers`.

### Detalji pružatelja usluga

> **Nema REST krajnje tačke.** Detalji za pojedinačne pružatelje usluga dostupni su putem stranice kontrolne ploče `/dashboard/providers`.

---

## Provider Health Autopilot

Modul `providerHealthAutopilot.ts` je **sistem za samopopravljanje** koji:

1. Detektuje probleme provajdera (otvoren strujni krug, hlađenje, zaključavanja, upozorenja o kvotama)
2. Generiše **preporučene radnje** za njihovo rješavanje
3. Opciono **automatski izvršava** radnje niskog rizika

### Detektovani tipovi problema

| Vrsta problema               | Ozbiljnost | Primjer uslova                                        |
| ---------------------------- | ---------- | ----------------------------------------------------- |
| `provider_circuit_open`      | kritično   | Prekidač strujnog kruga otvoren nakon 5 neuspjeha     |
| `provider_circuit_half_open` | upozorenje | Testiranje oporavka strujnog kruga                    |
| `connection_cooldown`        | upozorenje | Konekcija u stanju hlađenja nakon 429                 |
| `stale_connection_error`     | upozorenje | Posljednje osvježavanje nije uspjelo prije 30+ minuta |
| `terminal_connection_error`  | kritično   | OAuth opozvan, ključ nevažeći                         |
| `inactive_connection`        | info       | Konekcija onemogućena u postavkama                    |
| `model_lockout`              | upozorenje | Specifičan model u karantinu                          |
| `quota_monitor_warning`      | upozorenje | Kvota na 80%+ iskorištenosti                          |

### Generisani tipovi radnji

| Radnja                         | Rizik   | Opis                                         |
| ------------------------------ | ------- | -------------------------------------------- |
| `clear_provider_breaker`       | srednji | Resetuj prekidač strujnog kruga na zatvoreno |
| `clear_connection_cooldown`    | nizak   | Ukloni hlađenje sa konekcije                 |
| `clear_stale_connection_error` | nizak   | Očisti zastarjelu oznaku greške              |
| `clear_model_lockout`          | nizak   | Ponovo omogući model u karantinu             |
| `reactivate_connection`        | srednji | Ponovo omogući deaktiviranu konekciju        |
| `deactivate_connection`        | visok   | Onemogući problematičnu konekciju            |

### API

> **Nema REST krajnje tačke.** Problemi autopilota su dostupni putem MCP alata `observability_snapshot` ili kontrolne table. Autopilot radi interno; njegovo ponašanje se konfiguriše putem baze podataka postavki (polje `autopilotMode` po konekciji), a ne putem varijabli okruženja — `grep -rn` za env var autopilota ne vraća rezultate.

### Režim autopilota

Autopilot podrazumijevano radi u **ručnom režimu** — detektuje probleme i generiše preporučene radnje, ali ih ne primjenjuje automatski. Radnje se mogu primijeniti putem kontrolne table.

---

## Combo Health Autopilot

`comboHealthAutopilot.ts` je **combo-specifičan** ekvivalent autopilota provajdera. On:

- Detektuje nezdrave combo-e
- Preporučuje promjenu redoslijeda ciljeva
- Sugeriše onemogućavanje neispravnih ciljeva
- Automatski uklanja mrtve ciljeve nakon N neuspjeha

### Primjeri combo problema

```
Combo "always-on" (strategija prioriteta)
├─ Target 1: openai/gpt-5 (zdrav)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model zaključan do 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (zdrav)

Preporučena radnja: Promijeni redoslijed — pomjeri kiro iznad anthropic dok zaključavanje ne istekne
```

---

## Monitori kvota

`observability.ts` izlaže **monitore kvota po sesiji** za pružatelje pretplate (Claude Code, Codex, GitHub Copilot):

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

| Status      | Kada                       | UI radnja                                       |
| ----------- | -------------------------- | ----------------------------------------------- |
| `starting`  | Početno ispitivanje u toku | Spinner                                         |
| `idle`      | Nema nedavnih aktivnosti   | Sakriveno sa kontrolne ploče                    |
| `healthy`   | Kvota > 50% preostalo      | Zelena tačka                                    |
| `warning`   | Kvota < 50% preostalo      | Žuto upozorenje                                 |
| `exhausted` | Kvota = 0%                 | Crveni blok, preusmjeri na sljedećeg pružatelja |
| `error`     | Ispitivanje nije uspjelo   | Crvena tačka, pokušaj uskoro ponovo             |

### API

> **Nema REST krajnje tačke.** Podaci monitora kvota dostupni su putem MCP alata `observability_snapshot` ili kontrolne ploče.

---

## Snimak opservabilnosti

MCP alat `observability_snapshot` vraća **kompletan sistemski snimak** za AI agente:

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
  "quotaMonitors": {/* vidi iznad */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenti ovo koriste za donošenje **odluka o usmjeravanju** — na primjer, "ako je openai circuit otvoren, prvo usmjeri na anthropic".

---

## Provjera zdravlja tokena

OAuth pružatelji (Claude Code, GitHub Copilot, Cursor) trebaju **periodično osvježavanje tokena**. `src/lib/tokenHealthCheck.ts` pokreće pozadinski planer:

- **Otkucaj pretrage (Sweep tick)**: svakih 60 sekundi (pretraga u `TICK_MS = 60 * 1000` na `src/lib/tokenHealthCheck.ts:30`)
- **Interval provjere zdravlja po konekciji**: zadano 60 minuta (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); podesivo putem baze podataka postavki
- **Preventivno osvježavanje na 401**: obrađuje presretač (interceptor) po konekciji

### Status zdravlja tokena

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

Konfiguracija provjere zdravlja tokena se interno obrađuje putem `tokenHealthCheck.ts`.

### Zdravlje tokena

> **Nema REST krajnje tačke.** Podaci o zdravlju tokena dostupni su putem kontrolne ploče ili MCP alata `observability_snapshot`.

---

## Upozorenja

### Ugrađeni kanali

OmniRoute podržava **3 kanala za upozorenja**:

| Kanal                     | Podešavanje     | Slučaj upotrebe                |
| ------------------------- | --------------- | ------------------------------ |
| Baner na kontrolnoj tabli | Uvijek uključen | Obavještenja unutar aplikacije |
| Webhook                   | Konfiguriši URL | Slack, Discord, PagerDuty      |
| Zapis (Log)               | Zadano          | Za eksternu agregaciju zapisa  |

### Konfiguracija Webhook-a

> **Napomena:** Konfiguracija Webhook upozorenja se vrši putem stranice Postavke (Settings) na kontrolnoj tabli. Pogledajte korisnički interfejs Postavki za webhook URL, filtriranje događaja i prilagođavanje payload-a.

### Tipovi upozorenja

| Upozorenje                   | Kada                                | Zadana ozbiljnost |
| ---------------------------- | ----------------------------------- | ----------------- |
| `provider_circuit_open`      | Krug se otvara                      | kritično          |
| `provider_circuit_half_open` | Krug testira oporavak               | info              |
| `quota_warning`              | Kvote na 80%+                       | upozorenje        |
| `quota_exhausted`            | Kvote na 100%                       | kritično          |
| `token_refresh_failed`       | 3+ uzastopna neuspjela osvježavanja | upozorenje        |
| `token_expired`              | Token istekao                       | kritično          |
| `combo_target_unhealthy`     | Combo cilj u hlađenju 1h+           | upozorenje        |
| `db_integrity_warning`       | FK kršenja > 0                      | upozorenje        |
| `heap_pressure`              | Korištenje heap-a > 80% praga       | upozorenje        |

---

## Metrike performansi

### Praćene metrike

| Metrika                 | Tip       | Izvor                           |
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

### Percentili latencije (p50/p95/p99)

> **Nema REST krajnje tačke.** Podaci o percentilima latencije su dostupni putem stranice `/dashboard/health` na kontrolnoj tabli. Izvoz za Prometheus/OpenTelemetry je planiran za v3.9.

### Prometheus / OpenTelemetry izvoz (Faza 2)

Planirano za v3.9: izvorni izvoz u Prometheus, OpenTelemetry, Datadog.

Za sada, skenirajte (scrape) `/api/monitoring/health` pomoću bilo kojeg sistema za nadzor zasnovanog na HTTP-u (Prometheus blackbox exporter, Datadog HTTP check, itd.).

---

## Recepti za obavještavanje

### Slack

> **Napomena:** Upozorenja putem webhooka se konfigurišu kroz stranicu Settings na kontrolnoj tabli — ne postoje namjenski env vars za webhook (`grep -rn` vraća nula rezultata). Pogledajte Settings UI za webhook URL, filtriranje događaja i prilagođavanje payload-a.

### Discord

> Upozorenja putem webhooka koriste isti Settings UI tok kao i Slack. Discord prihvata isti oblik JSON payload-a.

### PagerDuty

> Upozorenja putem webhooka koriste isti Settings UI tok. PagerDuty Events API v2 routing ključevi se konfigurišu u Settings UI.

### Prilagođeni Webhook (JSON)

> Bilo koja HTTP krajnja tačka (endpoint) koja prihvata POST sa JSON tijelom će raditi. Konfigurišite URL u Settings UI.

---

## Konfiguracija kontrolne table

### Prilagođavanje kontrolne table zdravlja

Kreirajte `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Zakačite provajdera na vrh

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Rješavanje problema

### "Provajder kaže da je zdrav, ali zahtjevi ne uspijevaju"

1. Provjerite **autopilot probleme** — možda je model zaključan
2. Pogledajte **nedavne greške** za određenu klasu greške
3. Isprobajte **test konekcije** na kartici provajdera
4. Provjerite da li je provajder **ograničen brzinom (rate-limited) na uzvodnom nivou** (nije vidljivo lokalno)

### "Kvota kaže da je zdrava, ali vidim 429 greške"

- 429 znači da provajder kaže da ste iskoristili svoju kvotu
- OmniRoute praćenje kvota može biti **zastarjelo** — istina provajdera je uzvodno
- Podaci o kvotama se automatski osvježavaju putem internog monitora kvota

### "Combo ne uspijeva, ali svi ciljevi izgledaju zdravi"

- Provjerite kontrolnu tablu **combo zdravlja** za probleme sa redoslijedom ciljeva
- Pogledajte **fallback događaje** — možda se combo prebrzo iscrpljuje
- Provjerite da li **strategija** odgovara vašem slučaju upotrebe (prioritet vs round-robin vs auto)

### "Provjera zdravlja baze podataka ne uspijeva"

- Pokrenite `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ako je "ok" — lažni alarm, provjera zdravlja je previše stroga
- Ako je bilo šta drugo — **zaustavite OmniRoute** i pratite [vodič za oporavak od katastrofe](./DATABASE_GUIDE.md#disaster-recovery)

### "Pritisak na memorijski heap je kritičan"

```bash
# Provjerite trenutni heap
node -e "console.log(process.memoryUsage())"

# Pokrenite ručni GC (ako je --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Smanjite istovremene zahtjeve (podesite putem stranice Settings na kontrolnoj tabli, a ne env var-om)
# Ne postoji `MAX_CONCURRENT_REQUESTS` env var — konfigurišite ga u Settings → Concurrency.
```

---

## Vidi također

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — praćenje upotrebe i troškova
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB šema + zdravlje
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — zdravlje proxy-ja (zaseban keš)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sistemska arhitektura
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detalji o circuit breaker-u
- Izvor: `src/lib/monitoring/` (4 datoteke, 2121 LOC)
