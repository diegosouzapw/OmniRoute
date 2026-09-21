# Plugin Marketplace (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sanningskälla:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` och
> `src/app/(dashboard)/dashboard/plugins/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute levereras med ett plugin-system i WordPress-stil. Plugin-programmen är fristående
kataloger — var och en med ett `plugin.json`-manifest och en startfil — som kopplas
in i förfrågningsflödet (`onRequest` / `onResponse` / `onError`) och i
livscykelhändelser (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Pluginmarknadsplatsen** är upptäcktslagret ovanpå detta system. Den
tillhandahåller en bläddringsbar katalog över installerbara plugin-program. Som standard är katalogen
ett litet inbyggt startregister. En operatör kan peka den mot en anpassad URL
för ett fjärrregister, och i så fall skyddas hämtningen av ett DNS-baserat SSRF-skydd
(se [Säkerhet](#security)).

Alla plugin-rutter är **endast tillgängliga via loopback** (nivå 1 — `LOCAL_ONLY`): plugin-program läser in
och kör kod i underprocesser, så rutterna är inte åtkomliga från
andra ursprung än loopback, oavsett autentisering. Se
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Så hänger delarna ihop

```
Kontrollpanel (/dashboard/plugins)
  ├─ Fliken "Installerade"  → GET /api/plugins            (listPlugins)
  │                           POST /api/plugins/scan      (pluginManager.scan)
  │                           POST /api/plugins/{name}/activate|deactivate
  │                           DELETE /api/plugins/{name}   (avinstallation)
  └─ Fliken "Marknadsplats" → GET /api/plugins/marketplace
                                → listMarketplacePlugins()
                                  ├─ ingen anpassad URL → inbyggt SEED_REGISTRY
                                  └─ anpassad URL → isSafeMarketplaceUrl() SSRF-skydd
                                                   → safeOutboundFetch(guard:"public-only")
```

- **Registerlager** — `src/lib/plugins/marketplace.ts`: listar/söker i
  katalogen och återgår till startregistret vid alla typer av fel.
- **Livscykellager** — `src/lib/plugins/manager.ts` (`pluginManager`-singleton):
  installation, uppgradering, aktivering, inaktivering, avinstallation, genomsökning och inläsning vid uppstart.
- **Manifestlager** — `src/lib/plugins/manifest.ts`: Zod-schema + standardvärden för
  `plugin.json`.
- **Genomsökare** — `src/lib/plugins/scanner.ts`: identifierar plugin-program på disken under
  plugin-katalogen.
- **Inläsare** — `src/lib/plugins/loader.ts`: startar varje plugin-program i en isolerad
  underprocess och förmedlar hook-anrop via IPC.

## Marknadsplatskatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnerar en lista med
`MarketplaceEntry`-objekt:

| Fält          | Typ      | Anmärkningar                               |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Plugin-namn i kebab-case                   |
| `version`     | string   | semver                                     |
| `description` | string   | Kort sammanfattning                        |
| `author`      | string   | Upphovsperson/organisation                 |
| `license`     | string   | Licens-ID i SPDX-stil                      |
| `downloadUrl` | string   | URL för hämtning av källkod (kan vara tom) |
| `repository`  | string?  | Valfri URL till kodförråd                  |
| `tags`        | string[] | Taggar för sökning/filtrering              |
| `downloads`   | number   | Antal hämtningar                           |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Om posten är markerad som verifierad       |
| `lastUpdated` | string   | ISO-liknande datumsträng                   |

När ingen anpassad register-URL har konfigurerats utgörs katalogen av det inbyggda
`SEED_REGISTRY` (för närvarande `request-logger`, `rate-limiter`, `cost-tracker` och
`theme-manager`). Startregistret är alltid tillgängligt — om ett konfigurerat fjärrregister
inte kan nås, returnerar en annan status än `200` eller returnerar ett okänt
innehåll, loggar `listMarketplacePlugins()` en varning och återgår till startlistan.

> Obs! Marknadsplatsens **katalog** (bläddring/sökning) är fullständigt integrerad, men
> marknadsplatsens **installation med ett klick** från katalogen är ännu inte implementerad —
> knappen "Installera" för en marknadsplatspost i kontrollpanelen visar för närvarande ett
> meddelande om att funktionen kommer snart. Installation sker i dag via installationsflödet
> från en lokal sökväg (`POST /api/plugins`) och identifiering på disken (`POST /api/plugins/scan`).

## REST API

Alla ändpunkter kräver hanteringsautentisering (`requireManagementAuth`) **och** är
endast tillgängliga via loopback — `/api/plugins` och `/api/plugins/` anges i
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Ändpunkt                         | Metod  | Beskrivning                                             |
| -------------------------------- | ------ | ------------------------------------------------------- |
| `/api/plugins`                   | GET    | Lista installerade plugins (valfritt `?status=`-filter) |
| `/api/plugins`                   | POST   | Installera ett plugin från en absolut lokal sökväg      |
| `/api/plugins/scan`              | POST   | Sök igenom plugin-katalogen och registrera nya plugins  |
| `/api/plugins/marketplace`       | GET    | Lista katalogposter från marknadsplatsen                |
| `/api/plugins/[name]`            | GET    | Hämta information om ett installerat plugin             |
| `/api/plugins/[name]`            | DELETE | Avinstallera ett plugin                                 |
| `/api/plugins/[name]/activate`   | POST   | Aktivera (läs in + registrera hooks)                    |
| `/api/plugins/[name]/deactivate` | POST   | Inaktivera (utlös `onDeactivate`, avregistrera hooks)   |
| `/api/plugins/[name]/config`     | GET    | Hämta plugin-konfiguration + konfigurationsschema       |
| `/api/plugins/[name]/config`     | PUT    | Uppdatera plugin-konfiguration (validerad mot schemat)  |

Filtret `status` för `GET /api/plugins` accepterar något av värdena
`installed` / `active` / `inactive` / `error`. Ett ogiltigt värde returnerar `400`.

### Lista installerade plugins

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installera från en lokal sökväg

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` måste vara **absolut** och får inte innehålla genomgångssegmentet `..` eller
nullbyte (framtvingas av Zod). Källkatalogen måste innehålla en giltig
`plugin.json` (eller vara överordnad till en sådan). Vid lyckat resultat är svaret `201`
med raden för det installerade pluginet.

### Bläddra på marknadsplatsen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Uppdatera plugin-konfigurationen

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validerar varje angivet värde mot pluginets
`configSchema` (deklarerat i manifestet): fält av typen `number` respekterar `min`/`max`,
och fält av typen `select` måste matcha angivet `enum`. Nycklar som inte finns i schemat
tillåts.

## Konfiguration

### Plugin-katalog

Plugins finns under OmniRoutes datakatalog:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (eller vad manifest.main pekar på)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) fastställer katalogen i
tre steg:

1. **`OMNIROUTE_PLUGINS_DIR`**, när den är inställd — används ordagrant, oavsett vad `HOME` anger. Detta är
   den uttryckliga inställningen för Docker/K8s, där pluginträdet bind-monteras på en sökväg
   som vanligtvis inte har något att göra med containerns hemkatalog (#11827).
2. `<home>/.omniroute/plugins`, där `<home>` hämtas från miljövariablerna `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, när processen inte exporterar någon hemkatalog alls.

Den fastställda katalogen loggas en gång vid start som `scanner.dir_resolved`, med namnet på
den indata som användes (`OMNIROUTE_PLUGINS_DIR`, `home` eller `no-home-fallback`) — så att en image
som utan förvarning hamnar på steg 3 anger det, i stället för att bara rapportera en tom pluginlista.
`POST /api/plugins/scan` hittar alla underkataloger där som innehåller en giltig
`plugin.json` och registrerar dem; samma katalog är den rot dit
`pluginManager.install()` kopierar plugins, så en åsidosättning flyttar identifiering och
installation tillsammans.

> **`OMNIROUTE_PLUGINS_DIR` är inte `OMNIROUTE_PLUGIN_PATH`.** Den senare läses endast av
> CLI-inläsaren för kommandoplugins (`bin/cli/plugins.mjs`) för att hitta npm-paket av typen `omniroute-cmd-*`
> som lägger till underkommandon för `omniroute` — den påverkar inte den runtime-skanner
> som beskrivs här. Se [PLUGINS.md](./PLUGINS.md) för den delen.

### Anpassad URL för marknadsplatsregistret

Källan för marknadsplatskatalogen läses från inställningen `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` läser `settings.pluginMarketplaceUrl`). När den
är inställd på en `http(s)`-URL hämtar `listMarketplacePlugins()` denna URL och accepterar
antingen en JSON-array med poster på toppnivån eller ett objekt med en `plugins`-array;
poster utan en `name` av typen sträng filtreras bort. När den inte är inställd (eller när hämtningen
stoppas av SSRF-skyddet eller returnerar ett felaktigt svar) används det inbyggda
startregistret.

Fliken "Marketplace" i kontrollpanelen visar ett fält för denna URL (som läses tillbaka från
`GET /api/settings`).

> Implementeringsanmärkning: åtgärden "Save" i kontrollpanelen skickar
> `pluginMarketplaceUrl` till `PATCH /api/settings`. I skrivande stund är denna
> nyckel inte deklarerad i `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), så verifiera persistensen i din
> version innan du förlitar dig på den — **läsningsvägen** (`getSettings()` →
> `listMarketplacePlugins()`) respekterar nyckeln när den väl finns i inställningslagret.

## Säkerhet

### Routningsnivå — endast loopback

Pluginer kör kod i startade underprocesser, så hela ytan `/api/plugins`
klassificeras som `LOCAL_ONLY` (nivå 1). Kontroll av loopback sker
ovillkorligen **före** alla autentiseringskontroller, så en läckt hanteringstoken som når
maskinen genom en tunnel kan ändå inte installera, aktivera eller avinstallera en plugin.
Se [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) och
hårda regler nr 15/17.

### SSRF-skydd för marknadsplatsens register

En anpassad register-URL är konfiguration som kan påverkas av en angripare, så innan
den hämtas kör `listMarketplacePlugins()` den genom två lager:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Avvisar allt som inte är `http:`/`https:`.
   - Avvisar privata, loopback-, länklokala och ULA-värdar som anges direkt (både IPv4 **och** IPv6,
     inklusive IPv4-mappade adresser) via den kanoniska `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Slår upp **både** `A`- och `AAAA`-poster och avvisar om **någon** uppslagen
     adress är privat — vilket stänger kryphålet offentligt värdnamn → privat IP-adress.
   - **Avvisar vid fel**: ett DNS-uppslagningsfel gör att URL:en avvisas.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): tillämpar URL-skyddet för enbart offentliga adresser
   igen vid hämtningen och **blockerar omdirigeringar** (ingen växling från offentlig till privat via `30x`).

En URL som inte klarar något av lagren avbryter inte begäran — marknadsplatsen
återgår utan meddelande till det inbyggda standardregistret och loggar en varning.

> Det här skyddet förstärktes i PR nr 3774 specifikt för att slå upp A + AAAA och använda
> den kanoniska `isPrivateHost` i stället för en kontroll som endast hanterar IPv4.

### Isolering av plugin-körning

- **Processisolering** — `loadPlugin()` (`src/lib/plugins/loader.ts`) startar
  varje plugin i en separat Node.js-underprocess och kommunicerar via IPC.
  Hook-anrop har en tidsgräns med eskalering från `SIGTERM` till `SIGKILL`.
- **Tillåtelselista för miljövariabler** — underprocessen får endast en tillåten uppsättning miljövariabler;
  den bredare uppsättningen beviljas endast när manifestet begär behörigheten
  `env`.
- **Sökvägsinneslutning** — installation/uppgradering/avinstallation säkerställer att plugin-
  katalogen och `manifest.main` matchar sökvägar **inom** den hanterade plugin-roten
  före all kopiering eller rekursiv borttagning (skyddar mot manipulerade DB-sökvägar och
  `../`-traversering i `manifest.main`). Vid aktivering löses symboliska länkar via
  `realpath`, och en startpunkt som lämnar plugin-katalogen får inte läsas in.
- **Valfri integritetslåsning** — ett manifest kan deklarera ett `integrity`-
  fält (`sha256-<base64>`, SRI-format). När det finns verifierar inläsaren
  startfilens hash vid inläsning och vägrar aktivering om den inte stämmer. Detta är
  ett valfritt skydd mot manipulering, **inte** en säkerhetsgräns — routning endast via loopback
  och behörighetsmodellen är de verkliga gränserna.

## Manifest (`plugin.json`)

Valideras av `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Fält               | Typ       | Anmärkningar                                                          |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | string    | Obligatoriskt; kebab-case (`^[a-z0-9-]+$`), 1–100 tecken              |
| `version`          | string    | Obligatoriskt; semver (`MAJOR.MINOR.PATCH`)                           |
| `description`      | string?   | ≤ 500 tecken                                                          |
| `author`           | string?   | ≤ 200 tecken                                                          |
| `license`          | string?   | Standardvärde är `MIT`                                                |
| `main`             | string?   | Startfil; standardvärde är `index.js`                                 |
| `source`           | enum?     | `local` \| `marketplace` (standardvärde är `local`)                   |
| `tags`             | string[]? | Söktaggar                                                             |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | object?   | Booleska värden som anger vilka hookar pluginen implementerar         |
| `skills`           | object[]? | Valfria färdighetsdefinitioner                                        |
| `enabledByDefault` | boolean?  | Aktivera automatiskt vid installation                                 |
| `configSchema`     | object?   | Mappning av konfigurationsfält (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Valfri låsning av startfilen med `sha256-<base64>`                    |

Behörigheter hämtas från enum-värdena
`network` / `file-read` / `file-write` / `env` / `exec`.

## Livscykelflöde

```
install (POST /api/plugins, sökväg)
  → skanna/validera manifest → kopiera till mellanlagring → verifiera att main finns i katalogen
  → atomärt namnbyte till ~/.omniroute/plugins/<name> → infoga databasrad
  → utlös onInstall → om enabledByDefault: aktivera

activate (POST /api/plugins/{name}/activate)
  → kontrollera inneslutning via realpath → loadPlugin() (starta underordnad process)
  → registrera deklarerade hooks → status = "active" → utlös onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → utlös onDeactivate (FÖRE avregistrering) → avregistrera hooks
  → avsluta underordnad process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → inaktivera om aktiv → utlös onUninstall
  → rekursiv borttagning av plugin-katalogen med inneslutningskontroll → ta bort databasrad
```

Om `install` körs igen mot en katalog vars manifestversion är **strikt
nyare** än den installerade versionen sker en automatisk uppgradering (ren ominstallation; konfigurationen återställs
till standardvärdena). En version som är samma eller äldre avvisas.

## Databas

Tabellen `plugins` (migrering `076_create_plugins.sql`):

| Kolumn          | Typ     | Anmärkningar                                             |
| --------------- | ------- | -------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                     |
| `name`          | TEXT    | Unikt                                                    |
| `version`       | TEXT    | semver; standardvärde `1.0.0`                            |
| `description`   | TEXT    | Valfritt                                                 |
| `author`        | TEXT    | Valfritt                                                 |
| `license`       | TEXT    | Standardvärde `MIT`                                      |
| `main`          | TEXT    | Startfil; standardvärde `index.js`                       |
| `source`        | TEXT    | Standardvärde `local`                                    |
| `tags`          | TEXT    | JSON-array; standardvärde `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`         |
| `enabled`       | INT     | 0/1; standardvärde 0                                     |
| `manifest`      | TEXT    | Fullständigt manifest i JSON-format                      |
| `config`        | TEXT    | JSON; standardvärde `{}`                                 |
| `config_schema` | TEXT    | JSON; standardvärde `{}`                                 |
| `hooks`         | TEXT    | JSON-array med deklarerade hook-namn; standardvärde `[]` |
| `permissions`   | TEXT    | JSON-array; standardvärde `[]`                           |
| `plugin_dir`    | TEXT    | Absolut installationskatalog                             |
| `error_message` | TEXT    | Anges när `status = "error"`                             |
| `installed_at`  | TEXT    | `datetime('now')`                                        |
| `updated_at`    | TEXT    | `datetime('now')`                                        |
| `activated_at`  | TEXT    | Anges vid aktivering                                     |

Plugin-mätvärden och analyser spåras i ytterligare tabeller
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Kontrollpanel

Kontrollpanelsidan på `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) innehåller två flikar:

- **Installerade** — listar installerade plugins med deras deklarerade hooks, en
  växlingsknapp för aktivering/inaktivering, en avinstallationsknapp och åtgärden "Sök efter plugins"
  (`POST /api/plugins/scan`).
- **Marknadsplats** — visar katalogen från `GET /api/plugins/marketplace` med ett
  fält för att ange URL:en till ett anpassat register.

En konfigurationssida för varje plugin finns på `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Se även

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  varför `/api/plugins` endast är tillgänglig via loopback (nivå 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — det relaterade ramverket för färdigheter
  (`src/lib/skills/`); plugins kan deklarera färdigheter i sina manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — händelsedrivna utgående
  integrationer
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()`-mönstret som varje plugin-rutt använder för felsvar
