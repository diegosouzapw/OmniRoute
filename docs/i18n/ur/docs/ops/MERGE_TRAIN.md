# Merge Queue & Manual Merge-Train Runbook (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (معیار/رفتار منصوبے کے WS3.2/WS3.4) سے، جائزہ شدہ PRs کو
`release/vX.Y.Z` میں ضم کرنے کا طے شدہ راستہ **Mergify merge queue** (`.mergify.yml`)
ہے؛ ذیل میں دستاویزی شکل میں درج **دستی merge-train** متبادل راستہ ہے — جسے واقعات،
ریلیز منجمد ہونے، یا Mergify Open Source منصوبہ کبھی تبدیل ہونے کی صورت میں استعمال کیا جاتا ہے۔

## طے شدہ راستہ: Mergify قطار

1. مہمات کے ذریعے PR کا جائزہ لیا جاتا/اسے سبز قرار دیا جاتا ہے اور مالک کے قبل از انضمام ⭐
   گیٹ سے منظوری دی جاتی ہے (رپورٹ + ہر آئٹم کا فیصلہ — `/merge-prs` مرحلہ 0.75 دیکھیں)۔
2. مالک (یا مالک کے فیصلے پر عمل کرنے والا سیشن) **`queue`**
   لیبل لگاتا ہے۔ یہ لیبل ہی انضمام کی منظوری ہے؛ Mergify صرف اس پر عمل درآمد کرتا ہے۔
3. Mergify قطار میں موجود زیادہ سے زیادہ 10 PRs کو ایک بیچ میں شامل کرتا ہے، بیچ کو تیز رفتار گیٹس کے مقابل
   توثیق کرتا ہے، اور ضم کرتا ہے (squash)۔ سرخ بیچ کو **خودکار طور پر دو حصوں میں تقسیم** کیا جاتا ہے — مسئلہ پیدا کرنے والے PR
   کو تقریباً log2(N) دوبارہ توثیقات میں الگ کر کے قطار سے نکال دیا جاتا ہے؛ باقی آگے بڑھتے ہیں۔
4. انضمام کے بعد، مسلسل release-green ورک فلو push پر نئے tip کی توثیق کرتا ہے
   اور اگر مجموعے میں رجعت آئی ہو تو انتساب کا issue کھولتا ہے (کبھی خودکار revert نہیں کرتا)۔

حفاظتی اصول (`CLAUDE.md` کے سخت اصول #21/#22 کے مطابق):

- **ریلیز منجمد ہے** → منجمد برانچ کو ہدف بنانے والے PRs پر لیبل نہ لگائیں؛ پہلے انہیں فعال
  `release/vX+1` کی طرف دوبارہ ہدف بنائیں۔
- **کسی دوسرے سیشن کا زیرِ عمل PR** → اس پر کبھی لیبل نہ لگائیں؛ صرف مالک سیشن ہی
  اپنے کام کو قطار میں شامل کرتا ہے۔
- صرف ٹیسٹس پر مشتمل diffs اور `hotfix` لیبل والے PRs پہلے ہی محدود CI چلاتے ہیں (دیکھیں
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane)؛ قطار کی شرائط درحقیقت چلنے والے کسی بھی
  چیک سیٹ کو قبول کرتی ہیں (`#check-failure=0` + `#check-pending=0`)۔

## متبادل راستہ: دستی merge-train

قطار دستیاب نہ ہونے پر استعمال کیا جاتا ہے۔ یہ اس طریقۂ کار کو ضابطہ بند کرتا ہے جس نے
v3.8.47 دور کے دوران ایک دن میں 33 PRs نمٹائے تھے:

1. **بیچ تیار کریں** (تقریباً 10–30 جائزہ شدہ+منظور شدہ PRs)۔ `linked:` تصادم
   (ایک جیسے `tap.testFiles`، CHANGELOG کے ایک جیسے حصے) چیک کریں اور انہیں سلسلہ وار چلائیں۔
2. **صرف ایک بار توثیق کریں**: release tip سے بنائے گئے ایک الگ worktree میں تمام بیچ
   heads کو مقامی طور پر ضم کریں، پھر ریلیز کے مساوی suite کو چلائیں
   (`npm run check:release-green`، ریلیز سے پہلے `--with-build` شامل کریں)۔
   `scripts/release/merge-train.sh <base> <PR#>…` مراحل 1–2 کو خودکار بناتا ہے (متصادم
   PRs خارج ہو جاتے ہیں، train جاری رہتی ہے)۔ مکمل mode میں `npm run test:unit` چلتا ہے — یعنی
   مشین کے مطابق ڈھالا گیا runner (`--test-concurrency=20`)، **نہ کہ** دو سلسلہ وار 4-core CI
   shards، جن کی وجہ سے غالب مرحلہ 16-core مشین کے تقریباً 25% پر چلتا تھا (درست کیا گیا
   2026-07-18)۔ `--fast` (دن کے اندر mega-train کی نکاسی، مالک سے منظور شدہ 2026-07-18)
   ہر static gate + vitest برقرار رکھتا ہے، مگر صرف سوار کیے گئے PRs سے تبدیل ہونے والی node:test فائلیں
   چلاتا ہے؛ پھر بھی جمع شدہ tip پر روزانہ کم از کم ایک بار مکمل suite چلنا
   ضروری ہے (`--fast` کے بغیر ایک train)۔
3. **سبز** → PRs کو ترتیب وار ضم کریں (ہر ایک سے پہلے `state,headRefOid` دوبارہ چیک کریں —
   جس PR کا head تبدیل ہوا ہو وہ دوبارہ جائزے میں داخل ہوتا ہے)۔ ثابت کریں کہ ہر انضمام کا حتمی diff
   خود اسی PR کی تبدیلی ہے (خودکار resolve کے دوران کوئی revert نہیں: دائرۂ کار سے باہر حذف شدہ مواد کے لیے
   `git diff --stat` کا آڈٹ کریں)۔
4. **سرخ** → ایک ایک کر کے دوبارہ توثیق کرنے کے بجائے بیچ کو نصف حصوں میں تقسیم کریں
   (ہر نصف کی توثیق کریں)؛ مسئلہ پیدا کرنے والے PR کو شواہد کے ساتھ جائزے کی قطار میں واپس بھیجیں۔
5. **کبھی نہ کریں**: منجمد ہونے کے دوران منجمد برانچ میں انضمام؛ کہیں بھی `git stash`؛
   سرخ نتیجہ ختم ہونے کی امید میں CI کو اندھا دھند دوبارہ چلانا (اصول: سرخ نتیجہ معلومات فراہم کرتا ہے)۔

## درجات بندی (صرف تیز رفتار گیٹس کے ساتھ قطار محفوظ کیوں ہے)

- **فی PR** (quality.yml تیز رفتار گیٹس): TIA سے متاثرہ ٹیسٹس + مکمل unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog کی سالمیت۔
- **فی بیچ/tip** (مسلسل release-green): release برانچ پر ہر push کے لیے `--quick` HARD
  گیٹس؛ مکمل `--with-build --full-ci` جائزے دن میں 3 بار۔
- **فی ریلیز** (ریلیز PR پر ci.yml): مکمل matrix بشمول E2E ×9،
  package-artifact + tarball boot-smoke، coverage/ratchets۔

کسی چیز کی توثیق پہلے سے کم نہیں ہوتی — بھاری دائرۂ کار بس فی PR کے بجائے فی بیچ/tip
چلتا ہے، اور یہی O(N) چکروں کو ختم کرتا ہے۔
