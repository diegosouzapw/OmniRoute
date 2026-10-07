# CLAUDE.md (Български)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Всички правила на проекта се намират в [`AGENTS.md`](AGENTS.md)** — единственият източник на истина за всеки AI
асистент (архитектура, конвенции, тестване, критерии за качество, git работен процес, 23-те строги правила,
изводи за PII). Прочетете го изцяло; не добавяйте отново правилата на проекта тук. Всичко по-долу се отнася САМО
за Claude Code — оперативни уточнения на правила, които вече са дефинирани в `AGENTS.md`.

## Изолация чрез worktree — специфики за Claude Code

Пълният задължителен протокол за worktree (потвърждаване на базовия клон, каноничен път
`.claude/worktrees/`, `cp -al` за node_modules, правила за премахване) се намира в `AGENTS.md` → Git Workflow → „Worktree
isolation“. Специфични за Claude Code точки:

- Потвърдете базовия клон с оператора чрез `AskUserQuestion` (строго правило №19), освен ако той
  вече не ви го е посочил.
- Предпочитайте вградения инструмент `EnterWorktree` — той вече създава worktree директории под
  `.claude/worktrees/` (каноничния път). Създайте worktree с документираната команда `git
worktree add`, след което извикайте `EnterWorktree` с неговия `path`.

## Безопасност между сесиите — специфики за Claude Code

Строги правила №19/№21/№22 (в `AGENTS.md`) управляват паралелните сесии. Оперативни напомняния за тази
среда:

- **Възпроизвеждайте дословно забраната за `git stash` в подканата на всеки подагент, който работи с git**
  (инструмента Agent / Workflow скриптове) — подагентите не наследяват този файл, а регистрираното
  повторение на инцидента със stash е възникнало чрез подагент.
- Преди сливане или изпращане към който и да е PR, който не сте създали _в тази сесия_, изпълнете `git worktree list`
  и проверете отново `gh pr view <N> --json state,headRefOid` (строго правило №22b).
- Завършвайте всяка сесия с основното работно копие на клона, на който е било при стартирането ѝ.

## Superpowers / артефакти за планиране — заместване на пътища

Конвенцията `_tasks/` е дефинирана в `AGENTS.md` → „Planning & Research Artifacts“. Уменията
superpowers се предоставят със стойности по подразбиране, които сочат към `docs/…` — тези стойности са **заменени
тук**. Когато умение на superpowers обяви път от типа „запазено в `docs/superpowers/plans/…`“,
заменете го с еквивалента в `_tasks/…`, преди да записвате:

| Артефакт (умение)                       | По подразбиране (НЕ използвайте) | Вместо това запазвайте тук                                    |
| --------------------------------------- | -------------------------------- | ------------------------------------------------------------- |
| Планове (`writing-plans`)               | `docs/superpowers/plans/`        | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Спецификации / дизайн (`brainstorming`) | `docs/superpowers/specs/`        | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Проучване (`deep-research`, ad-hoc)     | `docs/research/`                 | `_tasks/research/…`                                           |
| Предавания (`/handoff`)                 | —                                | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit-вайте тези артефакти в хранилището `_tasks/` (`git -C _tasks …`), никога в основното хранилище.

## Работни / временни файлове — използвайте `_artifacts/`, а не `/tmp`

Този проект заменя стандартното за средата временно работно пространство на сесията (`/tmp/claude-*/…`). Записвайте
временни/работни файлове — експортирани данни, генерирани zip архиви, еднократни междинни резултати и всичко, което
иначе бихте поставили в `/tmp` — вместо това в `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` е път в корена от типа `_*`: той вече се игнорира от git (`AGENTS.md` → „Root `_*` paths“), съществува
  само на диска и никога не се проследява.
- Причина: съхраняването на временните резултати в проекта (вместо в `/tmp`) прави лесно за оператора
  намирането и изтриването на всичко временно на едно място, вместо търсене в ефимерни,
  специфични за сесиите директории в `/tmp`, които изчезват или натрупват непроследени файлове.
- **Не** бъркайте това с `_tasks/` (строго правило №23, негово собствено частно git хранилище за дълготрайни
  планове/спецификации/проучвания/предавания) — `_artifacts/` е само за временни работни файлове; нищо
  тук не трябва да се запазва дългосрочно или да се версионира.

## Зелена база преди отваряне на PR-и

Преди да създадете клон или да отворите PR, изпълнете проверката за зелена база (`AGENTS.md` → Git Workflow →
„Base-green check“; уменията на проекта я реферират като `.agents/skills/_shared/base-green.md`). PR,
отворен, докато върхът на базовия клон е червен, трябва да съдържа `⚠️ base-red inherited: #<issue>` в описанието си. За
изчистване на натрупано червено състояние (връх на базовия клон + червени PR-и) използвайте умението `/sweep-reds`.
