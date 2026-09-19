# OmniRoute CLI Plugin System (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` च्या कोरमध्ये बदल न करता त्याचा CLI विस्तारित करा. प्लगइन `omniroute-cmd-*` नामकरण पद्धतीचे पालन करतात, जे `gh extension` किंवा `kubectl plugin` सारखे आहे.

## द्रुत प्रारंभ

```bash
# npm वरून प्लगइन स्थापित करा
omniroute plugin install stripe

# विकासाधीन स्थानिक प्लगइन स्थापित करा
omniroute plugin install ./my-plugin

# स्थापित प्लगइनची सूची दाखवा
omniroute plugin list

# नवीन प्लगइनचा आराखडा तयार करा
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## प्लगइनची रचना

प्लगइन हे `omniroute-cmd-<name>` (किंवा `@scope/omniroute-cmd-<name>`) नावाचे npm पॅकेज असते.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" आणि "main": "index.mjs" असणे आवश्यक आहे
├── index.mjs        # register(program, ctx) आणि पर्यायी meta निर्यात करते
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
  description: "OmniRoute साठी माझे प्लगइन",
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

## प्लगइन संदर्भ API

`register(program, ctx)` ला दिले जाणारे `ctx` ऑब्जेक्ट:

| गुणधर्म                      | प्रकार           | वर्णन                                                   |
| ---------------------------- | ---------------- | ------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute सर्व्हरकडे प्रमाणीकरण केलेली fetch विनंती     |
| `ctx.emit(data, opts)`       | `function`       | `--output` फ्लॅगनुसार table/json/jsonl/csv मध्ये आउटपुट |
| `ctx.t(key)`                 | `async function` | i18n भाषांतर शोध                                        |
| `ctx.withSpinner(label, fn)` | `async function` | async fn ला ora spinner मध्ये गुंडाळते                  |
| `ctx.baseUrl`                | `string`         | निर्धारित केलेला मूळ URL                                |
| `ctx.apiKey`                 | `string \| null` | दिली असल्यास API की                                     |

## शोध

प्लगइन पुढील ठिकाणांमधून शोधले जातात:

1. `~/.omniroute/plugins/<name>/` — वापरकर्त्याच्या स्थानिक स्थापना
2. `OMNIROUTE_PLUGIN_PATH` env var — सानुकूल निर्देशिका

दोन्ही **केवळ CLI साठी** आहेत. सर्व्हर-साइड प्लगइन रनटाइमला (प्रॉक्सीमध्ये चालणारे marketplace/`plugin.json`
प्लगइन) स्वतःचा स्कॅनर आणि स्वतःचे ओव्हरराइड,
`OMNIROUTE_PLUGINS_DIR` आहे — पाहा
[PLUGIN_MARKETPLACE.md → प्लगइन निर्देशिका](./PLUGIN_MARKETPLACE.md#plugin-directory).
एक सेट केल्याने दुसऱ्यावर परिणाम होत नाही.

लोडिंगमधील त्रुटी पकडल्या जातात आणि इशाऱ्यांच्या स्वरूपात दाखवल्या जातात — बिघडलेले प्लगइन कधीही CLI क्रॅश करत नाही.

## सुरक्षा

प्लगइन `omniroute` प्रमाणेच Node.js प्रक्रियेच्या विशेषाधिकारांसह चालतात. फक्त तुमचा विश्वास असलेल्या स्रोतांमधूनच प्लगइन स्थापित करा. `omniroute plugin install` स्पष्ट इशारा दाखवते आणि `--yes` किंवा परस्परसंवादी पुष्टीकरण आवश्यक करते.

## प्रकाशित करणे

1. `package.json` मध्ये `"keywords": ["omniroute-plugin"]` असल्याची खात्री करा
2. नेहमीप्रमाणे `npm publish` चालवा
3. वापरकर्ते `omniroute plugin search <query>` द्वारे शोधतात (npm registry मध्ये शोधते)

## उदाहरण प्लगइन

`meta` + `register()` असलेल्या किमान कार्यरत उदाहरणासाठी [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) पाहा.
