# Plugin Marketplace (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **સત્તાવાર સ્રોત:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, અને
> `src/app/(dashboard)/dashboard/plugins/`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40

OmniRoute સાથે WordPress-શૈલીની પ્લગઇન સિસ્ટમ આવે છે. પ્લગઇન્સ સ્વયં-સમાવિષ્ટ
ડિરેક્ટરીઓ છે — દરેકમાં `plugin.json` મેનિફેસ્ટ અને એક એન્ટ્રી ફાઇલ હોય છે — જે
રેક્વેસ્ટ પાઇપલાઇન (`onRequest` / `onResponse` / `onError`) અને લાઇફસાઇકલ
ઇવેન્ટ્સ (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`) સાથે હૂક થાય છે.

**પ્લગઇન માર્કેટપ્લેસ** એ આ સિસ્ટમની ઉપરનું શોધ સ્તર છે. તે ઇન્સ્ટોલ કરી શકાય
તેવા પ્લગઇન્સનો બ્રાઉઝ કરી શકાય એવો કેટલોગ પ્રસ્તુત કરે છે. મૂળભૂત રીતે કેટલોગ
એક નાની બિલ્ટ-ઇન સીડ રજિસ્ટ્રી છે; ઓપરેટર તેને કસ્ટમ રિમોટ રજિસ્ટ્રી URL તરફ
નિર્દેશિત કરી શકે છે, અને તે સ્થિતિમાં fetch ને DNS-રિઝોલ્વિંગ SSRF ગાર્ડ દ્વારા
સુરક્ષિત બનાવવામાં આવે છે ([સુરક્ષા](#security) જુઓ).

દરેક પ્લગઇન રૂટ **માત્ર લૂપબૅક માટે** છે (Tier 1 — `LOCAL_ONLY`): પ્લગઇન્સ
ચાઇલ્ડ પ્રોસેસમાં કોડ લોડ અને એક્ઝિક્યુટ કરે છે, તેથી auth ગમે તે હોય,
નોન-લૂપબૅક મૂળથી રૂટ્સ સુધી પહોંચી શકાતું નથી. જુઓ
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## તે બધું કેવી રીતે એકસાથે કાર્ય કરે છે

```
ડૅશબોર્ડ (/dashboard/plugins)
  ├─ "ઇન્સ્ટોલ કરેલાં" ટૅબ → GET /api/plugins            (listPlugins)
  │                           POST /api/plugins/scan      (pluginManager.scan)
  │                           POST /api/plugins/{name}/activate|deactivate
  │                           DELETE /api/plugins/{name}   (અનઇન્સ્ટોલ)
  └─ "માર્કેટપ્લેસ" ટૅબ → GET /api/plugins/marketplace
                           → listMarketplacePlugins()
                             ├─ કોઈ કસ્ટમ URL નહીં → બિલ્ટ-ઇન SEED_REGISTRY
                             └─ કસ્ટમ URL → isSafeMarketplaceUrl() SSRF ગાર્ડ
                                          → safeOutboundFetch(guard:"public-only")
```

- **રજિસ્ટ્રી સ્તર** — `src/lib/plugins/marketplace.ts`: કેટલોગને સૂચિબદ્ધ કરે
  છે / તેમાં શોધ કરે છે અને કોઈપણ નિષ્ફળતા પર સીડ રજિસ્ટ્રીનો ઉપયોગ કરે છે.
- **લાઇફસાઇકલ સ્તર** — `src/lib/plugins/manager.ts` (`pluginManager` સિંગલટન):
  ઇન્સ્ટોલ, અપગ્રેડ, સક્રિય, નિષ્ક્રિય, અનઇન્સ્ટોલ, સ્કૅન, સ્ટાર્ટઅપ લોડ.
- **મેનિફેસ્ટ સ્તર** — `src/lib/plugins/manifest.ts`: `plugin.json` માટે Zod
  સ્કીમા + ડિફૉલ્ટ્સ.
- **સ્કૅનર** — `src/lib/plugins/scanner.ts`: પ્લગઇન ડિરેક્ટરી હેઠળ ડિસ્ક પરનાં
  પ્લગઇન્સ શોધે છે.
- **લોડર** — `src/lib/plugins/loader.ts`: દરેક પ્લગઇનને એક અલગ ચાઇલ્ડ પ્રોસેસમાં
  શરૂ કરે છે અને IPC પર હૂક કૉલ્સ માટે મધ્યસ્થતા કરે છે.

## માર્કેટપ્લેસ કેટલોગ

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) `MarketplaceEntry`
ઑબ્જેક્ટ્સની સૂચિ પરત કરે છે:

| ફીલ્ડ         | પ્રકાર   | નોંધો                                     |
| ------------- | -------- | ----------------------------------------- |
| `name`        | string   | kebab-case પ્લગઇન નામ                     |
| `version`     | string   | semver                                    |
| `description` | string   | સંક્ષિપ્ત સારાંશ                          |
| `author`      | string   | લેખક / સંસ્થા                             |
| `license`     | string   | SPDX-શૈલીનું લાઇસન્સ id                   |
| `downloadUrl` | string   | સ્રોત ડાઉનલોડ URL (ખાલી હોઈ શકે)          |
| `repository`  | string?  | વૈકલ્પિક રિપોઝિટરી URL                    |
| `tags`        | string[] | શોધ/ફિલ્ટર ટૅગ્સ                          |
| `downloads`   | number   | ડાઉનલોડની સંખ્યા                          |
| `rating`      | number   | 0–5                                       |
| `verified`    | boolean  | એન્ટ્રી ચકાસાયેલ તરીકે ચિહ્નિત છે કે નહીં |
| `lastUpdated` | string   | ISO-જેવી તારીખની સ્ટ્રિંગ                 |

જ્યારે કોઈ કસ્ટમ રજિસ્ટ્રી URL કૉન્ફિગર કરેલું ન હોય, ત્યારે કેટલોગ બિલ્ટ-ઇન
`SEED_REGISTRY` હોય છે (હાલમાં `request-logger`, `rate-limiter`, `cost-tracker`, અને
`theme-manager`). સીડ રજિસ્ટ્રી હંમેશાં ઉપલબ્ધ હોય છે — જો કૉન્ફિગર કરેલી રિમોટ
રજિસ્ટ્રી સુધી પહોંચી ન શકાય, તે નોન-`200` સ્ટેટસ પરત કરે, અથવા અજાણ્યું બૉડી
પરત કરે, તો `listMarketplacePlugins()` ચેતવણી લૉગ કરે છે અને સીડ સૂચિનો ઉપયોગ કરે છે.

> નોંધ: માર્કેટપ્લેસ **કેટલોગ** (બ્રાઉઝ/શોધ) એક છેડાથી બીજા છેડા સુધી જોડાયેલો
> છે, પરંતુ કેટલોગમાંથી એક-ક્લિક માર્કેટપ્લેસ **ઇન્સ્ટોલ** હજી અમલમાં મૂકાયું નથી —
> માર્કેટપ્લેસ એન્ટ્રી પરનું ડૅશબોર્ડનું "ઇન્સ્ટોલ" બટન હાલમાં "ટૂંક સમયમાં આવી રહ્યું છે"
> એવી સૂચના દર્શાવે છે. હાલમાં ઇન્સ્ટોલેશન લોકલ-પાથ ઇન્સ્ટોલ ફ્લો
> (`POST /api/plugins`) અને ઑન-ડિસ્ક શોધ (`POST /api/plugins/scan`) દ્વારા થાય છે.

## REST API

તમામ endpoints માટે management auth (`requireManagementAuth`) જરૂરી છે **અને** તે
માત્ર loopback માટે ઉપલબ્ધ છે — `/api/plugins` અને `/api/plugins/` ને
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) માં સૂચિબદ્ધ કરવામાં આવ્યા છે.

| Endpoint                         | પદ્ધતિ | વર્ણન                                                       |
| -------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/plugins`                   | GET    | ઇન્સ્ટૉલ કરેલા plugins ની સૂચિ (વૈકલ્પિક `?status=` filter) |
| `/api/plugins`                   | POST   | સંપૂર્ણ local path પરથી plugin ઇન્સ્ટૉલ કરો                 |
| `/api/plugins/scan`              | POST   | plugin directory scan કરીને નવા plugins register કરો        |
| `/api/plugins/marketplace`       | GET    | marketplace catalog entries ની સૂચિ                         |
| `/api/plugins/[name]`            | GET    | ઇન્સ્ટૉલ કરેલા plugin ની વિગતો મેળવો                        |
| `/api/plugins/[name]`            | DELETE | plugin uninstall કરો                                        |
| `/api/plugins/[name]/activate`   | POST   | સક્રિય કરો (load + hooks register કરો)                      |
| `/api/plugins/[name]/deactivate` | POST   | નિષ્ક્રિય કરો (`onDeactivate` ચલાવો, hooks unregister કરો)  |
| `/api/plugins/[name]/config`     | GET    | plugin config + config schema મેળવો                         |
| `/api/plugins/[name]/config`     | PUT    | plugin config update કરો (schema સામે validated)            |

`GET /api/plugins` નો `status` filter
`installed` / `active` / `inactive` / `error` પૈકી એક સ્વીકારે છે. અમાન્ય value માટે `400` પરત મળે છે.

### ઇન્સ્ટૉલ કરેલા plugins ની સૂચિ

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### local path પરથી ઇન્સ્ટૉલ કરો

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` **સંપૂર્ણ** હોવો જરૂરી છે અને તેમાં `..` traversal segments અથવા
null bytes ન હોવા જોઈએ (Zod દ્વારા લાગુ કરાયેલ). Source directory માં માન્ય
`plugin.json` હોવી જોઈએ (અથવા તે આવી directory ની parent હોવી જોઈએ). સફળતા મળતાં response
ઇન્સ્ટૉલ કરેલા plugin row સાથે `201` હોય છે.

### marketplace બ્રાઉઝ કરો

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### plugin config update કરો

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` આપવામાં આવેલી દરેક value ને plugin ના
`configSchema` (manifest માં જાહેર કરેલ) સામે validate કરે છે: `number` fields `min`/`max` નું પાલન કરે છે,
`select` fields જાહેર કરેલ `enum` સાથે મેળ ખાતાં હોવા જોઈએ. Schema માં હાજર ન હોય તેવી keys ને
અનુમતિ આપવામાં આવે છે.

## Configuration

### Plugin directory

Plugins OmniRoute data directory હેઠળ રહે છે:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (અથવા manifest.main જે તરફ નિર્દેશ કરે તે)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) તે directory ને
ત્રણ પગલાંમાં resolve કરે છે:

1. **`OMNIROUTE_PLUGINS_DIR`**, જ્યારે set હોય — `HOME` માં જે કંઈ હોય તેને ધ્યાનમાં લીધા વિના, તેનો જેમનો તેમ ઉપયોગ થાય છે. આ
   Docker/K8s માટેનું સ્પષ્ટ નિયંત્રણ છે, જ્યાં plugin tree એવા path પર bind-mounted હોય છે
   જેને સામાન્ય રીતે container ની home directory સાથે કોઈ સંબંધ હોતો નથી (#11827).
2. `<home>/.omniroute/plugins`, જ્યાં `<home>` `HOME` / `USERPROFILE`
   environment variables માંથી મળે છે.
3. `/tmp/.omniroute/plugins`, જ્યારે process કોઈ home export કરતું જ ન હોય.

Resolve થયેલી directory startup વખતે એક વાર `scanner.dir_resolved` તરીકે log થાય છે અને
જે input પસંદ થયો તેનું નામ (`OMNIROUTE_PLUGINS_DIR`, `home`, અથવા `no-home-fallback`) દર્શાવે છે — જેથી
ચુપચાપ પગલું 3 પર પહોંચતી image માત્ર ખાલી plugin list report કરવાને બદલે તે બાબત સ્પષ્ટ કરે.
`POST /api/plugins/scan` ત્યાંની એવી કોઈપણ subdirectory શોધે છે જેમાં માન્ય
`plugin.json` હોય અને તેને register કરે છે; એ જ directory એ root છે જેમાં
`pluginManager.install()` plugins copy કરે છે, તેથી override discovery અને
installation બંનેને સાથે ખસેડે છે.

> **`OMNIROUTE_PLUGINS_DIR`, `OMNIROUTE_PLUGIN_PATH` નથી.** બાદવાળું માત્ર
> CLI command-plugin loader (`bin/cli/plugins.mjs`) દ્વારા `omniroute-cmd-*` npm
> packages શોધવા માટે વાંચવામાં આવે છે, જે `omniroute` subcommands ઉમેરે છે — અહીં વર્ણવેલા runtime scanner પર
> તેની કોઈ અસર નથી. તેની વિગતો માટે [PLUGINS.md](./PLUGINS.md) જુઓ.

### Custom marketplace registry URL

Marketplace catalog source `pluginMarketplaceUrl` setting માંથી વાંચવામાં આવે છે
(`src/lib/plugins/marketplace.ts`, `settings.pluginMarketplaceUrl` વાંચે છે). જ્યારે તેને
`http(s)` URL પર set કરવામાં આવે છે, ત્યારે `listMarketplacePlugins()` તે URL fetch કરે છે અને
entries ની top-level JSON array અથવા `plugins` array ધરાવતો object,
બંનેમાંથી કોઈ એક સ્વીકારે છે; string `name` વગરની entries filter કરીને દૂર કરવામાં આવે છે. જ્યારે તે unset હોય (અથવા fetch
SSRF guard માં નિષ્ફળ જાય / ખરાબ response પરત કરે), ત્યારે built-in seed registry નો
ઉપયોગ થાય છે.

Dashboard માં "Marketplace" tab આ URL માટે field આપે છે (તેને
`GET /api/settings` માંથી પાછું વાંચવામાં આવે છે).

> અમલીકરણ નોંધ: dashboard ની "Save" action
> `pluginMarketplaceUrl` ને `PATCH /api/settings` પર મોકલે છે. આ લખતી વખતે આ
> key `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`) માં જાહેર કરેલી નથી, તેથી તેના પર આધાર રાખતા પહેલાં તમારા
> release માં persistence ચકાસો — settings
> store માં key હાજર થયા પછી **read** path (`getSettings()` →
> `listMarketplacePlugins()`) તેનું પાલન કરે છે.

## સુરક્ષા

### રૂટ ટિયર — માત્ર લૂપબૅક

પ્લગઇન્સ સ્પૉન કરેલી ચાઇલ્ડ પ્રોસેસોમાં કોડ ચલાવે છે, તેથી સમગ્ર `/api/plugins`
સપાટીને `LOCAL_ONLY` (ટિયર 1) તરીકે વર્ગીકૃત કરવામાં આવી છે. કોઈપણ પ્રમાણીકરણ
તપાસની **પહેલાં** લૂપબૅક અમલીકરણ બિનશરતી રીતે ચાલે છે, જેથી ટનલ મારફતે મશીન સુધી
પહોંચેલું લીક થયેલું મેનેજમેન્ટ ટોકન પણ પ્લગઇન ઇન્સ્ટોલ, સક્રિય અથવા અનઇન્સ્ટોલ
કરી શકતું નથી. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)
અને સખત નિયમો #15 / #17 જુઓ.

### માર્કેટપ્લેસ રજિસ્ટ્રી SSRF સુરક્ષા

કસ્ટમ રજિસ્ટ્રી URL એ હુમલાખોરથી પ્રભાવિત થઈ શકે એવું કન્ફિગરેશન છે, તેથી તેને
ફેચ કરતાં પહેલાં `listMarketplacePlugins()` તેને બે સ્તરોમાંથી પસાર કરે છે:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` ન હોય એવી દરેક વસ્તુને નકારે છે.
   - પ્રમાણભૂત `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) દ્વારા લિટરલ ખાનગી/લૂપબૅક/લિંક-લોકલ/ULA
     હોસ્ટ્સને નકારે છે (IPv4-મેપ્ડ સહિત IPv4 **અને** IPv6).
   - **બંને** `A` અને `AAAA` રેકોર્ડ્સ રિઝૉલ્વ કરે છે અને રિઝૉલ્વ થયેલું **કોઈપણ**
     સરનામું ખાનગી હોય તો નકારે છે — જેથી જાહેર-હોસ્ટનેમ → ખાનગી-IP બાયપાસ બંધ થાય છે.
   - **બંધ સ્થિતિમાં નિષ્ફળ જાય છે**: DNS રિઝોલ્યુશન નિષ્ફળતા URLને નકારે છે.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): ફેચ કરતી વખતે ફક્ત-જાહેર URL
   સુરક્ષા ફરીથી લાગુ કરે છે અને **રીડાયરેક્ટ્સને અવરોધે છે** (જાહેર → ખાનગી `30x`
   પિવટ નહીં).

કોઈપણ સ્તર પર નિષ્ફળ થતું URL વિનંતીને રદ કરતું નથી — માર્કેટપ્લેસ નિઃશબ્દ રીતે
બિલ્ટ-ઇન સીડ રજિસ્ટ્રી પર પાછું ફરે છે અને ચેતવણી લૉગ કરે છે.

> આ સુરક્ષાને PR #3774માં ખાસ કરીને A + AAAA રિઝૉલ્વ કરવા અને માત્ર-IPv4 તપાસને
> બદલે પ્રમાણભૂત `isPrivateHost` વાપરવા માટે વધુ મજબૂત બનાવવામાં આવી હતી.

### પ્લગઇન એક્ઝિક્યુશન આઇસોલેશન

- **પ્રોસેસ આઇસોલેશન** — `loadPlugin()` (`src/lib/plugins/loader.ts`) દરેક
  પ્લગઇનને અલગ Node.js ચાઇલ્ડ પ્રોસેસમાં સ્પૉન કરે છે અને IPC દ્વારા સંચાર કરે છે.
  હૂક કૉલ્સમાં `SIGTERM` → `SIGKILL` એસ્કેલેશન સાથે ટાઇમઆઉટ હોય છે.
- **એન્વાયરમેન્ટ અલાઉલિસ્ટ** — ચાઇલ્ડને ફક્ત અલાઉલિસ્ટમાં રહેલા એન્વાયરમેન્ટ
  વેરિએબલ્સનો સમૂહ મળે છે; મેનિફેસ્ટ `env` પરવાનગીની વિનંતી કરે ત્યારે જ વધુ
  વ્યાપક સમૂહ આપવામાં આવે છે.
- **પાથ કન્ટેનમેન્ટ** — કોઈપણ કૉપી અથવા રિકર્સિવ ડિલીટ પહેલાં, ઇન્સ્ટોલ/અપગ્રેડ/અનઇન્સ્ટોલ
  ખાતરી કરે છે કે પ્લગઇન ડિરેક્ટરી અને `manifest.main` મેનેજ કરાયેલા પ્લગઇન રૂટની
  **અંદર** રિઝૉલ્વ થાય છે (ચેડાં કરાયેલા DB પાથ્સ અને `manifest.main`માં `../`
  ટ્રાવર્સલ સામે સુરક્ષા આપે છે). સક્રિયકરણ `realpath` દ્વારા સિમલિંક્સ રિઝૉલ્વ
  કરે છે અને પ્લગઇન ડિરેક્ટરીની બહાર જતા એન્ટ્રી પૉઇન્ટને લોડ કરવાનો ઇનકાર કરે છે.
- **વૈકલ્પિક ઇન્ટેગ્રિટી પિન** — મેનિફેસ્ટ `integrity`
  (`sha256-<base64>`, SRI ફોર્મેટ) ફીલ્ડ જાહેર કરી શકે છે. તે હાજર હોય ત્યારે,
  લોડર લોડ સમયે એન્ટ્રી ફાઇલનું હૅશ ચકાસે છે અને મેળ ન પડે તો સક્રિય કરવાનો ઇનકાર
  કરે છે. આ પસંદગીયુક્ત ચેડાં-શોધ વ્યવસ્થા છે, સુરક્ષા સીમા **નથી** — માત્ર-લૂપબૅક
  રૂટિંગ અને પરવાનગી મૉડલ જ વાસ્તવિક સીમાઓ છે.

## મેનિફેસ્ટ (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) દ્વારા માન્ય કરાયેલ:

| ફીલ્ડ              | પ્રકાર    | નોંધો                                                        |
| ------------------ | --------- | ------------------------------------------------------------ |
| `name`             | string    | આવશ્યક; kebab-case (`^[a-z0-9-]+$`), 1–100 અક્ષરો            |
| `version`          | string    | આવશ્યક; semver (`MAJOR.MINOR.PATCH`)                         |
| `description`      | string?   | ≤ 500 અક્ષરો                                                 |
| `author`           | string?   | ≤ 200 અક્ષરો                                                 |
| `license`          | string?   | ડિફૉલ્ટ `MIT`                                                |
| `main`             | string?   | એન્ટ્રી ફાઇલ; ડિફૉલ્ટ `index.js`                             |
| `source`           | enum?     | `local` \| `marketplace` (ડિફૉલ્ટ `local`)                   |
| `tags`             | string[]? | શોધ ટૅગ્સ                                                    |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                              |
| `hooks`            | object?   | પ્લગઇન કયા હૂક્સ અમલમાં મૂકે છે તે દર્શાવતા બૂલિયન           |
| `skills`           | object[]? | વૈકલ્પિક સ્કિલ વ્યાખ્યાઓ                                     |
| `enabledByDefault` | boolean?  | ઇન્સ્ટોલ કરતી વખતે આપમેળે સક્રિય કરો                         |
| `configSchema`     | object?   | કન્ફિગ ફીલ્ડ્સનો નકશો (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | વૈકલ્પિક `sha256-<base64>` એન્ટ્રી-ફાઇલ પિન                  |

પરવાનગીઓ `network` / `file-read` / `file-write` / `env` / `exec`
enumમાંથી લેવામાં આવે છે.

## જીવનચક્ર પ્રવાહ

```
install (POST /api/plugins, પાથ)
  → મેનિફેસ્ટ સ્કૅન/માન્ય કરો → સ્ટેજિંગમાં કૉપિ કરો → main ડિરેક્ટરીની અંદર હોવાની ખાતરી કરો
  → ~/.omniroute/plugins/<name> માં અવિભાજ્ય રીતે નામ બદલો → DB પંક્તિ દાખલ કરો
  → onInstall ચલાવો → જો enabledByDefault હોય: સક્રિય કરો

activate (POST /api/plugins/{name}/activate)
  → realpath સમાવિષ્ટતા તપાસ → loadPlugin() (ચાઇલ્ડ પ્રોસેસ શરૂ કરો)
  → જાહેર કરેલા હૂક્સ નોંધણી કરો → status = "active" → onActivate ચલાવો

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate ચલાવો (નોંધણી રદ કરતાં પહેલાં) → હૂક્સની નોંધણી રદ કરો
  → ચાઇલ્ડ પ્રોસેસ સમાપ્ત કરો → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → સક્રિય હોય તો નિષ્ક્રિય કરો → onUninstall ચલાવો
  → સમાવિષ્ટતા ચકાસીને પ્લગઇન ડિરેક્ટરી પુનરાવર્તિત રીતે કાઢી નાખો → DB પંક્તિ કાઢી નાખો
```

જે ડિરેક્ટરીનું મેનિફેસ્ટ સંસ્કરણ ઇન્સ્ટૉલ કરેલા સંસ્કરણ કરતાં **ચોક્કસપણે
નવું** હોય, તેની સામે `install` ફરી ચલાવવાથી આપમેળે અપગ્રેડ થાય છે (સ્વચ્છ પુનઃઇન્સ્ટૉલેશન; કૉન્ફિગ
ડિફૉલ્ટ મૂલ્યો પર રીસેટ થાય છે). સમાન અથવા જૂનું સંસ્કરણ નકારવામાં આવે છે.

## ડેટાબેઝ

કોષ્ટક `plugins` (માઇગ્રેશન `076_create_plugins.sql`):

| કૉલમ            | પ્રકાર  | નોંધો                                            |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | અનન્ય                                            |
| `version`       | TEXT    | semver; ડિફૉલ્ટ `1.0.0`                          |
| `description`   | TEXT    | વૈકલ્પિક                                         |
| `author`        | TEXT    | વૈકલ્પિક                                         |
| `license`       | TEXT    | ડિફૉલ્ટ `MIT`                                    |
| `main`          | TEXT    | પ્રવેશ ફાઇલ; ડિફૉલ્ટ `index.js`                  |
| `source`        | TEXT    | ડિફૉલ્ટ `local`                                  |
| `tags`          | TEXT    | JSON ઍરે; ડિફૉલ્ટ `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; ડિફૉલ્ટ 0                                   |
| `manifest`      | TEXT    | સંપૂર્ણ મેનિફેસ્ટ JSON                           |
| `config`        | TEXT    | JSON; ડિફૉલ્ટ `{}`                               |
| `config_schema` | TEXT    | JSON; ડિફૉલ્ટ `{}`                               |
| `hooks`         | TEXT    | જાહેર કરેલા હૂક નામોનું JSON ઍરે; ડિફૉલ્ટ `[]`   |
| `permissions`   | TEXT    | JSON ઍરે; ડિફૉલ્ટ `[]`                           |
| `plugin_dir`    | TEXT    | ઇન્સ્ટૉલેશન ડિરેક્ટરીનો સંપૂર્ણ પાથ              |
| `error_message` | TEXT    | જ્યારે `status = "error"` હોય ત્યારે સેટ થાય છે  |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | સક્રિયકરણ વખતે સેટ થાય છે                        |

પ્લગઇન મેટ્રિક્સ/ઍનાલિટિક્સ વધારાના કોષ્ટકોમાં ટ્રૅક કરવામાં આવે છે
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## ડૅશબોર્ડ

`/dashboard/plugins` પરનું ડૅશબોર્ડ પૃષ્ઠ
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) બે ટૅબ પ્રદાન કરે છે:

- **ઇન્સ્ટૉલ કરેલા** — ઇન્સ્ટૉલ કરેલા પ્લગઇન્સને તેમના જાહેર કરેલા હૂક્સ, સક્રિય/નિષ્ક્રિય
  ટૉગલ, અનઇન્સ્ટૉલ બટન અને "પ્લગઇન્સ માટે સ્કૅન કરો"
  ક્રિયા (`POST /api/plugins/scan`) સાથે સૂચિબદ્ધ કરે છે.
- **માર્કેટપ્લેસ** — કસ્ટમ રજિસ્ટ્રી URL સેટ કરવા માટેના
  ફીલ્ડ સાથે `GET /api/plugins/marketplace` માંથી કૅટલૉગ બતાવે છે.

દરેક પ્લગઇન માટેનું કૉન્ફિગ પૃષ્ઠ `/dashboard/plugins/[name]/config` પર આવેલું છે
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## આ પણ જુઓ

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` માત્ર લૂપબૅક માટે જ કેમ ઉપલબ્ધ છે (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — સંબંધિત સ્કિલ્સ ફ્રેમવર્ક
  (`src/lib/skills/`); પ્લગઇન્સ તેમના મેનિફેસ્ટમાં સ્કિલ્સ જાહેર કરી શકે છે
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — ઇવેન્ટ-આધારિત આઉટબાઉન્ડ
  ઇન્ટિગ્રેશન્સ
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  ભૂલ પ્રતિસાદો માટે દરેક પ્લગઇન રૂટ દ્વારા ઉપયોગમાં લેવાતી `buildErrorBody()` પેટર્ન
