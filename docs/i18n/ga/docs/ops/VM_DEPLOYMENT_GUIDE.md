# VM_DEPLOYMENT_GUIDE (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — Treoir Imeartha ar VM le Cloudflare"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Treoir Imeartha ar VM le Cloudflare

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Treoir iomlán chun OmniRoute a shuitear agus a chumrú ar VM (VPS) le fearann á bhainistiú trí Cloudflare.

## Réamhriachtanais

| Mír         | Íosmhéid                | Molta            |
| ----------- | ----------------------- | ---------------- |
| **CPU**     | 1 vCPU                  | 2 vCPU           |
| **RAM**     | 1 GB                    | 2 GB             |
| **Diosca**  | 10 GB SSD               | 25 GB SSD        |
| **OS**      | Ubuntu 22.04 LTS        | Ubuntu 24.04 LTS |
| **Fearann** | Cláraithe ar Cloudflare | —                |
| **Docker**  | Docker Engine 24+       | Docker 27+       |

**Soláthraithe tástáilte**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Cumraigh an VM

### 1.1 Cruthaigh an t-iarratas

Ag do sholáthraí VPS roghnaithe:

- Roghnaigh Ubuntu 24.04 LTS
- Roghnaigh an phlean íosmhéid (1 vCPU / 1 GB RAM)
- Socraigh pasfhocal láidir root nó cumraigh eochair SSH
- Nóta an **IP poiblí** (m.sh., `203.0.113.10`)

### 1.2 Ceangail le SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Nuashonraigh an córas

```bash
apt update && apt upgrade -y
```

### 1.4 Suiteáil Docker

```bash
# Suiteáil spleáchais
apt install -y ca-certificates curl gnupg

# Cuir leabharlann oifigiúil Docker leis
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Suiteáil nginx

```bash
apt install -y nginx
```

### 1.6 Cumraigh an Tine Chosanta (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (atarlú)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Leid**: Le haghaidh uasta shlándála, srianta poirt 80 agus 443 le hIPanna Cloudflare amháin. Féach an rannán [Slándáil Ardspeisialta](#advanced-security).

---

## 2. Suiteáil OmniRoute

### 2.1 Cruthaigh eolaire cumraíochta

```bash
mkdir -p /opt/omniroute
```

### 2.2 Cruthaigh comhad athróga timpeallachta

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Slándáil ===
JWT_SECRET=Cuir le eochair rúnda uathúil 64 carachtar
INITIAL_PASSWORD=D'FhocalFaireSábháilte123!
API_KEY_SECRET=ATHCHUIR le heochair rúnda eile
STORAGE_ENCRYPTION_KEY=ATHCHUIR le heochair rúnda tríú
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=ATHCHUIR le salann uathúil
OMNIROUTE_WS_BRIDGE_SECRET=ATHCHUIR le rún comhshreafa WS  # RIACHTANACH i dtáirgeadh: úsáidte ag Codex Responses WS bridge

# === App ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URLanna (athraigh go do fearann) ===
# Bun URL inmheánach freastalaí-go-freastalaí do shobrónanna sceidil / faighne féin.
BASE_URL=http://127.0.0.1:20128
# URL atá dírithe ar an mbrabhsálaí a úsáidtear le haghaidh aischallúcháin OAuth, naisc painéil, agus URLanna poiblí ghineadh.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Forchur ardtollsú poiblí roghnach d'URLanna sócmhainní poiblí ghineadh.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Sioncronú Scamall (roghnach) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚇ **TÁBHACHTACH**: Gine eochracha rúnda uathúla! Úsáid `openssl rand -hex 32` le haghaidh gach eochrach.

### 2.3 Tosaigh an coimeádán

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

### 2.4 Deimhnigh go bhfuil sé ag rith

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Ba cheart go dtaifeadhfaí: `[DB] SQLite database ready` agus `ag éisteacht ar phort 20128`.

---

## 3. Cumraigh nginx (Seachfhreastalaí Aisiompaithe)

### 3.1 Cruthaigh teastas SSL (Bunús Cloudflare

I spárálacha Cloudflare:

1. Téigh go **SSL/TLS → Freastalaí Bunúis**
2. Cliceáil **Cruthaigh Teastas**
3. Coinnigh na réamhshocruithe (15 bliain, \*.yourdomain.com)
4. Cóip an **Teastas Bunúis** agus an **Eochair Phríobháideach**

```bash
mkdir -p /etc/nginx/ssl

# Greamaigh an teastas
nano /etc/nginx/ssl/origin.crt

# Greamaigh an eochair phríobháideach
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Cumraíocht Nginx

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Freastalaí réamhshocraithe — cosnaíonn sé rochtain dhíreach trí IP
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
    server_name llms.yourdomain.com;  # Athraigh go do fearann

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

        # Tacaíocht WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Imeachtaí Seachfhoirmithe Freastalaí) — freagraí AI sruthú
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# Aisiompú HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Coinnigh amanna amach seachfhreastalaí aisiompaithe ag teacht le do athróga timpeallachta am amach OmniRoute. Má ardúann tú
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, ardú `proxy_read_timeout` / `proxy_send_timeout`
thuas an tairseach chéanna.

Úsáideann OmniRoute `NEXT_PUBLIC_BASE_URL` mar bhunús canónach brabhsálaí-polaireachta do callbacks
OAuth agus naisc phoiblí gineadh. Úsáideann tuairiscí clárlainne fíordheimhnithe iarratais comhfhoinse
le cosaint CSRF teoranta seisiún, mar sin ní theastaíonn uathoibriú URL poiblí statach. Tá na
ceanntoiscí `X-Forwarded-*` thuas fós úsáideach mar mhaisc faisnéise ródaithe, ach níl siad ina n-ionad
chun URL poiblí soiléir a shocrú nuair a theastaíonn ceann amháin do OAuth nó do naisc brabhsálaí gineadh. Ná cumasaigh ach amháin
`OMNIROUTE_TRUST_PROXY` mura bhfuil OmniRoute inrochtana go díreach ag cliaint agus do seachfhreastalaí
ag ceansú/athchóirigh ceanntoiscí aisiompaithe isteach.

## 4. Cumraigh DNS Cloudflare

### 4.1 Cuir taifead DNS leis

Sa deais Cloudflare → DNS:

| Cineál | Ainm   | Ábhar                  | Seachadadh   |
| ------ | ------ | ---------------------- | ------------ |
| A      | `llms` | `203.0.113.10` (IP VM) | ✅ Seachadta |

### 4.3 Tástáil

```bash
curl -sI https://llms.seudominio.com/health
# Ba cheart HTTP/2 200 a thaispeáint
```

---

## 5. Oibríochtaí agus Cothabháil

### Uasghrádú go leagan nua

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Amharc logaí

```bash
docker logs -f omniroute          # Sruth fíor-ama
docker logs omniroute --tail 50   # An 50 líne deireanach
```

### Táirgeadh láimhe de bhunachar sonraí

```bash
# Cóip sonraí ón toirt go dtí an óstach
docker cp omniroute:/app/data ./backup-$(date +%F)

# Nó comhbhrúigh an toirt iomlán
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Athchóirigh ó thaisclann

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Slándáil Ardleibhéal

### Srian nginx le IPanna Cloudflare

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Ranganna IPv4 Cloudflare — nuashonraigh go tréimhsiúil
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

Cuir an méid seo a leanas leis an bhfáilt `http {}` i `nginx.conf`:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Suiteáil fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Seiceáil stádas
fail2ban-client status sshd
```

### Cosain rochtain dhíreach ar an port Docker

```bash
# Cuir cosc ar rochtain sheachtrach dhíreach ar phort 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Coinnigh na rialacha
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Scaoil go dtí Cloudflare Workers (Roghnach)

Le haghaidh rochtain iarghalta trí Cloudflare Workers (gan an VM a nochtadh go díreach):

```bash
 san stór áitiúil
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Féach freisin [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) le haghaidh an treoir siúlóid Cloudflare Tunnel sa stór. Tá an fostaí Scartha `omnirouteCloud/` ina stór comhshaoil ar leith.

---

## Achoimre na bport

| Port  | Seirbhís    | Rochtain                     |
| ----- | ----------- | ---------------------------- |
| 22    | SSH         | Poiblí (le fail2ban)         |
| 80    | nginx HTTP  | Atreorú → HTTPS              |
| 443   | nginx HTTPS | Trí Cloudflare Proxy         |
| 20128 | OmniRoute   | Localhost amháin (trí nginx) |

## Optamú do VPS le Cuimhne Íseal / Beag

Le haghaidh imscaradh ar chásanna beaga VPS (1 GB RAM nó níos lú):

- **Díchumasaigh seirbhísí cúlra** — socraigh `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1` chun sceidealóir, freastalaí MCP, agus tascanna cothabhála tréimhsiúla a scipeáil. Féach `docs/reference/ENVIRONMENT.md`.
- **Úsáid mód WAL SQLite** — cumasaithe de réir réamhshocraithe, laghdaíonn sé buaicchuimhne le linn léamha comhthráthacha.
- **Cuir caipín ar an gcarn V8** — socraigh `OMNIROUTE_MEMORY_MB` (m.sh. `512`) ionas nach ndéanfaidh an t-am rite uasteorainn a chalabrú níos mó ná an VM. Féach `docs/reference/ENVIRONMENT.md`.
- **Scálaíonn ligean isteach trom-mheáchain go huathoibríoch le caipín an chairn** -- nuair a bhíonn `OMNIROUTE_MEMORY_MB` socraithe thuas, díorthaíonn an buiséad beart ionghabhála (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) é féin ón uasteorainn chéanna sin, mar sin faigheann VM atá srianta ó thaobh cuimhne de buiséad níos lú d'iarratais chomhthráthacha cheana féin gan tiúnadh breise; faigheann iarratais iomarcacha `503` in-aththriail le `Retry-After` in ionad dul san iomaíocht ar chuimhne. Socraigh an caipín comhairimh iarratas `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` oidhreachtúil ach amháin má theastaíonn uasteorainn chrua uait ar a bharr sin.
- **Seachain `next build` ar an VPS** — tóg go háitiúil agus imlonnaigh an t-aschur neamhspleách (`.next/standalone/`).
- **Déan monatóireacht le `top` / `free -m`** — úsáideann OmniRoute 200-400 MB RSS de ghnáth agus é díomhaoin ar VM 1 GB.
