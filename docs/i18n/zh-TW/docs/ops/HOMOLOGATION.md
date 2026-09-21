# Homologation Suite (`npm run homolog`) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md)

---

在驗收 VPS 上執行的 OmniRoute 部署之真實環境 E2E 驗證
（`HOMOLOG_BASE_URL`，例如 `http://192.168.0.15:20128`）。只需一個命令，即可以自動化、可產生證據的執行取代手動的
發佈 STOP #2 檢查清單。

## 涵蓋範圍

| 層級                  | 檢查內容                                                                                                                                                       | 實作                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — 健康狀態／一致性 | `/api/monitoring/health` 回應 `200`，包含 `status: "healthy"` 與預期版本                                                                                       | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — 暫時性金鑰      | 管理員登入 → `POST /api/keys` 為本次執行建立具有特定範圍的 API 金鑰，且無論執行結果為何，都會在 `finally` 區塊中撤銷（`DELETE /api/keys/:id`）                 | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API 介面        | `/v1/models` 目錄、一次真實的非串流聊天補全（層級關鍵模型，`max_tokens: 5`）、一次無效金鑰 `401`，以及公開的 `/api/monitoring/health`                          | `tests/homolog/api/core.http`（httpYac）                                      |
| L1c — SSE 串流        | 真實的串流聊天補全；斷言 `text/event-stream`、至少一個內容增量，以及一個 `[DONE]` 終止符                                                                       | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — 真實提供者       | 針對即時 `/v1/models` 目錄中存在的每個關鍵提供者，透過 promptfoo 即時產生一次最低成本的聊天請求                                                                | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI 驗證         | 透過真實登入表單登入一次，並在整個 UI 層重複使用該工作階段（`storageState`）                                                                                   | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI 路由         | `src/app/(dashboard)/dashboard` 下的每個靜態 `page.tsx`（從檔案系統探索，略過動態 `[param]` 路由）皆可載入，且不會出現 HTTP 錯誤、頁面錯誤或 Next.js 錯誤邊界  | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI 關鍵流程     | 透過儀表板 UI 建立 API 金鑰，然後再次撤銷（不在 VPS 上留下任何殘留資料）                                                                                       | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — 統一報告         | 將 httpYac（透過 `junit-to-ctrf`）、promptfoo→CTRF 轉接器與 Playwright CTRF 報告器合併為單一 `homolog-ctrf.json`，並產生人類可讀的 `homolog-report/summary.md` | `scripts/homolog/run.mjs`                                                     |

重播本身完全不涉及 LLM——這是一套確定性的迴歸測試組合，
而非評估。AI 僅會用於未來的維護工作（請參閱下方的「路線圖」）。

## 先決條件

1. 將 `.env.homolog.example` 複製為 `.env.homolog`（已由 git 忽略——切勿提交），並填入：
   - `HOMOLOG_BASE_URL` — 目標部署，例如 `http://192.168.0.15:20128`。
   - `HOMOLOG_ADMIN_PASSWORD` — 該部署的儀表板管理密碼。
   - `HOMOLOG_CRITICAL_PROVIDERS` — 以逗號分隔的提供者前綴，系統會對其發出真實的聊天冒煙測試請求（例如 `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`）。
   - `HOMOLOG_API_KEY` — 一般執行時請留空；測試套件會建立並撤銷自己的暫時性金鑰。僅在需要單獨偵錯某一層時才設定此值。
2. 在儲存庫中執行 `npm install`（測試套件的相依套件——`httpyac`、`promptfoo`、`playwright-ctrf-json-reporter`、`junit-to-ctrf`、`ctrf`——都是一般的 devDependencies）。
3. 如果尚未安裝瀏覽器二進位檔，請執行 `npx playwright install`。

## 執行方式

```bash
npm run homolog
```

若要針對版本與本機 `package.json` 不相符的部署進行驗證（例如仍使用前一個修補版本的驗收環境主機），請明確覆寫預期版本：

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

若任何一層失敗，執行程序會以非零狀態結束；即使發生失敗，也一律會嘗試撤銷其建立的暫時性 API 金鑰（位於 `scripts/homolog/run.mjs` 的 `finally` 區塊）。

## 閱讀報告

所有輸出都會寫入 `homolog-report/`（已由 git 忽略）：

- `summary.md` — 與輸出至 stdout 相同的表格，每一層各一列（✅/❌ + 詳細資訊）。
- `homolog-ctrf.json` — 統一的 CTRF 報告（合併 API/SSE、提供者冒煙測試與 UI 結果）——這是要附加至版本發布 STOP #2 檢查清單的產出物。
- `httpyac-junit.xml`、`api-ctrf.json`、`providers-ctrf.json`、`ui-ctrf.json` — 各層的原始／中繼報告。
- `promptfooconfig.yaml`、`provider-misses.json` — 為目前執行產生的 promptfoo 設定，以及即時目錄中缺少的任何關鍵提供者。

L0 失敗時會立即中止（不會建立暫時性金鑰），因為版本／健康狀態不相符代表所有下游層都會驗證錯誤的部署。

## UI 合法變更時重新建立基準

L4b（路由冒煙測試）和 L4c（API 金鑰 UI 流程）由真實的 DOM 定位器驅動，而非快照，因此大多數合法的 UI 變更不需要更新測試套件。當變更確實導致定位器失效時（例如按鈕標籤重新命名，或設定頁面移動）：

1. 依據目前的原始碼重新確認定位器（規格已記錄每個定位器是根據哪個檔案／行號確認的——請遵循相同模式，不要猜測）。
2. 更新 `tests/homolog/ui/` 中的規格。
3. 對 VPS 重新執行 `npm run homolog`（或只執行受影響的 Playwright 規格）以確認修正，然後提交。

此測試套件中沒有視覺／像素基準（F1）——相關規劃請參閱「路線圖」。

## 路線圖（F2 / F3）

設計與分階段推出計畫位於內部規劃規格 `_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md`（未提供連結——這是內部 `_tasks/` 產出物，不屬於此儲存庫追蹤的文件）。摘要：

- **F2** — 完整操作流程錄製 → Playwright Test Agents（`planner`/`generator`）將其轉換為流程規格（建立組合、測試提供者、編輯設定、MCP 工具）+ 視覺迴歸基準（Lost Pixel），並遮罩動態資料（指標、時間戳記、日誌）+ 每個版本發布均執行一次 `healer` 維護程序。
- **F3** — 韌性／契約／串接涵蓋範圍：在開發主機上使用 toxiproxy + 假的 OpenAI 相容提供者，並在 VPS 上建立指向該提供者的 `homolog-resilience` 組合（注入逾時 → 透過 `/api/monitoring/health` 斷言後援機制 + 斷路器開啟／關閉）；針對 `docs/openapi.yaml` 執行受閘控的 Schemathesis 契約測試（較低的 `--max-examples`、固定種子、僅限非 LLM 端點）；以及將 `npm run homolog` + 其 `summary.md` 串接至 `/generate-release` 的 STOP #2 階段。
