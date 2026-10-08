# Plugin Marketplace (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Zdroj pravdy:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` a
> `src/app/(dashboard)/dashboard/plugins/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute obsahuje systém pluginů ve stylu WordPressu. Pluginy jsou samostatné
adresáře — každý se souborem manifestu `plugin.json` a vstupním souborem — které
se napojují na zpracování požadavků (`onRequest` / `onResponse` / `onError`) a na
události životního cyklu (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Tržiště pluginů** představuje nad tímto systémem vrstvu pro vyhledávání.
Zpřístupňuje katalog dostupných pluginů, které lze procházet a instalovat. Ve
výchozím nastavení katalog tvoří malý vestavěný základní registr; provozovatel
jej může nasměrovat na vlastní adresu URL vzdáleného registru. V takovém případě
je načítání zabezpečeno ochranou proti SSRF s překladem DNS (viz
[Zabezpečení](#security)).

Všechny trasy pluginů jsou přístupné **pouze přes loopback** (úroveň 1 —
`LOCAL_ONLY`): pluginy načítají a spouštějí kód v podřízených procesech, takže
trasy nejsou bez ohledu na ověření přístupné z jiného zdroje než loopback.
Viz [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Jak vše zapadá dohromady

```
Řídicí panel (/dashboard/plugins)
  ├─ Karta „Nainstalované“ → GET /api/plugins            (listPlugins)
  │                         POST /api/plugins/scan      (pluginManager.scan)
  │                         POST /api/plugins/{name}/activate|deactivate
  │                         DELETE /api/plugins/{name}   (odinstalace)
  └─ Karta „Tržiště“       → GET /api/plugins/marketplace
                              → listMarketplacePlugins()
                                ├─ bez vlastní URL → vestavěný SEED_REGISTRY
                                └─ vlastní URL → ochrana SSRF isSafeMarketplaceUrl()
                                               → safeOutboundFetch(guard:"public-only")
```

- **Vrstva registru** — `src/lib/plugins/marketplace.ts`: vypisuje / prohledává
  katalog a při jakémkoli selhání použije základní registr.
- **Vrstva životního cyklu** — `src/lib/plugins/manager.ts` (singleton
  `pluginManager`): instalace, upgrade, aktivace, deaktivace, odinstalace,
  skenování a načtení při spuštění.
- **Vrstva manifestu** — `src/lib/plugins/manifest.ts`: schéma Zod + výchozí
  hodnoty pro `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: vyhledává pluginy na disku
  v adresáři pluginů.
- **Zavaděč** — `src/lib/plugins/loader.ts`: spouští každý plugin v izolovaném
  podřízeném procesu a zprostředkovává volání háčků přes IPC.

## Katalog tržiště

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vrací seznam
objektů `MarketplaceEntry`:

| Pole          | Typ      | Poznámky                                        |
| ------------- | -------- | ----------------------------------------------- |
| `name`        | string   | Název pluginu ve formátu kebab-case             |
| `version`     | string   | semver                                          |
| `description` | string   | Stručný popis                                   |
| `author`      | string   | Autor / organizace                              |
| `license`     | string   | Identifikátor licence ve stylu SPDX             |
| `downloadUrl` | string   | Adresa URL zdroje ke stažení (může být prázdná) |
| `repository`  | string?  | Volitelná adresa URL repozitáře                 |
| `tags`        | string[] | Značky pro vyhledávání/filtrování               |
| `downloads`   | number   | Počet stažení                                   |
| `rating`      | number   | 0–5                                             |
| `verified`    | boolean  | Zda je položka označena jako ověřená            |
| `lastUpdated` | string   | Datumový řetězec ve formátu podobném ISO        |

Pokud není nakonfigurována vlastní adresa URL registru, katalog tvoří vestavěný
`SEED_REGISTRY` (aktuálně `request-logger`, `rate-limiter`, `cost-tracker` a
`theme-manager`). Základní registr je vždy k dispozici — pokud je nakonfigurovaný
vzdálený registr nedostupný, vrátí jiný stav než `200` nebo vrátí nerozpoznaný
obsah, `listMarketplacePlugins()` zaznamená upozornění a použije základní seznam.

> Poznámka: **katalog** tržiště (procházení/vyhledávání) je kompletně propojen,
> ale instalace z katalogu jedním kliknutím zatím není implementována — tlačítko
> „Instalovat“ na položce tržiště v řídicím panelu momentálně zobrazí oznámení
> „již brzy“. Instalace dnes probíhá prostřednictvím instalačního postupu
> z místní cesty (`POST /api/plugins`) a vyhledávání na disku
> (`POST /api/plugins/scan`).

## REST API

Všechny koncové body vyžadují autentizaci pro správu (`requireManagementAuth`) **a**
jsou dostupné pouze přes loopback — `/api/plugins` a `/api/plugins/` jsou uvedeny v
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Koncový bod                      | Metoda | Popis                                                          |
| -------------------------------- | ------ | -------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Výpis nainstalovaných pluginů (volitelný filtr `?status=`)     |
| `/api/plugins`                   | POST   | Instalace pluginu z absolutní lokální cesty                    |
| `/api/plugins/scan`              | POST   | Prohledání adresáře pluginů a registrace nových pluginů        |
| `/api/plugins/marketplace`       | GET    | Výpis položek katalogu tržiště                                 |
| `/api/plugins/[name]`            | GET    | Získání podrobností o nainstalovaném pluginu                   |
| `/api/plugins/[name]`            | DELETE | Odinstalace pluginu                                            |
| `/api/plugins/[name]/activate`   | POST   | Aktivace (načtení + registrace hooků)                          |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivace (vyvolání `onDeactivate`, zrušení registrace hooků) |
| `/api/plugins/[name]/config`     | GET    | Získání konfigurace pluginu + schématu konfigurace             |
| `/api/plugins/[name]/config`     | PUT    | Aktualizace konfigurace pluginu (ověřená podle schématu)       |

Filtr `status` pro `GET /api/plugins` přijímá jednu z hodnot
`installed` / `active` / `inactive` / `error`. Neplatná hodnota vrátí `400`.

### Výpis nainstalovaných pluginů

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalace z lokální cesty

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Hodnota `path` musí být **absolutní** a nesmí obsahovat segmenty `..` pro procházení
adresářové struktury ani nulové bajty (vynucováno pomocí Zod). Zdrojový adresář musí
obsahovat platný soubor `plugin.json` (nebo musí být jeho nadřazeným adresářem).
Při úspěchu má odpověď stav `201` a obsahuje záznam nainstalovaného pluginu.

### Procházení tržiště

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aktualizace konfigurace pluginu

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` ověřuje každou zadanou hodnotu podle `configSchema` pluginu
(deklarovaného v manifestu): pole typu `number` respektují `min`/`max`,
pole typu `select` musí odpovídat deklarovanému `enum`. Klíče, které nejsou ve
schématu uvedeny, jsou povoleny.

## Konfigurace

### Adresář pluginů

Pluginy jsou umístěny v datovém adresáři OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (nebo soubor, na který odkazuje manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) určuje tento adresář ve
třech krocích:

1. **`OMNIROUTE_PLUGINS_DIR`**, pokud je nastavena — použije se beze změny bez ohledu na
   hodnotu `HOME`. Jde o explicitní nastavení pro Docker/K8s, kde je strom pluginů
   připojen pomocí bind mountu do cesty, která obvykle nemá nic společného s domovským
   adresářem kontejneru (#11827).
2. `<home>/.omniroute/plugins`, kde `<home>` pochází z proměnných prostředí `HOME` /
   `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, pokud proces vůbec neexportuje domovský adresář.

Určený adresář se při spuštění jednou zapíše do protokolu jako
`scanner.dir_resolved` spolu se vstupem, který byl použit (`OMNIROUTE_PLUGINS_DIR`,
`home` nebo `no-home-fallback`) — image, který bez upozornění skončí u kroku 3, to tak
výslovně uvede, místo aby pouze ohlásil prázdný seznam pluginů.
`POST /api/plugins/scan` vyhledá všechny podadresáře, které obsahují platný soubor
`plugin.json`, a zaregistruje je; stejný adresář je kořenem, do kterého
`pluginManager.install()` kopíruje pluginy, takže přepsání této cesty přesune
vyhledávání i instalaci společně.

> **`OMNIROUTE_PLUGINS_DIR` není `OMNIROUTE_PLUGIN_PATH`.** Druhou z nich používá pouze
> zavaděč příkazových pluginů CLI (`bin/cli/plugins.mjs`) k vyhledání npm balíčků
> `omniroute-cmd-*`, které přidávají podpříkazy `omniroute` — nemá žádný vliv na zde
> popsaný runtime skener. Informace o této části najdete v [PLUGINS.md](./PLUGINS.md).

### Vlastní URL registru tržiště

Zdroj katalogu tržiště se načítá z nastavení `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` čte `settings.pluginMarketplaceUrl`). Pokud je
nastaveno na URL `http(s)`, `listMarketplacePlugins()` tuto URL načte a přijme buď
JSON pole položek na nejvyšší úrovni, nebo objekt s polem `plugins`; položky bez
řetězcové hodnoty `name` jsou odfiltrovány. Pokud hodnota není nastavena (nebo pokud
načtení neprojde ochranou proti SSRF či vrátí neplatnou odpověď), použije se vestavěný
výchozí registr.

Karta „Marketplace“ na dashboardu obsahuje pole pro tuto URL (zpětně načítanou z
`GET /api/settings`).

> Poznámka k implementaci: akce „Save“ na dashboardu odesílá
> `pluginMarketplaceUrl` do `PATCH /api/settings`. V době psaní tohoto textu není
> tento klíč deklarován v `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), proto předtím, než se na něj začnete
> spoléhat, ověřte ve své verzi jeho perzistenci — cesta pro **čtení**
> (`getSettings()` → `listMarketplacePlugins()`) tento klíč respektuje, jakmile je
> přítomen v úložišti nastavení.

## Zabezpečení

### Úroveň trasy — pouze loopback

Pluginy spouštějí kód v podřízených procesech, proto je celé rozhraní `/api/plugins`
klasifikováno jako `LOCAL_ONLY` (úroveň 1). Kontrola loopbacku probíhá
bezpodmínečně **před** jakoukoli kontrolou autentizace, takže ani uniklý token pro správu,
který se dostane k hostiteli přes tunel, nemůže nainstalovat, aktivovat ani odinstalovat plugin.
Viz [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) a
Pevná pravidla č. 15 / č. 17.

### Ochrana registru tržiště proti SSRF

Vlastní URL registru je konfigurace, kterou může ovlivnit útočník, proto ji
`listMarketplacePlugins()` před načtením zpracuje ve dvou vrstvách:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odmítne vše, co nepoužívá `http:` / `https:`.
   - Odmítne literálně zadané privátní/loopback/link-local/ULA hostitele (IPv4 **i** IPv6,
     včetně IPv4 mapovaných adres) prostřednictvím kanonické funkce `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Přeloží záznamy **`A` i `AAAA`** a odmítne URL, pokud je **kterákoli** přeložená
     adresa privátní — tím eliminuje obcházení typu veřejný název hostitele → privátní IP.
   - **Při selhání přístup zamítne**: selhání překladu DNS vede k odmítnutí URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): při načítání znovu aplikuje kontrolu URL
   pouze pro veřejné adresy a **blokuje přesměrování** (žádný přechod z veřejné na privátní
   adresu přes `30x`).

URL, která neprojde některou z vrstev, požadavek nepřeruší — tržiště
se bez upozornění vrátí k vestavěnému výchozímu registru a zapíše varování do protokolu.

> Tato ochrana byla posílena v PR #3774 konkrétně tak, aby překládala záznamy A + AAAA a používala
> kanonickou funkci `isPrivateHost` namísto kontroly pouze pro IPv4.

### Izolace spouštění pluginů

- **Izolace procesů** — `loadPlugin()` (`src/lib/plugins/loader.ts`) spouští
  každý plugin v samostatném podřízeném procesu Node.js a komunikuje přes IPC.
  Volání hooků mají časový limit s eskalací `SIGTERM` → `SIGKILL`.
- **Seznam povolených proměnných prostředí** — podřízený proces obdrží pouze povolenou sadu proměnných
  prostředí; širší sada je poskytnuta pouze tehdy, když manifest požaduje
  oprávnění `env`.
- **Omezení cest** — operace instalace/upgradu/odinstalace ověřují, že se adresář pluginu
  a cesta `manifest.main` nacházejí **uvnitř** spravovaného kořenového adresáře pluginů,
  a to před jakýmkoli kopírováním nebo rekurzivním mazáním (ochrana proti pozměněným cestám v databázi a
  průchodu pomocí `../` v `manifest.main`). Aktivace překládá symbolické odkazy pomocí
  `realpath` a odmítne načíst vstupní bod, který se nachází mimo adresář
  pluginu.
- **Volitelné připnutí integrity** — manifest může deklarovat pole `integrity`
  (`sha256-<base64>`, formát SRI). Pokud je uvedeno, zavaděč při načítání ověří
  hash vstupního souboru a při neshodě odmítne aktivaci. Jde
  o volitelnou detekci neoprávněných změn, **nikoli** o bezpečnostní hranici — skutečnými hranicemi jsou
  směrování omezené na loopback a model oprávnění.

## Manifest (`plugin.json`)

Ověřováno pomocí `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Pole               | Typ       | Poznámky                                                        |
| ------------------ | --------- | --------------------------------------------------------------- |
| `name`             | string    | Povinné; kebab-case (`^[a-z0-9-]+$`), 1–100 znaků               |
| `version`          | string    | Povinné; semver (`MAJOR.MINOR.PATCH`)                           |
| `description`      | string?   | ≤ 500 znaků                                                     |
| `author`           | string?   | ≤ 200 znaků                                                     |
| `license`          | string?   | Výchozí hodnota je `MIT`                                        |
| `main`             | string?   | Vstupní soubor; výchozí hodnota je `index.js`                   |
| `source`           | enum?     | `local` \| `marketplace` (výchozí hodnota je `local`)           |
| `tags`             | string[]? | Značky pro vyhledávání                                          |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                 |
| `hooks`            | object?   | Logické hodnoty určující, které hooky plugin implementuje       |
| `skills`           | object[]? | Volitelné definice dovedností                                   |
| `enabledByDefault` | boolean?  | Automatická aktivace při instalaci                              |
| `configSchema`     | object?   | Mapa konfiguračních polí (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Volitelné připnutí vstupního souboru `sha256-<base64>`          |

Oprávnění jsou vybírána z výčtu
`network` / `file-read` / `file-write` / `env` / `exec`.

## Průběh životního cyklu

```
instalace (POST /api/plugins, cesta)
  → načtení/ověření manifestu → zkopírování do přípravného adresáře → ověření, že main je uvnitř adresáře
  → atomické přejmenování do ~/.omniroute/plugins/<name> → vložení řádku do DB
  → spuštění onInstall → pokud enabledByDefault: aktivace

aktivace (POST /api/plugins/{name}/activate)
  → kontrola umístění pomocí realpath → loadPlugin() (spuštění podřízeného procesu)
  → registrace deklarovaných hooků → status = "active" → spuštění onActivate

deaktivace (POST /api/plugins/{name}/deactivate)
  → spuštění onDeactivate (PŘED zrušením registrace) → zrušení registrace hooků
  → ukončení podřízeného procesu → status = "inactive"

odinstalace (DELETE /api/plugins/{name})
  → deaktivace, pokud je aktivní → spuštění onUninstall
  → rekurzivní odstranění adresáře pluginu s kontrolou umístění → odstranění řádku z DB
```

Opětovné spuštění `install` nad adresářem, jehož verze v manifestu je **striktně
novější** než nainstalovaná verze, provede automatický upgrade (čistou
reinstalaci; konfigurace se obnoví na výchozí hodnoty). Stejná nebo starší verze
je odmítnuta.

## Databáze

Tabulka `plugins` (migrace `076_create_plugins.sql`):

| Sloupec         | Typ     | Poznámky                                            |
| --------------- | ------- | --------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                |
| `name`          | TEXT    | Jedinečný                                           |
| `version`       | TEXT    | semver; výchozí `1.0.0`                             |
| `description`   | TEXT    | Volitelný                                           |
| `author`        | TEXT    | Volitelný                                           |
| `license`       | TEXT    | Výchozí `MIT`                                       |
| `main`          | TEXT    | Vstupní soubor; výchozí `index.js`                  |
| `source`        | TEXT    | Výchozí `local`                                     |
| `tags`          | TEXT    | Pole JSON; výchozí `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`    |
| `enabled`       | INT     | 0/1; výchozí 0                                      |
| `manifest`      | TEXT    | Kompletní JSON manifestu                            |
| `config`        | TEXT    | JSON; výchozí `{}`                                  |
| `config_schema` | TEXT    | JSON; výchozí `{}`                                  |
| `hooks`         | TEXT    | Pole JSON s názvy deklarovaných hooků; výchozí `[]` |
| `permissions`   | TEXT    | Pole JSON; výchozí `[]`                             |
| `plugin_dir`    | TEXT    | Absolutní instalační adresář                        |
| `error_message` | TEXT    | Nastaveno, když `status = "error"`                  |
| `installed_at`  | TEXT    | `datetime('now')`                                   |
| `updated_at`    | TEXT    | `datetime('now')`                                   |
| `activated_at`  | TEXT    | Nastaveno při aktivaci                              |

Metriky a analytické údaje pluginů jsou sledovány v dalších tabulkách
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Ovládací panel

Stránka ovládacího panelu na adrese `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) obsahuje dvě karty:

- **Nainstalované** — zobrazuje nainstalované pluginy a jejich deklarované
  hooky, přepínač aktivace/deaktivace, tlačítko pro odinstalaci a akci
  „Vyhledat pluginy“ (`POST /api/plugins/scan`).
- **Marketplace** — zobrazuje katalog získaný pomocí `GET /api/plugins/marketplace`
  a pole pro nastavení vlastní URL registru.

Konfigurační stránka jednotlivého pluginu je dostupná na adrese
`/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Viz také

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  proč je `/api/plugins` přístupné pouze přes loopback (úroveň 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — související framework dovedností
  (`src/lib/skills/`); pluginy mohou deklarovat dovednosti ve svém manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — odchozí integrace řízené
  událostmi
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  vzor `buildErrorBody()`, který každá trasa pluginu používá pro chybové odpovědi
