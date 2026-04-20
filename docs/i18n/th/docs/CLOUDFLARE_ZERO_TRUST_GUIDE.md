# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

คู่มือนี้จัดทำเอกสารมาตรฐานทองคำของโครงสร้างพื้นฐานเครือข่ายเพื่อปกป้อง**OmniRoute**และเปิดเผยแอปพลิเคชันของคุณบนอินเทอร์เน็ตอย่างปลอดภัย**โดยไม่ต้องเปิดพอร์ตใดๆ (ศูนย์ขาเข้า)**## What was done on your VM?

เราเปิดใช้งาน OmniRoute ในโหมด**แยกพอร์ต**ผ่านทาง PM2:

-**พอร์ต `20128`:**รัน**เฉพาะ API**`/v1` -**พอร์ต `20129`:**รัน**เฉพาะแดชบอร์ดผู้ดูแลระบบ**

นอกจากนี้ บริการภายในจำเป็นต้องมี `REQUIRE_API_KEY=true` ซึ่งหมายความว่าไม่มีตัวแทนคนใดที่สามารถใช้จุดสิ้นสุด API ได้โดยไม่ต้องส่ง "Bearer Token" ที่ถูกต้องตามกฎหมายซึ่งสร้างขึ้นในแท็บคีย์ API ของแดชบอร์ด

สิ่งนี้ทำให้เราสามารถสร้างกฎเครือข่ายสองกฎที่เป็นอิสระอย่างสมบูรณ์ นี่คือจุดที่**Cloudflare Tunnel (cloudflared)**เข้ามา---

## 1. How to Create the Tunnel in Cloudflare

ติดตั้งยูทิลิตี้ `cloudflared` ในเครื่องของคุณแล้ว ทำตามขั้นตอนเหล่านี้ในระบบคลาวด์:

1. เข้าถึงแดชบอร์ด**Cloudflare Zero Trust**ของคุณ (one.dash.cloudflare.com)
2. ในเมนูด้านซ้าย ไปที่**เครือข่าย > อุโมงค์**
3. คลิก**เพิ่มอุโมงค์**เลือก**Cloudflared**และตั้งชื่อเป็น `OmniRoute-VM`
4. มันจะสร้างคำสั่งบนหน้าจอที่เรียกว่า "ติดตั้งและเรียกใช้ตัวเชื่อมต่อ"**คุณจะต้องคัดลอกโทเค็นเท่านั้น (สตริงยาวหลัง `--token`)**
5. เข้าสู่ระบบผ่าน SSH ไปยังเครื่องเสมือนของคุณ (หรือ Proxmox Terminal) และดำเนินการ: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

ยังอยู่ในหน้าจอ Tunnel ที่สร้างขึ้นใหม่ ให้ไปที่แท็บ**ชื่อโฮสต์สาธารณะ**และเพิ่ม**สอง**เส้นทาง โดยใช้ประโยชน์จากการแยกที่เราทำ:### Route 1: Secure API (Limited)

-**โดเมนย่อย:**`api` -**โดเมน:**`yourglobal.com` (เลือกโดเมนจริงของคุณ) -**ประเภทบริการ:**`HTTP` -**URL:**`127.0.0.1:20128` _(พอร์ต API ภายใน)_### Route 2: Zero Trust Dashboard (Closed)

-**โดเมนย่อย:**`omniroute` หรือ `panel` -**โดเมน:**`yourglobal.com` -**ประเภทบริการ:**`HTTP` -**URL:**`127.0.0.1:20129` _(แอปภายใน/พอร์ตภาพ)_

ณ จุดนี้ การเชื่อมต่อ "ทางกายภาพ" ได้รับการแก้ไขแล้ว ตอนนี้เรามาปกป้องมันอย่างแท้จริง---

## 3. Shielding the Dashboard with Zero Trust (Access)

ไม่มีรหัสผ่านในเครื่องที่จะปกป้องแดชบอร์ดของคุณได้ดีกว่าการลบการเข้าถึงออกจากอินเทอร์เน็ตแบบเปิดโดยสิ้นเชิง

1. ในแดชบอร์ด Zero Trust ไปที่**การเข้าถึง > แอปพลิเคชัน > เพิ่มแอปพลิเคชัน**
2. เลือก**โฮสต์เอง**
3. ใน**ชื่อแอปพลิเคชัน**ป้อน `แผง OmniRoute`
4. ใน**โดเมนแอปพลิเคชัน**ให้ป้อน `omniroute.yourglobal.com` (อันเดียวกับที่คุณใช้ใน "เส้นทาง 2")
5. คลิก**ถัดไป**
6. ใน**การดำเนินการตามกฎ**ให้เลือก "อนุญาต" สำหรับชื่อกฎ ให้ป้อน 'ผู้ดูแลระบบเท่านั้น'
7. ใน**รวม**ใต้เมนูแบบเลื่อนลง "ตัวเลือก" ให้เลือก `อีเมล` และพิมพ์อีเมลของคุณ เช่น `admin@spgeo.com.br`
8. บันทึก (`เพิ่มแอปพลิเคชัน`)

> **สิ่งนี้ทำอะไรบ้าง:**หากคุณพยายามเปิด `omniroute.yourglobal.com` มันจะไม่เข้าสู่แอปพลิเคชัน OmniRoute ของคุณอีกต่อไป! มันตกลงมาบนหน้าจอ Cloudflare อันสง่างามเพื่อขอให้คุณป้อนอีเมลของคุณ เฉพาะในกรณีที่คุณ (หรืออีเมลที่คุณป้อน) ถูกพิมพ์ที่นั่น คุณจะได้รับรหัสชั่วคราว 6 หลักใน Outlook/Gmail ซึ่งจะปลดล็อกช่องสัญญาณไปยังพอร์ต `20129`---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard ใช้ไม่ได้กับเส้นทาง API (`api.yourglobal.com`) เนื่องจากเป็นการเข้าถึงทางโปรแกรมผ่านเครื่องมืออัตโนมัติ (ตัวแทน) โดยไม่ต้องใช้เบราว์เซอร์ สำหรับสิ่งนี้ เราจะใช้ไฟร์วอลล์หลักของ Cloudflare (WAF)

1. เข้าถึง**Normal Cloudflare Dashboard**(dash.cloudflare.com) และไปที่โดเมนของคุณ
2. ในเมนูด้านซ้าย ไปที่**ความปลอดภัย > WAF > กฎการจำกัดอัตรา**
3. คลิก**สร้างกฎ** 4.**ชื่อ:**`OmniRoute API Anti-Abuse` 5.**หากคำขอที่เข้ามาตรงกัน...**
   - เลือกฟิลด์: `ชื่อโฮสต์`
   - โอเปอเรเตอร์: `เท่ากับ`
   - ค่า: `api.yourglobal.com`
4. ใต้**มีลักษณะเดียวกัน:**เก็บ `IP` ไว้
5. สำหรับขีดจำกัด (ขีดจำกัด): -**เมื่อคำขอเกิน:**`50` -**ระยะเวลา:**`1 นาที`
6. ในตอนท้าย ภายใต้**การกระทำ**: `บล็อก` และตัดสินใจว่าการบล็อกนั้นคงอยู่เป็นเวลา 1 นาทีหรือ 1 ชั่วโมง 9.**ปรับใช้**.

> **สิ่งนี้ทำ:**ไม่มีใครสามารถส่งคำขอมากกว่า 50 รายการในระยะเวลา 60 วินาทีไปยัง URL API ของคุณ เนื่องจากคุณใช้งานเอเจนต์หลายตัวและการใช้งานเบื้องหลังถึงขีดจำกัดอัตราและติดตามโทเค็นแล้ว นี่เป็นเพียงการวัดที่ Internet Edge Layer ที่ปกป้องอินสแตนซ์ภายในองค์กรของคุณไม่ให้ล่มเนื่องจากความเครียดจากความร้อนก่อนที่การรับส่งข้อมูลจะลงอุโมงค์ด้วยซ้ำ---

## Finalization

1. VM ของคุณ**ไม่มีพอร์ตที่เปิดเผย**ใน `/etc/ufw`
2. OmniRoute พูดเฉพาะ HTTPS ขาออก (`cloudflared`) และไม่ได้รับ TCP โดยตรงจากโลก
3. คำขอของคุณที่ส่งถึง OpenAI นั้นซับซ้อนเนื่องจากเรากำหนดค่าทั่วโลกให้ส่งผ่านพร็อกซี SOCKS5 (คลาวด์ไม่สนใจ SOCKS5 เพราะมันมาทางขาเข้า)
4. เว็บแดชบอร์ดของคุณมีการตรวจสอบสิทธิ์แบบ 2 ปัจจัยด้วยอีเมล
5. API ของคุณมีการจำกัดอัตราที่ Edge โดย Cloudflare และจะรับส่งข้อมูล Bearer Token เท่านั้น
