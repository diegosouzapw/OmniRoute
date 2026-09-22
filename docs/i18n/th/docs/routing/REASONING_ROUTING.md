# Reasoning Routing (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

กฎการกำหนดเส้นทางการใช้เหตุผลเป็นส่วนขยายของการกำหนดเส้นทางโมเดลและ combo ที่มีอยู่ เมื่อไม่มีกฎที่ใช้งานอยู่ตรงกับเงื่อนไข
พฤติกรรมที่มีอยู่สำหรับ thinking, suffix, ค่าเริ่มต้นของ connection และการแปลงของ provider จะยังคง
ไม่เปลี่ยนแปลง

## การจัดการ

การจัดการกฎพร้อมใช้งานที่ **Settings → Global Routing** ตัวแก้ไข API key มี UI
การจัดการแบบเดียวกัน โดยกรองตามคีย์ที่เลือก

Management API เปิดให้ใช้งานผ่านเส้นทางต่อไปนี้:

- `GET` และ `POST` ที่ `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` และ `DELETE` ที่ `/api/settings/reasoning-routing-rules/[id]`
- `POST` ที่ `/api/settings/reasoning-routing-rules/simulate`

ทุกเส้นทางใช้ `requireManagementAuth` อินพุตจะได้รับการตรวจสอบด้วย schema ใน
`src/shared/validation/schemas/reasoningRouting.ts` ตัวจำลองจะไม่เรียกใช้งาน upstream

## การพิจารณากฎ

การประเมินในช่วงต้นจะเลือกกฎเพียงหนึ่งกฎเท่านั้น โดยจะตรวจสอบขอบเขตตามลำดับต่อไปนี้:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

ภายในขอบเขตเดียวกัน ค่า `priority` ที่สูงกว่าจะชนะก่อน ตามด้วยการจับคู่โมเดลแบบตรงทั้งหมดเหนือกว่ารูปแบบ glob
จากนั้นจึงใช้ลำดับ `createdAt` และ `id` ที่คงที่ `requestTags` จะอ่านจาก `metadata.tags`
เท่านั้น และรองรับการจับคู่แบบ `any` หรือ `all`

กฎ `connection` จะได้รับการประเมินก็ต่อเมื่อไม่มีกฎในช่วงต้นชนะ และมีการเลือก connection ของ provider
ที่แน่นอนแล้ว โดยกฎนี้สามารถเปลี่ยนได้เฉพาะ effort และ budget เท่านั้น

## Effort และ Budget

`sourceEffort` ยอมรับ `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` และ
`ultra` ค่า `missing` หมายความว่าคำขอไม่มีทั้ง effort แบบแยกระดับ, ตัวสลับ thinking
หรือ thinking budget ดังนั้นสัญญาณที่มีเฉพาะ budget จะจับคู่ได้ด้วย `any` เท่านั้น

`effortMode` มีสามรูปแบบ:

- `inherit` คง effort ของไคลเอนต์ไว้ ขณะที่ยังอนุญาตให้เปลี่ยนโมเดลหรือ combo ได้
- `default` ตั้งค่า `targetEffort` เฉพาะเมื่อไม่มีสัญญาณ reasoning ที่ระบุไว้อย่างชัดเจน
- `force` แทนที่ effort แบบแยกระดับด้วย `targetEffort`

นอกจากนี้ `budgetAction` ยังสามารถเป็น `preserve`, `remove` หรือ `set` ได้โดยเป็นอิสระจากกัน `force` ที่ใช้ร่วมกับ `none` จะลบ
ฟิลด์ effort และ budget ที่ระบบรู้จักทั้งหมด การใช้ `none` ร่วมกับ `set` ไม่ถูกต้อง

คำขอที่กำหนดเป้าหมายไปยังโมเดลที่ทราบว่าไม่เข้ากันจะถูกปฏิเสธก่อนเรียกใช้งาน upstream สำหรับเป้าหมายแบบ combo
รายการที่ไม่เข้ากันจะถูกนำออก หากไม่มีรายการเหลืออยู่ คำขอจะส่งคืนสถานะ `400`
ข้อมูลความสามารถที่ไม่ทราบแน่ชัดจะทำให้เกิดคำเตือนและยังคงเปิดใช้งานกฎไว้

## ความปลอดภัยและ Transport

โมเดลต้นทางและปลายทาง หรือ combo ต้นทางและปลายทาง ยังคงอยู่ภายใต้นโยบาย API key
ที่มีอยู่ กฎ reasoning จะไม่ขยายสิทธิ์ของโมเดล, combo หรือ quota

Engine ได้รับการผสานรวมเข้ากับ Chat Completions, Responses, Anthropic Messages และเส้นทาง
Codex WebSocket ภายใน เส้นทาง WebSocket ยอมรับเฉพาะโมเดลเป้าหมายของ Codex เท่านั้น ไม่สามารถ
ดำเนินการกับเป้าหมายแบบ combo ในเส้นทางนี้ได้ การตัดสินใจของกฎจะถูกจัดเก็บใน route trace ที่มีอยู่โดยไม่มีข้อมูลลับ

## การจัดเก็บถาวร

Migration `src/lib/db/migrations/126_reasoning_routing_rules.sql` จะสร้างตาราง
`reasoning_routing_rules` กฎจะอ้างอิง API key, combo และ provider connection ที่จัดเก็บไว้
การลบจะล้างกฎที่เกี่ยวข้อง ชั้นการเข้าถึงฐานข้อมูลใน
`src/lib/db/reasoningRoutingRules.ts` จะดูแลแคชที่สามารถทำให้ใช้งานไม่ได้สำหรับเส้นทางคำขอ

กฎจะรวมอยู่ในข้อมูลสำรอง SQLite, การส่งออกฐานข้อมูลทั้งหมด และ bundle ของ config-sync
`reconcileReasoningRulesForSync` จะปิดใช้งานกฎที่นำเข้าซึ่งไม่มีข้อมูลอ้างอิง และรายงาน
ข้อขัดแย้งเหล่านั้น
