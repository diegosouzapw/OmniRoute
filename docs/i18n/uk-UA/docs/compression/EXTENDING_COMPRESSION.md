# Extending the Compression Pipeline (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Коротко**: рушій стиснення OmniRoute є **розширюваним** — ви можете реєструвати власні рушії, постачати мовні пакети для нових мов і компонувати багаторівневі конвеєри. Цей посібник показує, як це зробити.

**Пов’язані посібники:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Повний огляд конвеєра
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Реєстр рушіїв і вбудовані рушії
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Рушій RTK і власні фільтри
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Довідник із формату пакетів правил

---

## Огляд

Система стиснення має **3 точки розширення**:

| Точка розширення      | Варіант використання                                                          | Складність |
| --------------------- | ----------------------------------------------------------------------------- | ---------- |
| **Власний рушій**     | Додавання цілком нового алгоритму стиснення (наприклад, предметного суматора) | Висока     |
| **Мовний пакет**      | Додавання підтримки нової природної мови (наприклад, гінді або арабської)     | Середня    |
| **Складений конвеєр** | Компонування наявних рушіїв у власному порядку                                | Низька     |

```
┌─────────────────────────────────────────────────────────────┐
│                    Стратегія стиснення                       │
│                                                              │
│   Вхідні повідомлення ──▶ getEffectiveMode() ──▶ режим      │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   рушій     рушій    рушій     у ланцюжку  │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Стиснений вивід               │
└─────────────────────────────────────────────────────────────┘

Вибір стратегії БАЗУЄТЬСЯ НА РЕЖИМІ: кожен запит вибирає ОДИН режим
(rtk / lite / standard / aggressive / ultra / stacked / off).
Лише режим "stacked" послідовно з’єднує кілька рушіїв.
Стандартний режим автоматичного запуску — "lite" (а не трирівневий ланцюжок пріоритетів).
```

---

## Створення власного рушія стиснення

Інтерфейс рушія (`open-sse/services/compression/engines/types.ts`) — це контракт, якого має дотримуватися кожен рушій. Він містить 5 обов’язкових методів.

### Інтерфейс `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Унікальний ідентифікатор рушія
  name: string; // Відображувана назва
  description: string; // Короткий опис
  icon: string; // Піктограма (емодзі або URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Чи можна використовувати у складеному конвеєрі
  stackPriority: number; // Порядок у складених конвеєрах (менше значення = раніше)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Мінімальний приклад: рушій видалення зайвих пробілів

Найпростіший можливий рушій — видаляє зайві пробіли з повідомлень.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Розділяємо за маркерами блоків коду та зберігаємо пробіли всередині них
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Не змінюємо блоки коду
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Застосовуємо лише до звичайного тексту
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
  stackPriority: 100, // Запускаємо ПІСЛЯ caveman/rtk

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

    // Обходимо масив повідомлень — обробляємо як рядковий, так і багатокомпонентний вміст
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
      // Багатокомпонентний вміст: обходимо частини та стискаємо лише текстові частини
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
          return part; // зберігаємо image_url, tool_use тощо
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

// Реєструємо глобально
registerCompressionEngine(whitespaceEngine);
````

### Де розміщувати власні рушії

```
~/.omniroute/compression/engines/my-engine.ts    # Рівень користувача
<project>/compression-engines/my-engine.ts        # Рівень проєкту (завантажується під час запуску)
```

Або завантажте програмно з плагіна:

```ts
// У вашому плагіні
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK плагіна надає хуки onRequest / onResponse / onError. Зареєструйте
  // рушій під час завантаження модуля плагіна (або під час першого onRequest);
  // скасуйте його реєстрацію у власній процедурі завершення роботи.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Під час завершення роботи:
// unregisterCompressionEngine("my-engine");
```

### Тестування вашого рушія

Зареєструйте свій рушій у плагіні або функції запуску. Після реєстрації рушій стане доступним
у засобі вибору стратегії за його `id`. Протестуйте інтеграцію, додавши його до складеного конвеєра:

---

## Створення мовних пакетів

Стиснення в стилі Caveman використовує **набори правил для конкретних мов**, щоб обробляти слова-паразити, ухильні формулювання та багатослівні конструкції в кожній природній мові. OmniRoute постачається із **6 мовними пакетами**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Структура пакета

Мовний пакет — це каталог із **JSON-файлами** в `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Люб’язності, ухильні формулювання, ввічливість
│   ├── context.json         # Правила скорочення контексту
│   ├── dedup.json           # Правила дедуплікації
│   ├── structural.json      # Пунктуація, форматування
│   └── ultra.json           # Правила агресивного стиснення
├── es/  (така сама структура)
├── fr/  (така сама структура)
├── de/  (така сама структура)
├── ja/  (така сама структура)
└── pt-BR/ (така сама структура)
```

### Будова правила

Кожне правило має таку структуру (з `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Зрозуміла людині назва (kebab-case)
  pattern: string; // Шаблон регулярного виразу JavaScript
  replacement?: string; // Чим замінити збіг
  replacementMap?: Record<string, string>; // АБО мапа «ключ→заміна»
  flags?: string; // Прапорці регулярного виразу (зазвичай "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Пропустити, якщо інтенсивність нижча за цю
  description?: string; // Документація
}
```

### Приклад: додавання правил для слів-паразитів мовою гінді

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
      "description": "Видалити ввічливі вступні слова на кшталт 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Видалити слова-паразити зі значенням 'насправді'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Видалити 'будь ласка' мовою гінді"
    }
  ]
}
```

### Валідація

Під час завантаження пакети правил перевіряються за `_schema.json`. Пакет із неправильною структурою не завантажиться, а в журналі з’явиться помилка:

```
RULE_LOADER: пакет "hi/filler.json" не пройшов валідацію:
  - rules.0.pattern: Недійсний регулярний вираз
  - rules.1.context: має бути одним із [all, user, system, assistant]
```

Валідація запускається автоматично під час завантаження пакета (за `_schema.json`); недійсний пакет відхиляється, а наведена вище помилка записується в журнал. Окремого сценарію `npm run` для валідації пакетів немає — завантажте пакет (наприклад, запустіть сервер або виконайте шлях стиснення) і стежте за журналами.

### Завантаження власного мовного пакета

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Або розмістіть його в одному з розпізнаваних місць:

```
~/.omniroute/compression/rules/hi/filler.json  # Рівень користувача
<project>/.compression/rules/hi/filler.json   # Рівень проєкту
```

### Найкращі практики для мовних пакетів

1. **Починайте з `filler`** — ці правила мають найбільший вплив
2. **Використовуйте `minIntensity`**, щоб обмежувати застосування агресивних правил — це захищає від надмірного стиснення
3. **Додавайте тестові випадки** — додайте масив `tests[]` до JSON, щоб перевіряти поведінку
4. **Порядок має значення** — правила, розташовані раніше, застосовуються першими; розміщуйте правила з найбільшим впливом на початку
5. **Будьте обережні з `replacement`** — порожній рядок зазвичай є правильним варіантом; ніколи не додавайте новий вміст

### Стратегія перекладу

Під час локалізації пакетів правил для нової мови:

1. **Перекладайте назви правил** — вони відображаються у вихідних даних налагодження
2. **Адаптуйте шаблони регулярних виразів** — прямий переклад часто не працює (межі слів відрізняються)
3. **Тестуйте на реальних розмовах** — пакет має бути безпечним для фактичних вхідних даних
4. **Враховуйте культурні особливості** — наприклад, японські пакети містять більше шанобливих слів-паразитів, ніж англійські

---

## Складені конвеєри

**Складений конвеєр** послідовно запускає кілька рушіїв, передаючи вихідні дані кожного рушія наступному. Саме так `mode: stacked` працює всередині.

### Як працює складання

```
Вхідні дані (10,000 токенів)
        │
        ▼
   ┌──────────┐
   │  Рушій   │  пріоритет 10
   │  A       │  ──▶ вихідні дані: 6,000 токенів (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Рушій   │  пріоритет 50
   │  B       │  ──▶ вихідні дані: 2,400 токенів (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Рушій   │  пріоритет 100
   │  C       │  ──▶ вихідні дані: 1,200 токенів (-80%)
   └────┬─────┘
        │
        ▼
Кінцеві дані (1,200 токенів, загальна економія ~88%)
```

Коли вибрано `mode: "stacked"`, рушії виконуються послідовно в порядку, зазначеному в масиві `pipeline`.
Вихідні дані рушія N стають вхідними даними рушія N+1.

### Режими стиснення

OmniRoute вибирає **ОДИН режим для кожного запиту** на основі конфігурації, порогових значень автоматичного запуску та перевизначень комбінацій.
Доступні режими визначено у `open-sse/services/compression/types.ts` (тип `CompressionMode`):

| Режим        | Рушії                | Варіант використання                                                                                                                                                                                                             |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Немає                | Вимкнення всього стиснення                                                                                                                                                                                                       |
| `rtk`        | Лише RTK             | Сеанси з великим обсягом виводу команд (економія понад 80%)                                                                                                                                                                      |
| `lite`       | Лише Lite            | Консервативне стиснення (швидке, безпечне)                                                                                                                                                                                       |
| `standard`   | Caveman              | Стиснення прози за допомогою мовних пакетів                                                                                                                                                                                      |
| `aggressive` | Caveman + Aggressive | Агресивне стиснення прози + агресивний фінальний прохід                                                                                                                                                                          |
| `ultra`      | Ultra                | Максимальне стиснення (із втратами, крайній засіб). За потреби спрямовується через SLM-рушій **LLMLingua-2**, коли встановлено `ultra.modelPath` (у разі недоступності моделі автоматично переходить до шляху на основі правил). |
| `stacked`    | Власний конвеєр      | Поєднання рушіїв у будь-якому порядку (див. нижче)                                                                                                                                                                               |

> Окрім рушіїв режимів, наведених вище, реєстр також містить спеціалізовані рушії, які можна додавати до стеку, —
> **CCR**, **headroom**, **ionizer** і **session-dedup** — задокументовані в
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Вибір режиму визначається функцією `getEffectiveMode()` у `open-sse/services/compression/strategySelector.ts`:

1. Якщо стиснення вимкнено: `"off"`
2. Якщо існує перевизначення комбінації: використовується це перевизначення
3. Якщо перевищено порогове значення автоматичного запуску: використовується `autoTriggerMode` (за замовчуванням: `"lite"`)
4. В іншому разі: використовується `defaultMode`

### Стандартний складений конвеєр

Коли явно налаштовано `mode: "stacked"`, стандартний конвеєр поєднує:

1. **RTK** — усуває шум із виводу команд (економія ~80% для виводу термінала)
2. **Caveman** — видаляє слова-паразити та робить текст лаконічнішим (~46% для решти тексту)
3. **Lite** — фінальний прохід для обробки пробілів і дедуплікації

Ця композиція забезпечує **економію 78–95%** у сеансах з інтенсивним використанням інструментів.

### Налаштування складених конвеєрів

У конфігурації комбінації:

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

Рушії можна пропускати, додавати власні або змінювати їхній порядок.

### Передавання стану

Рушії можуть зчитувати метадані з контексту запиту (в `options`):

```ts
compress(body, config) {
  // Зчитування метаданих від попередніх рушіїв
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Метадані доступні **лише для читання** — рушії не можуть змінювати контекст запиту, а лише власні вихідні дані тіла.

### Нюанси порядку виконання

| Порядок рушіїв                                 | Ефект                                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                           | **Рекомендовано** (спочатку усуває шум, потім обробляє мову, а далі — пробіли)                  |
| Lite → RTK → Caveman                           | Погано — Lite видаляє пробіли із сирого виводу, через що зіставлення шаблонів RTK не спрацьовує |
| Caveman → RTK                                  | Погано — Caveman може переписати текст так, що RTK його не розпізнає                            |
| Будь-який порядок із `tool_results` на початку | Краще — вивід інструментів є найзашумленішим вмістом                                            |

### Коли НЕ варто складати рушії

Складання не завжди краще:

- **Прості повідомлення** (без виводу інструментів) — достатньо одного Caveman або Lite
- **Чутливість до витрат** — кожен рушій додає ~5–50 мс затримки
- **Певні інструменти** — для виводу оболонки зазвичай достатньо лише RTK

### Створення власного конвеєра

Реєстру іменованих конвеєрів немає. Складений конвеєр — це просто **вбудований масив
кроків**, переданий до `applyStackedCompression()` (експортується з
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Якщо конвеєр не передано, типовим є `rtk(standard) → caveman(full)`.

Щоб керувати ним через конфігурацію, установіть `mode: "stacked"` і надайте масив кроків у
`stackedPipeline` (зчитується з `config.stackedPipeline`):

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

## Політика синхронізації з першоджерелами

У README для рушіїв стиснення OmniRoute зазначено кілька проєктів-першоджерел
("inspired by RTK, Caveman, LLMLingua-2, Troglodita"). Поширене запитання від
учасників розробки: **коли в RTK з’являється новий фільтр інструмента або в
Caveman — новий набір правил, як це потрапляє до OmniRoute?** Цей розділ містить
офіційну відповідь.

### Вбудовані копії та незалежні реалізації

| Рушій                        | Зв’язок із першоджерелом                                                                                                     | Розташування                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Незалежна повторна реалізація** (натхненна першоджерелом, а не його копія)                                                 | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Незалежна повторна реалізація** (натхненна першоджерелом)                                                                  | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Переважно внутрішня; лише кодек `gcf/` **дійсно вбудовано** з `gcf-typescript` (MIT, позначено SPDX, лише загальний профіль) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Натхненні першоджерелами (слугують основою для рушіїв `llmlingua` + `session-dedup`)                                         | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Ключовий момент: **RTK і Caveman — це незалежні TypeScript-реалізації з чистого
аркуша, що відтворюють _ідеї_ (правила фільтрації, набори правил), а не вбудовані
дерева вихідного коду.** Немає копії першоджерела, з якої можна виконати
`git pull`, — саме тому в README написано "inspired by", а не "bundled".

### Як інтегруються поліпшення з першоджерел

**Автоматичного відстеження випусків першоджерел і мітки `compression-sync`
немає** — це свідоме рішення. Оскільки рушії є повторними реалізаціями, фільтр
RTK або набір правил Caveman із першоджерела не інтегрується як код; натомість
його **повторно виражають як нове правило або фільтр у власному форматі
OmniRoute** (див.
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) і додають за потреби
через звичайний PR. Наведені вище точки розширення (власний рушій, мовний пакет,
фільтр RTK) є схваленим способом зробити такий внесок.

Нещодавні приклади саме такого процесу:

- Фільтри RTK для результатів збирання Gradle і `dotnet` (v3.8.42)
- Фільтри RTK для kubectl / docker-build / composer / gh (#2824)
- Індонезійський мовний пакет Caveman (#3975), а також пакети для німецької / французької / японської / китайської мов

### Headroom (проксі для стиснення вхідних даних)

Headroom є **повністю внутрішнім** — це зафіксований знімок вбудованого кодека
`gcf` разом із власними шарами OmniRoute `smartcrusher` / `toon` / `tabular`.
Окрім вбудованої копії, немає активного першоджерела, яке потрібно відстежувати;
оновлення `gcf` виконуються вручну, коли кодек змінюється, а потім повторно
перевіряються за обмеженням бюджету стиснення (`check:compression-budget`).

### Як запропонувати поліпшення, натхненне першоджерелом

1. **Не вбудовуйте код** — повторно виразіть правило або фільтр із першоджерела у форматі OmniRoute.
2. Додайте його через відповідну точку розширення нижче (мовний пакет, фільтр RTK
   або власний рушій).
3. Укажіть проєкт-першоджерело в описі PR (для атрибуції), а не копіюйте його
   вихідний код, захищений ліцензією.
4. Додайте тести та підтвердьте, що перевірка `check:compression-budget` досі проходить.

---

## Додавання стилю виведення

Стилі виведення (див. [таблицю каталогу в посібнику](./COMPRESSION_GUIDE.md#output-styles-catalog))
є відповідником механізмів введення на боці відповіді: замість стиснення того, що ви
надсилаєте, вони вказують моделі створювати дешевший результат. Реєстр —
`OUTPUT_STYLE_CATALOG` у `open-sse/services/compression/outputStyles/catalog.ts`, і
**один запис каталогу — це вся функціональність**: інжектор, панель налаштувань інформаційної панелі,
збереження даних і телеметрія використовують цей каталог — жодного іншого списку оновлювати не потрібно.

1. **Додайте один запис до `OUTPUT_STYLE_CATALOG`** із `id`, `label`, `description` і
   трьома англомовними `levels` (`lite`, `full`, `ultra`). Кожен рівень має закінчуватися
   на `${SHARED_BOUNDARIES}`, щоб код, шляхи, команди, помилки та URL-адреси залишалися без змін.
   Текст інструкції має бути **статичним і детермінованим** для кожної комбінації
   `(id, level, language)` — дозволена лише інтерполяція `${SHARED_BOUNDARIES}`.
2. **Перекладіть його.** Додайте щонайменше блок `pt-BR` у `i18n`; `ponytail` та
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) слугують еталонною структурою. Стиль, навмисно
   призначений для однієї мови, натомість задає `locale` (як `terse-cjk` → `zh`) і тоді
   пропонується лише для цієї локалі.
3. **Оновіть перевірку матриці** — додайте мови стилю до `BASELINE_LANGUAGES` у
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Перевірка відхиляє будь-який новий
   стиль без обмеження за локаллю, якщо для нього немає необхідних перекладів, за винятком випадків,
   коли він містить явний запис `KNOWN_ENGLISH_ONLY` із посиланням на задачу відстеження.
4. **Додайте окремий тест для стилю** за зразком
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: структура каталогу, положення про межі
   для кожного рівня та контрольне твердження, яке підтверджує, що кожен переклад написано відповідною
   мовою, а не скопійовано з англійської.
5. **Зазначення авторства**: якщо стиль адаптовано зі стороннього проєкту, зазначте його
   у коментарі з джерелом біля запису (наприклад, `i-have-adhd` → ayghri/i-have-adhd, MIT) — діє те саме
   правило, що й у розділі «Пропонування вдосконалення, натхненого стороннім проєктом» вище.

Змінювати UI, схему чи телеметрію не потрібно — ці компоненти формуються на основі каталогу.

---

## Рекомендації

### Розробка механізмів

1. **Завжди реалізуйте `validateConfig`** — механізми без перевірки спричиняють непомітні збої
2. **Встановлюйте реалістичне значення `targetLatencyMs`** — селектор стратегій використовує його для вибору механізмів
3. **Використовуйте `getConfigSchema` для інформаційної панелі** — ніколи не приховуйте конфігурацію від користувачів
4. **Підтримуйте `stackable: true`, якщо ваш механізм є чистим** — механізми з побічними ефектами не слід поєднувати в стек
5. **Пишіть вбудовані тести** — механізми мають проходити перевірку менш ніж за 1 с

### Розробка мовних пакетів

1. **Починайте з інтенсивності `lite`** — ваші правила мають бути безпечними за найнижчого рівня
2. **Використовуйте `context`, щоб обмежувати область дії правил** — правила лише для `user` не можуть випадково вплинути на системні підказки
3. **Уникайте захоплення ключів JSON** — `\\bword\\b` може знайти збіг усередині JSON, пошкодивши структуровані дані
4. **Тестуйте граничні випадки** — порожнє введення, Unicode, текст із напрямком справа наліво, емодзі
5. **Використовуйте наявні пакети як шаблони** — `en/filler.json` є найопрацьованішим прикладом

### Проєктування конвеєра

1. **Профілюйте перед оптимізацією** — спочатку виконуйте вимірювання за допомогою `compression_stats`
2. **Віддавайте перевагу композиції, а не повторній реалізації** — розширюйте правила Caveman, перш ніж створювати новий механізм
3. **Документуйте обґрунтування порядку** — пояснюйте в коментарі, чому механізм A передує механізму B
4. **Тестуйте на всіх 3 рівнях інтенсивності** — `lite` швидкий, але неточний, `ultra` повільний, але точний

---

## Довідка: вбудовані рушії

| Ідентифікатор рушія  | Можна поєднувати | Стандартний stackPriority | Цільові об’єкти                                   |
| -------------------- | ---------------- | ------------------------- | ------------------------------------------------- |
| `lite`               | Так              | 5                         | повідомлення, результати інструментів             |
| `rtk`                | Так              | 10                        | результати інструментів                           |
| `standard` (caveman) | Так              | 20                        | повідомлення, результати інструментів, блоки коду |
| `aggressive`         | Так              | 30                        | повідомлення                                      |
| `ultra`              | Так              | 40                        | повідомлення, блоки коду                          |

### Дивіться також

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Огляд конвеєра
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Довідник реєстру рушіїв
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Специфікація формату правил
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Докладні відомості про мовні пакети
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Рушій RTK і користувацькі фільтри
- Джерело: `open-sse/services/compression/` (117 файлів, ~250 КБ)
