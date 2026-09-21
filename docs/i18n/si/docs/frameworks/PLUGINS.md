# OmniRoute CLI Plugin System (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` හි මූලික කොටස වෙනස් නොකර එහි CLI එක පුළුල් කරන්න. Plugins, `gh extension` හෝ `kubectl plugin` මෙන්, `omniroute-cmd-*` නම් කිරීමේ සම්මුතිය අනුගමනය කරයි.

## ඉක්මන් ආරම්භය

```bash
# npm වෙතින් plugin එකක් ස්ථාපනය කරන්න
omniroute plugin install stripe

# සංවර්ධනය කරමින් පවතින දේශීය plugin එකක් ස්ථාපනය කරන්න
omniroute plugin install ./my-plugin

# ස්ථාපනය කර ඇති plugins ලැයිස්තුගත කරන්න
omniroute plugin list

# නව plugin එකක් සඳහා සැකිල්ලක් සාදන්න
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Plugin එකක ව්යුහය

Plugin එකක් යනු `omniroute-cmd-<name>` (හෝ `@scope/omniroute-cmd-<name>`) ලෙස නම් කළ npm package එකකි.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" සහ "main": "index.mjs" අනිවාර්යයෙන් තිබිය යුතුය
├── index.mjs        # register(program, ctx) සහ විකල්ප meta export කරයි
└── README.md
```

### `package.json`

```json
{
  "name": "omniroute-cmd-myplugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.mjs",
  "engines": { "omniroute": ">=4.0.0" },
  "keywords": ["omniroute-plugin", "omniroute-cmd"]
}
```

### `index.mjs`

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "My plugin for OmniRoute",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

## Plugin context API

`register(program, ctx)` වෙත යවනු ලබන `ctx` object එක:

| ගුණාංගය                      | වර්ගය            | විස්තරය                                                              |
| ---------------------------- | ---------------- | -------------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute server එක වෙත සත්යාපිත fetch එකක්                          |
| `ctx.emit(data, opts)`       | `function`       | `--output` flag එක අනුව table/json/jsonl/csv ආකාරයෙන් ප්රතිදානය කරයි |
| `ctx.t(key)`                 | `async function` | i18n පරිවර්තන සෙවීම                                                  |
| `ctx.withSpinner(label, fn)` | `async function` | async fn එක ora spinner එකකින් ආවරණය කරයි                            |
| `ctx.baseUrl`                | `string`         | නිරාකරණය කළ මූලික URL එක                                             |
| `ctx.apiKey`                 | `string \| null` | ලබා දී ඇත්නම් API key එක                                             |

## සොයාගැනීම

Plugins පහත ස්ථානවලින් සොයාගනු ලැබේ:

1. `~/.omniroute/plugins/<name>/` — පරිශීලකයාට දේශීය ස්ථාපන
2. `OMNIROUTE_PLUGIN_PATH` env var — අභිරුචි directory එක

මේ දෙකම **CLI සඳහා පමණි**. Server-side plugin runtime එකට (proxy එක තුළ ධාවනය වන marketplace/`plugin.json`
plugins) තමන්ගේම override එකක් සහිත තමන්ගේම scanner එකක් ඇත,
`OMNIROUTE_PLUGINS_DIR` — බලන්න
[PLUGIN_MARKETPLACE.md → Plugin directory](./PLUGIN_MARKETPLACE.md#plugin-directory).
එකක් සැකසීම අනෙකට බලපාන්නේ නැත.

පූරණ දෝෂ හසුකර warnings ලෙස මුද්රණය කරනු ලැබේ — දෝෂ සහිත plugin එකක් කිසිවිටෙකත් CLI එක බිඳවැටීමට හේතු නොවේ.

## ආරක්ෂාව

Plugins ධාවනය වන්නේ `omniroute` සතු Node.js process privileges සමඟමය. ඔබ විශ්වාස කරන මූලාශ්රවලින් පමණක් plugins ස්ථාපනය කරන්න. `omniroute plugin install` පැහැදිලි warning එකක් පෙන්වන අතර `--yes` හෝ අන්තර්ක්රියාකාරී තහවුරු කිරීමක් අවශ්ය කරයි.

## ප්රකාශනය කිරීම

1. `package.json` හි `"keywords": ["omniroute-plugin"]` ඇති බව තහවුරු කරන්න
2. සාමාන්ය පරිදි `npm publish` ක්රියාත්මක කරන්න
3. පරිශීලකයන් `omniroute plugin search <query>` හරහා සොයාගනී (npm registry එක සොයයි)

## උදාහරණ plugin එකක්

`meta` + `register()` සහිත අවම ක්රියාකාරී උදාහරණයක් සඳහා [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) බලන්න.
