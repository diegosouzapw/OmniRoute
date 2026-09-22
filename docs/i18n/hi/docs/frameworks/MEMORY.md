# Memory System (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **प्रामाणिक स्रोत:** `src/lib/memory/` और `src/app/api/memory/`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40 (डिफ़ॉल्ट रूप से बंद + int8 क्वांटाइज़ेशन कैच-अप)

OmniRoute API कुंजी (और वैकल्पिक रूप से सत्र आईडी) द्वारा कुंजीबद्ध स्थायी संवादात्मक मेमोरी प्रदान करता है। हल्के regex पैटर्न मिलान के माध्यम से LLM प्रतिक्रियाओं से मेमोरी स्वचालित रूप से निकाली जाती हैं और बाद के अनुरोधों में एक प्रारंभिक सिस्टम संदेश के रूप में वापस इंजेक्ट की जाती हैं (या उन प्रदाताओं के लिए पहले उपयोगकर्ता संदेश के रूप में, जो सिस्टम भूमिका को अस्वीकार करते हैं)।

> **मेमोरी डिफ़ॉल्ट रूप से बंद है (v3.8.30+)।** `DEFAULT_MEMORY_SETTINGS.enabled` अब
> `false` है (`src/lib/memory/settings.ts`)। मेमोरी सक्षम करने से प्राप्त किए गए संदर्भ के
> `maxTokens` (~2k) तक को **हर** चैट अनुरोध में इंजेक्ट किया जाता है, जिसका
> शुल्क लिया जाता है — यह नए इंस्टॉलेशन और अपना संदर्भ स्वयं प्रबंधित करने वाले
> क्लाइंट के लिए एक अप्रत्याशित लागत हो सकती है। **Settings → Memory** के अंतर्गत स्पष्ट रूप से ऑप्ट इन करें
> (मेमोरी सक्षम होने पर `MemorySkillsTab` टोकन-लागत संबंधी चेतावनी कॉलआउट दिखाता है)।
> कोई क्लाइंट `x-omniroute-no-memory`
> अनुरोध हेडर (`true`/`1`/`yes`) के साथ किसी एक अनुरोध को इससे बाहर रख सकता है — अनुरोध-हेडर तालिका
> [API_REFERENCE.md](../reference/API_REFERENCE.md) में देखें। मेमोरी-रहित अनुरोध
> `memoryOwnerId = null` सेट करता है, जो उस अनुरोध के लिए मेमोरी और कौशल इंजेक्शन
> **दोनों** को अक्षम कर देता है (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)।

मेमोरी **प्रति API कुंजी के दायरे में** होती है, प्रति उपयोगकर्ता नहीं — समान API कुंजी से प्रमाणित हर अनुरोध समान मेमोरी पूल साझा करता है, जिसे वैकल्पिक रूप से `sessionId` द्वारा और सीमित किया जा सकता है।

## आर्किटेक्चर

```
क्लाइंट → /v1/chat/completions (apiKeyInfo को अपस्ट्रीम में निर्धारित किया गया)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # आईडी निकालता है
    → getMemorySettings()                     # कैश की गई सेटिंग
    → shouldInjectMemory(body, {enabled})     # गेट
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + वैकल्पिक वेक्टर
    → injectMemory(body, memories, provider)  # सिस्टम या उपयोगकर्ता संदेश
  → अपस्ट्रीम प्रदाता कॉल
  → प्रतिक्रिया पर: extractFacts(text, apiKeyId, sessionId)  # गैर-अवरोधक
    → setImmediate → createMemory(fact) प्रति मिलान
                   → embed(content) + upsertVector(id, vec)
```

इंजेक्शन और निष्कर्षण कॉल-साइट
`open-sse/handlers/chatCore.ts` में जोड़ी गई हैं (`retrieveMemories`, `injectMemory`
और `extractFacts` खोजें)।

## इंजन आर्किटेक्चर (3-स्तरीय निर्धारण)

Memory Engine उपलब्ध अवसंरचना और सेटिंग के आधार पर रनटाइम के दौरान पुनर्प्राप्ति पथ निर्धारित करता है। तीन स्तर उपलब्ध हैं, जिन्हें प्राथमिकता क्रम में लागू किया जाता है:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  स्तर 0 — कीवर्ड (FTS5)                                    │
  │  प्रोब-संचालित उपलब्धता: जब SQLite बिल्ड इसका समर्थन करता  │
  │  है, तब FTS5 (better-sqlite3 / node:sqlite / bun:sqlite);   │
  │  FTS5-रहित बिल्ड पर अनुपलब्ध (जैसे sql.js/WASM —            │
  │  "no such module: fts5")। strategy = "exact" होने पर या     │
  │  फ़ॉलबैक के रूप में उपयोग; engine-status keyword प्रोब को   │
  │  दर्शाता है।                                                │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  स्तर 1 — एम्बेडेड वेक्टर (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 को db.loadExtension() से लोड किया जाता है।│
  │  Float32 वेक्टर पर KNN ब्रूट-फोर्स। सक्रिय होता है जब:       │
  │   • sqlite-vec loadExtension सफल होता है                    │
  │   • कोई एम्बेडिंग स्रोत उपलब्ध है (remote | static |        │
  │     transformers), जो Float32Array उत्पन्न कर सकता है       │
  │   • vec_memories तालिका मौजूद है (पहले ready() पर निर्मित)  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  स्तर 2 — Qdrant (ऑप्ट-इन बाहरी वेक्टर डेटाबेस)             │
  │  सक्षम होने पर semantic/hybrid के लिए sqlite-vec को बदलता है।│
  │  इसके लिए चालू Qdrant इंस्टेंस + कॉन्फ़िगर किया हुआ         │
  │  host/port आवश्यक है।                                       │
  └─────────────────────────────────────────────────────────────┘
```

अवनयन स्वचालित और पारदर्शी है:

- यदि sqlite-vec लोड होने में विफल रहता है, तो स्तर 1 अनुपलब्ध होता है → स्तर 0 पर फ़ॉलबैक करता है।
- यदि एम्बेडिंग स्रोत कोई त्रुटि लौटाता है, तो स्तर 1, स्तर 0 पर फ़ॉलबैक करता है।
- यदि Qdrant अस्वस्थ है, तो स्तर 2, स्तर 1 पर फ़ॉलबैक करता है (या यदि स्तर 1 भी अनुपलब्ध है, तो स्तर 0 पर)।

## एम्बेडिंग स्रोत

एम्बेडिंग परत (`src/lib/memory/embedding/`) यह निर्धारित करती है कि किस स्रोत का उपयोग किया जाए,
जो `MemorySettingsExtended.embeddingSource` पर आधारित है:

| स्रोत          | विवरण                                                                                 | कुंजी आवश्यक   | कोल्ड स्टार्ट    |
| -------------- | ------------------------------------------------------------------------------------- | -------------- | ---------------- |
| `remote`       | कॉन्फ़िगर किए गए प्रदाता के एम्बेडिंग API (OpenAI, Cohere, आदि) का उपयोग करता है      | हाँ            | कोई नहीं         |
| `static`       | `potion-base-8M` के माध्यम से स्थानीय लुकअप-टेबल एम्बेडिंग (WordPiece + मीन पूलिंग)   | नहीं           | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` के माध्यम से स्थानीय ONNX इनफ़रेंस | नहीं           | ~3s + ~400MB RAM |
| `auto`         | रनटाइम निर्धारण: remote (यदि कुंजी मौजूद है) → static → transformers → null           | निर्भर करता है | निर्भर करता है   |

**`auto` के लिए निर्धारण क्रम:**

1. `listEmbeddingProviders()` में पहला ऐसा प्रदाता खोजें जिसका `hasKey === true` हो → `remote`।
2. यदि `settings.staticEnabled === true` है → `static`।
3. यदि `settings.transformersEnabled === true` है → `transformers`।
4. अन्यथा → `null` (FTS5 कीवर्ड खोज पर अवक्रमित हो जाता है)।

एम्बेडिंग कैश (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` द्वारा
कुंजीबद्ध इन-मेमोरी LRU मैप का उपयोग करता है, जो अधिकतम `MEMORY_EMBEDDING_CACHE_MAX`
प्रविष्टियों (डिफ़ॉल्ट 1000) तक सीमित है और जिसका TTL
`MEMORY_EMBEDDING_CACHE_TTL_MS` (डिफ़ॉल्ट 5 मिनट) है। यह प्रत्येक प्रोसेस जीवनचक्र में
सभी कॉलर्स के बीच साझा होता है।

## हाइब्रिड RRF (k=60)

जब `strategy = "hybrid"` होता है और वेक्टर स्टोर उपलब्ध होता है, तब पुनर्प्राप्ति
FTS5 और वेक्टर परिणामों को मिलाने के लिए Reciprocal Rank Fusion का उपयोग करती है:

```
RRF(d) = Σ  1 / (k + rank_i(d))      जहाँ k = 60 है (MEMORY_RRF_K के माध्यम से कॉन्फ़िगर करने योग्य)
          i
```

विशेष रूप से:

1. FTS5 खोज चलाएँ → रैंक की गई सूची `R_fts` (स्थिति 1..N)।
2. KNN वेक्टर खोज चलाएँ → रैंक की गई सूची `R_vec` (स्थिति 1..M)।
3. प्रत्येक अद्वितीय `memoryId` के लिए:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (सूची में न होने पर 0)।
4. `rrf_score` के आधार पर DESC क्रम में सॉर्ट करें और टोकन बजट वॉक लागू करें।

RRF को विषम पुनर्प्राप्ति प्रणालियों में स्कोर सामान्यीकरण की आवश्यकता के बिना
प्रभावी होने के लिए जाना जाता है। डिफ़ॉल्ट `k=60`, Cormack et al. के मूल शोध-पत्र
से लिया गया है और छोटे कॉर्पस (<10k मेमोरीज़) के लिए अच्छी तरह काम करता है।

## बैकफ़िल (लेज़ी + रीइंडेक्स)

जब एम्बेडिंग मॉडल बदलता है (`embedding_signature` के माध्यम से पता लगाया जाता है),
तब वेक्टर स्टोर को फिर से बनाया जाता है और सभी मौजूदा मेमोरीज़ को
`memories` तालिका में `needs_reindex = 1` के रूप में चिह्नित किया जाता है।

**लेज़ी बैकफ़िल**: अगली पुनर्प्राप्ति पर, वेक्टर प्रविष्टि से रहित किसी भी मेमोरी को
एम्बेड करके खोज चलने से पहले `vec_memories` में सम्मिलित किया जाता है। इससे
स्टार्टअप को अवरुद्ध किए बिना बैकफ़िल लागत वास्तविक अनुरोधों में वितरित हो जाती है।

**स्पष्ट रीइंडेक्स**: `/dashboard/memory` में मौजूद Engine टैब एक
"अभी रीइंडेक्स करें" बटन प्रदान करता है, जो `POST /api/memory/reindex` को कॉल करता है।
हैंडलर `src/lib/memory/reindex.ts` से `runReindexBatch()` को कॉल करता है, जो
प्रत्येक अनुरोध में अधिकतम `limit` लंबित प्रविष्टियों को प्रोसेस करता है। प्रगति को
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) के माध्यम से पोल किया जा सकता है।

`memory_vec_meta` तालिका (माइग्रेशन `083_memory_vec.sql`) इसमें संग्रहीत करती है:

- `active_dim` — वर्तमान वेक्टर आयाम (null = अभी तक कैलिब्रेट नहीं किया गया)।
- `embedding_signature` — परिवर्तनों का पता लगाने के लिए प्रयुक्त `${source}:${model}:${dim}`।
- `last_reset_at` — अंतिम पूर्ण रीसेट का टाइमस्टैम्प।
- `vec_loaded` — sqlite-vec सफलतापूर्वक लोड हुआ या नहीं, इसके लिए 0/1 फ़्लैग।

## सेटिंग्स एक्सटेंशन

`MemorySettingsExtended` में नौ एम्बेडिंग और वेक्टर फ़ील्ड उपलब्ध हैं, जो
`src/shared/schemas/memory.ts` में परिभाषित हैं और `src/lib/db/settings.ts` के माध्यम से स्थायी रूप से संग्रहीत किए जाते हैं:

| फ़ील्ड                   | प्रकार                                             | डिफ़ॉल्ट | विवरण                                                  |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | उपयोग किया जाने वाला एम्बेडिंग स्रोत                   |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` प्रारूप में प्रदाता/मॉडल              |
| `customBaseUrl`          | `string \| null`                                   | `null`   | केवल Memory के लिए OpenAI-संगत एंडपॉइंट बेस URL        |
| `customModelId`          | `string \| null`                                   | `null`   | कस्टम एंडपॉइंट को भेजी जाने वाली मॉडल ID               |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js के लिए ऑप्ट-इन (MiniLM, ~400MB)        |
| `staticEnabled`          | `boolean`                                          | `false`  | स्थिर potion-base-8M स्थानीय मॉडल के लिए ऑप्ट-इन       |
| `rerankEnabled`          | `boolean`                                          | `false`  | पुनः-रैंकिंग चरण सक्षम करें (+200-500ms/req जोड़ता है) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` प्रारूप में पुनः-रैंक प्रदाता/मॉडल    |

`rerankProviderModel` का समाधान `POST /v1/rerank` द्वारा किया जाता है (जिसे लूपबैक पर कॉल किया जाता है), इसलिए यह उस रूट द्वारा स्वीकार की जाने वाली किसी भी चीज़ को स्वीकार करता है: कोई चयनित क्लाउड पुनः-रैंक मॉडल (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) या `<node-prefix>/<model>` के रूप में कोई OpenAI-संगत प्रदाता नोड (उदाहरण के लिए, TEI/Infinity बॉक्स हेतु `skilled-mini/bge-reranker-v2-m3`)। लूपबैक नोड हमेशा पात्र होते हैं; किसी अन्य होस्ट (LAN, Tailscale) पर स्थित नोड के लिए अतिरिक्त रूप से `RERANK_REMOTE_PROVIDER_NODES` फ़ीचर फ़्लैग आवश्यक है और उसे प्रदाता की आउटबाउंड URL नीति में सफल होना चाहिए—[फ़ीचर फ़्लैग](../reference/FEATURE_FLAGS.md) देखें। डैशबोर्ड चयनकर्ता में चयनित प्रदाताओं के साथ स्थानीय नोड सूचीबद्ध होते हैं; किसी भी मान्य `provider/model` स्ट्रिंग को `PUT /api/settings/memory` के माध्यम से सीधे सेट किया जा सकता है।
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | उपयोग किया जाने वाला वेक्टर बैकएंड |

इन्हें `GET /PUT /api/settings/memory` (स्कीमा `MemorySettingsExtendedSchema`) के माध्यम से उपलब्ध कराया जाता है।

`remote` स्रोत के लिए, Memory वैकल्पिक `customBaseUrl` और
`customModelId` सेटिंग्स को भी स्वीकार करता है। ये दोनों मिलकर वैश्विक एम्बेडिंग रजिस्ट्री को बदले बिना किसी OpenAI-संगत `/embeddings`
एंडपॉइंट और मॉडल का चयन करते हैं। उपयोग से पहले एंडपॉइंट को
सामान्यीकृत किया जाता है और प्रदाता की आउटबाउंड URL नीति द्वारा जाँचा जाता है: HTTP(S)
आवश्यक है, एम्बेड किए गए क्रेडेंशियल और क्वेरी स्ट्रिंग अस्वीकार कर दिए जाते हैं, और क्लाउड-मेटाडेटा
पते अवरुद्ध रहते हैं। रिक्त मान चयनित रजिस्ट्री प्रदाता को बनाए रखते हैं। डैशबोर्ड को
लौटाई गई त्रुटियों को सुरक्षित बनाया जाता है और एंडपॉइंट क्रेडेंशियल कभी लॉग नहीं किए जाते।

> **TODO (D20):** `global` स्कोप (सभी API कुंजियों के बीच मेमोरी साझा करना) इस
> रिलीज़ में लागू नहीं किया गया है। इसके लिए स्कीमा में बदलाव और वैश्विक पुनर्प्राप्ति
> पथ आवश्यक है। इसे अलग से ट्रैक करें।

## स्टोरेज परतें

### प्राथमिक: SQLite (`memories` तालिका)

माइग्रेशन `015_create_memories.sql` द्वारा बनाई गई:

| कॉलम                        | प्रकार             | टिप्पणियाँ                                                                          |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` के माध्यम से जनरेट किया गया UUID                              |
| `api_key_id`                | `TEXT NOT NULL`    | स्वामी API कुंजी                                                                    |
| `session_id`                | `TEXT`             | वैकल्पिक प्रति-वार्तालाप स्कोप                                                      |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` में से एक                           |
| `key`                       | `TEXT`             | स्थिर अपसर्ट कुंजी, उदाहरणार्थ `preference:i_prefer_python`                         |
| `content`                   | `TEXT NOT NULL`    | वास्तविक तथ्य टेक्स्ट                                                               |
| `metadata`                  | `TEXT`             | JSON ब्लॉब (श्रेणी, extractedAt, स्रोत, ...)                                        |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 स्ट्रिंग                                                                   |
| `expires_at`                | `TEXT`             | वैकल्पिक समाप्ति; `NULL` का अर्थ स्थायी है                                          |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowids को जोड़ने के लिए `023_fix_memory_fts_uuid.sql` द्वारा जोड़ा गया |

इंडेक्स: `api_key_id`, `session_id`, `type`, `expires_at`, और अद्वितीय
`memory_id` इंडेक्स।

**अपसर्ट सिमेंटिक्स**: `createMemory()` समान
`(api_key_id, key)` वाली मौजूदा पंक्ति खोजता है और मिलने पर उसे उसी स्थान पर अपडेट करता है (`metadata` को
शैलो स्प्रेड के माध्यम से मर्ज करते हुए)। इससे बार-बार आने वाले
वरीयता कथनों के कारण तालिका अनियंत्रित रूप से बढ़ने से बचती है।

### पूर्ण-पाठ खोज (`memory_fts` वर्चुअल तालिका)

`022_add_memory_fts5.sql`, `content` और
`key` पर एक FTS5 वर्चुअल तालिका बनाता है। `023_fix_memory_fts_uuid.sql` उस वास्तविक समस्या को ठीक करता है, जिसमें UUID
प्राथमिक कुंजी FTS5 के पूर्णांक rowid से जुड़ नहीं पाती थी — माइग्रेशन
`memory_id` कॉलम जोड़ता है, FTS तालिका को फिर से बनाता है और ऐसे ट्रिगर
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) जोड़ता है जो INSERT, DELETE और UPDATE पर FTS को सिंक में रखते हैं।

`retrieval.ts` द्वारा `semantic` और `hybrid` रणनीतियों के लिए उपयोग किया जाता है (नीचे देखें)।
पुनर्प्राप्ति कोड `hasTable("memory_fts")` से सुरक्षा जाँच करता है और यदि FTS तालिका अनुपस्थित हो या FTS क्वेरी त्रुटि दे, तो
कालानुक्रमिक क्रम पर फ़ॉलबैक करता है।

### वैकल्पिक: Qdrant (वेक्टर स्टोर टियर 2)

`src/lib/memory/qdrant.ts`, टियर 2
वेक्टर स्टोर के रूप में एक वैकल्पिक Qdrant एकीकरण लागू करता है। पुनर्प्राप्ति केवल तभी Qdrant की ओर रूट होती है, जब इंजन चयनकर्ता
`memoryVectorStore === "qdrant"` हो — डिफ़ॉल्ट `"auto"` (और `"sqlite-vec"`)
Qdrant को **कभी नहीं** चुनते। Engine टैब का टॉगल `qdrantEnabled` और
`memoryVectorStore` **दोनों** को एक साथ सेट करता है: सक्षम करने पर Qdrant प्राथमिक स्टोर बन जाता है और अक्षम करने पर
यह `"auto"` पर रीसेट हो जाता है (#5597 — उस सुधार से पहले, सक्षम करना निष्क्रिय था क्योंकि कोई भी
इंजन चयनकर्ता में मान नहीं लिखता था)। यदि Qdrant पहुँच से बाहर हो या कुछ न लौटाए, तो पुनर्प्राप्ति
sqlite-vec → FTS5 पर फ़ॉलबैक करती है।

- `upsertSemanticMemoryPoint()` — कॉन्फ़िगर किए गए एम्बेडिंग मॉडल के साथ
  `key + content` को एम्बेड करता है, सुनिश्चित करता है कि कलेक्शन मौजूद हो (पहले उपयोग पर
  कोसाइन-दूरी वाले वेक्टर बनाता है), और पेलोड `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` के साथ एक पॉइंट अपसर्ट करता है।
- `searchSemanticMemory(query, topK, scope)` — क्वेरी को एम्बेड करता है, कलेक्शन में
  `kind = "omniroute_memory"` द्वारा फ़िल्टर करके और वैकल्पिक रूप से
  `apiKeyId` / `sessionId` द्वारा खोज करता है। `topK` को `[1, 20]` तक सीमित करता है।
- `deleteSemanticMemoryPoint(id)` — एकल पॉइंट हटाता है। SQLite पंक्ति हटाए जाने
  के बाद `deleteMemory()` द्वारा कॉल किया जाता है (D15)।
- `cleanupSemanticMemoryPoints({retentionDays})` — उन पॉइंट्स को एक साथ हटाता है जिनका
  `expiresAtUnix` बीत चुका है या जिनका `createdAtUnix`, रिटेंशन कटऑफ़ से पुराना है।
  पहले गणना करता है ताकि डैशबोर्ड वास्तविक संख्याएँ दिखा सके।
- `checkQdrantHealth()` — लेटेंसी सहित `GET /readyz` हेल्थ प्रोब।

सेटिंग्स UI, `/dashboard/memory` के **Engine टैब** में Qdrant कॉन्फ़िगरेशन, हेल्थ चेक, सिमेंटिक खोज परीक्षण
और क्लीनअप उपलब्ध कराता है। `src/app/api/settings/qdrant/` के अंतर्गत संबंधित
सभी रूट v3.8.6 से जुड़े हुए हैं:

| रूट                                     | विधि          | विवरण                                |
| --------------------------------------- | ------------- | ------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant सेटिंग्स पढ़ें / अपडेट करें   |
| `/api/settings/qdrant/health`           | `GET`         | लाइवनेस प्रोब + लेटेंसी              |
| `/api/settings/qdrant/search`           | `POST`        | सिमेंटिक खोज परीक्षण                 |
| `/api/settings/qdrant/cleanup`          | `POST`        | समय-सीमा समाप्त / पुराने पॉइंट हटाएँ |
| `/api/settings/qdrant/embedding-models` | `GET`         | उपलब्ध एम्बेडिंग मॉडल सूचीबद्ध करें  |

**व्यवहार संबंधी टिप्पणियाँ (क्या अपेक्षा करें):**

- **इंजन चयन** — Engine टैब में Qdrant को सक्षम करने पर यह प्राथमिक
  स्टोर बन जाता है (`memoryVectorStore="qdrant"` सेट करता है); अक्षम करने पर इसे `"auto"` पर रीसेट करता है (#5597)।
- **कोई बैक-फ़िल नहीं** — केवल Qdrant सक्षम होने के **बाद** बनाई/अपडेट की गई मेमोरीज़ ही
  उसमें लिखी जाती हैं (फ़ायर-एंड-फ़ॉरगेट ड्यूल-राइट)। पहले से मौजूद SQLite मेमोरीज़ को
  माइग्रेट **नहीं** किया जाता; "अभी पुनः इंडेक्स करें" केवल sqlite-vec इंडेक्स को फिर से बनाता है, Qdrant को नहीं।
- **वेक्टर डायमेंशन स्वतः पहचाना जाता है** — पहले उपयोग पर वास्तविक एम्बेडिंग से; भरने के लिए
  कोई डायमेंशन फ़ील्ड नहीं है। कलेक्शन मौजूद होने के बाद एम्बेडिंग मॉडल बदलना
  स्वतः **नहीं** संभाला जाता: मौजूदा कलेक्शन अपरिवर्तित रहता है, डायमेंशन-
  असंगत राइट/खोज विफल होते हैं और sqlite-vec पर फ़ॉलबैक करते हैं। एम्बेडर बदलने के लिए कलेक्शन को
  फिर से बनाएँ (नया नाम दें या उसे Qdrant में हटा दें)।
- **दूरी मेट्रिक** — हमेशा **Cosine** (कलेक्शन बनाते समय हार्डकोड किया गया; कॉन्फ़िगर
  नहीं किया जा सकता)।
- **प्रमाणीकरण** — केवल API कुंजी (`api-key` हेडर के रूप में भेजी जाती है; बिना प्रमाणीकरण वाले
  स्थानीय Docker के लिए वैकल्पिक)। JWT/RBAC का उपयोग नहीं किया जाता।
- **कॉन्फ़िगरेशन फ़ील्ड** — UI में `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` उपलब्ध हैं। `vectorSize` / `hnswEfConstruct` केवल env/DB में उपलब्ध हैं और कलेक्शन
  बनाने के लिए `vectorSize` का उपयोग नहीं किया जाता (डायमेंशन एम्बेडिंग से आता है)।

### वेक्टर क्वांटाइज़ेशन (int8 — ऑप्ट-इन, दोनों बैकएंड)

दोनों वेक्टर बैकएंड, थोड़ी रिकॉल लागत पर संग्रहीत वेक्टरों की मेमोरी
फ़ुटप्रिंट को कम करने के लिए (~Float32 से 4× छोटा) **ऑप्ट-इन int8 क्वांटाइज़ेशन** का समर्थन करते हैं।
दोनों पर डिफ़ॉल्ट रूप से यह **बंद** रहता है — स्पष्ट रूप से सक्षम किए बिना वेक्टर पूर्ण-परिशुद्धता में रहते
हैं।

| बैकएंड     | सेटिंग                          | प्रकार                         | डिफ़ॉल्ट | कहाँ पढ़ा जाता है                                           |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB कुंजी) | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** को `qdrantQuantization` सेटिंग
  कुंजी के माध्यम से प्रति इंस्टेंस कॉन्फ़िगर किया जाता है (`PUT /api/settings/qdrant` पर `quantization` फ़ील्ड के रूप में उपलब्ध)। जब
  `"int8"` हो, तब `buildQuantizationConfig()` स्केलर क्वांटाइज़ेशन
  (`always_ram`, क्वांटाइल `0.99`) का अनुरोध करता है और खोजों में `rescore: true` सक्षम होता है, ताकि
  पूर्ण-परिशुद्धता वाले वेक्टर int8 उम्मीदवार सेट को परिष्कृत कर सकें।
- **sqlite-vec** क्वांटाइज़ेशन केवल **एनवायरनमेंट के माध्यम से** उपलब्ध है (DB सेटिंग नहीं): स्थानीय
  वेक्टरों को `vec_quantize_int8(?, 'unit')` के माध्यम से `int8[dim]`
  कॉलम के रूप में संग्रहीत करने के लिए `MEMORY_VEC_QUANTIZATION=int8` सेट करें। चुना गया मोड
  `embedding_signature` में शामिल किया जाता है (`:int8` प्रत्यय), इसलिए मोड बदलने पर
  `vec_memories` टेबल का पूर्ण रीइंडेक्स शुरू होता है — वही लेज़ी-बैकफ़िल पथ जिसका उपयोग
  एम्बेडिंग मॉडल बदलने पर किया जाता है।

## मेमोरी प्रकार

`MemoryType` (`src/lib/memory/types.ts`):

| प्रकार       | उपयोग                                                                         |
| ------------ | ----------------------------------------------------------------------------- |
| `factual`    | प्राथमिकताएँ, उपयोगकर्ता से जुड़े स्थिर तथ्य, व्यवहार संबंधी पैटर्न           |
| `episodic`   | किसी विशिष्ट क्षण से जुड़े निर्णय ("मैंने Postgres चुना")                     |
| `procedural` | वर्कफ़्लो / कैसे-करें मेमोरी (आरक्षित; वर्तमान में कोई ऑटो-एक्सट्रैक्टर नहीं) |
| `semantic`   | वेक्टर-स्टोर प्रविष्टियों के लिए आरक्षित                                      |

`MemoryConfig` की पुनर्प्राप्ति रणनीति `exact`, `semantic`, या `hybrid` में से एक होती है,
और स्कोप `session`, `apiKey`, या `global` में से एक होता है। `getMemorySettings()` से
डिफ़ॉल्ट स्कोप `apiKey` है।

## तथ्य निष्कर्षण (`extraction.ts`)

निष्कर्षण **regex-आधारित** है, LLM-आधारित नहीं — यह `setImmediate()` के साथ
इन-प्रोसेस चलता है, इसलिए यह प्रतिक्रिया स्ट्रीम को कभी ब्लॉक नहीं करता:

- **प्राथमिकता पैटर्न** → `MemoryType.FACTUAL`
  (उदा. `मैं … पसंद करता हूँ`, `मुझे … बहुत पसंद है`, `मेरा पसंदीदा … है`, `मुझे … से नफ़रत है`)
- **निर्णय पैटर्न** → `MemoryType.EPISODIC`
  (उदा. `मैं … का उपयोग करूँगा`, `मैंने … चुना`, `मैंने … अपनाया`, `मैं … अपनाने जा रहा हूँ`)
- **व्यवहार पैटर्न** → `MemoryType.FACTUAL`
  (उदा. `मैं आमतौर पर …`, `मैं हमेशा …`, `मेरी प्रवृत्ति … की होती है`)

प्रत्येक मिलान को सैनिटाइज़ किया जाता है (`trim`, व्हाइटस्पेस-संक्षेपण, अधिकतम 500 वर्ण),
एक स्थिर `factKey(category, content)` के माध्यम से बैच के भीतर डीडुप्लिकेट किया जाता है, और
`createMemory()` के माध्यम से मेटाडेटा
`{category, extractedAt, source: "llm_response"}` के साथ संग्रहीत किया जाता है। इनपुट टेक्स्ट
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) तक सीमित है — अधिक लंबा होने पर टेक्स्ट के **अंतिम भाग**
का उपयोग किया जाता है, ताकि सहायक की सबसे हाल की सामग्री हमेशा शामिल हो।

`extractFactsFromText(text)` को परीक्षणों के लिए एक्सपोर्ट किया गया है और यह तथ्यों को संग्रहीत
किए बिना संरचित तथ्य लौटाता है।

## पुनर्प्राप्ति (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` मुख्य प्रवेश बिंदु है। यह:

1. `MemoryConfigSchema` के माध्यम से कॉन्फ़िगरेशन को सामान्यीकृत और सत्यापित करता है।
2. जब `enabled` false हो या `maxTokens <= 0` हो, तो तुरंत `[]` लौटाता है।
3. `maxTokens` को `[1, 8000]` की सीमा में रखता है।
4. पता लगाता है कि आधुनिक `memories` तालिका मौजूद है या नहीं (विरासत `memory`
   तालिका की तुलना में), ताकि पुराने डेटाबेस काम करते रहें।
5. समाप्ति सुरक्षा
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), वैकल्पिक
   सेशन स्कोप और वैकल्पिक `retentionDays` कटऑफ़ के साथ मूल क्वेरी बनाता है।
6. रणनीति के आधार पर शाखा चुनता है:
   - **`exact`** (डिफ़ॉल्ट): कालानुक्रमिक `ORDER BY created_at DESC LIMIT 100`।
   - **`semantic`**: यदि `config.query` और `memory_fts` मौजूद हों, तो
     `memory_fts MATCH ?` को JOIN करता है और FTS रैंक के अनुसार क्रमबद्ध करता है; जब FTS
     0 पंक्तियाँ लौटाए, तो कालानुक्रमिक क्रम पर वापस आ जाता है।
   - **`hybrid`**: FTS परिणामों (अधिक प्रासंगिकता) और कालानुक्रमिक सेट का
     यूनियन, जिसे id के आधार पर डीडुप्लिकेट किया जाता है।
7. क्वेरी दिए जाने पर `content`, `key`, और `metadata` JSON पर
   कीवर्ड प्रासंगिकता स्कोर (`getRelevanceScore`) की गणना करता है। शून्य स्कोर वाली
   पंक्तियाँ फ़िल्टर कर दी जाती हैं।
8. पहले स्कोर के अवरोही क्रम में, फिर `createdAt` के अवरोही क्रम में सॉर्ट करता है।
9. रैंक की गई सूची से क्रमशः गुजरता है और प्रविष्टियों को तब तक स्वीकार करता है, जब तक चालू
   `estimateTokens(content)` (लगभग `length / 4`) बजट के भीतर रहता है। कोई भी मिलान होने पर
   हमेशा कम-से-कम एक प्रविष्टि लौटाता है।

`estimateTokens` एक्सपोर्ट किया गया है और इसका उपयोग पुनर्प्राप्ति, सारांशीकरण तथा MCP
`omniroute_memory_search` टूल द्वारा किया जाता है।

## इंजेक्शन (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. सभी मेमोरी सामग्रियों को एकल `Memory context: …` स्ट्रिंग में जोड़ता है।
2. प्रदाता के नाम के आधार पर एक रणनीति चुनता है:
   - **सिस्टम संदेश** (OpenAI, Anthropic, Gemini, … के लिए डिफ़ॉल्ट) — किसी भी मौजूदा सिस्टम संदेश से पहले
     एक `{role: "system", content: memoryText}` जोड़ता है, ताकि उपयोगकर्ता के सिस्टम प्रॉम्प्ट को फिर भी प्राथमिकता मिले।
   - **उपयोगकर्ता संदेश** (फ़ॉलबैक) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` में शामिल प्रदाताओं के लिए:
     `o1`, `o1-mini`, `o1-preview`, `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`। ये सिस्टम भूमिका को
     अस्वीकार करते हैं और अन्यथा 400 त्रुटि देंगे (GLM/Zhipu के लिए समस्या #1701 देखें)।
3. `memory.injection.injected` के अंतर्गत संख्या, रणनीति और मॉडल को लॉग करता है।

`providerSupportsSystemMessage(provider)` उन कॉलर के लिए एक्सपोर्ट किया जाता है जिन्हें
अपने रूटिंग निर्णय स्वयं लेने की आवश्यकता होती है। सुरक्षा के लिए अज्ञात प्रदाताओं में डिफ़ॉल्ट रूप से `true`
(सिस्टम भूमिका अनुमत) होता है।

## सेटिंग्स (`settings.ts`)

मेमोरी कॉन्फ़िगरेशन env vars में नहीं, बल्कि **DB सेटिंग्स तालिका में संग्रहीत होता है**।
`getMemorySettings()`, `getSettings()` से पढ़ता है और परिणाम को
प्रोसेस के भीतर कैश करता है; लिखने के बाद सेटिंग्स PUT
रूट द्वारा `invalidateMemorySettingsCache()` को कॉल किया जाता है।

### लीगेसी फ़ील्ड (सभी संस्करण)

| DB कुंजी              | प्रकार  | डिफ़ॉल्ट                                              | UI नियंत्रण                                                 |
| --------------------- | ------- | ----------------------------------------------------- | ----------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 से डिफ़ॉल्ट रूप से बंद)              | मेमोरी चालू/बंद                                             |
| `memoryMaxTokens`     | integer | `2000` (सीमा `0–16000`)                               | इंजेक्शन के लिए टोकन बजट                                    |
| `memoryRetentionDays` | integer | `30` (सीमा `1–365`)                                   | अवधारण अवधि                                                 |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` में से एक) | पुनर्प्राप्ति रणनीति                                        |
| `skillsEnabled`       | boolean | `false`                                               | प्रति-कुंजी कौशल इंजेक्शन को टॉगल करता है (SKILLS.md देखें) |

नोट: UI रणनीति `"recent"`, `toMemoryRetrievalConfig()` के माध्यम से आंतरिक `"exact"` पुनर्प्राप्ति
रणनीति से मैप होती है (कालानुक्रमिक क्रम)।

### नए फ़ील्ड (v3.8.6, योजना 21 D9)

फ़ील्ड विवरणों के लिए ऊपर दिया गया "सेटिंग्स एक्सटेंशन" अनुभाग भी देखें।

| DB कुंजी                    | API फ़ील्ड               | डिफ़ॉल्ट |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-संबंधित DB कुंजियाँ (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` डिफ़ॉल्ट `"omniroute_memory"`,
`qdrantEmbeddingModel` डिफ़ॉल्ट `"openai/text-embedding-3-small"`) को
`qdrant.ts` में `normalizeQdrantConfig()` द्वारा पढ़ा जाता है।

### एनवायरनमेंट वेरिएबल (v3.8.6)

छह वैकल्पिक env vars इंजन के रनटाइम व्यवहार को समायोजित करते हैं (`.env.example` में प्रलेखित):

| वेरिएबल                         | डिफ़ॉल्ट                   | विवरण                                                                                                                                                        |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | एम्बेडिंग कैश TTL (5 मिनट)                                                                                                                                   |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | एम्बेडिंग LRU कैश में प्रविष्टियों की अधिकतम संख्या                                                                                                          |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js मॉडल के लिए HF रिपॉज़िटरी                                                                                                                    |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | स्टैटिक potion मॉडल के लिए HF रिपॉज़िटरी                                                                                                                     |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | डाउनलोड किए गए मॉडल कहाँ संग्रहीत करने हैं                                                                                                                   |
| `MEMORY_VEC_TOP_K`              | `20`                       | वेक्टर खोज के लिए डिफ़ॉल्ट top-K                                                                                                                             |
| `MEMORY_RRF_K`                  | `60`                       | हाइब्रिड खोज के लिए RRF k स्थिरांक                                                                                                                           |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | स्थानीय sqlite-vec वेक्टरों को क्वांटाइज़ करके संग्रहीत करने के लिए `int8` पर सेट करें (~4× छोटे; ऑप्ट-इन)। मोड बदलने पर पुनः इंडेक्स करना अनिवार्य होता है। |

## सारांशीकरण (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` तब पुराने
कंटेंट को संक्षिप्त करता है, जब किसी कुंजी की मेमोरीज़ में चल रहा कुल टोकन
बजट से अधिक हो जाता है। यह `created_at` के अनुसार DESC क्रम में पंक्तियों पर
पुनरावृत्ति करता है, समा सकने वाली पंक्तियों को रखता है, और शेष के `content`
को मूल कंटेंट के पहले तीन वाक्यों से उसी स्थान पर बदल देता है। `tokensSaved`,
पुराने और नए कंटेंट के बीच `estimateTokens` का अंतर है।

यह रूटीन वर्तमान चैट पाइपलाइन में **उपलब्ध है, लेकिन स्वचालित रूप से कॉल नहीं किया जाता** —
यदि आपको निरंतर संक्षिप्तीकरण चाहिए, तो इसे cron, एडमिन कार्रवाई, या
`MemoryConfig.autoSummarize` ग्लू से कॉल करें। डेटा हानि एकतरफ़ा है: मूल टेक्स्ट
ओवरराइट हो जाता है।

## REST API

सभी एंडपॉइंट्स के लिए प्रबंधन प्रमाणीकरण (`requireManagementAuth`) आवश्यक है।

### मुख्य मेमोरी एंडपॉइंट्स (मौजूदा + अपडेट किए गए)

| विधि     | पथ                   | विवरण                                                                                                                                                                                        |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | फ़िल्टर के साथ पृष्ठांकित सूची: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`। प्रतिक्रिया में `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` शामिल हैं  |
| `POST`   | `/api/memory`        | प्रविष्टि बनाएँ (Zod-सत्यापित: `content`, `key`, वैकल्पिक `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`)। `createMemory()` को कॉल करता है, जो `(apiKeyId, key)` पर अपसर्ट करता है |
| `GET`    | `/api/memory/[id]`   | UUID द्वारा एकल प्रविष्टि प्राप्त करें                                                                                                                                                       |
| `PUT`    | `/api/memory/[id]`   | प्रविष्टि फ़ील्ड (`type`, `key`, `content`, `metadata`) अपडेट करें। बॉडी: `MemoryUpdatePutSchema`। एम्बेडिंग स्रोत उपलब्ध होने पर वेक्टर भी सिंक करता है।                                    |
| `DELETE` | `/api/memory/[id]`   | प्रविष्टि हटाएँ; `vec_memories` (D15) और सर्वोत्तम प्रयास के आधार पर Qdrant से भी हटाता है। अनुपलब्ध होने पर 404 लौटाता है।                                                                  |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` चलाता है — राउंड-ट्रिप बनाएँ→सूचीबद्ध करें→हटाएँ। `{working, latencyMs, error?}` लौटाता है                                                        |

### नए मेमोरी इंजन एंडपॉइंट्स (योजना 21)

| विधि   | पथ                                | विवरण                                                                                                                                                               |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` का ड्राई-रन — स्कोर, टियर और टोकन के साथ रैंक किए गए परिणाम लौटाता है। बॉडी: `RetrievePreviewSchema`। मेमोरीज़ को इंजेक्ट या संशोधित नहीं करता।  |
| `GET`  | `/api/memory/embedding-providers` | एम्बेडिंग मॉडल वाले प्रोवाइडर्स सूचीबद्ध करता है और दर्शाता है कि किनके लिए API कुंजी कॉन्फ़िगर की गई है।                                                           |
| `GET`  | `/api/memory/engine-status`       | इंजन की पूर्ण स्थिति लौटाता है: कीवर्ड टियर, एम्बेडिंग रिज़ॉल्यूशन, वेक्टर स्टोर आँकड़े, Qdrant स्वास्थ्य, रीरैंक कॉन्फ़िगरेशन। संरचना: `MemoryEngineStatusSchema`। |
| `POST` | `/api/memory/summarize`           | मेमोरी संक्षिप्तीकरण मैन्युअल रूप से ट्रिगर करें। बॉडी: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`)। `{candidates, tokensSaved}` लौटाता है।    |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` वाली मेमोरीज़ के लिए वेक्टर रीइंडेक्स ट्रिगर करें। बॉडी: `MemoryReindexSchema` (`force`)। `{started, pending}` लौटाता है।                         |

### सेटिंग्स एंडपॉइंट्स

| विधि   | पथ                                      | विवरण                                                                                                          |
| ------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | वर्तमान सामान्यीकृत `MemorySettingsExtended` (7 नए फ़ील्ड + लेगेसी)                                            |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` का कोई भी फ़ील्ड अपडेट करें (कुल 12 फ़ील्ड)                                     |
| `GET`  | `/api/settings/qdrant`                  | वर्तमान Qdrant सेटिंग्स (`QdrantSettingsSchema`)                                                               |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant सेटिंग्स अपडेट करें। बॉडी: `QdrantSettingsUpdateSchema`। `apiKey` = खाली स्ट्रिंग कुंजी को हटा देती है। |
| `GET`  | `/api/settings/qdrant/health`           | कॉन्फ़िगर किए गए Qdrant इंस्टेंस के विरुद्ध लाइवनेस प्रोब। `QdrantHealthResultSchema` लौटाता है।               |
| `POST` | `/api/settings/qdrant/search`           | Qdrant के विरुद्ध सिमैंटिक खोज परीक्षण। बॉडी: `QdrantSearchSchema` (`query`, `topK`)।                          |
| `POST` | `/api/settings/qdrant/cleanup`          | समाप्त हो चुकी / पुरानी मेमोरीज़ के Qdrant पॉइंट्स हटाएँ।                                                      |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant के लिए उपलब्ध एम्बेडिंग मॉडल सूचीबद्ध करें।                                                             |

`/api/memory` सूची क्वेरी या तो `page`-आधारित पृष्ठांकन
(`parsePaginationParams`) **या** रॉ `offset` का समर्थन करती है — जब `offset`
मौजूद होता है, तो उसे प्राथमिकता दी जाती है और प्रतिक्रिया संरचना के लिए एक व्युत्पन्न
`page` की गणना की जाती है।

## MCP टूल्स (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP सर्वर सक्षम होने पर, तीन मेमोरी टूल पंजीकृत किए जाते हैं:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` को रैप करता है। v3.8.6 (D16) से, `strategy` को
  `"exact"` के रूप में हार्डकोड करने के बजाय `getMemorySettings()` से पढ़ा
  जाता है। यदि `query` प्रदान की गई है और `strategy`, `semantic` या `hybrid`
  है, तो उपलब्ध होने पर वेक्टर स्टोर का उपयोग किया जाता है।
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` को रैप करता है। केवल 4 मानक प्रकार स्वीकार करता है:
  `factual`, `episodic`, `procedural`, `semantic` (D17)।
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → मेल खाने वाली
  प्रविष्टियों को सूचीबद्ध करता है, वैकल्पिक रूप से निर्माण-पूर्व टाइमस्टैम्प के
  आधार पर फ़िल्टर करता है, फिर प्रत्येक को `deleteMemory()` के माध्यम से हटाता
  है (जो sqlite-vec + Qdrant से वेक्टर भी हटाता है)।

ट्रांसपोर्ट और स्कोप के विवरण के लिए [MCP-SERVER.md](./MCP-SERVER.md) देखें।

## डैशबोर्ड (मेमोरी स्टूडियो)

`src/app/(dashboard)/dashboard/memory/page.tsx` अब एक **3-टैब स्टूडियो** है:

### टैब: मेमोरीज़

- कॉन्सेप्ट कार्ड (सिकोड़ा जा सकने वाला "यह कैसे काम करता है" विवरण)।
- रियल-टाइम सूची, खोज और पेजिनेशन (300 ms डिबाउंस)।
- प्रकार फ़िल्टर (`factual` / `episodic` / `procedural` / `semantic` / सभी)।
- मेमोरी जोड़ने का मॉडल (कुंजी, सामग्री, प्रकार)।
- इनलाइन संपादन (पेंसिल बटन → `PUT /api/memory/[id]`)।
- प्रत्येक पंक्ति के लिए हटाने का विकल्प (पुष्टिकरण डायलॉग के साथ)।
- वर्तमान पेज का JSON निर्यात; फ़ाइल पिकर के माध्यम से JSON आयात।
- आँकड़ा कार्ड: `totalEntries`, `tokensUsed`, `hitRate`।
- "पुरानी प्रविष्टियाँ संक्षिप्त करें" बटन → `POST /api/memory/summarize` (ड्राई-रन
  पहले उम्मीदवारों की संख्या दिखाता है, फिर पुष्टि करता है)।
- `GET /api/memory/health` द्वारा संचालित हरा/लाल स्वास्थ्य संकेतक।

### टैब: प्लेग्राउंड

- क्वेरी इनपुट + रणनीति चयनकर्ता (सटीक / सिमेंटिक / हाइब्रिड) + टोकन बजट।
- "सिम्युलेट करें" → `POST /api/memory/retrieve-preview` — रैंक किए गए परिणाम
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` के साथ दिखाता है।
- रिज़ॉल्यूशन पैनल दिखाता है कि किस एम्बेडिंग स्रोत / वेक्टर स्टोर का उपयोग किया
  गया और फ़ॉलबैक हुआ या नहीं।

### टैब: इंजन

- इंजन स्थिति पैनल (कीवर्ड FTS5 चिप, एम्बेडिंग चिप, वेक्टर स्टोर चिप,
  Qdrant स्वास्थ्य चिप, री-रैंक चिप)।
- "अभी रीइंडेक्स करें" बटन → `POST /api/memory/reindex`।
- एम्बेडिंग स्रोत चयनकर्ता (ऑटो / रिमोट / स्टैटिक / ट्रांसफ़ॉर्मर्स + टॉगल)।
- Qdrant कॉन्फ़िगरेशन कार्ड (सक्षम करने का टॉगल, होस्ट/पोर्ट/कलेक्शन/कुंजी,
  कनेक्शन परीक्षण, सिमेंटिक खोज परीक्षण, क्लीनअप)।
- री-रैंक कॉन्फ़िगरेशन कार्ड (सक्षम करने का टॉगल, प्रदाता/मॉडल चयनकर्ता)।

मेमोरी और Qdrant सेटिंग्स, लेगेसी/ग्लोबल सेटिंग्स इंटरफ़ेस के लिए
`/dashboard/settings → मेमोरी और कौशल` (`MemorySkillsTab.tsx`) के अंतर्गत
भी उपलब्ध हैं।

## कैशिंग

`src/lib/memory/store.ts`, `getMemory(id)` रीड के लिए इन-प्रोसेस LRU-जैसा कैश
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, जिसमें 20 %
सबसे पुरानी प्रविष्टियाँ हटाई जाती हैं) रखता है, साथ ही एक सामान्य कुंजी/मान
`memoryCache` परत (`src/lib/memory/cache.ts`) भी रखता है, जिसमें अपने स्कोप वाला
कैश चाहने वाले कॉलर्स द्वारा उपयोग की जाने वाली `get`/`set`/`invalidate`
विधियाँ हैं (1 000-प्रविष्टि LRU, डिफ़ॉल्ट TTL 5 min)।

## गोपनीयता और जीवनचक्र

- मेमोरी का स्वामित्व API कुंजी id के पास होता है (`chatCore.ts` में
  `resolveMemoryOwnerId`)। `apiKeyInfo.id` के बिना न तो पुनर्प्राप्ति, न
  इंजेक्शन और न ही निष्कर्षण चलता है।
- भविष्य के `expires_at` वाली प्रविष्टियाँ पुनर्प्राप्ति से फ़िल्टर कर दी जाती
  हैं; `retentionDays` से अधिक पुरानी प्रविष्टियाँ `retrieveMemories` में
  `created_at >= cutoff` क्लॉज़ द्वारा बाहर कर दी जाती हैं।
- स्थायी रूप से हटाने के लिए, `DELETE /api/memory/[id]` या
  `omniroute_memory_clear` का उपयोग करें।
- निष्कर्षण `setImmediate` के माध्यम से फ़ायर-एंड-फ़ॉरगेट होता है; विफलताएँ
  `memory.extraction.background.failed` के अंतर्गत लॉग की जाती हैं और कॉलर
  को कभी दिखाई नहीं देतीं।
- सत्यापन राउंड-ट्रिप (`verifyExtractionPipeline`) एक `finally` ब्लॉक में
  अपनी परीक्षण प्रविष्टियों को साफ़ कर देते हैं।

## यह भी देखें

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` सेटिंग मेमोरी के साथ टूल
  परिभाषाएँ इंजेक्ट करती है।
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ट्रांसपोर्ट / स्कोप।
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — व्यापक API सतह।
- स्रोत मॉड्यूल:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + हाइब्रिड RRF
  - `src/lib/memory/embedding/index.ts` — बहु-स्रोत एम्बेडिंग परत
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — सभी मेमोरी API बॉडी के लिए Zod स्कीमा
  - `src/shared/schemas/qdrant.ts` — Qdrant सेटिंग्स/ऑपरेशनों के लिए Zod स्कीमा
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` के लिए CRUD
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + उप-रूट
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (पेज + कंपोनेंट +
    टैब + हुक)
  - `open-sse/handlers/chatCore.ts` (इंजेक्शन / निष्कर्षण वायरिंग)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## एम्बेडिंग प्रदाता चुनना (v3.8.16+)

OmniRoute का मेमोरी इंजन **चार एम्बेडिंग स्रोतों** (`src/lib/memory/embedding/`) का समर्थन करता है। प्रत्येक में **लेटेंसी, लागत, मॉडल गुणवत्ता और सेटअप जटिलता** के संबंध में अलग-अलग संतुलन होते हैं।

### एम्बेडिंग स्रोत

| प्रदाता        | स्रोत                                       | लेटेंसी                         | लागत               | गुणवत्ता                      | सेटअप                             |
| -------------- | ------------------------------------------- | ------------------------------- | ------------------ | ----------------------------- | --------------------------------- |
| `transformers` | स्थानीय ONNX मॉडल (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                 | निःशुल्क           | अच्छी                         | केवल `npm install`                |
| `static`       | पहले से परिकलित वेक्टर (कैश किए हुए)        | <1ms                            | निःशुल्क           | लागू नहीं (कैश हिट पर निर्भर) | कोई नहीं                          |
| `remote`       | OpenAI / Cohere / Voyage API                | ~100-300ms                      | $0.02-0.10/1M टोकन | उत्कृष्ट                      | API कुंजी                         |
| `auto`         | रनटाइम पर सर्वोत्तम उपलब्ध स्रोत चुनता है   | चुने गए स्रोत के समान           | निःशुल्क           | चुने गए स्रोत के समान         | कोई नहीं                          |
| _(cache)_      | किसी भी स्रोत के ऊपर इन-मेमोरी LRU परत      | <1ms (हिट), पूर्ण लेटेंसी (मिस) | निःशुल्क           | अंतर्निहित स्रोत के समान      | हमेशा चालू (चयन योग्य स्रोत नहीं) |

### निर्णय वृक्ष

```
                  आपका डिप्लॉयमेंट संदर्भ क्या है?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  डेवलपमेंट/टेस्ट  छोटा प्रोडक्शन  बड़ा प्रोडक्शन    एज / ऑफ़लाइन
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (निःशुल्क, कोई API नहीं)       (सर्वोत्तम गुणवत्ता)   (इंटरनेट नहीं)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ऊपर हमेशा `cache` परत जोड़ें
            (LruCache किसी भी प्रदाता को रैप करता है)
```

### डेटाबेस और API कॉन्फ़िगरेशन

मेमोरी एम्बेडिंग विकल्प एनवायरनमेंट वेरिएबल के बजाय Settings API/UI के माध्यम से कॉन्फ़िगर किए जाते हैं। Settings के अंतर्गत संबंधित सेटिंग्स डेटाबेस कुंजियाँ (`src/lib/memory/settings.ts` में `normalizeMemorySettings`) हैं:

- `memoryEmbeddingSource`: `"transformers"` (स्थानीय), `"remote"` (API-आधारित, जैसे OpenAI), `"static"` (बाहरी स्टोर), या `"auto"`
- `memoryEmbeddingProviderModel`: रिमोट/स्टैटिक स्रोतों के लिए मॉडल पहचानकर्ता (जैसे, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, या `"auto"`

#### स्थानीय मॉडल (`transformers`)

स्थानीय मॉडल चलाने के लिए आंतरिक रूप से transformers.js का उपयोग करता है:

```bash
# कोड में पढ़े जाने वाले एनवायरनमेंट वेरिएबल (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF मॉडल रिपॉज़िटरी
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF स्टैटिक पोशन मॉडल
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # कैश डायरेक्टरी
```

#### LRU एम्बेडिंग कैश

कैश डिफ़ॉल्ट रूप से हमेशा चालू रहता है और एनवायरनमेंट वेरिएबल के माध्यम से कॉन्फ़िगर किया जाता है:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # कैश किए गए आइटमों की अधिकतम संख्या
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 मिनट)
```

### प्रदर्शन के आँकड़े

एक सामान्य 4-कोर x86 सर्वर पर बेंचमार्क (प्रत्येक टेक्स्ट ~100 टोकन):

| प्रदाता              | p50   | p95   | p99   | प्रति 1M एम्बेडिंग की लागत         |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | निःशुल्क                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant होस्टिंग पर निर्भर          |
| `cache` (हिट)        | <1ms  | <1ms  | 2ms   | निःशुल्क                           |

---

## तथ्य निष्कर्षण पैटर्न (v3.8.16+)

`extraction.ts` मॉड्यूल (`src/lib/memory/extraction.ts`) वार्तालाप संदेशों से संरचित तथ्य निकालने के लिए **regex pattern matching** का उपयोग करता है। इन पैटर्न को समझने से आपको अपने उपयोग के मामले के लिए निष्कर्षण गुणवत्ता को अनुकूलित करने में सहायता मिलती है।

### डिफ़ॉल्ट पैटर्न श्रेणियाँ

| श्रेणी              | उदाहरण पैटर्न                                               | कैप्चर करता है                  |
| ------------------- | ----------------------------------------------------------- | ------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | उपयोगकर्ता की प्राथमिकताएँ      |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | उपयोगकर्ता के निर्णय (एपिसोडिक) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | स्थायी व्यवहार पैटर्न           |

### उदाहरण पैटर्न (सरलीकृत)

```ts
// src/lib/memory/extraction.ts से
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### क्या निकाला जाता है

जब कोई उपयोगकर्ता कहता है:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> निष्कर्षण से 4 स्मृतियाँ बनती हैं:
>
> | कुंजी                                | श्रेणी     | प्रकार   | सामग्री                     |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### निष्कर्षण सीमाएँ

अनियंत्रित निष्कर्षण को रोकने के लिए निम्नलिखित सीमाएँ लागू होती हैं:

| न्यूनतम सामग्री लंबाई | 3 वर्ण |
| अधिकतम सामग्री लंबाई | 500 वर्ण |

### निष्कर्षण कब अक्षम करें

जब भी मेमोरी सक्षम होती है, निष्कर्षण स्वचालित रूप से चलता है; केवल निष्कर्षण के लिए कोई अलग टॉगल नहीं है। इसे बंद करने के लिए, मेमोरी को पूरी तरह अक्षम करें (`enabled: false`
को `PUT /api/settings/memory` के माध्यम से सेट करें)। निम्नलिखित स्थितियों में ऐसा करने पर विचार करें:

- आपके संदेशों की मात्रा अधिक है और निष्कर्षण की लागत उल्लेखनीय है
- आपके वार्तालाप अधिकतर अस्थायी हैं (चैट, डीबगिंग) और उनका कोई दीर्घकालिक मूल्य नहीं है
- आप पहले से ही कस्टम प्लगइन के माध्यम से संदर्भ कैप्चर कर रहे हैं

---

## हाइब्रिड RRF ट्यूनिंग (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** एल्गोरिदम FTS5 (कीवर्ड) और वेक्टर (सिमेंटिक) परिणामों को संयोजित करता है। `k` पैरामीटर नियंत्रित करता है कि निम्न रैंक वाले परिणामों को कितना भार दिया जाए।

### सूत्र

प्रत्येक उम्मीदवार स्मृति के लिए RRF स्कोर है:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

जहाँ:

- `k` स्थिरांक है (डिफ़ॉल्ट 60)
- `rank_i(d)`, i-वें पुनर्प्राप्ति सिस्टम (FTS, वेक्टर) में दस्तावेज़ `d` की रैंक है
- योग सभी पुनर्प्राप्ति सिस्टम पर लागू होता है

### `k` परिणामों को कैसे प्रभावित करता है

| `k` मान               | प्रभाव                                                                                | इसके लिए सर्वोत्तम                  |
| --------------------- | ------------------------------------------------------------------------------------- | ----------------------------------- |
| `k=0`                 | शुद्ध रैंक फ़्यूज़न (कोई स्मूथिंग नहीं)                                               | सैद्धांतिक आधाररेखा                 |
| `k=10-30`             | शीर्ष परिणामों को बहुत अधिक भार देता है, निम्न रैंक का योगदान बहुत कम होता है         | जब शीर्ष-3 परिणाम सामान्यतः सही हों |
| **`k=60`** (डिफ़ॉल्ट) | संतुलित — शीर्ष-10 परिणाम सभी सार्थक रूप से योगदान देते हैं                           | सामान्य-उद्देश्य पुनर्प्राप्ति      |
| `k=100+`              | अधिक समतल — कई सिस्टम में दिखाई देने पर निम्न रैंक वाले परिणाम भी प्रभावी हो सकते हैं | जब रिकॉल > प्रिसीजन महत्वपूर्ण हो   |

### व्यवहार में `k` को ट्यून करना

```bash
# डिफ़ॉल्ट
MEMORY_RRF_K=60

# आक्रामक प्रिसीजन (छोटी मेमोरी, कम दस्तावेज़)
MEMORY_RRF_K=20

# अधिकतम रिकॉल (बड़ी मेमोरी, विविध क्वेरी)
MEMORY_RRF_K=120
```

**`k=20` के साथ उदाहरण:**

- FTS रैंक 1 → योगदान `1/21 = 0.048`
- FTS रैंक 10 → योगदान `1/30 = 0.033`
- वेक्टर रैंक 1 → योगदान `0.048`
- संयुक्त अधिकतम: `0.096`

**`k=60` के साथ उदाहरण:**

- FTS रैंक 1 → योगदान `1/61 = 0.016`
- FTS रैंक 10 → योगदान `1/70 = 0.014`
- वेक्टर रैंक 1 → योगदान `0.016`
- संयुक्त अधिकतम: `0.033`

अधिक `k` के साथ, शीर्ष-1 और रैंक-10 के बीच **सापेक्ष अंतर** छोटा होता है, इसलिए एल्गोरिदम शीर्ष-रैंक विश्वास की तुलना में **पुनर्प्राप्ति सिस्टम के बीच सहमति** पर अधिक निर्भर करता है।

### `k` कब बदलें

| लक्षण                                           | यह आज़माएँ                                                       |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| शीर्ष परिणाम हमेशा जीतता है, लेकिन वह गलत है    | **कम** k (जैसे, 20) — शीर्ष-रैंक विश्वास अधिक मायने रखता है      |
| सही उत्तर शीर्ष-5 में है लेकिन शीर्ष-1 में नहीं | **अधिक** k (जैसे, 100) — समतल स्कोरिंग सहमति को पुरस्कृत करती है |
| रिकॉल अधिक है लेकिन प्रिसीजन कम है              | **कम** k — रैंकिंग को अधिक सटीक बनाएँ                            |
| रिकॉल कम है (प्रासंगिक दस्तावेज़ अनुपस्थित हैं) | **अधिक** k — निम्न रैंक वाले दस्तावेज़ों को अवसर दें             |

### RRF भार निर्धारण

रेसिप्रोकल रैंक फ़्यूज़न सिमेंटिक वेक्टर रैंक और पूर्ण-पाठ खोज रैंक के लिए समान भार का उपयोग करता है:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

अलग-अलग भार समायोजित करने के लिए कोई पर्यावरण चर नहीं हैं (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` मौजूद नहीं हैं)।

---

## सारांशीकरण रणनीति (v3.8.16+)

`summarization.ts` मॉड्यूल (`src/lib/memory/summarization.ts`) पुरानी मेमोरीज़ को संपीड़ित करता है, ताकि सक्रिय सेट छोटा रहे और पुनर्प्राप्ति क्षमता सुरक्षित बनी रहे।

### सारांशीकरण कब ट्रिगर होता है

| ट्रिगर                           | सीमा (डिफ़ॉल्ट) |
| -------------------------------- | --------------- |
| API के माध्यम से मैन्युअल ट्रिगर | लागू नहीं       |

### किन चीज़ों का सारांशीकरण होता है

`summarization.ts` से दो एंट्री पॉइंट एक्सपोर्ट किए जाते हैं:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — किसी सेशन की
  मेमोरीज़ को टोकन बजट द्वारा सीमित एकल सारांश टेक्स्ट में संक्षिप्त करता है।
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API द्वारा उपयोग किया जाने वाला
  आयु-आधारित संपीड़न: यह `days` से पुरानी प्रत्येक मेमोरी का चयन करता है, उनसे
  एक संक्षिप्त सारांश मेमोरी बनाता है और (`dryRun` के `false` होने पर)
  मूल मेमोरीज़ को हटा देता है। कुछ भी संशोधित किए बिना संभावित सेट और कुल टोकन
  देखने के लिए `dryRun: true` पास करें।

इसमें कोई टैग/कुंजी क्लस्टरिंग चरण या प्रति-मेमोरी "मूल बनाम सारांश-योग्य" स्कोरिंग नहीं है —
चयन पूरी तरह आयु सीमा पर आधारित होता है, और सारांश टेक्स्ट में प्रत्येक संभावित मेमोरी के लिए
प्रकार-उपसर्ग वाली एक संक्षिप्त पंक्ति होती है।

### सारांशीकरण ट्रिगर करना

सारांशीकरण **मैन्युअल / ऑप्ट-इन** है — `autoSummarize` सेटिंग डिफ़ॉल्ट रूप से
`false` होती है, इसलिए कुछ भी स्वचालित रूप से संपीड़ित नहीं होता। इसे API के माध्यम से ट्रिगर करें:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

इसे बंद रखने के लिए, बस `autoSummarize` को इसके डिफ़ॉल्ट मान (`false`) पर रहने दें।

### सारांशीकरण की गुणवत्ता के लिए सुझाव

- **पहले `dryRun` से पूर्वावलोकन करें** — `summarizeMemoriesOlderThan(..., true)`
  संभावित सूची और कुल टोकन संख्या लौटाता है, ताकि मूल मेमोरीज़ हटाने से पहले
  आप पुष्टि कर सकें कि किन चीज़ों को मर्ज किया जाएगा।
- यदि आपके पास मेमोरीज़ का बड़ा संग्रह है, तो **कम ट्रैफ़िक वाले समय में सारांशीकरण चलाएँ** — LLM कॉल धीमा भाग है

```bash
# Cron-शैली: प्रतिदिन सुबह 3 बजे सारांशीकरण करें
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend प्रोवाइडर पैटर्न

> **प्रामाणिक स्रोत:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **परीक्षण:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend प्रोवाइडर पैटर्न मौजूदा मेमोरी इंजन के ऊपर एक **प्लग-योग्य बैकएंड अमूर्तता परत** प्रस्तुत करता है। किसी एक स्टोरेज कार्यान्वयन से बंधे रहने के बजाय, मेमोरी सिस्टम अब कॉन्फ़िगर करने योग्य प्राथमिक/फ़ॉलबैक रूटिंग के साथ कई बैकएंड (SQLite, Obsidian, Notion और कस्टम HTTP बैकएंड) का समर्थन करता है।

### आर्किटेक्चर

```
┌──────────────────────────────────────────────────────────┐
│                    API रूट्स                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           सिंगलटन ऑर्केस्ट्रेटर (manager.ts)              │
│                                                          │
│  प्राथमिक ──► बैकएंड A  (उदा. SQLite)                    │
│  फ़ॉलबैक  ──► बैकएंड B  (उदा. Obsidian)                  │
│               बैकएंड C  (उदा. GenericBackend के माध्यम से Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ बैकएंड     │ │ बैकएंड     │ │ बैकएंड (HTTP)    │
└────────────┘ └────────────┘ └──────────────────┘
```

#### मुख्य इंटरफ़ेस (`backend.ts`)

प्रत्येक बैकएंड को `MemoryBackend` इंटरफ़ेस लागू करना होगा:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // खोज
  search(config: SearchConfig): Promise<Memory[]>;

  // स्वास्थ्य
  health(): Promise<HealthCheckResult>;

  // जीवनचक्र (वैकल्पिक)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

एक सिंगलटन ऑर्केस्ट्रेटर जो:

- `register(backend)` के माध्यम से बैकएंड **पंजीकृत** करता है — बूट के समय `index.ts` से कॉल किया जाता है
- `configure(primary, fallbacks)` के माध्यम से प्राथमिक + फ़ॉलबैक **कॉन्फ़िगर** करता है
- विफलता होने पर फ़ॉलबैक शृंखला के साथ CRUD/खोज को प्राथमिक बैकएंड पर **रूट** करता है
- समय-समय पर सभी बैकएंड की **स्वास्थ्य जाँच** करता है

**फ़ॉलबैक व्यवहार:**

| ऑपरेशन   | प्राथमिक                    | फ़ॉलबैक                     |
| -------- | --------------------------- | --------------------------- |
| `create` | ✅ केवल प्राथमिक            | ❌                          |
| `get`    | ✅ पहले प्राथमिक को आज़माएँ | ✅ null होने पर फ़ॉलबैक     |
| `update` | ✅ केवल प्राथमिक            | ✅ बिना प्रतीक्षा वाला सिंक |
| `delete` | ✅ केवल प्राथमिक            | ✅ बिना प्रतीक्षा वाला सिंक |
| `list`   | ✅ केवल प्राथमिक            | ❌                          |
| `search` | ✅ पहले प्राथमिक            | ✅ त्रुटि होने पर फ़ॉलबैक   |

#### GenericMemoryBackend (`genericBackend.ts`)

एक सामान्य HTTP कनेक्टर, जो किसी भी REST API को MemoryBackend के अनुरूप बनाता है। यह इनके लिए उपयोगी है:

- **Notion** — Notion API के माध्यम से कनेक्ट करें
- **Obsidian** — Obsidian Local REST API के माध्यम से कनेक्ट करें
- **कस्टम बैकएंड** — RESTful मेमोरी API उपलब्ध कराने वाली कोई भी सेवा

**कॉन्फ़िगरेशन:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // बैकएंड API का आधार URL
  apiKey?: string;           // प्रमाणीकरण के लिए Bearer टोकन
  headers?: Record<string, string>;  // कस्टम HTTP हेडर
  timeout?: number;          // अनुरोध टाइमआउट (डिफ़ॉल्ट: 30000ms)
  backendType?: string;      // लॉगिंग के लिए

  // एंडपॉइंट ओवरराइड (डिफ़ॉल्ट REST परंपराओं का उपयोग करते हैं)
  endpoints?: {
    search?: string;   // डिफ़ॉल्ट: "/memories/search"
    create?: string;   // डिफ़ॉल्ट: "/memories"
    list?: string;     // डिफ़ॉल्ट: "/memories"
    get?: string;      // डिफ़ॉल्ट: "/memories/{id}"
    update?: string;   // डिफ़ॉल्ट: "/memories/{id}"
    delete?: string;   // डिफ़ॉल्ट: "/memories/{id}"
    health?: string;   // डिफ़ॉल्ट: "/health"
  };

  // क्वेरी पैरामीटर नाम मैपिंग
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // पाथ पैरामीटर नाम मैपिंग
  pathParams?: {
    id?/memoryId?
  };
}
```

**ज्ञात बैकएंड** `KNOWN_BACKENDS` में पहले से कॉन्फ़िगर किए गए हैं:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 की ओर इंगित करता GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 की ओर इंगित करता GenericMemoryBackend
```

#### अंतर्निहित बैकएंड

##### SQLiteBackend (`sqliteBackend.ts`)

डिफ़ॉल्ट प्राथमिक बैकएंड। `src/lib/memory/store.ts` का उपयोग करके मौजूदा SQLite-आधारित मेमोरी स्टोर को रैप करता है। बूट के समय स्वचालित रूप से पंजीकृत होता है।

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

मौजूदा Obsidian एकीकरण (`src/lib/memory/obsidianBackend.ts`) को रैप करता है। Obsidian Local REST API के माध्यम से किसी Obsidian वॉल्ट से कनेक्ट होता है।

### सेटिंग्स

मेमोरी बैकएंड सेटिंग्स ऐप की सेटिंग्स तालिका में संग्रहीत होती हैं और `src/lib/memory/settings.ts` के माध्यम से प्रबंधित की जाती हैं:

| सेटिंग              | एन्वायरनमेंट/कॉन्फ़िगरेशन कुंजी | डिफ़ॉल्ट   | विवरण                                       |
| ------------------- | ------------------------------- | ---------- | ------------------------------------------- |
| प्राथमिक बैकएंड     | `memoryPrimaryBackend`          | `"sqlite"` | प्राथमिक बैकएंड की ID                       |
| फ़ॉलबैक बैकएंड      | `memoryFallbackBackends`        | `[]`       | क्रमबद्ध फ़ॉलबैक बैकएंड ID                  |
| बैकएंड कॉन्फ़िगरेशन | `memoryBackendConfigs`          | `{}`       | प्रत्येक बैकएंड के लिए कॉन्फ़िगरेशन ओवरराइड |

सेटिंग्स को `normalizeMemorySettings()` के माध्यम से सामान्यीकृत किया जाता है और `getMemorySettings()` में कैश किया जाता है।

### आरंभीकरण प्रवाह

```
ऐप बूटस्ट्रैप
  → index.ts आयात (साइड-इफ़ेक्ट): SQLiteBackend को पंजीकृत करता है
  → ऐप जीवनचक्र से initMemoryBackends() कॉल किया जाता है:
      1. सेटिंग्स लोड करें (getMemorySettings)
      2. प्राथमिक + फ़ॉलबैक कॉन्फ़िगर करें
      3. सभी बैकएंड आरंभ करें (स्वास्थ्य जाँच)
      4. अनुरोधों के लिए तैयार
```

### नया बैकएंड जोड़ना

1. `src/lib/memory/<name>Backend.ts` में **`MemoryBackend` लागू करें**
2. `src/lib/memory/index.ts` से **निर्यात करें**
3. बूट के समय `memoryManager.register(yourBackend)` के साथ **पंजीकृत करें**
4. सेटिंग्स के माध्यम से **कॉन्फ़िगर करें**: `memoryPrimaryBackend` को अपनी बैकएंड ID पर सेट करें
5. संदर्भ के रूप में `src/lib/memory/__tests__/generic-backend.test.ts` के साथ **परीक्षण करें**

#### उदाहरण: Brain बैकएंड

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### सत्यापन

#### यूनिट परीक्षण

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

अपेक्षित आउटपुट: **35 परीक्षण, सभी सफल**, जिनमें शामिल हैं:

- कंस्ट्रक्टर (2)
- स्वास्थ्य जाँच (4) — सफलता, विफलता 500, नेटवर्क त्रुटि, विलंबता
- आरंभीकरण (2) — सफलता, विफलता
- निर्माण (2) — डिफ़ॉल्ट एंडपॉइंट, कस्टम एंडपॉइंट
- प्राप्ति (4) — सफलता, 404 → null, गैर-404 पर थ्रो, कस्टम पाथ पैरामीटर
- अपडेट (2) — सफलता, 404 → false
- हटाना (2) — सफलता, 404 → false
- सूची (2) — क्वेरी पैरामीटर, कस्टम पैरामीटर नाम
- खोज (3) — क्वेरी पैरामीटर, कस्टम एंडपॉइंट, विकल्पों का सीरियलाइज़ेशन
- प्रमाणीकरण हेडर (2) — Bearer टोकन, कस्टम हेडर
- फ़ैक्टरी (1)

#### प्रकार जाँच

```bash
npm run typecheck:core
```

अपेक्षित: **0 त्रुटियाँ**।
