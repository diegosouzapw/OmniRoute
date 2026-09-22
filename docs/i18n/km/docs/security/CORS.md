# CORS Configuration & Security (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute គ្រប់គ្រងថា **ប្រភពដើមរបស់កម្មវិធីរុករក** ណាខ្លះអាចអានការឆ្លើយតបឆ្លងប្រភពដើម
ពីបញ្ជីអនុញ្ញាតកណ្ដាលតែមួយ។ ម៉ូដែលនេះមានលក្ខណៈ **បិទជាមុនតាមលំនាំដើម**៖
គ្មានប្រភពដើមណាមួយត្រូវបានអនុញ្ញាតឡើយ រហូតដល់អ្នកជ្រើសអនុញ្ញាតវា។ ទំព័រនេះពន្យល់ពីរបៀបដែលបញ្ជីអនុញ្ញាត
ត្រូវបានដោះស្រាយ ថាតើ `CORS_ALLOW_ALL=true` ពិតជាបើកឱ្យចូលប្រើអ្វីខ្លះ (ហើយអ្វីដែលសំខាន់គឺ វា
**មិន**បើកឱ្យចូលប្រើអ្វីខ្លះ) របៀបកំណត់រចនាសម្ព័ន្ធបរិស្ថានអភិវឌ្ឍន៍ធៀបនឹងផលិតកម្មដោយសុវត្ថិភាព និងការព្រមាននៅពេលដំណើរការ
ដែលផ្ទាំងគ្រប់គ្រងបង្ហាញនៅពេលអក្សរជំនួសកំពុងប្រើប្រាស់។

**ប្រភពយោងផ្លូវការ៖** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)។ បញ្ជីអនុញ្ញាតត្រូវបានអនុវត្តតែម្តងនៅក្នុង
middleware (`src/server/authz/pipeline.ts`) — កម្មវិធីគ្រប់គ្រងតាម route នីមួយៗមិនកំណត់
`Access-Control-Allow-Origin` ដោយខ្លួនឯងទេ។

## របៀបដោះស្រាយប្រភពដើម

សម្រាប់សំណើនីមួយៗ middleware គណនាតម្លៃ `Access-Control-Allow-Origin`
តាមលំដាប់នេះ៖

1. **`CORS_ALLOW_ALL=true`** (ឬ `CORS_ORIGIN=*` ចាស់) → ឆ្លុះបញ្ចាំង
   `Origin` របស់អ្នកហៅត្រឡប់ទៅវិញ (ឬ `*` នៅពេលគ្មានបឋមកថា `Origin`) ជាមួយ `Vary: Origin`
   ដើម្បីឱ្យឃ្លាំងសម្ងាត់នៅតែដំណើរការត្រឹមត្រូវ។ ចំណុចគ្រប់គ្រងតែមួយ `applyCorsHeaders()` ដដែលក៏បន្ថែម
   `Vary: Accept-Encoding` ទៅក្នុងរាល់ការឆ្លើយតប 2xx ដែលមានខ្លឹមសារ នៅលើផ្ទៃប្រើប្រាស់ដែលផ្ទៀងផ្ទាត់ដោយ token
   `/v1*`/`/v1beta*` (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737) ដូច្នេះ
   ឃ្លាំងសម្ងាត់នៅខ្សែបន្ត/ដែលប្រើរួមគ្នាអាចបែងចែកវ៉ារ្យ៉ង់ដែលបានបង្ហាប់ និងមិនបានបង្ហាប់បានត្រឹមត្រូវ។
2. បើមិនដូច្នោះទេ `Origin` របស់សំណើត្រូវបានធ្វើឱ្យមានទម្រង់ស្តង់ដារ (បម្លែងជាអក្សរតូច និងដកសញ្ញា `/`
   នៅចុងចេញ) ហើយផ្គូផ្គងជាមួយ **បញ្ជីអនុញ្ញាតដែលបានបញ្ចូលគ្នា**៖
   - env **`CORS_ALLOWED_ORIGINS`** — បញ្ជីបំបែកដោយសញ្ញាក្បៀស និង
   - ការកំណត់ពេលដំណើរការ **`corsOrigins`** (ផ្ទាំងគ្រប់គ្រង → សុវត្ថិភាព → _ប្រភពដើមដែល CORS
     អនុញ្ញាត_) ដែលបញ្ចូលតាមរយៈ `setRuntimeAllowedOrigins()` ពី
     `src/lib/config/runtimeSettings.ts`។
3. គ្មានការផ្គូផ្គង → **មិនមានការបញ្ចេញបឋមកថា `Access-Control-Allow-Origin` ទេ**។ កម្មវិធីរុករក
   រារាំងការអានឆ្លងប្រភពដើម។ នេះជាឥរិយាបថបិទជាមុនតាមលំនាំដើមដែលបានកំណត់ទុក។

| អថេរ Env               | អត្ថន័យ                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV នៃប្រភពដើមជាក់លាក់ដែលត្រូវអនុញ្ញាត (បានណែនាំ)។                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → ឆ្លុះបញ្ចាំងប្រភពដើមណាមួយត្រឡប់ទៅវិញ (អក្សរជំនួស)។ សម្រាប់ការអភិវឌ្ឍប៉ុណ្ណោះ។ |
| `CORS_ORIGIN`          | កំណែចាស់។ `*` មានឥរិយាបថដូច `CORS_ALLOW_ALL`; តម្លៃតែមួយត្រូវបានបន្ថែមទៅបញ្ជីអនុញ្ញាត។     |

## ម៉ូដែលការគំរាមកំហែង — អ្វីដែល `CORS_ALLOW_ALL=true` ពិតជាបើកឱ្យចូលប្រើ

ការព្រមានទូទៅរបស់ OWASP ("CORS ដែលប្រើអក្សរជំនួស = គេហទំព័រណាមួយក៏អាចហៅ API របស់អ្នកបាន") គួរត្រូវបាន
យកចិត្តទុកដាក់យ៉ាងម៉ឺងម៉ាត់ ប៉ុន្តែការបើកចំហរបស់ OmniRoute មានវិសាលភាព **តូចជាងករណីទូទៅ**
ដោយសារតែការពិតជាក់លាក់មួយនៃការអនុវត្ត៖

> **`applyCorsHeaders()` កណ្ដាលមិនដែលបញ្ចេញ
> `Access-Control-Allow-Credentials` ទេ។** កម្មវិធីរុករកនឹងមិនបើកឱ្យឃើញការឆ្លើយតបឆ្លងប្រភពដើមដែល _មានព័ត៌មានសម្គាល់អត្តសញ្ញាណ_
> (ដែលមាន cookie) ឡើយ លុះត្រាតែម៉ាស៊ីនមេផ្ញើ
> `Access-Control-Allow-Credentials: true`។ ផ្លូវ CORS រួមរបស់ OmniRoute មិនដែល
> ធ្វើដូច្នោះទេ។

អត្ថន័យរបស់វាសម្រាប់ផ្ទៃប្រើប្រាស់នីមួយៗ ទោះបីជាប្រើ `CORS_ALLOW_ALL=true` ក៏ដោយ៖

| ផ្ទៃប្រើប្រាស់                        | យន្តការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ | ឥទ្ធិពលនៃ CORS ដែលប្រើអក្សរជំនួស                                                                                                                                                                                                                                                                     |
| ------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ផ្ទាំងគ្រប់គ្រង / MANAGEMENT `/api/*` | Session តាម cookie           | ប្រភពដើមត្រូវបានឆ្លុះបញ្ចាំងត្រឡប់ ប៉ុន្តែ **បើគ្មាន `Allow-Credentials`** កម្មវិធីរុករកនឹង **រារាំង** ការអានដែលមានព័ត៌មានសម្គាល់អត្តសញ្ញាណ។ គេហទំព័រឆ្លងប្រភពដើមដែលមានគំនិតអាក្រក់ **មិនអាចអាន** ការឆ្លើយតបផ្ទាំងគ្រប់គ្រងដែលបានផ្ទៀងផ្ទាត់របស់អ្នកទេ ហើយ session cookie ក៏មិនត្រូវបានបើកបង្ហាញដែរ។ |
| Client API `/v1/*`, `/v1beta/*`       | បឋមកថា Bearer / `x-api-key`  | មានការអនុញ្ញាតទូលំទូលាយ **តាមការរចនារួចហើយ** (`relaxForTokenAuth`)៖ កម្មវិធីរុករកមិនដែលភ្ជាប់ `Authorization`/`x-api-key` ដោយស្វ័យប្រវត្តិទេ ដូច្នេះទំព័ររបស់អ្នកវាយប្រហារមិនអាចផ្ដល់ key របស់អ្នកបានទេ។ `CORS_ALLOW_ALL` មិនពង្រីកវិសាលភាពនេះទេ។                                                    |
| សាធារណៈបានតែអាន (`/api/health`, …)    | គ្មាន                        | មិនមែនជាទិន្នន័យរសើប ដូច្នេះអក្សរជំនួសមិនបង្កគ្រោះថ្នាក់ទេ។                                                                                                                                                                                                                                          |

ដូច្នេះ ការបើកចំហ **នៅសេសសល់** របស់ `CORS_ALLOW_ALL=true` ត្រូវបានកំណត់ត្រឹម៖ (a)
ការអានឆ្លងប្រភពដើមដែល **គ្មានព័ត៌មានសម្គាល់អត្តសញ្ញាណ** លើទិន្នន័យដែលមិនទាមទារការផ្ទៀងផ្ទាត់អត្តសញ្ញាណស្រាប់ និង (b)
ការអនុញ្ញាតឱ្យ CORS **preflight ឆ្លងកាត់** នៅលើ route គ្រប់គ្រង — ដែលនៅតែទាមទារការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ
ដែលទំព័រឆ្លងប្រភពដើមមិនអាចផ្ដល់បាន។ វា **មិនមែន** ជាវ៉ិចទ័រប្លន់ session ឬ
លួចព័ត៌មានសម្គាល់អត្តសញ្ញាណនៅលើផ្លូវ CORS រួមនោះទេ។

### ករណីលើកលែងពិតប្រាកដមួយ — `/api/v1/agents/`

Cloud-Agent routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) កំណត់
បឋមកថា CORS **ផ្ទាល់ខ្លួន**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ហើយ**ពិតជាបញ្ចេញ**
`Access-Control-Allow-Origin: <origin>|*` រួមជាមួយ
`Access-Control-Allow-Credentials: true`។ នេះជាផ្ទៃប្រើប្រាស់តែមួយគត់ដែល
ការឆ្លុះបញ្ចាំងប្រភពដើម និងព័ត៌មានសម្គាល់អត្តសញ្ញាណមានរួមគ្នា ហើយវា **ឯករាជ្យពី
`CORS_ALLOW_ALL`**។ Route ទាំងនេះត្រូវបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណសម្រាប់ការគ្រប់គ្រង
(`requireManagementAuth`)។ ប្រតិបត្តិករដែលបើកផ្ទាំងគ្រប់គ្រងឱ្យចូលប្រើពីក្រៅ host គួរតែ
ដឹងថា នេះជាកន្លែងតែមួយគត់ដែលបឋមកថាការឆ្លើយតបអនុញ្ញាតឱ្យអានឆ្លងប្រភពដើមដោយមានព័ត៌មានសម្គាល់អត្តសញ្ញាណ។
ការរឹតបន្តឹងវាឱ្យប្រើបញ្ជីអនុញ្ញាតជាក់លាក់ ត្រូវបានតាមដាន
ដាច់ដោយឡែកពីគោលការណ៍ណែនាំ CORS នេះ។

## បញ្ជីត្រួតពិនិត្យសម្រាប់បរិស្ថានផលិតកម្ម

- **កុំកំណត់ `CORS_ALLOW_ALL=true` ក្នុងបរិស្ថានផលិតកម្មជាដាច់ខាត។** ទុកវាដោយមិនកំណត់។
- កំណត់បញ្ជីប្រភពដើមឱ្យបាន **ជាក់លាក់** — តាមរយៈ env var ឬវាលក្នុងផ្ទាំង Security៖

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- ប្រសិនបើ OmniRoute ដំណើរការនៅពីក្រោយ reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) នោះ CORS **មិនមែន** ជាការគ្រប់គ្រងតែមួយគត់របស់អ្នកទេ — ឧបករណ៍ការពារ route
  សម្រាប់ loopback នៅតែការពារ route ដែលអាច spawn បាន (សូមមើល
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md))។ កុំក្លែង
  `X-Forwarded-For: 127.0.0.1` ដើម្បី "ដោះស្រាយ" កំហុស 403 ព្រោះវានឹងបើកឱ្យមានហានិភ័យប្រភេទ RCE
  ដែលឧបករណ៍ការពារ route បានបិទឡើងវិញ។
- ផ្ទៀងផ្ទាត់ស្ថានភាព runtime៖ dashboard បង្ហាញ **បដាព្រមានពណ៌លឿងទុំជាប់ជានិច្ច**
  នៅក្រោម Dashboard → Security → Authorization Inventory នៅពេល
  `CORS_ALLOW_ALL=true` កំពុងមានប្រសិទ្ធភាព ហើយ `/api/settings/authz-inventory` ត្រឡប់
  envelope `cors: { allowAll, allowedOrigins }` ដែលឧបករណ៍ត្រួតពិនិត្យអាច poll បាន។

## ភាពងាយស្រួលក្នុងការអភិវឌ្ឍ — អនុញ្ញាតតែប្រភពដើមមូលដ្ឋានជាក់លាក់

អ្នកស្ទើរតែមិនត្រូវការ wildcard ទេ សូម្បីតែក្នុង dev។ អនុញ្ញាតតែ dev server ដែលអ្នកប្រើ៖

```bash
# Dev server របស់ Vite (5173) + Next.js (3000) ដែលហៅទៅកាន់ OmniRoute មូលដ្ឋាន
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ប្រភពដើមត្រូវបានផ្គូផ្គងដោយមិនប្រកាន់អក្សរធំតូច ហើយមិនគិតសញ្ញា slash នៅខាងចុង ដូច្នេះ
`http://localhost:3000` និង `http://localhost:3000/` គឺសមមូលគ្នា។ CSV ដូចគ្នានេះ
អាចកំណត់នៅពេល runtime ក្នុង **Dashboard → Security → CORS Allowed Origins** ដោយមិនចាំបាច់
ចាប់ផ្ដើមឡើងវិញ។

## API key ធៀបនឹង cookie session

- **Bearer / `x-api-key` (ផ្ទៃ inference `/v1/*`)៖** browser មិនដែលភ្ជាប់
  ទាំងនេះដោយស្វ័យប្រវត្តិទេ។ CORS មិនមែនជារបាំងដ៏មានអត្ថន័យនៅទីនេះទេ — API key គឺជា
  របាំង — ហើយនេះជាមូលហេតុដែលផ្ទៃនោះត្រូវបានកំណត់ដោយចេតនាឱ្យមានភាពអនុញ្ញាតខ្ពស់ ដើម្បីឱ្យ browser និង
  client របស់ Electron អាចអាន response ដែលពួកវាមានសិទ្ធិទទួលរួចហើយ។
- **Cookie session (dashboard)៖** ត្រូវបានការពារដោយតម្លៃលំនាំដើមបែប fail-closed **និង**
  ដោយអវត្តមាននៃ `Access-Control-Allow-Credentials` នៅលើ path រួម។ កុំដាក់
  ប្រភពដើមសម្រាប់ការគ្រប់គ្រង/dashboard ក្នុង config ដែលមានភាពអនុញ្ញាតខ្ពស់ណាមួយឡើយ ពួកវាត្រូវតែរក្សាស្ថានភាព
  fail-closed ឱ្យបានពេញលេញ។

## ឧទាហរណ៍៖ reverse proxy នៅខាងមុខ OmniRoute

CORS ត្រូវបានអនុវត្តដោយ OmniRoute ផ្ទាល់ ដូច្នេះជាទូទៅ proxy **មិនគួរ** បន្ថែម ឬ
សរសេរ header `Access-Control-*` ឡើងវិញទេ (header ស្ទួនធ្វើឱ្យ browser មិនដំណើរការ)។ បញ្ចប់ TLS
ហើយ forward — ទុកឱ្យ OmniRoute ឆ្លើយតបនឹង preflight៖

```nginx
# nginx — forward ទៅ OmniRoute; កុំ inject Access-Control-* នៅទីនេះ
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # កុំកំណត់ X-Forwarded-For ទៅជា 127.0.0.1 — វាធ្វើឱ្យឧបករណ៍ការពារ route សម្រាប់ loopback បាត់ប្រសិទ្ធភាព។
}
```

កំណត់ប្រភពដើមរបស់ browser ដែលត្រូវបានអនុញ្ញាតក្នុង OmniRoute (`CORS_ALLOWED_ORIGINS` ឬផ្ទាំង
Security) មិនមែនក្នុង proxy ទេ។

## ឯកសារប្រភព

| ចំណុចពាក់ព័ន្ធ                                          | ឯកសារ                                                                |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| ការដោះស្រាយ allowlist + `getCorsStatus()`               | `src/server/cors/origins.ts`                                         |
| ការអនុវត្ត middleware (ប្រភពពិតតែមួយ)                   | `src/server/authz/pipeline.ts`                                       |
| Settings → ការបញ្ចូលប្រភពដើមនៅពេល runtime               | `src/lib/config/runtimeSettings.ts`                                  |
| ស្ថានភាព runtime សម្រាប់ dashboard                      | `src/app/api/settings/authz-inventory/route.ts`                      |
| បដាព្រមានក្នុង dashboard                                | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| វាល CORS Allowed Origins                                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS របស់ Cloud-Agent សម្រាប់ route នីមួយៗ (ករណីលើកលែង) | `src/lib/cloudAgent/api.ts`                                          |

## សូមមើលផងដែរ

- [កម្រិតនៃការការពារ Route](./ROUTE_GUARD_TIERS.md) — ការអនុវត្តជាកំហិតនូវ loopback សម្រាប់
  route ដែលអាច spawn បាន (ជាវិធានការគ្រប់គ្រងដាច់ដោយឡែក និងបំពេញបន្ថែមគ្នា)។
- [មគ្គុទ្ទេសក៍ស្តីពីការផ្តល់សិទ្ធិ](../architecture/AUTHZ_GUIDE.md) — pipeline នៃការផ្ទៀងផ្ទាត់អត្តសញ្ញាណទាំងមូល។
