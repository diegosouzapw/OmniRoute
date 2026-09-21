# OmniRoute CLI Plugin System (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Breid de `omniroute`-CLI uit zonder de kern ervan te wijzigen. Plugins volgen de naamgevingsconventie `omniroute-cmd-*`, vergelijkbaar met `gh extension` of `kubectl plugin`.

## Snel aan de slag

```bash
# Installeer een plugin vanuit npm
omniroute plugin install stripe

# Installeer een lokale plugin tijdens de ontwikkeling
omniroute plugin install ./my-plugin

# Geef geïnstalleerde plugins weer
omniroute plugin list

# Genereer de basisstructuur voor een nieuwe plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomie van een plugin

Een plugin is een npm-pakket met de naam `omniroute-cmd-<name>` (of `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # moet "type": "module" en "main": "index.mjs" bevatten
├── index.mjs        # exporteert register(program, ctx) + optionele meta
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

## Context-API voor plugins

Het `ctx`-object dat aan `register(program, ctx)` wordt doorgegeven:

| Eigenschap                   | Type             | Beschrijving                                                     |
| ---------------------------- | ---------------- | ---------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Geauthenticeerde fetch naar de OmniRoute-server                  |
| `ctx.emit(data, opts)`       | `function`       | Uitvoer als table/json/jsonl/csv op basis van de vlag `--output` |
| `ctx.t(key)`                 | `async function` | Opzoeken van een i18n-vertaling                                  |
| `ctx.withSpinner(label, fn)` | `async function` | Omhult een asynchrone fn met een ora-spinner                     |
| `ctx.baseUrl`                | `string`         | Herleide basis-URL                                               |
| `ctx.apiKey`                 | `string \| null` | API-sleutel, indien opgegeven                                    |

## Detectie

Plugins worden op de volgende locaties gezocht:

1. `~/.omniroute/plugins/<name>/` — gebruikerslokale installaties
2. Omgevingsvariabele `OMNIROUTE_PLUGIN_PATH` — aangepaste map

Beide zijn **uitsluitend voor de CLI**. De server-side pluginruntime (de marketplace-/`plugin.json`-
plugins die binnen de proxy worden uitgevoerd) heeft een eigen scanner met een eigen override:
`OMNIROUTE_PLUGINS_DIR` — zie
[PLUGIN_MARKETPLACE.md → Pluginmap](./PLUGIN_MARKETPLACE.md#plugin-directory).
Het instellen van de ene heeft geen invloed op de andere.

Laadfouten worden opgevangen en als waarschuwingen weergegeven — een defecte plugin laat de CLI nooit crashen.

## Beveiliging

Plugins worden uitgevoerd met dezelfde Node.js-procesrechten als `omniroute`. Installeer alleen plugins van bronnen die je vertrouwt. `omniroute plugin install` toont een expliciete waarschuwing en vereist `--yes` of interactieve bevestiging.

## Publiceren

1. Zorg ervoor dat `package.json` `"keywords": ["omniroute-plugin"]` bevat
2. Voer zoals gebruikelijk `npm publish` uit
3. Gebruikers kunnen plugins vinden via `omniroute plugin search <query>` (doorzoekt het npm-register)

## Voorbeeldplugin

Zie [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) voor een minimaal werkend voorbeeld met `meta` + `register()`.
