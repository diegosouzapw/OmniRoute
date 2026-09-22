# OmniRoute CLI Plugin System (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` CLI-ஐ அதன் மையத்தை மாற்றாமல் விரிவாக்குங்கள். `gh extension` அல்லது `kubectl plugin` போன்றே, செருகுநிரல்கள் `omniroute-cmd-*` பெயரிடல் மரபைப் பின்பற்றுகின்றன.

## விரைவான தொடக்கம்

```bash
# npm-இலிருந்து ஒரு செருகுநிரலை நிறுவவும்
omniroute plugin install stripe

# உருவாக்கத்தில் உள்ள ஒரு உள்ளூர் செருகுநிரலை நிறுவவும்
omniroute plugin install ./my-plugin

# நிறுவப்பட்ட செருகுநிரல்களைப் பட்டியலிடவும்
omniroute plugin list

# ஒரு புதிய செருகுநிரலுக்கான அடிப்படை அமைப்பை உருவாக்கவும்
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## செருகுநிரலின் கட்டமைப்பு

ஒரு செருகுநிரல் என்பது `omniroute-cmd-<name>` (அல்லது `@scope/omniroute-cmd-<name>`) என்ற பெயருடைய npm தொகுப்பாகும்.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" மற்றும் "main": "index.mjs" ஆகியவை இருக்க வேண்டும்
├── index.mjs        # register(program, ctx) மற்றும் விருப்பத்திற்குரிய meta-வை export செய்கிறது
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

## செருகுநிரல் சூழல் API

`register(program, ctx)`-க்கு அனுப்பப்படும் `ctx` பொருள்:

| பண்பு                        | வகை              | விளக்கம்                                                     |
| ---------------------------- | ---------------- | ------------------------------------------------------------ |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute சேவையகத்திற்கான அங்கீகரிக்கப்பட்ட fetch            |
| `ctx.emit(data, opts)`       | `function`       | `--output` கொடிக்கேற்ப table/json/jsonl/csv வடிவில் வெளியீடு |
| `ctx.t(key)`                 | `async function` | i18n மொழிபெயர்ப்புத் தேடல்                                   |
| `ctx.withSpinner(label, fn)` | `async function` | async fn-ஐ ora spinner மூலம் பொதிகிறது                       |
| `ctx.baseUrl`                | `string`         | தீர்மானிக்கப்பட்ட அடிப்படை URL                               |
| `ctx.apiKey`                 | `string \| null` | வழங்கப்பட்டிருந்தால் API விசை                                |

## கண்டறிதல்

செருகுநிரல்கள் பின்வரும் இடங்களிலிருந்து கண்டறியப்படுகின்றன:

1. `~/.omniroute/plugins/<name>/` — பயனர்-உள்ளமை நிறுவல்கள்
2. `OMNIROUTE_PLUGIN_PATH` env var — தனிப்பயன் கோப்பகம்

இரண்டுமே **CLI-க்கு மட்டுமே** உரியவை. சேவையகப் பக்கச் செருகுநிரல் இயக்கச்சூழல் (proxy-க்குள் இயங்கும் marketplace/`plugin.json`
செருகுநிரல்கள்) அதன் சொந்த scanner-ஐயும் அதன் சொந்த override-ஐயும் கொண்டுள்ளது,
`OMNIROUTE_PLUGINS_DIR` — பார்க்கவும்:
[PLUGIN_MARKETPLACE.md → செருகுநிரல் கோப்பகம்](./PLUGIN_MARKETPLACE.md#plugin-directory).
ஒன்றை அமைப்பது மற்றொன்றைப் பாதிக்காது.

ஏற்றுதல் பிழைகள் பிடிக்கப்பட்டு எச்சரிக்கைகளாக அச்சிடப்படுகின்றன — பழுதான செருகுநிரல் ஒருபோதும் CLI-ஐ செயலிழக்கச் செய்யாது.

## பாதுகாப்பு

செருகுநிரல்கள் `omniroute`-க்கு உள்ள அதே Node.js செயல்முறைச் சலுகைகளுடன் இயங்குகின்றன. நீங்கள் நம்பும் மூலங்களிலிருந்து மட்டுமே செருகுநிரல்களை நிறுவுங்கள். `omniroute plugin install` ஒரு வெளிப்படையான எச்சரிக்கையைக் காட்டி, `--yes` அல்லது ஊடாடும் உறுதிப்படுத்தலைக் கோருகிறது.

## வெளியிடுதல்

1. `package.json`-இல் `"keywords": ["omniroute-plugin"]` இருப்பதை உறுதிசெய்யவும்
2. வழக்கம்போல் `npm publish`
3. பயனர்கள் `omniroute plugin search <query>` மூலம் கண்டறியலாம் (npm registry-இல் தேடுகிறது)

## எடுத்துக்காட்டு செருகுநிரல்

`meta` + `register()` கொண்ட குறைந்தபட்சமாகச் செயல்படும் எடுத்துக்காட்டிற்கு [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs)-ஐப் பார்க்கவும்.
