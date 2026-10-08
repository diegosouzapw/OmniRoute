# Contributing to OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md)

---

感謝您有興趣貢獻！本指南涵蓋了您入門所需的一切。

如需正式的每次變更工作流程，請從
[貢獻黃金路徑](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) 開始。它將提供者、路由、
UI/UX、i18n、CLI、資料庫和建置/部署變更對應到其合約、重點測試、CI
覆蓋率以及協調步驟。

---

## 開發設定

### 先決條件

- **Node.js** `>=22.22.3 <23`，或 `>=24.0.0 <27`（建議：24 LTS）
- **npm** 10+

> **npm v11+ 使用者（Node 24+）：** 在 `npm install` 之後，請驗證原生模組是否已安裝：
> `node -e "require('better-sqlite3')"`。如果失敗並顯示 `MODULE_NOT_FOUND`，
> 請執行 `npm approve-scripts better-sqlite3 && npm install`。請參閱
> [疑難排解](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)。

- **Git**

### 複製與安裝

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### 環境變數

```bash
# 從範本建立您的 .env 檔案
cp .env.example .env

# 產生所需的密鑰
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

開發用的關鍵變數：

| 變數                   | 開發預設值               | 說明             |
| ---------------------- | ------------------------ | ---------------- |
| `PORT`                 | `20128`                  | 伺服器連接埠     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | 前端的基礎 URL   |
| `JWT_SECRET`           | （如上產生）             | JWT 簽章密鑰     |
| `INITIAL_PASSWORD`     | `CHANGEME`               | 首次登入密碼     |
| `APP_LOG_LEVEL`        | `info`                   | 日誌詳細程度層級 |

### 儀表板設定

儀表板提供可透過環境變數設定的功能切換開關：

| 設定位置    | 切換開關     | 說明                   |
| ----------- | ------------ | ---------------------- |
| 設定 → 進階 | 除錯模式     | 啟用除錯請求日誌（UI） |
| 設定 → 一般 | 側邊欄可見性 | 顯示/隱藏側邊欄區段    |

這些設定儲存在資料庫中，並在重新啟動後持續存在，設定後會覆蓋環境變數的預設值。

### 在本機執行

```bash
# 開發模式（熱重新載入）
npm run dev

# 生產建置
npm run build    # next build → .build/next/ 然後 assembleStandalone → dist/
npm run start

# 快速後端/僅 API 編譯，適用於貢獻者變更
npm run build:contributor

# 發行建置（全新重建 + HEAD 哨兵 — 部署所需）
npm run build:release   # rm -rf .build dist && build + 寫入 dist/BUILD_SHA

# 常見連接埠設定
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

貢獻者建置執行僅編譯的驗證：它不會組合獨立
發行版或建置選用的原生封裝資產。當您需要驗證可出貨的套件時，請使用一般的生產建置。

### 建置輸出佈局

| 目錄      | 內容                                                             | 追蹤 |
| --------- | ---------------------------------------------------------------- | ---- |
| `src/`    | 應用程式原始碼（TypeScript / TSX）                               | 是   |
| `.build/` | 中間產物 — `next build` 輸出（git忽略，`distDir = .build/next`） | 否   |
| `dist/`   | 可出貨套件 — 由 `assembleStandalone` 組合（git忽略）             | 否   |

建置管線是單次傳遞：

```
npm run build
  └─ next build → .build/next/standalone  (Next.js 輸出)
  └─ assembleStandalone()                 (複製 standalone + static + public + 原生資產)
       └─ 輸出： dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` 會額外先清理兩個目錄，並寫入
`dist/BUILD_SHA`（= `git rev-parse --short HEAD`）作為部署完整性哨兵。

`npm run build:contributor` 使用僅後端的建置設定檔。它會在建置時暫時存根
儀表板 UI 檔案，保留 API 路由處理常式，並在建置後還原原始檔案。
對於影響儀表板 UI 的變更或完整的發行驗證，請使用 `npm run build`；
貢獻者設定檔不能取代發行建置。

> **VPS 部署注意事項：** 遠端映像目錄 `/usr/lib/node_modules/omniroute/app/`
> 保持不變。部署技能會將 `dist/` 的內容 rsync 到其中。
> 只有儲存庫內的建置輸出路徑已移動（`app/` → `dist/`）。

預設 URL：

- **儀表板**：`http://localhost:20128/dashboard`
- **API**：`http://localhost:20128/v1`

---

## Git 工作流程

> ⚠️ **絕對不要直接提交到 `main`。** 請一律使用功能分支。
>
> **PR 基底：** 以作用中的 `release/vX.Y.Z` 分支為目標（不是 `main`）。請參閱
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) 以了解
> 每分支一版本 + 出貨時打標籤的模型。

```bash
# 從作用中的 release 分支頂端建立分支（範例：release/v3.8.49）
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... 進行變更 ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# 開啟 Pull Request，base = release/v3.8.49
```

### 分支命名

| Prefix      | Purpose          |
| ----------- | ---------------- |
| `feat/`     | 新功能           |
| `fix/`      | 錯誤修正         |
| `refactor/` | 程式碼重構       |
| `docs/`     | 文件變更         |
| `test/`     | 新增/修正測試    |
| `chore/`    | 工具、CI、相依性 |

### 提交訊息

請遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

範圍（v3.8）：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`。

---

## 執行測試

```bash
# 所有測試（單元 + vitest + ecosystem + e2e）
npm run test:all

# 單一測試檔案（Node.js 原生測試執行器 — 大多數測試使用這個）
node --import tsx/esm --test tests/unit/your-file.test.ts

# 只執行受你的變更影響的單元測試（與 CI 閘門相同的 TIA 選擇器，#8084）
npm run test:scoped            # 最後一次提交（或工作區）中的變更
npm run test:scoped:staged     # 僅限已暫存的變更 — 很適合搭配 pre-commit 執行
npm run test:scoped:full       # 先重建 import-graph 映射（在新增/移動檔案之後）
# 結束碼 1 +「run the full suite」表示中樞檔案（tsconfig、package.json、…）或
# 未對應的原始碼已變更 — 選擇器會安全地失敗，絕不會默默略過。

# Vitest（MCP 伺服器、autoCombo、快取）
npm run test:vitest

# E2E 測試（需要 Playwright）
npm run test:e2e

# 協定用戶端 E2E（MCP 傳輸、A2A）
npm run test:protocols:e2e

# 生態系統相容性測試
npm run test:ecosystem

# 覆蓋率閘門：60% 語句/行/函式/分支
npm run test:coverage
npm run coverage:report

# Lint + 格式檢查
npm run lint
npm run check

# 有閘門的真實上游 combo 煙霧測試（需要 VPS 存取 + 真實 provider 額度）
# 會實際呼叫真實 provider — 會有一點成本。絕不在 CI 中執行。沒有閘門時會乾淨地略過。
# 需要：ssh root@192.168.0.15 存取權（會從 VPS 取得唯讀 DB 快照）。
RUN_COMBO_LIVE=1 npm run test:combo:live

# 第 3 階段 VPS 即時煙霧測試 — 純 Node ESM 指令碼，直接呼叫線上的 .15 伺服器。
# 需要：ssh root@192.168.0.15 存取權（combo 會透過 SSH sqlite 建立/拆除）。
# 會實際呼叫真實 provider（小幅成本）。只會建立/刪除 __live_test__* combo。絕不在 CI 中執行。
# .15 上的 REQUIRE_API_KEY=false，因此不需要 API 金鑰，但若已設定，仍會採用 COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY。
npm run test:combo:live:vps              # 7 個 HTTP 情境（priority/round-robin/weighted/cost/fusion/auto + health）
npm run test:combo:live:vps:failover     # 新增真實的跨 provider 容錯移轉情境（共 8 個）
```

覆蓋率注意事項：

- `npm run test:coverage` 會測量主要單元測試套件的原始碼覆蓋率，排除 `tests/**`，並包含 `open-sse/**`
- Pull Request 必須讓覆蓋率閘門維持在 **60%+** 語句/行/函式/分支
- 如果 PR 變更了 `src/`、`open-sse/` 或 `bin/` 中的正式程式碼，就必須在同一個 PR 中新增或更新自動化測試
- `npm run coverage:report` 會列印最近一次覆蓋率執行的詳細逐檔報告
- `npm run test:coverage:legacy` 會保留舊指標，以供歷史比較
- 請參閱 `docs/ops/COVERAGE_PLAN.md` 以了解分階段的覆蓋率改善藍圖

### Pull Request 要求

在開啟 PR 之前，請使用
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) 針對
你所變更的內容執行聚焦循環。完整單元測試套件（4 個 CI 分片）、Vitest、**60%+** 覆蓋率閘門，以及
正式建置都是 CI 的責任 — 在本機執行它們不會帶來 PR
檢查不會提供的額外訊號，而且在較小的機器上可能會讓主機飽和（#8084）：

- 執行涵蓋你變更的測試檔案：`node --import tsx/esm --test tests/unit/<file>.test.ts`
- 執行 `npm run lint`
- 每當正式程式碼變更時，請在同一個 PR 中包含或更新自動化測試
- 當正式程式碼變更時，請在 PR 描述中包含變更或新增的測試檔案
- 當 CI 中已設定專案密鑰時，請檢查 PR 上的 SonarQube 結果

目前測試狀態：**122 個單元測試檔案**，涵蓋：

- Provider 轉譯器與格式轉換
- 速率限制、斷路器與韌性
- 語意快取、冪等性、進度追蹤
- 資料庫操作與結構描述（21 個 DB 模組）
- OAuth 流程與驗證
- API 端點驗證（Zod v4）
- MCP 伺服器工具與範圍強制執行
- Memory 與 Skills 系統

---

## 程式碼風格

- **ESLint** — 在提交前執行 `npm run lint`
- **Prettier** — 透過 `lint-staged` 在提交時自動格式化（2 個空格、分號、雙引號、100 字元寬度、es5 尾隨逗號）
- **TypeScript** — 所有 `src/` 程式碼使用 `.ts`/`.tsx`；`open-sse/` 使用 `.ts`/`.js`；使用 TSDoc（`@param`、`@returns`、`@throws`）撰寫文件
- **禁止 `eval()`** — ESLint 強制執行 `no-eval`、`no-implied-eval`、`no-new-func`
- **Zod 驗證** — 所有 API 輸入驗證皆使用 Zod v4 schema
- **命名**：檔案 = camelCase/kebab-case，元件 = PascalCase，常數 = UPPER_SNAKE

### 錯誤處理 / 空的 catch 區塊

絕不留下未說明的 `catch`。將其歸類為以下兩類之一（落實「絕不在 SSE 串流中默默吞掉錯誤」這條硬性規則）：

- **刻意為之（我們自己的盡力而為清理/遙測）** — 這裡的失敗是預期且無害的；加入一行理由註解，不記錄日誌（在每個請求上記錄日誌正是此慣例所要避免的雜訊）。

  ```ts
  } catch {} // 在客戶端斷線後關閉已關閉的控制器是預期行為
  ```

- **應記錄日誌（外部/呼叫方提供的程式碼，或吞掉錯誤會改變控制流程）** — 保留 catch（絕不讓它中斷串流），但發出帶有上下文的 `console.debug`/`warn`，以便發現失敗。

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

請參閱 `open-sse/utils/stream.ts` 與 `open-sse/utils/streamHandler.ts` 以取得應用範例。

---

## 專案結構

```
src/                        # TypeScript（.ts / .tsx）
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # 儀表板頁面（23 個區段）
│   ├── api/                # API 路由（51 個目錄）
│   └── login/              # 驗證頁面（.tsx）
├── domain/                 # 政策引擎（policyEngine、comboResolver、costRules 等）
├── lib/                    # 核心業務邏輯（.ts）
│   ├── a2a/                # Agent-to-Agent v0.3 協定伺服器
│   ├── acp/                # Agent Communication Protocol 註冊表
│   ├── compliance/         # 合規政策引擎
│   ├── db/                 # SQLite 領域模組 + 130 個遷移
│   ├── memory/             # 持久性對話記憶
│   ├── oauth/              # OAuth 提供者、服務與工具
│   ├── skills/             # 可擴展技能框架
│   ├── usage/              # 使用量追蹤與成本計算
│   └── localDb.ts          # 僅為重新匯出層 — 絕不在此加入邏輯
├── middleware/              # 請求中介軟體（promptInjectionGuard）
├── mitm/                   # MITM 代理（憑證、DNS、目標路由）
├── shared/
│   ├── components/         # React 元件（.tsx）
│   ├── constants/          # 提供者定義（329）、MCP 範圍、19 種路由策略
│   ├── utils/              # 斷路器、清理器、驗證輔助工具
│   └── validation/         # Zod v4 schema
└── sse/                    # SSE 代理管線

open-sse/                   # @omniroute/open-sse 工作區
├── executors/              # 89 個執行器實作模組
├── handlers/               # 11 個請求處理器（chat、responses、embeddings、images 等）
├── mcp-server/             # MCP 伺服器（110 個獨特工具、3 種傳輸、33 個範圍）
├── services/               # 178 個頂層服務（combo、autoCombo、rateLimitManager 等）
├── translator/             # 格式轉換器（OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama）
├── transformer/            # Responses API 轉換器
└── utils/                  # 22 個工具模組（stream、TLS、proxy、logging）


tests/
├── unit/                   # Node.js 測試執行器（1,574 個測試檔案）
├── integration/            # 整合測試
├── e2e/                    # Playwright 測試
├── security/               # 安全性測試
├── translator/             # 轉換器專用測試
└── load/                   # 負載測試

docs/
├── adr/                     # 架構決策記錄
├── architecture/            # 系統架構與韌性
├── comparison/              # OmniRoute 與替代方案
├── compression/             # 壓縮指南與規則
├── dev/                     # 開發指南
├── diagrams/                # 架構圖表
├── frameworks/              # MCP、A2A、OpenCode、Memory、Skills
├── guides/                  # 使用者指南、Docker、設定、疑難排解
├── i18n/                    # 國際化 README 翻譯
├── marketing/               # 行銷素材
├── ops/                     # 部署、代理、覆蓋率、發布
├── providers/               # 提供者專屬文件
├── reference/               # API 參考、環境變數、CLI 工具、免費方案
├── releases/                # 版本說明
├── routing/                 # 自動組合引擎、推理重播
├── screenshots/             # 儀表板螢幕截圖
├── security/                # 護欄、合規、隱匿、權杖
└── specs/                   # 設計規格
```

---

## 新增提供者

### 步驟 1：註冊提供者常數

新增至 `src/shared/constants/providers.ts` — 在模組載入時會進行 Zod 驗證。

### 步驟 2：新增執行器（如果需要自訂邏輯）

在 `open-sse/executors/your-provider.ts` 中建立執行器，擴展基礎執行器。

### 步驟 3：新增轉譯器（如果非 OpenAI 格式）

在 `open-sse/translator/` 中建立請求/回應轉譯器。

### 步驟 4：新增 OAuth 設定（如果是基於 OAuth）

在 `src/lib/oauth/constants/oauth.ts` 中新增 OAuth 認證資訊，並在 `src/lib/oauth/services/` 中新增服務。

如果上游提供者在其公開 CLI / 瀏覽器 bundle 中散佈公開的 OAuth client_id/secret 或 Firebase Web API key，**請勿**將其嵌入為字串常值。請使用來自 `open-sse/utils/publicCreds.ts` 的 `resolvePublicCred()`，並將遮蔽的位元組項目新增至 `EMBEDDED_DEFAULTS`。完整的強制性工作流程記錄在 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)。

在處理常式/執行器內部，傳遞至用戶端的錯誤訊息必須經過來自 `open-sse/utils/error.ts` 的 `buildErrorBody()` / `sanitizeErrorMessage()` — 絕不要在回應主體中放置原始的 `err.stack` 或 `err.message`。請參閱 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)。

### 步驟 5：註冊模型

在 `open-sse/config/providerRegistry.ts` 中新增模型定義。

### 步驟 6：新增測試

在 `tests/unit/` 中撰寫單元測試，至少涵蓋：

- 提供者註冊
- 請求/回應轉譯
- 錯誤處理

---

## Pull Request 檢查清單

- [ ] 測試通過（`npm test`）
- [ ] Lint 檢查通過（`npm run lint`）
- [ ] 建置成功（`npm run build`）
- [ ] 已為新的公開函式與介面新增 TypeScript 類型
- [ ] 沒有硬編碼的密鑰或備援值
- [ ] 公開的上游憑證透過 `resolvePublicCred()` 嵌入（請參閱 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)），絕不以字面值形式嵌入
- [ ] 錯誤回應透過 `buildErrorBody()` / `sanitizeErrorMessage()` 處理——回應主體中不得包含原始堆疊追蹤（請參閱 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)）
- [ ] Shell 命令（`exec` / `spawn`）透過 `env` 傳遞執行階段值，而非使用字串插值
- [ ] 所有輸入均使用 Zod schema 進行驗證
- [ ] 若有面向使用者的變更，已在 `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` 下新增變更日誌**片段**（請參閱 [`changelog.d/README.md`](./changelog.d/README.md)）——請**勿**直接編輯 `CHANGELOG.md`；片段會在發布時彙整，且各 PR 之間永遠不會發生衝突
- [ ] 已更新文件（如適用）
- [ ] 未新增任何 CodeQL / Secret-Scanning 警示，或每個警示均已附上引用相關 `docs/security/` 文件的技術理由並予以駁回
- [ ] 會產生子行程的路由（`/api/mcp/`、`/api/cli-tools/runtime/`）已在 `src/server/authz/routeGuard.ts` 中分類為 `isLocalOnlyPath()`——請參閱[硬性規則 #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] 提交訊息中不得包含 AI／機器人的 `Co-authored-by` 尾註（硬性規則 #16）——若重用了人類協作者的工作，應使用標準的 `Co-authored-by: Name <email>` 尾註予以署名

---

## 發布

版本發布作業是透過 `/generate-release` 工作流程管理。建立新的 GitHub Release 時，套件會透過 GitHub Actions **自動發布至 npm**。

針對 VPS 部署，請使用 `npm run build:release`（而非 `npm run build`）—它會執行乾淨的
重新建置、將套件組合檔組裝至 `dist/`，並寫入 `dist/BUILD_SHA` 標記檔。
接著使用 `/deploy-vps-*-cc` 技能，這些技能會將 `dist/` rsync 至遠端的 `app/` 目錄。

---

## 取得協助

- **架構**：請參閱 [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API 參考**：請參閱 [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **安全性文件**：[`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)、[`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)、[`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)、[`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **維運文件**：[`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **問題**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
