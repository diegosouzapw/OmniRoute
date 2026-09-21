# Egress IP Family Policy (IPv4/IPv6) (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **ترافیک خروجی را برای هر پروکسی به یک خانواده IP واحد — `auto`، `ipv4` یا `ipv6` — مقید کنید تا خروجیِ صرفاً IPv6 هرگز بهطور نامحسوس به IPv4 نشت نکند.**

> **منبع حقیقت:** `open-sse/utils/proxyFamily.ts`، `open-sse/utils/proxyDispatcher.ts`، `open-sse/utils/proxyFetch.ts`، `open-sse/utils/socksConnectorWithFamily.ts`، `open-sse/utils/proxyFamilyResolve.ts`، `src/shared/validation/schemas.ts`، `src/lib/db/proxies.ts`، `src/lib/db/upstreamProxy.ts`، `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute به هر پروکسی اجازه میدهد یک **دستورالعمل خانواده آدرس برای خروجی** داشته باشد. بهطور پیشفرض، سیستمعامل IPv4 یا IPv6 را انتخاب میکند (پشته دوگانه، «Happy Eyeballs»). وقتی این دستورالعمل را روی `ipv4` یا `ipv6` تنظیم میکنید، OmniRoute تمام اتصالهای عبوری از آن پروکسی را به خانواده انتخابشده مقید میکند و بهجای بازگشت به خانواده دیگر، **با شکست بسته** مواجه میشود.

این صفحه توضیح میدهد که این دستورالعمل چیست، چرا وجود دارد، کجا آن را پیکربندی میکنید و محیط اجرا چگونه آن را تفکیک میکند.

---

## فهرست مطالب

- [چیست](#what-it-is)
- [چرا وجود دارد](#why-it-exists)
- [سه مقدار](#the-three-values)
- [نحوه پیکربندی آن](#how-to-configure-it)
- [نحوه تفکیک `auto`](#how-auto-resolves)
- [نحوه اعمال `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [سازگاری با SOCKS5](#socks5-compatibility)
- [رفتار شکست بسته](#fail-closed-behavior)
- [مدل داده](#data-model)
- [مستندات مرتبط](#related-documentation)

---

## چیست

هر پروکسی در رجیستری دارای یک فیلد `family` با سه مقدار ممکن است که توسط یک enum از Zod اعتبارسنجی میشود:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

مقدار پیشفرض این فیلد `"auto"` است که رفتار پیشین پشته دوگانه را حفظ میکند. تنظیم آن روی `ipv4` یا `ipv6`، خانواده اتصال را برای آن پروکسی مقید میکند.

این دستورالعمل در همهجا از طریق یک تابع کمکی واحد نرمالسازی میشود تا هر مقدار ناشناختهای به `auto` تبدیل شود:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## چرا وجود دارد

این قابلیت در PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) معرفی شد. مشکلات اصلی که انگیزه ایجاد آن بودند:

| مشکل                                 | آنچه دستورالعمل برطرف میکند                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **نشت خروجیِ صرفاً IPv6 به IPv4**    | وقتی میزبان پروکسی هم رکورد A و هم رکورد AAAA دارد (یا سیستمعامل IPv4 را ترجیح میدهد)، Happy Eyeballs ممکن است اتصال خروجی را از طریق IPv4 برقرار کند، حتی اگر مسیر موردنظر شما صرفاً IPv6 باشد. مقید کردن به `ipv6` این نشت را حذف میکند.                                                                                                                   |
| **لغو ناشی از ناهنجاری خروجی مشترک** | ارائهدهندگان چرخشی (codex/openai) هنگامی که تعداد زیادی حساب با حجم بالا از طریق IP **یکسانی** خارج شوند، توکنها را لغو میکنند. کنترل خانواده خروجی بخشی از فرایند حفظ حسابها روی مسیرهای خروجی مجزا و قابلپیشبینی است (برای عیبیابی IP خروجی که در کنار این قابلیت استفاده میشود، به [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) مراجعه کنید). |
| **خروجی قطعی برای انطباق/آزمایش**    | هنگامی که باید تضمین کنید ترافیک از طریق خانواده مشخصی خارج میشود، `auto` کافی نیست.                                                                                                                                                                                                                                                                         |

این دستورالعمل عمداً **برای هر پروکسی** تعریف میشود، نه بهصورت سراسری — پروکسیهای مختلف در مجموعه شما میتوانند سیاستهای متفاوتی داشته باشند.

---

## سه مقدار

| مقدار  | برچسب رابط کاربری | رفتار                                                                                                                                                                                                  |
| ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `خودکار (دوپشته)` | سیستمعامل خانواده را انتخاب میکند. برای میزبان پراکسی که بهصورت IP صریح وارد شده است، خانواده ذاتاً توسط همان مقدار تعیین میشود؛ برای نام میزبان، هر دو خانواده قابل استفادهاند. این مقدار پیشفرض است. |
| `ipv4` | `فقط IPv4`        | اتصال را به IPv4 محدود میکند. اگر میزبان پراکسی رکورد IPv4 (A) نداشته باشد، اتصال بهصورت بسته و ایمن شکست میخورد.                                                                                      |
| `ipv6` | `فقط IPv6`        | اتصال را به IPv6 محدود میکند. اگر میزبان پراکسی رکورد IPv6 (AAAA) نداشته باشد، اتصال بهصورت بسته و ایمن شکست میخورد.                                                                                   |

رشتههای رابط کاربری در `src/i18n/messages/en.json` قرار دارند (`labelFamily`، `familyAuto`، `familyIpv4`، `familyIpv6`، `familyHint`).

---

## نحوه پیکربندی

### داشبورد

انتخابگر در فرم پراکسیِ زبانه **مخزن پراکسی** قرار دارد:

1. **داشبورد → تنظیمات → پراکسی → مخزن پراکسی** را باز کنید
2. یک پراکسی اضافه یا ویرایش کنید
3. فهرست کشویی **خانواده IP** را روی `خودکار (دوپشته)`، `فقط IPv4` یا `فقط IPv6` تنظیم کنید
4. ذخیره کنید

این کنترل توسط `ProxyRegistryManager.tsx` رندر میشود (در `proxy/ProxyPoolTab.tsx` نصب شده است).

### API

فیلد `family` بخشی از payloadهای ایجاد/بهروزرسانی رجیستری پراکسی است، توسط `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) اعتبارسنجی میشود و توسط `POST` / `PATCH /api/v1/management/proxies` مدیریت میشود:

```bash
# ایجاد یک پراکسی فقط-IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# تغییر یک پراکسی موجود به فقط-IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

همین فیلد در شیء پیکربندی درونخطی پراکسی که برای ورودیهای پراکسی بالادستی استفاده میشود نیز پذیرفته میشود (`upstream_proxy_config.family`؛ به [مدل داده](#data-model) مراجعه کنید).

برای سایر بخشهای API مربوط به عملیات CRUD و تخصیص پراکسی، به [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) مراجعه کنید.

---

## نحوه تعیین مقدار `auto`

وقتی `family` برابر با `auto` باشد، OmniRoute **هیچ** دستورالعملی اضافه نمیکند—URL پراکسی بدون تغییر استفاده میشود و خانواده اتصال بهصورت ذاتی تعیین میگردد.

هنگام ساخت URL (`proxyConfigToUrl` / `normalizeProxyUrl` در `open-sse/utils/proxyDispatcher.ts`)، یک پراکسی `auto` یک URL ساده و بدون نشانگر تولید میکند:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

هنگام dispatch (`resolveDispatcherFamily`)، مقدار `auto` به خانواده ذاتی یک میزبان IP صریح تبدیل میشود، یا برای نام میزبان به `null` تبدیل میشود (تا سیستمعامل تصمیم بگیرد):

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // برای نام میزبان null است ← سیستمعامل انتخاب میکند
  // ...
}
```

بنابراین:

- `auto` + میزبان IP صریح (`192.0.2.1` / `[2001:db8::1]`) ← خانواده همان مقدار صریح.
- `auto` + نام میزبان ← `null` ← تفکیک استاندارد دوپشته توسط سیستمعامل.

---

## نحوهٔ اعمال `ipv4` / `ipv6`

یک دستورالعمل غیر از `auto` بهصورت یک نشانگر مصنوعیِ واحد برای کوئری منتقل میشود — `?family=ipv4` یا `?family=ipv6` — که فقط یک بار به URL نرمالشدهٔ پراکسی افزوده میشود. `normalizeProxyUrl` با دقت این نشانگر را حذف و دقیقاً یک بار دوباره اضافه میکند تا هرگز تجزیهٔ پورت را مختل نکند.

هنگام ساخت dispatcher، نشانگر خوانده شده و به یک خانوادهٔ اتصال مشخص تبدیل میشود. اگر میزبان یک IP صریح از خانوادهٔ **مخالف** باشد، OmniRoute خطا میدهد (در صورت تناقض، بهصورت fail-closed عمل میشود):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

سپس خانوادهٔ مشخص روی connector تثبیت میشود:

- **پراکسیهای HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs را غیرفعال میکند تا فقط با خانوادهٔ انتخابشده اتصال برقرار شود.
- **پراکسیهای SOCKS5**: یک connector سفارشی، `socket_options: { family, autoSelectFamily: false }` را به کلاینت SOCKS منتقل میکند (به [سازگاری با SOCKS5](#socks5-compatibility) مراجعه کنید).

---

## سازگاری با SOCKS5

تثبیت خانواده با پراکسیهای SOCKS5 کار میکند، اما نسخهٔ استاندارد `fetch-socks` گزینههای سوکت موردنیاز برای تثبیت خانوادهٔ گام پراکسی را در دسترس قرار نمیدهد. OmniRoute برای این منظور connector اختصاصی خود را ارائه میکند:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

تمام dispatchهای SOCKS5، صرفنظر از مقدار `family`، از `createSocksDispatcherWithFamily` عبور میکنند (از جمله `null` / `auto` روی یک نام میزبان): `buildSocksFamilySocketOptions(null)` مقدار `{}` را برمیگرداند و همان مسیر `SocksClient.createConnection` + TLS `buildConnector` همراه با تثبیت `socket_options` استفاده میشود تا Happy Eyeballs نتواند برای یک سیاست خروجیِ مختص IPv6، IPv4 را انتخاب کند.

پشتیبانی از SOCKS5 نیز بهصورت پیشفرض فعال است (امکان انصراف با `ENABLE_SOCKS5_PROXY=false`)؛ به [PROXY_GUIDE.md ← متغیرهای محیطی](../ops/PROXY_GUIDE.md#environment-variables) مراجعه کنید.

---

## رفتار Fail-Closed

هدف اصلی این دستورالعمل، **رد کردن** اتصال بهجای بازگشت بیسروصدا به خانوادهٔ اشتباه است. دو محافظ این رفتار را اعمال میکنند:

1. **تناقض IP صریح** — دستورالعملی که با میزبان دارای IP صریح تناقض داشته باشد، هنگام ساخت dispatcher خطا میدهد (`resolveDispatcherFamily`، نمایشدادهشده در بالا).

2. **بررسی پیش از اتصال DNS برای نام میزبان** — برای پراکسی دارای نام میزبان با خانوادهٔ تثبیتشده، `proxyFetch.ts` پیش از خروج ترافیک و از طریق `assertHostnameSupportsFamily` بررسی میکند که نام میزبان واقعاً رکوردی در خانوادهٔ موردنیاز داشته باشد:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   در صورت شکست، `proxyFetch.ts` خطا را با `code = "PROXY_FAMILY_UNAVAILABLE"` و `statusCode = 503` برچسبگذاری میکند. شکست در تفکیک DNS نیز به همین شکل بهصورت fail-closed مدیریت میشود (از خروج ترافیک جلوگیری میشود).

در بررسی پیش از اتصال DNS، برای میزبانهای دارای IP صریح هیچ عملی انجام نمیشود — خانوادهٔ آنها ذاتی است و نیازی به جستوجو ندارد.

---

## مدل داده

ستون `family` توسط مهاجرت `099_proxy_family.sql` به **دو** جدول اضافه شد:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — دستورالعمل مختص هر پراکسی برای ورودیهای رجیستری (`src/lib/db/proxies.ts`). کوئریهای تفکیک، `family` را همراه با سایر ستونهای پراکسی انتخاب میکنند و مقدار مفقود یا غیررشتهای به `"auto"` تبدیل میشود.
- `upstream_proxy_config.family` — دستورالعمل مربوط به ورودیهای پراکسی بالادستی (`src/lib/db/upstreamProxy.ts`)، با همان مقدار پیشفرض `"auto"`.

هنگامی که یک شیء پراکسی تفکیکشده دارای مقدار `family` غیر از `auto` باشد، `proxyConfigToUrl` نشانگر `?family=` را اضافه میکند تا مقدار تثبیتشده در تمام مسیر تا dispatcher حفظ شود.

---

## مستندات مرتبط

> 📖 **مستندات مرتبط:**
>
> - [راهنمای پراکسی](../ops/PROXY_GUIDE.md) — سامانه کامل پراکسی: عملیات CRUD رجیستری، تفکیک ۴ سطحی، چرخش، بررسی سلامت و مرجع API
> - `docs/security/STEALTH_GUIDE.md` (در git؛ در `/docs` کامپایل نشده است) — لایههای اثر انگشت TLS و اثر انگشت CLI که روی پراکسی اجرا میشوند
> - [سطوح محافظ مسیر](./ROUTE_GUARD_TIERS.md) — اعمال الزام loopback برای مسیرهای صرفاً محلی
