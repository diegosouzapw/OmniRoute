# CLAUDE.md (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Gbogbo àwọn òfin iṣẹ́ àkànṣe wà nínú [`AGENTS.md`](AGENTS.md)** — orísun òtítọ́ kan ṣoṣo fún gbogbo
olùrànlọ́wọ́ AI (àkópọ̀-ẹ̀rọ, àwọn àṣà, ìdánwò, àwọn ìlànà ìdánilójú dídára, ìṣàn iṣẹ́ git, àwọn Òfin Líle 23,
àwọn ẹ̀kọ́ PII). Ka gbogbo rẹ̀; má ṣe tún fi àwọn òfin iṣẹ́ àkànṣe kún ibi yìí. Gbogbo ohun tó wà nísàlẹ̀ yìí kan
Claude Code NÌKAN — àwọn àtúnṣe ìṣiṣẹ́ sí àwọn òfin tí a ti ṣàlàyé tẹ́lẹ̀ nínú `AGENTS.md`.

## Ìyàsọ́tọ̀ worktree — àwọn àlàyé pàtó fún Claude Code

Gbogbo ìlànà worktree tí ó jẹ́ dandan (ìmúdájú ẹ̀ka ìpìlẹ̀, ọ̀nà àṣẹ `.claude/worktrees/`,
`cp -al` node_modules, àwọn òfin ìparun) wà nínú `AGENTS.md` → Ìṣàn Iṣẹ́ Git → "Ìyàsọ́tọ̀
worktree". Àwọn kókó pàtó fún Claude Code:

- Jẹ́rìí ẹ̀ka ìpìlẹ̀ pẹ̀lú olùdarí nípasẹ̀ `AskUserQuestion` (Òfin Líle #19) àyàfi bí wọ́n
  bá ti sọ fún ọ tẹ́lẹ̀.
- Yan irinṣẹ́ abinibi `EnterWorktree` lákọ̀ọ́kọ́ — ó ti ń ṣẹ̀dá àwọn worktree lábẹ́
  `.claude/worktrees/` (ọ̀nà àṣẹ). Ṣẹ̀dá worktree náà pẹ̀lú àṣẹ `git
worktree add` tí a ṣàkọsílẹ̀, lẹ́yìn náà pe `EnterWorktree` pẹ̀lú `path` rẹ̀.

## Ààbò láàárín àwọn sáà — àwọn àlàyé pàtó fún Claude Code

Àwọn Òfin Líle #19/#21/#22 (nínú `AGENTS.md`) ń darí àwọn sáà tó ń ṣiṣẹ́ ní àfikún. Àwọn ìránnilétí ìṣiṣẹ́ fún
harness yìí:

- **Ṣàdàkọ ìfòfindè `git stash` ní ọ̀rọ̀ kan náà sínú prompt gbogbo subagent tó bá fọwọ́ kan git**
  (irinṣẹ́ Agent / àwọn script Workflow) — àwọn subagent kò jogún fáìlì yìí, ìṣẹ̀lẹ̀ stash tí a sì ṣàkọsílẹ̀
  pé ó tún ṣẹlẹ̀ wá láti ọ̀dọ̀ subagent kan.
- Ṣáájú pípapọ̀ tàbí títì sí PR èyíkéyìí tí ìwọ kò ṣẹ̀dá _ní sáà yìí_, ṣiṣẹ́ `git worktree list`
  kí o sì tún yẹ `gh pr view <N> --json state,headRefOid` wò (Òfin Líle #22b).
- Parí gbogbo sáà pẹ̀lú checkout àkọ́kọ́ lórí ẹ̀ka tí ó wà nígbà tí sáà náà bẹ̀rẹ̀.

## Superpowers / àwọn ohun èlò ètò — àwọn ìyípadà ọ̀nà

Àṣà `_tasks/` ni a ṣàlàyé nínú `AGENTS.md` → "Àwọn Ohun Èlò Ètò & Ìwádìí". Àwọn ọgbọ́n
superpowers ní àwọn àiyipada tó tọ́ka sí `docs/…` — a **ti fagilé àwọn àiyipada wọ̀nyẹn
níbí**. Nígbà tí ọgbọ́n superpowers kan bá kéde ọ̀nà bíi "a fi pamọ́ sí `docs/superpowers/plans/…`",
tún un kọ sí èyí tó bá a mu lábẹ́ `_tasks/…` ṣáájú kí o tó kọ ọ́:

| Ohun èlò (ọgbọ́n)                      | Àiyipada (MÁ ṣe lò ó)     | Fi pamọ́ síbí dípò rẹ̀                                          |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Àwọn ètò (`writing-plans`)            | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Àwọn àlàyé / àwòrán (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Ìwádìí (`deep-research`, ad-hoc)      | `docs/research/`          | `_tasks/research/…`                                           |
| Ìfiranṣẹ́ iṣẹ́ (`/handoff`)             | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit àwọn ohun èlò wọ̀nyẹn sínú repo `_tasks/` (`git -C _tasks …`), kì í ṣe sínú repo àkọ́kọ́.

## Àwọn fáìlì ìkọ̀kọ̀ / ìgbà díẹ̀ — lo `_artifacts/`, kì í ṣe `/tmp`

Iṣẹ́ àkànṣe yìí fagilé scratchpad sáà àiyipada ti harness (`/tmp/claude-*/…`). Kọ
àwọn fáìlì ìgbà díẹ̀/tí a fi ń ṣiṣẹ́ — àwọn export, àwọn zip tí a ṣẹ̀dá, àwọn àbájáde àárín gbùngbùn ẹ̀ẹ̀kan, ohunkóhun tí ìwọ
ìbá fi sínú `/tmp` — sínú `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` dípò rẹ̀.

- `_artifacts/` jẹ́ ọ̀nà `_*` ní gbòǹgbò: a ti fi sí gitignore (`AGENTS.md` → "Àwọn ọ̀nà `_*` ní Gbòǹgbò"), ó wà
  lórí disk nìkan, a kì í tọpinpin rẹ̀ láéláé.
- Ìdí: fífi àbájáde ìgbà díẹ̀ sí inú iṣẹ́ àkànṣe (dípò `/tmp`) mú kó rọrùn gan-an fún olùdarí
  láti rí gbogbo ohun ìgbà díẹ̀ kí ó sì pa wọ́n ní ibi kan, dípò wíwá káàkiri àwọn
  directory `/tmp` àkànṣe-sáà tó jẹ́ ti ìgbà díẹ̀, tí wọ́n máa ń pòórá tàbí kó àwọn ohun tí a kò tọpinpin jọ.
- **Má ṣe** da èyí rú pẹ̀lú `_tasks/` (Òfin Líle #23, repo git àdáni tirẹ̀ fún àwọn
  ètò/àlàyé/ìwádìí/ìfiranṣẹ́ iṣẹ́ tó yẹ kó pé) — `_artifacts/` jẹ́ fún àwọn fáìlì iṣẹ́ tí a lè sọ nù nìkan, kò sí ohunkóhun
  níbí tó nílò láti wà pẹ́ tàbí láti ní version.

## Base-green ṣáájú ṣíṣí àwọn PR

Ṣáájú gígé ẹ̀ka tàbí ṣíṣí PR, ṣiṣẹ́ àyẹ̀wò base-green (`AGENTS.md` → Ìṣàn Iṣẹ́ Git →
"Àyẹ̀wò base-green"; àwọn ọgbọ́n iṣẹ́ àkànṣe tọ́ka sí i gẹ́gẹ́ bí `.agents/skills/_shared/base-green.md`). PR
tí a ṣí nígbà tí tip ìpìlẹ̀ bá pupa gbọ́dọ̀ ní `⚠️ base-red inherited: #<issue>` nínú body rẹ̀. Láti
mú ipò pupa tó ti kójọ kúrò (tip ìpìlẹ̀ + àwọn PR pupa), lo ọgbọ́n `/sweep-reds`.
