# CLAUDE.md (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Iwu niile nke ọrụ a dị na [`AGENTS.md`](AGENTS.md)** — ebe otu eziokwu ahụ si abịa maka onye enyemaka AI ọ bụla
(nhazi sistemụ, ụkpụrụ, nnwale, ọnụ ụzọ ogo, usoro ọrụ git, Iwu Siri Ike 23,
ihe amụtara gbasara PII). Gụọ ya niile; etinyekwala iwu ọrụ ọzọ ebe a. Ihe niile dị n'okpuru metụtara
naanị Claude Code — mmezi etu e si arụ ọrụ nke iwu ndị akọwarala na `AGENTS.md`.

## Ikewapụ worktree — nkọwa ndị metụtara Claude Code

Usoro worktree zuru ezu nke a ga-agbasorịrị (nkwenye base branch, ụzọ iwu `.claude/worktrees/`,
`cp -al` node_modules, iwu mmechi) dị na `AGENTS.md` → Git Workflow → "Worktree
isolation". Isi ihe ndị metụtara Claude Code:

- Jiri `AskUserQuestion` kwado base branch ahụ n'aka onye na-ahụ maka ọrụ (Iwu Siri Ike #19) belụsọ ma ha
  agwala gị ya.
- Họrọ ngwaọrụ `EnterWorktree` nke sistemụ ahụ — ọ na-emepụta worktree n'okpuru
  `.claude/worktrees/` (ụzọ iwu ahụ). Jiri iwu `git
worktree add` edepụtara mepụta worktree ahụ, wee kpọọ `EnterWorktree` site na iji `path` ya.

## Nchekwa gafee nnọkọ dị iche iche — nkọwa ndị metụtara Claude Code

Iwu Siri Ike #19/#21/#22 (dị na `AGENTS.md`) na-achịkwa nnọkọ ndị na-aga n'otu oge. Ihe ncheta gbasara etu e si arụ ọrụ
maka harness a:

- **Tinye mmachibido `git stash` otu mkpụrụokwu ahụ dị na prompt nke subagent ọ bụla na-emetụ git aka**
  (Agent tool / Workflow scripts) — subagent anaghị eketa faịlụ a, ma ihe ndekọ banyere nlọghachi
  nke nsogbu stash ahụ sitere n'aka subagent.
- Tupu ijikọta ma ọ bụ ịkwanye gaa na PR ọ bụla ị na-emepụtaghị _na nnọkọ a_, mee `git worktree list`
  ma nyochaa ọzọ `gh pr view <N> --json state,headRefOid` (Iwu Siri Ike #22b).
- Mechie nnọkọ ọ bụla ka main checkout nọ na branch ọ malitere na ya.

## Superpowers / ihe ndekọ atụmatụ — mgbanwe ụzọ

A kọwara ụkpụrụ `_tasks/` na `AGENTS.md` → "Planning & Research Artifacts". Skills nke
superpowers na-abịa na ndabara ndị na-atụ aka na `docs/…` — **agbanweela
ndabara ndị ahụ ebe a**. Mgbe skill superpowers kwupụtara ụzọ dịka "echekwara na `docs/superpowers/plans/…`",
gbanwee ya ka ọ bụrụ nke kwekọrọ na `_tasks/…` tupu ide ya:

| Ihe ndekọ (skill)                   | Ndabara (EJILA ya)        | Chekwaa ya ebe a kama                                         |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Atụmatụ (`writing-plans`)           | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Nkọwapụta / imewe (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Nnyocha (`deep-research`, ad-hoc)   | `docs/research/`          | `_tasks/research/…`                                           |
| Nnyefe (`/handoff`)                 | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Mee commit nke ihe ndekọ ndị ahụ n'ime repo `_tasks/` (`git -C _tasks …`), emela ya na repo bụ isi.

## Faịlụ idegharị / nwa oge — jiri `_artifacts/`, ọ bụghị `/tmp`

Ọrụ a na-agbanwe session scratchpad ndabara nke harness (`/tmp/claude-*/…`). Dee
faịlụ nwa oge/ọrụ — exports, zips emepụtara, nsonaazụ etiti eji naanị otu ugboro, ihe ọ bụla ị gaara
etinye na `/tmp` — na `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` kama.

- `_artifacts/` bụ ụzọ mgbọrọgwụ `_*`: etinyelarị ya na gitignore (`AGENTS.md` → "Root `_*` paths"), ọ dị
  naanị na diski, a naghị etinye ya na nsuso.
- Ihe kpatara ya: idobe nsonaazụ nwa oge n'ime ọrụ ahụ (kama `/tmp`) na-eme ka ọ dịrị onye na-ahụ maka ọrụ mfe
  ịchọta ma hichapụ ihe niile nwa oge n'otu ebe, kama ịchụgharị ha n'ime directories `/tmp`
  nke nnọkọ ọ bụla, ndị na-apụ n'anya ma ọ bụ na-achịkọba n'enweghị nsuso.
- **Agwakọtala** nke a na `_tasks/` (Iwu Siri Ike #23, repo git nzuzo nke ya maka atụmatụ/
  nkọwapụta/nnyocha/nnyefe ga-adịgide) — `_artifacts/` bụ naanị maka faịlụ ọrụ a ga-atụfu; ọ dịghị ihe
  dị ebe a kwesịrị ịdịgide ma ọ bụ inwe ụdị mbipụta.

## Base-green tupu imepe PR

Tupu imepụta branch ma ọ bụ imepe PR, mee nyocha base-green (`AGENTS.md` → Git Workflow →
"Base-green check"; skills nke ọrụ a na-akpọ ya `.agents/skills/_shared/base-green.md`). PR
emeghere mgbe base tip na-acha uhie uhie ga-enwerịrị `⚠️ base-red inherited: #<issue>` n'ime body ya. Iji
kpochapụ ọnọdụ uhie chịkọbara (base tip + PR ndị na-acha uhie uhie), jiri skill `/sweep-reds`.
