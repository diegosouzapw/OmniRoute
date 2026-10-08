# Monitoring & Costs — Navigation Structure (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md)

---

> 已於 B 組（計畫 16）實作。請參閱 `src/shared/constants/sidebarVisibility.ts`。

---

## 高階導覽

儀表板側邊欄（完成 B 組後）依序包含以下頂層區段：

```
首頁
提供者
組合
API 金鑰
設定
分析
成本          ← 新增（B 組，計畫 16）
監控          ← 重新組織（B 組，計畫 16）
...
```

---

## 成本區段（新增，層級 1）

路徑前綴：`/dashboard/costs/`

| 項目     | URL                                  | 說明                             |
| -------- | ------------------------------------ | -------------------------------- |
| 總覽     | `/dashboard/costs`                   | 彙總成本儀表板（從「分析」移入） |
| 定價     | `/dashboard/costs/pricing`           | 各模型定價表                     |
| 預算     | `/dashboard/costs/budget`            | 預算閾值與警示                   |
| 配額共享 | `/dashboard/costs/quota-share`       | 配額共享集區與使用量             |
| 方案設定 | `/dashboard/costs/quota-share/plans` | 各提供者的方案覆寫設定           |

**理由**：定價、預算和配額共享先前位於
`監控 > 成本參數` 下。將它們移至專屬的頂層區段後，
使用者無須瀏覽可觀測性工具即可找到這些功能。

---

## 監控區段（已重新組織）

監控區段現在將**活動置於頂端**，後接 **3 個子群組**：

```
監控
├── 活動                 ← 時間軸動態（頂層項目）
├── 日誌群組
│   ├── 日誌（全部）
│   ├── Proxy 日誌
│   └── Console 日誌
├── 稽核群組
│   ├── 稽核日誌
│   ├── MCP 稽核
│   └── A2A 稽核
└── 系統群組
    ├── 健康狀態
    └── 執行階段
```

### 與舊結構相比的變更

| 之前                                                                     | 之後                                         |
| ------------------------------------------------------------------------ | -------------------------------------------- |
| 活動 = 日誌內用於呈現稽核日誌的分頁                                      | 活動 = 專屬動態消息（`/dashboard/activity`） |
| 監控中的成本參數群組                                                     | 移至成本區段                                 |
| 扁平清單：日誌、活動（日誌）、稽核、健康狀態、執行階段、定價、預算、配額 | 結構化為 3 個群組，另加專屬成本區段          |

---

## 活動與稽核日誌

兩者現在各自獨立：

| 維度           | 活動（`/dashboard/activity`）              | 稽核日誌（`/dashboard/audit`）            |
| -------------- | ------------------------------------------ | ----------------------------------------- |
| **用途**       | 面向使用者的事件動態（「最近發生了什麼」） | 合規／安全日誌                            |
| **資料來源**   | `GET /api/compliance/audit-log?level=high` | `GET /api/compliance/audit-log?level=all` |
| **格式**       | 按日期分組的時間軸，搭配易讀的動詞與圖示   | 密集的分頁表格，每頁 50 筆                |
| **篩選條件**   | 事件類型分類                               | 動作、嚴重性、執行者、日期範圍            |
| **匯出**       | 不提供                                     | JSON 匯出                                 |
| **執行者篩選** | 不適用                                     | 可依執行者篩選                            |
| **顯示的事件** | 僅限高階動作（允許清單）                   | 所有稽核事件                              |

### 高階動作允許清單

定義於 `src/lib/audit/highLevelActions.ts`。此清單控制哪些事件會出現在
活動動態中。允許清單包含：

- 提供者新增／移除／測試事件
- 組合建立／更新／刪除
- API 金鑰生命週期（建立、撤銷、輪替）
- 達到預算閾值
- 身分驗證登入／登出
- 雲端代理程式工作階段建立
- MCP 工具註冊
- Webhook 建立／刪除
- 配額集區／方案變更（`quota.*` 動作，B 組）
- 平台事件（更新、部署）
- 技能安裝／移除

不在此清單中的事件只會出現在稽核日誌中。

### 新增高階動作

編輯 `src/lib/audit/highLevelActions.ts`，並將動作字串新增至
`HIGH_LEVEL_ACTIONS`。這需要提交 PR（此清單位於程式碼中，無法透過資料庫設定）。
對應的圖示可新增至 `src/lib/audit/activityIcons.ts`。

---

## 重新導向：`/dashboard/logs/activity`

舊路徑 `/dashboard/logs/activity` 會透過
`src/app/(dashboard)/dashboard/logs/activity/page.tsx` 中的 `permanentRedirect()`
永久重新導向（HTTP 308）至 `/dashboard/activity`。

舊版側邊欄 ID `logs-activity` 仍保留在 `HIDEABLE_SIDEBAR_ITEM_IDS` 中
（但已從 `SIDEBAR_DEFINITIONS` 移除），以免破壞參照舊 ID 的使用者預設設定。

---

## i18n

B 組新增的命名空間：

| 命名空間鍵值            | 涵蓋內容                                             |
| ----------------------- | ---------------------------------------------------- |
| `sidebar.costsSection`  | 成本區段標籤                                         |
| `sidebar.activity`      | 活動側邊欄項目                                       |
| `sidebar.logsGroup`     | 日誌子群組標籤                                       |
| `sidebar.systemGroup`   | 系統子群組標籤                                       |
| `sidebar.costsOverview` | 成本總覽項目                                         |
| `activity.*`            | 活動頁面的所有字串（標題、動詞、篩選條件、空白狀態） |

基準語系為 `pt-BR` 和 `en`。其他 40 個語系會透過 `next-intl`
後援機制回退至英文（設定於 `src/i18n/config.ts`）。
