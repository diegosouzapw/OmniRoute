---
title: "發行檢查清單"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 發行檢查清單

> **最後更新：** 2026-06-28 — v3.8.40
> 精簡化發行流程，運用 Claude Code Skills 實現自動化。
>
> **在發行之間保持佇列／分支為綠色：** 請參閱 [RELEASE_GREEN.md](./RELEASE_GREEN.md)
>（`/green-prs` 系列指令 + `npm run check:release-green` + `/babysit` + 夜間排程）。定期執行此流程——
> 尤其是在執行本檢查清單**之前**——可讓發行 PR 一開始就處於綠色狀態。

## TL;DR

```bash
# 1. 更新版本號 + 產生 CHANGELOG（skill）
/version-bump-cc patch    # 或 minor / major

# 2. 在本機執行品質門檻檢查
npm run check              # lint + 測試
npm run test:coverage      # 完整覆蓋率門檻（60/60/60/60）

# 3. 建置與冒煙測試
npm run build
npm run test:e2e           # 選擇性但建議執行

# 4. 產生存放版（skill）
/generate-release-cc

# 5. 部署（skill）
/deploy-vps-both-cc        # 或 akamai-cc / local-cc

# 6. 擷取發行佐證（skill）
/capture-release-evidences-cc
```

## npm 階段式發布（自 v3.8.49 起預設 — WS1.3/D2）

npm 發布工作流程不再直接發布：它會啟動打包後的 tarball
（`check:pack-boot`），然後執行 `npm stage publish`——確切的位元組會暫存在
登錄檔中，在擁有者核准前**不可安裝**。人類 2FA 關卡移至
驗證**之後**，而非之前。

**工作流程轉為綠色後的擁有者流程：**

1. `npm stage list omniroute` — 找到 stage id（也會列印在工作流程摘要中）。
2. 驗證暫存位元組（建議執行）：`npm stage download <id>`，然後將下載的 tarball
   安裝到臨時字首目錄並啟動它（`npm run check:pack-boot` 會在 CI 中自動執行
   相同的 pack→install→boot 驗證流程）。
3. `npm stage approve <id>` — 2FA 提示即為發布操作。`npm stage reject <id>` 則會捨棄。
4. 發布後網路檢查：發布後驗證器（v3.8.49 方案的 WS1.4）會從公開登錄檔安裝
   已發布版本到一個乾淨的容器中並啟動它。

**緊急備援：** 使用 `workflow_dispatch` 搭配 `publish_mode=direct` 可恢復
傳統的立即 `npm publish`（僅在階段式發布本身出問題時使用；請記錄原因）。

**一次性強化措施（擁有者，npmjs.com）：**為 `omniroute` 設定僅限階段式發布的
Trusted Publisher，這樣即使長期權杖外洩，也無法從任何地方直接 `npm publish`——
CI 只能暫存；只有擁有者的 2FA 才能真正發布。

**成品損壞應對手冊（未變更）：** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
為預設反射動作（幾分鐘內完成，可逆轉）；`npm unpublish` 僅在 72 小時／無依賴套件
的時間窗口內使用，且絕不作為第一步。Docker：絕不重寫版本標籤——回滾是將
`latest` 重新指向最後一個正常的摘要。

## Hotfix 快速通道（標籤 `hotfix`）

標記為 `hotfix` 的 PR 會跳過繁重的 CI 矩陣（9 分片 E2E、覆蓋率棘輪、
品質門檻、品質延伸檢查），僅保留快速且高訊號的關卡：建置、
單元測試分片、整合測試、vitest、lint／型別檢查、docs-sync、`check:pack-artifact`
以及 tarball 啟動冒煙測試（`check:pack-boot`）。目標：在 ≤15 分鐘內變為綠色，而非 ~33 分鐘。

**進入條件——必須全部符合（以 Chromium／VS Code／Node 緊急通道為藍本）：**

1. **嚴重性**：正式環境已中斷——已發布的成品啟動時崩潰／安全性修正／該版本的所有使用者都受影響。「重要」不等於「已中斷」。
2. **授權**：只有倉儲擁有者可以套用 `hotfix` 標籤。此標籤即為核准——專案 PR 不得自行使用。
3. **佐證**：PR 主體需連結先前完整通過的繁重執行結果（被跳過的工作本來會重新驗證的套件），以及修正本身從失敗到通過的測試記錄。
4. **範圍**：僅限 cherry-pick——最小修正，不得重構，不得夾帶其他變更。

被跳過的覆蓋率／棘輪檢查範圍將由發行分支上的下一個完整執行重新驗證（持續 release-green）——快速通道是跳過**等待**，而非跳過**驗證**。
僅限測試的 diff（所有檔案都在 `tests/` 下，且不在 `tests/e2e/` 下）會自動跳過 E2E
矩陣，無需任何標籤。

## 詳細檢查清單

### 發行前

- [ ] 所有目標為此版本的 PR 都已合併到 `release/vX.Y.0`
- [ ] 所有與此版本相關的 Linear／問題項目都已關閉或推遲至下個里程碑
- [ ] CI 在 `release/vX.Y.0` 分支上為綠色
- [ ] 程式碼中沒有 `TODO(release)` 標記：`grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 基礎映像為最新版本（目前為 `node:24.15.0-trixie-slim`）

### 版本號與變更日誌

- [ ] 執行 `/version-bump-cc <patch|minor|major>`（Claude Code skill）
  - 更新 `package.json`、`electron/package.json`
  - 從上次標籤以來的 git 提交重新產生 `CHANGELOG.md`
  - 更新 README.md 徽章
- [ ] 手動檢視 CHANGELOG.md，必要時清理提交訊息
- [ ] 確認 `CHANGELOG.md` 中最新的 semver 區段與 `package.json` 版本一致
- [ ] 保留 `## [Unreleased]` 作為變更日誌的第一個區段，供後續工作使用
- [ ] 更新 `docs/openapi.yaml` → `info.version` 必須等於 `package.json` 版本

### 程式碼品質

- [ ] `npm run lint` — 0 個錯誤（警告為預先存在的）
- [ ] `npm run typecheck:core` — 乾淨通過
- [ ] `npm run typecheck:noimplicit:core` — 乾淨通過（嚴格模式）
- [ ] `npm run check:cycles` — 沒有循環依賴
- [ ] `npm run check:any-budget:t11` — 在預算內
- [ ] `npm run check:route-validation:t06` — 乾淨通過
- [ ] `npm run check:node-runtime` — 符合支援的執行時期最低版本（`>=22.22.2 <23`、`>=24.0.0 <27`，詳見 `src/shared/utils/nodeRuntimeSupport.ts` 中的 `SUPPORTED_NODE_RANGE`；需與 `package.json` 的 `engines` 一致）

### 測試

- [ ] `npm run test:unit` — 通過
- [ ] `npm run test:vitest` — 通過（MCP 伺服器、autoCombo、快取）
- [ ] `npm run test:coverage` — 門檻 60/60/60/60 已達成（statements／lines／functions／branches）
- [ ] `npm run test:integration` — 通過（若變更涉及 DB／處理器）
- [ ] `npm run test:combo:matrix` — 通過（combo 策略矩陣：證明所有 17 種路由策略的選擇決策是確定性的；在更動 combo 路由、策略解析或備援邏輯時執行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **選擇性／手動**（受閘控的真實上游冒煙測試；從 VPS `root@192.168.0.15` 讀取唯讀 DB 快照；會命中真實提供者，消耗額度；不在 CI 中執行；若無閘控變數則乾淨跳過）
- [ ] `npm run test:combo:live:vps` — **選擇性／手動**（Phase-3 VPS 即時冒煙測試：透過純 Node ESM 對 `.15` 伺服器執行 7 個 HTTP 情境；需要 `ssh root@192.168.0.15`；只會建立／刪除 `__live_test__*` 類型的 combo；會命中真實提供者；不在 CI 中執行）
- [ ] `npm run test:e2e` — 通過（UI 變更）
- [ ] `npm run test:protocols:e2e` — 通過（MCP／A2A 變更）
- [ ] `npm run test:ecosystem` — 通過

### Hooks（Husky 驗證）

Husky hooks 位於 `.husky/` 目錄，會在 git 操作時自動執行。

- **pre-commit：** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push：** 快速確定性關卡 — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`（於 2026-06-13 啟用）。故意排除 `test:unit`（速度慢；由 CI 的 `test-unit` 工作負責）。
  - 在推送發行分支前，請手動執行 `npm run test:unit`。

若 hook 失敗：請修正根本問題，不要使用 `--no-verify` 繞過。

### Conventional Commits

所有與發行相關的提交都必須遵循 `type(scope): subject` 格式。

**有效類型：** `feat`、`fix`、`refactor`、`docs`、`test`、`chore`、`perf`、`style`、`ci`

**有效範圍：** `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`

重大變更：在結尾加上 `BREAKING CHANGE:` 或在範圍後加上 `!`（例如 `feat(api)!: drop /v0`）。

### 文件

- [ ] `npm run check:docs-sync` 通過（pre-commit 會自動執行）
- [ ] `npm run check:docs-all` 通過（總括：docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links）
- [ ] `npm run check:env-doc-sync` 退出碼為 0——程式碼 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 的環境變數合約完整無缺
- [ ] `npm run check:doc-links` 退出碼為 0——重構後沒有損毀的內部 markdown 參照
- [ ] 已檢視 `docs/architecture/ARCHITECTURE.md`，確認無儲存／執行時期偏差
- [ ] 已檢視 `docs/guides/TROUBLESHOOTING.md`，確認無環境變數與操作偏差
- [ ] 若 `.env.example` 有變更：已更新 `docs/reference/ENVIRONMENT.md`
- [ ] 若新功能有 UI：`docs/guides/USER_GUIDE.md` 中有提及
- [ ] 若新功能有 API：已更新 `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] 若新功能為模組：存在專屬的 `docs/<MODULE>.md`
- [ ] 若有重大變更：`docs/guides/TROUBLESHOOTING.md` 中有遷移說明

### i18n

- [ ] `npm run i18n:check` 退出碼為 0——翻譯狀態（`.i18n-state.json`）與來源文件同步（嚴格模式下無偏差來源；警告模式對最後一刻的文件修飾可接受，但應在打標籤前歸零）
- [ ] `npm run i18n:check-ui-coverage` 退出碼為 0——每個 UI 語系都達到或超過 80% 的覆蓋率門檻
- [ ] `npm run i18n:sync-ui:dry` 回報 0 個缺失鍵，遍及全部 42 個語系
- [ ] 若英文來源文件有變更，請在打標籤前執行 `npm run i18n:run`（需要在 `.env` 中有 `OMNIROUTE_TRANSLATION_API_KEY`）
- [ ] 若翻譯貢獻不大，可延遲至下一版本（在 CHANGELOG 中追蹤）

### 資料庫遷移

- [ ] 若 `src/lib/db/migrations/` 中有新檔案：
  - [ ] 每個遷移都是等冪的（`CREATE TABLE IF NOT EXISTS` 等）
  - [ ] 遷移包含在交易中
  - [ ] 編號正確（序列中無間隙）
- [ ] 在全新安裝上測試：刪除 `~/.omniroute/omniroute.db` 並執行 `npm run dev`
- [ ] 在既有安裝上測試：備份資料庫、執行遷移、驗證結構
- [ ] 若遷移會改寫表格，需正確處理 WAL 檔案（`-wal`、`-shm`）

### 提供者目錄（Zod 驗證）

- [ ] `src/shared/constants/providers.ts` 的 Zod 結構在載入時有效
  - [ ] 所有提供者都有必要欄位（`id`、`label`、`kind` 等）
  - [ ] 新的免費提供者已提供 `freeNote`
  - [ ] OAuth 提供者已在 `src/lib/oauth/constants/oauth.ts` 中註冊 `oauthConfig`
- [ ] 若新增提供者：`open-sse/executors/` 中有對應的執行器
- [ ] 若非 OpenAI 格式：`open-sse/translator/` 中有轉譯器
- [ ] 模型已在 `open-sse/config/providerRegistry.ts` 中註冊
- [ ] `tests/unit/` 中的單元測試涵蓋提供者分類與路由

### 桌面版（Electron）

若 `electron/` 有變更：

- [ ] `npm run electron:smoke:packaged` 通過
- [ ] 至少在 `:win`、`:mac`、`:linux` 其中之一測試過建置
- [ ] 程式碼簽署憑證未過期（若有簽署）
- [ ] `electron/package.json` 版本與根目錄 `package.json` 一致
- [ ] 若發布至 `stable` 頻道，已更新自動更新頻道指標

### 建置目錄結構

倉儲使用三個不同的輸出目錄——切勿混淆：

| 目錄       | 用途                                                | 是否追蹤？    |
| --------- | --------------------------------------------------- | ------------- |
| `src/`    | 應用程式原始碼（TypeScript／TSX）                    | 是            |
| `.build/` | 建置中間產物 — `next build` 輸出（`distDir`）        | 否（gitignored）|
| `dist/`   | 可發行的 npm 套件 — 由 `assembleStandalone` 組合而成 | 否（gitignored）|

> **操作注意：** 遠端 VPS 映像目錄仍為 `/usr/lib/node_modules/omniroute/app/`。
> 只有**倉儲內**的建置輸出目錄變更了（`app/` → `dist/`）。部署 skills 會將
> `dist/` 內容 rsync 到遠端的 `app/` 目錄——無需變更 VPS 路徑。

**單一建置流程：**

```
npm run build:release
  └─ rm -rf .build dist          （清理）
  └─ next build → .build/next/   （中間產物）
  └─ assembleStandalone          （複製 standalone + static + public + natives → dist/）
  └─ 寫入 dist/BUILD_SHA         （HEAD 標記）
```

請勿為了部署而先執行 `npm run build` 再執行 `npm run build:cli`——
請使用 `npm run build:release`，它會在單一命令中完成乾淨重建 + 標記。

### 成品驗證

- [ ] `npm run build:release` 成功且 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` 乾淨通過——無 `app.__qa_backup`、`scripts/scratch`、`package-lock.json` 或其他本地殘留檔案
- [ ] 建置後存在 `dist/server.js`

### 標籤與發行

- [ ] 執行 `/generate-release-cc`（Claude Code skill）：
  - 建立標籤 `vX.Y.Z`
  - 推送標籤與分支
  - 以變更日誌內容開啟 GitHub Release
  - 附加 Electron 安裝程式（若有建置）
- [ ] 或手動操作：
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 部署

部署 skills 使用輕量 rsync 流程——無需 `npm pack`，無需 `npm i -g`：

- [ ] 使用符合目標的部署 skill：
  - `/deploy-vps-local-cc` — 本地 VPS（192.168.0.15）
  - `/deploy-vps-akamai-cc` — Akamai VPS（69.164.221.35）
  - `/deploy-vps-both-cc` — 兩者同時
- [ ] 部署前，確認 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] 建置必須在 `node_modules` 是真實目錄的環境中執行（主檢出目錄或已執行 `npm ci` 的工作目錄——**不是符號連結的工作目錄**）
- [ ] 冒煙測試已部署的實例：
  - 開啟 `/dashboard/health` → 檢查版本字串與發行版本一致
  - 對已知提供者發送 `/v1/chat/completions` 請求
  - 確認 `/api/monitoring/health` 回傳 `CLOSED` 的斷路器狀態
  - 確認 MCP 傳輸協定正常回應（`/mcp` HTTP、`/mcp-sse` SSE）

### 發行後

- [ ] 執行 `/capture-release-evidences-cc`（Claude Code skill）
  - 擷取新功能的 WebP 螢幕截圖／錄影
  - 附加到版本說明／部落格文章
- [ ] 在 GitHub Discussions／Discord 上發布發行公告
- [ ] 開啟下一版本的里程碑
- [ ] 若為重大更新：置頂討論或在 `news.json` 中新增應用程式內橫幅

## 內嵌服務冒煙測試（v3.8.4+）

在發布任何包含內嵌服務變更的版本前，請確認：

### 全新資料庫啟動（可發現遷移衝突——於 v3.8.4 hotfix 後新增）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 等待 10 秒啟動
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` 回傳 `"9router"`（不是 404，不是 500）。確認遷移 `071_services.sql` 已套用且已寫入種子資料列。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 回傳 3 列。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 回傳 2 列（驗證 `070_webhooks_kind_metadata.sql` 已套用）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` 通過——防止未來的衝突。

### 9Router

- [ ] `POST /api/services/9router/install` 在 2 分鐘內回傳 200 並包含 `installedVersion`
- [ ] `POST /api/services/9router/start` 在 30 秒內回傳 200 且 `state: "running"`
- [ ] `GET /api/services/9router/status` 回報 `health: "healthy"`
- [ ] `POST /v1/chat/completions` 搭配 `"model": "9router/auto/..."` 回傳 200（端到端透過 9Router 路由）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` 在代理程式內渲染 9Router 原生 UI（非直接 `127.0.0.1:port` iframe）
- [ ] `POST /api/services/9router/rotate-key` 回傳 `{ keyRotated: true }` 且服務正常重啟
- [ ] `POST /api/services/9router/stop` 回傳 200 且 `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` 回傳 SSE 串流，包含 `snapshot` 事件與最近的行
- [ ] 在 PATH 中沒有 `npm` 的環境中安裝，回傳 500 並顯示友善（非堆疊追蹤）的錯誤訊息

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` 在 2 分鐘內回傳 200
- [ ] `POST /api/services/cliproxy/start` 在 30 秒內回傳 200 且 `state: "running"`
- [ ] `GET /api/services/cliproxy/status` 回報 `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` 回傳 200 且 `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` 回傳 SSE 串流

### 安全性迴歸測試

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` 回傳 `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` 回傳 `403 LOCAL_ONLY`
- [ ] `/api/services/*` 的錯誤回應不包含 `err.stack` 或絕對路徑

## v3.8.0+ 檢查項目

在發布任何 v3.8.x 版本前，請確認以下額外項目：

- [ ] `omniroute --tray` 在 macOS 上啟動（systray2 已安裝到 `~/.omniroute/runtime/`）
- [ ] `omniroute --tray` 在 Linux 上啟動（需要 DISPLAY；若未設定則優雅報錯）
- [ ] `omniroute --tray` 在 Windows 上啟動（PowerShell NotifyIcon，無需額外二進位檔）
- [ ] `omniroute config tray enable` 建立開機自啟項目；disable 則移除
- [ ] `npm install -g omniroute@<此版本>` 執行 postinstall 而不會致命退出
- [ ] 更新路徑保留選擇性依賴：`omniroute update --apply` 和自動更新器
      執行 `npm install -g … --include=optional`，因此 `optionalDependencies`（better-sqlite3、
      keytar、tls-client，以及 llmlingua SLM 堆疊：`@atjsh/llmlingua-2`、
      `@huggingface/transformers@3.5.2`、`@tensorflow/tfjs`、`js-tiktoken`）在更新後仍會保留。
      `@huggingface/transformers` 維持選擇性，因此其 `onnxruntime-node` CUDA 提供者的 postinstall
      不會在 CUDA 11 主機上中斷安裝。Ultra `modelPath` SLM 層還需要
      tinybert 模型，會在首次使用時自動下載到 `${DATA_DIR}/models/llmlingua`。Postinstall
      （`scripts/build/colocateOptionals.mjs`）接著將 SLM 選擇性閉包複製到
      `dist/node_modules`，使工作者解析到**單一** `@huggingface/transformers` 3.5.2
      選擇性實例——獨立追蹤僅捆綁 transformers，而非動態匯入的
      選擇性套件，因此若無此步驟，工作者會載入 llmlingua-2 並使用根目錄的 transformers，
      導致 SLM 層靜默地失敗但仍保持運作。
- [ ] `omniroute status` 在無 `.env` 的情況下正常運作（僅限 CLI 權杖路徑，迴環介面）
- [ ] `curl http://localhost:20128/api/shutdown` 回傳 401（始終受保護的路由）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 回傳 401（迴環保護）
- [ ] SQLite 執行時期在首次執行時解析為 `bundled`（捆綁的二進位檔對平台有效）
- [ ] 當 `node_modules/better-sqlite3` 被刪除時，SQLite 執行時期備援至 `runtime`
- [ ] Smart MCP 過濾器壓縮真實的 `playwright-mcp browser_snapshot` 輸出（≥50% 縮減）
- [ ] 所有 10 個 `skills/omniroute*/SKILL.md` 檔案均可透過原始 GitHub URL 公開獲取
- [ ] 入門精靈在新安裝時顯示「運作方式」分層導覽步驟
- [ ] 首頁儀表板的分層覆蓋率小工具顯示已設定／啟用中的計數

---

## 回滾

若發行版本有重大問題：

1. `gh release edit vX.Y.Z --prerelease`（標記為非最新）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（僅在使用者尚未採用時）
3. 或者：在 `release/vX.Y.0` 上進行 hotfix → 修補版本 `vX.Y.(Z+1)`
4. 立即在 GitHub Discussions 和 Discord 中溝通

## 嚴格規則

- 絕不直接提交到 `main`
- 絕不對 `main` 或 `release/*` 分支使用 `git push --force`
- 絕不跳過 Husky hooks（`--no-verify`）
- 絕不提交機密、憑證或 `.env` 檔案
- 覆蓋率必須維持 ≥60/60/60/60（statements／lines／functions／branches）
- 在變更 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的正式程式碼時，務必包含或更新測試

## 自動化同步檢查

在開啟 PR 前在本機執行文件同步檢查：

```bash
npm run check:docs-sync
```

CI 也會在 `.github/workflows/ci.yml`（lint 工作）中執行此檢查。
