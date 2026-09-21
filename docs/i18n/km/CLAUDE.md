# CLAUDE.md (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ច្បាប់គម្រោងទាំងអស់ស្ថិតនៅក្នុង [`AGENTS.md`](AGENTS.md)** — ជាប្រភពការពិតតែមួយគត់សម្រាប់ជំនួយការ AI
ទាំងអស់ (ស្ថាបត្យកម្ម អនុសញ្ញា ការធ្វើតេស្ត ច្រកត្រួតពិនិត្យគុណភាព លំហូរការងារ git ច្បាប់តឹងរ៉ឹងទាំង 23
និងមេរៀនអំពី PII)។ សូមអានវាទាំងស្រុង ហើយកុំបន្ថែមច្បាប់គម្រោងឡើងវិញនៅទីនេះ។ អ្វីៗខាងក្រោមអនុវត្តតែ
ចំពោះ Claude Code ប៉ុណ្ណោះ — ជាការកែលម្អប្រតិបត្តិការនៃច្បាប់ដែលបានកំណត់រួចហើយក្នុង `AGENTS.md`។

## ការញែក worktree ដាច់ដោយឡែក — ចំណុចជាក់លាក់សម្រាប់ Claude Code

ពិធីការចាំបាច់ពេញលេញសម្រាប់ worktree (ការបញ្ជាក់ base branch, ផ្លូវស្តង់ដារ
`.claude/worktrees/`, `cp -al` node_modules និងច្បាប់នៃការសម្អាតក្រោយប្រើប្រាស់) មាននៅក្នុង `AGENTS.md` → Git Workflow → "Worktree
isolation"។ ចំណុចជាក់លាក់សម្រាប់ Claude Code៖

- បញ្ជាក់ base branch ជាមួយអ្នកប្រតិបត្តិករតាមរយៈ `AskUserQuestion` (ច្បាប់តឹងរ៉ឹង #19) លុះត្រាតែពួកគេ
  បានប្រាប់អ្នករួចហើយ។
- គួរប្រើឧបករណ៍ដើម `EnterWorktree` — វាបង្កើត worktree នៅក្រោម
  `.claude/worktrees/` (ផ្លូវស្តង់ដារ) រួចជាស្រេច។ បង្កើត worktree ដោយប្រើពាក្យបញ្ជា `git
worktree add` ដែលបានចងក្រងជាឯកសារ បន្ទាប់មកហៅ `EnterWorktree` ជាមួយ `path` របស់វា។

## សុវត្ថិភាពឆ្លងសម័យ — ចំណុចជាក់លាក់សម្រាប់ Claude Code

ច្បាប់តឹងរ៉ឹង #19/#21/#22 (នៅក្នុង `AGENTS.md`) គ្រប់គ្រងសម័យស្របគ្នា។ ការរំលឹកផ្នែកប្រតិបត្តិការសម្រាប់
បរិស្ថាននេះ៖

- **ចម្លងការហាមឃាត់ `git stash` ដូចដើមទាំងស្រុងទៅក្នុង prompt របស់ subagent នីមួយៗដែលប៉ះពាល់ដល់ git**
  (ឧបករណ៍ Agent / ស្គ្រីប Workflow) — subagent មិនទទួលបន្តឯកសារនេះទេ ហើយឧប្បត្តិហេតុ stash
  ដែលបានកត់ត្រាថាកើតឡើងម្តងទៀត គឺបានកើតឡើងតាមរយៈ subagent។
- មុនពេល merge ឬ push ទៅកាន់ PR ណាមួយដែលអ្នកមិនបានបង្កើត _ក្នុងសម័យនេះ_ សូមដំណើរការ `git worktree list`
  ហើយពិនិត្យ `gh pr view <N> --json state,headRefOid` ម្តងទៀត (ច្បាប់តឹងរ៉ឹង #22b)។
- បញ្ចប់រាល់សម័យដោយធានាថា checkout មេស្ថិតនៅលើ branch ដែលវាបានចាប់ផ្តើម។

## Superpowers / វត្ថុបុរាណសម្រាប់ការធ្វើផែនការ — ការជំនួសផ្លូវ

អនុសញ្ញា `_tasks/` ត្រូវបានកំណត់នៅក្នុង `AGENTS.md` → "Planning & Research Artifacts"។ skill
របស់ superpowers ភ្ជាប់មកជាមួយតម្លៃលំនាំដើមដែលចង្អុលទៅ `docs/…` — តម្លៃលំនាំដើមទាំងនោះត្រូវបាន **ជំនួស
នៅទីនេះ**។ នៅពេល skill របស់ superpowers ប្រកាសផ្លូវដូចជា "បានរក្សាទុកទៅ `docs/superpowers/plans/…`"
សូមប្តូរវាទៅជាផ្លូវសមមូល `_tasks/…` មុនពេលសរសេរ៖

| វត្ថុបុរាណ (skill)                            | លំនាំដើម (កុំប្រើ)        | រក្សាទុកនៅទីនេះជំនួសវិញ                                       |
| --------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| ផែនការ (`writing-plans`)                      | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| លក្ខណៈបញ្ជាក់ / ការរចនា (`brainstorming`)     | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| ការស្រាវជ្រាវ (`deep-research`, តាមតម្រូវការ) | `docs/research/`          | `_tasks/research/…`                                           |
| ការប្រគល់បន្ត (`/handoff`)                    | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

commit វត្ថុបុរាណទាំងនោះនៅខាងក្នុង repo `_tasks/` (`git -C _tasks …`) ហើយកុំ commit នៅក្នុង repo មេ។

## ឯកសារព្រាង / បណ្តោះអាសន្ន — ប្រើ `_artifacts/` មិនមែន `/tmp`

គម្រោងនេះជំនួស scratchpad សម័យលំនាំដើមរបស់បរិស្ថាន (`/tmp/claude-*/…`)។ សរសេរ
ឯកសារបណ្តោះអាសន្ន/ឯកសារកំពុងធ្វើការ — ការនាំចេញ ឯកសារ zip ដែលបានបង្កើត លទ្ធផលមធ្យមដែលប្រើតែម្តង និងអ្វីៗដែលអ្នក
ធម្មតានឹងដាក់ក្នុង `/tmp` — ទៅក្នុង `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` ជំនួសវិញ។

- `_artifacts/` គឺជាផ្លូវ root `_*`៖ វាត្រូវបាន gitignore រួចហើយ (`AGENTS.md` → "Root `_*` paths") ស្ថិត
  តែលើថាសប៉ុណ្ណោះ ហើយមិនត្រូវបានតាមដានឡើយ។
- ហេតុផល៖ ការរក្សាទុកលទ្ធផលព្រាងនៅខាងក្នុងគម្រោង (ជំនួសឱ្យ `/tmp`) ធ្វើឱ្យអ្នកប្រតិបត្តិករងាយស្រួល
  ស្វែងរក និងលុបអ្វីៗបណ្តោះអាសន្នទាំងអស់នៅកន្លែងតែមួយ ជំនួសឱ្យការស្វែងរកតាមថត `/tmp`
  ជាក់លាក់តាមសម័យដែលមិនអចិន្ត្រៃយ៍ ហើយអាចបាត់ ឬកកកុញដោយគ្មានការតាមដាន។
- **កុំ** ច្រឡំវាជាមួយ `_tasks/` (ច្បាប់តឹងរ៉ឹង #23 ដែលជា repo git ឯកជនដាច់ដោយឡែកសម្រាប់
  ផែនការ/លក្ខណៈបញ្ជាក់/ការស្រាវជ្រាវ/ការប្រគល់បន្តដែលត្រូវរក្សាទុកយូរ) — `_artifacts/` គឺសម្រាប់តែឯកសារកំពុងធ្វើការដែលអាចបោះចោលបានប៉ុណ្ណោះ ហើយគ្មានអ្វី
  នៅទីនេះដែលត្រូវរក្សាទុកឱ្យបានយូរ ឬគ្រប់គ្រងកំណែឡើយ។

## ធានាថា base បៃតង មុនពេលបើក PR

មុនពេលបង្កើត branch ឬបើក PR សូមដំណើរការការត្រួតពិនិត្យ base-green (`AGENTS.md` → Git Workflow →
"Base-green check"; skill របស់គម្រោងយោងទៅវាជា `.agents/skills/_shared/base-green.md`)។ PR
ដែលបានបើកខណៈដែល base tip កំពុងបរាជ័យ ត្រូវតែមាន `⚠️ base-red inherited: #<issue>` នៅក្នុង body របស់វា។ ដើម្បី
ដោះស្រាយស្ថានភាពបរាជ័យដែលបានកកកុញ (base tip + PR ដែលបរាជ័យ) សូមប្រើ skill `/sweep-reds`។
