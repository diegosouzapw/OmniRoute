# Developer environment notes (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

หน้านี้อธิบายลักษณะการทำงานของไฟล์ `.env` ภายในเครื่องของโปรเจกต์ รวมถึงวิธีจัดการไฟล์สภาพแวดล้อมและข้อมูลลับเมื่อพัฒนา OmniRoute

## ลักษณะการทำงานของ .env หลังการติดตั้ง

โปรเจกต์อาจสร้างไฟล์ `.env` ภายในเครื่องระหว่าง `npm install` / `postinstall` เพื่ออำนวยความสะดวกแก่นักพัฒนา ไฟล์นี้มีไว้สำหรับการพัฒนาและการทดสอบภายในเครื่องเท่านั้น และต้องไม่ถูก commit เข้าสู่ระบบควบคุมเวอร์ชันโดยเด็ดขาด

ประเด็นสำคัญ:

- ไฟล์ `.gitignore` ของ repository ได้กำหนดให้ละเว้นไฟล์ `.env*` อยู่แล้ว (ดูรายการใน `.gitignore`) อย่าลบหรือแก้ไขกฎดังกล่าว เว้นแต่คุณตั้งใจจะ commit ไฟล์ตัวอย่างเฉพาะอย่างชัดเจนและมีกระบวนการที่จัดทำเป็นเอกสารไว้สำหรับกรณีนั้น
- หากข้อมูลลับจริงถูก commit เข้า repository โดยไม่ตั้งใจ ให้หมุนเวียน/เพิกถอนข้อมูลรับรองนั้นทันที และลบออกจากประวัติของ repository (ตัวอย่างเช่น ใช้ `git filter-repo` หรือกระบวนการแก้ไขที่เทียบเท่า) โปรดติดต่อผู้รับผิดชอบด้านความปลอดภัย/ผู้ประสานงานหากต้องการความช่วยเหลือ
- สำหรับ CI และ production ให้ใช้ข้อมูลลับของ CI หรือระบบจัดการข้อมูลลับ (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault เป็นต้น) แทนการ commit ข้อมูลลับลงในไฟล์

## ขั้นตอนการทำงานภายในเครื่องที่แนะนำ

- เก็บ `.env` ไว้เฉพาะใน workspace ภายในเครื่องของคุณ ใช้ `.env.example` (ซึ่งมีการติดตามอยู่แล้ว) เพื่อบันทึกตัวแปรที่จำเป็นและค่าตัวอย่างที่ยอมรับได้
- เมื่อเรียกใช้การทดสอบภายในเครื่องที่ต้องใช้ค่าซึ่งมีลักษณะเป็นข้อมูลลับ ควรใช้ค่าจำลองหรือคีย์ชั่วคราวที่สร้างขึ้นขณะรัน แทนข้อมูลรับรองจริง
- เพิ่มความคิดเห็นสั้นๆ ในการทดสอบที่ใช้ค่าจำลอง เพื่อให้ผู้ตรวจสอบเข้าใจว่าฟิกซ์เจอร์ดังกล่าวเป็นข้อมูลสังเคราะห์

## หมายเหตุเกี่ยวกับเครื่องมือสแกน

- แอสเซ็ตที่คอมไพล์แล้วหรือเป็นไบนารีบางรายการ (เช่น บล็อบ WASM แบบ base64 ที่ฝังอยู่) อาจมีสตริงย่อย ASCII ที่ดูคล้ายข้อมูลรับรอง และอาจกระตุ้นให้เครื่องมือสแกนข้อมูลลับแบบข้อความแจ้งเตือน หากแอสเซ็ตเหล่านี้ถูกต้อง ให้เพิ่มแอสเซ็ตดังกล่าวไว้ในรายการอนุญาตของเครื่องมือสแกน หรือยกเว้นไดเรกทอรีที่เกี่ยวข้องในการกำหนดค่าของเครื่องมือสแกน

## หากคุณพบการรั่วไหล

1. หมุนเวียน/เพิกถอนคีย์ทันที
2. ลบข้อมูลลับออกจากประวัติ และบังคับ push branch ที่ล้างข้อมูลแล้ว หากจำเป็น
3. แจ้งผู้ดูแลและปฏิบัติตามรายการตรวจสอบการตอบสนองต่อเหตุการณ์ขององค์กรคุณ
