# Management Authentication (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute មាន **គ្រួសារព័ត៌មានសម្គាល់អត្តសញ្ញាណចំនួនបួន** ដែលអាចផ្តល់សិទ្ធិចូលប្រើ management routes។
ពួកវាមិនអាចប្រើជំនួសគ្នាបានទេ។ Inference API keys (`sk-…`) **មិន** អាចគ្រប់គ្រង
server បានទេ លុះត្រាតែពួកវាត្រូវបានផ្តល់ `manage` ឬ `admin` scope យ៉ាងច្បាស់លាស់។

ការអនុវត្តគោល៖ `src/lib/api/requireManagementAuth.ts`។

| ព័ត៌មានសម្គាល់អត្តសញ្ញាណ | ទម្រង់ធម្មតា                         | បង្កើតនៅកន្លែងណា                                   | គោលបំណងប្រើប្រាស់               | សមត្ថភាពគ្រប់គ្រង                                                                                |
| ------------------------ | ------------------------------------ | -------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Dashboard JWT session    | `auth_token` cookie                  | ការចូល Dashboard                                   | UI ក្នុង browser                | ការគ្រប់គ្រង Dashboard ពេញលេញ ដោយស្ថិតក្រោមច្បាប់ CSRF ទីតាំង និង route ដែលត្រូវបានការពារជានិច្ច |
| CLI machine-id token     | ខាងក្នុង / មូលដ្ឋាន                  | ការចាប់ផ្តើម CLI (`omniroute` នៅលើម៉ាស៊ីនតែមួយ)    | CLI មូលដ្ឋាន                    | ការគ្រប់គ្រងមូលដ្ឋានប៉ុណ្ណោះ                                                                     |
| Scoped Access Token      | `oma_live_…`                         | **Settings → Access Tokens** ឬ `omniroute connect` | CLI ពីចម្ងាយ និង management API | ត្រូវតែបំពេញ `read`, `write`, ឬ `admin` scope ដែល route ទាមទារ                                   |
| Inference API key        | `sk-…` (និងបុព្វបទ API key ផ្សេងទៀត) | **API Manager / API Keys**                         | `/v1/*` inference               | **គ្មាន** លុះត្រាតែ metadata របស់ key រួមបញ្ចូល `manage` ឬ `admin`                               |

ព័ត៌មានសម្គាល់អត្តសញ្ញាណ `oma_` គឺជាព័ត៌មានសម្គាល់អត្តសញ្ញាណសម្រាប់ management/CLI។ ពួកវា **មិនមែន** ជា inference API keys ទេ។

ប្រសិនបើការផ្ទៀងផ្ទាត់តាម login/API-key ត្រូវបានបិទសម្រាប់ server នោះ management routes មួយចំនួនអាច
ទទួលយកការហៅដែលមិនបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណ។ Route ដែលអនុញ្ញាតតែក្នុងមូលដ្ឋាន និង route ដែលត្រូវបានការពារជានិច្ច នៅតែអនុវត្ត
ច្បាប់ផ្ទាល់ខ្លួនរបស់វា។ ដូច្នេះ ការបង្ហាញព័ត៌មានសម្គាល់អត្តសញ្ញាណមួយក្នុងចំណោមទាំងនេះ មិនមែនជាកាតព្វកិច្ច
ជាសកលទេ ហើយការមានព័ត៌មានសម្គាល់អត្តសញ្ញាណមួយក៏មិនមែនតែងតែគ្រប់គ្រាន់ដែរ បើគ្មាន
scope និងទីតាំង route ដែលត្រូវការ។

ពាក់ព័ន្ធ៖ [របៀបពីចម្ងាយ](./REMOTE-MODE.md) (របៀបដែល `oma_live_…` ត្រូវបានបង្កើតសម្រាប់ CLI ពីចម្ងាយ)។

---

## ម៉ាទ្រីស scope

វាក្យសព្ទ scope ទាំងពីរនេះគឺ **ខុសគ្នា**។ កុំលាយបញ្ចូលគ្នា។

### Access Token scopes (`oma_live_…`)

| Scope   | ប្រតិបត្តិការធម្មតា                                                                      |
| ------- | ---------------------------------------------------------------------------------------- |
| `read`  | ការបង្ហាញបញ្ជី/ស្ថានភាពតាម GET ដែល token ត្រូវបានអនុញ្ញាតឱ្យមើល                          |
| `write` | ការកែប្រែ (បង្កើត/ធ្វើបច្ចុប្បន្នភាព/លុប) ដែលទាបជាង admin                                |
| `admin` | CLI ពីចម្ងាយ / connect token ពេញលេញ (ការចាប់ផ្តើមដោយ password ប្រើ scope នេះតាមលំនាំដើម) |

Token ដែលមាន `read` មិនអាចហៅ `write` route បានទេ។ ទម្រង់សារនៅពេលដំណើរការ៖
`Access token scope '<have>' is insufficient; '<need>' required.`

### Scope សម្រាប់ការគ្រប់គ្រង API-key

| Scope    | អត្ថន័យ                                                                                     |
| -------- | ------------------------------------------------------------------------------------------- |
| (គ្មាន)  | សម្រាប់ inference ប៉ុណ្ណោះ។ Management routes ត្រឡប់ 403។                                   |
| `manage` | Management API (ប្រើច្រកត្រួតពិនិត្យដូចគ្នានឹង API-key branch របស់ `requireManagementAuth`) |
| `admin`  | ក៏បំពេញ `hasManageScope` ផងដែរ (ត្រូវបានចាត់ទុកថាមានសមត្ថភាពគ្រប់គ្រង)                      |

បើក `manage` លើ key នៅក្នុង UI របស់ API Keys / API Manager។ កុំប្រើ
chat client key ឡើងវិញសម្រាប់ស្វ័យប្រវត្តិកម្ម លុះត្រាតែអ្នកបានផ្តល់ scope នោះដោយចេតនា។

---

## របៀបបង្កើត និងដកហូត

### Dashboard JWT session

1. បើក `/login` ហើយចូលដោយប្រើ management password (`INITIAL_PASSWORD` នៅពេលចាប់ផ្តើមលើកដំបូង)។
2. Cookie `auth_token` គឺជា HttpOnly។ Browser dashboard ប្រើវាដោយស្វ័យប្រវត្តិ។
3. ចាកចេញតាម `/api/auth/logout`។ មិនមាន secret ដែលមានអាយុកាលវែងសម្រាប់ចម្លងទេ។

### CLI machine-id token

1. ដំណើរការ `omniroute` នៅលើ **host ដូចគ្នា** នឹង server (loopback)។
2. CLI ចាប់ផ្តើម machine-id token ក្រោម `~/.omniroute/` (chmod 600)។
3. វា **មិន** ដំណើរការពីម៉ាស៊ីនផ្សេងទេ។ ប្រើ Access Token សម្រាប់ CLI ពីចម្ងាយ។

### Scoped Access Token (`oma_live_…`)

1. Dashboard៖ **Settings → Access Tokens** → បង្កើត (ឈ្មោះ + scope)។ **Secret ត្រូវបានបង្ហាញតែម្តងប៉ុណ្ណោះ។**
2. ឬ CLI៖ `omniroute connect <host>` (password → token)។ សូមមើល [របៀបពីចម្ងាយ](./REMOTE-MODE.md)។
3. Header៖ `Authorization: Bearer oma_live_…`
4. ដកហូតពីទំព័រ Access Tokens ដដែល (ឬលុប CLI context)។
5. Server រក្សាទុកតែ hash ប៉ុណ្ណោះ។ ចាត់ទុក plaintext ដូចជា password។

### API key ដែលមាន manage scope

1. Dashboard៖ **API Manager / API Keys** → បង្កើត ឬកែសម្រួល key → បើក `manage` (ឬ `admin`)។
2. Header៖ `Authorization: Bearer sk-…` (បុព្វបទពិតប្រាកដរបស់ key)។
3. ដកហូត ឬដក `manage` ចេញនៅក្នុង UI ដដែល។
4. សិទ្ធិអប្បបរមាសម្រាប់ស្វ័យប្រវត្តិកម្មដែលមិនមែនជា CLI៖ គួរប្រើ `read` Access Token សម្រាប់ការងារដែលប្រើតែ GET; ប្រើ `manage` លើ API key តែនៅពេលអ្នកហៅត្រូវតែអាចទាក់ទងជាមួយទាំង `/v1` និង management។

---

## ទម្រង់ Header

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

កុំដាក់ព័ត៌មានសម្ងាត់សម្រាប់ការគ្រប់គ្រងនៅក្នុង path របស់ URL ឬ query string។ ការផ្ទៀងផ្ទាត់សម្រាប់ការគ្រប់គ្រង
ត្រូវប្រើតែ header/cookie ប៉ុណ្ណោះ។

---

## ឧទាហរណ៍ដែលអាចចម្លង និងបិទភ្ជាប់បាន

បានតែអាន (រាយបញ្ជី providers)។ ប្រើ Access Token ដែលមាន scope `read`៖

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ការកែប្រែ (បង្កើតការតភ្ជាប់ provider)។ ប្រើ Access Token ដែលមាន scope `write`/`admin` ឬ
API key ដែលមាន scope `manage`៖

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (មិនមែនការគ្រប់គ្រង)។ API key ធម្មតា មិនតម្រូវឱ្យមាន `manage`៖

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## កំហុស runtime បច្ចុប្បន្ន (កុំបង្ហាញព័ត៌មានសម្ងាត់ឡើងវិញ)

| ស្ថានភាព                                                  | ស្ថានភាពទូទៅ | សារ (បានសម្អាតព័ត៌មានរសើប)                                           |
| --------------------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| គ្មានព័ត៌មានសម្គាល់អត្តសញ្ញាណ                             | 401          | `Authentication required`                                            |
| `oma_live_…` មិនត្រឹមត្រូវ/ផុតកំណត់                       | 401          | `Invalid or expired access token`                                    |
| API key ត្រឹមត្រូវ ប៉ុន្តែគ្មាន `manage`/`admin`          | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| API key ធម្មតាមិនត្រឹមត្រូវនៅលើ route សម្រាប់ការគ្រប់គ្រង | 403          | `Invalid management token`                                           |
| Scope របស់ Access Token ទាបពេក                            | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" មានន័យថា bearer នោះ **មិនត្រូវបាន** ទទួលយកជាព័ត៌មានសម្គាល់អត្តសញ្ញាណ
សម្រាប់ការគ្រប់គ្រងទេ។ វា **មិន** ប្រាប់អ្នកថាត្រូវបង្កើតប្រភេទណាមួយទេ។ ប្រើតារាងខាងលើ៖
inference keys ត្រូវការ scope `manage`; CLI ពីចម្ងាយត្រូវការ `oma_live_…`; dashboard
ប្រើ session cookie។

---

## ជម្រើសសិទ្ធិអប្បបរមាដែលបានណែនាំ

| អ្នកហៅ                                          | ប្រើ                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| Browser                                         | Session របស់ dashboard                                              |
| CLI នៅលើ server host                            | Machine token                                                       |
| CLI នៅលើ laptop ដែលទាក់ទងទៅកាន់ server ពីចម្ងាយ | `oma_live_…` ពី `omniroute connect`                                 |
| CI / scripts (សម្រាប់តែការគ្រប់គ្រង)            | `oma_live_…` ជាមួយ scope តូចបំផុតដែលអាចដំណើរការបាន                  |
| CI ដែលត្រូវហៅទាំង `/v1` និង `/api`              | API key ដែលមាន `manage` **ឬ** ព័ត៌មានសម្គាល់អត្តសញ្ញាណពីរដាច់ដោយឡែក |
