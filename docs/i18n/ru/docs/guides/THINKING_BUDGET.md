# Thinking Budget (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Панель управления:** Настройки → **ИИ** → Бюджет рассуждений  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Исходный код:** `open-sse/services/thinkingBudget.ts`

Бюджет рассуждений определяет, будет ли OmniRoute **перезаписывать параметры размышления/рассуждения клиента** при передаче запросов провайдерам. Он **не** включает и не отключает сжатие, маршрутизацию или кеш промптов.

## Режимы

| Режим                            | Что делает OmniRoute                                                                                                         | Когда использовать                                                                                                                                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (по умолчанию) | Оставляет поля клиента без изменений (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` и т. д.). | **Codex / Desktop / любой клиент, который должен управлять глубиной и сводками рассуждений.** Необходим для отображения панелей рассуждений, когда клиент запрашивает `reasoning.summary`.                 |
| **`auto`**                       | **Удаляет все** поля размышления/рассуждения из тела запроса перед его отправкой вышестоящему сервису.                       | Только если вы намеренно хотите, чтобы **провайдер** сам выбрал значения по умолчанию, и вам не нужно управление рассуждениями со стороны клиента. **Не** означает «автоматически показывать рассуждения». |
| **`custom`**                     | Перезаписывает каждый запрос, задавая фиксированный бюджет токенов на рассуждения.                                           | Жёсткое ограничение токенов рассуждений для всего трафика.                                                                                                                                                 |
| **`adaptive`**                   | Масштабирует бюджет относительно базовой глубины с учётом количества сообщений, инструментов и длины промпта.                | Гибкое управление количеством токенов без полного игнорирования намерений клиента.                                                                                                                         |

### Что удаляет `auto`

Когда выбран режим `auto`, `stripThinkingConfig()` удаляет, помимо прочего:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, а также `output_config.effort`, если оно присутствует
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Если клиент (например, Codex Desktop) отправил `reasoning: { effort: "ultra", summary: "detailed" }`, режим **auto удалит этот объект**. Вышестоящий сервис всё равно может учитывать некоторые токены рассуждений при выставлении счёта, но часто возвращает **пустые или только зашифрованные** элементы рассуждений — поэтому пользовательский интерфейс не отображает полезный поток рассуждений.

## Чем это **не является**

| Функция                                                | Взаимосвязь                                                                                                                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Сжатие** (Caveman, RTK, stacked, …)                  | Отдельный конвейер обработки. Работает во всех режимах бюджета рассуждений.                                                                                       |
| **Кеш промптов / семантический кеш**                   | Отдельная функция. Режим бюджета рассуждений на неё не влияет.                                                                                                    |
| **Комбинированная маршрутизация / резервные варианты** | Отдельная функция. Не зависит от выбранного режима.                                                                                                               |
| **Ограничения токенов API-ключа / бюджеты затрат**     | Отдельная функция. Не зависит от выбранного режима.                                                                                                               |
| **Кеш повторного воспроизведения рассуждений**         | Повторная вставка в многоходовых диалогах для строгих провайдеров (DeepSeek, Kimi, Qwen-thinking, …). Это не то же самое, что «показывать рассуждения» в Desktop. |
| **Расшифровка `encrypted_content`**                    | **Невозможна.** Приватные блоки рассуждений OpenAI/Codex непрозрачны. OmniRoute никогда их не расшифровывает (#7095 / #7176 / #7304).                             |

## Видимое рассуждение (клиенты Codex / Responses)

Чтобы клиент отображал текст рассуждения, необходимо выполнение **всех** следующих условий:

1. Режим Thinking Budget = **`passthrough`** (либо custom/adaptive, если при этом запросы на сводку сохраняются в достаточной степени для используемого пути).
2. Клиент запрашивает сводку, например Codex `model_reasoning_summary = "detailed"` / `auto` (не `none`).
3. Вышестоящий сервис действительно передаёт потоковые события `response.reasoning_summary_text.*` (либо непустое значение `reasoning.summary` в элементе).

Если вы получаете только «зашифрованное приватное рассуждение», это означает одно из следующего:

- использовался режим **`auto`** (запрос клиента был удалён), либо
- вышестоящий сервис вернул `encrypted_content` без текста сводки (ограничение провайдера; OmniRoute может вывести только заполнитель, но не открытый текст).

## Примеры API

```bash
# Чтение
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Рекомендуется для видимости рассуждений в Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Схема (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; необязательные параметры: `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Сохранение / перезапуск

Значение хранится под ключом настроек `thinkingBudget` и загружается при запуске процесса (`hydrateThinkingBudgetConfig`). После изменения через БД или каким-либо способом в обход API **перезапустите процесс OmniRoute**, чтобы состояние синглтона в памяти соответствовало данным на диске.

## Контрольный список оператора

- [ ] Пользователи Codex / Desktop: режим = **passthrough**
- [ ] Если вы хотите экономить токены в **сообщениях**, а не за счёт удаления рассуждений, оставьте сжатие включённым
- [ ] Не ожидайте, что режим `auto` будет «показывать больше рассуждений»
- [ ] Сводки, доступные только в зашифрованном виде, — это поведение **провайдера**; режим passthrough не может их расшифровать

## Связанная документация

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — кэш `reasoning_content` для многоходовых диалогов
- [USER_GUIDE.md](./USER_GUIDE.md) — вкладки панели настроек
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — конечные точки настроек
