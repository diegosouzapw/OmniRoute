# Monitoring & Observability Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: Az OmniRoute beépített állapotfigyelést, szolgáltatói autopilotot, kvótakövetést és megfigyelhetőségi hookokat tartalmaz. Ez az útmutató az irányítópultot, a riasztásokat és a hibaelhárítást ismerteti.

**Források:**

- `src/lib/monitoring/observability.ts` — megfigyelhetőségi pillanatkép
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinációállapot-autopilot
- `src/lib/monitoring/providerHealthAutopilot.ts` — szolgáltatói autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — szolgáltatói állapotmátrix
- `src/lib/localHealthCheck.ts` — helyi állapot-ellenőrzés
- `src/lib/tokenHealthCheck.ts` — tokenfrissítés állapota
- `src/lib/proxyHealth.ts` — proxyállapot-gyorsítótár (a PROXY_GUIDE.md ismerteti)

---

## Áttekintés

Az OmniRoute **3 megfigyelési réteggel** rendelkezik:

```
┌──────────────────────────────────────────────────────────────┐
│  1. réteg: Rendszerállapot (szerverszintű)                    │
│  ├─ localHealthCheck.ts — adatbázis, portok, natív függőségek │
│  ├─ db/healthCheck.ts — integritás, FK-k, árva összetevők      │
│  └─ Irányítópult: /dashboard/health                           │
├──────────────────────────────────────────────────────────────┤
│  2. réteg: Szolgáltatói állapot (szolgáltatónkénti ellenállás)│
│  ├─ providerHealthAutopilot.ts — áramkör-megszakító, várakozások│
│  ├─ providerHealthMatrix.ts — állapotpontszámok szolgáltató/modell szerint│
│  └─ Irányítópult: /dashboard/providers                        │
├──────────────────────────────────────────────────────────────┤
│  3. réteg: Élő megfigyelhetőség (futásidejű pillanatképek)    │
│  ├─ observability.ts — áramkör-megszakítók, munkamenetek, kvóta│
│  ├─ tokenHealthCheck.ts — OAuth-tokenfrissítés állapota       │
│  └─ MCP-eszközök: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Irányítópult-oldalak

### `/dashboard/health` (Rendszerállapot)

A legfelső szintű állapot-irányítópult a következőket jeleníti meg:

| Szakasz                    | Mit jelenít meg                                                         |
| -------------------------- | ----------------------------------------------------------------------- |
| **Szerver állapota**       | Üzemidő, verzió, port, aktív kapcsolatok                                |
| **Adatbázis**              | Kapcsolat, integritás, WAL-méret, legutóbbi migrációk                   |
| **Szolgáltatói összesítő** | Aktívak száma, kifogástalan állapotúak száma, nyitott megszakítók száma |
| **Kvótafigyelők**          | Aktív munkamenetek, riasztási állapot, kimerített kvóták                |
| **Legutóbbi hibák**        | Az utolsó 10 hiba veremkövetéssel                                       |
| **Erőforrás-használat**    | Memória, CPU, halomterhelés-jelző                                       |

### `/dashboard/providers` (Szolgáltatói állapot)

Szolgáltatónkénti irányítópult:

| Oszlop      | Leírás                                                    |
| ----------- | --------------------------------------------------------- |
| Szolgáltató | Szolgáltatói azonosító + megjelenítési név                |
| Állapot     | Zöld/sárga/piros állapot                                  |
| Áramkör     | Nyitott/zárt/félig nyitott állapot                        |
| Kapcsolatok | Kapcsolatok száma, legutóbbi frissítés                    |
| Modellek    | Elérhető modellek, modellenkénti állapot                  |
| Költség     | Mai költség, 7 napos trend                                |
| Hibák       | Az elmúlt 24 óra hibáinak száma, leggyakoribb hibaosztály |

Kattintson egy szolgáltatóra a következők megtekintéséhez:

- Legutóbbi kérések késleltetési bontással
- Kapcsolatonkénti állapotpontszámok
- Modellenkénti kizárások
- Autopilot-ajánlások

### `/dashboard/quota` (Kvótakövetés)

Minden API-kulcs esetén:

- Aktuális használat a korláthoz viszonyítva (folyamatjelző sáv)
- Kvótatrend (30 napos diagram)
- Következő visszaállítás időpontja
- Riasztási előzmények

### `/dashboard/combos` (Kombinációk állapota)

Kombinációnként:

- Stratégia + célok
- Célonkénti állapot
- Legutóbbi tartalékra váltási események
- Sikerességi arány (24 óra, 7 nap, 30 nap)

---

## Állapot-ellenőrzési API

Az OmniRoute **két** HTTP-s állapotfelületet biztosít. Ezek nem használhatók felcserélhetően az orkesztrátorok számára.

| Útvonal                      | Cél                                                                          | Terhelés                               | Használat                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /healthz`               | Életciklus-alapú életjel/készenlét (`ok` / `starting` / `stopping`)          | Elhanyagolható (csak fázisjelző)       | Kubernetes **readiness**; enyhe **liveness**, ha mindenképpen HTTP-t kell használni |
| `GET /api/monitoring/health` | Részletes rendszer- és szolgáltatói összegzés (DB, heap, katalógusszámok, …) | Nagy (szinkron DB-/monitorozási munka) | Irányítópultok, mély blackbox-ellenőrzések, a Docker beépített állapot-ellenőrzése  |

> **Megjegyzés:** A szolgáltatói állapotmátrixok, az autopilot problémái, a kvótafigyelők, a tokenek állapota és a `/api/monitoring/health` által biztosítottnál részletesebb késleltetési adatok az **MCP-eszközön** (`observability_snapshot`) vagy az **irányítópult** oldalain keresztül érhetők el — ezekhez nem tartoznak külön REST-útvonalak.

Mindkét útvonal ugyanazon a **Node-eseményhurkon** fut, mint a kérések kezelése. Egy CPU-igényes végrehajtási útvonal (nagy `GET /v1/models` katalógus feldolgozása, hosszú kontextus tömörítése / tokenszámlálás) **minden** HTTP-kezelőt késleltethet, beleértve a `/healthz` útvonalat is. A foglalt eseményhurok ≠ leállt folyamat. Elsősorban a terhelést okozó részt javítsa; a próbák hangolása csak a téves leállítások számát csökkenti.

### Könnyűsúlyú orkesztrátorpróba

```bash
GET /healthz
# vagy HEAD /healthz
```

- **200** + `ok` törzs, amikor a kiszolgáló életciklusfázisa készen áll
- **503** + `starting` / `stopping` rendszerindítás vagy leállítás közben
- Megvalósítás: `src/app/healthz/route.ts` (nincs DB-ping)

### Rendszerállapot (részletes)

```bash
GET /api/monitoring/health
```

Válasz:

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

#### `credentialHealth`: próbagyorsítótár kontra SQLite `test_status`

A `GET /api/monitoring/health` → `credentialHealth` a **memóriában tárolt próbagyorsítótár
mérőszáma**, nem pedig a `provider_connections.test_status` élő adattartalma. A #12532 után a
kérésfeldolgozási útvonal kizárólag a `getCachedCredentialHealthSummary()` eredményét olvassa; a háttérpróbák
az eseményhurkon kívül frissítik a gyorsítótárat.

| Réteg                          | Hely                                                                  | Jelentés                                                                                                                                                                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Próbagyorsítótár mérőszáma     | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | A hitelesítő adatok állapotát vizsgáló, még a folyamat memóriájában tárolt legutóbbi próbaeredmények. A `source` értéke mindig `probe-cache`.                                                                                                                       |
| Sikertelen kapcsolat részletei | `credentialHealth.failedConnections`                                  | **Csak akkor szerepel, ha `failed > 0`**. A `status=error` állapotú gyorsítótár-sorok korlátozott méretű listája (`connectionId`, `status`, megtisztított `lastError` / `lastErrorType`). A `failedOmitted` akkor van beállítva, ha a lista méretkorlátba ütközött. |
| SQLite-ban megőrzött állapot   | `credentialHealth.staleDbNonOkCount`                                  | Azon **aktív** (`is_active=1`) kapcsolatsorok száma, amelyek megőrzött `test_status` értéke ismert nem megfelelő állapot (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                                         |

A két réteg szándékosan eltérhet:

- A mérőszámban `failed=0`, miközben `staleDbNonOkCount>0` — az SQLite még mindig megőriz egy
  `test_status` értéket (például `expired` vagy `credits_exhausted`), amelyet a legutóbbi
  próbagyorsítótár-pillanatkép nem számít `status=error` állapotnak.
- A mérőszámban `failed>0`, miközben az SQLite egészségesnek tűnik — egy közelmúltbeli próba sikertelen volt, és
  gyorsítótárazva lett; a DB-sor még nem frissült, vagy később törölték az állapotát.

A végpont lekérdezésekor ne állítson be riasztást kizárólag a `provider_connections.test_status` alapján.
Az élő próbahibákhoz használja a `failed` + `failedConnections` értékeket, a megőrzött állapotok
számához pedig a `staleDbNonOkCount` értéket.

### Kubernetes-próbákra vonatkozó javaslatok

Az OmniRoute **egyetlen Node-folyamat** (egy eseményhurokkal). Az alapértelmezett Docker `HEALTHCHECK` a könnyűsúlyú `/healthz` útvonalat célozza. A `/api/monitoring/health` **túl nagy terhelésű** a kubelet életjel-ellenőrzési időközeihez.

| Próba                            | Ajánlott cél                                                                                       | Megjegyzések                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Indítás**                      | HTTP `GET /healthz` hosszú `failureThreshold` értékkel (vagy nagy `startPeriod`)                   | A hidegindítás és az SQLite-migráció néhány másodpercnél tovább tarthat                                                                                                                                                                                                                                                                                                                                                   |
| **Készenlét**                    | HTTP `GET /healthz`                                                                                | Életciklus: `ok` / `starting` / `stopping` (200 vagy 503). Továbbra is ingadozik, ha a ciklust a CPU blokkolja. A **több másodperc után érkező 200-as válasz nem egészséges állapot** (#10303) — azt jelenti, hogy az eseményhurok nem jutott erőforráshoz, mielőtt a 3 bájtos kezelő lefutott volna                                                                                                                      |
| **Életképesség**                 | HTTP `GET /livez`, **vagy TCP** a fő szolgáltatási porton (`PORT`, alapértelmezés szerint `20128`) | A `/livez` csak azt jelzi, hogy a folyamat él (mindig 200, ha a kezelő lefut). Ez is ugyanazt az eseményhurkot használja — a foglalt ≠ halott, és az eseményhurok erőforráshiányát (#10303) sem észleli jobban, mint a TCP. Részesítse előnyben a **TCP**-t, ha a HTTP-próbák időtúllépéssel leállnak katalógus- vagy tömörítési terhelés alatt; egyik esetben se állítsa le a podot az eseményhurok rövid akadásai miatt |
| **Mélyreható állapotellenőrzés** | `GET /api/monitoring/health` külső ellenőrzőből                                                    | Nem a kubelet `livenessProbe` vagy szigorú `readinessProbe` próbáihoz való                                                                                                                                                                                                                                                                                                                                                |

Példastruktúra (igazítsa a küszöbértékeket a hidegindítási és tömörítési terheléshez):

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
  # Az eseményhurok akadása esetén a HTTP /livez továbbra is időtúllépést okozhat. A TCP a
  # konzervatív alternatíva:
  # tcpSocket:
  #   port: http
```

**Ne** irányítsa a kubelet **életképességi** ellenőrzését az `/api/monitoring/health` útvonalra. Ez az útvonal tényleges adatbázis- és megfigyelési műveleteket végez, és terhelés alatt téves pozitív eredményt adhat.

Kapcsolódó: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (próbák, miközben az eseményhurok foglalt), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (a katalógusárazás erőforrás-igénye), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (a tömörítés tokenszámlálásának erőforrás-igénye).

### Opcionális műveletek a kérés feldolgozási útvonalán (memória, készségek, tokenfrissítés)

A memóriakinyerés, a készségek befecskendezése és az OAuth-tokenek frissítése ugyanazt a **fő Node eseményhurkot** használja, mint a `/healthz`. Ezek az irányítópulton átkapcsolható funkciók (`memoryEnabled`, `skillsEnabled`), nem pedig egy feldolgozói készlet. Lásd: [Környezet — az eseményhurok költsége](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Szolgáltatói állapot

> **Nincs REST-végpont.** A szolgáltatók állapotadatai az `observability_snapshot` MCP-eszközzel vagy az irányítópult `/dashboard/providers` oldalán érhetők el.

### Szolgáltatói részletek

> **Nincs REST-végpont.** Az egyes szolgáltatók részletes adatai az irányítópult `/dashboard/providers` oldalán érhetők el.

---

## Szolgáltató-állapot Autopilot

A `providerHealthAutopilot.ts` modul egy **öngyógyító rendszer**, amely:

1. Észleli a szolgáltatói problémákat (nyitott áramkör-megszakító, várakozási időszakok, kizárások, kvótafigyelmeztetések)
2. **Javasolt műveleteket** generál a megoldásukhoz
3. Opcionálisan **automatikusan végrehajtja** az alacsony kockázatú műveleteket

### Észlelt problématípusok

| Probléma típusa              | Súlyosság      | Példafeltétel                                       |
| ---------------------------- | -------------- | --------------------------------------------------- |
| `provider_circuit_open`      | kritikus       | Az áramkör-megszakító 5 hiba után kinyílt           |
| `provider_circuit_half_open` | figyelmeztetés | Az áramkör helyreállításának tesztelése             |
| `connection_cooldown`        | figyelmeztetés | A kapcsolat 429-es hiba után várakozik              |
| `stale_connection_error`     | figyelmeztetés | A legutóbbi frissítés több mint 30 perce sikertelen |
| `terminal_connection_error`  | kritikus       | Visszavont OAuth, érvénytelen kulcs                 |
| `inactive_connection`        | információ     | A kapcsolat le van tiltva a beállításokban          |
| `model_lockout`              | figyelmeztetés | Egy adott modell karanténban van                    |
| `quota_monitor_warning`      | figyelmeztetés | A kvótakihasználtság legalább 80%                   |

### Generált művelettípusok

| Művelet                        | Kockázat | Leírás                                               |
| ------------------------------ | -------- | ---------------------------------------------------- |
| `clear_provider_breaker`       | közepes  | Az áramkör-megszakító visszaállítása zárt állapotba  |
| `clear_connection_cooldown`    | alacsony | A várakozási időszak eltávolítása egy kapcsolatról   |
| `clear_stale_connection_error` | alacsony | Az elavult hibajelző törlése                         |
| `clear_model_lockout`          | alacsony | Egy karanténba helyezett modell újbóli engedélyezése |
| `reactivate_connection`        | közepes  | Egy deaktivált kapcsolat újbóli engedélyezése        |
| `deactivate_connection`        | magas    | Egy problémás kapcsolat letiltása                    |

### API

> **Nincs REST-végpont.** Az Autopilot problémái az `observability_snapshot` MCP-eszközön vagy az irányítópulton keresztül érhetők el. Az Autopilot belsőleg fut; a működése a beállítási adatbázison keresztül konfigurálható (kapcsolatonkénti `autopilotMode` mező), nem környezeti változókkal — az Autopilot mód környezeti változójára futtatott `grep -rn` nulla találatot ad vissza.

### Autopilot mód

Az Autopilot alapértelmezés szerint **kézi módban** működik — észleli a problémákat és javasolt műveleteket generál, de nem alkalmazza őket automatikusan. A műveletek az irányítópulton keresztül alkalmazhatók.

---

## Kombinációállapot-Autopilot

A `comboHealthAutopilot.ts` a szolgáltatói Autopilot **kombinációspecifikus** megfelelője. A következőket végzi:

- Észleli a nem megfelelő állapotú kombinációkat
- Javaslatot tesz a célok átrendezésére
- Javasolja a hibás célok letiltását
- N hiba után automatikusan eltávolítja a működésképtelen célokat

### Példák kombinációs problémákra

```
"always-on" kombináció (prioritási stratégia)
├─ 1. cél: openai/gpt-5 (megfelelő állapotú)
├─ 2. cél: anthropic/claude-opus-4-6 (⚠️ modellkizárás 14:00-ig)
└─ 3. cél: kiro/claude-sonnet-4-5 (megfelelő állapotú)

Javasolt művelet: Átrendezés — a kizárás lejártáig helyezze a kiro szolgáltatót az anthropic fölé
```

---

## Kvótafigyelők

Az `observability.ts` **munkamenetenkénti kvótafigyelőket** tesz elérhetővé az előfizetéses szolgáltatókhoz (Claude Code, Codex, GitHub Copilot):

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

### Az állapotok jelentése

| Állapot     | Mikor                                | Felhasználói felületi művelet                       |
| ----------- | ------------------------------------ | --------------------------------------------------- |
| `starting`  | A kezdeti lekérdezés folyamatban van | Folyamatjelző                                       |
| `idle`      | Nincs közelmúltbeli aktivitás        | Elrejtve az irányítópultról                         |
| `healthy`   | A kvóta több mint 50%-a megmaradt    | Zöld pont                                           |
| `warning`   | A kvóta kevesebb mint 50%-a maradt   | Sárga riasztás                                      |
| `exhausted` | Kvóta = 0%                           | Piros blokk, átirányítás a következő szolgáltatóhoz |
| `error`     | A lekérdezés sikertelen              | Piros pont, hamarosan újrapróbálkozás               |

### API

> **Nincs REST-végpont.** A kvótafigyelők adatai az `observability_snapshot` MCP-eszközön vagy az irányítópulton keresztül érhetők el.

---

## Megfigyelhetőségi pillanatkép

Az `observability_snapshot` MCP-eszköz **teljes rendszer-pillanatképet** ad vissza az AI-ügynökök számára:

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
  "quotaMonitors": {/* lásd fent */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Az ügynökök ezt **útválasztási döntésekhez** használják — például: „ha az openai áramköre nyitva van, először az anthropic felé irányíts”.

---

## Tokenállapot-ellenőrzés

Az OAuth-szolgáltatóknál (Claude Code, GitHub Copilot, Cursor) **rendszeres tokenfrissítésre** van szükség. A `src/lib/tokenHealthCheck.ts` egy háttérben futó ütemezőt működtet:

- **Ellenőrzési ciklus**: 60 másodpercenként (a ciklus értéke `TICK_MS = 60 * 1000` a `src/lib/tokenHealthCheck.ts:30` helyen)
- **Kapcsolatonkénti állapot-ellenőrzési időköz**: alapértelmezés szerint 60 perc (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); a beállítási adatbázison keresztül konfigurálható
- **Megelőző frissítés 401-es válasz esetén**: a kapcsolatonkénti interceptor kezeli

### Tokenállapot

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

### Konfiguráció

A tokenállapot-ellenőrzés konfigurációját a `tokenHealthCheck.ts` belsőleg kezeli.

### Tokenállapot

> **Nincs REST-végpont.** A tokenállapot adatai az irányítópulton vagy az `observability_snapshot` MCP-eszközön keresztül érhetők el.

---

## Riasztások

### Beépített csatornák

Az OmniRoute **3 riasztási csatornát** támogat:

| Csatorna              | Beállítás         | Felhasználási terület           |
| --------------------- | ----------------- | ------------------------------- |
| Irányítópult szalagja | Mindig aktív      | Alkalmazáson belüli értesítések |
| Webhook               | URL konfigurálása | Slack, Discord, PagerDuty       |
| Napló                 | Alapértelmezett   | Külső napló-aggregációhoz       |

### Webhook konfigurációja

> **Megjegyzés:** A webhook-riasztások konfigurációja az irányítópult Beállítások oldalán kezelhető. A webhook URL-jével, az eseményszűréssel és az adatcsomag testreszabásával kapcsolatban tekintse meg a Beállítások felhasználói felületét.

### Riasztástípusok

| Riasztás                     | Mikor                                                      | Alapértelmezett súlyosság |
| ---------------------------- | ---------------------------------------------------------- | ------------------------- |
| `provider_circuit_open`      | Az áramkör megnyílik                                       | kritikus                  |
| `provider_circuit_half_open` | Az áramkör teszteli a helyreállást                         | információ                |
| `quota_warning`              | A kvóta eléri vagy meghaladja a 80%-ot                     | figyelmeztetés            |
| `quota_exhausted`            | A kvóta eléri a 100%-ot                                    | kritikus                  |
| `token_refresh_failed`       | Legalább 3 egymást követő sikertelen frissítés             | figyelmeztetés            |
| `token_expired`              | A token lejárt                                             | kritikus                  |
| `combo_target_unhealthy`     | A kombinált cél legalább 1 órája várakozási állapotban van | figyelmeztetés            |
| `db_integrity_warning`       | Az idegenkulcs-sértések száma > 0                          | figyelmeztetés            |
| `heap_pressure`              | A halomhasználat meghaladja a küszöbérték 80%-át           | figyelmeztetés            |

---

## Teljesítménymutatók

### Nyomon követett mutatók

| Mutató                  | Típus      | Forrás                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | számláló   | `services/usage.ts`             |
| `request_latency_ms`    | hisztogram | `services/usage.ts`             |
| `tokens_consumed`       | számláló   | `services/usage.ts`             |
| `cost_usd`              | számláló   | `services/usage.ts`             |
| `provider_errors`       | számláló   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | számláló   | `services/resilience.ts`        |
| `cache_hits`            | számláló   | `services/signatureCache.ts`    |
| `compression_savings`   | hisztogram | `services/compression/stats.ts` |
| `quota_used`            | mérő       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | mérő       | `observability.ts`              |

### Késleltetési percentilisek (p50/p95/p99)

> **Nincs REST-végpont.** A késleltetési percentilisek adatai az irányítópult `/dashboard/health` oldalán érhetők el. A Prometheus-/OpenTelemetry-export a v3.9 verzióra van tervezve.

### Prometheus-/OpenTelemetry-export (2. fázis)

A v3.9 verzióra tervezve: natív export Prometheus, OpenTelemetry és Datadog rendszerekbe.

Addig is kérdezze le az `/api/monitoring/health` végpontot bármilyen HTTP-alapú monitorozórendszerrel (Prometheus blackbox exporter, Datadog HTTP-ellenőrzés stb.).

---

## Riasztási receptek

### Slack

> **Megjegyzés:** A webhook-riasztások az irányítópult Beállítások oldalán konfigurálhatók — nincsenek dedikált webhook-környezeti változók (a `grep -rn` nulla találatot ad vissza). A webhook URL-jét, az eseményszűrést és az adatcsomag testreszabását a Beállítások felhasználói felületén találja.

### Discord

> A webhook-riasztások ugyanazon a Beállítások felhasználói felületén konfigurálhatók, mint a Slack esetében. A Discord ugyanazt a JSON-adatcsomag-formátumot fogadja el.

### PagerDuty

> A webhook-riasztások ugyanazon a Beállítások felhasználói felületén konfigurálhatók. A PagerDuty Events API v2 útválasztási kulcsai a Beállítások felhasználói felületén állíthatók be.

### Egyéni webhook (JSON)

> Bármely olyan HTTP-végpont használható, amely JSON-törzzsel rendelkező POST-kéréseket fogad. Az URL-t a Beállítások felhasználói felületén konfigurálja.

---

## Az irányítópult konfigurálása

### Az állapot-irányítópult testreszabása

Hozzon létre egy `~/.omniroute/dashboard.json` fájlt:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Szolgáltató rögzítése felülre

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Hibaelhárítás

### „A szolgáltató szerint minden rendben van, de a kérések sikertelenek”

1. Ellenőrizze az **autopilot problémáit** — lehetséges, hogy egy modell zárolva van
2. Tekintse meg a **legutóbbi hibákat** az adott hibaosztályhoz
3. Próbálja ki a **kapcsolati tesztet** a szolgáltatói kártyán
4. Ellenőrizze, hogy a szolgáltató **nem korlátozza-e a kérések gyakoriságát a felsőbb szinten** (helyileg nem látható)

### „A kvóta állapota megfelelő, de 429-es hibákat látok”

- A 429 azt jelenti, hogy a szolgáltató szerint felhasználta a kvótáját
- Az OmniRoute kvótakövetése **elavult** lehet — a szolgáltató felsőbb szintű adatai az irányadók
- A kvótaadatokat a belső kvótafigyelő automatikusan frissíti

### „A kombináció sikertelen, de minden cél állapota megfelelőnek tűnik”

- Ellenőrizze a **kombináció állapotát** megjelenítő irányítópulton, hogy vannak-e problémák a célok sorrendjével
- Tekintse meg a **tartalékra váltási eseményeket** — lehetséges, hogy a kombináció túl gyorsan kimeríti a lehetőségeket
- Ellenőrizze, hogy a **stratégia** megfelel-e a használati esetének (prioritásos, ciklikus vagy automatikus)

### „Az adatbázis állapotellenőrzése sikertelen”

- Futtassa a következőt: `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ha az eredmény „ok” — téves riasztás, az állapotellenőrzés túl szigorú
- Ha bármi más — **állítsa le az OmniRoute-ot**, és kövesse a [vészhelyzeti helyreállítási útmutatót](./DATABASE_GUIDE.md#disaster-recovery)

### „A memóriahalom terhelése kritikus”

```bash
# Az aktuális halom ellenőrzése
node -e "console.log(process.memoryUsage())"

# Kézi GC indítása (ha --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# A párhuzamos kérések számának csökkentése (az irányítópult Beállítások oldalán állítható be, nem környezeti változóval)
# Nincs `MAX_CONCURRENT_REQUESTS` környezeti változó — a Beállítások → Párhuzamosság menüpontban konfigurálja.
```

---

## Lásd még

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — használat- és költségkövetés
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — adatbázisséma + állapot
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy állapota (külön gyorsítótár)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — rendszerarchitektúra
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — az áramkör-megszakító részletei
- Forrás: `src/lib/monitoring/` (4 fájl, 2121 kódsor)
