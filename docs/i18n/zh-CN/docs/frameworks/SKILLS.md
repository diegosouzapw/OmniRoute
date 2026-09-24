# Skills Framework (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **事实来源：** `src/lib/skills/` 和 `src/app/api/skills/`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 提供了一个可扩展的 Skills 框架，使语言模型（以及操作员）能够组合可复用的能力——从读取文件系统和发送 HTTP 请求，到沙箱化代码执行和精选的市场技能。

技能是一个有版本且由模式定义的工作单元。OmniRoute 可以将技能作为工具定义注入出站请求，拦截模型返回的工具调用，运行匹配的处理程序，并将结果反馈给模型，以便对话继续进行。模型永远不会看到具体实现，只会看到工具接口。

---

## Agent Skills 与 Omni Skills

OmniRoute 提供两套不同但互补的技能系统：

| 维度       | **Omni Skills**（本文档）                            | **Agent Skills**                                                                           |
| :--------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| 用途       | LLM 工具注入 + 沙箱化执行                            | 供外部智能体发现和使用的 SKILL.md 目录                                                     |
| 事实来源   | `src/lib/skills/` + 市场                             | `src/lib/agentSkills/` + `skills/` 目录                                                    |
| 运行时模式 | 注入出站请求，并在工具调用事件发生时执行             | 静态 Markdown 目录 + REST/MCP/A2A 发现端点                                                 |
| 使用者     | OmniRoute 本身（组合路由、入站 LLM 调用）            | 外部智能体、MCP 客户端、A2A 编排器                                                         |
| 数量       | 可变（由市场驱动）                                   | 45 个目录条目（23 个 API + 21 个 CLI + 1 个配置）                                          |
| 格式       | 包含工具模式和处理程序的 `SkillDefinition`           | `SKILL.md` 前置元数据 + Markdown 正文                                                      |
| 发现方式   | `/api/skills/*` REST + `omniroute_skills_*` MCP 工具 | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP 工具 + A2A `list-capabilities` |

**Omni Skills** 是执行引擎——它们定义了当 LLM 调用工具时 OmniRoute _能够执行的操作_。

**Agent Skills** 是文档目录——它们通过结构化的 SKILL.md 文件向外部智能体说明 _如何使用_ OmniRoute 的 REST API 和 CLI，这些文件可以直接添加到智能体提示词中。

有关 Agent Skills 目录、生成器、MCP 工具和 A2A 技能的信息，请参阅 [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md)。

---

## 概念

### 技能来源

来自三个来源的技能共存于同一个注册表中：

1. **内置技能**（`src/lib/skills/builtins.ts`）——随 OmniRoute 一同提供，涵盖常见用例：
   - `file_read`、`file_write`——位于 `<DATA_DIR>/skills/workspaces/<hashed-key>/` 下、按 API 密钥隔离的沙箱工作区
   - `http_request`——通过 `safeOutboundFetch` 发送出站 HTTP 请求，并使用 `guard: "public-only"`
   - `web_search`——支持缓存的可插拔搜索提供者（`executeWebSearch`）
   - `eval_code`——使用 Docker 沙箱执行 `node` 或 `python`
   - `execute_command`——使用 Docker 沙箱执行 shell 命令
   - `browser`——由 Playwright 支持的脚手架，默认禁用（`builtin/browser.ts`）
2. **SkillsMP**（OmniRoute 市场）——从 `https://skillsmp.com/api/v1/skills/search` 获取。需要在设置中配置 `skillsmpApiKey`。
3. **SkillsSH**（`skills.sh` 社区目录）——从 `https://skills.sh/api/search` 获取。无需身份验证；SKILL.md 内容从 GitHub raw 拉取。

由单个“活动提供者”控制仪表板从哪个目录安装技能（`src/lib/skills/providerSettings.ts`）。可以在 **设置 → 记忆与技能** 下切换。默认值：`skillsmp`。

### 技能标识

内存注册表（`src/lib/skills/registry.ts`）中的技能以 `name@version` 为键。版本必须符合 semver（`^\d+\.\d+\.\d+$`）。`resolveVersion()` 支持 `^`、`~`、`>`、`>=`、`<`、`<=`、`==` 和精确匹配约束。

### 技能模式

每项技能都有一个运行时模式，用于控制其何时被注入：

| 模式   | 行为                                                                    |
| ------ | ----------------------------------------------------------------------- |
| `on`   | 始终作为工具定义注入                                                    |
| `off`  | 永不注入，也不可执行                                                    |
| `auto` | 根据传入请求进行评分；仅当分数 ≥ `AUTO_MIN_SCORE`（默认值为 3）时才注入 |

`auto` 是从市场安装的技能的默认模式。`enabled=true` 与 `mode="off"` 同时存在表示“已注册但未激活”——通过旧版列切换 `enabled` 时，也会同步更新 `mode`，以使较旧的代码路径保持一致（`src/app/api/skills/[id]/route.ts`）。

### 状态（执行）

技能执行记录在 `skill_executions` 表中，并具有以下状态（`src/lib/skills/types.ts`）：

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### 注册表缓存

`SkillRegistry` 是一个具有 60 秒 TTL 缓存的单例（`registry.ts:14`）。`loadFromDatabase()` 是幂等的，并通过 `pendingLoad` 对并发调用进行去重。任何写操作（`register`/`unregister`/`unregisterById`）都会使缓存失效。使用 `getSkillVersions(name)` 和 `resolveVersion(name, constraint)` 查询版本。

### 感知提供者的注入

`src/lib/skills/injection.ts` 中的 `injectSkills()` 是将已注册技能转换为特定于提供者的工具定义的入口点：

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

工具名称编码为 `name@version`，以便模型回调时，处理程序可以选择正确的版本。

### AUTO 评分

当 `mode="auto"` 时，会根据请求上下文对每个候选技能进行评分（`injection.ts` 中的 `scoreAutoSkill()`）：

| 信号                               | 分值        |
| ---------------------------------- | ----------- |
| 技能名称在上下文中逐字出现         | +6          |
| 每个与上下文词元匹配的名称词元     | +2          |
| 每个与上下文匹配的标签子字符串     | +3          |
| 每个与上下文匹配的描述词元         | +1          |
| 后台原因与名称词元匹配             | 每个词元 +2 |
| 后台原因与标签匹配                 | 每个词元 +2 |
| 标签中的提供者提示与请求提供者匹配 | +2 / −2     |

将注入得分 `score >= AUTO_MIN_SCORE = 3` 的前 `AUTO_MAX_SKILLS = 5` 个技能。得分相同时，先按 `installCount` 降序排序，再按名称字母顺序排序（`injection.ts:225-235`）。

### 工具调用拦截

上游返回工具调用响应后，聊天处理程序会调用 `src/lib/skills/interception.ts` 中的 `handleToolCallExecution()`：

1. `extractToolCalls()` 读取特定于提供者的数据结构（OpenAI 的 `tool_calls` / Responses 的 `function_call`、Anthropic 的 `tool_use`、Gemini 的 `functionCalls`）。
2. 首先解析内置工具别名（例如 `omniroute_web_search` → `web_search`）。内置处理程序以内联方式运行。
3. 其他所有调用均通过 `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` 路由。
4. 结果会被拼接回响应中——根据具体情况，作为 `tool_results`、`function_call_output` 项，或 Anthropic 的 `tool_result` 块。

可以将执行上下文中的 `customSkillExecutionEnabled` 设置为 `false`，以仅允许内置拦截（供明确禁用用户定义处理程序的请求路径使用）。

---

## Docker 沙箱

非内置代码路径（`eval_code`、`execute_command`）通过 `SandboxRunner`（`src/lib/skills/sandbox.ts`）在 Docker 内运行。每个容器启动时均使用：

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only（当 readOnly=true 时）
```

默认值（`SandboxRunner.DEFAULT_CONFIG`）：

| 字段             | 默认值           | 说明                                              |
| ---------------- | ---------------- | ------------------------------------------------- |
| `cpuLimit`       | 100（= 0.1 CPU） | 传递给 `--cpus` 前除以 1000                       |
| `memoryLimit`    | 256 MB           | 硬限制                                            |
| `timeout`        | 30000 ms         | 通过 `SIGTERM` + `docker kill` 进行软终止         |
| `networkEnabled` | `false`          | 转换为 `--network none`                           |
| `readOnly`       | `true`           | 根文件系统为只读；`/tmp` 和 `/workspace` 为 tmpfs |

提供了用于关闭的 `SandboxRunner.kill(id)` 和 `killAll()`；正在运行的容器记录在 `runningContainers: Map<string, ChildProcess>` 中。

### 沙箱环境变量

通过 `src/lib/skills/builtins.ts` 中的 `process.env` 配置：

| 环境变量                          | 默认值            | 用途                                                        |
| --------------------------------- | ----------------- | ----------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576`（1 MB） | 限制 `file_read` 和 `file_write` 的大小                     |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`          | 限制 `http_request` 响应正文的大小                          |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`          | 限制返回给调用方的 stdout/stderr 字符数                     |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`           | 沙箱命令的默认超时时间；上限为 60 s                         |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`           | 出站访问的总开关。设置为 `1` 或 `true` 可允许按调用选择启用 |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | （见下文）        | 以逗号分隔的 Docker 镜像允许列表                            |

默认允许的镜像：`alpine:3.20`、`node:22-alpine`、`python:3.12-alpine`。通过 `SKILLS_ALLOWED_SANDBOX_IMAGES` 添加的任何镜像都会与默认列表合并；未知镜像会被 `normalizeImage()` 拒绝。

> 注意：不存在单独的 `SKILLS_EXECUTION_TIMEOUT_MS` 环境变量。非沙箱处理程序的超时时间在 `SkillExecutor`（`executor.ts:13`）中硬编码为 30 s，但可在运行时通过 `skillExecutor.setTimeout(ms)` 覆盖。

### 工作区隔离

`file_read` 和 `file_write` 会将每个路径解析为相对于每个 API 密钥专属工作区 `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` 的路径。在执行任何磁盘 I/O 之前，都会拒绝路径遍历（`..`）和禁止的路径段（`.env`、`.git`、`.ssh`、`.omniroute`、`.codex`、`secrets`）。

### HTTP 加固

`http_request`（`builtins.ts:257`）：

- 方法允许列表：`GET, HEAD, POST, PUT, PATCH, DELETE`
- 禁止的出站请求头：`host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- 禁用重定向（`allowRedirect: false`）
- 通过 `safeOutboundFetch` 路由，并使用 `guard: "public-only"`（阻止私有/环回地址范围）
- 响应在达到 `SKILLS_MAX_HTTP_RESPONSE_BYTES` 时截断；客户端会看到 `truncated: true`

---

## 混合执行器（预览）

`src/lib/skills/hybrid.ts` 定义了一个 `HybridExecutor`，它会针对每次调用在 `direct`（进程内）和 `sandbox` 执行之间进行选择，并提供在发生超时/内存错误时通过 `autoUpgrade` 重试的路径。当前接入的 `directExecutor` / `sandboxRunner` 实现仍是存根（`executeDirect`、`executeInSandbox` 返回占位对象）——请将此模块视为一项仍在构建中的契约。实际执行仍通过 `skillExecutor` + `SandboxRunner` 进行。

---

## 存储

架构位于两个迁移文件中：

- `src/lib/db/migrations/016_create_skills.sql` — 基础 `skills` 和 `skill_executions` 表，并为 `(api_key_id, name)` 和 `(skill_id, status, created_at)` 建立索引。
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — 向 `skills` 添加 `mode`、`source_provider`、`tags`（JSON）和 `install_count`。

`skill_executions.status` 在数据库级别受到约束：`CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`。

---

## REST API

所有端点均位于 `src/app/api/skills/` 下。管理端点（`/api/skills`、`/api/skills/[id]`、`/api/skills/install`）需要通过 `requireManagementAuth()` 进行**管理身份验证**。市场/安装流程使用更轻量的 `isAuthenticated()`（会话或 API 密钥）。

| 端点 | 方法 | 用途 |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | 列出已注册的技能。支持 `?q=`、`?mode=on                                 | off | auto`、`?source=skillsmp | skillssh | local`、分页 |
| `/api/skills/[id]` | PUT | 更新 `enabled` 或 `mode` |
| `/api/skills/[id]` | DELETE | 按 id 注销 |
| `/api/skills/install` | POST | 安装自定义技能（处理程序代码 + 架构） |
| `/api/skills/marketplace` | GET | 搜索 SkillsMP 目录（当 `q` 为空时返回默认热门项目） |
| `/api/skills/marketplace/install` | POST | 安装 SkillsMP 技能（要求活动提供者 = `skillsmp`） |
| `/api/skills/skillssh` | GET | 搜索 skills.sh 目录（`?q=&limit=`，上限为 100） |
| `/api/skills/skillssh/install` | POST | 安装 skills.sh 技能（要求活动提供者 = `skillssh`） |
| `/api/skills/executions` | GET | 分页执行历史记录（`?apiKeyId=`） |
| `/api/skills/executions` | POST | 临时执行已注册的技能 |

当 `settings.skillsEnabled === false` 时，`POST /api/skills/executions` 端点会返回 HTTP `503` 和 `{ error: "Skills execution is disabled..." }`（`executor.ts:42-45`）。操作员可以在**设置 → AI** 中切换总开关。

### 示例：安装自定义技能

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

`handlerCode` 字符串是一个**处理程序名称查找值**，而不是可执行代码。执行器通过 `skillExecutor.registerHandler(name, fn)`（`executor.ts:25`）映射它。市场安装会将 SKILL.md 文本作为文档存储在此字段中，并通过模型生成的工具调用来路由执行。系统不会对用户任意提供的源代码执行 eval。

## MCP 工具

四个 MCP 工具封装了技能接口（`open-sse/mcp-server/tools/skillTools.ts`）。它们会在 MCP 服务器启动时自动注册。

| 工具                          | 说明                                                  |
| ----------------------------- | ----------------------------------------------------- |
| `omniroute_skills_list`       | 列出技能，可选筛选条件：`apiKeyId`、`name`、`enabled` |
| `omniroute_skills_enable`     | 通过 `skillId` 启用/禁用技能                          |
| `omniroute_skills_execute`    | 使用输入载荷执行技能                                  |
| `omniroute_skills_executions` | 最近的执行历史记录（默认 50 条，最多 100 条）         |

有关传输设置和作用域分配，请参阅 [MCP-SERVER.md](./MCP-SERVER.md)。

---

## A2A 集成

`src/lib/skills/a2a.ts` 导出 `memory_aware_routing` A2A 技能描述符和 `registerA2ASkill(registry)` 辅助函数。自定义 A2A 技能位于 `src/lib/a2a/skills/` 中，并通过 `A2A_SKILL_HANDLERS`（`src/lib/a2a/taskExecution.ts`）进行分派。有关完整的任务生命周期，请参阅 [A2A-SERVER.md](./A2A-SERVER.md)。

---

## 添加新的内置技能

1. **定义处理程序**：在 `src/lib/skills/builtins.ts`（或 `src/lib/skills/builtin/` 下的同级文件）中定义。签名：`(input, { apiKeyId, sessionId }) => Promise<output>`。
2. **需要沙箱化的代码路径？** 调用 `sandboxRunner.run(image, command, env, sandboxConfig({...}))`。使用 `normalizeImage()` 对照允许列表进行检查。
3. **需要访问文件系统路径？** 在操作磁盘之前，始终通过 `resolveWorkspacePath(input, context)` 处理路径。
4. **需要进行网络调用？** 使用带有 `guard: "public-only"` 的 `safeOutboundFetch`；通过 `sanitizeHeaders()` 清理请求头。
5. **注册**：将条目添加到 `builtinSkills`（或在启动时调用 `registerBrowserSkill(executor)` 风格的函数）。
6. **关联内置工具别名**（可选）：如果上游模型生成了不同的名称，请在 `BUILTIN_TOOL_ALIASES`（`interception.ts:23`）中配置。
7. **测试**：在 `src/lib/skills/__tests__/` 中编写（Vitest）。

---

## 添加自定义（非内置）技能

1. 在进程启动时注册处理程序：
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. 通过 `POST /api/skills/install` 插入技能（`handlerCode` 字段必须与已注册的处理程序名称一致）。
3. 通过 `PUT /api/skills/[id]` 将 `mode` 切换为 `on` 或 `auto`。

---

## 运维提示

- **总开关：** `settings.skillsEnabled = false` 会阻止所有执行，并使 `/api/skills/executions` 返回 HTTP `503`。注册表仍会继续加载。
- **限制出站访问：** 保持 `SKILLS_SANDBOX_NETWORK_ENABLED` 未设置（默认），以实现完全隔离网络的沙箱。每次调用设置 `networkEnabled: true` 时，仍需通过总开关。
- **允许特定镜像：** 设置 `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` 以扩展允许列表。
- **审计执行记录：** `/dashboard/skills/executions` 和 `omniroute_skills_executions` 都会查询 `skill_executions`。成功运行的记录包含 `durationMs`；失败记录包含 `errorMessage`。
- **缓存失效：** 手动编辑数据库后调用 `skillRegistry.invalidateCache()`；否则需等待 60 秒。
- **匿名工作区：** 当 `apiKeyId` 为空时，所有调用都会哈希到同一个 `"anonymous"` 工作区——涉及共享感知的代码应始终传入真实密钥。

---

## 执行生命周期 (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) 是一个管理每次技能调用的**单例**。了解其生命周期对于调试超时、重试和执行状态至关重要。

### 5 阶段生命周期

```
   execute() 被调用
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← 已排队，尚未开始（已创建数据库行）
  └──────┬──────┘
         │ 启动处理器
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← 已调用处理器并设置超时
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   （没有其他路径——由父进程终止）
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   使用状态、输出和 durationMs 更新数据库行
```

### 默认配置

| 设置         | 默认值         | 配置方式                             |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30秒) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **重要**：执行器是单例——调用 `setTimeout()` 会在全局范围内影响之后的所有调用。目前不支持针对单个技能设置超时；如果不同技能需要不同的超时时间，请提交独立进程或派生执行器。

### 状态值

来自 `src/lib/skills/types.ts`：

```ts
enum SkillStatus {
  PENDING = "pending", // 已排队，尚未开始
  RUNNING = "running", // 已调用处理器
  SUCCESS = "success", // 处理器返回了有效输出
  ERROR = "error", // 处理器抛出了异常
  TIMEOUT = "timeout", // 超过了执行器的超时时间
}
```

> **注意**：`TIMEOUT` 状态已在枚举中定义，但当前执行器实现**实际上不会将其写入数据库**——超时会显示为 `ERROR`，并带有消息 `"Skill execution timed out"`。该状态枚举保留供将来使用。

### 检查执行记录

```ts
import { skillExecutor } from "omniroute/skills/executor";

// 根据 ID 获取特定执行记录
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// 列出某个 API 密钥最近的执行记录
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// 统计执行总数
const total = skillExecutor.countExecutions("api-key-id");
```

### 重试行为

`maxRetries` 设置会被存储，但执行器的 `execute()` 方法**目前并未使用它**——该方法只会执行一次尝试。公开 `maxRetries` 值是为了未来实现相关功能，以及供需要读取该值的钩子使用。

目前，重试必须在技能处理器内部实现。内置技能会注册到执行器（例如 `src/lib/skills/builtin/` 中的 `registerBuiltinSkills(executor)` / `registerBrowserSkill(executor)`）；你注册的任何处理器都可以封装自己的重试循环：

```ts
// 在技能处理器内部
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

## SkillMode 详解

`SkillMode` 枚举（`src/lib/skills/types.ts`）控制技能在**何时以及如何**被调用：

```ts
enum SkillMode {
  AUTO = "auto", // 由 LLM 决定何时调用该技能
  MANUAL = "manual", // 仅在用户明确请求时调用
  HYBRID = "hybrid", // AUTO 评分 + 手动覆盖
}
```

> **注意**：代码库定义了 `SkillMode`（AUTO/MANUAL/HYBRID），而 `Skill.mode` 字段使用不同的形式（`"on" | "off" | "auto"`）。它们彼此相关但并不相同——`SkillMode` 用于执行器策略，`Skill.mode` 用于控制各个技能是否启用。

### 各模式的适用场景

| 模式     | LLM 行为                                                     | 使用场景                        |
| -------- | ------------------------------------------------------------ | ------------------------------- |
| `AUTO`   | LLM 可在认为有必要时调用该技能                               | 通用技能（文件读取、HTTP 请求） |
| `MANUAL` | LLM 无法调用该技能；仅显式调用 `executeSkill` API 时才会触发 | 敏感操作（数据库写入、支付）    |
| `HYBRID` | LLM 可以建议使用该技能；用户必须确认                         | 具有副作用但并不危险的技能      |

### AUTO 评分

启用 `AUTO` 模式时，`src/lib/skills/injection.ts` 中的 `scoreAutoSkill()` 会根据请求
上下文对每个候选技能进行评分——采用累加式整数计分系统（技能名称匹配、名称/标签/描述中的词元重叠、
后台原因提示、提供者提示加分/减分）。得分最高且满足 `score >= AUTO_MIN_SCORE = 3` 的
`AUTO_MAX_SKILLS = 5` 个技能会被注入为可调用工具；得分相同时，先按 `installCount`、再按名称决定顺序。
完整的分值表请参阅本文档前面的
[**工具架构生成 → AUTO 评分**](#auto-scoring)；这里不存在类似浮点数 `0.6` 的阈值，
`registry.ts` 中也不存在评分逻辑。

---

## 内置技能目录

OmniRoute 在 `src/lib/skills/builtin/` 中提供了一组精心筛选的内置技能。最常用的包括：

### 浏览器自动化技能

浏览器技能（`src/lib/skills/builtin/browser.ts`）通过 Playwright/Puppeteer 提供无头浏览器自动化。**该技能已实现，但未包含在默认技能目录中**——如需使用，请单独安装浏览器扩展插件。

```ts
// 在配置中启用
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // 始终要求显式调用
  allowedSkills: ["browser"],
  timeout: 60000, // 页面加载超时时间为 60 秒
  maxRetries: 1,
};
```

### 其他内置类别

| 类别     | 技能                                    | 模式   |
| -------- | --------------------------------------- | ------ |
| 文件 I/O | `file_read`、`file_write`               | AUTO   |
| HTTP     | `http_request`                          | AUTO   |
| 搜索     | `web_search`                            | AUTO   |
| 代码执行 | `eval_code`（沙箱化 JavaScript/Python） | HYBRID |
| 系统     | `execute_command`（沙箱化 CLI 执行）    | MANUAL |

### 添加自定义技能

有关如何通过插件系统添加自定义技能，请参阅 [Plugin SDK 与技能集成](./PLUGIN_SDK.md)。

---

## 另请参阅

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP 工具注册与传输方式
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A 任务生命周期与技能分派
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — 面向用户的介绍
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 请求管道与组件映射
- 源代码：`src/lib/skills/`、`src/app/api/skills/`、`open-sse/mcp-server/tools/skillTools.ts`
- 测试：`src/lib/skills/__tests__/integration.test.ts`
