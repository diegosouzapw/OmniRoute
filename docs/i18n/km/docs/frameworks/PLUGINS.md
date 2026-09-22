# OmniRoute CLI Plugin System (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

ពង្រីក `omniroute` CLI ដោយមិនកែប្រែស្នូលរបស់វា។ កម្មវិធីជំនួយអនុវត្តតាមអនុសញ្ញាដាក់ឈ្មោះ `omniroute-cmd-*` ដែលស្រដៀងនឹង `gh extension` ឬ `kubectl plugin`។

## ចាប់ផ្តើមរហ័ស

```bash
# ដំឡើងកម្មវិធីជំនួយពី npm
omniroute plugin install stripe

# ដំឡើងកម្មវិធីជំនួយមូលដ្ឋានដែលកំពុងអភិវឌ្ឍ
omniroute plugin install ./my-plugin

# រាយកម្មវិធីជំនួយដែលបានដំឡើង
omniroute plugin list

# បង្កើតគ្រោងកម្មវិធីជំនួយថ្មី
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## រចនាសម្ព័ន្ធកម្មវិធីជំនួយ

កម្មវិធីជំនួយគឺជាកញ្ចប់ npm ដែលមានឈ្មោះ `omniroute-cmd-<name>` (ឬ `@scope/omniroute-cmd-<name>`)។

```
omniroute-cmd-myplugin/
├── package.json     # ត្រូវតែមាន "type": "module" និង "main": "index.mjs"
├── index.mjs        # នាំចេញ register(program, ctx) + meta ជាជម្រើស
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
  description: "កម្មវិធីជំនួយរបស់ខ្ញុំសម្រាប់ OmniRoute",
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

## API បរិបទកម្មវិធីជំនួយ

វត្ថុ `ctx` ដែលត្រូវបានបញ្ជូនទៅ `register(program, ctx)`៖

| លក្ខណសម្បត្តិ                | ប្រភេទ           | ការពិពណ៌នា                                                      |
| ---------------------------- | ---------------- | --------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | ទាញយកដោយមានការផ្ទៀងផ្ទាត់អត្តសញ្ញាណទៅកាន់ម៉ាស៊ីនបម្រើ OmniRoute |
| `ctx.emit(data, opts)`       | `function`       | បញ្ចេញទិន្នន័យជា table/json/jsonl/csv ស្របតាមជម្រើស `--output`  |
| `ctx.t(key)`                 | `async function` | ស្វែងរកការបកប្រែ i18n                                           |
| `ctx.withSpinner(label, fn)` | `async function` | រុំ fn អសមកាលដោយ ora spinner                                    |
| `ctx.baseUrl`                | `string`         | URL មូលដ្ឋានដែលបានកំណត់                                         |
| `ctx.apiKey`                 | `string \| null` | សោ API ប្រសិនបើបានផ្តល់                                         |

## ការស្វែងរក

កម្មវិធីជំនួយត្រូវបានស្វែងរកពី៖

1. `~/.omniroute/plugins/<name>/` — ការដំឡើងសម្រាប់អ្នកប្រើមូលដ្ឋាន
2. អថេរបរិស្ថាន `OMNIROUTE_PLUGIN_PATH` — ថតផ្ទាល់ខ្លួន

ទាំងពីរនេះគឺសម្រាប់តែ **CLI ប៉ុណ្ណោះ**។ runtime កម្មវិធីជំនួយខាងម៉ាស៊ីនបម្រើ (កម្មវិធីជំនួយ marketplace/`plugin.json`
ដែលដំណើរការនៅខាងក្នុង proxy) មាន scanner និងការកំណត់ជំនួសផ្ទាល់ខ្លួនរបស់វា គឺ
`OMNIROUTE_PLUGINS_DIR` — សូមមើល
[PLUGIN_MARKETPLACE.md → ថតកម្មវិធីជំនួយ](./PLUGIN_MARKETPLACE.md#plugin-directory)។
ការកំណត់មួយមិនប៉ះពាល់ដល់មួយទៀតទេ។

កំហុសក្នុងការផ្ទុកត្រូវបានចាប់យក និងបោះពុម្ពជាការព្រមាន — កម្មវិធីជំនួយដែលខូចនឹងមិនធ្វើឱ្យ CLI គាំងឡើយ។

## សុវត្ថិភាព

កម្មវិធីជំនួយដំណើរការដោយមានសិទ្ធិ process របស់ Node.js ដូចគ្នានឹង `omniroute`។ ដំឡើងតែកម្មវិធីជំនួយពីប្រភពដែលអ្នកទុកចិត្តប៉ុណ្ណោះ។ `omniroute plugin install` បង្ហាញការព្រមានយ៉ាងច្បាស់ និងតម្រូវឱ្យប្រើ `--yes` ឬការបញ្ជាក់តាមអន្តរកម្ម។

## ការបោះពុម្ពផ្សាយ

1. ត្រូវប្រាកដថា `package.json` មាន `"keywords": ["omniroute-plugin"]`
2. ប្រើ `npm publish` ដូចធម្មតា
3. អ្នកប្រើអាចស្វែងរកតាមរយៈ `omniroute plugin search <query>` (ស្វែងរកក្នុង npm registry)

## កម្មវិធីជំនួយគំរូ

សូមមើល [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) សម្រាប់ឧទាហរណ៍ដំណើរការអប្បបរមាដែលមាន `meta` + `register()`។
