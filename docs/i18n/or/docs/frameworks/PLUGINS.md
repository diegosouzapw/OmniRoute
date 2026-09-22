# OmniRoute CLI Plugin System (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

ମୂଳ କୋଡ୍କୁ ପରିବର୍ତ୍ତନ ନକରି `omniroute` CLI-କୁ ବିସ୍ତାର କରନ୍ତୁ। ପ୍ଲଗିନ୍ଗୁଡ଼ିକ `gh extension` କିମ୍ବା `kubectl plugin` ପରି `omniroute-cmd-*` ନାମକରଣ ପରମ୍ପରା ଅନୁସରଣ କରନ୍ତି।

## ଶୀଘ୍ର ଆରମ୍ଭ

```bash
# npm-ରୁ ଏକ ପ୍ଲଗିନ୍ ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ
omniroute plugin install stripe

# ଡେଭଲପମେଣ୍ଟରେ ଏକ ସ୍ଥାନୀୟ ପ୍ଲଗିନ୍ ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ
omniroute plugin install ./my-plugin

# ଇନ୍ଷ୍ଟଲ୍ ହୋଇଥିବା ପ୍ଲଗିନ୍ଗୁଡ଼ିକର ତାଲିକା ଦେଖନ୍ତୁ
omniroute plugin list

# ଏକ ନୂଆ ପ୍ଲଗିନ୍ର ଢାଞ୍ଚା ତିଆରି କରନ୍ତୁ
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## ପ୍ଲଗିନ୍ର ଗଠନ

ଏକ ପ୍ଲଗିନ୍ ହେଉଛି `omniroute-cmd-<name>` (କିମ୍ବା `@scope/omniroute-cmd-<name>`) ନାମକ ଏକ npm ପ୍ୟାକେଜ୍।

```
omniroute-cmd-myplugin/
├── package.json     # ଏଥିରେ "type": "module" ଏବଂ "main": "index.mjs" ଥିବା ଆବଶ୍ୟକ
├── index.mjs        # register(program, ctx) + ଇଚ୍ଛାଧୀନ meta ଏକ୍ସପୋର୍ଟ କରେ
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

## ପ୍ଲଗିନ୍ କଣ୍ଟେକ୍ସ୍ଟ API

`register(program, ctx)`-କୁ ପାସ୍ କରାଯାଉଥିବା `ctx` ଅବଜେକ୍ଟ:

| ଗୁଣଧର୍ମ                      | ପ୍ରକାର           | ବର୍ଣ୍ଣନା                                               |
| ---------------------------- | ---------------- | ------------------------------------------------------ |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute ସର୍ଭରକୁ ପ୍ରମାଣିତ fetch                       |
| `ctx.emit(data, opts)`       | `function`       | `--output` ଫ୍ଲାଗ୍ ଅନୁଯାୟୀ table/json/jsonl/csv ଆଉଟପୁଟ୍ |
| `ctx.t(key)`                 | `async function` | i18n ଅନୁବାଦ ସନ୍ଧାନ                                     |
| `ctx.withSpinner(label, fn)` | `async function` | async fn-କୁ ora spinner ସହିତ ଆବୃତ କରେ                  |
| `ctx.baseUrl`                | `string`         | ସମାଧାନ କରାଯାଇଥିବା ମୂଳ URL                              |
| `ctx.apiKey`                 | `string \| null` | ପ୍ରଦାନ କରାଯାଇଥିଲେ API କୀ                               |

## ଆବିଷ୍କାର

ପ୍ଲଗିନ୍ଗୁଡ଼ିକୁ ନିମ୍ନ ସ୍ଥାନଗୁଡ଼ିକରୁ ଖୋଜାଯାଏ:

1. `~/.omniroute/plugins/<name>/` — ବ୍ୟବହାରକାରୀଙ୍କ ସ୍ଥାନୀୟ ଇନ୍ଷ୍ଟଲେସନ୍
2. `OMNIROUTE_PLUGIN_PATH` env var — କଷ୍ଟମ୍ ଡିରେକ୍ଟୋରୀ

ଉଭୟ **କେବଳ CLI ପାଇଁ**। ସର୍ଭର-ପାର୍ଶ୍ୱ ପ୍ଲଗିନ୍ ରନ୍ଟାଇମ୍ (ପ୍ରକ୍ସି ଭିତରେ ଚାଲୁଥିବା marketplace/`plugin.json`
ପ୍ଲଗିନ୍ଗୁଡ଼ିକ) ପାଇଁ ନିଜସ୍ୱ ଓଭର୍ରାଇଡ୍ ସହିତ ଏକ ପୃଥକ ସ୍କାନର୍ ରହିଛି,
`OMNIROUTE_PLUGINS_DIR` — ଦେଖନ୍ତୁ
[PLUGIN_MARKETPLACE.md → ପ୍ଲଗିନ୍ ଡିରେକ୍ଟୋରୀ](./PLUGIN_MARKETPLACE.md#plugin-directory)।
ଗୋଟିଏକୁ ସେଟ୍ କରିବା ଦ୍ୱାରା ଅନ୍ୟଟି ପ୍ରଭାବିତ ହୁଏ ନାହିଁ।

ଲୋଡିଂ ତ୍ରୁଟିଗୁଡ଼ିକୁ ଧରାଯାଇ ଚେତାବନୀ ଭାବେ ଦେଖାଯାଏ — ଏକ ତ୍ରୁଟିପୂର୍ଣ୍ଣ ପ୍ଲଗିନ୍ କେବେ ମଧ୍ୟ CLI-କୁ କ୍ରାଶ୍ କରେ ନାହିଁ।

## ସୁରକ୍ଷା

ପ୍ଲଗିନ୍ଗୁଡ଼ିକ `omniroute` ସହିତ ସମାନ Node.js ପ୍ରୋସେସ୍ ଅଧିକାରରେ ଚାଲେ। କେବଳ ଆପଣ ବିଶ୍ୱାସ କରୁଥିବା ଉତ୍ସରୁ ପ୍ଲଗିନ୍ ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ। `omniroute plugin install` ଏକ ସ୍ପଷ୍ଟ ଚେତାବନୀ ଦେଖାଏ ଏବଂ `--yes` କିମ୍ବା ଇଣ୍ଟରାକ୍ଟିଭ୍ ନିଶ୍ଚିତକରଣ ଆବଶ୍ୟକ କରେ।

## ପ୍ରକାଶନ

1. `package.json`-ରେ `"keywords": ["omniroute-plugin"]` ଥିବା ସୁନିଶ୍ଚିତ କରନ୍ତୁ
2. ସାଧାରଣ ଭାବରେ `npm publish` ଚଲାନ୍ତୁ
3. ବ୍ୟବହାରକାରୀମାନେ `omniroute plugin search <query>` ମାଧ୍ୟମରେ ଖୋଜନ୍ତି (npm registry-ରେ ସନ୍ଧାନ କରେ)

## ଉଦାହରଣ ପ୍ଲଗିନ୍

`meta` + `register()` ସହିତ ଏକ ସର୍ବନିମ୍ନ କାର୍ଯ୍ୟକ୍ଷମ ଉଦାହରଣ ପାଇଁ [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) ଦେଖନ୍ତୁ।
