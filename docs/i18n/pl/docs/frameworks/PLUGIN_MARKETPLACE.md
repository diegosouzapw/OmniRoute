---
title: "Marketplace wtyczek"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Marketplace wtyczek

> **Źródło prawdy:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` oraz
> `src/app/(dashboard)/dashboard/plugins/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute dostarcza system wtyczek w stylu WordPressa. Wtyczki to samodzielne
katalogi — każdy z manifestem `plugin.json` i plikiem wejściowym — które wpinają
się w potok żądań (`onRequest` / `onResponse` / `onError`) oraz w
zdarzenia cyklu życia (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Marketplace wtyczek** to warstwa odkrywania na wierzchu tego systemu. Udostępnia
przeglądalny katalog instalowalnych wtyczek. Domyślnie katalog to mały wbudowany
rejestr seed; operator może wskazać własny zdalny URL rejestru — wtedy pobieranie
jest utwardzone przez ochronę SSRF z resolucją DNS
(zob. [Bezpieczeństwo](#bezpieczeństwo)).

Każda trasa wtyczek jest **tylko loopback** (Tier 1 — `LOCAL_ONLY`): wtyczki ładują
i wykonują kod w procesach potomnych, więc trasy są niedostępne z
źródła spoza loopbacka niezależnie od uwierzytelnienia. Zob.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Jak to się składa

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Warstwa rejestru** — `src/lib/plugins/marketplace.ts`: listuje / wyszukuje
  katalog, przy każdej awarii wracając do rejestru seed.
- **Warstwa cyklu życia** — `src/lib/plugins/manager.ts` (singleton `pluginManager`):
  install, upgrade, activate, deactivate, uninstall, scan, ładowanie przy starcie.
- **Warstwa manifestu** — `src/lib/plugins/manifest.ts`: schemat Zod + domyślne wartości dla
  `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: wykrywa wtyczki na dysku w
  katalogu wtyczek.
- **Loader** — `src/lib/plugins/loader.ts`: uruchamia każdą wtyczkę w izolowanym
  procesie potomnym i pośredniczy w wywołaniach hooków przez IPC.

## Katalog marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) zwraca listę
obiektów `MarketplaceEntry`:

| Field         | Type     | Notes                                |
| ------------- | -------- | ------------------------------------ |
| `name`        | string   | kebab-case plugin name               |
| `version`     | string   | semver                               |
| `description` | string   | Short summary                        |
| `author`      | string   | Author / org                         |
| `license`     | string   | SPDX-style license id                |
| `downloadUrl` | string   | Source download URL (may be empty)   |
| `repository`  | string?  | Optional repository URL              |
| `tags`        | string[] | Search/filter tags                   |
| `downloads`   | number   | Download count                       |
| `rating`      | number   | 0–5                                  |
| `verified`    | boolean  | Whether the entry is marked verified |
| `lastUpdated` | string   | ISO-ish date string                  |

Gdy nie skonfigurowano własnego URL rejestru, katalog to wbudowany
`SEED_REGISTRY` (obecnie `request-logger`, `rate-limiter`, `cost-tracker` oraz
`theme-manager`). Rejestr seed jest zawsze dostępny — jeśli skonfigurowany zdalny
rejestr jest nieosiągalny, zwraca status inny niż `200` albo zwraca nierozpoznane
ciało odpowiedzi, `listMarketplacePlugins()` loguje ostrzeżenie i wraca do listy seed.

> Uwaga: **katalog** marketplace (przeglądanie/wyszukiwanie) jest podpięty od końca do końca, ale
> jednoklikowa **instalacja** z katalogu marketplace nie jest jeszcze zaimplementowana — przycisk
> „Install” na wpisie marketplace w dashboardzie pokazuje obecnie
> komunikat „coming soon”. Instalacja dziś odbywa się przez przepływ instalacji ze ścieżki lokalnej
> (`POST /api/plugins`) oraz odkrywanie na dysku (`POST /api/plugins/scan`).

## REST API

Wszystkie endpointy wymagają management auth (`requireManagementAuth`) **oraz** są
tylko loopback — `/api/plugins` i `/api/plugins/` są wymienione w
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Method | Description                                         |
| -------------------------------- | ------ | --------------------------------------------------- |
| `/api/plugins`                   | GET    | List installed plugins (optional `?status=` filter) |
| `/api/plugins`                   | POST   | Install a plugin from an absolute local path        |
| `/api/plugins/scan`              | POST   | Scan the plugin directory and register new plugins  |
| `/api/plugins/marketplace`       | GET    | List marketplace catalog entries                    |
| `/api/plugins/[name]`            | GET    | Get installed plugin details                        |
| `/api/plugins/[name]`            | DELETE | Uninstall a plugin                                  |
| `/api/plugins/[name]/activate`   | POST   | Activate (load + register hooks)                    |
| `/api/plugins/[name]/deactivate` | POST   | Deactivate (fire `onDeactivate`, unregister hooks)  |
| `/api/plugins/[name]/config`     | GET    | Get plugin config + config schema                   |
| `/api/plugins/[name]/config`     | PUT    | Update plugin config (validated against schema)     |

Filtr `status` w `GET /api/plugins` przyjmuje jedną z wartości
`installed` / `active` / `inactive` / `error`. Nieprawidłowa wartość zwraca `400`.

### Lista zainstalowanych wtyczek

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalacja ze ścieżki lokalnej

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` musi być **absolutna** i nie może zawierać segmentów traversalu `..` ani
bajtów null (egzekwowane przez Zod). Katalog źródłowy musi zawierać prawidłowy
`plugin.json` (albo być jego rodzicem). Przy sukcesie odpowiedź to `201` z
wierszem zainstalowanej wtyczki.

### Przeglądanie marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aktualizacja konfiguracji wtyczki

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` waliduje każdą podaną wartość względem
`configSchema` wtyczki (zadeklarowanego w manifeście): pola `number` respektują `min`/`max`,
pola `select` muszą pasować do zadeklarowanego `enum`. Klucze nieobecne w schemacie
są przepuszczane.

## Konfiguracja

### Katalog wtyczek

Wtyczki mieszkają w katalogu danych OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (or whatever manifest.main points to)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) rozwiązuje to do
`<home>/.omniroute/plugins`, gdzie `<home>` pochodzi ze zmiennych środowiskowych `HOME` /
`USERPROFILE`. `POST /api/plugins/scan` odkrywa każdy
podkatalog z prawidłowym `plugin.json` i rejestruje go.

### Własny URL rejestru marketplace

Źródło katalogu marketplace jest odczytywane z ustawienia `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` czyta `settings.pluginMarketplaceUrl`). Gdy
ustawione na URL `http(s)`, `listMarketplacePlugins()` pobiera ten URL i akceptuje
albo tablicę JSON wpisów na najwyższym poziomie, albo obiekt z tablicą `plugins`;
wpisy bez stringowego `name` są odfiltrowywane. Gdy nieustawione (albo gdy pobranie
nie przechodzi ochrony SSRF / zwraca złą odpowiedź), używany jest wbudowany rejestr seed.

Zakładka „Marketplace” w dashboardzie udostępnia pole na ten URL (odczytywane z
`GET /api/settings`).

> Uwaga implementacyjna: akcja „Save” w dashboardzie wysyła
> `pluginMarketplaceUrl` do `PATCH /api/settings`. W momencie pisania tego tekstu
> klucz nie jest zadeklarowany w `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), więc przed poleganiem na nim zweryfikuj
> trwałość w swojej wersji — ścieżka **odczytu** (`getSettings()` →
> `listMarketplacePlugins()`) honoruje klucz, gdy tylko jest obecny w magazynie
> ustawień.

## Bezpieczeństwo

### Poziom trasy — tylko loopback

Wtyczki wykonują kod w spawn'owanych procesach potomnych, więc cała powierzchnia `/api/plugins`
jest sklasyfikowana jako `LOCAL_ONLY` (Tier 1). Egzekwowanie loopbacka działa
bezwarunkowo **przed** jakimkolwiek sprawdzeniem auth, więc wycieknięty token managementu
docierający do maszyny przez tunel nadal nie może zainstalować, aktywować ani odinstalować wtyczki.
Zob. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) oraz
Hard Rules #15 / #17.

### Ochrona SSRF rejestru marketplace

Własny URL rejestru to konfiguracja pod wpływem atakującego, więc przed
pobraniem `listMarketplacePlugins()` przepuszcza go przez dwie warstwy:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odrzuca wszystko, co nie jest `http:` / `https:`.
   - Odrzuca literały hostów private/loopback/link-local/ULA (IPv4 **oraz** IPv6,
     w tym IPv4-mapped) przez kanoniczne `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Resolwuje **oba** rekordy `A` i `AAAA` i odrzuca, jeśli **jakikolwiek** rozwiązany
     adres jest prywatny — zamykając bypass public-hostname → private-IP.
   - **Fails closed**: awaria resolucji DNS odrzuca URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): ponownie stosuje ochronę URL public-only
   w momencie fetcha i **blokuje przekierowania** (bez pivota public → private `30x`).

URL, który nie przechodzi którejkolwiek warstwy, nie przerywa żądania — marketplace
cicho wraca do wbudowanego rejestru seed i loguje ostrzeżenie.

> Ta ochrona została utwardzona w PR #3774 specjalnie, by resolwować A + AAAA i używać
> kanonicznego `isPrivateHost` zamiast sprawdzenia tylko IPv4.

### Izolacja wykonania wtyczek

- **Izolacja procesów** — `loadPlugin()` (`src/lib/plugins/loader.ts`) uruchamia
  każdą wtyczkę w osobnym procesie potomnym Node.js i komunikuje się przez IPC.
  Wywołania hooków mają timeout z eskalacją `SIGTERM` → `SIGKILL`.
- **Allowlista env** — potomek otrzymuje tylko allowlistowany zestaw zmiennych
  środowiskowych; szerszy zestaw jest przyznawany wyłącznie, gdy manifest prosi o
  uprawnienie `env`.
- **Zawężenie ścieżek** — install/upgrade/uninstall sprawdzają, że katalog wtyczki
  i `manifest.main` rozwiązują się **wewnątrz** zarządzanego roota wtyczek
  przed jakimkolwiek kopiowaniem lub rekurencyjnym usuwaniem (ochrona przed sfałszowanymi ścieżkami w DB i
  traversalem `../` w `manifest.main`). Aktywacja rozwiązuje symlinki przez
  `realpath` i odmawia załadowania entry pointu, który wychodzi poza katalog
  wtyczki.
- **Opcjonalny pin integralności** — manifest może zadeklarować pole `integrity`
  (`sha256-<base64>`, format SRI). Gdy obecne, loader weryfikuje
  hash pliku wejściowego w momencie ładowania i odmawia aktywacji przy niezgodności. To
  opt-in wykrywanie manipulacji, **nie** granica bezpieczeństwa — prawdziwymi granicami są
  routing tylko-loopback oraz model uprawnień.

## Manifest (`plugin.json`)

Walidowany przez `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Field              | Type      | Notes                                                       |
| ------------------ | --------- | ----------------------------------------------------------- |
| `name`             | string    | Required; kebab-case (`^[a-z0-9-]+$`), 1–100 chars          |
| `version`          | string    | Required; semver (`MAJOR.MINOR.PATCH`)                      |
| `description`      | string?   | ≤ 500 chars                                                 |
| `author`           | string?   | ≤ 200 chars                                                 |
| `license`          | string?   | Defaults to `MIT`                                           |
| `main`             | string?   | Entry file; defaults to `index.js`                          |
| `source`           | enum?     | `local` \| `marketplace` (defaults to `local`)              |
| `tags`             | string[]? | Search tags                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                             |
| `hooks`            | object?   | Booleans declaring which hooks the plugin implements        |
| `skills`           | object[]? | Optional skill definitions                                  |
| `enabledByDefault` | boolean?  | Auto-activate on install                                    |
| `configSchema`     | object?   | Map of config fields (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Optional `sha256-<base64>` entry-file pin                   |

Uprawnienia pochodzą z enuma
`network` / `file-read` / `file-write` / `env` / `exec`.

## Przepływ cyklu życia

```
install (POST /api/plugins, path)
  → scan/validate manifest → copy to staging → assert main within dir
  → atomic rename into ~/.omniroute/plugins/<name> → insert DB row
  → fire onInstall → if enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → realpath containment check → loadPlugin() (spawn child process)
  → register declared hooks → status = "active" → fire onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → fire onDeactivate (BEFORE unregister) → unregister hooks
  → kill child process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate if active → fire onUninstall
  → containment-checked recursive delete of plugin dir → delete DB row
```

Ponowne uruchomienie `install` wobec katalogu, którego wersja w manifeście jest **ściśle
nowsza** niż zainstalowana, automatycznie aktualizuje (czysta reinstalacja; konfiguracja wraca
do domyślnych). Ta sama lub starsza wersja jest odrzucana.

## Baza danych

Tabela `plugins` (migracja `076_create_plugins.sql`):

| Column          | Type    | Notes                                            |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | Unique                                           |
| `version`       | TEXT    | semver; default `1.0.0`                          |
| `description`   | TEXT    | Optional                                         |
| `author`        | TEXT    | Optional                                         |
| `license`       | TEXT    | Default `MIT`                                    |
| `main`          | TEXT    | Entry file; default `index.js`                   |
| `source`        | TEXT    | Default `local`                                  |
| `tags`          | TEXT    | JSON array; default `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; default 0                                   |
| `manifest`      | TEXT    | Full manifest JSON                               |
| `config`        | TEXT    | JSON; default `{}`                               |
| `config_schema` | TEXT    | JSON; default `{}`                               |
| `hooks`         | TEXT    | JSON array of declared hook names; default `[]`  |
| `permissions`   | TEXT    | JSON array; default `[]`                         |
| `plugin_dir`    | TEXT    | Absolute install directory                       |
| `error_message` | TEXT    | Set when `status = "error"`                      |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | Set on activation                                |

Metryki/analityka wtyczek są śledzone w dodatkowych tabelach
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Strona dashboardu pod `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) udostępnia dwie zakładki:

- **Installed** — listuje zainstalowane wtyczki z zadeklarowanymi hookami,
  przełącznikiem activate/deactivate, przyciskiem uninstall oraz akcją „Scan for plugins”
  (`POST /api/plugins/scan`).
- **Marketplace** — pokazuje katalog z `GET /api/plugins/marketplace` z
  polem do ustawienia własnego URL rejestru.

Strona konfiguracji per-wtyczka jest pod `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Zobacz też

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  dlaczego `/api/plugins` jest tylko loopback (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — powiązany framework skills
  (`src/lib/skills/`); wtyczki mogą deklarować skills w manifeście
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — event-driven outbound
  integracje
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  wzorzec `buildErrorBody()` używany przez każdą trasę wtyczek w odpowiedziach błędów
