# Tunnels Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **事实来源：** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`、`src/app/api/tunnels/`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 可以通过三种隧道后端，将其本地服务器（`http://localhost:20128`）公开到互联网。这适用于：

- 接收来自云服务提供者（Antigravity、Gemini、Cursor）的 OAuth 回调，这些回调需要一个可公开访问的重定向 URL。
- 无需部署 VM，即可与团队成员共享本地实例。
- 移动端、远程或跨网络测试。

所有三种后端都在进程内管理——OmniRoute 会通过仪表板或 REST API 启动/停止底层二进制程序或 SDK。无需配置反向代理或 systemd。

## 后端概览

| 后端                        | 持久性                             | 费用                | 设置                                       |
| --------------------------- | ---------------------------------- | ------------------- | ------------------------------------------ |
| **Cloudflare Quick Tunnel** | 临时（每次重启时 URL 都会变化）    | 免费                | 无需设置——自动安装 `cloudflared`           |
| **ngrok**                   | 配置付费方案或固定域名后可保持稳定 | 免费套餐 + 付费方案 | 需要 ngrok 账户 + authtoken                |
| **Tailscale Funnel**        | 在 tailnet 内按节点保持稳定        | 个人使用免费        | 需要安装并登录 Tailscale + 配置 Funnel ACL |

具体实现在 `src/lib/cloudflaredTunnel.ts`、`src/lib/ngrokTunnel.ts` 和 `src/lib/tailscaleTunnel.ts` 中。这三种实现都会返回具有统一结构的 `status` 对象，其中包含 `phase`、`running`、`publicUrl`、`apiUrl`、`targetUrl` 和 `lastError` 字段，因此仪表板可以用统一方式呈现它们。

## 1. Cloudflare Tunnel（Quick Tunnel + Named Tunnel）

`src/lib/cloudflaredTunnel.ts` 将 `cloudflared` 作为子进程运行。它支持两种模式，具体使用哪种模式取决于是否提供了命名隧道配置：

- **快速隧道（默认）。** 运行 `cloudflared tunnel --url
http://localhost:<apiPort>`，并从标准输出中解析分配的 `*.trycloudflare.com` URL。URL 是临时的，每次重启都会变化。
- **命名隧道（选择启用）。** 当 `CLOUDFLARED_CONFIG` 指向本地管理的 cloudflared `config.yml` 时，OmniRoute 会运行 `cloudflared tunnel --no-autoupdate
--config <path> run`，从而提供一个**稳定的命名主机名**。该配置提供隧道 UUID、`credentials-file` 和 `ingress` 路由，因此不会传递 `--url`，也不需要 Zero Trust 仪表板令牌。`run` 会从配置中的绝对 `credentials-file` 路径读取凭据——不需要 `cert.pem`（它仅用于隧道生命周期管理）。

主要行为：

- **自动安装。** 首次使用时，OmniRoute 会从官方 GitHub releases 下载最新的 `cloudflared` 二进制文件（托管安装位于 `DATA_DIR/cloudflared/` 下）。执行之前，会根据发布清单验证所下载资源的 SHA256。
- **进程监管。** cloudflared PID 和解析后的 URL 会持久化到 `quick-tunnel-state.json`，以便仪表板在重新加载后恢复状态。

### 命名隧道设置（稳定主机名）

1. 使用 cloudflared CLI 创建一个本地管理的隧道（仅需执行一次）：

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. 编写 `~/.cloudflared/config.yml`，将主机名路由到 OmniRoute 的本地 API 端口（默认为 20128）：

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. 将 OmniRoute 指向该配置，然后（重新）启动隧道：

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # 可选——覆盖 OmniRoute 报告的主机名；否则从配置的
   # 第一条 ingress 规则中读取：
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   启用隧道的方式与快速隧道相同（通过下文所述的 REST / 仪表板 / CLI）。命名隧道不会输出可供提取的公共 URL，因此系统会通过 cloudflared 已注册的边缘连接来检测就绪状态，而 `publicUrl`/`apiUrl` 则根据 `CLOUDFLARED_HOSTNAME`（或配置中的第一个 ingress 主机名）进行报告。

### 通过 REST 启用 / 禁用

该端点使用 `{action: "enable" | "disable"}` 请求体，而不是单独的 `start`/`stop` 路径。需要管理身份验证（管理员会话或管理员 API 密钥）。

```bash
# 启用
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# 状态
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# 禁用
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

也可以通过仪表板操作：**设置 → 隧道 → Cloudflare**。

### 可选环境变量

| 变量                                                 | 用途                                                                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | 覆盖二进制文件路径。如果已设置且有效，OmniRoute 将使用该路径，而不是下载。                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | 传输协议（默认为 `http2`；还支持 `quic`、`auto`）。                                                                                       |
| `CLOUDFLARED_CONFIG`                                 | 本地管理的 cloudflared `config.yml` 的路径。设置后，OmniRoute 将运行**命名/持久化**隧道（`tunnel --config <path> run`），而不是快速隧道。 |
| `CLOUDFLARED_HOSTNAME`                               | 覆盖命名隧道报告的公共主机名（例如 `ai.example.com`）。未设置时，将从配置中的第一个 `ingress` 主机名读取。                                |

## 2. ngrok

`src/lib/ngrokTunnel.ts` 使用 **`@ngrok/ngrok` SDK**（进程内运行，不使用 CLI
子进程）。原生模块会在首次启动时延迟导入，因此缺少预构建二进制文件的平台不会导致应用在启动时崩溃。

### 前置条件

1. 在 <https://ngrok.com> 注册。
2. 从 ngrok 控制面板复制您的 authtoken。
3. 通过以下任一方式提供：
   - `.env`：`NGROK_AUTHTOKEN=<token>`，或
   - 控制面板：**设置 → 隧道 → ngrok**，或
   - REST 请求体（单次使用）：`{"action":"enable","authToken":"<token>"}`。

如果均未配置，状态将返回 `phase: "needs_auth"`。

### 通过 REST 启用/禁用

```bash
# 启用（使用环境变量中的 NGROK_AUTHTOKEN）
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# 使用内联令牌启用
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# 状态
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# 禁用
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

响应中包含分配的 `publicUrl`（例如
`https://abcd-1234.ngrok-free.app`）。自定义域名、区域和策略规则
必须在 ngrok 控制面板中配置——OmniRoute 本身仅将本地目标 URL 转发给
SDK。

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` 负责协调系统中的 `tailscale` CLI，通过
**Funnel**（Tailscale 为 serve 提供的公共互联网出口）公开本地 API 端口。
它支持完整的生命周期：安装、登录、启动守护进程、启用和禁用。

该实现会调用 `tailscale funnel --bg <port>`（后台模式）。
公共 URL 的格式为 `https://<machine>.<tailnet>.ts.net/`。

### 前置条件

1. 安装 Tailscale（或让 OmniRoute 安装——请参阅下方的 `install` 端点）。
2. 登录（使用 `tailscale login`，或通过 OmniRoute 的 `login` 端点）。
3. 在 Tailscale 管理控制台中为您的 tailnet 启用 Funnel：
   <https://login.tailscale.com/admin/settings/features>。

在 Linux 和 macOS 上，控制守护进程（`tailscaled`）需要使用 `sudo`。
POST 端点接受可选的 `sudoPassword` 字段，该字段会在调用期间转发到
OmniRoute 的 MITM 密码缓存（`getCachedPassword` / `setCachedPassword`）。
Windows 使用位于 `C:\Program Files\Tailscale\tailscale.exe` 的默认服务安装。

### REST 端点

Tailscale 提供的接口比其他后端更丰富，因为安装、登录、守护进程和隧道是相互独立的功能。

| 端点                                  | 方法   | 用途                                                     |
| ------------------------------------- | ------ | -------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | 聚合的隧道状态（`phase`、`tunnelUrl`、`apiUrl` 等）      |
| `/api/tunnels/tailscale/check`        | `GET`  | 底层检查：是否已安装？是否已登录？守护进程是否正在运行？ |
| `/api/tunnels/tailscale/install`      | `POST` | 安装 Tailscale（通过 SSE 流式传输进度事件）— Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | 在 Linux/macOS 上启动 `tailscaled`                       |
| `/api/tunnels/tailscale/login`        | `POST` | 开始登录流程；返回要在浏览器中打开的 `authUrl`           |
| `/api/tunnels/tailscale/enable`       | `POST` | 为 API 端口启动 Funnel                                   |
| `/api/tunnels/tailscale/disable`      | `POST` | 停止 Funnel                                              |

所有 Tailscale 端点都需要管理身份验证（请参阅 `routeUtils.ts ::
requireTailscaleAuth`）。

启用示例：

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

如果尚未在管理控制台中启用 Funnel，响应将包含
`funnelNotEnabled: true`，以及一个可在浏览器中打开的 `enableUrl`。

### 可选环境变量

| 变量            | 用途                            |
| --------------- | ------------------------------- |
| `TAILSCALE_BIN` | 覆盖 `tailscale` 二进制文件路径 |

## 端点摘要

| 端点                                  | 方法   | 请求体                              | 认证方式   |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | 管理员认证 |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | 管理员认证 |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | 管理员认证 |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | 管理员认证 |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | 管理员认证 |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | 管理员认证 |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | 管理员认证 |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | 管理员认证 |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | 管理员认证 |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | 管理员认证 |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | 管理员认证 |

没有统一的 `/api/settings/tunnels` 端点——每个后端都独立运行。

## OAuth 回调注意事项

通过隧道公开 OmniRoute 时，仪表板和 OAuth 流程必须使用**公共**主机名构建回调 URL，而不能使用 `localhost`。否则，OAuth 提供者会将用户重定向回其服务器无法访问的 URL，导致握手失败。

编辑仪表板和保存设置时，无需在 `NEXT_PUBLIC_BASE_URL` 中固定隧道主机名。经过身份验证的仪表板会使用绑定到会话的 CSRF 令牌发送同源非安全请求，因此登录后仍可使用临时的 Cloudflare Quick Tunnel 主机进行常规 UI 管理。

设置：

```bash
NEXT_PUBLIC_BASE_URL=https://<你的隧道主机>
```

并在启动 OAuth 流程前重启 OmniRoute。对于临时的 Cloudflare Quick Tunnel，每次重启后 URL 都会发生变化，因此在生产环境中使用 OAuth 时，建议优先选择带有预留域名的 ngrok 或 Tailscale Funnel。

## 健康状态和监控

仪表板会在**设置 → 隧道**下显示隧道状态：

- 活跃的后端及其当前 `phase`（`stopped`、`starting`、`running`、`needs_auth`、`error`）。
- 当前公共 URL 以及派生的 API URL（`<publicUrl>/v1`）。
- 隧道转发到的本地目标 URL。
- 最近一条错误消息（如果有）。

如需以编程方式监控，请轮询各后端的 `GET` 端点。允许同时运行多个后端；OmniRoute 会独立跟踪每个后端。

## 故障排除

### “找不到 cloudflared 二进制文件”

OmniRoute 会尝试在首次使用时自动安装。如果安装受阻（网络受限、无法访问 GitHub），请从 <https://github.com/cloudflare/cloudflared/releases> 手动下载 `cloudflared`，并设置 `CLOUDFLARED_BIN=/path/to/cloudflared`。

### “ngrok：需要 authtoken”

`phase: "needs_auth"` 表示未找到 authtoken。请在 `.env` 中设置 `NGROK_AUTHTOKEN`、通过仪表板进行配置，或在启用操作的 POST 请求体中传入 `authToken`。

### “tailscale：未启用 funnel”

当启用响应中包含 `funnelNotEnabled: true` 时，表示你的 tailnet 已禁用 Funnel。打开返回的 `enableUrl`（或管理控制台的功能页面），然后启用 Funnel。

### 隧道 URL 变化导致 OAuth 失效

请使用带有预留域名的 ngrok 或 Tailscale Funnel（两者都能为每个节点提供稳定地址）。Cloudflare Quick Tunnel 在设计上就是临时性的，不建议用于长期有效的 OAuth 回调。

### Linux/macOS 上的 Tailscale 权限被拒绝

`tailscaled` 需要 root 权限。请向相应的 POST 端点提供 `sudoPassword`，或自行运行守护进程（`sudo systemctl start tailscaled`）。

## 另请参阅

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — 用于出站流量的出站代理（1proxy、SOCKS5、HTTP）。
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — 环境变量的完整列表，包括
  `NEXT_PUBLIC_BASE_URL`。
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md)、
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — 稳定公共托管的隧道替代方案。
- 源代码：`src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`、
  `src/app/api/tunnels/`。
