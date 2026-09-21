# OmniRoute Agent Skills Catalog (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **事实来源：** `src/lib/agentSkills/`（目录、生成器、解析器）+ `skills/` 目录（SKILL.md 文件）
> **最后更新：** 2026-08-02 — v3.8.50

Agent Skills 是结构化的 SKILL.md 文件，用于指导外部智能体、MCP 客户端和 A2A 编排器如何使用 OmniRoute 的 REST API 和 CLI。与 [Omni Skills](./SKILLS.md)（在 OmniRoute 内部执行的 LLM 工具定义）不同，Agent Skills 是一个_文档目录_——可直接注入智能体上下文的静态 Markdown。

---

## 概述

该目录包含 **45 个 Agent Skills**（23 个 REST API 技能 + 21 个 CLI 技能 + 1 个配置工作流）。每个技能都包含：

- 一个**规范 ID**（`omni-auth`、`cli-serve` 等）
- 位于 `skills/{id}/SKILL.md` 的 **SKILL.md** 文件，其中包含 YAML 前置元数据（`name`、`description`）和内容丰富的 Markdown 正文
- 从 OpenAPI 规范和 CLI 注册表派生的 **REST 端点**（API 技能）或 **CLI 子命令**（CLI 技能）
- 用于实时获取的 **GitHub 原始文件 URL**：`https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## 架构

```
src/shared/constants/agentSkills.ts    — 包含 45 个条目的精选列表（名称/描述/类别/领域/图标）
src/lib/agentSkills/
  catalog.ts                           — getCatalog()、getSkillById()、filterCatalog()、computeCoverage()
  generator.ts                         — generateAgentSkills() 将 SKILL.md 写入 skills/{id}/
  openapiParser.ts                     — 从 docs/openapi.yaml 提取 REST 端点
  cliRegistryParser.ts                 — 从 bin/cli-registry.ts 提取 CLI 子命令
  schemas.ts                           — Zod 模式：AgentSkillSchema、SkillCoverageSchema 等
  types.ts                             — TypeScript 接口：AgentSkill、SkillCoverage 等

skills/{id}/SKILL.md                   — 生成并精选的 Markdown 文件（共 45 个）

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw（text/markdown）
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate（需要身份验证）

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 个 MCP 工具（列表、获取、覆盖率）
src/lib/a2a/skills/listCapabilities.ts        — A2A 技能：list-capabilities
```

---

## SKILL.md 格式

```markdown
---
name: omni-providers
description: "管理提供者连接：添加、测试、轮换和移除凭据。"
---

<!-- 由 src/lib/agentSkills/generator.ts 生成；手动编辑将被覆盖 -->

## 概述

...

## 身份验证

...

## 端点

...

<!-- skill:custom-start -->

## 自定义部分（重新生成时会保留）

...

<!-- skill:custom-end -->
```

生成器在重新生成时会保留 `<!-- skill:custom-start -->` 和 `<!-- skill:custom-end -->` 之间的内容。以下十个技能包含精选的自定义内容块：

`omni-mcp`、`omni-compression`、`cli-providers`、`cli-eval`、`omni-agents-a2a`、`omni-combos-routing`、`omni-auth`、`omni-resilience`、`omni-inference`、`cli-serve`。

---

## REST API 发现

| 端点                         | 方法 | 描述                                                      | 认证     |
| :--------------------------- | :--- | :-------------------------------------------------------- | :------- |
| `/api/agent-skills`          | GET  | 列出目录（可选 `?category=api\|cli\|config&area=<area>`） | 无       |
| `/api/agent-skills/{id}`     | GET  | 获取单个技能的元数据                                      | 无       |
| `/api/agent-skills/{id}/raw` | GET  | 以 `text/markdown` 格式获取 SKILL.md                      | 无       |
| `/api/agent-skills/coverage` | GET  | 覆盖率统计（存在多少个 SKILL.md 文件）                    | 无       |
| `/api/agent-skills/generate` | POST | 触发生成器（dryRun/prune/onlyIds）                        | 管理权限 |

示例 — 列出所有 API 技能：

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

示例 — 获取单个 SKILL.md：

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## MCP 发现

在 `read:catalog` 作用域下注册了三个 MCP 工具：

| 工具                              | 描述                                          |
| :-------------------------------- | :-------------------------------------------- |
| `omniroute_agent_skills_list`     | 列出技能（可选 `category` / `area` 筛选条件） |
| `omniroute_agent_skills_get`      | 按 `id` 获取某项技能的元数据和 SKILL.md       |
| `omniroute_agent_skills_coverage` | 覆盖率统计（API/CLI 已有数量/总数）           |

有关作用域连接和认证，请参阅 [MCP-SERVER.md](./MCP-SERVER.md)。

---

## A2A 发现

A2A 技能 `list-capabilities` 以 markdown 表格构件的形式返回完整的 45 项技能目录。外部编排器可以通过以下方式调用它：

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "skill": "list-capabilities",
    "messages": [{ "role": "user", "content": "List all capabilities" }]
  }
}
```

有关协议详情，请参阅 [A2A-SERVER.md](./A2A-SERVER.md)。

---

## 目录 — 45 个技能 ID

### API 技能（23）

| ID                     | 领域            | 入口点                             |
| :--------------------- | :-------------- | :--------------------------------- |
| `omni-auth`            | auth            | 认证和会话管理                     |
| `omni-providers`       | providers       | 提供者连接管理                     |
| `omni-models`          | models          | 模型目录和功能                     |
| `omni-combos-routing`  | combos-routing  | 组合路由策略                       |
| `omni-api-keys`        | api-keys        | API 密钥管理                       |
| `omni-usage-logs`      | usage-logs      | 使用量和成本日志                   |
| `omni-budget`          | budget          | 预算防护                           |
| `omni-settings`        | settings        | 全局设置                           |
| `omni-proxies`         | proxies         | 代理池管理                         |
| `omni-cache`           | cache           | 语义缓存和提示词缓存               |
| `omni-compression`     | compression     | 上下文压缩引擎                     |
| `omni-context-rtk`     | context-rtk     | RTK 压缩                           |
| `omni-resilience`      | resilience      | 断路器和冷却机制                   |
| `omni-cli-tools`       | cli-tools       | CLI 工具 REST 代理                 |
| `omni-tunnels`         | tunnels         | 隧道管理                           |
| `omni-sync-cloud`      | sync-cloud      | 云同步                             |
| `omni-db-backups`      | db-backups      | 数据库备份                         |
| `omni-webhooks`        | webhooks        | Webhook 事件分派器                 |
| `omni-mcp`             | mcp             | MCP 服务器（110 个工具，3 种传输） |
| `omni-agents-a2a`      | agents-a2a      | A2A 代理协议                       |
| `omni-version-manager` | version-manager | 版本和更新管理                     |
| `omni-inference`       | inference       | 直接推理/补全                      |

### CLI 技能（21）

| ID                    | 领域               | CLI 命令根              |
| :-------------------- | :----------------- | :---------------------- |
| `cli-serve`           | cli-serve          | `omniroute serve`       |
| `cli-health`          | cli-health         | `omniroute health`      |
| `cli-providers`       | cli-providers      | `omniroute providers`   |
| `cli-keys`            | cli-keys           | `omniroute keys`        |
| `cli-models`          | cli-models         | `omniroute models`      |
| `cli-chat`            | cli-chat           | `omniroute chat`        |
| `cli-routing`         | cli-routing        | `omniroute routing`     |
| `cli-resilience`      | cli-resilience     | `omniroute resilience`  |
| `cli-compression`     | cli-compression    | `omniroute compression` |
| `cli-contexts`        | cli-contexts       | `omniroute contexts`    |
| `cli-cost-usage`      | cli-cost-usage     | `omniroute cost`        |
| `cli-mcp`             | cli-mcp            | `omniroute mcp`         |
| `cli-a2a`             | cli-a2a            | `omniroute a2a`         |
| `cli-tunnel`          | cli-tunnel         | `omniroute tunnel`      |
| `cli-backup-sync`     | cli-backup-sync    | `omniroute backup`      |
| `cli-policy-audit`    | cli-policy-audit   | `omniroute policy`      |
| `cli-batches`         | cli-batches        | `omniroute batch`       |
| `cli-eval`            | cli-eval           | `omniroute eval`        |
| `cli-plugins-skills`  | cli-plugins-skills | `omniroute plugins`     |
| `cli-setup`           | cli-setup          | `omniroute setup`       |
| `cli-skill-collector` | cli-setup          | `omniroute skills`      |

### 配置工作流（1）

| ID                 | 区域             | 入口点               |
| :----------------- | :--------------- | :------------------- |
| `config-codex-cli` | config-codex-cli | Codex CLI 配置工作流 |

---

## 外部智能体如何使用技能

### 1. 通过 REST 发现

```bash
# 获取完整目录
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# 获取 SKILL.md 以注入上下文
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. 通过 MCP 发现

```typescript
// 在 Claude Desktop / Cursor MCP 客户端中：
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → AgentSkill 数组，每项都包含 rawUrl
```

### 3. 通过 A2A 发现

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table 是一个 markdown 表格，包含全部 45 个技能 ID 及其 rawUrl 列
```

### 4. 直接获取 GitHub 原始文件（无需服务器）

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## 生成器

生成器会读取精选目录、OpenAPI 规范和 CLI 注册表，并为每个条目写入 `skills/{id}/SKILL.md`：

```bash
# 预览（试运行，不写入）
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# 完整重新生成
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# 重新生成指定 ID
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

生成器响应是一个 `GeneratorReport`：

```json
{
  "generated": ["omni-providers", "cli-serve"],
  "unchanged": [],
  "pruned": [],
  "orphansDetected": [],
  "errors": []
}
```

---

## 覆盖率 API

```bash
curl "http://localhost:20128/api/agent-skills/coverage"
```

```json
{
  "api": { "have": 23, "total": 23 },
  "cli": { "have": 21, "total": 21 },
  "config": { "have": 1, "total": 1 },
  "totalSkills": 45,
  "generatedAt": "2026-08-02T00:00:00.000Z"
}
```

---

## 相关内容

- [SKILLS.md](./SKILLS.md) — Omni Skills 框架（LLM 工具注入 + 市场）
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP 工具目录（`omniroute_agent_skills_*` 工具）
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A 协议（`list-capabilities` 技能）
- `src/lib/agentSkills/` — 目录、生成器、解析器
- `skills/` — 生成的 SKILL.md 文件（45 个条目）
