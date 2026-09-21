# Delegated Context Editing (Anthropic) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Делегированное **редактирование контекста** — это функция управления контекстом, доступная только для Claude. В отличие от локальных
механизмов сжатия OmniRoute (Caveman, RTK, LLMLingua, составные конвейеры), которые изменяют тело запроса
_до_ того, как оно покидает прокси, редактирование контекста просит **провайдера** удалить устаревшие
блоки использования инструментов / результатов их работы из собственного активного контекстного окна. OmniRoute лишь добавляет параметр
тела (`context_management.edits[]`); фактическую очистку с использованием собственного токенизатора выполняет Claude.

По своей природе это делегированная возможность: другие провайдеры отклоняют этот параметр, поэтому OmniRoute строго ограничивает
его использование Claude и совместимыми с Claude Code ретрансляторами.

Источник истины: `open-sse/config/contextEditing.ts` (идентификаторы стратегий, внедрение в тело, извлечение
телеметрии), `open-sse/executors/base.ts` (условие внедрения + резервный сценарий при ошибке 400) и
`open-sse/services/compression/types.ts` (структура конфигурации + значение по умолчанию).

## Что делает `clear_tool_uses`

OmniRoute внедряет одну правку в исходящее тело Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — датированный идентификатор стратегии Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — как только количество входных токенов запроса превышает этот порог, Claude начинает
  удалять старые пары использования инструмента и результата (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, значение Anthropic по умолчанию).
- `keep.value: 3` — N последних пар использования инструмента и результата остаются без изменений
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Бета-функция объявляется через заголовок `anthropic-beta: context-management-2025-06-27`, который
OmniRoute уже отправляет в запросах к Claude.

Внедрение выполняется функцией `applyContextEditingToBody()` и является **идемпотентным**: если правка `clear_tool_uses`
уже присутствует в теле (добавлена предыдущим вызовом или передана клиентом), тело
остаётся без изменений. Если также присутствует правка `clear_thinking_20251015`, OmniRoute выполняет стабильную сортировку,
перемещая правку `clear_thinking` в начало, поскольку Anthropic требует, чтобы `clear_thinking` предшествовала
`clear_tool_uses` в массиве `edits[]`.

## Переключатель включения для каждой комбинации

Редактирование контекста **по умолчанию отключено** и включается явно. Переключатель представляет собой одно логическое значение в
конфигурации сжатия:

- Ключ настройки: `contextEditing.enabled` (camelCase — **не** `context_editing` / `context-editing`).
- Тип: `ContextEditingConfig { enabled: boolean }` в
  `open-sse/services/compression/types.ts`.
- Значение по умолчанию: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Схема Zod: `contextEditingConfigSchema` в `src/shared/validation/compressionConfigSchemas.ts`.
- Хранение: сохраняется вместе с остальными настройками сжатия (нормализуется в
  `src/lib/db/compression.ts`).

На панели управления переключатель находится в центре управления сжатием
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) и записывает
`{ contextEditing: { enabled: … } }` обратно через `saveSettings()`. Поскольку он входит в объект
настроек сжатия, он применяется совместно с профилем сжатия конкретной комбинации, а не существует как
полностью независимая настройка — конфигурация содержит только флаг включения/выключения; все пороговые значения (`trigger`,
`keep`) задаются константами, описанными выше.

## Ограничение только для Claude

Инъекция выполняется только для настоящего Claude или ретрансляторов, совместимых с Claude Code. Условие в
`open-sse/executors/base.ts` выглядит так:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — настоящий ключ Anthropic/OAuth.
- `isClaudeCodeCompatible(this.provider)` — ретрансляторы, идентификатор провайдера которых начинается с
  префикса `anthropic-compatible-cc-` (они заявляют о совместимости с Claude Code, поэтому с наибольшей
  вероятностью поддерживают эту бета-функцию). См. `open-sse/services/provider.ts`.

Намеренно **исключены**:

- `claude-web` — браузерный ретранслятор с форматом запроса `create_conversation_params`, в который
  никогда не попадает `context_management`.
- Обычные ретрансляторы `anthropic-compatible-*` (без префикса `-cc-`) — сторонние конечные точки с
  неопределённой поддержкой бета-функции.

Провайдеры, не относящиеся к Claude, никогда не получают параметр `context_management`, даже если переключатель включён.

## Резервный механизм при ошибке 400 / охват ретрансляторов

Claude-совместимый ретранслятор может заявлять о поддержке бета-функции, но всё равно отклонять параметр
`context_management` с HTTP-ошибкой 400. Чтобы корректно продолжить работу вместо завершения запроса с ошибкой, исполнитель удаляет
параметр и **один раз** повторяет запрос к тому же URL:

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

Поведение:

1. Срабатывает только при `400`, когда редактирование контекста включено и тело действительно содержит
   `context_management`.
2. Тело ответа с ошибкой 400 считывается через `clone()`, поэтому исходный ответ остаётся неизменным для ветви,
   в которой совпадение не найдено.
3. Текст ошибки должен соответствовать `/context[_-]management|context editing/i` — несвязанная ошибка 400 (например,
   `max_tokens must be >= 1`) **не** запускает резервный механизм; исходная ошибка передаётся дальше.
4. При совпадении устанавливается `contextEditingDisabled = true` (что предотвращает повторную инъекцию, если для
   повторного запроса или резервного URL позднее будет создан новый `transformedBody`), удаляется `context_management`,
   тело повторно подписывается для Claude / Claude-Code-совместимых ретрансляторов (`signRequestBody`), после чего
   запрос к тому же URL повторяется один раз.

Настоящий Claude передаёт бета-функцию в `ANTHROPIC_BETA_BASE` и не попадает в эту ветвь резервного механизма.

## Телеметрия `applied_edits`

После ответа Claude OmniRoute фиксирует, какой объём контекста провайдер фактически очистил. Эти данные
**не** передаются потоково — они извлекаются из тела непотокового ответа в режиме максимальных усилий и никогда
не влияют на ответ (ошибки телеметрии подавляются).

- Извлечение: `extractContextEditingTelemetry(responseBody)` в `open-sse/config/contextEditing.ts`.
  Функция проверяет `applied_edits` в трёх местах (для защиты от различий в структуре ответа):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Из каждой записи считываются поля `cleared_input_tokens` и `cleared_tool_uses`
  (в формате snake_case, нативном для Anthropic), с резервным использованием camelCase-вариантов `clearedInputTokens` / `clearedToolUses`.
- Возвращает `null`, если массив `applied_edits` не найден или фактически ничего не было очищено.

Структура квитанции имеет вид `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Запись выполняется в `open-sse/handlers/chatCore.ts` (только при `provider === "claude"`) через
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), которая записывает строку аналитики
сжатия со следующими метками:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = количество очищенных входных токенов
- `request_id` с суффиксом `::context-editing`

Таким образом, делегированная очистка отображается в аналитике сжатия вместе с локальными движками под меткой
движка `context-editing` и отличается от экономии, обеспечиваемой RTK/Caveman/LLMLingua.

## Взаимосвязь с локальными механизмами сжатия

| Аспект              | Локальные механизмы (Caveman / RTK / LLMLingua / stacked) | Делегированное редактирование контекста               |
| ------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| Где выполняется     | В OmniRoute, до выхода запроса за пределы прокси          | На стороне сервера провайдера (Claude)                |
| Что редактируется   | Текст промпта / контекста / результата инструмента        | Старые блоки вызовов инструментов / их результатов    |
| Область провайдеров | Все провайдеры                                            | Только `claude` + `anthropic-compatible-cc-*`         |
| Переключатель       | Настройки режима сжатия                                   | `contextEditing.enabled`                              |
| Поведение при сбое  | Продолжение работы без сжатия (исходный текст)            | При ошибке 400: удалить параметр и повторить один раз |
| Телеметрия экономии | `engine: <engine id>`                                     | `engine: "context-editing"`                           |

Эти подходы дополняют друг друга: локальные механизмы сжимают байты, отправляемые OmniRoute; редактирование контекста позволяет
Claude сокращать накапливаемый контекст между последовательными запросами. Их можно включать одновременно.

## См. также

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — реестр механизмов и локальные механизмы
  сжатия
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — сжатие команд и вывода инструментов
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — сжатие описаний MCP и
  сокращение количества инструментов
- Исходный код: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
