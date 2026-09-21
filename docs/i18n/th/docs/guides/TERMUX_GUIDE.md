# Termux Headless Setup (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute สามารถทำงานเป็นเซิร์ฟเวอร์แบบ headless บน Android ผ่าน Termux ได้ แอปเดสก์ท็อป Electron ไม่รองรับใน Termux แต่แดชบอร์ดเว็บและ API ที่เข้ากันได้กับ OpenAI สามารถใช้งานได้จากเบราว์เซอร์ภายในเครื่องหรือจากอุปกรณ์อื่นในเครือข่ายเดียวกัน

## ข้อกำหนดเบื้องต้น

ติดตั้ง Termux จาก F-Droid หรือ GitHub releases จากนั้นอัปเดตแพ็กเกจและติดตั้งเครื่องมือสำหรับบิลด์ที่จำเป็นต่อ dependency แบบ native เช่น `better-sqlite3`

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **เวอร์ชัน Node.js:** OmniRoute ต้องใช้ Node `>=22.22.2 <23 || >=24.0.0 <27` (ตรงกับ `engines` ใน `package.json` / `SUPPORTED_NODE_RANGE`) โดยทั่วไป `nodejs-lts` ของ Termux จะมาพร้อมกับ Node 20 LTS ซึ่ง **ไม่รองรับอีกต่อไป** — ให้ติดตั้ง `pkg install nodejs` (เวอร์ชันปัจจุบัน) แทน และตรวจสอบว่า `node --version` แสดงเวอร์ชันในสาย 22.x/24.x ขึ้นไป

หากการคอมไพล์แพ็กเกจแบบ native ล้มเหลว ให้เรียกใช้คำสั่ง `pkg install` ข้างต้นอีกครั้ง แล้วลองติดตั้ง OmniRoute ใหม่

## การติดตั้ง

เรียกใช้แพ็กเกจล่าสุดที่เผยแพร่โดยตรง:

```bash
npx -y omniroute@latest
```

คุณยังสามารถติดตั้งแบบ global ได้:

```bash
npm install -g omniroute
omniroute
```

## การเรียกใช้

เริ่ม OmniRoute ในโหมดเซิร์ฟเวอร์แบบ headless:

```bash
omniroute
```

หรือ:

```bash
npx omniroute
```

แดชบอร์ดจะรอรับการเชื่อมต่อที่:

```text
http://localhost:20128
```

เปิด URL ดังกล่าวในเบราว์เซอร์ Android หากคุณเรียกใช้ไคลเอนต์ภายใน Termux ให้ใช้โฮสต์และพอร์ตเดียวกันเป็น URL ฐานที่เข้ากันได้กับ OpenAI

## การทำงานเบื้องหลัง

สำหรับโปรเซสเบื้องหลังแบบง่าย:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

หากต้องการหยุด:

```bash
pkill -f omniroute
```

สำหรับการเริ่มทำงานอัตโนมัติหลังจากบูตอุปกรณ์ ให้ติดตั้งส่วนเสริม Termux:Boot และสร้างสคริปต์สำหรับบูต:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

การเพิ่มประสิทธิภาพแบตเตอรี่ของ Android อาจหยุดโปรเซสเบื้องหลังที่ทำงานเป็นเวลานานได้ ให้ปิดการเพิ่มประสิทธิภาพแบตเตอรี่สำหรับ Termux หากต้องการให้เซิร์ฟเวอร์ออนไลน์อยู่ตลอดเวลา

## การเข้าถึงจากอุปกรณ์อื่น

ค้นหาที่อยู่ IP ของโทรศัพท์บนเครือข่าย WiFi:

```bash
ip addr show wlan0
```

จากนั้นเปิดแดชบอร์ดจากอุปกรณ์อื่น:

```text
http://PHONE_IP:20128
```

ตัวอย่างเช่น:

```text
http://192.168.1.50:20128
```

ให้โทรศัพท์และไคลเอนต์อยู่บนเครือข่ายที่เชื่อถือได้เดียวกัน หากคุณเปิดให้เข้าถึง OmniRoute จากภายนอกโทรศัพท์ ให้เปิดใช้งาน API key และการยืนยันตัวตนสำหรับแดชบอร์ด

## ไดเรกทอรีข้อมูล

ตามค่าเริ่มต้น OmniRoute จะจัดเก็บข้อมูลไว้ภายใต้ไดเรกทอรี home ของ Termux โดยใช้ลักษณะการทำงานของพาธข้อมูลฝั่งเซิร์ฟเวอร์เช่นเดียวกับบน Linux หากต้องการจัดเก็บฐานข้อมูลไว้ในตำแหน่งที่ระบุอย่างชัดเจน:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## ข้อจำกัด

- Electron ไม่สามารถทำงานใน Termux ได้
- ไม่มี system tray หรือการผสานรวมกับเดสก์ท็อป
- การตั้งค่านี้เป็นแบบเซิร์ฟเวอร์เท่านั้น: ให้ใช้งานผ่านแดชบอร์ดบนเบราว์เซอร์
- dependency แบบ native อาจต้องคอมไพล์ภายในเครื่อง
- อุปกรณ์ Android ที่มีหน่วยความจำน้อยอาจต้องลดจำนวนคำขอที่ทำงานพร้อมกัน
- ฟีเจอร์ใบรับรอง MITM/ระบบอาจต้องกำหนดค่า trust store ระดับ Android จากภายนอก Termux

## การแก้ไขปัญหา

### แพลตฟอร์มที่ไม่รองรับ: android (ทุกคำขอส่งคืน HTTP 500)

**อาการ:** `omniroute` / `omniroute serve` แสดงข้อความ `✔ OmniRoute is running!` แต่ทุกคำขอไปยังแดชบอร์ดหรือ API ส่งคืนเพียง `500 Internal Server Error` ไฟล์ `~/.omniroute/logs/application/app.log` ยังคงว่างเปล่า `APP_LOG_LEVEL=debug` ไม่แสดงข้อมูลที่เป็นประโยชน์ และเนื้อหาการตอบกลับเป็นข้อความธรรมดา (`Internal Server Error`) โดยไม่มีรายละเอียด JSON

**สาเหตุ:** บิลด์ Termux/Node บางรุ่นรายงานค่า `process.platform === "android"` โดย `getCacheDirectory()` ของ Next.js ไม่รองรับแพลตฟอร์มดังกล่าว ซึ่งจำเป็นต้องมี `~/.cache` (หรือไดเรกทอรี tmp ทั่วไป) อยู่ _ก่อนแล้ว_ มิฉะนั้นจะล้มเหลวขณะโหลด instrumentation hook พร้อมข้อความ:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

เนื่องจาก hook ไม่เคยโหลด ระบบบันทึก log จึงไม่เริ่มทำงาน ทำให้ข้อผิดพลาด 500 ดูเหมือนไม่สามารถวินิจฉัยได้เลย OmniRoute จะสร้าง `~/.cache` (และตั้งค่า `XDG_CACHE_HOME` เมื่อยังไม่ได้กำหนด) ในจุดเริ่มต้นของ CLI ก่อนที่ Next.js จะเริ่มทำงาน เพื่อให้การตรวจสอบนี้สำเร็จบน Android/Termux

**วิธีแก้ไขที่รองรับ (ไม่ต้องแก้ไขแพ็กเกจ):**

```bash
mkdir -p ~/.cache
omniroute serve
```

ในบิลด์ OmniRoute ปัจจุบัน CLI จะดำเนินการนี้โดยอัตโนมัติบน Android/Termux — การติดตั้งใหม่ด้วย `npx -y omniroute@latest` / แบบ global ไม่ควรต้องทำขั้นตอนนี้ด้วยตนเอง หากคุณยังพบข้อผิดพลาดหลังจากอัปเกรด ให้สร้าง `~/.cache` หนึ่งครั้งตามข้างต้นแล้วเริ่มใหม่

**อย่า** แก้ไข `dist/server.js` เพื่อบังคับให้ `process.platform = "linux"` การแก้ไขแพ็กเกจในลักษณะดังกล่าวจะถูกเขียนทับทุกครั้งที่ติดตั้งใหม่หรืออัปเกรด และไม่จำเป็นเมื่อมีไดเรกทอรีแคชแล้ว

### ข้อผิดพลาดในการบิลด์ better-sqlite3

ติดตั้ง toolchain สำหรับบิลด์ของ Termux:

```bash
pkg install nodejs python build-essential
```

จากนั้นเรียกใช้อีกครั้ง:

```bash
npx -y omniroute@latest
```

### พอร์ตถูกใช้งานอยู่แล้ว

ตรวจสอบว่าโปรเซสใดกำลังรอรับการเชื่อมต่อบนพอร์ตเริ่มต้น:

```bash
ss -ltnp | grep 20128
```

หยุดโปรเซสเดิม:

```bash
pkill -f omniroute
```

### ไม่สามารถเข้าถึงแดชบอร์ดจากอุปกรณ์อื่น

ตรวจสอบว่าอุปกรณ์ทั้งสองอยู่บนเครือข่าย WiFi เดียวกัน จากนั้นทดสอบจาก Termux:

```bash
curl http://localhost:20128
```

หากการเข้าถึงภายในเครื่องใช้งานได้ แต่การเข้าถึงผ่าน LAN ใช้งานไม่ได้ ให้ตรวจสอบการแยกอุปกรณ์ของ hotspot/WiFi บน Android รวมถึงไฟร์วอลล์หรือโปรไฟล์ VPN บนโทรศัพท์
