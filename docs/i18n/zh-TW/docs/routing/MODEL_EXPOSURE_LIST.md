# Model Exposure Allow/Deny List (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> 選擇性啟用，預設關閉（`modelVisibilityAllowlist`/`modelVisibilityDenylist` 皆為空時，
> `/v1/models` 目錄與每個 `auto/*` 候選集在位元組層級上完全相同）。這是
> `hidePaidModels`/`hideAutoCombos`（`src/lib/db/settings.ts`）的同級設定，供基於與成本
> 無關的原因而希望提供精選模型清單的營運者使用。

## 此功能存在的原因

`hidePaidModels` 回答「這個模型是否免費？」，而 `hideAutoCombos` 回答「是否應該公布
`auto/*` 虛擬 ID？」——兩者都無法讓營運者挑選任意模型子集（例如，只呈現特定 Claude
Code / OpenCode 用戶端應該看到的模型，而不考量定價）。#11481 新增兩個彼此獨立、
選擇性啟用的字串陣列設定來達成此目的。

## 設定

| 鍵                         | 類型       | 預設值 | 意義                                             |
| -------------------------- | ---------- | ------ | ------------------------------------------------ |
| `modelVisibilityDenylist`  | `string[]` | `[]`   | 與候選項目相符的項目會將其從目錄／候選集中隱藏。 |
| `modelVisibilityAllowlist` | `string[]` | `[]`   | 非空時，只有與項目相符的候選項目會維持公開。     |

兩者皆最多接受 500 個項目，每個項目最多 200 個字元（在
`src/shared/validation/settingsSchemas.ts` 中透過 Zod 驗證）。項目可以是：

- 完全相符的目錄 ID——`"gpt-4o"`（不含提供者的模型 ID）或 `"openai/gpt-4o"`（含提供者前綴），或
- 使用 `*`/`?` 的 glob 模式——例如 `"openai/gpt-4*"` 或 `"anthropic/*"`——透過
  相同的共用 `globToRegex()` 比對器（`src/shared/utils/globPattern.ts`）解析；該比對器已用於
  `ModelRoutingSection` 的每模型組合對應，以及 `freeModels.ts::matchesOnlyPaidModels`。

優先順序：先檢查拒絕清單（被拒絕的項目一律隱藏，即使同時符合允許清單亦然）；
當允許清單非空時，只有與其相符的項目會保留。

## 兩個關卡，而非一個

#6512 的教訓同樣適用於此處：僅使用 `hidePaidModels` 的目錄篩選器，仍會讓 `auto/*`
路由至付費模型，因為組合候選集是獨立建構的。比對述詞 `isModelExposureAllowed()`
（`src/shared/utils/modelExposureList.ts`）會從以下兩處呼叫：

- `src/app/api/v1/models/catalog.ts`——`/v1/models` 清單本身，位於 `shouldHidePaid()`
  已設下關卡的相同 5 個各來源關卡（靜態 `PROVIDER_MODELS`、已同步的提供者資料列、
  自訂資料列、由別名支援的資料列、受管理的備援資料列）。
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()`——從
  `virtualFactory.ts::buildPreparedPool` 呼叫，緊接在等效的
  `filterPaidOnlyCandidates()` 呼叫之後，因此被拒絕的模型也絕不會被選入 `auto/*`
  候選集。

## 不會篩選的項目

此行為與 `hideAutoCombos` 的既有行為一致：**明確**傳送的模型 ID（非透過 `auto/*`，
且不是透過目錄清單找到）絕不會在分派時遭到封鎖——只有是否公開／候選集成員資格
會被篩選。這與 `hidePaidModels` 無關；營運者可能基於與成本無關的原因而希望提供
精選模型集，因此兩項設定會組合為彼此獨立且以 AND 連接的篩選器，與 `catalog.ts`
中的既有多旗標組合相同。

設定匯出（`GET /api/settings/export-json`）會像其他任何設定欄位一樣，逐字包含這兩個
陣列——不同於 `hidePaidModels` 的組合步驟匯出篩選器，此處沒有重新載入的風險：
嵌入已匯出組合步驟中的被拒絕 ID，是營運者自行明確指定的路由選擇，並非匯出邊界
需要移除的內容。
