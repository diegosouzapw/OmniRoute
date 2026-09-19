# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute มีระบบเลนภายในโปรเซสอยู่ **สอง** ระบบซึ่งมีขอบเขตแตกต่างกัน ทั้งสองระบบ
ทำงานเสริมกัน ผู้ดูแลระบบควรทราบว่ากำลังดูระบบใดอยู่

## 1. การควบคุมการรับเข้าระดับไบต์ทั่วทั้งโปรเซส (`chatBodyAdmission.ts`)

- **ขอบเขต:** เส้นทาง buffered-body/heap สำหรับ `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` และเส้นทางอื่นๆ ที่มีรูปแบบคล้ายแชต ป้องกัน
  การขยายการใช้ heap จาก body ขนาดใหญ่ของ coding agent (#4380)
- **คอนโทรลเลอร์ส่วนกลางหนึ่งตัวต่อโปรเซส ไม่ใช่เลนแยกตามคีย์ (#10110)** API key
  ทุกคีย์ (ที่ผ่านการแฮชแล้ว) หรือเซสชัน `anonymous` จะรับเข้าโดยอิงกับงบประมาณร่วม
  **เดียวกัน** — id เซสชันที่ผ่านการแฮชใช้เป็นคีย์สำหรับจัดตารางเวลาอย่างเป็นธรรมเท่านั้น
  (ส่งต่อแบบ round-robin ระหว่างผู้รอ) และไม่เคยใช้แบ่งความจุเป็นส่วนๆ เอกสารฉบับก่อนหน้า
  อธิบายเลนแยกตามคีย์ซึ่งมีความจุเป็นอิสระต่อกัน แต่โมเดลดังกล่าวถูกนำออกใน #10110
  เพราะทำให้ข้อมูลรับรองปลอมที่ไม่ผ่านการยืนยันตัวตนสามารถเพิ่มขีดจำกัดทั่วทั้งโปรเซส
  เป็นทวีคูณได้
- **เกต (#503-fanout): งบประมาณ BYTE สำหรับการรับข้อมูลที่คำนวณโดยอัตโนมัติ
  ไม่ใช่จำนวนคำขอคงที่** ขีดจำกัดจำนวนคำขอแบบเดิม `CHAT_MAX_HEAVY_IN_FLIGHT`
  (ค่าเริ่มต้น `1` ก่อนการแก้ไขนี้) ทำให้ fan-out ของ coding agent
  (subagent/CLI หลายตัว โดย body มักมีขนาด > 256 KB) ลดเหลือ concurrency
  ที่ใช้งานจริงประมาณ 1 ส่งผลให้เกิด 503 ภายใต้โหลดปกติโดยสมบูรณ์ ปัจจุบันขีดจำกัดนี้
  จะมีผลเฉพาะเมื่อผู้ดูแลระบบกำหนด `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`
  อย่างชัดเจนเท่านั้น หากไม่ได้กำหนด การรับเข้าจะถูกควบคุมด้วย
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` แทน — งบประมาณที่คำนวณโดยอัตโนมัติ
  จากเพดานหน่วยความจำจริงของโปรเซส (`src/shared/middleware/admissionBudget.ts`):
  25% ของค่าที่ต่ำกว่าระหว่างขีดจำกัด V8 heap กับขีดจำกัด cgroup/container ใดๆ
  หารด้วยตัวคูณการขยายชั่วคราว 8x และจำกัดให้อยู่ระหว่าง 8 MiB ถึง
  2 GiB ค่าที่กำหนดทับอย่างชัดเจนจะใช้ขอบเขตจำกัดเดียวกัน ระบบนี้ปรับขนาดตัวเอง
  ได้ตั้งแต่ container ขนาด 512 MB ไปจนถึงเดสก์ท็อปขนาด 32 GB
  โดยไม่ต้องปรับแต่ง env หาก body ไม่สามารถบรรจุอยู่ภายในงบประมาณที่มีผลได้
  ระบบจะปฏิเสธทันทีด้วย `413 body_exceeds_budget`; เฉพาะการแข่งขันกันระหว่าง
  body ที่แต่ละรายการสามารถให้บริการได้เท่านั้นที่จะเข้าสู่คิวแบบจำกัดซึ่งจัดสรร
  อย่างเป็นธรรม ตัวติดตามแรงกดดันต่อทรัพยากรแบบหลายสัญญาณที่ทำงานแบบเรียลไทม์
  (อัตราส่วน V8 heap, cgroup, PSI, เหตุการณ์ OOM —
  `open-sse/utils/resourcePressurePolicy.ts`) จะลดระยะเวลารอแบบจำกัดภายใต้
  แรงกดดันระดับ `high` และสลัดโหลดทันทีด้วย `503 resource_pressure`
  ภายใต้แรงกดดันระดับ `critical` ก่อนที่จะมีการรับข้อมูลแม้แต่ไบต์เดียว
- **การปรับแต่ง:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ค่าที่กำหนดทับงบประมาณไบต์ซึ่งคำนวณโดยอัตโนมัติ
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ขีดจำกัดจำนวนคำขอแบบเดิม เปิดใช้เมื่อเลือกใช้เท่านั้น
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — ระยะเวลารอในคิวก่อนตอบกลับ 503 (ค่าเริ่มต้น 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — วาล์ว heap สำหรับจำนวนไบต์ในคิว (ค่าเริ่มต้น 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — เลิกใช้งานแล้ว
    และไม่มีผลตั้งแต่ #10110 (ยังยอมรับเพื่อความเข้ากันได้ของการกำหนดค่า แต่จะถูกละเว้น)
- **รายงาน:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — รวมถึง
  รายการที่เพิ่มเข้ามาจาก #503-fanout ได้แก่ `inflightBytes`, `maxInflightBytes`,
  `budgetSource` (`v8_heap` | `cgroup` | `override`), `pressureSeverity` และ
  `countCapEnabled` (เป็น false ใน deployment เริ่มต้น — ยืนยันว่าเกตที่มีผลจริง
  คืองบประมาณไบต์ ไม่ใช่ขีดจำกัดจำนวนแบบเดิม)

## 2. เลนเสมือนแบบปรับตัวในขณะรันไทม์ (`open-sse/services/admission`)

- **ขอบเขต:** การควบคุมการรับเข้าด้วยคีย์ผู้เช่าสำหรับการส่งต่อไปยังผู้ให้บริการ — ต้นทุนคิว การปรับขีดจำกัดตามเวลาแฝง การจัดคิวตามเลน และเมตริกของเลน
- **เกต:** **ต้องเลือกเปิดใช้** ปิดใช้งานเว้นแต่กำหนด `OMNIROUTE_CHAT_VIRTUAL_LANES=true` หากไม่ได้เปิดใช้ ตัวควบคุมแบบปรับตัวยังคงใช้พฤติกรรมคิวร่วม (เกณฑ์ข้อ 1 ของ #9654 จะเป็นจริงก็ต่อเมื่อผู้ดำเนินการเปิดใช้เลนแล้วเท่านั้น)
- **การปรับแต่ง:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + การกำหนดค่าแบบปรับตัว (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)
- **รายงาน:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID เลนแบบทึบแสง ไม่ใช่คีย์ดิบโดยเด็ดขาด) และ `virtualLanes` — แฟล็กที่เชื่อถือได้ในสแนปช็อตสำหรับระบุว่า "เปิดใช้เลนแล้ว"

## 3. โพรบแบบกระจายออก — การควบคุมการรับเข้ารายเป้าหมายสำหรับ combo/fusion (#9654 Wave 2)

Combo (ลำดับความสำคัญ / วนรอบ) และ fusion กระจายออกไปยังเป้าหมายโมเดล N รายการภายใต้คำขอหลักหนึ่งรายการ นับตั้งแต่ #9654 Wave 2 เป็นต้นมา **เป้าหมายที่กระจายออกแต่ละรายการจะถูกควบคุมก่อนส่งต่อ** ด้วยโพรบรายเป้าหมาย (`PerTargetAdmissionHook` ซึ่งสร้างโดย `createPerTargetAdmissionHook`) โดยตรวจสอบกับเลนผู้เช่าของคำขอ **หลัก**

- **ขอบเขต:** เป้าหมายที่กระจายออกทุกรายการซึ่งส่งต่อโดย combo, fusion และกลไก chaos
  ระบบ 1 (ระดับไบต์) ไม่ได้รับผลกระทบ — ระบบนี้ไม่เคยตรวจสอบเป้าหมายที่กระจายออกด้วยโพรบ
- **เกต:** **ต้องเลือกเปิดใช้ร่วมกับระบบ 2** ไม่มีการดำเนินการเมื่อไม่ได้กำหนด `OMNIROUTE_CHAT_VIRTUAL_LANES` — ในโหมดดังกล่าว คำขอหลักถือสัญญาเช่าของคิวร่วมอยู่แล้ว ดังนั้นการใช้โพรบจะนับซ้ำและปฏิเสธเป้าหมายของ combo
- **ความหมายเชิงพฤติกรรม:**
  - **ไม่บล็อกโดยเด็ดขาด — ข้ามเสมอ ไม่มีการเข้าคิว** `maxWaitMs 0`: เลนที่เต็มจะทำให้ข้ามเป้าหมาย และใช้กลไกสำรองของ combo (หรือแผงผู้รอดของ fusion) แทน นี่เป็นพฤติกรรมที่ตั้งใจไว้ เนื่องจากเป้าหมายที่กระจายออกเป็นงานซ้ำซ้อน และการนำเข้าคิวจะเพิ่มภาระให้กับจุดติดขัดที่เลนถูกออกแบบมาเพื่อหยุดยั้งโดยตรง ดังนั้น `defaultMaxWaitMs` จึงใช้กับ **คำขอหลักเท่านั้น**; โพรบแบบกระจายออกจะไม่รอ และตั้งใจให้ **ไม่มีตัวเลือก** สำหรับทำให้โพรบเหล่านี้รอ (ประวัติของปัญหาแสดงให้เห็นว่าตัวเลือกการรอทำให้เกิดข้อผิดพลาด 502/504 จำนวนมาก ซึ่ง #9654 มีไว้เพื่อป้องกัน — ให้พิจารณาเรื่องนี้อีกครั้งเฉพาะเมื่อผู้ดำเนินการรายงานว่าการข้ามเป้าหมายที่กระจายออกส่งผลเสียต่อคุณภาพการตอบสนอง)
  - **ปล่อยเมื่อรับเข้า** โพรบที่ได้รับอนุญาตให้ผ่านจะปล่อยสัญญาเช่าทันที: โพรบนี้เป็นเกตควบคุมความจุ ไม่ใช่การยึดความจุไว้ สัญญาเช่าของคำขอหลักครอบคลุมการกระจายออกอยู่แล้ว การยึดเพิ่มอีก N รายการจะทำให้ต้นทุนที่กำลังใช้งานร่วมสูงเกินจริงและปฏิเสธผู้เช่ารายอื่น เป็นการดำเนินการแบบพยายามให้ดีที่สุด ไม่ใช่การจอง: เลนอาจเต็มขึ้นอีกครั้งระหว่างการตรวจสอบด้วยโพรบกับการส่งต่อ ดังนั้นภายใต้การแย่งใช้ทรัพยากรอย่างหนัก เกตอาจอนุญาตให้ส่งเข้าเลนที่กลับมาเต็มอีกครั้งก่อนถึงเวลาที่เป้าหมายถูกส่งต่อ
  - **กำหนดราคาจากเนื้อหาการกระจายออกจริง** โพรบจะประเมินต้นทุนจากเนื้อหาจริงของเป้าหมาย — รวมถึงคลาสของคำขอที่คำนวณจากแฟล็ก `stream` เช่นเดียวกับเส้นทางของคำขอหลักทุกประการ — ดังนั้นสมาชิกแผงของ fusion (`stream: false`) จึงถูกกำหนดราคาตามคลาสแบบไม่สตรีมที่สมาชิกเหล่านั้นจะใช้งานจริง ส่วนเป้าหมายแบบ priority/RR จะถูกกำหนดราคาตามสิ่งที่ผู้ใช้ร้องขอ
- **รายงาน:** การข้ามโดยโพรบหลังจากเป้าหมายแรกจะเพิ่ม `fallbackCount` รายคำขอของ combo (สอดคล้องกับความหมายของการสำรองที่มีอยู่ และมองเห็นได้ในบันทึกของ combo); fusion จะส่งคืน 503 เมื่อสมาชิกทุกตัวในแผงถูกข้าม ปัจจุบัน **ไม่มีตัวนับรวม** (เช่น `virtualFanoutSkipped`) ในสแนปช็อต — หากผู้ดำเนินการรายงานว่าไม่สามารถทราบได้ว่าเกตของเลนข้ามเป้าหมายที่กระจายออกบ่อยเพียงใด นั่นคือเงื่อนไขที่ควรใช้เป็นตัวกระตุ้นให้เพิ่มตัวนับดังกล่าว

## รายการใดที่กำลังแสดงอยู่ในแดชบอร์ด

- `adaptiveAdmission.laneCount` / `laneTenants` → **เลนเสมือนแบบปรับตัวได้** (ระบบ 2)
- `adaptiveAdmission.virtualLanes === true` → โพรบแบบ fan-out ในส่วนที่ 3
  ทำงานอยู่ด้วย เพย์โหลดที่ไม่มี `virtualLanes` หรือมีค่าเป็น `false` หมายความว่า
  `OMNIROUTE_CHAT_VIRTUAL_LANES` ยังไม่ได้ตั้งค่า — เลนระดับไบต์ (ระบบ 1)
  ยังคงทำงานอยู่ แต่สิ่งใดก็ตามภายใต้ `adaptiveAdmission` (รวมถึงการควบคุมแบบ fan-out)
  จะยังไม่มีผลจนกว่าจะเปิดใช้งาน

## เหตุผลที่มีทั้งสองระบบ

เลนระดับไบต์จำกัดเส้นทางการแยกวิเคราะห์/บีบอัดที่ใช้หน่วยความจำสูง ส่วนเลนแบบปรับตัวได้
จำกัดต้นทุนการจัดส่งต่อผู้เช่า เกณฑ์ข้อ 1 ของ #9654 ("คำขอจำนวนมากแบบฉับพลันจากเซสชันหนึ่งต้องไม่ทำให้อีกเซสชันได้รับ 503")
ถูกบังคับใช้โดยระบบ 1 โดยไม่มีเงื่อนไข และโดยระบบ 2 เมื่อเปิดใช้งานแบบเลือกเข้าร่วมแล้ว

## 4. `/v1/responses` แบบใช้เวลานานในกระบวนการเดียว (พื้นที่สำรองเมื่อระบบยังแข็งแรง)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) เพิ่ม
`tryAcquireHealthyHeadroom` เพื่ออนุญาตคำขอที่สองซึ่งมีโครงสร้างซับซ้อน
เมื่อฮีปต่ำกว่า `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` เส้นทาง BYTE
ที่ `admitChatRequest` ใช้ (บอดี ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`
ค่าเริ่มต้น 256 KiB รวมถึง `POST /v1/responses`) ใช้ช่องทางผ่อนผัน**เดียวกัน**

นี่คือแนวทางที่รองรับสำหรับ**กระบวนการเดียว** เพื่อให้มี SSE `/v1/responses`
แบบใช้เวลานานพร้อมกันได้มากกว่าสองรายการ: เพิ่มขีดจำกัดหลัก + พื้นที่สำรองเมื่อระบบยังแข็งแรง
เท่าที่ฮีปและงบประมาณไบต์ที่กำลังประมวลผลของทั้งกระบวนการ
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) จะรองรับได้ ไคลเอนต์ SSE
แบบใช้เวลานานจำนวนหลายสิบรายการ (40–50 รายการ) เป็นเรื่องของงบประมาณหน่วยความจำดังกล่าว
ไม่ใช่ข้อจำกัดผลิตภัณฑ์แบบตายตัวที่ “สูงสุด 2” ฮีปที่อยู่ภายใต้แรงกดดันยังคงปฏิเสธคำขอ
ด้วย `503` ที่ลองใหม่ได้ เพื่อไม่ให้ #7849 กลับมาเกิดขึ้นอีก

หากต้องการ**เพิ่มจำนวนฮีปแบบทวีคูณ** ให้เรียกใช้ `DATA_DIR` อิสระจำนวน N ชุด (#11024)
ห้ามใช้ `replicas > 1` กับไฟล์ SQLite ไฟล์เดียว (#10350) โดยเด็ดขาด ส่วนนี้ไม่ใช่
การนำแนวทางการขยายระบบด้วย DATA_DIR กลับมาเปิดประเด็นใหม่อีกครั้ง
