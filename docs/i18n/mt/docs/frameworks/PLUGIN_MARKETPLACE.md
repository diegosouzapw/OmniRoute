# Plugin Marketplace (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sors awtorevoli:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, u
> `src/app/(dashboard)/dashboard/plugins/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jiġi b'sistema ta' plugins fuq l-istil ta' WordPress. Il-plugins huma
direttorji awtonomi — kull wieħed b'manifest `plugin.json` u fajl tad-dħul — li
jintegraw mal-pipeline tat-talbiet (`onRequest` / `onResponse` / `onError`) u
mal-avvenimenti taċ-ċiklu tal-ħajja (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

Il-**Marketplace tal-Plugins** huwa s-saff tal-iskoperta mibni fuq dik is-sistema.
Dan jipprovdi katalogu li jista' jiġi esplorat ta' plugins li jistgħu jiġu
installati. B'mod awtomatiku, il-katalogu huwa reġistru żgħir inizjali integrat;
operatur jista' jikkonfigurah biex juża URL ta' reġistru remot personalizzat,
f'liema każ it-talba tiġi protetta minn kontroll kontra l-SSRF li jirriżolvi d-DNS
(ara [Sigurtà](#security)).

Kull rotta tal-plugins hija **għal loopback biss** (Livell 1 — `LOCAL_ONLY`):
il-plugins jgħabbu u jeżegwixxu kodiċi fi proċessi sekondarji, għalhekk ir-rotot
ma jistgħux jintlaħqu minn oriġini li mhijiex loopback, irrispettivament
mill-awtentikazzjoni. Ara
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kif Jiffunzjona Kollox Flimkien

```
Dashboard (/dashboard/plugins)
  ├─ Tab "Installati"  → GET /api/plugins            (listPlugins)
  │                      POST /api/plugins/scan      (pluginManager.scan)
  │                      POST /api/plugins/{name}/activate|deactivate
  │                      DELETE /api/plugins/{name}   (diżinstallazzjoni)
  └─ Tab "Marketplace" → GET /api/plugins/marketplace
                           → listMarketplacePlugins()
                             ├─ ebda URL personalizzat → SEED_REGISTRY integrat
                             └─ URL personalizzat → kontroll SSRF isSafeMarketplaceUrl()
                                                   → safeOutboundFetch(guard:"public-only")
```

- **Saff tar-reġistru** — `src/lib/plugins/marketplace.ts`: jelenka / ifittex
  fil-katalogu, u jerġa' juża r-reġistru inizjali jekk isseħħ xi ħsara.
- **Saff taċ-ċiklu tal-ħajja** — `src/lib/plugins/manager.ts` (singleton `pluginManager`):
  installazzjoni, aġġornament, attivazzjoni, diżattivazzjoni, diżinstallazzjoni,
  skennjar, tagħbija waqt l-istartjar.
- **Saff tal-manifest** — `src/lib/plugins/manifest.ts`: skema Zod + valuri
  predefiniti għal `plugin.json`.
- **Skenner** — `src/lib/plugins/scanner.ts`: jiskopri plugins fuq id-diska
  taħt id-direttorju tal-plugins.
- **Loader** — `src/lib/plugins/loader.ts`: iniedi kull plugin fi proċess
  sekondarju iżolat u jimmedja s-sejħiet tal-hooks permezz tal-IPC.

## Katalogu tal-Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) jirritorna lista
ta' oġġetti `MarketplaceEntry`:

| Qasam         | Tip      | Noti                                              |
| ------------- | -------- | ------------------------------------------------- |
| `name`        | string   | Isem tal-plugin f'kebab-case                      |
| `version`     | string   | semver                                            |
| `description` | string   | Sommarju qasir                                    |
| `author`      | string   | Awtur / organizzazzjoni                           |
| `license`     | string   | ID tal-liċenzja fl-istil SPDX                     |
| `downloadUrl` | string   | URL tat-tniżżil tas-sors (jista' jkun vojt)       |
| `repository`  | string?  | URL fakultattiv tar-repożitorju                   |
| `tags`        | string[] | Tikketti għat-tiftix/filtrazzjoni                 |
| `downloads`   | number   | Għadd ta' tniżżiliet                              |
| `rating`      | number   | 0–5                                               |
| `verified`    | boolean  | Jekk l-entrata hijiex immarkata bħala vverifikata |
| `lastUpdated` | string   | Stringa tad-data bejn wieħed u ieħor ISO          |

Meta ma jkun ikkonfigurat ebda URL ta' reġistru personalizzat, il-katalogu jkun
is-`SEED_REGISTRY` integrat (bħalissa `request-logger`, `rate-limiter`,
`cost-tracker`, u `theme-manager`). Ir-reġistru inizjali jkun dejjem disponibbli
— jekk reġistru remot ikkonfigurat ma jkunx jista' jintlaħaq, jirritorna status
li mhuwiex `200`, jew jirritorna kontenut mhux rikonoxxut,
`listMarketplacePlugins()` jirreġistra twissija u jerġa' juża l-lista inizjali.

> Nota: il-**katalogu** tal-marketplace (esplorazzjoni/tiftix) huwa integrat minn
> tarf sa tarf, iżda l-**installazzjoni** b'klikk waħda mill-katalogu tal-marketplace
> għadha mhijiex implimentata — il-buttuna "Installa" tad-dashboard fuq entrata
> tal-marketplace bħalissa turi avviż li l-funzjonalità "ġejja dalwaqt".
> Bħalissa, l-installazzjoni ssir permezz tal-fluss ta' installazzjoni minn passaġġ
> lokali (`POST /api/plugins`) u l-iskoperta fuq id-diska
> (`POST /api/plugins/scan`).

## REST API

L-endpoints kollha jeħtieġu awtentikazzjoni tal-ġestjoni (`requireManagementAuth`) **u**
huma aċċessibbli biss mil-loopback — `/api/plugins` u `/api/plugins/` huma elenkati
f’`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Metodu | Deskrizzjoni                                                           |
| -------------------------------- | ------ | ---------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Elenka l-plugins installati (filtru fakultattiv `?status=`)            |
| `/api/plugins`                   | POST   | Installa plugin minn path lokali assolut                               |
| `/api/plugins/scan`              | POST   | Skennja d-direttorju tal-plugins u rreġistra plugins ġodda             |
| `/api/plugins/marketplace`       | GET    | Elenka l-entrati tal-katalgu tal-marketplace                           |
| `/api/plugins/[name]`            | GET    | Ikseb id-dettalji tal-plugin installat                                 |
| `/api/plugins/[name]`            | DELETE | Iddiżinstalla plugin                                                   |
| `/api/plugins/[name]/activate`   | POST   | Attiva (tella’ + irreġistra l-hooks)                                   |
| `/api/plugins/[name]/deactivate` | POST   | Iddiżattiva (iskatta `onDeactivate`, neħħi r-reġistrazzjoni tal-hooks) |
| `/api/plugins/[name]/config`     | GET    | Ikseb il-konfigurazzjoni tal-plugin + l-iskema tal-konfigurazzjoni     |
| `/api/plugins/[name]/config`     | PUT    | Aġġorna l-konfigurazzjoni tal-plugin (ivvalidata mal-iskema)           |

Il-filtru `status` ta’ `GET /api/plugins` jaċċetta wieħed minn
`installed` / `active` / `inactive` / `error`. Valur invalidu jirritorna `400`.

### Elenka l-plugins installati

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installa minn path lokali

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Il-`path` irid ikun **assolut** u ma jistax ikun fih segmenti ta’ traversal `..` jew
bytes null (infurzat minn Zod). Id-direttorju tas-sors irid ikun fih
`plugin.json` validu (jew ikun parent ta’ wieħed). Meta jirnexxi, ir-rispons ikun `201`
bir-ringiela tal-plugin installat.

### Ibbrawżja l-marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aġġorna l-konfigurazzjoni tal-plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` jivvalida kull valur ipprovdut mal-`configSchema` tal-plugin
(iddikjarata fil-manifest): il-fields `number` jirrispettaw `min`/`max`,
u l-fields `select` iridu jaqblu mal-`enum` iddikjarat. Keys li mhumiex preżenti
fl-iskema huma permessi.

## Konfigurazzjoni

### Direttorju tal-plugins

Il-plugins jinsabu taħt id-direttorju tad-data ta’ OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (jew kwalunkwe fajl li manifest.main jipponta lejh)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) jirriżolvi dak id-direttorju fi
tliet passi:

1. **`OMNIROUTE_PLUGINS_DIR`**, meta jkun issettjat — jintuża eżatt kif inhu, ikun xi jkun jgħid `HOME`. Dan huwa
   l-kontroll espliċitu għal Docker/K8s, fejn is-siġra tal-plugins tkun immuntata b’bind f’path
   li normalment ma jkollu xejn x’jaqsam mad-direttorju home tal-container (#11827).
2. `<home>/.omniroute/plugins`, fejn `<home>` jiġi mill-variables tal-ambjent `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, meta l-proċess ma jesporta l-ebda home.

Id-direttorju riżolt jiġi rreġistrat darba fl-istartjar bħala `scanner.dir_resolved`, filwaqt li jsemmi
l-input li ntgħażel (`OMNIROUTE_PLUGINS_DIR`, `home`, jew `no-home-fallback`) — sabiex image
li taqa’ fis-skiet fuq il-pass 3 tiddikjara dan, minflok tirrapporta biss lista vojta ta’ plugins.
`POST /api/plugins/scan` jiskopri kwalunkwe sottodirettorju hemmhekk li jkun fih
`plugin.json` validu u jirreġistrah; l-istess direttorju huwa l-għerq li fih
`pluginManager.install()` jikkopja l-plugins, għalhekk override jmexxi flimkien l-iskoperta u
l-installazzjoni.

> **`OMNIROUTE_PLUGINS_DIR` mhuwiex `OMNIROUTE_PLUGIN_PATH`.** Dan tal-aħħar jinqara biss
> mil-loader tal-command plugins tas-CLI (`bin/cli/plugins.mjs`) biex isib packages npm
> `omniroute-cmd-*` li jżidu subcommands ta’ `omniroute` — ma għandu l-ebda effett fuq l-iskanner tar-runtime
> deskritt hawnhekk. Ara [PLUGINS.md](./PLUGINS.md) għal dik in-naħa.

### URL personalizzat tar-reġistru tal-marketplace

Is-sors tal-katalgu tal-marketplace jinqara mis-setting `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` jaqra `settings.pluginMarketplaceUrl`). Meta
jkun issettjat għal URL `http(s)`, `listMarketplacePlugins()` jiġbed dak il-URL u jaċċetta
jew array JSON tal-ogħla livell ta’ entrati, jew object b’array `plugins`;
l-entrati mingħajr `name` tat-tip string jiġu ffiltrati. Meta ma jkunx issettjat (jew meta l-fetch
ifalli l-protezzjoni SSRF / jirritorna rispons ħażin), jintuża r-reġistru seed
inkorporat.

It-tab "Marketplace" tad-dashboard turi field għal dan il-URL (li jinqara lura minn
`GET /api/settings`).

> Nota dwar l-implimentazzjoni: l-azzjoni "Save" tad-dashboard tibgħat
> `pluginMarketplaceUrl` lil `PATCH /api/settings`. Fil-ħin tal-kitba, din
> il-key mhijiex iddikjarata f’`updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), għalhekk ivverifika l-persistenza fir-release tiegħek
> qabel ma tiddependi fuqha — il-path tal-**qari** (`getSettings()` →
> `listMarketplacePlugins()`) jirrispetta l-key ladarba tkun preżenti fl-istore
> tas-settings.

## Sigurtà

### Livell tar-rotta — loopback biss

Il-plugins jeżegwixxu kodiċi fi proċessi sekondarji mniedija separatament, għalhekk is-superfiċje kollha ta’ `/api/plugins`
hija kklassifikata bħala `LOCAL_ONLY` (Livell 1). L-infurzar tal-loopback jitħaddem
mingħajr kundizzjonijiet **qabel** kwalunkwe verifika tal-awtentikazzjoni, għalhekk token ta’ ġestjoni żvelat li jasal
fuq il-magna permezz ta’ mina xorta ma jistax jinstalla, jattiva, jew ineħħi plugin.
Ara [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) u
r-Regoli Stretti #15 / #17.

### Protezzjoni SSRF tar-reġistru tas-suq

URL personalizzat tar-reġistru huwa konfigurazzjoni li tista’ tiġi influwenzata minn attakkant, għalhekk qabel
ma jġibu, `listMarketplacePlugins()` jgħaddih minn żewġ saffi:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Jirrifjuta kull ħaġa li mhijiex `http:` / `https:`.
   - Jirrifjuta hosts litterali privati/loopback/link-local/ULA (IPv4 **u** IPv6,
     inklużi dawk immappjati għal IPv4) permezz tal-`isPrivateHost` kanoniku
     (`src/shared/network/outboundUrlGuard.ts`).
   - Jirriżolvi **kemm** ir-rekords `A` kif ukoll `AAAA` u jirrifjuta jekk **kwalunkwe** indirizz
     riżolt ikun privat — u b’hekk jagħlaq il-bypass minn hostname pubbliku → IP privat.
   - **Jfalli b’mod magħluq**: falliment fir-riżoluzzjoni DNS iwassal għar-rifjut tal-URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): jerġa’ japplika l-protezzjoni tal-URL għal URLs pubbliċi biss
   fil-ħin tal-fetch u **jimblokka r-ridirezzjonijiet** (ebda bidla minn indirizz pubbliku → privat permezz ta’ `30x`).

URL li jfalli f’wieħed miż-żewġ saffi ma jwaqqafx it-talba — is-suq
jaqa’ lura fis-skiet għar-reġistru inizjali inkorporat u jirreġistra twissija fil-log.

> Din il-protezzjoni ġiet imsaħħa fi PR #3774 speċifikament biex tirriżolvi A + AAAA u tuża
> l-`isPrivateHost` kanoniku minflok verifika għal IPv4 biss.

### Iżolament tal-eżekuzzjoni tal-plugin

- **Iżolament tal-proċess** — `loadPlugin()` (`src/lib/plugins/loader.ts`) iniedi
  kull plugin fi proċess sekondarju separat ta’ Node.js u jikkomunika permezz tal-IPC.
  Is-sejħiet tal-hooks għandhom timeout b’eskalazzjoni minn `SIGTERM` → `SIGKILL`.
- **Lista permessa tal-varjabbli tal-ambjent** — il-proċess sekondarju jirċievi biss sett permess ta’ varjabbli
  tal-ambjent; is-sett usa’ jingħata biss meta l-manifest jitlob il-permess
  `env`.
- **Konteniment tal-mogħdija** — l-installazzjoni/aġġornament/tneħħija jivverifikaw li d-direttorju tal-plugin
  u `manifest.main` jiġu riżolti **ġewwa** l-għerq ġestit tal-plugins
  qabel kwalunkwe kkopjar jew tħassir rikursiv (jipproteġi kontra mogħdijiet tad-DB imbagħbsa u
  traversal `../` f’`manifest.main`). L-attivazzjoni tirriżolvi s-symlinks permezz ta’
  `realpath` u tirrifjuta li ttella’ punt tad-dħul li joħroġ mid-direttorju
  tal-plugin.
- **Pin tal-integrità fakultattiv** — manifest jista’ jiddikjara qasam `integrity`
  (`sha256-<base64>`, format SRI). Meta jkun preżenti, il-loader jivverifika l-hash tal-fajl
  tad-dħul waqt it-tagħbija u jirrifjuta li jattiva jekk ma jkunx jaqbel. Din hija
  detezzjoni fakultattiva ta’ tbagħbis, **mhux** limitu tas-sigurtà — ir-routing għal
  loopback biss u l-mudell tal-permessi huma l-limiti reali.

## Manifest (`plugin.json`)

Ivvalidat minn `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Qasam              | Tip       | Noti                                                                       |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| `name`             | string    | Meħtieġ; kebab-case (`^[a-z0-9-]+$`), 1–100 karattru                       |
| `version`          | string    | Meħtieġ; semver (`MAJOR.MINOR.PATCH`)                                      |
| `description`      | string?   | ≤ 500 karattru                                                             |
| `author`           | string?   | ≤ 200 karattru                                                             |
| `license`          | string?   | Il-valur predefinit huwa `MIT`                                             |
| `main`             | string?   | Fajl tad-dħul; il-valur predefinit huwa `index.js`                         |
| `source`           | enum?     | `local` \| `marketplace` (il-valur predefinit huwa `local`)                |
| `tags`             | string[]? | Tags tat-tiftix                                                            |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                            |
| `hooks`            | object?   | Valuri Boolejani li jiddikjaraw liema hooks jimplimenta l-plugin           |
| `skills`           | object[]? | Definizzjonijiet fakultattivi tal-ħiliet                                   |
| `enabledByDefault` | boolean?  | Jiġi attivat awtomatikament mal-installazzjoni                             |
| `configSchema`     | object?   | Mappa tal-oqsma tal-konfigurazzjoni (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Pin fakultattiv `sha256-<base64>` tal-fajl tad-dħul                        |

Il-permessi jittieħdu mill-enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Fluss taċ-Ċiklu tal-Ħajja

```
install (POST /api/plugins, path)
  → skennja/vvalida l-manifest → ikkopja fiż-żona temporanja → ivverifika li main jinsab fid-direttorju
  → semmi mill-ġdid b’mod atomiku għal ~/.omniroute/plugins/<name> → daħħal ringiela fid-DB
  → attiva onInstall → jekk enabledByDefault: attiva

activate (POST /api/plugins/{name}/activate)
  → verifika tal-konteniment ta’ realpath → loadPlugin() (niedi proċess sekondarju)
  → irreġistra l-hooks iddikjarati → status = "active" → attiva onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → attiva onDeactivate (QABEL it-tneħħija tar-reġistrazzjoni) → neħħi r-reġistrazzjoni tal-hooks
  → waqqaf il-proċess sekondarju → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → iddiżattiva jekk attiv → attiva onUninstall
  → ħassar b’mod rikursiv id-direttorju tal-plugin wara verifika tal-konteniment → ħassar ir-ringiela mid-DB
```

Jekk terġa’ tħaddem `install` fuq direttorju li l-verżjoni tal-manifest tiegħu hija **strettament
aktar ġdida** mill-verżjoni installata, isir aġġornament awtomatiku (installazzjoni mill-ġdid nadifa; il-konfigurazzjoni terġa’
għall-valuri predefiniti). Verżjoni ugwali jew eqdem tiġi rrifjutata.

## Bażi tad-Data

Tabella `plugins` (migrazzjoni `076_create_plugins.sql`):

| Kolonna         | Tip     | Noti                                                                 |
| --------------- | ------- | -------------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                                 |
| `name`          | TEXT    | Uniku                                                                |
| `version`       | TEXT    | semver; valur predefinit `1.0.0`                                     |
| `description`   | TEXT    | Fakultattiv                                                          |
| `author`        | TEXT    | Fakultattiv                                                          |
| `license`       | TEXT    | Valur predefinit `MIT`                                               |
| `main`          | TEXT    | Fajl tad-dħul; valur predefinit `index.js`                           |
| `source`        | TEXT    | Valur predefinit `local`                                             |
| `tags`          | TEXT    | Array JSON; valur predefinit `[]`                                    |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                     |
| `enabled`       | INT     | 0/1; valur predefinit 0                                              |
| `manifest`      | TEXT    | Il-manifest JSON sħiħ                                                |
| `config`        | TEXT    | JSON; valur predefinit `{}`                                          |
| `config_schema` | TEXT    | JSON; valur predefinit `{}`                                          |
| `hooks`         | TEXT    | Array JSON tal-ismijiet tal-hooks iddikjarati; valur predefinit `[]` |
| `permissions`   | TEXT    | Array JSON; valur predefinit `[]`                                    |
| `plugin_dir`    | TEXT    | Direttorju assolut tal-installazzjoni                                |
| `error_message` | TEXT    | Issettjat meta `status = "error"`                                    |
| `installed_at`  | TEXT    | `datetime('now')`                                                    |
| `updated_at`    | TEXT    | `datetime('now')`                                                    |
| `activated_at`  | TEXT    | Issettjat mal-attivazzjoni                                           |

Il-metrika/l-analitika tal-plugins tiġi ssorveljata f’tabelli addizzjonali
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Il-paġna tad-dashboard f’`/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) tipprovdi żewġ tabs:

- **Installati** — telenka l-plugins installati flimkien mal-hooks iddikjarati tagħhom, buttuna
  biex tattiva/tiddiżattiva, buttuna biex tneħħi l-installazzjoni, u azzjoni "Skennja għall-plugins"
  (`POST /api/plugins/scan`).
- **Suq** — turi l-katalgu minn `GET /api/plugins/marketplace` flimkien ma’
  qasam biex jiġi ssettjat il-URL tar-reġistru personalizzat.

Paġna ta’ konfigurazzjoni għal kull plugin tinsab f’`/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Ara Wkoll

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  għaliex `/api/plugins` huwa aċċessibbli biss permezz tal-loopback (Livell 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — il-qafas relatat tal-ħiliet
  (`src/lib/skills/`); il-plugins jistgħu jiddikjaraw ħiliet fil-manifest tagħhom
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrazzjonijiet ħerġin
  xprunati minn avvenimenti
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  il-mudell `buildErrorBody()` li tuża kull rotta tal-plugin għat-tweġibiet ta’ żball
