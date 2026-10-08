# ACP registry and registered CLI launchers (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md)

---

OmniRoute 將 **CLI 探索**、**原生 Agent Client Protocol** 與
**舊版 stdio 轉接器**分開處理。找到已安裝的二進位檔，並不代表其
驗證狀態、模型相容性，或處理提示的就緒狀態已獲確認。

儀表板使用 `GET /api/acp/agents` 與 `POST /api/acp/agents` 進行清查
及自訂代理程式註冊。這些是僅限本機使用的管理路由，而不是用於
產生程序或提交提示的公開 API。內部的
`AcpManager` 不會自動成為 HTTP 提供者的備援。

## 已註冊的合約

`config/cli-tools-manifest.json` 是內建啟動
二進位檔、引數與後端模式的唯一真實來源。登錄檔會從該資訊清單衍生其定義。
偵測結果會快取 60 秒。

- `acp`：Gemini 合約會啟動 `gemini --experimental-acp`，並透過
  官方 TypeScript SDK 使用以換行符分隔的 ACP JSON-RPC 進行通訊。
- `stdio-adapter`：其他已註冊的合約會保留舊版的換行輸入、
  stdout 輸出轉接器。輸出閒置兩秒後，其回應即告結束。
  此轉接器**不會**證明這些 CLI 原生支援 ACP。

Gemini 在其 [CLI 參考文件](https://geminicli.com/docs/cli/cli-reference/)中記載了此啟動旗標。
用戶端使用[官方 ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
進行初始化、建立工作階段、提示請求、通知與取消。

自訂代理程式定義仍是由管理員控制的啟動合約。
註冊二進位檔與引數，會授予該程序伺服器使用者的本機
執行權限；註冊並不等同於沙箱。版本探查僅接受
已註冊的可執行檔與可辨識的版本旗標。

## 內部啟動 API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // 僅傳遞刻意指派給此代理程式的提供者變數。
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // 在呼叫端應用程式中使用回應。
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` 會從已註冊的定義解析可執行檔與引數。
呼叫端唯一可用的選項是 `cwd` 與 `env`；舊版
`spawn(agentId, binary, args, env)` 簽章及可執行檔覆寫
會遭到拒絕。此管理器不支援 HTTP 啟動合約。

子程序會繼承與 CLI 啟動器相同的作業系統、終端機、地區設定及憑證
允許清單。伺服器／提供者密鑰不會從父程序環境複製。
所選 CLI 所需的認證資訊必須明確傳遞，
或透過該 CLI 自己的本機驗證來提供。子程序
仍具有本機使用者的檔案系統權限，且可能讀取其自身的設定。

## 原生生命週期與限制

1. 產生已註冊的二進位程序、初始化 ACP，並建立以
   所選工作目錄為根目錄的工作階段。初始化時限為十秒。
2. 提交提示，並僅收集該工作階段的文字通知。
   完成的判定依據是提示 RPC 回應，而非 stdout 靜默一段時間。
3. 使用單一提示期限，其中包含任何尚未完成的初始化；預設
   為 120 秒。同一程序內的並行提示會遭到拒絕。
4. 原生操作逾時時，會嘗試執行 `session/cancel` 並終止程序。
   終止前會保留一個有界的 100 ms 時窗，讓通知完成清空。
5. 當初始化失敗、連線關閉、程序結束，或呼叫端將其終止時，
   關閉傳輸狀態並移除工作階段。

工具權限請求會遭到拒絕。系統不會宣告任何檔案系統或終端機用戶端
能力。這些限制不會將子二進位檔置於沙箱中，
也不會取代 CLI 自身的授權設定。

原生文字與舊版 stdout/stderr 均最多保留 1 MiB 的字元，
並保留最新輸出及截斷通知。單一原生線路
訊框在 SDK 剖析前的大小上限為 2 MiB。緩衝區會於每次提示時重設。

`kill(sessionId)` 會傳送 SIGTERM；若程序
在五秒後仍未結束，則傳送 SIGKILL。舊版提示逾時會釋放監聽器與計時器，
但會讓工作階段保持可用，以供另一個提示使用；呼叫端在完成後仍須負責
呼叫 `kill()` 或 `killAll()`。

## 事件與檢查

管理器會發出 `stdout`、`stderr` 與 `exit` 事件，每個事件都包含 `sessionId`。
`sessionError` 會回報經過清理的傳輸錯誤。相容性 `error`
事件僅在有訂閱者時發出，因此缺少二進位檔
不會造成未處理的 EventEmitter 錯誤。

- `getSession(sessionId)` 會傳回受管理的工作階段或 `undefined`。
- `getActiveSessions()` 會排除已停止或正在停止的工作階段。
- `sendInput(sessionId, input)` 僅適用於執行中的舊版轉接器；
  原生 ACP 會拒絕原始輸入，以保護其 JSON-RPC 串流。
- `killAll()` 會終止該執行個體所管理的每個工作階段。

## 驗證界限

確定性測試夾具涵蓋原生交握、文字輸出、遭拒絕的
權限、取消、並行提示、初始化失敗、程序
結束、輸出限制與密鑰隔離。現有的舊版緩衝區／監聽器
迴歸問題仍在涵蓋範圍內。這些測試無法證明即時 Gemini 登入
或成功的提供者推論；這些項目需要在目標環境中
另外執行已授權的煙霧測試。

## 相關文件

- [代理程式通訊協定](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI 啟動合約](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI 工具](../reference/CLI-TOOLS.md)
- [A2A 伺服器](./A2A-SERVER.md)
- [雲端代理程式](./CLOUD_AGENT.md)
