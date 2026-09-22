# OmniRoute CLI Plugin System (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Erweitere die `omniroute`-CLI, ohne ihren Kern zu verändern. Plugins folgen der Namenskonvention `omniroute-cmd-*`, ähnlich wie `gh extension` oder `kubectl plugin`.

## Schnellstart

```bash
# Ein Plugin von npm installieren
omniroute plugin install stripe

# Ein lokales Plugin in der Entwicklung installieren
omniroute plugin install ./my-plugin

# Installierte Plugins auflisten
omniroute plugin list

# Ein Grundgerüst für ein neues Plugin erstellen
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Aufbau eines Plugins

Ein Plugin ist ein npm-Paket mit dem Namen `omniroute-cmd-<name>` (oder `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # muss "type": "module" und "main": "index.mjs" enthalten
├── index.mjs        # exportiert register(program, ctx) sowie optional meta
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

## Plugin-Kontext-API

Das an `register(program, ctx)` übergebene `ctx`-Objekt:

| Eigenschaft                  | Typ              | Beschreibung                                                          |
| ---------------------------- | ---------------- | --------------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Authentifizierter Abruf vom OmniRoute-Server                          |
| `ctx.emit(data, opts)`       | `function`       | Ausgabe als Tabelle/json/jsonl/csv entsprechend der Option `--output` |
| `ctx.t(key)`                 | `async function` | Nachschlagen von i18n-Übersetzungen                                   |
| `ctx.withSpinner(label, fn)` | `async function` | Umschließt die asynchrone Funktion mit einem ora-Spinner              |
| `ctx.baseUrl`                | `string`         | Aufgelöste Basis-URL                                                  |
| `ctx.apiKey`                 | `string \| null` | API-Schlüssel, sofern angegeben                                       |

## Erkennung

Plugins werden an folgenden Orten gesucht:

1. `~/.omniroute/plugins/<name>/` — benutzerlokale Installationen
2. Umgebungsvariable `OMNIROUTE_PLUGIN_PATH` — benutzerdefiniertes Verzeichnis

Beide gelten **nur für die CLI**. Die serverseitige Plugin-Laufzeitumgebung (die Marketplace-/`plugin.json`-Plugins, die innerhalb des Proxys ausgeführt werden) besitzt einen eigenen Scanner mit einer eigenen Überschreibung namens `OMNIROUTE_PLUGINS_DIR` — siehe
[PLUGIN_MARKETPLACE.md → Plugin-Verzeichnis](./PLUGIN_MARKETPLACE.md#plugin-directory).
Das Festlegen der einen Option hat keine Auswirkungen auf die andere.

Fehler beim Laden werden abgefangen und als Warnungen ausgegeben — ein defektes Plugin bringt die CLI niemals zum Absturz.

## Sicherheit

Plugins werden mit denselben Node.js-Prozessberechtigungen wie `omniroute` ausgeführt. Installiere nur Plugins aus Quellen, denen du vertraust. `omniroute plugin install` zeigt eine ausdrückliche Warnung an und erfordert entweder `--yes` oder eine interaktive Bestätigung.

## Veröffentlichung

1. Stelle sicher, dass `package.json` den Eintrag `"keywords": ["omniroute-plugin"]` enthält
2. Führe `npm publish` wie gewohnt aus
3. Benutzer finden Plugins über `omniroute plugin search <query>` (durchsucht die npm-Registry)

## Beispiel-Plugin

Unter [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) findest du ein minimales funktionsfähiges Beispiel mit `meta` und `register()`.
