# CLAUDE.md (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Barcha loyiha qoidalari [`AGENTS.md`](AGENTS.md) faylida joylashgan** — har bir AI yordamchisi uchun yagona haqiqat manbai (arxitektura, kelishuvlar, testlash, sifat nazorati bosqichlari, git ish jarayoni, 23 ta qatʼiy qoida, PII bo‘yicha o‘rganilgan saboqlar). Uni to‘liq o‘qing; loyiha qoidalarini bu yerga qayta qo‘shmang. Quyidagilarning barchasi FAQAT Claude Code uchun amal qiladi — bular `AGENTS.md` faylida allaqachon belgilangan qoidalarning operatsion aniqlashtirishlaridir.

## Worktree izolyatsiyasi — Claude Code xususiyatlari

To‘liq majburiy worktree protokoli (asosiy branch’ni tasdiqlash, `.claude/worktrees/` kanonik yo‘li, `cp -al` node_modules, tozalash qoidalari) `AGENTS.md` → Git Workflow → "Worktree isolation" bo‘limida keltirilgan. Claude Code’ga xos jihatlar:

- Agar operator asosiy branch’ni avval aytmagan bo‘lsa, uni `AskUserQuestion` orqali tasdiqlang (qatʼiy qoida #19).
- Mahalliy `EnterWorktree` vositasini afzal ko‘ring — u worktree’larni allaqachon `.claude/worktrees/` (kanonik yo‘l) ostida yaratadi. Worktree’ni hujjatlashtirilgan `git
worktree add` buyrug‘i bilan yarating, so‘ng uning `path` qiymati bilan `EnterWorktree` vositasini chaqiring.

## Sessiyalararo xavfsizlik — Claude Code xususiyatlari

Qatʼiy qoidalar #19/#21/#22 (`AGENTS.md` faylida) parallel sessiyalarni boshqaradi. Ushbu muhit uchun operatsion eslatmalar:

- **Git bilan ishlaydigan har bir subagent promptida `git stash` taqiqini so‘zma-so‘z takrorlang**
  (Agent tool / Workflow scripts) — subagentlar bu faylni meros qilib olmaydi va stash hodisasining qayd etilgan takrorlanishi subagent orqali yuz bergan.
- _Joriy sessiyada_ o‘zingiz yaratmagan har qanday PR’ni birlashtirish yoki unga push qilishdan oldin `git worktree list` buyrug‘ini ishga tushiring va `gh pr view <N> --json state,headRefOid` natijasini qayta tekshiring (qatʼiy qoida #22b).
- Har bir sessiyani asosiy checkout’ni u boshlangan branch’da qoldirgan holda yakunlang.

## Superpowers / rejalashtirish artefaktlari — yo‘l almashtirishlari

`_tasks/` kelishuvi `AGENTS.md` → "Planning & Research Artifacts" bo‘limida belgilangan. Superpowers ko‘nikmalari `docs/…` ga yo‘naltirilgan standart sozlamalar bilan yetkaziladi — bu standart sozlamalar **bu yerda almashtiriladi**. Superpowers ko‘nikmasi "saved to `docs/superpowers/plans/…`" kabi yo‘lni eʼlon qilganda, yozishdan oldin uni `_tasks/…` dagi muqobiliga almashtiring:

| Artefakt (ko‘nikma)                           | Standart (ishlatmang)     | Buning o‘rniga shu yerga saqlang                              |
| --------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Rejalar (`writing-plans`)                     | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spetsifikatsiyalar / dizayn (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Tadqiqot (`deep-research`, ad-hoc)            | `docs/research/`          | `_tasks/research/…`                                           |
| Topshirishlar (`/handoff`)                    | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Ushbu artefaktlarni asosiy repoda emas, `_tasks/` reposi ichida commit qiling (`git -C _tasks …`).

## Qoralama / vaqtinchalik fayllar — `/tmp` emas, `_artifacts/` dan foydalaning

Ushbu loyiha muhitning standart sessiya qoralama joyini (`/tmp/claude-*/…`) almashtiradi. Vaqtinchalik/ishchi fayllarni — eksportlar, yaratilgan zip fayllar, bir martalik oraliq natijalar va aks holda `/tmp` ichiga joylashtiradigan barcha narsalarni — buning o‘rniga `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` ichiga yozing.

- `_artifacts/` ildizdagi `_*` yo‘lidir: u allaqachon git tomonidan eʼtiborsiz qoldiriladi (`AGENTS.md` → "Root `_*` paths"), faqat diskda saqlanadi va hech qachon kuzatuvga olinmaydi.
- Sabab: qoralama natijalarni loyiha ichida (`/tmp` o‘rniga) saqlash operatorga vaqtinchalik narsalarning barchasini bir joydan osongina topish va o‘chirish imkonini beradi; aks holda yo‘qolib ketadigan yoki kuzatuvga olinmagan fayllarni to‘playdigan efemer, sessiyaga xos `/tmp` kataloglarini qidirishga to‘g‘ri keladi.
- Buni `_tasks/` bilan adashtirmang (qatʼiy qoida #23, uzoq muddat saqlanadigan rejalar/spetsifikatsiyalar/tadqiqotlar/topshirishlar uchun alohida xususiy git repo) — `_artifacts/` faqat tashlab yuboriladigan ishchi fayllar uchun mo‘ljallangan, bu yerdagi hech narsa saqlanib qolishi yoki versiyalanishi shart emas.

## PR’larni ochishdan oldin asos yashil bo‘lishi kerak

Branch yaratish yoki PR ochishdan oldin base-green tekshiruvini ishga tushiring (`AGENTS.md` → Git Workflow → "Base-green check"; loyiha ko‘nikmalarida unga `.agents/skills/_shared/base-green.md` sifatida murojaat qilinadi). Asosning oxirgi commit’i qizil holatda bo‘lganida ochilgan PR o‘z body qismida `⚠️ base-red inherited: #<issue>` yozuvini o‘z ichiga olishi shart. To‘planib qolgan qizil holatlarni (asosning oxirgi commit’i + qizil PR’lar) bartaraf etish uchun `/sweep-reds` ko‘nikmasidan foydalaning.
