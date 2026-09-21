# Management Authentication (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute มี **ข้อมูลประจำตัวสี่ตระกูล** ที่สามารถอนุญาตการเข้าถึงเส้นทางการจัดการได้
ข้อมูลประจำตัวเหล่านี้ใช้แทนกันไม่ได้ คีย์ Inference API (`sk-…`) จะ **ไม่** สามารถจัดการ
เซิร์ฟเวอร์ได้ เว้นแต่จะได้รับขอบเขต `manage` หรือ `admin` อย่างชัดเจน

อิมพลีเมนเทชันมาตรฐาน: `src/lib/api/requireManagementAuth.ts`

| ข้อมูลประจำตัว              | รูปแบบทั่วไป                       | สร้างจากที่ใด                                          | วัตถุประสงค์การใช้งาน         | ความสามารถด้านการจัดการ                                                                               |
| --------------------------- | ---------------------------------- | ------------------------------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| เซสชัน JWT ของแดชบอร์ด      | คุกกี้ `auth_token`                | การเข้าสู่ระบบแดชบอร์ด                                 | UI บนเบราว์เซอร์              | จัดการแดชบอร์ดได้เต็มรูปแบบ โดยอยู่ภายใต้กฎของ CSRF, ตำแหน่งที่ตั้ง และเส้นทางที่ได้รับการป้องกันเสมอ |
| โทเค็น machine-id ของ CLI   | ภายใน / ในเครื่อง                  | การบูตสแตรป CLI (`omniroute` บนเครื่องเดียวกัน)        | CLI ในเครื่อง                 | จัดการได้เฉพาะในเครื่อง                                                                               |
| Access Token แบบกำหนดขอบเขต | `oma_live_…`                       | **การตั้งค่า → Access Token** หรือ `omniroute connect` | CLI ระยะไกลและ Management API | ต้องเป็นไปตามขอบเขต `read`, `write` หรือ `admin` ที่เส้นทางกำหนด                                      |
| คีย์ Inference API          | `sk-…` (และคำนำหน้าคีย์ API อื่นๆ) | **ตัวจัดการ API / คีย์ API**                           | การอนุมานผ่าน `/v1/*`         | **ไม่มี** เว้นแต่ข้อมูลเมตาของคีย์จะมี `manage` หรือ `admin`                                          |

ข้อมูลประจำตัว `oma_` เป็นข้อมูลประจำตัวสำหรับการจัดการ/CLI ซึ่ง **ไม่ใช่** คีย์ Inference API

หากปิดใช้งานการยืนยันตัวตนด้วยการเข้าสู่ระบบ/คีย์ API สำหรับเซิร์ฟเวอร์ เส้นทางการจัดการบางเส้นทางอาจ
ยอมรับการเรียกโดยไม่ต้องยืนยันตัวตน อย่างไรก็ตาม เส้นทางที่จำกัดให้ใช้เฉพาะในเครื่องและเส้นทางที่ได้รับการป้องกันเสมอ
ยังคงใช้กฎของตนเอง ดังนั้น การแสดงข้อมูลประจำตัวอย่างใดอย่างหนึ่งเหล่านี้จึงไม่ใช่
ข้อบังคับสำหรับทุกกรณี และการมีข้อมูลประจำตัวดังกล่าวก็ไม่ได้หมายความว่าจะเพียงพอเสมอไป หากไม่มี
ขอบเขตที่จำเป็นและไม่ได้อยู่ในตำแหน่งที่เส้นทางอนุญาต

เนื้อหาที่เกี่ยวข้อง: [โหมดระยะไกล](./REMOTE-MODE.md) (วิธีออก `oma_live_…` สำหรับ CLI ระยะไกล)

---

## ตารางขอบเขต

ชุดคำศัพท์เกี่ยวกับขอบเขตสองชุดนี้ **แตกต่างกัน** โปรดอย่านำมาปะปนกัน

### ขอบเขตของ Access Token (`oma_live_…`)

| ขอบเขต  | การดำเนินการทั่วไป                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| `read`  | คำขอ GET สำหรับดูรายการ/สถานะที่โทเค็นได้รับอนุญาตให้ดู                                                    |
| `write` | การเปลี่ยนแปลงข้อมูล (สร้าง/อัปเดต/ลบ) ที่ต่ำกว่าระดับผู้ดูแลระบบ                                          |
| `admin` | CLI ระยะไกลแบบเต็มรูปแบบ / โทเค็นสำหรับการเชื่อมต่อ (การบูตสแตรปด้วยรหัสผ่านจะใช้ขอบเขตนี้เป็นค่าเริ่มต้น) |

โทเค็นที่มีขอบเขต `read` ไม่สามารถเรียกเส้นทาง `write` ได้ รูปแบบข้อความขณะรันไทม์:
`Access token scope '<have>' is insufficient; '<need>' required.`

### ขอบเขตการจัดการของคีย์ API

| ขอบเขต   | ความหมาย                                                                |
| -------- | ----------------------------------------------------------------------- |
| (ไม่มี)  | ใช้สำหรับการอนุมานเท่านั้น เส้นทางการจัดการจะส่งคืน 403                 |
| `manage` | Management API (ใช้เกตเดียวกับสาขาคีย์ API ของ `requireManagementAuth`) |
| `admin`  | เป็นไปตามเงื่อนไขของ `hasManageScope` ด้วย (ถือว่าสามารถจัดการได้)      |

เปิดใช้งาน `manage` สำหรับคีย์ใน UI ของคีย์ API / ตัวจัดการ API อย่านำคีย์ของ
ไคลเอนต์แชตมาใช้ซ้ำสำหรับงานอัตโนมัติ เว้นแต่คุณจะจงใจกำหนดขอบเขตดังกล่าวให้คีย์นั้น

---

## วิธีสร้างและเพิกถอน

### เซสชัน JWT ของแดชบอร์ด

1. เปิด `/login` แล้วเข้าสู่ระบบด้วยรหัสผ่านสำหรับการจัดการ (`INITIAL_PASSWORD` ในการบูตครั้งแรก)
2. คุกกี้ `auth_token` เป็น HttpOnly แดชบอร์ดบนเบราว์เซอร์จะใช้คุกกี้นี้โดยอัตโนมัติ
3. ออกจากระบบผ่าน `/api/auth/logout` ไม่มีข้อมูลลับระยะยาวให้คัดลอก

### โทเค็น machine-id ของ CLI

1. เรียกใช้ `omniroute` บน **โฮสต์เดียวกัน** กับเซิร์ฟเวอร์ (ลูปแบ็ก)
2. CLI จะบูตสแตรปโทเค็น machine-id ไว้ภายใต้ `~/.omniroute/` (chmod 600)
3. วิธีนี้ **ไม่** สามารถใช้จากเครื่องอื่นได้ ให้ใช้ Access Token สำหรับ CLI ระยะไกล

### Access Token แบบกำหนดขอบเขต (`oma_live_…`)

1. แดชบอร์ด: **การตั้งค่า → Access Token** → สร้าง (ชื่อ + ขอบเขต) **ข้อมูลลับจะแสดงเพียงครั้งเดียว**
2. หรือใช้ CLI: `omniroute connect <host>` (รหัสผ่าน → โทเค็น) ดู[โหมดระยะไกล](./REMOTE-MODE.md)
3. ส่วนหัว: `Authorization: Bearer oma_live_…`
4. เพิกถอนจากหน้า Access Token เดียวกัน (หรือลบบริบท CLI)
5. เซิร์ฟเวอร์จัดเก็บเฉพาะแฮช ให้ปฏิบัติต่อข้อความธรรมดาของข้อมูลลับเสมือนเป็นรหัสผ่าน

### คีย์ API ที่มีขอบเขตการจัดการ

1. แดชบอร์ด: **ตัวจัดการ API / คีย์ API** → สร้างหรือแก้ไขคีย์ → เปิดใช้งาน `manage` (หรือ `admin`)
2. ส่วนหัว: `Authorization: Bearer sk-…` (คำนำหน้าจริงของคีย์)
3. เพิกถอนหรือนำ `manage` ออกใน UI เดียวกัน
4. สำหรับงานอัตโนมัติที่ไม่ใช่ CLI ให้ใช้สิทธิ์เท่าที่จำเป็น: เลือกใช้ Access Token ขอบเขต `read` สำหรับงานที่ใช้เฉพาะ GET และใช้ `manage` กับคีย์ API เฉพาะเมื่อผู้เรียกจำเป็นต้องสื่อสารกับทั้ง `/v1` และระบบการจัดการ

---

## รูปแบบส่วนหัว

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

ห้ามใส่ข้อมูลรับรองสำหรับการจัดการไว้ในพาธ URL หรือสตริงคิวรี การยืนยันตัวตนสำหรับการจัดการใช้ได้ผ่านส่วนหัว/คุกกี้เท่านั้น

---

## ตัวอย่างพร้อมคัดลอกไปใช้

อ่านอย่างเดียว (แสดงรายการผู้ให้บริการ) ใช้ Access Token ที่มีสิทธิ์ `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

การแก้ไข (สร้างการเชื่อมต่อกับผู้ให้บริการ) ใช้ Access Token ที่มีสิทธิ์ `write`/`admin` หรือ API key ที่มีขอบเขต `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

การอนุมาน (ไม่ใช่การจัดการ) ใช้ API key ทั่วไป โดยไม่จำเป็นต้องมี `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## ข้อผิดพลาดรันไทม์ปัจจุบัน (ห้ามแสดงข้อมูลลับซ้ำ)

| สถานการณ์                                  | สถานะที่พบบ่อย | ข้อความ (ลบข้อมูลละเอียดอ่อนแล้ว)                                    |
| ------------------------------------------ | -------------- | -------------------------------------------------------------------- |
| ไม่มีข้อมูลรับรอง                          | 401            | `Authentication required`                                            |
| `oma_live_…` ไม่ถูกต้อง/หมดอายุ            | 401            | `Invalid or expired access token`                                    |
| API key ถูกต้องแต่ไม่มี `manage`/`admin`   | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| API key ทั่วไปไม่ถูกต้องบนเส้นทางการจัดการ | 403            | `Invalid management token`                                           |
| ขอบเขตของ Access Token ต่ำเกินไป           | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" หมายความว่า bearer **ไม่ได้** รับการยอมรับเป็นข้อมูลรับรองสำหรับการจัดการ ข้อความนี้ **ไม่ได้** ระบุว่าคุณควรสร้างข้อมูลรับรองประเภทใด โปรดใช้ตารางด้านบน: คีย์สำหรับการอนุมานต้องมีขอบเขต `manage`; CLI ระยะไกลต้องใช้ `oma_live_…`; แดชบอร์ดใช้คุกกี้เซสชัน

---

## ตัวเลือกที่แนะนำตามหลักสิทธิ์ขั้นต่ำ

| ผู้เรียกใช้                                     | ใช้                                                |
| ----------------------------------------------- | -------------------------------------------------- |
| เบราว์เซอร์                                     | เซสชันแดชบอร์ด                                     |
| CLI บนโฮสต์เซิร์ฟเวอร์                          | โทเค็นของเครื่อง                                   |
| CLI บนแล็ปท็อปที่เชื่อมต่อกับเซิร์ฟเวอร์ระยะไกล | `oma_live_…` จาก `omniroute connect`               |
| CI / สคริปต์ (เฉพาะการจัดการ)                   | `oma_live_…` ที่มีขอบเขตน้อยที่สุดเท่าที่ใช้งานได้ |
| CI ที่ต้องเรียกใช้ทั้ง `/v1` และ `/api`         | API key ที่มี `manage` **หรือ** ข้อมูลรับรองสองชุด |
