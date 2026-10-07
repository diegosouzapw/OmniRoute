# Delegated Context Editing (Anthropic) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Делеговане **редагування контексту** — це функція керування контекстом, доступна лише для Claude. На відміну від локальних
механізмів стиснення OmniRoute (Caveman, RTK, LLMLingua, складених конвеєрів), які переписують тіло запиту
_до_ того, як воно залишає проксі, редагування контексту просить **провайдера** видалити застарілі
блоки використання інструментів / результатів інструментів із власного активного контекстного вікна. OmniRoute лише додає параметр тіла
(`context_management.edits[]`); фактичне очищення Claude виконує відповідно до власного токенізатора.

За своєю природою це делегована можливість: інші провайдери відхиляють цей параметр, тому OmniRoute суворо обмежує
її використання Claude та ретрансляторами, сумісними з Claude Code.

Джерело істини: `open-sse/config/contextEditing.ts` (ідентифікатори стратегій, додавання до тіла, отримання
телеметрії), `open-sse/executors/base.ts` (умова додавання + резервна поведінка в разі 400) і
`open-sse/services/compression/types.ts` (структура конфігурації + значення за замовчуванням).

## Що робить `clear_tool_uses`

OmniRoute додає одну операцію редагування до вихідного тіла Anthropic Messages:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — датований ідентифікатор стратегії Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — щойно кількість вхідних токенів запиту перевищує цей поріг, Claude починає
  видаляти старі пари використання інструментів/результатів (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, значення Anthropic за замовчуванням).
- `keep.value: 3` — N останніх пар використання інструментів/результатів залишаються без змін
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Бета-функція оголошується через заголовок `anthropic-beta: context-management-2025-06-27`, який
OmniRoute уже надсилає в запитах Claude.

Додавання виконується функцією `applyContextEditingToBody()` та є **ідемпотентним**: якщо операція
`clear_tool_uses` уже міститься в тілі (додана попереднім викликом або надана клієнтом), тіло
залишається без змін. Якщо також наявна операція `clear_thinking_20251015`, OmniRoute стабільно сортує
операцію `clear_thinking` на початок, оскільки Anthropic вимагає, щоб `clear_thinking` передувала
`clear_tool_uses` у масиві `edits[]`.

## Перемикач увімкнення для кожної комбінації

Редагування контексту **вимкнене за замовчуванням** і потребує явного ввімкнення. Перемикач — це одне булеве значення, що міститься в
конфігурації стиснення:

- Ключ налаштування: `contextEditing.enabled` (camelCase — **не** `context_editing` / `context-editing`).
- Тип: `ContextEditingConfig { enabled: boolean }` у
  `open-sse/services/compression/types.ts`.
- Значення за замовчуванням: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Схема Zod: `contextEditingConfigSchema` у `src/shared/validation/compressionConfigSchemas.ts`.
- Зберігання: зберігається разом з іншими налаштуваннями стиснення (нормалізується в
  `src/lib/db/compression.ts`).

На панелі керування перемикач розташований у центрі керування стисненням
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) і записує
`{ contextEditing: { enabled: … } }` назад через `saveSettings()`. Оскільки він передається в
об’єкті налаштувань стиснення, то поєднується з профілем стиснення для кожної комбінації, а не є
повністю незалежним інтерфейсом — конфігурація містить лише прапорець увімкнення/вимкнення; усі порогові значення (`trigger`,
`keep`) є задокументованими вище константами.

## Обмеження лише для Claude

Ін’єкція відбувається лише для справжнього Claude або ретрансляторів, сумісних із Claude Code. Умова в
`open-sse/executors/base.ts` має такий вигляд:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — справжній ключ Anthropic/OAuth.
- `isClaudeCodeCompatible(this.provider)` — ретранслятори, ідентифікатор постачальника яких починається з
  префікса `anthropic-compatible-cc-` (вони заявляють про сумісність із Claude Code, тому саме ці ретранслятори
  найімовірніше підтримують бета-функцію). Див. `open-sse/services/provider.ts`.

Навмисно **виключено**:

- `claude-web` — браузерний ретранслятор із форматом запиту `create_conversation_params`, який ніколи не отримує
  `context_management`.
- Загальні ретранслятори `anthropic-compatible-*` (без префікса `-cc-`) — сторонні кінцеві точки з
  невизначеною підтримкою бета-функції.

Постачальники, відмінні від Claude, ніколи не отримують параметр `context_management`, навіть коли перемикач увімкнено.

## Резервний механізм для 400 / охоплення ретрансляторів

Сумісний із Claude ретранслятор може заявляти про підтримку бета-функції, але все одно відхиляти параметр `context_management`
із HTTP 400. Щоб коректно продовжити роботу замість завершення запиту з помилкою, виконавець видаляє
параметр і повторює запит до тієї самої URL-адреси **один раз**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Поведінка:

1. Спрацьовує лише для `400`, коли редагування контексту ввімкнено й тіло запиту фактично містить
   `context_management`.
2. Тіло відповіді 400 зчитується через `clone()`, тому початкова відповідь залишається незмінною для гілки,
   у якій збігу немає.
3. Текст помилки має відповідати `/context[_-]management|context editing/i` — не пов’язана із цим помилка 400 (наприклад,
   `max_tokens must be >= 1`) **не** активує резервний механізм; початкова помилка передається далі.
4. У разі збігу встановлюється `contextEditingDisabled = true` (що запобігає повторній ін’єкції, якщо для повторного
   запиту або резервної URL-адреси згодом буде створено нове `transformedBody`), видаляється `context_management`,
   тіло повторно підписується для Claude / сумісних із Claude Code ретрансляторів (`signRequestBody`), після чого запит до
   тієї самої URL-адреси повторюється один раз.

Справжній Claude передає бета-функцію в `ANTHROPIC_BETA_BASE` і не потрапляє до цього резервного шляху.

## Телеметрія `applied_edits`

Після відповіді Claude OmniRoute реєструє, який обсяг контексту постачальник фактично очистив. Ці дані
**не** передаються потоково — вони витягуються з тіла непотокової відповіді в режимі максимально можливих зусиль і ніколи
не впливають на відповідь (помилки телеметрії ігноруються).

- Витягування: `extractContextEditingTelemetry(responseBody)` у `open-sse/config/contextEditing.ts`.
  Функція перевіряє `applied_edits` у трьох розташуваннях (для надійності з огляду на форму відповіді):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Поля кожного редагування, що зчитуються з кожного запису: `cleared_input_tokens` і `cleared_tool_uses`
  (snake_case, нативний формат Anthropic), із резервними варіантами `clearedInputTokens` / `clearedToolUses` у camelCase.
- Повертає `null`, якщо масив `applied_edits` не знайдено або фактично нічого не було очищено.

Формат квитанції: `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Записування відбувається в `open-sse/handlers/chatCore.ts` (лише за умови `provider === "claude"`) через
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), яка записує рядок аналітики стиснення
з такими позначками:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = кількість очищених вхідних токенів
- `request_id` із суфіксом `::context-editing`

Отже, делеговане очищення відображається в аналітиці стиснення поряд із локальними рушіями під міткою рушія
`context-editing`, і його можна відрізнити від економії, забезпеченої RTK/Caveman/LLMLingua.

## Зв’язок із локальними рушіями стиснення

| Аспект              | Локальні рушії (Caveman / RTK / LLMLingua / stacked)  | Делеговане редагування контексту                                            |
| ------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| Де виконується      | В OmniRoute, перш ніж запит залишить проксі           | У провайдера (Claude), на стороні сервера                                   |
| Що редагує          | Текст промпту / контексту / результатів інструментів  | Старі блоки використання інструментів / результатів інструментів            |
| Сфера провайдерів   | Усі провайдери                                        | Лише `claude` + `anthropic-compatible-cc-*`                                 |
| Перемикач           | Налаштування режиму стиснення                         | `contextEditing.enabled`                                                    |
| Режим відмови       | Продовження роботи без стиснення (оригінальний текст) | Резервна обробка помилки 400: вилучити параметр і повторити спробу один раз |
| Телеметрія економії | `engine: <engine id>`                                 | `engine: "context-editing"`                                                 |

Ці два підходи доповнюють один одного: локальні рушії стискають байти, які надсилає OmniRoute; редагування контексту дає змогу
Claude скорочувати поточний контекст між послідовними зверненнями. Їх можна ввімкнути одночасно.

## Див. також

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — реєстр рушіїв і локальні рушії
  стиснення
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — стиснення виводу команд/інструментів
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — стиснення описів MCP і
  зменшення кількості інструментів
- Джерело: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
