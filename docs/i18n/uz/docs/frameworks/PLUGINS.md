# OmniRoute CLI Plugin System (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` CLI vositasini uning yadrosini oʻzgartirmasdan kengaytiring. Plaginlar `gh extension` yoki `kubectl plugin`ga oʻxshash tarzda `omniroute-cmd-*` nomlash qoidasiga amal qiladi.

## Tezkor boshlash

```bash
# npm'dan plaginni oʻrnating
omniroute plugin install stripe

# Ishlab chiqish jarayonidagi lokal plaginni oʻrnating
omniroute plugin install ./my-plugin

# Oʻrnatilgan plaginlarni roʻyxatlang
omniroute plugin list

# Yangi plagin shablonini yarating
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Plagin tuzilishi

Plagin `omniroute-cmd-<name>` (yoki `@scope/omniroute-cmd-<name>`) nomli npm paketidir.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" va "main": "index.mjs" boʻlishi shart
├── index.mjs        # register(program, ctx) va ixtiyoriy meta'ni eksport qiladi
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
  description: "OmniRoute uchun plaginim",
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

## Plagin konteksti API'si

`register(program, ctx)`ga uzatiladigan `ctx` obyekti:

| Xususiyat                    | Tur              | Tavsif                                                                 |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute serveriga autentifikatsiyalangan soʻrov                      |
| `ctx.emit(data, opts)`       | `function`       | `--output` bayrogʻiga muvofiq table/json/jsonl/csv formatida chiqarish |
| `ctx.t(key)`                 | `async function` | i18n tarjimasini izlash                                                |
| `ctx.withSpinner(label, fn)` | `async function` | Asinxron fn'ni ora spinneri bilan oʻraydi                              |
| `ctx.baseUrl`                | `string`         | Aniqlangan asosiy URL                                                  |
| `ctx.apiKey`                 | `string \| null` | Taqdim etilgan boʻlsa, API kaliti                                      |

## Aniqlash

Plaginlar quyidagi joylardan aniqlanadi:

1. `~/.omniroute/plugins/<name>/` — foydalanuvchining lokal oʻrnatmalari
2. `OMNIROUTE_PLUGIN_PATH` muhit oʻzgaruvchisi — maxsus katalog

Ikkalasi ham **faqat CLI uchun**. Server tomonidagi plaginlar ish muhiti (proksi ichida ishlaydigan marketplace/`plugin.json`
plaginlari) oʻzining alohida skaneri va alohida qayta belgilash sozlamasi —
`OMNIROUTE_PLUGINS_DIR`ga ega; qarang:
[PLUGIN_MARKETPLACE.md → Plagin katalogi](./PLUGIN_MARKETPLACE.md#plugin-directory).
Ulardan birini sozlash boshqasiga taʼsir qilmaydi.

Yuklash xatolari ushlanadi va ogohlantirish sifatida chiqariladi — buzilgan plagin hech qachon CLI ishini toʻxtatmaydi.

## Xavfsizlik

Plaginlar `omniroute` bilan bir xil Node.js jarayoni huquqlari asosida ishlaydi. Faqat ishonchli manbalardagi plaginlarni oʻrnating. `omniroute plugin install` aniq ogohlantirishni koʻrsatadi va `--yes` bayrogʻini yoki interaktiv tasdiqlashni talab qiladi.

## Nashr qilish

1. `package.json` faylida `"keywords": ["omniroute-plugin"]` mavjudligiga ishonch hosil qiling
2. Odatdagidek `npm publish` buyrugʻini bajaring
3. Foydalanuvchilar `omniroute plugin search <query>` orqali topadi (npm reyestridan qidiradi)

## Namuna plagin

`meta` + `register()` bilan ishlaydigan minimal namuna uchun [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs)ga qarang.
