# OmniRoute CLI Plugin System (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Gbasaa CLI `omniroute` n’agbanweghị isi ya. Plugins na-agbaso usoro ịkpọ aha `omniroute-cmd-*`, dịka `gh extension` ma ọ bụ `kubectl plugin`.

## Mmalite ngwa ngwa

```bash
# Wụnye plugin site na npm
omniroute plugin install stripe

# Wụnye plugin mpaghara a ka na-emepụta
omniroute plugin install ./my-plugin

# Depụta plugins arụnyere
omniroute plugin list

# Mepụta ntọala plugin ọhụrụ
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Ọdịdị plugin

Plugin bụ ngwugwu npm a kpọrọ `omniroute-cmd-<name>` (ma ọ bụ `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # ga-enwerịrị "type": "module" na "main": "index.mjs"
├── index.mjs        # na-ebupụ register(program, ctx) + meta nke nhọrọ
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

## API ọnọdụ plugin

Ihe `ctx` e zigara na `register(program, ctx)`:

| Njirimara                    | Ụdị              | Nkọwa                                                            |
| ---------------------------- | ---------------- | ---------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Fetch nwere nkwenye njirimara gaa na sava OmniRoute              |
| `ctx.emit(data, opts)`       | `function`       | Mmepụta n'ụdị table/json/jsonl/csv dịka ọkọlọtọ `--output` si dị |
| `ctx.t(key)`                 | `async function` | Nchọgharị ntụgharị asụsụ i18n                                    |
| `ctx.withSpinner(label, fn)` | `async function` | Ji ora spinner kpuchie async fn                                  |
| `ctx.baseUrl`                | `string`         | URL ntọala edoziri                                               |
| `ctx.apiKey`                 | `string \| null` | Igodo API ma ọ bụrụ na enyere ya                                 |

## Nchọpụta

A na-achọpụta plugins site na:

1. `~/.omniroute/plugins/<name>/` — nrụnye mpaghara onye ọrụ
2. Mgbanwe gburugburu `OMNIROUTE_PLUGIN_PATH` — ndekọ ahaziri iche

Ha abụọ bụ naanị maka **CLI**. Ebe plugin nke dị n'akụkụ sava na-arụ ọrụ (marketplace/plugins `plugin.json`
nke na-arụ ọrụ n'ime proxy) nwere scanner nke ya yana override nke ya,
`OMNIROUTE_PLUGINS_DIR` — lee
[PLUGIN_MARKETPLACE.md → Ndekọ plugin](./PLUGIN_MARKETPLACE.md#plugin-directory).
Ịtọ otu anaghị emetụta nke ọzọ.

A na-ejide njehie nbudata ma bipụta ha dịka ịdọ aka ná ntị — plugin mebiri emebi anaghị eme ka CLI daa.

## Nche

Plugins na-eji otu ikike usoro Node.js dịka `omniroute` arụ ọrụ. Wụnye naanị plugins sitere n'ebe ị tụkwasịrị obi. `omniroute plugin install` na-egosi ịdọ aka ná ntị doro anya ma chọọ `--yes` ma ọ bụ nkwenye mmekọrịta.

## Mbipụta

1. Gbaa mbọ hụ na `package.json` nwere `"keywords": ["omniroute-plugin"]`
2. Jiri `npm publish` bipụta dịka ọ dị na mbụ
3. Ndị ọrụ na-achọpụta ya site na `omniroute plugin search <query>` (na-achọgharị ndekọ npm)

## Plugin ihe atụ

Lee [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) maka ihe atụ kacha nta na-arụ ọrụ nke nwere `meta` + `register()`.
