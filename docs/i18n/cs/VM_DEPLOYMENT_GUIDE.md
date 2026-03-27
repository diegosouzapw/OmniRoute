# Průvodce nasazením OmniRoute na VM s Cloudflare

🌐 **Jazyky:** 🇺🇸 [English](VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](i18n/pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](i18n/es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](i18n/fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](i18n/it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](i18n/ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](i18n/zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](i18n/de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](i18n/in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](i18n/th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](i18n/uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](i18n/ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](i18n/ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](i18n/vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](i18n/bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](i18n/da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](i18n/fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](i18n/he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](i18n/hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](i18n/id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](i18n/ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](i18n/nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](i18n/no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](i18n/pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](i18n/ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](i18n/pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](i18n/sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](i18n/sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](i18n/phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](i18n/cs/VM_DEPLOYMENT_GUIDE.md)

Kompletní průvodce instalací a konfigurací OmniRoute na virtuálním stroji (VPS) se správou domény prostřednictvím Cloudflare.

---

## Předpoklady

| Položka      | Minimální                   | Doporučeno       |
| ------------ | --------------------------- | ---------------- |
| **Procesor** | 1 virtuální procesor        | 2 vCPU           |
| **RAM**      | 1 GB                        | 2 GB             |
| **Disk**     | 10GB SSD                    | 25GB SSD         |
| **CPU**      | Ubuntu 22.04 LTS            | Ubuntu 24.04 LTS |
| **Doména**   | Zaregistrována v Cloudflare | —                |
| **Docker**   | Docker Engine 24+           | Docker 27+       |

**Testovaní poskytovatelé**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Konfigurace virtuálního počítače

### 1.1 Vytvořit ihned

Žádný preferovaný poskytovatel VPS:

- Vyberte si Ubuntu 24.04 LTS
- Vyberte minimální plán (1 vCPU / 1 GB RAM)
- Nastavte silné heslo pro root nebo konfiguraci SSH klíče
- Poznamenejte si **veřejnou IP** (např.: `203.0.113.10`)

### 1.2 Připojení přes SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Aktualizace systému

```bash
apt update && apt upgrade -y
```

### 1.4 Instalace Dockeru

```bash
# Nainstalovat závislosti
apt install -y ca-certificates curl gnupg

# Přidat oficiální Docker repository
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Instalace nginxu

```bash
apt install -y nginx
```

### 1.6 Konfigurace firewallu (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Tip**: Pro maximální zabezpečení omezte porty 80 a 443 pouze na IP Cloudflare. Viz sekce [Pokročilé zabezpečení](#pokrocilé-zabezpečení).

---

## 2. Instalace OmniRoute

### 2.1 Vytvořit konfigurační adresář

```bash
mkdir -p /opt/omniroute
```

### 2.2 Vytvořit soubor s proměnnými prostředí

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Bezpečnost ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT

# === App ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
STORAGE_DRIVER=sqlite
ENABLE_REQUEST_LOGS=true
AUTH_COOKIE_SECURE=false
REQUIRE_API_KEY=false

# === Doména (změňte na vaši doménu) ===
BASE_URL=https://llms.vasedomena.com
NEXT_PUBLIC_BASE_URL=https://llms.vasedomena.com

# === Cloud Sync (opcional) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **DŮLEŽITÉ**: Vygenerujte jedinečné tajné klíče! Použijte `openssl rand -hex 32` pro každý klíč.

### 2.3 Spuštění kontejneru

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

### 2.4 Verificar se está rodando

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Vývojový příklad: `[DB] SQLite database ready` a `listening on port 20128` .

---

## 3. Konfigurace nginx (reverzní proxy)

### 3.1 Vygenerovat SSL certifikát (Cloudflare Origin)

Cloudflare nic neřeší:

1. Používá **SSL/TLS → Origin Server**
2. Klikněte na **Vytvořit certifikát**
3. Ponechte výchozí nastavení (15 let, \*.vasedomena.com)
4. Zkopírujte nebo zkopírujte **certifikát původu** a **soukromý klíč**

```bash
mkdir -p /etc/nginx/ssl

# Vložit certifikát
nano /etc/nginx/ssl/origin.crt

# Colar a chave privada
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Konfigurace nginxu

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Default server — bloqueia acesso direto por IP
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
    server_name llms.vasedomena.com;  # Změňte na vaši doménu

    ssl_certificate     /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:20128;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Server-Sent Events) — streaming AI responses
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}

# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name llms.vasedomena.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

### 3.3 Ativar a testování

```bash
# Remover config padrão
rm -f /etc/nginx/sites-enabled/default

# Ativar OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Testar e recarregar
nginx -t && systemctl reload nginx
```

---

## 4. Konfigurace DNS v Cloudflare

### 4.1 Další DNS registr

V dashboardu Cloudflare → DNS:

| Typ | Jméno  | Obsah                                           | Proxy    |
| --- | ------ | ----------------------------------------------- | -------- |
| A   | `llms` | `203.0.113.10` (IP adresa virtuálního počítače) | ✅ Proxy |

### 4.2 Konfigurace SSL

Em **SSL/TLS → Přehled** :

- Režim: **Plný (Přísný)**

V **SSL/TLS → Edge Certificates**:

- Vždy používat HTTPS: ✅ Zapnuto
- Minimální verze TLS: TLS 1.2
- Automatické přepisování HTTPS: ✅ Zapnuto

### 4.3 Testar

```bash
curl -sI https://llms.vasedomena.com/health
# Deve retornar HTTP/2 200
```

---

## 5. Operace a údržba

### Aktualizovat na novou verzi

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Verzovní protokoly

```bash
docker logs -f omniroute          # Živý stream
docker logs omniroute --tail 50   # Últimas 50 linhas
```

### Ruční zálohování banky

```bash
# Kopírovat data z volume do hostitele
docker cp omniroute:/app/data ./backup-$(date +%F)

# Ou comprimir todo o volume
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Obnovení zálohy

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Pokročilá bezpečnost

### Omezte přístup k IP Cloudflare

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 ranges — aktualizovat pravidelně
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

Přidat do `nginx.conf` do bloku `http {}`:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Nainstalujte fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Verificar status
fail2ban-client status sshd
```

### Bloquear accesso direto na port do Docker

```bash
# Zamezit přímému externímu přístupu k portu 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persistir as regras
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Nasazení cloudového pracovníka (volitelné)

Vzdálený přístup přes Cloudflare Workers (zde exponovat diretament VM):

```bash
# No repositório local
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Dokumenty jsou kompletní pro [omnirouteCloud/README.md](../omnirouteCloud/README.md) .

---

## Přehled portů

| Port  | Služba      | Přístup                                  |
| ----- | ----------- | ---------------------------------------- |
| 22    | SSH         | Veřejné (s fail2ban)                     |
| 80    | nginx HTTP  | Přesměrování → HTTPS                     |
| 443   | nginx HTTPS | Prostřednictvím proxy serveru Cloudflare |
| 20128 | OmniRoute   | Někdy na localhostu (přes nginx)         |
