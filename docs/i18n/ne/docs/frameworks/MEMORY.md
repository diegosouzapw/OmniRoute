# Memory System (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **सत्यको स्रोत:** `src/lib/memory/` र `src/app/api/memory/`
> **अन्तिम अद्यावधिक:** 2026-06-28 — v3.8.40 (पूर्वनिर्धारित रूपमा बन्द + int8 क्वान्टाइजेसन क्याच-अप)

OmniRoute ले API key (र वैकल्पिक रूपमा session id) का आधारमा छुट्याइएको स्थायी संवादात्मक मेमोरी प्रदान गर्छ। हलुका regex ढाँचा मिलानमार्फत LLM प्रतिक्रियाहरूबाट मेमोरीहरू स्वचालित रूपमा निकालिन्छन् र त्यसपछिका अनुरोधहरूमा अग्रस्थानको system सन्देशका रूपमा (वा system भूमिका अस्वीकार गर्ने प्रदायकहरूका लागि पहिलो user सन्देशका रूपमा) पुनः समावेश गरिन्छन्।

> **मेमोरी पूर्वनिर्धारित रूपमा बन्द छ (v3.8.30+)।** `DEFAULT_MEMORY_SETTINGS.enabled`
> अब `false` छ (`src/lib/memory/settings.ts`)। मेमोरी सक्षम गर्दा पुनःप्राप्त गरिएको सन्दर्भको
> `maxTokens` (~2k) सम्म **हरेक** chat अनुरोधमा समावेश हुन्छ, जसको
> शुल्क लाग्छ — नयाँ स्थापनाहरू र आफ्नै सन्दर्भ व्यवस्थापन गर्ने क्लाइन्टहरूका लागि यो
> अप्रत्याशित लागत हुन सक्छ। **Settings → Memory** अन्तर्गत स्पष्ट रूपमा स्वीकार गरी सक्षम गर्नुहोस् (
> मेमोरी सक्षम हुँदा `MemorySkillsTab` ले token-लागत चेतावनी देखाउँछ)।
> क्लाइन्टले `x-omniroute-no-memory`
> अनुरोध header (`true`/`1`/`yes`) प्रयोग गरेर एउटै अनुरोधलाई यसबाट बाहिर राख्न सक्छ — अनुरोध-header तालिका
> [API_REFERENCE.md](../reference/API_REFERENCE.md) मा हेर्नुहोस्। no-memory अनुरोधले
> `memoryOwnerId = null` सेट गर्छ, जसले उक्त अनुरोधका लागि मेमोरी र skill समावेशन
> **दुवै** निष्क्रिय गर्छ (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)।

मेमोरी **प्रत्येक API key अनुसार सीमित** हुन्छ, प्रत्येक user अनुसार होइन — एउटै API key मार्फत प्रमाणीकरण गरिएका प्रत्येक अनुरोधले एउटै मेमोरी पूल साझा गर्छन्, जसलाई वैकल्पिक रूपमा `sessionId` द्वारा थप सीमित गर्न सकिन्छ।

## वास्तुकला

```
Client → /v1/chat/completions (apiKeyInfo माथिल्लो तहमा समाधान गरिएको)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id निकाल्छ
    → getMemorySettings()                     # क्यास गरिएका settings
    → shouldInjectMemory(body, {enabled})     # गेट
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + वैकल्पिक vector
    → injectMemory(body, memories, provider)  # system वा user सन्देश
  → माथिल्लो प्रदायकमा कल
  → प्रतिक्रियामा: extractFacts(text, apiKeyId, sessionId)  # अवरोध नगर्ने
    → setImmediate → प्रत्येक मिलानका लागि createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

समावेशन र निष्कर्षणका call-site हरू
`open-sse/handlers/chatCore.ts` मा जडान गरिएका छन् (`retrieveMemories`, `injectMemory`,
र `extractFacts` खोज्नुहोस्)।

## इन्जिन वास्तुकला (३-तह समाधान)

Memory Engine ले उपलब्ध पूर्वाधार र settings का आधारमा runtime मा पुनःप्राप्ति मार्ग निर्धारण गर्छ। प्राथमिकता क्रममा लागू हुने तीनवटा तह छन्:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  तह ० — Keyword (FTS5)                                      │
  │  जाँच-आधारित उपलब्धता: SQLite build ले समर्थन गर्दा FTS5    │
  │  (better-sqlite3 / node:sqlite / bun:sqlite); FTS5 नभएका    │
  │  build हरूमा अनुपलब्ध (जस्तै sql.js/WASM —                  │
  │  "no such module: fts5")। strategy = "exact" हुँदा वा       │
  │  fallback का रूपमा प्रयोग हुन्छ; engine-status keyword ले   │
  │  जाँचको परिणाम जनाउँछ।                                     │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  तह १ — Embedded Vector (sqlite-vec)                        │
  │  sqlite-vec v0.1.9 लाई db.loadExtension() मार्फत load गरिन्छ।│
  │  Float32 vector हरूमाथि KNN brute-force। यी अवस्थामा सक्रिय:│
  │   • sqlite-vec loadExtension सफल हुन्छ                      │
  │   • Float32Array उत्पादन गर्न सक्ने embedding स्रोत         │
  │     (remote | static | transformers) उपलब्ध हुन्छ           │
  │   • vec_memories तालिका अवस्थित हुन्छ (पहिलो ready() मा     │
  │     सिर्जना गरिन्छ)                                         │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  तह २ — Qdrant (अप्ट-इन बाह्य vector database)              │
  │  सक्षम हुँदा semantic/hybrid का लागि sqlite-vec लाई          │
  │  प्रतिस्थापन गर्छ। चलिरहेको Qdrant instance र कन्फिगर       │
  │  गरिएको host/port आवश्यक हुन्छ।                             │
  └─────────────────────────────────────────────────────────────┘
```

गुणस्तर ह्रास स्वचालित र पारदर्शी हुन्छ:

- sqlite-vec load हुन असफल भएमा, तह १ अनुपलब्ध हुन्छ → तह ० मा fallback हुन्छ।
- embedding स्रोतले error फर्काएमा, तह १ बाट तह ० मा fallback हुन्छ।
- Qdrant अस्वस्थ भएमा, तह २ बाट तह १ मा fallback हुन्छ (वा तह १ पनि
  अनुपलब्ध भएमा तह ० मा)।

## एम्बेडिङ स्रोतहरू

एम्बेडिङ तह (`src/lib/memory/embedding/`) ले `MemorySettingsExtended.embeddingSource` का आधारमा कुन स्रोत प्रयोग गर्ने भनेर निर्धारण गर्छ:

| स्रोत          | विवरण                                                                            | कुञ्जी आवश्यक | कोल्ड स्टार्ट    |
| -------------- | -------------------------------------------------------------------------------- | ------------- | ---------------- |
| `remote`       | कन्फिगर गरिएको प्रदायकको एम्बेडिङ API (OpenAI, Cohere, आदि) प्रयोग गर्छ          | हो            | छैन              |
| `static`       | `potion-base-8M` मार्फत स्थानीय लुकअप-टेबल एम्बेडिङ (WordPiece + औसत पूलिङ)      | होइन          | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` मार्फत स्थानीय ONNX इन्फरेन्स | होइन          | ~3s + ~400MB RAM |
| `auto`         | रनटाइम निर्धारण: remote (कुञ्जी भएमा) → static → transformers → null             | निर्भर गर्छ   | निर्भर गर्छ      |

**`auto` का लागि निर्धारण क्रम:**

1. `listEmbeddingProviders()` मा `hasKey === true` भएको पहिलो प्रदायक फेला पार्नुहोस् → `remote`।
2. यदि `settings.staticEnabled === true` छ भने → `static`।
3. यदि `settings.transformersEnabled === true` छ भने → `transformers`।
4. अन्यथा → `null` (FTS5 कुञ्जीशब्द खोजमा सीमित हुन्छ)।

एम्बेडिङ क्यास (`src/lib/memory/embedding/cache.ts`) ले `${source}:${model}:${dim}:${sha256(text)}` द्वारा कुञ्जीकृत इन-मेमोरी LRU म्याप प्रयोग गर्छ, जुन `MEMORY_EMBEDDING_CACHE_MAX` प्रविष्टिहरू (पूर्वनिर्धारित 1000) मा सीमित हुन्छ र यसको TTL `MEMORY_EMBEDDING_CACHE_TTL_MS` (पूर्वनिर्धारित 5 मिनेट) हुन्छ। यो प्रत्येक प्रोसेस जीवनचक्रमा सबै कलरहरूबीच साझा हुन्छ।

## हाइब्रिड RRF (k=60)

जब `strategy = "hybrid"` हुन्छ र भेक्टर स्टोर उपलब्ध हुन्छ, तब पुनर्प्राप्तिले FTS5 र भेक्टर परिणामहरू मर्ज गर्न Reciprocal Rank Fusion प्रयोग गर्छ:

```
RRF(d) = Σ  1 / (k + rank_i(d))      जहाँ k = 60 (MEMORY_RRF_K मार्फत कन्फिगर गर्न सकिने)
          i
```

विशेष रूपमा:

1. FTS5 खोज चलाउनुहोस् → क्रमबद्ध सूची `R_fts` (स्थान 1..N)।
2. KNN भेक्टर खोज चलाउनुहोस् → क्रमबद्ध सूची `R_vec` (स्थान 1..M)।
3. प्रत्येक अद्वितीय `memoryId` का लागि:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (सूचीमा नभएमा 0)।
4. `rrf_score` लाई DESC क्रममा क्रमबद्ध गर्नुहोस्, त्यसपछि टोकन बजेट वाक लागू गर्नुहोस्।

RRF विषम पुनर्प्राप्ति प्रणालीहरूबीच स्कोर सामान्यीकरण आवश्यक नपरी प्रभावकारी हुने भनेर व्यापक रूपमा परिचित छ। पूर्वनिर्धारित `k=60` मूल Cormack et al. शोधपत्रबाट लिइएको हो र साना कर्पसहरू (<10k स्मृतिहरू) का लागि राम्रोसँग काम गर्छ।

## ब्याकफिल (लेजी + पुनःइन्डेक्स)

एम्बेडिङ मोडेल परिवर्तन हुँदा (`embedding_signature` मार्फत पत्ता लगाइने), भेक्टर स्टोर पुनर्निर्माण गरिन्छ र सबै विद्यमान स्मृतिहरूलाई `memories` तालिकामा `needs_reindex = 1` ले चिन्हित गरिन्छ।

**लेजी ब्याकफिल**: अर्को पुनर्प्राप्तिमा, भेक्टर प्रविष्टि नभएको कुनै पनि स्मृतिलाई खोज चल्नुअघि एम्बेड गरेर `vec_memories` मा घुसाइन्छ। यसले स्टार्टअपलाई अवरुद्ध नगरी वास्तविक अनुरोधहरूभरि ब्याकफिल लागतलाई क्रमशः बाँड्छ।

**स्पष्ट पुनःइन्डेक्स**: `/dashboard/memory` को Engine ट्याबले `POST /api/memory/reindex` कल गर्ने "अहिले पुनःइन्डेक्स गर्नुहोस्" बटन प्रदान गर्छ। ह्यान्डलरले `src/lib/memory/reindex.ts` बाट `runReindexBatch()` कल गर्छ, जसले प्रत्येक अनुरोधमा बढीमा `limit` विचाराधीन प्रविष्टिहरू प्रशोधन गर्छ। प्रगति `GET /api/memory/engine-status` (`vectorStore.needsReindex`) मार्फत पोल गर्न सकिन्छ।

`memory_vec_meta` तालिका (माइग्रेसन `083_memory_vec.sql`) ले निम्न भण्डारण गर्छ:

- `active_dim` — हालको भेक्टर आयाम (null = अझै क्यालिब्रेट गरिएको छैन)।
- `embedding_signature` — परिवर्तनहरू पत्ता लगाउन प्रयोग गरिने `${source}:${model}:${dim}`।
- `last_reset_at` — पछिल्लो पूर्ण रिसेटको टाइमस्ट्याम्प।
- `vec_loaded` — sqlite-vec सफलतापूर्वक लोड भयो कि भएन भन्ने 0/1 फ्ल्याग।

## सेटिङ विस्तार

नौवटा एम्बेडिङ र भेक्टर फिल्डहरू `src/shared/schemas/memory.ts` को `MemorySettingsExtended` मा उपलब्ध छन्, र `src/lib/db/settings.ts` मार्फत स्थायी रूपमा भण्डारण गरिन्छन्:

| फिल्ड                    | प्रकार                                             | पूर्वनिर्धारित | विवरण                                                           |
| ------------------------ | -------------------------------------------------- | -------------- | --------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`       | प्रयोग गरिने एम्बेडिङ स्रोत                                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`         | `provider/model` ढाँचामा प्रदायक/मोडेल                          |
| `customBaseUrl`          | `string \| null`                                   | `null`         | मेमोरीका लागि मात्र OpenAI-सङ्गत एन्डपोइन्टको आधार URL          |
| `customModelId`          | `string \| null`                                   | `null`         | अनुकूलन एन्डपोइन्टमा पठाइने मोडेल ID                            |
| `transformersEnabled`    | `boolean`                                          | `false`        | Transformers.js (MiniLM, ~400MB) का लागि अप्ट-इन                |
| `staticEnabled`          | `boolean`                                          | `false`        | स्थिर potion-base-8M स्थानीय मोडेलका लागि अप्ट-इन               |
| `rerankEnabled`          | `boolean`                                          | `false`        | पुनःक्रमबद्ध गर्ने चरण सक्षम पार्नुहोस् (+200-500ms/req थपिन्छ) |
| `rerankProviderModel`    | `string \| null`                                   | `null`         | `provider/model` ढाँचामा पुनःक्रमबद्ध प्रदायक/मोडेल             |

`rerankProviderModel` लाई `POST /v1/rerank` द्वारा समाधान गरिन्छ (लुपब्याकमार्फत कल गरिन्छ), त्यसैले यसले उक्त रुटले स्वीकार गर्ने जुनसुकै कुरा स्वीकार गर्छ: क्युरेट गरिएको क्लाउड पुनःक्रमबद्ध मोडेल (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) वा `<node-prefix>/<model>` को रूपमा OpenAI-सङ्गत प्रदायक नोड (उदाहरणका लागि, TEI/Infinity बक्सका लागि `skilled-mini/bge-reranker-v2-m3`)। लुपब्याक नोडहरू सधैं योग्य हुन्छन्; अर्को होस्टमा रहेको नोड (LAN, Tailscale) का लागि थप रूपमा `RERANK_REMOTE_PROVIDER_NODES` फिचर फ्ल्याग आवश्यक हुन्छ र त्यसले प्रदायकको आउटबाउन्ड URL नीति पार गर्नुपर्छ — [फिचर फ्ल्यागहरू](../reference/FEATURE_FLAGS.md) हेर्नुहोस्। ड्यासबोर्ड चयनकर्ताले क्युरेट गरिएका प्रदायकहरूका साथै स्थानीय नोडहरू पनि सूचीबद्ध गर्छ; कुनै पनि मान्य `provider/model` स्ट्रिङलाई `PUT /api/settings/memory` मार्फत सीधै सेट गर्न सकिन्छ।
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | प्रयोग गरिने भेक्टर ब्याकएन्ड |

यी `GET /PUT /api/settings/memory` मार्फत उपलब्ध गराइएका छन् (स्किमा `MemorySettingsExtendedSchema`)।

`remote` स्रोतका लागि, Memory ले वैकल्पिक `customBaseUrl` र
`customModelId` सेटिङहरू पनि स्वीकार गर्छ। यी दुवैले सँगै विश्वव्यापी एम्बेडिङ रजिस्ट्री
परिवर्तन नगरी OpenAI-सङ्गत `/embeddings` एन्डपोइन्ट र मोडेल चयन गर्छन्। प्रयोगअघि
एन्डपोइन्टलाई सामान्यीकृत गरिन्छ र प्रदायकको आउटबाउन्ड URL नीतिद्वारा जाँचिन्छ: HTTP(S)
आवश्यक हुन्छ, समाविष्ट प्रमाणहरू र क्वेरी स्ट्रिङहरू अस्वीकार गरिन्छन्, र क्लाउड-मेटाडेटा
ठेगानाहरू अवरुद्ध नै रहन्छन्। खाली मानहरूले चयन गरिएको रजिस्ट्री प्रदायकलाई कायम राख्छन्। ड्यासबोर्डमा
फर्काइने त्रुटिहरूलाई सुरक्षित बनाइन्छ र एन्डपोइन्टका प्रमाणहरू कहिल्यै लग गरिँदैनन्।

> **TODO (D20):** `global` स्कोप (सबै API कुञ्जीहरूमा मेमोरीहरू साझा गर्ने) यस
> रिलिजमा कार्यान्वयन गरिएको छैन। यसका लागि स्किमा परिवर्तन र विश्वव्यापी पुनःप्राप्ति
> मार्ग आवश्यक छ। यसलाई छुट्टै ट्र्याक गर्नुहोस्।

## भण्डारण तहहरू

### प्राथमिक: SQLite (`memories` तालिका)

माइग्रेसन `015_create_memories.sql` द्वारा सिर्जना गरिएको:

| स्तम्भ                      | प्रकार             | टिप्पणी                                                               |
| --------------------------- | ------------------ | --------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` मार्फत उत्पन्न UUID                             |
| `api_key_id`                | `TEXT NOT NULL`    | स्वामित्व भएको API कुञ्जी                                             |
| `session_id`                | `TEXT`             | वैकल्पिक प्रति-वार्तालाप स्कोप                                        |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` मध्ये एउटा            |
| `key`                       | `TEXT`             | स्थिर अपसर्ट कुञ्जी, जस्तै `preference:i_prefer_python`               |
| `content`                   | `TEXT NOT NULL`    | वास्तविक तथ्य पाठ                                                     |
| `metadata`                  | `TEXT`             | JSON ब्लब (category, extractedAt, source, ...)                        |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 स्ट्रिङहरू                                                   |
| `expires_at`                | `TEXT`             | वैकल्पिक म्याद सकिने समय; `NULL` को अर्थ स्थायी                       |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowids जोड्न `023_fix_memory_fts_uuid.sql` द्वारा थपिएको |

इन्डेक्सहरू: `api_key_id`, `session_id`, `type`, `expires_at`, साथै अद्वितीय
`memory_id` इन्डेक्स।

**अपसर्ट अर्थविज्ञान**: `createMemory()` ले उही `(api_key_id, key)` भएको विद्यमान
पङ्क्ति खोज्छ र फेला परेमा त्यसलाई सोही स्थानमा अद्यावधिक गर्छ (`metadata` लाई
शैलो स्प्रेडमार्फत मर्ज गर्दै)। यसले दोहोरिएका प्राथमिकता कथनहरूका कारण तालिका
असीमित रूपमा बढ्नबाट रोक्छ।

### पूर्ण-पाठ खोज (`memory_fts` भर्चुअल तालिका)

`022_add_memory_fts5.sql` ले `content` र `key` माथि FTS5 भर्चुअल तालिका सिर्जना
गर्छ। `023_fix_memory_fts_uuid.sql` ले UUID प्राथमिक कुञ्जी FTS5 को पूर्णाङ्क
rowid सँग जोडिन नसक्ने वास्तविक प्रयोगमा देखिएको बग समाधान गर्छ — माइग्रेसनले
`memory_id` स्तम्भ थप्छ, FTS तालिका पुनः सिर्जना गर्छ, र INSERT, DELETE तथा
UPDATE हुँदा FTS लाई समक्रमित राख्ने ट्रिगरहरू (`memory_fts_ai`, `memory_fts_ad`,
`memory_fts_au`) जडान गर्छ।

`retrieval.ts` द्वारा `semantic` र `hybrid` रणनीतिहरूका लागि प्रयोग गरिन्छ (तल
हेर्नुहोस्)। पुनर्प्राप्ति कोडले `hasTable("memory_fts")` मार्फत सुरक्षा जाँच गर्छ
र FTS तालिका नभएमा वा FTS क्वेरीले त्रुटि दिएमा कालानुक्रमिक क्रममा फलब्याक गर्छ।

### वैकल्पिक: Qdrant (भेक्टर स्टोर तह 2)

`src/lib/memory/qdrant.ts` ले तह 2 भेक्टर स्टोरका रूपमा वैकल्पिक Qdrant एकीकरण
कार्यान्वयन गर्छ। इन्जिन चयनकर्ता `memoryVectorStore === "qdrant"` हुँदा मात्र
पुनर्प्राप्ति Qdrant तर्फ रुट हुन्छ — पूर्वनिर्धारित `"auto"` (र `"sqlite-vec"`)
ले Qdrant **कहिल्यै** चयन गर्दैनन्। Engine-ट्याबको टगलले `qdrantEnabled` र
`memoryVectorStore` **दुवैलाई** सँगसँगै सेट गर्छ: सक्षम गर्दा Qdrant प्राथमिक
स्टोर बन्छ, असक्षम गर्दा `"auto"` मा रिसेट हुन्छ (#5597 — त्यो समाधानअघि सक्षम
गर्दा कुनै प्रभाव पर्दैनथ्यो, किनभने कुनै पनि कुराले इन्जिन चयनकर्ता लेख्दैनथ्यो)।
यदि Qdrant पहुँचयोग्य छैन वा यसले केही पनि फर्काउँदैन भने, पुनर्प्राप्ति
sqlite-vec → FTS5 मा फलब्याक गर्छ।

- `upsertSemanticMemoryPoint()` — कन्फिगर गरिएको embedding मोडेल प्रयोग गरी `key + content` लाई embed गर्छ, collection अवस्थित छ भनी सुनिश्चित गर्छ (पहिलो प्रयोगमा cosine-distance vectors सिर्जना गर्छ), र payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` सहित point लाई upsert गर्छ।
- `searchSemanticMemory(query, topK, scope)` — query लाई embed गर्छ, `kind = "omniroute_memory"` द्वारा र वैकल्पिक रूपमा
  `apiKeyId` / `sessionId` द्वारा फिल्टर गरिएको collection मा खोज्छ। `topK` लाई `[1, 20]` भित्र सीमित गर्छ।
- `deleteSemanticMemoryPoint(id)` — एउटा point मेटाउँछ। SQLite row हटाइएपछि
  `deleteMemory()` द्वारा बोलाइन्छ (D15)।
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` विगतमा भएका वा `createdAtUnix` retention cutoff भन्दा पुराना भएका points लाई एकैपटक मेटाउँछ। Dashboard ले वास्तविक सङ्ख्या देखाउन सकोस् भनेर पहिले गणना गर्छ।
- `checkQdrantHealth()` — latency सहितको `GET /readyz` health probe।

Settings UI ले `/dashboard/memory` को **Engine tab** मा Qdrant config, health check, semantic search test,
र cleanup उपलब्ध गराउँछ। `src/app/api/settings/qdrant/` अन्तर्गतका सम्बन्धित
routes v3.8.6 सम्ममा सबै जडान गरिएका छन्:

| Route                                   | Method        | विवरण                               |
| --------------------------------------- | ------------- | ----------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings पढ्ने / अपडेट गर्ने |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency            |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search परीक्षण             |
| `/api/settings/qdrant/cleanup`          | `POST`        | म्याद सकिएका / पुराना points हटाउने |
| `/api/settings/qdrant/embedding-models` | `GET`         | उपलब्ध embedding models को सूची     |

**व्यवहारसम्बन्धी टिप्पणीहरू (के अपेक्षा गर्ने):**

- **Engine चयन** — Engine tab मा Qdrant सक्षम गर्दा त्यो प्राथमिक
  store बन्छ (`memoryVectorStore="qdrant"` सेट गर्छ); असक्षम गर्दा `"auto"` मा रिसेट हुन्छ (#5597)।
- **Back-fill हुँदैन** — Qdrant सक्षम गरिएपछि **सिर्जना/अपडेट गरिएका** memories मात्र
  त्यसमा लेखिन्छन् (fire-and-forget dual-write)। पहिले नै अवस्थित SQLite memories **माइग्रेट गरिँदैनन्**;
  "Reindex Now" ले sqlite-vec index मात्र पुनर्निर्माण गर्छ, Qdrant होइन।
- **Vector dimension पहिलो प्रयोगमा वास्तविक embedding बाट स्वतः पत्ता लगाइन्छ** — भर्नुपर्ने
  dimension field हुँदैन। Collection अवस्थित भएपछि embedding मोडेल परिवर्तन गरिएको अवस्था
  **स्वतः व्यवस्थापन हुँदैन**: अवस्थित collection यथावत् रहन्छ, dimension नमिल्ने
  writes/searches असफल हुन्छन् र sqlite-vec मा fallback हुन्छन्। Embedder परिवर्तन गर्न collection
  पुनः सिर्जना गर्नुहोस् (नयाँ नाम राख्नुहोस् वा Qdrant मा त्यसलाई मेटाउनुहोस्)।
- **Distance metric** — सधैँ **Cosine** (collection सिर्जना गर्दा hardcoded; कन्फिगर गर्न
  मिल्दैन)।
- **Auth** — API key मात्र (`api-key` header का रूपमा पठाइन्छ; authentication नभएको
  local Docker का लागि वैकल्पिक)। JWT/RBAC प्रयोग हुँदैनन्।
- **Config fields** — UI ले `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` उपलब्ध गराउँछ। `vectorSize` / `hnswEfConstruct` env/DB मा मात्र हुन्छन् र `vectorSize`
  collection सिर्जनाका लागि प्रयोग हुँदैन (dimension embedding बाट आउँछ)।

### Vector quantization (int8 — opt-in, दुवै backends)

दुवै vector backends ले stored vectors को memory footprint घटाउन (~Float32 भन्दा 4× सानो)
सानो recall लागतमा **opt-in int8 quantization** समर्थन गर्छन्।
दुवैमा default **off** हुन्छ — स्पष्ट रूपमा सक्षम नगरिएसम्म vectors full-precision मै रहन्छन्।

| Backend    | Setting                         | Type                           | Default  | पढिने स्थान                                                 |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** लाई `qdrantQuantization` setting key मार्फत प्रत्येक instance का लागि कन्फिगर गरिन्छ
  (`PUT /api/settings/qdrant` मा `quantization` field का रूपमा उपलब्ध)। `"int8"` हुँदा,
  `buildQuantizationConfig()` ले scalar quantization (`always_ram`, quantile `0.99`) अनुरोध गर्छ
  र searches ले `rescore: true` सक्षम गर्छन्, जसले full-precision vectors मार्फत int8 candidate set
  लाई परिष्कृत गर्छ।
- **sqlite-vec** quantization **environment-only** हो (DB setting होइन): local vectors लाई
  `vec_quantize_int8(?, 'unit')` मार्फत `int8[dim]` column का रूपमा भण्डारण गर्न
  `MEMORY_VEC_QUANTIZATION=int8` सेट गर्नुहोस्। चयन गरिएको mode लाई
  `embedding_signature` मा (`:int8` suffix) समावेश गरिन्छ, त्यसैले modes परिवर्तन गर्दा
  `vec_memories` table को पूर्ण reindex सुरु हुन्छ — embedding मोडेल परिवर्तन हुँदा प्रयोग हुने
  उही lazy-backfill path।

## मेमोरीका प्रकारहरू

`MemoryType` (`src/lib/memory/types.ts`):

| प्रकार       | प्रयोग हुने क्षेत्र                                                                      |
| ------------ | ---------------------------------------------------------------------------------------- |
| `factual`    | प्राथमिकताहरू, प्रयोगकर्ताका स्थिर तथ्यहरू, व्यवहारगत ढाँचाहरू                           |
| `episodic`   | कुनै निश्चित क्षणसँग सम्बन्धित निर्णयहरू ("I chose Postgres")                            |
| `procedural` | कार्यप्रवाह / कसरी गर्नेसम्बन्धी मेमोरी (आरक्षित; हाल कुनै स्वचालित एक्स्ट्र्याक्टर छैन) |
| `semantic`   | भेक्टर-स्टोर प्रविष्टिहरूका लागि आरक्षित                                                 |

`MemoryConfig` को पुनर्प्राप्ति रणनीति `exact`, `semantic`, वा `hybrid` मध्ये एक हुन्छ,
र स्कोप `session`, `apiKey`, वा `global` मध्ये एक हुन्छ। `getMemorySettings()` बाट
प्राप्त हुने पूर्वनिर्धारित स्कोप `apiKey` हो।

## तथ्य निष्कर्षण (`extraction.ts`)

निष्कर्षण **regex-आधारित** हुन्छ, LLM-आधारित होइन — यो
`setImmediate()` मार्फत इन-प्रोसेस चल्छ, त्यसैले यसले प्रतिक्रिया स्ट्रिमलाई कहिल्यै अवरुद्ध गर्दैन:

- **प्राथमिकता ढाँचाहरू** → `MemoryType.FACTUAL`
  (जस्तै `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **निर्णय ढाँचाहरू** → `MemoryType.EPISODIC`
  (जस्तै `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **व्यवहार ढाँचाहरू** → `MemoryType.FACTUAL`
  (जस्तै `I usually …`, `I always …`, `I tend to …`)

प्रत्येक मिलानलाई सफा गरिन्छ (`trim`, ह्वाइटस्पेस-संकुचन, अधिकतम 500 वर्णसम्म सीमित),
स्थिर `factKey(category, content)` मार्फत ब्याचभित्र डुप्लिकेट हटाइन्छ, र
`createMemory()` मार्फत
`{category, extractedAt, source: "llm_response"}` मेटाडेटासहित भण्डारण गरिन्छ। इनपुट पाठ
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) मा सीमित हुन्छ — योभन्दा लामो हुँदा पाठको **अन्तिम भाग**
प्रयोग गरिन्छ, ताकि सहायकको सबैभन्दा पछिल्लो सामग्री सधैं समावेश होस्।

`extractFactsFromText(text)` परीक्षणहरूका लागि एक्सपोर्ट गरिएको छ र यसले तथ्यहरू भण्डारण नगरी
संरचित तथ्यहरू फिर्ता गर्छ।

## पुनर्प्राप्ति (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` मुख्य प्रवेश बिन्दु हो। यसले:

1. `MemoryConfigSchema` मार्फत कन्फिगलाई सामान्यीकृत र प्रमाणीकरण गर्छ।
2. `enabled` false हुँदा वा `maxTokens <= 0` हुँदा तुरुन्तै `[]` फिर्ता गर्छ।
3. `maxTokens` लाई `[1, 8000]` भित्र सीमित गर्छ।
4. आधुनिक `memories` तालिका (पुरानो `memory` तालिकाको तुलनामा) अवस्थित छ कि छैन भनेर पत्ता लगाउँछ, ताकि पुराना डेटाबेसहरूले काम गरिरहून्।
5. म्याद समाप्ति गार्ड
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), वैकल्पिक
   सेसन स्कोप, र वैकल्पिक `retentionDays` कटअफसहित आधारभूत क्वेरी निर्माण गर्छ।
6. रणनीतिका आधारमा शाखा छुट्याउँछ:
   - **`exact`** (पूर्वनिर्धारित): कालक्रमिक `ORDER BY created_at DESC LIMIT 100`।
   - **`semantic`**: यदि `config.query` दिइएको छ र `memory_fts` अवस्थित छ भने,
     `memory_fts MATCH ?` लाई JOIN गर्छ र FTS र्याङ्कअनुसार क्रमबद्ध गर्छ; FTS ले 0 पङ्क्ति फिर्ता गर्दा
     कालक्रमिक क्रममा फर्कन्छ।
   - **`hybrid`**: FTS परिणामहरू (उच्च सान्दर्भिकता) र
     कालक्रमिक सेटको युनियन बनाउँछ, र id का आधारमा डुप्लिकेट हटाउँछ।
7. क्वेरी दिइएको अवस्थामा `content`, `key`, र `metadata` JSON माथि
   कुञ्जीशब्द सान्दर्भिकता स्कोर (`getRelevanceScore`) गणना गर्छ। शून्य स्कोर भएका
   पङ्क्तिहरू हटाइन्छन्।
8. पहिले स्कोर घट्दो क्रममा, त्यसपछि `createdAt` घट्दो क्रममा क्रमबद्ध गर्छ।
9. र्याङ्क गरिएको सूचीमा क्रमशः अघि बढ्छ र चलिरहेको
   `estimateTokens(content)` (≈ `length / 4`) बजेटभित्र रहँदासम्म प्रविष्टिहरू स्वीकार गर्छ।
   कुनै मिलान भएको अवस्थामा सधैं कम्तीमा एउटा प्रविष्टि फिर्ता गर्छ।

`estimateTokens` एक्सपोर्ट गरिएको छ र पुनर्प्राप्ति, सारांश निर्माण, तथा MCP
`omniroute_memory_search` उपकरणद्वारा प्रयोग गरिन्छ।

## इन्जेक्सन (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. सबै मेमोरी सामग्रीलाई एउटै `Memory context: …` स्ट्रिङमा जोड्छ।
2. प्रदायकको नामअनुसार रणनीति चयन गर्छ:
   - **सिस्टम सन्देश** (OpenAI, Anthropic, Gemini, … का लागि पूर्वनिर्धारित) — कुनै पनि विद्यमान सिस्टम सन्देशभन्दा अगाडि
     `{role: "system", content: memoryText}` थप्छ, जसले गर्दा प्रयोगकर्ताका सिस्टम प्रम्प्टहरूले अझै पनि प्राथमिकता पाउँछन्।
   - **प्रयोगकर्ता सन्देश** (फल्ब्याक) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` मा रहेका प्रदायकहरूका लागि: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`। यिनले सिस्टम भूमिका अस्वीकार गर्छन्
     र अन्यथा 400 त्रुटि दिन्छन् (GLM/Zhipu का लागि issue #1701 हेर्नुहोस्)।
3. `memory.injection.injected` अन्तर्गत सङ्ख्या, रणनीति र मोडेल लग गर्छ।

आफ्नै राउटिङ निर्णय गर्न आवश्यक पर्ने कलरहरूका लागि `providerSupportsSystemMessage(provider)` निर्यात गरिएको छ। सुरक्षाका लागि अज्ञात प्रदायकहरू पूर्वनिर्धारित रूपमा `true`
(सिस्टम भूमिका अनुमति प्राप्त) हुन्छन्।

## सेटिङहरू (`settings.ts`)

मेमोरी कन्फिगरेसन env vars मा नभई **DB सेटिङ तालिकामा भण्डारण गरिन्छ**।
`getMemorySettings()` ले `getSettings()` बाट पढ्छ र नतिजालाई
प्रक्रियाभित्र क्यास गर्छ; लेखनपछि सेटिङहरूको PUT
रुटद्वारा `invalidateMemorySettingsCache()` कल गरिन्छ।

### लिगेसी फिल्डहरू (सबै संस्करण)

| DB कुञ्जी             | प्रकार  | पूर्वनिर्धारित                                       | UI नियन्त्रण                                               |
| --------------------- | ------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 देखि पूर्वनिर्धारित रूपमा बन्द)     | मेमोरी अन/अफ                                               |
| `memoryMaxTokens`     | integer | `2000` (दायरा `0–16000`)                             | इन्जेक्सनका लागि टोकन बजेट                                 |
| `memoryRetentionDays` | integer | `30` (दायरा `1–365`)                                 | रिटेन्सन अवधि                                              |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` मध्ये एक) | पुनःप्राप्ति रणनीति                                        |
| `skillsEnabled`       | boolean | `false`                                              | प्रति-कुञ्जी सीप इन्जेक्सन टगल गर्छ (SKILLS.md हेर्नुहोस्) |

नोट: UI रणनीति `"recent"` लाई `toMemoryRetrievalConfig()` मार्फत आन्तरिक `"exact"` पुनःप्राप्ति
रणनीतिमा म्याप गरिन्छ (कालानुक्रमिक क्रम)।

### नयाँ फिल्डहरू (v3.8.6, योजना 21 D9)

फिल्डहरूको विवरणका लागि माथिको "सेटिङ विस्तार" खण्ड पनि हेर्नुहोस्।

| DB कुञ्जी                   | API फिल्ड                | पूर्वनिर्धारित |
| --------------------------- | ------------------------ | -------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`       |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`         |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`        |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`        |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`        |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`         |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`       |

Qdrant-सम्बन्धित DB कुञ्जीहरू (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` को पूर्वनिर्धारित मान `"omniroute_memory"`,
`qdrantEmbeddingModel` को पूर्वनिर्धारित मान `"openai/text-embedding-3-small"`) लाई
`qdrant.ts` मा रहेको `normalizeQdrantConfig()` ले पढ्छ।

### वातावरणीय चरहरू (v3.8.6)

छवटा वैकल्पिक env vars ले इन्जिनको रनटाइम व्यवहार समायोजन गर्छन् (`.env.example` मा दस्तावेजीकरण गरिएको):

| चर                              | पूर्वनिर्धारित             | विवरण                                                                                                                                                           |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | इम्बेडिङ क्यास TTL (5 मिनेट)                                                                                                                                    |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | इम्बेडिङ LRU क्यासमा प्रविष्टिहरूको अधिकतम सङ्ख्या                                                                                                              |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js मोडेलका लागि HF रिपोजिटरी                                                                                                                       |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | स्ट्याटिक पोसन मोडेलका लागि HF रिपोजिटरी                                                                                                                        |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | डाउनलोड गरिएका मोडेलहरू भण्डारण गर्ने स्थान                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | भेक्टर खोजका लागि पूर्वनिर्धारित top-K                                                                                                                          |
| `MEMORY_RRF_K`                  | `60`                       | हाइब्रिड खोजका लागि RRF k स्थिराङ्क                                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | स्थानीय sqlite-vec भेक्टरहरूलाई क्वान्टाइज गरिएको रूपमा भण्डारण गर्न `int8` मा सेट गर्नुहोस् (~4× सानो; अप्ट-इन)। मोड परिवर्तनले पुनःइन्डेक्स गर्न बाध्य पार्छ। |

## सारांशीकरण (`summarization.ts`)

कुनै key का memories को चालु token जम्मा निर्धारित सीमाभन्दा बढी हुँदा `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` ले पुरानो content लाई सङ्कुचित गर्छ। यसले `created_at` अनुसार DESC क्रममा rows माथि पुनरावृत्ति गर्छ, सीमाभित्र अटाउने rows राख्छ, र बाँकीका लागि `content` लाई सोही स्थानमा मूल content का सुरुका तीन वाक्यले प्रतिस्थापन गर्छ। `tokensSaved` भनेको पुरानो र नयाँ content बीचको `estimateTokens` को अन्तर हो।

यो routine हालको chat pipeline मा **उपलब्ध छ तर स्वचालित रूपमा बोलाइँदैन** — निरन्तर सङ्कुचन आवश्यक भएमा यसलाई cron, admin action, वा `MemoryConfig.autoSummarize` glue बाट बोलाउनुहोस्। data loss एकतर्फी हुन्छ: मूल text अधिलेखन हुन्छ।

## REST API

सबै endpoints लाई management auth (`requireManagementAuth`) आवश्यक पर्छ।

### मुख्य memory endpoints (विद्यमान + अद्यावधिक)

| विधि     | Path                 | विवरण                                                                                                                                                                                            |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | filters सहितको पृष्ठाङ्कित सूची: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`। response मा `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` समावेश हुन्छन्    |
| `POST`   | `/api/memory`        | entry सिर्जना गर्छ (Zod द्वारा प्रमाणीकरण गरिएको: `content`, `key`, ऐच्छिक `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`)। `(apiKeyId, key)` मा upsert गर्ने `createMemory()` बोलाउँछ |
| `GET`    | `/api/memory/[id]`   | UUID द्वारा एकल entry प्राप्त गर्छ                                                                                                                                                               |
| `PUT`    | `/api/memory/[id]`   | entry का fields (`type`, `key`, `content`, `metadata`) अद्यावधिक गर्छ। body: `MemoryUpdatePutSchema`। embedding source उपलब्ध भएमा vector पनि sync गर्छ।                                         |
| `DELETE` | `/api/memory/[id]`   | entry मेटाउँछ; `vec_memories` (D15) र Qdrant बाट पनि सक्दो प्रयासमा मेटाउँछ। नभेटिएमा 404 फर्काउँछ।                                                                                              |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` चलाउँछ — create→list→delete को पूर्ण चक्र। `{working, latencyMs, error?}` फर्काउँछ                                                                    |

### नयाँ memory engine endpoints (योजना 21)

| विधि   | Path                              | विवरण                                                                                                                                                        |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` को dry-run — score, tier र tokens सहित क्रमबद्ध results फर्काउँछ। body: `RetrievePreviewSchema`। memories inject वा परिमार्जन **गर्दैन**। |
| `GET`  | `/api/memory/embedding-providers` | embedding models सहित providers सूचीबद्ध गर्छ र कुनमा API key configure गरिएको छ भन्ने देखाउँछ।                                                              |
| `GET`  | `/api/memory/engine-status`       | पूर्ण engine status फर्काउँछ: keyword tier, embedding resolution, vector store stats, Qdrant health, rerank config। आकार: `MemoryEngineStatusSchema`।        |
| `POST` | `/api/memory/summarize`           | memory compaction म्यानुअल रूपमा सुरु गर्छ। body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`)। `{candidates, tokensSaved}` फर्काउँछ।    |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` भएका memories का लागि vector reindex सुरु गर्छ। body: `MemoryReindexSchema` (`force`)। `{started, pending}` फर्काउँछ।                      |

### Settings endpoints

| विधि   | Path                                    | विवरण                                                                                                     |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | हालको सामान्यीकृत `MemorySettingsExtended` (7 नयाँ fields + legacy)                                       |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` बाट कुनै पनि field अद्यावधिक गर्छ (कुल 12 fields)                          |
| `GET`  | `/api/settings/qdrant`                  | हालको Qdrant settings (`QdrantSettingsSchema`)                                                            |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant settings अद्यावधिक गर्छ। body: `QdrantSettingsUpdateSchema`। `apiKey` = खाली string ले key हटाउँछ। |
| `GET`  | `/api/settings/qdrant/health`           | configure गरिएको Qdrant instance विरुद्ध liveness probe। `QdrantHealthResultSchema` फर्काउँछ।             |
| `POST` | `/api/settings/qdrant/search`           | Qdrant विरुद्ध semantic search परीक्षण। body: `QdrantSearchSchema` (`query`, `topK`)।                     |
| `POST` | `/api/settings/qdrant/cleanup`          | म्याद सकिएका / पुराना memories का Qdrant points हटाउँछ।                                                   |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant का लागि उपलब्ध embedding models सूचीबद्ध गर्छ।                                                     |

`/api/memory` list query ले `page`-आधारित pagination (`parsePaginationParams`) **वा** raw `offset` मध्ये कुनै एकलाई समर्थन गर्छ — `offset` उपस्थित हुँदा त्यसले प्राथमिकता पाउँछ र response को आकारका लागि व्युत्पन्न `page` गणना गरिन्छ।

## MCP उपकरणहरू (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP सर्भर सक्षम हुँदा, तीनवटा मेमोरी उपकरणहरू दर्ता हुन्छन्:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` लाई र्याप गर्छ। v3.8.6 (D16) देखि, `strategy` लाई
  `"exact"` मा हार्डकोड गर्नुको सट्टा `getMemorySettings()` बाट पढिन्छ।
  यदि `query` प्रदान गरिएको छ र `strategy` `semantic` वा `hybrid` छ भने,
  उपलब्ध हुँदा भेक्टर स्टोर प्रयोग गरिन्छ।
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` लाई र्याप गर्छ। केवल यी 4 मानक प्रकारहरू
  स्वीकार गर्छ: `factual`, `episodic`, `procedural`, `semantic` (D17)।
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → मिल्ने
  प्रविष्टिहरूको सूची बनाउँछ, वैकल्पिक रूपमा सिर्जना-अघिको टाइमस्ट्याम्पद्वारा
  फिल्टर गर्छ, त्यसपछि प्रत्येकलाई `deleteMemory()` मार्फत मेटाउँछ (जसले
  sqlite-vec + Qdrant बाट भेक्टरहरू पनि हटाउँछ)।

ट्रान्सपोर्ट र स्कोपसम्बन्धी विवरणका लागि [MCP-SERVER.md](./MCP-SERVER.md) हेर्नुहोस्।

## ड्यासबोर्ड (मेमोरी स्टुडियो)

`src/app/(dashboard)/dashboard/memory/page.tsx` अब **3-ट्याब स्टुडियो** हो:

### ट्याब: मेमोरीहरू

- अवधारणा कार्ड (खोल्न/बन्द गर्न मिल्ने "यसले कसरी काम गर्छ" व्याख्या)।
- रियल-टाइम सूची, खोज र पृष्ठाङ्कन (300 ms डिबाउन्स गरिएको)।
- प्रकार फिल्टर (`factual` / `episodic` / `procedural` / `semantic` / सबै)।
- मेमोरी-थप्ने मोडल (कुञ्जी, सामग्री, प्रकार)।
- इनलाइन सम्पादन (पेन्सिल बटन → `PUT /api/memory/[id]`)।
- प्रत्येक पङ्क्तिबाट मेटाउने सुविधा (पुष्टि संवादसहित)।
- हालको पृष्ठको JSON निर्यात; फाइल पिकरमार्फत JSON आयात।
- तथ्याङ्क कार्डहरू: `totalEntries`, `tokensUsed`, `hitRate`।
- "पुरानालाई कम्प्याक्ट गर्नुहोस्" बटन → `POST /api/memory/summarize` (पहिले
  ड्राइ-रनले उम्मेदवार सङ्ख्या देखाउँछ, त्यसपछि पुष्टि गर्छ)।
- `GET /api/memory/health` द्वारा नियन्त्रित हरियो/रातो स्वास्थ्य बिन्दु।

### ट्याब: प्लेग्राउन्ड

- क्वेरी इनपुट + रणनीति चयनकर्ता (सटीक / सिम्यान्टिक / हाइब्रिड) + टोकन बजेट।
- "सिमुलेट गर्नुहोस्" → `POST /api/memory/retrieve-preview` — क्रमबद्ध नतिजाहरू
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` सहित देखाउँछ।
- कुन एम्बेडिङ स्रोत / भेक्टर स्टोर प्रयोग भयो र फलब्याक भयो कि भएन भन्ने
  देखाउने रिजोलुसन प्यानल।

### ट्याब: इन्जिन

- इन्जिन स्थिति प्यानल (किवर्ड FTS5 चिप, एम्बेडिङ चिप, भेक्टर स्टोर चिप,
  Qdrant स्वास्थ्य चिप, पुनःक्रमाङ्कन चिप)।
- "अहिले पुनःइन्डेक्स गर्नुहोस्" बटन → `POST /api/memory/reindex`।
- एम्बेडिङ स्रोत चयनकर्ता (स्वतः / रिमोट / स्ट्याटिक / ट्रान्सफर्मरहरू + टगलहरू)।
- Qdrant कन्फिग कार्ड (सक्षम टगल, होस्ट/पोर्ट/सङ्ग्रह/कुञ्जी, जडान परीक्षण,
  सिम्यान्टिक खोज परीक्षण, सफाइ)।
- पुनःक्रमाङ्कन कन्फिग कार्ड (सक्षम टगल, प्रदायक/मोडेल चयनकर्ता)।

लेगेसी/ग्लोबल सेटिङ सतहका लागि मेमोरी र Qdrant सेटिङहरू
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) अन्तर्गत पनि छन्।

## क्यासिङ

`src/lib/memory/store.ts` ले `getMemory(id)` रिडहरूका लागि प्रक्रियाभित्रै रहने
LRU-जस्तो क्यास (`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`,
20 % सबैभन्दा पुराना प्रविष्टिहरू हटाउने) राख्छ। साथै, आफ्नै स्कोपयुक्त क्यास
चाहने कलरहरूले प्रयोग गर्ने `get`/`set`/`invalidate` विधिहरूसहितको सामान्य
कुञ्जी/मान `memoryCache` तह (`src/lib/memory/cache.ts`) पनि छ (1 000-प्रविष्टि
LRU, पूर्वनिर्धारित TTL 5 min)।

## गोपनीयता र जीवनचक्र

- मेमोरीको स्वामित्व API key id सँग हुन्छ (`chatCore.ts` मा
  `resolveMemoryOwnerId`)। `apiKeyInfo.id` नभएमा पुनर्प्राप्ति, इन्जेक्सन
  वा एक्स्ट्र्याक्सनमध्ये कुनै पनि चल्दैन।
- भविष्यको `expires_at` भएका प्रविष्टिहरू पुनर्प्राप्तिबाट फिल्टर गरिन्छन्;
  `retentionDays` भन्दा पुराना प्रविष्टिहरूलाई `retrieveMemories` को
  `created_at >= cutoff` क्लजद्वारा समावेश गरिँदैन।
- स्थायी रूपमा मेटाउन, `DELETE /api/memory/[id]` वा `omniroute_memory_clear` प्रयोग गर्नुहोस्।
- एक्स्ट्र्याक्सन `setImmediate` मार्फत फायर-एन्ड-फर्गेट रूपमा चल्छ; विफलताहरू
  `memory.extraction.background.failed` अन्तर्गत लग गरिन्छन् र कलरसमक्ष कहिल्यै देखिँदैनन्।
- प्रमाणीकरण राउन्ड-ट्रिपहरू (`verifyExtractionPipeline`) ले `finally` ब्लकमा
  आफ्नै परीक्षण प्रविष्टिहरू सफा गर्छन्।

## यो पनि हेर्नुहोस्

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` सेटिङले मेमोरीसँगै टुलका
  परिभाषाहरू इन्जेक्ट गर्छ।
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ट्रान्सपोर्ट / स्कोपहरू।
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — API को विस्तृत दायरा।
- स्रोत मोड्युलहरू:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + हाइब्रिड RRF
  - `src/lib/memory/embedding/index.ts` — बहु-स्रोत एम्बेडिङ तह
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — सबै मेमोरी API बडीहरूका लागि Zod स्किमाहरू
  - `src/shared/schemas/qdrant.ts` — Qdrant सेटिङ/अपरेसनहरूका लागि Zod स्किमाहरू
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` का लागि CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + सब-रुटहरू
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (पेज + कम्पोनेन्टहरू +
    ट्याबहरू + हुकहरू)
  - `open-sse/handlers/chatCore.ts` (इन्जेक्सन / एक्स्ट्र्याक्सन वायरिङ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## एम्बेडिङ प्रदायक छनोट गर्ने तरिका (v3.8.16+)

OmniRoute को मेमोरी इन्जिनले **चार एम्बेडिङ स्रोतहरू** (`src/lib/memory/embedding/`) समर्थन गर्छ। प्रत्येकको **विलम्बता, लागत, मोडेलको गुणस्तर र सेटअपको जटिलता** का सन्दर्भमा फरक सम्झौताहरू छन्।

### एम्बेडिङ स्रोतहरू

| प्रदायक        | स्रोत                                        | विलम्बता                         | लागत                  | गुणस्तर                          | सेटअप                                     |
| -------------- | -------------------------------------------- | -------------------------------- | --------------------- | -------------------------------- | ----------------------------------------- |
| `transformers` | स्थानीय ONNX मोडेल (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                  | निःशुल्क              | राम्रो                           | `npm install` मात्र                       |
| `static`       | पूर्व-गणना गरिएका भेक्टरहरू (क्यास गरिएका)   | <1ms                             | निःशुल्क              | लागू हुँदैन (क्यास हिटमा निर्भर) | कुनै पनि होइन                             |
| `remote`       | OpenAI / Cohere / Voyage API                 | ~100-300ms                       | $0.02-0.10/1M टोकनहरू | उत्कृष्ट                         | API key                                   |
| `auto`         | रनटाइममा उपलब्ध सर्वोत्तम स्रोत छान्छ        | छानिएको स्रोतकै समान             | निःशुल्क              | छानिएको स्रोतकै समान             | कुनै पनि होइन                             |
| _(cache)_      | कुनै पनि स्रोतमाथिको इन-मेमोरी LRU तह        | <1ms (हिट), पूर्ण विलम्बता (मिस) | निःशुल्क              | अन्तर्निहित स्रोतकै समान         | सधैँ सक्रिय (छनोट गर्न मिल्ने स्रोत होइन) |

### निर्णय वृक्ष

```
                  तपाईंको डिप्लोयमेन्ट सन्दर्भ के हो?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  डेभ/टेस्ट    सानो प्रोड   ठूलो प्रोड    एज / अफलाइन
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (निःशुल्क, API छैन)       (उत्कृष्ट गुणस्तर) (इन्टरनेट छैन)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            माथि सधैँ `cache` तह थप्नुहोस्
            (LruCache ले कुनै पनि प्रदायकलाई र्याप गर्छ)
```

### डेटाबेस र API कन्फिगरेसन

मेमोरी एम्बेडिङ विकल्पहरू environment variables मार्फत नभई Settings API/UI मार्फत कन्फिगर गरिन्छन्। Settings अन्तर्गतका सान्दर्भिक सेटिङ डेटाबेस कुञ्जीहरू (`src/lib/memory/settings.ts` मा `normalizeMemorySettings`) यी हुन्:

- `memoryEmbeddingSource`: `"transformers"` (स्थानीय), `"remote"` (API-आधारित, जस्तै OpenAI), `"static"` (बाह्य स्टोर), वा `"auto"`
- `memoryEmbeddingProviderModel`: रिमोट/स्ट्याटिक स्रोतहरूका लागि मोडेल पहिचानकर्ता (जस्तै, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, वा `"auto"`

#### स्थानीय मोडेल (`transformers`)

स्थानीय मोडेलहरू चलाउन आन्तरिक रूपमा transformers.js प्रयोग गर्छ:

```bash
# कोडमा पढिने Env vars (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF मोडेल रिपो
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF स्ट्याटिक पोसन मोडेल
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # क्यास डाइरेक्टरी
```

#### LRU एम्बेडिङ क्यास

क्यास पूर्वनिर्धारित रूपमा सधैँ सक्रिय हुन्छ र env vars मार्फत कन्फिगर गरिन्छ:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # क्यास गरिएका वस्तुहरूको अधिकतम सङ्ख्या
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 मिनेट)
```

### कार्यसम्पादनका आँकडाहरू

सामान्य 4-कोर x86 सर्भरमा बेन्चमार्क (प्रत्येक पाठ ~100 टोकन):

| प्रदायक              | p50   | p95   | p99   | 1M एम्बेडिङको लागत                 |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | निःशुल्क                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant होस्टिङमा निर्भर            |
| `cache` (हिट)        | <1ms  | <1ms  | 2ms   | निःशुल्क                           |

---

## तथ्य निष्कर्षण ढाँचाहरू (v3.8.16+)

`extraction.ts` मोड्युलले (`src/lib/memory/extraction.ts`) संवाद सन्देशहरूबाट संरचित तथ्यहरू निकाल्न **रेगेक्स ढाँचा मिलान** प्रयोग गर्छ। यी ढाँचाहरू बुझ्दा तपाईंको प्रयोग अवस्थाका लागि निष्कर्षणको गुणस्तर समायोजन गर्न मद्दत मिल्छ।

### पूर्वनिर्धारित ढाँचा श्रेणीहरू

| श्रेणी              | उदाहरण ढाँचा                                                                 | के समात्छ                            |
| ------------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| PREFERENCE_PATTERNS | `"म <X> रुचाउँछु"`, `"मलाई <X> मन पर्छ"`, `"म <X> लाई घृणा गर्छु"`           | प्रयोगकर्ताका प्राथमिकताहरू          |
| DECISION_PATTERNS   | `"म <X> प्रयोग गर्नेछु"`, `"मैले <X> गर्ने निर्णय गरेँ"`, `"मैले <X> रोजेँ"` | प्रयोगकर्ताका निर्णयहरू (प्रासङ्गिक) |
| PATTERN_PATTERNS    | `"म सामान्यतया <X>"`, `"म सधैँ <X>"`, `"म कहिल्यै <X>"`                      | स्थायी व्यवहारिक ढाँचाहरू            |

### उदाहरण ढाँचाहरू (सरलीकृत)

```ts
// src/lib/memory/extraction.ts बाट
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

### के निष्कर्षण गरिन्छ

जब प्रयोगकर्ताले यसो भन्छ:

> "म TypeScript रुचाउँछु। म यो परियोजनाका लागि Postgres प्रयोग गर्नेछु। म push गर्नुअघि सधैँ commit गर्छु। मलाई Python मन पर्दैन।"
> निष्कर्षणले 4 वटा स्मृति उत्पादन गर्छ:
>
> | कुञ्जी                               | श्रेणी     | प्रकार     | सामग्री                       |
> | ------------------------------------ | ---------- | ---------- | ----------------------------- |
> | `preference:typescript`              | प्राथमिकता | तथ्यात्मक  | "TypeScript"                  |
> | `decision:postgres_for_this_project` | निर्णय     | प्रासङ्गिक | "यो परियोजनाका लागि Postgres" |
> | `pattern:commit_before_pushing`      | ढाँचा      | तथ्यात्मक  | "push गर्नुअघि commit गर्ने"  |
> | `preference:python`                  | प्राथमिकता | तथ्यात्मक  | "Python"                      |

### निष्कर्षणका सीमाहरू

अनियन्त्रित निष्कर्षण रोक्न निम्न सीमाहरू लागू हुन्छन्:

| न्यूनतम सामग्री लम्बाइ | 3 अक्षरहरू |
| अधिकतम सामग्री लम्बाइ | 500 अक्षरहरू |

### निष्कर्षण कहिले असक्षम गर्ने

स्मृति सक्षम हुँदा निष्कर्षण स्वतः चल्छ; निष्कर्षणका लागि मात्र छुट्टै टगल छैन।
यसलाई बन्द गर्न, `PUT /api/settings/memory` मार्फत स्मृति पूर्ण रूपमा असक्षम गर्नुहोस्
(`enabled: false`)। निम्न अवस्थामा यसो गर्ने विचार गर्नुहोस्:

- तपाईंसँग सन्देशको मात्रा धेरै छ र निष्कर्षण लागत नगण्य छैन
- तपाईंका संवादहरू प्रायः अस्थायी छन् (च्याट, डिबगिङ) र तिनको दीर्घकालीन मूल्य छैन
- तपाईंले पहिले नै आफूअनुकूल प्लगइनहरूमार्फत सन्दर्भ सङ्कलन गरिरहनुभएको छ

---

## हाइब्रिड RRF समायोजन (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** एल्गोरिदमले FTS5 (कुञ्जीशब्द) र भेक्टर (अर्थगत) परिणामहरू संयोजन गर्छ। `k` प्यारामिटरले तल्लो श्रेणीका परिणामहरूलाई कति भार दिने भन्ने नियन्त्रण गर्छ।

### सूत्र

प्रत्येक उम्मेदवार स्मृतिका लागि RRF स्कोर यस्तो हुन्छ:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

जहाँ:

- `k` स्थिराङ्क हो (पूर्वनिर्धारित 60)
- `rank_i(d)` भनेको i-औँ पुनर्प्राप्ति प्रणाली (FTS, भेक्टर) मा कागजात `d` को श्रेणी हो
- योगफल सबै पुनर्प्राप्ति प्रणालीहरूमा गणना गरिन्छ

### `k` ले परिणामहरूलाई कसरी असर गर्छ

| `k` मान                     | प्रभाव                                                                           | यसका लागि उत्तम                                    |
| --------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------- |
| `k=0`                       | शुद्ध श्रेणी फ्युजन (स्मुदिङबिना)                                                | सैद्धान्तिक आधाररेखा                               |
| `k=10-30`                   | शीर्ष परिणामहरूलाई धेरै भार दिन्छ, तल्लो श्रेणीको योगदान अत्यन्त कम हुन्छ        | शीर्ष-3 परिणामहरू प्रायः सही हुँदा                 |
| **`k=60`** (पूर्वनिर्धारित) | सन्तुलित — शीर्ष-10 परिणामहरू सबैले अर्थपूर्ण रूपमा योगदान गर्छन्                | सामान्य प्रयोजनको पुनर्प्राप्ति                    |
| `k=100+`                    | अझ समतल — धेरै प्रणालीमा देखा परेमा तल्लो श्रेणीका परिणामहरू पनि हाबी हुन सक्छन् | जब रिकलबारे परिशुद्धताभन्दा बढी महत्त्वपूर्ण हुन्छ |

### व्यवहारमा `k` समायोजन गर्ने

```bash
# पूर्वनिर्धारित
MEMORY_RRF_K=60

# आक्रामक परिशुद्धता (सानो स्मृति, थोरै कागजातहरू)
MEMORY_RRF_K=20

# अधिकतम रिकलबारे (ठूलो स्मृति, विविध क्वेरीहरू)
MEMORY_RRF_K=120
```

**`k=20` भएको उदाहरण:**

- FTS श्रेणी 1 → योगदान `1/21 = 0.048`
- FTS श्रेणी 10 → योगदान `1/30 = 0.033`
- भेक्टर श्रेणी 1 → योगदान `0.048`
- संयुक्त अधिकतम: `0.096`

**`k=60` भएको उदाहरण:**

- FTS श्रेणी 1 → योगदान `1/61 = 0.016`
- FTS श्रेणी 10 → योगदान `1/70 = 0.014`
- भेक्टर श्रेणी 1 → योगदान `0.016`
- संयुक्त अधिकतम: `0.033`

`k` उच्च हुँदा, शीर्ष-1 र श्रेणी-10 बीचको **सापेक्ष भिन्नता** सानो हुन्छ, त्यसैले एल्गोरिदम शीर्ष श्रेणीको विश्वसनीयताभन्दा **पुनर्प्राप्ति प्रणालीहरूबीचको सहमति** मा बढी निर्भर हुन्छ।

### `k` कहिले परिवर्तन गर्ने

| लक्षण                                              | प्रयास गर्नुहोस्                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| शीर्ष परिणाम सधैँ जित्छ, तर त्यो गलत छ             | **कम** k (जस्तै, 20) — शीर्ष श्रेणीको विश्वसनीयता बढी महत्त्वपूर्ण हुन्छ |
| सही उत्तर शीर्ष-5 मा छ तर शीर्ष-1 मा छैन           | **उच्च** k (जस्तै, 100) — समतल स्कोरिङले सहमतिलाई पुरस्कृत गर्छ          |
| रिकलबारे उच्च छ तर परिशुद्धता कम छ                 | **कम** k — श्रेणीकरणलाई अझ तीक्ष्ण बनाउनुहोस्                            |
| रिकलबारे कम छ (सान्दर्भिक कागजातहरू छुटिरहेका छन्) | **उच्च** k — तल्लो श्रेणीका कागजातहरूलाई अवसर दिनुहोस्                   |

### RRF भार निर्धारण

रेसिप्रोकल र्याङ्क फ्युजनले अर्थगत भेक्टर श्रेणी र पूर्ण-पाठ खोज श्रेणीका लागि समान भारहरू प्रयोग गर्छ:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

व्यक्तिगत भारहरू समायोजन गर्न कुनै वातावरणीय चरहरू छैनन् (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` अस्तित्वमा छैनन्)।

---

## सारांशीकरण रणनीति (v3.8.16+)

`summarization.ts` मोड्युलले (`src/lib/memory/summarization.ts`) पुनःस्मरण क्षमता कायम राख्दै सक्रिय सेटलाई सानो राख्न पुराना स्मृतिहरू सङ्कुचित गर्छ।

### सारांशीकरण कहिले ट्रिगर हुन्छ

| ट्रिगर                     | थ्रेसहोल्ड (पूर्वनिर्धारित) |
| -------------------------- | --------------------------- |
| API मार्फत म्यानुअल ट्रिगर | लागू हुँदैन                 |

### के सारांशीकरण गरिन्छ

`summarization.ts` बाट दुईवटा प्रवेश बिन्दुहरू निर्यात गरिन्छन्:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — कुनै सत्रका
  स्मृतिहरूलाई टोकन बजेटभित्र सीमित एउटै सारांश पाठमा सङ्कुचित गर्छ।
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API द्वारा प्रयोग गरिने
  उमेरमा आधारित सङ्कुचन: यसले `days` भन्दा पुराना प्रत्येक स्मृति चयन गर्छ, तिनबाट
  एउटा सङ्कुचित सारांश स्मृति बनाउँछ, र (`dryRun` `false` हुँदा) मूल स्मृतिहरू
  मेटाउँछ। केही पनि परिवर्तन नगरी सम्भावित सेट र कुल टोकन सङ्ख्याको पूर्वावलोकन
  गर्न `dryRun: true` पास गर्नुहोस्।

कुनै ट्याग/कुञ्जी क्लस्टरिङ चरण वा प्रति-स्मृति "मुख्य बनाम सारांशीकरणयोग्य" स्कोरिङ छैन —
चयन पूर्ण रूपमा उमेरको सीमा कटअफमा आधारित हुन्छ, र सारांश पाठ प्रत्येक सम्भावित
स्मृतिका लागि प्रकार-उपसर्गयुक्त सङ्कुचित पङ्क्ति हुन्छ।

### सारांशीकरण ट्रिगर गर्ने

सारांशीकरण **म्यानुअल / स्वैच्छिक** हो — `autoSummarize` सेटिङ पूर्वनिर्धारित रूपमा
`false` हुन्छ, त्यसैले कुनै पनि कुरा स्वचालित रूपमा सङ्कुचित हुँदैन। यसलाई API मार्फत ट्रिगर गर्नुहोस्:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

यसलाई बन्द राख्न, `autoSummarize` लाई यसको पूर्वनिर्धारित मान (`false`) मै राख्नुहोस्।

### सारांशीकरणको गुणस्तर सुधार्ने सुझावहरू

- **पहिले `dryRun` प्रयोग गरेर पूर्वावलोकन गर्नुहोस्** — `summarizeMemoriesOlderThan(..., true)` ले
  सम्भावित सूची र कुल टोकन सङ्ख्या फर्काउँछ, जसले गर्दा मूल स्मृतिहरू मेटाउनुअघि
  के मर्ज हुनेछ भनेर पुष्टि गर्न सक्नुहुन्छ।
- **तपाईंसँग ठूलो स्मृति सङ्ग्रह छ भने कम ट्राफिक हुने समयमा सारांशीकरण चलाउनुहोस्** — LLM कल सबैभन्दा ढिलो भाग हो

```bash
# Cron-शैली: हरेक दिन बिहान 3 बजे सारांशीकरण गर्नुहोस्
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend प्रदायक ढाँचा

> **आधिकारिक स्रोत:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **परीक्षणहरू:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend प्रदायक ढाँचाले विद्यमान स्मृति इन्जिनमाथि **जडानयोग्य ब्याकइन्ड अमूर्तीकरण तह** प्रस्तुत गर्छ। एउटै भण्डारण कार्यान्वयनमा बाँधिनुको सट्टा, स्मृति प्रणालीले अब कन्फिगर गर्न मिल्ने प्राथमिक/फलब्याक राउटिङसहित धेरै ब्याकइन्डहरू (SQLite, Obsidian, Notion, अनुकूलित HTTP ब्याकइन्डहरू) समर्थन गर्छ।

### वास्तुकला

```
┌──────────────────────────────────────────────────────────┐
│                    API रुटहरू                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           सिङ्गलटन संयोजक (manager.ts)                    │
│                                                          │
│  प्राथमिक ──► ब्याकइन्ड A  (जस्तै SQLite)                 │
│  फलब्याक  ──► ब्याकइन्ड B  (जस्तै Obsidian)               │
│              ब्याकइन्ड C  (जस्तै GenericBackend मार्फत Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ ब्याकइन्ड   │ │ ब्याकइन्ड   │ │ ब्याकइन्ड (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### मुख्य इन्टरफेस (`backend.ts`)

हरेक ब्याकइन्डले `MemoryBackend` इन्टरफेस कार्यान्वयन गर्नुपर्छ:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // सिर्जना, पठन, अद्यावधिक र मेटाउने
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

एउटा सिङ्गलटन संयोजक जसले:

- `register(backend)` मार्फत ब्याकइन्डहरू **दर्ता गर्छ** — बुट हुँदा `index.ts` बाट कल गरिन्छ
- `configure(primary, fallbacks)` मार्फत प्राथमिक + फलब्याक **कन्फिगर गर्छ**
- विफल हुँदा फलब्याक शृङ्खलासहित CRUD/खोजलाई प्राथमिकतर्फ **रुट गर्छ**
- सबै ब्याकइन्डहरूको आवधिक रूपमा **स्वास्थ्य जाँच गर्छ**

**फलब्याक व्यवहार:**

| सञ्चालन  | प्राथमिक                   | फलब्याकहरू                  |
| -------- | -------------------------- | --------------------------- |
| `create` | ✅ प्राथमिक मात्र          | ❌                          |
| `get`    | ✅ पहिले प्राथमिकमा प्रयास | ✅ null भएमा फलब्याक        |
| `update` | ✅ प्राथमिक मात्र          | ✅ प्रतिक्रिया नपर्खी सिङ्क |
| `delete` | ✅ प्राथमिक मात्र          | ✅ प्रतिक्रिया नपर्खी सिङ्क |
| `list`   | ✅ प्राथमिक मात्र          | ❌                          |
| `search` | ✅ पहिले प्राथमिक          | ✅ त्रुटि हुँदा फलब्याक     |

#### GenericMemoryBackend (`genericBackend.ts`)

कुनै पनि REST API लाई MemoryBackend मा अनुकूलित गर्ने एउटा सामान्य HTTP कनेक्टर। निम्नका लागि उपयोगी:

- **Notion** — Notion API मार्फत जडान गर्नुहोस्
- **Obsidian** — Obsidian Local REST API मार्फत जडान गर्नुहोस्
- **अनुकूलित ब्याकइन्डहरू** — RESTful स्मृति API उपलब्ध गराउने कुनै पनि सेवा

**कन्फिगरेसन:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // ब्याकएन्ड API को आधार URL
  apiKey?: string;           // प्रमाणीकरणका लागि Bearer टोकन
  headers?: Record<string, string>;  // अनुकूलन HTTP हेडरहरू
  timeout?: number;          // अनुरोधको समयसीमा (पूर्वनिर्धारित: 30000ms)
  backendType?: string;      // लगिङका लागि

  // एन्डपोइन्ट ओभरराइडहरू (पूर्वनिर्धारितहरूले REST परम्पराहरू प्रयोग गर्छन्)
  endpoints?: {
    search?: string;   // पूर्वनिर्धारित: "/memories/search"
    create?: string;   // पूर्वनिर्धारित: "/memories"
    list?: string;     // पूर्वनिर्धारित: "/memories"
    get?: string;      // पूर्वनिर्धारित: "/memories/{id}"
    update?: string;   // पूर्वनिर्धारित: "/memories/{id}"
    delete?: string;   // पूर्वनिर्धारित: "/memories/{id}"
    health?: string;   // पूर्वनिर्धारित: "/health"
  };

  // क्वेरी प्यारामिटर नाम म्यापिङहरू
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // पाथ प्यारामिटर नाम म्यापिङहरू
  pathParams?: {
    id?/memoryId?
  };
}
```

**ज्ञात ब्याकएन्डहरू** `KNOWN_BACKENDS` मा पूर्व-कन्फिगर गरिएका छन्:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 तर्फ निर्देशित GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 तर्फ निर्देशित GenericMemoryBackend
```

#### बिल्ट-इन ब्याकएन्डहरू

##### SQLiteBackend (`sqliteBackend.ts`)

पूर्वनिर्धारित प्राथमिक ब्याकएन्ड। `src/lib/memory/store.ts` प्रयोग गरेर विद्यमान SQLite-आधारित मेमोरी स्टोरलाई र्याप गर्छ। बुट हुँदा स्वचालित रूपमा दर्ता हुन्छ।

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

विद्यमान Obsidian एकीकरण (`src/lib/memory/obsidianBackend.ts`) लाई र्याप गर्छ। Obsidian Local REST API मार्फत Obsidian भल्टमा जडान हुन्छ।

### सेटिङहरू

मेमोरी ब्याकएन्ड सेटिङहरू एप सेटिङ्स तालिकामा भण्डारण गरिन्छन् र `src/lib/memory/settings.ts` मार्फत व्यवस्थापन गरिन्छन्:

| सेटिङ                | Env/कन्फिग कुञ्जी        | पूर्वनिर्धारित | विवरण                                  |
| -------------------- | ------------------------ | -------------- | -------------------------------------- |
| प्राथमिक ब्याकएन्ड   | `memoryPrimaryBackend`   | `"sqlite"`     | प्राथमिक ब्याकएन्डको ID                |
| फलब्याक ब्याकएन्डहरू | `memoryFallbackBackends` | `[]`           | क्रमबद्ध फलब्याक ब्याकएन्ड ID हरू      |
| ब्याकएन्ड कन्फिगहरू  | `memoryBackendConfigs`   | `{}`           | प्रत्येक ब्याकएन्डका कन्फिग ओभरराइडहरू |

सेटिङहरू `normalizeMemorySettings()` मार्फत सामान्यीकृत गरिन्छन् र `getMemorySettings()` मा क्यास गरिन्छन्।

### प्रारम्भीकरण प्रवाह

```
एप बुटस्ट्र्याप
  → index.ts आयातहरू (साइड-इफेक्ट): SQLiteBackend दर्ता गर्छ
  → एपको जीवनचक्रबाट initMemoryBackends() कल गरिन्छ:
      1. सेटिङहरू लोड गर्ने (getMemorySettings)
      2. प्राथमिक + फलब्याक कन्फिगर गर्ने
      3. सबै ब्याकएन्डहरू प्रारम्भ गर्ने (स्वास्थ्य जाँच)
      4. अनुरोधहरूका लागि तयार
```

### नयाँ ब्याकएन्ड थप्ने

1. `src/lib/memory/<name>Backend.ts` मा **`MemoryBackend` कार्यान्वयन गर्नुहोस्**
2. `src/lib/memory/index.ts` बाट **निर्यात गर्नुहोस्**
3. बुट हुँदा `memoryManager.register(yourBackend)` प्रयोग गरेर **दर्ता गर्नुहोस्**
4. सेटिङहरूमार्फत **कन्फिगर गर्नुहोस्**: `memoryPrimaryBackend` लाई आफ्नो ब्याकएन्ड ID मा सेट गर्नुहोस्
5. सन्दर्भका रूपमा `src/lib/memory/__tests__/generic-backend.test.ts` प्रयोग गरेर **परीक्षण गर्नुहोस्**

#### उदाहरण: Brain ब्याकएन्ड

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

### प्रमाणीकरण

#### एकाइ परीक्षणहरू

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

अपेक्षित आउटपुट: निम्न समेट्ने **35 परीक्षणहरू, सबै उत्तीर्ण**:

- कन्स्ट्रक्टर (2)
- स्वास्थ्य जाँच (4) — सफलता, विफलता 500, नेटवर्क त्रुटि, विलम्बता
- प्रारम्भीकरण (2) — सफलता, विफलता
- सिर्जना (2) — पूर्वनिर्धारित एन्डपोइन्ट, अनुकूलन एन्डपोइन्ट
- प्राप्ति (4) — सफलता, 404 → null, गैर-404 थ्रो, अनुकूलन पाथ प्यारामिटरहरू
- अद्यावधिक (2) — सफलता, 404 → false
- मेटाउने (2) — सफलता, 404 → false
- सूची (2) — क्वेरी प्यारामिटरहरू, अनुकूलन प्यारामिटर नामहरू
- खोज (3) — क्वेरी प्यारामिटरहरू, अनुकूलन एन्डपोइन्ट, विकल्प सिरियलाइजेसन
- प्रमाणीकरण हेडरहरू (2) — Bearer टोकन, अनुकूलन हेडरहरू
- फ्याक्ट्री (1)

#### प्रकार जाँच

```bash
npm run typecheck:core
```

अपेक्षित: **0 त्रुटिहरू**।
