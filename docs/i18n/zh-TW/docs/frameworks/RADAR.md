# Radar Free-Model Catalog (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md)

---

> **事實依據：** `src/lib/radar/`、`src/lib/db/radar.ts`、`src/app/api/radar/`
> **最後更新：** 2026-09-01 — v3.8.51
> **託管服務證據界線：** 此處所述的伺服器端規則，已於
> 2026-09-01 針對刻意設為私有的 Radar 伺服器之確切修訂版本
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed` 完成驗證。該實作不隨
> 此 OSS 儲存庫發布；託管服務的可用性仍屬於獨立的營運狀態。

Radar 是一項**選用附加功能**，會在發布基準（`open-sse/config/freeModelCatalog.data.ts`
中的 `FREE_MODEL_BUDGETS`）之上疊加一份經過簽署且最新編選的免費模型目錄。
此功能之所以存在，是因為免費方案的變化速度快於版本發布週期——提供者會在版本發布之間
新增、縮減或終止免費配額，而基準目錄只能在新版本發布時更新。

**目前免費的項目不會因為遠端動態資料而變成付費項目。** Radar 絕不會將基準項目設為
付費牆後內容；它只會在讀取時更新限制／狀態欄位，並可在版本發布之間加入新發現的免費模型。
營運者仍可在本機隱藏模型，也可從同一個儀表板將其還原。基準目錄本身絕不會在磁碟上遭到修改——
請參閱下方的[讀取時疊加合併規則](#read-time-overlay-merge-rules)。

---

## v3.8.51 的交付狀態

以下狀態用於區分此 OSS 版本已實作的內容與後續 Radar 工作項目。這是程式碼層級的狀態，
並非承諾特定託管部署或外部整合目前可供使用。

| 領域               | 此版本中的狀態                                                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 已簽署目錄用戶端   | 已在 `RADAR_ENABLED` 控制下實作，包含獨立的選擇啟用機制、Ed25519 驗證、本機加密的設定／快取、持久化的顯示／啟用覆寫、可逆的墓碑記錄、排程器與儀表板。                        |
| 貢獻者啟用         | 儀表板會連結至由伺服器託管的 GitHub 申領流程，並接受現有的 `omr_…` 金鑰。貢獻者資格由私有服務判定；OSS 用戶端不包含 GitHub 權杖或簽發邏輯。                                  |
| 支持者金鑰啟用     | 已實作。原始金鑰會經過驗證、靜態加密儲存、在讀取時遮罩，且僅由伺服器端同步傳送。變更或清除金鑰會使所有四個對權益敏感的動態資料快取失效。                                     |
| 推薦連結           | 已實作為獨立簽署且每小時更新的動態資料。固定連結可立即供社群方案使用；限時活動仍屬於即時方案資料。                                                                           |
| 支持者優惠         | 已實作為獨立簽署、僅限即時取得的動態資料與儀表板頁面。用戶端會重新驗證封閉式權益結構描述、保留最後一次有效的快取、篩除已到期項目，並明確標示合作夥伴優惠。                   |
| 情報與支持者識別   | 已實作為嚴格簽署、僅限即時取得的動態資料，包含 Radar 自有的 ELO、以事實為基礎的目錄新鮮度／趨勢、經驗證的本機支持者徽章、儀表板頁面，以及僅限本機使用的 CLI 狀態／同步命令。 |
| 付款與交易電子郵件 | OSS 用戶端中尚未實作。購買、捐款、收據審查、復原與郵件傳送均屬於私有服務的範疇；託管服務的可用性仍取決於其受監管的部署與提供者設定。                                         |
| 研究代理工作項目   | 不屬於此用戶端版本。編選的動態資料內容仍屬於伺服器端資料；OmniRoute 安裝環境中不會執行任何自主研究代理。                                                                     |

---

## 公開公告讀取器

通用公告讀取器與 Radar 功能旗標彼此獨立。儀表板首頁與
Changelog 檢視器會透過一般的 `GET`，從 `NEWS_JSON_URL`
取得儲存庫的公開 `news.json`（`src/shared/utils/releaseNotes.ts`）。它們不會傳送任何 Radar 設定、提示詞、提供者
組態、使用紀錄或本機關閉狀態。

`news.json` 使用由 `parseNewsPayload()` 實作的封閉式 v2 結構描述：

- `schemaVersion: 2` 與有數量上限的 `items[]` 集合；
- 穩定且唯一的公告 `id` 值；
- 明確的 `active` 與 ISO `publishedAt` 欄位；
- 必要的英文文案，以及可選的本地化文案；
- 可選、無須認證的 HTTPS 連結，以及允許清單中的圖示；
- 優先選擇最新且有效的公告、語系回退至英文，以及依 ID 儲存的本機關閉狀態。

剖析器暫時接受先前的單一 `{ active, title, message, ... }` 格式，讓
較舊的分支版本可以遷移，而不會導致 Changelog 檢視畫面損壞。無效的摘要來源不會產生任何作用。Radar 上線
項目隨附時設定為 `active: false`；將其變更為 `true` 是合併後、部署後的
獨立發布動作，且不會變更 `RADAR_ENABLED` 或獨立的摘要同步選擇加入設定。

---

## 旗標：`RADAR_ENABLED`（預設關閉）

Radar 由 `RADAR_ENABLED` 功能旗標進行端對端管控
（`src/shared/constants/featureFlagDefinitions.ts`，類別為 `policies`，
`defaultValue: "false"`）。

**當旗標關閉時，此功能介面並不存在：**

- 所有 `/api/radar/*` 端點（包括本機模型狀態的讀取與寫入）
  都會在存取任何 Radar 模組之前回傳 `404`。
- 儀表板畫面（`/dashboard/radar`、`/dashboard/radar/setup`、
  `/dashboard/radar/combos`、`/dashboard/radar/offers`、`/dashboard/radar/intel`）會呈現
  `notFound()`。
- `getRadarCatalog()`（`src/lib/radar/index.ts`）會回傳未經變更的基準資料 —
  項目數量相同、值相同，且每個項目皆標記為 `origin: "baseline"` — 並且絕不
  讀取摘要快取。
- 絕不會發出任何 Radar 網路呼叫；每個同步模組都會在接觸 `fetch` 前
  回傳 `{ status: "disabled" }`。

這是一個嚴格的上層閘門：開啟旗標只會解鎖_畫面_，不會
執行其他動作。它不會上傳資料、不會啟動背景同步，也不會變更
路由或模型選擇 — 請參閱下方的獨立選擇加入設定。

---

## 資料同步是「獨立」的選擇加入項目 — 隱私承諾

開啟 `RADAR_ENABLED` 只會解鎖 UI。同步摘要需要第二個
獨立的選擇加入設定，其儲存於 `radar_settings.opt_in`（`src/lib/db/radar.ts`，
遷移檔案 `136_radar_cache_settings.sql`）。`syncRadar()` 會在發出任何網路呼叫前，同時檢查旗標_與_
選擇加入設定：

```
旗標關閉        → { status: "disabled" }   — 不會發出網路呼叫
未選擇加入      → { status: "opt_out" }    — 不會發出網路呼叫
```

兩者皆開啟時，同步流程如下：

1. 對 `GET <feed base URL>/v1/catalog/latest` 發出請求，並附上 `x-omniroute-radar-schema: 2` 及可選的
   `Authorization: Bearer <supporter key>` 標頭（見下文）。當未提供結構描述標頭時，伺服器預設提供另行
   簽署的 v1 過渡成品，讓已安裝的舊版用戶端能繼續
   接收更新。
2. 這是僅下載的應用程式流程，但仍屬於 HTTPS 請求。託管的
   基礎設施會收到一般連線中繼資料，例如來源 IP。設定贊助者
   金鑰後，同步也會在 Bearer 標頭中傳送該金鑰，讓服務可以確認
   權益。在上述證據邊界所識別的確切私有伺服器修訂版本中，
   摘要請求計量使用金鑰雜湊、彙總使用量，以及每日輪替的 IP 截短 HMAC，
   供人工濫用審查使用；這些資料表不會以原始形式持久保存金鑰或 IP。
   基礎設施存取記錄與加密的傳遞寄件匣屬於彼此獨立的營運
   邊界。
3. OmniRoute 絕不會將提示詞、回應、對話、提供者認證資訊、模型流量、
   運作時間、延遲或本機提供者組態傳送至 Radar 服務。
4. 回應會在本機進行驗證、確認有效性並快取（請參閱
   [安全性模型](#security-model)）。Radar 恰好有四條伺服器端網路路徑：
   用於目錄的 `syncRadar()`、用於推薦的 `syncRadarReferrals()`，以及
   用於贊助者專屬優惠與 Intel 的 `syncRadarOffers()` / `syncRadarIntel()`。

**贊助者金鑰**是可選的 Bearer 權杖（`radar_settings.supporter_key`），
可讓摘要服務決定要提供哪一個層級（請參閱
[層級](#tiers-community-and-live)）。其特性如下：

- 使用與提供者認證資訊相同的 AES-256-GCM `encrypt()`/`decrypt()`
  輔助函式（`src/lib/db/encryption.ts`）進行**靜態加密**儲存。
- 透過 `POST /api/radar/settings`（`{ supporterKey: "omr_" + 40 hex chars }`）設定，且
  **絕不會原樣回傳** — 回應會傳回遮罩後的形式（`omr_****abcd`）。
- 變更或清除金鑰時，會以不可分割的方式使目錄、推薦、優惠及 Intel 快取失效。
  下次同步／讀取時，會在伺服器端確認新的權益；儲存金鑰本身不會
  發出網路請求，也不會消耗單次使用的啟用金鑰。
- 同步 GET 會將其作為 Bearer 權杖傳送至摘要服務 — 金鑰的其他任何資訊
  都不會離開用戶端。

---

## 選擇加入前顯示的存取與安全規則

未啟用的儀表板會在執行任一啟用操作**之前**，先呈現來自
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` 的這些規則。
正式的存取級別如下：

| 級別           | 資格條件                                                   | 存取權限                           | 重複核發／到期規則                       |
| -------------- | ---------------------------------------------------------- | ---------------------------------- | ---------------------------------------- |
| 社群           | 任何人；不需要金鑰                                         | 延遲約 30 天的完整目錄             | 永久可用；不核發金鑰                     |
| Star + 追蹤    | GitHub OAuth 驗證使用者已為儲存庫加上 Star 並追蹤擁有者    | 即時目錄讀取一次，之後轉為社群級別 | 每次登入僅核發一次；永不重新核發         |
| 貢獻者 Top 10  | 最新一期完整每週排名中的第 1–10 名                         | 365 天即時存取                     | 依需求領取；離開排名不會縮短已授予的期間 |
| 貢獻者 Top 100 | 該排名中的第 11–100 名                                     | 90 天即時存取                      | 採用相同的依需求領取／冪等領取規則       |
| 支持者購買     | 一次性購買 6 個月、1 年或終身方案                          | 即時目錄、已簽署的即時優惠與 Intel | 不會自動續訂                             |
| 捐款／手動授予 | 經擁有者審核的捐款，或由擁有者明確授予特定天數／終身的權限 | 在授予期間內享有相同的即時權益     | 經稽核的冪等授予                         |

已合併的 PR、提交與變更行數**僅作為排名依據**。排名未進入 Top 100 的登入者，
無論 PR 數量多少，都不會獲得貢獻者授權。有限期購買、捐款、貢獻者期間與
手動授予的期限，會從目前的到期日開始累加；終身權限優先於其他期限。排名變動絕不會
溯及既往地撤銷或縮短已授予的時間。

託管授權僅限個人使用，面向使用者的規則是同一時間只能有一個有效安裝。
此版本**不**宣稱具有硬體鎖定：OSS 同步不會建立硬體指紋，也不會維護
密碼學裝置租約。在上述已驗證的私有伺服器修訂版本中，實作的強制機制為權益驗證，
以及同一個有效金鑰在 24 小時內從第四個不同 IP 出現時所產生的人工審查訊號。
該訊號絕不會自動封鎖或撤銷金鑰。復原程序會撤銷並替換遺失的金鑰，同時保留原有
到期日；不會重新起算已購買或授予的期間。

即時優惠由人工策劃，且可能變更或到期。選擇加入畫面也會明確說明確切的
隱私界線：系統會下載已簽署的目錄／推薦中繼資料；有效金鑰還會解鎖已簽署的
優惠與 Intel；Bearer 金鑰與一般連線中繼資料會傳送至託管服務；
提示詞、回應、對話、提供者憑證、模型流量、運作時間、延遲與本機
提供者設定則不會傳送。

---

## 取得支持者金鑰

啟用畫面（`/dashboard/radar`）會連結至兩個用於**取得**支持者金鑰的流程。OSS 儲存庫本身絕不核發金鑰、不執行付款程式碼，也**絕不標示價格**——定價完全由目標頁面決定並顯示，而非在此儲存庫中（規格決策 D14）。

- **「我是貢獻者」**——開啟 `RADAR_CONTRIBUTOR_CLAIM_URL`（預設為 `https://radar.omniroute.online/auth/github`），這是由私人 Radar 伺服器託管的 GitHub OAuth 申領流程。此流程會檢查最新一期完整的每週排名：前 10 名可獲得 365 天，而第 11–100 名可獲得 90 天。若未進入前 100 名，PR 數量絕不會授予存取權；此流程會改為檢查獨立的按星號 + 追蹤單次使用等級。
- **「支持此專案」**——開啟 `RADAR_SUPPORTER_PLANS_URL`（預設為 `https://radar.omniroute.online/planos`），這是提供一次性 6 個月、1 年及終身方案選項的託管頁面。OSS 頁面仍不會顯示任何金額。

這兩個 URL 都會在伺服器端解析（`src/lib/radar/links.ts`，採用與 `RADAR_FEED_URL` 相同的環境變數覆寫模式），並透過現有的 `GET /api/radar/settings` 回應（`contributorClaimUrl`、`supporterPlansUrl`）傳遞至儀表板——用戶端元件本身絕不讀取 `process.env`。

| 變數                          | 用途                                                                        |
| ----------------------------- | --------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | 覆寫貢獻者申領 URL（預設為 `https://radar.omniroute.online/auth/github`）。 |
| `RADAR_SUPPORTER_PLANS_URL`   | 覆寫支持者方案 URL（預設為 `https://radar.omniroute.online/planos`）。      |

### 復原遺失的支持者金鑰

託管服務的復原入口為 `https://radar.omniroute.online/recover`；方案頁面也提供此連結。復原作業仍完全位於 OSS 用戶端之外，因為本機安裝環境絕不會收到購買者／貢獻者的電子郵件地址，也無法從其加密設定中重建原始金鑰。

1. 提交與金鑰關聯的電子郵件地址。無論是否存在可復原的授權，服務都會傳回相同的已受理頁面，因此此表單不會洩露帳號是否存在。
2. 若符合資格，傳送工作程序會寄出短效且只能使用一次的連結。開啟連結後，權杖會立即移入暫時性的加密 `HttpOnly`/`Secure` Cookie，並重新導向至乾淨的 `/recover` URL；頁面不包含權杖、電子郵件地址、舊金鑰或替代金鑰。
3. 確認撤銷。私人服務會在單一交易中撤銷先前的金鑰、建立具備相同方案／到期日的替代金鑰，並將其排入電子郵件傳送佇列。替代金鑰絕不會傳回瀏覽器。
4. 將替代金鑰貼入 `/dashboard/radar`。舊金鑰現在必須降級為 `community`；替代金鑰則必須產生經驗證的 `live` 同步。再次開啟相同的復原連結時，必須以一般性的無效／已過期回應表示失敗。

即使託管的復原路由與郵件工作程序已存在於程式碼中，在特定部署環境中仍可能無法使用。在伺服器完成部署、使用受控收件者設定好傳送服務提供者，並完整測試一次性連結之前，請勿宣稱此流程已可用於正式環境。

訪客取得金鑰（`omr_` + 40 個十六進位字元）後，啟用畫面（`src/app/(dashboard)/dashboard/radar/page.tsx`）會以貼上金鑰輸入欄位作為主要路徑：貼上金鑰並提交，會在單次呼叫中傳送 `POST /api/radar/settings`（`{ optIn: true, supporterKey }`）——貼上金鑰會同時設定金鑰並選擇加入，從而解除畫面鎖定。為提升使用者體驗，系統會先使用共用的 `isValidSupporterKeyFormat()` 輔助函式（`src/lib/radar/supporterKey.ts`），在用戶端檢查格式（`omr_` + 40 個十六進位字元）；無論如何，伺服器的 Zod 結構描述才是權威檢查。設定金鑰後，啟用畫面會顯示遮罩形式（來自 `GET /api/radar/settings` 的 `supporterKeyMasked`），而非空白輸入欄位，並提供「變更金鑰」控制項以貼上新金鑰——原始金鑰絕不會再次顯示。上方的兩個申領／方案按鈕仍是最初用於_取得_金鑰的方式；已擁有金鑰的操作人員則在此輸入並啟用。

### 端對端啟用與引導式設定

私人動態消息服務與此 OSS 用戶端之間刻意維持明確且狹窄的邊界：服務負責核發並驗證支持者金鑰，而本機 OmniRoute 安裝環境則會加密金鑰、在伺服器端同步已簽署的成品，並引導提供者設定。輔助驗證順序如下：

1. 從貢獻者申領、方案/結帳、復原流程，或經授權的私人伺服器營運者取得新核發或復原的金鑰。請勿將原始金鑰貼到記錄、螢幕擷取畫面、議題留言或命令列引數中。
2. 在本機 OmniRoute 安裝環境中啟用 `RADAR_ENABLED` 功能旗標。這會顯示 UI，但在另行儲存選擇加入設定之前，仍不會進行任何網路活動。
3. 開啟 `/dashboard/radar`、貼上金鑰並啟用。瀏覽器會在本機傳送一次 `POST /api/radar/settings`，內容為 `{ optIn: true, supporterKey }`；金鑰會在本機加密，而回應僅包含 `omr_****<last4>`。
4. 讓啟用畫面執行目錄同步，或選取 **立即同步**。確認頁面回報 `live`、摘要版本與擷取時間。若要執行經驗證的本機診斷，`GET /api/radar/status` 會回報選擇加入/金鑰是否存在，以及四種快取狀態，但不會傳回金鑰。`POST /api/radar/sync-all` 可明確重新整理目錄、推薦、優惠及 Intel。
5. 開啟 `/dashboard/radar/setup?provider=<provider>`。前往提供者提供的憑證 URL、選取 **新增 API 金鑰**、透過實際的提供者表單儲存、返回指南，然後執行 **測試連線**。指南會使用一般的 `/api/providers` 與 `/api/providers/<connection-id>/test` 路由；它不會建立另一組獨立的 Radar 憑證。
6. 在至少兩個相容的提供者連線生效後，開啟 `/dashboard/radar/combos`。檢視建議的系列，並透過現有的組合 API 建立組合。優惠與 Intel 會維持為彼此獨立、僅供即時層級使用的已簽署快取，並可在各自專屬的 Radar 頁面上查看。
7. 重新載入 `/dashboard/radar` 與設定頁面。選擇加入狀態、遮罩金鑰狀態、已驗證快取、已儲存的提供者連線，以及測試操作，都必須在重新載入後保留。請僅在原始金鑰與提供者憑證不再可見後擷取證據。

儲存金鑰本身並不能證明具備即時層級權益。有效證明是以下項目的組合：私人服務的 `GET /v1/license/check` 結果、OSS 目錄所提供的 `live` 層級、已驗證的簽署快取，以及實際的提供者連線/測試流程。無效、已過期或已撤銷的金鑰會安全地將目錄降級為 `community`；不得將其回報為即時金鑰驗證成功。

### 私人管理面板連結

`RADAR_ADMIN_URL` 可選擇性地在「成本」側邊欄區段中面向使用者的 Radar 項目後，立即新增 **Radar 管理 ↗**。此變數刻意不設預設值：當變數未設定或無效時，靜態側邊欄、命令面板及側邊欄自訂畫面中都不會包含管理項目或私人 URL。

此值會在伺服器端解析，且僅透過需管理驗證的 `GET /api/settings` 回應傳遞給已驗證的儀表板工作階段，或在本機免登入啟動程序期間傳遞給受信任的迴路位址擁有者。CLI、內部服務及 manage-scope API 金鑰驗證都不會收到此值。瀏覽器會在建立外部連結前再次驗證回應，而該連結會使用 `noopener noreferrer` 開啟。

請使用不含憑證的 HTTPS 通道/tailnet URL。純 HTTP 僅適用於迴路位址 SSH 轉送，例如 `http://127.0.0.1:9351`；其他通訊協定、內嵌憑證、格式錯誤的 URL，以及遠端 HTTP 目的地都會採取失敗關閉，並使導覽保持無作用狀態。

---

## 安全模型

### 對確切位元組進行 Ed25519 簽章

動態消息酬載使用 Ed25519 簽署。`verifyFeedBytes()`
（`src/lib/radar/verify.ts`）會驗證透過網路接收到的**確切回應位元組**上的簽章
——驗證前絕不會重新序列化酬載，因此逐位元組重新編碼無法在不被察覺的情況下
使簽章檢查失效或繞過檢查。驗證失敗（`invalid_signature`）會在酬載被解析或快取
之前中止同步。

### 固定公開金鑰 + 輪替

驗證用公開金鑰固定於 `src/lib/radar/pinnedKeys.ts`
（`PINNED_FEED_PUBLIC_KEYS`）中；該陣列可在金鑰輪替前將新金鑰加入最前方，
而由舊金鑰簽署的舊快取動態消息在重新同步前仍然有效。

### 方便分支版本使用的環境變數覆寫

兩個環境變數可讓分支版本與自行託管者將用戶端指向自己的動態消息，而非
預設的 OmniRoute 服務——請參閱下方的
[如何自行託管動態消息](#how-to-self-host-a-feed)：

| 變數                | 用途                                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | 覆寫動態消息的基底 URL（預設為 `https://radar.omniroute.online`）。    |
| `RADAR_FEED_PUBKEY` | 覆寫固定公開金鑰（base64-DER SPKI 或 PEM），以此單一金鑰取代內建陣列。 |

### 版本下限

如果下載的動態消息之 `version` 並未嚴格新於目前快取的版本，`syncRadar()` 便會
拒絕該動態消息（`compareVersions()`，以點分隔的 `YYYY.MM.DD.n` 比較）——
`{ status: "stale" }`。這能防止遭入侵或設定錯誤的動態消息端點，將用戶端回復至
較舊且使用不同簽章的酬載。

### 兩個日期，以及為何兩者都要保留

快取的動態消息包含兩個不同的日期；避免混淆兩者，正是同時保留它們的原因：

| 欄位          | 來源                 | 回答的問題                   |
| ------------- | -------------------- | ---------------------------- |
| `generatedAt` | 已簽署的動態消息本文 | **資料**有多舊               |
| `fetchedAt`   | 此安裝實例的時鐘     | 此安裝實例何時**下載**該資料 |

幾分鐘前擷取的動態消息可能包含數週前的數據，因此單靠 `fetchedAt` 無法讓
操作人員判斷覆蓋層是否比其所依據的基準資料更新。兩者皆會持久儲存於
`radar_feed_cache`、由 `getRadarCatalog().meta` 傳回，並由 `GET /api/radar/status`
分別回報。在 `generated_at` 欄位建立前（遷移 163）快取的資料列，讀取時會得到
`null`——未知仍維持未知，而不會借用擷取時間。自遷移 142 起，
`radar_referrals_cache` 就一直保留其自己的 `generated_at`。

上述版本下限比較的是 `version`，而非任一日期。

目前仍有兩項刻意保留的缺口：儀表板仍只顯示 `Last fetched`，因此若要在該處顯示
建置日期，就需要新增標籤（以及其 41 個語系項目）；此外，即使優惠與情報快取的
動態消息結構描述包含建置日期，這兩種快取也完全不保留該日期——因此 `GET
/api/radar/status` 會略過這兩者的該欄位，而不是回報可能被解讀為「未知」的
`null`。

### 結構描述驗證

下載的位元組會在簽章驗證**之後**進行解析，並依據 `RadarFeedSchema`
（`src/lib/radar/feedSchema.ts`，一個 Zod 結構描述）驗證。結構描述不相符時會
傳回 `{ status: "invalid_schema" }`，且不會變更快取。每次讀取時
（`getRadarCatalog()`）也會再次以防禦方式重新驗證快取的酬載——損毀或手動編輯
過的快取資料列會回退至基準資料，而不會提供給用戶端。

### 回應大小上限（10 MB）

`syncRadar()` 對動態消息回應本文強制實施 **10 MB 的硬性上限**——已簽署的
動態消息是 KB 規模的 JSON 文件，因此任何超過此上限的內容，都表示
`RADAR_FEED_URL` 設定錯誤或具有惡意（或上游正在提供無用資料），而非合法目錄。
此限制分為兩層：

1. 當 `Content-Length` 標頭已宣告超過上限的值時，預先檢查會完全略過本文讀取。
2. 讀取本文時的累計總量檢查，即使 `Content-Length` 不存在或低報實際大小，
   仍會強制實施上限——絕不只憑該標頭判斷。串接已累積的區塊，可保留之後進行
   Ed25519 簽章檢查所需的確切位元組。

超過上限時會傳回 `{ status: "too_large" }`，且不會變更快取，遵循與所有其他
同步失敗（`invalid_signature`、`invalid_schema`、`stale`）相同的非破壞性模式。

---

## 層級：`community` 與 `live`

摘要結構包含 `tier: "community" | "live"` 欄位，由摘要服務根據請求（支援者金鑰是否存在及有效）在**伺服器端**決定——用戶端絕不自行決定其層級。

- **`community`**——免費目錄，其資料大約比最新資料延遲 30 天。未驗證身分或使用無效金鑰的請求會收到此層級。
- **`live`**——最新目錄，提供給攜帶有效支援者金鑰的請求。

**無效或已過期的支援者金鑰會降級為 `community`——絕不會產生錯誤。**同步路徑只會區分簽章／結構／版本失敗（全都可復原，且對快取狀態不具破壞性）與成功的 `{ status: "updated", version, tier }`。用戶端不需要處理任何層級特定的錯誤路徑。

### 提供的層級來自回應標頭，而非已簽章的主體

已簽章摘要**主體**中的 `tier` 欄位一律為 `"live"`——摘要服務會為每個版本發布**兩個已簽章成品**：live 包含目前的活動，而 community 則省略這些活動。每個成品都以其自身的確切位元組進行簽章。主體仍不作為權限判定依據；針對請求實際選取的層級會放在 **`x-omniroute-feed-tier` 回應標頭**中，由伺服器端根據請求的 `Authorization` 金鑰決定。

`syncRadar()`（`src/lib/radar/sync.ts::parseServedTierHeader()`）是唯一解析用戶端應信任層級的位置：

1. 使用 `RadarTierSchema`（Zod）剖析 `x-omniroute-feed-tier`——若標頭不存在，或其值並非完全等於 `"community"` 或 `"live"`，都會視為**不存在**（絕不會原樣信任並寫入快取／UI；這也涵蓋早於該標頭的舊版摘要伺服器）。
2. 僅當步驟 1 未取得任何結果時，才回退至已簽章主體的 `tier` 欄位（永遠為 `"live"`）。
3. 解析後的層級會被快取，並以 `{ status: "updated",
version, tier }` 傳回——儀表板顯示的是此值，絕不是未處理的主體
   欄位。

---

## 讀取時的覆疊合併規則

`applyFeed()`（`src/lib/radar/applyFeed.ts`）會在 `getRadarCatalog()` 內部的**讀取時**，將快取的摘要合併到靜態基準之**上**。基準陣列（`FREE_MODEL_BUDGETS`）絕不會被修改——每次呼叫都會重新計算一個 `MergedEntry[]`。

四項規則，依優先順序排列：

1. **摘要絕不覆寫本機覆寫值。**以欄位為單位：若操作者已自訂某個項目的欄位（`localOverrides` 對應表，以 `provider:modelId` 為鍵），則略過摘要中該特定欄位的值——以操作者的值為準。
2. **`enabled: false` 會停用項目，並附帶來源資訊。**若摘要項目關閉某個項目，合併結果會設定 `enabled: false` 與 `disabledBy: "radar"`，讓 UI 可以解釋項目為何從可用變為停用。
3. **摘要中不存在的使用者新增項目會原封不動地保留。**僅存在於基準中（或在本機新增）且沒有對應摘要項目的項目，會保持不變地通過。
4. **已設墓碑的項目絕不會復活。**若操作者明確刪除了某個項目（`tombstones` 集合），即使摘要在後續版本中重新加入該 `provider:modelId`，也不會將其恢復。

可編輯欄位與墓碑會持久保存於 `radar_local_model_state`（遷移 `153_radar_local_model_state.sql`）。公開 DB 配接器（`src/lib/db/radar.ts`）會將這些資料列轉換成 `applyFeed()` 使用的 `localOverrides` 對應表與 `tombstones` 集合；正式環境的 `getRadarCatalog()` 會在功能旗標、快取及結構閘門通過後載入該狀態。操作者只能編輯 `displayName` 與 `enabled`。提供者／模型身分、摘要來源、配額、功能、服務條款及設定資料都無法透過此介面寫入。

儀表板提供四項本機操作：

- **編輯**會變更本機顯示名稱與啟用狀態。
- **重設本機變更**會清除兩個可編輯欄位，但不會變更墓碑。
- **隱藏**會建立墓碑，使後續摘要更新無法重新建立該資料列。
- **還原**會移除墓碑；任何另外儲存的覆寫值仍然有效。

摘要中的 `enabled: false` 仍屬安全性例外：它會優先於過時的本機 `enabled: true`，維持合併項目的停用狀態，並記錄 `disabledBy: "radar"`。

目錄發布使用 `schemaVersion: 2`。`contextWindow` 以及 `tools`、`vision` 和
`thinking` 各自獨立為 `number | null`／`boolean | null`：`null` 表示未知，而
`false` 表示經 D16 確認的提供者官方來源明確指出不具備該功能。
OmniRoute 內部登錄檔／模型規格旗標絕不會直接提升為摘要事實。用戶端
仍接受 v1 快照；由於舊版建置器使用 `false` 作為缺失值的預留值，因此 v1 的 `false` 會
正規化為未知，而 v1 的 `true` 仍視為事實。未知的結構版本會以封閉方式失敗，而
最後一份有效快取仍可使用。每個具有非 null 上下文／功能的 v2 模型都必須攜帶
無須憑證的 HTTPS `metadataEvidenceUrls[]`；否則結構驗證會失敗，且快取
不會被取代。目錄表格會將三種狀態分別呈現為 `✓`、`✕` 與 `?`。

### 引導式組合與 MCP 存取

已確認的 `familyId` 值會在讀取時的覆疊後保留，並驅動純函式
`buildRadarComboSuggestions()` 模組（`src/lib/radar/comboSuggestions.ts`）。只有當至少兩個不同提供者具有有效連線，且公開完全相符的精選模型 ID 時，才會建議該系列。停用的模型、非使用中提供者、缺少模型 ID、只有單一提供者的系列，以及語意不明確的別名／前綴比對，都會以封閉方式失敗。建議會使用現有的 `priority` 策略，優先排列每月週期性預算最高者；UI 僅會透過 `POST /api/combos` 建立這些組合。

引導式 UI 位於 `/dashboard/radar/combos`。它只會讀取本機的
`GET /api/radar/catalog` 與 `GET /api/combos/builder/options` 端點。它絕不會觸發 Radar 同步、
讀取提供者憑證，或直接寫入組合資料庫。

MCP 用戶端可透過 `omniroute_radar_catalog`（`read:radar`）讀取相同的本機投影。
可選的 `provider`、`familyId` 與 `enabledOnly` 篩選條件，會在本機執行一次
`GET /api/radar/catalog` 讀取後進行評估。其封閉式輸出包含目錄中繼資料，以及提供者／模型、
顯示名稱、`familyId`、配額、功能、啟用狀態、來源與 `disabledBy`；設定 URL、
步驟、連線、電子郵件地址、金鑰與推薦資料絕不會被回傳。此工具為
唯讀，且絕不會叫用 `/api/radar/sync`。

### 來源標記

每個合併後的項目都帶有 `origin` 欄位，UI 會將其呈現為徽章：

- `"baseline"` — 完全沿用靜態發行目錄，未經修改。
- `"radar"` — 一個或多個欄位已由資訊源重新整理。
- `"local"` — 操作者已在此項目上設定至少一項本機覆寫（依據規則 1，
  無論資訊源的內容為何，本機覆寫一律優先）。

## 本機介面 — 絕不作為資訊來源代理

以下本機 Radar 路由系列支援 `src/app/api/radar/` 下的 UI：

| 路由                           | 方法   | 用途                                                                                                 |
| ------------------------------ | ------ | ---------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | 從本機快取傳回合併後的目錄（`getRadarCatalog()`）。                                                  |
| `/api/radar/sync`              | POST   | 在伺服器端觸發 `syncRadar()`；傳回產生的狀態。                                                       |
| `/api/radar/settings`          | GET    | 傳回 `{ optIn, hasSupporterKey, supporterKeyMasked }` — 絕不傳回原始金鑰。                           |
| `/api/radar/settings`          | POST   | 設定加入選項及／或（已加密的）支持者金鑰。                                                           |
| `/api/radar/referrals`         | GET    | 從本機快取傳回 `{ fixed, campaigns, tier }` — 請參閱下方的[推薦連結](#referral-links-free-credits)。 |
| `/api/radar/offers`            | GET    | 從已驗證的本機即時快取傳回有效優惠；絕不傳回支持者金鑰。                                             |
| `/api/radar/offers/sync`       | POST   | 觸發僅限伺服器端、僅使用即時金鑰的 `syncRadarOffers()` 管線。                                        |
| `/api/radar/intel`             | GET    | 傳回已驗證的本機即時 Intel，以及表示是否識別為支持者的布林值；絕不傳回身分或金鑰。                   |
| `/api/radar/intel/sync`        | POST   | 觸發僅限伺服器端、僅使用即時金鑰的 `syncRadarIntel()` 管線。                                         |
| `/api/radar/status`            | GET    | 傳回目錄、推薦、優惠與 Intel 的唯讀本機設定／快取狀態，不含機密資訊。                                |
| `/api/radar/sync-all`          | POST   | 執行全部四個伺服器端同步模組，並為每個資訊來源傳回個別狀態。                                         |
| `/api/radar/local-model-state` | GET    | 列出持久保存的覆寫與墓碑，以供編輯／還原控制使用。                                                   |
| `/api/radar/local-model-state` | PATCH  | 設定或清除已驗證的 `displayName`/`enabled` 覆寫欄位。                                                |
| `/api/radar/local-model-state` | PUT    | 使用 `{ provider, modelId, tombstoned }` 建立或移除墓碑。                                            |
| `/api/radar/local-model-state` | DELETE | 清除可編輯的覆寫欄位，同時保留任何墓碑。                                                             |

**硬性規則：這些路由絕不代理資訊來源服務。** 瀏覽器只會與本機 OmniRoute 伺服器通訊。會連線至 Radar 服務的四個模組是
`src/lib/radar/sync.ts`（目錄）、`src/lib/radar/referralsSync.ts`（推薦）、
`src/lib/radar/offersSync.ts`（優惠），以及 `src/lib/radar/intelSync.ts`（Intel）；
這些模組全都在伺服器端執行，絕不在用戶端執行。如此可讓資訊來源 URL
及任何支持者金鑰完全不出現在面向用戶端的網路流量中。

當 `RADAR_ENABLED` 關閉時，所有 Radar 端點都會傳回 `404`（請參閱上方的
[旗標](#flag-radar_enabled-default-off)），而路由錯誤回應會依照存放庫全域的錯誤淨化規則，
透過 `buildErrorBody()`/`sanitizeErrorMessage()` 處理
（`docs/security/ERROR_SANITIZATION.md`）。

### 驗證

所有 Radar 端點都要求透過 `isAuthenticated()`
（`src/shared/utils/apiAuth.ts`）進行驗證，也就是儀表板工作階段 Cookie 或具管理範圍的
API 金鑰；這與保護其餘 `/api/settings/*` 的閘門相同。旗標關閉時的
`404` 檢查一律在驗證檢查**之前**執行，因此關閉 `RADAR_ENABLED`
的安裝環境會維持逐位元組完全相同（不會僅為得知此介面不存在而顯示驗證提示）；
旗標開啟後，未經驗證的請求會在任何資料庫讀取或寫入之前收到 `401`。
無論驗證狀態為何，`GET /api/radar/settings` 絕不會傳回原始支持者金鑰，
只會傳回遮罩形式及 `hasSupporterKey` 布林值。

---

## 支持者優惠

優惠使用其專屬的已簽署成品 `GET /v1/offers/latest`，且絕不共用目錄或推薦快取。伺服器端點需要有效且啟用中的支持者 Bearer 金鑰；沒有社群版的後備機制。因此，當功能旗標關閉、營運者尚未選擇加入，或未設定支持者金鑰時，`syncRadarOffers()` 會在發出網路請求前停止。

成功執行 GET 後，用戶端會針對完全一致的回應位元組驗證 Ed25519 簽章、驗證 `RadarOffersFeedSchema`、要求已簽署的本文與 `x-omniroute-feed-tier` 標頭皆標示為 `live`、強制要求嚴格較新的點分版本，並且僅在完成上述步驟後，才以不可分割操作取代 `radar_offers_cache`（遷移檔案 `144_radar_offers_cache.sql`）。此處同樣套用其他資訊源所使用的 10 MB 標頭加串流上限。簽章、結構描述、層級、重播、大小、HTTP 及網路錯誤均會保留最後通過驗證的快取。

封閉式優惠結構支援三種可比較的福利類型：以基點表示的百分比、以最小貨幣單位表示的抵用金，或試用天數。合作夥伴優惠必須包含相同類型的公開基準，且其福利必須嚴格優於該基準；官方優惠則沒有合作夥伴基準。URL 必須是不含認證資訊的 HTTPS。`getRadarOffers()` 會採取防禦性措施，在每次本機讀取時重新驗證快取的承載資料，並篩除已到期的項目；`/dashboard/radar/offers` 會在呈現前再次篩除過期項目、在有葡萄牙文文字時使用葡萄牙文（否則回退至英文），並明確標示合作夥伴優惠。

瀏覽器只會呼叫本機路由：它會讀取已遮蔽的設定快照、要求 `POST /api/radar/offers/sync` 在伺服器端重新整理，接著讀取 `GET /api/radar/offers`。若沒有金鑰，它會顯示現有的貢獻者／支持連結，而不會嘗試請求資訊源。外部優惠連結會在新分頁中開啟，並使用 `noopener noreferrer`。此版本未公開 `radar_offers` MCP 工具。

---

## Radar 情資、支持者徽章與 CLI

情資是位於 `GET /v1/intel/latest` 的已簽署成品。封閉式 `RadarIntelFeedSchema` 僅接受由私人策展者根據已確認比較所推導、歸 Radar 所有的 ELO 排名，以及從已簽署目錄快照推導的目錄存續時間／數量實際差異。方法固定採用初始評分 1000 與 K=32。若尚未確認任何比較，空排名亦屬有效；用戶端絕不會自行合成排名。

`syncRadarIntel()` 會套用與優惠相同的伺服器端 Bearer、30 秒逾時、10 MiB 串流上限、精確位元組 Ed25519 驗證、嚴格結構描述、本文／標頭的 `live` 要求、版本下限，以及保留最後一份有效快取的機制。通過驗證的即時快照持久化後，用戶端會推導 `radar:<sha256(supporter key)>`、僅儲存該單向識別碼，並發出專用的 `radar_supporter` 認可事件。其 `radar-supporter` 徽章具備冪等性，且獎勵零 XP；它絕不會更新排行榜或重複使用 `token_share`。`/dashboard/radar/intel` 僅根據已驗證的本機快取中繼資料呈現該徽章。

CLI 提供 `omniroute radar status` 與 `omniroute radar sync`。兩者都只與本機 OmniRoute API 通訊。`status` 會執行唯讀的 `GET /api/radar/status`；`sync` 會傳送一次 `POST /api/radar/sync-all`，並列印每個資訊源的結果。這兩個命令都不會讀取、接受或列印支持者金鑰，也不會直接聯絡 Radar 服務。

---

## 推薦連結（免費額度）

推薦連結由一個**獨立且始終保持最新**的資訊源提供 —
`GET /v1/referrals/latest` — 與目錄資訊源分開。這是刻意的設計：社群層級的目錄資訊源是快照，最多可能落後 30 天，因此過去從中擷取的推薦連結，也會比伺服器的實際連結清單落後相同時間（新加入的推薦連結最久可能要一個月才會提供給免費／社群使用者）。推薦資訊源採用自身更短的同步週期，消除了這項延遲。

```ts
// GET /v1/referrals/latest 回應主體（以 Ed25519 簽署，使用與目錄資訊源
// 相同的固定金鑰）：
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — 確定性值：所有推薦連結中最大的 max(updatedAt)，
                                  // 因此兩個相同的請求會產生完全相同的已簽署
                                  // 位元組／簽章
  referrals: {
    fixed: RadarReferral[],      // 在每個層級中都存在，包括未驗證／社群層級
    campaigns: RadarReferral[],  // 僅針對有效且仍生效的（贊助者）Bearer 金鑰填入內容；
                                  // 未驗證／金鑰已過期的請求會得到 []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

與目錄資訊源不同，此主體完全不包含 `tier` 欄位 — 伺服器會根據每個請求的 `Authorization` 金鑰，決定要包含哪些內容，因此 `x-omniroute-feed-tier` 回應標頭是所提供層級的**唯一**來源（`referralsSync.ts::syncRadarReferrals`）；若標頭不存在或無法辨識，則降級為權限最低的假設值 `"community"`。`RadarReferralsFeedSchema`（`src/lib/radar/referralsFeedSchema.ts`）會驗證整個主體，並重複使用由 `feedSchema.ts` 匯出的相同單筆推薦 `RadarReferralSchema`，讓兩個資訊源以相同方式驗證個別推薦。每個 `RadarReferral.url` 都必須是 `https://` — `http://` URL 會導致結構描述驗證失敗。

`RadarFeedSchema`（`feedSchema.ts`）中舊有、嵌入目錄的 `referrals` 欄位仍予以保留，以便與已快取的目錄資訊源向後相容，但 `getRadarReferrals()` 已不再讀取該欄位 — 請參閱下方的[存取器](#accessor)。

### 同步

`syncRadarReferrals()`（`src/lib/radar/referralsSync.ts`）是處理推薦時**唯一**會存取網路的模組，並完全比照 `syncRadar()` 的契約：功能旗標關閉 → `disabled`；選擇加入為 false → `opt_out`；下載 `${RADAR_FEED_URL}/v1/referrals/latest`（與目錄使用相同的 `RADAR_FEED_URL`／`RADAR_FEED_PUBKEY` 分支覆寫），針對原始回應的精確位元組驗證 Ed25519 簽章（`verifyFeedBytes`），使用 `RadarReferralsFeedSchema` 進行驗證，然後快取至 `radar_referrals_cache` 資料表（遷移 `142_radar_referrals_cache.sql`）— 此資料表與目錄的 `radar_feed_cache` 完全分開。10 MB 的回應上限和 `generatedAt` 下限會拒絕比快取版本更舊的傳入資訊源，防止重播較舊的已簽署成品。相同的時間戳記可被接受：伺服器刻意為社群與即時推薦變體提供相同且具確定性的 `generatedAt`，因此在贊助者金鑰變更後，即使基礎連結集合未改變，已簽署的承載資料與所提供的層級仍可變更。絕不擲出例外 — 一律傳回狀態物件；錯誤的 `reason` 絕不包含堆疊追蹤。

有兩個觸發機制可保持推薦快取為最新狀態，且兩者都獨立於目錄本身的 24 小時週期：

- **讀取時同步** — 每當快取不存在或比 `REFERRALS_STALE_MS` 更舊時（1 小時，`shouldSyncReferralsOnRead()`），`GET /api/radar/referrals` 本身會在提供回應前直接呼叫 `syncRadarReferrals()`。這可讓固定連結在下一次載入儀表板時便「始終保持最新」，不必等待任何背景計時器。
- **排程器附帶同步** — `radarSchedulerTick()`（`scheduler.ts`）會在目錄所使用的相同每小時排程中，獨立評估推薦是否過期，並在需要時呼叫 `syncRadarReferrals()`。無論該次排程是否需要更新目錄，此流程都會執行，而且絕不影響 `RadarTickResult` 的結構（僅為盡力而為的附帶效果，發生錯誤時會予以忽略）。

### 存取器

`src/lib/radar/index.ts` 匯出兩個唯讀存取器，兩者都絕不擲出例外（與 `getRadarCatalog()` 採用相同的防禦性契約 — 功能旗標關閉、沒有快取，或快取承載資料損毀時，都會解析為空結構而非錯誤）：

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`，從 `radar_referrals_cache` 讀取（透過 `getRadarReferralsCache()`），並使用 `RadarReferralsFeedSchema` 驗證 — **而非**目錄快取。
- `getDefaultReferralFor(provider)` → 該提供者具有 `isDefault: true` 的 `fixed` 推薦，若不存在則為 `null`。只會檢查 `fixed` — 行銷活動絕不會作為提供者的「預設」連結。

實際的「哪個推薦是提供者的預設推薦」規則位於 `findDefaultReferral()`（`src/lib/radar/referrals.ts`）中。這是一個**不含任何 DB 匯入**的小型純函式 — 可安全地匯入至 `"use client"` 元件。`getRadarReferrals`／`getDefaultReferralFor`（位於 `index.ts`）會引入 `@/lib/db/radar`，因此僅供伺服器端使用；提供者儀表板會直接匯入 `referrals.ts`，而非 `index.ts`（請參閱下文），以避免將 `better-sqlite3` 打包至瀏覽器中。

### `GET /api/radar/referrals`

遵循與其他所有 Radar 路由完全相同的閘門順序：`RADAR_ENABLED` 關閉 →
`404`（最先檢查，維持位元組完全一致）；未驗證 → `401`；否則，
若資料已過期，便觸發讀取時同步（見上文），接著回傳 `200` 與
`{ fixed, campaigns, tier }` — `tier` 直接取自（可能剛重新整理過的）
快取資料列，且僅供參考（用來驅動下方 UI 的柔性升級推廣文案）。絕不
直接代理動態消息伺服器 — 此路由本身的原始碼不包含任何 `fetch(` 呼叫；
網路請求只會在 `syncRadarReferrals()` 內發生，遵循與
`/api/radar/catalog` 相同的僅使用本機快取原則。

### 儀表板 UI — `/dashboard/radar` 上的「免費額度」分頁

將現有的 Radar 頁面（`src/app/(dashboard)/dashboard/radar/page.tsx`）重複使用為
第二個分頁，而不是建立新路由 — 對於僅是現有頁面已擷取資料之變體的功能，
可減少路由/i18n 的涵蓋範圍。選擇加入後，分頁列會提供
**目錄**（現有表格）與 **免費額度**：

- 固定連結會依提供者分組，每個連結都會顯示 `requiredAction`（若有），
  並提供指向推薦 URL、具有 `target="_blank" rel="noopener noreferrer"` 的按鈕。
- 活動會顯示相同資訊，並在存在時額外顯示 `validUntil`。
- 當 `campaigns` 為空，**且**提供的方案層級為 `community` 時，UI 會顯示一則
  簡短的升級推廣提示（「限時活動是贊助者的額外福利」）— 這**絕不會**
  隱藏或限制固定連結清單；該清單會針對每個方案層級保持完整顯示。
  此升級推廣僅為柔性訊息，絕不會形成阻擋。

### 提供者名稱上的推薦連結（提供者儀表板）

`ProviderPageHeader`（`src/app/(dashboard)/dashboard/providers/[id]/components/`）
原本便會在 `providerInfo.website` 存在時，將提供者名稱連結至該網址，
且已有一個營利連結的先例：Kimi（Moonshot AI）合作夥伴連結附註
（`providers.kimiPartnerLinkNote` i18n 鍵）。D28 針對 Radar 預設推薦連結，
沿用完全相同的低調附註模式，而不是引入新的鍵。

刻意採用鬆散耦合：

- `resolveProviderHeaderLink()`（`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`）
  是一個**純**函式 — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — 不依賴 `@/lib/radar` 或 `@/lib/db/*`。整個 `providerPageUtils.ts` 都不含
  這些匯入（由 `tests/unit/provider-header-referral-link.test.ts` 進行斷言）。
- `ProviderDetailPageClient.tsx`（一個 `"use client"` 元件）是唯一允許
  擷取 Radar 資料的位置 — 透過 `fetch("/api/radar/referrals")`，使用與
  Radar 儀表板頁面本身相同的本機路由模式 — 並在用戶端使用來自不依賴 DB 的
  `src/lib/radar/referrals.ts` 之 `findDefaultReferral()` 計算預設推薦連結。
- 當 `RADAR_ENABLED` 關閉時，擷取會回傳 404，`referralUrl` 維持為 `null`，
  而 `resolveProviderHeaderLink()` 會原樣回傳靜態目錄中的 `website` —
  提供者頁面與此功能存在之前維持位元組完全一致。尚無快取，或該特定提供者
  沒有預設推薦連結時，結果也相同。
- 當預設推薦連結適用時，`ProviderPageHeader` 會收到 `isReferralLink`，
  並顯示與 Kimi 合作夥伴連結相同的低調附註/工具提示（重複使用
  `providers.kimiPartnerLinkNote` 鍵）— 絕不採用新的獨立視覺樣式。

---

## 如何自行託管資訊提供源

希望完整掌控目錄的分支版本或自行託管者，可以執行自己的資訊提供源服務，而無須修改用戶端程式碼：

1. 提供一個 `GET /v1/catalog/latest` 端點，回傳符合 `RadarFeedSchema`（`src/lib/radar/feedSchema.ts`）的 JSON 主體——頂層欄位包括 `feed:
"omniroute-radar"`、`schemaVersion: 2`、`version`、`tier`、`providers`、`models`、`quirks` 及 `totals`。請遵循 `x-omniroute-radar-schema: 2`；與過渡期相容的伺服器，應將未包含此標頭的請求預設為另一個獨立簽署的 v1 成品。
2. 使用 Ed25519 金鑰組對確切的回應位元組進行簽署，並在 `x-omniroute-feed-signature` 回應標頭中回傳 base64 簽章。
3. 將 `RADAR_FEED_URL` 設為新的基底 URL，並將 `RADAR_FEED_PUBKEY` 設為對應的公開金鑰（base64-DER SPKI 或 PEM）——請參閱[環境變數參考](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)。
4. 啟用 `RADAR_ENABLED`，並透過 `POST /api/radar/settings` 選擇加入（`{ optIn: true }`）。

不需要進行其他程式碼變更——`verifyFeedBytes()` 會自動採用覆寫設定（位於 `src/lib/radar/pinnedKeys.ts` 的 `getFeedPublicKeys()`），而版本比較、結構描述驗證及合併規則都會以相同方式套用至自行託管的資訊提供源。

推薦連結（請參閱上方的[推薦連結（免費點數）](#referral-links-free-credits)）是獨立且選用的成品：僅提供 `/v1/catalog/latest` 的分支版本仍可完整運作——當 `/v1/referrals/latest` 回傳 `404` 時，`syncRadarReferrals()` 會降級為 `{ status: "error" }`，而快取只會維持空白，因此 `GET /api/radar/referrals` 會繼續回傳 `{ fixed: [], campaigns: [], tier: null }`，而不會導致頁面的其餘部分失敗。若也要提供推薦連結，請提供符合 `RadarReferralsFeedSchema`（`src/lib/radar/referralsFeedSchema.ts`）的 `GET /v1/referrals/latest`，並使用與目錄資訊提供源相同的 Ed25519 金鑰組進行簽署。

贊助者優惠是另一個選用成品。若要提供這些優惠，請使用封閉的 `RadarOffersFeedSchema`（`src/lib/radar/offersFeedSchema.ts`）實作 `GET /v1/offers/latest`、要求即時權益、回傳 `x-omniroute-feed-tier: live`，並使用相同金鑰對確切位元組進行簽署。省略此端點的分支版本不會改變目錄／推薦連結的行為；優惠重新整理會以非破壞性方式失敗，且最後一次通過驗證的本機優惠快取仍可使用。

Intel 同樣是選用功能。自行託管者可以使用 `RadarIntelFeedSchema`（`src/lib/radar/intelFeedSchema.ts`）提供 `GET /v1/intel/latest`、要求即時權益、回傳 `x-omniroute-feed-tier: live`，並使用共用的 Ed25519 金鑰對確切位元組進行簽署。省略此端點不會影響目錄、推薦連結及優惠；Intel 重新整理會保留任何最後一次通過驗證的本機快照。

---

## 相關文件

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — `/api/radar/*` 路由所遵循的錯誤回應模式。
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting) — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` 參考。
