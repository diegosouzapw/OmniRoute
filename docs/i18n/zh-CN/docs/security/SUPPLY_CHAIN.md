# Supply-Chain Gates (Phase 8 · Block A) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute 发布 npm + Docker 制品。这些门禁提供来源证明、清单（SBOM）和 CVE 扫描，全部采用开源软件，并已接入发布工作流。
采用**建议优先**策略——当前仅报告，在第 1 次绿色发布后提升为阻断门禁。

| 门禁                 | 工具                                            | 位置                           | 是否阻断？     | 输出                                                  |
| -------------------- | ----------------------------------------------- | ------------------------------ | -------------- | ----------------------------------------------------- |
| SLSA 来源证明（npm） | `npm --provenance`（OIDC）                      | `npm-publish.yml`              | 仅在发布失败时 | npmjs 徽章 / `npm audit signatures`                   |
| npm SBOM             | `@cyclonedx/cyclonedx-npm`                      | `npm-publish.yml`              | 仅在生成失败时 | Release 资产 + artifact                               |
| 镜像 SBOM            | `anchore/sbom-action`（syft）                   | `docker-publish.yml`（合并）   | 建议性         | CycloneDX artifact                                    |
| Trivy CVE（SARIF）   | `aquasecurity/trivy-action`                     | `docker-publish.yml`（合并）   | 建议性         | SARIF（HIGH+CRITICAL）→ Security 选项卡               |
| Trivy CRITICAL 门禁  | `aquasecurity/trivy-action`                     | `docker-publish.yml`（合并）   | **阻断**       | 对可修复的 CRITICAL 设置 `exit-code: '1'`             |
| osv vulnCount        | `osv-scanner`（`check:vuln-ratchet --ratchet`） | `ci.yml`（`quality-extended`） | **阻断**       | 对 `metrics.vulnCount` 执行棘轮控制（direction:down） |
| OpenSSF Scorecard    | `ossf/scorecard-action`                         | `scorecard.yml`（cron）        | 建议性         | SARIF → Security + 徽章                               |

镜像 CVE 棘轮机制在 `docker-publish.yml` 中使用**两个步骤**：SARIF 步骤
（`HIGH,CRITICAL`、`exit-code: 0`）使 HIGH+CRITICAL 漏洞持续显示在 Security 选项卡中，
但不会阻断；_CRITICAL 门禁_步骤（`severity: CRITICAL`、`ignore-unfixed: true`、
`exit-code: 1`）会在存在**已有可用修复方案**的 CRITICAL CVE 时使发布失败。`ignore-unfixed`
可避免因没有上游补丁的基础镜像 CVE 而阻断发布。

## ⚠️ CVE 波动（阻断式 osv/Trivy 门禁）

osv 和 Trivy 会将依赖项与**持续增长**的 CVE 数据库进行比较。即使某个 PR
**没有修改任何依赖项**，也可能因为现有依赖项中新披露了 CVE 而突然变红
（osv：测得的 `vulnCount` > 基线；Trivy：镜像中出现新的可修复 CRITICAL）。
**这是阻断式 CVE 门禁的预期运维行为，而不是产品回归。**

当 osv 或 Trivy 因新披露的 CVE 而变红时，补救措施如下：

1. **升级受影响的依赖项**（首选）——通过 `package.json` 中的 `overrides`
   （传递依赖项）升级到已修复版本，或基于已修复的基础镜像重新构建镜像。
2. **如果上游没有修复方案：**
   - **osv：**在 `config/quality/quality-baseline.json` 中重新设定
     `metrics.vulnCount` 基线（`npm run quality:ratchet -- --update`
     不涵盖专用门禁——请手动编辑该值，保持 `direction:down`），并附上理由说明和跟踪 issue。
   - **Trivy：**在 `.trivyignore` 中添加条目（每行一个 CVE-ID），并附上理由
     注释和跟踪 issue。`ignore-unfixed: true` 已自动涵盖没有补丁的 CVE。

当工具不存在或测量失败时（osv-scanner 不在 PATH 中、osv.dev/网络不可达、
JSON 无效），这两个门禁都会**安全地跳过**（退出码为 0）——**测量**失败永远不会阻断，
只有**测得的**回归才会阻断。

## 待办：将 Scorecard 从建议性提升为阻断式

在 Scorecard 完成第 1 次绿色发布报告后：

- Scorecard：分数棘轮控制（冻结测得的分数，不允许下降）。

这是对第 7 阶段门禁（osv-scanner、gitleaks、actionlint+zizmor）的补充：zizmor
审计工作流本身；Scorecard 则综合衡量仓库的安全态势。
