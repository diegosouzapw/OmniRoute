# OmniRoute CLI Plugin System (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute`-ന്റെ കോർ പരിഷ്കരിക്കാതെ തന്നെ CLI വിപുലീകരിക്കുക. `gh extension` അല്ലെങ്കിൽ `kubectl plugin` എന്നിവയ്ക്ക് സമാനമായി, പ്ലഗിനുകൾ `omniroute-cmd-*` നാമകരണരീതി പിന്തുടരുന്നു.

## ദ്രുതാരംഭം

```bash
# npm-ൽ നിന്ന് ഒരു പ്ലഗിൻ ഇൻസ്റ്റാൾ ചെയ്യുക
omniroute plugin install stripe

# വികസനത്തിലുള്ള ഒരു ലോക്കൽ പ്ലഗിൻ ഇൻസ്റ്റാൾ ചെയ്യുക
omniroute plugin install ./my-plugin

# ഇൻസ്റ്റാൾ ചെയ്ത പ്ലഗിനുകൾ പട്ടികപ്പെടുത്തുക
omniroute plugin list

# ഒരു പുതിയ പ്ലഗിന്റെ അടിസ്ഥാനഘടന സൃഷ്ടിക്കുക
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## പ്ലഗിന്റെ ഘടന

പ്ലഗിൻ എന്നത് `omniroute-cmd-<name>` (അല്ലെങ്കിൽ `@scope/omniroute-cmd-<name>`) എന്ന് പേരുള്ള ഒരു npm പാക്കേജാണ്.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module", "main": "index.mjs" എന്നിവ ഉണ്ടായിരിക്കണം
├── index.mjs        # register(program, ctx), കൂടാതെ ഐച്ഛികമായ meta എന്നിവ എക്സ്പോർട്ട് ചെയ്യുന്നു
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
  description: "OmniRoute-നുള്ള എന്റെ പ്ലഗിൻ",
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

## പ്ലഗിൻ കോൺടെക്സ്റ്റ് API

`register(program, ctx)`-ലേക്ക് കൈമാറുന്ന `ctx` ഒബ്ജക്റ്റ്:

| പ്രോപ്പർട്ടി                 | തരം              | വിവരണം                                                        |
| ---------------------------- | ---------------- | ------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute സെർവറിലേക്കുള്ള പ്രാമാണീകരിച്ച fetch                |
| `ctx.emit(data, opts)`       | `function`       | `--output` ഫ്ലാഗ് അനുസരിച്ച് table/json/jsonl/csv ഔട്ട്പുട്ട് |
| `ctx.t(key)`                 | `async function` | i18n പരിഭാഷ തിരയൽ                                             |
| `ctx.withSpinner(label, fn)` | `async function` | async fn-നെ ora spinner ഉപയോഗിച്ച് പൊതിയുന്നു                 |
| `ctx.baseUrl`                | `string`         | പരിഹരിച്ച base URL                                            |
| `ctx.apiKey`                 | `string \| null` | നൽകിയിട്ടുണ്ടെങ്കിൽ API key                                   |

## കണ്ടെത്തൽ

പ്ലഗിനുകൾ ഇനിപ്പറയുന്ന ഇടങ്ങളിൽ നിന്ന് കണ്ടെത്തുന്നു:

1. `~/.omniroute/plugins/<name>/` — ഉപയോക്താവിന്റെ ലോക്കൽ ഇൻസ്റ്റാളുകൾ
2. `OMNIROUTE_PLUGIN_PATH` env var — ഇഷ്ടാനുസൃത ഡയറക്ടറി

ഇവ രണ്ടും **CLI-ക്കായി മാത്രം** ഉള്ളവയാണ്. സെർവർ-സൈഡ് പ്ലഗിൻ റൺടൈമിന് (പ്രോക്സിക്കുള്ളിൽ പ്രവർത്തിക്കുന്ന marketplace/`plugin.json`
പ്ലഗിനുകൾ) അതിന്റേതായ സ്കാനറും അതിന്റേതായ ഓവർറൈഡായ
`OMNIROUTE_PLUGINS_DIR`-ഉം ഉണ്ട് — കാണുക:
[PLUGIN_MARKETPLACE.md → പ്ലഗിൻ ഡയറക്ടറി](./PLUGIN_MARKETPLACE.md#plugin-directory).
ഒന്ന് സജ്ജീകരിക്കുന്നത് മറ്റൊന്നിനെ ബാധിക്കില്ല.

ലോഡിങ് പിശകുകൾ പിടിച്ചെടുത്ത് മുന്നറിയിപ്പുകളായി പ്രിന്റ് ചെയ്യുന്നു — തകരാറുള്ള ഒരു പ്ലഗിൻ ഒരിക്കലും CLI ക്രാഷ് ചെയ്യിക്കില്ല.

## സുരക്ഷ

പ്ലഗിനുകൾ `omniroute`-ന്റെ അതേ Node.js പ്രോസസ് അനുമതികളോടെയാണ് പ്രവർത്തിക്കുന്നത്. നിങ്ങൾ വിശ്വസിക്കുന്ന ഉറവിടങ്ങളിൽ നിന്നുള്ള പ്ലഗിനുകൾ മാത്രം ഇൻസ്റ്റാൾ ചെയ്യുക. `omniroute plugin install` വ്യക്തമായ ഒരു മുന്നറിയിപ്പ് കാണിക്കുകയും `--yes` അല്ലെങ്കിൽ ഇന്ററാക്ടീവ് സ്ഥിരീകരണം ആവശ്യപ്പെടുകയും ചെയ്യുന്നു.

## പ്രസിദ്ധീകരിക്കൽ

1. `package.json`-ൽ `"keywords": ["omniroute-plugin"]` ഉണ്ടെന്ന് ഉറപ്പാക്കുക
2. സാധാരണ പോലെ `npm publish` ചെയ്യുക
3. ഉപയോക്താക്കൾക്ക് `omniroute plugin search <query>` വഴി കണ്ടെത്താം (npm registry-യിൽ തിരയുന്നു)

## ഉദാഹരണ പ്ലഗിൻ

`meta` + `register()` എന്നിവയുള്ള ഏറ്റവും കുറഞ്ഞ പ്രവർത്തനക്ഷമമായ ഉദാഹരണത്തിനായി [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) കാണുക.
