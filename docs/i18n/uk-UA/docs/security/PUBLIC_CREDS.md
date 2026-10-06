# Public Credentials Handling (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Джерело істини:** `open-sse/utils/publicCreds.ts`
> **Тести:** `tests/unit/publicCreds.test.ts`
> **Останнє оновлення:** 2026-08-07 — v3.8.50
> **Аудиторія:** Інженери, які інтегрують провайдерів, що постачають публічні OAuth client_id / client_secret / Firebase Web API keys у своїх публічних CLI.
> **Статус:** **ОБОВ’ЯЗКОВО** для всього нового коду, який вбудовує ідентифікатори сторонніх постачальників.

## Навіщо це потрібно

- [OAuth 2.0 для нативних застосунків (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret для встановлюваних застосунків є публічними; фактичний захист забезпечує PKCE.
- [Ключі API Firebase](https://firebase.google.com/docs/projects/api-keys) — ідентифікатори вебклієнтів є публічними за задумом.

OmniRoute має вбудовувати ці значення, щоб користувачі, які не налаштували `.env`, усе одно отримували готовий до роботи OAuth-процес без додаткової конфігурації. Без вбудованого резервного значення провайдери Gemini / Antigravity припиняють працювати для будь-якого користувача, який обирає шлях «просто клонувати та запустити».

Однак буквальні значення на кшталт `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` виявляються засобами **GitHub Secret Scanning**, **Semgrep** та подібними сканерами на основі шаблонів. Кожен випуск перетворюється на галасливий потік хибнопозитивних спрацювань, захист під час надсилання змін блокує легітимні коміти, а оператори перестають довіряти стрічці сповіщень.

Допоміжний модуль `open-sse/utils/publicCreds.ts` одночасно розв’язує обидві проблеми:

- Вбудовує публічний ідентифікатор як **послідовність байтів, замасковану за допомогою XOR** (без шаблону, який може виявити сканер у вихідному коді).
- Декодує під час виконання за допомогою `decodePublicCred` / `resolvePublicCred`.
- Виявляє необроблені значення, які вже відповідають загальновідомим префіксам (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), і передає їх без змін, тому наявні `.env` користувачів із необробленими значеннями продовжують працювати з **нульовою потребою в міграції**.

Це **обфускація, а не шифрування.** Кожен, хто читає вихідний код, може відновити значення — і це нормально, оскільки значення є публічним за задумом. Єдина мета — уникнути збігів із регулярними виразами сканерів.

## Обов’язковий шаблон

### 1. Додавання нових публічних облікових даних

Коли потрібно вбудувати нове значення, надане стороннім постачальником, яке:

- походить із публічного CLI / настільного застосунку / браузерного пакета, **і**
- сторонній постачальник документує (або розглядає) його як публічний ідентифікатор клієнта, **і**
- сканер на основі шаблонів інакше виявив би його (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` тощо),

…дотримуйтеся цього контрольного списку:

1. Згенеруйте замасковану послідовність байтів:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Додайте новий запис до `EMBEDDED_DEFAULTS` у `open-sse/utils/publicCreds.ts` із **нейтральною назвою ключа** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` тощо). **Не** використовуйте в допоміжному модулі такі назви, як `client_secret` або `api_key` — ці слова активують загальні правила Semgrep для виявлення секретів.

3. Додайте `keyof typeof EMBEDDED_DEFAULTS` до публічного об’єднання типів (воно виводиться автоматично).

4. У коді-споживачі замініть жорстко заданий літерал на:

   ```ts
   // одне перевизначення зі змінної середовища
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // кілька псевдонімів змінної середовища (використовується перше непорожнє значення)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // без перевизначення зі змінної середовища (завжди вбудоване значення за замовчуванням)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Видаліть літерал із `.env.example` (замініть його документацією лише у вигляді коментарів, яка спрямовує читачів сюди):

   ```dotenv
   # ── Провайдер (Google / Firebase / тощо) ──
   # Публічні облікові дані OAuth вбудовані в код через
   # open-sse/utils/publicCreds.ts. Задавайте ці змінні лише для використання власних значень.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Оновіть `tests/unit/publicCreds.test.ts`, додавши перевірку форми для нового ключа (перевіряйте формат, а не буквальне значення — дивіться шаблон у наявних тестах).

7. **Ніколи** не додавайте літерали `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` до тестових файлів. Використовуйте константи `FAKE_*`, побудовані з фрагментів за допомогою `.join("")` (дивіться наявні тести).

### 2. Споживачі

- **Зчитуйте лише через `resolvePublicCred()` / `resolvePublicCredMulti()`** — ніколи не викликайте `decodePublicCredBytes()` безпосередньо за межами допоміжного модуля.
- Допоміжний модуль навмисно є невитратним (лінійна побайтова операція XOR), і його можна безпечно викликати під час завантаження модуля; значення за замовчуванням обчислюються один раз.
- Перевизначення зі змінної середовища завжди має пріоритет. Якщо користувач задає `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, допоміжний модуль передає це необроблене значення без змін.

### 3. Заборонені шаблони

❌ **Ніколи** не робіть нічого з наведеного нижче у виробничому коді (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ПОГАНО: буквальне значення активує Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ПОГАНО: base64-кодування літерала — GitHub усе одно виявляє його з Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ПОГАНО: конкатенація рядків, яка повторно збирає шаблон під час виконання
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ПОГАНО: кодування hex/ROT13 — інша обфускація, той самий ризик виявлення
clientSecret: hexDecode("474f4353..."),
```

Усе це зрештою активує сканер. Використовуйте `resolvePublicCred()`.

❌ **Ніколи** не додавайте буквальні облікові дані до `.env.example`. Користувачі, яким потрібні справжні значення стороннього постачальника, можуть самостійно отримати їх із публічного CLI або використати власну реєстрацію OAuth.

❌ **Ніколи** не відхиляйте нове сповіщення сканування секретів, спочатку не перевіривши, чи потрібно перемістити ці облікові дані до цього допоміжного модуля.

## Пов’язані засоби контролю

- `RAW_VALUE_PATTERN` у `publicCreds.ts` перелічує префікси, які активують передавання без змін (для зворотної сумісності). Розширюйте його лише для задокументованих форматів публічних облікових даних і ніколи — для пропрієтарних секретів.
- `.env.example` контролюється CI-скриптом `check-env-doc-sync` — видаляючи звідси змінну, переконайтеся, що документацію також оновлено.
- Набори тестів `npm run test:vitest` і `node --import tsx/esm --test tests/unit/publicCreds.test.ts` мають завжди успішно проходити.

## Коли НЕ слід використовувати цей допоміжний засіб

Цей допоміжний засіб призначений **лише** для облікових даних, які:

1. Публічно розповсюджуються постачальником (бінарний файл CLI, браузерний бандл, офіційна документація).
2. Задокументовані або однозначно вважаються неконфіденційними (захищені PKCE, вебключ Firebase тощо).

Для всього іншого — виданих оператором токенів, секретів окремих клієнтів, `client_secret` вашого власного застосунку OAuth, ключів шифрування, секретів JWT, паролів баз даних — використовуйте **лише змінні середовища** (`process.env.FOO`, резервне значення через `||` у вигляді порожнього значення або явної помилки). Вони мають зберігатися в `.env` і [зашифрованому сховищі облікових даних](./COMPLIANCE.md), а не у вихідному коді.

## Посилання

- [Google: OAuth 2.0 для нативних застосунків](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: ключі API для ідентифікації клієнта](https://firebase.google.com/docs/projects/api-keys)
- [GitHub: секрети, що підтримуються скануванням секретів](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: виявлення токенів у форматі base64 (лютий 2025 року)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Коміт, у якому додано цей допоміжний засіб: `1a39c31f` — _fix(security): маскування публічних облікових даних зовнішніх постачальників і централізація очищення помилок_
