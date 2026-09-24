# CORS Configuration & Security (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ควบคุมว่า **origin ของเบราว์เซอร์** ใดบ้างที่สามารถอ่านการตอบกลับแบบข้าม origin
ผ่านรายการอนุญาตที่รวมศูนย์ไว้เพียงรายการเดียว โมเดลนี้ **ปฏิเสธโดยค่าเริ่มต้น (fail-closed)**:
ไม่มี origin ใดได้รับอนุญาตจนกว่าคุณจะเพิ่มเข้าไป หน้านี้อธิบายวิธีการพิจารณารายการอนุญาต
สิ่งที่ `CORS_ALLOW_ALL=true` เปิดเผยจริง (และที่สำคัญคือ สิ่งที่
**ไม่ได้** เปิดเผย) วิธีตั้งค่าสภาพแวดล้อมสำหรับการพัฒนาและ production อย่างปลอดภัย และคำเตือนขณะรันไทม์
ที่แดชบอร์ดแสดงเมื่อมีการใช้งาน wildcard

**แหล่งข้อมูลอ้างอิงหลัก:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`) รายการอนุญาตจะถูกนำไปใช้เพียงครั้งเดียวใน
middleware (`src/server/authz/pipeline.ts`) — handler ของแต่ละ route จะไม่ตั้งค่า
`Access-Control-Allow-Origin` ด้วยตัวเอง

## วิธีพิจารณา origin

สำหรับแต่ละคำขอ middleware จะคำนวณค่า `Access-Control-Allow-Origin`
ตามลำดับดังนี้:

1. **`CORS_ALLOW_ALL=true`** (หรือ `CORS_ORIGIN=*` แบบเดิม) → ส่งค่า `Origin`
   ของผู้เรียกกลับไป (หรือ `*` เมื่อไม่มีส่วนหัว `Origin`) พร้อมกับ `Vary: Origin`
   เพื่อให้แคชทำงานอย่างถูกต้อง จุดควบคุมรวม `applyCorsHeaders()` เดียวกันนี้ยังเพิ่ม
   `Vary: Accept-Encoding` ให้กับทุกการตอบกลับสถานะ 2xx ที่มี body บนพื้นผิว
   `/v1*`/`/v1beta*` ซึ่งยืนยันตัวตนด้วย token (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737)
   เพื่อให้แคชปลายทาง/แคชที่ใช้ร่วมกันสามารถแยกแยะ variant ที่บีบอัดกับไม่ได้บีบอัด
   ได้อย่างถูกต้อง
2. มิฉะนั้น `Origin` ของคำขอจะถูกปรับให้อยู่ในรูปแบบมาตรฐาน (เปลี่ยนเป็นตัวพิมพ์เล็กและ
   ตัดเครื่องหมายทับท้ายออก) แล้วนำไปตรวจสอบกับ **รายการอนุญาตที่รวมกัน**:
   - env **`CORS_ALLOWED_ORIGINS`** — รายการที่คั่นด้วยเครื่องหมายจุลภาค และ
   - การตั้งค่ารันไทม์ **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_) ซึ่งถูกส่งเข้ามาผ่าน `setRuntimeAllowedOrigins()` จาก
     `src/lib/config/runtimeSettings.ts`
3. ไม่ตรงกับรายการใด → **จะไม่มีการส่งส่วนหัว `Access-Control-Allow-Origin`** เบราว์เซอร์
   จะบล็อกการอ่านแบบข้าม origin นี่คือพฤติกรรมปฏิเสธโดยค่าเริ่มต้นตามที่ตั้งใจไว้

| ตัวแปร env             | ความหมาย                                                                         |
| ---------------------- | -------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ของ origin แบบตรงกันทุกประการที่ต้องการอนุญาต (แนะนำ)                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → ส่ง origin ใด ๆ กลับไป (wildcard) สำหรับการพัฒนาเท่านั้น            |
| `CORS_ORIGIN`          | แบบเดิม `*` ทำงานเหมือน `CORS_ALLOW_ALL`; ค่าเดียวจะถูกเพิ่มเข้าไปในรายการอนุญาต |

## โมเดลภัยคุกคาม — สิ่งที่ `CORS_ALLOW_ALL=true` เปิดเผยจริง

คำเตือนทั่วไปของ OWASP ("wildcard CORS = เว็บไซต์ใด ๆ ก็เรียก API ของคุณได้") เป็นสิ่งที่
ควรให้ความสำคัญ แต่ขอบเขตการเปิดเผยของ OmniRoute **แคบกว่ากรณีทั่วไป**
เนื่องจากข้อเท็จจริงเฉพาะประการหนึ่งของการนำไปใช้:

> **`applyCorsHeaders()` ส่วนกลางจะไม่ส่ง
> `Access-Control-Allow-Credentials` ออกมา** เบราว์เซอร์จะไม่เปิดให้เข้าถึงการตอบกลับข้าม origin
> _ที่มีข้อมูลรับรอง_ (มี cookie แนบมาด้วย) เว้นแต่เซิร์ฟเวอร์จะส่ง
> `Access-Control-Allow-Credentials: true` เส้นทาง CORS ที่ใช้ร่วมกันของ OmniRoute จะไม่
> ทำเช่นนั้น

สิ่งนี้มีความหมายต่อแต่ละพื้นผิวดังต่อไปนี้ แม้จะใช้ `CORS_ALLOW_ALL=true`:

| พื้นผิว                                   | กลไกการยืนยันตัวตน           | ผลของ wildcard CORS                                                                                                                                                                                                                                  |
| ----------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`           | เซสชัน cookie                | origin จะถูกส่งกลับ แต่เมื่อ **ไม่มี `Allow-Credentials`** เบราว์เซอร์จะ **บล็อก** การอ่านที่มีข้อมูลรับรอง เว็บไซต์ข้าม origin ที่เป็นอันตราย **ไม่สามารถอ่าน** การตอบกลับจากแดชบอร์ดที่ยืนยันตัวตนแล้วของคุณได้ และ session cookie จะไม่ถูกเปิดเผย |
| Client API `/v1/*`, `/v1beta/*`           | ส่วนหัว Bearer / `x-api-key` | อนุญาตอยู่แล้ว **โดยการออกแบบ** (`relaxForTokenAuth`): เบราว์เซอร์จะไม่แนบ `Authorization`/`x-api-key` โดยอัตโนมัติ ดังนั้นหน้าเว็บของผู้โจมตีจึงไม่สามารถส่งคีย์ของคุณได้ `CORS_ALLOW_ALL` ไม่ได้ขยายขอบเขตนี้                                      |
| การอ่านสาธารณะเท่านั้น (`/api/health`, …) | ไม่มี                        | ไม่มีข้อมูลละเอียดอ่อน; wildcard จึงไม่ก่อให้เกิดอันตราย                                                                                                                                                                                             |

ดังนั้นขอบเขตการเปิดเผย **ที่ยังคงเหลืออยู่** ของ `CORS_ALLOW_ALL=true` จึงจำกัดเฉพาะ: (a)
การ **อ่าน** ข้อมูลที่ไม่ได้ยืนยันตัวตนอยู่แล้วแบบข้าม origin โดยไม่มีข้อมูลรับรอง และ (b)
การอนุญาตให้ CORS **preflight ผ่าน** บน route สำหรับการจัดการ — ซึ่งยังคงต้องมีการยืนยันตัวตน
ที่หน้าเว็บข้าม origin ไม่สามารถจัดหาได้ พฤติกรรมนี้ **ไม่ใช่** ช่องทางสำหรับการยึดครองเซสชันหรือ
การขโมยข้อมูลรับรองบนเส้นทาง CORS ที่ใช้ร่วมกัน

### ข้อยกเว้นจริงหนึ่งรายการ — `/api/v1/agents/`

route ของ Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ตั้งค่า
ส่วนหัว CORS **ของตนเอง**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) และ**มีการ**ส่ง
`Access-Control-Allow-Origin: <origin>|*` พร้อมกับ
`Access-Control-Allow-Credentials: true` นี่เป็นพื้นผิวเดียวที่
การส่ง origin กลับและข้อมูลรับรองใช้งานร่วมกัน และ **ไม่ขึ้นกับ
`CORS_ALLOW_ALL`** route เหล่านี้ได้รับการยืนยันตัวตนสำหรับการจัดการ
(`requireManagementAuth`); ผู้ดูแลระบบที่เปิดให้เข้าถึงแดชบอร์ดจากภายนอกโฮสต์ควร
ตระหนักว่านี่เป็นจุดเดียวที่ส่วนหัวการตอบกลับอนุญาตให้อ่านแบบข้าม origin
โดยมีข้อมูลรับรอง การจำกัดให้ใช้รายการอนุญาตที่ระบุไว้อย่างชัดเจนกำลังถูกติดตาม
แยกต่างหากจากคำแนะนำเกี่ยวกับ CORS นี้

## รายการตรวจสอบสำหรับระบบโปรดักชัน

- **ห้ามตั้งค่า `CORS_ALLOW_ALL=true` ในระบบโปรดักชันโดยเด็ดขาด** ให้ปล่อยไว้โดยไม่กำหนดค่า
- กำหนดรายการต้นทางอย่าง **ชัดเจน** โดยใช้ตัวแปรสภาพแวดล้อมหรือช่องในแท็บ Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- หาก OmniRoute ทำงานอยู่หลัง reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) CORS **ไม่ใช่** กลไกควบคุมเพียงอย่างเดียวของคุณ — ตัวป้องกันเส้นทาง
  loopback ยังคงปกป้องเส้นทางที่สามารถสร้างโปรเซสได้ (ดู
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)) อย่าปลอมแปลง
  `X-Forwarded-For: 127.0.0.1` เพื่อ "แก้ไข" ข้อผิดพลาด 403 เพราะจะเป็นการเปิดช่องโหว่ในกลุ่ม RCE
  ที่ตัวป้องกันเส้นทางได้ปิดไว้อีกครั้ง
- ยืนยันสถานะรันไทม์: แดชบอร์ดจะแสดง **แบนเนอร์สีเหลืองอำพันแบบถาวร**
  ใต้ Dashboard → Security → Authorization Inventory เมื่อ
  `CORS_ALLOW_ALL=true` มีผลใช้งานอยู่ และ `/api/settings/authz-inventory` จะส่งคืน
  เอนเวโลป `cors: { allowAll, allowedOrigins }` ซึ่งเครื่องมือตรวจสอบสามารถเรียกตรวจสอบเป็นระยะได้

## ความสะดวกในการพัฒนา — อนุญาตเฉพาะต้นทางภายในเครื่องที่ระบุ

แม้แต่ในสภาพแวดล้อมการพัฒนา คุณแทบไม่จำเป็นต้องใช้ wildcard ให้อนุญาตเฉพาะเซิร์ฟเวอร์สำหรับการพัฒนาที่คุณใช้:

```bash
# เซิร์ฟเวอร์สำหรับการพัฒนา Vite (5173) + Next.js (3000) ที่เรียก OmniRoute ภายในเครื่อง
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

การจับคู่ต้นทางไม่คำนึงถึงตัวพิมพ์เล็กและตัวพิมพ์ใหญ่ และจะละเว้นเครื่องหมายทับต่อท้าย ดังนั้น
`http://localhost:3000` และ `http://localhost:3000/` จึงถือว่าเทียบเท่ากัน CSV เดียวกันนี้
สามารถตั้งค่าขณะรันไทม์ได้ที่ **Dashboard → Security → CORS Allowed Origins** โดยไม่ต้อง
รีสตาร์ต

## คีย์ API เทียบกับเซสชันคุกกี้

- **Bearer / `x-api-key` (พื้นผิวการอนุมาน `/v1/*`):** เบราว์เซอร์จะไม่แนบ
  ค่าเหล่านี้โดยอัตโนมัติ CORS จึงไม่ใช่แนวป้องกันที่มีความหมายในกรณีนี้ — คีย์ API ต่างหากที่เป็น
  แนวป้องกัน — ด้วยเหตุนี้พื้นผิวดังกล่าวจึงถูกตั้งใจให้อนุญาตอย่างกว้าง เพื่อให้ไคลเอนต์เบราว์เซอร์และ
  Electron สามารถอ่านการตอบกลับที่ตนมีสิทธิ์เข้าถึงอยู่แล้ว
- **เซสชันคุกกี้ (แดชบอร์ด):** ได้รับการปกป้องด้วยค่าเริ่มต้นแบบปิดเมื่อเกิดข้อผิดพลาด **และ**
  ด้วยการไม่มี `Access-Control-Allow-Credentials` บนเส้นทางที่ใช้ร่วมกัน อย่าเพิ่ม
  ต้นทางสำหรับการจัดการ/แดชบอร์ดลงในการกำหนดค่าแบบอนุญาตกว้าง ต้นทางเหล่านี้ต้องคงพฤติกรรม
  ปิดเมื่อเกิดข้อผิดพลาดไว้อย่างเคร่งครัด

## ตัวอย่าง: reverse proxy ที่อยู่หน้า OmniRoute

OmniRoute เป็นผู้บังคับใช้ CORS เอง ดังนั้นโดยทั่วไป proxy **ไม่ควร** เพิ่มหรือ
เขียนส่วนหัว `Access-Control-*` ใหม่ (ส่วนหัวที่ซ้ำกันทำให้เบราว์เซอร์ทำงานผิดพลาด) ให้ยุติการเชื่อมต่อ TLS
และส่งต่อคำขอ โดยปล่อยให้ OmniRoute ตอบคำขอ preflight:

```nginx
# nginx — ส่งต่อไปยัง OmniRoute; ห้ามแทรก Access-Control-* ที่นี่
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # ห้ามตั้งค่า X-Forwarded-For เป็น 127.0.0.1 เพราะจะทำให้ตัวป้องกันเส้นทาง loopback ใช้การไม่ได้
}
```

ตั้งค่าต้นทางของเบราว์เซอร์ที่อนุญาตใน OmniRoute (`CORS_ALLOWED_ORIGINS` หรือ
แท็บ Security) ไม่ใช่ใน proxy

## ไฟล์ต้นฉบับ

| ประเด็น                                            | ไฟล์                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| การแก้ไข allowlist + `getCorsStatus()`             | `src/server/cors/origins.ts`                                         |
| การใช้ middleware (แหล่งข้อมูลจริงเพียงแหล่งเดียว) | `src/server/authz/pipeline.ts`                                       |
| Settings → การแทรกต้นทางขณะรันไทม์                 | `src/lib/config/runtimeSettings.ts`                                  |
| สถานะรันไทม์สำหรับแดชบอร์ด                         | `src/app/api/settings/authz-inventory/route.ts`                      |
| แบนเนอร์คำเตือนบนแดชบอร์ด                          | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| ช่อง CORS Allowed Origins                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS รายเส้นทางของ Cloud-Agent (ข้อยกเว้น)         | `src/lib/cloudAgent/api.ts`                                          |

## ดูเพิ่มเติม

- [ระดับการป้องกันเส้นทาง](./ROUTE_GUARD_TIERS.md) — การบังคับใช้ loopback สำหรับ
  เส้นทางที่สามารถสร้างโปรเซสได้ (การควบคุมที่แยกจากกันและทำงานเสริมกัน)
- [คู่มือการให้สิทธิ์](../architecture/AUTHZ_GUIDE.md) — ไปป์ไลน์การตรวจสอบสิทธิ์ทั้งหมด
