# OmniRoute CLI Plugin System (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Paplašiniet `omniroute` CLI, nemainot tā kodolu. Spraudņi ievēro `omniroute-cmd-*` nosaukumu piešķiršanas principu, līdzīgi kā `gh extension` vai `kubectl plugin`.

## Ātrā darba sākšana

```bash
# Instalēt spraudni no npm
omniroute plugin install stripe

# Instalēt lokālu spraudni izstrādes stadijā
omniroute plugin install ./my-plugin

# Uzskaitīt instalētos spraudņus
omniroute plugin list

# Izveidot jauna spraudņa sagatavi
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Spraudņa uzbūve

Spraudnis ir npm pakotne ar nosaukumu `omniroute-cmd-<name>` (vai `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # jābūt norādītiem "type": "module" un "main": "index.mjs"
├── index.mjs        # eksportē register(program, ctx) un neobligātu meta
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
  description: "Mans OmniRoute spraudnis",
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

## Spraudņa konteksta API

`ctx` objekts, kas tiek nodots funkcijai `register(program, ctx)`:

| Īpašība                      | Tips             | Apraksts                                                          |
| ---------------------------- | ---------------- | ----------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Autentificēts pieprasījums OmniRoute serverim                     |
| `ctx.emit(data, opts)`       | `function`       | Izvade table/json/jsonl/csv formātā atbilstoši `--output` karogam |
| `ctx.t(key)`                 | `async function` | i18n tulkojuma uzmeklēšana                                        |
| `ctx.withSpinner(label, fn)` | `async function` | Ietver asinhrono fn ar ora progresa indikatoru                    |
| `ctx.baseUrl`                | `string`         | Atrisinātais bāzes URL                                            |
| `ctx.apiKey`                 | `string \| null` | API atslēga, ja tā ir norādīta                                    |

## Atklāšana

Spraudņi tiek atklāti šādās vietās:

1. `~/.omniroute/plugins/<name>/` — lietotāja lokālās instalācijas
2. `OMNIROUTE_PLUGIN_PATH` vides mainīgais — pielāgots direktorijs

Abi attiecas **tikai uz CLI**. Servera puses spraudņu izpildvidei (tirgus/`plugin.json`
spraudņiem, kas darbojas starpniekserverī) ir savs skeneris ar atsevišķu pārrakstīšanas iestatījumu
`OMNIROUTE_PLUGINS_DIR` — skatiet
[PLUGIN_MARKETPLACE.md → Spraudņu direktorijs](./PLUGIN_MARKETPLACE.md#plugin-directory).
Viena iestatīšana neietekmē otru.

Ielādes kļūdas tiek pārtvertas un izdrukātas kā brīdinājumi — bojāts spraudnis nekad neizraisa CLI avāriju.

## Drošība

Spraudņi darbojas ar tādām pašām Node.js procesa privilēģijām kā `omniroute`. Instalējiet spraudņus tikai no uzticamiem avotiem. `omniroute plugin install` parāda skaidru brīdinājumu un pieprasa `--yes` vai interaktīvu apstiprinājumu.

## Publicēšana

1. Pārliecinieties, ka `package.json` satur `"keywords": ["omniroute-plugin"]`
2. Izpildiet `npm publish` kā parasti
3. Lietotāji spraudņus var atrast ar `omniroute plugin search <query>` (meklē npm reģistrā)

## Spraudņa piemērs

Minimālu funkcionējošu piemēru ar `meta` un `register()` skatiet vietnē [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
