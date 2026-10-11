# Merge Queue & Manual Merge-Train Runbook (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (معیار/رفتار منصوبے کے WS3.2/WS3.4) سے جائزہ شدہ PRs کو
`release/vX.Y.Z` میں ضم کرنے کا طے شدہ راستہ **Mergify merge queue** (`.mergify.yml`) ہے؛
ذیل میں دستاویزی **دستی merge-train** متبادل راستہ ہے — جسے واقعات، ریلیز منجمد ہونے،
یا Mergify Open Source منصوبہ کبھی تبدیل ہونے کی صورت میں استعمال کیا جاتا ہے۔

## طے شدہ راستہ: Mergify قطار

1. PR کا campaigns کے ذریعے جائزہ لیا جاتا ہے/اسے کامیاب قرار دیا جاتا ہے، اور مالک کا pre-merge ⭐
   gate اسے منظور کرتا ہے (رپورٹ + ہر آئٹم کا فیصلہ — `/merge-prs` مرحلہ 0.75 دیکھیں)۔
2. مالک (یا مالک کے فیصلے پر عمل کرنے والا session) **`queue`**
   label لگاتا ہے۔ یہی label merge کی منظوری ہے؛ Mergify صرف اس پر عمل درآمد کرتا ہے۔
3. Mergify قطار میں موجود PRs کو fast-gates کے مقابل **یکے بعد دیگرے** (ایک وقت میں ایک) validate
   کرتا ہے اور merge (squash) کرتا ہے۔ Batching + خودکار bisection، Mergify کے ایک بامعاوضہ tier
   میں دستیاب ہے (مفت plan پر "Merge Queue batch استعمال نہیں کیا جا سکتا"، #7220)، اس لیے `.mergify.yml` میں کوئی
   `batch_size` مقرر نہیں کیا گیا؛ batching بدستور ذیل میں دی گئی دستی merge-train کی ذمہ داری ہے۔ ایسا PR جس کے
   checks، `checks_timeout` (240 منٹ = `quality.yml` کے ماپے گئے p95 کا 2×) کے بعد بھی pending
   ہوں، قطار کو روکنے کے بجائے اس سے نکال دیا جاتا ہے۔
4. merge کے بعد، continuous release-green workflow، push ہونے پر نئے tip کو validate کرتا ہے
   اور اگر اس مجموعے میں regression آئے تو attribution issue کھولتا ہے (کبھی بھی خودکار revert نہیں کرتا)۔

حفاظتی اصول (`CLAUDE.md` کے سخت اصول #21/#22 کی عکاسی کرتے ہیں):

- **Release freeze جاری ہو** → frozen branch کو ہدف بنانے والے PRs پر label نہ لگائیں؛ پہلے انہیں
  فعال `release/vX+1` پر retarget کریں۔
- **کسی دوسرے session کا in-flight PR** → اس پر کبھی label نہ لگائیں؛ صرف مالک session ہی
  اپنے کام کو قطار میں شامل کرتا ہے۔
- صرف tests پر مشتمل diffs اور `hotfix` label والے PRs پہلے ہی محدود CI چلاتے ہیں (`RELEASE_CHECKLIST.md`
  → Hotfix Fast-Lane دیکھیں)؛ قطار کی شرائط checks کے اس مجموعے کو قبول کرتی ہیں جو حقیقتاً
  چلا ہو (`#check-failure=0` + `#check-pending=0`)۔

## متبادل راستہ: دستی merge-train

قطار دستیاب نہ ہونے پر استعمال کیا جاتا ہے۔ یہ اُس طریقۂ کار کو باقاعدہ بناتا ہے جس نے v3.8.47
دور کے دوران ایک دن میں 33 PRs نمٹائے تھے:

1. **بیچ تیار کریں** (تقریباً 10–30 جائزہ شدہ+منظور شدہ PRs)۔ `linked:` تصادم
   (ایک جیسی `tap.testFiles`، ایک جیسے CHANGELOG حصے) چیک کریں اور انہیں سلسلہ وار چلائیں۔
2. **صرف ایک بار توثیق کریں**: ریلیز tip سے بنائی گئی ایک الگ worktree میں تمام بیچ
   heads کو مقامی طور پر ضم کریں، پھر ریلیز کے مساوی suite چلائیں
   (`npm run check:release-green`، ریلیز سے پہلے `--with-build` شامل کریں)۔
   `scripts/release/merge-train.sh <base> <PR#>…` مراحل 1–2 کو خودکار بناتا ہے (متصادم
   PRs خارج ہو جاتے ہیں، train جاری رہتی ہے)۔ مکمل موڈ `npm run test:unit` چلاتا ہے — یعنی
   باکس کے مطابق ڈھالا گیا runner (`--test-concurrency=20`)، **نہ کہ** دو سلسلہ وار 4-core CI
   shards، جو غالب مرحلے کو 16-core باکس کے تقریباً 25% پر چلاتے تھے (درست کیا گیا
   2026-07-18)۔ `--fast` (دن کے اندر mega-train نمٹانے کے لیے، مالک کی منظوری سے 2026-07-18)
   ہر static gate + vitest برقرار رکھتا ہے مگر صرف ان node:test فائلوں کو چلاتا ہے جو
   شامل شدہ PRs نے تبدیل کی ہوں؛ جمع شدہ tip پر مکمل suite اب بھی روزانہ کم از کم ایک بار
   چلانا لازم ہے (`--fast` کے بغیر ایک train)۔
3. **سبز** → PRs کو ترتیب وار ضم کریں (ہر ایک سے پہلے `state,headRefOid` دوبارہ چیک کرتے ہوئے —
   جس PR کا head بدل چکا ہو وہ دوبارہ جائزے کی قطار میں جاتا ہے)۔ ثابت کریں کہ ہر merge کا خالص diff
   PR کی اپنی تبدیلی ہی ہے (خودکار resolve سے ہونے والے reverts نہیں: دائرۂ کار سے باہر
   deletions کے لیے `git diff --stat` کا آڈٹ کریں)۔
4. **سرخ** → ایک ایک کر کے دوبارہ توثیق کرنے کے بجائے بیچ کو نصف حصوں میں تقسیم کریں
   (ہر نصف کی توثیق کریں)؛ مسئلہ پیدا کرنے والے PR کو شواہد کے ساتھ جائزے کی قطار میں واپس ڈالیں۔
5. **کبھی نہ کریں**: منجمد ہونے کے دوران منجمد برانچ میں merge؛ کہیں بھی `git stash`؛
   یہ امید کرتے ہوئے CI کو اندھا دھند دوبارہ چلانا کہ سرخ نتیجہ ختم ہو جائے گا (قاعدہ: سرخ نتیجہ معلومات ہے)۔

## درجات (صرف fast-gates کے ساتھ قطار کیوں محفوظ ہے)

- **فی PR** (quality.yml fast-gates): TIA سے متاثرہ ٹیسٹس + مکمل unit 4-shard +
  vitest + lint مجموعہ + typecheck + docs/changelog کی سالمیت۔
- **فی بیچ/tip** (مسلسل release-green): ریلیز برانچ پر ہر push کے لیے `--quick` HARD gates؛
  مکمل `--with-build --full-ci` sweeps دن میں 3 بار۔
- **فی ریلیز** (ریلیز PR پر ci.yml): مکمل matrix بشمول E2E ×9،
  package-artifact + tarball boot-smoke، coverage/ratchets۔

کسی چیز کی توثیق پہلے سے کم نہیں ہوتی — بھاری سطح صرف فی PR کے بجائے فی بیچ/tip
چلتی ہے، اور یہی O(N) round-trips کو ختم کرتا ہے۔

## `merge-train.sh` کے لیے تازہ checkout کی پیشگی شرائط

اسکرپٹ root checkout پر (کسی بھی worktree کام سے پہلے) فوری ناکامی والا **preflight** چلاتا ہے
تاکہ خراب installation کبھی سرخ train کے طور پر ظاہر نہ ہو سکے:

1. `npm ci`، پھر وہ `bun` postinstall چلائیں جسے npm روکتا ہے:
   `(cd node_modules/bun && node install.js)` — بصورتِ دیگر `check:provider-consistency`
   اور `check:known-symbols` (دونوں `bun scripts/…`) train اور base دونوں پر
   کسی violation line کے بغیر ناکام ہو جاتے ہیں۔
2. کوئی فالتو `node_modules/node_modules` موجود نہ ہو (ایک duplicate dependency tree؛ React دو بار load ہوتا ہے
   اور UI vitest suites فوراً ناکام ہو جاتے ہیں)۔
3. `node_modules/.bin/tsc` موجود اور قابلِ اجرا ہو (نامکمل installation میں یہ موجود نہیں ہوتا)۔

train لازمی `npm run check:cycles:ratchet` چلاتی ہے؛ سادہ `npm run check:cycles`
مشاورتی ہے (یہ SCCs کی فہرست دکھاتا ہے اور صحت مند base پر بھی non-zero کے ساتھ خارج ہوتا ہے)۔
