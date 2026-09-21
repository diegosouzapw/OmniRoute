# Merge Queue & Manual Merge-Train Runbook (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

自 v3.8.49（质量/速度计划的 WS3.2/WS3.4）起，将已审核的 PR 合并到
`release/vX.Y.Z` 的默认路径是 **Mergify 合并队列**（`.mergify.yml`）；
下文所述的**手动合并列车**是备用方案——在发生事故、版本冻结期间，或 Mergify Open Source 计划发生变化时使用。

## 默认路径：Mergify 队列

1. PR 已通过各项活动的审核/绿灯检查，并通过所有者的合并前 ⭐
   门禁（报告 + 逐项决策——参见 `/merge-prs` 步骤 0.75）。
2. 所有者（或根据所有者决策执行操作的会话）添加 **`queue`**
   标签。该标签即代表合并批准；Mergify 仅负责执行。
3. Mergify 会将最多 10 个已排队的 PR 编为一批，使用快速门禁验证该批次，
   然后合并（squash）。失败的批次会被**自动二分**——经过约 log2(N) 次重新验证，
   即可隔离出导致失败的 PR 并将其移出队列；其余 PR 继续处理。
4. 合并后，持续发布绿灯工作流会在推送时验证新的分支顶端；
   如果组合变更导致回归，则创建归因 issue（绝不自动还原）。

护栏规则（对应 `CLAUDE.md` 的硬性规则 #21/#22）：

- **版本冻结已开启** → 不要为目标指向冻结分支的 PR 添加标签；应先将其目标改为
  活跃的 `release/vX+1`。
- **另一个会话正在处理的 PR** → 绝不为其添加标签；只有所属会话才能将自己的工作加入队列。
- 仅测试差异和带有 `hotfix` 标签的 PR 已运行精简版 CI（参见
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane）；队列条件会接受实际运行的任何
  检查集（`#check-failure=0` + `#check-pending=0`）。

## 备用方案：手动合并列车

在队列不可用时使用。此方案将 v3.8.47 周期中一天内清空 33 个 PR 的实践规范化：

1. **组装批次**（约 10–30 个已审核并批准的 PR）。检查 `linked:` 冲突
   （相同的 `tap.testFiles`、相同的 CHANGELOG 区块），并对这些 PR 进行串行处理。
2. **仅验证一次**：在基于发布分支顶端的隔离 worktree 中，本地合并该批次的所有
   头部，然后运行与发布等效的测试套件
   （`npm run check:release-green`；发布前添加 `--with-build`）。
   `scripts/release/merge-train.sh <base> <PR#>…` 会自动执行步骤 1–2（发生冲突的
   PR 会被移出，列车继续运行）。完整模式运行 `npm run test:unit`——即
   针对机器调优的运行器（`--test-concurrency=20`），**而不是**两个顺序执行的 4 核 CI
   分片；后者导致主导阶段仅使用约 16 核机器的 25% 资源（已于
   2026-07-18 修复）。`--fast`（用于日内大型合并列车清空，已于 2026-07-18 获所有者批准）
   会保留所有静态门禁 + vitest，但只运行已登车 PR 所更改的 node:test 文件；
   每天仍必须在累计的分支顶端上至少运行一次完整套件
   （即一次不带 `--fast` 的列车）。
3. **绿灯** → 按顺序合并 PR（每次合并前重新检查 `state,headRefOid`——
   如果 PR 的头部发生移动，则重新进入审核）。证明每次合并产生的净差异仅包含该
   PR 自身的更改（禁止通过自动解决冲突造成还原：审查 `git diff --stat`，
   确保没有超出范围的删除）。
4. **红灯** → 将批次按半二分（分别验证每一半），而不是逐个重新验证；
   将导致失败的 PR 连同证据退回审核队列。
5. **绝不允许**：冻结期间合并到冻结分支；在任何位置使用 `git stash`；
   无差别地重新运行 CI 并期望红灯自行消失（规则：红灯即信息）。

## 分层（为何仅使用快速门禁的队列仍然安全）

- **每个 PR**（quality.yml 快速门禁）：TIA 影响的测试 + 完整的 4 分片单元测试 +
  vitest + lint 集合 + typecheck + 文档/CHANGELOG 完整性。
- **每个批次/分支顶端**（持续发布绿灯）：每次推送到发布分支时运行 `--quick`
  硬性门禁；每天运行 3 次完整的 `--with-build --full-ci` 扫描。
- **每个版本**（发布 PR 上的 ci.yml）：完整矩阵，包括 E2E ×9、
  package-artifact + tarball 启动冒烟测试、coverage/ratchets。

没有任何内容的验证程度低于以往——只是将耗时较大的测试面改为按批次/分支顶端运行，
而不是按 PR 运行，这正是消除 O(N) 往返操作的方式。
