# VM_DEPLOYMENT_GUIDE (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — Vodnik za namestitev na VM s storitvijo Cloudflare"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Vodnik za namestitev na VM s storitvijo Cloudflare

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Celovit vodnik za namestitev in konfiguracijo rešitve OmniRoute na navideznem strežniku (VPS) z domeno, upravljano prek storitve Cloudflare.

---

## Predpogoji

| Element    | Najmanj                     | Priporočeno      |
| ---------- | --------------------------- | ---------------- |
| **CPE**    | 1 vCPU                      | 2 vCPU           |
| **RAM**    | 1 GB                        | 2 GB             |
| **Disk**   | 10 GB SSD                   | 25 GB SSD        |
| **OS**     | Ubuntu 22.04 LTS            | Ubuntu 24.04 LTS |
| **Domena** | Registrirana pri Cloudflare | —                |
| **Docker** | Docker Engine 24+           | Docker 27+       |

**Preizkušeni ponudniki**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Konfigurirajte VM

### 1.1 Ustvarite primerek

Pri izbranem ponudniku VPS:

- Izberite Ubuntu 24.04 LTS
- Izberite najmanjši paket (1 vCPU / 1 GB RAM)
- Nastavite močno geslo uporabnika root ali konfigurirajte ključ SSH
- Zabeležite si **javni naslov IP** (npr. `203.0.113.10`)

### 1.2 Povežite se prek SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Posodobite sistem

```bash
apt update && apt upgrade -y
```

### 1.4 Namestite Docker

```bash
# Namestite odvisnosti
apt install -y ca-certificates curl gnupg

# Dodajte uradno skladišče Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Namestite nginx

```bash
apt install -y nginx
```

### 1.6 Konfigurirajte požarni zid (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (preusmeritev)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Namig**: Za največjo varnost omejite vrata 80 in 443 samo na naslove IP storitve Cloudflare. Glejte razdelek [Napredna varnost](#advanced-security).

---

## 2. Namestite OmniRoute

### 2.1 Ustvarite konfiguracijski imenik

```bash
mkdir -p /opt/omniroute
```

### 2.2 Ustvarite datoteko z okoljskimi spremenljivkami

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Varnost ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # OBVEZNO v produkciji: uporablja ga most Codex Responses WS

# === Aplikacija ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URL-ji (spremenite na svojo domeno) ===
# Notranji osnovni URL za komunikacijo med strežniki, ki ga uporabljajo načrtovana opravila / lastne zahteve.
BASE_URL=http://127.0.0.1:20128
# URL za brskalnik, ki se uporablja za povratne klice OAuth, povezave nadzorne plošče in ustvarjene javne URL-je.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Izbirna izrecna preglasitev javnega izvora za ustvarjene javne URL-je sredstev.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Sinhronizacija v oblaku (izbirno) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **POMEMBNO**: Ustvarite edinstvene skrivne ključe! Za vsak ključ uporabite `openssl rand -hex 32`.

### 2.3 Zaženite vsebnik

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

### 2.4 Preverite, ali se izvaja

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Prikazati bi se moralo: `[DB] SQLite database ready` in `listening on port 20128`.

---

## 3. Konfiguracija nginx (obratni posredniški strežnik)

### 3.1 Ustvarjanje SSL-potrdila (Cloudflare Origin)

Na nadzorni plošči Cloudflare:

1. Pojdite na **SSL/TLS → Origin Server**
2. Kliknite **Create Certificate**
3. Ohranite privzete nastavitve (15 let, \*.yourdomain.com)
4. Kopirajte **Origin Certificate** in **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Prilepite potrdilo
nano /etc/nginx/ssl/origin.crt

# Prilepite zasebni ključ
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Konfiguracija nginx

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Privzeti strežnik — blokira neposreden dostop prek naslova IP
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
    server_name llms.yourdomain.com;  # Spremenite v svojo domeno

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

        # Podpora za WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (dogodki, ki jih pošilja strežnik) — pretočni odgovori umetne inteligence
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# Preusmeritev HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Časovne omejitve pretakanja obratnega posredniškega strežnika naj bodo usklajene s spremenljivkami okolja za časovne omejitve OmniRoute. Če povečate
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, povečajte `proxy_read_timeout` / `proxy_send_timeout`
nad isti prag.

OmniRoute uporablja `NEXT_PUBLIC_BASE_URL` kot kanonični izvor, viden brskalniku, za povratne klice
OAuth in ustvarjene javne povezave. Overjena zapisovanja na nadzorni plošči uporabljajo zahteve istega izvora
in zaščito CSRF, vezano na sejo, zato ne zahtevajo statičnega javnega osnovnega URL-ja. Zgornje
glave `X-Forwarded-*` so še vedno uporabni metapodatki za usmerjanje, vendar ne nadomeščajo
nastavitve izrecnega javnega URL-ja, kadar ga potrebujejo OAuth ali ustvarjene povezave za brskalnik. Možnost
`OMNIROUTE_TRUST_PROXY` omogočite samo, če odjemalci ne morejo neposredno dostopati do OmniRoute in vaš posredniški strežnik
odstrani/znova ustvari dohodne posredovane glave.

### 3.3 Omogočanje in preizkus

```bash
# Odstranite privzeto konfiguracijo
rm -f /etc/nginx/sites-enabled/default

# Omogočite OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Preizkusite in znova naložite
nginx -t && systemctl reload nginx
```

---

## 4. Konfiguracija DNS-ja Cloudflare

### 4.1 Dodajanje zapisa DNS

Na nadzorni plošči Cloudflare → DNS:

| Vrsta | Ime    | Vsebina                   | Posredovanje prek posredniškega strežnika |
| ----- | ------ | ------------------------- | ----------------------------------------- |
| A     | `llms` | `203.0.113.10` (IP VM-ja) | ✅ Omogočeno                              |

### 4.2 Konfiguracija SSL-ja

V razdelku **SSL/TLS → Overview**:

- Način: **Full (Strict)**

V razdelku **SSL/TLS → Edge Certificates**:

- Vedno uporabi HTTPS: ✅ Vklopljeno
- Najnižja različica TLS-ja: TLS 1.2
- Samodejno prepisovanje HTTPS: ✅ Vklopljeno

### 4.3 Preizkušanje

```bash
curl -sI https://llms.seudominio.com/health
# Vrnjeno mora biti HTTP/2 200
```

---

## 5. Upravljanje in vzdrževanje

### Nadgradnja na novo različico

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Ogled dnevnikov

```bash
docker logs -f omniroute          # Tok v realnem času
docker logs omniroute --tail 50   # Zadnjih 50 vrstic
```

### Ročno varnostno kopiranje podatkovne zbirke

```bash
# Kopiranje podatkov iz nosilca na gostitelja
docker cp omniroute:/app/data ./backup-$(date +%F)

# Ali stiskanje celotnega nosilca
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Obnovitev iz varnostne kopije

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Napredna varnost

### Omejitev nginx-a na naslove IP storitve Cloudflare

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Obsegi IPv4 storitve Cloudflare — redno jih posodabljajte
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

V datoteko `nginx.conf` znotraj bloka `http {}` dodajte naslednje:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Namestitev fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Preverjanje stanja
fail2ban-client status sshd
```

### Blokiranje neposrednega dostopa do vrat Dockerja

```bash
# Preprečevanje neposrednega zunanjega dostopa do vrat 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Trajna shranitev pravil
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Uvedba v Cloudflare Workers (izbirno)

Za oddaljeni dostop prek Cloudflare Workers (brez neposrednega izpostavljanja VM-ja):

```bash
# V lokalnem repozitoriju
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Glejte tudi [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) za navodila po korakih za Cloudflare Tunnel znotraj repozitorija. Samostojni delovni proces `omnirouteCloud/` je v ločenem spremljevalnem repozitoriju.

---

## Povzetek vrat

| Vrata | Storitev    | Dostop                                  |
| ----- | ----------- | --------------------------------------- |
| 22    | SSH         | Javno (z zaščito fail2ban)              |
| 80    | nginx HTTP  | Preusmeritev → HTTPS                    |
| 443   | nginx HTTPS | Prek posredniškega strežnika Cloudflare |
| 20128 | OmniRoute   | Samo localhost (prek nginx)             |

## Optimizacija za malo pomnilnika / majhen VPS

Za namestitve v majhnih primerkih VPS (1 GB RAM-a ali manj):

- **Onemogočite storitve v ozadju** — nastavite `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1`, da preskočite razporejevalnik, strežnik MCP in periodična vzdrževalna opravila. Glejte `docs/reference/ENVIRONMENT.md`.
- **Uporabite način WAL za SQLite** — privzeto je omogočen in zmanjša največjo porabo pomnilnika med sočasnimi branji.
- **Omejite kopico V8** — nastavite `OMNIROUTE_MEMORY_MB` (npr. `512`), da izvajalno okolje ne umeri zgornje meje, večje od navideznega stroja. Glejte `docs/reference/ENVIRONMENT.md`.
- **Odobritev zahtevnih zahtev se samodejno prilagaja omejitvi kopice** -- ko je zgoraj nastavljena spremenljivka `OMNIROUTE_MEMORY_MB`, se proračun bajtov za sprejem (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) izračuna iz iste zgornje meje, zato navidezni stroj z omejenim pomnilnikom že prejme manjši proračun za sočasne zahteve brez dodatnega prilagajanja; presežne zahteve namesto tekmovanja za pomnilnik prejmejo ponovljiv odgovor `503` z glavo `Retry-After`. Starejšo omejitev števila zahtev `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` nastavite samo, če poleg tega potrebujete še strogo zgornjo mejo.
- **Ne izvajajte `next build` na VPS-ju** — gradnjo izvedite lokalno in namestite samostojni izhod (`.next/standalone/`).
- **Spremljajte z `top` / `free -m`** — OmniRoute v mirovanju na navideznem stroju z 1 GB pomnilnika običajno uporablja 200–400 MB RSS-a.
