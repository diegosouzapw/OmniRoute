# Cluster Decisions — Optional Sidecar Profiles (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**สถานะ:** ข้อเสนอ (รอการตรวจสอบจาก @diegosouzapw)
**วันที่:** 2026-06-20
**อ้างอิง:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## สรุปโดยย่อ

เพิ่ม compose profiles แบบเลือกเปิดใช้ 2 โปรไฟล์ (`memory`, `bifrost`) สำหรับการติดตั้งใช้งาน 8 services ที่มีอยู่เดิมใน [`docker-compose.yml`](../../docker-compose.yml) พฤติกรรมเริ่มต้นเมื่อสั่ง up **ไม่มีการเปลี่ยนแปลง**: replicas ของ `omniroute` 3 ตัว + Caddy + Redis + CliproxyAPI โปรไฟล์ใหม่ทั้งสองจะเพิ่ม Qdrant และ Bifrost เป็น sidecars แบบเลือกใช้ โดยเปิดผ่าน `docker compose --profile <name> up` **ไม่มี service ที่มีอยู่เดิมถูกนำออกหรือแทนที่**

## เหตุผลที่แนวทางนี้มีความระมัดระวัง

รูปแบบการติดตั้งใช้งานที่มีอยู่เดิมของ OmniRoute มีขนาดกะทัดรัดและผ่านการพิสูจน์แล้ว:

- **`redis:7-alpine`** รองรับ workload ด้าน rate limit/cache ในระดับ production
- **SQLite + sqlite-vec + FTS5** รองรับหน่วยความจำภายในเครื่อง + เวกเตอร์ + การค้นหาข้อความ (ดู [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts))
- **Caddy** ทำหน้าที่เป็น LB + TLS terminator อยู่แล้ว ([`docker-compose.yml`](../../docker-compose.yml))
- **Bifrost** ได้รับการผสานรวมเป็นเราเตอร์ Tier-1 ใน [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) อยู่แล้ว (sidecar proxy พร้อม kill switch ผ่าน env var `BIFROST_ENABLED` — ตั้งค่า `=0` เพื่อข้าม sidecar และเปลี่ยนไปใช้เส้นทาง TS)

โปรไฟล์ทั้งสองนี้เป็น **ตัวเลือกสำหรับการขยายระบบเมื่อการติดตั้งใช้งานถึงขีดจำกัดของ SQLite** — ไม่ใช่การย้ายระบบ ทั้งสองโปรไฟล์ปิดใช้งานโดยค่าเริ่มต้น

## โปรไฟล์ทั้งสอง

### `memory` — Sidecar หน่วยความจำเวกเตอร์ Qdrant

**ควรเปิดใช้เมื่อ:**

- มี embeddings มากกว่า 1M รายการต่อการติดตั้งใช้งาน (sqlite-vec เริ่มทำงานช้าลงเมื่อมีขนาดใหญ่)
- การติดตั้งใช้งานแบบหลาย replica ซึ่งต้องใช้สถานะเวกเตอร์ร่วมกันระหว่าง `omniroute-1/2/3`
- คุณมีคลัสเตอร์ Qdrant ภายนอกอยู่แล้ว (Qdrant Cloud, on-prem)

**สิ่งที่เพิ่มเข้ามา:**

| Service  | Image                   | Ports       | หมายเหตุ                                              |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | ดัชนี HNSW; persistent volume `omniroute_qdrant_data` |

**การเปิดใช้งาน:** ตั้งค่า `qdrantEnabled = true` ใน UI การตั้งค่า **หรือ** ตั้งค่า env เป็น `QDRANT_HOST=qdrant` ดูกฎลำดับความสำคัญได้ที่ [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) (ตารางการตั้งค่า → env var → ค่าเริ่มต้น)

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (ดู `.env.example` บรรทัด 1672-1683)

### `bifrost` — Sidecar เราเตอร์ Tier-1 ของ Bifrost

**ควรเปิดใช้เมื่อ:**

- คุณใช้งาน replicas ของ `omniroute` ≥3 ตัว และต้องการรวมศูนย์การหมุนเวียนผู้ให้บริการไว้ในโปรเซส Go เดียว
- คุณต้องการจุดรวมเดียวสำหรับการตรวจสอบ/บันทึกคำขอไปยังผู้ให้บริการต้นทางจาก replicas ทั้งหมด
- คุณต้องการขยายเลเยอร์การกำหนดเส้นทาง Tier-1 ในแนวนอนโดยไม่ขึ้นกับ replicas ของ OmniRoute

**สิ่งที่เพิ่มเข้ามา:**

| Service   | Image                             | Ports  | หมายเหตุ                                                                         |
| --------- | --------------------------------- | ------ | -------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | เราเตอร์ Tier-1 ที่พัฒนาด้วย Go; persistent logs volume `omniroute_bifrost_logs` |

**การเปิดใช้งาน:** ตั้งค่า `BIFROST_BASE_URL=http://bifrost:8080` ใน `.env.example` เส้นทาง sidecar proxy ที่มีอยู่เดิมใน [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (เพิ่มเข้ามาใน PR #4381) จะรับค่านี้ไปใช้โดยอัตโนมัติ

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (ดู `.env.example` บรรทัด 1685-1695)

## สิ่งที่ PR นี้ไม่ได้ทำอย่างชัดเจน

เธรดของ issue เดิมเสนอให้ปรับโครงสร้างคลัสเตอร์ครั้งใหญ่ขึ้น หลังจากตรวจสอบรูปแบบเวิร์กโหลดจริงแล้ว รายการต่อไปนี้จึงถูก **ปฏิเสธ** ด้วยเหตุผลดังต่อไปนี้:

| คอมโพเนนต์                           | ข้อสรุป    | เหตุผล                                                                                                                    |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ตัดออก** | `redis:7-alpine` เพียงพออยู่แล้วสำหรับเวิร์กโหลดการจำกัดอัตราในระดับโปรดักชัน และยังไม่มีเพดานประสิทธิภาพที่ต้องก้าวข้าม  |
| **NATS**                             | **ตัดออก** | แต่ละ replica ของ `omniroute` เป็นโปรเซส Node.js เดี่ยว จึงไม่มีเวิร์กโหลด pub/sub แบบหลายโปรเซส                          |
| **PostgreSQL**                       | **ตัดออก** | SQLite + sqlite-vec + FTS5 รองรับกรณีใช้งานทั้ง 3 แบบ การย้ายระบบติดข้อจำกัดจาก migration 97 รายการและการแพ็กเกจ Electron |
| **Neo4j**                            | **ตัดออก** | การกำหนดเส้นทางเป็นการ join 5 ตาราง และ recursive CTE บน SQLite ก็เพียงพอแล้ว                                             |
| **MinIO**                            | **ตัดออก** | ไม่มีเวิร์กโหลด blob ขนาดหลาย MB โดยรูปภาพ/เสียงเป็นพร็อกซีแบบส่งผ่าน                                                     |
| **pgvector / pg_ai / pg_textsearch** | **ตัดออก** | เหตุผลเรื่องเพดานของ SQLite เช่นเดียวกับ PostgreSQL และ ecosystem ของ pgvector ยังแยกส่วนกันอยู่                          |
| **HAProxy / Envoy**                  | **ตัดออก** | Caddy รองรับ LB + TLS อยู่แล้ว และทั้งคู่ถูกปฏิเสธอย่างชัดเจนในฐานะเราเตอร์ Tier-1 (ดู `AGENTS.md`)                       |

หากกรณีใช้งานในอนาคตพิสูจน์ได้ว่ารายการใดในนี้เหมาะสม เอกสารนี้คือจุดที่ควรแก้ไขเพิ่มเติม

## แผนเปิดใช้งาน 4 สัปดาห์ (หากได้รับอนุมัติ)

1. **สัปดาห์ที่ 1** — ผสาน PR นี้ + ตรวจสอบโปรไฟล์แบบเลือกเปิดใช้ด้วย compose stack ที่มี 3 replica
2. **สัปดาห์ที่ 2** — เปิดใช้งาน Bifrost เต็มรูปแบบสำหรับ OpenAI/Claude/Gemini/Ollama (4 จากผู้ให้บริการมากกว่า 14 ราย) โดยใช้เส้นทางพร็อกซี sidecar ที่ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ควบคุมด้วย `BIFROST_ENABLED` และสามารถปิดฉุกเฉินขณะรันไทม์ได้)
3. **สัปดาห์ที่ 3** — เปิดใช้โปรไฟล์หน่วยความจำ Qdrant ใน deployment ทดสอบหนึ่งรายการ และวัดความแตกต่างของ latency เทียบกับ sqlite-vec
4. **สัปดาห์ที่ 4** — healthcheck ด้าน observability (`docker compose ps` exit codes + การทดสอบ smoke ด้วย `wget`) และรีเฟรช 71-pillar ตาม ADR-041

## ไฟล์ที่เปลี่ยนแปลงใน PR นี้

| ไฟล์                                               | การเปลี่ยนแปลง                                                                                                                                                                                                                            |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 บรรทัด: โปรไฟล์ `memory` (Qdrant), โปรไฟล์ `bifrost` (Bifrost), persistent volumes และ healthchecks                                                                                                                                   |
| `.env.example`                                     | +24 บรรทัด: `QDRANT_*` (6 ตัวแปร), `BIFROST_*` (4 ตัวแปร)                                                                                                                                                                                 |
| `docs/reference/ENVIRONMENT.md`                    | +6 แถวในส่วนที่ 25 สำหรับตัวแปรสภาพแวดล้อม `QDRANT_*`                                                                                                                                                                                     |
| `src/lib/memory/qdrant.ts`                         | +33 บรรทัด: ลำดับ fallback ของตัวแปรสภาพแวดล้อม (การตั้งค่า → สภาพแวดล้อม → ค่าเริ่มต้น) สำหรับ `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 บรรทัด: test case ใหม่ 9 รายการเพื่อกำหนดลำดับความสำคัญของ fallback สำหรับตัวแปรสภาพแวดล้อม                                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (ไฟล์นี้) | ใหม่ — บันทึกการตัดสินใจสำหรับโปรไฟล์แบบเลือกเปิดใช้                                                                                                                                                                                      |
| `AGENTS.md`                                        | +1 บรรทัด: ตัวชี้มายังเอกสารนี้ในตารางเอกสารอ้างอิง                                                                                                                                                                                       |

**โค้ดที่ได้รับผลกระทบสุทธิ:** ไฟล์โปรดักชัน 4 ไฟล์ (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), ไฟล์ทดสอบ 1 ไฟล์ (`qdrant-wiring.test.ts`), ไฟล์เอกสาร 2 ไฟล์ (`cluster-decisions.md`, `AGENTS.md`)
