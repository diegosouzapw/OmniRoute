# CLAUDE.md (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**جميع قواعد المشروع موجودة في [`AGENTS.md`](AGENTS.md)** — وهو المصدر الوحيد للحقيقة لكل مساعد
ذكاء اصطناعي (البنية، والاصطلاحات، والاختبارات، وبوابات الجودة، وسير عمل git، والقواعد الصارمة الـ 23،
والدروس المستفادة بشأن PII). اقرأه بالكامل؛ ولا تُعِد إضافة قواعد المشروع هنا. كل ما يلي ينطبق فقط
على Claude Code — تحسينات تشغيلية للقواعد المعرّفة بالفعل في `AGENTS.md`.

## عزل worktree — تفاصيل خاصة بـ Claude Code

يوجد بروتوكول worktree الإلزامي الكامل (تأكيد الفرع الأساسي، والمسار القياسي `.claude/worktrees/`،
و`cp -al` لـ node_modules، وقواعد الإزالة) في `AGENTS.md` ← سير عمل Git ← "عزل
worktree". نقاط خاصة بـ Claude Code:

- أكّد الفرع الأساسي مع المشغّل عبر `AskUserQuestion` (القاعدة الصارمة رقم 19) ما لم يكن قد
  أخبرك به بالفعل.
- فضّل أداة `EnterWorktree` الأصلية — فهي تنشئ بالفعل أشجار العمل ضمن
  `.claude/worktrees/` (المسار القياسي). أنشئ شجرة العمل باستخدام أمر `git
worktree add` الموثّق، ثم استدعِ `EnterWorktree` باستخدام `path` الخاص بها.

## السلامة عبر الجلسات — تفاصيل خاصة بـ Claude Code

تحكم القواعد الصارمة رقم 19/21/22 (في `AGENTS.md`) الجلسات المتوازية. تذكيرات تشغيلية لهذا
الإطار:

- **كرّر حظر `git stash` حرفيًا في مطالبة كل وكيل فرعي يتعامل مع git**
  (أداة Agent / نصوص Workflow البرمجية) — لا ترث الوكلاء الفرعية هذا الملف، وقد وقع التكرار
  المسجّل لحادثة stash عن طريق وكيل فرعي.
- قبل الدمج أو الدفع إلى أي PR لم تنشئه _في هذه الجلسة_، شغّل `git worktree list`
  وأعِد التحقق باستخدام `gh pr view <N> --json state,headRefOid` (القاعدة الصارمة رقم 22b).
- أنهِ كل جلسة مع وجود عملية السحب الرئيسية على الفرع الذي بدأت عليه.

## Superpowers / مخرجات التخطيط — تجاوزات المسارات

اصطلاح `_tasks/` معرّف في `AGENTS.md` ← "مخرجات التخطيط والبحث". تأتي مهارات
superpowers مع إعدادات افتراضية تشير إلى `docs/…` — وهذه الإعدادات الافتراضية **مُتجاوزة
هنا**. عندما تعلن مهارة من superpowers عن مسار مثل "تم الحفظ في `docs/superpowers/plans/…`"،
أعِد كتابته إلى مكافئه ضمن `_tasks/…` قبل الكتابة:

| المُخرج (المهارة)                     | الافتراضي (لا تستخدمه)    | احفظ هنا بدلًا منه                                            |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| الخطط (`writing-plans`)               | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| المواصفات / التصميم (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| البحث (`deep-research`، مخصص)         | `docs/research/`          | `_tasks/research/…`                                           |
| عمليات التسليم (`/handoff`)           | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

ثبّت هذه المخرجات داخل مستودع `_tasks/` (`git -C _tasks …`)، وليس في المستودع الرئيسي مطلقًا.

## الملفات المؤقتة / ملفات العمل — استخدم `_artifacts/`، وليس `/tmp`

يتجاوز هذا المشروع لوحة المسودة الافتراضية للجلسة في الإطار (`/tmp/claude-*/…`). اكتب
ملفات العمل/الملفات المؤقتة — عمليات التصدير، وملفات zip المُنشأة، والمخرجات الوسيطة لمرة واحدة، وأي شيء
كنت ستضعه بخلاف ذلك في `/tmp` — إلى `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` بدلًا من ذلك.

- `_artifacts/` هو مسار جذري يبدأ بـ `_*`: وهو مُضاف بالفعل إلى gitignore (`AGENTS.md` ← "مسارات `_*` الجذرية")، ويوجد
  على القرص فقط، ولا يُتتبّع مطلقًا.
- السبب: إبقاء مخرجات العمل داخل المشروع (بدلًا من `/tmp`) يجعل من السهل جدًا على المشغّل
  العثور على كل ما هو مؤقت وحذفه في مكان واحد، بدلًا من البحث في مجلدات `/tmp`
  المؤقتة الخاصة بكل جلسة، والتي تختفي أو تتراكم دون تتبّع.
- لا **تخلط** بين هذا وبين `_tasks/` (القاعدة الصارمة رقم 23، وهو مستودع git خاص مستقل
  للخطط/المواصفات/الأبحاث/عمليات التسليم الدائمة) — `_artifacts/` مخصص لملفات العمل القابلة للتخلص منها فقط، ولا يحتاج أي
  شيء هنا إلى البقاء أو أن يخضع للتحكم في الإصدارات.

## التأكد من خضرة الفرع الأساسي قبل فتح PRs

قبل إنشاء فرع أو فتح PR، شغّل فحص خضرة الفرع الأساسي (`AGENTS.md` ← سير عمل Git ←
"فحص خضرة الفرع الأساسي"؛ تشير إليه مهارات المشروع باسم `.agents/skills/_shared/base-green.md`). يجب أن
يتضمن PR المفتوح بينما تكون قمة الفرع الأساسي حمراء العبارة `⚠️ base-red inherited: #<issue>` في نصه. لتصفية
حالة حمراء متراكمة (قمة الفرع الأساسي + PRs حمراء)، استخدم مهارة `/sweep-reds`.
