# Error Message Sanitization (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Источник истины:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` и публичные построители в `open-sse/utils/error.ts`
> **Тесты:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Последнее обновление:** 2026-09-02 — v3.8.51
> **Аудитория:** Все инженеры, работающие с ответами об ошибках (HTTP-маршруты, SSE-потоки, исполнители, обработчики MCP).
> **Статус:** **ОБЯЗАТЕЛЬНО** для каждого пути выполнения, возвращающего клиенту сообщение об ошибке.

## Зачем это нужно

Правило CodeQL `js/stack-trace-exposure` (CWE-209) отмечает любой путь выполнения, в котором сообщение об ошибке, полученное из исключения среды выполнения, попадает в ответ HTTP / SSE без очистки. Трассировки стека и абсолютные пути к файлам в ответах рабочей среды предоставляют злоумышленникам:

- Внутреннюю структуру каталогов (`/srv/app/src/lib/...`) → сведения для подготовки дальнейших атак.
- Версии библиотек / фреймворков, определяемые по кадрам стека → возможность подбора целевых эксплойтов.
- Конфиденциальные значения среды выполнения, которые могут быть интерполированы в строки ошибок (запросы к БД, значения конфигурации).

Вспомогательная функция `sanitizeErrorMessage`, экспортируемая из `open-sse/utils/error.ts`, удаляет следующие классы утечек:

1. Физические, сериализованные и однозначно распознаваемые встроенные хвосты кадров стека JavaScript.
2. Абсолютные пути файловой системы POSIX, Windows, UNC и `file://`, сохраняя безопасные HTTPS-URL-адреса и явно обозначенные API-маршруты.
3. Присваивания учётных данных, распространённые форматы токенов провайдеров, PEM-блоки закрытых ключей и URL-адреса данных в формате base64.

Санитайзер ограничивает длину входных данных и безопасно отклоняет их, если приведённое значение не удаётся преобразовать в строку.
Рекурсивная очистка входящих JSON-данных также удаляет небезопасные ключи учётных данных и путей, псевдонимы сеансов и ключи управления прототипом до сериализации ответа.

## Обязательный шаблон

### 1. Формирование ответа об ошибке (HTTP / API-маршруты)

Используйте `buildErrorBody()` — очистка встроена:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... логика обработчика ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Либо используйте вспомогательные обёртки из того же модуля:

```ts
import {
  errorResponse, // объект Response для однократного ответа
  writeStreamError, // средство записи SSE
  createErrorResult, // структура { success: false, status, response, ... }
  unavailableResponse, // добавляет Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Все они применяют каноническую публичную границу ошибок. `errorResponse`, `writeStreamError` и `createErrorResult` используют `buildErrorBody`; три специализированные вспомогательные функции для повторных попыток / размыкания цепи напрямую проецируют и очищают свой публичный контекст. При использовании этих вспомогательных функций **вам никогда не нужно вызывать
`sanitizeErrorMessage` вручную**.

### 2. Пользовательские оболочки ошибок (редко)

Если вы не можете использовать приведённые выше вспомогательные функции (например, формат ответа задан внешним протоколом, таким как Connect-RPC), импортируйте `sanitizeErrorMessage` напрямую:

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

Это единственный разрешённый способ сформировать пользовательское тело ошибки. Эталонную реализацию см. в `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Журналирование и отправка ответов

Доверенные внутренние исключения могут сохранять полное сообщение и трассировку стека, чтобы операторы могли выполнять отладку. Значения, поступающие от провайдеров, при валидации, из браузерных сеансов или из областей, связанных с учётными данными, необходимо очищать до их попадания в консольный вывод, метаданные аудита или постоянные журналы вызовов. Шаблон:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // только доверенное внутреннее исключение
  return errorResponse(500, getErrorMessage(err)); // очищено — отправляется клиенту
}
```

Для ошибок, контролируемых провайдером, также преобразуйте журналируемое значение:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Запрещённые шаблоны

❌ **Никогда** не помещайте необработанный вывод исключения в тело Response:

```ts
// ПЛОХО: трассировка стека и пути к файлам попадают к клиенту
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Никогда** не создавайте собственный механизм выделения первой строки:

```ts
// ПЛОХО: не удаляет абсолютные пути и может отклониться от поведения канонической вспомогательной функции
const safe = String(err).split("\n")[0];
```

❌ **Никогда** не ограничивайтесь очисткой в маршруте, забывая о пути SSE. Всё, что выполняет запись в поток, должно проходить через `writeStreamError` (или используемую им функцию `buildErrorBody`).

❌ **Никогда** намеренно не включайте `process.cwd()`, `__filename`, `__dirname` или пути, полученные из переменных среды, в сообщения об ошибках. Санитайзер обрабатывает абсолютные пути в качестве эшелонированной защиты, однако вызывающий код изначально не должен формировать сообщения, раскрывающие топологию.

## Покрытие в CI

`tests/unit/error-message-sanitization.test.ts` проверяет следующее:

- Каждый маршрут в `/api/model-combo-mappings/*` возвращает санитизированные тела ответов при ошибках 4xx/5xx.
- `sanitizeErrorMessage` удаляет многострочные трассировки стека.
- `sanitizeErrorMessage` заменяет абсолютные пути POSIX и Windows на `<path>`.
- `sanitizeErrorMessage` безопасно обрабатывает входные значения `null`/`undefined`/экземпляры `Error`.
- `buildErrorBody` никогда не раскрывает трассировки стека в своём поле `message`.

При добавлении нового маршрута или исполнителя скопируйте шаблон проверок из этого файла. Порог покрытия (`npm run test:coverage`) требует ≥60% покрытия инструкций/строк/функций/ветвей — пути обработки ошибок также должны быть покрыты.

## Связанные меры контроля

- Оповещения CodeQL `js/stack-trace-exposure` в `.github/security` всегда должны быть **либо** исправлены с помощью этих вспомогательных функций, **либо** отклонены с комментарием, содержащим ссылку на этот документ.
- Конфигурация редактирования `pino` (`src/shared/utils/logRedaction.ts`) отдельно обрабатывает доверенные структурированные журналы. Этот документ относится к публичным сообщениям ответов и значениям, контролируемым провайдером, которые пересекают границы постоянного журналирования вызовов/прокси.
- Список запрещённых заголовков вышестоящего сервиса (`src/shared/constants/upstreamHeaders.ts`) предотвращает утечку заголовков — при добавлении новой угрозы эксфильтрации поддерживайте оба файла согласованными.

## Сквозная передача сведений от вышестоящего сервиса

`buildErrorBody` принимает необязательный третий аргумент `upstreamDetails` (необработанное
разобранное тело от вышестоящего провайдера). Если он передан, перед включением в ответ в качестве
`upstream_details` он санитизируется функцией `sanitizeUpstreamDetails`.

Необязательный четвёртый аргумент `classification`
(`{ type?: string; code?: string; reason?: string }`) принимает явную публичную классификацию.
Каждое поле проецируется на ограниченный словарь публичных идентификаторов. Небезопасные значения,
значения, похожие на учётные данные, содержащие управляющие символы или слишком длинные, заменяются
типом/кодом, полученным из статуса; небезопасное необязательное основание опускается. Трёхзначные
идентификаторы статуса HTTP (от `100` до `599`) остаются допустимыми для контрактов провайдеров,
которые предоставляют числовой статус вышестоящего сервиса в качестве машиночитаемого кода. Тот же
ограниченный диапазон принимается в локально генерируемой форме заполнителя статуса HTTP;
произвольные числа и имена провайдера остаются за пределами словаря.

Передавайте каждую явную классификацию в этом четвёртом аргументе. Никогда не перезаписывайте
`body.error.code`, `body.error.type` или `body.error.reason` после возврата из `buildErrorBody()`;
изменение после построения обходит публичную проекцию.

Правила санитизации, применяемые к `upstreamDetails`:

1. Строковые конечные значения: обрабатываются с помощью `sanitizeErrorMessage` (удаляются трассировки стека и абсолютные пути).
2. Небезопасные ключи путей, учётных данных, псевдонимов сеансов и управления прототипами удаляются.
3. Ограничение глубины: вложенность свыше 4 уровней заменяется строкой `"[truncated]"`.
4. Массивы ограничиваются 32 элементами.

Только места вызова с разобранным телом ошибки провайдера должны передавать `upstreamDetails`. Внутренние
ошибки OmniRoute (сбои разбора SSE, пустое содержимое, блокировки защитными ограничениями) не должны его включать.

НЕ передавайте необработанные `err.stack`, `err.message` или любые строки из исключения среды выполнения в
`upstreamDetails`. Они по-прежнему должны обрабатываться через `errorResponse` / `buildErrorBody(code, msg)`
без тела от вышестоящего сервиса.

Выборочная сквозная передача ошибок 4xx от вышестоящего сервиса сохраняет безопасную структуру JSON и формулировки
провайдера, необходимые для автоматического восстановления клиента, но не является побайтовой передачей: перед
сериализацией всегда выполняется рекурсивная санитизация. Циклические тела, тела с BigInt или тела с вредоносным
`toJSON()` обрабатываются по принципу безопасного отказа и не допускаются к сквозной передаче. Для OCR и модерации
действует то же правило; не-JSON, пустые или неверно маркированные тела вышестоящего сервиса преобразуются в
каноническую JSON-оболочку ошибки OmniRoute.

## Известное ограничение CodeQL: пользовательские санитайзеры не распознаются

Запрос CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) использует фиксированный список разрешённых шаблонов санитайзеров (например, встроенный вызов `.split("\n")[0]`, `String#replace` с определёнными формами регулярных выражений, доступ к `.message` у `Error`). Он **не** распознаёт косвенный вызов через пользовательскую вспомогательную функцию, такую как наша `sanitizeErrorMessage()`.

Это означает, что места вызова, в которых явно выполняется очистка через этот модуль, — например, `open-sse/utils/error.ts::errorResponse` и `open-sse/executors/cursor.ts::buildErrorResponse` — могут по-прежнему вызывать предупреждение, даже если код функционально безопасен. Предыдущие отклонения: `#224`, `#231` (май 2026 г.); оба помечены как `false positive` с техническим обоснованием.

**Как обрабатывать новое срабатывание:**

1. Убедитесь, что сообщение в этом месте вызова действительно проходит через `sanitizeErrorMessage` / `buildErrorBody` / одну из описанных выше обёрток (проследите всю цепочку вызовов от начала до конца — не доверяйте комментарию).
2. Убедитесь, что `tests/unit/error-message-sanitization.test.ts` проверяет этот путь (или добавьте соответствующее покрытие).
3. Отклоните предупреждение с помощью `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, сославшись на этот документ.
4. **Не** «исправляйте» проблему, встраивая `.split("\n")[0]` повсюду, — вспомогательная функция является единым источником истины; дублирование этого шаблона ослабляет санитайзер (устраняет очистку путей, ограничение длины и приведение типов) лишь ради видимости удовлетворения требований сканера.

Долгосрочное решение — внедрение опциональных возможностей, таких как конфигурация пользовательских санитайзеров CodeQL [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/); это выходит за рамки данного документа.

## Ссылки

- [CWE-209: раскрытие информации через сообщение об ошибке](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: памятка по обработке ошибок](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Коммит, централизующий вспомогательную функцию: `1a39c31f` — _fix(security): маскирование общедоступных учётных данных вышестоящих сервисов и централизация очистки ошибок_
