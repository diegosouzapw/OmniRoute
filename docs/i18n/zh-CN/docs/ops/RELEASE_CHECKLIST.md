# Release Checklist (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **最后更新：** 2026-08-28 — v3.8.51
> 使用 Claude Code 技能实现自动化，从而简化发布流程。
>
> **在两次发布之间保持队列/分支为绿色：**请参阅 [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> （`/green-prs` 系列 + `npm run check:release-green` + `/babysit` + nightly）。定期运行
> 这些流程——尤其是在执行此检查清单**之前**——可确保发布 PR 从绿色状态开始。

## 概要

```bash
# 1. 提升版本并生成 CHANGELOG（技能）
/version-bump-cc patch    # 或 minor/major

# 2. 在本地运行质量门禁
npm run check              # lint + 测试
npm run test:coverage      # 完整覆盖率门禁（60/60/60/60）

# 3. 构建并进行冒烟测试
npm run build
npm run test:e2e           # 可选，但建议运行

# 4. 生成发布（技能）
/generate-release-cc

# 5. 部署（技能）
/deploy-vps-both-cc        # 或 akamai-cc / local-cc

# 6. 捕获发布证据（技能）
/capture-release-evidences-cc
```

## npm 可信发布（自 v3.8.51 起为默认方式）— 按需暂存，直接发布作为后备方案

默认情况下，`npm-publish.yml` 通过 **npm 可信发布（OIDC）**进行发布：
`stage-npm` 作业（由 GitHub 托管）会在该次运行中使用 GitHub 的 id-token 换取一个短期 npm
凭证——仓库机密中无需保存长期 npm 令牌，无需进行 2FA 提示，并附带来源证明。
如今，可绕过 2FA 的令牌正在被逐步淘汰，这正是 npm 批准的绕过方式；
它恢复了项目截至 v3.8.48 所采用的全自动流程，同时保留
WS1.3 保证（泄露的令牌无法单独执行发布——因为根本不存在令牌）。

**一次性设置（所有者）：**npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub：owner `diegosouzapw`、repo `OmniRoute`、workflow `npm-publish.yml`
（environment：none）。在完成该设置之前，自动步骤将以 `ENEEDAUTH` 失败：
请使用 `publish_mode=staged`（见下文）或 `direct` 重新分派。

### 暂存发布（按需使用 — `publish_mode=staged`）

npm-publish 工作流不再直接发布：它会启动打包后的 tarball
（`check:pack-boot`），然后运行 `npm stage publish`——完全相同的字节会被暂存在
注册表中，但在所有者批准之前**无法安装**。人工 2FA 门禁已移至验证之后，
而非验证之前。

**工作流变为绿色后，所有者执行的流程：**

1. `npm stage list omniroute`——查找暂存 ID（也会显示在工作流摘要中）。
2. 验证暂存的字节（建议）：运行 `npm stage download <id>`，然后将下载的
   tarball 安装到临时前缀中并启动它（`npm run check:pack-boot` 会在 CI 中自动执行
   相同的打包→安装→启动判定）。
3. `npm stage approve <id>`——2FA 提示本身即为发布操作。`npm stage reject <id>` 会将其丢弃。
4. 发布后安全网：发布后验证器（v3.8.49 计划中的 WS1.4）会在干净的容器中从
   公共注册表安装已发布的版本并启动它。

**紧急后备方案：**通过 `workflow_dispatch` 并设置 `publish_mode=direct`，可恢复
旧版的即时 `npm publish`（仅当暂存功能本身出现异常时使用；需记录原因）。

**一次性加固（所有者，npmjs.com）：**为
`omniroute` 配置仅暂存模式的 Trusted Publisher，使泄露的长期令牌无法从任何位置直接执行
`npm publish`——CI 只能暂存；只有所有者的 2FA 才能正式发布。

**损坏制品处理手册（未更改）：**默认应立即执行
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
（数分钟内生效、可逆）；仅可在 72 小时/无依赖项的窗口期内使用 `npm unpublish`，
且绝不能将其作为首选操作。Docker：切勿重写版本标签——回滚是将
`latest` 重新指向最后一个正常的摘要。

**Docker Hub `latest`（每次发布稳定 SemVer 版本时均为必需）：**
`docker-publish` 工作流必须同时标记 **`X.Y.Z`**，并且在
`should-promote-latest.sh` 确认该版本是最高的稳定 SemVer 时，还必须使用
**相同的摘要**标记 `:latest`。作业完成后：Hub 中 `latest` 的摘要必须等于新的
SemVer 摘要，且 `last_updated` 已更新。不要让 `:latest` 继续指向较旧的
构建，而发布说明却在介绍仅存在于 git 中的修复。Compose
快速入门使用 `:latest`；GitOps 应继续固定到 `X.Y.Z`。请参阅
[Docker 发布通道](../guides/DOCKER_GUIDE.md#release-channels)和 #10317。

## 热修复快速通道（标签 `hotfix`）

带有 `hotfix` 标签的 PR 会跳过繁重的 CI 矩阵（9 分片 E2E、覆盖率棘轮、
质量门禁、扩展质量检查），并保留快速且高信号的门禁：构建、
单元测试分片、集成测试、vitest、lint/类型检查、文档同步、`check:pack-artifact`
以及 tarball 启动冒烟测试（`check:pack-boot`）。目标：在 ≤15 分钟内通过，而不是约 33 分钟。

**准入策略——必须同时满足以下四项（参考 Chromium/VS Code/Node 紧急通道）：**

1. **严重程度**：生产环境已中断——已发布的制品在启动时崩溃 /
   安全修复 / 此版本的所有用户均受影响。“重要”不等于“中断”。
2. **权限**：只有仓库所有者可以添加 `hotfix` 标签。该标签本身即表示
   批准——绝不可在活动 PR 上自行使用。
3. **证据**：PR 正文须链接到上一次繁重套件完全通过的运行记录（即被跳过的
   作业原本会重新验证的套件），以及针对该修复先失败后通过的测试。
4. **范围**：仅限 cherry-pick——只包含最小修复，不得重构，不得夹带其他更改。

被跳过的覆盖率/棘轮检查范围会由发布分支上的下一次完整运行重新验证
（持续保持发布分支为绿色）——该通道只跳过等待，绝不跳过验证。
仅测试的差异（所有文件均位于 `tests/` 下，且均不位于 `tests/e2e/` 下）会自动跳过 E2E
矩阵，无需任何标签。

## 详细检查清单

### 发布前

- [ ] 此版本目标范围内的所有 PR 均已合并到 `release/vX.Y.0`
- [ ] 此版本所有未关闭的 Linear/issue 条目均已关闭或推迟到下一个里程碑
- [ ] `release/vX.Y.0` 分支上的 CI 已通过
- [ ] 代码中没有 `TODO(release)` 标记：`grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 基础镜像已更新至最新版本（当前为 `node:24.15.0-trixie-slim`）

### 版本与变更日志

- [ ] 运行 `/version-bump-cc <patch|minor|major>`（Claude Code 技能）
  - 更新 `package.json`、`electron/package.json` 中的版本
  - 根据自上一个标签以来的 git 提交重新生成 `CHANGELOG.md`
  - 更新 README.md 徽章
- [ ] 手动审查 CHANGELOG.md，并根据需要清理提交消息
- [ ] 确保 `CHANGELOG.md` 中最新的 semver 章节与 `package.json` 版本一致
- [ ] 将 `## [Unreleased]` 保持为变更日志的第一个章节，用于记录后续工作
- [ ] 更新 `docs/openapi.yaml` → `info.version` 必须与 `package.json` 版本一致

### 代码质量

- [ ] `npm run lint` — 0 个错误（警告为既有问题）
- [ ] `npm run typecheck:core` — 无问题
- [ ] `npm run typecheck:noimplicit:core` — 无问题（严格模式）
- [ ] `npm run check:cycles` — 无循环依赖
- [ ] `npm run check:any-budget:t11` — 在预算范围内
- [ ] `npm run check:route-validation:t06` — 无问题
- [ ] `npm run check:node-runtime` — 满足支持的最低运行时要求（`>=22.22.2 <23`、`>=24.0.0 <27`，依据 `src/shared/utils/nodeRuntimeSupport.ts` 中的 `SUPPORTED_NODE_RANGE`；与 `package.json` 的 `engines` 保持一致）

### 测试

- [ ] `npm run test:unit` — 通过
- [ ] `npm run test:vitest` — 通过（MCP 服务器、autoCombo、缓存）
- [ ] `npm run test:coverage` — 满足 60/60/60/60 门禁（语句/行/函数/分支）
- [ ] `npm run test:integration` — 通过（如果更改涉及数据库 / 处理程序）
- [ ] `npm run test:combo:matrix` — 通过（组合策略矩阵：以确定性方式验证全部 19 种公共路由策略的选择决策；修改组合路由、策略解析或回退逻辑时运行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **可选/手动**（受门控的真实上游冒烟测试；从 VPS `root@192.168.0.15` 获取只读数据库快照；调用真实提供者，会消耗额度；绝不在 CI 中运行；未启用门控时会正常跳过）
- [ ] `npm run test:combo:live:vps` — **可选/手动**（第 3 阶段 VPS 实时冒烟测试：通过纯 Node ESM 针对实时 `.15` 服务器执行 7 个 HTTP 场景；需要 `ssh root@192.168.0.15`；仅创建/删除 `__live_test__*` 组合；调用真实提供者；绝不在 CI 中运行）
- [ ] `npm run test:e2e` — 通过（UI 更改）
- [ ] `npm run test:protocols:e2e` — 通过（MCP/A2A 更改）
- [ ] `npm run test:ecosystem` — 通过

### 钩子（已通过 Husky 验证）

Husky 钩子位于 `.husky/` 中，并会在 git 操作时自动运行。

- **pre-commit：** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push：** 快速且确定性的门禁——`npm run check:any-budget:t11 && npm run check:tracked-artifacts`（于 2026-06-13 启用）。有意排除 `test:unit`（速度较慢；由 CI 的 `test-unit` 作业覆盖）。
  - 推送发布分支前，手动运行 `npm run test:unit`。

如果钩子失败：修复根本问题，不要使用 `--no-verify` 绕过。

### Conventional Commits

所有将纳入发布的提交都必须遵循 `type(scope): subject` 格式。

**有效类型：** `feat`、`fix`、`refactor`、`docs`、`test`、`chore`、`perf`、`style`、`ci`

**有效作用域：** `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`

破坏性变更：添加 `BREAKING CHANGE:` 页脚，或在作用域后添加 `!`（例如 `feat(api)!: drop /v0`）。

### 文档

- [ ] `npm run check:docs-sync` 通过（由 pre-commit 自动运行）
- [ ] `npm run check:docs-all` 通过（总检查：docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links）
- [ ] `npm run check:env-doc-sync` 以 0 退出 — 代码 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 的环境变量约定保持一致
- [ ] `npm run check:doc-links` 以 0 退出 — 重构后没有失效的内部 markdown 引用
- [ ] 已检查 `docs/architecture/ARCHITECTURE.md` 是否与存储/运行时实现存在偏差
- [ ] 已检查 `docs/guides/TROUBLESHOOTING.md` 是否与环境变量及运维方式存在偏差
- [ ] 如果 `.env.example` 有更改：已更新 `docs/reference/ENVIRONMENT.md`
- [ ] 如果新功能包含 UI：已在 `docs/guides/USER_GUIDE.md` 中提及
- [ ] 如果新功能包含 API：已更新 `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] 如果新功能是一个模块：存在专用的 `docs/<MODULE>.md`
- [ ] 如果是破坏性变更：`docs/guides/TROUBLESHOOTING.md` 中包含迁移说明

### i18n

- [ ] `npm run i18n:check` 以 0 退出 — 翻译状态（`.i18n-state.json`）与源文档保持同步（严格模式下不存在已发生偏差的源文档；对于最后时刻的文档微调，警告模式的提示可以接受，但在打标签前应为 0）
- [ ] `npm run i18n:check-ui-coverage` 以 0 退出 — 每个 UI 语言区域均达到或超过 80% 的覆盖率下限
- [ ] `npm run i18n:sync-ui:dry` 报告全部 42 个语言区域中缺失键的数量为 0
- [ ] 如果英文源文档有更改，请在打标签前运行 `npm run i18n:run`（需要在 `.env` 中设置 `OMNIROUTE_TRANSLATION_API_KEY`）
- [ ] 如果翻译变更较小，可以推迟到下一个版本（在 CHANGELOG 中跟踪）

### 数据库迁移

- [ ] 如果 `src/lib/db/migrations/` 中有新文件：
  - [ ] 每个迁移都是幂等的（`CREATE TABLE IF NOT EXISTS` 等）
  - [ ] 迁移包装在事务中
  - [ ] 编号正确（序列中没有缺号）
- [ ] 在全新安装环境中测试：删除 `~/.omniroute/omniroute.db` 并运行 `npm run dev`
- [ ] 在现有安装环境中测试：备份数据库、运行迁移并验证架构
- [ ] 如果迁移会重写表，需正确处理 WAL 文件（`-wal`、`-shm`）

### 提供者目录（经 Zod 验证）

- [ ] `src/shared/constants/providers.ts` 的 Zod 架构在加载时有效
  - [ ] 所有提供者都包含必填字段（`id`、`label`、`kind` 等）
  - [ ] 为新的免费提供者提供了 `freeNote`
  - [ ] OAuth 提供者的 `oauthConfig` 已在 `src/lib/oauth/constants/oauth.ts` 中注册
- [ ] 如果添加了新提供者：`open-sse/executors/` 中存在对应的执行器
- [ ] 如果采用非 OpenAI 格式：`open-sse/translator/` 中存在转换器
- [ ] 模型已在 `open-sse/config/providerRegistry.ts` 中注册
- [ ] `tests/unit/` 中的单元测试覆盖提供者分类和路由

### 桌面端（Electron）

如果 `electron/` 有更改：

- [ ] `npm run electron:smoke:packaged` 通过
- [ ] 至少测试了 `:win`、`:mac`、`:linux` 中的一种构建
- [ ] 代码签名证书未过期（如果进行签名）
- [ ] `electron/package.json` 的版本与根目录 `package.json` 一致
- [ ] 如果发布到 `stable`，已更新自动更新通道指针

### 构建布局

该仓库使用三个不同的输出目录 — 切勿混淆：

| 目录      | 用途                                           | 是否跟踪            |
| --------- | ---------------------------------------------- | ------------------- |
| `src/`    | 应用程序源代码（TypeScript / TSX）             | 是                  |
| `.build/` | 构建中间产物 — `next build` 输出（`distDir`）  | 否（已被 git 忽略） |
| `dist/`   | 可发布的 npm 包 — 由 `assembleStandalone` 组装 | 否（已被 git 忽略） |

> **运维人员注意：**远程 VPS 的镜像目录仍为 `/usr/lib/node_modules/omniroute/app/`。
> 只有**仓库内**的构建输出发生了移动（`app/` → `dist/`）。部署技能会通过 rsync
> 将 `dist/` 的内容同步到远程 `app/` 目录 — 无需更改 VPS 路径。

**单次构建流程：**

```
npm run build:release
  └─ rm -rf .build dist          （清理）
  └─ next build → .build/next/   （中间产物）
  └─ assembleStandalone          （将 standalone + static + public + natives 复制到 dist/）
  └─ 写入 dist/BUILD_SHA         （HEAD 哨兵文件）
```

部署时请勿先运行 `npm run build`，再单独运行 `npm run build:cli` — 请使用
`npm run build:release`，它会通过一条命令完成干净的重新构建并生成哨兵文件。

### 构件验证

- [ ] `npm run build:release` 成功，并且 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` 检查结果干净 — 不包含 `app.__qa_backup`、`scripts/scratch`、`package-lock.json` 或其他本地残留文件
- [ ] 构建后存在 `dist/server.js`
- [ ] 可选的本地打包运行时冒烟测试：在执行 `npm run dev:candidate -- build` 后，运行 `npm run dev:candidate -- validate`，在隔离的 `DATA_DIR` 中启动已打包的 tarball，并检查 `/api/health` + `/v1/models`（参见[贡献黄金路径](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop)）

### 打标签与发布

- [ ] 运行 `/generate-release-cc`（Claude Code 技能）：
  - 创建标签 `vX.Y.Z`
  - 推送标签和分支
  - 使用变更日志正文创建 GitHub Release
  - 附加 Electron 安装程序（如果已构建）
- [ ] 或手动执行：
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 部署

部署技能使用轻量级 rsync 流程 — 不使用 `npm pack`，也不使用 `npm i -g`：

- [ ] 使用与目标匹配的部署技能：
  - `/deploy-vps-local-cc` — 本地 VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — 两者
- [ ] 部署前，确认 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] 必须在 `node_modules` 为真实目录的位置运行构建（主检出目录或执行过 `npm ci` 的工作树——不能是使用符号链接的工作树）
- [ ] 对已部署的实例进行冒烟测试：
  - 打开 `/dashboard/health` → 检查版本字符串是否与发布版本一致
  - 针对已知提供者运行 `/v1/chat/completions` 请求
  - 验证 `/api/monitoring/health` 返回处于 `CLOSED` 状态的断路器
  - 确认 MCP 传输端点有响应（`/mcp` HTTP、`/mcp-sse` SSE）

### 发布后

- [ ] 运行 `/capture-release-evidences-cc`（Claude Code 技能）
  - 捕获新功能的 WebP 屏幕截图/录屏
  - 附加到发布说明/博客文章
- [ ] 在 GitHub Discussions / Discord 中发布版本公告
- [ ] 为下一版本创建里程碑
- [ ] 如果是关键公告：置顶讨论，或将其发布到 `news.json` 以显示应用内横幅

### Radar 公开发布门槛

Radar 公告被有意提交为 `active: false`。只有在以下每一项均有证据证明已完成后，才通过单独的变更进行激活：

- [ ] 所有堆叠的 Radar PR 均已合并，且发布顶端提交的 CI 为绿色
- [ ] 在 `RADAR_ENABLED` 默认仍处于关闭状态时，部署并冒烟测试开源版 Radar 路由
- [ ] 在指定的 Radar 主机上冒烟测试 `GET /planos`、`/termos`、`/privacidade` 和 `/reembolso`
- [ ] 在私有服务中记录运营者的身份/联系方式/地址，以及经所有者批准的法律审查
- [ ] 仅在测试模式下测试 Stripe Checkout 和带签名的 webhook
- [ ] 使用获批的发件人/域名测试一次加密的事务性电子邮件投递
- [ ] 证明备份可恢复，并执行一次有人监督且设有预算上限的研究运行
- [ ] 在接受捐赠凭证前，批准 BRL/PIX 审核政策
- [ ] 仅在通过上述门槛后启用公开 Checkout，然后激活新的 `news.json` ID
- [ ] 验证首页横幅使用本地化文案，并且在旧 ID 被关闭后，新 ID 会再次出现

## 嵌入式服务冒烟测试 (v3.8.4+)

在发布任何包含嵌入式服务变更的版本之前，请验证：

### 全新数据库启动（用于发现迁移冲突 — 在 v3.8.4 热修复后添加）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 等待 10 秒以完成启动
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` 返回 `"9router"`（不能是 404，也不能是 500）。确认迁移 `071_services.sql` 已应用且初始行已写入。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 返回 3 行。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 返回 2 行（验证 `070_webhooks_kind_metadata.sql` 已应用）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` 通过 — 防止未来出现冲突。

### 9Router

- [ ] `POST /api/services/9router/install` 在 2 分钟内返回 200，并包含 `installedVersion`
- [ ] `POST /api/services/9router/start` 在 30 秒内返回 200 和 `state: "running"`
- [ ] `GET /api/services/9router/status` 报告 `health: "healthy"`
- [ ] 使用 `"model": "9router/auto/..."` 调用 `POST /v1/chat/completions` 返回 200（通过 9Router 进行端到端路由）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` 在代理内呈现 9Router 原生 UI（不使用直接指向 `127.0.0.1:port` 的 iframe）
- [ ] `POST /api/services/9router/rotate-key` 返回 `{ keyRotated: true }`，且服务干净重启
- [ ] `POST /api/services/9router/stop` 返回 200 和 `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` 返回 SSE 流，其中包含带有近期日志行的 `snapshot` 事件
- [ ] 在 PATH 中没有 `npm` 的环境里安装时，返回 500 和友好的错误消息（不包含堆栈跟踪）

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` 在 2 分钟内返回 200
- [ ] `POST /api/services/cliproxy/start` 在 30 秒内返回 200 和 `state: "running"`
- [ ] `GET /api/services/cliproxy/status` 报告 `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` 返回 200 和 `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` 返回 SSE 流

### 安全性回归测试

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` 返回 `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` 返回 `403 LOCAL_ONLY`
- [ ] 来自 `/api/services/*` 的错误响应不包含 `err.stack` 或绝对文件路径

## v3.8.0+ 检查项

在发布任何 v3.8.x 版本之前，请验证以下附加项目：

- [ ] `omniroute --tray` 可在 macOS 上启动（systray2 已安装到 `~/.omniroute/runtime/`）
- [ ] `omniroute --tray` 可在 Linux 上启动（需要 DISPLAY；若未设置，应给出友好错误）
- [ ] `omniroute --tray` 可在 Windows 上启动（使用 PowerShell NotifyIcon，无额外二进制文件）
- [ ] `omniroute config tray enable` 创建自动启动项；禁用时会将其移除
- [ ] `npm install -g omniroute@<this-version>` 执行 postinstall 时不会发生致命退出
- [ ] 更新路径会保留可选依赖项：`omniroute update --apply` 和自动更新程序
      运行 `npm install -g … --include=optional`，以确保 `optionalDependencies`（better-sqlite3、
      keytar、tls-client，以及 llmlingua SLM 栈：`@atjsh/llmlingua-2@2.0.5`、
      `js-tiktoken`）在更新后仍然存在。ultra `modelPath` SLM 层还需要
      tinybert 模型，该模型会在首次使用时自动下载到 `${DATA_DIR}/models/llmlingua`。随后，Postinstall
      (`scripts/build/colocateOptionals.mjs`) 会将 SLM 可选依赖闭包集中放置到
      `dist/node_modules` 中，使 worker 解析到唯一的 `@huggingface/transformers` ^4.2.0
      实例 — 独立 trace 仅捆绑 transformers，不包含动态导入的
      可选依赖项；若不这样做，worker 会使用根目录的 transformers 加载 llmlingua-2，
      并且 SLM 层会静默地进入故障开放状态。
- [ ] `omniroute status` 在没有 `.env` 时仍可工作（CLI 令牌路径，仅限环回地址）
- [ ] `curl http://localhost:20128/api/shutdown` 返回 401（始终受保护的路由）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 返回 401（环回保护）
- [ ] SQLite 运行时在首次运行时解析为 `bundled`（捆绑的二进制文件对当前平台有效）
- [ ] 删除 `node_modules/better-sqlite3` 时，SQLite 运行时回退到 `runtime`
- [ ] 智能 MCP 过滤器可压缩真实的 `playwright-mcp browser_snapshot` 输出（缩减幅度 ≥50%）
- [ ] 所有 10 个 `skills/omniroute*/SKILL.md` 文件均可通过 GitHub 原始内容 URL 公开获取
- [ ] 在全新设置中，入门向导显示“How It Works”层级导览步骤
- [ ] 主页仪表板的层级覆盖率组件显示已配置/已激活数量

---

## 3.9.0 LTS 切分（已在 3.8.58 中演练）

v3.8.59 之后的下一个版本是 3.9.0，其顶端提交将形成两个长期维护的分支：
`stable/v3`（v3 LTS 版本线，npm `latest`）和 `develop`（v4，版本提升至 4.0.0，npm
`nightly`）。分支/渠道模型、向前移植和标签记录在
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) 中；计划记录在 [ROADMAP](../../ROADMAP.md)（阶段 3）中。切分仅执行一次；
3.8.58 会在复刻仓库上对其进行端到端演练，而 3.8.59 则以
[GO/NO-GO 检查清单](./LTS_GO_NO_GO.md)收尾。

### 试运行（只读，可随时安全执行）

```bash
npm run release:dry-run-lts-cut                       # 实际切分：从 HEAD 创建 3.9.0，前一个标签为 v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # 固定源提交
```

`scripts/release/dry-run-lts-cut.mjs` 不执行任何操作：它会读取 git 和 `gh` 并输出
完整流程——前置条件（源可解析、前一个标签存在、`package.json` 为目标版本、有一个
`release-freeze` 议题处于开启状态、现有发布分支上没有处于开启状态的 `Release branch not green` 议题
——不存在的分支会报告 `?` 未知，而绝不会报告为绿色——Mergify `release` 队列已配置
（G11：`queue_rules`、`checks_timeout`、标签 `queue`），`release/*` 规则集仍禁止删除和强制推送，
并且 `stable/v3` 与 `develop` 尚不存在）、两个分支步骤、哪些休眠工作流的触发器和
`if:` 条件会变为真（以及哪些仍受仓库变量限制或固定为规范仓库）、预期的 dist-tags
（`latest` → 3.9.0，`next` 和 `nightly` 为空）以及回滚过程。退出码 `0` = `RESULT: READY`，
`1` = 某个阻塞性前置条件失败（`✗`），`2` = 用法错误。`--advisory <id,...>` 会将某项检查
降级为警告（`!`），但不会将其隐藏。

请在 3.9.0 发布冻结仍处于开启状态时执行实际切分的试运行——分支是在创建标签之后、
阶段 12c 解除冻结之前创建的。

### 3.8.58 演练（仅限复刻仓库）

```bash
# 1. 使用演练参数在当前顶端提交上进行试运行
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. 对复刻仓库远程执行（会拒绝 origin 或 URL 为规范仓库的任何远程；
#    每个步骤都会在终端中请求确认）
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. 在复刻仓库中运行休眠工作流（对于试运行报告固定为规范仓库的情况，
#    使用 workflow_dispatch），然后回滚
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop 版本提升提交使用 git 底层命令构建（不会触碰工作树），并提升与周期开启提交相同的
五个文件：`package.json`、`open-sse/package.json`、`electron/package.json`、
`package-lock.json` 和 `docs/openapi.yaml`。随后会在 `develop` 上创建 `[4.0.0]`
CHANGELOG 章节及其 i18n 镜像，且在其首个 PR 之前完成。该脚本绝不会更改 npm dist-tags——
请在临时软件包上演练这些操作。

### PR 预览制品（构建一次，推广相同字节）

`.github/workflows/preview-artifact.yml` 会从 PR 的头部提交构建一个生产 tarball，
并验证完全相同的构建（#8084 部分 (a)）。仅适用于同一仓库中的 PR；不会发布任何内容。

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # 或添加 `preview-artifact` 标签
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # 安装预览版本
```

该运行会执行 `npm ci`、`npm run build:release`、`npm run check:pack-artifact`，
打包 tarball，运行 `npm run check:pack-boot`（伪造密钥、临时数据目录），再次打包，并在摘要
不一致时失败；随后记录 `artifact-identity.json`（头部 SHA、基础 SHA、锁文件哈希、平台、
架构、node ABI、打包器、构建策略——`scripts/release/artifact-identity.mjs`），并在单独的
作业中为 tarball 生成证明。推广预览版本意味着安装该 tarball：绝不要从源代码重新构建。

### 切分（3.9.0，GO 之后）

1. 已在 [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) 中记录 GO。
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` 输出 `RESULT: READY`。
3. 使用试运行输出的命令，在 `origin` 上手动创建分支——该脚本会拒绝推送至 `origin`。
   若要复用已经过审查的 develop 提交，请先在 3.9.0 顶端提交上针对你的复刻仓库执行
   `--execute` 演练；它会输出两个 SHA，随后可推送相同的提交：

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 在首个 PR 合入之前保护 `stable/v3` 和 `develop`（规则集 + 合并队列）。
5. 休眠工作流会根据分支是否存在而启用：`forward-port.yml`（推送至
   `stable/v3`）、`validate-stable-pr.yml`（目标为 `stable/v3` 的 PR）和
   `nightly-v4-build.yml`（构建 `develop`）。正式启用之前，请设置
   `secrets.FORWARD_PORT_TOKEN` 仓库密钥（以便 CI 在向前移植 PR 上运行）；夜间发布会保持关闭，
   直到所有者将仓库变量 `vars.NIGHTLY_PUBLISH` 设置为 `true`，并且 npm Trusted Publishing
   接受 `nightly-v4-build.yml`。渠道解析由 `scripts/release/dist-tag.mjs` 负责，
   与 `npm-publish.yml` 使用的解析器相同。
6. 验证渠道：`npm view omniroute dist-tags --json` 显示 `latest` = 3.9.0，并且在 v4 发布前
   不存在 `next` / `nightly`。
7. 如有需要，执行回滚：`git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   和 `npm dist-tag add omniroute@3.8.59 latest`。

---

## 回滚

如果发布存在严重问题：

1. `gh release edit vX.Y.Z --prerelease`（标记为非最新版本）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（仅当用户尚未采用该版本时）
3. 或者：在 `release/vX.Y.0` 上进行热修复 → 发布补丁版本 `vX.Y.(Z+1)`
4. 立即在 GitHub Discussions 和 Discord 中发布通知

## 硬性规则

- 绝不直接提交到 `main`
- 绝不对 `main` 或 `release/*` 分支使用 `git push --force`
- 绝不跳过 Husky 钩子（`--no-verify`）
- 绝不提交密钥、凭据或 `.env` 文件
- 覆盖率必须保持在 ≥60/60/60/60（语句/行/函数/分支）
- 修改 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码时，始终包含或更新测试

## 自动同步检查

在创建 PR 之前，先在本地运行文档同步保护检查：

```bash
npm run check:docs-sync
```

CI 也会在 `.github/workflows/ci.yml` 中运行此检查（lint 作业）。
