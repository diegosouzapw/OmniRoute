# ZWS_README_V5 — 按协议配置模型兼容性 + 前端性能优化

V4 内容（HMR 泄漏修复、Edge 警告消除、测试稳定性）已完成；V5 在 V4 基础上实现**按协议维度配置模型兼容性**，新增前端查找性能优化与类型安全改进。

---

## 一、如何发现问题

### 现象

- 同一模型被 **OpenAI Chat Completions**、**OpenAI Responses API**、**Anthropic Messages** 三种客户端请求形态调用时，V2 的兼容性开关（工具 ID 9 位、不保留 developer 角色）是**全局生效**的——无法为不同协议设置不同的兼容策略。
- 例如：用户希望 OpenAI Responses API 请求时不保留 developer 角色（MiniMax 422 修复），但 OpenAI Chat Completions 请求时保留。V2 下只能二选一。
- 前端兼容性弹层未标明当前配置对应哪种协议，容易误导。
- 前端组件中 `Array.find()` 在每次渲染时对 customModels 和 modelCompatOverrides 做 O(n) 线性扫描，模型数量多时存在不必要的性能开销。
- `ModelCompatPatch` 类型定义与运行时逻辑不一致：`preserveOpenAIDeveloperRole` 字段需要支持 `null`（表示取消设置/恢复默认），但类型仅允许 `boolean`。

### 排查过程

1. **需求分析**：梳理 `detectFormat(body)` 返回的三种协议键（`openai`、`openai-responses`、`claude`），确认每种协议对 developer 角色和 tool call ID 的需求不同。
2. **数据模型设计**：在现有 `normalizeToolCallId` / `preserveOpenAIDeveloperRole` 顶层字段基础上，设计 `compatByProtocol` 嵌套结构，按协议键细分。
3. **构建问题**：客户端 `"use client"` 组件直接从 `@/lib/localDb` 引入常量时，间接拉入了 `node:crypto`（经由 `db/proxies.ts`），触发 Webpack `UnhandledSchemeError`。需将常量拆到 `shared/` 层。
4. **前端性能**：通过 React DevTools 和代码审计发现 `effectiveNormalizeForProtocol` 等函数每次调用都对数组做 `find()`，在渲染列表时存在 O(n²) 的隐患。

---

## 二、根因分析

### 根因 1（P0）：兼容选项无协议维度

V2 的 `normalizeToolCallId` / `preserveOpenAIDeveloperRole` 存储在模型级别的顶层字段，无法区分请求来源协议。`chatCore.ts` 中的 getter 函数只接收 `(providerId, modelId)` 两个参数，不感知当前请求的 `sourceFormat`。

**影响**：跨协议场景下用户只能设置一个全局值，无法精确控制。

### 根因 2（P1）：客户端构建拉入 Node.js 模块

`page.tsx`（"use client"）→ `@/lib/localDb` → `db/proxies.ts` → `import { randomUUID } from "node:crypto"`

Webpack 无法处理 `node:` URI scheme，报 `UnhandledSchemeError`。虽然 V4 已将 `node:crypto` → `crypto` 修复了 `proxies.ts`，但 `localDb.ts` 的 barrel export 链仍然存在风险——客户端组件不应引入任何可能传递到 Node.js 模块的路径。

### 根因 3（P2）：前端查找性能

`effectiveNormalizeForProtocol`、`effectivePreserveForProtocol`、`anyNormalizeCompatBadge`、`anyNoPreserveCompatBadge` 四个函数每次调用都使用 `Array.find()` 在 `customModels` 和 `modelCompatOverrides` 数组中查找目标模型。在模型列表渲染时，每个模型行会调用多次这些函数，导致 O(n × m) 的查找开销（n = 模型数，m = 每行调用次数）。

### 根因 4（P2）：类型定义与运行时不一致

```typescript
// V3 暂存区版本（有问题）
export type ModelCompatPatch = Partial<
  Pick<
    ModelCompatOverride,
    "normalizeToolCallId" | "preserveOpenAIDeveloperRole" | "compatByProtocol"
  >
>;
```

`ModelCompatOverride.preserveOpenAIDeveloperRole` 类型为 `boolean | undefined`，但 `mergeModelCompatOverride()` 内部有 `=== null` 判断（用于取消设置/恢复默认），类型层面无法覆盖。

---

## 三、修复方案

### 修复 1：`compatByProtocol` 存储与读取（models.ts）

**新增数据结构**：

```typescript
type CompatByProtocolMap = Partial<Record<ModelCompatProtocolKey, ModelCompatPerProtocol>>;

export type ModelCompatOverride = {
  id: string;
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  compatByProtocol?: CompatByProtocolMap; // 新增
};
```

**读取优先级链**（适用于 `getModelNormalizeToolCallId` 和 `getModelPreserveOpenAIDeveloperRole`）：

```
compatByProtocol[sourceFormat].field  →  顶层 field  →  默认值
```

1. 若 `sourceFormat` 属于已知协议键（`openai` / `openai-responses` / `claude`），且 `compatByProtocol[sourceFormat]` 中存在目标字段，使用该值。
2. 否则回退到顶层字段。
3. 顶层字段也不存在时使用默认值（normalizeToolCallId=false，preserveOpenAIDeveloperRole=undefined）。

**深度合并逻辑** `deepMergeCompatByProtocol()`：

- 对每个协议键，逐字段合并而非覆盖。
- `normalizeToolCallId=false` 时删除该字段（不存储 false，减少冗余）。
- 合并后若整个协议条目为空对象，删除该协议条目。
- 协议键通过 `isCompatProtocolKey()` 白名单校验，拒绝未知键。

**Getter 签名扩展**（向后兼容，第三参数可选）：

```typescript
export function getModelNormalizeToolCallId(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): boolean;

export function getModelPreserveOpenAIDeveloperRole(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): boolean | undefined;
```

**优点**：

- 完全向后兼容：无 `sourceFormat` 参数时行为与 V2 完全一致。
- 协议键白名单校验防止存储污染。
- 深度合并保留未变更协议的配置。

**缺点/注意**：

- JSON 存储体积略增（每个模型最多增加 3 个协议条目）。
- 新增 ~80 行 TypeScript 代码。

### 修复 2：请求管线传入 sourceFormat（chatCore.ts）

```typescript
const normalizeToolCallId = getModelNormalizeToolCallId(
  provider || "",
  model || "",
  sourceFormat // 新增第三参
);
const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
  provider || "",
  model || "",
  sourceFormat // 新增第三参
);
```

`sourceFormat` 由已有的 `detectFormat(body)` 返回，无需新增检测逻辑。

**优点**：

- 改动仅 2 行，精准传参。
- 不影响其他 handler（embeddings、imageGeneration 等不涉及 developer 角色和 tool call ID）。

### 修复 3：API 路由支持 compatByProtocol（route.ts）

**PUT 请求体扩展**：

- 解构 `compatByProtocol` 并传入 `updateCustomModel()`。
- `compatOnly` 判断扩展：仅含 `provider` + `modelId` + 兼容字段时，走 `mergeModelCompatOverride()` 路径。
- 使用 `ModelCompatPatch` 类型替代行内类型定义，统一类型来源。

**Zod 校验 schema**：

```typescript
const modelCompatPerProtocolSchema = z.object({
  normalizeToolCallId: z.boolean().optional(),
  preserveOpenAIDeveloperRole: z.boolean().optional(),
}).strict();  // strict: 拒绝额外字段

compatByProtocol: z
  .record(z.enum(["openai", "openai-responses", "claude"]), modelCompatPerProtocolSchema)
  .optional(),
```

**优点**：

- `.strict()` 防止客户端注入额外字段。
- `z.enum()` 限定协议键，与后端白名单一致。
- 仅传 `compatByProtocol` 即可更新，前端无需拼装完整模型对象。

### 修复 4：客户端安全常量拆分（modelCompat.ts）

**新增** `src/shared/constants/modelCompat.ts`：

```typescript
export const MODEL_COMPAT_PROTOCOL_KEYS = ["openai", "openai-responses", "claude"] as const;
export type ModelCompatProtocolKey = (typeof MODEL_COMPAT_PROTOCOL_KEYS)[number];
```

- 不依赖 Node.js / DB 代码，客户端组件可安全引入。
- `models.ts` 从此模块引入并再导出。
- `localDb.ts` 新增 `ModelCompatPatch` 类型导出（供 route.ts 使用），不导出协议常量。
- `page.tsx` 改为从 `@/shared/constants/modelCompat` 引入。

**优点**：

- 彻底切断客户端 → localDb → db → proxies → node:crypto 的依赖链。
- 协议键定义单一来源（Single Source of Truth）。

### 修复 5：前端协议选择器与按协议解析（page.tsx）

**ModelCompatPopover 重构**：

- 新增协议下拉选择器（`<select>`），可选 OpenAI Chat / OpenAI Responses / Anthropic Messages。
- 两个开关（工具 ID 9 位、不保留 developer）**针对选中协议**生效。
- 选择 Claude 协议时隐藏 developer 角色开关（developer 仅对 OpenAI 系有意义）。
- 保存时以 `{ compatByProtocol: { [protocol]: payload } }` 形式提交，后端按协议合并。
- 深色模式适配：下拉框使用 `bg-white dark:bg-zinc-800`、`text-zinc-900 dark:text-zinc-100`。

**Props 接口重构**：

旧接口（4 个独立值/回调）：

```typescript
(normalizeToolCallId, preserveDeveloperRole, onNormalizeChange, onPreserveChange);
```

新接口（3 个函数式 props）：

```typescript
effectiveModelNormalize: (protocol: string) => boolean
effectiveModelPreserveDeveloper: (protocol: string) => boolean
onCompatPatch: (protocol: string, payload: {...}) => void
```

所有消费方（`ModelRow`、`PassthroughModelRow`、`CustomModelsSection`、`CompatibleModelsSection`）已同步更新。

**角标显示逻辑**：

- `anyNormalizeCompatBadge()`：任意协议或顶层存在 `normalizeToolCallId=true` 即显示「ID×9」角标。
- `anyNoPreserveCompatBadge()`：任意协议或顶层存在 `preserveOpenAIDeveloperRole=false` 即显示「不保留」角标。

**CustomModelsSection 增强**：

- 新增 `modelCompatOverrides` 状态，从 API 响应中获取。
- 新增 `saveCustomCompat()` 函数，支持仅传 `compatByProtocol` 的独立保存。

### 修复 6：前端 Map 查找性能优化（page.tsx）

**问题**：`effectiveNormalizeForProtocol` 等函数对 `customModels` 和 `modelCompatOverrides` 用 `Array.find()` 做 O(n) 查找，在列表渲染时每个模型行多次调用。

**方案**：使用 `useMemo` + `Map` 将数组预建为 O(1) 查找表。

```typescript
type CompatModelMap = Map<string, CompatModelRow>;

function buildCompatMap(rows: CompatModelRow[]): CompatModelMap {
  const m = new Map<string, CompatModelRow>();
  for (const r of rows) if (r.id) m.set(r.id, r);
  return m;
}

// 在组件内
const customMap = useMemo(() => buildCompatMap(modelMeta.customModels), [modelMeta.customModels]);
const overrideMap = useMemo(
  () => buildCompatMap(modelMeta.modelCompatOverrides),
  [modelMeta.modelCompatOverrides]
);
```

所有查找函数签名从 `(modelId, protocol, customModels[], overrides[])` 改为 `(modelId, protocol, customMap, overrideMap)`，内部使用 `Map.get()` 替代 `Array.find()`。

**优点**：

- 查找从 O(n) 降为 O(1)。
- `useMemo` 依赖项正确，仅在数据变化时重建 Map。
- `CustomModelsSection` 内部也独立构建 Map，不依赖父组件。

### 修复 7：ModelCompatPatch 类型修正（models.ts）

```typescript
// 修复后 — 显式允许 null
export type ModelCompatPatch = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean | null; // null = 取消设置/恢复默认
  compatByProtocol?: CompatByProtocolMap;
};
```

与 `mergeModelCompatOverride()` 内的 `=== null` 判断逻辑一致，类型安全。

### 修复 8：CompatByProtocolMap 类型收紧（page.tsx）

客户端 `CompatByProtocolMap` 从 `Record<string, ...>` 改为 `Record<ModelCompatProtocolKey, ...>`，增强类型安全，防止传入未知协议键。

### 修复 9：i18n 文案新增

| 键名                            | 中文                                          | 英文                                                           |
| ------------------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| `compatProtocolLabel`           | 客户端请求协议                                | Client request protocol                                        |
| `compatProtocolHint`            | 以下选项在 OmniRoute 识别到该请求形态时生效。 | These options apply when OmniRoute detects this request shape. |
| `compatProtocolOpenAI`          | OpenAI Chat Completions                       | OpenAI Chat Completions                                        |
| `compatProtocolOpenAIResponses` | OpenAI Responses API                          | OpenAI Responses API                                           |
| `compatProtocolClaude`          | Anthropic Messages                            | Anthropic Messages                                             |

---

## 四、使用方式

1. 点击模型行的 **「兼容性」** 按钮。
2. 在弹层内先选择 **「客户端请求协议」**（OpenAI Chat / OpenAI Responses / Anthropic Messages）。
3. 勾选该协议下的「工具 ID 9 位」或「不保留 developer 角色」。
4. 保存后，仅在该协议形态的请求下生效。
5. 未配置某协议时，该协议下行为回退到顶层兼容字段（若存在），再回退到默认值（保留 developer、不规范化 tool id）。
6. 角标「ID×9」「不保留」在任意协议存在对应配置时显示。

---

## 五、预期效果

| 指标                      | 修复前                | 修复后                                     |
| ------------------------- | --------------------- | ------------------------------------------ |
| 兼容性配置维度            | 全局（模型级）        | 按协议（OpenAI Chat / Responses / Claude） |
| developer 角色精确控制    | 不支持                | 支持（如：仅 Responses API 不保留）        |
| 前端兼容性查找性能        | O(n) Array.find       | O(1) Map.get（useMemo 缓存）               |
| ModelCompatPatch 类型安全 | null 值无类型覆盖     | 显式 `boolean \| null`                     |
| 客户端构建风险            | 可能引入 Node.js 模块 | 已隔离（shared/constants 层）              |
| API 验证                  | 无 compatByProtocol   | Zod strict schema 校验                     |
| 深色模式                  | 协议选择器不可读      | bg/text 适配 dark 主题                     |

---

## 六、涉及文件清单

| 区域       | 文件                                                        | 改动类型                                                                                         |
| ---------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 协议常量   | `src/shared/constants/modelCompat.ts`                       | **新建**，客户端安全的协议键与类型                                                               |
| 存储与读写 | `src/lib/db/models.ts`                                      | `compatByProtocol` 数据结构、深度合并、getter 第三参 `sourceFormat`、`ModelCompatPatch` 类型修正 |
| 再导出层   | `src/lib/localDb.ts`                                        | 新增 `ModelCompatPatch` 类型导出                                                                 |
| API 路由   | `src/app/api/provider-models/route.ts`                      | PUT 支持 `compatByProtocol`，使用 `ModelCompatPatch` 类型                                        |
| 输入校验   | `src/shared/validation/schemas.ts`                          | `modelCompatPerProtocolSchema`（strict）+ `compatByProtocol` 记录校验                            |
| 请求管线   | `open-sse/handlers/chatCore.ts`                             | `getModelNormalizeToolCallId` / `getModelPreserveOpenAIDeveloperRole` 传入 `sourceFormat`        |
| 前端 UI    | `src/app/(dashboard)/dashboard/providers/[id]/page.tsx`     | 协议选择器、按协议解析/保存、角标逻辑、Map 性能优化、类型收紧                                    |
| i18n       | `src/i18n/messages/en.json`，`src/i18n/messages/zh-CN.json` | 5 条新文案                                                                                       |

---

## 七、回退方案

- **禁用按协议配置**：删除 `compatByProtocol` 字段后，getter 自动回退到顶层字段，行为与 V2 一致。
- **前端 Map 优化回退**：将 `Map.get()` 改回 `Array.find()` 即可，纯性能优化无功能耦合。
- **客户端常量回退**：将 `MODEL_COMPAT_PROTOCOL_KEYS` 定义移回 `models.ts` 并从 `localDb.ts` 导出（需同时确保 `node:crypto` 问题不再存在）。
- **生产环境**：以上修复对生产构建无负面影响。`compatByProtocol` 为可选字段，未配置时默认行为不变。API Zod 校验确保不会接受畸形数据。
