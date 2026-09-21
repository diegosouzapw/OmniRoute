# OmniRoute CLI Plugin System (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Ընդլայնեք `omniroute` CLI-ը՝ առանց դրա միջուկը փոփոխելու։ Փլագինները հետևում են `omniroute-cmd-*` անվանման ձևաչափին՝ `gh extension`-ի կամ `kubectl plugin`-ի նման։

## Արագ մեկնարկ

```bash
# Տեղադրել փլագին npm-ից
omniroute plugin install stripe

# Տեղադրել մշակման փուլում գտնվող տեղային փլագին
omniroute plugin install ./my-plugin

# Ցուցադրել տեղադրված փլագինները
omniroute plugin list

# Ստեղծել նոր փլագինի սկզբնական կառուցվածքը
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Փլագինի կառուցվածքը

Փլագինը `omniroute-cmd-<name>` (կամ `@scope/omniroute-cmd-<name>`) անունով npm փաթեթ է։

```
omniroute-cmd-myplugin/
├── package.json     # պետք է պարունակի "type": "module" և "main": "index.mjs"
├── index.mjs        # արտահանում է register(program, ctx) և ոչ պարտադիր meta
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
  description: "Իմ փլագինը OmniRoute-ի համար",
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

## Փլագինի համատեքստի API

`register(program, ctx)`-ին փոխանցվող `ctx` օբյեկտը՝

| Հատկություն                  | Տիպ              | Նկարագրություն                                                 |
| ---------------------------- | ---------------- | -------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Նույնականացված հարցում OmniRoute սերվերին                      |
| `ctx.emit(data, opts)`       | `function`       | Արտածում table/json/jsonl/csv ձևաչափով՝ ըստ `--output` դրոշակի |
| `ctx.t(key)`                 | `async function` | i18n թարգմանության որոնում                                     |
| `ctx.withSpinner(label, fn)` | `async function` | Ասինքրոն fn-ը փաթաթում է ora պտտվող ցուցիչով                   |
| `ctx.baseUrl`                | `string`         | Որոշված բազային URL-ը                                          |
| `ctx.apiKey`                 | `string \| null` | API բանալին, եթե այն տրամադրված է                              |

## Հայտնաբերում

Փլագինները հայտնաբերվում են հետևյալ տեղերից՝

1. `~/.omniroute/plugins/<name>/` — օգտագործողի տեղային տեղադրումներ
2. `OMNIROUTE_PLUGIN_PATH` միջավայրի փոփոխական — հատուկ գրացուցակ

Երկուսն էլ նախատեսված են **միայն CLI-ի համար**։ Սերվերային փլագինների կատարման միջավայրը (marketplace/`plugin.json` փլագինները, որոնք աշխատում են պրոքսիի ներսում) ունի իր սեփական սկանավորիչը և վերասահմանման իր սեփական փոփոխականը՝ `OMNIROUTE_PLUGINS_DIR`։ Տե՛ս [PLUGIN_MARKETPLACE.md → Փլագինների գրացուցակ](./PLUGIN_MARKETPLACE.md#plugin-directory)։

Դրանցից մեկի սահմանումը չի ազդում մյուսի վրա։

Բեռնման սխալները բռնվում և ցուցադրվում են որպես նախազգուշացումներ․ անսարք փլագինը երբեք չի խափանում CLI-ը։

## Անվտանգություն

Փլագիններն աշխատում են նույն Node.js գործընթացի արտոնություններով, ինչ `omniroute`-ը։ Տեղադրեք փլագիններ միայն այն աղբյուրներից, որոնց վստահում եք։ `omniroute plugin install`-ը ցուցադրում է հստակ նախազգուշացում և պահանջում է `--yes` կամ ինտերակտիվ հաստատում։

## Հրապարակում

1. Համոզվեք, որ `package.json`-ը պարունակում է `"keywords": ["omniroute-plugin"]`
2. Սովորականի պես գործարկեք `npm publish`
3. Օգտագործողները կարող են որոնել `omniroute plugin search <query>`-ի միջոցով (որոնում է npm ռեեստրում)

## Փլագինի օրինակ

`meta` + `register()` պարունակող նվազագույն աշխատող օրինակի համար տե՛ս [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs)։
