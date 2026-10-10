# 🐳 Docker Guide — OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker orqali joylashtirish bo‘yicha to‘liq ma’lumotnoma. Tezkor boshlash uchun [README faylidagi Docker bo‘limi](../README.md#-docker) bilan tanishing.

## Mundarija

- [Tezkor ishga tushirish](#quick-run)
- [Muhit fayli bilan](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Mavjud profillar](#available-profiles)
- [OmniRoute Docker ichida ishlaganda host CLI vositalarini sozlash](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis yon konteyneri](#redis-sidecar)
- [Ishlab chiqarish muhiti uchun Compose](#production-compose)
- [Dockerfile bosqichlari](#dockerfile-stages)
- [Muhim muhit o‘zgaruvchilari](#critical-environment-variables)
- [Caddy (HTTPS) bilan Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare tezkor tunneli](#cloudflare-quick-tunnel)
- [Tasvir teglari](#image-tags)
- [Mavjudlik: standart SQLite faqat bitta replika bilan ishlaydi](#availability-default-sqlite-is-single-replica)
- [Docker ichidagi Gemini hududiy xatolari](#gemini-regional-errors-inside-docker)
- [Muhim eslatmalar](#important-notes)

---

## Tezkor ishga tushirish

> **Bitta buyruq bilan o‘zingiz joylashtirmoqchimisiz?**
> [Mustaqil joylashtirish qo‘llanmasi](../getting-started/SELF_HOST_GUIDE.md) bilan tanishing —
> `docker compose -f docker-compose.selfhost.yml up -d` (e’lon qilingan tasvir +
> Redis, faqat loopback, profil tanlash talab qilinmaydi). Quyidagi tezkor ishga tushirish
> usuli Redis’ni allaqachon boshqa joyda ishlatayotgan foydalanuvchilar uchun
> mo‘ljallangan bitta konteynerli variantdir.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Muhit fayli bilan

```bash
# Avval .env faylidan nusxa oling va uni tahrirlang
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
# Asosiy profil (CLI vositalarisiz)
docker compose --profile base up -d

# CLI profili (Claude Code, Codex va OpenClaw ichki o‘rnatilgan)
docker compose --profile cli up -d

# Host profili (avvalo Linux uchun; host CLI binar fayllarini faqat o‘qish rejimida ulaydi)
docker compose --profile host up -d

# Veb-profil (veb-sessiya provayderlari uchun Chromium/Playwright)
docker compose --profile web up -d

# CLI va CLIProxyAPI yon konteynerini birlashtirish
docker compose --profile cli --profile cliproxyapi up -d
```

## Mavjud profillar

OmniRoute asosiy joylashtirish shakllari uchun Compose profillari bilan taqdim etiladi. Muhitingizga mos profilni tanlang.

| Profil            | Xizmat           | Qachon foydalanish kerak                                                                                                                                                   | Buyruq                                       |
| ----------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standart) | `omniroute-base` | Grafiksiz server / minimal bajarish muhiti, provayder CLI vositalari kiritilmagan                                                                                          | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` va ichki CLI vositalarini (Codex, Claude Code, Droid, OpenClaw) chaqiradigan agentli ish jarayonlari                                    | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` va boshqalarni faqat o‘qish rejimida ulash orqali host CLI vositalariga `network_mode` uslubida kirishni istaydigan Linux hostlari | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Yuqori oqimdagi CLI proksilash uchun [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) yon konteynerini `8317` portida ishga tushirish                           | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Brauzer talab qiladigan veb-sessiya provayderlari: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` yaratiladi, Chromium kiritilgan)                           | `docker compose --profile web up -d`         |

> Bir nechta profilni birlashtirish mumkin: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker ichida ishlaganda host CLI vositalarini sozlash

`omniroute setup-codex`, `setup-claude`, `config set <tool>` va boshqaruv panelidagi
**Konfiguratsiyani saqlash** tugmasi `~/.codex/*.config.toml` kabi fayllarga yozadi. Bu yoʻllar
faqat CLI amalda ishlayotgan kompyuterda maʼnoga ega. Ularni konteyner ichida
ishga tushirsangiz, maʼlumot konteynerning oʻz uy katalogiga (`/home/node` —
obraz `USER node` sifatida ishlaydi) yoziladi; hostdagi hech bir CLI uni oʻqimaydi va konteyner
qayta yaratilishi bilan u oʻchirib yuboriladi.

OmniRoute buni aniqlaydi va foydalana olmaydigan muvaffaqiyat haqida xabar berish oʻrniga,
koʻrsatmalar bilan yozishni rad etadi: CLI `2` kodi bilan tugaydi, API esa
`containerEphemeralTarget: true` bilan `422` javobini qaytaradi.

### Tavsiya etiladi: CLIʼni hostda, OmniRouteʼni Docker ichida ishga tushiring

Konteyner APIʼni taqdim etadi; CLI esa host vositalaringizni sozlaydi.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLIʼni konteynerga yoʻnaltirish
omniroute setup-codex                      # hostdagi haqiqiy ~/.codex katalogiga yozadi
```

Codex, Claude Code, Cursor yoki shunga oʻxshash vositalar noutbukingizda
ishlasa, bu toʻgʻri tanlovdir — odatda aynan shunday sozlanadi.

### Muqobil usul: host konfiguratsiya kataloglarini bind-mount qilish (`host` profili)

Agar konteynerning oʻzi host konfiguratsiyangizga yozishini istasangiz,
kataloglarni ulang va `CLI_CONFIG_HOME` qiymatini ulashning ildiz katalogiga yoʻnaltiring. `host` profili
buni allaqachon bajaradi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount yoʻlning ishonchliligini taʼminlaydi: OmniRoute
`/proc/self/mountinfo` faylini oʻqiydi va ulangan yoʻllarga (shuningdek, ichki kataloglari
ulangan kataloglarga — yuqoridagi `/host-home` tuzilishi aynan shunday) yozishga
ruxsat beradi, ulanmagan yoʻllarga yozishni esa rad etishda davom etadi.

### Istisno usuli: konteynerning oʻz CLIʼlarini sozlash (ehtiyotkorlik bilan foydalaning)

CLIʼlar haqiqatan ham konteyner ichida joylashgan boʻlsa (`cli` profili), yozish
ataylab bajariladi. Istalgan `setup-*` buyrugʻiga `--allow-container-write` parametrini uzating yoki server uchun
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` qiymatini oʻrnating. Yozish amali
konteyner qayta yaratilganda saqlanib qolmasligi haqidagi ogohlantirish bilan bajariladi.

> **Xavfsizlik ogohlantirishi — `cli` profili + `docker.sock` ulanishi.**
> Konteyner ichidagi avtomatik yangilovchi host demonidan foydalanib stekni qayta yarata olishi uchun
> `cli` profili `/var/run/docker.sock` faylini bind-mount qiladi
> (`src/lib/system/autoUpdate.ts` ushbu soket mavjudligini tekshiradi va u
> mavjud boʻlmasa, Docker yoʻlini oʻtkazib yuboradi). Bu soket **hostdagi root darajasidagi ishonch
> chegarasi** hisoblanadi: unga kira oladigan har qanday narsa host Docker demonini
> root sifatida boshqaradi — u hostdagi istalgan konteynerni yaratishi, tekshirishi,
> toʻxtatishi va olib tashlashi mumkin. Buning oqibatlari:
>
> 1. **`cli` profilining portini hech qachon tarmoqqa ochmang.** Uni
>    `127.0.0.1` manzilida eʼlon qiling (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN orqali foydalanish mumkin boʻlgan `cli` profili boshqaruv paneli darajasidagi har qanday RCEʼni
>    hostning toʻliq buzib kirilishiga aylantiradi.
> 2. **`cli` profiliga hostning boshqa kataloglarini bind-mount qilmang.**
>    Docker soketi va har qanday qoʻshimcha ulanish konteynerga fayl tizimingiz hamda host
>    konfiguratsiyangizni toʻliq oʻqish/yozish imkonini beradi. Agar vosita loyihani
>    koʻrishi kerak boʻlsa, uni CLI ikkilik fayli orqali lokal ravishda ishga tushiring — loyihani
>    `cli` konteyneriga ulamang.
>
> Agar konteyner ichidagi avtomatik yangilash kerak boʻlmasa, `cli` profilini oʻchiq qoldiring
> (`COMPOSE_PROFILES=core,redis` yoki qisqaroq variant). Boshqa profillar
> Docker soketini ulamaydi.
>
> MITM bilan bogʻliq tahdid modeli uchun `docs/security/MITM-TPROXY-DECRYPT.md` fayliga (gitʼda mavjud; `/docs` ichiga kompilyatsiya qilinmaydi),
> `codex`/`claude-code`/`droid`/`openclaw` ikkilik fayllarining kelib chiqish zanjiri uchun esa
> `docs/security/SUPPLY_CHAIN.md` fayliga qarang.

## Redis saydkari

OmniRoute taqsimlangan soʻrovlar tezligini cheklagich va umumiy kesh uchun Redisʼdan foydalanadi. `redis` xizmati `docker-compose.yml` faylida **har doim belgilangan** (u profil bilan cheklanmagan) va boshqa istalgan profil bilan birga ishga tushadi.

| Tafsilot                           | Qiymat                                           |
| ---------------------------------- | ------------------------------------------------ |
| Tasvir                             | `redis:7-alpine`                                 |
| Konteyner nomi                     | `omniroute-redis`                                |
| Ichki port                         | `6379`                                           |
| Xost porti (qayta belgilash)       | `REDIS_PORT` (standart qiymati `6379`)           |
| Xost bogʻlanishi (qayta belgilash) | `REDIS_BIND_HOST` (standart qiymati `127.0.0.1`) |
| Jild                               | `omniroute-redis-data` → `/data`                 |
| Holat tekshiruvi                   | `redis-cli ping` (10 soniyalik interval)         |

Tegishli muhit oʻzgaruvchilari:

- `REDIS_URL` — ilovaga kiritiladigan ulanish qatori (standart qiymati `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri uchun xost tomonidagi port moslamasi.
- `REDIS_BIND_HOST` — port eʼlon qilinadigan xost interfeysi. Standart qiymati `127.0.0.1`.

> **Nima uchun standart holatda loopback ishlatiladi:** saydkar `requirepass`siz ishlaydi va ilova
> konteynerlari unga compose tarmogʻi (`redis:6379`) orqali ulanadi — eʼlon qilingan port
> faqat xost tomonidagi vositalar (`redis-cli`, mahalliy `npm run dev`) uchun moʻljallangan.
> Uni `0.0.0.0` manzilida eʼlon qilish autentifikatsiyasiz Redisʼni LAN tarmogʻingizdagi
> har bir xost uchun ochib qoʻyadi. Agar `REDIS_BIND_HOST=0.0.0.0` qiymatini oʻrnatsangiz,
> xizmatning `command:` qatoriga `--requirepass`ni ham qoʻshing.

**Redisʼni oʻchirib qoʻyish** tavsiya etilmaydi (soʻrovlar tezligini cheklagich xotiradagi zaxira mexanizmiga oʻtadi). Agar buni qilish majburiy boʻlsa, `docker-compose.yml` faylidagi `redis:` xizmat blokini olib tashlang/izohga aylantiring yoki uning masshtabini nolga tushiring:

```bash
docker compose up -d --scale redis=0
```

## Ishlab chiqarish Compose konfiguratsiyasi

Dasturlash muhiti bilan yonma-yon ishlaydigan izolyatsiyalangan ishlab chiqarish nusxasi uchun `docker-compose.prod.yml` faylidan foydalaning.

| Tafsilot                            | Qiymat                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| Fayl                                | `docker-compose.prod.yml`                                                         |
| Boshqaruv panelining standart porti | `PROD_DASHBOARD_PORT=20130` (ichki `${DASHBOARD_PORT:-20128}` portiga moslangan)  |
| APIʼning standart porti             | `PROD_API_PORT=20131`                                                             |
| Tasvir                              | `omniroute:prod` (`runner-cli` maqsadidan yigʻilgan)                              |
| Redis konteyneri                    | `omniroute-redis-prod` (`redis:8.6.2`, alohida `redis-prod-data` jildi)           |
| Maʼlumotlar jildi                   | `omniroute-prod-data` (nomlangan, qayta yigʻishlar orasida saqlanadi)             |
| Holat tekshiruvlari                 | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` Redis holatiga bogʻlangan |

Foydalanish tartibi:

```bash
# Ishlab chiqarish stekini yigʻish va ishga tushirish
docker compose -f docker-compose.prod.yml up -d --build

# Loglarni uzluksiz koʻrish
docker compose -f docker-compose.prod.yml logs -f

# Toʻxtatish va olib tashlash (jildlarni saqlab qolish)
docker compose -f docker-compose.prod.yml down
```

Ishlab chiqarish steki dasturlash compose konfiguratsiyasi bilan parallel ravishda ishlaydi (konteyner nomlari, portlar va jildlar boshqacha), shu sababli ishlab chiqarish muhiti ishlashda davom etayotgan paytda mahalliy ishlab chiqishni davom ettirishingiz mumkin.

## Dockerfile bosqichlari

Repozitoriy ko‘p bosqichli Dockerfile (`Dockerfile`) bilan taqdim etiladi. To‘rtta bosqich mavjud; foydalanish holatingizga mos `target`ni tanlang.

| Bosqich       | Asosiy tasvir         | Maqsad                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Bog‘liqliklarni o‘rnatadi (`npm ci --legacy-peer-deps`) va `npm run build`ni ishga tushiradi (standart holatda Turbopack — quyidagi Qurish vaqtidagi resurslar bo‘limiga qarang)                                                                                                                          |
| `runner-base` | `node:26-trixie-slim` | Next.js mustaqil chiqishi bilan ishlab chiqarish muhiti. **Provayder CLI vositalari kiritilmagan.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` va global CLI vositalarini qo‘shadi: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agentli ish jarayonlari uchun shuni tanlang.**                                                                                                             |
| `runner-web`  | `runner-base`         | Veb-sessiya provayderlari uchun Playwright va Chromium brauzerini (`--with-deps`) qo‘shadi: `gemini-web`, `claude-web`, `claude-turnstile`. **Ushbu provayderlardan foydalansangiz, shuni tanlang** — oddiy tasvirsiz so‘rov vaqtida xatolik yuz beradi (Reliz kanallari ostidagi `-web` izohiga qarang). |

Muayyan targetni qo‘lda quring:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Qurish vaqtidagi resurslar

Uchta qurish argumenti `builder` bosqichining resurs sarfini boshqaradi. Ular faqat qurish vaqtida amal qiladi —
`OMNIROUTE_MEMORY_MB` (quyida) esa alohida, bajarilish vaqtiga oid sozlamadir.

| Qurish argumenti            | Standart qiymat | Ta’siri                                                                                                             |
| --------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`             | `0` webpack bilan quradi: xotiraning eng yuqori sarfi kamroq, lekin sekinroq. `1` Turbopackdan foydalanadi.         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | Ishga tushirilgan `next build` uchun V8 heap chegarasi (`--max-old-space-size`).                                    |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | `CIRCLE_NODE_TOTAL`ga uzatiladi; Next sahifa ma’lumotlarini yig‘ish uchun `workers = N - 1` qiymatini hosil qiladi. |

`OMNIROUTE_BUILD_WORKERS` — katta quvvatli qurish muhitida oshiriladigan va resurslari
cheklangan qurish jarayoni `✓ Compiled successfully`dan **keyin** to‘xtab qolsa,
shubha qilinishi kerak bo‘lgan parametrdir. Har bir sahifa ma’lumotlari worker’i
alohida jarayon bo‘lib, asosiy `next build`ning o‘zi ham alohida jarayondir;
VPSdagi amaliy takrorlashda (issue #7518) har bir jarayonning eng yuqori RSS
ko‘rsatkichi `NODE_OPTIONS` heap bayrog‘idan qat’i nazar ~4.5 GB ekani o‘lchandi
(Turbopack V8 heap’idan tashqaridagi mahalliy/Rust xotirasida kompilyatsiya qiladi).
Standart `2` qiymati (→ 1 ta worker, jami 2 ta jarayon) nashr qilish konveyeri
foydalanadigan 16 GB / 4 vCPU GitHub-hosted runner’lar uchun mo‘ljallangan.
`8` qiymatida (→ 7 ta worker) o‘sha runner xotirasi tugadi va buildkit bosqichni
`ResourceExhausted: ... cannot allocate memory` xatosi bilan yakunladi;
har bir jarayonning RSS ko‘rsatkichi taxmin qilish o‘rniga bevosita o‘lchangach,
`3` qiymati (→ 2 ta worker) ham sig‘madi.
`tests/unit/docker-build-memory-budget.test.ts` o‘lchangan qiymat asosida hisob-kitob
qiladi va parametrlardan birortasi runner imkoniyatidan oshib ketsa, test
muvaffaqiyatsiz tugaydi.

Turbopack V8 heap’idan **tashqarida** joylashgan mahalliy Rust xotirasida
kompilyatsiya qiladi, shu sababli `OMNIROUTE_BUILD_MEMORY_MB` uni cheklamaydi.
Xotira chegarasi mavjud hostda qurish jarayoni OOM killer tomonidan hech qanday
xato matnisiz SIGKILL qilinadi — u shunchaki `Creating an optimized production build`
jarayonining o‘rtasida to‘xtaydi va bu xotira yetishmovchiligidan ko‘ra osilib
qolgandek ko‘rinadi. Shu sababli, Turbopack koddagi standart qiymat bo‘lgan
`npm run dev` / `npm run build`dan farqli ravishda, `Dockerfile` standart holatda
webpackdan (`OMNIROUTE_USE_TURBOPACK=0`) foydalanadi: qurish argumentlarisiz oddiy
`docker build .` (Railway va boshqa bir bosishda ishga tushiriladigan hostlar
bajaradigan buyruq) xotirasi cheklangan qurish muhitida jim tarzda to‘xtab
qolmasligi kerak. Nashr etilgan tasvirlar `docker-publish.yml`da
`OMNIROUTE_USE_TURBOPACK=0`ni allaqachon aniq uzatadi. Yetarli RAMga ega qurish
muhitida tezroq qurish uchun Turbopackdan foydalaning:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` yoqilgan, shuning uchun `next build` asosiy **va** worker
jarayonini ishga tushiradi hamda ularning har biri `OMNIROUTE_BUILD_MEMORY_MB`
qiymatiga alohida rioya qiladi. Konteyner chegarasini ushbu qiymatdan bir marta
emas, taxminan ikki marta katta qilib belgilang.

Ushbu daraxtda o‘lchangan (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Konteyner chegarasi | Natija                                                     |
| --------- | ------------------- | ---------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | Ikkalasida ham OOM orqali jim o‘chirildi                   |
| webpack   | 8 GiB               | Qurish worker’i SIGKILL qilindi                            |
| webpack   | 12 GiB              | Muvaffaqiyatli yakunlandi, eng yuqori sarf 11.1 GiB bo‘ldi |

### Bajarilish vaqtidagi standart sozlamalar

`runner-base` eksport qiladigan standart qiymatlar: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker’dagi xotira ishlashi:

- Tasvir `OMNIROUTE_MEMORY_MB=1024` qiymatini o‘rnatadi va undan `NODE_OPTIONS=--max-old-space-size=1024` qiymatini hosil qiladi.
- Amaldagi server jarayoni `OMNIROUTE_MEMORY_MB` qiymatini o‘qiydigan va `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` parametrini qo‘shadigan mustaqil ishga tushirgich tomonidan ishga tushiriladi.
- Node takrorlangan `--max-old-space-size` qiymatlarining oxirgisidan foydalanadi, shu sababli `OMNIROUTE_MEMORY_MB` qiymatini o‘rnatish Docker uchun amaldagi heap cheklovini boshqaradi.
- Tasvir bu qiymatni doimo o‘rnatgani sababli, Docker muhitida ishga tushirgichning RAM hajmiga moslashtirilgan zaxira qiymati hech qachon qo‘llanmaydi. Ish yuklamasi uchun uni aniq oshiring (quyidagi jadval). Kod yozish agentlarining `/v1/responses` so‘rovlari uchun `2048` hali ham juda kichik.

### Kod yozish agentlari uchun ish vaqtidagi RAM

Docker’ning standart 1 GiB qiymati ishlab chiqarish muhiti uchun emas, balki boshqaruv paneli/yengil chat uchun minimal chegaradir. Uzun `POST /v1/responses` tanalari (yuzlab xabarlar, o‘nlab vositalar) siqish vaqtida xotirada bir nechta grafikni saqlab turadi. Bir-birini qoplaydigan, har biri taxminan 3 MiB / 750 ming tokenli ikkita so‘rov **12 GiB** old-space hajmida V8’ning ishini to‘xtatgan (`FATAL ERROR: Reached heap limit`) va shuningdek, 16 GiB cgroup OOM chegarasiga yetgan. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ga qarang.

**cgroup `--memory` hajmini heap’dan kattaroq qilib belgilang** — mahalliy buferlar, SQLite va siqishning oraliq ma’lumotlari V8’dan tashqarida joylashadi.

| Ish yuklamasi                                     | `OMNIROUTE_MEMORY_MB`      | Konteyner / cgroup               | Izohlar                                                                                                                                                   |
| ------------------------------------------------- | -------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boshqaruv paneli, bitta yengil chat               | `1024` (tasvir standarti)  | ≥2 GiB                           |                                                                                                                                                           |
| Bitta kod yozish agenti (Claude/Codex/Grok)       | `8192`                     | ≥10 GiB                          | Odatdagi bitta seansli `/v1/responses`                                                                                                                    |
| Bir vaqtdagi ikkita uzun `/v1/responses`          | `10240`–`12288`            | ≥12–16 GiB                       | Taxminan 12 GiB heap’da V8 ishining to‘xtashi o‘lchangan                                                                                                  |
| Bir vaqtdagi uchta yoki undan ortiq uzun kontekst | bitta jarayonda ishlatmang | ketma-ket bajaring / ko‘proq RAM | Standart og‘ir yuklamali qabul qilish bir vaqtda 1 ta so‘rov bilan cheklangan; RAM’ni oshirmasdan bu chegarani ko‘tarish xatolikni qayta yuzaga keltiradi |

Oddiy serverda `omniroute serve`, `OMNIROUTE_MEMORY_MB` **o‘rnatilmagan** bo‘lsa, RAM’ning taxminan 35% ini (`[512, 4096]` oralig‘ida cheklangan) moslashtiradi. Docker doimo `1024` qiymatini o‘rnatadi, shuning uchun rasmiy tasvirda bu moslashtirish hech qachon ishga tushmaydi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Muhim muhit o‘zgaruvchilari

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) faylida hujjatlashtirilgan standart sozlamalardan tashqari, Docker ostida ishga tushirishda quyidagi o‘zgaruvchilar eng muhim hisoblanadi:

| O‘zgaruvchi                   | Maqsadi                                                                                                                                                                                                                                                                                              | Standart qiymat                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ko‘prigi uchun umumiy maxfiy kalit. **Ishlab chiqarish muhitida talab qilinadi** — kuchli tasodifiy satrga o‘rnating.                                                                                                                                                                      | o‘rnatilmagan (taqdim etilishi shart) |
| `REDIS_URL`                   | Tezlikni cheklash vositasi / kesh bekendi uchun ulanish satri                                                                                                                                                                                                                                        | `redis://redis:6379`                  |
| `REDIS_PORT`                  | Birga taqdim etiladigan Redis konteyneri uchun xost tomonidagi port                                                                                                                                                                                                                                  | `6379`                                |
| `REDIS_BIND_HOST`             | Birga taqdim etiladigan Redis porti e’lon qilinadigan xost interfeysi (AUTH qo‘shilmasa, loopback)                                                                                                                                                                                                   | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | O‘zini yangilash jarayonlari uchun `cli` profilida `/workspace/omniroute` manziliga ulangan xost yo‘li                                                                                                                                                                                               | `.` (joriy katalog)                   |
| `OMNIROUTE_MEMORY_MB`         | Docker mustaqil serveri uchun Node heap xotirasining ish vaqtidagi yuqori chegarasi; yuqoridagi tasvir standart qiymatini bekor qiladi. Dasturlash agentlari: `8192`+ ([ish vaqti RAM](#runtime-ram-for-coding-agents) bo‘limiga qarang).                                                            | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | Boshqaruv paneli (20128) va API (20129) uchun ochilgan portlarni almashtiradi                                                                                                                                                                                                                        | `20128` / `20129`                     |
| `APP_BIND_HOST`               | docker-compose boshqaruv paneli/API/jonli-WS portlarini e’lon qiladigan xost interfeysi. `REQUIRE_API_KEY=false` bo‘lganda (standart holat), `0.0.0.0` anonim `/v1` proksisini LAN tarmog‘iga ochadi — faqat `REQUIRE_API_KEY=true` bo‘lganda yoki oldida teskari proksi mavjud bo‘lsa kengaytiring. | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | docker-compose `cliproxyapi` yordamchi konteynerini e’lon qiladigan xost interfeysi — uning ma’lumotlar jildi provayder hisob ma’lumotlarini saqlaydi.                                                                                                                                               | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | Ish vaqtidagi plagin skaneri o‘qiydigan va o‘rnatadigan katalog. Plaginlar bind-mount orqali ulanganda uni o‘rnating: standart qiymat `HOME` qiymatiga bog‘liq, tasvir esa uni eksport qilmasligi mumkin.                                                                                            | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | Ilova teskari proksi ortida e’lon qilinganda ishlatiladigan URL quyi yo‘li (masalan, `/omniroute`)                                                                                                                                                                                                   | _(bo‘sh = ildiz)_                     |
| `NEXT_PUBLIC_BASE_URL`        | Quyi yo‘lni o‘z ichiga olgan ommaviy brauzer manbasi (masalan, `https://host/omniroute`)                                                                                                                                                                                                             | o‘rnatilmagan                         |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` uchun xost tomonidagi boshqaruv paneli porti                                                                                                                                                                                                                               | `20130`                               |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yordamchi konteyneri uchun xost tomonidagi port                                                                                                                                                                                                                                        | `8317`                                |

## Quyi yoʻldagi teskari proksi (Traefik / nginx)

Next.js `basePath` qiymati standalone toʻplam ichiga kompilyatsiya qilinadi. OmniRoute oldindan
oʻrnatilgan qiymatni ilova ildizidagi sentinel faylga yozadi (`npm run build` vaqtida yoziladi;
`scripts/docker/ensure-docker-base-path.mjs` tomonidan oʻqiladi) va konteyner ishga tushganda
uni `OMNIROUTE_BASE_PATH` bilan taqqoslaydi. Agar ular farq qilsa va image domen ildizi
uchun yaratilgan boʻlsa, entrypoint `node dev/run-standalone.mjs` ishga tushishidan oldin
standalone manifestlarni, ichki `basePath`/`assetPrefix` literallarini (Next 16 SSR resurs
URL manzillarini faqat `assetPrefix` asosida yaratadi — patcher quyi yoʻlni unga ham
koʻchiradi), oldindan oʻrnatilgan `/_next/static` resurs URL manzillarini (mijoz havolalari
manifestlari, media importlari, oldindan render qilingan xato sahifalari) va mijozdagi
`process.env` shimini qayta yozadi.

### Compose orqali yaratish (tavsiya etiladi)

Image va ishga tushirish muhiti bir-biriga mos kelishi uchun `.env` faylida ikkala
oʻzgaruvchini ham belgilang, soʻng qayta yarating:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` fayli `OMNIROUTE_BASE_PATH` qiymatini Docker build-arg sifatida va
ishga tushirish muhiti oʻzgaruvchisi sifatida uzatadi.

### Oldindan yaratilgan ildiz image + ishga tushirish vaqtidagi quyi yoʻl

Nashr qilingan `diegosouzapw/omniroute:*` imagelari domen ildizi uchun yaratilgan.
Shunga qaramay, ishga tushirish vaqtida `OMNIROUTE_BASE_PATH` qiymatini belgilashingiz
mumkin; konteyner ishga tushganda toʻplamni bir marta patch qiladi. Uni mos keluvchi
ommaviy origin bilan birga sozlang:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Teskari proksini tashqi yoʻlni **toʻliq** uzatadigan qilib sozlang (prefiksni olib
tashlamang). Traefik `PathPrefix(`/omniroute`)` yoʻnalishini `StripPrefix`siz konteynerga
uzatishi kerak, shunda Next.js `/omniroute/...` yoʻlini qabul qiladi va resurslarni
`/omniroute/_next/...` manzilidan taqdim etadi.

Docker healthcheck faol `OMNIROUTE_BASE_PATH` prefiksi qoʻshilgan yengil `/healthz`
hayotiy sikl endpointini tekshiradi. `/api/monitoring/health` insonlar/boshqaruv paneli
diagnostikasi uchun mavjud boʻlib qoladi; konteyner HEALTHCHECK tekshiruvini yana unga
yoʻnaltirish uchun (masalan, chuqur sogʻlomlik tekshiruvini majburiy qilish maqsadida)
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` qiymatini belgilang. Bu yoʻl
**chuqur** tekshiruvdir (DB + monitoring xulosasi) — qayta yoqishni tanlasangiz, Docker'ning
kamdan-kam bajariladigan `HEALTHCHECK` tekshiruvi uchun mos, ammo Kubernetes
`livenessProbe` intervallari uchun **mos emas**.

Orkestratorlar (Kubernetes, Nomad va boshqalar) uchun:

| Tekshiruv         | Afzal                                                                 | Saqlaning                                                                   |
| ----------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Faollik           | HTTP `GET /livez` yoki asosiy portdagi TCP (`PORT`, standart `20128`) | Faollik tekshiruvi sifatida `/api/monitoring/health`                        |
| Tayyorlik         | HTTP `GET /healthz`                                                   | Event loop bandligini ishlamay qolish deb hisoblaydigan qisqa timeoutlardan |
| Chuqur / blackbox | `/api/monitoring/health`                                              | —                                                                           |

`/healthz` jarayonning hayotiy siklini (`ok` / `starting` / `stopping`) bildiradi.
`/livez` faqat jarayon ishlayotganini tekshiradi (handler ishlay olgan har qanday holatda
200 qaytaradi; tayyorlikni kutmaydi). Har ikkisi ham soʻrovlarni qayta ishlash bilan bir
xil Node event loopida ishlaydi, shuning uchun CPU talab qiluvchi katalog yoki siqish
ishlari ularni kechiktirishi mumkin — band ≠ ishlamayapti. HTTP tekshiruvlarida timeout
yuz bersa, TCP faollik tekshiruvini afzal koʻring. Tekshiruvlar boʻyicha toʻliq koʻrsatma:
[Monitoring qoʻllanmasi — Kubernetes tekshiruvlari boʻyicha tavsiyalar](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy bilan Docker Compose (HTTPS Auto-TLS)

OmniRoute’ni Caddy’ning avtomatik SSL sozlashi yordamida xavfsiz tarzda tashqi tarmoqqa ochish mumkin. Domeningizning DNS A yozuvi serveringiz IP manziliga yoʻnaltirilganiga ishonch hosil qiling.

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
      # OAuth qayta chaqiruvlari, boshqaruv paneli havolalari va yaratilgan ommaviy URL manzillari uchun brauzerga yoʻnaltirilgan origin.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Rejalashtirilgan vazifalar / oʻziga yuboriladigan soʻrovlar uchun ichki serverdan serverga URL manzili.
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

Caddy yuqori oqimdagi konteyner uchun standart yoʻnaltirish sarlavhalarini oʻrnatadi. OmniRoute OAuth qayta chaqiruvlari va yaratilgan ommaviy havolalar uchun
`NEXT_PUBLIC_BASE_URL` qiymatidan kanonik ommaviy origin sifatida foydalanadi;
autentifikatsiyadan oʻtgan boshqaruv panelidagi yozish amallari bir xil origin soʻrovlari hamda sessiyaga bogʻlangan CSRF
himoyasidan foydalanadi. `OMNIROUTE_TRUST_PROXY` parametrini faqat OmniRoute ommaviy origin’ni aniq
konfiguratsiya oʻrniga ishonchli yoʻnaltirilgan sarlavhalardan olishini ataylab xohlaydigan ilgʻor joylashtirishlarda yoqing.

## Cloudflare Quick Tunnel

Docker joylashtirishlari uchun boshqaruv paneli `Dashboard → Endpoints` sahifasida bir marta bosish orqali yoqiladigan **Cloudflare Quick Tunnel** imkoniyatini oʻz ichiga oladi. Birinchi marta yoqilganda `cloudflared` faqat zarur boʻlsa yuklab olinadi, joriy `/v1` endpoint’ingizga vaqtinchalik tunnel ishga tushiriladi va yaratilgan `https://*.trycloudflare.com/v1` URL manzili odatiy ommaviy URL manzilingiz ostida bevosita koʻrsatiladi.

Endpoint tunnel panellarini (Cloudflare, Tailscale, ngrok) faol tunnel holatini oʻzgartirmasdan `Settings → Appearance` orqali koʻrsatish yoki yashirish mumkin.

### Tunnel boʻyicha eslatmalar

- Quick Tunnel URL manzillari vaqtinchalik boʻlib, har bir qayta ishga tushirishdan keyin oʻzgaradi.
- Quick Tunnel’lar OmniRoute yoki konteyner qayta ishga tushirilgandan keyin avtomatik tiklanmaydi. Zarur boʻlganda ularni boshqaruv panelidan qayta yoqing.
- Boshqariladigan oʻrnatish hozirda Linux, macOS va Windows’ni `x64` / `arm64` arxitekturalarida qoʻllab-quvvatlaydi.
- Boshqariladigan Quick Tunnel’lar cheklangan konteyner muhitlarida QUIC UDP buferi haqidagi ortiqcha ogohlantirishlarning oldini olish uchun standart holatda HTTP/2 transportidan foydalanadi. Boshqa transportni xohlasangiz, `CLOUDFLARED_PROTOCOL=quic` yoki `auto` qiymatini oʻrnating.
- Docker tasvirlari tizim CA ildiz sertifikatlarini oʻz ichiga oladi va ularni boshqariladigan `cloudflared` jarayoniga uzatadi, bu tunnel konteyner ichida ishga tushirilganda TLS ishonch xatolarining oldini oladi.
- OmniRoute yangi binar faylni yuklab olish oʻrniga mavjud binar fayldan foydalanishini istasangiz, `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` qiymatini oʻrnating.

## Tasvir teglari

| Tasvir                   | Teg      | Hajmi  | Tavsif                                                          |
| ------------------------ | -------- | ------ | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Eng yuqori **eʼlon qilingan** barqaror SemVer (git `main` emas) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps uchun ushbu turdagi tegni aniq belgilab qoʻying          |

Koʻp platformali manifest: mahalliy `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker mos arxitekturani avtomatik tanlaydi; ARM xostlarida AMD64 emulyatsiyasini majburan ishlatish zarur boʻlsa, `--platform linux/amd64` parametrini uzating.

### Reliz kanallari

OmniRoute barqaror relizlar, faol reliz tarmogʻini sinash va ishlab chiqish yigʻilmalari uchun alohida Docker kanallarini eʼlon qiladi.

| Kanal                           | Manba                                         | Oʻzgaruvchanlik                          | Tavsiya etilgan foydalanish                                                                                                                 |
| ------------------------------- | --------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Imzolangan/versiyalangan reliz                | Oʻzgarmas                                | Aniq relizga mahkamlangan ishlab chiqarish joylashtirishlari                                                                                |
| `:latest` / `:latest-web`       | Eng yuqori **eʼlon qilingan** barqaror SemVer | Oʻzgaruvchan barqaror koʻrsatkich        | SemVer eʼlon qilish vazifasidan **keyin** barqaror relizlarni kuzatadi — `main` yoki eʼlon qilinmagan `release/v*` commit’larini kuzatmaydi |
| `:next` / `:next-web`           | Joriy standart `release/v*` tarmogʻi          | Oʻzgaruvchan relizoldi koʻrsatkichi      | Faol reliz tarmogʻiga qoʻshilgan, ammo hali barqaror relizga kiritilmagan tuzatishlarni sinash                                              |
| `:main` / `:main-web`           | `main` tarmogʻi                               | Oʻzgaruvchan ishlab chiqish koʻrsatkichi | Faqat ishlab chiqish va integratsion sinovlar                                                                                               |

#### Veb-sessiya provayderlari: `-web` tasvirlari

Yuqoridagi har bir kanal `runner-web` bosqichidan yigʻilgan `-web` tegiga (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ham ega — bu xuddi shu tasvirga Playwright va Chromium brauzeri qoʻshilgan variantdir. Oddiy tasvir Chromium’siz yetkazib beriladi; `gemini-web`, `claude-web` va `claude-turnstile` uchun u zarur.

Xatolik ishga tushirish vaqtida emas, keyinroq yuz beradi: ushbu provayderlar oʻz modellarini roʻyxatga kiritadi va boshqaruv panelida ulangan sifatida koʻrinadi, faqat birinchi soʻrov quyidagi xatolik bilan muvaffaqiyatsiz tugaydi:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Agar ushbu provayderlardan foydalansangiz, hozir foydalanayotgan kanalingizning `-web` tegini yuklab oling — boshqa hech narsa oʻzgarmaydi. npm/CLI orqali oʻrnatishda (Docker tasvirisiz) yetishmayotgan ekvivalent qism brauzer binar faylidir: xostda `npx playwright install chromium` buyrugʻini bajaring.

#### Relizoldi kanalidan foydalanish

`next` kanali joriy standart `release/v*` tarmogʻiga har bir push amalga oshirilganda qayta yigʻiladi va AMD64 hamda ARM64 uchun eʼlon qilinadi. Eski texnik xizmat koʻrsatish tarmoqlari uning ustiga yozolmaydi. Bu kanal keyingi barqaror teg yaratilishidan oldin faol reliz tarmogʻiga birlashtirilgan tuzatishlarni oʻz ichiga olgan yuklab olinadigan tasvirni taqdim etadi.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose uchun tanlangan profil ishlatadigan tasvir tegini almashtiring, soʻng servisni yuklab olib, qayta yarating:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Xavfsizlik va ortga qaytarish

`next` — oʻzgaruvchan dastlabki reliz kanali. U faol reliz tarmogʻiga har qanday push amalga oshirilganda oʻzgarishi mumkin va **ishlab chiqarish muhitida foydalanish uchun qoʻllab-quvvatlanmaydi**. Muayyan yigʻilishni baholash davomida tasvir dayjestini mahkamlab qoʻying:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sinovdan oldin OmniRoute maʼlumotlar jildining yoki bind-mounted maʼlumotlar katalogining zaxira nusxasini yarating. Ortga qaytarish uchun avval ishlatilgan barqaror versiya yoki dayjestni tiklang va konteynerni qayta yarating:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Reliz tarmogʻidagi yigʻilish hech qachon `latest`ni siljita olmaydi; barqaror koʻrsatkichni faqat talablarga javob beradigan barqaror semantik versiya yangilashi mumkin. `next` tasvirlarida reliz tasvirini tekshirish va CRITICAL darajadagi zaifliklarni bloklash nazorati saqlanib qoladi.

**`latest` git uchun dolzarblik kafolati emas.** `main` yoki faol `release/v*` tarmogʻiga birlashtirilgan tuzatishlar barqaror SemVer tasviri eʼlon qilinib, eʼlon qilish vazifasi `:latest`ni yangilamaguncha (oʻsha SemVer bilan bir xil dayjestga) `:latest` tarkibiga kirmaydi. GitHub tuzatish allaqachon mavjudligini koʻrsatayotgan boʻlsa-yu, `latest` oʻzgarmayotgandek koʻrinsa, reliz tarmogʻini sinash uchun `:next`ni yuklab oling yoki SemVer tegini kuting.

| Maqsadingiz                                                                                    | Foydalaning                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Ogʻishlarga yoʻl qoʻymaslik kerak boʻlgan GitOps / ishlab chiqarish muhiti                     | `:X.Y.Z`ni (yoki tasvir dayjestini) mahkamlang |
| Eʼlon qilingan barqaror versiyalarni kuzatish va har bir relizda qayta yaratishga rozi boʻlish | `:latest`                                      |
| Eʼlon qilinmagan `release/v*` commitlarini sinash                                              | `:next` (ishlab chiqarish muhiti uchun emas)   |
| `main`ni sinash                                                                                | `:main` (ishlab chiqarish muhiti uchun emas)   |

## Mavjudlik: standart SQLite faqat bitta replikani qoʻllaydi

Standart Docker / Kubernetes OmniRoute — **bitta Node jarayoni + bitta SQLite yozuvchisi**. Bu topologiyada yuqori mavjudlik **qoʻllab-quvvatlanmaydi**.

| Cheklov                                                                | Oqibat                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bitta yozuvchi                                                         | Bitta SQLite fayli bilan bir nechta replikani **ishga tushirmang**. Bu maʼlumotlar bazasini buzadi.                                                                                                                                                                                                                                                           |
| Qayta yaratish / qayta ishga tushirish / HEALTHCHECK orqali toʻxtatish | Jarayondagi SSE ulanishlari, boshqaruv paneli seanslari va xotiradagi holat **toʻliq uziladi**. Har bir ulangan mijoz uzilib qoladi. Endpoint mavjud boʻlmagan vaqt oraligʻidagi yangi soʻrovlar OmniRoute JSON emas, balki reverse-proxy **`502 Bad Gateway: Unknown error`** javobini oladi — mijozlar buni provayder nosozligidan ajrata olmaydi (#11015). |
| `/healthz` bilan bir xil hodisalar sikli                               | Band katalog yoki siqish sikli tekshiruvlarni kechiktirishi mumkin; qisqa timeout natijasida **yagona** replika qayta ishga tushiriladi.                                                                                                                                                                                                                      |

**Tekshiruv matritsasi** (shuningdek, [Kubernetes tekshiruvi boʻyicha tavsiyalar](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)ga qarang):

| Tekshiruv               | Nishon                                                            | Ishlatmang                                                                        |
| ----------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Faollik                 | `PORT` orqali TCP (standart `20128`) yoki yumshoq HTTP `/healthz` | `/api/monitoring/health`                                                          |
| Tayyorlik               | HTTP `GET /healthz`                                               | Hodisalar siklining bandligini ishlamay qolish deb baholaydigan qisqa timeoutʼlar |
| Chuqur / insonlar uchun | `/api/monitoring/health`                                          | Avtomatlashtirilgan kubelet faollik tekshiruvi                                    |

**Yangilashlar:** har bir seans uzilishini kuting. Imkon boʻlsa, mijozlar oqimini oldindan toʻxtating; standart SQLite bilan bosqichma-bosqich yangilash mavjud emas. Composeʼdagi `restart: unless-stopped` va Docker `HEALTHCHECK` ham konteyner Unhealthy holatiga oʻtganda yagona jarayonni almashtiradi — taʼsir doirasi bir xil.

**Bitta replika** uchun Kubernetes parchasi (Recreate talab qilinadi; bitta SQLite fayli bilan `replicas` qiymatini oshirmang):

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

`preStop` kutishi SIGTERM yuborilishidan oldin kubeʼga Service endpointlarini olib tashlash imkonini beradi, shunda **yangi** trafik toʻxtayotgan jarayonga yoʻnaltirilmaydi. Jarayondagi `/v1/responses` SSE ulanishlari katta resursli qabul qilish ijaralari orqali `SHUTDOWN_TIMEOUT_MS` muddatigacha (standart 30 soniya) yakunlanishi kutiladi (#11015). Jarayonga baribir yetib kelgan yangi soʻrovlar `503` + `Retry-After: 5` javobini oladi. Almashtiruvchi replika Ready holatiga kelgunicha Recreate sababli yuzaga keladigan endpointsiz oraliq toʻliq uzilish boʻlib qoladi — bu tekshiruvning notoʻgʻri sozlanishi emas, balki SQLite topologiyasining xususiyatidir.

Tashqi Postgres / koʻp yozuvchili HA **hujjatlashtirilgan standart usul emas**. Agar sizga HA kerak boʻlsa, bitta replikadan foydalaning yoki loyiha alohida sinovdan oʻtkazib, hujjatlashtirgan topologiyani ishga tushiring. Postgres/MySQL boʻyicha ishlar [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)da olib borilmoqda. Bu imkoniyat chiqarilmaguncha, **katta** `/v1/responses` sigʻimini oshirishning qoʻllab-quvvatlanadigan yagona usuli — bitta volumeʼda `replicas > 1` emas, balki N ta mustaqil jarayon (keyingi boʻlim).

## Masshtablash: N ta mustaqil jarayon

Bitta Node jarayoni — **bitta V8 heap**. Bir-birini qoplaydigan ikkita ~3 MiB / ~750k-tokenli kodlash agentining `POST /v1/responses` soʻrovi (RTK + Caveman) ~12 Gi da ushbu heap ishini toʻxtatadi (`FATAL ERROR: Reached heap limit`) va 16 Gi cgroupʼda OOM holatiga olib kelishi mumkin. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ga qarang. Bu oʻlchov bir vaqtda bajariladigan uzoq `/v1/responses` soʻrovlari uchun mahsulotning qatʼiy maksimumi ikkita ekanini emas, balki **xotira budjeti** haqidagi ogohlantirishni bildiradi. Ogʻir chatlarni qabul qilish avtomatik hisoblab chiqariladigan kiruvchi baytlar budjeti (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) orqali boshqariladi; u aynan shu V8/cgroup chegarasi asosida oʻlchamlanadi — allaqachon oʻlchamlangan jarayonda uni kattaroq qiymat bilan almashtirish (yoki eski `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` soʻrovlar soni cheklovini oʻrnatish) jarayonning toʻxtab qolish xavfini qaytaradi. Kichik chatlar, `/healthz`, `/v1/models` va MCP bu cheklovga **kirmaydi**.

### Bitta jarayon: ikkitadan ortiq uzoq `/v1/responses`

**Sogʻlom** jarayon (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` qiymatidan past, standart qiymati `0.75`) jarayon miqyosidagi bajarilayotgan soʻrovlar bayt budjetida (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hali joy boʻlsa, bir vaqtning oʻzida ikkitadan ortiq uzoq `POST /v1/responses` soʻrovini bajarishi **mumkin**. Hajmi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` qiymatiga teng yoki undan katta boʻlgan soʻrov tanalari (standart qiymati 256 KiB) tuzilmasi murakkab soʻrovlar bilan bir xil ogʻir ish ijarasini egallaydi va ayni [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` istisnosidan (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) foydalanadi. Bir vaqtning oʻzida oʻnlab uzoq SSE mijozlarini ishlatish (operatorlarga koʻpincha 40–50 ta kerak boʻladi) — mahsulotning qatʼiy “maksimum 2 ta” cheklovi emas, balki **xotira budjeti** masalasidir: heap + asosiy/zaxira slotlar + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` oʻlchamlarini moslang. Bosim ostidagi heap #7849 holati qaytmasligi uchun soʻrovlarni qayta urinish mumkin boʻlgan `503` javobi bilan rad etishda davom etadi.

Heapʼlarni (mustaqil V8 old-spaceʼlarini) **koʻpaytirish** uchun **hozir**:

| Bajaring                                                                                                                                                                                                           | Bajarmang                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Har biri oʻzining alohida `DATA_DIR` / jildiga ega boʻlgan **N ta konteyner/pod** ishga tushiring                                                                                                                  | Bitta SQLite fayli uchun `replicas > 1` oʻrnating                             |
| Bir vaqtda bajariladigan ogʻir ishlar + sogʻlom zaxira hajmini heap / bajarilayotgan soʻrovlar bayt budjeti asosida belgilang; 1–2 — qatʼiy mahsulot maksimumi emas, balki #7849 uchun konservativ standart qiymat | Bitta jarayonga 8× RAM va cheklanmagan son limitini bering                    |
| Ixtiyoriy: **umumiy kvota hisoblagichlari** uchun `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                                             | Redisʼni umumiy SQLite deb hisoblamang — u bunday emas                        |
| Provayder sirlarini har bir nusxaga koʻchiring (yoki alohida boshqaruv panellariga rozi boʻling)                                                                                                                   | Nusxalar orasida bitta boshqaruv paneli / bitta chaqiruv jurnalini kutmang    |
| Oldiga istalgan yuklamani muvozanatlagichni qoʻying; API kaliti yoki sessiya boʻyicha biriktirish yetarli                                                                                                          | Muayyan yetkazib beruvchiga xos, hajmdan xabardor middlewareʼni talab qilmang |

Uskuna: har bir nusxada bir vaqtda bajariladigan uzoq `/v1/responses` soʻrovlari soni — **xotira budjeti** masalasi (heap + bajarilayotgan soʻrovlar baytlari / #10110). Alohida `DATA_DIR`larga ega `N` ta nusxa baribir heapʼlarni koʻpaytiradi: xost RAMʼi “N=8 boʻlgan bitta 16 Gi pod”ni emas, `N × cgroup` hajmini sigʻdirishi kerak. Bitta SQLite faylida hech qachon `replicas > 1` ishlatmang.

Compose namunasi (ikkita heap, ikkita jild — `deploy.replicas: 2` emas):

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

Jarayon ichidagi zichlik (siqishni HTTP isolateʼdan tashqariga chiqarish) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) da. Umumiy doimiy holatdagi bitta mantiqiy klaster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) da.

## Docker ichidagi Gemini mintaqaviy xatolari

Google AI Studio / Gemini API `FAILED_PRECONDITION` bilan HTTP 400 va
`API’dan foydalanish uchun foydalanuvchi joylashuvi qoʻllab-quvvatlanmaydi.` xabarini qaytarishi mumkin. Xostdagi muvaffaqiyatli soʻrov
konteyner ham ayni chiquvchi marshrutdan foydalanishini isbotlamaydi. DNS tartibi,
IPv4/IPv6 ulanishi, VPN marshrutlash va sozlangan proksilar farq qilishi mumkin.
[Google qoʻllab-quvvatlaydigan mintaqalar](https://ai.google.dev/gemini-api/docs/available-regions)
hamda haqiqiy ulanish marshrutini tekshiring; bu xatoning oʻzi API kaliti notoʻgʻri ekanini bildirmaydi.

### Muayyan ulanish uchun proksini afzal koʻring

Taʼsirlangan Gemini ulanishi uchun OmniRoute’ning
[har bir ulanish uchun proksi konfiguratsiyasi](../ops/PROXY_GUIDE.md#4-level-proxy-system)dan
foydalaning, soʻng **Ulanishni sinash** va ayni model bilan kichik soʻrovni takrorlang.
Bu marshrut oʻzgarishini faqat shu ulanish doirasida saqlaydi. Proksiga konteynerdan
ulanish mumkinligini va ulanish haqiqatan ham uni tanlayotganini tekshiring.
Marshrutni oʻzgartirish yuqori oqim xizmatining mintaqaviy muvofiqligini kafolatlamaydi.

### Xost va konteyner tarmogʻini taqqoslang

Autentifikatsiyalangan natijalarni taqqoslashda kalit, model va soʻrovni bir xil saqlang;
hisobotga hech qachon hisob maʼlumotlari, proksi parollari yoki toʻliq avtorizatsiya
sarlavhalarini joylamang. Avval xostda va konteyner ichida ayni buyruqdan foydalanib,
OS rezolveri qaysi manzil oilalarini taqdim etishini tekshiring:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` oʻrniga ishlatayotgan xizmatingizni kiriting (masalan, `omniroute-web`).
Bu buyruqlar hisob maʼlumotlari yoki IP manzillarini koʻrsatmasdan manzil oilalarini
chiqaradi. Qaytarilgan `6` faqat IPv6 DNS natijasini bildiradi: u yaroqli IPv6 marshruti
yoki API’ga kirish mavjudligini **isbotlamaydi**. `curl` oʻrnatilgan joylarda har ikkala
muhitda `curl -4 -I https://generativelanguage.googleapis.com` natijasini
`curl -6 -I https://generativelanguage.googleapis.com` bilan taqqoslang.
HTTP javobi, hatto u autentifikatsiyasiz xato boʻlsa ham, ushbu tekshiruv uchun ulanish
mavjudligini isbotlaydi; Gemini’dan foydalanish mumkinligini faqat autentifikatsiyalangan
model soʻrovi tekshiradi.

### Xost darajasidagi muqobil yechim: ishlaydigan IPv6 va rezolver siyosati

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) muallifi oʻz muhitida
konteyner IPv6’ini yoqish va glibc manzil tanlashini oʻzgartirish orqali kirishni tikladi.
Buni muayyan muhitga xos muqobil yechim sifatida koʻring. Rezolver afzalliklarini
oʻzgartirishdan oldin xost IPv6’i ishlashini, konteynerning chiquvchi ulanishi/marshrutlanishini
va xavfsizlik devori qoidalarini tekshiring. Xususiy ULA manzilining oʻzi umumiy IPv6
ulanishi mavjudligini tasdiqlamaydi.

Compose’ning standart tarmogʻiga allaqachon ulangan xizmatlar uchun ushbu parcha
mazkur tarmoqda IPv6’ni yoqadi; xizmat, portlar, jildlar va konfiguratsiyaning qolgan
qismini saqlab qoling:

```yaml
networks:
  default:
    enable_ipv6: true
```

Nomlangan tarmoq uchun uni xizmat amalda ulanadigan tarmoqda yoqing. Docker ULA quyi
tarmogʻini ajratishi mumkin; aniq va boshqa tarmoqlar bilan ustma-ust tushmaydigan quyi
tarmoqni faqat tarmogʻingiz talab qilgandagina tanlang.
[Docker IPv6 tarmogʻi](https://docs.docker.com/engine/daemon/ipv6/) va
[Compose tarmoq parametrlari](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)ga qarang.

**glibc asosidagi tasvirda** `/etc/gai.conf` manzil tanlashni oʻzgartirishi mumkin.
Joriy repozitoriydagi Dockerfile Debian’dan foydalanadi; musl asosidagi maxsus tasvirlar
bu mexanizmdan foydalanmaydi. Xabar qilingan oʻzgartirish ULA yorligʻini
`label fc00::/7 6`dan `label fc00::/7 1`ga almashtiradi. Tasvirning toʻliq siyosat
jadvalidan boshlang va uning boshqa yozuvlarini saqlab qoling: `label` yoki `precedence`
yozuvini qoʻshish standart jadvalni almashtiradi, shu sababli faqat oʻzgartirilgan qatorni
oʻz ichiga olgan fayl yetarli emas.
[glibc konfiguratsiyasi maʼlumotnomasi](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ushbu semantikani hujjatlashtiradi. Tekshirilgan faylni `/etc/gai.conf` manziliga faqat
oʻqish rejimida bind-mount qiling va oʻzgarishni qoʻllash uchun xizmatni qayta yarating.

Bu oʻsha konteynerdagi **barcha chiquvchi trafik** uchun OS manzil tanlashini oʻzgartiradi.
Bu har bir ilovani IPv6’ni tanlashga majburlamaydi: Node’ning DNS tartibi va ulanish
tanlovi ham muhim. Xususan, `--dns-result-order=ipv4first` IPv4’ni afzal koʻradi va
faqat IPv4 bilan bogʻliq nosozlik uchun yechim emas.
[Node DNS tartibi](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)ga qarang.

Xost darajasidagi har qanday oʻzgarishdan keyin Gemini va boshqa provayderlaringizni
qayta sinang. Orqaga qaytarish uchun maxsus `gai.conf` mount’ini olib tashlang, oldingi
tarmoq konfiguratsiyasini tiklang va texnik xizmat koʻrsatish vaqtida taʼsirlangan
xizmat/tarmoqni qayta yarating. Tarmoqni qayta yaratish unga ulangan boshqa konteynerlar
ishini toʻxtatib qoʻyishi mumkin; doimiy maʼlumotlar jildini oʻchirmang.

## Muhim eslatmalar

- **SQLite WAL rejimi:** OmniRoute eng soʻnggi oʻzgarishlarni `storage.sqlite` fayliga nazorat nuqtasi orqali yozib ulgurishi uchun `docker stop` buyrugʻiga yakunlanish imkonini berish kerak. Toʻplamdagi Compose fayllarida toʻxtatish uchun 40 soniyalik imtiyozli muddat allaqachon belgilangan. Agar tasvirni bevosita ishga tushirsangiz, `--stop-timeout 40` parametrini saqlang.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Agar muntazam/yozishdan oldingi zaxira nusxalar tashqi vositalar orqali boshqarilsa, `true` qiymatini belgilang. Mavjud maʼlumotlar bazasi migratsiyalari uchun baribir alohida ishonchli xavfsizlik oniy nusxasi va ommaviy migratsiyadan himoya mexanizmi talab qilinadi.
- **Maʼlumotlarni doimiy saqlash:** Konteyner qayta ishga tushirilganda maʼlumotlar bazasi, kalitlar va konfiguratsiyalarni saqlab qolish uchun har doim `/app/data` yoʻliga jild ulang.
- **Port konfiguratsiyasi:** Standart `20128` portini oʻzgartirish uchun `PORT` muhit oʻzgaruvchisini qayta belgilang.

## Shuningdek qarang

- [VMʼga joylashtirish qoʻllanmasi](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare sozlamalari
- [Fly.ioʼga joylashtirish qoʻllanmasi](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.ioʼga joylashtirish
- [Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) — Toʻliq `.env` maʼlumotnomasi
