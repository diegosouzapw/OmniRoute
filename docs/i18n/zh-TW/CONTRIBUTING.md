# 貢獻 OmniRoute (中文 (繁體))

🌐 **語言:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md)

感謝您有興趣貢獻！本指南包含您入門所需的一切。

---

## 開發環境設定

### 前置需求

- **Node.js** `>=22.22.3 <23`，或 `>=24.0.0 <27`（建議：24 LTS）
- **npm** 10+
- **Git**

### 複製與安裝

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### 環境變數

```bash
# 從範本建立您的 .env
cp .env.example .env

# 產生所需的密鑰
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

開發用的關鍵變數：

| 變數                   | 開發環境預設值          | 說明               |
| ---------------------- | ----------------------- | ------------------ |
| `PORT`                 | `20128`                 | 伺服器埠號         |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | 前端的基礎 URL     |
| `JWT_SECRET`           | （上方產生）             | JWT 簽章密鑰       |
| `INITIAL_PASSWORD`     | `CHANGEME`              | 首次登入密碼       |
| `APP_LOG_LEVEL`        | `info`                  | 日誌詳細程度       |

### 儀表板設定

儀表板提供 UI 開關，可設定也能透過環境變數配置的功能：

| 設定位置           | 開關           | 說明                         |
| ------------------ | -------------- | ---------------------------- |
| 設定 → 進階        | 除錯模式       | 啟用除錯請求日誌（UI）       |
| 設定 → 一般        | 側邊欄可見性   | 顯示/隱藏側邊欄區塊          |

這些設定儲存在資料庫中，重新啟動後仍會保留，設定後會覆蓋環境變數的預設值。

### 在本機執行

```bash
# 開發模式（熱載入）
npm run dev

# 生產建置
npm run build    # next build → .build/next/ 然後 assembleStandalone → dist/
npm run start

# 發布建置（清除重建 + HEAD 哨兵 — 部署必用）
npm run build:release   # rm -rf .build dist && 建置 + 寫入 dist/BUILD_SHA

# 常見埠號配置
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

### 建置輸出結構

| 目錄       | 內容                                               | 版本追蹤 |
| ---------- | -------------------------------------------------- | -------- |
| `src/`     | 應用程式原始碼（TypeScript / TSX）                  | 是       |
| `.build/`  | 中間產物 — `next build` 輸出（gitignored，`distDir = .build/next`） | 否 |
| `dist/`    | 可發佈套件 — 由 `assembleStandalone` 組裝（gitignored） | 否 |

建置管線為單次傳遞：

```
npm run build
  └─ next build → .build/next/standalone  （Next.js 輸出）
  └─ assembleStandalone()                 （複製 standalone + static + public + 原生資源）
       └─ 輸出: dist/                     （server.js, .next/static/, public/, node_modules/）
```

`npm run build:release` 會額外先清除兩個目錄，然後寫入 `dist/BUILD_SHA`（= `git rev-parse --short HEAD`）作為部署完整性哨兵。

> **VPS 部署注意：** 遠端映像檔目錄 `/usr/lib/node_modules/omniroute/app/` 維持不變。部署技能會將 `dist/` 的內容 rsync 到其中。只有儲存庫內的建置輸出路徑改變了（`app/` → `dist/`）。

預設 URL：

- **儀表板**：`http://localhost:20128/dashboard`
- **API**：`http://localhost:20128/v1`

---

## Git 工作流程

> ⚠️ **絕對不要直接提交到 `main`。** 一律使用功能分支。

```bash
git checkout -b feat/your-feature-name
# ... 進行修改 ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# 在 GitHub 上開啟 Pull Request
```

### 分支命名

| 前綴         | 用途                   |
| ------------ | ---------------------- |
| `feat/`      | 新功能                 |
| `fix/`       | 錯誤修正               |
| `refactor/`  | 程式碼重構             |
| `docs/`      | 文件變更               |
| `test/`      | 測試新增/修正           |
| `chore/`     | 工具、CI、依賴項目      |

### 提交訊息

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

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
# 所有測試（單元 + vitest + 生態系 + e2e）
npm run test:all

# 單一測試檔案（Node.js 原生測試執行器 — 大部分測試使用此方式）
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest（MCP 伺服器、autoCombo、快取）
npm run test:vitest

# E2E 測試（需要 Playwright）
npm run test:e2e

# 協定客戶端 E2E（MCP 傳輸、A2A）
npm run test:protocols:e2e

# 生態系相容性測試
npm run test:ecosystem

# 覆蓋率閘道：60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint + 格式檢查
npm run lint
npm run check

# 實際上游 combo 冒煙測試（需要 VPS 存取 + 實際提供商額度）
# 會打到真實提供商 — 會花一點錢。絕對不會在 CI 中執行。沒有閘道時會乾淨地跳過。
# 需要：ssh root@192.168.0.15 存取（從 VPS 讀取唯讀資料庫快照）。
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS 實戰冒煙測試 — 純 Node ESM 腳本，直接打到 .15 伺服器。
# 需要：ssh root@192.168.0.15 存取（combo 透過 SSH sqlite 建立/刪除）。
# 會打到真實提供商（少量費用）。只會建立/刪除 __live_test__* combo。絕對不會在 CI 中執行。
# REQUIRE_API_KEY=false on .15 所以不需要 API 金鑰，但如果設定了 COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY 則會遵循。
npm run test:combo:live:vps              # 7 個 HTTP 情境（priority/round-robin/weighted/cost/fusion/auto + health）
npm run test:combo:live:vps:failover     # 增加實際跨提供商容錯情境（共 8 個）
```

覆蓋率注意事項：

- `npm run test:coverage` 測量主要單元測試套件的原始碼覆蓋率，排除 `tests/**`，包含 `open-sse/**`
- Pull Request 必須維持覆蓋率閘道在 **60%+** statements/lines/functions/branches
- 如果 PR 變更了 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生產程式碼，必須在同一 PR 中新增或更新自動化測試
- `npm run coverage:report` 會列印最近一次覆蓋率執行的詳細逐檔案報告
- `npm run test:coverage:legacy` 保留舊版指標以供歷史比較
- 請參閱 `docs/ops/COVERAGE_PLAN.md` 了解階段性覆蓋率改善藍圖

### Pull Request 需求

在開啟或合併 PR 之前：

- 執行 `npm run test:unit`
- 執行 `npm run test:coverage`
- 確保覆蓋率閘道維持在 **60%+** statements/lines/functions/branches
- 當生產程式碼變更時，在 PR 說明中包含已變更或新增的測試檔案
- 當 CI 中配置了專案密鑰時，檢查 PR 上的 SonarQube 結果

目前測試狀態：**122 個單元測試檔案** 涵蓋：

- 提供商轉換器與格式轉換
- 速率限制、斷路器與彈性
- 語意快取、冪等性、進度追蹤
- 資料庫操作與結構（21 個 DB 模組）
- OAuth 流程與認證
- API 端點驗證（Zod v4）
- MCP 伺服器工具與範圍強制
- 記憶體與技能系統

---

## 程式碼風格

- **ESLint** — 提交前執行 `npm run lint`
- **Prettier** — 透過 `lint-staged` 在提交時自動格式化（2 空格、分號、雙引號、100 字元寬度、es5 尾逗號）
- **TypeScript** — 所有 `src/` 程式碼使用 `.ts`/`.tsx`；`open-sse/` 使用 `.ts`/`.js`；使用 TSDoc 撰寫文件（`@param`、`@returns`、`@throws`）
- **不使用 `eval()`** — ESLint 強制禁止 `no-eval`、`no-implied-eval`、`no-new-func`
- **Zod 驗證** — 所有 API 輸入驗證使用 Zod v4 結構
- **命名**：檔案 = camelCase/kebab-case，元件 = PascalCase，常數 = UPPER_SNAKE

---

## 專案結構

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # 儀表板頁面（23 個區塊）
│   ├── api/                # API 路由（51 個目錄）
│   └── login/              # 認證頁面 (.tsx)
├── domain/                 # 政策引擎（policyEngine、comboResolver、costRules 等）
├── lib/                    # 核心業務邏輯 (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 協定伺服器
│   ├── acp/                # Agent 通訊協定註冊表
│   ├── compliance/         # 合規政策引擎
│   ├── db/                 # SQLite 資料庫層（21 個模組 + 16 個遷移）
│   ├── memory/             # 持久對話記憶
│   ├── oauth/              # OAuth 提供商、服務與工具
│   ├── skills/             # 可擴展技能框架
│   ├── usage/              # 用量追蹤與成本計算
│   └── localDb.ts          # 僅作為重新匯出層 — 永遠不要在此新增邏輯
├── middleware/              # 請求中介層（promptInjectionGuard）
├── mitm/                   # MITM 代理（憑證、DNS、目標路由）
├── shared/
│   ├── components/         # React 元件 (.tsx)
│   ├── constants/          # 提供商定義（177）、MCP 範圍、14 種路由策略
│   ├── utils/              # 斷路器、清理工具、認證輔助
│   └── validation/         # Zod v4 結構
└── sse/                    # SSE 代理管線

open-sse/                   # @omniroute/open-sse 工作區
├── executors/              # 14 個提供商專用請求執行器
├── handlers/               # 11 個請求處理器（聊天、回應、嵌入、圖片等）
├── mcp-server/             # MCP 伺服器（25 個工具、3 種傳輸、10 個範圍）
├── services/               # 36+ 服務（combo、autoCombo、rateLimitManager 等）
├── translator/             # 格式轉換器（OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama）
├── transformer/            # Responses API 轉換器
└── utils/                  # 22 個工具模組（串流、TLS、代理、日誌）

electron/                   # Electron 桌面應用程式（跨平台）

tests/
├── unit/                   # Node.js 測試執行器（1,574 個測試檔案）
├── integration/            # 整合測試
├── e2e/                    # Playwright 測試
├── security/               # 安全性測試
├── translator/             # 轉換器專用測試
└── load/                   # 負載測試

docs/
├── adr/                     # 架構決策記錄
├── architecture/            # 系統架構與彈性
├── comparison/              # OmniRoute 與替代方案比較
├── compression/             # 壓縮指南與規則
├── dev/                     # 開發指南
├── diagrams/                # 架構圖
├── frameworks/              # MCP、A2A、OpenCode、記憶體、技能
├── guides/                  # 使用者指南、Docker、設定、疑難排解
├── i18n/                    # 國際化 README 翻譯
├── marketing/               # 行銷素材
├── ops/                     # 部署、代理、覆蓋率、發布
├── providers/               # 提供商專用文件
├── reference/               # API 參考、環境變數、CLI 工具、免費方案
├── releases/                # 版本說明
├── routing/                 # Auto-combo 引擎、推理重播
├── screenshots/             # 儀表板截圖
├── security/                # 護欄、合規、隱蔽、代幣
└── specs/                   # 設計規格
```

---

## 新增提供商

### 步驟 1：註冊提供商常數

新增至 `src/shared/constants/providers.ts` — 在模組載入時以 Zod 驗證。

### 步驟 2：新增執行器（如果需要自訂邏輯）

在 `open-sse/executors/your-provider.ts` 中建立執行器，擴展基礎執行器。

### 步驟 3：新增轉換器（若非 OpenAI 格式）

在 `open-sse/translator/` 中建立請求/回應轉換器。

### 步驟 4：新增 OAuth 設定（若基於 OAuth）

在 `src/lib/oauth/constants/oauth.ts` 中新增 OAuth 憑證，並在 `src/lib/oauth/services/` 中新增服務。

如果上游提供商在其公開 CLI / 瀏覽器套件中分發了公開的 OAuth client_id/secret 或 Firebase Web API 金鑰，**請勿**將其嵌入為字串字面值。請使用 `open-sse/utils/publicCreds.ts` 中的 `resolvePublicCred()`，並在 `EMBEDDED_DEFAULTS` 中新增一個遮罩位元組條目。完整的強制性工作流程記錄於 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)。

在處理器/執行器內部，傳送到客戶端的錯誤訊息必須通過 `open-sse/utils/error.ts` 的 `buildErrorBody()` / `sanitizeErrorMessage()` — 絕對不要將原始 `err.stack` 或 `err.message` 放入回應主體。請參閱 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)。

### 步驟 5：註冊模型

在 `open-sse/config/providerRegistry.ts` 中新增模型定義。

### 步驟 6：新增測試

在 `tests/unit/` 中撰寫單元測試，至少涵蓋：

- 提供商註冊
- 請求/回應轉換
- 錯誤處理

---

## Pull Request 檢查清單

- [ ] 測試通過（`npm test`）
- [ ] Linting 通過（`npm run lint`）
- [ ] 建置成功（`npm run build`）
- [ ] 為新的公開函數和介面新增 TypeScript 型別
- [ ] 無硬編碼密鑰或後備值
- [ ] 公開上游憑證透過 `resolvePublicCred()` 嵌入（參見 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)），而非以字面值嵌入
- [ ] 錯誤回應通過 `buildErrorBody()` / `sanitizeErrorMessage()` 路由 — 回應主體中無原始堆疊追蹤（參見 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)）
- [ ] Shell 命令（`exec` / `spawn`）透過 `env` 傳遞執行時期值，而非透過字串插值
- [ ] 所有輸入以 Zod 結構驗證
- [ ] 針對使用者可見的變更，在 `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` 下新增 **Changelog 片段**（參見 [`changelog.d/README.md`](./changelog.d/README.md)）— 請**勿**直接編輯 `CHANGELOG.md`；片段會在發布時彙總，且絕不會在 PR 之間衝突
- [ ] 文件已更新（如適用）
- [ ] 無新增的 CodeQL / 密碼掃描警報，或每個警報已附上技術理由並參考相關 `docs/security/` 文件
- [ ] 啟動子處理程序的路由（`/api/mcp/`、`/api/cli-tools/runtime/`）在 `src/server/authz/routeGuard.ts` 中分類為 `isLocalOnlyPath()` — 參見 [硬規則第 15 條](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] 提交訊息中無 `Co-Authored-By` 尾綴 — 提交必須僅以儲存庫擁有者的 Git 身分出現（硬規則第 16 條）

---

## 發布

發布透過 `/generate-release` 工作流程管理。當建立新的 GitHub Release 時，套件會透過 GitHub Actions **自動發布到 npm**。

對於 VPS 部署，請使用 `npm run build:release`（而非 `npm run build`）— 它會執行清除重建，將套件組裝到 `dist/`，並寫入 `dist/BUILD_SHA` 哨兵。然後使用 `/deploy-vps-*-cc` 技能，這些技能會將 `dist/` rsync 到遠端 `app/` 目錄。

---

## 取得協助

- **架構**：參見 [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API 參考**：參見 [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **安全文件**：[`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)、[`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)、[`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)、[`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **運維文件**：[`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **問題回報**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**：參見 `docs/adr/` 了解架構決策記錄
