# Supply-Chain Gates (Phase 8 · Block A) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute 發布 npm + Docker 構件。這些關卡提供溯源、庫存（SBOM）和 CVE 掃描，全部都是開源軟體（OSS），並整合到發布工作流程中。**建議優先**的姿態 — 它們現在會報告，在第一次綠色發布後才會升級為阻擋。

| 關卡                  | 工具                                           | 位置                          | 阻擋？         | 輸出                                        |
| --------------------- | ---------------------------------------------- | ----------------------------- | -------------- | ------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | 僅在發布失敗時 | npmjs 徽章 / `npm audit signatures`         |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | 僅在生成失敗時 | 發布資產 + 構件                             |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | 建議           | CycloneDX 構件                              |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | 建議           | SARIF (高+嚴重) → 安全性分頁                |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **阻擋**       | 在可修復的嚴重問題上 `exit-code: '1'`       |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **阻擋**       | 棘輪式調整 `metrics.vulnCount` (方向：向下) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | 建議           | SARIF → 安全性 + 徽章                       |

映像檔 CVE 棘輪式調整在 `docker-publish.yml` 中使用**兩個步驟**：SARIF 步驟（`HIGH,CRITICAL`，`exit-code: 0`）讓高風險和嚴重風險在安全性分頁中可見，但不阻擋發布；而 _嚴重關卡_ 步驟（`severity: CRITICAL`，`ignore-unfixed: true`，`exit-code: 1`）會在存在**可用修復程式**的嚴重 CVE 時使發布失敗。`ignore-unfixed` 可防止因基礎映像檔 CVE 缺乏上游修補程式而阻擋發布。

## ⚠️ CVE 變異（阻擋 osv/Trivy 關卡）

osv 和 Trivy 會將依賴項與**持續增長**的 CVE 資料庫進行比較。一個**未觸及任何依賴項**的 PR 可能會突然變紅，因為現有依賴項中披露了新的 CVE（osv：測量的 `vulnCount` > 基準線；Trivy：映像檔中出現新的可修復嚴重問題）。**這是阻擋性 CVE 關卡的預期操作行為，而非產品退化。**

當 osv 或 Trivy 因新披露的 CVE 而變紅時，解決方案是：

1.  **提升受影響的依賴項**（首選）— 透過 `package.json` 的 `overrides`（傳遞性依賴項）升級到已修補版本，或在已修補的基礎上重建映像檔。
2.  **如果沒有上游修復：**
    - **osv：** 在 `config/quality/quality-baseline.json` 中重新設定 `metrics.vulnCount` 的基準線（`npm run quality:ratchet -- --update` 不涵蓋專用關卡 — 手動編輯數值，`direction:down`），並附上理由說明和追蹤問題。
    - **Trivy：** 在 `.trivyignore` 中新增一個條目（每行一個 CVE-ID），並附上理由註釋和追蹤問題。`ignore-unfixed: true` 已自動涵蓋沒有修補程式的 CVE。

當工具不存在或測量失敗時（例如 osv-scanner 不在 PATH 中、osv.dev/網路無法連線、JSON 無效），這兩個關卡都會**優雅地跳過**（exit 0）— **測量**失敗絕不會阻擋，只有**測量到的**退化才會阻擋。

## 已知接受的風險

### extract-zip 2.0.1 — GHSA-7pqw-9j4j-h8q3 / GHSA-jmr9-qjv8-65gv (#14482)

`extract-zip@2.0.1` 帶有兩個未修補的高嚴重性符號連結遍歷諮詢。
根據上述 CVE 差異補救措施的「無上游修復」分支，這是一個
**已接受的風險**，而不是版本升級：

- **鏈條：** `promptfoo` (devDependency) → `@openai/codex-security` → `extract-zip@2.0.1`。
  透過 `package-lock.json` 確認 — 整個依賴樹中只有一個套件
  (`@openai/codex-security`) 宣告了 `extract-zip`，並且只有一個套件
  (`promptfoo`) 宣告了 `@openai/codex-security`。
- **鏈條中不存在任何已修復的版本。** `extract-zip@2.0.1` (2020 年發布) 是該套件的最終版本 — 它已不再維護。`@openai/codex-security` 的
  當前 npm-latest (`0.1.29`) 仍然拉取 `extract-zip@2.0.1`。
- **無法從生產環境中觸及。** `promptfoo` 僅為 devDependency (從未列在
  `dependencies` 下)，並且 `src/`、`open-sse/` 或 `bin/` 下沒有任何檔案匯入
  `extract-zip` npm 套件 — OmniRoute 自己的 `extractZip()` 輔助函數
  (`src/lib/versionManager/binaryManager.ts:93`) 呼叫原生 `unzip`/`tar`
  且與之無關。`@openai/codex-security` 還在其 `extract-zip` 的 onEntry 回調之上
  提供了自己的符號連結遍歷防護。
- **請勿** 透過 `package.json` `overrides` 別名 `extract-zip` — 唯一可行的
  替代品是 Electron-org-internal 且與
  `@openai/codex-security` 自己的 onEntry/defaultDirMode/defaultFileMode 檢查
  API 不相容；覆蓋它將會默默地破壞該套件的安全檢查。
- **基準線：** 測量的 osv `vulnCount` (3) 已經遠低於凍結的
  `config/quality/quality-baseline.json` 基準線 (27) — 無需棘輪變更。
- **回歸防護：** `tests/unit/extract-zip-14482-exposure.test.ts` 斷言了
  上述鏈條和非生產匯入不變式；如果其中任何一個被破壞 (例如，未來的 PR 使 `extract-zip` 可從生產環境中觸及)，它將導致 CI 失敗。
- **追蹤：** 問題 #14482。

## 待辦事項：記分卡諮詢 → 阻擋

在 Scorecard 報告的第一次綠色發布之後：

- 記分卡：分數棘輪 (凍結測量分數；不能降低)。

補充了第 7 階段的門檻 (osv-scanner、gitleaks、actionlint+zizmor)：zizmor
審核工作流程本身；Scorecard 總體衡量儲存庫的態勢。
