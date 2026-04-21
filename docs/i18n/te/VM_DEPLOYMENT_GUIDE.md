# OmniRoute — Deployment Guide on VM with Cloudflare

🌐 **Languages:** 🇺🇸 [English](VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](i18n/pt-BR/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](i18n/es/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](i18n/fr/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](i18n/it/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](i18n/ru/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](i18n/zh-CN/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](i18n/de/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](i18n/in/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](i18n/th/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](i18n/uk-UA/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](i18n/ar/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](i18n/ja/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](i18n/vi/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](i18n/bg/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](i18n/da/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](i18n/fi/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](i18n/he/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](i18n/hu/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](i18n/id/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](i18n/ko/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](i18n/nl/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](i18n/no/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](i18n/pt/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](i18n/ro/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](i18n/pl/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](i18n/sk/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](i18n/sv/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](i18n/phi/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](i18n/cs/VM_DEPLOYMENT_GUIDE.md)

Complete guide to install and configure OmniRoute on a VM (VPS) with domain managed via Cloudflare.

---

## Prerequisites

| Item       | Minimum                  | Recommended      |
| ---------- | ------------------------ | ---------------- |
| **CPU**    | 1 vCPU                   | 2 vCPU           |
| **RAM**    | 1 GB                     | 2 GB             |
| **Disk**   | 10 GB SSD                | 25 GB SSD        |
| **OS**     | Ubuntu 22.04 LTS         | Ubuntu 24.04 LTS |
| **Domain** | Registered on Cloudflare | —                |
| **Docker** | Docker Engine 24+        | Docker 27+       |

**Tested providers**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Configure the VM

### 1.1 Create the instance

On your preferred VPS provider:

- Choose Ubuntu 24.04 LTS
- Select the minimum plan (1 vCPU / 1 GB RAM)
- Set a strong root password or configure SSH key
- Note the **public IP** (e.g., `203.0.113.10`)

### 1.2 Connect via SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Update the system

```bash
apt update && apt upgrade -y
```

### 1.4 Install Docker

```bash
# Install dependencies
apt install -y ca-certificates curl gnupg

# Add official Docker repository
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo “$VERSION_CODENAME”) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Install nginx

```bash
apt install -y nginx
```

### 1.6 Configure Firewall (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Tip**: For maximum security, restrict ports 80 and 443 to Cloudflare IPs only. See the [Advanced Security](#advanced-security) section.

---

## 2. Install OmniRoute

### 2.1 Create configuration directory

```bash
mkdir -p /opt/omniroute
```

### 2.2 Create environment variables file

```bash
cat > /opt/omniroute/.env << ‘EOF’
# === Security ===
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
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=false
REQUIRE_API_KEY=false

# === Domain (change to your domain) ===
BASE_URL=https://llms.seudominio.com
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Cloud Sync (optional) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **IMPORTANT**: Generate unique secret keys! Use `openssl rand -hex 32` for each key.

### 2.3 Start the container

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

### 2.4 Verify that it is running

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

It should display: `[DB] SQLite database ready` and `listening on port 20128`.

---

## 3. Configure nginx (Reverse Proxy)

### 3.1 Generate SSL certificate (Cloudflare Origin)

In the Cloudflare dashboard:

1. Go to **SSL/TLS → Origin Server**
2. Click **Create Certificate**
3. Keep the defaults (15 years, \*.yourdomain.com)
4. Copy the **Origin Certificate** and the **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Paste the certificate
nano /etc/nginx/ssl/origin.crt

# Paste the private key
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx Configuration

```bash
cat > /etc/nginx/sites-available/omniroute << ‘NGINX’
# Default server — blocks direct access via IP
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
    server_name llms.yourdomain.com;  # Change to your domain

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
        proxy_set_header Connection “upgrade”;

        # SSE (Server-Sent Events) — streaming AI responses
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Keep reverse-proxy stream timeouts aligned with your OmniRoute timeout env vars. If you raise
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, raise `proxy_read_timeout` / `proxy_send_timeout`
above the same threshold.

### 3.3 Enable and Test

```bash
# Remove default configuration
rm -f /etc/nginx/sites-enabled/default

# Enable OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Test and reload
nginx -t && systemctl reload nginx
```

---

## 4. Configure Cloudflare DNS

### 4.1 Add DNS record

In the Cloudflare dashboard → DNS:

| Type | Name   | Content                | Proxy      |
| ---- | ------ | ---------------------- | ---------- |
| A    | `llms` | `203.0.113.10` (VM IP) | ✅ Proxied |

### 4.2 Configure SSL

Under **SSL/TLS → Overview**:

- Mode: **Full (Strict)**

Under **SSL/TLS → Edge Certificates**:

- Always Use HTTPS: ✅ On
- Minimum TLS Version: TLS 1.2
- Automatic HTTPS Rewrites: ✅ On

### 4.3 Testing

```bash
curl -sI https://llms.seudominio.com/health
# Should return HTTP/2 200
```

---

## 5. Operations and Maintenance

### Upgrade to a new version

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### View logs

```bash
docker logs -f omniroute          # Real-time stream
docker logs omniroute --tail 50   # Last 50 lines
```

### Manual database backup

```bash
# Copy data from the volume to the host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Or compress the entire volume
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Restore from backup

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
docker start omniroute
```

---

## 6. Advanced Security

### Restrict nginx to Cloudflare IPs

```bash
cat > /etc/nginx/cloudflare-ips.conf << ‘CF’
# Cloudflare IPv4 ranges — update periodically
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

Add the following to `nginx.conf` inside the `http {}` block:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Install fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status sshd
```

### Block direct access to the Docker port

```bash
# Prevent direct external access to port 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persist the rules
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Deploy to Cloudflare Workers (Optional)

For remote access via Cloudflare Workers (without exposing the VM directly):

```bash
# In the local repository
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

See the full documentation at [omnirouteCloud/README.md](../omnirouteCloud/README.md).

---

## Port Summary

| Port  | Service     | Access                     |
| ----- | ----------- | -------------------------- |
| 22    | SSH         | Public (with fail2ban)     |
| 80    | nginx HTTP  | Redirect → HTTPS           |
| 443   | nginx HTTPS | Via Cloudflare Proxy       |
| 20128 | OmniRoute   | Localhost only (via nginx) |
