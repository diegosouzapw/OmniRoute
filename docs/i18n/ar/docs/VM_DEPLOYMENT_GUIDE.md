# OmniRoute — Deployment Guide on VM with Cloudflare (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/VM_DEPLOYMENT_GUIDE.md)

---

الدليل الكامل لـ OmniRoute وتكوينه على VM (VPS) مع المجال المُدار عبر Cloudflare.---## Prerequisites

| حرق                        | الحد                             | موصى به                          |
| -------------------------- | -------------------------------- | -------------------------------- |
| **وحدة المعالجة المركزية** | 1 وحدة المعالجة المركزية الرقمية | 2 وحدة المعالجة المركزية الرقمية |
| **ذاكرة الوصول العشوائي**  | 1 جيجا                           | 2 جيجا                           |
| **القرص**                  | 10 جيجا اس اس دي                 | 25 جيجا اس دي                    |
| **نظام التشغيل**           | أوبونتو 22.04 LTS                | أوبونتو 24.04 LTS                |
| **المجال**                 | مسجل في Cloudflare               | —                                |
| **عامل ميناء**             | محرك دوكر 24+                    | عامل ميناء 27+                   |

**المزودون الذين تم اختبارهم**: Akamai (Linode)، DigitalOcean، Vultr، Hetzner، AWS Lightsail.---## 1. Configure the VM

### 1.1 Create the instance

على موفر VPS المفضل لديك:

- اختر Ubuntu 24.04 LTS
  -تحديد الحد الأدنى للخطة (1 vCPU / 1 جيجابايت من ذاكرة الوصول العشوائي)
- قم بتواجد كلمة مرور جذر قوية أو قم بتكوين مفتاح SSH
- ملحوظة**عنوان IP العام**(على سبيل المثال، `203.0.113.10`)### 1.2 الاتصال عبر SSH```bash
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

> **نصيحة**: للحصول على الحد الأقصى من الأمان، يجب بتقييد المنفذين 80 و443 بناوين Cloudflare IP فقط. راجع قسم [الأمان المتقدم](#الأمن المتقدم).---## 2. Install OmniRoute

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

> ⚠️**هام**: أنشئ مفاتيح سرية فريدة! استخدم "openssl rand -hex 32" لكل مفتاح.### 2.3 ابدأ الحاوية```bash
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

يجب أن يتم تعرض: "قاعدة بيانات SQLite [DB] جاهزة" و"الاشتراك في منفذ 20128".---## 3. Configure nginx (Reverse Proxy)

### 3.1 Generate SSL certificate (Cloudflare Origin)

في لوحة معلومات Cloudflare:

1. انتقل إلى**SSL/TLS → الخادم الأصلي**
   2.نقر**إنشاء شهادة**
2. استخدم الإعدادات الافتراضية (15 عامًا، \*.yourdomain.com)
   4.انسخ**شهادة المنشأ**و**المفتاح الخاص**```bash
   mkdir -p /etc/nginx/ssl

# لصق الشهادة

نانو /etc/nginx/ssl/origin.crt

# الصق المفتاح الخاص

نانو /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key```

### 3.2 Nginx Configuration

````bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# الخادم الافتراضي - يمنع الوصول المباشر عبر IP
الخادم {
    الاستماع 80 default_server؛
    الاستماع [::]:80 default_server؛
    الاستماع 443 SSL default_server؛
    استمع [::]:443 ssl default_server؛
    ssl_certificate /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    اسم الخادم _;
    العودة 444؛
}

# OmniRoute - HTTPS
الخادم {
    الاستماع 443 SSL؛
    استمع [::]:443 ssl;
    اسم الخادم llms.yourdomain.com;  # التغيير إلى المجال الخاص بك

    ssl_certificate /etc/nginx/ssl/origin.crt;
    ssl_certificate_key /etc/nginx/ssl/origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    Client_max_body_size 100M؛

    الموقع / {
        proxy_pass http://127.0.0.1:20128;
        proxy_set_header المضيف $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header مخطط X-Forwarded-Proto $;

        # دعم ويبسوكيت
        proxy_http_version 1.1;
        ترقية proxy_set_header $http_upgrade;
        اتصال proxy_set_header "ترقية"؛

        # SSE (الأحداث المرسلة من الخادم) - تدفق استجابات الذكاء الاصطناعي
        proxy_buffering معطل؛
        proxy_cache معطل؛
        proxy_read_timeout 600s؛
        proxy_send_timeout 600s;
    }
}

# HTTP → إعادة توجيه HTTPS
الخادم {
    استمع 80؛
    استمع [::]:80;
    اسم الخادم llms.yourdomain.com;
    إرجاع 301 https://$server_name$request_uri;
}
نجينكس```

حافظ على توافق مهلات دفق الوكيل العكسي مع vars env لمهلة OmniRoute. إذا رفعت
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`، ارفع `proxy_read_timeout` / `proxy_send_timeout`
فوق نفس العتبة.### 3.3 Enable and Test

```bash
# إزالة التكوين الافتراضي
rm -f /etc/nginx/sites-enabled/default

# تمكين OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# اختبار وإعادة تحميل
nginx -t && systemctl إعادة تحميل nginx```

---

## 4. Configure Cloudflare DNS

### 4.1 Add DNS record

في لوحة معلومات Cloudflare → DNS:

| اكتب | الاسم | المحتوى | الوكيل |
| ---- | ------ | ---------------------- | ---------- |
| أ | ``للم`` | `203.0.113.10` (VM IP) | ✅ توكيل |### 4.2 Configure SSL

ضمن**SSL/TLS → نظرة عامة**:

- الوضع:**كامل (صارم)**

ضمن**SSL/TLS → شهادات الحافة**:

- استخدم HTTPS دائمًا: ✅ قيد التشغيل
- الحد الأدنى لإصدار TLS: TLS 1.2
- إعادة كتابة HTTPS تلقائيًا: ✅ تشغيل### 4.3 Testing

```bash
حليقة -sI https://llms.seudominio.com/health
# يجب أن يُرجع HTTP/2 200```

---

## 5. Operations and Maintenance

### Upgrade to a new version

```bash
عامل ميناء سحب diegosouzapw/omniroute:latest
عامل ميناء توقف omniroute && docker rm omniroute
تشغيل عامل الإرساء -d --اسم المسار الشامل --إعادة التشغيل ما لم يتم إيقافه \
  --env-ملف /opt/omniroute/.env \
  -ص20128:20128\
  -v بيانات المسار الشامل:/app/data \
  diegosouzapw/omniroute:latest```

### View logs

```bash
سجلات عامل الإرساء -f omniroute # البث في الوقت الفعلي
سجلات عامل الإرساء في كل الاتجاهات --tail 50 # آخر 50 سطرًا```

### Manual database backup

```bash
# انسخ البيانات من المجلد إلى المضيف
docker cp omniroute:/app/data ./backup-$(date +%F)

# أو ضغط الحجم بأكمله
تشغيل عامل الميناء --rm -v omniroute-data:/data -v $(pwd):/backup \
  جبال الألب القطران czf /backup/omniroute-data-$(date +%F).tar.gz /data```

### Restore from backup

```bash
توقف عامل الإرساء في كل اتجاه
تشغيل عامل الميناء --rm -v omniroute-data:/data -v $(pwd):/backup \
  جبال الألب sh -c “rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /”
عامل الإرساء يبدأ في كل اتجاه```

---

## 6. Advanced Security

### Restrict nginx to Cloudflare IPs

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# نطاقات Cloudflare IPv4 - يتم تحديثها بشكل دوري
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
قوات التحالف```

أضف ما يلي إلى `nginx.conf` داخل الكتلة `http {}`:```nginx
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

للوصول بعد عبر Cloudflare Workers (دون الكشف عن الجهاز الافتراضي مباشرة):```bash

# في المستودع المحلي

cd omnirouteCloud
تثبيت npm
تسجيل دخول رانجلر npx
نشر رانجلر npx```

راجع الوثائق الكاملة على [omnirouteCloud/README.md](../omnirouteCloud/README.md).---

## Port Summary

| ميناء | الخدمة        | الوصول                        |
| ----- | ------------- | ----------------------------- |
| 22    | سش            | عام (مع Fail2ban)             |
| 80    | إنجينكس HTTP  | إعادة التوجيه → HTTPS         |
| 443   | إنجينكس HTTPS | عبر وكيل Cloudflare           |
| 20128 | أومنيروتي     | المضيف المحلي فقط (عبر nginx) |
