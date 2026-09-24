# OmniRoute CLI Plugin System (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Panua CLI ya `omniroute` bila kurekebisha kiini chake. Programu-jalizi hufuata utaratibu wa majina wa `omniroute-cmd-*`, sawa na `gh extension` au `kubectl plugin`.

## Kuanza haraka

```bash
# Sakinisha programu-jalizi kutoka npm
omniroute plugin install stripe

# Sakinisha programu-jalizi ya ndani inayotengenezwa
omniroute plugin install ./my-plugin

# Orodhesha programu-jalizi zilizosakinishwa
omniroute plugin list

# Tengeneza muundo wa awali wa programu-jalizi mpya
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Muundo wa programu-jalizi

Programu-jalizi ni kifurushi cha npm kinachoitwa `omniroute-cmd-<name>` (au `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # lazima iwe na "type": "module" na "main": "index.mjs"
├── index.mjs        # husafirisha register(program, ctx) + meta ya hiari
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

## API ya muktadha wa programu-jalizi

Kipengee cha `ctx` kinachopitishwa kwa `register(program, ctx)`:

| Sifa                         | Aina             | Maelezo                                                              |
| ---------------------------- | ---------------- | -------------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Ombi lililothibitishwa kwa seva ya OmniRoute                         |
| `ctx.emit(data, opts)`       | `function`       | Tokeo katika table/json/jsonl/csv kulingana na bendera ya `--output` |
| `ctx.t(key)`                 | `async function` | Utafutaji wa tafsiri wa i18n                                         |
| `ctx.withSpinner(label, fn)` | `async function` | Hufungamanisha fn isawazisha na kizungushaji cha ora                 |
| `ctx.baseUrl`                | `string`         | URL msingi iliyotatuliwa                                             |
| `ctx.apiKey`                 | `string \| null` | Ufunguo wa API ikiwa umetolewa                                       |

## Ugunduzi

Programu-jalizi hugunduliwa kutoka:

1. `~/.omniroute/plugins/<name>/` — usakinishaji wa ndani wa mtumiaji
2. Kigezo cha mazingira cha `OMNIROUTE_PLUGIN_PATH` — saraka maalum

Zote mbili ni za **CLI pekee**. Mazingira ya uendeshaji ya programu-jalizi upande wa seva (programu-jalizi za soko/`plugin.json`
zinazoendeshwa ndani ya proksi) yana kichanganuzi chake chenye ubatilishaji wake,
`OMNIROUTE_PLUGINS_DIR` — angalia
[PLUGIN_MARKETPLACE.md → Saraka ya programu-jalizi](./PLUGIN_MARKETPLACE.md#plugin-directory).
Kuweka moja hakuathiri nyingine.

Hitilafu za upakiaji hunaswa na kuchapishwa kama maonyo — programu-jalizi iliyoharibika haiwezi kamwe kusababisha CLI kuacha kufanya kazi.

## Usalama

Programu-jalizi huendeshwa kwa mapendeleo sawa ya mchakato wa Node.js kama `omniroute`. Sakinisha programu-jalizi kutoka kwenye vyanzo unavyoviamini pekee. `omniroute plugin install` huonyesha onyo dhahiri na huhitaji `--yes` au uthibitisho shirikishi.

## Uchapishaji

1. Hakikisha `package.json` ina `"keywords": ["omniroute-plugin"]`
2. Tumia `npm publish` kama kawaida
3. Watumiaji hugundua kupitia `omniroute plugin search <query>` (hutafuta sajili ya npm)

## Mfano wa programu-jalizi

Angalia [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) kwa mfano mdogo unaofanya kazi wenye `meta` + `register()`.
