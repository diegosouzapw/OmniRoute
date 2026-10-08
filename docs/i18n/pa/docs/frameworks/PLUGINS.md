# OmniRoute CLI Plugin System (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` CLI ਨੂੰ ਇਸਦੇ ਕੋਰ ਵਿੱਚ ਕੋਈ ਤਬਦੀਲੀ ਕੀਤੇ ਬਿਨਾਂ ਵਿਸਤਾਰੋ। ਪਲੱਗਇਨ `omniroute-cmd-*` ਨਾਮਕਰਨ ਰੀਤ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹਨ, ਜੋ `gh extension` ਜਾਂ `kubectl plugin` ਵਰਗੀ ਹੈ।

## ਤੁਰੰਤ ਸ਼ੁਰੂਆਤ

```bash
# npm ਤੋਂ ਪਲੱਗਇਨ ਇੰਸਟਾਲ ਕਰੋ
omniroute plugin install stripe

# ਡਿਵੈਲਪਮੈਂਟ ਅਧੀਨ ਲੋਕਲ ਪਲੱਗਇਨ ਇੰਸਟਾਲ ਕਰੋ
omniroute plugin install ./my-plugin

# ਇੰਸਟਾਲ ਕੀਤੇ ਪਲੱਗਇਨਾਂ ਦੀ ਸੂਚੀ ਦਿਖਾਓ
omniroute plugin list

# ਨਵੇਂ ਪਲੱਗਇਨ ਲਈ ਢਾਂਚਾ ਤਿਆਰ ਕਰੋ
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## ਪਲੱਗਇਨ ਦੀ ਬਣਤਰ

ਪਲੱਗਇਨ `omniroute-cmd-<name>` (ਜਾਂ `@scope/omniroute-cmd-<name>`) ਨਾਮ ਵਾਲਾ ਇੱਕ npm ਪੈਕੇਜ ਹੁੰਦਾ ਹੈ।

```
omniroute-cmd-myplugin/
├── package.json     # ਇਸ ਵਿੱਚ "type": "module" ਅਤੇ "main": "index.mjs" ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ
├── index.mjs        # register(program, ctx) ਅਤੇ ਵਿਕਲਪਿਕ meta ਨੂੰ ਐਕਸਪੋਰਟ ਕਰਦੀ ਹੈ
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
  description: "OmniRoute ਲਈ ਮੇਰਾ ਪਲੱਗਇਨ",
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

## ਪਲੱਗਇਨ ਕਾਂਟੈਕਸਟ API

`register(program, ctx)` ਨੂੰ ਪਾਸ ਕੀਤਾ ਜਾਣ ਵਾਲਾ `ctx` ਆਬਜੈਕਟ:

| ਵਿਸ਼ੇਸ਼ਤਾ                    | ਕਿਸਮ             | ਵੇਰਵਾ                                                    |
| ---------------------------- | ---------------- | -------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute ਸਰਵਰ ਲਈ ਪ੍ਰਮਾਣਿਤ ਫੈਚ                           |
| `ctx.emit(data, opts)`       | `function`       | `--output` ਫਲੈਗ ਮੁਤਾਬਕ table/json/jsonl/csv ਵਿੱਚ ਆਉਟਪੁੱਟ |
| `ctx.t(key)`                 | `async function` | i18n ਅਨੁਵਾਦ ਲੁੱਕਅੱਪ                                      |
| `ctx.withSpinner(label, fn)` | `async function` | async fn ਨੂੰ ora ਸਪਿਨਰ ਨਾਲ ਰੈਪ ਕਰਦਾ ਹੈ                   |
| `ctx.baseUrl`                | `string`         | ਨਿਰਧਾਰਤ ਕੀਤਾ ਬੇਸ URL                                     |
| `ctx.apiKey`                 | `string \| null` | ਜੇ ਪ੍ਰਦਾਨ ਕੀਤੀ ਗਈ ਹੋਵੇ ਤਾਂ API ਕੁੰਜੀ                     |

## ਖੋਜ

ਪਲੱਗਇਨ ਇਨ੍ਹਾਂ ਥਾਵਾਂ ਤੋਂ ਖੋਜੇ ਜਾਂਦੇ ਹਨ:

1. `~/.omniroute/plugins/<name>/` — ਯੂਜ਼ਰ-ਲੋਕਲ ਇੰਸਟਾਲੇਸ਼ਨਾਂ
2. `OMNIROUTE_PLUGIN_PATH` env var — ਕਸਟਮ ਡਾਇਰੈਕਟਰੀ

ਦੋਵੇਂ **ਸਿਰਫ਼ CLI ਲਈ** ਹਨ। ਸਰਵਰ-ਸਾਈਡ ਪਲੱਗਇਨ ਰਨਟਾਈਮ (ਮਾਰਕੀਟਪਲੇਸ/`plugin.json`
ਪਲੱਗਇਨ, ਜੋ ਪ੍ਰੌਕਸੀ ਦੇ ਅੰਦਰ ਚੱਲਦੇ ਹਨ) ਦਾ ਆਪਣਾ ਸਕੈਨਰ ਅਤੇ ਆਪਣਾ ਓਵਰਰਾਈਡ,
`OMNIROUTE_PLUGINS_DIR` ਹੈ — ਵੇਖੋ
[PLUGIN_MARKETPLACE.md → ਪਲੱਗਇਨ ਡਾਇਰੈਕਟਰੀ](./PLUGIN_MARKETPLACE.md#plugin-directory)।
ਇੱਕ ਨੂੰ ਸੈੱਟ ਕਰਨ ਨਾਲ ਦੂਜੇ 'ਤੇ ਕੋਈ ਅਸਰ ਨਹੀਂ ਪੈਂਦਾ।

ਲੋਡਿੰਗ ਗਲਤੀਆਂ ਨੂੰ ਫੜ ਕੇ ਚੇਤਾਵਨੀਆਂ ਵਜੋਂ ਪ੍ਰਿੰਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ — ਖਰਾਬ ਪਲੱਗਇਨ ਕਦੇ ਵੀ CLI ਨੂੰ ਕਰੈਸ਼ ਨਹੀਂ ਕਰਦਾ।

## ਸੁਰੱਖਿਆ

ਪਲੱਗਇਨ ਉਸੇ Node.js ਪ੍ਰਕਿਰਿਆ ਦੇ ਅਧਿਕਾਰਾਂ ਨਾਲ ਚੱਲਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਨਾਲ `omniroute` ਚੱਲਦਾ ਹੈ। ਸਿਰਫ਼ ਭਰੋਸੇਯੋਗ ਸਰੋਤਾਂ ਤੋਂ ਪਲੱਗਇਨ ਇੰਸਟਾਲ ਕਰੋ। `omniroute plugin install` ਇੱਕ ਸਪਸ਼ਟ ਚੇਤਾਵਨੀ ਦਿਖਾਉਂਦਾ ਹੈ ਅਤੇ `--yes` ਜਾਂ ਇੰਟਰਐਕਟਿਵ ਪੁਸ਼ਟੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।

## ਪ੍ਰਕਾਸ਼ਨ

1. ਯਕੀਨੀ ਬਣਾਓ ਕਿ `package.json` ਵਿੱਚ `"keywords": ["omniroute-plugin"]` ਮੌਜੂਦ ਹੈ
2. ਆਮ ਵਾਂਗ `npm publish` ਕਰੋ
3. ਯੂਜ਼ਰ `omniroute plugin search <query>` ਰਾਹੀਂ ਖੋਜਦੇ ਹਨ (npm ਰਜਿਸਟਰੀ ਵਿੱਚ ਖੋਜ ਕਰਦਾ ਹੈ)

## ਉਦਾਹਰਨ ਪਲੱਗਇਨ

`meta` + `register()` ਵਾਲੀ ਘੱਟੋ-ਘੱਟ ਕਾਰਜਸ਼ੀਲ ਉਦਾਹਰਨ ਲਈ [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) ਵੇਖੋ।
