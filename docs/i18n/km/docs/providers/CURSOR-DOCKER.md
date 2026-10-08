# Cursor Provider in Docker Environments (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

នៅពេល OmniRoute ដំណើរការនៅក្នុង Docker លំហូរចាស់ **Import from Cursor IDE** /
`cursor-agent` នឹងបរាជ័យ ព្រោះ container មិនអាចមើលឃើញការដំឡើង Cursor នៅលើ host បានទេ។
សូមប្រើ **Login with Cursor** (deep-control PKCE) ជំនួសវិញ។

## ហេតុអ្វីបានជាការនាំចូលពី IDE / CLI បរាជ័យនៅក្នុង Docker

1. **ការបំបែកប្រព័ន្ធឯកសារ** — ការនាំចូលដោយស្វ័យប្រវត្តិស្វែងរកទីតាំង Linux ដូចជា
   `~/.config/Cursor/User/globalStorage/state.vscdb` _នៅខាងក្នុង_ container។
   នៅលើ Docker Desktop សម្រាប់ macOS មូលដ្ឋានទិន្នន័យ IDE របស់ host មិនត្រូវបាន mount តាមលំនាំដើមទេ ហើយ
   ប្រព័ន្ធប្រតិបត្តិការរបស់ container គឺ Linux ទោះបី host ជា Darwin ក៏ដោយ។
2. **គ្មាន binary `cursor-agent`** — Image ផ្លូវការរបស់ OmniRoute មិនភ្ជាប់មកជាមួយ
   `cursor-agent` ទេ។ ពីមុន Available Models បានប្រតិបត្តិ
   `cursor-agent --list-models` តាម shell ហើយត្រឡប់ទៅប្រើកាតាឡុកថេរ ប្រសិនបើវាបរាជ័យ។
3. **Binary មិនត្រឹមត្រូវ** — **កុំ** bind-mount `cursor-agent` របស់ macOS ចូលក្នុង container
   Linux។ វានឹងមិនអាចប្រតិបត្តិបានទេ។

## បានណែនាំ៖ ចូលដោយប្រើ Cursor

1. បើក **Dashboard → Providers → Cursor**។
2. ជ្រើសផ្ទាំង **Login with Cursor**។
3. ចុច **Login with Cursor** — OmniRoute នឹងបើក
   `https://cursor.com/loginDeepControl?…` នៅក្នុង browser របស់ **host**។
4. អនុម័តការចូលនៅក្នុង browser បន្ទាប់មកត្រឡប់ទៅ dashboard។ OmniRoute
   នឹងស្ទង់ `api2.cursor.sh/auth/poll` រហូតដល់ទទួលបាន token។
5. OmniRoute រក្សាទុក token **access + refresh** ហើយធ្វើ refresh ពួកវាតាមរយៈ
   `https://api2.cursor.sh/auth/exchange_user_api_key`។

វិធីនេះមិនតម្រូវឱ្យមាន Cursor IDE ឬ `cursor-agent` នៅខាងក្នុង container ទេ។

## ការស្វែងរក model

នៅពេលមាន connection ដែលបានចូលរួច **Available Models / Auto-Sync** នឹងផ្តល់អាទិភាពដល់
កាតាឡុក HTTP `AiService/AvailableModels` របស់ Cursor ដោយប្រើ bearer token របស់ connection។
ប្រសិនបើវាបរាជ័យ OmniRoute នៅតែសាកល្បងប្រើ `cursor-agent` របស់ host (នៅពេលមាន) ហើយបន្ទាប់មក
ប្រើ seed នៃ registry ថេរ។

OmniRoute តែងតែបង្ហាញ **`auto`** នៅក្នុងកាតាឡុក (បង្ហាញជា “Auto”) ព្រមទាំង
របៀប router បែប OpenCodex គឺ **`auto-cost`**, **`auto-balance`**, និង
**`auto-intelligence`**។ នៅលើ wire វាត្រូវបានផ្គូផ្គងទៅនឹង model `default` របស់ Cursor
(ដោយមាន `optimization` ModelParameter សម្រាប់ variant ទាំងបី)។ សូមផ្តល់អាទិភាពដល់
`cu/auto` នៅពេល premium model អស់កូតាប្រើប្រាស់ — ជាញឹកញាប់ Auto នៅតែមានថវិកានៅសល់។

### កាតាឡុកផ្ទាល់មានសិទ្ធិផ្តាច់មុខនៅពេលបាន sync

បន្ទាប់ពីការធ្វើ sync model របស់ Cursor បានជោគជ័យ (`cursor-agent --list-models` → កាតាឡុក
ដែលបាន sync និងរក្សាទុក ឬការទាញយក `AvailableModels` ដែលបានផ្ទៀងផ្ទាត់ដោយ bearer ខាងលើ)
**dashboard**, **`/v1/models`**, និង **Test All** បង្ហាញ៖

1. Model ដែលបានត្រឡប់មកពីការធ្វើ sync ផ្ទាល់
2. ID របស់ auto-router ដែលបានបញ្ចូល៖ `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Model **custom** របស់ប្រតិបត្តិករ (Import / ដោយដៃ) — មិនត្រូវបានលុបចេញដោយការធ្វើ sync ឡើយ

Registry ថេរដ៏ធំនៅក្រោម
`open-sse/config/providers/registry/cursor/` គឺ **សម្រាប់ការបម្រុងទុកពេល offline ប៉ុណ្ណោះ**។ នៅពេល
synced ទទេ (ឬការស្វែងរកបរាជ័យ) ការរាយបញ្ជីនឹងត្រឡប់ទៅប្រើ registry នោះ។

ID ដែលមានបច្ច័យកម្រិត effort (ឧទាហរណ៍ `claude-4.6-sonnet-high`) នៅតែអាចត្រូវបាន
**ស្នើសុំ** នៅពេលដំណើរការ៖ `resolveRequestedModel` ដកបច្ច័យចេញទៅជា
`ModelParameter` នៅលើ wire។ ការរាយបញ្ជីផ្តាច់មុខលាក់ variant ថេរទាំងនោះពី
Test All ដោយចេតនា ដើម្បីឱ្យការសាកល្បងត្រូវនឹងអ្វីដែល Cursor ពិតជាត្រឡប់មកថាអាចប្រើបាន។

### ឧបករណ៍ជំនួយ

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ការបញ្ចូលគ្នានៅ dashboard
- `ensureCursorAutoCatalogEntry` — បញ្ចូល auto* ក្នុងការស្វែងរក + ការរាយបញ្ជី
- `shouldSuppressStaticModelForExclusiveListing` — loop ថេររបស់ `/v1/models`

## ដែនកំណត់របស់ Provider (កូតា)

**Usage → Provider Limits** សម្រាប់ Cursor ប្រើ Bearer API នៅលើ `api2.cursor.sh`
(`GetCurrentPeriodUsage` → សេចក្តីសង្ខេបការប្រើប្រាស់ → auth/usage) បន្ទាប់ពី PKCE ឬការនាំចូល
token។ ផ្លូវ dashboard ចាស់ដែលប្រើ cookie/`cursor.com` នៅតែជាជម្រើសបម្រុងចុងក្រោយ
សម្រាប់ session ចាស់ៗដែលបាននាំចូលពី IDE។

ជាទូទៅ Window រួមមាន **Total**, **Auto + Composer**, និង **API**។ ប្រសិនបើ
ដែនកំណត់បង្ហាញថាទទេ សូមដំណើរការ **Login with Cursor** ម្តងទៀត ឬនាំចូល token ឡើងវិញ (ការនាំចូលពី IDE
តែឯងលែងត្រូវការទៀតហើយ)។

## Turn ទទេ / អស់កូតាប្រើប្រាស់

នៅពេល Cursor ទទួលយក Run ប៉ុន្តែមិនត្រឡប់អត្ថបទ assistant (ជាទូទៅកើតឡើងនៅពេល
អស់កូតាប្រើប្រាស់ premium) OmniRoute នឹងបង្ហាញកំហុសដែលអាចចាត់វិធានការបានជា **429** (សញ្ញាបង្ហាញពីកូតា) ឬ
**502** ជាមួយការណែនាំ — មិនមែនគ្រាន់តែ “Provider returned empty content” ទេ។ ការបរាជ័យក្នុង
streaming ដូចជា `not_found: AI Model Not Found` (អស់ usage window) ត្រូវបាន
ចាត់ថ្នាក់ជា **Cursor rate limit / usage exceeded** ហើយរក្សាសារនោះ
តាមរយៈ SSE pipeline (guard រួមសម្រាប់ stream ទទេ មិនសរសេរជាន់លើកំហុសដែលបានបញ្ចេញរួចទេ)។
សូមពិនិត្យ Provider Limits សាកល្បង model **`auto`** ឬបង្កើនដែនកំណត់គម្រោង Cursor។

## កំណែ client (headless)

បើគ្មានការដំឡើង `cursor-agent` ក្នុង local ទេ OmniRoute នឹងកំណត់
`x-cursor-client-version` តាមរយៈ env `CURSOR_AGENT_CLI_VERSION` បន្ទាប់មកការទាញយកទិន្នន័យពី
script ដំឡើង Cursor ដែលបាន cache នៅលើ disk ហើយចុងក្រោយប្រើ build id ដែលបានកំណត់ថេរ។ បដិសេធតម្លៃលំនាំដើមដោយប្រើ
`CURSOR_AGENT_CLI_VERSION` នៅពេលចាំបាច់។

## ជម្រើសបម្រុង៖ នាំចូល Token ដោយដៃ

ប្រសិនបើអ្នកមិនអាចបញ្ចប់ការចូលតាម browser បាន៖

1. នៅលើ host ស្រង់ token ចេញពី `state.vscdb` របស់ Cursor៖

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. បើក **Import token** នៅក្នុង modal ផ្ទៀងផ្ទាត់អត្តសញ្ញាណរបស់ Cursor។
3. បិទភ្ជាប់ **Access Token** និង **Refresh Token** នៅពេលមាន (តម្រូវឱ្យមានសម្រាប់
   ការធ្វើ refresh ដោយស្វ័យប្រវត្តិ)។ Machine ID ជាជម្រើស។

ការនាំចូលដែលមានតែ access token នៅតែដំណើរការ ប៉ុន្តែនឹងផុតកំណត់ប្រសិនបើគ្មាន refresh token —
សូមនាំចូលឡើងវិញ នៅពេល chat ត្រឡប់កំហុសការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ។

## ពាក់ព័ន្ធ

- ការណែនាំអំពី Zed Docker៖ [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- ឯកសារយោងអំពីការចូល Cursor របស់ OpenCodex (ខាងក្រៅ)៖
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
