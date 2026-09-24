# Supply-Chain Gates (Phase 8 · Block A) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute 會發布 npm + Docker 成品。這些關卡提供來源證明、
清單（SBOM）及 CVE 掃描，全部採用開放原始碼工具，並整合至發布工作流程。
採取**以警示為先**的策略——目前僅進行回報，待第 1 次
綠燈發布後再提升為阻擋性關卡。

| 關卡                 | 工具                                            | 所在位置                       | 是否阻擋？     | 輸出                                             |
| -------------------- | ----------------------------------------------- | ------------------------------ | -------------- | ------------------------------------------------ |
| SLSA 來源證明（npm） | `npm --provenance`（OIDC）                      | `npm-publish.yml`              | 僅在發布失敗時 | npmjs 徽章 / `npm audit signatures`              |
| npm SBOM             | `@cyclonedx/cyclonedx-npm`                      | `npm-publish.yml`              | 僅在產生失敗時 | 發布資產 + 成品                                  |
| 映像 SBOM            | `anchore/sbom-action`（syft）                   | `docker-publish.yml`（合併）   | 警示性         | CycloneDX 成品                                   |
| Trivy CVE（SARIF）   | `aquasecurity/trivy-action`                     | `docker-publish.yml`（合併）   | 警示性         | SARIF（HIGH+CRITICAL）→「安全性」分頁            |
| Trivy CRITICAL 關卡  | `aquasecurity/trivy-action`                     | `docker-publish.yml`（合併）   | **阻擋性**     | 遇到可修復的 CRITICAL 時設定 `exit-code: '1'`    |
| osv vulnCount        | `osv-scanner`（`check:vuln-ratchet --ratchet`） | `ci.yml`（`quality-extended`） | **阻擋性**     | 棘輪鎖定 `metrics.vulnCount`（`direction:down`） |
| OpenSSF Scorecard    | `ossf/scorecard-action`                         | `scorecard.yml`（cron）        | 警示性         | SARIF →「安全性」+ 徽章                          |

映像 CVE 棘輪在 `docker-publish.yml` 中使用**兩個步驟**：SARIF 步驟
（`HIGH,CRITICAL`、`exit-code: 0`）會讓 HIGH+CRITICAL 持續顯示在「安全性」分頁中，
但不會阻擋；_CRITICAL 關卡_步驟（`severity: CRITICAL`、`ignore-unfixed: true`、
`exit-code: 1`）會在出現**已有可用修正**的 CRITICAL CVE 時讓發布失敗。`ignore-unfixed`
可避免因尚無上游修補程式的基礎映像 CVE 而阻擋發布。

## ⚠️ CVE 變異（阻擋性 osv/Trivy 關卡）

osv 和 Trivy 會根據**持續增長**的 CVE 資料庫比對相依套件。即使某個 PR
**完全未變更相依套件**，也可能因既有相依套件新揭露了 CVE 而突然轉為紅燈
（osv：測得的 `vulnCount` > 基準值；Trivy：映像中出現新的可修復 CRITICAL）。
**這是阻擋性 CVE 關卡的預期營運行為，而非產品迴歸。**

當 osv 或 Trivy 因新揭露的 CVE 而轉為紅燈時，處理方式如下：

1. **升級受影響的相依套件**（首選）——透過 `package.json` 的
   `overrides`（間接相依套件）升級至已修補版本，或使用已修補的基礎映像重新建置映像。
2. **若上游尚無修正：**
   - **osv：**在 `config/quality/quality-baseline.json` 中重新設定
     `metrics.vulnCount` 的基準值（`npm run quality:ratchet -- --update` 不涵蓋專用關卡——請
     手動編輯該值並保留 `direction:down`），並附上理由說明與追蹤議題。
   - **Trivy：**在 `.trivyignore` 中新增項目（每行一個 CVE-ID），並附上理由
     註解與追蹤議題。`ignore-unfixed: true` 已會自動涵蓋沒有
     修補程式的 CVE。

當工具不存在或測量失敗時，兩個關卡都會**妥善略過**（以 0 結束）
（osv-scanner 不在 PATH 中、無法連線至 osv.dev/網路、JSON 無效）——
**測量**失敗絕不會造成阻擋，只有**實際測得**的迴歸才會阻擋。

## 待辦：Scorecard 警示性 → 阻擋性

在 Scorecard 完成第 1 次綠燈發布並產生報告後：

- Scorecard：分數棘輪（鎖定測得的分數，不得下降）。

這是對 Phase 7 關卡（osv-scanner、gitleaks、actionlint+zizmor）的補充：zizmor
會稽核工作流程本身；Scorecard 則會彙總衡量儲存庫的整體安全態勢。
