# Error Message Sanitization (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Джерело істини:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` і публічні конструктори в `open-sse/utils/error.ts`
> **Тести:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Останнє оновлення:** 2026-09-02 — v3.8.51
> **Аудиторія:** Усі інженери, які працюють із відповідями про помилки (HTTP-маршрути, SSE-потоки, виконавці, обробники MCP).
> **Статус:** **ОБОВ’ЯЗКОВО** для кожного шляху виконання коду, який повертає повідомлення про помилку клієнту.

## Навіщо це потрібно

Правило CodeQL `js/stack-trace-exposure` (CWE-209) позначає будь-який шлях виконання коду, за якого повідомлення про помилку, що походить із винятку середовища виконання, потрапляє до відповіді HTTP / SSE без санітизації. Трасування стеку й абсолютні шляхи до файлів у відповідях робочого середовища надають зловмисникам:

- Внутрішню структуру каталогів (`/srv/app/src/lib/...`) → розвідку для подальших атак.
- Версії бібліотек / фреймворків, визначені з кадрів стеку → можливість цілеспрямованого вибору експлойтів.
- Конфіденційні значення середовища виконання, які можуть бути інтерпольовані як рядки в помилки (запити до БД, значення конфігурації).

Допоміжна функція `sanitizeErrorMessage`, яку експортує `open-sse/utils/error.ts`, усуває такі класи
витоків:

1. Фізичні, серіалізовані й однозначно вбудовані хвости кадрів стеку JavaScript.
2. Абсолютні шляхи файлової системи POSIX, Windows, UNC і `file://`, водночас зберігаючи безпечні URL-адреси HTTPS
   та явно позначені API-маршрути.
3. Присвоєння облікових даних, поширені формати токенів постачальників, PEM-блоки закритих ключів і URL-адреси даних
   base64.

Санітайзер обмежує довжину вхідних даних і безпечно відхиляє значення, якщо викинуте значення не піддається перетворенню на рядок.
Рекурсивна санітизація вхідного JSON також видаляє небезпечні ключі облікових даних/шляхів, псевдоніми сеансів і
ключі керування прототипами до серіалізації відповіді.

## Обов’язковий шаблон

### 1. Побудова відповіді про помилку (HTTP / API-маршрути)

Використовуйте `buildErrorBody()` — санітизація вбудована:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... логіка обробника ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Або використовуйте допоміжні обгортки з того самого модуля:

```ts
import {
  errorResponse, // одноразовий об’єкт Response
  writeStreamError, // записувач SSE
  createErrorResult, // структура { success: false, status, response, ... }
  unavailableResponse, // додає Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Усі вони застосовують канонічну межу публічних помилок. `errorResponse`, `writeStreamError` і
`createErrorResult` проходять через `buildErrorBody`; три спеціалізовані допоміжні функції повторної спроби/аварійного вимикача
безпосередньо проєктують і санітизують свій публічний контекст. **Під час використання цих допоміжних функцій вам ніколи не потрібно
викликати `sanitizeErrorMessage` вручну**.

### 2. Власні конверти помилок (рідкісні випадки)

Коли ви не можете використати наведені вище допоміжні функції (наприклад, якщо формат відповіді визначається протоколом вищого рівня, як-от Connect-RPC), імпортуйте `sanitizeErrorMessage` безпосередньо:

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

Це єдиний дозволений спосіб сформувати власне тіло помилки. Еталонну реалізацію дивіться в `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Журналювання та надсилання відповіді

Довірені внутрішні винятки можуть зберігати повне повідомлення й стек, щоб оператори могли виконувати налагодження. Значення,
що походять із меж постачальника, валідації, браузерного сеансу або областей, пов’язаних з обліковими даними, необхідно
санітизувати до того, як вони потраплять у консольний вивід, метадані аудиту або постійні журнали викликів. Шаблон:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // лише довірений внутрішній виняток
  return errorResponse(500, getErrorMessage(err)); // санітизовано — надіслано клієнту
}
```

Для помилок, контрольованих постачальником, також проєктуйте значення, що журналюється:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Заборонені шаблони

❌ **Ніколи** не розміщуйте необроблений вивід винятку в тілі Response:

```ts
// ПОГАНО: трасування стеку та шляхи до файлів потрапляють до клієнта
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Ніколи** не створюйте власний розділювач першого рядка:

```ts
// ПОГАНО: не видаляє абсолютні шляхи й може відхилитися від канонічної допоміжної функції
const safe = String(err).split("\n")[0];
```

❌ **Ніколи** не санітизуйте лише маршрут, забуваючи про шлях SSE. Усе, що записується до потоку, має проходити через `writeStreamError` (або базову функцію `buildErrorBody`).

❌ **Ніколи** навмисно не включайте `process.cwd()`, `__filename`, `__dirname` або шляхи, отримані зі змінних середовища,
до повідомлень про помилки. Санітайзер обробляє абсолютні шляхи як поглиблений захист, але код, що викликає його, не повинен
узагалі створювати повідомлення, які розкривають топологію.

## Покриття в CI

`tests/unit/error-message-sanitization.test.ts` гарантує:

- Кожен маршрут у `/api/model-combo-mappings/*` повертає санітизовані тіла відповідей для 4xx/5xx.
- `sanitizeErrorMessage` видаляє багаторядкові трасування стека.
- `sanitizeErrorMessage` замінює абсолютні шляхи POSIX і Windows на `<path>`.
- `sanitizeErrorMessage` безпечно обробляє вхідні значення `null`/`undefined`/екземпляри `Error`.
- `buildErrorBody` ніколи не розкриває трасування стека у своєму полі `message`.

Під час додавання нового маршруту або виконавця копіюйте шаблон перевірок із цього файлу. Порогова перевірка покриття (`npm run test:coverage`) вимагає ≥60% покриття інструкцій/рядків/функцій/гілок — шляхи обробки помилок мають бути покриті.

## Пов’язані засоби контролю

- Сповіщення CodeQL `js/stack-trace-exposure` у `.github/security` завжди мають бути **або** виправлені за допомогою цих допоміжних функцій, **або** відхилені з коментарем, що посилається на цей документ.
- Конфігурація редагування `pino` (`src/shared/utils/logRedaction.ts`) окремо обробляє довірені структуровані журнали. Цей документ стосується повідомлень у загальнодоступних відповідях і контрольованих провайдером значень, які перетинають межі постійних журналів викликів/проксі.
- Список заборонених заголовків вищого рівня (`src/shared/constants/upstreamHeaders.ts`) запобігає витоку заголовків — під час додавання нового ризику ексфільтрації підтримуйте узгодженість обох файлів.

## Наскрізне передавання деталей від вищого рівня

`buildErrorBody` приймає необов’язковий третій аргумент `upstreamDetails` (необроблене
розібране тіло від провайдера вищого рівня). Якщо його передано, перед включенням у відповідь
як `upstream_details` він санітизується функцією `sanitizeUpstreamDetails`.

Необов’язковий четвертий аргумент `classification`
(`{ type?: string; code?: string; reason?: string }`) приймає явну загальнодоступну класифікацію.
Кожне поле проєктується на обмежений словник загальнодоступних ідентифікаторів. Небезпечні значення,
значення, що мають вигляд облікових даних, містять керувальні символи або є надто довгими,
замінюються типом/кодом, визначеним на основі статусу; небезпечне необов’язкове пояснення
пропускається. Тризначні ідентифікатори HTTP-статусу (від `100` до `599`) залишаються допустимими
для контрактів провайдерів, які надають числовий статус вищого рівня як машинозчитуваний код. Той
самий обмежений діапазон приймається в локально згенерованій формі заповнювача HTTP-статусу;
довільні номери та назви провайдерів залишаються поза словником.

Передавайте кожну явну класифікацію в цьому четвертому аргументі. Ніколи не перезаписуйте
`body.error.code`, `body.error.type` або `body.error.reason` після повернення з `buildErrorBody()`;
модифікація після побудови обходить загальнодоступну проєкцію.

Правила санітизації, що застосовуються до `upstreamDetails`:

1. Рядкові листові значення: обробляються через `sanitizeErrorMessage` (видаляє стеки й абсолютні шляхи).
2. Небезпечні ключі шляхів, облікових даних, псевдонімів сеансів і керування прототипами видаляються.
3. Обмеження глибини: вкладеність понад 4 рівні замінюється рядком `"[truncated]"`.
4. Масиви обмежуються 32 елементами.

Лише місця виклику з розібраним тілом помилки провайдера мають передавати `upstreamDetails`. Внутрішні
помилки OmniRoute (помилки розбору SSE, порожній вміст, блокування захисними обмеженнями) не повинні
його включати.

НЕ передавайте необроблені `err.stack`, `err.message` або будь-який рядок із винятку середовища
виконання до `upstreamDetails`. Вони, як і раніше, мають проходити через `errorResponse` /
`buildErrorBody(code, msg)` без тіла від вищого рівня.

Вибіркове наскрізне передавання відповідей 4xx від вищого рівня зберігає безпечну форму JSON і
формулювання провайдера, потрібні для автоматичного відновлення клієнта, але не є побайтовим
наскрізним передаванням: рекурсивний санітизатор завжди запускається перед серіалізацією. Циклічні
тіла, тіла з BigInt або шкідливим `toJSON()` безпечно відхиляються й не можуть передаватися наскрізно.
OCR і модерація застосовують те саме правило; тіла від вищого рівня, які не є JSON, є порожніми або
мають неправильне маркування, перетворюються на канонічну JSON-обгортку помилки OmniRoute.

## Відоме обмеження CodeQL: користувацькі санітайзери не розпізнаються

Запит CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) використовує фіксований список дозволених шаблонів санітайзерів (наприклад, вбудований `.split("\n")[0]`, `String#replace` із певними формами регулярних виразів, доступ до `.message` об’єкта `Error`). Він **не** розпізнає опосередкований виклик через користувацьку допоміжну функцію, як-от наша `sanitizeErrorMessage()`.

Це означає, що місця виклику, які гарантовано виконують санітизацію через цей модуль, — наприклад, `open-sse/utils/error.ts::errorResponse` та `open-sse/executors/cursor.ts::buildErrorResponse` — можуть і надалі спричиняти сповіщення, навіть якщо код функціонально безпечний. Попередні відхилення: `#224`, `#231` (травень 2026 року), обидва позначені як `false positive` із технічним обґрунтуванням.

**Як обробляти новий випадок:**

1. Переконайтеся, що місце виклику справді передає повідомлення через `sanitizeErrorMessage` / `buildErrorBody` / одну з описаних вище функцій-обгорток (прочитайте весь ланцюжок викликів від початку до кінця — не покладайтеся на коментар).
2. Переконайтеся, що `tests/unit/error-message-sanitization.test.ts` перевіряє цей шлях (або додайте покриття).
3. Відхиліть сповіщення за допомогою `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, пославшись на цей документ.
4. **Не** «виправляйте» це, вбудовуючи `.split("\n")[0]` скрізь, — допоміжна функція є єдиним джерелом істини; дублювання шаблону послаблює санітайзер (втрачається очищення шляхів, обмеження довжини та приведення типів) лише заради видимості задоволення вимог сканера.

Довгостроковим вирішенням є впровадження опціональних можливостей, як-от конфігурація користувацького санітайзера CodeQL [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/); це виходить за межі цього документа.

## Посилання

- [CWE-209: Розкриття інформації через повідомлення про помилку](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Пам’ятка з обробки помилок](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Коміт, що централізує допоміжну функцію: `1a39c31f` — _fix(security): маскування загальнодоступних облікових даних upstream-сервісу та централізація санітизації помилок_
