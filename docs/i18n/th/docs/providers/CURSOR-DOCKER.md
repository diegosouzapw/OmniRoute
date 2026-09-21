# Cursor Provider in Docker Environments (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

เมื่อ OmniRoute ทำงานภายใน Docker ขั้นตอนแบบเดิมอย่าง **Import from Cursor IDE** /
`cursor-agent` จะล้มเหลว เนื่องจากคอนเทนเนอร์ไม่สามารถมองเห็นการติดตั้ง Cursor
บนโฮสต์ได้ ให้ใช้ **Login with Cursor** (deep-control PKCE) แทน

## เหตุผลที่การนำเข้าจาก IDE / CLI ล้มเหลวใน Docker

1. **การแยกระบบไฟล์** — การนำเข้าอัตโนมัติจะค้นหาพาธ Linux เช่น
   `~/.config/Cursor/User/globalStorage/state.vscdb` _ภายใน_ คอนเทนเนอร์
   สำหรับ Docker Desktop บน macOS ฐานข้อมูล IDE ของโฮสต์จะไม่ถูกเมานต์โดยค่าเริ่มต้น และ
   OS ของคอนเทนเนอร์คือ Linux แม้ว่าโฮสต์จะเป็น Darwin ก็ตาม
2. **ไม่มีไบนารี `cursor-agent`** — อิมเมจ OmniRoute อย่างเป็นทางการไม่มี
   `cursor-agent` ก่อนหน้านี้ Available Models จะเรียกใช้
   `cursor-agent --list-models` ผ่านเชลล์ และย้อนกลับไปใช้แค็ตตาล็อกแบบคงที่
3. **ไบนารีไม่ถูกต้อง** — **อย่า** bind-mount `cursor-agent` สำหรับ macOS เข้าไปในคอนเทนเนอร์
   Linux เนื่องจากจะไม่สามารถเรียกใช้งานได้

## วิธีที่แนะนำ: Login with Cursor

1. เปิด **Dashboard → Providers → Cursor**
2. เลือกแท็บ **Login with Cursor**
3. คลิก **Login with Cursor** — OmniRoute จะเปิด
   `https://cursor.com/loginDeepControl?…` ในเบราว์เซอร์บน **โฮสต์** ของคุณ
4. อนุมัติการเข้าสู่ระบบในเบราว์เซอร์ แล้วกลับไปยังแดชบอร์ด OmniRoute
   จะสำรวจ `api2.cursor.sh/auth/poll` จนกว่าจะได้รับโทเค็น
5. OmniRoute จะจัดเก็บทั้งโทเค็น **access + refresh** และรีเฟรชโทเค็นผ่าน
   `https://api2.cursor.sh/auth/exchange_user_api_key`

วิธีนี้ไม่จำเป็นต้องมี Cursor IDE หรือ `cursor-agent` ภายในคอนเทนเนอร์

## การค้นหาโมเดล

เมื่อมีการเชื่อมต่อที่เข้าสู่ระบบแล้ว **Available Models / Auto-Sync** จะเลือกใช้
แค็ตตาล็อก HTTP `AiService/AvailableModels` ของ Cursor ก่อน โดยใช้ bearer token
ของการเชื่อมต่อ หากไม่สำเร็จ OmniRoute จะยังคงลองใช้ `cursor-agent` ของโฮสต์
(หากมี) แล้วจึงใช้ข้อมูลเริ่มต้นจากรีจิสทรีแบบคงที่

OmniRoute จะแสดง **`auto`** ในแค็ตตาล็อกเสมอ (ชื่อที่แสดงคือ “Auto”) รวมถึง
โหมดเราเตอร์แบบ OpenCodex ได้แก่ **`auto-cost`**, **`auto-balance`** และ
**`auto-intelligence`** เมื่อส่งผ่านระบบ โหมดเหล่านี้จะแมปไปยังโมเดล `default`
ของ Cursor (พร้อม `optimization` ModelParameter สำหรับทั้งสามรูปแบบ) ควรเลือกใช้
`cu/auto` เมื่อโควตาการใช้งานโมเดลพรีเมียมหมด — Auto มักยังมีโควตาเหลืออยู่

### แค็ตตาล็อกแบบสดจะถูกใช้แต่เพียงอย่างเดียวเมื่อซิงค์แล้ว

หลังจากซิงค์โมเดล Cursor สำเร็จ (`cursor-agent --list-models` → แค็ตตาล็อกที่ซิงค์และบันทึกไว้
หรือการดึงข้อมูล `AvailableModels` ที่ยืนยันตัวตนด้วย bearer ตามที่กล่าวไว้ข้างต้น)
**dashboard**, **`/v1/models`** และ **Test All** จะแสดงรายการต่อไปนี้:

1. โมเดลที่ส่งกลับมาจากการซิงค์แบบสด
2. ID ของเราเตอร์อัตโนมัติที่เพิ่มเข้ามา: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. โมเดล **custom** ของผู้ดูแลระบบ (Import / manual) — จะไม่ถูกลบออกจากการซิงค์

รีจิสทรีแบบคงที่ขนาดใหญ่ภายใต้
`open-sse/config/providers/registry/cursor/` ใช้เป็น **ทางเลือกสำรองแบบออฟไลน์เท่านั้น** เมื่อ
รายการที่ซิงค์ว่างเปล่า (หรือการค้นหาล้มเหลว) การแสดงรายการจะย้อนกลับไปใช้รีจิสทรีดังกล่าว

ID ที่มีคำต่อท้ายระบุระดับ effort (ตัวอย่างเช่น `claude-4.6-sonnet-high`) ยังสามารถ
**ร้องขอ** ขณะรันไทม์ได้: `resolveRequestedModel` จะตัดคำต่อท้ายออกและแปลงเป็น
`ModelParameter` สำหรับส่งผ่านระบบ การแสดงรายการแบบเฉพาะเจาะจงจะจงใจซ่อนรูปแบบคงที่เหล่านั้น
จาก Test All เพื่อให้การตรวจสอบตรงกับโมเดลที่ Cursor ส่งกลับมาว่าพร้อมใช้งานจริง

### ตัวช่วย

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — การรวมรายการบนแดชบอร์ด
- `ensureCursorAutoCatalogEntry` — เพิ่ม auto* ระหว่างการค้นหาและการแสดงรายการ
- `shouldSuppressStaticModelForExclusiveListing` — ลูปแบบคงที่ของ `/v1/models`

## ขีดจำกัดของผู้ให้บริการ (โควตา)

**Usage → Provider Limits** สำหรับ Cursor ใช้ Bearer APIs บน `api2.cursor.sh`
(`GetCurrentPeriodUsage` → ข้อมูลสรุปการใช้งาน → auth/usage) หลังจาก PKCE หรือการนำเข้า
โทเค็น ขั้นตอนเดิมที่ใช้คุกกี้/แดชบอร์ด `cursor.com` ยังคงเป็นทางเลือกสุดท้าย
สำหรับเซสชันรุ่นเก่าที่นำเข้าจาก IDE

โดยทั่วไป หน้าต่างต่างๆ จะมี **Total**, **Auto + Composer** และ **API** หาก
ขีดจำกัดแสดงเป็นค่าว่าง ให้เรียกใช้ **Login with Cursor** อีกครั้งหรือนำเข้าโทเค็นใหม่ (ไม่จำเป็นต้อง
นำเข้าจาก IDE เพียงอย่างเดียวอีกต่อไป)

## เทิร์นว่างเปล่า / โควตาการใช้งานหมด

เมื่อ Cursor ยอมรับ Run แต่ไม่ส่งข้อความของผู้ช่วยกลับมา (มักเกิดขึ้นเมื่อ
โควตาการใช้งานพรีเมียมหมด) OmniRoute จะแสดงข้อผิดพลาด **429** ที่นำไปแก้ไขได้
(พร้อมข้อมูลบ่งชี้เกี่ยวกับโควตา) หรือ **502** พร้อมคำแนะนำ — แทนที่จะเป็นเพียงข้อความ
“Provider returned empty content” ความล้มเหลวในการสตรีม เช่น
`not_found: AI Model Not Found` (ช่วงโควตาการใช้งานหมดลง) จะถูกจัดประเภทเป็น
**Cursor rate limit / usage exceeded** และข้อความดังกล่าวจะยังคงอยู่ตลอดไปป์ไลน์ SSE
(ตัวป้องกันสตรีมว่างส่วนกลางจะไม่เขียนทับข้อผิดพลาดที่ส่งออกไปแล้ว) ตรวจสอบ Provider Limits,
ลองใช้โมเดล **`auto`** หรือเพิ่มขีดจำกัดของแพ็กเกจ Cursor

## เวอร์ชันไคลเอนต์ (headless)

หากไม่มีการติดตั้ง `cursor-agent` ในเครื่อง OmniRoute จะระบุ
`x-cursor-client-version` ผ่าน env `CURSOR_AGENT_CLI_VERSION` จากนั้นใช้ข้อมูลที่แคชไว้บนดิสก์
ซึ่งดึงมาจากสคริปต์ติดตั้ง Cursor แล้วจึงใช้ build id ที่ตรึงไว้ กำหนดค่าแทนด้วย
`CURSOR_AGENT_CLI_VERSION` เมื่อจำเป็น

## ทางเลือกสำรอง: การนำเข้าโทเค็นด้วยตนเอง

หากคุณไม่สามารถเข้าสู่ระบบผ่านเบราว์เซอร์ได้สำเร็จ:

1. บนโฮสต์ ให้แยกโทเค็นจาก `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. เปิด **Import token** ในหน้าต่างยืนยันตัวตนของ Cursor
3. วาง **Access Token** และ **Refresh Token** หากมี (จำเป็นสำหรับ
   การรีเฟรชอัตโนมัติ) Machine ID เป็นข้อมูลที่ไม่บังคับ

การนำเข้าเฉพาะ access token ยังคงใช้งานได้ แต่จะหมดอายุหากไม่มี refresh token —
ให้นำเข้าใหม่เมื่อแชตส่งคืนข้อผิดพลาดเกี่ยวกับการยืนยันตัวตน

## เนื้อหาที่เกี่ยวข้อง

- คำแนะนำสำหรับ Zed บน Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- เอกสารอ้างอิงการเข้าสู่ระบบ Cursor ของ OpenCodex (ภายนอก):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
