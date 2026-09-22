# ACP (Agent Client Protocol) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Кратко**: ACP позволяет OmniRoute запускать CLI-агенты (например, Claude Code и Codex) как дочерние процессы вместо использования HTTP API. Это обеспечивает транспорт типа «CLI как бэкенд».

---

## Что такое ACP?

ACP (Agent Client Protocol) — это транспорт типа **«CLI как бэкенд»** для OmniRoute. Вместо перехвата вызовов HTTP API к поставщикам ИИ ACP **запускает CLI-агенты как дочерние процессы** и передаёт запросы через их нативный интерфейс.

### Зачем использовать ACP?

| Преимущество                | Описание                                                        |
| --------------------------- | --------------------------------------------------------------- |
| **API-ключи не требуются**  | Использует существующую аутентификацию вашего CLI               |
| **Нативный протокол**       | Использует нативный формат ввода-вывода каждого CLI             |
| **Автообнаружение**         | Обнаруживает установленные в системе CLI                        |
| **15 встроенных агентов**   | Предварительно настроен для популярных CLI-инструментов         |
| **Пользовательские агенты** | Позволяет добавлять собственные CLI-инструменты через настройки |
| **Управление процессами**   | Управляет жизненным циклом (запуск, отправка, завершение)       |

---

## Поддерживаемые CLI-агенты

ACP изначально поддерживает **15 встроенных CLI-агентов**:

| ID агента     | Отображаемое имя   | Исполняемый файл | Протокол |
| ------------- | ------------------ | ---------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`          | stdio    |
| `claude`      | Claude Code CLI    | `claude`         | stdio    |
| `goose`       | Goose CLI          | `goose`          | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`       | stdio    |
| `aider`       | Aider              | `aider`          | stdio    |
| `opencode`    | OpenCode           | `opencode`       | stdio    |
| `cline`       | Cline              | `cline`          | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`     | stdio    |
| `forge`       | ForgeCode          | `forge`          | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`              | stdio    |
| `interpreter` | Open Interpreter   | `interpreter`    | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`         | stdio    |
| `warp`        | Warp AI            | `warp`           | stdio    |
| `gemini`      | Gemini CLI         | `gemini`         | stdio    |
| `zcode`       | ZCode              | `zcode`          | stdio    |

### Пользовательские агенты

Вы можете добавлять собственные CLI-агенты через настройки. Пользовательские агенты поддерживают те же возможности, что и встроенные.

---

## Быстрый старт

### Шаг 1. Установите CLI-агент

```bash
# Пример: установите Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Проверьте установку
claude --version
```

### Шаг 2. Автоматическое обнаружение ACP

ACP автоматически обнаруживает установленные в вашей системе CLI-агенты. Настройка не требуется!

### Шаг 3. Используйте транспорт ACP

После обнаружения ACP можно использовать как транспорт для любого поддерживаемого поставщика. OmniRoute автоматически использует ACP, когда CLI доступен.

---

## Как работает ACP

### Архитектура

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-прокси)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Дочерний процесс│
│  (CLI-агент)    │
│                 │
│  stdin  ◄──────┤  Отправка запроса
│  stdout ──────►│  Получение ответа
│  stderr ──────►│  Получение ошибок
└─────────────────┘
```

### Жизненный цикл процесса

1. **Запуск** — ACP создаёт дочерний процесс для CLI-агента
2. **Отправка** — ACP записывает запросы в stdin процесса
3. **Получение** — ACP считывает ответы из stdout/stderr
4. **Обнаружение простоя** — ACP ожидает 2 секунды бездействия, прежде чем считать ответ завершённым
5. **Завершение** — ACP завершает процесс (SIGTERM, затем SIGKILL через 5 секунд)

### Протокол взаимодействия

Для взаимодействия с CLI-агентами ACP использует **stdio** (стандартный ввод-вывод). Протокол выглядит следующим образом:

1. **Отправка запроса** — запись в stdin с символом новой строки
2. **Ожидание ответа** — чтение из stdout до наступления простоя (отсутствие вывода в течение 2 секунд)
3. **Тайм-аут** — по умолчанию 120 секунд (настраивается)

---

## Справочник API

### Функции реестра

#### `detectInstalledAgents()`

Обнаруживает все установленные в системе CLI-агенты. Результаты кэшируются на 60 секунд.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Возвращает: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // например, "codex", "claude"
  name: string; // Отображаемое имя
  binary: string; // Имя запускаемого бинарного файла
  versionCommand: string; // Команда определения версии
  version: string | null; // Обнаруженная версия (null, если не установлен)
  installed: boolean; // Установлен ли агент
  providerAlias: string; // ID провайдера в OmniRoute
  spawnArgs: string[]; // Аргументы, передаваемые при запуске
  protocol: "stdio" | "http"; // Протокол связи
  isCustom?: boolean; // Является ли агент пользовательским
}
```

#### `getAvailableAgents()`

Получает только агенты, которые установлены и доступны для ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Возвращает: CliAgentInfo[] (только установленные агенты)
```

#### `getAgentById(id)`

Получает конкретного агента по ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Возвращает: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Устанавливает определения пользовательских агентов из настроек.

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

### Функции менеджера

#### `acpManager.spawn(agentId, binary, args, env)`

Запускает новый процесс CLI-агента.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* пользовательские переменные окружения */
});
// Возвращает: AcpSession
```

**Допустимые ID агентов**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Отправляет запрос CLI-агенту и получает ответ.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // тайм-аут 2 минуты
);
// Возвращает: Promise<string>
```

#### `acpManager.kill(sessionId)`

Завершает сеанс и освобождает ресурсы.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Возвращает: boolean
```

#### `acpManager.getActiveSessions()`

Получает все активные сеансы.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Возвращает: AcpSession[]
```

#### `acpManager.killAll()`

Завершает все сеансы.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Интерфейс сеанса

```typescript
interface AcpSession {
  id: string; // Уникальный ID сеанса
  agentId: string; // ID агента (например, "claude")
  process: ChildProcess; // Дескриптор дочернего процесса
  alive: boolean; // Активен ли процесс
  stdoutBuffer: string; // Накопленный буфер stdout
  stderrBuffer: string; // Накопленный буфер stderr
  createdAt: Date; // Временная метка создания
}
```

### События

`AcpManager` расширяет `EventEmitter` и генерирует следующие события:

#### `stdout`

Генерируется, когда CLI-агент записывает данные в stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Генерируется, когда CLI-агент записывает данные в stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Генерируется при завершении процесса CLI-агента.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Генерируется при возникновении ошибки в процессе CLI-агента.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Конфигурация

### Переменные окружения

ACP наследует все переменные окружения родительского процесса и может быть дополнен пользовательскими переменными окружения:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Аргументы запуска

Каждый агент имеет аргументы запуска по умолчанию, определённые в реестре. Их можно переопределить:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Тайм-ауты

Тайм-аут запроса по умолчанию составляет **120 секунд** (2 минуты). Его можно переопределить:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 минут
```

### Кеш обнаружения

Результаты обнаружения агентов кешируются на **60 секунд**, чтобы избежать ресурсоёмкого сканирования файловой системы. Чтобы принудительно обновить кеш:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Безопасность

### Предотвращение внедрения команд

ACP проверяет команды получения версии, чтобы предотвратить атаки с внедрением команд:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Команды получения версии, содержащие следующие символы, отклоняются:

- `;` — Разделитель команд
- `&` — Фоновый процесс
- `|` — Конвейер
- `<`, `>` — Перенаправление
- `` ` `` — Подстановка команды
- `$` — Подстановка переменной
- `\r`, `\n` — Переносы строк

### Проверка имени исполняемого файла

ACP проверяет, совпадает ли исполняемый файл в команде получения версии с ожидаемым именем исполняемого файла (кроме случаев, когда используется пользовательский агент).

### Изоляция процессов

Каждый сеанс ACP выполняется в отдельном дочернем процессе. Процесс завершается при окончании сеанса или по истечении тайм-аута.

---

## Производительность

### Производительность обнаружения

- **Первый вызов**: ~50-200 мс (выполняет команду `version` для каждого агента)
- **Кешированные вызовы**: <1 мс (возвращает результат из кеша)
- **TTL кеша**: 60 секунд

### Производительность обработки запросов

- **Запуск**: ~50-100 мс
- **Отправка запроса**: ~10-50 мс
- **Ожидание ответа**: Зависит от CLI-агента (обычно 1-30 секунд)
- **Завершение**: ~5 секунд (SIGTERM) + немедленно (SIGKILL)

### Использование ресурсов

- **Память на сеанс**: ~10-50 МБ (зависит от CLI-агента)
- **ЦП**: Минимальное использование (ограничено операциями ввода-вывода)
- **Диск**: Не используется

---

## Устранение неполадок

### Ошибка "Unknown agent"

**Проблема**: `acpManager.spawn()` выдаёт ошибку `Unknown agent: <id>`

**Решение**: В `spawn()` разрешены только следующие агенты:

- `claude`
- `codex`
- `gemini`
- `qwen`

Другие агенты необходимо запускать вручную или с помощью пользовательских определений агентов.

### Ошибка "Session not alive"

**Проблема**: `acpManager.sendPrompt()` выдаёт ошибку `Session ${sessionId} is not alive`

**Решение**: Возможно, сеанс завершился или был принудительно остановлен. Проверьте состояние сеанса:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Повторно запустите сеанс
  acpManager.spawn("claude", "claude", [], {});
}
```

### Ошибка "ACP timeout"

**Проблема**: `acpManager.sendPrompt()` выдаёт ошибку `ACP timeout after 120000ms`

**Решение**: Увеличьте тайм-аут:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 минут
```

### CLI не обнаружен

**Проблема**: `detectInstalledAgents()` не находит ваш CLI

**Решения**:

1. **Проверьте PATH**: Убедитесь, что CLI находится в системной переменной PATH
2. **Проверьте команду получения версии**: Выполните `claude --version` вручную
3. **Проверьте разрешения**: Убедитесь, что CLI является исполняемым
4. **Пользовательский агент**: Добавьте пользовательское определение агента для нестандартных CLI

### Доступ запрещён

**Проблема**: ACP не может выполнить CLI

**Решения**:

1. **Проверьте права доступа к файлу**: `chmod +x /usr/local/bin/claude`
2. **Проверьте владельца**: Убедитесь, что OmniRoute имеет права на чтение и выполнение
3. **Проверьте SELinux/AppArmor**: Эти системы могут блокировать запуск процессов

---

## Примеры

### Пример 1: Запуск и использование Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Обнаружение установленных агентов
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Запуск нового сеанса
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Отправка запроса
  const response = await acpManager.sendPrompt(
    session.id,
    "Объясни квантовые вычисления в 100 словах"
  );

  console.log("Ответ Claude:", response);

  // Очистка ресурсов
  acpManager.kill(session.id);
}
```

### Пример 2: Автоматическое обнаружение с резервным вариантом

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Сначала пробуем Claude, затем используем Codex как резервный вариант
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("ACP-совместимый CLI-агент не найден");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Привет!");

acpManager.kill(session.id);
```

### Пример 3: Пользовательский агент

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Регистрация пользовательского CLI-агента
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

// Теперь detectInstalledAgents() будет включать "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Что дальше?

- **[Справочник по API](../reference/API_REFERENCE.md)** — Конечные точки REST API
- **[Справочник по провайдерам](../reference/PROVIDER_REFERENCE.md)** — Все 352 провайдера
- **[Сервер MCP](./MCP-SERVER.md)** — Интеграция Model Context Protocol
- **[Сервер A2A](./A2A-SERVER.md)** — Протокол взаимодействия между агентами
- **[Облачный агент](./CLOUD_AGENT.md)** — Облачные агенты

---

## Справочные материалы

- [Проект AionUi](https://github.com/iOfficeAI/AionUi) — Источник вдохновения для автоматического обнаружения ACP
- [Исходный код ACP](../../src/lib/acp/) — Подробности реализации
  - `manager.ts` — Управление жизненным циклом процессов
  - `registry.ts` — Обнаружение и регистрация агентов
  - `index.ts` — Экспорт публичного API
