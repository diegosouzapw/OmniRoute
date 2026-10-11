# Merge Queue & Manual Merge-Train Runbook (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 versiyasidan boshlab (sifat/tezlik rejasining WS3.2/WS3.4 bandlari) tekshiruvdan oʻtgan PRlarni `release/vX.Y.Z` ichiga birlashtirishning standart yoʻli — **Mergify birlashtirish navbati** (`.mergify.yml`);
quyida hujjatlashtirilgan **qoʻlda boshqariladigan birlashtirish poyezdi** esa ZAXIRA USUL hisoblanadi — u nosozliklar, relizni muzlatish davrlari yoki Mergify Open Source rejasi oʻzgargan taqdirda qoʻllanadi.

## Standart yoʻl: Mergify navbati

1. PR kampaniyalar tomonidan koʻrib chiqiladi/ijobiy holatga keltiriladi va egasining birlashtirishdan oldingi ⭐
   nazorat bosqichida tasdiqlanadi (hisobot + har bir band boʻyicha qaror — `/merge-prs` dagi 0.75-bosqichga qarang).
2. Egasi (yoki egasining qarori asosida ish yuritayotgan seans) **`queue`**
   yorligʻini qoʻllaydi. Yorliqning OʻZI birlashtirishga ruxsatdir; Mergify uni faqat bajaradi.
3. Mergify navbatdagi PRlarni tezkor nazorat bosqichlari boʻyicha **ketma-ket**
   (bir vaqtning oʻzida bittadan) tekshiradi va birlashtiradi (squash). Toʻplamlash + avtomatik biseksiya pulli Mergify tarifiga
   kiradi (bepul tarifda "Cannot use Merge Queue batch", #7220), shuning uchun `.mergify.yml` faylida
   `batch_size` belgilanmagan; toʻplamlash quyidagi qoʻlda boshqariladigan birlashtirish poyezdining vazifasi boʻlib qoladi. Tekshiruvlari
   `checks_timeout` dan (240 daqiqa = `quality.yml` uchun oʻlchangan p95 ning 2 baravari) keyin ham kutilayotgan PR
   navbatni toʻxtatib qoʻymasligi uchun navbatdan chiqariladi.
4. Birlashtirishdan keyin uzluksiz relizni ijobiy holatda saqlash ish jarayoni push paytida yangi uchni
   tekshiradi va kombinatsiya regressiyaga olib kelgan boʻlsa, tegishlilik muammosini ochadi (hech qachon avtomatik qaytarmaydi).

Himoya qoidalari (`CLAUDE.md` dagi 21/22-sonli qatʼiy qoidalarni takrorlaydi):

- **Reliz muzlatilishi faol** → muzlatilgan branchga yoʻnaltirilgan PRlarga yorliq qoʻymang; avval
  faol `release/vX+1` ga qayta yoʻnaltiring.
- **Boshqa seansning jarayondagi PRi** → unga hech qachon yorliq qoʻymang; faqat egasi boʻlgan seans
  oʻz ishini navbatga qoʻyadi.
- Faqat testlardan iborat difflar va `hotfix` yorligʻi qoʻyilgan PRlar allaqachon qisqartirilgan CIʼni ishga tushiradi (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane boʻlimiga qarang); navbat shartlari amalda ishga tushgan istalgan
  tekshiruvlar toʻplamini qabul qiladi (`#check-failure=0` + `#check-pending=0`).

## Zaxira usul: qoʻlda boshqariladigan birlashtirish poyezdi

Navbat mavjud boʻlmaganda ishlatiladi. Bu v3.8.47 sikli davomida bir kunda 33 ta PRni
yakunlash imkonini bergan amaliyotni rasmiylashtiradi:

1. **Paketni yigʻing** (tekshirilgan+tasdiqlangan taxminan 10–30 ta PR). `linked:` toʻqnashuvlarini
   (bir xil `tap.testFiles`, bir xil CHANGELOG qismlari) tekshiring va ularni ketma-ket bajaring.
2. **BIR MARTA tekshiring**: reliz uchidan ajratilgan izolyatsiyalangan worktree ichida paketdagi barcha
   headlarni lokal ravishda birlashtiring, soʻng relizga tenglashtirilgan toʻplamni ishga tushiring
   (`npm run check:release-green`, relizdan oldin `--with-build` qoʻshing).
   `scripts/release/merge-train.sh <base> <PR#>…` 1–2-qadamlarni avtomatlashtiradi (toʻqnashuvchi
   PRlar chiqarib yuboriladi, poyezd davom etadi). Toʻliq rejim `npm run test:unit` ni — qurilmaga
   moslangan runnerni (`--test-concurrency=20`) ishga tushiradi; **ikkita ketma-ket 4 yadroli CI
   shardini emas**, chunki ular 16 yadroli qurilmada asosiy bosqichni taxminan 25% yuklanish bilan
   ishlatgan (2026-07-18 da tuzatilgan). `--fast` (kun ichidagi yirik poyezdlarni yakunlash uchun,
   egasi tomonidan 2026-07-18 da tasdiqlangan) barcha statik nazoratlar + vitest ni saqlab qoladi,
   ammo faqat poyezdga qoʻshilgan PRlar oʻzgartirgan node:test fayllarini ishga tushiradi; TOʻLIQ
   toʻplam jamlangan uchda kuniga kamida bir marta ishga tushirilishi shart (`--fast` siz bitta poyezd).
3. **Yashil** → PRlarni ketma-ket birlashtiring (har biridan oldin `state,headRefOid` ni qayta tekshiring —
   headi oʻzgargan PR qayta tekshiruvga kiradi). Har bir birlashtirishning yakuniy diffi
   PRning oʻz oʻzgarishidan iborat ekanini isbotlang (avtomatik hal qilish natijasidagi qaytarishlarga yoʻl qoʻymang:
   doiradan tashqaridagi oʻchirishlarni aniqlash uchun `git diff --stat` ni tekshiring).
4. **Qizil** → bittadan qayta tekshirish oʻrniga paketni yarmiga boʻling (har bir yarmini tekshiring);
   muammoli PRni dalillar bilan tekshiruv navbatiga qaytaring.
5. **Hech qachon**: muzlatish davrida muzlatilgan shoxga birlashtirmang; hech qayerda `git stash`
   ishlatmang; qizil holat yoʻqoladi degan umidda CIʼni yoppasiga qayta ishga tushirmang (qoida:
   qizil holat — bu axborot).

## Darajalash (nega navbat faqat tezkor nazoratlar bilan xavfsiz)

- **Har bir PR uchun** (quality.yml tezkor nazoratlari): TIA taʼsiridagi testlar + toʻliq 4-shardli unit testlar +
  vitest + lint toʻplami + typecheck + hujjatlar/changelog yaxlitligi.
- **Har bir paket/uch uchun** (uzluksiz release-green): reliz shoxiga har bir pushda `--quick` QATʼIY
  nazoratlari; kuniga 3 marta toʻliq `--with-build --full-ci` tekshiruvlari.
- **Har bir reliz uchun** (reliz PRidagi ci.yml): toʻliq matritsa, jumladan E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Hech narsa avvalgidan kamroq tekshirilmaydi — ogʻir tekshiruvlar qatlami shunchaki har bir PR uchun emas,
har bir paket/uch uchun ishga tushiriladi va aynan shu O(N) qatnovlarini yoʻq qiladi.

## `merge-train.sh` uchun yangi checkout talablari

Skript buzilgan oʻrnatish hech qachon qizil poyezd koʻrinishida namoyon boʻlmasligi uchun asosiy checkoutda
(har qanday worktree ishidan oldin) xatoda darhol toʻxtaydigan **dastlabki tekshiruv**ni bajaradi:

1. `npm ci`, soʻng npm bloklaydigan `bun` postinstall jarayonini ishga tushiring:
   `(cd node_modules/bun && node install.js)` — aks holda `check:provider-consistency`
   va `check:known-symbols` (ikkalasi ham `bun scripts/…`) poyezdda HAM, asosda HAM
   qoidabuzarlik qatorisiz muvaffaqiyatsiz tugaydi.
2. Ortiqcha `node_modules/node_modules` boʻlmasligi kerak (takroriy bogʻliqliklar daraxti; React ikki marta
   yuklanadi va UI vitest toʻplamlari darhol muvaffaqiyatsiz tugaydi).
3. `node_modules/.bin/tsc` mavjud va bajariladigan boʻlishi kerak (qisman oʻrnatishda u boʻlmaydi).

Poyezd bloklovchi `npm run check:cycles:ratchet` ni ishga tushiradi; oddiy `npm run check:cycles`
faqat tavsiyaviydir (u SCC roʻyxatini chiqaradi va hatto sogʻlom asosda ham noldan farqli kod bilan yakunlanadi).
