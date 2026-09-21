# Developer environment notes (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

ទំព័រនេះពន្យល់អំពីឥរិយាបថរបស់ `.env` មូលដ្ឋាននៃគម្រោង និងរបៀបគ្រប់គ្រងឯកសារបរិស្ថាន និងព័ត៌មានសម្ងាត់ នៅពេលអភិវឌ្ឍ OmniRoute។

## ឥរិយាបថរបស់ .env ក្នុងពេល postinstall

គម្រោងអាចបង្កើតឯកសារ `.env` មូលដ្ឋានក្នុងអំឡុងពេល `npm install` / `postinstall` ដើម្បីផ្តល់ភាពងាយស្រួលដល់អ្នកអភិវឌ្ឍន៍។ ឯកសារនេះត្រូវបានប្រើសម្រាប់តែការអភិវឌ្ឍ និងការធ្វើតេស្តក្នុងមូលដ្ឋានប៉ុណ្ណោះ ហើយមិនត្រូវ commit ទៅក្នុងប្រព័ន្ធគ្រប់គ្រងកំណែជាដាច់ខាត។

ចំណុចសំខាន់ៗ៖

- `.gitignore` របស់ repository បានមិនរាប់បញ្ចូលឯកសារ `.env*` រួចហើយ (សូមមើលធាតុក្នុង `.gitignore`)។ កុំលុប ឬកែប្រែច្បាប់នោះ លុះត្រាតែអ្នកមានបំណងច្បាស់លាស់ក្នុងការ commit ឯកសារឧទាហរណ៍ជាក់លាក់ណាមួយ ហើយមានដំណើរការដែលបានចងក្រងជាឯកសារសម្រាប់វា។
- ប្រសិនបើព័ត៌មានសម្ងាត់ពិតប្រាកដត្រូវបាន commit ចូលទៅក្នុង repo ដោយចៃដន្យ សូមប្តូរ/ដកហូត credential នោះភ្លាមៗ ហើយលុបវាចេញពីប្រវត្តិរបស់ repository (ឧទាហរណ៍ ដោយប្រើ `git filter-repo` ឬលំហូរការងារដោះស្រាយដែលមានតម្លៃស្មើគ្នា)។ សូមទាក់ទងម្ចាស់ផ្នែកសុវត្ថិភាព/ទំនាក់ទំនង ប្រសិនបើអ្នកត្រូវការជំនួយ។
- សម្រាប់ CI និង production សូមប្រើព័ត៌មានសម្ងាត់របស់ CI ឬកម្មវិធីគ្រប់គ្រងព័ត៌មានសម្ងាត់ (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault ជាដើម) ជំនួសឱ្យការ commit ព័ត៌មានសម្ងាត់ទៅក្នុងឯកសារ។

## លំហូរការងារមូលដ្ឋានដែលបានណែនាំ

- រក្សា `.env` នៅក្នុង workspace មូលដ្ឋានរបស់អ្នកប៉ុណ្ណោះ។ ប្រើ `.env.example` (ដែលត្រូវបានតាមដានរួចហើយ) ដើម្បីចងក្រងជាឯកសារអំពីអថេរដែលត្រូវការ និងតម្លៃឧទាហរណ៍ដែលអាចទទួលយកបាន។
- នៅពេលដំណើរការតេស្តក្នុងមូលដ្ឋានដែលត្រូវការតម្លៃស្រដៀងព័ត៌មានសម្ងាត់ សូមប្រើ placeholder សិប្បនិម្មិត ឬ key បណ្តោះអាសន្នដែលបង្កើតនៅពេលដំណើរការ ជំនួសឱ្យ credential ពិតប្រាកដ។
- បន្ថែម comment ខ្លីមួយនៅក្នុងតេស្តដែលប្រើ placeholder ដើម្បីឱ្យអ្នកត្រួតពិនិត្យយល់ថា fixture នោះជាទិន្នន័យសិប្បនិម្មិត។

## កំណត់សម្គាល់អំពី scanner

- ទ្រព្យសកម្មដែលបាន compile ឬជាទម្រង់ binary មួយចំនួន (ឧទាហរណ៍ blob WASM ជា base64 ដែលបានបង្កប់) អាចមាន substring ASCII ដែលមើលទៅដូចជា credential និងអាចបង្កឱ្យ scanner ព័ត៌មានសម្ងាត់ផ្អែកលើអត្ថបទចេញការព្រមាន។ ប្រសិនបើទ្រព្យសកម្មទាំងនេះត្រឹមត្រូវ សូមសម្គាល់ពួកវានៅក្នុង allowlist របស់ scanner ឬមិនរាប់បញ្ចូល directory ទាំងនោះនៅក្នុង config របស់ scanner។

## ប្រសិនបើអ្នករកឃើញការលេចធ្លាយ

1. ប្តូរ/ដកហូត key ភ្លាមៗ។
2. លុបព័ត៌មានសម្ងាត់ចេញពីប្រវត្តិ ហើយ force-push branch ដែលបានសម្អាត ប្រសិនបើចាំបាច់។
3. ជូនដំណឹងដល់អ្នកថែទាំ និងអនុវត្តតាមបញ្ជីត្រួតពិនិត្យការឆ្លើយតបចំពោះឧប្បត្តិហេតុរបស់អង្គភាពអ្នក។
