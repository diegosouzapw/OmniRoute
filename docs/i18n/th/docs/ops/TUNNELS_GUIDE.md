# Tunnels Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **แหล่งข้อมูลอ้างอิงหลัก:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute สามารถเปิดให้เข้าถึงเซิร์ฟเวอร์ภายในเครื่อง (`http://localhost:20128`) จาก
อินเทอร์เน็ตสาธารณะผ่านแบ็กเอนด์อุโมงค์สามแบบ ซึ่งมีประโยชน์สำหรับ:

- Callback ของ OAuth จากผู้ให้บริการคลาวด์ (Antigravity, Gemini, Cursor) ที่ต้องใช้
  URL เปลี่ยนเส้นทางซึ่งเข้าถึงได้จากสาธารณะ
- การแชร์อินสแตนซ์ภายในเครื่องของคุณกับเพื่อนร่วมทีมโดยไม่ต้องปรับใช้ VM
- การทดสอบผ่านอุปกรณ์เคลื่อนที่ จากระยะไกล หรือข้ามเครือข่าย

แบ็กเอนด์ทั้งสามได้รับการจัดการภายในโปรเซส — OmniRoute เริ่ม/หยุดไบนารี
หรือ SDK ที่เกี่ยวข้องจากแดชบอร์ดหรือ REST API โดยไม่จำเป็นต้องตั้งค่า
reverse proxy หรือ systemd

## ภาพรวมแบ็กเอนด์

| แบ็กเอนด์                   | ความคงอยู่                                      | ค่าใช้จ่าย                  | การตั้งค่า                                               |
| --------------------------- | ----------------------------------------------- | --------------------------- | -------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | ชั่วคราว (URL เปลี่ยนทุกครั้งที่เริ่มใหม่)      | ฟรี                         | ไม่ต้องตั้งค่า — ติดตั้ง `cloudflared` โดยอัตโนมัติ      |
| **ngrok**                   | คงที่เมื่อกำหนดแผนแบบชำระเงินหรือโดเมนแบบตายตัว | ระดับฟรี + ชำระเงิน         | ต้องมีบัญชี ngrok + authtoken                            |
| **Tailscale Funnel**        | คงที่ต่อโหนดภายใน tailnet ของคุณ                | ฟรีสำหรับการใช้งานส่วนบุคคล | ต้องติดตั้งและเข้าสู่ระบบ Tailscale + ตั้งค่า Funnel ACL |

การนำไปใช้งานอยู่ใน `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` และ `src/lib/tailscaleTunnel.ts` ทั้งสามรายการส่งคืน
ออบเจ็กต์ `status` ที่มีโครงสร้างร่วมกัน โดยมีฟิลด์ `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` และ `lastError` เพื่อให้แดชบอร์ดแสดงผลทั้งหมดได้อย่างสอดคล้องกัน

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` เรียกใช้ `cloudflared` เป็นโปรเซสลูก โดยรองรับ
สองโหมด ซึ่งเลือกตามว่ามีการระบุการกำหนดค่า named tunnel หรือไม่:

- **Quick tunnel (ค่าเริ่มต้น)** เรียกใช้ `cloudflared tunnel --url
http://localhost:<apiPort>` และแยกวิเคราะห์ URL `*.trycloudflare.com` ที่ได้รับ
  จาก stdout โดย URL จะเป็นแบบชั่วคราวและเปลี่ยนทุกครั้งที่เริ่มใหม่
- **Named tunnel (เลือกใช้ได้)** เมื่อ `CLOUDFLARED_CONFIG` ชี้ไปยัง
  `config.yml` ของ cloudflared ที่จัดการภายในเครื่อง OmniRoute จะเรียกใช้ `cloudflared tunnel --no-autoupdate
--config <path> run` ทำให้คุณมี **ชื่อโฮสต์แบบระบุชื่อที่คงที่** การกำหนดค่า
  จะระบุ UUID ของอุโมงค์, `credentials-file` และการกำหนดเส้นทาง `ingress` ดังนั้นจึงไม่มี
  การส่ง `--url` และไม่จำเป็นต้องใช้โทเค็นจากแดชบอร์ด Zero Trust โดย `run` จะอ่าน
  ข้อมูลประจำตัวจากพาธสัมบูรณ์ของ `credentials-file` ในการกำหนดค่า — ไม่จำเป็นต้องมี `cert.pem`
  (ไฟล์ดังกล่าวใช้สำหรับการจัดการวงจรชีวิตของอุโมงค์เท่านั้น)

ลักษณะการทำงานสำคัญ:

- **การติดตั้งอัตโนมัติ** เมื่อใช้งานครั้งแรก OmniRoute จะดาวน์โหลดไบนารี `cloudflared`
  เวอร์ชันล่าสุดจาก GitHub releases อย่างเป็นทางการ (การติดตั้งที่จัดการโดยระบบอยู่ภายใต้
  `DATA_DIR/cloudflared/`) โดยจะตรวจสอบ SHA256 ของไฟล์ที่ดาวน์โหลดกับ
  release manifest ก่อนดำเนินการ
- **การกำกับดูแลโปรเซส** PID ของ cloudflared และ URL ที่ได้จะถูกบันทึกไว้ใน
  `quick-tunnel-state.json` เพื่อให้แดชบอร์ดสามารถแสดงสถานะต่อเนื่องเมื่อโหลดใหม่

### การตั้งค่า Named tunnel (ชื่อโฮสต์แบบคงที่)

1. สร้างอุโมงค์ที่จัดการภายในเครื่องด้วย cloudflared CLI (ทำครั้งเดียว):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. เขียนไฟล์ `~/.cloudflared/config.yml` เพื่อกำหนดเส้นทางชื่อโฮสต์ของคุณไปยังพอร์ต
   API ภายในเครื่องของ OmniRoute (ค่าเริ่มต้นคือ 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. กำหนดให้ OmniRoute ใช้การกำหนดค่าดังกล่าว แล้วเริ่มหรือเริ่มอุโมงค์ใหม่:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ไม่บังคับ — เขียนทับชื่อโฮสต์ที่ OmniRoute รายงาน มิฉะนั้นจะอ่านจาก
   # กฎ ingress แรกของการกำหนดค่า:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   เปิดใช้งานอุโมงค์ด้วยวิธีเดียวกับ quick tunnel (REST / แดชบอร์ด / CLI
   ด้านล่าง) Named tunnel จะไม่ส่ง URL สาธารณะออกมาให้ดึงข้อมูล ดังนั้นระบบจึงตรวจสอบ
   ความพร้อมจากการเชื่อมต่อ edge ที่ลงทะเบียนของ cloudflared และรายงาน `publicUrl`/`apiUrl`
   จาก `CLOUDFLARED_HOSTNAME` (หรือชื่อโฮสต์ ingress แรกของการกำหนดค่า)

### เปิด / ปิดใช้งานผ่าน REST

Endpoint ใช้ body แบบ `{action: "enable" | "disable"}` ไม่ใช่พาธ
`start`/`stop` แยกกัน และจำเป็นต้องมีการยืนยันตัวตนเพื่อการจัดการ (เซสชันผู้ดูแลระบบหรือคีย์ API ของผู้ดูแลระบบ)

```bash
# เปิดใช้งาน
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# สถานะ
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# ปิดใช้งาน
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

หรือผ่านแดชบอร์ด: **การตั้งค่า → อุโมงค์ → Cloudflare**

### ตัวแปรสภาพแวดล้อมที่เลือกใช้ได้

| ตัวแปร                                               | วัตถุประสงค์                                                                                                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | แทนที่พาธของไบนารี หากตั้งค่าไว้และใช้งานได้ OmniRoute จะใช้ไบนารีดังกล่าวแทนการดาวน์โหลด                                                                               |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | โปรโตคอลการรับส่งข้อมูล (ค่าเริ่มต้นคือ `http2`; รองรับ `quic` และ `auto` ด้วย)                                                                                         |
| `CLOUDFLARED_CONFIG`                                 | พาธไปยัง `config.yml` ของ cloudflared ที่จัดการภายในเครื่อง เมื่อตั้งค่าแล้ว OmniRoute จะเรียกใช้ทันเนลแบบ **มีชื่อ/ถาวร** (`tunnel --config <path> run`) แทนทันเนลด่วน |
| `CLOUDFLARED_HOSTNAME`                               | แทนที่ชื่อโฮสต์สาธารณะที่รายงานโดยทันเนลแบบมีชื่อ (เช่น `ai.example.com`) หากไม่ได้ตั้งค่า ระบบจะอ่านจากชื่อโฮสต์ `ingress` รายการแรกในไฟล์กำหนดค่า                     |

## 2. ngrok

`src/lib/ngrokTunnel.ts` ใช้ **SDK `@ngrok/ngrok`** (ทำงานภายในโปรเซสโดยไม่เรียกใช้โปรเซสย่อยของ CLI) โมดูลเนทีฟจะถูกนำเข้าแบบ Lazy เมื่อเริ่มต้นใช้งานครั้งแรก เพื่อไม่ให้แพลตฟอร์มที่ไม่มีไบนารีที่คอมไพล์ไว้ล่วงหน้าทำให้แอปใช้งานไม่ได้ตั้งแต่ตอนบูต

### ข้อกำหนดเบื้องต้น

1. สมัครใช้งานที่ <https://ngrok.com>
2. คัดลอก authtoken จากแดชบอร์ด ngrok
3. ระบุโทเค็นผ่านวิธีใดวิธีหนึ่งต่อไปนี้:
   - `.env`: `NGROK_AUTHTOKEN=<token>` หรือ
   - แดชบอร์ด: **Settings → Tunnels → ngrok** หรือ
   - เนื้อหา REST (ใช้ครั้งเดียว): `{"action":"enable","authToken":"<token>"}`

หากไม่ได้กำหนดค่าด้วยวิธีใดเลย สถานะจะส่งคืน `phase: "needs_auth"`

### เปิดใช้งาน / ปิดใช้งานผ่าน REST

```bash
# เปิดใช้งาน (ใช้ NGROK_AUTHTOKEN จาก env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# เปิดใช้งานโดยระบุโทเค็นโดยตรง
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# สถานะ
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# ปิดใช้งาน
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

การตอบกลับจะมี `publicUrl` ที่ได้รับการกำหนด (เช่น
`https://abcd-1234.ngrok-free.app`) โดเมนที่กำหนดเอง ภูมิภาค และกฎนโยบาย
ต้องได้รับการกำหนดค่าในแดชบอร์ด ngrok โดย OmniRoute มีหน้าที่เพียงส่งต่อ
URL เป้าหมายภายในเครื่องไปยัง SDK เท่านั้น

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` ควบคุม CLI `tailscale` ของระบบเพื่อเปิดเผย
พอร์ต API ภายในเครื่องผ่าน **Funnel** (ช่องทางออกสู่อินเทอร์เน็ตสาธารณะของ Tailscale สำหรับ serve)
โดยรองรับวงจรการทำงานทั้งหมด ได้แก่ การติดตั้ง การเข้าสู่ระบบ การเริ่มต้นดีมอน การเปิดใช้งาน และการปิดใช้งาน

การนำไปใช้จะเรียกใช้ `tailscale funnel --bg <port>` (โหมดเบื้องหลัง) โดย
URL สาธารณะจะมีรูปแบบ `https://<machine>.<tailnet>.ts.net/`

### ข้อกำหนดเบื้องต้น

1. ติดตั้ง Tailscale (หรือให้ OmniRoute ติดตั้งให้ — ดู endpoint `install` ด้านล่าง)
2. ลงชื่อเข้าใช้ (`tailscale login` หรือผ่าน endpoint `login` ของ OmniRoute)
3. เปิดใช้งาน Funnel สำหรับ tailnet ของคุณในคอนโซลผู้ดูแลระบบ Tailscale:
   <https://login.tailscale.com/admin/settings/features>

บน Linux และ macOS ดีมอน (`tailscaled`) ต้องใช้ `sudo` เพื่อควบคุม
endpoint แบบ POST รองรับฟิลด์ `sudoPassword` ที่ไม่บังคับ ซึ่งจะถูกส่งต่อไปยัง
แคชรหัสผ่าน MITM ของ OmniRoute (`getCachedPassword` / `setCachedPassword`) ตลอด
ระยะเวลาของการเรียกใช้งาน ส่วน Windows จะใช้บริการที่ติดตั้งตามค่าเริ่มต้นที่
`C:\Program Files\Tailscale\tailscale.exe`

### endpoint REST

Tailscale มีส่วนติดต่อที่ครอบคลุมกว่าแบ็กเอนด์อื่น เนื่องจากการติดตั้ง
การเข้าสู่ระบบ ดีมอน และทันเนลเป็นองค์ประกอบที่แยกจากกัน

| Endpoint                              | เมธอด  | วัตถุประสงค์                                                                         |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | สถานะทันเนลแบบรวม (`phase`, `tunnelUrl`, `apiUrl` ฯลฯ)                               |
| `/api/tunnels/tailscale/check`        | `GET`  | ตรวจสอบระดับล่าง: ติดตั้งแล้วหรือยัง? เข้าสู่ระบบแล้วหรือยัง? ดีมอนทำงานอยู่หรือไม่? |
| `/api/tunnels/tailscale/install`      | `POST` | ติดตั้ง Tailscale (เหตุการณ์ความคืบหน้าที่สตรีมผ่าน SSE) — Linux/macOS               |
| `/api/tunnels/tailscale/start-daemon` | `POST` | เริ่มต้น `tailscaled` บน Linux/macOS                                                 |
| `/api/tunnels/tailscale/login`        | `POST` | เริ่มขั้นตอนการเข้าสู่ระบบ โดยส่งคืน `authUrl` เพื่อเปิดในเบราว์เซอร์                |
| `/api/tunnels/tailscale/enable`       | `POST` | เริ่ม Funnel สำหรับพอร์ต API                                                         |
| `/api/tunnels/tailscale/disable`      | `POST` | หยุด Funnel                                                                          |

endpoint ทั้งหมดของ Tailscale ต้องใช้การยืนยันตัวตนสำหรับการจัดการ (ดู `routeUtils.ts ::
requireTailscaleAuth`)

ตัวอย่างการเปิดใช้งาน:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

หากยังไม่ได้เปิดใช้งาน Funnel ในคอนโซลผู้ดูแลระบบ การตอบกลับจะมี
`funnelNotEnabled: true` พร้อมกับ `enableUrl` สำหรับเปิดในเบราว์เซอร์

### ตัวแปร env ที่ไม่บังคับ

| ตัวแปร          | วัตถุประสงค์                |
| --------------- | --------------------------- |
| `TAILSCALE_BIN` | แทนที่พาธไบนารี `tailscale` |

## สรุป Endpoint

| Endpoint                              | เมธอด  | Body                                | การยืนยันตัวตน |
| ------------------------------------- | ------ | ----------------------------------- | -------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management     |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management     |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management     |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management     |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management     |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management     |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management     |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management     |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management     |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management     |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management     |

ไม่มี Endpoint กลาง `/api/settings/tunnels` — Backend แต่ละรายการทำงานแยกจากกัน

## ข้อควรพิจารณาเกี่ยวกับ Callback ของ OAuth

เมื่อคุณเปิดให้เข้าถึง OmniRoute ผ่าน Tunnel แดชบอร์ดและขั้นตอน OAuth จะต้อง
สร้าง URL สำหรับ Callback โดยอ้างอิง Hostname **สาธารณะ** ไม่ใช่ `localhost` มิฉะนั้น
ผู้ให้บริการ OAuth จะเปลี่ยนเส้นทางผู้ใช้กลับไปยัง URL ที่เซิร์ฟเวอร์ของผู้ให้บริการไม่สามารถเข้าถึงได้
และการจับมือเชื่อมต่อจะล้มเหลว

การแก้ไขผ่านแดชบอร์ดและการบันทึกการตั้งค่าไม่จำเป็นต้องกำหนด Hostname ของ Tunnel แบบตายตัวใน
`NEXT_PUBLIC_BASE_URL` แดชบอร์ดที่ผ่านการยืนยันตัวตนจะส่งคำขอแบบ Same-origin ที่ไม่ปลอดภัย
พร้อมโทเค็น CSRF ที่ผูกกับเซสชัน ดังนั้น Host ของ Cloudflare Quick Tunnel
แบบชั่วคราวจึงยังสามารถใช้สำหรับการจัดการ UI ตามปกติหลังจากเข้าสู่ระบบแล้วได้

ตั้งค่า:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

แล้วรีสตาร์ต OmniRoute ก่อนเริ่มต้น OAuth สำหรับ Cloudflare Quick
Tunnel แบบชั่วคราว URL จะเปลี่ยนหลังการรีสตาร์ตทุกครั้ง ดังนั้นสำหรับการใช้งาน OAuth
ในระบบ Production ควรเลือกใช้ ngrok พร้อมโดเมนที่จองไว้ หรือ Tailscale Funnel

## สถานะการทำงานและการตรวจสอบ

แดชบอร์ดแสดงสถานะของ Tunnel ภายใต้ **Settings → Tunnels**:

- Backend ที่ทำงานอยู่และ `phase` ปัจจุบัน (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)
- URL สาธารณะปัจจุบันและ URL ของ API ที่คำนวณได้ (`<publicUrl>/v1`)
- URL เป้าหมายภายในเครื่องที่ Tunnel กำลังส่งต่อไป
- ข้อความแสดงข้อผิดพลาดล่าสุด หากมี

สำหรับการตรวจสอบด้วยโปรแกรม ให้ Poll Endpoint `GET` ของแต่ละ Backend สามารถใช้งาน
Backend มากกว่าหนึ่งรายการพร้อมกันได้ โดย OmniRoute จะติดตามแต่ละรายการ
แยกจากกัน

## การแก้ไขปัญหา

### "ไม่พบ Binary ของ cloudflared"

OmniRoute จะพยายามติดตั้งโดยอัตโนมัติเมื่อใช้งานครั้งแรก หากการติดตั้งถูกบล็อก
(เครือข่ายถูกจำกัดหรือไม่สามารถเข้าถึง GitHub ได้) ให้ดาวน์โหลด `cloudflared` ด้วยตนเองจาก
<https://github.com/cloudflare/cloudflared/releases> และตั้งค่า
`CLOUDFLARED_BIN=/path/to/cloudflared`

### "ngrok: ต้องระบุ authtoken"

`phase: "needs_auth"` หมายความว่าไม่พบ authtoken ให้ตั้งค่า `NGROK_AUTHTOKEN` ใน
`.env` กำหนดค่าผ่านแดชบอร์ด หรือส่ง `authToken` ใน Body ของ POST สำหรับเปิดใช้งาน

### "tailscale: ไม่ได้เปิดใช้งาน funnel"

เมื่อ Response สำหรับเปิดใช้งานมี `funnelNotEnabled: true` แสดงว่า Funnel ถูกปิดใช้งาน
สำหรับ Tailnet ของคุณ ให้เปิด `enableUrl` ที่ส่งกลับมา (หรือหน้าฟีเจอร์ในคอนโซลผู้ดูแลระบบ)
แล้วเปิด Funnel

### การเปลี่ยน URL ของ Tunnel ทำให้ OAuth ใช้งานไม่ได้

ใช้ ngrok พร้อมโดเมนที่จองไว้ หรือ Tailscale Funnel (ทั้งสองแบบมี URL คงที่ต่อโหนด)
Cloudflare Quick Tunnel เป็นแบบชั่วคราวโดยการออกแบบ และไม่แนะนำให้ใช้กับ
Callback ของ OAuth ที่ใช้งานระยะยาว

### Permission denied บน Linux/macOS สำหรับ Tailscale

`tailscaled` จำเป็นต้องใช้สิทธิ์ Root ให้ระบุ `sudoPassword` แก่ Endpoint POST ที่เกี่ยวข้อง
หรือรัน Daemon ด้วยตนเอง (`sudo systemctl start tailscaled`)

## ดูเพิ่มเติม

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — พร็อกซีขาออก (1proxy, SOCKS5, HTTP) สำหรับ
  ทราฟฟิกขาออก
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — รายการตัวแปรสภาพแวดล้อมทั้งหมด รวมถึง
  `NEXT_PUBLIC_BASE_URL`
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — ทางเลือกแทนการทำทันเนลสำหรับการโฮสต์
  สาธารณะที่เสถียร
- ซอร์ส: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`
