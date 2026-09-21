# Plugin Marketplace (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **සත්යයේ මූලාශ්රය:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, සහ
> `src/app/(dashboard)/dashboard/plugins/`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40

OmniRoute සමඟ WordPress-ආකාරයේ ප්ලගින පද්ධතියක් සපයනු ලැබේ. ප්ලගින යනු ස්වයං-අන්තර්ගත
නාමාවලි වේ — සෑම එකකම `plugin.json` මැනිෆෙස්ටයක් සහ ප්රවේශ ගොනුවක් ඇත — ඒවා
ඉල්ලීම් නළ මාර්ගයට (`onRequest` / `onResponse` / `onError`) සහ
ජීවන චක්ර සිදුවීම්වලට (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`)
සම්බන්ධ වේ.

**Plugin Marketplace** යනු එම පද්ධතිය මත ඇති සොයාගැනීමේ ස්තරයයි. එය
ස්ථාපනය කළ හැකි ප්ලගිනවල පිරික්සිය හැකි නාමාවලියක් නිරාවරණය කරයි. පෙරනිමියෙන් නාමාවලිය
කුඩා, අන්තර්නිර්මිත seed registry එකකි; මෙහෙයුම්කරුවෙකුට එය අභිරුචි දුරස්ථ
registry URL එකක් වෙත යොමු කළ හැකි අතර, එවැනි අවස්ථාවක DNS-විසඳන SSRF ආරක්ෂකයක්
මඟින් ලබාගැනීම දැඩි ලෙස ආරක්ෂා කරනු ලැබේ ([ආරක්ෂාව](#security) බලන්න).

සෑම ප්ලගින මාර්ගයක්ම **loopback සඳහා පමණි** (Tier 1 — `LOCAL_ONLY`): ප්ලගින child processes තුළ
කේතය පූරණය කර ක්රියාත්මක කරන බැවින්, සත්යාපනය කුමක් වුවත් loopback නොවන
මූලාශ්රයකින් මෙම මාර්ග වෙත ළඟා විය නොහැක. බලන්න
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## මෙය එක්ව ක්රියා කරන ආකාරය

```
උපකරණ පුවරුව (/dashboard/plugins)
  ├─ "ස්ථාපිත" ටැබය    → GET /api/plugins            (listPlugins)
  │                       POST /api/plugins/scan      (pluginManager.scan)
  │                       POST /api/plugins/{name}/activate|deactivate
  │                       DELETE /api/plugins/{name}   (අස්ථාපනය)
  └─ "වෙළඳපොළ" ටැබය   → GET /api/plugins/marketplace
                           → listMarketplacePlugins()
                             ├─ අභිරුචි URL එකක් නැත → අන්තර්නිර්මිත SEED_REGISTRY
                             └─ අභිරුචි URL → isSafeMarketplaceUrl() SSRF ආරක්ෂකය
                                           → safeOutboundFetch(guard:"public-only")
```

- **Registry ස්තරය** — `src/lib/plugins/marketplace.ts`: නාමාවලිය ලැයිස්තුගත කරයි /
  සොයයි; කිසියම් අසාර්ථකත්වයක් සිදු වුවහොත් seed registry එක භාවිත කරයි.
- **ජීවන චක්ර ස්තරය** — `src/lib/plugins/manager.ts` (`pluginManager` singleton):
  ස්ථාපනය, උත්ශ්රේණිගත කිරීම, සක්රිය කිරීම, අක්රිය කිරීම, අස්ථාපනය, ස්කෑන් කිරීම, ආරම්භක පූරණය.
- **මැනිෆෙස්ට් ස්තරය** — `src/lib/plugins/manifest.ts`: `plugin.json` සඳහා
  Zod schema + පෙරනිමි.
- **ස්කෑනරය** — `src/lib/plugins/scanner.ts`: ප්ලගින නාමාවලිය යටතේ තැටියේ ඇති
  ප්ලගින සොයාගනී.
- **පූරකය** — `src/lib/plugins/loader.ts`: සෑම ප්ලගිනයක්ම හුදකලා
  child process එකක ආරම්භ කර IPC හරහා hook ඇමතුම් අතරමැදි කරයි.

## වෙළඳපොළ නාමාවලිය

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) මඟින්
`MarketplaceEntry` වස්තු ලැයිස්තුවක් ආපසු ලබා දෙයි:

| ක්ෂේත්රය      | වර්ගය    | සටහන්                                    |
| ------------- | -------- | ---------------------------------------- |
| `name`        | string   | kebab-case ප්ලගින නාමය                   |
| `version`     | string   | semver                                   |
| `description` | string   | කෙටි සාරාංශය                             |
| `author`      | string   | කර්තෘ / සංවිධානය                         |
| `license`     | string   | SPDX-ආකාරයේ බලපත්ර හැඳුනුම               |
| `downloadUrl` | string   | මූලාශ්ර බාගැනීම් URL එක (හිස් විය හැක)   |
| `repository`  | string?  | විකල්ප repository URL එක                 |
| `tags`        | string[] | සෙවුම්/පෙරහන් ටැග                        |
| `downloads`   | number   | බාගැනීම් ගණන                             |
| `rating`      | number   | 0–5                                      |
| `verified`    | boolean  | ප්රවේශය සත්යාපිත ලෙස ලකුණු කර තිබේද යන්න |
| `lastUpdated` | string   | ISO-ආකාරයේ දින තන්තුව                    |

අභිරුචි registry URL එකක් වින්යාස කර නොමැති විට, නාමාවලිය වන්නේ අන්තර්නිර්මිත
`SEED_REGISTRY` එකයි (දැනට `request-logger`, `rate-limiter`, `cost-tracker`, සහ
`theme-manager`). seed registry එක සැමවිටම ලබා ගත හැක — වින්යාස කළ දුරස්ථ
registry එක වෙත ළඟා විය නොහැකි නම්, `200` නොවන තත්ත්වයක් ආපසු ලබා දෙන්නේ නම්, හෝ හඳුනාගත නොහැකි
අන්තර්ගතයක් ආපසු ලබා දෙන්නේ නම්, `listMarketplacePlugins()` අනතුරු ඇඟවීමක් ලොග් කර seed ලැයිස්තුව
වෙත යළි යොමු වේ.

> සටහන: වෙළඳපොළ **නාමාවලිය** (පිරික්සීම/සෙවීම) අන්තයේ සිට අන්තය දක්වා සම්බන්ධ කර ඇත, නමුත්
> නාමාවලියෙන් එක් ක්ලික් කිරීමකින් සිදු කරන වෙළඳපොළ **ස්ථාපනය** තවම ක්රියාත්මක කර නැත —
> වෙළඳපොළ ප්රවේශයක ඇති උපකරණ පුවරුවේ "ස්ථාපනය කරන්න" බොත්තම දැනට
> "ළඟදීම පැමිණේ" යන දැනුම්දීමක් පෙන්වයි. වර්තමානයේ ස්ථාපනය සිදු වන්නේ දේශීය-මාර්ග ස්ථාපන
> ප්රවාහය (`POST /api/plugins`) සහ තැටිය මත සොයාගැනීම (`POST /api/plugins/scan`) හරහාය.

## REST API

සියලුම endpoints සඳහා කළමනාකරණ සත්යාපනය (`requireManagementAuth`) අවශ්ය වන අතර ඒවා
loopback සඳහා පමණක් සීමා වේ — `/api/plugins` සහ `/api/plugins/`
`LOCAL_ONLY_API_PREFIXES` තුළ ලැයිස්තුගත කර ඇත (`src/server/authz/routeGuard.ts`).

| Endpoint                         | ක්රමය  | විස්තරය                                                                   |
| -------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | ස්ථාපිත plugins ලැයිස්තුගත කිරීම (විකල්ප `?status=` පෙරහන)                |
| `/api/plugins`                   | POST   | නිරපේක්ෂ දේශීය path එකකින් plugin එකක් ස්ථාපනය කිරීම                      |
| `/api/plugins/scan`              | POST   | plugin නාමාවලිය scan කර නව plugins ලියාපදිංචි කිරීම                       |
| `/api/plugins/marketplace`       | GET    | marketplace නාමාවලි ඇතුළත් කිරීම් ලැයිස්තුගත කිරීම                        |
| `/api/plugins/[name]`            | GET    | ස්ථාපිත plugin එකක විස්තර ලබාගැනීම                                        |
| `/api/plugins/[name]`            | DELETE | plugin එකක් අස්ථාපනය කිරීම                                                |
| `/api/plugins/[name]/activate`   | POST   | සක්රිය කිරීම (load කිරීම + hooks ලියාපදිංචි කිරීම)                        |
| `/api/plugins/[name]/deactivate` | POST   | අක්රිය කිරීම (`onDeactivate` ක්රියාත්මක කර, hooks ලියාපදිංචිය ඉවත් කිරීම) |
| `/api/plugins/[name]/config`     | GET    | plugin config + config schema ලබාගැනීම                                    |
| `/api/plugins/[name]/config`     | PUT    | plugin config යාවත්කාලීන කිරීම (schema එකට එරෙහිව වලංගු කරනු ලැබේ)        |

`GET /api/plugins` හි `status` පෙරහන
`installed` / `active` / `inactive` / `error` යන අගයන්ගෙන් එකක් පිළිගනී. වලංගු නොවන අගයක් `400` ආපසු ලබාදෙයි.

### ස්ථාපිත plugins ලැයිස්තුගත කිරීම

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### දේශීය path එකකින් ස්ථාපනය කිරීම

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` එක **නිරපේක්ෂ** විය යුතු අතර එහි `..` traversal segments හෝ
null bytes අඩංගු විය නොහැක (Zod මඟින් බලාත්මක කරනු ලැබේ). මූලාශ්ර නාමාවලියෙහි වලංගු
`plugin.json` එකක් අඩංගු විය යුතුය (නැතහොත් එවැන්නක parent නාමාවලියක් විය යුතුය). සාර්ථක වූ විට ප්රතිචාරය
ස්ථාපිත plugin row එක සමඟ `201` වේ.

### marketplace එක පිරික්සීම

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### plugin config යාවත්කාලීන කිරීම

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` මඟින් සපයන ලද සෑම අගයක්ම plugin එකේ
`configSchema` එකට එරෙහිව වලංගු කරයි (manifest එකෙහි ප්රකාශිත): `number` fields සඳහා `min`/`max`
ගරු කරනු ලබන අතර, `select` fields ප්රකාශිත `enum` සමඟ ගැළපිය යුතුය. schema එකෙහි නොමැති keys
අවසර දෙනු ලැබේ.

## වින්යාසය

### Plugin නාමාවලිය

Plugins OmniRoute data නාමාවලිය යටතේ පවතී:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (හෝ manifest.main යොමු කරන වෙනත් ඕනෑම දෙයක්)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) එම නාමාවලිය
පියවර තුනකින් නිර්ණය කරයි:

1. **`OMNIROUTE_PLUGINS_DIR`**, සකසා ඇති විට — `HOME` කුමක් පැවසුවත්, එය ඇති ආකාරයෙන්ම භාවිත කරයි. මෙය
   සාමාන්යයෙන් container එකේ home නාමාවලිය සමඟ කිසිදු සම්බන්ධයක් නොමැති path එකකට plugin tree එක bind-mount කර ඇති Docker/K8s සඳහා වන
   පැහැදිලි පාලකයයි (#11827).
2. `<home>/.omniroute/plugins`, මෙහි `<home>` ලැබෙන්නේ `HOME` / `USERPROFILE`
   environment variables වෙතිනි.
3. `/tmp/.omniroute/plugins`, process එක කිසිදු home එකක් export නොකරන විට.

නිර්ණය කළ නාමාවලිය startup අවස්ථාවේ `scanner.dir_resolved` ලෙස එක් වරක් log කරනු ලබන අතර, තෝරාගත්
input එක (`OMNIROUTE_PLUGINS_DIR`, `home`, හෝ `no-home-fallback`) නම් කරයි — එබැවින්
නිහඬව පියවර 3 වෙත යන image එකක්, හිස් plugin ලැයිස්තුවක් පමණක් වාර්තා කිරීම වෙනුවට එය පැහැදිලිව සඳහන් කරයි.
`POST /api/plugins/scan` එහි වලංගු
`plugin.json` එකක් ඇති ඕනෑම subdirectory එකක් සොයාගෙන එය ලියාපදිංචි කරයි; එම නාමාවලියම
`pluginManager.install()` විසින් plugins පිටපත් කරන root එක වන බැවින්, override එකක් මඟින් සොයාගැනීම සහ
ස්ථාපනය යන දෙකම එකට ගෙනයයි.

> **`OMNIROUTE_PLUGINS_DIR` යනු `OMNIROUTE_PLUGIN_PATH` නොවේ.** දෙවැන්න කියවනු ලබන්නේ
> `omniroute` subcommands එක් කරන `omniroute-cmd-*` npm
> packages සොයාගැනීම සඳහා CLI command-plugin loader (`bin/cli/plugins.mjs`) මඟින් පමණි — මෙහි විස්තර කර ඇති runtime scanner එකට
> එය කිසිදු බලපෑමක් නොකරයි. එම පැත්ත සඳහා [PLUGINS.md](./PLUGINS.md) බලන්න.

### අභිරුචි marketplace registry URL

marketplace නාමාවලියේ මූලාශ්රය `pluginMarketplaceUrl` setting එකෙන් කියවනු ලැබේ
(`src/lib/plugins/marketplace.ts` මඟින් `settings.pluginMarketplaceUrl` කියවයි).
එය `http(s)` URL එකකට සකසා ඇති විට, `listMarketplacePlugins()` එම URL එක fetch කර,
ඉහළ මට්ටමේ JSON entries array එකක් හෝ `plugins` array එකක් සහිත object එකක් පිළිගනී;
string වර්ගයේ `name` එකක් නොමැති entries පෙරා ඉවත් කරනු ලැබේ. එය සකසා නොමැති විට (හෝ fetch කිරීම
SSRF guard එකෙන් අසමත් වූ විට / නුසුදුසු ප්රතිචාරයක් ලබාදුන් විට), built-in seed registry එක
භාවිත කරනු ලැබේ.

dashboard එකේ "Marketplace" tab එක මෙම URL සඳහා field එකක් සපයයි (`GET /api/settings` වෙතින් නැවත කියවනු ලැබේ).

> ක්රියාත්මක කිරීම පිළිබඳ සටහන: dashboard එකේ "Save" action එක
> `pluginMarketplaceUrl`, `PATCH /api/settings` වෙත යවයි. මෙය ලියන අවස්ථාවේදී මෙම
> key එක `updateSettingsSchema` තුළ ප්රකාශ කර නැත
> (`src/shared/validation/settingsSchemas.ts`), එබැවින් එය මත රඳා සිටීමට පෙර ඔබේ
> release එකෙහි persistence තහවුරු කරන්න — settings
> store එකේ key එක පවතින විට **කියවීමේ** path එක (`getSettings()` →
> `listMarketplacePlugins()`) එයට ගරු කරයි.

## ආරක්ෂාව

### මාර්ග ස්තරය — loopback පමණි

Plugins විසින් spawned child processes තුළ කේතය ක්රියාත්මක කරන බැවින්, සම්පූර්ණ `/api/plugins`
මතුපිටම `LOCAL_ONLY` (Tier 1) ලෙස වර්ගීකරණය කර ඇත. Loopback බලාත්මක කිරීම
ඕනෑම සත්යාපන පරීක්ෂාවකට **පෙර** කොන්දේසි විරහිතව ක්රියාත්මක වන බැවින්, tunnel එකක් හරහා
පරිගණකයට ළඟා වන කාන්දු වූ කළමනාකරණ token එකකට වුවද plugin එකක් ස්ථාපනය කිරීමට,
සක්රිය කිරීමට හෝ අස්ථාපනය කිරීමට නොහැක.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) සහ
දැඩි නීති #15 / #17 බලන්න.

### Marketplace registry SSRF ආරක්ෂකය

අභිරුචි registry URL එකක් ප්රහාරකයෙකුට බලපෑම් කළ හැකි වින්යාසයක් වන බැවින්, එය
ලබාගැනීමට පෙර `listMarketplacePlugins()` එය ස්තර දෙකක් හරහා පරීක්ෂා කරයි:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` නොවන සියල්ල ප්රතික්ෂේප කරයි.
   - සම්මත `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) මඟින් literal private/loopback/link-local/ULA hosts
     (IPv4-වෙත mapped ලිපින ඇතුළුව IPv4 **සහ** IPv6) ප්රතික්ෂේප කරයි.
   - `A` සහ `AAAA` වාර්තා **දෙකම** resolve කර, resolve කළ ලිපිනවලින් **කිසියම් එකක් හෝ**
     private නම් ප්රතික්ෂේප කරයි — එමඟින් public-hostname → private-IP මඟහැරීම වසා දමයි.
   - **ආරක්ෂිත ලෙස අසමත් වේ**: DNS resolution අසමත් වුවහොත් URL එක ප්රතික්ෂේප කරයි.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): fetch කරන අවස්ථාවේ public-only URL
   ආරක්ෂකය නැවත යොදන අතර **redirects අවහිර කරයි** (public → private `30x`
   මාරුවකට ඉඩ නොදේ).

ස්තර දෙකෙන් එකකින් හෝ අසමත් වන URL එකක් request එක අවලංගු නොකරයි — marketplace එක
නිහඬව built-in seed registry එක වෙත ආපසු ගොස් අනතුරු ඇඟවීමක් log කරයි.

> මෙම ආරක්ෂකය PR #3774 තුළ විශේෂයෙන් ශක්තිමත් කරන ලද්දේ A + AAAA resolve කිරීමට සහ
> IPv4-only පරීක්ෂාවක් වෙනුවට සම්මත `isPrivateHost` භාවිත කිරීමටය.

### Plugin ක්රියාත්මක කිරීමේ හුදකලාකරණය

- **ක්රියාවලි හුදකලාකරණය** — `loadPlugin()` (`src/lib/plugins/loader.ts`) විසින්
  සෑම plugin එකක්ම වෙනම Node.js child process එකක spawn කර IPC හරහා සන්නිවේදනය කරයි.
  Hook calls සඳහා `SIGTERM` → `SIGKILL` දක්වා තීව්ර වන timeout එකක් ඇත.
- **Env අවසර ලැයිස්තුව** — child වෙත ලැබෙන්නේ අවසර ලැයිස්තුවක ඇති environment
  variables කට්ටලයක් පමණි; වඩා පුළුල් කට්ටලය ලබා දෙන්නේ manifest එක
  `env` අවසරය ඉල්ලා සිටින විට පමණි.
- **Path සීමාකරණය** — ඕනෑම පිටපත් කිරීමකට හෝ recursive delete කිරීමකට පෙර,
  plugin directory එක සහ `manifest.main` යන දෙකම කළමනාකරණය කරන plugin root එක
  **තුළම** resolve වන බව install/upgrade/uninstall ක්රියා තහවුරු කරයි (විකෘති කළ DB paths සහ
  `manifest.main` තුළ `../` traversal වලින් ආරක්ෂා කරයි). Activation ක්රියාවලිය
  `realpath` හරහා symlinks resolve කර, plugin directory එකෙන් පිටතට යන entry point එකක්
  load කිරීම ප්රතික්ෂේප කරයි.
- **විකල්ප integrity pin එක** — manifest එකකට `integrity`
  (`sha256-<base64>`, SRI ආකෘතිය) field එකක් ප්රකාශ කළ හැක. එය ඇති විට, loader එක
  load කරන අවස්ථාවේ entry file hash එක සත්යාපනය කර නොගැළපීමක් තිබේ නම් සක්රිය කිරීම
  ප්රතික්ෂේප කරයි. මෙය තෝරා සක්රිය කළ යුතු විකෘති කිරීම් හඳුනාගැනීමේ ක්රමයක් මිස
  ආරක්ෂක සීමාවක් **නොවේ** — loopback-only routing සහ permission model එක සැබෑ සීමාවන් වේ.

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) මඟින් වලංගු කරයි:

| Field              | Type      | සටහන්                                                       |
| ------------------ | --------- | ----------------------------------------------------------- |
| `name`             | string    | අවශ්යයි; kebab-case (`^[a-z0-9-]+$`), අක්ෂර 1–100           |
| `version`          | string    | අවශ්යයි; semver (`MAJOR.MINOR.PATCH`)                       |
| `description`      | string?   | අක්ෂර ≤ 500                                                 |
| `author`           | string?   | අක්ෂර ≤ 200                                                 |
| `license`          | string?   | පෙරනිමිය `MIT` වේ                                           |
| `main`             | string?   | Entry file එක; පෙරනිමිය `index.js` වේ                       |
| `source`           | enum?     | `local` \| `marketplace` (පෙරනිමිය `local`)                 |
| `tags`             | string[]? | සෙවුම් tags                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                             |
| `hooks`            | object?   | plugin එක ක්රියාත්මක කරන hooks මොනවාදැයි දක්වන Booleans     |
| `skills`           | object[]? | විකල්ප skill අර්ථදැක්වීම්                                   |
| `enabledByDefault` | boolean?  | ස්ථාපනයේදී ස්වයංක්රීයව සක්රිය කරයි                          |
| `configSchema`     | object?   | config fields සිතියම (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | විකල්ප `sha256-<base64>` entry-file pin එක                  |

අවසර ලබාගන්නේ පහත enum එකෙනි:
`network` / `file-read` / `file-write` / `env` / `exec`.

## ජීවන චක්ර ප්රවාහය

```
install (POST /api/plugins, මාර්ගය)
  → මැනිෆෙස්ටය ස්කෑන්/වලංගු කරන්න → තාවකාලික ප්රදේශයට පිටපත් කරන්න → main ගොනුව නාමාවලිය තුළ ඇති බව තහවුරු කරන්න
  → ~/.omniroute/plugins/<name> වෙත පරමාණුකව නැවත නම් කරන්න → DB පේළියක් ඇතුළත් කරන්න
  → onInstall ක්රියාත්මක කරන්න → enabledByDefault නම්: activate

activate (POST /api/plugins/{name}/activate)
  → realpath අන්තර්ගතතා පරීක්ෂාව → loadPlugin() (ළමා ක්රියාවලියක් ආරම්භ කරන්න)
  → ප්රකාශිත hooks ලියාපදිංචි කරන්න → status = "active" → onActivate ක්රියාත්මක කරන්න

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate ක්රියාත්මක කරන්න (ලියාපදිංචිය ඉවත් කිරීමට පෙර) → hooks ලියාපදිංචිය ඉවත් කරන්න
  → ළමා ක්රියාවලිය නවත්වන්න → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → සක්රිය නම් deactivate කරන්න → onUninstall ක්රියාත්මක කරන්න
  → අන්තර්ගතතාව පරීක්ෂා කර plugin නාමාවලිය පුනරාවර්තීව මකන්න → DB පේළිය මකන්න
```

ස්ථාපිත අනුවාදයට වඩා මැනිෆෙස්ට් අනුවාදය **නියත වශයෙන්
නව** නාමාවලියක් සඳහා `install` නැවත ධාවනය කිරීමෙන් ස්වයංක්රීයව උත්ශ්රේණි කෙරේ (පිරිසිදු නැවත ස්ථාපනයක්; වින්යාසය
පෙරනිමි අගයන්ට යළි සකසයි). සමාන හෝ පැරණි අනුවාදයක් ප්රතික්ෂේප කෙරේ.

## දත්ත සමුදාය

`plugins` වගුව (`076_create_plugins.sql` සංක්රමණය):

| තීරුව           | වර්ගය   | සටහන්                                            |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | අනන්ය                                            |
| `version`       | TEXT    | semver; පෙරනිමිය `1.0.0`                         |
| `description`   | TEXT    | විකල්ප                                           |
| `author`        | TEXT    | විකල්ප                                           |
| `license`       | TEXT    | පෙරනිමිය `MIT`                                   |
| `main`          | TEXT    | ප්රවේශ ගොනුව; පෙරනිමිය `index.js`                |
| `source`        | TEXT    | පෙරනිමිය `local`                                 |
| `tags`          | TEXT    | JSON අරාව; පෙරනිමිය `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; පෙරනිමිය 0                                  |
| `manifest`      | TEXT    | සම්පූර්ණ මැනිෆෙස්ට් JSON                         |
| `config`        | TEXT    | JSON; පෙරනිමිය `{}`                              |
| `config_schema` | TEXT    | JSON; පෙරනිමිය `{}`                              |
| `hooks`         | TEXT    | ප්රකාශිත hook නාමවල JSON අරාව; පෙරනිමිය `[]`     |
| `permissions`   | TEXT    | JSON අරාව; පෙරනිමිය `[]`                         |
| `plugin_dir`    | TEXT    | නිරපේක්ෂ ස්ථාපන නාමාවලිය                         |
| `error_message` | TEXT    | `status = "error"` වූ විට සකසනු ලැබේ             |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | සක්රිය කිරීමේදී සකසනු ලැබේ                       |

Plugin ප්රමිතික/විශ්ලේෂණ අමතර වගුවල
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`) නිරීක්ෂණය කෙරේ.

## උපකරණ පුවරුව

`/dashboard/plugins` හි ඇති උපකරණ පුවරු පිටුව
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) ටැබ් දෙකක් සපයයි:

- **ස්ථාපිත** — ස්ථාපිත plugins, ඒවායේ ප්රකාශිත hooks, activate/deactivate
  මාරුවක්, uninstall බොත්තමක් සහ "plugins සඳහා ස්කෑන් කරන්න"
  ක්රියාවක් (`POST /api/plugins/scan`) ලැයිස්තුගත කරයි.
- **වෙළඳපොළ** — අභිරුචි registry URL එක සැකසීමට ක්ෂේත්රයක් සමඟ
  `GET /api/plugins/marketplace` වෙතින් ලැබෙන නාමාවලිය පෙන්වයි.

එක් එක් plugin සඳහා වන වින්යාස පිටුව `/dashboard/plugins/[name]/config` හි
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`) පිහිටා ඇත.

## මෙයද බලන්න

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` ලූප්බැක් සඳහා පමණක් (Tier 1) වන්නේ ඇයි
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — අදාළ කුසලතා රාමුව
  (`src/lib/skills/`); ප්ලගීනවලට තම manifest එක තුළ කුසලතා ප්රකාශ කළ හැක
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — සිදුවීම් මත පදනම් වූ පිටතට යන
  ඒකාබද්ධ කිරීම්
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  සෑම ප්ලගීන route එකක්ම දෝෂ ප්රතිචාර සඳහා භාවිත කරන `buildErrorBody()` රටාව
