# OmniRoute CLI Plugin System (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

وسّع واجهة سطر الأوامر `omniroute` دون تعديل نواتها. تتبع الإضافات اصطلاح التسمية `omniroute-cmd-*`، على غرار `gh extension` أو `kubectl plugin`.

## البدء السريع

```bash
# تثبيت إضافة من npm
omniroute plugin install stripe

# تثبيت إضافة محلية قيد التطوير
omniroute plugin install ./my-plugin

# عرض الإضافات المثبتة
omniroute plugin list

# إنشاء هيكل إضافة جديدة
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## بنية الإضافة

الإضافة هي حزمة npm باسم `omniroute-cmd-<name>` (أو `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # يجب أن يحتوي على "type": "module" و"main": "index.mjs"
├── index.mjs        # يصدّر register(program, ctx) وmeta اختيارية
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
  description: "إضافتي لـ OmniRoute",
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

## واجهة API لسياق الإضافة

كائن `ctx` الممرّر إلى `register(program, ctx)`:

| الخاصية                      | النوع            | الوصف                                                    |
| ---------------------------- | ---------------- | -------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | طلب جلب موثّق إلى خادم OmniRoute                         |
| `ctx.emit(data, opts)`       | `function`       | إخراج بصيغة table/json/jsonl/csv وفقًا للخيار `--output` |
| `ctx.t(key)`                 | `async function` | البحث عن ترجمة i18n                                      |
| `ctx.withSpinner(label, fn)` | `async function` | يغلّف الدالة غير المتزامنة بمؤشر تحميل ora               |
| `ctx.baseUrl`                | `string`         | عنوان URL الأساسي الذي جرى تحديده                        |
| `ctx.apiKey`                 | `string \| null` | مفتاح API إذا تم توفيره                                  |

## الاكتشاف

يتم اكتشاف الإضافات من:

1. `~/.omniroute/plugins/<name>/` — عمليات التثبيت المحلية للمستخدم
2. متغير البيئة `OMNIROUTE_PLUGIN_PATH` — دليل مخصص

كلاهما **خاص بواجهة سطر الأوامر فقط**. يمتلك وقت تشغيل الإضافات على جانب الخادم (إضافات السوق/`plugin.json`
التي تعمل داخل الوكيل) أداة الفحص الخاصة به مع إعداد التجاوز الخاص به،
`OMNIROUTE_PLUGINS_DIR` — راجع
[PLUGIN_MARKETPLACE.md ← دليل الإضافات](./PLUGIN_MARKETPLACE.md#plugin-directory).
لا يؤثر تعيين أحدهما في الآخر.

يتم التقاط أخطاء التحميل وعرضها كتحذيرات — فلا تؤدي أي إضافة معطّلة إلى تعطّل واجهة سطر الأوامر.

## الأمان

تعمل الإضافات بامتيازات عملية Node.js نفسها الخاصة بـ `omniroute`. لا تثبّت سوى الإضافات من مصادر تثق بها. يعرض `omniroute plugin install` تحذيرًا صريحًا ويتطلب `--yes` أو تأكيدًا تفاعليًا.

## النشر

1. تأكد من أن `package.json` يحتوي على `"keywords": ["omniroute-plugin"]`
2. نفّذ `npm publish` كالمعتاد
3. يمكن للمستخدمين اكتشاف الإضافات عبر `omniroute plugin search <query>` (يبحث في سجل npm)

## مثال على إضافة

راجع [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) للاطلاع على مثال عملي بسيط يتضمن `meta` و`register()`.
