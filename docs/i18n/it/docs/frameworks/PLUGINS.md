# OmniRoute CLI Plugin System (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Estendi la CLI `omniroute` senza modificarne il core. I plugin seguono la convenzione di denominazione `omniroute-cmd-*`, analogamente a `gh extension` o `kubectl plugin`.

## Avvio rapido

```bash
# Installa un plugin da npm
omniroute plugin install stripe

# Installa un plugin locale in fase di sviluppo
omniroute plugin install ./my-plugin

# Elenca i plugin installati
omniroute plugin list

# Genera la struttura di un nuovo plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Struttura di un plugin

Un plugin è un pacchetto npm denominato `omniroute-cmd-<name>` (oppure `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # deve contenere "type": "module" e "main": "index.mjs"
├── index.mjs        # esporta register(program, ctx) + meta opzionale
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
  description: "Il mio plugin per OmniRoute",
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

## API del contesto del plugin

L'oggetto `ctx` passato a `register(program, ctx)`:

| Proprietà                    | Tipo             | Descrizione                                               |
| ---------------------------- | ---------------- | --------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Fetch autenticata verso il server OmniRoute               |
| `ctx.emit(data, opts)`       | `function`       | Output in table/json/jsonl/csv in base al flag `--output` |
| `ctx.t(key)`                 | `async function` | Ricerca della traduzione i18n                             |
| `ctx.withSpinner(label, fn)` | `async function` | Esegue una funzione asincrona con uno spinner ora         |
| `ctx.baseUrl`                | `string`         | URL di base risolto                                       |
| `ctx.apiKey`                 | `string \| null` | Chiave API, se fornita                                    |

## Individuazione

I plugin vengono individuati nelle seguenti posizioni:

1. `~/.omniroute/plugins/<name>/` — installazioni locali dell'utente
2. Variabile d'ambiente `OMNIROUTE_PLUGIN_PATH` — directory personalizzata

Entrambe sono **esclusive della CLI**. Il runtime dei plugin lato server (i plugin del marketplace/`plugin.json`
eseguiti all'interno del proxy) dispone di un proprio scanner con una propria impostazione di sostituzione,
`OMNIROUTE_PLUGINS_DIR` — consulta
[PLUGIN_MARKETPLACE.md → Directory dei plugin](./PLUGIN_MARKETPLACE.md#plugin-directory).
L'impostazione di una non influisce sull'altra.

Gli errori di caricamento vengono intercettati e visualizzati come avvisi: un plugin non funzionante non causa mai l'arresto anomalo della CLI.

## Sicurezza

I plugin vengono eseguiti con gli stessi privilegi di processo Node.js di `omniroute`. Installa esclusivamente plugin provenienti da fonti attendibili. `omniroute plugin install` mostra un avviso esplicito e richiede `--yes` oppure una conferma interattiva.

## Pubblicazione

1. Assicurati che `package.json` contenga `"keywords": ["omniroute-plugin"]`
2. Esegui normalmente `npm publish`
3. Gli utenti possono effettuare la ricerca tramite `omniroute plugin search <query>` (esegue la ricerca nel registro npm)

## Plugin di esempio

Consulta [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) per un esempio minimo funzionante con `meta` + `register()`.
