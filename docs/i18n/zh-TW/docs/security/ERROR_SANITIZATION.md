# Error Message Sanitization (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md)

---

> **真實來源：** `open-sse/utils/errorSanitization.ts`、
> `open-sse/utils/errorPathRedaction.ts`，以及 `open-sse/utils/error.ts` 中的公開建構器
> **測試：** `tests/unit/error-message-sanitization.test.ts`、
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **最後更新：** 2026-09-02 — v3.8.51
> **適用對象：** 所有處理錯誤回應（HTTP 路由、SSE 串流、執行器、MCP 處理常式）的工程師。
> **狀態：** 對每一條會將錯誤訊息回傳給用戶端的程式碼路徑，皆為**強制要求**。

## 為何需要此規範

CodeQL 規則 `js/stack-trace-exposure` (CWE-209) 會標記任何將源自執行階段例外狀況的錯誤訊息，在未經清理的情況下傳至 HTTP / SSE 回應的程式碼路徑。正式環境回應中的堆疊追蹤與絕對檔案路徑會讓攻擊者取得：

- 內部目錄結構（`/srv/app/src/lib/...`）→ 用於偵察並發動進一步攻擊。
- 從堆疊框架推斷出的函式庫 / 框架版本 → 選擇針對性的漏洞利用方式。
- 可能透過字串插值納入錯誤訊息的敏感執行階段值（資料庫查詢、設定值）。

由 `open-sse/utils/error.ts` 匯出的 `sanitizeErrorMessage` 輔助函式會移除下列類型的
資訊洩漏：

1. 實體、序列化，以及明確位於行內的 JavaScript 堆疊框架尾端。
2. POSIX、Windows、UNC 與 `file://` 檔案系統絕對路徑，同時保留安全的 HTTPS URL
   以及明確標記的 API 路由。
3. 認證資料指派、常見的提供者權杖格式、私密金鑰 PEM 區塊，以及 base64 資料
   URL。

清理器會限制輸入長度，且當拋出的值無法轉換為字串時採取封閉失敗策略。
遞迴的上游 JSON 清理也會在回應序列化前，移除不安全的認證資料 / 路徑鍵、工作階段別名及
原型控制鍵。

## 強制模式

### 1. 建立錯誤回應（HTTP / API 路由）

使用 `buildErrorBody()`——已內建清理功能：

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... 處理常式邏輯 ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

或者，使用同一模組中的便利包裝函式：

```ts
import {
  errorResponse, // 一次性 Response 物件
  writeStreamError, // SSE 寫入器
  createErrorResult, // { success: false, status, response, ... } 結構
  unavailableResponse, // 新增 Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

以上函式都會套用標準公開錯誤邊界。`errorResponse`、`writeStreamError` 與
`createErrorResult` 會透過 `buildErrorBody` 處理；三個專用的重試 / 斷路器輔助函式則會
直接投影並清理其公開內容。使用這些輔助函式時，**絕不需要手動呼叫
`sanitizeErrorMessage`**。

### 2. 自訂錯誤封套（少見）

當無法使用上述輔助函式時（例如回應結構由 Connect-RPC 等上游通訊協定規定），請直接匯入 `sanitizeErrorMessage`：

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

這是組合自訂錯誤主體唯一獲准的方式。參考實作請見 `open-sse/executors/cursor.ts::buildErrorResponse`。

### 3. 記錄與回應

受信任的內部例外狀況可以保留完整訊息與堆疊，以便維運人員進行偵錯。源自提供者、驗證、瀏覽器工作階段或認證資料相關邊界的值，必須先經過
清理，才能進入主控台輸出、稽核中繼資料或持久化呼叫日誌。模式如下：

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // 僅限受信任的內部例外狀況
  return errorResponse(500, getErrorMessage(err)); // 已清理——傳送給用戶端
}
```

對於由提供者控制的失敗，也必須投影記錄的值：

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. 禁止模式

❌ **絕不可**將原始例外狀況輸出放入 Response 主體：

```ts
// 錯誤：堆疊追蹤與檔案路徑會傳至用戶端
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **絕不可**自行實作僅擷取第一行的分割器：

```ts
// 錯誤：未移除絕對路徑，且可能偏離標準輔助函式的行為
const safe = String(err).split("\n")[0];
```

❌ **絕不可**只在路由中清理，卻遺漏 SSE 路徑。任何寫入串流的內容都必須透過 `writeStreamError`（或其底層的 `buildErrorBody`）處理。

❌ **絕不可**刻意在錯誤訊息中包含 `process.cwd()`、`__filename`、`__dirname` 或衍生自環境變數的路徑。
清理器會涵蓋絕對路徑以提供縱深防禦，但呼叫端從一開始就不應建立會暴露拓撲結構的訊息。

## CI 中的涵蓋範圍

`tests/unit/error-message-sanitization.test.ts` 會強制執行：

- `/api/model-combo-mappings/*` 下的每個路由在發生 4xx/5xx 時，都會回傳經過清理的主體。
- `sanitizeErrorMessage` 會移除多行堆疊追蹤。
- `sanitizeErrorMessage` 會將 POSIX 與 Windows 絕對路徑替換為 `<path>`。
- `sanitizeErrorMessage` 能安全地處理 `null`/`undefined`/`Error` 執行個體輸入。
- `buildErrorBody` 絕不會在其 `message` 欄位中暴露堆疊追蹤。

新增路由或執行器時，請複製此檔案中的斷言模式。涵蓋率門檻（`npm run test:coverage`）要求陳述式／行／函式／分支的涵蓋率皆 ≥60%——錯誤路徑必須納入涵蓋範圍。

## 相關控制措施

- `.github/security` 中的 `js/stack-trace-exposure` CodeQL 警示應一律**要麼**使用這些輔助函式修正，**要麼**在駁回時附上引用本文的註解。
- `pino` 遮蔽設定（`src/shared/utils/logRedaction.ts`）會另外處理受信任的結構化日誌。本文涵蓋公開回應訊息，以及跨越持久化呼叫／代理日誌邊界且由提供者控制的值。
- 上游標頭拒絕清單（`src/shared/constants/upstreamHeaders.ts`）涵蓋標頭洩漏——新增外洩疑慮時，請保持這兩個檔案一致。

## 上游詳細資料透傳

`buildErrorBody` 接受選用的第三個引數 `upstreamDetails`（來自上游提供者的原始已解析主體）。若有提供，則會先由 `sanitizeUpstreamDetails` 清理，再以 `upstream_details` 納入回應。

選用的第四個引數 `classification`（`{ type?: string; code?: string; reason?: string }`）接受明確的公開分類。每個欄位都會被投影至受限的公開識別碼詞彙表。若值不安全、形似憑證、包含控制字元或過長，則會回退至依狀態衍生的 type/code；不安全的選用 reason 則會被省略。三位數 HTTP 狀態識別碼（`100` 至 `599`）對於將數字上游狀態公開為機器可讀代碼的提供者合約仍然有效。本機產生的 HTTP 狀態預留位置形式也接受相同的受限範圍；任意的提供者數字與名稱仍不在詞彙表範圍內。

請將每個明確分類都傳入該第四個引數。切勿在 `buildErrorBody()` 回傳後覆寫 `body.error.code`、`body.error.type` 或 `body.error.reason`；建構後修改會繞過公開投影。

套用於 `upstreamDetails` 的清理規則：

1. 字串葉節點：透過 `sanitizeErrorMessage` 處理（移除堆疊追蹤與絕對路徑）。
2. 移除不安全的路徑、憑證、工作階段別名與原型控制鍵。
3. 深度上限：超過 4 層的巢狀內容會替換為字串 `"[truncated]"`。
4. 陣列上限為 32 個元素。

只有具有已解析提供者錯誤主體的呼叫位置才應傳入 `upstreamDetails`。內部 OmniRoute 錯誤（SSE 解析失敗、空內容、防護機制封鎖）不得包含該引數。

請勿將原始 `err.stack`、`err.message` 或任何來自執行階段例外狀況的字串傳入 `upstreamDetails`。這些內容仍必須在不附帶上游主體的情況下，透過 `errorResponse` / `buildErrorBody(code, msg)` 處理。

選擇性上游 4xx 透傳會保留用戶端自動復原所需的提供者安全 JSON 結構與措辭，但這並非逐位元組透傳：遞迴清理器一律會在序列化前執行。含有循環參照、BigInt 或惡意 `toJSON()` 的主體會以封閉方式失敗，且不符合透傳資格。OCR 與內容審核會套用相同規則；非 JSON、空白或標示錯誤的上游主體會轉換為標準 OmniRoute JSON 錯誤封套。

## 已知的 CodeQL 限制：無法識別自訂清理器

CodeQL 查詢 [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) 使用固定的清理器模式允許清單（例如行內 `.split("\n")[0]`、搭配特定正規表示式形式的 `String#replace`，以及存取 `Error` 的 `.message`）。它**無法**識別透過自訂輔助函式（例如我們的 `sanitizeErrorMessage()`）所進行的間接處理。

這表示可證實透過此模組進行清理的呼叫位置——例如 `open-sse/utils/error.ts::errorResponse` 與 `open-sse/executors/cursor.ts::buildErrorResponse`——即使程式碼在功能上是安全的，仍可能持續觸發警示。先前的駁回案例：`#224`、`#231`（2026 年 5 月），兩者皆附上技術理由並標記為 `false positive`。

**如何處理新的發生案例：**

1. 確認該呼叫位置確實透過 `sanitizeErrorMessage` / `buildErrorBody` / 上述其中一個包裝函式處理訊息（從頭到尾閱讀呼叫鏈——不要輕信註解）。
2. 確認 `tests/unit/error-message-sanitization.test.ts` 有涵蓋此路徑（否則請新增測試涵蓋範圍）。
3. 透過 `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` 駁回警示，並引用此文件。
4. **不要**為了「修正」而在各處行內加入 `.split("\n")[0]`——該輔助函式是單一事實來源；僅為表面上安撫掃描器而重複此模式，反而會削弱清理器的功能（失去路徑清除、長度上限及類型強制轉換）。

採用 CodeQL 的 [`@codeql/javascript-models` 自訂清理器設定](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/)等選擇性啟用功能，才是長期解決方案；相關內容不在本文件的範圍內。

## 參考資料

- [CWE-209：透過錯誤訊息洩露資訊](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP：錯誤處理速查表](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- 將輔助函式集中化的提交：`1a39c31f` — _fix(security): 遮蔽公開的上游憑證並集中化錯誤清理_
