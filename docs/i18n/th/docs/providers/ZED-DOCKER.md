# Zed IDE Integration in Docker Environments (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

เมื่อ OmniRoute ทำงานภายใน Docker ขั้นตอนมาตรฐาน "Import from Zed Keychain" จะล้มเหลว
เนื่องจากคอนเทนเนอร์ไม่สามารถเข้าถึงดีมอนพวงกุญแจของระบบปฏิบัติการโฮสต์ได้ (libsecret บน Linux,
Keychain บน macOS และ Credential Manager บน Windows) และไดเรกทอรีการกำหนดค่าของ Zed บน
ระบบไฟล์โฮสต์จะไม่ปรากฏภายในคอนเทนเนอร์โดยค่าเริ่มต้น

## เหตุผลที่การนำเข้าจากพวงกุญแจล้มเหลวใน Docker

มีปัญหาสองประการที่ขัดขวางการทำงานภายในคอนเทนเนอร์:

1. **การแยกระบบไฟล์** — `isZedInstalled()` จะค้นหา `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) หรือพาธที่เทียบเท่ากันบน Windows พาธเหล่านี้
   อยู่บนโฮสต์และไม่สามารถเข้าถึงได้ เว้นแต่จะเมานต์เป็นวอลุ่มไว้อย่างชัดเจน
2. **การแยก IPC** — แม้จะเมานต์ไดเรกทอรีการกำหนดค่าแล้ว โมดูลเนทีฟ `keytar`
   จะสื่อสารกับบริการพวงกุญแจของระบบปฏิบัติการผ่านซ็อกเก็ต Unix หรือเซสชัน D-Bus
   โดยค่าเริ่มต้น ทั้งสองอย่างไม่ได้เชื่อมต่อเข้ากับคอนเทนเนอร์ ดังนั้นการอ่านข้อมูลรับรองจึงล้มเหลวเสมอ

OmniRoute ตรวจจับสภาพแวดล้อม Docker โดยใช้ฮิวริสติกสองวิธี:

- ตรวจสอบว่ามี `/.dockerenv` อยู่หรือไม่ (เขียนโดยดีมอน Docker เมื่อคอนเทนเนอร์เริ่มทำงาน)
- ตรวจสอบว่ามีสตริง `docker` ปรากฏใน `/proc/1/cgroup` หรือไม่ (Linux cgroup v1)

เมื่อฮิวริสติกข้อใดข้อหนึ่งทำงาน เส้นทางการนำเข้าจะส่งคืน HTTP 422 พร้อม
`zedDockerEnvironment: true` และข้อความที่แนะนำให้คุณไปยังแท็บ Manual Token Import

## การใช้แท็บ Manual Token Import

1. เปิด **Dashboard → Providers → Zed**
2. แผง **Manual Token Import** จะปรากฏใต้การ์ดนำเข้าจากพวงกุญแจ เมื่อ
   OmniRoute ตรวจพบ Docker แผงนี้จะขยายโดยอัตโนมัติหลังจากความพยายามนำเข้า
   จากพวงกุญแจครั้งแรกล้มเหลว
3. เลือกผู้ให้บริการจากเมนูดรอปดาวน์ (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter หรือ DeepSeek)
4. วางคีย์ API ลงในช่องรหัสผ่าน
5. คลิก **Import**

คีย์จะถูกบันทึกเป็นการเชื่อมต่อผู้ให้บริการใหม่โดยใช้ชื่อ
`Zed Manual Import (<provider>)`

## ตำแหน่งที่ Zed จัดเก็บคีย์ API บนโฮสต์

Zed จัดเก็บคีย์ของผู้ให้บริการ AI ไว้ในพวงกุญแจของระบบปฏิบัติการภายใต้ชื่อบริการ เช่น
`zed-openai`, `ai.zed.openai`, `zed-anthropic` เป็นต้น หากต้องการดึงคีย์เหล่านี้มาใช้
สำหรับการนำเข้าด้วยตนเอง ให้ตรวจสอบที่:

**Linux**

```
~/.config/zed/settings.json
```

ส่วน `language_models` ประกอบด้วยการกำหนดค่าของผู้ให้บริการ คีย์ที่บันทึกลงใน
พวงกุญแจผ่าน UI ของ Zed จะไม่อยู่ในรูปแบบข้อความธรรมดาภายใน `settings.json` ให้ดึงคีย์ผ่าน
เครื่องมือดูพวงกุญแจ เช่น GNOME Keyring / Seahorse หรือด้วยการเรียกใช้:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

สามารถค้นหารายการในพวงกุญแจได้ใน **Keychain Access.app** โดยค้นหาคำว่า `zed`

## ตัวเลือกการเมานต์วอลุ่ม (ขั้นสูง)

คุณสามารถเลือกเมานต์ไดเรกทอรีการกำหนดค่าของ Zed แบบอ่านอย่างเดียวเข้าไปในคอนเทนเนอร์ได้
วิธีนี้ไม่สามารถแก้ไขปัญหาเกี่ยวกับพวงกุญแจได้ แต่อาจเป็นประโยชน์สำหรับฟีเจอร์ในอนาคตที่อ่าน
ค่าการกำหนดค่าที่ไม่ใช่ข้อมูลลับของ Zed (เช่น ค่ากำหนดโมเดล)

```yaml
# ส่วนหนึ่งของ docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # โฮสต์ Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # โฮสต์ macOS (ให้ยกเลิกเครื่องหมายความคิดเห็นของบรรทัดนี้แทน)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ในอนาคต: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

หมายเหตุ: การแทนที่ค่าด้วยตัวแปรสภาพแวดล้อม `ZED_CONFIG_PATH` ยังไม่ได้ถูกนำมาใช้
ตัวอย่างนี้มีไว้เป็นข้อมูลอ้างอิงเมื่อมีการเพิ่มฟีเจอร์ดังกล่าว

## API สำหรับการนำเข้าด้วยตนเอง

สามารถเรียกใช้ปลายทางสำหรับการนำเข้าด้วยตนเองได้โดยตรงเช่นกัน:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // ไม่บังคับ
}
```

เมื่อสำเร็จ ระบบจะส่งคืน:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## การแก้ไขปัญหา

| อาการ                              | สาเหตุ                                 | วิธีแก้ไข                             |
| ---------------------------------- | -------------------------------------- | ------------------------------------- |
| 422 + `zedDockerEnvironment: true` | กำลังทำงานภายใน Docker                 | ใช้แท็บ Manual Token Import           |
| 404 + `zedInstalled: false`        | ไม่ได้ติดตั้ง Zed บนโฮสต์              | ติดตั้ง Zed หรือใช้การนำเข้าด้วยตนเอง |
| 403 + การเข้าถึงพวงกุญแจถูกปฏิเสธ  | ระบบปฏิบัติการปฏิเสธการเข้าถึงพวงกุญแจ | อนุญาตสิทธิ์ในพรอมต์ของระบบปฏิบัติการ |
| 404 + บริการพวงกุญแจไม่พร้อมใช้งาน | ไม่มี `libsecret` บน Linux             | ติดตั้ง `libsecret-1-dev`             |
