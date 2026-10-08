# OmniRoute CLI Plugin System (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

यसको कोर परिमार्जन नगरी `omniroute` CLI विस्तार गर्नुहोस्। प्लगइनहरूले `gh extension` वा `kubectl plugin` जस्तै `omniroute-cmd-*` नामकरण परम्परा पालना गर्छन्।

## द्रुत सुरुवात

```bash
# npm बाट प्लगइन स्थापना गर्नुहोस्
omniroute plugin install stripe

# विकासका क्रममा स्थानीय प्लगइन स्थापना गर्नुहोस्
omniroute plugin install ./my-plugin

# स्थापित प्लगइनहरूको सूची हेर्नुहोस्
omniroute plugin list

# नयाँ प्लगइनको प्रारम्भिक संरचना तयार गर्नुहोस्
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## प्लगइनको संरचना

प्लगइन भनेको `omniroute-cmd-<name>` (वा `@scope/omniroute-cmd-<name>`) नाम भएको npm प्याकेज हो।

```
omniroute-cmd-myplugin/
├── package.json     # यसमा "type": "module" र "main": "index.mjs" हुनैपर्छ
├── index.mjs        # register(program, ctx) र वैकल्पिक meta निर्यात गर्छ
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
  description: "OmniRoute का लागि मेरो प्लगइन",
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

## प्लगइन सन्दर्भ API

`register(program, ctx)` मा पठाइने `ctx` वस्तु:

| गुण                          | प्रकार           | विवरण                                                   |
| ---------------------------- | ---------------- | ------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute सर्भरमा प्रमाणीकरणसहितको fetch                |
| `ctx.emit(data, opts)`       | `function`       | `--output` फ्ल्यागअनुसार table/json/jsonl/csv मा आउटपुट |
| `ctx.t(key)`                 | `async function` | i18n अनुवाद खोजी                                        |
| `ctx.withSpinner(label, fn)` | `async function` | async fn लाई ora spinner ले आवरण गर्छ                   |
| `ctx.baseUrl`                | `string`         | समाधान गरिएको आधार URL                                  |
| `ctx.apiKey`                 | `string \| null` | उपलब्ध गराइएको भए API कुञ्जी                            |

## खोज

प्लगइनहरू निम्न स्थानहरूबाट खोजिन्छन्:

1. `~/.omniroute/plugins/<name>/` — प्रयोगकर्ता-स्थानीय स्थापनाहरू
2. `OMNIROUTE_PLUGIN_PATH` env var — आफूअनुकूल डाइरेक्टरी

दुवै **CLI-only** हुन्। सर्भर-साइड प्लगइन रनटाइम (प्रोक्सीभित्र चल्ने marketplace/`plugin.json`
प्लगइनहरू) सँग आफ्नै ओभरराइडसहितको छुट्टै स्क्यानर छ,
`OMNIROUTE_PLUGINS_DIR` — हेर्नुहोस्
[PLUGIN_MARKETPLACE.md → प्लगइन डाइरेक्टरी](./PLUGIN_MARKETPLACE.md#plugin-directory)।
एउटा सेट गर्दा अर्कोलाई असर गर्दैन।

लोडिङ त्रुटिहरू समातिन्छन् र चेतावनीका रूपमा प्रिन्ट गरिन्छन् — बिग्रिएको प्लगइनले कहिल्यै CLI क्र्यास गर्दैन।

## सुरक्षा

प्लगइनहरू `omniroute` सरह Node.js प्रक्रिया विशेषाधिकारहरूसहित चल्छन्। आफूले विश्वास गर्ने स्रोतहरूबाट मात्र प्लगइन स्थापना गर्नुहोस्। `omniroute plugin install` ले स्पष्ट चेतावनी देखाउँछ र `--yes` वा अन्तरक्रियात्मक पुष्टिकरण आवश्यक पार्छ।

## प्रकाशन

1. `package.json` मा `"keywords": ["omniroute-plugin"]` भएको सुनिश्चित गर्नुहोस्
2. सामान्य रूपमा `npm publish` चलाउनुहोस्
3. प्रयोगकर्ताहरूले `omniroute plugin search <query>` मार्फत खोज्छन् (npm registry मा खोज्छ)

## उदाहरण प्लगइन

`meta` + `register()` सहितको न्यूनतम कार्यशील उदाहरणका लागि [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) हेर्नुहोस्।
