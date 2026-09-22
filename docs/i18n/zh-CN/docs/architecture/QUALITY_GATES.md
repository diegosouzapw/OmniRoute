# Quality Gates Reference (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

本文档是 OmniRoute 中所有 CI 质量门禁的权威参考。
它描述了每个门禁、门禁所验证的内容、其运行所在的 CI 作业、采用棘轮基线还是通过/失败策略，以及该门禁会阻止构建还是仅提供建议。

有关简要概述和允许列表策略，请参阅 `AGENTS.md` 中的“Quality Gates & Ratchets”部分。有关同一系统的关键评估、成熟度分类和工具无关的复现计划，请参阅
[质量门禁手册](../ops/QUALITY_GATE_PLAYBOOK.md)。

---

## 门禁清单（约 90 个脚本）

脚本位于 `scripts/check/`（策略门禁）和 `scripts/quality/`（棘轮引擎）下。
CI 的唯一事实来源是 `.github/workflows/ci.yml`。

### 发布 PR 快速路径（`quality.yml`）

`.github/workflows/quality.yml` 在目标分支为 `release/**` 的 PR 上运行。它通过按路径筛选的快速门禁，让贡献者分支持续推进；对于代码变更，还会提供一个建议性的生产构建信号：

| 作业                                             | 范围                                                                                                                                                                              | 阻断性                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `Build (advisory)`                               | 非草稿代码 PR 和 Mergify 队列分支；Node 24、`npm-ci-retry`、`check:node-runtime`，以及设置 `OMNIROUTE_USE_TURBOPACK=1` 的 `npm run build`；不上传制品，因为没有下游质量作业使用它 | **建议性**（`continue-on-error: true`；发布 PR 稳定运行一周后移除） |
| `Docs Gates (fast-path)`                         | 文档/代码 PR；API 文档引用和 docs-all                                                                                                                                             | 是                                                                  |
| `Fast Quality Gates`                             | 代码 PR；静态检查、类型检查、仪表板类型检查、受影响的单元测试                                                                                                                     | 是                                                                  |
| `Forgotten sibling tests`                        | 代码 PR；将已更改模块追踪到静态使用方和候选同级测试；桶文件和动态导入路径仅作为建议性诊断报告，并包含引用的允许列表例外                                                           | **建议性**                                                          |
| `Vitest (fast-path)`                             | 代码 PR；快速 vitest 测试套件                                                                                                                                                     | 是                                                                  |
| `Unit Tests fast-path`                           | 代码 PR；4 分片单元测试套件                                                                                                                                                       | 是                                                                  |
| `No new ESLint warnings`                         | 代码 PR；可识别抑制项的 lint 防护                                                                                                                                                 | 对同源 PR 为是，对 fork 为建议性                                    |
| `Merge integrity (changelog + generated skills)` | 非草稿 PR；变更日志和生成技能同步                                                                                                                                                 | 对同源 PR 为是，对 fork 为建议性                                    |

#### 遗漏的同级测试报告

`npm run check:forgotten-sibling-tests` 复用测试影响映射背后的导入解析器。
对于每个已更改的生产模块，当候选测试未出现在拉取请求的差异中时，它会报告确定性的
`已更改模块/符号 -> 静态使用方 -> 候选同级测试` 链。Markdown 摘要和 JSON 结果会作为
`forgotten-sibling-tests` 工作流制品保留，以便在任何阻断性推广之前进行校准。

桶式重新导出和动态导入仅作为解析诊断；它们绝不会产生阻断性发现。已审核的例外位于
`config/quality/forgotten-sibling-allowlist.json`。每个条目都必须指定使用方和候选
测试，给出具体理由，并链接到 GitHub issue 或拉取请求。格式错误的条目会按失败处理。
例外不能抑制已删除的候选测试，也不能抑制添加了 `.skip`/`.todo` 的差异；
断言弱化和其他掩盖行为仍由独立的阻断性
`check:test-masking` 门禁负责。

### 作业：`lint`

在每个面向 `main` 的 PR 上运行。失败时阻止合并。

| 脚本 (`npm run ...`)              | 验证内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是否阻塞                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js 版本是否在支持的范围内                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:cycles`                    | 循环导入——所有 `src/` + `open-sse/` 模块                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:route-validation:t06`      | 所有路由是否均包含 Zod schema（Tier 6 策略）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` 的数量是否未超出预算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是                                      |
| `check:provider-consistency`      | `providers.ts` 中的每个提供者在 `providerRegistry.ts` 中都有匹配的条目（反之亦然，但仅限于允许列表范围内）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:model-lifecycle`           | 三个手动维护的路由表与签入的生命周期快照 (#11503) 保持一致：`FITNESS_TABLE` (`taskFitness.ts`) 不会为任何 `REGISTRY` 可路由的已退役 id 评分；每个 `BUILT_IN_ALIASES` 目标都存在于 `REGISTRY` 中，且不存在于已退役 id 快照中；`REGISTRY` 中仍存在的每个已退役 id 都已被转发或列在 `allowedRetiredInCatalog` 中；并且任何 `DEFAULT_DEGRADATION_MAP` 源或目标都未在该快照中显示为已退役。这并不能证明模型当前由实时上游提供服务。离线检查——与 `config/quality/model-lifecycle.json` 进行比较，该文件通过 `npm run quality:refresh-model-lifecycle` 手动刷新（需要网络；未接入 CI）。`allowedRetiredInCatalog` 是一个逐步清零的棘轮机制：仅在有关联的跟踪 issue 时才添加条目。 | 是                                      |
| `check:fetch-targets`             | 客户端 `src/` 中的每个 `fetch("/api/...")` 都能解析到实际存在的 `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:deps`                      | 仓库中每个 `package.json` 内所有可通过 `npm install` 安装的依赖都包含在 `dependency-allowlist.json` 中；会标记新增的未固定版本或疑似拼写抢注的软件包                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是                                      |
| `audit:deps`                      | `npm audit`（根目录 + electron）——无高危/严重级别的安全公告（与 osv `check:vuln-ratchet` 重叠；参见合理化待办事项）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是                                      |
| `check:lockfile`                  | `package-lock.json` 完整性——使用 https 注册表、包含完整性哈希、无主机覆盖                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:licenses`                  | 生产依赖项的 SPDX 许可证允许列表                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:tracked-artifacts`         | 不得存在构建产物或已提交的 `node_modules` 符号链接（也会在 husky pre-commit 中运行；pre-push 有意保持轻量——#6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是                                      |
| `check:vitest-exclusions`         | 每个 Vitest 排除项都应注明跟踪问题，并出现在 `config/quality/vitest-exclusions.json` 中（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是                                      |
| `check:file-size`                 | 任何源文件都不得超过对应扩展名的上限（棘轮机制：大型文件冻结在 `frozen` 列表中）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是                                      |
| `check:error-helper`              | 执行器/处理程序中的错误响应使用 `buildErrorBody()` / `sanitizeErrorMessage()`（硬性规则 #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是                                      |
| `check:migration-numbering`       | 迁移 SQL 文件按顺序编号，不得有缺号或重复编号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是                                      |
| `check:public-creds`              | 除 `publicCreds.ts` 外，不得出现字面量 OAuth `client_id`/`client_secret` 或 Firebase Web 密钥（硬性规则 #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是                                      |
| `check:db-rules`                  | `src/lib/db/` 模块之外不得出现原始 SQL；不得从 `localDb.ts` 进行桶式导入（硬性规则 #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:known-symbols`             | 注册在其分发表中的提供者执行器、路由策略和转换器必须与磁盘上的文件匹配——不得存在孤立或未声明的符号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是                                      |
| `check:route-guard-membership`    | 每个会生成子进程的路由都必须由 `isLocalOnlyPath()` 进行分类（硬性规则 #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是                                      |
| `check:test-discovery`            | 仓库中的每个 `*.test.ts` / `*.spec.ts` 文件都必须被至少一个测试运行器收集（棘轮机制：`test-discovery-baseline.json` 中的孤立文件列表只能缩短）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:agent-skills-sync`         | 生成的代理技能构件必须与其源目录保持一致（不得发生漂移）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | 提供者徽标/资源必须具有记录在案的来源条目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON 配置文件可被解析并满足仓库的 lint 规则                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | TypeScript 编译无错误（仅有建议性警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `typecheck:noimplicit:core`       | 严格的 `noImplicitAny`——面向未来；许多既有调用位置仍需添加类型注解                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **建议性**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | 作用域限定为 `src/app/(dashboard)/**` 的 `tsc`（#7033）——`typecheck:core` 精选的 27 文件允许列表不包含任何 dashboard TSX，且 `next build` 也从不对其进行类型检查（`next.config.mjs` 设置了 `ignoreBuildErrors: true`），因此其中的孤立标识符回归（#6625/#6909）无法被 CI 发现。与冻结的按文件/按 TS 代码计数基线（`config/quality/dashboard-typecheck-baseline.json`，采用与 `check:known-symbols` 相同的过期强制检查模式）进行差异比较——只有超出基线计数的新增错误才会导致门禁失败；修复既有错误后，使用 `--update` 下调基线。                                                                                                                                            | 是                                      |

### 作业：`quality-gate`

在 `test-coverage` 之后运行。失败时阻止合并。

| 脚本                         | 验证内容                                                                                                                | 阻断性               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | 生成 `quality-metrics.json`（ESLint 警告数、来自合并分片报告的覆盖率）                                                  | 是（棘轮检查的上游） |
| `quality:ratchet`            | `quality-baseline.json` 中的每项指标均未退化（ESLint 警告数 ≤ 基线；覆盖率 ≥ 基线）                                     | 是                   |
| `check:duplication`          | 代码重复度（jscpd@4）不超过 `quality-baseline.json` 中的基线                                                            | 是                   |
| `check:complexity`           | 文件级圈复杂度不超过上限（核心 ESLint `complexity` + `max-lines-per-function`）                                         | 是                   |
| `check:cognitive-complexity` | 认知复杂度棘轮（`eslint-plugin-sonarjs`）——单独的 ESLint 检查；CI 将两者合并为单个 `check:complexity-ratchets` 步骤运行 | 是                   |
| `check:dead-code`            | 未使用的导出/文件棘轮（knip）相较基线未退化                                                                             | 是                   |
| `check:compression-budget`   | 压缩基准预算——各引擎的令牌节省下限不得退化                                                                              | 是                   |
| `check:type-coverage`        | 类型覆盖百分比棘轮（`type-coverage`）不得退化；基本涵盖 `typecheck:noimplicit:core`                                     | 是                   |
| `check:codeql-ratchet`       | 未关闭的 CodeQL 警报数量不得增加（通过 `gh api` 读取；无令牌时正常跳过）——刷新频率和手动触发方式：参见下方“CodeQL 棘轮” | 是                   |

### 作业：`quality-extended`

整个作业均为建议性检查（`continue-on-error: true`）。基于 npm 的渐进式门禁会实际运行；外部扫描器通过 `gh release download` 安装，并在二进制文件仍不存在时自行跳过（退出码为 0）。

| 脚本                     | 验证内容                                                                                                                                          | 阻塞性     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:circular-deps`    | 不存在循环依赖（dpdm）                                                                                                                            | **建议性** |
| `check:bundle-size`      | Bundle 大小不超过上限                                                                                                                             | **建议性** |
| `check:secrets`          | 密钥扫描（gitleaks）— 如果二进制文件不存在则跳过                                                                                                  | **建议性** |
| `check:vuln-ratchet`     | 依赖项漏洞（osv-scanner）不会恶化 — 如果二进制文件不存在则跳过                                                                                    | **建议性** |
| `check:workflows`        | 工作流 lint（actionlint + zizmor）— 如果二进制文件不存在则跳过                                                                                    | **建议性** |
| `check:openapi-breaking` | 公共 API 契约（`openapi.yaml`）相对于基础分支不存在破坏性变更（oasdiff）— 输出 `openapiBreaking=N`；如果 oasdiff 不存在或基础规范无法解析，则跳过 | **建议性** |

### 作业：`docs-sync-strict`

在每个提交到 `main` 的 PR 上运行。失败时阻止合并。

| 脚本                           | 验证内容                                                                                                                      | 阻塞性                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 元门禁，按顺序运行以下 6 个子门禁                                                                                             | 是                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt 的版本一致性                                                                                    | 是                         |
| ↳ `check:docs-counts`          | 文档叙述中的数量（提供者数量、迁移数量等）处于实际数量的渐进式门禁窗口内                                                      | 是                         |
| ↳ `check:env-doc-sync`         | `.env.example` 中的每个环境变量都记录在文档表格中，反之亦然                                                                   | 是                         |
| ↳ `check:deprecated-versions`  | 文档中不存在已弃用的版本字符串                                                                                                | 是                         |
| ↳ `check:doc-links`            | 文档中的内部 markdown 链接可解析到实际文件（`[text]`/`(path)` 形式）                                                          | 是                         |
| ↳ `check:fabricated-docs`      | 文档中引用的路由、环境变量、CLI 命令、hook 名称和文件路径均存在于代码库中。通过 `--strict` 实施硬门禁；不带该标志时为软失败。 | 是（CI 中通过 `--strict`） |
| `check:cli-i18n`               | 所有 i18n locale 文件中都存在 CLI 命令字符串                                                                                  | 是                         |
| `check:openapi-coverage`       | OpenAPI 规范对实际路由的覆盖率至少达到渐进式门禁下限                                                                          | 是                         |
| `check:openapi-security-tiers` | `openapi.yaml` 中的安全级别注解与 `routeGuard.ts` 的分类一致                                                                  | **建议性**                 |
| `check:openapi-routes`         | `openapi.yaml` 中的每个路径都可解析到真实的 `route.ts`（防止虚构）                                                            | 是                         |
| `check:docs-symbols`           | `docs/**/*.md` 中的每个 `/api/...` 引用都可解析到真实的 `route.ts`（防止虚构）                                                | 是                         |
| `i18n translation drift`       | i18n locale 文件中存在未翻译的键 — 仅警告                                                                                     | **建议性**                 |

### 作业：`i18n-ui-coverage`

| 脚本                             | 验证内容                                                                                                                                | 阻断性     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage`（内联） | UI i18n 键覆盖率 ≥ 65%                                                                                                                  | 是         |
| `check-ui-value-drift`（内联）   | 重写后的英文**值**不会留下过时的翻译                                                                                                    | 是         |
| `check-new-key-coverage`（内联） | **新增**的英文键已在每个语言区域中翻译——拒绝 `__MISSING__:` 标记                                                                        | 是         |
| `check-translation-ratio`        | 每个语言区域的真实翻译比例（白名单之外与英文相同/占位符/缺失的叶节点）不得超过 `config/quality/i18n-translation-baseline.json` + 宽限值 | **建议性** |

需要 `fetch-depth: 0`——值漂移门禁会将 `en.json` 与合并基础进行差异比较。

#### `check-ui-value-drift`——过时翻译门禁

用于捕获其他门禁在结构上无法发现的一类 i18n 回归：英文值被重写后，基于_先前_英文内容的翻译仍然保留，导致非英语用户继续读到措辞笃定、但现在已经错误的文案。

这确实曾发布到生产环境。Antigravity 登录辅助工具上线（#5203）时，`oauthModal.googleOAuthWarning` 被重写；**43 个语言区域中有 39 个**仍保留着要求操作人员“复制完整 URL 并粘贴到下方”的文本——对于该提供者，此流程根本无法完成。直到 #8463 才发现这一问题，原因如下：

- `sync-ui-keys` 只会回填**缺失**的键，而不会处理**过时**的键；
- `check-ui-keys-coverage` 统计键的_存在性_，因此过时翻译也会被算作已覆盖；
- `check-translation-drift` 跟踪的是 `docs/i18n/<locale>/**.md` 文档镜像——它从不读取 `src/i18n/messages/*.json`。自 2026-09 重新同步后，作业 `docs-sync-strict` 会进行阻断：编辑核心文档 → `npm run i18n:run -- --files=<doc>`（按章节执行，成本低）。

**感知差异，而非基于基线。** 它会将合并基础处的 `en.json` 与工作树进行比较；对于英文值发生变化的每个键，任何仍保留未改动翻译的语言区域都会被视为过时。这会刻意**冻结既有债务**——差异无法揭示长期存在的翻译源自哪个旧英文版本，因此门禁只判断当前变更所触及的内容。另一种方案（为每个键维护哈希基线）会产生约 600 KB 的生成文件，是现有最大基线的 3 倍，并且每个 i18n PR 都会引起文件变动。

有两种方式可以满足该门禁：

1. 更新受影响的翻译，或者
2. 将其设置为 `__MISSING__:<new english>`——运行时随后会提供修正后的英文
   （`src/i18n/request.ts::deepMergeFallback`，#7258），并将该键加入待翻译队列。

如果字符串的**含义**发生变化，建议优先**重命名该键**：新键无法继承过时翻译。这正是 #8463 所采用的模式。

```bash
npm run i18n:check-value-drift          # 严格模式（CI 运行的模式）
npm run i18n:check-value-drift:warn     # 仅报告
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

当无法读取基础目录（浅克隆且没有基础引用）时，以 `SKIP reason=base-unresolved` 和退出码 0 结束，与 `check-openapi-breaking` 的行为一致。

### 作业：`i18n`

完整的 i18n 验证矩阵（每个语言区域对应一个作业）。整个作业均为建议性。

| 脚本                            | 验证内容                 | 阻断性                                               |
| ------------------------------- | ------------------------ | ---------------------------------------------------- |
| `validate_translation.py quick` | 每个语言区域的翻译完整性 | **建议性**（整个作业设置 `continue-on-error: true`） |

### 作业：`pr-test-policy`

仅在拉取请求中运行。

| 脚本                   | 验证内容                                                                                                 | 阻断性 |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | 修改 `src/`、`open-sse/`、`electron/` 或 `bin/` 中生产代码的 PR 必须包含或更新测试（硬性规则 #8）        | 是     |
| `check:test-masking`   | 发生更改的测试文件不会减少断言净数量，也不会添加 `assert.ok(true)` 这类恒真断言                          | 是     |
| `check:pr-evidence`    | PR 正文引用了与变更相关的测试/VPS 证据（通过 grep PR 文本将硬性规则 #18 机制化——较为脆弱，参见待办事项） | 是     |

### 作业：`test-vitest`

在 `build` 之后运行。失败时阻止合并。

| 测试套件         | 验证内容                                                  | 阻断性                                                                     |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| `test:vitest`    | MCP 服务器（110 个工具）、autoCombo、缓存 — vitest 运行器 | 是                                                                         |
| `test:vitest:ui` | UI 组件测试 — vitest 运行器                               | **阻断** — `vitest.config.ts` 中已明确排除既有失败；新增失败会导致作业失败 |

### 每夜工作流（定时运行，建议性）

这些工作流按 cron 计划运行（也可通过 `workflow_dispatch` 触发），绝不会在 PR 上运行。它们均为建议性工作流。

| 工作流                 | 验证内容                                                                                                                            | 阻断性     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | 使用随机种子和高运行次数的 fast-check 属性测试                                                                                      | **建议性** |
| `nightly-resilience`   | 堆增长门禁、混沌故障注入、k6 负载/浸泡测试                                                                                          | **建议性** |
| `nightly-llm-security` | promptfoo 注入防护（阻止模式）+ garak 探测（没有提供者密钥时跳过）                                                                  | **建议性** |
| `nightly-schemathesis` | 使用 `docs/openapi.yaml` 针对实时 OmniRoute 执行 OpenAPI 契约模糊测试（schemathesis）— 揭示规范违规/未处理的 500 错误（Fase 8 B.4） | **建议性** |
| `nightly-mutation`     | 对快速单元测试通道执行 Stryker 变异测试评分 — 存活的变异体会暴露薄弱的断言                                                          | **建议性** |
| `nightly-compat`       | 覆盖所支持 `engines.node` 范围的 Node 引擎兼容性矩阵                                                                                | **建议性** |

---

## 速度优先阶段（2026-08-30 → v4.0 LTS）：所有基线放宽 20%

负责人决定（2026-08-30）：在 v4.0 模块化完成之前，交付速度比守住技术债务红线更重要。所有**数值型**棘轮基线均在一次可审计操作中放宽 20%，并在 `config/quality/quality-baseline.json` 中声明此阶段：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 变更内容                                                                                                                                                   | 位置                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 越低越好的计数 ×1.2，越高越好的百分比 ÷1.2（覆盖率下限保持为 60，`eslintErrors` 保持为 0，`eslintWarnings` 从 0 → 冻结抑制数量的 20%） | `quality-baseline.json`（`_relax_velocity_2026_08_30` 注释列出了每一项变更前 → 变更后的值）            |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                           | `complexity-baseline.json`、`duplication-baseline.json`                                                |
| `cap`、`testCap`、每个 `frozen[*]` / `testFrozen[*]` 行数上限 ×1.2                                                                                         | `file-size-baseline.json`                                                                              |
| 每文件 / 每 TS 代码计数 ×1.2                                                                                                                               | `api-typecheck-baseline.json`、`dashboard-typecheck-baseline.json`、`open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| 当 `_policy.requireTighten === false` 时，`--require-tighten` 改为仅提供建议                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 暂停夜间 `bank-ratchet-shrinks`（否则它会将测得的缩减固化到基线中，从而抵消预留空间）                                                                      | `.github/workflows/nightly-release-green.yml`                                                          |

允许列表（`eslint-suppressions.json`、`test-masking-allowlist.json`、`test-discovery-baseline.json`
等）**不是**预算，因此未作修改。通过/失败策略门禁（密钥、SQL 规则、文档/环境契约、i18n 一致性、单元测试）保持不变——失败的测试仍然是失败的测试。

**工具**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` —
  一次性放宽操作（`scripts/quality/relax-baselines.mjs`）；拒绝以相同注释重复运行。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  按照 CI 的方式测量每个数值门禁，并输出各门禁的剩余空间
  （`scripts/quality/baseline-headroom.mjs`）。夜间 `baseline-headroom` 作业会将表格发布到持续更新的议题
  **📈 基线剩余空间（速度优先阶段）**，并在任何门禁距离其上限不足 10% 或已经超限时添加
  `headroom-alert` 标签。该议题是早期预警机制：如果预算在几天内耗尽，说明放宽出来的空间正被
  少数几个 PR 消耗，而不是由整个团队使用——请查看违规门禁的 `_rebaseline_*` 注释。

**新代码模式（Clean-as-You-Code）— 自 2026-08-30 起，仅用于 PR 快速路径**

在 `pull_request` 事件中，`quality.yml` 会将 `--base-ref <PR base SHA>` 传递给 `check:file-size`、
`check:complexity-ratchets` 和 `check:dead-code`。在此模式下，门禁会比较 HEAD 与
merge-base，且**仅限于 PR 修改过的文件**（`scripts/check/newCodeMode.mjs`：在临时
`git worktree` 中具体化 merge-base，分别在其中和 HEAD 上运行 ESLint/knip，然后对每文件计数求差）：

- **阻断性** — PR 在其修改的文件中新增了圈复杂度/认知复杂度违规或死导出
  （日志中的 `complexityNewCode=`、`cognitiveComplexityNewCode=`、`deadExportsNewCode=`）；
- **建议性** — 全局总数与冻结基线的比较。继承而来的偏移绝不会使无辜的 PR 变红；
  该偏移会在发布对账时重新冻结，并由剩余空间作业监控。

`workflow_dispatch` 运行、release-green 全面检查和夜间剩余空间作业没有 PR 基准，
因此继续进行绝对（全局）比较。覆盖率、重复率和类型覆盖率目前仍保持全局比较
（相应工具无法以较低成本生成每文件差异）——它们是后续采用相同处理方式的候选项。

**在 v4.0 结束此阶段（LTS = 比以前更严格，而不是“恢复正常”）**

1. 在纯净的 `release/v4.0.0` 最新提交上：先运行 `npm run quality:headroom --json` 以留档，然后运行
   `npm run quality:ratchet -- --update`、`check:file-size --update`、
   `check:complexity-ratchets --update`、`check:dead-code --update`，以及每个类型检查门禁的
   `--update`——将每个基线都降低到实测值。
2. 从 `quality-baseline.json` 中删除 `_policy`（重新启用 `--require-tighten` 和夜间
   结余机制），并在 `check-openapi-coverage.mjs` 中将 `THRESHOLD = 36` 恢复（或提高）。
3. 对模块化已取得成效的部分，将限制收紧到低于实测值：将文件大小 `cap` 恢复为 1000
   （或 800），覆盖率下限提高 5，模块化包的无用导出数设为 0。

## 棘轮基线（`quality-baseline.json`）

棘轮引擎（`scripts/quality/check-quality-ratchet.mjs`）读取 `quality-baseline.json`，
并将其与最新收集的 `quality-metrics.json` 进行比较。任何退化幅度超过其 epsilon 的指标
都会导致构建失败。

当前跟踪的指标：

| 指标                  | 方向   | 含义                    |
| --------------------- | ------ | ----------------------- |
| `eslintWarnings`      | `down` | ESLint 警告数量不得增加 |
| `coverage.statements` | `up`   | 语句覆盖率不得下降      |
| `coverage.lines`      | `up`   | 行覆盖率不得下降        |
| `coverage.functions`  | `up`   | 函数覆盖率不得下降      |
| `coverage.branches`   | `up`   | 分支覆盖率不得下降      |

若指标确实有所改善，请按以下方式更新基线：

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` 标志会将当前测量值写入 `quality-baseline.json`。
请将此文件与改进该指标的变更一同提交。若 PR 改进了某项指标却未更新基线，
`--require-tighten` 将检测到这一情况（Fase 6A.5，尚待实现）。

### CodeQL 棘轮：刷新频率和手动触发

`check:codeql-ratchet` 读取的是**按计划刷新，而非每个 PR 都刷新的仓库状态。**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` 报告
`state: configured`、`schedule: weekly`：这是 GitHub 的默认设置扫描，而非每次推送时
都执行的分析。因此，在修复警报的 PR 合并后，棘轮会继续读取旧的、更高的数量，
直到下一次计划扫描运行——在扫描结果更新前，它会在每个打开的 PR 上报告退化，
包括修复该问题的 PR 自身的后续 PR。

**手动刷新**：`gh workflow run codeql.yml --ref release/vX.Y.Z` 会重新运行
分析，并在几分钟内重新发布警报。请先阅读 `.github/workflows/codeql.yml`——
其文件头说明，该工作流仅支持 `workflow_dispatch`，**因为它与 GitHub 的“默认设置”冲突**
（`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`）。
恢复 `push`/`pull_request`/`schedule` 触发器前，**仓库所有者必须先执行一项操作**：
Settings → Code security → CodeQL: Default → Advanced。在完成此切换之前，不要添加
`schedule:` 触发器——否则只会产生失败的运行。

**数量下降后收紧基线**——`node scripts/check/check-codeql-ratchet.mjs
--update` 会将新的测量数量写入 `quality-baseline.json` →
`metrics.codeqlAlerts.value`，这样棘轮就不会悄然允许警报数量回升到旧的上限。
实际示例（2026-09-02/03）：PR #12502 修复了 7 个真实警报
（测得的未关闭警报从 13 降至 6）；PR #12530 将冻结的基线从 11 收紧至 6，以与之匹配；
随后为剩余 6 个警报逐一提供理由并将其驳回，使未关闭警报数量降至 0。

**驳回警报由操作人员决定（硬性规则 #14）**——若未在驳回评论中记录技术理由，
绝不可驳回 CodeQL 警报：上游协议要求使用 `won't fix`，测试夹具使用 `used in tests`，
CodeQL 无法识别的清理程序使用 `false positive`
（先例：`docs/security/ERROR_SANITIZATION.md`）。

---

## 测试重试策略（WS5.4，v3.8.49）

重试策略按 runner 分别设置，绝不进行全局无差别重试——无差别重试会将真实回归变成不可见的不稳定问题：

| Runner            | 策略                                                                                               | 原因                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Playwright (e2e)  | 仅在 CI 中设置 `retries: 1`，并启用 `trace: on-first-retry`                                        | 浏览器/网络时序确实具有不确定性；进行一次带跟踪的重试，可将不稳定问题转化为可诊断的产物 |
| Vitest            | 不进行全局重试。经证实存在不稳定性的测试会显式设置单测试重试（在 diff 中可见，并在 PR 中接受审查） | 将隔离列表保留在仓库中，绝不使其变得不透明                                              |
| node:test（单元） | 任何情况下都不重试                                                                                 | 不稳定的单元测试就是测试本身的缺陷——修复它，不要靠重新运行碰运气                        |

不稳定性遥测上线后的目标 SLO（WS5.2/5.3）：每个测试的不稳定率 <1%
（“立即修复”阈值），每条流水线的通过率 ≥95%。这些是行业参考值——
应根据我们自己的测量结果重新校准。

## 发布级棘轮漂移（WS5.5，v3.8.49）

当棘轮指标（文件大小、复杂度、eslint 警告）在纯净发布
tip 上发生回归时——即多个合并的组合导致了回归，且没有任何单个 PR 能在
其自身分支上复现该回归——修复工作应由**发布负责人一次性在发布分支上**
完成：优先选择提取/重构；只有在添加有据可查的理由条目后，才能重新设定基线。
绝不要将组合漂移归咎于某个贡献者的 PR，也绝不要按 PR 重新设定基线（那会隐藏真实回归）。
首先进行辨别：在假定是你的 PR 导致问题之前，先在探测用 worktree 中针对纯净 tip
复现失败状态。

## 固化棘轮收缩——向下调整（#8584）

棘轮机制只有一半是自动化的，而且自动化的是错误的那一半。**提高**上限只需手动编辑
JSON，十秒钟即可完成，也是解除红色 PR 阻塞的最快方式。**降低**上限则需要有人运行
`--update` 并提交结果——而在 `bank-ratchet-shrinks` 作业上线之前，没有任何工作流会执行它。
其可测量的后果（2026-07-25）是：已有 18 个冻结文件达到或低于 800 行的新文件上限，其中最严重的
高达 132 倍（`src/shared/validation/schemas.ts` 只有 19 行，却保留着 2,523 的上限）；
复杂度上限经过约 37 条重新设定基线的说明后从 `1794 → 2169`，期间只有一次下降（−1）；
而“在下个周期通过 `--update` 收紧”这句话写了 31 次，却只兑现了一次。若某个上限在促成它的代码
已不复存在后仍被保留，就会悄无声息地将每次已完成的拆分转化为留给下一个文件编辑者的增长额度。

`nightly-release-green.yml` → 作业 **`bank-ratchet-shrinks`** 闭合了这一循环：

|        |                                                                                              |
| ------ | -------------------------------------------------------------------------------------------- |
| 运行于 | `schedule`（每天 3 次）+ `workflow_dispatch`——特意**不**在 `push` 时运行                     |
| 测量   | 最高版本的 `release/vX.Y.Z`，采用与 `release-green` 相同的解析与注入防护                     |
| 写入   | `check:file-size --update` 和 `check:complexity-ratchets --update`（两者在设计上都只能收缩） |
| 验证   | `npm run check:ratchet-bank`（`scripts/quality/verify-ratchet-bank.mjs`）                    |
| 交付   | 一个始终保持最新、以发布分支为目标的 PR——强制更新，绝不重复骚扰                              |

固化操作采用批处理而非每次 push 都执行，因为它没有时延要求（8 小时内固化收缩即可），
而每次合并都运行会在集中合并期间反复重建 PR 分支，并且每次都要承担完整 ESLint 扫描的成本。
检测仍在 push 时执行（`release-green`）；只有固化操作采用批处理。

### 安全验证器

该作业会在无人值守的情况下写入基线，因此 `verify-ratchet-bank.mjs` 是确保这种做法
可以接受的关键。它会比较执行 `--update` 后的树与 `HEAD`，并且在任何提交产生之前
**中止作业**——不会创建 PR——除非每项更改都属于以下情况之一：

- `frozen` / `testFrozen` 中的数字条目被**降低**或**移除**
- `complexity-baseline.json` → `count` 被**降低**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` 被**降低**

任何其他更改都会导致失败：提高数字、新增条目、更改 `cap`/`testCap`，或者
删除/改写 `_rebaseline_*` 说明（这些说明是记录各个上限存在原因的审计轨迹，
与文件条目一同存储在同一个 `frozen` 对象中）。
一个能够提高上限的机器人只会比现状更糟。回归防护：
`tests/unit/verify-ratchet-bank.test.ts`。

该作业绝不会推送到 `release/*`——PR 由人工合并，因此错误的测量结果无法在未经审查的情况下落地。

## 允许列表策略

每个不会因预先存在的违规而失败的门禁都使用冻结的允许列表
（例如 `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）。策略如下：

**修复根本原因；仅当违规预先存在且无法在同一 PR 中修复时，才使用允许列表。**

向允许列表添加条目时：

1. 添加注释以说明理由。
2. 引用跟踪 issue（例如，`// #3498 — 第二阶段功能，尚未实现`）。
3. 在修复该违规的同一 PR 中删除对应条目——如果某个过时条目不再
   屏蔽有效违规，则该条目本身就是缺陷（实现后，6A.3 过时规则检查会
   因孤立的允许列表条目而导致门禁失败）。

**不要**为了让测试更快通过而添加允许列表条目。门禁显示为绿色但允许列表不断增长，
只会造成质量良好的假象。

### 当你的 PR 触发门禁失败时

1. **仔细阅读门禁输出**——它会准确指出违反规则的文件或符号。
2. **修复违规**——大多数门禁都是确定性的文件系统检查，只要代码正确就会通过。
3. **如果违规预先存在**（即并非由你引入，但门禁现在开始覆盖它）：添加允许列表条目，
   并附上理由注释和跟踪 issue。
4. **如果门禁采用棘轮机制**（覆盖率、ESLint 警告、重复代码、复杂度）：
   你的更改导致指标恶化。修复根本问题；或者在极少数情况下，如果该更改是有意为之且
   指标退化可以接受，则运行 `npm run quality:ratchet -- --update`——但必须在 PR 描述中说明原因。
5. **建议性门禁**（`continue-on-error: true`）仅供参考——它们不会阻止合并，
   但会显示在 CI 摘要中。即便如此，也应修复它们。

---

## 添加新门禁

1. 创建 `scripts/check/check-<name>.mjs`（或 `.ts`）。策略门禁以 0/1 退出。
   棘轮式门禁通过 `collect-metrics.mjs` 将指标写入 `quality-metrics.json`。
2. 将 `"check:<name>": "node scripts/check/check-<name>.mjs"` 添加到 `package.json`。
3. 在 `.github/workflows/ci.yml` 的相应作业下接入它
   （策略 → `lint` 或 `docs-sync-strict`；棘轮 → `quality-gate`）。
4. 如果它有允许列表，请使用
   `scripts/check/lib/allowlist.mjs` 中的 `reportStaleEntries()`，以便自动检测过时条目。
5. 在 `tests/unit/build/` 中编写测试，覆盖该门禁的检测逻辑。
6. 更新本文档（向相关作业表格添加一行）。

---

## 智能体工具：LSP-in-the-loop（选择启用）

除 CI 门禁外，OmniRoute 还提供了一个**选择启用**的 `agent-lsp` 脚手架
（项目级 `.mcp.json`，Fase 7 Task 15）。创建 `.mcp.json`
以向编码智能体公开 TypeScript 语言服务器，使其在编写代码**之前**解析符号/
诊断信息——作为 `typecheck:core` 的“先编译再声明”配套机制，从源头减少“虚构符号”错误。
它被刻意设计为不会自动加载（你需要选择并验证 MCP↔LSP 桥接方案）；损坏的条目只会记录
连接错误，绝不会中断会话。

---

## 合理化待办清单（ROI 审查 — 阶段 9 第 3 波）

此清单已于 2026-06-17 根据 `ci.yml` 完成核对（先前版本遗漏了
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence`）。对核对后集合进行的 ROI 审查
确定了以下合理化候选项。**合并属于机械性的 CI
变更；启用/移除则属于由操作方决定的策略决策。** 以下内容均尚未实施。

**上文还未记录的项目**（仅供参考、信号较弱）：`docs-lint` 作业
（markdownlint + Vale，整个作业设置 `continue-on-error`），以及独立的扫描器工作流
`semgrep.yml` / `codeql.yml` / `scorecard.yml`。`quality-baseline.json` 中包含
`semgrepFindings: 0`，但它未与 `ci.yml` 中的阻塞式棘轮机制关联——该指标
目前处于孤立状态。

### 合并 / 去重（机械性操作，风险较低）

每个候选项均已于 2026-06-17 根据实际门禁状态完成验证（先信任、后核实）；
事实证明，若干“显而易见”的合并隐藏了技术债务，**不能**直接安全替换。

- **`check:docs-sync` 运行两次**——一次独立运行于 `lint` 作业中，另一次运行于 `check:docs-all`（`docs-sync-strict`）及 husky 的 pre-commit 钩子中。✅ **已完成**——已移除 `lint` 中的独立调用。
- **CVE 扫描**——❌ **不能直接合并。** `audit:deps` 遇到任何高危/严重 CVE 都会硬性失败；`check:vuln-ratchet`（osv）仅在相较基线出现_回归_时失败（当前为 1 个 MODERATE）。两者语义不同——移除 `audit:deps` 将失去针对高危/严重漏洞的绝对门禁。两者均保留。
- **循环依赖检测**——❌ **不能直接合并。** `check:circular-deps`（dpdm）报告了 **91 个循环**（这正是它仅作参考的原因）；在解决这些循环之前，不能将其提升为阻塞项，而且其范围比当前通过的、经过筛选的 `check:cycles` 更广。保留 `check:cycles` 作为阻塞项；解决 91 个 dpdm 循环应作为单独的待办事项。
- **复杂度**——✅ **已完成**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：仅执行一次 ESLint 遍历，按 ruleId 计数，因此圈复杂度+最大行数与认知复杂度基线仍保持独立；单独的 `check:complexity` / `check:cognitive-complexity` 仍保留，供本地执行 `--update`。
- **`/api` 防幻觉检查**——✅ **已完成**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：仅对 `src/app/api` 执行一次文件系统清点，openapi-routes + docs-symbols 仍分别独立报告；单独检查仍保留，供本地运行。
- **`check:node-runtime` 在 11 个作业中运行**——⚠️ **ROI 较低。** 每个作业都使用独立运行器，且该检查耗时不足 1 秒；总计仅节省约 10 秒，却会失去一个成本低廉的逐作业保护措施。不值得为此折腾。
- **CI lint 中的 `typecheck:noimplicit:core`**——✅ **已从 lint 作业中移除**（此前通过 `continue-on-error` 设为仅供参考）；阻塞式类型覆盖面由 `typecheck:core` + `check:type-coverage` 提供。保留本地脚本。

### 启用 / 决策（操作方策略）

- `check:openapi-security-tiers`（仅供参考）——❌ **无法直接转为阻塞。** 它以状态码 0 退出，但会警告 `LOCAL_ONLY_API_PREFIXES` 下的若干 `traffic-inspector` 路由缺少 `x-loopback-only: true` 注解。强制执行前，必须先向 `openapi.yaml` 添加这些注解。
- `typecheck:noimplicit:core`（仅供参考）——其作用大部分已被阻塞式 `check:type-coverage` 棘轮机制涵盖。应将其转为棘轮机制，或移除这个重复的第二次 `tsc` 检查。
- `test:vitest:ui`（现已**阻塞**）——预先存在的失败已在 `vitest.config.ts` 中明确排除，并附有 `// #8618` 跟踪注释；新增失败将导致作业失败。
- `check:secrets`（gitleaks，阻塞式棘轮机制固定在 3 个已记录的误报）——将这 3 个误报加入允许列表以降至 0，或将其降级为仅供参考。与 GitHub 原生机密扫描及 `check:public-creds` 存在重叠。
- `check:pr-evidence`（阻塞式，使用 grep 检查 PR 正文）——误报风险较高；若移除，将削弱对硬性规则 #18 的执行，因此这确实需要作出策略决策。
- `semgrep`（独立运行，仅供参考）——在 OWASP 类别上与 CodeQL 重叠；应将其基线接入棘轮机制，或将其移除。

---

## 相关文档

- 供应链（来源证明、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 键集合一致性门禁

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`，作业 `i18n-ui-coverage`）。
将每个 `src/i18n/messages/<locale>.json` 的叶子键集合与 `en.json` 进行比较，只要存在缺失或多余的叶子键就会失败，而不考虑该键是何时添加的。`__MISSING__:` 占位符
会被视为键已存在（其内容由比例门禁负责检查）。它是另外两个基于差异/百分比的门禁的绝对补充：`check-ui-keys-coverage` 对每个区域设置强制执行 80% 的下限
（约 13,000 个键中缺失 43 个时仍会显示为 99.7%），而 `check-new-key-coverage` 只检查
PR 添加到 `en.json` 中的键。区域设置批次是基于其分支切出当天的 `en.json` 生成的，
并会持续翻译数日，而基础分支仍在不断添加键；批次 PR 本身不会添加任何键，因此，当批次 1（#13044）合并时，九个区域设置缺少 43 个键；批次 2（#13660）合并时，八个区域设置缺少 10 个键（2026-09-15），两个同级门禁均未发出警报。可使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 修复失败；`extra` 叶子键
表示源语言中已将其删除——请从相应区域设置中删除该键。`--warn` 仅报告问题而不会使检查失败。
`--catalog=cli` 对 `bin/cli/locales` 执行相同的比较（`npm run i18n:check-keys:cli`）；
这两个步骤都位于作业 `i18n-ui-coverage` 中。

#### `check-new-key-coverage` — 新键 i18n 门禁

`check-ui-value-drift` 的同级门禁。后者用于捕获英文值被**重写**但其翻译未同步更新的情况；本门禁用于捕获英文键被**添加**但部分区域设置从未收到该键的情况。

`check-ui-keys-coverage` 无法发现此类问题：它对每个区域设置强制执行百分比下限，而在约 13,000 个叶子键中缺少 11 个键时，覆盖率仍为 99.9%。每种语言的百分比无法表达“此功能发布时未翻译”——整个功能可能在新的区域设置中完全没有文本，却根本不会改变该数字。

它所记录的事故如下：Orchestration Canvas 的第 3 阶段在当时已有的 42 个区域设置中翻译了其 11 个键。几小时后，欧盟语言批次（#13044）将仓库扩展到 51 个区域设置，而新增的九个区域设置（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）从未收到这些键。`deepMergeFallback` 会用英文替代缺失的键，因此故障表现为 UI 未翻译，而非 UI 空白——这是一个真实存在且在设计上不会发出警报的问题。

与其同级门禁一样，它也**感知差异**，会将合并基点处的英文内容与工作树进行比较，因此预先存在的缺口会保持冻结，启用该门禁无需进行迁移。

**`__MISSING__:<english>` 标记无法通过此门禁（自 2026-09-17 起）。** 它过去是文档中规定的延期处理方式——运行时会回退到正确的英文——直到 2026-09-16 的八个功能 PR 添加了 61 个键，却没有进行翻译，而是将该标记写入全部 65 个区域设置中：此门禁接受了所有这些标记，没有任何检查阻止这些 PR，随后阻塞式真实翻译比例门禁在发布分支顶端对所有人失败（pt-BR 3.2% > 2.5% + 0.5）。现在，标记会被判定为缺失翻译。可使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 修复失败，也可使用 `npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`，
可安全地脱离终端运行；如果没有 `OMNIROUTE_TRANSLATION_*` 环境变量则拒绝启动）并行处理所有区域设置。必须保留英文的键（固定的产品/引擎/标志名称）应放入 `scripts/i18n/untranslatable-keys.json`，
绝不能隐藏在标记后。`vi` 完全禁止使用标记（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 暂停测试门禁

`vitest.config.ts` 的 `exclude` 列表中的文件是不会运行的测试，而对于查看代码树的人而言，它看起来却像是覆盖率的一部分。共有 62 个文件堆积在注释
`// #8618 — 修复后移除此排除项的既有故障` 之后。问题 #8618 已于
2026-08-11 关闭，但其跟踪的列表却从 45 项增长到 62 项，每个新增项都继承了指向一个已关闭问题的注释。最终逐个文件测量该列表时（#13204），**62 个文件中有 51 个无需更改任何源代码便可针对当前代码树通过测试**。

该门禁要求每个可解析为真实文件的排除项都必须 (a) 指明一个跟踪问题，并且
(b) 出现在 `config/quality/vitest-exclusions.json` 中并附带其测量状态，因此，添加排除项会成为专用文件中可审查的差异，而不是在包含 60 项的数组中再添加一行。它刻意不会重新运行被排除的测试——这需要约 10 分钟，应由周期性作业负责；清单会记录每个测试上次测量的时间。
