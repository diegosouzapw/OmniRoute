# CLAUDE.md (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**პროექტის ყველა წესი თავმოყრილია [`AGENTS.md`](AGENTS.md)-ში** — ეს არის ჭეშმარიტების ერთადერთი წყარო ყველა AI
ასისტენტისთვის (არქიტექტურა, შეთანხმებები, ტესტირება, ხარისხის საკონტროლო ეტაპები, git-ის სამუშაო პროცესი, 23 მკაცრი წესი,
PII-სთან დაკავშირებული მიგნებები). სრულად წაიკითხეთ; პროექტის წესები აქ ხელახლა არ დაამატოთ. ქვემოთ მოცემული ყველაფერი ვრცელდება მხოლოდ
Claude Code-ზე — `AGENTS.md`-ში უკვე განსაზღვრული წესების საოპერაციო დაზუსტებები.

## Worktree-ის იზოლაცია — Claude Code-ის სპეციფიკა

Worktree-ის სრული სავალდებულო პროტოკოლი (საბაზისო branch-ის დადასტურება, `.claude/worktrees/`-ის კანონიკური
path, `cp -al` node_modules, გაუქმების წესები) მოცემულია `AGENTS.md` → Git Workflow → "Worktree
isolation"-ში. Claude Code-ისთვის სპეციფიკური პუნქტები:

- დაადასტურეთ საბაზისო branch ოპერატორთან `AskUserQuestion`-ის მეშვეობით (მკაცრი წესი #19), თუ მას
  ეს უკვე არ უთქვამს.
- უპირატესობა მიანიჭეთ ჩაშენებულ `EnterWorktree` ხელსაწყოს — ის worktree-ებს უკვე
  `.claude/worktrees/`-ში (კანონიკურ path-ზე) ქმნის. შექმენით worktree დოკუმენტირებული `git
worktree add` ბრძანებით, შემდეგ კი გამოიძახეთ `EnterWorktree` მისი `path`-ით.

## სესიებს შორის უსაფრთხოება — Claude Code-ის სპეციფიკა

მკაცრი წესები #19/#21/#22 (`AGENTS.md`-ში) მართავს პარალელურ სესიებს. საოპერაციო შეხსენებები ამ
გარემოსთვის:

- **სიტყვასიტყვით გაიმეორეთ `git stash`-ის აკრძალვა ყოველი იმ ქვეაგენტის prompt-ში, რომელიც git-ს ეხება**
  (Agent tool / Workflow scripts) — ქვეაგენტები ამ ფაილს არ მემკვიდრეობენ, ხოლო stash-თან დაკავშირებული ინციდენტის
  დაფიქსირებული განმეორება სწორედ ქვეაგენტის მეშვეობით მოხდა.
- ნებისმიერი PR-ის merge-მდე ან push-მდე, რომელიც _ამ სესიაში_ არ შეგიქმნიათ, გაუშვით `git worktree list`
  და ხელახლა შეამოწმეთ `gh pr view <N> --json state,headRefOid` (მკაცრი წესი #22b).
- ყოველი სესია დაასრულეთ ისე, რომ მთავარი checkout იმ branch-ზე იყოს, რომელზეც სესიის დასაწყისში იყო.

## Superpowers / დაგეგმვის არტეფაქტები — path-ების ჩანაცვლებები

`_tasks/`-ის შეთანხმება განსაზღვრულია `AGENTS.md` → "Planning & Research Artifacts"-ში.
superpowers-ის skills-ს მოჰყვება ნაგულისხმევი მნიშვნელობები, რომლებიც `docs/…`-ზე მიუთითებს — ეს ნაგულისხმევი მნიშვნელობები **აქ
ჩანაცვლებულია**. როდესაც superpowers-ის skill აცხადებს path-ს, მაგალითად "შენახულია `docs/superpowers/plans/…`-ში",
ჩაწერამდე ის `_tasks/…`-ის შესაბამისი ვარიანტით ჩაანაცვლეთ:

| არტეფაქტი (skill)                          | ნაგულისხმევი (არ გამოიყენოთ) | ამის ნაცვლად შეინახეთ აქ                                      |
| ------------------------------------------ | ---------------------------- | ------------------------------------------------------------- |
| გეგმები (`writing-plans`)                  | `docs/superpowers/plans/`    | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| სპეციფიკაციები / დიზაინი (`brainstorming`) | `docs/superpowers/specs/`    | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| კვლევა (`deep-research`, ad-hoc)           | `docs/research/`             | `_tasks/research/…`                                           |
| გადაბარებები (`/handoff`)                  | —                            | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

დააკომიტეთ ეს არტეფაქტები `_tasks/` repo-ში (`git -C _tasks …`), არასოდეს — მთავარ repo-ში.

## მონახაზი / დროებითი ფაილები — გამოიყენეთ `_artifacts/`, არა `/tmp`

ეს პროექტი ცვლის გარემოს სესიის მონახაზების ნაგულისხმევ ადგილს (`/tmp/claude-*/…`). დროებითი/სამუშაო
ფაილები — exports, გენერირებული zip-ები, ერთჯერადი შუალედური შედეგები და ყველაფერი, რასაც სხვა შემთხვევაში
`/tmp`-ში მოათავსებდით — ამის ნაცვლად ჩაწერეთ `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`-ში.

- `_artifacts/` არის root-ის `_*` path: ის უკვე gitignore-შია (`AGENTS.md` → "Root `_*` paths"), მხოლოდ
  დისკზე ინახება და არასოდეს ტრეკდება.
- მიზეზი: მონახაზის შედეგების პროექტის შიგნით შენახვა (`/tmp`-ის ნაცვლად) ოპერატორს საშუალებას აძლევს
  მარტივად იპოვოს და ერთ ადგილას წაშალოს ყველაფერი დროებითი, ნაცვლად იმისა, რომ ეძებოს ეფემერულ,
  კონკრეტული სესიის `/tmp` დირექტორიებში, რომლებიც ქრება ან დაუტრეკავ ფაილებს აგროვებს.
- ეს **არ** აგერიოთ `_tasks/`-ში (მკაცრი წესი #23, მისი საკუთარი private git repo მდგრადი
  გეგმებისთვის/სპეციფიკაციებისთვის/კვლევისთვის/გადაბარებებისთვის) — `_artifacts/` განკუთვნილია მხოლოდ ერთჯერადი სამუშაო ფაილებისთვის და აქ
  არაფერს სჭირდება შენარჩუნება ან ვერსირება.

## Base-green PR-ების გახსნამდე

Branch-ის შექმნამდე ან PR-ის გახსნამდე გაუშვით base-green შემოწმება (`AGENTS.md` → Git Workflow →
"Base-green check"; პროექტის skills მას მოიხსენიებს, როგორც `.agents/skills/_shared/base-green.md`). თუ PR
გახსნილია მაშინ, როცა base tip წითელია, მის body-ში უნდა ეწეროს `⚠️ base-red inherited: #<issue>`. დაგროვილი
წითელი მდგომარეობის (base tip + წითელი PR-ები) აღმოსაფხვრელად გამოიყენეთ `/sweep-reds` skill.
