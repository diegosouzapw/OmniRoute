# OmniRoute — Guia de Deploy em VM com Cloudflare

Guia completo para instalar e configurar o OmniRoute em uma VM (VPS) com domínio gerenciado via Cloudflare.

---

## Pré-Requisitos

| Item        | Mínimo                   | Recomendado      |
| ----------- | ------------------------ | ---------------- |
| **CPU**     | 1 vCPU                   | 2 vCPU           |
| **RAM**     | 1 GB                     | 2 GB             |
| **Disco**   | 10 GB SSD                | 25 GB SSD        |
| **SO**      | Ubuntu 22.04 LTS         | Ubuntu 24.04 LTS |
| **Domínio** | Registrado no Cloudflare | —                |
| **Docker**  | Docker Engine 24+        | Docker 27+       |

**Providers testados**: Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

---

## 1. Configurar a VM

### 1.1 Criar a instância

No seu provider de VPS preferido:

- Escolha Ubuntu 24.04 LTS
- Selecione o plano mínimo (1 vCPU / 1 GB RAM)
- Defina uma senha forte para root ou configure SSH key
- Anote o **IP público** (ex: `203.0.113.10`)

### 1.2 Conectar via SSH

```bash
ssh root@203.0.113.10
```

### 1.3 Atualizar o sistema

```bash
apt update && apt upgrade -y
```

### 1.4 Instalar Docker

```bash
# Instalar dependências
apt install -y ca-certificates curl gnupg

# Adicionar repositório oficial do Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 1.5 Instalar nginx

```bash
apt install -y nginx
```

### 1.6 Configurar Firewall (UFW)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (redirect)
ufw allow 443/tcp   # HTTPS
ufw enable
```

> **Dica**: Para segurança máxima, restrinja as portas 80 e 443 apenas para IPs da Cloudflare. Veja a seção [Segurança Avançada](#segurança-avançada).

---

## 2. Instalar o OmniRoute

### 2.1 Criar diretório de configuração

```bash
mkdir -p /opt/omniroute
```

### 2.2 Criar arquivo de variáveis de ambiente

```bash
cat > /opt/omniroute/.env << 'EOF'
# === Segurança ===
JWT_SECRET=ALTERE-PARA-CHAVE-SECRETA-UNICA-64-CHARS
INITIAL_PASSWORD=SuaSenhaSegura123!
API_KEY_SECRET=ALTERE-PARA-OUTRA-CHAVE-SECRETA
STORAGE_ENCRYPTION_KEY=ALTERE-PARA-TERCEIRA-CHAVE-SECRETA
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=ALTERE-PARA-SALT-UNICO

# === App ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
STORAGE_DRIVER=sqlite
ENABLE_REQUEST_LOGS=true
AUTH_COOKIE_SECURE=false
REQUIRE_API_KEY=false

# === Domain (altere para seu domínio) ===
BASE_URL=https://llms.seudominio.com
NEXT_PUBLIC_BASE_URL=https://llms.seudominio.com

# === Cloud Sync (opcional) ===
# CLOUD_URL=https://cloud.omniroute.online
# NEXT_PUBLIC_CLOUD_URL=https://cloud.omniroute.online
EOF
```

> ⚠️ **IMPORTANTE**: Gere chaves secretas únicas! Use `openssl rand -hex 32` para cada chave.

### 2.3 Iniciar o container

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

Deve exibir: `[DB] SQLite database ready` e `listening on port 20128`.

---

## 3. Configurar nginx (Reverse Proxy)

### 3.1 Gerar certificado SSL (Cloudflare Origin)

No painel da Cloudflare:

1. Vá em **SSL/TLS → Origin Server**
2. Clique **Create Certificate**
3. Deixe os padrões (15 anos, \*.seudominio.com)
4. Copie o **Origin Certificate** e a **Private Key**

```bash
mkdir -p /etc/nginx/ssl

# Colar o certificado
nano /etc/nginx/ssl/origin.crt

# Colar a chave privada
nano /etc/nginx/ssl/origin.key

chmod 600 /etc/nginx/ssl/origin.key
```

### 3.2 Configuração do nginx

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
    server_name llms.seudominio.com;  # Altere para seu domínio

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
    server_name llms.seudominio.com;
    return 301 https://$server_name$request_uri;
}
NGINX
```

### 3.3 Ativar e testar

```bash
# Remover config padrão
rm -f /etc/nginx/sites-enabled/default

# Ativar OmniRoute
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute

# Testar e recarregar
nginx -t && systemctl reload nginx
```

---

## 4. Configurar Cloudflare DNS

### 4.1 Adicionar registro DNS

No painel da Cloudflare → DNS:

| Type | Name   | Content                   | Proxy      |
| ---- | ------ | ------------------------- | ---------- |
| A    | `llms` | `203.0.113.10` (IP da VM) | ✅ Proxied |

### 4.2 Configurar SSL

Em **SSL/TLS → Overview**:

- Modo: **Full (Strict)**

Em **SSL/TLS → Edge Certificates**:

- Always Use HTTPS: ✅ On
- Minimum TLS Version: TLS 1.2
- Automatic HTTPS Rewrites: ✅ On

### 4.3 Testar

```bash
curl -sI https://llms.seudominio.com/health
# Deve retornar HTTP/2 200
```

---

## 5. Operações e Manutenção

### Atualizar para nova versão

```bash
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Ver logs

```bash
docker logs -f omniroute          # Stream em tempo real
docker logs omniroute --tail 50   # Últimas 50 linhas
```

### Backup manual do banco

```bash
# Copiar dados do volume para o host
docker cp omniroute:/app/data ./backup-$(date +%F)

# Ou comprimir todo o volume
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/omniroute-data-$(date +%F).tar.gz /data
```

### Restaurar de backup

```bash
docker stop omniroute
docker run --rm -v omniroute-data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/omniroute-data-YYYY-MM-DD.tar.gz -C /"
docker start omniroute
```

---

## 6. Segurança Avançada

### Restringir nginx para Cloudflare IPs

```bash
cat > /etc/nginx/cloudflare-ips.conf << 'CF'
# Cloudflare IPv4 ranges — atualizar periodicamente
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

Adicionar no `nginx.conf` dentro do bloco `http {}`:

```nginx
include /etc/nginx/cloudflare-ips.conf;
```

### Install fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Verificar status
fail2ban-client status sshd
```

### Bloquear acesso direto na porta do Docker

```bash
# Impedir acesso externo direto à porta 20128
iptables -I DOCKER-USER -p tcp --dport 20128 -j DROP
iptables -I DOCKER-USER -i lo -p tcp --dport 20128 -j ACCEPT

# Persistir as regras
apt install -y iptables-persistent
netfilter-persistent save
```

---

## 7. Deploy do Cloud Worker (Opcional)

Para acesso remoto via Cloudflare Workers (sem expor a VM diretamente):

```bash
# No repositório local
cd omnirouteCloud
npm install
npx wrangler login
npx wrangler deploy
```

Ver documentação completa em [omnirouteCloud/README.md](../omnirouteCloud/README.md).

---

## Resumo de Portas

| Porta | Serviço     | Acesso                        |
| ----- | ----------- | ----------------------------- |
| 22    | SSH         | Público (com fail2ban)        |
| 80    | nginx HTTP  | Redirect → HTTPS              |
| 443   | nginx HTTPS | Via Cloudflare Proxy          |
| 20128 | OmniRoute   | Somente localhost (via nginx) |
