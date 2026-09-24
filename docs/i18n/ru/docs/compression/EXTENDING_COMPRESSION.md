# Extending the Compression Pipeline (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Кратко**: механизм сжатия OmniRoute является **подключаемым** — вы можете регистрировать собственные движки, создавать языковые пакеты для новых языков и компоновать многоступенчатые конвейеры. В этом руководстве показано, как это сделать.

**Связанные руководства:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — полный обзор конвейера
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — реестр движков и встроенные движки
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — движок RTK и пользовательские фильтры
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — справочник по формату пакетов правил

---

## Обзор

Система сжатия имеет **3 точки расширения**:

| Точка расширения              | Сценарий использования                                                              | Сложность |
| ----------------------------- | ----------------------------------------------------------------------------------- | --------- |
| **Пользовательский движок**   | Добавление совершенно нового алгоритма сжатия (например, отраслевого суммаризатора) | Высокая   |
| **Языковой пакет**            | Добавление поддержки нового естественного языка (например, хинди или арабского)     | Средняя   |
| **Многоступенчатый конвейер** | Компоновка существующих движков в пользовательском порядке                          | Начальная |

```
┌─────────────────────────────────────────────────────────────┐
│                    Стратегия сжатия                          │
│                                                             │
│   Входные сообщения ──▶ getEffectiveMode() ──▶ режим        │
│                                              │              │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]    │
│                   движок    движок   движок    в цепочке    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Сжатый результат              │
└─────────────────────────────────────────────────────────────┘

Выбор стратегии ОСНОВАН НА РЕЖИМЕ: каждый запрос выбирает ОДИН режим
(rtk / lite / standard / aggressive / ultra / stacked / off).
Только режим "stacked" последовательно объединяет несколько движков в цепочку.
Режим автоматического запуска по умолчанию — "lite" (а не трёхуровневая цепочка приоритетов).
```

---

## Создание пользовательского движка сжатия

Интерфейс движка (`open-sse/services/compression/engines/types.ts`) — это контракт, которому должен соответствовать каждый движок. Он содержит 5 обязательных методов.

### Интерфейс `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Уникальный идентификатор движка
  name: string; // Отображаемое имя
  description: string; // Краткое описание
  icon: string; // Значок (эмодзи или URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Можно ли использовать в многоступенчатом конвейере
  stackPriority: number; // Порядок в многоступенчатых конвейерах (меньше = раньше)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Минимальный пример: движок удаления лишних пробелов

Простейший возможный движок — удаляет лишние пробелы из сообщений.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Разделяем по маркерам блоков кода и сохраняем пробелы внутри них
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Не изменяем блоки кода
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Применяем только к обычному тексту
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Запускается ПОСЛЕ caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // Обходим массив сообщений — обрабатываем как строковое, так и составное содержимое
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // Составное содержимое: обходим части, сжимаем только текстовые части
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // сохраняем image_url, tool_use и т. д.
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// Регистрируем глобально
registerCompressionEngine(whitespaceEngine);
````

### Где размещать пользовательские движки

```
~/.omniroute/compression/engines/my-engine.ts    # Уровень пользователя
<project>/compression-engines/my-engine.ts        # Уровень проекта (загружается при запуске)
```

Или загрузите программно из плагина:

```ts
// В вашем плагине
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK плагина предоставляет хуки onRequest / onResponse / onError. Зарегистрируйте
  // движок при загрузке модуля плагина (или при первом onRequest); отмените его регистрацию
  // в собственном коде завершения работы.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// При завершении работы:
// unregisterCompressionEngine("my-engine");
```

### Тестирование движка

Зарегистрируйте движок в плагине или функции запуска. После регистрации движок будет доступен
в селекторе стратегии по его `id`. Протестируйте интеграцию, включив его в составной конвейер:

---

## Создание языковых пакетов

Компрессия в стиле Caveman использует **наборы правил для конкретных языков**, чтобы обрабатывать слова-паразиты, уклончивые формулировки и многословные конструкции в каждом естественном языке. OmniRoute поставляется с **6 языковыми пакетами**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Структура пакета

Языковой пакет представляет собой каталог **JSON-файлов** в `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Приветствия, уклончивые и вежливые формулировки
│   ├── context.json         # Правила сокращения контекста
│   ├── dedup.json           # Правила дедупликации
│   ├── structural.json      # Пунктуация, форматирование
│   └── ultra.json           # Правила агрессивного сжатия
├── es/  (та же структура)
├── fr/  (та же структура)
├── de/  (та же структура)
├── ja/  (та же структура)
└── pt-BR/ (та же структура)
```

### Структура правила

Каждое правило имеет следующую структуру (из `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Понятное человеку имя (kebab-case)
  pattern: string; // Шаблон регулярного выражения JavaScript
  replacement?: string; // Строка, которой заменяется совпадение
  replacementMap?: Record<string, string>; // ИЛИ карта «ключ→замена»
  flags?: string; // Флаги регулярного выражения (обычно "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Пропускать при меньшей интенсивности
  description?: string; // Документация
}
```

### Пример: добавление правил для слов-паразитов на хинди

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Удалять вежливые обращения, например 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Удалять слова-паразиты со значением 'на самом деле'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Удалять 'пожалуйста' на хинди"
    }
  ]
}
```

### Валидация

При загрузке наборы правил проверяются по `_schema.json`. Пакет с неправильной структурой не загрузится, а в журнал будет записана ошибка:

```
RULE_LOADER: пакет "hi/filler.json" не прошёл валидацию:
  - rules.0.pattern: недопустимое регулярное выражение
  - rules.1.context: должно быть одним из [all, user, system, assistant]
```

Валидация запускается автоматически при загрузке пакета (по `_schema.json`); некорректный пакет отклоняется, а указанная выше ошибка записывается в журнал. Отдельного
скрипта `npm run` для валидации пакетов нет — загрузите пакет (например, запустите сервер или
выполните путь сжатия) и следите за журналами.

### Загрузка пользовательского языкового пакета

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Либо поместите его в одно из распознаваемых расположений:

```
~/.omniroute/compression/rules/hi/filler.json  # Уровень пользователя
<project>/.compression/rules/hi/filler.json   # Уровень проекта
```

### Рекомендации по созданию языковых пакетов

1. **Начните с `filler`** — эти правила оказывают наибольшее влияние
2. **Используйте `minIntensity`** для ограничения агрессивных правил — это защищает от чрезмерного сжатия
3. **Добавляйте тестовые случаи** — добавьте в JSON массив `tests[]`, чтобы проверить поведение
4. **Порядок важен** — более ранние правила применяются первыми; размещайте наиболее значимые правила в начале
5. **Будьте осторожны с `replacement`** — обычно правильным вариантом является пустая строка; никогда не добавляйте новое содержимое

### Стратегия перевода

При локализации наборов правил для нового языка:

1. **Переводите имена правил** — они отображаются в отладочном выводе
2. **Адаптируйте шаблоны регулярных выражений** — прямой перевод часто не работает (границы слов различаются)
3. **Тестируйте на реальных диалогах** — пакет должен быть безопасен для фактических входных данных
4. **Учитывайте культурные особенности** — например, в японских пакетах больше почтительных слов-паразитов, чем в английских

---

## Составные конвейеры

**Составной конвейер** запускает несколько движков последовательно, передавая выход каждого движка следующему. Именно так `mode: stacked` работает внутри.

### Как работает объединение в конвейер

```
Вход (10 000 токенов)
        │
        ▼
   ┌──────────┐
   │ Движок   │  приоритет 10
   │ A        │  ──▶ выход: 6 000 токенов (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Движок   │  приоритет 50
   │ B        │  ──▶ выход: 2 400 токенов (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Движок   │  приоритет 100
   │ C        │  ──▶ выход: 1 200 токенов (-80%)
   └────┬─────┘
        │
        ▼
Итоговый результат (1 200 токенов, общая экономия ~88%)
```

Когда выбран `mode: "stacked"`, движки выполняются последовательно в порядке, указанном в массиве `pipeline`.
Выход движка N становится входом движка N+1.

### Режимы сжатия

OmniRoute выбирает **ОДИН режим для каждого запроса** на основе конфигурации, пороговых значений автоматического запуска и переопределений комбинаций.
Доступные режимы определены в `open-sse/services/compression/types.ts` (тип `CompressionMode`):

| Режим        | Движки                 | Сценарий использования                                                                                                                                                                                                       |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Нет                    | Отключить всё сжатие                                                                                                                                                                                                         |
| `rtk`        | Только RTK             | Сеансы с большим объёмом вывода команд (экономия 80%+)                                                                                                                                                                       |
| `lite`       | Только Lite            | Консервативное сжатие (быстрое, безопасное)                                                                                                                                                                                  |
| `standard`   | Caveman                | Сжатие прозы с использованием языковых пакетов                                                                                                                                                                               |
| `aggressive` | Caveman + Aggressive   | Агрессивное сжатие прозы + агрессивный финальный проход                                                                                                                                                                      |
| `ultra`      | Ultra                  | Максимальное сжатие (с потерями, крайняя мера). При заданном `ultra.modelPath` запросы могут направляться через SLM-движок **LLMLingua-2** (если модель недоступна, выполняется переход к пути на основе правил без ошибки). |
| `stacked`    | Настраиваемый конвейер | Объединение движков в любом порядке (см. ниже)                                                                                                                                                                               |

> Помимо перечисленных выше движков режимов, реестр также содержит специализированные движки, которые можно объединять в конвейер, —
> **CCR**, **headroom**, **ionizer** и **session-dedup**; они описаны в
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Выбор режима определяется функцией `getEffectiveMode()` в `open-sse/services/compression/strategySelector.ts`:

1. Если сжатие отключено: `"off"`
2. Если существует переопределение комбинации: использовать это переопределение
3. Если превышен порог автоматического запуска: использовать `autoTriggerMode` (по умолчанию: `"lite"`)
4. В противном случае: использовать `defaultMode`

### Составной конвейер по умолчанию

Когда явно настроен `mode: "stacked"`, конвейер по умолчанию объединяет:

1. **RTK** — удаляет шум из вывода команд (экономия ~80% для терминального вывода)
2. **Caveman** — удаляет слова-паразиты и делает прозу более лаконичной (~46% для оставшегося текста)
3. **Lite** — финальный проход для обработки пробелов и устранения дубликатов

Такое сочетание обеспечивает **экономию 78–95%** в сеансах с интенсивным использованием инструментов.

### Настройка составных конвейеров

В конфигурации комбинации:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

Можно исключать движки, добавлять собственные или изменять их порядок.

### Передача состояния

Движки могут считывать метаданные из контекста запроса (в `options`):

```ts
compress(body, config) {
  // Чтение метаданных от предыдущих движков
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Метаданные доступны **только для чтения** — движки не могут изменять контекст запроса, а могут изменять только собственное выходное тело.

### Подводные камни порядка выполнения

| Порядок движков                         | Эффект                                                                                                    |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                    | **Рекомендуется** (сначала удаляется шум, затем обрабатывается язык, после чего — пробелы)                |
| Lite → RTK → Caveman                    | Плохо — Lite удаляет пробелы из необработанного вывода, из-за чего сопоставление шаблонов RTK не работает |
| Caveman → RTK                           | Плохо — Caveman может переписать текст так, что RTK его не распознает                                     |
| Любой порядок с `tool_results` в начале | Лучше — вывод инструментов содержит больше всего шума                                                     |

### Когда НЕ следует использовать составной конвейер

Составной конвейер не всегда лучше:

- **Простые сообщения** (без вывода инструментов) — достаточно одного Caveman или Lite
- **Чувствительные к стоимости сценарии** — каждый движок добавляет задержку ~5–50 мс
- **Определённые инструменты** — для вывода оболочки обычно достаточно одного RTK

### Создание собственного конвейера

Реестр именованных конвейеров отсутствует. Составной конвейер — это просто **встроенный массив
шагов**, передаваемый в `applyStackedCompression()` (экспортируется из
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Если конвейер не передан, по умолчанию используется `rtk(standard) → caveman(full)`.

Чтобы настроить его через конфигурацию, задайте `mode: "stacked"` и укажите массив шагов в
`stackedPipeline` (считывается из `config.stackedPipeline`):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## Политика синхронизации с вышестоящими проектами

В README для движков сжатия OmniRoute указаны несколько вышестоящих проектов
(«вдохновлено RTK, Caveman, LLMLingua-2, Troglodita»). Частый вопрос от участников:
**когда в вышестоящем RTK появляется новый фильтр инструментов или в Caveman — новый
пакет правил, как это попадает в OmniRoute?** Этот раздел содержит официальный ответ.

### Вендорные копии и независимые реализации

| Движок                       | Связь с вышестоящим проектом                                                                                                                               | Расположение                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Независимая повторная реализация** (вдохновлена проектом, но не является его копией)                                                                     | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Независимая повторная реализация** (вдохновлена проектом)                                                                                                | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | В основном внутренняя реализация; только кодек `gcf/` **действительно вендорен** из `gcf-typescript` (MIT, с отметками SPDX, только универсальный профиль) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Вдохновлены проектами (служат основой для движков `llmlingua` + `session-dedup`)                                                                           | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Ключевой момент: **RTK и Caveman представляют собой независимые TypeScript-реализации
_идей_ (правил фильтрации, пакетов правил), написанные с чистого листа, а не вендорные
деревья исходного кода.** Вышестоящей копии, из которой можно выполнить `git pull`,
не существует — именно поэтому в README сказано «вдохновлено», а не «включено».

### Как интегрируются улучшения из вышестоящих проектов

**Автоматического отслеживания выпусков вышестоящих проектов и метки
`compression-sync` не существует** — это сделано намеренно. Поскольку движки являются
повторными реализациями, фильтр из вышестоящего RTK или пакет правил Caveman не
интегрируется в виде кода; вместо этого он **заново выражается как новое правило
или фильтр в собственном формате OmniRoute** (см.
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) и добавляется по мере
необходимости через обычный PR. Указанные выше точки расширения (пользовательский
движок, языковой пакет, фильтр RTK) — предусмотренные способы внести такой вклад.

Недавние примеры именно этого процесса:

- Фильтры RTK для вывода сборки Gradle и `dotnet` (v3.8.42)
- Фильтры RTK для kubectl / docker-build / composer / gh (#2824)
- Индонезийский языковой пакет Caveman (#3975), а также пакеты для немецкого / французского / японского / китайского языков

### Headroom (прокси сжатия входных данных)

Headroom — **полностью внутренняя реализация**: закреплённый снимок вендорного кодека
`gcf` плюс собственные слои OmniRoute `smartcrusher` / `toon` / `tabular`. Активного
вышестоящего проекта для отслеживания, помимо вендорной копии, нет; при изменении
кодека обновления `gcf` переносятся вручную и повторно проверяются с помощью
контрольного шага бюджета сжатия (`check:compression-budget`).

### Предложение улучшения, вдохновлённого вышестоящим проектом

1. **Не создавайте вендорную копию** — заново выразите правило или фильтр вышестоящего проекта в формате OmniRoute.
2. Добавьте его через соответствующую точку расширения ниже (языковой пакет, фильтр RTK или
   пользовательский движок).
3. Укажите вышестоящий проект в описании PR (для атрибуции), но не
   копируйте его исходный код, распространяемый по лицензии.
4. Добавьте тесты и убедитесь, что контрольный шаг `check:compression-budget` по-прежнему проходит успешно.

---

## Добавление стиля вывода

Стили вывода (см. [таблицу каталога в руководстве](./COMPRESSION_GUIDE.md#output-styles-catalog))
являются аналогом механизмов ввода на стороне ответа: вместо сжатия отправляемых данных
они предписывают модели формировать менее затратный вывод. Реестр —
`OUTPUT_STYLE_CATALOG` в `open-sse/services/compression/outputStyles/catalog.ts`, и
**одна запись каталога представляет собой всю функциональность целиком**: инжектор, панель настроек дашборда,
хранилище и телеметрия используют каталог — других списков для обновления нет.

1. **Добавьте одну запись в `OUTPUT_STYLE_CATALOG`** с `id`, `label`, `description` и
   тремя уровнями на английском языке в `levels` (`lite`, `full`, `ultra`). Каждый уровень должен заканчиваться
   `${SHARED_BOUNDARIES}`, чтобы код, пути, команды, ошибки и URL-адреса оставались без изменений.
   Текст инструкции должен быть **статическим и детерминированным** для каждой комбинации
   `(id, level, language)` — допускается только интерполяция `${SHARED_BOUNDARIES}`.
2. **Переведите его.** Добавьте как минимум блок `pt-BR` в `i18n`; эталонной структурой служат
   `ponytail` и `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi). Для стиля, намеренно
   поддерживающего только один язык, вместо этого задаётся `locale` (как `terse-cjk` → `zh`), после чего
   он предлагается только для этой локали.
3. **Обновите проверку матрицы** — добавьте языки стиля в `BASELINE_LANGUAGES` в
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Проверка отклоняет любой новый
   стиль без ограничения по локали, если для него отсутствуют необходимые переводы, кроме случаев,
   когда для него явно добавлена запись `KNOWN_ENGLISH_ONLY` со ссылкой на отслеживаемую задачу.
4. **Добавьте отдельный тест для стиля** по образцу
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: структура каталога, условие о границах
   для каждого уровня и якорная проверка, подтверждающая, что каждый перевод написан на соответствующем
   языке, а не скопирован с английского.
5. **Атрибуция**: если стиль адаптирован из стороннего проекта, укажите источник в комментарии
   к записи (например, `i-have-adhd` → ayghri/i-have-adhd, MIT) — действует то же
   правило, что и в разделе «Предложение улучшения, вдохновлённого сторонним проектом» выше.

Изменения пользовательского интерфейса, схемы или телеметрии не требуются — эти компоненты формируются на основе каталога.

---

## Рекомендации

### Разработка механизмов

1. **Всегда реализуйте `validateConfig`** — механизмы без валидации приводят к незаметным сбоям
2. **Устанавливайте реалистичное значение `targetLatencyMs`** — селектор стратегий использует его для выбора механизмов
3. **Используйте `getConfigSchema` для дашборда** — никогда не скрывайте конфигурацию от пользователей
4. **Поддерживайте `stackable: true`, если ваш механизм не имеет побочных эффектов** — механизмы с побочными эффектами не следует объединять
5. **Пишите встроенные тесты** — механизм должен проверяться менее чем за 1 секунду

### Разработка языковых пакетов

1. **Начинайте с интенсивности `lite`** — ваши правила должны быть безопасными при минимальной настройке
2. **Используйте `context` для ограничения области действия правил** — правила только для `user` не смогут случайно повлиять на системные промпты
3. **Избегайте захвата ключей JSON** — `\\bword\\b` может совпасть с текстом внутри JSON и нарушить структурированные данные
4. **Тестируйте пограничные случаи** — пустой ввод, Unicode, текст с направлением справа налево, эмодзи
5. **Используйте существующие пакеты как шаблоны** — `en/filler.json` является наиболее проработанным примером

### Проектирование конвейера

1. **Профилируйте перед оптимизацией** — сначала выполните измерения с помощью `compression_stats`
2. **Предпочитайте композицию повторной реализации** — расширяйте правила Caveman, прежде чем писать новый механизм
3. **Документируйте обоснование порядка** — поясняйте в комментариях, почему механизм A выполняется перед механизмом B
4. **Тестируйте на всех трёх уровнях интенсивности** — `lite` работает быстро, но с потерями, а `ultra` — медленно, но точно

---

## Справочник: встроенные движки

| ID движка            | Комбинируемый | `stackPriority` по умолчанию | Целевые элементы                               |
| -------------------- | ------------- | ---------------------------- | ---------------------------------------------- |
| `lite`               | Да            | 5                            | сообщения, результаты инструментов             |
| `rtk`                | Да            | 10                           | результаты инструментов                        |
| `standard` (caveman) | Да            | 20                           | сообщения, результаты инструментов, блоки кода |
| `aggressive`         | Да            | 30                           | сообщения                                      |
| `ultra`              | Да            | 40                           | сообщения, блоки кода                          |

### См. также

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Обзор конвейера
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Справочник по реестру движков
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Спецификация формата правил
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Подробная информация о языковых пакетах
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Движок RTK и пользовательские фильтры
- Исходный код: `open-sse/services/compression/` (117 файлов, ~250 КБ)
