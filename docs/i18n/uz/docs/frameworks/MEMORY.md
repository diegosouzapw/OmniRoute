# Memory System (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Haqiqat manbasi:** `src/lib/memory/` va `src/app/api/memory/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40 (sukut bo‘yicha o‘chirilgan + int8 kvantlashni yetkazib olish)

OmniRoute API kaliti (va ixtiyoriy ravishda sessiya identifikatori) bo‘yicha bog‘langan doimiy suhbat xotirasini taqdim etadi. Xotiralar LLM javoblaridan yengil regex andozalarini moslashtirish orqali avtomatik ravishda ajratib olinadi va yetakchi tizim xabari sifatida (yoki tizim rolini rad etadigan provayderlar uchun birinchi foydalanuvchi xabari sifatida) keyingi so‘rovlarga qayta kiritiladi.

> **Xotira sukut bo‘yicha O‘CHIRILGAN (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> endi `false` (`src/lib/memory/settings.ts`). Xotirani yoqish olinadigan kontekstning
> `maxTokens` gacha (~2k) qismini **har bir** chat so‘roviga kiritadi va buning uchun
> haq olinadi — bu yangi o‘rnatishlar hamda o‘z kontekstini o‘zi boshqaradigan
> mijozlar uchun kutilmagan xarajat bo‘lishi mumkin. Uni **Settings → Memory**
> bo‘limida aniq yoqing (xotira yoqilganda `MemorySkillsTab` token xarajati haqida
> ogohlantiruvchi bildirishnomani ko‘rsatadi). Mijoz bitta so‘rov uchun
> `x-omniroute-no-memory` so‘rov sarlavhasi (`true`/`1`/`yes`) orqali xotirani
> o‘chirishi mumkin — [API_REFERENCE.md](../reference/API_REFERENCE.md) dagi
> so‘rov sarlavhalari jadvaliga qarang. Xotirasiz so‘rov `memoryOwnerId = null`
> qiymatini o‘rnatadi, bu o‘sha so‘rov uchun **ham** xotira, **ham** ko‘nikmalar
> kiritilishini o‘chiradi (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Xotira foydalanuvchi bo‘yicha emas, **har bir API kaliti doirasida** ajratiladi — bir xil API kaliti bilan autentifikatsiya qilingan har bir so‘rov bir xil xotira havzasidan foydalanadi; uni `sessionId` orqali qo‘shimcha ravishda ajratish mumkin.

## Arxitektura

```
Mijoz → /v1/chat/completions (apiKeyInfo yuqori oqimda aniqlanadi)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # identifikatorni ajratib oladi
    → getMemorySettings()                     # keshlangan sozlamalar
    → shouldInjectMemory(body, {enabled})     # tekshiruv
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + ixtiyoriy vektor
    → injectMemory(body, memories, provider)  # tizim yoki foydalanuvchi xabari
  → yuqori oqimdagi provayder chaqiruvi
  → javobda: extractFacts(text, apiKeyId, sessionId)  # bloklamasdan
    → setImmediate → har bir moslik uchun createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

Kiritish va ajratib olish chaqiruv joylari `open-sse/handlers/chatCore.ts` ichida ulangan (`retrieveMemories`, `injectMemory` va `extractFacts` ni qidiring).

## Dvigatel arxitekturasi (3 bosqichli aniqlash)

Memory Engine mavjud infratuzilma va sozlamalar asosida olish yo‘lini bajarilish vaqtida aniqlaydi. Ustuvorlik tartibida qo‘llanadigan uchta bosqich mavjud:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  0-BOSQICH — Kalit so‘z (FTS5)                              │
  │  Tekshiruv asosidagi mavjudlik: SQLite yig‘ilmasi uni       │
  │  qo‘llab-quvvatlaganda FTS5 ishlatiladi (better-sqlite3 /   │
  │  node:sqlite / bun:sqlite); FTS5 mavjud bo‘lmagan           │
  │  yig‘ilmalarda mavjud emas (masalan, sql.js/WASM —          │
  │  "no such module: fts5"). strategy = "exact" bo‘lganda      │
  │  yoki zaxira sifatida ishlatiladi; engine-status dagi       │
  │  keyword qiymati tekshiruv natijasini aks ettiradi.         │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  1-BOSQICH — Ichki vektor (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 db.loadExtension() orqali yuklanadi.      │
  │  Float32 vektorlari bo‘yicha to‘liq KNN qidiruvi. Quyidagi  │
  │  hollarda faol bo‘ladi:                                     │
  │   • sqlite-vec loadExtension muvaffaqiyatli bajariladi      │
  │   • Float32Array yarata oladigan embedding manbasi mavjud   │
  │     (remote | static | transformers)                        │
  │   • vec_memories jadvali mavjud (birinchi ready()           │
  │     chaqiruvida yaratiladi)                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  2-BOSQICH — Qdrant (ixtiyoriy tashqi vektor ma’lumotlar    │
  │  bazasi)                                                    │
  │  Yoqilganda semantic/hybrid uchun sqlite-vec o‘rnini        │
  │  egallaydi. Ishlayotgan Qdrant nusxasi va sozlangan         │
  │  host/port talab etiladi.                                   │
  └─────────────────────────────────────────────────────────────┘
```

Darajani pasaytirish avtomatik va shaffof tarzda amalga oshiriladi:

- Agar sqlite-vec yuklanmasa, 1-bosqich mavjud bo‘lmaydi → 0-bosqichga qaytiladi.
- Agar embedding manbasi xato qaytarsa, 1-bosqich 0-bosqichga qaytadi.
- Agar Qdrant nosog‘lom bo‘lsa, 2-bosqich 1-bosqichga (yoki 1-bosqich ham mavjud bo‘lmasa, 0-bosqichga) qaytadi.

## Embedding manbalari

Embedding qatlami (`src/lib/memory/embedding/`) qaysi manbadan foydalanishni
`MemorySettingsExtended.embeddingSource` asosida aniqlaydi:

| Manba          | Tavsif                                                                                     | Kalit talab qilinadi | Sovuq ishga tushish |
| -------------- | ------------------------------------------------------------------------------------------ | -------------------- | ------------------- |
| `remote`       | Sozlangan provayderning embedding API xizmatidan foydalanadi (OpenAI, Cohere va boshqalar) | Ha                   | Yoʻq                |
| `static`       | `potion-base-8M` orqali lokal qidiruv jadvali embeddingi (WordPiece + oʻrtacha pooling)    | Yoʻq                 | ~200ms              |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` orqali lokal ONNX inferensi             | Yoʻq                 | ~3s + ~400MB RAM    |
| `auto`         | Ish vaqtida aniqlash: remote (kalit mavjud boʻlsa) → static → transformers → null          | Bogʻliq              | Bogʻliq             |

**`auto` uchun aniqlash tartibi:**

1. `listEmbeddingProviders()` ichidan `hasKey === true` boʻlgan birinchi provayderni topish → `remote`.
2. Agar `settings.staticEnabled === true` boʻlsa → `static`.
3. Agar `settings.transformersEnabled === true` boʻlsa → `transformers`.
4. Aks holda → `null` (FTS5 kalit soʻz qidiruviga oʻtadi).

Embedding keshi (`src/lib/memory/embedding/cache.ts`) kalit sifatida
`${source}:${model}:${dim}:${sha256(text)}` dan foydalanadigan, xotirada saqlanuvchi
LRU xaritadan foydalanadi; u `MEMORY_EMBEDDING_CACHE_MAX` ta yozuv bilan cheklangan
(standart qiymat 1000) va TTL qiymati `MEMORY_EMBEDDING_CACHE_TTL_MS`
(standart qiymat 5 daqiqa). Jarayonning hayot sikli davomida barcha chaqiruvchilar
oʻrtasida umumiy ishlatiladi.

## Gibrid RRF (k=60)

`strategy = "hybrid"` boʻlganda va vektor ombori mavjud boʻlsa, maʼlumotlarni
olish FTS5 va vektor natijalarini birlashtirish uchun Reciprocal Rank Fusion
usulidan foydalanadi:

```
RRF(d) = Σ  1 / (k + rank_i(d))      bu yerda k = 60 (MEMORY_RRF_K orqali sozlanadi)
          i
```

Aniqrogʻi:

1. FTS5 qidiruvini ishga tushirish → tartiblangan `R_fts` roʻyxati (1..N pozitsiyalar).
2. KNN vektor qidiruvini ishga tushirish → tartiblangan `R_vec` roʻyxati (1..M pozitsiyalar).
3. Har bir noyob `memoryId` uchun:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (roʻyxatda boʻlmasa 0).
4. `rrf_score` boʻyicha DESC tartibida saralash, token byudjeti boʻyicha yurishni qoʻllash.

RRF turli xil maʼlumot olish tizimlaridagi ballarni normallashtirishni talab
qilmasdan samarali ishlashi bilan mashhur. Standart `k=60` qiymati Cormack va
boshqalarning asl maqolasidan olingan va kichik korpuslar (<10k ta xotira)
uchun yaxshi ishlaydi.

## Qayta toʻldirish (kechiktirilgan + qayta indekslash)

Embedding modeli oʻzgarganda (`embedding_signature` orqali aniqlanadi), vektor
ombori qayta quriladi va barcha mavjud xotiralar `memories` jadvalida
`needs_reindex = 1` sifatida belgilanadi.

**Kechiktirilgan qayta toʻldirish**: Keyingi maʼlumot olishda vektor yozuvi
mavjud boʻlmagan har qanday xotira embedding qilinadi va qidiruv boshlanishidan
oldin `vec_memories` ichiga kiritiladi. Bu ishga tushishni bloklamasdan, qayta
toʻldirish xarajatini haqiqiy soʻrovlar oʻrtasida taqsimlaydi.

**Aniq qayta indekslash**: `/dashboard/memory` ichidagi Engine varaqasida
`POST /api/memory/reindex` ni chaqiradigan "Hozir qayta indekslash" tugmasi mavjud.
Ishlov beruvchi `src/lib/memory/reindex.ts` ichidagi `runReindexBatch()` ni
chaqiradi va u har bir soʻrovda `limit` tagacha kutilayotgan yozuvni qayta ishlaydi.
Jarayon holatini `GET /api/memory/engine-status`
(`vectorStore.needsReindex`) orqali muntazam tekshirish mumkin.

`memory_vec_meta` jadvali (`083_memory_vec.sql` migratsiyasi) quyidagilarni saqlaydi:

- `active_dim` — joriy vektor oʻlchami (null = hali kalibrlanmagan).
- `embedding_signature` — oʻzgarishlarni aniqlash uchun ishlatiladigan `${source}:${model}:${dim}`.
- `last_reset_at` — oxirgi toʻliq tiklash vaqt tamgʻasi.
- `vec_loaded` — sqlite-vec muvaffaqiyatli yuklanganini koʻrsatuvchi 0/1 bayroq.

## Sozlamalar kengaytmasi

`src/shared/schemas/memory.ts` ichidagi `MemorySettingsExtended`da toʻqqizta embedding va vektor maydoni mavjud bo‘lib, ular `src/lib/db/settings.ts` orqali saqlanadi:

| Maydon                   | Tur                                                | Standart qiymat | Tavsif                                                                     |
| ------------------------ | -------------------------------------------------- | --------------- | -------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`        | Qaysi embedding manbasidan foydalanish                                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`          | `provider/model` formatidagi provayder/model                               |
| `customBaseUrl`          | `string \| null`                                   | `null`          | Faqat Memory uchun OpenAI-mos endpoint asosiy URL manzili                  |
| `customModelId`          | `string \| null`                                   | `null`          | Maxsus endpointga yuboriladigan model IDsi                                 |
| `transformersEnabled`    | `boolean`                                          | `false`         | Transformers.js uchun ixtiyoriy yoqish (MiniLM, ~400MB)                    |
| `staticEnabled`          | `boolean`                                          | `false`         | Statik potion-base-8M mahalliy modeli uchun ixtiyoriy yoqish               |
| `rerankEnabled`          | `boolean`                                          | `false`         | Qayta tartiblash bosqichini yoqish (har bir soʻrovga +200–500 ms qoʻshadi) |
| `rerankProviderModel`    | `string \| null`                                   | `null`          | `provider/model` formatidagi qayta tartiblash provayderi/modeli            |

`rerankProviderModel` `POST /v1/rerank` orqali aniqlanadi (loopback orqali chaqiriladi), shuning uchun u ushbu marshrut qabul qiladigan istalgan qiymatni qabul qiladi: saralangan bulutli qayta tartiblash modeli (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) yoki `<node-prefix>/<model>` ko‘rinishidagi OpenAI-mos provayder tuguni (masalan, TEI/Infinity serveri uchun `skilled-mini/bge-reranker-v2-m3`). Loopback tugunlari har doim foydalanishga yaroqli; boshqa xostdagi tugun (LAN, Tailscale) uchun qoʻshimcha ravishda `RERANK_REMOTE_PROVIDER_NODES` funksiya bayrogʻi talab qilinadi va u provayderning chiquvchi URL siyosati tekshiruvidan oʻtishi kerak — [Funksiya bayroqlari](../reference/FEATURE_FLAGS.md) bo‘limiga qarang. Boshqaruv panelidagi tanlash vositasi saralangan provayderlar hamda mahalliy tugunlarni ko‘rsatadi; istalgan yaroqli `provider/model` satrini `PUT /api/settings/memory` orqali bevosita o‘rnatish mumkin.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Qaysi vektor backendidan foydalanish |

Bular `GET /PUT /api/settings/memory` orqali taqdim etiladi (`MemorySettingsExtendedSchema` sxemasi).

`remote` manbasi uchun Memory ixtiyoriy `customBaseUrl` va
`customModelId` sozlamalarini ham qabul qiladi. Ular birgalikda global embedding
reyestrini o‘zgartirmasdan OpenAI-mos `/embeddings` endpointi va modelini tanlaydi.
Endpoint foydalanishdan oldin normallashtiriladi va provayderning chiquvchi URL
siyosati asosida tekshiriladi: HTTP(S) talab qilinadi, ichiga hisob ma’lumotlari
joylangan URL manzillari va so‘rov satrlari rad etiladi, bulut metama’lumotlari
manzillari esa bloklangan holda qoladi. Bo‘sh qiymatlar tanlangan reyestr provayderini
saqlab qoladi. Boshqaruv paneliga qaytariladigan xatolar maxfiy ma’lumotlardan
tozalanadi va endpoint hisob ma’lumotlari hech qachon jurnalga yozilmaydi.

> **TODO (D20):** `global` qamrovi (xotiralarni barcha API kalitlari orasida ulashish)
> ushbu relizda amalga oshirilmagan. Buning uchun sxemaga o‘zgartirishlar va global
> qidirib olish yo‘li talab qilinadi. Alohida kuzatib boring.

## Saqlash qatlamlari

### Asosiy: SQLite (`memories` jadvali)

`015_create_memories.sql` migratsiyasi orqali yaratiladi:

| Ustun                       | Tur                | Izohlar                                                                                      |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` orqali yaratilgan UUID                                                 |
| `api_key_id`                | `TEXT NOT NULL`    | Ega boʻlgan API kaliti                                                                       |
| `session_id`                | `TEXT`             | Har bir suhbat uchun ixtiyoriy qamrov                                                        |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` qiymatlaridan biri                           |
| `key`                       | `TEXT`             | Barqaror upsert kaliti, masalan, `preference:i_prefer_python`                                |
| `content`                   | `TEXT NOT NULL`    | Haqiqiy fakt matni                                                                           |
| `metadata`                  | `TEXT`             | JSON blob (`category`, `extractedAt`, `source`, ...)                                         |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 satrlari                                                                            |
| `expires_at`                | `TEXT`             | Ixtiyoriy amal qilish muddati; `NULL` doimiy degan maʼnoni anglatadi                         |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDlar ↔ FTS5 rowidlarini bogʻlash uchun `023_fix_memory_fts_uuid.sql` tomonidan qoʻshilgan |

Indekslar: `api_key_id`, `session_id`, `type`, `expires_at`, shuningdek, noyob
`memory_id` indeksi.

**Upsert semantikasi**: `createMemory()` bir xil `(api_key_id, key)`ga ega mavjud
qatorni qidiradi va topilganda uni oʻz joyida yangilaydi (`metadata`ni yuzaki
yoyish orqali birlashtiradi). Bu takroriy afzallik bayonotlari sababli jadvalning
cheksiz oʻsib ketishiga yoʻl qoʻymaydi.

### Toʻliq matnli qidiruv (`memory_fts` virtual jadvali)

`022_add_memory_fts5.sql` `content` va `key` ustunlari ustida FTS5 virtual jadvalini
yaratadi. `023_fix_memory_fts_uuid.sql` UUID asosiy kaliti FTS5ning butun sonli
rowidiga ulanmagan amaliy xatoni tuzatadi — migratsiya `memory_id` ustunini qoʻshadi,
FTS jadvalini qayta yaratadi va INSERT, DELETE hamda UPDATE paytida FTSni
sinxron holatda saqlaydigan triggerlarni (`memory_fts_ai`, `memory_fts_ad`,
`memory_fts_au`) ulaydi.

`retrieval.ts` tomonidan `semantic` va `hybrid` strategiyalari uchun ishlatiladi
(quyiga qarang). Qidirib olish kodi `hasTable("memory_fts")` bilan himoyalanadi va
FTS jadvali mavjud boʻlmasa yoki FTS soʻrovi xatoga uchrasa, xronologik tartibga
qaytadi.

### Ixtiyoriy: Qdrant (2-darajali vektor ombori)

`src/lib/memory/qdrant.ts` 2-darajali vektor ombori sifatida ixtiyoriy Qdrant
integratsiyasini amalga oshiradi. Qidirib olish faqat mexanizm selektori
`memoryVectorStore === "qdrant"` boʻlganda Qdrantga yoʻnaltiriladi — standart
`"auto"` (va `"sqlite-vec"`) Qdrantni **hech qachon** tanlamaydi. Engine
yorligʻidagi almashtirgich `qdrantEnabled` va `memoryVectorStore`ning **ikkalasini
ham** birgalikda oʻrnatadi: yoqish Qdrantni asosiy omborga aylantiradi, oʻchirish
esa `"auto"`ga qaytaradi (#5597 — bu tuzatishdan oldin yoqish hech qanday taʼsir
koʻrsatmasdi, chunki mexanizm selektoriga hech narsa yozmasdi). Agar Qdrant bilan
bogʻlanib boʻlmasa yoki u hech narsa qaytarmasa, qidirib olish sqlite-vec → FTS5ga
qaytadi.

- `upsertSemanticMemoryPoint()` — sozlangan embedding modeli yordamida `key + content` uchun embedding yaratadi, kolleksiya mavjudligini taʼminlaydi (birinchi foydalanishda kosinus masofali vektorlarni yaratadi) va `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` payloadiga ega nuqtani qoʻshadi yoki yangilaydi.
- `searchSemanticMemory(query, topK, scope)` — soʻrov uchun embedding yaratadi, kolleksiyada `kind = "omniroute_memory"` filtri va ixtiyoriy ravishda `apiKeyId` / `sessionId` boʻyicha qidiradi. `topK` qiymatini `[1, 20]` oraligʻi bilan cheklaydi.
- `deleteSemanticMemoryPoint(id)` — bitta nuqtani oʻchiradi. SQLite qatori olib tashlanganidan keyin `deleteMemory()` tomonidan chaqiriladi (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` muddati oʻtgan yoki `createdAtUnix` saqlash chegarasidan eski boʻlgan nuqtalarni ommaviy ravishda oʻchiradi. Boshqaruv panelida haqiqiy sonlar koʻrsatilishi uchun avval ularning sonini hisoblaydi.
- `checkQdrantHealth()` — kechikish vaqtini oʻlchaydigan `GET /readyz` salomatlik tekshiruvi.

Sozlamalar interfeysi `/dashboard/memory` sahifasining **Dvigatel ichki oynasida** Qdrant konfiguratsiyasi, salomatlik tekshiruvi, semantik qidiruv sinovi va tozalash imkoniyatlarini taqdim etadi. `src/app/api/settings/qdrant/` ostidagi tegishli marshrutlarning barchasi v3.8.6 dan boshlab ulangan:

| Marshrut                                | Metod         | Tavsif                                         |
| --------------------------------------- | ------------- | ---------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant sozlamalarini oʻqish / yangilash        |
| `/api/settings/qdrant/health`           | `GET`         | Ishlayotganlik tekshiruvi + kechikish          |
| `/api/settings/qdrant/search`           | `POST`        | Semantik qidiruv sinovi                        |
| `/api/settings/qdrant/cleanup`          | `POST`        | Muddati oʻtgan / eski nuqtalarni olib tashlash |
| `/api/settings/qdrant/embedding-models` | `GET`         | Mavjud embedding modellarini roʻyxatlash       |

**Xatti-harakat boʻyicha izohlar (nima kutish mumkin):**

- **Dvigatelni tanlash** — Dvigatel ichki oynasida Qdrant yoqilsa, u asosiy saqlash vositasiga aylanadi (`memoryVectorStore="qdrant"` ni oʻrnatadi); oʻchirilsa, qiymat `"auto"` ga qaytariladi (#5597).
- **Orqaga qarab toʻldirish yoʻq** — faqat Qdrant yoqilgandan **keyin** yaratilgan/yangilangan xotiralar unga yoziladi (natijasini kutmasdan ikki joyga yozish). Oldindan mavjud SQLite xotiralari **koʻchirilmaydi**; "Hozir qayta indekslash" faqat sqlite-vec indeksini qayta quradi, Qdrant indeksini emas.
- **Vektor oʻlchami avtomatik aniqlanadi** — u birinchi foydalanishdagi haqiqiy embedding asosida aniqlanadi; toʻldirish uchun oʻlcham maydoni mavjud emas. Kolleksiya yaratilganidan keyin embedding modelini oʻzgartirish **avtomatik tarzda** boshqarilmaydi: mavjud kolleksiya oʻzgarishsiz qoladi, oʻlchamlari mos kelmaydigan yozish/qidirish amallari bajarilmaydi va sqlite-vec zaxira variantiga oʻtiladi. Embedding modelini almashtirish uchun kolleksiyani qayta yarating (yangi nom bering yoki uni Qdrant ichida oʻchiring).
- **Masofa metrikasi** — har doim **Kosinus** (kolleksiya yaratilishida qatʼiy belgilangan; sozlab boʻlmaydi).
- **Autentifikatsiya** — faqat API kaliti (`api-key` sarlavhasi orqali yuboriladi; autentifikatsiyasiz mahalliy Docker uchun ixtiyoriy). JWT/RBAC ishlatilmaydi.
- **Konfiguratsiya maydonlari** — interfeys `host`, `port`, `collection`, `embeddingModel`, `apiKey` maydonlarini taqdim etadi. `vectorSize` / `hnswEfConstruct` faqat muhit/DB orqali sozlanadi va `vectorSize` kolleksiya yaratishda ishlatilmaydi (oʻlcham embeddingdan olinadi).

### Vektor kvantlash (int8 — ixtiyoriy, har ikkala backend uchun)

Har ikkala vektor backend saqlanadigan vektorlarning xotira hajmini kamaytirish (Float32 ga nisbatan taxminan 4 baravar kichik) uchun aniqlikning biroz pasayishi evaziga **ixtiyoriy int8 kvantlashni** qoʻllab-quvvatlaydi. Har ikkalasida ham standart holat — **oʻchirilgan**; aniq yoqilmasa, vektorlar toʻliq aniqlikda qoladi.

| Backend    | Sozlama                           | Tur                            | Standart | Qayerda oʻqiladi                                            |
| ---------- | --------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB kaliti)  | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (muhit) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** har bir instans uchun `qdrantQuantization` sozlama kaliti orqali konfiguratsiya qilinadi (`PUT /api/settings/qdrant` da `quantization` maydoni sifatida taqdim etiladi). Qiymat `"int8"` boʻlsa, `buildQuantizationConfig()` skalyar kvantlashni (`always_ram`, kvantil `0.99`) soʻraydi va qidiruvlarda `rescore: true` yoqiladi, shunda toʻliq aniqlikdagi vektorlar int8 nomzodlar toʻplamini aniqlashtiradi.
- **sqlite-vec** kvantlash **faqat muhit orqali** sozlanadi (DB sozlamasi emas): mahalliy vektorlarni `vec_quantize_int8(?, 'unit')` orqali `int8[dim]` ustuni sifatida saqlash uchun `MEMORY_VEC_QUANTIZATION=int8` ni oʻrnating. Tanlangan rejim `embedding_signature` ichiga (`:int8` suffiksi bilan) kiritiladi, shu sababli rejimlarni almashtirish `vec_memories` jadvalining toʻliq qayta indekslanishiga olib keladi — bu embedding modeli oʻzgarganda ishlatiladigan kechiktirilgan qayta toʻldirish yoʻlining oʻzidir.

## Xotira turlari

`MemoryType` (`src/lib/memory/types.ts`):

| Tur          | Qoʻllanilishi                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `factual`    | Afzalliklar, foydalanuvchi haqidagi barqaror faktlar, xulq-atvor andozalari                        |
| `episodic`   | Muayyan vaqtga bogʻliq qarorlar (`I chose Postgres`)                                               |
| `procedural` | Ish jarayoni / amaliy yoʻriqnoma xotirasi (zaxiralangan; hozirda avtomatik ekstraktor mavjud emas) |
| `semantic`   | Vektorli xotira yozuvlari uchun zaxiralangan                                                       |

`MemoryConfig` maʼlumot olish strategiyasi `exact`, `semantic` yoki `hybrid`
qiymatlaridan biri, qamrovi esa `session`, `apiKey` yoki `global` qiymatlaridan
biridir. `getMemorySettings()` qaytaradigan standart qamrov — `apiKey`.

## Faktlarni ajratib olish (`extraction.ts`)

Ajratib olish LLM asosida emas, **muntazam ifodalar asosida** amalga oshiriladi —
u javob oqimini hech qachon bloklamasligi uchun jarayon ichida `setImmediate()`
orqali bajariladi:

- **Afzallik andozalari** → `MemoryType.FACTUAL`
  (masalan, `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Qaror andozalari** → `MemoryType.EPISODIC`
  (masalan, `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Xulq-atvor andozalari** → `MemoryType.FACTUAL`
  (masalan, `I usually …`, `I always …`, `I tend to …`)

Har bir moslik tozalanadi (`trim`, boʻsh joylarni birlashtirish, 500 belgigacha
cheklash), barqaror `factKey(category, content)` orqali toʻplam ichida
takrorlardan tozalanadi va `{category, extractedAt, source: "llm_response"}`
metamaʼlumotlari bilan `createMemory()` orqali saqlanadi. Kirish matni
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) bilan cheklanadi — matn bundan uzun
boʻlsa, eng soʻnggi yordamchi kontenti doimo qayta ishlanishi uchun matnning
**oxirgi qismi** ishlatiladi.

`extractFactsFromText(text)` testlar uchun eksport qilinadi va faktlarni
saqlamasdan, tuzilmaviy shaklda qaytaradi.

## Maʼlumotlarni olish (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` — asosiy kirish nuqtasi. U:

1. Konfiguratsiyani `MemoryConfigSchema` orqali meʼyorlashtiradi va tekshiradi.
2. `enabled` qiymati false boʻlsa yoki `maxTokens <= 0` boʻlsa, darhol `[]`
   qaytaradi.
3. `maxTokens` qiymatini `[1, 8000]` oraligʻida cheklaydi.
4. Eski maʼlumotlar bazalari ishlashda davom etishi uchun zamonaviy `memories`
   jadvali mavjudligini (eski `memory` jadvaliga nisbatan) aniqlaydi.
5. Amal qilish muddati tekshiruvi
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ixtiyoriy
   seans qamrovi va ixtiyoriy `retentionDays` chegara sanasi bilan asosiy
   soʻrovni tuzadi.
6. Strategiyaga qarab tarmoqlanadi:
   - **`exact`** (standart): xronologik `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: agar `config.query` berilgan va `memory_fts` mavjud boʻlsa,
     `memory_fts MATCH ?` orqali JOIN bajaradi hamda FTS reytingi boʻyicha
     saralaydi; FTS 0 ta satr qaytarsa, xronologik tartibga qaytadi.
   - **`hybrid`**: FTS natijalari (yuqoriroq muvofiqlik) va xronologik
     toʻplamni birlashtiradi hamda id boʻyicha takrorlarni olib tashlaydi.
7. Soʻrov berilganda `content`, `key` va `metadata` JSON boʻylab kalit soʻzlar
   muvofiqligi ballini (`getRelevanceScore`) hisoblaydi. Balli nol boʻlgan
   satrlar filtrlab tashlanadi.
8. Avval ballning kamayish tartibida, soʻng `createdAt` qiymatining kamayish
   tartibida saralaydi.
9. Reytinglangan roʻyxatni koʻrib chiqadi va jamlanib boruvchi
   `estimateTokens(content)` (≈ `length / 4`) budjetdan oshmaguncha yozuvlarni
   qabul qiladi. Hech boʻlmaganda bitta mos yozuv mavjud boʻlsa, doimo kamida
   bitta yozuvni qaytaradi.

`estimateTokens` eksport qilinadi hamda maʼlumotlarni olish, umumlashtirish va
MCP `omniroute_memory_search` vositasi tomonidan ishlatiladi.

## Inyeksiya (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Barcha xotira tarkibini yagona `Memory context: …` satriga birlashtiradi.
2. Provayder nomiga qarab strategiyani tanlaydi:
   - **Tizim xabari** (OpenAI, Anthropic, Gemini va boshqalar uchun standart) — foydalanuvchining tizim ko‘rsatmalari ustunlikni saqlab qolishi uchun mavjud tizim xabarlaridan oldin
     `{role: "system", content: memoryText}` qo‘shadi.
   - **Foydalanuvchi xabari** (zaxira variant) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` tarkibidagi
     provayderlar uchun: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Ular tizim rolini
     qabul qilmaydi va aks holda 400 xatosini qaytaradi (GLM/Zhipu uchun #1701 muammosiga qarang).
3. Miqdor, strategiya va modelni `memory.injection.injected` ostida jurnalga yozadi.

`providerSupportsSystemMessage(provider)` o‘z yo‘naltirish qarorlarini qabul qilishi
kerak bo‘lgan chaqiruvchilar uchun eksport qilinadi. Xavfsizlik maqsadida noma’lum
provayderlar uchun standart qiymat `true` (tizim roliga ruxsat berilgan).

## Sozlamalar (`settings.ts`)

Xotira konfiguratsiyasi muhit o‘zgaruvchilarida emas, **MB sozlamalar jadvalida saqlanadi**.
`getMemorySettings()` ma’lumotlarni `getSettings()` orqali o‘qiydi va natijani
jarayon ichida keshlaydi; yozishlardan so‘ng sozlamalarning PUT
yo‘nalishi `invalidateMemorySettingsCache()` funksiyasini chaqiradi.

### Eski maydonlar (barcha versiyalar)

| MB kaliti             | Tur     | Standart qiymat                                      | UI boshqaruv elementi                                                            |
| --------------------- | ------- | ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 dan beri standart holatda o‘chiq)   | Xotirani yoqish/o‘chirish                                                        |
| `memoryMaxTokens`     | integer | `2000` (`0–16000` oralig‘i)                          | Inyeksiya uchun token budjeti                                                    |
| `memoryRetentionDays` | integer | `30` (`1–365` oralig‘i)                              | Saqlash muddati                                                                  |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` dan biri) | Qidirib olish strategiyasi                                                       |
| `skillsEnabled`       | boolean | `false`                                              | Har bir kalit bo‘yicha ko‘nikma inyeksiyasini almashtiradi (SKILLS.md ga qarang) |

Eslatma: UI dagi `"recent"` strategiyasi `toMemoryRetrievalConfig()` orqali ichki
`"exact"` qidirib olish strategiyasiga moslanadi (xronologik tartib).

### Yangi maydonlar (v3.8.6, 21-reja D9)

Maydon tavsiflari uchun yuqoridagi "Sozlamalarni kengaytirish" bo‘limiga ham qarang.

| MB kaliti                   | API maydoni              | Standart qiymat |
| --------------------------- | ------------------------ | --------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`        |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`          |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`         |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`         |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`         |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`          |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`        |

Qdrant bilan bog‘liq MB kalitlari (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, standart qiymati `"omniroute_memory"` bo‘lgan `qdrantCollection`,
standart qiymati `"openai/text-embedding-3-small"` bo‘lgan `qdrantEmbeddingModel`)
`qdrant.ts` faylidagi `normalizeQdrantConfig()` tomonidan o‘qiladi.

### Muhit o‘zgaruvchilari (v3.8.6)

Oltita ixtiyoriy muhit o‘zgaruvchisi mexanizmning bajarilish vaqtidagi ishlashini sozlaydi (`.env.example` faylida hujjatlashtirilgan):

| O‘zgaruvchi                     | Standart qiymat            | Tavsif                                                                                                                                                                               |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Embedding keshi TTL qiymati (5 daqiqa)                                                                                                                                               |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Embedding LRU keshidagi maksimal yozuvlar soni                                                                                                                                       |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js modeli uchun HF repozitori                                                                                                                                           |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Statik potion modeli uchun HF repozitori                                                                                                                                             |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Yuklab olingan modellar saqlanadigan joy                                                                                                                                             |
| `MEMORY_VEC_TOP_K`              | `20`                       | Vektorli qidiruv uchun standart top-K                                                                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | Gibrid qidiruv uchun RRF k doimiysi                                                                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Mahalliy sqlite-vec vektorlarini kvantlangan holda saqlash uchun `int8` ga sozlang (taxminan 4× kichikroq; ixtiyoriy). Rejim o‘zgarishi qayta indekslashni majburan ishga tushiradi. |

## Xulosalash (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` kalit xotiralaridagi joriy tokenlarning umumiy soni belgilangan limitdan oshganda eski kontentni ixchamlashtiradi. U satrlarni `created_at` bo‘yicha DESC tartibida ko‘rib chiqadi, sig‘adigan satrlarni saqlab qoladi, qolganlarining `content` maydonini esa o‘sha asl kontentning dastlabki uchta jumlasi bilan joyida almashtiradi. `tokensSaved` — eski va yangi kontent uchun `estimateTokens` qiymatlari orasidagi farq.

Bu protsedura joriy chat konveyerida **mavjud, ammo avtomatik chaqirilmaydi** — doimiy ixchamlashtirish kerak bo‘lsa, uni cron, administrator amali yoki `MemoryConfig.autoSummarize` bog‘lovchi kodi orqali chaqiring. Ma’lumot yo‘qotilishi bir tomonlama: asl matnning ustiga yoziladi.

## REST API

Barcha endpointlar boshqaruv autentifikatsiyasini (`requireManagementAuth`) talab qiladi.

### Asosiy xotira endpointlari (mavjud + yangilangan)

| Metod    | Yo‘l                 | Tavsif                                                                                                                                                                                                     |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Filtrlarga ega sahifalangan ro‘yxat: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Javob `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` maydonlarini o‘z ichiga oladi |
| `POST`   | `/api/memory`        | Yozuv yaratadi (Zod orqali tekshiriladi: `content`, `key`, ixtiyoriy `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)` bo‘yicha upsert qiluvchi `createMemory()`ni chaqiradi    |
| `GET`    | `/api/memory/[id]`   | UUID bo‘yicha bitta yozuvni oladi                                                                                                                                                                          |
| `PUT`    | `/api/memory/[id]`   | Yozuv maydonlarini (`type`, `key`, `content`, `metadata`) yangilaydi. Tana: `MemoryUpdatePutSchema`. Embedding manbasi mavjud bo‘lsa, vektorni ham sinxronlashtiradi.                                      |
| `DELETE` | `/api/memory/[id]`   | Yozuvni o‘chiradi; shuningdek, `vec_memories` (D15) va imkon qadar Qdrant’dan ham o‘chiradi. Yozuv topilmasa, 404 qaytaradi.                                                                               |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")`ni ishga tushiradi — yaratish→ro‘yxatlash→o‘chirish to‘liq sikli. `{working, latencyMs, error?}` qaytaradi                                                       |

### Yangi xotira mexanizmi endpointlari (21-reja)

| Metod  | Yo‘l                              | Tavsif                                                                                                                                                                                                |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories`ning sinov rejimidagi bajarilishi — ball, daraja va tokenlar bilan tartiblangan natijalarni qaytaradi. Tana: `RetrievePreviewSchema`. Xotiralarni kiritMAYDI yoki o‘zgartirMAYDI.   |
| `GET`  | `/api/memory/embedding-providers` | Embedding modellari mavjud provayderlarni ro‘yxatlaydi va qaysilarida API kaliti sozlanganini ko‘rsatadi.                                                                                             |
| `GET`  | `/api/memory/engine-status`       | Mexanizmning to‘liq holatini qaytaradi: kalit so‘z darajasi, embedding aniqlanishi, vektor ombori statistikasi, Qdrant holati, qayta tartiblash konfiguratsiyasi. Shakli: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Xotirani ixchamlashtirishni qo‘lda ishga tushiradi. Tana: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` qaytaradi.                                    |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` bo‘lgan xotiralar uchun vektorlarni qayta indekslashni ishga tushiradi. Tana: `MemoryReindexSchema` (`force`). `{started, pending}` qaytaradi.                                      |

### Sozlamalar endpointlari

| Metod  | Yo‘l                                    | Tavsif                                                                                                             |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | Joriy normallashtirilgan `MemorySettingsExtended` (7 ta yangi maydon + eski maydonlar)                             |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema`dagi istalgan maydonni yangilaydi (jami 12 ta maydon)                                |
| `GET`  | `/api/settings/qdrant`                  | Joriy Qdrant sozlamalari (`QdrantSettingsSchema`)                                                                  |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant sozlamalarini yangilaydi. Tana: `QdrantSettingsUpdateSchema`. `apiKey` = bo‘sh satr kalitni olib tashlaydi. |
| `GET`  | `/api/settings/qdrant/health`           | Sozlangan Qdrant nusxasining ishlayotganini tekshiradi. `QdrantHealthResultSchema` qaytaradi.                      |
| `POST` | `/api/settings/qdrant/search`           | Qdrant’da semantik qidiruv sinovi. Tana: `QdrantSearchSchema` (`query`, `topK`).                                   |
| `POST` | `/api/settings/qdrant/cleanup`          | Muddati tugagan / eski xotiralarga tegishli Qdrant nuqtalarini olib tashlaydi.                                     |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant uchun mavjud embedding modellarini ro‘yxatlaydi.                                                            |

`/api/memory` ro‘yxat so‘rovi `page` asosidagi sahifalashni (`parsePaginationParams`) **yoki** bevosita `offset`ni qo‘llab-quvvatlaydi — `offset` mavjud bo‘lsa, u ustuvor hisoblanadi va javob shakli uchun undan hosila `page` hisoblab chiqiladi.

## MCP vositalari (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP serveri yoqilganda uchta xotira vositasi roʻyxatdan oʻtkaziladi:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` funksiyasini oʻraydi. v3.8.6 (D16) dan boshlab, `strategy`
  `"exact"` sifatida qatʼiy belgilanish oʻrniga `getMemorySettings()` dan
  oʻqiladi. Agar `query` taqdim etilgan va `strategy` qiymati `semantic` yoki
  `hybrid` boʻlsa, mavjud boʻlganda vektorlar omboridan foydalaniladi.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` funksiyasini oʻraydi. Faqat 4 ta kanonik turni
  qabul qiladi: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → mos yozuvlarni
  roʻyxatlaydi, ixtiyoriy ravishda yaratilish vaqti koʻrsatilgan vaqt belgisidan
  oldin boʻlganlarini filtrlaydi, soʻng har birini `deleteMemory()` orqali
  oʻchiradi (bu vektorlarni sqlite-vec + Qdrant dan ham olib tashlaydi).

Transport va qamrov tafsilotlari uchun [MCP-SERVER.md](./MCP-SERVER.md) fayliga qarang.

## Boshqaruv paneli (Xotira studiyasi)

`src/app/(dashboard)/dashboard/memory/page.tsx` endi **3 ta ichki oynali Studiya**:

### Ichki oyna: Xotiralar

- Konsepsiya kartasi (yigʻiladigan «Bu qanday ishlaydi» tushuntirishi).
- Real vaqt rejimidagi roʻyxat, qidiruv va sahifalash (300 ms kechiktirish bilan).
- Tur filtri (`factual` / `episodic` / `procedural` / `semantic` / barchasi).
- Xotira qoʻshish modal oynasi (kalit, kontent, tur).
- Qator ichida tahrirlash (qalam tugmasi → `PUT /api/memory/[id]`).
- Har bir qatorni oʻchirish (tasdiqlash dialogi bilan).
- Joriy sahifani JSON formatida eksport qilish; fayl tanlagich orqali JSON importi.
- Statistika kartalari: `totalEntries`, `tokensUsed`, `hitRate`.
- «Eskilarini ixchamlashtirish» tugmasi → `POST /api/memory/summarize` (avval
  sinov rejimi nomzodlar sonini koʻrsatadi, soʻng tasdiqlaydi).
- `GET /api/memory/health` orqali boshqariladigan yashil/qizil holat nuqtasi.

### Ichki oyna: Sinov maydoni

- Soʻrov kiritish maydoni + strategiya tanlagichi (Aniq / Semantik / Gibrid) + token budjeti.
- «Simulyatsiya qilish» → `POST /api/memory/retrieve-preview` — tartiblangan
  natijalarni `score`, `tier`, `tokens`, `vecScore`, `ftsScore` bilan koʻrsatadi.
- Qaysi embedding manbasi / vektorlar ombori ishlatilgani va zaxira variantiga
  oʻtilgan-oʻtilmaganini koʻrsatuvchi aniqlash paneli.

### Ichki oyna: Dvigatel

- Dvigatel holati paneli (kalit soʻz FTS5 belgisi, embedding belgisi, vektorlar
  ombori belgisi, Qdrant holati belgisi, qayta saralash belgisi).
- «Hozir qayta indekslash» tugmasi → `POST /api/memory/reindex`.
- Embedding manbasi tanlagichi (auto / remote / static / transformers + almashtirgichlar).
- Qdrant konfiguratsiya kartasi (yoqish almashtirgichi, host/port/toʻplam/kalit,
  ulanishni sinash, semantik qidiruvni sinash, tozalash).
- Qayta saralash konfiguratsiyasi kartasi (yoqish almashtirgichi, provayder/model tanlagichi).

Xotira va Qdrant sozlamalari eski/global sozlamalar interfeysi uchun
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) ostida ham
joylashgan.

## Keshlash

`src/lib/memory/store.ts` fayli `getMemory(id)` oʻqishlari uchun jarayon
ichidagi LRU-ga oʻxshash keshni (`MEMORY_CACHE_TTL = 1 min`,
`MEMORY_MAX_CACHE_SIZE = 500`, eng eski yozuvlarning 20 % qismini chiqarib
tashlash bilan), shuningdek, oʻz qamrovli keshiga muhtoj chaqiruvchilar
foydalanadigan `get`/`set`/`invalidate` metodlariga ega umumiy kalit/qiymat
`memoryCache` qatlamini (`src/lib/memory/cache.ts`) saqlaydi (1 000 yozuvli LRU,
standart TTL 5 min).

## Maxfiylik va hayot sikli

- Xotira egasi API kaliti identifikatoridir (`chatCore.ts` ichidagi
  `resolveMemoryOwnerId`). `apiKeyInfo.id` bo‘lmasa, qidirish ham, kiritish ham,
  ajratib olish ham bajarilmaydi.
- Kelajakdagi `expires_at` qiymatiga ega yozuvlar qidiruvdan chiqarib tashlanadi;
  `retentionDays` muddatidan eski yozuvlar `retrieveMemories` ichidagi
  `created_at >= cutoff` sharti orqali chiqarib tashlanadi.
- Butunlay o‘chirish uchun `DELETE /api/memory/[id]` yoki `omniroute_memory_clear`dan foydalaning.
- Ajratib olish `setImmediate` orqali natijani kutmasdan bajariladi; xatolar
  `memory.extraction.background.failed` ostida jurnalga yoziladi va hech qachon
  chaqiruvchiga ko‘rsatilmaydi.
- Tekshiruvning to‘liq sikllari (`verifyExtractionPipeline`) o‘z test
  yozuvlarini `finally` blokida tozalaydi.

## Shuningdek qarang

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` sozlamasi xotira bilan birga
  vosita ta’riflarini ham kiritadi.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transporti / qamrov doiralari.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kengroq API imkoniyatlari.
- Manba modullari:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + gibrid RRF
  - `src/lib/memory/embedding/index.ts` — ko‘p manbali embedding qatlami
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — barcha xotira API tanalari uchun Zod sxemalari
  - `src/shared/schemas/qdrant.ts` — Qdrant sozlamalari/amallari uchun Zod sxemalari
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` uchun CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + quyi yo‘nalishlar
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (sahifa + komponentlar +
    ichki sahifalar + huklar)
  - `open-sse/handlers/chatCore.ts` (kiritish / ajratib olish integratsiyasi)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Embedding provayderini tanlash (v3.8.16+)

OmniRoute xotira mexanizmi **to‘rtta embedding manbasini** (`src/lib/memory/embedding/`) qo‘llab-quvvatlaydi. Ularning har biri **kechikish, xarajat, model sifati va sozlash murakkabligi** bo‘yicha turli murosalarni taklif qiladi.

### Embedding manbalari

| Provayder      | Manba                                               | Kechikish                                    | Xarajat             | Sifat                                     | Sozlash                                 |
| -------------- | --------------------------------------------------- | -------------------------------------------- | ------------------- | ----------------------------------------- | --------------------------------------- |
| `transformers` | Mahalliy ONNX modeli (Xenova/all-MiniLM-L6-v2)      | ~50-150ms (CPU)                              | Bepul               | Yaxshi                                    | Faqat `npm install`                     |
| `static`       | Oldindan hisoblangan vektorlar (keshlangan)         | <1ms                                         | Bepul               | Qo‘llanmaydi (keshda topilishiga bog‘liq) | Talab qilinmaydi                        |
| `remote`       | OpenAI / Cohere / Voyage API                        | ~100-300ms                                   | $0.02-0.10/1M token | A’lo                                      | API kaliti                              |
| `auto`         | Ishlash vaqtida mavjud eng yaxshi manbani tanlaydi  | Tanlangan manba bilan bir xil                | Bepul               | Tanlangan manba bilan bir xil             | Talab qilinmaydi                        |
| _(cache)_      | Istalgan manba ustidagi xotira ichidagi LRU qatlami | <1ms (topilsa), to‘liq kechikish (topilmasa) | Bepul               | Asosiy manba bilan bir xil                | Doim yoqilgan (tanlanadigan manba emas) |

### Qaror daraxti

```
                  Joylashtirish muhitingiz qanday?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 ISHLAB CHIQISH/ KICHIK ISHLAB  YIRIK ISHLAB  EDGE / OFLAYN
    TEST        CHIQARISH      CHIQARISH
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (bepul, APIsiz)            (eng yaxshi sifat) (internetsiz)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            HAR DOIM ustiga `cache` qatlamini qo‘shing
            (LruCache istalgan provayderni o‘raydi)
```

### Ma’lumotlar bazasi va API konfiguratsiyasi

Xotira embedding parametrlari muhit o‘zgaruvchilari orqali emas, Settings API/UI orqali sozlanadi. Settings ostidagi tegishli ma’lumotlar bazasi kalitlari (`src/lib/memory/settings.ts` ichidagi `normalizeMemorySettings`) quyidagilardir:

- `memoryEmbeddingSource`: `"transformers"` (mahalliy), `"remote"` (API asosida, masalan, OpenAI), `"static"` (tashqi saqlash tizimi) yoki `"auto"`
- `memoryEmbeddingProviderModel`: Masofaviy/statik manbalar uchun model identifikatori (masalan, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` yoki `"auto"`

#### Mahalliy model (`transformers`)

Mahalliy modellarni ishga tushirish uchun ichki ravishda transformers.js’dan foydalanadi:

```bash
# Kodda o‘qiladigan muhit o‘zgaruvchilari (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model repozitori
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF statik potion modeli
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Kesh katalogi
```

#### LRU embedding keshi

Kesh standart holatda doim yoqilgan va muhit o‘zgaruvchilari orqali sozlanadi:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Keshlangan elementlarning maksimal soni
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 daqiqa)
```

### Unumdorlik ko‘rsatkichlari

Odatiy 4 yadroli x86 serveridagi sinov natijalari (har bir matn ~100 ta token):

| Provayder            | p50   | p95   | p99   | 1 mln embedding uchun xarajat      |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Bepul                              |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant hostingiga bogʻliq          |
| `cache` (topildi)    | <1ms  | <1ms  | 2ms   | Bepul                              |

---

## Faktlarni ajratib olish andozalari (v3.8.16+)

`extraction.ts` moduli (`src/lib/memory/extraction.ts`) suhbat xabarlaridan tuzilmali faktlarni ajratib olish uchun **muntazam ifoda andozalarini moslashtirish**dan foydalanadi. Ushbu andozalarni tushunish foydalanish holatingiz uchun ajratib olish sifatini sozlashga yordam beradi.

### Standart andoza toifalari

| Toifa               | Andoza misoli                                               | Ajratib olinadigan maʼlumotlar     |
| ------------------- | ----------------------------------------------------------- | ---------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Foydalanuvchi afzalliklari         |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Foydalanuvchi qarorlari (epizodik) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Doimiy xulq-atvor andozalari       |

### Andoza misollari (soddalashtirilgan)

```ts
// src/lib/memory/extraction.ts faylidan
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

### Nimalar ajratib olinadi

Foydalanuvchi quyidagicha aytsa:

> "Men TypeScript'ni afzal ko‘raman. Ushbu loyiha uchun Postgres'dan foydalanaman. Men har doim yuborishdan oldin commit qilaman. Python'ni yoqtirmayman."
> Ajratib olish natijasida 4 ta xotira hosil bo‘ladi:
>
> | Kalit                                | Toifa    | Tur      | Tarkib                            |
> | ------------------------------------ | -------- | -------- | --------------------------------- |
> | `preference:typescript`              | afzallik | faktik   | "TypeScript"                      |
> | `decision:postgres_for_this_project` | qaror    | epizodik | "Ushbu loyiha uchun Postgres"     |
> | `pattern:commit_before_pushing`      | andoza   | faktik   | "yuborishdan oldin commit qilish" |
> | `preference:python`                  | afzallik | faktik   | "Python"                          |

### Ajratib olish cheklovlari

Haddan tashqari ko‘p maʼlumot ajratib olinishining oldini olish uchun quyidagi cheklovlar qo‘llanadi:

| Minimal tarkib uzunligi | 3 ta belgi |
| Maksimal tarkib uzunligi | 500 ta belgi |

### Ajratib olishni qachon o‘chirish kerak

Xotira yoqilganida ajratib olish avtomatik ravishda ishlaydi; faqat ajratib olish uchun alohida
almashtirgich mavjud emas. Uni o‘chirish uchun xotirani butunlay o‘chiring (`enabled: false`
qiymatini `PUT /api/settings/memory` orqali yuboring). Quyidagi holatlarda buni ko‘rib chiqing:

- Xabarlar hajmi katta va ajratib olish xarajati sezilarli bo‘lsa
- Suhbatlaringiz asosan vaqtinchalik bo‘lib (chat, xatolarni tuzatish), uzoq muddatli qiymatga ega bo‘lmasa
- Kontekstni allaqachon maxsus plaginlar orqali saqlayotgan bo‘lsangiz

---

## Gibrid RRF'ni sozlash (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** algoritmi FTS5 (kalit so‘z) va vektor (semantik) natijalarini birlashtiradi. `k` parametri quyi o‘rinlardagi natijalarga qancha vazn berilishini boshqaradi.

### Formula

Har bir xotira nomzodi uchun RRF bali quyidagicha hisoblanadi:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Bu yerda:

- `k` — o‘zgarmas qiymat (standart qiymat 60)
- `rank_i(d)` — `d` hujjatining i-chi qidiruv tizimidagi (FTS, vektor) o‘rni
- Yig‘indi barcha qidiruv tizimlari bo‘yicha hisoblanadi

### `k` natijalarga qanday taʼsir qiladi

| `k` qiymati           | Taʼsiri                                                                              | Eng mos holat                                   |
| --------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `k=0`                 | Sof o‘rinlarni birlashtirish (silliqlashsiz)                                         | Nazariy boshlang‘ich ko‘rsatkich                |
| `k=10-30`             | Yuqori natijalarga katta vazn beradi, quyi o‘rinlar deyarli hissa qo‘shmaydi         | Eng yaxshi 3 ta natija odatda to‘g‘ri bo‘lganda |
| **`k=60`** (standart) | Muvozanatli — eng yaxshi 10 ta natijaning barchasi sezilarli hissa qo‘shadi          | Umumiy maqsadli qidiruv                         |
| `k=100+`              | Tekisroq — quyi o‘rindagi natijalar bir nechta tizimda uchrasa, ustun kelishi mumkin | To‘liqlik > aniqlik muhim bo‘lganda             |

### `k` qiymatini amalda sozlash

```bash
# Standart
MEMORY_RRF_K=60

# Yuqori aniqlik (kichik xotira, oz sonli hujjatlar)
MEMORY_RRF_K=20

# Maksimal to‘liqlik (katta xotira, turli xil so‘rovlar)
MEMORY_RRF_K=120
```

**`k=20` bilan misol:**

- FTS'dagi 1-o‘rin → hissa `1/21 = 0.048`
- FTS'dagi 10-o‘rin → hissa `1/30 = 0.033`
- Vektordagi 1-o‘rin → hissa `0.048`
- Birlashtirilgan maksimal qiymat: `0.096`

**`k=60` bilan misol:**

- FTS'dagi 1-o‘rin → hissa `1/61 = 0.016`
- FTS'dagi 10-o‘rin → hissa `1/70 = 0.014`
- Vektordagi 1-o‘rin → hissa `0.016`
- Birlashtirilgan maksimal qiymat: `0.033`

`k` kattaroq bo‘lganda, 1-o‘rin va 10-o‘rin orasidagi **nisbiy farq** kichikroq bo‘ladi, shuning uchun algoritm yuqori o‘ringa bo‘lgan ishonchdan ko‘ra **qidiruv tizimlari o‘rtasidagi yakdillik**ka ko‘proq tayanadi.

### `k` qiymatini qachon o‘zgartirish kerak

| Alomat                                                  | Sinab ko‘ring                                                               |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Eng yuqori natija doim g‘olib chiqadi, ammo u noto‘g‘ri | **Pastroq** k (masalan, 20) — yuqori o‘ringa bo‘lgan ishonch muhimroq       |
| To‘g‘ri javob eng yaxshi 5 talikda, ammo 1-o‘rinda emas | **Yuqoriroq** k (masalan, 100) — tekisroq baholash yakdillikni mukofotlaydi |
| To‘liqlik yuqori, ammo aniqlik past                     | **Pastroq** k — saralashni keskinlashtiring                                 |
| To‘liqlik past (tegishli hujjatlar topilmayapti)        | **Yuqoriroq** k — quyi o‘rindagi hujjatlarga imkoniyat bering               |

### RRF vaznlash

Teskari o‘rinlarni birlashtirish semantik vektor o‘rni va to‘liq matnli qidiruv o‘rni uchun teng vaznlardan foydalanadi:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Alohida vaznlarni sozlash uchun muhit o‘zgaruvchilari mavjud emas (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` mavjud emas).

---

## Xulosalash strategiyasi (v3.8.16+)

`summarization.ts` moduli (`src/lib/memory/summarization.ts`) eslab qolish imkoniyatini saqlagan holda faol toʻplamni kichik tutish uchun eski xotiralarni siqadi.

### Xulosalash qachon ishga tushadi

| Ishga tushirish usuli             | Chegara (standart) |
| --------------------------------- | ------------------ |
| API orqali qoʻlda ishga tushirish | mavjud emas        |

### Nimalar xulosalanadi

`summarization.ts` faylidan ikkita kirish nuqtasi eksport qilinadi:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — sessiya xotiralarini tokenlar byudjeti bilan cheklangan yagona xulosa matniga siqadi.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API tomonidan ishlatiladigan yoshga asoslangan siqish: u `days` kundan eski barcha xotiralarni tanlaydi, ulardan bitta siqilgan xulosa xotirasini yaratadi va (`dryRun` qiymati `false` boʻlganda) asl nusxalarni oʻchiradi. Hech narsani oʻzgartirmasdan nomzodlar toʻplami va jami tokenlar sonini oldindan koʻrish uchun `dryRun: true` uzating.

Teg/kalitlar boʻyicha klasterlash bosqichi yoki har bir xotira uchun “asosiy va xulosalanadigan” baholash mavjud emas — tanlash faqat yosh chegarasiga asoslanadi, xulosa matni esa har bir nomzod uchun turi prefiks sifatida koʻrsatilgan siqilgan satrdan iborat.

### Xulosalashni ishga tushirish

Xulosalash **qoʻlda / ixtiyoriy ravishda yoqiladi** — `autoSummarize` sozlamasining standart qiymati `false`, shuning uchun hech narsa avtomatik ravishda siqilmaydi. Uni API orqali ishga tushiring:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Uni oʻchiq holda qoldirish uchun `autoSummarize` sozlamasini standart (`false`) qiymatida saqlang.

### Xulosalash sifatini yaxshilash boʻyicha maslahatlar

- **Avval `dryRun` yordamida koʻrib chiqing** — `summarizeMemoriesOlderThan(..., true)` asl nusxalarni oʻchirishdan oldin nimalar birlashtirilishini tekshirishingiz uchun nomzodlar roʻyxati va jami tokenlar sonini qaytaradi.
- **Xotiralar majmuasi katta boʻlsa, xulosalashni trafik kam boʻlgan soatlarda bajaring** — LLM chaqiruvi jarayonning sekin qismidir

```bash
# Cron usuli: har kuni tungi soat 3 da xulosalash
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend provayder andozasi

> **Ishonchli manba:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testlar:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend provayder andozasi mavjud xotira mexanizmi ustida **ulanadigan backend abstraksiya qatlamini** taqdim etadi. Endi xotira tizimi bitta saqlash implementatsiyasiga bogʻlanib qolish oʻrniga, sozlanadigan asosiy/zaxira yoʻnaltirishga ega bir nechta backendlarni (SQLite, Obsidian, Notion, maxsus HTTP backendlar) qoʻllab-quvvatlaydi.

### Arxitektura

```
┌──────────────────────────────────────────────────────────┐
│                    API yoʻnalishlari                      │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Singleton orkestrator (manager.ts)              │
│                                                          │
│  Asosiy ───► Backend A  (masalan, SQLite)                │
│  Zaxira ───► Backend B  (masalan, Obsidian)              │
│             Backend C  (masalan, GenericBackend orqali Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ backendi   │ │ backendi   │ │ backendi (HTTP)  │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Asosiy interfeys (`backend.ts`)

Har bir backend `MemoryBackend` interfeysini implementatsiya qilishi kerak:

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

  // Qidiruv
  search(config: SearchConfig): Promise<Memory[]>;

  // Holat
  health(): Promise<HealthCheckResult>;

  // Hayot sikli (ixtiyoriy)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Quyidagilarni bajaradigan Singleton orkestrator:

- Backendlarni `register(backend)` orqali **roʻyxatdan oʻtkazadi** — yuklanish vaqtida `index.ts` faylidan chaqiriladi
- Asosiy va zaxira backendlarni `configure(primary, fallbacks)` orqali **sozlaydi**
- CRUD/qidiruv amallarini asosiy backendga **yoʻnaltiradi**, xatolik yuz berganda zaxira zanjiridan foydalanadi
- Barcha backendlarning **holatini muntazam tekshiradi**

**Zaxira backend xatti-harakati:**

| Amal     | Asosiy backend          | Zaxira backendlar                     |
| -------- | ----------------------- | ------------------------------------- |
| `create` | ✅ Faqat asosiy backend | ❌                                    |
| `get`    | ✅ Avval asosiy backend | ✅ Natija null boʻlsa, zaxira backend |
| `update` | ✅ Faqat asosiy backend | ✅ Natijani kutmasdan sinxronlash     |
| `delete` | ✅ Faqat asosiy backend | ✅ Natijani kutmasdan sinxronlash     |
| `list`   | ✅ Faqat asosiy backend | ❌                                    |
| `search` | ✅ Avval asosiy backend | ✅ Xatolikda zaxira backend           |

#### GenericMemoryBackend (`genericBackend.ts`)

Har qanday REST APIʼni MemoryBackendga moslashtiradigan universal HTTP konnektor. Quyidagilar uchun foydali:

- **Notion** — Notion API orqali ulanish
- **Obsidian** — Obsidian Local REST API orqali ulanish
- **Maxsus backendlar** — RESTful xotira APIʼsini taqdim etadigan istalgan xizmat

**Konfiguratsiya:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Backend API asosiy URL manzili
  apiKey?: string;           // Autentifikatsiya uchun Bearer tokeni
  headers?: Record<string, string>;  // Maxsus HTTP sarlavhalari
  timeout?: number;          // Soʻrov kutish vaqti (standart: 30000ms)
  backendType?: string;      // Jurnalga yozish uchun

  // Endpointlarni qayta belgilash (standart qiymatlar REST qoidalaridan foydalanadi)
  endpoints?: {
    search?: string;   // standart: "/memories/search"
    create?: string;   // standart: "/memories"
    list?: string;     // standart: "/memories"
    get?: string;      // standart: "/memories/{id}"
    update?: string;   // standart: "/memories/{id}"
    delete?: string;   // standart: "/memories/{id}"
    health?: string;   // standart: "/health"
  };

  // Soʻrov parametrlari nomlari mosliklari
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Yoʻl parametrlari nomlari mosliklari
  pathParams?: {
    id?/memoryId?
  };
}
```

**Maʼlum backendlar** `KNOWN_BACKENDS` ichida oldindan sozlangan:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 manziliga yoʻnaltirilgan GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 manziliga yoʻnaltirilgan GenericMemoryBackend
```

#### Ichki backendlar

##### SQLiteBackend (`sqliteBackend.ts`)

Standart asosiy backend. `src/lib/memory/store.ts` orqali mavjud SQLite asosidagi xotira omborini oʻrab oladi. Ishga tushishda avtomatik ravishda roʻyxatdan oʻtkaziladi.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Mavjud Obsidian integratsiyasini (`src/lib/memory/obsidianBackend.ts`) oʻrab oladi. Obsidian Local REST API orqali Obsidian omboriga ulanadi.

### Sozlamalar

Xotira backend sozlamalari ilova sozlamalari jadvalida saqlanadi va `src/lib/memory/settings.ts` orqali boshqariladi:

| Sozlama             | Muhit/konfiguratsiya kaliti | Standart   | Tavsif                                     |
| ------------------- | --------------------------- | ---------- | ------------------------------------------ |
| Asosiy backend      | `memoryPrimaryBackend`      | `"sqlite"` | Asosiy backend IDsi                        |
| Zaxira backendlar   | `memoryFallbackBackends`    | `[]`       | Tartiblangan zaxira backend IDlari         |
| Backend sozlamalari | `memoryBackendConfigs`      | `{}`       | Har bir backend uchun sozlama ustunliklari |

Sozlamalar `normalizeMemorySettings()` orqali normallashtiriladi va `getMemorySettings()` da keshga olinadi.

### Initsializatsiya jarayoni

```
Ilovani dastlabki yuklash
  → index.ts importlari (yon taʼsir): SQLiteBackendni roʻyxatdan oʻtkazadi
  → initMemoryBackends() ilovaning hayot siklidan chaqiriladi:
      1. Sozlamalarni yuklash (getMemorySettings)
      2. Asosiy + zaxira backendlarni sozlash
      3. Barcha backendlarni initsializatsiya qilish (sogʻliq holatini tekshirish)
      4. Soʻrovlar uchun tayyor
```

### Yangi backend qoʻshish

1. `src/lib/memory/<name>Backend.ts` ichida **`MemoryBackend` interfeysini amalga oshiring**
2. `src/lib/memory/index.ts` dan **eksport qiling**
3. Ishga tushishda `memoryManager.register(yourBackend)` yordamida **roʻyxatdan oʻtkazing**
4. Sozlamalar orqali **sozlang**: `memoryPrimaryBackend` qiymatini backend IDingizga oʻrnating
5. Namuna sifatida `src/lib/memory/__tests__/generic-backend.test.ts` bilan **sinovdan oʻtkazing**

#### Misol: Brain backendi

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

### Tekshirish

#### Modul testlari

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Kutiladigan natija: quyidagilarni qamrab oluvchi **35 ta test, barchasi muvaffaqiyatli**:

- Konstruktor (2)
- Sogʻliq holatini tekshirish (4) — muvaffaqiyat, 500 xatosi, tarmoq xatosi, kechikish
- Initsializatsiya (2) — muvaffaqiyat, muvaffaqiyatsizlik
- Yaratish (2) — standart endpoint, maxsus endpoint
- Olish (4) — muvaffaqiyat, 404 → null, 404 boʻlmagan xatoni chiqarish, maxsus yoʻl parametrlari
- Yangilash (2) — muvaffaqiyat, 404 → false
- Oʻchirish (2) — muvaffaqiyat, 404 → false
- Roʻyxat (2) — soʻrov parametrlari, maxsus parametr nomlari
- Qidirish (3) — soʻrov parametrlari, maxsus endpoint, parametrlarni serializatsiya qilish
- Autentifikatsiya sarlavhalari (2) — Bearer tokeni, maxsus sarlavhalar
- Fabrika (1)

#### Tur tekshiruvi

```bash
npm run typecheck:core
```

Kutiladigan natija: **0 ta xato**.
