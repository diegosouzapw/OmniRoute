# OmniRoute CLI Plugin System (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` CLI ಅನ್ನು ಅದರ ಕೋರ್ ಅನ್ನು ಮಾರ್ಪಡಿಸದೆ ವಿಸ್ತರಿಸಿ. `gh extension` ಅಥವಾ `kubectl plugin` ಅನ್ನು ಹೋಲುವಂತೆ, ಪ್ಲಗಿನ್ಗಳು `omniroute-cmd-*` ನಾಮಕರಣ ಪದ್ಧತಿಯನ್ನು ಅನುಸರಿಸುತ್ತವೆ.

## ತ್ವರಿತ ಪ್ರಾರಂಭ

```bash
# npm ನಿಂದ ಪ್ಲಗಿನ್ ಸ್ಥಾಪಿಸಿ
omniroute plugin install stripe

# ಅಭಿವೃದ್ಧಿಯಲ್ಲಿರುವ ಸ್ಥಳೀಯ ಪ್ಲಗಿನ್ ಸ್ಥಾಪಿಸಿ
omniroute plugin install ./my-plugin

# ಸ್ಥಾಪಿಸಲಾದ ಪ್ಲಗಿನ್ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ
omniroute plugin list

# ಹೊಸ ಪ್ಲಗಿನ್ನ ಮೂಲರಚನೆಯನ್ನು ರಚಿಸಿ
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## ಪ್ಲಗಿನ್ನ ರಚನೆ

ಪ್ಲಗಿನ್ ಎಂದರೆ `omniroute-cmd-<name>` (ಅಥವಾ `@scope/omniroute-cmd-<name>`) ಎಂಬ ಹೆಸರಿನ npm ಪ್ಯಾಕೇಜ್.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" ಮತ್ತು "main": "index.mjs" ಇರಲೇಬೇಕು
├── index.mjs        # register(program, ctx) ಮತ್ತು ಐಚ್ಛಿಕ meta ಅನ್ನು ರಫ್ತು ಮಾಡುತ್ತದೆ
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
  description: "OmniRoute ಗಾಗಿ ನನ್ನ ಪ್ಲಗಿನ್",
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

## ಪ್ಲಗಿನ್ ಸಂದರ್ಭ API

`register(program, ctx)` ಗೆ ರವಾನಿಸಲಾದ `ctx` ಆಬ್ಜೆಕ್ಟ್:

| ಗುಣಲಕ್ಷಣ                     | ಪ್ರಕಾರ           | ವಿವರಣೆ                                                        |
| ---------------------------- | ---------------- | ------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute ಸರ್ವರ್ಗೆ ದೃಢೀಕೃತ fetch                              |
| `ctx.emit(data, opts)`       | `function`       | `--output` ಫ್ಲ್ಯಾಗ್ಗೆ ಅನುಗುಣವಾಗಿ table/json/jsonl/csv ಔಟ್ಪುಟ್ |
| `ctx.t(key)`                 | `async function` | i18n ಅನುವಾದ ಹುಡುಕಾಟ                                           |
| `ctx.withSpinner(label, fn)` | `async function` | async fn ಅನ್ನು ora spinner ಮೂಲಕ ಆವರಿಸುತ್ತದೆ                   |
| `ctx.baseUrl`                | `string`         | ಪರಿಹರಿಸಲಾದ ಮೂಲ URL                                            |
| `ctx.apiKey`                 | `string \| null` | ಒದಗಿಸಿದ್ದರೆ API ಕೀ                                            |

## ಪತ್ತೆಹಚ್ಚುವಿಕೆ

ಪ್ಲಗಿನ್ಗಳನ್ನು ಈ ಸ್ಥಳಗಳಿಂದ ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತದೆ:

1. `~/.omniroute/plugins/<name>/` — ಬಳಕೆದಾರರ ಸ್ಥಳೀಯ ಸ್ಥಾಪನೆಗಳು
2. `OMNIROUTE_PLUGIN_PATH` env var — ಕಸ್ಟಮ್ ಡೈರೆಕ್ಟರಿ

ಇವೆರಡೂ **CLIಗೆ ಮಾತ್ರ** ಅನ್ವಯಿಸುತ್ತವೆ. ಸರ್ವರ್-ಬದಿಯ ಪ್ಲಗಿನ್ ರನ್ಟೈಮ್ (ಪ್ರಾಕ್ಸಿಯೊಳಗೆ ಚಲಿಸುವ marketplace/`plugin.json`
ಪ್ಲಗಿನ್ಗಳು) ತನ್ನದೇ ಸ್ಕ್ಯಾನರ್ ಮತ್ತು ತನ್ನದೇ ಓವರ್ರೈಡ್
`OMNIROUTE_PLUGINS_DIR` ಅನ್ನು ಹೊಂದಿದೆ — ನೋಡಿ
[PLUGIN_MARKETPLACE.md → ಪ್ಲಗಿನ್ ಡೈರೆಕ್ಟರಿ](./PLUGIN_MARKETPLACE.md#plugin-directory).
ಒಂದನ್ನು ಹೊಂದಿಸುವುದರಿಂದ ಇನ್ನೊಂದರ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.

ಲೋಡ್ ಮಾಡುವಾಗ ಉಂಟಾಗುವ ದೋಷಗಳನ್ನು ಹಿಡಿದು ಎಚ್ಚರಿಕೆಗಳಾಗಿ ಮುದ್ರಿಸಲಾಗುತ್ತದೆ — ದೋಷಪೂರಿತ ಪ್ಲಗಿನ್ ಎಂದಿಗೂ CLI ಅನ್ನು ಕ್ರ್ಯಾಶ್ ಮಾಡುವುದಿಲ್ಲ.

## ಭದ್ರತೆ

ಪ್ಲಗಿನ್ಗಳು `omniroute` ಹೊಂದಿರುವ ಅದೇ Node.js ಪ್ರಕ್ರಿಯೆಯ ಸವಲತ್ತುಗಳೊಂದಿಗೆ ಚಲಿಸುತ್ತವೆ. ನೀವು ನಂಬುವ ಮೂಲಗಳಿಂದ ಮಾತ್ರ ಪ್ಲಗಿನ್ಗಳನ್ನು ಸ್ಥಾಪಿಸಿ. `omniroute plugin install` ಸ್ಪಷ್ಟ ಎಚ್ಚರಿಕೆಯನ್ನು ತೋರಿಸುತ್ತದೆ ಮತ್ತು `--yes` ಅಥವಾ ಸಂವಾದಾತ್ಮಕ ದೃಢೀಕರಣವನ್ನು ಅಗತ್ಯಪಡಿಸುತ್ತದೆ.

## ಪ್ರಕಟಿಸುವಿಕೆ

1. `package.json` ನಲ್ಲಿ `"keywords": ["omniroute-plugin"]` ಇರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
2. ಎಂದಿನಂತೆ `npm publish` ಚಲಾಯಿಸಿ
3. ಬಳಕೆದಾರರು `omniroute plugin search <query>` ಮೂಲಕ ಪತ್ತೆಹಚ್ಚಬಹುದು (npm registry ಅನ್ನು ಹುಡುಕುತ್ತದೆ)

## ಉದಾಹರಣೆ ಪ್ಲಗಿನ್

`meta` + `register()` ಒಳಗೊಂಡ ಕನಿಷ್ಠ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಉದಾಹರಣೆಗಾಗಿ [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) ನೋಡಿ.
