# Reasoning Replay Cache (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **प्रामाणिक स्रोत:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute, थिंकिंग-मोड मॉडल द्वारा उत्पन्न सहायक `reasoning_content` को कैप्चर करता है और जब अपस्ट्रीम प्रदाता को इसकी आवश्यकता होती है, तो बहु-टर्न अनुरोधों पर इसे पारदर्शी रूप से पुनः चलाता है। इससे वे HTTP 400 त्रुटियाँ समाप्त हो जाती हैं, जिन्हें सख्त प्रदाता तब उत्पन्न करते हैं जब क्लाइंट के वार्तालाप इतिहास में पिछले टर्न की रीजनिंग मौजूद नहीं होती।

## यह क्यों मौजूद है

कई थिंकिंग-मोड प्रदाता किसी फ़ॉलो-अप टर्न को तब तक अस्वीकार कर देते हैं, जब तक कि **पिछले सहायक संदेश में मूल `reasoning_content` शामिल न हो**। अपस्ट्रीम इस तरह के संदेशों के साथ 400 लौटाता है:

```
पैरामीटर गलत है: थिंकिंग मोड में reasoning_content को API में वापस भेजना आवश्यक है।
```

लेकिन सामान्य क्लाइंट (Cursor, Cline, Roo Code, OpenAI SDK) दोबारा भेजे जाने वाले इतिहास से `reasoning_content` हटा देते हैं। OmniRoute इसे सर्वर-साइड कैश से पुनर्स्थापित करता है, ताकि अपस्ट्रीम को दिखाई देने वाला अनुरोध सुसंगत रहे। इश्यू #1628 ने हाइब्रिड मेमोरी/SQLite स्थायित्व प्रस्तुत किया, ताकि प्रक्रिया पुनः आरंभ होने के बाद भी कैश बना रहे।

## आर्किटेक्चर

```
टर्न N (सहायक उत्पन्न करता है):
  → प्रतिक्रिया में reasoning_content + tool_calls शामिल हैं
  → यदि requiresReasoningReplay(प्रदाता, मॉडल): cacheReasoningFromAssistantMessage()
      लिखता है (मेमोरी + DB), प्रत्येक tool_call.id द्वारा कुंजीबद्ध
  → प्रतिक्रिया क्लाइंट को अग्रेषित करें (जो तर्क को बनाए रख सकता है या नहीं भी रख सकता है)

टर्न N+1 (क्लाइंट अनुवर्ती भेजता है):
  → अनुवादक पता लगाता है: requiresReasoningReplay(प्रदाता, मॉडल) === true
  → tool_calls वाले और reasoning_content के बिना प्रत्येक सहायक संदेश के लिए:
      lookupReasoning(toolCalls[0].id) → मेमोरी → DB
      हिट → msg.reasoning_content = कैश किया गया; recordReplay()
      मिस → msg.reasoning_content = "" (पुराने DeepSeek के लिए लेगेसी फ़ॉलबैक)
  → अपस्ट्रीम सुसंगत इतिहास देखता है → कोई 400 नहीं
```

कैप्चर `open-sse/handlers/chatCore.ts` में होता है (दो स्थानों पर, दो `cacheReasoningFromAssistantMessage` कॉल साइटों पर)। रिप्ले `open-sse/translator/index.ts` में स्कीमा कोअरशन के बाद लेकिन डिस्पैच से पहले होता है।

साधारण (गैर-टूल-कॉल) सहायक टर्न को अलग तरह से कुंजीबद्ध किया जाता है: `buildAssistantMessageCacheKey()` सत्र के दायरे के साथ-साथ उस टर्न तक के सामान्यीकृत OpenAI-फ़ॉर्मेट ट्रांसक्रिप्ट को डाइजेस्ट करता है, क्योंकि `tools` मौजूद होने पर DeepSeek को _प्रत्येक_ पिछले टर्न के तर्क की आवश्यकता होती है। Responses-API लक्ष्यों के लिए (उदाहरण के लिए `opencode-go/deepseek-v4-flash`, जो `/responses` पर रूट किया गया है) अपस्ट्रीम बॉडी `input` ले जाती है, `messages` नहीं, इसलिए `translateRequest()` (`open-sse/translator/index.ts`) उस पिवट ट्रांसक्रिप्ट की रिपोर्ट करता है जिसे उसने एक कॉलबैक विकल्प के माध्यम से डाइजेस्ट किया था और कैप्चर साइटें उसी ट्रांसक्रिप्ट को डाइजेस्ट करती हैं। Responses रिप्ले पास हर स्रोत प्रारूप के लिए OpenAI पिवट पर चलता है, इसलिए एंथ्रोपिक मैसेजेस क्लाइंट (Claude → OpenAI → Responses) भी रिप्ले किए जाते हैं।

## स्टोरेज — हाइब्रिड मेमोरी + SQLite

हॉट पाथ एक इन-मेमोरी `Map` (निर्माण-समय के आधार पर LRU) का उपयोग करता है, जो क्रैश रिकवरी और डैशबोर्ड दृश्यता के लिए SQLite टेबल द्वारा समर्थित है।

| परत    | कार्यान्वयन                                     | उद्देश्य                                                |
| ------ | ----------------------------------------------- | ------------------------------------------------------- |
| मेमोरी | `open-sse/services/reasoningCache.ts` में `Map` | तेज़ लुकअप, 200 पर सबसे पुरानी प्रविष्टि हटाता है       |
| DB     | `reasoning_cache` टेबल (`src/lib/db/`)          | पुनः आरंभ के बाद भी बना रहता है, आँकड़े संचालित करता है |

लेखन दोनों में होता है। पठन पहले मेमोरी की जाँच करता है, फिर DB पर फ़ॉलबैक करता है (DB हिट को वापस मेमोरी में प्रोमोट किया जाता है)। DB विफलताएँ घातक नहीं होतीं — इन-मेमोरी कैश हॉट पाथ को सेवा देना जारी रखता है।

**डिफ़ॉल्ट:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- अधिकतम मेमोरी प्रविष्टियाँ: `200` (`MAX_MEMORY_ENTRIES`)
- निष्कासन: सबसे पुराने `createdAt` को पहले हटाया जाता है

## डेटाबेस स्कीमा

माइग्रेशन: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

इंडेक्स: `expires_at`, `provider`, `model`, `created_at`। `expires_at` को यूनिक्स इपोक सेकंड्स के रूप में संग्रहीत किया जाता है; SELECT लेयर `EXPIRES_AT_EPOCH_SQL` के माध्यम से लेगेसी टेक्स्ट मानों को सामान्य करती है।

## प्रदाता / मॉडल पहचान

रीप्ले तब सक्षम होता है जब `requiresReasoningReplay(provider, model)` से `true` मिलता है। यह फ़ंक्शन `open-sse/services/reasoningCache.ts` में दो सूचियों की जाँच करता है।

**प्रदाता ID (सटीक मिलान, अक्षर-आकार से निरपेक्ष):**

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

**मॉडल regex पैटर्न (अक्षर-आकार से निरपेक्ष):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` और `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, वैकल्पिक `-free` प्रत्यय)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

कोई नया सख्त प्रदाता/मॉडल जोड़ने के लिए इनमें से किसी एक सूची में उसे जोड़ना और रीप्ले इंजेक्शन की पुष्टि करने वाला यूनिट टेस्ट लिखना आवश्यक है। PR विवरण में उस सटीक अपस्ट्रीम 400 स्ट्रिंग का उल्लेख होना चाहिए जिसके कारण यह बदलाव किया गया।

## REST API

कैश `src/app/api/cache/reasoning/route.ts` के अंतर्गत दो एंडपॉइंट उपलब्ध कराता है। दोनों के लिए प्रबंधन प्रमाणीकरण (`@/shared/utils/apiAuth` से `isAuthenticated`) आवश्यक है।

| विधि   | एंडपॉइंट                                                  | विवरण                                                            |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | आँकड़े + पृष्ठांकित प्रविष्टियाँ                                 |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | फ़िल्टर की गई सूची (`limit` को `[1, 200]` तक सीमित किया जाता है) |
| DELETE | `/api/cache/reasoning`                                    | सब कुछ साफ़ करें (मेमोरी + DB) और हिट/मिस गणनाएँ रीसेट करें      |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | केवल एक प्रदाता की प्रविष्टियाँ साफ़ करें                        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | एकल प्रविष्टि हटाएँ                                              |

**GET प्रतिक्रिया की संरचना:**

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

## परिचालन संबंधी टिप्पणियाँ

- **सफ़ाई:** `cleanupReasoningCache()` की समय-सीमा समाप्त हो चुकी मेमोरी प्रविष्टियों को हटाता है और `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` चलाता है। स्वास्थ्य-जाँच वर्कर इसे समय-समय पर कॉल करते हैं।
- **क्रैश पुनर्प्राप्ति:** पुनः आरंभ होने के बाद मेमोरी खाली होती है, लेकिन DB में अभी भी वे प्रविष्टियाँ रहती हैं जिनकी समय-सीमा समाप्त नहीं हुई है। किसी दिए गए `tool_call_id` के लिए पहली खोज DB हिट होती है; बाद की खोजें मेमोरी हिट होती हैं।
- **रीज़निंग नहीं, तो कैश नहीं:** जब सहायक संदेश में कोई `reasoning_content` / `reasoning` फ़ील्ड नहीं होता, तो `cacheReasoningFromAssistantMessage` से `0` मिलता है, इसलिए गैर-थिंकिंग प्रतिक्रियाओं पर कोई लागत नहीं आती।
- **लेखन भी नियंत्रित है:** `chatCore.ts` में दोनों कॉल साइटें (गैर-स्ट्रीमिंग और स्ट्रीमिंग) केवल तभी `cacheReasoningFromAssistantMessage()` को कॉल करती हैं जब `requiresReasoningReplay(provider, model)` से `true` मिलता है — यही प्रेडिकेट रीड पक्ष भी जाँचता है। ऐसे इंस्टॉलेशन जो कभी किसी रीप्ले प्रदाता का उपयोग नहीं करते, उन्हें प्रत्येक रीज़निंग-युक्त प्रतिक्रिया पर लेखन, इंडेक्स अपडेट और try/catch की लागत नहीं उठानी पड़ती।
- **गैर-सख्त प्रदाता:** जब `requiresReasoningReplay` से `false` मिलता है और लक्ष्य प्रारूप OpenAI होता है, तो ट्रांसलेटर आउटगोइंग संदेशों से किसी भी `reasoning_content` फ़ील्ड को **हटा देता है** — OpenAI Chat Completions इसे स्वीकार नहीं करता।

## यह भी देखें

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकर, कूलडाउन, मॉडल लॉकआउट
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — अपस्ट्रीम 400 त्रुटियों का निदान
- स्रोत: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- माइग्रेशन: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API रूट: `src/app/api/cache/reasoning/route.ts`
- मूल समस्या: #1628
