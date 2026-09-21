# Thinking Budget (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md)

---

> **儀表板：** 設定 → **AI** → 思考預算  
> **API：** `GET` / `PUT` `/api/settings/thinking-budget`  
> **原始碼：** `open-sse/services/thinkingBudget.ts`

思考預算控制 OmniRoute 是否會在請求傳送至提供者的途中**重寫用戶端的思考／推理參數**。它**不會**開啟或關閉壓縮、路由或提示快取。

## 模式

| 模式                      | OmniRoute 的行為                                                                                        | 適用時機                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`passthrough`**（預設） | 保持用戶端欄位不變（`reasoning`、`reasoning_effort`、Claude `thinking`、Gemini `thinking_config` 等）。 | **Codex / Desktop / 任何應由用戶端控制投入程度與推理摘要的用戶端。** 若要在用戶端請求 `reasoning.summary` 時顯示思考面板，必須使用此模式。 |
| **`auto`**                | 在傳送至上游之前，從請求本文中**移除所有**思考／推理欄位。                                              | 僅適用於你刻意希望由**提供者**決定預設值，且**不**需要由用戶端控制思考的情況。它**不**代表「自動顯示思考」。                               |
| **`custom`**              | 使用固定的思考 token 預算覆寫每個請求。                                                                 | 對所有流量的思考 token 設定硬性上限。                                                                                                      |
| **`adaptive`**            | 根據訊息數量、工具和提示長度，以基準投入程度動態調整預算。                                              | 在不完全移除用戶端意圖的情況下，進行彈性的 token 控制。                                                                                    |

### `auto` 會移除的內容

當模式為 `auto` 時，`stripThinkingConfig()` 會刪除（包括但不限於）：

- OpenAI / Responses：`reasoning`、`reasoning_effort`
- Claude：`thinking`，以及存在時的 `output_config.effort`
- Gemini：`generationConfig.thinking_config` / `thinkingConfig`

如果用戶端（例如 Codex Desktop）傳送了 `reasoning: { effort: "ultra", summary: "detailed" }`，**auto 會移除該物件**。上游可能仍會計費部分推理 token，但通常只會傳回**空白或僅加密的**推理項目，因此 UI 不會顯示有用的思考串流。

## 這**不是**什麼

| 功能                               | 關係                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **壓縮**（Caveman、RTK、堆疊式等） | 獨立的管線。可在所有思考預算模式下運作。                                                                  |
| **提示／語意快取**                 | 獨立功能。不受思考預算模式影響。                                                                          |
| **組合路由／後備機制**             | 獨立功能。不受影響。                                                                                      |
| **API 金鑰 token 限制／成本預算**  | 獨立功能。不受影響。                                                                                      |
| **推理重播快取**                   | 適用於嚴格提供者（DeepSeek、Kimi、Qwen-thinking 等）的多輪重新注入機制。與 Desktop 的「顯示思考」不同。   |
| **解密 `encrypted_content`**       | **不可能。** OpenAI/Codex 的私有推理資料塊是不透明的。OmniRoute 絕不會解密它們（#7095 / #7176 / #7304）。 |

## 可見的思考內容（Codex / Responses 用戶端）

若要讓用戶端顯示思考文字，您需要同時滿足以下**所有**條件：

1. Thinking Budget 模式 = **`passthrough`**（或使用 custom/adaptive，且仍完整保留您所用路徑所需的摘要請求）。
2. 用戶端要求提供摘要，例如 Codex `model_reasoning_summary = "detailed"` / `auto`（不能是 `none`）。
3. 上游實際串流傳送 `response.reasoning_summary_text.*`（或項目中非空的 `reasoning.summary`）。

若您只收到「加密的私有推理」，原因可能是：

- 模式為 **`auto`**（用戶端請求已被移除），或
- 上游傳回了不含摘要文字的 `encrypted_content`（提供者限制；OmniRoute 只能顯示預留位置文字，無法顯示純文字）。

## API 範例

```bash
# 讀取
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# 建議用於在 Codex / Desktop 中顯示思考內容
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

結構描述（`updateThinkingBudgetSchema`）：`mode` ∈ `passthrough|auto|custom|adaptive`；可選欄位包括 `customBudget`、`effortLevel`、`baseBudget`、`complexityMultiplier`。

### 持久化／重新啟動

此值儲存於設定鍵 `thinkingBudget` 下，並在程序啟動時載入（`hydrateThinkingBudgetConfig`）。透過資料庫或某些非 API 路徑變更後，請**重新啟動 OmniRoute 程序**，讓記憶體中的單例與磁碟內容保持一致。

## 操作人員檢查清單

- [ ] Codex / Desktop 使用者：模式 = **passthrough**
- [ ] 若您希望節省**訊息**的權杖用量，請維持啟用壓縮，而不是移除思考內容
- [ ] 不要期望 `auto` 會「顯示更多思考內容」
- [ ] 僅加密摘要是**提供者**的行為；passthrough 無法將其解密

## 相關文件

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — 多輪 `reasoning_content` 快取
- [USER_GUIDE.md](./USER_GUIDE.md) — Settings 儀表板分頁
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 設定端點
