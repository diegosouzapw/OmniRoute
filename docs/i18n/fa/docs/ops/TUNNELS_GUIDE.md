# Tunnels Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **منبع حقیقت:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`، `src/app/api/tunnels/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute میتواند سرور محلی خود (`http://localhost:20128`) را از طریق سه بکاند تونل در دسترس اینترنت عمومی قرار دهد. این قابلیت برای موارد زیر مفید است:

- فراخوانیهای بازگشتی OAuth از ارائهدهندگان ابری (Antigravity، Gemini و Cursor) که به یک URL تغییرمسیر با دسترسی عمومی نیاز دارند.
- اشتراکگذاری نمونه محلی خود با اعضای تیم، بدون استقرار یک VM.
- آزمایش روی موبایل، از راه دور یا میان شبکههای مختلف.

هر سه بکاند درون فرایند مدیریت میشوند — OmniRoute باینری یا SDK زیربنایی را از طریق داشبورد یا REST API راهاندازی/متوقف میکند. به راهاندازی reverse-proxy یا systemd نیازی نیست.

## مروری بر بکاندها

| بکاند                       | ماندگاری                                                         | هزینه                    | راهاندازی                                                 |
| --------------------------- | ---------------------------------------------------------------- | ------------------------ | --------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | موقت (URL در هر بار راهاندازی مجدد تغییر میکند)                  | رایگان                   | بدون نیاز به تنظیمات — `cloudflared` خودکار نصب میشود     |
| **ngrok**                   | تا زمانی که طرح پولی یا دامنه ثابت پیکربندی شده باشد، پایدار است | سطح رایگان + پولی        | نیازمند حساب ngrok و authtoken است                        |
| **Tailscale Funnel**        | برای هر گره درون tailnet شما پایدار است                          | رایگان برای استفاده شخصی | نیازمند نصب و ورود به Tailscale و ACL مربوط به Funnel است |

پیادهسازیها در `src/lib/cloudflaredTunnel.ts`، `src/lib/ngrokTunnel.ts` و `src/lib/tailscaleTunnel.ts` قرار دارند. هر سه، یک شیء `status` با ساختار مشترک و فیلدهای `phase`، `running`، `publicUrl`، `apiUrl`، `targetUrl` و `lastError` برمیگردانند تا داشبورد بتواند آنها را بهشکلی یکسان نمایش دهد.

## 1. تونل Cloudflare ‏(Quick Tunnel + Named Tunnel)

فایل `src/lib/cloudflaredTunnel.ts`،‏ `cloudflared` را بهعنوان یک فرایند فرزند اجرا میکند. این پیادهسازی از دو حالت پشتیبانی میکند که بر اساس ارائهشدن یا نشدن پیکربندی تونل نامگذاریشده انتخاب میشوند:

- **تونل سریع (پیشفرض).** دستور `cloudflared tunnel --url
http://localhost:<apiPort>` را اجرا میکند و URL تخصیصیافته `*.trycloudflare.com` را از stdout استخراج میکند. URLها موقت هستند و در هر بار راهاندازی مجدد تغییر میکنند.
- **تونل نامگذاریشده (اختیاری).** هنگامی که `CLOUDFLARED_CONFIG` به یک فایل `config.yml` مربوط به cloudflared که بهصورت محلی مدیریت میشود اشاره کند، OmniRoute دستور `cloudflared tunnel --no-autoupdate
--config <path> run` را اجرا میکند و یک **نام میزبان پایدار و نامگذاریشده** در اختیار شما قرار میدهد. این پیکربندی UUID تونل، `credentials-file` و مسیریابی `ingress` را تأمین میکند؛ بنابراین هیچ `--url`ای ارسال نمیشود و به توکن داشبورد Zero Trust نیازی نیست. دستور `run` اعتبارنامهها را از مسیر مطلق `credentials-file` در پیکربندی میخواند — به `cert.pem` نیازی نیست (این فایل فقط برای مدیریت چرخه عمر تونل استفاده میشود).

رفتارهای کلیدی:

- **نصب خودکار.** در نخستین استفاده، OmniRoute آخرین باینری `cloudflared` را از انتشارهای رسمی GitHub دانلود میکند (نسخه مدیریتشده در `DATA_DIR/cloudflared/` نصب میشود). پیش از اجرا، SHA256 دارایی دانلودشده با مانیفست انتشار تطبیق داده میشود.
- **نظارت بر فرایند.** PID مربوط به cloudflared و URL حلشده در `quick-tunnel-state.json` ذخیره میشوند تا داشبورد بتواند وضعیت را پس از بارگذاری مجدد بازیابی کند.

### راهاندازی تونل نامگذاریشده (نام میزبان پایدار)

1. با استفاده از CLI مربوط به cloudflared، یک تونل با مدیریت محلی ایجاد کنید (فقط یکبار):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. یک فایل `~/.cloudflared/config.yml` بنویسید که نام میزبان شما را به پورت API محلی OmniRoute (بهطور پیشفرض 20128) هدایت کند:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute را به فایل پیکربندی هدایت کنید و تونل را (دوباره) راهاندازی کنید:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # اختیاری — نام میزبانی را که OmniRoute گزارش میکند بازنویسی میکند؛ در غیر این صورت از
   # نخستین قانون ingress در پیکربندی خوانده میشود:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   تونل را به همان روش تونل سریع فعال کنید (از طریق REST / داشبورد / CLI در ادامه). تونل نامگذاریشده هیچ URL عمومیای برای استخراج منتشر نمیکند؛ بنابراین آمادهبودن آن از روی اتصال ثبتشده cloudflared به edge تشخیص داده میشود و `publicUrl`/`apiUrl` بر اساس `CLOUDFLARED_HOSTNAME` (یا نخستین نام میزبان ingress در پیکربندی) گزارش میشوند.

### فعالسازی / غیرفعالسازی از طریق REST

این endpoint از بدنه `{action: "enable" | "disable"}` استفاده میکند، نه مسیرهای جداگانه `start`/`stop`. احراز هویت مدیریتی (نشست مدیر یا کلید API مدیر) الزامی است.

```bash
# فعالسازی
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# وضعیت
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# غیرفعالسازی
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

یا از طریق داشبورد: **Settings → Tunnels → Cloudflare**.

### متغیرهای محیطی اختیاری

| متغیر                                                | کاربرد                                                                                                                                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | مسیر فایل اجرایی را بازنویسی میکند. اگر تنظیم شده و معتبر باشد، OmniRoute بهجای دانلود از آن استفاده میکند.                                                                                  |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | پروتکل انتقال (پیشفرض `http2`؛ همچنین `quic` و `auto`).                                                                                                                                      |
| `CLOUDFLARED_CONFIG`                                 | مسیر فایل `config.yml` متعلق به cloudflared که بهصورت محلی مدیریت میشود. در صورت تنظیم، OmniRoute بهجای تونل سریع، یک تونل **نامگذاریشده/پایدار** (`tunnel --config <path> run`) اجرا میکند. |
| `CLOUDFLARED_HOSTNAME`                               | نام میزبان عمومی گزارششدهٔ تونل نامگذاریشده را بازنویسی میکند (برای مثال، `ai.example.com`). اگر تنظیم نشده باشد، از اولین نام میزبان `ingress` در پیکربندی خوانده میشود.                    |

## 2. ngrok

فایل `src/lib/ngrokTunnel.ts` از **SDK مربوط به `@ngrok/ngrok`** استفاده میکند (درونپردازهای و بدون زیرفرایند CLI). ماژول بومی هنگام اولین راهاندازی بهصورت تنبل وارد میشود تا در پلتفرمهایی که فایلهای باینری ازپیشساختهشده ندارند، برنامه هنگام بوت دچار مشکل نشود.

### پیشنیازها

1. در <https://ngrok.com> ثبتنام کنید.
2. `authtoken` خود را از داشبورد ngrok کپی کنید.
3. آن را به یکی از روشهای زیر ارائه دهید:
   - `.env`: `NGROK_AUTHTOKEN=<token>`، یا
   - داشبورد: **Settings → Tunnels → ngrok**، یا
   - بدنه REST (یکبارمصرف): `{"action":"enable","authToken":"<token>"}`.

اگر هیچکدام پیکربندی نشده باشند، وضعیت مقدار `phase: "needs_auth"` را برمیگرداند.

### فعالسازی / غیرفعالسازی از طریق REST

```bash
# فعالسازی (از NGROK_AUTHTOKEN موجود در محیط استفاده میکند)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# فعالسازی با توکن درونخطی
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# وضعیت
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# غیرفعالسازی
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

پاسخ شامل `publicUrl` تخصیصیافته است (برای مثال
`https://abcd-1234.ngrok-free.app`). دامنههای سفارشی، ناحیهها و قوانین خطمشی
باید در داشبورد ngrok پیکربندی شوند — خود OmniRoute فقط URL مقصد محلی را به
SDK ارسال میکند.

## 3. Tailscale Funnel

فایل `src/lib/tailscaleTunnel.ts` برای در معرض دسترس قرار دادن پورت API محلی از طریق **Funnel** (خروجی اینترنت عمومی Tailscale برای serve)، رابط خط فرمان سیستمی `tailscale` را هماهنگ میکند. این پیادهسازی از کل چرخهٔ حیات پشتیبانی میکند: نصب، ورود، راهاندازی دیمن، فعالسازی و غیرفعالسازی.

پیادهسازی، دستور `tailscale funnel --bg <port>` را فراخوانی میکند (حالت پسزمینه). URL عمومی بهشکل `https://<machine>.<tailnet>.ts.net/` است.

### پیشنیازها

1. Tailscale را نصب کنید (یا اجازه دهید OmniRoute این کار را انجام دهد — به نقطهٔ پایانی `install` در ادامه مراجعه کنید).
2. وارد شوید (`tailscale login` یا از طریق نقطهٔ پایانی `login` در OmniRoute).
3. Funnel را برای tailnet خود در کنسول مدیریت Tailscale فعال کنید:
   <https://login.tailscale.com/admin/settings/features>.

در Linux و macOS، کنترل دیمن (`tailscaled`) به `sudo` نیاز دارد. نقاط پایانی POST یک فیلد اختیاری `sudoPassword` میپذیرند که در طول فراخوانی به حافظهٔ نهان گذرواژهٔ MITM در OmniRoute (`getCachedPassword` / `setCachedPassword`) ارسال میشود. Windows از نصب سرویس پیشفرض در `C:\Program Files\Tailscale\tailscale.exe` استفاده میکند.

### نقاط پایانی REST

سطح عملیاتی Tailscale از سایر بکاندها گستردهتر است، زیرا نصب، ورود، دیمن و تونل، بخشهای مستقلی هستند.

| نقطهٔ پایانی                          | متد    | هدف                                                               |
| ------------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | وضعیت تجمیعشدهٔ تونل (`phase`، `tunnelUrl`، `apiUrl` و غیره)      |
| `/api/tunnels/tailscale/check`        | `GET`  | بررسی سطح پایینتر: نصب شده؟ وارد شده؟ دیمن در حال اجرا است؟       |
| `/api/tunnels/tailscale/install`      | `POST` | نصب Tailscale (رویدادهای پیشرفت جریانی از طریق SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | راهاندازی `tailscaled` در Linux/macOS                             |
| `/api/tunnels/tailscale/login`        | `POST` | آغاز فرایند ورود؛ یک `authUrl` برای باز کردن در مرورگر برمیگرداند |
| `/api/tunnels/tailscale/enable`       | `POST` | راهاندازی Funnel برای پورت API                                    |
| `/api/tunnels/tailscale/disable`      | `POST` | متوقف کردن Funnel                                                 |

تمام نقاط پایانی Tailscale به احراز هویت مدیریتی نیاز دارند (به `routeUtils.ts ::
requireTailscaleAuth` مراجعه کنید).

نمونهٔ فعالسازی:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

اگر Funnel در کنسول مدیریت فعال نشده باشد، پاسخ شامل
`funnelNotEnabled: true` بههمراه یک `enableUrl` برای باز کردن در مرورگر خواهد بود.

### متغیرهای محیطی اختیاری

| متغیر           | هدف                                   |
| --------------- | ------------------------------------- |
| `TAILSCALE_BIN` | بازنویسی مسیر فایل باینری `tailscale` |

## خلاصهٔ نقاط پایانی

| نقطهٔ پایانی                          | متد    | بدنه                                | احراز هویت |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management |

هیچ نقطهٔ پایانی مرکزی با مسیر `/api/settings/tunnels` وجود ندارد — هر بکاند
مستقل است.

## ملاحظات فراخوانی بازگشتی OAuth

هنگامی که OmniRoute را از طریق یک تونل در دسترس قرار میدهید، داشبورد و جریانهای OAuth باید
URLهای فراخوانی بازگشتی را با استفاده از نام میزبان **عمومی** بسازند، نه `localhost`. در غیر این صورت،
ارائهدهندهٔ OAuth کاربر را به URLای هدایت میکند که سرورهایش قادر به دسترسی به آن نیستند
و فرایند دستدهی شکست میخورد.

ویرایشهای داشبورد و ذخیرهسازی تنظیمات نیازی به تثبیت نام میزبان تونل در
`NEXT_PUBLIC_BASE_URL` ندارند. داشبورد احراز هویتشده، درخواستهای ناامن هممبدأ را
با یک توکن CSRF وابسته به نشست ارسال میکند؛ بنابراین پس از ورود به سیستم، همچنان میتوان
از میزبانهای موقتی Cloudflare Quick Tunnel برای مدیریت عادی رابط کاربری استفاده کرد.

تنظیم کنید:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

و پیش از آغاز OAuth، OmniRoute را مجدداً راهاندازی کنید. در Cloudflare Quick
Tunnelهای موقتی، URL پس از هر بار راهاندازی مجدد تغییر میکند؛ بنابراین برای استفادهٔ عملیاتی از OAuth،
ngrok با دامنهٔ رزروشده یا Tailscale Funnel را ترجیح دهید.

## سلامت و پایش

داشبورد وضعیت تونل را در بخش **تنظیمات ← تونلها** نمایش میدهد:

- بکاند(های) فعال و `phase` فعلی (`stopped`، `starting`، `running`،
  `needs_auth`، `error`).
- URL عمومی فعلی و URL مشتقشدهٔ API (`<publicUrl>/v1`).
- URL مقصد محلی که تونل ترافیک را به آن هدایت میکند.
- آخرین پیام خطا، در صورت وجود.

برای پایش برنامهنویسیشده، نقاط پایانی `GET` مربوط به هر بکاند را بهصورت دورهای بررسی کنید. اجرای همزمان
بیش از یک بکاند مجاز است؛ OmniRoute هر یک را
بهطور مستقل ردیابی میکند.

## عیبیابی

### «فایل اجرایی cloudflared پیدا نشد»

OmniRoute در نخستین استفاده تلاش میکند آن را بهطور خودکار نصب کند. اگر نصب مسدود شده است
(شبکهٔ محدود، نبود دسترسی به GitHub)، `cloudflared` را بهصورت دستی از
<https://github.com/cloudflare/cloudflared/releases> دانلود و
`CLOUDFLARED_BIN=/path/to/cloudflared` را تنظیم کنید.

### «ngrok: authtoken الزامی است»

`phase: "needs_auth"` به این معنی است که هیچ authtokenای پیدا نشده است. `NGROK_AUTHTOKEN` را در
`.env` تنظیم کنید، آن را از طریق داشبورد پیکربندی کنید، یا `authToken` را در بدنهٔ درخواست POST فعالسازی
ارسال کنید.

### «tailscale: funnel فعال نیست»

هنگامی که پاسخ فعالسازی شامل `funnelNotEnabled: true` است، Funnel
برای tailnet شما غیرفعال است. `enableUrl` بازگرداندهشده (یا صفحهٔ قابلیت در کنسول مدیریت)
را باز و Funnel را فعال کنید.

### تغییر URL تونل باعث اختلال در OAuth میشود

از ngrok با دامنهٔ رزروشده یا Tailscale Funnel استفاده کنید (هر دو برای هر نود پایدار هستند).
Cloudflare Quick Tunnelها ذاتاً موقتیاند و برای فراخوانیهای بازگشتی بلندمدت OAuth
توصیه نمیشوند.

### خطای عدم دسترسی در Linux/macOS برای Tailscale

`tailscaled` به دسترسی root نیاز دارد. `sudoPassword` را به نقطهٔ پایانی POST مربوطه
ارائه دهید، یا daemon را خودتان اجرا کنید (`sudo systemctl start tailscaled`).

## همچنین ببینید

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — پروکسی خروجی (1proxy، SOCKS5، HTTP) برای
  ترافیک خروجی.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — فهرست کامل متغیرهای محیطی، شامل
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md)،
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — جایگزینهای تونلسازی برای میزبانی عمومی
  پایدار.
- منبع: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`،
  `src/app/api/tunnels/`.
