# OmniRoute CLI Plugin System (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Faagun `omniroute` CLI láì ṣàtúnṣe kókó rẹ̀. Àwọn plugin ń tẹ̀lé àṣà ìsọlórúkọ `omniroute-cmd-*`, bíi `gh extension` tàbí `kubectl plugin`.

## Ìbẹ̀rẹ̀ kíákíá

```bash
# Fi plugin kan láti npm sílẹ̀
omniroute plugin install stripe

# Fi plugin agbègbè kan tí ó wà lábẹ́ ìdàgbàsókè sílẹ̀
omniroute plugin install ./my-plugin

# Ṣàfihàn àwọn plugin tí a ti fi sílẹ̀
omniroute plugin list

# Ṣẹ̀dá àkànṣe plugin tuntun
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Àwọn apá inú plugin

Plugin jẹ́ package npm tí orúkọ rẹ̀ jẹ́ `omniroute-cmd-<name>` (tàbí `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # ó gbọ́dọ̀ ní "type": "module" àti "main": "index.mjs"
├── index.mjs        # ń ṣe export register(program, ctx) + meta àṣàyàn
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

## API ọ̀rọ̀-àyíká plugin

Ohun `ctx` tí a fi ránṣẹ́ sí `register(program, ctx)`:

| Àbùdá                        | Irú              | Àpèjúwe                                                 |
| ---------------------------- | ---------------- | ------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Fetch tí a ti fìdí ìdánimọ̀ rẹ̀ múlẹ̀ sí olupèsè OmniRoute |
| `ctx.emit(data, opts)`       | `function`       | Ìjáde ní table/json/jsonl/csv gẹ́gẹ́ bí flag `--output`   |
| `ctx.t(key)`                 | `async function` | Ìṣàwárí ìtumọ̀ i18n                                      |
| `ctx.withSpinner(label, fn)` | `async function` | Fi ora spinner yí async fn ká                           |
| `ctx.baseUrl`                | `string`         | URL ìpìlẹ̀ tí a ti pinnu                                 |
| `ctx.apiKey`                 | `string \| null` | Kọ́kọ́rọ́ API bí a bá pèsè rẹ̀                              |

## Ìṣàwárí

A ń ṣàwárí àwọn plugin láti:

1. `~/.omniroute/plugins/<name>/` — àwọn ìfìsílẹ̀ agbègbè onílò
2. `OMNIROUTE_PLUGIN_PATH` env var — àkójọpọ̀ fáìlì àdáni

Àwọn méjèèjì jẹ́ ti **CLI nìkan**. Àyíká ìṣiṣẹ́ plugin ní ẹ̀gbẹ́ olupèsè (marketplace/àwọn plugin `plugin.json`
tí ń ṣiṣẹ́ nínú proxy) ní scanner tirẹ̀ pẹ̀lú override tirẹ̀,
`OMNIROUTE_PLUGINS_DIR` — wo
[PLUGIN_MARKETPLACE.md → Àkójọpọ̀ fáìlì plugin](./PLUGIN_MARKETPLACE.md#plugin-directory).
Ṣíṣètò ọ̀kan kò ní ipa lórí èkejì.

A máa ń mú àwọn àṣìṣe ìkójọpọ̀, a sì máa tẹ̀ wọ́n jáde gẹ́gẹ́ bí ìkìlọ̀ — plugin tí ó ní ìṣòro kò lè mú kí CLI jáwọ́ lójijì.

## Ààbò

Àwọn plugin ń ṣiṣẹ́ pẹ̀lú àwọn àṣẹ ìlànà iṣẹ́ Node.js kan náà bí `omniroute`. Fi àwọn plugin láti àwọn orísun tí o gbẹ́kẹ̀ lé nìkan sílẹ̀. `omniroute plugin install` máa ń ṣàfihàn ìkìlọ̀ kedere, ó sì nílò `--yes` tàbí ìmúdájú alábáṣepọ̀.

## Ìtẹ̀jáde

1. Rí i dájú pé `package.json` ní `"keywords": ["omniroute-plugin"]`
2. Ṣe `npm publish` gẹ́gẹ́ bí àṣà
3. Àwọn onílò lè ṣàwárí pẹ̀lú `omniroute plugin search <query>` (ó ń ṣàwárí registry npm)

## Àpẹẹrẹ plugin

Wo [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) fún àpẹẹrẹ kékeré tí ń ṣiṣẹ́ pẹ̀lú `meta` + `register()`.
