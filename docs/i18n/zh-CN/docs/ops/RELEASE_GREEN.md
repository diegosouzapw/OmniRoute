# Release-Green: keeping the queue and release branch green (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## 此方案解决的问题

**完整门禁**（`.github/workflows/ci.yml` — 单元测试分片、vitest、ratchets、
`package-artifact`、SonarQube、E2E）**仅在发布 PR**（PR → `main`）上运行。以
`release/**` 为目标分支的 PR 会执行**快速门禁**（`quality.yml`：受 TIA 影响的测试 + 类型检查 + lint），
对于代码变更，还会执行一次**仅供参考的**生产构建。因此，仅在发布时才会暴露的失败仍可能
悄无声息地累积在发布分支上，并在发布时**以每层约 40 分钟的方式逐个爆发**。

“release-green 系列”旨在**提前发现**这些失败——随时在**本地/发布流程之外**
执行与完整门禁等效的验证，从而使发布 PR 在首次 CI 运行时就已经处于
绿色通过状态。

> **不可妥协的原则：**这些机制都不会阻塞贡献者。我们不会添加会导致其 PR 失败的必需
> 检查。**漂移**（ratchets）应由维护者在发布时重新设定基线——
> 绝不应成为贡献者需要关心的问题。任何环节都不会**关闭** PR（抢夺贡献归属），也不会为了
> 通过而**削弱**测试。

## 系列中的 4 个组成部分——以及各自如何独立运行

| 组成部分                                                                | 定义                                           | 运行时机                                                    | 范围                        |
| ----------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- | --------------------------- |
| **`/green-prs`**（方案 A）                                              | 由维护者按需扫描**开放 PR 队列**               | **定期独立运行**——尤其是在执行 `/generate-release` **之前** | 整个 PR 队列 → `release/**` |
| **`/validate-release-green`**（方案 C — `npm run check:release-green`） | 验证引擎：针对某个分支或合并候选项复现完整门禁 | 可随时独立运行                                              | 特定分支或合并 PR           |
| **`/babysit <PR#>`**                                                    | 推动**单个** PR 的**实时 CI**达到绿色通过状态  | 针对每个 PR 独立运行                                        | 单个 PR                     |
| **`nightly-release-green.yml`**（方案 D）                               | 自动化夜间工作流；出现严重失败时创建 issue     | 自动运行（cron）                                            | 活跃的发布分支              |

**对于“这是否仅用于发布？”的简短回答：****不是。**`/green-prs` 的设计用途就是
在**两次发布之间定期运行**。独立运行才是常规用法——发布只是在此时运行它能产生最大价值的
那个时刻。

## PR 到发布的建议性构建

`quality.yml` 现在为非草稿代码 PR 和 Mergify 队列分支加入了 `Build (advisory)`。
它复刻了 `ci.yml` 中的生产构建流程：Node 24、`npm-ci-retry`、
`check:node-runtime`，以及设置 `OMNIROUTE_USE_TURBOPACK=1` 后运行 `npm run build`。它有意
不上传构建产物，因为此工作流中没有下游质量作业会使用该产物。
在发布 PR 稳定运行一周后移除 `continue-on-error`，使此信号成为
阻塞性的 PR 到发布门禁。

## 方案 C — `npm run check:release-green`（引擎）

针对当前工作树重现与发布等效的验证，并对每个红灯进行分类：

- **HARD**（类型检查、lint 错误、单元测试、vitest、db-rules、public-creds、可选的
  `package-artifact`）→ **真实缺陷**；`exit 1`。在源分支上修复（TDD，规则 #18）。
- **DRIFT**（eslint **警告**、认知复杂度、文件大小）→ 在周期内累积的基线漂移，
  **不是贡献者的责任**；仅进行报告，并**由维护者在发布时重新建立基线**。
  漂移**绝不会**改变退出码——因此它绝不会阻塞任何人。

```bash
npm run check:release-green                 # 当前分支（工作树）
node scripts/quality/validate-release-green.mjs --json   # 结构化输出
node scripts/quality/validate-release-green.mjs --quick  # 跳过单元测试和 vitest（仅漂移、类型检查和 lint）
node scripts/quality/validate-release-green.mjs --with-build  # 包含 package-artifact（较慢）
```

仅诊断并**报告**（不自动修复）。修复至全绿的编排逻辑位于
`/green-prs` 和 `/review-prs` 中。

## 方案 A — `/green-prs`（队列扫描）

流程（摘要——详见 `green-prs` 技能）：

1. **盘点**以当前活跃发布分支为目标的开放 PR 队列。
2. **分诊**每个 PR（可行 / 应拒绝 / 需要作者处理）——应拒绝或需要作者处理的 PR
   **仅报告，不关闭**（由作者决定）。
3. 对每个可行的 PR，在**隔离的工作树**中（规则 #19）将 PR 更新到发布分支最新提交，并运行
   `npm run check:release-green`：
   - **HARD** → 通过共同署名在**贡献者的分支上**修复（保留作者的“已合并”状态），
     重复运行，直至清除所有 HARD 问题。
   - **DRIFT** → 保持不变；将在发布时重新建立基线。
4. **报告** PR ×（判定、HARD 红灯、是否已修复、DRIFT、目前是否达到 release-green？）表格。

可以在不合并的情况下**准备**队列；仅在明确要求时才合并——并且绝不关闭 PR。

## 建议执行频率

- **定期运行 `/green-prs`**（例如每周一次），并且始终在
  `/generate-release` 之前运行。
- 保留 **`nightly-release-green.yml`**（方案 D）作为持续信号：当它为
  HARD 红灯创建议题时，就该进行扫描了。
- 临时使用 **`/validate-release-green`** 检查某个分支或特定的合并候选项。
- 当某个特定 PR 需要在实时 CI 中持续推进至全绿时，使用 **`/babysit <PR#>`**。

## 与发布的关系

- `/generate-release` 在**阶段 0（预检）**中调用验证：重新建立 DRIFT 基线并修复
  HARD，然后再创建发布 PR。
- `/review-prs` 在合并决策步骤使用 release-green 门禁（全绿后再合并）。

所有组件的目标都相同：**让发布 PR 在首次 CI 运行时即全绿**，而不是在发布当天
一层层等待长达 40 分钟的红灯检查。
