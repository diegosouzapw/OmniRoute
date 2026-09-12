# VM_DEPLOYMENT_GUIDE (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — diegimo virtualiojoje mašinoje su Cloudflare vadovas"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — diegimo virtualiojoje mašinoje su Cloudflare vadovas

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Išsamus OmniRoute diegimo ir konfigūravimo virtualiojoje mašinoje (VPS), naudojant per Cloudflare valdomą domeną, vadovas.

---

## Būtinosios sąlygos

| Elementas   | Minimalūs reikalavimai    | Rekomenduojama   |
| ----------- | ------------------------- | ---------------- |
| **CPU**     | 1 vCPU                    | 2 vCPU           |
| **RAM**     | 1 GB                      | 2 GB             |
| **Diskas**  | 10 GB SSD                 | 25 GB SSD        |
| **OS**      | Ubuntu 22.04 LTS          | Ubuntu 24.04 LTS |
| **Domenas** | Užregistruotas Cloudflare | —                |
| **Docker**  | Docker Engine 24+         | Docker 27+       |

**Išbandyti paslaugų teikėjai**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Sukonfigūruokite VM

### 1.1 Sukurkite egzempliorių

Pasirinkto VPS paslaugų teikėjo aplinkoje:

- Pasirinkite Ubuntu 24.04 LTS
- Pasirinkite minimalų planą (1 vCPU / 1 GB RAM)
- Nustatykite patikimą root slaptažodį arba sukonfigūruokite SSH raktą
- Užsirašykite **viešąjį IP adresą** (pvz., `203.0.113.10`)

### 1.2 Prisijunkite per SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Atnaujinkite sistemą

```bash
apt update && apt upgrade -y
```

### 1.4 Įdiekite Docker

```bash
# Įdiekite priklausomybes
apt install -y ca-certificates curl gnupg

# Pridėkite oficialią Docker saugyklą
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Įdiekite nginx

```bash
apt install -y nginx
```

### 1.6 Sukonfigūruokite užkardą (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (peradresavimas)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Patarimas**: Siekdami didžiausio saugumo, leiskite prieigą prie 80 ir 443 prievadų tik iš Cloudflare IP adresų. Žr. skyrių [Išplėstinė sauga](#advanced-security).

---

## 2. Įdiekite OmniRoute

### 2.1 Sukurkite konfigūracijos katalogą

```bash
mkdir -p /opt/omniroute
```

### 2.2 Sukurkite aplinkos kintamųjų failą

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Saugumas ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # BŪTINA gamybinėje aplinkoje: naudojama Codex Responses WS tiltui

# === Programa ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URL (pakeiskite į savo domeną) ===
# Vidinis bazinis URL, skirtas suplanuotoms užduotims ir vidinėms užklausoms tarp serverių.
BASE_URL=http://127.0.0.1:20128
# Naršyklei skirtas URL, naudojamas OAuth atgaliniams iškvietimams, valdymo skydelio nuorodoms ir sugeneruotiems viešiesiems URL.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Pasirinktinis aiškiai nurodytas viešosios kilmės adreso perrašymas, skirtas sugeneruotiems viešiesiems išteklių URL.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Sinchronizavimas su debesija (pasirinktinis) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **SVARBU**: Sugeneruokite unikalius slaptuosius raktus! Kiekvienam raktui naudokite `openssl rand -hex 32`.

### 2.3 Paleiskite konteinerį

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

### 2.4 Patikrinkite, ar jis veikia

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Turėtų būti rodoma: `[DB] SQLite database ready` ir `listening on port 20128`.

---

## 3. Sukonfigūruokite nginx (atvirkštinį tarpinį serverį)

### 3.1 Sugeneruokite SSL sertifikatą („Cloudflare Origin“)

„Cloudflare“ valdymo skydelyje:

1. Eikite į **SSL/TLS → Origin Server**
2. Spustelėkite **Create Certificate**
3. Palikite numatytuosius nustatymus (15 metų, \*.yourdomain.com)
4. Nukopijuokite **Origin Certificate** ir **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Įklijuokite sertifikatą
nano /etc/nginx/ssl/origin.crt

# Įklijuokite privatųjį raktą
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx konfigūracija

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Numatytasis serveris — blokuoja tiesioginę prieigą per IP
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
    server_name llms.yourdomain.com;  # Pakeiskite į savo domeną

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

        # WebSocket palaikymas
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (serverio siunčiami įvykiai) — srautiniai DI atsakymai
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS peradresavimas
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Suderinkite atvirkštinio tarpinio serverio srauto skirtąjį laiką su „OmniRoute“ skirtojo laiko aplinkos kintamaisiais. Jei padidinate
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, padidinkite `proxy_read_timeout` / `proxy_send_timeout`
virš tos pačios ribinės vertės.

„OmniRoute“ naudoja `NEXT_PUBLIC_BASE_URL` kaip kanoninį naršyklei skirtą pradinį adresą, naudojamą „OAuth“
atgaliniams iškvietimams ir sugeneruotoms viešosioms nuorodoms. Autentifikuoti valdymo skydelio įrašymo veiksmai naudoja tos pačios kilmės užklausas
ir su sesija susietą CSRF apsaugą, todėl jiems nereikia statinio viešojo bazinio URL. Aukščiau pateiktos
`X-Forwarded-*` antraštės vis tiek yra naudingi maršruto parinkimo metaduomenys, tačiau jos nepakeičia
aiškaus viešojo URL nustatymo, kai jo reikia „OAuth“ arba sugeneruotoms naršyklės nuorodoms. Įjunkite
`OMNIROUTE_TRUST_PROXY` tik tuo atveju, jei klientai negali tiesiogiai pasiekti „OmniRoute“ ir jūsų tarpinis serveris
pašalina arba iš naujo sukuria gaunamas persiuntimo antraštes.

### 3.3 Įjunkite ir patikrinkite

```bash
# Pašalinkite numatytąją konfigūraciją
rm -f /etc/nginx/sites-enabled/default

# Įjunkite OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Patikrinkite ir įkelkite iš naujo
nginx -t && systemctl reload nginx
```

---

## 4. Cloudflare DNS konfigūravimas

### 4.1 DNS įrašo pridėjimas

Cloudflare valdymo skydelyje → DNS:

| Tipas | Pavadinimas | Turinys                | Tarpinis serveris |
| ----- | ----------- | ---------------------- | ----------------- |
| A     | `llms`      | `203.0.113.10` (VM IP) | ✅ Įjungtas       |

### 4.2 SSL konfigūravimas

Skiltyje **SSL/TLS → Overview**:

- Režimas: **Full (Strict)**

Skiltyje **SSL/TLS → Edge Certificates**:

- Visada naudoti HTTPS: ✅ Įjungta
- Minimali TLS versija: TLS 1.2
- Automatinis HTTPS perrašymas: ✅ Įjungta

### 4.3 Testavimas

```bash
curl -sI https://llms.seudominio.com/health
# Turėtų būti grąžintas HTTP/2 200
```

---

## 5. Eksploatavimas ir priežiūra

### Atnaujinimas į naują versiją

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Žurnalų peržiūra

```bash
docker logs -f omniroute          # Srautas realiuoju laiku
docker logs omniroute --tail 50   # Paskutinės 50 eilučių
```

### Rankinis duomenų bazės atsarginės kopijos kūrimas

```bash
# Nukopijuoti duomenis iš tomo į pagrindinį kompiuterį
docker cp omniroute:/app/data ./backup-$(date +%F)

# Arba suglaudinti visą tomą
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Atkūrimas iš atsarginės kopijos

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Išplėstinė sauga

### nginx apribojimas iki Cloudflare IP adresų

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 diapazonai — periodiškai atnaujinkite
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

Įtraukite toliau nurodytą eilutę į `nginx.conf`, bloko `http {}` viduje:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### fail2ban diegimas

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Patikrinti būseną
fail2ban-client status sshd
```

### Tiesioginės prieigos prie Docker prievado blokavimas

```bash
# Neleisti tiesioginės išorinės prieigos prie 20128 prievado
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Išsaugoti taisykles
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Diegimas į Cloudflare Workers (pasirinktinai)

Nuotolinei prieigai per Cloudflare Workers (tiesiogiai neatskleidžiant VM):

```bash
# Vietinėje saugykloje
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Taip pat žr. [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md), kuriame pateiktas saugykloje esantis Cloudflare Tunnel naudojimo vadovas. Atskiras `omnirouteCloud/` worker yra atskiroje susietoje saugykloje.

---

## Prievadų suvestinė

| Prievadas | Paslauga    | Prieiga                   |
| --------- | ----------- | ------------------------- |
| 22        | SSH         | Vieša (su fail2ban)       |
| 80        | nginx HTTP  | Peradresavimas → HTTPS    |
| 443       | nginx HTTPS | Per Cloudflare Proxy      |
| 20128     | OmniRoute   | Tik localhost (per nginx) |

## Optimizavimas mažai atminties turintiems / nedideliems VPS

Diegiant nedideliuose VPS egzemplioriuose (su 1 GB RAM ar mažiau):

- **Išjunkite fonines paslaugas** — nustatykite `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1`, kad nebūtų paleidžiamas planuoklis, MCP serveris ir periodinės priežiūros užduotys. Žr. `docs/reference/ENVIRONMENT.md`.
- **Naudokite SQLite WAL režimą** — jis įjungtas pagal numatytuosius nustatymus ir sumažina didžiausią atminties naudojimą vienalaikio skaitymo metu.
- **Apribokite V8 kaupą** — nustatykite `OMNIROUTE_MEMORY_MB` (pvz., `512`), kad vykdymo aplinka nenustatytų didesnės ribos, nei gali palaikyti VM. Žr. `docs/reference/ENVIRONMENT.md`.
- **Didelių užklausų priėmimas automatiškai pritaikomas pagal kaupo ribą** -- nustačius pirmiau nurodytą `OMNIROUTE_MEMORY_MB`, įvesties baitų biudžetas (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) apskaičiuojamas pagal tą pačią ribą, todėl ribotą atmintį turinti VM automatiškai gauna mažesnį vienalaikių užklausų biudžetą be papildomo derinimo; perteklinėms užklausoms pateikiamas pakartotinai bandytinas `503` atsakymas su `Retry-After`, užuot leidus joms konkuruoti dėl atminties. Senąjį užklausų skaičiaus apribojimą `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` nustatykite tik tada, jei papildomai reikia griežtos viršutinės ribos.
- **Venkite vykdyti `next build` VPS serveryje** — sukompiliuokite lokaliai ir įdiekite autonominę išvestį (`.next/standalone/`).
- **Stebėkite naudodami `top` / `free -m`** — 1 GB VM ramybės būsenoje OmniRoute paprastai naudoja 200-400 MB RSS.
