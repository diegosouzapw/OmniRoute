# PLUGIN_MARKETPLACE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

# Tržište dodataka

> **Izvor istine:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, i
> `src/app/(dashboard)/dashboard/plugins/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute isporučuje sistem dodataka u WordPress stilu. Dodaci su samostalni direktoriji — svaki sa `plugin.json` manifestom i ulaznom datotekom — koji se povezuju na cjevovod zahtjeva (`onRequest` / `onResponse` / `onError`) i na događaje životnog ciklusa (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Tržište dodataka** (Plugin Marketplace) je sloj za otkrivanje iznad tog sistema. Ono izlaže katalog dodataka koji se mogu instalirati i koji se može pregledavati. Po zadanim postavkama, katalog je mali ugrađeni početni registar; operater ga može usmjeriti na prilagođeni URL udaljenog registra, u kojem slučaju je dohvaćanje ojačano SSRF zaštitom koja razrješava DNS (pogledajte [Sigurnost](#security)).

Svaka ruta dodatka je **samo za povratnu petlju (loopback)** (Nivo 1 — `LOCAL_ONLY`): dodaci učitavaju i izvršavaju kod u podprocesima, tako da su rute nedostupne iz izvora koji nije povratna petlja bez obzira na autentifikaciju. Pogledajte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kako se sve uklapa

```
Kontrolna tabla (/dashboard/plugins)
  ├─ "Instalirano" kartica  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Tržište" kartica → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ nema prilagođenog URL-a → ugrađeni SEED_REGISTRY
                            └─ prilagođeni URL → isSafeMarketplaceUrl() SSRF zaštita
                                          → safeOutboundFetch(guard:"public-only")
```

- **Sloj registra** — `src/lib/plugins/marketplace.ts`: navodi / pretražuje katalog, vraćajući se na početni registar u slučaju bilo kakvog neuspjeha.
- **Sloj životnog ciklusa** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalacija, nadogradnja, aktivacija, deaktivacija, deinstalacija, skeniranje, učitavanje pri pokretanju.
- **Sloj manifesta** — `src/lib/plugins/manifest.ts`: Zod shema + zadane vrijednosti za `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: otkriva dodatke na disku unutar direktorija dodataka.
- **Učitavač** — `src/lib/plugins/loader.ts`: pokreće svaki dodatak u izolovanom podprocesu i posreduje pozive hook-ova putem IPC-a.

## Katalog tržišta

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vraća listu `MarketplaceEntry` objekata:

| Polje         | Tip      | Bilješke                                     |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | ime dodatka u kebab-case formatu             |
| `version`     | string   | semver                                       |
| `description` | string   | Kratki sažetak                               |
| `author`      | string   | Autor / org                                  |
| `license`     | string   | ID licence u SPDX stilu                      |
| `downloadUrl` | string   | URL za preuzimanje izvora (može biti prazan) |
| `repository`  | string?  | Opcioni URL repozitorija                     |
| `tags`        | string[] | Oznake za pretragu/filtriranje               |
| `downloads`   | number   | Broj preuzimanja                             |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Da li je unos označen kao provjeren          |
| `lastUpdated` | string   | ISO-ish datumski string                      |

Kada nije konfigurisan prilagođeni URL registra, katalog je ugrađeni `SEED_REGISTRY` (trenutno `request-logger`, `rate-limiter`, `cost-tracker` i `theme-manager`). Početni registar je uvijek dostupan — ako je konfigurisan udaljeni registar nedostupan, vraća status koji nije `200` ili vraća neprepoznatljivo tijelo odgovora, `listMarketplacePlugins()` bilježi upozorenje i vraća se na početnu listu.

> Napomena: katalog tržišta (pregled/pretraga) je povezan od kraja do kraja, ali instalacija na tržištu jednim klikom iz kataloga još nije implementirana — dugme "Instaliraj" na kontrolnoj tabli za unos na tržištu trenutno prikazuje obavijest "uskoro". Instalacija se danas odvija kroz tok instalacije lokalne putanje (`POST /api/plugins`) i otkrivanje na disku (`POST /api/plugins/scan`).

## REST API

Svi krajnji punktovi (endpoints) zahtijevaju upravljačku autentifikaciju (`requireManagementAuth`) **i** dostupni su samo putem loopback-a — `/api/plugins` i `/api/plugins/` su navedeni u `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Metoda | Opis                                                        |
| -------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/plugins`                   | GET    | Listiraj instalirane dodatke (opcionalni `?status=` filter) |
| `/api/plugins`                   | POST   | Instaliraj dodatak sa apsolutne lokalne putanje             |
| `/api/plugins/scan`              | POST   | Skeniraj direktorij dodataka i registriraj nove dodatke     |
| `/api/plugins/marketplace`       | GET    | Listiraj unose u katalogu tržišta (marketplace)             |
| `/api/plugins/[name]`            | GET    | Dohvati detalje instaliranog dodatka                        |
| `/api/plugins/[name]`            | DELETE | Deinstaliraj dodatak                                        |
| `/api/plugins/[name]/activate`   | POST   | Aktiviraj (učitaj + registriraj hook-ove)                   |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiviraj (pokreni `onDeactivate`, odjavi hook-ove)       |
| `/api/plugins/[name]/config`     | GET    | Dohvati konfiguraciju dodatka + konfiguracijsku shemu       |
| `/api/plugins/[name]/config`     | PUT    | Ažuriraj konfiguraciju dodatka (validirano prema shemi)     |

`status` filter za `GET /api/plugins` prihvata jednu od vrijednosti `installed` / `active` / `inactive` / `error`. Neispravna vrijednost vraća `400`.

### Listiraj instalirane dodatke

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalacija sa lokalne putanje

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` mora biti **apsolutna** i ne smije sadržavati `..` segmente za navigaciju ili null bajtove (što provjerava Zod). Izvorni direktorij mora sadržavati validan `plugin.json` (ili biti roditelj istog). U slučaju uspjeha, odgovor je `201` sa redom instaliranog dodatka.

### Pregled tržišta (marketplace)

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

`PUT .../config` validira svaku pruženu vrijednost prema `configSchema` dodatka (deklariranoj u manifestu): `number` polja poštuju `min`/`max`, `select` polja moraju odgovarati deklariranom `enum`-u. Ključevi koji nisu prisutni u shemi su dozvoljeni.

## Konfiguracija

### Direktorij dodataka

Dodaci se nalaze u OmniRoute podatkovnom direktoriju:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ili na šta god manifest.main ukazuje)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) razrješava taj direktorij u tri koraka:

1. **`OMNIROUTE_PLUGINS_DIR`**, kada je postavljen — koristi se doslovno, bez obzira na to šta `HOME` kaže. Ovo je eksplicitna kontrola za Docker/K8s, gdje je stablo dodataka bind-mountano na putanju koja obično nema nikakve veze sa početnim (home) direktorijem kontejnera (#11827).
2. `<home>/.omniroute/plugins`, gdje `<home>` dolazi iz `HOME` / `USERPROFILE` varijabli okruženja.
3. `/tmp/.omniroute/plugins`, kada proces uopće ne eksportuje home.

Razriješeni direktorij se loguje jednom pri pokretanju kao `scanner.dir_resolved`, imenujući ulaz koji je pobijedio (`OMNIROUTE_PLUGINS_DIR`, `home`, ili `no-home-fallback`) — tako da slika (image) koja tiho završi na koraku 3 to i prijavi, umjesto da samo prijavi praznu listu dodataka. `POST /api/plugins/scan` otkriva bilo koji poddirektorij tamo koji sadrži validan `plugin.json` i registruje ga; isti direktorij je korijen u koji `pluginManager.install()` kopira dodatke, tako da override pomjera otkrivanje i instalaciju zajedno.

> **`OMNIROUTE_PLUGINS_DIR` nije `OMNIROUTE_PLUGIN_PATH`.** Potonje čita samo CLI učitavač komandnih dodataka (`bin/cli/plugins.mjs`) kako bi pronašao `omniroute-cmd-*` npm pakete koji dodaju `omniroute` podkomande — to nema nikakvog efekta na runtime skener opisan ovdje. Pogledajte [PLUGINS.md](./PLUGINS.md) za tu stranu.

### Prilagođeni URL registra tržišta

Izvor kataloga tržišta se čita iz `pluginMarketplaceUrl` postavke (`src/lib/plugins/marketplace.ts` čita `settings.pluginMarketplaceUrl`). Kada je postavljen na `http(s)` URL, `listMarketplacePlugins()` dohvaća taj URL i prihvata ili JSON niz unosa na najvišem nivou ili objekat sa `plugins` nizom; unosi bez stringa `name` se filtriraju. Kada nije postavljen (ili kada dohvaćanje ne prođe SSRF zaštitu / vrati loš odgovor), koristi se ugrađeni početni registar.

Kartica "Marketplace" na kontrolnoj ploči (dashboard) izlaže polje za ovaj URL (koje se čita nazad iz `GET /api/settings`).

> Napomena o implementaciji: akcija "Save" na kontrolnoj ploči šalje `pluginMarketplaceUrl` na `PATCH /api/settings`. U trenutku pisanja, ovaj ključ nije deklarisan u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`), stoga provjerite perzistenciju u vašem izdanju prije nego što se oslonite na njega — **putanja čitanja** (`getSettings()` → `listMarketplacePlugins()`) poštuje ključ čim je prisutan u skladištu postavki.

## Sigurnost

### Nivo rute — samo loopback

Dodaci izvršavaju kod u pokrenutim podprocesima, tako da je cijela površina `/api/plugins` klasifikovana kao `LOCAL_ONLY` (Nivo 1). Sprovođenje loopback-a se izvršava bezuslovno **prije** bilo kakve provjere autentifikacije, tako da iscureni token za upravljanje koji stigne do uređaja putem tunela i dalje ne može instalirati, aktivirati ili deinstalirati dodatak. Pogledajte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) i Hard Rules #15 / #17.

### Marketplace registry SSRF zaštita

Prilagođeni URL registra je konfiguracija na koju napadač može uticati, pa ga `listMarketplacePlugins()` prije preuzimanja provlači kroz dva sloja:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odbija sve što nije `http:` / `https:`.
   - Odbija literalne privatne/loopback/link-local/ULA hostove (IPv4 **i** IPv6, uključujući IPv4-mapped) putem kanonskog `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Razrješava **oba** `A` i `AAAA` zapisa i odbija ako je **bilo koja** razriješena adresa privatna — zatvarajući zaobilaznicu public-hostname → private-IP.
   - **Zatvoreno u slučaju greške**: neuspjeh DNS razrješavanja odbija URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): ponovo primjenjuje zaštitu URL-a samo za javne adrese u trenutku preuzimanja i **blokira preusmjeravanja** (nema public → private `30x` pivot-a).

URL koji ne prođe kroz bilo koji od ova dva sloja ne prekida zahtjev — marketplace se tiho vraća na ugrađeni početni registar i bilježi upozorenje.

> Ova zaštita je ojačana u PR #3774 posebno radi razrješavanja A + AAAA zapisa i korištenja kanonskog `isPrivateHost` umjesto provjere samo za IPv4.

### Izolacija izvršavanja dodataka

- **Izolacija procesa** — `loadPlugin()` (`src/lib/plugins/loader.ts`) pokreće svaki dodatak u zasebnom Node.js podprocesu i komunicira putem IPC-a. Pozivi hook-ova imaju vremensko ograničenje sa eskalacijom `SIGTERM` → `SIGKILL`.
- **Lista dozvoljenih varijabli okruženja (Env allowlist)** — podproces prima samo listu dozvoljenih varijabli okruženja; širi skup se dodjeljuje samo kada manifest zahtijeva `env` dozvolu.
- **Ograničenje putanje (Path containment)** — instalacija/nadogradnja/deinstalacija potvrđuju da se direktorij dodatka i `manifest.main` razrješavaju **unutar** korijena upravljanih dodataka prije bilo kakvog kopiranja ili rekurzivnog brisanja (štiti od manipulisanih putanja u bazi podataka i `../` traversal-a u `manifest.main`). Aktivacija razrješava simboličke veze (symlinks) putem `realpath` i odbija učitati ulaznu tačku koja izlazi izvan direktorija dodatka.
- **Opcioni integritet (integrity pin)** — manifest može deklarisati polje `integrity` (`sha256-<base64>`, SRI format). Kada je prisutno, loader verifikuje heš ulazne datoteke u trenutku učitavanja i odbija aktivaciju u slučaju neusklađenosti. To je opciona detekcija neovlaštenih izmjena, **nije** sigurnosna granica — loopback-only rutiranje i model dozvola su stvarne granice.

## Manifest (`plugin.json`)

Validirano pomoću `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Polje              | Tip       | Napomene                                                               |
| ------------------ | --------- | ---------------------------------------------------------------------- |
| `name`             | string    | Obavezno; kebab-case (`^[a-z0-9-]+$`), 1–100 znakova                   |
| `version`          | string    | Obavezno; semver (`MAJOR.MINOR.PATCH`)                                 |
| `description`      | string?   | ≤ 500 znakova                                                          |
| `author`           | string?   | ≤ 200 znakova                                                          |
| `license`          | string?   | Podrazumijevano `MIT`                                                  |
| `main`             | string?   | Ulazna datoteka; podrazumijevano `index.js`                            |
| `source`           | enum?     | `local` \| `marketplace` (podrazumijevano `local`)                     |
| `tags`             | string[]? | Tagovi za pretragu                                                     |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | object?   | Booleove vrijednosti koje deklarišu koje hook-ove dodatak implementira |
| `skills`           | object[]? | Opcione definicije vještina                                            |
| `enabledByDefault` | boolean?  | Automatska aktivacija pri instalaciji                                  |
| `configSchema`     | object?   | Mapa konfiguracionih polja (`string`/`number`/`boolean`/`select`)      |
| `integrity`        | string?   | Opcioni `sha256-<base64>` pin ulazne datoteke                          |

Dozvole se izvlače iz enuma `network` / `file-read` / `file-write` / `env` / `exec`.

## Tok životnog ciklusa

```
install (POST /api/plugins, path)
  → skeniraj/validiraj manifest → kopiraj u staging → potvrdi main unutar direktorija
  → atomsko preimenovanje u ~/.omniroute/plugins/<name> → umetni red u bazu podataka
  → pokreni onInstall → ako je enabledByDefault: aktiviraj

activate (POST /api/plugins/{name}/activate)
  → provjera realpath sadržaja → loadPlugin() (pokreni podproces)
  → registriraj deklarirane hookove → status = "active" → pokreni onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → pokreni onDeactivate (PRIJE unregister) → poništi registraciju hookova
  → ubij podproces → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktiviraj ako je aktivan → pokreni onUninstall
  → rekurzivno brisanje direktorija dodatka uz provjeru sadržaja → obriši red iz baze podataka
```

Ponovno pokretanje `install` na direktoriju čija je verzija manifesta **strogo novija** od instalirane verzije automatski vrši nadogradnju (čista reinstalacija; konfiguracija se vraća na zadane vrijednosti). Ista ili starija verzija se odbija.

## Baza podataka

Tabela `plugins` (migracija `076_create_plugins.sql`):

| Kolona          | Tip     | Bilješke                                          |
| --------------- | ------- | ------------------------------------------------- |
| `id`            | TEXT PK | UUID                                              |
| `name`          | TEXT    | Jedinstveno                                       |
| `version`       | TEXT    | semver; zadano `1.0.0`                            |
| `description`   | TEXT    | Opcionalno                                        |
| `author`        | TEXT    | Opcionalno                                        |
| `license`       | TEXT    | Zadano `MIT`                                      |
| `main`          | TEXT    | Ulazna datoteka; zadano `index.js`                |
| `source`        | TEXT    | Zadano `local`                                    |
| `tags`          | TEXT    | JSON niz; zadano `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`  |
| `enabled`       | INT     | 0/1; zadano 0                                     |
| `manifest`      | TEXT    | Puni JSON manifest                                |
| `config`        | TEXT    | JSON; zadano `{}`                                 |
| `config_schema` | TEXT    | JSON; zadano `{}`                                 |
| `hooks`         | TEXT    | JSON niz deklariranih naziva hookova; zadano `[]` |
| `permissions`   | TEXT    | JSON niz; zadano `[]`                             |
| `plugin_dir`    | TEXT    | Apsolutni instalacijski direktorij                |
| `error_message` | TEXT    | Postavljeno kada je `status = "error"`            |
| `installed_at`  | TEXT    | `datetime('now')`                                 |
| `updated_at`    | TEXT    | `datetime('now')`                                 |
| `activated_at`  | TEXT    | Postavljeno pri aktivaciji                        |

Metrike/analitika dodataka se prate u dodatnim tabelama (`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Kontrolna tabla

Stranica kontrolne table na `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) nudi dvije kartice:

- **Instalirano** — navodi instalirane dodatke sa njihovim deklarisanim kukama, prekidačem za aktivaciju/deaktivaciju, dugmetom za deinstalaciju i akcijom „Skeniraj dodatke“ (`POST /api/plugins/scan`).
- **Marketplace** — prikazuje katalog sa `GET /api/plugins/marketplace` sa poljem za postavljanje prilagođenog URL-a registra.

Stranica za konfiguraciju po dodatku se nalazi na `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vidi također

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  zašto je `/api/plugins` isključivo loopback (Nivo 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — povezani okvir vještina
  (`src/lib/skills/`); dodaci mogu deklarisati vještine u svom manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — odlazne integracije vođene događajima
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  obrazac `buildErrorBody()` koji svaka ruta dodatka koristi za odgovore o greškama
