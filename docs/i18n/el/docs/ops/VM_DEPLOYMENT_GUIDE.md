# VM_DEPLOYMENT_GUIDE (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute — Οδηγός Ανάπτυξης σε VM με Cloudflare"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — Οδηγός Ανάπτυξης σε VM με Cloudflare

🌐 **Languages:** 🇺🇸 [English](../../../../ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/VM_DEPLOYMENT_GUIDE.md)

Πλήρης οδηγός για την εγκατάσταση και ρύθμιση του OmniRoute σε VM (VPS) με τομέα διαχειριζόμενο μέσω Cloudflare.

---

## Προαπαιτούμενα

| Στοιχείο   | Ελάχιστο                     | Συνιστώμενο      |
| ---------- | ---------------------------- | ---------------- |
| **CPU**    | 1 vCPU                       | 2 vCPU           |
| **RAM**    | 1 GB                         | 2 GB             |
| **Δίσκος** | 10 GB SSD                    | 25 GB SSD        |
| **ΛΣ**     | Ubuntu 22.04 LTS             | Ubuntu 24.04 LTS |
| **Τομέας** | Εγγεγραμμένος στο Cloudflare | —                |
| **Docker** | Docker Engine 24+            | Docker 27+       |

**Δοκιμασμένοι πάροχοι**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Διαμόρφωση του VM

### 1.1 Δημιουργία του instance

Στον πάροχο VPS της προτίμησής σας:

- Επιλέξτε Ubuntu 24.04 LTS
- Επιλέξτε το ελάχιστο πλάνο (1 vCPU / 1 GB RAM)
- Ορίστε ισχυρό κωδικό root ή διαμορφώστε κλειδί SSH
- Σημειώστε τη **δημόσια IP** (π.χ., `203.0.113.10`)

### 1.2 Σύνδεση μέσω SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Ενημέρωση του συστήματος

```bash
apt update && apt upgrade -y
```

### 1.4 Εγκατάσταση Docker

```bash
# Εγκατάσταση εξαρτήσεων
apt install -y ca-certificates curl gnupg

# Προσθήκη επίσημου αποθετηρίου Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Εγκατάσταση nginx

```bash
apt install -y nginx
```

### 1.6 Διαμόρφωση Τείχους Προστασίας (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (ανακατεύθυνση)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Συμβουλή**: Για μέγιστη ασφάλεια, περιορίστε τις θύρες 80 και 443 μόνο σε IPs του Cloudflare. Δείτε την ενότητα [Προηγμένη Ασφάλεια](#advanced-security).

---

## 2. Εγκατάσταση OmniRoute

### 2.1 Δημιουργία καταλόγου διαμόρφωσης

```bash
mkdir -p /opt/omniroute
```

### 2.2 Δημιουργία αρχείου μεταβλητών περιβάλλοντος

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Ασφάλεια ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # ΑΠΑΙΤΕΙΤΑΙ σε παραγωγή: χρησιμοποιείται από το Codex Responses WS bridge

# === Εφαρμογή ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URLs (αλλάξτε στον τομέα σας) ===
# Εσωτερικό URL server-to-server για προγραμματισμένες εργασίες / self-fetches.
BASE_URL=http://127.0.0.1:20128
# URL για το πρόγραμμα περιήγησης, που χρησιμοποιείται για OAuth callbacks, συνδέσμους dashboard και δημόσια URLs.
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# Προαιρετική ρητή παράκαμψη δημόσιας προέλευσης για δημόσια URLs περιουσιακών στοιχείων.
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Συγχρονισμός Cloud (προαιρετικό) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **ΣΗΜΑΝΤΙΚΟ**: Δημιουργήστε μοναδικά μυστικά κλειδιά! Χρησιμοποιήστε `openssl rand -hex 32` για κάθε κλειδί.

### 2.3 Εκκίνηση του container

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

### 2.4 Επαλήθευση ότι εκτελείται

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

Θα πρέπει να εμφανίζει: `[DB] SQLite database ready` και `listening on port 20128`.

---

## 3. Ρύθμιση nginx (Αντίστροφος Διακομιστής Μεσολάβησης)

### 3.1 Δημιουργία πιστοποιητικού SSL (Cloudflare Origin)

Στον πίνακα ελέγχου του Cloudflare:

1. Μεταβείτε στο **SSL/TLS → Origin Server**
2. Κάντε κλικ στο **Create Certificate**
3. Διατηρήστε τις προεπιλογές (15 χρόνια, \*.yourdomain.com)
4. Αντιγράψτε το **Origin Certificate** και το **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Επικολλήστε το πιστοποιητικό
nano /etc/nginx/ssl/origin.crt

# Επικολλήστε το ιδιωτικό κλειδί
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Ρύθμιση Nginx

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# Προεπιλεγμένος διακομιστής — αποκλείει την απευθείας πρόσβαση μέσω IP
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
    server_name llms.yourdomain.com;  # Αλλάξτε στο δικό σας domain

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

        # Υποστήριξη WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Server-Sent Events) — ροή απαντήσεων AI
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# Ανακατεύθυνση HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

Διατηρήστε τα χρονικά όρια ροής του αντίστροφου διακομιστή μεσολάβησης συγχρονισμένα με τις μεταβλητές περιβάλλοντος χρονικών ορίων του OmniRoute. Εάν αυξήσετε τα
`FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`, αυξήστε αντίστοιχα τα `proxy_read_timeout` / `proxy_send_timeout`
πάνω από το ίδιο όριο.

Το OmniRoute χρησιμοποιεί το `NEXT_PUBLIC_BASE_URL` ως την κανονική προέλευση που βλέπει ο περιηγητής για τις
επανακλήσεις OAuth και τους δημιουργημένους δημόσιους συνδέσμους. Τα εγκεκριμένα αιτήματα εγγραφής στον πίνακα ελέγχου χρησιμοποιούν αιτήματα ίδιας προέλευσης
μαζί με προστασία CSRF βάσει συνεδρίας, επομένως δεν απαιτούν στατικό δημόσιο URL βάσης. Οι
κεφαλίδες `X-Forwarded-*` παραπάνω εξακολουθούν να αποτελούν χρήσιμα μεταδεδομένα δρομολόγησης, αλλά δεν αντικαθιστούν
τη ρητή ορισμένη δημόσια URL όταν το OAuth ή οι δημιουργημένοι συνδέσμοι περιηγητή τη χρειάζονται. Ενεργοποιήστε το
`OMNIROUTE_TRUST_PROXY` μόνο εάν το OmniRoute δεν είναι άμεσα προσβάσιμο από τους χρήστες και ο διακομιστής μεσολάβησής σας
αφαιρεί/αναδημιουργεί τις εισερχόμενες κεφαλίδες προώθησης.

### 3.3 Ενεργοποίηση και Δοκιμή

```bash
# Αφαίρεση προεπιλεγμένης ρύθμισης
rm -f /etc/nginx/sites-enabled/default

# Ενεργοποίηση OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Δοκιμή και επαναφόρτωση
nginx -t && systemctl reload nginx
```

---

## 4. Ρύθμιση DNS Cloudflare

### 4.1 Προσθήκη εγγραφής DNS

Στον πίνακα ελέγχου Cloudflare → DNS:

| Τύπος | Όνομα  | Περιεχόμενο            | Proxy      |
| ----- | ------ | ---------------------- | ---------- |
| A     | `llms` | `203.0.113.10` (VM IP) | ✅ Proxied |

### 4.2 Ρύθμιση SSL

Στην ενότητα **SSL/TLS → Overview**:

- Λειτουργία: **Full (Strict)**

Στην ενότητα **SSL/TLS → Edge Certificates**:

- Always Use HTTPS: ✅ Ενεργό
- Ελάχιστη Έκδοση TLS: TLS 1.2
- Automatic HTTPS Rewrites: ✅ Ενεργό

### 4.3 Δοκιμή

```bash
curl -sI https://llms.seudominio.com/health
# Θα πρέπει να επιστρέψει HTTP/2 200
```

---

## 5. Λειτουργία και Συντήρηση

### Αναβάθμιση σε νέα έκδοση

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Προβολή αρχείων καταγραφής

```bash
docker logs -f omniroute          # Ζωντανή ροή σε πραγματικό χρόνο
docker logs omniroute --tail 50   # Τελευταίες 50 γραμμές
```

### Χειροκίνητο αντίγραφο ασφαλείας βάσης δεδομένων

```bash
# Αντιγραφή δεδομένων από τον τόμο στον κεντρικό υπολογιστή
docker cp omniroute:/app/data ./backup-$(date +%F)

# Ή συμπίεση ολόκληρου του τόμου
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Επαναφορά από αντίγραφο ασφαλείας

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Προηγμένη Ασφάλεια

### Περιορισμός nginx στις διευθύνσεις IP της Cloudflare

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Εύρη IPv4 Cloudflare — ενημερώνετε περιοδικά
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

Προσθέστε τα παρακάτω στο `nginx.conf` εντός του μπλοκ `http {}`:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Εγκατάσταση fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Έλεγχος κατάστασης
fail2ban-client status sshd
```

### Αποκλεισμός άμεσης πρόσβασης στη θύρα Docker

```bash
# Αποτροπή άμεσης εξωτερικής πρόσβασης στη θύρα 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Διατήρηση των κανόνων
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Ανάπτυξη σε Cloudflare Workers (Προαιρετικό)

Για απομακρυσμένη πρόσβαση μέσω Cloudflare Workers (χωρίς άμεση έκθεση της VM):

```bash
# Στο τοπικό αποθετήριο
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Δείτε επίσης το [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) για τον οδηγό Cloudflare Tunnel που περιλαμβάνεται στο αποθετήριο. Το αυτόνομο worker `omnirouteCloud/` βρίσκεται σε ξεχωριστό συνοδευτικό αποθετήριο.

---

## Σύνοψη Θυρών

| Θύρα  | Υπηρεσία    | Πρόσβαση                    |
| ----- | ----------- | --------------------------- |
| 22    | SSH         | Δημόσια (με fail2ban)       |
| 80    | nginx HTTP  | Ανακατεύθυνση → HTTPS       |
| 443   | nginx HTTPS | Μέσω Cloudflare Proxy       |
| 20128 | OmniRoute   | Μόνο localhost (μέσω nginx) |

## Βελτιστοποίηση για Περιορισμένη Μνήμη / Μικρά VPS

Για αναπτύξεις σε μικρές παρουσίες VPS (1 GB RAM ή λιγότερο):

- **Απενεργοποίηση υπηρεσιών παρασκηνίου** — ορίστε `OMNIROUTE_DISABLE_BACKGROUND_SERVICES=1` για παράλειψη του χρονοπρογραμματιστή, του διακομιστή MCP και των περιοδικών εργασιών συντήρησης. Δείτε `docs/reference/ENVIRONMENT.md`.
- **Χρήση λειτουργίας SQLite WAL** — ενεργοποιημένη από προεπιλογή, μειώνει την κατανάλωση μνήμης κατά τις ταυτόχρονες αναγνώσεις.
- **Περιορισμός του heap V8** — ορίστε `OMNIROUTE_MEMORY_MB` (π.χ. `512`) ώστε το runtime να μην ορίσει ανώτατο όριο μεγαλύτερο από αυτό της εικονικής μηχανής. Δείτε `docs/reference/ENVIRONMENT.md`.
- **Ο έλεγχος εισδοχής βαριών αιτημάτων κλιμακώνεται αυτόματα με το όριο heap** — μόλις οριστεί το `OMNIROUTE_MEMORY_MB` παραπάνω, ο προϋπολογισμός byte εισροής (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) παράγεται αυτόματα από το ίδιο ανώτατο όριο· έτσι, μια εικονική μηχανή με περιορισμένη μνήμη λαμβάνει ήδη μικρότερο προϋπολογισμό ταυτόχρονων αιτημάτων χωρίς πρόσθετη ρύθμιση· τα πλεονάζοντα αιτήματα λαμβάνουν επαναλαμβανόμενο `503` με `Retry-After` αντί να ανταγωνίζονται για μνήμη. Ορίστε το παλαιό όριο αριθμού αιτημάτων `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` μόνο αν χρειάζεστε ένα σκληρό ανώτατο όριο επιπλέον αυτού.
- **Αποφύγετε το `next build` στο VPS** — κάντε build τοπικά και αναπτύξτε την αυτόνομη έξοδο (`.next/standalone/`).
- **Παρακολούθηση με `top` / `free -m`** — το OmniRoute χρησιμοποιεί συνήθως 200–400 MB RSS σε αδράνεια σε εικονική μηχανή 1 GB.
