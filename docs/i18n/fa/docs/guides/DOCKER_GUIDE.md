# 🐳 Docker Guide — OmniRoute (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> مرجع کامل استقرار Docker. برای شروع سریع، به [بخش Docker در README](../README.md#-docker) مراجعه کنید.

## فهرست مطالب

- [اجرای سریع](#quick-run)
- [با فایل محیطی](#with-environment-file)
- [Docker Compose](#docker-compose)
- [پروفایلهای موجود](#available-profiles)
- [پیکربندی ابزارهای CLI میزبان هنگام اجرای OmniRoute در Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose برای محیط عملیاتی](#production-compose)
- [مراحل Dockerfile](#dockerfile-stages)
- [متغیرهای محیطی حیاتی](#critical-environment-variables)
- [Docker Compose با Caddy‏ (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [تونل سریع Cloudflare](#cloudflare-quick-tunnel)
- [برچسبهای ایمیج](#image-tags)
- [دسترسپذیری: SQLite پیشفرض تکرپلیکا است](#availability-default-sqlite-is-single-replica)
- [نکات مهم](#important-notes)

---

## اجرای سریع

> **میزبانی شخصی تنها با یک دستور؟** به
> [راهنمای میزبانی شخصی](../getting-started/SELF_HOST_GUIDE.md) مراجعه کنید —
> `docker compose -f docker-compose.selfhost.yml up -d` (ایمیج منتشرشده +
> Redis، فقط روی loopback، بدون انتخاب پروفایل). روش اجرای سریع زیر،
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

## با فایل محیطی

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

# پروفایل CLI‏ (Claude Code، Codex و OpenClaw داخلی)
docker compose --profile cli up -d

# پروفایل میزبان (عمدتاً برای Linux؛ باینریهای CLI میزبان را بهصورت فقطخواندنی mount میکند)
docker compose --profile host up -d

# ترکیب CLI و CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## پروفایلهای موجود

OmniRoute با چهار پروفایل Compose ارائه میشود. پروفایلی را انتخاب کنید که با محیط شما مطابقت دارد.

| پروفایل         | سرویس            | زمان استفاده                                                                                                                                      | دستور                                        |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (پیشفرض) | `omniroute-base` | سرور بدون رابط گرافیکی / محیط اجرای حداقلی، بدون CLIهای ارائهدهندگان                                                                              | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | گردشکارهای عاملی که `omniroute providers/setup/doctor` و CLIهای داخلی (Codex، Claude Code، Droid، OpenClaw) را فراخوانی میکنند                    | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | میزبانهای Linux که با mount کردن فقطخواندنی `~/.local/bin`، `~/.codex`، `~/.claude` و غیره، دسترسی مشابه `network_mode` به CLIهای میزبان میخواهند | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | اجرای [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar روی پورت `8317` برای پروکسیکردن CLI بالادستی                            | `docker compose --profile cliproxyapi up -d` |

> میتوان چند پروفایل را با هم ترکیب کرد: `docker compose --profile cli --profile cliproxyapi up -d`.

## پیکربندی ابزارهای CLI میزبان هنگامی که OmniRoute در Docker اجرا میشود

`omniroute setup-codex`، `setup-claude`، `config set <tool>` و دکمهٔ
**ذخیرهٔ پیکربندی** در داشبورد، همگی فایلهایی مانند `~/.codex/*.config.toml` را مینویسند. این مسیرها
فقط روی ماشینی معنا دارند که CLI واقعاً در آن اجرا میشود. اگر آنها را داخل
کانتینر اجرا کنید، عملیات نوشتن در پوشهٔ خانگی خود کانتینر (`/home/node` —
ایمیج با `USER node` اجرا میشود) انجام خواهد شد؛ جایی که هیچ CLI میزبانی آن را
نمیخواند و بهمحض ایجاد مجدد کانتینر، حذف میشود.

OmniRoute این وضعیت را تشخیص میدهد و بهجای گزارش موفقیتی که قابل استفاده نیست،
از نوشتن خودداری کرده و دستورالعملهایی ارائه میدهد: CLI با کد `2` خارج میشود و API با کد `422`
و `containerEphemeralTarget: true` پاسخ میدهد.

### توصیهشده: CLI را روی میزبان و OmniRoute را در Docker اجرا کنید

کانتینر، API را ارائه میکند؛ CLI نیز ابزارهای میزبان شما را پیکربندی میکند.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI را به کانتینر متصل کنید
omniroute setup-codex                      # مسیر واقعی ~/.codex را روی میزبان شما مینویسد
```

هنگامی که Codex، Claude Code، Cursor یا ابزارهای مشابه روی لپتاپ شما اجرا میشوند،
این گزینهٔ مناسبی است — و این همان راهاندازی معمول است.

### روش جایگزین: دایرکتوریهای پیکربندی میزبان را بهصورت bind mount متصل کنید (پروفایل `host`)

اگر میخواهید خود کانتینر پیکربندی میزبان شما را بنویسد، دایرکتوریها را
mount کرده و `CLI_CONFIG_HOME` را به ریشهٔ mount اشاره دهید. پروفایل `host`
از قبل این کار را انجام میدهد:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount همان چیزی است که مسیر را قابل اعتماد میکند: OmniRoute فایل
`/proc/self/mountinfo` را میخواند و نوشتن در مسیرهای mountشده (و نیز دایرکتوریهایی
که فرزندانشان mount شدهاند، که دقیقاً با ساختار `/host-home` در بالا مطابقت دارد) مجاز میداند،
درحالیکه همچنان از نوشتن در مسیرهای mountنشده خودداری میکند.

### راه گریز: CLIهای داخل خود کانتینر را پیکربندی کنید (با احتیاط استفاده شود)

هنگامی که CLIها واقعاً داخل کانتینر قرار دارند (پروفایل `cli`)، عملیات نوشتن
عمدی است. گزینهٔ `--allow-container-write` را به هر فرمان `setup-*` بدهید، یا برای
سرور مقدار `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` را تنظیم کنید. عملیات نوشتن
با هشداری مبنی بر اینکه پس از حذف کانتینر باقی نخواهد ماند، انجام میشود.

> **هشدار امنیتی — پروفایل `cli` بههمراه mount کردن `docker.sock`.**
> پروفایل `cli` مسیر `/var/run/docker.sock` را بهصورت bind mount متصل میکند تا بهروزرسان خودکار
> داخل کانتینر بتواند stack را از طریق daemon میزبان دوباره ایجاد کند
> (`src/lib/system/autoUpdate.ts` وجود آن socket را بررسی میکند و در صورت نبودنش،
> مسیر Docker را نادیده میگیرد). آن socket **یک مرز اعتماد با سطح دسترسی root
> روی میزبان** است: هر چیزی که بتواند به آن دسترسی پیدا کند، daemon مربوط به Docker میزبان را با
> دسترسی root کنترل میکند — و میتواند هر کانتینری را روی میزبان ایجاد، بررسی، متوقف یا حذف کند.
> پیامدها:
>
> 1. **هرگز پورت پروفایل `cli` را در معرض شبکه قرار ندهید.** آن را روی
>    `127.0.0.1` منتشر کنید (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — دسترسیپذیر بودن پروفایل `cli` از طریق LAN، هر RCE در سطح داشبورد را به
>    نفوذ کامل به میزبان تبدیل میکند.
> 2. **هیچ دایرکتوری اضافی از میزبان را در پروفایل `cli` بهصورت bind mount متصل نکنید.**
>    socket مربوط به Docker همراه با هر mount اضافی، دسترسی کامل خواندن/نوشتن به
>    سیستم فایل و پیکربندی میزبان را در اختیار کانتینر قرار میدهد. اگر لازم است ابزاری به
>    یک پروژه دسترسی داشته باشد، آن را بهصورت محلی با فایل باینری CLI اجرا کنید — پروژه را
>    داخل کانتینر `cli` mount نکنید.
>
> اگر به بهروزرسانی خودکار داخل کانتینر نیاز ندارید، پروفایل `cli` را غیرفعال نگه دارید
> (`COMPOSE_PROFILES=core,redis` یا کوتاهتر). سایر پروفایلها
> socket مربوط به Docker را mount نمیکنند.
>
> برای مدل تهدید مرتبط با MITM، به `docs/security/MITM-TPROXY-DECRYPT.md` (در git؛ در `/docs` کامپایل نشده است) مراجعه کنید،
> و برای زنجیرهٔ منشأ فایلهای باینری
> `codex`/`claude-code`/`droid`/`openclaw`، فایل `docs/security/SUPPLY_CHAIN.md` را ببینید.

## سایدکار Redis

OmniRoute برای پشتیبانی از محدودکننده نرخ توزیعشده و کش اشتراکی به Redis متکی است. سرویس `redis` **همیشه** در `docker-compose.yml` تعریف شده است (هیچ محدودیت پروفایلی ندارد) و همراه با هر پروفایل دیگری اجرا میشود.

| جزئیات                            | مقدار                                  |
| --------------------------------- | -------------------------------------- |
| ایمیج                             | `redis:7-alpine`                       |
| نام کانتینر                       | `omniroute-redis`                      |
| پورت داخلی                        | `6379`                                 |
| پورت میزبان (قابل بازنویسی)       | `REDIS_PORT` (پیشفرض `6379`)           |
| آدرس اتصال میزبان (قابل بازنویسی) | `REDIS_BIND_HOST` (پیشفرض `127.0.0.1`) |
| ولوم                              | `omniroute-redis-data` → `/data`       |
| بررسی سلامت                       | `redis-cli ping` (با فاصله 10 ثانیه)   |

متغیرهای محیطی مرتبط:

- `REDIS_URL` — رشته اتصال تزریقشده به برنامه (بهطور پیشفرض `redis://redis:6379`).
- `REDIS_PORT` — نگاشت پورت سمت میزبان برای کانتینر Redis.
- `REDIS_BIND_HOST` — رابط میزبان که پورت روی آن منتشر میشود. مقدار پیشفرض `127.0.0.1` است.

> **دلیل استفاده پیشفرض از loopback:** سایدکار بدون `requirepass` اجرا میشود و کانتینرهای
> برنامه از طریق شبکه compose (`redis:6379`) به آن دسترسی پیدا میکنند — پورت منتشرشده
> فقط برای ابزارهای سمت میزبان (`redis-cli` و یک `npm run dev` محلی) در نظر گرفته شده است. انتشار روی
> `0.0.0.0` یک Redis بدون احراز هویت را در معرض دسترسی تمام میزبانهای شبکه محلی شما قرار میدهد. اگر
> `REDIS_BIND_HOST=0.0.0.0` را تنظیم میکنید، `--requirepass` را نیز به `command:` سرویس اضافه کنید.

**غیرفعالکردن Redis** توصیه نمیشود (محدودکننده نرخ به حالت جایگزین درونحافظهای تنزل پیدا میکند). اگر ناچار به انجام این کار هستید، بلوک سرویس `redis:` را در `docker-compose.yml` حذف/کامنت کنید یا تعداد نمونههای آن را به صفر کاهش دهید:

```bash
docker compose up -d --scale redis=0
```

## Compose محیط تولید

برای اجرای یک نمونه مستقل از محیط تولید در کنار محیط توسعه، از `docker-compose.prod.yml` استفاده کنید.

| جزئیات              | مقدار                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| فایل                | `docker-compose.prod.yml`                                                        |
| پورت پیشفرض داشبورد | `PROD_DASHBOARD_PORT=20130` (نگاشتشده به `${DASHBOARD_PORT:-20128}` داخلی)       |
| پورت پیشفرض API     | `PROD_API_PORT=20131`                                                            |
| ایمیج               | `omniroute:prod` (ساختهشده از تارگت `runner-cli`)                                |
| کانتینر Redis       | `omniroute-redis-prod` (`redis:8.6.2`، با ولوم اختصاصی `redis-prod-data`)        |
| ولوم داده           | `omniroute-prod-data` (نامگذاریشده و پایدار میان بازسازیها)                      |
| بررسیهای سلامت      | `node healthcheck.mjs` + `redis-cli ping`، با `depends_on` وابسته به سلامت Redis |

نحوه استفاده:

```bash
# ساخت و راهاندازی پشته تولید
docker compose -f docker-compose.prod.yml up -d --build

# نمایش پیوسته لاگها
docker compose -f docker-compose.prod.yml logs -f

# توقف و حذف پشته (با حفظ ولومها)
docker compose -f docker-compose.prod.yml down
```

پشته تولید بهموازات compose توسعه اجرا میشود (با نام کانتینرها، پورتها و ولومهای متفاوت)، بنابراین میتوانید در حالی که محیط تولید فعال میماند، توسعه محلی را ادامه دهید.

## مراحل Dockerfile

این مخزن یک Dockerfile چندمرحلهای (`Dockerfile`) ارائه میکند. سه مرحله در دسترس هستند؛ `target` مناسب را برای مورد استفادهٔ خود انتخاب کنید.

| مرحله         | ایمیج پایه            | هدف                                                                                                                                                                                             |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | وابستگیها را نصب میکند (`npm ci --legacy-peer-deps`) و `npm run build` را اجرا میکند (بهطور پیشفرض با Turbopack — بخش منابع زمان ساخت را در ادامه ببینید)                                       |
| `runner-base` | `node:26-trixie-slim` | محیط اجرای پروداکشن با خروجی standalone مربوط به Next.js. **هیچ CLI ارائهدهندهای در آن گنجانده نشده است.**                                                                                      |
| `runner-cli`  | `runner-base`         | `git`، `docker.io`، `docker-compose` و CLIهای سراسری زیر را اضافه میکند: `@openai/codex`، `@anthropic-ai/claude-code`، `droid`، `openclaw`. **برای گردشکارهای عاملی این گزینه را انتخاب کنید.** |

ساخت دستی یک target مشخص:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### منابع زمان ساخت

سه آرگومان ساخت، میزان منابع مصرفی مرحلهٔ `builder` را کنترل میکنند. این آرگومانها فقط در زمان ساخت کاربرد دارند —
`OMNIROUTE_MEMORY_MB` (در ادامه) یک تنظیم جداگانه برای زمان اجرا است.

| آرگومان ساخت                | پیشفرض | تأثیر                                                                                                        |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | مقدار `0` باعث میشود ساخت با webpack انجام شود. اوج مصرف حافظه کمتر، اما سرعت پایینتر است.                   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | سقف heap در V8 (`--max-old-space-size`) برای فرایند ایجادشدهٔ `next build`.                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | مقدار `CIRCLE_NODE_TOTAL` را تأمین میکند؛ Next برای جمعآوری دادههای صفحه، `workers = N - 1` را محاسبه میکند. |

`OMNIROUTE_BUILD_WORKERS` همان گزینهای است که باید روی یک سازندهٔ قدرتمند افزایش دهید و
هنگامی که ساختی با منابع محدود **پس از** `✓ Compiled successfully` متوقف میشود، به آن
مشکوک شوید. هر worker مربوط به دادههای صفحه یک فرایند مستقل است و فرایند والد
`next build` نیز همینطور است؛ یک بازتولید زنده روی VPS (issue #7518)، اوج RSS هر
فرایند را حدود 4.5 GB اندازهگیری کرد که مستقل از فلگ heap در `NODE_OPTIONS` بود
(Turbopack عملیات کامپایل را در حافظهٔ native/Rust خارج از heap مربوط به V8 انجام
میدهد). مقدار پیشفرض `2` (→ 1 worker، در مجموع 2 فرایند) برای runnerهای
میزبانیشده توسط GitHub با 16 GB حافظه و 4 vCPU که pipeline انتشار از آنها
استفاده میکند، تنظیم شده است. با مقدار `8` (→ 7 worker)، حافظهٔ آن runner تمام شد و
buildkit مرحله را با خطای `ResourceExhausted: ... cannot allocate memory` متوقف کرد؛
مقدار `3` (→ 2 worker) نیز پس از آنکه RSS هر فرایند مستقیماً اندازهگیری شد و نه
بهصورت استنباطی، همچنان در حافظهٔ موجود جا نشد. فایل
`tests/unit/docker-build-memory-budget.test.ts` محاسبات را بر مبنای مقدار اندازهگیریشده
انجام میدهد و اگر هرکدام از این تنظیمات از ظرفیت runner فراتر بروند، با شکست مواجه
میشود.

Turbopack عملیات کامپایل را در حافظهٔ native مربوط به Rust انجام میدهد که **خارج**
از heap مربوط به V8 قرار دارد؛ بنابراین `OMNIROUTE_BUILD_MEMORY_MB` آن را محدود
نمیکند. در میزبانی با سقف حافظه، فرایند ساخت بدون هیچ متن خطایی توسط OOM killer با
SIGKILL خاتمه داده میشود — فرایند صرفاً در میانهٔ `Creating an optimized production build`
متوقف میشود و بهجای کمبود حافظه، شبیه هنگ کردن به نظر میرسد. اگر میزبان ساخت
منابع محدودی دارد، bundler را تغییر دهید:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` فعال است؛ بنابراین `next build` یک فرایند والد **و** یک فرایند
worker را اجرا میکند و هرکدام بهطور جداگانه از `OMNIROUTE_BUILD_MEMORY_MB`
پیروی میکنند. سقف حافظهٔ کانتینر را تقریباً بیشتر از دو برابر این مقدار در نظر
بگیرید، نه فقط یک برابر.

اندازهگیریشده روی این درخت (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | سقف حافظهٔ کانتینر | نتیجه                                       |
| --------- | ------------------ | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | در هر دو مقدار، بدون پیام توسط OOM متوقف شد |
| webpack   | 8 GiB              | worker ساخت با SIGKILL متوقف شد             |
| webpack   | 12 GiB             | موفق شد و اوج مصرف به 11.1 GiB رسید         |

### پیشفرضهای زمان اجرا

مقادیر پیشفرض exportشده توسط `runner-base`: `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

رفتار حافظه در Docker:

- ایمیج مقدار `OMNIROUTE_MEMORY_MB=1024` را تنظیم میکند و `NODE_OPTIONS=--max-old-space-size=1024` را از آن به دست میآورد.
- فرایند واقعی سرور توسط launcher مستقل اجرا میشود که `OMNIROUTE_MEMORY_MB` را میخواند و `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` را اضافه میکند.
- Node از آخرین مقدار تکرارشدهٔ `--max-old-space-size` استفاده میکند؛ بنابراین تنظیم `OMNIROUTE_MEMORY_MB` محدودیت مؤثر heap در Docker را کنترل میکند.
- از آنجا که ایمیج همیشه این مقدار را تنظیم میکند، fallback مبتنی بر RAM خود launcher در Docker هرگز اعمال نمیشود. این مقدار را متناسب با workload بهطور صریح افزایش دهید (جدول زیر). مقدار `2048` همچنان برای `/v1/responses` مربوط به عاملهای کدنویسی بسیار کم است.

### RAM زمان اجرا برای عاملهای کدنویسی

مقدار پیشفرض 1 GiB در Docker، حداقل مقدار مناسب برای داشبورد یا گفتوگوی سبک است، نه اندازهای مناسب برای پروداکشن. بدنههای طولانی `POST /v1/responses` (شامل صدها پیام و دهها ابزار) هنگام فشردهسازی، چندین گراف درونحافظهای را نگه میدارند. دو درخواست همزمان با اندازهٔ حدود 3 MiB و تقریباً 750k توکن، V8 را با old-space برابر با **12 GiB** متوقف کردهاند (`FATAL ERROR: Reached heap limit`) و همچنین موجب OOM در cgroup با ظرفیت 16 GiB شدهاند. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) را ببینید.

مقدار **`--memory` مربوط به cgroup را بالاتر از heap تنظیم کنید** — بافرهای native، SQLite و دادههای میانی فشردهسازی خارج از V8 قرار دارند.

| بار کاری                            | `OMNIROUTE_MEMORY_MB`    | کانتینر / cgroup       | توضیحات                                                                                                     |
| ----------------------------------- | ------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| داشبورد، یک گفتوگوی سبک             | `1024` (پیشفرض ایمیج)    | ≥2 GiB                 |                                                                                                             |
| یک عامل کدنویسی (Claude/Codex/Grok) | `8192`                   | ≥10 GiB                | یک نشست معمولی `/v1/responses`                                                                              |
| دو `/v1/responses` طولانی همزمان    | `10240`–`12288`          | ≥12–16 GiB             | توقف اجباری V8 در heap حدود 12 GiB اندازهگیری شده است                                                       |
| سه یا بیشتر زمینهٔ طولانی همزمان    | روی یک پردازه اجرا نکنید | سریالیسازی / RAM بیشتر | پذیرش پیشفرض بارهای سنگین، 1 درخواست در حال اجرا است؛ افزایش آن بدون RAM کافی دوباره باعث توقف اجباری میشود |

هنگامی که `OMNIROUTE_MEMORY_MB` **تنظیم نشده باشد**، `omniroute serve` روی سختافزار مستقیم مقدار حدود 35٪ از RAM را محاسبه میکند (محدودشده به بازهٔ `[512, 4096]`). Docker همیشه آن را روی `1024` تنظیم میکند، بنابراین این محاسبه هرگز در ایمیج رسمی اجرا نمیشود.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## متغیرهای حیاتی محیطی

علاوه بر مقادیر پیشفرض مستندشده در [ENVIRONMENT.md](../reference/ENVIRONMENT.md)، متغیرهای زیر هنگام اجرا تحت Docker بیشترین اهمیت را دارند:

| متغیر                         | کاربرد                                                                                                                                                                                                                                                                                    | مقدار پیشفرض               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | راز مشترک برای پل WebSocket. **در محیط تولید الزامی است** — آن را روی یک رشته تصادفی قوی تنظیم کنید.                                                                                                                                                                                      | تنظیمنشده (باید ارائه شود) |
| `REDIS_URL`                   | رشته اتصال برای محدودکننده نرخ / بکاند کش                                                                                                                                                                                                                                                 | `redis://redis:6379`       |
| `REDIS_PORT`                  | پورت سمت میزبان برای کانتینر Redis همراه                                                                                                                                                                                                                                                  | `6379`                     |
| `REDIS_BIND_HOST`             | رابط میزبان که پورت Redis همراه روی آن منتشر میشود (حلقه بازگشتی، مگر اینکه AUTH را اضافه کنید)                                                                                                                                                                                           | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | مسیر میزبان که برای گردشکارهای بهروزرسانی خودکار، در پروفایل `cli` روی `/workspace/omniroute` سوار میشود                                                                                                                                                                                  | `.` (دایرکتوری فعلی)       |
| `OMNIROUTE_MEMORY_MB`         | سقف heap زمان اجرای Node برای سرور مستقل Docker؛ مقدار پیشفرض بالای image را لغو میکند. عاملهای کدنویسی: `8192`+ (به [RAM زمان اجرا](#runtime-ram-for-coding-agents) مراجعه کنید).                                                                                                        | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | بازنویسی پورتهای در معرض دسترس برای داشبورد (20128) و API (20129)                                                                                                                                                                                                                         | `20128` / `20129`          |
| `APP_BIND_HOST`               | رابط میزبانی که docker-compose پورتهای داشبورد/API/live-WS را روی آن منتشر میکند. با `REQUIRE_API_KEY=false` (مقدار پیشفرض)، `0.0.0.0` پروکسی ناشناس `/v1` را در معرض LAN قرار میدهد — فقط با `REQUIRE_API_KEY=true` یا قرار دادن یک پروکسی معکوس در جلوی آن، دامنه دسترسی را گسترش دهید. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | رابط میزبانی که docker-compose سرویس جانبی `cliproxyapi` را روی آن منتشر میکند — volume داده آن، اعتبارنامههای ارائهدهنده را نگه میدارد.                                                                                                                                                  | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | دایرکتوریای که اسکنر افزونه زمان اجرا از آن میخواند و افزونهها را در آن نصب میکند. هنگامی که افزونهها بهصورت bind سوار شدهاند، آن را تنظیم کنید: مقدار پیشفرض از `HOME` پیروی میکند که ممکن است یک image آن را export نکند.                                                               | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | زیرمسیر URL هنگامی که برنامه پشت یک پروکسی معکوس منتشر میشود (برای مثال `/omniroute`)                                                                                                                                                                                                     | _(خالی = ریشه)_            |
| `NEXT_PUBLIC_BASE_URL`        | مبدأ عمومی مرورگر شامل زیرمسیر (برای مثال `https://host/omniroute`)                                                                                                                                                                                                                       | تنظیمنشده                  |
| `PROD_DASHBOARD_PORT`         | پورت سمت میزبان داشبورد برای `docker-compose.prod.yml`                                                                                                                                                                                                                                    | `20130`                    |
| `CLIPROXYAPI_PORT`            | پورت سمت میزبان برای سرویس جانبی `cliproxyapi`                                                                                                                                                                                                                                            | `8317`                     |

## پروکسی معکوس روی یک زیرمسیر (Traefik / nginx)

مقدار `basePath` در Next.js داخل بستهٔ مستقل کامپایل میشود. OmniRoute مقدار تعبیهشده را در یک فایل نشانه در ریشهٔ برنامه ثبت میکند (این فایل هنگام اجرای `npm run build` نوشته و توسط `scripts/docker/ensure-docker-base-path.mjs` خوانده میشود) و هنگام راهاندازی کانتینر، آن را با `OMNIROUTE_BASE_PATH` مقایسه میکند. اگر این مقادیر متفاوت باشند و ایمیج برای ریشهٔ دامنه ساخته شده باشد، entrypoint پیش از اجرای `node dev/run-standalone.mjs`، manifestهای مستقل، مقادیر literal تعبیهشدهٔ `basePath`/`assetPrefix` (نسخهٔ Next 16 نشانیهای دارایی SSR را صرفاً از `assetPrefix` رندر میکند — patcher زیرمسیر را در آن نیز منعکس میکند)، نشانیهای تعبیهشدهٔ داراییهای `/_next/static` (manifestهای ارجاع کلاینت، importهای رسانه و صفحات خطای ازپیشرندرشده) و shim مربوط به `process.env` در کلاینت را بازنویسی میکند.

### ساخت با Compose (پیشنهادشده)

هر دو متغیر را در `.env` تنظیم کنید، سپس ایمیج را دوباره بسازید تا مقادیر ایمیج و محیط اجرا یکسان باشند:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

فایل `docker-compose.yml` مقدار `OMNIROUTE_BASE_PATH` را هم بهعنوان آرگومان ساخت Docker و هم بهعنوان متغیر محیطی زمان اجرا ارسال میکند.

### ایمیج ریشهٔ ازپیشساختهشده + زیرمسیر زمان اجرا

ایمیجهای منتشرشدهٔ `diegosouzapw/omniroute:*` برای ریشهٔ دامنه ساخته شدهاند. بااینحال، میتوانید `OMNIROUTE_BASE_PATH` را هنگام اجرا تنظیم کنید؛ کانتینر در زمان راهاندازی، بسته را یکبار patch میکند. آن را همراه با مبدأ عمومی متناظر تنظیم کنید:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

پروکسی معکوس را طوری پیکربندی کنید که مسیر خارجی را بهصورت **کامل** ارسال کند (پیشوند را حذف نکنید). Traefik باید `PathPrefix(`/omniroute`)` را بدون `StripPrefix` به کانتینر مسیریابی کند تا Next.js مسیر `/omniroute/...` را دریافت کند و داراییها را از `/omniroute/_next/...` ارائه دهد.

بررسی سلامت Docker، endpoint سبکوزن چرخهٔ حیات `/healthz` را با پیشوند `OMNIROUTE_BASE_PATH` فعال بررسی میکند. مسیر `/api/monitoring/health` همچنان برای عیبیابی انسانی/داشبورد در دسترس است؛ برای بازگرداندن HEALTHCHECK کانتینر به این مسیر (برای مثال، جهت اعمال بررسی سلامت عمیق)، مقدار `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` را تنظیم کنید. این مسیر یک بررسی **عمیق** است (پایگاه داده + خلاصهٔ پایش) — اگر دوباره آن را فعال کنید، برای `HEALTHCHECK` کمتکرار Docker مناسب است، اما برای بازههای زمانی `livenessProbe` در Kubernetes **مناسب نیست**.

برای هماهنگکنندهها (Kubernetes، Nomad و غیره):

| پروب            | ترجیح دهید                                                       | اجتناب کنید                                                                   |
| --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| زندهبودن        | HTTP `GET /livez`، یا TCP روی پورت اصلی (`PORT`، پیشفرض `20128`) | استفاده از `/api/monitoring/health` برای زندهبودن                             |
| آمادگی          | HTTP `GET /healthz`                                              | timeoutهای کوتاهی که مشغولبودن event loop را بهمعنای ازکارافتادگی تلقی میکنند |
| عمیق / blackbox | `/api/monitoring/health`                                         | —                                                                             |

مسیر `/healthz` وضعیت چرخهٔ حیات پردازه (`ok` / `starting` / `stopping`) را گزارش میکند. مسیر `/livez` فقط زندهبودن پردازه را بررسی میکند (هر زمان handler بتواند اجرا شود، پاسخ 200 میدهد؛ منتظر آمادهشدن نمیماند). هر دو همچنان روی همان event loop مربوط به Node اجرا میشوند که درخواستها را پردازش میکند؛ بنابراین، پردازش catalog یا فشردهسازی CPU-bound میتواند آنها را به تأخیر بیندازد — مشغول ≠ ازکارافتاده. اگر پروبهای HTTP دچار timeout میشوند، بررسی زندهبودن TCP را ترجیح دهید. راهنمای کامل پروبها:
[راهنمای پایش — توصیههای مربوط به پروبهای Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose با Caddy (HTTPS Auto-TLS)

میتوان OmniRoute را با استفاده از صدور خودکار گواهی SSL توسط Caddy بهصورت امن در دسترس قرار داد. مطمئن شوید رکورد DNS نوع A دامنه شما به IP سرورتان اشاره میکند.

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
      # مبدأ قابلدسترسی برای مرورگر جهت فراخوانیهای بازگشتی OAuth، پیوندهای داشبورد و URLهای عمومی تولیدشده.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL داخلی سروربهسرور برای کارهای زمانبندیشده / واکشیهای داخلی.
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
`NEXT_PUBLIC_BASE_URL` بهعنوان مبدأ عمومی مرجع برای فراخوانیهای بازگشتی OAuth و پیوندهای عمومی
تولیدشده استفاده میکند؛ عملیات نوشتن احراز هویتشده در داشبورد از درخواستهای هممبدأ بههمراه محافظت
CSRF وابسته به نشست استفاده میکنند. `OMNIROUTE_TRUST_PROXY` را فقط برای استقرارهای پیشرفتهای فعال
کنید که در آنها عمداً میخواهید OmniRoute مبدأ عمومی را بهجای پیکربندی صریح، از هدرهای هدایتشده
مورداعتماد استخراج کند.

## تونل سریع Cloudflare

پشتیبانی داشبورد برای استقرارهای Docker شامل یک **Cloudflare Quick Tunnel** تککلیکی در `Dashboard → Endpoints` است. نخستین فعالسازی، تنها در صورت نیاز `cloudflared` را دانلود میکند، یک تونل موقت به نقطه پایانی فعلی `/v1` شما راهاندازی میکند و URL تولیدشده `https://*.trycloudflare.com/v1` را مستقیماً زیر URL عمومی عادی شما نمایش میدهد.

پنلهای تونل نقطه پایانی (Cloudflare، Tailscale و ngrok) را میتوان از مسیر `Settings → Appearance` بدون تغییر وضعیت تونل فعال، نمایش داد یا پنهان کرد.

### نکات تونل

- URLهای Quick Tunnel موقت هستند و پس از هر راهاندازی مجدد تغییر میکنند.
- Quick Tunnelها پس از راهاندازی مجدد OmniRoute یا کانتینر بهطور خودکار بازیابی نمیشوند. در صورت نیاز، آنها را دوباره از داشبورد فعال کنید.
- نصب مدیریتشده در حال حاضر از Linux، macOS و Windows روی `x64` / `arm64` پشتیبانی میکند.
- Quick Tunnelهای مدیریتشده بهطور پیشفرض از انتقال HTTP/2 استفاده میکنند تا از هشدارهای پرتکرار مربوط به بافر UDP در QUIC در محیطهای کانتینری محدود جلوگیری شود. اگر انتقال دیگری میخواهید، `CLOUDFLARED_PROTOCOL=quic` یا `auto` را تنظیم کنید.
- ایمیجهای Docker گواهیهای CA ریشه سیستم را همراه خود دارند و آنها را به `cloudflared` مدیریتشده ارسال میکنند؛ این کار هنگام راهاندازی اولیه تونل درون کانتینر، از خطاهای اعتماد TLS جلوگیری میکند.
- اگر میخواهید OmniRoute بهجای دانلود یک فایل باینری جدید از فایل باینری موجود استفاده کند، `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` را تنظیم کنید.

## تگهای ایمیج

| ایمیج                    | تگ       | اندازه | توضیحات                                                |
| ------------------------ | -------- | ------ | ------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | بالاترین SemVer پایدار **منتشرشده** (نه `main` در git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | برای GitOps از این نوع تگ ثابت استفاده کنید            |

مانیفست چندسکویی: `linux/amd64` + `linux/arm64` بهصورت بومی (Apple Silicon، AWS Graviton و Raspberry Pi). Docker معماری منطبق را بهطور خودکار انتخاب میکند؛ اگر لازم است شبیهسازی AMD64 را روی میزبانهای ARM اجباری کنید، `--platform linux/amd64` را ارسال کنید.

### کانالهای انتشار

OmniRoute کانالهای Docker جداگانهای برای انتشارهای پایدار، آزمایش شاخه انتشار فعال و بیلدهای توسعه منتشر میکند.

| کانال                           | منبع                                | تغییرپذیری                  | کاربرد توصیهشده                                                                                                                       |
| ------------------------------- | ----------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | انتشار امضاشده/نسخهبندیشده          | تغییرناپذیر                 | استقرارهای عملیاتی که به یک انتشار دقیق مقید شدهاند                                                                                   |
| `:latest` / `:latest-web`       | بالاترین SemVer پایدار **منتشرشده** | اشارهگر پایدار تغییرپذیر    | انتشارهای پایدار را **پس از** اجرای فرایند انتشار SemVer دنبال میکند — `main` یا commitهای منتشرنشده `release/v*` را دنبال **نمیکند** |
| `:next` / `:next-web`           | شاخه پیشفرض فعلی `release/v*`       | اشارهگر پیشانتشار تغییرپذیر | آزمایش اصلاحاتی که در شاخه انتشار فعال ادغام شدهاند، اما هنوز بخشی از یک انتشار پایدار نیستند                                         |
| `:main` / `:main-web`           | شاخه `main`                         | اشارهگر توسعه تغییرپذیر     | فقط برای توسعه و آزمایش یکپارچهسازی                                                                                                   |

#### استفاده از کانال پیشانتشار

کانال `next` با هر push به شاخه پیشفرض فعلی `release/v*` دوباره ساخته میشود و برای هر دو معماری AMD64 و ARM64 منتشر میشود. شاخههای نگهداری قدیمیتر نمیتوانند آن را بازنویسی کنند. این کانال یک ایمیج قابلدریافت برای اصلاحاتی فراهم میکند که پیش از ایجاد تگ پایدار بعدی در شاخه انتشار فعال ادغام شدهاند.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

برای Docker Compose، تگ ایمیج استفادهشده توسط پروفایل انتخابی را بازنویسی کنید، سپس سرویس را دریافت و دوباره ایجاد کنید:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ایمنی و بازگشت به نسخه قبل

`next` یک کانال پیشانتشار شناور است. ممکن است با هر push به شاخه انتشار فعال تغییر کند و **برای استفاده در محیط عملیاتی پشتیبانی نمیشود**. هنگام ارزیابی یک بیلد مشخص، digest ایمیج را ثابت کنید:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

پیش از آزمایش، از volume دادههای OmniRoute یا دایرکتوری دادهای که با bind mount متصل شده است، نسخهٔ پشتیبان تهیه کنید. برای بازگشت به نسخهٔ قبلی، نسخه یا digest پایدارِ استفادهشدهٔ پیشین را بازیابی کرده و container را دوباره ایجاد کنید:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

یک build از release branch هرگز نمیتواند `latest` را جابهجا کند؛ فقط یک نسخهٔ معنایی پایدار و واجد شرایط میتواند stable pointer را ارتقا دهد. imageهای `next` همچنان تحت بازرسی release image و gate مسدودکنندهٔ آسیبپذیریهای CRITICAL قرار میگیرند.

**`latest` تضمینی برای بهروز بودن نسبت به git نیست.** اصلاحات ادغامشده در `main` یا active branch با نام `release/v*`، تا زمانی که یک image با SemVer پایدار منتشر نشود و publish job، `:latest` را ارتقا ندهد (با همان digest مربوط به آن SemVer)، در `:latest` وجود **ندارند**. اگر به نظر میرسد `latest` ثابت مانده است، درحالیکه GitHub از قبل اصلاح را نشان میدهد، برای آزمایش release branch، `:next` را pull کنید یا منتظر SemVer tag بمانید.

| نیاز شما                                                    | مورد استفاده                           |
| ----------------------------------------------------------- | -------------------------------------- |
| GitOps / محیط production که نباید دچار drift شود            | `:X.Y.Z` (یا image digest) را pin کنید |
| دنبالکردن stableهای منتشرشده و پذیرش recreate در هر release | `:latest`                              |
| آزمایش commitهای منتشرنشدهٔ `release/v*`                    | `:next` (نه برای production)           |
| آزمایش `main`                                               | `:main` (نه برای production)           |

## دسترسپذیری: SQLite پیشفرض تکنمونهای است

پیکربندی استاندارد Docker / Kubernetes برای OmniRoute شامل **یک پردازش Node + یک نویسنده SQLite** است. دسترسپذیری بالا در این توپولوژی **پشتیبانی نمیشود**.

| محدودیت                                             | پیامد                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| نویسنده منفرد                                       | چندین نمونه را با یک فایل SQLite مشترک اجرا **نکنید**. این کار پایگاه داده را خراب میکند.                                                                                                                                                                                                                                                                         |
| ایجاد مجدد / راهاندازی مجدد / توقف توسط HEALTHCHECK | **قطعی کامل** برای SSEهای در حال اجرا، نشستهای داشبورد و وضعیت درونحافظهای رخ میدهد. اتصال تمام کلاینتهای متصل قطع میشود. درخواستهای جدید در بازهای که هیچ endpointای وجود ندارد، از reverse proxy خطای **`502 Bad Gateway: Unknown error`** دریافت میکنند، نه JSON مربوط به OmniRoute — کلاینتها نمیتوانند این وضعیت را از خرابی ارائهدهنده تشخیص دهند (#11015). |
| event loop مشترک با `/healthz`                      | یک چرخه شلوغ کاتالوگ یا فشردهسازی میتواند probeها را به تأخیر بیندازد؛ در این صورت، timeout کوتاه باعث راهاندازی مجدد **تنها** نمونه میشود.                                                                                                                                                                                                                       |

**ماتریس probeها** (همچنین [توصیههای مربوط به probeهای Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) را ببینید):

| Probe         | هدف                                                     | استفاده نکنید از                                                                       |
| ------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Liveness      | TCP روی `PORT` (پیشفرض `20128`)، یا HTTP نرم `/healthz` | `/api/monitoring/health`                                                               |
| Readiness     | HTTP `GET /healthz`                                     | timeoutهای سختگیرانهای که مشغول بودن event loop را بهعنوان ازکارافتادگی در نظر میگیرند |
| عمیق / انسانی | `/api/monitoring/health`                                | liveness خودکار kubelet                                                                |

**ارتقاها:** انتظار داشته باشید اتصال تمام نشستها قطع شود. اگر میتوانید، کلاینتها را بهتدریج تخلیه کنید؛ با SQLite پیشفرض، rolling update وجود ندارد. ترکیب `restart: unless-stopped` در Compose با `HEALTHCHECK` در Docker نیز هنگامی که کانتینر در وضعیت Unhealthy قرار گیرد، تنها پردازش را جایگزین میکند — با همان دامنه اثر خرابی.

قطعه پیکربندی Kubernetes برای **یک نمونه** (`Recreate` الزامی است؛ هنگام استفاده از یک فایل SQLite، مقدار `replicas` را افزایش ندهید):

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

توقف `preStop` به kube فرصت میدهد پیش از SIGTERM، endpointهای Service را حذف کند تا ترافیک **جدید** دیگر به پردازشی که در حال خاتمه است ارسال نشود. SSE مربوط به `/v1/responses` که در حال اجراست، از طریق مجوزهای سنگینوزن پذیرش (#11015) تا سقف `SHUTDOWN_TIMEOUT_MS` (بهطور پیشفرض 30 ثانیه) تخلیه میشود. درخواستهای جدیدی که همچنان به پردازش میرسند، پاسخ `503` بههمراه `Retry-After: 5` دریافت میکنند. فاصله بدون endpoint در `Recreate` تا زمانی که جایگزین Ready شود، همچنان یک قطعی کامل است — این ویژگی توپولوژی SQLite است، نه پیکربندی نادرست probe.

دسترسپذیری بالای چندنویسندهای با Postgres خارجی، یک مسیر استاندارد و مستندشده **نیست**. اگر به دسترسپذیری بالا نیاز دارید، یک نمونه را حفظ کنید یا توپولوژیای را اجرا کنید که پروژه آن را آزمایش کرده و جداگانه مستند ساخته است. کار مربوط به Postgres/MySQL در [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) پیگیری میشود. تا زمانی که آن قابلیت منتشر شود، تنها روش پشتیبانیشده برای افزایش ظرفیت درخواستهای **بزرگ** `/v1/responses`، استفاده از N پردازش مستقل (بخش بعدی) است، نه `replicas > 1` روی یک volume.

## مقیاسافزایی افقی: N فرایند مستقل

یک فرایند Node برابر با **یک heap از V8** است. دو درخواست همپوشان عامل کدنویسی با اندازه حدود ~3 MiB / ~750k-token به `POST /v1/responses` (RTK + Caveman)، آن heap را در حدود ~12 Gi متوقف میکنند (`FATAL ERROR: Reached heap limit`) و میتوانند در یک cgroup با ظرفیت 16 Gi باعث OOM شوند. به [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) مراجعه کنید. این اندازهگیری یک هشدار درباره **بودجه حافظه** است، نه حداکثر سخت محصول برای دو درخواست طولانی همزمان به `/v1/responses`. پذیرش چتهای سنگین توسط بودجه بایت ورودی که بهطور خودکار محاسبه میشود (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، `src/shared/middleware/admissionBudget.ts`) کنترل میشود؛ این بودجه بر اساس همان سقف V8/cgroup تعیین میشود — افزایش دستی آن (یا تنظیم محدودیت قدیمی مبتنی بر تعداد درخواست یعنی `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) در فرایندی که از قبل اندازهگذاری شده است، دوباره موجب توقف میشود. چتهای کوچک، `/healthz`، `/v1/models` و MCP **مشمول** این محدودیت نیستند.

### یک فرایند: بیش از دو `/v1/responses` طولانی

یک فرایند **سالم** (با heap کمتر از `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`، با مقدار پیشفرض `0.75`) **ممکن است** بیش از دو درخواست طولانی همزمان `POST /v1/responses` را اجرا کند، بهشرط آنکه بودجه بایت درخواستهای در حال اجرای کل فرایند (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) همچنان ظرفیت داشته باشد. بدنههایی با اندازه برابر یا بیشتر از `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (بهطور پیشفرض 256 KiB)، همان مجوز سنگینوزن درخواستهای دارای ساختار پیچیده را دریافت میکنند و از همان مسیر گریز `tryAcquireHealthyHeadroom` در [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) استفاده میکنند. پشتیبانی از دهها کلاینت طولانی SSE بهصورت همزمان (اپراتورها اغلب به 40–50 مورد نیاز دارند) مسئلهای مربوط به **بودجه حافظه** است — heap، اسلاتهای اصلی/ظرفیت مازاد و `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` را متناسب تنظیم کنید — و نه یک محدودیت سخت محصول با عنوان «حداکثر 2». یک heap تحت فشار همچنان درخواستها را با `503` قابلتلاشمجدد کنار میگذارد تا مشکل #7849 بازنگردد.

برای **چندبرابر کردن heapها** (old-spaceهای مستقل V8) **در حال حاضر**:

| انجام دهید                                                                                                                                                                         | انجام ندهید                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **N کانتینر/pod** اجرا کنید که هرکدام `DATA_DIR` / volume **مجزای خود** را داشته باشند                                                                                             | برای یک فایل SQLite، مقدار `replicas > 1` تنظیم نکنید            |
| تعداد درخواستهای سنگین در حال اجرا و ظرفیت مازاد سالم را بر اساس بودجه heap / بایت درخواستهای در حال اجرا تعیین کنید؛ 1–2 مقدار پیشفرض محافظهکارانه #7849 است، نه حداکثر سخت محصول | به یک فرایند 8× RAM و محدودیت تعداد نامحدود اختصاص ندهید         |
| اختیاری: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` برای **شمارندههای سهمیه مشترک**                                                                                      | Redis را SQLite مشترک در نظر نگیرید — چنین نیست                  |
| اطلاعات محرمانه ارائهدهندگان را در هر نمونه کپی کنید (یا داشبوردهای تفکیکشده را بپذیرید)                                                                                           | انتظار یک داشبورد / گزارش تماس واحد میان نمونهها را نداشته باشید |
| هر load balancer دلخواهی را در جلوی نمونهها قرار دهید؛ sticky کردن بر اساس API key یا session کافی است                                                                             | به middleware مختص یک فروشنده و آگاه از اندازه نیاز ندارید       |

سختافزار: تعداد درخواستهای طولانی همزمان `/v1/responses` در هر نمونه، مسئلهای مربوط به **بودجه حافظه** است (heap + بایت درخواستهای در حال اجرا / #10110). تعداد `N` از `DATA_DIR`های مستقل همچنان heapها را چندبرابر میکند: RAM میزبان باید ظرفیت `N × cgroup` را پوشش دهد، نه «یک pod با ظرفیت 16 Gi و N=8». هرگز برای یک فایل SQLite مقدار `replicas > 1` تنظیم نکنید.

طرح نمونه Compose (دو heap، دو volume — نه `deploy.replicas: 2`):

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

چگالی درونفرایندی (با انتقال فشردهسازی به خارج از isolate مربوط به HTTP) در [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) پیگیری میشود. یک cluster منطقی واحد روی وضعیت پایدار مشترک در [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) پیگیری میشود.

## نکات مهم

- **حالت WAL در SQLite:** باید اجازه دهید `docker stop` کامل شود تا OmniRoute بتواند آخرین تغییرات را در `storage.sqlite` ثبت نهایی کند. فایلهای Compose ارائهشده از قبل مهلت توقف 40 ثانیهای را تنظیم کردهاند. اگر ایمیج را مستقیماً اجرا میکنید، گزینه `--stop-timeout 40` را حفظ کنید.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اگر پشتیبانگیریهای دورهای/پیش از نوشتن بهصورت خارجی مدیریت میشوند، آن را روی `true` تنظیم کنید. مهاجرت پایگاههای داده موجود همچنان به یک اسنپشات ایمنی ماندگار مختص خود و محافظ مهاجرت انبوه نیاز دارد.
- **ماندگاری دادهها:** همیشه یک volume را روی `/app/data` mount کنید تا پایگاه داده، کلیدها و پیکربندیهایتان در طول راهاندازیهای مجدد کانتینر حفظ شوند.
- **پیکربندی پورت:** برای تغییر پورت پیشفرض `20128`، متغیر محیطی `PORT` را بازنویسی کنید.

## همچنین ببینید

- [راهنمای استقرار ماشین مجازی](../ops/VM_DEPLOYMENT_GUIDE.md) — راهاندازی ماشین مجازی + nginx + Cloudflare
- [راهنمای استقرار Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — استقرار در Fly.io
- [پیکربندی محیط](../reference/ENVIRONMENT.md) — مرجع کامل `.env`
