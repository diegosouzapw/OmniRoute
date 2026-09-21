# Memory System (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **ആധികാരിക ഉറവിടം:** `src/lib/memory/`, `src/app/api/memory/`
> **അവസാനം പുതുക്കിയത്:** 2026-06-28 — v3.8.40 (സ്ഥിരസ്ഥിതിയായി പ്രവർത്തനരഹിതം + int8 ക്വാണ്ടൈസേഷൻ ക്യാച്ച്-അപ്പ്)

API കീ അടിസ്ഥാനമാക്കി (ആവശ്യമെങ്കിൽ സെഷൻ ഐഡിയും അടിസ്ഥാനമാക്കി) നിലനിൽക്കുന്ന സംഭാഷണ മെമ്മറി OmniRoute നൽകുന്നു. ലഘുവായ regex പാറ്റേൺ പൊരുത്തപ്പെടുത്തലിലൂടെ LLM പ്രതികരണങ്ങളിൽനിന്ന് മെമ്മറികൾ സ്വയമേവ വേർതിരിച്ചെടുക്കുകയും തുടർന്നുള്ള അഭ്യർത്ഥനകളിൽ ഒരു പ്രാരംഭ സിസ്റ്റം സന്ദേശമായി (അല്ലെങ്കിൽ സിസ്റ്റം റോൾ നിരസിക്കുന്ന പ്രൊവൈഡറുകൾക്ക് ആദ്യ ഉപയോക്തൃ സന്ദേശമായി) അവ തിരികെ ഉൾപ്പെടുത്തുകയും ചെയ്യുന്നു.

> **മെമ്മറി സ്ഥിരസ്ഥിതിയായി പ്രവർത്തനരഹിതമാണ് (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ഇപ്പോൾ `false` ആണ് (`src/lib/memory/settings.ts`). മെമ്മറി പ്രവർത്തനക്ഷമമാക്കുന്നത് വീണ്ടെടുത്ത
> കോൺടെക്സ്റ്റിന്റെ `maxTokens` (~2k) വരെ **ഓരോ** ചാറ്റ് അഭ്യർത്ഥനയിലും ഉൾപ്പെടുത്തുന്നു;
> ഇതിന് നിരക്ക് ഈടാക്കപ്പെടും — പുതിയ ഇൻസ്റ്റാളേഷനുകൾക്കും സ്വന്തം കോൺടെക്സ്റ്റ് കൈകാര്യം ചെയ്യുന്ന
> ക്ലയന്റുകൾക്കും ഇത് അപ്രതീക്ഷിതമായ ചെലവാകാം. **Settings → Memory** എന്നതിൽ ഇത് വ്യക്തമായി
> പ്രവർത്തനക്ഷമമാക്കുക (മെമ്മറി പ്രവർത്തനക്ഷമമായിരിക്കുമ്പോൾ `MemorySkillsTab` ടോക്കൺ ചെലവിനെക്കുറിച്ചുള്ള
> മുന്നറിയിപ്പ് കോൾഔട്ട് കാണിക്കുന്നു). `x-omniroute-no-memory`
> അഭ്യർത്ഥനാ ഹെഡർ (`true`/`1`/`yes`) ഉപയോഗിച്ച് ഒരു ക്ലയന്റിന് ഒറ്റ അഭ്യർത്ഥനയിൽനിന്ന് ഇത്
> ഒഴിവാക്കാം — [API_REFERENCE.md](../reference/API_REFERENCE.md)-ലെ അഭ്യർത്ഥനാ-ഹെഡർ പട്ടിക കാണുക.
> മെമ്മറി ഉപയോഗിക്കാത്ത ഒരു അഭ്യർത്ഥന `memoryOwnerId = null` ആയി സജ്ജീകരിക്കുന്നു; ഇത് ആ
> അഭ്യർത്ഥനയ്ക്കായി മെമ്മറി ഉൾപ്പെടുത്തലും സ്കിൽ ഉൾപ്പെടുത്തലും **രണ്ടും** പ്രവർത്തനരഹിതമാക്കുന്നു
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

മെമ്മറി ഓരോ ഉപയോക്താവിനുമല്ല, **ഓരോ API കീയ്ക്കുമാണ് പരിധിപ്പെടുത്തിയിരിക്കുന്നത്** — ഒരേ API കീ ഉപയോഗിച്ച് പ്രാമാണീകരിച്ച എല്ലാ അഭ്യർത്ഥനകളും ഒരേ മെമ്മറി പൂൾ പങ്കിടുന്നു; `sessionId` ഉപയോഗിച്ച് വേണമെങ്കിൽ പരിധി കൂടുതൽ ചുരുക്കാം.

## ആർക്കിടെക്ചർ

```
ക്ലയന്റ് → /v1/chat/completions (apiKeyInfo മുൻഘട്ടത്തിൽ നിർണ്ണയിക്കുന്നു)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # ഐഡി വേർതിരിച്ചെടുക്കുന്നു
    → getMemorySettings()                     # കാഷ് ചെയ്ത ക്രമീകരണങ്ങൾ
    → shouldInjectMemory(body, {enabled})     # നിയന്ത്രണ കവാടം
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + ഐച്ഛിക വെക്റ്റർ
    → injectMemory(body, memories, provider)  # സിസ്റ്റം അല്ലെങ്കിൽ ഉപയോക്തൃ സന്ദേശം
  → അപ്സ്ട്രീം പ്രൊവൈഡർ കോൾ
  → പ്രതികരണത്തിൽ: extractFacts(text, apiKeyId, sessionId)  # തടസ്സപ്പെടുത്താത്തത്
    → setImmediate → ഓരോ പൊരുത്തത്തിനും createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

ഉൾപ്പെടുത്തലിന്റെയും വേർതിരിച്ചെടുക്കലിന്റെയും കോൾ സൈറ്റുകൾ
`open-sse/handlers/chatCore.ts`-ൽ ബന്ധിപ്പിച്ചിരിക്കുന്നു (`retrieveMemories`, `injectMemory`,
`extractFacts` എന്നിവ തിരയുക).

## എൻജിൻ ആർക്കിടെക്ചർ (3-തല നിർണ്ണയം)

ലഭ്യമായ ഇൻഫ്രാസ്ട്രക്ചറും ക്രമീകരണങ്ങളും അടിസ്ഥാനമാക്കി Memory Engine റൺടൈമിൽ വീണ്ടെടുക്കൽ പാത നിർണ്ണയിക്കുന്നു. മുൻഗണനാക്രമത്തിൽ പ്രയോഗിക്കപ്പെടുന്ന മൂന്ന് തലങ്ങളുണ്ട്:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  തലം 0 — കീവേഡ് (FTS5)                                      │
  │  പ്രോബ് അധിഷ്ഠിത ലഭ്യത: SQLite ബിൽഡ് പിന്തുണയ്ക്കുമ്പോൾ        │
  │  FTS5 ലഭ്യമാണ് (better-sqlite3 / node:sqlite / bun:sqlite);  │
  │  FTS5 ഇല്ലാത്ത ബിൽഡുകളിൽ ലഭ്യമല്ല (ഉദാ. sql.js/WASM —          │
  │  "no such module: fts5"). strategy = "exact" ആയിരിക്കുമ്പോഴോ │
  │  ഫാൾബാക്കായോ ഉപയോഗിക്കുന്നു; engine-status keyword പ്രോബിന്റെ │
  │  ഫലം പ്രതിഫലിപ്പിക്കുന്നു.                                    │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  തലം 1 — എംബെഡഡ് വെക്റ്റർ (sqlite-vec)                       │
  │  db.loadExtension() വഴി sqlite-vec v0.1.9 ലോഡ് ചെയ്യുന്നു.    │
  │  Float32 വെക്റ്ററുകളിൽ KNN ബ്രൂട്ട്-ഫോഴ്സ്. സജീവമാകുന്നത്:      │
  │   • sqlite-vec loadExtension വിജയിക്കുമ്പോൾ                    │
  │   • ഒരു Float32Array സൃഷ്ടിക്കാൻ കഴിയുന്ന എംബെഡിംഗ് ഉറവിടം     │
  │     ലഭ്യമായിരിക്കുമ്പോൾ (remote | static | transformers)      │
  │   • vec_memories പട്ടിക നിലവിലുണ്ടാകുമ്പോൾ (ആദ്യ ready()-ൽ    │
  │     സൃഷ്ടിക്കപ്പെടുന്നു)                                        │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  തലം 2 — Qdrant (ഐച്ഛിക ബാഹ്യ വെക്റ്റർ ഡാറ്റാബേസ്)             │
  │  പ്രവർത്തനക്ഷമമാക്കുമ്പോൾ semantic/hybrid-നായി sqlite-vec-നെ  │
  │  പകരംവയ്ക്കുന്നു. പ്രവർത്തിക്കുന്ന Qdrant ഇൻസ്റ്റൻസും            │
  │  കോൺഫിഗർ ചെയ്ത host/port-ഉം ആവശ്യമാണ്.                       │
  └─────────────────────────────────────────────────────────────┘
```

നിലവാരത്തകർച്ച സ്വയമേവയും സുതാര്യമായും നടക്കുന്നു:

- sqlite-vec ലോഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടാൽ, തലം 1 ലഭ്യമല്ല → തലം 0-ലേക്ക് ഫാൾബാക്ക് ചെയ്യുന്നു.
- എംബെഡിംഗ് ഉറവിടം ഒരു പിശക് നൽകിയാൽ, തലം 1 തലം 0-ലേക്ക് ഫാൾബാക്ക് ചെയ്യുന്നു.
- Qdrant പ്രവർത്തനക്ഷമമല്ലെങ്കിൽ, തലം 2 തലം 1-ലേക്ക് ഫാൾബാക്ക് ചെയ്യുന്നു (അല്ലെങ്കിൽ തലം 1-ഉം ലഭ്യമല്ലെങ്കിൽ തലം 0-ലേക്ക്).

## എംബെഡ്ഡിംഗ് ഉറവിടങ്ങൾ

എത് ഉറവിടമാണ് ഉപയോഗിക്കേണ്ടതെന്ന് എംബെഡ്ഡിംഗ് ലെയർ (`src/lib/memory/embedding/`), `MemorySettingsExtended.embeddingSource` അടിസ്ഥാനമാക്കി നിർണ്ണയിക്കുന്നു:

| ഉറവിടം         | വിവരണം                                                                                  | കീ ആവശ്യമാണോ      | കോൾഡ് സ്റ്റാർട്ട് |
| -------------- | --------------------------------------------------------------------------------------- | ----------------- | ----------------- |
| `remote`       | കോൺഫിഗർ ചെയ്ത പ്രൊവൈഡറുടെ എംബെഡ്ഡിംഗ് API ഉപയോഗിക്കുന്നു (OpenAI, Cohere മുതലായവ)       | അതെ               | ഇല്ല              |
| `static`       | `potion-base-8M` വഴിയുള്ള ലോക്കൽ ലുക്കപ്പ്-ടേബിൾ എംബെഡ്ഡിംഗ് (WordPiece + mean pooling) | അല്ല              | ~200ms            |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` എന്നിവ വഴിയുള്ള ലോക്കൽ ONNX ഇൻഫറൻസ്  | അല്ല              | ~3s + ~400MB RAM  |
| `auto`         | റൺടൈം നിർണ്ണയം: remote (കീ നിലവിലുണ്ടെങ്കിൽ) → static → transformers → null             | ആശ്രയിച്ചിരിക്കും | ആശ്രയിച്ചിരിക്കും |

**`auto`-യുടെ നിർണ്ണയ ക്രമം:**

1. `listEmbeddingProviders()`-ൽ `hasKey === true` ആയ ആദ്യത്തെ പ്രൊവൈഡറെ കണ്ടെത്തുക → `remote`.
2. `settings.staticEnabled === true` ആണെങ്കിൽ → `static`.
3. `settings.transformersEnabled === true` ആണെങ്കിൽ → `transformers`.
4. അല്ലെങ്കിൽ → `null` (FTS5 കീവേഡ് തിരയലിലേക്ക് താഴ്ത്തുന്നു).

എംബെഡ്ഡിംഗ് കാഷ് (`src/lib/memory/embedding/cache.ts`), `${source}:${model}:${dim}:${sha256(text)}` ഉപയോഗിച്ച് കീ ചെയ്ത ഇൻ-മെമ്മറി LRU മാപ്പ് ഉപയോഗിക്കുന്നു. ഇത് പരമാവധി `MEMORY_EMBEDDING_CACHE_MAX` എൻട്രികളായി (ഡിഫോൾട്ട് 1000) പരിമിതപ്പെടുത്തിയിരിക്കുന്നു, കൂടാതെ `MEMORY_EMBEDDING_CACHE_TTL_MS` (ഡിഫോൾട്ട് 5 മിനിറ്റ്) TTL ഉപയോഗിക്കുന്നു. ഓരോ പ്രോസസ് ലൈഫ്സൈക്കിളിലും എല്ലാ കോളർമാരും ഇത് പങ്കിടുന്നു.

## ഹൈബ്രിഡ് RRF (k=60)

`strategy = "hybrid"` ആയിരിക്കുമ്പോഴും വെക്റ്റർ സ്റ്റോർ ലഭ്യമായിരിക്കുമ്പോഴും, FTS5 ഫലങ്ങളും വെക്റ്റർ ഫലങ്ങളും സംയോജിപ്പിക്കാൻ റിട്രീവൽ Reciprocal Rank Fusion ഉപയോഗിക്കുന്നു:

```
RRF(d) = Σ  1 / (k + rank_i(d))      ഇവിടെ k = 60 (MEMORY_RRF_K വഴി കോൺഫിഗർ ചെയ്യാം)
          i
```

കൃത്യമായി പറഞ്ഞാൽ:

1. FTS5 തിരയൽ പ്രവർത്തിപ്പിക്കുക → റാങ്ക് ചെയ്ത ലിസ്റ്റ് `R_fts` (സ്ഥാനം 1..N).
2. KNN വെക്റ്റർ തിരയൽ പ്രവർത്തിപ്പിക്കുക → റാങ്ക് ചെയ്ത ലിസ്റ്റ് `R_vec` (സ്ഥാനം 1..M).
3. ഓരോ വ്യത്യസ്ത `memoryId`-ക്കും:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (ലിസ്റ്റിൽ ഇല്ലെങ്കിൽ 0).
4. `rrf_score` DESC ക്രമത്തിൽ സോർട്ട് ചെയ്ത് ടോക്കൺ ബജറ്റ് വാക്ക് പ്രയോഗിക്കുക.

വ്യത്യസ്ത സ്വഭാവമുള്ള റിട്രീവൽ സിസ്റ്റങ്ങളിലെ സ്കോറുകൾ നോർമലൈസ് ചെയ്യേണ്ട ആവശ്യമില്ലാതെ RRF ഫലപ്രദമാണെന്ന് പരക്കെ അംഗീകരിക്കപ്പെട്ടിരിക്കുന്നു. ഡിഫോൾട്ട് `k=60`, Cormack et al.-ന്റെ യഥാർത്ഥ പ്രബന്ധത്തിൽ നിന്നുള്ളതാണ്; ചെറിയ കോർപ്പസുകളിൽ (<10k മെമ്മറികൾ) ഇത് മികച്ച രീതിയിൽ പ്രവർത്തിക്കുന്നു.

## ബാക്ക്ഫിൽ (ലേസി + റീഇൻഡക്സ്)

എംബെഡ്ഡിംഗ് മോഡൽ മാറുമ്പോൾ (`embedding_signature` വഴി കണ്ടെത്തുന്നു), വെക്റ്റർ സ്റ്റോർ പുനർനിർമ്മിക്കുകയും നിലവിലുള്ള എല്ലാ മെമ്മറികളെയും `memories` ടേബിളിൽ `needs_reindex = 1` ആയി അടയാളപ്പെടുത്തുകയും ചെയ്യുന്നു.

**ലേസി ബാക്ക്ഫിൽ**: അടുത്ത റിട്രീവൽ സമയത്ത്, വെക്റ്റർ എൻട്രി ഇല്ലാത്ത ഏതൊരു മെമ്മറിയും തിരയൽ പ്രവർത്തിക്കുന്നതിന് മുമ്പ് എംബെഡ് ചെയ്ത് `vec_memories`-ൽ ചേർക്കുന്നു. സ്റ്റാർട്ടപ്പ് തടസ്സപ്പെടുത്താതെ യഥാർത്ഥ അഭ്യർത്ഥനകളിലുടനീളം ഇത് ബാക്ക്ഫിൽ ചെലവ് വിഭജിക്കുന്നു.

**വ്യക്തമായ റീഇൻഡക്സ്**: `/dashboard/memory`-യിലെ Engine ടാബിൽ `POST /api/memory/reindex` കോൾ ചെയ്യുന്ന ഒരു "ഇപ്പോൾ റീഇൻഡക്സ് ചെയ്യുക" ബട്ടൺ ലഭ്യമാണ്. ഹാൻഡ്ലർ `src/lib/memory/reindex.ts`-ൽ നിന്ന് `runReindexBatch()` കോൾ ചെയ്യുന്നു; ഇത് ഓരോ അഭ്യർത്ഥനയിലും പരമാവധി `limit` തീർപ്പാക്കാത്ത എൻട്രികൾ പ്രോസസ് ചെയ്യുന്നു. പുരോഗതി `GET /api/memory/engine-status` (`vectorStore.needsReindex`) വഴി പോൾ ചെയ്യാം.

`memory_vec_meta` ടേബിൾ (മൈഗ്രേഷൻ `083_memory_vec.sql`) ഇനിപ്പറയുന്നവ സംഭരിക്കുന്നു:

- `active_dim` — നിലവിലെ വെക്റ്റർ ഡൈമെൻഷൻ (null = ഇതുവരെ കാലിബ്രേറ്റ് ചെയ്തിട്ടില്ല).
- `embedding_signature` — മാറ്റങ്ങൾ കണ്ടെത്താൻ ഉപയോഗിക്കുന്ന `${source}:${model}:${dim}`.
- `last_reset_at` — അവസാനത്തെ പൂർണ്ണ റീസെറ്റിന്റെ ടൈംസ്റ്റാമ്പ്.
- `vec_loaded` — sqlite-vec വിജയകരമായി ലോഡ് ചെയ്തോ എന്ന് സൂചിപ്പിക്കുന്ന 0/1 ഫ്ലാഗ്.

## ക്രമീകരണ വിപുലീകരണം

`src/shared/schemas/memory.ts`-ലെ `MemorySettingsExtended`-ൽ ഒമ്പത് എംബെഡ്ഡിംഗ്, വെക്റ്റർ ഫീൽഡുകൾ ലഭ്യമാണ്; അവ `src/lib/db/settings.ts` വഴി നിലനിർത്തുന്നു:

| ഫീൽഡ്                    | തരം                                                | ഡിഫോൾട്ട് | വിവരണം                                                                        |
| ------------------------ | -------------------------------------------------- | --------- | ----------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`  | ഉപയോഗിക്കേണ്ട എംബെഡ്ഡിംഗ് ഉറവിടം                                              |
| `embeddingProviderModel` | `string \| null`                                   | `null`    | `provider/model` ഫോർമാറ്റിലുള്ള പ്രൊവൈഡർ/മോഡൽ                                 |
| `customBaseUrl`          | `string \| null`                                   | `null`    | മെമ്മറിക്ക് മാത്രമുള്ള OpenAI-അനുയോജ്യമായ എൻഡ്പോയിന്റിന്റെ അടിസ്ഥാന URL       |
| `customModelId`          | `string \| null`                                   | `null`    | ഇഷ്ടാനുസൃത എൻഡ്പോയിന്റിലേക്ക് അയയ്ക്കുന്ന മോഡൽ ID                             |
| `transformersEnabled`    | `boolean`                                          | `false`   | Transformers.js-നുള്ള സമ്മതാധിഷ്ഠിത സജീവമാക്കൽ (MiniLM, ~400MB)               |
| `staticEnabled`          | `boolean`                                          | `false`   | സ്റ്റാറ്റിക് potion-base-8M ലോക്കൽ മോഡലിനുള്ള സമ്മതാധിഷ്ഠിത സജീവമാക്കൽ        |
| `rerankEnabled`          | `boolean`                                          | `false`   | പുനഃറാങ്കിംഗ് ഘട്ടം സജീവമാക്കുക (ഓരോ അഭ്യർത്ഥനയ്ക്കും +200-500ms ചേർക്കുന്നു) |
| `rerankProviderModel`    | `string \| null`                                   | `null`    | `provider/model` ഫോർമാറ്റിലുള്ള പുനഃറാങ്കിംഗ് പ്രൊവൈഡർ/മോഡൽ                   |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`  | ഉപയോഗിക്കേണ്ട വെക്റ്റർ ബാക്കെൻഡ്                                              |

ഇവ `GET /PUT /api/settings/memory` വഴി ലഭ്യമാക്കുന്നു (`MemorySettingsExtendedSchema` സ്കീമ).

`remote` ഉറവിടത്തിനായി, Memory ഐച്ഛികമായ `customBaseUrl`, `customModelId` ക്രമീകരണങ്ങളും സ്വീകരിക്കുന്നു. ആഗോള എംബെഡ്ഡിംഗ് രജിസ്ട്രിയിൽ മാറ്റം വരുത്താതെ, ഇവ ഒരുമിച്ച് OpenAI-അനുയോജ്യമായ `/embeddings` എൻഡ്പോയിന്റും മോഡലും തിരഞ്ഞെടുക്കുന്നു. ഉപയോഗിക്കുന്നതിന് മുമ്പ് എൻഡ്പോയിന്റ് നോർമലൈസ് ചെയ്യുകയും പ്രൊവൈഡറിന്റെ ഔട്ട്ബൗണ്ട് URL നയം ഉപയോഗിച്ച് പരിശോധിക്കുകയും ചെയ്യുന്നു: HTTP(S) നിർബന്ധമാണ്, ഉൾച്ചേർത്ത ക്രെഡൻഷ്യലുകളും ക്വറി സ്ട്രിങ്ങുകളും നിരസിക്കുന്നു, ക്ലൗഡ്-മെറ്റാഡാറ്റ വിലാസങ്ങൾ തുടർന്നും ബ്ലോക്ക് ചെയ്യപ്പെടുന്നു. ശൂന്യമായ മൂല്യങ്ങൾ തിരഞ്ഞെടുത്ത രജിസ്ട്രി പ്രൊവൈഡറെ നിലനിർത്തുന്നു. ഡാഷ്ബോർഡിലേക്ക് തിരികെ നൽകുന്ന പിശകുകൾ ശുദ്ധീകരിക്കുന്നു; എൻഡ്പോയിന്റ് ക്രെഡൻഷ്യലുകൾ ഒരിക്കലും ലോഗ് ചെയ്യുകയുമില്ല.

> **TODO (D20):** എല്ലാ API കീകൾക്കുമിടയിൽ മെമ്മറികൾ പങ്കിടുന്ന `global` സ്കോപ്പ് ഈ റിലീസിൽ
> നടപ്പിലാക്കിയിട്ടില്ല. അതിന് സ്കീമ മാറ്റങ്ങളും ഒരു ആഗോള റിട്രീവൽ
> പാതയും ആവശ്യമാണ്. ഇത് പ്രത്യേകം ട്രാക്ക് ചെയ്യുക.

## സംഭരണ പാളികൾ

### പ്രാഥമികം: SQLite (`memories` പട്ടിക)

`015_create_memories.sql` മൈഗ്രേഷൻ സൃഷ്ടിക്കുന്നത്:

| കോളം                        | തരം                | കുറിപ്പുകൾ                                                                  |
| --------------------------- | ------------------ | --------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` വഴി സൃഷ്ടിക്കുന്ന UUID                                |
| `api_key_id`                | `TEXT NOT NULL`    | ഉടമസ്ഥതയുള്ള API കീ                                                         |
| `session_id`                | `TEXT`             | ഓരോ സംഭാഷണത്തിനുമുള്ള ഐച്ഛിക സ്കോപ്പ്                                       |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` എന്നിവയിൽ ഒന്ന്             |
| `key`                       | `TEXT`             | സ്ഥിരതയുള്ള അപ്സേർട്ട് കീ, ഉദാ. `preference:i_prefer_python`                |
| `content`                   | `TEXT NOT NULL`    | യഥാർത്ഥ വസ്തുതാ ടെക്സ്റ്റ്                                                  |
| `metadata`                  | `TEXT`             | JSON ബ്ലോബ് (വിഭാഗം, എക്സ്ട്രാക്റ്റ് ചെയ്ത സമയം, ഉറവിടം, ...)               |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 സ്ട്രിങ്ങുകൾ                                                       |
| `expires_at`                | `TEXT`             | ഐച്ഛിക കാലഹരണ സമയം; `NULL` എന്നാൽ സ്ഥിരം                                    |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID-കൾ ↔ FTS5 rowids ബന്ധിപ്പിക്കാൻ `023_fix_memory_fts_uuid.sql` ചേർത്തത് |

ഇൻഡക്സുകൾ: `api_key_id`, `session_id`, `type`, `expires_at`, കൂടാതെ തനതായ
`memory_id` ഇൻഡക്സും.

**അപ്സേർട്ട് സെമാന്റിക്സ്**: ഒരേ `(api_key_id, key)` ഉള്ള നിലവിലെ ഒരു റോയ്ക്കായി `createMemory()` തിരയുകയും അത് കണ്ടെത്തുമ്പോൾ അവിടെത്തന്നെ അപ്ഡേറ്റ് ചെയ്യുകയും ചെയ്യുന്നു (`metadata` ഷാലോ സ്പ്രെഡ് വഴി ലയിപ്പിക്കുന്നു). ആവർത്തിച്ചുള്ള മുൻഗണനാ പ്രസ്താവനകൾ കാരണം പട്ടിക പരിധിയില്ലാതെ വളരുന്നത് ഇത് തടയുന്നു.

### പൂർണ്ണ-ടെക്സ്റ്റ് തിരയൽ (`memory_fts` വെർച്വൽ പട്ടിക)

`022_add_memory_fts5.sql`, `content`, `key` എന്നിവയ്ക്ക് മുകളിൽ ഒരു FTS5 വെർച്വൽ പട്ടിക സൃഷ്ടിക്കുന്നു. UUID പ്രാഥമിക കീ FTS5-ന്റെ ഇന്റിജർ rowid-യുമായി ജോയിൻ ചെയ്യാതിരുന്ന യഥാർത്ഥ സാഹചര്യത്തിലെ ഒരു ബഗ് `023_fix_memory_fts_uuid.sql` പരിഹരിക്കുന്നു — ഈ മൈഗ്രേഷൻ `memory_id` കോളം ചേർക്കുകയും FTS പട്ടിക പുനഃസൃഷ്ടിക്കുകയും INSERT, DELETE, UPDATE എന്നിവ നടക്കുമ്പോൾ FTS സമന്വയത്തിൽ നിലനിർത്തുന്ന ട്രിഗറുകൾ (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ബന്ധിപ്പിക്കുകയും ചെയ്യുന്നു.

`semantic`, `hybrid` തന്ത്രങ്ങൾക്കായി `retrieval.ts` ഇത് ഉപയോഗിക്കുന്നു (താഴെ കാണുക). റിട്രീവൽ കോഡ് `hasTable("memory_fts")` ഉപയോഗിച്ച് സുരക്ഷാ പരിശോധന നടത്തുകയും FTS പട്ടിക ഇല്ലെങ്കിലോ FTS ക്വറി പിശക് സൃഷ്ടിച്ചാലോ കാലക്രമത്തിലേക്കു ഫാൾബാക്ക് ചെയ്യുകയും ചെയ്യുന്നു.

### ഐച്ഛികം: Qdrant (വെക്റ്റർ സ്റ്റോർ ടിയർ 2)

`src/lib/memory/qdrant.ts`, ടിയർ 2 വെക്റ്റർ സ്റ്റോറായി ഒരു ഐച്ഛിക Qdrant ഇന്റഗ്രേഷൻ നടപ്പിലാക്കുന്നു. എൻജിൻ സെലക്ടർ `memoryVectorStore === "qdrant"` ആയിരിക്കുമ്പോൾ മാത്രമേ റിട്രീവൽ Qdrant-ലേക്ക് റൂട്ട് ചെയ്യുകയുള്ളൂ — ഡിഫോൾട്ടായ `"auto"`-യും (`"sqlite-vec"`-യും) **ഒരിക്കലും** Qdrant തിരഞ്ഞെടുക്കില്ല. Engine ടാബിലെ ടോഗിൾ `qdrantEnabled`, `memoryVectorStore` എന്നിവ **രണ്ടും** ഒരുമിച്ച് സജ്ജമാക്കുന്നു: സജീവമാക്കുമ്പോൾ Qdrant പ്രാഥമിക സ്റ്റോറാകുന്നു; പ്രവർത്തനരഹിതമാക്കുമ്പോൾ `"auto"`-യിലേക്ക് റീസെറ്റ് ചെയ്യുന്നു (#5597 — ആ പരിഹാരത്തിനു മുമ്പ് എൻജിൻ സെലക്ടറിലേക്ക് ഒന്നും എഴുതാതിരുന്നതിനാൽ സജീവമാക്കൽ ഫലരഹിതമായിരുന്നു). Qdrant ലഭ്യമല്ലെങ്കിലോ ഒന്നും തിരികെ നൽകുന്നില്ലെങ്കിലോ, റിട്രീവൽ sqlite-vec → FTS5 എന്ന ക്രമത്തിൽ ഫാൾബാക്ക് ചെയ്യുന്നു.

- `upsertSemanticMemoryPoint()` — കോൺഫിഗർ ചെയ്തിരിക്കുന്ന embedding മോഡൽ ഉപയോഗിച്ച് `key + content` embed ചെയ്യുന്നു, collection നിലവിലുണ്ടെന്ന് ഉറപ്പാക്കുന്നു (ആദ്യ ഉപയോഗത്തിൽ cosine-distance vectors സൃഷ്ടിക്കുന്നു), തുടർന്ന് `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` payload സഹിതം ഒരു point upsert ചെയ്യുന്നു.
- `searchSemanticMemory(query, topK, scope)` — query embed ചെയ്യുന്നു, `kind = "omniroute_memory"` പ്രകാരവും ആവശ്യമെങ്കിൽ `apiKeyId` / `sessionId` പ്രകാരവും filter ചെയ്ത collection-ൽ തിരയുന്നു. `topK`-യെ `[1, 20]` പരിധിയിൽ പരിമിതപ്പെടുത്തുന്നു.
- `deleteSemanticMemoryPoint(id)` — ഒരൊറ്റ point ഇല്ലാതാക്കുന്നു. SQLite row നീക്കം ചെയ്തതിന് ശേഷം `deleteMemory()` ഇത് വിളിക്കുന്നു (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` കഴിഞ്ഞുപോയതോ `createdAtUnix` retention cutoff-നേക്കാൾ പഴയതോ ആയ points കൂട്ടമായി ഇല്ലാതാക്കുന്നു. Dashboard-ൽ യഥാർത്ഥ എണ്ണം കാണിക്കാൻ ആദ്യം എണ്ണം കണക്കാക്കുന്നു.
- `checkQdrantHealth()` — latency സഹിതമുള്ള `GET /readyz` health probe.

Settings UI-യിൽ Qdrant config, health check, semantic search test, cleanup എന്നിവ `/dashboard/memory`-യിലെ **Engine tab**-ൽ ലഭ്യമാണ്. `src/app/api/settings/qdrant/`-ന് കീഴിലുള്ള അനുബന്ധ routes എല്ലാം v3.8.6 മുതൽ ബന്ധിപ്പിച്ചിരിക്കുന്നു:

| Route                                   | Method        | വിവരണം                                     |
| --------------------------------------- | ------------- | ------------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings വായിക്കുക / പുതുക്കുക      |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency                   |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test                       |
| `/api/settings/qdrant/cleanup`          | `POST`        | കാലഹരണപ്പെട്ട / പഴയ points നീക്കം ചെയ്യുക  |
| `/api/settings/qdrant/embedding-models` | `GET`         | ലഭ്യമായ embedding models പട്ടികപ്പെടുത്തുക |

**പെരുമാറ്റ കുറിപ്പുകൾ (പ്രതീക്ഷിക്കേണ്ടത്):**

- **Engine തിരഞ്ഞെടുപ്പ്** — Engine tab-ൽ Qdrant പ്രവർത്തനക്ഷമമാക്കുമ്പോൾ അത് primary store ആകുന്നു (`memoryVectorStore="qdrant"` സജ്ജമാക്കുന്നു); പ്രവർത്തനരഹിതമാക്കുമ്പോൾ `"auto"`-യിലേക്ക് പുനഃസജ്ജമാക്കുന്നു (#5597).
- **Back-fill ഇല്ല** — Qdrant പ്രവർത്തനക്ഷമമാക്കിയതിന് **ശേഷം** സൃഷ്ടിക്കുകയോ പുതുക്കുകയോ ചെയ്യുന്ന memories മാത്രമേ അതിലേക്ക് എഴുതപ്പെടൂ (fire-and-forget dual-write). മുമ്പ് നിലവിലുണ്ടായിരുന്ന SQLite memories migrate ചെയ്യപ്പെടുന്നില്ല; "Reindex Now" sqlite-vec index മാത്രം പുനർനിർമ്മിക്കുന്നു, Qdrant അല്ല.
- **Vector dimension സ്വയമേവ കണ്ടെത്തുന്നു** — ആദ്യ ഉപയോഗത്തിൽ ലഭിക്കുന്ന യഥാർത്ഥ embedding-ൽ നിന്നാണ് ഇത് കണ്ടെത്തുന്നത്; പൂരിപ്പിക്കാൻ dimension field ഇല്ല. ഒരു collection നിലവിൽ വന്നതിന് ശേഷം embedding model മാറ്റുന്നത് സ്വയമേവ കൈകാര്യം ചെയ്യപ്പെടുന്നില്ല: നിലവിലുള്ള collection മാറ്റമില്ലാതെ തുടരുന്നു, dimension പൊരുത്തപ്പെടാത്ത writes/searches പരാജയപ്പെടുകയും sqlite-vec-ലേക്ക് fallback ചെയ്യുകയും ചെയ്യും. Embedders മാറ്റാൻ collection വീണ്ടും സൃഷ്ടിക്കുക (പുതിയ പേര് നൽകുക, അല്ലെങ്കിൽ Qdrant-ൽ അത് ഇല്ലാതാക്കുക).
- **Distance metric** — എല്ലായ്പ്പോഴും **Cosine** (collection സൃഷ്ടിക്കുമ്പോൾ hardcode ചെയ്തിരിക്കുന്നു; കോൺഫിഗർ ചെയ്യാനാവില്ല).
- **Auth** — API key മാത്രം (`api-key` header ആയി അയയ്ക്കുന്നു; authentication ഇല്ലാത്ത local Docker-ന് optional ആണ്). JWT/RBAC ഉപയോഗിക്കുന്നില്ല.
- **Config fields** — UI `host`, `port`, `collection`, `embeddingModel`, `apiKey` എന്നിവ ലഭ്യമാക്കുന്നു. `vectorSize` / `hnswEfConstruct` env/DB വഴി മാത്രം ലഭ്യമാണ്; collection സൃഷ്ടിക്കുന്നതിന് `vectorSize` ഉപയോഗിക്കുന്നില്ല (dimension embedding-ൽ നിന്നാണ് ലഭിക്കുന്നത്).

### Vector quantization (int8 — opt-in, രണ്ട് backends-ലും)

സംഭരിച്ച vectors-ന്റെ memory footprint കുറയ്ക്കാൻ (~Float32-നേക്കാൾ 4× ചെറുത്), recall-ൽ ചെറിയ കുറവോടെ, രണ്ട് vector backends-ഉം **opt-in int8 quantization** പിന്തുണയ്ക്കുന്നു. രണ്ടിലും default ആയി ഇത് **off** ആണ് — വ്യക്തമായി പ്രവർത്തനക്ഷമമാക്കാത്തിടത്തോളം vectors full-precision ആയി തുടരും.

| Backend    | Setting                         | Type                           | Default  | വായിക്കുന്ന സ്ഥലം                                           |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ഓരോ instance-നും `qdrantQuantization` setting key വഴി കോൺഫിഗർ ചെയ്യുന്നു (`PUT /api/settings/qdrant`-ൽ `quantization` field ആയി ലഭ്യമാക്കിയിരിക്കുന്നു). `"int8"` ആയിരിക്കുമ്പോൾ, `buildQuantizationConfig()` scalar quantization (`always_ram`, quantile `0.99`) അഭ്യർത്ഥിക്കുകയും searches-ൽ `rescore: true` പ്രവർത്തനക്ഷമമാക്കുകയും ചെയ്യുന്നു; അതുവഴി full-precision vectors int8 candidate set കൂടുതൽ കൃത്യമാക്കുന്നു.
- **sqlite-vec** quantization **environment-only** ആണ് (DB setting അല്ല): local vectors ഒരു `int8[dim]` column ആയി `vec_quantize_int8(?, 'unit')` വഴി സംഭരിക്കാൻ `MEMORY_VEC_QUANTIZATION=int8` സജ്ജമാക്കുക. തിരഞ്ഞെടുത്ത mode `embedding_signature`-ൽ ഉൾപ്പെടുത്തുന്നു (ഒരു `:int8` suffix), അതിനാൽ modes മാറ്റുന്നത് `vec_memories` table-ന്റെ പൂർണ്ണ reindex trigger ചെയ്യുന്നു — embedding model മാറുമ്പോൾ ഉപയോഗിക്കുന്ന അതേ lazy-backfill path തന്നെയാണ് ഇത്.

## മെമ്മറി തരങ്ങൾ

`MemoryType` (`src/lib/memory/types.ts`):

| തരം          | ഉപയോഗിക്കുന്നത്                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `factual`    | മുൻഗണനകൾ, സ്ഥിരമായ ഉപയോക്തൃ വസ്തുതകൾ, പെരുമാറ്റ രീതികൾ                                                    |
| `episodic`   | ഒരു നിർദ്ദിഷ്ട സന്ദർഭവുമായി ബന്ധപ്പെട്ട തീരുമാനങ്ങൾ ("ഞാൻ Postgres തിരഞ്ഞെടുത്തു")                        |
| `procedural` | വർക്ക്ഫ്ലോ / എങ്ങനെ ചെയ്യാം എന്നതിന്റെ മെമ്മറി (കരുതിവെച്ചിരിക്കുന്നു; നിലവിൽ സ്വയമേവ എക്സ്ട്രാക്ടർ ഇല്ല) |
| `semantic`   | വെക്റ്റർ-സ്റ്റോർ എൻട്രികൾക്കായി കരുതിവെച്ചിരിക്കുന്നു                                                     |

`MemoryConfig` വീണ്ടെടുക്കൽ തന്ത്രം `exact`, `semantic`, അല്ലെങ്കിൽ `hybrid`
എന്നിവയിൽ ഒന്നാണ്, സ്കോപ്പ് `session`, `apiKey`, അല്ലെങ്കിൽ `global` എന്നിവയിൽ
ഒന്നാണ്. `getMemorySettings()`-ൽ നിന്നുള്ള ഡിഫോൾട്ട് സ്കോപ്പ് `apiKey` ആണ്.

## വസ്തുത എക്സ്ട്രാക്ഷൻ (`extraction.ts`)

എക്സ്ട്രാക്ഷൻ **regex-അധിഷ്ഠിതമാണ്**, LLM-അധിഷ്ഠിതമല്ല — ഇത്
`setImmediate()` ഉപയോഗിച്ച് ഇൻ-പ്രോസസായി പ്രവർത്തിക്കുന്നതിനാൽ റെസ്പോൺസ്
സ്ട്രീമിനെ ഒരിക്കലും തടയുന്നില്ല:

- **മുൻഗണനാ പാറ്റേണുകൾ** → `MemoryType.FACTUAL`
  (ഉദാ. `ഞാൻ … മുൻഗണിക്കുന്നു`, `എനിക്ക് … വളരെ ഇഷ്ടമാണ്`, `എന്റെ പ്രിയപ്പെട്ടത് … ആണ്`, `ഞാൻ … വെറുക്കുന്നു`)
- **തീരുമാന പാറ്റേണുകൾ** → `MemoryType.EPISODIC`
  (ഉദാ. `ഞാൻ … ഉപയോഗിക്കും`, `ഞാൻ … തിരഞ്ഞെടുത്തു`, `ഞാൻ … സ്വീകരിച്ചു`, `ഞാൻ … സ്വീകരിക്കാൻ പോകുന്നു`)
- **ശീല പാറ്റേണുകൾ** → `MemoryType.FACTUAL`
  (ഉദാ. `ഞാൻ സാധാരണയായി …`, `ഞാൻ എപ്പോഴും …`, `ഞാൻ പൊതുവെ … ചെയ്യാറുണ്ട്`)

ഓരോ പൊരുത്തവും ശുദ്ധീകരിക്കുകയും (`trim`, വൈറ്റ്സ്പേസ് ചുരുക്കൽ, പരമാവധി 500
പ്രതീകങ്ങളായി പരിമിതപ്പെടുത്തൽ), സ്ഥിരതയുള്ള `factKey(category, content)` വഴി
ബാച്ചിനുള്ളിൽ ഡ്യൂപ്ലിക്കേറ്റുകൾ നീക്കം ചെയ്യുകയും, തുടർന്ന്
`{category, extractedAt, source: "llm_response"}` എന്ന മെറ്റാഡാറ്റയോടെ
`createMemory()` ഉപയോഗിച്ച് സംഭരിക്കുകയും ചെയ്യുന്നു. ഇൻപുട്ട് ടെക്സ്റ്റ്
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) ആയി പരിമിതപ്പെടുത്തിയിരിക്കുന്നു —
അതിലും നീളമുള്ളപ്പോൾ, ഏറ്റവും പുതിയ അസിസ്റ്റന്റ് ഉള്ളടക്കം എപ്പോഴും
ഉൾപ്പെടുന്നതിനായി ടെക്സ്റ്റിന്റെ **അവസാനഭാഗം** ഉപയോഗിക്കുന്നു.

`extractFactsFromText(text)` ടെസ്റ്റുകൾക്കായി എക്സ്പോർട്ട് ചെയ്തിരിക്കുന്നു;
ഇത് വസ്തുതകൾ സംഭരിക്കാതെ ഘടനാബദ്ധമായ വസ്തുതകൾ തിരികെ നൽകുന്നു.

## വീണ്ടെടുക്കൽ (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ആണ് പ്രധാന എൻട്രി പോയിന്റ്. ഇത്:

1. `MemoryConfigSchema` വഴി കോൺഫിഗ് സാധാരണവൽക്കരിക്കുകയും സാധൂകരിക്കുകയും ചെയ്യുന്നു.
2. `enabled` false ആണെങ്കിലോ `maxTokens <= 0` ആണെങ്കിലോ ഉടൻ `[]` തിരികെ നൽകുന്നു.
3. `maxTokens`-നെ `[1, 8000]` പരിധിയിലേക്ക് പരിമിതപ്പെടുത്തുന്നു.
4. പഴയ ഡാറ്റാബേസുകൾ തുടർന്നും പ്രവർത്തിക്കുന്നതിനായി, ആധുനിക `memories` ടേബിൾ
   നിലവിലുണ്ടോ എന്ന് കണ്ടെത്തുന്നു (ലെഗസി `memory` ടേബിളിന് പകരം).
5. കാലാവധി സംരക്ഷണ വ്യവസ്ഥ
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ഐച്ഛികമായ
   സെഷൻ സ്കോപ്പ്, ഐച്ഛികമായ `retentionDays` കട്ട്ഓഫ് എന്നിവ ഉപയോഗിച്ച് അടിസ്ഥാന
   ക്വറി നിർമ്മിക്കുന്നു.
6. തന്ത്രത്തിന്റെ അടിസ്ഥാനത്തിൽ ശാഖകളായി തിരിയുന്നു:
   - **`exact`** (ഡിഫോൾട്ട്): കാലക്രമത്തിലുള്ള `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` നൽകിയിട്ടുണ്ടാകുകയും `memory_fts` നിലവിലുണ്ടാകുകയും
     ചെയ്താൽ, `memory_fts MATCH ?` ഉപയോഗിച്ച് JOIN ചെയ്യുകയും FTS റാങ്ക് പ്രകാരം
     ക്രമീകരിക്കുകയും ചെയ്യുന്നു; FTS 0 വരികൾ തിരികെ നൽകുമ്പോൾ കാലക്രമത്തിലേക്ക്
     മടങ്ങുന്നു.
   - **`hybrid`**: FTS ഫലങ്ങളുടെയും (ഉയർന്ന പ്രസക്തി) കാലക്രമത്തിലുള്ള സെറ്റിന്റെയും
     യൂണിയൻ സൃഷ്ടിച്ച്, id പ്രകാരം ഡ്യൂപ്ലിക്കേറ്റുകൾ നീക്കം ചെയ്യുന്നു.
7. ഒരു ക്വറി നൽകിയിട്ടുണ്ടെങ്കിൽ, `content`, `key`, `metadata` JSON എന്നിവയിൽ
   കീവേഡ് പ്രസക്തി സ്കോർ (`getRelevanceScore`) കണക്കാക്കുന്നു. പൂജ്യം സ്കോറുള്ള
   വരികൾ ഒഴിവാക്കപ്പെടുന്നു.
8. ആദ്യം സ്കോർ അവരോഹണക്രമത്തിലും, തുടർന്ന് `createdAt` അവരോഹണക്രമത്തിലും അടുക്കുന്നു.
9. റാങ്ക് ചെയ്ത ലിസ്റ്റിലൂടെ സഞ്ചരിച്ച്, തുടർച്ചയായി കണക്കാക്കുന്ന
   `estimateTokens(content)` (≈ `length / 4`) ബജറ്റിനുള്ളിൽ തുടരുന്നിടത്തോളം
   എൻട്രികൾ സ്വീകരിക്കുന്നു. ഏതെങ്കിലും പൊരുത്തം ലഭിച്ചാൽ എപ്പോഴും കുറഞ്ഞത്
   ഒരു എൻട്രിയെങ്കിലും തിരികെ നൽകുന്നു.

`estimateTokens` എക്സ്പോർട്ട് ചെയ്തിരിക്കുന്നു; വീണ്ടെടുക്കൽ, സംഗ്രഹിക്കൽ,
MCP `omniroute_memory_search` ടൂൾ എന്നിവ ഇത് ഉപയോഗിക്കുന്നു.

## ഇൻജെക്ഷൻ (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. എല്ലാ മെമ്മറി ഉള്ളടക്കങ്ങളും ഒരൊറ്റ `Memory context: …` സ്ട്രിങ്ങായി സംയോജിപ്പിക്കുന്നു.
2. പ്രൊവൈഡറിന്റെ പേരനുസരിച്ച് ഒരു തന്ത്രം തിരഞ്ഞെടുക്കുന്നു:
   - **സിസ്റ്റം സന്ദേശം** (OpenAI, Anthropic, Gemini, … എന്നിവയ്ക്ക് ഡിഫോൾട്ട്) — നിലവിലുള്ള ഏതൊരു സിസ്റ്റം സന്ദേശത്തിനും മുമ്പായി
     `{role: "system", content: memoryText}` ചേർക്കുന്നു; അതിനാൽ ഉപയോക്താവിന്റെ സിസ്റ്റം പ്രോംപ്റ്റുകൾക്ക് തുടർന്നും മുൻഗണന ലഭിക്കും.
   - **ഉപയോക്തൃ സന്ദേശം** (ഫോൾബാക്ക്) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`-ലുള്ള
     പ്രൊവൈഡറുകൾക്ക്: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. ഇവ സിസ്റ്റം റോൾ നിരസിക്കുന്നതിനാൽ,
     അല്ലാത്തപക്ഷം 400 പിശക് സംഭവിക്കും (GLM/Zhipu-നുള്ള issue #1701 കാണുക).
3. എണ്ണം, തന്ത്രം, മോഡൽ എന്നിവ `memory.injection.injected` എന്നതിന് കീഴിൽ ലോഗ് ചെയ്യുന്നു.

സ്വന്തമായി റൂട്ടിങ് തീരുമാനങ്ങൾ എടുക്കേണ്ട കോളറുകൾക്കായി `providerSupportsSystemMessage(provider)` എക്സ്പോർട്ട് ചെയ്തിരിക്കുന്നു. സുരക്ഷയ്ക്കായി അജ്ഞാത പ്രൊവൈഡറുകൾക്ക് ഡിഫോൾട്ടായി `true`
(സിസ്റ്റം റോൾ അനുവദിച്ചിരിക്കുന്നു) ഉപയോഗിക്കുന്നു.

## ക്രമീകരണങ്ങൾ (`settings.ts`)

മെമ്മറി കോൺഫിഗറേഷൻ env vars-ലല്ല, **DB settings പട്ടികയിലാണ് സംഭരിക്കുന്നത്**.
`getMemorySettings()`, `getSettings()`-ൽ നിന്ന് വായിക്കുകയും ഫലം
പ്രോസസ്സിനുള്ളിൽ കാഷ് ചെയ്യുകയും ചെയ്യുന്നു; എഴുതലുകൾക്കുശേഷം settings PUT
റൂട്ട് `invalidateMemorySettingsCache()` വിളിക്കുന്നു.

### ലെഗസി ഫീൽഡുകൾ (എല്ലാ പതിപ്പുകളും)

| DB കീ                 | തരം     | ഡിഫോൾട്ട്                                                   | UI നിയന്ത്രണം                                                       |
| --------------------- | ------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 മുതൽ ഡിഫോൾട്ടായി ഓഫ്)                      | മെമ്മറി ഓൺ/ഓഫ്                                                      |
| `memoryMaxTokens`     | integer | `2000` (പരിധി `0–16000`)                                    | ഇൻജെക്ഷനുള്ള ടോക്കൺ ബജറ്റ്                                          |
| `memoryRetentionDays` | integer | `30` (പരിധി `1–365`)                                        | നിലനിർത്തൽ കാലയളവ്                                                  |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` എന്നിവയിൽ ഒന്ന്) | വീണ്ടെടുക്കൽ തന്ത്രം                                                |
| `skillsEnabled`       | boolean | `false`                                                     | ഓരോ കീയ്ക്കുമുള്ള സ്കിൽ ഇൻജെക്ഷൻ ടോഗിൾ ചെയ്യുന്നു (SKILLS.md കാണുക) |

കുറിപ്പ്: `toMemoryRetrievalConfig()` വഴി UI തന്ത്രമായ `"recent"`, ആന്തരിക
വീണ്ടെടുക്കൽ തന്ത്രമായ `"exact"`-ലേക്ക് മാപ്പ് ചെയ്യുന്നു (കാലക്രമത്തിലുള്ള ക്രമം).

### പുതിയ ഫീൽഡുകൾ (v3.8.6, പ്ലാൻ 21 D9)

ഫീൽഡ് വിവരണങ്ങൾക്കായി മുകളിലുള്ള "Settings extension" വിഭാഗവും കാണുക.

| DB കീ                       | API ഫീൽഡ്                | ഡിഫോൾട്ട് |
| --------------------------- | ------------------------ | --------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`  |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`    |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`   |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`   |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`   |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`    |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`  |

Qdrant-മായി ബന്ധപ്പെട്ട DB കീകൾ (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` ഡിഫോൾട്ട് `"omniroute_memory"`,
`qdrantEmbeddingModel` ഡിഫോൾട്ട് `"openai/text-embedding-3-small"`) `qdrant.ts`-ലെ
`normalizeQdrantConfig()` വായിക്കുന്നു.

### എൻവയോൺമെന്റ് വേരിയബിളുകൾ (v3.8.6)

ഓപ്ഷണലായ ആറ് env vars എൻജിന്റെ റൺടൈം പെരുമാറ്റം ക്രമീകരിക്കുന്നു (`.env.example`-ൽ രേഖപ്പെടുത്തിയിരിക്കുന്നു):

| വേരിയബിൾ                        | ഡിഫോൾട്ട്                  | വിവരണം                                                                                                                                                      |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | എംബെഡിങ് കാഷ് TTL (5 മിനിറ്റ്)                                                                                                                              |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | എംബെഡിങ് LRU കാഷിലെ പരമാവധി എൻട്രികൾ                                                                                                                        |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js മോഡലിനുള്ള HF റിപ്പോ                                                                                                                        |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | സ്റ്റാറ്റിക് potion മോഡലിനുള്ള HF റിപ്പോ                                                                                                                    |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ഡൗൺലോഡ് ചെയ്ത മോഡലുകൾ സംഭരിക്കേണ്ട സ്ഥലം                                                                                                                    |
| `MEMORY_VEC_TOP_K`              | `20`                       | വെക്ടർ തിരയലിനുള്ള ഡിഫോൾട്ട് top-K                                                                                                                          |
| `MEMORY_RRF_K`                  | `60`                       | ഹൈബ്രിഡ് തിരയലിനുള്ള RRF k സ്ഥിരാങ്കം                                                                                                                       |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | ലോക്കൽ sqlite-vec വെക്ടറുകൾ ക്വാണ്ടൈസ് ചെയ്ത് സംഭരിക്കാൻ `int8` ആയി സജ്ജീകരിക്കുക (~4× ചെറുത്; ഓപ്റ്റ്-ഇൻ). മോഡ് മാറ്റം നിർബന്ധിതമായി റീഇൻഡക്സ് ചെയ്യുന്നു. |

## സംഗ്രഹിക്കൽ (`summarization.ts`)

ഒരു കീയുടെ മെമ്മറികളിലെ ആകെ ടോക്കണുകളുടെ എണ്ണം ബജറ്റ് കവിയുമ്പോൾ, `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` പഴയ ഉള്ളടക്കം ചുരുക്കുന്നു. ഇത് `created_at` അടിസ്ഥാനമാക്കി DESC ക്രമത്തിൽ വരികളിലൂടെ ആവർത്തിക്കുകയും, പരിധിക്കുള്ളിൽ ഉൾപ്പെടുന്ന വരികൾ നിലനിർത്തുകയും, ശേഷിക്കുന്നവയുടെ `content` അതേ സ്ഥാനത്ത് യഥാർത്ഥ ഉള്ളടക്കത്തിലെ ആദ്യത്തെ മൂന്ന് വാക്യങ്ങൾ ഉപയോഗിച്ച് മാറ്റിസ്ഥാപിക്കുകയും ചെയ്യുന്നു. പഴയതും പുതിയതുമായ ഉള്ളടക്കങ്ങൾക്കിടയിലെ `estimateTokens` വ്യത്യാസമാണ് `tokensSaved`.

നിലവിലെ ചാറ്റ് പൈപ്പ്ലൈനിൽ ഈ റൂട്ടീൻ **ലഭ്യമാണെങ്കിലും സ്വയമേവ വിളിക്കപ്പെടുന്നില്ല** — തുടർച്ചയായ ചുരുക്കൽ ആവശ്യമാണെങ്കിൽ ഒരു cron-ൽ നിന്നോ, ഒരു അഡ്മിൻ പ്രവർത്തനത്തിൽ നിന്നോ, അല്ലെങ്കിൽ `MemoryConfig.autoSummarize` ഗ്ലൂവിൽ നിന്നോ ഇത് വിളിക്കുക. ഡാറ്റാ നഷ്ടം ഏകദിശയിലാണ്: യഥാർത്ഥ ടെക്സ്റ്റ് തിരുത്തിയെഴുതപ്പെടുന്നു.

## REST API

എല്ലാ എൻഡ്പോയിന്റുകൾക്കും മാനേജ്മെന്റ് ഓത്ത് (`requireManagementAuth`) ആവശ്യമാണ്.

### പ്രധാന മെമ്മറി എൻഡ്പോയിന്റുകൾ (നിലവിലുള്ളവ + പുതുക്കിയവ)

| രീതി     | പാത്ത്               | വിവരണം                                                                                                                                                                                                          |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | ഫിൽട്ടറുകളോടുകൂടിയ പേജിനേറ്റ് ചെയ്ത പട്ടിക: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. പ്രതികരണത്തിൽ `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` എന്നിവ ഉൾപ്പെടുന്നു |
| `POST`   | `/api/memory`        | എൻട്രി സൃഷ്ടിക്കുന്നു (Zod സാധൂകരിച്ചത്: `content`, `key`, ഐച്ഛികമായ `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)`-ൽ upsert ചെയ്യുന്ന `createMemory()` വിളിക്കുന്നു              |
| `GET`    | `/api/memory/[id]`   | UUID ഉപയോഗിച്ച് ഒരൊറ്റ എൻട്രി ലഭ്യമാക്കുന്നു                                                                                                                                                                    |
| `PUT`    | `/api/memory/[id]`   | എൻട്രി ഫീൽഡുകൾ (`type`, `key`, `content`, `metadata`) പുതുക്കുന്നു. ബോഡി: `MemoryUpdatePutSchema`. എംബെഡ്ഡിങ് ഉറവിടം ലഭ്യമാണെങ്കിൽ വെക്ടറും സമന്വയിപ്പിക്കുന്നു.                                                |
| `DELETE` | `/api/memory/[id]`   | ഒരു എൻട്രി ഇല്ലാതാക്കുന്നു; `vec_memories` (D15), Qdrant എന്നിവയിൽ നിന്നും പരമാവധി ശ്രമത്തോടെ ഇല്ലാതാക്കുന്നു. എൻട്രി ഇല്ലെങ്കിൽ 404 തിരികെ നൽകുന്നു.                                                           |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` പ്രവർത്തിപ്പിക്കുന്നു — സൃഷ്ടിക്കൽ→പട്ടികപ്പെടുത്തൽ→ഇല്ലാതാക്കൽ റൗണ്ട്-ട്രിപ്പ്. `{working, latencyMs, error?}` തിരികെ നൽകുന്നു                                      |

### പുതിയ മെമ്മറി എൻജിൻ എൻഡ്പോയിന്റുകൾ (പ്ലാൻ 21)

| രീതി   | പാത്ത്                            | വിവരണം                                                                                                                                                                                                    |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories`-ന്റെ ഡ്രൈ-റൺ — സ്കോർ, ടിയർ, ടോക്കണുകൾ എന്നിവയോടുകൂടിയ റാങ്ക് ചെയ്ത ഫലങ്ങൾ തിരികെ നൽകുന്നു. ബോഡി: `RetrievePreviewSchema`. മെമ്മറികൾ ഇൻജക്റ്റ് ചെയ്യുകയോ പരിഷ്കരിക്കുകയോ ചെയ്യുന്നില്ല. |
| `GET`  | `/api/memory/embedding-providers` | എംബെഡ്ഡിങ് മോഡലുകളോടുകൂടിയ പ്രൊവൈഡറുകളെ പട്ടികപ്പെടുത്തുകയും, ഏതൊക്കെയാണ് കോൺഫിഗർ ചെയ്ത API കീ ഉള്ളവയെന്ന് സൂചിപ്പിക്കുകയും ചെയ്യുന്നു.                                                                   |
| `GET`  | `/api/memory/engine-status`       | പൂർണ്ണ എൻജിൻ നില തിരികെ നൽകുന്നു: കീവേഡ് ടിയർ, എംബെഡ്ഡിങ് റെസല്യൂഷൻ, വെക്ടർ സ്റ്റോർ സ്ഥിതിവിവരക്കണക്കുകൾ, Qdrant ഹെൽത്ത്, റീറാങ്ക് കോൺഫിഗ്. ഘടന: `MemoryEngineStatusSchema`.                              |
| `POST` | `/api/memory/summarize`           | മെമ്മറി ചുരുക്കൽ മാനുവലായി ട്രിഗർ ചെയ്യുന്നു. ബോഡി: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` തിരികെ നൽകുന്നു.                                        |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ഉള്ള മെമ്മറികൾക്കായി വെക്ടർ റീഇൻഡെക്സിങ് ട്രിഗർ ചെയ്യുന്നു. ബോഡി: `MemoryReindexSchema` (`force`). `{started, pending}` തിരികെ നൽകുന്നു.                                                |

### ക്രമീകരണ എൻഡ്പോയിന്റുകൾ

| രീതി   | പാത്ത്                                  | വിവരണം                                                                                                                  |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | നിലവിലെ നോർമലൈസ് ചെയ്ത `MemorySettingsExtended` (7 പുതിയ ഫീൽഡുകൾ + ലെഗസി)                                               |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema`-യിൽ നിന്നുള്ള ഏതെങ്കിലും ഫീൽഡ് പുതുക്കുന്നു (ആകെ 12 ഫീൽഡുകൾ)                             |
| `GET`  | `/api/settings/qdrant`                  | നിലവിലെ Qdrant ക്രമീകരണങ്ങൾ (`QdrantSettingsSchema`)                                                                    |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant ക്രമീകരണങ്ങൾ പുതുക്കുന്നു. ബോഡി: `QdrantSettingsUpdateSchema`. `apiKey` = ശൂന്യമായ സ്ട്രിങ് കീ നീക്കംചെയ്യുന്നു. |
| `GET`  | `/api/settings/qdrant/health`           | കോൺഫിഗർ ചെയ്ത Qdrant ഇൻസ്റ്റൻസിനെതിരെയുള്ള ലൈവ്നസ് പ്രോബ്. `QdrantHealthResultSchema` തിരികെ നൽകുന്നു.                  |
| `POST` | `/api/settings/qdrant/search`           | Qdrant-നെതിരെയുള്ള സെമാന്റിക് തിരയൽ പരിശോധന. ബോഡി: `QdrantSearchSchema` (`query`, `topK`).                              |
| `POST` | `/api/settings/qdrant/cleanup`          | കാലഹരണപ്പെട്ട / പഴയ മെമ്മറികൾക്കുള്ള Qdrant പോയിന്റുകൾ നീക്കംചെയ്യുന്നു.                                                |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant-ന് ലഭ്യമായ എംബെഡ്ഡിങ് മോഡലുകൾ പട്ടികപ്പെടുത്തുന്നു.                                                              |

`/api/memory` പട്ടിക ക്വറി `page` അടിസ്ഥാനമാക്കിയുള്ള പേജിനേഷൻ
(`parsePaginationParams`) **അല്ലെങ്കിൽ** റോ `offset` പിന്തുണയ്ക്കുന്നു — `offset` നൽകിയിട്ടുണ്ടെങ്കിൽ അതിനാണ്
മുൻഗണന, കൂടാതെ പ്രതികരണ ഘടനയ്ക്കായി അതിൽ നിന്ന് ഒരു `page` കണക്കാക്കപ്പെടുന്നു.

## MCP ടൂളുകൾ (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP സർവർ പ്രവർത്തനക്ഷമമാക്കുമ്പോൾ, മൂന്ന് മെമ്മറി ടൂളുകൾ രജിസ്റ്റർ ചെയ്യപ്പെടുന്നു:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`-നെ റാപ്പ് ചെയ്യുന്നു. v3.8.6 (D16) മുതൽ, `strategy`
  `"exact"` ആയി ഹാർഡ്കോഡ് ചെയ്യുന്നതിനുപകരം `getMemorySettings()`-ൽ നിന്ന്
  വായിക്കുന്നു. `query` നൽകിയിരിക്കുകയും `strategy` എന്നത് `semantic` അല്ലെങ്കിൽ
  `hybrid` ആയിരിക്കുകയും ചെയ്യുന്നുവെങ്കിൽ, ലഭ്യമായിരിക്കുമ്പോൾ വെക്റ്റർ
  സ്റ്റോർ ഉപയോഗിക്കുന്നു.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`-നെ റാപ്പ് ചെയ്യുന്നു. 4 കാനോണിക്കൽ തരങ്ങൾ മാത്രം
  സ്വീകരിക്കുന്നു: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → പൊരുത്തപ്പെടുന്ന
  എൻട്രികൾ ലിസ്റ്റ് ചെയ്യുന്നു, ആവശ്യമെങ്കിൽ സൃഷ്ടിച്ചത്-മുമ്പുള്ള ടൈംസ്റ്റാമ്പ്
  അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുന്നു, തുടർന്ന് ഓരോന്നും `deleteMemory()` വഴി
  ഇല്ലാതാക്കുന്നു (ഇത് sqlite-vec + Qdrant എന്നിവയിൽ നിന്ന് വെക്റ്ററുകളും നീക്കംചെയ്യുന്നു).

ട്രാൻസ്പോർട്ട്, സ്കോപ്പ് വിശദാംശങ്ങൾക്കായി [MCP-SERVER.md](./MCP-SERVER.md) കാണുക.

## ഡാഷ്ബോർഡ് (മെമ്മറി സ്റ്റുഡിയോ)

`src/app/(dashboard)/dashboard/memory/page.tsx` ഇപ്പോൾ ഒരു **3-ടാബ് സ്റ്റുഡിയോ** ആണ്:

### ടാബ്: മെമ്മറികൾ

- ആശയ കാർഡ് (ചുരുക്കാവുന്ന "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു" എന്ന വിശദീകരണം).
- തത്സമയ ലിസ്റ്റ്, തിരയൽ, പേജിനേഷൻ (300 ms ഡീബൗൺസ് ചെയ്തത്).
- തരം ഫിൽട്ടർ (`factual` / `episodic` / `procedural` / `semantic` / എല്ലാം).
- മെമ്മറി ചേർക്കുന്നതിനുള്ള മോഡൽ (കീ, ഉള്ളടക്കം, തരം).
- ഇൻലൈൻ എഡിറ്റ് (പെൻസിൽ ബട്ടൺ → `PUT /api/memory/[id]`).
- ഓരോ വരിയിലും ഇല്ലാതാക്കൽ (സ്ഥിരീകരണ ഡയലോഗോടുകൂടി).
- നിലവിലെ പേജിന്റെ JSON എക്സ്പോർട്ട്; ഫയൽ പിക്കർ വഴിയുള്ള JSON ഇമ്പോർട്ട്.
- സ്ഥിതിവിവര കാർഡുകൾ: `totalEntries`, `tokensUsed`, `hitRate`.
- "പഴയവ ചുരുക്കുക" ബട്ടൺ → `POST /api/memory/summarize` (ഡ്രൈ-റൺ ആദ്യം
  കാൻഡിഡേറ്റ് എണ്ണം കാണിക്കുന്നു, തുടർന്ന് സ്ഥിരീകരിക്കുന്നു).
- `GET /api/memory/health` നിയന്ത്രിക്കുന്ന പച്ച/ചുവപ്പ് ആരോഗ്യ സൂചക ബിന്ദു.

### ടാബ്: പ്ലേഗ്രൗണ്ട്

- ക്വറി ഇൻപുട്ട് + സ്ട്രാറ്റജി സെലക്ടർ (കൃത്യമായത് / സെമാന്റിക് / ഹൈബ്രിഡ്) + ടോക്കൺ ബജറ്റ്.
- "സിമുലേറ്റ് ചെയ്യുക" → `POST /api/memory/retrieve-preview` — `score`, `tier`,
  `tokens`, `vecScore`, `ftsScore` എന്നിവയുള്ള റാങ്ക് ചെയ്ത ഫലങ്ങൾ കാണിക്കുന്നു.
- ഏത് എംബെഡ്ഡിംഗ് സോഴ്സ് / വെക്റ്റർ സ്റ്റോർ ഉപയോഗിച്ചുവെന്നും ഒരു ഫാൾബാക്ക്
  സംഭവിച്ചോയെന്നും കാണിക്കുന്ന റെസല്യൂഷൻ പാനൽ.

### ടാബ്: എൻജിൻ

- എൻജിൻ സ്റ്റാറ്റസ് പാനൽ (കീവേഡ് FTS5 ചിപ്പ്, എംബെഡ്ഡിംഗ് ചിപ്പ്, വെക്റ്റർ സ്റ്റോർ ചിപ്പ്,
  Qdrant ഹെൽത്ത് ചിപ്പ്, റീറാങ്ക് ചിപ്പ്).
- "ഇപ്പോൾ വീണ്ടും ഇൻഡക്സ് ചെയ്യുക" ബട്ടൺ → `POST /api/memory/reindex`.
- എംബെഡ്ഡിംഗ് സോഴ്സ് സെലക്ടർ (ഓട്ടോ / റിമോട്ട് / സ്റ്റാറ്റിക് / ട്രാൻസ്ഫോർമേഴ്സ് + ടോഗിളുകൾ).
- Qdrant കോൺഫിഗ് കാർഡ് (പ്രവർത്തനക്ഷമമാക്കൽ ടോഗിൾ, ഹോസ്റ്റ്/പോർട്ട്/കളക്ഷൻ/കീ,
  കണക്ഷൻ പരിശോധന, സെമാന്റിക് തിരയൽ പരിശോധന, ക്ലീനപ്പ്).
- റീറാങ്ക് കോൺഫിഗ് കാർഡ് (പ്രവർത്തനക്ഷമമാക്കൽ ടോഗിൾ, പ്രൊവൈഡർ/മോഡൽ സെലക്ടർ).

ലെഗസി/ഗ്ലോബൽ ക്രമീകരണ ഇന്റർഫേസിനായി മെമ്മറി, Qdrant ക്രമീകരണങ്ങൾ
`/dashboard/settings → മെമ്മറിയും സ്കില്ലുകളും` (`MemorySkillsTab.tsx`) എന്നതിലും
ലഭ്യമാണ്.

## കാഷിംഗ്

`src/lib/memory/store.ts`, `getMemory(id)` റീഡുകൾക്കായി ഒരു ഇൻ-പ്രോസസ് LRU-സമാന
കാഷ് (`MEMORY_CACHE_TTL = 1 മിനിറ്റ്`, `MEMORY_MAX_CACHE_SIZE = 500`, ഏറ്റവും
പഴയതിൽ 20 % എവിക്ഷനോടുകൂടി) നിലനിർത്തുന്നു. കൂടാതെ, സ്വന്തമായി സ്കോപ്പ് ചെയ്ത
കാഷ് ആവശ്യമുള്ള കോളർമാർ ഉപയോഗിക്കുന്ന `get`/`set`/`invalidate` രീതികളുള്ള
ഒരു ജനറിക് കീ/വാല്യു `memoryCache` ലെയറും (`src/lib/memory/cache.ts`) ഉണ്ട്
(1 000-എൻട്രി LRU, ഡിഫോൾട്ട് TTL 5 മിനിറ്റ്).

## സ്വകാര്യതയും ജീവിതചക്രവും

- മെമ്മറിയുടെ ഉടമസ്ഥാവകാശം API കീ ഐഡിയുടേതാണ് (`chatCore.ts`-ലെ
  `resolveMemoryOwnerId`). `apiKeyInfo.id` ഇല്ലെങ്കിൽ വീണ്ടെടുക്കലോ ഇൻജക്ഷനോ
  എക്സ്ട്രാക്ഷനോ പ്രവർത്തിക്കില്ല.
- ഭാവിയിലെ `expires_at` ഉള്ള എൻട്രികൾ വീണ്ടെടുക്കലിൽ നിന്ന് ഫിൽട്ടർ ചെയ്യപ്പെടുന്നു;
  `retentionDays`-നപ്പുറമുള്ള പഴയ എൻട്രികൾ `retrieveMemories`-ലെ
  `created_at >= cutoff` ക്ലോസ് വഴി ഒഴിവാക്കപ്പെടുന്നു.
- ശാശ്വതമായി ഇല്ലാതാക്കുന്നതിന്, `DELETE /api/memory/[id]` അല്ലെങ്കിൽ `omniroute_memory_clear` ഉപയോഗിക്കുക.
- `setImmediate` വഴി എക്സ്ട്രാക്ഷൻ ഫയർ-ആൻഡ്-ഫോർഗെറ്റ് രീതിയിലാണ് നടക്കുന്നത്; പരാജയങ്ങൾ
  `memory.extraction.background.failed` എന്നതിന് കീഴിൽ ലോഗ് ചെയ്യപ്പെടുകയും ഒരിക്കലും കോളറിലേക്ക് എത്താതിരിക്കുകയും ചെയ്യുന്നു.
- വെരിഫിക്കേഷൻ റൗണ്ട്-ട്രിപ്പുകൾ (`verifyExtractionPipeline`) അവയുടെ സ്വന്തം
  ടെസ്റ്റ് എൻട്രികൾ ഒരു `finally` ബ്ലോക്കിൽ വൃത്തിയാക്കുന്നു.

## ഇതും കാണുക

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` ക്രമീകരണം മെമ്മറിയോടൊപ്പം ടൂൾ
  നിർവചനങ്ങളും ഇൻജക്റ്റ് ചെയ്യുന്നു.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ട്രാൻസ്പോർട്ട് / സ്കോപ്പുകൾ.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — വിപുലമായ API ഉപരിതലം.
- സോഴ്സ് മൊഡ്യൂളുകൾ:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ഹൈബ്രിഡ് RRF
  - `src/lib/memory/embedding/index.ts` — മൾട്ടി-സോഴ്സ് എംബെഡ്ഡിങ് ലെയർ
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — എല്ലാ മെമ്മറി API ബോഡികൾക്കുമുള്ള Zod സ്കീമകൾ
  - `src/shared/schemas/qdrant.ts` — Qdrant ക്രമീകരണങ്ങൾ/പ്രവർത്തനങ്ങൾക്കുള്ള Zod സ്കീമകൾ
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta`-യ്ക്കുള്ള CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + സബ്-റൂട്ടുകൾ
  - `src/app/(dashboard)/dashboard/memory/` — സ്റ്റുഡിയോ UI (പേജ് + ഘടകങ്ങൾ +
    ടാബുകൾ + ഹുക്കുകൾ)
  - `open-sse/handlers/chatCore.ts` (ഇൻജക്ഷൻ / എക്സ്ട്രാക്ഷൻ വയറിങ്)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## ഒരു എംബെഡ്ഡിങ് പ്രൊവൈഡറെ തിരഞ്ഞെടുക്കൽ (v3.8.16+)

OmniRoute-ന്റെ മെമ്മറി എഞ്ചിൻ **നാല് എംബെഡ്ഡിങ് സോഴ്സുകൾ** (`src/lib/memory/embedding/`) പിന്തുണയ്ക്കുന്നു. ഓരോന്നിനും **ലേറ്റൻസി, ചെലവ്, മോഡൽ ഗുണനിലവാരം, സജ്ജീകരണ സങ്കീർണ്ണത** എന്നിവയിൽ വ്യത്യസ്തമായ ഗുണദോഷങ്ങളുണ്ട്.

### എംബെഡ്ഡിങ് സോഴ്സുകൾ

| പ്രൊവൈഡർ       | സോഴ്സ്                                                  | ലേറ്റൻസി                              | ചെലവ്                   | ഗുണനിലവാരം                                    | സജ്ജീകരണം                                                |
| -------------- | ------------------------------------------------------- | ------------------------------------- | ----------------------- | --------------------------------------------- | -------------------------------------------------------- |
| `transformers` | ലോക്കൽ ONNX മോഡൽ (Xenova/all-MiniLM-L6-v2)              | ~50-150ms (CPU)                       | സൗജന്യം                 | നല്ലത്                                        | `npm install` മാത്രം                                     |
| `static`       | മുൻകൂട്ടി കണക്കാക്കിയ വെക്റ്ററുകൾ (കാഷ് ചെയ്തത്)        | <1ms                                  | സൗജന്യം                 | ബാധകമല്ല (കാഷ് ഹിറ്റിനെ ആശ്രയിച്ചിരിക്കുന്നു) | ഒന്നുമില്ല                                               |
| `remote`       | OpenAI / Cohere / Voyage API                            | ~100-300ms                            | $0.02-0.10/1M ടോക്കണുകൾ | മികച്ചത്                                      | API കീ                                                   |
| `auto`         | റൺടൈമിൽ ലഭ്യമായ ഏറ്റവും മികച്ച സോഴ്സ് തിരഞ്ഞെടുക്കുന്നു | തിരഞ്ഞെടുത്ത സോഴ്സിന് തുല്യം          | സൗജന്യം                 | തിരഞ്ഞെടുത്ത സോഴ്സിന് തുല്യം                  | ഒന്നുമില്ല                                               |
| _(cache)_      | ഏതൊരു സോഴ്സിനും മുകളിലുള്ള ഇൻ-മെമ്മറി LRU ലെയർ          | <1ms (ഹിറ്റ്), പൂർണ്ണ ലേറ്റൻസി (മിസ്) | സൗജന്യം                 | അടിസ്ഥാന സോഴ്സിന് തുല്യം                      | എപ്പോഴും പ്രവർത്തനക്ഷമം (തിരഞ്ഞെടുക്കാവുന്ന സോഴ്സ് അല്ല) |

### തീരുമാനവൃക്ഷം

```
                  നിങ്ങളുടെ വിന്യാസ സാഹചര്യം എന്താണ്?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  ഡെവ്/ടെസ്റ്റ്    ചെറിയ പ്രൊഡ്   വലിയ പ്രൊഡ്    എഡ്ജ് / ഓഫ്ലൈൻ
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (സൗജന്യം, API ഇല്ല)         (മികച്ച ഗുണനിലവാരം)  (ഇന്റർനെറ്റ് ഇല്ല)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            മുകളിൽ എല്ലായ്പ്പോഴും `cache` ലെയർ ചേർക്കുക
            (LruCache ഏതൊരു പ്രൊവൈഡറെയും റാപ്പ് ചെയ്യുന്നു)
```

### ഡാറ്റാബേസ് & API കോൺഫിഗറേഷൻ

മെമ്മറി എംബെഡ്ഡിങ് ഓപ്ഷനുകൾ എൻവയൺമെന്റ് വേരിയബിളുകൾ വഴിയല്ല, Settings API/UI വഴിയാണ് കോൺഫിഗർ ചെയ്യുന്നത്. Settings-ന് കീഴിലുള്ള പ്രസക്തമായ ക്രമീകരണ ഡാറ്റാബേസ് കീകൾ (`src/lib/memory/settings.ts`-ലെ `normalizeMemorySettings`) ഇവയാണ്:

- `memoryEmbeddingSource`: `"transformers"` (ലോക്കൽ), `"remote"` (API-അധിഷ്ഠിതം, ഉദാ. OpenAI), `"static"` (എക്സ്റ്റേണൽ സ്റ്റോർ), അല്ലെങ്കിൽ `"auto"`
- `memoryEmbeddingProviderModel`: റിമോട്ട്/സ്റ്റാറ്റിക് സോഴ്സുകൾക്കുള്ള മോഡൽ ഐഡന്റിഫയർ (ഉദാ., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, അല്ലെങ്കിൽ `"auto"`

#### ലോക്കൽ മോഡൽ (`transformers`)

ലോക്കൽ മോഡലുകൾ പ്രവർത്തിപ്പിക്കാൻ ആന്തരികമായി transformers.js ഉപയോഗിക്കുന്നു:

```bash
# കോഡിൽ വായിക്കുന്ന എൻവയൺമെന്റ് വേരിയബിളുകൾ (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF മോഡൽ റിപ്പോ
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF സ്റ്റാറ്റിക് പോഷൻ മോഡൽ
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # കാഷ് ഡയറക്ടറി
```

#### LRU എംബെഡ്ഡിങ് കാഷ്

കാഷ് ഡിഫോൾട്ടായി എപ്പോഴും പ്രവർത്തനക്ഷമമാണ്, കൂടാതെ എൻവയൺമെന്റ് വേരിയബിളുകൾ വഴി കോൺഫിഗർ ചെയ്യപ്പെടുന്നു:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # കാഷ് ചെയ്ത ഇനങ്ങളുടെ പരമാവധി എണ്ണം
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 മിനിറ്റ്)
```

### പ്രകടന കണക്കുകൾ

ഒരു സാധാരണ 4-core x86 സെർവറിലെ ബെഞ്ച്മാർക്ക് (ഓരോ ടെക്സ്റ്റിലും ~100 ടോക്കണുകൾ):

| ദാതാവ്               | p50   | p95   | p99   | 1M എംബെഡ്ഡിങ്ങുകൾക്കുള്ള ചെലവ്            |
| -------------------- | ----- | ----- | ----- | ----------------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | സൗജന്യം                                   |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large)        |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant ഹോസ്റ്റിംഗിനെ ആശ്രയിച്ചിരിക്കുന്നു |
| `cache` (ഹിറ്റ്)     | <1ms  | <1ms  | 2ms   | സൗജന്യം                                   |

---

## വസ്തുത വേർതിരിച്ചെടുക്കൽ പാറ്റേണുകൾ (v3.8.16+)

`extraction.ts` മൊഡ്യൂൾ (`src/lib/memory/extraction.ts`) സംഭാഷണ സന്ദേശങ്ങളിൽ നിന്ന് ഘടനാപരമായ വസ്തുതകൾ വേർതിരിച്ചെടുക്കാൻ **regex പാറ്റേൺ പൊരുത്തപ്പെടുത്തൽ** ഉപയോഗിക്കുന്നു. ഈ പാറ്റേണുകൾ മനസ്സിലാക്കുന്നത് നിങ്ങളുടെ ഉപയോഗ സാഹചര്യത്തിനനുസരിച്ച് വേർതിരിച്ചെടുക്കലിന്റെ ഗുണനിലവാരം ക്രമീകരിക്കാൻ സഹായിക്കുന്നു.

### ഡിഫോൾട്ട് പാറ്റേൺ വിഭാഗങ്ങൾ

| വിഭാഗം              | ഉദാഹരണ പാറ്റേൺ                                                                       | പിടിച്ചെടുക്കുന്നത്                |
| ------------------- | ------------------------------------------------------------------------------------ | ---------------------------------- |
| PREFERENCE_PATTERNS | `"ഞാൻ <X> തിരഞ്ഞെടുക്കുന്നു"`, `"എനിക്ക് <X> ഇഷ്ടമാണ്"`, `"ഞാൻ <X> വെറുക്കുന്നു"`    | ഉപയോക്തൃ മുൻഗണനകൾ                  |
| DECISION_PATTERNS   | `"ഞാൻ <X> ഉപയോഗിക്കും"`, `"ഞാൻ <X> ചെയ്യാൻ തീരുമാനിച്ചു"`, `"ഞാൻ <X> തിരഞ്ഞെടുത്തു"` | ഉപയോക്തൃ തീരുമാനങ്ങൾ (എപ്പിസോഡിക്) |
| PATTERN_PATTERNS    | `"ഞാൻ സാധാരണയായി <X>"`, `"ഞാൻ എപ്പോഴും <X>"`, `"ഞാൻ ഒരിക്കലും <X> ചെയ്യാറില്ല"`      | സ്ഥിരമായ പെരുമാറ്റ പാറ്റേണുകൾ      |

### ഉദാഹരണ പാറ്റേണുകൾ (ലളിതമാക്കിയത്)

```ts
// src/lib/memory/extraction.ts-ൽ നിന്ന്
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

### വേർതിരിച്ചെടുക്കപ്പെടുന്നത്

ഒരു ഉപയോക്താവ് ഇങ്ങനെ പറയുമ്പോൾ:

> "ഞാൻ TypeScript തിരഞ്ഞെടുക്കുന്നു. ഈ പ്രോജക്റ്റിനായി ഞാൻ Postgres ഉപയോഗിക്കും. push ചെയ്യുന്നതിന് മുമ്പ് ഞാൻ എപ്പോഴും commit ചെയ്യും. എനിക്ക് Python ഇഷ്ടമല്ല."
> വേർതിരിച്ചെടുക്കൽ 4 മെമ്മറികൾ സൃഷ്ടിക്കുന്നു:
>
> | കീ                                   | വിഭാഗം     | തരം      | ഉള്ളടക്കം                                  |
> | ------------------------------------ | ---------- | -------- | ------------------------------------------ |
> | `preference:typescript`              | preference | factual  | "TypeScript"                               |
> | `decision:postgres_for_this_project` | decision   | episodic | "ഈ പ്രോജക്റ്റിനായി Postgres"               |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "push ചെയ്യുന്നതിന് മുമ്പ് commit ചെയ്യുക" |
> | `preference:python`                  | preference | factual  | "Python"                                   |

### വേർതിരിച്ചെടുക്കൽ പരിധികൾ

അനിയന്ത്രിതമായ വേർതിരിച്ചെടുക്കൽ തടയാൻ, ഇനിപ്പറയുന്ന പരിധികൾ ബാധകമാണ്:

| ഉള്ളടക്കത്തിന്റെ കുറഞ്ഞ ദൈർഘ്യം | 3 പ്രതീകങ്ങൾ |
| ഉള്ളടക്കത്തിന്റെ പരമാവധി ദൈർഘ്യം | 500 പ്രതീകങ്ങൾ |

### വേർതിരിച്ചെടുക്കൽ എപ്പോൾ പ്രവർത്തനരഹിതമാക്കണം

മെമ്മറി പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോഴെല്ലാം വേർതിരിച്ചെടുക്കൽ സ്വയമേവ പ്രവർത്തിക്കും; വേർതിരിച്ചെടുക്കലിനായി മാത്രമുള്ള പ്രത്യേക ടോഗിൾ ഇല്ല. ഇത് ഓഫാക്കാൻ, `PUT /api/settings/memory` വഴി മെമ്മറി പൂർണ്ണമായും പ്രവർത്തനരഹിതമാക്കുക (`enabled: false`). ഇനിപ്പറയുന്ന സാഹചര്യങ്ങളിൽ അങ്ങനെ ചെയ്യുന്നത് പരിഗണിക്കുക:

- നിങ്ങൾക്ക് ഉയർന്ന സന്ദേശ വോളിയം ഉണ്ടായിരിക്കുകയും വേർതിരിച്ചെടുക്കലിന്റെ ചെലവ് അവഗണിക്കാനാകാത്തതുമായിരിക്കുമ്പോൾ
- നിങ്ങളുടെ സംഭാഷണങ്ങൾ ദീർഘകാല മൂല്യമില്ലാത്ത, കൂടുതലായും താൽക്കാലിക സ്വഭാവമുള്ളവയായിരിക്കുമ്പോൾ (ചാറ്റ്, ഡീബഗ്ഗിംഗ്)
- ഇഷ്ടാനുസൃത പ്ലഗിനുകൾ വഴി നിങ്ങൾ ഇതിനകം തന്നെ സന്ദർഭം പിടിച്ചെടുക്കുന്നുണ്ടെങ്കിൽ

---

## ഹൈബ്രിഡ് RRF ക്രമീകരണം (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** അൽഗോരിതം FTS5 (കീവേഡ്), വെക്റ്റർ (സെമാന്റിക്) ഫലങ്ങൾ സംയോജിപ്പിക്കുന്നു. താഴ്ന്ന റാങ്കിലുള്ള ഫലങ്ങൾക്ക് എത്രത്തോളം ഭാരം നൽകണമെന്ന് `k` പാരാമീറ്റർ നിയന്ത്രിക്കുന്നു.

### ഫോർമുല

ഓരോ കാൻഡിഡേറ്റ് മെമ്മറിക്കും, RRF സ്കോർ ഇതാണ്:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ഇവിടെ:

- `k` എന്നത് സ്ഥിരാങ്കമാണ് (ഡിഫോൾട്ട് 60)
- `rank_i(d)` എന്നത് i-ാമത്തെ വീണ്ടെടുക്കൽ സിസ്റ്റത്തിൽ (FTS, വെക്റ്റർ) ഡോക്യുമെന്റ് `d`-ന്റെ റാങ്കാണ്
- എല്ലാ വീണ്ടെടുക്കൽ സിസ്റ്റങ്ങളിലൂടെയും തുക കണക്കാക്കുന്നു

### `k` ഫലങ്ങളെ എങ്ങനെ ബാധിക്കുന്നു

| `k` മൂല്യം             | പ്രഭാവം                                                                                                             | ഏറ്റവും അനുയോജ്യം                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `k=0`                  | ശുദ്ധമായ റാങ്ക് ഫ്യൂഷൻ (സ്മൂത്തിംഗ് ഇല്ല)                                                                           | സൈദ്ധാന്തിക അടിസ്ഥാനനില                       |
| `k=10-30`              | മുൻനിര ഫലങ്ങൾക്ക് വലിയ ഭാരം നൽകുന്നു; താഴ്ന്ന റാങ്കുകളുടെ സംഭാവന വളരെ കുറവാണ്                                       | മുൻനിര-3 ഫലങ്ങൾ സാധാരണയായി ശരിയായിരിക്കുമ്പോൾ |
| **`k=60`** (ഡിഫോൾട്ട്) | സന്തുലിതം — മുൻനിര-10 ഫലങ്ങളെല്ലാം അർത്ഥവത്തായി സംഭാവന ചെയ്യുന്നു                                                   | പൊതുവായ ആവശ്യങ്ങൾക്കുള്ള വീണ്ടെടുക്കൽ         |
| `k=100+`               | കൂടുതൽ സമതലം — ഒന്നിലധികം സിസ്റ്റങ്ങളിൽ പ്രത്യക്ഷപ്പെട്ടാൽ താഴ്ന്ന റാങ്കിലുള്ള ഫലങ്ങൾക്കുപോലും ആധിപത്യം സ്ഥാപിക്കാം | recall > precision നിർണായകമായിരിക്കുമ്പോൾ     |

### പ്രായോഗികമായി `k` ക്രമീകരിക്കൽ

```bash
# ഡിഫോൾട്ട്
MEMORY_RRF_K=60

# ആക്രമണാത്മക precision (ചെറിയ മെമ്മറി, കുറച്ച് ഡോക്യുമെന്റുകൾ)
MEMORY_RRF_K=20

# പരമാവധി recall (വലിയ മെമ്മറി, വ്യത്യസ്ത ക്വറികൾ)
MEMORY_RRF_K=120
```

**`k=20` ഉപയോഗിച്ചുള്ള ഉദാഹരണം:**

- FTS റാങ്ക് 1 → സംഭാവന `1/21 = 0.048`
- FTS റാങ്ക് 10 → സംഭാവന `1/30 = 0.033`
- വെക്റ്റർ റാങ്ക് 1 → സംഭാവന `0.048`
- സംയോജിത പരമാവധി: `0.096`

**`k=60` ഉപയോഗിച്ചുള്ള ഉദാഹരണം:**

- FTS റാങ്ക് 1 → സംഭാവന `1/61 = 0.016`
- FTS റാങ്ക് 10 → സംഭാവന `1/70 = 0.014`
- വെക്റ്റർ റാങ്ക് 1 → സംഭാവന `0.016`
- സംയോജിത പരമാവധി: `0.033`

ഉയർന്ന `k` ഉപയോഗിക്കുമ്പോൾ, മുൻനിര-1-നും റാങ്ക്-10-നും ഇടയിലുള്ള **ആപേക്ഷിക വ്യത്യാസം** കുറവായിരിക്കും. അതിനാൽ മുൻനിര റാങ്കിലുള്ള ഫലത്തെക്കുറിച്ചുള്ള ആത്മവിശ്വാസത്തേക്കാൾ കൂടുതൽ **വീണ്ടെടുക്കൽ സിസ്റ്റങ്ങൾക്കിടയിലെ സമവായത്തെ** അൽഗോരിതം ആശ്രയിക്കുന്നു.

### `k` എപ്പോൾ മാറ്റണം

| ലക്ഷണം                                                    | പരീക്ഷിക്കാവുന്നത്                                                                                                |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| മുൻനിര ഫലം എപ്പോഴും വിജയിക്കുന്നു, പക്ഷേ അത് തെറ്റാണ്     | k **കുറയ്ക്കുക** (ഉദാ., 20) — മുൻനിര റാങ്കിലുള്ള ഫലത്തെക്കുറിച്ചുള്ള ആത്മവിശ്വാസത്തിന് കൂടുതൽ പ്രാധാന്യം ലഭിക്കും |
| ശരിയായ ഉത്തരം മുൻനിര-5-ലുണ്ട്, പക്ഷേ മുൻനിര-1-ലില്ല       | k **വർധിപ്പിക്കുക** (ഉദാ., 100) — കൂടുതൽ സമതലമായ സ്കോറിംഗ് സമവായത്തിന് പ്രതിഫലം നൽകുന്നു                          |
| Recall ഉയർന്നതാണെങ്കിലും precision കുറവാണ്                | k **കുറയ്ക്കുക** — റാങ്കിംഗ് കൂടുതൽ മൂർച്ചയുള്ളതാക്കുക                                                            |
| Recall കുറവാണ് (പ്രസക്തമായ ഡോക്യുമെന്റുകൾ നഷ്ടപ്പെടുന്നു) | k **വർധിപ്പിക്കുക** — താഴ്ന്ന റാങ്കിലുള്ള ഡോക്യുമെന്റുകൾക്ക് അവസരം നൽകുക                                          |

### RRF ഭാരനിർണ്ണയം

റെസിപ്രോക്കൽ റാങ്ക് ഫ്യൂഷൻ സെമാന്റിക് വെക്റ്റർ റാങ്കിനും ഫുൾ-ടെക്സ്റ്റ് തിരയൽ റാങ്കിനും തുല്യമായ ഭാരങ്ങൾ ഉപയോഗിക്കുന്നു:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

വ്യക്തിഗത ഭാരങ്ങൾ ക്രമീകരിക്കാൻ എൻവയോൺമെന്റ് വേരിയബിളുകളൊന്നുമില്ല (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` നിലവിലില്ല).

---

## സംഗ്രഹിക്കൽ തന്ത്രം (v3.8.16+)

സജീവ സെറ്റ് ചെറുതായി നിലനിർത്തിക്കൊണ്ട് ഓർമ്മ തിരിച്ചെടുക്കാനുള്ള കഴിവ് സംരക്ഷിക്കുന്നതിനായി `summarization.ts` മൊഡ്യൂൾ (`src/lib/memory/summarization.ts`) പഴയ മെമ്മറികളെ ചുരുക്കുന്നു.

### സംഗ്രഹിക്കൽ പ്രവർത്തനക്ഷമമാകുന്ന സമയം

| ട്രിഗർ                     | പരിധി (സ്ഥിരസ്ഥിതി) |
| -------------------------- | ------------------- |
| API വഴിയുള്ള മാനുവൽ ട്രിഗർ | ബാധകമല്ല            |

### സംഗ്രഹിക്കപ്പെടുന്നവ

`summarization.ts`-ൽ നിന്ന് രണ്ട് എൻട്രി പോയിന്റുകൾ എക്സ്പോർട്ട് ചെയ്യുന്നു:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — ഒരു സെഷനിലെ
  മെമ്മറികളെ, ടോക്കൺ ബജറ്റിനുള്ളിൽ പരിമിതപ്പെടുത്തിയ ഒരൊറ്റ സംഗ്രഹ ടെക്സ്റ്റാക്കി ചുരുക്കുന്നു.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API ഉപയോഗിക്കുന്ന
  പ്രായത്തെ അടിസ്ഥാനമാക്കിയുള്ള കോംപാക്ഷൻ: ഇത് `days`-നേക്കാൾ പഴക്കമുള്ള ഓരോ മെമ്മറിയും തിരഞ്ഞെടുക്കുകയും,
  അവയിൽ നിന്ന് ചുരുക്കിയ ഒരൊറ്റ സംഗ്രഹ മെമ്മറി സൃഷ്ടിക്കുകയും, (`dryRun` എന്നത് `false` ആയിരിക്കുമ്പോൾ)
  മൂല മെമ്മറികൾ ഇല്ലാതാക്കുകയും ചെയ്യുന്നു. ഒന്നും പരിഷ്കരിക്കാതെ സാധ്യതയുള്ള സെറ്റും മൊത്തം ടോക്കണുകളുടെ
  എണ്ണവും പ്രിവ്യൂ ചെയ്യാൻ `dryRun: true` നൽകുക.

ടാഗ്/കീ ക്ലസ്റ്ററിംഗ് പാസോ ഓരോ മെമ്മറിക്കും പ്രത്യേകം "core vs summarizable" സ്കോറിംഗോ ഇല്ല —
തിരഞ്ഞെടുക്കൽ പൂർണ്ണമായും പ്രായപരിധിയെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്; സംഗ്രഹ ടെക്സ്റ്റ് ഓരോ സാധ്യതയുള്ള
മെമ്മറിക്കും അതിന്റെ തരം പ്രിഫിക്സായി ചേർത്ത ഒരു ചുരുക്കിയ വരിയാണ്.

### സംഗ്രഹിക്കൽ ട്രിഗർ ചെയ്യുന്നത്

സംഗ്രഹിക്കൽ **മാനുവൽ / ഓപ്റ്റ്-ഇൻ** ആണ് — `autoSummarize` ക്രമീകരണം സ്ഥിരസ്ഥിതിയായി
`false` ആയതിനാൽ ഒന്നും സ്വയമേവ കോംപാക്റ്റ് ചെയ്യപ്പെടില്ല. API വഴി അത് ട്രിഗർ ചെയ്യുക:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

ഇത് പ്രവർത്തനരഹിതമായി നിലനിർത്താൻ, `autoSummarize` അതിന്റെ സ്ഥിരസ്ഥിതി മൂല്യമായ (`false`) നിലയിൽ തന്നെ വയ്ക്കുക.

### സംഗ്രഹത്തിന്റെ ഗുണനിലവാരം മെച്ചപ്പെടുത്താനുള്ള നിർദ്ദേശങ്ങൾ

- **ആദ്യം `dryRun` ഉപയോഗിച്ച് പ്രിവ്യൂ ചെയ്യുക** — `summarizeMemoriesOlderThan(..., true)` സാധ്യതയുള്ള
  മെമ്മറികളുടെ പട്ടികയും മൊത്തം ടോക്കണുകളുടെ എണ്ണവും നൽകുന്നു; അതിനാൽ മൂല മെമ്മറികൾ ഇല്ലാതാക്കുന്നതിന് മുമ്പ്
  ഏതൊക്കെയാണ് ലയിപ്പിക്കപ്പെടുകയെന്ന് സ്ഥിരീകരിക്കാം.
- **നിങ്ങൾക്ക് വലിയൊരു മെമ്മറി ശേഖരം ഉണ്ടെങ്കിൽ, ട്രാഫിക് കുറഞ്ഞ സമയങ്ങളിൽ സംഗ്രഹിക്കൽ പ്രവർത്തിപ്പിക്കുക** — LLM കോൾ ആണ് ഏറ്റവും കൂടുതൽ സമയമെടുക്കുന്ന ഭാഗം

```bash
# Cron-ശൈലി: ദിവസവും പുലർച്ചെ 3 മണിക്ക് സംഗ്രഹിക്കുക
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend പ്രൊവൈഡർ പാറ്റേൺ

> **ആധികാരിക ഉറവിടം:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **ടെസ്റ്റുകൾ:** `src/lib/memory/__tests__/generic-backend.test.ts`

നിലവിലുള്ള മെമ്മറി എഞ്ചിന് മുകളിൽ **പ്ലഗ് ചെയ്യാവുന്ന ബാക്കെൻഡ് അബ്സ്ട്രാക്ഷൻ ലെയർ** MemoryBackend പ്രൊവൈഡർ പാറ്റേൺ അവതരിപ്പിക്കുന്നു. ഒരൊറ്റ സ്റ്റോറേജ് ഇംപ്ലിമെന്റേഷനിൽ ബന്ധിതമായിരിക്കുന്നതിനുപകരം, കോൺഫിഗർ ചെയ്യാവുന്ന പ്രൈമറി/ഫാൾബാക്ക് റൂട്ടിംഗോടെ മെമ്മറി സിസ്റ്റം ഇപ്പോൾ ഒന്നിലധികം ബാക്കെൻഡുകളെ (SQLite, Obsidian, Notion, കസ്റ്റം HTTP ബാക്കെൻഡുകൾ) പിന്തുണയ്ക്കുന്നു.

### ആർക്കിടെക്ചർ

```
┌──────────────────────────────────────────────────────────┐
│                    API റൂട്ടുകൾ                            │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           സിംഗിൾടൺ ഓർക്കസ്ട്രേറ്റർ (manager.ts)             │
│                                                          │
│  പ്രൈമറി ──► ബാക്കെൻഡ് A  (ഉദാ. SQLite)                    │
│  ഫാൾബാക്ക് ─► ബാക്കെൻഡ് B  (ഉദാ. Obsidian)                  │
│             ബാക്കെൻഡ് C  (ഉദാ. GenericBackend വഴിയുള്ള Notion)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ ബാക്കെൻഡ്   │ │ ബാക്കെൻഡ്   │ │ ബാക്കെൻഡ് (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### കോർ ഇന്റർഫേസ് (`backend.ts`)

ഓരോ ബാക്കെൻഡും `MemoryBackend` ഇന്റർഫേസ് ഇംപ്ലിമെന്റ് ചെയ്യണം:

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

  // തിരയൽ
  search(config: SearchConfig): Promise<Memory[]>;

  // ആരോഗ്യനില
  health(): Promise<HealthCheckResult>;

  // ജീവിതചക്രം (ഐച്ഛികം)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

ഇനിപ്പറയുന്നവ നിർവഹിക്കുന്ന സിംഗിൾടൺ ഓർക്കസ്ട്രേറ്റർ:

- `register(backend)` വഴി ബാക്കെൻഡുകൾ **രജിസ്റ്റർ ചെയ്യുന്നു** — ബൂട്ട് സമയത്ത് `index.ts`-ൽ നിന്ന് വിളിക്കുന്നു
- `configure(primary, fallbacks)` വഴി പ്രൈമറി + ഫാൾബാക്ക് **കോൺഫിഗർ ചെയ്യുന്നു**
- പരാജയമുണ്ടാകുമ്പോൾ ഫാൾബാക്ക് ശൃംഖല ഉപയോഗിച്ച് CRUD/തിരയൽ പ്രൈമറിയിലേക്ക് **റൂട്ട് ചെയ്യുന്നു**
- എല്ലാ ബാക്കെൻഡുകളുടെയും **ആരോഗ്യനില ഇടയ്ക്കിടെ പരിശോധിക്കുന്നു**

**ഫാൾബാക്ക് പെരുമാറ്റം:**

| പ്രവർത്തനം | പ്രൈമറി                     | ഫാൾബാക്കുകൾ                  |
| ---------- | --------------------------- | ---------------------------- |
| `create`   | ✅ പ്രൈമറിയിൽ മാത്രം        | ❌                           |
| `get`      | ✅ ആദ്യം പ്രൈമറി ശ്രമിക്കുക | ✅ null ആണെങ്കിൽ ഫാൾബാക്ക്   |
| `update`   | ✅ പ്രൈമറിയിൽ മാത്രം        | ✅ ഫയർ-ആൻഡ്-ഫോർഗെറ്റ് സിങ്ക് |
| `delete`   | ✅ പ്രൈമറിയിൽ മാത്രം        | ✅ ഫയർ-ആൻഡ്-ഫോർഗെറ്റ് സിങ്ക് |
| `list`     | ✅ പ്രൈമറിയിൽ മാത്രം        | ❌                           |
| `search`   | ✅ ആദ്യം പ്രൈമറി            | ✅ പിശകുണ്ടായാൽ ഫാൾബാക്ക്    |

#### GenericMemoryBackend (`genericBackend.ts`)

ഏത് REST API-യെയും ഒരു MemoryBackend ആയി ക്രമീകരിക്കുന്ന ഒരു പൊതുവായ HTTP കണക്റ്റർ. ഇനിപ്പറയുന്നവയ്ക്ക് ഇത് പ്രയോജനകരമാണ്:

- **Notion** — Notion API വഴി കണക്റ്റ് ചെയ്യുക
- **Obsidian** — Obsidian Local REST API വഴി കണക്റ്റ് ചെയ്യുക
- **കസ്റ്റം ബാക്കെൻഡുകൾ** — RESTful മെമ്മറി API ലഭ്യമാക്കുന്ന ഏതൊരു സേവനവും

**കോൺഫിഗറേഷൻ:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // ബാക്കെൻഡ് API-യുടെ അടിസ്ഥാന URL
  apiKey?: string;           // പ്രാമാണീകരണത്തിനുള്ള Bearer ടോക്കൺ
  headers?: Record<string, string>;  // ഇഷ്ടാനുസൃത HTTP ഹെഡറുകൾ
  timeout?: number;          // അഭ്യർത്ഥനയുടെ സമയപരിധി (സ്ഥിരസ്ഥിതി: 30000ms)
  backendType?: string;      // ലോഗിങ്ങിനായി

  // എൻഡ്പോയിന്റ് അസാധുവാക്കലുകൾ (സ്ഥിരസ്ഥിതികൾ REST രീതികൾ ഉപയോഗിക്കുന്നു)
  endpoints?: {
    search?: string;   // സ്ഥിരസ്ഥിതി: "/memories/search"
    create?: string;   // സ്ഥിരസ്ഥിതി: "/memories"
    list?: string;     // സ്ഥിരസ്ഥിതി: "/memories"
    get?: string;      // സ്ഥിരസ്ഥിതി: "/memories/{id}"
    update?: string;   // സ്ഥിരസ്ഥിതി: "/memories/{id}"
    delete?: string;   // സ്ഥിരസ്ഥിതി: "/memories/{id}"
    health?: string;   // സ്ഥിരസ്ഥിതി: "/health"
  };

  // ക്വറി പാരാമീറ്റർ നാമ മാപ്പിങ്ങുകൾ
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // പാത്ത് പാരാമീറ്റർ നാമ മാപ്പിങ്ങുകൾ
  pathParams?: {
    id?/memoryId?
  };
}
```

**അറിയപ്പെടുന്ന ബാക്കെൻഡുകൾ** `KNOWN_BACKENDS`-ൽ മുൻകൂട്ടി കോൺഫിഗർ ചെയ്തിരിക്കുന്നു:

```typescript
createKnownBackend("obsidian"); // → localhost:27123-ലേക്ക് ചൂണ്ടുന്ന GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1-ലേക്ക് ചൂണ്ടുന്ന GenericMemoryBackend
```

#### അന്തർനിർമ്മിത ബാക്കെൻഡുകൾ

##### SQLiteBackend (`sqliteBackend.ts`)

സ്ഥിരസ്ഥിതി പ്രാഥമിക ബാക്കെൻഡ്. `src/lib/memory/store.ts` ഉപയോഗിക്കുന്ന നിലവിലുള്ള SQLite അധിഷ്ഠിത മെമ്മറി സ്റ്റോറിനെ പൊതിയുന്നു. ബൂട്ട് ചെയ്യുമ്പോൾ സ്വയമേവ രജിസ്റ്റർ ചെയ്യപ്പെടുന്നു.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

നിലവിലുള്ള Obsidian ഇന്റഗ്രേഷനെ (`src/lib/memory/obsidianBackend.ts`) പൊതിയുന്നു. Obsidian Local REST API വഴി ഒരു Obsidian വോൾട്ടിലേക്ക് കണക്റ്റ് ചെയ്യുന്നു.

### ക്രമീകരണങ്ങൾ

മെമ്മറി ബാക്കെൻഡ് ക്രമീകരണങ്ങൾ ആപ്പ് ക്രമീകരണ പട്ടികയിൽ സംഭരിക്കുകയും `src/lib/memory/settings.ts` വഴി നിയന്ത്രിക്കുകയും ചെയ്യുന്നു:

| ക്രമീകരണം           | എൻവ്/കോൺഫിഗ് കീ          | സ്ഥിരസ്ഥിതി | വിവരണം                                      |
| ------------------- | ------------------------ | ----------- | ------------------------------------------- |
| പ്രാഥമിക ബാക്കെൻഡ്  | `memoryPrimaryBackend`   | `"sqlite"`  | പ്രാഥമിക ബാക്കെൻഡിന്റെ ID                   |
| പകരം ബാക്കെൻഡുകൾ    | `memoryFallbackBackends` | `[]`        | ക്രമീകരിച്ച പകരം ബാക്കെൻഡ് ID-കൾ            |
| ബാക്കെൻഡ് കോൺഫിഗുകൾ | `memoryBackendConfigs`   | `{}`        | ഓരോ ബാക്കെൻഡിനുമുള്ള കോൺഫിഗ് അസാധുവാക്കലുകൾ |

ക്രമീകരണങ്ങൾ `normalizeMemorySettings()` വഴി സാധാരണവൽക്കരിക്കുകയും `getMemorySettings()`-ൽ കാഷ് ചെയ്യുകയും ചെയ്യുന്നു.

### ആരംഭിക്കൽ പ്രവാഹം

```
ആപ്പ് ബൂട്ട്സ്ട്രാപ്പ്
  → index.ts ഇമ്പോർട്ടുകൾ (സൈഡ് ഇഫക്റ്റ്): SQLiteBackend രജിസ്റ്റർ ചെയ്യുന്നു
  → ആപ്പ് ലൈഫ്സൈക്കിളിൽ നിന്ന് initMemoryBackends() വിളിക്കുന്നു:
      1. ക്രമീകരണങ്ങൾ ലോഡ് ചെയ്യുക (getMemorySettings)
      2. പ്രാഥമികം + പകരം എന്നിവ കോൺഫിഗർ ചെയ്യുക
      3. എല്ലാ ബാക്കെൻഡുകളും ആരംഭിക്കുക (ആരോഗ്യ പരിശോധന)
      4. അഭ്യർത്ഥനകൾക്ക് തയ്യാറാണ്
```

### ഒരു പുതിയ ബാക്കെൻഡ് ചേർക്കൽ

1. `src/lib/memory/<name>Backend.ts`-ൽ **`MemoryBackend` നടപ്പിലാക്കുക**
2. `src/lib/memory/index.ts`-ൽ നിന്ന് **എക്സ്പോർട്ട് ചെയ്യുക**
3. ബൂട്ട് ചെയ്യുമ്പോൾ `memoryManager.register(yourBackend)` ഉപയോഗിച്ച് **രജിസ്റ്റർ ചെയ്യുക**
4. ക്രമീകരണങ്ങളിലൂടെ **കോൺഫിഗർ ചെയ്യുക**: `memoryPrimaryBackend` നിങ്ങളുടെ ബാക്കെൻഡ് ID ആയി സജ്ജീകരിക്കുക
5. `src/lib/memory/__tests__/generic-backend.test.ts` റഫറൻസായി ഉപയോഗിച്ച് **പരിശോധിക്കുക**

#### ഉദാഹരണം: Brain ബാക്കെൻഡ്

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

### സ്ഥിരീകരണം

#### യൂണിറ്റ് ടെസ്റ്റുകൾ

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

പ്രതീക്ഷിക്കുന്ന ഔട്ട്പുട്ട്: താഴെപ്പറയുന്നവ ഉൾക്കൊള്ളുന്ന **35 ടെസ്റ്റുകൾ, എല്ലാം വിജയിക്കുന്നു**:

- കൺസ്ട്രക്ടർ (2)
- ആരോഗ്യ പരിശോധന (4) — വിജയം, പരാജയം 500, നെറ്റ്വർക്ക് പിശക്, ലേറ്റൻസി
- ആരംഭിക്കൽ (2) — വിജയം, പരാജയം
- സൃഷ്ടിക്കൽ (2) — സ്ഥിരസ്ഥിതി എൻഡ്പോയിന്റ്, ഇഷ്ടാനുസൃത എൻഡ്പോയിന്റ്
- നേടൽ (4) — വിജയം, 404 → null, 404 അല്ലാത്തപ്പോൾ എറിഞ്ഞുകളയുക, ഇഷ്ടാനുസൃത പാത്ത് പാരാമീറ്ററുകൾ
- അപ്ഡേറ്റ് (2) — വിജയം, 404 → false
- ഇല്ലാതാക്കൽ (2) — വിജയം, 404 → false
- ലിസ്റ്റ് (2) — ക്വറി പാരാമീറ്ററുകൾ, ഇഷ്ടാനുസൃത പാരാമീറ്റർ നാമങ്ങൾ
- തിരയൽ (3) — ക്വറി പാരാമീറ്ററുകൾ, ഇഷ്ടാനുസൃത എൻഡ്പോയിന്റ്, ഓപ്ഷനുകളുടെ സീരിയലൈസേഷൻ
- പ്രാമാണീകരണ ഹെഡറുകൾ (2) — Bearer ടോക്കൺ, ഇഷ്ടാനുസൃത ഹെഡറുകൾ
- ഫാക്ടറി (1)

#### ടൈപ്പ് പരിശോധന

```bash
npm run typecheck:core
```

പ്രതീക്ഷിക്കുന്നത്: **0 പിശകുകൾ**.
