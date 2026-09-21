# Subscription-first routing (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Ikkita yangi `auto/*` identifikatori — `auto/subscription` va `auto/thrifty`. Har ikkalasi ham
> faqat soʻralganda ishga tushadi: chaqiruvchi identifikatorni nomi bilan soʻramaguncha, hech narsa
> ular orqali yoʻnaltirilmaydi va mavjud pullar, strategiyalar yoki standart sozlamalar oʻzgarmaydi.

## Bu nima uchun mavjud

OmniRoute allaqachon xarajatga oid ikkita savolga javob beradi, ammo ularning hech biri aksariyat operatorlar soʻraydigan savol emas.

| Mavjud mexanizm                                          | Javob beradigan savol                                |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "bu model katalogda bepul deb koʻrsatilganmi?"       |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "bu ulanish menga qachondir hisob yozishi mumkinmi?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "bu ulanish oʻz limitiga yaqinlashganmi?"            |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "xarajatni cheklash, eng arzoniga tushirish"         |

Faqat bepul variantlarga moʻljallangan har bir mexanizm **yopiq tarzda ishlamay qoladi** — tugagan bepul pul
boʻsh pulga aylanadi, hech qachon pulli variantga koʻtarilmaydi — va pulli tomondagi har bir mexanizm
darajalarni farqlamaydi. Ularning hech biri quyidagi savolga javob bermaydi:

> "Men allaqachon pul toʻlayotgan kvotadan foydalan. U tugaganda yo toʻxta, yo eng arzon pulli
> variantlar boʻylab bir vaqtning oʻzida bittadan pogʻona koʻtaril — va kvota tiklangan zahoti unga qayt."

## Billing modelga emas, ulanishga xos xususiyatdir

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)` boʻyicha kalitlaydi va
katalog narxlaridan `free | cheap | premium` qiymatini qaytaradi. Ammo soʻrov qoʻshimcha xarajat
keltirib chiqarishi **uni qaysi ulanish обслуживает** ekaniga bogʻliq: ayni bir model Claude Code
OAuth ulanishi orqali tarif rejasiga kiritilgan boʻlishi, API kalitli ulanish orqali esa har bir token uchun
hisoblanishi mumkin.

`provider_connections.auth_type` hech bir yoʻnalishda ishonchli proksi emas — hisoblagichli OAuth
ulanishlari ham, tarif rejasiga kiritilgan API kalitli ulanishlar ham mavjud (Copilot ish oʻrni tokeni
hisoblagichli API kaliti emas). Shu sababli billing klassi **sinchiklab tuzilgan katalog** —
`open-sse/config/connectionBillingCatalog.ts` orqali, har bir provayderning eʼlon qilingan shartlariga
muvofiq qoʻlda belgilanadi — bu bepul modellar uchun `FreeModelBudget.hardStopGuaranteed`
allaqachon joriy qilgan yondashuvning oʻzidir.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Aniqlash tartibi (`autoCombo/connectionBilling.ts`): autentifikatsiyasiz sintetik sentinel →
`keyless`; provayderga **va** `authType` qiymatiga mos katalog yozuvi; provayder miqyosidagi yozuv;
aks holda `unknown`. **Katalogga kiritilmagan narsa bepul emas** — `unknown` hamma joyda
`metered` sifatida qabul qilinadi, shuning uchun ertaga qoʻshilgan provayder dastlab obuna
pogʻonasidan tashqarida boʻladi va ataylab katalogga kiritilishi kerak.

## Pogʻonalar modeli

Eskalat­siya tartibida beshta pogʻona. Ular faqat narxi bilan farq qilmaydi — har birining **oʻz**
tugash signali mavjud, shu sababli bu shunchaki saralash emas.

| #   | Pogʻona        | Aʼzolik                                               | Quyidagi holatda tugagan hisoblanadi   |
| --- | -------------- | ----------------------------------------------------- | -------------------------------------- |
| 0   | `subscription` | sinchiklab belgilangan `billing: "subscription"`      | kvota oynasi chegarada yoki undan past |
| 1   | `keyless`      | autentifikatsiyasiz sintetik yoʻl                     | ulanishning kutish davri / uzgich      |
| 2   | `free`         | hisoblagichli ulanish, `classifyTier() === "free"`    | bepul limit tugagan                    |
| 3   | `cheap`        | hisoblagichli ulanish, `classifyTier() === "cheap"`   | pogʻona budjeti sarflangan             |
| 4   | `premium`      | hisoblagichli ulanish, `classifyTier() === "premium"` | pogʻona budjeti sarflangan             |

0-2-pogʻonalar kuzatilishi mumkin boʻlgan va allaqachon hisobga olinadigan **kvota** tugashi sababli
yakunlanadi. 3-4-pogʻonalarda kvota yoʻq — pulli ulanish cheksiz xizmat qiladi — shu sababli ular uchun
tugashning yagona oqilona signali har bir pogʻona uchun alohida **budjet**dir. Busiz, "arzon variant
tugaganda yuqoriga koʻtarilish" uchun hech qanday ishga tushirish signali mavjud emas.

## `auto/subscription` — yopiq rejimda rad etish

Pul = faqat 0-pogʻona; u ortiqcha foydalanish holati hujjatlarda `hard-stop` sifatida ko‘rsatilgan va kvota zaxirasi mavjudligi real vaqt rejimida tekshirilgan ulanishlar bilan cheklanadi. Barcha noaniq holatlar chiqarib tashlanadi: saralanmagan provayder, tekshirib bo‘lmaydigan kvota ko‘rsatkichi, eskirgan ko‘rsatkich yoki pulli foydalanish sifatida hisoblanadigan ortiqcha sarf.

Bo‘sh pul — nuqson emas, **kutilgan** natija: chaqiruvchining mavjud bo‘sh pul yo‘li buni yashirin, pulli zaxira variantiga emas, aniq xatoga aylantiradi. Ushbu identifikatorning butun kafolati shundan iborat.

`keyless` ataylab mos deb hisoblanmaydi: bu guruhlash «men haq to‘laydigan tarif» degan ma’noni anglatadi, shuning uchun autentifikatsiyasiz backend unga kirmaydi. Buning uchun `auto/thrifty` (yoki `auto/best-free`) dan foydalaning.

### Ulanish xavfsizligi

Nomzod har doim ham bitta ulanishga bog‘lanmaydi — mantiqiy nomzod `allowedConnectionIds` ruxsat ro‘yxatini olib yuradi, amalda ishlatiladigan hisob esa keyinroq, jo‘natish vaqtida `open-sse/services/combo/autoStrategy.ts` tomonidan tanlanadi. Shu sababli, har ikkala guruhlash ham **har bir ulanishni alohida** tekshiradi va `allowedConnectionIds` ni aynan tekshiruvdan o‘tgan quyi to‘plamgacha qisqartiradi — hech qachon dastlabki to‘liq ro‘yxatgacha emas va hech qachon ixtiyoriy tanlangan bitta a’zogacha emas. `autoStrategy.ts` bu massivni allaqachon qat’iy ruxsat ro‘yxati sifatida qo‘llagani sababli, uni shu yerda qayta yozish «tekshirilgan» va «amalda ishlatilgan» to‘plamlarni tuzilish jihatidan bir xil qiladi. Bu [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) dagi invariant va mantiqiy asos bilan bir xil.

## `auto/thrifty` — har safar bittadan pog‘onaga ko‘tarilish

Pul = pog‘ona indeksi bo‘yicha tartiblangan barcha pog‘onalar; kvotasi tugagan nomzodlar chiqarib tashlanadi. `auto` mexanizmi omon qolgan pul **ichida** hamon ball beradi: narvon qaysi pog‘onalar ishtirok etishini, ball berish esa ular ichida qaysi nomzod g‘olib bo‘lishini belgilaydi. Pog‘ona ichidagi tartib barqaror, shuning uchun ball beruvchining o‘z reytingi bu ustama tomonidan hech qachon qayta tartiblanmaydi.

Bu yangi dispetcher emas, balki tartiblash va cheklash ustamasi: `combo.ts` dagi spekulyativ sikl allaqachon maqsadlarni tartib bilan ko‘rib chiqadi va muvaffaqiyatsizlikda keyingisiga o‘tadi. Shu sababli, dastlabki tekshiruv aniqlamagan ish vaqtidagi kvota tugashi ham ayni so‘rov doirasida keyingi pog‘onaga ko‘tarilishga olib keladi.

`auto/subscription` yopiq rejimda rad etsa, `auto/thrifty` **ochiq** rejimda davom etadi: yaroqli kvota ko‘rsatkichi bo‘lmagan, tarifga kiritilgan ulanish baribir birinchi bo‘lib sinab ko‘riladi. Uni sinash hech qanday xarajat talab qilmaydi va agar uning kvotasi tugagan bo‘lsa, keyingisiga o‘tish mexanizmi baribir navbatdagi pog‘onaga yetib boradi. Aksincha, uni sinashdan bosh tortish telemetriya mavjud bo‘lmaganda so‘rovni pulli pog‘onaga yuborgan bo‘lardi — bu guruhlash aynan shunday natijaning oldini olish uchun yaratilgan.

## Tiklanishdan keyin tarifga qaytish

Marshrutlash 0-pog‘onaga qaytishidan oldin uchta mustaqil holatning muddati tugashi kerak. Ulardan faqat bittasini tuzatish narvonni tarif qayta to‘ldirilganidan ancha keyin ham pulli pog‘onalarda tiqilib qolishiga olib keladi.

1. **Kvota holati keshi** — `freeAccessQuota.ts` har bir `(provider, connection)` uchun 180s TTL bilan keshlaydi. O‘zining `resetAt` vaqti allaqachon o‘tgan keshlangan yozuv endi mavjud bo‘lmagan davrni tavsiflaydi, shuning uchun u yoshidan **qat’i nazar** eskirgan deb hisoblanadi va yangilashni majburiy qiladi. Busiz, yarim tunda qayta to‘ldirilgan tarif TTL muddati tasodifan tugamaguncha kvotasi tugagan deb ko‘rsatilishda davom etadi.
2. **Narvonning o‘z holati** — loyihaga ko‘ra, bunday holat mavjud emas. Pog‘onaga moslik har bir pul tuzilishida jonli kvota holati asosida qayta hisoblanadi; tiklanishdan uzoqroq yashab, marshrutlashni tiqib qo‘yishi mumkin bo‘lgan saqlanuvchi «hozir 3-pog‘onada» yozuvi mavjud emas.
3. **Ulanishning kutish davri** — kvota tugashiga sabab bo‘lgan 429 eksponensial kechiktirish asosida `rateLimitedUntil` ni o‘rnatadi va bu tarif ulanishi uchun haqiqiy tiklanish vaqtidan oshib ketishi mumkin. `clampCooldownToReset()` (`subscriptionLadder.ts`) kutish davrini yuqori oqimdagi tiklanish vaqtigacha qisqartiradi va uni hech qachon uzaytira olmaydi. **U amalga oshirilgan va sinovdan o‘tkazilgan, ammo hali ulanmagan**: `src/sse/services/auth.ts` da kvota keshi har qanday kutish davri yozilishidan _oldin_ bekor qilinadi, shuning uchun `resetAt` ushbu funksiyaning oldingi qismida yozib olinishi kerak. Bu barqarorlikning kritik bajarilish yo‘liga kiritiladigan o‘zgarish bo‘lib, alohida ko‘rib chiqiladigan PR doirasida bajarilishi kerak. Ungacha qayta kirish ulanishning kutish davri tugashini kutadi (provayder yuborganida bu davr yuqori oqimdagi `Retry-After` ko‘rsatmalarini allaqachon afzal ko‘radi).

### Tebranishga qarshi himoya

Hozirgina tiklangan pog‘ona faqat `reentryMinRemainingPercent` dan (standart qiymat 5) yuqori bo‘lganda qayta qabul qilinadi, ayni paytda ishlatilayotgan ulanish esa faqat `exitCutoffPercent` dan (standart qiymat 2, `quotaPreflight.defaultThresholdPercent` ga mos) yuqorida qolishi kerak. Bu ikki qiymat orasidagi farq gisterezis oralig‘idir — usiz chegaraga yaqin turgan ulanish ketma-ket so‘rovlarda pog‘onalar orasida tebranib turadi.

## Konfiguratsiya

Faqat nozik sozlash uchun. Ataylab `enabled` bayrogʻi **mavjud emas**: bularni oʻchira oladigan almashtirgich `auto/subscription` nomi aksini vaʼda qilishiga qaramay, toʻliq pulni — pullik modellarni ham — sezdirmay taqdim etishiga olib kelardi.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 pogʻonani butunlay oʻchiradi
  },
}
```

Xarajat aniqlagichi ulanmaguncha budjet boʻyicha cheklash faol emas: hisob-kitob mavjud boʻlmasa, pullik pogʻona tartibga kiritiladi, ammo hech qachon cheklanmaydi. v3.8.51 versiyasidan boshlab `rungBudgetUsd` sozlamasi sxema tomonidan qabul qilinadi, ammo hali qoʻllanilmaydi — uni faol xarajat chegarasi emas, zaxiralangan konfiguratsiya deb hisoblang. Pogʻonalarni tartiblash, kvota asosida tugash va qayta tiklashdan soʻng qayta kirish — bularning barchasi usiz ham ishlaydi.

## Kompozitsiya

`subscription` va `thrifty` — `AutoTier` qiymatlari, shu sababli ular har bir kategoriya bilan birlashtiriladi:
`auto/coding:thrifty`, `auto/reasoning:subscription` va hokazo. Ikki yassi identifikator
(`auto/subscription`, `auto/thrifty`) `/v1/models` va boshqaruv panelida eʼlon qilinadi.

Hech bir identifikator pullik darajaga tegishli emas, shu sababli `isPaidTierAutoId()` ikkalasi uchun ham `false` qaytaradi va `auto/subscription` `hidePaidModels` qoʻllanilganda ham saqlanib qoladi.

## Kod joylashuvi

| Vazifa                                         | Fayl                                                |
| ---------------------------------------------- | --------------------------------------------------- |
| Saralangan billing maʼlumotlari                | `open-sse/config/connectionBillingCatalog.ts`       |
| Klassifikator                                  | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Pogʻonalar, ikkala guruhlash va qayta kirish   | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Nomzodlar toʻplamiga ulash                     | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Qayta tiklashni hisobga oluvchi kesh eskirishi | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Daraja interfeysi                              | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Eʼlon qilingan identifikatorlar                | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testlar                                        | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
