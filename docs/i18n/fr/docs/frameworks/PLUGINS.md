# OmniRoute CLI Plugin System (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Étendez la CLI `omniroute` sans modifier son cœur. Les plugins suivent la convention de nommage `omniroute-cmd-*`, à l’instar de `gh extension` ou `kubectl plugin`.

## Démarrage rapide

```bash
# Installer un plugin depuis npm
omniroute plugin install stripe

# Installer un plugin local en cours de développement
omniroute plugin install ./my-plugin

# Lister les plugins installés
omniroute plugin list

# Générer la structure d’un nouveau plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomie d’un plugin

Un plugin est un package npm nommé `omniroute-cmd-<name>` (ou `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # doit contenir "type": "module" et "main": "index.mjs"
├── index.mjs        # exporte register(program, ctx) et, facultativement, meta
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
  description: "Mon plugin pour OmniRoute",
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

## API de contexte des plugins

L’objet `ctx` transmis à `register(program, ctx)` :

| Propriété                    | Type             | Description                                                     |
| ---------------------------- | ---------------- | --------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Requête authentifiée vers le serveur OmniRoute                  |
| `ctx.emit(data, opts)`       | `function`       | Sortie au format table/json/jsonl/csv selon l’option `--output` |
| `ctx.t(key)`                 | `async function` | Recherche de traduction i18n                                    |
| `ctx.withSpinner(label, fn)` | `async function` | Encapsule une fonction asynchrone avec un indicateur ora        |
| `ctx.baseUrl`                | `string`         | URL de base résolue                                             |
| `ctx.apiKey`                 | `string \| null` | Clé API, si fournie                                             |

## Découverte

Les plugins sont découverts depuis :

1. `~/.omniroute/plugins/<name>/` — installations locales de l’utilisateur
2. Variable d’environnement `OMNIROUTE_PLUGIN_PATH` — répertoire personnalisé

Ces deux mécanismes sont **réservés à la CLI**. L’environnement d’exécution des plugins côté serveur (les plugins de la marketplace/`plugin.json`
qui s’exécutent dans le proxy) dispose de son propre analyseur et de son propre paramètre de substitution,
`OMNIROUTE_PLUGINS_DIR` — consultez
[PLUGIN_MARKETPLACE.md → Répertoire des plugins](./PLUGIN_MARKETPLACE.md#plugin-directory).
La définition de l’un n’affecte pas l’autre.

Les erreurs de chargement sont interceptées et affichées sous forme d’avertissements — un plugin défectueux ne fait jamais planter la CLI.

## Sécurité

Les plugins s’exécutent avec les mêmes privilèges de processus Node.js que `omniroute`. Installez uniquement des plugins provenant de sources fiables. `omniroute plugin install` affiche un avertissement explicite et nécessite l’option `--yes` ou une confirmation interactive.

## Publication

1. Vérifiez que `package.json` contient `"keywords": ["omniroute-plugin"]`
2. Exécutez `npm publish` normalement
3. Les utilisateurs peuvent effectuer une recherche avec `omniroute plugin search <query>` (recherche dans le registre npm)

## Exemple de plugin

Consultez [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) pour obtenir un exemple fonctionnel minimal avec `meta` + `register()`.
