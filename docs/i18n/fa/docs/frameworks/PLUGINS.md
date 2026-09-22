# OmniRoute CLI Plugin System (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

CLI مربوط به `omniroute` را بدون تغییر در هستهٔ آن گسترش دهید. افزونهها از قرارداد نامگذاری `omniroute-cmd-*` پیروی میکنند؛ مشابه `gh extension` یا `kubectl plugin`.

## شروع سریع

```bash
# نصب یک افزونه از npm
omniroute plugin install stripe

# نصب یک افزونهٔ محلی در حال توسعه
omniroute plugin install ./my-plugin

# فهرستکردن افزونههای نصبشده
omniroute plugin list

# ایجاد ساختار اولیهٔ یک افزونهٔ جدید
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## ساختار افزونه

افزونه یک بستهٔ npm با نام `omniroute-cmd-<name>` (یا `@scope/omniroute-cmd-<name>`) است.

```
omniroute-cmd-myplugin/
├── package.json     # باید دارای "type": "module" و "main": "index.mjs" باشد
├── index.mjs        # register(program, ctx) و در صورت تمایل meta را صادر میکند
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
  description: "افزونهٔ من برای OmniRoute",
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

## API زمینهٔ افزونه

شیء `ctx` که به `register(program, ctx)` ارسال میشود:

| ویژگی                        | نوع              | توضیحات                                                    |
| ---------------------------- | ---------------- | ---------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | درخواست احراز هویتشده به سرور OmniRoute                    |
| `ctx.emit(data, opts)`       | `function`       | خروجی در قالب table/json/jsonl/csv بر اساس پرچم `--output` |
| `ctx.t(key)`                 | `async function` | جستوجوی ترجمهٔ i18n                                        |
| `ctx.withSpinner(label, fn)` | `async function` | اجرای تابع ناهمگام `fn` همراه با نشانگر چرخان ora          |
| `ctx.baseUrl`                | `string`         | URL پایهٔ نهاییشده                                         |
| `ctx.apiKey`                 | `string \| null` | کلید API، در صورت ارائه                                    |

## کشف افزونهها

افزونهها از مکانهای زیر کشف میشوند:

1. `~/.omniroute/plugins/<name>/` — نصبهای محلی کاربر
2. متغیر محیطی `OMNIROUTE_PLUGIN_PATH` — پوشهٔ سفارشی

هر دو **فقط مختص CLI** هستند. محیط اجرای افزونه در سمت سرور (افزونههای marketplace/`plugin.json`
که درون پراکسی اجرا میشوند) اسکنر مستقل خود را با مقدار جایگزین مخصوص خود،
`OMNIROUTE_PLUGINS_DIR`، دارد — به
[PLUGIN_MARKETPLACE.md ← پوشهٔ افزونه](./PLUGIN_MARKETPLACE.md#plugin-directory)
مراجعه کنید. تنظیم یکی بر دیگری تأثیری ندارد.

خطاهای بارگذاری مدیریت شده و بهصورت هشدار نمایش داده میشوند — یک افزونهٔ خراب هرگز باعث از کار افتادن CLI نمیشود.

## امنیت

افزونهها با همان سطح دسترسی پردازش Node.js مربوط به `omniroute` اجرا میشوند. فقط افزونههایی را از منابع مورد اعتماد نصب کنید. `omniroute plugin install` یک هشدار صریح نمایش میدهد و به `--yes` یا تأیید تعاملی نیاز دارد.

## انتشار

1. مطمئن شوید `package.json` دارای `"keywords": ["omniroute-plugin"]` است
2. طبق معمول `npm publish` را اجرا کنید
3. کاربران از طریق `omniroute plugin search <query>` افزونهها را پیدا میکنند (رجیستری npm را جستوجو میکند)

## افزونهٔ نمونه

برای مشاهدهٔ یک نمونهٔ عملی حداقلی با `meta` و `register()`، به [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) مراجعه کنید.
