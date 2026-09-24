# OmniRoute CLI Plugin System (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Faɗaɗa CLI na `omniroute` ba tare da gyara ainihin tsarin sa ba. Plugins suna bin tsarin suna na `omniroute-cmd-*`, kwatankwacin `gh extension` ko `kubectl plugin`.

## Farawa cikin sauri

```bash
# Shigar da plugin daga npm
omniroute plugin install stripe

# Shigar da plugin na gida da ake haɓakawa
omniroute plugin install ./my-plugin

# Jera plugins da aka shigar
omniroute plugin list

# Ƙirƙiri tsarin farko na sabon plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Tsarin plugin

Plugin kunshin npm ne mai suna `omniroute-cmd-<name>` (ko `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # dole ne ya kasance da "type": "module" da "main": "index.mjs"
├── index.mjs        # yana fitar da register(program, ctx) + meta na zaɓi
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

## API na mahallin plugin

Abun `ctx` da ake miƙawa zuwa `register(program, ctx)`:

| Sifa                         | Nau'i            | Bayani                                               |
| ---------------------------- | ---------------- | ---------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Yin fetch mai tantance izini zuwa sabar OmniRoute    |
| `ctx.emit(data, opts)`       | `function`       | Fitarwa a table/json/jsonl/csv bisa tutar `--output` |
| `ctx.t(key)`                 | `async function` | Neman fassarar i18n                                  |
| `ctx.withSpinner(label, fn)` | `async function` | Naɗe async fn da ora spinner                         |
| `ctx.baseUrl`                | `string`         | Tushen URL da aka ƙayyade                            |
| `ctx.apiKey`                 | `string \| null` | Maɓallin API idan an bayar                           |

## Ganowa

Ana gano plugins daga:

1. `~/.omniroute/plugins/<name>/` — shigarwa na gida ga mai amfani
2. Canjin env na `OMNIROUTE_PLUGIN_PATH` — kundin adireshi na musamman

Dukansu na **CLI kawai** ne. Tsarin gudanar da plugin na gefen saba (plugins na marketplace/`plugin.json`
waɗanda ke gudana a cikin proxy) yana da nasa na'urar bincike tare da nasa sauyin saitin,
`OMNIROUTE_PLUGINS_DIR` — duba
[PLUGIN_MARKETPLACE.md → Kundin adireshin plugin](./PLUGIN_MARKETPLACE.md#plugin-directory).
Saita ɗaya ba ya shafar ɗayan.

Ana kama kurakuran lodawa kuma a buga su a matsayin gargaɗi — plugin mai matsala ba zai taɓa sa CLI ya daina aiki ba.

## Tsaro

Plugins suna gudana da irin izinin tsarin Node.js ɗin da `omniroute` yake da shi. Shigar da plugins kawai daga tushe da ka amince da su. `omniroute plugin install` yana nuna gargaɗi bayyananne kuma yana buƙatar `--yes` ko tabbatarwa ta hulɗa.

## Bugawa

1. Tabbatar `package.json` yana da `"keywords": ["omniroute-plugin"]`
2. Yi `npm publish` kamar yadda aka saba
3. Masu amfani suna ganowa ta `omniroute plugin search <query>` (yana bincika rajistar npm)

## Misalin plugin

Duba [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) don ƙaramin misali mai aiki wanda ke ɗauke da `meta` + `register()`.
