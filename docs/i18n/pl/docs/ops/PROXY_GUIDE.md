---
title: "🌐 Przewodnik po proxy OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 🌐 Przewodnik po proxy OmniRoute

> **Omijaj blokady geograficzne, chroń tożsamość i kieruj ruch AI przez dowolne proxy — bez złożonej konfiguracji.**

OmniRoute zawiera pełny system zarządzania proxy, który pozwala kierować ruch do upstreamowych dostawców AI przez proxy HTTP, HTTPS lub SOCKS5. Niezależnie od tego, czy jesteś w zablokowanym regionie, potrzebujesz rotacji IP, czy fingerprintingu stealth — ten przewodnik obejmuje wszystko.

---

## Spis treści

- [Po co używać proxy?](#po-co-używać-proxy)
- [Przegląd architektury](#przegląd-architektury)
- [4-poziomowy system proxy](#4-poziomowy-system-proxy)
- [Rejestr proxy (CRUD)](#rejestr-proxy-crud)
- [1proxy — darmowy marketplace](#1proxy--darmowy-marketplace)
- [Rotacja proxy](#rotacja-proxy)
- [Antywykrywanie i stealth](#antywykrywanie-i-stealth)
- [Tryby upstream proxy](#tryby-upstream-proxy)
- [Interfejs Dashboard](#interfejs-dashboard)
- [Referencja API](#referencja-api)
- [Zmienne środowiskowe](#zmienne-środowiskowe)
- [Rozwiązywanie problemów](#rozwiązywanie-problemów)

---

## Po co używać proxy?

Wielu dostawców AI ogranicza dostęp według regionu geograficznego. Deweloperzy w **Rosji, Chinach, Iranie, na Kubie, w Turcji** i innych krajach napotykają błędy w stylu:

```
unsupported_country_region_territory
```

Nawet poza zablokowanymi regionami proxy są przydatne do:

| Przypadek użycia | Opis                                                               |
| ---------------- | ------------------------------------------------------------------ |
| **Omijanie geo** | Dostęp do OpenAI, Anthropic, Codex, Copilot z zablokowanych krajów |
| **Rotacja IP**   | Rozkładanie żądań na wiele IP, by unikać limitów rate              |
| **Prywatność**   | Ukrycie prawdziwego IP przed upstreamowymi dostawcami              |
| **Compliance**   | Kierowanie ruchu przez określone jurysdykcje                       |
| **Testowanie**   | Symulacja żądań z różnych regionów                                 |

---

## Przegląd architektury

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute Server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy       │    │ Proxy        │    │ Proxy            │  │
│  │ Registry    │───▶│ Dispatcher   │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (cached)     │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy Sync │                        │ Upstream         │  │
│  │ (free pool) │                        │ Provider API     │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Kluczowe komponenty

| Komponent            | Plik                                         | Rola                                                   |
| -------------------- | -------------------------------------------- | ------------------------------------------------------ |
| **Proxy Registry**   | `src/lib/db/proxies.ts`                      | CRUD wpisów proxy + przypisania zakresów               |
| **Proxy Dispatcher** | `open-sse/utils/proxyDispatcher.ts`          | Tworzy `undici` ProxyAgent/SOCKS z cache               |
| **Proxy Fetch**      | `open-sse/utils/proxyFetch.ts`               | Opakowuje `fetch()` z wstrzyknięciem dispatchera proxy |
| **Settings Route**   | `src/app/api/settings/proxy/route.ts`        | Legacy API konfiguracji proxy (GET/PUT/DELETE)         |
| **Management Route** | `src/app/api/v1/management/proxies/route.ts` | Registry CRUD API (GET/POST/PATCH/DELETE)              |
| **1proxy DB**        | `src/lib/db/oneproxy.ts`                     | Trwałość darmowego marketplace proxy                   |
| **1proxy Sync**      | `src/lib/oneproxySync.ts`                    | Pobiera proxy z API 1proxy                             |
| **1proxy Rotator**   | `src/lib/oneproxyRotator.ts`                 | Strategie rotacji (quality/random/sequential)          |

---

## 4-poziomowy system proxy

OmniRoute obsługuje konfigurację proxy w **czterech niezależnych zakresach**, rozwiązywanych w kolejności priorytetu:

```
Priority Resolution Order (highest → lowest):

  1. 🔵 Account/Connection Proxy  →  per API key / OAuth connection
  2. 🟡 Provider Proxy            →  per provider (e.g., all OpenAI traffic)
  3. 🟠 Combo Proxy               →  per combo/routing configuration
  4. 🟢 Global Proxy              →  all traffic, all providers
```

### Jak działa rozwiązywanie

Gdy OmniRoute wysyła żądanie do upstreamowego dostawcy, wywołuje `resolveProxyForConnectionFromRegistry()`, które sprawdza kolejne poziomy w kolejności:

1. **Poziom konta** — Czy jest proxy przypisane do tego konkretnego ID połączenia?
2. **Poziom dostawcy** — Czy jest proxy przypisane do tego dostawcy (np. `openai`)?
3. **Poziom globalny** — Czy jest skonfigurowane globalne proxy?
4. **Brak proxy** — Bezpośrednie połączenie z dostawcą.

Pierwsze dopasowanie wygrywa. Oznacza to, że możesz ustawić globalne proxy jako fallback, a nadpisać je dla konkretnych dostawców lub połączeń.

### Co jest proxyowane

| Typ ruchu             | Proxy? | Uwagi                                             |
| --------------------- | ------ | ------------------------------------------------- |
| Chat completions      | ✅     | Wszystkie żądania `/v1/chat/completions`          |
| Embeddings            | ✅     | `/v1/embeddings`                                  |
| Generowanie obrazów   | ✅     | `/v1/images/generations`                          |
| Audio (TTS/STT)       | ✅     | `/v1/audio/*`                                     |
| Wymiana tokenów OAuth | ✅     | Rozwiązuje `unsupported_country_region_territory` |
| Testy połączeń        | ✅     | Przycisk „Test Connection” używa proxy            |
| Odświeżanie tokenów   | ✅     | Tło: odnawianie OAuth                             |
| Sync modeli           | ✅     | Listowanie i odkrywanie modeli                    |

---

## Rejestr proxy (CRUD)

Rejestr proxy to tabela SQLite (`proxy_registry`), która przechowuje wszystkie Twoje proxy. Każde proxy ma:

| Pole       | Typ     | Opis                                |
| ---------- | ------- | ----------------------------------- |
| `id`       | UUID    | Unikalny identyfikator              |
| `name`     | String  | Etykieta czytelna dla człowieka     |
| `type`     | String  | Protokół: `http`, `https`, `socks5` |
| `host`     | String  | Hostname lub IP proxy               |
| `port`     | Integer | Numer portu                         |
| `username` | String  | Login auth (szyfrowany at rest)     |
| `password` | String  | Hasło auth (szyfrowane at rest)     |
| `region`   | String  | Etykieta regionu geograficznego     |
| `notes`    | String  | Notatki dowolnego tekstu            |
| `status`   | String  | `active` lub `inactive`             |
| `source`   | String  | `manual` lub `oneproxy`             |

### Tworzenie proxy

**Przez Dashboard:**

1. Przejdź do **Settings → Proxy**
2. Kliknij **Add Proxy**
3. Wypełnij type, host, port i opcjonalne dane auth
4. Zapisz

**Przez API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Aktualizacja proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Uwaga:** Poświadczenia są zachowywane, chyba że wyślesz niepuste zamienniki. Wysłanie pustych stringów dla `username`/`password` zachowa zapisane wartości.

### Usuwanie proxy

```bash
# Fails if proxy is assigned to any scope
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Force delete (removes assignments too)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Listowanie proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Przypisywanie proxy do zakresów

```bash
# Assign to global scope
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Assign to a specific provider
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Assign to a specific connection/key
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Rozwiązywanie efektywnego proxy

Sprawdź, które proxy zostałoby użyte dla danego połączenia:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Zwraca rozwiązane proxy z poziomem (`account`, `provider` lub `global`) i źródłem.

### Masowe przypisanie

Przypisz jedno proxy do wielu dostawców lub połączeń naraz:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/Export

Proxy są uwzględnione w systemie **Backup/Restore**. Gdy eksportujesz konfigurację OmniRoute:

1. Przejdź do **Dashboard → Settings → Backup**
2. Kliknij **Export** — rejestr proxy i przypisania są włączone
3. Aby przywrócić, kliknij **Import** i wgraj plik backupu

Rejestr proxy obsługuje też **upsert po host+port** — jeśli importujesz proxy, które już istnieje (ten sam host i port), aktualizuje je zamiast tworzyć duplikat.

### Migracja legacy

Jeśli skonfigurowałeś proxy w starszej wersji (przed rejestrem), OmniRoute migruje je automatycznie:

```
Legacy key_value store → proxy_registry + proxy_assignments
```

Dzieje się to raz przy pierwszym starcie po upgrade. Użyj `migrateLegacyProxyConfigToRegistry({ force: true })`, by uruchomić ponownie.

---

## 1proxy — darmowy marketplace

> 🆕 **Wkład [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute integruje się z platformą społecznościową **[1proxy](https://1proxy-api.aitradepulse.com)**, by dać dostęp do **setek darmowych, zwalidowanych proxy** z całego świata. Idealne dla użytkowników bez własnej infrastruktury proxy.

### Jak to działa

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Sync** — OmniRoute pobiera zwalidowane proxy z API 1proxy
2. **Store** — Proxy są zapisywane w tej samej tabeli `proxy_registry` z `source = 'oneproxy'`
3. **Filter** — Filtrowanie po protokole, kraju, quality score
4. **Rotate** — Wybór najlepszego proxy strategiami quality, random lub sequential
5. **Auto-degrade** — Nieudane proxy dostają obniżony quality score; poniżej progu → oznaczone inactive

### Synchronizacja proxy

**Przez Dashboard:**

1. Przejdź do zakładki **Settings → 1proxy**
2. Kliknij **"Sync Now"**
3. Zobacz statystyki: total proxies, active count, average quality, breakdown by-country

**Przez API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrowanie proxy

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Quality scores proxy

Każde proxy 1proxy ma metadane:

| Pole            | Opis                                   |
| --------------- | -------------------------------------- |
| `qualityScore`  | Ocena 0–100 z walidacji 1proxy         |
| `latencyMs`     | Zmierzona latencja sieciowa            |
| `anonymity`     | `transparent`, `anonymous` lub `elite` |
| `googleAccess`  | Czy proxy ma dostęp do usług Google    |
| `countryCode`   | Dwuliterowy kod ISO kraju              |
| `lastValidated` | Znacznik czasu ostatniej walidacji     |

Quality scores są dynamicznie korygowane:

- **Nieudane żądania** obniżają score o 10 punktów
- **Score spada do ≤10** → proxy oznaczane jako `inactive`
- Nieaktywne proxy są wykluczane z rotacji

### Strategie rotacji

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Circuit breaker

Sync 1proxy ma wbudowany circuit breaker:

- Po **5 kolejnych nieudanych syncach** dalsze próby są blokowane
- Reset: `resetOneproxyCircuitBreaker()` lub restart serwera
- Status sync dostępny pod `GET /api/settings/oneproxy?action=status`

### Czyszczenie proxy 1proxy

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Antywykrywanie i stealth

OmniRoute nie tylko kieruje ruch przez proxy — sprawia, że ruch wygląda na legalny:

### Spoofing fingerprintu TLS

Używa `wreq-js` do generowania fingerprintów TLS wyglądających jak przeglądarka, omijając systemy bot-detection flagujące handshake TLS inne niż przeglądarkowe.

### Dopasowanie fingerprintu CLI

**CLI Fingerprint Toggle** (`Settings → Security`) przestawia kolejność nagłówków HTTP i pól body JSON, by dopasować dokładną sygnaturę natywnych binarek CLI (Claude Code, Codex itd.). Działa **na wierzchu** proxy:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Jednocześnie dostajesz **maskowanie IP** i **autentyczność żądania**.

### Zachowanie IP proxy

Kolorowe odznaki w dashboardzie pokazują, który poziom proxy jest aktywny:

| Odznaka | Poziom     | Znaczenie                                  |
| ------- | ---------- | ------------------------------------------ |
| 🟢      | Global     | Cały ruch idzie przez to proxy             |
| 🟡      | Provider   | Tylko ruch tego dostawcy jest proxyowany   |
| 🔵      | Connection | Ten konkretny key/account używa tego proxy |

Odznaka pokazuje też rozwiązane IP proxy do weryfikacji.

---

## Tryby upstream proxy

Dla dostawców używających wzorca CLIProxyAPI OmniRoute obsługuje trzy tryby upstream proxy:

| Tryb          | Opis                                              |
| ------------- | ------------------------------------------------- |
| `native`      | OmniRoute sam obsługuje routing proxy (domyślnie) |
| `cliproxyapi` | Deleguje do zewnętrznej instancji CLIProxyAPI     |
| `fallback`    | Najpierw native, potem fallback do CLIProxyAPI    |

Konfiguracja per-provider:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interfejs Dashboard

### Settings → Proxy Tab

- Konfiguracja **global proxy** (raz dla całego ruchu)
- Nadpisania **per-provider proxy**
- Przypisania **per-connection proxy**
- **Test połączenia** przez skonfigurowane proxy
- **Kolorowe odznaki** pokazujące aktywny poziom proxy

### Settings → 1proxy Tab

- Przycisk **Sync Now** do pobrania darmowych proxy
- **Karty stats**: Total, Active, Avg Quality, Last Sync
- **Filtry**: Protocol, Country Code, Min Quality
- **Tabela proxy** z host, protocol, country, quality score, latency, anonymity, Google access
- Panel **sync status** ze śledzeniem success/failure i licznikiem consecutive failures
- **Clear All** do usunięcia wszystkich wpisów 1proxy

---

## Referencja API

### Proxy Settings API

| Metoda   | Endpoint                                       | Opis                          |
| -------- | ---------------------------------------------- | ----------------------------- |
| `GET`    | `/api/settings/proxy`                          | Pełna konfiguracja proxy      |
| `GET`    | `/api/settings/proxy?level=global`             | Globalne proxy                |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Proxy dostawcy                |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Rozwiązanie efektywnego proxy |
| `PUT`    | `/api/settings/proxy`                          | Aktualizacja konfiguracji     |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Usunięcie proxy na poziomie   |

### Proxy Registry API

| Metoda   | Endpoint                                          | Opis                    |
| -------- | ------------------------------------------------- | ----------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Lista wszystkich proxy  |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Proxy po ID             |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Przypisania proxy       |
| `POST`   | `/api/v1/management/proxies`                      | Utworzenie proxy        |
| `PATCH`  | `/api/v1/management/proxies`                      | Aktualizacja proxy      |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Usunięcie proxy         |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Wymuszone usunięcie     |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Masowe przypisanie      |
| `GET`    | `/api/v1/management/proxies/assignments`          | Lista przypisań         |
| `GET`    | `/api/v1/management/proxies/health`               | Statystyki health proxy |

### Tunnels API

Aby wystawić instancję OmniRoute do publicznego internetu (Cloudflare/ngrok/Tailscale) zamiast kierować ruch wychodzący przez proxy, zobacz [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST API tuneli jest pod `/api/tunnels/{cloudflared,ngrok,tailscale}/*` i jest ortogonalne względem łańcucha outbound proxy opisanego powyżej.

### 1proxy API

| Metoda   | Endpoint                               | Opis                        |
| -------- | -------------------------------------- | --------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Lista proxy 1proxy          |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Stats + status sync         |
| `GET`    | `/api/settings/oneproxy?action=status` | Tylko status sync           |
| `POST`   | `/api/settings/oneproxy`               | Wyzwolenie sync             |
| `POST`   | `/api/settings/oneproxy/rotate`        | Rotacja do następnego proxy |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Usunięcie jednego           |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Wyczyszczenie wszystkich    |

### Upstream Proxy API

| Metoda   | Endpoint                          | Opis                            |
| -------- | --------------------------------- | ------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Konfiguracja upstream proxy     |
| `PUT`    | `/api/upstream-proxy/:providerId` | Ustawienie trybu upstream proxy |
| `DELETE` | `/api/upstream-proxy/:providerId` | Usunięcie konfiguracji upstream |

---

## Zmienne środowiskowe

| Zmienna                          | Domyślna                              | Opis                                                      |
| -------------------------------- | ------------------------------------- | --------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY`            | `true`                                | Włącza obsługę SOCKS5 (domyślnie `true` w `.env.example`) |
| `ONEPROXY_ENABLED`               | `true`                                | Włącza integrację 1proxy                                  |
| `ONEPROXY_API_URL`               | `https://1proxy-api.aitradepulse.com` | Endpoint API 1proxy                                       |
| `ONEPROXY_MAX_PROXIES`           | `500`                                 | Maks. liczba proxy do synchronizacji                      |
| `ONEPROXY_MIN_QUALITY_THRESHOLD` | `50`                                  | Minimalny quality score do importu                        |

---

## Rozwiązywanie problemów

### „SOCKS5 proxy is disabled”

Ustaw `ENABLE_SOCKS5_PROXY=true` w pliku `.env` i zrestartuj.

### Błędy „socket hang up” przez proxy

To normalne przy tanich proxy zrywających idle connections. OmniRoute już to obsługuje przez:

- Wyłączenie keep-alive na połączeniach proxy (`keepAliveTimeout: 1`)
- Wyłączenie pipelining (`pipelining: 0`)
- Cache dispatcherów, by unikać powtarzanych handshake’ów

Jeśli problem trwa, spróbuj innego proxy lub użyj rotacji 1proxy.

### „unsupported_country_region_territory” podczas OAuth

Upewnij się, że proxy jest skonfigurowane **przed** startem flow OAuth. OmniRoute kieruje wymianę tokenów OAuth przez skonfigurowane proxy. Najpierw ustaw globalne lub provider-level proxy, potem połącz.

### Proxy nie jest używane

Sprawdź kolejność rozwiązywania:

1. Zweryfikuj przez `GET /api/settings/proxy?resolve=your-connection-id`
2. Sprawdź, czy `status` proxy to `active` (nie `inactive`)
3. Upewnij się, że zakres przypisania proxy pasuje do Twojego połączenia

### Sync 1proxy się nie udaje

Sprawdź status sync:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Jeśli `consecutiveFailures >= 5`, circuit breaker się otworzył. Zrestartuj serwer, by zresetować, albo poczekaj na ręczny reset.

---

## Schemat bazy danych

### Tabela `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' or 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (1proxy only)
  latency_ms INTEGER,                        -- milliseconds (1proxy only)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- can access Google? (1proxy)
  last_validated TEXT,                       -- ISO timestamp (1proxy)
  country_code TEXT,                         -- ISO 2-letter code (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabela `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- provider ID, connection ID, or combo ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Sprawdzanie health proxy (v3.8.16+)

Mechanizm **proxy fast-fail** OmniRoute (`src/lib/proxyHealth.ts`) wykrywa martwe proxy w <2s szybkim sprawdzeniem połączenia TCP, potem **cache’uje wynik**, by uniknąć narzutu na każde żądanie.

### Jak to działa

```
Request ──▶ ProxyHealthCache.get(url)
             │
             ├─ Cache hit + fresh?  ──▶ return cached status
             │
             └─ Cache miss / stale?  ──▶ TCP connect to host:port
                                          (timeout: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ cache for HEALTH_CACHE_TTL_MS
                                          ──▶ return result
```

Bez tego martwe proxy blokowałoby każde żądanie na pełne `PROXY_TIMEOUT_MS` (domyślnie 30s) przed fail.

### Strojenie zmiennych środowiskowych

| Zmienna                      | Domyślna | Cel                                    |
| ---------------------------- | -------- | -------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`   | Timeout połączenia TCP na health check |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`  | Jak długo wynik health jest w cache    |

**Zalecane wartości:**

| Scenariusz                  | Timeout fast-fail | Cache TTL | Uzasadnienie                                                        |
| --------------------------- | ----------------- | --------- | ------------------------------------------------------------------- |
| High-throughput API gateway | 1500ms            | 60000ms   | Agresywny fail-fast, dłuższy cache by mniej sprawdzać               |
| Węzły geo-distributed       | 3000ms            | 15000ms   | Wolniejsze sieci potrzebują czasu; krótszy cache = szybszy failover |
| Dev / testing               | 1000ms            | 10000ms   | Szybka iteracja na lokalnych proxy                                  |
| Stealth / anti-detection    | 2500ms            | 45000ms   | Unikanie szybkiego probing, który mógłby triggerować rate limits    |

### Inspekcja health proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Force re-check a specific proxy
invalidateProxyHealth("http://user:pass@1.2.3.4:8080");
```

Flaga `stale` jest `true`, gdy wpis cache przekroczył `HEALTH_CACHE_TTL_MS` i następne żądanie wywoła świeży check.

### Domyślne wartości per typ proxy

Health check używa rozsądnych domyślnych na podstawie schematu URL:

| Schemat                    | Domyślny port |
| -------------------------- | ------------- |
| `http://`                  | 8080          |
| `https://`                 | 443           |
| `socks5://` / `socks5h://` | 1080          |

Własne porty w URL (`http://host:9999`) zawsze mają pierwszeństwo przed domyślnym schematu.

---

## Analityka i observability proxy

OmniRoute śledzi użycie per-proxy, by operatorzy mogli diagnozować wzorce routingu, skoki latencji i powtarzające się awarie.

### Co jest śledzone

Dla każdego żądania przez skonfigurowane proxy OmniRoute zapisuje:

| Metryka      | Opis                                              |
| ------------ | ------------------------------------------------- |
| `proxy_url`  | Pełny URL proxy (z zamaskowanymi poświadczeniami) |
| `provider`   | ID upstream provider (openai, anthropic itd.)     |
| `latency_ms` | Całkowity RTT w tym handshake proxy               |
| `connect_ms` | Tylko czas połączenia TCP                         |
| `status`     | Kod HTTP status od upstream                       |
| `error`      | Klasa błędu, jeśli żądanie padło                  |
| `timestamp`  | ISO 8601 UTC                                      |

### Dostęp do danych

```bash
# Recent proxy events
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Prawdziwy endpoint to `/api/usage/proxy-logs` (zob. `src/app/api/usage/proxy-logs/route.ts`). Endpoint obsługuje:

- `GET /api/usage/proxy-logs` — pobranie logów proxy
- `DELETE /api/usage/proxy-logs` — wyczyszczenie wszystkich logów proxy

Agregaty można też zapytać bezpośrednio z tabeli `proxy_logs` przez SQL. UI dashboardu może oferować widoki agregatów.

### Typowe wzorce

**Wykrycie flapping proxy** (naprzemienny success/failure):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Znajdź wolne proxy** (p95 latency > 2s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Drzewo decyzyjne strategii rotacji

Gdy do zakresu przypisano wiele proxy, OmniRoute używa **strategii rotacji**, by wybrać, którego użyć na każde żądanie. Strategia jest konfigurowana na poziomie zakresu (global, per-provider, per-account, per-combo).

### Dostępne strategie

| Strategia           | Kiedy używać                     | Kompromis                                               |
| ------------------- | -------------------------------- | ------------------------------------------------------- |
| `quality` (default) | Produkcja z proxy różnej jakości | Faworyzuje wysoko oceniane; może głodzić nisko oceniane |
| `random`            | Rozkład obciążenia, prywatność   | Równomierny rozkład; ignoruje sygnały jakości           |
| `sequential`        | Debug, deterministyczne testy    | Cykluje proxy po kolei; łatwo rozumieć                  |

### Drzewo decyzyjne

```
                    Do you have quality scores for your proxies?
                    │
        ┌───────────┴───────────┐
        │                       │
       YES                     NO
        │                       │
   Are all proxies             │
   roughly equal                  │
   in quality?                   │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  YES       NO                Use
   │         │              `random`
   │         │              (even spread
   │         │              builds quality
   │         │              data over time)
   │         │
   │    Use `quality`
   │    (best for
   │    mixed quality)
   │
Use `random`
(spread load
evenly)
```

### Konfiguracja strategii rotacji

```ts
import { rotateOneproxyProxy } from "omniroute/oneproxyRotator";

// In a one-off script
const proxy = await rotateOneproxyProxy({ strategy: "quality" });
if (proxy) {
  console.log(`Selected: ${proxy.host}:${proxy.port}, quality=${proxy.qualityScore}`);
}
```

### Reset indeksu sequential

Przy strategii `sequential` wewnętrzny indeks narasta. Aby zresetować:

```ts
import { resetSequentialIndex } from "omniroute/oneproxyRotator";

resetSequentialIndex();
```

Przydatne gdy:

- Restartujesz load test
- Odzyskujesz się po awarii proxy (żeby nie cyklonować najpierw martwych)
- Ręcznie rebalansujesz po dodaniu nowych proxy

### Oznaczanie proxy jako failed

Gdy proxy systematycznie pada, oznacz je ręcznie, by rotator je pomijał:

```ts
import { failOneproxyProxy } from "omniroute/oneproxyRotator";

const removed = await failOneproxyProxy("1.2.3.4", 8080);
if (removed) {
  console.log("Proxy marked as failed; rotator will skip it");
}
```

Proxy **nie jest usuwane** — jest oznaczane jako unhealthy i nie będzie wybierane do następnego udanego health check (przez `proxyHealth.ts`) lub ręcznego resetu.

---

> 📖 **Powiązana dokumentacja:**
>
> - [User Guide](../guides/USER_GUIDE.md) — Ogólna konfiguracja i setup
> - [API Reference](../reference/API_REFERENCE.md) — Pełna dokumentacja API
> - [Environment Config](../reference/ENVIRONMENT.md) — Wszystkie zmienne środowiskowe
