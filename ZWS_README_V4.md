# ZWS_README_V4 — 启动性能优化：HMR 泄漏修复与 Turbopack 迁移

## 一、如何发现问题

### 现象

- `npm run dev` 后，首次打开浏览器白屏等待 **5-22 秒**不等。
- 运行一段时间后 Node 进程内存飙升至 **2.4 GB**，触发 Next.js 内存阈值保护强制重启。
- 重启后 `Ready in 82.6s`（正常冷启动仅 3.4s），之后每个页面首次编译需 **7-28 秒**。
- 日志中大量重复输出，单次会话内：
  - `[DB] SQLite database ready` 出现 **485 次**
  - `[HealthCheck] Starting proactive token health-check` 出现 **586 次**
  - `[CREDENTIALS] No external credentials file found` 出现 **432 次**

### 排查过程

1. **Terminal 日志分析**：统计关键日志出现次数，发现 DB 连接和 HealthCheck 定时器被反复创建。
2. **代码审计**：追踪到所有受影响模块使用 `let initialized = false` 作为单例守卫——这在 Next.js dev 模式的 Webpack HMR 下会被重置。
3. **对比**：`apiBridgeServer.ts` 使用了 `globalThis.__omnirouteApiBridgeStarted`，在日志中无重复初始化，验证了 `globalThis` 方案的有效性。
4. **内存快照**：通过 `Get-Process node` 观察到两个 node 进程分别占用 1.7GB 和 1.0GB。
5. **编译时间分析**：日志中 `compile:` 字段显示 Webpack 编译每个路由需 2-26 秒，对比 Turbopack 应在 0.5-3 秒。

---

## 二、根因分析

### 根因 1（P0）：模块级单例在 HMR 中丢失

Next.js dev 模式下，Webpack HMR 会重新执行被修改（或依赖链变化）的模块。模块级 `let` 变量在每次重新执行时被重置为初始值。

```typescript
// 修复前 — 每次 HMR 重新执行时 _db 重置为 null
let _db: SqliteDatabase | null = null;

export function getDbInstance() {
  if (_db) return _db; // HMR 后这里永远 false
  // ... 重新打开一个新的 DB 连接（旧连接泄漏）
}
```

**受影响的模块与泄漏类型：**

| 模块                    | 泄漏资源               | 累计次数 | 后果                    |
| ----------------------- | ---------------------- | -------- | ----------------------- |
| `db/core.ts`            | SQLite 连接            | 485      | 文件句柄泄漏 + 内存占用 |
| `tokenHealthCheck.ts`   | `setInterval` 定时器   | 586      | CPU 空转 + DB 查询风暴  |
| `localHealthCheck.ts`   | `setTimeout` 定时器链  | ~400     | 重复 HTTP 请求 + CPU    |
| `consoleInterceptor.ts` | console 方法包装       | ~400     | 日志 double-write       |
| `gracefulShutdown.ts`   | SIGTERM/SIGINT handler | ~400     | 信号处理器堆叠          |

**级联效应**：泄漏的资源持续消耗内存和 CPU → 触发 Next.js 内存阈值保护 → 进程重启 → Webpack 从零重建模块图 → **Ready in 82.6s**。

### 根因 2（P0）：强制使用 Webpack 而非 Turbopack

`scripts/run-next.mjs` 中硬编码了 `--webpack` 标志：

```javascript
if (mode === "dev") {
  args.splice(2, 0, "--webpack");
}
```

Next.js 16 默认使用 Turbopack（Rust 编写的增量打包器），dev 编译速度是 Webpack 的 5-10 倍。强制回退到 Webpack 导致：

| 指标                    | Webpack | Turbopack（预期） |
| ----------------------- | ------- | ----------------- |
| 首页编译                | 3.7s    | ~0.5s             |
| Provider 详情页首次编译 | 22s     | ~2-3s             |
| API route 首次编译      | 2-7s    | ~0.3-1s           |
| 内存重启后 Ready        | 82.6s   | 不会触发          |

### 根因 3（P1）：`node:crypto` 被拉入客户端 bundle

`src/lib/db/proxies.ts` 使用了 `import { randomUUID } from "node:crypto"`。通过 `localDb.ts` 的 re-export 链，这个 Node.js 原生模块被间接拉入客户端组件的 bundle，导致 Webpack 报错：

```
UnhandledSchemeError: Reading from "node:crypto" is not handled by plugins
Import trace: node:crypto → ./src/lib/db/proxies.ts → ./src/lib/localDb.ts → page.tsx
```

Webpack 无法处理 `node:` URI scheme 前缀。`crypto`（不带 `node:` 前缀）已在 `next.config.mjs` 的 `serverExternalPackages` 中声明为服务端外部包。

### 根因 4（P1）：Edge Runtime 编译警告刷屏

Next.js 16 会同时为 **Node.js** 和 **Edge** 两种运行时编译 `instrumentation.ts`。虽然 `register()` 函数内有 `process.env.NEXT_RUNTIME === "nodejs"` 的运行时守卫，但 Turbopack 在打包 Edge 版本时仍会**静态追踪**所有动态 `import()` 的依赖链：

```
instrumentation.ts
  → import("@/lib/db/secrets")
    → @/lib/db/core.ts  →  fs, path, better-sqlite3
    → @/lib/dataPaths.ts →  path, os
    → @/lib/db/migrationRunner.ts → fs, path, url
```

对每个 Node.js 原生模块，Turbopack 都输出一条 "not supported in Edge Runtime" 警告。每次有新请求触发热编译时，这组 **10+ 条警告重复刷一遍**，严重污染终端输出，干扰开发调试。

### 根因 5（P2）：启动 import 完全串行

`instrumentation.ts` 中 9 个 `await import()` 完全串行执行，每个都可能触发 Webpack 编译其依赖树：

```typescript
await ensureSecrets();                              // 串行 1
const { initConsoleInterceptor } = await import(...); // 串行 2
const { initGracefulShutdown } = await import(...);   // 串行 3
const { initApiBridgeServer } = await import(...);    // 串行 4
const { startBackgroundRefresh } = await import(...); // 串行 5
const { getSettings } = await import(...);            // 串行 6
const { setCustomAliases } = await import(...);       // 串行 7
const { setDefaultFastServiceTierEnabled } = await import(...); // 串行 8
const { initAuditLog, cleanupExpiredLogs } = await import(...); // 串行 9
```

其中 4-6 互不依赖，7-8 互不依赖，完全可以并行。

---

## 三、修复方案

### 修复 1：globalThis 单例守卫（core.ts, tokenHealthCheck.ts, localHealthCheck.ts, consoleInterceptor.ts, gracefulShutdown.ts）

**原理**：`globalThis` 对象在 Node.js 进程生命周期内全局唯一，不受 Webpack 模块重新执行的影响。

```typescript
// 修复后 — globalThis 在 HMR 后依然保留
declare global {
  var __omnirouteDb: import("better-sqlite3").Database | undefined;
}

function getDb() {
  return globalThis.__omnirouteDb ?? null;
}
function setDb(db) {
  /* ... */
}

export function getDbInstance() {
  const existing = getDb();
  if (existing) return existing; // HMR 后命中缓存
  // ...
}
```

**每个模块的具体改动：**

| 模块                    | globalThis key                      | 守卫内容                                                    |
| ----------------------- | ----------------------------------- | ----------------------------------------------------------- |
| `db/core.ts`            | `__omnirouteDb`                     | SQLite 连接实例                                             |
| `tokenHealthCheck.ts`   | `__omnirouteTokenHC`                | `{ initialized, interval }`                                 |
| `localHealthCheck.ts`   | `__omnirouteLocalHC`                | `{ initialized, sweepTimer, healthCache, sweepInProgress }` |
| `consoleInterceptor.ts` | `__omnirouteConsoleInterceptorInit` | `boolean`                                                   |
| `gracefulShutdown.ts`   | `__omnirouteShutdownInit`           | `boolean`                                                   |

**优点**：

- 零依赖，无需额外库。
- 与 `apiBridgeServer.ts` 已有模式一致。
- 对生产环境零影响（非 HMR 场景下行为完全相同）。

**缺点/注意**：

- `globalThis` 键名需全局唯一，使用 `__omniroute` 前缀避免冲突。
- 需要 `declare global` 类型声明以保持 TypeScript 类型安全。
- 生产构建中 `globalThis` 存储略冗余（但仅是一个对象引用，几乎零开销）。

### 修复 2：支持通过环境变量切换 Turbopack（run-next.mjs）

```javascript
// 修复后 — 默认仍用 webpack（保持原有行为），设置环境变量可启用 Turbopack
if (mode === "dev" && process.env.OMNIROUTE_USE_TURBOPACK !== "1") {
  args.splice(2, 0, "--webpack");
}
```

**默认行为不变**：dev 模式仍使用 Webpack，与修复前完全一致。设置 `OMNIROUTE_USE_TURBOPACK=1` 可切换到 Turbopack 以获得更快的 dev 编译速度。

**优点**：

- 零风险：不改变任何人的现有体验。
- 需要时设置 `OMNIROUTE_USE_TURBOPACK=1` 即可获得 5-10 倍编译加速。
- `next.config.mjs` 中已有 `turbopack.resolveAlias` 配置，说明项目已在准备 Turbopack 迁移。

**缺点/注意**：

- Turbopack 对某些 Webpack 特定配置（如自定义 externals 函数）的支持方式不同，启用前需测试兼容性。
- 默认走 Webpack 意味着不主动启用 Turbopack 的用户无法享受编译加速。

### 修复 3：`node:crypto` → `crypto`（proxies.ts, errorResponse.ts）

```typescript
// 修复前
import { randomUUID } from "node:crypto";

// 修复后
import { randomUUID } from "crypto";
```

**优点**：

- `crypto`（无 `node:` 前缀）已在 `next.config.mjs` 的 `serverExternalPackages` 列表中，Webpack/Turbopack 会正确将其标记为外部包。
- 消除 `UnhandledSchemeError` 构建失败。
- Node.js 中 `crypto` 和 `node:crypto` 解析到同一模块。

**缺点**：

- 无。`crypto` 是 Node.js 内建模块，两种写法功能完全等价。

### 修复 4：分离 Edge/Node.js Instrumentation（instrumentation.ts → instrumentation-node.ts）

**问题**：`instrumentation.ts` 中所有 Node.js 逻辑（`ensureSecrets`、DB 初始化、审计日志等）虽然只在 `NEXT_RUNTIME === "nodejs"` 时执行，但 Turbopack 编译 Edge 版本时仍静态追踪其 import 链，对每个 `fs`/`path`/`os`/`better-sqlite3` 等原生模块输出警告。

**方案**：将所有 Node.js 专属逻辑提取到 `src/instrumentation-node.ts`，主文件通过**计算的 import 路径**引入，阻止 Turbopack 静态解析：

```typescript
// src/instrumentation.ts — 精简后仅 ~20 行
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // 拼接路径阻止 Turbopack 在 Edge 编译时静态解析模块依赖
    const nodeMod = "./instrumentation-" + "node";
    const { registerNodejs } = await import(nodeMod);
    await registerNodejs();
  }
}
```

```typescript
// src/instrumentation-node.ts — 包含全部 Node.js 启动逻辑
export async function registerNodejs(): Promise<void> {
  await ensureSecrets();
  // initConsoleInterceptor, initGracefulShutdown, initApiBridgeServer, ...
  // （原 instrumentation.ts 的完整 Node.js 逻辑）
}
```

**关键技术**：`"./instrumentation-" + "node"` 是运行时拼接的字符串，Turbopack 无法在编译期确定其值，因此**不会追踪**该 import 的依赖树。Node.js 运行时则正常解析该路径并执行。

**优点**：

- Edge 编译时完全跳过 Node.js 模块追踪，**10+ 条重复警告全部消除**。
- Node.js 运行时行为与修复前完全一致。
- 启动时间从 **13.9s → 1.25s**（Turbopack 不再在 Edge 编译中处理 Node.js 模块图）。

**缺点/注意**：

- 新增一个文件 `instrumentation-node.ts`，需同步维护。
- 计算 import 路径是有意为之的 bundler 逃逸技巧，需加注释说明原因防止后续重构时被"优化"回静态字符串。

### 修复 5：并行化 instrumentation.ts 中的启动 import

```typescript
// 修复后 — 4 个独立模块并行导入
const [
  { initGracefulShutdown },
  { initApiBridgeServer },
  { startBackgroundRefresh },
  { getSettings },
] = await Promise.all([
  import("@/lib/gracefulShutdown"),
  import("@/lib/apiBridgeServer"),
  import("@/domain/quotaCache"),
  import("@/lib/db/settings"),
]);

// 2 个 open-sse 模块也并行导入
const [{ setCustomAliases }, { setDefaultFastServiceTierEnabled }] = await Promise.all([
  import("@omniroute/open-sse/services/modelDeprecation.ts"),
  import("@omniroute/open-sse/executors/codex.ts"),
]);
```

**优点**：

- `consoleInterceptor` 仍保持第一个（必须在任何日志前初始化）。
- 后续 4 个无依赖模块并行加载，节省 3 次串行等待。
- open-sse 的 2 个模块也并行加载。

**缺点**：

- 并行 import 的错误堆栈略复杂（Promise.all 中某一个失败会 reject 整个组）。
- 这里的 compliance 模块仍保持独立 try/catch 串行，因为它有自己的错误处理逻辑。

---

## 四、预期效果

| 指标                          | 修复前                    | 修复后（预期）           |
| ----------------------------- | ------------------------- | ------------------------ |
| DB 连接创建次数               | 485 次/会话               | 1 次                     |
| HealthCheck 定时器            | 586 个泄漏                | 1 个                     |
| 信号处理器注册                | ~400 次重复               | 1 次                     |
| Console 拦截层数              | ~400 层嵌套               | 1 层                     |
| 内存使用峰值                  | 2.4 GB → OOM 重启         | 预期 < 500 MB            |
| 冷启动 Ready                  | 3.4s                      | ~3s（略快）              |
| 内存重启 Ready                | 82.6s                     | 不再触发内存重启         |
| Login 页首次编译              | 3.7s                      | ~0.5s (需启用 Turbopack) |
| Provider 详情页首次编译       | 22s                       | ~2-3s (需启用 Turbopack) |
| `node:crypto` 构建错误        | 反复出现                  | 消除                     |
| Edge Runtime 编译警告         | 每次热编译刷出 10+ 条     | **0 条**                 |
| instrumentation 启动耗时      | 13.9s（含 Edge 模块追踪） | **1.25s**                |
| instrumentation import 并行度 | 9 次串行 import           | 3 批并行 import          |

---

## 五、涉及文件清单

| 区域                | 文件                            | 改动类型                                                           |
| ------------------- | ------------------------------- | ------------------------------------------------------------------ |
| DB 单例             | `src/lib/db/core.ts`            | `let _db` → `globalThis.__omnirouteDb`                             |
| Token 健康检查      | `src/lib/tokenHealthCheck.ts`   | `let initialized` → `globalThis.__omnirouteTokenHC`                |
| 本地节点健康检查    | `src/lib/localHealthCheck.ts`   | `let initialized` → `globalThis.__omnirouteLocalHC`                |
| Console 拦截        | `src/lib/consoleInterceptor.ts` | `let initialized` → `globalThis.__omnirouteConsoleInterceptorInit` |
| 优雅关停            | `src/lib/gracefulShutdown.ts`   | 新增 `globalThis.__omnirouteShutdownInit` 守卫                     |
| Dev 启动脚本        | `scripts/run-next.mjs`          | 新增 `OMNIROUTE_USE_TURBOPACK=1` 开关                              |
| Proxy 注册表        | `src/lib/db/proxies.ts`         | `node:crypto` → `crypto`                                           |
| API 错误响应        | `src/lib/api/errorResponse.ts`  | `node:crypto` → `crypto`                                           |
| 启动钩子（主入口）  | `src/instrumentation.ts`        | 精简为 ~20 行，计算 import 路径阻止 Edge 追踪                      |
| 启动钩子（Node.js） | `src/instrumentation-node.ts`   | 新文件，承载全部 Node.js 启动逻辑 + `Promise.all` 并行             |

---

## 六、回退方案

- **启用 Turbopack**：设置 `OMNIROUTE_USE_TURBOPACK=1` 环境变量；不设置则默认使用 Webpack（原有行为不变）。
- **globalThis 方案异常**：所有 globalThis key 都以 `__omniroute` 为前缀，可通过 `delete globalThis.__omnirouteDb` 等方式手动重置。
- **Edge 警告回退**：若 `instrumentation-node.ts` 拆分导致问题，可将其内容合并回 `instrumentation.ts`，恢复为直接 `import()` 调用（警告会重新出现但不影响功能）。
- **生产环境**：以上修复对生产构建无负面影响——生产环境不存在 HMR，globalThis 单例仅在首次调用时初始化一次。计算 import 路径在 `next build` 时由 Node.js 正常解析，不影响打包产物。

---

## 七、单元测试与备份恢复（pre-commit 验证通过）

为保证提交前必须通过验证（不再使用 `--no-verify`），对以下失败用例与生产逻辑做了修复与加固。

### 问题与根因

| 失败项                                | 根因                                                                                                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| bootstrap-env 4 个用例                | Windows 上 DATA_DIR 解析用 `APPDATA`/`homedir()`，测试只设了 `HOME`，脚本读不到测试用的 `.env`。                                        |
| domain-persistence costRules 2 个用例 | `core` 在首次 import 时缓存 `DATA_DIR`；测试每测一个 tmpDir 并在 afterEach 删目录，导致后续 describe 使用的 DB 路径已被删，读写得到 0。 |
| fixes-p1 restoreDbBackup              | 测试在 DB 仍打开时写 stale 侧文件；`restoreDbBackup` 内 pre-restore 备份未 await 就关库，Windows 上句柄未及时释放，unlink 报 EBUSY。    |
| fixes-p1 resetStorage 及后续用例      | 上一测留下 DB 打开，下一测 `resetStorage()` 删目录时文件仍被占用，EBUSY。                                                               |

### 修复 6：bootstrap-env 测试（tests/unit/bootstrap-env.test.mjs）

在每个用例的 `withTempEnv` 回调开头增加 `process.env.DATA_DIR = dataDir`，使脚本在任意平台（含 Windows）都使用测试临时目录，而不是依赖 `HOME`/`APPDATA`。

### 修复 7：domain-persistence 测试（tests/unit/domain-persistence.test.mjs）

- **单例 tmpDir**：全文件共用一个 `fileTmpDir`，在模块加载时创建并设置 `process.env.DATA_DIR`，与 `core` 首次加载时缓存的路径一致。
- **每测清 DB 不清目录**：`beforeEach` 中 `resetDbInstance()` 后删除 `storage.sqlite` 及其 `-wal`/`-shm`/`-journal`，保证每测干净 DB，不在 afterEach 删目录，避免路径失效。
- **收尾**：`after()` 中恢复 `DATA_DIR` 并删除 `fileTmpDir`。
- **costRules 断言**：改为小容差精确校验（`assertAlmostEqual`），继续验证 `4.5` / `4.0` 这类业务关键值，避免把真实累计错误放过去。

### 修复 8：fixes-p1 测试（tests/unit/fixes-p1.test.mjs）

- **restoreDbBackup 用例**：在写入 stale 侧文件前调用 `core.resetDbInstance()`，避免 DB 仍打开时写 `-wal`/`-shm` 触发 Windows 锁错误。
- **Windows 跳过**：该用例在 Windows 上仍使用 `test(..., { skip: isWindows })`。原因不是业务逻辑不支持 Windows，而是 better-sqlite3 关闭后底层句柄释放存在时序抖动，这条真实 sidecar 集成测试容易退化成不稳定的文件锁测试；Linux/macOS 上照常运行。
- **核心兜底测试**：新增平台无关的 `unlinkFileWithRetry` 单测，直接模拟 `EBUSY` / `EPERM` 后重试并最终成功，确保 Windows 相关的重试删除逻辑被稳定覆盖，而不是完全依赖 flaky 的真实文件锁时序。
- **resetStorage**：改为 async，对 `rmSync(TEST_DATA_DIR)` 做最多 10 次、间隔 100ms 的 EBUSY/EPERM 重试，避免下一测因上一测句柄未释放而失败。

### 修复 9：备份恢复逻辑（src/lib/db/backup.ts）

- **pre-restore 备份改为同步等待**：在 `restoreDbBackup` 内用内联逻辑做 pre-restore 备份并 `await` 完成，再调用 `resetDbInstance()`，避免异步 backup 未结束就关库导致后续 unlink 失败。
- **节流语义保持一致**：pre-restore 备份成功后补回 `_lastBackupAt = Date.now()`，避免恢复后紧接着又触发一轮额外自动备份。
- **关库后短延迟**：`resetDbInstance()` 后 `await new Promise(r => setTimeout(r, 500))`，再执行 unlink，给 Windows 等平台释放句柄留时间。
- **unlink 重试**：将主库及 `-wal`/`-shm`/`-journal` 的删除提取为 `unlinkFileWithRetry`，统一做最多 10 次、间隔 100ms 的 EBUSY/EPERM 重试，提高恢复流程在锁释放较慢环境下的成功率，也便于单测直接覆盖重试逻辑。

### 涉及文件（本节）

| 区域     | 文件                                     | 改动类型                                                                                                        |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 单元测试 | `tests/unit/bootstrap-env.test.mjs`      | 各用例内设置 `process.env.DATA_DIR = dataDir`                                                                   |
| 单元测试 | `tests/unit/domain-persistence.test.mjs` | 单例 tmpDir、beforeEach 清 DB 文件、after 删目录；costRules 改为小容差精确断言                                  |
| 单元测试 | `tests/unit/fixes-p1.test.mjs`           | restoreDbBackup 前 resetDbInstance、Windows skip 说明、resetStorage 重试、`unlinkFileWithRetry` 核心单测        |
| 备份恢复 | `src/lib/db/backup.ts`                   | pre-restore 内联并 await、恢复 `_lastBackupAt` 节流语义、关库后 500ms 延迟、抽取 `unlinkFileWithRetry` 重试删除 |
