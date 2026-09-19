# Admission lanes (#9654) — two lane systems, what gates each, where each reports (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md)

---

OmniRoute 有**兩套**不同作用範圍的程序區域通道系統。兩者互為補充；維運人員應瞭解自己正在查看的是哪一套系統。

## 1. 位元組層級的全程序准入控制（`chatBodyAdmission.ts`）

- **作用範圍：**適用於 `POST /v1/chat/completions`、`/v1/messages`、`/v1/responses` 及其他聊天形式路由的緩衝主體／堆積路徑。防止大型程式開發代理程式的請求主體造成堆積放大（#4380）。
- **每個程序使用一個全域控制器，而非每個金鑰各自擁有通道（#10110）。**每個 API 金鑰（雜湊後）或 `anonymous` 工作階段，都會依據**同一個**共用預算進行准入——雜湊後的工作階段 ID **僅**用作公平排程金鑰（在等待者之間以輪詢方式分派），絕不會作為容量分片。此文件的先前版本曾描述每個金鑰各自擁有獨立容量的通道；該模型已於 #10110 中移除，因為它會讓未經驗證的偽造憑證成倍擴大全程序限制。
- **閘門（#503-fanout）：自動推導的輸入位元組預算，而非固定的請求數量。**舊版 `CHAT_MAX_HEAVY_IN_FLIGHT` 請求數量上限（此修正前的預設值為 `1`）會將程式開發代理程式的扇出（多個子代理程式／CLI，請求主體通常 > 256 KB）壓縮至約 1 的有效並行數，導致在完全正常的負載下傳回 503。現在，只有在維運人員明確設定 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` 時，此限制才會生效。若未設定，准入控制會改由 `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` 限制——此預算會根據程序的實際記憶體上限自動推導（`src/shared/middleware/admissionBudget.ts`）：取 V8 堆積限制與任何 cgroup／容器限制中較嚴格者的 25%，再除以 8 倍的暫時性放大係數，並限制在 8 MiB 至 2 GiB 之間。明確覆寫的值也使用相同的上下限。如此一來，從 512 MB 容器到 32 GB 桌上型電腦，都能自行調整，無須調校環境變數。若請求主體無法容納於有效預算內，會立即以 `413 body_exceeds_budget` 失敗；只有可個別處理的請求主體之間發生資源競爭時，才會進入有界公平佇列。即時多訊號資源壓力追蹤器（V8 堆積比率、cgroup、PSI、OOM 事件——`open-sse/utils/resourcePressurePolicy.ts`）會在 `high` 壓力下縮短有界等待時間，並在 `critical` 壓力下、甚至尚未輸入任何位元組之前，立即以 `503 resource_pressure` 卸載流量。
- **調校：**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — 覆寫自動推導的位元組預算
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — 舊版請求數量上限，僅在選擇啟用時生效
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 傳回 503 前的佇列等待時間（預設為 2000）
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — 佇列位元組數的堆積安全閥（預設為 4 MB）
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — 自 #10110 起已棄用且不執行任何操作（為了設定相容性仍接受，但會忽略）
- **報告：**`GET /api/monitoring/health` → `chatAdmission`（#11244）——包括 #503-fanout 新增的 `inflightBytes`、`maxInflightBytes`、`budgetSource`（`v8_heap` | `cgroup` | `override`）、`pressureSeverity` 及 `countCapEnabled`（在預設部署中為 false——確認實際生效的是位元組預算，而非舊版數量上限）。

## 2. 自適應執行階段虛擬通道（`open-sse/services/admission`）

- **範圍：** 用於提供者分派的租戶金鑰准入控制——佇列成本、延遲導向的限制調整、通道排隊，以及通道指標。
- **閘門：** **選擇性啟用。** 除非設定 `OMNIROUTE_CHAT_VIRTUAL_LANES=true`，否則停用。若未啟用，自適應控制器會維持共用佇列行為（只有在操作人員啟用通道後，才符合 #9654 的準則 1）。
- **調校：** `OMNIROUTE_CHAT_VIRTUAL_LANES` + 自適應設定（`maxQueueCount`、`maxQueueCost`、`defaultMaxWaitMs`、…）。
- **報告：** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`、`laneQueuedCount`、`laneQueuedCost`、`laneTenants`（不透明的通道 ID，絕不包含原始金鑰），以及 `virtualLanes`——快照中判定「通道已啟用」的權威旗標。

## 3. 扇出探測——combo/fusion 的逐目標准入控制（#9654 Wave 2）

Combo（優先順序／循環）和 fusion 會在一個父請求下扇出至 N 個模型目標。自 #9654 Wave 2 起，**每個扇出目標在分派前都會經過閘門檢查**，方式是針對**父請求的**租戶通道執行逐目標探測（`PerTargetAdmissionHook`，由 `createPerTargetAdmissionHook` 建立）。

- **範圍：** combo、fusion 和 chaos 引擎所分派的每個扇出目標。系統 1（位元組層級）不受影響——它從不探測扇出目標。
- **閘門：** **隨系統 2 選擇性啟用。** 未設定 `OMNIROUTE_CHAT_VIRTUAL_LANES` 時不執行任何操作——在該模式下，父請求已持有共用佇列租約，因此探測會重複計算並拒絕 combo 目標。
- **語意：**
  - **嚴格非阻塞——略過，絕不排隊。** `maxWaitMs 0`：通道已滿時會略過該目標，改由 combo 的備援機制（或 fusion 的存活面板）提供服務。這是刻意的設計：扇出目標屬於冗餘工作，讓它排隊會對通道原本要阻止的同一壅塞狀況施加更多負載。因此，`defaultMaxWaitMs` **僅**適用於父請求；扇出探測絕不等待，且刻意**不提供任何旋鈕**讓它們等待（議題歷史顯示，等待旋鈕會造成 #9654 所要防止的大量 502/504 類問題——只有在操作人員回報略過扇出目標會損害回應品質時，才重新檢討）。
  - **准入後釋放。** 獲准的探測會立即釋放其租約：它是容量閘門，而不是占用機制。父請求的租約已涵蓋扇出；再持有 N 個租約會灌大共用的作用中成本，並拒絕其他租戶。這是盡力而為，而非預留：在探測與分派之間，通道可能再次填滿，因此在高度爭用下，閘門可能會准許目標進入一個在目標實際分派時又已滿載的通道。
  - **依實際扇出主體計價。** 探測會根據目標的實際主體估算成本——包括從其 `stream` 旗標衍生的請求類別，與父請求路徑完全相同——因此，fusion 面板成員（`stream: false`）會按照其實際占用的非串流類別計價，而優先順序／循環目標則按照使用者要求的類別計價。
- **報告：** 第一個目標之後發生的探測略過會增加 combo 每個請求的 `fallbackCount`（與現有備援語意一致；可在 combo 日誌中看到）；當所有面板成員皆被略過時，fusion 會傳回 503。目前快照上**沒有彙總計數器**（例如 `virtualFanoutSkipped`）——若操作人員回報無法判斷通道閘門略過扇出目標的頻率，就應以此作為新增該計數器的觸發條件。

## 儀表板中顯示的是哪一種

- `adaptiveAdmission.laneCount` / `laneTenants` → **自適應虛擬通道**（系統 2）。
- `adaptiveAdmission.virtualLanes === true` → 第 3 節的扇出探測也處於啟用狀態。若承載資料缺少 `virtualLanes`，或其值為 `false`，表示未設定 `OMNIROUTE_CHAT_VIRTUAL_LANES`——位元組層級的通道（系統 1）仍處於啟用狀態，但在啟用此設定之前，`adaptiveAdmission` 下的任何功能（以及任何扇出閘控）都不會生效。

## 為何兩者並存

位元組層級的通道會限制記憶體使用量較高的剖析/壓縮路徑；自適應通道則會限制每個租戶的分派成本。#9654 的準則 1（「單一工作階段的突發流量不會導致另一個工作階段收到 503」）會由系統 1 無條件強制執行，並在選擇啟用後由系統 2 強制執行。

## 4. 單一處理程序中的長時間 `/v1/responses`（健康餘裕）

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) 新增了 `tryAcquireHealthyHeadroom`，使堆積記憶體低於 `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` 時，能夠接受第二個結構複雜度較高的請求。`admitChatRequest` 所使用的 BYTE 路徑（主體大小 ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`，預設為 256 KiB，包括 `POST /v1/responses`）會使用**相同的**例外機制。

這是讓單一處理程序支援兩個以上並行長時間 SSE `/v1/responses` 的建議作法：僅在堆積記憶體與處理程序範圍內的傳輸中位元組預算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）所允許的範圍內，提高主要容量與健康餘裕。數十個長時間 SSE 用戶端（40–50 個）屬於記憶體預算問題，而不是產品設有「最多 2 個」的硬性限制。堆積記憶體承受壓力時，仍會以可重試的 `503` 拒絕請求，以免 #7849 的問題再次出現。

若要**增加多份獨立堆積記憶體**，請執行 N 個使用各自獨立 `DATA_DIR` 的執行個體（#11024）。切勿在單一 SQLite 檔案上設定 `replicas > 1`（#10350）。本節並不是要重新討論 DATA_DIR 的橫向擴充方案。
