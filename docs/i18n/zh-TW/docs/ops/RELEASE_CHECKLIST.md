# Release Checklist (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md)

---

> **最後更新：** 2026-08-28 — v3.8.51
> 運用 Claude Code 技能進行自動化的精簡發布流程。
>
> **在各次發布之間維持佇列／分支為綠燈狀態：**請參閱 [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> （`/green-prs` 系列 + `npm run check:release-green` + `/babysit` + 每夜執行）。定期執行
> 此流程（尤其是在執行本檢查清單**之前**），可讓發布 PR 從綠燈狀態開始。

## 摘要

```bash
# 1. 提升版本號 + 產生 CHANGELOG（技能）
/version-bump-cc patch    # 或 minor/major

# 2. 在本機執行品質閘門
npm run check              # lint + 測試
npm run test:coverage      # 完整覆蓋率閘門（60/60/60/60）

# 3. 建置與冒煙測試
npm run build
npm run test:e2e           # 選用，但建議執行

# 4. 產生發布版本（技能）
/generate-release-cc

# 5. 部署（技能）
/deploy-vps-both-cc        # 或 akamai-cc / local-cc

# 6. 擷取發布證據（技能）
/capture-release-evidences-cc
```

## npm 可信任發布（自 v3.8.51 起為預設）— 依要求暫存，直接發布作為備援

`npm-publish.yml` 預設透過 **npm 可信任發布（OIDC）**進行發布：
`stage-npm` 工作（由 GitHub 託管）會將 GitHub 的 id-token 交換成僅供該次執行使用的短期 npm
憑證——儲存庫密鑰中無需存放長期 npm 權杖、不會出現 2FA 提示，並會附加來源證明。
由於可略過 2FA 的權杖即將停用，這是 npm 現在核准的繞過方式；
它在維持 WS1.3 保證的同時，恢復了本專案截至 v3.8.48 為止所採用的全自動流程
（外洩的權杖無法單獨進行發布——因為根本不存在權杖）。

**一次性設定（擁有者）：** npmjs.com → 套件 `omniroute` → Settings → _Trusted
Publisher_ → GitHub：擁有者 `diegosouzapw`、儲存庫 `OmniRoute`、工作流程 `npm-publish.yml`
（環境：無）。在此設定完成之前，自動步驟會因 `ENEEDAUTH` 而失敗：
請使用 `publish_mode=staged`（見下文）或 `direct` 重新分派。

### 暫存發布（依要求執行 — `publish_mode=staged`）

npm-publish 工作流程不再直接發布：它會啟動已封裝的 tarball
（`check:pack-boot`），然後執行 `npm stage publish`——確切的位元組會暫存於
登錄檔中，且在擁有者核准前**無法安裝**。人工 2FA 閘門已移至
驗證之後，而非之前。

**工作流程轉為綠燈後的擁有者操作流程：**

1. `npm stage list omniroute`——找出暫存 ID（工作流程摘要中也會顯示）。
2. 驗證暫存的位元組（建議）：執行 `npm stage download <id>`，接著將下載的
   tarball 安裝至暫存前綴並啟動（`npm run check:pack-boot` 會在 CI 中自動執行
   相同的封裝→安裝→啟動判定）。
3. `npm stage approve <id>`——2FA 提示**即是**發布動作。`npm stage reject <id>` 則會捨棄。
4. 發布後安全網：發布後驗證器（v3.8.49 計畫的 WS1.4）會在乾淨的容器中，
   從公開登錄檔安裝已發布的版本並啟動。

**緊急備援：**使用 `publish_mode=direct` 執行 `workflow_dispatch`，可恢復舊版的
即時 `npm publish`（僅在暫存機制本身異常時使用；請記錄原因）。

**一次性強化（擁有者，npmjs.com）：**為 `omniroute` 將 Trusted Publisher
設定為僅限暫存模式，使外洩的長期權杖無法從任何地方直接執行 `npm publish`
——CI 只能暫存；只有擁有者的 2FA 能正式發布。

**損壞成品處理手冊（維持不變）：**預設應立即執行
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`（幾分鐘即可完成且可還原）；
只有在 72 小時／無相依套件的期限內才能執行 `npm unpublish`，而且絕不能將其作為第一步。
Docker：絕不可覆寫版本標籤——回復版本時，應將 `latest` 重新指向上一個正常的摘要。

**Docker Hub `latest`（每次發布穩定版 SemVer 時皆為必要）：**
`docker-publish` 工作流程必須同時標記 `X.Y.Z`，而當
`should-promote-latest.sh` 確認這是最高的穩定版 SemVer 時，也必須以**相同摘要**
標記 `:latest`。工作完成後：Hub 的 `latest` 摘要必須等於新的
SemVer 摘要，且 `last_updated` 必須已更新。發布說明提及的修正若僅存在於 git，
請勿讓 `:latest` 仍指向較舊的建置版本。Compose 快速入門使用 `:latest`；
GitOps 則應繼續固定至 `X.Y.Z`。請參閱
[Docker 發布通道](../guides/DOCKER_GUIDE.md#release-channels)與 #10317。

## Hotfix 快速通道（標籤 `hotfix`）

標記為 `hotfix` 的 PR 會略過繁重的 CI 矩陣（9 分片 E2E、覆蓋率棘輪、
quality-gate、quality-extended），並保留快速且高訊號的閘門：建置、
單元測試分片、整合測試、vitest、lint/typecheck、docs-sync、`check:pack-artifact`
以及 tarball 啟動冒煙測試（`check:pack-boot`）。目標：在 ≤15min 內變為綠燈，而非約 33min。

**進入政策——四項皆為必要條件（仿照 Chromium/VS Code/Node 緊急通道）：**

1. **嚴重性**：正式環境已損壞——已發布的成品在啟動時當機／安全性修正／
   該版本的所有使用者皆受影響。「重要」不等於「損壞」。
2. **權限**：只有儲存庫擁有者可套用 `hotfix` 標籤。該標籤即代表
   核准——絕不可在活動型 PR 上自行套用。
3. **證據**：PR 內文需連結至前一次完整綠燈的繁重執行結果（即被略過工作原本會
   重新驗證的測試套件），以及此修正本身從失敗轉為通過的測試。
4. **範圍**：僅限 cherry-pick——最小化修正，不得重構，也不得夾帶其他變更。

略過的覆蓋率／棘輪範圍會由 release 分支上的下一次完整執行重新驗證
（持續維持 release 綠燈）——此通道略過的是等待，絕非驗證。
僅測試的差異（所有檔案皆位於 `tests/` 下，且無任何檔案位於 `tests/e2e/` 下）
會自動略過 E2E 矩陣，無需任何標籤。

## 詳細檢查清單

### 發布前

- [ ] 所有此版本目標的 PR 均已合併至 `release/vX.Y.0`
- [ ] 此版本所有未結的 Linear／議題項目均已關閉或移至下一個里程碑
- [ ] `release/vX.Y.0` 分支上的 CI 全數通過
- [ ] 程式碼中沒有 `TODO(release)` 標記：`grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 基礎映像檔已更新至最新版本（目前為 `node:24.15.0-trixie-slim`）

### 版本與變更日誌

- [ ] 執行 `/version-bump-cc <patch|minor|major>`（Claude Code 技能）
  - 更新 `package.json`、`electron/package.json` 中的版本
  - 根據自上一個標籤以來的 git 提交重新產生 `CHANGELOG.md`
  - 更新 README.md 徽章
- [ ] 手動審查 CHANGELOG.md，並視需要整理提交訊息
- [ ] 確保 `CHANGELOG.md` 中最新的 semver 區段與 `package.json` 版本相同
- [ ] 保留 `## [Unreleased]` 作為變更日誌的第一個區段，以供後續工作使用
- [ ] 更新 `docs/openapi.yaml` → `info.version` 必須與 `package.json` 版本相同

### 程式碼品質

- [ ] `npm run lint` — 0 個錯誤（警告均為既有問題）
- [ ] `npm run typecheck:core` — 無問題
- [ ] `npm run typecheck:noimplicit:core` — 無問題（嚴格模式）
- [ ] `npm run check:cycles:ratchet` — 不超過凍結的 `metrics.cycles` 上限（單獨執行 `check:cycles` 時，只要存在任何循環就會以狀態碼 1 結束，#15281）
- [ ] `npm run check:any-budget:t11` — 未超出預算
- [ ] `npm run check:route-validation:t06` — 無問題
- [ ] `npm run check:node-runtime` — 符合支援的執行環境最低版本（`>=22.22.2 <23`、`>=24.0.0 <27`，依據 `src/shared/utils/nodeRuntimeSupport.ts` 中的 `SUPPORTED_NODE_RANGE`；與 `package.json` 的 `engines` 一致）

### 測試

- [ ] `npm run test:unit` — 通過
- [ ] `npm run test:vitest` — 通過（MCP 伺服器、autoCombo、快取）
- [ ] `npm run test:coverage` — 符合 60/60/60/60 門檻（陳述式／程式行／函式／分支）
- [ ] `npm run test:integration` — 通過（若變更涉及資料庫／處理常式）
- [ ] `npm run test:combo:matrix` — 通過（組合策略矩陣：以確定性方式驗證全部 21 種公開路由策略的選擇決策；修改組合路由、策略解析或備援邏輯時執行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **選用／手動**（受閘門控制的真實上游煙霧測試；從 VPS `root@192.168.0.15` 取得唯讀資料庫快照；會存取真實提供者並消耗額度；絕不在 CI 中執行；未設定閘門時會正常略過）
- [ ] `npm run test:combo:live:vps` — **選用／手動**（第 3 階段 VPS 即時煙霧測試：透過純 Node ESM 對即時 `.15` 伺服器執行 7 個 HTTP 情境；需要 `ssh root@192.168.0.15`；僅建立／刪除 `__live_test__*` 組合；會存取真實提供者；絕不在 CI 中執行）
- [ ] `npm run test:e2e` — 通過（UI 變更）
- [ ] `npm run test:protocols:e2e` — 通過（MCP/A2A 變更）
- [ ] `npm run test:ecosystem` — 通過

### 掛鉤（已由 Husky 驗證）

Husky 掛鉤位於 `.husky/`，並會在 git 操作時自動執行。

- **pre-commit：** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push：** 快速且具確定性的閘門 — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`（於 2026-06-13 啟用）。刻意排除 `test:unit`（速度較慢；由 CI 的 `test-unit` 工作涵蓋）。
  - 推送發布分支前，請手動執行 `npm run test:unit`。

若掛鉤失敗：請修正根本問題，不要使用 `--no-verify` 略過。

### 慣例式提交

所有納入發布版本的提交都必須遵循 `type(scope): subject` 格式。

**有效類型：** `feat`、`fix`、`refactor`、`docs`、`test`、`chore`、`perf`、`style`、`ci`

**有效範圍：** `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`

破壞性變更：新增 `BREAKING CHANGE:` 頁尾，或在範圍後加上 `!`（例如 `feat(api)!: drop /v0`）。

### 文件

- [ ] `npm run check:docs-sync` 通過（由 pre-commit 自動執行）
- [ ] `npm run check:docs-all` 通過（統整檢查：docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links）
- [ ] `npm run check:env-doc-sync` 以狀態碼 0 結束 — 程式碼 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 的環境變數契約維持完整
- [ ] `npm run check:doc-links` 以狀態碼 0 結束 — 重構後沒有失效的內部 Markdown 參照
- [ ] 已審查 `docs/architecture/ARCHITECTURE.md` 是否與儲存／執行環境現況有偏差
- [ ] 已審查 `docs/guides/TROUBLESHOOTING.md` 是否與環境變數及操作現況有偏差
- [ ] 若 `.env.example` 有變更：已更新 `docs/reference/ENVIRONMENT.md`
- [ ] 若新功能具有 UI：`docs/guides/USER_GUIDE.md` 中已提及
- [ ] 若新功能具有 API：已更新 `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] 若新功能是模組：存在專用的 `docs/<MODULE>.md`
- [ ] 若為破壞性變更：`docs/guides/TROUBLESHOOTING.md` 中包含遷移說明

### i18n

- [ ] `npm run i18n:check` 以狀態碼 0 結束 — 翻譯狀態（`.i18n-state.json`）與來源文件同步（嚴格模式下沒有發生偏差的來源；最後一刻微調文件時可接受警告模式的提示，但在建立標籤前應為 0）
- [ ] `npm run i18n:check-ui-coverage` 以狀態碼 0 結束 — 每個 UI 語系均達到或超過 80% 的涵蓋率下限
- [ ] `npm run i18n:sync-ui:dry` 回報全部 66 個目標語系均無缺少的鍵（除來源語系 `en` 外的每個語系）
- [ ] 若英文來源文件有變更，請在建立標籤前執行 `npm run i18n:run`（需要在 `.env` 中設定 `OMNIROUTE_TRANSLATION_API_KEY`）
- [ ] 若翻譯貢獻屬於次要變更，可延至下一個版本（在 CHANGELOG 中追蹤）

### 資料庫遷移

- [ ] 若 `src/lib/db/migrations/` 中有新檔案：
  - [ ] 每個遷移皆具冪等性（`CREATE TABLE IF NOT EXISTS` 等）
  - [ ] 遷移均包裝在交易中
  - [ ] 編號正確（序列中沒有缺號）
- [ ] 在全新安裝環境中測試：刪除 `~/.omniroute/omniroute.db`，然後執行 `npm run dev`
- [ ] 在既有安裝環境中測試：備份資料庫、執行遷移，並驗證結構描述
- [ ] 若遷移會重寫資料表，確認已正確處理 WAL 檔案（`-wal`、`-shm`）

### 提供者目錄（經 Zod 驗證）

- [ ] `src/shared/constants/providers.ts` Zod 結構描述可在載入時通過驗證
  - [ ] 所有提供者都具有必要欄位（`id`、`label`、`kind` 等）
  - [ ] 已為新的免費提供者提供 `freeNote`
  - [ ] OAuth 提供者已在 `src/lib/oauth/constants/oauth.ts` 中註冊 `oauthConfig`
- [ ] 若新增提供者：已在 `open-sse/executors/` 中加入對應的執行器
- [ ] 若非 OpenAI 格式：已在 `open-sse/translator/` 中加入轉換器
- [ ] 模型已在 `open-sse/config/providerRegistry.ts` 中註冊
- [ ] `tests/unit/` 中的單元測試涵蓋提供者分類與路由

### 桌面版（Electron）

若 `electron/` 有變更：

- [ ] `npm run electron:smoke:packaged` 通過
- [ ] 已至少針對 `:win`、`:mac`、`:linux` 其中之一測試建置
- [ ] 程式碼簽署憑證未過期（若進行簽署）
- [ ] `electron/package.json` 版本與根目錄的 `package.json` 相符
- [ ] 若發佈至 `stable`，已更新自動更新通道指標

### 建置配置

儲存庫使用三個不同的輸出目錄——切勿混用：

| 目錄      | 用途                                            | 是否追蹤？          |
| --------- | ----------------------------------------------- | ------------------- |
| `src/`    | 應用程式原始碼（TypeScript / TSX）              | 是                  |
| `.build/` | 建置中間產物——`next build` 輸出（`distDir`）    | 否（已由 git 忽略） |
| `dist/`   | 可發佈的 npm 套件——由 `assembleStandalone` 組裝 | 否（已由 git 忽略） |

> **維運人員注意事項：**遠端 VPS 映像目錄仍為 `/usr/lib/node_modules/omniroute/app/`。
> 只有**儲存庫內**的建置輸出已移動（`app/` → `dist/`）。部署技能會使用 rsync 將
> `dist/` 的內容同步至遠端 `app/` 目錄——不需要變更 VPS 路徑。

**單次建置流程：**

```
npm run build:release
  └─ rm -rf .build dist          （清理）
  └─ next build → .build/next/   （中間產物）
  └─ assembleStandalone          （將 standalone + static + public + natives 複製至 dist/）
  └─ writes dist/BUILD_SHA       （HEAD 哨兵檔案）
```

部署時請勿先執行 `npm run build`，再另外執行 `npm run build:cli`——請使用
`npm run build:release`，它會透過單一命令執行乾淨重建並建立哨兵檔案。

### 成品驗證

- [ ] `npm run build:release` 成功，且 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` 結果乾淨——沒有 `app.__qa_backup`、`scripts/scratch`、`package-lock.json` 或其他本機殘留項目
- [ ] 建置後存在 `dist/server.js`
- [ ] 可選的本機封裝執行階段冒煙測試：在執行 `npm run dev:candidate -- build` 後執行 `npm run dev:candidate -- validate`，使用隔離的 `DATA_DIR` 啟動已封裝的 tarball，並檢查 `/api/health` + `/v1/models`（請參閱[貢獻黃金路徑](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop)）

### 標記與發佈

- [ ] 執行 `/generate-release-cc`（Claude Code 技能）：
  - 建立標籤 `vX.Y.Z`
  - 推送標籤與分支
  - 使用變更日誌內容建立 GitHub Release
  - 附加 Electron 安裝程式（若已建置）
- [ ] 或手動執行：
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 部署

部署技能使用輕量 rsync 流程——不使用 `npm pack`，也不使用 `npm i -g`：

- [ ] 使用與目標相符的部署技能：
  - `/deploy-vps-local-cc`——本機 VPS（192.168.0.15）
  - `/deploy-vps-akamai-cc`——Akamai VPS（69.164.221.35）
  - `/deploy-vps-both-cc`——兩者
- [ ] 部署前，確認 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] 建置必須在 `node_modules` 為實體目錄的位置執行（主要簽出目錄或已執行 `npm ci` 的 worktree——不可使用符號連結的 worktree）
- [ ] 對已部署的執行個體進行冒煙測試：
  - 開啟 `/dashboard/health` → 檢查版本字串是否與發佈版本相符
  - 使用已知提供者執行一個 `/v1/chat/completions` 請求
  - 驗證 `/api/monitoring/health` 傳回 `CLOSED` 斷路器
  - 確認 MCP 傳輸可回應（`/mcp` HTTP、`/mcp-sse` SSE）

### 發佈後

- [ ] 執行 `/capture-release-evidences-cc`（Claude Code 技能）
  - 擷取新功能的 WebP 螢幕截圖／錄影
  - 附加至發佈說明／部落格文章
- [ ] 在 GitHub Discussions／Discord 更新發佈公告
- [ ] 為下一個版本建立里程碑
- [ ] 若為重大事項：置頂討論，或在 `news.json` 中發文以顯示應用程式內橫幅

### Radar 公開發佈關卡

Radar 公告刻意以 `active: false` 提交。只有在下列每個項目都有佐證後，
才能透過另一項變更啟用：

- [ ] 所有堆疊的 Radar PR 均已合併，且發佈頂端版本的 CI 為綠燈
- [ ] 在 `RADAR_ENABLED` 預設仍為關閉的情況下，部署並對 OSS Radar 路由執行冒煙測試
- [ ] 在指定的 Radar 主機上對 `GET /planos`、`/termos`、`/privacidade` 與 `/reembolso` 執行冒煙測試
- [ ] 在私人服務中記錄維運人員的身分／聯絡方式／地址，以及經擁有者核准的法律審查
- [ ] 僅在測試模式下測試 Stripe Checkout 與已簽署的 webhook
- [ ] 使用核准的寄件者／網域測試一次加密的交易電子郵件傳送
- [ ] 證實備份還原可用，並執行一次有人監督且設有預算上限的研究作業
- [ ] 在接受捐款證明前，核准 BRL/PIX 審查政策
- [ ] 僅在通過前述關卡後啟用公開 Checkout，接著啟用新的 `news.json` ID
- [ ] 驗證首頁橫幅使用本地化文案，且在關閉較舊的 ID 後，新 ID 會再次顯示

## 嵌入式服務煙霧測試 (v3.8.4+)

在發布任何包含嵌入式服務變更的版本之前，請驗證：

### 全新資料庫啟動（捕捉遷移衝突 — 於 v3.8.4 緊急修正後新增）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 等待 10 秒以完成啟動
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` 回傳 `"9router"`（不是 404，也不是 500）。確認遷移 `071_services.sql` 已套用，且資料列已植入。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 回傳 3 個資料列。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 回傳 2 個資料列（驗證 `070_webhooks_kind_metadata.sql` 已套用）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` 通過 — 防止未來發生衝突。

### 9Router

- [ ] `POST /api/services/9router/install` 在 2 分鐘內回傳 200，且包含 `installedVersion`
- [ ] `POST /api/services/9router/start` 在 30 秒內回傳 200，且 `state: "running"`
- [ ] `GET /api/services/9router/status` 回報 `health: "healthy"`
- [ ] 使用 `"model": "9router/auto/..."` 呼叫 `POST /v1/chat/completions` 時回傳 200（透過 9Router 進行端對端路由）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` 在代理內呈現 9Router 原生 UI（不是直接使用 `127.0.0.1:port` 的 iframe）
- [ ] `POST /api/services/9router/rotate-key` 回傳 `{ keyRotated: true }`，且服務能正常重新啟動
- [ ] `POST /api/services/9router/stop` 回傳 200，且 `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` 回傳 SSE 串流，其中包含帶有近期日誌行的 `snapshot` 事件
- [ ] 在 PATH 中沒有 `npm` 的環境中安裝時，回傳 500，並附上友善的錯誤訊息（不含堆疊追蹤）

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` 在 2 分鐘內回傳 200
- [ ] `POST /api/services/cliproxy/start` 在 30 秒內回傳 200，且 `state: "running"`
- [ ] `GET /api/services/cliproxy/status` 回報 `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` 回傳 200，且 `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` 回傳 SSE 串流

### 安全性迴歸測試

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` 回傳 `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` 回傳 `403 LOCAL_ONLY`
- [ ] `/api/services/*` 的錯誤回應不包含 `err.stack` 或絕對檔案路徑

## v3.8.0+ 檢查

在發布任何 v3.8.x 版本之前，請驗證以下附加項目：

- [ ] `omniroute --tray` 可在 macOS 上啟動（systray2 已安裝至 `~/.omniroute/runtime/`）
- [ ] `omniroute --tray` 可在 Linux 上啟動（需要 DISPLAY；若未設定，應顯示友善錯誤）
- [ ] `omniroute --tray` 可在 Windows 上啟動（PowerShell NotifyIcon，不需額外的二進位檔）
- [ ] `omniroute config tray enable` 會建立自動啟動項目；停用時會將其移除
- [ ] `npm install -g omniroute@<this-version>` 執行 postinstall 時不會以嚴重錯誤結束
- [ ] 更新流程會保留選用相依套件：`omniroute update --apply` 與自動更新程式
      會執行 `npm install -g … --include=optional`，使 `optionalDependencies`（better-sqlite3、
      keytar、tls-client，以及 llmlingua SLM 堆疊：`@atjsh/llmlingua-2@2.0.5`、
      `js-tiktoken`）在更新後仍然保留。ultra `modelPath` SLM 層級也需要
      tinybert 模型，首次使用時會自動下載至 `${DATA_DIR}/models/llmlingua`。接著，postinstall
      (`scripts/build/colocateOptionals.mjs`) 會將 SLM 選用相依套件閉包集中放置到
      `dist/node_modules`，讓 worker 只解析到單一 `@huggingface/transformers` ^4.2.0
      執行個體 — 獨立追蹤僅綑綁 transformers，不包含動態匯入的
      選用套件；若未如此處理，worker 會讓 llmlingua-2 搭配根目錄的 transformers 載入，
      而 SLM 層級將在無提示的情況下失效並採用開放式備援。
- [ ] `omniroute status` 在沒有 `.env` 時也能運作（CLI 權杖路徑，僅限迴送介面）
- [ ] `curl http://localhost:20128/api/shutdown` 回傳 401（永遠受保護的路由）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 回傳 401（迴送介面防護）
- [ ] SQLite 執行階段在首次執行時解析為 `bundled`（綑綁的二進位檔對該平台有效）
- [ ] 刪除 `node_modules/better-sqlite3` 時，SQLite 執行階段會退回使用 `runtime`
- [ ] Smart MCP 篩選器可壓縮真實的 `playwright-mcp browser_snapshot` 輸出（縮減 ≥50%）
- [ ] 所有 10 個 `skills/omniroute*/SKILL.md` 檔案皆可透過原始 GitHub URL 公開取得
- [ ] 全新設定時，初始設定精靈會顯示「運作方式」層級導覽步驟
- [ ] 首頁儀表板的層級涵蓋範圍小工具會顯示已設定／啟用的數量

---

## 3.9.0 LTS 切分（已於 3.8.58 演練）

v3.8.59 之後的下一個版本是 3.9.0，其頂端提交會成為兩個長期維護的分支：
`stable/v3`（v3 LTS 線，npm `latest`）與 `develop`（v4，提升至 4.0.0，npm
`nightly`）。分支／頻道模型、向前移植與標籤記載於
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md)；計畫記載於 [ROADMAP](../../ROADMAP.md)（第 3 階段）。此切分只執行一次；
3.8.58 會在分支版本庫上端到端演練，而 3.8.59 則以
[GO/NO-GO 檢查清單](./LTS_GO_NO_GO.md)結束。

### 試執行（唯讀，可隨時安全執行）

```bash
npm run release:dry-run-lts-cut                       # 實際切分：從 HEAD 建立 3.9.0，前一個標籤為 v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # 固定來源提交
```

`scripts/release/dry-run-lts-cut.mjs` 不會執行任何操作：它會讀取 git 與 `gh`，並輸出
完整流程——前置條件（來源可解析、來源版本庫擁有完整歷史記錄——
淺層複製無法推送 `stable/v3`，接收端會在第一個嫁接的父提交處拒絕該封包，
因此請從完整複製進行切分，或先執行 `git fetch --unshallow origin`——前一個
標籤存在、`package.json` 是目標版本、存在開啟中的 `release-freeze` 議題、現有
發行分支上沒有開啟中的 `Release branch not green` 議題
——不存在的分支會回報 `?` 未知，絕不會回報為綠燈——Mergify `release` 佇列已設定
（G11：`queue_rules`、`checks_timeout`、標籤 `queue`）、`release/*` 規則集仍會阻止
刪除與強制推送，且 `stable/v3` 與 `develop` 尚不存在）、兩個分支步驟、哪些休眠中的工作流程
觸發條件與 `if:` 條件會成立（以及哪些仍受版本庫變數限制，或固定至正式版本庫）、
預期的 dist-tags（`latest` → 3.9.0，`next` 與 `nightly` 為空）以及復原操作。結束碼
`0` = `RESULT: READY`、`1` = 阻斷性的前置條件失敗（`✗`）、`2` = 用法錯誤。
`--advisory <id,...>` 會將檢查降級為警告（`!`），而不會將其隱藏。

請在 3.9.0 發行凍結仍生效時執行實際切分的試執行——分支會在建立標籤後、
第 12c 階段解除凍結前建立。

### 3.8.58 演練（僅限分支版本庫）

```bash
# 1. 使用演練參數在目前頂端提交上進行試執行
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. 對分支版本庫遠端執行（會拒絕 origin 或 URL 為正式版本庫的任何遠端；
#    每個步驟都會在終端機要求確認）
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. 在分支版本庫中測試休眠中的工作流程（當試執行回報固定至正式版本庫時，
#    使用 workflow_dispatch），然後復原
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop 版本提升提交使用 git 底層命令建立（不會觸碰工作目錄），並會提升
與週期開啟提交相同的五個檔案：`package.json`、`open-sse/package.json`、
`electron/package.json`、`package-lock.json` 與 `docs/openapi.yaml`。之後會在
`develop` 上、其第一個 PR 之前，開啟 `[4.0.0]` CHANGELOG 區段及其 i18n 鏡像。
此指令碼絕不會變更 npm dist-tags——請使用暫存套件演練這些操作。

### PR 預覽成品（建置一次，推廣完全相同的位元組）

`.github/workflows/preview-artifact.yml` 會從 PR 頂端提交建置一個生產環境 tarball，
並驗證該完全相同的建置（#8084 子項目 (a)）。僅限同一版本庫的 PR；不會發布任何內容。

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # 或新增 `preview-artifact` 標籤
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # 安裝預覽版本
```

該執行會依序執行 `npm ci`、`npm run build:release`、`npm run check:pack-artifact`，
封裝 tarball、執行 `npm run check:pack-boot`（假密鑰、暫時性資料目錄）、重新封裝，
若摘要不完全相同則失敗；接著記錄 `artifact-identity.json`（頂端提交 SHA、基底
SHA、鎖定檔雜湊、平台、架構、node ABI、打包工具、建置政策——
`scripts/release/artifact-identity.mjs`），並在獨立工作中證明該 tarball。
推廣預覽版本代表安裝該 tarball：絕不可從原始碼重新建置。

### 切分（3.9.0，GO 之後）

1. GO 已記錄於 [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md)。
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` 會輸出 `RESULT: READY`。
3. 使用試執行輸出的命令，手動在 `origin` 上建立分支——該指令碼拒絕推送至
   `origin`。若要重複使用已審查的 develop 提交，請先針對您的分支版本庫，
   在 3.9.0 頂端提交上執行 `--execute` 演練；它會輸出兩個 SHA，之後即可推送
   相同的提交：

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 在第一個 PR 合併前，保護 `stable/v3` 與 `develop`（規則集 + 合併佇列）。
5. 休眠中的工作流程會依分支是否存在而啟用：`forward-port.yml`（推送至
   `stable/v3`）、`validate-stable-pr.yml`（以 `stable/v3` 為目標的 PR）以及 `nightly-v4-build.yml`
   （建置 `develop`）。正式啟用前，請設定 `secrets.FORWARD_PORT_TOKEN` 儲存庫密鑰（以便 CI 在
   forward-port PR 上執行）；在擁有者將儲存庫變數 `vars.NIGHTLY_PUBLISH`
   設為 `true`，且 npm 受信任發佈接受 `nightly-v4-build.yml` 之前，每夜發佈會維持停用狀態。
   通道解析由 `scripts/release/dist-tag.mjs` 負責，與 `npm-publish.yml` 使用的解析器相同。
6. 驗證通道：`npm view omniroute dist-tags --json` 會顯示 `latest` = 3.9.0，且在 v4 發佈前
   不會有 `next` / `nightly`。
7. 如有需要，請回復：`git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   以及 `npm dist-tag add omniroute@3.8.59 latest`。

---

## 回滾

如果發布版本出現嚴重問題：

1. `gh release edit vX.Y.Z --prerelease`（標記為非最新版本）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（僅限尚未被使用者採用時）
3. 或者：在 `release/vX.Y.0` 上進行緊急修復 → 發布修補版本 `vX.Y.(Z+1)`
4. 立即在 GitHub Discussions 和 Discord 中通知

## 強制規則

- 絕不直接提交至 `main`
- 絕不對 `main` 或 `release/*` 分支使用 `git push --force`
- 絕不略過 Husky hooks（`--no-verify`）
- 絕不提交機密資訊、憑證或 `.env` 檔案
- 覆蓋率必須維持在 ≥60/60/60/60（陳述式/程式碼行/函式/分支）
- 變更 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的正式環境程式碼時，務必新增或更新測試

## 自動同步檢查

建立 PR 前，請先在本機執行文件同步防護檢查：

```bash
npm run check:docs-sync
```

CI 也會在 `.github/workflows/ci.yml` 中執行此檢查（lint 工作）。
