# Router Backends & Embedded Services — architecture contract (ADR) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **สถานะ:** ยอมรับแล้ว · **บริบท:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **สัญญา:** `domain/routing/routerBackends.ts`
> (รีจิสทรีแบบมีชนิดข้อมูล — โค้ดจะรวมเข้ามาพร้อมกับ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR นี้กำหนดความสัมพันธ์ระหว่าง `ts` (เนทีฟ), `bifrost`, `cliproxy`, `9router` และ
เอนจินที่เข้ากันได้กับ VibeProxy อย่างชัดเจน เพื่อไม่ให้ผู้มีส่วนร่วมสับสนระหว่าง
สองสิ่งที่แตกต่างกันในเชิงสถาปัตยกรรมอีกต่อไป เอกสารนี้กำหนดให้รีจิสทรีแบบมีชนิดข้อมูล
ที่เพิ่มเข้ามาจากงาน router-backend-registry เป็นแหล่งข้อมูลจริงเพียงแหล่งเดียว
สำหรับโมเดลดังกล่าว

## ความแตกต่างหลัก — สองแกนที่เป็นอิสระต่อกัน

บทบาทของเอนจินอธิบายด้วย **สองแกนที่เป็นอิสระต่อกัน** ซึ่งเข้ารหัสไว้ร่วมกันใน
`RouterBackendDefinition` ของรีจิสทรี:

1. **วงจรชีวิต** (`RouterBackendLifecycle`) — _เอนจินทำงานอย่างไร_:
   - `in-process` — ทำงานภายในโปรเซส Node ของ OmniRoute (ไปป์ไลน์ TS แบบเนทีฟ)
   - `supervised` — โปรเซสลูกภายในเครื่องที่ OmniRoute ติดตั้ง/เริ่ม/หยุด/ตรวจสอบสถานะ
     ผ่าน `ServiceSupervisor` แล้วใช้งานในฐานะการเชื่อมต่อกับผู้ให้บริการ
   - `external` — ปลายทาง HTTP ที่ OmniRoute ส่งคำขอไปให้ แต่ **ไม่ได้** จัดการ
     (กำหนดค่าด้วย URL ฐานจากตัวแปรสภาพแวดล้อม)
   - `disabled` — ลงทะเบียนแล้วแต่ไม่สามารถเลือกได้
2. **แกนการเลือก** (แบ็กเอนด์การกำหนดเส้นทางของรีเลย์) — _รีเลย์ส่งคำขอไปยังเอนจินนั้นหรือไม่_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` ใน
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`

ข้อผิดพลาดที่ต้องหลีกเลี่ยงคือ การถือว่า "บริการแบบฝังตัว" และ "แบ็กเอนด์การกำหนดเส้นทาง"
เป็นรายการเดียวกัน ซึ่งไม่ใช่เช่นนั้น เอนจินแบบ `supervised` (9router/cliproxy) คือ
**การเชื่อมต่อกับผู้ให้บริการที่ไปป์ไลน์เนทีฟใช้** ไม่ใช่แบ็กเอนด์ทางเลือกสำหรับ
การส่งคำขอของรีเลย์ ส่วน `bifrost` เป็นกรณีตรงกันข้าม กล่าวคือ เป็นแบ็กเอนด์สำหรับ
การส่งคำขอของรีเลย์ที่ (ในอดีต) รองรับเฉพาะ `external`

## รีจิสทรี — แหล่งข้อมูลจริงเพียงแหล่งเดียว

สัญญา `domain/routing/routerBackends.ts` (โค้ดจะรวมเข้ามาพร้อมกับ
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) ประกาศเอนจินแต่ละรายการเพียงครั้งเดียว พร้อมวงจรชีวิต
ความสามารถ อัตลักษณ์ของบริการ พอร์ตเริ่มต้น การกำหนดค่าการตรวจสอบสถานะ และ
การรองรับเทเลเมทรี ผู้ใช้งานจะค้นหาเอนจินผ่าน `getRouterBackend(id)`,
`listRouterBackends()` และ `listRouterBackendsByCapability(cap)` แทนการเขียน
กรณีพิเศษแยกสำหรับไซด์คาร์แต่ละตัว

| แบ็กเอนด์   | วงจรชีวิต    | บริการ (แกน A) | แบ็กเอนด์รีเลย์ (แกน B)    | การตรวจสอบสถานะ | พอร์ตเริ่มต้น |
| ----------- | ------------ | -------------- | -------------------------- | --------------- | ------------- |
| `ts`        | `in-process` | —              | `ts` (เนทีฟ)               | —               | —             |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`         | `/health`       | —             |
| `cliproxy`  | `supervised` | `cliproxy`     | — (ผู้ให้บริการ)           | `/v1/models`    | 8317          |
| `9router`   | `supervised` | `9router`      | — (ผู้ให้บริการ)           | `/api/health`   | 20130         |
| `vibeproxy` | `external`   | —              | — (อะแดปเตอร์ผู้ให้บริการ) | `/v1/models`    | —             |

¹ การยกระดับ Bifrost ให้เป็นบริการแบบฝังตัวชนิด `supervised` (สามารถติดตั้ง/เริ่มทำงาน
ได้จาก `/api/services/bifrost/`) ติดตามได้ใน
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) โดยจนกว่าจะผสานการเปลี่ยนแปลงดังกล่าว
Bifrost จะรองรับเฉพาะ `external` (เข้าถึงได้ผ่าน `BIFROST_BASE_URL` เท่านั้น)

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ช่วยให้ผู้เรียกใช้
กรองตามสิ่งที่เอนจินสามารถทำได้จริง แทนการเขียนเงื่อนไขแยกตามแต่ละ ID โดยตรง

## แกน A — บริการแบบฝังตัว (ฝั่งโปรเซสที่อยู่ภายใต้การควบคุม)

- **รีจิสทรีของโปรเซสที่อยู่ภายใต้การควบคุม:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ปัจจุบัน: `9router`, `cliproxy`)
- **ผู้รับผิดชอบวงจรชีวิต:** `src/lib/services/ServiceSupervisor.ts` — `start()` สร้าง
  โปรเซสลูก รอให้ผ่านเกต `waitForHealthy()` และส่ง stdout/stderr เข้า ring buffer;
  `stop()` ใช้ SIGTERM→SIGKILL; การดำเนินการทั้งหมดถูกจัดลำดับภายใต้ล็อก
- **ยูเนียนของสถานะ** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error` รวมถึง
  `HealthState = healthy | unhealthy | unknown` ที่เป็นอิสระจากกัน
- **เหตุใดจึงใช้โปรเซสแยกต่างหาก (แทน SDK ภายในโปรเซส)?** การแยกโปรเซสคือสิ่งที่ทำให้
  สามารถควบคุมการติดตั้ง/เริ่ม/หยุด/ตรวจสอบสถานะ/บันทึกของแต่ละ sidecar ได้อย่างอิสระ และทำให้
  spawn-guard สำหรับ loopback มีผล การจำลองอะแดปเตอร์ภายในโปรเซสเป็นงานในอนาคต —
  capability flag `native-hot-path` คือจุดที่จะใช้ระบุความสามารถดังกล่าว

### สัญญาของเส้นทางวงจรชีวิต (`/api/services/<tool>/…`)

รหัสสถานะถูกกำหนดให้ **เฉพาะเจาะจงตามสถานะ/คำกริยา/พาธโดยเจตนา** — นี่คือสัญญา ไม่ใช่
ความไม่สอดคล้องกัน:

| การเรียกใช้                   | เงื่อนไข                                 | สถานะ                                  |
| ----------------------------- | ---------------------------------------- | -------------------------------------- |
| `POST .../start`              | บริการอยู่ในสถานะ `not_installed`        | **409** (เงื่อนไขเบื้องต้น)            |
| `POST .../stop`               | หยุดอยู่แล้ว                             | **200** (ไม่ดำเนินการใด ๆ และทำซ้ำได้) |
| `GET .../status`              | ปกติ                                     | **200** (`live ?? row ?? "unknown"`)   |
| `POST .../start`              | การสร้างโปรเซสล้มเหลว                    | **503** (ชั่วคราว)                     |
| `GET .../status`, `.../stop`  | ข้อผิดพลาดที่ไม่ได้รับการดักจับ          | **500**                                |
| `GET /api/services/<x>/logs`  | ไม่รู้จักเครื่องมือ `<x>`                | **404** `Service '<x>' not found`      |
| `GET .../status?reveal=key`   | ไม่มี `X-Reveal-Confirm: yes`            | **403** (เฉพาะ 9router)                |
| **ทุกคำขอ** `/api/services/*` | ผู้เรียกไม่ได้มาจาก loopback/private-LAN | **403 LOCAL_ONLY**                     |

เนื้อหาข้อผิดพลาดทั้งหมดถูกจัดรูปแบบโดย `createErrorResponse()` →
`{ error: { message, type }, requestId }` โดย `type` จะได้มาจากสถานะ
(`500→server_error`, `404→not_found`, `409→conflict` มิฉะนั้นเป็น `invalid_request`) และเป็น
ตัวจำแนกที่เครื่องสามารถนำไปดำเนินการต่อได้ ข้อความได้รับการทำให้ปลอดภัยล่วงหน้าแล้ว
(`sanitizeErrorMessage()`, กฎตายตัวข้อที่ 12)

**ตัวป้องกัน loopback** เป็นสาเหตุที่พบบ่อยที่สุดของ `403`: `/api/services/` อยู่ใน
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) และ
`src/server/authz/policies/management.ts` จะปฏิเสธผู้เรียกที่ไม่ได้มาจาก loopback /
private-LAN **ก่อนการยืนยันตัวตน** เนื่องจากเส้นทางเหล่านี้สร้างโปรเซสลูก (กฎตายตัวข้อที่ 15
และ 17) การเข้าถึงเส้นทางเหล่านี้ผ่าน public tunnel จะได้รับ `403` ตามการออกแบบ

## แกน B — แบ็กเอนด์การกำหนดเส้นทางรีเลย์ (ฝั่งการจัดส่ง)

เฉพาะพาธพร็อกซีรีเลย์ `/api/v1/relay/chat/completions` เท่านั้นที่เลือกแบ็กเอนด์
สำหรับการจัดส่ง ส่วนพื้นผิวหลัก `/api/v1/chat/completions` จะไม่เรียกใช้
`routingBackend.ts`

- **การเลือก** (`resolveRelayRoutingBackend`): ใช้ตัวสลับ env ส่วนกลางเพียงตัวเดียว —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}
  หากไม่ได้ตั้งค่า จะใช้ `auto` เมื่อ Bifrost ได้รับการกำหนดค่าและเปิดใช้งาน มิฉะนั้นใช้ `ts`
- **ลักษณะการทำงาน:**
  - `bifrost` (บังคับใช้): Bifrost ล้มเหลว → ตอบกลับ `502` ทันที โดยไม่มี fallback
  - `auto`: ลองใช้ Bifrost และเมื่อล้มเหลว/อยู่ในช่วง cooldown จะเปลี่ยนไปใช้เนทีฟโดยไม่แจ้ง
  - `ts` / หลัง fallback: ไปป์ไลน์ตัวแปล/ตัวดำเนินการ `open-sse` แบบเนทีฟ
- **Cooldown:** ช่วง cooldown หลังความล้มเหลวต่อ `baseUrl` ใน `bifrostCooldown.ts`

ปัจจุบันการเลือกเป็นแบบ **ทั้งหมดหรือไม่ใช้เลยในระดับรีเลย์** — ไม่มีการสลับเอนจิน
แยกตามผู้ให้บริการหรือแยกตามคำขอบน `release/v3.8.43` เกตแบบรายคำขอกำลังถูกเพิ่ม
โดยงาน sidecar-manifest
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`)
ซึ่งทำให้ `auto` กำหนดเส้นทางผ่าน Bifrost เฉพาะสำหรับผู้ให้บริการที่มีสิทธิ์ตาม manifest เท่านั้น

## การผสานรวมแดชบอร์ด

แดชบอร์ดบริการจะสำรวจ `GET /api/services/<tool>/status` ทุก 5 วินาทีผ่าน
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
โดยส่งคืน `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` ไม่มีตัวให้บริการ availability-context ที่ใช้ร่วมกัน —
แต่ละคอมโพเนนต์จะเรียก hook แยกตามแต่ละเครื่องมือ ในกรณี `!res.ok` ปัจจุบัน hook จะแสดงเพียง
`HTTP <status>` แบบไม่มีรายละเอียด การแมปฟิลด์ `error.type` กับคำอธิบายที่ผู้ใช้เข้าใจได้เป็น
การปรับปรุง UX ที่มีการติดตามไว้แล้ว ไม่ใช่การเปลี่ยนแปลงสัญญา

## ผลที่ตามมา

- เอนจินใหม่ลงทะเบียนเพียงครั้งเดียวใน `ROUTER_BACKENDS` ผู้ใช้งานจะเข้าถึงเอนจินเหล่านั้นผ่านการค้นหา
  ความสามารถ โดยไม่ต้องเพิ่มเงื่อนไขแยกตาม id ใหม่
- คำถามที่ว่า "นี่คือบริการหรือ routing backend?" พิจารณาจากฟิลด์ `lifecycle` ไม่ใช่
  จากการที่ id ปรากฏอยู่ในรายการใด
- การกำกับดูแล Bifrost (#5817) และการย้าย native hot-path (#5670) ต่อยอดจาก
  สัญญาที่ใช้ร่วมกันนี้ แทนการจัดการ sidecar แต่ละตัวเป็นกรณีพิเศษ
