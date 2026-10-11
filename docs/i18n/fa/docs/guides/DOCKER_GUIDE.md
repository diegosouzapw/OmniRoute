# 🐳 Docker Guide — OmniRoute (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> مرجع کامل استقرار Docker. برای شروع سریع، به [بخش Docker در README](../README.md#-docker) مراجعه کنید.

## فهرست مطالب

- [اجرای سریع](#quick-run)
- [استفاده از فایل محیطی](#with-environment-file)
- [Docker Compose](#docker-compose)
- [پروفایلهای موجود](#available-profiles)
- [پیکربندی ابزارهای CLI میزبان هنگام اجرای OmniRoute در Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [سرویس جانبی Redis](#redis-sidecar)
- [Compose برای محیط عملیاتی](#production-compose)
- [مراحل Dockerfile](#dockerfile-stages)
- [متغیرهای محیطی حیاتی](#critical-environment-variables)
- [Docker Compose همراه با Caddy‏ (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [تونل سریع Cloudflare](#cloudflare-quick-tunnel)
- [برچسبهای ایمیج](#image-tags)
- [دسترسپذیری: SQLite پیشفرض تکنمونهای است](#availability-default-sqlite-is-single-replica)
- [خطاهای منطقهای Gemini درون Docker](#gemini-regional-errors-inside-docker)
- [نکات مهم](#important-notes)

---

## اجرای سریع

> **میخواهید تنها با یک دستور، سرویس را خودمیزبانی کنید؟** به
> [راهنمای خودمیزبانی](../getting-started/SELF_HOST_GUIDE.md) مراجعه کنید —
> `docker compose -f docker-compose.selfhost.yml up -d` (ایمیج منتشرشده +
> Redis، فقط روی رابط loopback، بدون انتخاب پروفایل). بخش اجرای سریع زیر،
> مسیر تککانتینری برای کاربرانی است که Redis را از قبل در جای دیگری اجرا میکنند.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## استفاده از فایل محیطی

```bash
# ابتدا .env را کپی و ویرایش کنید
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# پروفایل پایه (بدون ابزارهای CLI)
docker compose --profile base up -d

# پروفایل CLI (شامل Claude Code، Codex و OpenClaw)
docker compose --profile cli up -d

# پروفایل میزبان (در درجه اول برای Linux؛ باینریهای CLI میزبان را بهصورت فقطخواندنی mount میکند)
docker compose --profile host up -d

# پروفایل وب (Chromium/Playwright برای ارائهدهندگان مبتنی بر نشست وب)
docker compose --profile web up -d

# ترکیب CLI و سرویس جانبی CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## پروفایلهای موجود

OmniRoute برای الگوهای اصلی استقرار، پروفایلهای Compose ارائه میکند. پروفایلی را انتخاب کنید که با محیط شما مطابقت دارد.

| پروفایل         | سرویس            | زمان استفاده                                                                                                                                                                | دستور                                        |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (پیشفرض) | `omniroute-base` | سرور بدون رابط گرافیکی / محیط اجرای حداقلی، بدون CLIهای ارائهدهندگان                                                                                                        | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | گردشکارهای عاملی که `omniroute providers/setup/doctor` و CLIهای همراه برنامه (Codex، Claude Code، Droid، OpenClaw) را فراخوانی میکنند                                       | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | میزبانهای Linux که میخواهند با mount کردن `~/.local/bin`، `~/.codex`، `~/.claude` و موارد مشابه بهصورت فقطخواندنی، دسترسی مشابه `network_mode` به CLIهای میزبان داشته باشند | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | اجرای سرویس جانبی [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) روی درگاه `8317` برای پروکسیکردن CLI بالادستی                                                 | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | ارائهدهندگان مبتنی بر نشست وب که به مرورگر نیاز دارند: `gemini-web`، `claude-web`، `claude-turnstile` (`runner-web` را میسازد و Chromium را شامل میشود)                     | `docker compose --profile web up -d`         |

> میتوان چند پروفایل را با یکدیگر ترکیب کرد: `docker compose --profile cli --profile cliproxyapi up -d`.

## پیکربندی ابزارهای CLI میزبان هنگامی که OmniRoute در Docker اجرا میشود

دستورهای `omniroute setup-codex`، `setup-claude`، `config set <tool>` و دکمهٔ
**ذخیرهٔ پیکربندی** در داشبورد، همگی فایلهایی مانند `~/.codex/*.config.toml` را مینویسند. این مسیرها
فقط روی ماشینی معنا دارند که CLI واقعاً در آن اجرا میشود. اگر آنها را داخل
کانتینر اجرا کنید، عملیات نوشتن در home خود کانتینر (`/home/node` —
ایمیج با `USER node` اجرا میشود) انجام میگیرد؛ جایی که هیچ CLI روی میزبان هرگز آن را نمیخواند و
بهمحض ایجاد مجدد کانتینر، حذف میشود.

OmniRoute این وضعیت را تشخیص میدهد و بهجای گزارش موفقیتی که قابل استفاده نیست،
با ارائهٔ دستورالعمل از انجام عملیات نوشتن خودداری میکند: CLI با کد `2` خارج میشود و API با `422`
و `containerEphemeralTarget: true` پاسخ میدهد.

### توصیهشده: CLI را روی میزبان و OmniRoute را در Docker اجرا کنید

کانتینر API را ارائه میکند؛ CLI ابزارهای میزبان شما را پیکربندی میکند.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI را به کانتینر متصل کنید
omniroute setup-codex                      # فایل واقعی ~/.codex را روی میزبان شما مینویسد
```

وقتی Codex، Claude Code، Cursor یا ابزارهای مشابه روی لپتاپ شما اجرا میشوند،
این گزینهٔ مناسبی است — که حالت معمول نیز همین است.

### گزینهٔ جایگزین: دایرکتوریهای پیکربندی میزبان را bind-mount کنید (پروفایل `host`)

اگر میخواهید خود کانتینر پیکربندی میزبان شما را بنویسد،
دایرکتوریها را mount کرده و `CLI_CONFIG_HOME` را روی ریشهٔ mount تنظیم کنید. پروفایل `host`
از قبل این کار را انجام میدهد:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount همان چیزی است که مسیر را قابل اعتماد میکند: OmniRoute اطلاعات
`/proc/self/mountinfo` را میخواند و نوشتن در مسیرهای mountشده (و نیز در دایرکتوریهایی
که فرزندانشان mount شدهاند، که دقیقاً همان ساختار `/host-home` در بالا است) را مجاز میکند،
درحالیکه همچنان از نوشتن در مسیرهای mountنشده خودداری میکند.

### راه فرار: پیکربندی CLIهای داخل خود کانتینر (با احتیاط استفاده کنید)

وقتی CLIها واقعاً داخل کانتینر قرار دارند (پروفایل `cli`)، عملیات نوشتن
عمدی است. گزینهٔ `--allow-container-write` را به هر دستور `setup-*` بدهید، یا
برای سرور `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` را تنظیم کنید. عملیات نوشتن
با هشداری مبنی بر اینکه پس از حذف کانتینر باقی نخواهد ماند، ادامه مییابد.

> **هشدار امنیتی — پروفایل `cli` همراه با mount کردن `docker.sock`.**
> پروفایل `cli` مسیر `/var/run/docker.sock` را bind-mount میکند تا بهروزرسان خودکار
> داخل کانتینر بتواند پشته را از طریق daemon میزبان دوباره ایجاد کند
> (`src/lib/system/autoUpdate.ts` وجود آن socket را بررسی میکند و در صورت
> نبودنش، مسیر Docker را نادیده میگیرد). آن socket **یک مرز اعتماد با سطح دسترسی root میزبان
> است**: هر چیزی که بتواند به آن دسترسی پیدا کند، daemon مربوط به Docker میزبان را با سطح دسترسی
> root کنترل میکند — و میتواند هر کانتینری را روی میزبان ایجاد، بازرسی، متوقف و حذف کند.
> پیامدها:
>
> 1. **هرگز پورت پروفایل `cli` را در معرض شبکه قرار ندهید.** آن را
>    روی `127.0.0.1` منتشر کنید (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — دردسترسبودن پروفایل `cli` از طریق LAN، هر RCE در سطح داشبورد را به
>    تصرف کامل میزبان تبدیل میکند.
> 2. **هیچ دایرکتوری اضافی از میزبان را به پروفایل `cli` متصل نکنید.**
>    socket مربوط به Docker بههمراه هر mount اضافی، دسترسی کامل
>    خواندن/نوشتن به فایلسیستم و پیکربندی میزبان شما را در اختیار کانتینر قرار میدهد. اگر لازم است ابزاری
>    یک پروژه را ببیند، آن را با باینری CLI بهصورت محلی اجرا کنید — پروژه را
>    داخل کانتینر `cli` mount نکنید.
>
> اگر به بهروزرسانی خودکار داخل کانتینر نیاز ندارید، پروفایل `cli` را غیرفعال نگه دارید
> (`COMPOSE_PROFILES=core,redis` یا کوتاهتر). پروفایلهای دیگر
> socket مربوط به Docker را mount نمیکنند.
>
> برای مدل تهدید مرتبط با MITM، به `docs/security/MITM-TPROXY-DECRYPT.md` مراجعه کنید (در git قرار دارد؛ در `/docs` کامپایل نشده است)
> و برای زنجیرهٔ منشأ باینریهای
> `codex`/`claude-code`/`droid`/`openclaw` به `docs/security/SUPPLY_CHAIN.md` مراجعه کنید.

## سایدکار Redis

OmniRoute برای پشتیبانی از محدودکننده نرخ توزیعشده و کش اشتراکی به Redis متکی است. سرویس `redis` **همیشه در** `docker-compose.yml` تعریف شده است (هیچ محدودیت پروفایلی ندارد) و در کنار هر پروفایل دیگری اجرا میشود.

| جزئیات                       | مقدار                                        |
| ---------------------------- | -------------------------------------------- |
| ایمیج                        | `redis:7-alpine`                             |
| نام کانتینر                  | `omniroute-redis`                            |
| پورت داخلی                   | `6379`                                       |
| پورت میزبان (قابل بازنویسی)  | `REDIS_PORT` (مقدار پیشفرض `6379`)           |
| اتصال میزبان (قابل بازنویسی) | `REDIS_BIND_HOST` (مقدار پیشفرض `127.0.0.1`) |
| ولوم                         | `omniroute-redis-data` → `/data`             |
| بررسی سلامت                  | `redis-cli ping` (فاصله زمانی 10 ثانیه)      |

متغیرهای محیطی مرتبط:

- `REDIS_URL` — رشته اتصال تزریقشده به برنامه (بهطور پیشفرض `redis://redis:6379`).
- `REDIS_PORT` — نگاشت پورت سمت میزبان برای کانتینر Redis.
- `REDIS_BIND_HOST` — رابط میزبان که پورت روی آن منتشر میشود. مقدار پیشفرض `127.0.0.1` است.

> **دلیل استفاده پیشفرض از رابط loopback:** سایدکار بدون `requirepass` اجرا میشود و کانتینرهای
> برنامه از طریق شبکه compose به آن دسترسی پیدا میکنند (`redis:6379`) — پورت منتشرشده فقط
> برای ابزارهای سمت میزبان (`redis-cli` و اجرای محلی `npm run dev`) در نظر گرفته شده است. انتشار روی
> `0.0.0.0` یک Redis بدون احراز هویت را در معرض دسترسی تمام میزبانهای شبکه محلی شما قرار میدهد. اگر
> `REDIS_BIND_HOST=0.0.0.0` را تنظیم میکنید، `--requirepass` را نیز به `command:` سرویس اضافه کنید.

**غیرفعالکردن Redis** توصیه نمیشود (محدودکننده نرخ به حالت جایگزین درونحافظهای تنزل پیدا میکند). اگر ناچار به این کار هستید، بلوک سرویس `redis:` را در `docker-compose.yml` حذف/کامنت کنید یا مقیاس آن را به صفر کاهش دهید:

```bash
docker compose up -d --scale redis=0
```

## Compose محیط تولید

برای اجرای یک نسخه مستقل از محیط تولید در کنار محیط توسعه، از `docker-compose.prod.yml` استفاده کنید.

| جزئیات              | مقدار                                                                           |
| ------------------- | ------------------------------------------------------------------------------- |
| فایل                | `docker-compose.prod.yml`                                                       |
| پورت پیشفرض داشبورد | `PROD_DASHBOARD_PORT=20130` (نگاشتشده به پورت داخلی `${DASHBOARD_PORT:-20128}`) |
| پورت پیشفرض API     | `PROD_API_PORT=20131`                                                           |
| ایمیج               | `omniroute:prod` (ساختهشده از هدف `runner-cli`)                                 |
| کانتینر Redis       | `omniroute-redis-prod` (`redis:8.6.2`، با ولوم اختصاصی `redis-prod-data`)       |
| ولوم داده           | `omniroute-prod-data` (نامگذاریشده و پایدار در بازسازیها)                       |
| بررسیهای سلامت      | `node healthcheck.mjs` + `redis-cli ping`، با `depends_on` مشروط به سلامت Redis |

نحوه استفاده:

```bash
# پشته محیط تولید را بسازید و اجرا کنید
docker compose -f docker-compose.prod.yml up -d --build

# لاگها را بهصورت پیوسته مشاهده کنید
docker compose -f docker-compose.prod.yml logs -f

# پشته را متوقف و حذف کنید (ولومها حفظ شوند)
docker compose -f docker-compose.prod.yml down
```

پشته محیط تولید بهموازات compose محیط توسعه اجرا میشود (با نام کانتینرها، پورتها و ولومهای متفاوت)، بنابراین میتوانید درحالیکه محیط تولید فعال باقی میماند، توسعه محلی را ادامه دهید.

## مراحل Dockerfile

مخزن همراه با یک Dockerfile چندمرحلهای (`Dockerfile`) ارائه میشود. چهار مرحله در دسترس هستند؛ متناسب با مورد استفادهٔ خود `target` مناسب را انتخاب کنید.

| مرحله         | تصویر پایه            | هدف                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | وابستگیها را نصب میکند (`npm ci --legacy-peer-deps`) و `npm run build` را اجرا میکند (بهطور پیشفرض با Turbopack — بخش منابع زمان ساخت را در ادامه ببینید)                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | محیط اجرای پروداکشن با خروجی مستقل Next.js. **هیچ CLI ارائهدهندهای در آن گنجانده نشده است.**                                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | `git`، `docker.io`، `docker-compose` و CLIهای سراسری `@openai/codex`، `@anthropic-ai/claude-code`، `droid` و `openclaw` را اضافه میکند. **برای گردشکارهای عاملی این مورد را انتخاب کنید.**                                                                                                                           |
| `runner-web`  | `runner-base`         | Playwright بههمراه مرورگر Chromium (`--with-deps`) را برای ارائهدهندگان نشست وب اضافه میکند: `gemini-web`، `claude-web`، `claude-turnstile`. **هنگام استفاده از این ارائهدهندگان، این مورد را انتخاب کنید** — تصویر ساده بدون آن هنگام درخواست با خطا مواجه میشود (یادداشت `-web` در بخش کانالهای انتشار را ببینید). |

برای ساخت دستی یک هدف مشخص:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### منابع زمان ساخت

سه آرگومان ساخت، هزینهٔ مرحلهٔ `builder` را کنترل میکنند. این آرگومانها فقط مربوط به زمان ساخت هستند —
`OMNIROUTE_MEMORY_MB` (در ادامه) یک تنظیم جداگانه برای زمان اجرا است.

| آرگومان ساخت                | پیشفرض | اثر                                                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | مقدار `0` با webpack میسازد: حافظهٔ اوج کمتر، اما کندتر. مقدار `1` استفاده از Turbopack را فعال میکند.       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | سقف heap موتور V8 (`--max-old-space-size`) برای فرایند ایجادشدهٔ `next build`.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | مقدار `CIRCLE_NODE_TOTAL` را تعیین میکند؛ Next برای گردآوری دادههای صفحه، `workers = N - 1` را محاسبه میکند. |

`OMNIROUTE_BUILD_WORKERS` همان گزینهای است که باید روی یک سازندهٔ قدرتمند افزایش دهید و
وقتی یک ساخت با منابع محدود **پس از** `✓ Compiled successfully` متوقف میشود، به آن
مشکوک شوید. هر worker دادههای صفحه یک فرایند مستقل است و فرایند والد `next build`
نیز همینطور؛ یک بازتولید زنده روی VPS (issue #7518) نشان داد که اوج RSS هر فرایند،
مستقل از پرچم heap در `NODE_OPTIONS`، حدود 4.5 GB است (Turbopack در حافظهٔ
native/Rust خارج از heap موتور V8 کامپایل میکند). مقدار پیشفرض `2` (← 1 worker و در
مجموع 2 فرایند) برای runnerهای میزبانیشده توسط GitHub با 16 GB حافظه و 4 vCPU که
پایپلاین انتشار استفاده میکند، تنظیم شده است. با مقدار `8` (← 7 worker)، حافظهٔ آن
runner تمام شد و buildkit مرحله را با خطای
`ResourceExhausted: ... cannot allocate memory` ناموفق کرد؛ مقدار `3` (← 2 worker)
نیز پس از آنکه RSS هر فرایند بهجای استنباط، مستقیماً اندازهگیری شد، همچنان در حافظه
جا نمیشد. `tests/unit/docker-build-memory-budget.test.ts` محاسبات را بر اساس مقدار
اندازهگیریشده انجام میدهد و اگر هرکدام از این تنظیمات از ظرفیت runner فراتر برود،
ناموفق میشود.

Turbopack در حافظهٔ native مربوط به Rust که **خارج** از heap موتور V8 قرار دارد
کامپایل میکند، بنابراین `OMNIROUTE_BUILD_MEMORY_MB` آن را محدود نمیکند. در میزبانی
با سقف حافظه، ساخت توسط OOM killer با SIGKILL خاتمه مییابد، بدون اینکه هیچ متن
خطایی نمایش داده شود — فرایند صرفاً در میانهٔ `Creating an optimized production build`
متوقف میشود که بیشتر شبیه هنگکردن به نظر میرسد تا اتمام حافظه. به همین دلیل،
برخلاف `npm run dev` / `npm run build` که در آنها Turbopack گزینهٔ پیشفرض کد است،
`Dockerfile` بهطور پیشفرض از webpack (`OMNIROUTE_USE_TURBOPACK=0`) استفاده
میکند: اجرای سادهٔ `docker build .` بدون هیچ آرگومان ساختی (همان کاری که Railway و
سایر میزبانهای تککلیکی انجام میدهند) نباید روی سازندهای با حافظهٔ محدود، بیصدا
متوقف شود. تصاویر منتشرشده از قبل در `docker-publish.yml` مقدار
`OMNIROUTE_USE_TURBOPACK=0` را بهصراحت ارسال میکنند. روی سازندهای با RAM کافی،
برای ساخت سریعتر Turbopack را فعال کنید:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` فعال است، بنابراین `next build` یک فرایند والد **و** یک فرایند
worker اجرا میکند و هرکدام جداگانه از `OMNIROUTE_BUILD_MEMORY_MB` پیروی میکنند.
سقف حافظهٔ کانتینر را تقریباً بیشتر از دو برابر این مقدار در نظر بگیرید، نه یک برابر.

اندازهگیریشده روی این درخت (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| بستهساز   | سقف حافظهٔ کانتینر | نتیجه                                  |
| --------- | ------------------ | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | در هر دو حالت، بیصدا با OOM خاتمه یافت |
| webpack   | 8 GiB              | worker ساخت با SIGKILL خاتمه یافت      |
| webpack   | 12 GiB             | موفق شد؛ اوج مصرف به 11.1 GiB رسید     |

### پیشفرضهای زمان اجرا

مقادیر پیشفرض صادرشده توسط `runner-base`:‏ `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

رفتار حافظه در Docker:

- ایمیج، `OMNIROUTE_MEMORY_MB=1024` را تنظیم میکند و `NODE_OPTIONS=--max-old-space-size=1024` را از آن میسازد.
- فرایند واقعی سرور توسط راهانداز مستقل اجرا میشود که `OMNIROUTE_MEMORY_MB` را میخواند و `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` را به آن اضافه میکند.
- Node از آخرین مقدار تکرارشدهٔ `--max-old-space-size` استفاده میکند؛ بنابراین تنظیم `OMNIROUTE_MEMORY_MB` محدودیت مؤثر heap در Docker را کنترل میکند.
- از آنجا که ایمیج همیشه آن را تنظیم میکند، مقدار جایگزین خود راهانداز که بر اساس RAM تنظیم میشود، هرگز در Docker اعمال نمیشود. آن را متناسب با بار کاری بهصراحت افزایش دهید (جدول زیر). مقدار `2048` همچنان برای `/v1/responses` عاملهای کدنویسی بسیار کم است.

### RAM زمان اجرا برای عاملهای کدنویسی

مقدار پیشفرض 1 GiB در Docker، حداقل لازم برای داشبورد/گفتوگوی سبک است، نه اندازهای مناسب برای محیط عملیاتی. بدنههای طولانی `POST /v1/responses` (صدها پیام و دهها ابزار) هنگام فشردهسازی چندین گراف درونحافظهای را نگه میدارند. دو درخواست همپوشان با اندازهٔ حدود ~3 MiB / ~750k توکن، V8 را با old-space معادل **12 GiB** متوقف کردهاند (`FATAL ERROR: Reached heap limit`) و همچنین باعث OOM در cgroup با ظرفیت 16 GiB شدهاند. به [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) مراجعه کنید.

مقدار **`--memory` مربوط به cgroup را بیشتر از heap تعیین کنید** — بافرهای بومی، SQLite و دادههای میانی فشردهسازی خارج از V8 قرار میگیرند.

| بار کاری                            | `OMNIROUTE_MEMORY_MB`    | کانتینر / cgroup       | توضیحات                                                                                                   |
| ----------------------------------- | ------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| داشبورد، یک گفتوگوی سبک             | `1024` (پیشفرض ایمیج)    | ≥2 GiB                 |                                                                                                           |
| یک عامل کدنویسی (Claude/Codex/Grok) | `8192`                   | ≥10 GiB                | یک نشست معمولی `/v1/responses`                                                                            |
| دو `/v1/responses` طولانی همزمان    | `10240`–`12288`          | ≥12–16 GiB             | توقف اندازهگیریشدهٔ V8 با heap حدود ~12 GiB                                                               |
| سه یا بیشتر زمینهٔ طولانی همزمان    | روی یک فرایند اجرا نکنید | سریالیسازی / RAM بیشتر | پذیرش پیشفرض بارهای سنگین، 1 درخواست در حال اجرا است؛ افزایش آن بدون RAM کافی، توقف را دوباره ایجاد میکند |

هنگامی که `OMNIROUTE_MEMORY_MB` **تنظیم نشده باشد**، دستور `omniroute serve` روی سختافزار فیزیکی حدود 35% از RAM را تنظیم میکند (با محدودسازی به بازهٔ `[512, 4096]`). Docker همیشه مقدار `1024` را تنظیم میکند؛ بنابراین این تنظیم خودکار هرگز در ایمیج رسمی اجرا نمیشود.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## متغیرهای حیاتی محیطی

علاوه بر مقادیر پیشفرض مستندشده در [ENVIRONMENT.md](../reference/ENVIRONMENT.md)، متغیرهای زیر هنگام اجرا تحت Docker بیشترین اهمیت را دارند:

| متغیر                         | هدف                                                                                                                                                                                                                                                                                        | مقدار پیشفرض               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | راز مشترک برای پل WebSocket. **در محیط production الزامی است** — آن را روی یک رشته تصادفی قدرتمند تنظیم کنید.                                                                                                                                                                              | تنظیمنشده (باید ارائه شود) |
| `REDIS_URL`                   | رشته اتصال برای محدودکننده نرخ / بکاند کش                                                                                                                                                                                                                                                  | `redis://redis:6379`       |
| `REDIS_PORT`                  | پورت سمت میزبان برای کانتینر Redis همراه                                                                                                                                                                                                                                                   | `6379`                     |
| `REDIS_BIND_HOST`             | رابط میزبان که پورت Redis همراه روی آن منتشر میشود (در حالت loopback، مگر اینکه AUTH را اضافه کنید)                                                                                                                                                                                        | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | مسیر میزبان که برای گردشکارهای بهروزرسانی خودکار در پروفایل `cli` روی `/workspace/omniroute` متصل میشود                                                                                                                                                                                    | `.` (دایرکتوری فعلی)       |
| `OMNIROUTE_MEMORY_MB`         | سقف heap زمان اجرای Node برای سرور مستقل Docker؛ مقدار پیشفرض image در بالا را بازنویسی میکند. برای عاملهای کدنویسی: `8192`+ (به [RAM زمان اجرا](#runtime-ram-for-coding-agents) مراجعه کنید).                                                                                             | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | پورتهای در معرض دسترس برای داشبورد (20128) و API (20129) را بازنویسی میکند                                                                                                                                                                                                                 | `20128` / `20129`          |
| `APP_BIND_HOST`               | رابط میزبانی که docker-compose پورتهای داشبورد/API/live-WS را روی آن منتشر میکند. با `REQUIRE_API_KEY=false` (مقدار پیشفرض)، مقدار `0.0.0.0` پراکسی ناشناس `/v1` را در معرض LAN قرار میدهد — فقط با `REQUIRE_API_KEY=true` یا قرار دادن یک reverse proxy در مقابل آن، دامنه را گسترش دهید. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | رابط میزبانی که docker-compose سرویس جانبی `cliproxyapi` را روی آن منتشر میکند — volume داده آن، اطلاعات احراز هویت ارائهدهنده را نگه میدارد.                                                                                                                                              | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | دایرکتوریای که اسکنر افزونه زمان اجرا از آن میخواند و افزونهها را در آن نصب میکند. هنگامی که افزونهها بهصورت bind mount متصل شدهاند، آن را تنظیم کنید: مقدار پیشفرض از `HOME` پیروی میکند که الزامی نیست یک image آن را export کند.                                                        | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | زیرمسیر URL هنگامی که برنامه پشت یک reverse proxy منتشر میشود (برای مثال `/omniroute`)                                                                                                                                                                                                     | _(خالی = ریشه)_            |
| `NEXT_PUBLIC_BASE_URL`        | مبدأ عمومی مرورگر، شامل زیرمسیر (برای مثال `https://host/omniroute`)                                                                                                                                                                                                                       | تنظیمنشده                  |
| `PROD_DASHBOARD_PORT`         | پورت داشبورد سمت میزبان برای `docker-compose.prod.yml`                                                                                                                                                                                                                                     | `20130`                    |
| `CLIPROXYAPI_PORT`            | پورت سمت میزبان برای سرویس جانبی `cliproxyapi`                                                                                                                                                                                                                                             | `8317`                     |

## پروکسی معکوس روی یک زیرمسیر (Traefik / nginx)

مقدار `basePath` در Next.js داخل بستهٔ مستقل کامپایل میشود. OmniRoute مقدار تعبیهشده را در یک فایل نشانگر در ریشهٔ برنامه ثبت میکند (هنگام اجرای `npm run build` نوشته میشود و توسط `scripts/docker/ensure-docker-base-path.mjs` خوانده میشود) و هنگام راهاندازی کانتینر، آن را با `OMNIROUTE_BASE_PATH` مقایسه میکند. اگر این مقادیر متفاوت باشند و ایمیج برای ریشهٔ دامنه ساخته شده باشد، entrypoint پیش از اجرای `node dev/run-standalone.mjs`، مانیفستهای مستقل، مقادیر لفظی تعبیهشدهٔ `basePath`/`assetPrefix` (Next 16 آدرسهای دارایی SSR را صرفاً از `assetPrefix` رندر میکند — patcher زیرمسیر را در آن نیز منعکس میکند)، آدرسهای دارایی تعبیهشدهٔ `/_next/static` (مانیفستهای ارجاع کلاینت، importهای رسانه و صفحههای خطای ازپیشرندرشده) و shim مربوط به `process.env` در کلاینت را بازنویسی میکند.

### ساخت با Compose (توصیهشده)

هر دو متغیر را در `.env` تنظیم کنید، سپس دوباره بسازید تا ایمیج و محیط اجرا با یکدیگر مطابقت داشته باشند:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

فایل `docker-compose.yml` مقدار `OMNIROUTE_BASE_PATH` را هم بهعنوان آرگومان ساخت Docker و هم بهعنوان متغیر محیطی زمان اجرا ارسال میکند.

### ایمیج ازپیشساختهشده برای ریشه + زیرمسیر زمان اجرا

ایمیجهای منتشرشدهٔ `diegosouzapw/omniroute:*` برای ریشهٔ دامنه ساخته شدهاند. بااینحال، همچنان میتوانید `OMNIROUTE_BASE_PATH` را در زمان اجرا تنظیم کنید؛ کانتینر هنگام راهاندازی، بسته را یکبار patch میکند. آن را با مبدأ عمومی منطبق همراه کنید:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

پروکسی معکوس را طوری پیکربندی کنید که مسیر خارجی **کامل** را ارسال کند (پیشوند را حذف نکنید). Traefik باید `PathPrefix(`/omniroute`)` را بدون `StripPrefix` به کانتینر هدایت کند تا Next.js مقدار `/omniroute/...` را دریافت کرده و داراییها را از `/omniroute/_next/...` ارائه دهد.

healthcheck مربوط به Docker، endpoint سبکوزن چرخهٔ حیات `/healthz` را با پیشوند `OMNIROUTE_BASE_PATH` فعال بررسی میکند. مسیر `/api/monitoring/health` همچنان برای عیبیابی انسانی/داشبورد در دسترس است؛ برای بازگرداندن HEALTHCHECK کانتینر به آن (برای مثال، جهت اعمال بررسی سلامت عمیق)، مقدار `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` را تنظیم کنید. این مسیر یک بررسی **عمیق** است (پایگاه داده + خلاصهٔ پایش) — اگر دوباره آن را فعال کنید، برای `HEALTHCHECK` کمتکرار Docker مناسب است، اما برای بازههای `livenessProbe` در Kubernetes **مناسب نیست**.

برای orchestratorها (Kubernetes، Nomad و غیره):

| پروب            | ترجیح دهید                                                             | اجتناب کنید                                                       |
| --------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| زندهبودن        | HTTP `GET /livez`، یا TCP روی پورت اصلی (`PORT`، مقدار پیشفرض `20128`) | استفاده از `/api/monitoring/health` برای زندهبودن                 |
| آمادگی          | HTTP `GET /healthz`                                                    | timeoutهای کوتاهی که مشغولبودن event loop را مردهبودن تلقی میکنند |
| عمیق / blackbox | `/api/monitoring/health`                                               | —                                                                 |

مسیر `/healthz` وضعیت چرخهٔ حیات فرایند را گزارش میدهد (`ok` / `starting` / `stopping`). مسیر `/livez` فقط زندهبودن فرایند را بررسی میکند (هر زمان handler بتواند اجرا شود، وضعیت 200 برمیگرداند؛ برای آمادگی منتظر نمیماند). هر دو همچنان روی همان event loop مربوط به Node اجرا میشوند که درخواستها را مدیریت میکند؛ بنابراین، پردازش کاتالوگ یا فشردهسازی وابسته به CPU میتواند آنها را به تأخیر بیندازد — مشغول ≠ مرده. اگر پروبهای HTTP دچار timeout میشوند، بررسی زندهبودن مبتنی بر TCP را ترجیح دهید. راهنمای کامل پروبها:
[راهنمای پایش — توصیههای مربوط به پروبهای Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose با Caddy (HTTPS Auto-TLS)

میتوانید OmniRoute را با استفاده از تأمین خودکار گواهی SSL توسط Caddy بهصورت امن در دسترس قرار دهید. مطمئن شوید رکورد DNS از نوع A برای دامنه شما به IP سرورتان اشاره میکند.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # مبدأ قابلمشاهده برای مرورگر جهت callbackهای OAuth، پیوندهای داشبورد و URLهای عمومی تولیدشده.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL داخلی سروربهسرور برای وظایف زمانبندیشده / درخواستهای داخلی.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy هدرهای استاندارد هدایت را برای کانتینر بالادستی تنظیم میکند. OmniRoute از
`NEXT_PUBLIC_BASE_URL` بهعنوان مبدأ عمومی متعارف برای callbackهای OAuth و پیوندهای عمومی
تولیدشده استفاده میکند؛ عملیات نوشتن احراز هویتشده در داشبورد از درخواستهای هممبدأ بههمراه
محافظت CSRF وابسته به نشست استفاده میکنند. `OMNIROUTE_TRUST_PROXY` را فقط برای استقرارهای
پیشرفتهای فعال کنید که در آنها عمداً میخواهید OmniRoute مبدأ عمومی را بهجای پیکربندی صریح،
از هدرهای هدایتشده قابلاعتماد استخراج کند.

## تونل سریع Cloudflare

پشتیبانی داشبورد برای استقرارهای Docker شامل یک **تونل سریع Cloudflare** تککلیکی در `Dashboard → Endpoints` است. هنگام نخستین فعالسازی، `cloudflared` فقط در صورت نیاز دانلود میشود، یک تونل موقت به endpoint فعلی `/v1` شما راهاندازی میشود و URL تولیدشده `https://*.trycloudflare.com/v1` مستقیماً زیر URL عمومی عادی شما نمایش داده میشود.

پنلهای تونل endpoint (Cloudflare، Tailscale و ngrok) را میتوان از `Settings → Appearance` بدون تغییر وضعیت تونل فعال، نمایش داد یا پنهان کرد.

### نکات تونل

- URLهای تونل سریع موقتی هستند و پس از هر راهاندازی مجدد تغییر میکنند.
- تونلهای سریع پس از راهاندازی مجدد OmniRoute یا کانتینر، بهطور خودکار بازیابی نمیشوند. در صورت نیاز، آنها را دوباره از داشبورد فعال کنید.
- نصب مدیریتشده در حال حاضر از Linux، macOS و Windows روی `x64` / `arm64` پشتیبانی میکند.
- تونلهای سریع مدیریتشده بهطور پیشفرض از انتقال HTTP/2 استفاده میکنند تا از هشدارهای پرتکرار مربوط به بافر UDP در QUIC و در محیطهای کانتینری محدود جلوگیری شود. اگر انتقال متفاوتی میخواهید، `CLOUDFLARED_PROTOCOL=quic` یا `auto` را تنظیم کنید.
- ایمیجهای Docker شامل ریشههای CA سیستم هستند و آنها را در اختیار `cloudflared` مدیریتشده قرار میدهند؛ این کار هنگام راهاندازی اولیه تونل درون کانتینر، از خطاهای اعتماد TLS جلوگیری میکند.
- اگر میخواهید OmniRoute بهجای دانلود یک فایل باینری، از فایل باینری موجود استفاده کند، `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` را تنظیم کنید.

## تگهای ایمیج

| ایمیج                    | تگ       | اندازه | توضیحات                                             |
| ------------------------ | -------- | ------ | --------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | بالاترین SemVer پایدار **منتشرشده** (نه git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | برای GitOps این نوع تگ را ثابت کنید                 |

مانیفست چندپلتفرمی: `linux/amd64` + `linux/arm64` بهصورت بومی (Apple Silicon، AWS Graviton، Raspberry Pi). Docker معماری منطبق را بهطور خودکار انتخاب میکند؛ اگر لازم است شبیهسازی AMD64 را روی میزبانهای ARM اجباری کنید، `--platform linux/amd64` را ارسال کنید.

### کانالهای انتشار

OmniRoute کانالهای Docker جداگانهای برای نسخههای پایدار، آزمایش شاخه انتشار فعال و buildهای توسعه منتشر میکند.

| کانال                           | منبع                                | تغییرپذیری                  | کاربرد پیشنهادی                                                                                                                    |
| ------------------------------- | ----------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | نسخه امضاشده/نسخهگذاریشده           | تغییرناپذیر                 | استقرارهای عملیاتی که به یک نسخه دقیق ثابت شدهاند                                                                                  |
| `:latest` / `:latest-web`       | بالاترین SemVer پایدار **منتشرشده** | اشارهگر پایدار تغییرپذیر    | نسخههای پایدار را **پس از** اجرای وظیفه انتشار SemVer دنبال میکند — `main` یا commitهای منتشرنشده `release/v*` را دنبال **نمیکند** |
| `:next` / `:next-web`           | شاخه پیشفرض فعلی `release/v*`       | اشارهگر پیشانتشار تغییرپذیر | آزمایش اصلاحاتی که وارد شاخه انتشار فعال شدهاند، اما هنوز در یک نسخه پایدار قرار نگرفتهاند                                         |
| `:main` / `:main-web`           | شاخه `main`                         | اشارهگر توسعه تغییرپذیر     | فقط برای توسعه و آزمایش یکپارچهسازی                                                                                                |

#### ارائهدهندگان نشست وب: ایمیجهای `-web`

هر کانال بالا یک تگ `-web` نیز دارد (`:latest-web`، `:<version>-web`، `:next-web`، `:main-web`) که از مرحله `runner-web` ساخته شده است — همان ایمیج بههمراه Playwright و مرورگر Chromium. ایمیج معمولی **بدون** Chromium ارائه میشود؛ `gemini-web`، `claude-web` و `claude-turnstile` به آن نیاز دارند.

خطا به تعویق میافتد و هنگام راهاندازی رخ نمیدهد: این ارائهدهندگان مدلهای خود را فهرست میکنند و در داشبورد بهصورت متصل نمایش داده میشوند، اما تنها نخستین درخواست با خطای زیر مواجه میشود:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

اگر از این ارائهدهندگان استفاده میکنید، تگ `-web` کانالی را که هماکنون روی آن هستید دریافت کنید — هیچ چیز دیگری تغییر نمیکند. در نصب npm/CLI (بدون ایمیج Docker)، بخش معادلِ مفقودشده، فایل باینری مرورگر است: دستور `npx playwright install chromium` را روی میزبان اجرا کنید.

#### استفاده از کانال پیشانتشار

کانال `next` با هر بار push به شاخه پیشفرض فعلی `release/v*` دوباره ساخته میشود و برای هر دو معماری AMD64 و ARM64 منتشر میشود. شاخههای نگهداری قدیمیتر نمیتوانند آن را بازنویسی کنند. این کانال یک image قابل pull برای اصلاحاتی فراهم میکند که پیش از ایجاد tag پایدار بعدی، در شاخه انتشار فعال merge شدهاند.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

برای Docker Compose، tag مربوط به image استفادهشده توسط profile انتخابی را بازنویسی کنید، سپس سرویس را pull کرده و دوباره ایجاد کنید:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ایمنی و بازگشت به نسخه قبلی

`next` یک کانال شناور پیشانتشار است. ممکن است با هر push به شاخه انتشار فعال تغییر کند و **برای استفاده در محیط عملیاتی پشتیبانی نمیشود**. هنگام ارزیابی یک build مشخص، digest مربوط به image را ثابت کنید:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

پیش از آزمایش، از volume داده OmniRoute یا دایرکتوری داده متصلشده با bind mount پشتیبان تهیه کنید. برای بازگشت، نسخه پایدار یا digest استفادهشده قبلی را بازیابی کرده و container را دوباره ایجاد کنید:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

یک build از شاخه انتشار هرگز نمیتواند `latest` را جابهجا کند؛ تنها یک نسخه معنایی پایدار واجد شرایط میتواند اشارهگر پایدار را ارتقا دهد. imageهای `next` همچنان از بررسی image انتشار و دروازه مسدودکننده آسیبپذیریهای CRITICAL برخوردارند.

**`latest` تضمینی برای بهروز بودن نسبت به git نیست.** اصلاحات mergeشده در `main` یا شاخه فعال `release/v*` تا زمانی که یک image پایدار SemVer منتشر نشود و job انتشار، `:latest` را ارتقا ندهد (با همان digest نسخه SemVer)، در `:latest` قرار نمیگیرند. اگر `latest` ثابت به نظر میرسد، درحالیکه GitHub از قبل اصلاح را نشان میدهد، برای آزمایش شاخه انتشار `:next` را pull کنید یا منتظر tag نسخه SemVer بمانید.

| نیاز شما                                                           | استفاده کنید                        |
| ------------------------------------------------------------------ | ----------------------------------- |
| GitOps / محیط عملیاتی که نباید دچار تغییر ناخواسته شود             | `:X.Y.Z` (یا digest مربوط به image) |
| دنبال کردن نسخههای پایدار منتشرشده و پذیرش ایجاد مجدد در هر انتشار | `:latest`                           |
| آزمایش commitهای منتشرنشده `release/v*`                            | `:next` (غیرعملیاتی)                |
| آزمایش `main`                                                      | `:main` (غیرعملیاتی)                |

## دسترسپذیری: SQLite پیشفرض تکرپلیکا است

OmniRoute استاندارد در Docker / Kubernetes شامل **یک پردازش Node + یک نویسنده SQLite** است. دسترسپذیری بالا در این توپولوژی **پشتیبانی نمیشود**.

| محدودیت                                             | پیامد                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| نویسنده واحد                                        | چند رپلیکا را با یک فایل SQLite مشترک اجرا **نکنید**. این کار پایگاه داده را خراب میکند.                                                                                                                                                                                                                                                             |
| ایجاد مجدد / راهاندازی مجدد / توقف توسط HEALTHCHECK | **قطعی کامل** SSEهای در حال اجرا، نشستهای داشبورد و وضعیت درونحافظهای. اتصال تمام کلاینتهای متصل قطع میشود. درخواستهای جدید در بازهای که هیچ endpointی وجود ندارد، بهجای JSON مربوط به OmniRoute، خطای reverse-proxy با مقدار **`502 Bad Gateway: Unknown error`** دریافت میکنند — کلاینتها نمیتوانند آن را از خرابی ارائهدهنده تشخیص دهند (#11015). |
| حلقه رویداد مشترک با `/healthz`                     | یک چرخه پرترافیک کاتالوگ یا فشردهسازی میتواند probeها را به تأخیر بیندازد؛ در این صورت، timeout کوتاه باعث راهاندازی مجدد **تنها** رپلیکا میشود.                                                                                                                                                                                                     |

**ماتریس probeها** (همچنین [توصیههای مربوط به probeهای Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) را ببینید):

| Probe         | هدف                                                     | استفاده نکنید                                                        |
| ------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| Liveness      | TCP روی `PORT` (پیشفرض `20128`)، یا HTTP نرم `/healthz` | `/api/monitoring/health`                                             |
| Readiness     | HTTP `GET /healthz`                                     | timeoutهای کوتاهی که مشغول بودن حلقه رویداد را مرده بودن تلقی میکنند |
| عمیق / انسانی | `/api/monitoring/health`                                | liveness خودکار kubelet                                              |

**ارتقاها:** انتظار داشته باشید اتصال تمام نشستها قطع شود. در صورت امکان، کلاینتها را تخلیه کنید؛ با SQLite پیشفرض، بهروزرسانی چرخشی وجود ندارد. ترکیب `restart: unless-stopped` در Compose با `HEALTHCHECK` در Docker نیز زمانی که کانتینر Unhealthy شود، تنها پردازش را جایگزین میکند — با همان دامنه اثر.

قطعه پیکربندی Kubernetes برای **یک رپلیکا** (`Recreate` الزامی است؛ برای یک فایل SQLite، مقدار `replicas` را افزایش ندهید):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

توقف `preStop` به kube فرصت میدهد تا پیش از SIGTERM، endpointهای Service را حذف کند تا ترافیک **جدید** دیگر به پردازشی که در حال توقف است ارسال نشود. SSEهای در حال اجرای `/v1/responses` از طریق leaseهای پذیرش سنگینوزن تا مدت `SHUTDOWN_TIMEOUT_MS` (پیشفرض 30 ثانیه) تخلیه میشوند (#11015). درخواستهای جدیدی که همچنان به پردازش میرسند، `503` بههمراه `Retry-After: 5` دریافت میکنند. فاصله بدون endpoint در `Recreate` تا زمانی که جایگزین Ready شود، همچنان یک قطعی کامل است — این ویژگی توپولوژی SQLite است، نه پیکربندی اشتباه probe.

Postgres خارجی / دسترسپذیری بالای چندنویسندهای، یک مسیر استاندارد مستندشده **نیست**. اگر به دسترسپذیری بالا نیاز دارید، یک رپلیکا را حفظ کنید یا توپولوژیای را اجرا کنید که پروژه آن را جداگانه آزمایش و مستند کرده است. کار مربوط به Postgres/MySQL در [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) پیگیری میشود. تا زمان عرضه آن، تنها روش پشتیبانیشده برای افزایش ظرفیت درخواستهای **بزرگ** `/v1/responses`، استفاده از N پردازش مستقل است (بخش بعدی)، نه `replicas > 1` روی یک volume.

## مقیاسافزایی افقی: N فرایند مستقل

یک فرایند Node برابر با **یک heap در V8** است. دو درخواست همپوشانِ عامل کدنویسی `POST /v1/responses` با اندازهٔ حدود ~3 MiB / ~750k-token (RTK + Caveman)، آن heap را در حدود ~12 Gi متوقف میکنند (`FATAL ERROR: Reached heap limit`) و میتوانند باعث OOM شدن یک cgroup با ظرفیت 16 Gi شوند. به [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) مراجعه کنید. این اندازهگیری یک هشدار دربارهٔ **بودجهٔ حافظه** است، نه محدودیت سخت محصول روی دو درخواست طولانی و همزمان `/v1/responses`. پذیرش چتهای سنگین با یک بودجهٔ بایت ورودی که بهطور خودکار محاسبه میشود کنترل میگردد (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، `src/shared/middleware/admissionBudget.ts`) و اندازهٔ آن از همان سقف V8/cgroup تعیین میشود — افزایش دستی آن (یا تنظیم محدودیت قدیمی مبتنی بر تعداد درخواست، یعنی `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) در فرایندی که از قبل اندازهگذاری شده است، دوباره باعث توقف میشود. چتهای کوچک، `/healthz`، `/v1/models` و MCP **مشمول** این محدودیت نیستند.

### تکفرایندی: بیش از دو درخواست طولانی `/v1/responses`

یک فرایند **سالم** (با heap کمتر از `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` که مقدار پیشفرض آن `0.75` است) **ممکن است** بیش از دو درخواست طولانی و همزمان `POST /v1/responses` را اجرا کند، مشروط بر اینکه بودجهٔ بایتهای در حال پردازش در سطح فرایند (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) همچنان ظرفیت داشته باشد. بدنههایی با اندازهٔ برابر یا بیشتر از `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (بهطور پیشفرض 256 KiB)، همان مجوز سنگینوزنِ درخواستهای دارای ساختار پیچیده را میگیرند و از همان مسیر گریز `tryAcquireHealthyHeadroom` در [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) استفاده میکنند. دهها کلاینت طولانی و همزمان SSE (اپراتورها اغلب به 40–50 مورد نیاز دارند) مسئلهای مربوط به **بودجهٔ حافظه** است — اندازهٔ heap، جایگاههای اصلی/ظرفیت ذخیره و `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` را تنظیم کنید — و نه یک محدودیت سخت «حداکثر 2» در محصول. heap تحت فشار همچنان درخواستها را با پاسخ قابلتلاشمجدد `503` کنار میگذارد تا مشکل #7849 بازنگردد.

برای **چندبرابر کردن heapها** (old-spaceهای مستقل V8) **در حال حاضر**:

| انجام دهید                                                                                                                                                                            | انجام ندهید                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **N کانتینر/pod** اجرا کنید که هرکدام `DATA_DIR` / volume **مختص به خود** را داشته باشند                                                                                              | `replicas > 1` را برای یک فایل SQLite تنظیم نکنید                 |
| تعداد درخواستهای سنگینِ در حال پردازش + ظرفیت ذخیرهٔ سالم را بر اساس بودجهٔ heap / بایتهای در حال پردازش تنظیم کنید؛ 1–2 مقدار پیشفرض محافظهکارانهٔ #7849 است، نه یک حداکثر سخت محصول | به یک فرایند 8 برابر RAM و محدودیت تعداد نامحدود اختصاص ندهید     |
| اختیاری: برای **شمارندههای سهمیهٔ مشترک** از `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` استفاده کنید                                                                        | Redis را SQLite مشترک تلقی نکنید — چنین نیست                      |
| اسرار ارائهدهنده را در هر نمونه تکثیر کنید (یا داشبوردهای تفکیکشده را بپذیرید)                                                                                                        | انتظار یک داشبورد / یک گزارش تماس مشترک میان نمونهها نداشته باشید |
| هر متعادلکنندهٔ باری را در جلوی نمونهها قرار دهید؛ چسبندگی بر اساس کلید API یا نشست کافی است                                                                                          | به میانافزار آگاه از اندازه و مختص یک فروشنده نیاز ندارید         |

سختافزار: تعداد درخواستهای طولانی و همزمان `/v1/responses` در هر نمونه، مسئلهای مربوط به **بودجهٔ حافظه** است (heap + بودجهٔ بایتهای در حال پردازش / #10110). `N` عدد `DATA_DIR` مستقل همچنان heapها را چندبرابر میکنند: RAM میزبان باید ظرفیت `N × cgroup` را پوشش دهد، نه «یک pod با 16 Gi و N=8». هرگز برای یک فایل SQLite واحد از `replicas > 1` استفاده نکنید.

طرح اولیهٔ Compose (دو heap، دو volume — نه `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

چگالی درونفرایندی (انتقال فشردهسازی به خارج از isolate مربوط به HTTP) در [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) پیگیری میشود. یک خوشهٔ منطقی روی وضعیت پایدار مشترک در [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) پیگیری میشود.

## خطاهای منطقهای Gemini درون Docker

Google AI Studio / Gemini API ممکن است پاسخ HTTP 400 را همراه با FAILED_PRECONDITION و پیام
`User location is not supported for the API use.` برگرداند. موفقیتآمیز بودن یک درخواست روی میزبان
اثبات نمیکند که کانتینر از همان مسیر خروجی استفاده میکند. ترتیب DNS،
اتصال IPv4/IPv6، مسیریابی VPN و پراکسیهای پیکربندیشده ممکن است متفاوت باشند. علاوه بر مسیر واقعی اتصال،
[مناطق پشتیبانیشده Google](https://ai.google.dev/gemini-api/docs/available-regions)
را نیز بررسی کنید؛ این خطا بهتنهایی نشاندهنده نامعتبر بودن کلید API نیست.

### ترجیح دادن پراکسی مختص هر اتصال

از [پیکربندی پراکسی بهازای هر اتصال](../ops/PROXY_GUIDE.md#4-level-proxy-system) در OmniRoute
برای اتصال Gemini تحت تأثیر استفاده کنید، سپس **Test Connection** و یک درخواست کوچک
با همان مدل را دوباره اجرا کنید. با این کار، تغییر مسیریابی فقط به همان اتصال محدود میشود. بررسی کنید
که پراکسی از داخل کانتینر قابل دسترسی باشد و اتصال واقعاً آن را انتخاب کند.
تغییر مسیر، واجد شرایط بودن منطقهای در سرویس بالادستی را تضمین نمیکند.

### مقایسه شبکه میزبان و کانتینر

هنگام مقایسه نتایج احراز هویتشده، کلید، مدل و درخواست را یکسان نگه دارید؛ هرگز
اطلاعات احراز هویت، گذرواژههای پراکسی یا هدرهای کامل مجوز را در یک issue قرار ندهید.
ابتدا با استفاده از یک فرمان یکسان روی میزبان و داخل کانتینر، بررسی کنید که resolver سیستمعامل
کدام خانوادههای آدرس را ارائه میدهد:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` را با سرویسی که اجرا میکنید جایگزین کنید (برای مثال، `omniroute-web`). این
فرمانها خانوادههای آدرس را بدون اطلاعات احراز هویت یا آدرسهای IP چاپ میکنند. بازگردانده شدن `6`
فقط وجود یک نتیجه DNS از نوع IPv6 را نشان میدهد و قابل استفاده بودن مسیر IPv6 یا دسترسی به API
را **اثبات نمیکند**. در محیطهایی که `curl` نصب است،
`curl -4 -I https://generativelanguage.googleapis.com`
را با `curl -6 -I https://generativelanguage.googleapis.com` در هر دو محیط مقایسه کنید.
یک پاسخ HTTP، حتی اگر خطای بدون احراز هویت باشد، اتصالپذیری برای همان بررسی را اثبات میکند؛
فقط درخواست احراز هویتشده مدل، واجد شرایط بودن برای Gemini را آزمایش میکند.

### راهکار جایگزین در سطح میزبان: IPv6 فعال و سیاست resolver

گزارشدهنده [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) با فعال کردن
IPv6 کانتینر و تغییر نحوه انتخاب آدرس در glibc، دسترسی را در محیط خود بازیابی کرد.
این روش را یک راهکار جایگزین مختص همان محیط در نظر بگیرید. پیش از تنظیم ترجیحات resolver،
از کارکرد صحیح IPv6 میزبان، خروجی/مسیریابی کانتینر و قوانین فایروال اطمینان حاصل کنید.
وجود یک آدرس خصوصی ULA بهتنهایی اتصال عمومی IPv6 را اثبات نمیکند.

برای سرویسهایی که از قبل به شبکه پیشفرض Compose متصل هستند، قطعه زیر
IPv6 را روی آن شبکه فعال میکند؛ سایر تنظیمات سرویس، درگاهها، volumeها و پیکربندی خود را حفظ کنید:

```yaml
networks:
  default:
    enable_ipv6: true
```

برای یک شبکه نامگذاریشده، آن را روی شبکهای فعال کنید که سرویس واقعاً به آن متصل میشود. Docker میتواند
یک زیرشبکه ULA تخصیص دهد؛ فقط زمانی یک زیرشبکه صریح و بدون همپوشانی انتخاب کنید که شبکه شما
به آن نیاز داشته باشد. به [شبکهسازی IPv6 در Docker](https://docs.docker.com/engine/daemon/ipv6/)
و [گزینههای شبکه Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) مراجعه کنید.

در یک **image مبتنی بر glibc**، فایل `/etc/gai.conf` میتواند نحوه انتخاب آدرس را تغییر دهد. Dockerfile فعلی
repository از Debian استفاده میکند؛ imageهای سفارشی مبتنی بر musl از این سازوکار استفاده نمیکنند.
تنظیم گزارششده، برچسب ULA را از `label fc00::/7 6` به
`label fc00::/7 1` تغییر میدهد. از جدول کامل سیاستهای image شروع کرده و سایر
ورودیهای آن را حفظ کنید: افزودن یک ورودی `label` یا `precedence`، جدول پیشفرض را جایگزین میکند؛ بنابراین فایلی
که فقط شامل خط تغییرکرده باشد کافی نیست.
[مرجع پیکربندی glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
این رفتارها را مستند میکند. فایل بازبینیشده را بهصورت فقطخواندنی در `/etc/gai.conf`
bind-mount کنید و برای اعمال آن، سرویس را دوباره ایجاد کنید.

این کار نحوه انتخاب آدرس سیستمعامل را برای **تمام ترافیک خروجی آن کانتینر** تغییر میدهد.
این تغییر همه برنامهها را مجبور به انتخاب IPv6 نمیکند: ترتیب DNS و نحوه انتخاب اتصال در Node
نیز اهمیت دارند. بهطور خاص، `--dns-result-order=ipv4first` به IPv4 اولویت میدهد و
راهحلی برای خرابی مختص IPv4 نیست. به [ترتیب DNS در Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) مراجعه کنید.

پس از هر تغییر در سطح میزبان، Gemini و سایر providerهای خود را دوباره آزمایش کنید. برای بازگردانی،
mount سفارشی `gai.conf` را حذف کنید، پیکربندی قبلی شبکه را بازگردانید و
سرویس/شبکه تحت تأثیر را طی یک بازه نگهداری دوباره ایجاد کنید. ایجاد مجدد یک شبکه
میتواند کار سایر کانتینرهای متصل به آن را مختل کند؛ volume دادههای ماندگار را حذف نکنید.

## نکات مهم

- **حالت WAL در SQLite:** باید اجازه دهید اجرای `docker stop` به پایان برسد تا OmniRoute بتواند آخرین تغییرات را در `storage.sqlite` ثبت نهایی کند. فایلهای Compose همراه پروژه از قبل یک مهلت ۴۰ ثانیهای برای توقف تنظیم کردهاند. اگر image را مستقیماً اجرا میکنید، `--stop-timeout 40` را حفظ کنید.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اگر پشتیبانگیریهای دورهای/پیش از نوشتن بهصورت خارجی مدیریت میشوند، مقدار آن را روی `true` تنظیم کنید. مهاجرت پایگاههای داده موجود همچنان به snapshot ایمن و ماندگار خود و محافظ مهاجرت انبوه نیاز دارد.
- **ماندگاری دادهها:** همیشه یک volume را در `/app/data` mount کنید تا پایگاه داده، کلیدها و پیکربندیهای شما در راهاندازیهای مجدد کانتینر حفظ شوند.
- **پیکربندی پورت:** برای تغییر پورت پیشفرض `20128`، متغیر محیطی `PORT` را بازنویسی کنید.

## همچنین ببینید

- [راهنمای استقرار روی VM](../ops/VM_DEPLOYMENT_GUIDE.md) — راهاندازی VM + nginx + Cloudflare
- [راهنمای استقرار روی Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — استقرار روی Fly.io
- [پیکربندی محیط](../reference/ENVIRONMENT.md) — مرجع کامل `.env`
