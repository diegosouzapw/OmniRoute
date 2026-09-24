# Extending the Compression Pipeline (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Накратко**: Механизмът за компресиране на OmniRoute е **разширяем** — можете да регистрирате персонализирани механизми, да предоставяте езикови пакети за нови езици и да съставяте каскадни конвейери. Това ръководство показва как.

**Свързани ръководства:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Пълен преглед на конвейера
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Регистър на механизмите и вградени механизми
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK механизъм и персонализирани филтри
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Справочник за формата на пакетите с правила

---

## Общ преглед

Системата за компресиране има **3 точки за разширение**:

| Точка за разширение          | Случай на употреба                                                                                             | Трудност   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------- |
| **Персонализиран механизъм** | Добавяне на изцяло нов алгоритъм за компресиране (напр. специализиран за конкретна област обобщаващ механизъм) | Напреднала |
| **Езиков пакет**             | Добавяне на поддръжка за нов естествен език (напр. хинди, арабски)                                             | Средна     |
| **Каскаден конвейер**        | Комбиниране на съществуващи механизми в персонализиран ред                                                     | Начална    |

```
┌─────────────────────────────────────────────────────────────┐
│                  Стратегия за компресиране                   │
│                                                              │
│ Входни съобщения ──▶ getEffectiveMode() ──▶ режим           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                 механизъм механизъм механизъм свързани     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Компресиран изход             │
└─────────────────────────────────────────────────────────────┘

Селекторът на стратегия работи ВЪЗ ОСНОВА НА РЕЖИМ: всяка заявка избира ЕДИН режим
(rtk / lite / standard / aggressive / ultra / stacked / off).
Само режимът "stacked" свързва последователно няколко механизма.
Режимът по подразбиране за автоматично задействане е "lite" (а не верига с приоритет от 3 нива).
```

---

## Създаване на персонализиран механизъм за компресиране

Интерфейсът на механизма (`open-sse/services/compression/engines/types.ts`) е договорът, който всеки механизъм трябва да изпълнява. Той има 5 задължителни метода.

### Интерфейсът `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Уникален идентификатор на механизма
  name: string; // Име за показване
  description: string; // Кратко описание
  icon: string; // Икона (емоджи или URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Може ли да се използва в каскаден конвейер
  stackPriority: number; // Ред в каскадните конвейери (по-ниска стойност = по-рано)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Минимален пример: механизъм за интервали

Най-простият възможен механизъм — премахва излишните интервали от съобщенията.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Разделяне по маркерите за блокове с код и запазване на празните знаци в тях
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Блоковете с код не се променят
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Прилага се само към обикновения текст
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
  stackPriority: 100, // Изпълнява се СЛЕД caveman/rtk

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

    // Обхождане на масива със съобщения — обработва както низово, така и съставно съдържание
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
      // Съставно съдържание: обхождане на частите и компресиране само на текстовите части
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
          return part; // запазване на image_url, tool_use и т.н.
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

// Глобално регистриране
registerCompressionEngine(whitespaceEngine);
````

### Къде да поставите персонализираните машини

```
~/.omniroute/compression/engines/my-engine.ts    # На потребителско ниво
<project>/compression-engines/my-engine.ts        # На ниво проект (зарежда се при стартиране)
```

Или ги заредете програмно от приставка:

```ts
// Във вашата приставка
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK на приставката предоставя куките onRequest / onResponse / onError. Регистрирайте
  // машината при зареждане на модула на приставката (или при първия onRequest); отменете регистрацията ѝ
  // чрез вашия собствен механизъм за почистване.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// При приключване:
// unregisterCompressionEngine("my-engine");
```

### Тестване на вашата машина

Регистрирайте машината си в приставка или функция за стартиране. След като бъде регистрирана, машината ще бъде налична
в селектора на стратегии чрез своя `id`. Тествайте интеграцията, като я включите в последователен конвейер:

---

## Създаване на езикови пакети

Компресията в телеграфен стил използва **специфични за езика пакети с правила**, за да обработва паразитни думи, уклончиви изрази и многословни конструкции във всеки естествен език. OmniRoute се предоставя с **6 езикови пакета**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Структура на пакета

Езиковият пакет представлява директория с **JSON файлове** в `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Любезности, уклончиви изрази, учтивост
│   ├── context.json         # Правила за намаляване на контекста
│   ├── dedup.json           # Правила за премахване на дублиране
│   ├── structural.json      # Пунктуация, форматиране
│   └── ultra.json           # Правила за агресивна компресия
├── es/  (същата структура)
├── fr/  (същата структура)
├── de/  (същата структура)
├── ja/  (същата структура)
└── pt-BR/ (същата структура)
```

### Анатомия на правило

Всяко правило има следната форма (от `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Разбираемо за хора име (kebab-case)
  pattern: string; // Шаблон за регулярен израз на JavaScript
  replacement?: string; // С какво да бъде заменено съвпадението
  replacementMap?: Record<string, string>; // ИЛИ карта ключ→заместваща стойност
  flags?: string; // Флагове за регулярен израз (обикновено "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Пропускане под това ниво на интензивност
  description?: string; // Документация
}
```

### Пример: Добавяне на правила за паразитни думи на хинди

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
      "description": "Премахва учтиви начални обръщения като 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Премахва паразитни изрази със значение 'всъщност'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Премахва 'моля' на хинди"
    }
  ]
}
```

### Валидиране

Пакетите с правила се валидират спрямо `_schema.json` при зареждане. Пакет с неправилна структура няма да бъде зареден и ще бъде записана грешка в регистрационния файл:

```
RULE_LOADER: пакетът "hi/filler.json" не премина валидирането:
  - rules.0.pattern: Невалиден регулярен израз
  - rules.1.context: трябва да бъде една от стойностите [all, user, system, assistant]
```

Валидирането се изпълнява автоматично при зареждане на пакет (спрямо `_schema.json`); невалидният пакет се отхвърля и горната грешка се записва в регистрационния файл. Няма отделен `npm run` скрипт за валидиране на пакети — заредете пакета (например стартирайте сървъра или изпълнете процеса за компресия) и следете регистрационните файлове.

### Зареждане на персонализиран езиков пакет

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Или го поставете на разпознавано местоположение:

```
~/.omniroute/compression/rules/hi/filler.json  # На ниво потребител
<project>/.compression/rules/hi/filler.json   # На ниво проект
```

### Добри практики за езикови пакети

1. **Започнете с `filler`** — тези правила имат най-голямо въздействие
2. **Използвайте `minIntensity`**, за да ограничите агресивните правила — това предпазва от прекомерна компресия
3. **Включете тестови случаи** — добавете масив `tests[]` в JSON, за да проверите поведението
4. **Редът е от значение** — по-ранните правила се прилагат първи; поставяйте правилата с голямо въздействие в началото
5. **Бъдете консервативни с `replacement`** — празният низ обикновено е правилният избор; никога не въвеждайте ново съдържание

### Стратегия за превод

При локализиране на пакети с правила за нов език:

1. **Преведете имената на правилата** — те се показват в изхода за отстраняване на грешки
2. **Адаптирайте шаблоните за регулярни изрази** — директният превод често не работи (границите на думите се различават)
3. **Тествайте с реални разговори** — пакетът трябва да бъде безопасен при действителни входни данни
4. **Съобразете се с културните особености** — например пакетите за японски съдържат повече паразитни учтиви изрази от тези за английски

---

## Подредени конвейери

**Подреденият конвейер** изпълнява последователно множество механизми, като изходът на всеки механизъм се подава към следващия. Така работи вътрешно `mode: stacked`.

### Как работи подреждането

```
Вход (10 000 токена)
        │
        ▼
   ┌──────────┐
   │ Механизъм│  приоритет 10
   │  A       │  ──▶ изход: 6 000 токена (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Механизъм│  приоритет 50
   │  B       │  ──▶ изход: 2 400 токена (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Механизъм│  приоритет 100
   │  C       │  ──▶ изход: 1 200 токена (-80%)
   └────┬─────┘
        │
        ▼
Краен изход (1 200 токена, общо ~88% спестяване)
```

Когато е избрано `mode: "stacked"`, механизмите се изпълняват последователно в реда, посочен в масива `pipeline`.
Изходът на механизъм N става вход за механизъм N+1.

### Режими на компресиране

OmniRoute избира **ЕДИН режим за всяка заявка** въз основа на конфигурацията, праговете за автоматично задействане и заместванията от комбинации.
Наличните режими са дефинирани в `open-sse/services/compression/types.ts` (тип `CompressionMode`):

| Режим        | Механизми               | Случай на употреба                                                                                                                                                                                                     |
| ------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Няма                    | Деактивиране на цялото компресиране                                                                                                                                                                                    |
| `rtk`        | Само RTK                | Сесии с много изходни данни от команди (80%+ спестяване)                                                                                                                                                               |
| `lite`       | Само Lite               | Консервативно компресиране (бързо и безопасно)                                                                                                                                                                         |
| `standard`   | Caveman                 | Компресиране на проза с езикови пакети                                                                                                                                                                                 |
| `aggressive` | Caveman + Aggressive    | Агресивно компресиране на проза + агресивен финален проход                                                                                                                                                             |
| `ultra`      | Ultra                   | Максимално компресиране (със загуби, в краен случай). По избор се маршрутизира през SLM механизма **LLMLingua-2**, когато е зададен `ultra.modelPath` (при липса на модела се преминава към базирания на правила път). |
| `stacked`    | Персонализиран конвейер | Комбиниране на механизми в произволен ред (вижте по-долу)                                                                                                                                                              |

> Освен механизмите за режими по-горе, регистърът включва и специализирани механизми, които могат да се подреждат —
> **CCR**, **headroom**, **ionizer** и **session-dedup** — документирани в
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Изборът на режим се определя от `getEffectiveMode()` в `open-sse/services/compression/strategySelector.ts`:

1. Ако компресирането е деактивирано: `"off"`
2. Ако съществува заместване от комбинация: използва се заместването
3. Ако прагът за автоматично задействане е надвишен: използва се `autoTriggerMode` (по подразбиране: `"lite"`)
4. В противен случай: използва се `defaultMode`

### Подреденият конвейер по подразбиране

Когато `mode: "stacked"` е изрично конфигуриран, конвейерът по подразбиране комбинира:

1. **RTK** — премахва шума от изходните данни на командите (~80% спестяване при терминален изход)
2. **Caveman** — премахва излишните думи и прави прозата по-лаконична (~46% от оставащия текст)
3. **Lite** — финален проход за премахване на излишни интервали и дублирано съдържание

Тази комбинация постига **78–95% спестяване** при сесии с интензивно използване на инструменти.

### Конфигуриране на подредени конвейери

В конфигурацията на комбинацията:

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

Можете да пропускате механизми, да добавяте персонализирани такива или да променяте реда им.

### Предаване на състояние

Механизмите могат да четат метаданни от контекста на заявката (в `options`):

```ts
compress(body, config) {
  // Прочитане на метаданни от предишни механизми
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Метаданните са **само за четене** — механизмите не могат да променят контекста на заявката, а само собствения си изходен текст.

### Особености при реда на изпълнение

| Ред на механизмите                    | Ефект                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                  | **Препоръчително** (първо премахва шума, след това езиковите излишъци и накрая излишните интервали) |
| Lite → RTK → Caveman                  | Лошо — Lite премахва интервали от необработения изход и съпоставянето на шаблони от RTK се проваля  |
| Caveman → RTK                         | Лошо — Caveman може да пренапише текста по начини, които RTK не разпознава                          |
| Произволен ред с `tool_results` първо | По-добре — изходът от инструментите е най-шумното съдържание                                        |

### Кога да НЕ подреждате механизми

Подреждането невинаги е по-добро:

- **Прости съобщения** (без изход от инструменти) — само Caveman или Lite е достатъчен
- **При чувствителност към разходите** — всеки механизъм добавя ~5–50 ms латентност
- **Специфични инструменти** — само RTK обикновено е достатъчен за изход от обвивката

### Създаване на персонализиран конвейер

Няма регистър на именувани конвейери. Подреденият конвейер е просто **вграден масив
от стъпки**, подаден към `applyStackedCompression()` (експортирана от
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Когато не подадете конвейер, по подразбиране се използва `rtk(standard) → caveman(full)`.

За да го управлявате чрез конфигурацията, задайте `mode: "stacked"` и предоставете масива от стъпки в
`stackedPipeline` (прочетен от `config.stackedPipeline`):

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

## Политика за синхронизиране с изходните проекти

Механизмите за компресиране на OmniRoute посочват в README няколко изходни проекта
(„вдъхновено от RTK, Caveman, LLMLingua-2, Troglodita“). Често задаван въпрос от
участниците е: **когато RTK добави нов филтър за инструмент или Caveman добави пакет
с правила, как това достига до OmniRoute?** Този раздел съдържа официалния отговор.

### Включени копия спрямо независими реализации

| Механизъм                    | Връзка с изходния проект                                                                                                               | Местоположение                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Независима повторна реализация** (вдъхновена от проекта, а не негово копие)                                                          | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Независима повторна реализация** (вдъхновена от проекта)                                                                             | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Предимно вътрешен; само кодекът `gcf/` е **действително включено копие** от `gcf-typescript` (MIT, маркиран със SPDX, само общ профил) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Вдъхновени от проектите (служат като основа за механизмите `llmlingua` + `session-dedup`)                                              | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Основен момент: **RTK и Caveman са самостоятелни TypeScript реализации на
_идеите_ (правила за филтриране, пакети с правила), а не включени копия на дърветата
с изходен код.** Няма изходно копие, от което да се изпълни `git pull` — точно
затова README гласи „вдъхновено от“, а не „включено“.

### Как се сливат подобренията от изходните проекти

По замисъл **няма автоматизирано проследяване на изданията на изходните проекти и
няма етикет `compression-sync`**. Тъй като механизмите са повторни реализации,
филтър от RTK или пакет с правила от Caveman не се слива като код; той се
**пресъздава като ново правило/филтър в собствения формат на OmniRoute** (вижте
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) и се добавя при
необходимост чрез обикновена PR заявка. Посочените по-горе точки за разширяване
(персонализиран механизъм, езиков пакет, RTK филтър) са официално одобреният начин
за принос.

Скорошни примери точно за този процес:

- RTK филтри за изхода при компилиране с Gradle и `dotnet` (v3.8.42)
- RTK филтри за kubectl / docker-build / composer / gh (#2824)
- Индонезийски езиков пакет за Caveman (#3975), както и пакети за немски / френски / японски / китайски

### Headroom (прокси за компресиране на входните данни)

Headroom е **изцяло вътрешен** — фиксирана версия на включено копие на кодека
`gcf`, допълнена със собствените слоеве `smartcrusher` / `toon` / `tabular` на
OmniRoute. Няма активен изходен проект за проследяване извън включеното копие;
актуализациите на `gcf` се обновяват ръчно при промени в кодека и се валидират
отново спрямо проверката за бюджета за компресиране
(`check:compression-budget`).

### Предлагане на подобрение, вдъхновено от изходен проект

1. **Не включвайте копие** — пресъздайте изходното правило/филтър във формата на OmniRoute.
2. Добавете го чрез съответната точка за разширяване по-долу (езиков пакет, RTK филтър или
   персонализиран механизъм).
3. Посочете изходния проект в описанието на PR заявката (за признание), вместо да
   копирате неговия лицензиран изходен код.
4. Включете тестове и потвърдете, че проверката `check:compression-budget` продължава да преминава успешно.

---

## Добавяне на стил за изход

Стиловете за изход (вижте [таблицата с каталога в ръководството](./COMPRESSION_GUIDE.md#output-styles-catalog))
са еквивалентът на входните механизми от страната на отговора: вместо да компресират това, което
изпращате, те инструктират модела да генерира по-евтин изход. Регистърът е
`OUTPUT_STYLE_CATALOG` в `open-sse/services/compression/outputStyles/catalog.ts`, а
**един запис в каталога представлява цялата функционалност**: инжекторът, панелът с настройки
на таблото, съхранението и телеметрията обхождат каталога — няма друг списък за актуализиране.

1. **Добавете един запис към `OUTPUT_STYLE_CATALOG`** с `id`, `label`, `description` и трите
   английски `levels` (`lite`, `full`, `ultra`). Всяко ниво трябва да завършва с
   `${SHARED_BOUNDARIES}`, така че кодът, пътищата, командите, грешките и URL адресите да останат непроменени.
   Текстът на инструкцията трябва да бъде **статичен и детерминистичен** за всяка
   `(id, level, language)` — `${SHARED_BOUNDARIES}` е единствената разрешена интерполация.
2. **Преведете го.** Предоставете поне блок `pt-BR` под `i18n`; `ponytail` и
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) са референтният формат. Стил, който умишлено
   поддържа само един език, вместо това задава `locale` (като `terse-cjk` → `zh`) и тогава
   се предлага само за тази локализация.
3. **Актуализирайте защитата на матрицата** — добавете езиците на стила към `BASELINE_LANGUAGES` в
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Проверката отхвърля всеки нов
   стил без ограничение по локализация, който не съдържа задължителните преводи, освен ако няма
   изричен запис в `KNOWN_ENGLISH_ONLY` с проследяващ проблем.
4. **Добавете тест за конкретния стил**, моделиран по
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: структура на каталога, клауза за
   границите за всяко ниво и опорна проверка, която потвърждава, че всеки превод е написан
   на съответния език, а не е копиран от английски.
5. **Посочване на авторство**: ако стилът е адаптиран от външен проект, посочете го в
   коментар за източника към записа (напр. `i-have-adhd` → ayghri/i-have-adhd, MIT) — важи
   същото правило като в „Предлагане на подобрение, вдъхновено от външен проект“ по-горе.

Не са необходими промени в потребителския интерфейс, схемата или телеметрията — тези компоненти се генерират от каталога.

---

## Най-добри практики

### Разработване на механизми

1. **Винаги имплементирайте `validateConfig`** — механизмите без валидиране причиняват тихи неуспехи
2. **Задавайте реалистична стойност на `targetLatencyMs`** — използва се от селектора на стратегии при избора на механизми
3. **Използвайте `getConfigSchema` за таблото** — никога не скривайте конфигурацията от потребителите
4. **Поддържайте `stackable: true`, ако механизмът ви е чист** — механизмите със странични ефекти не трябва да се комбинират
5. **Пишете вградени тестове** — механизмите трябва да могат да бъдат проверени за <1s

### Разработване на езикови пакети

1. **Започнете с интензитет `lite`** — правилата ви трябва да са безопасни при най-ниската настройка
2. **Използвайте `context`, за да ограничите обхвата на правилата** — правилата само за `user` не могат случайно да засегнат системните подкани
3. **Избягвайте прихващането на JSON ключове** — `\\bword\\b` може да съвпадне в JSON и да повреди структурираните данни
4. **Тествайте с гранични случаи** — празен вход, Unicode, текст с писане отдясно наляво, емоджита
5. **Използвайте съществуващите пакети като шаблони** — `en/filler.json` е най-добре разработеният пример

### Проектиране на конвейери

1. **Профилирайте преди оптимизация** — първо измервайте с `compression_stats`
2. **Предпочитайте композирането пред повторната имплементация** — разширявайте правилата на Caveman, преди да пишете нов механизъм
3. **Документирайте обосновката за реда** — коментирайте защо механизъм A е преди механизъм B
4. **Тествайте и при трите нива на интензитет** — `lite` е бързо, но със загуби, а `ultra` е бавно, но прецизно

---

## Справка: Вградени механизми

| Идентификатор на механизма | Комбинируем | `stackPriority` по подразбиране | Цели                                               |
| -------------------------- | ----------- | ------------------------------- | -------------------------------------------------- |
| `lite`                     | Да          | 5                               | съобщения, резултати от инструменти                |
| `rtk`                      | Да          | 10                              | резултати от инструменти                           |
| `standard` (caveman)       | Да          | 20                              | съобщения, резултати от инструменти, блокове с код |
| `aggressive`               | Да          | 30                              | съобщения                                          |
| `ultra`                    | Да          | 40                              | съобщения, блокове с код                           |

### Вижте също

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Преглед на конвейера
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Справочник за регистъра на механизмите
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Спецификация на формата на правилата
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Подробности за езиковите пакети
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Механизъм RTK и персонализирани филтри
- Изходен код: `open-sse/services/compression/` (117 файла, ~250KB)
