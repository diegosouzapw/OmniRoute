# CLAUDE.md (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Ir-regoli kollha tal-proġett jinsabu f’[`AGENTS.md`](AGENTS.md)** — is-sors uniku tal-verità għal kull
assistent tal-IA (arkitettura, konvenzjonijiet, ittestjar, kontrolli tal-kwalità, fluss tax-xogħol ta’ git, it-23 Regola Stretta,
tagħlimiet dwar il-PII). Aqrah kollu; terġax iżżid ir-regoli tal-proġett hawnhekk. Dak kollu li ġej japplika BISS
għal Claude Code — irfinar operazzjonali tar-regoli diġà definiti f’`AGENTS.md`.

## Iżolament tal-worktree — speċifiċitajiet ta’ Claude Code

Il-protokoll obbligatorju sħiħ tal-worktree (konferma tal-fergħa bażi, il-path kanoniku
`.claude/worktrees/`, `cp -al` għal node_modules, regoli tat-tneħħija) jinsab f’`AGENTS.md` → Git Workflow → "Worktree
isolation". Punti speċifiċi għal Claude Code:

- Ikkonferma l-fergħa bażi mal-operatur permezz ta’ `AskUserQuestion` (Regola Stretta #19), sakemm
  ma jkunx diġà qallek.
- Ippreferi l-għodda nattiva `EnterWorktree` — din diġà toħloq worktrees taħt
  `.claude/worktrees/` (il-path kanoniku). Oħloq il-worktree bil-kmand dokumentat `git
worktree add`, imbagħad sejjaħ `EnterWorktree` bil-`path` tiegħu.

## Sikurezza bejn is-sessjonijiet — speċifiċitajiet ta’ Claude Code

Ir-Regoli Stretti #19/#21/#22 (f’`AGENTS.md`) jirregolaw sessjonijiet paralleli. Tfakkiriet operazzjonali għal dan
il-harness:

- **Irreplika l-projbizzjoni ta’ `git stash` kelma b’kelma fil-prompt ta’ kull subagent li juża git**
  (għodda Agent / skripts tal-Workflow) — is-subagents ma jirtux dan il-fajl, u r-rikorrenza rreġistrata
  tal-inċident ta’ stash seħħet permezz ta’ subagent.
- Qabel ma tagħmel merge jew push għal kwalunkwe PR li ma ħloqtx _f’din is-sessjoni_, ħaddem `git worktree list`
  u erġa’ ċċekkja `gh pr view <N> --json state,headRefOid` (Regola Stretta #22b).
- Temm kull sessjoni bil-checkout ewlieni fuq il-fergħa li beda fuqha.

## Superpowers / artefatti tal-ippjanar — sostituzzjonijiet tal-paths

Il-konvenzjoni `_tasks/` hija definita f’`AGENTS.md` → "Planning & Research Artifacts". Il-ħiliet
ta’ superpowers jiġu b’valuri predefiniti li jindikaw `docs/…` — dawk il-valuri predefiniti huma **sostitwiti
hawnhekk**. Meta ħila ta’ superpowers tħabbar path bħal "issejvjat f’`docs/superpowers/plans/…`",
ibdlu għall-ekwivalenti f’`_tasks/…` qabel tikteb:

| Artefatt (ħila)                                | Valur predefinit (TUŻAHX) | Minflok, issejvja hawnhekk                                    |
| ---------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Pjanijiet (`writing-plans`)                    | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Speċifikazzjonijiet / disinn (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Riċerka (`deep-research`, ad-hoc)              | `docs/research/`          | `_tasks/research/…`                                           |
| Trasferimenti (`/handoff`)                     | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Agħmel commit ta’ dawk l-artefatti fir-repo `_tasks/` (`git -C _tasks …`), qatt fir-repo ewlieni.

## Fajls temporanji / tax-xogħol — uża `_artifacts/`, mhux `/tmp`

Dan il-proġett jissostitwixxi l-iscratchpad predefinit tas-sessjoni tal-harness (`/tmp/claude-*/…`). Ikteb
fajls temporanji/tax-xogħol — esportazzjonijiet, zips iġġenerati, outputs intermedji ta’ darba, kull ħaġa li
normalment tqiegħed f’`/tmp` — f’`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` minflok.

- `_artifacts/` huwa path `_*` fl-għerq: diġà huwa gitignored (`AGENTS.md` → "Root `_*` paths"), u jinsab
  biss fuq id-diska, qatt ma jiġi tracked.
- Raġuni: iż-żamma tal-output temporanju ġewwa l-proġett (minflok f’`/tmp`) tagħmilha faċli ħafna għall-operatur
  biex isib u jħassar kollox temporanju f’post wieħed, minflok ifittex f’direttorji `/tmp`
  effimeri u speċifiċi għas-sessjoni li jisparixxu jew jakkumulaw mingħajr ma jiġu tracked.
- **Tħawwadx** dan ma’ `_tasks/` (Regola Stretta #23, ir-repo git privat tiegħu stess għal
  pjanijiet/speċifikazzjonijiet/riċerka/trasferimenti dejjiema) — `_artifacts/` huwa għal fajls tax-xogħol li jistgħu jintremew biss; xejn
  hawnhekk ma jeħtieġ jibqa’ jew jiġi verżjonat.

## Base-green qabel tiftaħ PRs

Qabel toħloq fergħa jew tiftaħ PR, ħaddem il-kontroll base-green (`AGENTS.md` → Git Workflow →
"Base-green check"; il-ħiliet tal-proġett jirreferu għalih bħala `.agents/skills/_shared/base-green.md`). PR
li jinfetaħ meta l-aħħar punt tal-base ikun aħmar irid jinkludi `⚠️ base-red inherited: #<issue>` fil-body tiegħu. Biex
tneħħi stat aħmar akkumulat (l-aħħar punt tal-base + PRs ħomor), uża l-ħila `/sweep-reds`.
