# OmniRoute CLI Plugin System (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Estendi s-CLI `omniroute` mingħajr ma timmodifika l-qalba tiegħu. Il-plugins isegwu l-konvenzjoni tal-ismijiet `omniroute-cmd-*`, b’mod simili għal `gh extension` jew `kubectl plugin`.

## Bidu rapidu

```bash
# Installa plugin minn npm
omniroute plugin install stripe

# Installa plugin lokali li qed jiġi żviluppat
omniroute plugin install ./my-plugin

# Elenka l-plugins installati
omniroute plugin list

# Oħloq l-istruttura bażika ta’ plugin ġdid
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomija ta’ plugin

Plugin huwa pakkett npm bl-isem `omniroute-cmd-<name>` (jew `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # irid ikollu "type": "module" u "main": "index.mjs"
├── index.mjs        # jesporta register(program, ctx) + meta fakultattiva
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
  description: "Il-plugin tiegħi għal OmniRoute",
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

## API tal-kuntest tal-plugin

L-oġġett `ctx` mgħoddi lil `register(program, ctx)`:

| Proprjetà                    | Tip              | Deskrizzjoni                                           |
| ---------------------------- | ---------------- | ------------------------------------------------------ |
| `ctx.apiFetch(path, opts)`   | `async function` | Fetch awtentikat lejn is-server OmniRoute              |
| `ctx.emit(data, opts)`       | `function`       | Output f’table/json/jsonl/csv skont il-flag `--output` |
| `ctx.t(key)`                 | `async function` | Tfittxija ta’ traduzzjoni i18n                         |
| `ctx.withSpinner(label, fn)` | `async function` | Tgeżwer fn asinkronika bi spinner ta’ ora              |
| `ctx.baseUrl`                | `string`         | Il-URL bażi riżolt                                     |
| `ctx.apiKey`                 | `string \| null` | Iċ-ċavetta tal-API jekk tkun ipprovduta                |

## Skoperta

Il-plugins jiġu skoperti minn:

1. `~/.omniroute/plugins/<name>/` — installazzjonijiet lokali tal-utent
2. Il-varjabbli tal-ambjent `OMNIROUTE_PLUGIN_PATH` — direttorju personalizzat

It-tnejn huma **għas-CLI biss**. Ir-runtime tal-plugins fuq in-naħa tas-server (il-plugins tal-marketplace/`plugin.json`
li jaħdmu ġewwa l-proxy) għandu l-iskaner tiegħu stess bl-override tiegħu,
`OMNIROUTE_PLUGINS_DIR` — ara
[PLUGIN_MARKETPLACE.md → Direttorju tal-plugins](./PLUGIN_MARKETPLACE.md#plugin-directory).
L-issettjar ta’ wieħed ma jaffettwax lill-ieħor.

L-iżbalji tat-tagħbija jinqabdu u jintwerew bħala twissijiet — plugin difettuż qatt ma jwaqqa’ s-CLI.

## Sigurtà

Il-plugins jaħdmu bl-istess privileġġi tal-proċess Node.js bħal `omniroute`. Installa biss plugins minn sorsi li tafda. `omniroute plugin install` juri twissija espliċita u jeħtieġ `--yes` jew konferma interattiva.

## Pubblikazzjoni

1. Kun żgur li `package.json` għandu `"keywords": ["omniroute-plugin"]`
2. Uża `npm publish` bħas-soltu
3. L-utenti jiskopruhom permezz ta’ `omniroute plugin search <query>` (ifittex fir-reġistru npm)

## Plugin ta’ eżempju

Ara [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) għal eżempju minimu li jaħdem b’`meta` + `register()`.
