# Memory System (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **સત્યનો સ્રોત:** `src/lib/memory/` અને `src/app/api/memory/`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40 (ડિફૉલ્ટ રૂપે બંધ + int8 ક્વોન્ટાઇઝેશન કૅચ-અપ)

OmniRoute API કી (અને વૈકલ્પિક રીતે સેશન id) દ્વારા ઓળખાતી સતત સંવાદાત્મક મેમરી પ્રદાન કરે છે. હળવા regex પેટર્ન મેચિંગ દ્વારા LLM પ્રતિસાદોમાંથી મેમરીઓ આપમેળે કાઢવામાં આવે છે અને ત્યારબાદની વિનંતીઓમાં પ્રારંભિક સિસ્ટમ સંદેશ તરીકે (અથવા સિસ્ટમ ભૂમિકાને નકારતા પ્રદાતાઓ માટે પ્રથમ વપરાશકર્તા સંદેશ તરીકે) ફરી દાખલ કરવામાં આવે છે.

> **મેમરી ડિફૉલ્ટ રૂપે બંધ છે (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` હવે
> `false` છે (`src/lib/memory/settings.ts`). મેમરી સક્ષમ કરવાથી મેળવેલા સંદર્ભના
> `maxTokens` (~2k) સુધીનો ભાગ **દરેક** ચેટ વિનંતીમાં દાખલ થાય છે, જેના માટે
> બિલ વસૂલવામાં આવે છે — નવા ઇન્સ્ટોલેશન અને પોતાનો સંદર્ભ સંચાલિત કરતા ક્લાયન્ટ્સ
> માટે આ એક અણધાર્યો ખર્ચ છે. **Settings → Memory** હેઠળ સ્પષ્ટ રીતે પસંદ કરીને સક્ષમ કરો
> (મેમરી સક્ષમ હોય ત્યારે `MemorySkillsTab` ટોકન-ખર્ચની ચેતવણી દર્શાવે છે).
> ક્લાયન્ટ `x-omniroute-no-memory` વિનંતી હેડર (`true`/`1`/`yes`) વડે એક જ વિનંતી
> માટે તેને બંધ કરી શકે છે — [API_REFERENCE.md](../reference/API_REFERENCE.md) માં
> વિનંતી-હેડર કોષ્ટક જુઓ. મેમરી વિનાની વિનંતી `memoryOwnerId = null` સેટ કરે છે,
> જે તે વિનંતી માટે મેમરી અને સ્કિલ ઇન્જેક્શન **બંને** અક્ષમ કરે છે
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

મેમરી **દરેક API કી પ્રમાણે સ્કોપ થયેલી છે**, દરેક વપરાશકર્તા પ્રમાણે નહીં — સમાન API કી વડે પ્રમાણિત થયેલી દરેક વિનંતી સમાન મેમરી પૂલ શેર કરે છે, જેમાં `sessionId` દ્વારા વધુ વૈકલ્પિક સ્કોપિંગ કરી શકાય છે.

## આર્કિટેક્ચર

```
ક્લાયન્ટ → /v1/chat/completions (apiKeyInfo અપસ્ટ્રીમમાં રિઝોલ્વ થયેલું)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id કાઢે છે
    → getMemorySettings()                     # કૅશ કરેલી સેટિંગ્સ
    → shouldInjectMemory(body, {enabled})     # ગેટ
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + વૈકલ્પિક વેક્ટર
    → injectMemory(body, memories, provider)  # સિસ્ટમ અથવા વપરાશકર્તા સંદેશ
  → અપસ્ટ્રીમ પ્રદાતા કૉલ
  → પ્રતિસાદ પર: extractFacts(text, apiKeyId, sessionId)  # અવરોધ ન સર્જે તે રીતે
    → setImmediate → દરેક મેળ માટે createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

ઇન્જેક્શન અને એક્સ્ટ્રેક્શન કૉલ-સાઇટ્સ `open-sse/handlers/chatCore.ts` માં જોડાયેલી છે (`retrieveMemories`, `injectMemory` અને `extractFacts` શોધો).

## એન્જિન આર્કિટેક્ચર (3-સ્તરીય રિઝોલ્યુશન)

મેમરી એન્જિન ઉપલબ્ધ ઇન્ફ્રાસ્ટ્રક્ચર અને સેટિંગ્સના આધારે રનટાઇમ દરમિયાન રિટ્રીવલ પાથ રિઝોલ્વ કરે છે. પ્રાથમિકતાના ક્રમમાં લાગુ થતા ત્રણ સ્તરો ઉપલબ્ધ છે:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  સ્તર 0 — કીવર્ડ (FTS5)                                      │
  │  પ્રોબ-આધારિત ઉપલબ્ધતા: SQLite બિલ્ડ તેને સપોર્ટ કરતું હોય   │
  │  ત્યારે FTS5 (better-sqlite3 / node:sqlite / bun:sqlite);    │
  │  FTS5 વિનાના બિલ્ડમાં અનુપલબ્ધ (દા.ત. sql.js/WASM —          │
  │  "no such module: fts5"). strategy = "exact" હોય ત્યારે અથવા │
  │  ફૉલબૅક તરીકે વપરાય છે; engine-status keyword પ્રોબ દર્શાવે છે.│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  સ્તર 1 — એમ્બેડેડ વેક્ટર (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 ને db.loadExtension() વડે લોડ કરવામાં આવે છે.│
  │  Float32 વેક્ટર્સ પર KNN બ્રુટ-ફોર્સ. આ સ્થિતિમાં સક્રિય:     │
  │   • sqlite-vec loadExtension સફળ થાય                         │
  │   • Float32Array બનાવી શકે એવો એમ્બેડિંગ સ્રોત ઉપલબ્ધ હોય    │
  │     (remote | static | transformers)                         │
  │   • vec_memories કોષ્ટક અસ્તિત્વમાં હોય (પ્રથમ ready() પર બને)│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  સ્તર 2 — Qdrant (પસંદગીથી સક્ષમ બાહ્ય વેક્ટર ડેટાબેઝ)       │
  │  સક્ષમ હોય ત્યારે semantic/hybrid માટે sqlite-vec ને બદલે છે. │
  │  ચાલતું Qdrant ઇન્સ્ટન્સ + રૂપરેખાંકિત host/port જરૂરી છે.    │
  └─────────────────────────────────────────────────────────────┘
```

ક્ષમતા ઘટાડો આપમેળે અને પારદર્શક રીતે થાય છે:

- જો sqlite-vec લોડ થવામાં નિષ્ફળ જાય, તો સ્તર 1 અનુપલબ્ધ બને છે → સ્તર 0 પર ફૉલબૅક થાય છે.
- જો એમ્બેડિંગ સ્રોત ભૂલ પરત કરે, તો સ્તર 1 સ્તર 0 પર ફૉલબૅક થાય છે.
- જો Qdrant સ્વસ્થ ન હોય, તો સ્તર 2 સ્તર 1 પર (અથવા સ્તર 1 પણ અનુપલબ્ધ હોય તો સ્તર 0 પર) ફૉલબૅક થાય છે.

## એમ્બેડિંગ સ્ત્રોતો

એમ્બેડિંગ લેયર (`src/lib/memory/embedding/`) `MemorySettingsExtended.embeddingSource`ના આધારે કયા સ્ત્રોતનો ઉપયોગ કરવો તે નક્કી કરે છે:

| સ્ત્રોત        | વર્ણન                                                                           | કી જરૂરી છે | કોલ્ડ સ્ટાર્ટ    |
| -------------- | ------------------------------------------------------------------------------- | ----------- | ---------------- |
| `remote`       | કૉન્ફિગર કરેલા પ્રદાતાની એમ્બેડિંગ API (OpenAI, Cohere વગેરે)નો ઉપયોગ કરે છે    | હા          | કોઈ નહીં         |
| `static`       | `potion-base-8M` દ્વારા સ્થાનિક લુકઅપ-ટેબલ એમ્બેડિંગ (WordPiece + મીન પૂલિંગ)   | ના          | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` દ્વારા સ્થાનિક ONNX ઇન્ફરન્સ | ના          | ~3s + ~400MB RAM |
| `auto`         | રનટાઇમ રિઝોલ્યુશન: remote (જો કી હોય) → static → transformers → null            | આધારિત છે   | આધારિત છે        |

**`auto` માટે રિઝોલ્યુશન ક્રમ:**

1. `listEmbeddingProviders()`માં `hasKey === true` ધરાવતો પ્રથમ પ્રદાતા શોધો → `remote`.
2. જો `settings.staticEnabled === true` હોય → `static`.
3. જો `settings.transformersEnabled === true` હોય → `transformers`.
4. અન્યથા → `null` (FTS5 કીવર્ડ શોધ પર અવક્રમિત થાય છે).

એમ્બેડિંગ કૅશ (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` દ્વારા કી કરેલો ઇન-મેમરી LRU મેપ વાપરે છે, જે વધુમાં વધુ `MEMORY_EMBEDDING_CACHE_MAX` એન્ટ્રીઓ (ડિફૉલ્ટ 1000) સુધી મર્યાદિત છે અને તેનો TTL `MEMORY_EMBEDDING_CACHE_TTL_MS` (ડિફૉલ્ટ 5 મિનિટ) છે. દરેક પ્રોસેસ લાઇફસાઇકલ દરમિયાન તે બધા કૉલર્સ વચ્ચે શેર થાય છે.

## હાઇબ્રિડ RRF (k=60)

જ્યારે `strategy = "hybrid"` હોય અને વેક્ટર સ્ટોર ઉપલબ્ધ હોય, ત્યારે રિટ્રીવલ FTS5 અને વેક્ટર પરિણામોને મર્જ કરવા માટે Reciprocal Rank Fusionનો ઉપયોગ કરે છે:

```
RRF(d) = Σ  1 / (k + rank_i(d))      જ્યાં k = 60 (MEMORY_RRF_K દ્વારા કૉન્ફિગર કરી શકાય છે)
          i
```

વિશેષરૂપે:

1. FTS5 શોધ ચલાવો → રેન્ક કરેલી યાદી `R_fts` (સ્થાન 1..N).
2. KNN વેક્ટર શોધ ચલાવો → રેન્ક કરેલી યાદી `R_vec` (સ્થાન 1..M).
3. દરેક અનન્ય `memoryId` માટે:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (યાદીમાં ન હોય તો 0).
4. `rrf_score` મુજબ DESC ક્રમમાં ગોઠવો, પછી ટોકન બજેટ વૉક લાગુ કરો.

વિષમ પ્રકારની રિટ્રીવલ સિસ્ટમોમાં સ્કોર નોર્મલાઇઝેશનની જરૂર વિના RRF અસરકારક હોવા માટે જાણીતું છે. ડિફૉલ્ટ `k=60` મૂળ Cormack et al. પેપરમાંથી લેવામાં આવ્યું છે અને નાના કોર્પસ (<10k મેમરીઝ) માટે સારી રીતે કાર્ય કરે છે.

## બૅકફિલ (લેઝી + રીઇન્ડેક્સ)

જ્યારે એમ્બેડિંગ મોડલ બદલાય છે (`embedding_signature` દ્વારા શોધવામાં આવે છે), ત્યારે વેક્ટર સ્ટોર ફરીથી બનાવવામાં આવે છે અને તમામ હાલની મેમરીઝને `memories` ટેબલમાં `needs_reindex = 1` તરીકે ચિહ્નિત કરવામાં આવે છે.

**લેઝી બૅકફિલ**: આગલી રિટ્રીવલ વખતે, વેક્ટર એન્ટ્રી ન ધરાવતી કોઈપણ મેમરીને એમ્બેડ કરીને શોધ શરૂ થાય તે પહેલાં `vec_memories`માં દાખલ કરવામાં આવે છે. આ સ્ટાર્ટઅપને અવરોધ્યા વિના વાસ્તવિક વિનંતીઓમાં બૅકફિલ ખર્ચનું ઍમોર્ટાઇઝેશન કરે છે.

**સ્પષ્ટ રીઇન્ડેક્સ**: `/dashboard/memory`માં આવેલ Engine ટૅબ એક "હમણાં રીઇન્ડેક્સ કરો" બટન પ્રદાન કરે છે, જે `POST /api/memory/reindex`ને કૉલ કરે છે. હૅન્ડલર `src/lib/memory/reindex.ts`માંથી `runReindexBatch()`ને કૉલ કરે છે, જે દરેક વિનંતી દીઠ વધુમાં વધુ `limit` બાકી એન્ટ્રીઓ પ્રોસેસ કરે છે. પ્રગતિ માટે `GET /api/memory/engine-status` (`vectorStore.needsReindex`) દ્વારા પોલ કરી શકાય છે.

`memory_vec_meta` ટેબલ (માઇગ્રેશન `083_memory_vec.sql`) આ માહિતી સંગ્રહે છે:

- `active_dim` — વર્તમાન વેક્ટર ડાઇમેન્શન (null = હજુ સુધી કૅલિબ્રેટ થયેલ નથી).
- `embedding_signature` — ફેરફારો શોધવા માટે વપરાતું `${source}:${model}:${dim}`.
- `last_reset_at` — છેલ્લા સંપૂર્ણ રીસેટનો ટાઇમસ્ટૅમ્પ.
- `vec_loaded` — sqlite-vec સફળતાપૂર્વક લોડ થયું હતું કે નહીં તે દર્શાવતો 0/1 ફ્લૅગ.

## સેટિંગ્સ એક્સ્ટેન્શન

`MemorySettingsExtended` માં નવ એમ્બેડિંગ અને વેક્ટર ફીલ્ડ ઉપલબ્ધ છે, જે
`src/shared/schemas/memory.ts` માં વ્યાખ્યાયિત છે અને `src/lib/db/settings.ts` દ્વારા પર્સિસ્ટ કરવામાં આવે છે:

| ફીલ્ડ                    | પ્રકાર                                             | ડિફૉલ્ટ  | વર્ણન                                                       |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | કયો એમ્બેડિંગ સ્રોત વાપરવો                                  |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ફોર્મેટમાં પ્રોવાઇડર/મોડેલ                 |
| `customBaseUrl`          | `string \| null`                                   | `null`   | માત્ર મેમરી માટેનો OpenAI-સુસંગત એન્ડપોઇન્ટ બેઝ URL         |
| `customModelId`          | `string \| null`                                   | `null`   | કસ્ટમ એન્ડપોઇન્ટને મોકલવામાં આવતું મોડેલ ID                 |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js માટે ઑપ્ટ-ઇન (MiniLM, ~400MB)               |
| `staticEnabled`          | `boolean`                                          | `false`  | સ્ટેટિક potion-base-8M લોકલ મોડેલ માટે ઑપ્ટ-ઇન              |
| `rerankEnabled`          | `boolean`                                          | `false`  | રીરૅન્કિંગ સ્ટેપ સક્ષમ કરો (દર વિનંતીએ +200-500ms ઉમેરે છે) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ફોર્મેટમાં રીરૅન્ક પ્રોવાઇડર/મોડેલ         |

`rerankProviderModel` ને `POST /v1/rerank` દ્વારા રિઝોલ્વ કરવામાં આવે છે (જેને લૂપબૅક પર કૉલ કરવામાં આવે છે), તેથી તે રૂટ જે કંઈ સ્વીકારે છે તે બધું આ પણ સ્વીકારે છે: પસંદગીપૂર્વક ગોઠવાયેલ ક્લાઉડ રીરૅન્ક મોડેલ (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) અથવા `<node-prefix>/<model>` તરીકે OpenAI-સુસંગત પ્રોવાઇડર નોડ (દા.ત. TEI/Infinity બૉક્સ માટે `skilled-mini/bge-reranker-v2-m3`). લૂપબૅક નોડ હંમેશાં પાત્ર હોય છે; બીજા હોસ્ટ (LAN, Tailscale) પરના નોડ માટે વધારામાં `RERANK_REMOTE_PROVIDER_NODES` ફીચર ફ્લૅગ આવશ્યક છે અને તેણે પ્રોવાઇડર આઉટબાઉન્ડ URL પૉલિસી પાસ કરવી આવશ્યક છે — [ફીચર ફ્લૅગ્સ](../reference/FEATURE_FLAGS.md) જુઓ. ડૅશબોર્ડ સિલેક્ટર પસંદગીપૂર્વક ગોઠવાયેલા પ્રોવાઇડર ઉપરાંત લોકલ નોડની યાદી દર્શાવે છે; કોઈપણ માન્ય `provider/model` સ્ટ્રિંગને `PUT /api/settings/memory` દ્વારા સીધું સેટ કરી શકાય છે.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | કયો વેક્ટર બૅકએન્ડ વાપરવો |

આ `GET /PUT /api/settings/memory` દ્વારા ઉપલબ્ધ કરાવવામાં આવે છે (સ્કીમા `MemorySettingsExtendedSchema`).

`remote` સ્રોત માટે, Memory વૈકલ્પિક `customBaseUrl` અને
`customModelId` સેટિંગ્સ પણ સ્વીકારે છે. બંને સાથે મળીને ગ્લોબલ એમ્બેડિંગ રજિસ્ટ્રી બદલ્યા વિના OpenAI-સુસંગત `/embeddings`
એન્ડપોઇન્ટ અને મોડેલ પસંદ કરે છે. ઉપયોગ પહેલાં એન્ડપોઇન્ટને
નોર્મલાઇઝ કરવામાં આવે છે અને પ્રોવાઇડર આઉટબાઉન્ડ URL પૉલિસી દ્વારા તપાસવામાં આવે છે: HTTP(S)
આવશ્યક છે, એમ્બેડ કરાયેલા ક્રેડેન્શિયલ્સ અને ક્વેરી સ્ટ્રિંગ્સ નકારવામાં આવે છે, અને ક્લાઉડ-મેટાડેટા
એડ્રેસ બ્લૉક જ રહે છે. ખાલી મૂલ્યો પસંદ કરેલા રજિસ્ટ્રી પ્રોવાઇડરને જાળવી રાખે છે. ડૅશબોર્ડને
પરત કરવામાં આવતી ભૂલોને સૅનિટાઇઝ કરવામાં આવે છે અને એન્ડપોઇન્ટ ક્રેડેન્શિયલ્સ ક્યારેય લૉગ કરવામાં આવતા નથી.

> **TODO (D20):** `global` સ્કોપ (તમામ API કી વચ્ચે મેમરીઓ શેર કરવી) આ રિલીઝમાં
> અમલમાં મૂકવામાં આવ્યો નથી. તેના માટે સ્કીમામાં ફેરફારો અને ગ્લોબલ રિટ્રીવલ
> પાથ જરૂરી છે. તેને અલગથી ટ્રૅક કરો.

## સ્ટોરેજ સ્તરો

### પ્રાથમિક: SQLite (`memories` ટેબલ)

માઇગ્રેશન `015_create_memories.sql` દ્વારા બનાવવામાં આવે છે:

| કૉલમ                        | પ્રકાર             | નોંધો                                                                           |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` દ્વારા જનરેટ કરાયેલ UUID                                  |
| `api_key_id`                | `TEXT NOT NULL`    | માલિકી ધરાવતી API કી                                                            |
| `session_id`                | `TEXT`             | વૈકલ્પિક પ્રતિ-વાતચીત સ્કોપ                                                     |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` માંથી એક                        |
| `key`                       | `TEXT`             | સ્થિર અપસર્ટ કી, દા.ત. `preference:i_prefer_python`                             |
| `content`                   | `TEXT NOT NULL`    | વાસ્તવિક હકીકતનું લખાણ                                                          |
| `metadata`                  | `TEXT`             | JSON બ્લૉબ (કૅટેગરી, extractedAt, સ્રોત, ...)                                   |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 સ્ટ્રિંગ્સ                                                             |
| `expires_at`                | `TEXT`             | વૈકલ્પિક સમાપ્તિ; `NULL` નો અર્થ કાયમી                                          |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDs ↔ FTS5 rowids ને જોડવા માટે `023_fix_memory_fts_uuid.sql` દ્વારા ઉમેરાયેલ |

ઇન્ડેક્સિસ: `api_key_id`, `session_id`, `type`, `expires_at`, ઉપરાંત અનન્ય
`memory_id` ઇન્ડેક્સ.

**અપસર્ટ સિમેન્ટિક્સ**: `createMemory()` સમાન
`(api_key_id, key)` ધરાવતી હાલની રો શોધે છે અને મળે ત્યારે તેને તેના સ્થાને અપડેટ કરે છે (`metadata` ને
શેલો સ્પ્રેડ દ્વારા મર્જ કરીને). આ પુનરાવર્તિત
પસંદગી નિવેદનોને કારણે ટેબલને અમર્યાદિત રીતે વધતું અટકાવે છે.

### પૂર્ણ-ટેક્સ્ટ શોધ (`memory_fts` વર્ચ્યુઅલ ટેબલ)

`022_add_memory_fts5.sql`, `content` અને
`key` પર FTS5 વર્ચ્યુઅલ ટેબલ બનાવે છે. `023_fix_memory_fts_uuid.sql` વાસ્તવિક પરિસ્થિતિની એવી બગ સુધારે છે જેમાં UUID
પ્રાથમિક કી FTS5 ના પૂર્ણાંક rowid સાથે જોડાતી નહોતી — માઇગ્રેશન
`memory_id` કૉલમ ઉમેરે છે, FTS ટેબલને ફરીથી બનાવે છે અને
ટ્રિગર્સ (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) જોડે છે, જે INSERT, DELETE અને UPDATE વખતે FTS ને સુમેળમાં રાખે છે.

`semantic` અને `hybrid` વ્યૂહરચનાઓ માટે `retrieval.ts` દ્વારા ઉપયોગમાં લેવાય છે (નીચે જુઓ).
પુનઃપ્રાપ્તિ કોડ `hasTable("memory_fts")` વડે સુરક્ષા કરે છે અને જો FTS ટેબલ
ગેરહાજર હોય અથવા FTS ક્વેરીમાં ભૂલ આવે તો કાલાનુક્રમિક ક્રમ પર પાછો ફરે છે.

### વૈકલ્પિક: Qdrant (વેક્ટર સ્ટોર ટિયર 2)

`src/lib/memory/qdrant.ts` ટિયર 2
વેક્ટર સ્ટોર તરીકે વૈકલ્પિક Qdrant ઇન્ટિગ્રેશન અમલમાં મૂકે છે. પુનઃપ્રાપ્તિ ફક્ત ત્યારે જ Qdrant તરફ રૂટ થાય છે જ્યારે એન્જિન સિલેક્ટર
`memoryVectorStore === "qdrant"` હોય — ડિફૉલ્ટ `"auto"` (અને `"sqlite-vec"`)
Qdrant ને **ક્યારેય** પસંદ કરતા નથી. Engine-ટૅબ ટૉગલ `qdrantEnabled` અને
`memoryVectorStore` **બંનેને** એકસાથે સેટ કરે છે: સક્ષમ કરવાથી Qdrant પ્રાથમિક સ્ટોર બને છે, જ્યારે અક્ષમ કરવાથી
તે `"auto"` પર રીસેટ થાય છે (#5597 — તે સુધારા પહેલાં, સક્ષમ કરવું નિષ્ક્રિય હતું કારણ કે કોઈપણ
એન્જિન સિલેક્ટર લખતું નહોતું). જો Qdrant સુધી પહોંચી ન શકાય અથવા તે કંઈ પરત ન કરે, તો પુનઃપ્રાપ્તિ
sqlite-vec → FTS5 પર પાછી ફરે છે.

- `upsertSemanticMemoryPoint()` — ગોઠવેલા embedding model વડે `key + content` ને embed કરે છે,
  collection અસ્તિત્વમાં હોવાની ખાતરી કરે છે (પ્રથમ ઉપયોગ વખતે cosine-distance
  vectors બનાવે છે), અને payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` સાથે point ને upsert કરે છે.
- `searchSemanticMemory(query, topK, scope)` — query ને embed કરે છે, `kind = "omniroute_memory"`
  દ્વારા ફિલ્ટર કરેલા collection માં શોધ કરે છે અને વૈકલ્પિક રીતે
  `apiKeyId` / `sessionId` દ્વારા પણ ફિલ્ટર કરે છે. `topK` ને `[1, 20]` સુધી મર્યાદિત કરે છે.
- `deleteSemanticMemoryPoint(id)` — એક point કાઢી નાખે છે. SQLite row દૂર થયા પછી
  `deleteMemory()` દ્વારા કૉલ કરવામાં આવે છે (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — એવા points ને એકસાથે કાઢી નાખે છે, જેમના
  `expiresAtUnix` ની તારીખ વીતી ગઈ હોય અથવા જેમના `createdAtUnix` ની તારીખ
  retention cutoff કરતાં જૂની હોય. પહેલાં ગણતરી કરે છે, જેથી dashboard વાસ્તવિક સંખ્યાઓ બતાવી શકે.
- `checkQdrantHealth()` — latency સાથે `GET /readyz` health probe.

Settings UI, `/dashboard/memory` ના **Engine tab** માં Qdrant config, health check, semantic search test
અને cleanup ઉપલબ્ધ કરાવે છે. `src/app/api/settings/qdrant/` હેઠળના સંબંધિત
routes v3.8.6 થી સંપૂર્ણપણે જોડાયેલા છે:

| Route                                   | Method        | વર્ણન                             |
| --------------------------------------- | ------------- | --------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings વાંચો / અપડેટ કરો |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency          |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test              |
| `/api/settings/qdrant/cleanup`          | `POST`        | સમયસમાપ્ત / જૂના points દૂર કરો   |
| `/api/settings/qdrant/embedding-models` | `GET`         | ઉપલબ્ધ embedding models ની યાદી   |

**વર્તન નોંધો (શું અપેક્ષિત છે):**

- **Engine પસંદગી** — Engine tab માં Qdrant સક્ષમ કરવાથી તે primary
  store બને છે (`memoryVectorStore="qdrant"` સેટ કરે છે); અક્ષમ કરવાથી તે `"auto"` પર રીસેટ થાય છે (#5597).
- **કોઈ back-fill નથી** — Qdrant સક્ષમ કર્યા **પછી** બનાવેલી/અપડેટ કરેલી memories જ
  તેમાં લખવામાં આવે છે (fire-and-forget dual-write). પહેલાંથી અસ્તિત્વમાં રહેલી SQLite memories ને
  migrate કરવામાં આવતી **નથી**; "Reindex Now" માત્ર sqlite-vec index ફરીથી બનાવે છે, Qdrant ને નહીં.
- **Vector dimension આપમેળે શોધાય છે** — પ્રથમ ઉપયોગ વખતે વાસ્તવિક embedding પરથી;
  ભરવા માટે કોઈ dimension field નથી. Collection અસ્તિત્વમાં આવ્યા પછી embedding model બદલવાની પ્રક્રિયા
  આપમેળે સંભાળવામાં આવતી **નથી**: હાલનું collection યથાવત્ રહે છે, dimension-
  mismatched writes/searches નિષ્ફળ જાય છે અને sqlite-vec પર fallback થાય છે. Embedder બદલવા માટે collection
  ફરીથી બનાવો (નવું નામ આપો અથવા તેને Qdrant માં કાઢી નાખો).
- **Distance metric** — હંમેશા **Cosine** (collection બનાવતી વખતે hardcoded;
  રૂપરેખાંકિત કરી શકાય તેમ નથી).
- **Auth** — માત્ર API key (`api-key` header તરીકે મોકલાય છે; authentication વગરના
  local Docker માટે વૈકલ્પિક). JWT/RBAC નો ઉપયોગ થતો નથી.
- **Config fields** — UI `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` ઉપલબ્ધ કરાવે છે. `vectorSize` / `hnswEfConstruct` માત્ર env/DB માટે છે અને collection
  બનાવવા માટે `vectorSize` નો ઉપયોગ થતો નથી (dimension embedding માંથી આવે છે).

### Vector quantization (int8 — opt-in, બંને backends)

બંને vector backends, સંગ્રહિત vectors ની memory
footprint ઘટાડવા માટે (~Float32 કરતાં 4× નાની), recall માં થોડા ઘટાડાના બદલામાં **opt-in int8 quantization** ને સમર્થન આપે છે.
બંનેમાં default **off** છે — સ્પષ્ટ રીતે સક્ષમ ન કરવામાં આવે ત્યાં સુધી vectors full-precision રહે છે.

| Backend    | Setting                         | Type                           | Default  | ક્યાં વાંચવામાં આવે છે                                      |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ને `qdrantQuantization` setting
  key દ્વારા દરેક instance પ્રમાણે ગોઠવવામાં આવે છે (`PUT /api/settings/qdrant` પર `quantization` field તરીકે ઉપલબ્ધ). જ્યારે
  `"int8"` હોય, ત્યારે `buildQuantizationConfig()` scalar quantization
  (`always_ram`, quantile `0.99`) ની વિનંતી કરે છે અને searches `rescore: true` સક્ષમ કરે છે, જેથી
  full-precision vectors int8 candidate set ને વધુ ચોક્કસ બનાવે છે.
- **sqlite-vec** quantization ફક્ત **environment-only** છે (DB setting નથી): સ્થાનિક vectors ને
  `vec_quantize_int8(?, 'unit')` દ્વારા `int8[dim]`
  column તરીકે સંગ્રહવા માટે `MEMORY_VEC_QUANTIZATION=int8` સેટ કરો. પસંદ કરેલ mode ને
  `embedding_signature` માં (`:int8` suffix તરીકે) સમાવવામાં આવે છે, તેથી modes બદલવાથી
  `vec_memories` table નું સંપૂર્ણ reindex શરૂ થાય છે — embedding model બદલાય ત્યારે ઉપયોગમાં લેવાતો
  એ જ lazy-backfill માર્ગ.

## મેમરીના પ્રકારો

`MemoryType` (`src/lib/memory/types.ts`):

| પ્રકાર       | શેના માટે વપરાય છે                                                                     |
| ------------ | -------------------------------------------------------------------------------------- |
| `factual`    | પસંદગીઓ, સ્થિર વપરાશકર્તા તથ્યો, વર્તણૂકની પેટર્ન                                      |
| `episodic`   | ચોક્કસ ક્ષણ સાથે જોડાયેલા નિર્ણયો ("મેં Postgres પસંદ કર્યું")                         |
| `procedural` | વર્કફ્લો / કેવી રીતે કરવું તેની મેમરી (આરક્ષિત; હાલમાં કોઈ સ્વચાલિત એક્સ્ટ્રેક્ટર નથી) |
| `semantic`   | વેક્ટર-સ્ટોર એન્ટ્રીઓ માટે આરક્ષિત                                                     |

`MemoryConfig` ની પુનઃપ્રાપ્તિ વ્યૂહરચના `exact`, `semantic`, અથવા `hybrid`
માંથી એક હોય છે, અને સ્કોપ `session`, `apiKey`, અથવા `global` માંથી એક હોય છે.
`getMemorySettings()` નો ડિફૉલ્ટ સ્કોપ `apiKey` છે.

## તથ્ય નિષ્કર્ષણ (`extraction.ts`)

નિષ્કર્ષણ LLM-આધારિત નહીં, પરંતુ **regex-આધારિત** છે — તે
`setImmediate()` સાથે ઇન-પ્રોસેસ ચાલે છે, જેથી તે પ્રતિસાદ સ્ટ્રીમને ક્યારેય
અવરોધતું નથી:

- **પસંદગી પેટર્ન** → `MemoryType.FACTUAL`
  (દા.ત. `હું … પસંદ કરું છું`, `મને ખરેખર … ગમે છે`, `મારું મનપસંદ … છે`, `મને … નફરત છે`)
- **નિર્ણય પેટર્ન** → `MemoryType.EPISODIC`
  (દા.ત. `હું … વાપરીશ`, `મેં … પસંદ કર્યું`, `મેં … અપનાવ્યું`, `હું … અપનાવવા જઈ રહ્યો છું`)
- **વર્તણૂક પેટર્ન** → `MemoryType.FACTUAL`
  (દા.ત. `હું સામાન્ય રીતે …`, `હું હંમેશાં …`, `હું … કરવાનું વલણ ધરાવું છું`)

દરેક મેળને શુદ્ધ કરવામાં આવે છે (`trim`, ખાલી જગ્યાઓનું સંકોચન, મહત્તમ 500 અક્ષરો),
સ્થિર `factKey(category, content)` મારફતે બૅચની અંદર ડિડુપ્લિકેટ કરવામાં આવે છે,
અને `{category, extractedAt, source: "llm_response"}` મેટાડેટા સાથે
`createMemory()` મારફતે સંગ્રહિત કરવામાં આવે છે. ઇનપુટ ટેક્સ્ટને
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) સુધી મર્યાદિત કરવામાં આવે છે — જો તેનાથી
લાંબું હોય, તો ટેક્સ્ટનો **અંતિમ ભાગ** વપરાય છે, જેથી સહાયકની સૌથી તાજેતરની
સામગ્રી હંમેશાં સામેલ થાય.

`extractFactsFromText(text)` ને પરીક્ષણો માટે એક્સપોર્ટ કરવામાં આવ્યું છે અને તે
તથ્યોને સંગ્રહિત કર્યા વિના સંરચિત સ્વરૂપે પરત કરે છે.

## પુનઃપ્રાપ્તિ (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` મુખ્ય પ્રવેશ બિંદુ છે. તે:

1. `MemoryConfigSchema` મારફતે config ને સામાન્યકૃત અને માન્ય કરે છે.
2. જ્યારે `enabled` false હોય અથવા `maxTokens <= 0` હોય ત્યારે તરત જ `[]` પરત કરે છે.
3. `maxTokens` ને `[1, 8000]` ની મર્યાદામાં રાખે છે.
4. આધુનિક `memories` ટેબલ અસ્તિત્વમાં છે કે નહીં (લેગસી `memory`
   ટેબલની તુલનામાં) તે શોધે છે, જેથી જૂના ડેટાબેસ કાર્યરત રહે.
5. સમાપ્તિ સુરક્ષા
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), વૈકલ્પિક
   સેશન સ્કોપ અને વૈકલ્પિક `retentionDays` કટઑફ સાથે બેઝ ક્વેરી બનાવે છે.
6. વ્યૂહરચના પ્રમાણે શાખા પસંદ કરે છે:
   - **`exact`** (ડિફૉલ્ટ): સમયક્રમિક `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: જો `config.query` અને `memory_fts` અસ્તિત્વમાં હોય, તો
     `memory_fts MATCH ?` ને JOIN કરે છે અને FTS રૅન્ક પ્રમાણે ક્રમબદ્ધ કરે છે;
     જ્યારે FTS 0 પંક્તિઓ પરત કરે ત્યારે સમયક્રમિક ક્રમ પર પાછું જાય છે.
   - **`hybrid`**: FTS પરિણામો (વધુ સુસંગતતા) અને સમયક્રમિક સમૂહનું યુનિયન,
     id દ્વારા ડિડુપ્લિકેટ કરેલું.
7. જ્યારે ક્વેરી આપવામાં આવી હોય ત્યારે `content`, `key`, અને `metadata` JSON
   પર કીવર્ડ સુસંગતતા સ્કોર (`getRelevanceScore`) ગણે છે. શૂન્ય સ્કોર ધરાવતી
   પંક્તિઓ ફિલ્ટર કરીને દૂર કરવામાં આવે છે.
8. પ્રથમ સ્કોરના ઉતરતા ક્રમમાં અને પછી `createdAt` ના ઉતરતા ક્રમમાં ગોઠવે છે.
9. રૅન્ક કરેલી સૂચિમાંથી પસાર થાય છે અને જ્યાં સુધી ચાલુ
   `estimateTokens(content)` (≈ `length / 4`) બજેટ હેઠળ રહે ત્યાં સુધી
   એન્ટ્રીઓ સ્વીકારે છે. કોઈ મેળ ઉપલબ્ધ હોય ત્યારે હંમેશાં ઓછામાં ઓછી એક
   એન્ટ્રી પરત કરે છે.

`estimateTokens` ને એક્સપોર્ટ કરવામાં આવ્યું છે અને તેનો ઉપયોગ પુનઃપ્રાપ્તિ,
સારાંશીકરણ અને MCP `omniroute_memory_search` ટૂલ દ્વારા થાય છે.

## ઇન્જેક્શન (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. મેમરીની બધી સામગ્રીને એક જ `Memory context: …` સ્ટ્રિંગમાં જોડે છે.
2. પ્રદાતાના નામના આધારે વ્યૂહરચના પસંદ કરે છે:
   - **સિસ્ટમ સંદેશ** (OpenAI, Anthropic, Gemini, … માટે ડિફૉલ્ટ) — કોઈપણ હાલના સિસ્ટમ
     સંદેશાઓની આગળ `{role: "system", content: memoryText}` ઉમેરે છે, જેથી વપરાશકર્તાના સિસ્ટમ પ્રોમ્પ્ટ્સને હજુ પણ પ્રાથમિકતા મળે.
   - **વપરાશકર્તા સંદેશ** (ફૉલબૅક) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`માંના
     પ્રદાતાઓ માટે: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. આ સિસ્ટમ રોલને નકારે છે
     અને અન્યથા 400 ભૂલ આપે છે (GLM/Zhipu માટે issue #1701 જુઓ).
3. `memory.injection.injected` હેઠળ સંખ્યા, વ્યૂહરચના અને મૉડલ લૉગ કરે છે.

પોતાના રૂટિંગ નિર્ણયો લેવાની જરૂર હોય એવા કૉલર્સ માટે
`providerSupportsSystemMessage(provider)` એક્સપોર્ટ કરવામાં આવ્યું છે. સુરક્ષા માટે અજાણ્યા પ્રદાતાઓમાં ડિફૉલ્ટ રૂપે `true`
(સિસ્ટમ રોલની મંજૂરી) હોય છે.

## સેટિંગ્સ (`settings.ts`)

મેમરી કૉન્ફિગરેશન env varsમાં નહીં, પરંતુ **DB સેટિંગ્સ ટેબલમાં સંગ્રહિત થાય છે**.
`getMemorySettings()`, `getSettings()`માંથી વાંચે છે અને પરિણામને
પ્રોસેસમાં કૅશ કરે છે; લખાણ પૂર્ણ થયા પછી સેટિંગ્સ PUT
રૂટ દ્વારા `invalidateMemorySettingsCache()` કૉલ કરવામાં આવે છે.

### લેગસી ફીલ્ડ્સ (તમામ વર્ઝન)

| DB કી                 | પ્રકાર   | ડિફૉલ્ટ                                             | UI નિયંત્રણ                                          |
| --------------------- | -------- | --------------------------------------------------- | ---------------------------------------------------- |
| `memoryEnabled`       | બુલિયન   | `false` (v3.8.30થી ડિફૉલ્ટ રૂપે બંધ)                | મેમરી ચાલુ/બંધ                                       |
| `memoryMaxTokens`     | પૂર્ણાંક | `2000` (રેન્જ `0–16000`)                            | ઇન્જેક્શન માટે ટોકન બજેટ                             |
| `memoryRetentionDays` | પૂર્ણાંક | `30` (રેન્જ `1–365`)                                | જાળવણી અવધિ                                          |
| `memoryStrategy`      | enum     | `"hybrid"` (`recent`, `semantic`, `hybrid`માંથી એક) | પુનઃપ્રાપ્તિ વ્યૂહરચના                               |
| `skillsEnabled`       | બુલિયન   | `false`                                             | પ્રતિ-કી સ્કિલ ઇન્જેક્શન ટૉગલ કરે છે (SKILLS.md જુઓ) |

નોંધ: UI વ્યૂહરચના `"recent"`, `toMemoryRetrievalConfig()` મારફતે આંતરિક `"exact"` પુનઃપ્રાપ્તિ
વ્યૂહરચના સાથે મૅપ થાય છે (કાલાનુક્રમિક ક્રમ).

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
`qdrantApiKey`, `qdrantCollection`નો ડિફૉલ્ટ `"omniroute_memory"`,
`qdrantEmbeddingModel`નો ડિફૉલ્ટ `"openai/text-embedding-3-small"`) `qdrant.ts`માંના
`normalizeQdrantConfig()` દ્વારા વાંચવામાં આવે છે.

### એન્વાયર્નમેન્ટ વેરિએબલ્સ (v3.8.6)

છ વૈકલ્પિક env vars એન્જિનના રનટાઇમ વર્તનને સમાયોજિત કરે છે (`.env.example`માં દસ્તાવેજીકૃત):

| વેરિએબલ                         | ડિફૉલ્ટ                    | વર્ણન                                                                                                                                                   |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | એમ્બેડિંગ કૅશ TTL (5 મિનિટ)                                                                                                                             |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | એમ્બેડિંગ LRU કૅશમાં મહત્તમ એન્ટ્રીઓ                                                                                                                    |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js મૉડલ માટે HF રેપો                                                                                                                       |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | સ્ટૅટિક potion મૉડલ માટે HF રેપો                                                                                                                        |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ડાઉનલોડ કરેલા મૉડલ્સ ક્યાં સંગ્રહવા                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | વેક્ટર શોધ માટે ડિફૉલ્ટ ટૉપ-K                                                                                                                           |
| `MEMORY_RRF_K`                  | `60`                       | હાઇબ્રિડ શોધ માટે RRF k અચલાંક                                                                                                                          |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | સ્થાનિક sqlite-vec વેક્ટર્સને ક્વૉન્ટાઇઝ્ડ સ્વરૂપે સંગ્રહવા માટે `int8` પર સેટ કરો (~4× નાના; ઑપ્ટ-ઇન). મોડમાં ફેરફાર ફરજિયાત રીતે રીઇન્ડેક્સ કરાવે છે. |

## સારાંશીકરણ (`summarization.ts`)

જ્યારે કોઈ કીની મેમરીઓમાં ચાલી રહેલા ટોકનનો કુલ સરવાળો બજેટ કરતાં વધી જાય ત્યારે `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` જૂની સામગ્રીને સંક્ષિપ્ત કરે છે. તે `created_at` મુજબ DESC ક્રમમાં પંક્તિઓ પર પુનરાવર્તન કરે છે, મર્યાદામાં સમાતી પંક્તિઓ જાળવી રાખે છે અને બાકીની પંક્તિઓમાં `content` ને મૂળ સામગ્રીનાં પ્રથમ ત્રણ વાક્યોથી તે જ સ્થાને બદલે છે. `tokensSaved` એ જૂની અને નવી સામગ્રી વચ્ચેના `estimateTokens` નો તફાવત છે.

વર્તમાન ચેટ પાઇપલાઇનમાં આ રૂટિન **ઉપલબ્ધ છે, પરંતુ આપમેળે કૉલ થતું નથી** — જો તમને સતત સંક્ષિપ્તીકરણની જરૂર હોય, તો તેને cron, એડમિન ક્રિયા અથવા `MemoryConfig.autoSummarize` સંકલનમાંથી કૉલ કરો. ડેટાની ખોટ એકમાર્ગી છે: મૂળ ટેક્સ્ટ ફરીથી લખાઈ જાય છે.

## REST API

તમામ એન્ડપોઇન્ટ માટે મેનેજમેન્ટ પ્રમાણીકરણ (`requireManagementAuth`) જરૂરી છે.

### મુખ્ય મેમરી એન્ડપોઇન્ટ (હાલના + અપડેટ કરેલા)

| પદ્ધતિ   | પાથ                  | વર્ણન                                                                                                                                                                                                  |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | ફિલ્ટર સાથે પૃષ્ઠાંકિત સૂચિ: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. પ્રતિસાદમાં `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` સામેલ છે                    |
| `POST`   | `/api/memory`        | એન્ટ્રી બનાવે છે (Zod દ્વારા માન્ય કરાયેલ: `content`, `key`, વૈકલ્પિક `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `createMemory()` ને કૉલ કરે છે, જે `(apiKeyId, key)` પર upsert કરે છે |
| `GET`    | `/api/memory/[id]`   | UUID દ્વારા એક એન્ટ્રી મેળવે છે                                                                                                                                                                        |
| `PUT`    | `/api/memory/[id]`   | એન્ટ્રીનાં ક્ષેત્રો (`type`, `key`, `content`, `metadata`) અપડેટ કરે છે. બોડી: `MemoryUpdatePutSchema`. એમ્બેડિંગ સ્રોત ઉપલબ્ધ હોય તો વેક્ટરને પણ સમન્વિત કરે છે.                                      |
| `DELETE` | `/api/memory/[id]`   | એન્ટ્રી કાઢી નાખે છે; `vec_memories` (D15) અને શ્રેષ્ઠ પ્રયાસના ધોરણે Qdrantમાંથી પણ કાઢી નાખે છે. એન્ટ્રી ન મળે ત્યારે 404 પરત કરે છે.                                                                |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` ચલાવે છે — બનાવવું→સૂચિબદ્ધ કરવું→કાઢી નાખવું એવી સંપૂર્ણ પ્રક્રિયા. `{working, latencyMs, error?}` પરત કરે છે                                              |

### નવા મેમરી એન્જિન એન્ડપોઇન્ટ (યોજના 21)

| પદ્ધતિ | પાથ                               | વર્ણન                                                                                                                                                               |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` નો ડ્રાય-રન — સ્કોર, સ્તર અને ટોકન સાથે ક્રમાંકિત પરિણામો પરત કરે છે. બોડી: `RetrievePreviewSchema`. મેમરીઓ દાખલ કે સંશોધિત કરતું નથી.           |
| `GET`  | `/api/memory/embedding-providers` | એમ્બેડિંગ મોડલ સાથે પ્રદાતાઓની સૂચિ આપે છે અને કોના માટે API કી ગોઠવેલી છે તે દર્શાવે છે.                                                                           |
| `GET`  | `/api/memory/engine-status`       | એન્જિનની સંપૂર્ણ સ્થિતિ પરત કરે છે: કીવર્ડ સ્તર, એમ્બેડિંગ રિઝોલ્યુશન, વેક્ટર સ્ટોરના આંકડા, Qdrantની સ્થિતિ અને પુનઃક્રમ config. આકાર: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | મેમરી સંક્ષિપ્તીકરણ મેન્યુઅલી ટ્રિગર કરે છે. બોડી: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` પરત કરે છે.        |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ધરાવતી મેમરીઓ માટે વેક્ટર પુનઃઅનુક્રમણિકા ટ્રિગર કરે છે. બોડી: `MemoryReindexSchema` (`force`). `{started, pending}` પરત કરે છે.                  |

### સેટિંગ્સ એન્ડપોઇન્ટ

| પદ્ધતિ | પાથ                                     | વર્ણન                                                                                                     |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | વર્તમાન સામાન્યકૃત `MemorySettingsExtended` (7 નવા ક્ષેત્રો + લેગસી)                                      |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` માંથી કોઈપણ ક્ષેત્ર અપડેટ કરે છે (કુલ 12 ક્ષેત્રો)                         |
| `GET`  | `/api/settings/qdrant`                  | વર્તમાન Qdrant સેટિંગ્સ (`QdrantSettingsSchema`)                                                          |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant સેટિંગ્સ અપડેટ કરે છે. બોડી: `QdrantSettingsUpdateSchema`. `apiKey` = ખાલી સ્ટ્રિંગ કી દૂર કરે છે. |
| `GET`  | `/api/settings/qdrant/health`           | ગોઠવેલા Qdrant ઇન્સ્ટન્સ સામે જીવંતતા ચકાસણી. `QdrantHealthResultSchema` પરત કરે છે.                      |
| `POST` | `/api/settings/qdrant/search`           | Qdrant સામે સિમેન્ટિક શોધનું પરીક્ષણ. બોડી: `QdrantSearchSchema` (`query`, `topK`).                       |
| `POST` | `/api/settings/qdrant/cleanup`          | સમાપ્ત થયેલી / જૂની મેમરીઓ માટેના Qdrant પોઇન્ટ દૂર કરે છે.                                               |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant માટે ઉપલબ્ધ એમ્બેડિંગ મોડલની સૂચિ આપે છે.                                                          |

`/api/memory` સૂચિ ક્વેરી `page`-આધારિત પૃષ્ઠાંકન
(`parsePaginationParams`) **અથવા** સીધા `offset` ને સપોર્ટ કરે છે — જ્યારે `offset` હાજર હોય ત્યારે
તેને અગ્રતા મળે છે અને પ્રતિસાદના આકાર માટે તેમાંથી `page` ગણવામાં આવે છે.

## MCP ટૂલ્સ (`open-sse/mcp-server/tools/memoryTools.ts`)

જ્યારે MCP સર્વર સક્ષમ હોય, ત્યારે ત્રણ મેમરી ટૂલ્સ રજિસ્ટર થાય છે:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`ને આવરે છે. v3.8.6 (D16)થી, `strategy`ને `"exact"` તરીકે
  હાર્ડકોડ કરવાને બદલે `getMemorySettings()`માંથી વાંચવામાં આવે છે. જો
  `query` આપવામાં આવી હોય અને `strategy`, `semantic` અથવા `hybrid` હોય, તો ઉપલબ્ધ
  હોય ત્યારે વેક્ટર સ્ટોરનો ઉપયોગ થાય છે.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`ને આવરે છે. માત્ર 4 પ્રમાણભૂત પ્રકારો સ્વીકારે છે:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → મેળ ખાતી
  એન્ટ્રીઓની યાદી બનાવે છે, વૈકલ્પિક રીતે નિર્ધારિત સમય પહેલાં બનાવેલી એન્ટ્રીઓને ફિલ્ટર કરે છે અને પછી દરેકને
  `deleteMemory()` દ્વારા કાઢી નાખે છે (જે sqlite-vec + Qdrantમાંથી વેક્ટર્સ પણ દૂર કરે છે).

ટ્રાન્સપોર્ટ અને સ્કોપની વિગતો માટે [MCP-SERVER.md](./MCP-SERVER.md) જુઓ.

## ડૅશબોર્ડ (મેમરી સ્ટુડિયો)

`src/app/(dashboard)/dashboard/memory/page.tsx` હવે **3-ટૅબ સ્ટુડિયો** છે:

### ટૅબ: મેમરીઝ

- કૉન્સેપ્ટ કાર્ડ (સંકોચી શકાય તેવું "તે કેવી રીતે કાર્ય કરે છે" સમજૂતી વિભાગ).
- રિયલ-ટાઇમ યાદી, શોધ અને પેજિનેશન (300 ms ડિબાઉન્સ સાથે).
- પ્રકાર ફિલ્ટર (`factual` / `episodic` / `procedural` / `semantic` / બધા).
- મેમરી ઉમેરવા માટેનું મોડલ (કી, સામગ્રી, પ્રકાર).
- ઇનલાઇન સંપાદન (પેન્સિલ બટન → `PUT /api/memory/[id]`).
- દરેક પંક્તિ માટે કાઢી નાખવાનો વિકલ્પ (પુષ્ટિકરણ ડાયલૉગ સાથે).
- વર્તમાન પેજનું JSON નિકાસ; ફાઇલ પિકર દ્વારા JSON આયાત.
- આંકડાકીય કાર્ડ્સ: `totalEntries`, `tokensUsed`, `hitRate`.
- "જૂની મેમરીઝ સંકુચિત કરો" બટન → `POST /api/memory/summarize` (પહેલાં ડ્રાય-રન
  ઉમેદવારોની સંખ્યા દર્શાવે છે, ત્યારબાદ પુષ્ટિ કરાવે છે).
- `GET /api/memory/health` દ્વારા નિયંત્રિત લીલું/લાલ સ્વાસ્થ્ય સૂચક બિંદુ.

### ટૅબ: પ્લેગ્રાઉન્ડ

- ક્વેરી ઇનપુટ + વ્યૂહરચના પસંદગીકાર (ચોક્કસ / સિમેન્ટિક / હાઇબ્રિડ) + ટોકન બજેટ.
- "સિમ્યુલેટ કરો" → `POST /api/memory/retrieve-preview` — ક્રમબદ્ધ પરિણામો
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` સાથે દર્શાવે છે.
- કયો એમ્બેડિંગ સ્રોત / વેક્ટર સ્ટોર ઉપયોગમાં લેવાયો હતો અને
  ફૉલબૅક થયો હતો કે નહીં તે દર્શાવતી રિઝોલ્યુશન પેનલ.

### ટૅબ: એન્જિન

- એન્જિન સ્થિતિ પેનલ (કીવર્ડ FTS5 ચિપ, એમ્બેડિંગ ચિપ, વેક્ટર સ્ટોર ચિપ,
  Qdrant સ્વાસ્થ્ય ચિપ, રીરૅન્ક ચિપ).
- "હમણાં ફરી ઇન્ડેક્સ કરો" બટન → `POST /api/memory/reindex`.
- એમ્બેડિંગ સ્રોત પસંદગીકાર (સ્વચાલિત / રિમોટ / સ્ટેટિક / ટ્રાન્સફોર્મર્સ + ટૉગલ્સ).
- Qdrant કૉન્ફિગ કાર્ડ (સક્ષમ કરવાનો ટૉગલ, હોસ્ટ/પોર્ટ/કલેક્શન/કી, કનેક્શન પરીક્ષણ,
  સિમેન્ટિક શોધ પરીક્ષણ, ક્લીનઅપ).
- રીરૅન્ક કૉન્ફિગ કાર્ડ (સક્ષમ કરવાનો ટૉગલ, પ્રોવાઇડર/મોડલ પસંદગીકાર).

મેમરી અને Qdrant સેટિંગ્સ લેગસી/ગ્લોબલ સેટિંગ્સ સપાટી માટે
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) હેઠળ પણ ઉપલબ્ધ છે.

## કૅશિંગ

`src/lib/memory/store.ts`, `getMemory(id)` રીડ્સ માટે ઇન-પ્રોસેસ LRU-જેવો કૅશ
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, જેમાં સૌથી જૂની 20 %
એન્ટ્રીઓ દૂર કરવામાં આવે છે) જાળવે છે, તેમજ પોતાનો સ્કોપ કરેલો કૅશ ઇચ્છતા કૉલર્સ દ્વારા ઉપયોગમાં લેવાતું
`get`/`set`/`invalidate` મેથડ્સ ધરાવતું સામાન્ય કી/વેલ્યુ `memoryCache` સ્તર
(`src/lib/memory/cache.ts`) પણ જાળવે છે (1 000-એન્ટ્રી LRU,
ડિફૉલ્ટ TTL 5 min).

## ગોપનીયતા અને જીવનચક્ર

- મેમરીની માલિકી API કી idની છે (`chatCore.ts`માં `resolveMemoryOwnerId`). `apiKeyInfo.id` વિના પુનઃપ્રાપ્તિ, ઇન્જેક્શન કે નિષ્કર્ષણમાંથી કંઈપણ ચાલતું નથી.
- ભવિષ્યનું `expires_at` ધરાવતી એન્ટ્રીઓને પુનઃપ્રાપ્તિમાંથી ફિલ્ટર કરવામાં આવે છે; `retentionDays` કરતાં જૂની એન્ટ્રીઓને `retrieveMemories`માંના `created_at >= cutoff` ક્લોઝ દ્વારા બાકાત રાખવામાં આવે છે.
- કાયમી કાઢી નાખવા માટે, `DELETE /api/memory/[id]` અથવા `omniroute_memory_clear`નો ઉપયોગ કરો.
- નિષ્કર્ષણ `setImmediate` મારફતે ફાયર-એન્ડ-ફોરગેટ રીતે થાય છે; નિષ્ફળતાઓ `memory.extraction.background.failed` હેઠળ લૉગ થાય છે અને કૉલર સુધી ક્યારેય પહોંચતી નથી.
- ચકાસણી રાઉન્ડ-ટ્રિપ્સ (`verifyExtractionPipeline`) પોતાની ટેસ્ટ એન્ટ્રીઓને `finally` બ્લૉકમાં સાફ કરે છે.

## આ પણ જુઓ

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` સેટિંગ મેમરીની સાથે ટૂલની વ્યાખ્યાઓ ઇન્જેક્ટ કરે છે.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ટ્રાન્સપોર્ટ / સ્કોપ્સ.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — વધુ વ્યાપક API સપાટી.
- સોર્સ મોડ્યુલ્સ:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + હાઇબ્રિડ RRF
  - `src/lib/memory/embedding/index.ts` — બહુ-સ્રોત એમ્બેડિંગ સ્તર
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — તમામ મેમરી API બૉડી માટે Zod સ્કીમા
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
  - `src/app/api/settings/qdrant/route.ts` + સબ-રૂટ્સ
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (પેજ + કમ્પોનન્ટ્સ +
    ટૅબ્સ + હુક્સ)
  - `open-sse/handlers/chatCore.ts` (ઇન્જેક્શન / નિષ્કર્ષણ વાયરિંગ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## એમ્બેડિંગ પ્રદાતા પસંદ કરવો (v3.8.16+)

OmniRouteનું મેમરી એન્જિન **ચાર એમ્બેડિંગ સ્રોતો** (`src/lib/memory/embedding/`)ને સપોર્ટ કરે છે. દરેકમાં **લેટન્સી, ખર્ચ, મૉડલની ગુણવત્તા અને સેટઅપની જટિલતા** અંગે અલગ સમાધાનો છે.

### એમ્બેડિંગ સ્રોતો

| પ્રદાતા        | સ્રોત                                       | લેટન્સી                           | ખર્ચ                 | ગુણવત્તા                           | સેટઅપ                                      |
| -------------- | ------------------------------------------- | --------------------------------- | -------------------- | ---------------------------------- | ------------------------------------------ |
| `transformers` | સ્થાનિક ONNX મૉડલ (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                   | મફત                  | સારી                               | માત્ર `npm install`                        |
| `static`       | પૂર્વ-ગણતરી કરેલા વેક્ટર્સ (કૅશ કરેલા)      | <1ms                              | મફત                  | લાગુ પડતું નથી (કૅશ હિટ પર આધારિત) | કંઈ નહીં                                   |
| `remote`       | OpenAI / Cohere / Voyage API                | ~100-300ms                        | $0.02-0.10/1M ટોકન્સ | ઉત્તમ                              | API કી                                     |
| `auto`         | રનટાઇમ પર ઉપલબ્ધ શ્રેષ્ઠ સ્રોત પસંદ કરે છે  | પસંદ કરેલા સ્રોત જેટલી            | મફત                  | પસંદ કરેલા સ્રોત જેટલી             | કંઈ નહીં                                   |
| _(કૅશ)_        | કોઈપણ સ્રોત પર ઇન-મેમરી LRU સ્તર            | <1ms (હિટ), સંપૂર્ણ લેટન્સી (મિસ) | મફત                  | અંતર્નિહિત સ્રોત જેટલી             | હંમેશાં ચાલુ (પસંદ કરી શકાય એવો સ્રોત નથી) |

### નિર્ણય વૃક્ષ

```
                  તમારા ડિપ્લોયમેન્ટનો સંદર્ભ શું છે?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    નાનું PROD   મોટું PROD    EDGE / OFFLINE
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

### ડેટાબેઝ અને API કન્ફિગરેશન

મેમરી એમ્બેડિંગ વિકલ્પો એન્વાયર્નમેન્ટ વેરિએબલ્સ દ્વારા નહીં, પરંતુ Settings API/UI દ્વારા કન્ફિગર કરવામાં આવે છે. Settings હેઠળની સંબંધિત સેટિંગ્સ ડેટાબેઝ કીઓ (`src/lib/memory/settings.ts`માં `normalizeMemorySettings`) આ છે:

- `memoryEmbeddingSource`: `"transformers"` (સ્થાનિક), `"remote"` (API-આધારિત, દા.ત. OpenAI), `"static"` (બાહ્ય સ્ટોર), અથવા `"auto"`
- `memoryEmbeddingProviderModel`: રિમોટ/સ્ટેટિક સ્રોતો માટે મૉડલ ઓળખકર્તા (દા.ત., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, અથવા `"auto"`

#### સ્થાનિક મૉડલ (`transformers`)

સ્થાનિક મૉડલ ચલાવવા માટે આંતરિક રીતે transformers.jsનો ઉપયોગ કરે છે:

```bash
# કોડમાં વાંચવામાં આવતા એન્વાયર્નમેન્ટ વેરિએબલ્સ (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF મૉડલ રિપોઝિટરી
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF સ્ટેટિક potion મૉડલ
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # કૅશ ડિરેક્ટરી
```

#### LRU એમ્બેડિંગ કૅશ

કૅશ ડિફૉલ્ટ રૂપે હંમેશાં ચાલુ હોય છે અને એન્વાયર્નમેન્ટ વેરિએબલ્સ દ્વારા કન્ફિગર થાય છે:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # કૅશ કરેલી આઇટમ્સની મહત્તમ સંખ્યા
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 મિનિટ)
```

### પ્રદર્શનના આંકડા

સામાન્ય 4-કોર x86 સર્વર પર બેન્ચમાર્ક (દરેક ટેક્સ્ટ ~100 ટોકન):

| પ્રદાતા              | p50   | p95   | p99   | 1M એમ્બેડિંગ્સ દીઠ ખર્ચ            |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | મફત                                |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant હોસ્ટિંગ પર આધારિત          |
| `cache` (હિટ)        | <1ms  | <1ms  | 2ms   | મફત                                |

---

## તથ્ય નિષ્કર્ષણ પેટર્ન્સ (v3.8.16+)

`extraction.ts` મોડ્યુલ (`src/lib/memory/extraction.ts`) વાર્તાલાપ સંદેશાઓમાંથી સંરચિત તથ્યો કાઢવા માટે **regex પેટર્ન મેચિંગ**નો ઉપયોગ કરે છે. આ પેટર્ન્સને સમજવાથી તમારા ઉપયોગના કિસ્સા માટે નિષ્કર્ષણની ગુણવત્તાને અનુકૂળ બનાવવામાં મદદ મળે છે.

### ડિફૉલ્ટ પેટર્ન શ્રેણીઓ

| શ્રેણી              | ઉદાહરણ પેટર્ન                                                                       | શું કેપ્ચર થાય છે                |
| ------------------- | ----------------------------------------------------------------------------------- | -------------------------------- |
| PREFERENCE_PATTERNS | `"હું <X> પસંદ કરું છું"`, `"મને <X> ગમે છે"`, `"હું <X>ને નફરત કરું છું"`          | વપરાશકર્તાની પસંદગીઓ             |
| DECISION_PATTERNS   | `"હું <X>નો ઉપયોગ કરીશ"`, `"મેં <X> કરવાનું નક્કી કર્યું"`, `"મેં <X> પસંદ કર્યું"` | વપરાશકર્તાના નિર્ણયો (પ્રાસંગિક) |
| PATTERN_PATTERNS    | `"હું સામાન્ય રીતે <X>"`, `"હું હંમેશાં <X>"`, `"હું ક્યારેય <X> નહીં"`             | સતત વર્તણૂકીય પેટર્ન્સ           |

### ઉદાહરણ પેટર્ન્સ (સરળીકૃત)

```ts
// src/lib/memory/extraction.tsમાંથી
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

જ્યારે કોઈ વપરાશકર્તા કહે છે:

> "હું TypeScript પસંદ કરું છું. હું આ પ્રોજેક્ટ માટે Postgresનો ઉપયોગ કરીશ. હું હંમેશાં push કરતાં પહેલાં commit કરું છું. મને Python ગમતું નથી."
> નિષ્કર્ષણ 4 મેમરી બનાવે છે:
>
> | કી                                   | શ્રેણી | પ્રકાર    | સામગ્રી                     |
> | ------------------------------------ | ------ | --------- | --------------------------- |
> | `preference:typescript`              | પસંદગી | તથ્યાત્મક | "TypeScript"                |
> | `decision:postgres_for_this_project` | નિર્ણય | પ્રાસંગિક | "આ પ્રોજેક્ટ માટે Postgres" |
> | `pattern:commit_before_pushing`      | પેટર્ન | તથ્યાત્મક | "push કરતાં પહેલાં commit"  |
> | `preference:python`                  | પસંદગી | તથ્યાત્મક | "Python"                    |

### નિષ્કર્ષણની મર્યાદાઓ

અનિયંત્રિત નિષ્કર્ષણ અટકાવવા માટે નીચેની મર્યાદાઓ લાગુ પડે છે:

| સામગ્રીની ન્યૂનતમ લંબાઈ | 3 અક્ષરો |
| સામગ્રીની મહત્તમ લંબાઈ | 500 અક્ષરો |

### નિષ્કર્ષણ ક્યારે અક્ષમ કરવું

જ્યારે પણ મેમરી સક્ષમ હોય ત્યારે નિષ્કર્ષણ આપમેળે ચાલે છે; માત્ર નિષ્કર્ષણ માટે અલગ
ટૉગલ ઉપલબ્ધ નથી. તેને બંધ કરવા માટે, મેમરીને સંપૂર્ણપણે અક્ષમ કરો (`enabled: false`
નો ઉપયોગ કરીને `PUT /api/settings/memory`). નીચેની પરિસ્થિતિઓમાં આમ કરવાનું વિચારો:

- તમારા સંદેશાઓનું પ્રમાણ ઊંચું હોય અને નિષ્કર્ષણનો ખર્ચ નોંધપાત્ર હોય
- તમારા વાર્તાલાપ મોટાભાગે ક્ષણિક હોય (ચેટ, ડિબગિંગ) અને તેમાં કોઈ લાંબા ગાળાનું મૂલ્ય ન હોય
- તમે કસ્ટમ પ્લગઇન્સ દ્વારા પહેલેથી જ સંદર્ભ કેપ્ચર કરી રહ્યા હોવ

---

## હાઇબ્રિડ RRF ટ્યુનિંગ (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** અલ્ગોરિધમ FTS5 (કીવર્ડ) અને વેક્ટર (સિમેન્ટિક) પરિણામોને સંયોજિત કરે છે. `k` પેરામીટર નીચા ક્રમનાં પરિણામોને કેટલું વજન આપવામાં આવે છે તે નિયંત્રિત કરે છે.

### સૂત્ર

દરેક ઉમેદવાર મેમરી માટે RRF સ્કોર આ પ્રમાણે છે:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

જ્યાં:

- `k` અચળાંક છે (ડિફૉલ્ટ 60)
- `rank_i(d)` એ i-મા પુનઃપ્રાપ્તિ સિસ્ટમ (FTS, વેક્ટર)માં દસ્તાવેજ `d`નો ક્રમ છે
- સરવાળો બધી પુનઃપ્રાપ્તિ સિસ્ટમો પર કરવામાં આવે છે

### `k` પરિણામોને કેવી રીતે અસર કરે છે

| `k` મૂલ્ય            | અસર                                                                               | શેના માટે શ્રેષ્ઠ                               |
| -------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- |
| `k=0`                | શુદ્ધ રેન્ક ફ્યુઝન (કોઈ સ્મૂધિંગ નહીં)                                            | સૈદ્ધાંતિક આધારરેખા                             |
| `k=10-30`            | ટોચનાં પરિણામોને ઘણું વજન આપે છે, નીચા ક્રમનું યોગદાન ખૂબ ઓછું હોય છે             | જ્યારે ટોચનાં 3 પરિણામો સામાન્ય રીતે સાચાં હોય  |
| **`k=60`** (ડિફૉલ્ટ) | સંતુલિત — ટોચનાં 10 પરિણામો બધાં અર્થપૂર્ણ યોગદાન આપે છે                          | સામાન્ય-હેતુની પુનઃપ્રાપ્તિ                     |
| `k=100+`             | વધુ સપાટ — નીચા ક્રમનાં પરિણામો પણ અનેક સિસ્ટમોમાં દેખાય તો પ્રભુત્વ મેળવી શકે છે | જ્યારે રિકૉલ > પ્રિસિઝન અત્યંત મહત્ત્વપૂર્ણ હોય |

### વ્યવહારમાં `k`નું ટ્યુનિંગ

```bash
# ડિફૉલ્ટ
MEMORY_RRF_K=60

# આક્રમક પ્રિસિઝન (નાની મેમરી, થોડા દસ્તાવેજો)
MEMORY_RRF_K=20

# મહત્તમ રિકૉલ (મોટી મેમરી, વિવિધ ક્વેરીઝ)
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

વધુ ઊંચા `k` સાથે, ટોચના-1 અને ક્રમ-10 વચ્ચેનો **સાપેક્ષ તફાવત** ઓછો હોય છે, તેથી અલ્ગોરિધમ ટોચના ક્રમના વિશ્વાસ કરતાં **પુનઃપ્રાપ્તિ સિસ્ટમો વચ્ચેની સંમતિ** પર વધુ આધાર રાખે છે.

### `k` ક્યારે બદલવું

| લક્ષણ                                            | આ અજમાવો                                                             |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| ટોચનું પરિણામ હંમેશાં જીતે છે, પરંતુ તે ખોટું છે | **નીચું** k (દા.ત., 20) — ટોચના ક્રમનો વિશ્વાસ વધુ મહત્ત્વ ધરાવે છે  |
| સાચો જવાબ ટોચના-5માં છે પરંતુ ટોચના-1માં નથી     | **ઊંચું** k (દા.ત., 100) — વધુ સપાટ સ્કોરિંગ સંમતિને પુરસ્કૃત કરે છે |
| રિકૉલ ઊંચું છે પરંતુ પ્રિસિઝન નીચું છે           | **નીચું** k — રેન્કિંગને વધુ તીક્ષ્ણ બનાવો                           |
| રિકૉલ નીચું છે (સંબંધિત દસ્તાવેજો ચૂકી જાય છે)   | **ઊંચું** k — નીચા ક્રમનાં દસ્તાવેજોને તક આપો                        |

### RRF વેઇટિંગ

રેસિપ્રોકલ રેન્ક ફ્યુઝન સિમેન્ટિક વેક્ટર ક્રમ અને પૂર્ણ-ટેક્સ્ટ શોધ ક્રમ માટે સમાન વજનનો ઉપયોગ કરે છે:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

વ્યક્તિગત વજનને સમાયોજિત કરવા માટે કોઈ એન્વાયરમેન્ટ વેરિએબલ્સ નથી (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` અસ્તિત્વમાં નથી).

---

## સારાંશીકરણ વ્યૂહરચના (v3.8.16+)

`summarization.ts` મોડ્યુલ (`src/lib/memory/summarization.ts`) સ્મરણ કરવાની ક્ષમતા જાળવી રાખીને સક્રિય સમૂહને નાનો રાખવા માટે જૂની મેમરીઓને સંકુચિત કરે છે.

### સારાંશીકરણ ક્યારે ટ્રિગર થાય છે

| ટ્રિગર                     | થ્રેશોલ્ડ (ડિફૉલ્ટ) |
| -------------------------- | ------------------- |
| API મારફતે મેન્યુઅલ ટ્રિગર | લાગુ પડતું નથી      |

### શેનું સારાંશીકરણ થાય છે

`summarization.ts`માંથી બે એન્ટ્રી પૉઇન્ટ એક્સપોર્ટ કરવામાં આવ્યા છે:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — સેશન માટેની
  મેમરીઓને ટોકન બજેટની મર્યાદામાં એક જ સારાંશ ટેક્સ્ટમાં સંક્ષિપ્ત કરે છે.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API દ્વારા ઉપયોગમાં
  લેવાતું વય-આધારિત સંકોચન: તે `days` કરતાં જૂની દરેક મેમરી પસંદ કરે છે, તેમાંથી
  એક સંક્ષિપ્ત સારાંશ મેમરી બનાવે છે અને (`dryRun` `false` હોય ત્યારે) મૂળ
  મેમરીઓ કાઢી નાખે છે. કંઈપણ બદલ્યા વિના ઉમેદવાર સમૂહ અને કુલ ટોકન સંખ્યા
  પૂર્વાવલોકિત કરવા માટે `dryRun: true` પાસ કરો.

કોઈ ટૅગ/કી ક્લસ્ટરિંગ પાસ અથવા પ્રતિ-મેમરી "મુખ્ય વિરુદ્ધ સારાંશ કરી શકાય તેવું" સ્કોરિંગ નથી —
પસંદગી સંપૂર્ણપણે વયની મર્યાદા પર આધારિત છે અને સારાંશ ટેક્સ્ટમાં દરેક ઉમેદવાર માટે
પ્રકાર-ઉપસર્ગવાળી સંક્ષિપ્ત લાઇન હોય છે.

### સારાંશીકરણ ટ્રિગર કરવું

સારાંશીકરણ **મેન્યુઅલ / ઑપ્ટ-ઇન** છે — `autoSummarize` સેટિંગ ડિફૉલ્ટ રૂપે
`false` હોય છે, તેથી કંઈપણ આપમેળે સંકુચિત થતું નથી. તેને API મારફતે ટ્રિગર કરો:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

તેને બંધ રાખવા માટે, ફક્ત `autoSummarize`ને તેના ડિફૉલ્ટ (`false`) પર રાખો.

### સારાંશીકરણની ગુણવત્તા માટેની ટિપ્સ

- **પહેલાં `dryRun` વડે પૂર્વાવલોકન કરો** — `summarizeMemoriesOlderThan(..., true)`
  ઉમેદવાર સૂચિ અને કુલ ટોકન સંખ્યા પરત કરે છે, જેથી મૂળ મેમરીઓ કાઢી નાખતા પહેલાં
  તમે ખાતરી કરી શકો કે શું મર્જ થશે.
- જો તમારી પાસે વિશાળ મેમરી કોર્પસ હોય, તો **ઓછા ટ્રાફિકના કલાકો દરમિયાન સારાંશીકરણ ચલાવો** — LLM કૉલ ધીમો ભાગ છે

```bash
# Cron-શૈલી: દરરોજ સવારે 3 વાગ્યે સારાંશીકરણ કરો
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend પ્રોવાઇડર પેટર્ન

> **અધિકૃત સ્રોત:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **ટેસ્ટ્સ:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend પ્રોવાઇડર પેટર્ન હાલના મેમરી એન્જિન પર એક **પ્લગ કરી શકાય તેવું બૅકએન્ડ ઍબ્સ્ટ્રેક્શન સ્તર** રજૂ કરે છે. એક જ સ્ટોરેજ અમલીકરણ સાથે બંધાયેલ રહેવાને બદલે, મેમરી સિસ્ટમ હવે ગોઠવી શકાય તેવા પ્રાથમિક/ફૉલબૅક રાઉટિંગ સાથે અનેક બૅકએન્ડ્સ (SQLite, Obsidian, Notion, કસ્ટમ HTTP બૅકએન્ડ્સ)ને સપોર્ટ કરે છે.

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
│  પ્રાથમિક ──► બૅકએન્ડ A  (દા.ત. SQLite)                 │
│  ફૉલબૅક ───► બૅકએન્ડ B  (દા.ત. Obsidian)                │
│              બૅકએન્ડ C  (દા.ત. GenericBackend મારફતે Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ બૅકએન્ડ    │ │ બૅકએન્ડ    │ │ બૅકએન્ડ (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### મુખ્ય ઇન્ટરફેસ (`backend.ts`)

દરેક બૅકએન્ડે `MemoryBackend` ઇન્ટરફેસ અમલમાં મૂકવું આવશ્યક છે:

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

  // સ્વાસ્થ્ય
  health(): Promise<HealthCheckResult>;

  // જીવનચક્ર (વૈકલ્પિક)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

આ સિંગલટન ઑર્કેસ્ટ્રેટર:

- `register(backend)` મારફતે બૅકએન્ડ્સ **રજિસ્ટર** કરે છે — બૂટ વખતે `index.ts`માંથી કૉલ થાય છે
- `configure(primary, fallbacks)` મારફતે પ્રાથમિક + ફૉલબૅક **ગોઠવે** છે
- નિષ્ફળતા વખતે ફૉલબૅક શૃંખલા સાથે CRUD/શોધને પ્રાથમિક તરફ **રાઉટ** કરે છે
- સમયાંતરે તમામ બૅકએન્ડ્સની **સ્વાસ્થ્ય તપાસ** કરે છે

**ફૉલબૅક વર્તણૂક:**

| ઑપરેશન   | પ્રાથમિક                  | ફૉલબૅક્સ                 |
| -------- | ------------------------- | ------------------------ |
| `create` | ✅ ફક્ત પ્રાથમિક          | ❌                       |
| `get`    | ✅ પહેલાં પ્રાથમિક અજમાવો | ✅ null હોય તો ફૉલબૅક    |
| `update` | ✅ ફક્ત પ્રાથમિક          | ✅ ફાયર-ઍન્ડ-ફર્ગેટ સિંક |
| `delete` | ✅ ફક્ત પ્રાથમિક          | ✅ ફાયર-ઍન્ડ-ફર્ગેટ સિંક |
| `list`   | ✅ ફક્ત પ્રાથમિક          | ❌                       |
| `search` | ✅ પહેલાં પ્રાથમિક        | ✅ ભૂલ થાય ત્યારે ફૉલબૅક |

#### GenericMemoryBackend (`genericBackend.ts`)

એક સામાન્ય HTTP કનેક્ટર, જે કોઈપણ REST APIને MemoryBackendમાં અનુકૂલિત કરે છે. આ માટે ઉપયોગી છે:

- **Notion** — Notion API મારફતે કનેક્ટ કરો
- **Obsidian** — Obsidian Local REST API મારફતે કનેક્ટ કરો
- **કસ્ટમ બૅકએન્ડ્સ** — RESTful મેમરી API ઉપલબ્ધ કરાવતી કોઈપણ સેવા

**કન્ફિગરેશન:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // બેકએન્ડ APIનું મૂળ URL
  apiKey?: string;           // પ્રમાણીકરણ માટે Bearer ટોકન
  headers?: Record<string, string>;  // કસ્ટમ HTTP હેડર્સ
  timeout?: number;          // વિનંતી સમયસમાપ્તિ (ડિફૉલ્ટ: 30000ms)
  backendType?: string;      // લૉગિંગ માટે

  // એન્ડપોઇન્ટ ઓવરરાઇડ્સ (ડિફૉલ્ટ્સ REST પ્રણાલીઓનો ઉપયોગ કરે છે)
  endpoints?: {
    search?: string;   // ડિફૉલ્ટ: "/memories/search"
    create?: string;   // ડિફૉલ્ટ: "/memories"
    list?: string;     // ડિફૉલ્ટ: "/memories"
    get?: string;      // ડિફૉલ્ટ: "/memories/{id}"
    update?: string;   // ડિફૉલ્ટ: "/memories/{id}"
    delete?: string;   // ડિફૉલ્ટ: "/memories/{id}"
    health?: string;   // ડિફૉલ્ટ: "/health"
  };

  // ક્વેરી પેરામીટર નામના મેપિંગ્સ
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // પાથ પેરામીટર નામના મેપિંગ્સ
  pathParams?: {
    id?/memoryId?
  };
}
```

**જાણીતા બેકએન્ડ્સ** `KNOWN_BACKENDS`માં અગાઉથી કૉન્ફિગર કરેલા છે:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 તરફ નિર્દેશ કરતું GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 તરફ નિર્દેશ કરતું GenericMemoryBackend
```

#### બિલ્ટ-ઇન બેકએન્ડ્સ

##### SQLiteBackend (`sqliteBackend.ts`)

ડિફૉલ્ટ પ્રાથમિક બેકએન્ડ. `src/lib/memory/store.ts`નો ઉપયોગ કરીને હાલના SQLite-આધારિત મેમરી સ્ટોરને રૅપ કરે છે. બૂટ સમયે આપમેળે રજિસ્ટર થાય છે.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

હાલના Obsidian ઇન્ટિગ્રેશન (`src/lib/memory/obsidianBackend.ts`)ને રૅપ કરે છે. Obsidian Local REST API મારફતે Obsidian વૉલ્ટ સાથે કનેક્ટ થાય છે.

### સેટિંગ્સ

મેમરી બેકએન્ડ સેટિંગ્સ એપ્લિકેશનની સેટિંગ્સ ટેબલમાં સંગ્રહિત થાય છે અને `src/lib/memory/settings.ts` મારફતે સંચાલિત થાય છે:

| સેટિંગ            | Env/Config કી            | ડિફૉલ્ટ    | વર્ણન                                 |
| ----------------- | ------------------------ | ---------- | ------------------------------------- |
| પ્રાથમિક બેકએન્ડ  | `memoryPrimaryBackend`   | `"sqlite"` | પ્રાથમિક બેકએન્ડનું ID                |
| ફૉલબૅક બેકએન્ડ્સ  | `memoryFallbackBackends` | `[]`       | ક્રમબદ્ધ ફૉલબૅક બેકએન્ડ IDs           |
| બેકએન્ડ કૉન્ફિગ્સ | `memoryBackendConfigs`   | `{}`       | દરેક બેકએન્ડ માટેના કૉન્ફિગ ઓવરરાઇડ્સ |

સેટિંગ્સને `normalizeMemorySettings()` મારફતે નૉર્મલાઇઝ કરવામાં આવે છે અને `getMemorySettings()` પર કૅશ કરવામાં આવે છે.

### પ્રારંભિકરણ પ્રવાહ

```
એપ્લિકેશન બૂટસ્ટ્રૅપ
  → index.ts આયાતો (આડઅસર): SQLiteBackendને રજિસ્ટર કરે છે
  → એપ્લિકેશન જીવનચક્રમાંથી initMemoryBackends() કૉલ થાય છે:
      1. સેટિંગ્સ લોડ કરો (getMemorySettings)
      2. પ્રાથમિક + ફૉલબૅક કૉન્ફિગર કરો
      3. બધા બેકએન્ડ્સ પ્રારંભ કરો (આરોગ્ય તપાસ)
      4. વિનંતીઓ માટે તૈયાર
```

### નવું બેકએન્ડ ઉમેરવું

1. `src/lib/memory/<name>Backend.ts`માં **`MemoryBackend` ઇન્ટરફેસ અમલમાં મૂકો**
2. `src/lib/memory/index.ts`માંથી **નિકાસ કરો**
3. બૂટ સમયે `memoryManager.register(yourBackend)` વડે **રજિસ્ટર કરો**
4. સેટિંગ્સ મારફતે **કૉન્ફિગર કરો**: `memoryPrimaryBackend`ને તમારા બેકએન્ડ ID પર સેટ કરો
5. સંદર્ભ તરીકે `src/lib/memory/__tests__/generic-backend.test.ts` વડે **પરીક્ષણ કરો**

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

અપેક્ષિત આઉટપુટ: નીચેની બાબતોને આવરી લેતાં **35 પરીક્ષણો, બધા સફળ**:

- કન્સ્ટ્રક્ટર (2)
- આરોગ્ય તપાસ (4) — સફળતા, નિષ્ફળતા 500, નેટવર્ક ભૂલ, વિલંબતા
- પ્રારંભિકરણ (2) — સફળતા, નિષ્ફળતા
- બનાવવું (2) — ડિફૉલ્ટ એન્ડપોઇન્ટ, કસ્ટમ એન્ડપોઇન્ટ
- મેળવવું (4) — સફળતા, 404 → null, non-404 થ્રો, કસ્ટમ પાથ પેરામીટર્સ
- અપડેટ કરવું (2) — સફળતા, 404 → false
- કાઢી નાખવું (2) — સફળતા, 404 → false
- સૂચિ (2) — ક્વેરી પેરામીટર્સ, કસ્ટમ પેરામીટર નામો
- શોધ (3) — ક્વેરી પેરામીટર્સ, કસ્ટમ એન્ડપોઇન્ટ, વિકલ્પોનું સિરિયલાઇઝેશન
- પ્રમાણીકરણ હેડર્સ (2) — Bearer ટોકન, કસ્ટમ હેડર્સ
- ફૅક્ટરી (1)

#### પ્રકાર તપાસ

```bash
npm run typecheck:core
```

અપેક્ષિત: **0 ભૂલો**.
