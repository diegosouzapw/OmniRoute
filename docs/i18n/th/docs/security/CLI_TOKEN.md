# CLI Machine-ID Token (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## ภาพรวม

คำสั่ง OmniRoute CLI จะยืนยันตัวตนกับ API การจัดการภายในเครื่องโดยใช้โทเค็น
`HMAC-SHA256(machine-id, salt)` ซึ่งส่งผ่านส่วนหัวคำขอ `x-omniroute-cli-token`

วิธีนี้ช่วยให้คำสั่งย่อยของ CLI (`omniroute status`, `omniroute providers` เป็นต้น)
สามารถเรียกใช้เอนด์พอยต์การจัดการได้โดยผู้ใช้ไม่จำเป็นต้องระบุ JWT หรือ
รหัสผ่านทุกครั้งที่เรียกใช้

## วิธีการทำงาน

1. `getMachineTokenSync()` อ่าน ID ฮาร์ดแวร์ของเครื่องผ่าน `node-machine-id`
   (หากล้มเหลวจะใช้สตริงว่างแทน ซึ่งเป็นการปิดใช้งานการยืนยันตัวตนของ CLI)
2. ฟังก์ชันจะคำนวณ `HMAC-SHA256(machine_id, salt)` และส่งคืนไดเจสต์เลขฐานสิบหก
   แบบเต็มความยาว 64 อักขระ ซึ่งเป็นโทเค็นแบบกำหนดค่าได้แน่นอน ย้อนกลับไม่ได้ และผูกกับเครื่องนี้
3. CLI จะส่งโทเค็นเป็น `x-omniroute-cli-token` เฉพาะเมื่อปลายทางที่ผ่านการระบุค่าแล้ว
   เป็น URL ลูปแบ็กที่ระบุอย่างชัดเจน (`localhost`, `127.0.0.0/8` หรือ
   IPv6 แบบลูปแบ็ก) คำขอที่มีโทเค็นจะใช้ `redirect: error` เพื่อไม่ให้การเปลี่ยนเส้นทาง
   ภายในเครื่องส่งต่อโทเค็นไปยังต้นทางอื่น บริบทระยะไกลจะใช้โทเค็นการเข้าถึง
   ที่จำกัดขอบเขตแทน หากไม่สามารถสร้างโทเค็นได้ CLI จะไม่ใส่ส่วนหัวดังกล่าว
   และ `omniroute doctor` จะรายงานความล้มเหลว แทนที่จะถือว่าโทเค็นว่าง
   เป็นโทเค็นที่ถูกต้อง
4. เซิร์ฟเวอร์ (`src/server/authz/policies/management.ts`) จะคำนวณโทเค็น
   ที่คาดไว้อีกครั้งโดยใช้ salt เดียวกัน และเปรียบเทียบผ่าน `timingSafeEqual`
   เพื่อป้องกันการดึงข้อมูลโทเค็นด้วยการวิเคราะห์เวลา

## คุณสมบัติด้านความปลอดภัย

| คุณสมบัติ                                   | รายละเอียด                                                                                                                                                                                                |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **เฉพาะลูปแบ็ก**                            | ยอมรับเฉพาะเมื่อข้อมูลระบุตำแหน่งของเพียร์ที่เชื่อถือได้ของเซิร์ฟเวอร์ (ซึ่งได้มาจากที่อยู่ TCP จริงของเพียร์) ระบุว่าเป็นลูปแบ็ก ส่วนหัว `Host` ที่ไคลเอนต์ควบคุมจะไม่ได้รับความเชื่อถือในการระบุตำแหน่ง |
| **การเปรียบเทียบแบบใช้เวลาคงที่**           | `crypto.timingSafeEqual` ป้องกันการโจมตีด้วยการวิเคราะห์เวลา                                                                                                                                              |
| **ย้อนกลับไม่ได้**                          | ไม่สามารถใช้เอาต์พุต HMAC เพื่อกู้คืน machine-id ได้                                                                                                                                                      |
| **ไม่สามารถข้ามการป้องกันแบบ `always` ได้** | `isAlwaysProtectedPath()` จะถูกประเมินก่อนตรวจสอบโทเค็น CLI โดย `/api/shutdown` และ `/api/settings/database` ต้องใช้ JWT เสมอ                                                                             |
| **ส่งออกไม่ได้**                            | โทเค็นจะไม่ถูกเขียนลงดิสก์หรือบันทึกในล็อก                                                                                                                                                                |

## salt เริ่มต้น (สุ่มแยกสำหรับแต่ละการติดตั้ง)

เมื่อไม่ได้ตั้งค่า `OMNIROUTE_CLI_SALT` ระบบจะใช้ salt ซึ่งเป็นสตริงเลขฐานสิบหก
แบบสุ่มความยาว 64 อักขระที่สร้างขึ้นเพียงครั้งเดียวและจัดเก็บถาวรไว้ที่
`<DATA_DIR>/cli-token-salt.json` (โหมด `0600`) ไม่ใช่ค่าลิเทอรัล
`omniroute-cli-auth-v1` ที่รวมอยู่ในซอร์สโค้ด ทั้ง `getActiveSalt()` ใน
`src/lib/machineToken.ts` และโค้ดคู่ขนานใน `bin/cli/utils/cliToken.mjs` จะอ่าน
ไฟล์เดียวกัน ดังนั้นเซิร์ฟเวอร์และการเรียกใช้ CLI ทุกครั้งในการติดตั้งนี้จะใช้
ค่าเดียวกัน ส่วนค่าลิเทอรัลที่รวมอยู่ในซอร์สโค้ดจะถูกใช้เป็นทางเลือกสุดท้ายเท่านั้น
เมื่อยังไม่สามารถใช้ salt ที่จัดเก็บถาวรหรือ salt จากตัวแปรสภาพแวดล้อมได้
(ตัวอย่างเช่น การติดตั้งใหม่ที่มีเฉพาะ CLI ก่อนที่เซิร์ฟเวอร์จะเคยทำงาน)
วิธีนี้แก้ไขจุดอ่อนของค่าเริ่มต้นแบบลิเทอรัลคงที่เดิม เนื่องจาก
`/etc/machine-id` มักเป็นไฟล์ที่ผู้ใช้ทุกคนอ่านได้ ดังนั้นหากไม่มีการแก้ไขนี้
ผู้ใช้ภายในเครื่องคนใดก็ตามอาจสร้างโทเค็นเดียวกันได้สำหรับทุกการติดตั้งที่ไม่เคยตั้งค่า
`OMNIROUTE_CLI_SALT`

## การหมุนเวียนค่า Salt

ตั้งค่า `OMNIROUTE_CLI_SALT` เพื่อหมุนเวียนโทเค็นที่คำนวณได้โดยไม่ต้องแก้ไขโค้ด — ค่านี้
จะมีลำดับความสำคัญเหนือค่า Salt ต่อการติดตั้งที่บันทึกไว้เสมอ หลังจากหมุนเวียนแล้ว โปรเซส CLI
ทั้งหมดบนเครื่องนี้จะใช้โทเค็นใหม่โดยอัตโนมัติ มีประโยชน์ในกรณีที่รายการโปรเซสรั่วไหล
ซึ่งอาจเปิดเผยค่าที่คำนวณไว้ก่อนหน้านี้

```bash
# การหมุนเวียนแบบถาวร (เพิ่มลงในโปรไฟล์เชลล์)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# ตรวจสอบว่ากำลังใช้โทเค็นใหม่
omniroute status
```

## รูปแบบเดิม (SHA-256, 32 อักขระ) — ยังคงรองรับ

ก่อนหน้ารูปแบบ HMAC ข้างต้น CLI จะคำนวณโทเค็นเป็น
`SHA-256(machineId + salt).hex[0..32]` (คำนำหน้าขนาด 32 อักขระ) ใน
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` ใน `src/lib/machineToken.ts`)

เพื่อให้เข้ากันได้กับเวอร์ชันก่อนหน้า เซิร์ฟเวอร์จึงรองรับ **ทั้งสอง** รูปแบบ: ตัวตรวจสอบจะสร้าง
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` และเปรียบเทียบ
เฮดเดอร์ขาเข้ากับแต่ละค่าด้วย `timingSafeEqual`
(`src/server/authz/policies/management.ts` และ `src/lib/middleware/cliTokenAuth.ts`)
ดังนั้น โทเค็นจะใช้ได้หากตรงกับ **อย่างใดอย่างหนึ่ง** ระหว่างไดเจสต์ HMAC ขนาด 64 อักขระ
หรือคำนำหน้า SHA-256 แบบเดิมขนาด 32 อักขระ

**การปิดใช้งาน:** ตั้งค่า `OMNIROUTE_DISABLE_CLI_TOKEN=true` (ผ่าน env หรือ `.env`) เพื่อปิดใช้งานกลไกโทเค็น CLI
ทั้งหมด จากนั้นการเข้าถึงทุกครั้งจะต้องใช้คีย์ API ที่ระบุอย่างชัดเจน สำหรับโฮสต์ที่มีผู้ใช้หลายคน
ขอแนะนำให้ตั้งค่านี้ เนื่องจาก `machine-id` เป็นค่าต่ออุปกรณ์ (ไม่ใช่ต่อผู้ใช้) และผู้ใช้อื่น
บนโฮสต์เดียวกันอาจคำนวณโทเค็นเดียวกันได้

## ไฟล์

| ไฟล์                                      | วัตถุประสงค์                              |
| ----------------------------------------- | ----------------------------------------- |
| `src/lib/machineToken.ts`                 | การคำนวณโทเค็น (`getMachineTokenSync`)    |
| `bin/cli/utils/cliToken.mjs`              | การคำนวณแบบเดียวกันในฝั่ง CLI             |
| `<DATA_DIR>/cli-token-salt.json`          | ค่า Salt แบบสุ่มต่อการติดตั้งที่บันทึกไว้ |
| `src/server/authz/headers.ts`             | ค่าคงที่ `CLI_TOKEN_HEADER`               |
| `src/server/authz/policies/management.ts` | การตรวจสอบฝั่งเซิร์ฟเวอร์                 |
| `src/server/authz/routeGuard.ts`          | การตรวจสอบโฮสต์ลูปแบ็ก (`isLoopbackHost`) |

## ดูเพิ่มเติม

- `docs/security/ROUTE_GUARD_TIERS.md` — ระดับการป้องกันเส้นทาง
- `docs/architecture/AUTHZ_GUIDE.md` — กระบวนการให้สิทธิ์ฉบับเต็ม
