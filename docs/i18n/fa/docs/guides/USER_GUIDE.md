# راهنمای کاربر (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/USER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/USER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/USER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/USER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/USER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/USER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/USER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/USER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/USER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/USER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/USER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/USER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/USER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/USER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/USER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/USER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/USER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/USER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/USER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/USER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/USER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/USER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/USER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/USER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/USER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/USER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/USER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/USER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/USER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/USER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/USER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/USER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/USER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/USER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/USER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/USER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/USER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/USER_GUIDE.md)

---

راهنمای کامل پیکربندی ارائه‌دهندگان، ساخت ترکیب‌ها، یکپارچه‌سازی ابزارهای خط فرمان و استقرار OmniRoute.

---

## فهرست مطالب

- [مرور سریع هزینه‌ها](#-مرور-سریع-هزینه‌ها)
- [موارد استفاده](#-موارد-استفاده)
- [راه‌اندازی ارائه‌دهندگان](#-راه‌اندازی-ارائه‌دهندگان)
- [یکپارچه‌سازی با ابزارهای خط فرمان](#-یکپارچه‌سازی-با-ابزارهای-خط-فرمان)
- [استقرار](#-استقرار)
- [مدل‌های موجود](#-مدل‌های-موجود)
- [قابلیت‌های پیشرفته](#-قابلیت‌های-پیشرفته)

---

## 💰 مرور سریع هزینه‌ها

| رده                  | ارائه‌دهنده       | هزینه                 | بازنشانی سهمیه           | مناسب برای                           |
| -------------------- | ----------------- | --------------------- | ------------------------ | ------------------------------------ |
| **💳 اشتراکی**       | Claude Code (Pro) | ماهانه ۲۰ دلار        | ۵ ساعته + هفتگی          | کاربران دارای اشتراک                 |
|                      | Codex (Plus/Pro)  | ماهانه ۲۰ تا ۲۰۰ دلار | ۵ ساعته + هفتگی          | کاربران OpenAI                       |
|                      | GitHub Copilot    | ماهانه ۱۰ تا ۱۹ دلار  | ماهانه                   | کاربران GitHub                       |
| **🔑 کلید API**      | DeepSeek          | پرداخت به‌ازای مصرف   | ندارد                    | استدلال کم‌هزینه                     |
|                      | Groq              | پرداخت به‌ازای مصرف   | ندارد                    | استنتاج بسیار سریع                   |
|                      | xAI (Grok)        | پرداخت به‌ازای مصرف   | ندارد                    | استدلال با Grok 4                    |
|                      | Mistral           | پرداخت به‌ازای مصرف   | ندارد                    | مدل‌های میزبانی‌شده در اتحادیه اروپا |
|                      | Perplexity        | پرداخت به‌ازای مصرف   | ندارد                    | جست‌وجوی تقویت‌شده                   |
|                      | Together AI       | پرداخت به‌ازای مصرف   | ندارد                    | مدل‌های متن‌باز                      |
|                      | Fireworks AI      | پرداخت به‌ازای مصرف   | ندارد                    | تولید سریع تصویر با FLUX             |
|                      | Cerebras          | پرداخت به‌ازای مصرف   | ندارد                    | پردازش پرسرعت در مقیاس ویفر          |
|                      | Cohere            | پرداخت به‌ازای مصرف   | ندارد                    | بازیابی تقویت‌شده با Command R+      |
|                      | NVIDIA NIM        | پرداخت به‌ازای مصرف   | ندارد                    | مدل‌های سازمانی                      |
| **💰 مقرون‌به‌صرفه** | GLM-4.7           | ۰٫۶ دلار/۱میلیون      | روزانه ساعت ۱۰           | پشتیبان اقتصادی                      |
|                      | MiniMax M2.1      | ۰٫۲ دلار/۱میلیون      | بازه چرخشی ۵ ساعته       | ارزان‌ترین گزینه                     |
|                      | Kimi K2           | ماهانه ۹ دلار ثابت    | ماهانه ۱۰ میلیون توکن    | هزینه قابل پیش‌بینی                  |
| **🆓 رایگان**        | Qoder             | ۰ دلار                | تابع محدودیت ارائه‌دهنده | بررسی فهرست فعلی                     |
|                      | Kiro              | ۰ دلار                | تابع محدودیت ارائه‌دهنده | Claude رایگان                        |

---

## 🎯 موارد استفاده

### مورد ۱: «اشتراک Claude Pro دارم»

**مسئله:** سهمیه بدون استفاده منقضی می‌شود و هنگام کدنویسی سنگین با محدودیت نرخ روبه‌رو می‌شوید.

```
ترکیب: "maximize-claude"
  1. cc/claude-opus-4-7        (استفاده کامل از اشتراک)
  2. glm/glm-4.7               (پشتیبان کم‌هزینه پس از پایان سهمیه)
  3. if/kimi-k2-thinking       (جایگزین اضطراری رایگان)

هزینه ماهانه: ۲۰ دلار اشتراک + حدود ۵ دلار پشتیبان = در مجموع ۲۵ دلار
در مقایسه با پرداخت ۲۰ دلار و روبه‌روشدن با محدودیت‌ها
```

### مورد ۲: «می‌خواهم هیچ هزینه‌ای نپردازم»

**مسئله:** امکان پرداخت هزینه اشتراک را ندارید و به یک ابزار هوش مصنوعی قابل‌اعتماد برای کدنویسی نیاز دارید.

```
ترکیب: "free-tier-fallback"
  1. if/kimi-k2-thinking       (سقف توکن منتشر نشده است؛ محدودیت‌ها اعمال می‌شوند)
  2. kr/qwen3-coder-next

هزینه ماهانه: ۰ دلار
کیفیت: مدل، محدودیت‌ها، حریم خصوصی و SLA را متناسب با بار کاری خود بررسی کنید
```

### مورد ۳: «به کدنویسی شبانه‌روزی و بدون وقفه نیاز دارم»

**مسئله:** موعد تحویل نزدیک است و نمی‌توانید توقف سرویس را بپذیرید.

```
ترکیب: "always-on"
  1. cc/claude-opus-4-7        (بهترین کیفیت)
  2. cx/gpt-5.2-codex          (اشتراک دوم)
  3. glm/glm-4.7               (کم‌هزینه با بازنشانی روزانه)
  4. minimax/MiniMax-M2.1      (ارزان‌ترین گزینه با بازنشانی ۵ ساعته)
  5. if/kimi-k2-thinking       (رایگان و نامحدود)

نتیجه: پنج لایه جایگزین، تاب‌آوری را افزایش می‌دهد؛ دسترس‌پذیری سرویس بالادستی تضمین‌شده نیست
هزینه ماهانه: ۲۰ تا ۲۰۰ دلار اشتراک + ۱۰ تا ۲۰ دلار پشتیبان
```

### مورد ۴: «در OpenClaw یک هوش مصنوعی رایگان می‌خواهم»

**مسئله:** به یک دستیار هوش مصنوعی کاملاً رایگان در پیام‌رسان‌ها نیاز دارید.

```
ترکیب: "openclaw-free"
  1. if/glm-4.7                (سقف توکن منتشر نشده است؛ محدودیت‌ها اعمال می‌شوند)
  2. if/minimax-m2.1           (سقف توکن منتشر نشده است؛ محدودیت‌ها اعمال می‌شوند)
  3. if/kimi-k2-thinking       (سقف توکن منتشر نشده است؛ محدودیت‌ها اعمال می‌شوند)

هزینه ماهانه: ۰ دلار
دسترسی از طریق: WhatsApp، Telegram، Slack، Discord، iMessage، Signal و غیره
```

---

## 📖 راه‌اندازی ارائه‌دهندگان

### 🔐 ارائه‌دهندگان اشتراکی

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ ورود با OAuth → نوسازی خودکار توکن
→ پایش سهمیه ۵ ساعته و هفتگی

مدل‌ها:
  cc/claude-opus-4-7
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**نکته کاربردی:** برای کارهای پیچیده از Opus و برای سرعت بیشتر از Sonnet استفاده کنید. OmniRoute سهمیه هر مدل را جداگانه پایش می‌کند.

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ ورود با OAuth (درگاه ۱۴۵۵)
→ بازنشانی ۵ ساعته و هفتگی

مدل‌ها:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ احراز هویت OAuth از طریق GitHub
→ بازنشانی ماهانه (روز نخست ماه)

مدل‌ها:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 ارائه‌دهندگان مقرون‌به‌صرفه

#### GLM-4.7 (بازنشانی روزانه، ۰٫۶ دلار به‌ازای یک میلیون توکن)

1. در [Zhipu AI](https://open.bigmodel.cn/) ثبت‌نام کنید.
2. کلید API را از Coding Plan دریافت کنید.
3. در پیشخوان، گزینه Add API Key را انتخاب کنید و Provider را روی `glm` و API Key را روی `your-key` قرار دهید.

**نحوه استفاده:** `glm/glm-4.7` — **نکته کاربردی:** Coding Plan با یک‌هفتم هزینه، سه برابر سهمیه ارائه می‌دهد. سهمیه هر روز ساعت ۱۰ صبح بازنشانی می‌شود.

#### MiniMax M2.1 (بازنشانی ۵ ساعته، ۰٫۲۰ دلار به‌ازای یک میلیون توکن)

1. در [MiniMax](https://www.minimax.io/) ثبت‌نام کنید.
2. کلید API را دریافت کنید و سپس در پیشخوان، Add API Key را انتخاب کنید.

**نحوه استفاده:** `minimax/MiniMax-M2.1` — **نکته کاربردی:** این گزینه برای متن‌های طولانی تا یک میلیون توکن، ارزان‌ترین انتخاب است.

#### Kimi K2 (ماهانه ۹ دلار ثابت)

1. در [Moonshot AI](https://platform.moonshot.ai/) اشتراک تهیه کنید.
2. کلید API را دریافت کنید و سپس در پیشخوان، Add API Key را انتخاب کنید.

**نحوه استفاده:** `kimi/kimi-latest` — **نکته کاربردی:** هزینه ثابت ۹ دلار در ماه برای ۱۰ میلیون توکن، معادل هزینه مؤثر ۰٫۹۰ دلار به‌ازای هر یک میلیون توکن است.

### 🆓 ارائه‌دهندگان رایگان

#### Qoder (۸ مدل رایگان)

```bash
Dashboard → Connect Qoder → ورود با OAuth → دسترسی تابع محدودیت‌های فعلی ارائه‌دهنده است

مدل‌ها: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Kiro (دسترسی رایگان به Claude)

```bash
Dashboard → Connect Kiro → شناسه AWS Builder یا Google/GitHub → نامحدود

مدل‌ها: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 ترکیب‌ها

می‌توانید کارت‌های ترکیب را مستقیماً در مسیر **Dashboard → Combos** با کشیدن دستگیره هر کارت مرتب کنید. ترتیب در SQLite ذخیره می‌شود و پس از بارگذاری مجدد نیز باقی می‌ماند.

### مثال ۱: استفاده حداکثری از اشتراک ← پشتیبان کم‌هزینه

```
Dashboard → Combos → Create New

نام: premium-coding
مدل‌ها:
  1. cc/claude-opus-4-7 (اشتراک اصلی)
  2. glm/glm-4.7 (پشتیبان کم‌هزینه، ۰٫۶ دلار/۱میلیون)
  3. minimax/MiniMax-M2.1 (ارزان‌ترین جایگزین، ۰٫۲۰ دلار/۱میلیون)

استفاده در ابزار خط فرمان: premium-coding
```

### مثال ۲: فقط گزینه‌های رایگان (بدون هزینه)

```
نام: free-combo
مدل‌ها:
  1. if/kimi-k2-thinking (سقف توکن منتشر نشده است؛ ممکن است محدودیت ارائه‌دهنده اعمال شود)
  2. kr/qwen3-coder-next

هزینه: درحال‌حاضر ۰ دلار اعلام شده است؛ شرایط و دسترس‌پذیری ممکن است تغییر کند
```

---

## 🔧 یکپارچه‌سازی با ابزارهای خط فرمان

### محیط توسعه Cursor

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-7
```

### Claude Code

فایل `~/.claude/config.json` را ویرایش کنید:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### ابزار خط فرمان Codex

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

فایل `~/.openclaw/openclaw.json` را ویرایش کنید:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**یا از پیشخوان استفاده کنید:** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-7
```

---

## 🚀 استقرار

### نصب سراسری با npm (پیشنهادی)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
```

ابزار خط فرمان فایل `.env` را به‌طور خودکار از مسیر `~/.omniroute/.env` یا `./.env` بارگذاری می‌کند.

### حذف برنامه

هنگامی که دیگر به OmniRoute نیاز ندارید، برای حذف تمیز برنامه دو اسکریپت سریع در اختیار دارید:

| دستور                    | عملکرد                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | برنامه را از سیستم حذف می‌کند، اما **پایگاه داده و تنظیمات شما** را در `~/.omniroute` نگه می‌دارد. |
| `npm run uninstall:full` | برنامه را حذف می‌کند و **تمام تنظیمات، کلیدها و پایگاه‌های داده را برای همیشه پاک می‌کند**.        |

> **توجه:** اگر مخزن را کلون کرده‌اید، برای اجرای این دستورها به پوشه پروژه OmniRoute بروید. اگر برنامه را به‌صورت سراسری نصب کرده‌اید، می‌توانید از دستور `npm uninstall -g omniroute` استفاده کنید.

### استقرار روی VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### استقرار با PM2 (حافظه کم)

برای سرورهایی با حافظه محدود، از گزینه تعیین سقف حافظه استفاده کنید:

```bash
# With 512MB limit (default)
pm2 start npm --name omniroute -- start

# Or with custom memory limit
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js
pm2 start ecosystem.config.js
```

فایل `ecosystem.config.js` را ایجاد کنید:

```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

برای استفاده در حالت یکپارچه با میزبان و همراه با فایل‌های اجرایی خط فرمان، بخش Docker در مستندات اصلی را ببینید.

### Void Linux ‏(xbps-src)

کاربران Void Linux می‌توانند با چارچوب کامپایل چندسکویی `xbps-src`، بسته بومی OmniRoute را بسازند و نصب کنند. این فرایند، ساخت مستقل Node.js و اتصال‌های بومی لازم برای `better-sqlite3` را به‌صورت خودکار انجام می‌دهد.

<details>
<summary><b>مشاهده قالب xbps-src</b></summary>

```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	# Determine target CPU arch for node-gyp
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	# 1) Install all deps – skip scripts
	NODE_ENV=development npm ci --ignore-scripts

	# 2) Build the Next.js standalone bundle
	npm run build

	# 3) Copy static assets into standalone
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	# 4) Compile better-sqlite3 native binding
	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	# 5) Place the compiled binding into the standalone bundle
	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	# 6) Remove arch-specific sharp bundles
	rm -rf .next/standalone/node_modules/@img

	# 7) Copy pino runtime deps omitted by Next.js static analysis:
	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	# Prevent removal of empty Next.js app router dirs by the post-install hook
	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

</details>

### متغیرهای محیطی

| متغیر                                   | مقدار پیش‌فرض                        | توضیح                                                                                                                              |
| --------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                            | `omniroute-default-secret-change-me` | کلید محرمانه امضای JWT؛ **در محیط عملیاتی تغییر دهید**                                                                             |
| `INITIAL_PASSWORD`                      | `123456`                             | گذرواژه نخستین ورود                                                                                                                |
| `DATA_DIR`                              | `~/.omniroute`                       | پوشه داده‌ها شامل پایگاه داده، میزان مصرف و گزارش‌ها                                                                               |
| `PORT`                                  | پیش‌فرض چارچوب                       | درگاه سرویس؛ در مثال‌ها `20128`                                                                                                    |
| `HOSTNAME`                              | پیش‌فرض چارچوب                       | میزبان اتصال؛ مقدار پیش‌فرض Docker برابر `0.0.0.0` است                                                                             |
| `NODE_ENV`                              | پیش‌فرض محیط اجرا                    | برای استقرار روی `production` تنظیم کنید                                                                                           |
| `BASE_URL`                              | `http://localhost:20128`             | نشانی پایه داخلی سمت سرور                                                                                                          |
| `CLOUD_URL`                             | `https://omniroute.dev`              | نشانی پایه نقطه پایانی همگام‌سازی ابری                                                                                             |
| `API_KEY_SECRET`                        | `endpoint-proxy-api-key-secret`      | کلید محرمانه HMAC برای تولید کلیدهای API                                                                                           |
| `REQUIRE_API_KEY`                       | `false`                              | الزام کلید Bearer API برای مسیرهای `/v1/*`                                                                                         |
| `ALLOW_API_KEY_REVEAL`                  | `false`                              | اجازه به مدیر API برای کپی کامل کلیدهای API در صورت درخواست                                                                        |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                 | فاصله به‌روزرسانی داده‌های ذخیره‌شده محدودیت ارائه‌دهنده در سرور؛ دکمه‌های به‌روزرسانی رابط همچنان همگام‌سازی دستی را اجرا می‌کنند |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `false`                              | غیرفعال‌کردن نسخه پشتیبان خودکار SQLite پیش از نوشتن، ورود یا بازیابی؛ پشتیبان‌گیری دستی همچنان فعال است                           |
| `APP_LOG_TO_FILE`                       | `true`                               | فعال‌سازی ذخیره گزارش برنامه و ممیزی روی دیسک                                                                                      |
| `AUTH_COOKIE_SECURE`                    | `false`                              | اجبار ویژگی `Secure` برای کوکی احراز هویت در پشت پراکسی معکوس HTTPS                                                                |
| `CLOUDFLARED_BIN`                       | تنظیم‌نشده                           | استفاده از فایل اجرایی موجود `cloudflared` به‌جای دانلود مدیریت‌شده                                                                |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                              | روش انتقال برای تونل‌های سریع مدیریت‌شده؛ یکی از `http2`، `quic` یا `auto`                                                         |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                | سقف حافظه heap در Node.js بر حسب مگابایت                                                                                           |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                 | حداکثر تعداد ورودی‌های حافظه نهان پرامپت                                                                                           |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                | حداکثر تعداد ورودی‌های حافظه نهان معنایی                                                                                           |

برای مشاهده فهرست کامل متغیرهای محیطی، به [README](../../README.md) مراجعه کنید.

---

## 📊 مدل‌های موجود

<details>
<summary><b>مشاهده همه مدل‌های موجود</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-7`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)** — رایگان: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Kiro (`kr/`)** — رایگان: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 قابلیت‌های پیشرفته

### مدل‌های سفارشی

بدون نیاز به انتظار برای به‌روزرسانی برنامه، شناسه هر مدلی را به هر ارائه‌دهنده اضافه کنید:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

یا در پیشخوان به مسیر **Providers → [Provider] → Custom Models** بروید.

نکات:

- ارائه‌دهندگان سازگار با OpenRouter و OpenAI/Anthropic فقط از بخش **Available Models** مدیریت می‌شوند. افزودن دستی، درون‌ریزی و همگام‌سازی خودکار همگی به یک فهرست مشترک از مدل‌های موجود وارد می‌شوند؛ بنابراین برای این ارائه‌دهندگان بخش جداگانه‌ای با عنوان Custom Models وجود ندارد.
- بخش **Custom Models** برای ارائه‌دهندگانی است که امکان مدیریت و درون‌ریزی مدل‌های موجود را فراهم نمی‌کنند.

### مسیرهای اختصاصی ارائه‌دهندگان

درخواست‌ها را همراه با اعتبارسنجی مدل، مستقیماً به یک ارائه‌دهنده مشخص هدایت کنید:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

اگر پیشوند ارائه‌دهنده وجود نداشته باشد، به‌طور خودکار افزوده می‌شود. در صورت ناسازگاری مدل، پاسخ `400` برگردانده می‌شود.

### پیکربندی پراکسی شبکه

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**ترتیب اولویت:** مختص کلید ← مختص ترکیب ← مختص ارائه‌دهنده ← سراسری ← محیط.

### API فهرست مدل‌ها

```bash
curl http://localhost:20128/api/models/catalog
```

مدل‌ها را بر اساس ارائه‌دهنده و همراه با نوع آن‌ها (`chat`، `embedding` و `image`) برمی‌گرداند.

### همگام‌سازی ابری

- همگام‌سازی ارائه‌دهندگان، ترکیب‌ها و تنظیمات بین دستگاه‌ها
- همگام‌سازی خودکار در پس‌زمینه همراه با مهلت زمانی و توقف سریع در صورت خطا
- اولویت‌دادن به `BASE_URL` و `CLOUD_URL` سمت سرور در محیط عملیاتی

### تونل سریع Cloudflare

- برای Docker و دیگر استقرارهای خودمیزبان از مسیر **Dashboard → Endpoints** در دسترس است.
- یک نشانی موقت `https://*.trycloudflare.com` می‌سازد که درخواست‌ها را به نقطه پایانی فعلی و سازگار با OpenAI در مسیر `/v1` هدایت می‌کند.
- در نخستین فعال‌سازی، `cloudflared` فقط در صورت نیاز نصب می‌شود؛ در راه‌اندازی‌های بعدی همان فایل اجرایی مدیریت‌شده دوباره استفاده خواهد شد.
- تونل‌های سریع پس از راه‌اندازی مجدد OmniRoute یا کانتینر، خودکار بازیابی نمی‌شوند؛ در صورت نیاز آن‌ها را دوباره از پیشخوان فعال کنید.
- نشانی تونل‌ها موقتی است و با هر بار توقف و شروع تونل تغییر می‌کند.
- روش انتقال پیش‌فرض تونل‌های سریع مدیریت‌شده HTTP/2 است تا در کانتینرهای محدود، هشدارهای پرتعداد بافر UDP مربوط به QUIC ایجاد نشود.
- برای تغییر روش انتقال مدیریت‌شده، مقدار `CLOUDFLARED_PROTOCOL` را روی `quic` یا `auto` قرار دهید.
- اگر ترجیح می‌دهید به‌جای دانلود مدیریت‌شده از فایل اجرایی ازپیش‌نصب‌شده `cloudflared` استفاده کنید، `CLOUDFLARED_BIN` را تنظیم کنید.

### هوشمندی درگاه مدل‌های زبانی بزرگ (مرحله ۹)

- **حافظه نهان معنایی** — پاسخ‌های غیرجریانی با `temperature=0` را خودکار ذخیره می‌کند؛ برای عبور از آن از `X-OmniRoute-No-Cache: true` استفاده کنید.
- **تکرارناپذیری درخواست** — درخواست‌های تکراری در بازه ۵ ثانیه را با سرآیند `Idempotency-Key` یا `X-Request-Id` حذف می‌کند.
- **پایش پیشرفت** — با سرآیند `X-OmniRoute-Progress: true`، رویدادهای اختیاری SSE از نوع `event: progress` را فعال می‌کند.

---

### محیط آزمایش مترجم

از مسیر **Dashboard → Translator** وارد شوید. در این بخش می‌توانید نحوه تبدیل درخواست‌های API بین ارائه‌دهندگان توسط OmniRoute را اشکال‌زدایی و مشاهده کنید.

| حالت             | کاربرد                                                                       |
| ---------------- | ---------------------------------------------------------------------------- |
| **Playground**   | انتخاب قالب مبدأ و مقصد، درج یک درخواست و مشاهده فوری خروجی تبدیل‌شده        |
| **Chat Tester**  | ارسال پیام‌های زنده گفت‌وگو از طریق پراکسی و بررسی چرخه کامل درخواست و پاسخ  |
| **Test Bench**   | اجرای آزمون‌های دسته‌ای روی ترکیب‌های گوناگون قالب برای اطمینان از صحت تبدیل |
| **Live Monitor** | مشاهده تبدیل‌ها به‌صورت زنده هم‌زمان با عبور درخواست‌ها از پراکسی            |

**موارد استفاده:**

- بررسی علت شکست یک ترکیب مشخص از کارخواه و ارائه‌دهنده
- اطمینان از تبدیل درست برچسب‌های تفکر، فراخوانی ابزارها و پرامپت‌های سامانه
- مقایسه تفاوت قالب‌ها میان OpenAI، Claude، Gemini و Responses API

---

### راهبردهای مسیریابی

از مسیر **Dashboard → Settings → Routing** پیکربندی کنید.

| راهبرد                         | توضیح                                                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Fill First**                 | حساب‌ها را به‌ترتیب اولویت به کار می‌گیرد؛ حساب اصلی تا زمان خارج‌شدن از دسترس همه درخواست‌ها را پردازش می‌کند.  |
| **Round Robin**                | میان همه حساب‌ها می‌چرخد و از محدودیت چسبندگی قابل‌تنظیم استفاده می‌کند؛ پیش‌فرض سه فراخوانی برای هر حساب است.   |
| **P2C (Power of Two Choices)** | دو حساب را تصادفی انتخاب می‌کند و درخواست را به حساب سالم‌تر می‌فرستد؛ بار را با درنظرگرفتن سلامت متعادل می‌کند. |
| **Random**                     | برای هر درخواست، یک حساب را با درهم‌ریزی Fisher–Yates به‌صورت تصادفی انتخاب می‌کند.                              |
| **Least Used**                 | درخواست را به حسابی با قدیمی‌ترین زمان `lastUsedAt` می‌فرستد تا ترافیک به‌طور یکنواخت توزیع شود.                 |
| **Cost Optimized**             | درخواست را به حساب دارای کمترین مقدار اولویت می‌فرستد تا ارائه‌دهندگان کم‌هزینه‌تر انتخاب شوند.                  |

#### سرآیند خارجی نشست چسبنده

برای حفظ وابستگی نشست در سامانه‌های خارجی، مانند عامل‌های Claude Code یا Codex پشت پراکسی معکوس، سرآیند زیر را ارسال کنید:

```http
X-Session-Id: your-session-key
```

OmniRoute مقدار `x_session_id` را نیز می‌پذیرد و کلید مؤثر نشست را در `X-OmniRoute-Session-Id` برمی‌گرداند.

اگر از Nginx استفاده می‌کنید و سرآیندها را با نویسه زیرخط می‌فرستید، گزینه زیر را فعال کنید:

```nginx
underscores_in_headers on;
```

#### نام‌های مستعار مدل با نویسه‌های عام

برای نگاشت دوباره نام مدل‌ها، الگوهای دارای نویسه عام بسازید:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

نویسه‌های عام شامل `*` برای هر تعداد نویسه و `?` برای یک نویسه هستند.

#### زنجیره‌های جایگزین

زنجیره‌های جایگزین سراسری تعریف کنید تا بر همه درخواست‌ها اعمال شوند:

```
Chain: production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### تاب‌آوری و مدارشکن‌ها

از مسیر **Dashboard → Settings → Resilience** پیکربندی کنید.

OmniRoute تاب‌آوری در سطح ارائه‌دهنده را با پنج مؤلفه پیاده‌سازی می‌کند:

1. **صف و آهنگ درخواست‌ها** — شکل‌دهی درخواست‌ها در سطح سامانه:
   - **درخواست در دقیقه (RPM)** — حداکثر تعداد درخواست در دقیقه برای هر حساب
   - **حداقل فاصله میان درخواست‌ها** — کمترین فاصله زمانی میان درخواست‌ها بر حسب میلی‌ثانیه
   - **حداکثر درخواست‌های هم‌زمان** — بیشترین تعداد درخواست هم‌زمان برای هر حساب

2. **دوره انتظار اتصال** — پیکربندی بر اساس نوع احراز هویت برای یک اتصال پس از خطاهای قابل‌تلاش مجدد:
   - **دوره انتظار پایه** — بازه پیش‌فرض انتظار برای خطاهای قابل‌تلاش مجدد سرویس بالادستی
   - **استفاده از راهنمای تلاش مجدد سرویس بالادستی** — رعایت مقدار معتبر `Retry-After` یا راهنمای بازنشانی در صورت ارائه
   - **حداکثر مراحل عقب‌نشینی** — بیشترین سطح عقب‌نشینی نمایی برای خطاهای تکراری

3. **مدارشکن ارائه‌دهنده** — خطاهای سرتاسری ارائه‌دهنده را پایش می‌کند و پس از رسیدن به آستانه تعیین‌شده، مدار را خودکار باز می‌کند:
   - **آستانه خطا** — تعداد خطاهای پیاپی ارائه‌دهنده پیش از بازشدن مدار
   - **مهلت بازنشانی** — بازه زمانی پیش از آزمایش دوباره ارائه‌دهنده
   - **CLOSED** (سالم) — درخواست‌ها به‌طور عادی جریان دارند
   - **OPEN** — ارائه‌دهنده پس از خطاهای تکراری موقتاً مسدود می‌شود
   - **HALF_OPEN** — بازیابی ارائه‌دهنده در حال آزمایش است

   محدودیت نرخ `429` در سطح اتصال داخل **Connection Cooldown** باقی می‌ماند و در مدارشکن ارائه‌دهنده محاسبه نمی‌شود.

   وضعیت زمان اجرای مدارشکن ارائه‌دهنده فقط در **Dashboard → Health** نمایش داده می‌شود.

4. **انتظار برای پایان دوره توقف** — اگر همه اتصال‌های نامزد در دوره انتظار باشند، OmniRoute می‌تواند تا پایان نخستین دوره منتظر بماند و همان درخواست کارخواه را خودکار دوباره اجرا کند.

5. **تشخیص خودکار محدودیت نرخ** — وقتی ارائه‌دهنده بالادستی بازه انتظار صریحی برمی‌گرداند، در صورت فعال‌بودن این تنظیم، آن راهنما جایگزین دوره انتظار محلی اتصال می‌شود.

**نکته کاربردی:** پس از اختلال، برای بررسی و بازنشانی مدارشکن‌های فعال ارائه‌دهندگان از صفحه **Health** استفاده کنید. صفحه Resilience فقط پیکربندی را تغییر می‌دهد.

---

### برون‌برد و درون‌ریزی پایگاه داده

نسخه‌های پشتیبان پایگاه داده را از مسیر **Dashboard → Settings → System & Storage** مدیریت کنید.

| عملیات                   | توضیح                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Export Database**      | پایگاه داده فعلی SQLite را در قالب فایل `.sqlite` دریافت می‌کند.                                                                                                    |
| **Export All (.tar.gz)** | یک بایگانی پشتیبان کامل شامل پایگاه داده، تنظیمات، ترکیب‌ها، اتصال‌های ارائه‌دهندگان بدون اطلاعات ورود و فراداده کلیدهای API دریافت می‌کند.                         |
| **Import Database**      | یک فایل `.sqlite` را برای جایگزینی پایگاه داده فعلی بارگذاری می‌کند. مگر آنکه `DISABLE_SQLITE_AUTO_BACKUP=true` باشد، پیش از درون‌ریزی خودکار نسخه پشتیبان می‌سازد. |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**اعتبارسنجی درون‌ریزی:** یکپارچگی فایل واردشده با بررسی pragma در SQLite، وجود جدول‌های لازم (`provider_connections`، `provider_nodes`، `combos` و `api_keys`) و اندازه فایل تا سقف ۱۰۰ مگابایت کنترل می‌شود.

**موارد استفاده:**

- انتقال OmniRoute میان دستگاه‌ها
- ساخت نسخه پشتیبان بیرونی برای بازیابی پس از خرابی
- اشتراک‌گذاری پیکربندی میان اعضای تیم با برون‌برد کامل و ارسال بایگانی

---

### پیشخوان تنظیمات

صفحه تنظیمات برای دسترسی آسان در شش زبانه سازمان‌دهی شده است:

| زبانه          | محتوا                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| **General**    | ابزارهای ذخیره‌سازی سامانه، تنظیمات ظاهری، کنترل پوسته و نمایش یا پنهان‌سازی هر مورد در نوار کناری          |
| **Security**   | تنظیمات ورود و گذرواژه، کنترل دسترسی بر اساس IP، احراز هویت API برای `/models` و مسدودسازی ارائه‌دهنده      |
| **Routing**    | راهبرد مسیریابی سراسری با شش گزینه، نام‌های مستعار مدل با نویسه عام، زنجیره‌های جایگزین و پیش‌فرض‌های ترکیب |
| **Resilience** | صف درخواست، دوره انتظار اتصال، پیکربندی مدارشکن ارائه‌دهنده و رفتار انتظار برای پایان دوره توقف             |
| **AI**         | پیکربندی بودجه تفکر، تزریق پرامپت سراسری سامانه و آمار حافظه نهان پرامپت                                    |
| **Advanced**   | پیکربندی پراکسی سراسری HTTP/SOCKS5                                                                          |

---

### مدیریت هزینه و بودجه

از مسیر **Dashboard → Costs** وارد شوید.

| زبانه       | کاربرد                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| **Budget**  | تعیین سقف هزینه برای هر کلید API با بودجه روزانه، هفتگی یا ماهانه و پایش لحظه‌ای  |
| **Pricing** | مشاهده و ویرایش قیمت مدل‌ها؛ هزینه هر هزار توکن ورودی و خروجی برای هر ارائه‌دهنده |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**پایش هزینه:** برای هر درخواست، میزان مصرف توکن ثبت و هزینه بر اساس جدول قیمت محاسبه می‌شود. جزئیات تفکیکی را بر اساس ارائه‌دهنده، مدل و کلید API در مسیر **Dashboard → Usage** ببینید.

---

### رونویسی صوت

OmniRoute از رونویسی صوت از طریق نقطه پایانی سازگار با OpenAI پشتیبانی می‌کند:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

ارائه‌دهندگان موجود: **Deepgram** با پیشوند `deepgram/` و **AssemblyAI** با پیشوند `assemblyai/`.

قالب‌های صوتی پشتیبانی‌شده: `mp3`، `wav`، `m4a`، `flac`، `ogg` و `webm`.

---

### راهبردهای متعادل‌سازی ترکیب

متعادل‌سازی هر ترکیب را از مسیر **Dashboard → Combos → Create/Edit → Strategy** پیکربندی کنید.

| راهبرد             | توضیح                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **Round-Robin**    | مدل‌ها را به‌ترتیب و به‌صورت چرخشی انتخاب می‌کند.                                          |
| **Priority**       | همیشه ابتدا مدل اول را امتحان می‌کند و فقط در صورت خطا سراغ مدل جایگزین می‌رود.            |
| **Random**         | برای هر درخواست، یک مدل را به‌صورت تصادفی از ترکیب انتخاب می‌کند.                          |
| **Weighted**       | درخواست‌ها را متناسب با وزن تعیین‌شده برای هر مدل هدایت می‌کند.                            |
| **Least-Used**     | درخواست را به مدلی با کمترین تعداد درخواست اخیر می‌فرستد و از معیارهای ترکیب بهره می‌گیرد. |
| **Cost-Optimized** | با استفاده از جدول قیمت، درخواست را به ارزان‌ترین مدل موجود هدایت می‌کند.                  |

پیش‌فرض‌های سراسری ترکیب را می‌توان در مسیر **Dashboard → Settings → Routing → Combo Defaults** تنظیم کرد.

---

### پیشخوان سلامت

از مسیر **Dashboard → Health** وارد شوید. نمای لحظه‌ای سلامت سامانه در شش کارت ارائه می‌شود:

| کارت                  | اطلاعات نمایش‌داده‌شده                                           |
| --------------------- | ---------------------------------------------------------------- |
| **System Status**     | مدت فعالیت، نسخه، میزان مصرف حافظه و پوشه داده‌ها                |
| **Provider Health**   | وضعیت زمان اجرای مدارشکن سراسری ارائه‌دهنده                      |
| **Rate Limits**       | دوره‌های انتظار فعال اتصال برای هر حساب همراه با زمان باقی‌مانده |
| **Active Lockouts**   | انسدادهای فعال در سطح مدل و موارد حذف موقت                       |
| **Signature Cache**   | آمار حافظه نهان حذف موارد تکراری شامل کلیدهای فعال و نرخ اصابت   |
| **Latency Telemetry** | تجمیع زمان تأخیر p50، p95 و p99 برای هر ارائه‌دهنده              |

**نکته کاربردی:** صفحه Health هر ۱۰ ثانیه خودکار به‌روزرسانی می‌شود. با کارت مدارشکن، ارائه‌دهندگانی را که دچار مشکل شده‌اند شناسایی کنید.

---

## 🖥️ برنامه دسکتاپ (Electron)

OmniRoute به‌صورت برنامه دسکتاپ بومی برای Windows، macOS و Linux در دسترس است.

### نصب

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
```

### ساخت نصب‌کننده‌ها

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

مسیر خروجی ← `electron/dist-electron/`

### قابلیت‌های کلیدی

| قابلیت                | توضیح                                                                       |
| --------------------- | --------------------------------------------------------------------------- |
| **آمادگی سرور**       | پیش از نمایش پنجره، وضعیت سرور را بررسی می‌کند تا صفحه خالی نشان داده نشود. |
| **سینی سامانه**       | کوچک‌کردن برنامه در سینی، تغییر درگاه و خروج از طریق منوی سینی              |
| **مدیریت درگاه**      | تغییر درگاه سرور از سینی و راه‌اندازی مجدد خودکار سرور                      |
| **سیاست امنیت محتوا** | اعمال CSP محدودکننده از طریق سرآیندهای نشست                                 |
| **اجرای تک‌نمونه‌ای** | در هر لحظه فقط یک نمونه از برنامه می‌تواند اجرا شود.                        |
| **حالت آفلاین**       | سرور همراه Next.js بدون اینترنت کار می‌کند.                                 |

### متغیرهای محیطی

| متغیر                 | مقدار پیش‌فرض | توضیح                                            |
| --------------------- | ------------- | ------------------------------------------------ |
| `OMNIROUTE_PORT`      | `20128`       | درگاه سرور                                       |
| `OMNIROUTE_MEMORY_MB` | `512`         | سقف حافظه heap در Node.js از ۶۴ تا ۱۶۳۸۴ مگابایت |

📖 مستندات کامل: [`electron/README.md`](../../../../../electron/README.md)
