# CLAUDE.md (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**تمام قوانین پروژه در [`AGENTS.md`](AGENTS.md) قرار دارند** — تنها منبع حقیقت برای هر دستیار
هوش مصنوعی (معماری، قراردادها، تست، دروازههای کیفیت، گردشکار git، 23 قانون سختگیرانه،
آموختههای PII). آن را بهطور کامل بخوانید؛ قوانین پروژه را دوباره اینجا اضافه نکنید. تمام موارد زیر
فقط برای Claude Code اعمال میشوند — اصلاحات عملیاتیِ قوانینی که از قبل در `AGENTS.md` تعریف شدهاند.

## جداسازی worktree — نکات مختص Claude Code

پروتکل کامل و الزامی worktree (تأیید شاخهٔ پایه، مسیر استاندارد `.claude/worktrees/`،
`cp -al` برای node_modules، قوانین پاکسازی) در `AGENTS.md` ← Git Workflow ← «Worktree
isolation» آمده است. نکات مختص Claude Code:

- شاخهٔ پایه را از طریق `AskUserQuestion` با اپراتور تأیید کنید (قانون سختگیرانهٔ #19)، مگر اینکه
  از قبل آن را به شما گفته باشد.
- ابزار بومی `EnterWorktree` را ترجیح دهید — این ابزار از قبل worktreeها را در
  `.claude/worktrees/` (مسیر استاندارد) ایجاد میکند. worktree را با دستور مستندشدهٔ `git
worktree add` ایجاد کنید، سپس `EnterWorktree` را با `path` آن فراخوانی کنید.

## ایمنی میان نشستها — نکات مختص Claude Code

قوانین سختگیرانهٔ #19/#21/#22 (در `AGENTS.md`) نشستهای موازی را کنترل میکنند. یادآوریهای عملیاتی
برای این محیط:

- **ممنوعیت `git stash` را عیناً در پرامپت هر زیرعاملی که با git کار میکند تکرار کنید**
  (ابزار Agent / اسکریپتهای Workflow) — زیرعاملها این فایل را به ارث نمیبرند و رخداد ثبتشدهٔ
  تکرار مشکل stash از طریق یک زیرعامل اتفاق افتاده است.
- پیش از ادغام یا push کردن در هر PR که در _این نشست_ ایجاد نکردهاید، `git worktree list` را اجرا
  کنید و `gh pr view <N> --json state,headRefOid` را دوباره بررسی کنید (قانون سختگیرانهٔ #22b).
- هر نشست را در حالی پایان دهید که checkout اصلی روی همان شاخهای باشد که نشست با آن آغاز شده بود.

## Superpowers / مصنوعات برنامهریزی — بازنویسی مسیرها

قرارداد `_tasks/` در `AGENTS.md` ← «Planning & Research Artifacts» تعریف شده است. مهارتهای
superpowers با پیشفرضهایی عرضه میشوند که به `docs/…` اشاره دارند — این پیشفرضها **در اینجا
بازنویسی میشوند**. وقتی یکی از مهارتهای superpowers مسیری مانند «saved to
`docs/superpowers/plans/…`» را اعلام میکند، پیش از نوشتن آن را به معادل `_tasks/…` تغییر دهید:

| مصنوع (مهارت)                    | پیشفرض (استفاده نکنید)    | بهجای آن اینجا ذخیره کنید                                     |
| -------------------------------- | ------------------------- | ------------------------------------------------------------- |
| برنامهها (`writing-plans`)       | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| مشخصات / طراحی (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| پژوهش (`deep-research`، موردی)   | `docs/research/`          | `_tasks/research/…`                                           |
| تحویلها (`/handoff`)             | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

آن مصنوعات را درون مخزن `_tasks/` ثبت کنید (`git -C _tasks …`) و هرگز آنها را در مخزن اصلی
ثبت نکنید.

## فایلهای چرکنویس / موقت — از `_artifacts/` استفاده کنید، نه `/tmp`

این پروژه دفترچهٔ چرکنویس پیشفرض نشست در این محیط (`/tmp/claude-*/…`) را بازنویسی میکند.
فایلهای موقت/کاری — خروجیها، فایلهای zip تولیدشده، خروجیهای میانی یکبارمصرف و هر چیزی که
در حالت عادی در `/tmp` قرار میدادید — را بهجای آن در
`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` بنویسید.

- `_artifacts/` یک مسیر ریشهای `_*` است: از قبل در gitignore قرار دارد (`AGENTS.md` ← «Root
  `_*` paths»)، فقط روی دیسک وجود دارد و هرگز ردیابی نمیشود.
- دلیل: نگهداشتن خروجیهای چرکنویس درون پروژه (بهجای `/tmp`) باعث میشود اپراتور بتواند بهآسانی
  تمام فایلهای موقت را در یک مکان پیدا و حذف کند، بدون اینکه مجبور باشد در دایرکتوریهای موقتی
  و مختص هر نشست در `/tmp` جستوجو کند که ناپدید میشوند یا فایلهای ردیابینشده در آنها انباشته
  میشوند.
- این مسیر را با `_tasks/` اشتباه نگیرید (قانون سختگیرانهٔ #23، مخزن خصوصی git مستقل آن برای
  برنامهها/مشخصات/پژوهشها/تحویلهای ماندگار) — `_artifacts/` فقط برای فایلهای کاری دورریختنی
  است و هیچچیز در اینجا نیازی به بقا یا نسخهبندی ندارد.

## سبز بودن پایه پیش از باز کردن PRها

پیش از ایجاد شاخه یا باز کردن PR، بررسی سبز بودن پایه را اجرا کنید (`AGENTS.md` ← Git Workflow ←
«Base-green check»؛ مهارتهای پروژه با `.agents/skills/_shared/base-green.md` به آن ارجاع
میدهند). بدنهٔ PRای که در زمان قرمز بودن نوک شاخهٔ پایه باز میشود باید شامل
`⚠️ base-red inherited: #<issue>` باشد. برای رفع وضعیت قرمز انباشتهشده (نوک شاخهٔ پایه + PRهای
قرمز)، از مهارت `/sweep-reds` استفاده کنید.
