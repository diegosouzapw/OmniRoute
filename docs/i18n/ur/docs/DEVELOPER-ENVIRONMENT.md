# Developer environment notes (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

یہ صفحہ پروجیکٹ کے مقامی `.env` طرزِ عمل اور OmniRoute کی ڈیولپمنٹ کے دوران ماحول کی فائلوں اور رازوں کو سنبھالنے کا طریقہ بیان کرتا ہے۔

## .env postinstall کا طرزِ عمل

پروجیکٹ، ڈیولپرز کی سہولت کے لیے، `npm install` / `postinstall` کے دوران ایک مقامی `.env` فائل بنا سکتا ہے۔ یہ فائل صرف مقامی ڈیولپمنٹ اور ٹیسٹنگ کے لیے ہے اور اسے کبھی بھی ورژن کنٹرول میں commit نہیں کرنا چاہیے۔

اہم نکات:

- ریپوزٹری کی `.gitignore` پہلے ہی `.env*` فائلوں کو نظر انداز کرتی ہے (`.gitignore` کا اندراج دیکھیں)۔ اس اصول کو نہ ہٹائیں اور نہ تبدیل کریں، الا یہ کہ آپ دانستہ طور پر کوئی مخصوص مثالی فائل commit کرنا چاہتے ہوں اور اس کے لیے آپ کے پاس ایک دستاویزی طریقۂ کار موجود ہو۔
- اگر کوئی حقیقی راز غلطی سے repo میں commit ہو جائے، تو فوراً اس credential کو rotate/revoke کریں اور اسے ریپوزٹری کی ہسٹری سے ہٹا دیں (مثلاً `git filter-repo` یا اس کے مساوی تدارکی workflow کے ذریعے)۔ اگر آپ کو مدد درکار ہو تو سیکیورٹی/رابطے کے ذمہ دار فرد سے رابطہ کریں۔
- CI اور پروڈکشن کے لیے، رازوں کو فائلوں میں commit کرنے کے بجائے CI secrets یا secrets manager (GitHub Actions Secrets، Azure Key Vault، HashiCorp Vault، وغیرہ) استعمال کریں۔

## تجویز کردہ مقامی workflow

- `.env` کو صرف اپنی مقامی workspace میں رکھیں۔ مطلوبہ variables اور قابلِ قبول مثالی values کو دستاویزی شکل دینے کے لیے `.env.example` (جو پہلے ہی track کی جا رہی ہے) استعمال کریں۔
- ایسے مقامی tests چلاتے وقت جنہیں راز سے مشابہ values درکار ہوں، حقیقی credentials کے بجائے مصنوعی placeholders یا runtime پر بنائی گئی عارضی keys کو ترجیح دیں۔
- placeholders استعمال کرنے والے tests میں ایک مختصر comment شامل کریں تاکہ reviewers سمجھ سکیں کہ fixture مصنوعی ہے۔

## scanner سے متعلق نوٹس

- کچھ compiled یا binary assets (مثلاً embedded base64 WASM blobs) میں ایسی ASCII substrings موجود ہو سکتی ہیں جو credentials جیسی نظر آتی ہیں اور متن پر مبنی secret scanners کو متحرک کر سکتی ہیں۔ اگر یہ assets جائز ہوں، تو یا تو انہیں scanner کی allowlist میں شامل کریں یا scanner config میں متعلقہ directories کو خارج کر دیں۔

## اگر آپ کو کوئی leak ملے

1. key کو فوراً rotate/revoke کریں۔
2. راز کو ہسٹری سے ہٹا دیں اور اگر ضروری ہو تو صاف کی گئی branch کو force-push کریں۔
3. maintainers کو مطلع کریں اور اپنی org کی incident response checklist پر عمل کریں۔
