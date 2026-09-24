# Zed IDE Integration in Docker Environments (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

وقتی OmniRoute داخل Docker اجرا میشود، فرایند استاندارد «وارد کردن از Zed Keychain» با شکست مواجه میشود، زیرا کانتینر نمیتواند به سرویس مدیریت کلید سیستمعامل میزبان دسترسی پیدا کند (`libsecret` در Linux،‏ Keychain در macOS و Credential Manager در Windows) و دایرکتوریهای پیکربندی Zed روی فایلسیستم میزبان نیز بهطور پیشفرض داخل کانتینر قابل مشاهده نیستند.

## چرا وارد کردن از Keychain در Docker شکست میخورد

دو مشکل بازدارنده در داخل کانتینر رخ میدهد:

1. **جداسازی فایلسیستم** — تابع `isZedInstalled()` بهدنبال `~/.config/zed` در Linux،‏
   `~/Library/Application Support/Zed` در macOS یا مسیر معادل آن در Windows میگردد. این مسیرها
   روی میزبان قرار دارند و تا زمانی که صراحتاً بهصورت volume متصل نشوند، در دسترس نیستند.
2. **جداسازی IPC** — حتی وقتی دایرکتوری پیکربندی متصل شده باشد، ماژول بومی `keytar`
   از طریق یک سوکت Unix یا نشست D-Bus با سرویس مدیریت کلید سیستمعامل ارتباط برقرار میکند.
   هیچکدام از این موارد بهطور پیشفرض به داخل کانتینر پل زده نمیشوند، بنابراین خواندن اطلاعات اعتبارسنجی همیشه شکست میخورد.

OmniRoute محیط Docker را با استفاده از دو روش اکتشافی تشخیص میدهد:

- وجود `/.dockerenv` که هنگام شروع کانتینر توسط daemon مربوط به Docker نوشته میشود.
- وجود رشته `docker` در `/proc/1/cgroup` در Linux cgroup v1.

وقتی هرکدام از این روشها نتیجه مثبت داشته باشد، مسیر وارد کردن پاسخ HTTP 422 را با
`zedDockerEnvironment: true` و پیامی برمیگرداند که شما را به زبانه وارد کردن دستی توکن هدایت میکند.

## استفاده از زبانه وارد کردن دستی توکن

1. **Dashboard → Providers → Zed** را باز کنید.
2. پنل **Manual Token Import** زیر کارت وارد کردن از keychain ظاهر میشود. وقتی
   OmniRoute وجود Docker را تشخیص دهد، این پنل پس از اولین تلاش ناموفق برای
   وارد کردن از keychain بهطور خودکار باز میشود.
3. ارائهدهنده را از فهرست کشویی انتخاب کنید (OpenAI،‏ Anthropic،‏ Google،‏ Mistral،‏ xAI،
   OpenRouter یا DeepSeek).
4. کلید API را در فیلد رمز عبور جایگذاری کنید.
5. روی **Import** کلیک کنید.

کلید بهعنوان یک اتصال جدید ارائهدهنده با نام
`Zed Manual Import (<provider>)` ذخیره میشود.

## محل ذخیره کلیدهای API مربوط به Zed روی میزبان

Zed کلیدهای ارائهدهندگان هوش مصنوعی را در keychain سیستمعامل و تحت نام سرویسهایی مانند
`zed-openai`،‏ `ai.zed.openai`،‏ `zed-anthropic` و غیره ذخیره میکند. برای بازیابی آنها جهت
وارد کردن دستی، در مکانهای زیر جستوجو کنید:

**Linux**

```
~/.config/zed/settings.json
```

بخش `language_models` شامل پیکربندیهای ارائهدهندگان است. کلیدهایی که از طریق رابط کاربری
Zed در keychain ذخیره شدهاند، بهصورت متن ساده در `settings.json` قرار ندارند؛ آنها را با
یک نمایشدهنده keychain مانند GNOME Keyring / Seahorse یا با اجرای دستور زیر بازیابی کنید:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

ورودیهای keychain را میتوان با جستوجوی `zed` در **Keychain Access.app** پیدا کرد.

## گزینه اتصال Volume (پیشرفته)

میتوانید دایرکتوری پیکربندی Zed را بهصورت فقطخواندنی به کانتینر متصل کنید.
این کار مشکل keychain را برطرف نمیکند، اما ممکن است برای قابلیتهای آینده که مقادیر
غیرمحرمانه پیکربندی Zed را میخوانند، مفید باشد؛ برای مثال، ترجیحات مدل.

```yaml
# بخشی از docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # میزبان Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # میزبان macOS (بهجای مورد بالا، این خط را از حالت توضیح خارج کنید)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # قابلیت آینده: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

توجه: در حال حاضر، بازنویسی مسیر با استفاده از متغیر محیطی `ZED_CONFIG_PATH` پیادهسازی نشده است. این
قطعه بهعنوان مرجعی برای زمانی ارائه شده است که این قابلیت اضافه شود.

## API وارد کردن دستی

نقطه پایانی وارد کردن دستی را میتوان مستقیماً نیز فراخوانی کرد:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "کلید OpenAI متعلق به Zed من"   // اختیاری
}
```

در صورت موفقیت، پاسخ زیر برگردانده میشود:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## عیبیابی

| نشانه                               | علت                             | راهحل                                            |
| ----------------------------------- | ------------------------------- | ------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`  | اجرا در داخل Docker             | از زبانه وارد کردن دستی توکن استفاده کنید        |
| 404 + `zedInstalled: false`         | Zed روی میزبان نصب نشده است     | Zed را نصب کنید یا وارد کردن دستی را بهکار ببرید |
| 403 + دسترسی به keychain رد شده است | سیستمعامل دسترسی را رد کرده است | در پیام سیستمعامل مجوز لازم را اعطا کنید         |
| 404 + سرویس keychain در دسترس نیست  | `libsecret` در Linux موجود نیست | `libsecret-1-dev` را نصب کنید                    |
