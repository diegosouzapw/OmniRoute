# OmniRoute CLI Plugin System (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Udvid `omniroute`-CLI'en uden at ændre dens kerne. Plugins følger navngivningskonventionen `omniroute-cmd-*`, ligesom `gh extension` eller `kubectl plugin`.

## Hurtig start

```bash
# Installer et plugin fra npm
omniroute plugin install stripe

# Installer et lokalt plugin under udvikling
omniroute plugin install ./my-plugin

# Vis installerede plugins
omniroute plugin list

# Opret grundstrukturen til et nyt plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Et plugins opbygning

Et plugin er en npm-pakke med navnet `omniroute-cmd-<name>` (eller `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # skal have "type": "module" og "main": "index.mjs"
├── index.mjs        # eksporterer register(program, ctx) + valgfri meta
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
  description: "Mit plugin til OmniRoute",
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

## API for plugin-kontekst

`ctx`-objektet, der overføres til `register(program, ctx)`:

| Egenskab                     | Type             | Beskrivelse                                                   |
| ---------------------------- | ---------------- | ------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Godkendt fetch-kald til OmniRoute-serveren                    |
| `ctx.emit(data, opts)`       | `function`       | Output i table/json/jsonl/csv i henhold til flaget `--output` |
| `ctx.t(key)`                 | `async function` | Opslag af i18n-oversættelse                                   |
| `ctx.withSpinner(label, fn)` | `async function` | Omslutter asynkron fn med en ora-spinner                      |
| `ctx.baseUrl`                | `string`         | Den fortolkede basis-URL                                      |
| `ctx.apiKey`                 | `string \| null` | API-nøgle, hvis den er angivet                                |

## Registrering

Plugins registreres fra:

1. `~/.omniroute/plugins/<name>/` — bruger-lokale installationer
2. Miljøvariablen `OMNIROUTE_PLUGIN_PATH` — brugerdefineret mappe

Begge er **kun til CLI'en**. Plugin-kørselsmiljøet på serversiden (marketplace-/`plugin.json`-plugins, der kører inde i proxyen) har sin egen scanner med sin egen tilsidesættelse, `OMNIROUTE_PLUGINS_DIR` — se
[PLUGIN_MARKETPLACE.md → Plugin-mappe](./PLUGIN_MARKETPLACE.md#plugin-directory).
Indstilling af den ene påvirker ikke den anden.

Indlæsningsfejl opfanges og udskrives som advarsler — et defekt plugin får aldrig CLI'en til at gå ned.

## Sikkerhed

Plugins kører med de samme Node.js-procesrettigheder som `omniroute`. Installer kun plugins fra kilder, du har tillid til. `omniroute plugin install` viser en udtrykkelig advarsel og kræver `--yes` eller interaktiv bekræftelse.

## Udgivelse

1. Sørg for, at `package.json` har `"keywords": ["omniroute-plugin"]`
2. Kør `npm publish` som normalt
3. Brugere kan finde plugins via `omniroute plugin search <query>` (søger i npm-registret)

## Eksempelplugin

Se [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) for et minimalt fungerende eksempel med `meta` + `register()`.
