# OmniRoute CLI Plugin System (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

გააფართოეთ `omniroute` CLI მის ბირთვში ცვლილებების შეტანის გარეშე. პლაგინები იყენებენ `omniroute-cmd-*` სახელდების წესს, `gh extension`-ის ან `kubectl plugin`-ის მსგავსად.

## სწრაფი დაწყება

```bash
# დააინსტალირეთ პლაგინი npm-დან
omniroute plugin install stripe

# დააინსტალირეთ ლოკალური პლაგინი შემუშავების პროცესში
omniroute plugin install ./my-plugin

# აჩვენეთ დაინსტალირებული პლაგინების სია
omniroute plugin list

# შექმენით ახალი პლაგინის საწყისი სტრუქტურა
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## პლაგინის სტრუქტურა

პლაგინი არის npm პაკეტი სახელად `omniroute-cmd-<name>` (ან `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # უნდა შეიცავდეს "type": "module" და "main": "index.mjs"
├── index.mjs        # ახდენს register(program, ctx)-ისა და არასავალდებულო meta-ს ექსპორტს
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
  description: "ჩემი პლაგინი OmniRoute-ისთვის",
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

## პლაგინის კონტექსტის API

`ctx` ობიექტი, რომელიც გადაეცემა `register(program, ctx)`-ს:

| თვისება                      | ტიპი             | აღწერა                                                           |
| ---------------------------- | ---------------- | ---------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | ავთენტიფიცირებული მოთხოვნა OmniRoute სერვერისადმი                |
| `ctx.emit(data, opts)`       | `function`       | გამოტანა table/json/jsonl/csv ფორმატში `--output` ალმის მიხედვით |
| `ctx.t(key)`                 | `async function` | i18n თარგმანის მოძიება                                           |
| `ctx.withSpinner(label, fn)` | `async function` | ასინქრონული fn-ის შეფუთვა ora სპინერით                           |
| `ctx.baseUrl`                | `string`         | განსაზღვრული საბაზისო URL                                        |
| `ctx.apiKey`                 | `string \| null` | API გასაღები, თუ მითითებულია                                     |

## აღმოჩენა

პლაგინების აღმოჩენა ხდება შემდეგი ადგილებიდან:

1. `~/.omniroute/plugins/<name>/` — მომხმარებლის ლოკალური ინსტალაციები
2. `OMNIROUTE_PLUGIN_PATH` გარემოს ცვლადი — მორგებული დირექტორია

ორივე **მხოლოდ CLI-სთვისაა**. სერვერის მხარეს მოქმედ პლაგინების შესრულების გარემოს (marketplace/`plugin.json`
პლაგინებს, რომლებიც პროქსის შიგნით სრულდება) აქვს საკუთარი სკანერი და საკუთარი გადამფარავი პარამეტრი,
`OMNIROUTE_PLUGINS_DIR` — იხილეთ
[PLUGIN_MARKETPLACE.md → პლაგინების დირექტორია](./PLUGIN_MARKETPLACE.md#plugin-directory).
ერთის დაყენება მეორეზე გავლენას არ ახდენს.

ჩატვირთვის შეცდომები მუშავდება და გაფრთხილებების სახით იბეჭდება — გაუმართავი პლაგინი CLI-ის მუშაობას არასოდეს წყვეტს.

## უსაფრთხოება

პლაგინები მუშაობს იმავე Node.js პროცესის პრივილეგიებით, რომლითაც `omniroute`. დააინსტალირეთ პლაგინები მხოლოდ იმ წყაროებიდან, რომლებსაც ენდობით. `omniroute plugin install` აჩვენებს მკაფიო გაფრთხილებას და მოითხოვს `--yes` პარამეტრს ან ინტერაქტიულ დადასტურებას.

## გამოქვეყნება

1. დარწმუნდით, რომ `package.json` შეიცავს `"keywords": ["omniroute-plugin"]`
2. ჩვეულებრივად გაუშვით `npm publish`
3. მომხმარებლები პოულობენ პლაგინებს `omniroute plugin search <query>`-ის მეშვეობით (ეძებს npm რეესტრში)

## პლაგინის მაგალითი

`meta` + `register()`-ის მქონე მინიმალური სამუშაო მაგალითისთვის იხილეთ [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
