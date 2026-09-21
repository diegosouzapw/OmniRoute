# Gamification & Leaderboard System (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md)

---

> **真實資料來源：** `src/lib/gamification/`、`src/lib/db/gamification.ts`、`src/app/api/gamification/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 包含一個本機優先的遊戲化層，藉由鼓勵使用者與平台互動來提供獎勵——包括發出請求、切換提供者、建立組合、分享權杖，以及為社群做出貢獻。所有狀態皆儲存於 SQLite；與社群伺服器的聯邦整合採選擇加入及推送式設計。

此系統的設計目標是在**關鍵路徑上達到零延遲**——遊戲化事件會從請求管線以送出後不等待結果的方式分派，絕不會阻塞 LLM 回應。

---

## 概述

### 目的

透過提供可見的進度（XP、等級、徽章）、社會認同（排行榜）及經濟誘因（權杖分享、邀請獎勵），提高使用者參與度與留存率。

### 範圍

| 功能         | 說明                                             |
| ------------ | ------------------------------------------------ |
| XP 與等級    | 每次操作皆可獲得 XP；依多項式曲線提升等級        |
| 徽章         | 橫跨 5 個類別、分為 4 個稀有度階級的 20 多項成就 |
| 連續活躍紀錄 | 追蹤每日活躍使用狀況，包括目前及最長連續活躍天數 |
| 排行榜       | 全域、每週、每月、權杖分享及貢獻等範圍           |
| 權杖分享     | 透過複式記帳分類帳在使用者之間轉移點數           |
| 邀請與兌換   | 使用 SHA-256 雜湊儲存的推薦代碼                  |
| 社群伺服器   | 與外部 OmniRoute 執行個體進行聯邦整合            |
| 防作弊       | 伺服器端計分、速率限制及 z-score 異常偵測        |

### 設計原則

1. **本機優先**——所有狀態皆儲存於 SQLite，不需要外部服務。
2. **非阻塞**——事件送出後不等待結果；LLM 回應路徑絕不會因遊戲化邏輯而延遲。
3. **以伺服器為準**——XP 僅由伺服器端計算；用戶端無法灌高分數。
4. **尊重隱私**——排行榜採選擇加入制；使用者可以隱藏自己的個人檔案。
5. **聯邦整合就緒**——社群伺服器可透過簽署的 API 推送分數；同步會覆寫資料，而非累加。

---

## 架構

### 高階流程

```
用戶端請求
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ...（既有管線）...
      → 上游回應傳送至用戶端
      → setImmediate（送出後不等待結果）：
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

事件發射器是唯一的整合點。`chatCore.ts` 會在回應送出後呼叫 `emitGamificationEvent()`；事件模組接著將處理分派至 XP、連續活躍紀錄、徽章、排行榜及防作弊子系統。

### 模組相依關係圖

```
src/lib/gamification/
  events.ts          ← 進入點（由 chatCore.ts 呼叫）
    ├── xp.ts        ← XP 計算與等級解析
    ├── streaks.ts   ← 每日連續活躍紀錄追蹤
    ├── badges.ts    ← 徽章條件評估
    ├── leaderboard.ts ← 排名計算與 SSE 廣播
    ├── antiCheat.ts ← 速率限制與異常偵測
    ├── sharing.ts   ← 權杖轉移分類帳
    ├── invites.ts   ← 邀請／兌換代碼管理
    ├── servers.ts   ← 社群伺服器聯邦整合
    └── notifications.ts ← SSE 通知串流

src/lib/db/
  gamification.ts    ← 所有 CRUD 操作（8 個資料表）

src/app/api/gamification/
  leaderboard/       ← GET 排名、POST 手動重新整理
  leaderboard/stream ← SSE 即時更新
  transfer/          ← GET 歷史記錄、POST 傳送權杖
  invite/            ← GET/POST 代碼、DELETE 撤銷
  invite/redeem/     ← POST 兌換代碼
  servers/           ← GET/POST/DELETE 社群伺服器
  federation/score/  ← POST 將分數推送至伺服器
  federation/leaderboard/ ← GET 從伺服器提取排行榜
  notifications/     ← SSE 徽章／升級通知
  anomalies/         ← GET 異常報告（管理員）
  rotate/            ← POST 輪替邀請權杖密鑰
```

---

## 資料層

### 資料庫資料表

所有資料表都位於主要的 OmniRoute SQLite 資料庫中，由遷移檔案
`060_create_gamification.sql` 建立。WAL 日誌模式繼承自
`src/lib/db/core.ts` 中的單例 `getDbInstance()`。

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### 領域模組：`src/lib/db/gamification.ts`

遵循標準的 OmniRoute 模式——從 `core.ts` 匯入 `getDbInstance()`，
並匯出具類型的 CRUD 函式。路由處理常式中不包含原始 SQL。

主要函式：

| 函式                       | 說明                                          |
| -------------------------- | --------------------------------------------- |
| `upsertLeaderboardEntry()` | 插入或更新 (api_key_id, scope, period) 的分數 |
| `getLeaderboard()`         | 取得指定 scope/period 的分頁排名              |
| `getUserLevel()`           | 取得或建立使用者等級記錄                      |
| `updateUserLevel()`        | 以不可分割的方式設定 XP、等級與稱號           |
| `getBadgeDefinitions()`    | 取得所有徽章定義（可選擇套用篩選條件）        |
| `getUserBadges()`          | 取得使用者已獲得的徽章                        |
| `awardBadge()`             | 插入徽章獲得記錄（依 badge_id 保證等冪性）    |
| `logXpAction()`            | 附加至 xp_audit_log                           |
| `getXpAuditLog()`          | 取得使用者的分頁稽核歷程                      |
| `insertLedgerEntry()`      | 複式轉帳（於交易中執行）                      |
| `getBalance()`             | 計算使用者收到的總額減去送出的總額            |
| `getTransferHistory()`     | 取得分頁轉帳記錄                              |
| `createInviteToken()`      | 插入邀請碼與雜湊權杖                          |
| `redeemInviteToken()`      | 依代碼查詢、驗證，並增加使用次數              |
| `upsertCommunityServer()`  | 註冊或更新聯邦伺服器                          |
| `getCommunityServers()`    | 列出使用者的伺服器                            |
| `deleteCommunityServer()`  | 移除伺服器註冊                                |

---

## XP / 等級系統

**檔案：** `src/lib/gamification/xp.ts`

### 等級曲線

升至等級 `n` 所需的 XP 遵循多項式曲線：

```
xp_for_level(n) = floor(100 * n^1.5)
```

| 等級 | 升至下一級所需 XP | 累計 XP   | 稱號   |
| ---- | ----------------- | --------- | ------ |
| 1    | 100               | 100       | 初學者 |
| 5    | 1,118             | 2,415     | 初學者 |
| 10   | 3,162             | 10,523    | 探索者 |
| 25   | 12,500            | 86,024    | 探索者 |
| 50   | 35,355            | 345,529   | 專家   |
| 75   | 64,952            | 948,683   | 大師   |
| 100  | 100,000           | 2,050,000 | 傳奇   |

### 稱號

| 等級範圍 | 稱號   |
| -------- | ------ |
| 1 – 9    | 初學者 |
| 10 – 24  | 探索者 |
| 25 – 49  | 專家   |
| 50 – 74  | 大師   |
| 75 – 100 | 傳奇   |

### XP 獎勵

| 動作              | XP  | 說明                               |
| ----------------- | --- | ---------------------------------- |
| `request`         | 1   | 每個透過 OmniRoute 路由的 API 請求 |
| `provider_switch` | 5   | 切換至不同的提供者                 |
| `model_switch`    | 3   | 切換至不同的模型                   |
| `combo_create`    | 10  | 建立新的組合                       |
| `combo_use`       | 2   | 使用組合進行請求                   |
| `token_share`     | 1   | 每與其他使用者分享 1 000 個權杖    |
| `invite_redeem`   | 50  | 兌換邀請碼                         |
| `daily_login`     | 5   | 每日活躍使用（每天一次）           |
| `streak_bonus`    | 2   | 每個連續活躍日（乘以連續天數）     |
| `badge_unlock`    | 10  | 解鎖徽章                           |

### 發放流程

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. 查詢 `XP_REWARDS[action]` 以取得 XP 數量。
2. 傳入 `checkRateLimit()`（防作弊：每個金鑰每分鐘最多 1000 XP）。
3. 開啟交易：
   - 讀取目前的 `user_levels` 資料列。
   - 加上 XP；透過 `levelFromXp(totalXp)` 重新計算等級。
   - 如果等級發生變更，設定 `levelUp = true`。
   - 更新 `user_levels` 資料列。
   - 插入至 `xp_audit_log`。
4. 傳回結果。呼叫端負責處理通知。

### 輔助函式：`levelFromXp(totalXp)`

反覆迭代等級 1..100，將 `xp_for_level(n)` 加總，直到累計 XP
超過 `totalXp`。傳回已達到門檻的最高等級。
其時間複雜度為 O(100)——由於等級上限為 100，因此可以接受。

---

## 徽章系統

**檔案：** `src/lib/gamification/badges.ts`

### 類別

| 類別           | 說明                 | 徽章範例                         |
| -------------- | -------------------- | -------------------------------- |
| `usage`        | 基於使用量的里程碑   | 首次請求、1K 次請求、100K 次請求 |
| `sharing`      | 權杖分享與推薦       | 首次分享、慷慨者（分享 10 次）   |
| `contribution` | 社群參與             | 組合建立者、提供者探索者         |
| `streak`       | 長期持續使用         | 一週戰士、每月摯愛者             |
| `rare`         | 難以取得或隱藏的成就 | 早期採用者、錯誤回報者           |

### 稀有度

| 稀有度      | 顏色 | 機率提示     |
| ----------- | ---- | ------------ |
| `common`    | 灰色 | 大多數使用者 |
| `uncommon`  | 綠色 | 活躍使用者   |
| `rare`      | 藍色 | 投入的使用者 |
| `legendary` | 金色 | 前 1%        |

### 條件類型

| 類型           | 欄位         | 說明                                      |
| -------------- | ------------ | ----------------------------------------- |
| `action_count` | `count`      | 執行動作 N 次（例如 1000 次請求）         |
| `streak`       | `days`       | 維持連續 N 天的活躍紀錄                   |
| `unique_count` | `field`, `n` | 使用 N 個不重複的值（例如 10 個不同模型） |
| `rank`         | `scope`, `n` | 在排行榜範圍中達到第 N 名                 |
| `first`        | —            | 成為第一個執行某項動作的人                |
| `hidden`       | （不固定）   | 在獲得之前不顯示條件                      |

徽章定義以 JSON `criteria` 的形式儲存在 `badge_definitions` 中：

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### 評估流程

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # 所有定義
    → getUserBadges(apiKeyId)         # 已獲得（略過）
    → 針對每個尚未獲得的徽章：
       → matchesCriteria(badge, event, userState)
       → 若符合：awardBadge(apiKeyId, badgeId)
         → 傳回通知承載資料
```

評估是**事件驅動**的——它會在每次遊戲化事件之後執行，但
只會檢查 `criteria.type` 與事件動作相符的徽章。這能
維持快速的評估速度（大多數事件 < 5ms）。

### `matchesCriteria(badge, event, userState)`

| 條件類型       | 檢查                                         |
| -------------- | -------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`  |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`         |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`       |
| `rank`         | `getRank(apiKeyId, scope) <= n`              |
| `first`        | 此動作類型在 `xp_audit_log` 中沒有先前的項目 |
| `hidden`       | 委派給適當的子檢查                           |

### 內建徽章（20+）

<details>
<summary>完整徽章清單</summary>

| 徽章         | 類別     | 稀有度 | 達成條件               |
| ------------ | -------- | ------ | ---------------------- |
| 初試啼聲     | 使用量   | 常見   | 1 次請求               |
| 漸入佳境     | 使用量   | 常見   | 100 次請求             |
| 進階使用者   | 使用量   | 不常見 | 1,000 次請求           |
| 百夫長       | 使用量   | 稀有   | 10,000 次請求          |
| 全能之力     | 使用量   | 傳奇   | 100,000 次請求         |
| 提供者跳躍者 | 貢獻     | 常見   | 使用 5 個不同的提供者  |
| 提供者大師   | 貢獻     | 不常見 | 使用 20 個不同的提供者 |
| 組合架構師   | 貢獻     | 不常見 | 建立 5 個組合          |
| 組合宗師     | 貢獻     | 稀有   | 建立 25 個組合         |
| 首次分享     | 分享     | 常見   | 1 次代幣轉移           |
| 慷慨者       | 分享     | 不常見 | 10 次代幣轉移          |
| 慈善家       | 分享     | 稀有   | 累計轉移 10,000 枚代幣 |
| 推薦者       | 分享     | 常見   | 1 次成功推薦           |
| 網路建設者   | 分享     | 不常見 | 10 次成功推薦          |
| 連續週戰士   | 連續紀錄 | 不常見 | 連續 7 天              |
| 每月奉獻者   | 連續紀錄 | 稀有   | 連續 30 天             |
| 勢不可擋     | 連續紀錄 | 傳奇   | 連續 365 天            |
| 早期採用者   | 稀有     | 傳奇   | 在 Beta 測試期間加入   |
| 壓縮先驅     | 稀有     | 不常見 | 使用壓縮功能 100 次    |
| 技能收藏家   | 稀有     | 稀有   | 使用 10 種不同的技能   |
| 模型探索者   | 貢獻     | 不常見 | 使用 15 種不同的模型   |

</details>

---

## 連勝追蹤器

**檔案：** `src/lib/gamification/streaks.ts`

### 資料模型

連勝資料儲存在 `key_value` 資料表（共用工具資料表）中，並使用具命名空間的鍵：

| 鍵                            | 值                               | 說明         |
| ----------------------------- | -------------------------------- | ------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | 目前連勝資料 |

### 邏輯

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. 從 `key_value` 讀取連勝紀錄。
2. 解析 `{current}`、`{longest}`、`{lastDate}`（ISO 日期字串）。
3. 若 `lastDate === today`——不變更（今天已計算過）。
4. 若 `lastDate === yesterday`——遞增 `current`；必要時更新 `longest`。
5. 若 `lastDate < yesterday`——重設 `current = 1`（連勝中斷）。
6. 寫入更新後的紀錄。
7. 檢查里程碑：7、14、30、60、90、180、365 天。若跨越里程碑，則設定
   `milestone = true`（呼叫端會授予 XP 並檢查徽章）。

### 邊界情況

- **時區**：連勝使用 UTC 日期（`new Date().toISOString().slice(0, 10)`）。
  這是刻意的設計——使用單一標準時區可避免透過切換時區來操弄連勝。
- **新使用者**：不存在連勝紀錄；第一次請求會建立紀錄，內容為
  `current=1, longest=1, lastDate=today`。
- **每天多次請求**：只有 UTC 日期當天的第一次請求會遞增連勝。

---

## 排行榜

**檔案：** `src/lib/gamification/leaderboard.ts`

### 範圍

| 範圍            | 期間    | 說明                                         |
| --------------- | ------- | -------------------------------------------- |
| `global`        | `all`   | 歷來累計 XP                                  |
| `weekly`        | `week`  | 目前 UTC 週（週一至週日）獲得的 XP           |
| `monthly`       | `month` | 目前 UTC 月獲得的 XP                         |
| `tokens_shared` | `all`   | 轉移給其他人的權杖總數                       |
| `contributions` | `all`   | 建立的組合數 + 使用的提供者數 + 使用的技能數 |

### 排名計算

排名在**讀取時才計算**，不會儲存。這可避免排名資料過期，並免除定期執行排名重新計算工作的需求。

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

查詢模式：

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### 期間輪替

每週與每月排行榜會自動輪替：

1. **封存**：在期間邊界，將目前項目連同期間標籤複製到
   `leaderboard_archive`。
2. **重設**：刪除已過期期間的項目。
3. **觸發**：每次呼叫 `updateLeaderboard()` 時進行檢查；新期間的第一次請求
   會觸發輪替。

這可確保每週排行榜會在每週一 UTC 00:00 重設，而每月排行榜會在每月 1 日重設。

### SSE 即時更新

**端點：** `GET /api/gamification/stream`

```
用戶端 → GET /api/gamification/stream
  → 建立 SSE 連線
  → 伺服器立即傳送排行榜前 10 名快照
  → 每 5 秒：若有變更，推送更新後的前 10 名
  → 每 15 秒：活動訊號註解（": heartbeat\n\n"）
  → 用戶端中斷連線 → 清理（移除監聽器）
```

事件格式：

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE 管理器會依範圍追蹤已連線的用戶端，且僅在排行榜資料自上次推送後確實發生變更時傳送更新。

---

## 代幣分享

**檔案：** `src/lib/gamification/sharing.ts`

### 複式記帳

每筆轉帳都會在 `token_ledger` 中建立兩個資料列：

| 資料列 | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| 借方   | 傳送者        | 接收者      | +金額    |
| 貸方   | 接收者        | 傳送者      | -金額    |

等等——實際的慣例是：

| 資料列 | `from_key_id` | `to_key_id` | `amount` | 含義         |
| ------ | ------------- | ----------- | -------- | ------------ |
| 傳送   | 傳送者        | 接收者      | +金額    | 從傳送者流出 |
| 接收   | 接收者        | 傳送者      | +金額    | 流入接收者   |

餘額的計算方式如下：

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### 轉帳流程

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **驗證**：`amount > 0`、`fromKeyId !== toKeyId`。
2. **冪等性**：檢查 `idempotency_key` 是否已存在於帳本中。
   若存在，則傳回快取的結果。
3. **交易**（單一 SQLite 交易）：
   a. 計算傳送者的餘額。
   b. 如果 `balance < amount`，則中止（餘額不足）。
   c. 插入傳送資料列（`from=傳送者, to=接收者, amount`）。
   d. 插入接收資料列（`from=接收者, to=傳送者, amount`）。
4. **速率限制**：檢查傳送者的轉帳速率（每分鐘最多 10 筆轉帳）。
5. **事件**：發出 `token_share` 遊戲化事件，以進行 XP 與徽章評估。
6. 傳回 `{ success: true, balance: newBalance }`。

### 速率限制

- 每個 API 金鑰每分鐘最多 10 筆轉帳。
- 單筆轉帳最多 10,000 個代幣。
- 每個 API 金鑰每日最多轉出 100,000 個代幣。

---

## 邀請與兌換代幣

**檔案：** `src/lib/gamification/invites.ts`

### 代碼格式

- **代碼**：8 個字元的英數字元組合（例如 `A3K9-X7M2`），便於閱讀，
  並顯示給使用者。
- **權杖**：32 位元組的隨機權杖，以 SHA-256 雜湊值儲存。用於
  程式化兌換（例如 URL 連結）。

### 儲存方式

| 欄位         | 值                         |
| ------------ | -------------------------- |
| `code`       | `A3K9X7M2`（唯一、有索引） |
| `token_hash` | SHA-256(raw_token)         |

原始權杖只會在建立時傳回給使用者一次。OmniRoute
永遠不會再次儲存或顯示該權杖——只會保留其雜湊值。

### 防止自我推薦

當使用者兌換代碼時，系統會檢查：

1. 該代碼屬於不同的 `api_key_id`。
2. 兌換代碼的使用者先前未曾兌換過來自同一
   推薦者的任何代碼（聯結 `invite_tokens` 與兌換紀錄）。

如果任一檢查失敗，兌換將遭到拒絕，並顯示清楚的錯誤訊息。

### 到期與限制

- 預設 `max_uses`：10（可在建立時設定）。
- 預設 `expires_at`：建立後 30 天。
- 已到期或使用次數已達上限的代碼會傳回 HTTP 410 Gone。

---

## 社群伺服器聯邦

**檔案：** `src/lib/gamification/servers.ts`

### 連線

社群伺服器會透過遠端伺服器簽發的邀請權杖進行註冊。本機執行個體：

1. 接收邀請權杖（例如，貼到儀表板中）。
2. 呼叫遠端伺服器上的 `POST /api/gamification/federation/leaderboard`，以驗證權杖並擷取目前的排行榜。
3. 以 `status: connected` 儲存伺服器記錄。

### 同步模型

聯邦採用**覆寫同步**，而非累加：

```
本機執行個體                    社群伺服器
     │                              │
     ├── 推送分數 ─────────────────►│  POST /federation/score
     │   { api_key_id, score }      │  （伺服器驗證權杖雜湊）
     │                              │
     ├── 拉取排行榜 ───────────────►│  GET /federation/leaderboard
     │◄── 前 N 筆項目 ──────────────┤  （覆寫本機快取）
     │                              │
     └── 健全狀態檢查 ─────────────►│  GET /federation/health
         （每 60 秒，逾時 5 秒）     │
```

### 驗證

聯邦請求包含：

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

遠端伺服器會對權杖進行雜湊處理，並查詢相符的 `community_servers` 資料列。這可避免傳輸已儲存的雜湊。

### 健全狀態監控

每筆伺服器記錄都會追蹤：

| 欄位        | 說明                                   |
| ----------- | -------------------------------------- |
| `status`    | `connected`、`degraded`、`unreachable` |
| `last_sync` | 上次成功同步的 ISO 時間戳記            |
| `failures`  | 連續健全狀態檢查失敗次數               |

連續失敗 5 次後，狀態會變更為 `unreachable`，並暫停同步，直到手動健全狀態檢查成功為止。

---

## 反作弊

**檔案：** `src/lib/gamification/antiCheat.ts`

### 伺服器端計分

所有 XP 計算都在 `src/lib/gamification/xp.ts` 中進行。用戶端絕不提交分數，而是提交動作，再由伺服器計算 XP。`leaderboard.score` 欄位只能由伺服器端程式碼寫入。

### 速率限制

| 限制               | 值      | 範圍          |
| ------------------ | ------- | ------------- |
| 每分鐘 XP 上限     | 1,000   | 每個 API 金鑰 |
| 每分鐘轉移次數上限 | 10      | 每個 API 金鑰 |
| 單次轉移金額上限   | 10,000  | 每次轉移      |
| 每日轉移金額上限   | 100,000 | 每個 API 金鑰 |

速率限制使用記憶體內滑動視窗（與 `open-sse/services/` 中的 `RateLimitManager` 採用相同模式）。如果程序重新啟動，則退回使用 SQLite 支援的計數器。

### Z 分數異常偵測

系統會針對每個 API 金鑰，維護一個滾動式 7 天視窗，記錄每小時獲得的 XP。每次授予 XP 時：

1. 計算使用者目前每小時的 XP 速率。
2. 計算母體平均值與標準差。
3. 計算 `z = (user_rate - mean) / stddev`。
4. 如果 `z > 3.0`（3 個標準差），則標記為異常。

異常會記錄至 `xp_audit_log`，其中 `action = 'anomaly_detected'`，並顯示於管理員儀表板上。

### 稽核軌跡

每次 XP 授予、轉移、徽章取得和異常偵測都會記錄至 `xp_audit_log`，其中包含：

| 欄位         | 說明                                         |
| ------------ | -------------------------------------------- |
| `api_key_id` | 對象                                         |
| `action`     | 發生的事件（xp_award、transfer、anomaly、…） |
| `xp_awarded` | 數量（非 XP 事件為 0）                       |
| `metadata`   | 包含情境資訊的 JSON（動作類型、目標、…）     |
| `created_at` | 時間（ISO 8601）                             |

管理員可透過 `GET /api/gamification/anomalies` 查詢完整的稽核軌跡。

---

## API 路由

所有路由皆遵循標準 OmniRoute 模式：

```
路由 → CORS 預檢 → 請求主體驗證 (Zod) → 驗證身分 (extractApiKey)
  → 處理常式
```

### 端點

| 方法   | 路徑                                       | 說明                           | 身分驗證 |
| ------ | ------------------------------------------ | ------------------------------ | -------- |
| GET    | `/api/gamification/leaderboard`            | 取得排行榜（範圍、期間、分頁） | 選用     |
| POST   | `/api/gamification/leaderboard`            | 強制重新整理排行榜快取         | 必要     |
| GET    | `/api/gamification/stream`                 | SSE 即時排行榜更新             | 選用     |
| GET    | `/api/gamification/transfer`               | 取得轉帳記錄（分頁）           | 必要     |
| POST   | `/api/gamification/transfer`               | 傳送代幣給其他使用者           | 必要     |
| GET    | `/api/gamification/invite`                 | 列出我的邀請碼                 | 必要     |
| POST   | `/api/gamification/invite`                 | 產生新的邀請碼                 | 必要     |
| DELETE | `/api/gamification/invite`                 | 撤銷邀請碼                     | 必要     |
| POST   | `/api/gamification/invite/redeem`          | 兌換邀請碼                     | 必要     |
| GET    | `/api/gamification/servers`                | 列出社群伺服器                 | 必要     |
| POST   | `/api/gamification/servers`                | 連線至社群伺服器               | 必要     |
| DELETE | `/api/gamification/servers`                | 中斷與社群伺服器的連線         | 必要     |
| POST   | `/api/gamification/federation/score`       | 將分數推送至遠端伺服器         | 聯邦驗證 |
| GET    | `/api/gamification/federation/leaderboard` | 從遠端提取排行榜               | 聯邦驗證 |
| GET    | `/api/gamification/notifications`          | SSE 徽章／升級通知             | 必要     |
| GET    | `/api/gamification/anomalies`              | 檢視異常報告（管理員）         | 管理員   |
| POST   | `/api/gamification/rotate`                 | 輪替邀請權杖密鑰               | 必要     |

### 請求／回應範例

**POST /api/gamification/transfer**

```json
// 請求
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// 回應 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// 回應 400（餘額不足）
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP 工具 (8)

與現有工具一同註冊於 `open-sse/mcp-server/` 中。受限於
`gamification` 權限範圍。

| 工具                       | 說明                              | 輸入結構                     |           |
| -------------------------- | --------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | 取得指定範圍／期間的排行榜        | `{ scope, period?, limit? }` |
| `gamification_rank`        | 取得呼叫者的排名及鄰近排名        | `{ scope }`                  |
| `gamification_profile`     | 取得 XP、等級、稱號與連續紀錄摘要 | `{}`                         |
| `gamification_badges`      | 列出已獲得的徽章或所有徽章定義    | `{ earned?: boolean }`       |
| `gamification_transfer`    | 將代幣傳送給另一位使用者          | `{ to, amount }`             |
| `gamification_invite`      | 產生或列出邀請碼                  | `{ action: "create"          | "list" }` |
| `gamification_servers`     | 列出或連線至社群伺服器            | `{ action, token? }`         |
| `gamification_anomalies`   | 檢視異常報告（管理員範圍）        | `{ limit?, since? }`         |

---

## 儀表板頁面

### `/dashboard/leaderboard`

- 頒獎台顯示（前 3 名及其頭像與 XP）。
- 範圍選擇器：全域／每週／每月／已分享代幣／貢獻。
- 分頁表格（每頁 25 筆），包含排名、名稱、分數、等級與稱號。
- SSE 即時更新——排名變動會以動畫呈現。
- 在表格中醒目顯示目前使用者，並提供「你的排名」固定列。

### `/dashboard/profile`

- XP 進度列，包含目前等級與下一等級門檻。
- 醒目顯示稱號徽章。
- 徽章展示區——已獲得的徽章顯示獲得日期，未獲得的徽章則以灰色顯示
  （隱藏徽章在獲得前顯示「???」）。
- 附火焰圖示的連續紀錄計數器；連續紀錄日曆（最近 30 天）。
- XP 歷史圖表（最近 30 天的每日 XP）。

### `/dashboard/tokens`

- 代幣餘額（醒目顯示於頁面頂端）。
- 轉帳表單：收款人、金額、確認對話框。
- 具有篩選條件（已傳送／已接收／全部）的轉帳歷史記錄表格。
- 邀請區段：有效邀請碼、產生新邀請碼、分享連結。
- 社群伺服器：顯示健康狀態的清單、連線／中斷連線。

### `/dashboard/gamification/admin`

- 異常清單，包含嚴重程度、使用者、時間戳記與 z 分數。
- 具有篩選條件（操作類型、使用者、日期範圍）的稽核記錄檢視器。
- 系統統計資料：已授予的 XP 總量、活躍使用者、徽章獲得率。
- 聯邦伺服器健康狀態概覽。

---

## 管線整合

### 整合點

遊戲化功能會在
`open-sse/handlers/chatCore.ts` 中的單一位置掛接至請求管線：

```typescript
// 回應傳送至用戶端後：
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // 發送後不等待：記錄錯誤，但絕不傳播至用戶端
  });
});
```

### 事件類型

| 事件類型            | 發出時機                       |
| ------------------- | ------------------------------ |
| `request.completed` | 成功傳送 LLM 回應              |
| `provider.switch`   | 提供者變更（包含組合後援切換） |
| `combo.created`     | 新的組合設定已儲存             |
| `combo.used`        | 成功命中組合目標               |
| `badge.earned`      | 徽章評估找到符合項目           |
| `streak.milestone`  | 跨越連續紀錄門檻               |
| `transfer.sent`     | 代幣轉帳完成                   |
| `referral.redeemed` | 成功兌換邀請碼                 |
| `compression.used`  | 已套用提示詞壓縮               |
| `skill.executed`    | 技能執行完成                   |
| `model.first_use`   | 模型在過去 7 天內未曾使用      |

### 非阻塞保證

`setImmediate` + `.catch(() => {})` 模式可確保：

1. 遊戲化功能執行前，回應已完整傳送。
2. 遊戲化功能的錯誤絕不會顯示給用戶端。
3. 事件處理會在下一個微任務中執行，而非內嵌執行。

---

## 安全性

### 威脅模型

| 威脅             | 緩解措施                                      |
| ---------------- | --------------------------------------------- |
| 分數灌水         | 僅在伺服器端計算 XP；用戶端提交操作，而非分數 |
| 重播攻擊         | 轉移使用冪等鍵；稽核日誌去重                  |
| 轉移詐騙         | 複式記帳帳本；原子交易；速率限制              |
| 自我推薦         | 兌換時交叉檢查 `api_key_id`                   |
| 排行榜操縱       | Z-score 異常偵測；管理員異常儀表板            |
| 聯邦權杖遭竊     | 使用 SHA-256 雜湊儲存；原始權杖僅顯示一次     |
| 暴力破解邀請碼   | 兌換端點的速率限制；8 字元熵                  |
| 顯示名稱中的 XSS | 清理顯示名稱；逸出排行榜項目                  |
| 對雜湊的時序攻擊 | 使用 `crypto.timingSafeEqual` 比較權杖雜湊    |

### 驗證要求

- **公開**（無需驗證）：`GET /leaderboard`、`GET /stream`（唯讀
  排行榜）。
- **需要 API 金鑰**：所有寫入操作、個人資料、轉移、邀請。
- **僅限管理員**：異常儀表板、稽核日誌檢視器。
- **聯邦**：使用 `Authorization` 標頭中的原始權杖，透過獨立驗證路徑
  與儲存的 SHA-256 雜湊進行比對驗證。

---

## 測試

### 測試檔案

所有測試皆使用 Node.js 原生測試執行器（`node --import tsx/esm --test`）。

| 測試檔案                                      | 涵蓋範圍                       | 測試數 |
| --------------------------------------------- | ------------------------------ | ------ |
| `tests/unit/gamification/xp.test.ts`          | XP 計算、等級曲線、稱號        | 8      |
| `tests/unit/gamification/badges.test.ts`      | 徽章條件比對、授予             | 10     |
| `tests/unit/gamification/streaks.test.ts`     | 連續紀錄邏輯、里程碑、邊界情況 | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | 排名計算、分頁、輪替           | 8      |
| `tests/unit/gamification/sharing.test.ts`     | 轉移、餘額、冪等性             | 9      |
| `tests/unit/gamification/invites.test.ts`     | 建立、兌換、到期、自我推薦     | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | 速率限制、Z-score、稽核記錄    | 6      |
| `tests/unit/gamification/events.test.ts`      | 事件發送、扇出、錯誤處理       | 5      |

### 執行測試

```bash
# 所有遊戲化測試
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# 單一測試檔案
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### 覆蓋率要求

依據 `CONTRIBUTING.md`，所有新模組必須符合：

- 分支覆蓋率 >= 80%。
- 每個公開函式至少測試一次。
- 測試錯誤路徑（餘額不足、代碼已過期、速率限制）。

---

## 檔案結構

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # 全部 8 個資料表與索引
      gamification.ts                  # 領域 CRUD 模組
    gamification/
      xp.ts                           # XP 計算、等級曲線、稱號
      badges.ts                       # 徽章定義、條件、評估
      streaks.ts                      # 每日連續紀錄追蹤
      leaderboard.ts                  # 排名計算、SSE、輪替
      antiCheat.ts                    # 速率限制、z-score、稽核
      sharing.ts                      # 代幣轉移帳本
      invites.ts                      # 邀請／兌換碼
      servers.ts                      # 社群伺服器聯邦
      events.ts                       # 事件發射器（整合點）
      notifications.ts                # SSE 通知串流
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST 排行榜
        leaderboard/stream/route.ts   # SSE 即時更新
        transfer/route.ts             # GET/POST 轉移
        invite/route.ts               # GET/POST/DELETE 邀請碼
        invite/redeem/route.ts        # POST 兌換碼
        servers/route.ts              # GET/POST/DELETE 伺服器
        federation/score/route.ts     # POST 推送分數
        federation/leaderboard/route.ts # GET 擷取排行榜
        notifications/route.ts        # SSE 通知
        anomalies/route.ts            # GET 異常報告
        rotate/route.ts               # POST 輪替密鑰
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # 排名頁面
        profile/page.tsx               # XP／徽章／連續紀錄頁面
        tokens/page.tsx                # 餘額／轉移／邀請頁面
        gamification/admin/page.tsx    # 管理員異常監控
  shared/
    constants/
      gamification.ts                  # XP_REWARDS、TITLES、BADGE_DEFS、LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # 本文件
```

---

## 遷移策略

### 階段 1：後端核心（PR 1）

- 遷移檔案 `060_create_gamification.sql`（8 個資料表）。
- `src/lib/db/gamification.ts`（領域模組）。
- `src/lib/gamification/xp.ts`、`streaks.ts`、`events.ts`。
- `chatCore.ts` 中的整合點。
- XP、連續紀錄與事件的單元測試。

### 階段 2：徽章與排行榜（PR 2）

- `src/lib/gamification/badges.ts`、`leaderboard.ts`。
- 常數中的徽章定義。
- 排行榜 API 路由與 SSE 串流。
- 徽章與排行榜的單元測試。

### 階段 3：分享與邀請（PR 3）

- `src/lib/gamification/sharing.ts`、`invites.ts`、`antiCheat.ts`。
- 轉移與邀請 API 路由。
- 分享、邀請與反作弊的單元測試。

### 階段 4：聯邦與儀表板（PR 4）

- `src/lib/gamification/servers.ts`、`notifications.ts`。
- 聯邦 API 路由。
- 儀表板頁面（排行榜、個人資料、代幣、管理）。
- MCP 工具註冊。

---

## 未來考量

- **季節性活動**：限時徽章套組與排行榜賽季。
- **團隊排行榜**：依組織或組合將使用者分組。
- **XP 倍率**：在促銷期間提升 XP。
- **成就分享**：產生可分享的徽章卡片（OpenGraph 圖片）。
- **行動推播**：針對徽章／等級事件提供基於 webhook 的通知。
- **排行榜 API**：供第三方整合使用的公開 API。
