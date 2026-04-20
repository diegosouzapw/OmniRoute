# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

本指南记录了网络基础设施的黄金标准，以保护**OmniRoute**并安全地将您的应用程序公开到互联网，**无需打开任何端口（零入站）**。## What was done on your VM?

我们通过 PM2 在**Split-Port**模式下启用 OmniRoute：

-**端口 `20128`：**仅运行**API**`/v1`。-**端口`20129`：**仅运行**管理仪表板**。

此外，内部服务需要“REQUIRE_API_KEY=true”，这意味着没有代理可以在不发送仪表板 API 密钥选项卡中生成的合法“承载令牌”的情况下使用 API 端点。

这使我们能够创建两个完全独立的网络规则。这就是**Cloudflare 隧道 (cloudflared)**发挥作用的地方。---

## 1. How to Create the Tunnel in Cloudflare

您的计算机上已安装了“cloudflared”实用程序。在云中执行以下步骤：

1. 访问您的**Cloudflare 零信任**仪表板 (one.dash.cloudflare.com)。
2. 在左侧菜单中，转至**网络 > 隧道**。
3. 单击**添加隧道**，选择**Cloudflared**，并将其命名为“OmniRoute-VM”。
4. 它将在屏幕上生成一条名为“安装并运行连接器”的命令。**你只需要复制Token（`--token`后面的长字符串）**。
5. 通过 SSH 登录到您的虚拟机（或 Proxmox 终端）并执行： ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

仍然在新创建的隧道屏幕上，转到**Public Hostnames**选项卡并添加**两条**路由，利用我们所做的分隔：### Route 1: Secure API (Limited)

-**子域：**`api` -**域名：**`yourglobal.com`（选择您的真实域名）-**服务类型：**`HTTP` -**URL:**`127.0.0.1:20128` _（内部 API 端口）_### Route 2: Zero Trust Dashboard (Closed)

-**子域：**`omniroute` 或 `panel` -**域名：**`yourglobal.com` -**服务类型：**`HTTP` -**URL:**`127.0.0.1:20129` _（内部应用程序/可视端口）_

至此，“物理”连接已解决。现在让我们真正屏蔽它。---

## 3. Shielding the Dashboard with Zero Trust (Access)

没有任何本地密码比从开放互联网上完全删除对仪表板的访问权限更能保护您的仪表板。

1. 在零信任仪表板中，转至**访问 > 应用程序 > 添加应用程序**。
2. 选择**自托管**。
3. 在**应用程序名称**中，输入“OmniRoute Panel”。
4. 在**应用程序域**中，输入 `omniroute.yourglobal.com`（与“路由 2”中使用的相同）。
5. 单击**下一步**。
6. 在**规则操作**中，选择“允许”。对于规则名称，输入“仅限管理员”。
7. 在**包含**中的“选择器”下拉列表下，选择“电子邮件”并输入您的电子邮件，例如“admin@spgeo.com.br”。
8. 保存（“添加应用程序”）。

> **这做了什么：**如果您尝试打开 `omniroute.yourglobal.com`，它不再出现在您的 OmniRoute 应用程序上！它会出现在优雅的 Cloudflare 屏幕上，要求您输入电子邮件。仅当您（或您输入的电子邮件）在那里输入时，您才会在 Outlook/Gmail 中收到一个临时的 6 位数代码，用于解锁到端口“20129”的隧道。---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

零信任仪表板不适用于 API 路由 (`api.yourglobal.com`)，因为它是通过自动化工具（代理）进行的编程访问，无需浏览器。为此，我们将使用 Cloudflare 的主防火墙 (WAF)。

1. 访问**普通 Cloudflare 仪表板**(dash.cloudflare.com) 并转到您的域。
2. 在左侧菜单中，进入**安全 > WAF > 限速规则**。
3. 单击**创建规则**。4.**名称：**`OmniRoute API 反滥用` 5.**如果传入请求匹配...**
   - 选择字段：`主机名`
   - 运算符：`等于`
   - 值：`api.yourglobal.com`
4. 在**具有相同特征：**保留`IP`。
5. 对于限制（Limit）：-**当请求超过：**`50` -**时间：**`1 分钟`
6. 最后，在**Action**: `Block` 下，决定该阻止持续 1 分钟还是 1 小时。9.**部署**。

> **这做了什么：**没有人可以在 60 秒内向您的 API URL 发送超过 50 个请求。由于您运行多个代理，并且它们背后的消耗已经达到速率限制并跟踪令牌，因此这只是互联网边缘层的一项措施，可保护您的本地实例在流量进入隧道之前不会因热应力而停机。---

## Finalization

1. 您的虚拟机在“/etc/ufw”中**没有暴露的端口**。
2. OmniRoute 仅对话 HTTPS 出站 (`cloudflared`)，不接收来自外界的直接 TCP。
3. 您对 OpenAI 的请求被混淆了，因为我们全局配置它们通过 SOCKS5 代理（云不关心 SOCKS5，因为它是入站的）。
4. 您的网络仪表板具有通过电子邮件进行的双因素身份验证。
5. 您的 API 在边缘受到 Cloudflare 的速率限制，并且仅传输不记名令牌。
