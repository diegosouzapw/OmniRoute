# AgentBridge (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge 是 OmniRoute 的 MITM（中間人）代理，可攔截來自 IDE AI 代理程式的 HTTPS 流量，並透過 OmniRoute 的統一路由引擎重新路由。它支援 **10 種 IDE 代理程式**——Antigravity、Kiro、GitHub Copilot、GHE Copilot、OpenAI Codex、Cursor、Zed、Claude Code、Open Code，以及 Trae（調查中）——使 OmniRoute 成為市面上涵蓋範圍最廣的 AI 程式設計助理 MITM 代理。

**儀表板位置：** `/dashboard/tools/agent-bridge`
**側邊欄群組：** 工具（位於雲端代理程式之後）
**另請參閱：** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md)——即時監控所有遭攔截的流量；`docs/security/MITM-TPROXY-DECRYPT.md`（位於 git 中；不會編譯至 `/docs`）——由 `/api/tools/agent-bridge/tproxy` 路由驅動的 Linux TPROXY 透明解密擷取模式。

---

## §1 概述

### 什麼是 AgentBridge？

當 IDE 代理程式（例如 GitHub Copilot、Cursor、Claude Code）發出 API 呼叫時，它會直接連線至上游 AI 提供者（OpenAI、Anthropic 等）。AgentBridge 會在 TLS 層透明攔截該連線——無需變更任何代理程式設定——並重寫請求，使其透過 OmniRoute 傳送。

這表示您可以：

- **將任何代理程式重新路由至任何提供者**：Copilot 正在與 OpenAI 通訊？可將其重新導向 Anthropic Claude、Gemini，或 OmniRoute 的 352 個提供者中的任何一個。
- **套用模型對應**：在處理常式層級透明地將 `gemini-3-flash` → `claude-sonnet-4.7`。
- **觀察所有代理程式流量**：每個遭攔截的請求都會發佈至[流量檢查器](./TRAFFIC_INSPECTOR.md)。
- **套用 OmniRoute 韌性機制**：組合路由、斷路器、後援機制與成本追蹤也適用於 IDE 代理程式流量。

### 與市場產品的定位比較

| 功能           | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| -------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity    |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)     |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex   |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE     |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries |    —    |    ✓     |        —        |             ✓             |
| Claude Code    |    —    |    —     |        ✓        |             ✓             |
| Open Code      |    —    |    —     |        ✓        |             ✓             |
| Trae           |    —    |    —     |        —        |         🔍 調查中         |
| 儀表板 UI      |    ✓    |    ✗     |        ✗        |             ✓             |
| 流量檢查器     |    ✗    |    ✗     |        ✓        |             ✓             |
| OmniRoute 路由 |    ✗    |    ✗     |        ✗        |             ✓             |
| 模型對應 UI    |    ✗    |    ✗     |        ✗        |             ✓             |
| 略過清單       |    ✗    |    ✗     |        ✓        |             ✓             |
| 上游 CA 憑證   |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 架構

### 2.1 元件概覽

```
IDE 代理程式（VS Code / Cursor / 等）
    │  HTTPS（連接埠 443）
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← DNS 重新導向
    │
    ▼
src/mitm/server.cjs  （連接埠 443，CJS 子程序）
    │  依據 Host 標頭的 SNI 解析目標
    │  產生由 AgentBridge CA 簽署的各 SNI TLS 憑證
    ├── 符合略過清單？→ TCP 直通（不解密）
    ├── 符合目標？→ fetch → OmniRoute 路由器（連接埠 20128）
    │       └── handler.intercept() — TypeScript
    │               ├── 對請求主體／標頭執行 maskSecrets()
    │               ├── TrafficBuffer.push() — 發佈至流量檢查器
    │               └── fetchRouter() → /v1/chat/completions
    └── 不符合？→ TCP 直通（不解密）
```

### 2.2 MITM 伺服器（`src/mitm/server.cjs`）

核心 MITM 伺服器以 Node.js CJS 子程序執行（以避免重寫現有的 CJS 程式碼庫）。其功能如下：

- 監聽連接埠 443（需要權限或 `authbind`/`setcap`）
- 接收來自作業系統的 CONNECT 通道（透過 `/etc/hosts` DNS 重新導向）
- 產生由 AgentBridge CA（`DATA_DIR/mitm/ca.crt`）簽署的各 SNI TLS 憑證
- 透過 `targets/index.ts` 登錄，依據 Host 標頭解析目標代理程式
- 透過 HTTP 將請求分派至 `http://127.0.0.1:20128` 的 TypeScript 處理常式層

`TARGET_HOSTS` 會從 `DATA_DIR/mitm/targets.json` 載入（由 `targets/index.ts` 在啟動時寫入），因此無須重新啟動 CJS 伺服器即可動態更新。

> **根 CA 模型（#6684）。** 上述由 CA 簽署各 SNI 憑證的說明，
> 是在 #6684 中新增的持久化根 CA 模型（`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`，重複使用已在
> `src/mitm/tproxy/dynamicCert.ts` 中針對 TPROXY 驗證過的 CA／分葉憑證加密實作）——其取代了
> 較舊的單一靜態自簽分葉憑證（`src/mitm/cert/generate.ts`，其範圍仍
> 僅限於 antigravity 主機）；磁碟上僅有 `server.crt`/`server.key`
> 配對即代表使用此舊模型。**遷移行為**：全新安裝（不存在先前的
> `server.crt`）會自動採用根 CA 模型；已信任舊靜態分葉憑證的安裝則會
> 繼續使用該憑證，直到操作人員設定
> `MITM_ROOT_CA_ENABLED=true` 並重新啟動橋接器為止（`src/mitm/cert/migration.ts`
> 是純決策函式——可為
> **任何** 主機簽署分葉憑證的受信任 MITM CA，實質上比舊有固定 SAN 的分葉憑證擁有更大權限，因此
> 對於已信任舊憑證的安裝，絕不會在未告知的情況下切換）。CA 憑證會安裝
> 至舊分葉憑證所使用的相同 `omniroute-mitm.crt` 信任儲存區位置
> （`cert/install.ts::installCaCert`）——無須清理雙重信任。

### 2.3 處理常式基底（`src/mitm/handlers/base.ts`）

所有代理程式處理常式都擴充 `MitmHandlerBase`：

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // 受保護的輔助方法：fetchRouter、pipeSSE、hookBufferStart、hookBufferUpdate
}
```

每個處理常式都會在進行代理之前呼叫 `hookBufferStart()`，並在完成時呼叫 `hookBufferUpdate()`。這些方法會將 `InterceptedRequest` 項目推送至 `globalTrafficBuffer`（請參閱[流量檢查器](./TRAFFIC_INSPECTOR.md) §4）。

### 2.4 目標登錄（`src/mitm/targets/`）

每個代理程式都有一個宣告式目標檔案：

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

登錄（`targets/index.ts`）會匯出 `ALL_TARGETS`，並在啟動時產生 `DATA_DIR/mitm/targets.json`。

### 2.5 直通與略過清單（`src/mitm/passthrough.ts`）

**略過清單**（優先檢查，優先順序高於目標比對）：

- 預設模式：銀行主機、`.gov.`、OAuth/SSO 提供者（Okta、Auth0）等
- 使用者模式：儲存於資料庫資料表 `agent_bridge_bypass`
- 略過的主機會取得透明 TCP 通道——TLS **絕不會被解密**

**預設直通**（不符合目標且不在略過清單中）：

- 同樣會取得 TCP 通道——連線絕不會中斷
- 防止 AgentBridge 干擾一般系統 HTTPS 流量

路由優先順序：

```
略過清單 → 目標比對 → 直通
```

### 2.6 上游 CA 憑證（`src/mitm/upstreamTrust.ts`）

針對使用自訂 CA 的企業網路環境：

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

設定後，會使用額外的 CA 憑證設定 `undici` 的全域分派器，讓 AgentBridge 能夠透過企業 TLS 終止代理伺服器連線至上游提供者。

### 2.7 機密遮罩（`src/mitm/maskSecrets.ts`）

獨立的無塵室掃描器會在請求主體與認證標頭進入流量檢查器緩衝區或任何記錄
**之前**套用。它會執行單次線性掃描：

- 以 `sk-` / `ak-` / `pk-` 為前綴的權杖（OpenAI/Anthropic 樣式）
- RFC 6750 `Authorization: Bearer <token>` 認證，並優先比對完整權杖
- 通用長型不透明權杖（≥40 個字元），包括含點號與填補字元的形式

`sanitizeHeaders()` 會將保留的名稱轉為小寫，以確定性方式合併陣列值，移除
共用的逐跳／訊框處理拒絕清單（包括代理伺服器驗證），完整遮蔽 `cookie` 與
`set-cookie`，並將認證值交由掃描器處理。

---

## §3 設定

### 3.1 啟動／停止 MITM 伺服器

使用 `/dashboard/tools/agent-bridge` 中的 AgentBridge 伺服器卡片：

| 操作           | 說明                                                     |
| -------------- | -------------------------------------------------------- |
| 啟動伺服器     | 在連接埠 443 上產生 `src/mitm/server.cjs` 處理程序       |
| 停止伺服器     | 正常關閉子處理程序                                       |
| 重新啟動伺服器 | 停止後再啟動（套用目標變更）                             |
| 信任憑證       | 將 `DATA_DIR/mitm/ca.crt` 安裝至作業系統信任存放區       |
| 下載憑證       | 下載 `ca.crt` 以供手動安裝                               |
| 重新產生憑證   | 建立新的 CA 金鑰組（所有現有的個別代理程式憑證都將失效） |

### 3.2 信任憑證

在 IDE 接受 MITM 連線之前，作業系統必須信任 AgentBridge CA 憑證。

**Linux（NSS — Chrome/Firefox）：**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS（鑰匙圈）：**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows（certmgr）：**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

或者使用儀表板中的「信任憑證」按鈕（會針對您的作業系統執行適當的命令，並在需要時顯示 sudo 提示）。

#### 基於 Electron 的 IDE 會忽略作業系統信任存放區（`NODE_EXTRA_CA_CERTS`）

某些 IDE（尤其是 **Antigravity IDE**，以及其他衍生自 Electron／VS Code 的應用程式）內建
自己的 Node.js 執行環境，而該環境在對外進行 `fetch`/HTTPS 時**不會查詢作業系統信任存放區**。
在作業系統／NSS 層級信任 CA，對 IDE 的原生**後端**而言已經足夠
（例如使用作業系統 CA 組合包的 Go 語言伺服器），但 **Electron 前端**仍會
發生 TLS 失敗；即使 MITM 記錄顯示後端的啟動呼叫傳回 `200`，應用程式仍可能顯示為
_已登出_或出現_「連線錯誤」_。必須完成以下兩個步驟，兩者缺一不可：

1. 明確將執行環境指向 CA：
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **從該 shell 啟動 IDE。** 從桌面圖示／Dock／開始功能表啟動時，
   **不會**繼承 shell 的匯出變數，而 `~/.config/environment.d/*.conf` 只會在
   重新進行圖形介面登入後套用。請先完全結束 IDE——Electron 的單一執行個體鎖定機制意味著，
   第二次啟動只會將焦點切換至現有處理程序，新的環境變數將被忽略。

上述作業系統信任與 NSS 步驟仍然必要（某些驗證流程使用的 Chromium 網路堆疊會讀取
每位使用者的 NSS 存放區，且對 `*.googleapis.com` 設有自己的靜態憑證釘選，本機信任的 CA
可覆寫該設定）。`NODE_EXTRA_CA_CERTS` 則額外涵蓋 Node 的 `fetch` 路徑。

### 3.3 DNS 路由

對於每個要攔截的代理程式，其 API 主機都必須解析至 `127.0.0.1`。當您在設定精靈中切換某個代理程式的 DNS 時，AgentBridge 會自動管理 `/etc/hosts` 項目。

GitHub Copilot 的 `/etc/hosts` 項目範例：

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 模型對應

使用每張代理程式卡片中的模型對應表來定義來源 → 目標對應：

| 來源模型（代理程式原生） | 目標模型（OmniRoute） |
| ------------------------ | --------------------- |
| `gpt-4o`                 | `claude-sonnet-4.7`   |
| `*`（萬用字元）          | `claude-haiku-4.7`    |

萬用字元 `*` 會將任何無法辨識的模型對應至指定目標。資料會保存於 `agent_bridge_mappings` 資料表中。

> **提示——找出代理程式實際使用的模型 ID。** IDE 傳送的模型名稱可能不同於
> 其 UI 標籤，而且可能隨主要版本變更。例如，**Antigravity 2** 實際傳送的是
> `gemini-3.1-pro-low`、`gemini-pro-agent` 與 `gemini-3.1-flash-lite`，而不是
> 舊版文件中顯示的 `gemini-2.5-pro`。請在沒有相符對應的情況下傳送一則聊天訊息：
> MITM 會記錄確切傳入的 `model:`，並讓請求直接通過。對應該字面值後，
> 下一個請求便會被攔截並路由至您的目標。

### 3.5 風險通知

AgentBridge 會攔截 IDE 用於向上游提供者驗證身分的認證資訊（OAuth 權杖、API 金鑰）。這些資訊在寫入記錄前會**經過遮罩處理**（請參閱 §2.7），但 OmniRoute 的 MITM 層仍可看到它們。首次啟用每個代理程式時，會顯示可關閉的風險通知對話方塊。

### 3.6 維護與診斷

儀表板提供一張**維護與診斷**卡片（`AgentBridgeMaintenanceCard`，位於 `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`），用來呈現先前沒有 UI 的 MITM 操作路由。其副標題為：_「自我測試擷取管線、復原殘留的系統狀態，並在不同電腦之間移轉您的設定。」_ 卡片的用戶端輔助程式位於 `src/lib/inspector/agentBridgeMaintenanceApi.ts`。

| 按鈕         | 路由                                   | 功能                                                                                                                                   |
| ------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **診斷**     | `GET /api/tools/agent-bridge/diagnose` | 執行擷取管線自我測試，並顯示各項檢查的報告（✓/✗ + 修復提示）。                                                                         |
| **修復**     | `POST /api/tools/agent-bridge/repair`  | 復原因當機或 SIGKILL 而殘留的孤立 MITM 系統狀態（DNS 欺騙項目、根 CA、系統代理）。此操作具冪等性——當狀態乾淨時會回報「無需修復」。     |
| **移除 CA**  | `DELETE /api/tools/agent-bridge/cert`  | 取消信任 MITM 根 CA，並將其從作業系統信任存放區中移除（明確操作，具冪等性）。僅在 CA 目前受信任時顯示；需要進行行內「移除 CA？」確認。 |
| **匯出設定** | `GET /api/tools/agent-bridge/config`   | 下載可攜式設定 JSON（請參閱 §3.7）。                                                                                                   |
| **匯入設定** | `POST /api/tools/agent-bridge/config`  | 上傳先前匯出的設定 JSON（請參閱 §3.7）。                                                                                               |

每張代理程式卡片也都有自己的**還原預設值**按鈕（`POST
/api/tools/agent-bridge/agents/{id}/reset`）——只需按一下，即可針對個別代理程式復原：僅取消該
代理程式主機的欺騙、清除其已儲存的模型對應，並重設其 `dns_enabled`/`setup_completed`
狀態，使 IDE 在完全重新啟動後再次與真正的上游通訊。它**不會**變更
共用的 MITM 伺服器或根 CA（其他代理程式可能仍依賴它們）——這些項目仍可
透過伺服器卡片及上述的**移除 CA**動作進行存取。在 Windows 上，它也會盡力執行
`ipconfig /flushdns`，因為 Windows DNS Client 會快取 hosts 檔案項目，否則不會清除
剛移除的欺騙項目。

**診斷檢查**（`src/mitm/inspector/diagnostics.ts` 中的 `summarizeDiagnostics()`）。該路由會針對每個項目執行有副作用的探測，並將布林值傳入純摘要器；傳回單一 `healthy` 判定，以及各失敗項目的提示：

| 檢查名稱           | 驗證內容                                    | 失敗時的提示                                                                                                   |
| ------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `server-running`   | MITM 伺服器程序正在執行                     | 「MITM 伺服器未執行。請從 AgentBridge 分頁啟動它。」                                                           |
| `server-reachable` | MITM 伺服器在其連接埠上接受連線（TCP 探測） | 「MITM 伺服器未在其連接埠上接受連線。請檢查該連接埠是否可用，以及您是否具備繫結該連接埠的權限。」              |
| `cert-exists`      | MITM 憑證已在磁碟上產生                     | 「尚未產生 MITM 憑證。請從 AgentBridge 分頁產生憑證。」                                                        |
| `cert-trusted`     | MITM 根 CA 位於作業系統信任存放區中         | 「作業系統信任存放區並不信任 MITM 根 CA，因此 TLS 攔截將會失敗。請從 AgentBridge 分頁信任該憑證。」            |
| `dns-configured`   | 目標主機名稱已在 `/etc/hosts` 中遭到欺騙    | 「目標主機名稱未在 /etc/hosts 中遭到欺騙，因此流量永遠不會抵達代理伺服器。請為您想要擷取的代理程式啟用 DNS。」 |

**孤立狀態橫幅：**當頁面偵測到當機後殘留的狀態（DNS 欺騙 / CA / 系統代理）時，卡片會顯示琥珀色橫幅——*「先前的工作階段留下了系統狀態（DNS 欺騙、CA 或系統代理）。請執行「修復」以將其清除。」*——並醒目標示**修復**按鈕。`Repair` 是應用程式層中對應於 ProxyBridge `--cleanup` 旗標的功能（它會委派給 `src/mitm/manager.ts` 中的 `repairMitm()`）。

> MITM 根 CA 會在停止／啟動之間保持安裝狀態，以避免重複出現 sudo
> 提示（行為與 mitmproxy/Charles 相同），因此移除它必須透過明確的
> **移除 CA**動作，而不是在停止時自動執行。

### 3.7 可攜式設定匯入／匯出

AgentBridge 可將**操作人員可調整的**狀態序列化為具版本資訊的 JSON Blob，以便在不同機器上複製設定。序列化程式為 `src/lib/inspector/configPortability.ts`（`exportConfig()` / `importConfig()`），並由 `AgentBridgeConfigSchema` 驗證。

匯出內容僅包含三個部分（刻意**不會**匯出內建預設值，因此匯入絕不會複製它們或與其衝突）：

| 欄位             | 來源                                                   | 備註                                                                  |
| ---------------- | ------------------------------------------------------ | --------------------------------------------------------------------- |
| `bypassPatterns` | 使用者定義的略過模式（`agent_bridge_bypass`）          | 不包含預設的銀行／政府／Okta 模式                                     |
| `customHosts`    | Traffic Inspector 自訂主機（`inspector_custom_hosts`） | 每個項目：`{ host, kind: "llm"\|"app"\|"custom", label? }`            |
| `agentMappings`  | 各代理程式的模型對應（`agent_bridge_mappings`）        | 針對每個具有對應設定的代理程式：`{ [agentId]: [{ source, target }] }` |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**匯入行為**（`POST /api/tools/agent-bridge/config`）：略過模式和各代理程式的對應設定會**整批取代**；自訂主機則以**冪等方式**新增（`INSERT OR IGNORE`）。回應會回報各類別已套用的數量：

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

設定中**不包含**：伺服器執行狀態、憑證路徑、各代理程式的 DNS 狀態、上游 CA 路徑，以及 TPROXY 設定——這些屬於主機／執行階段狀態，而非可攜式偏好設定。

---

## §4 各代理程式參考資訊

| #   | 代理程式           | 狀態      | 攔截的主機                                                         | 驗證類型       |
| --- | ------------------ | --------- | ------------------------------------------------------------------ | -------------- |
| 1   | **Antigravity**    | ✅ 支援   | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth |
| 2   | **Kiro (AWS)**     | ✅ 支援   | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4      |
| 3   | **GitHub Copilot** | ✅ 支援   | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth   |
| 4   | **OpenAI Codex**   | ✅ 支援   | `api.openai.com`（Codex 路徑）、`chatgpt.com`                      | OpenAI 金鑰    |
| 5   | **Cursor IDE**     | ✅ 支援   | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth   |
| 6   | **Zed Industries** | ✅ 支援   | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth      |
| 7   | **Claude Code**    | ✅ 支援   | `api.anthropic.com`（選擇啟用）                                    | Anthropic 金鑰 |
| 8   | **Open Code**      | ✅ 支援   | `openrouter.ai`, `api.openai.com`（zen 路徑）                      | API 金鑰       |
| 9   | **Trae**           | 🔍 調查中 | 待定 — 請參閱 §8                                                   | 待定           |

### 設定精靈步驟（各代理程式）

每張代理程式卡片都有一個分為 3 個步驟的設定精靈：

1. **驗證先決條件** — 伺服器是否正在執行？憑證是否受信任？IDE 是否已安裝（自動偵測）？
2. **啟用 DNS** — 新增 `/etc/hosts` 項目（需要 sudo）。會明確顯示將新增哪些行。
3. **對應模型** — 選用的模型對應表。接受萬用字元。

### 代理程式偵測

對於代理程式 1–8，AgentBridge 會嘗試自動偵測 IDE 安裝：

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// 傳回：{ installed: boolean, version?: string, path?: string }
```

偵測會使用作業系統特定的路徑和二進位檔檢查（例如，Copilot 使用 `code --list-extensions | grep github.copilot`，Antigravity 使用 `~/.config/antigravity/`）。

---

## §5 安全性

### 套用的強制規則

| 規則                              | 套用方式                                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | 所有處理常式錯誤都會在回應或寫入緩衝區之前進行清理                                       |
| **#13** Shell 環境傳遞            | `/etc/hosts` 編輯使用 `env` 選項，不對路徑進行字串插值                                   |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/agent-bridge/` 為 LOCAL_ONLY + SPAWN_CAPABLE，在驗證前強制限制為回送介面存取 |

### 敏感主機的略過清單

略過清單可確保金融機構、OAuth/SSO 提供者及其他敏感主機的流量**永遠不會被解密**。其 TLS 流量會透過透明 TCP 通道傳遞，因此 OmniRoute 永遠無法看到純文字內容。

預設略過模式包括：

- `*.bank.*`、`*.gov.*`（金融／政府）
- `*.okta.com`、`*.auth0.com`、`*.microsoft.com`（SSO／身分識別）
- `*.apple.com`、`*.icloud.com`（Apple 系統服務）

使用者新增的略過模式儲存在 `agent_bridge_bypass` 資料表中，其優先順序高於其他所有設定。

### 機密資訊遮罩

會套用來自 `src/mitm/maskSecrets.ts` 的 `maskSecrets()`：

- 在每個請求主體傳入 `TrafficBuffer.push()` 之前
- 在記錄或廣播每個標頭之前

模式：帶有 `sk-`／`ak-`／`pk-` 前綴的權杖、`Bearer` 權杖，以及長度 ≥40 個字元的一般權杖。

### 上游 CA 憑證

設定 `AGENTBRIDGE_UPSTREAM_CA_CERT` 後，系統會在啟動時讀取該檔案。如果路徑存在但檔案無法讀取，AgentBridge 會記錄明確的錯誤並拒絕啟動（防止企業環境中出現無提示的 TLS 失敗）。

### 已知限制

- **連接埠 443 需要權限**：在 Linux 上，AgentBridge 需要於 Node 二進位檔設定 `setcap 'cap_net_bind_service=+ep'`，或透過 `authbind` 執行。設定精靈會顯示作業系統特定的指示。
- **需要重新啟動 IDE**：DNS 重新導向後，必須重新啟動 IDE，新主機解析才會生效。
- **硬編碼的 OAuth 權杖**：某些代理程式（Kiro、Antigravity）會在本機儲存 OAuth 重新整理權杖。這些對 AgentBridge 而言是透明的——它會在每個請求中看到 Bearer 權杖，並在記錄前將其遮罩。
- **Electron 前端需要 `NODE_EXTRA_CA_CERTS`**：前端在隨附 Node/Electron 執行階段上執行的 IDE 會忽略作業系統／NSS 信任存放區，必須從已設定 `NODE_EXTRA_CA_CERTS` 的 shell 啟動（請參閱 §3.2）。缺少此設定時的症狀：IDE 後端驗證成功（MITM 顯示 `200`），但 UI 仍維持登出狀態。
- **同一 IDE 的多個安裝彼此獨立**：系統安裝（例如 `/usr/share/antigravity/antigravity`）與使用者本機的「Full」安裝（例如 `~/AntigravityIDE_Full/antigravity-ide`）是各自使用獨立執行階段的不同程序——每個程序都必須在注入 CA 後重新啟動。重新啟動前，請透過二進位檔路徑確認目前執行的是哪一個。
- **身分是由代理程式的系統提示設定，而不是由路由模型設定**：當您將代理程式的模型重新對應至不同提供者時，回覆仍會宣稱其為代理程式的原生身分（例如 Antigravity 回答「我由 Gemini 驅動」），因為 IDE 會將該資訊注入系統提示。請在 `call_logs`／`proxy_logs` 中確認實際後端（`provider`、`model`、`target_format`），而不是詢問模型本身是誰。

---

## §6 疑難排解

### 連接埠 443 衝突

如果已有其他程序正在監聽連接埠 443（網頁伺服器、VPN 等）：

```bash
lsof -i :443          # 尋找該程序
sudo fuser -k 443/tcp  # 強制終止（請謹慎使用）
```

或者，在 AgentBridge 設定中配置非特權連接埠，並設定 `iptables` / `pf` 重新導向規則。

### 憑證不受信任

如果啟動 AgentBridge 後 IDE 顯示 TLS 錯誤：

1. 確認憑證已安裝：`security find-certificate -c "OmniRoute AgentBridge"`（macOS）或 `certutil -L -d sql:$HOME/.pki/nssdb`（Linux/NSS）
2. 某些應用程式會維護自己的信任存放區（Firefox、Linux 上的 Chrome）。再次執行「Trust Cert」，並檢查 NSS/Firefox 專用的憑證存放區。
3. 信任憑證後重新啟動 IDE——進行中的 TLS 工作階段會使用舊的信任狀態。

### 儘管 CA 受信任，IDE 仍登出／顯示「connection error」

症狀：重新導向 DNS 並信任 CA 後，基於 Electron 的 IDE（例如 Antigravity）
啟動時顯示為**已登出**或顯示驗證／連線錯誤，但 MITM 記錄顯示
啟動呼叫（`loadCodeAssist`、`fetchAvailableModels`，…）均傳回 `200`。

原因：IDE **內附的 Node/Electron 執行階段會忽略作業系統的信任存放區**。原生
後端（Go 語言伺服器）信任作業系統 CA 並能完成驗證，但 Electron 前端
不信任——因此 UI 認為其處於離線狀態。

修正方式（兩個步驟皆須執行）：匯出 `NODE_EXTRA_CA_CERTS=<ca.crt>`，**並從該
shell 重新啟動 IDE**，不要從桌面圖示啟動。請先完全結束 IDE——Electron 的單一執行個體鎖定機制
表示第二次啟動只會聚焦既有程序，而新的環境設定會被忽略。請參閱 §3.2。
這與一份尚未結案的上游報告情況相同：獨立代理程式可透過 MITM 運作，但 IDE
版本在相同設定下會失敗。

### DNS 尚未傳播

檢查 `/etc/hosts` 是否已更新：

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

清除 DNS 快取：

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux（systemd-resolved）
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### 未偵測到 IDE

自動偵測會使用常見的安裝路徑。如果偵測失敗，但 IDE 已安裝：

- 檢查 IDE 二進位檔是否位於非標準位置
- Setup Wizard 仍可運作——偵測失敗只表示徽章不會顯示安裝路徑

### 處理常式錯誤（上游擷取失敗）

如果 AgentBridge 已攔截請求，但所有請求皆失敗：

1. 確認至少有一個提供者已在 `/dashboard/providers` 連線
2. 檢查 OmniRoute 伺服器記錄：`.env` 中的 `APP_LOG_LEVEL=debug`
3. 確認 `OMNIROUTE_BASE_URL` 指向正確的路由器端點（預設值：`http://127.0.0.1:20128`）

---

## §7 API 參考

所有路由皆為 `LOCAL_ONLY`（僅限迴路位址，並於驗證前強制執行）及 `SPAWN_CAPABLE`。請參閱 `src/server/authz/routeGuard.ts`。

基礎路徑：`/api/tools/agent-bridge/`

| 方法                | 路徑                                           | 說明                                                                                                     |
| ------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | 全域伺服器狀態 + 各代理程式的偵測結果／狀態                                                              |
| GET                 | `/api/tools/agent-bridge/agents`               | 列出已註冊的代理程式（id、名稱、主機、可用性、狀態）                                                     |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | 單一代理程式的狀態（目標設定 + 偵測結果 + 儲存的狀態）                                                   |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | 更新代理程式的 `setup_completed`                                                                         |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | 執行代理程式偵測探查（`installed`、`version?`、`path?`）                                                 |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | 啟用／停用代理程式的 DNS（`{enabled: boolean}`）                                                         |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | 代理程式的模型對應                                                                                       |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | 取代模型對應                                                                                             |
| POST                | `/api/tools/agent-bridge/agents/{id}/reset`    | 還原預設值：取消此代理程式的 DNS 偽裝、清除其對應，並重設其狀態（請參閱 §3.6）                           |
| POST                | `/api/tools/agent-bridge/server`               | 啟動／停止／重新啟動伺服器（`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`）      |
| GET                 | `/api/tools/agent-bridge/cert`                 | 憑證狀態（`exists`、`trusted`、`path`）                                                                  |
| POST                | `/api/tools/agent-bridge/cert`                 | 信任（安裝）MITM 根 CA                                                                                   |
| DELETE              | `/api/tools/agent-bridge/cert`                 | 取消信任（移除）MITM 根 CA — 冪等操作（請參閱 §3.6）                                                     |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | 重新產生自我簽署的 MITM 憑證                                                                             |
| GET                 | `/api/tools/agent-bridge/cert/download`        | 以串流方式傳送 PEM 憑證供下載                                                                            |
| GET                 | `/api/tools/agent-bridge/bypass`               | 列出略過模式（`default` + `user`）                                                                       |
| POST                | `/api/tools/agent-bridge/bypass`               | 整批取代使用者定義的略過模式                                                                             |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | 移除單一使用者定義的略過模式                                                                             |
| GET                 | `/api/tools/agent-bridge/diagnose`             | 擷取管線自我測試（請參閱 §3.6）                                                                          |
| POST                | `/api/tools/agent-bridge/repair`               | 復原殘留的 MITM 系統狀態（請參閱 §3.6）                                                                  |
| GET                 | `/api/tools/agent-bridge/config`               | 匯出可攜式設定 JSON（請參閱 §3.7）                                                                       |
| POST                | `/api/tools/agent-bridge/config`               | 匯入可攜式設定 JSON（請參閱 §3.7）                                                                       |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | 取得已設定的上游 CA 路徑                                                                                 |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | 驗證並保存上游 CA 路徑                                                                                   |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | 僅驗證（試執行）上游 CA 路徑 — 不會保存                                                                  |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | TPROXY 透明解密擷取模式 — 請參閱 `docs/security/MITM-TPROXY-DECRYPT.md`（位於 git 中；未編譯至 `/docs`） |

完整的 OpenAPI 結構描述：`docs/openapi.yaml` → 標籤 `AgentBridge`。

---

## §8 路線圖

### Trae 調查

Trae 是一款相對較新的 AI 程式設計助理。在實作處理器之前：

1. 在 VS Code / JetBrains 市集或獨立應用程式中識別其二進位檔／擴充功能
2. 使用 mitmproxy 擷取流量，以找出 API 主機與端點格式
3. 確定驗證機制
4. 根據服務條款與 API 的可探索性評估是否繼續

在調查完成之前，儀表板中的 Trae 卡片會顯示「調查中」徽章及「回報可行性」連結。位於 `src/mitm/handlers/trae.ts` 的處理器存根會擲回結構化的 `尚未實作` 錯誤。

### 待辦代理工具（需要 MITM — 不支援自訂基礎 URL）

以下工具的目前版本不支援自訂基礎 URL，因此 MITM 是唯一的攔截途徑。可行性評估仍在進行中：

- **Windsurf**（Codeium/Cognition）
- **Amp**（Sourcegraph）
- **Amazon Q / Kiro CLI**（AWS Bedrock — 與 Kiro IDE 不同）
- **Cowork**（Anthropic 桌面版）

注意：GitHub Copilot CLI ≥v1.0.19 支援 `COPILOT_PROVIDER_BASE_URL` — 對該工具請使用直接設定，而非 MITM。
