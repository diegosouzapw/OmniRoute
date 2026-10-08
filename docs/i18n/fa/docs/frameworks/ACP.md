# ACP registry and registered CLI launchers (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute میان **کشف CLI**، **پروتکل بومی Agent Client Protocol** و
**آداپتورهای قدیمی stdio** تفکیک قائل میشود. یافتن یک فایل اجرایی نصبشده،
احراز هویت، سازگاری مدل یا آمادگی آن برای پردازش یک پرامپت را اثبات نمیکند.

داشبورد از `GET /api/acp/agents` و `POST /api/acp/agents` برای فهرستبرداری
و ثبت عامل سفارشی استفاده میکند. اینها مسیرهای مدیریتی صرفاً محلی هستند، نه یک
API عمومی برای راهاندازی فرایندها یا ارسال پرامپتها. `AcpManager` داخلی
بهطور خودکار به یک ارائهدهنده جایگزین HTTP تبدیل نمیشود.

## قراردادهای ثبتشده

`config/cli-tools-manifest.json` منبع حقیقت برای فایلهای اجرایی راهاندازی
داخلی، آرگومانها و حالتهای بکاند است. رجیستری تعاریف خود را از این مانیفست
استخراج میکند. نتیجه تشخیص بهمدت 60 ثانیه کش میشود.

- `acp`: قرارداد Gemini دستور `gemini --experimental-acp` را اجرا میکند و
  از طریق SDK رسمی TypeScript با ACP JSON-RPC جداشده با خط جدید ارتباط برقرار
  میکند.
- `stdio-adapter`: سایر قراردادهای ثبتشده، آداپتور قدیمی با ورودی خطبهخط
  و خروجی stdout را حفظ میکنند. یک دوره دوثانیهای بدون خروجی، پاسخ آن را پایان
  میدهد. این آداپتور پشتیبانی بومی ACP را برای آن CLIها **تأیید نمیکند**.

Gemini فلگ راهاندازی را در [مرجع CLI](https://geminicli.com/docs/cli/cli-reference/)
خود مستند کرده است. کلاینت برای مقداردهی اولیه، ایجاد نشست، درخواستهای پرامپت،
اعلانها و لغو از [SDK رسمی ACP](https://github.com/agentclientprotocol/typescript-sdk)
استفاده میکند.

تعاریف عامل سفارشی همچنان قراردادهای راهاندازی تحت کنترل مدیر هستند.
ثبت یک فایل اجرایی و آرگومانهای آن، مجوزهای اجرای محلی کاربر سرور را به آن
فرایند اعطا میکند؛ ثبتنام یک محیط ایزوله نیست. بررسیهای نسخه فقط فایل اجرایی
ثبتشده و یک فلگ نسخه شناختهشده را میپذیرند.

## API داخلی راهاندازی

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // فقط متغیرهای ارائهدهنده را که عمداً به این عامل اختصاص یافتهاند، ارسال کنید.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // پاسخ را در برنامه فراخوان مصرف کنید.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` فایل اجرایی و آرگومانها را از تعریف ثبتشده
استخراج میکند. تنها گزینههای فراخوان `cwd` و `env` هستند؛ امضای قدیمی
`spawn(agentId, binary, args, env)` و بازنویسی فایل اجرایی رد میشوند.
قراردادهای راهاندازی HTTP توسط این مدیر پشتیبانی نمیشوند.

فرایند فرزند همان فهرست مجاز سیستمعامل، ترمینال، تنظیمات محلی و گواهیهای
راهاندازهای CLI را به ارث میبرد. اسرار سرور/ارائهدهنده از محیط فرایند والد
کپی نمیشوند. اعتبارنامههای موردنیاز CLI انتخابشده باید صریحاً ارسال شوند یا
از طریق احراز هویت محلی خود آن CLI فراهم شوند. فرایند فرزند همچنان مجوزهای
سیستم فایل کاربر محلی را دارد و میتواند پیکربندی خود را بخواند.

## چرخه حیات بومی و محدودیتها

1. فایل اجرایی ثبتشده را راهاندازی کنید، ACP را مقداردهی اولیه کنید و نشستی
   با ریشه در دایرکتوری کاری انتخابشده ایجاد کنید. مقداردهی اولیه محدودیت
   دهثانیهای دارد.
2. یک پرامپت ارسال کنید و اعلانهای متنی را فقط برای همان نشست جمعآوری کنید.
   تکمیلشدن با پاسخ RPC پرامپت مشخص میشود، نه با دورهای از سکوت stdout.
3. از یک مهلت زمانی واحد برای پرامپت، شامل هرگونه مقداردهی اولیه ناتمام،
   استفاده کنید؛ مقدار پیشفرض 120 ثانیه است. پرامپتهای همزمان در یک فرایند
   رد میشوند.
4. هنگام پایان مهلت بومی، `session/cancel` را امتحان کرده و فرایند را خاتمه
   دهید. یک بازه محدود 100 ms اجازه میدهد اعلان پیش از خاتمه تخلیه شود.
5. هنگامی که مقداردهی اولیه ناموفق است، اتصال بسته میشود، فرایند خارج میشود
   یا فراخوان آن را خاتمه میدهد، وضعیت انتقال را ببندید و نشست را حذف کنید.

درخواستهای مجوز ابزار رد میشوند. هیچ قابلیت کلاینت سیستم فایل یا ترمینال
اعلام نمیشود. این محدودیتها خود فایل اجرایی فرزند را ایزوله نمیکنند و
جایگزین تنظیمات مجوزدهی خود CLI نیستند.

هم متن بومی و هم stdout/stderr قدیمی حداکثر 1 MiB نویسه نگه میدارند و
جدیدترین خروجی را همراه با اعلان کوتاهسازی حفظ میکنند. هر فریم بومی روی خط
ارتباطی، پیش از تجزیه توسط SDK، به 2 MiB بایت محدود است. بافرها برای هر
پرامپت بازنشانی میشوند.

`kill(sessionId)` سیگنال SIGTERM را ارسال میکند و اگر فرایند خارج نشده باشد،
پس از پنج ثانیه SIGKILL را میفرستد. پایان مهلت پرامپت قدیمی، شنوندهها و
زمانسنجها را آزاد میکند اما نشست را برای پرامپت دیگری در دسترس باقی
میگذارد؛ فراخوانها همچنان مسئول اجرای `kill()` یا `killAll()` پس از اتمام
کار هستند.

## رویدادها و بازرسی

مدیر رویدادهای `stdout`، `stderr` و `exit` را منتشر میکند که هرکدام دارای
`sessionId` هستند. `sessionError` یک خطای انتقال پاکسازیشده را گزارش
میکند. رویداد سازگاری `error` فقط زمانی منتشر میشود که مشترکی داشته باشد،
بنابراین نبود فایل اجرایی نمیتواند باعث یک خطای مدیریتنشده EventEmitter شود.

- `getSession(sessionId)` یک نشست مدیریتشده یا `undefined` برمیگرداند.
- `getActiveSessions()` نشستهای متوقفشده یا در حال توقف را مستثنا میکند.
- `sendInput(sessionId, input)` فقط برای یک آداپتور قدیمی فعال در دسترس است؛
  ACP بومی برای محافظت از جریان JSON-RPC خود، ورودی خام را رد میکند.
- `killAll()` همه نشستهای مدیریتشده توسط آن نمونه را خاتمه میدهد.

## مرزهای اعتبارسنجی

فیکسچرهای قطعی، دستدهی بومی، خروجی متنی، مجوزهای ردشده، لغو، پرامپتهای
همزمان، مقداردهی اولیه ناموفق، خروج فرایند، محدودیتهای خروجی و جداسازی اسرار
را پوشش میدهند. رگرسیونهای موجود مربوط به بافر/شنونده قدیمی نیز همچنان
پوشش داده میشوند. این آزمونها ورود زنده به Gemini یا استنتاج موفق
ارائهدهنده را نشان نمیدهند؛ این موارد به یک آزمون دودِ مجازشده جداگانه در
محیط هدف نیاز دارند.

## مستندات مرتبط

- [پروتکلهای عامل](./AGENT_PROTOCOLS_GUIDE.md)
- [قراردادهای راهاندازی CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [ابزارهای CLI](../reference/CLI-TOOLS.md)
- [سرور A2A](./A2A-SERVER.md)
- [عاملهای ابری](./CLOUD_AGENT.md)
