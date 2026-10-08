# OmniRoute CLI Plugin System (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

የ`omniroute` ዋና ክፍልን ሳያሻሽሉ CLI-ውን ያስፋፉ። ፕለጊኖች ከ`gh extension` ወይም `kubectl plugin` ጋር በሚመሳሰል መልኩ የ`omniroute-cmd-*` ስያሜ ስምምነትን ይከተላሉ።

## ፈጣን አጀማመር

```bash
# ፕለጊንን ከ-npm ይጫኑ
omniroute plugin install stripe

# በልማት ላይ ያለ አካባቢያዊ ፕለጊን ይጫኑ
omniroute plugin install ./my-plugin

# የተጫኑ ፕለጊኖችን ይዘርዝሩ
omniroute plugin list

# አዲስ ፕለጊን መሠረታዊ መዋቅር ይፍጠሩ
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## የፕለጊን አወቃቀር

ፕለጊን `omniroute-cmd-<name>` (ወይም `@scope/omniroute-cmd-<name>`) የተሰኘ npm ፓኬጅ ነው።

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" እና "main": "index.mjs" ሊኖሩት ይገባል
├── index.mjs        # register(program, ctx) እና አማራጭ metaን ይልካል
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

## የፕለጊን አውድ API

ወደ `register(program, ctx)` የሚተላለፈው `ctx` ኦብጀክት፦

| ባህሪ                          | ዓይነት             | መግለጫ                                                 |
| ---------------------------- | ---------------- | ---------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | ወደ OmniRoute ሰርቨር ማንነት የተረጋገጠ fetch                  |
| `ctx.emit(data, opts)`       | `function`       | በ`--output` ፍላግ መሠረት በtable/json/jsonl/csv ውጤት ያቀርባል |
| `ctx.t(key)`                 | `async function` | የi18n ትርጉም ፍለጋ                                       |
| `ctx.withSpinner(label, fn)` | `async function` | async fnን በora spinner ይከብባል                         |
| `ctx.baseUrl`                | `string`         | የተወሰነው መሠረታዊ URL                                     |
| `ctx.apiKey`                 | `string \| null` | ከቀረበ API key                                         |

## ማግኘት

ፕለጊኖች ከሚከተሉት ቦታዎች ይገኛሉ፦

1. `~/.omniroute/plugins/<name>/` — የተጠቃሚ-አካባቢያዊ ጭነቶች
2. `OMNIROUTE_PLUGIN_PATH` env var — ብጁ ማውጫ

ሁለቱም **ለCLI ብቻ** ናቸው። የሰርቨር-ወገን ፕለጊን runtime (በproxy ውስጥ የሚሰሩት marketplace/`plugin.json`
ፕለጊኖች) የራሱ መቃኛ እና የራሱ override የሆነው
`OMNIROUTE_PLUGINS_DIR` አለው —
[PLUGIN_MARKETPLACE.md → የፕለጊን ማውጫ](./PLUGIN_MARKETPLACE.md#plugin-directory)ን ይመልከቱ።
አንዱን ማዋቀር በሌላው ላይ ተጽዕኖ አያሳድርም።

የመጫን ስህተቶች ተይዘው እንደ ማስጠንቀቂያዎች ይታተማሉ — የተበላሸ ፕለጊን CLI-ውን ፈጽሞ አያበላሽም።

## ደህንነት

ፕለጊኖች ከ`omniroute` ጋር በተመሳሳይ የNode.js ፕሮሰስ ፈቃዶች ይሰራሉ። ፕለጊኖችን ከሚያምኗቸው ምንጮች ብቻ ይጫኑ። `omniroute plugin install` ግልጽ ማስጠንቀቂያ ያሳያል፣ እንዲሁም `--yes` ወይም በይነተገናኝ ማረጋገጫ ይጠይቃል።

## ማተም

1. `package.json` `"keywords": ["omniroute-plugin"]` እንዳለው ያረጋግጡ
2. እንደተለመደው `npm publish` ያድርጉ
3. ተጠቃሚዎች `omniroute plugin search <query>`ን በመጠቀም ያገኙታል (የnpm registryን ይፈልጋል)

## የፕለጊን ምሳሌ

`meta` + `register()` ያለውን አነስተኛ የሚሰራ ምሳሌ ለማየት [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs)ን ይመልከቱ።
