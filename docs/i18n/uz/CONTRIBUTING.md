# Contributing to OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hissa qoʻshishga qiziqish bildirganingiz uchun rahmat! Ushbu qoʻllanma ishni boshlash uchun kerak boʻladigan barcha maʼlumotlarni qamrab oladi.

Har bir oʻzgarish uchun rasmiy ish jarayonini
[Hissa qoʻshishning asosiy yoʻli](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) bilan boshlang. Unda provayder, marshrutlash,
UI/UX, i18n, CLI, maʼlumotlar bazasi hamda build/deploy oʻzgarishlari ularning shartnomalari, yoʻnaltirilgan testlari, CI
qamrovi va muvofiqlashtirish bosqichlari bilan bogʻlangan.

---

## Ishlab chiqish muhitini sozlash

### Dastlabki talablar

- **Node.js** `>=22.22.3 <23` yoki `>=24.0.0 <27` (tavsiya etiladi: 24 LTS)
- **npm** 10+

> **npm v11+ foydalanuvchilari (Node 24+):** `npm install` dan soʻng mahalliy modullar oʻrnatilganini tekshiring:
> `node -e "require('better-sqlite3')"`. Agar u `MODULE_NOT_FOUND` xatosi bilan bajarilmasa,
> `npm approve-scripts better-sqlite3 && npm install` buyrugʻini ishga tushiring. Quyidagiga qarang:
> [Muammolarni bartaraf etish](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonlash va oʻrnatish

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Muhit oʻzgaruvchilari

```bash
# Shablondan .env faylingizni yarating
cp .env.example .env

# Talab qilinadigan maxfiy kalitlarni yarating
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ishlab chiqish uchun asosiy oʻzgaruvchilar:

| Oʻzgaruvchi            | Ishlab chiqishdagi standart qiymat | Tavsif                       |
| ---------------------- | ---------------------------------- | ---------------------------- |
| `PORT`                 | `20128`                            | Server porti                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`           | Frontend uchun asosiy URL    |
| `JWT_SECRET`           | (yuqorida yarating)                | JWT imzolash maxfiy kaliti   |
| `INITIAL_PASSWORD`     | `CHANGEME`                         | Birinchi kirish paroli       |
| `APP_LOG_LEVEL`        | `info`                             | Jurnal tafsilotlari darajasi |

### Boshqaruv paneli sozlamalari

Boshqaruv paneli muhit oʻzgaruvchilari orqali ham sozlanishi mumkin boʻlgan funksiyalar uchun UI almashtirgichlarini taqdim etadi:

| Sozlama joylashuvi          | Almashtirgich                 | Tavsif                                                 |
| --------------------------- | ----------------------------- | ------------------------------------------------------ |
| Sozlamalar → Kengaytirilgan | Nosozliklarni tuzatish rejimi | Nosozliklarni tuzatish soʻrov jurnallarini yoqish (UI) |
| Sozlamalar → Umumiy         | Yon panel koʻrinishi          | Yon panel boʻlimlarini koʻrsatish/yashirish            |

Bu sozlamalar maʼlumotlar bazasida saqlanadi va qayta ishga tushirishlar davomida saqlanib qoladi; ular oʻrnatilganda muhit oʻzgaruvchilarining standart qiymatlarini bekor qiladi.

### Mahalliy muhitda ishga tushirish

```bash
# Ishlab chiqish rejimi (avtomatik qayta yuklash)
npm run dev

# Ishlab chiqarish uchun build
npm run build    # next build → .build/next/, soʻng assembleStandalone → dist/
npm run start

# Hissa qoʻshuvchilar oʻzgarishlari uchun faqat backend/API ni tezkor kompilyatsiya qilish
npm run build:contributor

# Reliz buildi (toza qayta build + HEAD sentinel — deploy uchun talab qilinadi)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA fayliga yozadi

# Keng tarqalgan port konfiguratsiyasi
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Hissa qoʻshuvchi buildi faqat kompilyatsiya tekshiruvini bajaradi: u mustaqil
tarqatma toʻplamini yigʻmaydi yoki ixtiyoriy mahalliy paketlash resurslarini build qilmaydi. Yetkazib beriladigan
toʻplamni tekshirishingiz kerak boʻlganda odatiy ishlab chiqarish buildidan foydalaning.

### Build natijasi tuzilishi

| Katalog   | Tarkibi                                                                              | Kuzatiladi |
| --------- | ------------------------------------------------------------------------------------ | ---------- |
| `src/`    | Ilova manba kodi (TypeScript / TSX)                                                  | Ha         |
| `.build/` | Oraliq fayllar — `next build` natijasi (gitignored, `distDir = .build/next`)         | Yoʻq       |
| `dist/`   | Yetkazib beriladigan toʻplam — `assembleStandalone` tomonidan yigʻiladi (gitignored) | Yoʻq       |

Build jarayoni bitta oʻtishda bajariladi:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js natijasi)
  └─ assembleStandalone()                 (mustaqil toʻplam + statik fayllar + public + mahalliy resurslarni nusxalaydi)
       └─ natija: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` bundan tashqari avval ikkala katalogni ham tozalaydi va deploy yaxlitligini tekshiruvchi sentinel sifatida
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) fayliga yozadi.

`npm run build:contributor` faqat backend uchun moʻljallangan build profilidan foydalanadi. Build davomida u
boshqaruv paneli UI fayllarini vaqtincha stub fayllar bilan almashtiradi, API marshrut ishlov beruvchilarini saqlab qoladi va builddan
soʻng asl fayllarni tiklaydi. Boshqaruv paneli UI qismiga taʼsir qiladigan oʻzgarishlar yoki relizni toʻliq
tekshirish uchun `npm run build` dan foydalaning; hissa qoʻshuvchi profili reliz buildining oʻrnini bosa olmaydi.

> **VPS deploy eslatmasi:** masofaviy image katalogi `/usr/lib/node_modules/omniroute/app/`
> oʻzgarmagan. Deploy vositalari `dist/` tarkibini unga rsync orqali koʻchiradi.
> Faqat repozitoriy ichidagi build natijasi yoʻli oʻzgardi (`app/` → `dist/`).

Standart URL manzillar:

- **Boshqaruv paneli**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git ish jarayoni

> ⚠️ **HECH QACHON toʻgʻridan-toʻgʻri `main` tarmogʻiga commit qilmang.** Har doim xususiyat tarmoqlaridan foydalaning.
>
> **PR bazasi:** faol `release/vX.Y.Z` tarmogʻini (`main` emas) maqsad qilib belgilang. Har bir reliz uchun alohida tarmoq + chiqarishda teg qoʻyish modeli haqida
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) fayliga
> qarang.

```bash
# Faol relizning eng soʻnggi nuqtasidan tarmoq yarating (misol: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... oʻzgartirishlar kiriting ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 bilan Pull Request oching
```

### Tarmoqlarni nomlash

| Prefiks     | Maqsad                              |
| ----------- | ----------------------------------- |
| `feat/`     | Yangi xususiyatlar                  |
| `fix/`      | Xatolarni tuzatish                  |
| `refactor/` | Kod tuzilishini qayta tashkil etish |
| `docs/`     | Hujjatlardagi oʻzgartirishlar       |
| `test/`     | Testlarni qoʻshish/tuzatish         |
| `chore/`    | Vositalar, CI, bogʻliqliklar        |

### Commit xabarlari

[Conventional Commits](https://www.conventionalcommits.org/) qoidalariga amal qiling:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Qoʻllanish sohalari (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testlarni ishga tushirish

```bash
# Barcha testlar (unit + vitest + ecosystem + e2e)
npm run test:all

# Bitta test fayli (Node.js ichki test ishga tushiruvchisi — aksariyat testlar shundan foydalanadi)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Faqat oʻzgartirishingiz taʼsir qilgan unit-testlar (CI darvozasi bilan bir xil TIA selektori, #8084)
npm run test:scoped            # oxirgi commitdagi (yoki ishchi daraxtdagi) oʻzgartirishlar
npm run test:scoped:staged     # faqat staged oʻzgartirishlar — pre-commit ishga tushirish bilan yaxshi ishlaydi
npm run test:scoped:full       # avval import-graf xaritasini qayta yarating (fayllarni qoʻshish/koʻchirishdan keyin)
# Exit 1 + "run the full suite" hub fayli (tsconfig, package.json, …) yoki
# xaritalanmagan manba oʻzgarganini anglatadi — selektor xavfsiz tarzda toʻxtaydi, u hech qachon sezdirmasdan oʻtkazib yubormaydi.

# Vitest (MCP serveri, autoCombo, kesh)
npm run test:vitest

# E2E testlari (Playwright talab qilinadi)
npm run test:e2e

# Protokol mijozlari E2E testlari (MCP transportlari, A2A)
npm run test:protocols:e2e

# Ekotizim mosligi testlari
npm run test:ecosystem

# Qamrov darvozasi: operatorlar/satrlar/funksiyalar/tarmoqlarning 60%i
npm run test:coverage
npm run coverage:report

# Lint + format tekshiruvi
npm run lint
npm run check

# Darvoza bilan himoyalangan haqiqiy upstream combo smoke testi (VPS ruxsati + haqiqiy provayder kreditlarini talab qiladi)
# HAQIQIY provayderlarga murojaat qiladi — ozgina xarajat qiladi. CI muhitida HECH QACHON ishlamaydi. Darvozasiz muammosiz oʻtkazib yuboriladi.
# Talab: ssh root@192.168.0.15 ruxsati (VPSdagi faqat oʻqish uchun DB snapshotidan foydalanadi).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS jonli smoke testi — oddiy Node ESM skriptlari, jonli .15 serveriga toʻgʻridan-toʻgʻri murojaat qiladi.
# Talab: ssh root@192.168.0.15 ruxsati (combolar SSH sqlite orqali yaratiladi/oʻchiriladi).
# HAQIQIY provayderlarga murojaat qiladi (kichik xarajat). Faqat __live_test__* combolarini yaratadi/oʻchiradi. CI muhitida HECH QACHON ishlamaydi.
# .15 serverida REQUIRE_API_KEY=false, shuning uchun API kaliti kerak emas, ammo oʻrnatilgan boʻlsa COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY qiymatlariga amal qiladi.
npm run test:combo:live:vps              # 7 ta HTTP ssenariysi (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # provayderlararo haqiqiy failover ssenariysini qoʻshadi (jami 8 ta)
```

Qamrov boʻyicha izohlar:

- `npm run test:coverage` asosiy unit-test toʻplami uchun manba qamrovini oʻlchaydi, `tests/**` ni istisno qiladi va `open-sse/**` ni oʻz ichiga oladi
- Pull requestlar operatorlar/satrlar/funksiyalar/tarmoqlar boʻyicha qamrov darvozasini **60%+** darajasida saqlashi kerak
- Agar PR `src/`, `open-sse/`, `electron/` yoki `bin/` ichidagi ishlab chiqarish kodini oʻzgartirsa, ayni PR ichida avtomatlashtirilgan testlarni qoʻshishi yoki yangilashi kerak
- `npm run coverage:report` soʻnggi qamrov ishga tushirilishidan olingan, har bir fayl boʻyicha batafsil hisobotni chiqaradi
- `npm run test:coverage:legacy` tarixiy taqqoslash uchun eski metrikani saqlab qoladi
- Qamrovni bosqichma-bosqich yaxshilash yoʻl xaritasi uchun `docs/ops/COVERAGE_PLAN.md` fayliga qarang

### Pull Request talablari

PR ochishdan oldin oʻzgartirgan narsangiz uchun yoʻnaltirilgan siklni ishga tushirish maqsadida
[Hissa qoʻshishning oltin yoʻli](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) dan foydalaning.
Toʻliq unit-test toʻplami (4 ta CI shardi), Vitest, **60%+** qamrov darvozasi va
ishlab chiqarish buildi CI masʼuliyatidir — ularni lokal ravishda ishga tushirish PR
tekshiruvlari allaqachon bermaydigan qoʻshimcha signal bermaydi va kichikroq kompyuterlarda host resurslarini toʻliq band qilishi mumkin (#8084):

- Oʻzgartirishingizni qamrab oladigan test fayllarini ishga tushiring: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` ni ishga tushiring
- Ishlab chiqarish kodi oʻzgarganda ayni PR ichida avtomatlashtirilgan testlarni qoʻshing yoki yangilang
- Ishlab chiqarish kodi oʻzgarganda PR tavsifiga oʻzgartirilgan yoki qoʻshilgan test fayllarini kiriting
- Loyiha sirlari CI muhitida sozlangan boʻlsa, PRdagi SonarQube natijasini tekshiring

Joriy test holati: quyidagilarni qamrab oluvchi **122 ta unit-test fayli**:

- Provayder translatorlari va formatni aylantirish
- Tezlikni cheklash, circuit breaker va chidamlilik
- Semantik kesh, idempotentlik, jarayonni kuzatish
- Maʼlumotlar bazasi amallari va sxemasi (21 ta DB moduli)
- OAuth jarayonlari va autentifikatsiya
- API endpoint validatsiyasi (Zod v4)
- MCP server vositalari va scope talablarini majburiy qoʻllash
- Memory va Skills tizimlari

---

## Kod uslubi

- **ESLint** — Oʻzgarishlarni yuborishdan oldin `npm run lint` buyrugʻini ishga tushiring
- **Prettier** — Oʻzgarishlarni yuborishda `lint-staged` orqali avtomatik formatlanadi (2 ta boʻsh joy, nuqtali vergullar, qoʻsh tirnoqlar, 100 ta belgi kengligi, es5 uslubidagi yakuniy vergullar)
- **TypeScript** — Barcha `src/` kodi `.ts`/`.tsx` dan foydalanadi; `open-sse/` esa `.ts`/`.js` dan foydalanadi; TSDoc (`@param`, `@returns`, `@throws`) bilan hujjatlashtiring
- **`eval()` taqiqlanadi** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` qoidalarini majburiy qoʻllaydi
- **Zod validatsiyasi** — Barcha API kirish maʼlumotlarini tekshirish uchun Zod v4 sxemalaridan foydalaning
- **Nomlash**: Fayllar = camelCase/kebab-case, komponentlar = PascalCase, konstantalar = UPPER_SNAKE

### Xatolarni qayta ishlash / boʻsh catch bloklari

Hech qachon `catch` blokini izohsiz qoldirmang. Uni quyidagi ikki toifadan biriga ajrating (bu
“SSE oqimlaridagi xatolarni hech qachon indamay yutib yubormang” qatʼiy qoidasini amalda qoʻllaydi):

- **Ataylab (oʻzimizning imkon qadar bajariladigan tozalash/telemetriya kodimiz)** — bu yerdagi xatolik kutiladi va
  zararsizdir; bir qatorli sabab izohini qoʻshing, jurnalga yozmang (har bir soʻrovni jurnalga yozish
  ushbu kelishuv oldini oladigan ortiqcha shovqindir).

  ```ts
  } catch {} // mijoz uzilganidan keyin allaqachon yopilgan kontrollerni yopishga urinish kutiladi
  ```

- **Jurnalga yozilishi kerak (tashqi/chaqiruvchi taqdim etgan kod yoki xatoni yutish boshqaruv oqimini oʻzgartirsa)** — `catch`
  blokini saqlang (uning oqimni buzishiga hech qachon yoʻl qoʻymang), ammo xatoni aniqlash mumkin boʻlishi uchun kontekstli
  `console.debug`/`warn` xabarini chiqaring.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure qayta chaqiruv funksiyasi xatosi:", e);
  }
  ```

Amalda qoʻllangan misollar uchun `open-sse/utils/stream.ts` va `open-sse/utils/streamHandler.ts` fayllariga qarang.

---

## Loyiha tuzilishi

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Boshqaruv paneli sahifalari (23 ta boʻlim)
│   ├── api/                # API marshrutlari (51 ta katalog)
│   └── login/              # Autentifikatsiya sahifalari (.tsx)
├── domain/                 # Siyosat mexanizmi (policyEngine, comboResolver, costRules va boshqalar)
├── lib/                    # Asosiy biznes mantiqi (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokoli serveri
│   ├── acp/                # Agent Communication Protocol reyestri
│   ├── compliance/         # Muvofiqlik siyosati mexanizmi
│   ├── db/                 # SQLite domen modullari + 130 ta migratsiya
│   ├── memory/             # Doimiy suhbat xotirasi
│   ├── oauth/              # OAuth provayderlari, xizmatlari va yordamchi vositalari
│   ├── skills/             # Kengaytiriladigan koʻnikmalar freymvorki
│   ├── usage/              # Foydalanishni kuzatish va xarajatni hisoblash
│   └── localDb.ts          # Faqat qayta eksport qilish qatlami — bu yerga hech qachon mantiq qoʻshmang
├── middleware/              # Soʻrov vositachi dasturi (promptInjectionGuard)
├── mitm/                   # MITM proksi (sertifikat, DNS, maqsadni marshrutlash)
├── shared/
│   ├── components/         # React komponentlari (.tsx)
│   ├── constants/          # Provayder taʼriflari (329 ta), MCP doiralari, 19 ta marshrutlash strategiyasi
│   ├── utils/              # Avtomatik uzgich, sanitayzer, autentifikatsiya yordamchilari
│   └── validation/         # Zod v4 sxemalari
└── sse/                    # SSE proksi konveyeri

open-sse/                   # @omniroute/open-sse ish maydoni
├── executors/              # 89 ta ijrochi amalga oshirish moduli
├── handlers/               # 11 ta soʻrov ishlovchisi (chat, javoblar, embeddinglar, tasvirlar va boshqalar)
├── mcp-server/             # MCP serveri (110 ta noyob vosita, 3 ta transport, 33 ta doira)
├── services/               # 178 ta yuqori darajadagi xizmat (combo, autoCombo, rateLimitManager va boshqalar)
├── translator/             # Format tarjimonlari (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformeri
└── utils/                  # 22 ta yordamchi modul (oqim, TLS, proksi, jurnalga yozish)

electron/                   # Electron ish stoli ilovasi (turli platformalar uchun)

tests/
├── unit/                   # Node.js test bajaruvchisi (1 574 ta test fayli)
├── integration/            # Integratsion testlar
├── e2e/                    # Playwright testlari
├── security/               # Xavfsizlik testlari
├── translator/             # Tarjimonga xos testlar
└── load/                   # Yuklama testlari

docs/
├── adr/                     # Arxitektura qarorlari yozuvlari
├── architecture/            # Tizim arxitekturasi va bardoshlilik
├── comparison/              # OmniRoute va muqobil yechimlar taqqoslanishi
├── compression/             # Siqish boʻyicha qoʻllanmalar va qoidalar
├── dev/                     # Ishlab chiqish boʻyicha qoʻllanmalar
├── diagrams/                # Arxitektura diagrammalari
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Foydalanuvchi qoʻllanmasi, Docker, sozlash, muammolarni bartaraf etish
├── i18n/                    # Xalqarolashtirilgan README tarjimalari
├── marketing/               # Marketing materiallari
├── ops/                     # Joylashtirish, proksi, qamrov, relizlar
├── providers/               # Provayderlarga xos hujjatlar
├── reference/               # API maʼlumotnomasi, muhit oʻzgaruvchilari, CLI vositalari, bepul tariflar
├── releases/                # Reliz qaydlari
├── routing/                 # Avtomatik kombinatsiya mexanizmi, mulohazalarni qayta ijro etish
├── screenshots/             # Boshqaruv paneli skrinshotlari
├── security/                # Himoya cheklovlari, muvofiqlik, yashirinlik, tokenlar
└── specs/                   # Dizayn spetsifikatsiyalari
```

---

## Yangi provayder qoʻshish

### 1-qadam: Provayder konstantalarini roʻyxatdan oʻtkazish

`src/shared/constants/providers.ts` fayliga qoʻshing — modul yuklanganda Zod yordamida tekshiriladi.

### 2-qadam: Ijrochini qoʻshish (agar maxsus mantiq kerak boʻlsa)

Asosiy ijrochini kengaytiruvchi ijrochini `open-sse/executors/your-provider.ts` faylida yarating.

### 3-qadam: Tarjimonni qoʻshish (agar format OpenAI formatida boʻlmasa)

Soʻrov/javob tarjimonlarini `open-sse/translator/` ichida yarating.

### 4-qadam: OAuth konfiguratsiyasini qoʻshish (agar OAuth asosida boʻlsa)

OAuth hisob maʼlumotlarini `src/lib/oauth/constants/oauth.ts` fayliga, xizmatni esa `src/lib/oauth/services/` ichiga qoʻshing.

Agar yuqori oqim provayderi ommaviy OAuth client_id/secret yoki Firebase Web API kalitini oʻzining ommaviy CLI / brauzer toʻplami ichida tarqatsa, uni satr literali sifatida joylashtirmang. `open-sse/utils/publicCreds.ts` faylidagi `resolvePublicCred()` funksiyasidan foydalaning va `EMBEDDED_DEFAULTS` ichiga niqoblangan bayt yozuvini qoʻshing. Toʻliq majburiy ish jarayoni [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) hujjatida bayon qilingan.

Ishlov beruvchilar/ijrochilar ichida mijozga yetib boradigan xato xabarlari `open-sse/utils/error.ts` faylidagi `buildErrorBody()` / `sanitizeErrorMessage()` orqali oʻtishi shart — hech qachon xom `err.stack` yoki `err.message` qiymatini Response tanasiga joylashtirmang. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) hujjatiga qarang.

### 5-qadam: Modellarni roʻyxatdan oʻtkazish

Model taʼriflarini `open-sse/config/providerRegistry.ts` fayliga qoʻshing.

### 6-qadam: Testlarni qoʻshish

`tests/unit/` ichida kamida quyidagilarni qamrab oluvchi birlik testlarini yozing:

- Provayderni roʻyxatdan oʻtkazish
- Soʻrov/javobni tarjima qilish
- Xatolarni qayta ishlash

---

## Pull Request nazorat roʻyxati

- [ ] Testlar muvaffaqiyatli oʻtadi (`npm test`)
- [ ] Lint tekshiruvi muvaffaqiyatli oʻtadi (`npm run lint`)
- [ ] Yigʻish muvaffaqiyatli yakunlanadi (`npm run build`)
- [ ] Yangi ommaviy funksiyalar va interfeyslar uchun TypeScript turlari qoʻshilgan
- [ ] Qattiq kodlangan maxfiy maʼlumotlar yoki zaxira qiymatlar mavjud emas
- [ ] Ommaviy yuqori oqim hisob maʼlumotlari `resolvePublicCred()` orqali joylashtirilgan ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) hujjatiga qarang), hech qachon literal sifatida emas
- [ ] Xato javoblari `buildErrorBody()` / `sanitizeErrorMessage()` orqali oʻtadi — javob tanalarida xom stek treyslari mavjud emas ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) hujjatiga qarang)
- [ ] Shell buyruqlari (`exec` / `spawn`) bajarilish vaqtidagi qiymatlarni satr interpolyatsiyasi orqali emas, `env` orqali uzatadi
- [ ] Barcha kiruvchi maʼlumotlar Zod sxemalari yordamida tekshirilgan
- [ ] Foydalanuvchiga taʼsir qiladigan oʻzgarishlar uchun `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` ostiga oʻzgarishlar jurnali **fragmenti** qoʻshilgan ([`changelog.d/README.md`](./changelog.d/README.md) hujjatiga qarang) — `CHANGELOG.md` faylini bevosita tahrirlamang; fragmentlar reliz vaqtida birlashtiriladi va PRlar oʻrtasida hech qachon ziddiyat keltirib chiqarmaydi
- [ ] Hujjatlar yangilangan (agar tegishli boʻlsa)
- [ ] Yangi CodeQL / Secret-Scanning ogohlantirishlari ochilmagan yoki ularning har biri tegishli `docs/security/` hujjatiga havola qiluvchi texnik asos bilan rad etilgan
- [ ] Ichki jarayonlarni ishga tushiradigan marshrutlar (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` faylida `isLocalOnlyPath()` sifatida tasniflangan — [15-qatʼiy qoida](docs/security/ROUTE_GUARD_TIERS.md)ga qarang
- [ ] Commit xabarlarida `Co-Authored-By` yakuniy satrlari mavjud emas — commitlar faqat repozitoriy egasining Git identifikatori ostida koʻrinishi kerak (16-qatʼiy qoida)

---

## Reliz qilish

Relizlar `/generate-release` ish jarayoni orqali boshqariladi. Yangi GitHub Release yaratilganda, paket GitHub Actions orqali **avtomatik ravishda npm’ga nashr qilinadi**.

VPS’ga joylashtirish uchun `npm run build:release` buyrug‘idan foydalaning (`npm run build` emas) — u toza
qayta yig‘ishni amalga oshiradi, to‘plamni `dist/` ichiga jamlaydi va `dist/BUILD_SHA` nazorat faylini yozadi.
So‘ng `dist/` tarkibini masofaviy `app/` katalogiga rsync orqali sinxronlaydigan `/deploy-vps-*-cc` ko‘nikmalaridan foydalaning.

---

## Yordam olish

- **Arxitektura**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) fayliga qarang
- **API ma’lumotnomasi**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) fayliga qarang
- **Xavfsizlik hujjatlari**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Ekspluatatsiya hujjatlari**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Muammolar**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR’lar**: Arxitektura qarorlari yozuvlari uchun `docs/adr/` katalogiga qarang
