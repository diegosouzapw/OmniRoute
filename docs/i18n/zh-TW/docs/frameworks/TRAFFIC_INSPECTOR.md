# Traffic Inspector (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector 是 OmniRoute 內建的 HTTPS 流量偵錯工具——類似 Charles Proxy / mitmweb / HTTP Toolkit，但具備 **LLM 感知能力**與**代理程式感知能力**。它位於 `/dashboard/tools/traffic-inspector`，最多可同時接收來自 5 個擷取來源的即時流量。

**儀表板位置：** `/dashboard/tools/traffic-inspector`
**側邊欄群組：** 工具（位於 AgentBridge 之後）
**另請參閱：** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md)——AgentBridge 是擷取模式 1。

---

## §1 概覽

### Traffic Inspector 的獨特之處

| 功能                                                          | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
| ------------------------------------------------------------- | :-----: | :-----: | :-----: | :-----------------------------: |
| 網頁式                                                        |    ✓    |    ✗    |    ✗    |                ✓                |
| 開放原始碼                                                    |    ✓    |    ✗    |  部分   |                ✓                |
| **代理程式感知**（知道請求是否來自 Antigravity/Copilot/等）   |    ✗    |    ✗    |    ✗    |                ✓                |
| **LLM 感知**（解析 OpenAI/Anthropic/Gemini 格式、權杖、模型） |    ✗    |    ✗    |    ✗    |                ✓                |
| **模型對應關係可見**（gemini-3-flash → claude-sonnet-4.7）    |    ✗    |    ✗    |    ✗    |                ✓                |
| **區分 Proxy/上游延遲**                                       |  部分   |    ✗    |    ✗    |                ✓                |
| **與 OmniRoute 整合**路由、備援與成本                         |    ✗    |    ✗    |    ✗    |                ✓                |
| **系統全域 Proxy 偵錯**（機器上的任何應用程式）               |    ✓    |    ✓    |    ✓    |                ✓                |
| **自訂主機擷取**（各主機的 DNS 重新導向）                     |    ✓    |    ✓    |    ✓    |                ✓                |
| **HTTP_PROXY 環境變數模式**                                   |    ✓    |    ✓    |    ✓    |                ✓                |
| **對話檢視**（多輪訊息泡泡、tool_use/tool_result）            |    ✗    |    ✗    |    ✗    |                ✓                |
| **SSE 串流合併器**（從差異事件重建）                          |    ✗    |    ✗    |    ✗    |                ✓                |
| **工作階段錄製**（可命名、可匯出為 .har/.jsonl）              |    ✗    |    ✓    |    ✓    |                ✓                |

### 架構簡述

`TrafficBuffer`（`src/mitm/inspector/buffer.ts`）是一個共用的記憶體內環形緩衝區（預設 1000 筆項目，可透過 `INSPECTOR_BUFFER_SIZE` 設定）。所有擷取來源都會透過 `push()` 寫入其中。緩衝區使用 `kindDetector.ts` 對每個項目進行分類（判斷其是否為 LLM 請求）、計算 `contextKey`（系統提示詞的 SHA-256 指紋），並透過 `globalTrafficBuffer.subscribe()` 廣播給所有 WebSocket 訂閱者。儀表板透過 `GET /api/tools/traffic-inspector/ws` 連線，並在連線時接收快照，後續則接收 `new`/`update`/`clear` 事件。

---

## §2 擷取模式

Traffic Inspector 支援 **5 個同時運作的擷取來源**。每個來源皆可獨立切換。每個 `InterceptedRequest`（`src/mitm/inspector/types.ts`）中的 `source` 欄位皆為 `"agent-bridge"`、`"custom-host"`、`"http-proxy"`、`"system-proxy"` 或 `"tproxy"` 其中之一。

### 模式 1 — AgentBridge（預設，永遠開啟）

**來源：** AgentBridge 處理常式（`src/mitm/handlers/base.ts`）
**機制：** `MitmHandlerBase` 中的每次 `intercept()` 呼叫都會在轉送前呼叫 `hookBufferStart()`，並在完成時呼叫 `hookBufferUpdate()`。無需額外設定——AgentBridge 一開始執行即可運作。
**涵蓋範圍：** AgentBridge 中設定的 9 個 IDE 代理程式
**注意：** `InterceptedRequest` 中的 `source` 欄位 = `"agent-bridge"`

### 模式 2 — 自訂主機（DNS 重新導向）

**來源：** 使用者定義的主機清單（`inspector_custom_hosts` 資料表）
**機制：** 透過 UI 新增主機時，會將 `127.0.0.1 <host>` 加入 `/etc/hosts`（需要 sudo）。現有的 AgentBridge MITM 伺服器（連接埠 443）會動態為新主機產生 SNI 憑證。
**涵蓋範圍：** 任何使用已新增主機的應用程式——無需變更應用程式設定
**注意：** `source` = `"custom-host"`

使用案例範例：

- 監控 Python 指令碼對 `api.openai.com` 的存取
- 偵錯 `my-internal-llm.company.com`
- 擷取同一網路上行動裝置的流量（透過 ARP 欺騙——進階）

### 模式 3 — HTTP_PROXY 監聽器（連接埠 8080）

**來源：** 使用 `HTTP_PROXY`/`HTTPS_PROXY` 環境變數的應用程式
**機制：** 位於連接埠 8080 的次要監聽器（`src/mitm/inspector/httpProxyServer.ts`），作為標準的明確 HTTP/HTTPS Proxy。接受 `CONNECT` 通道（HTTPS）與直接 HTTP 請求。
**涵蓋範圍：** 任何遵循 `HTTP_PROXY` 環境變數的應用程式——無需變更 DNS，也不需要 sudo
**注意：** `source` = `"http-proxy"`

```bash
# 快速擷取單一命令的流量：
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# 在 shell 工作階段中持續擷取：
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**TLS 限制：** HTTPS `CONNECT` 通道預設只會擷取中繼資料（主機、連接埠、時間資訊）——不會解密 TLS 主體。若要完整檢查主體，請啟用「在 Proxy 模式中解密 HTTPS」切換開關（需選擇加入，且必須信任 AgentBridge 憑證）。

**連接埠衝突：** 如果連接埠 8080 已被使用，AgentBridge 會傳回包含結構化錯誤的 409。可透過 `INSPECTOR_HTTP_PROXY_PORT` 環境變數變更連接埠。

### 模式 4 — 全系統 Proxy（進階，選擇加入）

**來源：** 作業系統層級的 Proxy 設定（套用至機器上的所有應用程式）
**機制：** 使用作業系統 API，將所有 HTTP/HTTPS 流量重新導向至 HTTP_PROXY 監聽器：

- **macOS：** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux：** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows：** `netsh winhttp set proxy 127.0.0.1:8080`
  **涵蓋範圍：** 機器上所有遵循系統 Proxy 設定的應用程式
  **注意：** `source` = `"system-proxy"`

**安全機制：**

- 自動停用計時器（預設 30 分鐘，可透過 `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES` 設定）
- 先前的系統 Proxy 狀態會儲存在資料庫中，並在還原時恢復
- 若使用者在功能啟用期間離開頁面，儀表板會顯示「正在還原系統 Proxy」提示
- UI 會顯示 `⚠ 進階` 徽章與明確的確認核取方塊

### 模式 5 — TPROXY 透明解密（Linux、root、選擇加入）

**來源：** 核心 TPROXY + 原則路由（`src/mitm/tproxy/`）
**機制：** 在 `mangle OUTPUT` 中標記前往目標連接埠（預設為 `443`）的新本機對外 TCP 連線，`ip rule` 會將已標記的封包重新路由至本機傳遞，而 `mangle PREROUTING` 的 `TPROXY` 目標會將這些封包交給透明（**IP_TRANSPARENT**）監聽器（預設連接埠為 `8443`）。該監聽器會使用動態 CA **依每個 SNI 主機名稱隨需簽發**的葉憑證來終止 TLS、擷取已解密的交換內容，並將請求重新加密後轉送至原始目的地。
**涵蓋範圍：** 目標連接埠上的**任意**目的地主機——無需偽造 `/etc/hosts`、無需 `HTTP_PROXY` 環境變數，也無需修改全系統 Proxy。遭攔截的程序不需要變更任何設定，但必須信任動態 CA。
**注意：** `source` = `"tproxy"`

**需求：** 僅限 Linux（**IP_TRANSPARENT** 僅適用於 Linux）、**CAP_NET_ADMIN** 能力（root），以及必須使用 C 工具鏈建置的原生 N-API 附加元件（`npm run build:native:tproxy`）。當無法使用時，儀表板上的切換開關會停用，並顯示工具提示「TPROXY 解密需要 Linux + root + 原生附加元件」。防火牆規則會以交易方式套用／還原（當機絕不會留下 `mangle` 規則），並在重新開機時清除。基於 SO_MARK 的防迴圈機制可防止 Proxy 自身重新加密後的轉送流量再次遭到攔截。

這是一個規模龐大的子系統，並有專屬的操作指南——如需完整的防火牆設定方法、依 SNI 動態產生的 CA + 信任存放區安裝程式、僅限本機的路由、防迴圈細節，以及設定結構描述，請參閱 `docs/security/MITM-TPROXY-DECRYPT.md`（位於 git 中；不會編譯至 `/docs`）。此切換開關由 `GET / POST / DELETE /api/tools/agent-bridge/tproxy` 驅動（注意：此路由位於 AgentBridge 前綴下，而非 Traffic Inspector 前綴下）。

### 擷取模式比較

| 模式           | 設定                             |     需要 Sudo？      | 適用範圍                   | 備註                                                                                                  |
| -------------- | -------------------------------- | :------------------: | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1. AgentBridge | 自動                             | 一次（憑證 + hosts） | 9 個 IDE 代理程式          | 預設啟用                                                                                              |
| 2. 自訂 Hosts  | 逐一輸入主機                     |   是（hosts 檔案）   | 使用該主機的任何應用程式   | 持久儲存於資料庫                                                                                      |
| 3. HTTP_PROXY  | `export HTTPS_PROXY=...`         |          否          | 遵循環境變數設定的應用程式 | 連接埠 8080，預設不進行 TLS 解密                                                                      |
| 4. 全系統      | 切換開關 + 確認                  |          是          | 機器上的所有應用程式       | 30 分鐘後自動停用                                                                                     |
| 5. TPROXY 解密 | 切換開關（Linux + 原生附加元件） | 是（root + 安裝 CA） | 目標連接埠上的任何主機     | 解密任意主機；預設停用——請參閱 `docs/security/MITM-TPROXY-DECRYPT.md`（git 中提供；未編譯至 `/docs`） |

---

## §3 UI

### 3.1 版面配置

```
┌─ 流量檢查器 ──────────────────────────────────────────────────────────┐
│ ┌─ 擷取來源工具列 ────────────────────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ 自訂主機 (3)]  [○ HTTP_PROXY]  [○ 系統]    │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ 篩選／控制列 ─────────────────────────────────────────────────┐   │
│ │ 設定檔：(●) 僅 LLM  (○) 自訂  (○) 全部                          │   │
│ │ [⎉ 暫停] [🗑 清除] [⬇ .har] [● 錄製工作階段]    ● 即時 482/1k │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ 請求清單（可調整大小）          ║ 詳細資料窗格                       ▲ │
│ ────────────────────────────── │ ║ [對話][標頭][請求]                 │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [回應][計時][LLM][統計資料]         │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 自訂   ║                                       │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 請求清單（左側面板）

- **虛擬化**（`useVirtualList` + `ResizeObserver`）：可處理 1000 個項目而不會凍結
- **自動捲動**，並提供切換開關，可在檢查時暫停
- **依狀態以色彩編碼**：綠色（2xx）、黃色（3xx）、紅色（4xx/5xx）、灰色（處理中）
- **代理程式表情符號**：🔵 Antigravity、🟢 Copilot、🟠 Kiro、🟣 Codex、🔷 Cursor、🟤 Zed、🟡 Claude Code、⚫ Open Code、🌐 自訂主機
- **內容脈絡色條**：左側 1px 邊框依 `contextKey`（系統提示詞的 SHA-256）著色——以視覺方式將相關對話分組
- **延遲載入內文**：僅在詳細資料分頁中具體化所選請求的內文（避免算繪 1000 × 1MB 的內文）

### 3.3 詳細資料窗格——7 個分頁

| 分頁             | 內容                                                             | 備註                                                                               |
| ---------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **對話**         | 多輪聊天訊息泡泡（system/user/assistant + tool_use/tool_result） | 從任一提供者格式正規化；僅在 `detectedKind === "llm"` 時顯示                       |
| **標頭**         | 請求與回應標頭表格                                               | 敏感標頭（Authorization、Cookie、api-key）預設會遮蔽；提供「顯示祕密資訊」切換開關 |
| **請求**         | 原始內文、JSON 樹狀檢視、模型欄位徽章                            | 經美化排版的 JSON 或原始文字                                                       |
| **回應**         | 原始內文或 SSE 事件清單；提供「原始 ↔ 合併」切換開關             | SSE 合併器會從差異事件重建最終訊息                                                 |
| **計時**         | 瀑布圖：Proxy 額外負荷與上游延遲                                 | 總時間、TTFB 與大小                                                                |
| **LLM 詳細資料** | 提供者、模型、訊息數量、輸入／輸出 token、成本估算、映射目標     | 僅針對 LLM 請求顯示                                                                |
| **統計資料**     | Recharts：延遲時間軸、token 長條圖、工具呼叫散佈圖               | 僅在載入已錄製的工作階段時顯示                                                     |

### 3.4 工具列控制項

| 控制項         | 動作                                                              |
| -------------- | ----------------------------------------------------------------- |
| ⎉ 暫停         | 停止算繪新請求；累積「X 個新項目」徽章                            |
| 🗑 清除         | 清除 UI 清單（不影響伺服器緩衝區）                                |
| ⬇ 匯出 .har    | 將目前篩選後的清單下載為 HAR 檔案                                 |
| ● 錄製工作階段 | 開始具名的錄製工作階段                                            |
| 設定檔選擇器   | 僅 LLM／自訂主機／全部                                            |
| 主機篩選器     | 對 `host` 欄位進行子字串比對                                      |
| 代理程式篩選器 | 下拉式選單：全部／依代理程式                                      |
| 狀態篩選器     | 全部／2xx／3xx／4xx／5xx／錯誤                                    |
| 來源篩選器     | 全部／agent-bridge／custom-host／http-proxy／system-proxy／tproxy |
| **即時**篩選器 | 僅顯示處理中（開啟）的請求——`liveOnly` 切換開關（請參閱 §4.6）    |

### 3.5 可調整大小的面板

- 清單與詳細資料窗格之間以拖曳控點分隔
- 清單寬度：最小 280px、最大 720px，並持久儲存於 `localStorage`（`inspector.listWidth`）
- 可收合為 48px 的側邊欄（僅顯示圖示）；按一下側邊欄中的資料列即可展開

---

## §4 LLM 感知功能

### 4.1 類型偵測器（`src/mitm/inspector/kindDetector.ts`）

使用 4 種訊號，將每個請求分類為 `"llm"`、`"app"` 或 `"unknown"`：

1. **主機登錄檔** — 約 18 個已知的 LLM API 主機名稱（OpenAI、Anthropic、Gemini、Groq、Mistral、Together、Fireworks、Cohere、Perplexity、Hugging Face、OpenRouter、xAI、Moonshot 等）
2. **路徑模式** — `/v1/chat/completions`、`/v1/messages`、`/generateContent`、`/v1/responses` 等
3. **主體結構** — 偵測 `messages[]`（OpenAI/Claude）、`contents[]`（Gemini）、`prompt`、`input` 欄位
4. **User-Agent 提示** — UA 字串中的 `codex`、`claude`、`gemini`、`antigravity`、`kiro`、`copilot`、`cursor`

透過模式 2 新增的自訂主機，會從表單輸入繼承其 `kind`（預設為 `"custom"`）。

### 4.2 SSE 合併器（`src/mitm/inspector/sseMerger.ts`）

**獨立的無塵室實作。**事件剖析遵循
[WHATWG 伺服器傳送事件演算法](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream)，
而重建則遵循公開的 [OpenAI](https://platform.openai.com/docs/api-reference/chat/create)、
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) 與
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent)
串流結構描述。

從原始 SSE 差異事件重建最終的助理訊息：

- **Anthropic**：依索引累積 `content_block_delta`；處理 `text_delta`、`input_json_delta`（工具呼叫）、`thinking_delta`
- **OpenAI**：依索引累積 Chat Completions 選項／工具呼叫，以及 Responses API 輸出項目
- **Gemini**：累積 `candidates[i].content.parts`
- **未知**：按原樣傳回原始事件

Response 分頁會顯示切換開關：**「原始事件 ↔ 已合併」**。

### 4.3 對話正規化器（`src/mitm/inspector/conversationNormalizer.ts`）

**獨立的無塵室實作。**正規化由本機黑箱
契約及公開的 OpenAI、Anthropic 與 Gemini 訊息結構描述定義；未使用任何上游
實作原始碼。

在算繪前，將 OpenAI、Anthropic 與 Gemini 訊息格式轉換為單一 `NormalizedConversation`：

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // 請求主體中的 messages / contents / prompt
  response: NormalizedTurn[]; // 助理回應（透過 sseMerger 合併）
  contextKey: string | null; // 系統提示詞的 SHA-256 指紋
}
```

區塊類型：`text`、`tool_use`、`tool_result`。無論提供者為何，Conversation 分頁都使用此結構。

### 4.4 情境金鑰著色（`src/mitm/inspector/contextKey.ts`）

- 計算系統提示詞的 `SHA-256`（第一個 `role:system` 訊息、`system` 欄位或 Gemini `systemInstruction`）
- 傳回 12 個字元的十六進位前綴（`"a3f9c2..."`）
- 前端將金鑰映射至確定性的 HSL 色彩，供左側邊框色條使用
- **「相同情境」篩選器**：按一下 `ctx #a3f` 標籤，即可新增篩選條件，只顯示具有相同指紋的請求

這可讓您輕鬆以視覺方式區分同一代理程式工作階段中執行的不同「角色」或工作。

### 4.5 LLM 中繼資料擷取

對於 LLM 請求，LLM Details 分頁會擷取：

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // 來自請求主體或回應
  messages: number; // 輪次數
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // 若為 SSE 回應則為 true
  mappedTo: string | null; // x-omniroute-mapped 標頭
  costEstimateUsd: number | null; // 根據 OmniRoute 定價估算的成本
}
```

### 4.6 即時進行中請求篩選器

請求的 `status` 欄位為 `number | "in-flight" | "error"`——請求一開始，項目便會以 `"in-flight"` 狀態
加入，並在回應（或錯誤）到達時**原地更新**。
工具列的 **「即時」**切換開關
（`liveOnly`，i18n 金鑰 `trafficInspector.liveOnly`）會將清單限制為
`status === "in-flight"` 的項目，讓您能即時監看開啟中的連線。

此篩選器是位於
`src/lib/inspector/matchesTrafficFilter.ts` 的純用戶端述詞：

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

切換狀態位於 `useTrafficFilters`（檢查器儀表板掛鉤）中，並與其他篩選器（設定檔、主機、代理程式、來源、狀態、情境）組合使用。

### 4.7 程序歸屬判定（Linux）

在 Linux 上，每個遭攔截的請求都可歸屬至**發起請求的本機
程序**。`InterceptedRequest` 新增了兩個選用欄位：

```ts
pid?: number;          // 發起請求的程序 ID（僅限 Linux）
processName?: string;  // 發起請求的程序名稱（僅限 Linux）
```

`src/mitm/inspector/processAttribution.ts` 會透過以下步驟，將連線的_用戶端_
暫時連接埠映射至 PID + 名稱：

1. 讀取 `/proc/net/tcp` 與 `/proc/net/tcp6`，以找出該
   連接埠的通訊端 inode（`parseProcNetTcpForInode`，可使用固定資料進行測試的純剖析器）。
2. 掃描 `/proc/<pid>/fd/`，尋找指向 `socket:[<inode>]` 的符號連結。
3. 從 `/proc/<pid>/comm` 讀取程序名稱。

1 秒的 TTL 快取可限制負載下的 procfs 掃描成本。歸屬判定是
**盡力而為**——任何失敗都會解析為 `null`，且絕不會阻擋擷取。在
macOS/Windows 上，此函式會傳回 `null`（虛設常式；對 `lsof`／`GetExtendedTcpTable`
的支援將於後續加入）。

---

## §5 工作階段

### 5.1 錄製工作階段

1. 按一下工具列中的 **「● 錄製工作階段」** → 輸入名稱（選填）
2. 即時追蹤會正常繼續；紅色脈動指示器會顯示 `◉ 錄製中 · <名稱> · 00:42 · 23 個請求`
3. 按一下 **「⏹ 停止」** → 工作階段快照會儲存至 `inspector_sessions` + `inspector_session_requests`

### 5.2 檢視已錄製的工作階段

工具列中的 **工作階段** 下拉式選單會列出已儲存的工作階段。選取其中一個後：

- 載入該工作階段的快照（凍結狀態）
- 橫幅會顯示：`正在檢視已錄製的工作階段「<名稱>」— [返回即時模式]`
- 統計資料分頁會變為可用，並顯示 Recharts 彙總資料

### 5.3 匯出格式

每個工作階段皆可匯出為：

| 格式                       | 用途                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | 與 Chrome DevTools、Charles、Fiddler 相容 — 可匯入以進行離線分析 |
| **JSONL**                  | 每行一個 `InterceptedRequest` — 與 `llm-interceptor` 格式相容    |

可透過 `GET /api/tools/traffic-inspector/sessions/{id}/export.har` 或工作階段下拉式選單中的 ⬇ 按鈕匯出。

---

## §6 安全性

流量檢查器會顯示**所有攔截到的 HTTPS 流量**，包括授權標頭與請求本文。已實施下列控制措施：

| 控制措施         | 詳細資訊                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **LOCAL_ONLY**   | 所有路由與 WebSocket 端點都僅限迴送介面存取（在驗證前於 `routeGuard.ts` 中強制執行）                                                  |
| **機密資訊遮罩** | 線性 `maskSecret()` 掃描器會在 `TrafficBuffer.push()` 前遮蔽 RFC 6750 Bearer 認證資訊、帶有提供者前綴的金鑰，以及長度較長的不透明權杖 |
| **本文大小上限** | 大於 `INSPECTOR_MAX_BODY_KB`（預設為 1024 KB）的本文會被截斷，並顯示 `「（為維持效能而截斷）」` 通知                                  |
| **標頭清理**     | 名稱會轉為小寫；框架控制／逐躍點標頭與代理驗證標頭會被捨棄；Cookie 會被完全遮蔽；認證資訊值則交由 `maskSecret()` 處理                 |
| **CSP**          | 流量檢查器頁面採用嚴格的內容安全政策，以防止透過注入的回應本文發動 XSS                                                                |
| **預設不持久化** | `TrafficBuffer` 位於記憶體中，伺服器重新啟動後即會遺失。只有在明確錄製時，工作階段才會持久化                                          |

### 已套用的強制規則

| 規則                              | 應用方式                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | 來自流量檢查器路由的所有 HTTP 錯誤回應都會經過清理                            |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` 為 LOCAL_ONLY + SPAWN_CAPABLE（系統代理命令） |

### 已知限制

- **全系統代理模式**會影響電腦上的所有應用程式，包括 VPN 用戶端與 SSO。請務必搭配自動停用計時器使用。請勿在共用電腦上使用。
- **CONNECT 通道 HTTPS**：除非已啟用 TLS 攔截，否則模式 3（HTTP_PROXY）僅會擷取 HTTPS 目的地的通道中繼資料。這是刻意的設計 — 若相關應用程式不信任 AgentBridge 憑證，透明擷取將會破壞其 TLS 驗證。
- **部分元件中有硬編碼字串**：部分 UI 元件（F7/F8）含有少量尚未由 i18n 鍵涵蓋的硬編碼字串。這些字串已在 i18n 缺口報告中記錄為已知限制；後續處理時會進行移轉。受影響的字串皆為 UI 裝飾性標籤，不需翻譯也不影響功能使用。

---

## §7 疑難排解

### WebSocket 連線中斷

如果即時追蹤顯示「已中斷連線」：

1. 檢查伺服器是否仍在執行：`GET /api/tools/traffic-inspector/capture-modes`
2. 重新載入頁面 — WebSocket 會重新連線並接收新的快照
3. 如果伺服器已重新啟動，記憶體內緩衝區將被清除 — 除非已錄製工作階段，否則舊項目將會遺失

### 連接埠 8080 衝突

如果 HTTP_PROXY 模式無法啟動：

```bash
lsof -i :8080    # 尋找程序
```

變更連接埠：

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### 系統代理未還原

如果 OmniRoute 在系統全域代理模式啟用時當機：

**macOS：**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux（GNOME）：**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows：**

```cmd
netsh winhttp reset proxy
```

如果儀表板在下次載入時偵測到資料庫狀態顯示代理曾處於啟用狀態，也會提供「還原系統代理」選項。

### 緩衝區已滿

當緩衝區達到 `INSPECTOR_BUFFER_SIZE`（預設為 1000）時，新項目會取代最舊的項目。如果重要請求遺失：

- 增加 `INSPECTOR_BUFFER_SIZE`（例如 5000）— 以較高的記憶體用量換取較長的保留時間
- 錄製工作階段，將相關時間範圍的內容持久化至資料庫

---

## §8 API 參考

所有路由皆為 `LOCAL_ONLY`（僅限回送介面）及 `SPAWN_CAPABLE`（系統代理命令）。請參閱 `src/server/authz/routeGuard.ts`。

基礎路徑：`/api/tools/traffic-inspector/`

### 請求管理

| 方法   | 路徑                        | 說明                                                                       |
| ------ | --------------------------- | -------------------------------------------------------------------------- |
| GET    | `/requests`                 | 列出請求（可篩選：`?profile=llm&host=&agent=&status=&source=&sessionId=`） |
| GET    | `/requests/{id}`            | 單一請求的詳細資料                                                         |
| DELETE | `/requests`                 | 清除記憶體內緩衝區                                                         |
| POST   | `/requests/{id}/replay`     | 透過 OmniRoute 路由器重新執行相同請求                                      |
| PUT    | `/requests/{id}/annotation` | 儲存或更新請求的註記                                                       |

### WebSocket

| 方法 | 路徑  | 說明                                                                             |
| ---- | ----- | -------------------------------------------------------------------------------- |
| GET  | `/ws` | 即時 WebSocket 串流。連線時傳送 `snapshot`，之後傳送 `new`/`update`/`clear` 事件 |

### 匯出

| 方法 | 路徑          | 說明                             |
| ---- | ------------- | -------------------------------- |
| GET  | `/export.har` | 將目前篩選後的清單匯出為 HAR 1.2 |

### 自訂主機

| 方法   | 路徑            | 說明                              |
| ------ | --------------- | --------------------------------- |
| GET    | `/hosts`        | 列出自訂主機                      |
| POST   | `/hosts`        | 新增主機（自動編輯 `/etc/hosts`） |
| DELETE | `/hosts/{host}` | 移除主機                          |
| PATCH  | `/hosts/{host}` | 切換 `enabled`                    |

### 擷取模式

| 方法 | 路徑                           | 說明                                                                                    |
| ---- | ------------------------------ | --------------------------------------------------------------------------------------- |
| GET  | `/capture-modes`               | AgentBridge / 自訂主機 / HTTP_PROXY / 系統代理模式的狀態，以及 `tls-intercept` 切換開關 |
| POST | `/capture-modes/http-proxy`    | 啟動/停止 HTTP_PROXY 監聽器（`{action: "start"\|"stop"}`）                              |
| POST | `/capture-modes/system-proxy`  | 套用/還原系統全域代理（`{action: "apply"\|"revert"}`）                                  |
| POST | `/capture-modes/tls-intercept` | 切換代理模式中的 HTTPS 主體解密（`{enabled: boolean}`）                                 |

> **TPROXY 解密**（擷取模式 5）由 AgentBridge 前綴下的**獨立**路由驅動 —
> `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — 而非位於
> `/api/tools/traffic-inspector/` 下。請參閱
> `docs/security/MITM-TPROXY-DECRYPT.md`（位於 git 中；未編譯至 `/docs`）。

### 工作階段

| 方法   | 路徑                        | 說明                                                          |
| ------ | --------------------------- | ------------------------------------------------------------- |
| POST   | `/sessions`                 | 開始錄製（`{name?: string}`）                                 |
| PATCH  | `/sessions/{id}`            | 停止或重新命名（`{action: "stop"\|"rename", name?: string}`） |
| GET    | `/sessions`                 | 列出所有已儲存的工作階段                                      |
| GET    | `/sessions/{id}`            | 工作階段快照（所有請求）                                      |
| DELETE | `/sessions/{id}`            | 刪除工作階段                                                  |
| GET    | `/sessions/{id}/export.har` | 將工作階段匯出為 HAR 1.2                                      |

### 內部擷取（D4 備援）

| 方法 | 路徑               | 說明                                                                                      |
| ---- | ------------------ | ----------------------------------------------------------------------------------------- |
| POST | `/internal/ingest` | 接受來自 `server.cjs` 傳遞路徑的攔截請求；必須具備 `INSPECTOR_INTERNAL_INGEST_TOKEN` 標頭 |

完整 OpenAPI 結構描述：`docs/openapi.yaml` → 標籤 `Traffic Inspector`。
