# CLAUDE.md (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Նախագծի բոլոր կանոնները գտնվում են [`AGENTS.md`](AGENTS.md)-ում**՝ ճշմարտության միակ աղբյուրը յուրաքանչյուր AI
օգնականի համար (ճարտարապետություն, պայմանավորվածություններ, թեստավորում, որակի ստուգիչներ, git աշխատանքային հոսք, 23 Խիստ կանոնները,
PII-ի վերաբերյալ քաղած դասերը)։ Ամբողջությամբ կարդացեք այն. այստեղ կրկին մի՛ ավելացրեք նախագծի կանոնները։ Ստորև նշված ամեն ինչ վերաբերում է ՄԻԱՅՆ
Claude Code-ին՝ `AGENTS.md`-ում արդեն սահմանված կանոնների գործառնական ճշգրտումներ։

## Worktree-ի մեկուսացում — Claude Code-ի առանձնահատկություններ

Worktree-ի ամբողջական պարտադիր արձանագրությունը (բազային ճյուղի հաստատում, `.claude/worktrees/` կանոնական
ուղի, `cp -al` node_modules, հեռացման կանոններ) գտնվում է `AGENTS.md` → Git Workflow → "Worktree
isolation" բաժնում։ Claude Code-ին հատուկ կետերը՝

- Հաստատեք բազային ճյուղը օպերատորի հետ `AskUserQuestion`-ի միջոցով (Խիստ կանոն #19), եթե նա
  արդեն չի հայտնել այն։
- Նախընտրեք բնիկ `EnterWorktree` գործիքը. այն արդեն ստեղծում է worktree-ները
  `.claude/worktrees/`-ի ներքո (կանոնական ուղին)։ Ստեղծեք worktree-ն փաստաթղթավորված `git
worktree add` հրամանով, այնուհետև կանչեք `EnterWorktree`՝ փոխանցելով դրա `path`-ը։

## Միջսեսիոն անվտանգություն — Claude Code-ի առանձնահատկություններ

Խիստ կանոնները #19/#21/#22 (`AGENTS.md`-ում) կարգավորում են զուգահեռ սեսիաները։ Գործառնական հիշեցումներ այս
միջավայրի համար՝

- **Բառացիորեն կրկնեք `git stash`-ի արգելքը git-ին առնչվող յուրաքանչյուր ենթագործակալի հրահանգում**
  (Agent գործիք / Workflow սկրիպտներ). ենթագործակալները չեն ժառանգում այս ֆայլը, իսկ stash-ի միջադեպի
  արձանագրված կրկնությունը տեղի է ունեցել ենթագործակալի միջոցով։
- Նախքան այս սեսիայի ընթացքում ձեր կողմից չստեղծված որևէ PR-ի միավորումը կամ push կատարելը՝ գործարկեք `git worktree list`
  և կրկին ստուգեք `gh pr view <N> --json state,headRefOid` (Խիստ կանոն #22b)։
- Յուրաքանչյուր սեսիա ավարտեք՝ հիմնական checkout-ը թողնելով այն ճյուղում, որտեղից այն սկսվել էր։

## Superpowers / պլանավորման արտեֆակտներ — ուղիների վերասահմանումներ

`_tasks/` պայմանավորվածությունը սահմանված է `AGENTS.md` → "Planning & Research Artifacts" բաժնում։
superpowers հմտությունները տրամադրվում են `docs/…`-ը մատնանշող լռելյայն արժեքներով. այդ լռելյայն արժեքներն այստեղ **վերասահմանված են**։
Երբ superpowers հմտությունը հայտարարում է այնպիսի ուղի, ինչպիսին է "saved to `docs/superpowers/plans/…`",
գրելուց առաջ այն փոխարինեք `_tasks/…` համարժեքով՝

| Արտեֆակտ (հմտություն)                      | Լռելյայն (ՄԻ՛ օգտագործեք) | Փոխարենը պահպանեք այստեղ                                      |
| ------------------------------------------ | ------------------------- | ------------------------------------------------------------- |
| Պլաններ (`writing-plans`)                  | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Սպեցիֆիկացիաներ / դիզայն (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Հետազոտություն (`deep-research`, ad-hoc)   | `docs/research/`          | `_tasks/research/…`                                           |
| Փոխանցումներ (`/handoff`)                  | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit արեք այդ արտեֆակտները `_tasks/` ռեպոզիտորիում (`git -C _tasks …`), երբեք՝ հիմնական ռեպոզիտորիում։

## Սևագիր / ժամանակավոր ֆայլեր — օգտագործեք `_artifacts/`, ոչ թե `/tmp`

Այս նախագիծը վերասահմանում է միջավայրի լռելյայն սեսիոն սևագրատախտակը (`/tmp/claude-*/…`)։ Ժամանակավոր/աշխատանքային
ֆայլերը՝ արտահանումներ, գեներացված zip-եր, մեկանգամյա միջանկյալ արդյունքներ և այն ամենը, ինչ այլապես կտեղադրեիք
`/tmp`-ում, գրեք `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`-ում։

- `_artifacts/`-ը արմատային `_*` ուղի է. այն արդեն անտեսվում է git-ի կողմից (`AGENTS.md` → "Root `_*` paths"), գտնվում է
  միայն սկավառակի վրա և երբեք չի հետագծվում։
- Պատճառը. սևագիր արդյունքը նախագծի ներսում պահելը (`/tmp`-ի փոխարեն) օպերատորին թույլ է տալիս
  հեշտությամբ գտնել և ջնջել բոլոր ժամանակավոր նյութերը մեկ վայրից՝ անցողիկ,
  սեսիային հատուկ `/tmp` պանակներում փնտրելու փոխարեն, որոնք անհետանում են կամ կուտակում չհետագծվող ֆայլեր։
- Սա **մի՛ շփոթեք** `_tasks/`-ի հետ (Խիստ կանոն #23, դրա առանձին մասնավոր git ռեպոզիտորին՝ երկարաժամկետ
  պլանների/սպեցիֆիկացիաների/հետազոտությունների/փոխանցումների համար). `_artifacts/`-ը նախատեսված է միայն դեն նետվող աշխատանքային ֆայլերի համար, այստեղ
  ոչինչ չպետք է պահպանվի երկարաժամկետ կամ տարբերակավորվի։

## Կանաչ բազա՝ նախքան PR-ներ բացելը

Նախքան ճյուղ ստեղծելը կամ PR բացելը՝ գործարկեք բազայի կանաչ լինելու ստուգումը (`AGENTS.md` → Git Workflow →
"Base-green check". նախագծի հմտություններն այն հղում են որպես `.agents/skills/_shared/base-green.md`)։ Եթե PR-ը
բացվել է այն ժամանակ, երբ բազային ճյուղի վերջին commit-ը կարմիր է, դրա նկարագրությունը պետք է պարունակի `⚠️ base-red inherited: #<issue>`։ Կուտակված կարմիր վիճակը
(բազային ճյուղի վերջին commit + կարմիր PR-ներ) վերացնելու համար օգտագործեք `/sweep-reds` հմտությունը։
