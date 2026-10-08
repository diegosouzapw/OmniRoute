# Management Authentication (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute มี**ชุดข้อมูลประจำตัวสี่ประเภท**ที่สามารถอนุญาตเส้นทางสำหรับการจัดการได้
ไม่สามารถใช้แทนกันได้ คีย์ API สำหรับการอนุมาน (`sk-…`) จะ**ไม่**สามารถจัดการ
เซิร์ฟเวอร์ได้ เว้นแต่จะได้รับสิทธิ์ `manage` หรือ `admin` อย่างชัดเจน

การใช้งานตามหลักการ: `src/lib/api/requireManagementAuth.ts`

| ข้อมูลประจำตัว                 | รูปแบบทั่วไป                       | สร้างขึ้นที่ไหน                                            | วัตถุประสงค์การใช้งาน          | ความสามารถในการจัดการ                                                                                     |
| :----------------------------- | :--------------------------------- | :--------------------------------------------------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------- |
| เซสชัน JWT ของแดชบอร์ด         | คุกกี้ `auth_token`                | การเข้าสู่ระบบแดชบอร์ด                                     | ส่วนติดต่อผู้ใช้ของเบราว์เซอร์ | การจัดการแดชบอร์ดเต็มรูปแบบ ภายใต้ข้อจำกัดของ CSRF, ตำแหน่งที่ตั้ง และกฎของเส้นทางที่ได้รับการป้องกันเสมอ |
| โทเค็น machine-id ของ CLI      | ภายใน / ภายในเครื่อง               | การบูตสแตรป CLI (`omniroute` บนเครื่องเดียวกัน)            | CLI ภายในเครื่อง               | การจัดการภายในเครื่องเท่านั้น                                                                             |
| โทเค็นการเข้าถึงแบบจำกัดขอบเขต | `oma_live_…`                       | **การตั้งค่า → โทเค็นการเข้าถึง** หรือ `omniroute connect` | CLI ระยะไกลและ API การจัดการ   | ต้องเป็นไปตามขอบเขต `read`, `write` หรือ `admin` ที่เส้นทางกำหนด                                          |
| คีย์ API สำหรับการอนุมาน       | `sk-…` (และคำนำหน้าคีย์ API อื่นๆ) | **ตัวจัดการ API / คีย์ API**                               | การอนุมาน `/v1/*`              | **ไม่มี** เว้นแต่ข้อมูลเมตาของคีย์จะรวม `manage` หรือ `admin`                                             |

ข้อมูลประจำตัว `oma_` เป็นข้อมูลประจำตัวสำหรับการจัดการ/CLI ไม่ใช่คีย์ API สำหรับการอนุมาน

หากการเข้าสู่ระบบ/การตรวจสอบสิทธิ์ด้วยคีย์ API ถูกปิดใช้งานสำหรับเซิร์ฟเวอร์ เส้นทางสำหรับการจัดการบางเส้นทางอาจยอมรับการเรียกที่ไม่ได้ตรวจสอบสิทธิ์ เส้นทางที่จำกัดเฉพาะภายในเครื่องและเส้นทางที่ได้รับการป้องกันเสมอจะยังคงใช้กฎของตนเอง ดังนั้น การแสดงข้อมูลประจำตัวเหล่านี้จึงไม่จำเป็นต้องบังคับใช้เสมอไป และการมีข้อมูลประจำตัวเหล่านี้ก็ไม่เพียงพอเสมอไปหากไม่มีขอบเขตที่จำเป็นและตำแหน่งที่ตั้งของเส้นทาง

ที่เกี่ยวข้อง: [โหมดระยะไกล](./REMOTE-MODE.md) (วิธีการสร้าง `oma_live_…` สำหรับ CLI ระยะไกล)

---

## เมทริกซ์สโคป

สโคปการจัดการคีย์ API และสโคปโทเค็นการเข้าถึงเป็นคำศัพท์ที่แตกต่างกัน สโคปเครื่องมือ MCP เป็นคำศัพท์ชุดที่สาม ซึ่งตรวจสอบด้วย `scopeMatches` แทนที่จะเป็นฟังก์ชันใดฟังก์ชันหนึ่งในตารางด้านล่าง เปรียบเทียบกัน: [สามเนมสเปซของสโคป](../frameworks/MCP-SERVER.md#three-scope-namespaces)

### สโคปโทเค็นการเข้าถึง (`oma_live_…`)

| สโคป    | การดำเนินการทั่วไป                                                                   |
| ------- | ------------------------------------------------------------------------------------ |
| `read`  | การเรียกใช้ GET เพื่อแสดงรายการ/สถานะที่โทเค็นได้รับอนุญาตให้เห็น                    |
| `write` | การเปลี่ยนแปลงข้อมูล (สร้าง/อัปเดต/ลบ) ที่ต่ำกว่าระดับผู้ดูแลระบบ                    |
| `admin` | CLI ระยะไกลเต็มรูปแบบ / โทเค็นเชื่อมต่อ (ค่าเริ่มต้นของการบูตด้วยรหัสผ่านอยู่ที่นี่) |

โทเค็นที่มี `read` ไม่สามารถเรียกใช้เส้นทาง `write` ได้ รูปแบบข้อความรันไทม์: `Access token scope '<have>' is insufficient; '<need>' required.`

### สโคปการจัดการคีย์ API

| สโคป     | ความหมาย                                                            |
| -------- | ------------------------------------------------------------------- |
| (none)   | การอนุมานเท่านั้น เส้นทางการจัดการจะคืนค่า 403                      |
| `manage` | API การจัดการ (เกตเวย์เดียวกับสาขาคีย์ API `requireManagementAuth`) |
| `admin`  | ยังตอบสนอง `hasManageScope` (ถือว่ามีความสามารถในการจัดการ)         |

เปิดใช้งาน `manage` บนคีย์ใน UI ของ API Keys / API Manager อย่าใช้คีย์ไคลเอนต์แชทซ้ำสำหรับการทำงานอัตโนมัติ เว้นแต่คุณจะให้สโคปนั้นโดยเจตนา

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

## ข้อผิดพลาดรันไทม์ปัจจุบัน (ห้ามแสดงข้อมูลลับ)

| สถานการณ์                                   | สถานะทั่วไป | ข้อความ (ที่ถูกกรองแล้ว)                                             |
| :------------------------------------------ | :---------- | :------------------------------------------------------------------- |
| ไม่มีข้อมูลรับรอง                           | 401         | `Authentication required`                                            |
| `oma_live_…` ไม่ถูกต้อง/หมดอายุ             | 401         | `Invalid or expired access token`                                    |
| API key ที่ถูกต้องแต่ไม่มี `manage`/`admin` | 403         | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| API key ทั่วไปไม่ถูกต้องบนเส้นทางจัดการ     | 403         | `Invalid management token`                                           |
| Access Token scope ต่ำเกินไป                | 403         | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" หมายความว่า bearer **ไม่**ได้รับการยอมรับว่าเป็นข้อมูลรับรองการจัดการ ซึ่ง**ไม่**ได้บอกคุณว่าควรสร้าง family ใด ใช้วงจรด้านบน: inference keys ต้องการ `manage` scope; remote CLI ต้องการ `oma_live_…`; แดชบอร์ดใช้ session cookie

---

## ตัวเลือกสิทธิ์ขั้นต่ำที่แนะนำ

| ผู้เรียกใช้                                     | การใช้งาน                                                 |
| :---------------------------------------------- | :-------------------------------------------------------- |
| เบราว์เซอร์                                     | เซสชันแดชบอร์ด                                            |
| CLI บนโฮสต์เซิร์ฟเวอร์                          | โทเค็นเครื่อง                                             |
| CLI บนแล็ปท็อปที่เชื่อมต่อกับเซิร์ฟเวอร์ระยะไกล | `oma_live_…` จาก `omniroute connect`                      |
| CI / สคริปต์ (สำหรับการจัดการเท่านั้น)          | `oma_live_…` ที่มีขอบเขตการทำงานที่เล็กที่สุด             |
| CI ที่ต้องเรียกใช้ทั้ง `/v1` และ `/api`         | คีย์ API ที่มีสิทธิ์ `manage` **หรือ** ข้อมูลรับรองสองชุด |
