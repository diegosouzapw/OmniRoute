# ACP (Agent Client Protocol) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Накратко**: ACP позволява на OmniRoute да стартира CLI агенти (като Claude Code, Codex) като дъщерни процеси, вместо да използва HTTP API. Това ви осигурява транспорт от типа „CLI като бекенд“.

---

## Какво е ACP?

ACP (Agent Client Protocol) е транспорт от типа **„CLI като бекенд“** за OmniRoute. Вместо да прихваща HTTP API заявки към доставчици на AI, ACP **стартира CLI агенти като дъщерни процеси** и подава подкани чрез собствения им интерфейс.

### Защо да използвате ACP?

| Предимство                       | Описание                                                       |
| -------------------------------- | -------------------------------------------------------------- |
| **Не са необходими API ключове** | Използва съществуващото ви CLI удостоверяване                  |
| **Собствен протокол**            | Използва собствения формат за вход/изход на всеки CLI          |
| **Автоматично откриване**        | Открива инсталираните CLI инструменти във вашата система       |
| **15 вградени агента**           | Предварително конфигурирани за популярни CLI инструменти       |
| **Персонализирани агенти**       | Добавяйте собствени CLI инструменти чрез настройките           |
| **Управление на процесите**      | Управлява жизнения цикъл (стартиране, изпращане, прекратяване) |

---

## Поддържани CLI агенти

ACP поддържа **15 вградени CLI агента** без необходимост от допълнителна конфигурация:

| Идентификатор на агента | Име за показване   | Изпълним файл | Протокол |
| ----------------------- | ------------------ | ------------- | -------- |
| `codex`                 | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`                | Claude Code CLI    | `claude`      | stdio    |
| `goose`                 | Goose CLI          | `goose`       | stdio    |
| `openclaw`              | OpenClaw           | `openclaw`    | stdio    |
| `aider`                 | Aider              | `aider`       | stdio    |
| `opencode`              | OpenCode           | `opencode`    | stdio    |
| `cline`                 | Cline              | `cline`       | stdio    |
| `qwen`                  | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`                 | ForgeCode          | `forge`       | stdio    |
| `amazon-q`              | Amazon Q Developer | `q`           | stdio    |
| `interpreter`           | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`            | Cursor CLI         | `cursor`      | stdio    |
| `warp`                  | Warp AI            | `warp`        | stdio    |
| `gemini`                | Gemini CLI         | `gemini`      | stdio    |
| `zcode`                 | ZCode              | `zcode`       | stdio    |

### Персонализирани агенти

Можете да добавяте собствени CLI агенти чрез настройките. Персонализираните агенти поддържат същите функции като вградените агенти.

---

## Бърз старт

### Стъпка 1: Инсталирайте CLI агент

```bash
# Пример: Инсталирайте Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Проверете инсталацията
claude --version
```

### Стъпка 2: Автоматично откриване от ACP

ACP автоматично открива инсталираните CLI агенти във вашата система. Не е необходима конфигурация!

### Стъпка 3: Използвайте ACP транспорт

След като бъде открит, ACP може да се използва като транспорт за всеки поддържан доставчик. OmniRoute автоматично ще използва ACP, когато CLI е наличен.

---

## Как работи ACP

### Архитектура

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP прокси)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Дъщерен процес  │
│  (CLI агент)    │
│                 │
│  stdin  ◄──────┤  Изпращане на подкана
│  stdout ──────►│  Получаване на отговор
│  stderr ──────►│  Получаване на грешки
└─────────────────┘
```

### Жизнен цикъл на процеса

1. **Стартиране** — ACP създава дъщерен процес за CLI агента
2. **Изпращане** — ACP записва подканите в stdin на процеса
3. **Получаване** — ACP прочита отговорите от stdout/stderr
4. **Откриване на неактивност** — ACP изчаква 2 секунди неактивност, преди да приеме отговора за завършен
5. **Прекратяване** — ACP прекратява процеса (SIGTERM, след това SIGKILL след 5 секунди)

### Комуникационен протокол

ACP използва **stdio** (стандартен вход/изход) за комуникация с CLI агентите. Протоколът е следният:

1. **Изпращане на подкана** — Запис в stdin с нов ред
2. **Изчакване на отговор** — Четене от stdout до настъпване на неактивност (2 секунди без изходни данни)
3. **Изтичане на времето** — По подразбиране 120 секунди (може да се конфигурира)

---

## Справочник за API

### Функции на регистъра

#### `detectInstalledAgents()`

Открива всички инсталирани CLI агенти в системата. Резултатите се кешират за 60 секунди.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Връща: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // напр. "codex", "claude"
  name: string; // Име за показване
  binary: string; // Име на двоичния файл за стартиране
  versionCommand: string; // Команда за откриване на версията
  version: string | null; // Открита версия (null, ако не е инсталиран)
  installed: boolean; // Дали агентът е инсталиран
  providerAlias: string; // Идентификатор на доставчика в OmniRoute
  spawnArgs: string[]; // Аргументи, които да се подадат при стартиране
  protocol: "stdio" | "http"; // Комуникационен протокол
  isCustom?: boolean; // Дали това е персонализиран агент, дефиниран от потребителя
}
```

#### `getAvailableAgents()`

Получава само агентите, които са инсталирани и достъпни за ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Връща: CliAgentInfo[] (само инсталираните агенти)
```

#### `getAgentById(id)`

Получава конкретен агент по идентификатор.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Връща: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Задава дефиниции на персонализирани агенти от настройките.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Функции на мениджъра

#### `acpManager.spawn(agentId, binary, args, env)`

Стартира нов процес на CLI агент.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* персонализирани променливи на средата */
});
// Връща: AcpSession
```

**Разрешени идентификатори на агенти**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Изпраща подкана към CLI агент и събира отговора.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // изчакване от 2 минути
);
// Връща: Promise<string>
```

#### `acpManager.kill(sessionId)`

Прекратява сесия и освобождава ресурсите.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Връща: boolean
```

#### `acpManager.getActiveSessions()`

Получава всички активни сесии.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Връща: AcpSession[]
```

#### `acpManager.killAll()`

Прекратява всички сесии.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Интерфейс на сесията

```typescript
interface AcpSession {
  id: string; // Уникален идентификатор на сесията
  agentId: string; // Идентификатор на агента (напр. "claude")
  process: ChildProcess; // Манипулатор на дъщерния процес
  alive: boolean; // Дали процесът е активен
  stdoutBuffer: string; // Натрупан буфер на stdout
  stderrBuffer: string; // Натрупан буфер на stderr
  createdAt: Date; // Време на създаване
}
```

### Събития

`AcpManager` разширява `EventEmitter` и излъчва следните събития:

#### `stdout`

Излъчва се, когато CLI агентът записва в stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Излъчва се, когато CLI агентът записва в stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Излъчва се, когато процесът на CLI агента приключи.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Излъчва се, когато възникне грешка в процеса на CLI агента.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Конфигурация

### Променливи на средата

ACP наследява всички променливи на средата от родителския процес и може да бъде разширен с персонализирани променливи на средата:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Аргументи при стартиране

Всеки агент има аргументи по подразбиране за стартиране, дефинирани в регистъра. Можете да ги замените:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Времеви ограничения

Времевото ограничение по подразбиране за заявка е **120 секунди** (2 минути). Можете да го промените:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 минути
```

### Кеш за откриване

Резултатите от откриването на агенти се кешират за **60 секунди**, за да се избегнат ресурсоемки сканирания на файловата система. Принудително опресняване:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Сигурност

### Предотвратяване на инжектиране на команди

ACP валидира командите за версия, за да предотврати атаки чрез инжектиране на команди:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Команди за версия, съдържащи тези знаци, се отхвърлят:

- `;` — Разделител на команди
- `&` — Фонов процес
- `|` — Конвейер
- `<`, `>` — Пренасочване
- `` ` `` — Заместване на команда
- `$` — Разгъване на променлива
- `\r`, `\n` — Нови редове

### Валидиране на името на изпълнимия файл

ACP проверява дали изпълнимият файл на командата за версия съответства на очакваното име на изпълнимия файл (освен ако не е персонализиран агент).

### Изолиране на процесите

Всяка ACP сесия се изпълнява в собствен дъщерен процес. Процесът се прекратява, когато сесията приключи или времевото ограничение изтече.

---

## Производителност

### Производителност при откриване

- **Първо извикване**: ~50-200ms (изпълнява командата `version` за всеки агент)
- **Кеширани извиквания**: <1ms (връща резултат от кеша)
- **TTL на кеша**: 60 секунди

### Производителност при заявка

- **Стартиране**: ~50-100ms
- **Изпращане на заявка**: ~10-50ms
- **Изчакване на отговор**: Зависи от CLI агента (обикновено 1-30 секунди)
- **Прекратяване**: ~5 секунди (SIGTERM) + незабавно (SIGKILL)

### Използване на ресурси

- **Памет за сесия**: ~10-50MB (зависи от CLI агента)
- **CPU**: Минимално (ограничено от входно-изходните операции)
- **Диск**: Не се използва

---

## Отстраняване на неизправности

### Грешка „Unknown agent“

**Проблем**: `acpManager.spawn()` извежда грешка `Unknown agent: <id>`

**Решение**: В `spawn()` са разрешени само следните агенти:

- `claude`
- `codex`
- `gemini`
- `qwen`

Другите агенти трябва да бъдат стартирани ръчно или чрез дефиниции на персонализирани агенти.

### Грешка „Session not alive“

**Проблем**: `acpManager.sendPrompt()` извежда грешка `Session ${sessionId} is not alive`

**Решение**: Сесията може да е приключила или да е била прекратена. Проверете състоянието на сесията:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Стартирайте сесията отново
  acpManager.spawn("claude", "claude", [], {});
}
```

### Грешка „ACP timeout“

**Проблем**: `acpManager.sendPrompt()` извежда грешка `ACP timeout after 120000ms`

**Решение**: Увеличете времевото ограничение:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 минути
```

### CLI не е открит

**Проблем**: `detectInstalledAgents()` не намира вашия CLI

**Решения**:

1. **Проверете PATH**: Уверете се, че CLI се намира в системния ви PATH
2. **Проверете командата за версия**: Изпълнете ръчно `claude --version`
3. **Проверете разрешенията**: Уверете се, че CLI има права за изпълнение
4. **Персонализиран агент**: Добавете дефиниция на персонализиран агент за нестандартни CLI инструменти

### Отказан достъп

**Проблем**: ACP не може да изпълни CLI

**Решения**:

1. **Проверете разрешенията на файла**: `chmod +x /usr/local/bin/claude`
2. **Проверете собствеността**: Уверете се, че OmniRoute има разрешения за четене/изпълнение
3. **Проверете SELinux/AppArmor**: Възможно е да блокира стартирането на процеси

---

## Примери

### Пример 1: Стартиране и използване на Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Откриване на инсталираните агенти
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Стартиране на нова сесия
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Изпращане на заявка
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Почистване
  acpManager.kill(session.id);
}
```

### Пример 2: Автоматично откриване с резервен вариант

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Първо опитайте Claude, а като резервен вариант — Codex
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Пример 3: Персонализиран агент

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Регистриране на персонализиран CLI агент
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// Сега detectInstalledAgents() ще включва "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Какво следва?

- **[Справочник за API](../reference/API_REFERENCE.md)** — Крайни точки на REST API
- **[Справочник за доставчиците](../reference/PROVIDER_REFERENCE.md)** — Всички 352 доставчици
- **[MCP сървър](./MCP-SERVER.md)** — Интеграция с Model Context Protocol
- **[A2A сървър](./A2A-SERVER.md)** — Протокол Agent-to-Agent
- **[Облачен агент](./CLOUD_AGENT.md)** — Агенти, базирани в облака

---

## Препратки

- [Проект AionUi](https://github.com/iOfficeAI/AionUi) — Вдъхновение за автоматичното откриване на ACP
- [Изходен код на ACP](../../src/lib/acp/) — Подробности за реализацията
  - `manager.ts` — Управление на жизнения цикъл на процесите
  - `registry.ts` — Откриване и регистриране на агенти
  - `index.ts` — Експортиране на публичния API
