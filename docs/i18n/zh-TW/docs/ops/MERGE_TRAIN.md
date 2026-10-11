# Merge Queue & Manual Merge-Train Runbook (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md)

---

自 v3.8.49（品質／速度計畫的 WS3.2/WS3.4）起，經審查的 PR 合併至
`release/vX.Y.Z` 的預設路徑是 **Mergify 合併佇列**（`.mergify.yml`）；
下方記錄的**手動合併列車**則是備援方案——用於事故期間、
發布凍結期間，或 Mergify 開放原始碼方案未來有所變更時。

## 預設路徑：Mergify 佇列

1. PR 已由活動審查並確認為綠燈，且已通過擁有者的合併前 ⭐
   關卡（報告 + 逐項決策——請參閱 `/merge-prs` 的步驟 0.75）。
2. 擁有者（或依據擁有者決策執行的工作階段）套用 **`queue`**
   標籤。此標籤即代表合併核准；Mergify 僅負責執行。
3. Mergify 會針對快速關卡**循序**驗證已排入佇列的 PR（一次一個），
   並進行合併（squash）。批次處理 + 自動二分查找是 Mergify 的付費層級功能
   （免費方案會顯示「Cannot use Merge Queue batch」，#7220），因此 `.mergify.yml` 不會設定
   `batch_size`；批次處理仍由下方的手動合併列車負責。若 PR 的檢查在
   `checks_timeout`（240 分鐘 = `quality.yml` 實測 p95 的 2 倍）後仍處於待處理狀態，
   則會將其移出佇列，而不是讓佇列停滯。
4. 合併後，持續 release-green 工作流程會在推送時驗證新的頂端提交，
   並在該組合發生迴歸時建立歸因議題（絕不自動還原）。

防護規則（與 `CLAUDE.md` 的強制規則 #21/#22 一致）：

- **版本凍結期間** → 請勿為以凍結分支為目標的 PR 加上標籤；應先將目標改為
  作用中的 `release/vX+1`。
- **另一個工作階段中正在處理的 PR** → 絕不可為其加上標籤；只有擁有該工作的工作階段
  才能將自己的工作排入佇列。
- 僅含測試的差異與帶有 `hotfix` 標籤的 PR 已會執行精簡版 CI（請參閱
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane）；佇列條件會接受實際執行的任何
  檢查集合（`#check-failure=0` + `#check-pending=0`）。

## 備援方案：手動合併列車

在佇列無法使用時採用。這將 v3.8.47 週期期間一天內清空 33 個 PR 的
實務做法正式化：

1. **組成批次**（約 10–30 個已審查並核准的 PR）。檢查 `linked:` 衝突
   （相同的 `tap.testFiles`、相同的 CHANGELOG 區塊），並將這些 PR 依序處理。
2. **僅驗證一次**：在從發布 tip 建立的隔離 worktree 中，於本機合併所有批次
   head，接著執行等同發布標準的測試套件
   （`npm run check:release-green`；發布前加上 `--with-build`）。
   `scripts/release/merge-train.sh <base> <PR#>…` 會自動執行步驟 1–2（發生衝突的
   PR 會被移出，列車則繼續執行）。完整模式會執行 `npm run test:unit`——使用
   針對該機器調校的執行器（`--test-concurrency=20`），**而不是**兩個依序執行的 4 核心 CI
   shard；後者使主要階段僅使用約 16 核心機器的 25% 效能（已於
   2026-07-18 修正）。`--fast`（用於當日內清空大型合併列車，已於 2026-07-18
   由擁有者核准）會保留所有靜態關卡 + vitest，但只執行已登上列車之 PR 所變更的
   node:test 檔案；每天仍必須對累積後的 tip 至少執行一次完整測試套件
   （其中一班列車不使用 `--fast`）。
3. **通過** → 依序合併 PR（每次合併前重新檢查 `state,headRefOid`——
   head 已移動的 PR 必須重新進入審查）。確認每次合併的淨差異確實僅包含該
   PR 自己的變更（不可透過自動解決衝突來進行 revert：稽核 `git diff --stat`，
   確認沒有範圍外的刪除）。
4. **失敗** → 將批次對半二分（驗證每一半），而不是逐一重新驗證；
   將違規 PR 連同證據退回審查佇列。
5. **絕不可**：在凍結期間合併至已凍結的分支；在任何地方使用 `git stash`；
   不加判斷地重新執行 CI，期待失敗自行消失（規則：失敗就是資訊）。

## 分層（為何僅使用快速關卡的佇列仍然安全）

- **每個 PR**（quality.yml 快速關卡）：受 TIA 影響的測試 + 完整單元測試 4-shard +
  vitest + lint 集合 + typecheck + 文件／changelog 完整性。
- **每個批次／tip**（持續發布綠燈）：每次 push 至發布分支時執行 `--quick`
  強制關卡；每天執行 3 次完整的 `--with-build --full-ci` 掃描。
- **每次發布**（發布 PR 上的 ci.yml）：完整矩陣，包括 E2E ×9、
  package-artifact + tarball 啟動冒煙測試、coverage/ratchets。

所有項目的驗證程度都不低於以往——高負載範圍只是改為按批次／tip 執行，
而非按每個 PR 執行；這正是消除 O(N) 往返作業的方式。

## `merge-train.sh` 的全新 checkout 前置需求

此指令碼會先在根 checkout 上執行快速失敗的**預檢**（早於任何 worktree
作業），因此損壞的安裝絕不會偽裝成失敗的列車：

1. 執行 `npm ci`，接著執行 npm 所阻擋的 `bun` postinstall：
   `(cd node_modules/bun && node install.js)`——否則 `check:provider-consistency`
   與 `check:known-symbols`（兩者皆為 `bun scripts/…`）會在列車與 base 上
   同時失敗，且不會顯示違規行。
2. 不得存在多餘的 `node_modules/node_modules`（重複的相依性樹；React 會載入兩次，
   導致 UI vitest 測試套件立即失敗）。
3. `node_modules/.bin/tsc` 必須存在且可執行（不完整的安裝會缺少此檔案）。

列車會執行具阻擋作用的 `npm run check:cycles:ratchet`；單獨執行
`npm run check:cycles` 僅供參考（它會列出 SCC，即使 base 正常也會以非零狀態結束）。
