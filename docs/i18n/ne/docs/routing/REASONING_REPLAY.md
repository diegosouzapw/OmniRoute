# Reasoning Replay Cache (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **सत्यको आधिकारिक स्रोत:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **पछिल्लो अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute ले thinking-mode मोडेलहरूद्वारा उत्पादित सहायकको `reasoning_content` सङ्कलन गर्छ र अपस्ट्रिम प्रदायकले आवश्यक ठानेमा बहु-टर्न अनुरोधहरूमा यसलाई पारदर्शी रूपमा पुनः प्रयोग गर्छ। यसले क्लाइन्टको वार्तालाप इतिहासमा अघिल्लो टर्नको reasoning नहुँदा कडा प्रदायकहरूले दिने HTTP 400 त्रुटिहरू हटाउँछ।

## यसको आवश्यकता किन छ

धेरै thinking-mode प्रदायकहरूले **अघिल्लो सहायक सन्देशमा मूल `reasoning_content` समावेश नभएसम्म** फलो-अप टर्न अस्वीकार गर्छन्। अपस्ट्रिमले यस्ता सन्देशहरूसहित 400 फर्काउँछ:

```
प्यारामिटर गलत छ: thinking mode मा रहेको reasoning_content API मा फिर्ता पठाउनुपर्छ।
```

तर सामान्य क्लाइन्टहरू (Cursor, Cline, Roo Code, OpenAI SDK) ले पुनः पठाउने इतिहासबाट `reasoning_content` हटाउँछन्। OmniRoute ले यसलाई सर्भर-साइड क्यासबाट पुनर्स्थापना गर्छ, जसले गर्दा अपस्ट्रिमले देख्ने अनुरोध सुसङ्गत हुन्छ। Issue #1628 ले हाइब्रिड मेमोरी/SQLite स्थायित्व प्रस्तुत गर्यो, जसले गर्दा प्रक्रिया पुनः सुरु भएपछि पनि क्यास कायम रहन्छ।

## वास्तुकला

```
टर्न N (सहायकले उत्पन्न गर्छ):
  → प्रतिक्रियामा reasoning_content + tool_calls समावेश हुन्छन्
  → यदि requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      हरेक tool_call.id द्वारा कुञ्जीकृत गरी (मेमोरी + DB) मा लेख्छ
  → प्रतिक्रिया क्लाइन्टलाई पठाउँछ (जसले reasoning कायम राख्न पनि सक्छ वा नराख्न पनि सक्छ)

टर्न N+1 (क्लाइन्टले फलो-अप पठाउँछ):
  → अनुवादकले पत्ता लगाउँछ: requiresReasoningReplay(provider, model) === true
  → tool_calls भएका तर reasoning_content नभएका प्रत्येक सहायक सन्देशका लागि:
      lookupReasoning(toolCalls[0].id) → मेमोरी → DB
      हिट  → msg.reasoning_content = cached; recordReplay()
      मिस → msg.reasoning_content = "" (पुरानो DeepSeek का लागि लिगेसी फलब्याक)
  → अपस्ट्रिमले सुसङ्गत इतिहास देख्छ → 400 आउँदैन
```

सङ्कलन `open-sse/handlers/chatCore.ts` मा हुन्छ (दुई स्थानमा, दुईवटा `cacheReasoningFromAssistantMessage` कल साइटमा)। पुनः प्रयोग स्किमा कोअर्सनपछि तर डिस्प्याचअघि `open-sse/translator/index.ts` मा हुन्छ।

## भण्डारण — हाइब्रिड मेमोरी + SQLite

हट पाथले क्र्यास रिकभरी र ड्यासबोर्ड दृश्यताका लागि SQLite तालिकाद्वारा समर्थित इन-मेमोरी `Map` (सिर्जना समयअनुसार LRU) प्रयोग गर्छ।

| तह     | कार्यान्वयन                                          | उद्देश्य                                               |
| ------ | ---------------------------------------------------- | ------------------------------------------------------ |
| मेमोरी | `open-sse/services/reasoningCache.ts` मा रहेको `Map` | द्रुत लुकअप, 200 पुगेपछि सबैभन्दा पुरानो हटाउँछ        |
| DB     | `reasoning_cache` तालिका (`src/lib/db/`)             | पुनः सुरु हुँदा पनि कायम रहन्छ र तथ्याङ्क सञ्चालन गर्छ |

लेखाइ दुवैमा गरिन्छ। पढाइले पहिले मेमोरी जाँच्छ, त्यसपछि DB मा फलब्याक गर्छ (DB हिटहरू पुनः मेमोरीमा प्रवर्द्धन गरिन्छन्)। DB विफलताहरू घातक हुँदैनन् — इन-मेमोरी क्यासले हट पाथलाई सेवा दिन जारी राख्छ।

**पूर्वनिर्धारित मानहरू:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- अधिकतम मेमोरी प्रविष्टिहरू: `200` (`MAX_MEMORY_ENTRIES`)
- निष्कासन: सबैभन्दा पुरानो `createdAt` पहिले

## डेटाबेस स्किमा

माइग्रेसन: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

इन्डेक्सहरू: `expires_at`, `provider`, `model`, `created_at`। `expires_at` लाई Unix epoch सेकेन्डका रूपमा भण्डारण गरिन्छ; SELECT तहले `EXPIRES_AT_EPOCH_SQL` मार्फत पुराना टेक्स्ट मानहरू सामान्यीकरण गर्छ।

## प्रदायक / मोडेल पहिचान

`requiresReasoningReplay(provider, model)` ले `true` फर्काउँदा Replay सक्षम हुन्छ। यस प्रकार्यले `open-sse/services/reasoningCache.ts` मा रहेका दुईवटा सूची जाँच गर्छ।

**प्रदायक ID हरू (ठ्याक्कै मिल्नुपर्ने, अक्षरको आकारप्रति असंवेदनशील):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**मोडेल regex ढाँचाहरू (अक्षरको आकारप्रति असंवेदनशील):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` र `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, वैकल्पिक `-free` प्रत्यय)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

नयाँ strict प्रदायक/मोडेल थप्नु भनेको यी सूचीमध्ये एउटामा थप्नु र replay injection पुष्टि गर्ने unit test लेख्नु हो। PR विवरणमा परिवर्तन गर्न प्रेरित गर्ने upstream 400 को ठ्याक्कै string उल्लेख हुनुपर्छ।

## REST API

Cache ले `src/app/api/cache/reasoning/route.ts` अन्तर्गत दुईवटा endpoint उपलब्ध गराउँछ। दुवैलाई व्यवस्थापन प्रमाणीकरण (`@/shared/utils/apiAuth` बाट `isAuthenticated`) आवश्यक पर्छ।

| विधि   | Endpoint                                                  | विवरण                                                       |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | तथ्याङ्क + पृष्ठाङ्कित प्रविष्टिहरू                         |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | फिल्टर गरिएको सूची (`limit` लाई `[1, 200]` मा सीमित गरिन्छ) |
| DELETE | `/api/cache/reasoning`                                    | सबै कुरा (memory + DB) खाली गरी hit/miss गणना रिसेट गर्छ    |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | एउटा प्रदायकका प्रविष्टिहरू मात्र खाली गर्छ                 |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | एउटै प्रविष्टि मेटाउँछ                                      |

**GET प्रतिक्रियाको संरचना:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## सञ्चालनसम्बन्धी टिप्पणीहरू

- **सफाइ:** `cleanupReasoningCache()` ले म्याद सकिएका memory प्रविष्टिहरू हटाउँछ र `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` चलाउँछ। Health-check worker हरूले यसलाई आवधिक रूपमा आह्वान गर्छन्।
- **Crash recovery:** पुनः सुरु गरेपछि memory खाली हुन्छ, तर DB मा म्याद नसकिएका प्रविष्टिहरू रहिरहन्छन्। दिइएको `tool_call_id` का लागि पहिलो lookup DB hit हुन्छ; त्यसपछिका lookup हरू memory hit हुन्छन्।
- **Reasoning छैन भने cache पनि हुँदैन:** सहायक सन्देशमा `reasoning_content` / `reasoning` field नभएमा `cacheReasoningFromAssistantMessage` ले `0` फर्काउँछ, त्यसैले non-thinking प्रतिक्रियाहरूमा कुनै लागत लाग्दैन।
- **लेखन पनि नियन्त्रित छ:** `chatCore.ts` का दुवै call site (non-streaming र streaming) ले `requiresReasoningReplay(provider, model)` `true` हुँदा मात्र `cacheReasoningFromAssistantMessage()` आह्वान गर्छन् — read side ले जाँच्ने predicate पनि यही हो। Replay प्रदायक कहिल्यै प्रयोग नगर्ने installation हरूले reasoning समावेश भएको प्रत्येक प्रतिक्रियामा write, index update, र try/catch को लागत व्यहोर्नु पर्दैन।
- **Non-strict प्रदायकहरू:** `requiresReasoningReplay` `false` हुँदा र लक्षित ढाँचा OpenAI हुँदा, translator ले बाहिर जाने सन्देशहरूबाट कुनै पनि `reasoning_content` field **हटाउँछ** — OpenAI Chat Completions ले यसलाई स्वीकार गर्दैन।

## यो पनि हेर्नुहोस्

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकरहरू, कूलडाउनहरू, मोडेल लकआउटहरू
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — अपस्ट्रिम 400 त्रुटिहरूको निदान
- स्रोत: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- माइग्रेसन: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API रुट: `src/app/api/cache/reasoning/route.ts`
- मूल समस्या: #1628
