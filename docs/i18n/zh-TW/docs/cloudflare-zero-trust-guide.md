# 完整指南：Cloudflare Tunnel 與 Zero Trust (Split-Port) (中文（繁體）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/cloudflare-zero-trust-guide.md) · 🇪🇸 [es](../../es/docs/cloudflare-zero-trust-guide.md) · 🇫🇷 [fr](../../fr/docs/cloudflare-zero-trust-guide.md) · 🇩🇪 [de](../../de/docs/cloudflare-zero-trust-guide.md) · 🇮🇹 [it](../../it/docs/cloudflare-zero-trust-guide.md) · 🇷🇺 [ru](../../ru/docs/cloudflare-zero-trust-guide.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/cloudflare-zero-trust-guide.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/cloudflare-zero-trust-guide.md) · 🇯🇵 [ja](../../ja/docs/cloudflare-zero-trust-guide.md) · 🇰🇷 [ko](../../ko/docs/cloudflare-zero-trust-guide.md) · 🇸🇦 [ar](../../ar/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [hi](../../hi/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [in](../../in/docs/cloudflare-zero-trust-guide.md) · 🇹🇭 [th](../../th/docs/cloudflare-zero-trust-guide.md) · 🇻🇳 [vi](../../vi/docs/cloudflare-zero-trust-guide.md) · 🇮🇩 [id](../../id/docs/cloudflare-zero-trust-guide.md) · 🇲🇾 [ms](../../ms/docs/cloudflare-zero-trust-guide.md) · 🇳🇱 [nl](../../nl/docs/cloudflare-zero-trust-guide.md) · 🇵🇱 [pl](../../pl/docs/cloudflare-zero-trust-guide.md) · 🇸🇪 [sv](../../sv/docs/cloudflare-zero-trust-guide.md) · 🇳🇴 [no](../../no/docs/cloudflare-zero-trust-guide.md) · 🇩🇰 [da](../../da/docs/cloudflare-zero-trust-guide.md) · 🇫🇮 [fi](../../fi/docs/cloudflare-zero-trust-guide.md) · 🇵🇹 [pt](../../pt/docs/cloudflare-zero-trust-guide.md) · 🇷🇴 [ro](../../ro/docs/cloudflare-zero-trust-guide.md) · 🇭🇺 [hu](../../hu/docs/cloudflare-zero-trust-guide.md) · 🇧🇬 [bg](../../bg/docs/cloudflare-zero-trust-guide.md) · 🇸🇰 [sk](../../sk/docs/cloudflare-zero-trust-guide.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/cloudflare-zero-trust-guide.md) · 🇮🇱 [he](../../he/docs/cloudflare-zero-trust-guide.md) · 🇵🇭 [phi](../../phi/docs/cloudflare-zero-trust-guide.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/cloudflare-zero-trust-guide.md) · 🇨🇿 [cs](../../cs/docs/cloudflare-zero-trust-guide.md) · 🇹🇷 [tr](../../tr/docs/cloudflare-zero-trust-guide.md)

---

本指南記錄了保護 **OmniRoute** 並將應用程式安全地暴露到網際網路的網路基礎設施黃金標準，**無需開放任何連接埠（Zero Inbound）**。

## 您的虛擬機器上做了什麼？

我們透過 PM2 以 **Split-Port** 模式啟動了 OmniRoute：

- **連接埠 `20128`：** 僅執行 **API** `/v1`。
- **連接埠 `20129`：** 僅執行可視化管理 **Dashboard**。

此外，內部服務要求 `REQUIRE_API_KEY=true`，這表示任何代理程式都必須傳送在管理面板 API Keys 標籤頁中產生的有效 "Bearer Token" 才能存取 API 端點。

這使我們能夠在網路中建立兩條完全獨立的規則。這就是 **Cloudflare Tunnel（cloudflared）** 發揮作用的地方。

---

## 1. 如何在 Cloudflare 上建立隧道

`cloudflared` 工具已安裝在您的機器上。請按以下雲端步驟操作：

1. 前往您的 **Cloudflare Zero Trust** 面板（One.dash.cloudflare.com）。
2. 在左側選單中，前往 **Networks > Tunnels**。
3. 點選 **Add a Tunnel**，選擇 **Cloudflared**，命名為 `OmniRoute-VM`。
4. 畫面會產生一個名為 "Install and run a connector" 的指令。**您只需複製 Token（`--token` 後面的長字串）**。
5. 透過 SSH 登入您的虛擬機器（或 Proxmox 終端機），執行：
   ```bash
   # 啟動並永久綁定隧道到您的帳戶
   cloudflared service install YOUR_HUGE_TOKEN_HERE
   ```

---

## 2. 設定路由（Public Hostnames）

在新建立隧道的介面中，進入 **Public Hostnames** 標籤頁，利用我們做的連接埠分離，新增 **兩條** 路由：

### 路由 1：安全 API（受限）

- **Subdomain：** `api`
- **Domain：** `yourdomain.com`（選擇您的實際網域）
- **Service Type：** `HTTP`
- **URL：** `127.0.0.1:20128` _（API 內部連接埠）_

### 路由 2：Zero Trust 管理面板（封閉）

- **Subdomain：** `omniroute` 或 `panel`
- **Domain：** `yourdomain.com`
- **Service Type：** `HTTP`
- **URL：** `127.0.0.1:20129` _（App/可視化內部連接埠）_

此時，"實體"連線已經解決。現在我們要真正加固它。

---

## 3. 使用 Zero Trust（Access）加固管理面板

比起在本機設定密碼，更好的保護管理面板方式是將它完全從開放網際網路中移除。

1. 在 Zero Trust 面板中，前往 **Access > Applications > Add an application**。
2. 選擇 **Self-hosted**。
3. 在 **Application name** 中，填入 `OmniRoute Panel`。
4. 在 **Application domain** 中，填入 `omniroute.yourdomain.com`（與"路由 2"中設定的一致）。
5. 點選 **Next**。
6. 在 **Rule action** 中選擇 `Allow`。在 Rule 名稱中填入 `Admin Only`。
7. 在 **Include** 中，"Selector" 選擇 `Emails`，輸入您的電子郵件，例如 `admin@example.com`。
8. 儲存（`Add application`）。

> **效果：** 如果您嘗試開啟 `omniroute.yourdomain.com`，將不再直接進入您的 OmniRoute 應用程式！而是跳轉到一個精美的 Cloudflare 頁面，要求輸入電子郵件地址。只有您（或您填寫的電子郵件）輸入後，Outlook/Gmail 會收到一個 6 位數臨時驗證碼，驗證通過後才會解除隧道限制，允許存取 `20129` 連接埠。

---

## 4. 使用速率限制（WAF）限制並保護 API

Zero Trust Dashboard 不適用於 API 路由（`api.yourdomain.com`），因為這是透過自動化工具（代理程式）進行的程式化存取，無需瀏覽器。對於這種情況，我們將使用 Cloudflare 的主要防火牆（WAF）。

1. 前往 Cloudflare **一般面板**（dash.cloudflare.com），進入您的網域。
2. 在左側選單中，前往 **Security > WAF > Rate limiting rules**。
3. 點選 **Create rule**。
4. **Name：** `Anti-Abuse OmniRoute API`
5. **If incoming requests match...**
   - Field 選擇：`Hostname`
   - Operator：`equals`
   - Value：`api.yourdomain.com`
6. **With the same characteristics：** 保持 `IP`。
7. 限制條件（Limit）：
   - **When requests exceed：** `50`
   - **Period：** `1 minute`
8. 最後，在 **Action** 中選擇 `Block`，並決定封鎖持續 1 分鐘還是 1 小時。
9. **Deploy**。

> **效果：** 在 60 秒內，任何人都不能向您的 API URL 發送超過 50 次請求。由於您執行著多個代理程式，其背後的消耗已經受到速率限制和 Token 追蹤，這只是網際網路邊緣層（Edge Layer）的一項措施，在流量進入隧道之前就保護您的本機部署執行個體免受壓力超載。

---

## 完成

1. 您的虛擬機器 **沒有任何連接埠暴露** 在 `/etc/ufw` 中。
2. OmniRoute 僅透過 `cloudflared` 進行 HTTPS 對外通訊，不直接接收來自外部的 TCP 連線。
3. 您的 OpenAI 請求已混淆處理，因為我們已全域設定透過 SOCKS5 代理傳送（雲端不關心 SOCKS5，因為流量是入站的）。
4. 您的 Web 管理面板具有電子郵件兩步驟驗證。
5. 您的 API 在邊緣層受 Cloudflare 速率限制，且僅傳輸 Bearer Token。
