# OmniRoute CLI Plugin System (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` కోర్ను సవరించకుండా దాని CLIని విస్తరించండి. ప్లగిన్లు `gh extension` లేదా `kubectl plugin` మాదిరిగానే `omniroute-cmd-*` నామకరణ పద్ధతిని అనుసరిస్తాయి.

## త్వరిత ప్రారంభం

```bash
# npm నుండి ప్లగిన్ను ఇన్స్టాల్ చేయండి
omniroute plugin install stripe

# అభివృద్ధిలో ఉన్న స్థానిక ప్లగిన్ను ఇన్స్టాల్ చేయండి
omniroute plugin install ./my-plugin

# ఇన్స్టాల్ చేసిన ప్లగిన్లను జాబితా చేయండి
omniroute plugin list

# కొత్త ప్లగిన్కు ప్రాథమిక నిర్మాణాన్ని రూపొందించండి
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## ప్లగిన్ నిర్మాణం

ప్లగిన్ అనేది `omniroute-cmd-<name>` (లేదా `@scope/omniroute-cmd-<name>`) అనే పేరుతో ఉండే npm ప్యాకేజీ.

```
omniroute-cmd-myplugin/
├── package.json     # తప్పనిసరిగా "type": "module" మరియు "main": "index.mjs" ఉండాలి
├── index.mjs        # register(program, ctx) మరియు ఐచ్ఛిక metaను ఎగుమతి చేస్తుంది
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

## ప్లగిన్ కాంటెక్స్ట్ API

`register(program, ctx)`కు పంపబడే `ctx` ఆబ్జెక్ట్:

| ప్రాపర్టీ                    | రకం              | వివరణ                                                      |
| ---------------------------- | ---------------- | ---------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute సర్వర్కు ప్రామాణీకరించిన fetch                   |
| `ctx.emit(data, opts)`       | `function`       | `--output` ఫ్లాగ్ ప్రకారం table/json/jsonl/csvలో అవుట్పుట్ |
| `ctx.t(key)`                 | `async function` | i18n అనువాద శోధన                                           |
| `ctx.withSpinner(label, fn)` | `async function` | async fnను ora spinnerతో ర్యాప్ చేస్తుంది                  |
| `ctx.baseUrl`                | `string`         | పరిష్కరించబడిన బేస్ URL                                    |
| `ctx.apiKey`                 | `string \| null` | అందించబడి ఉంటే API కీ                                      |

## గుర్తింపు

ప్లగిన్లు కింది స్థానాల నుండి గుర్తించబడతాయి:

1. `~/.omniroute/plugins/<name>/` — వినియోగదారు-స్థానిక ఇన్స్టాలేషన్లు
2. `OMNIROUTE_PLUGIN_PATH` env var — అనుకూల డైరెక్టరీ

రెండూ **CLIకు మాత్రమే** వర్తిస్తాయి. సర్వర్-సైడ్ ప్లగిన్ రన్టైమ్కు (ప్రాక్సీలో అమలయ్యే మార్కెట్ప్లేస్/`plugin.json`
ప్లగిన్లు) దాని స్వంత స్కానర్ మరియు దాని స్వంత ఓవర్రైడ్
`OMNIROUTE_PLUGINS_DIR` ఉన్నాయి — చూడండి
[PLUGIN_MARKETPLACE.md → ప్లగిన్ డైరెక్టరీ](./PLUGIN_MARKETPLACE.md#plugin-directory).
ఒకదాన్ని సెట్ చేయడం మరొకదానిపై ప్రభావం చూపదు.

లోడింగ్ లోపాలు క్యాచ్ చేయబడి హెచ్చరికలుగా ముద్రించబడతాయి — పనిచేయని ప్లగిన్ ఎప్పటికీ CLIని క్రాష్ చేయదు.

## భద్రత

ప్లగిన్లు `omniroute`కు ఉన్న అవే Node.js ప్రాసెస్ అధికారాలతో అమలవుతాయి. మీరు విశ్వసించే మూలాల నుండి మాత్రమే ప్లగిన్లను ఇన్స్టాల్ చేయండి. `omniroute plugin install` స్పష్టమైన హెచ్చరికను చూపుతుంది మరియు `--yes` లేదా ఇంటరాక్టివ్ నిర్ధారణను కోరుతుంది.

## ప్రచురణ

1. `package.json`లో `"keywords": ["omniroute-plugin"]` ఉందని నిర్ధారించుకోండి
2. సాధారణ విధంగానే `npm publish` చేయండి
3. వినియోగదారులు `omniroute plugin search <query>` ద్వారా కనుగొంటారు (npm registryలో శోధిస్తుంది)

## ఉదాహరణ ప్లగిన్

`meta` + `register()`తో కూడిన కనిష్ఠంగా పనిచేసే ఉదాహరణ కోసం [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) చూడండి.
