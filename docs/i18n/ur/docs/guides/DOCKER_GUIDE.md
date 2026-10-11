# 🐳 Docker Guide — OmniRoute (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker کی تعیناتی کا مکمل حوالہ۔ فوری آغاز کے لیے [README کا Docker سیکشن](../README.md#-docker) دیکھیں۔

## فہرستِ مضامین

- [فوری طور پر چلائیں](#quick-run)
- [ماحولیاتی فائل کے ساتھ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [دستیاب پروفائلز](#available-profiles)
- [جب OmniRoute، Docker میں چل رہا ہو تو ہوسٹ کے CLI ٹولز کی تشکیل](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis سائیڈکار](#redis-sidecar)
- [پروڈکشن Compose](#production-compose)
- [Dockerfile کے مراحل](#dockerfile-stages)
- [اہم ماحولیاتی متغیرات](#critical-environment-variables)
- [Caddy (HTTPS) کے ساتھ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare فوری ٹنل](#cloudflare-quick-tunnel)
- [امیج ٹیگز](#image-tags)
- [دستیابی: ڈیفالٹ SQLite صرف ایک ریپلیکا تک محدود ہے](#availability-default-sqlite-is-single-replica)
- [Docker کے اندر Gemini کی علاقائی خرابیاں](#gemini-regional-errors-inside-docker)
- [اہم نوٹس](#important-notes)

---

## فوری طور پر چلائیں

> **ایک کمانڈ سے خود میزبانی کرنا چاہتے ہیں؟**  
> [خود میزبانی کی گائیڈ](../getting-started/SELF_HOST_GUIDE.md) دیکھیں —
> `docker compose -f docker-compose.selfhost.yml up -d` (شائع شدہ امیج +
> Redis، صرف loopback، پروفائل منتخب کرنے کی ضرورت نہیں)۔ ذیل میں دیا گیا فوری طریقہ
> ان صارفین کے لیے واحد کنٹینر والا راستہ ہے جو پہلے ہی کہیں اور Redis چلا رہے ہیں۔

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ماحولیاتی فائل کے ساتھ

```bash
# پہلے .env کو کاپی اور اس میں ترمیم کریں
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
# بنیادی پروفائل (CLI ٹولز کے بغیر)
docker compose --profile base up -d

# CLI پروفائل (Claude Code، Codex اور OpenClaw پہلے سے شامل ہیں)
docker compose --profile cli up -d

# ہوسٹ پروفائل (بنیادی طور پر Linux کے لیے؛ ہوسٹ کی CLI بائنریز کو صرف پڑھنے کے لیے ماؤنٹ کرتا ہے)
docker compose --profile host up -d

# ویب پروفائل (ویب سیشن فراہم کنندگان کے لیے Chromium/Playwright)
docker compose --profile web up -d

# CLI اور CLIProxyAPI سائیڈکار کو یکجا کریں
docker compose --profile cli --profile cliproxyapi up -d
```

## دستیاب پروفائلز

OmniRoute تعیناتی کی اہم اقسام کے لیے Compose پروفائلز کے ساتھ آتا ہے۔ وہ پروفائل منتخب کریں جو آپ کے ماحول سے مطابقت رکھتا ہو۔

| پروفائل         | سروس             | کب استعمال کریں                                                                                                                                     | کمانڈ                                        |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ڈیفالٹ) | `omniroute-base` | ہیڈلیس سرور / کم سے کم رن ٹائم، فراہم کنندگان کے CLIs شامل نہیں ہوتے                                                                                | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | ایجنٹ پر مبنی ورک فلوز جو `omniroute providers/setup/doctor` اور شامل شدہ CLIs (Codex، Claude Code، Droid، OpenClaw) کو کال کرتے ہیں                | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | ایسے Linux ہوسٹس جنہیں `~/.local/bin`، `~/.codex`، `~/.claude` وغیرہ کو صرف پڑھنے کے لیے ماؤنٹ کرکے ہوسٹ CLIs تک `network_mode` جیسی رسائی درکار ہو | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | اپ اسٹریم CLI پراکسی کے لیے پورٹ `8317` پر [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) سائیڈکار چلائیں                              | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | وہ ویب سیشن فراہم کنندگان جنہیں براؤزر درکار ہو: `gemini-web`، `claude-web`، `claude-turnstile` (`runner-web` بناتا ہے، Chromium شامل ہے)           | `docker compose --profile web up -d`         |

> متعدد پروفائلز کو یکجا کیا جا سکتا ہے: `docker compose --profile cli --profile cliproxyapi up -d`۔

## جب OmniRoute Docker میں چل رہا ہو تو host CLI ٹولز کی ترتیب

`omniroute setup-codex`، `setup-claude`، `config set <tool>` اور dashboard کا
**ترتیب محفوظ کریں** بٹن، سبھی `~/.codex/*.config.toml` جیسی فائلیں لکھتے ہیں۔ ان paths
کا مطلب صرف اسی مشین پر ہوتا ہے جہاں CLI حقیقتاً چلتا ہے۔ انہیں container کے اندر
چلانے سے فائل container کے اپنے home (`/home/node` —
image، `USER node` کے طور پر چلتی ہے) میں لکھی جاتی ہے، جہاں host کا کوئی CLI اسے کبھی
نہیں پڑھے گا اور container دوبارہ بنائے جانے کے ساتھ ہی یہ ضائع ہو جائے گی۔

OmniRoute اس صورتِ حال کا پتہ لگا لیتا ہے اور ایسی کامیابی کی اطلاع دینے کے بجائے، جسے
آپ استعمال نہیں کر سکتے، ہدایات کے ساتھ فائل لکھنے سے انکار کر دیتا ہے: CLI، `2` کے ساتھ
بند ہو جاتا ہے، اور API، `containerEphemeralTarget: true` کے ساتھ `422` کا جواب دیتی ہے۔

### تجویز کردہ طریقہ: CLI کو host پر اور OmniRoute کو Docker میں چلائیں

container، API فراہم کرتا ہے؛ CLI آپ کے host ٹولز کی ترتیب کرتا ہے۔

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI کو container کی طرف بھیجیں
omniroute setup-codex                      # آپ کے host پر حقیقی ~/.codex لکھتا ہے
```

جب Codex، Claude Code، Cursor یا اس جیسے ٹولز آپ کے laptop پر چل رہے ہوں تو یہی درست
انتخاب ہے — اور عام طور پر ترتیب بھی یہی ہوتی ہے۔

### متبادل: host کی config dirs کو bind-mount کریں (`host` profile)

اگر آپ چاہتے ہیں کہ container خود آپ کی host config لکھے، تو directories کو mount
کریں اور `CLI_CONFIG_HOME` کو mount root پر متعین کریں۔ `host` profile میں یہ پہلے سے
موجود ہے:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ہی path کو قابلِ اعتماد بناتا ہے: OmniRoute،
`/proc/self/mountinfo` پڑھتا ہے اور mounted paths (اور ان directories
میں بھی جن کے children mounts ہوں، جو اوپر دی گئی `/host-home` ساخت کے عین مطابق ہے)
پر لکھنے کی اجازت دیتا ہے، جبکہ unmounted paths پر لکھنے سے بدستور انکار کرتا ہے۔

### آخری متبادل: container کے اپنے CLIs کی ترتیب کریں (احتیاط سے استعمال کریں)

جب CLIs واقعی container کے اندر موجود ہوں (`cli` profile)، تو فائل لکھنا
دانستہ عمل ہوتا ہے۔ کسی بھی `setup-*` command کو `--allow-container-write` دیں، یا server
کے لیے `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` متعین کریں۔ فائل ایک انتباہ کے
ساتھ لکھی جائے گی کہ وہ container کے بعد برقرار نہیں رہے گی۔

> **سیکیورٹی انتباہ — `cli` profile + `docker.sock` mount۔**
> `cli` profile، `/var/run/docker.sock` کو bind-mount کرتا ہے تاکہ container کے اندر
> موجود auto-updater، host daemon سے stack دوبارہ بنا سکے
> (`src/lib/system/autoUpdate.ts` اس socket کو تلاش کرتا ہے اور اس کی عدم موجودگی میں
> Docker path کو چھوڑ دیتا ہے)۔ یہ socket **host-root اعتماد کی حد
> ہے**: اس تک رسائی رکھنے والی کوئی بھی چیز، host Docker daemon کو
> root کے طور پر چلا سکتی ہے — یہ host پر موجود کسی بھی container کو بنا، معائنہ کر،
> روک اور حذف کر سکتی ہے۔
> نتائج:
>
> 1. **`cli` profile کا port کبھی بھی network کے سامنے ظاہر نہ کریں۔** اسے
>    `127.0.0.1` پر publish کریں (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN سے قابلِ رسائی `cli` profile، dashboard کی سطح کی کسی بھی RCE کو
>    host پر مکمل قبضے میں بدل دیتی ہے۔
> 2. **`cli` profile میں host کی کوئی اضافی directory bind نہ کریں۔**
>    Docker socket کے ساتھ کوئی بھی اضافی mount، container کو آپ کے filesystem
>    اور host config تک مکمل پڑھنے/لکھنے کی رسائی دے دیتا ہے۔ اگر کسی ٹول کو
>    project دیکھنے کی ضرورت ہو، تو اسے CLI binary کے ساتھ مقامی طور پر چلائیں — اسے
>    `cli` container میں mount نہ کریں۔
>
> اگر آپ کو container کے اندر auto-update کی ضرورت نہیں، تو `cli` profile کو بند رکھیں
> (`COMPOSE_PROFILES=core,redis` یا اس سے مختصر)۔ دیگر profiles،
> Docker socket کو mount نہیں کرتے۔
>
> MITM سے متعلق threat model کے لیے `docs/security/MITM-TPROXY-DECRYPT.md` دیکھیں (git میں؛ `/docs` میں compile نہیں کی گئی)،
> اور `codex`/`claude-code`/`droid`/`openclaw` binary provenance chain کے لیے
> `docs/security/SUPPLY_CHAIN.md` دیکھیں۔

## Redis سائیڈ کار

OmniRoute تقسیم شدہ ریٹ لمیٹر اور مشترکہ کیش کے لیے Redis پر انحصار کرتا ہے۔ `redis` سروس `docker-compose.yml` میں **ہمیشہ متعین ہوتی ہے** (اس پر کوئی پروفائل پابندی نہیں) اور کسی بھی دوسرے پروفائل کے ساتھ شروع ہو جاتی ہے۔

| تفصیل                   | قدر                                    |
| ----------------------- | -------------------------------------- |
| امیج                    | `redis:7-alpine`                       |
| کنٹینر کا نام           | `omniroute-redis`                      |
| اندرونی پورٹ            | `6379`                                 |
| ہوسٹ پورٹ (اوور رائیڈ)  | `REDIS_PORT` (ڈیفالٹ `6379`)           |
| ہوسٹ بائنڈ (اوور رائیڈ) | `REDIS_BIND_HOST` (ڈیفالٹ `127.0.0.1`) |
| والیوم                  | `omniroute-redis-data` → `/data`       |
| صحت کی جانچ             | `redis-cli ping` (10s وقفہ)            |

متعلقہ ماحول کے متغیرات:

- `REDIS_URL` — ایپ میں شامل کی جانے والی کنکشن اسٹرنگ (ڈیفالٹ `redis://redis:6379`)۔
- `REDIS_PORT` — Redis کنٹینر کے لیے ہوسٹ سائیڈ پورٹ میپنگ۔
- `REDIS_BIND_HOST` — وہ ہوسٹ انٹرفیس جس پر پورٹ شائع کی جاتی ہے۔ ڈیفالٹ `127.0.0.1` ہے۔

> **ڈیفالٹ طور پر لوپ بیک کیوں:** سائیڈ کار `requirepass` کے بغیر چلتا ہے، اور ایپ
> کنٹینرز کمپوز نیٹ ورک (`redis:6379`) کے ذریعے اس تک پہنچتے ہیں — شائع شدہ پورٹ
> صرف ہوسٹ سائیڈ ٹولنگ (`redis-cli`، ایک مقامی `npm run dev`) کے لیے ہے۔ اسے
> `0.0.0.0` پر شائع کرنے سے ایک غیر تصدیق شدہ Redis آپ کے LAN پر موجود ہر ہوسٹ کے
> لیے قابل رسائی ہو جائے گا۔ اگر آپ `REDIS_BIND_HOST=0.0.0.0` مقرر کریں تو سروس کے
> `command:` میں `--requirepass` بھی شامل کریں۔

**Redis کو غیر فعال کرنا** تجویز نہیں کیا جاتا (ریٹ لمیٹر اِن میموری فال بیک پر تنزل کر جائے گا)۔ اگر ایسا کرنا ضروری ہو، تو `docker-compose.yml` میں موجود `redis:` سروس بلاک کو ہٹا دیں/کمنٹ کر دیں یا اسے صفر تک اسکیل کر دیں:

```bash
docker compose up -d --scale redis=0
```

## پروڈکشن کمپوز

ڈیولپمنٹ کے ساتھ چلنے والے ایک الگ تھلگ پروڈکشن اسنیپ شاٹ کے لیے `docker-compose.prod.yml` استعمال کریں۔

| تفصیل                | قدر                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| فائل                 | `docker-compose.prod.yml`                                                                        |
| ڈیفالٹ ڈیش بورڈ پورٹ | `PROD_DASHBOARD_PORT=20130` (اندرونی `${DASHBOARD_PORT:-20128}` سے میپ شدہ)                      |
| ڈیفالٹ API پورٹ      | `PROD_API_PORT=20131`                                                                            |
| امیج                 | `omniroute:prod` (`runner-cli` ٹارگٹ سے تیار کردہ)                                               |
| Redis کنٹینر         | `omniroute-redis-prod` (`redis:8.6.2`، مخصوص `redis-prod-data` والیوم)                           |
| ڈیٹا والیوم          | `omniroute-prod-data` (نام زدہ، دوبارہ بلڈ کرنے کے بعد بھی برقرار رہتا ہے)                       |
| صحت کی جانچیں        | `node healthcheck.mjs` + `redis-cli ping`، جبکہ `depends_on` کو Redis کی صحت سے مشروط کیا گیا ہے |

استعمال کا طریقہ:

```bash
# پروڈکشن اسٹیک بلڈ اور شروع کریں
docker compose -f docker-compose.prod.yml up -d --build

# لاگز کو مسلسل دکھائیں
docker compose -f docker-compose.prod.yml logs -f

# بند کریں (والیومز برقرار رکھیں)
docker compose -f docker-compose.prod.yml down
```

پروڈکشن اسٹیک ڈیولپمنٹ کمپوز کے متوازی چلتا ہے (کنٹینرز کے نام، پورٹس اور والیومز مختلف ہیں)، اس لیے پروڈکشن کو چالو رکھتے ہوئے آپ مقامی طور پر کام جاری رکھ سکتے ہیں۔

## Dockerfile کے مراحل

ریپوزٹری ایک multi-stage Dockerfile (`Dockerfile`) کے ساتھ آتی ہے۔ چار مراحل دستیاب ہیں؛ اپنے استعمال کے مطابق درست `target` منتخب کریں۔

| مرحلہ         | بنیادی امیج           | مقصد                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | dependencies انسٹال کرتا ہے (`npm ci --legacy-peer-deps`) اور `npm run build` چلاتا ہے (بطور ڈیفالٹ Turbopack — ذیل میں تعمیر کے وقت کے وسائل دیکھیں)                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Next.js کے standalone output کے ساتھ production runtime۔ **کوئی provider CLI شامل نہیں ہے۔**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | `git`، `docker.io`، `docker-compose` اور global CLIs شامل کرتا ہے: `@openai/codex`، `@anthropic-ai/claude-code`، `droid`، `openclaw`۔ **agentic workflows کے لیے اسے منتخب کریں۔**                                                                                                                 |
| `runner-web`  | `runner-base`         | web-session providers کے لیے Playwright اور Chromium browser (`--with-deps`) شامل کرتا ہے: `gemini-web`، `claude-web`، `claude-turnstile`۔ **ان providers کو استعمال کرتے وقت اسے منتخب کریں** — اس کے بغیر سادہ امیج request کے وقت ناکام ہو جاتی ہے (Release Channels کے تحت `-web` نوٹ دیکھیں)۔ |

کسی مخصوص target کو دستی طور پر build کریں:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### تعمیر کے وقت کے وسائل

تین build args یہ کنٹرول کرتے ہیں کہ `builder` مرحلہ کتنے وسائل استعمال کرتا ہے۔ یہ صرف build-time کے لیے ہیں —
`OMNIROUTE_MEMORY_MB` (ذیل میں) runtime کے لیے ایک الگ کنٹرول ہے۔

| Build arg                   | ڈیفالٹ | اثر                                                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` webpack کے ساتھ build کرتا ہے: زیادہ سے زیادہ memory کم، مگر رفتار سست۔ `1` Turbopack کو فعال کرتا ہے۔   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | شروع کیے گئے `next build` کے لیے V8 heap کی حد (`--max-old-space-size`)۔                                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL` کو قدر فراہم کرتا ہے؛ Next صفحے کے data collection کے لیے `workers = N - 1` اخذ کرتا ہے۔ |

بڑے builder پر `OMNIROUTE_BUILD_WORKERS` ہی وہ قدر ہے جسے بڑھانا چاہیے، اور جب محدود وسائل والا build، `✓ Compiled successfully` کے **بعد** بند ہو جائے تو سب سے پہلے اسی پر شبہ کرنا چاہیے۔ ہر
page-data worker ایک الگ process ہوتا ہے، اور اصل `next build` بھی خود
ایک الگ process ہے؛ ایک حقیقی VPS reproduction (issue #7518) میں ہر process کا
زیادہ سے زیادہ RSS تقریباً ~4.5 GB ناپا گیا، جو `NODE_OPTIONS` heap flag سے
آزاد تھا (Turbopack، V8 heap سے باہر native/Rust memory میں compile کرتا ہے)۔
`2` کی ڈیفالٹ قدر (→ 1 worker، مجموعی طور پر 2 processes) ان 16 GB / 4 vCPU
GitHub-hosted runners کے مطابق رکھی گئی ہے جنہیں publish pipeline استعمال کرتی ہے۔
`8` پر (→ 7 workers) اس runner کی memory ختم ہو گئی اور buildkit نے
`ResourceExhausted: ... cannot allocate memory` کے ساتھ مرحلہ ناکام کر دیا؛
`3` (→ 2 workers) بھی اس وقت کافی نہیں تھا جب فی process RSS کو قیاس کرنے کے بجائے
براہِ راست ناپا گیا۔ `tests/unit/docker-build-memory-budget.test.ts`
ناپی گئی قدر کے مقابلے میں حساب کرتا ہے اور اگر کوئی بھی knob
runner کی گنجائش سے بڑھ جائے تو ناکام ہو جاتا ہے۔

Turbopack ایسی native Rust memory میں compile کرتا ہے جو V8 heap کے **باہر** ہوتی ہے، اس لیے
`OMNIROUTE_BUILD_MEMORY_MB` اسے محدود نہیں کرتا۔ memory کی حد والے host پر
OOM killer، build کو کسی بھی error text کے بغیر SIGKILL کر دیتا ہے — یہ بس
`Creating an optimized production build` کے درمیان رک جاتا ہے، جس سے یہ
out-of-memory کے بجائے hang محسوس ہوتا ہے۔ اسی وجہ سے `Dockerfile` بطور ڈیفالٹ webpack
(`OMNIROUTE_USE_TURBOPACK=0`) استعمال کرتا ہے، برخلاف `npm run dev` / `npm run build` کے، جہاں
code کا ڈیفالٹ Turbopack ہے: کسی build arg کے بغیر سادہ `docker build .` (جسے
Railway اور دیگر one-click hosts چلاتے ہیں) memory-capped builder پر خاموشی سے
ختم نہیں ہونا چاہیے۔ شائع شدہ images پہلے ہی `docker-publish.yml` میں
`OMNIROUTE_USE_TURBOPACK=0` واضح طور پر فراہم کرتی ہیں۔ کافی RAM والے builder پر
زیادہ تیز build کے لیے Turbopack فعال کریں:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` فعال ہے، اس لیے `next build` ایک parent **اور** ایک worker
process چلاتا ہے اور دونوں الگ الگ `OMNIROUTE_BUILD_MEMORY_MB` کی پابندی کرتے ہیں۔ container
کی حد کو اس قدر کے تقریباً دو گنا سے زیادہ رکھیں، صرف ایک گنا نہیں۔

اس tree پر پیمائش (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container کی حد | نتیجہ                                       |
| --------- | --------------- | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | دونوں پر OOM کے باعث خاموشی سے ختم ہو گیا   |
| webpack   | 8 GiB           | build worker کو SIGKILL کر دیا گیا          |
| webpack   | 12 GiB          | کامیاب، زیادہ سے زیادہ استعمال 11.1 GiB رہا |

### Runtime کی ڈیفالٹ اقدار

`runner-base` کے ذریعے export کی جانے والی ڈیفالٹ اقدار: `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`۔

Docker میں memory کا رویہ:

- امیج `OMNIROUTE_MEMORY_MB=1024` سیٹ کرتی ہے اور اس سے `NODE_OPTIONS=--max-old-space-size=1024` اخذ کرتی ہے۔
- اصل سرور پراسیس standalone launcher کے ذریعے شروع کیا جاتا ہے، جو `OMNIROUTE_MEMORY_MB` پڑھتا ہے اور `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` شامل کرتا ہے۔
- Node بار بار دی گئی آخری `--max-old-space-size` ویلیو استعمال کرتا ہے، لہٰذا `OMNIROUTE_MEMORY_MB` سیٹ کرنے سے مؤثر Docker heap کی حد کنٹرول ہوتی ہے۔
- چونکہ امیج اسے ہمیشہ سیٹ کرتی ہے، اس لیے Docker کے تحت launcher کا اپنا RAM کے مطابق کیلیبریٹ کیا گیا fallback کبھی لاگو نہیں ہوتا۔ کام کے بوجھ کے لیے اسے واضح طور پر بڑھائیں (نیچے دی گئی جدول)۔ coding-agent کے `/v1/responses` کے لیے `2048` اب بھی بہت کم ہے۔

### کوڈنگ ایجنٹس کے لیے رن ٹائم RAM

1 GiB کی Docker ڈیفالٹ حد ڈیش بورڈ/ہلکی چیٹ کے لیے کم از کم سطح ہے، پروڈکشن سائز نہیں۔ طویل `POST /v1/responses` باڈیز (سیکڑوں پیغامات، درجنوں ٹولز) کمپریشن کے دوران متعدد in-memory graphs برقرار رکھتی ہیں۔ ایک دوسرے کے ساتھ چلنے والی تقریباً 3 MiB / تقریباً 750k-token کی دو درخواستوں نے **12 GiB** old-space پر V8 کو abort کر دیا ہے (`FATAL ERROR: Reached heap limit`) اور 16 GiB cgroup OOM سے بھی ٹکرائی ہیں۔ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) دیکھیں۔

**cgroup `--memory` کو heap سے زیادہ رکھیں** — native buffers، SQLite، اور کمپریشن کے درمیانی ڈیٹا V8 سے باہر ہوتے ہیں۔

| کام کا بوجھ                         | `OMNIROUTE_MEMORY_MB`   | کنٹینر / cgroup     | نوٹس                                                                                            |
| ----------------------------------- | ----------------------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| ڈیش بورڈ، ایک ہلکی چیٹ              | `1024` (امیج ڈیفالٹ)    | ≥2 GiB              |                                                                                                 |
| ایک کوڈنگ ایجنٹ (Claude/Codex/Grok) | `8192`                  | ≥10 GiB             | عام سنگل سیشن `/v1/responses`                                                                   |
| دو بیک وقت طویل `/v1/responses`     | `10240`–`12288`         | ≥12–16 GiB          | تقریباً 12 GiB heap پر V8 abort کی پیمائش کی گئی                                                |
| تین یا زیادہ بیک وقت طویل contexts  | ایک پراسیس پر نہ چلائیں | سیریلائز / مزید RAM | ڈیفالٹ heavyweight admission میں 1 in-flight ہے؛ RAM کے بغیر اسے بڑھانے سے abort دوبارہ ہوتا ہے |

bare metal پر `omniroute serve`، جب `OMNIROUTE_MEMORY_MB` **سیٹ نہ ہو**، RAM کے تقریباً 35% کے مطابق کیلیبریٹ کرتا ہے (جسے `[512, 4096]` تک محدود رکھا جاتا ہے)۔ Docker ہمیشہ `1024` سیٹ کرتا ہے، اس لیے آفیشل امیج میں یہ کیلیبریشن کبھی نہیں چلتی۔

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## اہم ماحولیاتی متغیرات

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) میں دستاویزی طے شدہ اقدار کے علاوہ، Docker کے تحت چلاتے وقت درج ذیل متغیرات سب سے زیادہ اہم ہیں:

| متغیر                         | مقصد                                                                                                                                                                                                                                                                               | طے شدہ قدر                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket برج کے لیے مشترکہ راز۔ **پروڈکشن میں درکار ہے** — اسے ایک مضبوط بے ترتیب اسٹرنگ پر سیٹ کریں۔                                                                                                                                                                             | غیر سیٹ شدہ (فراہم کرنا ضروری ہے) |
| `REDIS_URL`                   | ریٹ لمیٹر / کیش بیک اینڈ کے لیے کنکشن اسٹرنگ                                                                                                                                                                                                                                       | `redis://redis:6379`              |
| `REDIS_PORT`                  | شامل کردہ Redis کنٹینر کے لیے ہوسٹ سائیڈ پورٹ                                                                                                                                                                                                                                      | `6379`                            |
| `REDIS_BIND_HOST`             | وہ ہوسٹ انٹرفیس جس پر شامل کردہ Redis پورٹ شائع کی جاتی ہے (جب تک آپ AUTH شامل نہ کریں، لوپ بیک)                                                                                                                                                                                   | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | خودکار اپ ڈیٹ ورک فلوز کے لیے `/workspace/omniroute` پر `cli` پروفائل میں ماؤنٹ کیا گیا ہوسٹ پاتھ                                                                                                                                                                                  | `.` (موجودہ ڈائریکٹری)            |
| `OMNIROUTE_MEMORY_MB`         | Docker اسٹینڈ الون سرور کے لیے رن ٹائم Node ہیپ کی بالائی حد؛ یہ اوپر دی گئی امیج کی طے شدہ قدر کو اوور رائیڈ کرتی ہے۔ کوڈنگ ایجنٹس: `8192`+ ([رن ٹائم RAM](#runtime-ram-for-coding-agents) دیکھیں)۔                                                                               | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | ڈیش بورڈ (20128) اور API (20129) کے لیے ظاہر کردہ پورٹس کو اوور رائیڈ کریں                                                                                                                                                                                                         | `20128` / `20129`                 |
| `APP_BIND_HOST`               | وہ ہوسٹ انٹرفیس جس پر docker-compose ڈیش بورڈ/API/live-WS پورٹس شائع کرتا ہے۔ `REQUIRE_API_KEY=false` (طے شدہ قدر) کے ساتھ، `0.0.0.0` گمنام `/v1` پراکسی کو LAN کے لیے ظاہر کرتا ہے — اسے صرف `REQUIRE_API_KEY=true` کے ساتھ یا آگے ریورس پراکسی موجود ہونے کی صورت میں وسیع کریں۔ | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | وہ ہوسٹ انٹرفیس جس پر docker-compose، `cliproxyapi` سائیڈ کار شائع کرتا ہے — اس کا ڈیٹا والیوم فراہم کنندہ کی اسناد رکھتا ہے۔                                                                                                                                                      | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | وہ ڈائریکٹری جسے رن ٹائم پلگ اِن اسکینر پڑھتا ہے اور جس میں انسٹال کرتا ہے۔ جب پلگ اِنز bind-mounted ہوں تو اسے سیٹ کریں: طے شدہ قدر `HOME` کی پیروی کرتی ہے، جسے کسی امیج کے لیے ایکسپورٹ کرنا ضروری نہیں۔                                                                        | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | جب ایپ ریورس پراکسی کے پیچھے شائع کی جائے تو URL ذیلی پاتھ (مثلاً `/omniroute`)                                                                                                                                                                                                    | _(خالی = روٹ)_                    |
| `NEXT_PUBLIC_BASE_URL`        | ذیلی پاتھ سمیت عوامی براؤزر اوریجن (مثلاً `https://host/omniroute`)                                                                                                                                                                                                                | غیر سیٹ شدہ                       |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` کے لیے ہوسٹ سائیڈ ڈیش بورڈ پورٹ                                                                                                                                                                                                                          | `20130`                           |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` سائیڈ کار کے لیے ہوسٹ سائیڈ پورٹ                                                                                                                                                                                                                                     | `8317`                            |

## ذیلی راستے پر ریورس پراکسی (Traefik / nginx)

Next.js کا `basePath` اسٹینڈ الون بنڈل میں کمپائل کیا جاتا ہے۔ OmniRoute ایپ روٹ پر ایک sentinel فائل میں پہلے سے شامل شدہ قدر ریکارڈ کرتا ہے (`npm run build` کے دوران لکھی جاتی ہے؛
`scripts/docker/ensure-docker-base-path.mjs` کے ذریعے پڑھی جاتی ہے) اور کنٹینر شروع ہونے پر اس کا
`OMNIROUTE_BASE_PATH` سے موازنہ کرتا ہے۔ جب یہ مختلف ہوں اور امیج ڈومین روٹ کے لیے
بنائی گئی ہو، تو entrypoint اسٹینڈ الون manifests، شامل شدہ
`basePath`/`assetPrefix` literals (Next 16 صرف `assetPrefix` سے SSR اثاثوں کے URLs رینڈر کرتا ہے — patcher ذیلی راستے کو بھی اس میں نقل کرتا ہے)، پہلے سے شامل شدہ
`/_next/static` اثاثوں کے URLs (client-reference manifests، میڈیا imports، پہلے سے رینڈر شدہ
خرابی کے صفحات) اور کلائنٹ `process.env` shim کو `node dev/run-standalone.mjs`
چلنے سے پہلے دوبارہ لکھتا ہے۔

### Compose بلڈ (تجویز کردہ)

دونوں متغیرات `.env` میں سیٹ کریں، پھر دوبارہ بلڈ کریں تاکہ امیج اور runtime مطابقت میں ہوں:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`، `OMNIROUTE_BASE_PATH` کو Docker build-arg اور
runtime environment variable دونوں کے طور پر فارورڈ کرتا ہے۔

### پہلے سے بنائی گئی روٹ امیج + runtime ذیلی راستہ

شائع شدہ `diegosouzapw/omniroute:*` امیجز ڈومین روٹ کے لیے بنائی گئی ہیں۔ آپ پھر بھی
runtime پر `OMNIROUTE_BASE_PATH` سیٹ کر سکتے ہیں؛ کنٹینر آغاز کے وقت بنڈل کو ایک بار patch کرتا ہے۔
اس کے ساتھ مماثل public origin فراہم کریں:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ریورس پراکسی کو **مکمل** بیرونی راستہ فارورڈ کرنے کے لیے ترتیب دیں (prefix نہ ہٹائیں)۔
Traefik کو `PathPrefix(`/omniroute`)` کو `StripPrefix` کے بغیر کنٹینر کی طرف روٹ کرنا چاہیے،
تاکہ Next.js کو `/omniroute/...` موصول ہو اور وہ اثاثے
`/omniroute/_next/...` سے فراہم کرے۔

Docker healthcheck، فعال `OMNIROUTE_BASE_PATH` کے prefix کے ساتھ ہلکے پھلکے
`/healthz` lifecycle endpoint کو probe کرتا ہے۔ `/api/monitoring/health` انسانی/dashboard
تشخیص کے لیے دستیاب رہتا ہے؛ کنٹینر HEALTHCHECK کو دوبارہ اس کی طرف بھیجنے کے لیے (مثلاً
گہری صحت کی جانچ نافذ کرنے کی خاطر)، `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`
سیٹ کریں۔ یہ راستہ ایک **گہری** جانچ ہے (DB + monitoring summary) — اگر آپ دوبارہ اسے فعال
کرنے کا انتخاب کریں تو Docker کے کم وقفے سے چلنے والے `HEALTHCHECK` کے لیے موزوں ہے، لیکن
Kubernetes کے `livenessProbe` وقفوں کے لیے **نہیں**۔

orchestrators (Kubernetes، Nomad، وغیرہ) کے لیے:

| Probe           | ترجیح دیں                                                        | اجتناب کریں                                             |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`، یا مرکزی پورٹ (`PORT`، ڈیفالٹ `20128`) پر TCP | liveness کے طور پر `/api/monitoring/health`             |
| Readiness       | HTTP `GET /healthz`                                              | سخت timeouts جو event-loop کے مصروف ہونے کو مردہ سمجھیں |
| Deep / blackbox | `/api/monitoring/health`                                         | —                                                       |

`/healthz` پراسیس lifecycle (`ok` / `starting` / `stopping`) رپورٹ کرتا ہے۔ `/livez`
صرف پراسیس کے زندہ ہونے کی جانچ ہے (جب بھی handler چل سکے تو 200؛ یہ
readiness کا انتظار نہیں کرتا)۔ دونوں اب بھی request handling والے اسی Node event loop پر
چلتے ہیں، اس لیے CPU-bound catalog یا compression کا کام انہیں مؤخر کر سکتا ہے — مصروف ≠ مردہ۔
اگر HTTP probes کا وقت ختم ہو جائے تو TCP liveness کو ترجیح دیں۔ probes کی مکمل رہنمائی:
[Monitoring گائیڈ — Kubernetes probe کی سفارشات](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)۔

## Caddy کے ساتھ Docker Compose (HTTPS Auto-TLS)

OmniRoute کو Caddy کی خودکار SSL فراہمی کے ذریعے محفوظ طریقے سے دستیاب کیا جا سکتا ہے۔ یقینی بنائیں کہ آپ کے ڈومین کا DNS A ریکارڈ آپ کے سرور کے IP کی طرف اشارہ کرتا ہے۔

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
      # OAuth کال بیکس، ڈیش بورڈ لنکس، اور تیار کردہ عوامی URLs کے لیے براؤزر کو نظر آنے والا origin۔
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # شیڈول شدہ جابز / self-fetches کے لیے اندرونی سرور-ٹو-سرور URL۔
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

Caddy upstream کنٹینر کے لیے معیاری فارورڈنگ ہیڈرز سیٹ کرتا ہے۔ OmniRoute، OAuth کال بیکس اور تیار کردہ عوامی لنکس کے لیے
`NEXT_PUBLIC_BASE_URL` کو canonical عوامی origin کے طور پر استعمال کرتا ہے؛ تصدیق شدہ ڈیش بورڈ رائٹس، سیشن سے منسلک CSRF
تحفظ کے ساتھ same-origin درخواستیں استعمال کرتی ہیں۔ `OMNIROUTE_TRUST_PROXY` کو صرف ان جدید تعیناتیوں کے لیے فعال کریں جہاں آپ جان بوجھ کر
چاہتے ہوں کہ OmniRoute واضح کنفیگریشن کے بجائے قابلِ اعتماد فارورڈ شدہ ہیڈرز سے عوامی origin اخذ کرے۔

## Cloudflare Quick Tunnel

Docker تعیناتیوں کے لیے ڈیش بورڈ سپورٹ میں `Dashboard → Endpoints` پر ایک کلک والا **Cloudflare Quick Tunnel** شامل ہے۔ پہلی مرتبہ فعال کرنے پر `cloudflared` صرف ضرورت کے وقت ڈاؤن لوڈ ہوتا ہے، آپ کے موجودہ `/v1` endpoint تک ایک عارضی tunnel شروع کرتا ہے، اور تیار کردہ `https://*.trycloudflare.com/v1` URL کو براہِ راست آپ کے معمول کے عوامی URL کے نیچے دکھاتا ہے۔

Endpoint tunnel پینلز (Cloudflare، Tailscale، ngrok) کو فعال tunnel کی حالت تبدیل کیے بغیر `Settings → Appearance` سے دکھایا یا چھپایا جا سکتا ہے۔

### Tunnel سے متعلق نوٹس

- Quick Tunnel URLs عارضی ہوتے ہیں اور ہر restart کے بعد تبدیل ہو جاتے ہیں۔
- OmniRoute یا کنٹینر کے restart کے بعد Quick Tunnels خودکار طور پر بحال نہیں ہوتے۔ ضرورت پڑنے پر انہیں ڈیش بورڈ سے دوبارہ فعال کریں۔
- منظم انسٹالیشن فی الحال `x64` / `arm64` پر Linux، macOS، اور Windows کو سپورٹ کرتی ہے۔
- محدود کنٹینر ماحول میں شور پیدا کرنے والی QUIC UDP بفر وارننگز سے بچنے کے لیے، منظم Quick Tunnels بطور ڈیفالٹ HTTP/2 ٹرانسپورٹ استعمال کرتے ہیں۔ اگر آپ مختلف ٹرانسپورٹ چاہتے ہیں تو `CLOUDFLARED_PROTOCOL=quic` یا `auto` سیٹ کریں۔
- Docker امیجز میں سسٹم CA roots شامل ہوتے ہیں اور انہیں منظم `cloudflared` تک پہنچایا جاتا ہے، جس سے کنٹینر کے اندر tunnel شروع ہوتے وقت TLS اعتماد کی ناکامیاں نہیں ہوتیں۔
- اگر آپ چاہتے ہیں کہ OmniRoute کسی بائنری کو ڈاؤن لوڈ کرنے کے بجائے موجودہ بائنری استعمال کرے تو `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` سیٹ کریں۔

## Image Tags

| Image                    | Tag      | سائز   | وضاحت                                                    |
| ------------------------ | -------- | ------ | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | سب سے زیادہ **شائع شدہ** مستحکم SemVer (git `main` نہیں) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps کے لیے اس قسم کے tag کو pin کریں                  |

ملٹی پلیٹ فارم manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon، AWS Graviton، Raspberry Pi)۔ Docker خودکار طور پر مماثل architecture منتخب کرتا ہے؛ اگر آپ کو ARM hosts پر AMD64 emulation لازماً استعمال کرنی ہو تو `--platform linux/amd64` فراہم کریں۔

### Release Channels

OmniRoute مستحکم releases، فعال release-branch ٹیسٹنگ، اور development builds کے لیے الگ Docker channels شائع کرتا ہے۔

| Channel                         | ماخذ                                   | تغیر پذیری                     | تجویز کردہ استعمال                                                                                                                  |
| ------------------------------- | -------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | دستخط شدہ/versioned release            | ناقابلِ تغیر                   | Production تعیناتیاں جو کسی عین release کو pin کرتی ہیں                                                                             |
| `:latest` / `:latest-web`       | سب سے زیادہ **شائع شدہ** مستحکم SemVer | قابلِ تغیر مستحکم pointer      | SemVer publish job کے **بعد** مستحکم releases کی پیروی کرتا ہے — `main` یا غیر جاری شدہ `release/v*` commits کو track **نہیں** کرتا |
| `:next` / `:next-web`           | موجودہ ڈیفالٹ `release/v*` branch      | قابلِ تغیر pre-release pointer | ان fixes کی جانچ جو فعال release branch پر آ چکی ہیں لیکن ابھی مستحکم release میں شامل نہیں                                         |
| `:main` / `:main-web`           | `main` branch                          | قابلِ تغیر development pointer | صرف development اور integration testing کے لیے                                                                                      |

#### Web-session providers: `-web` امیجز

اوپر موجود ہر channel ایک `-web` tag (`:latest-web`، `:<version>-web`، `:next-web`، `:main-web`) کے طور پر بھی دستیاب ہے، جسے `runner-web` stage سے بنایا جاتا ہے — یعنی وہی image، مگر Playwright اور Chromium browser کے ساتھ۔ سادہ image Chromium کے **بغیر** فراہم ہوتی ہے؛ `gemini-web`، `claude-web` اور `claude-turnstile` کو اس کی ضرورت ہوتی ہے۔

ناکامی startup کے وقت کے بجائے مؤخر ہوتی ہے: یہ providers اپنے models درج کرتے ہیں اور ڈیش بورڈ میں connected دکھائی دیتے ہیں، اور صرف پہلی request درج ذیل خرابی کے ساتھ ناکام ہوتی ہے

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

اگر آپ یہ providers استعمال کرتے ہیں تو اپنے موجودہ channel کا `-web` tag pull کریں — اس کے علاوہ کچھ تبدیل نہیں ہوتا۔ npm/CLI انسٹالیشن (Docker image کے بغیر) میں مساوی طور پر غائب جز browser binary ہے: host پر `npx playwright install chromium` چلائیں۔

#### Pre-release channel کا استعمال

`next` چینل موجودہ ڈیفالٹ `release/v*` برانچ پر ہر push کے ساتھ دوبارہ build کیا جاتا ہے اور AMD64 اور ARM64 دونوں کے لیے شائع کیا جاتا ہے۔ پرانی maintenance برانچیں اسے overwrite نہیں کر سکتیں۔ یہ چینل ان اصلاحات کے لیے pull کی جا سکنے والی image فراہم کرتا ہے جو اگلا stable tag بننے سے پہلے فعال release برانچ میں merge ہو چکی ہوں۔

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose کے لیے، منتخب کردہ profile کے زیرِ استعمال image tag کو override کریں، پھر service کو pull کرکے دوبارہ بنائیں:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### حفاظت اور rollback

`next` ایک متغیر pre-release چینل ہے۔ یہ فعال release برانچ پر کسی بھی push کے ساتھ تبدیل ہو سکتا ہے اور **production میں استعمال کے لیے supported نہیں ہے**۔ کسی مخصوص build کا جائزہ لیتے وقت image digest کو pin کریں:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ٹیسٹ کرنے سے پہلے، OmniRoute data volume یا bind-mounted data directory کا backup لیں۔ rollback کرنے کے لیے، پہلے استعمال شدہ stable version یا digest بحال کریں اور container کو دوبارہ بنائیں:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release برانچ کا build کبھی بھی `latest` کو منتقل نہیں کر سکتا؛ صرف ایک اہل stable semantic version ہی stable pointer کو promote کر سکتا ہے۔ `next` images میں release image inspection اور CRITICAL vulnerabilities کو روکنے والا gate برقرار رہتا ہے۔

**`latest`، git کے لیے تازہ ترین ہونے کی ضمانت نہیں ہے۔** `main` یا فعال `release/v*` برانچ میں merge کی گئی اصلاحات اس وقت تک `:latest` میں شامل **نہیں** ہوتیں جب تک ایک stable SemVer image شائع نہ ہو اور publish job، `:latest` کو promote نہ کر دے (جس کا digest اس SemVer کے برابر ہو)۔ اگر GitHub پر اصلاح پہلے سے نظر آ رہی ہو لیکن `latest` منجمد دکھائی دے، تو release برانچ کو ٹیسٹ کرنے کے لیے `:next` pull کریں یا SemVer tag کا انتظار کریں۔

| آپ کیا چاہتے ہیں                                                           | استعمال کریں                              |
| -------------------------------------------------------------------------- | ----------------------------------------- |
| ایسا GitOps / production جس میں غیر ارادی تبدیلی نہیں ہونی چاہیے           | `:X.Y.Z` کو pin کریں (یا image digest کو) |
| شائع شدہ stable releases کی پیروی اور ہر release پر دوبارہ بنانا قبول کرنا | `:latest`                                 |
| غیر جاری شدہ `release/v*` commits کو ٹیسٹ کرنا                             | `:next` (production کے لیے نہیں)          |
| `main` کو ٹیسٹ کرنا                                                        | `:main` (production کے لیے نہیں)          |

## دستیابی: ڈیفالٹ SQLite واحد ریپلیکا ہے

اسٹاک Docker / Kubernetes OmniRoute میں **ایک Node پراسیس + ایک SQLite رائٹر** ہوتا ہے۔ اس ٹوپولوجی پر زیادہ دستیابی **سپورٹ نہیں کی جاتی**۔

| پابندی                                              | نتیجہ                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| واحد رائٹر                                          | ایک ہی SQLite فائل کے ساتھ متعدد ریپلیکا **مت** چلائیں۔ اس سے DB خراب ہو جاتا ہے۔                                                                                                                                                                                                                                              |
| دوبارہ تخلیق / ریاسٹارٹ / HEALTHCHECK کے ذریعے بندش | زیرِ عمل SSE، ڈیش بورڈ سیشنز، اور اِن میموری حالت کی **مکمل بندش**۔ ہر منسلک کلائنٹ کا رابطہ منقطع ہو جاتا ہے۔ خالی اینڈ پوائنٹ کے وقفے کے دوران نئی درخواستوں کو OmniRoute JSON کے بجائے ریورس پراکسی کی **`502 Bad Gateway: Unknown error`** خرابی ملتی ہے — کلائنٹس اسے فراہم کنندہ کی ناکامی سے الگ نہیں کر سکتے (#11015)۔ |
| `/healthz` والا ہی ایونٹ لوپ                        | مصروف کیٹلاگ یا کمپریشن ٹِک پروبز میں تاخیر کر سکتی ہے؛ پھر مختصر ٹائم آؤٹ **واحد** ریپلیکا کو ریاسٹارٹ کر دیتا ہے۔                                                                                                                                                                                                            |

**پروب میٹرکس** ([Kubernetes پروب کی سفارشات](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) بھی دیکھیں):

| پروب                       | ہدف                                                    | استعمال نہ کریں                                        |
| -------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| لائیونیس                   | `PORT` پر TCP (ڈیفالٹ `20128`)، یا نرم HTTP `/healthz` | `/api/monitoring/health`                               |
| ریڈینیس                    | HTTP `GET /healthz`                                    | ایسے مختصر ٹائم آؤٹس جو مصروف ایونٹ لوپ کو مردہ سمجھیں |
| گہری جانچ / انسانوں کے لیے | `/api/monitoring/health`                               | خودکار kubelet لائیونیس                                |

**اپ گریڈز:** توقع رکھیں کہ ہر سیشن منقطع ہو جائے گا۔ اگر ممکن ہو تو کلائنٹس کو ڈرین کریں؛ ڈیفالٹ SQLite پر رولنگ اپ ڈیٹ دستیاب نہیں ہے۔ Compose کا `restart: unless-stopped`، Docker کے `HEALTHCHECK` کے ساتھ، کنٹینر کے Unhealthy ہونے پر واحد پراسیس کو بھی تبدیل کر دے گا — اور اثر کا دائرہ بھی وہی رہے گا۔

**واحد ریپلیکا** کے لیے Kubernetes اسنیپٹ (Recreate درکار ہے؛ ایک SQLite فائل کے ساتھ `replicas` میں اضافہ نہ کریں):

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

`preStop` کی تاخیر kube کو SIGTERM سے پہلے Service اینڈ پوائنٹس ہٹانے دیتی ہے، تاکہ **نئی** ٹریفک بند ہونے والے پراسیس تک نہ پہنچے۔ زیرِ عمل `/v1/responses` SSE کو ہیوی ویٹ ایڈمیشن لیزز کے ذریعے `SHUTDOWN_TIMEOUT_MS` (ڈیفالٹ 30 سیکنڈ) تک ڈرین کیا جاتا ہے (#11015)۔ جو نئی درخواستیں پھر بھی پراسیس تک پہنچتی ہیں، انہیں `503` + `Retry-After: 5` ملتا ہے۔ متبادل کے Ready ہونے تک Recreate کا خالی اینڈ پوائنٹ وقفہ ایک مکمل بندش ہی رہتا ہے — یہ SQLite ٹوپولوجی کا نتیجہ ہے، پروب کی غلط کنفیگریشن کا نہیں۔

بیرونی Postgres / ملٹی رائٹر HA کوئی **دستاویزی اسٹاک طریقہ** نہیں ہے۔ اگر آپ کو HA درکار ہے تو واحد ریپلیکا برقرار رکھیں، یا ایسی ٹوپولوجی چلائیں جسے پروجیکٹ نے الگ سے ٹیسٹ اور دستاویزی شکل دی ہو۔ Postgres/MySQL کا کام [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) میں موجود ہے۔ اس کی ترسیل تک **بڑی** `/v1/responses` گنجائش بڑھانے کا واحد معاونت یافتہ طریقہ N آزاد پراسیسز ہیں (اگلا سیکشن)، نہ کہ ایک والیوم پر `replicas > 1`۔

## اسکیل آؤٹ: N آزاد پروسیسز

ایک Node پروسیس **ایک V8 heap** ہوتا ہے۔ دو باہم متداخل ~3 MiB / ~750k-token کوڈنگ ایجنٹ `POST /v1/responses` (RTK + Caveman) تقریباً 12 Gi پر اس heap کو abort کر دیتے ہیں (`FATAL ERROR: Reached heap limit`) اور 16 Gi cgroup کو OOM کر سکتے ہیں۔ دیکھیے [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)۔ یہ پیمائش **میموری بجٹ** کی تنبیہ ہے، دو بیک وقت طویل `/v1/responses` کی کوئی پروڈکٹ hard-max حد نہیں۔ بھاری chat کی منظوری ایک خودکار طور پر اخذ کردہ ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) کے ذریعے محدود کی جاتی ہے، جس کا حجم اسی V8/cgroup حد کی بنیاد پر مقرر ہوتا ہے — پہلے سے متعین حجم والے پروسیس میں اسے بڑھا کر override کرنا (یا سابقہ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap مقرر کرنا) دوبارہ abort کا باعث بنتا ہے۔ چھوٹی chats، `/healthz`، `/v1/models`، اور MCP اس حد میں **شامل نہیں** ہیں۔

### ایک پروسیس: دو سے زیادہ طویل `/v1/responses`

ایک **صحت مند** پروسیس (heap، `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` سے کم، default `0.75`) دو سے زیادہ بیک وقت طویل `POST /v1/responses` **چلا سکتا ہے**، بشرطیکہ پورے پروسیس کے inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) میں اب بھی گنجائش ہو۔ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default 256 KiB) کے برابر یا اس سے بڑے bodies، ساخت کے لحاظ سے بھاری requests کی طرح وہی heavyweight lease حاصل کرتے ہیں اور وہی [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) استعمال کرتے ہیں۔ بیک وقت درجنوں طویل SSE clients (آپریٹرز کو اکثر 40–50 درکار ہوتے ہیں) ایک **میموری بجٹ** کا سوال ہے — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` کا حجم متعین کریں — یہ پروڈکٹ کی کوئی سخت “زیادہ سے زیادہ 2” حد نہیں ہے۔ دباؤ کا شکار heap اب بھی retry کے قابل `503` کے ساتھ بوجھ کم کرتا ہے تاکہ #7849 دوبارہ پیش نہ آئے۔

**متعدد heaps** (آزاد V8 old-spaces) حاصل کرنے کے لیے **فی الحال**:

| کریں                                                                                                                                                           | نہ کریں                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **N containers/pods** چلائیں، ہر ایک کا **اپنا** `DATA_DIR` / volume ہو                                                                                        | ایک SQLite فائل کے لیے `replicas > 1` مقرر کریں              |
| heavy in-flight + healthy-headroom کا حجم heap / inflight-byte budget کی بنیاد پر متعین کریں؛ 1–2 محتاط #7849 default ہے، پروڈکٹ کی سخت زیادہ سے زیادہ حد نہیں | ایک پروسیس کو 8× RAM اور لامحدود count cap دیں               |
| اختیاری: **مشترکہ quota counters** کے لیے `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                 | Redis کو مشترکہ SQLite سمجھیں — یہ ایسا نہیں ہے              |
| provider secrets کو ہر instance میں نقل کریں (یا تقسیم شدہ dashboards قبول کریں)                                                                               | تمام instances میں ایک dashboard / ایک call-log کی توقع کریں |
| سامنے کوئی بھی load balancer لگائیں؛ API key یا session کے مطابق sticky routing کافی ہے                                                                        | vendor-specific، size-aware middleware کو لازمی سمجھیں       |

ہارڈویئر: فی instance بیک وقت طویل `/v1/responses` کی تعداد ایک **میموری بجٹ** کا سوال ہے (heap + inflight-byte / #10110)۔ N آزاد `DATA_DIR`s اب بھی heaps کو ضرب دیتے ہیں: host RAM کو `N × cgroup` پورا کرنا ہوگا، نہ کہ “N=8 کے ساتھ ایک 16 Gi pod۔” ایک SQLite فائل پر کبھی بھی `replicas > 1` استعمال نہ کریں۔

Compose کا خاکہ (دو heaps، دو volumes — `deploy.replicas: 2` نہیں):

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

In-process density (HTTP isolate سے compression ہٹا کر) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ہے۔ مشترکہ durable state پر ایک logical cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ہے۔

## Docker کے اندر Gemini کی علاقائی خرابیاں

Google AI Studio / Gemini API، FAILED_PRECONDITION کے ساتھ HTTP 400 اور
`User location is not supported for the API use.` واپس کر سکتا ہے۔ ہوسٹ پر کامیاب درخواست
یہ ثابت نہیں کرتی کہ کنٹینر بھی وہی آؤٹ باؤنڈ راستہ استعمال کرتا ہے۔ DNS کی ترتیب،
IPv4/IPv6 کنیکٹیویٹی، VPN روٹنگ اور ترتیب دیے گئے پراکسی مختلف ہو سکتے ہیں۔
[Google کے معاونت یافتہ خطوں](https://ai.google.dev/gemini-api/docs/available-regions)
کے ساتھ ساتھ اصل کنکشن روٹ بھی چیک کریں؛ صرف یہ خرابی کسی خراب API کلید کی نشاندہی نہیں کرتی۔

### کنکشن کے لیے مخصوص پراکسی کو ترجیح دیں

متاثرہ Gemini کنکشن کے لیے OmniRoute کی
[فی کنکشن پراکسی کنفیگریشن](../ops/PROXY_GUIDE.md#4-level-proxy-system)
استعمال کریں، پھر اسی ماڈل کے ساتھ **کنکشن ٹیسٹ کریں** اور ایک چھوٹی درخواست دوبارہ بھیجیں۔
اس سے روٹنگ کی تبدیلی صرف اسی کنکشن تک محدود رہتی ہے۔ تصدیق کریں کہ کنٹینر سے پراکسی
قابلِ رسائی ہے، اور کنکشن واقعی اسے منتخب کر رہا ہے۔ روٹ تبدیل کرنا اپ اسٹریم علاقائی
اہلیت کی ضمانت نہیں دیتا۔

### ہوسٹ اور کنٹینر نیٹ ورکنگ کا موازنہ کریں

توثیق شدہ نتائج کا موازنہ کرتے وقت کلید، ماڈل اور درخواست یکساں رکھیں؛ کسی مسئلے میں
کبھی بھی اسناد، پراکسی پاس ورڈز یا مکمل اجازت کے ہیڈرز پیسٹ نہ کریں۔ پہلے یہ دیکھیں کہ
OS ریزالور کون سے ایڈریس فیملیز پیش کرتا ہے، اور ہوسٹ اور کنٹینر کے اندر ایک ہی کمانڈ
استعمال کریں:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` کو اپنی استعمال کردہ سروس سے بدلیں (مثلاً، `omniroute-web`)۔ یہ کمانڈز
اسناد یا IP ایڈریسز کے بغیر ایڈریس فیملیز پرنٹ کرتی ہیں۔ واپس آنے والا `6` صرف IPv6
DNS نتیجہ دکھاتا ہے: یہ قابلِ استعمال IPv6 روٹ یا API رسائی ثابت **نہیں** کرتا۔
جہاں `curl` انسٹال ہو، دونوں ماحول میں
`curl -4 -I https://generativelanguage.googleapis.com` کا
`curl -6 -I https://generativelanguage.googleapis.com` سے موازنہ کریں۔
HTTP جواب اس جانچ کے لیے کنیکٹیویٹی ثابت کرتا ہے، چاہے وہ غیر توثیق شدہ خرابی ہی کیوں
نہ ہو؛ صرف توثیق شدہ ماڈل درخواست ہی Gemini کی اہلیت کی جانچ کرتی ہے۔

### ہوسٹ سطح کا متبادل: فعال IPv6 اور ریزالور پالیسی

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) کے رپورٹ کنندہ نے
اپنے ماحول میں کنٹینر IPv6 فعال کر کے اور glibc ایڈریس کے انتخاب کو تبدیل کر کے رسائی
بحال کی۔ اسے ماحول کے لیے مخصوص متبادل سمجھیں۔ ریزالور کی ترجیحات ایڈجسٹ کرنے سے پہلے
فعال ہوسٹ IPv6، کنٹینر ایگریس/روٹنگ اور فائر وال قواعد کی تصدیق کریں۔ صرف نجی ULA
ایڈریس عوامی IPv6 کنیکٹیویٹی ثابت نہیں کرتا۔

جو سروسز پہلے سے Compose کے ڈیفالٹ نیٹ ورک سے منسلک ہیں، ان کے لیے یہ جزو اس نیٹ ورک
پر IPv6 فعال کرتا ہے؛ اپنی سروس، پورٹس، والیومز اور کنفیگریشن کا باقی حصہ برقرار رکھیں:

```yaml
networks:
  default:
    enable_ipv6: true
```

نام زدہ نیٹ ورک کے لیے اسے اسی نیٹ ورک پر فعال کریں جس سے سروس حقیقتاً منسلک ہوتی ہے۔
Docker ایک ULA سب نیٹ مختص کر سکتا ہے؛ واضح اور غیر متجاوز سب نیٹ صرف اسی وقت منتخب
کریں جب آپ کے نیٹ ورک کو اس کی ضرورت ہو۔ [Docker IPv6 نیٹ ورکنگ](https://docs.docker.com/engine/daemon/ipv6/)
اور [Compose نیٹ ورک کے اختیارات](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)
دیکھیں۔

**glibc پر مبنی امیج** میں، `/etc/gai.conf` ایڈریس کے انتخاب کو تبدیل کر سکتا ہے۔
موجودہ ریپوزٹری Dockerfile، Debian استعمال کرتی ہے؛ حسبِ ضرورت musl پر مبنی امیجز
یہ طریقۂ کار استعمال نہیں کرتیں۔ رپورٹ کردہ ایڈجسٹمنٹ ULA لیبل کو
`label fc00::/7 6` سے `label fc00::/7 1` میں تبدیل کرتی ہے۔ امیج کی مکمل پالیسی ٹیبل
سے آغاز کریں اور اس کی دیگر اندراجات محفوظ رکھیں: ایک `label` یا `precedence` اندراج
شامل کرنے سے وہ ڈیفالٹ ٹیبل بدل جاتی ہے، اس لیے صرف تبدیل شدہ سطر پر مشتمل فائل کافی
نہیں ہے۔
[glibc کنفیگریشن حوالہ](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ان معنوی اصولوں کو دستاویزی شکل دیتا ہے۔ جائزہ لی گئی فائل کو `/etc/gai.conf` پر صرف
پڑھنے کے قابل حالت میں بائنڈ ماؤنٹ کریں اور اسے لاگو کرنے کے لیے سروس دوبارہ تخلیق کریں۔

یہ اس کنٹینر میں **تمام آؤٹ باؤنڈ ٹریفک** کے لیے OS ایڈریس انتخاب کو تبدیل کرتا ہے۔
یہ ہر ایپلیکیشن کو IPv6 منتخب کرنے پر مجبور نہیں کرتا: Node کی DNS ترتیب اور کنکشن
کا انتخاب بھی اہم ہیں۔ خاص طور پر، `--dns-result-order=ipv4first`، IPv4 کو ترجیح دیتا
ہے اور صرف IPv4 کی ناکامی کا حل نہیں ہے۔ [Node DNS ترتیب](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)
دیکھیں۔

ہوسٹ سطح کی کسی بھی تبدیلی کے بعد Gemini اور اپنے دیگر فراہم کنندگان کو دوبارہ ٹیسٹ
کریں۔ سابقہ حالت پر واپس جانے کے لیے حسبِ ضرورت `gai.conf` ماؤنٹ ہٹائیں، پچھلی نیٹ ورک
کنفیگریشن بحال کریں، اور بحالی کے وقفے کے دوران متاثرہ سروس/نیٹ ورک دوبارہ تخلیق کریں۔
نیٹ ورک دوبارہ تخلیق کرنے سے اس سے منسلک دیگر کنٹینرز میں خلل پڑ سکتا ہے؛ مستقل ڈیٹا
والیوم حذف نہ کریں۔

## اہم نوٹس

- **SQLite WAL موڈ:** `docker stop` کو مکمل ہونے دیا جانا چاہیے تاکہ OmniRoute تازہ ترین تبدیلیوں کو واپس `storage.sqlite` میں چیک پوائنٹ کر سکے۔ شامل کردہ Compose فائلیں پہلے ہی 40s کی اسٹاپ مہلت مقرر کرتی ہیں۔ اگر آپ امیج کو براہِ راست چلاتے ہیں تو `--stop-timeout 40` برقرار رکھیں۔
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اگر معمول کے/لکھنے سے پہلے کے بیک اپس بیرونی طور پر منظم کیے جاتے ہیں تو اسے `true` پر سیٹ کریں۔ موجودہ ڈیٹابیس کی مائیگریشنز کے لیے اب بھی ان کا اپنا پائیدار حفاظتی اسنیپ شاٹ اور بڑے پیمانے کی مائیگریشن سے تحفظ درکار ہے۔
- **ڈیٹا کی پائیداری:** کنٹینر کے دوبارہ شروع ہونے کے دوران اپنے ڈیٹابیس، کلیدوں، اور کنفیگریشنز کو برقرار رکھنے کے لیے ہمیشہ `/app/data` پر ایک والیوم ماؤنٹ کریں۔
- **پورٹ کی کنفیگریشن:** ڈیفالٹ `20128` پورٹ کو تبدیل کرنے کے لیے `PORT` انوائرمنٹ ویری ایبل کو اوور رائیڈ کریں۔

## مزید دیکھیں

- [VM تنصیب کی رہنما](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare سیٹ اپ
- [Fly.io تنصیب کی رہنما](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io پر تعینات کریں
- [انوائرمنٹ کنفیگریشن](../reference/ENVIRONMENT.md) — مکمل `.env` حوالہ
