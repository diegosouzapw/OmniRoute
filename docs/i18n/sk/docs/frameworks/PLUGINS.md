# OmniRoute CLI Plugin System (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Rozšírte CLI `omniroute` bez úpravy jeho jadra. Pluginy používajú konvenciu pomenovania `omniroute-cmd-*`, podobne ako `gh extension` alebo `kubectl plugin`.

## Rýchly začiatok

```bash
# Inštalácia pluginu z npm
omniroute plugin install stripe

# Inštalácia lokálneho pluginu vo vývoji
omniroute plugin install ./my-plugin

# Zobrazenie zoznamu nainštalovaných pluginov
omniroute plugin list

# Vytvorenie kostry nového pluginu
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatómia pluginu

Plugin je balík npm s názvom `omniroute-cmd-<name>` (alebo `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # musí obsahovať "type": "module" a "main": "index.mjs"
├── index.mjs        # exportuje register(program, ctx) + voliteľné meta
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
  description: "Môj plugin pre OmniRoute",
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

## Kontextové API pluginu

Objekt `ctx` odovzdaný funkcii `register(program, ctx)`:

| Vlastnosť                    | Typ              | Popis                                                            |
| ---------------------------- | ---------------- | ---------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Autentifikované načítanie údajov zo servera OmniRoute            |
| `ctx.emit(data, opts)`       | `function`       | Výstup vo formáte table/json/jsonl/csv podľa príznaku `--output` |
| `ctx.t(key)`                 | `async function` | Vyhľadanie i18n prekladu                                         |
| `ctx.withSpinner(label, fn)` | `async function` | Obalí asynchrónnu funkciu `fn` indikátorom priebehu ora          |
| `ctx.baseUrl`                | `string`         | Určená základná URL adresa                                       |
| `ctx.apiKey`                 | `string \| null` | Kľúč API, ak bol poskytnutý                                      |

## Vyhľadávanie

Pluginy sa vyhľadávajú v:

1. `~/.omniroute/plugins/<name>/` — lokálne inštalácie používateľa
2. Premenná prostredia `OMNIROUTE_PLUGIN_PATH` — vlastný adresár

Obe možnosti sú určené **iba pre CLI**. Serverové prostredie na spúšťanie pluginov (marketplace/pluginy `plugin.json`,
ktoré sa spúšťajú v rámci proxy servera) má vlastný skener s vlastným prepísaním,
`OMNIROUTE_PLUGINS_DIR` — pozrite si
[PLUGIN_MARKETPLACE.md → Adresár pluginov](./PLUGIN_MARKETPLACE.md#plugin-directory).
Nastavenie jednej možnosti neovplyvňuje druhú.

Chyby pri načítavaní sa zachytia a vypíšu ako upozornenia — poškodený plugin nikdy nespôsobí zlyhanie CLI.

## Bezpečnosť

Pluginy sa spúšťajú s rovnakými oprávneniami procesu Node.js ako `omniroute`. Inštalujte iba pluginy zo zdrojov, ktorým dôverujete. Príkaz `omniroute plugin install` zobrazí výslovné upozornenie a vyžaduje príznak `--yes` alebo interaktívne potvrdenie.

## Publikovanie

1. Uistite sa, že `package.json` obsahuje `"keywords": ["omniroute-plugin"]`
2. Použite `npm publish` ako zvyčajne
3. Používatelia môžu pluginy vyhľadávať pomocou `omniroute plugin search <query>` (prehľadáva register npm)

## Vzorový plugin

Minimálny funkčný príklad s `meta` + `register()` nájdete v [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
