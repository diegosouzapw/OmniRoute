# AI 助手的安全與整潔規則

> **適用範圍：** 基於 Gemini 的代理規則。若為 Claude Code，請見 `CLAUDE.md`。若為其他 AI 助手，請見 `AGENTS.md`。

## 1. 檔案放置與組織

- **測試檔案**：所有單元測試、整合測試、生態系測試或 Vitest 檔案，**必須**嚴格放置在 `tests/` 目錄內（例如 `tests/unit/`、`tests/integration/`）。**嚴禁**在專案根目錄（`/`）建立測試檔案。
- **腳本與工具**：所有維護、除錯、產生或實驗性腳本（`.cjs`、`.mjs`、`.js`、`.ts`）**必須**嚴格放置在 `scripts/` 子資料夾之一（`build/`、`dev/`、`check/`、`docs/`、`i18n/`、`ad-hoc/`）。一次性或實驗性程式碼請置於 `scripts/ad-hoc/` 下。**嚴禁**將腳本任意散落在專案根目錄（`/`）或 `scripts/` 頂層資料夾。

**專案根目錄僅能包含：**

- 設定檔（`vitest.config.ts`、`next.config.mjs`、`eslint.config.mjs`、`tsconfig*.json`、`playwright.config.ts`、`prettier.config.mjs`、`postcss.config.mjs`、`sonar-project.properties`、`fly.toml`、`docker-compose*.yml`、`Dockerfile`）
- 相依性檔案（`package.json`、`package-lock.json`）
- 文件檔案（`README.md`、`CHANGELOG.md`、`LICENSE`、`AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`CONTRIBUTING.md`、`SECURITY.md`、`CODE_OF_CONDUCT.md`、`llm.txt`、`Tuto_Qdrant.md`）
- CI/CD 檔案與忽略定義（`.gitignore`、`.dockerignore`、`.npmignore`、`.npmrc`、`.node-version`、`.nvmrc`、`.env.example`）

當建立**任何**驗證測試或一次性邏輯腳本時，請根據您的目標預設使用 `scripts/ad-hoc/` 或 `tests/unit/` 目錄。請勿汙染 `／` 根目錄上下文。

## 2. 嚴格規則（與 `CLAUDE.md` 對應）

1. **絕不提交機密或憑證。** 使用 `.env`（從 `.env.example` 自動產生）或密碼保管庫。密碼、OAuth 密鑰、API 金鑰和 Cookie 值**不得**出現在已提交的檔案中。
2. **絕不向 `src/lib/localDb.ts` 添加邏輯。** 該檔案僅作為重新匯出的統合點（barrel）。
3. **絕不使用 `eval()`、`new Function()` 或任何隱含的 eval。** ESLint 已強制執行此規則。
4. **絕不直接提交至 `main`。** 請使用 `feat/`、`fix/`、`refactor/`、`docs/`、`test/` 或 `chore/` 分支。
5. **絕不在路由中撰寫原始 SQL** — 一律透過 `src/lib/db/` 領域模組操作。
6. **絕不靜默吞沒 SSE 串流中的錯誤** — 應傳遞錯誤或乾淨地中止串流。
7. **絕不繞過 Husky 鉤子**（`--no-verify`、`--no-gpg-sign`），除非獲得操作人員明確許可。
8. **一律使用 `src/shared/validation/schemas.ts` 中的 Zod 綱要驗證輸入。**
9. **修改生產程式碼（`src/`、`open-sse/`、`electron/`、`bin/`）時，一律同時添加測試。**
10. **覆蓋率必須維持** ≥ 75% 陳述式 / 75% 行 / 75% 函式 / 70% 分支（實際測量值約 82%）。

## 3. 程式碼庫導航

| 任務                     | 請先閱讀此文件                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 理解程式碼庫             | `docs/architecture/REPOSITORY_MAP.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 架構概覽                 | `docs/architecture/ARCHITECTURE.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 工程參考                 | `docs/architecture/CODEBASE_DOCUMENTATION.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 添加功能                 | `CONTRIBUTING.md` + 對應的 `docs/<領域>.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 各領域深入探索           | `docs/frameworks/SKILLS.md`、`docs/frameworks/MEMORY.md`、`docs/frameworks/EVALS.md`、`docs/security/GUARDRAILS.md`、`docs/security/COMPLIANCE.md`、`docs/frameworks/CLOUD_AGENT.md`、`docs/frameworks/MCP-SERVER.md`、`docs/frameworks/A2A-SERVER.md`、`docs/architecture/AUTHZ_GUIDE.md`、`docs/architecture/RESILIENCE_GUIDE.md`、`docs/routing/AUTO-COMBO.md`、`docs/frameworks/WEBHOOKS.md`、`docs/routing/REASONING_REPLAY.md`、`docs/security/STEALTH_GUIDE.md`、`docs/ops/TUNNELS_GUIDE.md`、`docs/guides/ELECTRON_GUIDE.md`、`docs/reference/PROVIDER_REFERENCE.md` |
| 發布流程                 | `docs/ops/RELEASE_CHECKLIST.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

## 4. 本地開發環境存取

儀表板可透過操作人員選擇的 URL／連接埠存取（預設 `http://localhost:20128`）。憑證為操作人員專屬：

- **初始管理員密碼**取自首次安裝時的 `INITIAL_PASSWORD` 環境變數（`.env.example` 中預設為 `CHANGEME`；請在首次登入後立即更換）。
- **本地 VPS／共享開發環境**：請向操作人員索取 URL 與當前憑證——這些資訊保存在操作人員的個人密碼保管庫中，**不在**此儲存庫內。

> 若本檔案舊版中曾出現任何憑證，均為非正式環境的示範值；請將其視為已洩漏，切勿重複使用。
