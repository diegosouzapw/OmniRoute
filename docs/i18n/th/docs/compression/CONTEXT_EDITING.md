# Delegated Context Editing (Anthropic) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Context Editing** แบบมอบหมายเป็นฟีเจอร์จัดการบริบทที่ใช้ได้เฉพาะ Claude เท่านั้น ซึ่งแตกต่างจากเอนจินบีบอัดภายในเครื่องของ OmniRoute (Caveman, RTK, LLMLingua, ไปป์ไลน์แบบซ้อน) — ที่เขียนเนื้อหาของคำขอใหม่ _ก่อน_ ออกจากพร็อกซี — Context Editing จะขอให้ **ผู้ให้บริการ** ล้างบล็อกการใช้เครื่องมือ / ผลลัพธ์จากเครื่องมือที่ล้าสมัยออกจากหน้าต่างบริบทที่กำลังทำงานอยู่ของตนเอง OmniRoute เพียงแนบพารามิเตอร์ในเนื้อหา (`context_management.edits[]`) ส่วน Claude จะดำเนินการล้างจริงโดยอิงตาม tokenizer ของตนเอง

โดยธรรมชาติแล้ว นี่เป็นความสามารถแบบมอบหมาย: ผู้ให้บริการรายอื่นจะปฏิเสธพารามิเตอร์นี้ ดังนั้น OmniRoute จึงจำกัดขอบเขตการใช้งานไว้อย่างเคร่งครัดเฉพาะ Claude และรีเลย์ที่เข้ากันได้กับ Claude Code

แหล่งข้อมูลอ้างอิงหลัก: `open-sse/config/contextEditing.ts` (รหัสกลยุทธ์ การแทรกเนื้อหา การดึงข้อมูล telemetry), `open-sse/executors/base.ts` (เงื่อนไขการแทรก + fallback เมื่อพบข้อผิดพลาด 400) และ `open-sse/services/compression/types.ts` (โครงสร้างการกำหนดค่า + ค่าเริ่มต้น)

## `clear_tool_uses` ทำอะไร

OmniRoute จะแทรกการแก้ไขหนึ่งรายการลงในเนื้อหา Anthropic Messages ขาออก:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — รหัสกลยุทธ์ Anthropic แบบระบุวันที่ (`CLEAR_TOOL_USES_STRATEGY`)
- `trigger.value: 100000` — เมื่อโทเค็นอินพุตของคำขอเกินเกณฑ์นี้ Claude จะเริ่มล้างคู่การใช้เครื่องมือ/ผลลัพธ์เก่า (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS` ซึ่งเป็นค่าเริ่มต้นของ Anthropic)
- `keep.value: 3` — คู่การใช้เครื่องมือ/ผลลัพธ์ล่าสุดจำนวน N คู่จะถูกเก็บไว้โดยไม่แก้ไข (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`)

ระบบจะประกาศเบต้าผ่านส่วนหัว `anthropic-beta: context-management-2025-06-27` ซึ่ง OmniRoute ส่งไปพร้อมกับคำขอ Claude อยู่แล้ว

การแทรกดำเนินการโดย `applyContextEditingToBody()` และเป็นแบบ **idempotent**: หากมีการแก้ไข `clear_tool_uses` อยู่ในเนื้อหาแล้ว (เพิ่มโดยการเรียกครั้งก่อนหรือส่งมาจากไคลเอนต์) เนื้อหาจะคงเดิม หากมีการแก้ไข `clear_thinking_20251015` อยู่ด้วย OmniRoute จะเรียงลำดับแบบคงที่เพื่อย้ายการแก้ไข `clear_thinking` ไปไว้ด้านหน้า เนื่องจาก Anthropic กำหนดให้ `clear_thinking` ต้องอยู่ก่อน `clear_tool_uses` ในอาร์เรย์ `edits[]`

## ตัวสลับเปิดใช้งานสำหรับแต่ละคอมโบ

Context Editing **ปิดใช้งานโดยค่าเริ่มต้น** และต้องเลือกเปิดใช้งานเอง ตัวสลับนี้เป็นค่าบูลีนเพียงค่าเดียวที่อยู่ในการกำหนดค่าการบีบอัด:

- คีย์การตั้งค่า: `contextEditing.enabled` (camelCase — **ไม่ใช่** `context_editing` / `context-editing`)
- ชนิด: `ContextEditingConfig { enabled: boolean }` ใน `open-sse/services/compression/types.ts`
- ค่าเริ่มต้น: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`
- สคีมา Zod: `contextEditingConfigSchema` ใน `src/shared/validation/compressionConfigSchemas.ts`
- การจัดเก็บ: บันทึกถาวรร่วมกับการตั้งค่าการบีบอัดส่วนที่เหลือ (ปรับให้อยู่ในรูปแบบมาตรฐานใน `src/lib/db/compression.ts`)

ในแดชบอร์ด ตัวสลับจะอยู่ในศูนย์รวมการบีบอัด (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) และเขียน `{ contextEditing: { enabled: … } }` กลับผ่าน `saveSettings()` เนื่องจากตัวสลับนี้อยู่บนออบเจ็กต์การตั้งค่าการบีบอัด จึงทำงานร่วมกับโปรไฟล์การบีบอัดสำหรับแต่ละคอมโบ แทนที่จะเป็นส่วนการตั้งค่าที่แยกเป็นอิสระโดยสมบูรณ์ — การกำหนดค่ามีเพียงแฟล็กเปิด/ปิดเท่านั้น ส่วนเกณฑ์ทั้งหมด (`trigger`, `keep`) ใช้ค่าคงที่ที่ระบุไว้ข้างต้น

## การจำกัดให้ใช้เฉพาะ Claude

การแทรกจะเกิดขึ้นเฉพาะกับ Claude ของแท้หรือรีเลย์ที่เข้ากันได้กับ Claude Code เท่านั้น เงื่อนไขตรวจสอบใน
`open-sse/executors/base.ts` คือ:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — คีย์/OAuth ของ Anthropic จริง
- `isClaudeCodeCompatible(this.provider)` — รีเลย์ที่มีรหัสผู้ให้บริการขึ้นต้นด้วยคำนำหน้า
  `anthropic-compatible-cc-` (รีเลย์เหล่านี้ประกาศความเข้ากันได้กับ Claude Code จึงมีแนวโน้มสูงสุดที่จะรองรับฟีเจอร์เบต้า) ดู `open-sse/services/provider.ts`

รายการที่ **ไม่รวมไว้โดยเจตนา**:

- `claude-web` — รีเลย์ผ่านเบราว์เซอร์ที่มีรูปแบบคำขอ `create_conversation_params` ซึ่งจะไม่พบ
  `context_management`
- รีเลย์ `anthropic-compatible-*` ทั่วไป (ที่ไม่มีคำนำหน้า `-cc-`) — ปลายทางของบุคคลที่สามซึ่งไม่แน่นอนว่ารองรับฟีเจอร์เบต้าหรือไม่

ผู้ให้บริการที่ไม่ใช่ Claude จะไม่ได้รับพารามิเตอร์ `context_management` แม้ว่าจะเปิดตัวเลือกนี้อยู่ก็ตาม

## กลไกสำรองเมื่อพบ 400 / การครอบคลุมรีเลย์

รีเลย์ที่เข้ากันได้กับ Claude อาจประกาศว่ารองรับฟีเจอร์เบต้า แต่ยังคงปฏิเสธพารามิเตอร์ `context_management`
ด้วย HTTP 400 ได้ เพื่อให้ลดระดับการทำงานอย่างเหมาะสมแทนที่จะทำให้คำขอล้มเหลว ตัวดำเนินการจะนำ
พารามิเตอร์ออกและลองส่งไปยัง URL เดิมอีกครั้ง **หนึ่งครั้ง**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

ลักษณะการทำงาน:

1. ทำงานเฉพาะเมื่อได้รับ `400` ขณะที่เปิดใช้การแก้ไขบริบท และตัวเนื้อหาคำขอมี
   `context_management` อยู่จริง
2. อ่านเนื้อหาของ 400 ผ่าน `clone()` เพื่อให้การตอบกลับเดิมยังคงสมบูรณ์สำหรับกรณีที่ไม่ตรงตามเงื่อนไข
3. ข้อความข้อผิดพลาดต้องตรงกับ `/context[_-]management|context editing/i` — 400 ที่ไม่เกี่ยวข้อง (เช่น
   `max_tokens must be >= 1`) จะ **ไม่** เรียกใช้กลไกสำรอง และข้อผิดพลาดเดิมจะถูกส่งต่อ
4. เมื่อตรงกัน ระบบจะตั้งค่า `contextEditingDisabled = true` (ซึ่งป้องกันการแทรกซ้ำ หากมีการสร้าง
   `transformedBody` ใหม่ในภายหลังสำหรับ URL ที่ใช้ลองใหม่/สำรอง), ลบ `context_management`,
   ลงนามเนื้อหาคำขออีกครั้งสำหรับ Claude / รีเลย์ที่เข้ากันได้กับ Claude Code (`signRequestBody`) และลองส่งไปยัง
   URL เดิมอีกหนึ่งครั้ง

Claude ของแท้มีข้อมูลเบต้าอยู่ใน `ANTHROPIC_BETA_BASE` และจะไม่เข้าสู่เส้นทางกลไกสำรองนี้

## เทเลเมทรี `applied_edits`

หลังจากได้รับการตอบกลับจาก Claude แล้ว OmniRoute จะบันทึกว่าผู้ให้บริการล้างบริบทไปมากเพียงใด ข้อมูลนี้
**ไม่ได้** ถูกสตรีม แต่จะถูกดึงจากเนื้อหาการตอบกลับแบบไม่สตรีมโดยใช้ความพยายามอย่างดีที่สุด และจะไม่ส่งผลกระทบ
ต่อการตอบกลับ (ระบบจะละเว้นความล้มเหลวของเทเลเมทรี)

- การดึงข้อมูล: `extractContextEditingTelemetry(responseBody)` ใน `open-sse/config/contextEditing.ts`
  ฟังก์ชันนี้ตรวจหา `applied_edits` ในสามตำแหน่ง (เพื่อรองรับรูปแบบการตอบกลับที่หลากหลาย):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- ฟิลด์ต่อการแก้ไขที่อ่านจากแต่ละรายการ ได้แก่ `cleared_input_tokens` และ `cleared_tool_uses`
  (รูปแบบ snake_case ดั้งเดิมของ Anthropic) โดยมี `clearedInputTokens` / `clearedToolUses` ในรูปแบบ camelCase เป็นค่าทดแทน
- คืนค่า `null` เมื่อไม่พบอาร์เรย์ `applied_edits` หรือไม่มีสิ่งใดถูกล้างจริง

โครงสร้างใบรับข้อมูลคือ `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`
การบันทึกเกิดขึ้นใน `open-sse/handlers/chatCore.ts` (จำกัดไว้ที่ `provider === "claude"`) ผ่าน
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) ซึ่งจะเขียนแถวข้อมูลวิเคราะห์การบีบอัด
พร้อมแท็ก:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = จำนวนโทเค็นอินพุตที่ถูกล้าง
- `request_id` ที่เติมส่วนต่อท้าย `::context-editing`

ดังนั้น การล้างที่มอบหมายให้ผู้ให้บริการดำเนินการจะแสดงในข้อมูลวิเคราะห์การบีบอัดร่วมกับเอนจินภายในระบบ
ภายใต้ป้ายกำกับเอนจิน `context-editing` และสามารถแยกออกจากการประหยัดของ RTK/Caveman/LLMLingua ได้

## ความสัมพันธ์กับเอนจินบีบอัดภายในเครื่อง

| แง่มุม                    | เอนจินภายในเครื่อง (Caveman / RTK / LLMLingua / stacked) | การแก้ไขบริบทแบบมอบหมาย                                               |
| ------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| ตำแหน่งที่ทำงาน           | ใน OmniRoute ก่อนที่คำขอจะออกจากพร็อกซี                  | ในผู้ให้บริการ (Claude) ทางฝั่งเซิร์ฟเวอร์                            |
| สิ่งที่แก้ไข              | ข้อความพรอมต์ / บริบท / ผลลัพธ์จากเครื่องมือ             | บล็อกการใช้เครื่องมือ / ผลลัพธ์จากเครื่องมือเก่า                      |
| ขอบเขตผู้ให้บริการ        | ผู้ให้บริการทั้งหมด                                      | เฉพาะ `claude` + `anthropic-compatible-cc-*`                          |
| ตัวสลับ                   | การตั้งค่าโหมดการบีบอัด                                  | `contextEditing.enabled`                                              |
| รูปแบบเมื่อเกิดข้อผิดพลาด | ปล่อยผ่านเมื่อเกิดข้อผิดพลาด (ใช้ข้อความต้นฉบับ)         | สำรองเมื่อเกิดข้อผิดพลาด 400: ตัดพารามิเตอร์ออก แล้วลองใหม่หนึ่งครั้ง |
| เทเลเมทรีการประหยัด       | `engine: <engine id>`                                    | `engine: "context-editing"`                                           |

ทั้งสองแนวทางทำงานเสริมกัน: เอนจินภายในเครื่องจะบีบอัดไบต์ที่ OmniRoute ส่ง ส่วนการแก้ไขบริบทช่วยให้
Claude ตัดทอนบริบทที่สะสมระหว่างรอบการสนทนาได้ โดยสามารถเปิดใช้งานทั้งสองพร้อมกันได้

## ดูเพิ่มเติม

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — รีจิสทรีเอนจินและเอนจินบีบอัด
  ภายในเครื่อง
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — การบีบอัดคำสั่ง/เอาต์พุตจากเครื่องมือ
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — การบีบอัดคำอธิบาย MCP และ
  การลดจำนวนเครื่องมือ
- ซอร์ส: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
