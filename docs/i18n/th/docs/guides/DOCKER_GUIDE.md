# 🐳 Docker Guide — OmniRoute (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> เอกสารอ้างอิงฉบับสมบูรณ์สำหรับการปรับใช้ด้วย Docker หากต้องการเริ่มต้นอย่างรวดเร็ว โปรดดู[ส่วน Docker ใน README](../README.md#-docker)

## สารบัญ

- [เรียกใช้งานอย่างรวดเร็ว](#quick-run)
- [ใช้งานร่วมกับไฟล์สภาพแวดล้อม](#with-environment-file)
- [Docker Compose](#docker-compose)
- [โปรไฟล์ที่พร้อมใช้งาน](#available-profiles)
- [การกำหนดค่าเครื่องมือ CLI บนโฮสต์เมื่อ OmniRoute ทำงานใน Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose สำหรับระบบใช้งานจริง](#production-compose)
- [สเตจของ Dockerfile](#dockerfile-stages)
- [ตัวแปรสภาพแวดล้อมที่สำคัญ](#critical-environment-variables)
- [Docker Compose พร้อม Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [แท็กอิมเมจ](#image-tags)
- [ความพร้อมใช้งาน: SQLite เริ่มต้นรองรับเพียงเรพลิกาเดียว](#availability-default-sqlite-is-single-replica)
- [ข้อผิดพลาดตามภูมิภาคของ Gemini ภายใน Docker](#gemini-regional-errors-inside-docker)
- [หมายเหตุสำคัญ](#important-notes)

---

## เรียกใช้งานอย่างรวดเร็ว

> **ต้องการโฮสต์ด้วยตนเองโดยใช้คำสั่งเดียวหรือไม่?** โปรดดู
> [คู่มือการโฮสต์ด้วยตนเอง](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (อิมเมจที่เผยแพร่แล้ว +
> Redis, เข้าถึงได้ผ่านลูปแบ็กเท่านั้น และไม่ต้องเลือกโปรไฟล์) การเรียกใช้งานอย่างรวดเร็วด้านล่างนี้เป็น
> แนวทางแบบคอนเทนเนอร์เดียวสำหรับผู้ใช้ที่ใช้งาน Redis จากที่อื่นอยู่แล้ว

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ใช้งานร่วมกับไฟล์สภาพแวดล้อม

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

# โปรไฟล์เว็บ (Chromium/Playwright สำหรับผู้ให้บริการที่ใช้เซสชันเว็บ)
docker compose --profile web up -d

# ใช้ CLI ร่วมกับ CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## โปรไฟล์ที่พร้อมใช้งาน

OmniRoute มีโปรไฟล์ Compose สำหรับรูปแบบการปรับใช้หลัก โปรดเลือกโปรไฟล์ที่ตรงกับสภาพแวดล้อมของคุณ

| โปรไฟล์              | บริการ           | ควรใช้เมื่อ                                                                                                                                        | คำสั่ง                                       |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ค่าเริ่มต้น) | `omniroute-base` | เซิร์ฟเวอร์แบบไม่มีส่วนติดต่อผู้ใช้ / รันไทม์ขั้นต่ำ โดยไม่มี CLI ของผู้ให้บริการรวมอยู่                                                           | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | เวิร์กโฟลว์แบบเอเจนต์ที่เรียกใช้ `omniroute providers/setup/doctor` และ CLI ที่รวมมาให้ (Codex, Claude Code, Droid, OpenClaw)                      | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | โฮสต์ Linux ที่ต้องการการเข้าถึง CLI ของโฮสต์ในลักษณะ `network_mode` โดยเมานต์ `~/.local/bin`, `~/.codex`, `~/.claude` ฯลฯ แบบอ่านอย่างเดียว       | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | เรียกใช้ [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar บนพอร์ต `8317` เพื่อพร็อกซีไปยัง CLI ต้นทาง                           | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | ผู้ให้บริการที่ใช้เซสชันเว็บและจำเป็นต้องมีเบราว์เซอร์: `gemini-web`, `claude-web`, `claude-turnstile` (บิลด์ `runner-web` และมี Chromium รวมอยู่) | `docker compose --profile web up -d`         |

> สามารถใช้หลายโปรไฟล์ร่วมกันได้: `docker compose --profile cli --profile cliproxyapi up -d`

## การกำหนดค่าเครื่องมือ CLI บนโฮสต์เมื่อ OmniRoute ทำงานใน Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` และปุ่ม
**บันทึกการกำหนดค่า** บนแดชบอร์ดจะเขียนไฟล์ เช่น `~/.codex/*.config.toml` พาธเหล่านั้น
มีความหมายเฉพาะบนเครื่องที่ CLI ทำงานอยู่จริงเท่านั้น หากเรียกใช้คำสั่งเหล่านี้ภายใน
คอนเทนเนอร์ ไฟล์จะถูกเขียนลงในโฮมของคอนเทนเนอร์เอง (`/home/node` —
อิมเมจทำงานด้วย `USER node`) ซึ่ง CLI บนโฮสต์จะไม่มีวันอ่าน และไฟล์จะถูก
ลบทิ้งทันทีที่สร้างคอนเทนเนอร์ขึ้นใหม่

OmniRoute ตรวจพบกรณีนี้และจะปฏิเสธการเขียนพร้อมแสดงคำแนะนำ แทนที่จะ
รายงานว่าดำเนินการสำเร็จทั้งที่คุณไม่สามารถใช้งานผลลัพธ์ได้ โดย CLI จะจบการทำงานด้วยรหัส `2` และ API จะตอบกลับด้วย `422`
พร้อม `containerEphemeralTarget: true`

### วิธีที่แนะนำ: เรียกใช้ CLI บนโฮสต์ และเรียกใช้ OmniRoute ใน Docker

คอนเทนเนอร์ให้บริการ API ส่วน CLI ใช้กำหนดค่าเครื่องมือบนโฮสต์ของคุณ

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # กำหนดให้ CLI เชื่อมต่อไปยังคอนเทนเนอร์
omniroute setup-codex                      # เขียนไปยัง ~/.codex จริงบนโฮสต์ของคุณ
```

นี่คือตัวเลือกที่เหมาะสมเมื่อ Codex, Claude Code, Cursor หรือเครื่องมือที่คล้ายกันทำงานบน
แล็ปท็อปของคุณ ซึ่งเป็นรูปแบบการใช้งานทั่วไป

### ทางเลือก: bind mount ไดเรกทอรีการกำหนดค่าของโฮสต์ (โปรไฟล์ `host`)

หากคุณต้องการให้คอนเทนเนอร์เขียนการกำหนดค่าของโฮสต์โดยตรง ให้ mount
ไดเรกทอรีเหล่านั้นเข้ามา และกำหนด `CLI_CONFIG_HOME` ให้ชี้ไปยังรากของ mount โปรไฟล์ `host`
ตั้งค่าสิ่งนี้ไว้ให้แล้ว:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount คือสิ่งที่ทำให้พาธเชื่อถือได้ โดย OmniRoute จะอ่าน
`/proc/self/mountinfo` และอนุญาตให้เขียนไปยังพาธที่ mount ไว้ (รวมถึงไดเรกทอรี
ที่มีไดเรกทอรีย่อยเป็น mount ซึ่งตรงกับโครงสร้าง `/host-home` ข้างต้นพอดี) ขณะเดียวกัน
ก็ยังคงปฏิเสธพาธที่ไม่ได้ mount

### ทางเลือกฉุกเฉิน: กำหนดค่า CLI ภายในคอนเทนเนอร์เอง (ควรใช้เท่าที่จำเป็น)

เมื่อ CLI อยู่ภายในคอนเทนเนอร์จริงๆ (โปรไฟล์ `cli`) การเขียนดังกล่าว
ถือเป็นความตั้งใจ ให้ส่ง `--allow-container-write` ไปยังคำสั่ง `setup-*` ใดๆ หรือกำหนด
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` สำหรับเซิร์ฟเวอร์ การเขียนจะดำเนินต่อไป
พร้อมคำเตือนว่าข้อมูลจะไม่คงอยู่หลังจากคอนเทนเนอร์สิ้นสุดลง

> **คำเตือนด้านความปลอดภัย — โปรไฟล์ `cli` + การ mount `docker.sock`**
> โปรไฟล์ `cli` จะ bind mount `/var/run/docker.sock` เพื่อให้ตัวอัปเดตอัตโนมัติ
> ภายในคอนเทนเนอร์สามารถสร้างสแต็กขึ้นใหม่ผ่าน daemon ของโฮสต์ได้
> (`src/lib/system/autoUpdate.ts` จะตรวจหาซ็อกเก็ตดังกล่าวและข้ามเส้นทาง
> Docker เมื่อไม่พบซ็อกเก็ต) ซ็อกเก็ตนี้คือ **ขอบเขตความเชื่อถือระดับ root ของโฮสต์**:
> ทุกสิ่งที่เข้าถึงซ็อกเก็ตนี้ได้จะสามารถควบคุม Docker daemon ของโฮสต์ในฐานะ
> root โดยสามารถสร้าง ตรวจสอบ หยุด และลบคอนเทนเนอร์ใดๆ บนโฮสต์ได้
> ผลกระทบมีดังนี้:
>
> 1. **ห้ามเปิดเผยพอร์ตของโปรไฟล์ `cli` สู่เครือข่ายโดยเด็ดขาด** ให้เผยแพร่
>    พอร์ตบน `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — หากโปรไฟล์ `cli` เข้าถึงได้จาก LAN ช่องโหว่ RCE ระดับแดชบอร์ดใดๆ จะกลายเป็น
>    การยึดครองโฮสต์โดยสมบูรณ์
> 2. **อย่า bind ไดเรกทอรีเพิ่มเติมใดๆ ของโฮสต์เข้ามาในโปรไฟล์ `cli`**
>    Docker socket เมื่อใช้ร่วมกับ mount อื่นเพิ่มเติม จะทำให้คอนเทนเนอร์มีสิทธิ์
>    อ่าน/เขียนระบบไฟล์และการกำหนดค่าบนโฮสต์ของคุณได้ทั้งหมด หากคุณต้องการให้เครื่องมือ
>    เข้าถึงโปรเจกต์ ให้เรียกใช้เครื่องมือนั้นภายในเครื่องด้วยไบนารี CLI — อย่า mount โปรเจกต์
>    เข้าไปในคอนเทนเนอร์ `cli`
>
> หากคุณไม่ต้องการการอัปเดตอัตโนมัติภายในคอนเทนเนอร์ ให้ปิดโปรไฟล์ `cli` ไว้
> (`COMPOSE_PROFILES=core,redis` หรือค่าที่สั้นกว่านั้น) โปรไฟล์อื่นๆ จะไม่
> mount Docker socket
>
> ดู `docs/security/MITM-TPROXY-DECRYPT.md` (อยู่ใน git; ไม่ได้คอมไพล์ไว้ใน `/docs`) สำหรับโมเดลภัยคุกคามที่เกี่ยวข้อง
> กับ MITM และดู `docs/security/SUPPLY_CHAIN.md` สำหรับสายโซ่แหล่งที่มาของไบนารี
> `codex`/`claude-code`/`droid`/`openclaw`

## Redis Sidecar

OmniRoute ใช้ Redis เป็นแบ็กเอนด์สำหรับตัวจำกัดอัตราแบบกระจายและแคชที่ใช้ร่วมกัน บริการ `redis` จะถูกกำหนดไว้ใน `docker-compose.yml` **เสมอ** (ไม่มีการจำกัดด้วยโปรไฟล์) และจะเริ่มทำงานพร้อมกับโปรไฟล์อื่นทุกโปรไฟล์

| รายละเอียด                          | ค่า                                            |
| ----------------------------------- | ---------------------------------------------- |
| อิมเมจ                              | `redis:7-alpine`                               |
| ชื่อคอนเทนเนอร์                     | `omniroute-redis`                              |
| พอร์ตภายใน                          | `6379`                                         |
| พอร์ตโฮสต์ (เขียนทับได้)            | `REDIS_PORT` (ค่าเริ่มต้นคือ `6379`)           |
| ที่อยู่ bind ของโฮสต์ (เขียนทับได้) | `REDIS_BIND_HOST` (ค่าเริ่มต้นคือ `127.0.0.1`) |
| วอลุ่ม                              | `omniroute-redis-data` → `/data`               |
| การตรวจสอบสถานะ                     | `redis-cli ping` (ทุก 10 วินาที)               |

ตัวแปรสภาพแวดล้อมที่เกี่ยวข้อง:

- `REDIS_URL` — สตริงการเชื่อมต่อที่แทรกเข้าสู่แอป (ค่าเริ่มต้นคือ `redis://redis:6379`)
- `REDIS_PORT` — การแมปพอร์ตฝั่งโฮสต์สำหรับคอนเทนเนอร์ Redis
- `REDIS_BIND_HOST` — อินเทอร์เฟซของโฮสต์ที่ใช้เผยแพร่พอร์ต ค่าเริ่มต้นคือ `127.0.0.1`

> **เหตุผลที่ใช้ loopback เป็นค่าเริ่มต้น:** sidecar ทำงานโดยไม่มี `requirepass` และคอนเทนเนอร์
> ของแอปเข้าถึงผ่านเครือข่าย compose (`redis:6379`) — พอร์ตที่เผยแพร่มีไว้สำหรับเครื่องมือ
> ฝั่งโฮสต์เท่านั้น (`redis-cli`, `npm run dev` ที่ทำงานในเครื่อง) การเผยแพร่บน
> `0.0.0.0` จะเปิด Redis ที่ไม่มีการยืนยันตัวตนให้ทุกโฮสต์ใน LAN ของคุณเข้าถึงได้ หากคุณตั้งค่า
> `REDIS_BIND_HOST=0.0.0.0` ให้เพิ่ม `--requirepass` ใน `command:` ของบริการด้วย

ไม่แนะนำให้ **ปิดใช้งาน Redis** (ตัวจำกัดอัตราจะลดระดับไปใช้กลไกสำรองในหน่วยความจำ) หากจำเป็น ให้ลบหรือคอมเมนต์บล็อกบริการ `redis:` ใน `docker-compose.yml` หรือปรับขนาดให้เป็นศูนย์:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

สำหรับสแนปช็อต production แบบแยกส่วนที่ทำงานควบคู่ไปกับ dev ให้ใช้ `docker-compose.prod.yml`

| รายละเอียด            | ค่า                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| ไฟล์                  | `docker-compose.prod.yml`                                                                      |
| พอร์ตแดชบอร์ดเริ่มต้น | `PROD_DASHBOARD_PORT=20130` (แมปไปยังพอร์ตภายใน `${DASHBOARD_PORT:-20128}`)                    |
| พอร์ต API เริ่มต้น    | `PROD_API_PORT=20131`                                                                          |
| อิมเมจ                | `omniroute:prod` (สร้างจากเป้าหมาย `runner-cli`)                                               |
| คอนเทนเนอร์ Redis     | `omniroute-redis-prod` (`redis:8.6.2`, ใช้วอลุ่ม `redis-prod-data` โดยเฉพาะ)                   |
| วอลุ่มข้อมูล          | `omniroute-prod-data` (วอลุ่มที่มีชื่อและคงอยู่ระหว่างการสร้างใหม่)                            |
| การตรวจสอบสถานะ       | `node healthcheck.mjs` + `redis-cli ping` โดย `depends_on` จะรอจนกว่า Redis มีสถานะพร้อมใช้งาน |

วิธีใช้งาน:

```bash
# สร้างและเริ่มต้นสแต็ก production
docker compose -f docker-compose.prod.yml up -d --build

# สตรีมบันทึกเหตุการณ์
docker compose -f docker-compose.prod.yml logs -f

# ปิดสแต็กโดยเก็บวอลุ่มไว้
docker compose -f docker-compose.prod.yml down
```

สแต็ก prod ทำงานควบคู่ไปกับ compose สำหรับ dev ได้ (ใช้ชื่อคอนเทนเนอร์ พอร์ต และวอลุ่มที่แตกต่างกัน) ดังนั้นคุณจึงสามารถพัฒนาต่อในเครื่องได้ในขณะที่ production ยังคงทำงานอยู่

## สเตจของ Dockerfile

รีโพซิทอรีนี้มาพร้อมกับ Dockerfile แบบหลายสเตจ (`Dockerfile`) โดยเปิดให้ใช้งานสี่สเตจ ให้เลือก `target` ที่เหมาะสมกับกรณีใช้งานของคุณ

| สเตจ          | อิมเมจฐาน             | วัตถุประสงค์                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | ติดตั้ง dependencies (`npm ci --legacy-peer-deps`) และเรียกใช้ `npm run build` (ใช้ Turbopack โดยค่าเริ่มต้น — ดูหัวข้อทรัพยากรขณะบิลด์ด้านล่าง)                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | รันไทม์สำหรับ production พร้อมเอาต์พุต standalone ของ Next.js **ไม่มี CLI ของผู้ให้บริการรวมอยู่ด้วย**                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | เพิ่ม `git`, `docker.io`, `docker-compose` และ CLI แบบ global ได้แก่ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw` **เลือกสเตจนี้สำหรับเวิร์กโฟลว์แบบ agentic**                                                                                                              |
| `runner-web`  | `runner-base`         | เพิ่ม Playwright + เบราว์เซอร์ Chromium (`--with-deps`) สำหรับผู้ให้บริการแบบเซสชันเว็บ ได้แก่ `gemini-web`, `claude-web`, `claude-turnstile` **เลือกสเตจนี้เมื่อคุณใช้ผู้ให้บริการเหล่านั้น** — อิมเมจแบบปกติจะล้มเหลวในขณะส่งคำขอหากไม่มีส่วนนี้ (ดูหมายเหตุ `-web` ในหัวข้อช่องทางการเผยแพร่) |

บิลด์ target ที่ระบุด้วยตนเอง:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ทรัพยากรขณะบิลด์

อาร์กิวเมนต์สำหรับการบิลด์สามรายการควบคุมต้นทุนทรัพยากรของสเตจ `builder` โดยมีผลเฉพาะขณะบิลด์เท่านั้น —
`OMNIROUTE_MEMORY_MB` (ด้านล่าง) เป็นตัวปรับสำหรับรันไทม์ที่แยกต่างหาก

| อาร์กิวเมนต์สำหรับการบิลด์  | ค่าเริ่มต้น | ผลกระทบ                                                                                     |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` บิลด์ด้วย webpack: ใช้หน่วยความจำสูงสุดน้อยกว่า แต่ช้ากว่า `1` เลือกใช้ Turbopack       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | ขีดจำกัด heap ของ V8 (`--max-old-space-size`) สำหรับ `next build` ที่ถูกสร้างเป็นโปรเซสใหม่ |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | ส่งค่าให้ `CIRCLE_NODE_TOTAL`; Next คำนวณ `workers = N - 1` สำหรับการรวบรวมข้อมูลเพจ        |

`OMNIROUTE_BUILD_WORKERS` เป็นค่าที่ควรเพิ่มเมื่อใช้เครื่องบิลด์ขนาดใหญ่ และเป็นค่าที่ควร
สงสัยเมื่อการบิลด์บนระบบที่มีทรัพยากรจำกัดหยุดทำงาน **หลังจาก** `✓ Compiled successfully` แต่ละ
worker สำหรับข้อมูลเพจทำงานเป็นโปรเซสของตัวเอง และโปรเซสหลัก `next build` ก็เช่นกัน
การทดสอบซ้ำบน VPS จริง (issue #7518) วัดค่า RSS สูงสุดของแต่ละโปรเซสได้ที่
~4.5 GB โดยไม่ขึ้นกับแฟล็ก heap ของ `NODE_OPTIONS` (Turbopack คอมไพล์โดยใช้
หน่วยความจำ native/Rust ที่อยู่นอก heap ของ V8) ค่าเริ่มต้น `2` (→ 1 worker รวมทั้งหมด 2
โปรเซส) ถูกกำหนดให้เหมาะกับ runner ที่โฮสต์โดย GitHub ซึ่งมี RAM 16 GB / 4 vCPU และถูกใช้โดย
ไปป์ไลน์การเผยแพร่ เมื่อกำหนดเป็น `8` (→ 7 workers) runner ดังกล่าวมีหน่วยความจำไม่เพียงพอ และ
buildkit ทำขั้นตอนนั้นล้มเหลวด้วย `ResourceExhausted: ... cannot allocate memory`;
แม้แต่ `3` (→ 2 workers) ก็ยังไม่พอดี หลังจากวัด RSS ต่อโปรเซส
โดยตรงแทนการอนุมาน `tests/unit/docker-build-memory-budget.test.ts`
จะคำนวณเทียบกับค่าที่วัดได้ และล้มเหลวหากตัวปรับค่าใดค่าหนึ่ง
เกินขีดความสามารถของ runner

Turbopack คอมไพล์โดยใช้หน่วยความจำ native Rust ที่อยู่ **นอก** heap ของ V8 ดังนั้น
`OMNIROUTE_BUILD_MEMORY_MB` จึงไม่สามารถจำกัดหน่วยความจำนั้นได้ บนโฮสต์ที่มีขีดจำกัดหน่วยความจำ
การบิลด์จะถูก OOM killer ส่ง SIGKILL โดยไม่มีข้อความข้อผิดพลาดใด ๆ — กระบวนการจะ
หยุดลงกลางขั้นตอน `Creating an optimized production build` ซึ่งดูคล้ายกับค้างมากกว่า
หน่วยความจำไม่เพียงพอ นั่นคือเหตุผลที่ `Dockerfile` ใช้ webpack เป็นค่าเริ่มต้น
(`OMNIROUTE_USE_TURBOPACK=0`) ซึ่งแตกต่างจาก `npm run dev` / `npm run build` ที่
Turbopack เป็นค่าเริ่มต้นในโค้ด: การเรียก `docker build .` แบบเปล่าโดยไม่มีอาร์กิวเมนต์สำหรับการบิลด์ (ซึ่งเป็นสิ่งที่
Railway และโฮสต์แบบคลิกเดียวอื่น ๆ เรียกใช้) ต้องไม่หยุดทำงานโดยไม่มีข้อความบนเครื่องบิลด์
ที่ถูกจำกัดหน่วยความจำ อิมเมจที่เผยแพร่แล้วส่งค่า `OMNIROUTE_USE_TURBOPACK=0`
อย่างชัดเจนใน `docker-publish.yml` อยู่แล้ว บนเครื่องบิลด์ที่มี RAM มากเพียงพอ ให้เลือกใช้
Turbopack เพื่อให้บิลด์ได้เร็วขึ้น:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

มีการเปิดใช้ `webpackBuildWorker` ดังนั้น `next build` จึงเรียกใช้ทั้งโปรเซสหลัก **และ** โปรเซส worker
โดยแต่ละโปรเซสจะใช้ค่า `OMNIROUTE_BUILD_MEMORY_MB` แยกจากกัน กำหนดขีดจำกัดของคอนเทนเนอร์
ให้สูงกว่าค่านี้ประมาณสองเท่า ไม่ใช่หนึ่งเท่า

ค่าที่วัดได้บน tree นี้ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | ขีดจำกัดของคอนเทนเนอร์ | ผลลัพธ์                                  |
| --------- | ---------------------- | ---------------------------------------- |
| Turbopack | 8 GiB / 16 GiB         | ถูก OOM-kill ทั้งสองระดับโดยไม่มีข้อความ |
| webpack   | 8 GiB                  | worker สำหรับการบิลด์ถูก SIGKILL         |
| webpack   | 12 GiB                 | สำเร็จ โดยมีค่าสูงสุดที่ 11.1 GiB        |

### ค่าเริ่มต้นขณะรันไทม์

ค่าเริ่มต้นที่ export โดย `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`

ลักษณะการทำงานของหน่วยความจำใน Docker:

- อิมเมจตั้งค่า `OMNIROUTE_MEMORY_MB=1024` และใช้ค่านี้เพื่อกำหนด `NODE_OPTIONS=--max-old-space-size=1024`
- โปรเซสเซิร์ฟเวอร์จริงเริ่มทำงานโดย standalone launcher ซึ่งอ่านค่า `OMNIROUTE_MEMORY_MB` และเพิ่ม `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`
- Node ใช้ค่า `--max-old-space-size` ที่ระบุซ้ำเป็นลำดับสุดท้าย ดังนั้นการตั้งค่า `OMNIROUTE_MEMORY_MB` จึงควบคุมขีดจำกัด heap ที่มีผลจริงใน Docker
- เนื่องจากอิมเมจกำหนดค่านี้ไว้เสมอ ค่า fallback ของ launcher ที่ปรับเทียบตาม RAM จึงไม่ถูกนำมาใช้ภายใต้ Docker ให้เพิ่มค่านี้อย่างชัดเจนตาม workload (ตารางด้านล่าง) ค่า `2048` ยังคงน้อยเกินไปสำหรับ `/v1/responses` ของ coding agent

### RAM ขณะรันไทม์สำหรับ coding agent

ค่าเริ่มต้น 1 GiB ของ Docker เป็นเพียงค่าขั้นต่ำสำหรับแดชบอร์ด/แชตแบบเบา ไม่ใช่ขนาดสำหรับการใช้งานจริงในระบบ production เนื้อหา `POST /v1/responses` ที่ยาว (ข้อความหลายร้อยรายการและเครื่องมือหลายสิบรายการ) จะเก็บกราฟในหน่วยความจำหลายชุดไว้ระหว่างการบีบอัด คำขอที่ซ้อนทับกันสองรายการซึ่งมีขนาดประมาณ ~3 MiB / ~750k-token ทำให้ V8 หยุดทำงานเมื่อ old-space มีขนาด **12 GiB** (`FATAL ERROR: Reached heap limit`) และยังทำให้เกิด cgroup OOM ที่ 16 GiB อีกด้วย ดู [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)

กำหนดขนาด **cgroup `--memory` ให้สูงกว่า heap** — native buffer, SQLite และข้อมูลตัวกลางระหว่างการบีบอัดจะอยู่ภายนอก V8

| Workload                                     | `OMNIROUTE_MEMORY_MB`         | คอนเทนเนอร์ / cgroup      | หมายเหตุ                                                                                                               |
| -------------------------------------------- | ----------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| แดชบอร์ด, แชตแบบเบาหนึ่งรายการ               | `1024` (ค่าเริ่มต้นของอิมเมจ) | ≥2 GiB                    |                                                                                                                        |
| coding agent หนึ่งตัว (Claude/Codex/Grok)    | `8192`                        | ≥10 GiB                   | `/v1/responses` แบบเซสชันเดียวโดยทั่วไป                                                                                |
| `/v1/responses` แบบยาวพร้อมกันสองรายการ      | `10240`–`12288`               | ≥12–16 GiB                | ตรวจพบว่า V8 หยุดทำงานเมื่อ heap มีขนาดประมาณ ~12 GiB                                                                  |
| context แบบยาวพร้อมกันตั้งแต่สามรายการขึ้นไป | อย่ารันในโปรเซสเดียว          | ทำงานตามลำดับ / เพิ่ม RAM | ค่าเริ่มต้นของการควบคุมงานหนักคือ 1 งานที่กำลังประมวลผล; การเพิ่มค่านี้โดยไม่เพิ่ม RAM จะทำให้เกิดการหยุดทำงานอีกครั้ง |

เมื่อรัน `omniroute serve` บน bare metal ระบบจะปรับเทียบเป็นประมาณ 35% ของ RAM (โดยจำกัดไว้ที่ `[512, 4096]`) เมื่อ **ไม่ได้ตั้งค่า** `OMNIROUTE_MEMORY_MB` แต่ Docker ตั้งค่าเป็น `1024` เสมอ ดังนั้นการปรับเทียบดังกล่าวจึงไม่ทำงานในอิมเมจอย่างเป็นทางการ

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## ตัวแปรสภาพแวดล้อมที่สำคัญ

นอกเหนือจากค่าเริ่มต้นที่ระบุไว้ใน [ENVIRONMENT.md](../reference/ENVIRONMENT.md) ตัวแปรต่อไปนี้มีความสำคัญมากที่สุดเมื่อทำงานภายใต้ Docker:

| ตัวแปร                        | วัตถุประสงค์                                                                                                                                                                                                                                                                   | ค่าเริ่มต้น              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ค่าลับที่ใช้ร่วมกันสำหรับบริดจ์ WebSocket **จำเป็นสำหรับระบบใช้งานจริง** — ตั้งค่าเป็นสตริงสุ่มที่คาดเดาได้ยาก                                                                                                                                                                 | ไม่ได้ตั้งค่า (ต้องระบุ) |
| `REDIS_URL`                   | สตริงการเชื่อมต่อสำหรับแบ็กเอนด์ตัวจำกัดอัตรา / แคช                                                                                                                                                                                                                            | `redis://redis:6379`     |
| `REDIS_PORT`                  | พอร์ตฝั่งโฮสต์สำหรับคอนเทนเนอร์ Redis ที่รวมมาให้                                                                                                                                                                                                                              | `6379`                   |
| `REDIS_BIND_HOST`             | อินเทอร์เฟซของโฮสต์ที่ใช้เผยแพร่พอร์ต Redis ที่รวมมาให้ (ใช้ลูปแบ็ก เว้นแต่คุณจะเพิ่ม AUTH)                                                                                                                                                                                    | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | พาธบนโฮสต์ที่เมานต์เข้าในโปรไฟล์ `cli` ที่ `/workspace/omniroute` สำหรับเวิร์กโฟลว์การอัปเดตตัวเอง                                                                                                                                                                             | `.` (ไดเรกทอรีปัจจุบัน)  |
| `OMNIROUTE_MEMORY_MB`         | ขีดจำกัดฮีปของ Node ขณะรันไทม์สำหรับเซิร์ฟเวอร์ Docker แบบสแตนด์อโลน โดยจะแทนที่ค่าเริ่มต้นของอิมเมจข้างต้น สำหรับเอเจนต์เขียนโค้ด: `8192` ขึ้นไป (ดู [RAM ขณะรันไทม์](#runtime-ram-for-coding-agents))                                                                        | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | แทนที่พอร์ตที่เปิดเผยสำหรับแดชบอร์ด (20128) และ API (20129)                                                                                                                                                                                                                    | `20128` / `20129`        |
| `APP_BIND_HOST`               | อินเทอร์เฟซของโฮสต์ที่ docker-compose ใช้เผยแพร่พอร์ตแดชบอร์ด/API/live-WS เมื่อใช้ `REQUIRE_API_KEY=false` (ค่าเริ่มต้น) ค่า `0.0.0.0` จะเปิดเผยพร็อกซี `/v1` แบบไม่ระบุตัวตนต่อ LAN — ควรขยายการเข้าถึงเฉพาะเมื่อใช้ `REQUIRE_API_KEY=true` หรือมีรีเวิร์สพร็อกซีอยู่ด้านหน้า | `127.0.0.1`              |
| `CLIPROXY_BIND_HOST`          | อินเทอร์เฟซของโฮสต์ที่ docker-compose ใช้เผยแพร่ไซด์คาร์ `cliproxyapi` — โวลุ่มข้อมูลของไซด์คาร์นี้จัดเก็บข้อมูลประจำตัวของผู้ให้บริการ                                                                                                                                        | `127.0.0.1`              |
| `OMNIROUTE_PLUGINS_DIR`       | ไดเรกทอรีที่ตัวสแกนปลั๊กอินขณะรันไทม์ใช้อ่านและติดตั้งปลั๊กอิน ให้ตั้งค่านี้เมื่อปลั๊กอินถูก bind-mount เนื่องจากค่าเริ่มต้นจะอิงตาม `HOME` ซึ่งอิมเมจอาจไม่ได้ export ไว้                                                                                                     | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | พาธย่อยของ URL เมื่อเผยแพร่แอปผ่านรีเวิร์สพร็อกซี (เช่น `/omniroute`)                                                                                                                                                                                                          | _(ว่างเปล่า = รูท)_      |
| `NEXT_PUBLIC_BASE_URL`        | ออริจินสาธารณะสำหรับเบราว์เซอร์ ซึ่งรวมพาธย่อยด้วย (เช่น `https://host/omniroute`)                                                                                                                                                                                             | ไม่ได้ตั้งค่า            |
| `PROD_DASHBOARD_PORT`         | พอร์ตแดชบอร์ดฝั่งโฮสต์สำหรับ `docker-compose.prod.yml`                                                                                                                                                                                                                         | `20130`                  |
| `CLIPROXYAPI_PORT`            | พอร์ตฝั่งโฮสต์สำหรับไซด์คาร์ `cliproxyapi`                                                                                                                                                                                                                                     | `8317`                   |

## Reverse Proxy บนพาธย่อย (Traefik / nginx)

`basePath` ของ Next.js จะถูกคอมไพล์รวมไว้ในบันเดิลแบบ standalone OmniRoute บันทึกค่าที่ฝังไว้
ลงในไฟล์ sentinel ที่รูทของแอป (เขียนระหว่าง `npm run build` และอ่านโดย
`scripts/docker/ensure-docker-base-path.mjs`) และเปรียบเทียบกับ
`OMNIROUTE_BASE_PATH` เมื่อคอนเทนเนอร์เริ่มทำงาน เมื่อค่าแตกต่างกันและอิมเมจถูก
สร้างมาสำหรับรูทของโดเมน entrypoint จะเขียน standalone manifests ใหม่ รวมถึง
ลิเทอรัล `basePath`/`assetPrefix` ที่ฝังไว้ (Next 16 เรนเดอร์ URL ของแอสเซ็ต SSR จาก
`assetPrefix` เพียงอย่างเดียว — patcher จึงคัดลอกพาธย่อยไปยังค่านี้ด้วย), URL แอสเซ็ต
`/_next/static` ที่ฝังไว้ (client-reference manifests, การนำเข้าสื่อ, หน้าแสดงข้อผิดพลาด
ที่เรนเดอร์ไว้ล่วงหน้า) และ client `process.env` shim ก่อนที่ `node dev/run-standalone.mjs`
จะทำงาน

### การสร้างด้วย Compose (แนะนำ)

ตั้งค่าตัวแปรทั้งสองใน `.env` จากนั้นสร้างใหม่เพื่อให้อิมเมจและรันไทม์ใช้ค่าที่ตรงกัน:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ส่งต่อ `OMNIROUTE_BASE_PATH` ทั้งในรูป Docker build-arg และ
ตัวแปรสภาพแวดล้อมขณะรันไทม์

### อิมเมจรูทที่สร้างไว้ล่วงหน้า + พาธย่อยขณะรันไทม์

อิมเมจ `diegosouzapw/omniroute:*` ที่เผยแพร่แล้วถูกสร้างมาสำหรับรูทของโดเมน แต่คุณยังคง
ตั้งค่า `OMNIROUTE_BASE_PATH` ขณะรันไทม์ได้ โดยคอนเทนเนอร์จะแพตช์บันเดิลหนึ่งครั้งเมื่อเริ่มทำงาน
ควรใช้ร่วมกับ public origin ที่ตรงกัน:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

กำหนดค่า reverse proxy ให้ส่งต่อพาธภายนอกแบบ **เต็มพาธ** (อย่าตัด
คำนำหน้าออก) Traefik ควรกำหนดเส้นทาง `PathPrefix(`/omniroute`)` ไปยังคอนเทนเนอร์โดยไม่มี
`StripPrefix` เพื่อให้ Next.js ได้รับ `/omniroute/...` และให้บริการแอสเซ็ตจาก
`/omniroute/_next/...`

Docker healthcheck จะตรวจสอบ endpoint วงจรชีวิต `/healthz` แบบน้ำหนักเบา โดยเติม
`OMNIROUTE_BASE_PATH` ที่ใช้งานอยู่เป็นคำนำหน้า `/api/monitoring/health` ยังคงพร้อมใช้งานสำหรับ
การวินิจฉัยโดยผู้ใช้/แดชบอร์ด หากต้องการให้ HEALTHCHECK ของคอนเทนเนอร์กลับไปตรวจสอบ endpoint นี้
(ตัวอย่างเช่น เพื่อบังคับใช้การตรวจสอบสถานะแบบเชิงลึก) ให้ตั้งค่า
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`
พาธดังกล่าวเป็นการตรวจสอบแบบ **เชิงลึก** (DB + สรุปการมอนิเตอร์) ซึ่งเหมาะสำหรับ
`HEALTHCHECK` ของ Docker ที่ทำงานไม่บ่อย หากคุณเลือกกลับมาใช้งาน แต่ **ไม่** เหมาะสำหรับช่วงเวลา
ของ `livenessProbe` ใน Kubernetes

สำหรับ orchestrator (Kubernetes, Nomad ฯลฯ):

| โพรบ               | ควรเลือกใช้                                                         | ควรหลีกเลี่ยง                                                    |
| ------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Liveness           | HTTP `GET /livez` หรือ TCP บนพอร์ตหลัก (`PORT` ค่าเริ่มต้น `20128`) | ใช้ `/api/monitoring/health` เป็น liveness                       |
| Readiness          | HTTP `GET /healthz`                                                 | ค่า timeout ที่สั้นจนถือว่า event loop ที่กำลังยุ่งนั้นหยุดทำงาน |
| เชิงลึก / blackbox | `/api/monitoring/health`                                            | —                                                                |

`/healthz` รายงานวงจรชีวิตของโปรเซส (`ok` / `starting` / `stopping`) ส่วน `/livez` จะตรวจสอบ
เฉพาะว่าโปรเซสยังทำงานอยู่ (ส่งคืน 200 ทุกครั้งที่ handler สามารถทำงานได้ โดยไม่รอให้
ระบบพร้อมใช้งาน) ทั้งสองยังคงทำงานบน Node event loop เดียวกับการจัดการคำขอ ดังนั้น
งานแค็ตตาล็อกหรือการบีบอัดที่ใช้ CPU สูงอาจทำให้การตอบสนองล่าช้าได้ — ยุ่ง ≠ หยุดทำงาน ควรใช้ TCP
liveness หากโพรบ HTTP หมดเวลา ดูคำแนะนำเกี่ยวกับโพรบฉบับเต็มได้ที่:
[คู่มือการมอนิเตอร์ — คำแนะนำเกี่ยวกับโพรบ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose พร้อม Caddy (HTTPS Auto-TLS)

คุณสามารถเปิดให้เข้าถึง OmniRoute ได้อย่างปลอดภัยโดยใช้การจัดเตรียม SSL อัตโนมัติของ Caddy โปรดตรวจสอบว่า DNS A record ของโดเมนชี้ไปยัง IP ของเซิร์ฟเวอร์

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
      # ต้นทางที่เบราว์เซอร์เข้าถึงสำหรับ OAuth callback, ลิงก์แดชบอร์ด และ URL สาธารณะที่สร้างขึ้น
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ภายในระหว่างเซิร์ฟเวอร์สำหรับงานตามกำหนดเวลา / การดึงข้อมูลจากตัวเอง
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

Caddy กำหนดส่วนหัวการส่งต่อตามมาตรฐานสำหรับคอนเทนเนอร์ต้นทาง OmniRoute ใช้
`NEXT_PUBLIC_BASE_URL` เป็น public origin หลักสำหรับ OAuth callback และลิงก์สาธารณะที่สร้างขึ้น
การเขียนข้อมูลบนแดชบอร์ดที่ผ่านการยืนยันตัวตนจะใช้คำขอจาก origin เดียวกันร่วมกับการป้องกัน CSRF
ที่ผูกกับเซสชัน เปิดใช้งาน `OMNIROUTE_TRUST_PROXY` เฉพาะสำหรับการปรับใช้ขั้นสูงที่คุณตั้งใจ
ให้ OmniRoute ระบุ public origin จากส่วนหัวที่ส่งต่อและเชื่อถือได้แทนการกำหนดค่าอย่างชัดเจน

## Cloudflare Quick Tunnel

การรองรับแดชบอร์ดสำหรับการปรับใช้ด้วย Docker มี **Cloudflare Quick Tunnel** แบบคลิกเดียวที่ `Dashboard → Endpoints` การเปิดใช้งานครั้งแรกจะดาวน์โหลด `cloudflared` เฉพาะเมื่อจำเป็น เริ่ม tunnel ชั่วคราวไปยัง endpoint `/v1` ปัจจุบันของคุณ และแสดง URL `https://*.trycloudflare.com/v1` ที่สร้างขึ้นไว้ใต้ URL สาธารณะปกติของคุณโดยตรง

คุณสามารถแสดงหรือซ่อนแผง tunnel ของ endpoint (Cloudflare, Tailscale, ngrok) ได้จาก `Settings → Appearance` โดยไม่เปลี่ยนสถานะของ tunnel ที่กำลังทำงานอยู่

### หมายเหตุเกี่ยวกับ Tunnel

- URL ของ Quick Tunnel เป็น URL ชั่วคราวและจะเปลี่ยนหลังการรีสตาร์ตทุกครั้ง
- Quick Tunnel จะไม่ถูกกู้คืนโดยอัตโนมัติหลังจากรีสตาร์ต OmniRoute หรือคอนเทนเนอร์ ให้เปิดใช้งานอีกครั้งจากแดชบอร์ดเมื่อจำเป็น
- ปัจจุบันการติดตั้งแบบมีการจัดการรองรับ Linux, macOS และ Windows บน `x64` / `arm64`
- โดยค่าเริ่มต้น Quick Tunnel แบบมีการจัดการจะใช้การรับส่งข้อมูลผ่าน HTTP/2 เพื่อหลีกเลี่ยงคำเตือนเกี่ยวกับบัฟเฟอร์ QUIC UDP ที่รบกวนในสภาพแวดล้อมคอนเทนเนอร์ที่มีข้อจำกัด กำหนด `CLOUDFLARED_PROTOCOL=quic` หรือ `auto` หากต้องการใช้รูปแบบการรับส่งข้อมูลอื่น
- อิมเมจ Docker มี CA root ของระบบรวมอยู่ด้วยและส่งต่อให้กับ `cloudflared` แบบมีการจัดการ ซึ่งช่วยหลีกเลี่ยงความล้มเหลวในการเชื่อถือ TLS เมื่อ tunnel เริ่มต้นการทำงานภายในคอนเทนเนอร์
- กำหนด `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` หากต้องการให้ OmniRoute ใช้ไบนารีที่มีอยู่แล้วแทนการดาวน์โหลดใหม่

## แท็กอิมเมจ

| อิมเมจ                   | แท็ก     | ขนาด   | คำอธิบาย                                                           |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer รุ่นเสถียรที่ **เผยแพร่แล้ว** และสูงสุด (ไม่ใช่ git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ตรึงแท็กประเภทนี้สำหรับ GitOps                                     |

manifest แบบหลายแพลตฟอร์ม: `linux/amd64` + `linux/arm64` แบบเนทีฟ (Apple Silicon, AWS Graviton, Raspberry Pi) Docker จะเลือกสถาปัตยกรรมที่ตรงกันโดยอัตโนมัติ ส่ง `--platform linux/amd64` หากต้องการบังคับใช้การจำลอง AMD64 บนโฮสต์ ARM

### ช่องทางการเผยแพร่

OmniRoute เผยแพร่ช่องทาง Docker แยกกันสำหรับรุ่นเสถียร การทดสอบ release branch ที่ใช้งานอยู่ และ development build

| ช่องทาง                         | แหล่งที่มา                                     | ความสามารถในการเปลี่ยนแปลง             | การใช้งานที่แนะนำ                                                                                                    |
| ------------------------------- | ---------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | รุ่นที่ลงนาม/กำหนดเวอร์ชันแล้ว                 | เปลี่ยนแปลงไม่ได้                      | การปรับใช้ใน production ที่ตรึงรุ่นที่แน่นอน                                                                         |
| `:latest` / `:latest-web`       | SemVer รุ่นเสถียรที่ **เผยแพร่แล้ว** และสูงสุด | ตัวชี้รุ่นเสถียรที่เปลี่ยนแปลงได้      | ติดตามรุ่นเสถียร **หลังจาก** งานเผยแพร่ SemVer — **ไม่** ติดตาม commit ของ `main` หรือ `release/v*` ที่ยังไม่เผยแพร่ |
| `:next` / `:next-web`           | branch `release/v*` เริ่มต้นในปัจจุบัน         | ตัวชี้รุ่นก่อนเผยแพร่ที่เปลี่ยนแปลงได้ | ทดสอบการแก้ไขที่รวมอยู่ใน release branch ที่ใช้งานอยู่แล้ว แต่ยังไม่รวมอยู่ในรุ่นเสถียร                              |
| `:main` / `:main-web`           | branch `main`                                  | ตัวชี้รุ่นพัฒนาที่เปลี่ยนแปลงได้       | สำหรับการพัฒนาและการทดสอบการผสานรวมเท่านั้น                                                                          |

#### ผู้ให้บริการ web session: อิมเมจ `-web`

แต่ละช่องทางข้างต้นมีแท็ก `-web` ด้วย (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ซึ่งสร้างจาก stage `runner-web` โดยเป็นอิมเมจเดียวกันที่เพิ่ม Playwright และเบราว์เซอร์ Chromium อิมเมจปกติจัดส่งโดย **ไม่มี** Chromium ส่วน `gemini-web`, `claude-web` และ `claude-turnstile` จำเป็นต้องใช้ Chromium

ความล้มเหลวจะเกิดขึ้นภายหลัง ไม่ใช่ในเวลาเริ่มต้นระบบ โดยผู้ให้บริการเหล่านั้นจะแสดงรายการโมเดลและแสดงสถานะว่าเชื่อมต่อแล้วในแดชบอร์ด และเฉพาะคำขอแรกเท่านั้นที่จะล้มเหลวพร้อมข้อความ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

หากคุณใช้ผู้ให้บริการเหล่านั้น ให้ดึงแท็ก `-web` ของช่องทางที่คุณใช้อยู่ โดยไม่ต้องเปลี่ยนแปลงสิ่งอื่น สำหรับการติดตั้งผ่าน npm/CLI (ไม่ได้ใช้อิมเมจ Docker) ส่วนที่ขาดหายไปซึ่งเทียบเท่ากันคือไบนารีของเบราว์เซอร์ ให้เรียกใช้ `npx playwright install chromium` บนโฮสต์

#### การใช้ช่องทางรุ่นก่อนเผยแพร่

ช่องทาง `next` จะถูกสร้างใหม่ทุกครั้งที่มีการ push ไปยัง branch เริ่มต้นปัจจุบัน `release/v*` และเผยแพร่สำหรับทั้ง AMD64 และ ARM64 branch บำรุงรักษารุ่นเก่าจะไม่สามารถเขียนทับช่องทางนี้ได้ ช่องทางนี้มี image ที่สามารถ pull ได้สำหรับการแก้ไขที่ merge เข้าสู่ release branch ที่ใช้งานอยู่แล้ว ก่อนที่จะสร้าง stable tag ถัดไป

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

สำหรับ Docker Compose ให้แทนที่ image tag ที่ profile ที่เลือกใช้งานอยู่ จากนั้น pull และสร้าง service ใหม่:

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

`next` เป็นช่องทาง pre-release แบบเลื่อนไปตามรุ่นล่าสุด ซึ่งอาจเปลี่ยนแปลงเมื่อมีการ push ใดๆ ไปยัง release branch ที่ใช้งานอยู่ และ **ไม่รองรับการใช้งานในระบบ production** ให้ตรึง image digest ขณะประเมิน build ที่ระบุ:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ก่อนทดสอบ ให้สำรองข้อมูล volume ของ OmniRoute หรือไดเรกทอรีข้อมูลที่ bind mount ไว้ หากต้องการย้อนกลับ ให้คืนค่า stable version หรือ digest ที่เคยใช้ก่อนหน้านี้ แล้วสร้าง container ใหม่:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

build จาก release branch จะไม่มีทางเลื่อน `latest` ได้ มีเพียง semantic version แบบ stable ที่มีคุณสมบัติตรงตามเกณฑ์เท่านั้นที่สามารถเลื่อนตัวชี้ stable ได้ image ของ `next` ยังคงผ่านการตรวจสอบ release image และเกณฑ์ปิดกั้นช่องโหว่ระดับ CRITICAL

**`latest` ไม่ใช่การรับประกันความเป็นปัจจุบันของ git** การแก้ไขที่ merge ลงใน `main` หรือ release branch `release/v*` ที่ใช้งานอยู่ **จะยังไม่รวมอยู่ใน** `:latest` จนกว่าจะเผยแพร่ SemVer image แบบ stable และ publish job เลื่อน `:latest` (โดยมี digest เดียวกับ SemVer นั้น) หาก `latest` ดูเหมือนไม่มีการอัปเดต ทั้งที่ GitHub แสดงการแก้ไขแล้ว ให้ pull `:next` เพื่อทดสอบ release branch หรือรอ SemVer tag

| สิ่งที่คุณต้องการ                                                         | ให้ใช้                            |
| ------------------------------------------------------------------------- | --------------------------------- |
| GitOps / production ที่ต้องไม่มีการเปลี่ยนแปลงโดยไม่ตั้งใจ                | ตรึง `:X.Y.Z` (หรือ image digest) |
| ติดตาม stable release ที่เผยแพร่แล้ว และยอมรับการสร้างใหม่ในแต่ละ release | `:latest`                         |
| ทดสอบ commit ของ `release/v*` ที่ยังไม่เผยแพร่                            | `:next` (ไม่ใช่ production)       |
| ทดสอบ `main`                                                              | `:main` (ไม่ใช่ production)       |

## ความพร้อมใช้งาน: SQLite เริ่มต้นรองรับเพียงเรพลิกาเดียว

OmniRoute แบบมาตรฐานบน Docker / Kubernetes คือ **หนึ่งโปรเซส Node + หนึ่งตัวเขียน SQLite** โทโพโลยีนี้ **ไม่รองรับ** ความพร้อมใช้งานสูง

| ข้อจำกัด                                         | ผลกระทบ                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ตัวเขียนเดียว                                    | **ห้าม** เรียกใช้หลายเรพลิกากับไฟล์ SQLite เดียวกัน เพราะจะทำให้ฐานข้อมูลเสียหาย                                                                                                                                                                                                                                                                           |
| การสร้างใหม่ / รีสตาร์ต / การหยุดโดย HEALTHCHECK | เกิด **การหยุดให้บริการโดยสมบูรณ์** สำหรับ SSE ที่กำลังดำเนินการ เซสชันแดชบอร์ด และสถานะในหน่วยความจำ ไคลเอนต์ที่เชื่อมต่ออยู่ทั้งหมดจะหลุด คำขอใหม่ระหว่างช่วงที่ไม่มี endpoint จะได้รับ **`502 Bad Gateway: Unknown error`** จาก reverse proxy ไม่ใช่ JSON ของ OmniRoute — ไคลเอนต์จึงไม่สามารถแยกแยะกรณีนี้ออกจากความล้มเหลวของผู้ให้บริการได้ (#11015) |
| ใช้ event loop เดียวกับ `/healthz`               | รอบการทำงานของแค็ตตาล็อกหรือการบีบอัดที่ยุ่งอาจทำให้ probe ล่าช้า จากนั้น timeout ที่สั้นจะรีสตาร์ตเรพลิกา **เพียงตัวเดียว**                                                                                                                                                                                                                               |

**เมทริกซ์ Probe** (ดูเพิ่มเติมที่ [คำแนะนำสำหรับ Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                  | เป้าหมาย                                                            | ห้ามใช้                                                 |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| Liveness               | TCP บน `PORT` (ค่าเริ่มต้น `20128`) หรือ HTTP `/healthz` แบบผ่อนปรน | `/api/monitoring/health`                                |
| Readiness              | HTTP `GET /healthz`                                                 | timeout ที่เข้มงวดจนถือว่า event loop ที่ยุ่งคือตายแล้ว |
| เชิงลึก / สำหรับมนุษย์ | `/api/monitoring/health`                                            | liveness ของ kubelet แบบอัตโนมัติ                       |

**การอัปเกรด:** คาดว่าเซสชันทั้งหมดจะหลุด ให้ระบายไคลเอนต์ออกหากทำได้ เนื่องจาก SQLite เริ่มต้นไม่รองรับ rolling update การใช้ Compose `restart: unless-stopped` ร่วมกับ Docker `HEALTHCHECK` จะเปลี่ยนโปรเซสเพียงตัวเดียวเมื่อคอนเทนเนอร์มีสถานะ Unhealthy เช่นกัน — โดยมีขอบเขตผลกระทบเท่ากัน

ตัวอย่างการกำหนดค่า Kubernetes สำหรับ **เรพลิกาเดียว** (จำเป็นต้องใช้ Recreate และห้ามเพิ่ม `replicas` ให้กับไฟล์ SQLite เดียว):

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

การหน่วงเวลาด้วย `preStop` ช่วยให้ kube นำ Service endpoints ออกก่อน SIGTERM เพื่อให้ทราฟฟิก **ใหม่** หยุดเข้าถึงโปรเซสที่กำลังจะหยุดทำงาน SSE ของ `/v1/responses` ที่กำลังดำเนินการจะได้รับเวลาระบายสูงสุดตาม `SHUTDOWN_TIMEOUT_MS` (ค่าเริ่มต้น 30 วินาที) ผ่าน heavyweight admission leases (#11015) คำขอใหม่ที่ยังคงเข้าถึงโปรเซสจะได้รับ `503` + `Retry-After: 5` ช่วงที่ไม่มี endpoint ของ Recreate จนกว่าตัวทดแทนจะมีสถานะ Ready ยังคงเป็นการหยุดให้บริการโดยสมบูรณ์ — นี่เป็นข้อจำกัดของโทโพโลยี SQLite ไม่ใช่การกำหนดค่า probe ที่ผิดพลาด

Postgres ภายนอก / HA แบบหลายตัวเขียน **ไม่ใช่** แนวทางมาตรฐานที่มีเอกสารรองรับ หากคุณต้องการ HA ให้ใช้เรพลิกาเดียวต่อไป หรือใช้โทโพโลยีที่โครงการได้ทดสอบและจัดทำเอกสารแยกไว้ งานเกี่ยวกับ Postgres/MySQL อยู่ใน [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) จนกว่าความสามารถดังกล่าวจะพร้อมใช้งาน วิธีเดียวที่รองรับสำหรับการเพิ่มความสามารถในการรองรับโหลด `/v1/responses` **ขนาดใหญ่** คือการใช้โปรเซสอิสระ N โปรเซส (ส่วนถัดไป) ไม่ใช่ `replicas > 1` บน volume เดียว

## การขยายระบบแนวนอน: N โปรเซสอิสระ

หนึ่งโปรเซส Node คือ **หนึ่งฮีป V8** คำขอ `POST /v1/responses` จาก coding agent (RTK + Caveman) จำนวนสองคำขอที่ทำงานทับซ้อนกัน โดยแต่ละคำขอมีขนาดประมาณ ~3 MiB / ~750k โทเค็น จะทำให้ฮีปดังกล่าวยุติการทำงานเมื่อใช้หน่วยความจำประมาณ ~12 Gi (`FATAL ERROR: Reached heap limit`) และอาจทำให้ cgroup ขนาด 16 Gi เกิด OOM ได้ ดู [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ค่าที่วัดได้นั้นเป็นคำเตือนเกี่ยวกับ **งบประมาณหน่วยความจำ** ไม่ใช่ขีดจำกัดสูงสุดแบบตายตัวของผลิตภัณฑ์ที่อนุญาตคำขอ `/v1/responses` แบบยาวพร้อมกันได้เพียงสองคำขอ การรับแชตที่ใช้ทรัพยากรสูงถูกควบคุมด้วยงบประมาณไบต์ขาเข้าที่คำนวณโดยอัตโนมัติ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ซึ่งกำหนดขนาดจากเพดาน V8/cgroup เดียวกันนี้ — การกำหนดค่าทับให้สูงขึ้น (หรือกำหนดเพดานจำนวนคำขอแบบเดิม `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) บนโปรเซสที่กำหนดขนาดไว้แล้ว จะทำให้ปัญหาการยุติการทำงานกลับมาอีกครั้ง แชตขนาดเล็ก, `/healthz`, `/v1/models` และ MCP **ไม่** อยู่ภายใต้เพดานดังกล่าว

### โปรเซสเดียว: คำขอ `/v1/responses` แบบยาวพร้อมกันมากกว่าสองคำขอ

โปรเซสที่ **มีสถานะปกติ** (ฮีปต่ำกว่า `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ซึ่งมีค่าเริ่มต้นเป็น `0.75`) **อาจ** รันคำขอ `POST /v1/responses` แบบยาวพร้อมกันมากกว่าสองคำขอได้ หากงบประมาณไบต์ระหว่างดำเนินการของทั้งโปรเซส (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ยังมีพื้นที่เหลืออยู่ เนื้อหาคำขอที่มีขนาดตั้งแต่ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ขึ้นไป (ค่าเริ่มต้น 256 KiB) จะใช้ lease สำหรับงานหนักแบบเดียวกับคำขอที่มีโครงสร้างซับซ้อน และใช้ทางเลี่ยง `tryAcquireHealthyHeadroom` จาก [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) แบบเดียวกัน (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) การมีไคลเอนต์ SSE แบบยาวพร้อมกันหลายสิบราย (ผู้ดูแลระบบมักต้องการ 40–50 ราย) เป็นคำถามด้าน **งบประมาณหน่วยความจำ** — ต้องกำหนดขนาดฮีป + สล็อตหลัก/สล็อตสำรอง + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ไม่ใช่ข้อจำกัดตายตัวของผลิตภัณฑ์ว่า “สูงสุด 2” ฮีปที่อยู่ภายใต้แรงกดดันยังคงปฏิเสธคำขอด้วย `503` ที่ลองใหม่ได้ เพื่อไม่ให้ปัญหา #7849 กลับมาอีก

หากต้องการ **เพิ่มจำนวนฮีป** (พื้นที่ old-space ของ V8 ที่เป็นอิสระต่อกัน) **ในปัจจุบัน**:

| ควรทำ                                                                                                                                                                                       | ไม่ควรทำ                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| รัน **N containers/pods** โดยแต่ละอินสแตนซ์มี `DATA_DIR` / volume **ของตนเอง**                                                                                                              | ตั้งค่า `replicas > 1` ให้ใช้งานไฟล์ SQLite เดียวกัน                      |
| กำหนดจำนวนงานหนักระหว่างดำเนินการ + พื้นที่สำรองเมื่อสถานะปกติจากงบประมาณฮีป / ไบต์ระหว่างดำเนินการ โดยค่า 1–2 เป็นค่าเริ่มต้นแบบระมัดระวังจาก #7849 ไม่ใช่ขีดจำกัดสูงสุดตายตัวของผลิตภัณฑ์ | ให้ RAM แก่โปรเซสเดียวมากขึ้น 8 เท่าและใช้เพดานจำนวนแบบไม่จำกัด           |
| ทางเลือก: ใช้ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` สำหรับ **ตัวนับโควตาที่ใช้ร่วมกัน**                                                                                      | ปฏิบัติต่อ Redis เสมือนเป็น SQLite ที่ใช้ร่วมกัน — ซึ่งไม่ใช่             |
| ทำสำเนาข้อมูลลับของผู้ให้บริการไว้ในแต่ละอินสแตนซ์ (หรือยอมรับแดชบอร์ดที่แยกจากกัน)                                                                                                         | คาดหวังว่าจะมีแดชบอร์ดเดียว / บันทึกการเรียกใช้งานเดียวสำหรับทุกอินสแตนซ์ |
| วาง load balancer ใด ๆ ไว้ด้านหน้า การทำ sticky routing ตาม API key หรือเซสชันก็เพียงพอ                                                                                                     | กำหนดให้ต้องใช้ middleware ที่รับรู้ขนาดและเฉพาะเจาะจงกับผู้ให้บริการ     |

ฮาร์ดแวร์: จำนวนคำขอ `/v1/responses` แบบยาวที่ทำงานพร้อมกันต่ออินสแตนซ์เป็นคำถามด้าน **งบประมาณหน่วยความจำ** (ฮีป + ไบต์ระหว่างดำเนินการ / #10110) `DATA_DIR` อิสระจำนวน `N` ชุดยังคงหมายถึงฮีปที่เพิ่มขึ้นหลายชุด: RAM ของโฮสต์ต้องรองรับ `N × cgroup` ไม่ใช่ “หนึ่งพ็อดขนาด 16 Gi ที่มี N=8” ห้ามใช้ `replicas > 1` กับไฟล์ SQLite เดียวกันโดยเด็ดขาด

ตัวอย่าง Compose (สองฮีป สอง volume — ไม่ใช่ `deploy.replicas: 2`):

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

ความหนาแน่นภายในโปรเซส (ย้ายการบีบอัดออกจาก HTTP isolate) ติดตามได้ที่ [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ส่วนคลัสเตอร์เชิงตรรกะเดียวที่ใช้สถานะถาวรร่วมกันติดตามได้ที่ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)

## ข้อผิดพลาดด้านภูมิภาคของ Gemini ภายใน Docker

Google AI Studio / Gemini API อาจส่งคืน HTTP 400 พร้อม FAILED_PRECONDITION และ
`User location is not supported for the API use.` การที่คำขอบนโฮสต์สำเร็จ
ไม่ได้พิสูจน์ว่าคอนเทนเนอร์ใช้เส้นทางขาออกเดียวกัน ลำดับ DNS,
การเชื่อมต่อ IPv4/IPv6, การกำหนดเส้นทาง VPN และพร็อกซีที่กำหนดค่าไว้อาจแตกต่างกัน ตรวจสอบ
[ภูมิภาคที่ Google รองรับ](https://ai.google.dev/gemini-api/docs/available-regions)
รวมถึงเส้นทางการเชื่อมต่อจริง ข้อผิดพลาดนี้เพียงอย่างเดียวไม่ได้บ่งชี้ว่าคีย์ API ไม่ถูกต้อง

### เลือกใช้พร็อกซีเฉพาะการเชื่อมต่อ

ใช้[การกำหนดค่าพร็อกซีแยกตามการเชื่อมต่อ](../ops/PROXY_GUIDE.md#4-level-proxy-system)ของ OmniRoute
สำหรับการเชื่อมต่อ Gemini ที่ได้รับผลกระทบ จากนั้นทำ **Test Connection** และส่งคำขอขนาดเล็ก
ด้วยโมเดลเดียวกันอีกครั้ง วิธีนี้จะจำกัดการเปลี่ยนแปลงการกำหนดเส้นทางไว้เฉพาะการเชื่อมต่อนั้น ตรวจสอบ
ว่าสามารถเข้าถึงพร็อกซีจากคอนเทนเนอร์ได้ และการเชื่อมต่อเลือกใช้พร็อกซีนั้นจริง
การเปลี่ยนเส้นทางไม่ได้รับประกันว่าจะผ่านเกณฑ์ด้านภูมิภาคของบริการต้นทาง

### เปรียบเทียบเครือข่ายของโฮสต์และคอนเทนเนอร์

ใช้คีย์ โมเดล และคำขอเดียวกันเมื่อเปรียบเทียบผลลัพธ์ที่ผ่านการยืนยันตัวตน และอย่า
วางข้อมูลประจำตัว รหัสผ่านพร็อกซี หรือส่วนหัวการอนุญาตฉบับเต็มลงใน issue
ขั้นแรก ให้ตรวจสอบว่าตัวแก้ชื่อของระบบปฏิบัติการเสนอแฟมิลีที่อยู่ใดบ้าง โดยใช้คำสั่งเดียวกัน
บนโฮสต์และภายในคอนเทนเนอร์:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

แทนที่ `omniroute` ด้วยบริการที่คุณเรียกใช้ (ตัวอย่างเช่น `omniroute-web`) คำสั่งเหล่านี้
จะแสดงแฟมิลีที่อยู่โดยไม่เปิดเผยข้อมูลประจำตัวหรือที่อยู่ IP ค่า `6` ที่ส่งคืน
แสดงเพียงผลลัพธ์ DNS แบบ IPv6 เท่านั้น ซึ่ง**ไม่ได้**พิสูจน์ว่ามีเส้นทาง IPv6 ที่ใช้งานได้หรือเข้าถึง API ได้
ในกรณีที่ติดตั้ง `curl` ไว้ ให้เปรียบเทียบ `curl -4 -I https://generativelanguage.googleapis.com`
กับ `curl -6 -I https://generativelanguage.googleapis.com` ในทั้งสองสภาพแวดล้อม
การตอบกลับ HTTP พิสูจน์ว่าการทดสอบนั้นเชื่อมต่อได้ แม้ว่าจะเป็นข้อผิดพลาดที่ไม่ได้ผ่านการยืนยันตัวตน
ก็ตาม มีเพียงคำขอโมเดลที่ผ่านการยืนยันตัวตนเท่านั้นที่ใช้ทดสอบสิทธิ์การใช้งาน Gemini ได้

### ทางเลือกระดับโฮสต์: IPv6 ที่ใช้งานได้และนโยบายตัวแก้ชื่อ

ผู้รายงาน [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) กู้คืน
การเข้าถึงในสภาพแวดล้อมของตนได้ด้วยการเปิดใช้ IPv6 ของคอนเทนเนอร์และเปลี่ยนการเลือก
ที่อยู่ของ glibc ให้ถือว่าวิธีนี้เป็นทางเลือกเฉพาะสภาพแวดล้อม ตรวจสอบว่า IPv6 ของโฮสต์
ใช้งานได้ รวมถึงการรับส่งข้อมูลขาออก/การกำหนดเส้นทางของคอนเทนเนอร์ และกฎไฟร์วอลล์
ก่อนปรับค่ากำหนดของตัวแก้ชื่อ การมีที่อยู่ ULA ส่วนตัวเพียงอย่างเดียวไม่ได้ยืนยัน
การเชื่อมต่อ IPv6 สาธารณะ

สำหรับบริการที่เชื่อมต่อกับเครือข่ายเริ่มต้นของ Compose อยู่แล้ว ส่วนย่อยนี้จะเปิดใช้
IPv6 บนเครือข่ายนั้น โดยคงบริการ พอร์ต วอลุ่ม และการกำหนดค่าอื่น ๆ ของคุณไว้:

```yaml
networks:
  default:
    enable_ipv6: true
```

สำหรับเครือข่ายที่มีชื่อ ให้เปิดใช้บนเครือข่ายที่บริการเชื่อมต่ออยู่จริง Docker สามารถ
จัดสรรซับเน็ต ULA ได้ ให้เลือกซับเน็ตแบบระบุชัดเจนและไม่ทับซ้อนเฉพาะเมื่อเครือข่ายของคุณ
จำเป็นต้องใช้เท่านั้น ดู[การเชื่อมต่อเครือข่าย IPv6 ของ Docker](https://docs.docker.com/engine/daemon/ipv6/)
และ[ตัวเลือกเครือข่ายของ Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)

บน**อิมเมจที่ใช้ glibc** `/etc/gai.conf` สามารถเปลี่ยนการเลือกที่อยู่ได้ Dockerfile
ปัจจุบันของรีโพซิทอรีใช้ Debian ส่วนอิมเมจแบบกำหนดเองที่ใช้ musl จะไม่ใช้กลไกนี้ร่วมกัน
การปรับเปลี่ยนที่มีการรายงานจะเปลี่ยนป้ายกำกับ ULA จาก `label fc00::/7 6` เป็น
`label fc00::/7 1` ให้เริ่มจากตารางนโยบายทั้งหมดของอิมเมจและคงรายการอื่น ๆ ไว้:
การเพิ่มรายการ `label` หรือ `precedence` จะแทนที่ตารางเริ่มต้นดังกล่าว ดังนั้นไฟล์
ที่มีเพียงบรรทัดที่แก้ไขจึงไม่เพียงพอ
[เอกสารอ้างอิงการกำหนดค่า glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
อธิบายลักษณะการทำงานเหล่านั้นไว้ ให้ bind-mount ไฟล์ที่ตรวจทานแล้วแบบอ่านอย่างเดียวที่ `/etc/gai.conf`
และสร้างบริการใหม่เพื่อใช้การเปลี่ยนแปลง

การดำเนินการนี้จะเปลี่ยนการเลือกที่อยู่ของระบบปฏิบัติการสำหรับ**ทราฟฟิกขาออกทั้งหมดในคอนเทนเนอร์นั้น**
แต่ไม่ได้บังคับให้ทุกแอปพลิเคชันเลือก IPv6 เนื่องจากลำดับ DNS และการเลือก
การเชื่อมต่อของ Node ก็มีผลเช่นกัน โดยเฉพาะอย่างยิ่ง `--dns-result-order=ipv4first` จะให้ความสำคัญกับ IPv4
และไม่ใช่วิธีแก้ไขความล้มเหลวที่เกิดขึ้นเฉพาะกับ IPv4 ดู[การจัดลำดับ DNS ของ Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)

ทดสอบ Gemini และผู้ให้บริการรายอื่นของคุณอีกครั้งหลังการเปลี่ยนแปลงระดับโฮสต์ทุกครั้ง หากต้องการย้อนกลับ
ให้ถอดการเมานต์ `gai.conf` แบบกำหนดเอง คืนค่าการกำหนดค่าเครือข่ายก่อนหน้า และ
สร้างบริการ/เครือข่ายที่ได้รับผลกระทบใหม่ในช่วงเวลาบำรุงรักษา การสร้างเครือข่ายใหม่
อาจรบกวนคอนเทนเนอร์อื่นที่เชื่อมต่ออยู่กับเครือข่ายนั้น อย่าลบวอลุ่มข้อมูลถาวร

## หมายเหตุสำคัญ

- **โหมด SQLite WAL:** ควรปล่อยให้ `docker stop` ทำงานจนเสร็จ เพื่อให้ OmniRoute สามารถทำ checkpoint การเปลี่ยนแปลงล่าสุดกลับไปยัง `storage.sqlite` ได้ ไฟล์ Compose ที่ให้มามีการกำหนดระยะเวลาผ่อนผันก่อนหยุดไว้ที่ 40 วินาทีแล้ว หากคุณเรียกใช้อิมเมจโดยตรง ให้คงค่า `--stop-timeout 40` ไว้
- **`DISABLE_SQLITE_AUTO_BACKUP`:** ตั้งค่าเป็น `true` หากมีการจัดการการสำรองข้อมูลตามรอบ/ก่อนเขียนจากภายนอกอยู่แล้ว การย้ายข้อมูลของฐานข้อมูลที่มีอยู่ยังคงต้องมีสแนปช็อตเพื่อความปลอดภัยที่คงทนแยกต่างหาก และกลไกป้องกันสำหรับการย้ายข้อมูลจำนวนมาก
- **การคงอยู่ของข้อมูล:** เมานต์โวลุ่มไปยัง `/app/data` เสมอ เพื่อคงฐานข้อมูล คีย์ และการกำหนดค่าของคุณไว้เมื่อมีการรีสตาร์ตคอนเทนเนอร์
- **การกำหนดค่าพอร์ต:** เขียนทับตัวแปรสภาพแวดล้อม `PORT` เพื่อเปลี่ยนพอร์ตเริ่มต้น `20128`

## ดูเพิ่มเติม

- [คู่มือการติดตั้งใช้งานบน VM](../ops/VM_DEPLOYMENT_GUIDE.md) — การตั้งค่า VM + nginx + Cloudflare
- [คู่มือการติดตั้งใช้งานบน Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ติดตั้งใช้งานบน Fly.io
- [การกำหนดค่าสภาพแวดล้อม](../reference/ENVIRONMENT.md) — เอกสารอ้างอิง `.env` ฉบับสมบูรณ์
