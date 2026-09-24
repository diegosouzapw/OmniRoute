# Public Credentials Handling (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **แหล่งข้อมูลหลัก:** `open-sse/utils/publicCreds.ts`
> **การทดสอบ:** `tests/unit/publicCreds.test.ts`
> **อัปเดตล่าสุด:** 2026-08-07 — v3.8.50
> **กลุ่มเป้าหมาย:** วิศวกรที่ผสานรวมผู้ให้บริการซึ่งเผยแพร่ OAuth client_id / client_secret / Firebase Web API keys แบบสาธารณะไว้ใน CLI สาธารณะของตน
> **สถานะ:** **บังคับใช้** สำหรับโค้ดใหม่ทั้งหมดที่ฝังตัวระบุจากต้นทาง

## เหตุผลที่สิ่งนี้มีอยู่

- [OAuth 2.0 สำหรับแอปแบบเนทีฟ (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret สำหรับแอปที่ติดตั้งเป็นข้อมูลสาธารณะ โดย PKCE เป็นกลไกที่ให้ความปลอดภัยจริง
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — ตัวระบุ Web client เป็นข้อมูลสาธารณะโดยการออกแบบ

OmniRoute ต้องฝังค่าเหล่านี้ไว้เพื่อให้ผู้ใช้ที่ไม่ได้กำหนดค่า `.env` ยังสามารถใช้งานโฟลว์ OAuth ได้ทันที หากไม่มีค่า fallback ที่ฝังไว้ ผู้ให้บริการ Gemini / Antigravity จะหยุดทำงานสำหรับผู้ใช้ทุกคนที่ทำตามแนวทาง "เพียงโคลนแล้วรัน"

อย่างไรก็ตาม ค่าลิเทอรัลอย่าง `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` จะถูกตรวจพบโดย **GitHub Secret Scanning**, **Semgrep** และเครื่องมือสแกนรูปแบบที่คล้ายกัน ทุกรุ่นที่เผยแพร่จึงก่อให้เกิดผลบวกลวงจำนวนมาก การป้องกันการ push จะบล็อก commit ที่ถูกต้อง และผู้ดูแลระบบจะเลิกเชื่อถือฟีดการแจ้งเตือน

ตัวช่วย `open-sse/utils/publicCreds.ts` แก้ข้อจำกัดทั้งสองอย่างพร้อมกัน:

- ฝังตัวระบุสาธารณะเป็น **ลำดับไบต์ที่มาสก์ด้วย XOR** (ไม่มีรูปแบบที่เครื่องมือสแกนจะตรวจพบในซอร์ส)
- ถอดรหัสขณะรันผ่าน `decodePublicCred` / `resolvePublicCred`
- ตรวจหาค่าดิบที่ใช้คำนำหน้าซึ่งเป็นที่รู้จักอยู่แล้ว (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) และส่งผ่านค่าเหล่านั้นโดยไม่แก้ไข เพื่อให้ผู้ใช้ที่มีค่าดิบอยู่ใน `.env` เดิมยังคงใช้งานได้โดย **ไม่ต้องย้ายข้อมูลใดๆ**

นี่คือ **การทำให้อ่านยาก ไม่ใช่การเข้ารหัส** ทุกคนที่อ่านซอร์สสามารถกู้คืนค่าได้ ซึ่งไม่เป็นปัญหาเพราะค่านี้เป็นข้อมูลสาธารณะโดยการออกแบบ เป้าหมายเพียงอย่างเดียวคือหลีกเลี่ยงการตรงกับ regex ของเครื่องมือสแกน

## รูปแบบที่บังคับใช้

### 1. การเพิ่มข้อมูลรับรองสาธารณะใหม่

เมื่อคุณจำเป็นต้องฝังค่าใหม่ที่ผู้ให้บริการต้นทางจัดเตรียมให้ ซึ่ง:

- มาจาก CLI สาธารณะ / แอปเดสก์ท็อป / บันเดิลเบราว์เซอร์ **และ**
- ผู้ให้บริการต้นทางระบุไว้ในเอกสาร (หรือปฏิบัติต่อค่านั้น) ว่าเป็นตัวระบุไคลเอนต์สาธารณะ **และ**
- หากไม่ดำเนินการใดๆ เครื่องมือสแกนรูปแบบจะตรวจพบค่านั้น (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` เป็นต้น)

…ให้ทำตามรายการตรวจสอบนี้:

1. สร้างลำดับไบต์ที่มาสก์แล้ว:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. เพิ่มรายการใหม่ลงใน `EMBEDDED_DEFAULTS` ภายใน `open-sse/utils/publicCreds.ts` โดยใช้ **ชื่อคีย์ที่เป็นกลาง** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` เป็นต้น) **ห้าม** ใช้ชื่ออย่าง `client_secret` หรือ `api_key` ในตัวช่วย เพราะคำเหล่านั้นจะทริกเกอร์กฎ generic-secret ของ Semgrep

3. เพิ่ม `keyof typeof EMBEDDED_DEFAULTS` ลงใน public type union (ระบบจะอนุมานให้โดยอัตโนมัติ)

4. ในโค้ดของ consumer ให้แทนที่ค่าลิเทอรัลที่เขียนไว้ตายตัวด้วย:

   ```ts
   // การ override ด้วยตัวแปรสภาพแวดล้อมเดียว
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // alias ของตัวแปรสภาพแวดล้อมหลายรายการ (ใช้รายการแรกที่ไม่ว่าง)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // ไม่มีการ override ด้วยตัวแปรสภาพแวดล้อม (ใช้ค่าเริ่มต้นที่ฝังไว้เสมอ)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. นำค่าลิเทอรัลออกจาก `.env.example` (แทนที่ด้วยเอกสารแบบความคิดเห็นเท่านั้นที่ชี้ผู้อ่านมาที่นี่):

   ```dotenv
   # ── ผู้ให้บริการ (Google / Firebase / ฯลฯ) ──
   # ข้อมูลรับรอง OAuth สาธารณะถูกฝังไว้ในโค้ดผ่าน
   # open-sse/utils/publicCreds.ts กำหนดตัวแปรเหล่านี้เฉพาะเมื่อต้องการใช้ค่าของคุณเอง
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. อัปเดต `tests/unit/publicCreds.test.ts` เพื่อเพิ่มการตรวจสอบรูปร่างของคีย์ใหม่ (ตรวจสอบรูปแบบ ไม่ใช่ค่าลิเทอรัล — ดูรูปแบบจากการทดสอบที่มีอยู่)

7. **ห้าม** เพิ่มลิเทอรัล `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ลงในไฟล์ทดสอบ ใช้ค่าคงที่ `FAKE_*` ที่สร้างจากส่วนย่อยด้วย `.join("")` (ดูการทดสอบที่มีอยู่)

### 2. Consumers

- **อ่านค่าผ่าน `resolvePublicCred()` / `resolvePublicCredMulti()` เท่านั้น** — ห้ามเรียก `decodePublicCredBytes()` โดยตรงจากภายนอกตัวช่วย
- ตัวช่วยนี้ตั้งใจให้มีต้นทุนต่ำ (XOR ไบต์แบบเชิงเส้น) และปลอดภัยสำหรับการเรียกใช้ขณะโหลดโมดูล โดยค่าเริ่มต้นจะคำนวณเพียงครั้งเดียว
- ค่า override จากตัวแปรสภาพแวดล้อมมีสิทธิ์เหนือกว่าเสมอ หากผู้ใช้กำหนด `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` ตัวช่วยจะส่งผ่านค่าดิบนั้นโดยตรง

### 3. รูปแบบต้องห้าม

❌ **ห้าม** ทำสิ่งใดต่อไปนี้ในโค้ด production (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ไม่ดี: ค่าลิเทอรัลทริกเกอร์ Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ไม่ดี: base64 ของค่าลิเทอรัล — GitHub ยังคงตรวจพบตั้งแต่ Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ไม่ดี: การต่อสตริงที่ประกอบรูปแบบขึ้นใหม่ขณะรัน
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ไม่ดี: การเข้ารหัสแบบ hex/ROT13 — การทำให้อ่านยากคนละแบบ แต่มีความเสี่ยงต่อการตรวจพบเหมือนเดิม
clientSecret: hexDecode("474f4353..."),
```

วิธีเหล่านี้ล้วนทำให้เครื่องมือสแกนตรวจพบในท้ายที่สุด ให้ใช้ `resolvePublicCred()`

❌ **ห้าม** เพิ่มข้อมูลรับรองแบบลิเทอรัลลงใน `.env.example` ผู้ใช้ที่ต้องการค่าจริงจากต้นทางสามารถดึงค่าเหล่านั้นจาก CLI สาธารณะได้ด้วยตนเอง หรือใช้การลงทะเบียน OAuth ของตนเอง

❌ **ห้าม** ปิดการแจ้งเตือน secret-scanning ใหม่โดยไม่ตรวจสอบก่อนว่าควรย้ายข้อมูลรับรองนั้นไปไว้ในตัวช่วยนี้หรือไม่

## การควบคุมที่เกี่ยวข้อง

- `RAW_VALUE_PATTERN` ใน `publicCreds.ts` ระบุคำนำหน้าที่ทำให้มีการส่งผ่านค่าเดิม (เพื่อรองรับความเข้ากันได้ย้อนหลัง) ให้เพิ่มเฉพาะรูปแบบข้อมูลรับรองสาธารณะที่มีเอกสารกำกับเท่านั้น ห้ามเพิ่มรูปแบบของข้อมูลลับที่เป็นกรรมสิทธิ์
- `.env.example` ถูกตรวจสอบโดยสคริปต์ `check-env-doc-sync` ของ CI — เมื่อคุณลบตัวแปรออกจากไฟล์นี้ โปรดตรวจสอบให้แน่ใจว่าเอกสารได้รับการปรับให้ตรงกัน
- ชุดทดสอบ `npm run test:vitest` และ `node --import tsx/esm --test tests/unit/publicCreds.test.ts` ต้องผ่านทั้งหมดอยู่เสมอ

## เมื่อใดที่ไม่ควรใช้ตัวช่วยนี้

ตัวช่วยนี้ใช้ **เฉพาะ** กับข้อมูลรับรองที่:

1. เผยแพร่ต่อสาธารณะโดยผู้ให้บริการต้นทาง (ไบนารี CLI, บันเดิลสำหรับเบราว์เซอร์, เอกสารอย่างเป็นทางการ)
2. มีเอกสารระบุหรือสื่ออย่างชัดเจนว่าไม่ใช่ข้อมูลลับ (มี PKCE ป้องกัน, คีย์ Firebase Web หรือรูปแบบที่คล้ายกัน)

สำหรับกรณีอื่นทั้งหมด — โทเค็นที่ออกโดยผู้ดำเนินการ, ข้อมูลลับแยกตามผู้เช่า, `client_secret` ของแอป OAuth ของคุณเอง, คีย์เข้ารหัส, ข้อมูลลับ JWT, รหัสผ่านฐานข้อมูล — ให้ใช้ **ตัวแปรสภาพแวดล้อมเท่านั้น** (`process.env.FOO`, ใช้ `||` เพื่อย้อนกลับเป็นค่าว่าง / แสดงข้อผิดพลาดอย่างชัดเจน) ข้อมูลเหล่านี้ควรอยู่ใน `.env` และ[ที่จัดเก็บข้อมูลรับรองแบบเข้ารหัส](./COMPLIANCE.md) ไม่ใช่ในซอร์สโค้ด

## เอกสารอ้างอิง

- [Google: OAuth 2.0 สำหรับแอปแบบเนทีฟ](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: คีย์ API สำหรับการระบุไคลเอนต์](https://firebase.google.com/docs/projects/api-keys)
- [ข้อมูลลับที่ GitHub Secret Scanning รองรับ](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: การตรวจจับโทเค็นที่เข้ารหัสด้วย base64 (ก.พ. 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- คอมมิตที่เพิ่มตัวช่วยนี้: `1a39c31f` — _fix(security): ปกปิดข้อมูลรับรองสาธารณะจากต้นทาง + รวมศูนย์การล้างข้อมูลข้อผิดพลาด_
