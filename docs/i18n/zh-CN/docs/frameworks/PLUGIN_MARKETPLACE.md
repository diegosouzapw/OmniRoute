# Plugin Marketplace (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **事实来源：** `src/lib/plugins/`（`marketplace.ts`、`manager.ts`、`manifest.ts`、
> `scanner.ts`、`loader.ts`）、`src/app/api/plugins/`，以及
> `src/app/(dashboard)/dashboard/plugins/`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 提供了一个类似 WordPress 的插件系统。插件是自包含的目录——每个目录都包含一个 `plugin.json` 清单文件和一个入口文件——可挂接到请求处理管道（`onRequest` / `onResponse` / `onError`）以及生命周期事件（`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`）中。

**插件市场**是构建在该系统之上的发现层。它提供一个可浏览的可安装插件目录。默认情况下，该目录使用一个小型内置种子注册表；运维人员也可以将其指向自定义远程注册表 URL。在这种情况下，请求会受到具备 DNS 解析能力的 SSRF 防护机制保护（参见[安全性](#security)）。

所有插件路由都**仅限环回地址访问**（第 1 层级 — `LOCAL_ONLY`）：插件会在子进程中加载并执行代码，因此无论身份验证状态如何，都无法从非环回来源访问这些路由。参见
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)。

## 工作原理

```
仪表板 (/dashboard/plugins)
  ├─ “已安装”选项卡  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   （卸载）
  └─ “插件市场”选项卡 → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ 无自定义 URL → 内置 SEED_REGISTRY
                            └─ 自定义 URL → isSafeMarketplaceUrl() SSRF 防护
                                          → safeOutboundFetch(guard:"public-only")
```

- **注册表层** — `src/lib/plugins/marketplace.ts`：列出/搜索目录，并在发生任何故障时回退到种子注册表。
- **生命周期层** — `src/lib/plugins/manager.ts`（`pluginManager` 单例）：安装、升级、激活、停用、卸载、扫描和启动时加载。
- **清单层** — `src/lib/plugins/manifest.ts`：用于 `plugin.json` 的 Zod 模式和默认值。
- **扫描器** — `src/lib/plugins/scanner.ts`：发现插件目录下磁盘中的插件。
- **加载器** — `src/lib/plugins/loader.ts`：在隔离的子进程中启动每个插件，并通过 IPC 代理钩子调用。

## 插件市场目录

`listMarketplacePlugins()`（`src/lib/plugins/marketplace.ts`）返回一个由 `MarketplaceEntry` 对象组成的列表：

| 字段          | 类型     | 说明                       |
| ------------- | -------- | -------------------------- |
| `name`        | string   | kebab-case 格式的插件名称  |
| `version`     | string   | semver                     |
| `description` | string   | 简短摘要                   |
| `author`      | string   | 作者/组织                  |
| `license`     | string   | SPDX 风格的许可证 ID       |
| `downloadUrl` | string   | 源文件下载 URL（可能为空） |
| `repository`  | string?  | 可选的仓库 URL             |
| `tags`        | string[] | 搜索/筛选标签              |
| `downloads`   | number   | 下载次数                   |
| `rating`      | number   | 0–5                        |
| `verified`    | boolean  | 该条目是否标记为已验证     |
| `lastUpdated` | string   | 类 ISO 格式的日期字符串    |

未配置自定义注册表 URL 时，目录使用内置的 `SEED_REGISTRY`（目前包括 `request-logger`、`rate-limiter`、`cost-tracker` 和 `theme-manager`）。种子注册表始终可用——如果已配置的远程注册表无法访问、返回非 `200` 状态，或返回无法识别的响应正文，`listMarketplacePlugins()` 会记录警告并回退到种子列表。

> 注意：插件市场的**目录**功能（浏览/搜索）已实现端到端连接，但尚未实现从目录中一键**安装**插件——目前，仪表板中插件市场条目上的“安装”按钮只会显示“即将推出”通知。当前的安装需要通过本地路径安装流程（`POST /api/plugins`）和磁盘发现流程（`POST /api/plugins/scan`）完成。

## REST API

所有端点都需要管理身份验证（`requireManagementAuth`），**并且**仅限回环地址访问——`/api/plugins` 和 `/api/plugins/` 已列入 `LOCAL_ONLY_API_PREFIXES`（`src/server/authz/routeGuard.ts`）。

| 端点                             | 方法   | 描述                                       |
| -------------------------------- | ------ | ------------------------------------------ |
| `/api/plugins`                   | GET    | 列出已安装的插件（可选 `?status=` 过滤器） |
| `/api/plugins`                   | POST   | 从绝对本地路径安装插件                     |
| `/api/plugins/scan`              | POST   | 扫描插件目录并注册新插件                   |
| `/api/plugins/marketplace`       | GET    | 列出市场目录条目                           |
| `/api/plugins/[name]`            | GET    | 获取已安装插件的详细信息                   |
| `/api/plugins/[name]`            | DELETE | 卸载插件                                   |
| `/api/plugins/[name]/activate`   | POST   | 激活（加载并注册钩子）                     |
| `/api/plugins/[name]/deactivate` | POST   | 停用（触发 `onDeactivate` 并注销钩子）     |
| `/api/plugins/[name]/config`     | GET    | 获取插件配置和配置模式                     |
| `/api/plugins/[name]/config`     | PUT    | 更新插件配置（根据模式进行验证）           |

`GET /api/plugins` 的 `status` 过滤器接受以下值之一：`installed` / `active` / `inactive` / `error`。无效值会返回 `400`。

### 列出已安装的插件

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### 从本地路径安装

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` 必须是**绝对路径**，且不得包含 `..` 路径穿越段或空字节（由 Zod 强制执行）。源目录必须包含有效的 `plugin.json`（或者是包含该文件的目录的父目录）。成功时，响应状态码为 `201`，并返回已安装插件的记录。

### 浏览插件市场

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### 更新插件配置

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` 会根据插件的 `configSchema`（在清单中声明）验证提供的每个值：`number` 字段遵循 `min`/`max` 限制，`select` 字段必须匹配声明的 `enum`。模式中不存在的键仍会被允许通过。

## 配置

### 插件目录

插件位于 OmniRoute 数据目录下：

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # （或 manifest.main 指向的任何文件）
```

`getDefaultPluginDir()`（`src/lib/plugins/scanner.ts`）通过以下三个步骤解析该目录：

1. 设置了 **`OMNIROUTE_PLUGINS_DIR`** 时——直接使用其原始值，无论 `HOME` 设置为何。这是为 Docker/K8s 提供的显式配置项；在这些环境中，插件目录树通常通过绑定挂载到一个与容器主目录无关的路径（#11827）。
2. `<home>/.omniroute/plugins`，其中 `<home>` 来自 `HOME` / `USERPROFILE` 环境变量。
3. `/tmp/.omniroute/plugins`，当进程完全没有导出主目录时使用。

解析出的目录会在启动时以 `scanner.dir_resolved` 的名称记录一次日志，并标明最终采用的输入（`OMNIROUTE_PLUGINS_DIR`、`home` 或 `no-home-fallback`）——因此，如果某个镜像悄然使用了步骤 3，日志会明确说明，而不是仅报告空的插件列表。`POST /api/plugins/scan` 会发现该目录下包含有效 `plugin.json` 的所有子目录并进行注册；同一目录也是 `pluginManager.install()` 将插件复制到的根目录，因此覆盖此设置会同时移动插件的发现目录和安装目录。

> **`OMNIROUTE_PLUGINS_DIR` 并不是 `OMNIROUTE_PLUGIN_PATH`。** 后者仅由 CLI 命令插件加载器（`bin/cli/plugins.mjs`）读取，用于查找添加 `omniroute` 子命令的 `omniroute-cmd-*` npm 包——它不会影响此处所述的运行时扫描器。有关该部分的信息，请参阅 [PLUGINS.md](./PLUGINS.md)。

### 自定义市场注册表 URL

市场目录源读取自 `pluginMarketplaceUrl` 设置（`src/lib/plugins/marketplace.ts` 读取 `settings.pluginMarketplaceUrl`）。当该设置为 `http(s)` URL 时，`listMarketplacePlugins()` 会获取该 URL，并接受顶层 JSON 条目数组，或包含 `plugins` 数组的对象；没有字符串类型 `name` 的条目会被过滤掉。如果未设置该值（或请求未通过 SSRF 防护检查／返回了无效响应），则使用内置的初始注册表。

控制面板的“市场”选项卡提供了用于填写此 URL 的字段（通过 `GET /api/settings` 回读）。

> 实现说明：控制面板的“保存”操作会将 `pluginMarketplaceUrl` 发送至 `PATCH /api/settings`。在撰写本文时，此键尚未在 `updateSettingsSchema`（`src/shared/validation/settingsSchemas.ts`）中声明，因此，在依赖它之前，请先确认你所用版本是否能够持久保存该设置——一旦该键存在于设置存储中，**读取**路径（`getSettings()` → `listMarketplacePlugins()`）就会识别它。

## 安全性

### 路由层级 — 仅限回环地址

插件会在派生的子进程中执行代码，因此整个 `/api/plugins`
接口均被归类为 `LOCAL_ONLY`（第 1 层）。回环地址限制会无条件地在任何身份验证检查**之前**执行，因此即使泄露的管理令牌通过隧道到达该主机，也仍然无法安装、激活或卸载插件。
请参阅 [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) 和
硬性规则 #15 / #17。

### 市场注册表 SSRF 防护

自定义注册表 URL 是可受攻击者影响的配置，因此在获取它之前，
`listMarketplacePlugins()` 会通过两层防护对其进行检查：

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`)：
   - 拒绝任何不使用 `http:` / `https:` 的 URL。
   - 通过规范的 `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) 拒绝字面形式的私有、回环、链路本地和 ULA 主机（IPv4 **和** IPv6，
     包括 IPv4 映射地址）。
   - 同时解析 `A` 和 `AAAA` 记录，并在**任何**已解析地址为私有地址时拒绝请求，从而阻止“公共主机名 → 私有 IP”的绕过方式。
   - **失败时关闭**：DNS 解析失败会导致 URL 被拒绝。
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`)：在获取时重新应用仅限公共地址的 URL
   防护，并**阻止重定向**（不允许通过公共地址 → 私有地址的 `30x`
   跳转进行绕过）。

URL 未通过任一层检查时不会中止请求——市场会静默回退到内置的种子注册表，并记录一条警告。

> 此防护在 PR #3774 中得到强化，专门用于同时解析 A + AAAA，并使用
> 规范的 `isPrivateHost`，而不是仅检查 IPv4。

### 插件执行隔离

- **进程隔离** — `loadPlugin()` (`src/lib/plugins/loader.ts`) 会在单独的 Node.js 子进程中启动每个插件，并通过 IPC 进行通信。
  钩子调用设有超时机制，并采用 `SIGTERM` → `SIGKILL` 的升级终止流程。
- **环境变量允许列表** — 子进程仅接收允许列表中的环境变量；只有当清单请求
  `env` 权限时，才会授予更广泛的环境变量集合。
- **路径限制** — 安装、升级和卸载操作会在执行任何复制或递归删除之前，确认插件目录和 `manifest.main` 解析后的路径位于受管理的插件根目录**之内**（防止被篡改的数据库路径以及 `manifest.main` 中的 `../` 路径遍历）。激活时会通过
  `realpath` 解析符号链接，并拒绝加载逃逸出插件目录的入口点。
- **可选的完整性固定** — 清单可声明 `integrity`
  (`sha256-<base64>`，SRI 格式) 字段。指定该字段后，加载器会在加载时验证入口文件的哈希值，并在不匹配时拒绝激活。这是一种可选的篡改检测机制，**不是**安全边界——仅限回环地址的路由和权限模型才是真正的安全边界。

## 清单 (`plugin.json`)

由 `PluginManifestSchema` (`src/lib/plugins/manifest.ts`) 验证：

| 字段               | 类型      | 说明                                                 |
| ------------------ | --------- | ---------------------------------------------------- |
| `name`             | string    | 必填；kebab-case (`^[a-z0-9-]+$`)，1–100 个字符      |
| `version`          | string    | 必填；semver (`MAJOR.MINOR.PATCH`)                   |
| `description`      | string?   | ≤ 500 个字符                                         |
| `author`           | string?   | ≤ 200 个字符                                         |
| `license`          | string?   | 默认为 `MIT`                                         |
| `main`             | string?   | 入口文件；默认为 `index.js`                          |
| `source`           | enum?     | `local` \| `marketplace`（默认为 `local`）           |
| `tags`             | string[]? | 搜索标签                                             |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                      |
| `hooks`            | object?   | 声明插件实现了哪些钩子的布尔值                       |
| `skills`           | object[]? | 可选的技能定义                                       |
| `enabledByDefault` | boolean?  | 安装时自动激活                                       |
| `configSchema`     | object?   | 配置字段映射（`string`/`number`/`boolean`/`select`） |
| `integrity`        | string?   | 可选的 `sha256-<base64>` 入口文件固定值              |

权限取自以下枚举：
`network` / `file-read` / `file-write` / `env` / `exec`。

## 生命周期流程

```
安装（POST /api/plugins，路径）
  → 扫描/验证清单 → 复制到暂存区 → 确认主入口位于目录内
  → 原子重命名并移入 ~/.omniroute/plugins/<name> → 插入数据库行
  → 触发 onInstall → 如果 enabledByDefault：激活

激活（POST /api/plugins/{name}/activate）
  → realpath 包含关系检查 → loadPlugin()（生成子进程）
  → 注册声明的钩子 → 状态 = "active" → 触发 onActivate

停用（POST /api/plugins/{name}/deactivate）
  → 触发 onDeactivate（在取消注册之前）→ 取消注册钩子
  → 终止子进程 → 状态 = "inactive"

卸载（DELETE /api/plugins/{name}）
  → 如果处于活动状态则停用 → 触发 onUninstall
  → 在检查包含关系后递归删除插件目录 → 删除数据库行
```

如果对某个目录重新运行 `install`，且其清单版本**严格高于**
已安装版本，则会自动升级（全新重装；配置重置为默认值）。
版本相同或更旧时将被拒绝。

## 数据库

表 `plugins`（迁移 `076_create_plugins.sql`）：

| 列              | 类型    | 说明                                             |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | 唯一                                             |
| `version`       | TEXT    | semver；默认值为 `1.0.0`                         |
| `description`   | TEXT    | 可选                                             |
| `author`        | TEXT    | 可选                                             |
| `license`       | TEXT    | 默认值为 `MIT`                                   |
| `main`          | TEXT    | 入口文件；默认值为 `index.js`                    |
| `source`        | TEXT    | 默认值为 `local`                                 |
| `tags`          | TEXT    | JSON 数组；默认值为 `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1；默认值为 0                                  |
| `manifest`      | TEXT    | 完整的清单 JSON                                  |
| `config`        | TEXT    | JSON；默认值为 `{}`                              |
| `config_schema` | TEXT    | JSON；默认值为 `{}`                              |
| `hooks`         | TEXT    | 声明的钩子名称 JSON 数组；默认值为 `[]`          |
| `permissions`   | TEXT    | JSON 数组；默认值为 `[]`                         |
| `plugin_dir`    | TEXT    | 绝对安装目录                                     |
| `error_message` | TEXT    | 当 `status = "error"` 时设置                     |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | 激活时设置                                       |

插件指标/分析数据记录在其他表中
（`090_plugin_metrics.sql`、`091_plugin_analytics.sql`）。

## 仪表板

位于 `/dashboard/plugins`
（`src/app/(dashboard)/dashboard/plugins/page.tsx`）的仪表板页面提供两个选项卡：

- **已安装** — 列出已安装的插件及其声明的钩子、激活/停用开关、卸载按钮，以及“扫描插件”
  操作（`POST /api/plugins/scan`）。
- **插件市场** — 显示来自 `GET /api/plugins/marketplace` 的目录，并提供一个用于设置自定义注册表 URL 的
  字段。

每个插件的配置页面位于 `/dashboard/plugins/[name]/config`
（`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`）。

## 另请参阅

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` 为何仅允许环回访问（第 1 级）
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — 相关的技能框架
  (`src/lib/skills/`)；插件可以在其清单中声明技能
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — 事件驱动的出站
  集成
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  每个插件路由用于错误响应的 `buildErrorBody()` 模式
