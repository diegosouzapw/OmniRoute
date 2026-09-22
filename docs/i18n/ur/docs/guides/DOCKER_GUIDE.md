# 🐳 Docker Guide — OmniRoute (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker کی تعیناتی کا مکمل حوالہ۔ فوری آغاز کے لیے [README کا Docker سیکشن](../README.md#-docker) دیکھیں۔

## فہرستِ مضامین

- [فوری اجرا](#quick-run)
- [ماحولیاتی فائل کے ساتھ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [دستیاب پروفائلز](#available-profiles)
- [جب OmniRoute Docker میں چل رہا ہو تو ہوسٹ CLI ٹولز کی ترتیب](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis سائڈکار](#redis-sidecar)
- [پروڈکشن Compose](#production-compose)
- [Dockerfile کے مراحل](#dockerfile-stages)
- [اہم ماحولیاتی متغیرات](#critical-environment-variables)
- [Caddy (HTTPS) کے ساتھ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare فوری ٹنل](#cloudflare-quick-tunnel)
- [امیج ٹیگز](#image-tags)
- [دستیابی: ڈیفالٹ SQLite صرف ایک ریپلیکا تک محدود ہے](#availability-default-sqlite-is-single-replica)
- [اہم نوٹس](#important-notes)

---

## فوری آغاز

> **ایک کمانڈ سے اپنی میزبانی کرنا چاہتے ہیں؟** ملاحظہ کریں
> [اپنی میزبانی کی رہنمائی](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (شائع شدہ امیج +
> Redis، صرف loopback، پروفائل منتخب کرنے کی ضرورت نہیں)۔ ذیل میں دیا گیا فوری آغاز
> ان صارفین کے لیے single-container طریقہ ہے جو پہلے ہی کسی دوسری جگہ Redis چلا رہے ہیں۔

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
# پہلے .env کو کاپی اور ترمیم کریں
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
# بنیادی پروفائل (کوئی CLI ٹولز نہیں)
docker compose --profile base up -d

# CLI پروفائل (Claude Code، Codex، OpenClaw پہلے سے شامل ہیں)
docker compose --profile cli up -d

# ہوسٹ پروفائل (بنیادی طور پر Linux کے لیے؛ ہوسٹ CLI بائنریز کو صرف پڑھنے کے موڈ میں ماؤنٹ کرتا ہے)
docker compose --profile host up -d

# CLI + CLIProxyAPI سائڈکار کو یکجا کریں
docker compose --profile cli --profile cliproxyapi up -d
```

## دستیاب پروفائلز

OmniRoute چار Compose پروفائلز کے ساتھ آتا ہے۔ اپنے ماحول سے مطابقت رکھنے والا پروفائل منتخب کریں۔

| پروفائل         | سروس             | کب استعمال کریں                                                                                                                                       | کمانڈ                                        |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ڈیفالٹ) | `omniroute-base` | ہیڈ لیس سرور / کم سے کم رن ٹائم، کوئی فراہم کنندہ CLI شامل نہیں                                                                                       | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | ایجنٹ پر مبنی ورک فلوز جو `omniroute providers/setup/doctor` اور شامل شدہ CLIs (Codex، Claude Code، Droid، OpenClaw) کو کال کرتے ہیں                  | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | ایسے Linux ہوسٹس جو `~/.local/bin`، `~/.codex`، `~/.claude` وغیرہ کو صرف پڑھنے کے موڈ میں ماؤنٹ کرکے ہوسٹ CLIs تک `network_mode` جیسی رسائی چاہتے ہیں | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | اپ اسٹریم CLI پراکسی کے لیے پورٹ `8317` پر [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) سائڈکار چلائیں                                 | `docker compose --profile cliproxyapi up -d` |

> متعدد پروفائلز کو یکجا کیا جا سکتا ہے: `docker compose --profile cli --profile cliproxyapi up -d`۔

## جب OmniRoute Docker میں چل رہا ہو تو میزبان کے CLI ٹولز کی ترتیب

`omniroute setup-codex`، `setup-claude`، `config set <tool>` اور ڈیش بورڈ کا
**کنفیگ محفوظ کریں** بٹن، سبھی `~/.codex/*.config.toml` جیسی فائلیں لکھتے ہیں۔ ان راستوں
کا مطلب صرف اسی مشین پر ہوتا ہے جہاں CLI حقیقتاً چلتا ہے۔ انہیں کنٹینر کے اندر
چلانے سے تحریر کنٹینر کی اپنی ہوم ڈائریکٹری (`/home/node` —
امیج `USER node` کے طور پر چلتا ہے) میں جاتی ہے، جہاں کوئی میزبان CLI اسے کبھی نہیں پڑھے گا اور کنٹینر
دوبارہ بنائے جاتے ہی یہ ضائع ہو جاتی ہے۔

OmniRoute اس صورتِ حال کا پتا لگاتا ہے اور ایسی کامیابی کی اطلاع دینے کے بجائے جسے آپ استعمال نہیں کر سکتے،
ہدایات کے ساتھ تحریر سے انکار کر دیتا ہے: CLI کوڈ `2` کے ساتھ بند ہوتا ہے، اور API
`containerEphemeralTarget: true` کے ساتھ `422` جواب دیتا ہے۔

### تجویز کردہ طریقہ: CLI کو میزبان پر اور OmniRoute کو Docker میں چلائیں

کنٹینر API فراہم کرتا ہے؛ CLI آپ کے میزبان ٹولز کی ترتیب کرتا ہے۔

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI کو کنٹینر کی طرف متوجہ کریں
omniroute setup-codex                      # آپ کے میزبان پر حقیقی ~/.codex لکھتا ہے
```

جب Codex، Claude Code، Cursor یا ملتے جلتے ٹولز آپ کے
لیپ ٹاپ پر چلتے ہوں تو یہی درست انتخاب ہے — اور عموماً ترتیب ایسی ہی ہوتی ہے۔

### متبادل: میزبان کی کنفیگ ڈائریکٹریز کو bind-mount کریں (`host` پروفائل)

اگر آپ چاہتے ہیں کہ کنٹینر خود آپ کی میزبان کنفیگ لکھے، تو
ڈائریکٹریز کو ماؤنٹ کریں اور `CLI_CONFIG_HOME` کو ماؤنٹ کی روٹ ڈائریکٹری کی طرف متوجہ کریں۔ `host` پروفائل
پہلے ہی ایسا کرتا ہے:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ہی اس راستے کو قابلِ اعتماد بناتا ہے: OmniRoute
`/proc/self/mountinfo` پڑھتا ہے اور ماؤنٹ شدہ راستوں پر تحریر کی اجازت دیتا ہے (اور ایسی ڈائریکٹریز پر بھی
جن کی ذیلی ڈائریکٹریز ماؤنٹس ہوں، جو عین اوپر دکھائی گئی `/host-home` ساخت ہے)، جبکہ
غیر ماؤنٹ شدہ راستوں سے اب بھی انکار کرتا ہے۔

### ہنگامی راستہ: کنٹینر کے اپنے CLIs کی ترتیب کریں (احتیاط سے استعمال کریں)

جب CLIs حقیقتاً کنٹینر کے اندر موجود ہوں (`cli` پروفائل)، تو تحریر
دانستہ ہوتی ہے۔ کسی بھی `setup-*` کمانڈ کو `--allow-container-write` دیں، یا سرور کے لیے
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` مقرر کریں۔ تحریر اس تنبیہ کے ساتھ
آگے بڑھتی ہے کہ یہ کنٹینر کے بعد برقرار نہیں رہے گی۔

> **سیکیورٹی تنبیہ — `cli` پروفائل + `docker.sock` ماؤنٹ۔**
> `cli` پروفائل `/var/run/docker.sock` کو bind-mount کرتا ہے تاکہ کنٹینر کے اندر موجود
> خودکار اپڈیٹر میزبان daemon کے ذریعے stack کو دوبارہ بنا سکے
> (`src/lib/system/autoUpdate.ts` اس socket کی جانچ کرتا ہے اور اس کی
> عدم موجودگی میں Docker راستہ چھوڑ دیتا ہے)۔ یہ socket **میزبان کے root اعتماد کی
> حد** ہے: جو چیز بھی اس تک رسائی حاصل کر سکتی ہے، وہ میزبان Docker daemon کو
> root کے طور پر چلاتی ہے — وہ میزبان پر کسی بھی کنٹینر کو بنا، معائنہ کر، روک اور حذف کر سکتی ہے۔
> مضمرات:
>
> 1. **`cli` پروفائل کی پورٹ کو کبھی نیٹ ورک پر ظاہر نہ کریں۔** اسے
>    `127.0.0.1` پر شائع کریں (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN سے قابلِ رسائی `cli` پروفائل، ڈیش بورڈ سطح کے کسی بھی RCE کو
>    میزبان پر مکمل قبضے میں بدل دیتا ہے۔
> 2. **میزبان کی کوئی اضافی ڈائریکٹری `cli` پروفائل میں bind نہ کریں۔**
>    Docker socket کے ساتھ کوئی مزید ماؤنٹ کنٹینر کو آپ کے فائل سسٹم اور میزبان کنفیگ تک
>    مکمل پڑھنے/لکھنے کی رسائی دیتا ہے۔ اگر کسی ٹول کو پروجیکٹ دیکھنے کی ضرورت ہو، تو
>    اسے CLI binary کے ساتھ مقامی طور پر چلائیں — اسے `cli` کنٹینر میں ماؤنٹ نہ کریں۔
>
> اگر آپ کو کنٹینر کے اندر خودکار اپڈیٹ کی ضرورت نہیں ہے، تو `cli` پروفائل بند رکھیں
> (`COMPOSE_PROFILES=core,redis` یا اس سے مختصر)۔ دوسرے پروفائلز
> Docker socket ماؤنٹ نہیں کرتے۔
>
> MITM سے متعلق خطرے کے ماڈل کے لیے `docs/security/MITM-TPROXY-DECRYPT.md` دیکھیں (git میں موجود؛ `/docs` میں مرتب نہیں)،
> اور `codex`/`claude-code`/`droid`/`openclaw` binary کے ماخذ کی زنجیر کے لیے
> `docs/security/SUPPLY_CHAIN.md` دیکھیں۔

## Redis سائیڈ کار

OmniRoute تقسیم شدہ ریٹ لمیٹر اور مشترکہ کیش کے لیے Redis پر انحصار کرتا ہے۔ `redis` سروس `docker-compose.yml` میں **ہمیشہ متعین** ہوتی ہے (اس پر کوئی پروفائل گیٹ نہیں) اور کسی بھی دوسرے پروفائل کے ساتھ شروع ہو جاتی ہے۔

| تفصیل                   | قدر                                    |
| ----------------------- | -------------------------------------- |
| امیج                    | `redis:7-alpine`                       |
| کنٹینر کا نام           | `omniroute-redis`                      |
| داخلی پورٹ              | `6379`                                 |
| ہوسٹ پورٹ (اوور رائیڈ)  | `REDIS_PORT` (ڈیفالٹ `6379`)           |
| ہوسٹ بائنڈ (اوور رائیڈ) | `REDIS_BIND_HOST` (ڈیفالٹ `127.0.0.1`) |
| والیوم                  | `omniroute-redis-data` → `/data`       |
| صحت کی جانچ             | `redis-cli ping` (10s وقفہ)            |

متعلقہ انوائرمنٹ ویری ایبلز:

- `REDIS_URL` — ایپ میں شامل کی جانے والی کنکشن اسٹرنگ (ڈیفالٹ `redis://redis:6379`)۔
- `REDIS_PORT` — Redis کنٹینر کے لیے ہوسٹ سائیڈ پورٹ میپنگ۔
- `REDIS_BIND_HOST` — ہوسٹ انٹرفیس جس پر پورٹ شائع کیا جاتا ہے۔ ڈیفالٹ `127.0.0.1` ہے۔

> **ڈیفالٹ طور پر لوپ بیک کیوں:** سائیڈ کار `requirepass` کے بغیر چلتا ہے، اور ایپ
> کنٹینرز compose نیٹ ورک (`redis:6379`) کے ذریعے اس تک پہنچتے ہیں — شائع شدہ پورٹ
> صرف ہوسٹ سائیڈ ٹولنگ (`redis-cli`، مقامی `npm run dev`) کے لیے موجود ہے۔ اسے
> `0.0.0.0` پر شائع کرنے سے غیر توثیق شدہ Redis آپ کے LAN کے ہر ہوسٹ کے لیے قابل رسائی ہو جائے گا۔ اگر آپ
> `REDIS_BIND_HOST=0.0.0.0` سیٹ کریں تو سروس کے `command:` میں `--requirepass` بھی شامل کریں۔

**Redis کو غیر فعال کرنا** تجویز نہیں کیا جاتا (ریٹ لمیٹر ان-میموری فال بیک تک محدود ہو جائے گا)۔ اگر ایسا کرنا ضروری ہو تو `docker-compose.yml` میں موجود `redis:` سروس بلاک کو ہٹا دیں/کمنٹ کر دیں، یا اسے صفر تک اسکیل کریں:

```bash
docker compose up -d --scale redis=0
```

## پروڈکشن Compose

dev کے ساتھ چلنے والے ایک الگ تھلگ پروڈکشن اسنیپ شاٹ کے لیے `docker-compose.prod.yml` استعمال کریں۔

| تفصیل                | قدر                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| فائل                 | `docker-compose.prod.yml`                                                                        |
| ڈیفالٹ ڈیش بورڈ پورٹ | `PROD_DASHBOARD_PORT=20130` (داخلی `${DASHBOARD_PORT:-20128}` سے میپ شدہ)                        |
| ڈیفالٹ API پورٹ      | `PROD_API_PORT=20131`                                                                            |
| امیج                 | `omniroute:prod` (`runner-cli` ٹارگٹ سے تیار کردہ)                                               |
| Redis کنٹینر         | `omniroute-redis-prod` (`redis:8.6.2`، مخصوص `redis-prod-data` والیوم)                           |
| ڈیٹا والیوم          | `omniroute-prod-data` (نام زدہ، دوبارہ بلڈ کرنے کے بعد بھی برقرار رہتا ہے)                       |
| صحت کی جانچیں        | `node healthcheck.mjs` + `redis-cli ping`، جبکہ `depends_on` کو Redis کی صحت سے مشروط کیا گیا ہے |

استعمال کا طریقہ:

```bash
# پروڈکشن اسٹیک بلڈ اور شروع کریں
docker compose -f docker-compose.prod.yml up -d --build

# لاگز کو مسلسل دیکھیں
docker compose -f docker-compose.prod.yml logs -f

# بند کریں (والیومز برقرار رکھیں)
docker compose -f docker-compose.prod.yml down
```

پروڈکشن اسٹیک dev compose کے متوازی چلتا ہے (کنٹینر کے نام، پورٹس اور والیومز مختلف ہیں)، اس لیے پروڈکشن کو چلتا رکھتے ہوئے آپ مقامی طور پر کام جاری رکھ سکتے ہیں۔

## Dockerfile کے مراحل

ریپوزٹری کے ساتھ ایک multi-stage Dockerfile (`Dockerfile`) فراہم کی جاتی ہے۔ تین مراحل دستیاب ہیں؛ اپنے استعمال کے مطابق درست `target` منتخب کریں۔

| مرحلہ         | بنیادی امیج           | مقصد                                                                                                                                                                               |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | dependencies انسٹال کرتا ہے (`npm ci --legacy-peer-deps`) اور `npm run build` چلاتا ہے (بطور ڈیفالٹ Turbopack — ذیل میں Build-time وسائل دیکھیں)                                   |
| `runner-base` | `node:26-trixie-slim` | Next.js کے standalone output کے ساتھ production runtime۔ **اس میں کوئی provider CLI شامل نہیں۔**                                                                                   |
| `runner-cli`  | `runner-base`         | `git`، `docker.io`، `docker-compose` اور global CLIs شامل کرتا ہے: `@openai/codex`، `@anthropic-ai/claude-code`، `droid`، `openclaw`۔ **agentic workflows کے لیے اسے منتخب کریں۔** |

کسی مخصوص target کو دستی طور پر build کریں:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Build-time وسائل

تین build args یہ کنٹرول کرتے ہیں کہ `builder` مرحلہ کتنے وسائل استعمال کرتا ہے۔ یہ صرف build-time کے لیے ہیں —
`OMNIROUTE_MEMORY_MB` (ذیل میں) ایک الگ runtime ترتیب ہے۔

| Build arg                   | ڈیفالٹ | اثر                                                                                                        |
| --------------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0` کی صورت میں webpack کے ساتھ build ہوتا ہے۔ زیادہ سے زیادہ memory کا استعمال کم، مگر رفتار سست ہوتی ہے۔ |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | شروع کیے گئے `next build` کے لیے V8 heap کی بالائی حد (`--max-old-space-size`)۔                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL` کو value فراہم کرتا ہے؛ Next، page-data جمع کرنے کے لیے `workers = N - 1` اخذ کرتا ہے۔ |

بڑے builder پر `OMNIROUTE_BUILD_WORKERS` ہی وہ ترتیب ہے جسے بڑھانا چاہیے، اور محدود وسائل والا build اگر `✓ Compiled successfully` کے **بعد** ناکام ہو تو سب سے پہلے اسی پر شبہ کرنا چاہیے۔ ہر page-data worker ایک الگ process ہوتا ہے، اور اصل `next build` بھی الگ process ہے؛
ایک حقیقی VPS reproduction (issue #7518) میں ہر process کا زیادہ سے زیادہ RSS تقریباً
~4.5 GB ناپا گیا، جو `NODE_OPTIONS` heap flag سے آزاد تھا (Turbopack، V8 heap سے باہر
native/Rust memory میں compile کرتا ہے)۔ `2` کی ڈیفالٹ قدر (→ 1 worker، مجموعی طور پر 2
processes) ان 16 GB / 4 vCPU GitHub-hosted runners کے مطابق رکھی گئی ہے جو
publish pipeline استعمال کرتی ہے۔ `8` (→ 7 workers) پر اس runner کی memory ختم ہوگئی اور
buildkit نے `ResourceExhausted: ... cannot allocate memory` کے ساتھ یہ مرحلہ ناکام کر دیا؛
ہر process کے RSS کا اندازہ لگانے کے بجائے اسے براہ راست ناپنے پر `3` (→ 2 workers)
بھی دستیاب memory میں پورا نہ آ سکا۔ `tests/unit/docker-build-memory-budget.test.ts`
ناپی گئی قدر کے مطابق حساب کرتا ہے اور اگر کوئی بھی ترتیب runner کی گنجائش سے بڑھ جائے
تو ناکام ہو جاتا ہے۔

Turbopack ایسی native Rust memory میں compile کرتا ہے جو V8 heap کے **باہر** موجود ہوتی ہے، اس لیے
`OMNIROUTE_BUILD_MEMORY_MB` اسے محدود نہیں کرتا۔ memory کی حد والے host پر
build کو OOM killer کسی error text کے بغیر SIGKILL کر دیتا ہے — یہ
`Creating an optimized production build` کے درمیان اچانک رک جاتا ہے، جو out-of-memory کے بجائے
hang محسوس ہوتا ہے۔ اگر build host کے وسائل محدود ہوں تو bundler تبدیل کریں:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` فعال ہے، اس لیے `next build` ایک parent **اور** ایک worker
process چلاتا ہے اور ہر ایک الگ سے `OMNIROUTE_BUILD_MEMORY_MB` کی پابندی کرتا ہے۔ container
کی حد کو اس قدر سے ایک نہیں بلکہ تقریباً دو گنا زیادہ رکھیں۔

اس tree پر پیمائش (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container کی حد | نتیجہ                                       |
| --------- | --------------- | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | دونوں پر خاموشی سے OOM-killed               |
| webpack   | 8 GiB           | build worker کو SIGKILL کیا گیا             |
| webpack   | 12 GiB          | کامیاب، زیادہ سے زیادہ استعمال 11.1 GiB رہا |

### Runtime کی ڈیفالٹ ترتیبات

`runner-base` کے ذریعے export کی گئی ڈیفالٹ ترتیبات: `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`۔

Docker میں memory کا طرزِ عمل:

- امیج `OMNIROUTE_MEMORY_MB=1024` مقرر کرتی ہے اور اس سے `NODE_OPTIONS=--max-old-space-size=1024` اخذ کرتی ہے۔
- اصل server process کو standalone launcher شروع کرتا ہے، جو `OMNIROUTE_MEMORY_MB` پڑھ کر `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` شامل کرتا ہے۔
- Node بار بار دی گئی `--max-old-space-size` کی آخری قدر استعمال کرتا ہے، اس لیے `OMNIROUTE_MEMORY_MB` مقرر کرنا Docker کی مؤثر heap limit کو کنٹرول کرتا ہے۔
- چونکہ امیج ہمیشہ اسے مقرر کرتی ہے، اس لیے launcher کا اپنا RAM کے مطابق calibrate ہونے والا fallback، Docker کے تحت کبھی لاگو نہیں ہوتا۔ workload کے لیے اسے واضح طور پر بڑھائیں (ذیل کا جدول دیکھیں)۔ coding-agent کے `/v1/responses` کے لیے `2048` اب بھی بہت کم ہے۔

### Coding agents کے لیے Runtime RAM

1 GiB کا Docker ڈیفالٹ dashboard/light-chat کے لیے کم از کم حد ہے، production کے لیے مناسب مقدار نہیں۔ طویل `POST /v1/responses` bodies (سینکڑوں messages، درجنوں tools) compression کے دوران memory میں متعدد graphs برقرار رکھتے ہیں۔ تقریباً 3 MiB / 750k-token کی دو متجاوز requests نے **12 GiB** old-space پر V8 کو abort کیا ہے (`FATAL ERROR: Reached heap limit`) اور 16 GiB cgroup OOM بھی پیدا کیا ہے۔ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) دیکھیں۔

**cgroup `--memory` کو heap سے زیادہ رکھیں** — native buffers، SQLite، اور compression کے عبوری data، V8 سے باہر موجود ہوتے ہیں۔

| کام کا بوجھ                         | `OMNIROUTE_MEMORY_MB`   | کنٹینر / cgroup             | نوٹس                                                                                                                                         |
| ----------------------------------- | ----------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| ڈیش بورڈ، ایک ہلکی چیٹ              | `1024` (امیج کا ڈیفالٹ) | ≥2 GiB                      |                                                                                                                                              |
| ایک کوڈنگ ایجنٹ (Claude/Codex/Grok) | `8192`                  | ≥10 GiB                     | عام واحد سیشن `/v1/responses`                                                                                                                |
| دو بیک وقت طویل `/v1/responses`     | `10240`–`12288`         | ≥12–16 GiB                  | تقریباً 12 GiB ہیپ پر V8 کا خاتمہ مشاہدہ کیا گیا                                                                                             |
| تین یا زیادہ بیک وقت طویل کانٹیکسٹس | ایک پروسیس پر نہ چلائیں | سلسلہ وار چلائیں / مزید RAM | ڈیفالٹ طور پر بھاری ورک لوڈ کے لیے زیرِ عمل درخواستوں کی حد 1 ہے؛ RAM میں اضافہ کیے بغیر اسے بڑھانے سے خاتمے کا مسئلہ دوبارہ پیدا ہو جاتا ہے |

جب `OMNIROUTE_MEMORY_MB` **سیٹ نہ ہو** تو بیئر میٹل پر `omniroute serve`، RAM کے تقریباً 35% پر کیلیبریٹ کرتا ہے (جسے `[512, 4096]` کی حد میں رکھا جاتا ہے)۔ Docker ہمیشہ `1024` سیٹ کرتا ہے، اس لیے آفیشل امیج میں یہ کیلیبریشن کبھی نہیں چلتی۔

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## اہم ماحولیاتی متغیرات

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) میں درج طے شدہ اقدار کے علاوہ، Docker کے تحت چلتے وقت درج ذیل متغیرات سب سے زیادہ اہم ہیں:

| متغیر                         | مقصد                                                                                                                                                                                                                                                                              | طے شدہ قدر                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket برج کے لیے مشترکہ خفیہ قدر۔ **پروڈکشن میں درکار ہے** — اسے ایک مضبوط بے ترتیب اسٹرنگ پر سیٹ کریں۔                                                                                                                                                                       | غیر سیٹ شدہ (فراہم کرنا ضروری ہے) |
| `REDIS_URL`                   | شرح محدود کنندہ / کیش بیک اینڈ کے لیے کنکشن اسٹرنگ                                                                                                                                                                                                                                | `redis://redis:6379`              |
| `REDIS_PORT`                  | شامل شدہ Redis کنٹینر کے لیے میزبان کی جانب کا پورٹ                                                                                                                                                                                                                               | `6379`                            |
| `REDIS_BIND_HOST`             | میزبان انٹرفیس جس پر شامل شدہ Redis پورٹ شائع کیا جاتا ہے (جب تک آپ AUTH شامل نہ کریں، لوپ بیک)                                                                                                                                                                                   | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | خودکار اپ ڈیٹ ورک فلوز کے لیے `cli` پروفائل میں `/workspace/omniroute` پر ماؤنٹ کیا گیا میزبان پاتھ                                                                                                                                                                               | `.` (موجودہ ڈائریکٹری)            |
| `OMNIROUTE_MEMORY_MB`         | Docker اسٹینڈ الون سرور کے لیے رن ٹائم Node ہیپ کی بالائی حد؛ اوپر دی گئی امیج کی طے شدہ قدر کو اوور رائیڈ کرتی ہے۔ کوڈنگ ایجنٹس: `8192`+ ([رن ٹائم RAM](#runtime-ram-for-coding-agents) دیکھیں)۔                                                                                 | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | ڈیش بورڈ (20128) اور API (20129) کے لیے ظاہر کردہ پورٹس کو اوور رائیڈ کریں                                                                                                                                                                                                        | `20128` / `20129`                 |
| `APP_BIND_HOST`               | میزبان انٹرفیس جس پر docker-compose ڈیش بورڈ/API/live-WS پورٹس شائع کرتا ہے۔ `REQUIRE_API_KEY=false` (طے شدہ قدر) کے ساتھ، `0.0.0.0` گمنام `/v1` پراکسی کو LAN پر ظاہر کرتا ہے — دائرہ صرف `REQUIRE_API_KEY=true` کے ساتھ یا سامنے ریورس پراکسی موجود ہونے کی صورت میں وسیع کریں۔ | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | میزبان انٹرفیس جس پر docker-compose، `cliproxyapi` سائیڈ کار شائع کرتا ہے — اس کا ڈیٹا والیوم فراہم کنندہ کی اسناد محفوظ رکھتا ہے۔                                                                                                                                                | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | وہ ڈائریکٹری جسے رن ٹائم پلگ اِن اسکینر پڑھتا ہے اور جس میں انسٹال کرتا ہے۔ جب پلگ اِنز بائنڈ ماؤنٹ کیے گئے ہوں تو اسے سیٹ کریں: طے شدہ قدر `HOME` کی پیروی کرتی ہے، جسے کسی امیج کے لیے ایکسپورٹ کرنا ضروری نہیں۔                                                                | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | جب ایپ کسی ریورس پراکسی کے پیچھے شائع ہو تو URL ذیلی پاتھ (مثلاً `/omniroute`)                                                                                                                                                                                                    | _(خالی = روٹ)_                    |
| `NEXT_PUBLIC_BASE_URL`        | ذیلی پاتھ سمیت عوامی براؤزر اوریجن (مثلاً `https://host/omniroute`)                                                                                                                                                                                                               | غیر سیٹ شدہ                       |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` کے لیے میزبان کی جانب کا ڈیش بورڈ پورٹ                                                                                                                                                                                                                  | `20130`                           |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` سائیڈ کار کے لیے میزبان کی جانب کا پورٹ                                                                                                                                                                                                                             | `8317`                            |

## ذیلی راستے پر ریورس پراکسی (Traefik / nginx)

Next.js کا `basePath` اسٹینڈ الون بنڈل میں کمپائل کیا جاتا ہے۔ OmniRoute ایپ روٹ پر ایک سینٹینل فائل میں پہلے سے شامل شدہ قدر محفوظ کرتا ہے (`npm run build` کے دوران لکھی جاتی ہے؛ `scripts/docker/ensure-docker-base-path.mjs` کے ذریعے پڑھی جاتی ہے) اور کنٹینر شروع ہونے پر اس کا موازنہ `OMNIROUTE_BASE_PATH` سے کرتا ہے۔ جب دونوں مختلف ہوں اور امیج ڈومین روٹ کے لیے بنائی گئی ہو، تو `node dev/run-standalone.mjs` چلنے سے پہلے انٹری پوائنٹ اسٹینڈ الون مینی فیسٹس، شامل شدہ `basePath`/`assetPrefix` لٹرلز (Next 16 صرف `assetPrefix` سے SSR اثاثہ URLs رینڈر کرتا ہے — پیچر ذیلی راستے کو اس میں بھی نقل کرتا ہے)، پہلے سے شامل شدہ `/_next/static` اثاثہ URLs (کلائنٹ-ریفرنس مینی فیسٹس، میڈیا امپورٹس، پہلے سے رینڈر کیے گئے خرابی کے صفحات) اور کلائنٹ `process.env` شِم کو دوبارہ لکھتا ہے۔

### Compose بلڈ (تجویز کردہ)

دونوں متغیرات `.env` میں سیٹ کریں، پھر دوبارہ بلڈ کریں تاکہ امیج اور رن ٹائم باہم مطابقت رکھتے ہوں:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`، `OMNIROUTE_BASE_PATH` کو Docker بلڈ آرگ اور رن ٹائم ماحولیاتی متغیر، دونوں کے طور پر فارورڈ کرتا ہے۔

### پہلے سے بلڈ شدہ روٹ امیج + رن ٹائم ذیلی راستہ

شائع شدہ `diegosouzapw/omniroute:*` امیجز ڈومین روٹ کے لیے بلڈ کی گئی ہیں۔ آپ پھر بھی رن ٹائم پر `OMNIROUTE_BASE_PATH` سیٹ کر سکتے ہیں؛ کنٹینر آغاز پر ایک مرتبہ بنڈل کو پیچ کرتا ہے۔ اسے مماثل عوامی اوریجن کے ساتھ استعمال کریں:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ریورس پراکسی کو **مکمل** بیرونی راستہ فارورڈ کرنے کے لیے کنفیگر کریں (پریفکس نہ ہٹائیں)۔ Traefik کو `PathPrefix(`/omniroute`)` کو `StripPrefix` کے بغیر کنٹینر کی طرف روٹ کرنا چاہیے، تاکہ Next.js کو `/omniroute/...` موصول ہو اور وہ `/omniroute/_next/...` سے اثاثے پیش کرے۔

Docker ہیلتھ چیک فعال `OMNIROUTE_BASE_PATH` سے پریفکس کیے گئے ہلکے پھلکے `/healthz` لائف سائیکل اینڈ پوائنٹ کی جانچ کرتا ہے۔ انسانی/ڈیش بورڈ تشخیص کے لیے `/api/monitoring/health` بدستور دستیاب ہے؛ کنٹینر HEALTHCHECK کو دوبارہ اس کی طرف متوجہ کرنے کے لیے (مثلاً گہری صحت کی پابندی نافذ کرنے کی خاطر)، `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` سیٹ کریں۔ یہ راستہ ایک **گہری** جانچ ہے (DB + مانیٹرنگ خلاصہ) — اگر آپ دوبارہ اسے فعال کرنے کا انتخاب کریں تو Docker کے کم وقفے سے چلنے والے `HEALTHCHECK` کے لیے موزوں ہے، مگر Kubernetes کے `livenessProbe` وقفوں کے لیے **نہیں**۔

آرکیسٹریٹرز (Kubernetes، Nomad، وغیرہ) کے لیے:

| پروب             | ترجیح دیں                                                        | اجتناب کریں                                                             |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| لائیونیس         | HTTP `GET /livez`، یا مرکزی پورٹ (`PORT`، ڈیفالٹ `20128`) پر TCP | لائیونیس کے طور پر `/api/monitoring/health`                             |
| ریڈینیس          | HTTP `GET /healthz`                                              | مختصر ٹائم آؤٹس جو ایونٹ لوپ کے مصروف ہونے کو بند ہونے کے مترادف سمجھیں |
| گہری / بلیک باکس | `/api/monitoring/health`                                         | —                                                                       |

`/healthz` پراسیس لائف سائیکل (`ok` / `starting` / `stopping`) کی اطلاع دیتا ہے۔ `/livez` صرف پراسیس کے فعال ہونے کی جانچ کرتا ہے (جب بھی ہینڈلر چل سکتا ہو، 200؛ یہ ریڈینیس کا انتظار نہیں کرتا)۔ دونوں پھر بھی اسی Node ایونٹ لوپ پر چلتے ہیں جس پر درخواستیں ہینڈل ہوتی ہیں، اس لیے CPU پر منحصر کیٹلاگ یا کمپریشن کا کام ان میں تاخیر پیدا کر سکتا ہے — مصروف ≠ بند۔ اگر HTTP پروبس ٹائم آؤٹ ہوں تو TCP لائیونیس کو ترجیح دیں۔ پروبس سے متعلق مکمل رہنمائی:
[مانیٹرنگ گائیڈ — Kubernetes پروب کی سفارشات](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)۔

## Caddy کے ساتھ Docker Compose (HTTPS Auto-TLS)

OmniRoute کو Caddy کی خودکار SSL فراہمی کے ذریعے محفوظ طریقے سے قابلِ رسائی بنایا جا سکتا ہے۔ یقینی بنائیں کہ آپ کے ڈومین کا DNS A ریکارڈ آپ کے سرور کے IP کی طرف اشارہ کرتا ہو۔

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
      # OAuth کال بیکس، ڈیش بورڈ لنکس، اور تیار کردہ عوامی URLs کے لیے براؤزر کو دکھائی دینے والا اوریجن۔
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # شیڈول شدہ جابز / سیلف فیچز کے لیے اندرونی سرور-سے-سرور URL۔
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

Caddy اپ اسٹریم کنٹینر کے لیے معیاری فارورڈنگ ہیڈرز سیٹ کرتا ہے۔ OmniRoute، OAuth کال بیکس اور تیار کردہ عوامی
لنکس کے لیے `NEXT_PUBLIC_BASE_URL` کو مستند عوامی اوریجن کے طور پر استعمال کرتا ہے؛ تصدیق شدہ ڈیش بورڈ رائٹس، سیشن سے منسلک CSRF
تحفظ کے ساتھ سیم اوریجن درخواستیں استعمال کرتی ہیں۔ `OMNIROUTE_TRUST_PROXY` کو صرف ایسی جدید تعیناتیوں کے لیے فعال کریں جہاں آپ دانستہ طور پر
چاہتے ہوں کہ OmniRoute واضح
کنفیگریشن کے بجائے قابلِ اعتماد فارورڈ شدہ ہیڈرز سے عوامی اوریجن اخذ کرے۔

## Cloudflare Quick Tunnel

Docker تعیناتیوں کے لیے ڈیش بورڈ سپورٹ میں `Dashboard → Endpoints` پر ایک کلک والا **Cloudflare Quick Tunnel** شامل ہے۔ پہلی مرتبہ فعال کرنے پر، `cloudflared` صرف ضرورت کے وقت ڈاؤن لوڈ ہوتا ہے، آپ کے موجودہ `/v1` اینڈ پوائنٹ کے لیے ایک عارضی ٹنل شروع کرتا ہے، اور تیار کردہ `https://*.trycloudflare.com/v1` URL کو براہِ راست آپ کے عام عوامی URL کے نیچے دکھاتا ہے۔

اینڈ پوائنٹ ٹنل پینلز (Cloudflare، Tailscale، ngrok) کو فعال ٹنل کی حالت تبدیل کیے بغیر `Settings → Appearance` سے دکھایا یا چھپایا جا سکتا ہے۔

### ٹنل کے متعلق نکات

- Quick Tunnel کے URLs عارضی ہوتے ہیں اور ہر ری اسٹارٹ کے بعد تبدیل ہو جاتے ہیں۔
- OmniRoute یا کنٹینر ری اسٹارٹ ہونے کے بعد Quick Tunnels خودکار طور پر بحال نہیں ہوتے۔ ضرورت پڑنے پر انہیں ڈیش بورڈ سے دوبارہ فعال کریں۔
- منظم انسٹالیشن فی الحال Linux، macOS، اور Windows پر `x64` / `arm64` کو سپورٹ کرتی ہے۔
- محدود کنٹینر ماحول میں شور پیدا کرنے والی QUIC UDP بفر تنبیہات سے بچنے کے لیے، منظم Quick Tunnels بطور ڈیفالٹ HTTP/2 ٹرانسپورٹ استعمال کرتی ہیں۔ اگر آپ مختلف ٹرانسپورٹ چاہتے ہیں تو `CLOUDFLARED_PROTOCOL=quic` یا `auto` سیٹ کریں۔
- Docker امیجز میں سسٹم CA روٹس شامل ہوتے ہیں اور انہیں منظم `cloudflared` تک پہنچایا جاتا ہے، جس سے کنٹینر کے اندر ٹنل کے بوٹسٹریپ ہونے کے دوران TLS اعتماد کی ناکامیوں سے بچا جا سکتا ہے۔
- اگر آپ چاہتے ہیں کہ OmniRoute کسی بائنری کو ڈاؤن لوڈ کرنے کے بجائے موجودہ بائنری استعمال کرے تو `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` سیٹ کریں۔

## امیج ٹیگز

| امیج                     | ٹیگ      | سائز   | تفصیل                                                    |
| ------------------------ | -------- | ------ | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | سب سے اعلیٰ **شائع شدہ** مستحکم SemVer (git `main` نہیں) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps کے لیے اس قسم کے ٹیگ کو پن کریں                   |

ملٹی پلیٹ فارم مینی فیسٹ: `linux/amd64` + `linux/arm64` نیٹو (Apple Silicon، AWS Graviton، Raspberry Pi)۔ Docker خودکار طور پر مطابقت رکھنے والا آرکیٹیکچر منتخب کرتا ہے؛ اگر آپ کو ARM ہوسٹس پر AMD64 ایمولیشن لازمی استعمال کرنی ہو تو `--platform linux/amd64` پاس کریں۔

### ریلیز چینلز

OmniRoute مستحکم ریلیزز، فعال ریلیز برانچ کی ٹیسٹنگ، اور ڈیولپمنٹ بلڈز کے لیے الگ الگ Docker چینلز شائع کرتا ہے۔

| چینل                            | ماخذ                                   | تغیر پذیری                   | تجویز کردہ استعمال                                                                                                          |
| ------------------------------- | -------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | دستخط شدہ/ورژن شدہ ریلیز               | ناقابلِ تغیر                 | پروڈکشن تعیناتیاں جو کسی مخصوص ریلیز کو پن کرتی ہیں                                                                         |
| `:latest` / `:latest-web`       | سب سے اعلیٰ **شائع شدہ** مستحکم SemVer | قابلِ تغیر مستحکم پوائنٹر    | SemVer پبلش جاب کے **بعد** مستحکم ریلیزز کی پیروی کرتا ہے — `main` یا غیر جاری شدہ `release/v*` کمیٹس کو ٹریک **نہیں** کرتا |
| `:next` / `:next-web`           | موجودہ ڈیفالٹ `release/v*` برانچ       | قابلِ تغیر پری ریلیز پوائنٹر | ان اصلاحات کی جانچ جو فعال ریلیز برانچ میں شامل ہو چکی ہیں لیکن ابھی مستحکم ریلیز کا حصہ نہیں ہیں                           |
| `:main` / `:main-web`           | `main` برانچ                           | قابلِ تغیر ڈیولپمنٹ پوائنٹر  | صرف ڈیولپمنٹ اور انٹیگریشن ٹیسٹنگ                                                                                           |

#### پری ریلیز چینل کا استعمال

`next` چینل موجودہ ڈیفالٹ `release/v*` برانچ پر ہر پش کے ساتھ دوبارہ بنایا جاتا ہے اور AMD64 اور ARM64 دونوں کے لیے شائع ہوتا ہے۔ پرانی مینٹیننس برانچز اسے اوور رائٹ نہیں کر سکتیں۔ یہ چینل ان اصلاحات کے لیے ایک قابلِ پُل امیج فراہم کرتا ہے جو اگلا مستحکم ٹیگ بننے سے پہلے فعال ریلیز برانچ میں ضم ہو چکی ہوں۔

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose کے لیے، منتخب کردہ پروفائل کے زیرِ استعمال امیج ٹیگ کو اوور رائڈ کریں، پھر سروس کو پُل کرکے دوبارہ بنائیں:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### حفاظت اور رول بیک

`next` ایک فلوٹنگ پری ریلیز چینل ہے۔ یہ فعال ریلیز برانچ پر کسی بھی پش کے ساتھ تبدیل ہو سکتا ہے اور **پروڈکشن استعمال کے لیے سپورٹ شدہ نہیں ہے**۔ کسی مخصوص بلڈ کا جائزہ لیتے وقت امیج ڈائجسٹ کو پن کریں:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ٹیسٹنگ سے پہلے، OmniRoute ڈیٹا والیوم یا bind-mounted ڈیٹا ڈائریکٹری کا بیک اپ لیں۔ رول بیک کرنے کے لیے، پہلے استعمال شدہ مستحکم ورژن یا digest بحال کریں اور کنٹینر دوبارہ بنائیں:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch کی build کبھی بھی `latest` کو منتقل نہیں کر سکتی؛ صرف اہل مستحکم semantic version ہی مستحکم pointer کو آگے بڑھا سکتا ہے۔ `next` امیجز میں release image کا معائنہ اور CRITICAL کمزوریوں کو روکنے والا gate برقرار رہتا ہے۔

**`latest`، git کے لیے تازہ ترین ہونے کی ضمانت نہیں ہے۔** `main` یا فعال `release/v*` برانچ میں merge کی گئی اصلاحات اس وقت تک `:latest` میں **شامل نہیں ہوتیں** جب تک ایک مستحکم SemVer امیج شائع نہ ہو جائے اور publish job، `:latest` کو فروغ نہ دے دے (جس کا digest اس SemVer کے برابر ہو)۔ اگر GitHub پر اصلاح پہلے ہی نظر آ رہی ہو مگر `latest` منجمد محسوس ہو، تو release branch کی جانچ کے لیے `:next` pull کریں یا SemVer tag کا انتظار کریں۔

| آپ کیا چاہتے ہیں                                                    | استعمال کریں                           |
| ------------------------------------------------------------------- | -------------------------------------- |
| ایسا GitOps / production ماحول جس میں drift نہیں ہونا چاہیے         | `:X.Y.Z` (یا image digest) کو pin کریں |
| شائع شدہ مستحکم ورژنز کی پیروی اور ہر release پر recreate قبول کرنا | `:latest`                              |
| غیر جاری شدہ `release/v*` commits کی جانچ                           | `:next` (production کے لیے نہیں)       |
| `main` کی جانچ                                                      | `:main` (production کے لیے نہیں)       |

## دستیابی: ڈیفالٹ SQLite واحد replica پر مشتمل ہے

معیاری Docker / Kubernetes OmniRoute میں **ایک Node process + ایک SQLite writer** ہوتا ہے۔ اس topology پر اعلیٰ دستیابی **معاونت یافتہ نہیں ہے**۔

| پابندی                                    | نتیجہ                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| واحد writer                               | ایک ہی SQLite فائل کے ساتھ متعدد replicas **مت** چلائیں۔ اس سے DB خراب ہو جاتا ہے۔                                                                                                                                                                                                                                     |
| دوبارہ بنانا / restart / HEALTHCHECK kill | زیرِ عمل SSE، dashboard sessions، اور in-memory state کی **مکمل بندش**۔ ہر منسلک client کا رابطہ منقطع ہو جاتا ہے۔ empty-endpoint وقفے کے دوران نئی requests کو OmniRoute JSON کے بجائے reverse-proxy کی **`502 Bad Gateway: Unknown error`** ملتی ہے — clients اسے provider کی ناکامی سے ممتاز نہیں کر سکتے (#11015)۔ |
| `/healthz` جیسا ہی event loop             | مصروف catalog یا compression tick probes میں تاخیر کر سکتا ہے؛ پھر مختصر timeout **واحد** replica کو restart کر دیتا ہے۔                                                                                                                                                                                               |

**Probe matrix** ([Kubernetes probe recommendations](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) بھی دیکھیں):

| Probe         | ہدف                                                    | استعمال نہ کریں                                |
| ------------- | ------------------------------------------------------ | ---------------------------------------------- |
| Liveness      | `PORT` پر TCP (ڈیفالٹ `20128`)، یا نرم HTTP `/healthz` | `/api/monitoring/health`                       |
| Readiness     | HTTP `GET /healthz`                                    | سخت timeouts جو مصروف event loop کو بند سمجھیں |
| Deep / humans | `/api/monitoring/health`                               | خودکار kubelet liveness                        |

**Upgrades:** توقع رکھیں کہ ہر session منقطع ہو جائے گا۔ اگر ممکن ہو تو clients کو drain کریں؛ ڈیفالٹ SQLite پر rolling update دستیاب نہیں ہے۔ Compose کا `restart: unless-stopped` اور Docker کا `HEALTHCHECK` بھی container کے Unhealthy ہونے پر واحد process کو تبدیل کر دیں گے — اثرات کا دائرہ وہی رہے گا۔

**واحد replica** کے لیے Kubernetes snippet (Recreate درکار ہے؛ ایک SQLite فائل کے ساتھ `replicas` میں اضافہ نہ کریں):

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

`preStop` sleep سے kube کو SIGTERM سے پہلے Service endpoints ہٹانے کا موقع ملتا ہے، تاکہ **نئی** traffic بند ہونے والے process تک پہنچنا بند کر دے۔ زیرِ عمل `/v1/responses` SSE کو heavyweight admission leases کے ذریعے `SHUTDOWN_TIMEOUT_MS` (ڈیفالٹ 30s) تک drain کیا جاتا ہے (#11015)۔ جو نئی requests پھر بھی process تک پہنچتی ہیں، انہیں `503` + `Retry-After: 5` ملتا ہے۔ متبادل replica کے Ready ہونے تک Recreate کا empty-endpoint وقفہ مکمل بندش ہی رہتا ہے — یہ SQLite topology کی خصوصیت ہے، probe کی غلط configuration نہیں۔

بیرونی Postgres / multi-writer HA کوئی دستاویزی معیاری راستہ **نہیں** ہے۔ اگر آپ کو HA درکار ہے، تو واحد replica برقرار رکھیں یا ایسی topology چلائیں جسے project نے الگ سے test اور document کیا ہو۔ Postgres/MySQL کا کام [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) میں جاری ہے۔ اس کے جاری ہونے تک **بڑی** `/v1/responses` capacity بڑھانے کا واحد معاونت یافتہ طریقہ N آزاد processes (اگلا حصہ) ہیں، نہ کہ ایک volume پر `replicas > 1`۔

## اسکیل آؤٹ: N آزاد پروسیسز

ایک Node پروسیس **ایک V8 heap** ہے۔ دو باہم متجاوز ~3 MiB / ~750k-token کوڈنگ ایجنٹ `POST /v1/responses` (RTK + Caveman) اس heap کو ~12 Gi پر ختم کر دیتے ہیں (`FATAL ERROR: Reached heap limit`) اور 16 Gi cgroup میں OOM کا سبب بن سکتے ہیں۔ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) دیکھیں۔ یہ پیمائش **میموری بجٹ** سے متعلق تنبیہ ہے، بیک وقت دو طویل `/v1/responses` کی مصنوعات کی طرف سے مقرر کردہ قطعی زیادہ سے زیادہ حد نہیں۔ بھاری چیٹ کی قبولیت خودکار طور پر اخذ کردہ ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، `src/shared/middleware/admissionBudget.ts`) کے ذریعے محدود کی جاتی ہے، جس کا حجم اسی V8/cgroup حد کی بنیاد پر طے ہوتا ہے — پہلے سے حجم متعین شدہ پروسیس میں اسے زیادہ قدر سے override کرنا (یا سابقہ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` درخواستوں کی تعداد کی حد مقرر کرنا) دوبارہ پروسیس کے خاتمے کا سبب بنتا ہے۔ چھوٹی چیٹس، `/healthz`، `/v1/models`، اور MCP اس حد میں **شامل نہیں** ہیں۔

### ایک پروسیس: دو سے زیادہ طویل `/v1/responses`

ایک **صحت مند** پروسیس (جس کا heap، `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` سے کم ہو، جس کی ڈیفالٹ قدر `0.75` ہے) بیک وقت دو سے زیادہ طویل `POST /v1/responses` **چلا سکتا ہے**، بشرطیکہ پورے پروسیس کے inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) میں اب بھی گنجائش موجود ہو۔ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ڈیفالٹ 256 KiB) کے برابر یا اس سے بڑی bodies کو وہی heavyweight lease درکار ہوتا ہے جو ساختی طور پر بھاری درخواستوں کو درکار ہے، اور وہی [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) استعمال ہوتا ہے۔ بیک وقت درجنوں طویل SSE clients (آپریٹرز کو اکثر 40–50 درکار ہوتے ہیں) ایک **میموری بجٹ** کا سوال ہے — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` کا حجم متعین کریں — یہ مصنوعات کی طرف سے مقرر کردہ قطعی “زیادہ سے زیادہ 2” کی حد نہیں۔ دباؤ کا شکار heap اب بھی دوبارہ کوشش کے قابل `503` کے ساتھ لوڈ کم کرتا ہے، تاکہ #7849 دوبارہ پیش نہ آئے۔

**heaps کو کئی گنا بڑھانے** (آزاد V8 old-spaces) کے لیے **آج**:

| یہ کریں                                                                                                                                                         | یہ نہ کریں                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **N containers/pods** چلائیں، ہر ایک کا **اپنا** `DATA_DIR` / volume ہو                                                                                         | ایک SQLite فائل کے ساتھ `replicas > 1` مقرر کریں             |
| heavy in-flight + healthy-headroom کا حجم heap / inflight-byte budget کی بنیاد پر متعین کریں؛ 1–2 محتاط #7849 ڈیفالٹ ہے، مصنوعات کی قطعی زیادہ سے زیادہ حد نہیں | ایک پروسیس کو 8× RAM اور لامحدود count cap دیں               |
| اختیاری: **مشترکہ quota counters** کے لیے `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                  | Redis کو مشترکہ SQLite سمجھیں — یہ ایسا نہیں ہے              |
| ہر instance میں provider secrets کی نقل رکھیں (یا الگ الگ dashboards قبول کریں)                                                                                 | تمام instances میں ایک dashboard / ایک call-log کی توقع کریں |
| سامنے کوئی بھی load balancer لگائیں؛ API key یا session کے لحاظ سے sticky routing کافی ہے                                                                       | کسی vendor-specific size-aware middleware کو لازمی سمجھیں    |

ہارڈویئر: ہر instance میں بیک وقت طویل `/v1/responses` کی تعداد ایک **میموری بجٹ** کا سوال ہے (heap + inflight-byte / #10110)۔ N آزاد `DATA_DIR`s پھر بھی heaps کو کئی گنا بڑھاتے ہیں: host RAM کو `N × cgroup` کا بوجھ سنبھالنا ہوگا، نہ کہ “N=8 کے ساتھ ایک 16 Gi pod۔” ایک SQLite فائل پر کبھی بھی `replicas > 1` نہ چلائیں۔

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

In-process density (HTTP isolate سے compression کو الگ کرنا) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ہے۔ مشترکہ durable state پر ایک منطقی cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ہے۔

## اہم نوٹس

- **SQLite WAL موڈ:** `docker stop` کو مکمل ہونے دیا جانا چاہیے تاکہ OmniRoute تازہ ترین تبدیلیوں کو چیک پوائنٹ کر کے واپس `storage.sqlite` میں محفوظ کر سکے۔ شامل کردہ Compose فائلوں میں پہلے ہی 40s کی اسٹاپ گریس مدت مقرر ہے۔ اگر آپ امیج براہِ راست چلاتے ہیں تو `--stop-timeout 40` برقرار رکھیں۔
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اگر معمول کے/لکھنے سے پہلے کے بیک اپ بیرونی طور پر منظم کیے جاتے ہیں تو اسے `true` پر سیٹ کریں۔ موجودہ ڈیٹابیس کی مائیگریشنز کے لیے اب بھی اپنا پائیدار حفاظتی اسنیپ شاٹ اور بڑے پیمانے کی مائیگریشن کا حفاظتی انتظام درکار ہے۔
- **ڈیٹا کی پائیداری:** کنٹینر کے دوبارہ شروع ہونے کے بعد بھی اپنے ڈیٹابیس، کلیدوں اور کنفیگریشنز کو محفوظ رکھنے کے لیے ہمیشہ `/app/data` پر ایک والیوم ماؤنٹ کریں۔
- **پورٹ کنفیگریشن:** ڈیفالٹ `20128` پورٹ تبدیل کرنے کے لیے `PORT` انوائرمنٹ ویری ایبل کو اوور رائیڈ کریں۔

## مزید دیکھیں

- [VM تعیناتی گائیڈ](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare سیٹ اپ
- [Fly.io تعیناتی گائیڈ](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io پر تعینات کریں
- [انوائرمنٹ کنفیگریشن](../reference/ENVIRONMENT.md) — مکمل `.env` حوالہ
