# Playground Studio (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **功能：** Playground Studio — 面向 `/dashboard/playground` 的统一 AI 测试工作区。
> **计划：** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **状态：** 已在 v3.8.6 中发布

---

## 概述

Playground Studio 将 `/dashboard/playground` 从简单的基于 Monaco 的编辑器转变为
功能完备的测试工作区。它使用 `PlaygroundStudio` 外壳替换旧版 `page.tsx`，并呈现四个标签页和一个共享配置面板。

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 对话] [⚖ 对比] [{} API] [🔧 构建]         142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {当前标签页内容}                        │ ─ 配置                    │
│                                          │ 端点      [chat ∨]        │
│                                          │ 模型      [gpt-5.4 ∨]     │
│                                          │ 系统提示  [文本区域]      │
│                                          │ 温度      ▕▕▔▔ 0.7        │
│                                          │ 预设 [▾ 加载][保存]       │
│                                          │ [✨ 改进提示词]           │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## 标签页

### 对话标签页

将 `ChatPlayground.tsx` 演进为支持多轮流式响应的工作台：

- 通过 `MarkdownMessage.tsx` 实现完整的 Markdown 渲染（代码块、表格、列表、链接）。
- 系统提示词来自共享的配置面板。
- 显示每条消息的 Token 数和成本（提示词 Token + 补全 Token）。
- 重新生成最后一条响应。
- 通过 SSE 流式传输向 `POST /v1/chat/completions` 发送请求。

### 对比标签页

代理服务的关键差异化功能：使用一个提示词在最多 **4 个模型上并行运行**。

- 最多 4 列，每列都独立从 `/v1/chat/completions` 接收流式响应。
- 使用 `+ 添加模型` 按钮（Cmd+K 快捷键）添加列。
- `全部运行 ▶` 通过 `Promise.all` 和每列独立的 `AbortController` 同时触发所有流。
- 全局 **全部取消** 会中止所有正在进行的流。
- 每列的 `ProviderMetrics` 实时显示 TTFT、TPS、Token 数和预估成本。
- 指标标记为 **“客户端估算”**（D12）——从收到第一个 SSE 数据块开始测量。

### API 标签页

为高级用户完整保留原始 Monaco 编辑器的全部功能（D14）：

- 10 个端点：聊天补全、补全、嵌入、图像、音频、语音、转录、内容审核、重排序、搜索。
- 多模态文件上传。
- SSE 流式传输并实时输出。
- 封装为 `ApiTab.tsx`（延迟加载，`ssr: false`）。

### 构建标签页

工具/函数调用和结构化输出 UI：

- `ToolsBuilder.tsx` — 添加/编辑/删除 `tools[]`，并为每个工具提供 JSON Schema 编辑器。
  通过 `ToolDefinitionSchema`（Zod）验证参数。
- `StructuredOutputEditor.tsx` — 切换 JSON 模式并提供 JSON Schema 编辑器。
  通过 `StructuredOutputSchema`（Zod）根据 Schema 验证响应。
- 向 `/v1/chat/completions` 发送包含 `tools[]` 和/或 `response_format` 的请求。

---

## 配置面板（共享）

`StudioConfigPane.tsx` — 始终可见，可折叠。

| 字段       | 组件                  | 说明                                                                   |
| ---------- | --------------------- | ---------------------------------------------------------------------- |
| 端点       | `<select>`            | 与 `PlaygroundEndpoint` 匹配的 10 个选项                               |
| 模型       | `<input>`             | 自由文本，例如 `openai/gpt-4o`                                         |
| 系统提示词 | `<textarea>`          | 应用于所有标签页                                                       |
| 参数       | `ParamSliders`        | temperature、max_tokens、top_p、presence/frequency penalty、seed、stop |
| 预设       | `PresetPicker`        | 加载/保存命名的配置快照（持久化到数据库）                              |
| 改进提示词 | `ImprovePromptButton` | 打开配额警告模态框，调用 `/api/playground/improve-prompt`              |

状态提升至 `PlaygroundStudio.tsx`，并向下传递给所有标签页。切换标签页时
会保留配置状态。

---

## 顶栏

`StudioTopBar.tsx`：

- 标签页切换器（role="tablist"）。
- `TokenCostCounter` — 实时显示 token（↑/↓）和预估成本。
- 导出代码按钮（`</>`）— 打开 `ExportCodeModal`。

---

## 导出代码模态框

`ExportCodeModal.tsx` 使用 `codeExport.ts`，根据当前 `PlaygroundState` 生成 curl / Python / TypeScript 代码片段。
API 密钥占位符始终为 `$OMNIROUTE_API_KEY`（D11）。

---

## 提示词改进器

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`：

1. 模态框警告“将消耗配额”。
2. 确认后，将 `{ system, prompt, model, tone }` 发送到该路由。
3. 该路由在内部使用 `promptImprover.META_SYSTEM_PROMPT` 调用 `/v1/chat/completions`。
4. 返回 `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`。
5. UI 更新配置面板中的系统提示词和聊天标签页中的用户提示词。

---

## 预设

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`：

- 存储在 SQLite 表 `playground_presets` 中（迁移文件 `084_playground_presets.sql`）。
- 每个预设存储：`name`、`endpoint`、`model`、`system`、`params_json`、`created_at`。
- CRUD：`GET` 获取列表、`POST` 创建、`GET /:id` 获取、`PUT /:id` 更新、`DELETE /:id` 删除。

---

## 流式指标

`useStreamMetrics.ts` + `streamMetrics.ts`（纯函数）：

- `start()` — 记录请求开始时间。
- `onFirstChunk()` — 记录 TTFT。
- `onChunk(n)` — 累计补全 token 数量。
- `finish(usage?)` — 计算最终指标：`ttftMs`、`totalMs`、`tps`、`tokensIn`、`tokensOut`、`costUsd`。
- 定价来自 `src/lib/playground/types.ts` 中的静态表（标记为“估算”——D13）。

---

## 后端路由

| 方法     | 路径                             | 处理逻辑                                                                            |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | 使用 Zod 验证 `ImprovePromptRequestSchema`；使用元提示词调用 `/v1/chat/completions` |
| `GET`    | `/api/playground/presets`        | 返回 `{ presets: PlaygroundPresetListItem[] }`                                      |
| `POST`   | `/api/playground/presets`        | 创建预设；验证 `PlaygroundPresetCreateSchema`                                       |
| `GET`    | `/api/playground/presets/:id`    | 返回一个预设，未找到则返回 404                                                      |
| `PUT`    | `/api/playground/presets/:id`    | 部分更新                                                                            |
| `DELETE` | `/api/playground/presets/:id`    | 返回 204                                                                            |

身份验证：可选（`REQUIRE_API_KEY`）。错误通过 `buildErrorBody()` 返回（硬性规则 #12）。

---

## 关键文件

| 路径                                                                       | 用途                                    |
| -------------------------------------------------------------------------- | --------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | 外壳组件、标签页协调器                  |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | 标签页 + 计数器 + 导出按钮              |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | 共享配置面板                            |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | 聊天工作台                              |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | 多模型对比                              |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco 编辑器（保留）                   |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | 工具 + 结构化输出                       |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | 代码导出模态框                          |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | 单个对比列                              |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | TTFT/TPS 显示                           |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | 客户端指标 Hook                         |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | 预设 CRUD Hook                          |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | 提示词改进 Hook                         |
| `src/lib/playground/codeExport.ts`                                         | curl/Python/TS 生成器（与搜索工具共享） |
| `src/lib/playground/promptImprover.ts`                                     | 元提示词构建器                          |
| `src/lib/playground/streamMetrics.ts`                                      | 纯指标计算                              |
| `src/lib/db/playgroundPresets.ts`                                          | 数据库模块（CRUD）                      |
| `src/app/api/playground/improve-prompt/route.ts`                           | 提示词改进 REST 路由                    |
| `src/app/api/playground/presets/route.ts`                                  | 预设列表 + 创建                         |
| `src/app/api/playground/presets/[id]/route.ts`                             | 预设获取/更新/删除                      |
| `src/lib/db/migrations/084_playground_presets.sql`                         | 数据库迁移                              |

---

## 故障排除

| 症状                               | 原因                     | 修复方法                                                              |
| ---------------------------------- | ------------------------ | --------------------------------------------------------------------- |
| Monaco 编辑器未在 API 选项卡中渲染 | SSR 加载了 Monaco        | 验证 `ApiTab` 是否使用了 `dynamic(..., { ssr: false })`               |
| 对比流按顺序触发                   | `Promise.all` 使用错误   | 必须在一次 `Promise.all` 调用中分派所有流启动操作                     |
| 指标显示 TTFT 为 `null`            | 未连接首个数据块处理程序 | 检查 SSE 读取器循环中是否调用了 `useStreamMetrics.onFirstChunk()`     |
| 预设未持久化                       | 未运行数据库迁移         | 运行 `npm run db:migrate` 或重启服务器（迁移会在启动时自动运行）      |
| 改进提示词时返回 502               | 配置中未设置模型         | 用户必须先在配置窗格中输入模型名称，然后再进行改进                    |
| 导出的代码显示 `MISSING_API_KEY`   | 未插入占位符             | `codeExport.ts` 始终使用 `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"` |

---

## 参考资料

- 总体计划：`_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- 功能计划：`_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- 代码导出：`src/lib/playground/codeExport.ts`
- 提示词改进器：`src/lib/playground/promptImprover.ts`
- Search Tools Studio：`docs/frameworks/SEARCH_TOOLS_STUDIO.md`
