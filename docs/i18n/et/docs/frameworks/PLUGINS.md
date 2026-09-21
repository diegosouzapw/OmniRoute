# OmniRoute CLI Plugin System (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Laienda `omniroute` CLI-d ilma selle tuuma muutmata. Pluginad järgivad nimetamisreeglit `omniroute-cmd-*`, sarnaselt lahendustega `gh extension` või `kubectl plugin`.

## Kiirjuhend

```bash
# Installi plugin npm-ist
omniroute plugin install stripe

# Installi arenduses olev kohalik plugin
omniroute plugin install ./my-plugin

# Kuva installitud pluginad
omniroute plugin list

# Genereeri uue plugina algstruktuur
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Plugina ülesehitus

Plugin on npm-pakett nimega `omniroute-cmd-<name>` (või `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # peab sisaldama "type": "module" ja "main": "index.mjs"
├── index.mjs        # ekspordib register(program, ctx) + valikulise meta
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

## Plugina konteksti API

Objekt `ctx`, mis edastatakse funktsioonile `register(program, ctx)`:

| Omadus                       | Tüüp             | Kirjeldus                                                          |
| ---------------------------- | ---------------- | ------------------------------------------------------------------ |
| `ctx.apiFetch(path, opts)`   | `async function` | Autenditud päring OmniRoute'i serverisse                           |
| `ctx.emit(data, opts)`       | `function`       | Väljund vormingus table/json/jsonl/csv vastavalt lipule `--output` |
| `ctx.t(key)`                 | `async function` | i18n-tõlke otsing                                                  |
| `ctx.withSpinner(label, fn)` | `async function` | Ümbritseb asünkroonse fn-i ora edenemisnäidikuga                   |
| `ctx.baseUrl`                | `string`         | Lahendatud baas-URL                                                |
| `ctx.apiKey`                 | `string \| null` | API võti, kui see on määratud                                      |

## Tuvastamine

Pluginaid otsitakse järgmistest asukohtadest:

1. `~/.omniroute/plugins/<name>/` — kasutaja kohalikud installid
2. Keskkonnamuutuja `OMNIROUTE_PLUGIN_PATH` — kohandatud kataloog

Mõlemad on mõeldud **ainult CLI-le**. Serveripoolsel pluginate käituskeskkonnal (turuplatsi/`plugin.json`
pluginad, mis töötavad puhverserveris) on eraldi skanner koos oma alistusega
`OMNIROUTE_PLUGINS_DIR` — vaata
[PLUGIN_MARKETPLACE.md → Pluginate kataloog](./PLUGIN_MARKETPLACE.md#plugin-directory).
Ühe määramine ei mõjuta teist.

Laadimisvead püütakse kinni ja kuvatakse hoiatustena — vigane plugin ei põhjusta kunagi CLI krahhi.

## Turvalisus

Pluginad töötavad samade Node.js-i protsessiõigustega nagu `omniroute`. Installi pluginaid ainult usaldusväärsetest allikatest. `omniroute plugin install` kuvab selgesõnalise hoiatuse ja nõuab lippu `--yes` või interaktiivset kinnitust.

## Avaldamine

1. Veendu, et `package.json` sisaldaks `"keywords": ["omniroute-plugin"]`
2. Käivita tavapäraselt `npm publish`
3. Kasutajad saavad pluginaid otsida käsuga `omniroute plugin search <query>` (otsib npm-i registrist)

## Näidisplugin

Minimaalse töötava näite, mis sisaldab `meta` + `register()`, leiad kataloogist [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
