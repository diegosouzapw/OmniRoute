# Release-Green: keeping the queue and release branch green (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md)

---

## 此問題解決了什麼

**完整閘門**（`.github/workflows/ci.yml` — 單元測試分片、vitest、棘輪、
`package-artifact`、SonarQube、E2E）**僅在發佈 PR**（PR → `main`）上執行。以
`release/**` 為目標的 PR 會執行**快速閘門**（`quality.yml`：受 TIA 影響的測試 + 類型檢查 + lint），
若有程式碼變更，還會執行**諮詢性**正式環境建置。因此：僅在發佈時出現的紅燈仍可能
在發佈分支上悄悄累積，並在發佈時**以每層約 40 分鐘的方式連環爆發**，
一次出現一個。

「release-green 系列」旨在**提前發現**這些紅燈 — 隨時在**本機／發佈流程之外**
驗證完整閘門的等效項目，讓發佈 PR 在第一次執行 CI 時就已經
全數通過。

> **不可妥協的原則：**這些機制都不會阻擋貢獻者。我們不會新增一個因失敗而阻擋其
> PR 的必要檢查。**漂移**（棘輪）應由維護者在發佈時重新設定基準 —
> 絕不是貢獻者需要處理的問題。任何部分都不會**關閉** PR（竊取貢獻功勞），也不會
> 為了通過而**弱化**測試。

## 此系列（4 個部分）— 以及各部分如何獨立執行

| 部分                                                                        | 內容                                         | 執行時機                                                     | 範圍                        |
| --------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------ | --------------------------- |
| **`/green-prs`**（解決方案 A）                                              | 由維護者按需掃描**開放中 PR 的佇列**         | **定期獨立執行** — 尤其是在執行 `/generate-release` **之前** | 整個 PR 佇列 → `release/**` |
| **`/validate-release-green`**（解決方案 C — `npm run check:release-green`） | 驗證引擎：針對分支或合併候選項目重現完整閘門 | 可隨時獨立執行                                               | 特定分支或合併 PR           |
| **`/babysit <PR#>`**                                                        | 推動**單一** PR 的**即時 CI**直至全數通過    | 針對每個 PR 獨立執行                                         | 單一 PR                     |
| **`nightly-release-green.yml`**（解決方案 D）                               | 自動化每夜工作流程；遇到嚴重紅燈時建立 issue | 自動執行（cron）                                             | 作用中的發佈分支            |

**「這只用於發佈嗎？」的簡短回答：****不是。**`/green-prs` 的設計目的就是
在**兩次發佈之間定期**執行。獨立執行才是常態 — 發佈只不過是
執行它時最能發揮價值的時刻。

## PR 至發布的建議性建置

`quality.yml` 現在針對非草稿程式碼 PR 與 Mergify 佇列分支納入 `Build (advisory)`。
它仿照 `ci.yml` 中的正式環境建置流程：Node 24、`npm-ci-retry`、
`check:node-runtime`，以及使用 `OMNIROUTE_USE_TURBOPACK=1` 執行 `npm run build`。它刻意
不上傳建置成品，因為此工作流程中沒有任何下游品質作業會使用該成品。
在發布 PR 穩定執行一週後，移除 `continue-on-error`，使此訊號成為
具阻擋作用的 PR 至發布閘門。

## 解決方案 C — `npm run check:release-green`（引擎）

針對目前的工作樹重現等同發布的驗證，並將每個紅燈分類：

- **HARD**（類型檢查、lint 錯誤、單元測試、vitest、db-rules、public-creds、選用的
  `package-artifact`）→ **實際缺陷**；`exit 1`。在來源分支上修正（TDD，規則 #18）。
- **DRIFT**（eslint **警告**、認知複雜度、檔案大小）→ 週期內累積的棘輪基準偏移，
  **不是貢獻者的錯**；只會回報，並且**由維護者在發布時重新設定基準**。
  DRIFT **絕不**變更結束代碼，因此絕不會阻擋任何人。

```bash
npm run check:release-green                 # 目前分支（工作樹）
node scripts/quality/validate-release-green.mjs --json   # 結構化輸出
node scripts/quality/validate-release-green.mjs --quick  # 略過 unit+vitest（僅 drift+typecheck+lint）
node scripts/quality/validate-release-green.mjs --with-build  # 包含 package-artifact（較慢）
```

僅進行診斷並**回報**（不會自動修正）。修正至綠燈的協調流程位於
`/green-prs` 與 `/review-prs`。

## 解決方案 A — `/green-prs`（佇列掃描）

程序（摘要——詳細資訊請參閱 `green-prs` 技能）：

1. **盤點**以作用中發布分支為目標的開放 PR 佇列。
2. **分類處理**每個 PR（可行／應拒絕／需要作者處理）——應拒絕／需要作者處理者
   **只會回報，不會關閉**（由作者決定）。
3. 對每個可行的 PR，在**隔離的工作樹**（規則 #19）中，將 PR 更新至發布分支頂端，並執行
   `npm run check:release-green`：
   - **HARD** → 透過共同作者署名，**在貢獻者的分支上**修正（保留作者的「Merged」狀態），
     重複執行，直到所有 HARD 都已排除。
   - **DRIFT** → 保持不變；將於發布時重新設定基準。
4. **回報**一份 PR ×（判定、HARD 紅燈、是否已修正、DRIFT、目前是否符合 release-green？）表格。

可以在不合併的情況下**準備**佇列；只有在明確要求時才會合併，而且絕不會關閉 PR。

## 建議執行頻率

- **定期執行 `/green-prs`**（例如每週一次），並且務必在
  `/generate-release` 之前執行。
- 保留 **`nightly-release-green.yml`**（解決方案 D）作為持續性訊號：當它建立
  HARD 紅燈議題時，就該進行掃描。
- 視需要使用 **`/validate-release-green`**，以檢查分支或特定的合併候選項目。
- 當特定 PR 需要在即時 CI 上推進至綠燈時，使用 **`/babysit <PR#>`**。

## 與發布的關係

- `/generate-release` 會在**階段 0（預先檢查）**中呼叫驗證：在建立發布 PR 前重新設定 DRIFT 基準並修正
  HARD。
- `/review-prs` 會在合併決策步驟使用 release-green 閘門（先綠燈再合併）。

所有部分的目標都相同：**讓發布 PR 在第一次 CI 執行時即為綠燈**，而不是在發布日
逐層追逐每輪耗時 40 分鐘的紅燈。
