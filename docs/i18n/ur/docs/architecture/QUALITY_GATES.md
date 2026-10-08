# Quality Gates Reference (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

یہ دستاویز OmniRoute میں تمام CI کوالٹی گیٹس کے لیے مستند حوالہ ہے۔
یہ ہر گیٹ، اس کی توثیق کے دائرے، اس کے چلنے والے CI جاب، آیا یہ
ratchet baseline یا pass/fail پالیسی استعمال کرتا ہے، اور آیا یہ بلڈ کو روکتا ہے یا صرف مشاورتی ہے، کی وضاحت کرتی ہے۔

مختصر خلاصے اور allowlist پالیسی کے لیے `AGENTS.md` میں
"کوالٹی گیٹس اور Ratchets" سیکشن دیکھیں۔ اسی نظام کے تنقیدی جائزے، پختگی کی درجہ بندی، اور
ٹول سے غیر وابستہ نقل کے منصوبے کے لیے
[کوالٹی گیٹ پلے بُک](../ops/QUALITY_GATE_PLAYBOOK.md) دیکھیں۔

---

## گیٹس کی فہرست اور عمل درآمد کی پروفائلز

### امیدوار کی منظوری

CI اور Quality Gates ورک فلوز میں سے ہر ایک ایک مستحکم فیصلہ جاری کرتا ہے: `Gate / CI` اور
`Gate / Quality`۔ ان کی ورژن شدہ منظوری پالیسی ہر upstream job کو
لازمی یا مشاورتی کے طور پر درج کرتی ہے۔ کسی قابل اطلاق لازمی job کا کامیاب ہونا ضروری ہے: غیر موجود،
منسوخ شدہ، چھوڑے گئے، زیر التوا اور نامعلوم نتائج PASS ثابت نہیں کر سکتے۔ صرف docs
یا صرف catalog کی درست درجہ بندی کسی code lane کو ناقابل اطلاق بنا سکتی ہے؛
draft PR قابل قبول امیدوار نہیں ہے۔ `hotfix` لیبل شواہد کی ضرورت ختم نہیں کرتا۔

دونوں ورک فلوز PRs اور main/release برانچز پر pushes، manual dispatch اور
merge-group events کا احاطہ کرتے ہیں۔ Push، dispatch اور merge-group مکمل انتخاب چلاتے ہیں۔ Forks
اور merge groups ان jobs کے لیے hosted runners استعمال کرتے ہیں جو بصورت دیگر self-hosted
runners منتخب کرتے؛ rollout سے پہلے hosted capacity کی کفایت کی تصدیق ضروری ہے۔

ہر JSON receipt چیک آؤٹ شدہ SHA، workflow run اور attempt کی شناخت کرتی ہے۔
CLI checkout/event SHA کے عدم تطابق کو مسترد کرتا ہے۔ Workflow tests پالیسی کی رکنیت کو
verdict job کی `needs` فہرست سے منسلک کرتے ہیں تاکہ کوئی نئی یا حذف شدہ lane خاموشی سے غائب نہ ہو سکے۔
Receipts اپنے workflow کا احاطہ کرتی ہیں، publication، deployment یا کسی موجودہ
مشاورتی scanner کے اندرونی حصوں کا نہیں۔ Branch rules میں دونوں check names کو فعال کرنا
ایک الگ انتظامی تبدیلی ہے؛ ان jobs کو شامل کرنا بذات خود کسی branch کو محفوظ نہیں کرتا۔

### Static scan کی فہرست

ورژن شدہ npm-alias فہرست اور static-scan کی رکنیت
`config/quality/gate-manifest.json` میں موجود ہیں۔ Script names اور عین commands کو
`package.json` کے مقابل validate کرنے کے لیے `npm run check:gate-manifest` چلائیں؛ اضافے، اخراج اور
command drift مقامی hook اور CI میں change-classification jobs دونوں کو ناکام کر دیتے ہیں۔
کوئی alias، workflow job، matrix instance یا test case نہیں ہوتا: ان اعداد کو
باہم قابل تبادلہ کے طور پر پیش نہیں کیا جانا چاہیے۔

منتخب aliases کو چلائے بغیر ان کا جائزہ لینے کے لیے `npm run quality:scan -- --list` یا
`npm run quality:scan:fast -- --list` استعمال کریں۔ Runner،
npm entrypoint کو چلاتا ہے، اس لیے اس کا runtime (بشمول ان مقامات کے جہاں Bun ترتیب دیا گیا ہو) برقرار رہتا ہے۔
Manifest ان profiles سے باہر کے aliases کو الگ سے چلائے جانے والے aliases کے طور پر درج کرتا ہے، اور
read-only scan profiles میں maintenance commands ممنوع ہیں۔

یہ profiles صرف static scan کا احاطہ کرتی ہیں۔ یہ product tests،
coverage، packaging، external checks یا کسی امیدوار کی مکمل release acceptance کی تصدیق نہیں کرتیں۔
Workflow admission منسلک `config/quality/admission-policy.json` اور
`scripts/quality/admission-verdict.mjs` استعمال کرتی ہے۔ Release-observer profiles الگ رہتی ہیں؛
ان کے قابل اطلاق checks اور receipts کا آزادانہ جائزہ لیں۔ ذیل میں دی گئی نثری
فہرست ایک حوالہ ہے، اس بات کا ثبوت نہیں کہ کوئی gate حقیقتاً چلا تھا۔

Scripts، `scripts/check/` (policy gates) اور `scripts/quality/` (ratchet engine) کے تحت موجود ہیں۔
CI کے لیے اصل ماخذ `.github/workflows/ci.yml` ہے۔

### Release PR کا تیز راستہ (`quality.yml`)

`.github/workflows/quality.yml`، main/release PRs، protected-branch
pushes، dispatch اور merge groups پر CI کی تکمیل کرتا ہے۔ PRs، path-filtered تیز checks استعمال کرتے ہیں۔ مستقل طور پر
غیر فعال duplicate build ہٹا دیا گیا؛ حقیقی build/package/boot checks بدستور CI میں موجود ہیں۔

| Job                                              | دائرۂ کار                                                                                                                                                                                                           | Blocking        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs؛ API docs refs اور docs-all                                                                                                                                                                           | ہاں             |
| `Fast Quality Gates`                             | Code PRs؛ static checks، typecheck، dashboard typecheck، متاثرہ unit tests                                                                                                                                          | ہاں             |
| `Forgotten sibling tests`                        | Code PRs؛ تبدیل شدہ modules سے static consumers اور ممکنہ sibling tests تک سراغ؛ barrel اور dynamic-import کے راستے مشاورتی تشخیصی معلومات کے طور پر رپورٹ کیے جاتے ہیں، جن میں حوالہ شدہ allowlist استثنا شامل ہیں | **مشاورتی**     |
| `Vitest (fast-path)`                             | Code PRs؛ تیز vitest suite                                                                                                                                                                                          | ہاں             |
| `Unit Tests fast-path`                           | Code PRs؛ 4-shard unit suite                                                                                                                                                                                        | ہاں             |
| `No new ESLint warnings`                         | Code PRs؛ suppressions-aware lint guard                                                                                                                                                                             | ہاں، forks سمیت |
| `Merge integrity (changelog + generated skills)` | غیر draft PRs؛ changelog اور generated skill sync                                                                                                                                                                   | ہاں، forks سمیت |

#### بھولے ہوئے sibling tests کی رپورٹ

`npm run check:forgotten-sibling-tests`، test-impact map کے پس منظر میں موجود import resolver کو دوبارہ استعمال کرتا ہے۔
ہر تبدیل شدہ production module کے لیے، جب ممکنہ
test، pull-request diff میں موجود نہ ہو تو یہ قطعی
`changed module/symbol -> static consumer -> candidate sibling test` سلسلے رپورٹ کرتا ہے۔ Markdown summary اور JSON result کو
کسی blocking rollout سے پہلے calibration کے لیے `forgotten-sibling-tests` workflow artifact کے طور پر برقرار رکھا جاتا ہے۔

Barrel re-exports اور dynamic imports صرف resolution diagnostics ہیں؛ یہ کبھی بھی
blocking finding پیدا نہیں کرتے۔ جائزہ شدہ استثنا
`config/quality/forgotten-sibling-allowlist.json` میں موجود ہوتے ہیں۔ ہر اندراج میں consumer اور candidate
test کا نام، ایک مخصوص توجیہ، اور GitHub issue یا pull request کا لنک لازماً ہونا چاہیے۔ ناقص اندراجات
fail closed ہوتے ہیں۔ استثنا کسی حذف شدہ candidate test یا `.skip`/`.todo` شامل کرنے والے diff کو suppress نہیں کر سکتے؛
assertion weakening اور دیگر masking بدستور آزادانہ طور پر blocking
`check:test-masking` gate کے دائرۂ اختیار میں رہتے ہیں۔

### Job: `lint`

`main` کے ہر PR پر چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| Script (`npm run ...`)            | توثیق کرتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blocking                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js کا version معاونت یافتہ range کے اندر ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ہاں                                     |
| `check:cycles`                    | پورے `src/` + `open-sse/` میں circular imports (AST پر مبنی، tsconfig کے `paths` resolve کیے جاتے ہیں)۔ Bare = advisory، cycles کی فہرست دکھاتا ہے۔ `check:cycles:ratchet` (جسے CI چلاتا ہے) اس وقت block کرتا ہے جب تعداد `quality-baseline.json` میں `metrics.cycles` کی حد سے تجاوز کرے — فی الحال 14، `direction: down`، لہٰذا یہ صرف کم ہو سکتی ہے (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ہاں (ratchet)                           |
| `check:route-validation:t06`      | تمام routes پر Zod schemas موجود ہیں (Tier 6 policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` کی تعداد budget سے تجاوز نہیں کرتی (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ہاں                                     |
| `check:provider-consistency`      | `providers.ts` میں موجود ہر provider کے لیے `providerRegistry.ts` میں مماثل اندراج موجود ہے (اور اس کے برعکس بھی، allowlist کے اندر)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `check:model-lifecycle`           | ہاتھ سے برقرار رکھی گئی تین routing tables، checked-in lifecycle snapshot (#11503) کے ساتھ مطابقت رکھتی ہیں: `FITNESS_TABLE` (`taskFitness.ts`) کسی ایسے retired id کو اسکور نہیں کرتی جسے `REGISTRY` route کر سکتی ہو؛ ہر `BUILT_IN_ALIASES` target، `REGISTRY` میں موجود اور retired-id snapshot میں غیر موجود ہے؛ `REGISTRY` میں اب بھی موجود ہر retired id کو forward کیا گیا ہے یا وہ `allowedRetiredInCatalog` میں درج ہے؛ اور کوئی `DEFAULT_DEGRADATION_MAP` source یا target اس snapshot میں retired نظر نہیں آتا۔ اس سے یہ ثابت نہیں ہوتا کہ کوئی model فی الحال کسی live upstream کے ذریعے فراہم کیا جا رہا ہے۔ Offline — `config/quality/model-lifecycle.json` کے ساتھ موازنہ کرتا ہے، جسے `npm run quality:refresh-model-lifecycle` کے ذریعے دستی طور پر refresh کیا جاتا ہے (network؛ CI سے منسلک نہیں)۔ `allowedRetiredInCatalog` ایک burn-down ratchet ہے: کوئی اندراج صرف tracking issue کے ساتھ شامل کریں۔ | ہاں                                     |
| `check:fetch-targets`             | client-side `src/` میں موجود ہر `fetch("/api/...")` ایک حقیقی `route.ts` تک resolve ہوتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ہاں                                     |
| `check:deps`                      | repo میں موجود ہر `package.json` کی تمام `npm install` کے قابل deps، `dependency-allowlist.json` میں موجود ہیں؛ نئے unpinned یا slopsquatted packages کو نشان زد کیا جاتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ہاں                                     |
| `audit:deps`                      | `npm audit` (root + electron) — کوئی high/critical advisory نہیں (osv کے `check:vuln-ratchet` کے ساتھ overlap کرتا ہے؛ Rationalization Backlog دیکھیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ہاں                                     |
| `check:lockfile`                  | `package-lock.json` کی سالمیت — https registry، integrity hashes، کوئی host override نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ہاں                                     |
| `check:licenses`                  | پروڈکشن dependencies کے لیے SPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:tracked-artifacts`         | کوئی build artifacts / committed `node_modules` symlinks نہیں (husky pre-commit میں بھی چلتا ہے؛ pre-push کو دانستہ طور پر ہلکا رکھا گیا ہے — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ہاں                                     |
| `check:ai-attribution`            | PR commits، title یا body میں کوئی AI/bot `Co-Authored-By` trailer یا AI-generation footer نہیں — سخت اصول #16 (`quality.yml` کے fast-gates loop میں PR→`release/**` کے لیے — event payload پڑھتا ہے، PRs کے علاوہ کوئی کارروائی نہیں کرتا — اور `ci.yml` lint میں PR→`main` کے لیے صرف PR والا مرحلہ؛ نیز husky `commit-msg` hook؛ انسانی co-authors کی اجازت ہے؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | ہر Vitest exclusion میں tracking issue درج ہو اور وہ `config/quality/vitest-exclusions.json` میں موجود ہو (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:file-size`                 | کوئی source file فی-extension مقررہ حد سے تجاوز نہ کرے (ratchet: بڑی frozen files، `frozen` فہرست میں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ہاں                                     |
| `check:error-helper`              | executors/handlers میں error responses، `buildErrorBody()` / `sanitizeErrorMessage()` استعمال کریں (سخت اصول #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:migration-numbering`       | مائیگریشن SQL فائلیں تسلسل کے ساتھ نمبر شدہ ہیں، ان میں کوئی خلا یا تکرار نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ہاں                                     |
| `check:public-creds`              | `publicCreds.ts` سے باہر کوئی لفظی OAuth `client_id`/`client_secret` یا Firebase Web کلیدیں موجود نہیں (سخت اصول #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ہاں                                     |
| `check:db-rules`                  | `src/lib/db/` ماڈیولز سے باہر کوئی خام SQL موجود نہیں؛ `localDb.ts` سے کوئی barrel-imports نہیں (سخت اصول #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ہاں                                     |
| `check:known-symbols`             | اپنی dispatch tables میں رجسٹر شدہ provider executors، routing strategies، اور translators ڈسک پر موجود فائلوں سے مطابقت رکھتے ہیں — کوئی غیر منسلک یا غیر اعلان شدہ symbols نہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ہاں                                     |
| `check:route-guard-membership`    | child process شروع کرنے والا ہر route، `isLocalOnlyPath()` کے ذریعے درجہ بند ہے (سخت اصول #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ہاں                                     |
| `check:test-discovery`            | repo میں موجود ہر `*.test.ts` / `*.spec.ts` فائل کم از کم ایک test runner کے ذریعے اکٹھی کی جاتی ہے (ratchet: `test-discovery-baseline.json` میں orphan list صرف کم ہو سکتی ہے)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ہاں                                     |
| `check:agent-skills-sync`         | تیار کردہ agent-skills آرٹیفیکٹس اپنے ماخذ کیٹلاگ سے مطابقت رکھتے ہیں (کوئی انحراف نہیں)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | فراہم کنندہ کے لوگوز/اثاثوں کے ساتھ ماخذ کی ایک ریکارڈ شدہ اندراج موجود ہے                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON کنفیگریشن فائلیں درست طور پر پارس ہوتی ہیں اور repo کے lint قواعد پر پورا اترتی ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript کی بغیر خامیوں کے compilation (صرف مشاورتی انتباہات)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ہاں                                     |
| `typecheck:noimplicit:core`       | سخت `noImplicitAny` — مستقبل پر مرکوز؛ پہلے سے موجود بہت سے call sites کو اب بھی annotations درکار ہیں                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **مشاورتی** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` کا دائرہ `src/app/(dashboard)/**` (#7033) تک محدود ہے — `typecheck:core` کی منتخب کردہ 27 فائلوں کی allowlist میں dashboard کی کوئی TSX فائل شامل نہیں، اور `next build` بھی کبھی اس کی type-checking نہیں کرتا (`next.config.mjs` میں `ignoreBuildErrors: true` مقرر ہے)، اس لیے وہاں orphaned-identifier regressions (#6625/#6909) CI کو دکھائی نہیں دیتی تھیں۔ ایک منجمد فی فائل/فی TS-code تعداد کی baseline (`config/quality/dashboard-typecheck-baseline.json`، وہی stale-enforcement طرز جو `check:known-symbols` میں ہے) کے مقابلے میں diffs — baseline تعداد سے زیادہ صرف نئی خامیاں gate کو ناکام کرتی ہیں؛ پہلے سے موجود خامی درست ہونے پر `--update` کے ذریعے baseline کم کریں۔                                                                                                                                                                                                                           | ہاں                                     |

### Job: `quality-gate`

`test-coverage` کے بعد چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| اسکرپٹ                       | توثیق                                                                                                                                                                                      | رکاوٹ بننے والا       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `quality:collect`            | `quality-metrics.json` بناتا ہے (ESLint انتباہات کی تعداد، ضم شدہ shard رپورٹ سے کوریج)                                                                                                    | ہاں (ratchet سے پہلے) |
| `quality:ratchet`            | `quality-baseline.json` میں ہر میٹرک میں تنزلی نہیں ہوئی (ESLint انتباہات ≤ baseline؛ کوریج ≥ baseline)                                                                                    | ہاں                   |
| `check:duplication`          | کوڈ کی نقل (jscpd@4) `quality-baseline.json` میں موجود baseline سے تجاوز نہیں کرتی                                                                                                         | ہاں                   |
| `check:complexity`           | فائل کی سطح کی cyclomatic complexity مقررہ حد سے تجاوز نہیں کرتی (بنیادی ESLint `complexity` + `max-lines-per-function`)                                                                   | ہاں                   |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — علیحدہ ESLint مرحلہ؛ CI دونوں کو ایک `check:complexity-ratchets` مرحلے کے طور پر ضم کر کے چلاتا ہے                                | ہاں                   |
| `check:dead-code`            | غیر استعمال شدہ exports / فائلوں کا ratchet (knip)، baseline کے مقابلے میں تنزلی کا شکار نہیں ہوتا                                                                                         | ہاں                   |
| `check:compression-budget`   | Compression benchmark کا بجٹ — ہر engine کے لیے token-savings کی کم از کم حدود میں تنزلی نہیں ہونی چاہیے                                                                                   | ہاں                   |
| `check:type-coverage`        | فیصدی typed ratchet (`type-coverage`) میں تنزلی نہیں ہوتی؛ بڑی حد تک `typecheck:noimplicit:core` کا احاطہ کرتا ہے                                                                          | ہاں                   |
| `check:codeql-ratchet`       | کھلے CodeQL alerts کی تعداد میں اضافہ نہیں ہوتا (`gh api` کے ذریعے پڑھتا ہے؛ token کے بغیر مناسب طور پر skip کرتا ہے) — تازہ کاری کی مدت اور دستی trigger: ذیل میں "CodeQL ratchet" دیکھیں | ہاں                   |

### جاب: `quality-extended`

مکمل جاب مشاورتی ہے (`continue-on-error: true`)۔ npm پر مبنی ratchets حقیقتاً
چلتے ہیں؛ بیرونی scanners، `gh release download` کے ذریعے install ہوتے ہیں اور جب
binary پھر بھی موجود نہ ہو تو خود skip ہو جاتے ہیں (exit 0)۔

| اسکرپٹ                   | توثیق                                                                                                                                                                                                                  | رکاوٹ بننے والا                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | کوئی circular dependencies نہیں (dpdm)                                                                                                                                                                                 | **مشاورتی**                                              |
| `check:bundle-size`      | Bundle کا حجم مقررہ حد سے تجاوز نہیں کرتا                                                                                                                                                                              | **مشاورتی**                                              |
| `check:secrets`          | Secrets کی scanning (gitleaks) — binary موجود نہ ہو تو skip کرتا ہے                                                                                                                                                    | **مشاورتی**                                              |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) میں اضافہ نہیں ہوتا — binary موجود نہ ہو تو skip کرتا ہے                                                                                                                      | **مشاورتی**                                              |
| `check:workflows`        | Workflow lint (actionlint + zizmor)؛ غائب/خراب scanners، نامعتبر reports یا غائب ratchet baseline کی صورت میں INCOMPLETE کے طور پر ناکام ہوتا ہے۔ درست نتائج منتخب کردہ strict/advisory/ratchet پالیسی پر عمل کرتے ہیں | چلانا لازمی ہے؛ CI میں zizmor ratchet رکاوٹ بننے والا ہے |
| `check:openapi-breaking` | بنیادی branch کے مقابلے میں عوامی API contract (`openapi.yaml`) میں breaking changes (oasdiff) — `openapiBreaking=N` خارج کرتا ہے؛ oasdiff غائب ہو یا بنیادی spec قابلِ حل نہ ہو تو skip کرتا ہے                       | **مشاورتی**                                              |

### جاب: `docs-sync-strict`

`main` کے ہر PR پر چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| اسکرپٹ                         | توثیق                                                                                                                                                  | مسدود کنندہ                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `check:docs-all`               | میٹا گیٹ جو ذیل کے 6 ذیلی گیٹس کو یکے بعد دیگرے چلاتا ہے                                                                                               | ہاں                              |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt کے ورژنز میں مطابقت                                                                                                      | ہاں                              |
| ↳ `check:docs-counts`          | نثری متن میں دی گئی تعدادیں (فراہم کنندگان کی تعداد، مائیگریشنز کی تعداد، وغیرہ) حقیقی تعدادوں کی ratchet ونڈو کے اندر ہیں                             | ہاں                              |
| ↳ `check:env-doc-sync`         | `.env.example` میں موجود ہر env var دستاویزات کے کسی ٹیبل میں درج ہے، اور اس کے برعکس بھی                                                              | ہاں                              |
| ↳ `check:deprecated-versions`  | دستاویزات میں کوئی متروک ورژن اسٹرنگ موجود نہیں                                                                                                        | ہاں                              |
| ↳ `check:doc-links`            | دستاویزات میں اندرونی markdown لنکس حقیقی فائلوں تک پہنچتے ہیں (`[text]`/`(path)` فارمیٹ)                                                              | ہاں                              |
| ↳ `check:fabricated-docs`      | دستاویزات میں مذکور routes، env vars، CLI کمانڈز، hook نام، اور فائل پاتھ codebase میں موجود ہیں۔ `--strict` کے ذریعے سخت گیٹ؛ فلیگ کے بغیر soft-fail۔ | ہاں (CI میں `--strict` کے ذریعے) |
| `check:cli-i18n`               | CLI کمانڈ اسٹرنگز تمام i18n locale فائلوں میں موجود ہیں                                                                                                | ہاں                              |
| `check:openapi-coverage`       | OpenAPI spec حقیقی routes کی کم از کم ratcheted حد کا احاطہ کرتی ہے                                                                                    | ہاں                              |
| `check:openapi-security-tiers` | `openapi.yaml` میں سیکیورٹی درجے کی annotations، `routeGuard.ts` کی classifications سے مطابقت رکھتی ہیں                                                | **مشاورتی**                      |
| `check:openapi-routes`         | `openapi.yaml` میں ہر path کسی حقیقی `route.ts` تک پہنچتا ہے (اینٹی ہیلوسینیشن)                                                                        | ہاں                              |
| `check:docs-symbols`           | `docs/**/*.md` میں ہر `/api/...` حوالہ کسی حقیقی `route.ts` تک پہنچتا ہے (اینٹی ہیلوسینیشن)                                                            | ہاں                              |
| `i18n translation drift`       | i18n locale فائلوں میں غیر ترجمہ شدہ keys — صرف انتباہ                                                                                                 | **مشاورتی**                      |

### جاب: `i18n-ui-coverage`

| اسکرپٹ                            | توثیق                                                                                                                                                                            | مسدود کنندہ |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | UI i18n key کوریج ≥ 65% ہے                                                                                                                                                       | ہاں         |
| `check-ui-value-drift` (inline)   | دوبارہ لکھی گئی انگریزی **value** اپنے پیچھے کوئی فرسودہ ترجمہ نہیں چھوڑتی                                                                                                       | ہاں         |
| `check-new-key-coverage` (inline) | ایک **نئی** انگریزی key ہر locale میں ترجمہ شدہ ہے — `__MISSING__:` مارکر مسترد کر دیا جاتا ہے                                                                                   | ہاں         |
| `check-translation-ratio`         | فی locale حقیقی ترجمے کا تناسب (allowlist سے باہر انگریزی سے مماثل / placeholder / غائب leaves) `config/quality/i18n-translation-baseline.json` + slack سے تجاوز نہیں کرنا چاہیے | **مشاورتی** |

`fetch-depth: 0` درکار ہے — value-drift گیٹ، merge base کے مقابلے میں `en.json` کا diff لیتا ہے۔

#### `check-ui-value-drift` — فرسودہ ترجمے کا گیٹ

یہ اس واحد i18n regression کو پکڑتا ہے جسے دیگر گیٹس ساختی طور پر نہیں دیکھ سکتے: ایک انگریزی value
دوبارہ لکھی جاتی ہے اور _سابقہ_ انگریزی سے اخذ کردہ تراجم برقرار رہتے ہیں، لہٰذا
غیر انگریزی صارفین پُراعتماد انداز میں لکھی ہوئی، مگر اب غلط عبارت پڑھتے رہتے ہیں۔

یہ مسئلہ حقیقتاً ریلیز ہوا تھا۔ جب Antigravity
لاگ اِن helper شامل کیا گیا (#5203) تو `oauthModal.googleOAuthWarning` دوبارہ لکھا گیا؛ **43 میں سے 39 locales** میں وہ متن برقرار رہا جو آپریٹرز کو "مکمل
URL کاپی کر کے ذیل میں پیسٹ کریں" کہتا تھا — ایسا فلو جو اس provider کے لیے مکمل نہیں ہو سکتا۔ یہ
#8463 تک نظر انداز رہا، کیونکہ:

- `sync-ui-keys` صرف ان keys کو backfill کرتا ہے جو **غائب** ہوں، ان کو کبھی نہیں جو **فرسودہ** ہوں؛
- `check-ui-keys-coverage` key کی _موجودگی_ شمار کرتا ہے، لہٰذا فرسودہ ترجمہ covered شمار ہوتا ہے؛
- `check-translation-drift`، `docs/i18n/<locale>/**.md` دستاویزی mirrors کو ٹریک کرتا ہے —
  یہ کبھی `src/i18n/messages/*.json` نہیں پڑھتا۔ 2026-09 re-sync سے جاب `docs-sync-strict` میں مسدود کنندہ ہے: بنیادی دستاویز میں ترمیم کریں → `npm run i18n:run -- --files=<doc>` (section-level، کم خرچ)۔

**Diff سے آگاہ، baseline پر منحصر نہیں۔** یہ merge base پر موجود `en.json` کا working tree سے موازنہ کرتا ہے؛ ہر اُس key کے لیے جس کی انگریزی value تبدیل ہوئی ہو، ایسا کوئی بھی locale جس میں اب بھی غیر تبدیل شدہ ترجمہ موجود ہو، فرسودہ سمجھا جاتا ہے۔ یہ جان بوجھ کر **پہلے سے موجود قرض کو منجمد رکھتا ہے** — diff یہ ظاہر نہیں کر سکتا کہ کوئی دیرینہ ترجمہ کس پرانی انگریزی سے اخذ ہوا تھا، اس لیے gate صرف اُن چیزوں کا فیصلہ کرتا ہے جنہیں موجودہ تبدیلی چھوتی ہے۔ متبادل (فی key hash baseline) کے لیے تقریباً 600 KB کی generated file درکار ہوتی، جو موجودہ سب سے بڑے baseline سے 3× بڑی ہوتی اور ہر i18n PR پر تبدیل ہوتی۔

اسے مطمئن کرنے کے دو طریقے ہیں:

1. متاثرہ تراجم کو اپ ڈیٹ کریں، یا
2. انہیں `__MISSING__:<new english>` پر سیٹ کریں — پھر runtime درست انگریزی پیش کرتا ہے
   (`src/i18n/request.ts::deepMergeFallback`، #7258) اور key ترجمے کی قطار میں شامل ہو جاتی ہے۔

اگر string کا **مفہوم** تبدیل ہوا ہے، تو **key کا نام تبدیل کرنے** کو ترجیح دیں: نئی key کسی فرسودہ ترجمے کو وراثت میں نہیں لے سکتی۔ #8463 میں یہی pattern استعمال ہوا تھا۔

```bash
npm run i18n:check-value-drift          # سخت (جو CI چلاتا ہے)
npm run i18n:check-value-drift:warn     # صرف رپورٹ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

جب base catalog پڑھا نہ جا سکے (base ref کے بغیر shallow clone)، تو `SKIP reason=base-unresolved` کے ساتھ 0 پر exit کرتا ہے، بالکل `check-openapi-breaking` کی طرح۔

### Job: `i18n`

مکمل i18n validation matrix (ہر locale کے لیے ایک job)۔ پورا job مشاورتی ہے۔

| Script                          | کیا validate کرتا ہے            | Blocking                                            |
| ------------------------------- | ------------------------------- | --------------------------------------------------- |
| `validate_translation.py quick` | ہر locale کے لیے ترجمے کی تکمیل | **مشاورتی** (پورے job پر `continue-on-error: true`) |

### Job: `pr-test-policy`

صرف pull requests پر چلتا ہے۔

| Script                 | کیا validate کرتا ہے                                                                                                                      | Blocking |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | وہ PRs جو `src/`، `open-sse/`، `electron/`، یا `bin/` میں production code تبدیل کرتے ہیں، لازماً tests شامل یا اپ ڈیٹ کریں (Hard Rule #8) | ہاں      |
| `check:test-masking`   | تبدیل شدہ test files مجموعی assert count کم نہ کریں اور `assert.ok(true)` جیسی tautologies شامل نہ کریں                                   | ہاں      |
| `check:pr-evidence`    | PR body میں تبدیلی کے لیے test/VPS evidence کا حوالہ ہو (PR prose کو grep کر کے Hard Rule #18 کو خودکار بناتا ہے — نازک، Backlog دیکھیں)  | ہاں      |

### Job: `test-vitest`

`build` کے بعد چلتا ہے۔ ناکامی کی صورت میں merge کو روکتا ہے۔

| Suite            | کیا validate کرتا ہے                                     | Blocking                                                                                                                        |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools)، autoCombo، cache — vitest runner | ہاں                                                                                                                             |
| `test:vitest:ui` | UI component tests — vitest runner                       | **Blocking** — پہلے سے موجود failures کو `vitest.config.ts` میں واضح طور پر خارج کیا گیا ہے؛ نئی failures job کو ناکام کرتی ہیں |

### Nightly workflows (scheduled، مشاورتی)

یہ cron schedule پر (اور `workflow_dispatch` کے ذریعے) چلتے ہیں، PRs پر کبھی نہیں۔ سب مشاورتی ہیں۔

| Workflow               | کیا validate کرتا ہے                                                                                                                                               | Blocking    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `nightly-property`     | random seed اور زیادہ run count کے ساتھ fast-check property tests                                                                                                  | **مشاورتی** |
| `nightly-resilience`   | heap-growth gate، chaos fault-injection، k6 load/soak                                                                                                              | **مشاورتی** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret نہ ہونے پر skip ہوتے ہیں)                                                                   | **مشاورتی** |
| `nightly-schemathesis` | `docs/openapi.yaml` استعمال کرتے ہوئے live OmniRoute کے خلاف OpenAPI contract fuzzing (schemathesis) — spec violations / unhandled 500s سامنے لاتا ہے (Fase 8 B.4) | **مشاورتی** |
| `nightly-mutation`     | تیز unit lane پر Stryker mutation-testing score — بچ جانے والے mutants کمزور asserts کو نمایاں کرتے ہیں                                                            | **مشاورتی** |
| `nightly-compat`       | معاونت یافتہ `engines.node` ranges میں Node engine compatibility matrix                                                                                            | **مشاورتی** |

---

## رفتار کا مرحلہ (2026-08-30 → v4.0 LTS): ہر بنیادی حد میں 20% نرمی

مالک کا فیصلہ (2026-08-30): v4.0 کی ماڈیولرائزیشن تک، تکنیکی قرض کی حد برقرار رکھنے کے مقابلے میں ریلیز کی رفتار زیادہ اہم ہے۔ ہر **عددی** ریچٹ بنیادی حد کو ایک قابلِ آڈٹ کارروائی میں 20% نرم کیا گیا، اور اس مرحلے کا اعلان `config/quality/quality-baseline.json` میں کیا گیا ہے:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| کیا تبدیل ہوا                                                                                                                                                             | کہاں                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — کم-بہتر شمار ×1.2، زیادہ-بہتر فیصد ÷1.2 (کوریج کی کم از کم حد 60 برقرار، `eslintErrors` بدستور 0، `eslintWarnings` 0 → منجمد suppression شمار کا 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` نوٹ ہر پہلے → بعد کی قدر درج کرتا ہے)            |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`، `testCap`، ہر `frozen[*]` / `testFrozen[*]` سطر کی حد ×1.2                                                                                                         | `file-size-baseline.json`                                                                              |
| فی فائل / فی TS کوڈ شمار ×1.2                                                                                                                                             | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                             |
| جب `_policy.requireTighten === false` ہو تو `--require-tighten` محض مشاورتی بن جاتا ہے                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| رات کا `bank-ratchet-shrinks` رک جاتا ہے (یہ ناپی گئی کمی کو محفوظ کر کے اضافی گنجائش ختم کر دیتا)                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

اجازت فہرستیں (`eslint-suppressions.json`، `test-masking-allowlist.json`، `test-discovery-baseline.json`،
…) بجٹ **نہیں** ہیں اور انہیں تبدیل نہیں کیا گیا۔ کامیابی/ناکامی کی پالیسی کے گیٹس (راز، SQL قواعد،
دستاویزات/env معاہدہ، i18n یکسانیت، یونٹ ٹیسٹس) بدستور برقرار ہیں — ناکام ٹیسٹ اب بھی ناکام ٹیسٹ ہی ہے۔

**ٹولنگ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ایک
  بار کی نرمی (`scripts/quality/relax-baselines.mjs`)؛ ایک ہی نوٹ کے ساتھ دوسری بار چلنے سے انکار کرتی ہے۔
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  ہر عددی گیٹ کو بالکل اسی طرح ناپتا ہے جیسے CI ناپتا ہے، اور ہر گیٹ کی باقی گنجائش دکھاتا ہے
  (`scripts/quality/baseline-headroom.mjs`)۔ رات کا `baseline-headroom` کام جدول کو فعال مسئلے
  **📈 بنیادی حد کی گنجائش (رفتار کا مرحلہ)** میں پوسٹ کرتا ہے اور جب کوئی گیٹ اپنی حد سے 10% کے اندر ہو
  یا پہلے ہی اسے عبور کر چکا ہو تو `headroom-alert` لیبل شامل کرتا ہے۔ وہ مسئلہ ابتدائی انتباہ ہے:
  جو بجٹ چند دنوں میں بھر جائے اس کا مطلب ہے کہ نرمی پوری ٹیم کے بجائے چند PRs استعمال کر رہے ہیں —
  مسئلہ پیدا کرنے والے گیٹ کے `_rebaseline_*` نوٹس دیکھیں۔

**نئے کوڈ کا موڈ (Clean-as-You-Code) — 2026-08-30 سے، صرف PR کے تیز راستے کے لیے**

`pull_request` واقعات پر `quality.yml`، `--base-ref <PR base SHA>` کو `check:file-size`،
`check:complexity-ratchets` اور `check:dead-code` کو پاس کرتا ہے۔ اس موڈ میں گیٹ HEAD کا
merge-base کے ساتھ موازنہ **صرف ان فائلوں تک محدود رکھ کر کرتا ہے جنہیں PR نے تبدیل کیا**
(`scripts/check/newCodeMode.mjs`: merge-base کو عارضی `git worktree` میں مادی شکل دی جاتی ہے،
ESLint/knip وہاں اور HEAD پر چلتے ہیں، اور فی فائل شمار کا فرق نکالا جاتا ہے):

- **روکنے والا** — PR نے تبدیل کردہ فائلوں میں cyclomatic/cognitive خلاف ورزیاں یا dead exports شامل کیے
  (`complexityNewCode=`، `cognitiveComplexityNewCode=`، `deadExportsNewCode=` لاگ میں)؛
- **مشاورتی** — منجمد بنیادی حد کے مقابلے میں عالمی مجموعہ۔ وراثت میں ملا انحراف کبھی کسی
  بے قصور PR کو ناکام نہیں کرتا؛ انحراف کو ریلیز کی تطبیق کے وقت دوبارہ منجمد کیا جاتا ہے اور headroom کام اس کی نگرانی کرتا ہے۔

`workflow_dispatch` رنز، release-green جائزہ اور رات کے headroom کام کے پاس کوئی PR base
نہیں ہوتا اور وہ مطلق (عالمی) موازنہ برقرار رکھتے ہیں۔ کوریج، duplication اور type-coverage فی الحال
عالمی رہتے ہیں (ان کے ٹولز کم لاگت میں فی فائل فرق فراہم نہیں کرتے) — یہی طریقہ اپنانے کے امیدوار ہیں۔

**v4.0 پر مرحلے کا اختتام (LTS = پہلے سے زیادہ سخت، محض "معمول پر واپسی" نہیں)**

1. خالص `release/v4.0.0` ٹِپ پر: ریکارڈ کے لیے `npm run quality:headroom --json`، پھر
   `npm run quality:ratchet -- --update`، `check:file-size --update`،
   `check:complexity-ratchets --update`، `check:dead-code --update`، اور ہر typecheck گیٹ کا
   `--update` چلائیں — ہر baseline ناپی گئی قدر تک کم ہو جائے گا۔
2. `quality-baseline.json` سے `_policy` حذف کریں (`--require-tighten` اور شبانہ
   banking کو دوبارہ فعال کرتا ہے)، اور `check-openapi-coverage.mjs` میں `THRESHOLD = 36` (یا زیادہ) بحال کریں۔
3. جہاں modularization کا فائدہ ہوا ہے، وہاں ناپی گئی قدر سے بھی زیادہ سختی کریں: file-size `cap` دوبارہ 1000
   (یا 800)، coverage floors میں +5، اور modularized packages کے لیے dead exports کی تعداد 0۔

## ریچیٹ بیس لائن (`quality-baseline.json`)

ریچیٹ انجن (`scripts/quality/check-quality-ratchet.mjs`)، `quality-baseline.json`
کو پڑھتا ہے اور اس کا تازہ جمع کردہ `quality-metrics.json` کے ساتھ موازنہ کرتا ہے۔ کوئی بھی میٹرک جو
اپنے ایپسیلون سے زیادہ تنزلی کا شکار ہو، بلڈ کو ناکام کر دیتا ہے۔

فی الحال ٹریک کیے جانے والے میٹرکس:

| میٹرک                 | سمت    | مطلب                                      |
| --------------------- | ------ | ----------------------------------------- |
| `eslintWarnings`      | `down` | ESLint انتباہات کی تعداد بڑھنی نہیں چاہیے |
| `coverage.statements` | `up`   | اسٹیٹمنٹ کوریج کم نہیں ہونی چاہیے         |
| `coverage.lines`      | `up`   | لائن کوریج کم نہیں ہونی چاہیے             |
| `coverage.functions`  | `up`   | فنکشن کوریج کم نہیں ہونی چاہیے            |
| `coverage.branches`   | `up`   | برانچ کوریج کم نہیں ہونی چاہیے            |

حقیقی بہتری کے بعد بیس لائن اپ ڈیٹ کرنے کے لیے:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` فلیگ موجودہ پیمائش شدہ اقدار کو `quality-baseline.json` میں لکھتا ہے۔
اس فائل کو اس تبدیلی کے ساتھ کمٹ کریں جس نے میٹرک کو بہتر بنایا ہے۔ ایسی PR جو
بیس لائن اپ ڈیٹ کیے بغیر کسی میٹرک کو بہتر بنائے، اسے `--require-tighten` پکڑ لے گا (مرحلہ 6A.5،
نفاذ زیرِ التوا ہے)۔

### CodeQL ریچیٹ: ریفریش کا دورانیہ اور دستی ٹرگر

`check:codeql-ratchet` **ریپو کی حالت پڑھتا ہے، جسے ایک شیڈول کے مطابق ریفریش کیا جاتا ہے — ہر PR پر نہیں۔**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` یہ رپورٹ کرتا ہے:
`state: configured`، `schedule: weekly`: یہ GitHub کا ڈیفالٹ سیٹ اپ اسکین ہے، نہ کہ ہر پش پر ہونے والا
تجزیہ۔ نتیجہ: انتباہات کو درست کرنے والی PR مرج ہونے کے بعد بھی، ریچیٹ
اگلا طے شدہ اسکین چلنے تک پرانی، زیادہ تعداد پڑھتا رہتا ہے — لہٰذا یہ
ہر کھلی PR، بشمول درستگی کرنے والی PR کے اپنے فالو اپس، پر تنزلی رپورٹ کرتا ہے، جب تک اسکین تازہ حالت تک نہیں پہنچ جاتا۔

**دستی ریفریش**: `gh workflow run codeql.yml --ref release/vX.Y.Z` تجزیہ دوبارہ چلاتا ہے
اور چند منٹوں میں انتباہات دوبارہ شائع کر دیتا ہے۔ پہلے `.github/workflows/codeql.yml`
پڑھیں — اس کا ہیڈر وضاحت کرتا ہے کہ یہ صرف `workflow_dispatch` کے ذریعے چلتا ہے **کیونکہ یہ
GitHub کے "default setup" سے متصادم ہے** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`)۔ `push`/`pull_request`/
`schedule` ٹرگرز بحال کرنے کے لیے پہلے **مالک کی کارروائی** درکار ہے: Settings → Code security →
CodeQL: Default → Advanced۔ اس تبدیلی کے بغیر `schedule:` ٹرگر شامل نہ کریں — یہ
صرف ناکام رنز پیدا کرے گا۔

**تعداد کم ہونے کے بعد بیس لائن سخت کریں** — `node scripts/check/check-codeql-ratchet.mjs
--update` نئی پیمائش شدہ تعداد کو `quality-baseline.json` →
`metrics.codeqlAlerts.value` میں لکھتا ہے، تاکہ ریچیٹ خاموشی سے پرانی بالائی حد تک دوبارہ
تنزلی کی اجازت نہ دے۔ عملی مثال (2026-09-02/03): PR #12502 نے 7 حقیقی انتباہات درست کیے
(پیمائش شدہ کھلے انتباہات 13 → 6)؛ PR #12530 نے منجمد بیس لائن کو مطابقت کے لیے 11 → 6 تک سخت کیا؛
اس کے بعد باقی 6 انتباہات کو فی انتباہ جواز کے ساتھ مسترد کر کے کھلی تعداد 0 کر دی گئی۔

**مسترد کرنا آپریٹر کا فیصلہ ہے (سخت اصول #14)** — مسترد کرنے کے تبصرے میں تکنیکی
جواز درج کیے بغیر کبھی بھی CodeQL انتباہ مسترد نہ کریں: اپ اسٹریم پروٹوکول کی ضرورت کے لیے `won't fix`،
ٹیسٹ فکسچر کے لیے `used in tests`، اور ایسے سینیٹائزر کے لیے جسے CodeQL نہیں دیکھ سکتا `false positive`
(نظیر: `docs/security/ERROR_SANITIZATION.md`)۔

---

## ٹیسٹ دوبارہ چلانے کی پالیسی (WS5.4, v3.8.49)

دوبارہ چلانا ہر رنر کے لیے الگ ہے، کبھی بھی عالمی عمومی پالیسی نہیں — عمومی دوبارہ چلانے کی پالیسی حقیقی ریگریشنز کو
غیر مرئی فلیکس میں بدل دیتی ہے:

| رنر              | پالیسی                                                                                                                    | وجہ                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | صرف CI میں `retries: 1`، اور `trace: on-first-retry` کے ساتھ                                                              | براؤزر/نیٹ ورک کی ٹائمنگ حقیقی طور پر غیر تعینیتی ہے؛ ٹریس کے ساتھ ایک بار دوبارہ چلانا فلیک کو قابلِ تشخیص آرٹیفیکٹ بنا دیتا ہے |
| Vitest           | کوئی عالمی دوبارہ کوشش نہیں۔ ثابت شدہ فلیکی ٹیسٹ کو واضح فی ٹیسٹ دوبارہ کوشش ملتی ہے (diff میں نمایاں، PR میں زیرِ جائزہ) | قرنطینہ فہرست کو repo میں رکھتا ہے، کبھی مبہم نہیں ہونے دیتا                                                                     |
| node:test (unit) | کبھی بھی دوبارہ کوشش نہیں                                                                                                 | فلیکی یونٹ ٹیسٹ خود ٹیسٹ میں ایک بگ ہے — اسے درست کریں، دوبارہ چلا کر قسمت نہ آزمائیں                                            |

فلیک ٹیلی میٹری دستیاب ہونے کے بعد ہدفی SLOs (WS5.2/5.3): فی ٹیسٹ <1% فلیک شرح
("ابھی درست کریں" کی حد)، فی پائپ لائن ≥95% کامیابی کی شرح۔ صنعتی حوالہ جاتی اقدار —
اپنی پیمائشوں کے مطابق دوبارہ کیلیبریٹ کریں۔

## ریلیز کی سطح پر ریچیٹ ڈرفٹ (WS5.5, v3.8.49)

جب کوئی ریچیٹ (فائل سائز، پیچیدگی، eslint انتباہات) خالص ریلیز
ٹِپ پر ریگریس ہو — یعنی مرجز کے **امتزاج** نے اسے ریگریس کیا ہو، اور کوئی ایک PR اپنی
برانچ پر اکیلے اس ریگریشن کو دوبارہ پیدا نہ کرے — تو اس کی اصلاح **ریلیز کیپٹن کی ذمہ داری ہے، ایک بار، ریلیز
برانچ پر**: extraction/refactor کو ترجیح دیں؛ صرف دستاویزی جواز کے اندراج کے ساتھ rebaseline کریں۔
امتزاجی ڈرفٹ کو کبھی بھی کسی معاون کے PR پر نہ ڈالیں، اور کبھی بھی فی PR rebaseline
نہ کریں (یہ حقیقی ریگریشنز کو چھپاتا ہے)۔ پہلے امتیاز کریں: یہ فرض کرنے سے پہلے کہ آپ کے PR نے
مسئلہ پیدا کیا ہے، ایک probe worktree میں خالص ٹِپ کے خلاف سرخ نتیجہ دوبارہ پیدا کریں۔

## ریچیٹ کی کمیوں کو محفوظ کرنا — تنزلی کی سمت (#8584)

ریچیٹ صرف نصف خودکار ہے، اور وہ بھی غلط نصف۔ حد کو **بڑھانا** ایک
دستی JSON ترمیم ہے جس میں دس سیکنڈ لگتے ہیں اور یہ سرخ PR کو بحال کرنے کا تیز ترین طریقہ ہے۔
حد کو **کم کرنے** کے لیے کسی کو `--update` چلانا اور نتیجہ commit کرنا پڑتا ہے — اور جب تک
`bank-ratchet-shrinks` جاب شامل نہیں ہوئی، کوئی workflow اسے نہیں چلاتا تھا۔ ناپا گیا نتیجہ
(2026-07-25): 18 منجمد فائلیں پہلے ہی نئی فائل کی 800 لائنوں والی حد پر یا اس سے کم تھیں، بدترین
132× پر (`src/shared/validation/schemas.ts`، 19 لائنوں کے لیے 2,523 کی حد)؛
پیچیدگی کی بالائی حد تقریباً 37 rebaseline نوٹس کے دوران `1794 → 2169` تک پہنچ گئی، جس میں ٹھیک ایک
کمی (−1) ہوئی؛ اور "اگلے دور میں `--update` کے ذریعے سخت کریں" 31 بار لکھا گیا اور
ایک بار اس پر عمل ہوا۔ جو حد اسے جائز بنانے والے کوڈ سے زیادہ دیر باقی رہے، وہ خاموشی سے ہر مکمل شدہ
تقسیمِ نو کو اس شخص کے لیے نمو کی گنجائش میں بدل دیتی ہے جو اگلی بار فائل میں ترمیم کرے۔

`nightly-release-green.yml` → جاب **`bank-ratchet-shrinks`** اس چکر کو مکمل کرتی ہے:

|               |                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| چلتی ہے       | `schedule` (3×/دن) + `workflow_dispatch` — دانستہ طور پر **نہیں** `push`                                     |
| ناپتی ہے      | بلند ترین `release/vX.Y.Z`، وہی resolution + injection guard جو `release-green` میں ہے                       |
| لکھتی ہے      | `check:file-size --update` اور `check:complexity-ratchets --update` (دونوں ساخت کے لحاظ سے صرف کمی کرتے ہیں) |
| تصدیق کرتی ہے | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| فراہم کرتی ہے | ریلیز برانچ کے خلاف ہمیشہ تازہ ایک PR — force-update شدہ، کبھی غیر ضروری تکرار نہیں                          |

محفوظ کرنا فی push کے بجائے بیچز میں کیا جاتا ہے کیونکہ اس کے لیے کم تاخیر کی کوئی ضرورت نہیں
(8 گھنٹوں کے اندر محفوظ کی گئی کمی قابلِ قبول ہے)، جبکہ فی merge چلانے سے merge مہمات کے دوران
PR برانچ بار بار دوبارہ بنتی اور ہر بار مکمل ESLint واک کی لاگت آتی۔ تشخیص
push (`release-green`) پر ہی رہتی ہے؛ صرف محفوظ کرنے کا عمل بیچز میں ہوتا ہے۔

### حفاظتی تصدیق کار

یہ جاب بغیر نگرانی کے baselines میں لکھتی ہے، اس لیے `verify-ratchet-bank.mjs` ہی اسے
قابلِ قبول بناتا ہے۔ یہ `--update` کے بعد کے tree کا `HEAD` کے ساتھ diff لیتا ہے اور **کسی بھی commit
کے وجود میں آنے سے پہلے جاب ختم کر دیتا ہے** — کوئی PR نہیں کھولتا — جب تک ہر تبدیلی ان میں سے کوئی ایک نہ ہو:

- `frozen` / `testFrozen` کی عددی قدر **کم** کی گئی ہو یا **ہٹائی** گئی ہو
- `complexity-baseline.json` → `count` **کم** کیا گیا ہو
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **کم** کیا گیا ہو

کوئی بھی دوسری چیز ناکام ہوتی ہے: عدد بڑھانا، اندراج شامل کرنا، `cap`/`testCap` تبدیل کرنا، یا
`_rebaseline_*` نوٹ حذف کرنا/دوبارہ لکھنا (یہ نوٹس اس امر کا آڈٹ ٹریل ہیں کہ ہر
بالائی حد کیوں موجود ہے اور فائل کے اندراجات والے اسی `frozen` آبجیکٹ میں محفوظ ہوتے ہیں)۔
جو bot حد بڑھا سکے، وہ موجودہ صورتِ حال سے قطعی طور پر بدتر ہوگا۔ ریگریشن
گارڈ: `tests/unit/verify-ratchet-bank.test.ts`۔

یہ جاب کبھی بھی `release/*` پر push نہیں کرتی — PR کو ایک انسان merge کرتا ہے، لہٰذا غلط پیمائش
بغیر جائزے کے شامل نہیں ہو سکتی۔

## الاؤ لسٹ پالیسی

ہر وہ گیٹ جو پہلے سے موجود خلاف ورزیوں پر ناکام نہیں ہو سکتا، ایک منجمد الاؤ لسٹ استعمال کرتا ہے
(مثلاً، `KNOWN_STALE_DOC_REFS`، `KNOWN_MISSING`، `KNOWN_RAW_SQL`)۔ پالیسی یہ ہے:

**بنیادی وجہ کو درست کریں؛ الاؤ لسٹ صرف اس وقت استعمال کریں جب خلاف ورزی پہلے سے موجود ہو اور
اسی PR میں درست نہ کی جا سکے۔**

الاؤ لسٹ میں کوئی اندراج شامل کرتے وقت:

1. جواز کے ساتھ ایک تبصرہ شامل کریں۔
2. ٹریکنگ ایشو کا حوالہ دیں (مثلاً، `// #3498 — فیز 2 کی خصوصیت، ابھی نافذ نہیں کی گئی`)۔
3. خلاف ورزی درست کرنے والے اسی PR میں اندراج ہٹا دیں — ایک فرسودہ اندراج جو اب
   کسی فعال خلاف ورزی کو نہیں دباتا، بذاتِ خود ایک نقص ہے (نافذ ہونے کے بعد 6A.3 stale-enforcement
   کسی یتیم الاؤ لسٹ اندراج پر گیٹ کو ناکام کر دے گا)۔

ٹیسٹس کو زیادہ تیزی سے پاس کرانے کے لیے الاؤ لسٹ میں اندراجات **شامل نہ کریں**۔ بڑھتی ہوئی
الاؤ لسٹ کے ساتھ سبز گیٹ معیار کا جھوٹا احساس دیتا ہے۔

### جب آپ کے PR پر کوئی گیٹ ناکام ہو

1. **گیٹ کا آؤٹ پٹ غور سے پڑھیں** — یہ آپ کو بالکل بتاتا ہے کہ کس فائل یا علامت نے
   اصول کی خلاف ورزی کی۔
2. **خلاف ورزی درست کریں** — زیادہ تر گیٹس قطعی فائل سسٹم چیکس ہیں جو کوڈ درست ہوتے ہی
   پاس ہو جاتے ہیں۔
3. **اگر خلاف ورزی پہلے سے موجود ہے** (یعنی، آپ نے اسے متعارف نہیں کرایا لیکن اب گیٹ
   اس کا احاطہ کرتا ہے): جواز کے تبصرے اور ٹریکنگ ایشو کے ساتھ الاؤ لسٹ میں ایک اندراج شامل کریں۔
4. **اگر گیٹ ratchet ہے** (کوریج، ESLint تنبیہات، تکرار، پیچیدگی):
   آپ کی تبدیلی نے میٹرک کو بدتر کر دیا ہے۔ بنیادی مسئلہ درست کریں، یا (شاذ و نادر) اگر تبدیلی
   دانستہ ہے اور میٹرک میں تنزلی قابلِ قبول ہے تو `npm run quality:ratchet -- --update`
   چلائیں — لیکن PR کی تفصیل میں وجہ درج کریں۔
5. **مشاورتی گیٹس** (`continue-on-error: true`) معلوماتی ہوتے ہیں — یہ
   مرج کو نہیں روکتے، لیکن CI خلاصے میں ظاہر ہوتے ہیں۔ پھر بھی انہیں درست کریں۔

---

## نیا گیٹ شامل کرنا

1. `scripts/check/check-<name>.mjs` (یا `.ts`) بنائیں۔ پالیسی گیٹس 0/1 کے ساتھ خارج ہوتے ہیں۔
   Ratchet طرز کے گیٹس `collect-metrics.mjs` کے ذریعے `quality-metrics.json` میں ایک میٹرک خارج کرتے ہیں۔
2. `package.json` میں `"check:<name>": "node scripts/check/check-<name>.mjs"` شامل کریں۔
3. اسے `.github/workflows/ci.yml` میں مناسب جاب کے تحت مربوط کریں
   (پالیسی → `lint` یا `docs-sync-strict`؛ ratchet → `quality-gate`)۔
4. اگر اس کی الاؤ لسٹ ہے، تو `scripts/check/lib/allowlist.mjs` سے
   `reportStaleEntries()` لاگو کریں تاکہ فرسودہ اندراجات خودکار طور پر شناخت ہو سکیں۔
5. گیٹ کی شناختی منطق کا احاطہ کرنے والا ٹیسٹ `tests/unit/build/` میں لکھیں۔
6. اس دستاویز کو اپ ڈیٹ کریں (متعلقہ جاب ٹیبل میں ایک قطار شامل کریں)۔

---

## ایجنٹ ٹولنگ: LSP-in-the-loop (اختیاری)

CI گیٹس کے علاوہ، OmniRoute ایک **اختیاری** `agent-lsp` اسکیفولڈ فراہم کرتا ہے
(پروجیکٹ سطح کی `.mcp.json`، Fase 7 Task 15)۔ کوڈنگ ایجنٹس کے لیے TypeScript لینگویج سرور
دستیاب کرنے کی خاطر `.mcp.json` بنائیں، تاکہ وہ کوڈ لکھنے سے **پہلے** علامات /
تشخیصی معلومات حل کریں — یہ `typecheck:core` کا compile-before-claim معاون ہے
جو "خود ساختہ علامت" کی خرابیوں کو ماخذ ہی پر کم کرتا ہے۔ اسے دانستہ طور پر
خودکار طور پر لوڈ نہیں کیا جاتا (آپ MCP↔LSP برج منتخب اور تصدیق کرتے ہیں)؛ کوئی خراب اندراج صرف
کنکشن کی خرابی لاگ کرتا ہے اور کبھی بھی سیشنز کو متاثر نہیں کرتا۔

---

## معقولیت سازی کا بیک لاگ (ROI جائزہ — مرحلہ 9 لہر 3)

اس فہرست کا 2026-06-17 کو `ci.yml` کے مقابل موازنہ کر کے تطبیق کی گئی (پچھلے ورژن میں
`audit:deps`، `check:tracked-artifacts`، `check:lockfile`، `check:licenses`،
`check:dead-code`، `check:cognitive-complexity`، `check:type-coverage`،
`check:codeql-ratchet`، `check:pr-evidence` شامل نہیں تھے)۔ تطبیق شدہ مجموعے کے ROI جائزے
نے معقولیت سازی کے درج ذیل امیدواروں کی نشاندہی کی۔ **انضمام محض میکانکی CI
تبدیلیاں ہیں؛ پلٹانا/حذف کرنا پالیسی فیصلے ہیں جو آپریٹر کے لیے محفوظ ہیں۔** ذیل میں سے کچھ بھی
ابھی لاگو نہیں کیا گیا۔

**اوپر یہ بھی دستاویزی شکل میں درج نہیں** (مشاورتی، کم سگنل): `docs-lint` جاب
(markdownlint + Vale، پوری جاب پر `continue-on-error`) اور علیحدہ اسکینر ورک فلوز
`semgrep.yml` / `codeql.yml` / `scorecard.yml`۔ `semgrepFindings: 0`
`quality-baseline.json` میں موجود ہے لیکن `ci.yml` میں کسی بلاکنگ ریچٹ سے منسلک نہیں — یہ میٹرک
فی الحال غیر مربوط ہے۔

### انضمام / نقل کا خاتمہ (میکانکی، کم خطرہ)

ہر امیدوار کی 2026-06-17 کو فعال گیٹ کی حالت کے مقابل توثیق کی گئی (اعتماد کریں مگر تصدیق بھی کریں)؛
کئی "واضح" انضمامات میں چھپا ہوا قرض سامنے آیا اور وہ **صاف ستھرے براہِ راست متبادل نہیں** ہیں۔

- **`check:docs-sync` دو بار چلتا ہے** — `lint` جاب میں علیحدہ طور پر اور دوبارہ `check:docs-all` (`docs-sync-strict`) اور husky pre-commit ہک کے اندر۔ ✅ **مکمل** — علیحدہ `lint` اجرا ہٹا دیا گیا۔
- **CVE اسکیننگ** — ❌ **صاف انضمام نہیں۔** `audit:deps` کسی بھی high/critical CVE پر قطعی طور پر ناکام ہو جاتا ہے؛ `check:vuln-ratchet` (osv) صرف بنیادی خط کے مقابل کسی _تنزلی_ پر ناکام ہوتا ہے (فی الحال 1 MODERATE)۔ معنویات مختلف ہیں — `audit:deps` حذف کرنے سے مطلق high/critical گیٹ ختم ہو جائے گا۔ دونوں برقرار رکھیں۔
- **چکر کی کھوج** — ✅ **مکمل** (#15159 G-01/G-02)۔ یہاں موجود پرانے متن نے `check:cycles` کو "سبز، منتخب" گیٹ کہا تھا اور اسے بلاکنگ رکھنے کا جواز یہ دیا تھا کہ `check:circular-deps` (dpdm) نے 91 چکروں کی اطلاع دی۔ وہ سبز حالت ایک **غلط سبز حالت** تھی: `check:cycles` نے 5 ذیلی ڈائریکٹریاں (450 فائلیں) اسکین کیں، صرف جامد `import|export … from` سے مطابقت کی، اور ہر `@/` اور `@omniroute/open-sse/` تخصیص کار کو خارج کر دیا، اس لیے یہ ان dynamic-import + alias چکروں کو نہیں دیکھ سکتا تھا جو ریپو میں غالب تھے۔ درست کر دیا گیا: گیٹ اب `src` + `open-sse` (5023 فائلیں) میں چلتا ہے، TypeScript AST سے تخصیص کار جمع کرتا ہے (لہٰذا `import("…")` شمار ہوتا ہے جبکہ ٹائپ پوزیشن میں `typeof import("…")` شمار نہیں ہوتا)، اور tsconfig `paths` کو حل کرتا ہے۔ اسے 0 نہیں بلکہ **14** چکر ملتے ہیں۔ چونکہ گیٹ PR میں پہلے سے موجود 14 چکروں کو درست نہیں کیا جا سکتا، اس لیے `check:cycles` اب ایک **ریچٹ** ہے (`--ratchet`، `quality-baseline.json` میں حد `metrics.cycles.value = 14`، `direction: down`) — یہ کسی بھی _تنزلی_ کو روکتا ہے اور تعداد صرف کم ہو سکتی ہے۔ CI میں `npm run check:cycles:ratchet` چلتا ہے۔ مرحلہ وار کمی **A-01** کے ساتھ آگے بڑھے گی۔ `check:circular-deps` (dpdm) ایک وسیع تر ثانوی رائے کے طور پر مشاورتی رہے گا۔
- **پیچیدگی** — ✅ **مکمل** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ایک ESLint واک، `ruleId` کے لحاظ سے شمار، تاکہ cyclomatic+max-lines اور cognitive بنیادی خطوط آزاد رہیں؛ انفرادی `check:complexity` / `check:cognitive-complexity` مقامی `--update` کے لیے برقرار ہیں۔
- **`/api` اینٹی ہیلوسینیشن** — ✅ **مکمل** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` کی ایک FS فہرست سازی، openapi-routes + docs-symbols اب بھی آزادانہ طور پر رپورٹ کرتے ہیں؛ انفرادی چیکس مقامی اجرا کے لیے برقرار ہیں۔
- **`check:node-runtime` 11 جابز میں چلتا ہے** — ⚠️ **کم ROI۔** ہر ایک الگ رنر ہے اور چیک <1s ہے؛ کل بچت ~10s ہے، جبکہ اس کے بدلے ہر جاب کا ایک سستا حفاظتی چیک ختم ہو جائے گا۔ اتنی تبدیلی کے قابل نہیں۔
- **CI lint پر `typecheck:noimplicit:core`** — ✅ **lint جاب سے ہٹا دیا گیا** (یہ مشاورتی `continue-on-error` تھا)؛ بلاکنگ ٹائپ سطح `typecheck:core` + `check:type-coverage` ہے۔ مقامی اسکرپٹ برقرار رکھا گیا۔

### پلٹائیں / فیصلہ کریں (آپریٹر پالیسی)

- `check:openapi-security-tiers` (مشاورتی) — ❌ **صاف طور پر پلٹنے کے قابل نہیں۔** یہ 0 کے ساتھ خارج ہوتا ہے لیکن خبردار کرتا ہے کہ `LOCAL_ONLY_API_PREFIXES` کے تحت کئی `traffic-inspector` روٹس میں `x-loopback-only: true` تشریح موجود نہیں۔ اسے نافذ کرنے کے لیے پہلے `openapi.yaml` میں یہ تشریحات شامل کرنا ضروری ہے۔
- `typecheck:noimplicit:core` (مشاورتی) — بڑی حد تک بلاکنگ `check:type-coverage` ریچٹ میں شامل ہے۔ اسے ریچٹ میں تبدیل کریں یا فالتو دوسرے `tsc` پاس کو حذف کریں۔
- `test:vitest:ui` (اب **بلاکنگ**) — پہلے سے موجود ناکامیاں `vitest.config.ts` میں `// #8618` ٹریکنگ تبصروں کے ساتھ واضح طور پر خارج کی گئی ہیں؛ نئی ناکامیاں جاب کو ناکام کر دیتی ہیں۔
- `check:secrets` (gitleaks، 3 دستاویزی false-positives پر منجمد بلاکنگ ریچٹ) — 0 تک پہنچنے کے لیے ان 3 کو allowlist کریں، یا اسے مشاورتی درجے پر لے جائیں۔ یہ GitHub کی مقامی secret-scanning + `check:public-creds` سے متجاوز ہے۔
- `check:pr-evidence` (بلاکنگ، PR-body نثر میں grep کرتا ہے) — false-positive کا زیادہ خطرہ؛ اسے حذف کرنے سے Hard Rule #18 کا نفاذ کمزور ہو جائے گا، اس لیے یہ حقیقی پالیسی فیصلہ ہے۔
- `semgrep` (مشاورتی علیحدہ ورک فلو) — OWASP خاندانوں کے لیے CodeQL سے متجاوز ہے؛ اس کے بنیادی خط کو کسی ریچٹ سے منسلک کریں یا حذف کر دیں۔

---

## متعلقہ دستاویزات

- سپلائی چین (ماخذ، SBOM، Trivy، Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — کلیدی مجموعوں کی یکسانیت کا گیٹ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`، جاب `i18n-ui-coverage`)۔
ہر `src/i18n/messages/<locale>.json` کے آخری درجے کے کلیدی مجموعے کا `en.json` سے موازنہ کرتا ہے اور
کسی بھی غائب یا اضافی آخری کلید پر ناکام ہو جاتا ہے، چاہے وہ کلید کب بھی شامل کی گئی ہو۔ `__MISSING__:`
پلیس ہولڈرز کو موجود شمار کیا جاتا ہے (ان کا مواد تناسب والے گیٹ کا معاملہ ہے)۔ یہ اختلاف پر مبنی/فی صد والے
دونوں گیٹس کا قطعی تکملہ ہے: `check-ui-keys-coverage` ہر لوکیل کے لیے 80 % کی کم از کم حد نافذ کرتا ہے
(~13,000 میں سے 43 غائب کلیدیں بھی 99.7 % دکھاتی ہیں)، جبکہ `check-new-key-coverage` صرف ان کلیدوں کا
جائزہ لیتا ہے جو کوئی PR، `en.json` میں شامل کرتا ہے۔ لوکیل بیچ اس دن کے `en.json` سے تیار کیا جاتا ہے
جس دن اس کی برانچ بنائی جاتی ہے، اور کئی دن تک ترجمہ جاری رہتا ہے جبکہ بیس میں نئی کلیدیں شامل ہوتی رہتی ہیں؛
بیچ PR خود کوئی کلید شامل نہیں کرتا، اس لیے جب بیچ 1 (#13044) نو لوکیلز میں 43 کلیدوں کی کمی کے ساتھ
اور بیچ 2 (#13660) آٹھ لوکیلز میں 10 کلیدوں کی کمی کے ساتھ ضم ہوئے (2026-09-15)، تو دونوں ہم رتبہ گیٹس
خاموش رہے۔ ناکامی کو
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` سے درست کریں؛ ایک `extra`
آخری کلید کا مطلب ہے کہ ماخذ نے اسے حذف کر دیا ہے — اسے لوکیل سے بھی حذف کریں۔ `--warn` ناکام ہوئے بغیر
رپورٹ کرتا ہے۔ `--catalog=cli` یہی موازنہ `bin/cli/locales` پر چلاتا ہے
(`npm run i18n:check-keys:cli`)؛ دونوں مراحل جاب `i18n-ui-coverage` میں موجود ہیں۔

#### `check-new-key-coverage` — نئی کلید کا i18n گیٹ

`check-ui-value-drift` کا ہم رتبہ۔ وہ ایسی انگریزی قدر پکڑتا ہے جسے **دوبارہ لکھا گیا**
ہو مگر اس کے تراجم پیچھے رہ گئے ہوں؛ یہ ایسی انگریزی کلید پکڑتا ہے جسے **شامل کیا گیا**
ہو مگر بعض لوکیلز کو کبھی نہ ملی ہو۔

`check-ui-keys-coverage` اس صورت کو نہیں دیکھ سکتا: یہ ہر لوکیل کے لیے فی صد کی کم از کم حد نافذ کرتا ہے،
اور ~13,000 آخری کلیدوں میں سے گیارہ غائب کلیدیں بھی کوریج کو 99.9% پر رکھتی ہیں۔ فی زبان فی صد
یہ ظاہر نہیں کر سکتا کہ "یہ فیچر بغیر ترجمے کے جاری ہوا" — کسی نئے لوکیل میں ایک پورا فیچر بغیر کسی
متن کے شامل ہو سکتا ہے اور پھر بھی یہ عدد تبدیل نہیں ہوتا۔

جس واقعے کو یہ محفوظ کرتا ہے: Orchestration Canvas کے Phase 3 نے اپنی گیارہ کلیدوں کا ترجمہ ان
42 لوکیلز میں کیا جو اس وقت موجود تھے۔ چند گھنٹے بعد EU زبانوں کے بیچ (#13044) نے ریپو کو
51 لوکیلز تک پہنچا دیا، اور نو نئے لوکیلز (`el`، `et`، `ga`، `hr`، `lt`، `lv`، `mt`، `sl`، `sr`) کو
وہ کلیدیں کبھی نہیں ملیں۔ `deepMergeFallback` غائب کلید کی جگہ انگریزی استعمال کرتا ہے، اس لیے
خرابی کی صورت خالی UI کے بجائے غیر مترجم UI تھی — حقیقی، اور ساختی طور پر خاموش۔

اپنے ہم رتبہ کی طرح یہ بھی **اختلاف سے آگاہ** ہے، اور مرج بیس پر موجود انگریزی کا ورکنگ ٹری سے
موازنہ کرتا ہے، اس لیے پہلے سے موجود خلا منجمد رہتے ہیں اور گیٹ کو فعال کرنے کے لیے کسی منتقلی کی
ضرورت نہیں پڑی۔

**ایک `__MISSING__:<english>` مارکر اسے مطمئن نہیں کرتا (2026-09-17 سے)۔** پہلے یہ دستاویزی
التوا کا طریقہ تھا — رن ٹائم درست انگریزی پر واپس آ جاتا ہے — یہاں تک کہ 2026-09-16 کو آٹھ فیچر PRs
نے 61 کلیدیں شامل کیں اور ترجمہ کرنے کے بجائے تمام 65 لوکیلز میں مارکر لگا دیا: اس گیٹ نے ہر ایک کو
قبول کر لیا، کسی چیز نے PRs کو نہیں روکا، اور پھر بلاک کرنے والا حقیقی ترجمے کے تناسب کا گیٹ ریلیز ٹِپ
پر سب کے لیے ناکام ہو گیا (pt-BR 3.2 % > 2.5 % + 0.5)۔ اب مارکر کو غائب ترجمہ سمجھا جاتا ہے۔
ناکامی کو
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` سے،
یا تمام لوکیلز کو متوازی طور پر `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`، detached حالت میں محفوظ، `OMNIROUTE_TRANSLATION_*` env کے
بغیر شروع ہونے سے انکار کرتا ہے) کے ذریعے درست کریں۔ جو کلید لازماً انگریزی میں رہنی چاہیے
(کسی پروڈکٹ/انجن/فلیگ کا مقررہ نام)، اسے `scripts/i18n/untranslatable-keys.json` میں ہونا چاہیے،
کبھی بھی مارکر کے پیچھے نہیں۔ `vi` مارکرز پر مکمل پابندی عائد کرتا ہے
(`tests/unit/i18n-vi-completeness.test.ts`)۔

#### `check-vitest-exclusions` — مؤخر شدہ ٹیسٹ کا گیٹ

`vitest.config.ts` کی `exclude` فہرست میں موجود فائل ایسا ٹیسٹ ہے جو چلتا نہیں، مگر ٹری پڑھنے والے کو
وہ کوریج کی طرح نظر آتا ہے۔ باسٹھ فائلیں اس تبصرے کے پیچھے جمع ہو گئیں:
`// #8618 — پہلے سے موجود ناکامی؛ درست ہونے پر یہ اخراج ہٹا دیں`۔ ایشو #8618 کو
2026-08-11 کو بند کر دیا گیا، جبکہ اس کی زیرِ نگرانی فہرست 45 اندراجات سے بڑھ کر 62 ہو گئی، اور ہر
نئے اندراج کو ایک بند شدہ ایشو کی طرف اشارہ کرنے والا تبصرہ ورثے میں ملا۔ جب بالآخر فہرست کی ہر فائل
کو الگ الگ ناپا گیا (#13204)، تو **62 میں سے 51 موجودہ ٹری پر ماخذ میں کسی تبدیلی کے بغیر کامیاب ہوئیں**۔

گیٹ کا تقاضا ہے کہ حقیقی فائل پر منتج ہونے والا ہر اخراج (a) کسی ٹریکنگ ایشو کا نام دے اور
(b) اپنی پیمائش شدہ حالت کے ساتھ `config/quality/vitest-exclusions.json` میں موجود ہو، تاکہ نیا اخراج
شامل کرنا 60 اندراجات والی صف میں محض ایک اور سطر کے بجائے مخصوص فائل میں قابلِ جائزہ اختلاف ہو۔
یہ دانستہ طور پر خارج شدہ ٹیسٹس دوبارہ نہیں چلاتا — اس میں ~10 منٹ لگتے ہیں اور یہ کام دورانی جاب
کا ہے؛ انوینٹری ریکارڈ کرتی ہے کہ ہر ایک کی آخری پیمائش کب ہوئی تھی۔
