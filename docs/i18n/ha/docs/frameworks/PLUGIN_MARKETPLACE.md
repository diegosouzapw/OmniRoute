# Plugin Marketplace (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Tushen sahihancin bayanai:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, da
> `src/app/(dashboard)/dashboard/plugins/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute na zuwa da tsarin plugin mai irin na WordPress. Plugins kundin adireshi ne
masu zaman kansu — kowanne yana da manifest na `plugin.json` da fayil ɗin shigarwa — waɗanda ke haɗuwa
da jerin sarrafa buƙata (`onRequest` / `onResponse` / `onError`) da kuma
abubuwan zagayowar rayuwa (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Kasuwar Plugin** ita ce shimfiɗar ganowa da ke saman wannan tsarin. Tana
bayar da kundin plugins da za a iya lilo da girkawa. A tsari na asali, kundin ƙaramin
rijistar farko ce da aka gina a ciki; mai gudanarwa zai iya nuna masa URL na rijista
mai nisa na musamman, wanda a wannan yanayin ake ƙarfafa aikin ɗauko bayanan da kariyar SSRF
mai warware DNS (duba [Tsaro](#security)).

Kowace hanyar plugin **loopback-only** ce (Tier 1 — `LOCAL_ONLY`): plugins suna lodawa
kuma suna aiwatar da lamba a cikin child processes, don haka ba za a iya isa ga hanyoyin
daga tushen da ba na loopback ba, ba tare da la’akari da auth ba. Duba
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Yadda Sassan Ke Haɗuwa

```
Dashboard (/dashboard/plugins)
  ├─ Shafin "Installed"  → GET /api/plugins            (listPlugins)
  │                        POST /api/plugins/scan      (pluginManager.scan)
  │                        POST /api/plugins/{name}/activate|deactivate
  │                        DELETE /api/plugins/{name}   (cirewa)
  └─ Shafin "Marketplace" → GET /api/plugins/marketplace
                             → listMarketplacePlugins()
                               ├─ babu URL na musamman → SEED_REGISTRY da aka gina a ciki
                               └─ URL na musamman → kariyar SSRF ta isSafeMarketplaceUrl()
                                                  → safeOutboundFetch(guard:"public-only")
```

- **Shimfiɗar rijista** — `src/lib/plugins/marketplace.ts`: tana jera / bincika
  kundin, tana komawa ga rijistar farko idan wata matsala ta faru.
- **Shimfiɗar zagayowar rayuwa** — `src/lib/plugins/manager.ts` (singleton na `pluginManager`):
  girkawa, haɓakawa, kunnawa, kashewa, cirewa, dubawa, lodawar farawa.
- **Shimfiɗar manifest** — `src/lib/plugins/manifest.ts`: tsarin Zod + tsoffin ƙimomi na
  `plugin.json`.
- **Na’urar dubawa** — `src/lib/plugins/scanner.ts`: tana gano plugins a kan faifai ƙarƙashin
  kundin adireshin plugin.
- **Mai lodawa** — `src/lib/plugins/loader.ts`: yana fara kowanne plugin a cikin
  child process da aka ware, sannan yana shiga tsakani wajen kiran hooks ta IPC.

## Kundin Kasuwa

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) yana mayar da jerin
abubuwan `MarketplaceEntry`:

| Fili          | Nau’i    | Bayani                                      |
| ------------- | -------- | ------------------------------------------- |
| `name`        | string   | Sunan plugin na kebab-case                  |
| `version`     | string   | semver                                      |
| `description` | string   | Taƙaitaccen bayani                          |
| `author`      | string   | Marubuci / ƙungiya                          |
| `license`     | string   | ID na lasisi mai tsarin SPDX                |
| `downloadUrl` | string   | URL na sauke tushe (yana iya zama fanko)    |
| `repository`  | string?  | URL na repository na zaɓi                   |
| `tags`        | string[] | Alamomin bincike/tacewa                     |
| `downloads`   | number   | Adadin saukewa                              |
| `rating`      | number   | 0–5                                         |
| `verified`    | boolean  | Ko an yi wa shigarwar alamar tabbatarwa     |
| `lastUpdated` | string   | Kirtanin kwanan wata mai kama da tsarin ISO |

Idan ba a saita URL na rijista na musamman ba, kundin zai zama
`SEED_REGISTRY` da aka gina a ciki (a halin yanzu `request-logger`, `rate-limiter`, `cost-tracker`, da
`theme-manager`). Rijistar farko tana samuwa koyaushe — idan ba a iya isa ga rijista
mai nisa da aka saita ba, ta mayar da matsayin da ba `200` ba, ko ta mayar da
bayanan da ba a gane su ba, `listMarketplacePlugins()` zai rubuta gargaɗi sannan ya koma
ga jerin farko.

> Lura: an haɗa **kundin** kasuwa (lilowa/bincike) daga farko har ƙarshe, amma
> **girkawa** da dannawa sau ɗaya daga kundin kasuwa ba a aiwatar da shi ba tukuna — maɓallin
> "Install" na dashboard a kan shigarwar kasuwa a halin yanzu yana nuna sanarwar
> "coming soon". A yau, ana yin girkawa ta hanyar tsarin girkawa daga hanyar gida
> (`POST /api/plugins`) da ganowa a kan faifai (`POST /api/plugins/scan`).

## REST API

Duk endpoints suna buƙatar tantancewar gudanarwa (`requireManagementAuth`) **kuma**
ana iya isa gare su ne kawai ta loopback — `/api/plugins` da `/api/plugins/` suna cikin
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Hanya  | Bayani                                                       |
| -------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/plugins`                   | GET    | Jera plugins da aka girka (tacewar `?status=` na zaɓi)       |
| `/api/plugins`                   | POST   | Girka plugin daga cikakkiyar hanyar fayil ta gida            |
| `/api/plugins/scan`              | POST   | Bincika kundin plugins sannan a yi rajistar sababbin plugins |
| `/api/plugins/marketplace`       | GET    | Jera bayanan katalog na kasuwa                               |
| `/api/plugins/[name]`            | GET    | Samu cikakkun bayanan plugin da aka girka                    |
| `/api/plugins/[name]`            | DELETE | Cire plugin                                                  |
| `/api/plugins/[name]/activate`   | POST   | Kunna (loda + yi rajistar hooks)                             |
| `/api/plugins/[name]/deactivate` | POST   | Kashe (ƙaddamar da `onDeactivate`, cire rajistar hooks)      |
| `/api/plugins/[name]/config`     | GET    | Samu saitin plugin + tsarin saitin                           |
| `/api/plugins/[name]/config`     | PUT    | Sabunta saitin plugin (an tabbatar da shi bisa tsarin)       |

Tacewar `status` ta `GET /api/plugins` tana karɓar ɗaya daga cikin
`installed` / `active` / `inactive` / `error`. Ƙima marar inganci tana mayar da `400`.

### Jera plugins da aka girka

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Girka daga hanyar fayil ta gida

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Dole ne `path` ta kasance **cikakkiya**, kuma ba za ta iya ƙunsar sassan kewayawar `..`
ko null bytes ba (Zod ne ke tilasta wannan). Dole ne kundin tushe ya ƙunshi ingantaccen
`plugin.json` (ko kuma ya zama kundin iyayensa). Idan an yi nasara, amsar ita ce `201`
tare da layin plugin da aka girka.

### Bincika kasuwa

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Sabunta saitin plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` yana tabbatar da kowace ƙima da aka bayar bisa `configSchema`
na plugin (wanda aka ayyana a manifest): filayen `number` suna bin `min`/`max`,
kuma dole ne filayen `select` su dace da `enum` da aka ayyana. Ana barin keys
waɗanda ba su cikin tsarin su wuce.

## Saitawa

### Kundin plugin

Plugins suna ƙarƙashin kundin bayanan OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ko duk abin da manifest.main ke nunawa)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) yana tantance wannan kundin a
matakai uku:

1. **`OMNIROUTE_PLUGINS_DIR`**, idan an saita shi — ana amfani da shi kai tsaye, ko mene ne
   `HOME` ya nuna. Wannan shi ne madaidaicin saitin Docker/K8s, inda ake bind-mount na
   tsarin plugins a wata hanya wadda yawanci ba ta da alaƙa da kundin gida na container
   (#11827).
2. `<home>/.omniroute/plugins`, inda `<home>` yake fitowa daga environment variables
   na `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, idan process ɗin bai fitar da wani kundin gida ba kwata-kwata.

Ana rubuta kundin da aka tantance sau ɗaya a log yayin farawa a matsayin
`scanner.dir_resolved`, tare da ambaton input ɗin da aka zaɓa (`OMNIROUTE_PLUGINS_DIR`,
`home`, ko `no-home-fallback`) — don haka image da ya koma mataki na 3 ba tare da sanarwa
ba zai bayyana hakan, maimakon kawai bayar da rahoton jerin plugins marar komai.
`POST /api/plugins/scan` yana gano duk wani ƙaramin kundi a wurin da ke ɗauke da
ingantaccen `plugin.json` sannan ya yi masa rajista; wannan kundin shi ne kuma root ɗin
da `pluginManager.install()` ke kwafar plugins zuwa cikinsa, saboda haka override yana
matsar da ganowa da girkawa tare.

> **`OMNIROUTE_PLUGINS_DIR` ba `OMNIROUTE_PLUGIN_PATH` ba ne.** Na biyun CLI
> command-plugin loader (`bin/cli/plugins.mjs`) ne kawai ke karantawa domin nemo
> packages na npm na `omniroute-cmd-*` waɗanda ke ƙara subcommands na `omniroute` —
> ba shi da wani tasiri ga runtime scanner da aka bayyana a nan. Duba
> [PLUGINS.md](./PLUGINS.md) don wannan ɓangaren.

### URL na musamman na registry na kasuwa

Ana karanta tushen katalog na kasuwa daga saitin `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` yana karanta `settings.pluginMarketplaceUrl`). Idan
an saita shi zuwa URL na `http(s)`, `listMarketplacePlugins()` yana ɗebo wannan URL
kuma yana karɓar ko dai JSON array na entries a matakin sama, ko object mai array na
`plugins`; ana tace entries da ba su da `name` na nau'in string. Idan ba a saita shi ba
(ko idan ɗebo bayanan ya kasa gwajin kariyar SSRF / ya dawo da amsa marar kyau), ana
amfani da built-in seed registry.

Shafin "Marketplace" na dashboard yana samar da field don wannan URL (ana sake karanta
shi daga `GET /api/settings`).

> Bayanin aiwatarwa: aikin "Save" na dashboard yana aika
> `pluginMarketplaceUrl` zuwa `PATCH /api/settings`. A lokacin rubuta wannan,
> ba a ayyana wannan key a cikin `updateSettingsSchema` ba
> (`src/shared/validation/settingsSchemas.ts`), saboda haka tabbatar da dorewar saitin
> a release ɗinku kafin dogaro da shi — hanyar **karantawa** (`getSettings()` →
> `listMarketplacePlugins()`) tana amfani da key ɗin da zarar yana cikin ma'ajiyar
> saituna.

## Tsaro

### Matakin hanya — loopback kawai

Plugins suna aiwatar da lamba a cikin child processes da aka ƙaddamar, don haka an ware dukkan farfajiyar `/api/plugins`
a matsayin `LOCAL_ONLY` (Mataki na 1). Ana aiwatar da tilasta loopback
ba tare da wani sharadi ba **kafin** duk wani binciken auth, don haka ko da management token da ya zube ya isa
na'urar ta hanyar tunnel, har yanzu ba zai iya shigarwa, kunnawa, ko cire plugin ba.
Duba [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) da
Dokoki Masu Tsauri #15 / #17.

### Kariyar SSRF ta rajistar marketplace

URL na rajista na musamman saitin da maharin zai iya yin tasiri a kansa ne, don haka kafin
ɗauko shi `listMarketplacePlugins()` yana bi da shi ta matakai biyu:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Yana ƙin duk abin da ba `http:` / `https:` ba.
   - Yana ƙin hosts na zahiri waɗanda suke private/loopback/link-local/ULA (IPv4 **da** IPv6,
     gami da IPv4-mapped) ta hanyar canonical `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Yana warware bayanan **duka** `A` da `AAAA`, sannan ya ƙi idan **kowane** adireshin
     da aka warware private ne — yana toshe hanyar kaucewa ta public-hostname → private-IP.
   - **Yana ƙin amincewa idan an gaza**: gazawar warware DNS tana sa a ƙi URL ɗin.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): yana sake amfani da kariyar URL ta public-only
   a lokacin fetch kuma yana **toshe redirects** (babu karkatar public → private ta `30x`).

URL da ya gaza a ɗaya daga cikin matakan ba ya dakatar da request ɗin — marketplace
yana komawa ga ginanniyar seed registry cikin shiru, sannan ya rubuta gargadi a log.

> An ƙarfafa wannan kariya a PR #3774 musamman don warware A + AAAA da kuma amfani da
> canonical `isPrivateHost` maimakon binciken IPv4 kawai.

### Keɓance aiwatar da plugin

- **Keɓance process** — `loadPlugin()` (`src/lib/plugins/loader.ts`) yana ƙaddamar da
  kowane plugin a cikin wani Node.js child process na daban kuma yana sadarwa ta IPC.
  Kiran hook suna da timeout tare da haɓakar mataki daga `SIGTERM` → `SIGKILL`.
- **Jerin env da aka yarda** — child ɗin yana karɓar saitin environment
  variables da aka amince da su kawai; ana ba da saitin da ya fi faɗi ne kawai idan manifest ya nemi
  izinin `env`.
- **Tsare path a iyaka** — install/upgrade/uninstall suna tabbatar da cewa directory na plugin
  da `manifest.main` suna warwarewa **a cikin** tushen plugin da ake sarrafawa
  kafin duk wani copy ko recursive delete (yana karewa daga paths na DB da aka sauya da kuma
  traversal na `../` a cikin `manifest.main`). Activation yana warware symlinks ta hanyar
  `realpath` kuma yana ƙin loda entry point da ya fita daga directory na plugin.
- **Pin na integrity na zaɓi** — manifest na iya ayyana filin `integrity`
  (`sha256-<base64>`, tsarin SRI). Idan yana nan, loader yana tabbatar da hash na
  entry file a lokacin lodawa kuma yana ƙin kunnawa idan ba su dace ba. Wannan gano kutsen sauyi ne na
  zaɓi, **ba** iyakar tsaro ba — routing na loopback-only
  da tsarin izini su ne ainihin iyakokin.

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) ne yake inganta shi:

| Fili               | Nau'i     | Bayani                                                         |
| ------------------ | --------- | -------------------------------------------------------------- |
| `name`             | string    | Wajibi; kebab-case (`^[a-z0-9-]+$`), haruffa 1–100             |
| `version`          | string    | Wajibi; semver (`MAJOR.MINOR.PATCH`)                           |
| `description`      | string?   | Haruffa ≤ 500                                                  |
| `author`           | string?   | Haruffa ≤ 200                                                  |
| `license`          | string?   | Tsoho shi ne `MIT`                                             |
| `main`             | string?   | Entry file; tsoho shi ne `index.js`                            |
| `source`           | enum?     | `local` \| `marketplace` (tsoho shi ne `local`)                |
| `tags`             | string[]? | Tags na bincike                                                |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                |
| `hooks`            | object?   | Booleans masu bayyana hooks ɗin da plugin yake aiwatarwa       |
| `skills`           | object[]? | Ma'anar skills na zaɓi                                         |
| `enabledByDefault` | boolean?  | Kunna kai tsaye yayin shigarwa                                 |
| `configSchema`     | object?   | Taswirar filayen config (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Pin na entry-file na `sha256-<base64>` na zaɓi                 |

Ana ɗauko izini daga enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Gudanarwar Zagayowar Rayuwa

```
install (POST /api/plugins, path)
  → bincika/tabbatar da manifest → kwafa zuwa staging → tabbatar main yana cikin kundin adireshi
  → sauya suna ta atomatik zuwa ~/.omniroute/plugins/<name> → saka layi a DB
  → kunna onInstall → idan enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → binciken realpath don tabbatar da yana ciki → loadPlugin() (ƙaddamar da child process)
  → yi rajistar hooks da aka ayyana → status = "active" → kunna onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → kunna onDeactivate (KAFIN cire rajista) → cire rajistar hooks
  → kashe child process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate idan yana active → kunna onUninstall
  → gogewa mai maimaitawa ta kundin plugin bayan binciken kasancewa ciki → goge layin DB
```

Sake gudanar da `install` a kan kundin adireshi wanda sigar manifest ɗinsa ta fi
sigar da aka girka **sabuwa sosai** yana yin haɓakawa ta atomatik (sake girkawa
mai tsabta; config yana komawa ƙimomin tsoho). Ana ƙin sigar da ta yi daidai ko
ta fi tsufa.

## Ma'ajiyar Bayanai

Tebur `plugins` (migration `076_create_plugins.sql`):

| Ginshiƙi        | Nau'i   | Bayani                                               |
| --------------- | ------- | ---------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                 |
| `name`          | TEXT    | Na musamman                                          |
| `version`       | TEXT    | semver; tsoho `1.0.0`                                |
| `description`   | TEXT    | Na zaɓi                                              |
| `author`        | TEXT    | Na zaɓi                                              |
| `license`       | TEXT    | Tsoho `MIT`                                          |
| `main`          | TEXT    | Fayil ɗin farawa; tsoho `index.js`                   |
| `source`        | TEXT    | Tsoho `local`                                        |
| `tags`          | TEXT    | Jerin JSON; tsoho `[]`                               |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`     |
| `enabled`       | INT     | 0/1; tsoho 0                                         |
| `manifest`      | TEXT    | Cikakken manifest na JSON                            |
| `config`        | TEXT    | JSON; tsoho `{}`                                     |
| `config_schema` | TEXT    | JSON; tsoho `{}`                                     |
| `hooks`         | TEXT    | Jerin JSON na sunayen hook da aka ayyana; tsoho `[]` |
| `permissions`   | TEXT    | Jerin JSON; tsoho `[]`                               |
| `plugin_dir`    | TEXT    | Cikakken kundin adireshin girkawa                    |
| `error_message` | TEXT    | Ana saita shi idan `status = "error"`                |
| `installed_at`  | TEXT    | `datetime('now')`                                    |
| `updated_at`    | TEXT    | `datetime('now')`                                    |
| `activated_at`  | TEXT    | Ana saita shi lokacin kunnawa                        |

Ana bibiyar ma'aunai/binciken plugin a cikin ƙarin tebura
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Shafin dashboard da ke `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) yana samar da shafuka biyu:

- **Waɗanda aka girka** — yana jera plugins da aka girka tare da hooks da suka
  ayyana, maɓallin activate/deactivate, maɓallin uninstall, da aikin "Bincika
  plugins" (`POST /api/plugins/scan`).
- **Kasuwa** — yana nuna kundin daga `GET /api/plugins/marketplace` tare da
  fili don saita URL na registry na musamman.

Shafin config na kowane plugin yana a `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Duba Kuma

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  dalilin da ya sa `/api/plugins` ke samuwa ga loopback kawai (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — tsarin skills mai alaƙa
  (`src/lib/skills/`); plugins na iya bayyana skills a cikin manifest ɗinsu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — haɗin kai na waje
  da ke gudana bisa events
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  tsarin `buildErrorBody()` da kowace route ta plugin ke amfani da shi don martanin kurakurai
