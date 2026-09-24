# Merge Queue & Manual Merge-Train Runbook (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md)

---

自 v3.8.49（品質／速度計畫的 WS3.2/WS3.4）起，經審查的 PR 合併至
`release/vX.Y.Z` 的預設路徑為 **Mergify 合併佇列**（`.mergify.yml`）；
以下記錄的**手動合併列車**則是備援方案——用於事故期間、版本凍結期間，
或 Mergify 開放原始碼方案日後有所變更時。

## 預設路徑：Mergify 佇列

1. PR 已由活動審查／轉綠，並通過擁有者的合併前 ⭐
   閘門核准（報告 + 逐項決策——請參閱 `/merge-prs` 步驟 0.75）。
2. 擁有者（或依擁有者決策行事的工作階段）套用 **`queue`**
   標籤。此標籤即為合併核准；Mergify 僅負責執行。
3. Mergify 會將最多 10 個已排入佇列的 PR 組成批次，使用快速閘門驗證該批次，
   然後進行合併（squash）。失敗的批次會**自動二分**——有問題的 PR
   會在約 log2(N) 次重新驗證後被隔離並移出佇列；其餘 PR 則繼續進行。
4. 合併後，持續版本轉綠工作流程會在推送時驗證新的頂端，
   並在組合發生退步時建立歸屬問題（絕不自動還原）。

防護規則（對應 `CLAUDE.md` 強制規則 #21/#22）：

- **版本凍結中** → 請勿為以已凍結分支為目標的 PR 加上標籤；請先將目標改為
  作用中的 `release/vX+1`。
- **另一個工作階段正在處理的 PR** → 絕不可為其加上標籤；只有所屬工作階段
  可將自己的工作排入佇列。
- 僅含測試差異的 PR，以及帶有 `hotfix` 標籤的 PR，已會執行精簡版 CI（請參閱
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane）；佇列條件會接受實際執行的任何
  檢查集合（`#check-failure=0` + `#check-pending=0`）。

## 備援方案：手動合併列車

在佇列無法使用時採用。這將 v3.8.47 週期期間一天內清空 33 個 PR 的做法正式化：

1. **組成批次**（約 10–30 個已審查並核准的 PR）。檢查 `linked:` 衝突
   （相同的 `tap.testFiles`、相同的 CHANGELOG 區塊），並將這些 PR 依序處理。
2. **僅驗證一次**：在基於版本分支頂端的隔離工作樹中，於本機合併所有批次
   頂端，接著執行與版本發布等效的套件
   （`npm run check:release-green`，發布前加上 `--with-build`）。
   `scripts/release/merge-train.sh <base> <PR#>…` 會自動執行步驟 1–2（有衝突的
   PR 會被移出，列車則繼續前進）。完整模式會執行 `npm run test:unit`——使用
   針對機器調校的執行器（`--test-concurrency=20`），而**不是**兩個循序執行的 4 核心 CI
   分片；後者曾使主要階段僅使用約 16 核心機器的 25%（已於
   2026-07-18 修正）。`--fast`（日內大型列車清空作業，已由擁有者於 2026-07-18 核准）
   會保留所有靜態閘門 + vitest，但只執行已上車 PR 所變更的 node:test 檔案；
   每天仍必須至少在累積後的頂端執行一次完整套件
   （其中一班列車不使用 `--fast`）。
3. **通過** → 依序合併 PR（每次合併前都重新檢查 `state,headRefOid`——
   頂端已變動的 PR 必須重新進入審查）。證明每次合併的淨差異皆為該
   PR 自身的變更（不可透過自動解決來還原：審核 `git diff --stat` 是否存在
   超出範圍的刪除）。
4. **失敗** → 將批次對半二分（驗證每一半），而不是逐一重新驗證；
   將有問題的 PR 連同證據退回審查佇列。
5. **絕不可**：在凍結期間合併至已凍結分支；在任何地方使用 `git stash`；
   不加區分地重新執行 CI，寄望失敗自行消失（規則：失敗即是資訊）。

## 分層（為何佇列僅使用快速閘門仍然安全）

- **每個 PR**（quality.yml 快速閘門）：受 TIA 影響的測試 + 完整單元測試 4 分片 +
  vitest + lint 組合 + 類型檢查 + 文件／CHANGELOG 完整性。
- **每個批次／頂端**（持續版本轉綠）：每次推送至
  版本分支時執行 `--quick` 強制閘門；每天執行 3 次完整的 `--with-build --full-ci` 掃描。
- **每個版本**（版本 PR 上的 ci.yml）：完整矩陣，包括 E2E ×9、
  套件成品 + tarball 啟動煙霧測試、覆蓋率／棘輪門檻。

驗證內容並未比以往減少——高負載範圍只是改為針對每個批次／頂端執行，
而不是針對每個 PR 執行；這正是消除 O(N) 往返作業的方式。
