# ZWS_README_V2 — developer 角色与「role param error」修复说明

## 一、为什么要修

### 现象

- 使用 **OpenAI Responses API**（`/v1/responses`，body 带 `input`）经 OmniRoute 转发到 **MiniMax** 等 OpenAI 兼容网关时，上游返回 **422**，报错文案为 **`role param error`**。

### 原因

- **Responses API** 允许并会下发消息角色 **`developer`**（与 `system` 语义接近，用于模型指令）。
- 多数 **OpenAI 兼容网关**（如 MiniMax）只接受 **`system` / `user` / `assistant` / `tool`**，不识别 `developer`，收到即报 422。
- 修复前，OmniRoute 对这类请求**未做角色转换**，直接把带 `developer` 的 body 转给上游，因此触发 `role param error`。

---

## 二、怎么修的

### 1. 后端：统一用「是否保留 developer」控制是否转换

- **`open-sse/services/roleNormalizer.ts`**
  - `normalizeDeveloperRole(messages, targetFormat, preserveDeveloperRole)`：
    - 当 **`targetFormat === "openai"` 且 `preserveDeveloperRole !== false`** 时：**保留** `developer`（不转换），兼容官方 OpenAI 等支持 developer 的后端。
    - 否则：将消息中的 **`developer` 改为 `system`**，避免 MiniMax 等报 422。
  - 即：**默认保留**（与「以前没有此功能」时的行为一致）；只有**显式关闭保留**（见下文「开关」）时才做 developer→system。

- **不在 translator 里硬编码**
  - **`open-sse/translator/request/openai-responses.ts`** 中 **不再** 在从 `input` 构建 `messages` 时写死 developer→system，保持 `messages.push({ role: toString(item.role), content })`。
  - 所有「是否转换 developer」由 **`normalizeRoles`** 根据 `preserveDeveloperRole` 统一处理。

- **Responses 路径补跑一遍 role 管道**
  - 在 **`open-sse/translator/index.ts`** 的 `translateRequest` 中：当 **`sourceFormat === OPENAI_RESPONSES`** 且已有 `result.messages` 时，在翻译完成后**再执行一次 `normalizeRoles`**，这样从 `input` 刚转出来的 `messages` 也会按开关做 developer→system，与 flag 一致。

- **三态与存储**
  - **`src/lib/db/models.ts`** 中 **`getModelPreserveOpenAIDeveloperRole(providerId, modelId)`** 返回 **`boolean | undefined`**：
    - **`undefined`**：未配置 → 路由侧视为「保留 developer」。
    - **`true`**：显式保留。
    - **`false`**：显式不保留（developer→system，修 MiniMax 422）。
  - 配置来源：**custom model 行** 或 **modelCompatOverrides**（无完整 custom 行时用 compat 存该模型的两项兼容选项）；**`mergeModelCompatOverride`** 可写入 **`preserveOpenAIDeveloperRole: false`**，便于「不保留」持久化。

- **chatCore**
  - 从 **`getModelPreserveOpenAIDeveloperRole`** 取值传给 **`translateRequest`** 的 `options.preserveDeveloperRole`，不再强制 `=== true`，从而支持 `undefined` 的默认保留语义。

### 2. 前端：兼容性入口与「不保留」开关

- **一个「兼容性」按钮 + 弹层**
  - 每个模型（内置、OpenRouter/兼容、自定义）行上有一个 **「兼容性」** 按钮；点击后弹出**不透明**下拉面板（白/深色背景 + 阴影），内含：
    - **工具 ID 9 位**：原有「将 tool call id 规范为 9 位」选项。
    - **不保留 developer 角色**：勾选 = 不保留 = 写入 **`preserveOpenAIDeveloperRole: false`**，路由时 developer→system；**默认不勾选** = 保留 = 与历史行为一致。
  - 弹层点击外部关闭；结构便于后续增加更多兼容项。

- **绑定关系**
  - 后端仍只存「是否保留」：`preserveOpenAIDeveloperRole`（true/false/未设置）。
  - 弹层内「不保留 developer 角色」开关：**勾选 ⟺ `preserveDeveloperRole === false`**，`onChange(checked) => onPreserveChange(!checked)`，不改变后端字段含义。

- **角标**
  - 当某模型为「不保留」时，在列表上显示短角标（如「不保留」），便于一眼看出该模型已开启 developer→system。

### 3. 文档与 i18n

- 新增/沿用 i18n：**兼容性** 按钮、**不保留 developer 角色** 选项、角标「不保留」等（中/英），见 `src/i18n/messages/`。

---

## 三、使用方式（如何避免 422）

- **默认**：不勾选「不保留 developer 角色」→ 保留 developer，行为与修复前一致。
- **遇到 MiniMax 等 422**：在该模型（或对应兼容节点下的模型）上点击 **「兼容性」**，勾选 **「不保留 developer 角色」** 并保存；之后该模型请求会做 developer→system，422 消失。
- 仅在使用**官方 OpenAI 且确实需要 developer 角色**时，再保持不勾选或显式保留。

---

## 四、当前范围与后续扩展（按协议区分兼容性）

### 当前实现仅针对 OpenAI 协议

- 本轮的「兼容性」配置（**工具 ID 9 位**、**不保留 developer 角色**）在实现上**只对 OpenAI 系协议生效**：请求经 OpenAI Chat Completions / Responses 格式转发时，才会应用这些选项。
- **同一个模型**可能被多种协议调用（例如同一物理模型既走 OpenAI 兼容端点，也走 Anthropic Messages、或其它网关），理想情况下**兼容性应按「协议」维度**配置，由用户为每个协议单独选择是否做 9 位 tool id、是否不保留 developer 等。
- **当前页面的「兼容性」入口没有标明协议**，容易让用户误以为这些选项对该模型的所有调用方式都生效；实际上只影响 **OpenAI 协议** 下的行为。

### 后续计划

- **按协议维护兼容性**：将兼容项（如 `normalizeToolCallId`、`preserveOpenAIDeveloperRole`）归属到「协议」维度（如 `openai`、`anthropic` 等），存储与 UI 均按协议展示与编辑，避免误导并支持多协议并存时的差异化配置。

---

## 五、涉及文件摘要

| 区域       | 文件                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| 角色转换   | `open-sse/services/roleNormalizer.ts`，`open-sse/translator/index.ts`，`open-sse/translator/request/openai-responses.ts` |
| 配置与读写 | `src/lib/db/models.ts`，`src/lib/localDb.ts`，`src/app/api/provider-models/route.ts`                                     |
| 请求管线   | `open-sse/handlers/chatCore.ts`                                                                                          |
| 前端 UI    | `src/app/(dashboard)/dashboard/providers/[id]/page.tsx`（兼容性按钮、弹层、不保留开关与角标）                            |
| 文案       | `src/i18n/messages/zh-CN.json`，`src/i18n/messages/en.json`                                                              |

以上即为「为什么修」与「怎么修」的说明；按 CONTRIBUTING 流程在分支上提交即可。
