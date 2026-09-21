# Memory System (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **แหล่งข้อมูลอ้างอิงหลัก:** `src/lib/memory/` และ `src/app/api/memory/`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40 (ปิดใช้งานโดยค่าเริ่มต้น + การรองรับ int8 quantization ให้สมบูรณ์)

OmniRoute มีหน่วยความจำการสนทนาแบบถาวรซึ่งระบุด้วยคีย์ API (และ
อาจระบุด้วย session id เพิ่มเติมได้) ระบบจะแยกข้อมูลความจำออกจากการตอบกลับของ LLM
โดยอัตโนมัติผ่านการจับคู่รูปแบบ regex แบบน้ำหนักเบา และแทรกกลับเข้าไปใน
คำขอครั้งถัดไปในรูปแบบข้อความ system ที่อยู่ลำดับแรก (หรือข้อความ user แรกสำหรับผู้ให้บริการที่
ปฏิเสธบทบาท system)

> **หน่วยความจำปิดใช้งานโดยค่าเริ่มต้น (v3.8.30+)** ขณะนี้ `DEFAULT_MEMORY_SETTINGS.enabled`
> เป็น `false` (`src/lib/memory/settings.ts`) การเปิดใช้งานหน่วยความจำจะแทรกบริบทที่ดึงมา
> สูงสุด `maxTokens` (~2k) ลงในคำขอแชต **ทุกคำขอ** ซึ่งมีการคิดค่าบริการ
> และอาจเป็นค่าใช้จ่ายที่คาดไม่ถึงสำหรับการติดตั้งใหม่และไคลเอนต์ที่จัดการ
> บริบทของตนเอง ให้เลือกเปิดใช้งานอย่างชัดเจนภายใต้ **Settings → Memory** (แท็บ
> `MemorySkillsTab` จะแสดงคำเตือนเกี่ยวกับค่าใช้จ่ายด้านโทเค็นเมื่อเปิดใช้งานหน่วยความจำ)
> ไคลเอนต์สามารถเลือกไม่ใช้หน่วยความจำสำหรับคำขอใดคำขอหนึ่งได้ด้วยเฮดเดอร์คำขอ
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — ดูตารางเฮดเดอร์คำขอใน
> [API_REFERENCE.md](../reference/API_REFERENCE.md) คำขอที่ไม่ใช้หน่วยความจำจะกำหนด
> `memoryOwnerId = null` ซึ่งปิดใช้งานการแทรก **ทั้ง** หน่วยความจำและสกิลสำหรับ
> คำขอนั้น (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`)

หน่วยความจำถูก **กำหนดขอบเขตแยกตามคีย์ API** ไม่ใช่ตามผู้ใช้ — ทุกคำขอที่ยืนยันตัวตน
ด้วยคีย์ API เดียวกันจะใช้พูลหน่วยความจำเดียวกัน โดยสามารถกำหนดขอบเขตเพิ่มเติม
ด้วย `sessionId` ได้

## สถาปัตยกรรม

```
ไคลเอนต์ → /v1/chat/completions (apiKeyInfo ถูกกำหนดค่าก่อนหน้านี้)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # แยก id
    → getMemorySettings()                     # การตั้งค่าที่แคชไว้
    → shouldInjectMemory(body, {enabled})     # จุดควบคุม
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + เวกเตอร์แบบเลือกใช้ได้
    → injectMemory(body, memories, provider)  # ข้อความ system หรือ user
  → เรียกผู้ให้บริการต้นทาง
  → เมื่อมีการตอบกลับ: extractFacts(text, apiKeyId, sessionId)  # ไม่บล็อกการทำงาน
    → setImmediate → createMemory(fact) ต่อรายการที่ตรงกัน
                   → embed(content) + upsertVector(id, vec)
```

จุดเรียกสำหรับการแทรกและการแยกข้อมูลเชื่อมต่ออยู่ใน
`open-sse/handlers/chatCore.ts` (ค้นหา `retrieveMemories`, `injectMemory`
และ `extractFacts`)

## สถาปัตยกรรมเอนจิน (การเลือกใช้แบบ 3 ระดับ)

Memory Engine จะกำหนดเส้นทางการดึงข้อมูลขณะรันไทม์ตามโครงสร้างพื้นฐาน
และการตั้งค่าที่พร้อมใช้งาน โดยมีสามระดับซึ่งใช้ตามลำดับความสำคัญดังนี้:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  ระดับ 0 — คีย์เวิร์ด (FTS5)                                │
  │  ความพร้อมใช้งานขับเคลื่อนโดยการตรวจสอบ: ใช้ FTS5 เมื่อ     │
  │  บิลด์ SQLite รองรับ (better-sqlite3 / node:sqlite /         │
  │  bun:sqlite); ไม่พร้อมใช้งานในบิลด์ที่ไม่มี FTS5             │
  │  (เช่น sql.js/WASM — "no such module: fts5") ใช้เมื่อ        │
  │  strategy = "exact" หรือใช้เป็นทางเลือกสำรอง; สถานะ keyword │
  │  ของเอนจินสะท้อนผลจากการตรวจสอบ                              │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ระดับ 1 — เวกเตอร์แบบฝังตัว (sqlite-vec)                   │
  │  โหลด sqlite-vec v0.1.9 ผ่าน db.loadExtension()              │
  │  ค้นหา KNN แบบ brute-force บนเวกเตอร์ Float32 ทำงานเมื่อ:   │
  │   • โหลดส่วนขยาย sqlite-vec ผ่าน loadExtension สำเร็จ       │
  │   • มีแหล่ง embedding (remote | static | transformers)       │
  │     ที่สามารถสร้าง Float32Array ได้                          │
  │   • มีตาราง vec_memories (สร้างขึ้นเมื่อ ready() ครั้งแรก)  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ระดับ 2 — Qdrant (ฐานข้อมูลเวกเตอร์ภายนอกที่เลือกใช้ได้)   │
  │  เมื่อเปิดใช้งาน จะแทนที่ sqlite-vec สำหรับ semantic/hybrid │
  │  ต้องมีอินสแตนซ์ Qdrant ที่กำลังทำงานและกำหนด host/port แล้ว│
  └─────────────────────────────────────────────────────────────┘
```

การลดระดับการทำงานเป็นไปโดยอัตโนมัติและโปร่งใส:

- หากโหลด sqlite-vec ไม่สำเร็จ ระดับ 1 จะไม่พร้อมใช้งาน → ย้อนกลับไปใช้ระดับ 0
- หากแหล่ง embedding ส่งคืนข้อผิดพลาด ระดับ 1 จะย้อนกลับไปใช้ระดับ 0
- หาก Qdrant มีสถานะไม่พร้อมใช้งาน ระดับ 2 จะย้อนกลับไปใช้ระดับ 1 (หรือระดับ 0 หากระดับ 1
  ไม่พร้อมใช้งานเช่นกัน)

## แหล่งที่มาของ embedding

เลเยอร์ embedding (`src/lib/memory/embedding/`) จะเลือกแหล่งที่มาที่จะใช้
ตาม `MemorySettingsExtended.embeddingSource`:

| แหล่งที่มา     | คำอธิบาย                                                                         | ต้องใช้คีย์         | การเริ่มต้นแบบเย็น  |
| -------------- | -------------------------------------------------------------------------------- | ------------------- | ------------------- |
| `remote`       | ใช้ embedding API ของผู้ให้บริการที่กำหนดค่าไว้ (OpenAI, Cohere เป็นต้น)         | ใช่                 | ไม่มี               |
| `static`       | embedding จากตารางค้นหาในเครื่องผ่าน `potion-base-8M` (WordPiece + mean pooling) | ไม่                 | ~200ms              |
| `transformers` | การอนุมาน ONNX ในเครื่องผ่าน `@huggingface/transformers` v4, `all-MiniLM-L6-v2`  | ไม่                 | ~3s + RAM ~400MB    |
| `auto`         | เลือกขณะรัน: remote (หากมีคีย์) → static → transformers → null                   | ขึ้นอยู่กับเงื่อนไข | ขึ้นอยู่กับเงื่อนไข |

**ลำดับการเลือกสำหรับ `auto`:**

1. ค้นหาผู้ให้บริการรายแรกใน `listEmbeddingProviders()` ที่มี `hasKey === true` → `remote`
2. หาก `settings.staticEnabled === true` → `static`
3. หาก `settings.transformersEnabled === true` → `transformers`
4. มิฉะนั้น → `null` (ลดระดับไปใช้การค้นหาคำสำคัญด้วย FTS5)

แคช embedding (`src/lib/memory/embedding/cache.ts`) ใช้แมป LRU ในหน่วยความจำ
โดยใช้ `${source}:${model}:${dim}:${sha256(text)}` เป็นคีย์ จำกัดไว้ที่
`MEMORY_EMBEDDING_CACHE_MAX` รายการ (ค่าเริ่มต้น 1000) และมี TTL เท่ากับ
`MEMORY_EMBEDDING_CACHE_TTL_MS` (ค่าเริ่มต้น 5 นาที) โดยใช้ร่วมกันระหว่างผู้เรียกทั้งหมด
ตลอดวงจรชีวิตของแต่ละโปรเซส

## Hybrid RRF (k=60)

เมื่อ `strategy = "hybrid"` และ vector store พร้อมใช้งาน การดึงข้อมูลจะใช้
Reciprocal Rank Fusion เพื่อรวมผลลัพธ์จาก FTS5 และเวกเตอร์:

```
RRF(d) = Σ  1 / (k + rank_i(d))      โดยที่ k = 60 (กำหนดค่าได้ผ่าน MEMORY_RRF_K)
          i
```

กล่าวโดยละเอียด:

1. เรียกใช้การค้นหา FTS5 → รายการที่จัดอันดับแล้ว `R_fts` (ตำแหน่ง 1..N)
2. เรียกใช้การค้นหาเวกเตอร์ KNN → รายการที่จัดอันดับแล้ว `R_vec` (ตำแหน่ง 1..M)
3. สำหรับ `memoryId` แต่ละรายการที่ไม่ซ้ำกัน:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (เป็น 0 หากไม่อยู่ในรายการ)
4. เรียงตาม `rrf_score` แบบ DESC แล้วดำเนินการไล่ตามงบประมาณโทเค็น

RRF เป็นที่ยอมรับอย่างแพร่หลายว่ามีประสิทธิภาพโดยไม่จำเป็นต้องปรับคะแนนให้อยู่ในมาตรฐานเดียวกันระหว่าง
ระบบดึงข้อมูลที่แตกต่างกัน ค่าเริ่มต้น `k=60` มาจากงานวิจัยต้นฉบับของ
Cormack และคณะ และทำงานได้ดีกับคลังข้อมูลขนาดเล็ก (<10k ความทรงจำ)

## การ backfill (แบบ lazy + reindex)

เมื่อโมเดล embedding เปลี่ยนแปลง (ตรวจพบผ่าน `embedding_signature`)
vector store จะถูกสร้างใหม่ และความทรงจำที่มีอยู่ทั้งหมดจะถูกทำเครื่องหมายเป็น
`needs_reindex = 1` ในตาราง `memories`

**Lazy backfill**: ในการดึงข้อมูลครั้งถัดไป ความทรงจำใดก็ตามที่ไม่มีรายการเวกเตอร์
จะถูกแปลงเป็น embedding และแทรกลงใน `vec_memories` ก่อนเริ่มการค้นหา วิธีนี้
ช่วยเฉลี่ยต้นทุนของการ backfill ไปยังคำขอจริงโดยไม่ขัดขวางการเริ่มต้นระบบ

**Explicit reindex**: แท็บ Engine ใน `/dashboard/memory` มีปุ่ม
"สร้างดัชนีใหม่ตอนนี้" ซึ่งเรียก `POST /api/memory/reindex` ตัวจัดการจะเรียก
`runReindexBatch()` จาก `src/lib/memory/reindex.ts` ซึ่งประมวลผลรายการที่รอดำเนินการได้สูงสุด
`limit` รายการต่อคำขอ สามารถสำรวจความคืบหน้าได้ผ่าน
`GET /api/memory/engine-status` (`vectorStore.needsReindex`)

ตาราง `memory_vec_meta` (การย้ายข้อมูล `083_memory_vec.sql`) จัดเก็บ:

- `active_dim` — มิติเวกเตอร์ปัจจุบัน (null = ยังไม่ได้ปรับเทียบ)
- `embedding_signature` — `${source}:${model}:${dim}` ซึ่งใช้ตรวจจับการเปลี่ยนแปลง
- `last_reset_at` — การประทับเวลาของการรีเซ็ตทั้งหมดครั้งล่าสุด
- `vec_loaded` — แฟล็ก 0/1 ที่ระบุว่าโหลด sqlite-vec สำเร็จหรือไม่

## ส่วนขยายการตั้งค่า

มีฟิลด์ embedding และเวกเตอร์ทั้งหมด 9 ฟิลด์ใน `MemorySettingsExtended` ที่
`src/shared/schemas/memory.ts` และจัดเก็บถาวรผ่าน `src/lib/db/settings.ts`:

| ฟิลด์                    | ชนิด                                               | ค่าเริ่มต้น | คำอธิบาย                                                       |
| ------------------------ | -------------------------------------------------- | ----------- | -------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`    | แหล่ง embedding ที่จะใช้                                       |
| `embeddingProviderModel` | `string \| null`                                   | `null`      | ผู้ให้บริการ/โมเดลในรูปแบบ `provider/model`                    |
| `customBaseUrl`          | `string \| null`                                   | `null`      | URL ฐานของ endpoint ที่เข้ากันได้กับ OpenAI และใช้เฉพาะ Memory |
| `customModelId`          | `string \| null`                                   | `null`      | ID โมเดลที่ส่งไปยัง endpoint แบบกำหนดเอง                       |
| `transformersEnabled`    | `boolean`                                          | `false`     | เลือกเปิดใช้ Transformers.js (MiniLM, ~400MB)                  |
| `staticEnabled`          | `boolean`                                          | `false`     | เลือกเปิดใช้โมเดลภายในเครื่องแบบคงที่ potion-base-8M           |
| `rerankEnabled`          | `boolean`                                          | `false`     | เปิดใช้ขั้นตอนการจัดอันดับใหม่ (เพิ่ม +200-500ms/คำขอ)         |
| `rerankProviderModel`    | `string \| null`                                   | `null`      | ผู้ให้บริการ/โมเดลสำหรับจัดอันดับใหม่ในรูปแบบ `provider/model` |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`    | แบ็กเอนด์เวกเตอร์ที่จะใช้                                      |

ฟิลด์เหล่านี้เปิดให้ใช้งานผ่าน `GET /PUT /api/settings/memory` (สคีมา `MemorySettingsExtendedSchema`)

สำหรับแหล่งข้อมูล `remote` นั้น Memory ยังรองรับการตั้งค่า `customBaseUrl` และ
`customModelId` ซึ่งเป็นทางเลือก เมื่อใช้ร่วมกัน การตั้งค่าเหล่านี้จะเลือก endpoint
`/embeddings` และโมเดลที่เข้ากันได้กับ OpenAI โดยไม่เปลี่ยนแปลงรีจิสทรี embedding ส่วนกลาง
endpoint จะได้รับการปรับรูปแบบให้เป็นมาตรฐานก่อนใช้งานและตรวจสอบตามนโยบาย URL ขาออกของผู้ให้บริการ:
จำเป็นต้องใช้ HTTP(S), ไม่อนุญาตข้อมูลรับรองที่ฝังอยู่และสตริงคำค้นหา และยังคงบล็อก
ที่อยู่ข้อมูลเมตาของระบบคลาวด์ ค่าว่างจะคงผู้ให้บริการรีจิสทรีที่เลือกไว้ ข้อผิดพลาด
ที่ส่งกลับไปยังแดชบอร์ดจะถูกกรองข้อมูลที่ละเอียดอ่อน และจะไม่มีการบันทึกข้อมูลรับรองของ endpoint ลงในล็อก

> **TODO (D20):** ขอบเขต `global` (การแชร์หน่วยความจำระหว่าง API key ทั้งหมด) ยังไม่ได้
> นำมาใช้ในรีลีสนี้ โดยต้องมีการเปลี่ยนแปลงสคีมาและเส้นทางการเรียกค้นแบบส่วนกลาง
> ให้ติดตามแยกต่างหาก

## ชั้นการจัดเก็บข้อมูล

### หลัก: SQLite (ตาราง `memories`)

สร้างโดย migration `015_create_memories.sql`:

| คอลัมน์                     | ชนิด               | หมายเหตุ                                                                 |
| --------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID ที่สร้างผ่าน `crypto.randomUUID()`                                  |
| `api_key_id`                | `TEXT NOT NULL`    | API key ที่เป็นเจ้าของ                                                   |
| `session_id`                | `TEXT`             | ขอบเขตต่อบทสนทนาซึ่งเป็นทางเลือก                                         |
| `type`                      | `TEXT NOT NULL`    | หนึ่งใน `factual`, `episodic`, `procedural`, `semantic`                  |
| `key`                       | `TEXT`             | คีย์ upsert ที่คงที่ เช่น `preference:i_prefer_python`                   |
| `content`                   | `TEXT NOT NULL`    | ข้อความข้อเท็จจริงจริง                                                   |
| `metadata`                  | `TEXT`             | JSON blob (category, extractedAt, source, ...)                           |
| `created_at` / `updated_at` | `TEXT`             | สตริง ISO 8601                                                           |
| `expires_at`                | `TEXT`             | วันหมดอายุซึ่งเป็นทางเลือก; `NULL` หมายถึงถาวร                           |
| `memory_id`                 | `INTEGER UNIQUE`   | เพิ่มโดย `023_fix_memory_fts_uuid.sql` เพื่อเชื่อม UUID ↔ rowid ของ FTS5 |

ดัชนี: `api_key_id`, `session_id`, `type`, `expires_at` รวมถึงดัชนี
`memory_id` ที่ไม่ซ้ำกัน

**ความหมายของ Upsert**: `createMemory()` จะค้นหาแถวที่มี
`(api_key_id, key)` เหมือนกัน และอัปเดตแถวนั้นโดยตรงเมื่อพบ (ผสาน `metadata` ผ่าน
shallow spread) วิธีนี้ช่วยป้องกันไม่ให้ตารางเติบโตอย่างไร้ขอบเขตจากคำสั่งระบุ
การตั้งค่าที่ซ้ำกัน

### การค้นหาแบบเต็มข้อความ (ตารางเสมือน `memory_fts`)

`022_add_memory_fts5.sql` สร้างตารางเสมือน FTS5 ครอบคลุม `content` และ
`key` ส่วน `023_fix_memory_fts_uuid.sql` แก้ไขบั๊กที่พบในการใช้งานจริง ซึ่ง primary key
แบบ UUID ไม่สามารถ join กับ rowid จำนวนเต็มของ FTS5 ได้ โดย migration นี้จะเพิ่มคอลัมน์
`memory_id`, สร้างตาราง FTS ใหม่ และเชื่อมต่อทริกเกอร์
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ที่ทำให้ FTS ซิงค์กันเมื่อมี
INSERT, DELETE และ UPDATE

ใช้โดย `retrieval.ts` สำหรับกลยุทธ์ `semantic` และ `hybrid` (ดูด้านล่าง)
โค้ดการเรียกค้นจะตรวจสอบด้วย `hasTable("memory_fts")` และย้อนกลับไปใช้
ลำดับตามเวลาหากไม่มีตาราง FTS หรือคำค้น FTS เกิดข้อผิดพลาด

### ทางเลือก: Qdrant (ที่เก็บเวกเตอร์ระดับ 2)

`src/lib/memory/qdrant.ts` นำเสนอการผสานรวม Qdrant แบบทางเลือกในฐานะที่เก็บ
เวกเตอร์ระดับ 2 การเรียกค้นจะส่งเส้นทางไปยัง Qdrant เฉพาะเมื่อตัวเลือกเอนจิน
`memoryVectorStore === "qdrant"` เท่านั้น โดยค่าเริ่มต้น `"auto"` (และ `"sqlite-vec"`)
จะ **ไม่** เลือก Qdrant ตัวสลับในแท็บ Engine จะตั้งค่า **ทั้ง** `qdrantEnabled` และ
`memoryVectorStore` พร้อมกัน: การเปิดใช้งานทำให้ Qdrant เป็นที่เก็บหลัก ส่วนการปิดใช้งาน
จะรีเซ็ตเป็น `"auto"` (#5597 — ก่อนการแก้ไขดังกล่าว การเปิดใช้งานไม่มีผลเนื่องจากไม่มีสิ่งใด
เขียนค่าลงในตัวเลือกเอนจิน) หากไม่สามารถเข้าถึง Qdrant หรือ Qdrant ไม่ส่งคืนข้อมูล การเรียกค้น
จะย้อนกลับไปใช้ sqlite-vec → FTS5

- `upsertSemanticMemoryPoint()` — ฝังเวกเตอร์จาก `key + content` ด้วยโมเดล
  embedding ที่กำหนดค่าไว้ ตรวจสอบให้แน่ใจว่ามีคอลเลกชันอยู่แล้ว (สร้างเวกเตอร์แบบ
  cosine-distance เมื่อใช้งานครั้งแรก) และ upsert จุดพร้อม payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`
- `searchSemanticMemory(query, topK, scope)` — ฝังเวกเตอร์จากคำค้นหา ค้นหาใน
  คอลเลกชันโดยกรองด้วย `kind = "omniroute_memory"` และอาจกรองเพิ่มเติมด้วย
  `apiKeyId` / `sessionId` จำกัด `topK` ให้อยู่ในช่วง `[1, 20]`
- `deleteSemanticMemoryPoint(id)` — ลบจุดเดียว ถูกเรียกโดย
  `deleteMemory()` หลังจากลบแถวใน SQLite แล้ว (D15)
- `cleanupSemanticMemoryPoints({retentionDays})` — ลบจุดแบบกลุ่มที่
  `expiresAtUnix` ผ่านพ้นไปแล้ว หรือมี `createdAtUnix` เก่ากว่าเกณฑ์
  การเก็บรักษา โดยนับจำนวนก่อนเพื่อให้แดชบอร์ดแสดงตัวเลขจริงได้
- `checkQdrantHealth()` — โพรบสถานะด้วย `GET /readyz` พร้อมวัดเวลาแฝง

UI การตั้งค่าเปิดให้กำหนดค่า Qdrant ตรวจสอบสถานะ ทดสอบการค้นหาเชิงความหมาย
และล้างข้อมูลได้ใน **แท็บ Engine** ของ `/dashboard/memory` โดย route ที่เกี่ยวข้อง
ภายใต้ `src/app/api/settings/qdrant/` เชื่อมต่อเรียบร้อยทั้งหมดแล้วตั้งแต่ v3.8.6:

| Route                                   | เมธอด         | คำอธิบาย                                 |
| --------------------------------------- | ------------- | ---------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | อ่าน / อัปเดตการตั้งค่า Qdrant           |
| `/api/settings/qdrant/health`           | `GET`         | โพรบความพร้อมใช้งาน + เวลาแฝง            |
| `/api/settings/qdrant/search`           | `POST`        | ทดสอบการค้นหาเชิงความหมาย                |
| `/api/settings/qdrant/cleanup`          | `POST`        | ลบจุดที่หมดอายุ / เก่าแล้ว               |
| `/api/settings/qdrant/embedding-models` | `GET`         | แสดงรายการโมเดล embedding ที่พร้อมใช้งาน |

**หมายเหตุด้านพฤติกรรม (สิ่งที่ควรคาดหวัง):**

- **การเลือก Engine** — การเปิดใช้ Qdrant ในแท็บ Engine จะทำให้เป็น
  ที่จัดเก็บหลัก (ตั้งค่า `memoryVectorStore="qdrant"`) ส่วนการปิดใช้จะรีเซ็ตเป็น `"auto"` (#5597)
- **ไม่มีการเติมข้อมูลย้อนหลัง** — เฉพาะหน่วยความจำที่สร้าง/อัปเดต **หลังจาก** เปิดใช้ Qdrant
  เท่านั้นที่จะถูกเขียนลงไป (การเขียนสองแห่งแบบ fire-and-forget) หน่วยความจำ SQLite
  ที่มีอยู่ก่อน **จะไม่** ถูกย้ายข้อมูล ส่วน "Reindex Now" จะสร้างเฉพาะดัชนี sqlite-vec
  ขึ้นใหม่เท่านั้น ไม่ใช่ Qdrant
- **มิติเวกเตอร์จะถูกตรวจหาโดยอัตโนมัติ** จาก embedding จริงเมื่อใช้งานครั้งแรก —
  ไม่มีช่องมิติให้กรอก การเปลี่ยนโมเดล embedding หลังจากมีคอลเลกชันแล้ว
  **จะไม่** ถูกจัดการโดยอัตโนมัติ กล่าวคือคอลเลกชันเดิมจะไม่ถูกแก้ไข การเขียน/ค้นหาที่
  มีมิติไม่ตรงกันจะล้มเหลวและย้อนกลับไปใช้ sqlite-vec หากต้องการเปลี่ยน embedder
  ให้สร้างคอลเลกชันใหม่ (ใช้ชื่อใหม่หรือลบคอลเลกชันเดิมใน Qdrant)
- **เมตริกระยะห่าง** — เป็น **Cosine** เสมอ (กำหนดตายตัวเมื่อสร้างคอลเลกชัน
  และไม่สามารถกำหนดค่าได้)
- **การยืนยันตัวตน** — ใช้ API key เท่านั้น (ส่งผ่าน header `api-key` และเป็นตัวเลือก
  สำหรับ Docker ภายในเครื่องที่ไม่ใช้การยืนยันตัวตน) ไม่มีการใช้ JWT/RBAC
- **ช่องการกำหนดค่า** — UI มีช่อง `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` ส่วน `vectorSize` / `hnswEfConstruct` ใช้ได้เฉพาะผ่าน env/DB และไม่มีการใช้
  `vectorSize` ในการสร้างคอลเลกชัน (มิติมาจาก embedding)

### การทำ Vector quantization (int8 — เลือกเปิดใช้ได้สำหรับทั้งสอง backend)

backend เวกเตอร์ทั้งสองรองรับ **int8 quantization แบบเลือกเปิดใช้** เพื่อลดพื้นที่
หน่วยความจำของเวกเตอร์ที่จัดเก็บ (~เล็กกว่า Float32 ถึง 4 เท่า) โดยแลกกับ recall
ที่ลดลงเล็กน้อย ค่าเริ่มต้นของทั้งสองแบบคือ **ปิด** — เวกเตอร์จะคงความแม่นยำเต็มรูปแบบ
เว้นแต่จะเปิดใช้อย่างชัดเจน

| Backend    | การตั้งค่า                      | ชนิด                           | ค่าเริ่มต้น | ตำแหน่งที่อ่าน                                              |
| ---------- | ------------------------------- | ------------------------------ | ----------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (คีย์ DB)  | `"none" \| "int8" \| "binary"` | `"none"`    | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`    | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ถูกกำหนดค่าแยกต่อ instance ผ่านคีย์การตั้งค่า `qdrantQuantization`
  (เปิดให้ใช้ในรูปช่อง `quantization` บน `PUT /api/settings/qdrant`) เมื่อเป็น
  `"int8"` ฟังก์ชัน `buildQuantizationConfig()` จะร้องขอ scalar quantization
  (`always_ram`, quantile `0.99`) และการค้นหาจะเปิดใช้ `rescore: true` เพื่อให้
  เวกเตอร์ความแม่นยำเต็มรูปแบบช่วยปรับแต่งชุดตัวเลือก int8
- quantization ของ **sqlite-vec** ใช้ได้ **ผ่านสภาพแวดล้อมเท่านั้น** (ไม่ใช่การตั้งค่า DB):
  ตั้งค่า `MEMORY_VEC_QUANTIZATION=int8` เพื่อจัดเก็บเวกเตอร์ภายในเป็นคอลัมน์
  `int8[dim]` ผ่าน `vec_quantize_int8(?, 'unit')` โหมดที่เลือกจะถูกรวมไว้ใน
  `embedding_signature` (ด้วยส่วนต่อท้าย `:int8`) ดังนั้นการสลับโหมดจะทำให้เกิด
  การสร้างดัชนีใหม่ทั้งหมดของตาราง `vec_memories` — โดยใช้เส้นทาง lazy-backfill
  เดียวกับเมื่อมีการเปลี่ยนโมเดล embedding

## ประเภทหน่วยความจำ

`MemoryType` (`src/lib/memory/types.ts`):

| ประเภท       | ใช้สำหรับ                                                                             |
| ------------ | ------------------------------------------------------------------------------------- |
| `factual`    | ความชอบ ข้อเท็จจริงเกี่ยวกับผู้ใช้ที่คงที่ รูปแบบพฤติกรรม                             |
| `episodic`   | การตัดสินใจที่ผูกกับช่วงเวลาหนึ่งโดยเฉพาะ ("ฉันเลือก Postgres")                       |
| `procedural` | หน่วยความจำเกี่ยวกับเวิร์กโฟลว์ / วิธีการ (สงวนไว้; ปัจจุบันยังไม่มีตัวสกัดอัตโนมัติ) |
| `semantic`   | สงวนไว้สำหรับรายการใน vector store                                                    |

กลยุทธ์การดึงข้อมูลของ `MemoryConfig` เป็นหนึ่งใน `exact`, `semantic` หรือ `hybrid`
และขอบเขตเป็นหนึ่งใน `session`, `apiKey` หรือ `global` ขอบเขตเริ่มต้นจาก
`getMemorySettings()` คือ `apiKey`

## การสกัดข้อเท็จจริง (`extraction.ts`)

การสกัดข้อมูลทำงานโดยใช้ **regex** ไม่ใช่ LLM — โดยจะทำงานภายในโปรเซสด้วย
`setImmediate()` จึงไม่ขัดขวางสตรีมการตอบกลับ:

- **รูปแบบความชอบ** → `MemoryType.FACTUAL`
  (เช่น `ฉันชอบ …`, `ฉันชอบ … มาก`, `สิ่งที่ฉันชอบที่สุดคือ …`, `ฉันเกลียด …`)
- **รูปแบบการตัดสินใจ** → `MemoryType.EPISODIC`
  (เช่น `ฉันจะใช้ …`, `ฉันเลือก …`, `ฉันตัดสินใจใช้ …`, `ฉันกำลังจะนำ … มาใช้`)
- **รูปแบบพฤติกรรม** → `MemoryType.FACTUAL`
  (เช่น `โดยปกติฉัน …`, `ฉันมักจะ … เสมอ`, `ฉันมีแนวโน้มที่จะ …`)

แต่ละรายการที่ตรงกันจะถูกทำให้ปลอดภัย (`trim`, ยุบช่องว่าง และจำกัดไว้ที่ 500 อักขระ)
กำจัดรายการซ้ำภายในแบตช์ผ่าน `factKey(category, content)` ที่ให้ผลลัพธ์คงที่ และ
จัดเก็บผ่าน `createMemory()` พร้อมข้อมูลเมตา
`{category, extractedAt, source: "llm_response"}` ข้อความอินพุตถูกจำกัดไว้ที่
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — เมื่อข้อความยาวเกินกำหนด ระบบจะใช้
**ส่วนท้าย** ของข้อความ เพื่อให้เนื้อหาล่าสุดจากผู้ช่วยมีส่วนร่วมในการประมวลผลเสมอ

`extractFactsFromText(text)` ถูก export สำหรับการทดสอบ และส่งคืนข้อเท็จจริง
ที่มีโครงสร้างโดยไม่จัดเก็บข้อมูลเหล่านั้น

## การดึงข้อมูล (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` เป็นจุดเริ่มต้นหลัก โดยจะ:

1. ปรับรูปแบบและตรวจสอบความถูกต้องของ config ผ่าน `MemoryConfigSchema`
2. ส่งคืน `[]` ทันทีเมื่อ `enabled` เป็น false หรือ `maxTokens <= 0`
3. จำกัด `maxTokens` ให้อยู่ในช่วง `[1, 8000]`
4. ตรวจสอบว่ามีตาราง `memories` แบบใหม่อยู่หรือไม่ (เทียบกับตาราง `memory`
   แบบเดิม) เพื่อให้ฐานข้อมูลรุ่นเก่ายังคงทำงานได้
5. สร้างคิวรีพื้นฐานพร้อมเงื่อนไขป้องกันข้อมูลหมดอายุ
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`) รวมถึง
   ขอบเขต session ที่เป็นทางเลือก และเกณฑ์ตัดตาม `retentionDays` ที่เป็นทางเลือก
6. แยกการทำงานตามกลยุทธ์:
   - **`exact`** (ค่าเริ่มต้น): เรียงตามลำดับเวลา `ORDER BY created_at DESC LIMIT 100`
   - **`semantic`**: หากมี `config.query` และ `memory_fts` ให้ JOIN
     ด้วย `memory_fts MATCH ?` และเรียงตามอันดับ FTS; เปลี่ยนกลับไปใช้การเรียง
     ตามลำดับเวลาเมื่อ FTS ส่งคืน 0 แถว
   - **`hybrid`**: รวมผลลัพธ์ FTS (มีความเกี่ยวข้องสูงกว่า) เข้ากับชุดข้อมูล
     ตามลำดับเวลา และกำจัดรายการซ้ำตาม id
7. คำนวณคะแนนความเกี่ยวข้องของคีย์เวิร์ด (`getRelevanceScore`) จาก
   `content`, `key` และ JSON ใน `metadata` เมื่อมีคิวรี ระบบจะกรองแถวที่มี
   คะแนนเป็นศูนย์ออก
8. เรียงตามคะแนนจากมากไปน้อย แล้วตาม `createdAt` จากใหม่ไปเก่า
9. ไล่ตามรายการที่จัดอันดับไว้และรับรายการเข้ามาตราบใดที่ผลรวมสะสมของ
   `estimateTokens(content)` (≈ `length / 4`) ยังไม่เกินงบประมาณ โดยจะส่งคืน
   อย่างน้อยหนึ่งรายการเสมอเมื่อมีรายการที่ตรงกัน

`estimateTokens` ถูก export และใช้โดยการดึงข้อมูล การสรุป และเครื่องมือ MCP
`omniroute_memory_search`

## การฉีดข้อมูล (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. รวมเนื้อหาหน่วยความจำทั้งหมดเป็นสตริง `Memory context: …` เดียว
2. เลือกกลยุทธ์ตามชื่อผู้ให้บริการ:
   - **ข้อความระบบ** (ค่าเริ่มต้นสำหรับ OpenAI, Anthropic, Gemini, …) — เพิ่ม
     `{role: "system", content: memoryText}` ไว้ข้างหน้าข้อความระบบที่มีอยู่
     เพื่อให้พรอมป์ระบบของผู้ใช้ยังคงมีลำดับความสำคัญเหนือกว่า
   - **ข้อความผู้ใช้** (กลยุทธ์สำรอง) — สำหรับผู้ให้บริการใน
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan` ผู้ให้บริการเหล่านี้ปฏิเสธบทบาทระบบ
     และมิฉะนั้นจะส่งคืน 400 (ดู issue #1701 สำหรับ GLM/Zhipu)
3. บันทึกจำนวน กลยุทธ์ และโมเดลภายใต้ `memory.injection.injected`

มีการ export `providerSupportsSystemMessage(provider)` สำหรับผู้เรียกใช้ที่ต้องการ
ตัดสินใจเกี่ยวกับการกำหนดเส้นทางด้วยตนเอง ผู้ให้บริการที่ไม่รู้จักจะมีค่าเริ่มต้นเป็น `true`
(อนุญาตบทบาทระบบ) เพื่อความปลอดภัย

## การตั้งค่า (`settings.ts`)

การกำหนดค่าหน่วยความจำจะถูก **จัดเก็บในตาราง settings ของ DB** ไม่ใช่ใน env vars
`getMemorySettings()` อ่านข้อมูลจาก `getSettings()` และแคชผลลัพธ์
ภายในโปรเซส โดย route PUT ของการตั้งค่าจะเรียก `invalidateMemorySettingsCache()`
หลังจากเขียนข้อมูล

### ฟิลด์เดิม (ทุกเวอร์ชัน)

| คีย์ DB               | ชนิด    | ค่าเริ่มต้น                                                  | ตัวควบคุม UI                              |
| --------------------- | ------- | ------------------------------------------------------------ | ----------------------------------------- |
| `memoryEnabled`       | boolean | `false` (ปิดโดยค่าเริ่มต้นตั้งแต่ v3.8.30)                   | เปิด/ปิดหน่วยความจำ                       |
| `memoryMaxTokens`     | integer | `2000` (ช่วง `0–16000`)                                      | งบประมาณโทเค็นสำหรับการฉีดข้อมูล          |
| `memoryRetentionDays` | integer | `30` (ช่วง `1–365`)                                          | ช่วงเวลาการเก็บรักษา                      |
| `memoryStrategy`      | enum    | `"hybrid"` (ค่าใดค่าหนึ่งจาก `recent`, `semantic`, `hybrid`) | กลยุทธ์การดึงข้อมูล                       |
| `skillsEnabled`       | boolean | `false`                                                      | เปิด/ปิดการฉีดทักษะต่อคีย์ (ดู SKILLS.md) |

หมายเหตุ: กลยุทธ์ UI `"recent"` จะถูกแมปไปยังกลยุทธ์การดึงข้อมูลภายใน `"exact"`
ผ่าน `toMemoryRetrievalConfig()` (เรียงตามลำดับเวลา)

### ฟิลด์ใหม่ (v3.8.6, แผน 21 D9)

ดูคำอธิบายฟิลด์เพิ่มเติมได้ในส่วน "ส่วนขยายการตั้งค่า" ด้านบน

| คีย์ DB                     | ฟิลด์ API                | ค่าเริ่มต้น |
| --------------------------- | ------------------------ | ----------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`    |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`      |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`     |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`     |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`     |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`      |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`    |

คีย์ DB ที่เกี่ยวข้องกับ Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` มีค่าเริ่มต้นเป็น `"omniroute_memory"`,
`qdrantEmbeddingModel` มีค่าเริ่มต้นเป็น `"openai/text-embedding-3-small"`) จะถูกอ่านโดย
`normalizeQdrantConfig()` ใน `qdrant.ts`

### ตัวแปรสภาพแวดล้อม (v3.8.6)

env vars ที่เป็นตัวเลือกหกรายการใช้ปรับแต่งพฤติกรรมรันไทม์ของเอนจิน (มีเอกสารใน `.env.example`):

| ตัวแปร                          | ค่าเริ่มต้น                | คำอธิบาย                                                                                                                                                  |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL ของแคช embedding (5 นาที)                                                                                                                             |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | จำนวนรายการสูงสุดในแคช embedding แบบ LRU                                                                                                                  |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF repo สำหรับโมเดล Transformers.js                                                                                                                       |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF repo สำหรับโมเดล potion แบบคงที่                                                                                                                       |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ตำแหน่งที่ใช้จัดเก็บโมเดลที่ดาวน์โหลด                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | ค่า top-K เริ่มต้นสำหรับการค้นหาแบบเวกเตอร์                                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | ค่าคงที่ k ของ RRF สำหรับการค้นหาแบบไฮบริด                                                                                                                |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | ตั้งค่าเป็น `int8` เพื่อจัดเก็บเวกเตอร์ sqlite-vec ภายในเครื่องแบบ quantized (เล็กลงประมาณ 4 เท่า; ต้องเลือกเปิดใช้) การเปลี่ยนโหมดจะบังคับให้ทำดัชนีใหม่ |

## การสรุป (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` ย่อเนื้อหาเก่าเมื่อจำนวนโทเค็นรวมของหน่วยความจำภายใต้คีย์หนึ่งเกินงบประมาณ โดยจะวนอ่านแถวตาม `created_at` แบบ DESC เก็บแถวที่ยังอยู่ภายในงบประมาณ และแทนที่ `content` ของแถวที่เหลือโดยตรงด้วยสามประโยคแรกของต้นฉบับ `tokensSaved` คือผลต่างของ `estimateTokens` ระหว่างเนื้อหาเก่าและเนื้อหาใหม่

รูทีนนี้ **พร้อมใช้งาน แต่ยังไม่ถูกเรียกโดยอัตโนมัติ** ในไปป์ไลน์แชตปัจจุบัน — หากต้องการย่อข้อมูลอย่างต่อเนื่อง ให้เรียกจาก cron, การดำเนินการของผู้ดูแลระบบ หรือโค้ดเชื่อมต่อ `MemoryConfig.autoSummarize` การสูญเสียข้อมูลนี้ไม่สามารถย้อนกลับได้: ข้อความต้นฉบับจะถูกเขียนทับ

## REST API

เอนด์พอยต์ทั้งหมดต้องใช้การยืนยันตัวตนสำหรับการจัดการ (`requireManagementAuth`)

### เอนด์พอยต์หน่วยความจำหลัก (ที่มีอยู่เดิม + ที่อัปเดต)

| เมธอด    | พาธ                  | คำอธิบาย                                                                                                                                                                                             |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | รายการแบบแบ่งหน้าพร้อมตัวกรอง: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset` การตอบกลับประกอบด้วย `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                 |
| `POST`   | `/api/memory`        | สร้างรายการ (ตรวจสอบความถูกต้องด้วย Zod: `content`, `key`, และ `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` ซึ่งเป็นตัวเลือก) เรียก `createMemory()` ซึ่งทำ upsert ตาม `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | ดึงข้อมูลรายการเดียวตาม UUID                                                                                                                                                                         |
| `PUT`    | `/api/memory/[id]`   | อัปเดตฟิลด์ของรายการ (`type`, `key`, `content`, `metadata`) เนื้อหาคำขอ: `MemoryUpdatePutSchema` รวมถึงซิงค์เวกเตอร์ด้วย หากมีแหล่งข้อมูล embedding พร้อมใช้งาน                                      |
| `DELETE` | `/api/memory/[id]`   | ลบรายการ และลบออกจาก `vec_memories` (D15) รวมถึงพยายามลบจาก Qdrant แบบ best-effort ด้วย ส่งคืน 404 เมื่อไม่พบรายการ                                                                                  |
| `GET`    | `/api/memory/health` | เรียกใช้ `verifyExtractionPipeline("health-check")` — ทดสอบครบวงจร สร้าง→แสดงรายการ→ลบ ส่งคืน `{working, latencyMs, error?}`                                                                         |

### เอนด์พอยต์ใหม่ของเอนจินหน่วยความจำ (แผน 21)

| เมธอด  | พาธ                               | คำอธิบาย                                                                                                                                                                                      |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | ทดลองเรียก `retrieveMemories` โดยไม่บันทึกการเปลี่ยนแปลง — ส่งคืนผลลัพธ์ที่จัดอันดับแล้วพร้อมคะแนน ระดับ และจำนวนโทเค็น เนื้อหาคำขอ: `RetrievePreviewSchema` โดยจะไม่แทรกหรือแก้ไขหน่วยความจำ |
| `GET`  | `/api/memory/embedding-providers` | แสดงรายการผู้ให้บริการพร้อมโมเดล embedding โดยระบุว่ารายใดมีการกำหนดค่า API key แล้ว                                                                                                          |
| `GET`  | `/api/memory/engine-status`       | ส่งคืนสถานะทั้งหมดของเอนจิน: ระดับคีย์เวิร์ด การระบุ embedding สถิติที่เก็บเวกเตอร์ สถานะ Qdrant และการกำหนดค่าการจัดอันดับซ้ำ รูปแบบ: `MemoryEngineStatusSchema`                             |
| `POST` | `/api/memory/summarize`           | เรียกใช้การย่อหน่วยความจำด้วยตนเอง เนื้อหาคำขอ: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`) ส่งคืน `{candidates, tokensSaved}`                                           |
| `POST` | `/api/memory/reindex`             | เรียกใช้การจัดทำดัชนีเวกเตอร์ใหม่สำหรับหน่วยความจำที่มี `needs_reindex=1` เนื้อหาคำขอ: `MemoryReindexSchema` (`force`) ส่งคืน `{started, pending}`                                            |

### เอนด์พอยต์การตั้งค่า

| เมธอด  | พาธ                                     | คำอธิบาย                                                                                           |
| ------ | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` ปัจจุบันที่ปรับให้อยู่ในรูปแบบมาตรฐานแล้ว (ฟิลด์ใหม่ 7 ฟิลด์ + ฟิลด์เดิม) |
| `PUT`  | `/api/settings/memory`                  | อัปเดตฟิลด์ใดก็ได้จาก `MemorySettingsExtendedSchema` (รวม 12 ฟิลด์)                                |
| `GET`  | `/api/settings/qdrant`                  | การตั้งค่า Qdrant ปัจจุบัน (`QdrantSettingsSchema`)                                                |
| `PUT`  | `/api/settings/qdrant`                  | อัปเดตการตั้งค่า Qdrant เนื้อหาคำขอ: `QdrantSettingsUpdateSchema` โดย `apiKey` = สตริงว่างจะลบคีย์ |
| `GET`  | `/api/settings/qdrant/health`           | การตรวจสอบ liveness กับอินสแตนซ์ Qdrant ที่กำหนดค่าไว้ ส่งคืน `QdrantHealthResultSchema`           |
| `POST` | `/api/settings/qdrant/search`           | ทดสอบการค้นหาเชิงความหมายกับ Qdrant เนื้อหาคำขอ: `QdrantSearchSchema` (`query`, `topK`)            |
| `POST` | `/api/settings/qdrant/cleanup`          | ลบจุดข้อมูล Qdrant สำหรับหน่วยความจำที่หมดอายุ / เก่า                                              |
| `GET`  | `/api/settings/qdrant/embedding-models` | แสดงรายการโมเดล embedding ที่พร้อมใช้งานสำหรับ Qdrant                                              |

คิวรีรายการ `/api/memory` รองรับทั้งการแบ่งหน้าด้วย `page`
(`parsePaginationParams`) **หรือ** `offset` แบบดิบ — เมื่อมี `offset`
ค่าดังกล่าวจะมีลำดับความสำคัญสูงกว่า และระบบจะคำนวณ `page` จากค่านั้นเพื่อใช้ในรูปแบบการตอบกลับ

## เครื่องมือ MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

เมื่อเปิดใช้งานเซิร์ฟเวอร์ MCP ระบบจะลงทะเบียนเครื่องมือหน่วยความจำสามรายการ:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → ครอบ `retrieveMemories()` ตั้งแต่ v3.8.6 (D16) เป็นต้นมา `strategy` จะถูกอ่าน
  จาก `getMemorySettings()` แทนการกำหนดค่า `"exact"` แบบตายตัว หากมีการระบุ
  `query` และ `strategy` เป็น `semantic` หรือ `hybrid` ระบบจะใช้ที่เก็บเวกเตอร์
  เมื่อพร้อมใช้งาน
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → ครอบ `createMemory()` โดยยอมรับเฉพาะประเภทมาตรฐาน 4 ประเภท:
  `factual`, `episodic`, `procedural`, `semantic` (D17)
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → แสดงรายการ
  ที่ตรงกัน สามารถกรองตามการประทับเวลาที่สร้างก่อนเวลาที่กำหนดได้ แล้วลบแต่ละรายการ
  ผ่าน `deleteMemory()` (ซึ่งจะลบเวกเตอร์ออกจาก sqlite-vec + Qdrant ด้วย)

ดูรายละเอียดเกี่ยวกับการรับส่งข้อมูลและขอบเขตได้ที่ [MCP-SERVER.md](./MCP-SERVER.md)

## แดชบอร์ด (Memory Studio)

ขณะนี้ `src/app/(dashboard)/dashboard/memory/page.tsx` เป็น **Studio แบบ 3 แท็บ**:

### แท็บ: หน่วยความจำ

- การ์ดแนวคิด (คำอธิบาย "วิธีการทำงาน" ที่ยุบได้)
- รายการ การค้นหา และการแบ่งหน้าแบบเรียลไทม์ (หน่วงเวลา 300 ms)
- ตัวกรองประเภท (`factual` / `episodic` / `procedural` / `semantic` / ทั้งหมด)
- โมดัลเพิ่มหน่วยความจำ (คีย์ เนื้อหา ประเภท)
- แก้ไขแบบอินไลน์ (ปุ่มดินสอ → `PUT /api/memory/[id]`)
- ลบแต่ละแถว (พร้อมกล่องโต้ตอบยืนยัน)
- ส่งออกหน้าปัจจุบันเป็น JSON และนำเข้า JSON ผ่านตัวเลือกไฟล์
- การ์ดสถิติ: `totalEntries`, `tokensUsed`, `hitRate`
- ปุ่ม "กระชับรายการเก่า" → `POST /api/memory/summarize` (เริ่มจากการทดลองทำงาน
  เพื่อแสดงจำนวนรายการที่เข้าข่ายก่อน แล้วจึงยืนยัน)
- จุดแสดงสถานะสีเขียว/แดงซึ่งขับเคลื่อนโดย `GET /api/memory/health`

### แท็บ: พื้นที่ทดลอง

- ช่องป้อนคำค้นหา + ตัวเลือกกลยุทธ์ (ตรงทั้งหมด / เชิงความหมาย / ผสมผสาน) + งบประมาณโทเค็น
- "จำลอง" → `POST /api/memory/retrieve-preview` — แสดงผลลัพธ์ที่จัดอันดับแล้วพร้อม
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`
- แผงการกำหนดผลลัพธ์ที่แสดงว่าใช้แหล่งที่มาของ embedding / ที่เก็บเวกเตอร์ใด และ
  มีการใช้ตัวเลือกสำรองหรือไม่

### แท็บ: เอนจิน

- แผงสถานะเอนจิน (ชิปคำสำคัญ FTS5, ชิป embedding, ชิปที่เก็บเวกเตอร์,
  ชิปสถานะ Qdrant, ชิป rerank)
- ปุ่ม "ทำดัชนีใหม่ตอนนี้" → `POST /api/memory/reindex`
- ตัวเลือกแหล่งที่มาของ embedding (อัตโนมัติ / ระยะไกล / คงที่ / transformers + ตัวสลับ)
- การ์ดการกำหนดค่า Qdrant (ตัวสลับเปิดใช้งาน, โฮสต์/พอร์ต/คอลเลกชัน/คีย์, ทดสอบการเชื่อมต่อ,
  ทดสอบการค้นหาเชิงความหมาย, ล้างข้อมูล)
- การ์ดการกำหนดค่า rerank (ตัวสลับเปิดใช้งาน, ตัวเลือกผู้ให้บริการ/โมเดล)

การตั้งค่าหน่วยความจำและ Qdrant ยังอยู่ภายใต้
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) สำหรับ
หน้าการตั้งค่าแบบเดิม/ส่วนกลาง

## การแคช

`src/lib/memory/store.ts` เก็บแคชภายในโปรเซสแบบคล้าย LRU
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500` โดยขับรายการเก่าที่สุด 20 %
ออก) สำหรับการอ่าน `getMemory(id)` รวมถึงเลเยอร์ `memoryCache` แบบคีย์/ค่าทั่วไป
(`src/lib/memory/cache.ts`) ที่มีเมธอด `get`/`set`/`invalidate`
ซึ่งผู้เรียกใช้ที่ต้องการแคชในขอบเขตของตนเองสามารถใช้งานได้ (LRU ขนาด 1 000 รายการ,
TTL เริ่มต้น 5 min)

## ความเป็นส่วนตัวและวงจรชีวิต

- ความเป็นเจ้าของหน่วยความจำกำหนดโดย ID ของ API key (`resolveMemoryOwnerId` ใน
  `chatCore.ts`) หากไม่มี `apiKeyInfo.id` กระบวนการเรียกคืน การแทรก
  และการสกัดจะไม่ทำงาน
- รายการที่มี `expires_at` เป็นเวลาในอนาคตจะถูกกรองออกจากการเรียกคืน ส่วนรายการเก่า
  ที่เกิน `retentionDays` จะถูกตัดออกด้วยเงื่อนไข
  `created_at >= cutoff` ใน `retrieveMemories`
- สำหรับการลบอย่างถาวร ให้ใช้ `DELETE /api/memory/[id]` หรือ `omniroute_memory_clear`
- การสกัดทำงานแบบ fire-and-forget ผ่าน `setImmediate` โดยความล้มเหลวจะถูกบันทึกไว้ภายใต้
  `memory.extraction.background.failed` และจะไม่ถูกส่งกลับไปยังผู้เรียก
- การทดสอบแบบไป-กลับเพื่อยืนยันผล (`verifyExtractionPipeline`) จะล้างรายการ
  ทดสอบของตนเองในบล็อก `finally`

## ดูเพิ่มเติม

- [SKILLS.md](./SKILLS.md) — การตั้งค่า `skillsEnabled` จะแทรกข้อกำหนดของเครื่องมือ
  ควบคู่ไปกับหน่วยความจำ
- [MCP-SERVER.md](./MCP-SERVER.md) — การรับส่งข้อมูล / ขอบเขตสิทธิ์ของ MCP
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — พื้นผิว API ที่ครอบคลุมยิ่งขึ้น
- โมดูลต้นทาง:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF แบบไฮบริด
  - `src/lib/memory/embedding/index.ts` — เลเยอร์ embedding แบบหลายแหล่ง
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — สคีมา Zod สำหรับ body ทั้งหมดของ memory API
  - `src/shared/schemas/qdrant.ts` — สคีมา Zod สำหรับการตั้งค่า/การดำเนินการของ Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD สำหรับ `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + เส้นทางย่อย
  - `src/app/(dashboard)/dashboard/memory/` — UI ของ Studio (หน้า + คอมโพเนนต์ +
    แท็บ + ฮุก)
  - `open-sse/handlers/chatCore.ts` (การเชื่อมต่อการแทรก / การสกัด)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## การเลือกผู้ให้บริการ Embedding (v3.8.16+)

เอนจินหน่วยความจำของ OmniRoute รองรับ **แหล่ง embedding สี่แหล่ง** (`src/lib/memory/embedding/`) โดยแต่ละแหล่งมีข้อแลกเปลี่ยนแตกต่างกันในด้าน **เวลาแฝง ต้นทุน คุณภาพโมเดล และความซับซ้อนในการตั้งค่า**

### แหล่ง Embedding

| ผู้ให้บริการ   | แหล่งที่มา                                        | เวลาแฝง                        | ต้นทุน               | คุณภาพ                                | การตั้งค่า                            |
| -------------- | ------------------------------------------------- | ------------------------------ | -------------------- | ------------------------------------- | ------------------------------------- |
| `transformers` | โมเดล ONNX ภายในเครื่อง (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                | ฟรี                  | ดี                                    | เพียง `npm install`                   |
| `static`       | เวกเตอร์ที่คำนวณไว้ล่วงหน้า (แคชไว้)              | <1ms                           | ฟรี                  | ไม่เกี่ยวข้อง (ขึ้นอยู่กับการพบในแคช) | ไม่ต้องตั้งค่า                        |
| `remote`       | API ของ OpenAI / Cohere / Voyage                  | ~100-300ms                     | $0.02-0.10/1M โทเค็น | ยอดเยี่ยม                             | API key                               |
| `auto`         | เลือกแหล่งที่ดีที่สุดซึ่งพร้อมใช้งานขณะรันไทม์    | เท่ากับแหล่งที่เลือก           | ฟรี                  | เท่ากับแหล่งที่เลือก                  | ไม่ต้องตั้งค่า                        |
| _(cache)_      | เลเยอร์ LRU ในหน่วยความจำที่ครอบแหล่งใดก็ได้      | <1ms (พบ), เวลาแฝงเต็ม (ไม่พบ) | ฟรี                  | เท่ากับแหล่งเบื้องหลัง                | เปิดอยู่เสมอ (ไม่ใช่แหล่งที่เลือกได้) |

### แผนผังการตัดสินใจ

```
                  บริบทการปรับใช้ของคุณคืออะไร?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    PROD ขนาดเล็ก  PROD ขนาดใหญ่   EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ฟรี, ไม่ต้องใช้ API)      (คุณภาพดีที่สุด) (ไม่ใช้อินเทอร์เน็ต)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            เพิ่มเลเยอร์ `cache` ไว้ด้านบนเสมอ
            (LruCache ครอบผู้ให้บริการใดก็ได้)
```

### การกำหนดค่าฐานข้อมูลและ API

ตัวเลือก embedding ของหน่วยความจำกำหนดค่าผ่าน Settings API/UI ไม่ใช่ตัวแปรสภาพแวดล้อม คีย์ฐานข้อมูลการตั้งค่าที่เกี่ยวข้องภายใต้ Settings (`normalizeMemorySettings` ใน `src/lib/memory/settings.ts`) ได้แก่:

- `memoryEmbeddingSource`: `"transformers"` (ภายในเครื่อง), `"remote"` (อิง API เช่น OpenAI), `"static"` (พื้นที่จัดเก็บภายนอก) หรือ `"auto"`
- `memoryEmbeddingProviderModel`: ตัวระบุโมเดลสำหรับแหล่ง remote/static (เช่น `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` หรือ `"auto"`

#### โมเดลภายในเครื่อง (`transformers`)

ใช้ transformers.js ภายในเพื่อเรียกใช้โมเดลภายในเครื่อง:

```bash
# ตัวแปรสภาพแวดล้อมที่อ่านในโค้ด (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # รีโพซิทอรีโมเดล HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # โมเดล static potion ของ HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # ไดเรกทอรีแคช
```

#### แคช Embedding แบบ LRU

แคชจะเปิดอยู่เสมอตามค่าเริ่มต้นและกำหนดค่าผ่านตัวแปรสภาพแวดล้อม:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # จำนวนรายการที่แคชสูงสุด
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 นาที)
```

### ตัวเลขประสิทธิภาพ

เกณฑ์มาตรฐานบนเซิร์ฟเวอร์ x86 แบบ 4 คอร์ทั่วไป (ข้อความละประมาณ 100 โทเค็น):

| ผู้ให้บริการ         | p50   | p95   | p99   | ค่าใช้จ่าย / 1M embeddings         |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | ฟรี                                |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | ขึ้นอยู่กับบริการโฮสติ้ง Qdrant    |
| `cache` (พบข้อมูล)   | <1ms  | <1ms  | 2ms   | ฟรี                                |

---

## รูปแบบการสกัดข้อเท็จจริง (v3.8.16+)

โมดูล `extraction.ts` (`src/lib/memory/extraction.ts`) ใช้ **การจับคู่รูปแบบด้วย regex** เพื่อสกัดข้อเท็จจริงที่มีโครงสร้างจากข้อความในการสนทนา การทำความเข้าใจรูปแบบเหล่านี้จะช่วยให้คุณปรับคุณภาพการสกัดให้เหมาะกับกรณีการใช้งานของคุณ

### หมวดหมู่รูปแบบเริ่มต้น

| หมวดหมู่            | ตัวอย่างรูปแบบ                                              | สิ่งที่จับได้                        |
| ------------------- | ----------------------------------------------------------- | ------------------------------------ |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | ความชอบของผู้ใช้                     |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | การตัดสินใจของผู้ใช้ (เชิงเหตุการณ์) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | รูปแบบพฤติกรรมที่ต่อเนื่อง           |

### ตัวอย่างรูปแบบ (ฉบับย่อ)

```ts
// จาก src/lib/memory/extraction.ts
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

### สิ่งที่จะถูกสกัด

เมื่อผู้ใช้กล่าวว่า:

> "ฉันชอบ TypeScript ฉันจะใช้ Postgres สำหรับโปรเจกต์นี้ ฉัน commit ก่อน push เสมอ ฉันไม่ชอบ Python"
> การสกัดจะสร้างหน่วยความจำ 4 รายการ:
>
> | คีย์                                 | หมวดหมู่   | ประเภท   | เนื้อหา                     |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### ขีดจำกัดการสกัด

เพื่อป้องกันการสกัดที่มากเกินควบคุม ระบบจะใช้ขีดจำกัดต่อไปนี้:

| ความยาวเนื้อหาขั้นต่ำ | 3 อักขระ |
| ความยาวเนื้อหาสูงสุด | 500 อักขระ |

### เมื่อใดควรปิดใช้งานการสกัด

การสกัดจะทำงานโดยอัตโนมัติทุกครั้งที่เปิดใช้งานหน่วยความจำ และไม่มีสวิตช์แยกสำหรับเปิดหรือปิดเฉพาะการสกัด หากต้องการปิด ให้ปิดใช้งานหน่วยความจำทั้งหมด (`enabled: false`
ผ่าน `PUT /api/settings/memory`) พิจารณาดำเนินการดังกล่าวเมื่อ:

- คุณมีปริมาณข้อความสูงและต้นทุนในการสกัดไม่ใช่เรื่องเล็กน้อย
- การสนทนาของคุณส่วนใหญ่เป็นแบบชั่วคราว (แชต การดีบัก) และไม่มีคุณค่าในระยะยาว
- คุณบันทึกบริบทผ่านปลั๊กอินแบบกำหนดเองอยู่แล้ว

---

## การปรับแต่ง RRF แบบไฮบริด (v3.8.16+)

อัลกอริทึม **Reciprocal Rank Fusion (RRF)** รวมผลลัพธ์จาก FTS5 (คีย์เวิร์ด) และเวกเตอร์ (เชิงความหมาย) พารามิเตอร์ `k` ควบคุมน้ำหนักที่มอบให้กับผลลัพธ์ซึ่งมีอันดับต่ำกว่า

### สูตร

สำหรับหน่วยความจำที่เป็นตัวเลือกแต่ละรายการ คะแนน RRF คือ:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

โดยที่:

- `k` คือค่าคงที่ (ค่าเริ่มต้นคือ 60)
- `rank_i(d)` คืออันดับของเอกสาร `d` ในระบบสืบค้นลำดับที่ i (FTS, เวกเตอร์)
- ผลรวมจะคำนวณจากระบบสืบค้นทั้งหมด

### ผลกระทบของ `k` ต่อผลลัพธ์

| ค่า `k`                  | ผลกระทบ                                                                         | เหมาะสำหรับ                        |
| ------------------------ | ------------------------------------------------------------------------------- | ---------------------------------- |
| `k=0`                    | การรวมอันดับแบบบริสุทธิ์ (ไม่มีการปรับให้เรียบ)                                 | ค่าพื้นฐานเชิงทฤษฎี                |
| `k=10-30`                | ให้น้ำหนักผลลัพธ์อันดับต้นสูงมาก โดยอันดับต่ำแทบไม่มีส่วนร่วม                   | เมื่อผลลัพธ์ 3 อันดับแรกมักถูกต้อง |
| **`k=60`** (ค่าเริ่มต้น) | สมดุล — ผลลัพธ์ 10 อันดับแรกล้วนมีส่วนร่วมอย่างมีนัยสำคัญ                       | การสืบค้นเพื่อวัตถุประสงค์ทั่วไป   |
| `k=100+`                 | ราบเรียบขึ้น — แม้แต่ผลลัพธ์อันดับต่ำก็อาจมีอิทธิพลเหนือกว่า หากปรากฏในหลายระบบ | เมื่อ recall สำคัญกว่า precision   |

### การปรับแต่ง `k` ในทางปฏิบัติ

```bash
# ค่าเริ่มต้น
MEMORY_RRF_K=60

# เน้น precision อย่างมาก (หน่วยความจำขนาดเล็ก เอกสารจำนวนน้อย)
MEMORY_RRF_K=20

# recall สูงสุด (หน่วยความจำขนาดใหญ่ คำค้นที่หลากหลาย)
MEMORY_RRF_K=120
```

**ตัวอย่างเมื่อใช้ `k=20`:**

- FTS อันดับ 1 → ค่าที่มีส่วนร่วม `1/21 = 0.048`
- FTS อันดับ 10 → ค่าที่มีส่วนร่วม `1/30 = 0.033`
- เวกเตอร์อันดับ 1 → ค่าที่มีส่วนร่วม `0.048`
- ค่าสูงสุดเมื่อรวมกัน: `0.096`

**ตัวอย่างเมื่อใช้ `k=60`:**

- FTS อันดับ 1 → ค่าที่มีส่วนร่วม `1/61 = 0.016`
- FTS อันดับ 10 → ค่าที่มีส่วนร่วม `1/70 = 0.014`
- เวกเตอร์อันดับ 1 → ค่าที่มีส่วนร่วม `0.016`
- ค่าสูงสุดเมื่อรวมกัน: `0.033`

เมื่อ `k` สูงขึ้น **ความแตกต่างสัมพัทธ์** ระหว่างอันดับ 1 และอันดับ 10 จะน้อยลง ดังนั้นอัลกอริทึมจึงพึ่งพา **ฉันทามติจากหลายระบบสืบค้น** มากกว่าความเชื่อมั่นของอันดับสูงสุด

### เมื่อใดควรเปลี่ยน `k`

| อาการ                                               | สิ่งที่ควรลอง                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| ผลลัพธ์อันดับแรกชนะเสมอ แต่เป็นผลลัพธ์ที่ผิด        | **ลด** k (เช่น 20) — ความเชื่อมั่นของอันดับสูงสุดมีความสำคัญมากขึ้น       |
| คำตอบที่ถูกต้องอยู่ใน 5 อันดับแรก แต่ไม่ใช่อันดับ 1 | **เพิ่ม** k (เช่น 100) — การให้คะแนนที่ราบเรียบขึ้นจะให้รางวัลแก่ฉันทามติ |
| recall สูง แต่ precision ต่ำ                        | **ลด** k — ทำให้การจัดอันดับเฉียบคมขึ้น                                   |
| recall ต่ำ (เอกสารที่เกี่ยวข้องตกหล่น)              | **เพิ่ม** k — เปิดโอกาสให้เอกสารอันดับต่ำกว่า                             |

### การถ่วงน้ำหนัก RRF

Reciprocal Rank Fusion ใช้น้ำหนักเท่ากันสำหรับอันดับเวกเตอร์เชิงความหมายและอันดับการค้นหาข้อความแบบเต็ม:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

ไม่มีตัวแปรสภาพแวดล้อมสำหรับปรับน้ำหนักแต่ละรายการ (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ไม่มีอยู่)

---

## กลยุทธ์การสรุป (v3.8.16+)

โมดูล `summarization.ts` (`src/lib/memory/summarization.ts`) บีบอัดหน่วยความจำเก่าเพื่อให้ชุดที่ใช้งานอยู่มีขนาดเล็ก ขณะเดียวกันยังคงความสามารถในการเรียกคืนข้อมูล

### การสรุปจะทำงานเมื่อใด

| ตัวกระตุ้น                | เกณฑ์ (ค่าเริ่มต้น) |
| ------------------------- | ------------------- |
| เรียกใช้ด้วยตนเองผ่าน API | ไม่มี               |

### สิ่งที่จะถูกสรุป

มีการส่งออกจุดเริ่มต้นสองรายการจาก `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — ย่อหน่วยความจำ
  สำหรับเซสชันให้เป็นข้อความสรุปเดียวภายใต้ขีดจำกัดโทเค็นที่กำหนด
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — การบีบอัดตามอายุ
  ที่ API ใช้ โดยจะเลือกหน่วยความจำทุกรายการที่เก่ากว่า `days` สร้างหน่วยความจำ
  สรุปแบบย่อหนึ่งรายการจากข้อมูลเหล่านั้น และลบรายการต้นฉบับเมื่อ `dryRun` เป็น
  `false` ส่ง `dryRun: true` เพื่อดูตัวอย่างชุดข้อมูลที่เข้าข่ายและจำนวนโทเค็นรวม
  โดยไม่แก้ไขข้อมูลใดๆ

ไม่มีขั้นตอนการจัดกลุ่มตามแท็ก/คีย์ หรือการให้คะแนน "แก่นสำคัญเทียบกับสิ่งที่สรุปได้" แยกตามหน่วยความจำ —
การเลือกจะอิงจากเกณฑ์อายุเพียงอย่างเดียว และข้อความสรุปจะประกอบด้วยบรรทัดแบบย่อ
ที่มีคำนำหน้าระบุประเภทสำหรับแต่ละรายการที่เข้าข่าย

### การเรียกใช้การสรุป

การสรุปเป็นแบบ **ดำเนินการด้วยตนเอง / เลือกเปิดใช้** — การตั้งค่า `autoSummarize` เป็น `false`
โดยค่าเริ่มต้น ดังนั้นจึงไม่มีสิ่งใดถูกบีบอัดโดยอัตโนมัติ เรียกใช้ผ่าน API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

หากต้องการปิดไว้ เพียงคง `autoSummarize` เป็นค่าเริ่มต้น (`false`)

### เคล็ดลับด้านคุณภาพการสรุป

- **ดูตัวอย่างด้วย `dryRun` ก่อน** — `summarizeMemoriesOlderThan(..., true)` จะส่งคืน
  รายการที่เข้าข่ายและจำนวนโทเค็นรวม เพื่อให้คุณยืนยันได้ว่าจะมีข้อมูลใดถูกรวม
  ก่อนลบรายการต้นฉบับ
- **เรียกใช้การสรุปในช่วงที่มีทราฟฟิกต่ำ** หากคุณมีคลังหน่วยความจำขนาดใหญ่ — การเรียก LLM เป็นส่วนที่ใช้เวลานาน

```bash
# รูปแบบ Cron: สรุปทุกวันเวลา 03:00 น.
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## รูปแบบผู้ให้บริการ MemoryBackend

> **แหล่งข้อมูลหลัก:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **การทดสอบ:** `src/lib/memory/__tests__/generic-backend.test.ts`

รูปแบบผู้ให้บริการ MemoryBackend เพิ่ม **เลเยอร์นามธรรมของแบ็กเอนด์แบบเสียบเปลี่ยนได้** ครอบทับเอนจินหน่วยความจำที่มีอยู่ แทนที่จะผูกติดกับการจัดเก็บข้อมูลเพียงรูปแบบเดียว ขณะนี้ระบบหน่วยความจำรองรับแบ็กเอนด์หลายประเภท (SQLite, Obsidian, Notion และแบ็กเอนด์ HTTP แบบกำหนดเอง) พร้อมการกำหนดค่าเส้นทางหลัก/สำรอง

### สถาปัตยกรรม

```
┌──────────────────────────────────────────────────────────┐
│                    เส้นทาง API                            │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           ตัวควบคุมแบบ Singleton (manager.ts)             │
│                                                          │
│  หลัก ─────► แบ็กเอนด์ A  (เช่น SQLite)                  │
│  สำรอง ────► แบ็กเอนด์ B  (เช่น Obsidian)                │
│              แบ็กเอนด์ C  (เช่น Notion ผ่าน GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ แบ็กเอนด์   │ │ แบ็กเอนด์   │ │ GenericMemory    │
│ SQLite     │ │ Obsidian   │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### อินเทอร์เฟซหลัก (`backend.ts`)

ทุกแบ็กเอนด์ต้องใช้งานอินเทอร์เฟซ `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // การสร้าง อ่าน อัปเดต และลบ
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // การค้นหา
  search(config: SearchConfig): Promise<Memory[]>;

  // สถานะการทำงาน
  health(): Promise<HealthCheckResult>;

  // วงจรชีวิต (ไม่บังคับ)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

ตัวควบคุมแบบ Singleton ที่:

- **ลงทะเบียน** แบ็กเอนด์ผ่าน `register(backend)` — เรียกใช้ระหว่างการเริ่มระบบจาก `index.ts`
- **กำหนดค่า** แบ็กเอนด์หลักและสำรองผ่าน `configure(primary, fallbacks)`
- **กำหนดเส้นทาง** การดำเนินการ CRUD/การค้นหาไปยังแบ็กเอนด์หลัก พร้อมใช้ลำดับแบ็กเอนด์สำรองเมื่อเกิดความล้มเหลว
- **ตรวจสอบสถานะ** ของแบ็กเอนด์ทั้งหมดเป็นระยะ

**พฤติกรรมการสำรอง:**

| การดำเนินการ | แบ็กเอนด์หลัก            | แบ็กเอนด์สำรอง                          |
| ------------ | ------------------------ | --------------------------------------- |
| `create`     | ✅ แบ็กเอนด์หลักเท่านั้น | ❌                                      |
| `get`        | ✅ ลองแบ็กเอนด์หลักก่อน  | ✅ ใช้แบ็กเอนด์สำรองหากเป็น null        |
| `update`     | ✅ แบ็กเอนด์หลักเท่านั้น | ✅ ซิงค์แบบไม่รอผลลัพธ์                 |
| `delete`     | ✅ แบ็กเอนด์หลักเท่านั้น | ✅ ซิงค์แบบไม่รอผลลัพธ์                 |
| `list`       | ✅ แบ็กเอนด์หลักเท่านั้น | ❌                                      |
| `search`     | ✅ ใช้แบ็กเอนด์หลักก่อน  | ✅ ใช้แบ็กเอนด์สำรองเมื่อเกิดข้อผิดพลาด |

#### GenericMemoryBackend (`genericBackend.ts`)

ตัวเชื่อมต่อ HTTP ทั่วไปที่ปรับ REST API ใดๆ ให้เป็น MemoryBackend มีประโยชน์สำหรับ:

- **Notion** — เชื่อมต่อผ่าน Notion API
- **Obsidian** — เชื่อมต่อผ่าน Obsidian Local REST API
- **แบ็กเอนด์แบบกำหนดเอง** — บริการใดๆ ที่เปิดให้ใช้งาน RESTful memory API

**การกำหนดค่า:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL ฐานของ API แบ็กเอนด์
  apiKey?: string;           // โทเค็น Bearer สำหรับการยืนยันตัวตน
  headers?: Record<string, string>;  // ส่วนหัว HTTP แบบกำหนดเอง
  timeout?: number;          // ระยะหมดเวลาของคำขอ (ค่าเริ่มต้น: 30000ms)
  backendType?: string;      // สำหรับการบันทึกล็อก

  // การแทนที่เอนด์พอยต์ (ค่าเริ่มต้นใช้รูปแบบตามหลัก REST)
  endpoints?: {
    search?: string;   // ค่าเริ่มต้น: "/memories/search"
    create?: string;   // ค่าเริ่มต้น: "/memories"
    list?: string;     // ค่าเริ่มต้น: "/memories"
    get?: string;      // ค่าเริ่มต้น: "/memories/{id}"
    update?: string;   // ค่าเริ่มต้น: "/memories/{id}"
    delete?: string;   // ค่าเริ่มต้น: "/memories/{id}"
    health?: string;   // ค่าเริ่มต้น: "/health"
  };

  // การแมปชื่อพารามิเตอร์คิวรี
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // การแมปชื่อพารามิเตอร์พาธ
  pathParams?: {
    id?/memoryId?
  };
}
```

**แบ็กเอนด์ที่รู้จัก** ได้รับการกำหนดค่าไว้ล่วงหน้าใน `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend ที่ชี้ไปยัง localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend ที่ชี้ไปยัง api.notion.com/v1
```

#### แบ็กเอนด์ในตัว

##### SQLiteBackend (`sqliteBackend.ts`)

แบ็กเอนด์หลักตามค่าเริ่มต้น ครอบห่อพื้นที่จัดเก็บหน่วยความจำที่ใช้ SQLite ซึ่งมีอยู่เดิมผ่าน `src/lib/memory/store.ts` และได้รับการลงทะเบียนโดยอัตโนมัติเมื่อเริ่มระบบ

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

ครอบห่อการผสานรวม Obsidian ที่มีอยู่เดิม (`src/lib/memory/obsidianBackend.ts`) โดยเชื่อมต่อกับคลัง Obsidian ผ่าน Obsidian Local REST API

### การตั้งค่า

การตั้งค่าแบ็กเอนด์หน่วยความจำถูกจัดเก็บในตารางการตั้งค่าของแอปและจัดการผ่าน `src/lib/memory/settings.ts`:

| การตั้งค่า           | คีย์ Env/Config          | ค่าเริ่มต้น | คำอธิบาย                            |
| -------------------- | ------------------------ | ----------- | ----------------------------------- |
| แบ็กเอนด์หลัก        | `memoryPrimaryBackend`   | `"sqlite"`  | ID ของแบ็กเอนด์หลัก                 |
| แบ็กเอนด์สำรอง       | `memoryFallbackBackends` | `[]`        | ID ของแบ็กเอนด์สำรองตามลำดับ        |
| การกำหนดค่าแบ็กเอนด์ | `memoryBackendConfigs`   | `{}`        | การแทนที่การกำหนดค่าแยกตามแบ็กเอนด์ |

การตั้งค่าจะได้รับการปรับให้อยู่ในรูปแบบมาตรฐานผ่าน `normalizeMemorySettings()` และแคชไว้ที่ `getMemorySettings()`

### ลำดับการเริ่มต้นระบบ

```
การบูตแอป
  → การนำเข้า index.ts (ผลข้างเคียง): ลงทะเบียน SQLiteBackend
  → เรียก initMemoryBackends() จากวงจรชีวิตของแอป:
      1. โหลดการตั้งค่า (getMemorySettings)
      2. กำหนดค่าแบ็กเอนด์หลัก + แบ็กเอนด์สำรอง
      3. เริ่มต้นแบ็กเอนด์ทั้งหมด (ตรวจสอบสถานะการทำงาน)
      4. พร้อมรับคำขอ
```

### การเพิ่มแบ็กเอนด์ใหม่

1. **อิมพลีเมนต์อินเทอร์เฟซ `MemoryBackend`** ใน `src/lib/memory/<name>Backend.ts`
2. **ส่งออก** จาก `src/lib/memory/index.ts`
3. **ลงทะเบียน** ด้วย `memoryManager.register(yourBackend)` เมื่อเริ่มระบบ
4. **กำหนดค่า** ผ่านการตั้งค่า: ตั้งค่า `memoryPrimaryBackend` เป็น ID ของแบ็กเอนด์ของคุณ
5. **ทดสอบ** โดยใช้ `src/lib/memory/__tests__/generic-backend.test.ts` เป็นข้อมูลอ้างอิง

#### ตัวอย่าง: แบ็กเอนด์ Brain

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

### การตรวจสอบ

#### การทดสอบหน่วย

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

ผลลัพธ์ที่คาดหวัง: **การทดสอบ 35 รายการ ผ่านทั้งหมด** โดยครอบคลุม:

- คอนสตรักเตอร์ (2)
- การตรวจสอบสถานะการทำงาน (4) — สำเร็จ, ล้มเหลว 500, ข้อผิดพลาดของเครือข่าย, เวลาแฝง
- การเริ่มต้น (2) — สำเร็จ, ล้มเหลว
- การสร้าง (2) — เอนด์พอยต์เริ่มต้น, เอนด์พอยต์แบบกำหนดเอง
- การดึงข้อมูล (4) — สำเร็จ, 404 → null, กรณีที่ไม่ใช่ 404 ให้โยนข้อผิดพลาด, พารามิเตอร์พาธแบบกำหนดเอง
- การอัปเดต (2) — สำเร็จ, 404 → false
- การลบ (2) — สำเร็จ, 404 → false
- การแสดงรายการ (2) — พารามิเตอร์คิวรี, ชื่อพารามิเตอร์แบบกำหนดเอง
- การค้นหา (3) — พารามิเตอร์คิวรี, เอนด์พอยต์แบบกำหนดเอง, การซีเรียลไลซ์ตัวเลือก
- ส่วนหัวสำหรับการยืนยันตัวตน (2) — โทเค็น Bearer, ส่วนหัวแบบกำหนดเอง
- แฟกทอรี (1)

#### การตรวจสอบชนิดข้อมูล

```bash
npm run typecheck:core
```

ผลลัพธ์ที่คาดหวัง: **ข้อผิดพลาด 0 รายการ**.
