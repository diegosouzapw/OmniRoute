# 完整指南：Cloudflare Tunnel 与 Zero Trust (Split-Port) (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/cloudflare-zero-trust-guide.md) · 🇪🇸 [es](../../es/docs/cloudflare-zero-trust-guide.md) · 🇫🇷 [fr](../../fr/docs/cloudflare-zero-trust-guide.md) · 🇩🇪 [de](../../de/docs/cloudflare-zero-trust-guide.md) · 🇮🇹 [it](../../it/docs/cloudflare-zero-trust-guide.md) · 🇷🇺 [ru](../../ru/docs/cloudflare-zero-trust-guide.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/cloudflare-zero-trust-guide.md) · 🇯🇵 [ja](../../ja/docs/cloudflare-zero-trust-guide.md) · 🇰🇷 [ko](../../ko/docs/cloudflare-zero-trust-guide.md) · 🇸🇦 [ar](../../ar/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [hi](../../hi/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [in](../../in/docs/cloudflare-zero-trust-guide.md) · 🇹🇭 [th](../../th/docs/cloudflare-zero-trust-guide.md) · 🇻🇳 [vi](../../vi/docs/cloudflare-zero-trust-guide.md) · 🇮🇩 [id](../../id/docs/cloudflare-zero-trust-guide.md) · 🇲🇾 [ms](../../ms/docs/cloudflare-zero-trust-guide.md) · 🇳🇱 [nl](../../nl/docs/cloudflare-zero-trust-guide.md) · 🇵🇱 [pl](../../pl/docs/cloudflare-zero-trust-guide.md) · 🇸🇪 [sv](../../sv/docs/cloudflare-zero-trust-guide.md) · 🇳🇴 [no](../../no/docs/cloudflare-zero-trust-guide.md) · 🇩🇰 [da](../../da/docs/cloudflare-zero-trust-guide.md) · 🇫🇮 [fi](../../fi/docs/cloudflare-zero-trust-guide.md) · 🇵🇹 [pt](../../pt/docs/cloudflare-zero-trust-guide.md) · 🇷🇴 [ro](../../ro/docs/cloudflare-zero-trust-guide.md) · 🇭🇺 [hu](../../hu/docs/cloudflare-zero-trust-guide.md) · 🇧🇬 [bg](../../bg/docs/cloudflare-zero-trust-guide.md) · 🇸🇰 [sk](../../sk/docs/cloudflare-zero-trust-guide.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/cloudflare-zero-trust-guide.md) · 🇮🇱 [he](../../he/docs/cloudflare-zero-trust-guide.md) · 🇵🇭 [phi](../../phi/docs/cloudflare-zero-trust-guide.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/cloudflare-zero-trust-guide.md) · 🇨🇿 [cs](../../cs/docs/cloudflare-zero-trust-guide.md) · 🇹🇷 [tr](../../tr/docs/cloudflare-zero-trust-guide.md)

---

本指南记录了保护 **OmniRoute** 并将应用安全暴露到互联网的网络基础设施黄金标准，**无需开放任何端口（Zero Inbound）**。

## 您的虚拟机上做了什么？

我们通过 PM2 以 **Split-Port** 模式启动了 OmniRoute：

- **端口 `20128`：** 仅运行 **API** `/v1`。
- **端口 `20129`：** 仅运行可视化管理 **Dashboard**。

此外，内部服务要求 `REQUIRE_API_KEY=true`，这意味着任何代理程序都必须发送在管理面板 API Keys 标签页中生成的有效 "Bearer Token" 才能访问 API 端点。

这使我们能够在网络中创建两条完全独立的规则。这就是 **Cloudflare Tunnel（cloudflared）** 发挥作用的地方。

---

## 1. 如何在 Cloudflare 上创建隧道

`cloudflared` 工具已安装在您的机器上。请按以下云端步骤操作：

1. 访问您的 **Cloudflare Zero Trust** 面板（One.dash.cloudflare.com）。
2. 在左侧菜单中，前往 **Networks > Tunnels**。
3. 点击 **Add a Tunnel**，选择 **Cloudflared**，命名为 `OmniRoute-VM`。
4. 屏幕会生成一个名为 "Install and run a connector" 的命令。**您只需复制 Token（`--token` 后面的长字符串）**。
5. 通过 SSH 登录您的虚拟机（或 Proxmox 终端），执行：
   ```bash
   # 启动并永久绑定隧道到您的账户
   cloudflared service install YOUR_HUGE_TOKEN_HERE
   ```

---

## 2. 配置路由（Public Hostnames）

在新创建隧道的界面中，进入 **Public Hostnames** 标签页，利用我们做的端口分离，添加 **两条** 路由：

### 路由 1：安全 API（受限）

- **Subdomain：** `api`
- **Domain：** `yourdomain.com`（选择您的实际域名）
- **Service Type：** `HTTP`
- **URL：** `127.0.0.1:20128` _（API 内部端口）_

### 路由 2：Zero Trust 管理面板（封闭）

- **Subdomain：** `omniroute` 或 `panel`
- **Domain：** `yourdomain.com`
- **Service Type：** `HTTP`
- **URL：** `127.0.0.1:20129` _（App/可视化内部端口）_

此时，"物理"连接已经解决。现在我们要真正加固它。

---

## 3. 使用 Zero Trust（Access）加固管理面板

比起在本地设置密码，更好地保护管理面板的方式是将它完全从开放互联网中移除。

1. 在 Zero Trust 面板中，前往 **Access > Applications > Add an application**。
2. 选择 **Self-hosted**。
3. 在 **Application name** 中，填入 `OmniRoute Panel`。
4. 在 **Application domain** 中，填入 `omniroute.yourdomain.com`（与"路由 2"中设置的一致）。
5. 点击 **Next**。
6. 在 **Rule action** 中选择 `Allow`。在 Rule 名称中填入 `Admin Only`。
7. 在 **Include** 中，"Selector" 选择 `Emails`，输入您的邮箱，例如 `admin@example.com`。
8. 保存（`Add application`）。

> **效果：** 如果您尝试打开 `omniroute.yourdomain.com`，将不再直接进入您的 OmniRoute 应用！而是跳转到一个精美的 Cloudflare 页面，要求输入邮箱地址。只有您（或您填写的邮箱）输入后，Outlook/Gmail 会收到一个 6 位临时验证码，验证通过后才会解除隧道限制，允许访问 `20129` 端口。

---

## 4. 使用速率限制（WAF）限制并保护 API

Zero Trust Dashboard 不适用于 API 路由（`api.yourdomain.com`），因为这是通过自动化工具（代理程序）进行的编程访问，无需浏览器。对于这种情况，我们将使用 Cloudflare 的主防火墙（WAF）。

1. 访问 Cloudflare **常规面板**（dash.cloudflare.com），进入您的域名。
2. 在左侧菜单中，前往 **Security > WAF > Rate limiting rules**。
3. 点击 **Create rule**。
4. **Name：** `Anti-Abuse OmniRoute API`
5. **If incoming requests match...**
   - Field 选择：`Hostname`
   - Operator：`equals`
   - Value：`api.yourdomain.com`
6. **With the same characteristics：** 保持 `IP`。
7. 限制条件（Limit）：
   - **When requests exceed：** `50`
   - **Period：** `1 minute`
8. 最后，在 **Action** 中选择 `Block`，并决定阻止持续 1 分钟还是 1 小时。
9. **Deploy**。

> **效果：** 在 60 秒内，任何人都不能向您的 API URL 发送超过 50 次请求。由于您运行着多个代理程序，其背后的消费已经受到速率限制和 Token 追踪，这只是互联网边缘层（Edge Layer）的一项措施，在流量进入隧道之前就保护您的本地部署实例免受压力过载。

---

## 完成

1. 您的虚拟机 **没有任何端口暴露** 在 `/etc/ufw` 中。
2. OmniRoute 仅通过 `cloudflared` 进行 HTTPS 出站通信，不直接接收来自外部的 TCP 连接。
3. 您的 OpenAI 请求已混淆处理，因为我们已全局配置通过 SOCKS5 代理发送（云端不关心 SOCKS5，因为流量是入站的）。
4. 您的 Web 管理面板具有邮件两步验证。
5. 您的 API 在边缘层受 Cloudflare 速率限制，且仅传输 Bearer Token。
