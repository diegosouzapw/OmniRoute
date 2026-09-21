# Plugin Marketplace (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Izvor istine:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` i
> `src/app/(dashboard)/dashboard/plugins/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute dolazi sa sustavom dodataka nalik onome u WordPressu. Dodaci su samostalni
direktoriji — svaki s manifestom `plugin.json` i ulaznom datotekom — koji se povezuju
s tijekom obrade zahtjeva (`onRequest` / `onResponse` / `onError`) i
događajima životnog ciklusa (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Trgovina dodataka** sloj je za otkrivanje izgrađen povrh tog sustava. Ona
nudi katalog dostupnih dodataka koji se može pregledavati. Prema zadanim postavkama katalog je
mali ugrađeni početni registar; operator ga može usmjeriti na prilagođeni URL
udaljenog registra, pri čemu je dohvaćanje zaštićeno SSRF zaštitom s razrješavanjem DNS-a
(pogledajte [Sigurnost](#security)).

Sve rute dodataka dostupne su **samo preko povratne petlje** (razina 1 — `LOCAL_ONLY`): dodaci učitavaju
i izvršavaju kôd u podređenim procesima, stoga rute nisu dostupne iz izvora koji nije
povratna petlja, bez obzira na autentifikaciju. Pogledajte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kako sve funkcionira zajedno

```
Nadzorna ploča (/dashboard/plugins)
  ├─ Kartica "Instalirano" → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (deinstalacija)
  └─ Kartica "Trgovina"    → GET /api/plugins/marketplace
                               → listMarketplacePlugins()
                                 ├─ nema prilagođenog URL-a → ugrađeni SEED_REGISTRY
                                 └─ prilagođeni URL → isSafeMarketplaceUrl() SSRF zaštita
                                                     → safeOutboundFetch(guard:"public-only")
```

- **Sloj registra** — `src/lib/plugins/marketplace.ts`: prikazuje / pretražuje
  katalog, uz povratak na početni registar u slučaju bilo kakvog neuspjeha.
- **Sloj životnog ciklusa** — `src/lib/plugins/manager.ts` (jedinstvena instanca `pluginManager`):
  instalacija, nadogradnja, aktivacija, deaktivacija, deinstalacija, skeniranje i učitavanje pri pokretanju.
- **Sloj manifesta** — `src/lib/plugins/manifest.ts`: Zod shema i zadane vrijednosti za
  `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: otkriva dodatke na disku unutar
  direktorija dodataka.
- **Učitavač** — `src/lib/plugins/loader.ts`: pokreće svaki dodatak u izoliranom
  podređenom procesu i posreduje pozive kuka putem IPC-a.

## Katalog trgovine

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vraća popis
objekata `MarketplaceEntry`:

| Polje         | Vrsta    | Napomene                                     |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | Naziv dodatka u formatu kebab-case           |
| `version`     | string   | semver                                       |
| `description` | string   | Kratak sažetak                               |
| `author`      | string   | Autor / organizacija                         |
| `license`     | string   | Identifikator licence u stilu SPDX-a         |
| `downloadUrl` | string   | URL za preuzimanje izvora (može biti prazan) |
| `repository`  | string?  | Neobavezni URL repozitorija                  |
| `tags`        | string[] | Oznake za pretraživanje/filtriranje          |
| `downloads`   | number   | Broj preuzimanja                             |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Je li unos označen kao provjeren             |
| `lastUpdated` | string   | Datumski niz približno u ISO formatu         |

Kada nije konfiguriran prilagođeni URL registra, katalog je ugrađeni
`SEED_REGISTRY` (trenutačno `request-logger`, `rate-limiter`, `cost-tracker` i
`theme-manager`). Početni registar uvijek je dostupan — ako je konfigurirani udaljeni
registar nedostupan, vrati status koji nije `200` ili vrati neprepoznato
tijelo, `listMarketplacePlugins()` bilježi upozorenje i vraća se na početni popis.

> Napomena: **katalog** trgovine (pregledavanje/pretraživanje) povezan je od početka do kraja, ali
> **instalacija** jednim klikom iz kataloga još nije implementirana —
> gumb "Instaliraj" na unosu trgovine na nadzornoj ploči trenutačno prikazuje
> obavijest "uskoro dostupno". Instalacija se trenutačno obavlja putem postupka instalacije
> s lokalne putanje (`POST /api/plugins`) i otkrivanja na disku (`POST /api/plugins/scan`).

## REST API

Sve krajnje točke zahtijevaju autentifikaciju za upravljanje (`requireManagementAuth`) **i**
dostupne su samo putem povratne petlje — `/api/plugins` i `/api/plugins/` navedeni su u
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Krajnja točka                    | Metoda | Opis                                                                      |
| -------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Popis instaliranih dodataka (neobavezni filtar `?status=`)                |
| `/api/plugins`                   | POST   | Instaliranje dodatka s apsolutne lokalne putanje                          |
| `/api/plugins/scan`              | POST   | Skeniranje direktorija dodataka i registriranje novih dodataka            |
| `/api/plugins/marketplace`       | GET    | Popis stavki kataloga trgovine dodataka                                   |
| `/api/plugins/[name]`            | GET    | Dohvaćanje pojedinosti instaliranog dodatka                               |
| `/api/plugins/[name]`            | DELETE | Deinstaliranje dodatka                                                    |
| `/api/plugins/[name]/activate`   | POST   | Aktiviranje (učitavanje + registriranje kuka)                             |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiviranje (pokretanje `onDeactivate`, poništavanje registracije kuka) |
| `/api/plugins/[name]/config`     | GET    | Dohvaćanje konfiguracije dodatka + konfiguracijske sheme                  |
| `/api/plugins/[name]/config`     | PUT    | Ažuriranje konfiguracije dodatka (provjereno prema shemi)                 |

Filtar `status` za `GET /api/plugins` prihvaća jednu od vrijednosti
`installed` / `active` / `inactive` / `error`. Nevaljana vrijednost vraća `400`.

### Popis instaliranih dodataka

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instaliranje s lokalne putanje

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` mora biti **apsolutna** i ne smije sadržavati segmente obilaska `..` ni
nul-bajtove (što provjerava Zod). Izvorni direktorij mora sadržavati valjanu datoteku
`plugin.json` (ili joj biti nadređeni direktorij). U slučaju uspjeha odgovor je `201` s
retkom instaliranog dodatka.

### Pregledavanje trgovine dodataka

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Ažuriranje konfiguracije dodatka

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` provjerava svaku navedenu vrijednost prema `configSchema`
dodatka (deklariranoj u manifestu): polja `number` poštuju `min`/`max`, a polja
`select` moraju odgovarati deklariranoj vrijednosti `enum`. Ključevi koji nisu
prisutni u shemi propuštaju se.

## Konfiguracija

### Direktorij dodataka

Dodaci se nalaze unutar podatkovnog direktorija OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ili bilo što na što upućuje manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) određuje taj direktorij u
tri koraka:

1. **`OMNIROUTE_PLUGINS_DIR`**, kada je postavljen — koristi se doslovno, neovisno o vrijednosti `HOME`. To je
   izričita postavka za Docker/K8s, gdje je stablo dodataka vezano montirano na putanji
   koja obično nema nikakve veze s početnim direktorijem spremnika (#11827).
2. `<home>/.omniroute/plugins`, gdje se `<home>` dobiva iz varijabli okruženja `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kada proces uopće ne izvozi početni direktorij.

Određeni direktorij zapisuje se jednom pri pokretanju kao `scanner.dir_resolved`, uz navođenje
odabranog ulaza (`OMNIROUTE_PLUGINS_DIR`, `home` ili `no-home-fallback`) — tako slika
koja neprimjetno završi na 3. koraku to izričito navodi, umjesto da samo prijavi prazan popis dodataka.
`POST /api/plugins/scan` otkriva svaki poddirektorij koji sadržava valjanu datoteku
`plugin.json` i registrira ga; isti je direktorij korijen u koji
`pluginManager.install()` kopira dodatke, pa nadjačavanje zajedno premješta otkrivanje i
instalaciju.

> **`OMNIROUTE_PLUGINS_DIR` nije `OMNIROUTE_PLUGIN_PATH`.** Potonju vrijednost čita samo
> učitavač naredbenih dodataka CLI-ja (`bin/cli/plugins.mjs`) kako bi pronašao npm
> pakete `omniroute-cmd-*` koji dodaju podnaredbe naredbi `omniroute` — ona nema utjecaja na skener tijekom izvođenja
> opisan ovdje. Za taj dio pogledajte [PLUGINS.md](./PLUGINS.md).

### Prilagođeni URL registra trgovine dodataka

Izvor kataloga trgovine dodataka čita se iz postavke `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` čita `settings.pluginMarketplaceUrl`). Kada
je postavljen na `http(s)` URL, `listMarketplacePlugins()` dohvaća taj URL i prihvaća
ili JSON polje stavki najviše razine ili objekt s poljem `plugins`;
stavke bez znakovnog `name` filtriraju se. Kada nije postavljen (ili kada dohvaćanje
ne prođe SSRF zaštitu / vrati neispravan odgovor), upotrebljava se ugrađeni početni registar.

Kartica "Trgovina dodataka" na nadzornoj ploči prikazuje polje za ovaj URL (koje se ponovno učitava putem
`GET /api/settings`).

> Napomena o implementaciji: radnja "Spremi" na nadzornoj ploči šalje
> `pluginMarketplaceUrl` na `PATCH /api/settings`. U trenutku pisanja ovaj
> ključ nije deklariran u `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), stoga prije oslanjanja na njega provjerite trajnost postavke u svojem
> izdanju — putanja za **čitanje** (`getSettings()` →
> `listMarketplacePlugins()`) poštuje ključ nakon što je prisutan u spremištu
> postavki.

## Sigurnost

### Razina rute — samo povratna petlja

Dodaci izvršavaju kôd u pokrenutim podređenim procesima, pa je cijela površina
`/api/plugins` klasificirana kao `LOCAL_ONLY` (razina 1). Ograničenje na povratnu
petlju primjenjuje se bezuvjetno **prije** bilo kakve provjere autentifikacije,
pa se čak ni pomoću otkrivenog upravljačkog tokena koji do računala stigne kroz
tunel ne može instalirati, aktivirati ili deinstalirati dodatak. Pogledajte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) i stroga
pravila #15 / #17.

### SSRF zaštita registra trgovine

Prilagođeni URL registra konfiguracija je na koju napadač može utjecati, pa ga
prije dohvaćanja `listMarketplacePlugins()` provjerava kroz dva sloja:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odbija sve što nije `http:` / `https:`.
   - Odbija doslovne privatne hostove, hostove povratne petlje, lokalne adrese
     veze i ULA hostove (IPv4 **i** IPv6, uključujući IPv4-mapirane adrese)
     putem kanonske funkcije `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Razrješava zapise **i** `A` i `AAAA` te odbija URL ako je **bilo koja**
     razriješena adresa privatna — čime se zatvara mogućnost zaobilaženja putem
     javnog naziva hosta → privatne IP adrese.
   - **Odbija u slučaju pogreške**: neuspjelo DNS razrješavanje uzrokuje
     odbijanje URL-a.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): pri dohvaćanju ponovno
   primjenjuje zaštitu URL-a samo za javne adrese i **blokira preusmjeravanja**
   (nema prijelaza s javne na privatnu adresu putem odgovora `30x`).

URL koji ne prođe bilo koji od ovih slojeva ne prekida zahtjev — trgovina se
neprimjetno vraća na ugrađeni početni registar i bilježi upozorenje.

> Ova je zaštita ojačana u PR-u #3774 posebno kako bi razrješavala A + AAAA
> zapise i koristila kanonsku funkciju `isPrivateHost` umjesto provjere
> ograničene samo na IPv4.

### Izolacija izvršavanja dodataka

- **Izolacija procesa** — `loadPlugin()` (`src/lib/plugins/loader.ts`) pokreće
  svaki dodatak u zasebnom podređenom procesu Node.js-a i komunicira putem
  IPC-a. Pozivi kvačica imaju vremensko ograničenje s eskalacijom `SIGTERM` →
  `SIGKILL`.
- **Popis dopuštenih varijabli okruženja** — podređeni proces prima samo
  dopušteni skup varijabli okruženja; širi skup odobrava se samo kada manifest
  zatraži dopuštenje `env`.
- **Ograničavanje putanja** — instalacija, nadogradnja i deinstalacija
  provjeravaju razrješavaju li se direktorij dodatka i `manifest.main`
  **unutar** upravljanog korijenskog direktorija dodataka prije bilo kakvog
  kopiranja ili rekurzivnog brisanja (zaštita od neovlašteno izmijenjenih
  putanja u bazi podataka i prolaska kroz `../` u `manifest.main`). Aktivacija
  razrješava simboličke veze pomoću `realpath` i odbija učitati ulaznu točku
  koja izlazi iz direktorija dodatka.
- **Neobavezna provjera integriteta** — manifest može deklarirati polje
  `integrity` (`sha256-<base64>`, format SRI). Kada je ono prisutno, učitavač
  pri učitavanju provjerava sažetak ulazne datoteke i odbija aktivaciju ako se
  vrijednosti ne podudaraju. To je neobavezno otkrivanje neovlaštenih izmjena,
  **a ne** sigurnosna granica — usmjeravanje ograničeno na povratnu petlju i
  model dopuštenja stvarne su granice.

## Manifest (`plugin.json`)

Provjerava ga `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Polje              | Vrsta     | Napomene                                                           |
| ------------------ | --------- | ------------------------------------------------------------------ |
| `name`             | string    | Obavezno; kebab-case (`^[a-z0-9-]+$`), 1–100 znakova               |
| `version`          | string    | Obavezno; semver (`MAJOR.MINOR.PATCH`)                             |
| `description`      | string?   | ≤ 500 znakova                                                      |
| `author`           | string?   | ≤ 200 znakova                                                      |
| `license`          | string?   | Zadana vrijednost je `MIT`                                         |
| `main`             | string?   | Ulazna datoteka; zadana vrijednost je `index.js`                   |
| `source`           | enum?     | `local` \| `marketplace` (zadana vrijednost je `local`)            |
| `tags`             | string[]? | Oznake za pretraživanje                                            |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                    |
| `hooks`            | object?   | Logičke vrijednosti koje navode koje kvačice dodatak implementira  |
| `skills`           | object[]? | Neobavezne definicije vještina                                     |
| `enabledByDefault` | boolean?  | Automatska aktivacija pri instalaciji                              |
| `configSchema`     | object?   | Mapa konfiguracijskih polja (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Neobavezna `sha256-<base64>` provjera ulazne datoteke              |

Dopuštenja se odabiru iz enumeracije
`network` / `file-read` / `file-write` / `env` / `exec`.

## Tijek životnog ciklusa

```
instalacija (POST /api/plugins, putanja)
  → skeniraj/provjeri manifest → kopiraj u pripremni direktorij → potvrdi da je glavna datoteka unutar direktorija
  → atomski preimenuj u ~/.omniroute/plugins/<name> → umetni redak u bazu podataka
  → pokreni onInstall → ako je enabledByDefault: aktiviraj

aktivacija (POST /api/plugins/{name}/activate)
  → provjera sadržanosti pomoću realpath → loadPlugin() (pokreni podređeni proces)
  → registriraj deklarirane kuke → status = "active" → pokreni onActivate

deaktivacija (POST /api/plugins/{name}/deactivate)
  → pokreni onDeactivate (PRIJE poništavanja registracije) → poništi registraciju kuka
  → prekini podređeni proces → status = "inactive"

deinstalacija (DELETE /api/plugins/{name})
  → deaktiviraj ako je aktivan → pokreni onUninstall
  → rekurzivno izbriši direktorij dodatka uz provjeru sadržanosti → izbriši redak iz baze podataka
```

Ponovno pokretanje naredbe `install` nad direktorijem čija je verzija manifesta **strogo
novija** od instalirane verzije automatski izvršava nadogradnju (čista ponovna instalacija; konfiguracija se vraća
na zadane vrijednosti). Ista ili starija verzija se odbija.

## Baza podataka

Tablica `plugins` (migracija `076_create_plugins.sql`):

| Stupac          | Vrsta   | Napomene                                         |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | Jedinstveno                                      |
| `version`       | TEXT    | semver; zadano `1.0.0`                           |
| `description`   | TEXT    | Neobavezno                                       |
| `author`        | TEXT    | Neobavezno                                       |
| `license`       | TEXT    | Zadano `MIT`                                     |
| `main`          | TEXT    | Ulazna datoteka; zadano `index.js`               |
| `source`        | TEXT    | Zadano `local`                                   |
| `tags`          | TEXT    | JSON polje; zadano `[]`                          |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; zadano 0                                    |
| `manifest`      | TEXT    | Cijeli JSON manifesta                            |
| `config`        | TEXT    | JSON; zadano `{}`                                |
| `config_schema` | TEXT    | JSON; zadano `{}`                                |
| `hooks`         | TEXT    | JSON polje deklariranih naziva kuka; zadano `[]` |
| `permissions`   | TEXT    | JSON polje; zadano `[]`                          |
| `plugin_dir`    | TEXT    | Apsolutni instalacijski direktorij               |
| `error_message` | TEXT    | Postavlja se kada je `status = "error"`          |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | Postavlja se pri aktivaciji                      |

Metrike i analitika dodataka prate se u dodatnim tablicama
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Nadzorna ploča

Stranica nadzorne ploče na `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) sadrži dvije kartice:

- **Instalirano** — navodi instalirane dodatke s njihovim deklariranim kukama, prekidačem za
  aktivaciju/deaktivaciju, gumbom za deinstalaciju i radnjom „Skeniraj dodatke”
  (`POST /api/plugins/scan`).
- **Tržište** — prikazuje katalog dohvaćen putem `GET /api/plugins/marketplace` s
  poljem za postavljanje prilagođenog URL-a registra.

Stranica za konfiguraciju pojedinačnog dodatka nalazi se na `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vidi također

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  zašto je `/api/plugins` dostupan samo putem povratne petlje (razina 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — povezani okvir vještina
  (`src/lib/skills/`); dodaci mogu deklarirati vještine u svojem manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — izlazne integracije
  pokretane događajima
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  obrazac `buildErrorBody()` koji svaka ruta dodatka koristi za odgovore o pogreškama
