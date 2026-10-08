# CLI Machine-ID Token (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## ទិដ្ឋភាពទូទៅ

ពាក្យបញ្ជា OmniRoute CLI ផ្ទៀងផ្ទាត់អត្តសញ្ញាណជាមួយ API គ្រប់គ្រងមូលដ្ឋាន ដោយប្រើថូខឹន
`HMAC-SHA256(machine-id, salt)` ដែលផ្ញើតាមបឋមកថាសំណើ
`x-omniroute-cli-token`។

វិធីនេះអនុញ្ញាតឱ្យពាក្យបញ្ជារងរបស់ CLI (`omniroute status`, `omniroute providers` ជាដើម)
ហៅ endpoint គ្រប់គ្រងដោយមិនតម្រូវឱ្យអ្នកប្រើផ្តល់ JWT ឬ
ពាក្យសម្ងាត់រាល់ពេលហៅប្រើ។

## របៀបដំណើរការ

1. `getMachineTokenSync()` អាន ID របស់ម៉ាស៊ីនផ្នែករឹងតាមរយៈ `node-machine-id`
   (ប្រើខ្សែអក្សរទទេជំនួសវិញនៅពេលបរាជ័យ ដែលធ្វើឱ្យការផ្ទៀងផ្ទាត់ CLI ត្រូវបានបិទ)។
2. វាគណនា `HMAC-SHA256(machine_id, salt)` ហើយត្រឡប់តម្លៃសង្ខេប hex ពេញលេញដែលមាន
   64 តួអក្សរ — ជាថូខឹនដែលអាចកំណត់ឡើងវិញបានដូចគ្នា មិនអាចបញ្ច្រាសបាន និងភ្ជាប់ជាមួយម៉ាស៊ីននេះ។
3. CLI ផ្ញើថូខឹនជា `x-omniroute-cli-token` តែនៅពេលគោលដៅដែលបានដោះស្រាយ
   ជា URL loopback ដែលបានបញ្ជាក់ច្បាស់ (`localhost`, `127.0.0.0/8` ឬ
   loopback IPv6) ប៉ុណ្ណោះ។ សំណើដែលមានថូខឹនប្រើ `redirect: error` ដូច្នេះការបញ្ជូនបន្ត
   ក្នុងមូលដ្ឋានមិនអាចបញ្ជូនវាទៅប្រភពផ្សេងបានទេ។ បរិបទពីចម្ងាយប្រើថូខឹនចូលប្រើ
   ដែលមានវិសាលភាពកំណត់ជំនួសវិញ។ ប្រសិនបើមិនអាចបង្កើតថូខឹនបាន CLI នឹងមិនដាក់បឋមកថានេះទេ
   ហើយ `omniroute doctor` នឹងរាយការណ៍អំពីការបរាជ័យ ជំនួសឱ្យការចាត់ទុកថូខឹនទទេ
   ថាមានសុពលភាព។
4. ម៉ាស៊ីនបម្រើ (`src/server/authz/policies/management.ts`) គណនាថូខឹនដែលរំពឹងទុកឡើងវិញ
   ដោយប្រើ salt ដូចគ្នា ហើយប្រៀបធៀបតាមរយៈ `timingSafeEqual` ដើម្បី
   ទប់ស្កាត់ការទាញយកផ្អែកលើពេលវេលា។

## លក្ខណៈសុវត្ថិភាព

| លក្ខណៈសម្បត្តិ                     | សេចក្តីលម្អិត                                                                                                                                                                                                                       |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **សម្រាប់តែ loopback**             | ត្រូវបានទទួលយកតែនៅពេលសញ្ញាសម្គាល់ទីតាំងមូលដ្ឋានរបស់ peer ដែលម៉ាស៊ីនបម្រើទុកចិត្ត (បានមកពីអាសយដ្ឋាន TCP peer ពិតប្រាកដ) បញ្ជាក់ថាជា loopback។ បឋមកថា `Host` ដែលគ្រប់គ្រងដោយ client មិនត្រូវបានទុកចិត្តសម្រាប់កំណត់ទីតាំងមូលដ្ឋានឡើយ។ |
| **ការប្រៀបធៀបក្នុងពេលវេលាថេរ**     | `crypto.timingSafeEqual` ទប់ស្កាត់ការវាយប្រហារតាមពេលវេលា។                                                                                                                                                                           |
| **មិនអាចបញ្ច្រាសបាន**              | លទ្ធផល HMAC មិនអាចប្រើដើម្បីទាញយក machine-id មកវិញបានទេ។                                                                                                                                                                            |
| **គ្មានការរំលងការការពារ `always`** | `isAlwaysProtectedPath()` ត្រូវបានវាយតម្លៃមុនពេលពិនិត្យថូខឹន CLI។ `/api/shutdown` និង `/api/settings/database` តែងតែតម្រូវឱ្យមាន JWT។                                                                                               |
| **មិនអាចនាំចេញបាន**                | ថូខឹនមិនដែលត្រូវបានសរសេរទៅឌីស ឬកត់ត្រាក្នុង log ទេ។                                                                                                                                                                                 |

## salt លំនាំដើម (ចៃដន្យសម្រាប់ការដំឡើងនីមួយៗ)

នៅពេលមិនបានកំណត់ `OMNIROUTE_CLI_SALT` salt គឺជាខ្សែអក្សរ hex ចៃដន្យដែលមាន 64 តួអក្សរ
បង្កើតតែម្តង ហើយរក្សាទុកជាអចិន្ត្រៃយ៍នៅ `<DATA_DIR>/cli-token-salt.json` (ម៉ូដ `0600`) —
មិនមែនតម្លៃថេរ `omniroute-cli-auth-v1` ដែលបានបញ្ចូលក្នុងកូដនោះទេ។ ទាំង `getActiveSalt()` ក្នុង
`src/lib/machineToken.ts` និងកូដឆ្លុះរបស់វាក្នុង `bin/cli/utils/cliToken.mjs` អានពី
ឯកសារដូចគ្នា ដូច្នេះម៉ាស៊ីនបម្រើ និងរាល់ការហៅ CLI ក្នុងការដំឡើងនេះនឹងប្រើ
តម្លៃដូចគ្នា។ តម្លៃថេរដែលបានបញ្ចូលក្នុងកូដត្រូវបានប្រើតែជាជម្រើសចុងក្រោយប៉ុណ្ណោះ នៅពេលមិនទាន់អាច
បង្កើត salt ដែលបានរក្សាទុក ឬមកពី env បាន (ឧទាហរណ៍ ការដំឡើងថ្មីដែលមានតែ CLI
មុនពេលម៉ាស៊ីនបម្រើធ្លាប់បានដំណើរការ)។ វាបិទចំណុចខ្សោយនៃតម្លៃថេរលំនាំដើមចាស់៖
`/etc/machine-id` ជាទូទៅអាចអានបានដោយអ្នកប្រើគ្រប់រូប ដូច្នេះបើមិនដូច្នោះទេ អ្នកប្រើមូលដ្ឋានណាម្នាក់ក៏អាច
បង្កើតថូខឹនដូចគ្នាសម្រាប់រាល់ការដំឡើងដែលមិនធ្លាប់កំណត់
`OMNIROUTE_CLI_SALT` បានដែរ។

## ការប្តូរ Salt

កំណត់ `OMNIROUTE_CLI_SALT` ដើម្បីប្តូរ token ដែលបានបង្កើត ដោយមិនចាំបាច់ផ្លាស់ប្តូរកូដ — វាតែងតែមានអាទិភាពលើ salt សម្រាប់ការដំឡើងនីមួយៗដែលបានរក្សាទុក។ បន្ទាប់ពីការប្តូរ ដំណើរការ CLI ទាំងអស់នៅលើម៉ាស៊ីននេះនឹងប្រើ token ថ្មីដោយស្វ័យប្រវត្តិ។ វាមានប្រយោជន៍បន្ទាប់ពីមានការលេចធ្លាយបញ្ជីដំណើរការ ដែលអាចបានបង្ហាញតម្លៃដែលបានបង្កើតពីមុន។

```bash
# ការប្តូរជាអចិន្ត្រៃយ៍ (បន្ថែមទៅក្នុង shell profile)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# ផ្ទៀងផ្ទាត់ថា token ថ្មីកំពុងត្រូវបានប្រើ
omniroute status
```

## ទម្រង់ចាស់ (SHA-256, 32 តួអក្សរ) — នៅតែត្រូវបានទទួលយក

មុនពេលមានទម្រង់ HMAC ខាងលើ CLI បានបង្កើត token របស់វាជា
`SHA-256(machineId + salt).hex[0..32]` (បុព្វបទ 32 តួអក្សរ) នៅក្នុង
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` នៅក្នុង `src/lib/machineToken.ts`)។

ដើម្បីរក្សាភាពឆបគ្នាជាមួយកំណែមុន ម៉ាស៊ីនមេទទួលយកទម្រង់ **ទាំងពីរ**៖ កម្មវិធីផ្ទៀងផ្ទាត់បង្កើត
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ហើយប្រៀបធៀប
header ដែលបានទទួលជាមួយនឹងទម្រង់នីមួយៗដោយប្រើ `timingSafeEqual`
(`src/server/authz/policies/management.ts` និង `src/lib/middleware/cliTokenAuth.ts`)។
ដូច្នេះ token មួយមានសុពលភាព ប្រសិនបើវាត្រូវគ្នាជាមួយ **ទម្រង់ណាមួយ** រវាង HMAC digest ប្រវែង 64 តួអក្សរ ឬបុព្វបទ SHA-256 ចាស់ប្រវែង 32 តួអក្សរ។

**ការមិនចូលរួម៖** កំណត់ `OMNIROUTE_DISABLE_CLI_TOKEN=true` (ក្នុង env ឬ `.env`) ដើម្បីបិទយន្តការ CLI token ទាំងស្រុង។ បន្ទាប់មក រាល់ការចូលប្រើទាំងអស់តម្រូវឱ្យមាន API key ដែលបានបញ្ជាក់យ៉ាងច្បាស់។ សម្រាប់ម៉ាស៊ីនដែលមានអ្នកប្រើប្រាស់ច្រើន ការកំណត់នេះត្រូវបានណែនាំ ពីព្រោះ `machine-id` គឺសម្រាប់ឧបករណ៍នីមួយៗ (មិនមែនសម្រាប់អ្នកប្រើប្រាស់នីមួយៗទេ) ហើយអ្នកប្រើប្រាស់ផ្សេងទៀតនៅលើម៉ាស៊ីនដូចគ្នាអាចគណនា token ដូចគ្នាបាន។

## ឯកសារ

| ឯកសារ                                     | គោលបំណង                                          |
| ----------------------------------------- | ------------------------------------------------ |
| `src/lib/machineToken.ts`                 | ការបង្កើត token (`getMachineTokenSync`)          |
| `bin/cli/utils/cliToken.mjs`              | ការឆ្លុះបញ្ចាំងការបង្កើតដូចគ្នានៅខាង CLI         |
| `<DATA_DIR>/cli-token-salt.json`          | salt ចៃដន្យសម្រាប់ការដំឡើងនីមួយៗដែលបានរក្សាទុក   |
| `src/server/authz/headers.ts`             | ថេរ `CLI_TOKEN_HEADER`                           |
| `src/server/authz/policies/management.ts` | ការផ្ទៀងផ្ទាត់នៅខាងម៉ាស៊ីនមេ                     |
| `src/server/authz/routeGuard.ts`          | ការត្រួតពិនិត្យ loopback host (`isLoopbackHost`) |

## សូមមើលផងដែរ

- `docs/security/ROUTE_GUARD_TIERS.md` — កម្រិតនៃការការពារ route
- `docs/architecture/AUTHZ_GUIDE.md` — ខ្សែដំណើរការផ្តល់សិទ្ធិពេញលេញ
