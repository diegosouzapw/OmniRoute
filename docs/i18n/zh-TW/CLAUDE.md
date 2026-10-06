# CLAUDE.md (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

@AGENTS.md

**所有專案規則都位於 [`AGENTS.md`](AGENTS.md)**——這是每個 AI 助理在架構、慣例、測試、品質閘門、git 工作流程、23 條硬性規則及 PII 經驗方面的唯一事實來源。請完整閱讀；不要在此重新加入專案規則。以下所有內容**僅**適用於 Claude Code——也就是對 `AGENTS.md` 中既有規則的操作細化。

## Worktree 隔離——Claude Code 特定事項

完整且強制執行的 worktree 協定（基礎分支確認、`.claude/worktrees/` 標準路徑、`cp -al` node_modules、清理規則）位於 `AGENTS.md` → Git Workflow →「Worktree isolation」。Claude Code 特定事項：

- 除非操作員已告知，否則請透過 `AskUserQuestion` 確認基礎分支（硬性規則 #19）。
- 優先使用原生 `EnterWorktree` 工具——它會在 `.claude/worktrees/`（標準路徑）下建立 worktree。請使用文件記載的 `git worktree add` 命令建立 worktree，然後以其 `path` 呼叫 `EnterWorktree`。

## 跨工作階段安全——Claude Code 特定事項

硬性規則 #19/#21/#22（位於 `AGENTS.md`）規範平行工作階段。此執行環境的操作提醒：

- **在每個會操作 git 的子代理程式提示中，逐字重述 `git stash` 禁令**（Agent 工具／Workflow 指令碼）——子代理程式不會繼承此檔案，而且有記錄的 stash 事故再次發生正是源自子代理程式。
- 在合併或推送至任何並非由你在_本工作階段_建立的 PR 前，請執行 `git worktree list`，並重新檢查 `gh pr view <N> --json state,headRefOid`（硬性規則 #22b）。
- 每個工作階段結束時，都要讓主要 checkout 回到其開始時所在的分支。

## Superpowers／規劃成品——路徑覆寫

`_tasks/` 慣例定義於 `AGENTS.md` →「Planning & Research Artifacts」。superpowers 技能隨附的預設值會指向 `docs/…`——這些預設值在此被**覆寫**。當 superpowers 技能宣告類似「saved to `docs/superpowers/plans/…`」的路徑時，請在寫入前將其改寫為對應的 `_tasks/…` 路徑：

| 成品（技能）                      | 預設值（請勿使用）        | 改存於此處                                                    |
| --------------------------------- | ------------------------- | ------------------------------------------------------------- |
| 計畫（`writing-plans`）           | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| 規格／設計（`brainstorming`）     | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| 研究（`deep-research`、臨時研究） | `docs/research/`          | `_tasks/research/…`                                           |
| 交接（`/handoff`）                | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

請在 `_tasks/` 儲存庫內提交這些成品（`git -C _tasks …`），絕不可提交至主要儲存庫。

## 暫存／臨時檔案——使用 `_artifacts/`，不要使用 `/tmp`

本專案覆寫了執行環境的預設工作階段暫存區（`/tmp/claude-*/…`）。請將臨時／工作檔案——匯出內容、產生的 zip、一次性中間輸出，以及任何原本會放入 `/tmp` 的內容——改寫入 `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`。

- `_artifacts/` 是根目錄下的 `_*` 路徑：已被 git 忽略（`AGENTS.md` →「Root `_*` paths」），僅存在於磁碟上，絕不追蹤。
- 原因：將暫存輸出保留在專案內（而非 `/tmp`），可讓操作員輕鬆找到所有臨時內容並集中刪除，而不必在稍縱即逝或持續累積未追蹤內容的工作階段專屬 `/tmp` 目錄中四處搜尋。
- 請**不要**將其與 `_tasks/` 混淆（硬性規則 #23；這是獨立的私有 git 儲存庫，用於持久保存計畫／規格／研究／交接內容）——`_artifacts/` 僅供可丟棄的工作檔案使用，此處的任何內容都不需要保留或進行版本控制。

## 開啟 PR 前確保基礎分支為綠燈

在切出分支或開啟 PR 前，請執行基礎分支綠燈檢查（`AGENTS.md` → Git Workflow →「Base-green check」；專案技能將其參照為 `.agents/skills/_shared/base-green.md`）。若在基礎分支最新提交為紅燈時開啟 PR，其內文必須包含 `⚠️ base-red inherited: #<issue>`。若要清除累積的紅燈狀態（基礎分支最新提交及紅燈 PR），請使用 `/sweep-reds` 技能。
