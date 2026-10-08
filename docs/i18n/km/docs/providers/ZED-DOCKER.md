# Zed IDE Integration in Docker Environments (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

នៅពេល OmniRoute ដំណើរការនៅក្នុង Docker លំហូរស្តង់ដារ "នាំចូលពី Zed Keychain" នឹងបរាជ័យ
ព្រោះ container មិនអាចចូលប្រើ daemon របស់ keychain នៃ OS ម៉ាស៊ីនមេបានទេ (`libsecret` នៅលើ Linux,
Keychain នៅលើ macOS, Credential Manager នៅលើ Windows) ហើយថតកំណត់រចនាសម្ព័ន្ធ Zed នៅលើ
ប្រព័ន្ធឯកសាររបស់ម៉ាស៊ីនមេ មិនអាចមើលឃើញនៅក្នុង container តាមលំនាំដើមទេ។

## ហេតុអ្វីការនាំចូលពី Keychain បរាជ័យនៅក្នុង Docker

បញ្ហារាំងស្ទះពីរកើតឡើងនៅក្នុង container៖

1. **ការញែកប្រព័ន្ធឯកសារ** — `isZedInstalled()` ស្វែងរក `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) ឬទីតាំងដែលមានតម្លៃស្មើគ្នានៅលើ Windows។ ទីតាំងទាំងនេះ
   ស្ថិតនៅលើម៉ាស៊ីនមេ ហើយមិនអាចប្រើបានទេ លុះត្រាតែបានម៉ោនជា volume យ៉ាងច្បាស់លាស់។
2. **ការញែក IPC** — ទោះបីជាថតកំណត់រចនាសម្ព័ន្ធត្រូវបានម៉ោនក៏ដោយ ម៉ូឌុល native `keytar`
   ទាក់ទងជាមួយសេវា keychain របស់ OS តាមរយៈ Unix socket ឬ D-Bus session។
   តាមលំនាំដើម គ្មានមួយណាត្រូវបានតភ្ជាប់ចូលក្នុង container ទេ ដូច្នេះការអានព័ត៌មានសម្ងាត់តែងតែបរាជ័យ។

OmniRoute រកឃើញបរិស្ថាន Docker តាមរយៈវិធីសាស្ត្រសន្និដ្ឋានពីរ៖

- វត្តមានរបស់ `/.dockerenv` (ត្រូវបានសរសេរដោយ Docker daemon នៅពេល container ចាប់ផ្ដើម)។
- វត្តមានខ្សែអក្សរ `docker` នៅក្នុង `/proc/1/cgroup` (Linux cgroup v1)។

នៅពេលវិធីសាស្ត្រណាមួយត្រូវបានបង្កឡើង ផ្លូវនាំចូលនឹងត្រឡប់ HTTP 422 ជាមួយ
`zedDockerEnvironment: true` និងសារដែលណែនាំអ្នកឱ្យទៅកាន់ផ្ទាំងនាំចូល Token ដោយដៃ។

## ការប្រើផ្ទាំងនាំចូល Token ដោយដៃ

1. បើក **ផ្ទាំងគ្រប់គ្រង → អ្នកផ្តល់សេវា → Zed**។
2. ផ្ទាំង **នាំចូល Token ដោយដៃ** បង្ហាញនៅខាងក្រោមកាតនាំចូលពី keychain។ នៅពេល
   OmniRoute រកឃើញ Docker ផ្ទាំងនេះនឹងពង្រីកដោយស្វ័យប្រវត្តិ បន្ទាប់ពីការព្យាយាមនាំចូលពី
   keychain លើកដំបូងបានបរាជ័យ។
3. ជ្រើសរើសអ្នកផ្តល់សេវាពីបញ្ជីទម្លាក់ចុះ (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter ឬ DeepSeek)។
4. បិទភ្ជាប់ API key នៅក្នុងវាលពាក្យសម្ងាត់។
5. ចុច **នាំចូល**។

Key នឹងត្រូវបានរក្សាទុកជាការតភ្ជាប់អ្នកផ្តល់សេវាថ្មី ដែលមានឈ្មោះ
`Zed Manual Import (<provider>)`។

## ទីតាំងដែល Zed រក្សាទុក API Key នៅលើម៉ាស៊ីនមេ

Zed រក្សាទុក key របស់អ្នកផ្តល់សេវា AI នៅក្នុង keychain របស់ OS ក្រោមឈ្មោះសេវាដូចជា
`zed-openai`, `ai.zed.openai`, `zed-anthropic` ជាដើម។ ដើម្បីយកពួកវាមកប្រើសម្រាប់ការ
នាំចូលដោយដៃ សូមរកមើលនៅក្នុង៖

**Linux**

```
~/.config/zed/settings.json
```

ផ្នែក `language_models` មានការកំណត់រចនាសម្ព័ន្ធអ្នកផ្តល់សេវា។ Key ដែលបានរក្សាទុកទៅក្នុង
keychain តាមរយៈ UI របស់ Zed មិនមានជាអត្ថបទធម្មតានៅក្នុង `settings.json` ទេ។ សូមយកពួកវាតាមរយៈ
កម្មវិធីមើល keychain ដូចជា GNOME Keyring / Seahorse ឬដោយដំណើរការ៖

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

ធាតុ Keychain អាចរកឃើញនៅក្នុង **Keychain Access.app** ដោយស្វែងរក `zed`។

## ជម្រើសម៉ោន Volume (កម្រិតខ្ពស់)

អ្នកអាចម៉ោនថតកំណត់រចនាសម្ព័ន្ធ Zed ចូលក្នុង container ជា read-only តាមជម្រើស។
វាមិនដោះស្រាយបញ្ហា keychain ទេ ប៉ុន្តែអាចមានប្រយោជន៍សម្រាប់មុខងារនាពេលអនាគតដែលអាន
តម្លៃកំណត់រចនាសម្ព័ន្ធ Zed ដែលមិនមែនជាព័ត៌មានសម្ងាត់ (ឧ. ចំណូលចិត្តម៉ូដែល)។

```yaml
# បំណែកនៃ docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # ម៉ាស៊ីនមេ Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # ម៉ាស៊ីនមេ macOS (ដកសញ្ញា comment ចេញ ដើម្បីប្រើជំនួស)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # នាពេលអនាគត៖ ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

ចំណាំ៖ ការកំណត់ជាន់លើតាមរយៈ environment variable `ZED_CONFIG_PATH` មិនទាន់ត្រូវបានអនុវត្តនៅឡើយទេ។
បំណែកនេះត្រូវបានផ្តល់ជាឯកសារយោង សម្រាប់ពេលដែលមុខងារនោះត្រូវបានបន្ថែម។

## API នាំចូលដោយដៃ

endpoint នាំចូលដោយដៃក៏អាចត្រូវបានហៅដោយផ្ទាល់ផងដែរ៖

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // ជាជម្រើស
}
```

នៅពេលជោគជ័យ វានឹងត្រឡប់៖

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## ការដោះស្រាយបញ្ហា

| រោគសញ្ញា                                 | មូលហេតុ                         | ដំណោះស្រាយ                            |
| ---------------------------------------- | ------------------------------- | ------------------------------------- |
| 422 + `zedDockerEnvironment: true`       | កំពុងដំណើរការនៅក្នុង Docker     | ប្រើផ្ទាំងនាំចូល Token ដោយដៃ          |
| 404 + `zedInstalled: false`              | មិនបានដំឡើង Zed នៅលើម៉ាស៊ីនមេ   | ដំឡើង Zed ឬប្រើការនាំចូលដោយដៃ         |
| 403 + ការចូលប្រើ keychain ត្រូវបានបដិសេធ | OS បានបដិសេធការចូលប្រើ keychain | ផ្តល់សិទ្ធិនៅក្នុងប្រអប់បញ្ចូលរបស់ OS |
| 404 + មិនមានសេវា keychain                | មិនមាន `libsecret` នៅលើ Linux   | ដំឡើង `libsecret-1-dev`               |
