# VM_DEPLOYMENT_GUIDE (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — Vodič za implementaciju na VM sa Cloudflare-om"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Vodič za implementaciju na VM sa Cloudflare-om

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Potpuni vodič za instalaciju i konfiguraciju OmniRoute na VM (VPS) sa domenom koja se upravlja preko Cloudflare-a.

---

## Preduslovi

| Stavka     | Minimum                     | Preporučeno      |
| ---------- | --------------------------- | ---------------- |
| **CPU**    | 1 vCPU                      | 2 vCPU           |
| **RAM**    | 1 GB                        | 2 GB             |
| **Disk**   | 10 GB SSD                   | 25 GB SSD        |
| **OS**     | Ubuntu 22.04 LTS            | Ubuntu 24.04 LTS |
| **Domen**  | Registrovan na Cloudflare-u | —                |
| **Docker** | Docker Engine 24+           | Docker 27+       |

**Testirani provajderi**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Конфигурисање виртуелне машине

### 1.1 Креирање инстанце

Код вашег омиљеног VPS провајдера:

- Изаберите Ubuntu 24.04 LTS
- Изаберите минималан план (1 vCPU / 1 GB RAM)
- Поставите јаку root лозинку или конфигуришите SSH кључ
- Забележите **јавну IP адресу** (нпр. `203.0.113.10`)

### 1.2 Повезивање преко SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Ажурирање система

```bash
apt update && apt upgrade -y
```

### 1.4 Инсталирање Docker-а

```bash
# Инсталирање зависности
apt install -y ca-certificates curl gnupg

# Додавање званичног Docker репозиторијума
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Инсталирање nginx-а

```bash
apt install -y nginx
```

### 1.6 Конфигурисање заштитног зида (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Савет**: За максималну безбедност, ограничите портове 80 и 443 само на Cloudflare IP адресе. Погледајте одељак [Advanced Security](#advanced-security).

---

## 2. Инсталирање OmniRoute

### 2.1 Креирање директоријума за конфигурацију

```bash
mkdir -p /opt/omniroute
```

### 2.2 Креирање фајла са променљивама окружења

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Безбедност ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # ОБАВЕЗНО у продукцији: користи Codex Responses WS bridge

# === Апликација ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URL адресе (промените на ваш домен) ===
# Интерна server-to-server базна URL адреса за заказане послове / self-fetch захтеве.
BASE_URL=http://127.0.0.1:20128
# URL адреса окренута ка прегледачу која се користи за OAuth callback-ове, линкове табле и генерисане јавне URL адресе.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Опционо, изричито замена јавног порекла за генерисане URL адресе јавних ресурса.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Синхронизација у облаку (опционо) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **ВАЖНО**: Генеришите уникатне тајне кључеве! Користите `openssl rand -hex 32` за сваки кључ.

### 2.3 Покретање контејнера

```bash
docker pull diegosouzapw/omniroute:latest

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### 2.4 Провера да ли је покренут

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Требало би да прикаже: `[DB] SQLite database ready` и `listening on port 20128`.

---

## 3. Podešavanje nginx-a (Reverse Proxy)

### 3.1 Generisanje SSL sertifikata (Cloudflare Origin)

U Cloudflare kontrolnoj tabli:

1. Idite na **SSL/TLS → Origin Server**
2. Kliknite **Create Certificate**
3. Ostavite podrazumevane vrednosti (15 godina, \*.yourdomain.com)
4. Kopirajte **Origin Certificate** i **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Nalepite sertifikat
nano /etc/nginx/ssl/origin.crt

# Nalepite privatni ključ
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Konfiguracija Nginx-a

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Podrazumevani server — blokira direktan pristup preko IP adrese
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    ssl_certificate     /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    server_name _;
    return 444;
}

# OmniRoute — HTTPS
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name llms.yourdomain.com;  # Promenite u svoj domen

    ssl_certificate     /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:20128;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Podrška za WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Server-Sent Events) — striming AI odgovora
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS redirekcija
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Vodite računa da tajmauti reverse-proxy strimova ostanu usklađeni sa vašim OmniRoute env varijablama za tajmaut.
Ako povećate `FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, povećajte i `proxy_read_timeout` / `proxy_send_timeout`
iznad iste granice.

OmniRoute koristi `NEXT_PUBLIC_BASE_URL` kao kanonsko poreklo (origin) koje browser vidi za OAuth
callback-ove i generisane javne linkove. Autentifikovana upisivanja u dashboard-u koriste same-origin zahteve
plus CSRF zaštitu vezanu za sesiju, tako da im nije potreban statički javni base URL. `X-Forwarded-*`
zaglavlja iznad su korisni podaci o rutiranju, ali ne mogu zameniti podešavanje eksplicitnog javnog URL-a kada
OAuth ili generisani browser linkovi zahtevaju jedan. Omogućite `OMNIROUTE_TRUST_PROXY` samo ako klijenti
nemaju direktan pristup OmniRoute-u i ako vaš proxy uklanja/rekonstruiše dolazna forwarded zaglavlja.

### 3.3 Omogućavanje i testiranje

```bash
# Uklonite podrazumevanu konfiguraciju
rm -f /etc/nginx/sites-enabled/default

# Omogućite OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Testirajte i ponovo učitajte
nginx -t && systemctl reload nginx
```

---

## 4. Konfiguracija Cloudflare DNS-a

### 4.1 Dodavanje DNS zapisa

U Cloudflare kontrolnoj tabli → DNS:

| Type | Name   | Content                | Proxy      |
| ---- | ------ | ---------------------- | ---------- |
| A    | `llms` | `203.0.113.10` (VM IP) | ✅ Proxied |

### 4.2 Konfiguracija SSL-a

U okviru **SSL/TLS → Overview**:

- Mode: **Full (Strict)**

U okviru **SSL/TLS → Edge Certificates**:

- Always Use HTTPS: ✅ On
- Minimum TLS Version: TLS 1.2
- Automatic HTTPS Rewrites: ✅ On

### 4.3 Testiranje

```bash
curl -sI https://llms.seudominio.com/health
# Trebalo bi da vrati HTTP/2 200
```

---

## 5. Operacije i održavanje

### Nadogradnja na novu verziju

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Pregled logova

```bash
docker logs -f omniroute          # Praćenje uživo
docker logs omniroute --tail 50   # Poslednjih 50 linija
```

### Ručna rezervna kopija baze podataka

```bash
# Kopiranje podataka iz volumena na host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Ili kompresija čitavog volumena
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Vraćanje iz rezervne kopije

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Napredna bezbednost

### Ograničavanje nginx-a na Cloudflare IP adrese

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 opsezi — periodično ažurirati
# https://www.cloudflare.com/ips-v4/
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
real_ip_header CF-Connecting-IP;
CF
```

Dodajte sledeće u `nginx.conf` unutar `http {}` bloka:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Instalacija fail2ban-a

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Provera statusa
fail2ban-client status sshd
```

### Blokiranje direktnog pristupa Docker portu

```bash
# Sprečavanje direktnog spoljnog pristupa portu 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Trajno čuvanje pravila
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Deploy na Cloudflare Workers (opciono)

Za udaljeni pristup putem Cloudflare Workers-a (bez direktnog izlaganja VM-a):

```bash
# U lokalnom repozitorijumu
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Pogledajte takođe [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) za vodič kroz Cloudflare Tunnel unutar repozitorijuma. Samostalni `omnirouteCloud/` worker se nalazi u odvojenom pratećem repozitorijumu.

---

## Преглед портова

| Port  | Сервис      | Приступ                    |
| ----- | ----------- | -------------------------- |
| 22    | SSH         | Јавно (са fail2ban)        |
| 80    | nginx HTTP  | Преусмерење → HTTPS        |
| 443   | nginx HTTPS | Преко Cloudflare Proxy-ja  |
| 20128 | OmniRoute   | Само локално (преко nginx) |

## Оптимизација за мали VPS / ниску потрошњу меморије

За инсталације на малим VPS инстанцама (1 GB RAM-а или мање):

- **Онемогућите позадинске сервисе** — поставите `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1` да прескочите планер, MCP сервер и периодичне задатке одржавања. Погледајте `docs/reference/ENVIRONMENT.md`.
- **Користите SQLite WAL режим** — подразумевано укључен, смањује врхунску потрошњу меморије током истовременог читања.
- **Ограничите V8 heap** — поставите `OMNIROUTE_MEMORY_MB` (нпр. `512`) тако да runtime не одреди границу већу од саме VM. Погледајте `docs/reference/ENVIRONMENT.md`.
- **Захтевно пропуштање (heavyweight admission) се аутоматски скалира са ограничењем heap-а** -- када се `OMNIROUTE_MEMORY_MB` постави изнад претходно наведеног, буџет за приливне бајтове (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) се сам изводи из те исте границе, тако да меморијски ограничена VM већ добија мањи буџет за истовремене захтеве без додатног подешавања; вишак захтева добија захтев који се може поновити, `503` статус са `Retry-After`, уместо да се такмичи за меморију. Поставите застарело ограничење броја захтева `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` само ако вам је потребна тврда граница поврх овога.
- **Избегавајте `next build` на VPS-у** — градите локално и поставите samostalni (standalone) излаз (`.next/standalone/`).
- **Надгледајте помоћу `top` / `free -m`** — OmniRoute обично користи 200-400 MB RSS-а у стању мировања на VM-у од 1 GB.
