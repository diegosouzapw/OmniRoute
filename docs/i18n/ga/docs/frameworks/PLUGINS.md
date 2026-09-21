# OmniRoute CLI Plugin System (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Leathnaigh CLI `omniroute` gan a chroí a mhodhnú. Leanann breiseáin an coinbhinsiún ainmniúcháin `omniroute-cmd-*`, cosúil le `gh extension` nó `kubectl plugin`.

## Tús tapa

```bash
# Suiteáil breiseán ó npm
omniroute plugin install stripe

# Suiteáil breiseán áitiúil atá á fhorbairt
omniroute plugin install ./my-plugin

# Liostaigh na breiseáin atá suiteáilte
omniroute plugin list

# Cruthaigh creatlach do bhreiseán nua
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Struchtúr breiseáin

Is pacáiste npm darb ainm `omniroute-cmd-<name>` (nó `@scope/omniroute-cmd-<name>`) é breiseán.

```
omniroute-cmd-myplugin/
├── package.json     # ní mór "type": "module" agus "main": "index.mjs" a bheith ann
├── index.mjs        # easpórtálann sé register(program, ctx) + meta roghnach
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

## API comhthéacs an bhreiseáin

An réad `ctx` a chuirtear ar aghaidh chuig `register(program, ctx)`:

| Airí                         | Cineál           | Cur síos                                                             |
| ---------------------------- | ---------------- | -------------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Gabháil fhíordheimhnithe chuig an bhfreastalaí OmniRoute             |
| `ctx.emit(data, opts)`       | `function`       | Aschur i bhformáid table/json/jsonl/csv de réir na brataí `--output` |
| `ctx.t(key)`                 | `async function` | Cuardach aistriúcháin i18n                                           |
| `ctx.withSpinner(label, fn)` | `async function` | Timfhilleann sé fn aisioncronach le rothlóir ora                     |
| `ctx.baseUrl`                | `string`         | Bun-URL réitithe                                                     |
| `ctx.apiKey`                 | `string \| null` | Eochair API má soláthraíodh í                                        |

## Fionnachtain

Aimsítear breiseáin sna háiteanna seo a leanas:

1. `~/.omniroute/plugins/<name>/` — suiteálacha áitiúla an úsáideora
2. Athróg timpeallachta `OMNIROUTE_PLUGIN_PATH` — comhadlann shaincheaptha

Baineann an dá cheann leis an **CLI amháin**. Tá a scanóir féin agus a shárú féin,
`OMNIROUTE_PLUGINS_DIR`, ag am rite na mbreiseán ar thaobh an fhreastalaí
(na breiseáin marketplace/`plugin.json` a ritheann laistigh den seachfhreastalaí) — féach
[PLUGIN_MARKETPLACE.md → Comhadlann breiseán](./PLUGIN_MARKETPLACE.md#plugin-directory).
Ní dhéanann socrú ceann amháin difear don cheann eile.

Gabhtar earráidí luchtaithe agus priontáiltear mar rabhaidh iad — ní thuairteálann breiseán briste an CLI choíche.

## Slándáil

Ritheann breiseáin leis na pribhléidí próisis Node.js céanna agus atá ag `omniroute`. Ná suiteáil ach breiseáin ó fhoinsí a bhfuil muinín agat astu. Taispeánann `omniroute plugin install` rabhadh sainráite agus éilíonn sé `--yes` nó deimhniú idirghníomhach.

## Foilsiú

1. Cinntigh go bhfuil `"keywords": ["omniroute-plugin"]` in `package.json`
2. Úsáid `npm publish` mar is gnách
3. Aimsíonn úsáideoirí iad trí `omniroute plugin search <query>` (déanann sé cuardach i gclárlann npm)

## Breiseán samplach

Féach [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) le haghaidh sampla íosta feidhmiúil ina bhfuil `meta` + `register()`.
