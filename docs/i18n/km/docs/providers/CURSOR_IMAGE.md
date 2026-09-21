# Cursor Image Generation (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute ផ្តល់មុខងារ **បង្កើតរូបភាព** របស់គម្រោង Cursor តាម `POST /v1/images/generations` ដោយប្រើ provider id ដូចគ្នានឹងការជជែក៖ `cursor` (ឈ្មោះក្លែងកាត់ `cu`)។

| វាល                      | តម្លៃ                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id     | `cursor`                                                                                  |
| ទម្រង់                   | `cursor-agent-image`                                                                      |
| ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ | ការតភ្ជាប់ OAuth / API-key ដូចគ្នានឹងការជជែក (`provider_connections.provider = "cursor"`) |
| ម៉ូដែល                   | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                 |

## ហេតុអ្វីត្រូវប្រើ Agent CLI

ការជជែក Cursor នៅក្នុង OmniRoute ប្រើ `agent.v1.AgentService/Run` (protobuf)។ ផ្លូវនេះ **បដិសេធ** ឧបករណ៍ client ដែលមានស្រាប់ (shell, write, …)។ ការបង្កើតរូបភាពគឺជាឧបករណ៍ដើមរបស់ Cursor ដែលត្រូវបានប្រតិបត្តិដោយ **`agent` CLI** លើ seat។ ដូច្នេះ image handler នឹងបង្កើត process `agent` ជាមួយ prompt ដែលបានចាក់សោ និង workspace បណ្ដោះអាសន្នដាច់ដោយឡែកសម្រាប់ request នីមួយៗ (មានទម្រង់ដូចគ្នានឹង community seat bridges) ហើយបន្ទាប់មកត្រឡប់ `b64_json` ដែលឆបគ្នាជាមួយ OpenAI។

## ការរឹតបន្តឹងការចូលប្រើ (ច្បាប់តឹងរ៉ឹង #15 + #17)

នេះគឺជាទម្រង់ `IMAGE_PROVIDERS` តែមួយគត់ដែលបង្កើត child process (binary `agent`)។ ដោយសារ `POST /v1/images/generations` ត្រូវបានប្រើរួមគ្នាដោយ image provider ប្រហែល 40 ផ្សេងទៀតដែលមិនបង្កើត process ហើយដែលអ្នកហៅពីចម្ងាយអាចប្រើប្រាស់បានដោយស្របច្បាប់ នោះ route ទាំងមូល **មិនត្រូវបាន** ចាត់ថ្នាក់ជា `LOCAL_ONLY` ទេ—ផ្ទុយទៅវិញ `handleCursorAgentImageGeneration` អនុវត្ត gate ផ្ទាល់ខ្លួន ដោយប្រើ verdict `AUTHZ_HEADER_PEER_LOCALITY` ដែលអាចទុកចិត្តបាន និងត្រូវបាន authz pipeline បោះត្រាលើ request នីមួយៗ (ផ្អែកលើ TCP peer ពិតប្រាកដ មិនមែន header `Host` ដែលអាចក្លែងបន្លំបានទេ)៖ មានតែអ្នកហៅ `loopback` និង `lan` ប៉ុណ្ណោះដែលអាចឈានដល់ការបង្កើត process បាន។ អ្នកផ្សេងទៀតទាំងអស់ (រួមទាំង API key ដែលបានលេចធ្លាយ ហើយត្រូវបានយកទៅប្រើឡើងវិញតាម public tunnel) នឹងទទួល `403` មុនពេលមានការស្វែងរក credential ឬការបង្កើត process ណាមួយ។ សូមមើល `src/server/authz/policies/management.ts` សម្រាប់គោលការណ៍ដូចគ្នាដែលបានអនុវត្តចំពោះផ្នែក `LOCAL_ONLY` ដែលនៅសល់។

## Concurrency gate ស្ថិតនៅកម្រិត module (ដែនកំណត់សម្រាប់ instance តែមួយ)

`CURSOR_IMG_MAX_CONCURRENT` ត្រូវបានអនុវត្តដោយ counter/queue នៅក្នុង memory ដែលមាន scope ត្រឹម Node module instance (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`)។ វាកំណត់ចំនួនការបង្កើត `agent` ស្របពេលគ្នាបានត្រឹមត្រូវនៅក្នុង process OmniRoute មួយ ប៉ុន្តែ **មិន** សម្របសម្រួលឆ្លងកាត់ process/instance ច្រើនដែលប្រើ Cursor seat ដូចគ្នាទេ (ឧ. deployment ដែលមាន replica ច្រើន)—instance នីមួយៗអនុវត្តដែនកំណត់ឯករាជ្យរបស់ខ្លួន។ សម្រាប់ deployment ដែលមាន instance តែមួយ (លំនាំដើម) ការកំណត់នេះមានភាពត្រឹមត្រូវពេញលេញ។ Deployment ដែលពង្រីកផ្ដេកគួរតែកំណត់ `CURSOR_IMG_MAX_CONCURRENT` ឱ្យទាបសមរម្យសម្រាប់ instance នីមួយៗ ឬបញ្ជូន traffic រូបភាព Cursor ទៅ instance តែមួយ។

## តម្រូវការ

1. គណនី Cursor ដែលបានតភ្ជាប់នៅក្នុង dashboard (OAuth ឬ API key `crsr_…`)។
2. Cursor Agent binary ដែល OmniRoute process អាចប្រើបាន៖
   - env `CURSOR_AGENT_BIN=/path/to/agent` ឬ
   - `~/.local/bin/agent` ឬ
   - `providerSpecificData.agentBin` នៅលើការតភ្ជាប់ Cursor។

ការកែសម្រួលជាជម្រើស៖

| Env                         | លំនាំដើម                 | អត្ថន័យ                                      |
| --------------------------- | ------------------------ | -------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | ពេលវេលាសរុបអតិបរមាសម្រាប់រូបភាពនីមួយៗ        |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Concurrency gate សម្រាប់ seat ដែលប្រើរួមគ្នា |
| `CURSOR_IMG_MODEL`          | (request model / `auto`) | កំណត់ជំនួស CLI `--model`                     |

## ឧទាហរណ៍

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

ការបង្កើតជាទូទៅចំណាយពេល 1–2 នាទី។ គួរប្រើផ្លូវបណ្ដាញខាងក្នុងជាជម្រើសដំបូង ព្រោះ edge proxy ដែលមាន timeout ប្រហែល 100 វិនាទីនឹងបរាជ័យ។

## LiteLLM

ចុះឈ្មោះ image model មួយដោយប្រើ `mode: image_generation`, `api_base: http://omniroute:20128/v1` និង `model: openai/cursor/auto` (ឬ `cursor/auto` ដោយផ្ទាល់ អាស្រ័យលើ version LiteLLM របស់អ្នក)។
