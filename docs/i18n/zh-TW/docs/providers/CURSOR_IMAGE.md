# Cursor Image Generation (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute 透過與聊天相同的提供者 id `cursor`（別名 `cu`），在 `POST /v1/images/generations` 公開 Cursor 方案的**圖片生成**功能。

| 欄位                 | 值                                                                             |
| -------------------- | ------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` id | `cursor`                                                                       |
| 格式                 | `cursor-agent-image`                                                           |
| 驗證                 | 與聊天相同的 OAuth／API 金鑰連線（`provider_connections.provider = "cursor"`） |
| 模型                 | `cursor/auto`、`cursor/composer-2`、`cursor/composer-2.5`                      |

## 為何使用 Agent CLI

OmniRoute 中的 Cursor 聊天使用 `agent.v1.AgentService/Run`（protobuf）。該路徑會**拒絕**內建的用戶端工具（shell、write 等）。圖片生成是由 **`agent` CLI** 針對該席位執行的 Cursor 原生工具。因此，圖片處理常式會使用鎖定的提示詞和每個請求各自的臨時工作區來啟動 `agent`（結構與社群席位橋接器相同），然後傳回與 OpenAI 相容的 `b64_json`。

## 存取限制（強制規則 #15 + #17）

這是唯一會啟動子程序（`agent` 二進位檔）的 `IMAGE_PROVIDERS` 格式。由於 `POST /v1/images/generations` 由約 40 個其他不會啟動子程序的圖片提供者共用，而遠端呼叫端確實需要使用這些提供者，因此整條路由**不會**被分類為 `LOCAL_ONLY`；改由 `handleCursorAgentImageGeneration` 使用 authz 管線在每個請求上標記的受信任 `AUTHZ_HEADER_PEER_LOCALITY` 判定結果來執行自己的存取閘門（此判定來自真實的 TCP 對等端，而不是可偽造的 `Host` 標頭）：只有 `loopback` 和 `lan` 呼叫端可以觸發程序啟動；其他所有呼叫端（包括透過公開通道重播外洩 API 金鑰的情況）都會在查詢任何憑證或啟動任何程序之前收到 `403`。請參閱 `src/server/authz/policies/management.ts`，其中將相同政策套用至 `LOCAL_ONLY` 層級的其餘部分。

## 並行閘門位於模組層級（單一執行個體限制）

`CURSOR_IMG_MAX_CONCURRENT` 由作用域限定於 Node 模組執行個體（`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`）的記憶體內計數器／佇列強制執行。它可正確限制單一 OmniRoute 程序內同時啟動的 `agent` 數量，但**不會**在共用相同 Cursor 席位的多個程序／執行個體之間協調（例如多複本部署）；每個執行個體都會執行各自獨立的限制。對於單一執行個體部署（預設值），此限制是精確的；水平擴充的部署應為每個執行個體保守設定 `CURSOR_IMG_MAX_CONCURRENT`，或將 Cursor 圖片流量路由至單一執行個體。

## 需求

1. 儀表板中已連線的 Cursor 帳戶（OAuth 或 `crsr_…` API 金鑰）。
2. OmniRoute 程序可使用 Cursor Agent 二進位檔：
   - 環境變數 `CURSOR_AGENT_BIN=/path/to/agent`，或
   - `~/.local/bin/agent`，或
   - Cursor 連線上的 `providerSpecificData.agentBin`。

選用調校：

| 環境變數                    | 預設值               | 含義                       |
| --------------------------- | -------------------- | -------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`             | 每張圖片的實際經過時間上限 |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                  | 共用席位的並行閘門         |
| `CURSOR_IMG_MODEL`          | （請求模型／`auto`） | 覆寫 CLI `--model`         |

## 範例

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

生成通常需要 1–2 分鐘。建議使用內部網路路徑；逾時約為 100 秒的邊緣代理將會失敗。

## LiteLLM

註冊圖片模型時，請使用 `mode: image_generation`、`api_base: http://omniroute:20128/v1`，以及 `model: openai/cursor/auto`（或依 LiteLLM 版本使用不含前綴的 `cursor/auto`）。
