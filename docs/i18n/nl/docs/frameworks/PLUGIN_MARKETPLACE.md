# Plugin Marketplace (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Bron van waarheid:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` en
> `src/app/(dashboard)/dashboard/plugins/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute wordt geleverd met een pluginsysteem in WordPress-stijl. Plugins zijn zelfstandige
mappen — elk met een `plugin.json`-manifest en een invoerbestand — die inhaken
op de aanvraagpijplijn (`onRequest` / `onResponse` / `onError`) en op
levenscyclusgebeurtenissen (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

De **Plugin Marketplace** is de ontdekkingslaag boven op dat systeem. Deze
biedt een doorzoekbare catalogus met installeerbare plugins. Standaard bestaat de catalogus uit
een klein ingebouwd basisregister; een beheerder kan een aangepaste externe
register-URL instellen. In dat geval wordt het ophalen beveiligd met een DNS-gebaseerde SSRF-beveiliging
(zie [Beveiliging](#security)).

Elke pluginroute is **uitsluitend via loopback bereikbaar** (niveau 1 — `LOCAL_ONLY`): plugins laden
code en voeren deze uit in childprocessen, waardoor de routes niet bereikbaar zijn vanaf een
niet-loopbackoorsprong, ongeacht de authenticatie. Zie
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Hoe alles samenwerkt

```
Dashboard (/dashboard/plugins)
  ├─ Tabblad "Geïnstalleerd" → GET /api/plugins            (listPlugins)
  │                            POST /api/plugins/scan      (pluginManager.scan)
  │                            POST /api/plugins/{name}/activate|deactivate
  │                            DELETE /api/plugins/{name}   (verwijderen)
  └─ Tabblad "Marketplace"   → GET /api/plugins/marketplace
                                 → listMarketplacePlugins()
                                   ├─ geen aangepaste URL → ingebouwd SEED_REGISTRY
                                   └─ aangepaste URL → isSafeMarketplaceUrl() SSRF-beveiliging
                                                       → safeOutboundFetch(guard:"public-only")
```

- **Registerlaag** — `src/lib/plugins/marketplace.ts`: geeft de
  catalogus weer en doorzoekt deze, met terugval op het basisregister bij elke fout.
- **Levenscycluslaag** — `src/lib/plugins/manager.ts` (`pluginManager`-singleton):
  installeren, upgraden, activeren, deactiveren, verwijderen, scannen en laden bij het opstarten.
- **Manifestlaag** — `src/lib/plugins/manifest.ts`: Zod-schema + standaardwaarden voor
  `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: detecteert plugins op schijf in
  de pluginmap.
- **Lader** — `src/lib/plugins/loader.ts`: start elke plugin in een geïsoleerd
  childproces en bemiddelt hookaanroepen via IPC.

## Marketplace-catalogus

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) retourneert een lijst met
`MarketplaceEntry`-objecten:

| Veld          | Type     | Opmerkingen                                |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Pluginnaam in kebab-case                   |
| `version`     | string   | semver                                     |
| `description` | string   | Korte samenvatting                         |
| `author`      | string   | Auteur / organisatie                       |
| `license`     | string   | Licentie-id in SPDX-stijl                  |
| `downloadUrl` | string   | Download-URL van de bron (kan leeg zijn)   |
| `repository`  | string?  | Optionele repository-URL                   |
| `tags`        | string[] | Tags voor zoeken/filteren                  |
| `downloads`   | number   | Aantal downloads                           |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Of het item als geverifieerd is gemarkeerd |
| `lastUpdated` | string   | Datumtekenreeks in een ISO-achtige notatie |

Wanneer er geen aangepaste register-URL is geconfigureerd, gebruikt de catalogus het ingebouwde
`SEED_REGISTRY` (momenteel `request-logger`, `rate-limiter`, `cost-tracker` en
`theme-manager`). Het basisregister is altijd beschikbaar — als een geconfigureerd extern
register onbereikbaar is, een andere status dan `200` retourneert of een niet-herkende
inhoud retourneert, registreert `listMarketplacePlugins()` een waarschuwing en valt het terug op de basislijst.

> Opmerking: de **catalogus** van de marketplace (bladeren/zoeken) is end-to-end aangesloten, maar
> installatie met één klik vanuit de marketplace-**catalogus** is nog niet geïmplementeerd — de
> knop "Installeren" in het dashboard bij een marketplace-item toont momenteel een
> melding dat deze functie "binnenkort beschikbaar" is. Installatie verloopt momenteel via de installatieprocedure
> voor lokale paden (`POST /api/plugins`) en detectie op schijf (`POST /api/plugins/scan`).

## REST-API

Alle endpoints vereisen beheerauthenticatie (`requireManagementAuth`) **en** zijn
alleen via loopback toegankelijk — `/api/plugins` en `/api/plugins/` zijn opgenomen in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Methode | Beschrijving                                                          |
| -------------------------------- | ------- | --------------------------------------------------------------------- |
| `/api/plugins`                   | GET     | Geïnstalleerde plugins weergeven (optioneel `?status=`-filter)        |
| `/api/plugins`                   | POST    | Een plugin installeren vanaf een absoluut lokaal pad                  |
| `/api/plugins/scan`              | POST    | De pluginmap scannen en nieuwe plugins registreren                    |
| `/api/plugins/marketplace`       | GET     | Items uit de marketplacecatalogus weergeven                           |
| `/api/plugins/[name]`            | GET     | Details van een geïnstalleerde plugin ophalen                         |
| `/api/plugins/[name]`            | DELETE  | Een plugin verwijderen                                                |
| `/api/plugins/[name]/activate`   | POST    | Activeren (laden + hooks registreren)                                 |
| `/api/plugins/[name]/deactivate` | POST    | Deactiveren (`onDeactivate` uitvoeren, hooks deregistreren)           |
| `/api/plugins/[name]/config`     | GET     | Pluginconfiguratie + configuratieschema ophalen                       |
| `/api/plugins/[name]/config`     | PUT     | Pluginconfiguratie bijwerken (gevalideerd aan de hand van het schema) |

Het `status`-filter van `GET /api/plugins` accepteert een van de volgende waarden:
`installed` / `active` / `inactive` / `error`. Een ongeldige waarde retourneert `400`.

### Geïnstalleerde plugins weergeven

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installeren vanaf een lokaal pad

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Het `path` moet **absoluut** zijn en mag geen `..`-traversalsegmenten of
nullbytes bevatten (afgedwongen door Zod). De bronmap moet een geldig
`plugin.json` bevatten (of een bovenliggende map daarvan zijn). Bij succes is de
respons `201`, met de rij van de geïnstalleerde plugin.

### De marketplace bekijken

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Pluginconfiguratie bijwerken

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valideert elke opgegeven waarde aan de hand van het
`configSchema` van de plugin (gedeclareerd in het manifest): velden van het type
`number` respecteren `min`/`max`, en velden van het type `select` moeten
overeenkomen met de gedeclareerde `enum`. Sleutels die niet in het schema
voorkomen, worden toegestaan.

## Configuratie

### Pluginmap

Plugins bevinden zich onder de OmniRoute-gegevensmap:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (of waar manifest.main naar verwijst)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) bepaalt die map in
drie stappen:

1. **`OMNIROUTE_PLUGINS_DIR`**, indien ingesteld — wordt letterlijk gebruikt, ongeacht wat `HOME` aangeeft. Dit is
   de expliciete instelling voor Docker/K8s, waar de pluginstructuur via een bind-mount aan een pad is gekoppeld
   dat meestal niets met de thuismap van de container te maken heeft (#11827).
2. `<home>/.omniroute/plugins`, waarbij `<home>` afkomstig is uit de omgevingsvariabelen `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, wanneer het proces helemaal geen thuismap exporteert.

De bepaalde map wordt bij het opstarten eenmaal gelogd als `scanner.dir_resolved`, met
vermelding van de gebruikte invoer (`OMNIROUTE_PLUGINS_DIR`, `home` of `no-home-fallback`) — zodat een image
dat stilzwijgend bij stap 3 uitkomt dit meldt, in plaats van alleen een lege pluginlijst te rapporteren.
`POST /api/plugins/scan` detecteert elke submap daarin die een geldig
`plugin.json` bevat en registreert deze; dezelfde map is de hoofdmap waarnaar
`pluginManager.install()` plugins kopieert, zodat een override zowel de detectie als
de installatie verplaatst.

> **`OMNIROUTE_PLUGINS_DIR` is niet `OMNIROUTE_PLUGIN_PATH`.** Die laatste wordt alleen gelezen door
> de command-plugin-loader van de CLI (`bin/cli/plugins.mjs`) om `omniroute-cmd-*`-npm-
> pakketten te vinden die `omniroute`-subcommando's toevoegen — deze heeft geen effect op de hier
> beschreven runtimescanner. Zie [PLUGINS.md](./PLUGINS.md) voor dat onderdeel.

### Aangepaste URL voor het marketplace-register

De bron van de marketplacecatalogus wordt gelezen uit de instelling `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` leest `settings.pluginMarketplaceUrl`). Wanneer
deze is ingesteld op een `http(s)`-URL, haalt `listMarketplacePlugins()` die URL op en accepteert
het ofwel een JSON-array met items op het hoogste niveau, ofwel een object met een `plugins`-array;
items zonder een `name` van het type string worden uitgefilterd. Wanneer de instelling niet is ingesteld
(of wanneer het ophalen niet door de SSRF-beveiliging komt / een ongeldige respons retourneert), wordt
het ingebouwde initiële register gebruikt.

Het tabblad "Marketplace" van het dashboard bevat een veld voor deze URL (teruggelezen via
`GET /api/settings`).

> Implementatieopmerking: de actie "Opslaan" van het dashboard verzendt
> `pluginMarketplaceUrl` naar `PATCH /api/settings`. Op het moment van schrijven is deze
> sleutel niet gedeclareerd in `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), dus controleer in uw
> release of de instelling wordt opgeslagen voordat u erop vertrouwt — het **leespad** (`getSettings()` →
> `listMarketplacePlugins()`) respecteert de sleutel zodra deze in de instellingenopslag
> aanwezig is.

## Beveiliging

### Routelaag — alleen loopback

Plugins voeren code uit in gestarte onderliggende processen. Daarom is het volledige oppervlak `/api/plugins`
geclassificeerd als `LOCAL_ONLY` (laag 1). Loopback-handhaving vindt
onvoorwaardelijk **vóór** elke authenticatiecontrole plaats. Daardoor kan een uitgelekt beheertoken dat
via een tunnel de host bereikt nog steeds geen plugin installeren, activeren of verwijderen.
Zie [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) en
harde regels #15 / #17.

### SSRF-beveiliging voor het marketplace-register

Een aangepaste register-URL is configuratie die door een aanvaller kan worden beïnvloed. Daarom
voert `listMarketplacePlugins()` deze vóór het ophalen door twee lagen:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Weigert alles wat niet `http:` / `https:` is.
   - Weigert letterlijke privé-, loopback-, link-local- en ULA-hosts (IPv4 **en** IPv6,
     inclusief IPv4-mapped) via de canonieke `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Lost **zowel** `A`- als `AAAA`-records op en weigert de URL als **enig** opgelost
     adres privé is — hiermee wordt de omzeiling via openbare hostnaam → privé-IP gedicht.
   - **Faalt gesloten**: bij een DNS-resolutiefout wordt de URL geweigerd.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): past de URL-beveiliging voor alleen openbare adressen
   tijdens het ophalen opnieuw toe en **blokkeert omleidingen** (geen
   omschakeling van openbaar → privé via `30x`).

Een URL die voor een van beide lagen faalt, breekt het verzoek niet af — de marketplace
valt stilzwijgend terug op het ingebouwde initiële register en registreert een waarschuwing.

> Deze beveiliging is in PR #3774 specifiek aangescherpt om A + AAAA op te lossen en
> de canonieke `isPrivateHost` te gebruiken in plaats van een controle die alleen IPv4 ondersteunt.

### Isolatie van pluginuitvoering

- **Procesisolatie** — `loadPlugin()` (`src/lib/plugins/loader.ts`) start
  elke plugin in een afzonderlijk onderliggend Node.js-proces en communiceert via IPC.
  Hook-aanroepen hebben een time-out met escalatie van `SIGTERM` → `SIGKILL`.
- **Allowlist voor omgevingsvariabelen** — het onderliggende proces ontvangt alleen een toegestane set omgevingsvariabelen;
  de bredere set wordt alleen toegekend wanneer het manifest om de
  permissie `env` vraagt.
- **Padinsluiting** — bij installatie/upgrade/verwijdering wordt gecontroleerd of de pluginmap
  en `manifest.main` zich **binnen** de beheerde pluginhoofdmap bevinden
  voordat er iets wordt gekopieerd of recursief verwijderd (beschermt tegen gemanipuleerde databasepaden en
  `../`-traversal in `manifest.main`). Bij activering worden symlinks opgelost via
  `realpath` en wordt geweigerd een ingangspunt te laden dat buiten de pluginmap
  valt.
- **Optionele integriteitspin** — een manifest kan een veld `integrity`
  (`sha256-<base64>`, SRI-indeling) declareren. Indien aanwezig, verifieert de loader tijdens het laden de
  hash van het invoerbestand en weigert deze activering bij een afwijking. Dit is
  optionele detectie van manipulatie, **geen** beveiligingsgrens — routering die alleen loopback toestaat
  en het permissiemodel vormen de daadwerkelijke grenzen.

## Manifest (`plugin.json`)

Gevalideerd door `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Veld               | Type      | Opmerkingen                                                              |
| ------------------ | --------- | ------------------------------------------------------------------------ |
| `name`             | string    | Vereist; kebab-case (`^[a-z0-9-]+$`), 1–100 tekens                       |
| `version`          | string    | Vereist; semver (`MAJOR.MINOR.PATCH`)                                    |
| `description`      | string?   | ≤ 500 tekens                                                             |
| `author`           | string?   | ≤ 200 tekens                                                             |
| `license`          | string?   | Standaardwaarde is `MIT`                                                 |
| `main`             | string?   | Invoerbestand; standaardwaarde is `index.js`                             |
| `source`           | enum?     | `local` \| `marketplace` (standaardwaarde is `local`)                    |
| `tags`             | string[]? | Zoektags                                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                          |
| `hooks`            | object?   | Booleans die aangeven welke hooks de plugin implementeert                |
| `skills`           | object[]? | Optionele vaardigheidsdefinities                                         |
| `enabledByDefault` | boolean?  | Automatisch activeren bij installatie                                    |
| `configSchema`     | object?   | Toewijzing van configuratievelden (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Optionele `sha256-<base64>`-pin voor het invoerbestand                   |

Permissies zijn afkomstig uit de enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Levenscyclus

```
install (POST /api/plugins, pad)
  → manifest scannen/valideren → naar staging kopiëren → controleren of main zich binnen de map bevindt
  → atomair hernoemen naar ~/.omniroute/plugins/<name> → databaserij invoegen
  → onInstall aanroepen → indien enabledByDefault: activeren

activate (POST /api/plugins/{name}/activate)
  → insluitingscontrole via realpath → loadPlugin() (onderliggend proces starten)
  → gedeclareerde hooks registreren → status = "active" → onActivate aanroepen

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate aanroepen (VÓÓR afregistratie) → hooks afregistreren
  → onderliggend proces beëindigen → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactiveren indien actief → onUninstall aanroepen
  → recursief verwijderen van pluginmap met insluitingscontrole → databaserij verwijderen
```

Als `install` opnieuw wordt uitgevoerd voor een map waarvan de manifestversie **strikt
nieuwer** is dan de geïnstalleerde versie, wordt automatisch een upgrade uitgevoerd
(schone herinstallatie; configuratie wordt teruggezet naar de standaardwaarden).
Dezelfde of een oudere versie wordt geweigerd.

## Database

Tabel `plugins` (migratie `076_create_plugins.sql`):

| Kolom           | Type    | Opmerkingen                                            |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Uniek                                                  |
| `version`       | TEXT    | semver; standaard `1.0.0`                              |
| `description`   | TEXT    | Optioneel                                              |
| `author`        | TEXT    | Optioneel                                              |
| `license`       | TEXT    | Standaard `MIT`                                        |
| `main`          | TEXT    | Startbestand; standaard `index.js`                     |
| `source`        | TEXT    | Standaard `local`                                      |
| `tags`          | TEXT    | JSON-array; standaard `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; standaard 0                                       |
| `manifest`      | TEXT    | Volledig manifest als JSON                             |
| `config`        | TEXT    | JSON; standaard `{}`                                   |
| `config_schema` | TEXT    | JSON; standaard `{}`                                   |
| `hooks`         | TEXT    | JSON-array met gedeclareerde hooknamen; standaard `[]` |
| `permissions`   | TEXT    | JSON-array; standaard `[]`                             |
| `plugin_dir`    | TEXT    | Absolute installatiemap                                |
| `error_message` | TEXT    | Ingesteld wanneer `status = "error"`                   |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Ingesteld bij activering                               |

Pluginmetrieken en -analyses worden bijgehouden in aanvullende tabellen
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

De dashboardpagina op `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) bevat twee tabbladen:

- **Geïnstalleerd** — toont geïnstalleerde plugins met hun gedeclareerde hooks,
  een schakelaar voor activeren/deactiveren, een knop om de plugin te verwijderen
  en een actie "Scannen naar plugins" (`POST /api/plugins/scan`).
- **Marketplace** — toont de catalogus van `GET /api/plugins/marketplace` met een
  veld om de aangepaste register-URL in te stellen.

Een configuratiepagina per plugin bevindt zich op `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Zie ook

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  waarom `/api/plugins` alleen via loopback toegankelijk is (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — het gerelateerde skillsframework
  (`src/lib/skills/`); plug-ins kunnen skills declareren in hun manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — gebeurtenisgestuurde uitgaande
  integraties
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  het `buildErrorBody()`-patroon dat elke plug-inroute gebruikt voor foutresponses
