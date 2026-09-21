# OmniRoute CLI Plugin System (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Rozšiřte CLI `omniroute`, aniž byste upravovali jeho jádro. Pluginy používají konvenci pojmenování `omniroute-cmd-*`, podobně jako `gh extension` nebo `kubectl plugin`.

## Rychlý start

```bash
# Instalace pluginu z npm
omniroute plugin install stripe

# Instalace lokálního pluginu ve vývoji
omniroute plugin install ./my-plugin

# Výpis nainstalovaných pluginů
omniroute plugin list

# Vytvoření kostry nového pluginu
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomie pluginu

Plugin je balíček npm s názvem `omniroute-cmd-<name>` (nebo `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # musí obsahovat "type": "module" a "main": "index.mjs"
├── index.mjs        # exportuje register(program, ctx) a volitelně meta
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
  description: "Můj plugin pro OmniRoute",
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

Objekt `ctx` předaný funkci `register(program, ctx)`:

| Vlastnost                    | Typ              | Popis                                                            |
| ---------------------------- | ---------------- | ---------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Autentizovaný požadavek na server OmniRoute                      |
| `ctx.emit(data, opts)`       | `function`       | Výstup ve formátu table/json/jsonl/csv podle příznaku `--output` |
| `ctx.t(key)`                 | `async function` | Vyhledání překladu i18n                                          |
| `ctx.withSpinner(label, fn)` | `async function` | Obalí asynchronní funkci `fn` indikátorem průběhu ora            |
| `ctx.baseUrl`                | `string`         | Výsledná základní adresa URL                                     |
| `ctx.apiKey`                 | `string \| null` | Klíč API, pokud byl zadán                                        |

## Vyhledávání

Pluginy jsou vyhledávány v:

1. `~/.omniroute/plugins/<name>/` — uživatelské lokální instalace
2. Proměnná prostředí `OMNIROUTE_PLUGIN_PATH` — vlastní adresář

Obě možnosti jsou určeny **pouze pro CLI**. Běhové prostředí pluginů na straně serveru (marketplace/pluginy `plugin.json`, které běží uvnitř proxy) používá vlastní skener s vlastním přepsáním konfigurace,
`OMNIROUTE_PLUGINS_DIR` — viz
[PLUGIN_MARKETPLACE.md → Adresář pluginů](./PLUGIN_MARKETPLACE.md#plugin-directory).
Nastavení jedné možnosti nemá vliv na druhou.

Chyby při načítání jsou zachyceny a vypsány jako upozornění — poškozený plugin nikdy nezpůsobí pád CLI.

## Zabezpečení

Pluginy běží se stejnými oprávněními procesu Node.js jako `omniroute`. Instalujte pouze pluginy ze zdrojů, kterým důvěřujete. Příkaz `omniroute plugin install` zobrazí výslovné upozornění a vyžaduje příznak `--yes` nebo interaktivní potvrzení.

## Publikování

1. Ujistěte se, že `package.json` obsahuje `"keywords": ["omniroute-plugin"]`
2. Použijte standardní příkaz `npm publish`
3. Uživatelé mohou pluginy vyhledávat pomocí `omniroute plugin search <query>` (prohledává registr npm)

## Ukázkový plugin

Minimální funkční příklad s `meta` a `register()` najdete v adresáři [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
