# VM_DEPLOYMENT_GUIDE (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — Gwida tal-Implimentazzjoni fuq VM ma' Cloudflare"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Gwida tal-Implimentazzjoni fuq VM ma' Cloudflare

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Gwida sħiħa biex tinstalla u tikkonfigura OmniRoute fuq VM (VPS) b'dominju ġestit permezz ta' Cloudflare.

---

## Rekwiżiti Preċedenti

| Oġġett      | Minimu                     | Rakkomandat      |
| ----------- | -------------------------- | ---------------- |
| **CPU**     | 1 vCPU                     | 2 vCPU           |
| **RAM**     | 1 GB                       | 2 GB             |
| **Disk**    | 10 GB SSD                  | 25 GB SSD        |
| **OS**      | Ubuntu 22.04 LTS           | Ubuntu 24.04 LTS |
| **Duminju** | Irreġistrat fuq Cloudflare | —                |
| **Docker**  | Docker Engine 24+          | Docker 27+       |

**Fornituri ttestjati**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Ikkonfigura l-VM

### 1.1 Oħloq l-istanza

Fuq il-fornitur VPS preferut tiegħek:

- Agħżel Ubuntu 24.04 LTS
- Agħżel il-pjan minimu (1 vCPU / 1 GB RAM)
- Stabbilwal passord root qawwija jew ikkonfigura SSH key
- Innota l-**IP pubbliku** (e.g., `203.0.113.10`)

### 1.2 Ikkonnettja permezz ta' SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Ġdid is-sistema

```bash
apt update && apt upgrade -y
```

### 1.4 Installa Docker

```bash
# Installa dipendenzi
apt install -y ca-certificates curl gnupg

# Żid ir-repożitorju uffiċjali ta' Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Installa nginx

```bash
apt install -y nginx
```

### 1.6 Ikkonfigura l-Firewall (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (ridirezzjoni)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Parir**: Għal massimu sigurtà, irstrinġi l-portijiet 80 u 443 biss għall-IPs ta' Cloudflare. Ara t-taqsima [Sigurtà Avvanzata](#advanced-security).

---

## 2. Installa OmniRoute

### 2.1 Oħloq direttorju ta' konfigurazzjoni

```bash
mkdir -p /opt/omniroute
```

### 2.2 Oħloq fajl tal-varjabbli ambjentali

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Sigurtà ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # MEĦTIEG fil-produzzjoni: jintuża mill-Codex Responses WS bridge

# === App ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URLs (ibdel bid-duminju tiegħek) ===
# URL intern bbażat fuq server għal xogħol skedat / self-fetches.
BASE_URL=http://127.0.0.1:20128
# URL li tħares lejn il-browser, jintuża għal callbacks tal-OAuth, links tad-dashboard, u URLs pubbliċi ġenerati.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Overrides pubbliċi espliċiti għal URLs ta' assi pubbliċi ġenerati (mhux obbligatorju).
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Synchronizzazzjoni mal-Sħab (mhux obbligatorju) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⠉ **IMPORTANTI**: Ġenera chiavi sekreti uniċi! Usa `openssl rand -hex 32` għal kull chiave.

### 2.3 Ibda l-kontenitur

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

### 2.4 Verifika li qed jaħdem

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Għandu juri: `[DB] SQLite database ready` u `listening on port 20128`.

---

## 3. Ikkonfigura nginx (Reverse Proxy)

### 3.1 Ġenera ċertifikat SSL (Origin ta' Cloudflare)

Fil-dashboard ta' Cloudflare:

1. Mur għal **SSL/TLS → Server tal-Oġġett**
2. Agħfas **Ħloq Ċertifikat**
3. Żomm l-impliċitu (15-il sena, \*.yourdomain.com)
4. Ikkopja l-**Ċertifikat tal-Oġġett** u l-**Kちな-privata**

```bash
mkdir -p /etc/nginx/ssl

# Paste the certificate
nano /etc/nginx/ssl/origin.crt

# Paste the private key
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Konfigurazzjoni tal-Nginx

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Server default — jimblokka l-aċċess dirett permezz ta' IP
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
    server_name llms.yourdomain.com;  # Bdel għad-dominju tiegħek

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

        # Appoġġ għal WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Server-Sent Events) — risposti tal-IA fi streaming
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# Tqabbil minn HTTP għal HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Żomm il-ħinijiet tat-tluq tal-prokura tal-ħlas allinjati mal-varjabbli tal-ambjent tal-ħin tat-tluq tal-OmniRoute tiegħek. Jekk jogħġbok iżid
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, iżid `proxy_read_timeout` / `proxy_send_timeout`
'l fuq mill-istess limitu.

L-OmniRoute tuża `NEXT_PUBLIC_BASE_URL` bħala l-origini kanonika li tiffaċċja l-browser għall-appelli tat-tgħawġem
u l-ħolqien tal-link pubbliċi. Il-ħolqien tal-dashboard awtentikat juża talbiet ta' l-istess origini
flimkien mal-protezzjoni tal-CSRF marbuta mal-sessjoni, għalhekk ma teħtieġx URL pubbliku statiku. It-
tqassim `X-Forwarded-*` ta' hawn fuq għadu utili bħala metadata tal-rotta, iżda huwa mhux sostitut
għal setting tal-URL pubbliku espliċit meta l-OAuth jew il-link tal-browser ġenerati jeħtieġ wieħed. Tattivax
`OMNIROUTE_TRUST_PROXY` jekk l-OmniRoute mhux direttament aċċessibbli mill-klijenti u l-prokura tiegħek
tneħħi/tirikostruwx l-intestaturi li ġew mibgħuta.

### 3.3 Waqfa u Ttestja

```bash
# Neħħi l-konfigurazzjoni awtomatika
rm -f /etc/nginx/sites-enabled/default

# Waqfa l-OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Ttestja u ġeddid
nginx -t && systemctl reload nginx
```

---

## 4. Ikkonfigura DNS ta' Cloudflare

### 4.1 Żid rekord DNS

Fid-dashboard ta' Cloudflare → DNS:

| Tip | Isem   | Kontenut               | Proxied    |
| --- | ------ | ---------------------- | ---------- |
| A   | `llms` | `203.0.113.10` (VM IP) | ✅ Proxied |

### 4.2 Ikkonfigura SSL

Taħt **SSL/TLS → Ġenerali**:

- Mod: **Sħiħ (Strett)**

Taħt **SSL/TLS → Ċertifikati tal-Ponta**:

- Dejjem Ġġib HTTPS: ✅ Mixgħul
- Verżjoni Minima tal-TLS: TLS 1.2
- Riritt tax-Xogħol ta' HTTPS Awtomatiku: ✅ Mixgħul

### 4.3 Ittestjar

```bash
curl -sI https://llms.seudominio.com/health
# Għandu jirritorna HTTP/2 200
```

---

## 5. Ġestjoni u Wiri

### Aġġornament għal verżjoni ġdida

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Ħares il-logs

```bash
docker logs -f omniroute          # Xxow real-time
docker logs omniroute --tail 50   L-aħħar 50 linja
```

### Backup manwali tad-databażi

```bash
# Ikkopja d-data mill-volum għall-host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Jew issaffar l-intier tal-volum
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Irrestawra minn backup

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Sigurtà Avvanzata

### Irrestriġġixxi lill-nginx għal IPs ta' Cloudflare

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Firriek ta' IPv4 ta' Cloudflare — aġġornahom perjodikament
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

Żid dan li ġej fl-`nginx.conf` ġewwa l-blokk `http {}`:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Installa l-fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Iċċekka l-istat
fail2ban-client status sshd
```

### Ħares l-aċċess dirett għall-port tal-Docker

```bash
# Prevjeni aċċess dirett estern għall-port 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Żomm ir-rekords
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Deploy lejn Cloudflare Workers (Opzjonali)

Għal aċċcess permezz ta' Cloudflare Workers (bla ħtiegha li toħroġ il-VM direttament):

```bash
# Fil-repożitorju lokali
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Ara wkoll [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) għall-walkthrough tal-Cloudflare Tunnel fil-repożitorju. Il-worker indipendenti `omnirouteCloud/` jgħix f'repożitorju komplimentari separat.

---

## Sommarju tal-Portijiet

| Port  | Servizz     | Aċċess                             |
| ----- | ----------- | ---------------------------------- |
| 22    | SSH         | Pubbliku (bl-fail2ban)             |
| 80    | nginx HTTP  | Rindirizzament → HTTPS             |
| 443   | nginx HTTPS | Permezz tal-Proxy Cloudflare       |
| 20128 | OmniRoute   | Biss Localhost (permezz tal-nginx) |

## Ottimizzazzjoni għal VPS b'Memorja baxxa / żgħir

Għal deplojamenti fuq istanzi VPS żgħir (1 GB RAM jew inqas):

- **Inattiva servizzi ta' wara l-wiċċ** — issettja `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1` biex tevita l-pjanifikatur, il-MQP server, u l-kompiti ta' manutenzjoni periodika. Ara `docs/reference/ENVIRONMENT.md`.
- **Uża l-modalità WAL tal-SQLite** — attivata minn qabel, tnaqqas il-memorja massima waqt qari kkonkurrenti.
- **Limita l-heap V8** — issettja `OMNIROUTE_MEMORY_MB` (per eż. `512`) biex ir-runtimes ma jikkalibrax limitu akbar mill-VM. Ara `docs/reference/ENVIRONMENT.md`.
- **L-ammessjoni ta' żmien twil tiskala awtomatikament mal-limitu tal-heap** -- ladarba `OMNIROUTE_MEMORY_MB` huwa issettjat 'il fuq, il-budget tal-byte għall-ingest (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) jidderiv mill-istess limitu, għalhekk VM b'memorja mbiegħda diġà jirċievi budget ta' talba kkonkurrenti iżgħar mingħajr titjib ieħor; talbiet żejda jirċievu `503` li jista' jiġi ripetut b'`Retry-After` minfkom jitkaxkru għall-memorja. Issettja l-limitu tal-numru ta' talbiet antik `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` biss jekk għandek bżonn limitu iebes fuq dik.
- **Evita `next build` fuq il-VPS** — ibni lokalment u deploja l-output standalone (`.next/standalone/`).
- **Vġilizzja b'`top` / `free -m`** — OmniRoute ġeneralment juża 200-400 MB RSS waqt offline fuq VM ta' 1 GB.
