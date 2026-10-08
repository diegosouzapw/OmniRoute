# Plugin Marketplace (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Zdroj pravdy:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` a
> `src/app/(dashboard)/dashboard/plugins/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute obsahuje systém pluginov v štýle WordPressu. Pluginy sú samostatné
adresáre — každý so súborom manifestu `plugin.json` a vstupným súborom — ktoré sa
pripájajú k spracovaniu požiadaviek (`onRequest` / `onResponse` / `onError`) a k
udalostiam životného cyklu (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Trhovisko pluginov** je vrstva na vyhľadávanie nad týmto systémom. Poskytuje
prehľadávateľný katalóg pluginov dostupných na inštaláciu. V predvolenom nastavení
je katalóg malým vstavaným počiatočným registrom; prevádzkovateľ ho môže nasmerovať
na vlastnú adresu URL vzdialeného registra. V takom prípade je načítanie zabezpečené
ochranou proti SSRF s prekladom DNS (pozrite si časť [Zabezpečenie](#security)).

Každá trasa pluginov je dostupná **iba cez loopback** (úroveň 1 — `LOCAL_ONLY`):
pluginy načítavajú a spúšťajú kód v podriadených procesoch, takže trasy sú bez
ohľadu na autentifikáciu nedostupné z akéhokoľvek zdroja mimo loopbacku. Pozrite si
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Ako to funguje spolu

```
Ovládací panel (/dashboard/plugins)
  ├─ Karta „Nainštalované“ → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (odinštalovanie)
  └─ Karta „Trhovisko“     → GET /api/plugins/marketplace
                               → listMarketplacePlugins()
                                 ├─ bez vlastnej adresy URL → vstavaný SEED_REGISTRY
                                 └─ vlastná adresa URL → ochrana SSRF isSafeMarketplaceUrl()
                                                       → safeOutboundFetch(guard:"public-only")
```

- **Vrstva registra** — `src/lib/plugins/marketplace.ts`: zobrazuje a prehľadáva
  katalóg, pričom pri akomkoľvek zlyhaní použije počiatočný register.
- **Vrstva životného cyklu** — `src/lib/plugins/manager.ts` (singleton
  `pluginManager`): inštalácia, aktualizácia, aktivácia, deaktivácia,
  odinštalovanie, skenovanie a načítanie pri spustení.
- **Vrstva manifestu** — `src/lib/plugins/manifest.ts`: schéma Zod a predvolené
  hodnoty pre `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: vyhľadáva pluginy na disku v adresári
  pluginov.
- **Načítavač** — `src/lib/plugins/loader.ts`: spúšťa každý plugin v izolovanom
  podriadenom procese a sprostredkúva volania hookov cez IPC.

## Katalóg trhoviska

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vracia zoznam
objektov `MarketplaceEntry`:

| Pole          | Typ      | Poznámky                                           |
| ------------- | -------- | -------------------------------------------------- |
| `name`        | string   | Názov pluginu vo formáte kebab-case                |
| `version`     | string   | semver                                             |
| `description` | string   | Stručný opis                                       |
| `author`      | string   | Autor/organizácia                                  |
| `license`     | string   | Identifikátor licencie v štýle SPDX                |
| `downloadUrl` | string   | Adresa URL zdroja na stiahnutie (môže byť prázdna) |
| `repository`  | string?  | Voliteľná adresa URL repozitára                    |
| `tags`        | string[] | Značky na vyhľadávanie/filtrovanie                 |
| `downloads`   | number   | Počet stiahnutí                                    |
| `rating`      | number   | 0–5                                                |
| `verified`    | boolean  | Či je položka označená ako overená                 |
| `lastUpdated` | string   | Reťazec dátumu približne vo formáte ISO            |

Ak nie je nakonfigurovaná vlastná adresa URL registra, katalóg používa vstavaný
`SEED_REGISTRY` (aktuálne `request-logger`, `rate-limiter`, `cost-tracker` a
`theme-manager`). Počiatočný register je vždy dostupný — ak je nakonfigurovaný
vzdialený register nedostupný, vráti stav odlišný od `200` alebo vráti
nerozpoznané telo odpovede, funkcia `listMarketplacePlugins()` zaznamená
upozornenie a použije počiatočný zoznam.

> Poznámka: **katalóg** trhoviska (prehľadávanie/vyhľadávanie) je plne prepojený,
> ale inštalácia z katalógu trhoviska **jedným kliknutím** zatiaľ nie je
> implementovaná — tlačidlo „Inštalovať“ na položke trhoviska na ovládacom paneli
> momentálne zobrazuje oznámenie „už čoskoro“. Inštalácia v súčasnosti prebieha
> prostredníctvom procesu inštalácie z lokálnej cesty (`POST /api/plugins`) a
> vyhľadávania na disku (`POST /api/plugins/scan`).

## REST API

Všetky koncové body vyžadujú autentifikáciu správy (`requireManagementAuth`) **a zároveň** sú
dostupné iba cez loopback — `/api/plugins` a `/api/plugins/` sú uvedené v
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Koncový bod                      | Metóda | Popis                                                               |
| -------------------------------- | ------ | ------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Zoznam nainštalovaných pluginov (voliteľný filter `?status=`)       |
| `/api/plugins`                   | POST   | Inštalácia pluginu z absolútnej lokálnej cesty                      |
| `/api/plugins/scan`              | POST   | Prehľadanie adresára pluginov a registrácia nových pluginov         |
| `/api/plugins/marketplace`       | GET    | Zoznam položiek katalógu trhoviska                                  |
| `/api/plugins/[name]`            | GET    | Získanie podrobností o nainštalovanom plugine                       |
| `/api/plugins/[name]`            | DELETE | Odinštalovanie pluginu                                              |
| `/api/plugins/[name]/activate`   | POST   | Aktivácia (načítanie + registrácia hookov)                          |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivácia (spustenie `onDeactivate`, zrušenie registrácie hookov) |
| `/api/plugins/[name]/config`     | GET    | Získanie konfigurácie pluginu + konfiguračnej schémy                |
| `/api/plugins/[name]/config`     | PUT    | Aktualizácia konfigurácie pluginu (overená voči schéme)             |

Filter `status` pre `GET /api/plugins` akceptuje jednu z hodnôt
`installed` / `active` / `inactive` / `error`. Neplatná hodnota vráti `400`.

### Zoznam nainštalovaných pluginov

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Inštalácia z lokálnej cesty

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Hodnota `path` musí byť **absolútna** a nesmie obsahovať prechodové segmenty `..` ani
nulové bajty (vynucuje to Zod). Zdrojový adresár musí obsahovať platný
`plugin.json` (alebo musí byť jeho nadradeným adresárom). Pri úspechu má odpoveď stav `201` a obsahuje
záznam nainštalovaného pluginu.

### Prehliadanie trhoviska

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aktualizácia konfigurácie pluginu

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` overuje každú poskytnutú hodnotu voči
`configSchema` pluginu (deklarovanej v manifeste): polia typu `number` rešpektujú `min`/`max`,
polia typu `select` sa musia zhodovať s deklarovaným `enum`. Kľúče, ktoré sa v schéme
nenachádzajú, sú povolené.

## Konfigurácia

### Adresár pluginov

Pluginy sa nachádzajú v dátovom adresári OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (alebo ľubovoľný súbor, na ktorý odkazuje manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) určuje tento adresár v
troch krokoch:

1. **`OMNIROUTE_PLUGINS_DIR`**, ak je nastavená — použije sa doslovne bez ohľadu na hodnotu `HOME`. Ide o
   explicitné nastavenie pre Docker/K8s, kde je strom pluginov pripojený pomocou bind mount do cesty,
   ktorá zvyčajne nijako nesúvisí s domovským adresárom kontajnera (#11827).
2. `<home>/.omniroute/plugins`, kde `<home>` pochádza z premenných prostredia `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, ak proces vôbec neexportuje domovský adresár.

Určený adresár sa pri spustení raz zaznamená do logu ako `scanner.dir_resolved` s uvedením
vstupu, ktorý sa použil (`OMNIROUTE_PLUGINS_DIR`, `home` alebo `no-home-fallback`) — obraz,
ktorý potichu skončí pri kroku 3, to teda uvedie namiesto toho, aby hlásil iba prázdny zoznam pluginov.
`POST /api/plugins/scan` vyhľadá každý podadresár, ktorý obsahuje platný
`plugin.json`, a zaregistruje ho; ten istý adresár je koreňovým adresárom, do ktorého
`pluginManager.install()` kopíruje pluginy, takže prepísanie nastavenia presunie zisťovanie aj
inštaláciu spoločne.

> **`OMNIROUTE_PLUGINS_DIR` nie je `OMNIROUTE_PLUGIN_PATH`.** Druhú premennú číta iba
> načítavač príkazových pluginov CLI (`bin/cli/plugins.mjs`) na vyhľadanie npm balíkov
> `omniroute-cmd-*`, ktoré pridávajú podpríkazy `omniroute` — nemá žiadny vplyv na skener za behu
> opísaný v tejto časti. Informácie o tejto oblasti nájdete v [PLUGINS.md](./PLUGINS.md).

### Vlastná URL registra trhoviska

Zdroj katalógu trhoviska sa načítava z nastavenia `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` číta `settings.pluginMarketplaceUrl`). Keď je
nastavené na URL typu `http(s)`, `listMarketplacePlugins()` načíta danú URL a akceptuje
buď JSON pole položiek najvyššej úrovne, alebo objekt s poľom `plugins`;
položky bez reťazca `name` sa odfiltrujú. Ak hodnota nie je nastavená (alebo ak načítanie
neprejde ochranou proti SSRF / vráti chybnú odpoveď), použije sa vstavaný predvolený register.

Karta „Trhovisko“ na paneli poskytuje pole pre túto URL (spätne sa načíta z
`GET /api/settings`).

> Poznámka k implementácii: akcia „Uložiť“ na paneli odosiela
> `pluginMarketplaceUrl` do `PATCH /api/settings`. V čase písania tohto textu tento
> kľúč nie je deklarovaný v `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), preto pred tým, ako sa naň spoľahnete, overte jeho
> pretrvávanie vo svojom vydaní — cesta **čítania** (`getSettings()` →
> `listMarketplacePlugins()`) tento kľúč rešpektuje, keď sa už nachádza v úložisku
> nastavení.

## Zabezpečenie

### Úroveň trasy — iba loopback

Pluginy spúšťajú kód v podriadených procesoch, preto je celé rozhranie
`/api/plugins` klasifikované ako `LOCAL_ONLY` (úroveň 1). Kontrola loopbacku
sa vykonáva bezpodmienečne **pred** akoukoľvek kontrolou autentifikácie, takže
ani uniknutý token na správu, ktorý sa dostane do zariadenia cez tunel, nemôže
nainštalovať, aktivovať ani odinštalovať plugin. Pozrite si
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) a
Pevné pravidlá č. 15 / č. 17.

### Ochrana registra marketplace pred SSRF

Vlastná URL registra je konfigurácia, ktorú môže ovplyvniť útočník, preto ju
`listMarketplacePlugins()` pred načítaním spracuje v dvoch vrstvách:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odmietne všetko, čo nepoužíva `http:` / `https:`.
   - Odmietne explicitné privátne/loopback/link-local/ULA hostitele (IPv4 **aj**
     IPv6 vrátane IPv4-mapped) prostredníctvom kanonickej funkcie
     `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Preloží záznamy **`A` aj `AAAA`** a odmietne URL, ak je **ktorákoľvek**
     preložená adresa privátna — tým sa eliminuje obídenie typu verejný názov
     hostiteľa → privátna IP adresa.
   - **Pri zlyhaní odmietne prístup**: zlyhanie prekladu DNS spôsobí odmietnutie
     URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): pri načítaní znova aplikuje
   ochranu URL povoľujúcu iba verejné adresy a **blokuje presmerovania** (žiadny
   prechod z verejnej adresy na privátnu cez `30x`).

URL, ktorá neprejde ktoroukoľvek z týchto vrstiev, požiadavku nepreruší —
marketplace sa bez upozornenia prepne na vstavaný počiatočný register a zapíše
upozornenie do protokolu.

> Táto ochrana bola sprísnená v PR č. 3774 konkrétne tak, aby prekladala A +
> AAAA a používala kanonickú funkciu `isPrivateHost` namiesto kontroly
> obmedzenej iba na IPv4.

### Izolácia vykonávania pluginov

- **Izolácia procesov** — `loadPlugin()` (`src/lib/plugins/loader.ts`) spúšťa
  každý plugin v samostatnom podriadenom procese Node.js a komunikuje cez IPC.
  Volania hookov majú časový limit s eskaláciou `SIGTERM` → `SIGKILL`.
- **Zoznam povolených premenných prostredia** — podriadený proces dostane iba
  povolenú množinu premenných prostredia; širšia množina sa poskytne iba vtedy,
  keď manifest požaduje oprávnenie `env`.
- **Obmedzenie ciest** — inštalácia/aktualizácia/odinštalovanie overujú, že
  adresár pluginu a `manifest.main` sa preložia na cestu **v rámci**
  spravovaného koreňového adresára pluginov ešte pred akýmkoľvek kopírovaním
  alebo rekurzívnym odstránením (ochrana pred pozmenenými cestami v databáze a
  prechádzaním cez `../` v `manifest.main`). Aktivácia prekladá symbolické
  odkazy pomocou `realpath` a odmietne načítať vstupný bod, ktorý sa nachádza
  mimo adresára pluginu.
- **Voliteľné pripnutie integrity** — manifest môže deklarovať pole `integrity`
  (`sha256-<base64>`, formát SRI). Ak je uvedené, loader pri načítaní overí hash
  vstupného súboru a pri nezhode odmietne aktiváciu. Ide o voliteľnú detekciu
  pozmenenia, **nie** o bezpečnostnú hranicu — skutočnými hranicami sú smerovanie
  obmedzené na loopback a model oprávnení.

## Manifest (`plugin.json`)

Overuje ho `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Pole               | Typ       | Poznámky                                                        |
| ------------------ | --------- | --------------------------------------------------------------- |
| `name`             | string    | Povinné; kebab-case (`^[a-z0-9-]+$`), 1–100 znakov              |
| `version`          | string    | Povinné; semver (`MAJOR.MINOR.PATCH`)                           |
| `description`      | string?   | ≤ 500 znakov                                                    |
| `author`           | string?   | ≤ 200 znakov                                                    |
| `license`          | string?   | Predvolená hodnota je `MIT`                                     |
| `main`             | string?   | Vstupný súbor; predvolená hodnota je `index.js`                 |
| `source`           | enum?     | `local` \| `marketplace` (predvolená hodnota je `local`)        |
| `tags`             | string[]? | Vyhľadávacie značky                                             |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                 |
| `hooks`            | object?   | Booleovské hodnoty určujúce, ktoré hooky plugin implementuje    |
| `skills`           | object[]? | Voliteľné definície schopností                                  |
| `enabledByDefault` | boolean?  | Automaticky aktivovať pri inštalácii                            |
| `configSchema`     | object?   | Mapa konfiguračných polí (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Voliteľné pripnutie vstupného súboru `sha256-<base64>`          |

Oprávnenia sa vyberajú z enumu
`network` / `file-read` / `file-write` / `env` / `exec`.

## Tok životného cyklu

```
inštalácia (POST /api/plugins, cesta)
  → skenovanie/overenie manifestu → skopírovanie do dočasného adresára → kontrola, že hlavný súbor je v adresári
  → atómové premenovanie do ~/.omniroute/plugins/<name> → vloženie riadka do databázy
  → spustenie onInstall → ak enabledByDefault: aktivácia

aktivácia (POST /api/plugins/{name}/activate)
  → kontrola umiestnenia pomocou realpath → loadPlugin() (spustenie podriadeného procesu)
  → registrácia deklarovaných hookov → status = "active" → spustenie onActivate

deaktivácia (POST /api/plugins/{name}/deactivate)
  → spustenie onDeactivate (PRED zrušením registrácie) → zrušenie registrácie hookov
  → ukončenie podriadeného procesu → status = "inactive"

odinštalovanie (DELETE /api/plugins/{name})
  → deaktivácia, ak je aktívny → spustenie onUninstall
  → rekurzívne odstránenie adresára pluginu s kontrolou umiestnenia → odstránenie riadka z databázy
```

Opätovné spustenie `install` pre adresár, ktorého verzia v manifeste je **striktne
novšia** než nainštalovaná verzia, vykoná automatickú aktualizáciu (čistú reinštaláciu;
konfigurácia sa obnoví na predvolené hodnoty). Rovnaká alebo staršia verzia je odmietnutá.

## Databáza

Tabuľka `plugins` (migrácia `076_create_plugins.sql`):

| Stĺpec          | Typ     | Poznámky                                                          |
| --------------- | ------- | ----------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                              |
| `name`          | TEXT    | Jedinečný                                                         |
| `version`       | TEXT    | semver; predvolená hodnota `1.0.0`                                |
| `description`   | TEXT    | Voliteľný                                                         |
| `author`        | TEXT    | Voliteľný                                                         |
| `license`       | TEXT    | Predvolená hodnota `MIT`                                          |
| `main`          | TEXT    | Vstupný súbor; predvolená hodnota `index.js`                      |
| `source`        | TEXT    | Predvolená hodnota `local`                                        |
| `tags`          | TEXT    | Pole JSON; predvolená hodnota `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                  |
| `enabled`       | INT     | 0/1; predvolená hodnota 0                                         |
| `manifest`      | TEXT    | Úplný manifest JSON                                               |
| `config`        | TEXT    | JSON; predvolená hodnota `{}`                                     |
| `config_schema` | TEXT    | JSON; predvolená hodnota `{}`                                     |
| `hooks`         | TEXT    | Pole JSON s názvami deklarovaných hookov; predvolená hodnota `[]` |
| `permissions`   | TEXT    | Pole JSON; predvolená hodnota `[]`                                |
| `plugin_dir`    | TEXT    | Absolútny inštalačný adresár                                      |
| `error_message` | TEXT    | Nastaví sa, keď `status = "error"`                                |
| `installed_at`  | TEXT    | `datetime('now')`                                                 |
| `updated_at`    | TEXT    | `datetime('now')`                                                 |
| `activated_at`  | TEXT    | Nastaví sa pri aktivácii                                          |

Metriky a analytické údaje pluginov sa sledujú v ďalších tabuľkách
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Ovládací panel

Stránka ovládacieho panela na adrese `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) obsahuje dve karty:

- **Nainštalované** — uvádza nainštalované pluginy s ich deklarovanými hookmi,
  prepínačom aktivácie/deaktivácie, tlačidlom na odinštalovanie a akciou „Vyhľadať
  pluginy“ (`POST /api/plugins/scan`).
- **Marketplace** — zobrazuje katalóg z `GET /api/plugins/marketplace` s poľom
  na nastavenie vlastnej URL registra.

Konfiguračná stránka jednotlivého pluginu sa nachádza na adrese `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Pozri tiež

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  prečo je `/api/plugins` prístupné iba cez loopback (úroveň 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — súvisiaci framework zručností
  (`src/lib/skills/`); pluginy môžu deklarovať zručnosti vo svojom manifeste
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — odchádzajúce integrácie
  riadené udalosťami
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  vzor `buildErrorBody()`, ktorý používa každá trasa pluginu pre chybové odpovede
