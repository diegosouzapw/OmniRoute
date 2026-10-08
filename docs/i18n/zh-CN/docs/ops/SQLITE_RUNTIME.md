# SQLite Runtime Resolution (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute 在启动时通过一个 5 步回退链解析其 SQLite 驱动程序：

1. **内置的 `better-sqlite3`**（通过 `package.json` 中的 `dependencies`）
   — 速度最快，使用原生二进制文件；当构建工具可用时，由 `npm install` 安装。

2. **运行时安装的 `better-sqlite3`**（位于 `~/.omniroute/runtime/`）
   — 在首次运行时延迟安装，**或者**由 `scripts/build/postinstall.mjs → scripts/postinstall.mjs` 安装。
   加载前会验证原生 `.node` 文件的魔数（ELF / Mach-O / PE），
   以防止加载已损坏或平台不匹配的二进制文件。

3. **`node:sqlite`**（Node ≥22.5 标准库）— 无需原生构建；当
   两个 better-sqlite3 路径均失败时使用。功能集有限。

4. **`sql.js`**（WASM）— 最终回退方案。可在任何环境中运行，但速度较慢，
   并且按固定时间间隔写入数据，而不是同步写入。

## 为什么需要如此复杂的机制？

- **Windows EBUSY**：如果旧版本的 `better_sqlite3.node` 被正在运行的进程锁定，
  `npm install -g omniroute@latest` 可能会失败。通过在
  `~/.omniroute/runtime/` 中进行运行时安装，可以绕过全局 npm 缓存。
- **缺少构建工具**：某些环境（未安装 VS Build Tools 的企业 Windows 环境、
  最小化 Docker 镜像）无法编译 `better-sqlite3`。运行时安装程序会从 npm 注册表
  获取预构建的二进制文件；即使该操作失败，回退驱动程序也能确保 OmniRoute 仍可启动。
- **隔离网络系统**：如果无法访问 npm 注册表，`node:sqlite`
  或 `sql.js` 可保证基本功能可用。

## 魔数验证

在加载运行时安装的 `.node` 文件之前，OmniRoute 会读取前 8 个
字节，并与已知平台的魔数进行匹配：

| 平台                    | 字节（十六进制） | 标签        |
| ----------------------- | ---------------- | ----------- |
| Linux                   | `7F 45 4C 46`    | `elf`       |
| macOS 64 位大端序       | `FE ED FA CF`    | `macho`     |
| macOS 64 位小端序       | `CF FA ED FE`    | `macho-le`  |
| macOS fat（通用二进制） | `CA FE BA BE`    | `macho-fat` |
| Windows                 | `4D 5A` (MZ)     | `pe`        |

如果魔数不匹配 → 忽略该文件，并继续执行下一步回退。

## 检查当前使用的驱动程序

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## 手动控制

```bash
# 跳过安装后预热（用于快速 CI 安装）
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# 强制重新安装运行时 better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # 将在下次启动时重新安装

# 检查当前使用的驱动程序
omniroute config db-info  # （如果存在该 CLI 命令）
```

## 参考

实现：

- `bin/cli/runtime/magicBytes.mjs` — 二进制魔数验证辅助工具
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 步运行时解析器 + 延迟安装程序
- `bin/cli/runtime/index.mjs` — 启动编排器（`warmUpRuntimes()`）
- `scripts/postinstall.mjs` — npm 安装后钩子（非致命预热）
- `src/lib/db/core.ts` — 导出 `ensureDbInitialized()` / `getDriverInfo()`

## 单写入器拓扑（不支持高可用）

上述驱动程序回退链仍在**单个进程**中运行。使用默认 SQLite 的
OmniRoute 是**单写入器**：

- 不要将两个 OmniRoute 副本连接到同一个 `storage.sqlite` 文件。
- 容器重启、Recreate 部署、OOM 终止或 HEALTHCHECK 重启都会中断
  所有正在进行的 SSE 会话。默认路径不提供会话排空机制。
- 如果编排器的存活探针将响应缓慢的 `/healthz` 视为实例已失效，它将终止唯一的
  副本。建议使用 TCP 存活探针 + HTTP `/healthz` 就绪探针。请参阅
  [Docker 指南 — 可用性](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  和 [Kubernetes 探针建议](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)。
