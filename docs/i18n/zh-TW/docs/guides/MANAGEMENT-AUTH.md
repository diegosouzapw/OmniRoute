# Management Authentication (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute 有**四種憑證家族**，可用於授權管理路由。
它們不可互換。推論 API 金鑰 (`sk-…`) **不會**管理伺服器，除非它們被明確授予 `manage` 或 `admin` 範圍。

規範實作：`src/lib/api/requireManagementAuth.ts`。

| 憑證             | 典型形式                       | 建立位置                                   | 預期用途            | 管理能力                                                    |
| ---------------- | ------------------------------ | ------------------------------------------ | ------------------- | ----------------------------------------------------------- |
| 儀表板 JWT 會話  | `auth_token` cookie            | 儀表板登入                                 | 瀏覽器使用者介面    | 完整的儀表板管理，受 CSRF、本地性及始終受保護路由規則的約束 |
| CLI 機器 ID 權杖 | 內部 / 本地                    | CLI 啟動 (`omniroute` 在同一機器上)        | 本地 CLI            | 僅限本地管理                                                |
| 範圍存取權杖     | `oma_live_…`                   | **設定 → 存取權杖** 或 `omniroute connect` | 遠端 CLI 和管理 API | 必須滿足路由所需的 `read`、`write` 或 `admin` 範圍          |
| 推論 API 金鑰    | `sk-…` (以及其他 API 金鑰前綴) | **API 管理器 / API 金鑰**                  | `/v1/*` 推論        | **無**，除非金鑰中繼資料包含 `manage` 或 `admin`            |

`oma_` 憑證是管理/CLI 憑證。它們**不是**推論 API 金鑰。

如果伺服器禁用了登入/API 金鑰驗證，某些管理路由可能會接受未經身份驗證的呼叫。僅限本地和始終受保護的路由仍適用其自身規則。因此，出示這些憑證之一並非普遍強制，且在沒有所需範圍和路由本地性的情況下，擁有其中之一也並非普遍足夠。

相關：[遠端模式](./REMOTE-MODE.md) (如何為遠端 CLI 鑄造 `oma_live_…`)。

---

## 範圍矩陣

API 金鑰管理範圍和存取權杖範圍是不同的詞彙。MCP 工具範圍是第三種詞彙，使用 `scopeMatches` 檢查，而不是下表中任一函數。並排比較：[三個範圍命名空間](../frameworks/MCP-SERVER.md#three-scope-namespaces)。

### 存取權杖範圍 (`oma_live_…`)

| 範圍    | 典型操作                                     |
| ------- | -------------------------------------------- |
| `read`  | 權杖允許查看的列表/狀態 GET 請求             |
| `write` | 管理員權限以下的變更 (建立/更新/刪除)        |
| `admin` | 完整的遠端 CLI / 連線權杖 (密碼引導預設在此) |

具有 `read` 權限的權杖無法呼叫 `write` 路由。執行時訊息格式：`存取權杖範圍 '<have>' 不足；需要 '<need>'。`

### API 金鑰管理範圍

| 範圍     | 意義                                                         |
| -------- | ------------------------------------------------------------ |
| (無)     | 僅限推論。管理路由返回 403。                                 |
| `manage` | 管理 API (與 `requireManagementAuth` API 金鑰分支相同的閘道) |
| `admin`  | 也滿足 `hasManageScope` (被視為具備管理能力)                 |

在 API 金鑰 / API 管理器使用者介面中啟用金鑰上的 `manage`。除非您刻意授予該範圍，否則不要將聊天客戶端金鑰重複用於自動化。

---

## 如何建立和撤銷

### 儀表板 JWT 會話

1. 開啟 `/login`，使用管理密碼登入（首次啟動時為 `INITIAL_PASSWORD`）。
2. Cookie `auth_token` 是 HttpOnly。瀏覽器儀表板會自動使用它。
3. 透過 `/api/auth/logout` 登出。沒有可複製的長期密鑰。

### CLI 機器 ID 令牌

1. 在與伺服器**相同的主機**上執行 `omniroute`（迴路）。
2. CLI 會在 `~/.omniroute/` 下引導一個機器 ID 令牌（chmod 600）。
3. 這在另一台機器上**不起作用**。請使用存取令牌進行遠端 CLI。

### 範圍存取令牌 (`oma_live_…`)

1. 儀表板：**設定 → 存取令牌** → 建立（名稱 + 範圍）。**密鑰只顯示一次。**
2. 或 CLI：`omniroute connect <host>`（密碼 → 令牌）。請參閱[遠端模式](./REMOTE-MODE.md)。
3. 標頭：`Authorization: Bearer oma_live_…`
4. 從相同的存取令牌頁面撤銷（或刪除 CLI 上下文）。
5. 伺服器只儲存雜湊。請像對待密碼一樣對待明文。

### 管理範圍 API 金鑰

1. 儀表板：**API 管理器 / API 金鑰** → 建立或編輯金鑰 → 啟用 `manage`（或 `admin`）。
2. 標頭：`Authorization: Bearer sk-…`（金鑰的實際前綴）。
3. 在相同的 UI 中撤銷或移除 `manage`。
4. 對於非 CLI 的自動化，請使用最小權限：對於僅 GET 的任務，請優先使用 `read` 存取令牌；僅當呼叫者也必須使用 `/v1` 和管理時，才在 API 金鑰上使用 `manage`。

---

## 標頭格式

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

請勿將管理憑證放在 URL 路徑或查詢字串中。管理驗證僅限於標頭/Cookie。

---

## 複製貼上範例

唯讀（列出提供者）。使用 `read` 存取令牌：

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

修改（建立提供者連線）。使用 `write`/`admin` 存取令牌或管理範圍 API 金鑰：

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

推斷（非管理）。普通 API 金鑰，無需 `manage`：

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## 目前執行時錯誤（不回顯密鑰）

| 情況                               | 典型狀態 | 訊息（已淨化）                                                       |
| ---------------------------------- | -------- | -------------------------------------------------------------------- |
| 無憑證                             | 401      | `Authentication required`                                            |
| 無效/過期 `oma_live_…`             | 401      | `Invalid or expired access token`                                    |
| 有效 API 金鑰但無 `manage`/`admin` | 403      | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| 管理路由上的無效普通 API 金鑰      | 403      | `Invalid management token`                                           |
| 存取令牌範圍過低                   | 403      | `Access token scope '<have>' is insufficient; '<need>' required.`    |

「無效管理令牌」表示 bearer **未**被接受為管理憑證。它**不會**告訴您要鑄造哪個系列。請使用上表：推斷金鑰需要 `manage` 範圍；遠端 CLI 需要 `oma_live_…`；儀表板使用會話 Cookie。

---

## 建議的最小權限選擇

| 呼叫者                             | 用途                                      |
| ---------------------------------- | ----------------------------------------- |
| 瀏覽器                             | 儀表板會話                                |
| 伺服器主機上的 CLI                 | 機器令牌                                  |
| 筆記型電腦上與遠端伺服器通訊的 CLI | 來自 `omniroute connect` 的 `oma_live_…`  |
| CI / 腳本 (僅限管理)               | 具有最小作用範圍的 `oma_live_…`           |
| 必須同時呼叫 `/v1` 和 `/api` 的 CI | 具有 `manage` 的 API 金鑰 **或** 兩個憑證 |
