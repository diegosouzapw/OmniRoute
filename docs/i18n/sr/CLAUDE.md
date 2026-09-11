# CLAUDE.md (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

**Sva правила пројекта живе у [`AGENTS.md`](AGENTS.md)** — јединственом извору истине за сваког AI
асистента (архитектура, конвенције, тестирање, квалитетни гејтови, git ток рада, 23 строга правила,
PII сазнања). Прочитајте га у потпуности; немојте овде поново додавати правила пројекта. Све испод
се односи САМО на Claude Code — оперативна усавршавања правила која су већ дефинисана у `AGENTS.md`.

## Изолација worktree-а — специфичности за Claude Code

Пуни обавезни worktree протокол (потврда базне гране, канонска путања `.claude/worktrees/`,
`cp -al` node_modules, правила расклапања) налази се у `AGENTS.md` → Git Workflow → "Worktree
isolation". Тачке специфичне за Claude Code:

- Потврдите базну грану са оператором путем `AskUserQuestion` (Строго правило #19) осим ако вам
  већ нису рекли.
- Дајте приоритет native алату `EnterWorktree` — он већ креира worktree-ове у оквиру
  `.claude/worktrees/` (канонска путања). Направите worktree помоћу документоване `git
worktree add` команде, затим позовите `EnterWorktree` са његовим `path`.

## Безбедност између сесија — специфичности за Claude Code

Строга правила #19/#21/#22 (у `AGENTS.md`) регулишу паралелне сесије. Оперативни подсетници за
овај harness:

- **Реплицирајте забрану `git stash` дословно у промпту сваког подагента који дира git**
  (Agent tool / Workflow скрипте) — подагенти не наслеђују овај фајл, а забележено поновно
  јављање инцидента са stash-ом дошло је преко подагента.
- Пре спајања или push-овања на било који PR који нисте креирали **ове сесије**, покрените
  `git worktree list` и поново провери `gh pr view <N> --json state,headRefOid` (Строго правило
  #22b).
- Завршите сваку сесију тако да главни checkout буде на грани на којој је почео.

## Superpowers / артефакти планирања — преклапања путања

Конвенција `_tasks/` дефинисана је у `AGENTS.md` → "Planning & Research Artifacts". Superpowers
скилови долазе са подразумеваним подешавањима која показују на `docs/…` — та подразумевана
подешавања су **овде преклопљена**. Када superpowers скил објави путању као "сачувано у
`docs/superpowers/plans/…`", препишите је у одговарајући `_tasks/…` еквивалент пре него што
запишете:

| Артефакт (скил)                          | Подразумевано (НЕ користити) | Сачувај овде уместо                                           |
| ---------------------------------------- | ---------------------------- | ------------------------------------------------------------- |
| Планови (`writing-plans`)                | `docs/superpowers/plans/`    | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Спецификације / дизајн (`brainstorming`) | `docs/superpowers/specs/`    | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Истраживање (`deep-research`, ad-hoc)    | `docs/research/`             | `_tasks/research/…`                                           |
| Предаја (`/handoff`)                     | —                            | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Урадите commit тих артефакта унутар `_tasks/` репозиторијума (`git -C _tasks …`), никада у главном
репозиторијуму.

## Привремени / scratch фајлови — користите `_artifacts/`, не `/tmp`

Овај пројекат преклапа подразумевани session scratchpad harness-а (`/tmp/claude-*/…`). Пишите
привремене/радне фајлове — извозе, генерисане zip-ове, једнократне посредне излазе, било шта што
бисте иначе ставили у `/tmp` — у `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` уместо тога.

- `_artifacts/` је root `_*` путања: већ је игнорисана у git-у (`AGENTS.md` → "Root `_*` paths"),
  постоји само на диску, никада се не праћа.
- Разлог: чувањем scratch излаза унутар пројекта (уместо у `/tmp`) оператору је тривијално да
  пронађе и обрише све привремено на једном месту, уместо да трага по ефемерним, за сесију
  специфичним `/tmp` директоријумима који нестају или се гомилају без пратог трага.
- Немојте ово помешати са `_tasks/` (Строго правило #23, сопствени приватни git репозиторијум за
  трајне планове/спецификације/истраживања/предаје) — `_artifacts/` је намењен само за одбацив
  радни материјал, ништа овде не мора да опстане или буде верзионисано.

## Base-green пре отварања PR-ова

Пре сецирања гране или отварања PR-а, покрените base-green провeру (`AGENTS.md` → Git Workflow →
"Base-green check"; скилови пројекта на то упућују као `.agents/skills/_shared/base-green.md`).
PR отворен док је врх базне гране црвен мора носити `⚠️ base-red inherited: #<issue>` у свом
телу. За исцрпљивање акумулисаног црвеног стања (врх базе + црвени PR-ови), користите скил
`/sweep-reds`.
