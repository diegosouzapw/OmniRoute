---
title: "OmniRoute — 在虚拟机上通过 Cloudflare 部署指南"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — 在虚拟机上通过 Cloudflare 部署指南

🌐 **Languages:** 🇺🇸 [English](../../../ops/VM_DEPLOYMENT_GUIDE.md) | 🇧🇷 [Português (Brasil)](../../pt-BR/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇪🇸 [Español](../../es/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇫🇷 [Français](../../fr/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇹 [Italiano](../../it/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇷🇺 [Русский](../../ru/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇨🇳 [中文 (简体)](../../zh-CN/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇩🇪 [Deutsch](../../de/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇳 [हिन्दी](../../in/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇹🇭 [ไทย](../../th/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇺🇦 [Українська](../../uk-UA/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇸🇦 [العربية](../../ar/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇯🇵 [日本語](../../ja/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇻🇳 [Tiếng Việt](../../vi/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇧🇬 [Български](../../bg/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇩🇰 [Dansk](../../da/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇫🇮 [Suomi](../../fi/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇱 [עברית](../../he/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇭🇺 [Magyar](../../hu/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../../id/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇰🇷 [한국어](../../ko/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../../ms/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇳🇱 [Nederlands](../../nl/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇳🇴 [Norsk](../../no/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇵🇹 [Português (Portugal)](../../pt/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇷🇴 [Română](../../ro/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇵🇱 [Polski](../../pl/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇸🇰 [Slovenčina](../../sk/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇸🇪 [Svenska](../../sv/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇵🇭 [Filipino](../../phi/docs/ops/VM_DEPLOYMENT_GUIDE.md) | 🇨🇿 [Čeština](../../cs/docs/ops/VM_DEPLOYMENT_GUIDE.md)

在虚拟机 (VPS) 上安装并配置 OmniRoute 并通过 Cloudflare 管理域名的完整指南。

---

## 前提条件

| 项目         | 最低配置                  | 推荐配置          |
| ------------ | ------------------------- | ----------------- |
| **CPU**      | 1 vCPU                    | 2 vCPU            |
| **RAM**      | 1 GB                      | 2 GB              |
| **磁盘**     | 10 GB SSD                 | 25 GB SSD         |
| **操作系统** | Ubuntu 22.04 LTS          | Ubuntu 24.04 LTS  |
| **域名**     | 已在 Cloudflare 注册      | —                 |
| **Docker**   | Docker Engine 24+         | Docker 27+        |

**已验证的服务商**：Akamai (Linode)、DigitalOcean、Vultr、Hetzner、AWS Lightsail���

---

## 1. 配置虚拟机

### 1.1 创建实例

在你选择的 VPS 服务商上：

- 选择 Ubuntu 24.04 LTS
- 选择最低配置方案 (1 vCPU / 1 GB RAM)
- 设置强 root 密码或配置 SSH 密钥
- 记下 **公网 IP**（例如 `203.0.113.10`）

### 1.2 通过 SSH 连接

```bash
ssh root@203.0.113.10
```

### 1.3 更新系统

```bash
apt update && apt upgrade -y
```

### 1.4 安装 Docker

```bash
# 安装依赖
apt install -y ca-certificates curl gnupg

# 添加 Docker 官方仓库
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 安装 nginx

```bash
apt install -y nginx
```

### 1.6 配置防火墙 (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP（跳转）
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **提示**：为获得最高安全性，将 80 和 443 端口仅限 Cloudflare IP 访问。参见[高级安全](#6-高级安全)部分。

---

## 2. 安装 OmniRoute

### 2.1 创建配置目录

```bash
mkdir -p /opt/omniroute
```

### 2.2 创建环境变量文件

```bash
cat > /opt/omniroute/.env << 'EOF'
# === 安全 ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET  # 生产环境必需：Codex Responses WS 桥接使用

# === 应用 ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=false

# === URL（替换为你的域名）===
# 计划任务 / 内部自调用所使用的内部服务端到服务端 URL。
BASE_URL=http://127.0.0.1:20128
# OAuth 回调、控制台链接及同源校验所面向浏览器的 URL。
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com
# 可选：显式覆盖生成的公开资源 URL。
# OMNIROUTE_PUBLIC_BASE_URL=https://llms.seudominio.com

# === 云端同步（可选）===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **重要**：请生成唯一的密钥！对每个密钥使用 `openssl rand -hex 32`。

### 2.3 启动容器

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

### 2.4 验证运行状态

```bash
docker ps | grep omniroute
docker logs omniroute --tail 20
```

应显示：`[DB] SQLite database ready` 和 `listening on port 20128`。

---

## 3. 配置 nginx（反向代理）

### 3.1 生成 SSL 证书（Cloudflare 源服务器）

在 Cloudflare 控制台中：

1. 前往 **SSL/TLS → 源服务器**
2. 点击 **创建证书**
3. 保留默认设置（15 年，\*.yourdomain.com）
4. 复制 **源证书** 和 **私钥**

```bash
mkdir -p /etc/nginx/ssl

# 粘贴证书
nano /etc/nginx/ssl/origin.crt

# 粘贴私钥
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 nginx 配置

```bash
cat > /etc/nginx/sites-available/omniroute << 'NGINX'
# 默认 server — 阻止通过 IP 的直接访问
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
    server_name llms.yourdomain.com;  # 替换为你的域名

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

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE (Server-Sent Events) — 流式 AI 响应
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
    }
}

# HTTP → HTTPS 跳转
server {
    listen 80;
    listen [::]:80;
    server_name llms.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

请确保反向代理的流超时与 OmniRoute 超时环境变量保持一致。如果提高了 `FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS`，则将 `proxy_read_timeout` / `proxy_send_timeout` 同步提高到同一阈值以上。

OmniRoute 使用 `NEXT_PUBLIC_BASE_URL` 作为 OAuth、公开链接及控制台变更域名校验的正规浏览器来源。上述 `X-Forwarded-*` 标头仍然是有效的路由元数据，但不能替代设置显式公开 URL。仅在 OmniRoute 客户端无法直接访问且你的代理剥离/重建了传入转发标头时，才启用 `OMNIROUTE_TRUST_PROXY`。

### 3.3 启用并测试

```bash
# 删除默认配置
rm -f /etc/nginx/sites-enabled/default

# 启用 OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# 测试并重载
nginx -t && systemctl reload nginx
```

---

## 4. 配置 Cloudflare DNS

### 4.1 添加 DNS 记录

在 Cloudflare 控制台 → DNS：

| 类型 | 名称   | 内容                     | 代理       |
| ---- | ------ | ------------------------ | ---------- |
| A    | `llms` | `203.0.113.10`（虚拟机 IP） | ✅ 已代理 |

### 4.2 配置 SSL

在 **SSL/TLS → 概览** 下：

- 模式：**完全（严格）**

在 **SSL/TLS → 边缘证书** 下：

- 始终使用 HTTPS：✅ 开启
- 最低 TLS 版本：TLS 1.2
- 自动 HTTPS 重写：✅ 开启

### 4.3 测试

```bash
curl -sI https://llms.seudominio.com/health
# 应返回 HTTP/2 200
```

---

## 5. 运维管理

### 升级到新版本

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### 查看日志

```bash
docker logs -f omniroute          # 实时流
docker logs omniroute --tail 50   # 最近 50 行
```

### 手动数据库备份

```bash
# 从卷复制数据到宿主机
docker cp omniroute:/app/data ./backup-$(date +%F)

# 或压缩整个卷
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### 从备份恢复

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. 高级安全

### 限制 nginx 仅允许 Cloudflare IP

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 范围 — 定期更新
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

在 `nginx.conf` 的 `http {}` 代码块中加入以下内容：

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### 安装 fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 检查状态
fail2ban-client status sshd
```

### 阻止直接访问 Docker 端口

```bash
# 阻止外部直接访问 20128 端口
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# 持久化规则
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. 部署到 Cloudflare Workers（可选）

通过 Cloudflare Workers 实现远程访问（无需直接暴露虚拟机）：

```bash
# 在本地仓库中
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

另请参阅 [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) 了解仓库内的 Cloudflare 隧道操作指南。独立的 `omnirouteCloud/` worker 位于单独的配套仓库中。

---

## 端口汇总

| 端口   | 服务          | 访问方式                     |
| ------ | ------------- | ---------------------------- |
| 22     | SSH           | 公开（配合 fail2ban）        |
| 80     | nginx HTTP    | 跳转 → HTTPS                 |
| 443    | nginx HTTPS   | 通过 Cloudflare 代理         |
| 20128  | OmniRoute      | 仅本地（通过 nginx）         |
