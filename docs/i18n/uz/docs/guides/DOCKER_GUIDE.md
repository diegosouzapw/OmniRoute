# 🐳 Docker Guide — OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker orqali joylashtirish bo‘yicha to‘liq ma’lumotnoma. Tezkor boshlash uchun [README faylidagi Docker bo‘limi](../README.md#-docker)ga qarang.

## Mundarija

- [Tezkor ishga tushirish](#quick-run)
- [Muhit fayli bilan](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Mavjud profillar](#available-profiles)
- [OmniRoute Docker ichida ishlaganda xost CLI vositalarini sozlash](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis yordamchi konteyneri](#redis-sidecar)
- [Ishlab chiqarish muhiti uchun Compose](#production-compose)
- [Dockerfile bosqichlari](#dockerfile-stages)
- [Muhim muhit o‘zgaruvchilari](#critical-environment-variables)
- [Caddy (HTTPS) bilan Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare tezkor tunneli](#cloudflare-quick-tunnel)
- [Tasvir teglari](#image-tags)
- [Mavjudlik: standart SQLite faqat bitta replika bilan ishlaydi](#availability-default-sqlite-is-single-replica)
- [Muhim eslatmalar](#important-notes)

---

## Tezkor ishga tushirish

> **Bitta buyruq bilan o‘z serveringizda ishga tushirmoqchimisiz?**
> [O‘z serveringizda joylashtirish qo‘llanmasi](../getting-started/SELF_HOST_GUIDE.md) bilan tanishing —
> `docker compose -f docker-compose.selfhost.yml up -d` (e’lon qilingan tasvir +
> Redis, faqat loopback, profil tanlash talab etilmaydi). Quyidagi tezkor ishga tushirish usuli
> Redis’ni boshqa joyda allaqachon ishga tushirgan foydalanuvchilar uchun
> yagona konteynerli variantdir.

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

# CLI profili (Claude Code, Codex va OpenClaw ichiga o‘rnatilgan)
docker compose --profile cli up -d

# Xost profili (birinchi navbatda Linux uchun; xostdagi CLI binar fayllarini faqat o‘qish rejimida ulaydi)
docker compose --profile host up -d

# CLI va CLIProxyAPI yordamchi konteynerini birlashtirish
docker compose --profile cli --profile cliproxyapi up -d
```

## Mavjud profillar

OmniRoute to‘rtta Compose profili bilan taqdim etiladi. Muhitingizga mos profilni tanlang.

| Profil            | Xizmat           | Qachon foydalanish kerak                                                                                                                                                     | Buyruq                                       |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standart) | `omniroute-base` | Interfeyssiz server / minimal ish muhiti, provayder CLI vositalari qo‘shilmagan                                                                                              | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` va ichiga o‘rnatilgan CLI vositalarini (Codex, Claude Code, Droid, OpenClaw) chaqiradigan agentli ish jarayonlari                         | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` va boshqalarni faqat o‘qish rejimida ulash orqali xost CLI vositalariga `network_mode`ga o‘xshash kirishni istaydigan Linux xostlari | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Yuqori oqimdagi CLI proksilash uchun `8317` portida [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) yordamchi konteynerini ishga tushirish                       | `docker compose --profile cliproxyapi up -d` |

> Bir nechta profilni birlashtirish mumkin: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker ichida ishlaganda host CLI vositalarini sozlash

`omniroute setup-codex`, `setup-claude`, `config set <tool>` va boshqaruv panelidagi
**Konfiguratsiyani saqlash** tugmasi `~/.codex/*.config.toml` kabi fayllarni yozadi. Bu yoʻllar
faqat CLI amalda ishlayotgan mashinada maʼnoga ega. Ularni konteyner ichida
ishga tushirsangiz, yozuv konteynerning oʻz uy katalogiga (`/home/node` —
tasvir `USER node` bilan ishlaydi) tushadi. Hostdagi hech bir CLI uni oʻqimaydi va
konteyner qayta yaratilishi bilanoq u oʻchib ketadi.

OmniRoute buni aniqlaydi va foydalana olmaydigan muvaffaqiyat haqida
xabar berish oʻrniga, koʻrsatmalar bilan yozishni rad etadi: CLI `2` kodi bilan
yakunlanadi, API esa `containerEphemeralTarget: true` bilan `422` javobini beradi.

### Tavsiya etiladi: CLI’ni hostda, OmniRoute’ni Docker ichida ishga tushiring

Konteyner API’ni taqdim etadi; CLI esa host vositalaringizni sozlaydi.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI’ni konteynerga yoʻnaltiring
omniroute setup-codex                      # hostdagi haqiqiy ~/.codex katalogiga yozadi
```

Codex, Claude Code, Cursor yoki shunga oʻxshash vositalar noutbukingizda
ishlasa — odatiy sozlama aynan shu — bu toʻgʻri tanlovdir.

### Muqobil usul: host konfiguratsiya kataloglarini bind-mount qiling (`host` profili)

Agar konteynerning oʻzi host konfiguratsiyasiga yozishini istasangiz,
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

Yoʻlni ishonchli qiladigan narsa bind mount hisoblanadi: OmniRoute
`/proc/self/mountinfo` faylini oʻqiydi va ulangan yoʻllarga (shuningdek, ichki
kataloglari ulangan kataloglarga — yuqoridagi `/host-home` tuzilmasi aynan shunday)
yozishga ruxsat beradi, ulanmagan yoʻllarga yozishni esa rad etishda davom etadi.

### Istisno yoʻli: konteynerning oʻz CLI’larini sozlash (ehtiyotkorlik bilan foydalaning)

CLI’lar haqiqatan ham konteyner ichida joylashganida (`cli` profili), yozish
ataylab amalga oshiriladi. Istalgan `setup-*` buyrugʻiga `--allow-container-write`
parametrini uzating yoki server uchun `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`
qiymatini oʻrnating. Yozish konteynerdan uzoqroq saqlanmasligi haqidagi
ogohlantirish bilan davom etadi.

> **Xavfsizlik ogohlantirishi — `cli` profili + `docker.sock` ulanishi.**
> `cli` profili `/var/run/docker.sock` faylini bind-mount qiladi, shunda konteyner
> ichidagi avtomatik yangilagich host demoni orqali stekni qayta yarata oladi
> (`src/lib/system/autoUpdate.ts` ushbu socket mavjudligini tekshiradi va u
> boʻlmaganda Docker yoʻlini chetlab oʻtadi). Bu socket **hostdagi root darajasidagi
> ishonch chegarasi** hisoblanadi: unga kira oladigan har qanday narsa host Docker demonini
> root sifatida boshqaradi — u hostdagi istalgan konteynerni yaratishi, tekshirishi,
> toʻxtatishi va olib tashlashi mumkin. Oqibatlari:
>
> 1. **`cli` profilining portini hech qachon tarmoqqa ochmang.** Uni
>    `127.0.0.1` manzilida eʼlon qiling (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN orqali kirish mumkin boʻlgan `cli` profili boshqaruv paneli darajasidagi
>    istalgan RCE’ni hostning toʻliq buzib kirilishiga aylantiradi.
> 2. **`cli` profiliga hostning boshqa hech qanday katalogini bind-mount qilmang.**
>    Docker socket bilan birga har qanday qoʻshimcha ulanish konteynerga fayl
>    tizimingiz va host konfiguratsiyasini toʻliq oʻqish/yozish imkonini beradi. Agar vosita
>    loyihani koʻrishi kerak boʻlsa, uni CLI binar fayli yordamida lokal ishga tushiring —
>    uni `cli` konteyneriga ulamang.
>
> Agar konteyner ichidagi avtomatik yangilash kerak boʻlmasa, `cli` profilini
> oʻchirilgan holda qoldiring (`COMPOSE_PROFILES=core,redis` yoki qisqaroq variant).
> Boshqa profillar Docker socket’ni ulamaydi.
>
> MITM bilan bogʻliq tahdid modeli uchun `docs/security/MITM-TPROXY-DECRYPT.md`
> fayliga (git ichida; `/docs` tarkibiga kompilyatsiya qilinmagan), shuningdek,
> `codex`/`claude-code`/`droid`/`openclaw` binar fayllarining kelib chiqish zanjiri uchun
> `docs/security/SUPPLY_CHAIN.md` fayliga qarang.

## Redis yordamchi konteyneri

OmniRoute taqsimlangan soʻrovlar tezligi cheklagichi va umumiy keshni qoʻllab-quvvatlash uchun Redis’dan foydalanadi. `redis` xizmati `docker-compose.yml` faylida **har doim belgilangan** (u profil bilan cheklanmagan) va boshqa istalgan profil bilan birga ishga tushadi.

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

> **Nega standart holatda loopback ishlatiladi:** yordamchi konteyner `requirepass`siz ishlaydi va ilova
> konteynerlari unga compose tarmogʻi (`redis:6379`) orqali ulanadi — eʼlon qilingan port
> faqat xost tomonidagi vositalar (`redis-cli`, mahalliy `npm run dev`) uchun kerak.
> `0.0.0.0` manzilida eʼlon qilish autentifikatsiyasiz Redis’ni LAN tarmogʻingizdagi barcha xostlarga ochib qoʻyadi. Agar
> `REDIS_BIND_HOST=0.0.0.0` qiymatini oʻrnatsangiz, xizmatning `command:` qatoriga `--requirepass` parametrini ham qoʻshing.

**Redis’ni oʻchirib qoʻyish** tavsiya etilmaydi (soʻrovlar tezligi cheklagichi xotiradagi zaxira mexanizmiga oʻtadi). Agar bu zarur boʻlsa, `docker-compose.yml` faylidagi `redis:` xizmat blokini olib tashlang/izohga aylantiring yoki uning miqyosini nolga tushiring:

```bash
docker compose up -d --scale redis=0
```

## Ishlab chiqarish uchun Compose

Dasturlash muhiti bilan yonma-yon ishlaydigan izolyatsiyalangan ishlab chiqarish nusxasi uchun `docker-compose.prod.yml` faylidan foydalaning.

| Tafsilot                            | Qiymat                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| Fayl                                | `docker-compose.prod.yml`                                                         |
| Boshqaruv panelining standart porti | `PROD_DASHBOARD_PORT=20130` (ichki `${DASHBOARD_PORT:-20128}` portiga moslangan)  |
| API’ning standart porti             | `PROD_API_PORT=20131`                                                             |
| Tasvir                              | `omniroute:prod` (`runner-cli` maqsadidan yigʻilgan)                              |
| Redis konteyneri                    | `omniroute-redis-prod` (`redis:8.6.2`, alohida `redis-prod-data` jildi)           |
| Maʼlumotlar jildi                   | `omniroute-prod-data` (nomlangan, qayta yigʻishlar orasida saqlanadi)             |
| Holat tekshiruvlari                 | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` Redis holatiga bogʻlangan |

Foydalanish tartibi:

```bash
# Ishlab chiqarish stekini yigʻish va ishga tushirish
docker compose -f docker-compose.prod.yml up -d --build

# Jurnallarni oqimda koʻrish
docker compose -f docker-compose.prod.yml logs -f

# Toʻxtatish va olib tashlash (jildlarni saqlab qolish)
docker compose -f docker-compose.prod.yml down
```

Ishlab chiqarish steki dasturlash compose muhiti bilan parallel ravishda ishlaydi (konteyner nomlari, portlar va jildlar boshqacha), shuning uchun ishlab chiqarish muhiti ishlashda davom etar ekan, mahalliy muhitda ishlab chiqishni davom ettirishingiz mumkin.

## Dockerfile bosqichlari

Repozitoriy ko‘p bosqichli Dockerfile (`Dockerfile`) bilan taqdim etiladi. Uchta bosqich ochiq; foydalanish holatingiz uchun mos `target`ni tanlang.

| Bosqich       | Asosiy obraz          | Maqsad                                                                                                                                                                                           |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Bog‘liqliklarni o‘rnatadi (`npm ci --legacy-peer-deps`) va `npm run build`ni ishga tushiradi (sukut bo‘yicha Turbopack — quyidagi Qurish vaqtidagi resurslar bo‘limiga qarang)                   |
| `runner-base` | `node:26-trixie-slim` | Next.js mustaqil chiqishi bilan ishlab chiqarish muhiti. **Provayder CLI vositalari kiritilmagan.**                                                                                              |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` hamda global CLI vositalarini qo‘shadi: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agentli ish jarayonlari uchun shuni tanlang.** |

Muayyan targetni qo‘lda quring:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Qurish vaqtidagi resurslar

Uchta qurish argumenti `builder` bosqichining resurs sarfini boshqaradi. Ular faqat qurish vaqtida amal qiladi —
`OMNIROUTE_MEMORY_MB` (quyida) esa alohida, bajarilish vaqtiga oid sozlamadir.

| Qurish argumenti            | Standart | Ta’siri                                                                                                   |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | `0` o‘rniga webpack bilan quradi. Xotiraning cho‘qqi sarfi pastroq, ammo sekinroq.                        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Ishga tushirilgan `next build` uchun V8 uyum chegarasi (`--max-old-space-size`).                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL`ga uzatiladi; Next sahifa ma’lumotlarini yig‘ish uchun `workers = N - 1`ni hisoblaydi. |

`OMNIROUTE_BUILD_WORKERS` — katta qurish muhitida oshiriladigan va resurslari
cheklangan qurish **`✓ Compiled successfully`dan keyin** to‘xtab qolsa, shubha
qilinishi kerak bo‘lgan sozlamadir. Har bir sahifa ma’lumotlari workeri alohida
jarayon bo‘lib, asosiy `next build`ning o‘zi ham alohida jarayondir;
amaldagi VPSda qayta tiklash (issue #7518) har bir jarayonning cho‘qqi RSS
qiymatini `NODE_OPTIONS` uyum bayrog‘idan qat’i nazar ~4.5 GB deb o‘lchadi
(Turbopack V8 uyumidan tashqaridagi mahalliy/Rust xotirasida kompilyatsiya
qiladi). Standart `2` qiymati (→ 1 worker, jami 2 jarayon) nashr qilish
konveyeri foydalanadigan GitHub tomonidan joylashtirilgan 16 GB / 4 vCPU
runnerlar uchun mo‘ljallangan. `8` qiymatida (→ 7 worker) ushbu runner xotirasi
tugadi va buildkit bosqichni `ResourceExhausted: ... cannot allocate memory`
xatosi bilan yakunladi; har bir jarayonning RSS qiymati taxmin qilish o‘rniga
bevosita o‘lchangach, `3` (→ 2 worker) ham sig‘madi.
`tests/unit/docker-build-memory-budget.test.ts` o‘lchangan qiymat asosida
hisob-kitob qiladi va sozlamalardan birortasi runner sig‘imidan oshsa,
muvaffaqiyatsiz tugaydi.

Turbopack V8 uyumidan **tashqarida** joylashgan mahalliy Rust xotirasida
kompilyatsiya qiladi, shu sababli `OMNIROUTE_BUILD_MEMORY_MB` uni cheklamaydi.
Xotira chegarasi o‘rnatilgan hostda qurish jarayoni OOM killer tomonidan hech
qanday xato matnisiz SIGKILL qilinadi — u shunchaki `Creating an optimized production build`
o‘rtasida to‘xtaydi, bu esa xotira yetishmovchiligidan ko‘ra jarayon osilib
qolgandek ko‘rinadi. Agar qurish hosti resurslari cheklangan bo‘lsa,
bundlerni almashtiring:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` yoqilgan, shuning uchun `next build` asosiy **va** worker
jarayonini ishga tushiradi hamda har biri `OMNIROUTE_BUILD_MEMORY_MB`ga alohida
rioya qiladi. Konteyner chegarasini bu qiymatdan bir marta emas, taxminan ikki
baravar yuqori qilib belgilang.

Ushbu daraxtda o‘lchangan (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Konteyner chegarasi | Natija                                                  |
| --------- | ------------------- | ------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | Har ikkala holatda ham OOM sababli, jimsiz to‘xtatildi  |
| webpack   | 8 GiB               | qurish workeri SIGKILL qilindi                          |
| webpack   | 12 GiB              | muvaffaqiyatli yakunlandi, cho‘qqi sarf 11.1 GiB bo‘ldi |

### Bajarilish vaqtidagi standart sozlamalar

`runner-base` tomonidan eksport qilinadigan standart sozlamalar: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker’dagi xotira ishlashi:

- Obraz `OMNIROUTE_MEMORY_MB=1024`ni o‘rnatadi va undan `NODE_OPTIONS=--max-old-space-size=1024`ni hosil qiladi.
- Haqiqiy server jarayoni mustaqil ishga tushirgich tomonidan boshlanadi; u `OMNIROUTE_MEMORY_MB`ni o‘qiydi va `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`ni qo‘shadi.
- Node takrorlangan `--max-old-space-size` qiymatlarining oxirgisidan foydalanadi, shuning uchun `OMNIROUTE_MEMORY_MB`ni o‘rnatish Docker uyumining amaldagi chegarasini boshqaradi.
- Obraz uni har doim o‘rnatgani sababli, ishga tushirgichning RAM asosida moslanadigan zaxira qiymati Docker ostida hech qachon qo‘llanmaydi. Ish yuklamasi uchun uni aniq oshiring (quyidagi jadval). `2048` kodlash agentining `/v1/responses` so‘rovlari uchun hamon juda kichik.

### Kodlash agentlari uchun bajarilish vaqtidagi RAM

Docker’ning standart 1 GiB qiymati ishlab chiqarish muhiti uchun emas, boshqaruv paneli/yengil chat uchun minimal chegaradir. Uzun `POST /v1/responses` tanalari (yuzlab xabarlar, o‘nlab vositalar) siqish vaqtida xotirada bir nechta grafikni saqlab turadi. Bir-biriga ustma-ust tushgan ~3 MiB / ~750k-tokenli ikkita so‘rov V8ni **12 GiB** old-space’da (`FATAL ERROR: Reached heap limit`) to‘xtatgan va 16 GiB cgroup OOM chegarasiga ham yetgan. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)ga qarang.

**cgroup `--memory`ni uyumdan yuqori** qilib belgilang — mahalliy buferlar, SQLite va siqishning oraliq ma’lumotlari V8dan tashqarida joylashadi.

| Ish yuklamasi                                     | `OMNIROUTE_MEMORY_MB`      | Konteyner / cgroup               | Izohlar                                                                                                                                                           |
| ------------------------------------------------- | -------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boshqaruv paneli, bitta yengil chat               | `1024` (tasvir standarti)  | ≥2 GiB                           |                                                                                                                                                                   |
| Bitta kodlash agenti (Claude/Codex/Grok)          | `8192`                     | ≥10 GiB                          | Odatdagi bir seansli `/v1/responses`                                                                                                                              |
| Bir vaqtdagi ikkita uzoq `/v1/responses`          | `10240`–`12288`            | ≥12–16 GiB                       | V8 jarayonining toʻxtashi taxminan 12 GiB uyum xotirada oʻlchangan                                                                                                |
| Bir vaqtdagi uchta yoki undan ortiq uzoq kontekst | bitta jarayonda ishlatmang | ketma-ket bajaring / koʻproq RAM | Standart ogʻir yuklamalarni qabul qilish chegarasi — 1 ta bajarilayotgan soʻrov; uni RAMni oshirmasdan koʻtarish jarayonning toʻxtashini qayta keltirib chiqaradi |

`OMNIROUTE_MEMORY_MB` **oʻrnatilmagan** boʻlsa, bevosita apparatda ishlaydigan `omniroute serve` RAMning taxminan 35% ini (`[512, 4096]` oraligʻida cheklangan) moslaydi. Docker har doim `1024` qiymatini oʻrnatadi, shu sababli rasmiy tasvirda bu moslash hech qachon bajarilmaydi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Muhim muhit o‘zgaruvchilari

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) hujjatida ko‘rsatilgan standart sozlamalardan tashqari, Docker ostida ishga tushirishda quyidagi o‘zgaruvchilar eng muhim hisoblanadi:

| O‘zgaruvchi                   | Maqsad                                                                                                                                                                                                                                                                                           | Standart qiymat                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ko‘prigi uchun umumiy maxfiy kalit. **Ishlab chiqarish muhitida talab qilinadi** — kuchli tasodifiy satrga o‘rnating.                                                                                                                                                                  | o‘rnatilmagan (taqdim etilishi shart) |
| `REDIS_URL`                   | So‘rovlar tezligini cheklash / kesh serveri uchun ulanish satri                                                                                                                                                                                                                                  | `redis://redis:6379`                  |
| `REDIS_PORT`                  | Birga taqdim etilgan Redis konteyneri uchun xost tomonidagi port                                                                                                                                                                                                                                 | `6379`                                |
| `REDIS_BIND_HOST`             | Birga taqdim etilgan Redis porti e’lon qilinadigan xost interfeysi (AUTH qo‘shilmasa, teskari aloqa interfeysi)                                                                                                                                                                                  | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | O‘zini yangilash jarayonlari uchun `cli` profilidagi `/workspace/omniroute` manziliga ulangan xost yo‘li                                                                                                                                                                                         | `.` (joriy katalog)                   |
| `OMNIROUTE_MEMORY_MB`         | Docker mustaqil serveri uchun Node uyum xotirasining ish vaqtidagi yuqori chegarasi; yuqoridagi tasvir standart qiymatini bekor qiladi. Dasturlash agentlari: `8192`+ ([ish vaqti RAM xotirasi](#runtime-ram-for-coding-agents) bo‘limiga qarang).                                               | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | Boshqaruv paneli (20128) va API (20129) uchun ochiq portlarni almashtirish                                                                                                                                                                                                                       | `20128` / `20129`                     |
| `APP_BIND_HOST`               | docker-compose boshqaruv paneli/API/jonli WS portlarini e’lon qiladigan xost interfeysi. `REQUIRE_API_KEY=false` bo‘lganda (standart holat), `0.0.0.0` anonim `/v1` proksisini LAN tarmog‘iga ochadi — faqat `REQUIRE_API_KEY=true` bilan yoki oldida teskari proksi mavjud bo‘lsa kengaytiring. | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | docker-compose `cliproxyapi` yordamchi konteynerini e’lon qiladigan xost interfeysi — uning ma’lumotlar jildi provayder hisob ma’lumotlarini saqlaydi.                                                                                                                                           | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | Ish vaqtidagi plagin skaneri o‘qiydigan va plaginlarni o‘rnatadigan katalog. Plaginlar bind-mount orqali ulanganida uni belgilang: standart qiymat `HOME` ga bog‘liq, ammo tasvir uni eksport qilmasligi mumkin.                                                                                 | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | Ilova teskari proksi ortida e’lon qilinganda ishlatiladigan URL quyi yo‘li (masalan, `/omniroute`)                                                                                                                                                                                               | _(bo‘sh = ildiz)_                     |
| `NEXT_PUBLIC_BASE_URL`        | Quyi yo‘lni o‘z ichiga olgan ommaviy brauzer manbasi (masalan, `https://host/omniroute`)                                                                                                                                                                                                         | o‘rnatilmagan                         |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` uchun xost tomonidagi boshqaruv paneli porti                                                                                                                                                                                                                           | `20130`                               |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yordamchi konteyneri uchun xost tomonidagi port                                                                                                                                                                                                                                    | `8317`                                |

## Quyi yoʻldagi teskari proksi (Traefik / nginx)

Next.js `basePath` qiymati standalone toʻplamiga kompilyatsiya qilinadi. OmniRoute biriktirilgan
qiymatni ilova ildizidagi sentinel faylga yozib qoʻyadi (`npm run build` vaqtida yoziladi;
`scripts/docker/ensure-docker-base-path.mjs` tomonidan oʻqiladi) va konteyner ishga tushganda
uni `OMNIROUTE_BASE_PATH` bilan taqqoslaydi. Agar ular farq qilsa va tasvir domen ildizi
uchun yigʻilgan boʻlsa, kirish nuqtasi `node dev/run-standalone.mjs` ishga tushishidan oldin
standalone manifestlarini, ichiga joylashtirilgan `basePath`/`assetPrefix` literallarini
(Next 16 SSR resurs URL manzillarini faqat `assetPrefix` asosida hosil qiladi — tuzatuvchi
quyi yoʻlni unga ham aks ettiradi), biriktirilgan `/_next/static` resurs URL manzillarini
(mijozga oid havola manifestlari, media importlari, oldindan render qilingan xato
sahifalari) va mijozdagi `process.env` shimini qayta yozadi.

### Compose orqali yigʻish (tavsiya etiladi)

Tasvir va ish vaqti sozlamalari bir xil boʻlishi uchun `.env` faylida ikkala
oʻzgaruvchini ham belgilang, soʻng qayta yigʻing:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` fayli `OMNIROUTE_BASE_PATH` qiymatini Docker yigʻish argumenti va
ish vaqti muhit oʻzgaruvchisi sifatida uzatadi.

### Oldindan yigʻilgan ildiz tasviri + ish vaqtidagi quyi yoʻl

Nashr qilingan `diegosouzapw/omniroute:*` tasvirlari domen ildizi uchun yigʻilgan. Shunga
qaramay, ish vaqtida `OMNIROUTE_BASE_PATH` ni belgilashingiz mumkin; konteyner ishga
tushganda toʻplamni bir marta tuzatadi. Uni mos ommaviy manba bilan birga belgilang:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Teskari proksini **toʻliq** tashqi yoʻlni uzatadigan qilib sozlang (prefiksni olib
tashlamang). Next.js `/omniroute/...` ni qabul qilishi va resurslarni
`/omniroute/_next/...` dan taqdim etishi uchun Traefik `PathPrefix(`/omniroute`)` ni
`StripPrefix` siz konteynerga yoʻnaltirishi kerak.

Docker salomatlik tekshiruvi faol `OMNIROUTE_BASE_PATH` prefiksi qoʻshilgan yengil
`/healthz` hayot sikli yakuniy nuqtasini tekshiradi. `/api/monitoring/health` inson yoki
boshqaruv paneli diagnostikasi uchun mavjudligicha qoladi; konteyner HEALTHCHECK
tekshiruvini yana unga yoʻnaltirish uchun (masalan, chuqur salomatlik nazoratini
taʼminlash maqsadida) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ni belgilang.
Bu yoʻl **chuqur** tekshiruvdir (DB + monitoring xulosasi) — qayta yoqsangiz, Docker'ning
kamdan-kam bajariladigan `HEALTHCHECK` tekshiruvi uchun mos, ammo Kubernetes
`livenessProbe` intervallari uchun **mos emas**.

Orkestratorlar (Kubernetes, Nomad va boshqalar) uchun:

| Tekshiruv         | Afzal                                                                 | Saqlaning                                                                       |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Faollik           | HTTP `GET /livez` yoki asosiy portdagi TCP (`PORT`, standart `20128`) | Faollik tekshiruvi sifatida `/api/monitoring/health`                            |
| Tayyorlik         | HTTP `GET /healthz`                                                   | Voqealar sikli bandligini ishlamayapti deb baholaydigan qisqa kutish muddatlari |
| Chuqur / blackbox | `/api/monitoring/health`                                              | —                                                                               |

`/healthz` jarayon hayot sikli holatini (`ok` / `starting` / `stopping`) bildiradi.
`/livez` faqat jarayon ishlayotganini tekshiradi (ishlov beruvchi ishlay olsa, har doim
200 qaytaradi; u tayyorlikni kutmaydi). Har ikkisi ham soʻrovlarga ishlov berish bilan
bir xil Node voqealar siklida ishlaydi, shuning uchun CPU talab qiladigan katalog yoki
siqish ishlari ularni kechiktirishi mumkin — band ≠ ishlamayapti. HTTP tekshiruvlarining
kutish vaqti tugasa, TCP faollik tekshiruvini afzal koʻring. Tekshiruvlar boʻyicha toʻliq
koʻrsatma:
[Monitoring qoʻllanmasi — Kubernetes tekshiruvlari boʻyicha tavsiyalar](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy bilan Docker Compose (HTTPS Auto-TLS)

OmniRoute Caddy tomonidan avtomatik SSL taqdim etilishi orqali xavfsiz tarzda ochilishi mumkin. Domeningizning DNS A yozuvi serveringiz IP manziliga yoʻnaltirilganiga ishonch hosil qiling.

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
      # OAuth qayta chaqiruvlari, boshqaruv paneli havolalari va yaratilgan ommaviy URL manzillari uchun brauzerga koʻrinadigan origin.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Rejalashtirilgan vazifalar / oʻziga yuboriladigan soʻrovlar uchun ichki serverlararo URL.
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
autentifikatsiyadan oʻtgan boshqaruv panelidagi yozish amallari bir xil origin soʻrovlari hamda
seansga bogʻlangan CSRF himoyasidan foydalanadi. `OMNIROUTE_TRUST_PROXY` parametrini faqat
OmniRoute ommaviy originni aniq konfiguratsiya oʻrniga ishonchli yoʻnaltirilgan sarlavhalardan
olishini ataylab xohlaydigan kengaytirilgan joylashtirishlarda yoqing.

## Cloudflare tezkor tunneli

Docker joylashtirishlari uchun boshqaruv paneli `Dashboard → Endpoints` sahifasida bir marta bosish orqali ishga tushiriladigan **Cloudflare Quick Tunnel** imkoniyatini oʻz ichiga oladi. Birinchi marta yoqilganda `cloudflared` faqat zarur boʻlsa yuklab olinadi, joriy `/v1` endpointingizga vaqtinchalik tunnel ishga tushiriladi va yaratilgan `https://*.trycloudflare.com/v1` URL manzili odatiy ommaviy URL manzilingizning bevosita ostida koʻrsatiladi.

Endpoint tunnel panellarini (Cloudflare, Tailscale, ngrok) faol tunnel holatini oʻzgartirmasdan `Settings → Appearance` orqali koʻrsatish yoki yashirish mumkin.

### Tunnelga oid eslatmalar

- Quick Tunnel URL manzillari vaqtinchalik boʻlib, har bir qayta ishga tushirishdan keyin oʻzgaradi.
- Quick Tunnel tunnellari OmniRoute yoki konteyner qayta ishga tushirilgandan keyin avtomatik ravishda tiklanmaydi. Zarur boʻlganda ularni boshqaruv panelidan qayta yoqing.
- Boshqariladigan oʻrnatish hozirda Linux, macOS va Windows tizimlarining `x64` / `arm64` arxitekturalarini qoʻllab-quvvatlaydi.
- Cheklangan konteyner muhitlarida QUIC UDP buferiga oid ortiqcha ogohlantirishlarning oldini olish uchun boshqariladigan Quick Tunnel tunnellari sukut boʻyicha HTTP/2 transportidan foydalanadi. Boshqa transportdan foydalanmoqchi boʻlsangiz, `CLOUDFLARED_PROTOCOL=quic` yoki `auto` qiymatini oʻrnating.
- Docker obrazlari tizim CA ildiz sertifikatlarini oʻz ichiga oladi va ularni boshqariladigan `cloudflared` jarayoniga uzatadi, bu tunnel konteyner ichida ishga tushirilganda TLS ishonch xatolarining oldini oladi.
- OmniRoute yangi faylni yuklab olish oʻrniga mavjud bajariluvchi fayldan foydalanishini istasangiz, `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` qiymatini oʻrnating.

## Obraz teglari

| Obraz                    | Teg      | Hajmi  | Tavsif                                                                   |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Eng yuqori **eʼlon qilingan** barqaror SemVer (`main` git tarmogʻi emas) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps uchun ushbu turdagi tegni mahkamlab qoʻying                       |

Koʻp platformali manifest: mahalliy `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker mos arxitekturani avtomatik ravishda tanlaydi; ARM xostlarida AMD64 emulyatsiyasini majburan ishlatish zarur boʻlsa, `--platform linux/amd64` parametrini uzating.

### Reliz kanallari

OmniRoute barqaror relizlar, faol reliz tarmogʻini sinash va ishlab chiqish tuzilmalari uchun alohida Docker kanallarini eʼlon qiladi.

| Kanal                           | Manba                                         | Oʻzgaruvchanlik                          | Tavsiya etilgan foydalanish                                                                                                                |
| ------------------------------- | --------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Imzolangan/versiyalangan reliz                | Oʻzgarmas                                | Aniq relizga mahkamlangan ishlab chiqarish muhitidagi joylashtirishlar                                                                     |
| `:latest` / `:latest-web`       | Eng yuqori **eʼlon qilingan** barqaror SemVer | Oʻzgaruvchan barqaror koʻrsatkich        | SemVer eʼlon qilish vazifasidan **keyin** barqaror relizlarni kuzatadi — `main` yoki eʼlon qilinmagan `release/v*` commitlarini kuzatmaydi |
| `:next` / `:next-web`           | Joriy standart `release/v*` tarmogʻi          | Oʻzgaruvchan relizoldi koʻrsatkichi      | Faol reliz tarmogʻiga kiritilgan, ammo hali barqaror reliz tarkibiga kirmagan tuzatishlarni sinash                                         |
| `:main` / `:main-web`           | `main` tarmogʻi                               | Oʻzgaruvchan ishlab chiqish koʻrsatkichi | Faqat ishlab chiqish va integratsion sinovlar uchun                                                                                        |

#### Relizoldi kanalidan foydalanish

`next` kanali joriy standart `release/v*` tarmogʻiga har bir push yuborilganda qayta tuziladi va AMD64 hamda ARM64 uchun eʼlon qilinadi. Eski texnik xizmat tarmoqlari uning ustiga yoza olmaydi. Ushbu kanal keyingi barqaror teg yaratilishidan oldin faol reliz tarmogʻiga birlashtirilgan tuzatishlar uchun yuklab olinadigan obrazni taqdim etadi.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose uchun tanlangan profil ishlatadigan obraz tegini qayta belgilang, soʻng xizmat obrazini yuklab olib, uni qayta yarating:

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

`next` — oʻzgaruvchan relizoldi kanalidir. U faol reliz tarmogʻiga yuborilgan istalgan push natijasida oʻzgarishi mumkin va **ishlab chiqarish muhitida foydalanish uchun qoʻllab-quvvatlanmaydi**. Muayyan tuzilmani baholash vaqtida obraz dayjestini mahkamlab qoʻying:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sinovdan oldin OmniRoute maʼlumotlar jildining yoki bind-mount qilingan maʼlumotlar katalogining zaxira nusxasini yarating. Oldingi holatga qaytish uchun avval ishlatilgan barqaror versiya yoki digestni tiklang va konteynerni qayta yarating:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Release branch buildi hech qachon `latest`ni o‘zgartira olmaydi; faqat talablarga javob beradigan barqaror semantik versiya barqaror ko‘rsatkichni yangilashi mumkin. `next` tasvirlari release tasvirini tekshirish va CRITICAL darajadagi zaifliklar mavjud bo‘lganda bloklash mexanizmini saqlab qoladi.

**`latest` git uchun dolzarblik kafolati emas.** `main` yoki faol `release/v*` branchiga birlashtirilgan tuzatishlar barqaror SemVer tasviri eʼlon qilinib, publish job `:latest`ni targ‘ib qilmaguncha (o‘sha SemVer bilan bir xil digest) `:latest` tarkibida bo‘lmaydi. GitHub tuzatish allaqachon mavjudligini ko‘rsatayotgan bo‘lsa-yu, `latest` yangilanmayotgandek ko‘rinsa, release branchini sinash uchun `:next`ni yuklab oling yoki SemVer tegini kuting.

| Maqsadingiz                                                                                     | Foydalaning                                   |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------- |
| O‘zgarmasligi kerak bo‘lgan GitOps / production                                                 | `:X.Y.Z`ni (yoki tasvir digestini) mahkamlang |
| Eʼlon qilingan barqaror versiyalarni kuzatish va har bir release uchun qayta yaratishga rozilik | `:latest`                                     |
| Eʼlon qilinmagan `release/v*` commitlarini sinash                                               | `:next` (production uchun emas)               |
| `main`ni sinash                                                                                 | `:main` (production uchun emas)               |

## Mavjudlik: standart SQLite faqat bitta replikali

Standart Docker / Kubernetes OmniRoute — bu **bitta Node jarayoni + bitta SQLite yozuvchisi**. Ushbu topologiyada yuqori mavjudlik **qoʻllab-quvvatlanmaydi**.

| Cheklov                                                                   | Oqibat                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bitta yozuvchi                                                            | Bir SQLite fayli bilan bir nechta replikani **ishga tushirmang**. Bu maʼlumotlar bazasini buzadi.                                                                                                                                                                                                                                               |
| Qayta yaratish / qayta ishga tushirish / HEALTHCHECK tomonidan toʻxtatish | Jarayondagi SSE ulanishlari, boshqaruv paneli seanslari va xotiradagi holatning **toʻliq uzilishi**. Har bir ulangan mijoz uziladi. Endpoint mavjud boʻlmagan oraliqdagi yangi soʻrovlar OmniRoute JSON emas, reverse-proxy **`502 Bad Gateway: Unknown error`** xatosini oladi — mijozlar buni provayder nosozligidan ajrata olmaydi (#11015). |
| `/healthz` bilan bir xil hodisalar sikli                                  | Band katalog yoki siqish jarayoni tekshiruvlarni kechiktirishi mumkin; qisqa timeout esa **yagona** replikani qayta ishga tushiradi.                                                                                                                                                                                                            |

**Tekshiruvlar matritsasi** (shuningdek, [Kubernetes tekshiruvlari boʻyicha tavsiyalar](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)ga qarang):

| Tekshiruv               | Nishon                                                            | Ishlatmang                                                                            |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Faollik                 | `PORT` orqali TCP (standart `20128`) yoki yumshoq HTTP `/healthz` | `/api/monitoring/health`                                                              |
| Tayyorlik               | HTTP `GET /healthz`                                               | Hodisalar sikli bandligini ishlamay qolish deb hisoblaydigan qisqa timeout qiymatlari |
| Chuqur / insonlar uchun | `/api/monitoring/health`                                          | Avtomatlashtirilgan kubelet faollik tekshiruvi                                        |

**Yangilashlar:** har bir seans uzilishini kuting. Imkon boʻlsa, mijozlar oqimini toʻxtating; standart SQLite bilan bosqichma-bosqich yangilash mavjud emas. Compose `restart: unless-stopped` va Docker `HEALTHCHECK` birgalikda konteyner Unhealthy holatiga oʻtganda yagona jarayonni ham almashtiradi — taʼsir doirasi bir xil.

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

`preStop` kutishi kube tizimiga SIGTERM yuborilishidan oldin Service endpointlarini olib tashlash imkonini beradi, shunda **yangi** trafik toʻxtayotgan jarayonga yuborilmaydi. Jarayondagi `/v1/responses` SSE ulanishlari katta hajmli qabul qilish ijaralari orqali `SHUTDOWN_TIMEOUT_MS`gacha (standart 30 soniya) yakunlanishi kutiladi (#11015). Jarayonga baribir yetib keladigan yangi soʻrovlar `503` + `Retry-After: 5` javobini oladi. Almashtiruvchi Ready holatiga kelgunicha davom etadigan Recreate endpointlari mavjud boʻlmagan oraliq toʻliq uzilish boʻlib qoladi — bu tekshiruvning notoʻgʻri sozlanishi emas, SQLite topologiyasining xususiyatidir.

Tashqi Postgres / koʻp yozuvchili HA **hujjatlashtirilgan standart yoʻl emas**. Agar sizga HA kerak boʻlsa, bitta replikani saqlang yoki loyiha alohida sinovdan oʻtkazgan va hujjatlashtirgan topologiyani ishga tushiring. Postgres/MySQL boʻyicha ishlar [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)da olib borilmoqda. Bu imkoniyat chiqarilguniga qadar **katta** `/v1/responses` sigʻimini koʻpaytirishning yagona qoʻllab-quvvatlanadigan usuli — bitta volume ustida `replicas > 1` emas, balki N ta mustaqil jarayonni ishga tushirishdir (keyingi boʻlim).

## Gorizontal masshtablash: N ta mustaqil jarayon

Bitta Node jarayoni — bu **bitta V8 heap**. Bir-birini qoplaydigan ikkita ~3 MiB / ~750k-tokenli kodlash agentining `POST /v1/responses` soʻrovi (RTK + Caveman) ~12 Gi da ushbu heap ishini toʻxtatadi (`FATAL ERROR: Reached heap limit`) va 16 Gi cgroup’da OOM holatiga olib kelishi mumkin. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ga qarang. Bu oʻlchov bir vaqtning oʻzida bajariladigan uzoq `/v1/responses` soʻrovlari uchun mahsulotdagi qatʼiy maksimum ikki ekanini emas, balki **xotira budjeti** haqidagi ogohlantirishni anglatadi. Ogʻir chatlarni qabul qilish aynan shu V8/cgroup chegarasidan avtomatik hisoblab chiqarilgan qabul qilish baytlari budjeti (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) bilan cheklanadi — allaqachon mos oʻlchamlangan jarayonda uni yuqoriga qayta belgilash (yoki eski `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` soʻrovlar soni chegarasini oʻrnatish) toʻxtash muammosini qayta yuzaga keltiradi. Kichik chatlar, `/healthz`, `/v1/models` va MCP bu cheklovga **kirmaydi**.

### Bitta jarayon: ikkitadan ortiq uzoq `/v1/responses`

**Sogʻlom** jarayon (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` dan past, birlamchi qiymat `0.75`) jarayon miqyosidagi bajarilayotgan soʻrovlar baytlari budjetida (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hali joy boʻlsa, bir vaqtning oʻzida ikkitadan ortiq uzoq `POST /v1/responses` soʻrovini bajarishi **mumkin**. Hajmi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ga teng yoki undan katta boʻlgan body’lar (birlamchi qiymat 256 KiB) tuzilmasi murakkab soʻrovlar bilan bir xil ogʻir vaznli lease’ni oladi va xuddi shu [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` chetlab oʻtish mexanizmidan (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) foydalanadi. Bir vaqtning oʻzida oʻnlab uzoq SSE mijozlarini qoʻllab-quvvatlash (operatorlarga koʻpincha 40–50 ta kerak boʻladi) qatʼiy “maksimum 2 ta” mahsulot cheklovi emas, balki **xotira budjeti** masalasidir — heap + asosiy/headroom slotlari + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ni mos oʻlchamlang. Bosim ostidagi heap #7849 qaytmasligi uchun hali ham qayta urinish mumkin boʻlgan `503` javobi bilan yukni kamaytiradi.

Heap’larni (mustaqil V8 old-space’larini) **koʻpaytirish** uchun **hozir**:

| Qiling                                                                                                                                                                                                                            | Qilmang                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Har biri oʻzining alohida `DATA_DIR` / volume’iga ega boʻlgan **N ta container/pod** ishga tushiring                                                                                                                              | Bitta SQLite fayli uchun `replicas > 1` ni oʻrnating                                |
| Bir vaqtda bajariladigan ogʻir soʻrovlar + sogʻlom headroom’ni heap / bajarilayotgan soʻrovlar baytlari budjetidan kelib chiqib oʻlchamlang; 1–2 — qatʼiy mahsulot maksimumi emas, balki #7849 uchun konservativ birlamchi qiymat | Bitta jarayonga 8× RAM va cheklanmagan soʻrovlar sonini bering                      |
| **Umumiy kvota hisoblagichlari** uchun ixtiyoriy ravishda `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` dan foydalaning                                                                                                    | Redis’ni umumiy SQLite deb hisoblamang — u bunday emas                              |
| Provayder sirlarini har bir nusxaga koʻchiring (yoki alohida dashboard’larni qabul qiling)                                                                                                                                        | Nusxalar boʻylab bitta dashboard / bitta chaqiruv jurnalini kutmang                 |
| Oldiga istalgan yuk muvozanatlagichini qoʻying; API kaliti yoki sessiya boʻyicha sticky yoʻnaltirish yetarli                                                                                                                      | Muayyan yetkazib beruvchiga xos, oʻlchamni hisobga oluvchi middleware talab qilmang |

Uskuna: har bir nusxadagi bir vaqtda bajariladigan uzoq `/v1/responses` soʻrovlari — **xotira budjeti** masalasi (heap + bajarilayotgan soʻrovlar baytlari / #10110). `N` ta mustaqil `DATA_DIR` hali ham heap’larni koʻpaytiradi: host RAM’i “N=8 boʻlgan bitta 16 Gi pod” emas, balki `N × cgroup` ni sigʻdirishi kerak. Bitta SQLite faylida hech qachon `replicas > 1` dan foydalanmang.

Compose namunasi (ikkita heap, ikkita volume — `deploy.replicas: 2` emas):

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

Jarayon ichidagi zichlik (siqishni HTTP isolate’dan chiqarish) — [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Umumiy barqaror holatdagi bitta mantiqiy klaster — [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Muhim eslatmalar

- **SQLite WAL rejimi:** OmniRoute eng soʻnggi oʻzgarishlarni `storage.sqlite` fayliga nazorat nuqtasi orqali yozib ulgurishi uchun `docker stop` yakunlanishiga imkon berish kerak. Birga taqdim etilgan Compose fayllarida toʻxtatish uchun 40 soniyalik imtiyozli muddat allaqachon belgilangan. Agar obrazni bevosita ishga tushirsangiz, `--stop-timeout 40` parametrini saqlang.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Agar muntazam/yozishdan oldingi zaxira nusxalar tashqi vositalar orqali boshqarilsa, `true` qiymatiga oʻrnating. Mavjud maʼlumotlar bazasi migratsiyalari uchun baribir alohida ishonchli xavfsizlik surati va ommaviy migratsiyadan himoya mexanizmi talab etiladi.
- **Maʼlumotlarni doimiy saqlash:** Konteyner qayta ishga tushirilganda maʼlumotlar bazasi, kalitlar va konfiguratsiyalar saqlanib qolishi uchun har doim `/app/data` manziliga jild ulang.
- **Port konfiguratsiyasi:** Standart `20128` portini oʻzgartirish uchun `PORT` muhit oʻzgaruvchisini qayta belgilang.

## Shuningdek qarang

- [VMʼga joylashtirish qoʻllanmasi](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare sozlamalari
- [Fly.ioʼga joylashtirish qoʻllanmasi](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.ioʼga joylashtirish
- [Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) — Toʻliq `.env` maʼlumotnomasi
