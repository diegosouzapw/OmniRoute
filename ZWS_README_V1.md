# ZWS 版本修改说明 (V1)

本文档记录基于 OmniRoute 的定制修改：**日志 Response 内容展示**、**按模型配置 9 字符 Tool Call ID（Mistral 兼容）**，以及 **Key 相关问题与无法指定 Key 的现状说明**。

---

## 一、修改概述

| 功能 / 主题                          | 说明                                                                                                                                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Call Log Response 内容不再为空**   | 流式请求结束后，日志中「Response Payload」的 `choices[0].message.content` 能正确保存并展示 assistant 的完整回复内容。                                                                                    |
| **9 字符 Tool Call ID 按模型可配置** | 不再对所有请求强制使用 9 位 `[a-zA-Z0-9]` 的 tool call id；仅在「模型配置」中为该模型开启「Normalize Tool Call ID」时，才做 Mistral 风格规范化。                                                         |
| **Key 问题与无法指定 Key**           | 当前鉴权与日志对 Key 的处理方式；**请求无法通过参数指定使用哪一把 Key**，仅能通过请求头携带一把 Key（见下文）。**Key 下可配置 Allowed Connections**，限制该 Key 只能使用指定的 Provider 连接（见 2.3）。 |

---

## 二、具体修改内容

### 2.1 日志返回值 content 展示（流式）

**问题**：请求日志里 Response Payload 显示为 `"choices":[{"message":{"role":"assistant","content":""}}]`，实际返回内容为空。

**原因**：

- 之前只从**翻译后的** chunk（`translateResponse` 输出）里取 `choices[0].delta.content` 累积。
- 不同 provider 的响应格式和翻译结果结构不一致，部分情况下翻译后的 item 没有我们期望的 `delta.content` 路径，导致 `state.accumulatedContent` 一直为空。

**做法**：  
在**解析到每个上游 chunk（`parsed`）之后、调用 `translateResponse` 之前**，就按**上游格式**从 `parsed` 中累积内容到 `state.accumulatedContent`，实现「每来一块就更新一块」：

1. **OpenAI**：`parsed.choices[0].delta.content`（字符串或数组）、`reasoning_content`
2. **Claude**：`parsed.delta.text`、`parsed.delta.thinking`
3. **Gemini**：`parsed.candidates[0].content.parts[].text`
4. **通用兜底**：`parsed.delta`、`parsed.content`、`parsed.text` 为字符串时也拼接到 `accumulatedContent`

**实现注意**：content **仅从 `parsed` 单路累积**，不再从翻译后的 `item` 再累加，避免同一 chunk 在 parsed 与 translated 两处都加导致 call log 中内容重复。

**涉及文件**：

- `open-sse/utils/stream.ts`
  - 在 translate 模式的 `transform` 中，在「Track content length」段落内，对上述几种格式从 `parsed` 直接写入 `state.accumulatedContent`，并增加通用 fallback；翻译后的 item 循环内不再做 content 累积。
- `src/shared/components/RequestLoggerDetail.tsx`
  - 请求日志详情弹窗中 **Response Payload (返回)** 优先展示、**Request Payload (请求)** 其次，并加中文标题便于先看返回内容。

---

### 2.2 9 字符 Tool Call ID 按模型可配置（Mistral 兼容）

**问题**：

- Mistral 等要求 tool call id 为 9 位 `[a-zA-Z0-9]`，之前在 translator 里对所有请求统一做 9 字符规范化。
- 用户希望**只对部分模型**开启该行为，而不是全局生效。

**做法**：  
增加「按模型」的开关，仅当该模型在配置中开启「Normalize Tool Call ID」时，才对请求做 9 字符 id 规范化。

1. **数据层**
   - `src/lib/db/models.ts`
     - 自定义模型存储增加字段 `normalizeToolCallId`（boolean）。
     - `updateCustomModel(providerId, modelId, updates)` 支持传入 `normalizeToolCallId`。
     - 新增同步方法 `getModelNormalizeToolCallId(providerId, modelId)`：仅当该 provider 下该 model 为自定义模型且勾选了该选项时返回 `true`。

2. **请求链路**
   - `open-sse/translator/helpers/toolCallHelper.ts`
     - `ensureToolCallIds(body, options?)` 增加可选参数 `options.use9CharId`。
     - `use9CharId === true`：与原先一致，统一成 9 位 `[a-zA-Z0-9]` 并重写后续 tool 消息的 `tool_call_id`。
     - `use9CharId === false` 或未传：只保证 id 存在、修正 `type`/`arguments`，不改成 9 字符。
   - `open-sse/translator/index.ts`
     - `translateRequest(..., options?)` 增加可选参数 `options.normalizeToolCallId`，并传给两处 `ensureToolCallIds(result, { use9CharId })`。
   - `open-sse/handlers/chatCore.ts`
     - 在调用 `translateRequest` 前执行 `getModelNormalizeToolCallId(provider, model)`，将结果以 `normalizeToolCallId` 传入。

3. **API**
   - `PUT /api/provider-models` 的 body 支持可选字段 `normalizeToolCallId`（boolean），并写入自定义模型配置。
   - `src/shared/validation/schemas.ts`：`providerModelMutationSchema` 增加 `normalizeToolCallId: z.boolean().optional()`。
   - `src/app/api/provider-models/route.ts`：PUT 解析并传入 `updateCustomModel(..., { normalizeToolCallId })`。

4. **前端**
   - Dashboard → Providers → 某 Provider → 自定义模型列表：
     - 编辑某一模型时，增加复选框 **「Normalize Tool Call ID (9 chars, Mistral)」**，保存时随 `apiFormat`、`supportedEndpoints` 一并提交。
     - 列表中若该模型已开启，显示 **「ID×9」** 小标签。
   - `src/app/(dashboard)/dashboard/providers/[id]/page.tsx`：
     - 增加 `editingNormalizeToolCallId` 状态、在 `beginEdit`/`cancelEdit`/`saveEdit` 中读写，并在编辑区增加上述复选框与列表标签。

**涉及文件**：

- `src/lib/db/models.ts`
- `open-sse/translator/helpers/toolCallHelper.ts`
- `open-sse/translator/index.ts`
- `open-sse/handlers/chatCore.ts`
- `src/shared/validation/schemas.ts`
- `src/app/api/provider-models/route.ts`
- `src/app/(dashboard)/dashboard/providers/[id]/page.tsx`

---

### 2.3 Key 问题与无法指定 Key（当前行为与限制）

**Key 的当前行为**：

- 请求鉴权：从请求头读取 **Authorization**（Bearer）或 **x-api-key**，通过 `extractApiKey` 取出一把 API Key，校验后得到 `apiKeyInfo`（id、name、权限、计费等），并用于当次请求的权限与计费。
- 日志与脱敏：写入 call log 时，会对 request/response payload 做敏感字段脱敏（`src/lib/usage/callLogs.ts`）。凡字段名为 `api_key`、`apiKey`、`api-key`、`authorization`、`Authorization`、`x-api-key`、`X-Api-Key` 等均会被替换为 `[REDACTED]`，避免 Key 明文落库或展示。
- 日志中仍会保存 **api_key_id**、**api_key_name**（来自 `apiKeyInfo`），用于区分该条请求是由哪一把 Key 发起，便于排查与统计。

**无法指定 Key 的问题（已知限制）**：

- 当前**不支持**在请求中通过参数（如 query、body 或 header 里的 key id/name）指定「使用某一把 Key」。
- 服务端只认「请求头里实际携带的那一把 Key」：客户端必须在 **Authorization** 或 **x-api-key** 中传入**该 Key 的完整取值**，服务端据此校验并解析出对应 `apiKeyInfo`。
- 若在 Dashboard 中配置了多把 API Key，调用方无法在单次请求里说「用 key A 鉴权、用 key B 计费」或「用 id=xxx 的那把 key」；只能由调用方在发起请求前决定带哪一把，并把该 key 放进请求头。
- 若后续需要「按 key id/name 指定使用某把 Key」或「请求体里传 key 引用」，需在鉴权与路由层做扩展设计（未在本版本实现）。

**Key 下指定 Allowed Connections（已支持）**：

- 每把 API Key 可在 Dashboard 中配置 **Allowed Connections**（允许使用的连接 ID 列表）：在 **Dashboard → API Manager** 中编辑该 Key，在「Allowed Connections」区域勾选允许使用的 Provider 连接（对应各 Provider 下的 connection id）。
- 行为：当该 Key 的 `allowedConnections` 非空时，该 Key 发起的请求在选取 Provider 账号（connection）时**仅会从这些连接中挑选**；未在列表中的连接不会被该 Key 使用（多账号负载均衡、回退时也仅限这些连接）。
- 若未配置或列表为空，表示该 Key 可使用该 Provider 下所有可用连接（与原有行为一致）。
- 实现位置：`src/sse/services/auth.ts` 中 `getProviderCredentials(provider, excludeConnectionId, allowedConnections)` 会根据 `apiKeyInfo.allowedConnections` 过滤连接；chat 等入口在调用时传入 `apiKeyInfo?.allowedConnections ?? null`。

**涉及文件**：

- `src/sse/services/auth.ts`（`extractApiKey`、`isValidApiKey`、`getProviderCredentials` 的 `allowedConnections` 过滤）
- `src/sse/handlers/chat.ts`（鉴权与 `apiKeyInfo` 传递、将 `allowedConnections` 传入 credentials 选取）
- `src/lib/usage/callLogs.ts`（敏感字段脱敏、`api_key_id`/`api_key_name` 存储）
- `src/lib/db/apiKeys.ts`（`allowed_connections` 存储与读取）
- `src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx`（Allowed Connections 配置 UI）
- `src/app/api/keys/[id]/route.ts`（Key 更新 API，支持 `allowedConnections`）

---

## 三、遇到的问题与解决

| 问题                                                                                     | 处理方式                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response Payload 的 content 始终为空                                                     | 改为在**原始 chunk（parsed）**上按 provider 格式累积，而不是只依赖翻译后的 item 结构；并增加多格式 + 通用 fallback。                                                                  |
| 9 字符 id 希望对部分模型生效                                                             | 增加 DB 字段与 `getModelNormalizeToolCallId`，在 chatCore 根据当前 provider/model 查配置，仅当为 true 时传 `normalizeToolCallId` 给 translator。                                      |
| 未开启时仍需保证 id 存在                                                                 | `ensureToolCallIds` 在 `use9CharId === false` 时仍补全 id（无则用 `generateToolCallId()`），并保持 tool 消息的 `tool_call_id` 与 assistant 的 `tool_calls[].id` 一一对应。            |
| **Key 问题**：请求体/日志里 key 被脱敏、无法区分是哪把 key                               | 日志中已持久化 `api_key_id`、`api_key_name`，可根据这两项区分请求对应的 Key；request/response 中的 key 相关字段统一脱敏为 `[REDACTED]` 是预期行为，避免泄露。                         |
| **无法指定 Key**：希望请求时指定使用哪一把 Key（如按 id/name）                           | 当前为**已知限制**：仅支持在请求头中携带一把 Key 的完整取值（Authorization / x-api-key），不支持通过参数指定 key id 或 key name；多 Key 场景下由调用方自行选择要带哪一把。            |
| **Key 下指定某些 Allowed Connections**：希望某把 Key 只能使用部分 Provider 连接          | **已支持**：在 Dashboard → API Manager 中编辑该 Key，配置「Allowed Connections」为允许使用的连接 ID 列表；该 Key 的请求选 connection 时仅在此列表中选取，未在列表中的连接不会被使用。 |
| **流式 content 重复**：从 parsed 与 translated 两路都累积会导致 call log 中 content 重复 | **已修复**：仅从 `parsed` 单路累积，翻译后的 item 循环内不再做 content 累加，避免同一 chunk 被加两次。                                                                                |

---

## 四、使用说明

- **查看/保存完整回复内容**：流式请求结束后，在 Dashboard 请求日志中打开对应记录，Response Payload 中的 `choices[0].message.content` 会包含本次 assistant 的完整文本（含多格式与兜底累积）。
- **仅对某模型使用 9 字符 Tool Call ID**：
  1. 进入 Dashboard → Providers → 选择对应 Provider。
  2. 在「自定义模型」中新增或编辑该模型。
  3. 勾选 **「Normalize Tool Call ID (9 chars, Mistral)」** 并保存。
  4. 仅该模型在路由时会做 9 字符 id 规范化；其他模型保持原有 id 行为。
- **Key 的使用与限制**：
  - 请求时必须在 **Authorization**（Bearer）或 **x-api-key** 中传入一把有效 API Key 的完整取值，否则鉴权会失败。
  - 日志中可通过 **api_key_id**、**api_key_name** 区分是哪把 Key；请求体/响应体中的 key 相关字段会脱敏为 `[REDACTED]`。
  - 当前**无法**在请求中通过参数（如 key id/name）指定使用哪一把 Key，多 Key 时由调用方在请求头中携带要用的那一把。
- **Key 下指定 Allowed Connections**：
  - 进入 **Dashboard → API Manager**，编辑对应 API Key。
  - 在 **Allowed Connections** 区域选择该 Key 允许使用的 Provider 连接（多选）；保存后，该 Key 的请求只会使用这些连接，不会使用未勾选的连接。
  - 不配置或清空表示该 Key 可使用所有可用连接。

---

## 五、版本与范围

- **文档版本**：V1
- **修改范围**：Call Log 流式 response 内容累积、按模型配置 9 字符 tool call id；并记录 Key 的当前行为与「无法指定 Key」的已知限制（无代码改动）。
- **兼容**：未配置 `normalizeToolCallId` 的模型行为与修改前一致（不强制 9 字符 id）。
- **Key**：鉴权与脱敏逻辑未改；「请求无法指定使用哪一把 Key」为现状说明，后续若需支持按 key id/name 指定需单独扩展。
- **代码审查与修复**：对本次改动做了一轮影响检查。已修复「流式 content 从 parsed 与 translated 双路累积导致 call log 内容重复」的问题（改为仅从 parsed 单路累积）；其余改动（normalizeToolCallId、Key/Allowed Connections 文档化）未发现对现有行为产生负面影响的逻辑。
