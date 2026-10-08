# Cursor Provider in Docker Environments (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md)

---

當 OmniRoute 在 Docker 內執行時，舊版的 **從 Cursor IDE 匯入** /
`cursor-agent` 流程會失敗，因為容器無法看到主機上的 Cursor
安裝。請改用 **使用 Cursor 登入**（deep-control PKCE）。

## 為什麼 IDE / CLI 匯入在 Docker 中會失敗

1. **檔案系統隔離** — 自動匯入會在容器_內部_尋找 Linux 路徑，例如
   `~/.config/Cursor/User/globalStorage/state.vscdb`。
   在 macOS 的 Docker Desktop 上，預設不會掛載主機的 IDE DB，而且
   即使主機是 Darwin，容器作業系統仍是 Linux。
2. **沒有 `cursor-agent` 二進位檔** — 官方 OmniRoute 映像檔不包含
   `cursor-agent`。先前「可用模型」會在 shell 中執行
   `cursor-agent --list-models`，失敗時則退回靜態目錄。
3. **錯誤的二進位檔** — **不要**將 macOS 的 `cursor-agent` 繫結掛載至 Linux
   容器中。它將無法執行。

## 建議方式：使用 Cursor 登入

1. 開啟 **儀表板 → 提供者 → Cursor**。
2. 選擇 **使用 Cursor 登入**分頁。
3. 按一下 **使用 Cursor 登入** — OmniRoute 會在您的**主機**瀏覽器中開啟
   `https://cursor.com/loginDeepControl?…`。
4. 在瀏覽器中核准登入，然後返回儀表板。OmniRoute
   會輪詢 `api2.cursor.sh/auth/poll`，直到取得權杖。
5. OmniRoute 會儲存**存取權杖與重新整理權杖**，並透過
   `https://api2.cursor.sh/auth/exchange_user_api_key` 重新整理它們。

此方式不需要容器內安裝 Cursor IDE 或 `cursor-agent`。

## 模型探索

使用已登入的連線時，**可用模型 / 自動同步**會優先使用連線的 bearer 權杖，
從 Cursor 的 HTTP `AiService/AvailableModels` 目錄取得模型。
如果失敗，OmniRoute 仍會嘗試使用主機上的 `cursor-agent`（若存在），接著
使用靜態登錄檔種子。

OmniRoute 一律會在目錄中公開 **`auto`**（顯示為「自動」），以及
OpenCodex 風格的路由模式 **`auto-cost`**、**`auto-balance`** 和
**`auto-intelligence`**。在線路傳輸中，這些模式會對應到 Cursor 的 `default` 模型
（三個變體會附帶 `optimization` ModelParameter）。當進階模型用量耗盡時，請優先使用
`cu/auto` — 自動模式通常仍有可用額度。

### 同步後即以即時目錄為準

Cursor 模型同步成功後（`cursor-agent --list-models` → 持久化的
同步目錄，或上述經 bearer 驗證的 `AvailableModels` 擷取），
**儀表板**、**`/v1/models`** 和**全部測試**會列出：

1. 即時同步傳回的模型
2. 注入的自動路由器 ID：`auto`、`auto-cost`、`auto-balance`、`auto-intelligence`
3. 操作者的**自訂**模型（匯入 / 手動）— 絕不會由同步程序修剪

位於
`open-sse/config/providers/registry/cursor/` 下的大型靜態登錄檔
**僅供離線備援使用**。當同步內容為空（或探索失敗）時，清單會退回使用該登錄檔。

帶有 effort 後綴的 ID（例如 `claude-4.6-sonnet-high`）在執行階段仍可
**請求**：`resolveRequestedModel` 會移除後綴，並將其轉換為線路傳輸用的
`ModelParameter`。排他式清單會刻意在「全部測試」中隱藏這些靜態變體，
使探測項目與 Cursor 實際傳回的可用模型一致。

### 輔助函式

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — 儀表板合併
- `ensureCursorAutoCatalogEntry` — 在探索與列出時注入 auto*
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` 靜態迴圈

## 提供者限制（配額）

Cursor 的**用量 → 提供者限制**會在 PKCE 或權杖匯入後，使用
`api2.cursor.sh` 上的 Bearer API（`GetCurrentPeriodUsage` → 用量摘要 →
auth/usage）。舊版 cookie/`cursor.com` 儀表板路徑仍會作為較舊
IDE 匯入工作階段的最後備援。

視窗通常包括**總計**、**自動 + Composer** 和 **API**。如果限制顯示為空，
請重新執行**使用 Cursor 登入**或重新匯入權杖（已不再要求僅透過 IDE 匯入）。

## 空白輪次 / 用量耗盡

當 Cursor 接受 Run 卻未傳回任何助理文字時（進階用量耗盡時很常見），
OmniRoute 會顯示可採取行動的 **429**（配額提示）或附帶指引的
**502**，而不是只顯示「提供者傳回空白內容」。例如
`not_found: AI Model Not Found`（用量時段額度耗盡）等串流失敗會被分類為
**Cursor 速率限制 / 用量已超出**，並在 SSE 管線中保留該訊息
（共用的空白串流防護不會覆寫已發出的錯誤）。請檢查「提供者限制」、嘗試使用模型
**`auto`**，或提高 Cursor 方案限制。

## 用戶端版本（無頭模式）

若本機未安裝 `cursor-agent`，OmniRoute 會依序透過環境變數
`CURSOR_AGENT_CLI_VERSION`、磁碟快取的 Cursor 安裝程式指令碼抓取結果，
最後是固定的建置 ID，解析 `x-cursor-client-version`。需要時可使用
`CURSOR_AGENT_CLI_VERSION` 覆寫。

## 備援方式：手動匯入權杖

如果無法完成瀏覽器登入：

1. 在主機上，從 Cursor 的 `state.vscdb` 擷取權杖：

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. 在 Cursor 驗證對話框中開啟**匯入權杖**。
3. 貼上**存取權杖**，並在可用時貼上**重新整理權杖**（自動重新整理所必需）。
   機器 ID 為選填。

僅匯入存取權杖仍可運作，但若沒有重新整理權杖便會過期 —
當聊天傳回驗證錯誤時，請重新匯入。

## 相關資訊

- Zed Docker 指引：[`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor 登入參考資料（外部）：
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
