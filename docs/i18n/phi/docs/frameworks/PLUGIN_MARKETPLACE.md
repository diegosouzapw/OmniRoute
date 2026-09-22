# Plugin Marketplace (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, at
> `src/app/(dashboard)/dashboard/plugins/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Kasama sa OmniRoute ang isang plugin system na tulad ng sa WordPress. Ang mga plugin ay mga nagsasariling
directory — bawat isa ay may `plugin.json` manifest at isang entry file — na kumokonekta
sa request pipeline (`onRequest` / `onResponse` / `onError`) at sa
mga lifecycle event (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

Ang **Plugin Marketplace** ang discovery layer sa ibabaw ng sistemang iyon. Nagbibigay ito
ng catalog ng mga mai-install na plugin na maaaring i-browse. Bilang default, ang catalog ay isang
maliit na built-in na seed registry; maaari itong ituro ng isang operator sa isang pasadyang remote
registry URL, kung saan pinatitibay ang pag-fetch gamit ang DNS-resolving na SSRF guard
(tingnan ang [Seguridad](#security)).

Ang bawat ruta ng plugin ay **loopback-only** (Tier 1 — `LOCAL_ONLY`): naglo-load
at nagpapatakbo ng code ang mga plugin sa mga child process, kaya hindi maaabot ang mga ruta mula sa
isang non-loopback origin anuman ang auth. Tingnan ang
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Paano Ito Magkakaugnay

```
Dashboard (/dashboard/plugins)
  ├─ Tab na "Naka-install" → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (i-uninstall)
  └─ Tab na "Marketplace"  → GET /api/plugins/marketplace
                               → listMarketplacePlugins()
                                 ├─ walang pasadyang URL → built-in na SEED_REGISTRY
                                 └─ pasadyang URL → isSafeMarketplaceUrl() SSRF guard
                                                   → safeOutboundFetch(guard:"public-only")
```

- **Registry layer** — `src/lib/plugins/marketplace.ts`: inililista / hinahanap ang
  catalog, at bumabalik sa seed registry kapag may anumang pagkabigo.
- **Lifecycle layer** — `src/lib/plugins/manager.ts` (`pluginManager` singleton):
  pag-install, pag-upgrade, pag-activate, pag-deactivate, pag-uninstall, pag-scan, pag-load sa startup.
- **Manifest layer** — `src/lib/plugins/manifest.ts`: Zod schema + mga default para sa
  `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: tumutuklas ng mga plugin sa disk sa ilalim ng
  directory ng plugin.
- **Loader** — `src/lib/plugins/loader.ts`: sinisimulan ang bawat plugin sa isang nakahiwalay na
  child process at namamagitan sa mga hook call sa pamamagitan ng IPC.

## Catalog ng Marketplace

Ang `listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) ay nagbabalik ng listahan ng
mga `MarketplaceEntry` object:

| Field         | Type     | Mga Tala                                              |
| ------------- | -------- | ----------------------------------------------------- |
| `name`        | string   | Pangalan ng plugin na nasa kebab-case                 |
| `version`     | string   | semver                                                |
| `description` | string   | Maikling buod                                         |
| `author`      | string   | May-akda / organisasyon                               |
| `license`     | string   | SPDX-style na license id                              |
| `downloadUrl` | string   | URL ng pag-download ng source (maaaring walang laman) |
| `repository`  | string?  | Opsyonal na URL ng repository                         |
| `tags`        | string[] | Mga tag para sa paghahanap/pag-filter                 |
| `downloads`   | number   | Bilang ng mga pag-download                            |
| `rating`      | number   | 0–5                                                   |
| `verified`    | boolean  | Kung minarkahan bilang verified ang entry             |
| `lastUpdated` | string   | ISO-ish na string ng petsa                            |

Kapag walang naka-configure na pasadyang registry URL, ang catalog ay ang built-in na
`SEED_REGISTRY` (sa kasalukuyan ay `request-logger`, `rate-limiter`, `cost-tracker`, at
`theme-manager`). Palaging available ang seed registry — kung hindi maabot ang isang naka-configure na remote
registry, nagbalik ito ng non-`200` na status, o nagbalik ito ng hindi nakikilalang
body, nagla-log ng babala ang `listMarketplacePlugins()` at bumabalik sa seed list.

> Paalala: ang **catalog** ng marketplace (pag-browse/paghahanap) ay ganap nang nakakonekta, ngunit
> hindi pa naipapatupad ang isang-click na **pag-install** mula sa catalog — ang
> button na "I-install" ng dashboard sa isang marketplace entry ay kasalukuyang nagpapakita ng
> abisong "malapit na". Sa ngayon, isinasagawa ang pag-install sa pamamagitan ng local-path install
> flow (`POST /api/plugins`) at on-disk discovery (`POST /api/plugins/scan`).

## REST API

Ang lahat ng endpoint ay nangangailangan ng management auth (`requireManagementAuth`) **at**
loopback-only — nakalista ang `/api/plugins` at `/api/plugins/` sa
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Paraan | Paglalarawan                                                                         |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `/api/plugins`                   | GET    | Ilista ang mga naka-install na plugin (opsyonal na `?status=` filter)                |
| `/api/plugins`                   | POST   | Mag-install ng plugin mula sa absolute na lokal na path                              |
| `/api/plugins/scan`              | POST   | I-scan ang direktoryo ng plugin at irehistro ang mga bagong plugin                   |
| `/api/plugins/marketplace`       | GET    | Ilista ang mga entry sa catalog ng marketplace                                       |
| `/api/plugins/[name]`            | GET    | Kunin ang mga detalye ng naka-install na plugin                                      |
| `/api/plugins/[name]`            | DELETE | Mag-uninstall ng plugin                                                              |
| `/api/plugins/[name]/activate`   | POST   | I-activate (i-load + irehistro ang mga hook)                                         |
| `/api/plugins/[name]/deactivate` | POST   | I-deactivate (patakbuhin ang `onDeactivate`, alisin sa pagkakarehistro ang mga hook) |
| `/api/plugins/[name]/config`     | GET    | Kunin ang config ng plugin + config schema                                           |
| `/api/plugins/[name]/config`     | PUT    | I-update ang config ng plugin (bine-validate laban sa schema)                        |

Tumatanggap ang `status` filter ng `GET /api/plugins` ng isa sa
`installed` / `active` / `inactive` / `error`. Nagbabalik ng `400` ang di-wastong value.

### Ilista ang mga naka-install na plugin

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Mag-install mula sa lokal na path

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Dapat ay **absolute** ang `path` at hindi ito maaaring maglaman ng mga `..` traversal segment o
null byte (ipinatutupad ng Zod). Dapat maglaman ang source directory ng wastong
`plugin.json` (o maging parent ng isa). Kapag matagumpay, ang response ay `201` kasama ang
row ng naka-install na plugin.

### Mag-browse sa marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### I-update ang config ng plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

Bine-validate ng `PUT .../config` ang bawat ibinigay na value laban sa
`configSchema` ng plugin (idineklara sa manifest): sinusunod ng mga `number` field ang `min`/`max`,
at dapat tumugma ang mga `select` field sa idineklarang `enum`. Pinapayagan ang mga key na wala
sa schema.

## Configuration

### Direktoryo ng plugin

Nakalagay ang mga plugin sa ilalim ng data directory ng OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (o anumang tinutukoy ng manifest.main)
```

Nire-resolve ng `getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) ang direktoryong iyon sa
tatlong hakbang:

1. **`OMNIROUTE_PLUGINS_DIR`**, kapag nakatakda — ginagamit nang eksakto, anuman ang sinasabi ng `HOME`. Ito ang
   tahasang setting para sa Docker/K8s, kung saan bind-mounted ang plugin tree sa isang path
   na karaniwang walang kaugnayan sa home directory ng container (#11827).
2. `<home>/.omniroute/plugins`, kung saan nagmumula ang `<home>` sa mga environment variable na `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kapag walang home na ine-export ang process.

Isang beses na nila-log sa startup ang na-resolve na direktoryo bilang `scanner.dir_resolved`, at tinutukoy ang
input na napili (`OMNIROUTE_PLUGINS_DIR`, `home`, o `no-home-fallback`) — kaya malinaw na sinasabi ng isang image
na tahimik na napunta sa hakbang 3, sa halip na mag-ulat lamang ng walang-lamang listahan ng plugin.
Tinutuklasan ng `POST /api/plugins/scan` ang anumang subdirectory roon na naglalaman ng wastong
`plugin.json` at inirehistro ito; ang direktoryo ring iyon ang root kung saan kinokopya ng
`pluginManager.install()` ang mga plugin, kaya sabay na inililipat ng override ang discovery at
installation.

> **Ang `OMNIROUTE_PLUGINS_DIR` ay hindi `OMNIROUTE_PLUGIN_PATH`.** Binabasa lamang ang huli ng
> CLI command-plugin loader (`bin/cli/plugins.mjs`) upang hanapin ang mga `omniroute-cmd-*` npm
> package na nagdaragdag ng mga `omniroute` subcommand — wala itong epekto sa runtime scanner
> na inilalarawan dito. Tingnan ang [PLUGINS.md](./PLUGINS.md) para sa bahaging iyon.

### Custom na URL ng marketplace registry

Binabasa ang source ng marketplace catalog mula sa setting na `pluginMarketplaceUrl`
(binabasa ng `src/lib/plugins/marketplace.ts` ang `settings.pluginMarketplaceUrl`). Kapag
nakatakda sa isang `http(s)` URL, kinukuha ng `listMarketplacePlugins()` ang URL na iyon at tumatanggap
ito ng alinman sa top-level na JSON array ng mga entry o isang object na may `plugins` array;
sinasala ang mga entry na walang string na `name`. Kapag hindi nakatakda (o kapag hindi pumasa ang fetch
sa SSRF guard / nagbalik ng maling response), ginagamit ang built-in na seed registry.

Nagbibigay ang tab na "Marketplace" ng dashboard ng field para sa URL na ito (muling binabasa mula sa
`GET /api/settings`).

> Tala sa implementation: ipinapadala ng action na "Save" ng dashboard ang
> `pluginMarketplaceUrl` sa `PATCH /api/settings`. Sa oras ng pagsulat nito,
> hindi nakadeklara ang key na ito sa `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), kaya tiyakin ang persistence sa inyong
> release bago umasa rito — sinusunod ng **read** path (`getSettings()` →
> `listMarketplacePlugins()`) ang key kapag naroon na ito sa settings
> store.

## Seguridad

### Antas ng ruta — loopback lamang

Nagpapatakbo ang mga plugin ng code sa mga inilulunsad na child process, kaya ang buong surface ng `/api/plugins`
ay inuuri bilang `LOCAL_ONLY` (Tier 1). Walang kondisyong ipinapatupad ang loopback
**bago** ang anumang pagsusuri sa auth, kaya kahit makarating sa
machine sa pamamagitan ng tunnel ang isang na-leak na management token, hindi pa rin ito makakapag-install,
makakapag-activate, o makakapag-uninstall ng plugin.
Tingnan ang [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) at
Mahihigpit na Panuntunan #15 / #17.

### SSRF guard ng marketplace registry

Ang isang custom na registry URL ay configuration na maaaring maimpluwensiyahan ng attacker, kaya bago
ito i-fetch, pinapatakbo ito ng `listMarketplacePlugins()` sa dalawang layer:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Tinatanggihan ang anumang hindi `http:` / `https:`.
   - Tinatanggihan ang mga literal na private/loopback/link-local/ULA host (IPv4 **at** IPv6,
     kabilang ang IPv4-mapped) sa pamamagitan ng canonical na `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Nire-resolve ang **parehong** `A` at `AAAA` record at tinatanggihan kung **alinman** sa mga na-resolve na
     address ay private — isinasara nito ang public-hostname → private-IP bypass.
   - **Fails closed**: tinatanggihan ang URL kapag nabigo ang DNS resolution.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): muling inilalapat ang public-only na URL
   guard sa oras ng pag-fetch at **hinaharang ang mga redirect** (walang public → private na `30x`
   pivot).

Ang URL na bumagsak sa alinmang layer ay hindi nagpapatigil sa request — tahimik na
bumabalik ang marketplace sa built-in na seed registry at nagla-log ng babala.

> Pinatibay ang guard na ito sa PR #3774 partikular upang i-resolve ang A + AAAA at gamitin
> ang canonical na `isPrivateHost` sa halip na pagsusuring IPv4-only.

### Isolation ng pagpapatakbo ng plugin

- **Process isolation** — naglulunsad ang `loadPlugin()` (`src/lib/plugins/loader.ts`) ng
  bawat plugin sa hiwalay na Node.js child process at nakikipag-ugnayan sa pamamagitan ng IPC.
  May timeout ang mga hook call na may `SIGTERM` → `SIGKILL` escalation.
- **Env allowlist** — tumatanggap lamang ang child ng naka-allowlist na hanay ng mga environment
  variable; ibinibigay lamang ang mas malawak na hanay kapag hinihiling ng manifest ang
  `env` permission.
- **Path containment** — tinitiyak ng install/upgrade/uninstall na ang plugin
  directory at `manifest.main` ay nare-resolve **sa loob** ng pinamamahalaang plugin root
  bago ang anumang pagkopya o recursive delete (bilang proteksiyon laban sa mga binagong DB path at
  `../` traversal sa `manifest.main`). Nire-resolve ng activation ang mga symlink sa pamamagitan ng
  `realpath` at tumatangging mag-load ng entry point na lumalabas sa plugin
  directory.
- **Opsyonal na integrity pin** — maaaring magdeklara ang manifest ng `integrity`
  (`sha256-<base64>`, SRI format) field. Kapag naroon, bine-verify ng loader ang
  hash ng entry file sa oras ng pag-load at tumatangging mag-activate kapag hindi ito tugma. Isa itong
  opt-in na pagtukoy sa pagbabago, **hindi** isang security boundary — ang loopback-only na routing
  at permission model ang mga tunay na boundary.

## Manifest (`plugin.json`)

Bine-validate ng `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Field              | Uri       | Mga Tala                                                               |
| ------------------ | --------- | ---------------------------------------------------------------------- |
| `name`             | string    | Kinakailangan; kebab-case (`^[a-z0-9-]+$`), 1–100 character            |
| `version`          | string    | Kinakailangan; semver (`MAJOR.MINOR.PATCH`)                            |
| `description`      | string?   | ≤ 500 character                                                        |
| `author`           | string?   | ≤ 200 character                                                        |
| `license`          | string?   | Default ay `MIT`                                                       |
| `main`             | string?   | Entry file; default ay `index.js`                                      |
| `source`           | enum?     | `local` \| `marketplace` (default ay `local`)                          |
| `tags`             | string[]? | Mga tag sa paghahanap                                                  |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | object?   | Mga boolean na nagdedeklara kung aling hook ang ipinapatupad ng plugin |
| `skills`           | object[]? | Mga opsyonal na depinisyon ng skill                                    |
| `enabledByDefault` | boolean?  | Awtomatikong i-activate kapag na-install                               |
| `configSchema`     | object?   | Map ng mga config field (`string`/`number`/`boolean`/`select`)         |
| `integrity`        | string?   | Opsyonal na `sha256-<base64>` entry-file pin                           |

Ang mga permission ay nagmumula sa enum na
`network` / `file-read` / `file-write` / `env` / `exec`.

## Daloy ng Lifecycle

```
install (POST /api/plugins, path)
  → i-scan/i-validate ang manifest → kopyahin sa staging → tiyaking nasa loob ng dir ang main
  → atomic rename papunta sa ~/.omniroute/plugins/<name> → maglagay ng row sa DB
  → patakbuhin ang onInstall → kung enabledByDefault: i-activate

activate (POST /api/plugins/{name}/activate)
  → pagsusuri sa containment ng realpath → loadPlugin() (mag-spawn ng child process)
  → irehistro ang mga idineklarang hook → status = "active" → patakbuhin ang onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → patakbuhin ang onDeactivate (BAGO mag-unregister) → i-unregister ang mga hook
  → i-kill ang child process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → i-deactivate kung active → patakbuhin ang onUninstall
  → containment-checked na recursive na pagbura ng plugin dir → burahin ang row sa DB
```

Ang muling pagpapatakbo ng `install` sa isang directory na ang bersyon ng manifest ay **tiyak na
mas bago** kaysa sa naka-install na bersyon ay awtomatikong nag-a-upgrade (malinis na muling pag-install; mare-reset ang config
sa mga default). Tatanggihan ang bersyong kapareho o mas luma.

## Database

Talahanayang `plugins` (migration na `076_create_plugins.sql`):

| Column          | Uri     | Mga Tala                                                         |
| --------------- | ------- | ---------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                             |
| `name`          | TEXT    | Natatangi                                                        |
| `version`       | TEXT    | semver; default na `1.0.0`                                       |
| `description`   | TEXT    | Opsyonal                                                         |
| `author`        | TEXT    | Opsyonal                                                         |
| `license`       | TEXT    | Default na `MIT`                                                 |
| `main`          | TEXT    | Entry file; default na `index.js`                                |
| `source`        | TEXT    | Default na `local`                                               |
| `tags`          | TEXT    | JSON array; default na `[]`                                      |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                 |
| `enabled`       | INT     | 0/1; default na 0                                                |
| `manifest`      | TEXT    | Buong manifest JSON                                              |
| `config`        | TEXT    | JSON; default na `{}`                                            |
| `config_schema` | TEXT    | JSON; default na `{}`                                            |
| `hooks`         | TEXT    | JSON array ng mga idineklarang pangalan ng hook; default na `[]` |
| `permissions`   | TEXT    | JSON array; default na `[]`                                      |
| `plugin_dir`    | TEXT    | Absolute na directory ng pag-install                             |
| `error_message` | TEXT    | Itinatakda kapag `status = "error"`                              |
| `installed_at`  | TEXT    | `datetime('now')`                                                |
| `updated_at`    | TEXT    | `datetime('now')`                                                |
| `activated_at`  | TEXT    | Itinatakda sa pag-activate                                       |

Sinusubaybayan ang mga metric/analytics ng plugin sa mga karagdagang talahanayan
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Ang dashboard page sa `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) ay nagbibigay ng dalawang tab:

- **Naka-install** — naglilista ng mga naka-install na plugin kasama ang kanilang mga idineklarang hook, isang
  activate/deactivate toggle, isang uninstall button, at isang pagkilos na "Mag-scan para sa mga plugin"
  (`POST /api/plugins/scan`).
- **Marketplace** — ipinapakita ang catalog mula sa `GET /api/plugins/marketplace` na may isang
  field para itakda ang custom na registry URL.

Makikita ang config page ng bawat plugin sa `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Tingnan Din

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  kung bakit loopback-only ang `/api/plugins` (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — ang kaugnay na framework ng mga skill
  (`src/lib/skills/`); maaaring magdeklara ang mga plugin ng mga skill sa kanilang manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — mga outbound integration na
  pinapatakbo ng mga event
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  ang pattern na `buildErrorBody()` na ginagamit ng bawat ruta ng plugin para sa mga error response
