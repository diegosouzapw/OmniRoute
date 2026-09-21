# SQLite Runtime Resolution (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute จะตรวจหาไดรเวอร์ SQLite ขณะเริ่มต้นระบบผ่านลำดับสำรอง 5 ขั้นตอน:

1. **`better-sqlite3` ที่รวมมาในแพ็กเกจ** (ผ่าน `dependencies` ใน `package.json`)
   — เร็วที่สุด ใช้ไบนารีแบบเนทีฟ และติดตั้งโดย `npm install` เมื่อมีเครื่องมือสำหรับการบิลด์

2. **`better-sqlite3` ที่ติดตั้งขณะรันไทม์** (ใน `~/.omniroute/runtime/`)
   — ติดตั้งแบบเลื่อนเวลาเมื่อรันครั้งแรก **หรือ** โดย `scripts/build/postinstall.mjs → scripts/postinstall.mjs`
   ตรวจสอบ magic bytes ของไฟล์ `.node` แบบเนทีฟ (ELF / Mach-O / PE) ก่อนโหลด
   เพื่อป้องกันไบนารีที่เสียหายหรือสร้างมาสำหรับแพลตฟอร์มอื่น

3. **`node:sqlite`** (ไลบรารีมาตรฐานของ Node ≥22.5) — ไม่ต้องบิลด์โค้ดเนทีฟ ใช้เมื่อ
   เส้นทางของ better-sqlite3 ทั้งสองล้มเหลว มีชุดฟีเจอร์จำกัด

4. **`sql.js`** (WASM) — ตัวเลือกสำรองสุดท้าย ทำงานได้ทุกที่แต่ช้ากว่า
   และเขียนข้อมูลตามช่วงเวลาแทนการเขียนแบบซิงโครนัส

## เหตุใดจึงซับซ้อนเช่นนี้?

- **Windows EBUSY**: `npm install -g omniroute@latest` อาจล้มเหลวหาก
  `better_sqlite3.node` ของเวอร์ชันก่อนหน้าถูกล็อกโดยโปรเซสที่กำลังทำงานอยู่ การติดตั้งขณะรันไทม์
  ใน `~/.omniroute/runtime/` ช่วยหลีกเลี่ยงแคช npm ส่วนกลาง
- **ไม่มีเครื่องมือสำหรับการบิลด์**: สภาพแวดล้อมบางประเภท (Windows ในองค์กรที่ไม่มี VS Build
  Tools หรืออิมเมจ Docker แบบมินิมอล) ไม่สามารถคอมไพล์ `better-sqlite3` ได้ ตัวติดตั้งขณะรันไทม์
  จะดึงไบนารีที่บิลด์ไว้ล่วงหน้าจากรีจิสทรี npm ส่วนไดรเวอร์สำรอง
  ช่วยให้ OmniRoute ยังเริ่มทำงานได้แม้ว่าขั้นตอนดังกล่าวจะล้มเหลว
- **ระบบที่แยกขาดจากเครือข่าย**: หากไม่สามารถเข้าถึงรีจิสทรี npm ได้ `node:sqlite`
  หรือ `sql.js` จะรับประกันความสามารถพื้นฐานในการทำงาน

## การตรวจสอบ magic bytes

ก่อนโหลดไฟล์ `.node` ที่ติดตั้งขณะรันไทม์ OmniRoute จะอ่าน 8 ไบต์แรก
และเปรียบเทียบกับ magic bytes ของแพลตฟอร์มที่รู้จัก:

| แพลตฟอร์ม             | ไบต์ (ฐานสิบหก) | ป้ายกำกับ   |
| --------------------- | --------------- | ----------- |
| Linux                 | `7F 45 4C 46`   | `elf`       |
| macOS 64 บิต BE       | `FE ED FA CF`   | `macho`     |
| macOS 64 บิต LE       | `CF FA ED FE`   | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE`   | `macho-fat` |
| Windows               | `4D 5A` (MZ)    | `pe`        |

หาก magic bytes ไม่ตรงกัน → ไฟล์จะถูกละเว้น และกระบวนการสำรองจะดำเนินต่อไปยังขั้นตอนถัดไป

## การตรวจสอบไดรเวอร์ที่ใช้งานอยู่

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## การควบคุมด้วยตนเอง

```bash
# ข้ามการวอร์มอัปหลังการติดตั้ง (เพื่อให้การติดตั้ง CI รวดเร็ว)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# บังคับติดตั้ง better-sqlite3 สำหรับรันไทม์ใหม่
rm -rf ~/.omniroute/runtime
omniroute  # จะติดตั้งใหม่ในการเริ่มต้นครั้งถัดไป

# ตรวจสอบว่าไดรเวอร์ใดกำลังใช้งานอยู่
omniroute config db-info  # (หากมีคำสั่ง CLI นี้)
```

## เอกสารอ้างอิง

ส่วนที่นำไปใช้งาน:

- `bin/cli/runtime/magicBytes.mjs` — ฟังก์ชันช่วยตรวจสอบ magic bytes ของไบนารี
- `bin/cli/runtime/sqliteRuntime.mjs` — ตัวตรวจหาไดรเวอร์ขณะรันไทม์แบบ 5 ขั้นตอน + ตัวติดตั้งแบบเลื่อนเวลา
- `bin/cli/runtime/index.mjs` — ตัวประสานงานการเริ่มต้นระบบ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — ฮุกหลังการติดตั้งของ npm (การวอร์มอัปที่ไม่ทำให้กระบวนการล้มเหลว)
- `src/lib/db/core.ts` — ส่งออก `ensureDbInitialized()` / `getDriverInfo()`

## โทโพโลยีแบบผู้เขียนรายเดียว (ไม่รองรับ HA)

ลำดับไดรเวอร์สำรองด้านบนยังคงทำงานใน **โปรเซสเดียว** SQLite เริ่มต้นของ
OmniRoute เป็นระบบที่มี **ผู้เขียนรายเดียว**:

- อย่าเชื่อมต่อรีพลิกา OmniRoute สองตัวเข้ากับไฟล์ `storage.sqlite` เดียวกัน
- การรีสตาร์ตคอนเทนเนอร์ การปรับใช้แบบ Recreate การถูกยุติจาก OOM หรือการรีสตาร์ตจาก HEALTHCHECK
  จะตัดการเชื่อมต่อเซสชัน SSE ที่กำลังดำเนินอยู่ทั้งหมด เส้นทางมาตรฐานไม่มีกระบวนการระบายเซสชัน
- การตรวจสอบ liveness ของออร์เคสเตรเตอร์ที่ถือว่า `/healthz` ซึ่งตอบสนองช้าเป็นสถานะตาย จะยุติ
  รีพลิกาเพียงตัวเดียว ควรใช้ TCP liveness + ความพร้อมใช้งานผ่าน HTTP `/healthz` ดู
  [คู่มือ Docker — ความพร้อมใช้งาน](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  และ [คำแนะนำสำหรับโพรบ Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)
