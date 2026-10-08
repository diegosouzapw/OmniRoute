# Notion Context Source (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **منبع حقیقت:** `src/lib/notion/api.ts` (کلاینت REST)، `src/lib/db/notion.ts`
> (ماندگاری توکن)، `open-sse/mcp-server/tools/notionTools.ts` (۶ ابزار MCP)،
> `src/app/api/settings/notion/route.ts` (API تنظیمات). ثبت ابزارها و اتصال محدودههای دسترسی
> در `open-sse/mcp-server/server.ts` قرار دارد.

## چیست

OmniRoute میتواند به یک فضای کاری **Notion** بهعنوان **منبع زمینه** متصل شود — یک پایگاه دانش
خواندنی/نوشتنی که عاملها از طریق سرور MCP داخلی به آن دسترسی پیدا میکنند. پس از پیکربندی
توکن یکپارچهسازی Notion، ابزارهای MCP به یک LLM امکان میدهند صفحات و پایگاههای داده را جستوجو کند،
محتوای صفحات و درخت بلوکها را بخواند، پایگاههای داده را با فیلترها/مرتبسازیها کوئری کند و بلوکهای
جدید بیفزاید — همه این عملیات از طریق OmniRoute واسطهگری میشوند (با تلاش مجدد، مهلت زمانی و
طبقهبندی خطا) تا مدل هرگز مستقیماً با API نُوشن در تماس نباشد.

این یکپارچهسازی، پوششی سبک و مقاوم بر روی API رسمی REST نُوشن
(`https://api.notion.com/v1`، `Notion-Version: 2026-03-11`) است. کلاینت
(`src/lib/notion/api.ts`) قابلیتهای زیر را اضافه میکند:

- **تلاش مجدد با پسروی نمایی** (تا ۳ تلاش) برای `429` و `5xx`.
- **مهلت زمانی ۵۵ ثانیهای درخواست** از طریق `AbortController`.
- **طبقهبندی نوعدار خطاها** — `NotionAuthError` (401/403)،
  `NotionNotFoundError` (404)، `NotionRateLimitError` (429، با رعایت راهنماییهای `retry after`)،
  `NotionValidationError` (400/409)، `NotionServerError` (5xx)،
  `NotionTimeoutError`.
- **پاکسازی پیامها** که پیش از نمایش، قطعههای شبیه به ردپای پشته را حذف میکند.

## راهاندازی

برای توکن Notion **هیچ متغیر محیطیای وجود ندارد** — این توکن از طریق
`src/lib/db/notion.ts` در جدول SQLite با نام `key_value` (فضای نام `notion`، کلید
`integration_token`) ذخیره میشود. آن را از زبانه **Context Sources** در داشبورد Endpoint
(`NotionSourceCard` در کنار `ObsidianSourceCard`) یا از طریق API تنظیمات REST پیکربندی کنید.

> [!NOTE]
> این توکن، یک **توکن یکپارچهسازی داخلی Notion** است. یک یکپارچهسازی در
> <https://www.notion.com/my-integrations> ایجاد کنید، سپس صفحات/پایگاههای دادهای را که میخواهید
> OmniRoute به آنها دسترسی داشته باشد با آن یکپارچهسازی به اشتراک بگذارید (مدل مجوزدهی Notion
> مبتنی بر اشتراکگذاری است، نه کل فضای کاری).

### پیکربندی از طریق REST

```bash
# ذخیره و اعتبارسنجی توکن یکپارچهسازی (POST با اجرای یک جستوجوی آزمایشی اعتبارسنجی میکند)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# بررسی وضعیت اتصال
curl http://localhost:20128/api/settings/notion

# قطع اتصال (توکن ذخیرهشده را پاک میکند)
curl -X DELETE http://localhost:20128/api/settings/notion
```

هر سه متد به احراز هویت داشبورد (`isAuthenticated`) نیاز دارند. در `POST`،
OmniRoute توکن را ذخیره میکند و بلافاصله یک جستوجوی آزمایشی با ۱ نتیجه اجرا میکند؛ اگر Notion
یک شیء خطا بازگرداند، توکن پاک میشود و فراخوانی با `400` شکست میخورد.

## ابزارهای MCP (۶)

در `open-sse/mcp-server/tools/notionTools.ts` تعریف شدهاند. توکن هنگام فراخوانی
از طریق `getNotionToken()` دریافت میشود؛ اگر توکنی پیکربندی نشده باشد، ابزار خطای
`"توکن یکپارچهسازی Notion پیکربندی نشده است. آن را در Settings > Context Sources تنظیم کنید."`
را ایجاد میکند.

| ابزار                        | محدوده دسترسی  | توضیحات                                                                                             |
| ---------------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | جستوجوی صفحات و پایگاههای داده با کوئری متنی (عنوانها، شناسهها و URLها را برمیگرداند). صفحهبندیشده. |
| `notion_get_page`            | `read:notion`  | دریافت محتوا و فراداده یک صفحه بر اساس شناسه آن.                                                    |
| `notion_list_block_children` | `read:notion`  | فهرستکردن تمام بلوکهای فرزند یک بلوک یا صفحه (درخت بلوک). صفحهبندیشده.                              |
| `notion_query_database`      | `read:notion`  | کوئری یک پایگاه داده با `filter` و `sorts` اختیاری (قالب API نُوشن). صفحهبندیشده.                   |
| `notion_get_database`        | `read:notion`  | دریافت طرحواره/فراداده یک پایگاه داده بر اساس شناسه.                                                |
| `notion_append_blocks`       | `write:notion` | افزودن بلوکهای فرزند به یک بلوک یا صفحه موجود (حداکثر ۱۰۰ بلوک در هر درخواست).                      |

### پارامترهای ورودی

- `notion_search` — `query` (۱ تا ۵۰۰ نویسه)، `pageSize` (۱ تا ۱۰۰، پیشفرض ۲۰)،
  `startCursor` (اختیاری).
- `notion_get_page` — `pageId` (هگز ۳۲ نویسهای یا UUID).
- `notion_list_block_children` — `blockId`، `pageSize` (۱ تا ۱۰۰، پیشفرض ۵۰)،
  `startCursor` (اختیاری).
- `notion_query_database` — `databaseId`، `filter` (اختیاری، با قالب فیلتر Notion)،
  `sorts` (آرایه اختیاری)، `pageSize` (۱ تا ۱۰۰، پیشفرض ۵۰)، `startCursor` (اختیاری).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`، `children` (آرایهای از اشیای بلوک)،
  `after` (موقعیت اختیاری).

### محدودههای دسترسی

ابزارهای خواندن به `read:notion` و ابزار نوشتن به `write:notion` نیاز دارند.
محدودههای دسترسی توسط `withScopeEnforcement()` در
`open-sse/mcp-server/server.ts` تنها زمانی اعمال میشوند که `OMNIROUTE_MCP_ENFORCE_SCOPES=true` باشد؛
محدودههای مجاز فراخواننده از `OMNIROUTE_MCP_SCOPES` (جداشده با ویرگول) یا زمینه محدوده دسترسی
کلید API احرازهویتشده گرفته میشوند. برای مشاهده مدل کامل محدوده دسترسی به
[MCP-SERVER.md](./MCP-SERVER.md) مراجعه کنید.

## نقاط پایانی

| متد      | مسیر                   | هدف                                  |
| -------- | ---------------------- | ------------------------------------ |
| `GET`    | `/api/settings/notion` | برگرداندن `{ connected, hasToken }`. |
| `POST`   | `/api/settings/notion` | ذخیره و اعتبارسنجی توکن یکپارچهسازی. |
| `DELETE` | `/api/settings/notion` | قطع اتصال (پاککردن توکن ذخیرهشده).   |

> اینها مسیرهای تنظیمات داشبورد هستند. **هیچ نقطه پایانی عمومی پراکسی Notion در
> `/v1` وجود ندارد** — دسترسی به Notion منحصراً از طریق ابزارهای MCP بالا انجام میشود.

## موارد استفاده

- **پاسخهای مبتنی بر دانش** — به یک عامل اجازه دهید فضای کاری را با `notion_search`
  جستوجو کند و پیش از پاسخدادن، نتیجه برتر را با `notion_get_page` دریافت کند تا
  پاسخها به مستندات داخلی واقعی ارجاع دهند.
- **گردشکارهای مبتنی بر پایگاه داده** — یک پایگاه داده وظایف/CRM را با
  `notion_query_database` و فیلترها + مرتبسازیها واکشی کنید، سپس ردیفها را خلاصه یا اولویتبندی کنید.
- **بازنویسی / ثبت گزارش** — از `notion_append_blocks` برای افزودن یادداشتهای جلسه، خلاصههای
  اجرا یا خروجی عامل به یک صفحه موجود استفاده کنید (فقط افزودن؛ بدون ویرایشهای مخرب).
- **کاوش ساختار** — از `notion_list_block_children` برای پیمایش درخت بلوکهای یک صفحه
  یا از `notion_get_database` برای کشف طرحواره ویژگیهای یک پایگاه داده پیش از پرسوجوی آن استفاده کنید.

## مرتبط

- [سرور MCP](./MCP-SERVER.md) — انتقالها، اعمال محدوده و فهرست کامل ابزارها.
- [منبع زمینه Obsidian](./OBSIDIAN_CONTEXT.md) — دیگر منبع زمینه داخلی.
- [سیستم حافظه](./MEMORY.md) — حافظه پایدار مکالمهای (لایه زمینه مکمل
  که بهجای واکشی با ابزار، بهصورت خودکار تزریق میشود).
