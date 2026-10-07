# CLAUDE.md (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**所有项目规则均位于 [`AGENTS.md`](AGENTS.md) 中**——它是每个 AI 助手在架构、约定、测试、质量门禁、git 工作流、23 条硬性规则以及 PII 经验方面的唯一事实来源。请完整阅读该文件；不要在此处重复添加项目规则。以下所有内容**仅适用于 Claude Code**——它们是对 `AGENTS.md` 中已定义规则的操作层面细化。

## 工作树隔离——Claude Code 特定说明

完整且强制执行的工作树协议（确认基础分支、`.claude/worktrees/` 规范路径、`cp -al` node_modules、清理规则）位于 `AGENTS.md` → Git 工作流 →“工作树隔离”。Claude Code 特定要点：

- 除非操作人员已经告知，否则应通过 `AskUserQuestion` 确认基础分支（硬性规则 #19）。
- 优先使用原生 `EnterWorktree` 工具——它已在 `.claude/worktrees/`（规范路径）下创建工作树。使用文档规定的 `git
worktree add` 命令创建工作树，然后以其 `path` 调用 `EnterWorktree`。

## 跨会话安全——Claude Code 特定说明

硬性规则 #19/#21/#22（位于 `AGENTS.md`）用于约束并行会话。此运行环境的操作提醒：

- **在每个会接触 git 的子代理提示词中，逐字重申 `git stash` 禁令**
  （Agent 工具/工作流脚本）——子代理不会继承此文件，而且有记录的 stash 事件复发正是由子代理引起的。
- 在合并或推送到任何并非由你在_本次会话_中创建的 PR 之前，运行 `git worktree list`
  并重新检查 `gh pr view <N> --json state,headRefOid`（硬性规则 #22b）。
- 每次会话结束时，确保主检出目录回到会话开始时所在的分支。

## Superpowers / 规划产物——路径覆盖

`_tasks/` 约定定义于 `AGENTS.md` →“规划与研究产物”。superpowers 技能附带指向 `docs/…` 的默认设置——这些默认设置在**此处被覆盖**。当 superpowers 技能声明类似“已保存至 `docs/superpowers/plans/…`”的路径时，请在写入前将其改写为对应的 `_tasks/…` 路径：

| 产物（技能）                      | 默认路径（请勿使用）      | 改为保存到此处                                                |
| --------------------------------- | ------------------------- | ------------------------------------------------------------- |
| 计划（`writing-plans`）           | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| 规范/设计（`brainstorming`）      | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| 研究（`deep-research`、临时研究） | `docs/research/`          | `_tasks/research/…`                                           |
| 交接（`/handoff`）                | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

请在 `_tasks/` 仓库内提交这些产物（`git -C _tasks …`），绝不要提交到主仓库。

## 草稿/临时文件——使用 `_artifacts/`，不要使用 `/tmp`

本项目覆盖了运行环境的默认会话暂存目录（`/tmp/claude-*/…`）。请将临时文件/工作文件——导出文件、生成的 zip、一次性中间输出，以及任何原本会放入 `/tmp` 的内容——改为写入 `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`。

- `_artifacts/` 是根目录下的 `_*` 路径：已被 git 忽略（`AGENTS.md` →“根目录 `_*` 路径”），仅存在于磁盘上，永不跟踪。
- 原因：与 `/tmp` 相比，将草稿输出保留在项目内部，可以让操作人员轻松地在一个位置找到并删除所有临时内容，而无需在会消失或不断累积未跟踪内容的临时会话专属 `/tmp` 目录中四处查找。
- 请**勿**将其与 `_tasks/` 混淆（硬性规则 #23；它是一个独立的私有 git 仓库，用于存放需要持久保存的计划、规范、研究和交接资料）——`_artifacts/` 仅用于可丢弃的工作文件，其中的任何内容都不需要保留或进行版本控制。

## 打开 PR 前确保基础分支为绿色

在创建分支或打开 PR 之前，运行基础分支绿色检查（`AGENTS.md` → Git 工作流 →“基础分支绿色检查”；项目技能将其引用为 `.agents/skills/_shared/base-green.md`）。如果打开 PR 时基础分支最新提交处于失败状态，则必须在其正文中包含 `⚠️ base-red inherited: #<issue>`。如需清理累积的失败状态（基础分支最新提交及失败的 PR），请使用 `/sweep-reds` 技能。
