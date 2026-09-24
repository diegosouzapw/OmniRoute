# OmniRoute CLI Plugin System (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

તેના કોરમાં ફેરફાર કર્યા વિના `omniroute` CLI ને વિસ્તૃત કરો. પ્લગઇન્સ `gh extension` અથવા `kubectl plugin` જેવી જ `omniroute-cmd-*` નામકરણ પરંપરાને અનુસરે છે.

## ઝડપી શરૂઆત

```bash
# npm પરથી પ્લગઇન ઇન્સ્ટોલ કરો
omniroute plugin install stripe

# ડેવલપમેન્ટ હેઠળનું સ્થાનિક પ્લગઇન ઇન્સ્ટોલ કરો
omniroute plugin install ./my-plugin

# ઇન્સ્ટોલ થયેલાં પ્લગઇન્સની યાદી જુઓ
omniroute plugin list

# નવું પ્લગઇન સ્કેફોલ્ડ કરો
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## પ્લગઇનની રચના

પ્લગઇન એ `omniroute-cmd-<name>` (અથવા `@scope/omniroute-cmd-<name>`) નામ ધરાવતું npm પૅકેજ છે.

```
omniroute-cmd-myplugin/
├── package.json     # તેમાં "type": "module" અને "main": "index.mjs" હોવા આવશ્યક છે
├── index.mjs        # register(program, ctx) અને વૈકલ્પિક meta એક્સપોર્ટ કરે છે
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
  description: "OmniRoute માટે મારું પ્લગઇન",
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

## પ્લગઇન કોન્ટેક્સ્ટ API

`register(program, ctx)` ને આપવામાં આવતો `ctx` ઑબ્જેક્ટ:

| પ્રોપર્ટી                    | પ્રકાર           | વર્ણન                                                   |
| ---------------------------- | ---------------- | ------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute સર્વર પર અધિકૃત fetch                         |
| `ctx.emit(data, opts)`       | `function`       | `--output` ફ્લૅગ અનુસાર table/json/jsonl/csv માં આઉટપુટ |
| `ctx.t(key)`                 | `async function` | i18n અનુવાદ લુકઅપ                                       |
| `ctx.withSpinner(label, fn)` | `async function` | async fn ને ora સ્પિનર વડે રૅપ કરે છે                   |
| `ctx.baseUrl`                | `string`         | નિર્ધારિત બેઝ URL                                       |
| `ctx.apiKey`                 | `string \| null` | આપવામાં આવી હોય તો API કી                               |

## શોધ

પ્લગઇન્સની શોધ આ સ્થાનોમાંથી થાય છે:

1. `~/.omniroute/plugins/<name>/` — વપરાશકર્તા-સ્થાનિક ઇન્સ્ટોલ્સ
2. `OMNIROUTE_PLUGIN_PATH` env var — કસ્ટમ ડિરેક્ટરી

બંને **માત્ર CLI માટે** છે. સર્વર-સાઇડ પ્લગઇન રનટાઇમ (પ્રોક્સીની અંદર ચાલતાં marketplace/`plugin.json`
પ્લગઇન્સ)નું પોતાનું સ્કેનર અને પોતાનું ઓવરરાઇડ,
`OMNIROUTE_PLUGINS_DIR` છે — જુઓ
[PLUGIN_MARKETPLACE.md → પ્લગઇન ડિરેક્ટરી](./PLUGIN_MARKETPLACE.md#plugin-directory).
એકને સેટ કરવાથી બીજાને અસર થતી નથી.

લોડિંગ ભૂલો પકડવામાં આવે છે અને ચેતવણીઓ તરીકે પ્રિન્ટ થાય છે — ખામીયુક્ત પ્લગઇન ક્યારેય CLI ને ક્રૅશ કરતું નથી.

## સુરક્ષા

પ્લગઇન્સ `omniroute` જેવી જ Node.js પ્રોસેસ પરવાનગીઓ સાથે ચાલે છે. ફક્ત તમે વિશ્વાસ કરતા હો તેવા સ્ત્રોતોમાંથી જ પ્લગઇન્સ ઇન્સ્ટોલ કરો. `omniroute plugin install` સ્પષ્ટ ચેતવણી બતાવે છે અને `--yes` અથવા ઇન્ટરેક્ટિવ પુષ્ટિ જરૂરી બનાવે છે.

## પ્રકાશન

1. ખાતરી કરો કે `package.json` માં `"keywords": ["omniroute-plugin"]` છે
2. સામાન્ય રીતે `npm publish` ચલાવો
3. વપરાશકર્તાઓ `omniroute plugin search <query>` દ્વારા શોધે છે (npm registry માં શોધ કરે છે)

## ઉદાહરણ પ્લગઇન

`meta` + `register()` સાથેના ન્યૂનતમ કાર્યરત ઉદાહરણ માટે [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) જુઓ.
