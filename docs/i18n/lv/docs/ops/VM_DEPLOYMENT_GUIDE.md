# VM_DEPLOYMENT_GUIDE (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — Ielādes ceļvedis VM ar Cloudflare"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Ielādes ceļvedis VM ar Cloudflare

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Pilnīgs ceļvedis OmniRoute instalēšanai un konfigurēšanai VM (VPS) ar domēnu, ko pārvalda Cloudflare.

---

## Priekšnosacījumi

| Vienība    | Minimālais            | Ieteicamais      |
| ---------- | --------------------- | ---------------- |
| **CPU**    | 1 vCPU                | 2 vCPU           |
| **RAM**    | 1 GB                  | 2 GB             |
| **Disks**  | 10 GB SSD             | 25 GB SSD        |
| **OS**     | Ubuntu 22.04 LTS      | Ubuntu 24.04 LTS |
| **Domēns** | Reģistrēts Cloudflare | —                |
| **Docker** | Docker Engine 24+     | Docker 27+       |

**Pārbaudītie pakalpojumu sniedzēji**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Konfigurēt VM

### 1.1 Izveidot instanci

Savā iecienītākajā VPS pakalpojumu sniedzējā:

- Izvēlieties Ubuntu 24.04 LTS
- Izvēlieties minimālo plānu (1 vCPU / 1 GB RAM)
- Iestatiet spēcīgu root paroli vai konfigurējiet SSH atslēgu
- Piezīmējiet **publisko IP** (piemēram, `203.0.113.10`)

### 1.2 Savienoties, izmantojot SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Atjaunināt sistēmu

```bash
apt update && apt upgrade -y
```

### 1.4 Instalēt Docker

```bash
# Instalēt atkarības
apt install -y ca-certificates curl gnupg

# Pievienot oficiālo Docker krātuvi
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Instalēt nginx

```bash
apt install -y nginx
```

### 1.6 Konfigurēt ugunsmūri (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (pārvirzīšana)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Padoms**: Lai nodrošinātu maksimālu drošību, ierobežojiet portus 80 un 443 tikai ar Cloudflare IP adresēm. Skatiet sadaļu [Uzlabotā drošība](#advanced-security).

---

## 2. Instalēt OmniRoute

### 2.1 Izveidot konfigurācijas direktoriju

```bash
mkdir -p /opt/omniroute
```

### 2.2 Izveidot vides mainīgo failu

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Drošība ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # OBLIGĀTS ražošanā: izmanto Codex Responses WS bridge

# === Lietotne ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URL (mainiet uz savu domēnu) ===
# Iekšējais servera uz servera bāzes URL plānotiem darbiem / pašizsaukumiem.
BASE_URL=http://127.0.0.1:20128
# Pārlūka priekšpuses URL, ko izmanto OAuth atsauces, informācijas paneļa saites un ģenerētie publiskie URL.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Neobligāts eksplicitais publiskās izcelsmes pārrakstīšanas variants ģenerētajiem publiskajiem resursiem.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Mākoņa sinhronizācija (neobligāta) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **SVARĪGI**: Ģenerējiet unikālas slepenās atslēgas! Izmantojiet `openssl rand -hex 32` katrai atslēgai.

### 2.3 Palaist konteineru

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

### 2.4 Pārbaudīt, vai tas darbojas

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Tam vajadzētu parādīt: `[DB] SQLite database ready` un `listening on port 20128`.

---

## 3. Konfigurēt nginx (Reversa starpnieks)

### 3.1 Ģenerēt SSL sertifikātu (Cloudflare izcelsme)

Cloudpane vadības panelī:

1. Ejiet uz **SSL/TLS → Izcelsmes serveri**
2. Noklikšķiniet uz **Izveidot sertifikātu**
3. Saglabājiet noklusējuma iestatījumus (15 gadi, \*.yourdomain.com)
4. Nokopējiet **Izcelsmes sertifikātu** un **Privāto atslēgu**

```bash
mkdir -p /etc/nginx/ssl

# Ielīmējiet sertifikātu
nano /etc/nginx/ssl/origin.crt

# Ielīmējiet privāto atslēgu
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx konfigurācija

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Noklusējuma serveris — bloķē tiešu piekļuvi caur IP
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
    server_name llms.yourdomain.com;  # Mainiet uz savu domēnu

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

        # WebSocket atbalsts
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Server-Sent Events) — straumēšanas AI atbildes
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS novirzīšana
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Saglabājiet reversā starpnieka straumes taimautus atbilstošus jūsu OmniRoute taimauta vides mainīgajiem. Ja paaugstināt
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, paaugstiniet arī `proxy_read_timeout` / `proxy_send_timeout`
virš šī paša sliekšņa.

OmniRoute izmanto `NEXT_PUBLIC_BASE_URL` kā kanonisko pārlūka priekšpusi OAuth
atgriezeniskajiem saucieniem un ģenerētajām publiskajām saitēm. Autentificētas vadības panela rakstīšanas izmanto vienas izcelsmes pieprasījumus
plus ar sesiju saistītu CSRF aizsardzību, tāpēc tām nav nepieciešama statiska publiska bāzes URL. Iepriekš minētie
`X-Forwarded-*` galvenes joprojām ir noderīga maršrutēšanas metadati, bet tās nav aizvietojums
eksplicītā publiskā URL iestatīšanai, kad OAuth vai ģenerētās pārlūka saites to prasa. Iespējojiet
`OMNIROUTE_TRUST_PROXY` tikai tad, ja OmniRoute nav tieši sasniedzams no klientiem un jūsu starpnieks
noņem/pārbūvē ienākošās pārsūtīšanas galvenes.

### 3.3 Iespējot un pārbaudīt

```bash
# Noņemt noklusējuma konfigurāciju
rm -f /etc/nginx/sites-enabled/default

# Iespējot OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Pārbaudīt un pārlādēt
nginx -t && systemctl reload nginx
```

---

## 4. Konfigurēt Cloudflare DNS

### 4.1 Pievienot DNS ierakstu

Cloudflare informācijas panelī → DNS:

| Tips | Nosaukums | Saturs                 | Proksejs    |
| ---- | --------- | ---------------------- | ----------- |
| A    | `llms`    | `203.0.113.10` (VM IP) | ✅ Proksēts |

### 4.2 Konfigurēt SSL

Sadaļā **SSL/TLS → Pārskats**:

- Režīms: **Pilns (Stingrs)**

Sadaļā **SSL/TLS → Malas sertifikāti**:

- Vienmēr izmantot HTTPS: ✅ Ieslēgts
- Minimālā TLS versija: TLS 1.2
- Automātiskās HTTPS pārrakstīšanas: ✅ Ieslēgta

### 4.3 Testēšana

```bash
curl -sI https://llms.seudominio.com/health
# Jāatgriež HTTP/2 200
```

---

## 5. Darbības un Uzturēšana

### Atjaunināšana uz jaunu versiju

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Skatīt žurnālus

```bash
docker logs -f omniroute          # Tiešraides straume
docker logs omniroute --tail 50   # Pēdējās 50 rindas
```

### Manuāla datu bāzes dublēšana

```bash
# Kopēt datus no sējuma uz saimniekdatoru
docker cp omniroute:/app/data ./backup-$(date +%F)

# Vai saspiest visu sējumu
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Atjaunošana no dublējuma

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Uzlabota Drošība

### Ierobežot nginx uz Cloudflare IP adresēm

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 diapazoni — periodiski jāatjaunina
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

Pievienojiet šādu saturu `nginx.conf` failā `http {}` blokā:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Instalēt fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Pārbaudīt statusu
fail2ban-client status sshd
```

### Bloķēt tiešu piekļuvi Docker portam

```bash
# Novērst tiešu ārēju piekļuvi portam 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Saglabāt noteikumus
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Izvietošana Cloudflare Workers (Pēc izvēles)

Attālai piekļuvei caur Cloudflare Workers (bez VM tiešas eksponēšanas):

```bash
# Vietējā repozitorijā
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Skatīt arī [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) par Cloudflare Tunnel norādījumiem repozitorijā. Atsevišķais `omnirouteCloud/` workers atrodas atsevišķā pavadošā repozitorijā.

---

## Portu pārskats

| Ports | Pakalpojums | Piekļuve                         |
| ----- | ----------- | -------------------------------- |
| 22    | SSH         | Publisks (ar fail2ban)           |
| 80    | nginx HTTP  | Pāradresē → HTTPS                |
| 443   | nginx HTTPS | Caur Cloudflare starpniekserveri |
| 20128 | OmniRoute   | Tikai localhost (caur nginx)     |

## Mazatmiņas / Mazā VPS optimizācija

Izvietojumiem mazos VPS instancēs (1 GB RAM vai mazāk):

- **Atspējot fona pakalpojumus** — iestatiet `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1`, lai izlaistu plānotāju, MCP serveri un periodiskos uzturēšanas uzdevumus. Skatīt `docs/reference/ENVIRONMENT.md`.
- **Izmantot SQLite WAL režīmu** — iespējots pēc noklusējuma, samazina maksimālo atmiņas lietošanu vienlaicīgu lasījumu laikā.
- **Ierobežot V8 kaudzi** — iestatiet `OMNIROUTE_MEMORY_MB` (piemēram, `512`), lai izpildes vide nekalibrētu griestu, kas ir lielāks par VM. Skatīt `docs/reference/ENVIRONMENT.md`.
- **Smagā ievadīšana automātiski mērogojas ar kaudzes ierobežojumu** — kad iepriekšminētais `OMNIROUTE_MEMORY_MB` ir iestatīts, ievadīšanas baitu budžets (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) izriet no tā paša griesta, tādēļ atmiņas ierobežota VM jau saņem mazāku vienlaicīgu pieprasījumu budžetu bez papildu pielāgojumiem; lieki pieprasījumi saņem atkārtojamu `503` ar `Retry-After` statusu, nevis sacenstos par atmiņu. Veco `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` pieprasījumu skaita ierobežojumu iestatiet tikai tad, ja nepieciešams cietais griests virs tā.
- **Izvairieties no `next build` uz VPS** — veiciet būvējumu lokāli un izvietojiet neatkarīgo izeju (`.next/standalone/`).
- **Monitorējiet ar `top` / `free -m`** — OmniRoute parasti patērē 200-400 MB RSS dīkstāves režīmā uz 1 GB VM.
