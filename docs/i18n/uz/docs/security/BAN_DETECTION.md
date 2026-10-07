# Account-Ban / Banned-Keyword Detection (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute yuqori oqimdagi xato javoblarini provayder **hisobi butunlay yaroqsiz holga kelganini** (toʻxtatilgan / faolsizlantirilgan / xizmat shartlarini buzganligi uchun bloklangan) bildiruvchi signallar uchun tekshiradi va moslik aniqlanganda, ushbu ulanishni **terminal `banned` holatiga** oʻtkazadi, natijada u boshqa soʻrovlar uchun tanlanmaydi. **Security → Banned Keywords** sozlamalar kartasi aynan shuni sozlaydi ("Hisobni doimiy bloklashni aniqlashni ishga tushiradigan qoʻshimcha kalit soʻzlar. Ichki kalit soʻzlar har doim qoʻllanadi.").

Ushbu sahifada ichki roʻyxat, aniqlash jarayoni, uning qoʻllanish doirasi, maxsus kalit soʻzlarni xavfsiz qoʻshish usuli va belgilangan ulanishni qayta tiklash tartibi hujjatlashtirilgan. Terminal holatning oʻzi barqarorlik modelining bir qismidir — [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminal holatlar") boʻlimiga qarang.

**Asosiy manba:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`),
shuningdek, terminal boʻlmagan tekshiruv klassi
(`ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` / `isAccountVerificationRequired()`) va undan
foydalanadigan 403 tarmogʻi uchun `open-sse/services/errorClassifier.ts`.

## Oʻrnatilgan kalit soʻzlar

Quyidagi 7 ta quyi satr har doim (katta-kichik harflardan qatʼi nazar), har qanday maxsus roʻyxatdan mustaqil ravishda qoʻllanadi:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Provayderlar bloklash matnlarini oʻzgartirishi bilan bu roʻyxat ham rivojlanib boradi. Ishonchli
> nusxa `open-sse/services/accountFallback.ts` ichidagi `ACCOUNT_DEACTIVATED_SIGNALS`;
> yuqoridagi blokni muayyan vaqtdagi holat sifatida qabul qiling.

### Bloklash emas: operator aralashuvi bilan hal qilinadigan tasdiqlash soʻrovlari

`verify your account to continue` **ilgari** yuqoridagi roʻyxatda edi. Bu bloklash
signali emas va hozir `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` ichida joylashgan boʻlib,
ulanishni terminal holatga oʻtkazish oʻrniga tiklanadigan `PROJECT_ROUTE_ERROR` sifatida tasniflanadi.

Google Cloud Code / Antigravity uni `403 VALIDATION_REQUIRED` sifatida qaytaradi. U
**vaqtinchalik boʻlib, sogʻlom va kvotasi toʻliq hisoblarda ham yuz beradi** — amaldagi
joriy etishda oʻlchangan (2026-09-25, `proxy_logs`): bitta Antigravity ulanishi 10 daqiqa
ichida shunday 403 javobidan 33 tasini qaytardi va `active` holatida qoldi, ayni paytda
barcha 17 oynada kvotasining 100 % ini saqlab turgan boshqa ulanish **bitta** shunday
javob tufayli doimiy ravishda bloklandi. Yagona farq — qaysi urinishga xizmat koʻrsatilganida edi.

Bu farq muhim, chunki terminal moslik `permanent: true` hisoblanadi (1 yillik sovush davri,
hech qachon avtomatik tiklanmaydi), tasdiqlash soʻrovini esa operator brauzerda bartaraf etadi.
Ushbu iborani bloklash roʻyxatida saqlash `classifyProviderError` ichidagi tiklanadigan
cloud-code 403 tarmogʻini ham bu ifoda uchun erishib boʻlmaydigan holga keltirgan, chunki
`accountDeactivated` birinchi boʻlib tekshiriladi — shu sababli Gemini Code Assist uchun
[#868](https://github.com/diegosouzapw/OmniRoute/pull/868) va
[#6452](https://github.com/diegosouzapw/OmniRoute/pull/6452) da qoʻshilgan loyiha-marshrutini tiklash
hech qachon ishga tushmas edi.

Yonma-yon joylashgan quyidagi uchta, **alohida** signal jadvali bloklangan kalit soʻzlarni aniqlashning
qismi _emas_:

- `CREDITS_EXHAUSTED_SIGNALS` — billing/kvota tugagan (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **terminal emas**; tokenni yangilash orqali tiklash mumkin.
- `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` — **terminal emas**; operator hisobni yuqori
  oqimda qayta tasdiqlashi kerak. `open-sse/services/errorClassifier.ts` ichida joylashgan
  (qolgan ikkitasi `accountFallback.ts` ichida). Yuqoridagi boʻlimga qarang.

Eslatma: **`rate limit`** / `429` kabi odatiy vaqtinchalik iboralar tezlik cheklovi /
ulanishni sovutish yoʻli orqali qayta ishlanadi va bloklash signallari **emas**.

## Aniqlash jarayoni

```
yuqori oqimdagi xato javobi
  → tana satrga aylantiriladi + kichik harflarga oʻtkaziladi
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [quyi satr boʻyicha moslik]
  → moslik bormi?
      → ulanish testStatus = "banned"      (doimiy — 1 yillik kutish muddati, hech qachon avtomatik tiklanmaydi)
      → agar `autoDisableBannedAccounts` sozlamasi yoqilgan boʻlsa va `autoDisableBannedScope`
        ushbu ulanishni qamrab olsa (`all` yoki OAuth/cookie/session uchun `subscription`)
        → isActive = false ham oʻrnatiladi. Qamrov `subscription` boʻlganda oldindan
        toʻlangan API kalitlari faol boʻlib qoladi.
      → hisobni tanlash paytida ulanish oʻtkazib yuboriladi (birlashtirilgan QUOTA_BLOCKING holatlari)
```

- Moslik javob **tanasi** boʻylab **harflar registriga bogʻliq boʻlmagan quyi satr** qidiruvi orqali aniqlanadi (`isAccountDeactivated`, `accountFallback.ts`).
- `banned` yakuniy holatiga doimiy oʻtkazish bloklash signali mavjud tanada **istalgan HTTP holatida** ishga tushadi (`markAccountUnavailable` → `checkFallbackError` orqali). Torroq **`deactivated`** yorligʻi (ulanishda zaxira API kalitlari boʻlmaganda `isActive=false`) ichki `chatCore.ts` yoʻli orqali **HTTP 401 / 403** holatlarida yoziladi (`classifyProviderError` → `ACCOUNT_DEACTIVATED` orqali tasniflanadi). Eʼtibor bering, `markAccountUnavailable()` yoʻli xuddi shu `ACCOUNT_DEACTIVATED` signali uchun `resolveTerminalConnectionStatus` orqali _boshqa_ yakuniy holatni — **`expired`** — yozadi. Shu sababli bir xil bloklash javobni qaysi yoʻl qayta ishlaganiga qarab `deactivated` yoki `expired` sifatida koʻrinishi mumkin. (Eski kod izohida “401 javob tanasida ushbu satrlar mavjud boʻlganda” deyiladi — bu joriy xatti-harakatni toʻliq ifodalamaydi.)
- `banned` holatidagi ulanish yakuniy holatlar filtrlanadigan barcha joylarda tanlovdan chiqarib tashlanadi (`isTerminalConnectionStatus`, birlashtirilgan `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Qamrov — qaysi provayderlar skanerlanadi

**Barcha provayderlar.** Tekshiruv har bir muvaffaqiyatsiz yuqori oqim soʻrovi oʻtadigan umumiy xatolarni qayta ishlash konveyerida bajariladi — u faqat OAuth/obuna skreyperlari bilan **cheklanmagan**. Natijaviy terminal holat provayderga emas, har bir **ulanishga** tegishli.

Shu bilan birga, ichki _satrlar_ real bloklanish xavfiga ega obuna/OAuth provayderlariga yoʻnaltirilgan (ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity). API kaliti asosidagi provayder detektorni faqat uning xato matni quyi satrlardan birini aynan oʻz ichiga olgan taqdirdagina ishga tushiradi.

`autoDisableBannedScope` (`all` | `subscription`, standart qiymat `all`) moslik aniqlanganda `isActive=false` ham oʻrnatilishini boshqaradi. `subscription` kirish uslubidagi oʻrinlarni anglatadi (pulli obunalar va bepul hisoblar, jumladan veb-cookie seanslari). U oldindan toʻlangan API kalitlari uchun ham `testStatus=banned` holatini qayd etadi, ammo ularni marshrutlash pulida qoldiradi. Barqaror yechim — har bir provayder va har bir hisob uchun alohida qayta belgilash; global enum dastlabki yechimdir.

## Maxsus bloklangan kalit soʻzlar

Kalit soʻzlarni **Security → Banned Keywords** boʻlimida qoʻshing yoki olib tashlang (`PATCH /api/settings` orqali global `customBannedSignals` sozlamasi sifatida saqlanadi). Ular ichki roʻyxatga **qoʻshiladi** — hech qachon uni almashtirmaydi — va saqlanganda (hamda ishga tushishda) `setCustomBannedSignals()` orqali qayta yuklanadi. Har bir kalit soʻz 200 ta belgi bilan cheklangan; massiv uzunligi uchun cheklov yoʻq.

**⚠ Notoʻgʻri ijobiy natija xavfi — aniq iboralarni tanlang.** Aniqlash butun javob matnida oddiy quyi satr mosligiga asoslanadi va moslik **doimiy** hisoblanadi (1 yillik kutish davri, qoʻlda tiklash). Juda umumiy kalit soʻz mutlaqo sogʻlom ulanishni bloklab qoʻyishi mumkin:

- **Yomon:** `quota`, `limit`, `error`, `denied` — koʻplab vaqtinchalik xatolarda uchraydi.
- **Yaxshi:** bloklanishni bildiruvchi toʻliq jumlalar, masalan, `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Provayder haqiqiy bloklanishda qaytaradigan eng uzun, bir maʼnoli iborani afzal koʻring. Shubha tugʻilsa, avval ulanishning `lastError` qiymatini kuzating, keyin aynan oʻsha matnni qoʻshing.

## Belgilangan ulanishni tiklash

Terminal `banned` / `deactivated` holatlari **hech qachon avtomatik tiklanmaydi** (ular proaktiv tiklash siklidan chiqarib tashlangan — faqat `unavailable` kutish muddatlari oʻz-oʻzidan tiklanadi). Operator ularni aniq tarzda tozalashi kerak:

1. **Ulanishni qayta sinang** — boshqaruv panelidagi **Test** amali
   (`POST /api/providers/{id}/test`); muvaffaqiyatli tekshiruv `testStatus` qiymatini
   `active` holatiga qaytaradi va xato maydonlarini tozalaydi.
2. **Qayta autentifikatsiya qiling / hisob maʼlumotlarini tahrirlang** — OAuth provayderlari uchun kirish
   / yangilash oqimini qayta bajaring; provayder yaratish/import marshrutlari `isActive = true` qiymatini oʻrnatadi.
3. **Ulanishni qayta yoqing** — agar avtomatik oʻchirish `isActive = false` qiymatini oʻrnatgan boʻlsa
   (`all` qamrovi yoki OAuth/cookie/seans ulanishi uchun `subscription`),
   hisob tuzatilgach uni qayta yoqing.

Alohida "bloklash bayrogʻini tozalash" tugmasi yoʻq — tiklash qayta sinash, qayta autentifikatsiya qilish yoki qayta yoqish orqali amalga oshiriladi; bu [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) hujjatidagi umumiy terminal-holat qoidasiga mos keladi.

## Tekshiruvni izolyatsiya qilish (barcha modellarni sinash)

`runAsProbe` ichida bajarilgan **tekshiruvdan kelib chiqqan nosozlik** (barcha modellarni sinash / sogʻliqni tekshirish joʻnatmalari) hech qachon ulanishni puldan olib tashlamaydi (#9817): u **koʻrinuvchanlik uchun qayd etiladi** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), ammo marshrutlashdagi **barcha** oʻzgarishlarni chetlab oʻtadi — kutish muddatlari, terminal holat (`banned` / `deactivated` / `credits_exhausted`), har bir model uchun bloklashlar, provayderning avtomatik uzgichi, 5 daqiqalik kvota keshi, OAuth tokenini yangilash va avtomatik oʻchirish. Faqat haqiqiy soʻrov yoʻlidagi nosozlik faolsizlantiradi. Qayd etilgan xato belgilangan hisobga trafikni uzatishda davom etgan holda uni boshqaruv panelida koʻrinadigan qiladi.

Yagona qaror nuqtasi — `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`); unga tekshiruvdan kelib chiqqan nosozlik sabab marshrutlash holatini oʻzgartirishi mumkin boʻlgan **har bir** joy murojaat qiladi:

- `markAccountUnavailable` (`auth.ts`) — faqat qayd etish (`lastError` xom matni,
  `lastErrorType`, `errorCode`, `lastErrorAt`; ataylab `backoffLevel` **yoʻq**,
  chunki u tanlash vaqtidagi avtomatik pasayishni ishga tushirib, qaydni oʻchirib yuboradi)
- `maybeAutoDisableBannedAccount` — avtomatik oʻchirish yoʻq
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (faqat qayd etish,
  terminal `credits_exhausted` holatisiz), GEO_BLOCKED (24 soatlik chiqarib tashlash yoʻq),
  MODEL_NOT_FOUND (`lockModel` yoʻq), codex 429 hisobni almashtirish orqali uzilishdan himoyalash
  (`markCodexScopeRateLimited` yoʻq, saqlanadigan `rate_limited_until` yoʻq,
  seansga bogʻliqlikni tozalash yoʻq), `persistCodexQuotaState` (kvota holatini yozish yoʻq,
  keshni bekor qilish yoʻq), `recordKeyHealthStatus` (kalit sogʻligʻi rotatori
  oʻzgartirilmaydi)
- OAuth yangilanishi — ijrochi bazasidagi proaktiv yangilanish
  (`base.ts` `execute()`, hech qanday yangilash tokeni rotatsiyasi sarflanmaydi) hamda
  `chatCore` ichidagi reaktiv 401/403 yoʻli (`expired` faolsizlantirishi yoʻq)
- `chat.ts` — provayder avtomatik uzgichi va 5 daqiqalik kvota keshi
  (`markAccountExhaustedFrom429`) hech qachon yomonlashtirilmaydi

Qayd etilgan xato belgilangan hisobga trafikni uzatishda davom etgan holda uni boshqaruv panelida koʻrinadigan qiladi. Eslatma: haqiqiy yoʻldagi `slice(0,100)` qisqartirishidan farqli ravishda, tekshiruv qaydi **xom** (kesilmagan) xato matnini saqlaydi.

Barcha modellarni sinashdan texnik xizmat vositasi sifatida foydalanadigan operatorlar tarixiy xatti-harakatni (tekshiruv haqiqiy generatsiya sifatida hisoblanadi) quyidagilardan biri orqali tiklashi mumkin:

- `probeCanDisable` sozlamasi (`POST /api/settings` soʻrovi
  `{"probeCanDisable": true}` bilan yoki `key_value` maʼlumotlar bazasini bevosita tahrirlash), yoki
- **`PROBE_CAN_DISABLE=true`** funksional bayrogʻi (muhit yoki maʼlumotlar bazasidagi qayta belgilash; sozlamadan ustun turadi).

Xavfsiz nosozlik rejimi: bayroq yoki sozlamani qidirish xato bersa, izolyatsiya YOQILGAN holda qoladi.

## Manba fayllari

| Yoʻnalish                                  | Fayl                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Signal jadvallari + moslashtirish          | `open-sse/services/accountFallback.ts`                                                                        |
| Yakuniy holatga oʻtkazish / saqlash        | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Avtomatik oʻchirish qamrovi                | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Ichki tasniflash                           | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Yakuniy holatni tiklashdan chiqarish       | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Maxsus kalit soʻzlarni ish vaqtida yuklash | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Sozlamalar interfeysi                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
