# Memory System (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **सत्याचा अधिकृत स्रोत:** `src/lib/memory/` आणि `src/app/api/memory/`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40 (डीफॉल्टनुसार बंद + int8 क्वांटायझेशन कॅच-अप)

OmniRoute API कीनुसार (आणि पर्यायाने सत्र id नुसार) कायमस्वरूपी संभाषणात्मक मेमरी प्रदान करते. हलक्या regex पॅटर्न-मॅचिंगद्वारे LLM प्रतिसादांमधून मेमरी स्वयंचलितपणे काढली जाते आणि त्यानंतरच्या विनंत्यांमध्ये सुरुवातीचा सिस्टम संदेश म्हणून (किंवा सिस्टम भूमिका नाकारणाऱ्या प्रदात्यांसाठी पहिला वापरकर्ता संदेश म्हणून) पुन्हा समाविष्ट केली जाते.

> **मेमरी डीफॉल्टनुसार बंद आहे (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> आता `false` आहे (`src/lib/memory/settings.ts`). मेमरी सक्षम केल्यास पुनर्प्राप्त केलेल्या संदर्भाचे
> `maxTokens` (~2k) पर्यंतचे टोकन **प्रत्येक** चॅट विनंतीमध्ये समाविष्ट होतात आणि त्यासाठी
> शुल्क आकारले जाते — नवीन इंस्टॉलेशन्ससाठी आणि स्वतःचा संदर्भ व्यवस्थापित करणाऱ्या क्लायंटसाठी
> हा अनपेक्षित खर्च ठरू शकतो. **Settings → Memory** अंतर्गत स्पष्टपणे निवड करून ते सक्षम करा (`MemorySkillsTab`
> मेमरी सक्षम असताना टोकन-खर्चाचा इशारा दर्शवतो).
> क्लायंट `x-omniroute-no-memory`
> विनंती हेडर (`true`/`1`/`yes`) वापरून एखाद्या स्वतंत्र विनंतीसाठी मेमरी वगळू शकतो — यासाठी
> [API_REFERENCE.md](../reference/API_REFERENCE.md) मधील विनंती-हेडर तक्ता पाहा. मेमरी नसलेली विनंती
> `memoryOwnerId = null` सेट करते, ज्यामुळे त्या विनंतीसाठी मेमरी आणि कौशल्य समावेशन
> **दोन्ही** अक्षम होतात (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

मेमरी **प्रत्येक API कीच्या व्याप्तीत** असते, प्रत्येक वापरकर्त्याच्या नाही — समान API की वापरून प्रमाणीकरण केलेल्या प्रत्येक विनंतीमध्ये तोच मेमरी पूल सामायिक केला जातो आणि पर्यायाने `sessionId` द्वारे व्याप्ती आणखी मर्यादित करता येते.

## आर्किटेक्चर

```
क्लायंट → /v1/chat/completions (apiKeyInfo अपस्ट्रीममध्ये निर्धारित केले जाते)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id काढतो
    → getMemorySettings()                     # कॅश केलेल्या सेटिंग्ज
    → shouldInjectMemory(body, {enabled})     # प्रवेशद्वार
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + पर्यायी व्हेक्टर
    → injectMemory(body, memories, provider)  # सिस्टम किंवा वापरकर्ता संदेश
  → अपस्ट्रीम प्रदात्याला कॉल
  → प्रतिसादावर: extractFacts(text, apiKeyId, sessionId)  # नॉन-ब्लॉकिंग
    → setImmediate → प्रत्येक जुळणीसाठी createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

समावेशन आणि निष्कर्षणाची कॉल-साइट्स
`open-sse/handlers/chatCore.ts` मध्ये जोडलेली आहेत (`retrieveMemories`, `injectMemory`
आणि `extractFacts` शोधा).

## इंजिन आर्किटेक्चर (3-स्तरीय निर्धारण)

उपलब्ध पायाभूत सुविधा आणि सेटिंग्जच्या आधारे Memory Engine रनटाइममध्ये पुनर्प्राप्तीचा मार्ग निर्धारित करते. प्राधान्यक्रमाने लागू होणारे तीन स्तर आहेत:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  स्तर 0 — कीवर्ड (FTS5)                                     │
  │  प्रोबद्वारे निर्धारित उपलब्धता: SQLite बिल्डमध्ये           │
  │  समर्थन असल्यास FTS5 (better-sqlite3 / node:sqlite /        │
  │  bun:sqlite); FTS5 नसलेल्या बिल्डवर अनुपलब्ध (उदा.           │
  │  sql.js/WASM — "no such module: fts5"). strategy = "exact"  │
  │  असताना किंवा फॉलबॅक म्हणून वापरले जाते; engine-status      │
  │  मधील keyword प्रोबचा परिणाम दर्शवतो.                       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  स्तर 1 — एम्बेडेड व्हेक्टर (sqlite-vec)                    │
  │  sqlite-vec v0.1.9 हे db.loadExtension() द्वारे लोड केले जाते.│
  │  Float32 व्हेक्टर्सवर KNN ब्रूट-फोर्स. पुढील वेळी सक्रिय:     │
  │   • sqlite-vec loadExtension यशस्वी होते                     │
  │   • Float32Array तयार करू शकणारा एम्बेडिंग स्रोत उपलब्ध आहे  │
  │     (remote | static | transformers)                         │
  │   • vec_memories तक्ता अस्तित्वात आहे (पहिल्या ready() वेळी │
  │     तयार केला जातो)                                         │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  स्तर 2 — Qdrant (निवडून सक्षम करायचा बाह्य व्हेक्टर डेटाबेस)│
  │  सक्षम केल्यावर semantic/hybrid साठी sqlite-vec ची जागा घेतो.│
  │  चालू Qdrant इंस्टन्स + कॉन्फिगर केलेले host/port आवश्यक.    │
  └─────────────────────────────────────────────────────────────┘
```

क्षमता-कपात स्वयंचलित आणि पारदर्शक आहे:

- sqlite-vec लोड करण्यात अपयश आल्यास स्तर 1 अनुपलब्ध होतो → स्तर 0 वर फॉलबॅक होते.
- एम्बेडिंग स्रोताने त्रुटी परत केल्यास स्तर 1 कडून स्तर 0 वर फॉलबॅक होते.
- Qdrant अस्वस्थ असल्यास स्तर 2 कडून स्तर 1 वर (किंवा स्तर 1 देखील
  अनुपलब्ध असल्यास स्तर 0 वर) फॉलबॅक होते.

## एम्बेडिंग स्रोत

एम्बेडिंग स्तर (`src/lib/memory/embedding/`) `MemorySettingsExtended.embeddingSource` च्या आधारे कोणता स्रोत वापरायचा हे ठरवतो:

| स्रोत          | वर्णन                                                                         | की आवश्यक | कोल्ड स्टार्ट    |
| -------------- | ----------------------------------------------------------------------------- | --------- | ---------------- |
| `remote`       | कॉन्फिगर केलेल्या प्रदात्याचा एम्बेडिंग API वापरतो (OpenAI, Cohere इ.)        | होय       | नाही             |
| `static`       | `potion-base-8M` द्वारे स्थानिक लुकअप-टेबल एम्बेडिंग (WordPiece + मीन पूलिंग) | नाही      | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` द्वारे स्थानिक ONNX अनुमान | नाही      | ~3s + ~400MB RAM |
| `auto`         | रनटाइम निर्धारण: remote (की असल्यास) → static → transformers → null           | अवलंबून   | अवलंबून          |

**`auto` साठी निर्धारण क्रम:**

1. `listEmbeddingProviders()` मधील `hasKey === true` असलेला पहिला प्रदाता शोधा → `remote`.
2. `settings.staticEnabled === true` असल्यास → `static`.
3. `settings.transformersEnabled === true` असल्यास → `transformers`.
4. अन्यथा → `null` (FTS5 कीवर्ड शोधावर अवनत होते).

एम्बेडिंग कॅशे (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` द्वारे की केलेला इन-मेमरी LRU मॅप वापरतो, जो `MEMORY_EMBEDDING_CACHE_MAX` नोंदींपर्यंत (डीफॉल्ट 1000) मर्यादित असून त्याचा TTL `MEMORY_EMBEDDING_CACHE_TTL_MS` (डीफॉल्ट 5 मिनिटे) आहे. प्रत्येक प्रोसेसच्या जीवनचक्रात तो सर्व कॉलर्समध्ये सामायिक केला जातो.

## हायब्रिड RRF (k=60)

`strategy = "hybrid"` असताना आणि व्हेक्टर स्टोअर उपलब्ध असताना, पुनर्प्राप्ती FTS5 आणि व्हेक्टर परिणाम एकत्र करण्यासाठी Reciprocal Rank Fusion वापरते:

```
RRF(d) = Σ  1 / (k + rank_i(d))      जेथे k = 60 (MEMORY_RRF_K द्वारे कॉन्फिगर करण्यायोग्य)
          i
```

विशेषतः:

1. FTS5 शोध चालवा → क्रमांकित सूची `R_fts` (स्थान 1..N).
2. KNN व्हेक्टर शोध चालवा → क्रमांकित सूची `R_vec` (स्थान 1..M).
3. प्रत्येक अद्वितीय `memoryId` साठी:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (सूचीत नसल्यास 0).
4. `rrf_score` नुसार उतरत्या क्रमाने लावा आणि टोकन बजेट वॉक लागू करा.

विषम पुनर्प्राप्ती प्रणालींमधील स्कोअर सामान्यीकरणाची आवश्यकता न ठेवता RRF प्रभावी असल्याचे सर्वज्ञात आहे. डीफॉल्ट `k=60` हे मूळ Cormack इत्यादींच्या शोधपत्रातून घेतले आहे आणि लहान कॉर्पोरासाठी (<10k स्मृती) चांगले कार्य करते.

## बॅकफिल (लेझी + रीइंडेक्स)

एम्बेडिंग मॉडेल बदलल्यावर (`embedding_signature` द्वारे शोधले जाते), व्हेक्टर स्टोअर पुन्हा तयार केले जाते आणि सर्व विद्यमान स्मृतींना `memories` टेबलमध्ये `needs_reindex = 1` म्हणून चिन्हांकित केले जाते.

**लेझी बॅकफिल**: पुढील पुनर्प्राप्तीच्या वेळी, व्हेक्टर नोंद नसलेली कोणतीही स्मृती एम्बेड केली जाते आणि शोध चालण्यापूर्वी `vec_memories` मध्ये समाविष्ट केली जाते. यामुळे स्टार्टअप अवरोधित न करता बॅकफिलचा खर्च वास्तविक विनंत्यांमध्ये विभागला जातो.

**स्पष्ट रीइंडेक्स**: `/dashboard/memory` मधील Engine टॅबमध्ये `POST /api/memory/reindex` कॉल करणारे "आता रीइंडेक्स करा" बटण उपलब्ध आहे. हँडलर `src/lib/memory/reindex.ts` मधून `runReindexBatch()` कॉल करतो, जे प्रत्येक विनंतीमध्ये `limit` पर्यंत प्रलंबित नोंदींवर प्रक्रिया करते. प्रगतीचे पोलिंग `GET /api/memory/engine-status` (`vectorStore.needsReindex`) द्वारे करता येते.

`memory_vec_meta` टेबल (मायग्रेशन `083_memory_vec.sql`) यामध्ये पुढील गोष्टी साठवते:

- `active_dim` — सध्याचे व्हेक्टर परिमाण (null = अद्याप कॅलिब्रेट केलेले नाही).
- `embedding_signature` — बदल शोधण्यासाठी वापरलेले `${source}:${model}:${dim}`.
- `last_reset_at` — शेवटच्या पूर्ण रीसेटचा टाइमस्टॅम्प.
- `vec_loaded` — sqlite-vec यशस्वीरीत्या लोड झाले की नाही हे दर्शवणारा 0/1 फ्लॅग.

## सेटिंग्ज विस्तार

`MemorySettingsExtended` मध्ये नऊ एम्बेडिंग आणि व्हेक्टर फील्ड उपलब्ध आहेत
`src/shared/schemas/memory.ts` मध्ये, आणि `src/lib/db/settings.ts` द्वारे कायमस्वरूपी संग्रहित केली जातात:

| फील्ड                    | प्रकार                                             | डीफॉल्ट  | वर्णन                                                        |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | वापरायचा एम्बेडिंग स्रोत                                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` स्वरूपातील प्रदाता/मॉडेल                    |
| `customBaseUrl`          | `string \| null`                                   | `null`   | केवळ मेमरीसाठी OpenAI-सुसंगत एंडपॉइंटचा बेस URL              |
| `customModelId`          | `string \| null`                                   | `null`   | कस्टम एंडपॉइंटला पाठवलेला मॉडेल ID                           |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js साठी स्वेच्छेने सक्षम करणे (MiniLM, ~400MB)  |
| `staticEnabled`          | `boolean`                                          | `false`  | स्थिर potion-base-8M स्थानिक मॉडेलसाठी स्वेच्छेने सक्षम करणे |
| `rerankEnabled`          | `boolean`                                          | `false`  | पुनःक्रमांकन टप्पा सक्षम करा (प्रति विनंती +200-500ms वाढते) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` स्वरूपातील पुनःक्रमांकन प्रदाता/मॉडेल       |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | वापरायचा व्हेक्टर बॅकएंड                                     |

हे `GET /PUT /api/settings/memory` द्वारे उपलब्ध केले आहेत (स्कीमा `MemorySettingsExtendedSchema`).

`remote` स्रोतासाठी, मेमरी पर्यायी `customBaseUrl` आणि
`customModelId` सेटिंग्जदेखील स्वीकारते. एकत्रितपणे, त्या जागतिक एम्बेडिंग रजिस्ट्री न बदलता OpenAI-सुसंगत `/embeddings`
एंडपॉइंट आणि मॉडेल निवडतात. वापरण्यापूर्वी एंडपॉइंटचे
सामान्यीकरण केले जाते आणि प्रदात्याच्या आउटबाउंड URL धोरणानुसार त्याची तपासणी केली जाते: HTTP(S)
आवश्यक आहे, अंतःस्थापित क्रेडेन्शियल्स आणि क्वेरी स्ट्रिंग्ज नाकारल्या जातात, आणि क्लाउड-मेटाडेटा
पत्ते अवरोधितच राहतात. रिक्त मूल्ये निवडलेला रजिस्ट्री प्रदाता कायम ठेवतात. डॅशबोर्डला
परत केलेल्या त्रुटी स्वच्छ केल्या जातात आणि एंडपॉइंट क्रेडेन्शियल्सची कधीही नोंद केली जात नाही.

> **TODO (D20):** `global` स्कोप (सर्व API कीजमध्ये मेमरी सामायिक करणे) या
> रिलीजमध्ये अंमलात आणलेला नाही. त्यासाठी स्कीमामध्ये बदल आणि जागतिक पुनर्प्राप्ती
> मार्ग आवश्यक आहे. याचा स्वतंत्रपणे मागोवा घ्या.

## स्टोरेज स्तर

### प्राथमिक: SQLite (`memories` टेबल)

`015_create_memories.sql` मायग्रेशनद्वारे तयार केलेले:

| स्तंभ                       | प्रकार             | नोंदी                                                                        |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` द्वारे निर्माण केलेला UUID                             |
| `api_key_id`                | `TEXT NOT NULL`    | मालकीची API की                                                               |
| `session_id`                | `TEXT`             | प्रत्येक संभाषणासाठी पर्यायी स्कोप                                           |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` यांपैकी एक                   |
| `key`                       | `TEXT`             | स्थिर अपसर्ट की, उदा. `preference:i_prefer_python`                           |
| `content`                   | `TEXT NOT NULL`    | प्रत्यक्ष तथ्याचा मजकूर                                                      |
| `metadata`                  | `TEXT`             | JSON ब्लॉब (श्रेणी, extractedAt, स्रोत, ...)                                 |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 स्ट्रिंग्ज                                                          |
| `expires_at`                | `TEXT`             | पर्यायी कालबाह्यता; `NULL` म्हणजे कायमस्वरूपी                                |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowids जोडण्यासाठी `023_fix_memory_fts_uuid.sql` द्वारे जोडलेले |

इंडेक्स: `api_key_id`, `session_id`, `type`, `expires_at`, तसेच युनिक
`memory_id` इंडेक्स.

**अपसर्ट अर्थव्यवहार**: `createMemory()` समान
`(api_key_id, key)` असलेली विद्यमान पंक्ती शोधते आणि सापडल्यास ती त्याच ठिकाणी अपडेट करते (`metadata` चे
शॅलो स्प्रेडद्वारे विलीनीकरण करते). यामुळे वारंवार येणाऱ्या
प्राधान्य विधानांमुळे टेबल अमर्याद वाढत नाही.

### पूर्ण-मजकूर शोध (`memory_fts` व्हर्च्युअल टेबल)

`022_add_memory_fts5.sql`, `content` आणि
`key` वर एक FTS5 व्हर्च्युअल टेबल तयार करते. `023_fix_memory_fts_uuid.sql` प्रत्यक्ष वापरातील एक बग दुरुस्त करते, ज्यात UUID
प्राथमिक की FTS5 च्या पूर्णांक rowid शी जुळत नव्हती — हे मायग्रेशन
`memory_id` स्तंभ जोडते, FTS टेबल पुन्हा तयार करते आणि
INSERT, DELETE आणि UPDATE वेळी FTS समक्रमित ठेवणारे ट्रिगर्स
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) जोडते.

`semantic` आणि `hybrid` धोरणांसाठी `retrieval.ts` द्वारे वापरले जाते (खाली पहा).
पुनर्प्राप्ती कोड `hasTable("memory_fts")` द्वारे सुरक्षा तपासणी करतो आणि
FTS टेबल नसल्यास किंवा FTS क्वेरीने त्रुटी दिल्यास कालानुक्रमिक क्रमावर परत जातो.

### पर्यायी: Qdrant (व्हेक्टर स्टोअर स्तर 2)

`src/lib/memory/qdrant.ts` स्तर 2
व्हेक्टर स्टोअर म्हणून पर्यायी Qdrant एकत्रीकरण अंमलात आणते. इंजिन सिलेक्टर
`memoryVectorStore === "qdrant"` असतानाच पुनर्प्राप्ती Qdrant कडे पाठवली जाते — डीफॉल्ट `"auto"` (आणि `"sqlite-vec"`)
Qdrant ची **कधीही** निवड करत नाहीत. Engine टॅबमधील टॉगल `qdrantEnabled` आणि
`memoryVectorStore` **दोन्ही** एकत्र सेट करतो: सक्षम केल्यावर Qdrant प्राथमिक स्टोअर बनते, आणि अक्षम केल्यावर
ते `"auto"` वर रीसेट होते (#5597 — त्या दुरुस्तीपूर्वी, सक्षम करणे निष्प्रभावी होते कारण
इंजिन सिलेक्टरमध्ये काहीही लिहिले जात नव्हते). Qdrant उपलब्ध नसल्यास किंवा काहीही परत न केल्यास, पुनर्प्राप्ती
sqlite-vec → FTS5 वर परत जाते.

- `upsertSemanticMemoryPoint()` — कॉन्फिगर केलेल्या एम्बेडिंग मॉडेलसह `key + content`
  एम्बेड करते, कलेक्शन अस्तित्वात असल्याची खात्री करते (पहिल्या वापराच्या वेळी
  cosine-distance व्हेक्टर तयार करते), आणि `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` पेलोडसह पॉइंट अपसर्ट करते.
- `searchSemanticMemory(query, topK, scope)` — क्वेरी एम्बेड करते, `kind = "omniroute_memory"`
  नुसार आणि पर्यायाने `apiKeyId` / `sessionId` नुसार फिल्टर केलेल्या
  कलेक्शनमध्ये शोधते. `topK` ला `[1, 20]` पर्यंत मर्यादित करते.
- `deleteSemanticMemoryPoint(id)` — एक पॉइंट हटवते. SQLite रो काढून टाकल्यानंतर
  `deleteMemory()` द्वारे कॉल केले जाते (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — ज्यांचे `expiresAtUnix`
  भूतकाळातील आहे किंवा ज्यांचे `createdAtUnix` धारणा मर्यादेपेक्षा जुने आहे, असे पॉइंट मोठ्या प्रमाणात हटवते.
  डॅशबोर्डवर प्रत्यक्ष संख्या दाखवता यावी म्हणून आधी मोजणी करते.
- `checkQdrantHealth()` — विलंबासह `GET /readyz` आरोग्य तपासणी.

सेटिंग्ज UI मध्ये `/dashboard/memory` च्या **Engine टॅबमध्ये** Qdrant कॉन्फिगरेशन, आरोग्य तपासणी, सिमॅंटिक शोध चाचणी
आणि क्लीनअप उपलब्ध आहेत. `src/app/api/settings/qdrant/` अंतर्गत संबंधित
सर्व रूट्स v3.8.6 पासून जोडलेले आहेत:

| रूट                                     | पद्धत         | वर्णन                            |
| --------------------------------------- | ------------- | -------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant सेटिंग्ज वाचा / अपडेट करा |
| `/api/settings/qdrant/health`           | `GET`         | लाइव्हनेस तपासणी + विलंब         |
| `/api/settings/qdrant/search`           | `POST`        | सिमॅंटिक शोध चाचणी               |
| `/api/settings/qdrant/cleanup`          | `POST`        | कालबाह्य / जुने पॉइंट्स काढा     |
| `/api/settings/qdrant/embedding-models` | `GET`         | उपलब्ध एम्बेडिंग मॉडेल्सची यादी  |

**वर्तनाबद्दल नोंदी (काय अपेक्षित आहे):**

- **इंजिन निवड** — Engine टॅबमध्ये Qdrant सक्षम केल्याने ते प्राथमिक
  स्टोअर बनते (`memoryVectorStore="qdrant"` सेट करते); अक्षम केल्याने ते `"auto"` वर रीसेट होते (#5597).
- **बॅक-फिल नाही** — Qdrant सक्षम केल्यानंतर तयार/अपडेट केलेल्या मेमरीजच
  त्यात लिहिल्या जातात (fire-and-forget दुहेरी लेखन). आधीपासून असलेल्या SQLite मेमरीज
  स्थलांतरित केल्या जात **नाहीत**; "Reindex Now" फक्त sqlite-vec इंडेक्स पुन्हा तयार करते, Qdrant नाही.
- **व्हेक्टरचे डायमेन्शन आपोआप शोधले जाते** — पहिल्या वापराच्या वेळी प्रत्यक्ष एम्बेडिंगवरून;
  भरण्यासाठी कोणतेही डायमेन्शन फील्ड नाही. कलेक्शन अस्तित्वात आल्यानंतर एम्बेडिंग मॉडेल बदलणे
  आपोआप हाताळले जात **नाही**: विद्यमान कलेक्शन तसेच ठेवले जाते, डायमेन्शन
  न जुळणारी लेखने/शोध अयशस्वी होतात आणि sqlite-vec वर फॉलबॅक होतात. एम्बेडर बदलण्यासाठी
  कलेक्शन पुन्हा तयार करा (नवीन नाव द्या किंवा ते Qdrant मधून हटवा).
- **अंतर मेट्रिक** — नेहमी **Cosine** (कलेक्शन तयार करताना हार्डकोड केलेले;
  कॉन्फिगर करता येत नाही).
- **प्रमाणीकरण** — केवळ API की (`api-key` हेडर म्हणून पाठवली जाते; प्रमाणीकरण नसलेल्या
  स्थानिक Docker साठी पर्यायी). JWT/RBAC वापरले जात नाहीत.
- **कॉन्फिगरेशन फील्ड्स** — UI मध्ये `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` उपलब्ध आहेत. `vectorSize` / `hnswEfConstruct` केवळ env/DB मध्ये आहेत आणि कलेक्शन तयार करण्यासाठी
  `vectorSize` वापरले जात नाही (डायमेन्शन एम्बेडिंगमधून मिळते).

### व्हेक्टर क्वांटायझेशन (int8 — पर्यायाने सक्षम, दोन्ही बॅकएंड्स)

दोन्ही व्हेक्टर बॅकएंड्समध्ये साठवलेल्या व्हेक्टर्सचा मेमरी वापर कमी करण्यासाठी
**पर्यायाने सक्षम करता येणारे int8 क्वांटायझेशन** समर्थित आहे (Float32 पेक्षा सुमारे 4× लहान), मात्र रिकॉलमध्ये किंचित घट होते.
दोन्हींवर डीफॉल्टने ते **बंद** असते — स्पष्टपणे सक्षम केल्याशिवाय व्हेक्टर्स पूर्ण-प्रिसिजनमध्ये राहतात.

| बॅकएंड     | सेटिंग                          | प्रकार                         | डीफॉल्ट  | कुठे वाचले जाते                                             |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB की)    | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** प्रत्येक इन्स्टन्ससाठी `qdrantQuantization` सेटिंग
  कीद्वारे कॉन्फिगर केले जाते (`PUT /api/settings/qdrant` वर `quantization` फील्ड म्हणून उपलब्ध). जेव्हा
  `"int8"` असते, तेव्हा `buildQuantizationConfig()` स्केलर क्वांटायझेशनची
  (`always_ram`, क्वांटाइल `0.99`) विनंती करते आणि शोध `rescore: true` सक्षम करतात, जेणेकरून
  पूर्ण-प्रिसिजन व्हेक्टर्स int8 उमेदवार संच अधिक अचूक करतात.
- **sqlite-vec** क्वांटायझेशन **केवळ एन्व्हायर्नमेंटद्वारे** कॉन्फिगर करता येते (DB सेटिंग नाही): स्थानिक व्हेक्टर्स
  `vec_quantize_int8(?, 'unit')` द्वारे `int8[dim]` कॉलम म्हणून साठवण्यासाठी
  `MEMORY_VEC_QUANTIZATION=int8` सेट करा. निवडलेला मोड
  `embedding_signature` मध्ये (`:int8` प्रत्ययासह) समाविष्ट केला जातो, त्यामुळे मोड बदलल्यास
  `vec_memories` टेबलचे पूर्ण रीइंडेक्सिंग सुरू होते — एम्बेडिंग मॉडेल बदलल्यावर वापरला जाणारा
  हाच lazy-backfill मार्ग आहे.

## मेमरीचे प्रकार

`MemoryType` (`src/lib/memory/types.ts`):

| प्रकार       | यासाठी वापरला जातो                                                          |
| ------------ | --------------------------------------------------------------------------- |
| `factual`    | प्राधान्ये, वापरकर्त्याविषयी स्थिर तथ्ये, वर्तणुकीचे नमुने                  |
| `episodic`   | विशिष्ट क्षणाशी संबंधित निर्णय ("मी Postgres निवडले")                       |
| `procedural` | कार्यप्रवाह / कसे-करावे मेमरी (आरक्षित; सध्या स्वयंचलित एक्स्ट्रॅक्टर नाही) |
| `semantic`   | व्हेक्टर-स्टोअर नोंदींसाठी आरक्षित                                          |

`MemoryConfig` ची पुनर्प्राप्ती रणनीती `exact`, `semantic`, किंवा `hybrid` यांपैकी एक असते,
आणि व्याप्ती `session`, `apiKey`, किंवा `global` यांपैकी एक असते.
`getMemorySettings()` मधील डीफॉल्ट व्याप्ती `apiKey` आहे.

## तथ्य निष्कर्षण (`extraction.ts`)

निष्कर्षण **regex-आधारित** आहे, LLM-आधारित नाही — ते प्रक्रियेमध्येच
`setImmediate()` वापरून चालते, त्यामुळे प्रतिसाद प्रवाह कधीही अवरोधित होत नाही:

- **प्राधान्य नमुने** → `MemoryType.FACTUAL`
  (उदा. `मला … पसंत आहे`, `मला … खरोखर आवडते`, `माझे आवडते … आहे`, `मला … आवडत नाही`)
- **निर्णय नमुने** → `MemoryType.EPISODIC`
  (उदा. `मी … वापरेन`, `मी … निवडले`, `मी … स्वीकारले`, `मी … अवलंबणार आहे`)
- **वर्तन नमुने** → `MemoryType.FACTUAL`
  (उदा. `मी सहसा …`, `मी नेहमी …`, `माझी … करण्याची प्रवृत्ती आहे`)

प्रत्येक जुळणीचे शुद्धीकरण केले जाते (`trim`, रिक्त जागा संक्षिप्त करणे, कमाल 500 वर्ण),
स्थिर `factKey(category, content)` द्वारे बॅचमध्ये डुप्लिकेट नोंदी काढून टाकल्या जातात,
आणि `{category, extractedAt, source: "llm_response"}` या मेटाडेटासह
`createMemory()` द्वारे साठवल्या जातात. इनपुट मजकूर 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`) पर्यंत मर्यादित केला जातो — तो अधिक लांब असल्यास
मजकुराचा **शेवटचा भाग** वापरला जातो, जेणेकरून सर्वात अलीकडील असिस्टंट सामग्री नेहमी समाविष्ट होईल.

`extractFactsFromText(text)` चाचण्यांसाठी एक्सपोर्ट केले आहे आणि ते तथ्ये न साठवता
संरचित तथ्ये परत करते.

## पुनर्प्राप्ती (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` हा मुख्य प्रवेशबिंदू आहे. तो:

1. `MemoryConfigSchema` द्वारे कॉन्फिगचे सामान्यीकरण आणि प्रमाणीकरण करतो.
2. `enabled` हे false असल्यास किंवा `maxTokens <= 0` असल्यास लगेच `[]` परत करतो.
3. `maxTokens` ला `[1, 8000]` या मर्यादेत ठेवतो.
4. जुने डेटाबेस कार्यरत राहावेत यासाठी आधुनिक `memories` टेबल अस्तित्वात आहे का
   (की लेगसी `memory` टेबल आहे) हे शोधतो.
5. कालबाह्यता गार्ड
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), पर्यायी
   सेशन व्याप्ती आणि पर्यायी `retentionDays` कटऑफसह बेस क्वेरी तयार करतो.
6. रणनीतीनुसार शाखा निवडतो:
   - **`exact`** (डीफॉल्ट): कालानुक्रमिक `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` आणि `memory_fts` अस्तित्वात असल्यास,
     `memory_fts MATCH ?` सह JOIN करतो आणि FTS रँकनुसार क्रम लावतो; FTS ने 0 पंक्ती
     परत केल्यास कालानुक्रमिक क्रमावर परत जातो.
   - **`hybrid`**: FTS परिणाम (अधिक सुसंगतता) आणि कालानुक्रमिक संच यांचे युनियन,
     id नुसार डुप्लिकेट नोंदी काढून.
7. क्वेरी दिली असल्यास `content`, `key`, आणि `metadata` JSON वर कीवर्ड
   सुसंगतता स्कोअर (`getRelevanceScore`) मोजतो. शून्य स्कोअर असलेल्या पंक्ती
   वगळल्या जातात.
8. प्रथम स्कोअरनुसार उतरत्या क्रमाने आणि नंतर `createdAt` नुसार उतरत्या क्रमाने मांडतो.
9. क्रमांकित यादीतून पुढे जातो आणि चालू `estimateTokens(content)`
   (≈ `length / 4`) बजेटच्या मर्यादेत असेपर्यंत नोंदी स्वीकारतो. कोणतीही जुळणारी नोंद
   असल्यास नेहमी किमान एक नोंद परत करतो.

`estimateTokens` एक्सपोर्ट केले आहे आणि पुनर्प्राप्ती, सारांशनिर्मिती आणि MCP
`omniroute_memory_search` साधनाद्वारे वापरले जाते.

## इंजेक्शन (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. सर्व मेमरीतील मजकूर एकाच `Memory context: …` स्ट्रिंगमध्ये जोडते.
2. प्रोव्हायडरच्या नावानुसार धोरण निवडते:
   - **सिस्टम संदेश** (OpenAI, Anthropic, Gemini, … यांच्यासाठी डीफॉल्ट) — कोणत्याही विद्यमान सिस्टम
     संदेशांपूर्वी `{role: "system", content: memoryText}` जोडते, जेणेकरून वापरकर्त्याच्या सिस्टम प्रॉम्प्टना तरीही प्राधान्य मिळेल.
   - **वापरकर्ता संदेश** (फॉलबॅक) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` मधील
     प्रोव्हायडरसाठी: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. हे सिस्टम भूमिका नाकारतात
     आणि अन्यथा 400 त्रुटी देतील (GLM/Zhipu साठी issue #1701 पहा).
3. `memory.injection.injected` अंतर्गत संख्या, धोरण आणि मॉडेल लॉग करते.

स्वतःचे राउटिंग निर्णय घेण्याची आवश्यकता असलेल्या कॉलर्ससाठी `providerSupportsSystemMessage(provider)` एक्सपोर्ट केले आहे. सुरक्षिततेसाठी अज्ञात प्रोव्हायडरसाठी डीफॉल्ट मूल्य `true`
(सिस्टम भूमिकेला परवानगी) असते.

## सेटिंग्ज (`settings.ts`)

मेमरी कॉन्फिगरेशन env vars मध्ये नव्हे, तर **DB सेटिंग्ज टेबलमध्ये संग्रहित केले जाते**.
`getMemorySettings()`, `getSettings()` मधून वाचते आणि निकाल
प्रक्रियेमध्ये कॅश करते; लिहिल्यानंतर सेटिंग्ज PUT
रूटद्वारे `invalidateMemorySettingsCache()` कॉल केले जाते.

### लेगसी फील्ड्स (सर्व आवृत्त्या)

| DB key                | प्रकार  | डीफॉल्ट                                             | UI नियंत्रण                                                |
| --------------------- | ------- | --------------------------------------------------- | ---------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 पासून डीफॉल्टनुसार बंद)            | मेमरी सुरू/बंद                                             |
| `memoryMaxTokens`     | integer | `2000` (श्रेणी `0–16000`)                           | इंजेक्शनसाठी टोकन बजेट                                     |
| `memoryRetentionDays` | integer | `30` (श्रेणी `1–365`)                               | धारणा कालावधी                                              |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` पैकी एक) | पुनर्प्राप्ती धोरण                                         |
| `skillsEnabled`       | boolean | `false`                                             | प्रत्येक key साठी skill इंजेक्शन टॉगल करते (SKILLS.md पहा) |

टीप: UI धोरण `"recent"`, `toMemoryRetrievalConfig()` द्वारे अंतर्गत `"exact"` पुनर्प्राप्ती
धोरणाशी मॅप केले जाते (कालानुक्रमिक क्रम).

### नवीन फील्ड्स (v3.8.6, plan 21 D9)

फील्डच्या वर्णनांसाठी वरील "सेटिंग्ज विस्तार" विभागही पहा.

| DB key                      | API field                | डीफॉल्ट  |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-संबंधित DB keys (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` डीफॉल्ट `"omniroute_memory"`,
`qdrantEmbeddingModel` डीफॉल्ट `"openai/text-embedding-3-small"`) हे
`qdrant.ts` मधील `normalizeQdrantConfig()` द्वारे वाचले जातात.

### पर्यावरणीय चल (v3.8.6)

सहा पर्यायी env vars इंजिनचे रनटाइम वर्तन समायोजित करतात (`.env.example` मध्ये दस्तऐवजीकरण केले आहे):

| चल                              | डीफॉल्ट                    | वर्णन                                                                                                                                                |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | एम्बेडिंग कॅश TTL (5 मिनिटे)                                                                                                                         |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | एम्बेडिंग LRU कॅशमधील नोंदींची कमाल संख्या                                                                                                           |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js मॉडेलसाठी HF repo                                                                                                                    |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | स्टॅटिक potion मॉडेलसाठी HF repo                                                                                                                     |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | डाउनलोड केलेली मॉडेल्स कुठे संग्रहित करायची                                                                                                          |
| `MEMORY_VEC_TOP_K`              | `20`                       | व्हेक्टर शोधासाठी डीफॉल्ट top-K                                                                                                                      |
| `MEMORY_RRF_K`                  | `60`                       | हायब्रिड शोधासाठी RRF k स्थिरांक                                                                                                                     |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | स्थानिक sqlite-vec व्हेक्टर्स क्वांटाइझ करून संग्रहित करण्यासाठी `int8` वर सेट करा (~4× लहान; निवडाधारित). मोड बदलल्यास सक्तीने रीइंडेक्स केले जाते. |

## सारांशीकरण (`summarization.ts`)

एखाद्या कीच्या मेमरीजमधील चालू टोकनची एकूण संख्या बजेटपेक्षा जास्त झाल्यास `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` जुना मजकूर संक्षिप्त करते. हे `created_at` नुसार DESC क्रमाने पंक्तींवर पुनरावृत्ती करते, मर्यादेत बसणाऱ्या पंक्ती ठेवते आणि उर्वरित पंक्तींमधील `content` मूळ मजकुराच्या पहिल्या तीन वाक्यांनी त्याच ठिकाणी बदलते. `tokensSaved` म्हणजे जुन्या आणि नवीन मजकुराच्या `estimateTokens` मधील फरक.

ही प्रक्रिया सध्याच्या चॅट पाइपलाइनमध्ये **उपलब्ध आहे, परंतु स्वयंचलितपणे कॉल केली जात नाही** — तुम्हाला सतत संक्षिप्तीकरण आवश्यक असल्यास ती cron, admin action किंवा `MemoryConfig.autoSummarize` ग्लूमधून कॉल करा. डेटाची हानी एकमार्गी आहे: मूळ मजकूर अधिलिखित केला जातो.

## REST API

सर्व एंडपॉइंट्सना व्यवस्थापन प्रमाणीकरण (`requireManagementAuth`) आवश्यक आहे.

### मुख्य मेमरी एंडपॉइंट्स (विद्यमान + अद्ययावत)

| पद्धत    | पथ                   | वर्णन                                                                                                                                                                                    |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | फिल्टर्ससह पृष्ठांकित सूची: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. प्रतिसादात `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` समाविष्ट असतात  |
| `POST`   | `/api/memory`        | नोंद तयार करते (Zod-द्वारे सत्यापित: `content`, `key`, पर्यायी `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `createMemory()` कॉल करते, जे `(apiKeyId, key)` वर upsert करते |
| `GET`    | `/api/memory/[id]`   | UUID नुसार एक नोंद मिळवते                                                                                                                                                                |
| `PUT`    | `/api/memory/[id]`   | नोंदीची फील्ड्स (`type`, `key`, `content`, `metadata`) अद्ययावत करते. बॉडी: `MemoryUpdatePutSchema`. एम्बेडिंग स्रोत उपलब्ध असल्यास व्हेक्टरही सिंक करते.                                |
| `DELETE` | `/api/memory/[id]`   | नोंद हटवते; `vec_memories` (D15) आणि सर्वोत्तम प्रयत्नाने Qdrant मधूनही हटवते. नोंद नसल्यास 404 परत करते.                                                                                |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` चालवते — तयार करा→सूची करा→हटवा ही पूर्ण फेरी. `{working, latencyMs, error?}` परत करते                                                        |

### नवीन मेमरी इंजिन एंडपॉइंट्स (योजना 21)

| पद्धत  | पथ                                | वर्णन                                                                                                                                                                  |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` ची ड्राय-रन — स्कोअर, टियर आणि टोकन्ससह क्रमांकित परिणाम परत करते. बॉडी: `RetrievePreviewSchema`. मेमरीज इंजेक्ट किंवा बदलत नाही.                   |
| `GET`  | `/api/memory/embedding-providers` | एम्बेडिंग मॉडेल्ससह प्रोव्हायडर्सची सूची देते आणि कोणासाठी API की कॉन्फिगर केलेली आहे ते दर्शवते.                                                                      |
| `GET`  | `/api/memory/engine-status`       | इंजिनची संपूर्ण स्थिती परत करते: कीवर्ड टियर, एम्बेडिंग रिझोल्यूशन, व्हेक्टर स्टोअरची आकडेवारी, Qdrant चे आरोग्य, रीरँक कॉन्फिगरेशन. रचना: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | मेमरी संक्षिप्तीकरण मॅन्युअली ट्रिगर करते. बॉडी: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` परत करते.               |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` असलेल्या मेमरीजसाठी व्हेक्टर रीइंडेक्स ट्रिगर करते. बॉडी: `MemoryReindexSchema` (`force`). `{started, pending}` परत करते.                            |

### सेटिंग्ज एंडपॉइंट्स

| पद्धत  | पथ                                      | वर्णन                                                                                                                 |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | सध्याचे सामान्यीकृत `MemorySettingsExtended` (7 नवीन फील्ड्स + लेगसी)                                                 |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` मधील कोणतेही फील्ड अद्ययावत करते (एकूण 12 फील्ड्स)                                     |
| `GET`  | `/api/settings/qdrant`                  | सध्याच्या Qdrant सेटिंग्ज (`QdrantSettingsSchema`)                                                                    |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant सेटिंग्ज अद्ययावत करते. बॉडी: `QdrantSettingsUpdateSchema`. `apiKey` = रिकामी स्ट्रिंग असल्यास की काढून टाकते. |
| `GET`  | `/api/settings/qdrant/health`           | कॉन्फिगर केलेल्या Qdrant इन्स्टन्सवर लाइव्हनेस प्रोब करते. `QdrantHealthResultSchema` परत करते.                       |
| `POST` | `/api/settings/qdrant/search`           | Qdrant वर सिमॅंटिक शोधाची चाचणी करते. बॉडी: `QdrantSearchSchema` (`query`, `topK`).                                   |
| `POST` | `/api/settings/qdrant/cleanup`          | कालबाह्य / जुन्या मेमरीजसाठीचे Qdrant पॉइंट्स काढून टाकते.                                                            |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant साठी उपलब्ध एम्बेडिंग मॉडेल्सची सूची देते.                                                                     |

`/api/memory` सूची क्वेरी `page`-आधारित पृष्ठांकन (`parsePaginationParams`) **किंवा** थेट `offset` यांपैकी कोणतेही एक समर्थित करते — `offset` उपस्थित असल्यास त्याला प्राधान्य दिले जाते आणि प्रतिसादाच्या रचनेसाठी त्यावरून `page` मोजले जाते.

## MCP साधने (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP सर्व्हर सक्षम केलेला असताना, तीन मेमरी साधने नोंदवली जातात:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` भोवती आवरण प्रदान करते. v3.8.6 (D16) पासून, `strategy`
  हे `"exact"` म्हणून हार्डकोड करण्याऐवजी `getMemorySettings()` मधून वाचले
  जाते. `query` दिली असल्यास आणि `strategy` हे `semantic` किंवा `hybrid`
  असल्यास, उपलब्ध असताना व्हेक्टर स्टोअर वापरले जाते.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` भोवती आवरण प्रदान करते. फक्त 4 प्रमाणित प्रकार
  स्वीकारते: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → जुळणाऱ्या
  नोंदी सूचीबद्ध करते, पर्यायाने निर्मितीपूर्व टाइमस्टॅम्पनुसार फिल्टर करते आणि
  त्यानंतर प्रत्येक नोंद `deleteMemory()` द्वारे हटवते (जे sqlite-vec + Qdrant
  मधून व्हेक्टर्सही काढून टाकते).

ट्रान्सपोर्ट आणि स्कोपच्या तपशीलांसाठी [MCP-SERVER.md](./MCP-SERVER.md) पहा.

## डॅशबोर्ड (मेमरी स्टुडिओ)

`src/app/(dashboard)/dashboard/memory/page.tsx` आता **3-टॅब स्टुडिओ** आहे:

### टॅब: मेमरीज

- संकल्पना कार्ड (संकुचित करता येणारे "हे कसे कार्य करते" स्पष्टीकरण).
- रिअल-टाइम सूची, शोध आणि पृष्ठांकन (300 ms डिबाउन्स).
- प्रकार फिल्टर (`factual` / `episodic` / `procedural` / `semantic` / सर्व).
- मेमरी जोडण्यासाठी मोडल (की, सामग्री, प्रकार).
- इनलाइन संपादन (पेन्सिल बटण → `PUT /api/memory/[id]`).
- प्रत्येक पंक्तीसाठी हटवण्याची सुविधा (पुष्टीकरण संवादासह).
- वर्तमान पृष्ठाचे JSON निर्यात; फाइल पिकरद्वारे JSON आयात.
- आकडेवारी कार्डे: `totalEntries`, `tokensUsed`, `hitRate`.
- "जुन्या नोंदी संक्षिप्त करा" बटण → `POST /api/memory/summarize` (ड्राय-रनमध्ये
  प्रथम उमेदवारांची संख्या दिसते, त्यानंतर पुष्टीकरण केले जाते).
- `GET /api/memory/health` द्वारे नियंत्रित हिरवा/लाल आरोग्य निर्देशक.

### टॅब: प्लेग्राउंड

- क्वेरी इनपुट + धोरण निवडक (अचूक / सिमॅंटिक / हायब्रिड) + टोकन बजेट.
- "अनुकरण करा" → `POST /api/memory/retrieve-preview` — `score`, `tier`,
  `tokens`, `vecScore`, `ftsScore` यांसह क्रमवारी लावलेले परिणाम दाखवते.
- कोणता एम्बेडिंग स्रोत / व्हेक्टर स्टोअर वापरला गेला आणि फॉलबॅक झाला की नाही
  हे दर्शवणारे निराकरण पॅनेल.

### टॅब: इंजिन

- इंजिन स्थिती पॅनेल (कीवर्ड FTS5 चिप, एम्बेडिंग चिप, व्हेक्टर स्टोअर चिप,
  Qdrant आरोग्य चिप, रीरँक चिप).
- "आता पुन्हा अनुक्रमित करा" बटण → `POST /api/memory/reindex`.
- एम्बेडिंग स्रोत निवडक (स्वयंचलित / रिमोट / स्थिर / ट्रान्सफॉर्मर्स + टॉगल्स).
- Qdrant कॉन्फिगरेशन कार्ड (सक्षम टॉगल, होस्ट/पोर्ट/कलेक्शन/की, कनेक्शन चाचणी,
  सिमॅंटिक शोध चाचणी, साफसफाई).
- रीरँक कॉन्फिगरेशन कार्ड (सक्षम टॉगल, प्रदाता/मॉडेल निवडक).

लेगसी/जागतिक सेटिंग्ज पृष्ठभागासाठी मेमरी आणि Qdrant सेटिंग्ज
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) अंतर्गतही
उपलब्ध आहेत.

## कॅशिंग

`src/lib/memory/store.ts`, `getMemory(id)` वाचनांसाठी प्रक्रियेअंतर्गत LRU-सदृश
कॅश (`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, ज्यामध्ये 20 %
सर्वात जुन्या नोंदी काढून टाकल्या जातात) राखते, तसेच स्वतःचा स्कोप केलेला कॅश
वापरू इच्छिणाऱ्या कॉलर्ससाठी `get`/`set`/`invalidate` पद्धती असलेला सर्वसाधारण
की/मूल्य `memoryCache` स्तर (`src/lib/memory/cache.ts`) राखते (1 000-नोंद LRU,
डीफॉल्ट TTL 5 min).

## गोपनीयता आणि जीवनचक्र

- मेमरीची मालकी API key id कडे असते (`chatCore.ts` मधील
  `resolveMemoryOwnerId`). `apiKeyInfo.id` नसल्यास पुनर्प्राप्ती, अंतःक्षेपण
  किंवा निष्कर्षण यांपैकी काहीही चालत नाही.
- भविष्यातील `expires_at` असलेल्या नोंदी पुनर्प्राप्तीतून वगळल्या जातात; `retentionDays`
  पेक्षा जुन्या नोंदी `retrieveMemories` मधील
  `created_at >= cutoff` क्लॉजद्वारे वगळल्या जातात.
- कायमस्वरूपी हटवण्यासाठी, `DELETE /api/memory/[id]` किंवा `omniroute_memory_clear` वापरा.
- निष्कर्षण `setImmediate` द्वारे फायर-अँड-फरगेट पद्धतीने होते; अपयशांची नोंद
  `memory.extraction.background.failed` अंतर्गत केली जाते आणि ती कॉलरपर्यंत कधीही पोहोचत नाहीत.
- पडताळणी राउंड-ट्रिप्स (`verifyExtractionPipeline`) त्यांच्या स्वतःच्या
  चाचणी नोंदी `finally` ब्लॉकमध्ये साफ करतात.

## हे देखील पहा

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` सेटिंग मेमरीसोबत टूलच्या
  व्याख्या अंतःक्षेपित करते.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ट्रान्सपोर्ट / स्कोप्स.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — अधिक व्यापक API पृष्ठभाग.
- स्रोत मॉड्यूल्स:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + हायब्रिड RRF
  - `src/lib/memory/embedding/index.ts` — बहु-स्रोत एम्बेडिंग स्तर
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — सर्व मेमरी API बॉडींसाठी Zod स्कीमा
  - `src/shared/schemas/qdrant.ts` — Qdrant सेटिंग्ज/ऑपरेशन्ससाठी Zod स्कीमा
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` साठी CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + उप-रूट्स
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (पृष्ठ + घटक +
    टॅब्स + हुक्स)
  - `open-sse/handlers/chatCore.ts` (अंतःक्षेपण / निष्कर्षण वायरिंग)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## एम्बेडिंग प्रदाता निवडणे (v3.8.16+)

OmniRoute चे मेमरी इंजिन **चार एम्बेडिंग स्रोतांना** (`src/lib/memory/embedding/`) समर्थन देते. प्रत्येकामध्ये **विलंब, खर्च, मॉडेलची गुणवत्ता आणि सेटअपची गुंतागुंत** यांबाबत वेगवेगळ्या तडजोडी आहेत.

### एम्बेडिंग स्रोत

| प्रदाता        | स्रोत                                        | विलंब                         | खर्च                 | गुणवत्ता                      | सेटअप                                 |
| -------------- | -------------------------------------------- | ----------------------------- | -------------------- | ----------------------------- | ------------------------------------- |
| `transformers` | स्थानिक ONNX मॉडेल (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)               | विनामूल्य            | चांगली                        | फक्त `npm install`                    |
| `static`       | पूर्व-गणना केलेले व्हेक्टर्स (कॅश केलेले)    | <1ms                          | विनामूल्य            | लागू नाही (कॅश हिटवर अवलंबून) | काहीही नाही                           |
| `remote`       | OpenAI / Cohere / Voyage API                 | ~100-300ms                    | $0.02-0.10/1M टोकन्स | उत्कृष्ट                      | API key                               |
| `auto`         | रनटाइमवेळी उपलब्ध सर्वोत्तम स्रोत निवडतो     | निवडलेल्या स्रोताइतकाच        | विनामूल्य            | निवडलेल्या स्रोताइतकी         | काहीही नाही                           |
| _(cache)_      | कोणत्याही स्रोतावर इन-मेमरी LRU स्तर         | <1ms (हिट), पूर्ण विलंब (मिस) | विनामूल्य            | अंतर्निहित स्रोताइतकी         | नेहमी सुरू (निवडता येणारा स्रोत नाही) |

### निर्णय वृक्ष

```
                  तुमचा डिप्लॉयमेंट संदर्भ कोणता आहे?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    लहान PROD    मोठे PROD     EDGE / ऑफलाइन
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (विनामूल्य, API नाही)      (सर्वोत्तम गुणवत्ता) (इंटरनेट नाही)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            वर नेहमी `cache` स्तर जोडा
            (LruCache कोणत्याही प्रदात्याला रॅप करते)
```

### डेटाबेस आणि API कॉन्फिगरेशन

मेमरी एम्बेडिंगचे पर्याय एन्व्हायर्नमेंट व्हेरिएबल्सद्वारे नव्हे, तर Settings API/UI द्वारे कॉन्फिगर केले जातात. Settings अंतर्गत संबंधित सेटिंग्ज डेटाबेस कीज (`src/lib/memory/settings.ts` मधील `normalizeMemorySettings`) पुढीलप्रमाणे आहेत:

- `memoryEmbeddingSource`: `"transformers"` (स्थानिक), `"remote"` (API-आधारित, उदा. OpenAI), `"static"` (बाह्य स्टोअर), किंवा `"auto"`
- `memoryEmbeddingProviderModel`: रिमोट/स्टॅटिक स्रोतांसाठी मॉडेल आयडेंटिफायर (उदा., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, किंवा `"auto"`

#### स्थानिक मॉडेल (`transformers`)

स्थानिक मॉडेल्स चालवण्यासाठी आंतरिकरीत्या transformers.js वापरते:

```bash
# कोडमध्ये वाचले जाणारे एन्व्हायर्नमेंट व्हेरिएबल्स (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF मॉडेल रेपो
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF स्टॅटिक पोशन मॉडेल
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # कॅश निर्देशिका
```

#### LRU एम्बेडिंग कॅश

कॅश डीफॉल्टनुसार नेहमी सुरू असते आणि एन्व्हायर्नमेंट व्हेरिएबल्सद्वारे कॉन्फिगर केली जाते:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # कॅश केलेल्या आयटम्सची कमाल संख्या
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 मिनिटे)
```

### कार्यप्रदर्शनाची आकडेवारी

सामान्य 4-core x86 सर्व्हरवरील बेंचमार्क (प्रत्येकी ~100 टोकन असलेले मजकूर):

| प्रदाता              | p50   | p95   | p99   | 1M embeddings ची किंमत             |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | विनामूल्य                          |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant होस्टिंगवर अवलंबून          |
| `cache` (हिट)        | <1ms  | <1ms  | 2ms   | विनामूल्य                          |

---

## तथ्य निष्कर्षण नमुने (v3.8.16+)

`extraction.ts` मॉड्यूल (`src/lib/memory/extraction.ts`) संभाषणातील संदेशांमधून संरचित तथ्ये निष्कर्षित करण्यासाठी **रेग्युलर एक्सप्रेशन नमुना जुळवणी** वापरते. हे नमुने समजून घेतल्याने तुमच्या वापराच्या परिस्थितीनुसार निष्कर्षणाची गुणवत्ता समायोजित करता येते.

### डीफॉल्ट नमुना श्रेण्या

| श्रेणी              | नमुना उदाहरण                                                    | काय पकडले जाते                   |
| ------------------- | --------------------------------------------------------------- | -------------------------------- |
| PREFERENCE_PATTERNS | `"मला <X> पसंत आहे"`, `"मला <X> आवडते"`, `"मला <X> आवडत नाही"`  | वापरकर्त्याच्या पसंती            |
| DECISION_PATTERNS   | `"मी <X> वापरेन"`, `"मी <X> करण्याचे ठरवले"`, `"मी <X> निवडले"` | वापरकर्त्याचे निर्णय (प्रासंगिक) |
| PATTERN_PATTERNS    | `"मी सहसा <X>"`, `"मी नेहमी <X>"`, `"मी कधीही <X> करत नाही"`    | सातत्यपूर्ण वर्तन नमुने          |

### नमुना उदाहरणे (सुलभ केलेली)

```ts
// src/lib/memory/extraction.ts मधून
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

### काय निष्कर्षित केले जाते

वापरकर्ता असे म्हणतो तेव्हा:

> "मला TypeScript पसंत आहे. मी या प्रकल्पासाठी Postgres वापरेन. मी नेहमी push करण्यापूर्वी commit करतो. मला Python आवडत नाही."
> निष्कर्षणातून 4 स्मृती तयार होतात:
>
> | की                                   | श्रेणी | प्रकार    | आशय                        |
> | ------------------------------------ | ------ | --------- | -------------------------- |
> | `preference:typescript`              | पसंती  | तथ्यात्मक | "TypeScript"               |
> | `decision:postgres_for_this_project` | निर्णय | प्रासंगिक | "या प्रकल्पासाठी Postgres" |
> | `pattern:commit_before_pushing`      | नमुना  | तथ्यात्मक | "push करण्यापूर्वी commit" |
> | `preference:python`                  | पसंती  | तथ्यात्मक | "Python"                   |

### निष्कर्षण मर्यादा

अनियंत्रित निष्कर्षण टाळण्यासाठी खालील मर्यादा लागू होतात:

| आशयाची किमान लांबी | 3 वर्ण |
| आशयाची कमाल लांबी | 500 वर्ण |

### निष्कर्षण कधी अक्षम करावे

मेमरी सक्षम असताना निष्कर्षण आपोआप चालते; केवळ निष्कर्षणासाठी स्वतंत्र
टॉगल नाही. ते बंद करण्यासाठी, मेमरी पूर्णपणे अक्षम करा (`enabled: false`
हे `PUT /api/settings/memory` द्वारे सेट करा). खालील परिस्थितींमध्ये असे करण्याचा विचार करा:

- तुमच्या संदेशांचे प्रमाण जास्त आहे आणि निष्कर्षणाचा खर्च नगण्य नाही
- तुमची संभाषणे प्रामुख्याने तात्पुरती आहेत (चॅट, डीबगिंग) आणि त्यांना दीर्घकालीन मूल्य नाही
- तुम्ही आधीच कस्टम प्लगइनद्वारे संदर्भ जतन करत आहात

---

## हायब्रिड RRF समायोजन (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** अल्गोरिदम FTS5 (कीवर्ड) आणि व्हेक्टर (अर्थाधारित) परिणाम एकत्र करतो. कमी क्रमांकाच्या परिणामांना किती वजन दिले जाते हे `k` पॅरामीटर नियंत्रित करते.

### सूत्र

प्रत्येक उमेदवार मेमरीसाठी RRF गुण असे आहेत:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

जिथे:

- `k` हा स्थिरांक आहे (डीफॉल्ट 60)
- `rank_i(d)` हा i-व्या पुनर्प्राप्ती प्रणालीमधील (FTS, व्हेक्टर) दस्तऐवज `d` चा क्रमांक आहे
- सर्व पुनर्प्राप्ती प्रणालींवरील बेरीज घेतली जाते

### `k` चा परिणामांवर कसा प्रभाव पडतो

| `k` मूल्य            | परिणाम                                                                       | यासाठी सर्वोत्तम                          |
| -------------------- | ---------------------------------------------------------------------------- | ----------------------------------------- |
| `k=0`                | शुद्ध क्रमांक फ्यूजन (स्मूथिंग नाही)                                         | सैद्धांतिक आधाररेषा                       |
| `k=10-30`            | सर्वोच्च परिणामांना खूप जास्त वजन; खालच्या क्रमांकांचे योगदान अत्यल्प        | सर्वोच्च 3 परिणाम सहसा योग्य असतात तेव्हा |
| **`k=60`** (डीफॉल्ट) | संतुलित — सर्वोच्च 10 परिणामांचे अर्थपूर्ण योगदान                            | सर्वसाधारण-उद्देश पुनर्प्राप्ती           |
| `k=100+`             | अधिक सपाट — कमी क्रमांकाचे परिणाम अनेक प्रणालींमध्ये आढळल्यास वरचढ ठरू शकतात | रिकॉल > प्रिसिजन अत्यंत महत्त्वाचे असताना |

### प्रत्यक्षात `k` समायोजित करणे

```bash
# डीफॉल्ट
MEMORY_RRF_K=60

# आक्रमक प्रिसिजन (लहान मेमरी, मोजके दस्तऐवज)
MEMORY_RRF_K=20

# कमाल रिकॉल (मोठी मेमरी, विविध क्वेरी)
MEMORY_RRF_K=120
```

**`k=20` असलेले उदाहरण:**

- FTS क्रमांक 1 → योगदान `1/21 = 0.048`
- FTS क्रमांक 10 → योगदान `1/30 = 0.033`
- व्हेक्टर क्रमांक 1 → योगदान `0.048`
- एकत्रित कमाल: `0.096`

**`k=60` असलेले उदाहरण:**

- FTS क्रमांक 1 → योगदान `1/61 = 0.016`
- FTS क्रमांक 10 → योगदान `1/70 = 0.014`
- व्हेक्टर क्रमांक 1 → योगदान `0.016`
- एकत्रित कमाल: `0.033`

`k` जास्त असल्यास, सर्वोच्च-1 आणि क्रमांक-10 यांच्यातील **सापेक्ष फरक** कमी असतो, त्यामुळे अल्गोरिदम सर्वोच्च क्रमांकावरील विश्वासापेक्षा **पुनर्प्राप्ती प्रणालींमधील एकमतावर** अधिक अवलंबून राहतो.

### `k` कधी बदलावे

| लक्षण                                                | हे वापरून पाहा                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| सर्वोच्च परिणाम नेहमी जिंकतो, पण तो चुकीचा असतो      | **कमी** k (उदा., 20) — सर्वोच्च क्रमांकावरील विश्वास अधिक महत्त्वाचा |
| योग्य उत्तर सर्वोच्च 5 मध्ये आहे, पण सर्वोच्च 1 नाही | **जास्त** k (उदा., 100) — सपाट गुणांकन एकमताला बक्षीस देते           |
| रिकॉल जास्त आहे, पण प्रिसिजन कमी आहे                 | **कमी** k — क्रमवारी अधिक नेमकी करा                                  |
| रिकॉल कमी आहे (संबंधित दस्तऐवज गहाळ आहेत)            | **जास्त** k — कमी क्रमांकाच्या दस्तऐवजांना संधी द्या                 |

### RRF वजननियोजन

रेकिप्रोकल रँक फ्यूजन अर्थाधारित व्हेक्टर क्रमांक आणि पूर्ण-मजकूर शोध क्रमांकासाठी समान वजने वापरते:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

स्वतंत्र वजने समायोजित करण्यासाठी कोणतेही पर्यावरणीय चल नाहीत (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` अस्तित्वात नाहीत).

---

## सारांशीकरण धोरण (v3.8.16+)

`summarization.ts` मॉड्यूल (`src/lib/memory/summarization.ts`) सक्रिय संच लहान ठेवण्यासाठी आणि पुनःस्मरण क्षमता जतन करण्यासाठी जुन्या स्मृती संक्षिप्त करते.

### सारांशीकरण कधी ट्रिगर होते

| ट्रिगर                     | मर्यादा (डीफॉल्ट) |
| -------------------------- | ----------------- |
| API द्वारे मॅन्युअल ट्रिगर | लागू नाही         |

### कशाचे सारांशीकरण केले जाते

`summarization.ts` मधून दोन प्रवेशबिंदू निर्यात केले जातात:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — एखाद्या सत्रातील
  स्मृतींना टोकन मर्यादेत बसणाऱ्या एका सारांश मजकुरात संक्षिप्त करते.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API द्वारे वापरले जाणारे
  वयावर आधारित संक्षिप्तीकरण: हे `days` पेक्षा जुन्या प्रत्येक स्मृतीची निवड करते, त्यांच्यापासून
  एक संक्षिप्त सारांश स्मृती तयार करते आणि (`dryRun` हे `false` असताना)
  मूळ स्मृती हटवते. काहीही बदल न करता उमेदवार संच आणि एकूण टोकन संख्या
  पाहण्यासाठी `dryRun: true` द्या.

टॅग/की क्लस्टरिंग फेरी किंवा प्रत्येक स्मृतीसाठी "मूलभूत विरुद्ध सारांशयोग्य" गुणांकन नाही —
निवड पूर्णपणे वयाच्या मर्यादेवर आधारित असते आणि सारांश मजकूर हा प्रत्येक उमेदवारासाठी
प्रकार-उपसर्ग असलेली संक्षिप्त ओळ असतो.

### सारांशीकरण ट्रिगर करणे

सारांशीकरण **मॅन्युअल / पर्यायी** आहे — `autoSummarize` सेटिंग डीफॉल्टनुसार `false`
असते, त्यामुळे काहीही आपोआप संक्षिप्त केले जात नाही. ते API द्वारे ट्रिगर करा:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

ते बंद ठेवण्यासाठी, फक्त `autoSummarize` चे डीफॉल्ट मूल्य (`false`) तसेच ठेवा.

### सारांशीकरण गुणवत्तेसाठी सूचना

- **आधी `dryRun` वापरून पूर्वावलोकन करा** — `summarizeMemoriesOlderThan(..., true)`
  उमेदवारांची सूची आणि एकूण टोकन संख्या परत करते, ज्यामुळे मूळ स्मृती हटवण्यापूर्वी
  काय विलीन केले जाईल याची खात्री करता येते.
- **तुमच्याकडे मोठा स्मृती-संग्रह असल्यास कमी रहदारीच्या वेळेत सारांशीकरण चालवा** — LLM कॉल हा संथ भाग आहे

```bash
# Cron-शैली: दररोज पहाटे 3 वाजता सारांशीकरण करा
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend प्रदाता पॅटर्न

> **सत्याचा अधिकृत स्रोत:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **चाचण्या:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend प्रदाता पॅटर्न विद्यमान मेमरी इंजिनवर एक **प्लग करण्यायोग्य बॅकएंड अमूर्तीकरण स्तर** सादर करतो. एकाच स्टोरेज अंमलबजावणीशी बांधलेले राहण्याऐवजी, मेमरी प्रणाली आता कॉन्फिगर करता येणाऱ्या प्राथमिक/फॉलबॅक राउटिंगसह अनेक बॅकएंडना (SQLite, Obsidian, Notion, सानुकूल HTTP बॅकएंड) समर्थन देते.

### आर्किटेक्चर

```
┌──────────────────────────────────────────────────────────┐
│                    API मार्ग                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           सिंगलटन समन्वयक (manager.ts)                    │
│                                                          │
│  प्राथमिक ──► बॅकएंड A  (उदा. SQLite)                    │
│  फॉलबॅक  ──► बॅकएंड B  (उदा. Obsidian)                   │
│              बॅकएंड C  (उदा. GenericBackend द्वारे Notion)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ बॅकएंड     │ │ बॅकएंड     │ │ बॅकएंड (HTTP)    │
└────────────┘ └────────────┘ └──────────────────┘
```

#### मूलभूत इंटरफेस (`backend.ts`)

प्रत्येक बॅकएंडने `MemoryBackend` इंटरफेसची अंमलबजावणी करणे आवश्यक आहे:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // तयार करणे, वाचणे, अद्ययावत करणे आणि हटवणे
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // शोध
  search(config: SearchConfig): Promise<Memory[]>;

  // स्थिती
  health(): Promise<HealthCheckResult>;

  // जीवनचक्र (पर्यायी)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

सिंगलटन समन्वयक जो:

- `register(backend)` द्वारे बॅकएंडची **नोंदणी करतो** — बूटच्या वेळी `index.ts` मधून कॉल केले जाते
- `configure(primary, fallbacks)` द्वारे प्राथमिक + फॉलबॅक **कॉन्फिगर करतो**
- अपयश आल्यास फॉलबॅक साखळी वापरून CRUD/शोध विनंत्या प्राथमिक बॅकएंडकडे **पाठवतो**
- सर्व बॅकएंडच्या स्थितीची वेळोवेळी **तपासणी करतो**

**फॉलबॅक वर्तन:**

| ऑपरेशन   | प्राथमिक                    | फॉलबॅक                   |
| -------- | --------------------------- | ------------------------ |
| `create` | ✅ फक्त प्राथमिक            | ❌                       |
| `get`    | ✅ आधी प्राथमिक वापरून पाहा | ✅ null असल्यास फॉलबॅक   |
| `update` | ✅ फक्त प्राथमिक            | ✅ विनाप्रतीक्षा समक्रमण |
| `delete` | ✅ फक्त प्राथमिक            | ✅ विनाप्रतीक्षा समक्रमण |
| `list`   | ✅ फक्त प्राथमिक            | ❌                       |
| `search` | ✅ आधी प्राथमिक             | ✅ त्रुटी आल्यास फॉलबॅक  |

#### GenericMemoryBackend (`genericBackend.ts`)

कोणत्याही REST API ला MemoryBackend मध्ये रूपांतरित करणारा एक सर्वसाधारण HTTP कनेक्टर. पुढील गोष्टींसाठी उपयुक्त:

- **Notion** — Notion API द्वारे कनेक्ट करा
- **Obsidian** — Obsidian Local REST API द्वारे कनेक्ट करा
- **सानुकूल बॅकएंड** — RESTful मेमरी API उपलब्ध करून देणारी कोणतीही सेवा

**कॉन्फिगरेशन:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // बॅकएंड API चा बेस URL
  apiKey?: string;           // प्रमाणीकरणासाठी Bearer टोकन
  headers?: Record<string, string>;  // सानुकूल HTTP हेडर्स
  timeout?: number;          // विनंतीची कालमर्यादा (डीफॉल्ट: 30000ms)
  backendType?: string;      // लॉगिंगसाठी

  // एंडपॉइंट ओव्हरराइड्स (डीफॉल्टमध्ये REST पद्धती वापरल्या जातात)
  endpoints?: {
    search?: string;   // डीफॉल्ट: "/memories/search"
    create?: string;   // डीफॉल्ट: "/memories"
    list?: string;     // डीफॉल्ट: "/memories"
    get?: string;      // डीफॉल्ट: "/memories/{id}"
    update?: string;   // डीफॉल्ट: "/memories/{id}"
    delete?: string;   // डीफॉल्ट: "/memories/{id}"
    health?: string;   // डीफॉल्ट: "/health"
  };

  // क्वेरी पॅरामीटर नावांची मॅपिंग्ज
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // पाथ पॅरामीटर नावांची मॅपिंग्ज
  pathParams?: {
    id?/memoryId?
  };
}
```

**ज्ञात बॅकएंड्स** `KNOWN_BACKENDS` मध्ये पूर्व-कॉन्फिगर केलेले आहेत:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 कडे निर्देश करणारा GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 कडे निर्देश करणारा GenericMemoryBackend
```

#### अंगभूत बॅकएंड्स

##### SQLiteBackend (`sqliteBackend.ts`)

डीफॉल्ट प्राथमिक बॅकएंड. `src/lib/memory/store.ts` वापरून विद्यमान SQLite-आधारित मेमरी स्टोअरला रॅप करतो. बूट होताना स्वयंचलितपणे नोंदणीकृत होतो.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

विद्यमान Obsidian इंटिग्रेशनला (`src/lib/memory/obsidianBackend.ts`) रॅप करतो. Obsidian Local REST API द्वारे Obsidian व्हॉल्टशी कनेक्ट होतो.

### सेटिंग्ज

मेमरी बॅकएंड सेटिंग्ज ॲप सेटिंग्ज टेबलमध्ये संग्रहित केल्या जातात आणि `src/lib/memory/settings.ts` द्वारे व्यवस्थापित केल्या जातात:

| सेटिंग           | Env/Config की            | डीफॉल्ट    | वर्णन                                   |
| ---------------- | ------------------------ | ---------- | --------------------------------------- |
| प्राथमिक बॅकएंड  | `memoryPrimaryBackend`   | `"sqlite"` | प्राथमिक बॅकएंडचा ID                    |
| फॉलबॅक बॅकएंड्स  | `memoryFallbackBackends` | `[]`       | क्रमबद्ध फॉलबॅक बॅकएंड IDs              |
| बॅकएंड कॉन्फिग्ज | `memoryBackendConfigs`   | `{}`       | प्रत्येक बॅकएंडसाठी कॉन्फिग ओव्हरराइड्स |

सेटिंग्ज `normalizeMemorySettings()` द्वारे सामान्यीकृत केल्या जातात आणि `getMemorySettings()` मध्ये कॅश केल्या जातात.

### इनिशियलायझेशन प्रवाह

```
ॲप बूटस्ट्रॅप
  → index.ts इम्पोर्ट्स (साइड-इफेक्ट): SQLiteBackend ची नोंदणी करतात
  → ॲप लाइफसायकलमधून initMemoryBackends() कॉल केले जाते:
      1. सेटिंग्ज लोड करा (getMemorySettings)
      2. प्राथमिक + फॉलबॅक कॉन्फिगर करा
      3. सर्व बॅकएंड्स इनिशियलाइझ करा (आरोग्य तपासणी)
      4. विनंत्यांसाठी तयार
```

### नवीन बॅकएंड जोडणे

1. `src/lib/memory/<name>Backend.ts` मध्ये **`MemoryBackend` इंटरफेसची अंमलबजावणी करा**
2. `src/lib/memory/index.ts` मधून **एक्सपोर्ट करा**
3. बूट होताना `memoryManager.register(yourBackend)` सह **नोंदणी करा**
4. सेटिंग्जद्वारे **कॉन्फिगर करा**: `memoryPrimaryBackend` ला तुमच्या बॅकएंड ID वर सेट करा
5. संदर्भ म्हणून `src/lib/memory/__tests__/generic-backend.test.ts` वापरून **चाचणी करा**

#### उदाहरण: Brain बॅकएंड

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

### पडताळणी

#### युनिट चाचण्या

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

अपेक्षित आउटपुट: खालील बाबी समाविष्ट करणाऱ्या **35 चाचण्या, सर्व यशस्वी**:

- कन्स्ट्रक्टर (2)
- आरोग्य तपासणी (4) — यश, अपयश 500, नेटवर्क त्रुटी, विलंब
- इनिशियलाइझ (2) — यश, अपयश
- तयार करणे (2) — डीफॉल्ट एंडपॉइंट, सानुकूल एंडपॉइंट
- मिळवणे (4) — यश, 404 → null, 404 व्यतिरिक्त त्रुटी थ्रो करणे, सानुकूल पाथ पॅरामीटर्स
- अपडेट करणे (2) — यश, 404 → false
- हटवणे (2) — यश, 404 → false
- सूची (2) — क्वेरी पॅरामीटर्स, सानुकूल पॅरामीटर नावे
- शोध (3) — क्वेरी पॅरामीटर्स, सानुकूल एंडपॉइंट, पर्यायांचे सिरियलायझेशन
- प्रमाणीकरण हेडर्स (2) — Bearer टोकन, सानुकूल हेडर्स
- फॅक्टरी (1)

#### प्रकार तपासणी

```bash
npm run typecheck:core
```

अपेक्षित: **0 त्रुटी**.
