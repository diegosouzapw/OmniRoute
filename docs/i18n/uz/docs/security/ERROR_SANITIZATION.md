# Error Message Sanitization (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Haqiqatning asosiy manbasi:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` va `open-sse/utils/error.ts` ichidagi ommaviy builderlar
> **Testlar:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Oxirgi yangilanish:** 2026-09-02 — v3.8.51
> **Auditoriya:** Xato javoblari bilan ishlaydigan har qanday muhandis (HTTP marshrutlari, SSE oqimlari, ijrochilar, MCP ishlov beruvchilari).
> **Holat:** Mijozga xato xabarini qaytaradigan har bir kod yoʻli uchun **MAJBURIY**.

## Bu nima uchun mavjud

CodeQL’ning `js/stack-trace-exposure` qoidasi (CWE-209) bajarilish vaqtidagi istisnodan kelib chiqqan xato xabari tozalanmasdan HTTP / SSE javobiga yetib boradigan har qanday kod yoʻlini belgilaydi. Ishlab chiqarish muhitidagi javoblarda stek treyslari va mutlaq fayl yoʻllari tajovuzkorlarga quyidagilarni beradi:

- Ichki katalog tuzilishi (`/srv/app/src/lib/...`) → keyingi hujumlar uchun razvedka maʼlumoti.
- Stek freymlaridan aniqlangan kutubxona / freymvork versiyalari → maqsadli ekspluatatsiyani tanlash imkoniyati.
- Xatolarga satr interpolatsiyasi orqali kiritilishi mumkin boʻlgan maxfiy bajarilish vaqti qiymatlari (DB soʻrovlari, konfiguratsiya qiymatlari).

`open-sse/utils/error.ts` tomonidan eksport qilinadigan `sanitizeErrorMessage` yordamchi funksiyasi quyidagi turdagi
maʼlumot sizib chiqishlarini olib tashlaydi:

1. Jismoniy, serializatsiya qilingan va shubhasiz qator ichidagi JavaScript stek freymlarining yakuniy qismlari.
2. Xavfsiz HTTPS URL’lari va aniq belgilangan API marshrutlarini saqlab qolgan holda mutlaq POSIX, Windows, UNC va `file://` fayl tizimi yoʻllari.
3. Hisob maʼlumotlari tayinlanmalari, keng tarqalgan provayder token formatlari, shaxsiy kalit PEM bloklari va base64 maʼlumot
   URL’lari.

Sanitayzer kirish uzunligini cheklaydi va tashlangan qiymatni satrga aylantirish rad etilsa, xavfsiz tarzda yopiladi.
Rekursiv yuqori oqim JSON sanitizatsiyasi ham javob serializatsiya qilinishidan oldin xavfli hisob maʼlumotlari/yoʻl kalitlari, seans taxalluslari va
prototipni boshqaruvchi kalitlarni olib tashlaydi.

## Majburiy andoza

### 1. Xato javobini yaratish (HTTP / API marshrutlari)

`buildErrorBody()` dan foydalaning — sanitizatsiya ichiga oʻrnatilgan:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... ishlov beruvchi mantiqi ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Yoki shu moduldagi qulay yordamchi funksiyalar uchun:

```ts
import {
  errorResponse, // bir martalik Response obyekti
  writeStreamError, // SSE yozuvchisi
  createErrorResult, // { success: false, status, response, ... } shakli
  unavailableResponse, // Retry-After qoʻshadi
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Bularning barchasi kanonik ommaviy xato chegarasini qoʻllaydi. `errorResponse`, `writeStreamError` va
`createErrorResult` `buildErrorBody` orqali oʻtadi; qayta urinish/zanjir uchun uchta maxsus yordamchi
ommaviy kontekstini bevosita proyeksiyalaydi va sanitizatsiya qiladi. Ushbu yordamchi funksiyalardan foydalanganda **`sanitizeErrorMessage` funksiyasini hech qachon
qoʻlda chaqirishingiz shart emas**.

### 2. Maxsus xato konvertlari (kamdan-kam)

Yuqoridagi yordamchi funksiyalardan foydalana olmaganingizda (masalan, javob shakli Connect-RPC kabi yuqori oqim protokoli tomonidan belgilangan boʻlsa), `sanitizeErrorMessage` funksiyasini bevosita import qiling:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Bu maxsus xato tanasini tuzishning yagona ruxsat etilgan usulidir. Namuna implementatsiya uchun `open-sse/executors/cursor.ts::buildErrorResponse` ga qarang.

### 3. Jurnalga yozish va javob qaytarish

Ishonchli ichki istisnolar toʻliq xabari va stekini saqlab qolishi mumkin, shunda operatorlar muammoni tuzata oladi. Provayder, validatsiya, brauzer seansi yoki hisob maʼlumotlariga aloqador chegaralardan kelib chiqadigan qiymatlar konsol chiqishi, audit metamaʼlumotlari yoki doimiy chaqiruv jurnallariga kirishidan oldin
sanitizatsiya qilinishi kerak. Andoza:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // faqat ishonchli ichki istisno
  return errorResponse(500, getErrorMessage(err)); // sanitizatsiya qilingan — mijozga yuboriladi
}
```

Provayder tomonidan boshqariladigan xatoliklar uchun jurnalga yoziladigan qiymatni ham proyeksiyalang:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Taqiqlangan andozalar

❌ **Hech qachon** xom istisno chiqishini Response tanasiga joylamang:

```ts
// YOMON: stek treysi + fayl yoʻllari mijozga yetib boradi
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Hech qachon** birinchi qatorni ajratuvchi oʻz yechimingizni yaratmang:

```ts
// YOMON: mutlaq yoʻllarni olib tashlamaydi, kanonik yordamchi funksiyadan chetlashishi mumkin
const safe = String(err).split("\n")[0];
```

❌ **Hech qachon** faqat marshrutda sanitizatsiya qilib, SSE yoʻlini unutmang. Oqimga yozadigan har qanday narsa `writeStreamError` (yoki uning asosidagi `buildErrorBody`) orqali oʻtadi.

❌ **Hech qachon** xato xabarlariga ataylab `process.cwd()`, `__filename`, `__dirname` yoki env’dan olingan yoʻllarni
kiritmang. Sanitayzer mutlaq yoʻllarni chuqur himoya chorasi sifatida qamrab oladi, biroq chaqiruvchilar avvalambor
topologiyani oshkor qiluvchi xabarlarni tuzmasligi kerak.

## CI’da qamrov

`tests/unit/error-message-sanitization.test.ts` quyidagilarni majburiy tekshiradi:

- `/api/model-combo-mappings/*` ostidagi har bir marshrut 4xx/5xx holatlarida sanitizatsiya qilingan javob tanalarini qaytaradi.
- `sanitizeErrorMessage` ko‘p qatorli stek-treyslarni olib tashlaydi.
- `sanitizeErrorMessage` POSIX va Windows mutlaq yo‘llarini `<path>` bilan almashtiradi.
- `sanitizeErrorMessage` `null`/`undefined`/`Error` nusxasi kirishlarini xavfsiz tarzda qayta ishlaydi.
- `buildErrorBody` o‘zining `message` maydonida hech qachon stek-treyslarni oshkor qilmaydi.

Yangi marshrut yoki ijrochini qo‘shayotganda, tasdiqlash andozasini ushbu fayldan nusxalang. Qamrov chegarasi (`npm run test:coverage`) operatorlar/qatorlar/funksiyalar/tarmoqlar uchun ≥60% qamrovni talab qiladi — xato yo‘llari ham qamrab olinishi shart.

## Tegishli nazoratlar

- `.github/security` ichidagi `js/stack-trace-exposure` CodeQL ogohlantirishlari har doim **yoki** ushbu yordamchilar orqali tuzatilishi, **yoki** ushbu hujjatga havola qiluvchi izoh bilan rad etilishi kerak.
- `pino` ma’lumotlarni yashirish konfiguratsiyasi (`src/shared/utils/logRedaction.ts`) ishonchli tuzilmaviy loglarni alohida qayta ishlaydi. Ushbu hujjat ommaviy javob xabarlari va doimiy chaqiruv/proksi-log chegaralaridan o‘tadigan, provayder tomonidan boshqariladigan qiymatlarni qamrab oladi.
- Yuqori oqim sarlavhalarining taqiqlangan ro‘yxati (`src/shared/constants/upstreamHeaders.ts`) sarlavhalar sizib chiqishini qamrab oladi — ma’lumotlarni chiqarib yuborishga oid yangi xavfni qo‘shishda ikkala faylni ham o‘zaro muvofiq saqlang.

## Yuqori oqim tafsilotlarini uzatish

`buildErrorBody` ixtiyoriy uchinchi `upstreamDetails` argumentini (yuqori oqim provayderidan olingan, tahlil qilingan xom javob tanasi) qabul qiladi. U taqdim etilganda, javobga `upstream_details` sifatida kiritilishidan oldin `sanitizeUpstreamDetails` yordamida sanitizatsiya qilinadi.

Ixtiyoriy to‘rtinchi `classification` argumenti
(`{ type?: string; code?: string; reason?: string }`) aniq ommaviy tasnifni qabul qiladi.
Har bir maydon chegaralangan ommaviy identifikatorlar lug‘atiga proyeksiya qilinadi. Xavfsiz bo‘lmagan, hisob ma’lumotlariga o‘xshash, boshqaruv belgilarini o‘z ichiga olgan yoki haddan tashqari uzun qiymatlar holat kodidan kelib chiqadigan tur/kodga qaytariladi; xavfsiz bo‘lmagan ixtiyoriy sabab esa tashlab ketiladi. Uch xonali HTTP holat identifikatorlari (`100` dan `599` gacha) yuqori oqimning raqamli holatini mashina o‘qiy oladigan kod sifatida taqdim etuvchi provayder shartnomalari uchun yaroqli bo‘lib qoladi. Xuddi shu chegaralangan diapazon mahalliy tarzda yaratilgan HTTP holati to‘ldiruvchisi shaklida ham qabul qilinadi; provayderning ixtiyoriy raqamlari va nomlari lug‘at doirasidan tashqarida qoladi.

Har bir aniq tasnifni shu to‘rtinchi argument orqali uzating. `buildErrorBody()` qaytganidan keyin hech qachon `body.error.code`, `body.error.type` yoki `body.error.reason` qiymatlarini qayta yozmang; yaratuvchidan keyingi o‘zgartirish ommaviy proyeksiyani chetlab o‘tadi.

`upstreamDetails` uchun qo‘llaniladigan sanitizatsiya qoidalari:

1. Satr barglari: `sanitizeErrorMessage` orqali o‘tkaziladi (steklar va mutlaq yo‘llarni olib tashlaydi).
2. Xavfsiz bo‘lmagan yo‘l, hisob ma’lumotlari, seans taxallusi va prototipni boshqarish kalitlari olib tashlanadi.
3. Chuqurlik chegarasi: 4 darajadan chuqur joylashuvlar `"[truncated]"` satri bilan almashtiriladi.
4. Massivlar 32 ta element bilan cheklanadi.

Faqat provayderning tahlil qilingan xato tanasiga ega chaqiruv joylari `upstreamDetails` uzatishi kerak. Ichki OmniRoute xatolari (SSE tahlilidagi nosozliklar, bo‘sh kontent, himoya mexanizmi bloklari) uni o‘z ichiga olmasligi kerak.

Xom `err.stack`, `err.message` yoki ish vaqtidagi istisnodan olingan har qanday satrni `upstreamDetails` ga uzatmang. Ular yuqori oqim tanasisiz hamon `errorResponse` / `buildErrorBody(code, msg)` orqali o‘tishi kerak.

Yuqori oqimdagi 4xx xatolarini tanlab uzatish mijozning avtomatik tiklanishi uchun zarur bo‘lgan provayderning xavfsiz JSON shakli va ifodasini saqlaydi, ammo bu baytma-bayt uzatish emas: rekursiv sanitizator serializatsiyadan oldin har doim ishga tushadi. Siklik, BigInt qiymatlarini o‘z ichiga olgan yoki zararli `toJSON()` tanalari xavfsiz tarzda rad etiladi va uzatish uchun yaroqsiz hisoblanadi. OCR va moderatsiya ham xuddi shu qoidani qo‘llaydi; JSON bo‘lmagan, bo‘sh yoki noto‘g‘ri belgilangan yuqori oqim tanalari kanonik OmniRoute JSON xato konvertiga aylantiriladi.

## CodeQL’ning ma’lum cheklovi: maxsus sanitarizatorlar tanib olinmaydi

CodeQL’ning [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) so‘rovi sanitarizator andozalarining qat’iy belgilangan ruxsat ro‘yxatidan foydalanadi (masalan, bevosita `.split("\n")[0]`, muayyan regex shakllari bilan `String#replace`, `Error` obyektidagi `.message` xususiyatiga murojaat qilish). U bizning `sanitizeErrorMessage()` kabi maxsus yordamchi orqali bilvosita ishlov berishni **tanib olmaydi**.

Bu ushbu modul orqali sanitarizatsiya qilishi aniq bo‘lgan chaqiruv joylari — masalan, `open-sse/utils/error.ts::errorResponse` va `open-sse/executors/cursor.ts::buildErrorResponse` — kod amalda xavfsiz bo‘lsa ham ogohlantirishni keltirib chiqarishda davom etishi mumkinligini anglatadi. Oldingi rad etishlar: `#224`, `#231` (2026-yil may), har ikkisi ham texnik asos bilan `false positive` deb belgilangan.

**Yangi holatni qanday ko‘rib chiqish kerak:**

1. Chaqiruv joyi xabarni haqiqatan ham `sanitizeErrorMessage` / `buildErrorBody` / yuqorida hujjatlashtirilgan o‘rama funksiyalardan biri orqali o‘tkazishini tasdiqlang (chaqiruv zanjirini boshidan oxirigacha o‘qing — izohga ko‘r-ko‘rona ishonmang).
2. `tests/unit/error-message-sanitization.test.ts` ushbu yo‘lni sinab ko‘rishini tasdiqlang (yoki test qamrovini qo‘shing).
3. Ushbu hujjatga havola qilgan holda ogohlantirishni `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` orqali rad eting.
4. Har bir joyga `.split("\n")[0]` ni bevosita joylashtirish orqali “tuzatishga” urinmang — yordamchi yagona haqiqat manbaidir; skanerni rozi qilgandek ko‘rinish uchun andozani takrorlash sanitarizatorni zaiflashtiradi (yo‘llarni tozalash, uzunlik cheklovi va turga o‘tkazish imkoniyatlari yo‘qoladi).

CodeQL’ning [`@codeql/javascript-models` maxsus sanitarizator konfiguratsiyasi](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) kabi ixtiyoriy funksiyalarni joriy etish uzoq muddatli yechimdir; u ushbu hujjat doirasidan tashqarida.

## Manbalar

- [CWE-209: Xato xabari orqali axborot oshkor bo‘lishi](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Xatolarni qayta ishlash bo‘yicha qisqa qo‘llanma](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Yordamchini markazlashtirgan kommit: `1a39c31f` — _fix(security): ommaga ochiq yuqori oqim hisob ma’lumotlarini niqoblash + xatolarni sanitarizatsiya qilishni markazlashtirish_
