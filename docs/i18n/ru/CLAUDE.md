# CLAUDE.md (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Все правила проекта находятся в [`AGENTS.md`](AGENTS.md)** — единственном источнике истины для каждого ИИ-ассистента
(архитектура, соглашения, тестирование, контроль качества, рабочий процесс git, 23 жёстких правила,
выводы по PII). Прочитайте его полностью; не добавляйте правила проекта сюда повторно. Всё ниже относится ТОЛЬКО
к Claude Code — это операционные уточнения правил, уже определённых в `AGENTS.md`.

## Изоляция worktree — особенности Claude Code

Полный обязательный протокол работы с worktree (подтверждение базовой ветки, канонический
путь `.claude/worktrees/`, `cp -al` для node_modules, правила очистки) находится в `AGENTS.md` → Git Workflow → "Worktree
isolation". Особенности Claude Code:

- Подтвердите базовую ветку у оператора с помощью `AskUserQuestion` (жёсткое правило №19), если он
  ещё не сообщил её.
- Предпочитайте встроенный инструмент `EnterWorktree` — он уже создаёт worktree в
  `.claude/worktrees/` (канонический путь). Создайте worktree с помощью документированной команды `git
worktree add`, затем вызовите `EnterWorktree`, передав его `path`.

## Безопасность между сессиями — особенности Claude Code

Жёсткие правила №19/№21/№22 (в `AGENTS.md`) регулируют параллельные сессии. Операционные напоминания для этой
среды:

- **Дословно включайте запрет на `git stash` в промпт каждого субагента, который работает с git**
  (инструмент Agent / скрипты Workflow) — субагенты не наследуют этот файл, а зафиксированный
  повтор инцидента со stash произошёл через субагента.
- Перед слиянием или отправкой изменений в любой PR, который вы создали не _в этой сессии_, выполните `git worktree list`
  и повторно проверьте `gh pr view <N> --json state,headRefOid` (жёсткое правило №22b).
- Завершайте каждую сессию, оставляя основной checkout на той ветке, с которой он начинался.

## Superpowers / артефакты планирования — переопределение путей

Соглашение `_tasks/` определено в `AGENTS.md` → "Planning & Research Artifacts". Навыки
superpowers поставляются со значениями по умолчанию, указывающими на `docs/…`, — здесь эти значения **переопределены**.
Когда навык superpowers сообщает путь вроде "saved to `docs/superpowers/plans/…`",
перед записью замените его на эквивалентный путь в `_tasks/…`:

| Артефакт (навык)                        | По умолчанию (НЕ использовать) | Вместо этого сохранять здесь                                  |
| --------------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| Планы (`writing-plans`)                 | `docs/superpowers/plans/`      | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Спецификации / дизайн (`brainstorming`) | `docs/superpowers/specs/`      | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Исследования (`deep-research`, разовые) | `docs/research/`               | `_tasks/research/…`                                           |
| Передача работы (`/handoff`)            | —                              | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Коммитьте эти артефакты внутри репозитория `_tasks/` (`git -C _tasks …`), но никогда не в основном репозитории.

## Черновые / временные файлы — используйте `_artifacts/`, а не `/tmp`

Этот проект переопределяет стандартную директорию среды для временных файлов сессии (`/tmp/claude-*/…`). Записывайте
временные/рабочие файлы — экспорты, сгенерированные zip-архивы, одноразовые промежуточные результаты и всё, что
в противном случае попало бы в `/tmp`, — в `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` — это корневой путь `_*`: он уже игнорируется git (`AGENTS.md` → "Root `_*` paths"), существует
  только на диске и никогда не отслеживается.
- Причина: хранение временных результатов внутри проекта (вместо `/tmp`) позволяет оператору
  легко найти и удалить всё временное в одном месте, вместо поиска по эфемерным
  каталогам `/tmp` отдельных сессий, которые исчезают или накапливаются без отслеживания.
- Не путайте его с `_tasks/` (жёсткое правило №23, отдельный приватный git-репозиторий для долговечных
  планов/спецификаций/исследований/передачи работы) — `_artifacts/` предназначен только для одноразовых рабочих файлов;
  ничто здесь не должно сохраняться надолго или версионироваться.

## Зелёная базовая ветка перед открытием PR

Перед созданием ветки или открытием PR выполните проверку зелёного состояния базовой ветки (`AGENTS.md` → Git Workflow →
"Base-green check"; навыки проекта ссылаются на неё как на `.agents/skills/_shared/base-green.md`). PR,
открытый при красном состоянии вершины базовой ветки, должен содержать `⚠️ base-red inherited: #<issue>` в своём описании. Чтобы
устранить накопившееся красное состояние (вершина базовой ветки + красные PR), используйте навык `/sweep-reds`.
