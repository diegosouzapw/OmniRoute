# Error Message Sanitization (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **แหล่งข้อมูลหลัก:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` และตัวสร้างแบบสาธารณะใน `open-sse/utils/error.ts`
> **การทดสอบ:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **อัปเดตล่าสุด:** 2026-09-02 — v3.8.51
> **กลุ่มผู้อ่าน:** วิศวกรทุกคนที่แก้ไขการตอบกลับข้อผิดพลาด (HTTP routes, SSE streams, executors, MCP handlers)
> **สถานะ:** **บังคับใช้** สำหรับทุกเส้นทางโค้ดที่ส่งข้อความข้อผิดพลาดกลับไปยังไคลเอนต์

## เหตุผลที่ต้องมีสิ่งนี้

กฎ CodeQL `js/stack-trace-exposure` (CWE-209) จะตรวจพบทุกเส้นทางโค้ดที่ข้อความข้อผิดพลาดซึ่งมีต้นทางจากข้อยกเว้นระหว่างรันไทม์ถูกส่งไปยังการตอบกลับ HTTP / SSE โดยไม่ได้ผ่านการทำให้ปลอดภัย Stack trace และพาธไฟล์แบบสัมบูรณ์ในการตอบกลับของระบบที่ใช้งานจริงเปิดเผยข้อมูลต่อไปนี้แก่ผู้โจมตี:

- โครงสร้างไดเรกทอรีภายใน (`/srv/app/src/lib/...`) → ใช้สำรวจข้อมูลเพื่อการโจมตีเพิ่มเติม
- เวอร์ชันของไลบรารี / เฟรมเวิร์กที่อนุมานได้จาก stack frame → ใช้เลือกช่องโหว่เป้าหมาย
- ค่ารันไทม์ที่ละเอียดอ่อนซึ่งอาจถูกแทรกเป็นสตริงลงในข้อผิดพลาด (คำสั่งค้นฐานข้อมูล, ค่าการกำหนดค่า)

ตัวช่วย `sanitizeErrorMessage` ที่ส่งออกโดย `open-sse/utils/error.ts` จะลบการรั่วไหลประเภทต่อไปนี้:

1. ส่วนท้ายของ JavaScript stack frame ที่อยู่ในรูปแบบจริง รูปแบบ serialized และรูปแบบ inline ที่ระบุได้อย่างชัดเจน
2. พาธระบบไฟล์แบบสัมบูรณ์ของ POSIX, Windows, UNC และ `file://` โดยยังคงเก็บ URL แบบ HTTPS ที่ปลอดภัย
   และ API routes ที่ทำเครื่องหมายไว้อย่างชัดเจน
3. การกำหนดค่า credential, รูปแบบ token ทั่วไปของผู้ให้บริการ, บล็อก PEM ของ private key และ URL
   ข้อมูลแบบ base64

ตัวทำให้ปลอดภัยจะจำกัดความยาวของข้อมูลเข้าและปฏิเสธอย่างปลอดภัยเมื่อค่าที่ถูก throw ไม่ยอมรับการแปลงเป็นสตริง
การทำให้ JSON ต้นทางปลอดภัยแบบ recursive ยังลบ key ของ credential/พาธที่ไม่ปลอดภัย, alias ของ session และ
key ที่ควบคุม prototype ก่อนทำ serialization การตอบกลับ

## รูปแบบที่บังคับใช้

### 1. การสร้างการตอบกลับข้อผิดพลาด (HTTP / API routes)

ใช้ `buildErrorBody()` — มีการทำให้ปลอดภัยในตัว:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... ตรรกะของ handler ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

หรือใช้ wrapper เพื่อความสะดวกในโมดูลเดียวกัน:

```ts
import {
  errorResponse, // ออบเจ็กต์ Response แบบเรียกใช้ครั้งเดียว
  writeStreamError, // ตัวเขียน SSE
  createErrorResult, // รูปแบบ { success: false, status, response, ... }
  unavailableResponse, // เพิ่ม Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ทั้งหมดนี้ใช้ขอบเขตข้อผิดพลาดสาธารณะมาตรฐาน `errorResponse`, `writeStreamError` และ
`createErrorResult` จะส่งผ่าน `buildErrorBody`; ส่วนตัวช่วยเฉพาะทางสามรายการสำหรับการลองใหม่/วงจร
จะคัดเลือกและทำให้บริบทสาธารณะปลอดภัยโดยตรง **คุณไม่จำเป็นต้องเรียก
`sanitizeErrorMessage` ด้วยตนเอง** เมื่อใช้ตัวช่วยเหล่านี้

### 2. โครงสร้างข้อผิดพลาดแบบกำหนดเอง (พบน้อย)

เมื่อไม่สามารถใช้ตัวช่วยข้างต้นได้ (เช่น รูปแบบการตอบกลับถูกกำหนดโดยโพรโทคอลต้นทางอย่าง Connect-RPC) ให้นำเข้า `sanitizeErrorMessage` โดยตรง:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

นี่เป็นวิธีเดียวที่ได้รับอนุญาตให้ใช้สร้างเนื้อหาข้อผิดพลาดแบบกำหนดเอง ดูการใช้งานอ้างอิงได้ที่ `open-sse/executors/cursor.ts::buildErrorResponse`

### 3. การบันทึก log เทียบกับการตอบกลับ

ข้อยกเว้นภายในที่เชื่อถือได้อาจเก็บข้อความและ stack แบบเต็มไว้เพื่อให้ผู้ดูแลระบบแก้ไขข้อบกพร่องได้ ค่าที่
มีต้นทางจากขอบเขตของผู้ให้บริการ, การตรวจสอบความถูกต้อง, browser session หรือส่วนที่เกี่ยวข้องกับ credential ต้อง
ผ่านการทำให้ปลอดภัยก่อนเข้าสู่ console output, metadata การตรวจสอบ หรือ call log ถาวร รูปแบบ:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // เฉพาะข้อยกเว้นภายในที่เชื่อถือได้เท่านั้น
  return errorResponse(500, getErrorMessage(err)); // ทำให้ปลอดภัยแล้ว — ส่งไปยังไคลเอนต์
}
```

สำหรับความล้มเหลวที่ผู้ให้บริการควบคุม ให้คัดเลือกค่าที่บันทึกใน log ด้วย:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. รูปแบบที่ห้ามใช้

❌ **ห้าม** ใส่ผลลัพธ์ดิบของข้อยกเว้นลงในเนื้อหาของ Response:

```ts
// ไม่ดี: stack trace และพาธไฟล์ถูกส่งไปถึงไคลเอนต์
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **ห้าม** สร้างตัวแยกบรรทัดแรกขึ้นเอง:

```ts
// ไม่ดี: ลืมลบพาธแบบสัมบูรณ์ และอาจคลาดเคลื่อนจากตัวช่วยมาตรฐาน
const safe = String(err).split("\n")[0];
```

❌ **ห้าม** ทำให้ปลอดภัยเฉพาะใน route แล้วลืมเส้นทาง SSE ทุกอย่างที่เขียนลง stream ต้องผ่าน `writeStreamError` (หรือ `buildErrorBody` ที่อยู่เบื้องหลัง)

❌ **ห้าม** จงใจใส่ `process.cwd()`, `__filename`, `__dirname` หรือพาธที่มาจาก env
ลงในข้อความข้อผิดพลาด ตัวทำให้ปลอดภัยรองรับพาธแบบสัมบูรณ์เพื่อเป็นการป้องกันเชิงลึก แต่ผู้เรียกใช้ต้องไม่
สร้างข้อความที่เปิดเผยโครงสร้างระบบตั้งแต่แรก

## ความครอบคลุมใน CI

`tests/unit/error-message-sanitization.test.ts` บังคับใช้ข้อกำหนดต่อไปนี้:

- ทุก route ภายใต้ `/api/model-combo-mappings/*` ต้องส่งคืน body ที่ผ่านการล้างข้อมูลแล้วสำหรับสถานะ 4xx/5xx
- `sanitizeErrorMessage` ลบ stack trace แบบหลายบรรทัด
- `sanitizeErrorMessage` แทนที่ absolute path ของ POSIX และ Windows ด้วย `<path>`
- `sanitizeErrorMessage` จัดการอินพุตที่เป็น `null`/`undefined`/อินสแตนซ์ `Error` ได้อย่างปลอดภัย
- `buildErrorBody` ต้องไม่เปิดเผย stack trace ในฟิลด์ `message`

เมื่อเพิ่ม route หรือ executor ใหม่ ให้คัดลอกรูปแบบ assertion จากไฟล์นี้ เกณฑ์ความครอบคลุม (`npm run test:coverage`) บังคับให้ statements/lines/functions/branches มีความครอบคลุม ≥60% — โดยต้องครอบคลุมเส้นทางข้อผิดพลาดด้วย

## มาตรการควบคุมที่เกี่ยวข้อง

- การแจ้งเตือน CodeQL `js/stack-trace-exposure` ใน `.github/security` ควรได้รับการแก้ไขผ่าน helper เหล่านี้ **หรือ** ปิดการแจ้งเตือนพร้อมความคิดเห็นที่อ้างอิงเอกสารนี้เสมอ
- การกำหนดค่า redaction ของ `pino` (`src/shared/utils/logRedaction.ts`) จัดการ structured log ที่เชื่อถือได้แยกต่างหาก เอกสารนี้ครอบคลุมข้อความ response สาธารณะและค่าที่ควบคุมโดย provider ซึ่งข้ามขอบเขตของ call log/proxy log ที่จัดเก็บถาวร
- denylist ของ upstream header (`src/shared/constants/upstreamHeaders.ts`) ครอบคลุมการรั่วไหลของ header — เมื่อเพิ่มข้อกังวลใหม่เกี่ยวกับการนำข้อมูลออกโดยไม่ได้รับอนุญาต ให้ปรับทั้งสองไฟล์ให้สอดคล้องกัน

## การส่งผ่านรายละเอียดจาก upstream

`buildErrorBody` รับอาร์กิวเมนต์ที่สาม `upstreamDetails` แบบไม่บังคับ (body ดิบที่ parse แล้วจาก upstream provider) เมื่อระบุค่า ระบบจะล้างข้อมูลด้วย `sanitizeUpstreamDetails` ก่อนรวมไว้ใน response ในชื่อ `upstream_details`

อาร์กิวเมนต์ที่สี่ `classification` แบบไม่บังคับ
(`{ type?: string; code?: string; reason?: string }`) รับการจัดประเภทสาธารณะแบบระบุชัดเจน ทุกฟิลด์จะถูกฉายลงบนชุดคำศัพท์ public identifier ที่มีขอบเขตจำกัด ค่าที่ไม่ปลอดภัย มีรูปแบบคล้ายข้อมูลรับรอง มีอักขระควบคุม หรือยาวเกินกำหนด จะย้อนกลับไปใช้ type/code ที่ได้จากสถานะ ส่วน reason แบบไม่บังคับที่ไม่ปลอดภัยจะถูกตัดออก ตัวระบุสถานะ HTTP แบบสามหลัก (`100` ถึง `599`) ยังคงใช้ได้สำหรับสัญญาของ provider ที่เปิดเผยสถานะ upstream แบบตัวเลขเป็น code ที่เครื่องอ่านได้ ช่วงที่มีขอบเขตเดียวกันนี้ได้รับการยอมรับในรูปแบบ placeholder ของสถานะ HTTP ที่สร้างภายในระบบ ส่วนตัวเลขและชื่ออื่นๆ จาก provider ยังคงอยู่นอกชุดคำศัพท์ดังกล่าว

ส่ง classification ที่ระบุชัดเจนทั้งหมดผ่านอาร์กิวเมนต์ที่สี่นั้น ห้ามเขียนทับ
`body.error.code`, `body.error.type` หรือ `body.error.reason` หลังจาก `buildErrorBody()` ส่งคืนค่าแล้ว
การแก้ไขภายหลัง builder จะข้ามขั้นตอนการฉายข้อมูลสาธารณะ

กฎการล้างข้อมูลที่ใช้กับ `upstreamDetails`:

1. ค่า leaf ที่เป็น string: ประมวลผลผ่าน `sanitizeErrorMessage` (ลบ stack และ absolute path)
2. ลบ key ที่เกี่ยวข้องกับ path ที่ไม่ปลอดภัย ข้อมูลรับรอง session alias และการควบคุม prototype
3. จำกัดความลึก: การซ้อนเกิน 4 ระดับจะถูกแทนที่ด้วย string `"[truncated]"`
4. จำกัด array ไว้ที่ 32 element

เฉพาะ call site ที่มี body ข้อผิดพลาดจาก provider ซึ่ง parse แล้วเท่านั้นที่ควรส่ง `upstreamDetails` ข้อผิดพลาดภายในของ OmniRoute (การ parse SSE ล้มเหลว, content ว่างเปล่า, การบล็อกโดย guardrail) ต้องไม่รวมข้อมูลนี้

ห้ามส่ง `err.stack`, `err.message` แบบดิบ หรือ string ใดๆ จาก runtime exception ไปยัง
`upstreamDetails` ค่าเหล่านั้นยังคงต้องผ่าน `errorResponse` / `buildErrorBody(code, msg)`
โดยไม่มี upstream body

การส่งผ่าน upstream 4xx แบบเลือกเฉพาะกรณีจะคงรูปแบบ JSON ที่ปลอดภัยและถ้อยคำของ provider ซึ่งจำเป็นต่อการกู้คืนอัตโนมัติของ client แต่ไม่ใช่การส่งผ่านแบบตรงกันทุก byte: recursive sanitizer จะทำงานก่อน serialization เสมอ body ที่เป็น cyclic, มี BigInt หรือมี `toJSON()` ที่เป็นอันตรายจะถูกปฏิเสธอย่างปลอดภัยและไม่มีสิทธิ์ส่งผ่าน OCR และ moderation ใช้กฎเดียวกัน ส่วน upstream body ที่ไม่ใช่ JSON ว่างเปล่า หรือติด label ผิด จะถูกแปลงเป็น envelope ข้อผิดพลาด JSON มาตรฐานของ OmniRoute

## ข้อจำกัดที่ทราบของ CodeQL: ไม่รู้จักตัวกรองข้อมูลแบบกำหนดเอง

คิวรี CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ใช้รายการอนุญาตแบบคงที่ของรูปแบบตัวกรองข้อมูล (เช่น `.split("\n")[0]` แบบอินไลน์, `String#replace` ที่ใช้รูปแบบ regex เฉพาะ และการเข้าถึง `.message` บน `Error`) โดยคิวรีนี้ **ไม่** รู้จักการเรียกทางอ้อมผ่านฟังก์ชันช่วยเหลือแบบกำหนดเอง เช่น `sanitizeErrorMessage()` ของเรา

ซึ่งหมายความว่าจุดเรียกใช้งานที่พิสูจน์ได้ว่ามีการกรองข้อมูลผ่านโมดูลนี้ เช่น `open-sse/utils/error.ts::errorResponse` และ `open-sse/executors/cursor.ts::buildErrorResponse` อาจยังคงทำให้เกิดการแจ้งเตือน แม้ว่าโค้ดจะปลอดภัยในเชิงการทำงานก็ตาม ตัวอย่างการยกเลิกการแจ้งเตือนก่อนหน้านี้: `#224`, `#231` (พฤษภาคม 2026) ซึ่งทั้งคู่ถูกระบุเป็น `false positive` พร้อมเหตุผลทางเทคนิค

**วิธีจัดการเมื่อเกิดกรณีใหม่:**

1. ยืนยันว่าจุดเรียกใช้งานส่งข้อความผ่าน `sanitizeErrorMessage` / `buildErrorBody` / wrapper รายการใดรายการหนึ่งที่บันทึกไว้ข้างต้นจริง (อ่านลำดับการเรียกทั้งหมดตั้งแต่ต้นจนจบ — อย่าเชื่อเพียงความคิดเห็นในโค้ด)
2. ยืนยันว่า `tests/unit/error-message-sanitization.test.ts` ครอบคลุมเส้นทางดังกล่าว (หรือเพิ่มความครอบคลุม)
3. ยกเลิกการแจ้งเตือนผ่าน `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` โดยอ้างอิงเอกสารนี้
4. **อย่า** "แก้ไข" ด้วยการเขียน `.split("\n")[0]` แบบอินไลน์ทุกแห่ง — ฟังก์ชันช่วยเหลือนี้เป็นแหล่งข้อมูลจริงเพียงแหล่งเดียว การทำซ้ำรูปแบบดังกล่าวทำให้ตัวกรองข้อมูลมีประสิทธิภาพลดลง (สูญเสียการลบเส้นทาง การจำกัดความยาว และการแปลงชนิดข้อมูล) เพียงเพื่อให้ดูเหมือนว่าตอบสนองต่อเครื่องมือสแกนแล้ว

การนำคุณลักษณะแบบเลือกใช้ เช่น การกำหนดค่าตัวกรองข้อมูลแบบกำหนดเองของ CodeQL ผ่าน [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) มาใช้ คือแนวทางแก้ไขระยะยาว ซึ่งอยู่นอกขอบเขตของเอกสารนี้

## เอกสารอ้างอิง

- [CWE-209: การเปิดเผยข้อมูลผ่านข้อความแสดงข้อผิดพลาด](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: คู่มือสรุปการจัดการข้อผิดพลาด](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- คอมมิตที่รวมฟังก์ชันช่วยเหลือไว้ที่ศูนย์กลาง: `1a39c31f` — _fix(security): ปกปิดข้อมูลรับรองสาธารณะของ upstream + รวมการกรองข้อความแสดงข้อผิดพลาดไว้ที่ศูนย์กลาง_
