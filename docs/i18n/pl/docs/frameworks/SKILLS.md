---
title: "Framework Skills"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Framework Skills

> **Source of truth:** `src/lib/skills/` and `src/app/api/skills/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute udostępnia rozszerzalny framework Skills, który pozwala modelom językowym (oraz operatorom) składać wielokrotnego użytku możliwości — od odczytów systemu plików i żądań HTTP po wykonywanie kodu w sandboxie oraz wyselekcjonowane skille z marketplace.

Skill to wersjonowana, zdefiniowana schematem jednostka pracy. OmniRoute może wstrzykiwać skille jako definicje narzędzi do żądań wychodzących, przechwytywać wywołania narzędzi wracające od modelu, uruchamiać pasujący handler i zwracać wynik do modelu, aby rozmowa mogła być kontynuowana. Model nigdy nie widzi implementacji — tylko interfejs narzędzia.

---

## Agent Skills vs Omni Skills

OmniRoute ma dwa odrębne, ale komplementarne systemy skilli:

| Dimension       | **Omni Skills** (ten dokument)                                | **Agent Skills**                                                                                |
| :-------------- | :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------- |
| Purpose         | Wstrzykiwanie narzędzi LLM + wykonanie w sandboxie            | Katalog SKILL.md do odkrywania i konsumowania przez zewnętrznych agentów                        |
| Source of truth | `src/lib/skills/` + marketplace                               | `src/lib/agentSkills/` + katalog `skills/`                                                      |
| Runtime mode    | Wstrzykiwane do żądań wychodzących, wykonywane przy tool-call | Statyczny katalog markdown + endpointy discovery REST/MCP/A2A                                   |
| Who uses it     | Sam OmniRoute (routing combo, przychodzące wywołania LLM)     | Zewnętrzni agenci, klienci MCP, orkiestratory A2A                                               |
| Count           | Zmienna (napędzana marketplace)                               | 42 kanoniczne wpisy (22 API + 20 CLI)                                                           |
| Format          | `SkillDefinition` ze schematem narzędzia + handler            | Frontmatter `SKILL.md` + treść markdown                                                         |
| Discovery       | REST `/api/skills/*` + narzędzia MCP `omniroute_skills_*`     | REST `/api/agent-skills/*` + narzędzia MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** to silnik wykonania — definiują, _co OmniRoute potrafi zrobić_, gdy LLM wywoła narzędzie.

**Agent Skills** to katalog dokumentacji — wyjaśniają zewnętrznym agentom, _jak używać_ REST API i CLI OmniRoute, ze ustrukturyzowanymi plikami SKILL.md, które można bezpośrednio wstawić do promptów agenta.

Katalog Agent Skills, generator, narzędzia MCP oraz skill A2A opisano w [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Concepts

### Skill Sources

W tym samym rejestrze współistnieją trzy źródła skilli:

1. **Built-in skills** (`src/lib/skills/builtins.ts`) — dostarczane z OmniRoute. Pokrywają typowe przypadki:
   - `file_read`, `file_write` — workspace sandboxa per klucz API pod `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — wychodzące HTTP przez `safeOutboundFetch` z `guard: "public-only"`
   - `web_search` — podłączany provider wyszukiwania z cache (`executeWebSearch`)
   - `eval_code` — wykonanie `node` lub `python` w sandboxie Dockera
   - `execute_command` — polecenie shell w sandboxie Dockera
   - `browser` — scaffolding oparty o Playwright, domyślnie wyłączony (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute Marketplace) — pobierany z `https://skillsmp.com/api/v1/skills/search`. Wymaga `skillsmpApiKey` w Settings.
3. **SkillsSH** (katalog społecznościowy `skills.sh`) — pobierany z `https://skills.sh/api/search`. Auth nie jest wymagany; treść SKILL.md ściągana z GitHub raw.

Jeden „active provider” kontroluje, z którego katalogu dashboard instaluje skille (`src/lib/skills/providerSettings.ts`). Przełączysz go w **Settings → Memory & Skills**. Domyślnie: `skillsmp`.

### Skill Identity

Skille są kluczem `name@version` w rejestrze w pamięci (`src/lib/skills/registry.ts`). Wersja musi być semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` rozumie ograniczenia `^`, `~`, `>`, `>=`, `<`, `<=`, `==` oraz dokładne dopasowanie.

### Skill Mode

Każdy skill ma tryb runtime, który kontroluje, kiedy jest wstrzykiwany:

| Mode   | Behavior                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| `on`   | Zawsze wstrzykiwany jako definicja narzędzia                                                                |
| `off`  | Nigdy nie wstrzykiwany, nigdy nie wykonywalny                                                               |
| `auto` | Punktowany względem przychodzącego żądania; wstrzykiwany tylko jeśli score ≥ `AUTO_MIN_SCORE` (domyślnie 3) |

`auto` jest domyślne dla skilli zainstalowanych z marketplace. `enabled=true` i `mode="off"` razem oznaczają „zarejestrowany, ale nieaktywny” — przełączenie `enabled` przez legacy column podbija też `mode`, żeby starsze ścieżki kodu pozostały spójne (`src/app/api/skills/[id]/route.ts`).

### Status (executions)

Wykonania skilli są śledzone w tabeli `skill_executions` z następującymi statusami (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Registry Cache

`SkillRegistry` to singleton z cache TTL 60 sekund (`registry.ts:14`). `loadFromDatabase()` jest idempotentne i deduplikuje równoległe wywołania przez `pendingLoad`. Każdy zapis (`register`/`unregister`/`unregisterById`) unieważnia cache. Wersje wyszukasz przez `getSkillVersions(name)` oraz `resolveVersion(name, constraint)`.

### Provider-Aware Injection

`injectSkills()` w `src/lib/skills/injection.ts` to punkt wejścia, który zamienia zarejestrowane skille w definicje narzędzi specyficzne dla providera:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Nazwa narzędzia jest kodowana jako `name@version`, dzięki czemu handler może wybrać właściwą wersję, gdy model ją wywoła z powrotem.

### AUTO Scoring

Gdy `mode="auto"`, każdy kandydacki skill jest punktowany względem kontekstu żądania (`scoreAutoSkill()` w `injection.ts`):

| Signal                                         | Points       |
| ---------------------------------------------- | ------------ |
| Skill name appears verbatim in context         | +6           |
| Each name token matches a context token        | +2           |
| Each tag substring matches context             | +3           |
| Each description token matches context         | +1           |
| Background reason matches a name token         | +2 per token |
| Background reason matches a tag                | +2 per token |
| Provider hint in tags matches request provider | +2 / −2      |

Top `AUTO_MAX_SKILLS = 5` skilli z `score >= AUTO_MIN_SCORE = 3` jest wstrzykiwanych. Remisy rozstrzygane są przez `installCount` (desc), potem alfabetyczną nazwę (`injection.ts:225-235`).

### Tool Call Interception

`handleToolCallExecution()` w `src/lib/skills/interception.ts` jest wywoływane przez chat handler po tym, jak upstream zwróci odpowiedź z tool-calling:

1. `extractToolCalls()` czyta kształty specyficzne dla providera (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Aliasys wbudowanych narzędzi (np. `omniroute_web_search` → `web_search`) są rozwiązywane najpierw. Handlery wbudowane działają inline.
3. Wszystko inne idzie przez `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Wyniki są wstawiane z powrotem do odpowiedzi — `tool_results`, elementy `function_call_output` albo bloki Anthropic `tool_result` w zależności od formatu.

`customSkillExecutionEnabled` w kontekście wykonania można ustawić na `false`, aby zezwolić tylko na wbudowaną interception (używane przez ścieżki żądań, które jawnie wyłączają handlery zdefiniowane przez użytkownika).

---

## Docker Sandbox

Ścieżki kodu spoza builtins (`eval_code`, `execute_command`) działają w Dockerze przez `SandboxRunner` (`src/lib/skills/sandbox.ts`). Każdy kontener jest uruchamiany z:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (when readOnly=true)
```

Domyślne wartości (`SandboxRunner.DEFAULT_CONFIG`):

| Field            | Default         | Notes                                                    |
| ---------------- | --------------- | -------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Dzielone przez 1000 przed przekazaniem do `--cpus`       |
| `memoryLimit`    | 256 MB          | Twardy limit                                             |
| `timeout`        | 30000 ms        | Soft kill przez `SIGTERM` + `docker kill`                |
| `networkEnabled` | `false`         | Staje się `--network none`                               |
| `readOnly`       | `true`          | Root FS tylko do odczytu; `/tmp` i `/workspace` to tmpfs |

`SandboxRunner.kill(id)` oraz `killAll()` są wystawione na shutdown; działające kontenery są śledzone w `runningContainers: Map<string, ChildProcess>`.

### Sandbox Env Vars

Konfigurowane przez `process.env` w `src/lib/skills/builtins.ts`:

| Env Var                           | Default          | Purpose                                                                          |
| --------------------------------- | ---------------- | -------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Limit dla `file_read` i `file_write`                                             |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Limit body odpowiedzi `http_request`                                             |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Limit stdout/stderr zwracanego do wywołującego                                   |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Domyślny timeout poleceń w sandboxie; hard cap 60 s                              |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Główna bramka egress. Ustaw `1` lub `true`, aby zezwolić na opt-in per wywołanie |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (patrz poniżej)  | Lista dozwolonych obrazów Dockera oddzielona przecinkami                         |

Domyślnie dozwolone obrazy: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Dodatki przez `SKILLS_ALLOWED_SANDBOX_IMAGES` są scalane z domyślnymi; nieznane obrazy są odrzucane przez `normalizeImage()`.

> Note: nie ma osobnej zmiennej env `SKILLS_EXECUTION_TIMEOUT_MS`. Timeout handlera spoza sandboxa jest hard-coded na 30 s w `SkillExecutor` (`executor.ts:13`), ale można go nadpisać w runtime przez `skillExecutor.setTimeout(ms)`.

### Workspace Isolation

`file_read` i `file_write` rozwiązują każdą ścieżkę względem workspace per klucz API w `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Path traversal (`..`) oraz zabronione segmenty (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) są odrzucane przed jakimkolwiek I/O dyskowym.

### HTTP Hardening

`http_request` (`builtins.ts:257`):

- Allowlista metod: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokowane nagłówki wychodzące: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Redirecty wyłączone (`allowRedirect: false`)
- Trasowane przez `safeOutboundFetch` z `guard: "public-only"` (zakresy private/loopback zablokowane)
- Odpowiedź obcinana przy `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klient widzi `truncated: true`

---

## Hybrid Executor (preview)

`src/lib/skills/hybrid.ts` definiuje `HybridExecutor`, który decyduje między wykonaniem `direct` (in-process) a `sandbox` per wywołanie, ze ścieżką retry `autoUpgrade` przy błędach timeout/memory. Podpięte implementacje `directExecutor` / `sandboxRunner` to stuby (`executeDirect`, `executeInSandbox` zwracają placeholdery) — traktuj ten moduł jako kontrakt w budowie. Rzeczywiste wykonanie nadal idzie przez `skillExecutor` + `SandboxRunner`.

---

## Storage

Schemat jest w dwóch migracjach:

- `src/lib/db/migrations/016_create_skills.sql` — bazowe tabele `skills` i `skill_executions`, z indeksami na `(api_key_id, name)` oraz `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — dodaje `mode`, `source_provider`, `tags` (JSON), `install_count` do `skills`.

`skill_executions.status` jest ograniczony na poziomie bazy: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Wszystkie endpointy żyją pod `src/app/api/skills/`. Endpointy zarządzania (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) wymagają **management auth** przez `requireManagementAuth()`. Przepływy marketplace/install używają lżejszego `isAuthenticated()` (sesja lub klucz API).

| Endpoint | Method | Purpose |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | List registered skills. Supports `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, pagination |
| `/api/skills/[id]` | PUT | Update `enabled` or `mode` |
| `/api/skills/[id]` | DELETE | Unregister by id |
| `/api/skills/install` | POST | Install a custom skill (handler code + schema) |
| `/api/skills/marketplace` | GET | Search the SkillsMP catalog (returns popular defaults when `q` is empty) |
| `/api/skills/marketplace/install` | POST | Install a SkillsMP skill (requires active provider = `skillsmp`) |
| `/api/skills/skillssh` | GET | Search the skills.sh catalog (`?q=&limit=`, capped at 100) |
| `/api/skills/skillssh/install` | POST | Install a skills.sh skill (requires active provider = `skillssh`) |
| `/api/skills/executions` | GET | Paginated execution history (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Execute a registered skill ad-hoc |

Endpoint `POST /api/skills/executions` zwraca HTTP `503` z `{ error: "Skills execution is disabled..." }`, gdy `settings.skillsEnabled === false` (`executor.ts:42-45`). Operatorzy mogą przełączyć master switch w **Settings → AI**.

### Example: install a custom skill

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

String `handlerCode` to **lookup nazwy handlera** — nie wykonywalny kod. Executor mapuje go przez `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Instalacje z marketplace zapisują tekst SKILL.md w tym polu jako dokumentację i kierują wykonanie przez wywołania narzędzi generowane przez model. Arbitrary source od użytkownika nie jest ewaluowany.

---

## MCP Tools

Cztery narzędzia MCP owijają powierzchnię skilli (`open-sse/mcp-server/tools/skillTools.ts`). Są auto-rejestrowane przy starcie serwera MCP.

| Tool                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `omniroute_skills_list`       | List skills, optional filters: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Enable/disable a skill by `skillId`                          |
| `omniroute_skills_execute`    | Execute a skill with an input payload                        |
| `omniroute_skills_executions` | Recent execution history (default 50, max 100)               |

Transport i przypisania scope: [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A Integration

`src/lib/skills/a2a.ts` eksportuje deskryptor skilla A2A `memory_aware_routing` oraz helper `registerA2ASkill(registry)`. Własne skille A2A żyją w `src/lib/a2a/skills/` i są dysponowane przez `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Pełny lifecycle tasków: [A2A-SERVER.md](./A2A-SERVER.md).

---

## Adding a New Built-in Skill

1. **Zdefiniuj handler** w `src/lib/skills/builtins.ts` (albo w pliku-siostrze pod `src/lib/skills/builtin/`). Sygnatura: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Ścieżka kodu w sandboxie?** Wywołaj `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Użyj `normalizeImage()` względem allowlisty.
3. **Ścieżka filesystem?** Zawsze przepuść przez `resolveWorkspacePath(input, context)` przed dotknięciem dysku.
4. **Wywołanie sieciowe?** Użyj `safeOutboundFetch` z `guard: "public-only"`; sanityzuj nagłówki przez `sanitizeHeaders()`.
5. **Zarejestruj**, dodając wpis do `builtinSkills` (albo wywołując w stylu `registerBrowserSkill(executor)` przy boot).
6. **Podłącz aliasy wbudowanych narzędzi** (opcjonalnie) w `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), jeśli upstream model emituje inną nazwę.
7. **Testy** w `src/lib/skills/__tests__/` (Vitest).

---

## Adding a Custom (Non-Builtin) Skill

1. Zarejestruj handler przy starcie procesu:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Wstaw skill przez `POST /api/skills/install` (pole `handlerCode` musi pasować do zarejestrowanej nazwy handlera).
3. Przełącz `mode` na `on` lub `auto` przez `PUT /api/skills/[id]`.

---

## Operational Tips

- **Master switch:** `settings.skillsEnabled = false` blokuje całe wykonanie i zwraca HTTP `503` na `/api/skills/executions`. Rejestr nadal się ładuje.
- **Zablokuj egress:** trzymaj `SKILLS_SANDBOX_NETWORK_ENABLED` nieustawione (domyślnie) dla w pełni air-gapped sandboxingu. Per-call `networkEnabled: true` i tak wymaga master gate.
- **Zezwól na konkretne obrazy:** ustaw `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, aby rozszerzyć allowlistę.
- **Audytuj wykonania:** `/dashboard/skills/executions` oraz `omniroute_skills_executions` odpytują `skill_executions`. Udane runy zawierają `durationMs`; nieudane — `errorMessage`.
- **Unieważnienie cache:** wywołaj `skillRegistry.invalidateCache()` po ręcznych edycjach DB; w przeciwnym razie poczekaj 60 s.
- **Anonimowy workspace:** gdy `apiKeyId` jest puste, wszystkie wywołania haszują do tego samego workspace `"anonymous"` — kod świadomy współdzielenia powinien zawsze przekazywać prawdziwy klucz.

---

## Execution Lifecycle (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) to **singleton**, który zarządza każdym wywołaniem skilla. Zrozumienie jego lifecycle jest krytyczne przy debugowaniu timeoutów, retry i stanu wykonania.

### The 5-Stage Lifecycle

```
   execute() called
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← queued, not yet started (DB row created)
  └──────┬──────┘
         │ start handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler invoked with timeout
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (no other path — killed by parent)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB row updated with status, output, durationMs
```

### Default Configuration

| Setting      | Default       | Configurable via                     |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Important**: Executor jest singletonem — wywołanie `setTimeout()` wpływa globalnie na wszystkie kolejne invocacje. Timeouty per-skill nie są obecnie wspierane; jeśli potrzebujesz różnych timeoutów per skill, uruchom osobne procesy albo zforkuj executor.

### Status Values

Z `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Queued, not yet started
  RUNNING = "running", // Handler invoked
  SUCCESS = "success", // Handler returned valid output
  ERROR = "error", // Handler threw an exception
  TIMEOUT = "timeout", // Exceeded the executor's timeout
}
```

> **Note**: Status `TIMEOUT` jest zdefiniowany w enum, ale **nie jest faktycznie zapisywany do DB** przez obecną implementację executora — timeouty pojawiają się jako `ERROR` z komunikatem `"Skill execution timed out"`. Enum statusu jest zarezerwowany na przyszłość.

### Inspecting Executions

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Get a specific execution by ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// List recent executions for an API key
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Count total executions
const total = skillExecutor.countExecutions("api-key-id");
```

### Retry Behavior

Ustawienie `maxRetries` jest przechowywane, ale **obecnie nieużywane** przez metodę `execute()` executora — wykonuje tylko jedną próbę. Wartość `maxRetries` jest wystawiona pod przyszłą implementację oraz dla hooków, które chcą ją odczytać.

Na razie retry muszą być zaimplementowane wewnątrz samego handlera skilla. Built-in
skille są rejestrowane względem executora (np. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` w `src/lib/skills/builtin/`); dowolny handler,
który zarejestrujesz, może owinąć własną pętlę retry:

```ts
// inside a skill handler
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode in Detail

Enum `SkillMode` (`src/lib/skills/types.ts`) kontroluje **kiedy i jak** skille są wywoływane:

```ts
enum SkillMode {
  AUTO = "auto", // LLM decides when to call the skill
  MANUAL = "manual", // Only invoked by explicit user request
  HYBRID = "hybrid", // AUTO scoring + manual override
}
```

> **Note**: Codebase definiuje `SkillMode` (AUTO/MANUAL/HYBRID), podczas gdy pole `Skill.mode` używa innego kształtu (`"on" | "off" | "auto"`). Są powiązane, ale nie identyczne — `SkillMode` dotyczy polityki executora, `Skill.mode` dotyczy enablement per skill.

### When to Use Each Mode

| Mode     | LLM behavior                                                                    | Use case                                        |
| -------- | ------------------------------------------------------------------------------- | ----------------------------------------------- |
| `AUTO`   | LLM może wywołać skill, gdy uzna to za potrzebne                                | Skille ogólnego użytku (odczyty plików, HTTP)   |
| `MANUAL` | LLM nie może wywołać skilla; tylko jawne wywołanie API `executeSkill` go odpala | Operacje wrażliwe (zapisy do bazy, płatności)   |
| `HYBRID` | LLM może zasugerować skill; użytkownik musi potwierdzić                         | Skille ze side effectami, ale nie niebezpieczne |

### AUTO Scoring

Gdy aktywny jest tryb `AUTO`, każdy kandydacki skill jest punktowany względem kontekstu
żądania przez `scoreAutoSkill()` w `src/lib/skills/injection.ts` — addytywny,
całkowitoliczbowy system punktów (dopasowanie nazwy skilla, overlap tokenów name/tag/description,
hinty background-reason, bonus/kara provider-hint). Top
`AUTO_MAX_SKILLS = 5` skilli z `score >= AUTO_MIN_SCORE = 3` jest wstrzykiwanych jako
wywoływalne narzędzia; remisy rozstrzyga `installCount`, potem nazwa. Pełna tabela punktów
jest w [**Tool Schema Generation → AUTO Scoring**](#auto-scoring) wcześniej w tym
dokumencie; nie ma progu float w stylu `0.6` ani scoringu w `registry.ts`.

---

## Built-in Skills Catalog

OmniRoute dostarcza wyselekcjonowany zestaw wbudowanych skilli w `src/lib/skills/builtin/`. Najczęstsze:

### Browser Automation Skill

Skill przeglądarki (`src/lib/skills/builtin/browser.ts`) zapewnia headless browser automation przez Playwright/Puppeteer. **Jest zaimplementowany, ale nie jest w domyślnym katalogu skilli** — aby go użyć, zainstaluj osobno plugin rozszerzenia przeglądarki.

```ts
// Enable in your config
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Always require explicit invocation
  allowedSkills: ["browser"],
  timeout: 60000, // 60s for page loads
  maxRetries: 1,
};
```

### Other Built-in Categories

| Category  | Skills                                      | Mode   |
| --------- | ------------------------------------------- | ------ |
| File I/O  | `file_read`, `file_write`                   | AUTO   |
| HTTP      | `http_request`                              | AUTO   |
| Search    | `web_search`                                | AUTO   |
| Code Exec | `eval_code` (sandboxed JavaScript/Python)   | HYBRID |
| System    | `execute_command` (sandboxed CLI execution) | MANUAL |

### Adding a Custom Skill

Jak dodać własny skill przez system pluginów: [Plugin SDK & Skills Integration](./PLUGIN_SDK.md).

---

## See Also

- [MCP-SERVER.md](./MCP-SERVER.md) — rejestracja narzędzi MCP i transporty
- [A2A-SERVER.md](./A2A-SERVER.md) — lifecycle tasków A2A i dispatch skilli
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — wprowadzenie dla użytkownika
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pipeline żądań i mapa komponentów
- Source: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tests: `src/lib/skills/__tests__/integration.test.ts`
