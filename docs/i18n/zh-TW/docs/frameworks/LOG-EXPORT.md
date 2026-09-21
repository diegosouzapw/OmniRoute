# Log export (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md)

---

將 OmniRoute 呼叫日誌持續、增量匯出至外部分析儲存區。

「日誌」儀表板分頁會將請求歷程記錄保存在 SQLite (`call_logs`) 中，其容量受輪替與保留政策限制。日誌匯出會依排程將相同的記錄集傳送至外部，使其保留時間能超越本機資料庫，並可與其他資料聯結。BigQuery 是第一個目的地；此管線採用登錄檔機制，因此可透過新增項目來加入更多目的地。

---

## 1. 運作方式

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  （「日誌」分頁的欄位集）
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **排程** — 一個 `JobRegistry` cron 工作 `log_export`，預設為 `0 * * * *`（每小時執行一次，UTC）。在 `src/lib/initCloudSync.ts` 中註冊；可使用 `OMNIROUTE_LOG_EXPORT_CRON` 覆寫。每次觸發會依序清空每個**已啟用**目的地的待匯出資料。
- **游標** — 使用 SQLite 隱含的 `call_logs.rowid`，並依各目的地分別保存於 `log_export_destinations.cursor_row_id`。刻意不使用 `timestamp` 作為游標：呼叫端可能會自行提供該值，因此較慢的請求可能會在較晚開始但較快完成的請求之後寫入，而使用時間戳記游標會略過它。
- **批次處理** — 每個請求包含 `batch_size` 列（預設為 500），每次執行最多處理 `max_rows_per_run` 列（預設為 10000），讓大量積壓資料分散在數次觸發中清空，而不是阻塞單次執行。
- **傳遞** — 游標只會在 `send()` 成功完成後前進。批次失敗時，游標會維持原位，因此相同的列會在下次執行時重試。其保證為至少一次傳遞加上目的地端的去重，而非真正的恰好一次傳遞：BigQuery 以呼叫日誌 ID 作為每列的鍵，並在其自身的去重期間內以盡力而為的方式遵循此鍵。
- **重疊防護** — cron 觸發與 `POST .../run` 可能會同時執行。已在清空待匯出資料的目的地會被略過，而不會重複清空（執行結果中為 `skipped: true`），因此並行執行不會重新傳送批次或將游標往回寫。
- **清除復原** — 如果 `cursor_row_id` 最終高於 `MAX(rowid)`（整個資料表已清除且 rowid 重新起算），執行器會將其倒回至 0，而不會永久無法察覺新資料。

### 承載資料（提示詞與補全內容）

預設情況下，匯出內容只包含「日誌」**清單**所顯示的摘要欄位。啟用**匯出提示詞與回應** (`includeBodies`) 後，還會傳送「日誌」**詳細資料**窗格針對每次呼叫顯示的內容：

| 欄位                             | 所包含的內容                              |
| -------------------------------- | ----------------------------------------- |
| `request_body` / `response_body` | 儀表板所呈現的呼叫承載資料                |
| `pipeline_route_decision`        | 路由器選擇的目標與模型                    |
| `pipeline_client_request`        | 用戶端傳送時的原始請求                    |
| `pipeline_openai_request`        | 轉換為內部 OpenAI 格式後的內容            |
| `pipeline_provider_request`      | 實際傳送至上游、採用提供者方言的內容      |
| `pipeline_provider_response`     | 原始上游回應                              |
| `pipeline_client_response`       | 傳回給呼叫端的內容                        |
| `pipeline_error`                 | 失敗呼叫的管線層級錯誤詳細資料            |
| `bodies_truncated`               | 上述任何欄位達到 `maxBodyBytes` 時為 True |

這些是提示詞內容，因此**預設關閉**，並刻意設計為可依各目的地個別選擇。匯出的內容就是儀表板顯示的內容，因為兩者都透過 `getCallLogById` 讀取：承載資料在寫入時就已完成 PII 匿名化與機密資訊遮蔽，而使用 `noLog` API 金鑰進行的呼叫完全不會儲存承載資料，因此沒有可匯出的內容。

系統會針對每列從檔案系統成品中讀取承載資料，因此只有要求取得承載資料的目的地才會執行資料填充。若某列的成品遺失或損毀，系統會匯出其摘要並將承載資料設為 null，而不會使批次失敗並導致游標停滯。

`maxBodyBytes`（預設為 262144）會限制每個欄位的大小。較長的承載資料會被**截斷而非捨棄**——即使提示詞遭到裁切，仍能回答「提出了什麼要求」——並將該列標記為 `bodies_truncated`。不會匯出逐區塊串流的差異資料；組合後的回應已位於 `pipeline_provider_response` 和 `pipeline_client_response` 中。

---

## 2. 檔案

| 元件               | 位置                                         |
| ------------------ | -------------------------------------------- |
| 目的地合約         | `src/lib/logExport/types.ts`                 |
| 登錄檔             | `src/lib/logExport/registry.ts`              |
| 機密處理           | `src/lib/logExport/secrets.ts`               |
| 執行器（游標迴圈） | `src/lib/logExport/runner.ts`                |
| API 投影           | `src/lib/logExport/presenter.ts`             |
| BigQuery 目的地    | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA 驗證     | `src/lib/logExport/googleServiceAccount.ts`  |
| 呼叫記錄來源       | `src/lib/usage/callLogExportSource.ts`       |
| 持久化             | `src/lib/db/logExportDestinations.ts`        |
| Cron 工作          | `src/lib/jobs/logExportJob.ts`               |
| REST 層            | `src/app/api/log-export/`                    |
| 儀表板頁面         | `src/app/(dashboard)/dashboard/log-export/`  |

結構描述：`src/lib/db/migrations/170_log_export_destinations.sql`。

---

## 3. REST API

所有路由都需要管理驗證（`requireManagementAuth`）。機密絕不會被回傳：
已儲存的機密會以字面值 `__stored__` 回傳，而在更新時送回該值，會保留已儲存的憑證。

建立或更新其類型宣告含有機密的目的地時，**必須設定
`STORAGE_ENCRYPTION_KEY`**。若未設定，`encrypt()` 會直接無聲傳回原值，因此寫入作業會以 400
拒絕，而不會將憑證以明文寫入 SQLite（這與 Telegram webhook 採用相同的防護機制）。

| 方法     | 路徑                                     | 用途                                      |
| -------- | ---------------------------------------- | ----------------------------------------- |
| `GET`    | `/api/log-export/types`                  | 目的地類型及其設定欄位清單                |
| `GET`    | `/api/log-export/destinations`           | 列出目的地（機密已遮蔽）                  |
| `POST`   | `/api/log-export/destinations`           | 建立目的地                                |
| `GET`    | `/api/log-export/destinations/{id}`      | 讀取單一目的地                            |
| `PUT`    | `/api/log-export/destinations/{id}`      | 更新名稱／啟用狀態／設定／批次處理        |
| `DELETE` | `/api/log-export/destinations/{id}`      | 刪除                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | 探測憑證，不寫入任何資料                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | 立即清空待處理資料，路徑與排程執行相同    |
| `GET`    | `/api/log-export/status`                 | Cron 狀態、近期執行，以及各目標的待處理量 |

`GET /api/log-export/types` 讓 UI 能夠通用化：儀表板表單會根據回傳的欄位描述元進行呈現，
因此新增目的地時不需要修改 UI。

---

## 4. BigQuery 目的地

設定鍵（`type: "bigquery"`）：

| 鍵                   | 備註                                            |
| -------------------- | ----------------------------------------------- |
| `projectId`          | 包含資料集的 GCP 專案                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                 |
| `location`           | 僅在必須建立資料集時使用（預設為 `EU`）         |
| `serviceAccountJson` | 服務帳戶金鑰。機密：靜態加密，絕不回傳          |
| `autoCreate`         | 第一次匯出時建立資料集與資料表（預設為 `true`） |

服務帳戶需要目標資料表的 `bigquery.tables.updateData` 權限；啟用 `autoCreate` 時，還需要
`bigquery.datasets.create`／`bigquery.tables.create` 權限。

設定的批次是**游標**單位，而不是 HTTP 單位：`send()` 會將其分割成每次最多 500 列的 insertAll
呼叫，因此較大的 `batch_size` 不會觸發 BigQuery 的 10 MB 請求上限。
暫時性狀態（408/429/500/502/503/504）最多會以指數退避重試三次，並重複使用相同的 insertIds；
驗證與結構描述失敗則會在第一次嘗試時直接擲出錯誤，而不會浪費該次執行。

剛建立不久的資料表尚無法由串流端點看見，該端點會在數秒內回應 404。此 404 會被重試，
但**僅限於本次執行建立了該資料表的情況**——真正缺少的資料表仍會立即失敗。
請注意，若使用最近刪除的名稱重新建立資料表，BigQuery 會在數分鐘內拒絕串流插入；
這是先刪除再重新建立所造成的特性，因此相較於刪除後重新加入，建議使用新的資料表名稱。

**部分失敗會以 HTTP 200 回應，並包含非空的 `insertErrors[]`。** 這會被視為失敗並擲出錯誤，
以阻止游標越過 BigQuery 從未接受的資料列；`tests/unit/log-export-bigquery.test.ts`
固定驗證了此行為。

傳輸使用純 REST——自行簽署的 RS256 判斷提示會在
`https://oauth2.googleapis.com/token` 交換存取權杖，接著資料列會傳送至
`tabledata.insertAll`。未引入任何 Google SDK。存取權杖會依（服務帳戶、範圍）在程序內快取。

建立的資料表會為「記錄」分頁中的每個欄位各設一欄，並額外加入 `exported_at`，
其配置方式符合呼叫記錄的實際查詢模式：

- **依 `timestamp` 按日分割**，因此以日期範圍限制的查詢只會掃描那些日期。
- **依 `api_key_name`、`provider`、`model`、`status` 進行叢集化**（依此順序），因此依執行者、
  傳送目的地或是否失敗進行篩選時，可排除各分割區內不相關的資料區塊。BigQuery 最多允許四個
  叢集欄位，且順序很重要：僅以 `api_key_name` 篩選可以排除資料區塊，僅以 `status` 篩選則不行。
- **透過 `partitionExpirationDays` 選擇性設定分割區保留期限**（0 代表保留所有資料），
  並在建立資料表時套用。

這兩項設定都會在建立時套用。現有資料表會保留其既有的配置，因此若要採用這些設定，請將目的地指向新的資料表 ID。

`tests/unit/log-export-bigquery.test.ts` 會確認對應器與資料表結構始終保持同步，因此新增的呼叫記錄欄位不會在匯出過程中被無聲地捨棄。

批次會同時依據資料列數與序列化後的位元組數進行分塊。匯出酬載後，僅依資料列數並不足夠：500 個包含提示詞的資料列可能多達數十 MB，而 insertAll 會拒絕超過 10 MB 的請求。每個分塊會在達到 500 個資料列或 9 MB 時結束，以先達到者為準。

---

## 5. 新增目的地

1. 建立 `src/lib/logExport/destinations/<name>.ts`，匯出一個 `LogExportDestinationType`：
   包含 Zod `configSchema`、供 UI 使用的 `fields` 描述子陣列、`secretFields`，以及一個
   `createClient(config)`，其回傳 `test()` / `prepare()` / `send(records)`。
2. 將其加入 `src/lib/logExport/registry.ts` 中的 `DESTINATIONS` 陣列。
3. 在 `tests/unit/` 下撰寫測試。

這就是所需的全部變更：持久化、cron 工作、REST 層、密鑰加密及儀表板表單都會讀取登錄檔。

新增目的地有兩項規則：

- `send()` 在部分失敗時**必須擲出例外**。成功回傳表示「目的地已擁有這些資料列」，
  且游標會永久移過這些資料列。
- 接受使用者提供 URL 的目的地，必須在擷取前透過
  `parseAndValidateWebhookUrl`（`src/shared/network/outboundUrlGuardPolicy.ts`）驗證該 URL，
  與 Webhook 的處理方式相同。BigQuery 不需要這麼做：其主機為常數。

---

## 6. 操作方式

- **儀表板**：整合 → 日誌匯出。新增目的地，執行**測試**以在不寫入資料列的情況下
  檢查憑證，然後啟用它。
- **積壓資料**：每張目的地卡片都會顯示待處理資料列與游標；`GET
/api/log-export/status` 會回傳相同資料，以及最近 20 次工作執行紀錄。
- **某個目的地失敗不會導致其他目的地失敗**——執行摘要會在 `last_status` /
  `last_error` 中記錄各目的地的狀態，而工作執行歷程則保留彙總結果。
- **刪除目的地也會刪除其游標。** 重新加入該目的地時，會從保留時間最久的呼叫日誌
  開始，這可能會重新傳送目的地中已有的資料列。在 BigQuery 上，每列的 `insertId`
  僅能在 BigQuery 自身的重複資料刪除時間範圍內處理這種情況，因此建議停用目的地，
  而非將其刪除。
