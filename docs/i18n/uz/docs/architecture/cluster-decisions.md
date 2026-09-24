# Cluster Decisions — Optional Sidecar Profiles (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Holat:** taklif (@diegosouzapw ko‘rib chiqishi kutilmoqda)
**Sana:** 2026-06-20
**Havolalar:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Qisqacha

[`docker-compose.yml`](../../docker-compose.yml) faylidagi mavjud 8 xizmatli joylashtirish uchun ikkita ixtiyoriy compose profili (`memory`, `bifrost`). Standart ishga tushirish tartibi **o‘zgarmaydi**: 3 × `omniroute` replikasi + Caddy + Redis + CliproxyAPI. Ikki yangi profil Qdrant va Bifrost’ni `docker compose --profile <name> up` orqali faollashtiriladigan ixtiyoriy sidecar’lar sifatida qo‘shadi. **Hech bir mavjud xizmat olib tashlanmaydi yoki almashtirilmaydi.**

## Nega bu ehtiyotkor yondashuv

OmniRoute’ning mavjud joylashtirish tuzilmasi allaqachon ixcham va amalda sinalgan:

- **`redis:7-alpine`** ishlab chiqarish miqyosidagi tezlik cheklovi/kesh ish yukini boshqaradi.
- **SQLite + sqlite-vec + FTS5** lokal xotira + vektor + matn bo‘yicha qidiruvni qamrab oladi ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) fayliga qarang).
- **Caddy** allaqachon yuk muvozanatlagichi + TLS terminatori hisoblanadi ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** allaqachon [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) faylida Tier-1 marshrutizatori sifatida integratsiya qilingan (`BIFROST_ENABLED` muhit o‘zgaruvchisi orqali favqulodda o‘chirish imkoniyatiga ega sidecar proksi — sidecar’ni chetlab o‘tib, TS yo‘liga o‘tish uchun `=0` qilib belgilang).

Bu yerdagi ikki profil **SQLite imkoniyatlari chegarasiga yetgan joylashtirishlar uchun masshtablash variantlaridir** — migratsiyalar emas. Ikkalasi ham standart holatda o‘chirilgan.

## Ikki profil

### `memory` — Qdrant vektorli xotira sidecar’i

**Qachon yoqish kerak:**

- Har bir joylashtirishda > 1M embedding bo‘lsa (sqlite-vec katta miqyosda sekinlasha boshlaydi).
- `omniroute-1/2/3` o‘rtasida umumiy vektor holatini talab qiladigan ko‘p replikali joylashtirish.
- Sizda allaqachon tashqi Qdrant klasteri mavjud bo‘lsa (Qdrant Cloud, lokal infratuzilma).

**Nima qo‘shadi:**

| Xizmat   | Tasvir                  | Portlar     | Izohlar                                            |
| -------- | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW indeksi; doimiy `omniroute_qdrant_data` jildi |

**Faollashtirish:** Sozlamalar interfeysida `qdrantEnabled = true` qiymatini yoqing **yoki** `QDRANT_HOST=qdrant` muhit o‘zgaruvchisini o‘rnating. Ustuvorlik qoidalari uchun [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) fayliga qarang (sozlamalar jadvali → muhit o‘zgaruvchisi → standart qiymat).

**Muhit o‘zgaruvchilari:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` faylining 1672-1683-qatorlariga qarang).

### `bifrost` — Bifrost Tier-1 marshrutizator sidecar’i

**Qachon yoqish kerak:**

- Siz ≥3 ta `omniroute` replikasini ishlatasiz va provayderlar rotatsiyasini yagona Go jarayonida markazlashtirmoqchisiz.
- Barcha replikalardagi yuqori oqim provayderlariga yuboriladigan so‘rovlar uchun yagona audit/jurnallash interfeysini xohlaysiz.
- Tier-1 marshrutlash qatlamini OmniRoute replikalaridan mustaqil ravishda gorizontal masshtablashni xohlaysiz.

**Nima qo‘shadi:**

| Xizmat    | Tasvir                            | Portlar | Izohlar                                                                              |
| --------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Go asosidagi Tier-1 marshrutizatori; doimiy `omniroute_bifrost_logs` jurnallar jildi |

**Faollashtirish:** `.env.example` faylida `BIFROST_BASE_URL=http://bifrost:8080` qiymatini o‘rnating. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) faylidagi mavjud sidecar proksi marshruti (PR #4381 da qo‘shilgan) buni avtomatik ravishda qabul qiladi.

**Muhit o‘zgaruvchilari:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` faylining 1685-1695-qatorlariga qarang).

## Ushbu PR nimalarni ataylab amalga oshirmaydi

Dastlabki muammo muhokamasida klasterni kengroq qayta ishlab chiqish taklif qilingan edi. Amaldagi ish yuklamasi xususiyatlari tekshirilgach, quyidagilar ko‘rsatilgan sabablarga ko‘ra **rad etildi**:

| Komponent                            | Qaror             | Sabab                                                                                                                                                |
| ------------------------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **OLIB TASHLASH** | `redis:7-alpine` ishlab chiqarish miqyosidagi tezlikni cheklash ish yuklamasi uchun allaqachon yetarli; yengib o‘tilishi kerak bo‘lgan cheklov yo‘q. |
| **NATS**                             | **OLIB TASHLASH** | Har bir `omniroute` replikasi yagona Node.js jarayonidir; ko‘p jarayonli pub/sub ish yuklamasi mavjud emas.                                          |
| **PostgreSQL**                       | **OLIB TASHLASH** | SQLite + sqlite-vec + FTS5 barcha 3 ta foydalanish holatini qamrab oladi; 97 ta migratsiya + Electron paketlash migratsiyaga to‘sqinlik qiladi.      |
| **Neo4j**                            | **OLIB TASHLASH** | Marshrutlash 5 ta jadvalni birlashtirishdan iborat; SQLite’dagi rekursiv CTE yetarli.                                                                |
| **MinIO**                            | **OLIB TASHLASH** | Ko‘p MB hajmli blob ish yuklamasi yo‘q; tasvirlar/audio vositachi proksi orqali o‘tkaziladi.                                                         |
| **pgvector / pg_ai / pg_textsearch** | **OLIB TASHLASH** | PostgreSQL bilan bir xil SQLite cheklovi sababi; pgvector ekotizimi tarqoq.                                                                          |
| **HAProxy / Envoy**                  | **OLIB TASHLASH** | Caddy allaqachon LB + TLS’ni bajaradi; ikkalasi ham 1-darajali marshrutizator sifatida ochiqchasiga rad etilgan (`AGENTS.md`ga qarang).              |

Agar kelajakdagi foydalanish holati ulardan birining zarurligini isbotlasa, ushbu hujjatga tuzatish kiritilishi kerak.

## 4 haftalik joriy etish (tasdiqlansa)

1. **1-hafta** — Ushbu PR’ni birlashtirish + 3 replikali compose steki bilan ixtiyoriy profillarni tekshirish.
2. **2-hafta** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) manzilidagi sidecar proksi marshruti orqali OpenAI/Claude/Gemini/Ollama (14+ provayderdan 4 tasi) uchun Bifrost’ni to‘liq faollashtirish (`BIFROST_ENABLED` bilan boshqariladi, ish vaqtida favqulodda o‘chirish mumkin).
3. **3-hafta** — Qdrant xotira profilini yagona sinov joylashtiruvida yoqish; sqlite-vec bilan taqqoslaganda kechikish farqini o‘lchash.
4. **4-hafta** — Kuzatuvchanlik holati tekshiruvlari (`docker compose ps` chiqish kodlari + `wget` tezkor sinovlari); ADR-041 bo‘yicha 71 tayanchli yangilash.

## Ushbu PR’da o‘zgartirilgan fayllar

| Fayl                                                  | O‘zgarish                                                                                                                                                                                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                  | +30 qator: `memory` profili (Qdrant), `bifrost` profili (Bifrost), doimiy jildlar, holat tekshiruvlari.                                                                                                                                     |
| `.env.example`                                        | +24 qator: `QDRANT_*` (6 ta o‘zgaruvchi), `BIFROST_*` (4 ta o‘zgaruvchi).                                                                                                                                                                   |
| `docs/reference/ENVIRONMENT.md`                       | `QDRANT_*` muhit o‘zgaruvchilari uchun 25-bo‘limga +6 qator.                                                                                                                                                                                |
| `src/lib/memory/qdrant.ts`                            | +33 qator: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` uchun muhit o‘zgaruvchilarining zaxira zanjiri (sozlamalar → muhit → standart qiymat). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`      | +88 qator: muhit o‘zgaruvchilarining zaxira ustuvorligini mustahkamlovchi 9 ta yangi sinov holati.                                                                                                                                          |
| `docs/architecture/cluster-decisions.md` (ushbu fayl) | YANGI — ixtiyoriy profillar uchun qaror qaydi.                                                                                                                                                                                              |
| `AGENTS.md`                                           | +1 qator: ma’lumotnoma hujjatlari jadvalida ushbu hujjatga havola.                                                                                                                                                                          |

**O‘zgartirilgan kodlarning jami:** 4 ta ishlab chiqarish fayli (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 ta sinov fayli (`qdrant-wiring.test.ts`), 2 ta hujjat fayli (`cluster-decisions.md`, `AGENTS.md`).
