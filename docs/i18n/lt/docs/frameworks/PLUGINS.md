# OmniRoute CLI Plugin System (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Išplėskite `omniroute` CLI nekeisdami jo branduolio. Papildiniai atitinka `omniroute-cmd-*` pavadinimų suteikimo konvenciją, panašiai kaip `gh extension` arba `kubectl plugin`.

## Greitoji pradžia

```bash
# Įdiegti papildinį iš npm
omniroute plugin install stripe

# Įdiegti vietinį kuriamą papildinį
omniroute plugin install ./my-plugin

# Išvardyti įdiegtus papildinius
omniroute plugin list

# Sugeneruoti naujo papildinio pradinę struktūrą
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Papildinio struktūra

Papildinys yra npm paketas, pavadintas `omniroute-cmd-<name>` (arba `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # turi būti „type“: „module“ ir „main“: „index.mjs“
├── index.mjs        # eksportuoja register(program, ctx) ir pasirinktinai meta
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
  description: "Mano OmniRoute papildinys",
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

## Papildinio konteksto API

Objektas `ctx`, perduodamas funkcijai `register(program, ctx)`:

| Savybė                       | Tipas            | Aprašymas                                                        |
| ---------------------------- | ---------------- | ---------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Autentifikuota užklausa į „OmniRoute“ serverį                    |
| `ctx.emit(data, opts)`       | `function`       | Išvestis table/json/jsonl/csv formatu pagal `--output` parametrą |
| `ctx.t(key)`                 | `async function` | i18n vertimo paieška                                             |
| `ctx.withSpinner(label, fn)` | `async function` | Apgaubia asinchroninę funkciją `fn` „ora“ eigos indikatoriumi    |
| `ctx.baseUrl`                | `string`         | Nustatytas bazinis URL                                           |
| `ctx.apiKey`                 | `string \| null` | API raktas, jei pateiktas                                        |

## Aptikimas

Papildiniai aptinkami šiose vietose:

1. `~/.omniroute/plugins/<name>/` — vietiniai naudotojo diegimai
2. Aplinkos kintamajame `OMNIROUTE_PLUGIN_PATH` nurodytas pasirinktinis katalogas

Abi parinktys skirtos **tik CLI**. Serverio papildinių vykdymo aplinka (prekyvietės / `plugin.json`
papildiniai, vykdomi tarpinio serverio viduje) turi nuosavą skaitytuvą ir savo perrašymo
kintamąjį `OMNIROUTE_PLUGINS_DIR` — žr.
[PLUGIN_MARKETPLACE.md → Papildinių katalogas](./PLUGIN_MARKETPLACE.md#plugin-directory).
Vieno nustatymas neturi įtakos kitam.

Įkėlimo klaidos yra sugaunamos ir pateikiamos kaip įspėjimai — sugedęs papildinys niekada nesutrikdo CLI veikimo.

## Saugumas

Papildiniai vykdomi su tomis pačiomis Node.js proceso teisėmis kaip `omniroute`. Diekite papildinius tik iš šaltinių, kuriais pasitikite. `omniroute plugin install` parodo aiškų įspėjimą ir reikalauja parametro `--yes` arba interaktyvaus patvirtinimo.

## Publikavimas

1. Įsitikinkite, kad `package.json` turi `"keywords": ["omniroute-plugin"]`
2. Vykdykite `npm publish` kaip įprasta
3. Naudotojai gali rasti papildinius naudodami `omniroute plugin search <query>` (ieškoma npm registre)

## Papildinio pavyzdys

Minimalų veikiantį pavyzdį su `meta` ir `register()` žr. [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
