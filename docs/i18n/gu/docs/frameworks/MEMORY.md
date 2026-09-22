# Memory System (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **સત્યનો સ્રોત:** `src/lib/memory/` અને `src/app/api/memory/`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40 (ડિફૉલ્ટ રૂપે બંધ + int8 ક્વૉન્ટાઇઝેશન કૅચ-અપ)

OmniRoute API કી (અને વૈકલ્પિક રીતે સેશન id) દ્વારા નિર્ધારિત સતત વાર્તાલાપ મેમરી પ્રદાન કરે છે. હળવા regex પૅટર્ન મૅચિંગ દ્વારા LLM પ્રતિસાદોમાંથી મેમરીઓ આપમેળે કાઢવામાં આવે છે અને અનુગામી વિનંતીઓમાં અગ્રણી સિસ્ટમ સંદેશ તરીકે (અથવા સિસ્ટમ ભૂમિકાને નકારતા પ્રદાતાઓ માટે પ્રથમ વપરાશકર્તા સંદેશ તરીકે) ફરીથી દાખલ કરવામાં આવે છે.

> **મેમરી ડિફૉલ્ટ રૂપે બંધ છે (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> હવે `false` છે (`src/lib/memory/settings.ts`). મેમરી સક્ષમ કરવાથી મેળવેલા સંદર્ભના
> `maxTokens` (~2k) સુધીનો ભાગ **દરેક** ચૅટ વિનંતીમાં દાખલ થાય છે, જેના માટે
> શુલ્ક લાગે છે — નવા ઇન્સ્ટોલેશન અને પોતાનો સંદર્ભ સંચાલિત કરતા ક્લાયન્ટ માટે
> આ એક અણધાર્યો ખર્ચ છે. **Settings → Memory** હેઠળ સ્પષ્ટ રીતે ઑપ્ટ ઇન કરો
> (`MemorySkillsTab` મેમરી સક્ષમ હોય ત્યારે ટોકન-ખર્ચની ચેતવણી દર્શાવે છે).
> ક્લાયન્ટ `x-omniroute-no-memory` વિનંતી હેડર (`true`/`1`/`yes`) વડે
> કોઈ એક વિનંતીને ઑપ્ટ આઉટ કરી શકે છે — [API_REFERENCE.md](../reference/API_REFERENCE.md)
> માં વિનંતી-હેડર કોષ્ટક જુઓ. મેમરી વિનાની વિનંતી
> `memoryOwnerId = null` સેટ કરે છે, જે તે વિનંતી માટે મેમરી અને કૌશલ્ય
> ઇન્જેક્શન **બંને** અક્ષમ કરે છે
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

મેમરી **API કી દીઠ વ્યાપ્ત** છે, વપરાશકર્તા દીઠ નહીં — સમાન API કી વડે પ્રમાણિત થયેલી દરેક વિનંતી સમાન મેમરી પૂલ શેર કરે છે, જેમાં `sessionId` દ્વારા વધુ વૈકલ્પિક વ્યાપ નિર્ધારિત કરી શકાય છે.

## આર્કિટેક્ચર

```
ક્લાયન્ટ → /v1/chat/completions (apiKeyInfo અપસ્ટ્રીમ પર ઉકેલાયેલ)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id કાઢે છે
    → getMemorySettings()                     # કૅશ કરેલી સેટિંગ્સ
    → shouldInjectMemory(body, {enabled})     # ગેટ
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + વૈકલ્પિક વેક્ટર
    → injectMemory(body, memories, provider)  # સિસ્ટમ અથવા વપરાશકર્તા સંદેશ
  → અપસ્ટ્રીમ પ્રદાતાને કૉલ
  → પ્રતિસાદ પર: extractFacts(text, apiKeyId, sessionId)  # અવરોધ ન કરતું
    → setImmediate → દરેક મૅચ માટે createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

ઇન્જેક્શન અને એક્સટ્રૅક્શન કૉલ-સાઇટ્સ
`open-sse/handlers/chatCore.ts` માં જોડાયેલાં છે (`retrieveMemories`, `injectMemory`,
અને `extractFacts` શોધો).

## એન્જિન આર્કિટેક્ચર (3-સ્તરીય રિઝોલ્યુશન)

મેમરી એન્જિન ઉપલબ્ધ ઇન્ફ્રાસ્ટ્રક્ચર અને સેટિંગ્સના આધારે રનટાઇમ પર પુનઃપ્રાપ્તિ પાથ નક્કી કરે છે. અગ્રતા ક્રમમાં લાગુ થતાં ત્રણ સ્તર ઉપલબ્ધ છે:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  સ્તર 0 — કીવર્ડ (FTS5)                                      │
  │  પ્રોબ-આધારિત ઉપલબ્ધતા: જ્યારે SQLite બિલ્ડ તેને            │
  │  સપોર્ટ કરે ત્યારે FTS5 (better-sqlite3 / node:sqlite /      │
  │  bun:sqlite); FTS5 વિનાના બિલ્ડ્સમાં અનુપલબ્ધ (દા.ત.        │
  │  sql.js/WASM — "no such module: fts5"). strategy = "exact"  │
  │  હોય ત્યારે અથવા ફૉલબૅક તરીકે વપરાય છે; engine-status       │
  │  keyword પ્રોબનું પરિણામ દર્શાવે છે.                         │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  સ્તર 1 — એમ્બેડેડ વેક્ટર (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 ને db.loadExtension() દ્વારા લોડ કરાય છે. │
  │  Float32 વેક્ટર્સ પર KNN બ્રૂટ-ફોર્સ. આ શરતોમાં સક્રિય:      │
  │   • sqlite-vec loadExtension સફળ થાય                         │
  │   • એવો એમ્બેડિંગ સ્રોત ઉપલબ્ધ હોય (remote | static |       │
  │     transformers) જે Float32Array બનાવી શકે                  │
  │   • vec_memories કોષ્ટક અસ્તિત્વમાં હોય (પ્રથમ ready() પર   │
  │     બનાવવામાં આવે છે)                                        │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  સ્તર 2 — Qdrant (ઑપ્ટ-ઇન બાહ્ય વેક્ટર ડેટાબેઝ)              │
  │  સક્ષમ હોય ત્યારે semantic/hybrid માટે sqlite-vec ને બદલે છે.│
  │  ચાલુ Qdrant ઇન્સ્ટન્સ + રૂપરેખાંકિત host/port જરૂરી છે.     │
  └─────────────────────────────────────────────────────────────┘
```

અધોગતિ આપમેળે અને પારદર્શક રીતે થાય છે:

- જો sqlite-vec લોડ થવામાં નિષ્ફળ જાય, તો સ્તર 1 અનુપલબ્ધ બને છે → સ્તર 0 પર ફૉલબૅક થાય છે.
- જો એમ્બેડિંગ સ્રોત ભૂલ પરત કરે, તો સ્તર 1 સ્તર 0 પર ફૉલબૅક થાય છે.
- જો Qdrant અસ્વસ્થ હોય, તો સ્તર 2 સ્તર 1 પર ફૉલબૅક થાય છે (અથવા જો સ્તર 1
  પણ અનુપલબ્ધ હોય તો સ્તર 0 પર).

## એમ્બેડિંગ સ્રોતો

એમ્બેડિંગ લેયર (`src/lib/memory/embedding/`) `MemorySettingsExtended.embeddingSource`ના આધારે કયો સ્રોત ઉપયોગમાં લેવો તે નક્કી કરે છે:

| સ્રોત          | વર્ણન                                                                            | કી જરૂરી છે  | કોલ્ડ સ્ટાર્ટ    |
| -------------- | -------------------------------------------------------------------------------- | ------------ | ---------------- |
| `remote`       | ગોઠવેલા પ્રદાતાના એમ્બેડિંગ APIનો ઉપયોગ કરે છે (OpenAI, Cohere વગેરે)            | હા           | કોઈ નહીં         |
| `static`       | `potion-base-8M` મારફતે સ્થાનિક લુકઅપ-ટેબલ એમ્બેડિંગ (WordPiece + સરેરાશ પૂલિંગ) | ના           | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` મારફતે સ્થાનિક ONNX અનુમાન    | ના           | ~3s + ~400MB RAM |
| `auto`         | રનટાઇમ નિરાકરણ: remote (જો કી અસ્તિત્વમાં હોય) → static → transformers → null    | આધાર રાખે છે | આધાર રાખે છે     |

**`auto` માટે નિરાકરણ ક્રમ:**

1. `listEmbeddingProviders()`માં `hasKey === true` ધરાવતો પ્રથમ પ્રદાતા શોધો → `remote`.
2. જો `settings.staticEnabled === true` હોય → `static`.
3. જો `settings.transformersEnabled === true` હોય → `transformers`.
4. અન્યથા → `null` (FTS5 કીવર્ડ શોધ પર અવક્રમિત થાય છે).

એમ્બેડિંગ કૅશ (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` દ્વારા કી કરાયેલ ઇન-મેમરી LRU મેપનો ઉપયોગ કરે છે, જે વધુમાં વધુ `MEMORY_EMBEDDING_CACHE_MAX` એન્ટ્રીઓ (ડિફૉલ્ટ 1000) સુધી મર્યાદિત છે અને જેનો TTL `MEMORY_EMBEDDING_CACHE_TTL_MS` (ડિફૉલ્ટ 5 મિનિટ) છે. દરેક પ્રોસેસ જીવનચક્ર દરમિયાન બધા કૉલર્સ વચ્ચે વહેંચાયેલું રહે છે.

## હાઇબ્રિડ RRF (k=60)

જ્યારે `strategy = "hybrid"` હોય અને વેક્ટર સ્ટોર ઉપલબ્ધ હોય, ત્યારે પુનઃપ્રાપ્તિ FTS5 અને વેક્ટર પરિણામોને મર્જ કરવા માટે Reciprocal Rank Fusionનો ઉપયોગ કરે છે:

```
RRF(d) = Σ  1 / (k + rank_i(d))      જ્યાં k = 60 (MEMORY_RRF_K મારફતે ગોઠવી શકાય છે)
          i
```

વિશેષરૂપે:

1. FTS5 શોધ ચલાવો → ક્રમાંકિત સૂચિ `R_fts` (સ્થાન 1..N).
2. KNN વેક્ટર શોધ ચલાવો → ક્રમાંકિત સૂચિ `R_vec` (સ્થાન 1..M).
3. દરેક અનન્ય `memoryId` માટે:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (સૂચિમાં ન હોય તો 0).
4. `rrf_score` પ્રમાણે DESC ક્રમમાં ગોઠવો, ટોકન બજેટ વૉક લાગુ કરો.

વિષમજાતીય પુનઃપ્રાપ્તિ સિસ્ટમોમાં સ્કોર સામાન્યીકરણની જરૂર વિના RRF અસરકારક હોવાનું સુવિખ્યાત છે. ડિફૉલ્ટ `k=60` મૂળ Cormack et al. પેપરમાંથી લેવામાં આવ્યું છે અને નાના કોર્પોરા (<10k સ્મૃતિઓ) માટે સારી રીતે કાર્ય કરે છે.

## બૅકફિલ (લેઝી + રીઇન્ડેક્સ)

જ્યારે એમ્બેડિંગ મોડલ બદલાય છે (`embedding_signature` મારફતે શોધાય છે), ત્યારે વેક્ટર સ્ટોર ફરીથી બનાવવામાં આવે છે અને બધી હાલની સ્મૃતિઓને `memories` ટેબલમાં `needs_reindex = 1` તરીકે ચિહ્નિત કરવામાં આવે છે.

**લેઝી બૅકફિલ**: આગામી પુનઃપ્રાપ્તિ વખતે, વેક્ટર એન્ટ્રી ન ધરાવતી કોઈપણ સ્મૃતિને એમ્બેડ કરીને શોધ ચાલે તે પહેલાં `vec_memories`માં દાખલ કરવામાં આવે છે. આ સ્ટાર્ટઅપને અવરોધ્યા વિના વાસ્તવિક વિનંતીઓમાં બૅકફિલ ખર્ચ વહેંચે છે.

**સ્પષ્ટ રીઇન્ડેક્સ**: `/dashboard/memory`માં આવેલ Engine ટૅબ `POST /api/memory/reindex`ને કૉલ કરતું "હમણાં રીઇન્ડેક્સ કરો" બટન પ્રદાન કરે છે. હૅન્ડલર `src/lib/memory/reindex.ts`માંથી `runReindexBatch()`ને કૉલ કરે છે, જે દરેક વિનંતી દીઠ વધુમાં વધુ `limit` બાકી એન્ટ્રીઓની પ્રક્રિયા કરે છે. પ્રગતિ માટે `GET /api/memory/engine-status` (`vectorStore.needsReindex`) મારફતે પોલ કરી શકાય છે.

`memory_vec_meta` ટેબલ (માઇગ્રેશન `083_memory_vec.sql`) આ સંગ્રહિત કરે છે:

- `active_dim` — વર્તમાન વેક્ટર પરિમાણ (null = હજી સુધી કૅલિબ્રેટ કરાયેલ નથી).
- `embedding_signature` — ફેરફારો શોધવા માટે ઉપયોગમાં લેવાતું `${source}:${model}:${dim}`.
- `last_reset_at` — છેલ્લા સંપૂર્ણ રીસેટનો ટાઇમસ્ટૅમ્પ.
- `vec_loaded` — sqlite-vec સફળતાપૂર્વક લોડ થયું હતું કે નહીં તે દર્શાવતો 0/1 ફ્લૅગ.

## સેટિંગ્સ એક્સ્ટેન્શન

`MemorySettingsExtended`માં નવ embedding અને vector ફીલ્ડ ઉપલબ્ધ છે, જે
`src/shared/schemas/memory.ts`માં છે અને `src/lib/db/settings.ts` દ્વારા કાયમી રીતે સંગ્રહિત થાય છે:

| ફીલ્ડ                    | પ્રકાર                                             | ડિફૉલ્ટ  | વર્ણન                                                        |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | કયા embedding સ્રોતનો ઉપયોગ કરવો                             |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ફોર્મેટમાં provider/model                   |
| `customBaseUrl`          | `string \| null`                                   | `null`   | માત્ર Memory માટેનો OpenAI-સુસંગત endpoint base URL          |
| `customModelId`          | `string \| null`                                   | `null`   | કસ્ટમ endpointને મોકલવામાં આવતું model ID                    |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js માટે સ્વૈચ્છિક સક્રિયકરણ (MiniLM, ~400MB)    |
| `staticEnabled`          | `boolean`                                          | `false`  | સ્થાનિક static potion-base-8M model માટે સ્વૈચ્છિક સક્રિયકરણ |
| `rerankEnabled`          | `boolean`                                          | `false`  | reranking પગલું સક્રિય કરો (દર વિનંતીએ +200-500ms ઉમેરે છે)  |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ફોર્મેટમાં rerank provider/model            |

`rerankProviderModel`નું નિરાકરણ `POST /v1/rerank` દ્વારા થાય છે (જેને loopback મારફતે કૉલ કરવામાં આવે છે), તેથી તે route સ્વીકારે તેવી કોઈપણ વસ્તુ સ્વીકારે છે: ક્યુરેટ કરેલું cloud rerank model (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) અથવા `<node-prefix>/<model>` તરીકે OpenAI-સુસંગત provider node (દા.ત. TEI/Infinity box માટે `skilled-mini/bge-reranker-v2-m3`). Loopback nodes હંમેશાં પાત્ર હોય છે; બીજા host (LAN, Tailscale) પરના node માટે વધુમાં `RERANK_REMOTE_PROVIDER_NODES` feature flag જરૂરી છે અને તેણે provider outbound URL policy પસાર કરવી આવશ્યક છે — [Feature Flags](../reference/FEATURE_FLAGS.md) જુઓ. Dashboard selector ક્યુરેટ કરેલા providers ઉપરાંત સ્થાનિક nodesની યાદી દર્શાવે છે; કોઈપણ માન્ય `provider/model` stringને `PUT /api/settings/memory` દ્વારા સીધી સેટ કરી શકાય છે.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | કયા vector backendનો ઉપયોગ કરવો |

આ `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`) દ્વારા ઉપલબ્ધ કરાવવામાં આવે છે.

`remote` સ્રોત માટે, Memory વૈકલ્પિક `customBaseUrl` અને
`customModelId` સેટિંગ્સ પણ સ્વીકારે છે. બંને સાથે મળીને વૈશ્વિક embedding registry બદલ્યા વિના OpenAI-સુસંગત `/embeddings`
endpoint અને model પસંદ કરે છે. ઉપયોગ પહેલાં endpointને
સામાન્યીકૃત કરવામાં આવે છે અને provider outbound URL policy દ્વારા તપાસવામાં આવે છે: HTTP(S)
આવશ્યક છે, એમ્બેડ કરેલા credentials અને query strings નકારવામાં આવે છે, અને cloud-metadata
addresses અવરોધિત જ રહે છે. ખાલી મૂલ્યો પસંદ કરેલા registry providerને જાળવી રાખે છે. Dashboardને
પાછી મોકલાતી errorsને સુરક્ષિત બનાવવામાં આવે છે અને endpoint credentials ક્યારેય log કરવામાં આવતા નથી.

> **TODO (D20):** `global` scope (બધી API keys વચ્ચે memories શેર કરવી) આ
> releaseમાં અમલમાં મૂકવામાં આવી નથી. તેના માટે schemaમાં ફેરફારો અને વૈશ્વિક retrieval
> path જરૂરી છે. તેને અલગથી ટ્રૅક કરો.

## સ્ટોરેજ સ્તરો

### પ્રાથમિક: SQLite (`memories` ટેબલ)

માઇગ્રેશન `015_create_memories.sql` દ્વારા બનાવવામાં આવેલ:

| કૉલમ                        | પ્રકાર             | નોંધો                                                                          |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` દ્વારા જનરેટ થયેલ UUID                                   |
| `api_key_id`                | `TEXT NOT NULL`    | માલિકીની API કી                                                                |
| `session_id`                | `TEXT`             | વૈકલ્પિક પ્રતિ-વાતચીત સ્કોપ                                                    |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` પૈકી એક                        |
| `key`                       | `TEXT`             | સ્થિર અપસર્ટ કી, દા.ત. `preference:i_prefer_python`                            |
| `content`                   | `TEXT NOT NULL`    | વાસ્તવિક હકીકતનું ટેક્સ્ટ                                                      |
| `metadata`                  | `TEXT`             | JSON બ્લૉબ (શ્રેણી, extractedAt, સ્રોત, ...)                                   |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 સ્ટ્રિંગ્સ                                                            |
| `expires_at`                | `TEXT`             | વૈકલ્પિક સમાપ્તિ; `NULL`નો અર્થ કાયમી                                          |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowidsને જોડવા માટે `023_fix_memory_fts_uuid.sql` દ્વારા ઉમેરાયેલ |

ઇન્ડેક્સ: `api_key_id`, `session_id`, `type`, `expires_at`, ઉપરાંત અનન્ય
`memory_id` ઇન્ડેક્સ.

**અપસર્ટ સિમેન્ટિક્સ**: `createMemory()` સમાન `(api_key_id, key)` ધરાવતી
હાલની પંક્તિ શોધે છે અને મળે ત્યારે તેને તેના સ્થાને અપડેટ કરે છે (`metadata`ને
શેલો સ્પ્રેડ દ્વારા મર્જ કરીને). આ પુનરાવર્તિત પસંદગી નિવેદનોને કારણે ટેબલને
અમર્યાદિત રીતે વધતું અટકાવે છે.

### પૂર્ણ-ટેક્સ્ટ શોધ (`memory_fts` વર્ચ્યુઅલ ટેબલ)

`022_add_memory_fts5.sql`, `content` અને `key` પર FTS5 વર્ચ્યુઅલ ટેબલ બનાવે છે.
`023_fix_memory_fts_uuid.sql` વાસ્તવિક ઉપયોગમાં આવતી એવી બગ સુધારે છે જ્યાં UUID
પ્રાથમિક કી FTS5ના પૂર્ણાંક rowid સાથે જોડાતી નહોતી — માઇગ્રેશન `memory_id`
કૉલમ ઉમેરે છે, FTS ટેબલને ફરી બનાવે છે અને એવા ટ્રિગર્સ
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ગોઠવે છે, જે INSERT, DELETE
અને UPDATE વખતે FTSને સમન્વયિત રાખે છે.

`semantic` અને `hybrid` વ્યૂહરચનાઓ માટે `retrieval.ts` દ્વારા ઉપયોગમાં લેવાય છે
(નીચે જુઓ). પુનઃપ્રાપ્તિ કોડ `hasTable("memory_fts")` વડે સુરક્ષા તપાસ કરે છે અને
જો FTS ટેબલ ગેરહાજર હોય અથવા FTS ક્વેરીમાં ભૂલ આવે, તો કાલક્રમિક ક્રમ પર પાછો
ફરે છે.

### વૈકલ્પિક: Qdrant (વેક્ટર સ્ટોર ટિયર 2)

`src/lib/memory/qdrant.ts` ટિયર 2 વેક્ટર સ્ટોર તરીકે વૈકલ્પિક Qdrant સંકલન
અમલમાં મૂકે છે. પુનઃપ્રાપ્તિ ફક્ત ત્યારે જ Qdrant તરફ રૂટ થાય છે જ્યારે એન્જિન
પસંદગીકાર `memoryVectorStore === "qdrant"` હોય — ડિફૉલ્ટ `"auto"` (અને
`"sqlite-vec"`) Qdrantને **ક્યારેય** પસંદ કરતા નથી. Engine ટૅબનું ટૉગલ
`qdrantEnabled` અને `memoryVectorStore` **બંનેને** એકસાથે સેટ કરે છે: સક્ષમ
કરવાથી Qdrant પ્રાથમિક સ્ટોર બને છે અને અક્ષમ કરવાથી તે `"auto"` પર રીસેટ થાય
છે (#5597 — તે સુધારા પહેલાં, સક્ષમ કરવું નિષ્ક્રિય રહેતું હતું કારણ કે કંઈપણ
એન્જિન પસંદગીકારમાં લખતું નહોતું). જો Qdrant સુધી પહોંચી ન શકાય અથવા તે કંઈ
પરત ન કરે, તો પુનઃપ્રાપ્તિ sqlite-vec → FTS5 પર પાછી ફરે છે.

- `upsertSemanticMemoryPoint()` — ગોઠવેલ એમ્બેડિંગ મૉડલ સાથે `key + content`
  એમ્બેડ કરે છે, કલેક્શન અસ્તિત્વમાં છે તેની ખાતરી કરે છે (પ્રથમ ઉપયોગ વખતે
  કોસાઇન-ડિસ્ટન્સ વેક્ટર્સ બનાવે છે) અને પેલોડ `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` સાથે પૉઇન્ટ અપસર્ટ કરે છે.
- `searchSemanticMemory(query, topK, scope)` — ક્વેરી એમ્બેડ કરે છે, `kind = "omniroute_memory"`
  દ્વારા ફિલ્ટર કરેલા કલેક્શનમાં શોધ કરે છે અને વૈકલ્પિક રીતે `apiKeyId` /
  `sessionId` દ્વારા પણ ફિલ્ટર કરે છે. `topK`ને `[1, 20]` સુધી મર્યાદિત કરે છે.
- `deleteSemanticMemoryPoint(id)` — એક પૉઇન્ટ કાઢી નાખે છે. SQLite પંક્તિ દૂર
  થયા પછી `deleteMemory()` દ્વારા કૉલ થાય છે (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — એવા પૉઇન્ટ્સને સામૂહિક રીતે
  કાઢી નાખે છે જેમનું `expiresAtUnix` ભૂતકાળમાં છે અથવા જેમનું `createdAtUnix`
  જાળવણીની અંતિમ મર્યાદા કરતાં જૂનું છે. પહેલાં ગણતરી કરે છે જેથી ડૅશબોર્ડ
  વાસ્તવિક સંખ્યાઓ બતાવી શકે.
- `checkQdrantHealth()` — લેટન્સી સાથે `GET /readyz` હેલ્થ પ્રોબ.

સેટિંગ્સ UI, `/dashboard/memory`ના **Engine ટૅબ**માં Qdrant કૉન્ફિગ, હેલ્થ ચેક,
સિમેન્ટિક શોધ પરીક્ષણ અને ક્લીનઅપ ઉપલબ્ધ કરાવે છે. `src/app/api/settings/qdrant/`
હેઠળના સંબંધિત રૂટ્સ v3.8.6થી સંપૂર્ણપણે જોડાયેલા છે:

| રૂટ                                     | પદ્ધતિ        | વર્ણન                             |
| --------------------------------------- | ------------- | --------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant સેટિંગ્સ વાંચો / અપડેટ કરો |
| `/api/settings/qdrant/health`           | `GET`         | જીવંતતા પ્રોબ + લેટન્સી           |
| `/api/settings/qdrant/search`           | `POST`        | સિમેન્ટિક શોધ પરીક્ષણ             |
| `/api/settings/qdrant/cleanup`          | `POST`        | સમાપ્ત / જૂના પૉઇન્ટ્સ દૂર કરો    |
| `/api/settings/qdrant/embedding-models` | `GET`         | ઉપલબ્ધ એમ્બેડિંગ મૉડલ્સની યાદી    |

**વર્તન સંબંધિત નોંધો (શું અપેક્ષા રાખવી):**

- **એન્જિન પસંદગી** — Engine ટૅબમાં Qdrant સક્ષમ કરવાથી તે પ્રાથમિક
  સ્ટોર બને છે (`memoryVectorStore="qdrant"` સેટ કરે છે); અક્ષમ કરવાથી તે ફરી `"auto"` પર સેટ થાય છે (#5597).
- **બૅક-ફિલ નહીં** — Qdrant સક્ષમ કર્યા **પછી** બનાવેલી/અપડેટ કરેલી મેમરીઓ જ
  તેમાં લખાય છે (ફાયર-ઍન્ડ-ફરગેટ ડ્યુઅલ-રાઇટ). પહેલેથી અસ્તિત્વમાં રહેલી SQLite મેમરીઓ
  માઇગ્રેટ થતી **નથી**; "Reindex Now" ફક્ત sqlite-vec ઇન્ડેક્સને ફરીથી બનાવે છે, Qdrantને નહીં.
- **વેક્ટર ડાયમેન્શન આપમેળે શોધાય છે** — પ્રથમ ઉપયોગ વખતે વાસ્તવિક એમ્બેડિંગ પરથી; ભરવા માટે
  કોઈ ડાયમેન્શન ફીલ્ડ નથી. કલેક્શન અસ્તિત્વમાં આવ્યા પછી એમ્બેડિંગ મોડલ બદલવાનું
  આપમેળે સંભાળવામાં આવતું **નથી**: હાલનું કલેક્શન યથાવત્ રહે છે, ડાયમેન્શન-
  અસંગત રાઇટ/સર્ચ નિષ્ફળ જાય છે અને sqlite-vec પર ફૉલબૅક થાય છે. એમ્બેડર બદલવા માટે કલેક્શન
  ફરીથી બનાવો (નવું નામ આપો અથવા તેને Qdrantમાંથી કાઢી નાખો).
- **ડિસ્ટન્સ મેટ્રિક** — હંમેશાં **Cosine** (કલેક્શન બનાવતી વખતે હાર્ડકોડેડ; કન્ફિગર
  કરી શકાતું નથી).
- **પ્રમાણીકરણ** — ફક્ત API કી (`api-key` હેડર તરીકે મોકલાય છે; પ્રમાણીકરણ વિનાના
  સ્થાનિક Docker માટે વૈકલ્પિક). JWT/RBACનો ઉપયોગ થતો નથી.
- **કન્ફિગ ફીલ્ડ્સ** — UI `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` દર્શાવે છે. `vectorSize` / `hnswEfConstruct` ફક્ત env/DBમાં ઉપલબ્ધ છે અને `vectorSize`નો
  ઉપયોગ કલેક્શન બનાવવા માટે થતો નથી (ડાયમેન્શન એમ્બેડિંગમાંથી આવે છે).

### વેક્ટર ક્વૉન્ટાઇઝેશન (int8 — ઑપ્ટ-ઇન, બંને બૅકએન્ડ)

બંને વેક્ટર બૅકએન્ડ સંગ્રહિત વેક્ટર્સની મેમરી
ફૂટપ્રિન્ટ ઘટાડવા માટે **ઑપ્ટ-ઇન int8 ક્વૉન્ટાઇઝેશન**ને સપોર્ટ કરે છે (Float32 કરતાં ~4× નાનું), જેમાં રિકૉલમાં થોડો ઘટાડો થાય છે.
બંનેમાં ડિફૉલ્ટ **બંધ** છે — સ્પષ્ટપણે સક્ષમ ન કરવામાં આવે ત્યાં સુધી વેક્ટર્સ પૂર્ણ-પ્રિસિઝન રહે છે.

| બૅકએન્ડ    | સેટિંગ                          | પ્રકાર                         | ડિફૉલ્ટ  | ક્યાં વાંચવામાં આવે છે                                      |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB કી)    | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant**ને `qdrantQuantization` સેટિંગ
  કી દ્વારા દરેક ઇન્સ્ટન્સ માટે અલગથી કન્ફિગર કરવામાં આવે છે (`PUT /api/settings/qdrant` પર `quantization` ફીલ્ડ તરીકે દર્શાવવામાં આવે છે). જ્યારે
  `"int8"` હોય, ત્યારે `buildQuantizationConfig()` સ્કેલર ક્વૉન્ટાઇઝેશનની વિનંતી કરે છે
  (`always_ram`, ક્વૉન્ટાઇલ `0.99`) અને સર્ચ `rescore: true` સક્ષમ કરે છે જેથી
  પૂર્ણ-પ્રિસિઝન વેક્ટર્સ int8 કૅન્ડિડેટ સેટને વધુ ચોક્કસ બનાવે.
- **sqlite-vec** ક્વૉન્ટાઇઝેશન ફક્ત **એન્વાયર્નમેન્ટ દ્વારા** ઉપલબ્ધ છે (DB સેટિંગ નથી): સ્થાનિક વેક્ટર્સને `vec_quantize_int8(?, 'unit')` દ્વારા `int8[dim]`
  કૉલમ તરીકે સંગ્રહવા માટે
  `MEMORY_VEC_QUANTIZATION=int8` સેટ કરો. પસંદ કરેલો મોડ
  `embedding_signature`માં (`:int8` સફિક્સ સાથે) સામેલ થાય છે, તેથી મોડ બદલવાથી
  `vec_memories` ટેબલનું સંપૂર્ણ રીઇન્ડેક્સિંગ ટ્રિગર થાય છે — આ એ જ લેઝી-બૅકફિલ પાથ છે જેનો ઉપયોગ
  એમ્બેડિંગ મોડલ બદલાય ત્યારે થાય છે.

## મેમરીના પ્રકારો

`MemoryType` (`src/lib/memory/types.ts`):

| પ્રકાર       | ઉપયોગ                                                                                  |
| ------------ | -------------------------------------------------------------------------------------- |
| `factual`    | પસંદગીઓ, સ્થિર વપરાશકર્તા તથ્યો, વર્તણૂકીય પેટર્ન                                      |
| `episodic`   | ચોક્કસ ક્ષણ સાથે સંબંધિત નિર્ણયો ("I chose Postgres")                                  |
| `procedural` | વર્કફ્લો / કેવી રીતે કરવું તેની મેમરી (આરક્ષિત; હાલમાં કોઈ સ્વચાલિત એક્સ્ટ્રેક્ટર નથી) |
| `semantic`   | વેક્ટર-સ્ટોર એન્ટ્રીઓ માટે આરક્ષિત                                                     |

`MemoryConfig` પુનઃપ્રાપ્તિ વ્યૂહરચના `exact`, `semantic`, અથવા `hybrid` પૈકી એક છે,
અને સ્કોપ `session`, `apiKey`, અથવા `global` પૈકી એક છે. `getMemorySettings()`
માંથી મળતો ડિફૉલ્ટ સ્કોપ `apiKey` છે.

## તથ્ય નિષ્કર્ષણ (`extraction.ts`)

નિષ્કર્ષણ **regex-આધારિત** છે, LLM-આધારિત નહીં — તે `setImmediate()` સાથે
પ્રક્રિયાની અંદર ચાલે છે, જેથી તે પ્રતિસાદ સ્ટ્રીમને ક્યારેય અવરોધતું નથી:

- **પસંદગીના પેટર્ન** → `MemoryType.FACTUAL`
  (દા.ત. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **નિર્ણયના પેટર્ન** → `MemoryType.EPISODIC`
  (દા.ત. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **વર્તણૂકીય પેટર્ન** → `MemoryType.FACTUAL`
  (દા.ત. `I usually …`, `I always …`, `I tend to …`)

દરેક મેળને શુદ્ધ કરવામાં આવે છે (`trim`, ખાલી જગ્યાઓનું સંકોચન, મહત્તમ 500
અક્ષરો સુધી મર્યાદિત), સ્થિર `factKey(category, content)` દ્વારા બૅચની અંદરથી
ડુપ્લિકેટ દૂર કરવામાં આવે છે, અને
`{category, extractedAt, source: "llm_response"}` મેટાડેટા સાથે `createMemory()`
દ્વારા સંગ્રહવામાં આવે છે. ઇનપુટ ટેક્સ્ટ 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`) સુધી મર્યાદિત છે — જો તે વધુ લાંબું હોય, તો
ટેક્સ્ટનો **છેલ્લો ભાગ** વપરાય છે, જેથી સૌથી તાજેતરની સહાયક સામગ્રી હંમેશાં
સામેલ થાય.

`extractFactsFromText(text)` ટેસ્ટ માટે એક્સપોર્ટ કરવામાં આવ્યું છે અને તે
તથ્યોને સંગ્રહ્યા વિના સંરચિત સ્વરૂપે પરત કરે છે.

## પુનઃપ્રાપ્તિ (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` મુખ્ય પ્રવેશબિંદુ છે. તે:

1. `MemoryConfigSchema` દ્વારા કૉન્ફિગને સામાન્યકૃત અને માન્ય કરે છે.
2. જ્યારે `enabled` false હોય અથવા `maxTokens <= 0` હોય ત્યારે તરત જ `[]` પરત કરે છે.
3. `maxTokens`ને `[1, 8000]`ની મર્યાદામાં રાખે છે.
4. જૂના ડેટાબેઝ કાર્યરત રહે તે માટે આધુનિક `memories` ટેબલ અસ્તિત્વમાં છે કે કેમ
   (લેગસી `memory` ટેબલની તુલનામાં) તે શોધે છે.
5. સમાપ્તિ સુરક્ષા
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), વૈકલ્પિક
   સેશન સ્કોપ અને વૈકલ્પિક `retentionDays` કટઑફ સાથે આધારભૂત ક્વેરી બનાવે છે.
6. વ્યૂહરચના પ્રમાણે શાખા પસંદ કરે છે:
   - **`exact`** (ડિફૉલ્ટ): સમયક્રમિક `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: જો `config.query` અને `memory_fts` અસ્તિત્વમાં હોય, તો
     `memory_fts MATCH ?`ને JOIN કરે છે અને FTS રૅન્ક પ્રમાણે ક્રમબદ્ધ કરે છે;
     FTS 0 પંક્તિઓ પરત કરે ત્યારે સમયક્રમિક ક્રમ પર પાછું જાય છે.
   - **`hybrid`**: FTS પરિણામો (વધુ પ્રાસંગિકતા) અને સમયક્રમિક સમૂહનો યુનિયન,
     જેમાં id દ્વારા ડુપ્લિકેટ દૂર કરવામાં આવે છે.
7. જ્યારે ક્વેરી આપવામાં આવી હોય ત્યારે `content`, `key`, અને `metadata` JSON
   પર કીવર્ડ પ્રાસંગિકતા સ્કોર (`getRelevanceScore`) ગણે છે. શૂન્ય સ્કોરવાળી
   પંક્તિઓ ફિલ્ટર કરીને દૂર કરવામાં આવે છે.
8. પહેલાં સ્કોરના ઉતરતા ક્રમમાં અને પછી `createdAt`ના ઉતરતા ક્રમમાં ગોઠવે છે.
9. રૅન્ક કરેલી સૂચિમાંથી આગળ વધે છે અને જ્યાં સુધી ચાલુ
   `estimateTokens(content)` (લગભગ `length / 4`) બજેટની અંદર રહે ત્યાં સુધી
   એન્ટ્રીઓ સ્વીકારે છે. કોઈપણ મેળ મળ્યો હોય ત્યારે હંમેશાં ઓછામાં ઓછી એક
   એન્ટ્રી પરત કરે છે.

`estimateTokens` એક્સપોર્ટ કરવામાં આવ્યું છે અને તેનો ઉપયોગ પુનઃપ્રાપ્તિ,
સારાંશીકરણ અને MCP `omniroute_memory_search` ટૂલ દ્વારા થાય છે.

## ઇન્જેક્શન (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. બધી મેમરીની સામગ્રીને એક જ `Memory context: …` સ્ટ્રિંગમાં જોડે છે.
2. પ્રદાતાના નામ અનુસાર વ્યૂહરચના પસંદ કરે છે:
   - **સિસ્ટમ સંદેશ** (OpenAI, Anthropic, Gemini, … માટે ડિફૉલ્ટ) — કોઈપણ હાલના સિસ્ટમ
     સંદેશાઓ પહેલાં `{role: "system", content: memoryText}` ઉમેરે છે, જેથી વપરાશકર્તાના
     સિસ્ટમ પ્રોમ્પ્ટ્સને હજી પણ પ્રાથમિકતા મળે.
   - **વપરાશકર્તા સંદેશ** (ફૉલબૅક) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`માંના
     પ્રદાતાઓ માટે: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. આ સિસ્ટમ ભૂમિકાને નકારે છે
     અને અન્યથા 400 ભૂલ આપશે (GLM/Zhipu માટે issue #1701 જુઓ).
3. `memory.injection.injected` હેઠળ સંખ્યા, વ્યૂહરચના અને મોડેલ લૉગ કરે છે.

પોતાના રૂટિંગ નિર્ણયો લેવાની જરૂર હોય તેવા કોલર્સ માટે
`providerSupportsSystemMessage(provider)` એક્સપોર્ટ કરવામાં આવ્યું છે. સલામતી માટે અજાણ્યા પ્રદાતાઓનું ડિફૉલ્ટ `true`
(સિસ્ટમ ભૂમિકાની મંજૂરી) છે.

## સેટિંગ્સ (`settings.ts`)

મેમરી કૉન્ફિગરેશન env varsમાં નહીં, પરંતુ **DB સેટિંગ્સ ટેબલમાં સંગ્રહિત થાય છે**.
`getMemorySettings()` એ `getSettings()`માંથી વાંચે છે અને પરિણામને
પ્રોસેસની અંદર કૅશ કરે છે; લખાણો પછી સેટિંગ્સ PUT
રૂટ દ્વારા `invalidateMemorySettingsCache()` કૉલ કરવામાં આવે છે.

### લેગસી ફીલ્ડ્સ (બધી આવૃત્તિઓ)

| DB કી                 | પ્રકાર  | ડિફૉલ્ટ                                             | UI નિયંત્રણ                                          |
| --------------------- | ------- | --------------------------------------------------- | ---------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30થી ડિફૉલ્ટ રૂપે બંધ)                | મેમરી ચાલુ/બંધ                                       |
| `memoryMaxTokens`     | integer | `2000` (શ્રેણી `0–16000`)                           | ઇન્જેક્શન માટે ટોકન બજેટ                             |
| `memoryRetentionDays` | integer | `30` (શ્રેણી `1–365`)                               | રિટેન્શન વિન્ડો                                      |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid`માંથી એક) | રિટ્રીવલ વ્યૂહરચના                                   |
| `skillsEnabled`       | boolean | `false`                                             | પ્રતિ-કી સ્કિલ ઇન્જેક્શન ટૉગલ કરે છે (SKILLS.md જુઓ) |

નોંધ: UI વ્યૂહરચના `"recent"` એ `toMemoryRetrievalConfig()` દ્વારા આંતરિક `"exact"` રિટ્રીવલ
વ્યૂહરચના સાથે મેપ થાય છે (કાલક્રમિક ક્રમ).

### નવા ફીલ્ડ્સ (v3.8.6, પ્લાન 21 D9)

ફીલ્ડના વર્ણનો માટે ઉપરનો "સેટિંગ્સ એક્સ્ટેન્શન" વિભાગ પણ જુઓ.

| DB કી                       | API ફીલ્ડ                | ડિફૉલ્ટ  |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-સંબંધિત DB કીઓ (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` ડિફૉલ્ટ `"omniroute_memory"`,
`qdrantEmbeddingModel` ડિફૉલ્ટ `"openai/text-embedding-3-small"`)ને
`qdrant.ts`માં `normalizeQdrantConfig()` દ્વારા વાંચવામાં આવે છે.

### એન્વાયરમેન્ટ વેરિએબલ્સ (v3.8.6)

છ વૈકલ્પિક env vars એ એન્જિનનું રનટાઇમ વર્તન ગોઠવે છે (`.env.example`માં દસ્તાવેજીકૃત):

| વેરિએબલ                         | ડિફૉલ્ટ                    | વર્ણન                                                                                                                                                   |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | એમ્બેડિંગ કૅશ TTL (5 મિનિટ)                                                                                                                             |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | એમ્બેડિંગ LRU કૅશમાં મહત્તમ એન્ટ્રીઓ                                                                                                                    |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js મોડેલ માટે HF repo                                                                                                                      |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | સ્ટેટિક potion મોડેલ માટે HF repo                                                                                                                       |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ડાઉનલોડ કરેલા મોડેલ્સ ક્યાં સંગ્રહવા                                                                                                                    |
| `MEMORY_VEC_TOP_K`              | `20`                       | વેક્ટર સર્ચ માટે ડિફૉલ્ટ top-K                                                                                                                          |
| `MEMORY_RRF_K`                  | `60`                       | હાઇબ્રિડ સર્ચ માટે RRF k અચલ                                                                                                                            |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | સ્થાનિક sqlite-vec વેક્ટર્સને ક્વૉન્ટાઇઝ્ડ સ્વરૂપે સંગ્રહવા માટે `int8` પર સેટ કરો (~4× નાના; ઑપ્ટ-ઇન). મોડમાં ફેરફાર કરવાથી ફરજિયાત રીઇન્ડેક્સ થાય છે. |

## સારાંશીકરણ (`summarization.ts`)

જ્યારે કોઈ કીની મેમરીઓમાં ચાલતો કુલ ટોકન આંક બજેટ કરતાં વધી જાય ત્યારે `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` જૂની સામગ્રીને સંક્ષિપ્ત કરે છે. તે `created_at` મુજબ DESC ક્રમમાં પંક્તિઓ પર પુનરાવર્તન કરે છે, મર્યાદામાં સમાતી પંક્તિઓ જાળવી રાખે છે અને બાકીની પંક્તિઓમાં `content` ને મૂળ સામગ્રીનાં પ્રથમ ત્રણ વાક્યો વડે તે જ સ્થાને બદલે છે. `tokensSaved` એ જૂની અને નવી સામગ્રી વચ્ચેના `estimateTokens` નો તફાવત છે.

આ રૂટિન **ઉપલબ્ધ છે પરંતુ વર્તમાન ચેટ પાઇપલાઇનમાં આપમેળે કૉલ થતું નથી** — જો તમને સતત સંક્ષિપ્તીકરણની જરૂર હોય, તો તેને cron, એડમિન ક્રિયા અથવા `MemoryConfig.autoSummarize` ગ્લૂમાંથી કૉલ કરો. ડેટાની ખોટ એકમાર્ગી છે: મૂળ લખાણ ઓવરરાઇટ થઈ જાય છે.

## REST API

તમામ એન્ડપોઇન્ટ્સ માટે મેનેજમેન્ટ પ્રમાણીકરણ (`requireManagementAuth`) જરૂરી છે.

### મુખ્ય મેમરી એન્ડપોઇન્ટ્સ (હાલના + અપડેટ કરેલા)

| પદ્ધતિ   | પાથ                  | વર્ણન                                                                                                                                                                                                  |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | ફિલ્ટર્સ સાથે પૃષ્ઠાંકિત સૂચિ: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. પ્રતિસાદમાં `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` સામેલ છે                  |
| `POST`   | `/api/memory`        | એન્ટ્રી બનાવે છે (Zod દ્વારા માન્ય કરાયેલ: `content`, `key`, વૈકલ્પિક `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `createMemory()` ને કૉલ કરે છે, જે `(apiKeyId, key)` પર અપસર્ટ કરે છે |
| `GET`    | `/api/memory/[id]`   | UUID દ્વારા એક એન્ટ્રી મેળવે છે                                                                                                                                                                        |
| `PUT`    | `/api/memory/[id]`   | એન્ટ્રીનાં ફીલ્ડ્સ (`type`, `key`, `content`, `metadata`) અપડેટ કરે છે. બોડી: `MemoryUpdatePutSchema`. એમ્બેડિંગ સ્રોત ઉપલબ્ધ હોય તો વેક્ટરને પણ સિંક કરે છે.                                          |
| `DELETE` | `/api/memory/[id]`   | એન્ટ્રી કાઢી નાખે છે; `vec_memories` (D15) અને શ્રેષ્ઠ પ્રયાસના ધોરણે Qdrantમાંથી પણ કાઢી નાખે છે. એન્ટ્રી ન મળે ત્યારે 404 પરત કરે છે.                                                                |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` ચલાવે છે — રાઉન્ડ-ટ્રિપ બનાવો→સૂચિબદ્ધ કરો→કાઢી નાખો. `{working, latencyMs, error?}` પરત કરે છે                                                             |

### નવા મેમરી એન્જિન એન્ડપોઇન્ટ્સ (યોજના 21)

| પદ્ધતિ | પાથ                               | વર્ણન                                                                                                                                                            |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` નું ડ્રાય-રન — સ્કોર, ટિયર અને ટોકન્સ સાથે ક્રમબદ્ધ પરિણામો પરત કરે છે. બોડી: `RetrievePreviewSchema`. મેમરીઓને ઇન્જેક્ટ કે સુધારતું નથી.     |
| `GET`  | `/api/memory/embedding-providers` | એમ્બેડિંગ મોડલ્સ સાથે પ્રદાતાઓની સૂચિ આપે છે અને કોના માટે API કી ગોઠવેલી છે તે દર્શાવે છે.                                                                      |
| `GET`  | `/api/memory/engine-status`       | એન્જિનની સંપૂર્ણ સ્થિતિ પરત કરે છે: કીવર્ડ ટિયર, એમ્બેડિંગ રિઝોલ્યુશન, વેક્ટર સ્ટોરનાં આંકડા, Qdrantની સ્થિતિ, રીરૅન્ક ગોઠવણી. આકાર: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | મેમરી સંક્ષિપ્તીકરણ મેન્યુઅલી ટ્રિગર કરે છે. બોડી: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` પરત કરે છે.     |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ધરાવતી મેમરીઓ માટે વેક્ટરનું પુનઃઇન્ડેક્સિંગ ટ્રિગર કરે છે. બોડી: `MemoryReindexSchema` (`force`). `{started, pending}` પરત કરે છે.            |

### સેટિંગ્સ એન્ડપોઇન્ટ્સ

| પદ્ધતિ | પાથ                                     | વર્ણન                                                                                                       |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | વર્તમાન સામાન્યકૃત `MemorySettingsExtended` (7 નવા ફીલ્ડ્સ + લેગસી)                                         |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` માંથી કોઈપણ ફીલ્ડ અપડેટ કરે છે (કુલ 12 ફીલ્ડ્સ)                              |
| `GET`  | `/api/settings/qdrant`                  | વર્તમાન Qdrant સેટિંગ્સ (`QdrantSettingsSchema`)                                                            |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant સેટિંગ્સ અપડેટ કરે છે. બોડી: `QdrantSettingsUpdateSchema`. `apiKey` = ખાલી સ્ટ્રિંગ કીને દૂર કરે છે. |
| `GET`  | `/api/settings/qdrant/health`           | ગોઠવેલા Qdrant ઇન્સ્ટન્સ સામે જીવંતતા તપાસ. `QdrantHealthResultSchema` પરત કરે છે.                          |
| `POST` | `/api/settings/qdrant/search`           | Qdrant સામે સેમેન્ટિક શોધનું પરીક્ષણ. બોડી: `QdrantSearchSchema` (`query`, `topK`).                         |
| `POST` | `/api/settings/qdrant/cleanup`          | સમયસમાપ્ત / જૂની મેમરીઓ માટેના Qdrant પોઇન્ટ્સ દૂર કરે છે.                                                  |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant માટે ઉપલબ્ધ એમ્બેડિંગ મોડલ્સની સૂચિ આપે છે.                                                          |

`/api/memory` સૂચિ ક્વેરી `page`-આધારિત પૃષ્ઠાંકન (`parsePaginationParams`) **અથવા** સીધા `offset` ને સપોર્ટ કરે છે — જ્યારે `offset` હાજર હોય ત્યારે તેને પ્રાધાન્ય મળે છે અને પ્રતિસાદના આકાર માટે તેમાંથી `page` ની ગણતરી કરવામાં આવે છે.

## MCP સાધનો (`open-sse/mcp-server/tools/memoryTools.ts`)

જ્યારે MCP સર્વર સક્ષમ હોય છે, ત્યારે ત્રણ મેમરી સાધનો નોંધાય છે:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` ને આવરે છે. v3.8.6 (D16) મુજબ, `strategy` ને
  `"exact"` તરીકે હાર્ડકોડ કરવાને બદલે `getMemorySettings()` માંથી વાંચવામાં
  આવે છે. જો `query` આપવામાં આવ્યું હોય અને `strategy`, `semantic` અથવા
  `hybrid` હોય, તો ઉપલબ્ધ હોય ત્યારે વેક્ટર સ્ટોરનો ઉપયોગ થાય છે.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` ને આવરે છે. માત્ર 4 પ્રમાણભૂત પ્રકારો સ્વીકારે છે:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → મેળ ખાતી
  એન્ટ્રીઓની યાદી બનાવે છે, વૈકલ્પિક રીતે નિર્માણ-પહેલાંના ટાઇમસ્ટૅમ્પ દ્વારા ફિલ્ટર કરે છે અને પછી દરેકને
  `deleteMemory()` દ્વારા કાઢી નાખે છે (જે sqlite-vec + Qdrant માંથી વેક્ટર્સને પણ દૂર કરે છે).

ટ્રાન્સપોર્ટ અને સ્કોપની વિગતો માટે [MCP-SERVER.md](./MCP-SERVER.md) જુઓ.

## ડૅશબોર્ડ (મેમરી સ્ટુડિયો)

`src/app/(dashboard)/dashboard/memory/page.tsx` હવે એક **3-ટૅબ સ્ટુડિયો** છે:

### ટૅબ: મેમરીઝ

- કન્સેપ્ટ કાર્ડ (સંકોચી શકાય તેવું "તે કેવી રીતે કાર્ય કરે છે" સમજૂતી વિભાગ).
- રીઅલ-ટાઇમ યાદી, શોધ અને પેજિનેશન (300 ms ડિબાઉન્સ સાથે).
- પ્રકાર ફિલ્ટર (`factual` / `episodic` / `procedural` / `semantic` / બધા).
- મેમરી ઉમેરવાનું મોડલ (કી, સામગ્રી, પ્રકાર).
- ઇનલાઇન સંપાદન (પેન્સિલ બટન → `PUT /api/memory/[id]`).
- દરેક પંક્તિ દીઠ કાઢી નાખવાનો વિકલ્પ (પુષ્ટિકરણ ડાયલોગ સાથે).
- વર્તમાન પૃષ્ઠનું JSON નિકાસ; ફાઇલ પિકર દ્વારા JSON આયાત.
- આંકડા કાર્ડ્સ: `totalEntries`, `tokensUsed`, `hitRate`.
- "જૂનાને સંક્ષિપ્ત કરો" બટન → `POST /api/memory/summarize` (ડ્રાય-રન પહેલાં
  ઉમેદવારોની સંખ્યા દર્શાવે છે, ત્યારબાદ પુષ્ટિ કરે છે).
- `GET /api/memory/health` દ્વારા સંચાલિત લીલું/લાલ હેલ્થ ડોટ.

### ટૅબ: પ્લેગ્રાઉન્ડ

- ક્વેરી ઇનપુટ + સ્ટ્રેટેજી સિલેક્ટર (ચોક્કસ / સિમેન્ટિક / હાઇબ્રિડ) + ટોકન બજેટ.
- "સિમ્યુલેટ કરો" → `POST /api/memory/retrieve-preview` — ક્રમબદ્ધ પરિણામોને
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` સાથે દર્શાવે છે.
- કયો એમ્બેડિંગ સ્ત્રોત / વેક્ટર સ્ટોર ઉપયોગમાં લેવાયો હતો અને
  ફૉલબૅક થયો હતો કે નહીં તે દર્શાવતી રિઝોલ્યુશન પેનલ.

### ટૅબ: એન્જિન

- એન્જિન સ્થિતિ પેનલ (કીવર્ડ FTS5 ચિપ, એમ્બેડિંગ ચિપ, વેક્ટર સ્ટોર ચિપ,
  Qdrant હેલ્થ ચિપ, રીરૅન્ક ચિપ).
- "હમણાં ફરીથી ઇન્ડેક્સ કરો" બટન → `POST /api/memory/reindex`.
- એમ્બેડિંગ સ્ત્રોત સિલેક્ટર (ઑટો / રિમોટ / સ્ટેટિક / ટ્રાન્સફોર્મર્સ + ટૉગલ્સ).
- Qdrant કૉન્ફિગ કાર્ડ (સક્ષમ કરવાનો ટૉગલ, હોસ્ટ/પોર્ટ/કલેક્શન/કી, કનેક્શન પરીક્ષણ,
  સિમેન્ટિક શોધ પરીક્ષણ, ક્લીનઅપ).
- રીરૅન્ક કૉન્ફિગ કાર્ડ (સક્ષમ કરવાનો ટૉગલ, પ્રદાતા/મોડેલ સિલેક્ટર).

મેમરી અને Qdrant સેટિંગ્સ લેગસી/ગ્લોબલ સેટિંગ્સ સપાટી માટે
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) હેઠળ પણ
ઉપલબ્ધ છે.

## કૅશિંગ

`src/lib/memory/store.ts`, `getMemory(id)` રીડ્સ માટે ઇન-પ્રોસેસ LRU-જેવું કૅશ
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, 20 %
સૌથી જૂની એન્ટ્રીઓના ઇવિક્શન સાથે) જાળવે છે, તેમજ સામાન્ય કી/વેલ્યૂ
`memoryCache` સ્તર (`src/lib/memory/cache.ts`) પણ જાળવે છે, જેમાં `get`/`set`/`invalidate`
મેથડ્સ છે અને જેનો ઉપયોગ પોતાનું સ્કોપ્ડ કૅશ ઇચ્છતા કૉલર્સ કરે છે (1 000-એન્ટ્રી LRU,
ડિફૉલ્ટ TTL 5 min).

## ગોપનીયતા અને જીવનચક્ર

- મેમરીની માલિકી API key id પાસે છે (`chatCore.ts`માં
  `resolveMemoryOwnerId`). `apiKeyInfo.id` વિના પુનઃપ્રાપ્તિ, ઇન્જેક્શન
  કે એક્સ્ટ્રેક્શન—કશું જ ચાલતું નથી.
- ભવિષ્યની `expires_at` ધરાવતી એન્ટ્રીઓ પુનઃપ્રાપ્તિમાંથી ફિલ્ટર કરી દેવામાં આવે છે; `retentionDays`થી
  જૂની એન્ટ્રીઓને `retrieveMemories`માંની
  `created_at >= cutoff` કલમ દ્વારા બાકાત રાખવામાં આવે છે.
- કાયમી કાઢી નાખવા માટે, `DELETE /api/memory/[id]` અથવા `omniroute_memory_clear`નો ઉપયોગ કરો.
- એક્સ્ટ્રેક્શન `setImmediate` મારફતે ફાયર-એન્ડ-ફરગેટ રીતે થાય છે; નિષ્ફળતાઓ
  `memory.extraction.background.failed` હેઠળ લૉગ થાય છે અને કૉલર સમક્ષ ક્યારેય પ્રગટ થતી નથી.
- ચકાસણી રાઉન્ડ-ટ્રિપ્સ (`verifyExtractionPipeline`) `finally` બ્લૉકમાં પોતાની
  પરીક્ષણ એન્ટ્રીઓ સાફ કરે છે.

## આ પણ જુઓ

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` સેટિંગ મેમરીની સાથે ટૂલ
  વ્યાખ્યાઓ ઇન્જેક્ટ કરે છે.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ટ્રાન્સપોર્ટ / સ્કોપ્સ.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — વધુ વ્યાપક API સપાટી.
- સોર્સ મોડ્યુલો:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + હાઇબ્રિડ RRF
  - `src/lib/memory/embedding/index.ts` — બહુ-સ્રોત એમ્બેડિંગ સ્તર
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — તમામ મેમરી API બોડી માટે Zod સ્કીમા
  - `src/shared/schemas/qdrant.ts` — Qdrant સેટિંગ્સ/ઑપરેશન્સ માટે Zod સ્કીમા
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` માટે CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + પેટા-રૂટ્સ
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (પેજ + કમ્પોનન્ટ્સ +
    ટૅબ્સ + હૂક્સ)
  - `open-sse/handlers/chatCore.ts` (ઇન્જેક્શન / એક્સ્ટ્રેક્શન વાયરિંગ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## એમ્બેડિંગ પ્રદાતા પસંદ કરવો (v3.8.16+)

OmniRouteનું મેમરી એન્જિન **ચાર એમ્બેડિંગ સ્રોતો** (`src/lib/memory/embedding/`)ને સપોર્ટ કરે છે. દરેકમાં **લેટન્સી, ખર્ચ, મોડલની ગુણવત્તા અને સેટઅપની જટિલતા** સંબંધિત અલગ સમાધાનો છે.

### એમ્બેડિંગ સ્રોતો

| પ્રદાતા        | સ્રોત                                       | લેટન્સી                           | ખર્ચ                 | ગુણવત્તા                           | સેટઅપ                                      |
| -------------- | ------------------------------------------- | --------------------------------- | -------------------- | ---------------------------------- | ------------------------------------------ |
| `transformers` | સ્થાનિક ONNX મોડલ (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                   | મફત                  | સારી                               | માત્ર `npm install`                        |
| `static`       | પૂર્વ-ગણતરી કરેલા વેક્ટર્સ (કૅશ કરેલા)      | <1ms                              | મફત                  | લાગુ પડતું નથી (કૅશ હિટ પર આધારિત) | કંઈ નહીં                                   |
| `remote`       | OpenAI / Cohere / Voyage API                | ~100-300ms                        | $0.02-0.10/1M ટોકન્સ | ઉત્તમ                              | API key                                    |
| `auto`         | રનટાઇમ પર શ્રેષ્ઠ ઉપલબ્ધ સ્રોત પસંદ કરે છે  | પસંદ કરેલા સ્રોત જેટલી            | મફત                  | પસંદ કરેલા સ્રોત જેટલી             | કંઈ નહીં                                   |
| _(કૅશ)_        | કોઈપણ સ્રોત ઉપરનું ઇન-મેમરી LRU સ્તર        | <1ms (હિટ), સંપૂર્ણ લેટન્સી (મિસ) | મફત                  | અંતર્ગત સ્રોત જેટલી                | હંમેશાં ચાલુ (પસંદ કરી શકાય એવો સ્રોત નથી) |

### નિર્ણય વૃક્ષ

```
                  તમારો ડિપ્લોયમેન્ટ સંદર્ભ શું છે?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  ડેવ/ટેસ્ટ    નાનું પ્રોડ   મોટું પ્રોડ    એજ / ઑફલાઇન
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (મફત, API નહીં)            (શ્રેષ્ઠ ગુણવત્તા)   (ઇન્ટરનેટ નહીં)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ઉપર હંમેશાં `cache` સ્તર ઉમેરો
            (LruCache કોઈપણ પ્રદાતાને રૅપ કરે છે)
```

### ડેટાબેઝ અને API રૂપરેખાંકન

મેમરી એમ્બેડિંગ વિકલ્પો environment variables દ્વારા નહીં, પરંતુ Settings API/UI દ્વારા રૂપરેખાંકિત થાય છે. Settings હેઠળ સંબંધિત સેટિંગ્સ ડેટાબેઝ કીઝ (`src/lib/memory/settings.ts`માં `normalizeMemorySettings`) આ છે:

- `memoryEmbeddingSource`: `"transformers"` (સ્થાનિક), `"remote"` (API-આધારિત, દા.ત. OpenAI), `"static"` (બાહ્ય સ્ટોર), અથવા `"auto"`
- `memoryEmbeddingProviderModel`: રિમોટ/સ્ટેટિક સ્રોતો માટે મોડલ ઓળખકર્તા (દા.ત., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, અથવા `"auto"`

#### સ્થાનિક મોડલ (`transformers`)

સ્થાનિક મોડલો ચલાવવા માટે આંતરિક રીતે transformers.jsનો ઉપયોગ કરે છે:

```bash
# કોડમાં વાંચવામાં આવતા Env vars (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF મોડલ રેપો
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF સ્ટેટિક પોશન મોડલ
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # કૅશ ડિરેક્ટરી
```

#### LRU એમ્બેડિંગ કૅશ

કૅશ ડિફૉલ્ટ રૂપે હંમેશાં ચાલુ હોય છે અને env vars દ્વારા રૂપરેખાંકિત થાય છે:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # કૅશ કરેલી આઇટમ્સની મહત્તમ સંખ્યા
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 મિનિટ)
```

### કામગીરીના આંકડા

સામાન્ય 4-કોર x86 સર્વર પર બેન્ચમાર્ક (દરેક ટેક્સ્ટ ~100 ટોકન્સ):

| પ્રદાતા              | p50   | p95   | p99   | 1M એમ્બેડિંગ્સ દીઠ ખર્ચ            |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | મફત                                |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant હોસ્ટિંગ પર આધારિત          |
| `cache` (હિટ)        | <1ms  | <1ms  | 2ms   | મફત                                |

---

## તથ્ય નિષ્કર્ષણ પેટર્ન (v3.8.16+)

`extraction.ts` મોડ્યુલ (`src/lib/memory/extraction.ts`) વાતચીતના સંદેશાઓમાંથી સંરચિત તથ્યો કાઢવા માટે **regex પેટર્ન મેચિંગ**નો ઉપયોગ કરે છે. આ પેટર્નને સમજવાથી તમારા ઉપયોગના કિસ્સા માટે નિષ્કર્ષણની ગુણવત્તા સુસંગત કરવામાં મદદ મળે છે.

### ડિફૉલ્ટ પેટર્ન શ્રેણીઓ

| શ્રેણી              | ઉદાહરણ પેટર્ન                                                                       | શું કૅપ્ચર થાય છે               |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------- |
| PREFERENCE_PATTERNS | `"હું <X> પસંદ કરું છું"`, `"મને <X> ગમે છે"`, `"મને <X>થી નફરત છે"`                | વપરાશકર્તાની પસંદગીઓ            |
| DECISION_PATTERNS   | `"હું <X>નો ઉપયોગ કરીશ"`, `"મેં <X> કરવાનું નક્કી કર્યું"`, `"મેં <X> પસંદ કર્યું"` | વપરાશકર્તાના નિર્ણયો (એપિસોડિક) |
| PATTERN_PATTERNS    | `"હું સામાન્ય રીતે <X>"`, `"હું હંમેશાં <X>"`, `"હું ક્યારેય <X> નહીં"`             | સતત વર્તણૂકીય પેટર્ન            |

### ઉદાહરણ પેટર્ન (સરળીકૃત)

```ts
// src/lib/memory/extraction.ts માંથી
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

### શું નિષ્કર્ષિત થાય છે

જ્યારે વપરાશકર્તા કહે છે:

> "હું TypeScript પસંદ કરું છું. હું આ પ્રોજેક્ટ માટે Postgresનો ઉપયોગ કરીશ. હું push કરતાં પહેલાં હંમેશાં commit કરું છું. મને Python પસંદ નથી."
> નિષ્કર્ષણથી 4 મેમરી બને છે:
>
> | કી                                   | શ્રેણી | પ્રકાર    | સામગ્રી                          |
> | ------------------------------------ | ------ | --------- | -------------------------------- |
> | `preference:typescript`              | પસંદગી | તથ્યાત્મક | "TypeScript"                     |
> | `decision:postgres_for_this_project` | નિર્ણય | એપિસોડિક  | "આ પ્રોજેક્ટ માટે Postgres"      |
> | `pattern:commit_before_pushing`      | પેટર્ન | તથ્યાત્મક | "push કરતાં પહેલાં commit કરવું" |
> | `preference:python`                  | પસંદગી | તથ્યાત્મક | "Python"                         |

### નિષ્કર્ષણની મર્યાદાઓ

અનિયંત્રિત નિષ્કર્ષણ અટકાવવા માટે નીચેની મર્યાદાઓ લાગુ પડે છે:

| સામગ્રીની ન્યૂનતમ લંબાઈ | 3 અક્ષરો |
| સામગ્રીની મહત્તમ લંબાઈ | 500 અક્ષરો |

### નિષ્કર્ષણ ક્યારે અક્ષમ કરવું

જ્યારે પણ મેમરી સક્ષમ હોય ત્યારે નિષ્કર્ષણ આપમેળે ચાલે છે; માત્ર નિષ્કર્ષણ માટે કોઈ અલગ
ટૉગલ નથી. તેને બંધ કરવા માટે, મેમરીને સંપૂર્ણપણે અક્ષમ કરો (`enabled: false`
ને `PUT /api/settings/memory` મારફતે). નીચેની પરિસ્થિતિઓમાં આમ કરવાનું વિચારો:

- તમારા સંદેશાઓનું પ્રમાણ ઊંચું હોય અને નિષ્કર્ષણનો ખર્ચ નોંધપાત્ર હોય
- તમારી વાતચીત મોટાભાગે ક્ષણિક હોય (ચેટ, ડિબગિંગ) અને તેનું કોઈ લાંબા ગાળાનું મૂલ્ય ન હોય
- તમે કસ્ટમ પ્લગઇન મારફતે પહેલેથી જ સંદર્ભ કૅપ્ચર કરી રહ્યા હો

---

## હાઇબ્રિડ RRF સુસંગતતા (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** અલ્ગોરિધમ FTS5 (કીવર્ડ) અને વેક્ટર (સિમેન્ટિક) પરિણામોને જોડે છે. `k` પેરામીટર નીચા ક્રમનાં પરિણામોને કેટલું વજન આપવામાં આવે છે તે નિયંત્રિત કરે છે.

### સૂત્ર

દરેક ઉમેદવાર મેમરી માટે RRF સ્કોર આ પ્રમાણે છે:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

જ્યાં:

- `k` અચળાંક છે (ડિફૉલ્ટ 60)
- `rank_i(d)` એ i-મા પુનઃપ્રાપ્તિ સિસ્ટમ (FTS, વેક્ટર)માં દસ્તાવેજ `d`નો ક્રમ છે
- સરવાળો તમામ પુનઃપ્રાપ્તિ સિસ્ટમો પર કરવામાં આવે છે

### `k` પરિણામોને કેવી રીતે અસર કરે છે

| `k` મૂલ્ય            | અસર                                                                            | શેના માટે શ્રેષ્ઠ                             |
| -------------------- | ------------------------------------------------------------------------------ | --------------------------------------------- |
| `k=0`                | શુદ્ધ રૅન્ક ફ્યુઝન (કોઈ સ્મૂધિંગ નહીં)                                         | સૈદ્ધાંતિક બેઝલાઇન                            |
| `k=10-30`            | ટોચનાં પરિણામોને ઘણું વજન આપે છે, નીચા ક્રમનું યોગદાન બહુ ઓછું હોય છે          | જ્યારે ટોચનાં 3 પરિણામ સામાન્ય રીતે સાચાં હોય |
| **`k=60`** (ડિફૉલ્ટ) | સંતુલિત — ટોચનાં 10 પરિણામો બધાં અર્થપૂર્ણ યોગદાન આપે છે                       | સામાન્ય હેતુની પુનઃપ્રાપ્તિ                   |
| `k=100+`             | વધુ સમતળ — નીચા ક્રમનાં પરિણામો પણ અનેક સિસ્ટમોમાં દેખાય તો પ્રભાવી બની શકે છે | જ્યારે રિકૉલ > પ્રિસિઝન અત્યંત મહત્વપૂર્ણ હોય |

### વ્યવહારમાં `k`ને સુસંગત કરવું

```bash
# ડિફૉલ્ટ
MEMORY_RRF_K=60

# આક્રમક પ્રિસિઝન (નાની મેમરી, થોડા દસ્તાવેજો)
MEMORY_RRF_K=20

# મહત્તમ રિકૉલ (મોટી મેમરી, વિવિધ ક્વેરીઓ)
MEMORY_RRF_K=120
```

**`k=20` સાથેનું ઉદાહરણ:**

- FTS ક્રમ 1 → યોગદાન `1/21 = 0.048`
- FTS ક્રમ 10 → યોગદાન `1/30 = 0.033`
- વેક્ટર ક્રમ 1 → યોગદાન `0.048`
- સંયુક્ત મહત્તમ: `0.096`

**`k=60` સાથેનું ઉદાહરણ:**

- FTS ક્રમ 1 → યોગદાન `1/61 = 0.016`
- FTS ક્રમ 10 → યોગદાન `1/70 = 0.014`
- વેક્ટર ક્રમ 1 → યોગદાન `0.016`
- સંયુક્ત મહત્તમ: `0.033`

ઊંચા `k` સાથે, ટોચના-1 અને ક્રમ-10 વચ્ચેનો **સાપેક્ષ તફાવત** નાનો હોય છે, તેથી અલ્ગોરિધમ ટોચના ક્રમના વિશ્વાસ કરતાં **પુનઃપ્રાપ્તિ સિસ્ટમો વચ્ચેની સંમતિ** પર વધુ આધાર રાખે છે.

### `k` ક્યારે બદલવું

| લક્ષણ                                            | આ અજમાવો                                                             |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| ટોચનું પરિણામ હંમેશાં જીતે છે, પરંતુ તે ખોટું છે | **નીચું** k (દા.ત., 20) — ટોચના ક્રમનો વિશ્વાસ વધુ મહત્વનો બને છે    |
| સાચો જવાબ ટોચના-5માં છે પરંતુ ટોચના-1માં નથી     | **ઊંચું** k (દા.ત., 100) — વધુ સમતળ સ્કોરિંગ સંમતિને પુરસ્કૃત કરે છે |
| રિકૉલ ઊંચું છે પરંતુ પ્રિસિઝન નીચું છે           | **નીચું** k — રૅન્કિંગને વધુ તીક્ષ્ણ બનાવો                           |
| રિકૉલ નીચું છે (સંબંધિત દસ્તાવેજો મળતા નથી)      | **ઊંચું** k — નીચા ક્રમનાં દસ્તાવેજોને તક આપો                        |

### RRF વેઇટિંગ

રેસિપ્રોકલ રૅન્ક ફ્યુઝન સિમેન્ટિક વેક્ટર ક્રમ અને પૂર્ણ-ટેક્સ્ટ શોધ ક્રમ માટે સમાન વજનનો ઉપયોગ કરે છે:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

વ્યક્તિગત વજનને સમાયોજિત કરવા માટે કોઈ એન્વાયર્નમેન્ટ વેરિએબલ નથી (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` અસ્તિત્વમાં નથી).

---

## સારાંશીકરણ વ્યૂહરચના (v3.8.16+)

`summarization.ts` મોડ્યુલ (`src/lib/memory/summarization.ts`) સક્રિય સમૂહને નાનો રાખવા માટે જૂની મેમરીઓને સંકુચિત કરે છે અને સાથે પુનઃસ્મરણ ક્ષમતા જાળવી રાખે છે.

### સારાંશીકરણ ક્યારે ટ્રિગર થાય છે

| ટ્રિગર                     | થ્રેશોલ્ડ (ડિફૉલ્ટ) |
| -------------------------- | ------------------- |
| API મારફતે મેન્યુઅલ ટ્રિગર | લાગુ પડતું નથી      |

### શેનું સારાંશીકરણ થાય છે

`summarization.ts` માંથી બે એન્ટ્રી પૉઇન્ટ નિકાસ કરવામાં આવે છે:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — સેશન માટેની
  મેમરીઓને ટોકન બજેટ દ્વારા મર્યાદિત એક જ સારાંશ ટેક્સ્ટમાં સંક્ષિપ્ત કરે છે.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API દ્વારા વપરાતું
  વય-આધારિત સંકુચન: તે `days` કરતાં જૂની દરેક મેમરી પસંદ કરે છે, તેમાંથી
  એક સંક્ષિપ્ત સારાંશ મેમરી બનાવે છે અને (`dryRun` `false` હોય ત્યારે)
  મૂળ મેમરીઓ કાઢી નાખે છે. કંઈપણ બદલ્યા વિના ઉમેદવાર સમૂહ અને કુલ ટોકન સંખ્યાનું
  પૂર્વાવલોકન કરવા માટે `dryRun: true` પાસ કરો.

કોઈ ટૅગ/કી ક્લસ્ટરિંગ પાસ કે પ્રતિ-મેમરી "મુખ્ય વિરુદ્ધ સારાંશીકરણયોગ્ય" સ્કોરિંગ નથી —
પસંદગી સંપૂર્ણપણે વયની મર્યાદા પર આધારિત છે અને સારાંશ ટેક્સ્ટમાં દરેક ઉમેદવાર માટે
પ્રકાર-ઉપસર્ગવાળી સંક્ષિપ્ત લાઇન હોય છે.

### સારાંશીકરણ ટ્રિગર કરવું

સારાંશીકરણ **મેન્યુઅલ / ઑપ્ટ-ઇન** છે — `autoSummarize` સેટિંગ ડિફૉલ્ટ રૂપે
`false` હોય છે, તેથી કંઈપણ આપમેળે સંકુચિત થતું નથી. તેને API મારફતે ટ્રિગર કરો:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

તેને બંધ રાખવા માટે, ફક્ત `autoSummarize` ને તેના ડિફૉલ્ટ (`false`) પર જ રાખો.

### સારાંશીકરણની ગુણવત્તા માટેની ટિપ્સ

- **પહેલા `dryRun` વડે પૂર્વાવલોકન કરો** — `summarizeMemoriesOlderThan(..., true)`
  ઉમેદવારોની યાદી અને કુલ ટોકન સંખ્યા પરત કરે છે, જેથી મૂળ મેમરીઓ કાઢી નાખતાં પહેલાં
  તમે ખાતરી કરી શકો કે શું મર્જ કરવામાં આવશે.
- જો તમારી પાસે મેમરીઓનો મોટો સંગ્રહ હોય, તો **ઓછા ટ્રાફિકવાળા કલાકોમાં સારાંશીકરણ ચલાવો** — LLM કૉલ ધીમો ભાગ છે

```bash
# Cron-શૈલી: દરરોજ સવારે 3 વાગ્યે સારાંશીકરણ કરો
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend પ્રોવાઇડર પેટર્ન

> **સત્યનો અધિકૃત સ્રોત:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **પરીક્ષણો:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend પ્રોવાઇડર પેટર્ન હાલના મેમરી એન્જિન પર એક **પ્લગ કરી શકાય તેવું બેકએન્ડ એબ્સ્ટ્રૅક્શન સ્તર** રજૂ કરે છે. એક જ સ્ટોરેજ અમલીકરણ સાથે બંધાયેલું રહેવાને બદલે, મેમરી સિસ્ટમ હવે રૂપરેખાંકિત કરી શકાય તેવા પ્રાથમિક/ફૉલબૅક રાઉટિંગ સાથે બહુવિધ બેકએન્ડ (SQLite, Obsidian, Notion, કસ્ટમ HTTP બેકએન્ડ) ને સપોર્ટ કરે છે.

### આર્કિટેક્ચર

```
┌──────────────────────────────────────────────────────────┐
│                    API રૂટ્સ                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           સિંગલટન ઑર્કેસ્ટ્રેટર (manager.ts)             │
│                                                          │
│  પ્રાથમિક ──► બેકએન્ડ A  (દા.ત. SQLite)                  │
│  ફૉલબૅક ───► બેકએન્ડ B  (દા.ત. Obsidian)                │
│              બેકએન્ડ C  (દા.ત. GenericBackend મારફતે Notion)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ બેકએન્ડ    │ │ બેકએન્ડ    │ │ બેકએન્ડ (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### મુખ્ય ઇન્ટરફેસ (`backend.ts`)

દરેક બેકએન્ડે `MemoryBackend` ઇન્ટરફેસ અમલમાં મૂકવું આવશ્યક છે:

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

  // શોધ
  search(config: SearchConfig): Promise<Memory[]>;

  // આરોગ્ય
  health(): Promise<HealthCheckResult>;

  // જીવનચક્ર (વૈકલ્પિક)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

સિંગલટન ઑર્કેસ્ટ્રેટર, જે:

- `register(backend)` મારફતે બેકએન્ડને **રજિસ્ટર કરે છે** — બૂટ સમયે `index.ts` માંથી કૉલ કરવામાં આવે છે
- `configure(primary, fallbacks)` મારફતે પ્રાથમિક + ફૉલબૅકને **રૂપરેખાંકિત કરે છે**
- નિષ્ફળતા આવે ત્યારે ફૉલબૅક શૃંખલા સાથે CRUD/શોધને પ્રાથમિક તરફ **રાઉટ કરે છે**
- સમયાંતરે બધા બેકએન્ડની **આરોગ્ય ચકાસણી કરે છે**

**ફૉલબૅક વર્તન:**

| ઑપરેશન   | પ્રાથમિક                  | ફૉલબૅક                         |
| -------- | ------------------------- | ------------------------------ |
| `create` | ✅ ફક્ત પ્રાથમિક          | ❌                             |
| `get`    | ✅ પહેલાં પ્રાથમિક અજમાવો | ✅ null હોય તો ફૉલબૅક          |
| `update` | ✅ ફક્ત પ્રાથમિક          | ✅ પરિણામની રાહ જોયા વિના સિંક |
| `delete` | ✅ ફક્ત પ્રાથમિક          | ✅ પરિણામની રાહ જોયા વિના સિંક |
| `list`   | ✅ ફક્ત પ્રાથમિક          | ❌                             |
| `search` | ✅ પહેલાં પ્રાથમિક        | ✅ ભૂલ આવે ત્યારે ફૉલબૅક       |

#### GenericMemoryBackend (`genericBackend.ts`)

કોઈપણ REST API ને MemoryBackend માં અનુકૂલિત કરતું એક સામાન્ય HTTP કનેક્ટર. આ માટે ઉપયોગી:

- **Notion** — Notion API મારફતે કનેક્ટ કરો
- **Obsidian** — Obsidian Local REST API મારફતે કનેક્ટ કરો
- **કસ્ટમ બેકએન્ડ** — RESTful મેમરી API ઉપલબ્ધ કરાવતી કોઈપણ સેવા

**રૂપરેખાંકન:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // બેકએન્ડ APIનું મૂળ URL
  apiKey?: string;           // પ્રમાણીકરણ માટેનું Bearer ટોકન
  headers?: Record<string, string>;  // કસ્ટમ HTTP હેડર્સ
  timeout?: number;          // વિનંતીની સમયમર્યાદા (ડિફૉલ્ટ: 30000ms)
  backendType?: string;      // લૉગિંગ માટે

  // એન્ડપોઇન્ટ ઓવરરાઇડ્સ (ડિફૉલ્ટ્સ REST પરંપરાઓનો ઉપયોગ કરે છે)
  endpoints?: {
    search?: string;   // ડિફૉલ્ટ: "/memories/search"
    create?: string;   // ડિફૉલ્ટ: "/memories"
    list?: string;     // ડિફૉલ્ટ: "/memories"
    get?: string;      // ડિફૉલ્ટ: "/memories/{id}"
    update?: string;   // ડિફૉલ્ટ: "/memories/{id}"
    delete?: string;   // ડિફૉલ્ટ: "/memories/{id}"
    health?: string;   // ડિફૉલ્ટ: "/health"
  };

  // ક્વેરી પેરામીટર નામ મેપિંગ્સ
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // પાથ પેરામીટર નામ મેપિંગ્સ
  pathParams?: {
    id?/memoryId?
  };
}
```

**જાણીતાં બેકએન્ડ્સ** `KNOWN_BACKENDS`માં પૂર્વ-રૂપરેખાંકિત છે:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 તરફ નિર્દેશ કરતું GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 તરફ નિર્દેશ કરતું GenericMemoryBackend
```

#### બિલ્ટ-ઇન બેકએન્ડ્સ

##### SQLiteBackend (`sqliteBackend.ts`)

ડિફૉલ્ટ પ્રાથમિક બેકએન્ડ. `src/lib/memory/store.ts`નો ઉપયોગ કરીને હાલના SQLite-આધારિત મેમરી સ્ટોરને રૅપ કરે છે. બૂટ સમયે આપમેળે નોંધાય છે.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

હાલના Obsidian સંકલન (`src/lib/memory/obsidianBackend.ts`)ને રૅપ કરે છે. Obsidian Local REST API મારફતે Obsidian વૉલ્ટ સાથે જોડાય છે.

### સેટિંગ્સ

મેમરી બેકએન્ડ સેટિંગ્સ ઍપ સેટિંગ્સ ટેબલમાં સંગ્રહિત થાય છે અને `src/lib/memory/settings.ts` મારફતે સંચાલિત થાય છે:

| સેટિંગ              | Env/રૂપરેખાંકન કી        | ડિફૉલ્ટ    | વર્ણન                                    |
| ------------------- | ------------------------ | ---------- | ---------------------------------------- |
| પ્રાથમિક બેકએન્ડ    | `memoryPrimaryBackend`   | `"sqlite"` | પ્રાથમિક બેકએન્ડનું ID                   |
| ફૉલબૅક બેકએન્ડ્સ    | `memoryFallbackBackends` | `[]`       | ક્રમબદ્ધ ફૉલબૅક બેકએન્ડ IDs              |
| બેકએન્ડ રૂપરેખાંકનો | `memoryBackendConfigs`   | `{}`       | દરેક બેકએન્ડ માટેના રૂપરેખાંકન ઓવરરાઇડ્સ |

સેટિંગ્સને `normalizeMemorySettings()` મારફતે સામાન્યકૃત કરવામાં આવે છે અને `getMemorySettings()` પર કૅશ કરવામાં આવે છે.

### પ્રારંભિકીકરણ પ્રવાહ

```
ઍપ બુટસ્ટ્રૅપ
  → index.ts આયાત કરે છે (આડઅસર): SQLiteBackend નોંધે છે
  → ઍપ જીવનચક્રમાંથી initMemoryBackends() કૉલ થાય છે:
      1. સેટિંગ્સ લોડ કરો (getMemorySettings)
      2. પ્રાથમિક + ફૉલબૅક રૂપરેખાંકિત કરો
      3. તમામ બેકએન્ડ્સ પ્રારંભ કરો (આરોગ્ય તપાસ)
      4. વિનંતીઓ માટે તૈયાર
```

### નવું બેકએન્ડ ઉમેરવું

1. `src/lib/memory/<name>Backend.ts`માં **`MemoryBackend` અમલમાં મૂકો**
2. `src/lib/memory/index.ts`માંથી **નિકાસ કરો**
3. બૂટ સમયે `memoryManager.register(yourBackend)` વડે **નોંધણી કરો**
4. સેટિંગ્સ મારફતે **રૂપરેખાંકિત કરો**: `memoryPrimaryBackend`ને તમારા બેકએન્ડ ID પર સેટ કરો
5. સંદર્ભ તરીકે `src/lib/memory/__tests__/generic-backend.test.ts`નો ઉપયોગ કરીને **પરીક્ષણ કરો**

#### ઉદાહરણ: Brain બેકએન્ડ

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

### ચકાસણી

#### યુનિટ પરીક્ષણો

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

અપેક્ષિત આઉટપુટ: નીચેના મુદ્દાઓ આવરી લેતાં **35 પરીક્ષણો, બધાં સફળ**:

- કન્સ્ટ્રક્ટર (2)
- આરોગ્ય તપાસ (4) — સફળતા, નિષ્ફળતા 500, નેટવર્ક ભૂલ, વિલંબ
- પ્રારંભિકીકરણ (2) — સફળતા, નિષ્ફળતા
- બનાવવું (2) — ડિફૉલ્ટ એન્ડપોઇન્ટ, કસ્ટમ એન્ડપોઇન્ટ
- મેળવવું (4) — સફળતા, 404 → null, non-404 થ્રો, કસ્ટમ પાથ પેરામીટર્સ
- અપડેટ કરવું (2) — સફળતા, 404 → false
- કાઢી નાખવું (2) — સફળતા, 404 → false
- યાદી (2) — ક્વેરી પેરામીટર્સ, કસ્ટમ પેરામીટર નામો
- શોધ (3) — ક્વેરી પેરામીટર્સ, કસ્ટમ એન્ડપોઇન્ટ, વિકલ્પોનું સિરિયલાઇઝેશન
- પ્રમાણીકરણ હેડર્સ (2) — Bearer ટોકન, કસ્ટમ હેડર્સ
- ફૅક્ટરી (1)

#### પ્રકાર તપાસ

```bash
npm run typecheck:core
```

અપેક્ષિત: **0 ભૂલો**.
