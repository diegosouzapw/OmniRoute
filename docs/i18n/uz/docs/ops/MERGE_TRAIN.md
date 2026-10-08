# Merge Queue & Manual Merge-Train Runbook (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 versiyasidan boshlab (sifat/tezlik rejasining WS3.2/WS3.4 bandlari), ko‘rib chiqilgan PRlarni `release/vX.Y.Z` ichiga birlashtirish uchun standart yo‘l — **Mergify birlashtirish navbati** (`.mergify.yml`);
quyida hujjatlashtirilgan **qo‘lda boshqariladigan birlashtirish poyezdi** esa ZAXIRA USUL bo‘lib, nosozliklar, relizni muzlatish davrlari yoki Mergify Open Source rejasi o‘zgargan taqdirda ishlatiladi.

## Standart yo‘l: Mergify navbati

1. PR kampaniyalar tomonidan ko‘rib chiqiladi/yashil holatga keltiriladi va egasining birlashtirishdan oldingi ⭐
   nazoratidan o‘tadi (hisobot + har bir band bo‘yicha qaror — `/merge-prs` dagi 0.75-qadamga qarang).
2. Egasi (yoki egasining qarori asosida ish yuritayotgan sessiya) **`queue`**
   yorlig‘ini qo‘llaydi. Yorliqning O‘ZI birlashtirishga ruxsatdir; Mergify uni faqat bajaradi.
3. Mergify navbatdagi 10 tagacha PRni bir to‘plamga jamlaydi, to‘plamni tezkor nazoratlardan o‘tkazadi
   va birlashtiradi (squash). Qizil to‘plam **avtomatik ravishda ikkiga bo‘linadi** — muammoli PR
   taxminan log2(N) ta qayta tekshiruv orqali ajratib olinadi va navbatdan chiqariladi; qolganlari davom etadi.
4. Birlashtirishdan keyin uzluksiz release-green ish jarayoni push paytida yangi uchni tekshiradi
   va kombinatsiya regressiyaga olib kelgan bo‘lsa, sababni aniqlash masalasini ochadi (hech qachon avtomatik qaytarmaydi).

Himoya qoidalari (`CLAUDE.md` dagi 21/22-sonli qat’iy qoidalarga mos):

- **Reliz muzlatilgan** → muzlatilgan branchni nishonga olgan PRlarga yorliq qo‘ymang; avval ularni
  faol `release/vX+1` ga qayta yo‘naltiring.
- **Boshqa sessiyaning jarayondagi PRi** → unga hech qachon yorliq qo‘ymang; faqat egalik qiluvchi sessiya
  o‘z ishini navbatga qo‘yadi.
- Faqat testlardan iborat difflar va `hotfix` yorlig‘iga ega PRlar allaqachon qisqartirilgan CI jarayonidan o‘tadi
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane bo‘limiga qarang); navbat shartlari amalda bajarilgan
  istalgan tekshiruvlar to‘plamini qabul qiladi (`#check-failure=0` + `#check-pending=0`).

## Zaxira usul: qo‘lda boshqariladigan birlashtirish poyezdi

Navbat mavjud bo‘lmaganda ishlatiladi. Bu v3.8.47 sikli davomida bir kunda 33 ta PRni
yakunlash imkonini bergan amaliyotni rasmiylashtiradi:

1. **To‘plamni shakllantiring** (ko‘rib chiqilgan+tasdiqlangan taxminan 10–30 ta PR). `linked:` to‘qnashuvlarini
   (bir xil `tap.testFiles`, CHANGELOG ichidagi bir xil qismlar) tekshiring va ularni ketma-ket bajaring.
2. **BIR MARTA tekshiring**: reliz uchidan yaratilgan alohida worktree ichida barcha to‘plam
   headlarini lokal ravishda birlashtiring, so‘ng relizga tenglashtirilgan testlar to‘plamini ishga tushiring
   (`npm run check:release-green`, relizdan oldin `--with-build` qo‘shing).
   `scripts/release/merge-train.sh <base> <PR#>…` 1–2-qadamlarni avtomatlashtiradi (to‘qnashuvchi
   PRlar chiqarib yuboriladi, poyezd esa davom etadi). To‘liq rejim `npm run test:unit` ni — kompyuterga
   moslangan runnerni (`--test-concurrency=20`) — ishga tushiradi; asosiy bosqichni 16 yadroli kompyuterning
   taxminan 25% quvvatida ishlashga majbur qilgan ikkita ketma-ket 4 yadroli CI shardini **emas**
   (2026-07-18 da tuzatilgan). `--fast` (kun davomida mega-poyezdlarni yakunlash uchun, egasi tomonidan
   2026-07-18 da tasdiqlangan) barcha statik nazoratlar + vitestni saqlab qoladi, ammo faqat poyezdga qo‘shilgan
   PRlar o‘zgartirgan node:test fayllarini ishga tushiradi; TO‘LIQ testlar to‘plami jamlangan uchda
   kuniga kamida bir marta bajarilishi shart (`--fast` siz bitta poyezd).
3. **Yashil** → PRlarni ketma-ket birlashtiring (har biridan oldin `state,headRefOid` ni qayta tekshiring —
   headi o‘zgargan PR qayta ko‘rib chiqishga yuboriladi). Har bir birlashtirishning yakuniy diffi
   PRning o‘z o‘zgarishigina ekanini isbotlang (avtomatik hal qilish orqali qaytarishlarga yo‘l qo‘ymang:
   qamrovdan tashqari o‘chirishlarni aniqlash uchun `git diff --stat` ni tekshiring).
4. **Qizil** → birma-bir qayta tekshirish o‘rniga to‘plamni teng ikkiga bo‘ling (har bir yarmini tekshiring);
   muammoli PRni dalillar bilan birga qayta ko‘rib chiqish navbatiga qaytaring.
5. **Hech qachon**: muzlatish davrida muzlatilgan branchga birlashtirmang; hech qayerda `git stash`
   ishlatmang; qizil holat yo‘qolishiga umid qilib CI’ni yoppasiga qayta ishga tushirmang
   (qoida: qizil holat — bu axborot).

## Darajalash (nega faqat tezkor nazoratlar bilan navbat xavfsiz)

- **Har bir PR uchun** (quality.yml tezkor nazoratlari): TIA ta’sir doirasidagi testlar + to‘liq 4-shardli unit testlar +
  vitest + lint to‘plami + typecheck + hujjatlar/changelog yaxlitligi.
- **Har bir to‘plam/uch uchun** (uzluksiz release-green): release branchga har bir pushda `--quick` QAT’IY nazoratlari;
  to‘liq `--with-build --full-ci` tekshiruvlari kuniga 3 marta.
- **Har bir reliz uchun** (reliz PRidagi ci.yml): E2E ×9, package-artifact + tarball boot-smoke,
  coverage/ratchetsni o‘z ichiga olgan to‘liq matritsa.

Hech narsa avvalgidan kamroq tekshirilmaydi — og‘ir qamrov shunchaki har bir PR uchun emas,
har bir to‘plam/uch uchun bajariladi; aynan shu O(N) borib-kelishlarni bartaraf etadi.
