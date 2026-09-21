# OmniRoute CLI Plugin System (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Palawakin ang `omniroute` CLI nang hindi binabago ang core nito. Sinusunod ng mga plugin ang kombensiyong `omniroute-cmd-*` sa pagpapangalan, katulad ng `gh extension` o `kubectl plugin`.

## Mabilisang pagsisimula

```bash
# Mag-install ng plugin mula sa npm
omniroute plugin install stripe

# Mag-install ng lokal na plugin na ginagawa pa
omniroute plugin install ./my-plugin

# Ilista ang mga naka-install na plugin
omniroute plugin list

# Gumawa ng balangkas para sa bagong plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomiya ng plugin

Ang plugin ay isang npm package na pinangalanang `omniroute-cmd-<name>` (o `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # dapat may "type": "module" at "main": "index.mjs"
├── index.mjs        # nag-e-export ng register(program, ctx) + opsyonal na meta
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

## Context API ng plugin

Ang object na `ctx` na ipinapasa sa `register(program, ctx)`:

| Property                     | Type             | Paglalarawan                                                  |
| ---------------------------- | ---------------- | ------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Authenticated na fetch papunta sa OmniRoute server            |
| `ctx.emit(data, opts)`       | `function`       | Output bilang table/json/jsonl/csv ayon sa flag na `--output` |
| `ctx.t(key)`                 | `async function` | Paghahanap ng salin sa i18n                                   |
| `ctx.withSpinner(label, fn)` | `async function` | Binabalot ang async fn gamit ang ora spinner                  |
| `ctx.baseUrl`                | `string`         | Nalutas na base URL                                           |
| `ctx.apiKey`                 | `string \| null` | API key kung ibinigay                                         |

## Pagtuklas

Tinutuklas ang mga plugin mula sa:

1. `~/.omniroute/plugins/<name>/` — mga install na lokal sa user
2. `OMNIROUTE_PLUGIN_PATH` env var — custom na directory

Parehong **para lamang sa CLI** ang mga ito. Ang server-side plugin runtime (ang marketplace/mga `plugin.json`
plugin na tumatakbo sa loob ng proxy) ay may sarili nitong scanner at sariling override,
`OMNIROUTE_PLUGINS_DIR` — tingnan ang
[PLUGIN_MARKETPLACE.md → Directory ng plugin](./PLUGIN_MARKETPLACE.md#plugin-directory).
Ang pagtatakda sa isa ay hindi nakaaapekto sa isa pa.

Sinasalo at ipinapakita bilang mga babala ang mga error sa pag-load — hindi kailanman pinapabagsak ng sirang plugin ang CLI.

## Seguridad

Tumatakbo ang mga plugin gamit ang parehong mga pribilehiyo ng proseso ng Node.js na ginagamit ng `omniroute`. Mag-install lamang ng mga plugin mula sa mga pinagkakatiwalaan mong source. Nagpapakita ang `omniroute plugin install` ng tahasang babala at nangangailangan ng `--yes` o interactive na kumpirmasyon.

## Pag-publish

1. Tiyaking may `"keywords": ["omniroute-plugin"]` ang `package.json`
2. Gamitin ang `npm publish` gaya ng karaniwan
3. Makapaghahanap ang mga user gamit ang `omniroute plugin search <query>` (hinahanap nito ang npm registry)

## Halimbawang plugin

Tingnan ang [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) para sa isang minimal ngunit gumaganang halimbawa na may `meta` + `register()`.
