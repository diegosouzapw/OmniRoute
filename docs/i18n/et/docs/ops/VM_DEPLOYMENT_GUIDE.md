# VM_DEPLOYMENT_GUIDE (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — VM-deployimise juhend Cloudflare'iga"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — VM-deployimise juhend Cloudflare'iga

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Täielik juhend OmniRoute paigaldamiseks ja konfigureerimiseks VM-is (VPS-is), kus domeen on haldatud Cloudflare'i kaudu.

---

## Eeldused

| Üksus      | Miinimum                   | Soovitatav       |
| ---------- | -------------------------- | ---------------- |
| **CPU**    | 1 vCPU                     | 2 vCPU           |
| **RAM**    | 1 GB                       | 2 GB             |
| **Kettas** | 10 GB SSD                  | 25 GB SSD        |
| **OS**     | Ubuntu 22.04 LTS           | Ubuntu 24.04 LTS |
| **Domeen** | Registreeritud Cloudflaris | —                |
| **Docker** | Docker Engine 24+          | Docker 27+       |

**Testitud teenusepakkujad**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Konfigureeri VM

### 1.1 Loo instants

Oma eelistatud VPS-teenusepakkujal:

- Vali Ubuntu 24.04 LTS
- Vali minimaalne plaan (1 vCPU / 1 GB RAM)
- Määra tugev root parool või konfigureeri SSH võti
- Märgi **avalik IP** (nt. `203.0.113.10`)

### 1.2 Ühenda SSH kaudu

```bash
ssh root@203.0.113.10
```

### 1.3 Uuenda süsteemi

```bash
apt update && apt upgrade -y
```

### 1.4 Installi Docker

```bash
# Installi sõltuvused
apt install -y ca-certificates curl gnupg

# Lisa ametlik Docker hoidla
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Installi nginx

```bash
apt install -y nginx
```

### 1.6 Konfigureeri tulemüür (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (suunamine)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Näpunäide**: Maksimaalse turvalisuse tagamiseks piira porte 80 ja 443 ainult Cloudflare IP-dele. Vaata jaotist [Täiustatud turvalisus](#täiustatud-turvalisus).

---

## 2. Installi OmniRoute

### 2.1 Loo konfiguratsiooni kataloog

```bash
mkdir -p /opt/omniroute
```

### 2.2 Loo keskkonnamuutujate fail

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Turvalisus ===
JWT_SECRET=MUUDA-UNIKAALSEKS-64-MÄRGI-SALAJÄTME-VÕTMEKS
INITIAL_PASSWORD=SinuTurvalineParool123!
API_KEY_SECRET=ASENDA-TEISE-SALAJÄTME-VÕTMEGA
STORAGE_ENCRYPTION_KEY=ASENDA-KOLMANDA-SALAJÄTME-VÕTMEGA
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=MUUDA-UNIKAALSEKS-SOOLAKS
OMNIROUTE_WS_BRIDGE_SECRET=ASENDA-WS-SILLA-SALAJÄTMEGA  # KOHUSTUSLIK tootmises: kasutatakse Codex Responses WS silla poolt

# === Rakendus ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URL-id (muuda oma domeenile) ===
# Sisemine serverist-serverile baas-URL ajastatud tööde / iseseisvate päringute jaoks.
BASE_URL=http://127.0.0.1:20128
# Brauseri jaoks mõeldud URL OAuth tagasisuunamiste, juhtpaneeli linkide ja genereeritud avalike URL-ide jaoks.
NEXT_PUBLIC_BASE_URL=https://llms.sinudomeen.com
# Valikuline avaliku päritolu ülekirjutus genereeritud avalike varade URL-ide jaoks.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.sinudomeen.com

# === Pilvesünkroonimine (valikuline) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **TÄHTIS**: Genereeri unikaalsed salajätmevõtmed! Kasuta iga võtme jaoks `openssl rand -hex 32`.

### 2.3 Käivita konteiner

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

### 2.4 Kontrolli, kas see töötab

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

See peaks kuvama: `[DB] SQLite database ready` ja `listening on port 20128`.

---

## 3. Nginx konfigureerimine (pöördproksi)

### 3.1 SSL-sertifikaadi genereerimine (Cloudflare Origin)

Cloudflare'i juhtpaneelis:

1. Minge **SSL/TLS → Origin Server**
2. Klõpsake **Create Certificate**
3. Jätke vaikeväärtused (15 aastat, \*.yourdomain.com)
4. Kopeerige **Origin Certificate** ja **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Kleepige sertifikaat
nano /etc/nginx/ssl/origin.crt

# Kleepige privaatvõti
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx konfiguratsioon

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Vaikimisi server — blokeerib otsese juurdepääsu IP kaudu
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
    server_name llms.yourdomain.com;  # Muutke oma domeeniks

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

        # WebSocketi tugi
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Server-Sent Events) — AI vastuste voogedastus
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS ümbersuunamine
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Hoidke pöördproksi voo ajalõpud vastavuses oma OmniRoute ajalõpu keskkonnamuutujatega. Kui tõstate
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, tõstke ka `proxy_read_timeout` / `proxy_send_timeout`
samast lävest kõrgemale.

OmniRoute kasutab `NEXT_PUBLIC_BASE_URL` kui kanoonilist brauseripoolset päritolu OAuth
tagasikutsete ja loodud avalike linkide jaoks. Autenditud juhtpaneeli kirjutused kasutavad sama päritolu päringuid
pluss seansipõhist CSRF-kaitset, seega ei vaja need staatilist avalikku baas-URL-i. Ülaltoodud
`X-Forwarded-*` päised on endiselt kasulikud marsruutimise metaandmed, kuid need ei asenda
selgesõnalise avaliku URL-i seadmist, kui OAuth või loodud brauserilingid seda vajavad. Lubage
`OMNIROUTE_TRUST_PROXY` ainult siis, kui OmniRoute ei ole klientidele otse kättesaadav ja teie proksi
eemaldab/taastab sissetulevad edastatud päised.

### 3.3 Lubamine ja testimine

```bash
# Eemaldage vaikekonfiguratsioon
rm -f /etc/nginx/sites-enabled/default

# Lubage OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Testige ja laadige uuesti
nginx -t && systemctl reload nginx
```

## 4. Konfigureeri Cloudflare DNS

### 4.1 Lisa DNS kirje

Cloudflare juhtimiskeskkonnas → DNS:

| Tüüp | Nimi   | Sisu                   | Proxy      |
| ---- | ------ | ---------------------- | ---------- |
| A    | `llms` | `203.0.113.10` (VM IP) | ✅ Proxyga |

### 4.2 Konfigureeri SSL

Jaotise **SSL/TLS → Ülevaade** all:

- Režiim: **Täielik (Range)**

Jaotise **SSL/TLS → Servitunnistused** all:

- Kasuta alati HTTPS: ✅ Sees
- Minimaalne TLS versioon: TLS 1.2
- Automaatsed HTTPS ümbersuunamised: ✅ Sees

### 4.3 Testimine

```bash
curl -sI https://llms.seudominio.com/health
# Peaks tagastama HTTP/2 200
```

---

## 5. Haldus ja hooldus

### Uuendamine uuele versioonile

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Logide vaatamine

```bash
docker logs -f omniroute          # Reaalajas voog
docker logs omniroute --tail 50   # Viimased 50 rida
```

### Käsitsi andmebaasi varundus

```bash
# Kopeeri andmed mahust hostile
docker cp omniroute:/app/data ./backup-$(date +%F)

# Või pakkige kogu maht kokku
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Taastamine varundusest

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Täiustatud turvalisus

### Piira nginx ainult Cloudflare IP-dele

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 vahemikud — uuenda perioodiliselt
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

Lisa `nginx.conf` faili `http {}` ploki sisse järgmine:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Paigalda fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Kontrolli olekut
fail2ban-client status sshd
```

### Blokeeri otsene ligipääs Docker pordile

```bash
# Takista otsene väline ligipääs porti 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Salvesta reeglid püsivalt
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Deployd Cloudflare Workersisse (Valikuline)

Juurdepääsuks Cloudflare Workersite kaudu ( ilma VM-i otse eksponeerimata):

```bash
# Kohalikus hoidlas
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Vaata lisaks ka [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) Cloudflare Tunnel'i juhendamiseks hoidla sees. Iseseisev `omnirouteCloud/` worker asub eraldi kaashoidlas.

---

## Portide ülevaade

| Port  | Teenus      | Ligipääs                         |
| ----- | ----------- | -------------------------------- |
| 22    | SSH         | Avalik (koos fail2baniga)        |
| 80    | nginx HTTP  | Suunamine → HTTPS                |
| 443   | nginx HTTPS | Cloudflare Proxy kaudu           |
| 20128 | OmniRoute   | Ainult localhost (nginx-i kaudu) |

## Väikese mäluga / väikese VPS-i optimeerimine

Väiksemates VPS-i instantsides (1 GB RAM-i või vähem) toimuvate deploy'i jaoks:

- **Lülita taustateenused välja** — sea `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1`, et vahele jätta ajastaja, MCP server ja perioodilised hooldusülesanded. Vaata `docs/reference/ENVIRONMENT.md`.
- **Kasuta SQLite WAL režiimi** — see on vaikimisi sisse lülitatud, vähendab tipptaset mälu kasutamisel samaaegsetel lugemistel.
- **Piira V8 heap'i** — sea `OMNIROUTE_MEMORY_MB` (nt. `512`), et jooksukeskkond ei kalibreeriks ülemist piiri suuremaks kui VM-i mälu. Vaata `docs/reference/ENVIRONMENT.md`.
- **Raskete ülesannete lubamine skaleerub automaatselt heap'i piiriga** — kui `OMNIROUTE_MEMORY_MB` on seatud ülalmainitud väärtusele, siis sisendvoogude baitside piirang (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) arvutatakse automaatselt sellest samast ülemisest piirist, nii et mälu piiratud VM saab automaatselt väiksema samaaegsete päringute eelarve ilma lisaseadistuseta; liigsed päringud saadavad taaskäivitatava `503` vea koos `Retry-After` parameetriga, mitte ei võistle mälu pärast. Sea vana hea `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` päringute arvu piirang ainult siis, kui vajad sellele lisaks kõva ülemist piiri.
- **Väldi `next build` käivitamist VPS-il** — kompileeri kohalikult ja deploy eraldiseisva väljundi (`.next/standalone/`).
- **Jälgi `top` / `free -m` abil** — OmniRoute kasutab tüüpiliselt 200-400 MB RSS-i tühikäigul 1 GB suuruses VM-is.
