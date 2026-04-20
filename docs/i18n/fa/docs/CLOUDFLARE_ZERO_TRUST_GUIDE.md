# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

این راهنما استاندارد طلایی زیرساخت شبکه را برای محافظت از**OmniRoute**و نمایش امن برنامه شما در اینترنت،**بدون باز کردن هیچ درگاهی (صفر ورودی)**مستند می کند.## What was done on your VM?

ما OmniRoute را در حالت**Split-Port**از طریق PM2 فعال کردیم:

-**پورت `20128`:\*\***فقط API**`/v1` اجرا می شود. -**پورت `20129`:\***\*فقط داشبورد اداری**اجرا می شود.

علاوه بر این، سرویس داخلی به «REQUIRE_API_KEY=true» نیاز دارد، به این معنی که هیچ عاملی نمی‌تواند نقاط پایانی API را بدون ارسال یک «Token حامل» قانونی تولید شده در برگه کلیدهای API داشبورد مصرف کند.

این به ما امکان می دهد دو قانون شبکه کاملاً مستقل ایجاد کنیم. اینجاست که**تونل Cloudflare (Cloudflareed)**وارد می شود.---

## 1. How to Create the Tunnel in Cloudflare

ابزار «cloudflared» قبلاً روی دستگاه شما نصب شده است. این مراحل را در فضای ابری دنبال کنید:

1. به داشبورد**Cloudflare Zero Trust**خود (one.dash.cloudflare.com) دسترسی پیدا کنید.
2. در منوی سمت چپ، به مسیر**شبکه ها > تونل ها**بروید.
3. روی**افزودن تونل**کلیک کنید،**Cloudflared**را انتخاب کنید و نام آن را "OmniRoute-VM" بگذارید.
4. دستوری به نام "Install and run a connector" را روی صفحه نمایش می دهد.**شما فقط باید Token (رشته طولانی بعد از `--token`) را کپی کنید**.
5. از طریق SSH به ماشین مجازی خود (یا ترمینال Proxmox) وارد شوید و اجرا کنید: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

هنوز در صفحه تونل تازه ایجاد شده، به برگه**Public Hostname**بروید و**دو**مسیرها را اضافه کنید، از جداسازی ما استفاده کنید:### Route 1: Secure API (Limited)

-**زیر دامنه:**`api` -**دامنه:**`yourglobal.com` (دامنه واقعی خود را انتخاب کنید) -**نوع سرویس:**`HTTP` -**URL:**`127.0.0.1:20128` _(درگاه API داخلی)_### Route 2: Zero Trust Dashboard (Closed)

-**زیر دامنه:**"omniroute" یا "panel". -**دامنه:**`yourglobal.com` -**نوع سرویس:**`HTTP` -**URL:**`127.0.0.1:20129` _(برنامه داخلی/پورت تصویری)_

در این مرحله، اتصال "فیزیکی" حل می شود. حالا بیایید واقعاً از آن محافظت کنیم.---

## 3. Shielding the Dashboard with Zero Trust (Access)

هیچ رمز عبور محلی بهتر از حذف کامل دسترسی به آن از طریق اینترنت باز از داشبورد شما محافظت نمی کند.

1. در داشبورد Zero Trust، به مسیر**Access > Applications > Add an application**بروید. 2.**Self-hosted**را انتخاب کنید.
2. در**نام برنامه**، "OmniRoute Panel" را وارد کنید.
3. در**دامنه برنامه**، «omniroute.yourglobal.com» را وارد کنید (همان موردی که در «Route 2» استفاده کردید).
4. روی**Next**کلیک کنید.
5. در**کنش قانون**، "Allow" را انتخاب کنید. برای نام قانون، «فقط مدیر» را وارد کنید.
6. در**شامل**، در زیر منوی "انتخاب کننده"، "ایمیل ها" را انتخاب کنید و ایمیل خود را تایپ کنید، برای مثال "admin@spgeo.com.br".
7. ذخیره ("افزودن برنامه").

> **این کار چه کرد:**اگر بخواهید "omniroute.yourglobal.com" را باز کنید، دیگر در برنامه OmniRoute شما قرار نمی گیرد! روی یک صفحه نمایش زیبای Cloudflare قرار می گیرد و از شما می خواهد ایمیل خود را وارد کنید. فقط در صورتی که شما (یا ایمیلی که وارد کرده‌اید) در آنجا تایپ شده باشد، یک کد 6 رقمی موقت در Outlook/Gmail دریافت خواهید کرد که قفل تونل به پورت «20129» را باز می‌کند.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

داشبورد Zero Trust برای مسیر API (`api.yourglobal.com`) اعمال نمی شود، زیرا یک دسترسی برنامه ریزی شده از طریق ابزارهای خودکار (نمایندگان) بدون مرورگر است. برای این کار از فایروال اصلی Cloudflare (WAF) استفاده خواهیم کرد.

1. به**داشبورد Normal Cloudflare**(dash.cloudflare.com) دسترسی پیدا کنید و به Domain خود بروید.
2. در منوی سمت چپ، به مسیر**Security > WAF > Rate limiting rules**بروید.
3. روی**Create rule**کلیک کنید. 4.**نام:**«OmniRoute API Anti-Abuse». 5.**در صورت مطابقت درخواست های دریافتی...**
   - فیلد: «نام میزبان» را انتخاب کنید
   - اپراتور: «برابر».
   - مقدار: `api.yourglobal.com`
4. زیر**با همان ویژگی ها:**'IP' را نگه دارید.
5. برای حدود (Limit): -**هنگامی که درخواست ها بیش از:**`50` باشد -**دوره:**`1 دقیقه`
6. در پایان، در زیر**اقدام**: «بلاک» و تصمیم بگیرید که آیا بلوک 1 دقیقه طول می کشد یا 1 ساعت. 9.**استقرار**.

> **این چه کاری انجام داد:**هیچکس نمی تواند بیش از 50 درخواست را در یک دوره 60 ثانیه ای به URL API شما ارسال کند. از آنجایی که شما چندین عامل را اجرا می‌کنید و مصرف پشت آن‌ها از قبل به محدودیت‌های نرخ رسیده و نشانه‌ها را ردیابی می‌کند، این فقط یک اقدام در لایه لبه اینترنت است که از پایین آمدن نمونه On-Premises شما به دلیل استرس حرارتی قبل از اینکه ترافیک حتی از تونل پایین بیاید محافظت می‌کند.---

## Finalization

1. VM شما\*\*در "/etc/ufw" هیچ پورت نوردهی ندارد.
2. OmniRoute فقط HTTPS خروجی ("cloudflared") صحبت می کند و TCP مستقیم از جهان دریافت نمی کند.
3. درخواست‌های شما برای OpenAI مبهم هستند زیرا ما آنها را به صورت جهانی پیکربندی کرده‌ایم تا از طریق یک پروکسی SOCKS5 عبور کنند (ابر به SOCKS5 اهمیتی نمی‌دهد، زیرا به صورت Inbound می‌آید).
4. داشبورد وب شما دارای احراز هویت 2-عاملی با ایمیل است.
5. API شما در لبه توسط Cloudflare محدود شده است و فقط توکن های حامل را ترافیک می کند.
