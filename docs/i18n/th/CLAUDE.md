# CLAUDE.md (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

ไฟล์นี้ให้แนวทางสำหรับ Claude Code (claude.ai/code) เมื่อทำงานกับโค้ดในที่เก็บนี้

## เริ่มต้นอย่างรวดเร็ว

```bash
npm install                    # ติดตั้ง deps (สร้าง .env จาก .env.example โดยอัตโนมัติ)
npm run dev                    # เซิร์ฟเวอร์พัฒนาอยู่ที่ http://localhost:20128
npm run build                  # สร้างโปรดักชัน (Next.js 16 standalone)
npm run lint                   # ESLint (คาดหวัง 0 ข้อผิดพลาด; คำเตือนเป็นสิ่งที่มีอยู่แล้ว)
npm run typecheck:core         # ตรวจสอบ TypeScript (ควรสะอาด)
npm run typecheck:noimplicit:core  # ตรวจสอบอย่างเข้มงวด (ไม่มี implicit any)
npm run test:coverage          # หน่วยทดสอบ + เกณฑ์การครอบคลุม (75/75/75/70 — คำสั่ง/บรรทัด/ฟังก์ชัน/สาขา)
npm run check                  # lint + ทดสอบรวมกัน
npm run check:cycles           # ตรวจจับการพึ่งพาแบบวงกลม
```

### การรันการทดสอบ

```bash
# ไฟล์ทดสอบเดียว (Node.js native test runner — ทดสอบส่วนใหญ่)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# ทุกชุด
npm run test:all
```

สำหรับตารางการทดสอบทั้งหมด ดูที่ `CONTRIBUTING.md` → "การรันการทดสอบ" สำหรับสถาปัตยกรรมเชิงลึก ดูที่ `AGENTS.md`.

---

## โครงการโดยรวม

**OmniRoute** — โปรเซสเซอร์/เราเตอร์ AI ที่รวมเป็นหนึ่ง จุดสิ้นสุดเดียว, ผู้ให้บริการ LLM มากกว่า 160 ราย, การสำรองข้อมูลอัตโนมัติ

| เลเยอร์       | ตำแหน่ง                 | วัตถุประสงค์                                                                               |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — จุดเข้า                                                               |
| Handlers      | `open-sse/handlers/`    | การประมวลผลคำขอ (แชท, การฝัง, ฯลฯ)                                                         |
| Executors     | `open-sse/executors/`   | การส่ง HTTP เฉพาะผู้ให้บริการ                                                              |
| Translators   | `open-sse/translator/`  | การแปลงรูปแบบ (OpenAI↔Claude↔Gemini)                                                       |
| Transformer   | `open-sse/transformer/` | API การตอบกลับ ↔ การเติมแชท                                                                |
| Services      | `open-sse/services/`    | การจัดเส้นทางแบบรวม, ขีดจำกัดอัตรา, การแคช, ฯลฯ                                            |
| Database      | `src/lib/db/`           | โมดูลโดเมน SQLite (ไฟล์ 45+ ไฟล์, การโยกย้าย 55)                                           |
| Domain/Policy | `src/domain/`           | เอนจินนโยบาย, กฎค่าใช้จ่าย, ลอจิกการสำรองข้อมูล                                            |
| MCP Server    | `open-sse/mcp-server/`  | เครื่องมือ 37 รายการ (30 พื้นฐาน + 3 หน่วยความจำ + 4 ทักษะ), การขนส่ง 3 รายการ, ~13 ขอบเขต |
| A2A Server    | `src/lib/a2a/`          | โปรโตคอลตัวแทน JSON-RPC 2.0                                                                |
| Skills        | `src/lib/skills/`       | โครงสร้างทักษะที่ขยายได้                                                                   |
| Memory        | `src/lib/memory/`       | หน่วยความจำการสนทนาที่คงอยู่                                                               |

Monorepo: `src/` (แอป Next.js 16), `open-sse/` (พื้นที่ทำงานเครื่องยนต์สตรีมมิ่ง), `electron/` (แอปเดสก์ท็อป), `tests/`, `bin/` (จุดเข้า CLI).

## Request Pipeline

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod validation → auth? → policy check → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache check → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → response translation → SSE stream or JSON
    → If Responses API: responsesTransformer.ts TransformStream
```

API routes follow a consistent pattern: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`. ไม่มี middleware ของ Next.js ทั่วไป — การดักจับจะเฉพาะเจาะจงต่อเส้นทาง

**Combo routing** (`open-sse/services/combo.ts`): 14 กลยุทธ์ (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, reset-aware, strict-random, auto, lkgp, context-optimized, context-relay). เป้าหมายแต่ละตัวเรียก `handleSingleModel()` ซึ่งห่อหุ้ม `handleChatCore()` ด้วยการจัดการข้อผิดพลาดเฉพาะเป้าหมายและการตรวจสอบ circuit breaker ดู `docs/routing/AUTO-COMBO.md` สำหรับการให้คะแนน Auto-Combo 9 ปัจจัยและ `docs/architecture/RESILIENCE_GUIDE.md` สำหรับ 3 ชั้นของความทนทาน

---

## Resilience Runtime State

OmniRoute มีกลไกการล้มเหลวชั่วคราวที่เกี่ยวข้องกันสามอย่าง แต่แตกต่างกัน รักษาขอบเขตของพวกเขาแยกกันเมื่อทำการดีบักพฤติกรรมการจัดเส้นทาง ดู
[3-layer resilience diagram](./docs/diagrams/exported/resilience-3layers.svg)
(แหล่งที่มา: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
สำหรับแผนที่แบบคร่าวๆ

### Provider Circuit Breaker

**Scope**: ผู้ให้บริการทั้งหมด เช่น `glm`, `openai`, `anthropic`.

**Purpose**: หยุดการส่งข้อมูลไปยังผู้ให้บริการที่ล้มเหลวซ้ำๆ ที่ระดับ upstream/service เพื่อไม่ให้ผู้ให้บริการที่ไม่แข็งแรงทำให้คำขอทุกคำช้าลง

**Implementation**:

- คลาสหลัก: `src/shared/utils/circuitBreaker.ts`
- การเชื่อมต่อ/การดำเนินการของ Chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API สถานะการทำงาน: `src/app/api/monitoring/health/route.ts`
- ตัวห่อร่วม: `open-sse/services/accountFallback.ts`
- ตารางสถานะที่เก็บถาวร: `domain_circuit_breakers`

**States**:

- `CLOSED`: อนุญาตให้มีการจราจรปกติ
- `OPEN`: ผู้ให้บริการถูกบล็อกชั่วคราว; ผู้โทรจะได้รับการตอบสนองว่า provider-circuit-open หรือการจัดเส้นทางแบบ combo จะข้ามไปยังเป้าหมายอื่น
- `HALF_OPEN`: เวลาหมดเวลารีเซ็ตได้ผ่านไปแล้ว; อนุญาตให้มีการสอบถามคำขอ หากสำเร็จจะปิด circuit breaker หากล้มเหลวจะเปิดอีกครั้ง

**Defaults** (`open-sse/config/constants.ts`):

- ผู้ให้บริการ OAuth: เกณฑ์ `3`, เวลาหมดเวลารีเซ็ต `60s`
- ผู้ให้บริการ API-key: เกณฑ์ `5`, เวลาหมดเวลารีเซ็ต `30s`
- ผู้ให้บริการท้องถิ่น: เกณฑ์ `2`, เวลาหมดเวลารีเซ็ต `15s`

สถานะการล้มเหลวของผู้ให้บริการเท่านั้นที่ควรทำให้ circuit breaker ของผู้ให้บริการทำงาน:

```ts
(408, 500, 502, 503, 504);
```

อย่าทำให้ circuit breaker ของผู้ให้บริการทั้งหมดทำงานสำหรับข้อผิดพลาดบัญชี/คีย์/โมเดลปกติ เช่น ส่วนใหญ่ `401`, `403`, หรือ `429` เหล่านั้นมักจะเป็นการเชื่อมต่อที่เย็นลงหรือการล็อคโมเดล ข้อผิดพลาด API-key ทั่วไป `403` ควรสามารถกู้คืนได้ เว้นแต่จะถูกจัดประเภทเป็นข้อผิดพลาดบัญชี/ผู้ให้บริการที่สิ้นสุด

circuit breaker ใช้การกู้คืนแบบขี้เกียจ ไม่ใช่ตัวจับเวลาเบื้องหลัง เมื่อ `OPEN` หมดอายุ การอ่านเช่น `getStatus()`, `canExecute()`, และ `getRetryAfterMs()` จะรีเฟรชสถานะเป็น `HALF_OPEN` ดังนั้นแดชบอร์ดและผู้สร้างผู้สมัคร combo จะไม่ขExclude ผู้ให้บริการที่หมดอายุตลอดไป

### Connection Cooldown

**Scope**: การเชื่อมต่อ/บัญชี/คีย์ของผู้ให้บริการหนึ่ง

**Purpose**: ข้ามคีย์/บัญชีที่ไม่ดีชั่วคราวในขณะที่อนุญาตให้การเชื่อมต่ออื่นๆ สำหรับผู้ให้บริการเดียวกันดำเนินการให้บริการคำขอ

**Implementation**:

- เส้นทางการเขียน/อัปเดต: `src/sse/services/auth.ts::markAccountUnavailable()`
- การเลือก/กรองบัญชี: `src/sse/services/auth.ts::getProviderCredentials...`
- การคำนวณการเย็นลง: `open-sse/services/accountFallback.ts::checkFallbackError()`
- การตั้งค่า: `src/lib/resilience/settings.ts`

ฟิลด์ที่สำคัญในการเชื่อมต่อผู้ให้บริการ:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ในระหว่างการเลือกบัญชี การเชื่อมต่อจะถูกข้ามในขณะที่:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

การเย็นลงยังเป็นแบบขี้เกียจ: เมื่อ `rateLimitedUntil` อยู่ในอดีต การเชื่อมต่อจะมีสิทธิ์อีกครั้ง เมื่อใช้งานสำเร็จ `clearAccountError()` จะล้าง `testStatus`, `rateLimitedUntil`, ฟิลด์ข้อผิดพลาด และ `backoffLevel`

พฤติกรรมการเย็นลงของการเชื่อมต่อเริ่มต้น:

- การเย็นลงพื้นฐานของ OAuth: `5s`
- การเย็นลงพื้นฐานของ API-key: `3s`
- API-key `429` ควรให้ความสำคัญกับคำแนะนำการลองใหม่จาก upstream (`Retry-After`, headers รีเซ็ต หรือข้อความรีเซ็ตที่สามารถวิเคราะห์ได้) เมื่อมีให้
- ความล้มเหลวที่กู้คืนได้ซ้ำใช้การเพิ่มขึ้นแบบเอ็กซ์โพเนนเชียล:

```ts
baseCooldownMs * 2 ** failureIndex;
```

การป้องกันการเกิดภัยพิบัติแบบกลุ่มจะป้องกันไม่ให้ความล้มเหลวพร้อมกันในเชื่อมต่อเดียวกันขยายการเย็นลงซ้ำหรือเพิ่ม `backoffLevel` สองเท่า

สถานะสุดท้ายไม่ใช่การเย็นลง `banned`, `expired`, และ `credits_exhausted` มีจุดมุ่งหมายเพื่อให้ไม่สามารถใช้งานได้จนกว่าข้อมูลประจำตัว/การตั้งค่าจะเปลี่ยนแปลงหรือผู้ดูแลระบบรีเซ็ตพวกเขา อย่าเขียนทับสถานะสุดท้ายด้วยสถานะการเย็นลงชั่วคราว

### Model Lockout

**Scope**: ผู้ให้บริการ + การเชื่อมต่อ + โมเดล

**Purpose**: หลีกเลี่ยงการปิดการใช้งานการเชื่อมต่อทั้งหมดเมื่อมีเพียงโมเดลเดียวที่ไม่สามารถใช้งานได้หรือมีการจำกัดโควตาสำหรับการเชื่อมต่อนั้น

ตัวอย่าง:

- ผู้ให้บริการโควตาต่อโมเดลที่ส่งคืน `429`
- ผู้ให้บริการท้องถิ่นที่ส่งคืน `404` สำหรับโมเดลที่ขาดหายไป
- ความล้มเหลวในการอนุญาตโหมด/โมเดลเฉพาะของผู้ให้บริการ เช่น โหมด Grok ที่เลือก

การล็อคโมเดลอยู่ใน `open-sse/services/accountFallback.ts` และอนุญาตให้การเชื่อมต่อเดียวกันดำเนินการให้บริการโมเดลอื่นๆ ต่อไป

### Debugging Guidance

- หากคีย์ทั้งหมดสำหรับผู้ให้บริการถูกข้าม ให้ตรวจสอบทั้งสถานะ circuit breaker ของผู้ให้บริการและ `rateLimitedUntil`/`testStatus` ของการเชื่อมต่อแต่ละตัว
- หากผู้ให้บริการดูเหมือนจะถูกยกเว้นถาวรหลังจากหน้าต่างรีเซ็ต ให้ตรวจสอบว่าโค้ดกำลังอ่าน `state` ดิบแทนที่จะใช้ `getStatus()`/`canExecute()`
- หากคีย์ของผู้ให้บริการหนึ่งล้มเหลวแต่คีย์อื่นควรทำงาน ให้ให้ความสำคัญกับการเย็นลงของการเชื่อมต่อมากกว่าการทำงานของ circuit breaker ของผู้ให้บริการ
- หากโมเดลเพียงหนึ่งล้มเหลว ให้ให้ความสำคัญกับการล็อคโมเดลมากกว่าการเย็นลงของการเชื่อมต่อ
- หากสถานะควรกู้คืนเอง มันควรมี timestamp/เวลาหมดอายุในอนาคตและเส้นทางการอ่านที่รีเฟรชสถานะที่หมดอายุ สถานะถาวรต้องการการเปลี่ยนแปลงข้อมูลประจำตัวหรือการกำหนดค่าด้วยตนเอง

## ข้อตกลงหลัก

### รูปแบบโค้ด

- **2 ช่องว่าง**, เครื่องหมายเซมิโคลอน, เครื่องหมายคำพูดคู่, ความกว้าง 100 ตัวอักษร, คอมม่าใน ES5 (บังคับโดย lint-staged ผ่าน Prettier)
- **การนำเข้า**: ภายนอก → ภายใน (`@/`, `@omniroute/open-sse`) → เชิงสัมพันธ์
- **การตั้งชื่อ**: ไฟล์=camelCase/kebab, คอมโพเนนต์=PascalCase, ค่าคงที่=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = ข้อผิดพลาดทุกที่; `no-explicit-any` = เตือนใน `open-sse/` และ `tests/`
- **TypeScript**: `strict: false`, เป้าหมาย ES2022, โมดูล esnext, การแก้ไข bundler. ชอบประเภทที่ชัดเจน

### ฐานข้อมูล

- **เสมอ** ผ่านโมดูลโดเมน `src/lib/db/` — **ไม่เคย** เขียน SQL ดิบในเส้นทางหรือผู้จัดการ
- **ไม่เคย** เพิ่มตรรกะใน `src/lib/localDb.ts` (ชั้นการส่งออกใหม่เท่านั้น)
- **ไม่เคย** นำเข้าจาก `localDb.ts` — นำเข้าโมดูล `db/` ที่เฉพาะเจาะจงแทน
- DB singleton: `getDbInstance()` จาก `src/lib/db/core.ts` (WAL journaling)
- การโยกย้าย: `src/lib/db/migrations/` — ไฟล์ SQL ที่มีการเวอร์ชัน, idempotent, รันในธุรกรรม

### การจัดการข้อผิดพลาด

- try/catch ด้วยประเภทข้อผิดพลาดที่เฉพาะเจาะจง, บันทึกด้วยบริบท pino
- ไม่เคยกลืนข้อผิดพลาดใน SSE streams — ใช้สัญญาณยกเลิกสำหรับการทำความสะอาด
- คืนค่ารหัสสถานะ HTTP ที่เหมาะสม (4xx/5xx)

### ความปลอดภัย

- **ไม่เคย** ใช้ `eval()`, `new Function()`, หรือ implied eval
- ตรวจสอบข้อมูลนำเข้าทั้งหมดด้วย Zod schemas
- เข้ารหัสข้อมูลรับรองเมื่ออยู่ในที่เก็บ (AES-256-GCM)
- รายการปฏิเสธส่วนหัวของ upstream: `src/shared/constants/upstreamHeaders.ts` — รักษาความสะอาด, Zod schemas, และการทดสอบหน่วยให้สอดคล้องเมื่อแก้ไข
- **ข้อมูลรับรองสาธารณะของ upstream** (client_id/secret แบบ Gemini/Antigravity/Windsurf + คีย์ Firebase Web ที่ดึงมาจาก CLI สาธารณะ): **ต้อง** ถูกฝังผ่าน `resolvePublicCred()` จาก `open-sse/utils/publicCreds.ts` — **ไม่เคย** เป็นตัวอักษรสตริง ดู `docs/security/PUBLIC_CREDS.md` สำหรับรูปแบบที่จำเป็น
- **การตอบสนองข้อผิดพลาด** (HTTP / SSE / executor / MCP handler): **ต้อง** ผ่าน `buildErrorBody()` หรือ `sanitizeErrorMessage()` จาก `open-sse/utils/error.ts` — **ไม่เคย** ใส่ `err.stack` หรือ `err.message` ดิบในร่างการตอบสนอง ดู `docs/security/ERROR_SANITIZATION.md`.
- **คำสั่งเชลล์ที่สร้างจากตัวแปร**: เมื่อเรียกใช้ `exec()`/`spawn()` ด้วยสคริปต์ที่ต้องการค่าระหว่างการทำงาน, ส่งผ่านทางตัวเลือก `env` (เชลล์-escaped โดยอัตโนมัติ) — **ไม่เคย** สอดแทรกเส้นทางที่ไม่เชื่อถือได้/ภายนอกลงในร่างสคริปต์ อ้างอิง: `src/mitm/cert/install.ts::updateNssDatabases`.
- **ไลบรารีที่ปลอดภัยตามค่าเริ่มต้น** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): ชอบ Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink มากกว่าการใช้งานที่กำหนดเองเมื่อเพิ่มพื้นผิวที่มีความปลอดภัยสูงใหม่

---

## สถานการณ์การแก้ไขทั่วไป

### การเพิ่มผู้ให้บริการใหม่

1. ลงทะเบียนใน `src/shared/constants/providers.ts` (ตรวจสอบด้วย Zod ที่โหลด)
2. เพิ่ม executor ใน `open-sse/executors/` หากต้องการตรรกะที่กำหนดเอง (ขยาย `BaseExecutor`)
3. เพิ่ม translator ใน `open-sse/translator/` หากไม่ใช่รูปแบบ OpenAI
4. เพิ่มการกำหนดค่า OAuth ใน `src/lib/oauth/constants/oauth.ts` หากใช้ OAuth — หาก CLI ของ upstream ส่ง client_id/secret สาธารณะ, ฝังผ่าน `resolvePublicCred()` (ดู `docs/security/PUBLIC_CREDS.md`), **ไม่เคย** เป็นตัวอักษร
5. ลงทะเบียนโมเดลใน `open-sse/config/providerRegistry.ts`
6. เขียนการทดสอบใน `tests/unit/` (รวมการยืนยันรูปแบบ publicCreds หากคุณเพิ่มค่าเริ่มต้นใหม่ที่ฝัง)

### การเพิ่มเส้นทาง API ใหม่

1. สร้างไดเรกทอรีภายใต้ `src/app/api/v1/your-route/`
2. สร้าง `route.ts` ด้วยผู้จัดการ `GET`/`POST`
3. ปฏิบัติตามรูปแบบ: CORS → การตรวจสอบร่าง Zod → การตรวจสอบสิทธิ์ที่เลือกได้ → การมอบหมายผู้จัดการ
4. ผู้จัดการไปใน `open-sse/handlers/` (นำเข้าจากที่นั่น, ไม่ใช่ในบรรทัด)
5. การตอบสนองข้อผิดพลาดใช้ `buildErrorBody()` / `errorResponse()` จาก `open-sse/utils/error.ts` (ทำความสะอาดโดยอัตโนมัติ — ไม่เคยใส่ `err.stack` หรือ `err.message` ดิบในร่าง) ดู `docs/security/ERROR_SANITIZATION.md`.
6. เพิ่มการทดสอบ — รวมอย่างน้อยหนึ่งการยืนยันว่าการตอบสนองข้อผิดพลาดไม่รั่วไหลของ stack traces (`!body.error.message.includes("at /")`)

### การเพิ่มโมดูล DB ใหม่

1. สร้าง `src/lib/db/yourModule.ts` — นำเข้า `getDbInstance` จาก `./core.ts`
2. ส่งออกฟังก์ชัน CRUD สำหรับตารางโดเมนของคุณ
3. เพิ่มการโยกย้ายใน `src/lib/db/migrations/` หากต้องการตารางใหม่
4. ส่งออกใหม่จาก `src/lib/localDb.ts` (เพิ่มในรายการการส่งออกใหม่เท่านั้น)
5. เขียนการทดสอบ

### การเพิ่มเครื่องมือ MCP ใหม่

1. เพิ่มการกำหนดเครื่องมือใน `open-sse/mcp-server/tools/` พร้อมกับสคีมาข้อมูลนำเข้าของ Zod + ผู้จัดการแบบอะซิงโครนัส
2. ลงทะเบียนในชุดเครื่องมือ (เชื่อมต่อโดย `createMcpServer()`)
3. กำหนดให้กับขอบเขตที่เหมาะสม
4. เขียนการทดสอบ (การเรียกใช้เครื่องมือบันทึกลงในตาราง `mcp_audit`)

### การเพิ่มทักษะ A2A ใหม่

1. สร้างทักษะใน `src/lib/a2a/skills/` (มีอยู่แล้ว 5 ทักษะ: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. ทักษะได้รับบริบทของงาน (ข้อความ, เมตาดาต้า) → คืนค่าผลลัพธ์ที่มีโครงสร้าง
3. ลงทะเบียนใน `A2A_SKILL_HANDLERS` ใน `src/lib/a2a/taskExecution.ts`
4. เปิดเผยใน `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. เขียนการทดสอบใน `tests/unit/`
6. เอกสารในตารางทักษะใน `docs/frameworks/A2A-SERVER.md`

### การเพิ่มตัวแทนคลาวด์ใหม่

1. สร้างคลาสตัวแทนใน `src/lib/cloudAgent/agents/` ขยาย `CloudAgentBase` (มีอยู่แล้ว 3 ตัว: codex-cloud, devin, jules)
2. นำไปใช้ `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. ลงทะเบียนใน `src/lib/cloudAgent/registry.ts`
4. เพิ่มการจัดการ OAuth/ข้อมูลรับรองหากจำเป็น (`src/lib/oauth/providers/`)
5. การทดสอบ + เอกสารใน `docs/frameworks/CLOUD_AGENT.md`

### การเพิ่ม Guardrail / Eval / Skill / Webhook event ใหม่

- Guardrail: `src/lib/guardrails/` → เอกสาร: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → เอกสาร: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → เอกสาร: `docs/frameworks/SKILLS.md`
- Webhook event: `src/lib/webhookDispatcher.ts` → เอกสาร: `docs/frameworks/WEBHOOKS.md`

## เอกสารอ้างอิง

สำหรับการเปลี่ยนแปลงที่ไม่ธรรมดา ให้อ่านเอกสารเชิงลึกที่ตรงกันก่อน:

| พื้นที่                                         | เอกสาร                                                            |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| การนำทางใน Repo                                 | `docs/architecture/REPOSITORY_MAP.md`                             |
| สถาปัตยกรรม                                     | `docs/architecture/ARCHITECTURE.md`                               |
| เอกสารอ้างอิงด้านวิศวกรรม                       | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (การให้คะแนน 9 ปัจจัย, 14 กลยุทธ์)   | `docs/routing/AUTO-COMBO.md`                                      |
| ความยืดหยุ่น (กลไก 3 ประการ)                    | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| การเล่นซ้ำการให้เหตุผล                          | `docs/routing/REASONING_REPLAY.md`                                |
| กรอบทักษะ                                       | `docs/frameworks/SKILLS.md`                                       |
| ระบบหน่วยความจำ (FTS5 + Qdrant)                 | `docs/frameworks/MEMORY.md`                                       |
| ตัวแทนคลาวด์                                    | `docs/frameworks/CLOUD_AGENT.md`                                  |
| รั้วป้องกัน (PII / การฉีด / วิสัยทัศน์)         | `docs/security/GUARDRAILS.md`                                     |
| ข้อมูลประจำตัวสาธารณะจาก upstream (Gemini/etc.) | `docs/security/PUBLIC_CREDS.md`                                   |
| การทำความสะอาดข้อความแสดงข้อผิดพลาด             | `docs/security/ERROR_SANITIZATION.md`                             |
| การประเมินผล                                    | `docs/frameworks/EVALS.md`                                        |
| การปฏิบัติตาม / การตรวจสอบ                      | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                        | `docs/frameworks/WEBHOOKS.md`                                     |
| ท่อการอนุญาต                                    | `docs/architecture/AUTHZ_GUIDE.md`                                |
| การซ่อนตัว (TLS / ลายนิ้วมือ)                   | `docs/security/STEALTH_GUIDE.md`                                  |
| โปรโตคอลตัวแทน (A2A / ACP / Cloud)              | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| เซิร์ฟเวอร์ MCP                                 | `docs/frameworks/MCP-SERVER.md`                                   |
| เซิร์ฟเวอร์ A2A                                 | `docs/frameworks/A2A-SERVER.md`                                   |
| เอกสารอ้างอิง API + OpenAPI                     | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| แคตตาล็อกผู้ให้บริการ (สร้างโดยอัตโนมัติ)       | `docs/reference/PROVIDER_REFERENCE.md`                            |
| กระบวนการปล่อย                                  | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## การทดสอบ

| สิ่งที่                 | คำสั่ง                                                              |
| ----------------------- | ------------------------------------------------------------------- |
| การทดสอบหน่วย           | `npm run test:unit`                                                 |
| ไฟล์เดียว               | `node --import tsx/esm --test tests/unit/file.test.ts`              |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                               |
| E2E (Playwright)        | `npm run test:e2e`                                                  |
| โปรโตคอล E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                        |
| ระบบนิเวศ               | `npm run test:ecosystem`                                            |
| เกณฑ์การครอบคลุม        | `npm run test:coverage` (75/75/75/70 — คำสั่ง/บรรทัด/ฟังก์ชัน/สาขา) |
| รายงานการครอบคลุม       | `npm run coverage:report`                                           |

**กฎ PR**: หากคุณเปลี่ยนแปลงโค้ดการผลิตใน `src/`, `open-sse/`, `electron/`, หรือ `bin/`, คุณต้องรวมหรืออัปเดตการทดสอบใน PR เดียวกัน

**ความชอบชั้นการทดสอบ**: หน่วยก่อน → การรวม (หลายโมดูลหรือสถานะ DB) → e2e (UI/กระบวนการทำงานเท่านั้น) เข้ารหัสการทำซ้ำของข้อบกพร่องเป็นการทดสอบอัตโนมัติก่อนหรือพร้อมกับการแก้ไข

**นโยบายการครอบคลุม Copilot**: เมื่อ PR เปลี่ยนแปลงโค้ดการผลิตและการครอบคลุมต่ำกว่า 75% (คำสั่ง/บรรทัด/ฟังก์ชัน) หรือ 70% (สาขา) อย่าเพียงแค่รายงาน — เพิ่มหรืออัปเดตการทดสอบ รันเกณฑ์การครอบคลุมอีกครั้ง จากนั้นขอการยืนยัน รวมคำสั่งที่รัน ไฟล์ทดสอบที่เปลี่ยนแปลง และผลลัพธ์การครอบคลุมสุดท้ายในรายงาน PR

---

## การทำงานกับ Git

```bash
# อย่าคอมมิตโดยตรงไปยัง main
git checkout -b feat/your-feature
git commit -m "feat: อธิบายการเปลี่ยนแปลงของคุณ"
git push -u origin feat/your-feature
```

**คำนำหน้าสาขา**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**รูปแบบการคอมมิต** (Conventional Commits): `feat(db): เพิ่ม circuit breaker` — ขอบเขต: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## สภาพแวดล้อม

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, target ES2022, module esnext, resolution bundler
- **Path aliases**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **พอร์ตเริ่มต้น**: 20128 (API + แดชบอร์ดบนพอร์ตเดียวกัน)
- **ไดเรกทอรีข้อมูล**: `DATA_DIR` env var, ค่าเริ่มต้นเป็น `~/.omniroute/`
- **ตัวแปรสภาพแวดล้อมหลัก**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- การตั้งค่า: `cp .env.example .env` จากนั้นสร้าง `JWT_SECRET` (`openssl rand -base64 48`) และ `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## กฎที่เข้มงวด

1. อย่าคอมมิตความลับหรือข้อมูลรับรอง
2. อย่าเพิ่มตรรกะใน `localDb.ts`
3. อย่าใช้ `eval()` / `new Function()` / eval ที่แสดงออก
4. อย่าคอมมิตโดยตรงไปยัง `main`
5. อย่าเขียน SQL ดิบในเส้นทาง — ใช้โมดูล `src/lib/db/`
6. อย่ากินข้อผิดพลาดใน SSE streams โดยไม่แสดงออก
7. ต้องตรวจสอบข้อมูลนำเข้าด้วย Zod schemas เสมอ
8. ต้องรวมการทดสอบเมื่อเปลี่ยนแปลงโค้ดการผลิต
9. การครอบคลุมต้องอยู่ที่ ≥75% (คำสั่ง, บรรทัด, ฟังก์ชัน) / ≥70% (สาขา). ข้อมูลที่วัดได้ในปัจจุบัน: ~82%.
10. อย่าข้าม Husky hooks (`--no-verify`, `--no-gpg-sign`) โดยไม่มีการอนุมัติจากผู้ปฏิบัติงานอย่างชัดเจน
11. อย่าแทรก client_id/secret ของ OAuth สาธารณะหรือ Firebase Web keys เป็น string literals — ต้องผ่าน `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) เสมอ ดู `docs/security/PUBLIC_CREDS.md`
12. อย่าคืนค่า `err.stack` / `err.message` ดิบใน HTTP / SSE / การตอบสนองของ executor — ต้องส่งผ่าน `buildErrorBody()` หรือ `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) เสมอ ดู `docs/security/ERROR_SANITIZATION.md`
13. อย่าผสมเส้นทางภายนอกหรือค่ารันไทม์ในสคริปต์เชลล์ที่ส่งไปยัง `exec()`/`spawn()` — ส่งผ่านตัวเลือก `env` แทน อ้างอิง: `src/mitm/cert/install.ts::updateNssDatabases`
14. อย่าปฏิเสธการแจ้งเตือน CodeQL / Secret-Scanning โดยไม่ (a) ตรวจสอบเอกสารรูปแบบข้างต้นก่อนเพื่อดูว่าผู้ช่วยใช้ได้หรือไม่ และ (b) บันทึกเหตุผลทางเทคนิคในความคิดเห็นการปฏิเสธ ตัวอย่าง: `js/stack-trace-exposure` ที่เกิดขึ้นใน callsites ที่ส่งผ่าน `sanitizeErrorMessage()` แล้วเป็นข้อจำกัดที่ทราบของ CodeQL (custom sanitizers ไม่ได้รับการรับรู้) — ปฏิเสธว่าเป็น `false positive` โดยอ้างอิง `docs/security/ERROR_SANITIZATION.md`
15. อย่าเปิดเผยเส้นทางที่สร้างกระบวนการลูก (`/api/mcp/`, `/api/cli-tools/runtime/`) โดยไม่มีการจำแนกประเภท `isLocalOnlyPath()` ใน `src/server/authz/routeGuard.ts`. การบังคับใช้ loopback เกิดขึ้นโดยไม่มีเงื่อนไขก่อนการตรวจสอบการรับรองใด ๆ — JWT ที่รั่วไหลผ่านอุโมงค์ไม่สามารถกระตุ้นการสร้างกระบวนการได้ ดู `docs/security/ROUTE_GUARD_TIERS.md`
16. อย่ารวมส่วนต่อท้าย `Co-Authored-By` ที่ให้เครดิตกับ AI assistant, LLM หรือบัญชี automation (เช่น ชื่อที่มี "Claude", "GPT", "Copilot", "Bot"; อีเมลที่ `anthropic.com` / `openai.com` / ที่อยู่ `noreply.github.com` ที่บอทเป็นเจ้าของ) ไว้ในข้อความ commit เด็ดขาด ส่วนต่อท้ายเช่นนี้จะส่ง attribution ของ commit ไปยังบัญชีบอทบน GitHub และซ่อนผู้เขียนจริง (`diegosouzapw`) ในประวัติ PR ผู้ร่วมมือที่เป็นมนุษย์ — รวมถึงผู้เขียน PR upstream และผู้รายงาน issue ที่ถูก port มายัง OmniRoute — สามารถและควรได้รับเครดิตด้วยส่วนต่อท้ายมาตรฐาน `Co-authored-by: Name <email>`; workflow upstream-port (`/port-upstream-features`, `/port-upstream-issues`) ขึ้นอยู่กับสิ่งนี้
