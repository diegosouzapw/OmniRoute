# Chaos Mode (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md)

---

> **儀表板：** **Chaos Mode**（側邊欄）→ `/dashboard/chaos`  
> **API：** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run`（儀表板工作階段）· `POST /api/skills/collect/chaos`（API 金鑰）  
> **原始碼：** `src/lib/chaos/chaosExecutor.ts`、`src/lib/chaos/chaosConfig.ts`

Chaos Mode 會將**一項任務同時傳送給多個提供者**——每個參與的提供者都會貢獻一個模型執行個體，而您可以並排取得所有答案（或將它們串連起來）。這是一個多模型執行介面，而非路由策略：您的一般 `/v1/chat/completions` 流量絕不會受到影響。

**釐清——產品中有三種名稱包含「chaos」但彼此不同的功能：**

| 項目           | 說明                                                                                                           | 文件位置                                     |
| -------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode** | 本文所述的儀表板頁面與 API：將一項任務分派給多個提供者（平行或協作執行）。                                     | 本指南                                       |
| `auto/chaos`   | 一個使用故障注入評分權重的 Auto-Combo 模型 ID，用於韌性測試。無需進行任何設定。                                | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos 組合設定 | 一個已持久化的組合，其中 `config.chaos.enabled` 會將任務分派給一組模型，並可選擇性地使用裁判模型（僅限 API）。 | `open-sse/services/autoCombo/chaosEngine.ts` |

## 設定

1. 開啟 **儀表板 → Chaos Mode**（`/dashboard/chaos`）。
2. 將其**開啟**——Chaos Mode 預設為**停用**（`src/lib/chaos/chaosConfig.ts` 中的 `enabled: false`）。停用時，`POST /api/chaos/run` 會回應
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`。
3. 選擇參與者與預設值（透過設定儲存區按執行個體持久化）：

   | 欄位                | 含義                                                            | 預設值／限制                           |
   | ------------------- | --------------------------------------------------------------- | -------------------------------------- |
   | `enabled`           | 總開關                                                          | `false`                                |
   | `defaultMode`       | `parallel` 或 `collaborative`（請參閱下文）                     | `parallel`                             |
   | `providerOverrides` | 各提供者的參與設定（`providerId`、選用的 `modelId`、`enabled`） | 空值 = 每個啟用中的提供者，上限 200 個 |
   | `systemPrompt`      | 覆寫內建的 Chaos 系統提示詞                                     | 選用，最多 10 000 個字元               |
   | `timeoutMs`         | 每次模型呼叫的最長時間                                          | `120000`（5 000–600 000）              |
   | `maxTokens`         | 每次模型呼叫的 `max_tokens`                                     | `4096`（256–128 000）                  |

4. **直接從頁面執行測試**——結果面板會顯示每個提供者的答案、狀態與持續時間。

## 執行模式

- **`parallel`**——每個模型會同時收到相同的任務；您會獨立取得所有答案。
- **`collaborative`**——模型會**依序串連執行**：每個模型都能看到上一個模型的輸出，並被要求加以改進、擴充、評論或提出替代方案。回應中的 `summary` 欄位會依串連順序合併成功的輸出（平行執行不會有 `summary`）。

## API

### `POST /api/chaos/run`——儀表板工作階段

使用 Cookie 驗證（管理工作階段——請參閱
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)）；供儀表板頁面使用。

```jsonc
// 請求主體
{
  "task": "Compare approaches to X", // 必填
  "providers": ["glm", "kimi"], // 選填篩選條件
  "mode": "parallel", // 選填——覆寫 defaultMode
  "systemPrompt": "…", // 選填覆寫值
  "maxTokens": 4096, // 選填覆寫值
}
```

### `POST /api/skills/collect/chaos`——API 金鑰

供外部呼叫者使用的 Bearer 權杖版本。金鑰必須具有 **Chaos Mode 權限**（`chaosModeEnabled`），而該權限**預設為關閉**——請在
**儀表板 → API Manager → 編輯金鑰 → 權限 → Chaos Mode** 中為各金鑰啟用。請求主體與上述相同。

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

兩個端點會傳回相同的結構：

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // 僅限 collaborative 模式
}
```

## 疑難排解

- **`400 Chaos Mode is not enabled`**——請參閱上述步驟 2：全域開關目前為關閉狀態。
- **API 金鑰在 `/api/skills/collect/chaos` 上遭拒絕**——該金鑰缺少個別金鑰的 `chaosModeEnabled` 權限（預設為關閉；這是設定問題，而非錯誤）。
- **預期出現的提供者未列於結果中**——請檢查 Chaos Mode 頁面上的 `providerOverrides`（停用的覆寫設定會排除該提供者），以及提供者連線是否處於啟用狀態。
