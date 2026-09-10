# CLI-TOOLS (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "ابزارهای CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# ابزارهای CLI — OmniRoute

آخرین به‌روزرسانی: 2026-08-18

OmniRoute با سه دسته از ابزارهای CLI که در سه صفحه داشبورد اختصاصی پخش شده‌اند، یکپارچه می‌شود:

| صفحه              | مسیر                    | مفهوم                                                                                  | تعداد                  |
| ----------------- | ----------------------- | -------------------------------------------------------------------------------------- | ---------------------- |
| **کدهای CLI**     | `/dashboard/cli-code`   | ابزارهای کدنویسی که به OmniRoute اشاره می‌کنند (مشتری → CLI → OmniRoute → ارائه‌دهنده) | 26                     |
| **نمایندگان CLI** | `/dashboard/cli-agents` | نمایندگان خودکار که به OmniRoute اشاره می‌کنند (همان جریان، دامنه وسیع‌تر)             | 8                      |
| **نمایندگان ACP** | `/dashboard/acp-agents` | CLIهایی که OmniRoute به عنوان بک‌اند از طریق stdio/ACP ایجاد می‌کند (جریان معکوس)      | به ثبت‌نام مراجعه کنید |

مسیرهای قدیمی از طریق 308 هدایت می‌شوند: `/dashboard/cli-tools` → `/dashboard/cli-code`، `/dashboard/agents` → `/dashboard/acp-agents`.

---

## نحوه کار

```
کدهای CLI / نمایندگان CLI (جریان مصرف):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (همه به OmniRoute اشاره می‌کنند)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute به ارائه‌دهنده صحیح هدایت می‌کند)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

نمایندگان ACP (جریان ایجاد معکوس):
    درخواست مشتری → OmniRoute → CLI را از طریق stdio/ACP ایجاد می‌کند → پاسخ
```

**مزایا:**

- یک کلید API برای مدیریت همه ابزارها
- ردیابی هزینه‌ها در تمام CLIها در داشبورد
- تغییر مدل بدون نیاز به پیکربندی مجدد هر ابزار
- کارکرد محلی و بر روی سرورهای از راه دور (VPS، Docker، Akamai، Cloudflare Tunnel)

---

## پیکربندی خودکار با `setup-*`

شما نیازی به نوشتن پیکربندی هر ابزار به صورت دستی ندارید. OmniRoute یک دستور `setup-*`
برای هر CLI پشتیبانی شده ارائه می‌دهد که کاتالوگ مدل **زنده** را از یک OmniRoute در حال اجرا (محلی یا از راه دور) می‌خواند و پیکربندی خود ابزار را بر روی ماشین شما می‌نویسد:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

هر کدام `--remote <url> --api-key <key>` را می‌پذیرند (پیکربندی یک ابزار محلی در برابر یک OmniRoute از راه دور)، `--dry-run` (پیش‌نمایش بدون نوشتن) و `--port`. ابزارهایی که کشف خودکار مدل ندارند (Cline، Kilo، Roo، Goose، Aider، Qwen) `--model <id>` را می‌پذیرند (و `--yes` برای اجراهای غیرتعامل‌پذیر). برای راه‌اندازی یک CLI با محیط صحیح و بدون نوشتن هیچ پیکربندی، از راه‌انداز عمومی
`omniroute run <target>` استفاده کنید (claude، codex، aider، goose، opencode، qwen،
gemini — اهداف و نام‌های مستعار از `bin/cli/cli-manifest.mjs` می‌آیند)؛ راه‌اندازهای قدیمی به ازای هر ابزار `omniroute launch` (Claude Code) و `omniroute launch-codex`
(Codex) همچنان در دسترس هستند. CLI جیمنای فقط برای راه‌اندازی است: این یک هدف `omniroute run`
است اما هیچ دستور `setup-*`/`configure` ندارد.

> **مرجع کامل:** جدول اصلی — آنچه هر دستور می‌نویسد، هر پرچم،
> محلی در مقابل از راه دور، و اینکه کدام ابزارها به یک پسوند `/v1` نیاز دارند — در
> **[یکپارچه‌سازی‌های CLI](../guides/CLI-INTEGRATIONS.md)** موجود است.

### اجرای این‌ها در داخل یک کانتینر

یک دستور `setup-*` که در داخل کانتینر OmniRoute اجرا می‌شود، در خانه خود کانتینر می‌نویسد، که هیچ CLI میزبان آن را نمی‌خواند و با کانتینر ناپدید می‌شود. OmniRoute این را تشخیص می‌دهد و با دستورالعمل‌ها `2` خارج می‌شود به جای نوشتن. دو راه پشتیبانی شده برای پیشرفت — نصب CLI بر روی میزبان و
`omniroute connect` به کانتینر، یا بایند-مونت کردن دایرکتوری‌های پیکربندی و تنظیم
`CLI_CONFIG_HOME` (پروفایل میزبان کامپوز). هر دستور `setup-*`، به علاوه
`omniroute configure` و `omniroute config set`، `--allow-container-write` را می‌پذیرند زمانی که پیکربندی CLIهای خود کانتینر واقعاً منظور شما بوده است؛ `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` همین کار را برای
سرور انجام می‌دهد. به
[راهنمای Docker → پیکربندی ابزارهای CLI میزبان](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker) مراجعه کنید.

نقطه پایانی **اعمال داشبورد** (`POST /api/cli-tools/apply`) همان محافظ را اعمال می‌کند: در یک کانتینر، نوشتن که هدف آن از میزبان بایند-مونت نشده است، **`422`** را با `containerEphemeralTarget: true`، متن خطای ایمن و — برای ابزارهایی که دستور میزبان دارند (claude، codex، opencode، cline،
kilo، continue) — یک `hostSetupCommand` (به عنوان مثال `omniroute setup-opencode`) برای اجرا بر روی میزبان به جای آن؛ هیچ چیزی نوشته نمی‌شود. `dryRun: true` در حالت کانتینر همچنان کار می‌کند و محتوای تولید شده + مسیر هدف را بدون لمس دیسک برمی‌گرداند، بنابراین می‌توانید از داشبورد پیش‌نمایش کنید و بر روی میزبان اعمال کنید. این رفتار عمدی است و توسط
`tests/unit/api/cli-tools/apply-container-guard.test.ts` محافظت می‌شود — هرگز "اصلاح" نکنید یک 422 را با حذف محافظ.

---

## منبع حقیقت

کاتالوگ یکپارچه در `src/shared/constants/cliTools.ts` به عنوان `CLI_TOOLS: Record<string, CliCatalogEntry>` وجود دارد.

هر ورودی دارای این فیلدها است (تعریف شده در `src/shared/schemas/cliCatalog.ts`):

| فیلد                                            | نوع                                                          | توضیحات                                                      |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | کدام صفحه ابزار را نمایش می‌دهد                              |
| `vendor`                                        | `string`                                                     | منبع ابزار ("Anthropic"، "OSS (P. Gauthier)")                |
| `acpSpawnable`                                  | `boolean`                                                    | همچنین به عنوان یک عامل ACP قابل استفاده است (نشان داده شده) |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | سطح پشتیبانی از نقطه پایانی سفارشی. `"none"` = MITM backlog  |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | مکانیزم پیکربندی                                             |
| `id`, `name`, `color`, `description`, `docsUrl` | استاندارد                                                    | فیلدهای اصلی نمایش                                           |

ورودی‌هایی با `baseUrlSupport: "none"` در صفحات داشبورد **نمایش داده نمی‌شوند** — آنها در MITM backlog برای طرح 11 ثبت شده‌اند (به `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` مراجعه کنید).

### سطوح قابلیت (کاتالوگ شده × قابل شناسایی × قابل پیکربندی × قابل راه‌اندازی)

هر ابزار کاتالوگ شده قابل شناسایی، قابل پیکربندی یا قابل راه‌اندازی نیست. هر سطح یک منبع اعلام کننده دارد و یک تست انحراف آنها را هم‌راستا نگه می‌دارد:

| سطح                 | معنی                                                                               | اعلام شده در                                                      |
| ------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **کاتالوگ شده**     | در کاتالوگ داشبورد ظاهر می‌شود (نام، فروشنده، مستندات، نوع پیکربندی)               | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **قابل شناسایی**    | شناسایی باینری/پیکربندی، بررسی سلامت، مسیرهای پیکربندی                             | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **قابل پیکربندی**   | توسط `omniroute configure <cli>` پشتیبانی می‌شود (دستورالعمل راه‌اندازی وجود دارد) | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **قابل راه‌اندازی** | توسط `omniroute run <target>` پشتیبانی می‌شود (تزریق env/args تعریف شده)           | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` مانفیست اجرایی رسمی برای دستورات CLI است: `run`، `configure` و تولیدکنندگان تکمیل شل همه لیست‌های هدف، حل نام مستعار (به عنوان مثال `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) و اتصال پرچم `--model` را از آن استخراج می‌کنند. نگهبان انحراف
`tests/unit/cli/cli-manifest-drift.test.ts` تأیید می‌کند که مانفیست، کاتالوگ زمان اجرا، کاتالوگ UI و هر سطح مصرف‌کننده در همگام بمانند — هدفی که به یک سطح اضافه می‌شود بدون اینکه به دیگران اضافه شود، به جای انحراف بی‌صدا، آزمون را شکست می‌دهد.

## 1. کاتالوگ کد CLI (۲۶ ابزار)

تمام ابزارهایی که در `/dashboard/cli-code` ظاهر می‌شوند. آن‌هایی که `baseUrlSupport: none` دارند از طریق MITM یا یک راهنمای دستی به جای یک URL پایه سفارشی متصل شده‌اند:

| id           | name                     | vendor                      | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ------------------------ | --------------------------- | -------------- | -------------- | ------------ |
| claude       | کد کلاود                 | Anthropic                   | full           | env            | true         |
| codex        | CLI کد OpenAI            | OpenAI                      | full           | custom         | true         |
| zcode        | ZCode (برنامه نویسی GLM) | Z.ai                        | none           | custom         | false        |
| cline        | Cline                    | OSS (توسعه‌دهنده ex-Claude) | full           | custom         | true         |
| kilo         | کد کیلو                  | Kilo-Org                    | full           | custom         | false        |
| roo          | کد رو                    | Roo (OSS)                   | full           | guide          | false        |
| continue     | ادامه                    | continue.dev                | full           | guide          | false        |
| aider        | Aider                    | OSS (P. Gauthier)           | full           | guide          | true         |
| forge        | ForgeCode                | Antinomy HQ                 | full           | custom         | true         |
| jcode        | jcode                    | 1jehuang (OSS)              | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI             | Hunter Bown (OSS)           | full           | custom         | false        |
| codewhale    | CodeWhale                | Hmbown (OSS)                | full           | custom         | false        |
| opencode     | OpenCode                 | Anomaly (ex-SST)            | full           | guide          | true         |
| droid        | Factory Droid            | Factory AI                  | partial        | guide          | false        |
| copilot      | CLI کد GitHub Copilot    | GitHub/MS                   | full           | custom         | false        |
| cursor-cli   | CLI کد Cursor            | Anysphere                   | partial        | guide          | true         |
| smelt        | Smelt                    | leonardcser (OSS)           | full           | custom         | false        |
| pi           | Pi (عامل کدگذاری pi)     | M. Zechner (OSS)            | full           | custom         | false        |
| grok-build   | Grok Build               | xAI                         | full           | custom         | false        |
| crush        | Crush                    | OSS (Charm)                 | full           | custom         | false        |
| qwen         | کد Qwen                  | Alibaba                     | full           | guide          | true         |
| cursor       | Cursor                   | Anysphere                   | none           | guide          | false        |
| antigravity  | ضد جاذبه                 | Google                      | none           | mitm           | false        |
| hermes       | هرمس                     | Nous Research               | none           | guide          | false        |
| kiro         | Kiro AI                  | Amazon                      | none           | mitm           | false        |
| custom       | CLI سفارشی               | —                           | full           | custom-builder | false        |

ابزارهایی که `baseUrlSupport: "partial"` دارند در کارت داشبورد نشان "⚠ Base URL parcial" را نمایش می‌دهند.
---

## 2. کاتالوگ ابزارهای CLI (8 ابزار)

عامل‌های خودمختار که در `/dashboard/cli-agents` ظاهر می‌شوند:

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | عامل هرمس        | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |

---

## 3. عامل‌های ACP (/dashboard/acp-agents)

این صفحه (که از `/dashboard/agents` تغییر نام داده است) CLIهایی را نشان می‌دهد که OmniRoute می‌تواند به عنوان موتورهای اجرایی backend از طریق پروتکل stdio/ACP **ایجاد** کند. کاتالوگ به طور جداگانه در `src/lib/acp/registry.ts` نگهداری می‌شود و **همانند** `CLI_TOOLS` نیست.

---

## 4. لیست معوقه MITM (در داشبورد نمایش داده نمی‌شود)

CLIهای زیر به طور طبیعی از URL پایه سفارشی پشتیبانی نمی‌کنند و در صفحات کد CLI یا عامل‌های CLI **فهرست نشده‌اند**. آن‌ها نامزدهای مداخله MITM در طرح 11 هستند:

| CLI                 | دلیل                                                   |
| ------------------- | ------------------------------------------------------ |
| windsurf            | BYOK محدود به مدل‌های انتخابی Claude + URL/token شرکتی |
| amp                 | اکوسیستم بسته (Sourcegraph)                            |
| amazon-q / kiro-cli | احراز هویت AWS SSO، بدون URL سفارشی                    |
| cowork              | Anthropic Desktop، بدون نقطه پایانی قابل تنظیم         |

برای مرجع کامل به `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` مراجعه کنید.

---

## 5. API تشخیص دسته‌ای

تمام تشخیص ابزارها از طریق یک نقطه پایانی واحد تجمیع می‌شود:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (همانند سایر مسیرهای `/api/cli-tools/`)
- Returns: `Record<toolId, ToolBatchStatus>` (نوع: `src/shared/types/cliBatchStatus.ts`)
- Strategy: `Promise.all` بر روی تمام ابزارها، 5 ثانیه زمان محدود برای هر ابزار
- Cache: در حافظه LRU با ایندکس فایل پیکربندی `mtime`. کش زمانی که mtime تغییر کند، نامعتبر می‌شود. در زمان راه‌اندازی مجدد سرور بازنشانی می‌شود.

شکل پاسخ برای هر ابزار:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // sanitized, no stack traces
}
```

## ۶. مدیریت تنظیمات برای ابزارهای جدید

ابزارهای جدید با `configType: "custom"` دارای مسیرهای API تنظیمات اختصاصی هستند:

| مسیر                                        | ابزار                                                            |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

تمام مسیرها از `sanitizeErrorMessage()` برای پاسخ‌های خطا استفاده می‌کنند (قانون سخت شماره ۱۲).

---

## ۷. معماری صفحات داشبورد

### کد CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — کامپوننت سرور
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — گرید کلاینت
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — صفحه جزئیات ابزار
- `src/app/(dashboard)/dashboard/cli-code/components/` — ۱۲ کارت ابزار تخصصی + `ToolDetailClient.tsx`

### عوامل CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — کامپوننت سرور
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — گرید کلاینت
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — استفاده مجدد از `ToolDetailClient`

### عوامل ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — کامپوننت سرور (انتقال یافته از `agents/`)

### کامپوننت‌های UI مشترک (`src/shared/components/cli/`)

| فایل                    | هدف                                               |
| ----------------------- | ------------------------------------------------- |
| `CliToolCard.tsx`       | کارت وضعیت هوشمند (تشخیص + تنظیمات + نقطه پایانی) |
| `CliConceptCard.tsx`    | کارت توضیح مفهوم در هر صفحه                       |
| `CliComparisonCard.tsx` | مقایسه سه ستونی بین انواع CLI                     |
| `BaseUrlSelect.tsx`     | منوی کشویی نقطه پایانی (محلی/ابری/سفارشی)         |
| `ApiKeySelect.tsx`      | انتخاب‌کننده کلید API                             |
| `ManualConfigModal.tsx` | مدال قطعه کد تنظیمات قابل کپی                     |

### هوک مشترک (`src/shared/hooks/cli/`)

| فایل                      | هدف                                                                    |
| ------------------------- | ---------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | دریافت `/api/cli-tools/all-statuses`، مدیریت حالت بارگذاری/به‌روزرسانی |

## 8. i18n

فضاهای نام جدید در طرح 14 F9 اضافه شده‌اند:

| Namespace   | Purpose                                                                   |
| ----------- | ------------------------------------------------------------------------- |
| `cliCommon` | رشته‌های مشترک (برچسب‌های کارت، متون مفهوم/مقایسه، برچسب‌های صفحه جزئیات) |
| `cliCode`   | رشته‌های صفحه CLI Code                                                    |
| `cliAgents` | رشته‌های صفحه CLI Agents                                                  |
| `acpAgents` | رشته‌های صفحه ACP Agents                                                  |

ترجمه‌های کامل PT-BR و EN ارائه شده‌اند. 39 زبان دیگر به طور خودکار از طریق ادغام سطح فضای نام در `src/i18n/request.ts` به EN برمی‌گردند.

---

## 9. شروع سریع

### مرحله 1 — دریافت کلید API OmniRoute

1. به `/dashboard/api-manager` بروید → **ایجاد کلید API**
2. یک نام به آن بدهید (مثلاً `cli-tools`) و تمام مجوزها را انتخاب کنید
3. کلید را کپی کنید — شما به آن برای هر CLI زیر نیاز خواهید داشت

> کلید شما به شکل زیر است: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### مرحله 2 — نصب ابزارهای CLI

تمام ابزارهای مبتنی بر npm به Node.js 22.22.2+ یا 24.x نیاز دارند:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (قابل راه‌اندازی از طریق `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # مبتنی بر Rust

# Pi coding agent
# برای نصب به https://github.com/zechnerj/pi-coding-agent مراجعه کنید

# jcode
# برای نصب به https://github.com/1jehuang/jcode مراجعه کنید
```

---

### مرحله 3 — پیکربندی از طریق داشبورد

1. به `http://localhost:20128/dashboard/cli-code` بروید
2. ابزار خود را در شبکه پیدا کنید
3. بر روی کارت کلیک کنید تا صفحه جزئیات ابزار باز شود
4. کلید API و URL پایه خود را انتخاب کنید
5. بر روی **اعمال پیکربندی** کلیک کنید یا قطعه کد پیکربندی دستی را کپی کنید

---

### مرحله 4 — تنظیم متغیرهای محیطی جهانی

```bash
# نقطه پایانی جهانی OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI در ROOT متغیر GOOGLE_GEMINI_BASE_URL را می‌خواند (SDK آن به طور خودکار /v1beta/... را اضافه می‌کند)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> برای **سرور از راه دور** `localhost:20128` را با IP یا دامنه سرور جایگزین کنید،
> مثلاً `http://<your-server-ip>:20128`.

---

### مرحله 4 — پیکربندی هر ابزار

#### Claude Code

```bash
# ایجاد ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

از ریشه دروازه یکپارچه Anthropic برای Claude Code استفاده کنید. در اینجا `/v1` را اضافه نکنید.

**آزمایش:** `claude "say hello"`

---

#### OpenAI Codex

Codex مدرن (v0.137+) فقط `~/.codex/config.toml` را می‌خواند — `config.yaml` قدیمی متعلق به CLI قدیمی npm است و به طور خاموش نادیده گرفته می‌شود. کلید API در متغیر محیطی `OMNIROUTE_API_KEY` (`env_key`) باقی می‌ماند و هرگز در داخل فایل نیست:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

مرجع کامل (پروفایل‌ها، `wire_api`، پنجره‌های زمینه): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**آزمایش:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**آزمایش:** `opencode`

> از `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> برای ارسال واریانت‌های تفکر استفاده کنید.

---

#### Cline (CLI یا VS Code)

**حالت CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**حالت VS Code:**
تنظیمات افزونه Cline → ارائه‌دهنده API: `OpenAI Compatible` → URL پایه: `http://localhost:20128/v1`

یا از داشبورد OmniRoute استفاده کنید → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI یا VS Code)

**حالت CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**تنظیمات VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

یا از داشبورد OmniRoute استفاده کنید → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (افزونه VS Code)

فایل `~/.continue/config.yaml` را ویرایش کنید:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

پس از ویرایش، VS Code را دوباره راه‌اندازی کنید.

---

#### VS Code Insiders (`chatLanguageModels.json`)

از این مورد زمانی استفاده کنید که VS Code Insiders برای مدل‌های نقطه پایانی سفارشی پیکربندی شده و می‌خواهید OmniRoute بدون فیلد هدر سفارشی کار کند.

**محل توصیه شده:**

- لینوکس: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- ویندوز: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**مثال با استفاده از نام مستعار توکن‌شده OmniRoute:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**نکات:**

- `sk-your-omniroute-key` را با کلید API ایجاد شده در OmniRoute جایگزین کنید.
- فیلد `url` باید به `/api/v1/vscode/{token}/chat/completions` اشاره کند.
- فیلد `modelsUrl` باید به `/api/v1/vscode/{token}/models` اشاره کند.
- در صورت پشتیبانی کلاینت از هدرهای سفارشی، از جریان معمول `/v1` + هدر Bearer استفاده کنید.
- توکن‌های جاسازی شده در URL یک بازگشت سازگاری هستند و ممکن است در لاگ‌های ویرایشگر یا تاریخچه پروکسی ظاهر شوند.

---

#### Kiro CLI (آمازون)

```bash
# به حساب AWS/Kiro خود وارد شوید:
kiro-cli login

# CLI از احراز هویت خود استفاده می‌کند — OmniRoute به عنوان backend برای Kiro CLI خود لازم نیست.
# از kiro-cli در کنار OmniRoute برای ابزارهای دیگر استفاده کنید.
kiro-cli status
```

برای برنامه دسکتاپ **Kiro IDE**، از نقطه پایانی MITM که توسط OmniRoute در زیر `/dashboard/cli-tools → Kiro` در دسترس است استفاده کنید.

---

## 10. CLI داخلی OmniRoute

باینری `omniroute` دستورات مربوط به چرخه عمر سرور، راه‌اندازی، تشخیص و مدیریت ارائه‌دهنده را فراهم می‌کند. نقطه ورودی: `bin/omniroute.mjs`.

```bash
omniroute                              # شروع سرور (پورت پیش‌فرض 20128)
omniroute setup                        # ویزارد راه‌اندازی تعاملی
omniroute doctor                       # بررسی پیکربندی، پایگاه داده، پورت‌ها، زمان اجرا
omniroute providers list               # اتصالات ارائه‌دهنده پیکربندی شده
omniroute providers test-all           # تست هر اتصال فعال
omniroute reset-password               # بازنشانی رمز عبور مدیر
omniroute logs                         # استریم لاگ‌های درخواست
omniroute health                       # سلامت دقیق (شکست‌ها، کش، حافظه)
omniroute --version                    # چاپ نسخه
omniroute --help                       # نمایش تمام دستورات
```

### راه‌اندازی و اولیه‌سازی

```bash
omniroute setup                        # ویزارد راه‌اندازی تعاملی
omniroute setup --non-interactive      # حالت CI/خودکار (خواندن متغیرهای محیطی + پرچم‌ها)
omniroute setup --password '<value>'   # تنظیم رمز عبور مدیر به طور مستقیم
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # افزودن و تست یک ارائه‌دهنده در یک مرحله
```

متغیرهای محیطی شناخته شده برای راه‌اندازی غیر تعاملی:

| Var                 | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | کلید API ارائه‌دهنده (متصل به `--api-key` از طریق Commander `.env()`) |
| `DATA_DIR`          | بازنویسی دایرکتوری داده‌های OmniRoute                                 |

تمام ورودی‌های غیر تعاملی دیگر به عنوان پرچم‌ها ارسال می‌شوند، نه متغیرهای محیطی:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(به گزینه‌های `omniroute setup` در بالا مراجعه کنید).

### تشخیص

```bash
omniroute doctor                       # بررسی پیکربندی، پایگاه داده، پورت‌ها، زمان اجرا، حافظه، زنده بودن
omniroute doctor --json                # JSON قابل خواندن توسط ماشین
omniroute doctor --no-liveness         # رد کردن پروب سلامت HTTP
omniroute doctor --host 0.0.0.0        # بازنویسی میزبان زنده بودن
omniroute doctor --liveness-url <url>  # بازنویسی کامل URL نقطه پایانی سلامت
```

دکتر این بررسی‌ها را انجام می‌دهد: `پیکربندی`, `پایگاه داده`, `ذخیره‌سازی/رمزگذاری`,
`دسترس‌پذیری پورت`, `زمان اجرای نود`, `باینری بومی` (better-sqlite3),
`حافظه`, و `زنده بودن سرور`. اگر هر بررسی `شکست` بخورد، با کد غیر صفر خارج می‌شود.

### مدیریت ارائه‌دهنده

```bash
omniroute providers available                       # کاتالوگ ارائه‌دهنده OmniRoute
omniroute providers available --search openai       # فیلتر کاتالوگ بر اساس id/name/alias/category
omniroute providers available --category api-key    # فیلتر بر اساس دسته (api-key, oauth, free, ...)
omniroute providers available --json                # JSON قابل خواندن توسط ماشین

omniroute providers list                            # اتصالات ارائه‌دهنده پیکربندی شده
omniroute providers list --json

omniroute providers test <id|name>                  # تست یک اتصال پیکربندی شده
omniroute providers test-all                        # تست هر اتصال فعال
omniroute providers validate                        # اعتبارسنجی ساختاری محلی
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # جریان OAuth موجود
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-first هستند و بنابراین بر اساس
زمینه محلی یا از راه دور فعال کار می‌کنند. ورودی اعتبارنامه باید از
`--credential-stdin` یا `--credential-env` استفاده کند؛ `--dry-run --json` فقط
حضور/شکل مخفی شده را گزارش می‌دهد. `providers available` کاتالوگ OmniRoute را می‌خواند؛
`providers list/test/test-all/validate` رفتار SQLite محلی خود را حفظ می‌کنند و
نیاز به اجرای سرور ندارند.

### بازیابی و بازنشانی

```bash
omniroute reset-password                # بازنشانی رمز عبور مدیر (همچنین: omniroute-reset-password)
omniroute reset-encrypted-columns       # نمایش هشدار + اجرای آزمایشی برای بازنشانی اعتبارنامه‌های رمزگذاری شده
omniroute reset-encrypted-columns --force  # در واقع اعتبارنامه‌های رمزگذاری شده را در SQLite خنثی کنید
```

### صادرات اعتبارنامه (⚠ با احتیاط برخورد کنید)

```bash
omniroute auth export                                 # نمایش هشدار + دروازه تأیید — بدون دسترسی به پایگاه داده
omniroute auth export --force                          # صادرات اعتبارنامه‌های DECRYPTED تمام اتصالات به stdout به عنوان JSON
omniroute auth export --force --id <id>                 # صادرات فقط اتصال مطابقت‌دهنده
omniroute auth export --force --format env               # تولید خطوط OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # نوشتن در یک فایل (ایجاد شده با مجوز 0600)
```

`auth export` **فقط محلی** است (خواندن مستقیم SQLite، بدون مسیر HTTP) و عمداً
مقادیر **متن ساده** `apiKey`/`accessToken`/`refreshToken`/`idToken` را چاپ/می‌نویسد — این ویژگی است، نه یک
اشکال. هیچ چیزی از پایگاه داده خوانده نمی‌شود و هیچ چیزی بدون `--force` رمزگشایی نمی‌شود. یک بنر هشدار stderr همیشه قبل از هر متنی چاپ می‌شود. نیاز به تنظیم `STORAGE_ENCRYPTION_KEY` دارد. یک فیلدی که در رمزگشایی شکست می‌خورد (کلید منقضی، متن رمزگذاری شده خراب) به عنوان
`<field>DecryptFailed: true` گزارش می‌شود به جای اینکه کل صادرات را متوقف کند یا خطای زیرین را نشت دهد.

### سایر زیر دستورات

اینها فرض می‌کنند که یک سرور OmniRoute در حال اجرا است، مگر اینکه خلاف آن ذکر شده باشد:

```bash
omniroute status                       # وضعیت جامع زمان اجرا
omniroute logs                         # استریم لاگ‌های درخواست (--json, --search, --follow)
omniroute config show                  # نمایش پیکربندی فعلی

omniroute provider list                # لیست ارائه‌دهندگان موجود (معادل لیست ارائه‌دهندگان)
omniroute provider add                 # ثبت OmniRoute به عنوان یک ارائه‌دهنده در یک ابزار
omniroute keys add | list | remove     # مدیریت کلیدهای API
omniroute models [provider]            # لیست مدل‌ها (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # عکس‌برداری از پیکربندی + پایگاه داده
omniroute restore                      # بازیابی از یک عکس‌برداری قبلی

omniroute health                       # سلامت دقیق (شکست‌ها، کش، حافظه)
omniroute quota                        # استفاده از سهم ارائه‌دهنده
omniroute cache                        # وضعیت کش
omniroute cache clear                  # پاک کردن کش‌های معنایی + امضا

omniroute mcp status | restart         # وضعیت سرور MCP / راه‌اندازی مجدد
omniroute a2a status | card            # وضعیت سرور A2A / کارت عامل

omniroute tunnel list | create | stop  # مدیریت تونل‌ها (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # بررسی / تنظیم متغیرهای محیطی (موقت)

omniroute test                         # تست اتصال به ارائه‌دهنده
omniroute update                       # بررسی به‌روزرسانی‌ها
omniroute completion                   # تولید تکمیل شل
```

### پرچم‌های رایج

| Flag                | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `--no-open`         | به طور خودکار مرورگر را در شروع باز نکنید                      |
| `--port <n>`        | بازنویسی پورت API (پیش‌فرض 20128)                              |
| `--mcp`             | به عنوان سرور MCP بر روی stdio اجرا شود (برای IDEها)           |
| `--non-interactive` | حالت CI (بدون درخواست؛ خواندن از env/flags)                    |
| `--json`            | خروجی JSON قابل خواندن توسط ماشین (دکتر، ارائه‌دهندگان و غیره) |
| `--help`, `-h`      | نمایش کمک خاص به دستور                                         |
| `--version`, `-v`   | چاپ نسخه نصب شده                                               |

---

## نقاط پایانی API موجود

| نقطه پایانی                | توضیحات                          | استفاده برای                                   |
| -------------------------- | -------------------------------- | ---------------------------------------------- |
| `/v1/chat/completions`     | چت استاندارد (همه ارائه‌دهندگان) | همه ابزارهای مدرن                              |
| `/v1/responses`            | API پاسخ‌ها (فرمت OpenAI)        | Codex، جریان‌های عاملی                         |
| `/v1/completions`          | تکمیل متن قدیمی                  | ابزارهای قدیمی که از `prompt:` استفاده می‌کنند |
| `/v1/embeddings`           | جاسازی‌های متنی                  | RAG، جستجو                                     |
| `/v1/images/generations`   | تولید تصویر                      | GPT-Image، Flux و غیره                         |
| `/v1/audio/speech`         | تبدیل متن به گفتار               | ElevenLabs، OpenAI TTS                         |
| `/v1/audio/transcriptions` | تبدیل گفتار به متن               | Deepgram، AssemblyAI                           |

نمونه‌های آماده برای چسباندن با یک URL OmniRoute توکن‌شده:

```txt
مثال توکن: sk-a3ab3c080beaee3a-69f4a4-070d71af

پایه استاندارد OpenAI: http://localhost:20128/v1
مدل‌های VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
چت VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
پاسخ‌های VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
برچسب‌های Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
چت Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## عیب‌یابی

| خطا                                           | علت                                 | راه حل                                                  |
| --------------------------------------------- | ----------------------------------- | ------------------------------------------------------- |
| `Connection refused`                          | OmniRoute در حال اجرا نیست          | `omniroute serve`                                       |
| `401 Unauthorized`                            | کلید API اشتباه                     | بررسی در `/dashboard/api-manager`                       |
| `No combo configured`                         | هیچ ترکیب مسیریابی فعالی وجود ندارد | تنظیم در `/dashboard/combos`                            |
| CLI نشان می‌دهد "not installed"               | باینری در PATH نیست                 | بررسی `which <command>`                                 |
| داشبورد بعد از نصب نشان می‌دهد "not detected" | کش قدیمی                            | کلیک بر روی "⟳ Refresh detection" در داشبورد            |
| لینک قدیمی `/dashboard/cli-tools`             | بوکمارک پیش از v3.8.6               | به طور خودکار به `/dashboard/cli-code` (308) هدایت شد   |
| لینک قدیمی `/dashboard/agents`                | بوکمارک پیش از v3.8.6               | به طور خودکار به `/dashboard/acp-agents` (308) هدایت شد |
