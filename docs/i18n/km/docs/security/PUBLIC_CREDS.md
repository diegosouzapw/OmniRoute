# Public Credentials Handling (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **ប្រភពត្រឹមត្រូវចម្បង:** `open-sse/utils/publicCreds.ts`
> **ការធ្វើតេស្ត:** `tests/unit/publicCreds.test.ts`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-08-07 — v3.8.50
> **អ្នកអានគោលដៅ:** វិស្វករដែលកំពុងរួមបញ្ចូលអ្នកផ្តល់សេវាដែលចែកចាយ OAuth client_id / client_secret / Firebase Web API keys សាធារណៈនៅក្នុង CLI សាធារណៈរបស់ពួកគេ។
> **ស្ថានភាព:** **ចាំបាច់ត្រូវអនុវត្ត** សម្រាប់កូដថ្មីទាំងអស់ដែលបង្កប់អត្តសញ្ញាណករពីប្រភពខាងលើ។

## ហេតុអ្វីបានជាវាមានវត្តមាន

- [OAuth 2.0 សម្រាប់កម្មវិធីដើម (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret សម្រាប់កម្មវិធីដែលបានដំឡើងគឺជាព័ត៌មានសាធារណៈ; PKCE ផ្តល់សុវត្ថិភាពជាក់ស្តែង។
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — អត្តសញ្ញាណកររបស់ Web client គឺសាធារណៈតាំងពីការរចនាដើម។

OmniRoute ត្រូវតែបង្កប់តម្លៃទាំងនេះ ដើម្បីឱ្យអ្នកប្រើដែលមិនបានកំណត់រចនាសម្ព័ន្ធ `.env` នៅតែទទួលបានដំណើរការ OAuth ដែលអាចប្រើបានភ្លាមៗ។ បើគ្មានតម្លៃជំនួសដែលបានបង្កប់ទេ អ្នកផ្តល់សេវា Gemini / Antigravity នឹងឈប់ដំណើរការសម្រាប់អ្នកប្រើណាម្នាក់ដែលអនុវត្តតាមផ្លូវ "គ្រាន់តែ clone ហើយ run"។

ទោះជាយ៉ាងណា តម្លៃផ្ទាល់ដូចជា `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` ត្រូវបានផ្គូផ្គងដោយ **GitHub Secret Scanning**, **Semgrep** និងកម្មវិធីស្កេនតាមលំនាំស្រដៀងគ្នា។ រាល់ការចេញផ្សាយក្លាយជាស្ទ្រីមនៃការជូនដំណឹងខុសដែលរំខាន, push protection រារាំង commit ដែលត្រឹមត្រូវ ហើយអ្នកប្រតិបត្តិការឈប់ជឿទុកចិត្តលើស្ទ្រីមការជូនដំណឹង។

ឧបករណ៍ជំនួយ `open-sse/utils/publicCreds.ts` ដោះស្រាយលក្ខខណ្ឌទាំងពីរក្នុងពេលតែមួយ៖

- បង្កប់អត្តសញ្ញាណករសាធារណៈជា **លំដាប់ byte ដែលបានបិទបាំងដោយ XOR** (គ្មានលំនាំសម្រាប់កម្មវិធីស្កេននៅក្នុងកូដប្រភព)។
- ឌិកូដនៅពេលដំណើរការតាមរយៈ `decodePublicCred` / `resolvePublicCred`។
- រកឃើញតម្លៃឆៅដែលអនុវត្តតាមបុព្វបទដែលគេស្គាល់ជាទូទៅរួចហើយ (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) ហើយបញ្ជូនតម្លៃទាំងនោះបន្តដោយមិនផ្លាស់ប្តូរ ដូច្នេះអ្នកប្រើដែលមានតម្លៃឆៅនៅក្នុង `.env` ដែលមានស្រាប់របស់ពួកគេ អាចបន្តដំណើរការដោយ **មិនចាំបាច់ធ្វើការផ្លាស់ប្តូរទិន្នន័យអ្វីទាំងអស់**។

នេះគឺជា **ការបំភាន់ មិនមែនការអ៊ិនគ្រីបទេ។** អ្នកណាក៏ដោយដែលអានកូដប្រភព អាចយកតម្លៃនោះមកវិញបាន — ហើយវាមិនជាបញ្ហាទេ ព្រោះតម្លៃនេះគឺសាធារណៈតាំងពីការរចនាដើម។ គោលដៅតែមួយគត់គឺជៀសវាងការផ្គូផ្គង regex របស់កម្មវិធីស្កេន។

## លំនាំដែលចាំបាច់ត្រូវអនុវត្ត

### 1. ការបន្ថែមព័ត៌មានសម្គាល់សាធារណៈថ្មី

នៅពេលអ្នកត្រូវបង្កប់តម្លៃថ្មីដែលផ្តល់ដោយប្រភពខាងលើ ហើយតម្លៃនោះ៖

- បានមកពី CLI / កម្មវិធី desktop / browser bundle សាធារណៈ, **ហើយ**
- អ្នកផ្តល់សេវាប្រភពខាងលើបានចងក្រងជាឯកសារ (ឬចាត់ទុក) វាជាអត្តសញ្ញាណករ client សាធារណៈ, **ហើយ**
- កម្មវិធីស្កេនតាមលំនាំនឹងផ្គូផ្គងវា (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` ជាដើម),

…សូមអនុវត្តតាមបញ្ជីត្រួតពិនិត្យនេះ៖

1. បង្កើតលំដាប់ byte ដែលបានបិទបាំង៖

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. បន្ថែមធាតុថ្មីទៅ `EMBEDDED_DEFAULTS` នៅក្នុង `open-sse/utils/publicCreds.ts` ដោយប្រើ **ឈ្មោះ key អព្យាក្រឹត** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` ជាដើម)។ **កុំ** ប្រើឈ្មោះដូចជា `client_secret` ឬ `api_key` នៅក្នុងឧបករណ៍ជំនួយ — ពាក្យទាំងនោះបង្កឱ្យច្បាប់ generic-secret របស់ Semgrep ដំណើរការ។

3. បន្ថែម `keyof typeof EMBEDDED_DEFAULTS` ទៅក្នុង public type union (វាត្រូវបានសន្និដ្ឋានដោយស្វ័យប្រវត្តិ)។

4. នៅក្នុងកូដប្រើប្រាស់ សូមជំនួសតម្លៃផ្ទាល់ដែលបានសរសេរជាប់ជាមួយ៖

   ```ts
   // ការកំណត់ជំនួសតាម env តែមួយ
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // ឈ្មោះក្លែងក្លាយ env ច្រើន (តម្លៃមិនទទេដំបូងឈ្នះ)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // គ្មានការកំណត់ជំនួសតាម env (តែងតែប្រើតម្លៃលំនាំដើមដែលបានបង្កប់)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. លុបតម្លៃផ្ទាល់ចេញពី `.env.example` (ជំនួសវាដោយឯកសារពន្យល់ដែលមានតែមតិយោបល់ និងណែនាំអ្នកអានមកទីនេះ)៖

   ```dotenv
   # ── អ្នកផ្តល់សេវា (Google / Firebase / ជាដើម) ──
   # ព័ត៌មានសម្គាល់ OAuth សាធារណៈត្រូវបានបង្កប់ក្នុងកូដតាមរយៈ
   # open-sse/utils/publicCreds.ts។ កំណត់អថេរទាំងនេះតែនៅពេលចង់ប្រើព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នកប៉ុណ្ណោះ។
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. ធ្វើបច្ចុប្បន្នភាព `tests/unit/publicCreds.test.ts` ដើម្បីបន្ថែម shape assertion សម្រាប់ key ថ្មី (ផ្ទៀងផ្ទាត់ទម្រង់ មិនមែនតម្លៃផ្ទាល់ទេ — សូមមើលការធ្វើតេស្តដែលមានស្រាប់សម្រាប់លំនាំ)។

7. **កុំដាច់ខាត** បន្ថែមតម្លៃផ្ទាល់ `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ទៅក្នុងឯកសារធ្វើតេស្ត។ ប្រើថេរ `FAKE_*` ដែលបានបង្កើតពីបំណែក `.join("")` (សូមមើលការធ្វើតេស្តដែលមានស្រាប់)។

### 2. កូដប្រើប្រាស់

- **អានតាមរយៈ `resolvePublicCred()` / `resolvePublicCredMulti()` តែប៉ុណ្ណោះ** — កុំហៅ `decodePublicCredBytes()` ដោយផ្ទាល់នៅខាងក្រៅឧបករណ៍ជំនួយ។
- ឧបករណ៍ជំនួយនេះត្រូវបានរៀបចំដោយចេតនាឱ្យចំណាយតិច (ប្រតិបត្តិការ XOR លើ byte តាមលំដាប់លីនេអ៊ែរ) និងមានសុវត្ថិភាពក្នុងការហៅនៅពេលផ្ទុក module; តម្លៃលំនាំដើមត្រូវបានគណនាតែម្តង។
- ការកំណត់ជំនួសតាម env តែងតែមានអាទិភាព។ ប្រសិនបើអ្នកប្រើកំណត់ `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` ឧបករណ៍ជំនួយនឹងបញ្ជូនតម្លៃឆៅនោះបន្តដោយមិនផ្លាស់ប្តូរ។

### 3. លំនាំដែលហាមឃាត់

❌ **កុំដាច់ខាត** ធ្វើសកម្មភាពណាមួយខាងក្រោមនៅក្នុងកូដ production (`src/`, `open-sse/`, `electron/`, `bin/`)៖

```ts
// មិនល្អ៖ តម្លៃផ្ទាល់បង្កឱ្យ Secret Scanning + Semgrep ដំណើរការ
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// មិនល្អ៖ base64 នៃតម្លៃផ្ទាល់ — GitHub នៅតែរកឃើញចាប់តាំងពី Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// មិនល្អ៖ ការភ្ជាប់ string ដែលផ្គុំលំនាំឡើងវិញនៅពេលដំណើរការ
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// មិនល្អ៖ ការអ៊ិនកូដ hex/ROT13 — វិធីបំភាន់ផ្សេងគ្នា ប៉ុន្តែមានហានិភ័យត្រូវបានរកឃើញដូចគ្នា
clientSecret: hexDecode("474f4353..."),
```

ទាំងអស់នេះនៅទីបំផុតនឹងបង្កឱ្យកម្មវិធីស្កេនដំណើរការ។ ប្រើ `resolvePublicCred()`។

❌ **កុំដាច់ខាត** បន្ថែមព័ត៌មានសម្គាល់ផ្ទាល់ទៅក្នុង `.env.example`។ អ្នកប្រើដែលត្រូវការតម្លៃពិតប្រាកដពីប្រភពខាងលើ អាចស្រង់យកវាពី CLI សាធារណៈដោយខ្លួនឯង ឬប្រើការចុះឈ្មោះ OAuth ផ្ទាល់ខ្លួនរបស់ពួកគេ។

❌ **កុំដាច់ខាត** ច្រានចោលការជូនដំណឹង secret-scanning ថ្មី ដោយមិនបានពិនិត្យជាមុនថាតើព័ត៌មានសម្គាល់នោះគួរត្រូវបានផ្លាស់ទីមកឧបករណ៍ជំនួយនេះឬអត់។

## ការគ្រប់គ្រងដែលពាក់ព័ន្ធ

- `RAW_VALUE_PATTERN` នៅក្នុង `publicCreds.ts` រាយបញ្ជីបុព្វបទដែលបង្កឱ្យមានការបញ្ជូនតម្លៃដើមដោយផ្ទាល់ (សម្រាប់ភាពឆបគ្នាជាមួយកំណែចាស់)។ ពង្រីកវាតែសម្រាប់ទម្រង់ព័ត៌មានសម្ងាត់សាធារណៈដែលមានឯកសារបញ្ជាក់ប៉ុណ្ណោះ មិនត្រូវប្រើសម្រាប់ទិន្នន័យសម្ងាត់កម្មសិទ្ធិឡើយ។
- `.env.example` ស្ថិតនៅក្នុងស្គ្រីប `check-env-doc-sync` របស់ CI — នៅពេលអ្នកលុបអថេរមួយចេញពីទីនេះ ត្រូវប្រាកដថាឯកសារណែនាំត្រូវគ្នាផងដែរ។
- សំណុំតេស្ត `npm run test:vitest` និង `node --import tsx/esm --test tests/unit/publicCreds.test.ts` ត្រូវតែបន្តឆ្លងកាត់ដោយជោគជ័យទាំងពីរ។

## ពេលដែលមិនត្រូវប្រើមុខងារជំនួយនេះ

មុខងារជំនួយនេះគឺសម្រាប់តែព័ត៌មានសម្ងាត់ដែល៖

1. ត្រូវបានចែកចាយជាសាធារណៈដោយអ្នកផ្តល់សេវាដើម (ឯកសារប្រតិបត្តិ CLI, កញ្ចប់សម្រាប់កម្មវិធីរុករក, ឯកសារណែនាំផ្លូវការ)។
2. ត្រូវបានចងក្រងជាឯកសារ ឬបញ្ជាក់យ៉ាងច្បាស់ថាមិនមែនជាព័ត៌មានសម្ងាត់ (ការពារដោយ PKCE, Firebase Web key ឬស្រដៀងគ្នា)។

សម្រាប់អ្វីៗផ្សេងទៀត — ថូខឹនដែលចេញដោយប្រតិបត្តិករ, ទិន្នន័យសម្ងាត់សម្រាប់ tenant នីមួយៗ, `client_secret` របស់កម្មវិធី OAuth ផ្ទាល់ខ្លួនរបស់អ្នក, សោកូដនីយកម្ម, ទិន្នន័យសម្ងាត់ JWT, ពាក្យសម្ងាត់មូលដ្ឋានទិន្នន័យ — ប្រើតែ **អថេរបរិស្ថានប៉ុណ្ណោះ** (`process.env.FOO`, ប្រើ `||` ដើម្បីត្រឡប់ទៅតម្លៃទទេ / កំហុសជាក់លាក់)។ ទិន្នន័យទាំងនេះត្រូវដាក់ក្នុង `.env` និង [ឃ្លាំងព័ត៌មានសម្ងាត់ដែលបានអ៊ិនគ្រីប](./COMPLIANCE.md) មិនមែនក្នុងកូដប្រភពទេ។

## ឯកសារយោង

- [Google៖ OAuth 2.0 សម្រាប់កម្មវិធីដើម](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase៖ API keys សម្រាប់កំណត់អត្តសញ្ញាណ client](https://firebase.google.com/docs/projects/api-keys)
- [ព័ត៌មានសម្ងាត់ដែល GitHub Secret Scanning គាំទ្រ](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub៖ ការរកឃើញ base64 សម្រាប់ថូខឹន (កុម្ភៈ 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit ដែលបានណែនាំមុខងារជំនួយនេះ៖ `1a39c31f` — _fix(security): បិទបាំងព័ត៌មានសម្ងាត់សាធារណៈពីអ្នកផ្តល់សេវាដើម + ប្រមូលផ្តុំការសម្អាតកំហុសនៅកន្លែងតែមួយ_
