# OmniRoute — Deployment Guide on VM with Cloudflare (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/VM_DEPLOYMENT_GUIDE.md)

---

Пълно ръководство за инсталиране и конфигуриране на OmniRoute на VM (VPS) с домейн, управлявано чрез Cloudflare.---## Prerequisites

| Артикул    | Минимум                  | Препоръчва се    |
| ---------- | ------------------------ | ---------------- |
| **CPU**    | 1 vCPU                   | 2 vCPU           |
| **RAM**    | 1 GB                     | 2 GB             |
| **Диск**   | 10 GB SSD                | 25 GB SSD        |
| **OS**     | Ubuntu 22.04 LTS         | Ubuntu 24.04 LTS |
| **Домейн** | Регистриран в Cloudflare | —                |
| **Докер**  | Docker Engine 24+        | Докер 27+        |

**Тествани доставчици**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.---## 1. Configure the VM

### 1.1 Create the instance

По предпочитания от вас VPS доставчик:

- Изберете Ubuntu 24.04 LTS
- Изберете минималния план (1 vCPU / 1 GB RAM)
- Задайте силна root парола или конфигурирайте SSH ключ
- Обърнете внимание на**публичния IP**(напр. `203.0.113.10`)### 1.2 Свързване чрез SSH```bash
  ssh root@203.0.113.10

````

### 1.3 Update the system

```bash
apt update && apt upgrade -y
````

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

> **Съвет**: За максимална сигурност ограничете портове 80 и 443 само до IP адреса на Cloudflare. Вижте раздела [Разширена сигурност](#advanced-security).---## 2. Install OmniRoute

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

> ⚠️**ВАЖНО**: Генерирайте уникални секретни ключове! Използвайте `openssl rand -hex 32` за всеки ключ.### 2.3 Стартирайте контейнера```bash
> docker pull diegosouzapw/omniroute:latest

docker run -d \
 --name omniroute \
 --restart unless-stopped \
 --env-file /opt/omniroute/.env \
 -p 20128:20128 \
 -v omniroute-data:/app/data \
 diegosouzapw/omniroute:latest

````

### 2.4 Verify that it is running

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
````

Трябва да се покаже: „[DB] SQLite база данни е готова“ и „слушане на порт 20128“.---## 3. Configure nginx (Reverse Proxy)

### 3.1 Generate SSL certificate (Cloudflare Origin)

В таблото за управление на Cloudflare:

1. Отидете на**SSL/TLS → Origin Server**
2. Щракнете върху**Създаване на сертификат**
3. Запазете настройките по подразбиране (15 години, \*.yourdomain.com)
4. Копирайте**Сертификата за произход**и**Личния ключ**```bash
   mkdir -p /etc/nginx/ssl

# Поставете сертификата

nano /etc/nginx/ssl/origin.crt

# Поставете личния ключ

nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key```

### 3.2 Nginx Configuration

````bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Сървър по подразбиране — блокира директен достъп през IP
сървър {
    слушане 80 default_server;
    слушам [::]:80 default_server;
    слушане 443 ssl default_server;
    слушам [::]:443 ssl default_server;
    ssl_сертификат /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    име_на_сървър_;
    връщане 444;
}

# OmniRoute — HTTPS
сървър {
    слушане 443 ssl;
    слушам [::]:443 ssl;
    сървър_име llms.вашият домейн.com;  # Промяна на вашия домейн

    ssl_сертификат /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 100M;

    местоположение / {
        proxy_pass http://127.0.0.1:20128;
        proxy_set_header Хост $хост;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $схема;

        # Поддръжка на WebSocket
        proxy_http_версия 1.1;
        proxy_set_header Надграждане $http_upgrade;
        proxy_set_header Връзка „надграждане“;

        # SSE (Изпратени от сървъра събития) — поточно предаване на AI отговори
        proxy_buffering изключено;
        proxy_cache изключен;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS пренасочване
сървър {
    слушам 80;
    слушам [::]:80;
    сървър_име llms.вашият домейн.com;
    връщане 301 https://$server_name$request_uri;
}
NGINX```

Поддържайте времето за изчакване на обратен прокси поток в съответствие с вашите OmniRoute timeout env vars. Ако рейзнете
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, повишаване на `proxy_read_timeout` / `proxy_send_timeout`
над същия праг.### 3.3 Enable and Test

```bash
# Премахнете конфигурацията по подразбиране
rm -f /etc/nginx/sites-enabled/default

# Активирайте OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Тествайте и презаредете
nginx -t && systemctl презареди nginx```

---

## 4. Configure Cloudflare DNS

### 4.1 Add DNS record

В таблото за управление на Cloudflare → DNS:

| Тип | Име | Съдържание | Прокси |
| ---- | ------ | ---------------------- | ---------- |
| A | `llms` | `203.0.113.10` (VM IP) | ✅ Проксиран |### 4.2 Configure SSL

Под**SSL/TLS → Общ преглед**:

- Режим:**Пълен (строг)**

Под**SSL/TLS → Edge Certificates**:

- Винаги използвайте HTTPS: ✅ Вкл
- Минимална TLS версия: TLS 1.2
- Автоматично пренаписване на HTTPS: ✅ Включено### 4.3 Testing

```bash
curl -sI https://llms.seudominio.com/health
# Трябва да върне HTTP/2 200```

---

## 5. Operations and Maintenance

### Upgrade to a new version

```bash
докер изтегляне diegosouzapw/omniroute: най-нов
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-файл /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute: най-нов```

### View logs

```bash
docker logs -f omniroute # Поток в реално време
докер регистрира omniroute --tail 50 # Последните 50 реда```

### Manual database backup

```bash
# Копирайте данни от тома към хоста
docker cp omniroute:/app/data ./backup-$(дата +%F)

# Или компресирайте целия обем
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(дата +%F).tar.gz /данни```

### Restore from backup

```bash
докер стоп omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
докер стартира omniroute```

---

## 6. Advanced Security

### Restrict nginx to Cloudflare IPs

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 диапазони — актуализирайте периодично
# https://www.cloudflare.com/ips-v4/
set_real_ip_from 173.245.48.0/20;
set_real_ip_от 103.21.244.0/22;
set_real_ip_от 103.22.200.0/22;
set_real_ip_от 103.31.4.0/22;
set_real_ip_от 141.101.64.0/18;
set_real_ip_от 108.162.192.0/18;
set_real_ip_от 190.93.240.0/20;
set_real_ip_от 188.114.96.0/20;
set_real_ip_от 197.234.240.0/22;
set_real_ip_от 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
real_ip_header CF-Свързване-IP;
CF```

Добавете следното към `nginx.conf` в блока `http {}`:```nginx
include /etc/nginx/cloudflare-ips.conf;
````

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

За отдалечен достъп чрез Cloudflare Workers (без директно излагане на VM):```bash

# В локалното хранилище

cd omnirouteCloud
npm инсталирайте
влизане в npx wrangler
разгръщане на npx wrangler```

Вижте пълната документация на [omnirouteCloud/README.md](../omnirouteCloud/README.md).---

## Port Summary

| Пристанище | Обслужване  | Достъп                         |
| ---------- | ----------- | ------------------------------ |
| 22         | SSH         | Публичен (с fail2ban)          |
| 80         | nginx HTTP  | Пренасочване → HTTPS           |
| 443        | nginx HTTPS | Чрез прокси Cloudflare         |
| 20128      | OmniRoute   | Само локален хост (чрез nginx) |
