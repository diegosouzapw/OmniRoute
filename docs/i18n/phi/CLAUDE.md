# CLAUDE.md (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Nasa [`AGENTS.md`](AGENTS.md) ang lahat ng tuntunin ng proyekto** — ang nag-iisang mapagkukunan ng katotohanan para sa bawat AI
assistant (arkitektura, mga kumbensiyon, pagsubok, mga quality gate, git workflow, ang 23 Hard Rules,
mga natutunan tungkol sa PII). Basahin ito nang buo; huwag muling idagdag dito ang mga tuntunin ng proyekto. Ang lahat ng nasa ibaba ay nalalapat LAMANG
sa Claude Code — mga operasyonal na pagpipino ng mga tuntuning tinukoy na sa `AGENTS.md`.

## Pagbubukod ng worktree — mga partikular na tagubilin para sa Claude Code

Ang buong mandatoryong protocol ng worktree (pagkumpirma sa base branch, canonical na
path na `.claude/worktrees/`, `cp -al` node_modules, mga tuntunin sa teardown) ay nasa `AGENTS.md` → Git Workflow → "Worktree
isolation". Mga puntong partikular sa Claude Code:

- Kumpirmahin ang base branch sa operator sa pamamagitan ng `AskUserQuestion` (Hard Rule #19) maliban kung
  nasabi na nila ito sa iyo.
- Mas piliin ang native na tool na `EnterWorktree` — awtomatiko na itong gumagawa ng mga worktree sa ilalim ng
  `.claude/worktrees/` (ang canonical na path). Gawin ang worktree gamit ang nakadokumentong command na `git
worktree add`, pagkatapos ay tawagin ang `EnterWorktree` gamit ang `path` nito.

## Kaligtasan sa iba't ibang session — mga partikular na tagubilin para sa Claude Code

Pinamamahalaan ng Hard Rules #19/#21/#22 (sa `AGENTS.md`) ang mga magkakasabay na session. Mga operasyonal na paalala para sa
harness na ito:

- **Kopyahin nang eksakto ang pagbabawal sa `git stash` sa prompt ng bawat subagent na gumagamit ng git**
  (Agent tool / Workflow scripts) — hindi namamana ng mga subagent ang file na ito, at ang naitalang
  pag-ulit ng insidente sa stash ay nagmula sa isang subagent.
- Bago mag-merge o mag-push sa anumang PR na hindi mo ginawa _sa session na ito_, patakbuhin ang `git worktree list`
  at muling suriin ang `gh pr view <N> --json state,headRefOid` (Hard Rule #22b).
- Tapusin ang bawat session nang ang pangunahing checkout ay nasa branch kung saan ito nagsimula.

## Superpowers / mga artifact sa pagpaplano — mga override sa path

Ang kumbensiyong `_tasks/` ay tinukoy sa `AGENTS.md` → "Planning & Research Artifacts". Ang
mga superpowers skill ay may kasamang mga default na tumutukoy sa `docs/…` — ang mga default na iyon ay **ino-override
dito**. Kapag nag-anunsiyo ang isang superpowers skill ng path na gaya ng "saved to `docs/superpowers/plans/…`",
palitan ito ng katumbas na `_tasks/…` bago magsulat:

| Artifact (skill)                       | Default (HUWAG gamitin)   | Sa halip, i-save rito                                         |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Mga plano (`writing-plans`)            | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Mga spec / disenyo (`brainstorming`)   | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Pananaliksik (`deep-research`, ad-hoc) | `docs/research/`          | `_tasks/research/…`                                           |
| Mga hand-off (`/handoff`)              | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

I-commit ang mga artifact na iyon sa loob ng `_tasks/` repo (`git -C _tasks …`), hindi kailanman sa pangunahing repo.

## Mga scratch / pansamantalang file — gamitin ang `_artifacts/`, hindi ang `/tmp`

Ino-override ng proyektong ito ang default na session scratchpad ng harness (`/tmp/claude-*/…`). Isulat
ang mga pansamantala/ginagawang file — mga export, nabuong zip, minsanang intermediate output, anumang
karaniwan mong ilalagay sa `/tmp` — sa `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` sa halip.

- Ang `_artifacts/` ay isang root `_*` path: naka-gitignore na (`AGENTS.md` → "Root `_*` paths"), nasa
  disk lamang, at hindi kailanman tina-track.
- Dahilan: ang pagpapanatili ng scratch output sa loob ng proyekto (sa halip na `/tmp`) ay nagpapadali para sa operator
  na mahanap at tanggalin ang lahat ng pansamantalang bagay sa iisang lugar, sa halip na hanapin ang mga ito sa iba't ibang ephemeral
  at session-specific na `/tmp` directory na nawawala o naiipon nang hindi nata-track.
- **Huwag** itong ipagkamali sa `_tasks/` (Hard Rule #23, na may sarili nitong pribadong git repo para sa pangmatagalang
  mga plano/spec/pananaliksik/hand-off) — ang `_artifacts/` ay para lamang sa mga disposable na working file; walang
  anumang narito ang kailangang manatili o ma-version.

## Base-green bago magbukas ng mga PR

Bago gumawa ng branch o magbukas ng PR, patakbuhin ang base-green check (`AGENTS.md` → Git Workflow →
"Base-green check"; tinutukoy ito ng mga project skill bilang `.agents/skills/_shared/base-green.md`). Ang isang PR
na binuksan habang red ang base tip ay dapat maglaman ng `⚠️ base-red inherited: #<issue>` sa body nito. Upang
linisin ang naipong red state (base tip + mga red na PR), gamitin ang skill na `/sweep-reds`.
