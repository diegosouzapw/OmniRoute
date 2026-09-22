# Reasoning Routing (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md)

---

推理路由規則擴充了現有的模型與組合路由。當沒有任何作用中的規則相符時，
現有的思考、後綴、連線預設值及提供者轉換行為均維持
不變。

## 管理

規則管理功能位於 **設定 → 全域路由**。API 金鑰編輯器提供相同的管理 UI，並篩選為所選的金鑰。

管理 API 透過下列路由公開：

- `GET` 和 `POST`：`/api/settings/reasoning-routing-rules`
- `GET`、`PATCH` 和 `DELETE`：`/api/settings/reasoning-routing-rules/[id]`
- `POST`：`/api/settings/reasoning-routing-rules/simulate`

所有路由皆使用 `requireManagementAuth`。輸入會使用
`src/shared/validation/schemas/reasoningRouting.ts` 中的結構描述進行驗證。模擬器絕不會發出上游呼叫。

## 規則解析

早期評估只會選取一條規則。範圍會依下列順序檢查：

1. `apiKey`
2. `combo`
3. `model`
4. `global`

在同一範圍內，會先選擇 `priority` 較高者，接著依序選擇精確模型比對而非 glob 模式，
然後按穩定的 `createdAt` 與 `id` 排序。`requestTags` 僅從 `metadata.tags`
讀取，並支援 `any` 或 `all` 比對。

僅當沒有任何早期規則勝出，且已選取具體的提供者連線時，才會評估 `connection` 規則。
該規則只能變更推理強度與預算。

## 推理強度與預算

`sourceEffort` 接受 `any`、`missing`、`none`、`low`、`medium`、`high`、`xhigh`、`max` 和
`ultra`。`missing` 表示請求既不包含離散的推理強度，也不包含思考開關或思考預算。
因此，僅有預算的訊號只會與 `any` 相符。

`effortMode` 有三種變體：

- `inherit` 保留用戶端的推理強度，同時仍允許變更模型或組合。
- `default` 僅在沒有明確推理訊號時設定 `targetEffort`。
- `force` 使用 `targetEffort` 取代離散的推理強度。

此外，`budgetAction` 可設為 `preserve`、`remove` 或 `set`。`force` 與 `none` 搭配時，會移除
所有可辨識的推理強度與預算欄位。`none` 與 `set` 同時使用是無效的。

以已知不相容模型為目標的請求，會在上游呼叫前遭到拒絕。若目標為組合，
則會移除不相容的項目；若移除後沒有任何項目，請求會回傳狀態碼 `400`。
未知的功能支援資料會產生警告，但規則仍會保持作用中。

## 安全性與傳輸

來源與目標模型，或來源與目標組合，仍受現有 API 金鑰政策約束。
推理規則絕不會擴大模型、組合或配額權限。

引擎已整合至 Chat Completions、Responses、Anthropic Messages，以及內部
Codex WebSocket 路徑。WebSocket 路徑僅接受 Codex 目標模型；組合目標無法在該處執行。
規則決策會儲存在現有的路由追蹤中，且不包含機密資訊。

## 持久化

遷移檔案 `src/lib/db/migrations/126_reasoning_routing_rules.sql` 會建立
`reasoning_routing_rules` 資料表。規則會參照已儲存的 API 金鑰、組合及提供者連線。
刪除時會清理相關規則。`src/lib/db/reasoningRoutingRules.ts` 中的資料庫存取層
會維護可失效的請求路徑快取。

SQLite 備份、完整資料庫匯出及設定同步套件中都會包含規則。
`reconcileReasoningRulesForSync` 會停用缺少參照的匯入規則，並回報這些衝突。
