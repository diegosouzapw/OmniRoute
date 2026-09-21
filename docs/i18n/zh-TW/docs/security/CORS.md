# CORS Configuration & Security (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md)

---

OmniRoute 透過單一且集中管理的允許清單，控制哪些**瀏覽器來源**可以讀取跨來源回應。此模型**預設為封閉式（fail-closed）**：在您明確允許某個來源之前，任何來源都不會獲准。本頁說明允許清單的解析方式、`CORS_ALLOW_ALL=true` 實際上會暴露哪些內容（以及更重要的是，**不會**暴露哪些內容）、如何安全地設定開發與正式環境，以及萬用字元生效時儀表板顯示的執行階段警告。

**權威來源：** `src/server/cors/origins.ts`（`resolveAllowedOrigin`、`applyCorsHeaders`、`getCorsStatus`）。允許清單只會在中介軟體（`src/server/authz/pipeline.ts`）中套用一次——各路由處理常式本身不會設定 `Access-Control-Allow-Origin`。

## 如何解析來源

對於每個請求，中介軟體會依照下列順序計算 `Access-Control-Allow-Origin` 值：

1. **`CORS_ALLOW_ALL=true`**（或舊版的 `CORS_ORIGIN=*`）→ 回傳呼叫端的 `Origin`（若沒有 `Origin` 標頭，則回傳 `*`），並設定 `Vary: Origin`，以確保快取正確運作。同一個 `applyCorsHeaders()` 關卡也會在使用權杖驗證的 `/v1*`/`/v1beta*` 介面上，為每個包含主體的 2xx 回應附加 `Vary: Accept-Encoding`（`relaxForTokenAuth`、RFC 9110 §12.5.5、issue #6737），讓下游／共用快取能正確區分壓縮與未壓縮的變體。
2. 否則，請求的 `Origin` 會經過正規化（轉為小寫並移除尾端斜線），再與**合併後的允許清單**比對：
   - 環境變數 **`CORS_ALLOWED_ORIGINS`**——以逗號分隔的清單，以及
   - 執行階段的 **`corsOrigins`** 設定（儀表板 → 安全性 → _CORS 允許的來源_），由 `src/lib/config/runtimeSettings.ts` 透過 `setRuntimeAllowedOrigins()` 注入。
3. 沒有相符項目 → **不會發出 `Access-Control-Allow-Origin` 標頭**。瀏覽器會封鎖跨來源讀取。這就是預期的預設封閉行為。

| 環境變數               | 含義                                                                   |
| ---------------------- | ---------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | 要允許的確切來源 CSV 清單（建議使用）。                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → 回傳任何來源（萬用字元）。僅限開發環境。                  |
| `CORS_ORIGIN`          | 舊版設定。`*` 的行為與 `CORS_ALLOW_ALL` 相同；單一值則會加入允許清單。 |

## 威脅模型——`CORS_ALLOW_ALL=true` 實際上會暴露什麼

一般性的 OWASP 警告（「萬用字元 CORS = 任何網站都能呼叫您的 API」）值得嚴肅看待，但 OmniRoute 的暴露範圍**比一般情況更窄**，原因在於一項具體的實作事實：

> **中央 `applyCorsHeaders()` 絕不會發出
> `Access-Control-Allow-Credentials`。** 除非伺服器傳送
> `Access-Control-Allow-Credentials: true`，否則瀏覽器不會向跨來源網站提供
> _包含認證資訊_（帶有 Cookie）的跨來源回應。OmniRoute 的共用 CORS 路徑絕不會
> 這麼做。

即使設定了 `CORS_ALLOW_ALL=true`，這對各介面的影響如下：

| 介面                             | 驗證機制                 | 萬用字元 CORS 的影響                                                                                                                                                   |
| -------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 儀表板／管理 `/api/*`            | Cookie 工作階段          | 來源會被回傳，但因為**沒有 `Allow-Credentials`**，瀏覽器會**封鎖**包含認證資訊的讀取。惡意跨來源網站**無法讀取**您已驗證的儀表板回應，工作階段 Cookie 也不會遭到暴露。 |
| 用戶端 API `/v1/*`、`/v1beta/*`  | Bearer／`x-api-key` 標頭 | **依設計**本來就較寬鬆（`relaxForTokenAuth`）：瀏覽器絕不會自動附加 `Authorization`/`x-api-key`，因此攻擊者的頁面無法提供您的金鑰。`CORS_ALLOW_ALL` 不會擴大此範圍。   |
| 公開唯讀介面（`/api/health` 等） | 無                       | 不含敏感資訊；使用萬用字元不會造成危害。                                                                                                                               |

因此，`CORS_ALLOW_ALL=true` 的**剩餘**暴露範圍僅限於：(a) 對原本就不需要驗證的資料進行未攜帶認證資訊的跨來源**讀取**，以及 (b) 讓管理路由的 CORS **預檢請求通過**——但這些路由仍需要跨來源頁面無法提供的驗證資訊。在共用 CORS 路徑上，這**並非**工作階段劫持或認證資訊竊取的攻擊向量。

### 一個真正的例外——`/api/v1/agents/`

Cloud-Agent 路由（`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`）會設定其**自己的** CORS 標頭（`src/lib/cloudAgent/api.ts`、`getCloudAgentCorsHeaders`），而且**確實會**同時發出 `Access-Control-Allow-Origin: <origin>|*` 與 `Access-Control-Allow-Credentials: true`。這是唯一同時存在來源回傳與認證資訊的介面，而且它**獨立於 `CORS_ALLOW_ALL`**。這些路由採用管理驗證（`requireManagementAuth`）；若操作人員將儀表板開放給主機以外的存取，應注意這是唯一允許跨來源讀取含認證資訊回應的地方。將其限縮為明確的允許清單，會與本 CORS 指引分開追蹤。

## 正式環境檢查清單

- **切勿在正式環境中設定 `CORS_ALLOW_ALL=true`。** 請維持未設定狀態。
- 設定**明確的**來源清單——可使用環境變數或「Security」分頁中的欄位：

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- 如果 OmniRoute 在反向代理／通道（nginx、Caddy、Cloudflare
  Tunnel、Tailscale）後方執行，CORS **並非**唯一的控制措施——回送位址路由
  防護仍會保護可啟動程序的路由（請參閱
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)）。請勿偽造
  `X-Forwarded-For: 127.0.0.1` 來「修正」403；這會重新引入路由防護原本封鎖的
  RCE 類別漏洞。
- 確認執行階段狀態：只要 `CORS_ALLOW_ALL=true` 正在生效，儀表板便會在
  Dashboard → Security → Authorization Inventory 下方顯示**持續存在的琥珀色橫幅**，
  而 `/api/settings/authz-inventory` 會傳回可供監控工具輪詢的
  `cors: { allowAll, allowedOrigins }` 封裝。

## 開發便利性——允許特定的本機來源

即使在開發環境中，通常也不需要萬用字元。只允許實際使用的開發伺服器：

```bash
# 呼叫本機 OmniRoute 的 Vite (5173) + Next.js (3000) 開發伺服器
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

來源比對不區分大小寫，且會忽略結尾斜線，因此
`http://localhost:3000` 與 `http://localhost:3000/` 視為相同。相同的 CSV
也可在執行階段透過 **Dashboard → Security → CORS Allowed Origins** 設定，無須
重新啟動。

## API 金鑰與 Cookie 工作階段

- **Bearer／`x-api-key`（`/v1/*` 推論介面）：**瀏覽器絕不會自動附加
  這些資訊。CORS 在此並不是有意義的屏障——真正的屏障是 API 金鑰——
  因此此介面刻意採用寬鬆設定，讓瀏覽器與 Electron 用戶端能夠讀取其原本就有權
  存取的回應。
- **Cookie 工作階段（儀表板）：**受到預設封閉策略**以及**
  共用路徑上不存在 `Access-Control-Allow-Credentials` 的雙重保護。請勿將
  管理／儀表板來源加入任何寬鬆設定中；它們必須嚴格維持預設封閉。

## 範例：OmniRoute 前方的反向代理

CORS 由 OmniRoute 本身強制執行，因此代理通常**不應**新增或
重寫 `Access-Control-*` 標頭（重複的標頭會導致瀏覽器無法運作）。終止 TLS
並轉送請求——讓 OmniRoute 回應預檢請求：

```nginx
# nginx——轉送至 OmniRoute；請勿在此注入 Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # 請勿將 X-Forwarded-For 設為 127.0.0.1——這會使回送位址路由防護失效。
}
```

請在 OmniRoute（`CORS_ALLOWED_ORIGINS` 或「Security」分頁）中設定允許的瀏覽器來源，
而不是在代理中設定。

## 原始碼檔案

| 關注項目                         | 檔案                                                                 |
| -------------------------------- | -------------------------------------------------------------------- |
| 允許清單解析 + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| 中介軟體套用（單一真實來源）     | `src/server/authz/pipeline.ts`                                       |
| Settings → 執行階段來源注入      | `src/lib/config/runtimeSettings.ts`                                  |
| 儀表板的執行階段狀態             | `src/app/api/settings/authz-inventory/route.ts`                      |
| 儀表板警告橫幅                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins 欄位        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent 每路由 CORS（例外）  | `src/lib/cloudAgent/api.ts`                                          |

## 另請參閱

- [路由防護層級](./ROUTE_GUARD_TIERS.md) — 對具備產生程序能力的路由實施迴路位址強制限制（獨立且互補的控制措施）。
- [授權指南](../architecture/AUTHZ_GUIDE.md) — 完整的驗證與授權流程。
