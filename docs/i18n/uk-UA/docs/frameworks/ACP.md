# ACP (Agent Client Protocol) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Коротко**: ACP дає змогу OmniRoute запускати CLI-агенти (як-от Claude Code, Codex) як дочірні процеси замість використання HTTP API. Це забезпечує транспорт типу «CLI як бекенд».

---

## Що таке ACP?

ACP (Agent Client Protocol) — це транспорт типу **«CLI як бекенд»** для OmniRoute. Замість перехоплення викликів HTTP API до постачальників ШІ ACP **запускає CLI-агенти як дочірні процеси** та передає запити через їхній нативний інтерфейс.

### Навіщо використовувати ACP?

| Перевага                  | Опис                                                        |
| ------------------------- | ----------------------------------------------------------- |
| **Не потрібні ключі API** | Використовує наявну автентифікацію CLI                      |
| **Нативний протокол**     | Використовує нативний формат введення/виведення кожного CLI |
| **Автоматичне виявлення** | Виявляє встановлені CLI у вашій системі                     |
| **15 вбудованих агентів** | Попередньо налаштовано для популярних CLI-інструментів      |
| **Власні агенти**         | Додавайте власні CLI-інструменти через налаштування         |
| **Керування процесами**   | Керує життєвим циклом (запуск, надсилання, завершення)      |

---

## Підтримувані CLI-агенти

ACP підтримує **15 вбудованих CLI-агентів** одразу після встановлення:

| Ідентифікатор агента | Назва для відображення | Виконуваний файл | Протокол |
| -------------------- | ---------------------- | ---------------- | -------- |
| `codex`              | OpenAI Codex CLI       | `codex`          | stdio    |
| `claude`             | Claude Code CLI        | `claude`         | stdio    |
| `goose`              | Goose CLI              | `goose`          | stdio    |
| `openclaw`           | OpenClaw               | `openclaw`       | stdio    |
| `aider`              | Aider                  | `aider`          | stdio    |
| `opencode`           | OpenCode               | `opencode`       | stdio    |
| `cline`              | Cline                  | `cline`          | stdio    |
| `qwen`               | Qwen Code              | `qwen --acp`     | stdio    |
| `forge`              | ForgeCode              | `forge`          | stdio    |
| `amazon-q`           | Amazon Q Developer     | `q`              | stdio    |
| `interpreter`        | Open Interpreter       | `interpreter`    | stdio    |
| `cursor-cli`         | Cursor CLI             | `cursor`         | stdio    |
| `warp`               | Warp AI                | `warp`           | stdio    |
| `gemini`             | Gemini CLI             | `gemini`         | stdio    |
| `zcode`              | ZCode                  | `zcode`          | stdio    |

### Власні агенти

Ви можете додавати власні CLI-агенти через налаштування. Власні агенти підтримують ті самі функції, що й вбудовані.

---

## Швидкий старт

### Крок 1: установіть CLI-агент

```bash
# Приклад: установіть Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Перевірте встановлення
claude --version
```

### Крок 2: автоматичне виявлення ACP

ACP автоматично виявляє встановлені CLI-агенти у вашій системі. Налаштування не потрібне!

### Крок 3: використовуйте транспорт ACP

Після виявлення ACP можна використовувати як транспорт для будь-якого підтримуваного постачальника. OmniRoute автоматично використовуватиме ACP, коли CLI буде доступний.

---

## Як працює ACP

### Архітектура

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-проксі)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Дочірній процес │
│  (CLI-агент)    │
│                 │
│  stdin  ◄──────┤  Надсилання запиту
│  stdout ──────►│  Отримання відповіді
│  stderr ──────►│  Отримання помилок
└─────────────────┘
```

### Життєвий цикл процесу

1. **Запуск** — ACP створює дочірній процес для CLI-агента
2. **Надсилання** — ACP записує запити до stdin процесу
3. **Отримання** — ACP зчитує відповіді зі stdout/stderr
4. **Виявлення бездіяльності** — ACP очікує 2 секунди бездіяльності, перш ніж вважати відповідь завершеною
5. **Завершення** — ACP завершує процес (SIGTERM, а потім SIGKILL через 5 с)

### Протокол обміну даними

ACP використовує **stdio** (стандартне введення/виведення) для обміну даними з CLI-агентами. Протокол працює так:

1. **Надсилання запиту** — запис до stdin із символом нового рядка
2. **Очікування відповіді** — читання зі stdout до настання бездіяльності (відсутність виведення протягом 2 с)
3. **Час очікування** — за замовчуванням 120 секунд (можна налаштувати)

---

## Довідник API

### Функції реєстру

#### `detectInstalledAgents()`

Виявляє всі встановлені в системі CLI-агенти. Результати кешуються на 60 секунд.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Повертає: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // наприклад, "codex", "claude"
  name: string; // Відображуване ім’я
  binary: string; // Назва бінарного файлу для запуску
  versionCommand: string; // Команда визначення версії
  version: string | null; // Виявлена версія (null, якщо не встановлено)
  installed: boolean; // Чи встановлено агента
  providerAlias: string; // ID провайдера в OmniRoute
  spawnArgs: string[]; // Аргументи, які передаються під час запуску
  protocol: "stdio" | "http"; // Протокол зв’язку
  isCustom?: boolean; // Чи є цей агент користувацьким
}
```

#### `getAvailableAgents()`

Отримує лише тих агентів, які встановлені та доступні для ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Повертає: CliAgentInfo[] (лише встановлені агенти)
```

#### `getAgentById(id)`

Отримує конкретного агента за ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Повертає: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Задає визначення користувацьких агентів із налаштувань.

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

### Функції менеджера

#### `acpManager.spawn(agentId, binary, args, env)`

Запускає новий процес CLI-агента.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* користувацькі змінні середовища */
});
// Повертає: AcpSession
```

**Дозволені ID агентів**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Надсилає запит CLI-агенту та отримує відповідь.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // Час очікування — 2 хвилини
);
// Повертає: Promise<string>
```

#### `acpManager.kill(sessionId)`

Завершує сеанс і виконує очищення.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Повертає: boolean
```

#### `acpManager.getActiveSessions()`

Отримує всі активні сеанси.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Повертає: AcpSession[]
```

#### `acpManager.killAll()`

Завершує всі сеанси.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Інтерфейс сеансу

```typescript
interface AcpSession {
  id: string; // Унікальний ID сеансу
  agentId: string; // ID агента (наприклад, "claude")
  process: ChildProcess; // Дескриптор дочірнього процесу
  alive: boolean; // Чи активний процес
  stdoutBuffer: string; // Накопичений буфер stdout
  stderrBuffer: string; // Накопичений буфер stderr
  createdAt: Date; // Час створення
}
```

### Події

`AcpManager` розширює `EventEmitter` і генерує такі події:

#### `stdout`

Генерується, коли CLI-агент записує дані до stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Генерується, коли CLI-агент записує дані до stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Генерується, коли процес CLI-агента завершується.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Генерується, коли в процесі CLI-агента виникає помилка.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Конфігурація

### Змінні середовища

ACP успадковує всі змінні середовища від батьківського процесу, і їх можна доповнити власними змінними середовища:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Аргументи запуску

Кожен агент має стандартні аргументи запуску, визначені в реєстрі. Їх можна перевизначити:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Тайм-аути

Стандартний тайм-аут запиту становить **120 секунд** (2 хвилини). Його можна перевизначити:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 хвилин
```

### Кеш виявлення

Результати виявлення агентів кешуються на **60 секунд**, щоб уникнути ресурсоємного сканування файлової системи. Щоб примусово оновити кеш:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Безпека

### Запобігання ін’єкції команд

ACP перевіряє команди визначення версії, щоб запобігти атакам із використанням ін’єкції команд:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Команди визначення версії, що містять ці символи, відхиляються:

- `;` — Роздільник команд
- `&` — Фоновий процес
- `|` — Конвеєр
- `<`, `>` — Перенаправлення
- `` ` `` — Підстановка команди
- `$` — Розгортання змінної
- `\r`, `\n` — Переноси рядків

### Перевірка назви виконуваного файлу

ACP перевіряє, чи відповідає виконуваний файл у команді визначення версії очікуваній назві виконуваного файлу (якщо це не користувацький агент).

### Ізоляція процесів

Кожен сеанс ACP виконується у власному дочірньому процесі. Процес завершується, коли сеанс закінчується або спливає час очікування.

---

## Продуктивність

### Продуктивність виявлення

- **Перший виклик**: ~50-200 мс (виконує команду `version` для кожного агента)
- **Кешовані виклики**: <1 мс (повертає результат із кешу)
- **TTL кешу**: 60 секунд

### Продуктивність обробки запитів

- **Запуск**: ~50-100 мс
- **Надсилання запиту**: ~10-50 мс
- **Очікування відповіді**: Залежить від CLI-агента (зазвичай 1-30 секунд)
- **Завершення**: ~5 секунд (SIGTERM) + негайно (SIGKILL)

### Використання ресурсів

- **Пам’ять на сеанс**: ~10-50 МБ (залежить від CLI-агента)
- **ЦП**: Мінімальне навантаження (операції введення-виведення)
- **Диск**: Не використовується

---

## Усунення несправностей

### Помилка "Unknown agent"

**Проблема**: `acpManager.spawn()` спричиняє помилку `Unknown agent: <id>`

**Рішення**: У `spawn()` дозволено використовувати лише цих агентів:

- `claude`
- `codex`
- `gemini`
- `qwen`

Інші агенти потрібно запускати вручну або за допомогою визначень користувацьких агентів.

### Помилка "Session not alive"

**Проблема**: `acpManager.sendPrompt()` спричиняє помилку `Session ${sessionId} is not alive`

**Рішення**: Сеанс міг завершитися або бути примусово припинений. Перевірте стан сеансу:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Повторно запустіть сеанс
  acpManager.spawn("claude", "claude", [], {});
}
```

### Помилка "ACP timeout"

**Проблема**: `acpManager.sendPrompt()` спричиняє помилку `ACP timeout after 120000ms`

**Рішення**: Збільште тайм-аут:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 хвилин
```

### CLI не виявлено

**Проблема**: `detectInstalledAgents()` не знаходить ваш CLI

**Рішення**:

1. **Перевірте PATH**: Переконайтеся, що CLI доступний у системному PATH
2. **Перевірте команду визначення версії**: Виконайте `claude --version` вручну
3. **Перевірте дозволи**: Переконайтеся, що CLI є виконуваним
4. **Користувацький агент**: Додайте визначення користувацького агента для нестандартних CLI

### Відмовлено в доступі

**Проблема**: ACP не може виконати CLI

**Рішення**:

1. **Перевірте дозволи файлу**: `chmod +x /usr/local/bin/claude`
2. **Перевірте власника**: Переконайтеся, що OmniRoute має дозволи на читання та виконання
3. **Перевірте SELinux/AppArmor**: Вони можуть блокувати запуск процесів

---

## Приклади

### Приклад 1: Запуск і використання Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Виявлення встановлених агентів
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Запуск нового сеансу
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Надсилання запиту
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Очищення ресурсів
  acpManager.kill(session.id);
}
```

### Приклад 2: Автоматичне виявлення з резервним варіантом

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Спочатку спробувати Claude, а в разі невдачі — Codex
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

### Приклад 3: Власний агент

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Реєстрація власного CLI-агента
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

// Тепер detectInstalledAgents() включатиме "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Що далі?

- **[Довідник API](../reference/API_REFERENCE.md)** — кінцеві точки REST API
- **[Довідник провайдерів](../reference/PROVIDER_REFERENCE.md)** — усі 352 провайдери
- **[Сервер MCP](./MCP-SERVER.md)** — інтеграція Model Context Protocol
- **[Сервер A2A](./A2A-SERVER.md)** — протокол Agent-to-Agent
- **[Хмарний агент](./CLOUD_AGENT.md)** — хмарні агенти

---

## Довідкові матеріали

- [Проєкт AionUi](https://github.com/iOfficeAI/AionUi) — джерело натхнення для автоматичного виявлення ACP
- [Вихідний код ACP](../../src/lib/acp/) — деталі реалізації
  - `manager.ts` — керування життєвим циклом процесів
  - `registry.ts` — виявлення та реєстрація агентів
  - `index.ts` — експортування публічного API
