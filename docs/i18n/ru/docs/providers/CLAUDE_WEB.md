# Providers — Claude Web (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` отправляет запросы чата в формате OpenAI через аутентифицированный браузерный сеанс `claude.ai`. Исполнитель нормализует предоставленный cookie, определяет одну аутентифицированную организацию, подготавливает состояние диалога, выбирает прямой или браузерный транспорт и строго преобразует вышестоящий SSE-ответ. Логика оркестрации находится в `open-sse/executors/claude-web.ts:320`.

> **Впервые используете провайдеры с Web Cookie?**
>
> Прежде чем следовать этому руководству для конкретного провайдера, ознакомьтесь с **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, где описаны общий процесс настройки, рекомендации по аутентификации, ограничения и устранение неполадок.

### Каталог моделей

В настоящее время реестр провайдера предоставляет ровно семь статических идентификаторов моделей (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Идентификатор модели        | Отображаемое имя        |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (веб)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (веб)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (веб)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (веб)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (веб)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (веб)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (веб) |

Динамическое обнаружение моделей для этого провайдера не реализовано. Приведённый выше список является каталогом среды выполнения.

### Учётные данные и определение организации

Укажите либо полный заголовок Cookie для `claude.ai`, либо только значение сеанса. Отдельные значения нормализуются в `sessionKey`; остальные cookie сохраняются, если они были предоставлены. Исполнитель принимает cookie через `cookie` или `apiKey` и считывает необязательные значения `deviceId` и `orgId` из данных подключения (`open-sse/executors/claude-web.ts:72`).

Если `orgId` отсутствует, исполнитель вызывает `GET https://claude.ai/api/organizations` и использует первую организацию, возвращённую аутентифицированным сеансом Claude Web (`open-sse/executors/claude-web.ts:141`). Если действительная организация не возвращена, выполнение завершается с ошибкой; отклонённая авторизация сеанса обозначается кодом 401, а проверка Cloudflare отличима от ошибки аутентификации.

### Операции с диалогами

Необязательный объект верхнего уровня `claude_web` имеет строгую схему. Неизвестные поля отклоняются. Допустимые поля определены в `open-sse/executors/claude-web/session.ts:50`:

| Поле                  | Значение                                                                            |
| --------------------- | ----------------------------------------------------------------------------------- |
| `operation`           | По умолчанию `completion`; для повторной попытки используйте `retry`                |
| `conversation_id`     | Явный UUID существующего диалога                                                    |
| `parent_message_uuid` | Явный UUID родительского сообщения ассистента                                       |
| `timezone`            | Допустимое имя часового пояса IANA                                                  |
| `locale`              | Структурно корректная локаль                                                        |
| `tool_states`         | Необязательный массив состояний инструментов учётной записи, не более 128 элементов |

Подготовленные запросы используют одну из двух вышестоящих конечных точек (`open-sse/executors/claude-web.ts:203`):

- Новый или последующий ход отправляется в
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Повторная попытка отправляется в
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Новый ход включает `create_conversation_params`. Последующий ход, взятый из кеша или явно связанный с диалогом, включает `parent_message_uuid` и не включает `create_conversation_params`. Для повторной попытки требуется состояние как диалога, так и родительского сообщения; запрос отправляется без промпта (`open-sse/executors/claude-web/session.ts:254`). Новые диалоги открывают аутентифицированный пользовательский интерфейс по адресу `/new`; последующие ходы, взятые из кеша или явно связанные с диалогом, открывают страницу соответствующего диалога (`open-sse/executors/claude-web/session.ts:324`).

Состояние диалога хранится в кеше в памяти, ключом которого служат область учётной записи на основе SHA-256 и каноническая расшифровка диалога вызывающей стороны. Срок действия записей истекает через 30 минут, а размер кеша ограничен 5 000 записей (`open-sse/executors/claude-web/session.ts:12`). Состояние фиксируется только после того, как строгий анализатор потока обнаружит `message_stop`; при перезапуске процесса оно утрачивается. При промахе кеша запрос с несколькими сообщениями сериализуется в один промпт восстановления, а не отбрасывает предыдущие сообщения без уведомления.

Для локали и часового пояса используется следующий порядок приоритета: значение `claude_web` из запроса, значение подключения, значение среды выполнения, затем `en-US` для локали или `UTC` для часового пояса (`open-sse/executors/claude-web/session.ts:218`).

### Инструменты и полезная нагрузка запросов

Прямые запросы преобразуют только структурно корректные функциональные инструменты OpenAI, предоставленные вызывающей стороной. Сформированного статического списка инструментов по умолчанию нет (`open-sse/executors/claude-web/payload.ts:102`).

Вместо этого браузерные запросы перехватывают запрос аутентифицированного пользовательского интерфейса и сохраняют инструменты учётной записи, их состояния и персонализированные стили. Подготовленные поля диалога, модели, рассуждений, промпта и UUID сообщений по-прежнему переопределяют значения из перехваченного запроса (`open-sse/executors/claude-web/browserTransport.ts:175`). Область действия браузерных шаблонов определяется хешем учётной записи, организации, cookie, локали и часового пояса, а срок их действия истекает через 30 минут (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Если в прямом запросе нет инструментов вызывающей стороны, он может повторно использовать соответствующий шаблон; явно указанные инструменты вызывающей стороны имеют приоритет (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Выбор транспорта

По умолчанию используется `sendClaudeWebDirect()`, который вызывает `tlsFetchClaude()` с настроенным профилем Chrome 146 и предоставленным cookie (`open-sse/services/claudeTlsClient.ts:23`). Он не запускает средство обхода проверок и не создаёт подменный cookie.

Установите `WEB_COOKIE_USE_BROWSER` в значение `1`, `true` или `on`, чтобы сделать браузерный адаптер, привязанный к учётной записи, основным транспортом. Установите `OMNIROUTE_BROWSER_POOL` в одно из тех же значений, чтобы при распознанном проверочном ответе Cloudflare 403 разрешить переключение с прямого транспорта на браузерный адаптер (`open-sse/executors/claude-web.ts:195`). Другие ошибки HTTP не запускают такое переключение.

Браузерный адаптер хранит файлы cookie в том же общем контексте Playwright, использует описанный выше хешированный ключ области и отправляет завершение из этого контекста (`open-sse/executors/claude-web/browserTransport.ts:444`). Он никогда не экспортирует обработанный браузером файл cookie в прямой клиент TLS. Для повторных попыток в браузере требуется непросроченный шаблон пользовательского интерфейса, привязанный к тому же фактическому контексту Playwright (`open-sse/executors/claude-web/browserTransport.ts:467`). Ответы браузера считываются поэтапно на аутентифицированной странице с учётом отмены запроса, а тело вышестоящего ответа отменяется, как только его размер превышает 16 МиБ (`open-sse/executors/claude-web/browserTransport.ts:259`).

Исполнитель возвращает в общий журнал запросов отредактированную аудиторскую проекцию: организация, UUID беседы и сообщений, текст запроса, определения инструментов, файлы cookie и идентификаторы устройств исключаются (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Исключения транспорта также возвращают общую ошибку подключения вместо сообщения выброшенного исключения.

### Поведение SSE

`createClaudeWebResponse()` обрабатывает кадрирование с LF или CRLF и многострочные поля `data:`. Он сопоставляет дельты текста с `content`, дельты рассуждений — с `reasoning_content`, а известные события метаданных — с расширением ответа `claude_web`. Каждое событие метаданных проецируется через собственный список разрешённых полей (`open-sse/executors/claude-web/stream.ts:37`). Метаданные беседы, родительского сообщения, сообщения ассистента и операции также возвращаются в заголовках `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Парсер прекращает обработку с ошибкой при некорректном JSON, событиях `error` от вышестоящего источника, неизвестных типах событий, неверном порядке, несоответствиях блоков содержимого или достижении конца файла до `message_stop`. Потоковый вывод создаёт один завершающий фрагмент и один `[DONE]`; буферизованный вывод использует тот же парсер. Парсер немедленно считает `message_stop` терминальным событием, отменяет последующие данные от вышестоящего источника и передаёт отмену от нижестоящего потребителя вышестоящему считывателю (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Размер незавершённых строк SSE и накопленных событий ограничен 1 МиБ (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Файлы

| Файл                                                     | Назначение                                      |
| -------------------------------------------------------- | ----------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Статический реестр моделей провайдера           |
| `open-sse/executors/claude-web.ts`                       | Оркестрация исполнителя                         |
| `open-sse/executors/claude-web/payload.ts`               | Преобразование полезной нагрузки и инструментов |
| `open-sse/executors/claude-web/session.ts`               | Состояние хода и кеш стенограммы                |
| `open-sse/executors/claude-web/transport.ts`             | Адаптер прямого транспорта                      |
| `open-sse/executors/claude-web/browserTransport.ts`      | Браузерный адаптер учётной записи               |
| `open-sse/executors/claude-web/stream.ts`                | Строгое преобразование SSE                      |
| `open-sse/services/claudeTlsClient.ts`                   | Нативный транспорт TLS                          |
| `open-sse/services/browserPool.ts`                       | Общие контексты Playwright                      |

### Тестирование

Запустите детерминированный набор тестов Claude Web без реальных учётных данных:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Зависящие от Playwright сценарии в `tests/unit/claude-web-auto-refresh.test.ts` явно пропускаются. В настоящее время в этом репозитории не определён сценарий интерактивного тестирования Claude Web с учётными данными, поэтому эти пропущенные сценарии не служат подтверждением работоспособности во время выполнения.

### Настройка

1. Запустите OmniRoute с помощью `npm run dev` или из собранной установки.
2. Откройте Панель управления → Провайдеры → Добавить провайдера.
3. Выберите категорию Web Cookie и Claude Web.
4. Вставьте полный заголовок Cookie, скопированный из аутентифицированного запроса к `claude.ai`.
