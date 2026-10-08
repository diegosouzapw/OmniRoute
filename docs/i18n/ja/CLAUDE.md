# CLAUDE.md (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**すべてのプロジェクトルールは [`AGENTS.md`](AGENTS.md) にあります** — これは、すべての AI
アシスタントにとっての唯一の信頼できる情報源です（アーキテクチャ、規約、テスト、品質ゲート、git ワークフロー、23 個のハードルール、
PII に関する知見）。全文を読み、ここにプロジェクトルールを再記載しないでください。以下の内容はすべて
Claude Code にのみ適用されます — `AGENTS.md` ですでに定義されているルールを運用面で補足するものです。

## ワークツリーの分離 — Claude Code 固有事項

必須のワークツリープロトコル全体（ベースブランチの確認、`.claude/worktrees/` という正規
パス、`cp -al` node_modules、破棄ルール）は、`AGENTS.md` → Git Workflow → "Worktree
isolation" にあります。Claude Code 固有の要点：

- オペレーターからすでに指定されている場合を除き、`AskUserQuestion` を使用してベースブランチを確認してください（ハードルール #19）。
- ネイティブの `EnterWorktree` ツールを優先してください — このツールは、すでに
  `.claude/worktrees/`（正規パス）配下にワークツリーを作成します。文書化されている `git
worktree add` コマンドでワークツリーを作成してから、その `path` を指定して `EnterWorktree` を呼び出してください。

## セッション間の安全性 — Claude Code 固有事項

ハードルール #19/#21/#22（`AGENTS.md` 内）は並列セッションを管理します。この
ハーネスに関する運用上の注意事項：

- **git を操作するすべてのサブエージェントのプロンプトに、`git stash` の禁止事項を一字一句そのまま複製してください**
  （Agent ツール / Workflow スクリプト）— サブエージェントはこのファイルを継承せず、記録されている
  stash インシデントの再発はサブエージェントを経由して発生しました。
- _このセッションで_作成していない PR にマージまたは push する前に、`git worktree list`
  を実行し、`gh pr view <N> --json state,headRefOid` を再確認してください（ハードルール #22b）。
- すべてのセッション終了時に、メインチェックアウトを開始時のブランチへ戻してください。

## Superpowers / 計画成果物 — パスのオーバーライド

`_tasks/` の規約は `AGENTS.md` → "Planning & Research Artifacts" で定義されています。
superpowers スキルには `docs/…` を指すデフォルト設定が含まれていますが、それらのデフォルトは**ここでオーバーライド
されます**。superpowers スキルが "saved to `docs/superpowers/plans/…`" のようなパスを示した場合、
書き込む前に、それを対応する `_tasks/…` のパスへ書き換えてください：

| 成果物（スキル）                    | デフォルト（使用禁止）    | 代わりにここへ保存                                            |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------- |
| 計画（`writing-plans`）             | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| 仕様 / 設計（`brainstorming`）      | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| 調査（`deep-research`、アドホック） | `docs/research/`          | `_tasks/research/…`                                           |
| 引き継ぎ（`/handoff`）              | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

これらの成果物はメインリポジトリではなく、`_tasks/` リポジトリ内でコミットしてください（`git -C _tasks …`）。

## スクラッチ / 一時ファイル — `/tmp` ではなく `_artifacts/` を使用

このプロジェクトでは、ハーネスのデフォルトのセッション用スクラッチパッド（`/tmp/claude-*/…`）をオーバーライドします。
一時ファイルや作業ファイル — エクスポート、生成した zip、一度限りの中間出力、および通常なら
`/tmp` に置くあらゆるもの — は、代わりに `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` へ書き込んでください。

- `_artifacts/` はルートの `_*` パスです。すでに gitignore の対象であり（`AGENTS.md` → "Root `_*` paths"）、
  ディスク上にのみ存在し、追跡されることはありません。
- 理由：スクラッチ出力をプロジェクト内（`/tmp` ではなく）に保持することで、消失したり未追跡のまま蓄積したりする
  セッション固有の一時的な `/tmp` ディレクトリを探し回ることなく、オペレーターが
  すべての一時ファイルを一か所で簡単に見つけて削除できます。
- これを `_tasks/`（ハードルール #23、永続的な
  計画/仕様/調査/引き継ぎ用の独立したプライベート git リポジトリ）と混同しないでください — `_artifacts/` は破棄可能な作業ファイル専用であり、ここにあるものは
  永続化やバージョン管理を必要としません。

## PR を開く前にベースがグリーンであることを確認

ブランチを切るか PR を開く前に、ベースグリーンチェックを実行してください（`AGENTS.md` → Git Workflow →
"Base-green check"。プロジェクトスキルでは `.agents/skills/_shared/base-green.md` として参照されています）。ベースの先端がレッドの状態で
開かれた PR は、本文に `⚠️ base-red inherited: #<issue>` を含める必要があります。蓄積したレッド状態（ベースの先端 + レッドの PR）を
解消するには、`/sweep-reds` スキルを使用してください。
