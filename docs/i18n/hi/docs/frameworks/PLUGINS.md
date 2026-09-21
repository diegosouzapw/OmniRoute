# OmniRoute CLI Plugin System (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

इसके कोर में बदलाव किए बिना `omniroute` CLI का विस्तार करें। प्लगइन `omniroute-cmd-*` नामकरण परंपरा का पालन करते हैं, जो `gh extension` या `kubectl plugin` के समान है।

## त्वरित शुरुआत

```bash
# npm से प्लगइन इंस्टॉल करें
omniroute plugin install stripe

# डेवलपमेंट में स्थानीय प्लगइन इंस्टॉल करें
omniroute plugin install ./my-plugin

# इंस्टॉल किए गए प्लगइन सूचीबद्ध करें
omniroute plugin list

# नए प्लगइन का प्रारंभिक ढाँचा बनाएँ
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## प्लगइन की संरचना

प्लगइन `omniroute-cmd-<name>` (या `@scope/omniroute-cmd-<name>`) नाम वाला एक npm पैकेज होता है।

```
omniroute-cmd-myplugin/
├── package.json     # इसमें "type": "module" और "main": "index.mjs" होना अनिवार्य है
├── index.mjs        # register(program, ctx) और वैकल्पिक meta एक्सपोर्ट करता है
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
  description: "OmniRoute के लिए मेरा प्लगइन",
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

## प्लगइन कॉन्टेक्स्ट API

`register(program, ctx)` को पास किया गया `ctx` ऑब्जेक्ट:

| प्रॉपर्टी                    | प्रकार           | विवरण                                                       |
| ---------------------------- | ---------------- | ----------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute सर्वर पर प्रमाणीकृत फ़ेच                          |
| `ctx.emit(data, opts)`       | `function`       | `--output` फ़्लैग के अनुसार table/json/jsonl/csv में आउटपुट |
| `ctx.t(key)`                 | `async function` | i18n अनुवाद लुकअप                                           |
| `ctx.withSpinner(label, fn)` | `async function` | async fn को ora स्पिनर से रैप करता है                       |
| `ctx.baseUrl`                | `string`         | निर्धारित बेस URL                                           |
| `ctx.apiKey`                 | `string \| null` | प्रदान की गई API कुंजी, यदि उपलब्ध हो                       |

## खोज

प्लगइन निम्न स्थानों से खोजे जाते हैं:

1. `~/.omniroute/plugins/<name>/` — उपयोगकर्ता-स्थानीय इंस्टॉलेशन
2. `OMNIROUTE_PLUGIN_PATH` env var — कस्टम डायरेक्टरी

दोनों **केवल CLI** के लिए हैं। सर्वर-साइड प्लगइन रनटाइम (मार्केटप्लेस/`plugin.json`
प्लगइन, जो प्रॉक्सी के अंदर चलते हैं) का अपना स्कैनर और अपना ओवरराइड,
`OMNIROUTE_PLUGINS_DIR` है — देखें
[PLUGIN_MARKETPLACE.md → प्लगइन डायरेक्टरी](./PLUGIN_MARKETPLACE.md#plugin-directory)।
एक को सेट करने से दूसरे पर कोई प्रभाव नहीं पड़ता।

लोडिंग त्रुटियों को पकड़कर चेतावनियों के रूप में प्रदर्शित किया जाता है — कोई खराब प्लगइन CLI को कभी क्रैश नहीं करता।

## सुरक्षा

प्लगइन उसी Node.js प्रोसेस विशेषाधिकारों के साथ चलते हैं जिनके साथ `omniroute` चलता है। केवल विश्वसनीय स्रोतों से प्लगइन इंस्टॉल करें। `omniroute plugin install` एक स्पष्ट चेतावनी दिखाता है और इसके लिए `--yes` या इंटरैक्टिव पुष्टि आवश्यक होती है।

## प्रकाशित करना

1. सुनिश्चित करें कि `package.json` में `"keywords": ["omniroute-plugin"]` मौजूद है
2. सामान्य रूप से `npm publish` चलाएँ
3. उपयोगकर्ता `omniroute plugin search <query>` के माध्यम से खोजते हैं (npm रजिस्ट्री में खोज करता है)

## उदाहरण प्लगइन

`meta` + `register()` वाले न्यूनतम कार्यशील उदाहरण के लिए [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) देखें।
