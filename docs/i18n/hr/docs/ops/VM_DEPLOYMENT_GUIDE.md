# VM_DEPLOYMENT_GUIDE (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — Vodič za implementaciju na VM-u s Cloudflareom"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Vodič za implementaciju na VM-u s Cloudflareom

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Cjeloviti vodič za instalaciju i konfiguraciju OmniRoutea na VM-u (VPS) s domenom kojom se upravlja putem Cloudflarea.

---

## Preduvjeti

| Stavka     | Minimalno                   | Preporučeno      |
| ---------- | --------------------------- | ---------------- |
| **CPU**    | 1 vCPU                      | 2 vCPU           |
| **RAM**    | 1 GB                        | 2 GB             |
| **Disk**   | 10 GB SSD                   | 25 GB SSD        |
| **OS**     | Ubuntu 22.04 LTS            | Ubuntu 24.04 LTS |
| **Domena** | Registrirana na Cloudflareu | —                |
| **Docker** | Docker Engine 24+           | Docker 27+       |

**Testirani davatelji usluga**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Konfiguriranje virtualnog stroja

### 1.1 Kreiranje instance

Kod vašeg omiljenog VPS pružatelja usluge:

- Odaberite Ubuntu 24.04 LTS
- Odaberite minimalni plan (1 vCPU / 1 GB RAM)
- Postavite jaku root lozinku ili konfigurirajte SSH ključ
- Zabilježite **javnu IP adresu** (npr. `203.0.113.10`)

### 1.2 Spajanje putem SSH-a

```bash
ssh root@203.0.113.10
```

### 1.3 Ažuriranje sustava

```bash
apt update && apt upgrade -y
```

### 1.4 Instaliranje Dockera

```bash
# Instaliranje ovisnosti
apt install -y ca-certificates curl gnupg

# Dodavanje službenog Docker repozitorija
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Instaliranje nginx-a

```bash
apt install -y nginx
```

### 1.6 Konfiguriranje vatrozida (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (preusmjeravanje)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Savjet**: Za maksimalnu sigurnost, ograničite portove 80 i 443 samo na Cloudflare IP adrese. Pogledajte odjeljak [Napredna sigurnost](#advanced-security).

---

## 2. Instaliranje OmniRoute

### 2.1 Kreiranje direktorija za konfiguraciju

```bash
mkdir -p /opt/omniroute
```

### 2.2 Kreiranje datoteke s varijablama okoline

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Sigurnost ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # POTREBNO u produkciji: koristi ga Codex Responses WS bridge

# === Aplikacija ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URL-ovi (promijenite u svoju domenu) ===
# Interni server-to-server bazni URL za zakazane poslove / samo-dohvate.
BASE_URL=http://127.0.0.1:20128
# Javni URL vidljiv u pregledniku koji se koristi za OAuth povratne pozive, veze nadzorne ploče i generirane javne URL-ove.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Opcionalno explicitno preklapanje javnog izvora za generirane javne URL-ove resursa.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Cloud sinkronizacija (opcionalno) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **VAŽNO**: Generirajte jedinstvene tajne ključeve! Za svaki ključ koristite `openssl rand -hex 32`.

### 2.3 Pokretanje kontejnera

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

### 2.4 Provjerite je li pokrenuto

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Trebalo bi prikazati: `[DB] SQLite database ready` i `listening on port 20128`.

---

## 3. Konfiguracija nginx-a (Reverse Proxy)

### 3.1 Generiranje SSL certifikata (Cloudflare Origin)

Na Cloudflare nadzornoj ploči:

1. Idite na **SSL/TLS → Origin Server**
2. Kliknite **Create Certificate**
3. Zadržite zadane postavke (15 godina, \*.yourdomain.com)
4. Kopirajte **Origin Certificate** i **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Zalijepite certifikat
nano /etc/nginx/ssl/origin.crt

# Zalijepite privatni ključ
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Konfiguracija Nginx-a

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Zadani server — blokira izravan pristup putem IP adrese
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
    server_name llms.yourdomain.com;  # Promijenite u svoju domenu

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

        # SSE (Server-Sent Events) — streaming AI odgovora
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS preusmjeravanje
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Neka vremenska ograničenja (timeouts) reverse-proxy streama budu usklađena s OmniRoute env varijablama za timeout. Ako povećate
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, povećajte `proxy_read_timeout` / `proxy_send_timeout`
iznad istog praga.

OmniRoute koristi `NEXT_PUBLIC_BASE_URL` kao kanonsko podrijetlo (origin) okrenuto prema pregledniku za OAuth
callback-ove i generirane javne veze. Autentificirani upisi na nadzornoj ploči koriste zahtjeve istog podrijetla (same-origin)
te CSRF zaštitu vezanu za sesiju, pa im nije potreban statički javni base URL. Zaglavlja
`X-Forwarded-*` iznad ostaju korisni metapodaci za usmjeravanje, ali nisu zamjena
za postavljanje eksplicitnog javnog URL-a kada su OAuth ili generirane veze u pregledniku potrebne. Omogućite
`OMNIROUTE_TRUST_PROXY` samo ako OmniRoute nije izravno dostupan klijentima i vaš proxy
uklanja/ponovno izgrađuje dolazna forwarded zaglavlja.

### 3.3 Omogućavanje i testiranje

```bash
# Uklonite zadanu konfiguraciju
rm -f /etc/nginx/sites-enabled/default

# Omogućite OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Testirajte i ponovno učitajte
nginx -t && systemctl reload nginx
```

---

## 4. Konfiguracija Cloudflare DNS-a

### 4.1 Dodavanje DNS zapisa

U Cloudflare dashboardu → DNS:

| Type | Name   | Content                | Proxy      |
| ---- | ------ | ---------------------- | ---------- |
| A    | `llms` | `203.0.113.10` (VM IP) | ✅ Proxied |

### 4.2 Konfiguracija SSL-a

U odjeljku **SSL/TLS → Overview**:

- Način rada: **Full (Strict)**

U odjeljku **SSL/TLS → Edge Certificates**:

- Always Use HTTPS: ✅ On
- Minimum TLS Version: TLS 1.2
- Automatic HTTPS Rewrites: ✅ On

### 4.3 Testiranje

```bash
curl -sI https://llms.seudominio.com/health
# Trebalo bi vratiti HTTP/2 200
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

### Pregled zapisnika

```bash
docker logs -f omniroute          # Prikaz u stvarnom vremenu
docker logs omniroute --tail 50   # Zadnjih 50 redaka
```

### Ručna sigurnosna kopija baze podataka

```bash
# Kopiranje podataka iz volumena na host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Ili komprimiranje cijelog volumena
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Vraćanje iz sigurnosne kopije

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Napredna sigurnost

### Ograničavanje nginx-a na Cloudflare IP adrese

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 rasponi — povremeno ažurirati
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

Dodajte sljedeće u `nginx.conf` unutar blока `http {}`:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Instalacija fail2ban-a

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Provjera statusa
fail2ban-client status sshd
```

### Blokiranje izravnog pristupa Docker portu

```bash
# Sprječavanje izravnog vanjskog pristupa portu 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Trajno spremanje pravila
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Postavljanje na Cloudflare Workers (neobavezno)

Za udaljeni pristup putem Cloudflare Workers (bez izravnog izlaganja VM-a):

```bash
# U lokalnom repozitoriju
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Pogledajte također [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) za vodič kroz Cloudflare Tunnel unutar repozitorija. Samostalni `omnirouteCloud/` worker nalazi se u odvojenom pratećem repozitoriju.

---

## Sažetak portova

| Port  | Servis      | Pristup                      |
| ----- | ----------- | ---------------------------- |
| 22    | SSH         | Javno (uz fail2ban)          |
| 80    | nginx HTTP  | Preusmjeravanje → HTTPS      |
| 443   | nginx HTTPS | Putem Cloudflare Proxy-a     |
| 20128 | OmniRoute   | Samo localhost (putem nginx) |

## Optimizacija za slabe/male VPS-ove

Za implementacije na malim VPS instancama (1 GB RAM-a ili manje):

- **Isključite pozadinske servise** — postavite `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1` da biste izostavili scheduler, MCP server i periodične zadatke održavanja. Pogledajte `docs/reference/ENVIRONMENT.md`.
- **Koristite SQLite WAL mod** — omogućen je po zadanim postavkama, smanjuje maksimalnu potrošnju memorije prilikom istovremenih čitanja.
- **Ograničite V8 heap** — postavite `OMNIROUTE_MEMORY_MB` (npr. `512`) tako da runtime ne kalibrira gornju granicu veću od same VM-a. Pogledajte `docs/reference/ENVIRONMENT.md`.
- **Prihvat teških zadataka automatski se skalira s ograničenjem heap-a** -- kada je iznad postavljen `OMNIROUTE_MEMORY_MB`, budžet za ulazne bajtove (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) izvodi se iz te iste gornje granice, tako da memorijski ograničena VM automatski dobiva manji budžet za istovremene zahtjeve bez dodatnog podešavanja; suvišni zahtjevi dobivaju odgovor koji se može ponoviti, `503`, s `Retry-After` umjesto da se natječu za memoriju. Postavite naslijeđeno ograničenje broja zahtjeva `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` samo ako vam je potrebna tvrda gornja granica povrh toga.
- **Izbjegavajte `next build` na VPS-u** — izgradite lokalno i implementirajte samostalni (standalone) izlaz (`.next/standalone/`).
- **Nadzirite pomoću `top` / `free -m`** — OmniRoute obično koristi 200-400 MB RSS-a u stanju mirovanja na 1 GB VM-u.
