# Error Message Sanitization (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **事实来源：** `open-sse/utils/errorSanitization.ts`、
> `open-sse/utils/errorPathRedaction.ts`，以及 `open-sse/utils/error.ts` 中的公共构建器
> **测试：** `tests/unit/error-message-sanitization.test.ts`、
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **最后更新：** 2026-09-02 — v3.8.51
> **受众：** 所有处理错误响应的工程师（HTTP 路由、SSE 流、执行器、MCP 处理程序）。
> **状态：** 对所有向客户端返回错误消息的代码路径均为**强制要求**。

## 为什么需要此规范

CodeQL 规则 `js/stack-trace-exposure` (CWE-209) 会标记所有以下代码路径：源自运行时异常的错误消息未经清理便传入 HTTP / SSE 响应。生产环境响应中的堆栈跟踪和绝对文件路径会向攻击者暴露：

- 内部目录结构（`/srv/app/src/lib/...`）→ 可用于侦察并发起进一步攻击。
- 从堆栈帧中推断出的库/框架版本 → 可用于选择针对性漏洞利用手段。
- 可能通过字符串插值写入错误消息的敏感运行时值（数据库查询、配置值）。

由 `open-sse/utils/error.ts` 导出的 `sanitizeErrorMessage` 辅助函数会去除以下类型的信息泄露：

1. 物理形式、序列化形式以及明确以内联形式存在的 JavaScript 堆栈帧尾部。
2. POSIX、Windows、UNC 和 `file://` 文件系统绝对路径，同时保留安全的 HTTPS URL 和明确标记的 API 路由。
3. 凭据赋值、常见提供者令牌格式、私钥 PEM 块和 base64 数据 URL。

清理器会限制输入长度，并在抛出的值拒绝字符串强制转换时采用封闭式失败策略。
递归清理上游 JSON 时，还会在序列化响应之前删除不安全的凭据/路径键、会话别名和原型控制键。

## 强制模式

### 1. 构建错误响应（HTTP / API 路由）

使用 `buildErrorBody()`——其中已内置清理功能：

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... 处理程序逻辑 ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

或者，使用同一模块中的便捷包装函数：

```ts
import {
  errorResponse, // 一次性 Response 对象
  writeStreamError, // SSE 写入器
  createErrorResult, // { success: false, status, response, ... } 结构
  unavailableResponse, // 添加 Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

这些函数都会应用规范的公共错误边界。`errorResponse`、`writeStreamError` 和
`createErrorResult` 会通过 `buildErrorBody` 处理；另外三个专用的重试/熔断辅助函数则会
直接投影并清理其公共上下文。使用这些辅助函数时，**绝不需要手动调用
`sanitizeErrorMessage`**。

### 2. 自定义错误信封（少见）

当无法使用上述辅助函数时（例如，响应结构由 Connect-RPC 等上游协议规定），请直接导入 `sanitizeErrorMessage`：

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

这是构建自定义错误正文唯一获准的方式。参考实现请参阅 `open-sse/executors/cursor.ts::buildErrorResponse`。

### 3. 日志记录与响应

可信的内部异常可以保留完整消息和堆栈，以便运维人员调试。源自提供者、验证、浏览器会话或凭据相关边界的值，在进入控制台输出、审计元数据或持久调用日志之前必须进行清理。模式如下：

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // 仅限可信的内部异常
  return errorResponse(500, getErrorMessage(err)); // 已清理——发送给客户端
}
```

对于由提供者控制的失败，也要对记录的值进行投影：

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. 禁止模式

❌ **绝不要**将原始异常输出放入 Response 正文：

```ts
// 错误：堆栈跟踪和文件路径会传到客户端
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **绝不要**自行实现首行分割逻辑：

```ts
// 错误：未去除绝对路径，并且可能偏离规范辅助函数的行为
const safe = String(err).split("\n")[0];
```

❌ **绝不要**只在路由中执行清理而遗漏 SSE 路径。任何写入流的内容都必须通过 `writeStreamError`（或其底层的 `buildErrorBody`）处理。

❌ **绝不要**在错误消息中有意包含 `process.cwd()`、`__filename`、`__dirname` 或派生自环境变量的路径。清理器会删除绝对路径，以此作为纵深防御措施，但调用方从一开始就不得构建包含系统拓扑信息的消息。

## CI 中的覆盖率

`tests/unit/error-message-sanitization.test.ts` 强制要求：

- `/api/model-combo-mappings/*` 下的每个路由在返回 4xx/5xx 响应时都使用经过清理的响应体。
- `sanitizeErrorMessage` 会移除多行堆栈跟踪。
- `sanitizeErrorMessage` 会将 POSIX 和 Windows 绝对路径替换为 `<path>`。
- `sanitizeErrorMessage` 能够安全处理 `null`/`undefined`/`Error` 实例输入。
- `buildErrorBody` 绝不会在其 `message` 字段中暴露堆栈跟踪。

添加新路由或执行器时，请复制此文件中的断言模式。覆盖率门禁（`npm run test:coverage`）要求语句/行/函数/分支覆盖率 ≥60%——错误路径必须被覆盖。

## 相关控制措施

- `.github/security` 中的 `js/stack-trace-exposure` CodeQL 警报始终应当**或者**通过这些辅助函数修复，**或者**在忽略时添加引用本文档的注释。
- `pino` 脱敏配置（`src/shared/utils/logRedaction.ts`）单独处理可信的结构化日志。本文档涵盖公共响应消息，以及跨越持久化调用/代理日志边界的提供者可控值。
- 上游标头拒绝列表（`src/shared/constants/upstreamHeaders.ts`）用于防止标头泄漏——添加新的数据外泄风险时，请确保这两个文件保持一致。

## 上游详细信息透传

`buildErrorBody` 接受可选的第三个参数 `upstreamDetails`（来自上游提供者的原始已解析响应体）。如果提供该参数，则会先通过 `sanitizeUpstreamDetails` 进行清理，然后再以 `upstream_details` 的形式包含在响应中。

可选的第四个参数 `classification`
（`{ type?: string; code?: string; reason?: string }`）接受显式的公共分类。
每个字段都会映射到受限的公共标识符词汇表。包含不安全内容、形似凭据、控制字符或过长的值时，会回退到根据状态派生的 type/code；不安全的可选 reason 则会被省略。三位数 HTTP 状态标识符（`100` 到 `599`）仍然有效，以支持将上游数字状态作为机器可读代码公开的提供者契约。本地生成的 HTTP 状态占位符形式也接受相同的受限范围；任意提供者数字和名称仍不属于该词汇表。

请通过第四个参数传递所有显式分类。切勿在 `buildErrorBody()` 返回后覆盖
`body.error.code`、`body.error.type` 或 `body.error.reason`；
构建后修改会绕过公共映射处理。

应用于 `upstreamDetails` 的清理规则：

1. 字符串叶节点：通过 `sanitizeErrorMessage` 处理（移除堆栈和绝对路径）。
2. 不安全的路径键、凭据键、会话别名键和原型控制键会被移除。
3. 深度上限：超过 4 层的嵌套会被替换为字符串 `"[truncated]"`。
4. 数组最多保留 32 个元素。

仅当调用点拥有已解析的提供者错误响应体时，才应传递 `upstreamDetails`。内部 OmniRoute
错误（SSE 解析失败、内容为空、防护规则拦截）不得包含该参数。

请勿将原始 `err.stack`、`err.message` 或运行时异常中的任何字符串传递给
`upstreamDetails`。这些内容仍必须通过 `errorResponse` / `buildErrorBody(code, msg)`
进行处理，且不得附带上游响应体。

选择性透传上游 4xx 响应时，会保留客户端自动恢复所需的提供者安全 JSON 结构和措辞，但这并非逐字节透传：序列化之前始终会运行递归清理器。包含循环引用、BigInt 或恶意 `toJSON()` 的响应体会以封闭失败方式处理，且不符合透传条件。OCR 和内容审核也适用相同规则；非 JSON、空白或标记错误的上游响应体会被转换为规范的 OmniRoute JSON 错误信封。

## 已知的 CodeQL 限制：无法识别自定义净化器

CodeQL 查询 [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) 使用固定的净化器模式允许列表（例如内联的 `.split("\n")[0]`、使用特定正则表达式形式的 `String#replace`、访问 `Error` 的 `.message`）。它**无法**识别通过类似我们的 `sanitizeErrorMessage()` 这样的自定义辅助函数进行的间接处理。

这意味着，能够证明通过此模块执行了净化的调用点——例如 `open-sse/utils/error.ts::errorResponse` 和 `open-sse/executors/cursor.ts::buildErrorResponse`——即使代码在功能上是安全的，也可能继续触发警报。先前的驳回案例：`#224`、`#231`（2026 年 5 月），二者均附有技术依据并标记为 `false positive`。

**如何处理新出现的此类问题：**

1. 确认调用点确实通过 `sanitizeErrorMessage` / `buildErrorBody` / 上述记录的某个包装器处理消息（端到端阅读整个调用链——不要轻信注释）。
2. 确认 `tests/unit/error-message-sanitization.test.ts` 覆盖了该路径（否则请添加覆盖）。
3. 通过 `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` 驳回警报，并引用本文档。
4. **不要**通过在所有位置内联 `.split("\n")[0]` 来“修复”——该辅助函数是唯一事实来源；仅为了表面上安抚扫描器而复制该模式，反而会削弱净化器（丢失路径清理、长度上限和类型强制转换功能）。

采用 CodeQL 的 [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) 等选择性启用功能是长期解决方案；相关内容不在本文档的讨论范围内。

## 参考资料

- [CWE-209：通过错误消息暴露信息](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP：错误处理速查表](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- 集中管理辅助函数的提交：`1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
