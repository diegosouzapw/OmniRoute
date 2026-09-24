# ACP (Agent Client Protocol) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Укратко**: ACP омогућава OmniRoute-у да покреће CLI агенте (као што су Claude Code и Codex) као подређене процесе уместо коришћења HTTP API-ја. Тиме добијате транспорт типа „CLI као позадински систем“.

---

## Шта је ACP?

ACP (Agent Client Protocol) је **транспорт типа „CLI као позадински систем“** за OmniRoute. Уместо пресретања HTTP API позива ка добављачима AI услуга, ACP **покреће CLI агенте као подређене процесе** и прослеђује им упите преко њиховог изворног интерфејса.

### Зашто користити ACP?

| Предност                      | Опис                                                    |
| ----------------------------- | ------------------------------------------------------- |
| **Нису потребни API кључеви** | Користи вашу постојећу CLI аутентификацију              |
| **Изворни протокол**          | Користи изворни улазно-излазни формат сваког CLI алата  |
| **Аутоматско откривање**      | Открива CLI алате инсталиране на вашем систему          |
| **15 уграђених агената**      | Унапред конфигурисано за популарне CLI алате            |
| **Прилагођени агенти**        | Додајте сопствене CLI алате путем подешавања            |
| **Управљање процесима**       | Управља животним циклусом (покретање, слање, прекидање) |

---

## Подржани CLI агенти

ACP подразумевано подржава **15 уграђених CLI агената**:

| ID агента     | Назив за приказ    | Бинарна датотека | Протокол |
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

### Прилагођени агенти

Можете додати сопствене CLI агенте путем подешавања. Прилагођени агенти подржавају исте функције као и уграђени агенти.

---

## Брзи почетак

### 1. корак: Инсталирајте CLI агента

```bash
# Пример: Инсталирајте Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Проверите инсталацију
claude --version
```

### 2. корак: ACP аутоматско откривање

ACP аутоматски открива CLI агенте инсталиране на вашем систему. Конфигурација није потребна!

### 3. корак: Користите ACP транспорт

Када буде откривен, ACP се може користити као транспорт за било ког подржаног добављача. OmniRoute ће аутоматски користити ACP када је CLI доступан.

---

## Како ACP функционише

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
│ Подређени процес│
│  (CLI агент)    │
│                 │
│  stdin  ◄──────┤  Слање упита
│  stdout ──────►│  Пријем одговора
│  stderr ──────►│  Пријем грешака
└─────────────────┘
```

### Животни циклус процеса

1. **Покретање** — ACP креира подређени процес за CLI агента
2. **Слање** — ACP уписује упите у stdin процеса
3. **Пријем** — ACP чита одговоре из stdout/stderr
4. **Откривање неактивности** — ACP чека 2 секунде неактивности пре него што одговор сматра потпуним
5. **Прекидање** — ACP прекида процес (SIGTERM, а затим SIGKILL након 5 секунди)

### Комуникациони протокол

ACP користи **stdio** (стандардни улаз/излаз) за комуникацију са CLI агентима. Протокол је следећи:

1. **Слање упита** — Уписивање у stdin са новим редом
2. **Чекање одговора** — Читање из stdout до неактивности (2 секунде без излаза)
3. **Истек времена** — Подразумевано 120 секунди (може се конфигурисати)

---

## Референца API-ја

### Функције регистра

#### `detectInstalledAgents()`

Открива све инсталиране CLI агенте на систему. Резултати се кеширају 60 секунди.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Враћа: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // нпр. „codex“, „claude“
  name: string; // Назив за приказ
  binary: string; // Назив бинарне датотеке која се покреће
  versionCommand: string; // Команда за откривање верзије
  version: string | null; // Откривена верзија (null ако није инсталиран)
  installed: boolean; // Да ли је агент инсталиран
  providerAlias: string; // ID добављача у OmniRoute-у
  spawnArgs: string[]; // Аргументи који се прослеђују приликом покретања
  protocol: "stdio" | "http"; // Комуникациони протокол
  isCustom?: boolean; // Да ли је ово прилагођени агент који је дефинисао корисник
}
```

#### `getAvailableAgents()`

Преузима само агенте који су инсталирани и доступни за ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Враћа: CliAgentInfo[] (само инсталирани агенти)
```

#### `getAgentById(id)`

Преузима одређеног агента према ID-у.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Враћа: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Поставља дефиниције прилагођених агената из подешавања.

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

### Функције менаџера

#### `acpManager.spawn(agentId, binary, args, env)`

Покреће нови процес CLI агента.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* прилагођене променљиве окружења */
});
// Враћа: AcpSession
```

**Дозвољени ID-ови агената**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Шаље упит CLI агенту и прикупља одговор.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // Временско ограничење од 2 минута
);
// Враћа: Promise<string>
```

#### `acpManager.kill(sessionId)`

Прекида сесију и обавља чишћење.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Враћа: boolean
```

#### `acpManager.getActiveSessions()`

Преузима све активне сесије.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Враћа: AcpSession[]
```

#### `acpManager.killAll()`

Прекида све сесије.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Интерфејс сесије

```typescript
interface AcpSession {
  id: string; // Јединствени ID сесије
  agentId: string; // ID агента (нпр. „claude“)
  process: ChildProcess; // Референца на подређени процес
  alive: boolean; // Да ли је процес активан
  stdoutBuffer: string; // Акумулирани stdout бафер
  stderrBuffer: string; // Акумулирани stderr бафер
  createdAt: Date; // Временска ознака креирања
}
```

### Догађаји

`AcpManager` проширује `EventEmitter` и емитује следеће догађаје:

#### `stdout`

Емитује се када CLI агент уписује у stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Емитује се када CLI агент уписује у stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Емитује се када се процес CLI агента заврши.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Емитује се када дође до грешке у процесу CLI агента.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Конфигурација

### Променљиве окружења

ACP наслеђује све променљиве окружења од родитељског процеса и може се проширити прилагођеним променљивама окружења:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Аргументи за покретање

Сваки агент има подразумеване аргументе за покретање дефинисане у регистру. Можете их заменити:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Временска ограничења

Подразумевано временско ограничење за упит је **120 секунди** (2 минута). Можете га променити:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 минута
```

### Кеш детекције

Детекција агената се кешира **60 секунди** како би се избегла захтевна скенирања система датотека. Принудно освежавање:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Безбедност

### Спречавање уметања команди

ACP проверава команде за верзију како би спречио нападе уметањем команди:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Команде за верзију које садрже ове знакове се одбијају:

- `;` — Раздвајач команди
- `&` — Позадински процес
- `|` — Цевовод
- `<`, `>` — Преусмеравање
- `` ` `` — Замена команде
- `$` — Проширивање променљиве
- `\r`, `\n` — Преломи редова

### Провера назива бинарне датотеке

ACP проверава да ли се бинарна датотека команде за верзију подудара са очекиваним називом бинарне датотеке (осим ако је у питању прилагођени агент).

### Изолација процеса

Свака ACP сесија се извршава у сопственом подређеном процесу. Процес се прекида када се сесија заврши или истекне временско ограничење.

---

## Перформансе

### Перформансе детекције

- **Први позив**: ~50-200ms (покреће команду `version` за сваког агента)
- **Кеширани позиви**: <1ms (враћа резултат из кеша)
- **TTL кеша**: 60 секунди

### Перформансе упита

- **Покретање**: ~50-100ms
- **Слање упита**: ~10-50ms
- **Чекање одговора**: Зависи од CLI агента (обично 1-30 секунди)
- **Прекид**: ~5 секунди (SIGTERM) + одмах (SIGKILL)

### Употреба ресурса

- **Меморија по сесији**: ~10-50MB (зависи од CLI агента)
- **CPU**: Минимално (ограничено улазно-излазним операцијама)
- **Диск**: Не користи се

---

## Решавање проблема

### Грешка „Unknown agent“

**Проблем**: `acpManager.spawn()` пријављује грешку `Unknown agent: <id>`

**Решење**: У функцији `spawn()` дозвољени су само ови агенти:

- `claude`
- `codex`
- `gemini`
- `qwen`

Остали агенти морају бити покренути ручно или преко дефиниција прилагођених агената.

### Грешка „Session not alive“

**Проблем**: `acpManager.sendPrompt()` пријављује грешку `Session ${sessionId} is not alive`

**Решење**: Сесија се можда завршила или је прекинута. Проверите статус сесије:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Поново покрените сесију
  acpManager.spawn("claude", "claude", [], {});
}
```

### Грешка „ACP timeout“

**Проблем**: `acpManager.sendPrompt()` пријављује грешку `ACP timeout after 120000ms`

**Решење**: Повећајте временско ограничење:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 минута
```

### CLI није откривен

**Проблем**: `detectInstalledAgents()` не проналази ваш CLI

**Решења**:

1. **Проверите PATH**: Уверите се да је CLI у системској променљивој PATH
2. **Проверите команду за верзију**: Ручно покрените `claude --version`
3. **Проверите дозволе**: Уверите се да CLI може да се изврши
4. **Прилагођени агент**: Додајте дефиницију прилагођеног агента за нестандардне CLI-јеве

### Приступ одбијен

**Проблем**: ACP не може да изврши CLI

**Решења**:

1. **Проверите дозволе датотеке**: `chmod +x /usr/local/bin/claude`
2. **Проверите власништво**: Уверите се да OmniRoute има дозволе за читање/извршавање
3. **Проверите SELinux/AppArmor**: Могу блокирати покретање процеса

---

## Примери

### Пример 1: Покретање и коришћење Claude Code-а

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Откриј инсталиране агенте
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Покрени нову сесију
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Пошаљи упит
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Очисти ресурсе
  acpManager.kill(session.id);
}
```

### Пример 2: Аутоматско откривање са резервном опцијом

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Прво покушај са Claude-ом, а затим користи Codex као резервну опцију
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

### Пример 3: Прилагођени агент

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Региструј прилагођени CLI агент
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

// detectInstalledAgents() ће сада укључивати "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Шта је следеће?

- **[API референца](../reference/API_REFERENCE.md)** — Крајње тачке REST API-ја
- **[Референца провајдера](../reference/PROVIDER_REFERENCE.md)** — Свих 352 провајдера
- **[MCP сервер](./MCP-SERVER.md)** — Интеграција протокола Model Context Protocol
- **[A2A сервер](./A2A-SERVER.md)** — Протокол између агената
- **[Агент у облаку](./CLOUD_AGENT.md)** — Агенти засновани на облаку

---

## Референце

- [Пројекат AionUi](https://github.com/iOfficeAI/AionUi) — Инспирација за аутоматско откривање ACP-а
- [Изворни код ACP-а](../../src/lib/acp/) — Детаљи имплементације
  - `manager.ts` — Управљање животним циклусом процеса
  - `registry.ts` — Откривање и регистрација агената
  - `index.ts` — Извози јавног API-ја
