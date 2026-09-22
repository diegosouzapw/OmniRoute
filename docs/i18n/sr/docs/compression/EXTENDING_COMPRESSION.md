# Extending the Compression Pipeline (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Укратко**: OmniRoute механизам за компресију је **проширив** — можете регистровати прилагођене механизме, испоручивати језичке пакете за нове језике и комбиновати вишеструке токове обраде. Овај водич показује како.

**Повезани водичи:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Потпуни преглед тока обраде
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Регистар механизама и уграђени механизми
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK механизам и прилагођени филтери
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Референца формата пакета правила

---

## Преглед

Систем за компресију има **3 тачке проширења**:

| Тачка проширења           | Случај употребе                                                                  | Сложеност  |
| ------------------------- | -------------------------------------------------------------------------------- | ---------- |
| **Прилагођени механизам** | Додавање потпуно новог алгоритма компресије (нпр. сажимача специфичног за домен) | Напредно   |
| **Језички пакет**         | Додавање подршке за нови природни језик (нпр. хинди, арапски)                    | Средње     |
| **Вишеструки ток обраде** | Комбиновање постојећих механизама прилагођеним редоследом                        | Почетнички |

```
┌─────────────────────────────────────────────────────────────┐
│                   Стратегија компресије                     │
│                                                             │
│   Улазне поруке ──▶ getEffectiveMode() ──▶ режим            │
│                                              │              │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                механизам механизам механизам  повезани    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Компримовани излаз             │
└─────────────────────────────────────────────────────────────┘

Бирач стратегије је ЗАСНОВАН НА РЕЖИМУ: сваки захтев бира ЈЕДАН режим
(rtk / lite / standard / aggressive / ultra / stacked / off).
Само режим "stacked" повезује више механизама у низ.
Подразумевани режим аутоматског покретања је "lite" (а не тростепени ланац приоритета).
```

---

## Писање прилагођеног механизма за компресију

Интерфејс механизма (`open-sse/services/compression/engines/types.ts`) представља уговор који сваки механизам мора да испуни. Има 5 обавезних метода.

### Интерфејс `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Јединствени ID механизма
  name: string; // Назив за приказ
  description: string; // Кратак опис
  icon: string; // Икона (емоџи или URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Може ли да се користи у вишеструком току обраде
  stackPriority: number; // Редослед у вишеструким токовима обраде (мање = раније)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Минимални пример: механизам за размаке

Најједноставнији могући механизам — уклањање сувишних размака из порука.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Подели према ознакама блокова кода и сачувај размаке унутар њих
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Не мењај блокове кода
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Примени само на прозни текст
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
  stackPriority: 100, // Покрени НАКОН caveman/rtk

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

    // Прођи кроз низ порука — обради и текстуални и вишеделни садржај
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
      // Вишеделни садржај: прођи кроз делове и компресуј само текстуалне делове
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
          return part; // сачувај image_url, tool_use итд.
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

// Региструј глобално
registerCompressionEngine(whitespaceEngine);
````

### Где поставити прилагођене механизме

```
~/.omniroute/compression/engines/my-engine.ts    # На нивоу корисника
<project>/compression-engines/my-engine.ts        # На нивоу пројекта (учитава се при покретању)
```

Или их програмски учитајте из додатка:

```ts
// У вашем додатку
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK додатка излаже куке onRequest / onResponse / onError. Региструјте
  // механизам када се модул додатка учита (или при првом onRequest); уклоните
  // његову регистрацију у сопственој путањи за гашење.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// При гашењу:
// unregisterCompressionEngine("my-engine");
```

### Тестирање вашег механизма

Региструјте свој механизам у додатку или функцији за покретање. Након регистрације, механизам ће бити доступан
у бирачу стратегије преко свог `id`. Тестирајте интеграцију тако што ћете га укључити у наслагани ток обраде:

---

## Креирање језичких пакета

Компресија у **пећинском стилу** користи **пакете правила специфичне за језик** за обраду поштапалица, ограђивања и опширних образаца у сваком природном језику. OmniRoute се испоручује са **6 језичких пакета**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Структура пакета

Језички пакет је директоријум **JSON датотека** унутар `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Љубазне фразе, ограђивање, учтивост
│   ├── context.json         # Правила за сажимање контекста
│   ├── dedup.json           # Правила за уклањање дупликата
│   ├── structural.json      # Интерпункција, форматирање
│   └── ultra.json           # Правила за агресивну компресију
├── es/  (иста структура)
├── fr/  (иста структура)
├── de/  (иста структура)
├── ja/  (иста структура)
└── pt-BR/ (иста структура)
```

### Анатомија правила

Свако правило има следећи облик (из `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Назив разумљив људима (kebab-case)
  pattern: string; // JavaScript образац регуларног израза
  replacement?: string; // Чиме се замењује подударање
  replacementMap?: Record<string, string>; // ИЛИ мапа кључ→замена
  flags?: string; // Ознаке регуларног израза (обично "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Прескочи испод овог интензитета
  description?: string; // Документација
}
```

### Пример: додавање хинди правила за поштапалице

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
      "description": "Уклони љубазне уводне изразе попут 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Уклони поштапалице са значењем 'заправо'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Уклони 'молим' на хиндију"
    }
  ]
}
```

### Валидација

Пакети правила се приликом учитавања валидирају према `_schema.json`. Пакет са неисправном структуром неће моћи да се учита и забележиће грешку:

```
RULE_LOADER: пакет "hi/filler.json" није прошао валидацију:
  - rules.0.pattern: Неважећи регуларни израз
  - rules.1.context: мора бити једно од [all, user, system, assistant]
```

Валидација се аутоматски покреће када се пакет учита (према `_schema.json`); неважећи
пакет се одбацује, а горенаведена грешка се бележи. Не постоји засебна
`npm run` скрипта за валидацију пакета — учитајте пакет (нпр. покрените сервер или
активирајте путању компресије) и пратите евиденцију.

### Учитавање прилагођеног језичког пакета

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Или га поставите на препознату локацију:

```
~/.omniroute/compression/rules/hi/filler.json  # На нивоу корисника
<project>/.compression/rules/hi/filler.json   # На нивоу пројекта
```

### Најбоље праксе за језичке пакете

1. **Почните са `filler`** — ова правила имају највећи утицај
2. **Користите `minIntensity`** за ограничавање агресивних правила — то штити од прекомерне компресије
3. **Укључите тест-случајеве** — додајте низ `tests[]` у JSON да бисте проверили понашање
4. **Редослед је важан** — ранија правила се примењују прва; прво поставите правила са великим утицајем
5. **Будите опрезни са `replacement`** — празан стринг је обично исправан избор; никада не уводите нови садржај

### Стратегија превођења

При локализацији пакета правила за нови језик:

1. **Преведите називе правила** — појављују се у излазу за отклањање грешака
2. **Прилагодите обрасце регуларних израза** — директан превод често не функционише (границе речи се разликују)
3. **Тестирајте на стварним разговорима** — пакет треба да буде безбедан за стварне улазе
4. **Ускладите га са културним конвенцијама** — јапански пакети, на пример, имају више почасних поштапалица него енглески

---

## Уланчани токови обраде

**Уланчани ток обраде** покреће више механизама узастопно, при чему излаз сваког механизма постаје улаз следећег. Тако `mode: stacked` функционише интерно.

### Како уланчавање функционише

```
Улаз (10.000 токена)
        │
        ▼
   ┌──────────┐
   │ Механизам│  приоритет 10
   │  A       │  ──▶ излаз: 6.000 токена (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Механизам│  приоритет 50
   │  B       │  ──▶ излаз: 2.400 токена (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Механизам│  приоритет 100
   │  C       │  ──▶ излаз: 1.200 токена (-80%)
   └────┬─────┘
        │
        ▼
Коначни излаз (1.200 токена, укупна уштеда ~88%)
```

Када је изабран `mode: "stacked"`, механизми се извршавају узастопно, редоследом наведеним у низу `pipeline`.
Излаз механизма N постаје улаз механизма N+1.

### Режими компресије

OmniRoute бира **ЈЕДАН режим по захтеву** на основу конфигурације, прагова за аутоматско активирање и замена дефинисаних комбинацијом.
Доступни режими су дефинисани у `open-sse/services/compression/types.ts` (тип `CompressionMode`):

| Режим        | Механизми            | Случај употребе                                                                                                                                                                                                      |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Ниједан              | Онемогућавање сваке компресије                                                                                                                                                                                       |
| `rtk`        | Само RTK             | Сесије са великим уделом излаза команди (уштеда од 80% и више)                                                                                                                                                       |
| `lite`       | Само Lite            | Конзервативна компресија (брза, безбедна)                                                                                                                                                                            |
| `standard`   | Caveman              | Компресија прозе помоћу језичких пакета                                                                                                                                                                              |
| `aggressive` | Caveman + Aggressive | Агресивна компресија прозе + агресивна завршна обрада                                                                                                                                                                |
| `ultra`      | Ultra                | Максимална компресија (са губицима, крајње решење). Опционално се усмерава кроз SLM механизам **LLMLingua-2** када је `ultra.modelPath` подешен (ако модел није доступан, прелази на путању засновану на правилима). |
| `stacked`    | Прилагођени ток      | Комбиновање механизама било којим редоследом (погледајте испод)                                                                                                                                                      |

> Поред горенаведених механизама режима, регистар такође садржи специјализоване механизме који се могу уланчавати —
> **CCR**, **headroom**, **ionizer** и **session-dedup** — документоване у
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Избор режима одређује `getEffectiveMode()` у `open-sse/services/compression/strategySelector.ts`:

1. Ако је компресија онемогућена: `"off"`
2. Ако постоји замена дефинисана комбинацијом: користи замену
3. Ако је праг за аутоматско активирање прекорачен: користи `autoTriggerMode` (подразумевано: `"lite"`)
4. У супротном: користи `defaultMode`

### Подразумевани уланчани ток обраде

Када је `mode: "stacked"` изричито конфигурисан, подразумевани ток обраде комбинује:

1. **RTK** — уклања непотребан садржај из излаза команди (уштеда од ~80% на излазу терминала)
2. **Caveman** — уклања поштапалице и сажима прозу (~46% на преосталом тексту)
3. **Lite** — завршна обрада размака и уклањање дупликата

Ова комбинација постиже **уштеду од 78–95%** у сесијама са интензивном употребом алата.

### Конфигурисање уланчаних токова обраде

У конфигурацији комбинације:

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

Можете изоставити механизме, додати прилагођене или променити њихов редослед.

### Прослеђивање стања

Механизми могу да читају метаподатке из контекста захтева (у `options`):

```ts
compress(body, config) {
  // Читање метаподатака из претходних механизама
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Метаподаци су **само за читање** — механизми не могу да мењају контекст захтева, већ само сопствени излазни садржај.

### Замке у редоследу извршавања

| Редослед механизама                             | Ефекат                                                                                    |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                            | **Препоручено** (прво уклања непотребан садржај, затим обрађује језик, па размаке)        |
| Lite → RTK → Caveman                            | Лоше — Lite уклања размаке из сировог излаза, због чега RTK не успева да препозна обрасце |
| Caveman → RTK                                   | Лоше — Caveman може да измени текст на начине које RTK не препознаје                      |
| Било који редослед са `tool_results` на почетку | Боље — излаз алата садржи највише непотребног садржаја                                    |

### Када НЕ треба уланчавати

Уланчавање није увек боље:

- **Једноставне поруке** (без излаза алата) — довољан је само Caveman или Lite
- **Осетљивост на трошкове** — сваки механизам додаје кашњење од ~5–50 ms
- **Одређени алати** — само RTK је обично довољан за излаз љуске

### Израда прилагођеног тока обраде

Не постоји регистар именованих pipeline-ова. Наслагани pipeline је само **уграђени низ
корака** прослеђен функцији `applyStackedCompression()` (која се извози из
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Када не проследите pipeline, подразумевана вредност је `rtk(standard) → caveman(full)`.

Да бисте њиме управљали из конфигурације, подесите `mode: "stacked"` и наведите низ корака под
`stackedPipeline` (чита се из `config.stackedPipeline`):

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

## Политика синхронизације са изворним пројектима

OmniRoute-ови механизми за компресију у README-у наводе заслуге неколико изворних пројеката
(„инспирисано пројектима RTK, Caveman, LLMLingua-2, Troglodita“). Често питање сарадника
гласи: **када изворни RTK дода нови филтер алата или Caveman дода пакет
правила, како то стиже у OmniRoute?** Овај одељак пружа меродаван одговор.

### Укључене копије наспрам независних имплементација

| Механизам                    | Однос према изворном пројекту                                                                                                       | Локација                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Независна поновна имплементација** (инспирисана пројектом, а не копија)                                                           | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Независна поновна имплементација** (инспирисана пројектом)                                                                        | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Углавном интерни; само је `gcf/` кодек **заиста укључена копија** из `gcf-typescript` (MIT, означен SPDX-ом, само генерички профил) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Инспирисани пројектима (покрећу механизме `llmlingua` + `session-dedup`)                                                            | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Кључна чињеница: **RTK и Caveman су независне TypeScript имплементације
_идеја_ (правила филтрирања, пакети правила), а не укључена стабла изворног кода.** Не постоји
копија изворног пројекта из које би се извршио `git pull` — управо зато README каже
„инспирисано“, а не „укључено“.

### Како се побољшања из изворних пројеката спајају

**Не постоји аутоматизовано праћење издања изворних пројеката нити ознака `compression-sync`
** — и то је намерно. Пошто су механизми поновне имплементације, RTK
филтер или Caveman пакет правила из изворног пројекта не спаја се као код; он се **поново изражава као ново
правило/филтер у OmniRoute-овом сопственом формату** (погледајте
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) и повремено се додаје путем
уобичајеног PR-а. Горе наведене тачке проширења (прилагођени механизам, језички пакет, RTK филтер)
представљају одобрени начин да се такав додатак пошаље.

Недавни примери управо овог поступка:

- RTK филтери за излаз Gradle и `dotnet` изградње (v3.8.42)
- RTK филтери за kubectl / docker-build / composer / gh (#2824)
- Caveman пакет за индонежански језик (#3975), као и пакети за немачки / француски / јапански / кинески

### Headroom (посреднички сервер за компресију улаза)

Headroom је **у потпуности интерни** — закачени снимак укљученог `gcf` кодека, заједно са
OmniRoute-овим сопственим слојевима `smartcrusher` / `toon` / `tabular`. Не постоји активан
изворни пројекат који треба пратити осим укључене копије; ажурирања за `gcf` освежавају се
ручно када се кодек промени и поново проверавају у односу на контролу буџета компресије
(`check:compression-budget`).

### Предлагање побољшања инспирисаног изворним пројектом

1. **Не укључујте копију** — поново изразите правило/филтер изворног пројекта у OmniRoute-овом формату.
2. Додајте га путем одговарајуће тачке проширења наведене испод (језички пакет, RTK филтер или
   прилагођени механизам).
3. Наведите изворни пројекат у опису PR-а (приписивање заслуга), а не
   копирањем његовог изворног кода који подлеже лиценци.
4. Укључите тестове и потврдите да контрола `check:compression-budget` и даље пролази.

---

## Додавање стила излаза

Стилови излаза (погледајте [табелу каталога у водичу](./COMPRESSION_GUIDE.md#output-styles-catalog))
представљају пандан улазним механизмима на страни одговора: уместо да сажимају оно што
шаљете, они налажу моделу да произведе јефтинији излаз. Регистар је
`OUTPUT_STYLE_CATALOG` у `open-sse/services/compression/outputStyles/catalog.ts`, а
**једна ставка каталога представља целу функционалност**: инјектор, панел подешавања контролне табле,
перзистенција и телеметрија користе каталог — не постоји ниједна друга листа коју треба ажурирати.

1. **Додајте једну ставку у `OUTPUT_STYLE_CATALOG`** са `id`, `label`, `description` и
   три енглеска `levels` (`lite`, `full`, `ultra`). Сваки ниво мора да се завршава са
   `${SHARED_BOUNDARIES}` како би кôд, путање, команде, грешке и URL-ови остали непромењени.
   Текст упутства мора бити **статичан и детерминистички** за сваку
   `(id, level, language)` комбинацију — `${SHARED_BOUNDARIES}` је једина дозвољена интерполација.
2. **Преведите га.** Испоручите најмање `pt-BR` блок у оквиру `i18n`; `ponytail` и
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) представљају референтну структуру. Стил који је намерно
   једнојезичан уместо тога поставља `locale` (као `terse-cjk` → `zh`) и тада је
   доступан само у оквиру тог локалитета.
3. **Ажурирајте заштиту матрице** — додајте језике стила у `BASELINE_LANGUAGES` у
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Провера одбија сваки нови
   стил који није ограничен локалитетом и нема неопходне преводе, осим ако не садржи
   експлицитну ставку `KNOWN_ENGLISH_ONLY` са проблемом за праћење.
4. **Додајте тест за појединачни стил** по узору на
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: структура каталога, клаузула о
   границама за сваки ниво и контролни исказ који потврђује да је сваки превод написан на свом
   језику, уместо да буде копирани енглески текст.
5. **Навођење извора**: ако је стил прилагођен из узводног пројекта, наведите заслуге у
   коментару о извору уз ставку (нпр. `i-have-adhd` → ayghri/i-have-adhd, MIT) — важи
   исто правило као за „Предлагање побољшања инспирисаног узводним пројектом“ изнад.

Нису потребне измене корисничког интерфејса, шеме или телеметрије — те површине се приказују на основу каталога.

---

## Најбоље праксе

### Развој механизама

1. **Увек имплементирајте `validateConfig`** — механизми без валидације изазивају неприметне кварове
2. **Поставите реалистичан `targetLatencyMs`** — бирач стратегије га користи за избор механизама
3. **Користите `getConfigSchema` за контролну таблу** — никада не скривајте конфигурацију од корисника
4. **Подржите `stackable: true` ако је ваш механизам чист** — механизми са споредним ефектима не треба да се слажу
5. **Пишите уграђене тестове** — механизми треба да буду проверљиви за <1s

### Развој језичких пакета

1. **Почните интензитетом `lite`** — ваша правила треба да буду безбедна на најнижем подешавању
2. **Користите `context` да ограничите опсег правила** — правила само за `user` не могу случајно да утичу на системске упите
3. **Избегавајте обухватање JSON кључева** — `\\bword\\b` може да се поклопи унутар JSON-а и наруши структуриране податке
4. **Тестирајте граничне случајеве** — празан улаз, Unicode, RTL текст, емоџији
5. **Користите постојеће пакете као шаблоне** — `en/filler.json` је најразвијенији пример

### Дизајн цевовода

1. **Профилишите пре оптимизације** — прво мерите помоћу `compression_stats`
2. **Дајте предност компоновању у односу на поновну имплементацију** — проширите Caveman правила пре него што напишете нови механизам
3. **Документујте образложење редоследа** — коментаром објасните зашто механизам A долази пре механизма B
4. **Тестирајте на сва 3 нивоа интензитета** — `lite` је брз, али доводи до губитака, док је `ultra` спор, али прецизан

---

## Референца: уграђени механизми

| ID механизма         | Може се комбиновати | Подразумевани stackPriority | Циљеви                                |
| -------------------- | ------------------- | --------------------------- | ------------------------------------- |
| `lite`               | Да                  | 5                           | поруке, резултати алата               |
| `rtk`                | Да                  | 10                          | резултати алата                       |
| `standard` (caveman) | Да                  | 20                          | поруке, резултати алата, блокови кода |
| `aggressive`         | Да                  | 30                          | поруке                                |
| `ultra`              | Да                  | 40                          | поруке, блокови кода                  |

### Погледајте и

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Преглед процеса обраде
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Референца регистра механизама
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Спецификација формата правила
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Детаљи о језичким пакетима
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK механизам и прилагођени филтери
- Извор: `open-sse/services/compression/` (117 датотека, ~250KB)
