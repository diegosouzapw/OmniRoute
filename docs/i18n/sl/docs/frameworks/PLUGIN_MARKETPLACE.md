# Plugin Marketplace (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Vir resnice:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` in
> `src/app/(dashboard)/dashboard/plugins/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute vključuje sistem vtičnikov po vzoru WordPressa. Vtičniki so samostojni
imeniki — vsak z manifestom `plugin.json` in vstopno datoteko — ki se vključujejo
v cevovod zahtev (`onRequest` / `onResponse` / `onError`) in dogodke
življenjskega cikla (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Tržnica vtičnikov** je plast za odkrivanje nad tem sistemom. Ponuja katalog
vtičnikov, ki jih je mogoče namestiti in pregledovati. Katalog je privzeto
majhen, vgrajen začetni register; skrbnik ga lahko usmeri na URL oddaljenega
registra po meri. V tem primeru pridobivanje varuje zaščita pred SSRF, ki
razrešuje DNS (glejte [Varnost](#security)).

Vse poti vtičnikov so **dostopne samo prek povratne zanke** (1. raven —
`LOCAL_ONLY`): vtičniki nalagajo in izvajajo kodo v podrejenih procesih, zato
poti niso dosegljive iz izvora, ki ni povratna zanka, ne glede na preverjanje
pristnosti. Glejte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kako vse skupaj deluje

```
Nadzorna plošča (/dashboard/plugins)
  ├─ Zavihek »Nameščeni« → GET /api/plugins            (listPlugins)
  │                        POST /api/plugins/scan      (pluginManager.scan)
  │                        POST /api/plugins/{name}/activate|deactivate
  │                        DELETE /api/plugins/{name}   (odstranitev)
  └─ Zavihek »Tržnica«    → GET /api/plugins/marketplace
                             → listMarketplacePlugins()
                               ├─ brez URL-ja po meri → vgrajeni SEED_REGISTRY
                               └─ URL po meri → zaščita SSRF isSafeMarketplaceUrl()
                                              → safeOutboundFetch(guard:"public-only")
```

- **Plast registra** — `src/lib/plugins/marketplace.ts`: navaja in išče po
  katalogu ter ob kakršni koli napaki uporabi začetni register.
- **Plast življenjskega cikla** — `src/lib/plugins/manager.ts` (edini primerek
  `pluginManager`): namestitev, nadgradnja, aktiviranje, deaktiviranje,
  odstranitev, pregledovanje in začetno nalaganje.
- **Plast manifesta** — `src/lib/plugins/manifest.ts`: shema Zod in privzete
  vrednosti za `plugin.json`.
- **Pregledovalnik** — `src/lib/plugins/scanner.ts`: odkriva vtičnike na disku
  v imeniku vtičnikov.
- **Nalagalnik** — `src/lib/plugins/loader.ts`: zažene vsak vtičnik v izoliranem
  podrejenem procesu in posreduje klice priključnih točk prek IPC-ja.

## Katalog tržnice

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vrne seznam
objektov `MarketplaceEntry`:

| Polje         | Vrsta    | Opombe                                       |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | Ime vtičnika v zapisu kebab-case             |
| `version`     | string   | semver                                       |
| `description` | string   | Kratek povzetek                              |
| `author`      | string   | Avtor/organizacija                           |
| `license`     | string   | Identifikator licence v slogu SPDX           |
| `downloadUrl` | string   | URL za prenos izvorne kode (lahko je prazen) |
| `repository`  | string?  | Izbirni URL repozitorija                     |
| `tags`        | string[] | Oznake za iskanje/filtriranje                |
| `downloads`   | number   | Število prenosov                             |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Ali je vnos označen kot preverjen            |
| `lastUpdated` | string   | Datumski niz v obliki, podobni ISO           |

Če URL registra po meri ni konfiguriran, se kot katalog uporabi vgrajeni
`SEED_REGISTRY` (trenutno `request-logger`, `rate-limiter`, `cost-tracker` in
`theme-manager`). Začetni register je vedno na voljo — če konfigurirani oddaljeni
register ni dosegljiv, vrne stanje, ki ni `200`, ali vrne neprepoznano telo
odgovora, `listMarketplacePlugins()` zabeleži opozorilo in uporabi začetni
seznam.

> Opomba: **katalog** tržnice (brskanje/iskanje) je v celoti povezan, vendar
> namestitev z enim klikom iz kataloga tržnice še ni implementirana — gumb
> »Namesti« na vnosu tržnice na nadzorni plošči trenutno prikaže obvestilo
> »kmalu na voljo«. Namestitev trenutno poteka prek postopka namestitve iz
> lokalne poti (`POST /api/plugins`) in odkrivanja na disku
> (`POST /api/plugins/scan`).

## REST API

Vse končne točke zahtevajo skrbniško avtentikacijo (`requireManagementAuth`) **in**
so dostopne samo prek povratne zanke — `/api/plugins` in `/api/plugins/` sta navedeni v
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Končna točka                     | Metoda | Opis                                                    |
| -------------------------------- | ------ | ------------------------------------------------------- |
| `/api/plugins`                   | GET    | Prikaže nameščene vtičnike (izbirni filter `?status=`)  |
| `/api/plugins`                   | POST   | Namesti vtičnik z absolutne lokalne poti                |
| `/api/plugins/scan`              | POST   | Pregleda imenik vtičnikov in registrira nove vtičnike   |
| `/api/plugins/marketplace`       | GET    | Prikaže vnose kataloga tržnice                          |
| `/api/plugins/[name]`            | GET    | Pridobi podrobnosti nameščenega vtičnika                |
| `/api/plugins/[name]`            | DELETE | Odstrani vtičnik                                        |
| `/api/plugins/[name]/activate`   | POST   | Aktivira (naloži + registrira kavlje)                   |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivira (sproži `onDeactivate`, odregistrira kavlje) |
| `/api/plugins/[name]/config`     | GET    | Pridobi konfiguracijo vtičnika + konfiguracijsko shemo  |
| `/api/plugins/[name]/config`     | PUT    | Posodobi konfiguracijo vtičnika (preverjeno po shemi)   |

Filter `status` za `GET /api/plugins` sprejme eno od vrednosti
`installed` / `active` / `inactive` / `error`. Neveljavna vrednost vrne `400`.

### Prikaz nameščenih vtičnikov

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Namestitev z lokalne poti

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Vrednost `path` mora biti **absolutna** in ne sme vsebovati segmentov prehoda `..` ali
ničelnih bajtov (to uveljavlja Zod). Izvorni imenik mora vsebovati veljavno datoteko
`plugin.json` (ali pa mora biti nadrejeni imenik takega imenika). Ob uspehu ima odgovor
stanje `201` in vsebuje vrstico nameščenega vtičnika.

### Brskanje po tržnici

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Posodobitev konfiguracije vtičnika

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` preveri vsako podano vrednost glede na `configSchema` vtičnika
(deklarirano v manifestu): polja `number` upoštevajo `min`/`max`, polja `select`
pa se morajo ujemati z deklarirano vrednostjo `enum`. Ključi, ki niso prisotni
v shemi, so dovoljeni.

## Konfiguracija

### Imenik vtičnikov

Vtičniki so shranjeni v podatkovnem imeniku OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ali katera koli datoteka, na katero kaže manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) ta imenik določi v
treh korakih:

1. **`OMNIROUTE_PLUGINS_DIR`**, če je nastavljen — uporabi se dobesedno, ne glede na
   vrednost `HOME`. To je izrecna nastavitev za Docker/K8s, kjer je drevo vtičnikov
   vpeto na poti, ki običajno nima nobene zveze z domačim imenikom vsebnika (#11827).
2. `<home>/.omniroute/plugins`, kjer je `<home>` pridobljen iz okoljskih spremenljivk
   `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kadar proces sploh ne izvozi domačega imenika.

Določeni imenik se ob zagonu enkrat zabeleži kot `scanner.dir_resolved`, pri čemer je
naveden uporabljeni vhod (`OMNIROUTE_PLUGINS_DIR`, `home` ali `no-home-fallback`) — zato
slika, ki neopazno pristane pri 3. koraku, to izrecno sporoči, namesto da bi prikazala
samo prazen seznam vtičnikov. `POST /api/plugins/scan` v njem odkrije vsak podimenik,
ki vsebuje veljavno datoteko `plugin.json`, in ga registrira; isti imenik je tudi
korenski imenik, v katerega `pluginManager.install()` kopira vtičnike, zato
preglasitev hkrati premakne odkrivanje in namestitev.

> **`OMNIROUTE_PLUGINS_DIR` ni `OMNIROUTE_PLUGIN_PATH`.** Slednjo bere samo nalagalnik
> ukaznih vtičnikov CLI (`bin/cli/plugins.mjs`), da poišče pakete npm `omniroute-cmd-*`,
> ki dodajajo podukaze `omniroute` — na tukaj opisani pregledovalnik med izvajanjem
> nima nobenega vpliva. Za to področje glejte [PLUGINS.md](./PLUGINS.md).

### URL registra tržnice po meri

Vir kataloga tržnice se prebere iz nastavitve `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` bere `settings.pluginMarketplaceUrl`). Ko je
nastavljena na URL `http(s)`, `listMarketplacePlugins()` pridobi vsebino s tega URL-ja
in sprejme bodisi vrhnjo matriko JSON z vnosi bodisi objekt z matriko `plugins`;
vnosi brez vrednosti `name` vrste niz so izločeni. Ko nastavitev ni določena (ali ko
pridobivanje ne prestane zaščite SSRF oziroma vrne neveljaven odgovor), se uporabi
vgrajeni začetni register.

Zavihek »Tržnica« na nadzorni plošči vsebuje polje za ta URL (ki se prebere iz
`GET /api/settings`).

> Opomba glede implementacije: dejanje »Shrani« na nadzorni plošči pošlje
> `pluginMarketplaceUrl` na `PATCH /api/settings`. V času pisanja ta ključ ni
> deklariran v `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), zato v svoji izdaji preverite
> trajnost shranjevanja, preden se nanjo zanesete — pot za **branje**
> (`getSettings()` → `listMarketplacePlugins()`) ključ upošteva, ko je prisoten v
> shrambi nastavitev.

## Varnost

### Raven poti — samo povratna zanka

Vtičniki izvajajo kodo v ustvarjenih podrejenih procesih, zato je celotna površina `/api/plugins`
razvrščena kot `LOCAL_ONLY` (raven 1). Uveljavljanje povratne zanke se izvede
brezpogojno **pred** vsakim preverjanjem pristnosti, zato zlorabljen žeton za upravljanje, ki doseže
napravo prek tunela, še vedno ne more namestiti, aktivirati ali odstraniti vtičnika.
Glejte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) in
stroga pravila št. 15 / št. 17.

### Zaščita registra tržnice pred SSRF

Na URL registra po meri lahko vpliva napadalec, zato ga
`listMarketplacePlugins()` pred pridobivanjem preveri v dveh plasteh:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Zavrne vse, kar ni `http:` / `https:`.
   - Zavrne dobesedno navedene zasebne gostitelje ter gostitelje povratne zanke, lokalne povezave in ULA (IPv4 **in** IPv6,
     vključno z IPv4-mapped) prek kanonične funkcije `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Razreši **tako** zapise `A` kot `AAAA` in zavrne URL, če je **kateri koli** razrešeni
     naslov zaseben — s tem prepreči obhod javno-ime-gostitelja → zasebni-IP.
   - **Varno zavrne ob napaki**: napaka pri razreševanju DNS povzroči zavrnitev URL-ja.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): ob pridobivanju znova uporabi zaščito URL-jev,
   omejeno na javne naslove, in **blokira preusmeritve** (brez prehoda javni → zasebni prek `30x`).

URL, ki ne prestane katere koli plasti, ne prekine zahteve — tržnica
tiho preklopi na vgrajeni začetni register in zabeleži opozorilo.

> Ta zaščita je bila utrjena v PR #3774 posebej za razreševanje A + AAAA in uporabo
> kanonične funkcije `isPrivateHost` namesto preverjanja, omejenega na IPv4.

### Izolacija izvajanja vtičnikov

- **Izolacija procesov** — `loadPlugin()` (`src/lib/plugins/loader.ts`) zažene
  vsak vtičnik v ločenem podrejenem procesu Node.js in komunicira prek IPC.
  Klici kavljev imajo časovno omejitev s stopnjevanjem `SIGTERM` → `SIGKILL`.
- **Seznam dovoljenih okoljskih spremenljivk** — podrejeni proces prejme samo dovoljen nabor okoljskih
  spremenljivk; širši nabor je odobren samo, kadar manifest zahteva
  dovoljenje `env`.
- **Omejitev poti** — namestitev/nadgradnja/odstranitev preveri, da se imenik vtičnika
  in `manifest.main` razrešita **znotraj** upravljanega korenskega imenika vtičnikov
  pred vsakim kopiranjem ali rekurzivnim brisanjem (zaščita pred spremenjenimi potmi v podatkovni zbirki in
  prehajanjem `../` v `manifest.main`). Aktivacija razreši simbolne povezave prek
  `realpath` in zavrne nalaganje vstopne točke, ki je zunaj imenika
  vtičnika.
- **Izbirna priponka celovitosti** — manifest lahko deklarira polje `integrity`
  (`sha256-<base64>`, oblika SRI). Če je prisotno, nalagalnik ob nalaganju preveri zgoščeno vrednost
  vstopne datoteke in ob neujemanju zavrne aktivacijo. To je
  izbirno zaznavanje spreminjanja, **ne** varnostna meja — usmerjanje samo prek povratne zanke
  in model dovoljenj sta dejanski meji.

## Manifest (`plugin.json`)

Preverja ga `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Polje              | Vrsta     | Opombe                                                                 |
| ------------------ | --------- | ---------------------------------------------------------------------- |
| `name`             | string    | Obvezno; kebab-case (`^[a-z0-9-]+$`), 1–100 znakov                     |
| `version`          | string    | Obvezno; semver (`MAJOR.MINOR.PATCH`)                                  |
| `description`      | string?   | ≤ 500 znakov                                                           |
| `author`           | string?   | ≤ 200 znakov                                                           |
| `license`          | string?   | Privzeto `MIT`                                                         |
| `main`             | string?   | Vstopna datoteka; privzeto `index.js`                                  |
| `source`           | enum?     | `local` \| `marketplace` (privzeto `local`)                            |
| `tags`             | string[]? | Iskalne oznake                                                         |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | object?   | Logične vrednosti, ki določajo, katere kavlje vtičnik implementira     |
| `skills`           | object[]? | Izbirne definicije veščin                                              |
| `enabledByDefault` | boolean?  | Samodejna aktivacija ob namestitvi                                     |
| `configSchema`     | object?   | Zemljevid konfiguracijskih polj (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Izbirna priponka vstopne datoteke `sha256-<base64>`                    |

Dovoljenja se izberejo iz naštevanja
`network` / `file-read` / `file-write` / `env` / `exec`.

## Potek življenjskega cikla

```
install (POST /api/plugins, pot)
  → pregled/preverjanje manifesta → kopiranje v začasno območje → preverjanje, ali je main znotraj imenika
  → atomsko preimenovanje v ~/.omniroute/plugins/<name> → vstavljanje vrstice v podatkovno zbirko
  → sprožitev onInstall → če je enabledByDefault: aktiviranje

activate (POST /api/plugins/{name}/activate)
  → preverjanje vsebovanosti z realpath → loadPlugin() (zagon podrejenega procesa)
  → registracija navedenih kavljev → status = "active" → sprožitev onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → sprožitev onDeactivate (PRED odjavo) → odjava kavljev
  → zaustavitev podrejenega procesa → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktiviranje, če je aktiven → sprožitev onUninstall
  → rekurzivno brisanje imenika vtičnika s preverjanjem vsebovanosti → brisanje vrstice iz podatkovne zbirke
```

Ponovni zagon `install` za imenik, katerega različica manifesta je **strogo
novejša** od nameščene različice, samodejno izvede nadgradnjo (čista ponovna namestitev; konfiguracija se
ponastavi na privzete vrednosti). Enaka ali starejša različica je zavrnjena.

## Podatkovna zbirka

Tabela `plugins` (migracija `076_create_plugins.sql`):

| Stolpec         | Vrsta   | Opombe                                               |
| --------------- | ------- | ---------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                 |
| `name`          | TEXT    | Enolično                                             |
| `version`       | TEXT    | semver; privzeto `1.0.0`                             |
| `description`   | TEXT    | Izbirno                                              |
| `author`        | TEXT    | Izbirno                                              |
| `license`       | TEXT    | Privzeto `MIT`                                       |
| `main`          | TEXT    | Vstopna datoteka; privzeto `index.js`                |
| `source`        | TEXT    | Privzeto `local`                                     |
| `tags`          | TEXT    | Polje JSON; privzeto `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`     |
| `enabled`       | INT     | 0/1; privzeto 0                                      |
| `manifest`      | TEXT    | Celoten JSON manifesta                               |
| `config`        | TEXT    | JSON; privzeto `{}`                                  |
| `config_schema` | TEXT    | JSON; privzeto `{}`                                  |
| `hooks`         | TEXT    | Polje JSON z navedenimi imeni kavljev; privzeto `[]` |
| `permissions`   | TEXT    | Polje JSON; privzeto `[]`                            |
| `plugin_dir`    | TEXT    | Absolutni namestitveni imenik                        |
| `error_message` | TEXT    | Nastavljeno, ko je `status = "error"`                |
| `installed_at`  | TEXT    | `datetime('now')`                                    |
| `updated_at`    | TEXT    | `datetime('now')`                                    |
| `activated_at`  | TEXT    | Nastavljeno ob aktiviranju                           |

Metrike in analitika vtičnikov se spremljajo v dodatnih tabelah
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Nadzorna plošča

Stran nadzorne plošče na `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) ponuja dva zavihka:

- **Nameščeni** — prikazuje nameščene vtičnike z njihovimi navedenimi kavlji,
  stikalom za aktiviranje/deaktiviranje, gumbom za odstranitev in dejanjem »Poišči vtičnike«
  (`POST /api/plugins/scan`).
- **Tržnica** — prikazuje katalog iz `GET /api/plugins/marketplace` s
  poljem za nastavitev URL-ja registra po meri.

Stran za konfiguracijo posameznega vtičnika je na `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Glejte tudi

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  zakaj je `/api/plugins` dostopen samo prek povratne zanke (1. raven)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — povezano ogrodje veščin
  (`src/lib/skills/`); vtičniki lahko deklarirajo veščine v svojem manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — izhodne integracije,
  ki jih sprožajo dogodki
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  vzorec `buildErrorBody()`, ki ga za odgovore o napakah uporablja vsaka pot vtičnika
