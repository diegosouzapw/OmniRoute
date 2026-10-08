# Release-Green: keeping the queue and release branch green (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## یہ جس مسئلے کو حل کرتا ہے

**مکمل گیٹ** (`.github/workflows/ci.yml` — یونٹ شارڈز، vitest، ریچٹس،
`package-artifact`، SonarQube، E2E) **صرف ریلیز PR** (PR → `main`) پر چلتا ہے۔ `release/**`
کو ہدف بنانے والے PRs کو **فاسٹ گیٹس** (`quality.yml`: TIA سے متاثرہ ٹیسٹس + ٹائپ چیک + لنٹ)
ملتے ہیں، اور کوڈ میں تبدیلیوں کے لیے ایک **مشاورتی** پروڈکشن بلڈ بھی چلتا ہے۔ نتیجہ: صرف ریلیز سے
متعلق ناکامیاں ریلیز برانچ پر خاموشی سے جمع ہوتی رہ سکتی ہیں اور ریلیز کے وقت **تقریباً 40 منٹ
کی تہوں میں یکے بعد دیگرے پھٹ سکتی ہیں**۔

"release-green فیملی" ان ناکامیوں کا **پیشگی اندازہ** لگانے کے لیے موجود ہے — مکمل گیٹ کے مساوی
توثیق **مقامی طور پر / ریلیز سے باہر**، کسی بھی وقت کرنا، تاکہ ریلیز PR اپنی پہلی CI رن ہی میں
گرین ہو۔

> **ناقابلِ سمجھوتہ اصول:** اس میں سے کوئی چیز کنٹریبیوٹر کا راستہ نہیں روکتی۔ ہم ایسا کوئی لازمی
> چیک شامل نہیں کرتے جو ان کے PR کو ناکام کرے۔ **ڈرفٹ** (ریچٹس) کو ریلیز کے وقت دوبارہ بیس لائن
> کرنا مینٹینر کی ذمہ داری ہے — یہ کبھی بھی کنٹریبیوٹر کا مسئلہ نہیں۔ کوئی بھی حصہ نہ تو PR کو
> **بند** کرتا ہے (کریڈٹ چوری) اور نہ ہی پاس ہونے کے لیے کسی ٹیسٹ کو **کمزور** کرتا ہے۔

## فیملی (4 حصے) — اور ہر حصہ آزادانہ طور پر کیسے چلتا ہے

| حصہ                                                                  | یہ کیا ہے                                                                 | کب چلانا ہے                                                                       | دائرۂ کار                   |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------- |
| **`/green-prs`** (حل A)                                              | مینٹینر کی جانب سے **کھلے PRs کی قطار** کا آن ڈیمانڈ اسکین                | **آزادانہ طور پر، وقتاً فوقتاً** — اور خاص طور پر `/generate-release` سے **پہلے** | پوری PR قطار → `release/**` |
| **`/validate-release-green`** (حل C — `npm run check:release-green`) | توثیقی انجن: کسی برانچ یا مرج امیدوار کے خلاف مکمل گیٹ کو دوبارہ چلاتا ہے | آزادانہ طور پر، کسی بھی وقت                                                       | ایک مخصوص برانچ یا مرج PR   |
| **`/babysit <PR#>`**                                                 | **ایک** PR کی **لائیو CI** کو گرین ہونے تک چلاتا ہے                       | آزادانہ طور پر، فی PR                                                             | ایک واحد PR                 |
| **`nightly-release-green.yml`** (حل D)                               | خودکار راتانہ ورک فلو؛ HARD ناکامی پر ایشو کھولتا ہے                      | خودکار (cron)                                                                     | فعال ریلیز برانچ            |

**"کیا یہ صرف ریلیزز کے لیے ہے؟" کا مختصر جواب:** **نہیں۔** `/green-prs` کو
**ریلیزز کے درمیان، وقتاً فوقتاً** چلانے کے لیے ڈیزائن کیا گیا تھا۔ اسے آزادانہ طور پر چلانا معمول
ہے — ریلیز صرف وہ موقع ہے جب اسے چلانے سے سب سے زیادہ فائدہ حاصل ہوتا ہے۔

## PR سے ریلیز تک مشاورتی بلڈ

`quality.yml` میں اب غیر مسودہ code PRs اور Mergify queue branches کے لیے `Build (advisory)` شامل ہے۔
یہ `ci.yml` کی production build ترکیب کی عکاسی کرتا ہے: Node 24، `npm-ci-retry`،
`check:node-runtime`، اور `OMNIROUTE_USE_TURBOPACK=1` کے ساتھ `npm run build`۔ یہ جان بوجھ کر
build artifact اپ لوڈ نہیں کرتا کیونکہ اس workflow میں کوئی downstream quality job اسے استعمال نہیں کرتی۔
مستحکم release-PR runs کے ایک ہفتے بعد `continue-on-error` ہٹا دیں تاکہ یہ signal ایک
blocking PR-to-release gate بن جائے۔

## حل C — `npm run check:release-green` (انجن)

موجودہ working tree پر release کے مساوی validation کو دوبارہ انجام دیتا ہے اور ہر red کی درجہ بندی کرتا ہے:

- **HARD** (typecheck، lint errors، unit، vitest، db-rules، public-creds، اختیاری
  `package-artifact`) → **حقیقی نقص**؛ `exit 1`۔ source branch پر درست کیا جاتا ہے (TDD، Rule #18)۔
- **DRIFT** (eslint **warnings**، cognitive-complexity، file-size) → cycle میں جمع ہونے والا ratchet drift،
  **contributor کی غلطی نہیں**؛ اسے صرف رپورٹ کیا جاتا ہے اور **release کے وقت maintainer دوبارہ baseline
  مقرر کرتا ہے**۔ Drift **کبھی بھی** exit code تبدیل نہیں کرتا — اس لیے یہ کبھی کسی کو block نہیں کرتا۔

```bash
npm run check:release-green                 # موجودہ branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # منظم output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest کو چھوڑ دیتا ہے (صرف drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact شامل کرتا ہے (سست)
```

صرف تشخیص اور **رپورٹ** کرتا ہے (کوئی auto-fix نہیں)۔ fix-to-green orchestration
`/green-prs` اور `/review-prs` میں موجود ہے۔

## حل A — `/green-prs` (queue scan)

طریقۂ کار (خلاصہ — تفصیلات کے لیے `green-prs` skill دیکھیں):

1. فعال release branch کے مقابل open PRs کی queue کی **فہرست بنائیں**۔
2. ہر PR کی **چھان بین** کریں (viable / reject-worthy / needs-author) — reject/needs-author کو
   **رپورٹ کیا جاتا ہے، بند نہیں کیا جاتا** (فیصلہ author کرتا ہے)۔
3. ہر viable PR کے لیے ایک **الگ تھلگ worktree** (Rule #19) میں PR کو release tip تک لائیں اور
   `npm run check:release-green` چلائیں:
   - **HARD** → co-authorship کے ذریعے **contributor کی branch پر** درست کریں (author کا "Merged" status برقرار رہتا ہے)،
     اور اس وقت تک دوبارہ چلائیں جب تک تمام HARDs ختم نہ ہو جائیں۔
   - **DRIFT** → اسے رہنے دیں؛ release کے وقت اسے دوبارہ baseline کیا جائے گا۔
4. PR × (verdict، HARD reds، fixed?، DRIFT، release-green now?) جدول **رپورٹ** کریں۔

queue کو merge کیے بغیر **تیار** کر سکتا ہے؛ صرف واضح درخواست پر merge کرتا ہے — اور کبھی PR بند نہیں کرتا۔

## تجویز کردہ معمول

- **`/green-prs` باقاعدگی سے** چلائیں (مثلاً ہفتہ وار) اور **`/generate-release` سے پہلے
  ہمیشہ** چلائیں۔
- **`nightly-release-green.yml`** (حل D) کو مسلسل signal کے طور پر برقرار رکھیں: جب یہ
  HARD red issue کھولے تو scan کا وقت آ گیا ہے۔
- کسی branch یا مخصوص merge candidate کو چیک کرنے کے لیے حسبِ ضرورت **`/validate-release-green`** استعمال کریں۔
- جب کسی مخصوص PR کو live CI پر green تک پہنچانے کی ضرورت ہو تو **`/babysit <PR#>`** استعمال کریں۔

## ریلیز کے ساتھ تعلق

- `/generate-release`، **Phase 0 (pre-flight)** میں validation کو call کرتا ہے: release PR کھولنے سے پہلے
  DRIFT کو دوبارہ baseline کرتا اور HARD کو درست کرتا ہے۔
- `/review-prs`، merge کے فیصلے کے مرحلے پر release-green gate استعمال کرتا ہے (green-before-merge)۔

تمام حصوں کا مقصد ایک ہی ہے: release کے دن 40 منٹ کی تہوں میں reds کا تعاقب کرنے کے بجائے،
**پہلے ہی CI run میں ایک green release PR**۔
