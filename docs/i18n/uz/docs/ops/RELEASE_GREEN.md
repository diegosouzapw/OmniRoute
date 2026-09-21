# Release-Green: keeping the queue and release branch green (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Bu hal qiladigan muammo

**Toʻliq tekshiruv** (`.github/workflows/ci.yml` — unit shardlari, vitest, ratchetlar,
`package-artifact`, SonarQube, E2E) **faqat reliz PRida** (PR → `main`) ishlaydi. `release/**`ga
yoʻnaltirilgan PRlar **tezkor tekshiruvlar**ni (`quality.yml`: TIA taʼsir qilgan testlar + typecheck + lint)
va koddagi oʻzgarishlar uchun **tavsiyaviy** production buildni oladi. Natijada: faqat relizda
aniqlanadigan xatolar reliz branchida sezdirmay toʻplanib borishi va reliz vaqtida
**har safar bittadan, ~40 daqiqalik qatlamlarda portlashi** mumkin.

“release-green oilasi” ana shu xatolarni **oldindan aniqlash** uchun mavjud — toʻliq tekshiruvning
ekvivalentini istalgan vaqtda **lokal ravishda / relizdan tashqarida** tekshiradi, shunda reliz PRi
CI birinchi marta ishga tushirilganidayoq muvaffaqiyatli oʻtadi.

> **Murosasiz tamoyil:** bularning hech biri hissa qoʻshuvchini bloklamaydi. Biz uning PRi
> muvaffaqiyatsiz boʻlishiga olib keladigan majburiy tekshiruvni qoʻshmaymiz. **Siljish** (ratchetlar)
> reliz vaqtida maintainer tomonidan qayta bazalanishi uchun moʻljallangan — bu hech qachon hissa
> qoʻshuvchining tashvishi emas. Hech bir qism PRni **yopmaydi** (mualliflikni oʻzlashtirish) yoki
> oʻtishi uchun testni **zaiflashtirmaydi**.

## Oila (4 qism) — va har biri qanday mustaqil ishlaydi

| Qism                                                                     | Bu nima                                                                                   | Qachon ishga tushirish                                                   | Qamrov                          |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------- |
| **`/green-prs`** (Yechim A)                                              | Maintainer tomonidan **ochiq PRlar navbati**ni talab asosida tekshirish                   | **Mustaqil, davriy ravishda** — ayniqsa **`/generate-release`dan oldin** | Butun PR navbati → `release/**` |
| **`/validate-release-green`** (Yechim C — `npm run check:release-green`) | Tekshirish mexanizmi: branch YOKI merge nomzodiga nisbatan toʻliq tekshiruvni takrorlaydi | Mustaqil ravishda, istalgan vaqtda                                       | Muayyan branch yoki merge-PR    |
| **`/babysit <PR#>`**                                                     | **Bitta** PRning **jonli CI** jarayonini muvaffaqiyatli holatgacha olib boradi            | Mustaqil ravishda, har bir PR uchun                                      | Bitta PR                        |
| **`nightly-release-green.yml`** (Yechim D)                               | Avtomatlashtirilgan tungi workflow; HARD xatolikda issue ochadi                           | Avtomatik (cron)                                                         | Faol reliz branchi              |

**“Bu faqat relizlar uchunmi?” degan savolga qisqa javob:** **yoʻq.** `/green-prs`
**davriy ravishda, relizlar oraligʻida** ishlash uchun yaratilgan. Uni mustaqil ishga tushirish —
odatiy holat; reliz esa uni ishga tushirish eng katta samara beradigan payt, xolos.

## PRdan relizgacha tavsiyaviy build

`quality.yml` endi draft bo‘lmagan kod PRlari va Mergify navbat branchlari uchun `Build (advisory)`ni o‘z ichiga oladi.
U `ci.yml`dagi production build retseptini takrorlaydi: Node 24, `npm-ci-retry`,
`check:node-runtime` va `OMNIROUTE_USE_TURBOPACK=1` bilan `npm run build`. U ataylab
build artefaktini yuklamaydi, chunki bu workflowda undan hech qanday keyingi sifat jobi foydalanmaydi.
Signal PRdan relizgacha bloklovchi gate bo‘lishi uchun reliz PRlari bir hafta barqaror ishlaganidan so‘ng
`continue-on-error`ni olib tashlang.

## Yechim C — `npm run check:release-green` (dvigatel)

Joriy working treeda relizga teng tekshiruvni takrorlaydi va har bir muvaffaqiyatsizlikni tasniflaydi:

- **HARD** (typecheck, lint xatolari, unit, vitest, db-rules, public-creds, ixtiyoriy
  `package-artifact`) → **haqiqiy nuqson**; `exit 1`. Source branchda tuzatiladi (TDD, 18-qoida).
- **DRIFT** (eslint **ogohlantirishlari**, cognitive-complexity, file-size) → sikl davomida to‘plangan ratchet og‘ishi,
  **bu hissa qo‘shuvchining aybi emas**; u faqat hisobotda ko‘rsatiladi va **reliz vaqtida maintainer tomonidan
  qayta bazalanadi**. Drift **hech qachon** exit kodini o‘zgartirmaydi — shu sababli u hech kimni bloklamaydi.

```bash
npm run check:release-green                 # joriy branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # tuzilmaviy chiqish
node scripts/quality/validate-release-green.mjs --quick  # unit+vitestni o‘tkazib yuboradi (faqat drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifactni o‘z ichiga oladi (sekin)
```

Faqat tashxislaydi va **hisobot beradi** (avtomatik tuzatish yo‘q). Green holatga keltirish orkestratsiyasi
`/green-prs` va `/review-prs`da joylashgan.

## Yechim A — `/green-prs` (navbatni skanerlash)

Jarayon (qisqacha — tafsilotlar uchun `green-prs` skilliga qarang):

1. Faol reliz branchiga nisbatan ochiq PRlar navbatini **inventarizatsiya qiling**.
2. Har bir PRni **saralang** (yaroqli / rad etishga arziydi / muallif aralashuvi kerak) — rad etiladigan yoki muallif aralashuvi kerak bo‘lganlar
   **hisobot qilinadi, yopilmaydi** (muallif qaror qiladi).
3. Har bir yaroqli PRni **izolyatsiyalangan worktree**da (19-qoida) relizning eng so‘nggi holatiga olib keling va
   `npm run check:release-green`ni ishga tushiring:
   - **HARD** → hammualliflik orqali **hissa qo‘shuvchining branchida** tuzating (muallifning "Merged" holatini saqlaydi),
     barcha HARDlar bartaraf etilgunicha qayta ishga tushiring.
   - **DRIFT** → o‘z holicha qoldiring; u reliz vaqtida qayta bazalanadi.
4. PR × (hukm, HARD muvaffaqiyatsizliklar, tuzatildimi?, DRIFT, hozir release-greenmi?) jadvalini **taqdim eting**.

Navbatni merge qilmasdan **tayyorlashi** mumkin; faqat aniq so‘ralgandagina merge qiladi — va hech qachon PRni yopmaydi.

## Tavsiya etilgan davriylik

- **`/green-prs`ni muntazam ravishda** (masalan, har hafta) va **har doim
  `/generate-release`dan oldin** ishga tushiring.
- **`nightly-release-green.yml`**ni (Yechim D) uzluksiz signal sifatida saqlang: u HARD muvaffaqiyatsizligi bo‘yicha issue ochganda,
  skanerlash vaqti kelgan bo‘ladi.
- Branch yoki muayyan merge nomzodini tekshirish uchun **`/validate-release-green`**dan zaruratga qarab foydalaning.
- Muayyan PRni jonli CI’da green holatga yetkazish kerak bo‘lganda **`/babysit <PR#>`**dan foydalaning.

## Reliz bilan bog‘liqligi

- `/generate-release` tekshiruvni **0-bosqichda (dastlabki tekshiruv)** chaqiradi: reliz PRini ochishdan oldin DRIFTni qayta bazalaydi va
  HARDni tuzatadi.
- `/review-prs` merge qarori bosqichida release-green gatedan foydalanadi (mergedan oldin green).

Barcha qismlarning maqsadi bir xil: reliz kuni 40 daqiqalik qatlamlarda
muvaffaqiyatsizliklardan muvaffaqiyatsizliklarga o‘tish o‘rniga, **birinchi CI ishga tushirishidayoq green reliz PRiga ega bo‘lish**.
