# Monitoring & Observability Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute sa dodáva so vstavaným monitorovaním stavu, autopilotom poskytovateľov, sledovaním kvót a rozhraniami observability. Táto príručka sa venuje ovládaciemu panelu, upozorneniam a riešeniu problémov.

**Zdroje:**

- `src/lib/monitoring/observability.ts` — snímka observability
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot stavu kombinácií
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot poskytovateľov
- `src/lib/monitoring/providerHealthMatrix.ts` — matica stavu poskytovateľov
- `src/lib/localHealthCheck.ts` — lokálna kontrola stavu
- `src/lib/tokenHealthCheck.ts` — stav obnovovania tokenov
- `src/lib/proxyHealth.ts` — vyrovnávacia pamäť stavu proxy (opísaná v PROXY_GUIDE.md)

---

## Prehľad

OmniRoute má **3 vrstvy monitorovania**:

```
┌──────────────────────────────────────────────────────────────┐
│  Vrstva 1: Stav systému (na úrovni servera)                   │
│  ├─ localHealthCheck.ts — DB, porty, natívne závislosti       │
│  ├─ db/healthCheck.ts — integrita, FK, osirelé artefakty      │
│  └─ Ovládací panel: /dashboard/health                         │
├──────────────────────────────────────────────────────────────┤
│  Vrstva 2: Stav poskytovateľov (odolnosť každého poskytovateľa)│
│  ├─ providerHealthAutopilot.ts — istič, intervaly čakania     │
│  ├─ providerHealthMatrix.ts — skóre stavu podľa poskytovateľa/modelu│
│  └─ Ovládací panel: /dashboard/providers                      │
├──────────────────────────────────────────────────────────────┤
│  Vrstva 3: Živá observabilita (snímky za behu)                │
│  ├─ observability.ts — ističe, relácie, kvóty                 │
│  ├─ tokenHealthCheck.ts — stav obnovovania tokenov OAuth      │
│  └─ Nástroje MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Stránky ovládacieho panela

### `/dashboard/health` (Stav systému)

Ovládací panel stavu najvyššej úrovne zobrazuje:

| Sekcia                   | Čo zobrazuje                                              |
| ------------------------ | --------------------------------------------------------- |
| **Stav servera**         | Doba prevádzky, verzia, port, aktívne pripojenia          |
| **Databáza**             | Pripojenie, integrita, veľkosť WAL, nedávne migrácie      |
| **Súhrn poskytovateľov** | Počet aktívnych, počet zdravých, počet otvorených ističov |
| **Monitory kvót**        | Aktívne relácie, upozornenia, vyčerpané kvóty             |
| **Nedávne chyby**        | Posledných 10 chýb so zásobníkmi volaní                   |
| **Využitie zdrojov**     | Pamäť, CPU, indikátor zaťaženia haldy                     |

### `/dashboard/providers` (Stav poskytovateľov)

Ovládací panel jednotlivých poskytovateľov:

| Stĺpec       | Opis                                              |
| ------------ | ------------------------------------------------- |
| Poskytovateľ | ID poskytovateľa + zobrazovaný názov              |
| Stav         | Zelený/žltý/červený stav                          |
| Istič        | Otvorený/zatvorený/polootvorený stav              |
| Pripojenia   | Počet pripojení, posledné obnovenie               |
| Modely       | Dostupné modely, stav jednotlivých modelov        |
| Náklady      | Dnešné náklady, 7-dňový trend                     |
| Chyby        | Počet chýb za posledných 24 h, hlavná trieda chýb |

Kliknutím na poskytovateľa zobrazíte:

- Nedávne požiadavky s rozpisom latencie
- Skóre stavu jednotlivých pripojení
- Blokovania jednotlivých modelov
- Odporúčania autopilota

### `/dashboard/quota` (Sledovanie kvót)

Pre každý kľúč API:

- Aktuálne využitie v porovnaní s limitom (indikátor priebehu)
- Trend kvóty (30-dňový graf)
- Čas ďalšieho obnovenia
- História upozornení

### `/dashboard/combos` (Stav kombinácií)

Pre každú kombináciu:

- Stratégia + ciele
- Stav jednotlivých cieľov
- Nedávne udalosti záložného prepnutia
- Miera úspešnosti (24 h, 7 d., 30 d.)

---

## API kontroly stavu

OmniRoute poskytuje **dve** HTTP rozhrania na kontrolu stavu. Pre orchestrátory nie sú vzájomne zameniteľné.

| Cesta                        | Účel                                                                    | Náročnosť                                    | Použitie                                                               |
| ---------------------------- | ----------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| `GET /healthz`               | Živosť/pripravenosť životného cyklu (`ok` / `starting` / `stopping`)    | Triviálna (iba príznak fázy)                 | Kubernetes **readiness**; mierna **liveness**, ak musíte použiť HTTP   |
| `GET /api/monitoring/health` | Hĺbkový súhrn systému a poskytovateľov (DB, halda, počty v katalógu, …) | Vysoká (synchrónna práca s DB/monitorovaním) | Dashboardy, hĺbkové blackbox kontroly, vstavaná kontrola stavu Dockeru |

> **Poznámka:** Matice stavu poskytovateľov, problémy autopilota, monitory kvót, stav tokenov a podrobnosti o latencii nad rámec `/api/monitoring/health` sú dostupné prostredníctvom **nástroja MCP** `observability_snapshot` alebo stránok **dashboardu** — neexistujú pre ne žiadne vyhradené REST trasy.

Obe trasy bežia v **rovnakej slučke udalostí Node** ako spracovanie požiadaviek. Cesta viazaná na CPU (veľké spracovanie katalógu `GET /v1/models`, kompresia dlhého kontextu/počítanie tokenov) môže oneskoriť **všetky** HTTP handlery vrátane `/healthz`. Zaneprázdnená slučka udalostí ≠ neaktívny proces. Uprednostnite odstránenie príčiny nadmerného zaťaženia; ladenie sond iba znižuje počet chybných ukončení.

### Odľahčená sonda orchestrátora

```bash
GET /healthz
# alebo HEAD /healthz
```

- **200** + telo `ok`, keď je fáza životného cyklu servera pripravená
- **503** + `starting` / `stopping` počas spúšťania alebo vypínania
- Implementácia: `src/app/healthz/route.ts` (bez kontroly DB)

### Stav systému (hĺbkový)

```bash
GET /api/monitoring/health
```

Odpoveď:

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

#### `credentialHealth`: vyrovnávacia pamäť sond vs. `test_status` v SQLite

`GET /api/monitoring/health` → `credentialHealth` je **ukazovateľ vyrovnávacej pamäte sond v pamäti**,
nie živý výpis `provider_connections.test_status`. Po #12532 cesta požiadavky
číta iba `getCachedCredentialHealthSummary()`; sondy na pozadí obnovujú vyrovnávaciu
pamäť mimo slučky udalostí.

| Vrstva                              | Kde                                                                   | Čo to znamená                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ukazovateľ vyrovnávacej pamäte sond | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Posledné výsledky sond stavu prihlasovacích údajov, ktoré sú stále uložené v pamäti procesu. `source` je vždy `probe-cache`.                                                                                                              |
| Podrobnosti zlyhaného pripojenia    | `credentialHealth.failedConnections`                                  | Prítomné **iba vtedy, keď `failed > 0`**. Ohraničený zoznam riadkov vyrovnávacej pamäte so `status=error` (`connectionId`, `status`, sanitizované `lastError` / `lastErrorType`). `failedOmitted` je nastavené, keď bol zoznam obmedzený. |
| Perzistentný stav SQLite            | `credentialHealth.staleDbNonOkCount`                                  | Počet **aktívnych** (`is_active=1`) riadkov pripojení, ktorých uložený `test_status` je známy stav odlišný od ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                       |

Tieto dve vrstvy sa môžu zámerne nezhodovať:

- Ukazovateľ `failed=0`, zatiaľ čo `staleDbNonOkCount>0` — SQLite stále obsahuje perzistentný
  `test_status` (napríklad `expired` alebo `credits_exhausted`), ktorý najnovšia
  snímka vyrovnávacej pamäte sond nepočíta ako `status=error`.
- Ukazovateľ `failed>0`, zatiaľ čo SQLite vyzerá zdravo — nedávna sonda zlyhala a jej výsledok je
  uložený vo vyrovnávacej pamäti; riadok DB nebol aktualizovaný alebo bol neskôr vymazaný.

Pri získavaní údajov z tohto koncového bodu neupozorňujte iba na základe
`provider_connections.test_status`. Pre aktuálne zlyhania sond používajte `failed` +
`failedConnections` a `staleDbNonOkCount`, keď potrebujete počet uložených
perzistentných stavov.

### Odporúčania pre sondy Kubernetes

OmniRoute je **jeden proces Node** (jedna slučka udalostí). Predvolený Docker `HEALTHCHECK` používa odľahčený koncový bod `/healthz`. `/api/monitoring/health` je na intervaly kontroly liveness kubeletu **príliš náročný**.

| Sonda                      | Odporúčaný cieľ                                                                               | Poznámky                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spustenie**              | HTTP `GET /healthz` s dlhou hodnotou `failureThreshold` (alebo veľkou hodnotou `startPeriod`) | Studený štart + migrácia SQLite môžu trvať dlhšie než niekoľko sekúnd                                                                                                                                                                                                                                                                                                                          |
| **Pripravenosť**           | HTTP `GET /healthz`                                                                           | Životný cyklus `ok` / `starting` / `stopping` (200 oproti 503). Stav stále kolíše, ak je slučka blokovaná procesorom. **Odpoveď 200 po niekoľkých sekundách neznamená zdravý stav** (#10303) — znamená to, že slučka udalostí nemala dostatok prostriedkov pred spustením obslužnej rutiny s 3-bajtovou odpoveďou                                                                              |
| **Životaschopnosť**        | HTTP `GET /livez`, **alebo TCP** na hlavnom porte služby (`PORT`, predvolene `20128`)         | `/livez` kontroluje iba to, či proces beží (ak sa obslužná rutina spustí, vždy vráti 200). Naďalej však zdieľa slučku udalostí — zaneprázdnený ≠ nefunkčný a vyčerpanie slučky udalostí (#10303) nezistí o nič lepšie než TCP. Ak HTTP sondy vypršia pri zaťažení katalógu/kompresie, uprednostnite **TCP**; v žiadnom prípade **neukončujte** pod pri krátkych pozastaveniach slučky udalostí |
| **Hĺbková kontrola stavu** | `GET /api/monitoring/health` z externého kontrolného nástroja                                 | Nie je určená pre kubelet `livenessProbe` / prísnu `readinessProbe`                                                                                                                                                                                                                                                                                                                            |

Príklad konfigurácie (upravte prahové hodnoty podľa zaťaženia pri studenom štarte a kompresii):

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
  # Pri zastavení slučky udalostí môže vypršať časový limit HTTP /livez.
  # Konzervatívnou alternatívou je TCP:
  # tcpSocket:
  #   port: http
```

**Nenastavujte** kubelet **liveness** na `/api/monitoring/health`. Táto cesta vykonáva skutočné databázové/monitorovacie operácie a pri zaťažení bude hlásiť falošne pozitívne výsledky.

Súvisiace: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sondy, keď je slučka udalostí zaneprázdnená), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (nadmerné zaťaženie pri oceňovaní katalógu), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (nadmerné zaťaženie pri počítaní tokenov kompresie).

### Voliteľné operácie na ceste požiadavky (pamäť, zručnosti, obnovenie tokenu)

Extrakcia pamäte, vkladanie zručností a obnovenie tokenu OAuth zdieľajú **hlavnú slučku udalostí Node** s `/healthz`. Ide o funkcie prepínateľné v ovládacom paneli (`memoryEnabled`, `skillsEnabled`), nie o fond pracovných procesov. Pozrite si [Prostredie — náklady slučky udalostí](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Stav poskytovateľa

> **Žiadny koncový bod REST.** Údaje o stave poskytovateľa sú dostupné prostredníctvom nástroja MCP `observability_snapshot` alebo stránky ovládacieho panela `/dashboard/providers`.

### Podrobnosti o poskytovateľovi

> **Žiadny koncový bod REST.** Podrobnosti o jednotlivých poskytovateľoch sú dostupné prostredníctvom stránky ovládacieho panela `/dashboard/providers`.

---

## Autopilot stavu poskytovateľov

Modul `providerHealthAutopilot.ts` je **samoopravný systém**, ktorý:

1. Zisťuje problémy poskytovateľov (otvorený istič, čakacie lehoty, zablokovania, upozornenia na kvótu)
2. Generuje **odporúčané akcie** na ich vyriešenie
3. Voliteľne **automaticky vykonáva** akcie s nízkym rizikom

### Zisťované typy problémov

| Druh problému                | Závažnosť   | Príklad podmienky                                 |
| ---------------------------- | ----------- | ------------------------------------------------- |
| `provider_circuit_open`      | kritická    | Istič otvorený po 5 zlyhaniach                    |
| `provider_circuit_half_open` | upozornenie | Istič testuje obnovenie prevádzky                 |
| `connection_cooldown`        | upozornenie | Pripojenie v čakacej lehote po chybe 429          |
| `stale_connection_error`     | upozornenie | Posledná obnova zlyhala pred viac ako 30 minútami |
| `terminal_connection_error`  | kritická    | OAuth odvolané, kľúč je neplatný                  |
| `inactive_connection`        | informácia  | Pripojenie zakázané v nastaveniach                |
| `model_lockout`              | upozornenie | Konkrétny model je v karanténe                    |
| `quota_monitor_warning`      | upozornenie | Využitie kvóty je 80 % alebo viac                 |

### Generované typy akcií

| Akcia                          | Riziko  | Popis                                 |
| ------------------------------ | ------- | ------------------------------------- |
| `clear_provider_breaker`       | stredné | Resetovať istič do zatvoreného stavu  |
| `clear_connection_cooldown`    | nízke   | Odstrániť čakaciu lehotu z pripojenia |
| `clear_stale_connection_error` | nízke   | Vymazať príznak neaktuálnej chyby     |
| `clear_model_lockout`          | nízke   | Znova povoliť model v karanténe       |
| `reactivate_connection`        | stredné | Znova povoliť deaktivované pripojenie |
| `deactivate_connection`        | vysoké  | Zakázať problematické pripojenie      |

### API

> **Žiadny koncový bod REST.** Problémy autopilota sú dostupné prostredníctvom nástroja MCP `observability_snapshot` alebo ovládacieho panela. Autopilot beží interne; jeho správanie sa konfiguruje prostredníctvom databázy nastavení (pole `autopilotMode` pre jednotlivé pripojenia), nie pomocou premenných prostredia — `grep -rn` pre premennú prostredia režimu autopilota vráti nula výskytov.

### Režim autopilota

Autopilot predvolene funguje v **manuálnom režime** — zisťuje problémy a generuje odporúčané akcie, ale automaticky ich nepoužíva. Akcie možno použiť prostredníctvom ovládacieho panela.

---

## Autopilot stavu kombinácií

`comboHealthAutopilot.ts` je ekvivalent autopilota poskytovateľov **špecifický pre kombinácie**. Vykonáva nasledujúce činnosti:

- Zisťuje nezdravé kombinácie
- Odporúča zmenu poradia cieľov
- Navrhuje zakázanie nefunkčných cieľov
- Po N zlyhaniach automaticky odstraňuje nefunkčné ciele

### Príklady problémov kombinácií

```
Kombinácia "always-on" (stratégia priority)
├─ Cieľ 1: openai/gpt-5 (zdravý)
├─ Cieľ 2: anthropic/claude-opus-4-6 (⚠️ model zablokovaný do 14:00)
└─ Cieľ 3: kiro/claude-sonnet-4-5 (zdravý)

Odporúčaná akcia: Zmeniť poradie — presunúť kiro nad anthropic, kým nevyprší zablokovanie
```

---

## Monitory kvót

`observability.ts` poskytuje **monitory kvót pre jednotlivé relácie** pre predplatených poskytovateľov (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0 – 100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Významy stavov

| Stav        | Kedy                         | Akcia používateľského rozhrania                       |
| ----------- | ---------------------------- | ----------------------------------------------------- |
| `starting`  | Prebieha úvodné zisťovanie   | Indikátor načítavania                                 |
| `idle`      | Žiadna nedávna aktivita      | Skryté na ovládacom paneli                            |
| `healthy`   | Zostáva viac ako 50 % kvóty  | Zelená bodka                                          |
| `warning`   | Zostáva menej ako 50 % kvóty | Žlté upozornenie                                      |
| `exhausted` | Kvóta = 0 %                  | Červený blok, presmerovanie na ďalšieho poskytovateľa |
| `error`     | Zisťovanie zlyhalo           | Červená bodka, čoskoro zopakovať pokus                |

### API

> **Žiadny koncový bod REST.** Údaje monitorovania kvót sú dostupné prostredníctvom nástroja MCP `observability_snapshot` alebo ovládacieho panela.

---

## Snímka pozorovateľnosti

Nástroj MCP `observability_snapshot` vracia **úplnú snímku systému** pre agentov AI:

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
  "quotaMonitors": {/* pozri vyššie */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenti ju používajú na **rozhodovanie o smerovaní** — napríklad „ak je obvod služby openai otvorený, smeruj najskôr na anthropic“.

---

## Kontrola stavu tokenov

Poskytovatelia OAuth (Claude Code, GitHub Copilot, Cursor) vyžadujú **pravidelné obnovovanie tokenov**. Súbor `src/lib/tokenHealthCheck.ts` spúšťa plánovač na pozadí:

- **Cyklus kontroly**: každých 60 sekúnd (cyklus v `TICK_MS = 60 * 1000` v `src/lib/tokenHealthCheck.ts:30`)
- **Interval kontroly stavu jednotlivých pripojení**: predvolene 60 minút (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); konfigurovateľné prostredníctvom databázy nastavení
- **Preventívne obnovenie pri odpovedi 401**: zabezpečuje ho interceptor príslušného pripojenia

### Stav tokenu

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

### Konfigurácia

Konfiguráciu kontroly stavu tokenov interne zabezpečuje `tokenHealthCheck.ts`.

### Stav tokenov

> **Žiadny koncový bod REST.** Údaje o stave tokenov sú dostupné prostredníctvom ovládacieho panela alebo nástroja MCP `observability_snapshot`.

---

## Upozornenia

### Vstavané kanály

OmniRoute podporuje **3 kanály upozornení**:

| Kanál                     | Nastavenie         | Prípad použitia                  |
| ------------------------- | ------------------ | -------------------------------- |
| Banner ovládacieho panela | Vždy zapnutý       | Upozornenia v aplikácii          |
| Webhook                   | Nakonfigurujte URL | Slack, Discord, PagerDuty        |
| Protokol                  | Predvolené         | Pre externú agregáciu protokolov |

### Konfigurácia webhooku

> **Poznámka:** Konfigurácia upozornení webhooku sa vykonáva prostredníctvom stránky Nastavenia na ovládacom paneli. Informácie o URL webhooku, filtrovaní udalostí a prispôsobení dátovej časti nájdete v používateľskom rozhraní Nastavenia.

### Typy upozornení

| Upozornenie                  | Kedy                                                                 | Predvolená závažnosť |
| ---------------------------- | -------------------------------------------------------------------- | -------------------- |
| `provider_circuit_open`      | Keď sa obvod otvorí                                                  | kritická             |
| `provider_circuit_half_open` | Keď obvod testuje obnovenie                                          | informačná           |
| `quota_warning`              | Keď kvóta dosiahne 80 % alebo viac                                   | varovanie            |
| `quota_exhausted`            | Keď kvóta dosiahne 100 %                                             | kritická             |
| `token_refresh_failed`       | Pri 3 alebo viacerých po sebe idúcich zlyhaniach obnovenia           | varovanie            |
| `token_expired`              | Keď uplynie platnosť tokenu                                          | kritická             |
| `combo_target_unhealthy`     | Keď je kombinovaný cieľ v režime ochladzovania 1 hodinu alebo dlhšie | varovanie            |
| `db_integrity_warning`       | Keď počet porušení cudzích kľúčov > 0                                | varovanie            |
| `heap_pressure`              | Keď využitie haldy > 80 % prahovej hodnoty                           | varovanie            |

---

## Metriky výkonu

### Sledované metriky

| Metrika                 | Typ        | Zdroj                           |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | počítadlo  | `services/usage.ts`             |
| `request_latency_ms`    | histogram  | `services/usage.ts`             |
| `tokens_consumed`       | počítadlo  | `services/usage.ts`             |
| `cost_usd`              | počítadlo  | `services/usage.ts`             |
| `provider_errors`       | počítadlo  | `services/errorClassifier.ts`   |
| `circuit_state_changes` | počítadlo  | `services/resilience.ts`        |
| `cache_hits`            | počítadlo  | `services/signatureCache.ts`    |
| `compression_savings`   | histogram  | `services/compression/stats.ts` |
| `quota_used`            | ukazovateľ | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ukazovateľ | `observability.ts`              |

### Percentily latencie (p50/p95/p99)

> **Bez koncového bodu REST.** Údaje o percentiloch latencie sú dostupné prostredníctvom stránky ovládacieho panela `/dashboard/health`. Export do Prometheus/OpenTelemetry je plánovaný pre v3.9.

### Export do Prometheus / OpenTelemetry (2. fáza)

Pre v3.9 je plánovaný natívny export do Prometheus, OpenTelemetry a Datadog.

Zatiaľ získavajte údaje z `/api/monitoring/health` pomocou ľubovoľného monitorovacieho systému založeného na HTTP (Prometheus blackbox exporter, Datadog HTTP check atď.).

---

## Návody na nastavenie upozornení

### Slack

> **Poznámka:** Upozornenia webhooku sa konfigurujú prostredníctvom stránky Nastavenia na ovládacom paneli — neexistujú žiadne vyhradené premenné prostredia webhooku (`grep -rn` nevráti žiadne výsledky). URL webhooku, filtrovanie udalostí a prispôsobenie dátového obsahu nájdete v používateľskom rozhraní Nastavenia.

### Discord

> Upozornenia webhooku používajú rovnaký postup v používateľskom rozhraní Nastavenia ako Slack. Discord akceptuje rovnakú štruktúru dátového obsahu JSON.

### PagerDuty

> Upozornenia webhooku používajú rovnaký postup v používateľskom rozhraní Nastavenia. Smerovacie kľúče PagerDuty Events API v2 sa konfigurujú v používateľskom rozhraní Nastavenia.

### Vlastný webhook (JSON)

> Fungovať bude ľubovoľný koncový bod HTTP, ktorý akceptuje požiadavky POST s telom JSON. URL nakonfigurujte v používateľskom rozhraní Nastavenia.

---

## Konfigurácia ovládacieho panela

### Prispôsobenie ovládacieho panela stavu

Vytvorte súbor `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Pripnutie poskytovateľa navrch

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Riešenie problémov

### „Poskytovateľ hlási, že je v poriadku, ale požiadavky zlyhávajú“

1. Skontrolujte **problémy autopilota** — niektorý model môže byť zablokovaný
2. Pozrite si **nedávne chyby** a vyhľadajte konkrétnu triedu chyby
3. Vyskúšajte **test pripojenia** na karte poskytovateľa
4. Skontrolujte, či poskytovateľ **neobmedzuje frekvenciu požiadaviek na nadradenej strane** (lokálne to nie je viditeľné)

### „Kvóta je v poriadku, ale zobrazujú sa mi chyby 429“

- 429 znamená, že podľa poskytovateľa ste vyčerpali svoju kvótu
- Sledovanie kvóty v OmniRoute môže byť **neaktuálne** — rozhodujúce sú údaje poskytovateľa na nadradenej strane
- Údaje o kvóte sa automaticky obnovujú prostredníctvom interného monitora kvóty

### „Kombinácia zlyháva, ale všetky ciele vyzerajú byť v poriadku“

- Skontrolujte ovládací panel **stavu kombinácie**, či neobsahuje problémy s poradím cieľov
- Pozrite si **udalosti záložného prepnutia** — kombinácia možno vyčerpáva možnosti príliš rýchlo
- Overte, či **stratégia** zodpovedá vášmu prípadu použitia (priorita vs. cyklické prideľovanie vs. automatická stratégia)

### „Kontrola stavu databázy zlyháva“

- Spustite `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ak je výsledkom „ok“ — ide o falošný poplach, kontrola stavu je príliš prísna
- Ak je výsledkom čokoľvek iné — **zastavte OmniRoute** a postupujte podľa [návodu na obnovu po havárii](./DATABASE_GUIDE.md#disaster-recovery)

### „Zaťaženie haldy pamäte je kritické“

```bash
# Skontrolujte aktuálnu haldu
node -e "console.log(process.memoryUsage())"

# Spustite manuálny GC (ak je použitý --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Znížte počet súbežných požiadaviek (nastavuje sa na stránke Nastavenia ovládacieho panela, nie pomocou premennej prostredia)
# Premenná prostredia `MAX_CONCURRENT_REQUESTS` neexistuje — nakonfigurujte túto hodnotu v časti Nastavenia → Súbežnosť.
```

---

## Pozri tiež

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — sledovanie využitia a nákladov
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schéma DB + stav
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — stav proxy (samostatná vyrovnávacia pamäť)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — architektúra systému
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — podrobnosti o ističoch
- Zdroj: `src/lib/monitoring/` (4 súbory, 2121 riadkov kódu)
