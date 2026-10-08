# Plugin Marketplace (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Tõeallikas:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` ja
> `src/app/(dashboard)/dashboard/plugins/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute sisaldab WordPressi-laadset pistikprogrammisüsteemi. Pistikprogrammid on iseseisvad
kataloogid — igaühes on `plugin.json` manifest ja sisendfail —, mis haakuvad
päringutöötlusahelasse (`onRequest` / `onResponse` / `onError`) ning
elutsüklisündmustesse (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Pistikprogrammide turuplats** on selle süsteemi peal olev avastuskiht. See
pakub sirvitavat installitavate pistikprogrammide kataloogi. Vaikimisi on kataloogiks
väike sisseehitatud algregister; operaator saab määrata kohandatud kaugregistri
URL-i, mille puhul turvatakse päring DNS-i lahendava SSRF-kaitsega
(vt [Turvalisus](#security)).

Kõik pistikprogrammide marsruudid on **ainult tagasisideaadressilt ligipääsetavad** (1. tase — `LOCAL_ONLY`):
pistikprogrammid laadivad ja käivitavad koodi alamprotsessides, mistõttu pole marsruudid
tagasisideaadressivälisest päritolust autentimisest olenemata ligipääsetavad. Vt
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kuidas osad omavahel seostuvad

```
Töölaud (/dashboard/plugins)
  ├─ Vahekaart „Installitud“ → GET /api/plugins            (listPlugins)
  │                           POST /api/plugins/scan      (pluginManager.scan)
  │                           POST /api/plugins/{name}/activate|deactivate
  │                           DELETE /api/plugins/{name}   (desinstallimine)
  └─ Vahekaart „Turuplats“   → GET /api/plugins/marketplace
                                → listMarketplacePlugins()
                                  ├─ kohandatud URL puudub → sisseehitatud SEED_REGISTRY
                                  └─ kohandatud URL → isSafeMarketplaceUrl() SSRF-kaitse
                                                       → safeOutboundFetch(guard:"public-only")
```

- **Registrikiht** — `src/lib/plugins/marketplace.ts`: loetleb kataloogi sisu ja
  otsib sellest, kasutades tõrke korral algregistrit.
- **Elutsüklikiht** — `src/lib/plugins/manager.ts` (`pluginManager` üksikeksemplar):
  installimine, uuendamine, aktiveerimine, inaktiveerimine, desinstallimine, skannimine, käivitamisel laadimine.
- **Manifestikiht** — `src/lib/plugins/manifest.ts`: Zodi skeem + vaikeväärtused
  faili `plugin.json` jaoks.
- **Skanner** — `src/lib/plugins/scanner.ts`: tuvastab kettal pistikprogrammide
  kataloogis olevad pistikprogrammid.
- **Laadur** — `src/lib/plugins/loader.ts`: käivitab iga pistikprogrammi eraldatud
  alamprotsessis ja vahendab konksude kutseid IPC kaudu.

## Turuplatsi kataloog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) tagastab loendi
`MarketplaceEntry` objektidest:

| Väli          | Tüüp     | Märkused                                      |
| ------------- | -------- | --------------------------------------------- |
| `name`        | string   | kebab-case-vormingus pistikprogrammi nimi     |
| `version`     | string   | semver                                        |
| `description` | string   | Lühikokkuvõte                                 |
| `author`      | string   | Autor / organisatsioon                        |
| `license`     | string   | SPDX-stiilis litsentsi ID                     |
| `downloadUrl` | string   | Lähtekoodi allalaadimise URL (võib olla tühi) |
| `repository`  | string?  | Valikuline hoidla URL                         |
| `tags`        | string[] | Otsingu-/filtreerimissildid                   |
| `downloads`   | number   | Allalaadimiste arv                            |
| `rating`      | number   | 0–5                                           |
| `verified`    | boolean  | Kas kirje on märgitud kontrollituks           |
| `lastUpdated` | string   | ISO-laadne kuupäevastring                     |

Kui kohandatud registri URL-i pole seadistatud, kasutatakse kataloogina sisseehitatud
`SEED_REGISTRY`-t (praegu `request-logger`, `rate-limiter`, `cost-tracker` ja
`theme-manager`). Algregister on alati saadaval — kui seadistatud kaugregister
pole kättesaadav, tagastab muu kui `200` oleku või tundmatu kehaga vastuse,
logib `listMarketplacePlugins()` hoiatuse ja kasutab algloendit.

> Märkus: turuplatsi **kataloog** (sirvimine/otsing) on täielikult ühendatud, kuid
> ühe klõpsuga turuplatsilt **installimine** pole veel rakendatud — turuplatsi kirje
> nupp „Installi“ kuvab praegu teate „peagi saadaval“. Praegu toimub installimine
> kohaliku tee installivoo (`POST /api/plugins`) ja kettalt tuvastamise
> (`POST /api/plugins/scan`) kaudu.

## REST API

Kõik lõpp-punktid nõuavad halduse autentimist (`requireManagementAuth`) **ja** on
juurdepääsetavad ainult loopback-liidese kaudu — `/api/plugins` ja `/api/plugins/` on loetletud
muutujas `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Lõpp-punkt                       | Meetod | Kirjeldus                                                                         |
| -------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Installitud pluginate loend (valikuline filter `?status=`)                        |
| `/api/plugins`                   | POST   | Plugina installimine absoluutselt kohalikult teelt                                |
| `/api/plugins/scan`              | POST   | Pluginate kataloogi skannimine ja uute pluginate registreerimine                  |
| `/api/plugins/marketplace`       | GET    | Turuplatsi kataloogikirjete loend                                                 |
| `/api/plugins/[name]`            | GET    | Installitud plugina üksikasjade hankimine                                         |
| `/api/plugins/[name]`            | DELETE | Plugina desinstallimine                                                           |
| `/api/plugins/[name]/activate`   | POST   | Aktiveerimine (laadimine + hook'ide registreerimine)                              |
| `/api/plugins/[name]/deactivate` | POST   | Inaktiveerimine (`onDeactivate` käivitamine, hook'ide registreeringu tühistamine) |
| `/api/plugins/[name]/config`     | GET    | Plugina konfiguratsiooni + konfiguratsiooniskeemi hankimine                       |
| `/api/plugins/[name]/config`     | PUT    | Plugina konfiguratsiooni uuendamine (skeemi alusel valideeritud)                  |

Päringu `GET /api/plugins` filter `status` aktsepteerib üht järgmistest väärtustest:
`installed` / `active` / `inactive` / `error`. Sobimatu väärtus tagastab `400`.

### Installitud pluginate loend

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installimine kohalikult teelt

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` peab olema **absoluutne** ega tohi sisaldada `..` läbimissegmente ega
nullbaite (seda jõustab Zod). Lähtekataloog peab sisaldama kehtivat faili
`plugin.json` (või olema sellise kataloogi ülemkataloog). Õnnestumise korral on vastuse kood `201` ja
vastus sisaldab installitud plugina kirjet.

### Turuplatsi sirvimine

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Plugina konfiguratsiooni uuendamine

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valideerib iga esitatud väärtuse plugina
`configSchema` alusel (deklareeritud manifestis): väljad `number` arvestavad piiridega `min`/`max`,
väljad `select` peavad vastama deklareeritud väärtusele `enum`. Skeemis puuduvad võtmed
on lubatud.

## Konfiguratsioon

### Pluginate kataloog

Pluginad asuvad OmniRoute'i andmekataloogis:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (või mis tahes fail, millele manifest.main osutab)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) määrab selle kataloogi
kolmes etapis:

1. **`OMNIROUTE_PLUGINS_DIR`**, kui see on määratud — kasutatakse muutmata kujul sõltumata `HOME` väärtusest. See on
   selgesõnaline seadistus Docker/K8s-i jaoks, kus pluginate kataloogipuu on bind-mount'itud teele,
   millel pole tavaliselt konteineri kodukataloogiga mingit seost (#11827).
2. `<home>/.omniroute/plugins`, kus `<home>` pärineb keskkonnamuutujatest `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kui protsess ei ekspordi üldse kodukataloogi.

Määratud kataloog logitakse käivitamisel üks kord sündmusena `scanner.dir_resolved`, nimetades
valituks osutunud sisendi (`OMNIROUTE_PLUGINS_DIR`, `home` või `no-home-fallback`) — nii annab
vaikselt 3. etapile langev tõmmis sellest teada, selle asemel et teatada ainult tühjast pluginate loendist.
`POST /api/plugins/scan` leiab sealt kõik alamkataloogid, mis sisaldavad kehtivat
faili `plugin.json`, ja registreerib need; sama kataloog on juur, kuhu
`pluginManager.install()` pluginad kopeerib, seega teisaldab ülekirjutus nii tuvastamise kui ka
installimise.

> **`OMNIROUTE_PLUGINS_DIR` ei ole `OMNIROUTE_PLUGIN_PATH`.** Viimast loeb ainult
> CLI käsupluginate laadija (`bin/cli/plugins.mjs`), et leida `omniroute-cmd-*` npm-i
> pakette, mis lisavad `omniroute` alamkäske — see ei mõjuta siin kirjeldatud käitusaegset skannerit.
> Selle kohta vaadake [PLUGINS.md](./PLUGINS.md).

### Kohandatud turuplatsi registri URL

Turuplatsi kataloogi allikat loetakse sättest `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` loeb väärtust `settings.pluginMarketplaceUrl`). Kui
selle väärtuseks on määratud `http(s)` URL, hangib `listMarketplacePlugins()` selle URL-i ja aktsepteerib
kas tipptaseme JSON-kirjete massiivi või objekti, millel on massiiv `plugins`;
kirjed, millel puudub string-tüüpi `name`, filtreeritakse välja. Kui väärtus on määramata (või kui päring
ei läbi SSRF-kaitset / tagastab sobimatu vastuse), kasutatakse sisseehitatud algregistrit.

Töölaua vahekaart „Turuplats” sisaldab selle URL-i välja (loetakse tagasi lõpp-punktist
`GET /api/settings`).

> Teostuse märkus: töölaua toiming „Salvesta” saadab väärtuse
> `pluginMarketplaceUrl` lõpp-punktile `PATCH /api/settings`. Kirjutamise ajal ei ole see
> võti deklareeritud skeemis `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), seega kontrollige enne sellele lootmist oma
> väljalaskes väärtuse püsimist — **lugemistee** (`getSettings()` →
> `listMarketplacePlugins()`) arvestab võtmega, kui see on sätete
> hoidlas olemas.

## Turvalisus

### Marsruudi tase — ainult loopback

Pluginad käivitavad koodi loodud alamprotsessides, mistõttu kogu `/api/plugins`
pind on liigitatud `LOCAL_ONLY`-tasemele (1. tase). Loopback-piirang rakendub
tingimusteta **enne** mis tahes autentimiskontrolli, nii et tunneli kaudu
masinasse jõudnud lekkinud haldusluba ei saa ikkagi pluginat installida,
aktiveerida ega desinstallida. Vt
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) ja
rangeid reegleid nr 15 / 17.

### Turuplatsi registri SSRF-kaitse

Kohandatud registri URL on ründaja poolt mõjutatav konfiguratsioon, mistõttu
enne selle laadimist töötleb `listMarketplacePlugins()` seda kahes etapis:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Lükkab tagasi kõik, mis ei ole `http:` / `https:`.
   - Lükkab kanoonilise `isPrivateHost`-i
     (`src/shared/network/outboundUrlGuard.ts`) abil tagasi otsesõnalised
     privaatsed/loopback/link-local/ULA-hostid (nii IPv4 **kui ka** IPv6,
     sealhulgas IPv4-aadressiks vastendatud aadressid).
   - Lahendab **nii** `A`- kui ka `AAAA`-kirjed ja lükkab URL-i tagasi, kui
     **mõni** lahendatud aadress on privaatne — sulgedes avaliku hostinime →
     privaatse IP-aadressi möödapääsu.
   - **Tõrke korral keelab**: DNS-i lahendamise nurjumisel lükatakse URL tagasi.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): rakendab laadimise ajal uuesti
   ainult avalikke aadresse lubava URL-i kaitse ja **blokeerib ümbersuunamised**
   (avalikult → privaatsele aadressile viiv `30x`-pööre pole võimalik).

Kui URL ei läbi kumbagi etappi, ei katkestata päringut — turuplats kasutab
vaikimisi sisseehitatud algregistrit ja logib hoiatuse.

> Seda kaitset tugevdati PR-is #3774 konkreetselt selleks, et lahendada nii
> A- kui ka AAAA-kirjeid ning kasutada ainult IPv4 kontrolli asemel kanoonilist
> `isPrivateHost`-i.

### Plugina käivitamise isolatsioon

- **Protsessiisolatsioon** — `loadPlugin()` (`src/lib/plugins/loader.ts`) käivitab
  iga plugina eraldi Node.js-i alamprotsessis ja suhtleb sellega IPC kaudu.
  Hook'ide kutsetel on ajalõpp koos `SIGTERM` → `SIGKILL` eskalatsiooniga.
- **Keskkonnamuutujate lubatud loend** — alamprotsess saab ainult lubatud
  loendis olevad keskkonnamuutujad; laiem komplekt antakse ainult siis, kui
  manifest taotleb õigust `env`.
- **Tee piiramine** — installimine/uuendamine/desinstallimine kontrollib enne
  mis tahes kopeerimist või rekursiivset kustutamist, et plugina kataloog ja
  `manifest.main` lahenduksid hallatava pluginate juurkataloogi **sees**
  (kaitseb muudetud andmebaasiteede ja `../`-läbimise eest failis
  `manifest.main`). Aktiveerimisel lahendatakse sümbollingid `realpath`-i abil
  ja keeldutakse laadimast sisenemispunkti, mis väljub plugina kataloogist.
- **Valikuline tervikluse fikseerimine** — manifest võib deklareerida välja
  `integrity` (`sha256-<base64>`, SRI-vorming). Kui see on olemas, kontrollib
  laadija laadimise ajal sisenemisfaili räsi ja keeldub mittevastavuse korral
  aktiveerimisest. See on valikuline omavoliliste muudatuste tuvastamine,
  **mitte** turvapiir — tegelikud piirid on ainult loopback'i kaudu
  marsruutimine ja õiguste mudel.

## Manifest (`plugin.json`)

Valideerib `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Väli               | Tüüp      | Märkused                                                             |
| ------------------ | --------- | -------------------------------------------------------------------- |
| `name`             | string    | Kohustuslik; kebab-case (`^[a-z0-9-]+$`), 1–100 märki                |
| `version`          | string    | Kohustuslik; semver (`MAJOR.MINOR.PATCH`)                            |
| `description`      | string?   | ≤ 500 märki                                                          |
| `author`           | string?   | ≤ 200 märki                                                          |
| `license`          | string?   | Vaikeväärtus on `MIT`                                                |
| `main`             | string?   | Sisenemisfail; vaikeväärtus on `index.js`                            |
| `source`           | enum?     | `local` \| `marketplace` (vaikeväärtus on `local`)                   |
| `tags`             | string[]? | Otsingusildid                                                        |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                      |
| `hooks`            | object?   | Tõeväärtused, mis näitavad, milliseid hook'e plugin rakendab         |
| `skills`           | object[]? | Valikulised oskuste definitsioonid                                   |
| `enabledByDefault` | boolean?  | Automaatne aktiveerimine installimisel                               |
| `configSchema`     | object?   | Konfiguratsiooniväljade kaart (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Valikuline sisenemisfaili `sha256-<base64>` fikseering               |

Õigused pärinevad enum'ist
`network` / `file-read` / `file-write` / `env` / `exec`.

## Elutsükli voog

```
install (POST /api/plugins, tee)
  → manifesti skannimine/valideerimine → kopeerimine ettevalmistusalasse → kontroll, et main asuks kataloogis
  → atomaarne ümbernimetamine asukohta ~/.omniroute/plugins/<name> → rea lisamine andmebaasi
  → onInstall käivitamine → kui enabledByDefault: aktiveerimine

activate (POST /api/plugins/{name}/activate)
  → realpath-i põhine kataloogis püsimise kontroll → loadPlugin() (alamprotsessi käivitamine)
  → deklareeritud hook'ide registreerimine → status = "active" → onActivate käivitamine

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate käivitamine (ENNE registreeringute eemaldamist) → hook'ide registreeringute eemaldamine
  → alamprotsessi lõpetamine → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → kui aktiivne, siis deaktiveerimine → onUninstall käivitamine
  → kontrollitud kataloogikuuluvusega pluginakataloogi rekursiivne kustutamine → andmebaasirea kustutamine
```

Käsu `install` korduv käivitamine kataloogi jaoks, mille manifesti versioon on installitud versioonist **rangelt
uuem**, teeb automaatse versiooniuuenduse (puhas uuesti installimine; konfiguratsioon lähtestatakse
vaikeväärtustele). Sama või vanem versioon lükatakse tagasi.

## Andmebaas

Tabel `plugins` (migratsioon `076_create_plugins.sql`):

| Veerg           | Tüüp    | Märkused                                                   |
| --------------- | ------- | ---------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                       |
| `name`          | TEXT    | Unikaalne                                                  |
| `version`       | TEXT    | semver; vaikimisi `1.0.0`                                  |
| `description`   | TEXT    | Valikuline                                                 |
| `author`        | TEXT    | Valikuline                                                 |
| `license`       | TEXT    | Vaikimisi `MIT`                                            |
| `main`          | TEXT    | Käivitusfail; vaikimisi `index.js`                         |
| `source`        | TEXT    | Vaikimisi `local`                                          |
| `tags`          | TEXT    | JSON-massiiv; vaikimisi `[]`                               |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`           |
| `enabled`       | INT     | 0/1; vaikimisi 0                                           |
| `manifest`      | TEXT    | Täielik manifest JSON-vormingus                            |
| `config`        | TEXT    | JSON; vaikimisi `{}`                                       |
| `config_schema` | TEXT    | JSON; vaikimisi `{}`                                       |
| `hooks`         | TEXT    | Deklareeritud hook'ide nimede JSON-massiiv; vaikimisi `[]` |
| `permissions`   | TEXT    | JSON-massiiv; vaikimisi `[]`                               |
| `plugin_dir`    | TEXT    | Absoluutne installikataloog                                |
| `error_message` | TEXT    | Määratakse, kui `status = "error"`                         |
| `installed_at`  | TEXT    | `datetime('now')`                                          |
| `updated_at`    | TEXT    | `datetime('now')`                                          |
| `activated_at`  | TEXT    | Määratakse aktiveerimisel                                  |

Pluginate mõõdikuid/analüütikat jälgitakse täiendavates tabelites
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Juhtpaneel

Juhtpaneeli lehel `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) on kaks vahekaarti:

- **Installitud** — kuvab installitud pluginad koos nende deklareeritud hook'idega,
  aktiveerimise/deaktiveerimise lüliti, desinstallimisnupu ja toimingu „Otsi pluginaid“
  (`POST /api/plugins/scan`).
- **Turuplats** — kuvab kataloogi päringust `GET /api/plugins/marketplace` ning sisaldab
  välja kohandatud registri URL-i määramiseks.

Iga plugina konfiguratsioonileht asub aadressil `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vaata ka

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  miks `/api/plugins` on juurdepääsetav ainult loopback-liidese kaudu (1. tase)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — seotud oskuste raamistik
  (`src/lib/skills/`); pluginad võivad oma manifestis oskusi deklareerida
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — sündmuspõhised väljaminevad
  integratsioonid
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  muster `buildErrorBody()`, mida iga plugina marsruut veavastuste jaoks kasutab
