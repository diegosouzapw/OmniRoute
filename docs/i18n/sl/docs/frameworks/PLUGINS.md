# OmniRoute CLI Plugin System (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Razširite CLI `omniroute`, ne da bi spreminjali njegovo jedro. Vtičniki sledijo dogovoru o poimenovanju `omniroute-cmd-*`, podobno kot `gh extension` ali `kubectl plugin`.

## Hitri začetek

```bash
# Namestite vtičnik iz npm
omniroute plugin install stripe

# Namestite lokalni vtičnik v razvoju
omniroute plugin install ./my-plugin

# Prikažite seznam nameščenih vtičnikov
omniroute plugin list

# Ustvarite ogrodje novega vtičnika
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Zgradba vtičnika

Vtičnik je paket npm z imenom `omniroute-cmd-<name>` (ali `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # vsebovati mora "type": "module" in "main": "index.mjs"
├── index.mjs        # izvaža register(program, ctx) in izbirni meta
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

## Kontekstni API vtičnika

Objekt `ctx`, posredovan funkciji `register(program, ctx)`:

| Lastnost                     | Vrsta            | Opis                                                              |
| ---------------------------- | ---------------- | ----------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Overjena zahteva do strežnika OmniRoute                           |
| `ctx.emit(data, opts)`       | `function`       | Izpis v obliki table/json/jsonl/csv glede na zastavico `--output` |
| `ctx.t(key)`                 | `async function` | Iskanje prevoda i18n                                              |
| `ctx.withSpinner(label, fn)` | `async function` | Ovije asinhrono funkcijo z vrtilnikom ora                         |
| `ctx.baseUrl`                | `string`         | Razrešen osnovni URL                                              |
| `ctx.apiKey`                 | `string \| null` | Ključ API, če je naveden                                          |

## Odkrivanje

Vtičniki se odkrivajo na naslednjih mestih:

1. `~/.omniroute/plugins/<name>/` — uporabniške lokalne namestitve
2. Okoljska spremenljivka `OMNIROUTE_PLUGIN_PATH` — imenik po meri

Oboje velja **samo za CLI**. Strežniško izvajalno okolje vtičnikov (tržnica oziroma vtičniki `plugin.json`, ki se izvajajo znotraj posredniškega strežnika) uporablja lasten pregledovalnik z lastno preglasitvijo,
`OMNIROUTE_PLUGINS_DIR` — glejte
[PLUGIN_MARKETPLACE.md → Imenik vtičnikov](./PLUGIN_MARKETPLACE.md#plugin-directory).
Nastavitev ene možnosti ne vpliva na drugo.

Napake pri nalaganju so prestrežene in izpisane kot opozorila — nedelujoč vtičnik nikoli ne povzroči zrušitve CLI-ja.

## Varnost

Vtičniki se izvajajo z enakimi procesnimi pravicami okolja Node.js kot `omniroute`. Nameščajte samo vtičnike iz virov, ki jim zaupate. `omniroute plugin install` prikaže izrecno opozorilo in zahteva možnost `--yes` ali interaktivno potrditev.

## Objavljanje

1. Prepričajte se, da `package.json` vsebuje `"keywords": ["omniroute-plugin"]`
2. Izvedite `npm publish` kot običajno
3. Uporabniki jih lahko odkrijejo z `omniroute plugin search <query>` (preišče register npm)

## Primer vtičnika

Za minimalen delujoč primer z `meta` in `register()` glejte [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
