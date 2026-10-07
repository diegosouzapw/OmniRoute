# CLAUDE.md (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**پروجیکٹ کے تمام قواعد [`AGENTS.md`](AGENTS.md) میں موجود ہیں** — ہر AI اسسٹنٹ کے لیے حقیقت کا واحد مستند ماخذ
(آرکیٹیکچر، روایات، ٹیسٹنگ، کوالٹی گیٹس، git ورک فلو، 23 سخت قواعد،
PII سے متعلق سیکھے گئے اسباق)۔ اسے مکمل پڑھیں؛ پروجیکٹ کے قواعد یہاں دوبارہ شامل نہ کریں۔ ذیل میں موجود ہر چیز کا اطلاق صرف
Claude Code پر ہوتا ہے — یہ `AGENTS.md` میں پہلے سے بیان کردہ قواعد کی عملی وضاحتیں ہیں۔

## ورک ٹری علیحدگی — Claude Code کی خصوصیات

مکمل لازمی ورک ٹری پروٹوکول (بیس برانچ کی تصدیق، `.claude/worktrees/` کا مستند
پاتھ، `cp -al` node_modules، اختتامی صفائی کے قواعد) `AGENTS.md` → Git Workflow → "Worktree
isolation" میں موجود ہے۔ Claude Code سے متعلق نکات:

- `AskUserQuestion` کے ذریعے آپریٹر سے بیس برانچ کی تصدیق کریں (سخت قاعدہ #19)، الا یہ کہ وہ
  پہلے ہی آپ کو بتا چکے ہوں۔
- مقامی `EnterWorktree` ٹول کو ترجیح دیں — یہ پہلے ہی
  `.claude/worktrees/` (مستند پاتھ) کے تحت ورک ٹریز بناتا ہے۔ دستاویز شدہ `git
worktree add` کمانڈ سے ورک ٹری بنائیں، پھر اس کے `path` کے ساتھ `EnterWorktree` کو کال کریں۔

## مختلف سیشنز کے مابین حفاظت — Claude Code کی خصوصیات

سخت قواعد #19/#21/#22 (`AGENTS.md` میں) متوازی سیشنز کو منظم کرتے ہیں۔ اس
ہارنِس کے لیے عملی یاددہانیاں:

- **git کو چھونے والے ہر سب ایجنٹ کے پرامپٹ میں `git stash` کی ممانعت من و عن نقل کریں**
  (Agent ٹول / Workflow اسکرپٹس) — سب ایجنٹس کو یہ فائل وراثت میں نہیں ملتی، اور stash واقعے
  کی ریکارڈ شدہ تکرار ایک سب ایجنٹ کے ذریعے ہوئی تھی۔
- کسی ایسے PR کو مرج یا پش کرنے سے پہلے جسے آپ نے _اس سیشن میں_ نہیں بنایا، `git worktree list`
  چلائیں اور `gh pr view <N> --json state,headRefOid` دوبارہ چیک کریں (سخت قاعدہ #22b)۔
- ہر سیشن کے اختتام پر مرکزی چیک آؤٹ کو اسی برانچ پر رکھیں جس پر وہ سیشن کے آغاز میں تھا۔

## Superpowers / منصوبہ بندی کے آرٹیفیکٹس — پاتھ اوور رائیڈز

`_tasks/` کی روایت `AGENTS.md` → "Planning & Research Artifacts" میں بیان کی گئی ہے۔
superpowers اسکلز کے ڈیفالٹس `docs/…` کی طرف اشارہ کرتے ہیں — ان ڈیفالٹس کو **یہاں
اوور رائیڈ کیا گیا ہے**۔ جب کوئی superpowers اسکل "saved to `docs/superpowers/plans/…`"
جیسا پاتھ بتائے، تو لکھنے سے پہلے اسے `_tasks/…` کے مساوی پاتھ میں تبدیل کریں:

| آرٹیفیکٹ (اسکل)                    | ڈیفالٹ (استعمال نہ کریں)  | اس کے بجائے یہاں محفوظ کریں                                   |
| ---------------------------------- | ------------------------- | ------------------------------------------------------------- |
| منصوبے (`writing-plans`)           | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| وضاحتیں / ڈیزائن (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| تحقیق (`deep-research`، عارضی)     | `docs/research/`          | `_tasks/research/…`                                           |
| حوالگیاں (`/handoff`)              | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

ان آرٹیفیکٹس کو `_tasks/` ریپو کے اندر کمیٹ کریں (`git -C _tasks …`)، مرکزی ریپو میں کبھی نہیں۔

## اسکریچ / عارضی فائلیں — `/tmp` کے بجائے `_artifacts/` استعمال کریں

یہ پروجیکٹ ہارنِس کے ڈیفالٹ سیشن اسکریچ پیڈ (`/tmp/claude-*/…`) کو اوور رائیڈ کرتا ہے۔ عارضی/ورکنگ
فائلیں — ایکسپورٹس، تیار کردہ zip فائلیں، یک وقتی درمیانی آؤٹ پٹس، اور ہر وہ چیز جو آپ بصورتِ دیگر
`/tmp` میں رکھتے — اس کے بجائے `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` میں لکھیں۔

- `_artifacts/` ایک روٹ `_*` پاتھ ہے: پہلے ہی gitignore میں شامل ہے (`AGENTS.md` → "Root `_*` paths")، صرف
  ڈسک پر رہتا ہے، کبھی ٹریک نہیں کیا جاتا۔
- وجہ: اسکریچ آؤٹ پٹ کو پروجیکٹ کے اندر (`/tmp` کے بجائے) رکھنے سے آپریٹر کے لیے
  تمام عارضی چیزوں کو ایک ہی جگہ تلاش کرنا اور حذف کرنا آسان ہو جاتا ہے، بجائے اس کے کہ عارضی
  سیشن-مخصوص `/tmp` ڈائریکٹریز میں تلاش کرنا پڑے جو غائب ہو جاتی ہیں یا غیر ٹریک شدہ صورت میں جمع ہوتی رہتی ہیں۔
- اسے `_tasks/` کے ساتھ **خلط ملط نہ کریں** (سخت قاعدہ #23، پائیدار
  منصوبوں/وضاحتوں/تحقیق/حوالگیوں کے لیے اس کا اپنا نجی git ریپو ہے) — `_artifacts/` صرف قابلِ تلف ورکنگ فائلوں کے لیے ہے؛ یہاں
  کسی چیز کو برقرار رکھنے یا ورژن کرنے کی ضرورت نہیں۔

## PRs کھولنے سے پہلے بیس کا سبز ہونا

برانچ بنانے یا PR کھولنے سے پہلے، بیس-گرین چیک چلائیں (`AGENTS.md` → Git Workflow →
"Base-green check"؛ پروجیکٹ اسکلز اسے `.agents/skills/_shared/base-green.md` کے طور پر حوالہ دیتی ہیں)۔ ایسے وقت میں کھولے گئے PR
جب بیس ٹِپ سرخ ہو، اس کی باڈی میں `⚠️ base-red inherited: #<issue>` لازماً شامل ہونا چاہیے۔ جمع شدہ سرخ حالت
(بیس ٹِپ + سرخ PRs) کو صاف کرنے کے لیے `/sweep-reds` اسکل استعمال کریں۔
