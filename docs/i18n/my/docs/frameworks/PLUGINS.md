# OmniRoute CLI Plugin System (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

၎င်း၏ core ကို ပြင်ဆင်ခြင်းမရှိဘဲ `omniroute` CLI ကို တိုးချဲ့ပါ။ Plugin များသည် `gh extension` သို့မဟုတ် `kubectl plugin` ကဲ့သို့ပင် `omniroute-cmd-*` အမည်ပေးစနစ်ကို လိုက်နာသည်။

## အမြန်စတင်ရန်

```bash
# npm မှ plugin တစ်ခုကို ထည့်သွင်းပါ
omniroute plugin install stripe

# ဖွံ့ဖြိုးဆဲ local plugin တစ်ခုကို ထည့်သွင်းပါ
omniroute plugin install ./my-plugin

# ထည့်သွင်းထားသော plugin များကို စာရင်းပြုစုပါ
omniroute plugin list

# Plugin အသစ်တစ်ခုအတွက် အခြေခံဖွဲ့စည်းပုံကို ဖန်တီးပါ
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Plugin ဖွဲ့စည်းပုံ

Plugin တစ်ခုသည် `omniroute-cmd-<name>` (သို့မဟုတ် `@scope/omniroute-cmd-<name>`) ဟု အမည်ပေးထားသော npm package တစ်ခုဖြစ်သည်။

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" နှင့် "main": "index.mjs" ပါရှိရမည်
├── index.mjs        # register(program, ctx) နှင့် ရွေးချယ်နိုင်သော meta ကို export လုပ်သည်
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

`register(program, ctx)` ထံ ပေးပို့သော `ctx` object-

| Property                     | Type             | Description                                                        |
| ---------------------------- | ---------------- | ------------------------------------------------------------------ |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute server သို့ အထောက်အထားစိစစ်ပြီး fetch လုပ်ခြင်း          |
| `ctx.emit(data, opts)`       | `function`       | `--output` flag အလိုက် table/json/jsonl/csv ဖြင့် output ထုတ်ခြင်း |
| `ctx.t(key)`                 | `async function` | i18n ဘာသာပြန်ဆိုမှုကို ရှာဖွေခြင်း                                 |
| `ctx.withSpinner(label, fn)` | `async function` | async fn ကို ora spinner ဖြင့် ပတ်ခြင်း                            |
| `ctx.baseUrl`                | `string`         | ဖြေရှင်းသတ်မှတ်ထားသော base URL                                     |
| `ctx.apiKey`                 | `string \| null` | ပေးထားပါက API key                                                  |

## ရှာဖွေတွေ့ရှိခြင်း

Plugin များကို အောက်ပါနေရာများမှ ရှာဖွေတွေ့ရှိသည်-

1. `~/.omniroute/plugins/<name>/` — အသုံးပြုသူ၏ local ထည့်သွင်းမှုများ
2. `OMNIROUTE_PLUGIN_PATH` env var — စိတ်ကြိုက် directory

နှစ်ခုစလုံးသည် **CLI အတွက်သာ** ဖြစ်သည်။ Server-side plugin runtime (proxy အတွင်း အလုပ်လုပ်သော marketplace/`plugin.json`
plugin များ) တွင် ၎င်း၏ကိုယ်ပိုင် override ဖြစ်သည့်
`OMNIROUTE_PLUGINS_DIR` နှင့်အတူ ကိုယ်ပိုင် scanner ရှိသည် —
[PLUGIN_MARKETPLACE.md → Plugin directory](./PLUGIN_MARKETPLACE.md#plugin-directory) ကို ကြည့်ပါ။
တစ်ခုကို သတ်မှတ်ခြင်းသည် အခြားတစ်ခုအပေါ် သက်ရောက်မှုမရှိပါ။

Loading error များကို ဖမ်းယူပြီး သတိပေးချက်များအဖြစ် ပြသသည် — ပျက်နေသော plugin တစ်ခုသည် CLI ကို မည်သည့်အခါမျှ crash ဖြစ်စေမည်မဟုတ်ပါ။

## လုံခြုံရေး

Plugin များသည် `omniroute` နှင့် တူညီသော Node.js process လုပ်ပိုင်ခွင့်များဖြင့် အလုပ်လုပ်သည်။ သင်ယုံကြည်ရသော source များမှ plugin များကိုသာ ထည့်သွင်းပါ။ `omniroute plugin install` သည် ရှင်းလင်းသော သတိပေးချက်တစ်ခုကို ပြသပြီး `--yes` သို့မဟုတ် interactive အတည်ပြုချက်ကို လိုအပ်သည်။

## ထုတ်ဝေခြင်း

1. `package.json` တွင် `"keywords": ["omniroute-plugin"]` ပါဝင်ကြောင်း သေချာပါစေ
2. ပုံမှန်အတိုင်း `npm publish` လုပ်ပါ
3. အသုံးပြုသူများသည် `omniroute plugin search <query>` မှတစ်ဆင့် ရှာဖွေနိုင်သည် (npm registry ကို ရှာဖွေသည်)

## နမူနာ plugin

`meta` + `register()` ပါဝင်သည့် အနည်းဆုံး အလုပ်လုပ်နိုင်သော နမူနာအတွက် [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) ကို ကြည့်ပါ။
