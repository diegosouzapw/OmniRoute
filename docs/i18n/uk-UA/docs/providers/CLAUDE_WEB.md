# Providers — Claude Web (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` надсилає запити чату у форматі OpenAI через автентифікований браузерний сеанс `claude.ai`.
Виконавець нормалізує наданий cookie, визначає одну автентифіковану
організацію, готує стан розмови, вибирає прямий або браузерний транспорт і
суворо перетворює вхідну відповідь SSE. Оркестрація міститься у
`open-sse/executors/claude-web.ts:320`.

> **Уперше працюєте з провайдерами Web Cookie?**
>
> Перш ніж виконувати вказівки цього посібника для конкретного провайдера, ознайомтеся з **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, де описано загальний процес налаштування, рекомендації щодо автентифікації, обмеження та усунення несправностей.

### Каталог моделей

Реєстр провайдера наразі надає рівно ці сім статичних ідентифікаторів моделей
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Ідентифікатор моделі        | Відображувана назва     |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Динамічне виявлення моделей для цього провайдера не реалізовано. Наведений вище список є
каталогом середовища виконання.

### Облікові дані та визначення організації

Надайте або повний заголовок Cookie для `claude.ai`, або лише значення сеансу. Окремі значення
нормалізуються до `sessionKey`; інші cookie зберігаються, якщо їх надано. Виконавець приймає
cookie через `cookie` або `apiKey` і
зчитує необов’язкові значення `deviceId` та `orgId` із даних підключення
(`open-sse/executors/claude-web.ts:72`).

Якщо `orgId` відсутній, виконавець викликає `GET https://claude.ai/api/organizations` і використовує першу
організацію, повернуту автентифікованим сеансом Claude Web
(`open-sse/executors/claude-web.ts:141`). Якщо не повернуто жодної дійсної організації, виконання
завершується відмовою; відхилену авторизацію сеансу позначено кодом 401, а виклик Cloudflare
відрізняється від помилки автентифікації.

### Операції з розмовами

Необов’язковий об’єкт верхнього рівня `claude_web` є строгим. Невідомі поля відхиляються. Його
дозволені поля визначено в `open-sse/executors/claude-web/session.ts:50`:

| Поле                  | Значення                                                                           |
| --------------------- | ---------------------------------------------------------------------------------- |
| `operation`           | Типово `completion`; використовуйте `retry` для повторної спроби відповіді         |
| `conversation_id`     | Явний UUID наявної розмови                                                         |
| `parent_message_uuid` | Явний UUID батьківського повідомлення асистента                                    |
| `timezone`            | Дійсна назва часового поясу IANA                                                   |
| `locale`              | Структурно дійсна локаль                                                           |
| `tool_states`         | Необов’язковий масив станів інструментів облікового запису, обмежений 128 записами |

Підготовлені запити використовують одну з двох висхідних кінцевих точок
(`open-sse/executors/claude-web.ts:203`):

- Новий або наступний хід надсилається до
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Повторна спроба надсилається до
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Новий хід містить `create_conversation_params`. Наступний хід, отриманий із кешу або явно пов’язаний,
містить `parent_message_uuid` і не містить `create_conversation_params`. Для повторної спроби потрібні
стани як розмови, так і батьківського повідомлення, а запит не надсилається
(`open-sse/executors/claude-web/session.ts:254`). Нові розмови відкривають автентифікований
інтерфейс за адресою `/new`; наступні ходи, отримані з кешу або явно пов’язані, відкривають точну сторінку розмови
(`open-sse/executors/claude-web/session.ts:324`).

Стан розмови — це кеш у пам’яті, ключем якого є область облікового запису SHA-256 і канонічна
стенограма виклику. Термін дії записів завершується через 30 хвилин, а місткість кешу обмежена 5 000 записами
(`open-sse/executors/claude-web/session.ts:12`). Стан фіксується лише після того, як строгий
аналізатор потоку виявить `message_stop`; перезапуск процесу видаляє його. Якщо даних у кеші немає,
запит із кількома повідомленнями серіалізується в один запит відновлення замість мовчазного
відкидання попередніх повідомлень.

Для локалі та часового поясу використовується такий порядок пріоритету: значення `claude_web` із запиту, значення підключення,
значення середовища виконання, а потім `en-US` для локалі або `UTC` для часового поясу
(`open-sse/executors/claude-web/session.ts:218`).

### Інструменти та корисні дані запитів

Прямі запити перетворюють лише структурно дійсні функціональні інструменти OpenAI, надані
викликачем. Сфабрикованого статичного списку інструментів за замовчуванням немає
(`open-sse/executors/claude-web/payload.ts:102`).

Натомість браузерні запити перехоплюють запит автентифікованого інтерфейсу та зберігають його інструменти облікового запису,
стани інструментів і персоналізовані стилі. Підготовлені поля розмови, моделі, міркування, запиту та
UUID повідомлення все одно перевизначають перехоплений запит
(`open-sse/executors/claude-web/browserTransport.ts:175`). Область дії браузерних шаблонів визначається
хешем облікового запису, організації, cookie, локалі та часового поясу, а термін їх дії завершується через 30 хвилин
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Якщо прямий запит не містить інструментів
викликача, він може повторно використати цей шаблон з обмеженою областю дії; явно надані інструменти викликача мають пріоритет
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Вибір транспорту

Типовим шляхом є `sendClaudeWebDirect()`, який викликає `tlsFetchClaude()` із налаштованим
профілем Chrome 146 і наданим cookie (`open-sse/services/claudeTlsClient.ts:23`). Він не
запускає засіб обходу захисту й не створює замінний cookie.

Установіть `WEB_COOKIE_USE_BROWSER` у значення `1`, `true` або `on`, щоб зробити браузерний адаптер з областю дії облікового запису основним транспортом. Установіть `OMNIROUTE_BROWSER_POOL` в одне з тих самих значень, щоб у разі розпізнаного виклику Cloudflare 403 дозволити перехід із прямого транспорту на браузерний адаптер (`open-sse/executors/claude-web.ts:195`). Інші помилки HTTP не запускають цей резервний перехід.

Браузерний адаптер зберігає файли cookie в тому самому спільному контексті Playwright, використовує описаний вище хешований ключ з обмеженою областю дії та надсилає завершення з цього контексту (`open-sse/executors/claude-web/browserTransport.ts:444`). Він ніколи не експортує отриманий через браузер файл cookie до прямого клієнта TLS. Для повторних спроб через браузер потрібен непрострочений шаблон інтерфейсу користувача, прив’язаний до того самого фактичного контексту Playwright (`open-sse/executors/claude-web/browserTransport.ts:467`). Відповіді браузера зчитуються поступово на автентифікованій сторінці з урахуванням скасування запиту, а отримання тіла відповіді від джерела скасовується, щойно його розмір перевищує 16 МіБ (`open-sse/executors/claude-web/browserTransport.ts:259`).

Виконавець повертає до спільного журналу запитів відредаговану проєкцію аудиту: UUID організації, розмови та повідомлення, текст запиту, визначення інструментів, файли cookie та ідентифікатори пристроїв виключено (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). У разі винятків транспорту також повертається загальна помилка з’єднання, а не повідомлення з викинутого винятку.

### Поведінка SSE

`createClaudeWebResponse()` обробляє обрамлення LF або CRLF та багаторядкові поля `data:`. Він зіставляє дельти тексту з `content`, дельти міркувань — із `reasoning_content`, а відомі події метаданих — із розширенням відповіді `claude_web`. Кожна подія метаданих проєктується через власний список дозволених полів (`open-sse/executors/claude-web/stream.ts:37`). Метадані розмови, батьківського повідомлення, повідомлення асистента та операції також повертаються в заголовках `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Парсер завершує роботу з помилкою в разі некоректного JSON, подій `error` від джерела, невідомих типів подій, неправильного порядку, невідповідностей блоків вмісту або EOF до `message_stop`. Потокове виведення надсилає один завершальний фрагмент і один `[DONE]`; буферизоване виведення використовує той самий парсер. Парсер негайно вважає `message_stop` кінцевою подією, скасовує подальше отримання даних від джерела та передає скасування від споживача засобу читання джерела (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Розмір незавершених рядків SSE та накопичених подій обмежено 1 МіБ (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Файли

| Файл                                                     | Призначення                                        |
| -------------------------------------------------------- | -------------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Статичний реєстр моделей постачальника             |
| `open-sse/executors/claude-web.ts`                       | Оркестрація виконавця                              |
| `open-sse/executors/claude-web/payload.ts`               | Перетворення корисного навантаження й засобів      |
| `open-sse/executors/claude-web/session.ts`               | Стан ходу та кеш стенограми                        |
| `open-sse/executors/claude-web/transport.ts`             | Адаптер прямого транспорту                         |
| `open-sse/executors/claude-web/browserTransport.ts`      | Браузерний адаптер з областю дії облікового запису |
| `open-sse/executors/claude-web/stream.ts`                | Суворе перетворення SSE                            |
| `open-sse/services/claudeTlsClient.ts`                   | Нативний транспорт TLS                             |
| `open-sse/services/browserPool.ts`                       | Спільні контексти Playwright                       |

### Тестування

Запустіть детермінований набір тестів Claude Web без справжніх облікових даних:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Залежні від Playwright сценарії в `tests/unit/claude-web-auto-refresh.test.ts` явно пропускаються. Наразі в цьому репозиторії не визначено сценарій інтерактивного тестування Claude Web з обліковими даними, тому ці пропущені сценарії не є підтвердженням роботи під час виконання.

### Налаштування

1. Запустіть OmniRoute за допомогою `npm run dev` або зі зібраної інсталяції.
2. Відкрийте Dashboard → Providers → Add Provider.
3. Виберіть категорію Web Cookie та Claude Web.
4. Вставте повний заголовок Cookie, скопійований з автентифікованого запиту до `claude.ai`.
