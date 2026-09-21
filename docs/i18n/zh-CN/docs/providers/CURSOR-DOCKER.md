# Cursor Provider in Docker Environments (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

当 OmniRoute 在 Docker 内运行时，旧版 **从 Cursor IDE 导入** /
`cursor-agent` 流程会失败，因为容器无法访问主机上的 Cursor
安装。请改用 **使用 Cursor 登录**（deep-control PKCE）。

## 为什么 IDE / CLI 导入在 Docker 中会失败

1. **文件系统隔离** — 自动导入会在容器_内部_查找 Linux 路径，例如
   `~/.config/Cursor/User/globalStorage/state.vscdb`。
   在 macOS 版 Docker Desktop 上，默认不会挂载主机 IDE 数据库，而且
   即使主机是 Darwin，容器操作系统仍然是 Linux。
2. **没有 `cursor-agent` 二进制文件** — 官方 OmniRoute 镜像不包含
   `cursor-agent`。Available Models 之前会在 shell 中执行
   `cursor-agent --list-models`，失败时回退到静态目录。
3. **二进制文件错误** — **不要**将 macOS 的 `cursor-agent` 绑定挂载到 Linux
   容器中。它无法执行。

## 推荐方式：使用 Cursor 登录

1. 打开 **Dashboard → Providers → Cursor**。
2. 选择 **Login with Cursor** 选项卡。
3. 点击 **Login with Cursor** — OmniRoute 会在你的**主机**浏览器中打开
   `https://cursor.com/loginDeepControl?…`。
4. 在浏览器中批准登录，然后返回仪表板。OmniRoute 会轮询
   `api2.cursor.sh/auth/poll`，直到收到令牌。
5. OmniRoute 会存储**访问令牌和刷新令牌**，并通过
   `https://api2.cursor.sh/auth/exchange_user_api_key` 刷新它们。

此方式不要求容器内安装 Cursor IDE 或 `cursor-agent`。

## 模型发现

使用已登录的连接时，**Available Models / Auto-Sync** 会优先使用连接的
Bearer 令牌获取 Cursor 的 HTTP `AiService/AvailableModels` 目录。
如果失败，OmniRoute 仍会尝试使用主机上的 `cursor-agent`（如果存在），然后
回退到静态注册表种子。

OmniRoute 始终会在目录中公开 **`auto`**（显示为“Auto”），以及
OpenCodex 风格的路由模式 **`auto-cost`**、**`auto-balance`** 和
**`auto-intelligence`**。在线路传输时，它们会映射到 Cursor 的 `default` 模型
（三个变体会附带一个 `optimization` ModelParameter）。当高级模型的使用额度耗尽时，
优先使用 `cu/auto` — Auto 通常仍有可用额度。

### 同步后仅使用实时目录

成功同步 Cursor 模型后（`cursor-agent --list-models` → 持久化的
已同步目录，或上文中经过 Bearer 身份验证的 `AvailableModels` 获取），
**仪表板**、**`/v1/models`** 和 **Test All** 会列出：

1. 实时同步返回的模型
2. 注入的自动路由器 id：`auto`、`auto-cost`、`auto-balance`、`auto-intelligence`
3. 操作员添加的**自定义**模型（导入/手动添加）— 同步永远不会将其移除

位于
`open-sse/config/providers/registry/cursor/` 下的大型静态注册表
**仅用于离线回退**。当已同步目录为空（或发现失败）时，列表会回退到该注册表。

带有 effort 后缀的 id（例如 `claude-4.6-sonnet-high`）在运行时仍可被
**请求**：`resolveRequestedModel` 会剥离后缀，并将其转换为线路传输用的
`ModelParameter`。仅使用实时目录的列表会有意在 Test All 中隐藏这些静态变体，
以确保探测内容与 Cursor 实际返回的可用模型一致。

### 辅助函数

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — 仪表板合并
- `ensureCursorAutoCatalogEntry` — 在发现和列表生成时注入 auto*
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` 静态循环

## 提供者限制（配额）

Cursor 的 **Usage → Provider Limits** 会在 PKCE 或令牌导入后，使用
`api2.cursor.sh` 上的 Bearer API
（`GetCurrentPeriodUsage` → 用量摘要 → auth/usage）。旧版 cookie/`cursor.com`
仪表板路径仍会作为较旧 IDE 导入会话的最后回退方案。

窗口通常包括 **Total**、**Auto + Composer** 和 **API**。如果限制信息为空，
请重新执行 **Login with Cursor** 或重新导入令牌（不再要求必须仅通过 IDE 导入）。

## 空响应轮次/用量耗尽

当 Cursor 接受 Run 但未返回任何助手文本时（高级用量耗尽时很常见），
OmniRoute 会返回可操作的 **429**（包含配额提示）或带有指导信息的 **502**，
而不是简单的“Provider returned empty content”。诸如
`not_found: AI Model Not Found`（用量窗口已耗尽）之类的流式传输失败会被归类为
**Cursor 速率限制/用量超出**，并在整个 SSE 管道中保留该消息（共享的空流保护逻辑
不会覆盖已经发出的错误）。请检查 Provider Limits、尝试模型 **`auto`**，
或提高 Cursor 套餐限制。

## 客户端版本（无头模式）

如果本地未安装 `cursor-agent`，OmniRoute 会依次通过环境变量
`CURSOR_AGENT_CLI_VERSION`、磁盘缓存的 Cursor 安装程序脚本抓取结果，
最后是固定的构建 id，来解析 `x-cursor-client-version`。需要时可使用
`CURSOR_AGENT_CLI_VERSION` 覆盖。

## 回退方案：手动导入令牌

如果无法完成浏览器登录：

1. 在主机上从 Cursor 的 `state.vscdb` 中提取令牌：

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. 在 Cursor 身份验证模态框中打开 **Import token**。
3. 粘贴 **Access Token**，以及可用时的 **Refresh Token**（自动刷新所必需）。
   Machine ID 为可选项。

仅导入访问令牌仍然可用，但没有刷新令牌时会过期 —
当聊天返回身份验证错误时，请重新导入。

## 相关内容

- Zed Docker 指南：[`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor 登录参考（外部）：
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
