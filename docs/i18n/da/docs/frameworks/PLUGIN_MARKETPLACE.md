# Plugin Marketplace (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sandhedskilde:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` og
> `src/app/(dashboard)/dashboard/plugins/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute leveres med et WordPress-lignende pluginsystem. Plugins er selvstændige
mapper — hver med et `plugin.json`-manifest og en startfil — som kobler sig på
forespørgselspipelinen (`onRequest` / `onResponse` / `onError`) og
livscyklushændelser (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Pluginmarkedspladsen** er registreringslaget oven på dette system. Den
giver adgang til et katalog over plugins, der kan installeres. Som standard er
kataloget et lille, indbygget basisregister. En operatør kan konfigurere en URL
til et brugerdefineret fjernregister, og i så fald sikres hentningen af en
DNS-resolverende SSRF-beskyttelse (se [Sikkerhed](#security)).

Alle pluginruter er **begrænset til loopback** (niveau 1 — `LOCAL_ONLY`): Plugins
indlæser og afvikler kode i underprocesser, så ruterne er utilgængelige fra en
oprindelse uden for loopback, uanset godkendelse. Se
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Sådan hænger det sammen

```
Kontrolpanel (/dashboard/plugins)
  ├─ Fanen "Installeret" → GET /api/plugins            (listPlugins)
  │                        POST /api/plugins/scan      (pluginManager.scan)
  │                        POST /api/plugins/{name}/activate|deactivate
  │                        DELETE /api/plugins/{name}   (afinstallation)
  └─ Fanen "Markedsplads" → GET /api/plugins/marketplace
                             → listMarketplacePlugins()
                               ├─ ingen brugerdefineret URL → indbygget SEED_REGISTRY
                               └─ brugerdefineret URL → isSafeMarketplaceUrl() SSRF-beskyttelse
                                                      → safeOutboundFetch(guard:"public-only")
```

- **Registerlag** — `src/lib/plugins/marketplace.ts`: viser/søger i
  kataloget og falder tilbage til basisregistret ved enhver fejl.
- **Livscykluslag** — `src/lib/plugins/manager.ts` (`pluginManager`-singleton):
  installation, opgradering, aktivering, deaktivering, afinstallation, scanning og indlæsning ved opstart.
- **Manifestlag** — `src/lib/plugins/manifest.ts`: Zod-skema og standardværdier
  for `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: finder plugins på disken under
  pluginmappen.
- **Indlæser** — `src/lib/plugins/loader.ts`: starter hvert plugin i en isoleret
  underproces og formidler hookkald via IPC.

## Markedspladskatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnerer en liste
over `MarketplaceEntry`-objekter:

| Felt          | Type     | Bemærkninger                                 |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | Pluginnavn i kebab-case                      |
| `version`     | string   | semver                                       |
| `description` | string   | Kort beskrivelse                             |
| `author`      | string   | Forfatter/organisation                       |
| `license`     | string   | Licens-id i SPDX-stil                        |
| `downloadUrl` | string   | URL til download af kildekode (kan være tom) |
| `repository`  | string?  | Valgfri URL til repository                   |
| `tags`        | string[] | Tags til søgning/filtrering                  |
| `downloads`   | number   | Antal downloads                              |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Om posten er markeret som verificeret        |
| `lastUpdated` | string   | ISO-lignende datostreng                      |

Når der ikke er konfigureret en URL til et brugerdefineret register, er kataloget
det indbyggede `SEED_REGISTRY` (i øjeblikket `request-logger`, `rate-limiter`,
`cost-tracker` og `theme-manager`). Basisregistret er altid tilgængeligt — hvis
et konfigureret fjernregister ikke kan nås, returnerer en status, der ikke er
`200`, eller returnerer et ukendt indhold, logger `listMarketplacePlugins()` en
advarsel og falder tilbage til basislisten.

> Bemærk: Markedspladsens **katalog** (gennemse/søge) er fuldt integreret, men
> installation med ét klik fra markedspladsens **katalog** er endnu ikke
> implementeret — kontrolpanelets knap "Installer" på en markedspladspost viser
> i øjeblikket en meddelelse om, at funktionen "kommer snart". Installation
> foregår i dag via installation fra en lokal sti (`POST /api/plugins`) og
> registrering på disken (`POST /api/plugins/scan`).

## REST API

Alle slutpunkter kræver administrationsgodkendelse (`requireManagementAuth`) **og** er
kun tilgængelige via loopback — `/api/plugins` og `/api/plugins/` er angivet i
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Slutpunkt                        | Metode | Beskrivelse                                                  |
| -------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/plugins`                   | GET    | Vis installerede plugins (valgfrit `?status=`-filter)        |
| `/api/plugins`                   | POST   | Installer et plugin fra en absolut lokal sti                 |
| `/api/plugins/scan`              | POST   | Scan pluginmappen, og registrer nye plugins                  |
| `/api/plugins/marketplace`       | GET    | Vis poster i markedspladskataloget                           |
| `/api/plugins/[name]`            | GET    | Hent oplysninger om et installeret plugin                    |
| `/api/plugins/[name]`            | DELETE | Afinstaller et plugin                                        |
| `/api/plugins/[name]/activate`   | POST   | Aktivér (indlæs + registrer hooks)                           |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivér (udløs `onDeactivate`, afregistrer hooks)          |
| `/api/plugins/[name]/config`     | GET    | Hent plugin-konfiguration + konfigurationsskema              |
| `/api/plugins/[name]/config`     | PUT    | Opdater plugin-konfiguration (valideret i forhold til skema) |

`status`-filteret for `GET /api/plugins` accepterer én af
`installed` / `active` / `inactive` / `error`. En ugyldig værdi returnerer `400`.

### Vis installerede plugins

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installer fra en lokal sti

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` skal være **absolut** og må ikke indeholde `..`-gennemløbssegmenter eller
nullbytes (håndhævet af Zod). Kildemappen skal indeholde en gyldig
`plugin.json` (eller være overordnet mappe til en sådan). Ved succes er svaret `201` med
rækken for det installerede plugin.

### Gennemse markedspladsen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Opdater plugin-konfiguration

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validerer hver angivet værdi i forhold til pluginets
`configSchema` (erklæret i manifestet): Felter af typen `number` overholder `min`/`max`,
og felter af typen `select` skal matche den erklærede `enum`. Nøgler, der ikke findes i skemaet,
tillades.

## Konfiguration

### Pluginmappe

Plugins findes under OmniRoutes datamappe:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (eller det, som manifest.main peger på)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) finder denne mappe i
tre trin:

1. **`OMNIROUTE_PLUGINS_DIR`**, når den er angivet — bruges ordret, uanset hvad `HOME` siger. Dette er
   den eksplicitte indstilling for Docker/K8s, hvor plugintræet bind-monteres på en sti,
   der normalt ikke har noget med containerens hjemmemappe at gøre (#11827).
2. `<home>/.omniroute/plugins`, hvor `<home>` kommer fra miljøvariablerne `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, når processen slet ikke eksporterer nogen hjemmemappe.

Den fundne mappe logges én gang ved opstart som `scanner.dir_resolved` med navnet på det
input, der blev valgt (`OMNIROUTE_PLUGINS_DIR`, `home` eller `no-home-fallback`) — så et image,
der ubemærket ender på trin 3, oplyser dette i stedet for blot at rapportere en tom pluginliste.
`POST /api/plugins/scan` finder enhver undermappe dér, som indeholder en gyldig
`plugin.json`, og registrerer den. Den samme mappe er den rodmappe, som
`pluginManager.install()` kopierer plugins til, så en tilsidesættelse flytter registrering og
installation samlet.

> **`OMNIROUTE_PLUGINS_DIR` er ikke `OMNIROUTE_PLUGIN_PATH`.** Sidstnævnte læses kun af
> CLI'ens command-plugin-indlæser (`bin/cli/plugins.mjs`) for at finde `omniroute-cmd-*`-npm-
> pakker, der tilføjer `omniroute`-underkommandoer — den påvirker ikke runtime-scanneren,
> der er beskrevet her. Se [PLUGINS.md](./PLUGINS.md) for den del.

### Brugerdefineret URL til markedspladsregister

Kilden til markedspladskataloget læses fra indstillingen `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` læser `settings.pluginMarketplaceUrl`). Når den
er angivet til en `http(s)`-URL, henter `listMarketplacePlugins()` denne URL og accepterer
enten et JSON-array af poster på øverste niveau eller et objekt med et `plugins`-array.
Poster uden en `name` af typen string filtreres fra. Når den ikke er angivet (eller når hentningen
afvises af SSRF-beskyttelsen / returnerer et ugyldigt svar), bruges det indbyggede
startregister.

Dashboardets fane "Markedsplads" indeholder et felt til denne URL (læses tilbage fra
`GET /api/settings`).

> Implementeringsbemærkning: Dashboardets handling "Gem" sender
> `pluginMarketplaceUrl` til `PATCH /api/settings`. I skrivende stund er denne
> nøgle ikke erklæret i `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), så kontrollér persistens i din
> udgivelse, før du er afhængig af den — **læse**stien (`getSettings()` →
> `listMarketplacePlugins()`) respekterer nøglen, når den først findes i
> indstillingslageret.

## Sikkerhed

### Ruteniveau — kun loopback

Plugins kører kode i underordnede processer, så hele `/api/plugins`-fladen er
klassificeret som `LOCAL_ONLY` (niveau 1). Håndhævelse af loopback udføres
ubetinget **før** ethvert godkendelsestjek, så et lækket administrationstoken,
der når maskinen gennem en tunnel, stadig ikke kan installere, aktivere eller
afinstallere et plugin. Se
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) og
hårde regler nr. 15 / 17.

### SSRF-beskyttelse for markedspladsens register

En brugerdefineret register-URL er konfiguration, som kan påvirkes af en angriber,
så før den hentes, sender `listMarketplacePlugins()` den gennem to lag:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Afviser alt, der ikke er `http:` / `https:`.
   - Afviser bogstavelige private værter, loopback-værter, link-local-værter og
     ULA-værter (IPv4 **og** IPv6, inklusive IPv4-mappede adresser) via den
     kanoniske `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Slår **både** `A`- og `AAAA`-poster op og afviser, hvis **nogen** funden
     adresse er privat — hvilket lukker omgåelsen offentligt værtsnavn →
     privat IP-adresse.
   - **Fejler lukket**: En fejl i DNS-opslag medfører, at URL'en afvises.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): anvender URL-beskyttelsen, der
   kun tillader offentlige adresser, igen på hentetidspunktet og **blokerer
   omdirigeringer** (ingen offentlig → privat `30x`-pivotering).

En URL, der ikke består et af lagene, afbryder ikke anmodningen — markedspladsen
falder automatisk tilbage til det indbyggede startregister og logger en advarsel.

> Denne beskyttelse blev styrket i PR #3774 specifikt for at slå A + AAAA op og
> bruge den kanoniske `isPrivateHost` i stedet for et tjek, der kun understøtter
> IPv4.

### Isolation af pluginudførelse

- **Procesisolation** — `loadPlugin()` (`src/lib/plugins/loader.ts`) starter
  hvert plugin i en separat underordnet Node.js-proces og kommunikerer via IPC.
  Hook-kald har en timeout med eskalering fra `SIGTERM` → `SIGKILL`.
- **Tilladelsesliste for miljøvariabler** — den underordnede proces modtager kun
  et tilladt sæt miljøvariabler; det bredere sæt tildeles kun, når manifestet
  anmoder om tilladelsen `env`.
- **Stiindeslutning** — installation/opgradering/afinstallation kontrollerer, at
  pluginmappen og `manifest.main` fortolkes som værende **inden for** den
  administrerede pluginrod før enhver kopiering eller rekursiv sletning
  (beskytter mod manipulerede databasestier og `../`-traversering i
  `manifest.main`). Ved aktivering opløses symbolske links via `realpath`, og et
  indgangspunkt, der slipper ud af pluginmappen, nægtes indlæsning.
- **Valgfri integritetsbinding** — et manifest kan angive et `integrity`-felt
  (`sha256-<base64>`, SRI-format). Når feltet er angivet, kontrollerer indlæseren
  indgangsfilens hash ved indlæsning og nægter aktivering ved uoverensstemmelse.
  Det er valgfri registrering af manipulation, **ikke** en sikkerhedsgrænse —
  routing begrænset til loopback og tilladelsesmodellen er de egentlige grænser.

## Manifest (`plugin.json`)

Valideres af `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Felt               | Type      | Bemærkninger                                                          |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | string    | Påkrævet; kebab-case (`^[a-z0-9-]+$`), 1–100 tegn                     |
| `version`          | string    | Påkrævet; semver (`MAJOR.MINOR.PATCH`)                                |
| `description`      | string?   | ≤ 500 tegn                                                            |
| `author`           | string?   | ≤ 200 tegn                                                            |
| `license`          | string?   | Standardværdien er `MIT`                                              |
| `main`             | string?   | Indgangsfil; standardværdien er `index.js`                            |
| `source`           | enum?     | `local` \| `marketplace` (standardværdien er `local`)                 |
| `tags`             | string[]? | Søgetags                                                              |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | object?   | Booleske værdier, der angiver, hvilke hooks pluginet implementerer    |
| `skills`           | object[]? | Valgfrie færdighedsdefinitioner                                       |
| `enabledByDefault` | boolean?  | Aktivér automatisk ved installation                                   |
| `configSchema`     | object?   | Kort over konfigurationsfelter (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Valgfri `sha256-<base64>`-binding af indgangsfilen                    |

Tilladelser hentes fra enum-værdierne
`network` / `file-read` / `file-write` / `env` / `exec`.

## Livscyklusflow

```
install (POST /api/plugins, sti)
  → scan/valider manifest → kopiér til staging → kontrollér, at main er inden for mappen
  → atomisk omdøbning til ~/.omniroute/plugins/<name> → indsæt DB-række
  → udløs onInstall → hvis enabledByDefault: aktivér

activate (POST /api/plugins/{name}/activate)
  → realpath-indeslutningskontrol → loadPlugin() (start underproces)
  → registrér deklarerede hooks → status = "active" → udløs onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → udløs onDeactivate (FØR afregistrering) → afregistrér hooks
  → afslut underproces → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktivér, hvis aktiv → udløs onUninstall
  → indeslutningskontrolleret rekursiv sletning af plugin-mappen → slet DB-række
```

Hvis `install` køres igen mod en mappe, hvis manifestversion er **strengt
nyere** end den installerede version, opgraderes der automatisk (ren geninstallation; konfigurationen nulstilles
til standardværdierne). En identisk eller ældre version afvises.

## Database

Tabellen `plugins` (migrering `076_create_plugins.sql`):

| Kolonne         | Type    | Bemærkninger                                              |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Unik                                                      |
| `version`       | TEXT    | semver; standardværdi `1.0.0`                             |
| `description`   | TEXT    | Valgfri                                                   |
| `author`        | TEXT    | Valgfri                                                   |
| `license`       | TEXT    | Standardværdi `MIT`                                       |
| `main`          | TEXT    | Startfil; standardværdi `index.js`                        |
| `source`        | TEXT    | Standardværdi `local`                                     |
| `tags`          | TEXT    | JSON-array; standardværdi `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; standardværdi 0                                      |
| `manifest`      | TEXT    | Fuldt manifest i JSON-format                              |
| `config`        | TEXT    | JSON; standardværdi `{}`                                  |
| `config_schema` | TEXT    | JSON; standardværdi `{}`                                  |
| `hooks`         | TEXT    | JSON-array med deklarerede hook-navne; standardværdi `[]` |
| `permissions`   | TEXT    | JSON-array; standardværdi `[]`                            |
| `plugin_dir`    | TEXT    | Absolut installationsmappe                                |
| `error_message` | TEXT    | Angives, når `status = "error"`                           |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Angives ved aktivering                                    |

Plugin-metrikker og -analyser spores i yderligere tabeller
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Dashboard-siden på `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) indeholder to faner:

- **Installeret** — viser installerede plugins med deres deklarerede hooks, en
  knap til aktivering/deaktivering, en afinstallationsknap og handlingen "Scan efter plugins"
  (`POST /api/plugins/scan`).
- **Markedsplads** — viser kataloget fra `GET /api/plugins/marketplace` med et
  felt til angivelse af URL'en til det brugerdefinerede register.

En konfigurationsside for hvert plugin findes på `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Se også

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  hvorfor `/api/plugins` kun er tilgængelig via loopback (niveau 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — det relaterede framework for færdigheder
  (`src/lib/skills/`); plugins kan deklarere færdigheder i deres manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hændelsesdrevne udgående
  integrationer
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  det `buildErrorBody()`-mønster, som hver pluginrute bruger til fejlsvar
