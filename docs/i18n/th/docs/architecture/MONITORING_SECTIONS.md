# Monitoring & Costs — Navigation Structure (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> นำไปใช้แล้วใน Group B (แผน 16) ดู `src/shared/constants/sidebarVisibility.ts`

---

## การนำทางระดับบนสุด

แถบด้านข้างของแดชบอร์ด (หลังจาก Group B) มีส่วนระดับบนสุดเรียงตามลำดับดังนี้:

```
หน้าแรก
ผู้ให้บริการ
คอมโบ
คีย์ API
การตั้งค่า
การวิเคราะห์
ค่าใช้จ่าย          ← ใหม่ (Group B, แผน 16)
การมอนิเตอร์        ← จัดระเบียบใหม่ (Group B, แผน 16)
...
```

---

## ส่วนค่าใช้จ่าย (ใหม่ ระดับ 1)

คำนำหน้าพาธ: `/dashboard/costs/`

| รายการ         | URL                                  | คำอธิบาย                                      |
| -------------- | ------------------------------------ | --------------------------------------------- |
| ภาพรวม         | `/dashboard/costs`                   | แดชบอร์ดค่าใช้จ่ายรวม (ย้ายมาจากการวิเคราะห์) |
| ราคา           | `/dashboard/costs/pricing`           | ตารางราคาต่อโมเดล                             |
| งบประมาณ       | `/dashboard/costs/budget`            | เกณฑ์งบประมาณ + การแจ้งเตือน                  |
| การแชร์โควตา   | `/dashboard/costs/quota-share`       | พูล Quota Share + การใช้งาน                   |
| การกำหนดค่าแผน | `/dashboard/costs/quota-share/plans` | การแทนที่แผนสำหรับผู้ให้บริการแต่ละราย        |

**เหตุผล**: ก่อนหน้านี้ ราคา งบประมาณ และการแชร์โควตาอยู่ภายใต้
`การมอนิเตอร์ > พารามิเตอร์ค่าใช้จ่าย` การย้ายรายการเหล่านี้ไปยังส่วนระดับบนสุดโดยเฉพาะ
ช่วยให้ค้นพบได้ง่ายโดยไม่ต้องนำทางผ่านเครื่องมือด้านความสามารถในการสังเกตการณ์

---

## ส่วนการมอนิเตอร์ (จัดระเบียบใหม่)

ขณะนี้ส่วนการมอนิเตอร์มี **กิจกรรมอยู่ด้านบนสุด** ตามด้วย **กลุ่มย่อย 3 กลุ่ม**:

```
การมอนิเตอร์
├── กิจกรรม              ← ฟีดไทม์ไลน์ (รายการระดับบนสุด)
├── กลุ่มบันทึก
│   ├── บันทึก (ทั้งหมด)
│   ├── บันทึกพร็อกซี
│   └── บันทึกคอนโซล
├── กลุ่มการตรวจสอบ
│   ├── บันทึกการตรวจสอบ
│   ├── การตรวจสอบ MCP
│   └── การตรวจสอบ A2A
└── กลุ่มระบบ
    ├── สถานะระบบ
    └── รันไทม์
```

### สิ่งที่เปลี่ยนแปลงจากโครงสร้างเดิม

| ก่อนหน้า                                                                                      | หลังจากเปลี่ยนแปลง                                |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| กิจกรรม = แท็บภายในบันทึกที่แสดงผลบันทึกการตรวจสอบ                                            | กิจกรรม = ฟีดเฉพาะ (`/dashboard/activity`)        |
| กลุ่มพารามิเตอร์ค่าใช้จ่ายในการมอนิเตอร์                                                      | ย้ายไปยังส่วนค่าใช้จ่าย                           |
| รายการแบบแบน: บันทึก, กิจกรรม (บันทึก), การตรวจสอบ, สถานะระบบ, รันไทม์, ราคา, งบประมาณ, โควตา | จัดโครงสร้างเป็น 3 กลุ่ม + ส่วนค่าใช้จ่ายโดยเฉพาะ |

---

## กิจกรรมเทียบกับบันทึกการตรวจสอบ

ขณะนี้ทั้งสองรายการแตกต่างกัน:

| มิติ                    | กิจกรรม (`/dashboard/activity`)                               | บันทึกการตรวจสอบ (`/dashboard/audit`)                |
| ----------------------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| **วัตถุประสงค์**        | ฟีดเหตุการณ์สำหรับผู้ใช้ ("เกิดอะไรขึ้นเมื่อเร็วๆ นี้")       | บันทึกด้านการปฏิบัติตามข้อกำหนด / ความปลอดภัย        |
| **แหล่งข้อมูล**         | `GET /api/compliance/audit-log?level=high`                    | `GET /api/compliance/audit-log?level=all`            |
| **รูปแบบ**              | ไทม์ไลน์ จัดกลุ่มตามวัน พร้อมคำกริยาและไอคอนที่อ่านเข้าใจง่าย | ตารางแบบหนาแน่นที่แบ่งหน้า หน้าแรก 50 รายการ         |
| **ตัวกรอง**             | หมวดหมู่ประเภทเหตุการณ์                                       | การดำเนินการ ระดับความรุนแรง ผู้ดำเนินการ ช่วงวันที่ |
| **การส่งออก**           | ไม่พร้อมใช้งาน                                                | ส่งออกเป็น JSON                                      |
| **ตัวกรองผู้ดำเนินการ** | ไม่เกี่ยวข้อง                                                 | กรองตามผู้ดำเนินการได้                               |
| **เหตุการณ์ที่แสดง**    | เฉพาะการดำเนินการระดับสูง (allowlist)                         | เหตุการณ์การตรวจสอบทั้งหมด                           |

### Allowlist ของการดำเนินการระดับสูง

กำหนดไว้ใน `src/lib/audit/highLevelActions.ts` โดยควบคุมว่าเหตุการณ์ใดจะปรากฏใน
ฟีดกิจกรรม Allowlist ประกอบด้วย:

- เหตุการณ์เพิ่ม/ลบ/ทดสอบผู้ให้บริการ
- การสร้าง/อัปเดต/ลบคอมโบ
- วงจรชีวิตของคีย์ API (สร้าง เพิกถอน หมุนเวียน)
- ถึงเกณฑ์งบประมาณ
- การเข้าสู่ระบบ/ออกจากระบบของการยืนยันตัวตน
- การสร้างเซสชัน Cloud Agent
- การลงทะเบียนเครื่องมือ MCP
- การสร้าง/ลบ Webhook
- การเปลี่ยนแปลงพูล/แผนโควตา (การดำเนินการ `quota.*`, Group B)
- เหตุการณ์ของแพลตฟอร์ม (อัปเดต ปรับใช้)
- การติดตั้ง/ลบสกิล

เหตุการณ์ที่ไม่อยู่ในรายการนี้จะปรากฏเฉพาะในบันทึกการตรวจสอบ

### การเพิ่มการดำเนินการระดับสูงใหม่

แก้ไข `src/lib/audit/highLevelActions.ts` และเพิ่มสตริงการดำเนินการลงใน
`HIGH_LEVEL_ACTIONS` การดำเนินการนี้ต้องใช้ PR (รายการดังกล่าวเป็นโค้ด ไม่สามารถกำหนดค่าผ่าน DB ได้)
สามารถเพิ่มไอคอนที่เกี่ยวข้องได้ใน `src/lib/audit/activityIcons.ts`

---

## การเปลี่ยนเส้นทาง: `/dashboard/logs/activity`

พาธเดิม `/dashboard/logs/activity` จะถูกเปลี่ยนเส้นทางอย่างถาวร (HTTP 308) ไปยัง
`/dashboard/activity` ผ่าน `permanentRedirect()` ใน
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`

ID เดิมของแถบด้านข้าง `logs-activity` ยังคงถูกเก็บไว้ใน `HIDEABLE_SIDEBAR_ITEM_IDS`
(แต่ถูกลบออกจาก `SIDEBAR_DEFINITIONS`) เพื่อหลีกเลี่ยงไม่ให้ค่าที่ตั้งไว้ล่วงหน้าของผู้ใช้ซึ่ง
อ้างอิง ID เดิมเกิดความเสียหาย

---

## i18n

Namespace ที่เพิ่มโดย Group B:

| คีย์ Namespace          | ครอบคลุม                                                        |
| ----------------------- | --------------------------------------------------------------- |
| `sidebar.costsSection`  | ป้ายกำกับส่วนค่าใช้จ่าย                                         |
| `sidebar.activity`      | รายการกิจกรรมในแถบด้านข้าง                                      |
| `sidebar.logsGroup`     | ป้ายกำกับกลุ่มย่อยบันทึก                                        |
| `sidebar.systemGroup`   | ป้ายกำกับกลุ่มย่อยระบบ                                          |
| `sidebar.costsOverview` | รายการภาพรวมค่าใช้จ่าย                                          |
| `activity.*`            | สตริงทั้งหมดในหน้ากิจกรรม (ชื่อ คำกริยา ตัวกรอง สถานะว่างเปล่า) |

โลเคลที่เป็นแหล่งข้อมูลหลัก: `pt-BR` และ `en` โลเคลอื่นๆ ทั้ง 40 รายการจะใช้
ภาษาอังกฤษเป็นภาษาสำรองผ่านกลไก fallback ของ `next-intl` (กำหนดค่าไว้ใน `src/i18n/config.ts`)
