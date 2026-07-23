---
title: "OmniRoute — VM 部署指南（搭配 Cloudflare）"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — VM 部署指南（搭配 Cloudflare）

🌐 **語言:** 🇺🇸 [English](./VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../i18n/es/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../i18n/fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../i18n/it/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../i18n/ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../i18n/de/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../i18n/th/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../i18n/ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../i18n/ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../i18n/bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../i18n/da/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../i18n/fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../i18n/he/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../i18n/hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../i18n/ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../i18n/no/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../i18n/ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../i18n/pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../i18n/sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../i18n/phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../i18n/cs/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇹🇼 [繁體中文](./VM_DEPLOYMENT_GUIDE.md)

在 VM（VPS）上安裝並設定 OmniRoute 的完整指南，搭配經由 Cloudflare 管理的網域。

---

## 前置需求

| 項目        | 最低規格                   | 建議規格           |
| ----------- | -------------------------- | ------------------ |
| **CPU**     | 1 vCPU                     | 2 vCPU             |
| **RAM**     | 1 GB                       | 2 GB               |
| **硬碟**    | 10 GB SSD                  | 25 GB SSD          |
| **作業系統**| Ubuntu 22.04 LTS           | Ubuntu 24.04 LTS   |
| **網域**    | 在 Cloudflare 註冊         | —                  |
| **Docker**  | Docker Engine 24+          | Docker 27+         |

**經測試的提供商**: Akamai (Linode)、DigitalOcean、Vultr、Hetzner、AWS Lightsail。

---

## 1. 設定 VM

### 1.1 建立執行個體

在你偏好的 VPS 提供商：

- 選擇 Ubuntu 24.04 LTS
- 選擇最低方案（1 vCPU / 1 GB RAM）
- 設定強效 root 密碼或配置 SSH 金鑰
- 記下**公開 IP**（例如 `203.0.113.10`）

### 1.2 透過 SSH 連線

```bash
ssh root@203.0.113.10
```

### 1.3 更新系統

```bash
apt update && apt upgrade -y
```

### 1.4 安裝 Docker

```bash
# 安裝相依套件
apt install -y ca-certificates curl gnupg

# 加入官方 Docker 儲存庫
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $ (. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 安裝 nginx

```bash
apt install -y nginx
```

### 1.6 設定防火牆 (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP（重新導向）
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **提示**: 為達最高安全性，可將連接埠 80 和 443 限制為僅允許 Cloudflare IP。請參閱[進階安全](#advanced-security)一節。

---

## 2. 安裝 OmniRoute

### 2.1 建立設定目錄

```bash
mkdir -p /opt/omniroute
```

### 2.2 建立環境變數檔

```bash
cat > /opt/omniroute/.env << 'EOF'
# === 安全性 ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # 生產環境必填：Codex Responses WS bridge 使用

# === 應用程式 ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URLs（請改為你的網域）===
# 內部伺服器對伺服器的基礎 URL，用於排程任務／自我擷取
BASE_URL=http://127.0.0.1:20128
# 瀏覽器端使用的 URL，用於 OAuth 回呼、儀表板連結和產生的公開 URL
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# 選擇性：產生的公開資源 URL 的明確公開來源覆寫
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Cloud 同步（選擇性）===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **重要**: 請產生唯一的密鑰！使用 `openssl rand -hex 32` 為每個密鑰產生隨機值。

### 2.3 啟動容器

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

### 2.4 確認運作中

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

應顯示：`[DB] SQLite database ready` 和 `listening on port 20128`。

---

## 3. 設定 nginx（反向代理）

### 3.1 產生 SSL 憑證（Cloudflare Origin）

在 Cloudflare 儀表板中：

1. 前往 **SSL/TLS → Origin Server**
2. 點擊 **Create Certificate**
3. 保持預設值（15 年、\\*.yourdomain.com）
4. 複製 **Origin Certificate** 和 **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# 貼上憑證
nano /etc/nginx/ssl/origin.crt

# 貼上私鑰
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Nginx 設定

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# 預設伺服器 — 封鎖直接透過 IP 存取
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
    server_name llms.yourdomain.com;  # 改為你的網域

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

        # WebSocket 支援
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE（Server-Sent Events）— 串流 AI 回應
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS 重新導向
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

請確保反向代理串流超時時間與你的 OmniRoute 超時環境變數保持一致。如果你調高了
`FETCH_TIMEOUT_MS`／`STREAM_IDLE_TIMEOUT_MS`，請同步調高 `proxy_read_timeout`／`proxy_send_timeout`
至相同閾值以上。

OmniRoute 使用 `NEXT_PUBLIC_BASE_URL` 作為 OAuth 回呼和產生公開連結的標準瀏覽器端來源。
已驗證的儀表板寫入操作使用同源請求加上綁定 session 的 CSRF 保護，因此不需要靜態公開基礎 URL。
上述的 `X-Forwarded-*` 標頭依然是實用的路由後設資料，但在 OAuth 或產生的瀏覽器連結需要公開 URL
時，它們不能取代明確設定公開 URL。僅在 OmniRoute 無法被用戶端直接存取且你的代理伺服器
會移除／重建傳入的轉發標頭時，才啟用 `OMNIROUTE_TRUST_PROXY`。

### 3.3 啟用並測試

```bash
# 移除預設設定
rm -f /etc/nginx/sites-enabled/default

# 啟用 OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# 測試並重新載入
nginx -t && systemctl reload nginx
```

---

## 4. 設定 Cloudflare DNS

### 4.1 新增 DNS 記錄

在 Cloudflare 儀表板 → DNS：

| 類型 | 名稱   | 內容                     | Proxy       |
| ---- | ------ | ----------------------- | ----------- |
| A    | `llms` | `203.0.113.10`（VM IP） | ✅ 已代理   |

### 4.2 設定 SSL

在 **SSL/TLS → Overview**：

- 模式：**Full (Strict)**

在 **SSL/TLS → Edge Certificates**：

- Always Use HTTPS：✅ 開啟
- Minimum TLS Version：TLS 1.2
- Automatic HTTPS Rewrites：✅ 開啟

### 4.3 測試

```bash
curl -sI https://llms.seudominio.com/health
# 應回傳 HTTP/2 200
```

---

## 5. 操作與維護

### 升級至新版本

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### 檢視日誌

```bash
docker logs -f omniroute          # 即時串流
docker logs omniroute --tail 50   # 最後 50 行
```

### 手動資料庫備份

```bash
# 從容器複製資料到主機
docker cp omniroute:/app/data ./backup-$(date +%F)

# 或壓縮整個磁碟區
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### 從備份還原

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. 進階安全

### 限制 nginx 僅允許 Cloudflare IP

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 範圍 — 請定期更新
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

將以下內容加入 `nginx.conf` 中的 `http {}` 區塊：

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### 安裝 fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 檢查狀態
fail2ban-client status sshd
```

### 封鎖對 Docker 連接埠的直接存取

```bash
# 防止外部直接存取連接埠 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# 持續保存規則
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. 部署至 Cloudflare Workers（選擇性）

用於透過 Cloudflare Workers 進行遠端存取（無需直接暴露 VM）：

```bash
# 在本機儲存庫中
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

另請參閱 [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) 以了解儲存庫內的 Cloudflare Tunnel 逐步說明。獨立的 `omnirouteCloud/` worker 位於另一個配套儲存庫中。

---

## 連接埠摘要

| 連接埠  | 服務          | 存取方式                        |
| ------ | ------------- | ------------------------------ |
| 22     | SSH           | 公開（搭配 fail2ban）           |
| 80     | nginx HTTP    | 重新導向 → HTTPS               |
| 443    | nginx HTTPS   | 經由 Cloudflare Proxy          |
| 20128  | OmniRoute     | 僅限本機（經由 nginx）          |
