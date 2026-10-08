# Chaos Mode (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ផ្ទាំងគ្រប់គ្រង:** **Chaos Mode** (របារចំហៀង) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (សម័យផ្ទាំងគ្រប់គ្រង) · `POST /api/skills/collect/chaos` (សោ API)  
> **កូដប្រភព:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode បញ្ជូន **កិច្ចការមួយទៅកាន់អ្នកផ្តល់សេវាជាច្រើនក្នុងពេលតែមួយ** — អ្នកផ្តល់សេវានីមួយៗដែលចូលរួម
រួមចំណែកនូវអង្គគំរូមួយ ហើយអ្នកទទួលបានចម្លើយទាំងអស់ដាក់ផ្ទឹមគ្នា (ឬតភ្ជាប់ជាខ្សែសង្វាក់)។ វាគឺជា
ផ្ទៃប្រតិបត្តិការពហុគំរូ មិនមែនជាយុទ្ធសាស្ត្រកំណត់ផ្លូវទេ៖ ចរាចរធម្មតារបស់អ្នកទៅកាន់ `/v1/chat/completions`
មិនត្រូវបានប៉ះពាល់ដោយវាឡើយ។

**ការបញ្ជាក់ភាពខុសគ្នា — មានបីអ្វីផ្សេងគ្នាដែលមានពាក្យ "chaos" នៅក្នុងឈ្មោះ៖**

| អ្វីមួយ                          | វាជាអ្វី                                                                                                                                                                                       | កន្លែងដែលមានឯកសារ                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                   | ទំព័រផ្ទាំងគ្រប់គ្រង + API ដែលបានពិពណ៌នានៅទីនេះ៖ បញ្ជូនកិច្ចការមួយទៅកាន់អ្នកផ្តល់សេវាជាច្រើន (ស្របគ្នា ឬសហការ)។                                                                                | មគ្គុទ្ទេសក៍នេះ                              |
| `auto/chaos`                     | លេខសម្គាល់គំរូ Auto-Combo៖ ការបញ្ជូនស្របគ្នា គំរូមួយសម្រាប់អ្នកផ្តល់សេវានីមួយៗ និងការហៅទៅប្រភពខាងលើមួយដងក្នុងមួយគំរូ។ មិនមែនជាការបញ្ចូលកំហុសទេ ([ព័ត៌មានលម្អិត](#autochaos-parallel-fan-out))។ | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| ការកំណត់រចនាសម្ព័ន្ធ Chaos combo | combo ដែលបានរក្សាទុកដោយមាន `config.chaos.enabled` នឹងបញ្ជូនចេញតាមរបៀបដូចគ្នា (សម្រាប់តែ API ប៉ុណ្ណោះ)។ `judgeModel` គ្រាន់តែជ្រើសរើសចម្លើយចុងក្រោយប៉ុណ្ណោះ ដោយគ្មានការហៅសម្រាប់សំយោគទេ។        | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: ការបញ្ជូនស្របគ្នា

`auto/chaos` **មិនមែន** ជាជម្រើសបញ្ជាសម្រាប់ការបញ្ចូលកំហុស ឬការធ្វើតេស្តភាពធន់នោះទេ។ ការស្នើសុំ
`model: "auto/chaos"` នៅលើ `/v1/chat/completions`៖

1. បង្កើតបន្ទះមួយដែលមាន **គំរូមួយសម្រាប់អ្នកផ្តល់សេវានីមួយៗ**៖ បេក្ខភាពទីមួយរបស់អ្នកផ្តល់សេវា
   ដែលបានភ្ជាប់នីមួយៗ តាមលំដាប់ក្នុងបណ្តុំបេក្ខភាព រហូតដល់សមាជិក 5
   (`OMNIROUTE_CHAOS_MAX_PANEL`, កំណត់អតិបរមាត្រឹម 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`)។ កញ្ចប់ទម្ងន់ `chaos-mode`
   គ្រាន់តែកំណត់ `weight` របស់សមាជិកនីមួយៗប៉ុណ្ណោះ។ ការបញ្ជូនចេញមិនអានតម្លៃនេះទេ។
2. ផ្ញើសំណើដូចគ្នាទៅកាន់សមាជិកបន្ទះទាំងអស់ **ស្របគ្នា** ដូច្នេះសំណើមួយ
   ចំណាយការហៅទៅប្រភពខាងលើមួយដងសម្រាប់សមាជិកបន្ទះនីមួយៗ
   (`open-sse/services/autoCombo/chaosEngine.ts`, បញ្ជូនចេញពី
   `open-sse/services/combo.ts`)។
3. ផ្សាយបន្ទាត់ស្ថានភាពមួយសម្រាប់សមាជិកបន្ទះនីមួយៗនៅពេលមកដល់៖ មតិយោបល់ SSE
   (`: chaos <index> ok|fail <model>`) តាមលំនាំដើម ព្រមទាំងព្រឹត្តិការណ៍ `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) នៅពេលសំណើកំណត់
   `stream_options.include_chaos_parts: true`។ ទាំងនេះមិនមានអត្ថបទចម្លើយទេ។
4. ផ្ញើចម្លើយបន្ទះ **មួយ** ជាបំណែកចុងក្រោយតាមរចនាប័ទ្ម OpenAI៖ ចម្លើយរបស់សមាជិកបន្ទះ
   ទីមួយ (`auto/chaos` កំណត់វាជា `judgeModel`) នៅពេលវាជោគជ័យ បើមិនដូច្នោះទេ
   គឺចម្លើយរបស់សមាជិកចុងក្រោយដែលជោគជ័យ។ ចម្លើយរបស់សមាជិកបន្ទះផ្សេងទៀតមិនត្រូវបានបញ្ជូនត្រឡប់ទេ ដូច្នេះ
   អ្នកបង់ថ្លៃសម្រាប់ការហៅ N ដង ហើយទទួលបានការបំពេញមួយ។

## ការរៀបចំ

1. បើក **ផ្ទាំងគ្រប់គ្រង → Chaos Mode** (`/dashboard/chaos`)។
2. បើកវា **on** — Chaos Mode ត្រូវបានចេញផ្សាយដោយ **បិទជាលំនាំដើម** (`enabled: false` ក្នុង
   `src/lib/chaos/chaosConfig.ts`)។ នៅពេលបិទ `POST /api/chaos/run` នឹងឆ្លើយតប
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`។
3. ជ្រើសរើសអ្នកចូលរួម និងតម្លៃលំនាំដើម (រក្សាទុកសម្រាប់ instance នីមួយៗតាមរយៈឃ្លាំងការកំណត់)៖

   | វាល                 | អត្ថន័យ                                                                 | លំនាំដើម / ដែនកំណត់                          |
   | ------------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | កុងតាក់មេ                                                               | `false`                                      |
   | `defaultMode`       | `parallel` ឬ `collaborative` (សូមមើលខាងក្រោម)                           | `parallel`                                   |
   | `providerOverrides` | ការចូលរួមតាមអ្នកផ្តល់សេវា (`providerId`, `modelId` ជាជម្រើស, `enabled`) | ទទេ = អ្នកផ្តល់សេវាសកម្មទាំងអស់, អតិបរមា 200 |
   | `systemPrompt`      | កំណត់ជំនួស prompt ប្រព័ន្ធ Chaos ដែលមានស្រាប់                           | ជាជម្រើស, អតិបរមា 10 000 តួអក្សរ             |
   | `timeoutMs`         | ពេលវេលាអតិបរមាសម្រាប់ការហៅម៉ូដែលនីមួយៗ                                  | `120000` (5 000–600 000)                     |
   | `maxTokens`         | `max_tokens` សម្រាប់ការហៅម៉ូដែលនីមួយៗ                                   | `4096` (256–128 000)                         |

4. ដំណើរការ **ការសាកល្បងពីទំព័រផ្ទាល់** — ផ្ទាំងលទ្ធផលបង្ហាញចម្លើយ
   ស្ថានភាព និងរយៈពេលរបស់អ្នកផ្តល់សេវានីមួយៗ។

## របៀបប្រតិបត្តិការ

- **`parallel`** — ម៉ូដែលទាំងអស់ទទួលបានកិច្ចការដូចគ្នាក្នុងពេលតែមួយ ហើយអ្នកទទួលបានចម្លើយទាំងអស់
  ដោយឯករាជ្យពីគ្នា។
- **`collaborative`** — ម៉ូដែលដំណើរការ **ជាខ្សែសង្វាក់**៖ ម៉ូដែលនីមួយៗមើលឃើញលទ្ធផលរបស់ម៉ូដែលមុន
  ហើយត្រូវបានស្នើឱ្យកែលម្អ ពង្រីក រិះគន់ ឬផ្តល់ជម្រើសផ្សេង។ វាល `summary` របស់ការឆ្លើយតប
  ភ្ជាប់លទ្ធផលជោគជ័យតាមលំដាប់ខ្សែសង្វាក់ (ការដំណើរការស្របគ្នាមិនមាន `summary` ទេ)។

## API

### `POST /api/chaos/run` — សម័យផ្ទាំងគ្រប់គ្រង

ផ្ទៀងផ្ទាត់តាម cookie (សម័យគ្រប់គ្រង — សូមមើល
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ប្រើដោយទំព័រផ្ទាំងគ្រប់គ្រង។

```jsonc
// តួសំណើ
{
  "task": "Compare approaches to X", // តម្រូវឱ្យមាន
  "providers": ["glm", "kimi"], // តម្រងជាជម្រើស
  "mode": "parallel", // ជាជម្រើស — ជំនួស defaultMode
  "systemPrompt": "…", // ការកំណត់ជំនួសជាជម្រើស
  "maxTokens": 4096, // ការកំណត់ជំនួសជាជម្រើស
}
```

### `POST /api/skills/collect/chaos` — សោ API

បំរែបំរួល bearer-token សម្រាប់អ្នកហៅពីខាងក្រៅ។ សោត្រូវតែមាន **សិទ្ធិ Chaos Mode**
(`chaosModeEnabled`) ដែល **បិទជាលំនាំដើម** — បើកវាសម្រាប់សោនីមួយៗនៅ
**ផ្ទាំងគ្រប់គ្រង → API Manager → កែសម្រួលសោ → សិទ្ធិ → Chaos Mode**។ តួសំណើដូចខាងលើ។

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

endpoint ទាំងពីរត្រឡប់ទម្រង់ដូចគ្នា៖

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // សម្រាប់តែរបៀប collaborative
}
```

## ការដោះស្រាយបញ្ហា

- **`400 Chaos Mode is not enabled`** — ជំហានទី 2 ខាងលើ៖ កុងតាក់សកលត្រូវបានបិទ។
- **សោ API ត្រូវបានបដិសេធនៅលើ `/api/skills/collect/chaos`** — សោនេះខ្វះសិទ្ធិតាមសោ
  `chaosModeEnabled` (បិទជាលំនាំដើម; នេះគឺជាការកំណត់ មិនមែនជាកំហុសទេ)។
- **អ្នកផ្តល់សេវាដែលអ្នករំពឹងទុកមិនមានក្នុងលទ្ធផល** — ពិនិត្យ `providerOverrides` នៅលើ
  ទំព័រ Chaos Mode (override ដែលបានបិទនឹងដកវាចេញ) និងពិនិត្យថាតើការតភ្ជាប់របស់អ្នកផ្តល់សេវា
  សកម្មឬអត់។
