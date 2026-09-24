# 🐳 Docker Guide — OmniRoute (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> เอกสารอ้างอิงฉบับสมบูรณ์สำหรับการปรับใช้ด้วย Docker หากต้องการเริ่มต้นอย่างรวดเร็ว โปรดดู[ส่วน Docker ใน README](../README.md#-docker)

## สารบัญ

- [การรันอย่างรวดเร็ว](#quick-run)
- [การใช้ไฟล์สภาพแวดล้อม](#with-environment-file)
- [Docker Compose](#docker-compose)
- [โปรไฟล์ที่พร้อมใช้งาน](#available-profiles)
- [การกำหนดค่าเครื่องมือ CLI บนโฮสต์เมื่อ OmniRoute ทำงานใน Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose สำหรับการใช้งานจริง](#production-compose)
- [สเตจของ Dockerfile](#dockerfile-stages)
- [ตัวแปรสภาพแวดล้อมที่สำคัญ](#critical-environment-variables)
- [Docker Compose พร้อม Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [แท็กอิมเมจ](#image-tags)
- [ความพร้อมใช้งาน: SQLite เริ่มต้นรองรับเพียงเรพลิกาเดียว](#availability-default-sqlite-is-single-replica)
- [หมายเหตุสำคัญ](#important-notes)

---

## เริ่มใช้งานอย่างรวดเร็ว

> **โฮสต์ด้วยตนเองในคำสั่งเดียว?** โปรดดู
> [คู่มือการโฮสต์ด้วยตนเอง](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (อิมเมจที่เผยแพร่แล้ว +
> Redis, เฉพาะลูปแบ็ก, ไม่มีการเลือกโปรไฟล์) ส่วนการเริ่มใช้งานอย่างรวดเร็วด้านล่างคือ
> วิธีใช้งานแบบคอนเทนเนอร์เดียวสำหรับผู้ใช้ที่ใช้งาน Redis ที่อื่นอยู่แล้ว

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## การใช้ไฟล์สภาพแวดล้อม

```bash
# คัดลอกและแก้ไข .env ก่อน
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# โปรไฟล์พื้นฐาน (ไม่มีเครื่องมือ CLI)
docker compose --profile base up -d

# โปรไฟล์ CLI (มี Claude Code, Codex และ OpenClaw ในตัว)
docker compose --profile cli up -d

# โปรไฟล์โฮสต์ (เน้น Linux เป็นหลัก โดยเมานต์ไบนารี CLI ของโฮสต์แบบอ่านอย่างเดียว)
docker compose --profile host up -d

# โปรไฟล์เว็บ (Chromium/Playwright สำหรับผู้ให้บริการเซสชันเว็บ)
docker compose --profile web up -d

# ใช้ CLI ร่วมกับไซด์คาร์ CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## โปรไฟล์ที่พร้อมใช้งาน

OmniRoute มีโปรไฟล์ Compose สำหรับรูปแบบการติดตั้งใช้งานหลัก ๆ ให้เลือกโปรไฟล์ที่ตรงกับสภาพแวดล้อมของคุณ

| โปรไฟล์              | บริการ           | ควรใช้เมื่อ                                                                                                                                       | คำสั่ง                                       |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ค่าเริ่มต้น) | `omniroute-base` | เซิร์ฟเวอร์แบบไม่มีอินเทอร์เฟซผู้ใช้ / รันไทม์ขั้นต่ำ โดยไม่มี CLI ของผู้ให้บริการรวมมาให้                                                        | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | เวิร์กโฟลว์แบบเอเจนต์ที่เรียกใช้ `omniroute providers/setup/doctor` และ CLI ที่รวมมาให้ (Codex, Claude Code, Droid, OpenClaw)                     | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | โฮสต์ Linux ที่ต้องการเข้าถึง CLI บนโฮสต์ในลักษณะคล้าย `network_mode` โดยเมานต์ `~/.local/bin`, `~/.codex`, `~/.claude` เป็นต้น แบบอ่านอย่างเดียว | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | รันไซด์คาร์ [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) บนพอร์ต `8317` สำหรับพร็อกซี CLI ต้นทาง                                   | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | ผู้ให้บริการผ่านเซสชันเว็บที่ต้องใช้เบราว์เซอร์: `gemini-web`, `claude-web`, `claude-turnstile` (บิลด์ `runner-web` และรวม Chromium ไว้ด้วย)      | `docker compose --profile web up -d`         |

> สามารถใช้หลายโปรไฟล์ร่วมกันได้: `docker compose --profile cli --profile cliproxyapi up -d`

## การกำหนดค่าเครื่องมือ CLI บนโฮสต์เมื่อ OmniRoute ทำงานใน Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` และปุ่ม
**บันทึกการกำหนดค่า** บนแดชบอร์ด ล้วนเขียนไฟล์ เช่น `~/.codex/*.config.toml` พาธเหล่านั้น
จะมีความหมายเฉพาะบนเครื่องที่ CLI ทำงานอยู่จริงเท่านั้น หากเรียกใช้คำสั่งเหล่านี้ภายใน
คอนเทนเนอร์ การเขียนจะเกิดขึ้นในโฮมของคอนเทนเนอร์เอง (`/home/node` —
อิมเมจทำงานด้วย `USER node`) ซึ่ง CLI บนโฮสต์จะไม่มีวันอ่าน และข้อมูลจะถูก
ทิ้งทันทีที่สร้างคอนเทนเนอร์ขึ้นมาใหม่

OmniRoute ตรวจพบกรณีนี้และปฏิเสธการเขียนพร้อมแสดงคำแนะนำ แทนที่จะ
รายงานว่าสำเร็จทั้งที่คุณใช้งานไม่ได้ โดย CLI จะจบการทำงานด้วย `2` และ API จะตอบกลับด้วย `422`
พร้อม `containerEphemeralTarget: true`

### แนะนำ: เรียกใช้ CLI บนโฮสต์ และเรียกใช้ OmniRoute ใน Docker

คอนเทนเนอร์ให้บริการ API ส่วน CLI ใช้กำหนดค่าเครื่องมือบนโฮสต์ของคุณ

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ให้ CLI เชื่อมต่อกับคอนเทนเนอร์
omniroute setup-codex                      # เขียนไปยัง ~/.codex จริงบนโฮสต์ของคุณ
```

นี่เป็นตัวเลือกที่เหมาะสมเมื่อ Codex, Claude Code, Cursor หรือเครื่องมือที่คล้ายกันทำงานบน
แล็ปท็อปของคุณ ซึ่งเป็นรูปแบบการใช้งานตามปกติ

### ทางเลือก: bind-mount ไดเรกทอรีการกำหนดค่าของโฮสต์ (โปรไฟล์ `host`)

หากคุณต้องการให้คอนเทนเนอร์เขียนการกำหนดค่าบนโฮสต์ ให้เมานต์
ไดเรกทอรีเหล่านั้นเข้ามา และตั้งค่า `CLI_CONFIG_HOME` ให้ชี้ไปยังรากของเมานต์ โปรไฟล์ `host`
ได้ดำเนินการดังกล่าวไว้แล้ว:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount เป็นสิ่งที่ทำให้พาธเชื่อถือได้: OmniRoute อ่าน
`/proc/self/mountinfo` และอนุญาตให้เขียนไปยังพาธที่ถูกเมานต์ (รวมถึงไดเรกทอรี
ที่มีรายการลูกเป็นเมานต์ ซึ่งตรงกับโครงสร้าง `/host-home` ด้านบนพอดี) ขณะเดียวกัน
ยังคงปฏิเสธพาธที่ไม่ได้ถูกเมานต์

### ทางเลือกฉุกเฉิน: กำหนดค่า CLI ของคอนเทนเนอร์เอง (ควรใช้อย่างจำกัด)

เมื่อ CLI อยู่ภายในคอนเทนเนอร์จริง ๆ (โปรไฟล์ `cli`) การเขียนดังกล่าว
ถือเป็นสิ่งที่ตั้งใจไว้ ให้ส่ง `--allow-container-write` ไปยังคำสั่ง `setup-*` ใด ๆ หรือตั้งค่า
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` สำหรับเซิร์ฟเวอร์ การเขียนจะดำเนินต่อไป
พร้อมคำเตือนว่าข้อมูลจะไม่คงอยู่หลังจากคอนเทนเนอร์สิ้นสุดลง

> **คำเตือนด้านความปลอดภัย — โปรไฟล์ `cli` + การเมานต์ `docker.sock`**
> โปรไฟล์ `cli` ทำ bind-mount `/var/run/docker.sock` เพื่อให้ตัวอัปเดตอัตโนมัติ
> ภายในคอนเทนเนอร์สามารถสร้างสแต็กขึ้นใหม่ผ่านดีมอนบนโฮสต์
> (`src/lib/system/autoUpdate.ts` จะตรวจสอบซ็อกเก็ตดังกล่าวและข้ามเส้นทาง
> Docker เมื่อไม่พบซ็อกเก็ต) ซ็อกเก็ตนั้นเป็น **ขอบเขตความไว้วางใจระดับ root
> ของโฮสต์**: ทุกสิ่งที่เข้าถึงซ็อกเก็ตได้จะสามารถควบคุม Docker daemon บนโฮสต์ในฐานะ
> root ได้ ซึ่งหมายความว่าสามารถสร้าง ตรวจสอบ หยุด และลบคอนเทนเนอร์ใด ๆ บนโฮสต์ได้
> ผลกระทบมีดังนี้:
>
> 1. **ห้ามเปิดเผยพอร์ตของโปรไฟล์ `cli` สู่เครือข่ายโดยเด็ดขาด** ให้เผยแพร่
>    พอร์ตบน `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — โปรไฟล์ `cli` ที่เข้าถึงได้จาก LAN จะเปลี่ยนช่องโหว่ RCE ระดับแดชบอร์ดให้กลายเป็น
>    การยึดครองโฮสต์อย่างสมบูรณ์
> 2. **อย่าผูกไดเรกทอรีอื่นใดจากโฮสต์เพิ่มเติมเข้ากับโปรไฟล์ `cli`**
>    Docker socket ร่วมกับเมานต์เพิ่มเติมใด ๆ จะทำให้คอนเทนเนอร์มีสิทธิ์
>    อ่าน/เขียนระบบไฟล์และการกำหนดค่าของโฮสต์อย่างเต็มรูปแบบ หากคุณต้องการให้เครื่องมือ
>    เข้าถึงโปรเจกต์ ให้เรียกใช้เครื่องมือนั้นในเครื่องด้วยไบนารี CLI — อย่าเมานต์โปรเจกต์
>    เข้าไปในคอนเทนเนอร์ `cli`
>
> หากคุณไม่ต้องการอัปเดตอัตโนมัติภายในคอนเทนเนอร์ ให้ปิดโปรไฟล์ `cli`
> (`COMPOSE_PROFILES=core,redis` หรือค่าที่สั้นกว่านั้น) โปรไฟล์อื่น ๆ จะไม่
> เมานต์ Docker socket
>
> โปรดดู `docs/security/MITM-TPROXY-DECRYPT.md` (อยู่ใน git; ไม่ได้คอมไพล์รวมไว้ใน `/docs`) สำหรับโมเดลภัยคุกคามที่เกี่ยวข้อง
> กับ MITM และดู `docs/security/SUPPLY_CHAIN.md` สำหรับสายโซ่แหล่งที่มาของไบนารี
> `codex`/`claude-code`/`droid`/`openclaw`

## Redis Sidecar

OmniRoute ใช้ Redis เป็นระบบเบื้องหลังสำหรับตัวจำกัดอัตราแบบกระจายและแคชที่ใช้ร่วมกัน บริการ `redis` จะถูกกำหนดไว้ใน `docker-compose.yml` **เสมอ** (ไม่มีการควบคุมด้วยโปรไฟล์) และจะเริ่มทำงานพร้อมกับโปรไฟล์อื่นใดก็ตาม

| รายละเอียด                       | ค่า                                            |
| -------------------------------- | ---------------------------------------------- |
| อิมเมจ                           | `redis:7-alpine`                               |
| ชื่อคอนเทนเนอร์                  | `omniroute-redis`                              |
| พอร์ตภายใน                       | `6379`                                         |
| พอร์ตโฮสต์ (กำหนดทับ)            | `REDIS_PORT` (ค่าเริ่มต้นคือ `6379`)           |
| ที่อยู่โฮสต์สำหรับผูก (กำหนดทับ) | `REDIS_BIND_HOST` (ค่าเริ่มต้นคือ `127.0.0.1`) |
| โวลุ่ม                           | `omniroute-redis-data` → `/data`               |
| การตรวจสอบสถานะ                  | `redis-cli ping` (ทุก 10 วินาที)               |

ตัวแปรสภาพแวดล้อมที่เกี่ยวข้อง:

- `REDIS_URL` — สตริงการเชื่อมต่อที่ส่งเข้าไปยังแอป (ค่าเริ่มต้นคือ `redis://redis:6379`)
- `REDIS_PORT` — การแมปพอร์ตฝั่งโฮสต์สำหรับคอนเทนเนอร์ Redis
- `REDIS_BIND_HOST` — อินเทอร์เฟซของโฮสต์ที่ใช้เผยแพร่พอร์ต ค่าเริ่มต้นคือ `127.0.0.1`

> **เหตุผลที่ใช้ลูปแบ็กเป็นค่าเริ่มต้น:** sidecar ทำงานโดยไม่มี `requirepass` และคอนเทนเนอร์
> ของแอปเข้าถึง Redis ผ่านเครือข่าย compose (`redis:6379`) — พอร์ตที่เผยแพร่มีไว้สำหรับ
> เครื่องมือฝั่งโฮสต์เท่านั้น (`redis-cli`, `npm run dev` ภายในเครื่อง) การเผยแพร่บน
> `0.0.0.0` จะทำให้ทุกโฮสต์ใน LAN ของคุณเข้าถึง Redis ที่ไม่มีการยืนยันตัวตนได้ หากคุณตั้งค่า
> `REDIS_BIND_HOST=0.0.0.0` ให้เพิ่ม `--requirepass` ลงใน `command:` ของบริการด้วย

ไม่แนะนำให้ **ปิดใช้งาน Redis** (ตัวจำกัดอัตราจะลดระดับไปใช้ระบบสำรองในหน่วยความจำ) หากจำเป็น ให้ลบหรือใส่ความคิดเห็นปิดบล็อกบริการ `redis:` ใน `docker-compose.yml` หรือปรับขนาดเป็นศูนย์:

```bash
docker compose up -d --scale redis=0
```

## Compose สำหรับโปรดักชัน

สำหรับสแนปช็อตโปรดักชันแบบแยกส่วนที่ทำงานควบคู่กับสภาพแวดล้อมการพัฒนา ให้ใช้ `docker-compose.prod.yml`

| รายละเอียด            | ค่า                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------- |
| ไฟล์                  | `docker-compose.prod.yml`                                                                 |
| พอร์ตแดชบอร์ดเริ่มต้น | `PROD_DASHBOARD_PORT=20130` (แมปไปยังพอร์ตภายใน `${DASHBOARD_PORT:-20128}`)               |
| พอร์ต API เริ่มต้น    | `PROD_API_PORT=20131`                                                                     |
| อิมเมจ                | `omniroute:prod` (สร้างจากเป้าหมาย `runner-cli`)                                          |
| คอนเทนเนอร์ Redis     | `omniroute-redis-prod` (`redis:8.6.2`, ใช้โวลุ่ม `redis-prod-data` โดยเฉพาะ)              |
| โวลุ่มข้อมูล          | `omniroute-prod-data` (มีชื่อและคงอยู่ข้ามการสร้างใหม่)                                   |
| การตรวจสอบสถานะ       | `node healthcheck.mjs` + `redis-cli ping` โดยมี `depends_on` ที่ขึ้นอยู่กับสถานะของ Redis |

วิธีใช้งาน:

```bash
# สร้างและเริ่มต้นสแต็กโปรดักชัน
docker compose -f docker-compose.prod.yml up -d --build

# สตรีมบันทึก
docker compose -f docker-compose.prod.yml logs -f

# ปิดสแต็ก (เก็บโวลุ่มไว้)
docker compose -f docker-compose.prod.yml down
```

สแต็กโปรดักชันทำงานคู่ขนานกับ compose สำหรับการพัฒนา (ใช้ชื่อคอนเทนเนอร์ พอร์ต และโวลุ่มที่แตกต่างกัน) ดังนั้นคุณจึงสามารถพัฒนาและปรับปรุงภายในเครื่องต่อไปได้ ขณะที่ระบบโปรดักชันยังคงทำงานอยู่

## สเตจของ Dockerfile

รีโพซิทอรีมาพร้อมกับ Dockerfile แบบหลายสเตจ (`Dockerfile`) โดยมีสี่สเตจให้เลือกใช้ โปรดเลือก `target` ที่เหมาะกับกรณีใช้งานของคุณ

| สเตจ          | อิมเมจพื้นฐาน         | วัตถุประสงค์                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ติดตั้ง dependencies (`npm ci --legacy-peer-deps`) และเรียกใช้ `npm run build` (ใช้ Turbopack ตามค่าเริ่มต้น — ดูหัวข้อทรัพยากรขณะบิลด์ด้านล่าง)                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | รันไทม์สำหรับ production พร้อมเอาต์พุตแบบ standalone ของ Next.js **ไม่รวม CLI ของผู้ให้บริการใดๆ**                                                                                                                                                                                             |
| `runner-cli`  | `runner-base`         | เพิ่ม `git`, `docker.io`, `docker-compose` และ CLI แบบ global ได้แก่ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw` **เลือกสเตจนี้สำหรับเวิร์กโฟลว์แบบ agentic**                                                                                                            |
| `runner-web`  | `runner-base`         | เพิ่ม Playwright และเบราว์เซอร์ Chromium (`--with-deps`) สำหรับผู้ให้บริการเว็บเซสชัน ได้แก่ `gemini-web`, `claude-web`, `claude-turnstile` **เลือกสเตจนี้เมื่อคุณใช้ผู้ให้บริการเหล่านั้น** — อิมเมจแบบธรรมดาจะล้มเหลวขณะส่งคำขอหากไม่มีสิ่งนี้ (ดูหมายเหตุ `-web` ในหัวข้อช่องทางการเผยแพร่) |

บิลด์ target ที่ระบุด้วยตนเอง:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ทรัพยากรขณะบิลด์

build args สามรายการควบคุมการใช้ทรัพยากรของสเตจ `builder` โดยมีผลเฉพาะขณะบิลด์เท่านั้น —
`OMNIROUTE_MEMORY_MB` (ด้านล่าง) เป็นตัวปรับสำหรับรันไทม์ที่แยกจากกัน

| Build arg                   | ค่าเริ่มต้น | ผลกระทบ                                                                                   |
| --------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`         | `0` จะบิลด์ด้วย webpack แทน ใช้หน่วยความจำสูงสุดน้อยกว่า แต่ช้ากว่า                       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | ขีดจำกัด heap ของ V8 (`--max-old-space-size`) สำหรับ `next build` ที่ถูกสร้างขึ้น         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | ป้อนค่าให้ `CIRCLE_NODE_TOTAL`; Next คำนวณ `workers = N - 1` สำหรับการรวบรวมข้อมูลของหน้า |

`OMNIROUTE_BUILD_WORKERS` คือตัวที่ควรเพิ่มเมื่อใช้เครื่องบิลด์ขนาดใหญ่ และเป็นตัวที่ควร
สงสัยเมื่อการบิลด์บนระบบที่มีทรัพยากรจำกัดล้มเหลว **หลังจาก** `✓ Compiled successfully`
worker สำหรับข้อมูลแต่ละหน้าเป็น process แยกกัน และ process หลักของ `next build` เองก็เช่นกัน
การจำลองปัญหาบน VPS จริง (ปัญหา #7518) วัดค่า RSS สูงสุดของแต่ละ process ได้ที่
~4.5 GB โดยไม่ขึ้นกับแฟล็ก heap ของ `NODE_OPTIONS` (Turbopack คอมไพล์โดยใช้
หน่วยความจำ native/Rust ซึ่งอยู่นอก V8 heap) ค่าเริ่มต้น `2` (→ 1 worker รวมทั้งหมด 2
process) ถูกกำหนดให้เหมาะกับ runner ที่โฮสต์โดย GitHub ซึ่งมี RAM 16 GB / 4 vCPU และถูกใช้โดย
pipeline สำหรับเผยแพร่ ที่ค่า `8` (→ 7 workers) runner ดังกล่าวมีหน่วยความจำไม่เพียงพอ และ
buildkit ทำขั้นตอนนั้นล้มเหลวพร้อมข้อความ `ResourceExhausted: ... cannot allocate memory`;
ค่า `3` (→ 2 workers) ยังคงใช้พื้นที่ไม่พอ เมื่อวัด RSS ต่อ process โดยตรง
แทนการอนุมาน `tests/unit/docker-build-memory-budget.test.ts`
จะคำนวณกับค่าที่วัดได้และล้มเหลวหากตัวปรับใดตัวปรับหนึ่ง
เกินขีดจำกัดของ runner

Turbopack คอมไพล์โดยใช้หน่วยความจำ native Rust ที่อยู่ **นอก** V8 heap ดังนั้น
`OMNIROUTE_BUILD_MEMORY_MB` จึงไม่สามารถจำกัดหน่วยความจำส่วนนั้นได้ บนโฮสต์ที่มีขีดจำกัดหน่วยความจำ
การบิลด์จะถูก OOM killer ส่ง SIGKILL โดยไม่มีข้อความข้อผิดพลาดใดๆ — กระบวนการจะ
หยุดกลางคันที่ `Creating an optimized production build` ซึ่งดูเหมือนค้าง
มากกว่าจะเป็นภาวะหน่วยความจำไม่เพียงพอ หากโฮสต์สำหรับบิลด์มีทรัพยากรจำกัด ให้เปลี่ยน bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

มีการเปิดใช้ `webpackBuildWorker` ดังนั้น `next build` จะเรียกใช้ทั้ง process หลัก **และ** process
ของ worker โดยแต่ละ process จะใช้ค่า `OMNIROUTE_BUILD_MEMORY_MB` แยกจากกัน กำหนดขีดจำกัดของคอนเทนเนอร์
ให้สูงกว่าค่านั้นประมาณสองเท่า ไม่ใช่เพียงหนึ่งเท่า

ค่าที่วัดได้บน tree นี้ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | ขีดจำกัดของคอนเทนเนอร์ | ผลลัพธ์                                   |
| --------- | ---------------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB         | ถูก OOM kill ที่ทั้งสองค่าโดยไม่มีข้อความ |
| webpack   | 8 GiB                  | build worker ถูกส่ง SIGKILL               |
| webpack   | 12 GiB                 | สำเร็จ โดยมีค่าสูงสุดที่ 11.1 GiB         |

### ค่าเริ่มต้นของรันไทม์

ค่าเริ่มต้นที่ export โดย `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`

ลักษณะการทำงานของหน่วยความจำใน Docker:

- อิมเมจตั้งค่า `OMNIROUTE_MEMORY_MB=1024` และกำหนด `NODE_OPTIONS=--max-old-space-size=1024` จากค่านี้
- โปรเซสเซิร์ฟเวอร์จริงเริ่มทำงานโดย standalone launcher ซึ่งอ่านค่า `OMNIROUTE_MEMORY_MB` และเพิ่ม `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`
- Node ใช้ค่า `--max-old-space-size` ตัวสุดท้ายเมื่อมีการระบุซ้ำ ดังนั้นการตั้งค่า `OMNIROUTE_MEMORY_MB` จึงควบคุมขีดจำกัดฮีปที่มีผลจริงใน Docker
- เนื่องจากอิมเมจตั้งค่านี้ไว้เสมอ ค่า fallback ของ launcher ที่ปรับตาม RAM จึงไม่ถูกนำมาใช้ภายใต้ Docker ให้เพิ่มค่านี้อย่างชัดเจนตามเวิร์กโหลด (ดูตารางด้านล่าง) ค่า `2048` ยังคงน้อยเกินไปสำหรับ `/v1/responses` ของ coding agent

### RAM ขณะรันไทม์สำหรับ coding agent

ค่าเริ่มต้น 1 GiB ของ Docker เป็นเพียงขั้นต่ำสำหรับแดชบอร์ด/แชตแบบเบา ไม่ใช่ขนาดสำหรับใช้งานจริงในระบบ production บอดีของ `POST /v1/responses` ที่ยาว (ข้อความหลายร้อยรายการ เครื่องมือหลายสิบรายการ) จะเก็บกราฟในหน่วยความจำหลายชุดระหว่างการบีบอัด คำขอที่ซ้อนทับกันสองรายการซึ่งแต่ละรายการมีขนาดประมาณ ~3 MiB / ~750k-token เคยทำให้ V8 ยุติการทำงานเมื่อ old-space อยู่ที่ **12 GiB** (`FATAL ERROR: Reached heap limit`) และยังทำให้เกิด cgroup OOM ที่ 16 GiB อีกด้วย ดู [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)

กำหนดขนาด **cgroup `--memory` ให้สูงกว่าฮีป** — เนทีฟบัฟเฟอร์, SQLite และข้อมูลตัวกลางระหว่างการบีบอัดอยู่นอก V8

| เวิร์กโหลด                                      | `OMNIROUTE_MEMORY_MB`         | คอนเทนเนอร์ / cgroup       | หมายเหตุ                                                                                                                         |
| ----------------------------------------------- | ----------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| แดชบอร์ด, แชตแบบเบาหนึ่งรายการ                  | `1024` (ค่าเริ่มต้นของอิมเมจ) | ≥2 GiB                     |                                                                                                                                  |
| coding agent หนึ่งตัว (Claude/Codex/Grok)       | `8192`                        | ≥10 GiB                    | `/v1/responses` แบบเซสชันเดียวโดยทั่วไป                                                                                          |
| `/v1/responses` แบบยาวสองรายการที่ทำงานพร้อมกัน | `10240`–`12288`               | ≥12–16 GiB                 | วัดพบว่า V8 ยุติการทำงานเมื่อฮีปอยู่ที่ ~12 GiB                                                                                  |
| บริบทยาวสามรายการขึ้นไปที่ทำงานพร้อมกัน         | อย่ารันในโปรเซสเดียว          | ทำงานแบบอนุกรม / เพิ่ม RAM | ค่าเริ่มต้นของการรับเวิร์กโหลดหนักคือให้ทำงานพร้อมกัน 1 รายการ; การเพิ่มค่านี้โดยไม่เพิ่ม RAM จะทำให้เกิดการยุติการทำงานอีกครั้ง |

เมื่อรัน `omniroute serve` บน bare metal ระบบจะปรับค่าเป็นประมาณ 35% ของ RAM (จำกัดให้อยู่ในช่วง `[512, 4096]`) เมื่อ **ไม่ได้ตั้งค่า** `OMNIROUTE_MEMORY_MB` Docker ตั้งค่าเป็น `1024` เสมอ ดังนั้นการปรับค่านี้จึงไม่เคยทำงานในอิมเมจอย่างเป็นทางการ

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## ตัวแปรสภาพแวดล้อมที่สำคัญ

นอกเหนือจากค่าเริ่มต้นที่ระบุไว้ใน [ENVIRONMENT.md](../reference/ENVIRONMENT.md) ตัวแปรต่อไปนี้มีความสำคัญที่สุดเมื่อใช้งานภายใต้ Docker:

| ตัวแปร                        | วัตถุประสงค์                                                                                                                                                                                                                                                                | ค่าเริ่มต้น               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ค่าลับที่ใช้ร่วมกันสำหรับบริดจ์ WebSocket **จำเป็นสำหรับระบบ production** — กำหนดเป็นสตริงสุ่มที่มีความปลอดภัยสูง                                                                                                                                                           | ไม่ได้กำหนด (ต้องระบุค่า) |
| `REDIS_URL`                   | สตริงการเชื่อมต่อสำหรับแบ็กเอนด์ตัวจำกัดอัตรา / แคช                                                                                                                                                                                                                         | `redis://redis:6379`      |
| `REDIS_PORT`                  | พอร์ตฝั่งโฮสต์สำหรับคอนเทนเนอร์ Redis ที่รวมมาให้                                                                                                                                                                                                                           | `6379`                    |
| `REDIS_BIND_HOST`             | อินเทอร์เฟซของโฮสต์ที่ใช้เผยแพร่พอร์ต Redis ที่รวมมาให้ (ผูกกับ loopback เว้นแต่คุณจะเพิ่ม AUTH)                                                                                                                                                                            | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | พาธบนโฮสต์ที่เมานต์เข้าในโปรไฟล์ `cli` ที่ `/workspace/omniroute` สำหรับเวิร์กโฟลว์การอัปเดตตัวเอง                                                                                                                                                                          | `.` (ไดเรกทอรีปัจจุบัน)   |
| `OMNIROUTE_MEMORY_MB`         | ขีดจำกัดฮีปของ Node ขณะรันสำหรับเซิร์ฟเวอร์ Docker แบบสแตนด์อโลน โดยจะเขียนทับค่าเริ่มต้นของอิมเมจข้างต้น สำหรับเอเจนต์เขียนโค้ด: `8192` ขึ้นไป (ดู [RAM ขณะรัน](#runtime-ram-for-coding-agents))                                                                           | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | เขียนทับพอร์ตที่เปิดเผยสำหรับแดชบอร์ด (20128) และ API (20129)                                                                                                                                                                                                               | `20128` / `20129`         |
| `APP_BIND_HOST`               | อินเทอร์เฟซของโฮสต์ที่ docker-compose ใช้เผยแพร่พอร์ตแดชบอร์ด/API/live-WS เมื่อ `REQUIRE_API_KEY=false` (ค่าเริ่มต้น) ค่า `0.0.0.0` จะเปิดเผยพร็อกซี `/v1` แบบไม่ระบุตัวตนแก่ LAN — ควรขยายการเข้าถึงเฉพาะเมื่อใช้ `REQUIRE_API_KEY=true` หรือมี reverse proxy อยู่ด้านหน้า | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | อินเทอร์เฟซของโฮสต์ที่ docker-compose ใช้เผยแพร่ sidecar `cliproxyapi` — โวลุ่มข้อมูลของ sidecar จะเก็บข้อมูลประจำตัวของผู้ให้บริการ                                                                                                                                        | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | ไดเรกทอรีที่ตัวสแกนปลั๊กอินขณะรันใช้อ่านและติดตั้งปลั๊กอินลงไป ให้กำหนดค่านี้เมื่อปลั๊กอินถูก bind-mount เนื่องจากค่าเริ่มต้นอ้างอิงตาม `HOME` ซึ่งอิมเมจอาจไม่ได้ export ไว้                                                                                               | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | พาธย่อยของ URL เมื่อแอปเผยแพร่ผ่าน reverse proxy (เช่น `/omniroute`)                                                                                                                                                                                                        | _(ว่าง = ราก)_            |
| `NEXT_PUBLIC_BASE_URL`        | origin สาธารณะสำหรับเบราว์เซอร์ รวมถึงพาธย่อย (เช่น `https://host/omniroute`)                                                                                                                                                                                               | ไม่ได้กำหนด               |
| `PROD_DASHBOARD_PORT`         | พอร์ตแดชบอร์ดฝั่งโฮสต์สำหรับ `docker-compose.prod.yml`                                                                                                                                                                                                                      | `20130`                   |
| `CLIPROXYAPI_PORT`            | พอร์ตฝั่งโฮสต์สำหรับ sidecar `cliproxyapi`                                                                                                                                                                                                                                  | `8317`                    |

## Reverse Proxy บนพาธย่อย (Traefik / nginx)

`basePath` ของ Next.js จะถูกคอมไพล์ลงในบันเดิลแบบ standalone โดย OmniRoute จะบันทึก
ค่าที่ฝังไว้ลงในไฟล์ sentinel ที่รากของแอป (เขียนระหว่าง `npm run build` และอ่านโดย
`scripts/docker/ensure-docker-base-path.mjs`) แล้วเปรียบเทียบกับ
`OMNIROUTE_BASE_PATH` เมื่อคอนเทนเนอร์เริ่มทำงาน เมื่อค่าแตกต่างกันและอิมเมจถูก
สร้างมาสำหรับรากของโดเมน entrypoint จะเขียน standalone manifests ใหม่ รวมถึง
ค่าลิเทอรัล `basePath`/`assetPrefix` ที่ฝังไว้ (Next 16 เรนเดอร์ URL ของแอสเซ็ต SSR จาก
`assetPrefix` เพียงอย่างเดียว — ตัวแพตช์จึงคัดลอกพาธย่อยไปยังค่านี้ด้วย), URL แอสเซ็ต
`/_next/static` ที่ฝังไว้ (client-reference manifests, การนำเข้าสื่อ, หน้าแสดง
ข้อผิดพลาดที่เรนเดอร์ไว้ล่วงหน้า) และ shim ของ `process.env` ฝั่งไคลเอนต์ ก่อนที่
`node dev/run-standalone.mjs` จะทำงาน

### การสร้างด้วย Compose (แนะนำ)

กำหนดตัวแปรทั้งสองใน `.env` แล้วสร้างใหม่เพื่อให้อิมเมจและรันไทม์ใช้ค่าตรงกัน:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ส่งต่อ `OMNIROUTE_BASE_PATH` ทั้งในรูปแบบ Docker build-arg และ
ตัวแปรสภาพแวดล้อมขณะรันไทม์

### อิมเมจสำหรับรากที่สร้างไว้ล่วงหน้า + พาธย่อยขณะรันไทม์

อิมเมจ `diegosouzapw/omniroute:*` ที่เผยแพร่ไว้ถูกสร้างมาสำหรับรากของโดเมน แต่คุณยังคง
สามารถกำหนด `OMNIROUTE_BASE_PATH` ขณะรันไทม์ได้ โดยคอนเทนเนอร์จะแพตช์บันเดิลหนึ่งครั้ง
เมื่อเริ่มทำงาน ให้ใช้ร่วมกับ public origin ที่ตรงกัน:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

กำหนดค่า reverse proxy ให้ส่งต่อพาธภายนอกแบบ **เต็มพาธ** (อย่าตัดคำนำหน้าออก)
Traefik ควรกำหนดเส้นทาง `PathPrefix(`/omniroute`)` ไปยังคอนเทนเนอร์โดยไม่มี
`StripPrefix` เพื่อให้ Next.js ได้รับ `/omniroute/...` และให้บริการแอสเซ็ตจาก
`/omniroute/_next/...`

healthcheck ของ Docker จะตรวจสอบ endpoint วงจรชีวิตแบบเบา `/healthz` ซึ่งมี
`OMNIROUTE_BASE_PATH` ที่ใช้งานอยู่เป็นคำนำหน้า ส่วน `/api/monitoring/health` ยังคง
พร้อมใช้งานสำหรับการวินิจฉัยโดยผู้ใช้/แดชบอร์ด หากต้องการให้ HEALTHCHECK ของคอนเทนเนอร์
กลับไปตรวจสอบ endpoint นี้ (เช่น เพื่อบังคับใช้การตรวจสอบสุขภาพเชิงลึก) ให้กำหนด
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` พาธดังกล่าวเป็นการตรวจสอบแบบ
**เชิงลึก** (DB + สรุปการมอนิเตอร์) ซึ่งเหมาะกับ `HEALTHCHECK` ของ Docker ที่ทำงาน
ไม่บ่อยนักหากคุณเลือกกลับมาใช้ แต่ **ไม่** เหมาะกับช่วงเวลาการตรวจสอบของ
`livenessProbe` ใน Kubernetes

สำหรับระบบออร์เคสตรา (Kubernetes, Nomad ฯลฯ):

| การตรวจสอบ         | ควรใช้                                                              | หลีกเลี่ยง                                                         |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Liveness           | HTTP `GET /livez` หรือ TCP บนพอร์ตหลัก (`PORT` ค่าเริ่มต้น `20128`) | ใช้ `/api/monitoring/health` เป็น liveness                         |
| Readiness          | HTTP `GET /healthz`                                                 | timeout ที่สั้นเกินไปจนถือว่า event loop ที่กำลังยุ่งนั้นหยุดทำงาน |
| เชิงลึก / blackbox | `/api/monitoring/health`                                            | —                                                                  |

`/healthz` รายงานวงจรชีวิตของโปรเซส (`ok` / `starting` / `stopping`) ส่วน `/livez`
ตรวจสอบเพียงว่าโปรเซสยังทำงานอยู่ (ส่งคืน 200 ทุกครั้งที่ handler สามารถทำงานได้
โดยไม่รอให้ระบบพร้อมให้บริการ) ทั้งสองยังคงทำงานบน Node event loop เดียวกับการจัดการ
คำขอ ดังนั้นงานแค็ตตาล็อกหรือการบีบอัดที่ใช้ CPU สูงอาจทำให้การตอบสนองล่าช้าได้ —
ยุ่ง ≠ หยุดทำงาน หากการตรวจสอบผ่าน HTTP หมดเวลา ควรเลือกใช้ liveness ผ่าน TCP
คำแนะนำฉบับเต็มเกี่ยวกับการตรวจสอบ:
[คู่มือการมอนิเตอร์ — คำแนะนำสำหรับการตรวจสอบ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose พร้อม Caddy (HTTPS Auto-TLS)

สามารถเปิดให้เข้าถึง OmniRoute ได้อย่างปลอดภัยโดยใช้การจัดเตรียม SSL อัตโนมัติของ Caddy ตรวจสอบให้แน่ใจว่า DNS A record ของโดเมนชี้ไปยัง IP ของเซิร์ฟเวอร์ของคุณ

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # ต้นทางที่เบราว์เซอร์เข้าถึงสำหรับ OAuth callbacks, ลิงก์แดชบอร์ด และ URL สาธารณะที่สร้างขึ้น
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ภายในสำหรับการสื่อสารระหว่างเซิร์ฟเวอร์ ซึ่งใช้กับงานตามกำหนดเวลา / การดึงข้อมูลจากตัวเอง
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy จะตั้งค่าส่วนหัวการส่งต่อตามมาตรฐานให้กับคอนเทนเนอร์ต้นทาง OmniRoute ใช้
`NEXT_PUBLIC_BASE_URL` เป็น public origin หลักสำหรับ OAuth callbacks และลิงก์สาธารณะที่สร้างขึ้น
การเขียนข้อมูลผ่านแดชบอร์ดที่ผ่านการตรวจสอบสิทธิ์จะใช้คำขอแบบ same-origin ร่วมกับการป้องกัน CSRF
ที่ผูกกับเซสชัน เปิดใช้ `OMNIROUTE_TRUST_PROXY` เฉพาะในการปรับใช้ขั้นสูงที่คุณตั้งใจ
ให้ OmniRoute อนุมาน public origin จากส่วนหัวที่ส่งต่อและเชื่อถือได้แทนการกำหนดค่า
อย่างชัดเจนเท่านั้น

## Cloudflare Quick Tunnel

การรองรับแดชบอร์ดสำหรับการปรับใช้ด้วย Docker มี **Cloudflare Quick Tunnel** ที่เปิดใช้งานได้ในคลิกเดียวบน `Dashboard → Endpoints` การเปิดใช้งานครั้งแรกจะดาวน์โหลด `cloudflared` เฉพาะเมื่อจำเป็น เริ่ม tunnel ชั่วคราวไปยัง endpoint `/v1` ปัจจุบันของคุณ และแสดง URL `https://*.trycloudflare.com/v1` ที่สร้างขึ้นไว้ใต้ URL สาธารณะปกติของคุณโดยตรง

แผง tunnel ของ endpoint (Cloudflare, Tailscale, ngrok) สามารถแสดงหรือซ่อนได้จาก `Settings → Appearance` โดยไม่เปลี่ยนสถานะของ tunnel ที่กำลังทำงานอยู่

### หมายเหตุเกี่ยวกับ Tunnel

- URL ของ Quick Tunnel เป็นแบบชั่วคราวและจะเปลี่ยนทุกครั้งที่รีสตาร์ต
- Quick Tunnel จะไม่ถูกกู้คืนโดยอัตโนมัติหลังจากรีสตาร์ต OmniRoute หรือคอนเทนเนอร์ ให้เปิดใช้งานอีกครั้งจากแดชบอร์ดเมื่อต้องการ
- ปัจจุบันการติดตั้งแบบมีการจัดการรองรับ Linux, macOS และ Windows บน `x64` / `arm64`
- Quick Tunnel แบบมีการจัดการจะใช้การรับส่งข้อมูลผ่าน HTTP/2 เป็นค่าเริ่มต้น เพื่อหลีกเลี่ยงคำเตือนเกี่ยวกับบัฟเฟอร์ QUIC UDP ที่รบกวนในสภาพแวดล้อมคอนเทนเนอร์ที่มีข้อจำกัด ตั้งค่า `CLOUDFLARED_PROTOCOL=quic` หรือ `auto` หากคุณต้องการใช้รูปแบบการรับส่งข้อมูลอื่น
- อิมเมจ Docker รวม root CA ของระบบไว้และส่งต่อให้กับ `cloudflared` แบบมีการจัดการ ซึ่งช่วยหลีกเลี่ยงข้อผิดพลาดในการเชื่อถือ TLS เมื่อ tunnel เริ่มต้นทำงานภายในคอนเทนเนอร์
- ตั้งค่า `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` หากคุณต้องการให้ OmniRoute ใช้ไบนารีที่มีอยู่แทนการดาวน์โหลดใหม่

## แท็กอิมเมจ

| อิมเมจ                   | แท็ก     | ขนาด   | คำอธิบาย                                                        |
| ------------------------ | -------- | ------ | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer เสถียรที่ **เผยแพร่แล้ว** ซึ่งสูงสุด (ไม่ใช่ git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ตรึงแท็กประเภทนี้สำหรับ GitOps                                  |

แมนิเฟสต์หลายแพลตฟอร์ม: รองรับ `linux/amd64` + `linux/arm64` แบบเนทีฟ (Apple Silicon, AWS Graviton, Raspberry Pi) Docker จะเลือกสถาปัตยกรรมที่ตรงกันโดยอัตโนมัติ ให้ระบุ `--platform linux/amd64` หากต้องการบังคับใช้การจำลอง AMD64 บนโฮสต์ ARM

### ช่องทางการเผยแพร่

OmniRoute เผยแพร่ช่องทาง Docker แยกกันสำหรับรุ่นเสถียร การทดสอบรีลีสบรานช์ที่ใช้งานอยู่ และบิลด์สำหรับการพัฒนา

| ช่องทาง                         | แหล่งที่มา                                  | การเปลี่ยนแปลงได้                 | การใช้งานที่แนะนำ                                                                                                   |
| ------------------------------- | ------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | รีลีสที่ลงนาม/กำหนดเวอร์ชันแล้ว             | เปลี่ยนแปลงไม่ได้                 | การปรับใช้ในระบบจริงที่ตรึงรีลีสเฉพาะเวอร์ชัน                                                                       |
| `:latest` / `:latest-web`       | SemVer เสถียรที่ **เผยแพร่แล้ว** ซึ่งสูงสุด | ตัวชี้รุ่นเสถียรที่เปลี่ยนแปลงได้ | ติดตามรีลีสเสถียร **หลังจาก** งานเผยแพร่ SemVer — **ไม่ได้** ติดตาม `main` หรือคอมมิต `release/v*` ที่ยังไม่เผยแพร่ |
| `:next` / `:next-web`           | บรานช์ `release/v*` เริ่มต้นปัจจุบัน        | ตัวชี้ก่อนรีลีสที่เปลี่ยนแปลงได้  | ทดสอบการแก้ไขที่รวมเข้ากับรีลีสบรานช์ที่ใช้งานอยู่แล้ว แต่ยังไม่รวมอยู่ในรีลีสเสถียร                                |
| `:main` / `:main-web`           | บรานช์ `main`                               | ตัวชี้การพัฒนาที่เปลี่ยนแปลงได้   | สำหรับการพัฒนาและการทดสอบการผสานรวมเท่านั้น                                                                         |

#### ผู้ให้บริการเซสชันเว็บ: อิมเมจ `-web`

ทุกช่องทางข้างต้นมีแท็ก `-web` คู่กัน (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ซึ่งสร้างจากสเตจ `runner-web` — เป็นอิมเมจเดียวกันที่เพิ่ม Playwright และเบราว์เซอร์ Chromium อิมเมจแบบปกติมาพร้อมกับการ **ไม่มี** Chromium; `gemini-web`, `claude-web` และ `claude-turnstile` จำเป็นต้องใช้ Chromium

ข้อผิดพลาดจะเกิดขึ้นภายหลัง ไม่ใช่ตอนเริ่มต้นระบบ: ผู้ให้บริการเหล่านั้นจะแสดงรายการโมเดลและปรากฏว่าเชื่อมต่อแล้วในแดชบอร์ด และจะล้มเหลวเมื่อส่งคำขอครั้งแรกเท่านั้น โดยแสดงข้อความ

```
[500]: ไม่สามารถโหลดโมดูลภายนอก playwright: ข้อผิดพลาด: ไม่พบโมดูล
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

หากคุณใช้ผู้ให้บริการเหล่านั้น ให้ดึงแท็ก `-web` ของช่องทางที่คุณใช้อยู่ โดยไม่ต้องเปลี่ยนแปลงสิ่งอื่น สำหรับการติดตั้งผ่าน npm/CLI (ไม่ได้ใช้อิมเมจ Docker) ส่วนที่ขาดหายไปซึ่งเทียบเท่ากันคือไบนารีของเบราว์เซอร์: ให้เรียกใช้ `npx playwright install chromium` บนโฮสต์

#### การใช้ช่องทางก่อนรีลีส

ช่องทาง `next` จะถูกสร้างใหม่ทุกครั้งที่มีการพุชไปยังบรานช์ `release/v*` เริ่มต้นปัจจุบัน และเผยแพร่สำหรับทั้ง AMD64 และ ARM64 บรานช์บำรุงรักษาที่เก่ากว่าไม่สามารถเขียนทับช่องทางนี้ได้ ช่องทางนี้มีอิมเมจที่สามารถดึงได้สำหรับการแก้ไขที่รวมเข้ากับรีลีสบรานช์ที่ใช้งานอยู่แล้ว ก่อนที่จะสร้างแท็กเสถียรถัดไป

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

สำหรับ Docker Compose ให้แทนที่แท็กอิมเมจที่โปรไฟล์ซึ่งเลือกไว้ใช้งาน จากนั้นดึงอิมเมจและสร้างบริการขึ้นใหม่:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ความปลอดภัยและการย้อนกลับ

`next` เป็นช่องทางก่อนรีลีสแบบลอยตัว ซึ่งอาจเปลี่ยนแปลงเมื่อมีการพุชใดๆ ไปยังรีลีสบรานช์ที่ใช้งานอยู่ และ **ไม่รองรับการใช้งานในระบบจริง** ให้ตรึงไดเจสต์ของอิมเมจขณะประเมินบิลด์ใดบิลด์หนึ่ง:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ก่อนทดสอบ ให้สำรองข้อมูลวอลุ่มข้อมูลของ OmniRoute หรือไดเรกทอรีข้อมูลที่เมานต์แบบ bind ไว้ หากต้องการย้อนกลับ ให้คืนค่าเวอร์ชันเสถียรหรือไดเจสต์ที่ใช้ก่อนหน้านี้ แล้วสร้างคอนเทนเนอร์ขึ้นใหม่:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

บิลด์จากรีลีสบรานช์จะไม่สามารถเลื่อน `latest` ได้ มีเพียงเวอร์ชันเชิงความหมายแบบเสถียรที่มีคุณสมบัติตรงตามเงื่อนไขเท่านั้นที่สามารถเลื่อนตัวชี้รุ่นเสถียรได้ อิมเมจ `next` ยังคงใช้ขั้นตอนตรวจสอบอิมเมจรีลีสและเกณฑ์ปิดกั้นช่องโหว่ระดับ CRITICAL

**`latest` ไม่ได้รับประกันความเป็นปัจจุบันเมื่อเทียบกับ git** การแก้ไขที่ผสานรวมบน `main` หรือบนบรานช์ `release/v*` ที่ใช้งานอยู่จะ **ไม่** รวมอยู่ใน `:latest` จนกว่าจะมีการเผยแพร่อิมเมจ SemVer เสถียร และงานเผยแพร่เลื่อน `:latest` (มีไดเจสต์เดียวกันกับ SemVer ดังกล่าว) หาก `latest` ดูเหมือนไม่เปลี่ยนแปลง ขณะที่ GitHub แสดงการแก้ไขนั้นแล้ว ให้ดึง `:next` เพื่อทดสอบรีลีสบรานช์ หรือรอแท็ก SemVer

| สิ่งที่คุณต้องการ                                               | ให้ใช้                               |
| --------------------------------------------------------------- | ------------------------------------ |
| GitOps / ระบบจริงที่ต้องไม่มีการเปลี่ยนแปลงโดยไม่ตั้งใจ         | ตรึง `:X.Y.Z` (หรือไดเจสต์ของอิมเมจ) |
| ติดตามรุ่นเสถียรที่เผยแพร่แล้วและยอมรับการสร้างใหม่ในแต่ละรีลีส | `:latest`                            |
| ทดสอบคอมมิต `release/v*` ที่ยังไม่เผยแพร่                       | `:next` (ไม่ใช่สำหรับระบบจริง)       |
| ทดสอบ `main`                                                    | `:main` (ไม่ใช่สำหรับระบบจริง)       |

## ความพร้อมใช้งาน: SQLite เริ่มต้นรองรับเพียงเรพลิกาเดียว

OmniRoute แบบมาตรฐานบน Docker / Kubernetes คือ **หนึ่งโปรเซส Node + หนึ่งตัวเขียน SQLite** โทโพโลยีนี้ **ไม่รองรับ** ความพร้อมใช้งานสูง

| ข้อจำกัด                                       | ผลกระทบ                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ตัวเขียนเพียงตัวเดียว                          | **ห้าม** รันหลายเรพลิกากับไฟล์ SQLite เดียวกัน เพราะจะทำให้ DB เสียหาย                                                                                                                                                                                                                                                     |
| การสร้างใหม่ / รีสตาร์ต / ถูก HEALTHCHECK หยุด | เกิดเหตุขัดข้อง **ทั้งหมด** กับ SSE ที่กำลังทำงาน เซสชันแดชบอร์ด และสถานะในหน่วยความจำ ไคลเอนต์ที่เชื่อมต่อทั้งหมดจะหลุด คำขอใหม่ในช่วงที่ไม่มีเอนด์พอยต์จะได้รับ **`502 Bad Gateway: Unknown error`** จาก reverse proxy ไม่ใช่ JSON ของ OmniRoute — ไคลเอนต์จึงแยกความแตกต่างจากความล้มเหลวของผู้ให้บริการไม่ได้ (#11015) |
| ใช้ event loop เดียวกับ `/healthz`             | รอบการทำงานของแค็ตตาล็อกหรือการบีบอัดที่มีภาระสูงอาจทำให้โพรบล่าช้า จากนั้น timeout ที่สั้นจะรีสตาร์ตเรพลิกา **เพียงตัวเดียว**                                                                                                                                                                                             |

**เมทริกซ์โพรบ** (ดูเพิ่มเติมที่ [คำแนะนำเกี่ยวกับโพรบ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| โพรบ                   | เป้าหมาย                                                            | ห้ามใช้                                                            |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Liveness               | TCP บน `PORT` (ค่าเริ่มต้น `20128`) หรือ HTTP แบบผ่อนปรน `/healthz` | `/api/monitoring/health`                                           |
| Readiness              | HTTP `GET /healthz`                                                 | timeout ที่สั้นจนตีความว่า event loop ที่กำลังทำงานหนักนั้นตายแล้ว |
| เชิงลึก / สำหรับมนุษย์ | `/api/monitoring/health`                                            | liveness อัตโนมัติของ kubelet                                      |

**การอัปเกรด:** คาดว่าเซสชันทั้งหมดจะหลุด ให้ระบายไคลเอนต์ออกหากทำได้ เพราะ SQLite เริ่มต้นไม่มี rolling update การใช้ `restart: unless-stopped` ของ Compose ร่วมกับ Docker `HEALTHCHECK` จะเปลี่ยนโปรเซสเพียงตัวเดียวด้วยเมื่อคอนเทนเนอร์มีสถานะ Unhealthy — ซึ่งมีขอบเขตผลกระทบเท่ากัน

ตัวอย่าง Kubernetes สำหรับ **เรพลิกาเดียว** (จำเป็นต้องใช้ Recreate และห้ามเพิ่ม `replicas` เมื่อใช้ไฟล์ SQLite เดียว):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

การหน่วงด้วย `preStop` ช่วยให้ kube นำเอนด์พอยต์ของ Service ออกก่อน SIGTERM เพื่อให้ทราฟฟิก **ใหม่** หยุดส่งไปยังโปรเซสที่กำลังจะสิ้นสุด SSE ของ `/v1/responses` ที่กำลังทำงานจะได้รับเวลาระบายสูงสุดตาม `SHUTDOWN_TIMEOUT_MS` (ค่าเริ่มต้น 30 วินาที) ผ่าน heavyweight admission leases (#11015) คำขอใหม่ที่ยังไปถึงโปรเซสจะได้รับ `503` + `Retry-After: 5` ช่วงที่ไม่มีเอนด์พอยต์ระหว่าง Recreate จนกว่าตัวทดแทนจะมีสถานะ Ready ยังคงเป็นเหตุขัดข้องโดยสมบูรณ์ — นั่นเป็นลักษณะของโทโพโลยี SQLite ไม่ใช่การกำหนดค่าโพรบที่ผิดพลาด

Postgres ภายนอก / HA แบบ multi-writer **ไม่ใช่** แนวทางมาตรฐานที่มีเอกสารรองรับ หากคุณต้องการ HA ให้คงไว้ที่เรพลิกาเดียว หรือใช้โทโพโลยีที่โครงการได้ทดสอบและจัดทำเอกสารแยกไว้แล้ว งานด้าน Postgres/MySQL อยู่ใน [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) จนกว่างานนั้นจะพร้อมใช้งาน วิธีเดียวที่รองรับสำหรับการเพิ่มความจุของ `/v1/responses` ขนาด **ใหญ่** คือใช้โปรเซสอิสระ N โปรเซส (หัวข้อถัดไป) ไม่ใช่ `replicas > 1` บนวอลุ่มเดียวกัน

## การขยายระบบแนวนอน: N โปรเซสอิสระ

หนึ่งโปรเซส Node คือ **หนึ่งฮีป V8** คำขอ coding-agent `POST /v1/responses` (RTK + Caveman) ที่ซ้อนทับกันสองคำขอ ขนาดประมาณ 3 MiB / ประมาณ 750k โทเค็น จะทำให้ฮีปนั้นหยุดทำงานที่ประมาณ 12 Gi (`FATAL ERROR: Reached heap limit`) และอาจทำให้ cgroup ขนาด 16 Gi เกิด OOM ดู [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) การวัดดังกล่าวเป็นคำเตือนเกี่ยวกับ **งบประมาณหน่วยความจำ** ไม่ใช่ขีดจำกัดสูงสุดตายตัวของผลิตภัณฑ์ที่อนุญาตให้มี `/v1/responses` แบบยาวพร้อมกันได้เพียงสองคำขอ การรับคำขอแชตที่ใช้ทรัพยากรสูงถูกควบคุมด้วยงบประมาณไบต์ขาเข้าที่คำนวณโดยอัตโนมัติ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ซึ่งกำหนดขนาดจากเพดาน V8/cgroup เดียวกัน การ override ให้สูงขึ้น (หรือตั้งค่าขีดจำกัดจำนวนคำขอแบบเดิม `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) บนโปรเซสที่กำหนดขนาดไว้แล้ว จะทำให้เกิดการหยุดทำงานแบบเดิมอีกครั้ง แชตขนาดเล็ก, `/healthz`, `/v1/models` และ MCP **ไม่** อยู่ภายใต้ขีดจำกัดดังกล่าว

### หนึ่งโปรเซส: รองรับ `/v1/responses` แบบยาวพร้อมกันมากกว่าสองคำขอ

โปรเซสที่ **มีสถานะสมบูรณ์** (ฮีปต่ำกว่า `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ซึ่งมีค่าเริ่มต้นเป็น `0.75`) **อาจ** เรียกใช้ `POST /v1/responses` แบบยาวพร้อมกันมากกว่าสองคำขอได้ เมื่อยังมีพื้นที่เหลือในงบประมาณไบต์ที่กำลังประมวลผลทั่วทั้งโปรเซส (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) เนื้อหาคำขอที่มีขนาดตั้งแต่ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ขึ้นไป (ค่าเริ่มต้น 256 KiB) จะใช้ lease สำหรับงานหนักแบบเดียวกับคำขอที่มีโครงสร้างซับซ้อน และใช้ทางเลี่ยง `tryAcquireHealthyHeadroom` เดียวกันจาก [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) การรองรับไคลเอนต์ SSE แบบยาวพร้อมกันหลายสิบราย (ผู้ดูแลระบบมักต้องการ 40–50 ราย) เป็นเรื่องของ **งบประมาณหน่วยความจำ** — ต้องกำหนดขนาดฮีป + สล็อตหลัก/พื้นที่สำรอง + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ไม่ใช่ขีดจำกัดตายตัวของผลิตภัณฑ์ที่ “สูงสุด 2” ฮีปที่มีภาระสูงยังคงลดการรับโหลดด้วย `503` ที่ลองใหม่ได้ เพื่อไม่ให้ปัญหา #7849 กลับมาอีก

หากต้องการ **เพิ่มจำนวนฮีปหลายเท่า** (V8 old-space ที่เป็นอิสระต่อกัน) **ในปัจจุบัน**:

| ควรทำ                                                                                                                                                                                            | ไม่ควรทำ                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| เรียกใช้ **N คอนเทนเนอร์/พ็อด** โดยแต่ละรายการมี `DATA_DIR` / วอลุ่มเป็นของตัวเอง                                                                                                                | ตั้งค่า `replicas > 1` ให้ใช้งานไฟล์ SQLite เดียวกัน                      |
| กำหนดขนาดจำนวนคำขอหนักที่กำลังประมวลผล + พื้นที่สำรองเมื่อระบบสมบูรณ์ตามงบประมาณฮีป / ไบต์ที่กำลังประมวลผล โดย 1–2 เป็นค่าเริ่มต้นแบบอนุรักษนิยมจาก #7849 ไม่ใช่ขีดจำกัดสูงสุดตายตัวของผลิตภัณฑ์ | ให้ RAM แก่โปรเซสเดียวเพิ่มขึ้น 8 เท่าและใช้ขีดจำกัดจำนวนที่ไม่จำกัด      |
| ทางเลือก: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` สำหรับ **ตัวนับโควตาที่ใช้ร่วมกัน**                                                                                               | ปฏิบัติต่อ Redis เสมือนเป็น SQLite ที่ใช้ร่วมกัน — ซึ่งไม่ใช่             |
| ทำสำเนาข้อมูลลับของผู้ให้บริการไปยังแต่ละอินสแตนซ์ (หรือยอมรับแดชบอร์ดที่แยกจากกัน)                                                                                                              | คาดหวังว่าจะมีแดชบอร์ดเดียว / บันทึกการเรียกใช้ชุดเดียวสำหรับทุกอินสแตนซ์ |
| วางโหลดบาลานเซอร์ใด ๆ ไว้ด้านหน้า โดยใช้ sticky session ตาม API key หรือเซสชันก็เพียงพอ                                                                                                          | บังคับใช้มิดเดิลแวร์ที่รับรู้ขนาดและเฉพาะเจาะจงกับผู้ให้บริการ            |

ฮาร์ดแวร์: จำนวน `/v1/responses` แบบยาวที่ทำงานพร้อมกันต่ออินสแตนซ์เป็นเรื่องของ **งบประมาณหน่วยความจำ** (ฮีป + ไบต์ที่กำลังประมวลผล / #10110) `DATA_DIR` อิสระจำนวน `N` ชุดยังคงเพิ่มจำนวนฮีปเป็นหลายเท่า: RAM ของโฮสต์ต้องรองรับ `N × cgroup` ไม่ใช่ “พ็อด 16 Gi หนึ่งพ็อดที่มี N=8” ห้ามใช้ `replicas > 1` กับไฟล์ SQLite เดียวกันโดยเด็ดขาด

ตัวอย่าง Compose (สองฮีป สองวอลุ่ม — ไม่ใช่ `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

ความหนาแน่นภายในโปรเซส (ย้ายการบีบอัดออกจาก HTTP isolate) อยู่ที่ [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) คลัสเตอร์เชิงตรรกะหนึ่งชุดบนสถานะถาวรที่ใช้ร่วมกันอยู่ที่ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)

## หมายเหตุสำคัญ

- **โหมด SQLite WAL:** ควรปล่อยให้ `docker stop` ทำงานจนเสร็จ เพื่อให้ OmniRoute สามารถทำ checkpoint การเปลี่ยนแปลงล่าสุดกลับไปยัง `storage.sqlite` ได้ ไฟล์ Compose ที่รวมมาให้ได้กำหนดระยะเวลาผ่อนผันก่อนหยุดไว้ที่ 40 วินาทีแล้ว หากคุณรันอิมเมจโดยตรง ให้คงค่า `--stop-timeout 40` ไว้
- **`DISABLE_SQLITE_AUTO_BACKUP`:** ตั้งค่าเป็น `true` หากมีการจัดการการสำรองข้อมูลตามรอบ/ก่อนเขียนจากภายนอกอยู่แล้ว การย้ายข้อมูลของฐานข้อมูลที่มีอยู่ยังคงต้องใช้สแนปช็อตเพื่อความปลอดภัยที่คงทนของตนเองและตัวป้องกันการย้ายข้อมูลจำนวนมาก
- **การคงอยู่ของข้อมูล:** เมานต์วอลุ่มไปยัง `/app/data` เสมอ เพื่อเก็บรักษาฐานข้อมูล คีย์ และการกำหนดค่าของคุณไว้เมื่อมีการรีสตาร์ตคอนเทนเนอร์
- **การกำหนดค่าพอร์ต:** กำหนดค่าตัวแปรสภาพแวดล้อม `PORT` ใหม่เพื่อเปลี่ยนพอร์ตเริ่มต้น `20128`

## ดูเพิ่มเติม

- [คู่มือการปรับใช้ VM](../ops/VM_DEPLOYMENT_GUIDE.md) — การตั้งค่า VM + nginx + Cloudflare
- [คู่มือการปรับใช้ Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ปรับใช้ไปยัง Fly.io
- [การกำหนดค่าสภาพแวดล้อม](../reference/ENVIRONMENT.md) — เอกสารอ้างอิง `.env` ฉบับสมบูรณ์
