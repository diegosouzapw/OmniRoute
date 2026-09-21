# Management Authentication (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute 有 **四種憑證系列** 可授權管理路由。
這些憑證無法互換。推論 API 金鑰（`sk-…`）**不能**管理伺服器，
除非已明確授予 `manage` 或 `admin` 範圍。

標準實作：`src/lib/api/requireManagementAuth.ts`。

| 憑證                | 典型形式                        | 建立位置                                       | 預定用途            | 管理能力                                                      |
| ------------------- | ------------------------------- | ---------------------------------------------- | ------------------- | ------------------------------------------------------------- |
| 儀表板 JWT 工作階段 | `auth_token` Cookie             | 儀表板登入                                     | 瀏覽器 UI           | 完整的儀表板管理，但受 CSRF、本機性及永遠受保護路由的規則約束 |
| CLI 機器 ID 權杖    | 內部／本機                      | CLI 啟動程序（在同一台機器上執行 `omniroute`） | 本機 CLI            | 僅限本機管理                                                  |
| 具範圍的存取權杖    | `oma_live_…`                    | **設定 → 存取權杖**或 `omniroute connect`      | 遠端 CLI 與管理 API | 必須滿足路由要求的 `read`、`write` 或 `admin` 範圍            |
| 推論 API 金鑰       | `sk-…`（以及其他 API 金鑰前綴） | **API 管理員／API 金鑰**                       | `/v1/*` 推論        | **無**，除非金鑰中繼資料包含 `manage` 或 `admin`              |

`oma_` 憑證是管理／CLI 憑證，**不是**推論 API 金鑰。

如果伺服器已停用登入／API 金鑰驗證，部分管理路由可能會接受未經驗證的呼叫。僅限本機及永遠受保護的路由仍會套用各自的規則。因此，提供其中一種憑證並非在所有情況下都是必要條件；若不具備所需範圍或不符合路由的本機性要求，即使持有憑證也不一定足夠。

相關資訊：[遠端模式](./REMOTE-MODE.md)（如何為遠端 CLI 簽發 `oma_live_…`）。

---

## 範圍矩陣

以下兩組範圍詞彙**並不相同**，請勿混用。

### 存取權杖範圍（`oma_live_…`）

| 範圍    | 典型操作                                                 |
| ------- | -------------------------------------------------------- |
| `read`  | 權杖獲准檢視的清單／狀態 GET 請求                        |
| `write` | 管理員層級以下的變更操作（建立／更新／刪除）             |
| `admin` | 完整的遠端 CLI／連線權杖（透過密碼啟動時預設使用此範圍） |

具有 `read` 範圍的權杖無法呼叫 `write` 路由。執行階段訊息格式：
`Access token scope '<have>' is insufficient; '<need>' required.`

### API 金鑰管理範圍

| 範圍     | 含義                                                                     |
| -------- | ------------------------------------------------------------------------ |
| （無）   | 僅限推論。管理路由會傳回 403。                                           |
| `manage` | 管理 API（與 `requireManagementAuth` 的 API 金鑰分支使用相同的驗證關卡） |
| `admin`  | 也符合 `hasManageScope`（視為具備管理能力）                              |

請在 API 金鑰／API 管理員 UI 中為金鑰啟用 `manage`。除非您刻意授予該範圍，否則請勿將聊天用戶端金鑰重複用於自動化作業。

---

## 如何建立及撤銷

### 儀表板 JWT 工作階段

1. 開啟 `/login`，使用管理密碼登入（首次啟動時使用 `INITIAL_PASSWORD`）。
2. Cookie `auth_token` 為 HttpOnly。瀏覽器儀表板會自動使用它。
3. 透過 `/api/auth/logout` 登出。沒有可供複製的長期有效密鑰。

### CLI 機器 ID 權杖

1. 在與伺服器**相同的主機**上執行 `omniroute`（迴路位址）。
2. CLI 會在 `~/.omniroute/` 下啟動並建立機器 ID 權杖（chmod 600）。
3. 這在另一台機器上**無法**運作。遠端 CLI 請使用存取權杖。

### 具範圍的存取權杖（`oma_live_…`）

1. 儀表板：**設定 → 存取權杖** → 建立（名稱＋範圍）。**密鑰只會顯示一次。**
2. 或使用 CLI：`omniroute connect <host>`（密碼 → 權杖）。請參閱[遠端模式](./REMOTE-MODE.md)。
3. 標頭：`Authorization: Bearer oma_live_…`
4. 從相同的「存取權杖」頁面撤銷（或刪除 CLI 上下文）。
5. 伺服器只會儲存雜湊值。請將純文字密鑰視同密碼妥善保管。

### 具管理範圍的 API 金鑰

1. 儀表板：**API 管理員／API 金鑰** → 建立或編輯金鑰 → 啟用 `manage`（或 `admin`）。
2. 標頭：`Authorization: Bearer sk-…`（使用該金鑰的實際前綴）。
3. 在相同的 UI 中撤銷金鑰或移除 `manage`。
4. 對於不使用 CLI 的自動化作業，請遵循最小權限原則：僅執行 GET 的工作，優先使用 `read` 存取權杖；只有當呼叫端也必須使用 `/v1` 及管理功能時，才在 API 金鑰上啟用 `manage`。

---

## 標頭格式

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

請勿將管理憑證放在 URL 路徑或查詢字串中。管理驗證僅能透過標頭/Cookie 進行。

---

## 可複製貼上的範例

唯讀（列出提供者）。使用 `read` 存取權杖：

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

修改（建立提供者連線）。使用 `write`/`admin` 存取權杖，或具有 `manage` 範圍的 API 金鑰：

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

推論（非管理用途）。使用一般 API 金鑰，不需要 `manage`：

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## 目前的執行階段錯誤（請勿回顯機密資訊）

| 情況                                      | 一般狀態碼 | 訊息（已清理）                                                       |
| ----------------------------------------- | ---------- | -------------------------------------------------------------------- |
| 未提供憑證                                | 401        | `Authentication required`                                            |
| 無效/已過期的 `oma_live_…`                | 401        | `Invalid or expired access token`                                    |
| 有效但不具備 `manage`/`admin` 的 API 金鑰 | 403        | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| 在管理路由上使用無效的一般 API 金鑰       | 403        | `Invalid management token`                                           |
| 存取權杖的範圍不足                        | 403        | `Access token scope '<have>' is insufficient; '<need>' required.`    |

「Invalid management token」表示 Bearer 權杖**未**被接受為管理憑證。這**不會**告訴您應建立哪一類憑證。請參考上表：推論金鑰需要 `manage` 範圍；遠端 CLI 需要 `oma_live_…`；儀表板則使用工作階段 Cookie。

---

## 建議的最小權限選擇

| 呼叫端                             | 使用方式                                     |
| ---------------------------------- | -------------------------------------------- |
| 瀏覽器                             | 儀表板工作階段                               |
| 伺服器主機上的 CLI                 | 機器權杖                                     |
| 筆記型電腦上與遠端伺服器通訊的 CLI | 透過 `omniroute connect` 取得的 `oma_live_…` |
| CI / 指令碼（僅限管理）            | 使用具備可行最小範圍的 `oma_live_…`          |
| 必須同時呼叫 `/v1` 與 `/api` 的 CI | 具備 `manage` 的 API 金鑰，**或**兩組憑證    |
