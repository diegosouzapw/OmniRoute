# Merge Queue & Manual Merge-Train Runbook (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

自 v3.8.49（质量/速度计划的 WS3.2/WS3.4）起，经评审的 PR 合并到
`release/vX.Y.Z` 的默认路径是 **Mergify 合并队列**（`.mergify.yml`）；
下文记录的**手动合并列车**是备用方案——用于发生事故、
发布冻结期间，或 Mergify Open Source 计划发生变化时。

## 默认路径：Mergify 队列

1. PR 已由各活动完成审查并确认通过，同时通过所有者的合并前 ⭐
   门禁（报告 + 逐项决策——参见 `/merge-prs` 步骤 0.75）。
2. 所有者（或依据所有者决策执行操作的会话）添加 **`queue`**
   标签。该标签即代表合并批准；Mergify 仅负责执行。
3. Mergify **串行**验证排队的 PR（每次一个），依据快速门禁进行检查并合并（squash）。批处理 + 自动二分定位属于 Mergify 付费层级
   （免费计划中提示“Cannot use Merge Queue batch”，#7220），因此 `.mergify.yml` 未设置
   `batch_size`；批处理仍由下文的手动合并列车负责。如果某个 PR 的检查在 `checks_timeout`（240 分钟，即实测
   `quality.yml` p95 的 2 倍）后仍处于待处理状态，则会被移出队列，而不是阻塞整个队列。
4. 合并后，持续发布绿色验证工作流会在推送时验证新的分支尖端；如果该组合出现回归，则创建归因问题（绝不自动回滚）。

防护规则（与 `CLAUDE.md` 强制规则 #21/#22 一致）：

- **发布冻结已开启** → 不要为目标为冻结分支的 PR 添加标签；应先将其目标调整为活跃的
  `release/vX+1`。
- **另一会话正在处理的 PR** → 绝不为其添加标签；只有所属会话才能将自己的工作加入队列。
- 仅含测试变更的差异和带 `hotfix` 标签的 PR 已运行精简版 CI（参见
  `RELEASE_CHECKLIST.md` → 热修复快速通道）；队列条件会接受实际运行的任何检查集
  （`#check-failure=0` + `#check-pending=0`）。

## 备用方案：手动合并列车

在队列不可用时使用。这将 v3.8.47 周期中一天内处理完 33 个 PR 的实践
规范化：

1. **组装批次**（约 10–30 个已评审并批准的 PR）。检查 `linked:` 冲突
   （相同的 `tap.testFiles`、相同的 CHANGELOG 代码块），并将这些 PR 串行处理。
2. **仅验证一次**：在从发布分支顶端创建的隔离 worktree 中，本地合并批次中的所有
   head，然后运行与发布等效的测试套件
   （`npm run check:release-green`；发布前添加 `--with-build`）。
   `scripts/release/merge-train.sh <base> <PR#>…` 会自动执行步骤 1–2（有冲突的
   PR 会被移出，列车继续运行）。完整模式运行 `npm run test:unit`——即
   针对机器调优的运行器（`--test-concurrency=20`），**而不是**两个顺序执行的 4 核 CI
   分片；后者曾导致主要阶段仅使用约 16 核机器 25% 的资源（已于
   2026-07-18 修复）。`--fast`（用于日内大型列车的快速清空，所有者于 2026-07-18 批准）
   会保留所有静态门禁和 vitest，但仅运行已上车 PR 所更改的 node:test 文件；
   每天仍必须在累积后的分支顶端至少运行一次完整套件
   （至少有一趟列车不使用 `--fast`）。
3. **通过** → 依次合并各 PR（每次合并前重新检查 `state,headRefOid`——
   head 已移动的 PR 必须重新进入评审）。证明每次合并的净差异仅包含该
   PR 自身的更改（禁止通过自动解决冲突造成还原：使用 `git diff --stat`
   审核超出范围的删除）。
4. **失败** → 将批次对半二分（分别验证每一半），而不是逐个重新验证；
   将有问题的 PR 连同证据退回评审队列。
5. **绝不允许**：在冻结期间合并到冻结分支；在任何位置使用 `git stash`；
   为了让失败结果消失而无差别地重新运行 CI（规则：失败结果就是信息）。

## 分层（为什么仅使用快速门禁的队列仍然安全）

- **每个 PR**（quality.yml 快速门禁）：TIA 影响的测试 + 完整的 4 分片单元测试 +
  vitest + lint 检查集合 + 类型检查 + 文档/变更日志完整性检查。
- **每个批次/分支顶端**（持续发布转绿）：每次推送到
  发布分支时运行 `--quick` 硬性门禁；每天 3 次运行完整的 `--with-build --full-ci` 扫描。
- **每次发布**（发布 PR 上的 ci.yml）：完整矩阵，包括 E2E ×9、
  包产物 + tarball 启动冒烟测试、覆盖率/棘轮检查。

没有任何内容的验证程度低于以前——繁重的验证范围只是改为按批次/分支顶端运行，
而不是按 PR 运行；这正是消除 O(N) 往返过程的方式。

## `merge-train.sh` 的全新检出先决条件

该脚本会先在根检出目录上运行快速失败的**预检**（在执行任何 worktree
操作之前），因此损坏的安装绝不会伪装成失败的列车：

1. 执行 `npm ci`，然后运行被 npm 阻止的 `bun` postinstall：
   `(cd node_modules/bun && node install.js)`——否则 `check:provider-consistency`
   和 `check:known-symbols`（二者均为 `bun scripts/…`）会在列车和基线上同时失败，
   且不显示违规行。
2. 不得存在无关的 `node_modules/node_modules`（重复的依赖树；React 会被加载两次，
   UI vitest 套件会立即失败）。
3. `node_modules/.bin/tsc` 必须存在且可执行（不完整的安装会缺少它）。

列车运行阻塞性的 `npm run check:cycles:ratchet`；单独运行 `npm run check:cycles`
仅用于提供建议（它会列出 SCC，即使基线健康也会以非零状态退出）。
