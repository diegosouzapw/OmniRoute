# OmniRoute CLI Plugin System (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Utöka CLI:t `omniroute` utan att ändra dess kärna. Insticksprogram följer namnkonventionen `omniroute-cmd-*`, på liknande sätt som `gh extension` eller `kubectl plugin`.

## Snabbstart

```bash
# Installera ett insticksprogram från npm
omniroute plugin install stripe

# Installera ett lokalt insticksprogram under utveckling
omniroute plugin install ./my-plugin

# Lista installerade insticksprogram
omniroute plugin list

# Skapa grundstrukturen för ett nytt insticksprogram
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Insticksprogrammets struktur

Ett insticksprogram är ett npm-paket med namnet `omniroute-cmd-<name>` (eller `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # måste ha "type": "module" och "main": "index.mjs"
├── index.mjs        # exporterar register(program, ctx) + valfri meta
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

## Kontext-API för insticksprogram

Objektet `ctx` som skickas till `register(program, ctx)`:

| Egenskap                     | Typ              | Beskrivning                                             |
| ---------------------------- | ---------------- | ------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Autentiserad hämtning från OmniRoute-servern            |
| `ctx.emit(data, opts)`       | `function`       | Utdata i table/json/jsonl/csv enligt flaggan `--output` |
| `ctx.t(key)`                 | `async function` | Uppslagning av i18n-översättning                        |
| `ctx.withSpinner(label, fn)` | `async function` | Omsluter asynkrona fn med en ora-indikator              |
| `ctx.baseUrl`                | `string`         | Matchad bas-URL                                         |
| `ctx.apiKey`                 | `string \| null` | API-nyckel om en sådan har angetts                      |

## Identifiering

Insticksprogram identifieras från:

1. `~/.omniroute/plugins/<name>/` — användarlokala installationer
2. Miljövariabeln `OMNIROUTE_PLUGIN_PATH` — anpassad katalog

Båda är **endast för CLI:t**. Insticksprogramskörningen på serversidan (marknadsplatsens/`plugin.json`-insticksprogrammen
som körs inuti proxyn) har en egen skanner med en egen åsidosättning,
`OMNIROUTE_PLUGINS_DIR` — se
[PLUGIN_MARKETPLACE.md → Katalog för insticksprogram](./PLUGIN_MARKETPLACE.md#plugin-directory).
Att ange den ena påverkar inte den andra.

Inläsningsfel fångas upp och skrivs ut som varningar — ett trasigt insticksprogram kraschar aldrig CLI:t.

## Säkerhet

Insticksprogram körs med samma Node.js-processbehörigheter som `omniroute`. Installera endast insticksprogram från källor som du litar på. `omniroute plugin install` visar en uttrycklig varning och kräver `--yes` eller interaktiv bekräftelse.

## Publicering

1. Säkerställ att `package.json` innehåller `"keywords": ["omniroute-plugin"]`
2. Kör `npm publish` som vanligt
3. Användare hittar insticksprogram via `omniroute plugin search <query>` (söker i npm-registret)

## Exempel på insticksprogram

Se [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) för ett minimalt fungerande exempel med `meta` + `register()`.
