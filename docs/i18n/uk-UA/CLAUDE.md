# CLAUDE.md (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Усі правила проєкту містяться в [`AGENTS.md`](AGENTS.md)** — єдиному джерелі істини для кожного ШІ-асистента
(архітектура, домовленості, тестування, перевірки якості, робочий процес git, 23 жорсткі правила,
висновки щодо PII). Прочитайте його повністю; не додавайте правила проєкту сюди повторно. Усе нижче стосується ЛИШЕ
Claude Code — це операційні уточнення правил, уже визначених в `AGENTS.md`.

## Ізоляція worktree — особливості Claude Code

Повний обов’язковий протокол worktree (підтвердження базової гілки, канонічний
шлях `.claude/worktrees/`, `cp -al` node_modules, правила очищення) наведено в `AGENTS.md` → Git Workflow → "Worktree
isolation". Особливості Claude Code:

- Підтвердьте базову гілку з оператором через `AskUserQuestion` (жорстке правило №19), якщо він
  ще не повідомив її.
- Віддавайте перевагу вбудованому інструменту `EnterWorktree` — він уже створює worktree у
  `.claude/worktrees/` (канонічний шлях). Створіть worktree за допомогою задокументованої команди `git
worktree add`, а потім викличте `EnterWorktree`, передавши його `path`.

## Безпека між сеансами — особливості Claude Code

Жорсткі правила №19/№21/№22 (в `AGENTS.md`) регулюють паралельні сеанси. Операційні нагадування для цього
середовища:

- **Дослівно відтворюйте заборону `git stash` у промпті кожного субагента, який працює з git**
  (інструмент Agent / скрипти Workflow) — субагенти не успадковують цей файл, а зафіксований
  повторний інцидент зі stash стався через субагента.
- Перед злиттям або надсиланням змін до будь-якого PR, який ви не створили _в цьому сеансі_, виконайте `git worktree list`
  і повторно перевірте `gh pr view <N> --json state,headRefOid` (жорстке правило №22b).
- Завершуйте кожен сеанс, залишаючи основний checkout на тій гілці, з якої він почався.

## Superpowers / артефакти планування — перевизначення шляхів

Домовленість щодо `_tasks/` визначено в `AGENTS.md` → "Planning & Research Artifacts". Навички
superpowers постачаються зі стандартними значеннями, що вказують на `docs/…` — ці значення **перевизначено
тут**. Коли навичка superpowers оголошує шлях на кшталт "saved to `docs/superpowers/plans/…`",
перед записом замініть його на відповідник у `_tasks/…`:

| Артефакт (навичка)                        | Стандартний шлях (НЕ використовуйте) | Натомість зберігайте тут                                      |
| ----------------------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| Плани (`writing-plans`)                   | `docs/superpowers/plans/`            | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Специфікації / дизайн (`brainstorming`)   | `docs/superpowers/specs/`            | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Дослідження (`deep-research`, ситуативні) | `docs/research/`                     | `_tasks/research/…`                                           |
| Передавання контексту (`/handoff`)        | —                                    | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Комітьте ці артефакти всередині репозиторію `_tasks/` (`git -C _tasks …`), а не в основному репозиторії.

## Чернеткові / тимчасові файли — використовуйте `_artifacts/`, а не `/tmp`

Цей проєкт перевизначає стандартне місце для чернеток сеансу в середовищі (`/tmp/claude-*/…`). Записуйте
тимчасові/робочі файли — експорти, згенеровані zip-архіви, одноразові проміжні результати, усе, що ви
інакше помістили б у `/tmp`, — натомість у `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` — це кореневий шлях `_*`: він уже ігнорується git (`AGENTS.md` → "Root `_*` paths"), існує
  лише на диску й ніколи не відстежується.
- Причина: зберігання чернеткових результатів усередині проєкту (а не в `/tmp`) дає оператору змогу
  легко знайти й видалити все тимчасове в одному місці, замість пошуку в ефемерних
  каталогах `/tmp` для окремих сеансів, які зникають або накопичують невідстежувані файли.
- **Не** плутайте це з `_tasks/` (жорстке правило №23, окремий приватний git-репозиторій для довготривалих
  планів/специфікацій/досліджень/передавань контексту) — `_artifacts/` призначений лише для одноразових робочих файлів; нічого
  тут не має зберігатися надовго чи версіонуватися.

## Зелена база перед відкриттям PR

Перед створенням гілки або відкриттям PR виконайте перевірку зеленої бази (`AGENTS.md` → Git Workflow →
"Base-green check"; навички проєкту посилаються на неї як на `.agents/skills/_shared/base-green.md`). PR,
відкритий тоді, коли останній коміт бази червоний, повинен містити `⚠️ base-red inherited: #<issue>` у своєму описі. Щоб
усунути накопичений червоний стан (останній коміт бази + червоні PR), скористайтеся навичкою `/sweep-reds`.
