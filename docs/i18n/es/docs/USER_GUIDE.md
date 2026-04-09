# User Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Guía completa para configurar proveedores, crear combos, integrar herramientas CLI e implementar OmniRoute.---

## Table of Contents

- [Precios de un vistazo](#-precios de un vistazo)
- [Casos de uso](#-casos de uso)
- [Configuración de proveedor](#-configuración-proveedor)
- [Integración CLI](#-cli-integración)
- [Implementación](#-implementación)
- [Modelos disponibles](#-modelos-disponibles)
- [Funciones avanzadas](#-funciones-avanzadas)---

## 💰 Pricing at a Glance

| Nivel              | Proveedor              | Costo                | Restablecer cuota             | Mejor para                  |
| ------------------ | ---------------------- | -------------------- | ----------------------------- | --------------------------- |
| **💳 SUSCRIPCIÓN** | Código Claude (Pro)    | $20/mes              | 5h + semanales                | Ya suscrito                 |
|                    | Códice (Plus/Pro)      | $20-200/mes          | 5h + semanales                | Usuarios de OpenAI          |
|                    | Géminis CLI            | **GRATIS**           | 180K/mes + 1K/día             | ¡Todos!                     |
|                    | Copiloto de GitHub     | $10-19/mes           | Mensual                       | Usuarios de GitHub          |
| **🔑 CLAVE API**   | Búsqueda profunda      | Pago por uso         | Ninguno                       | Razonamiento barato         |
|                    | Groq                   | Pago por uso         | Ninguno                       | Inferencia ultrarrápida     |
|                    | xAI (Grok)             | Pago por uso         | Ninguno                       | Grok 4 razonamiento         |
|                    | Mistral                | Pago por uso         | Ninguno                       | Modelos alojados en la UE   |
|                    | Perplejidad            | Pago por uso         | Ninguno                       | Búsqueda aumentada          |
|                    | Juntos IA              | Pago por uso         | Ninguno                       | Modelos de código abierto   |
|                    | Fuegos artificiales AI | Pago por uso         | Ninguno                       | Imágenes de flujo rápido    |
|                    | Cerebras               | Pago por uso         | Ninguno                       | Velocidad a escala de oblea |
|                    | Coherir                | Pago por uso         | Ninguno                       | Comando R+ TRAPO            |
|                    | NIM de NVIDIA          | Pago por uso         | Ninguno                       | Modelos empresariales       |
| **💰 BARATO**      | GLM-4.7                | 0,6 dólares/1 millón | Todos los días a las 10 a. m. | Respaldo presupuestario     |
|                    | MiniMax M2.1           | 0,2 dólares/1 millón | 5 horas rodantes              | Opción más barata           |
|                    | Kimi K2                | $9/mes fijo          | 10 millones de tokens/mes     | Costo predecible            |
| **🆓 GRATIS**      | Qoder                  | $0                   | Ilimitado                     | 8 modelos gratis            |
|                    | Qwen                   | $0                   | Ilimitado                     | 3 modelos gratis            |
|                    | kiro                   | $0                   | Ilimitado                     | Claudio libre               |

**💡 Consejo profesional:**Comience con el combo Gemini CLI (180K gratis/mes) + Qoder (ilimitado gratis) = ¡costo de $0!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problema:**La cuota vence sin usarse, la tasa se limita durante la codificación intensa```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problema:**No puedo permitirme suscripciones, necesito codificación de IA confiable```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problema:**Plazos, no puedo permitirme el tiempo de inactividad```
Combo: "always-on"

1. cc/claude-opus-4-6 (best quality)
2. cx/gpt-5.2-codex (second subscription)
3. glm/glm-4.7 (cheap, resets daily)
4. minimax/MiniMax-M2.1 (cheapest, 5h reset)
5. if/kimi-k2-thinking (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)

````

### Case 4: "I want FREE AI in OpenClaw"

**Problema:**Necesita asistente de IA en aplicaciones de mensajería, completamente gratis```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Consejo profesional:**Utilice Opus para tareas complejas y Sonnet para mayor velocidad. ¡OmniRoute realiza un seguimiento de la cuota por modelo!#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Mejor valor:**¡Enorme nivel gratuito! Utilice esto antes de los niveles pagos.#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. Regístrate: [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenga la clave API del plan de codificación
3. Panel de control → Agregar clave API: Proveedor: `glm`, Clave API: `your-key`

**Uso:**`glm/glm-4.7` —**Consejo profesional:**¡El plan de codificación ofrece 3× cuota a un costo de 1/7! Reiniciar diariamente a las 10:00 a.m.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Regístrate: [MiniMax](https://www.minimax.io/)
2. Obtener clave API → Panel → Agregar clave API

**Uso:**`minimax/MiniMax-M2.1` —**Consejo profesional:**¡La opción más barata para contexto largo (1 millón de tokens)!#### Kimi K2 ($9/month flat)

1. Suscríbete: [Moonshot AI](https://platform.moonshot.ai/)
2. Obtener clave API → Panel → Agregar clave API

**Uso:**`kimi/kimi-latest` —**Consejo profesional:**¡Fijo $9/mes por 10 millones de tokens = $0,90/1 millón de costo efectivo!### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Edite `~/.claude/config.json`:```json
{
"anthropic_api_base": "http://localhost:20128/v1",
"anthropic_api_key": "your-omniroute-api-key"
}

````

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
````

### OpenClaw

Edite `~/.openclaw/openclaw.json`:```json
{
"agents": {
"defaults": {
"model": { "primary": "omniroute/if/glm-4.7" }
}
},
"models": {
"providers": {
"omniroute": {
"baseUrl": "http://localhost:20128/v1",
"apiKey": "your-omniroute-api-key",
"api": "openai-completions",
"models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
}
}
}
}

```

**O use el Panel:**Herramientas CLI → OpenClaw → Configuración automática### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Despliegue

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

La CLI carga automáticamente `.env` desde `~/.omniroute/.env` o `./.env`.### VPS Deployment

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### PM2 Deployment (Low Memory)

Para servidores con RAM limitada, utilice la opción de límite de memoria:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Cree `ecosystem.config.js`:```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Para el modo integrado en el host con binarios CLI, consulte la sección Docker en los documentos principales.### Void Linux (xbps-src)

Los usuarios de Void Linux pueden empaquetar e instalar OmniRoute de forma nativa utilizando el marco de compilación cruzada `xbps-src`. Esto automatiza la compilación independiente de Node.js junto con los enlaces nativos `better-sqlite3` requeridos.

<detalles>
<summary><b>Ver plantilla xbps-src</b></summary>```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() { # Determine target CPU arch for node-gyp
local \_gyp_arch
case "$XBPS_TARGET_MACHINE" in
aarch64*) \_gyp_arch=arm64 ;;
armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
esac

    # 1) Install all deps – skip scripts
    NODE_ENV=development npm ci --ignore-scripts

    # 2) Build the Next.js standalone bundle
    npm run build

    # 3) Copy static assets into standalone
    cp -r .next/static .next/standalone/.next/static
    [ -d public ] && cp -r public .next/standalone/public || true

    # 4) Compile better-sqlite3 native binding
    local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
    (cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

    # 5) Place the compiled binding into the standalone bundle
    local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
    mkdir -p "$_bs3_release"
    cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

    # 6) Remove arch-specific sharp bundles
    rm -rf .next/standalone/node_modules/@img

    # 7) Copy pino runtime deps omitted by Next.js static analysis:
    for _mod in pino-abstract-transport split2 process-warning; do
    	cp -r "node_modules/$_mod" .next/standalone/node_modules/
    done

}

do_check() {
npm run test:unit
}

do_install() {
vmkdir usr/lib/omniroute/.next
vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

    # Prevent removal of empty Next.js app router dirs by the post-install hook
    for _d in \
    	.next/standalone/.next/server/app/dashboard \
    	.next/standalone/.next/server/app/dashboard/settings \
    	.next/standalone/.next/server/app/dashboard/providers; do
    	touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
    done

    cat > "${WRKDIR}/omniroute" <<'EOF'

#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
vlicense LICENSE
}

````

</details>

### Environment Variables

| Variables | Predeterminado | Descripción |
| --------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-cambiame` | Secreto de firma de JWT (**cambio en producción**) |
| `CONTRASEÑA_INITIAL` | `123456` | Primera contraseña de inicio de sesión |
| `DATA_DIR` | `~/.omniruta` | Directorio de datos (db, uso, registros) |
| `PUERTO` | marco predeterminado | Puerto de servicio (`20128` en ejemplos) |
| `NOMBRE DE HOST` | marco predeterminado | Vincular host (Docker por defecto es `0.0.0.0`) |
| `NODO_ENV` | valor predeterminado de tiempo de ejecución | Establecer `producción` para implementación |
| `BASE_URL` | `http://localhost:20128` | URL base interna del lado del servidor |
| `NUBE_URL` | `https://omniroute.dev` | URL base del punto final de sincronización en la nube |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Secreto HMAC para claves API generadas |
| `REQUIRE_API_KEY` | `falso` | Aplicar clave de API de portador en `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `falso` | Permitir que Api Manager copie claves API completas a pedido |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Cadencia de actualización del lado del servidor para datos de límites de proveedor almacenados en caché; Los botones de actualización de la interfaz de usuario aún activan la sincronización manual |
| `DISABLE_SQLITE_AUTO_BACKUP` | `falso` | Deshabilite las instantáneas automáticas de SQLite antes de escribir/importar/restaurar; las copias de seguridad manuales todavía funcionan |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `falso` | Forzar cookie de autenticación "segura" (detrás del proxy inverso HTTPS) |
| `CLOUDFLARED_BIN` | desarmado | Utilice un binario `cloudflared` existente en lugar de una descarga administrada |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transporte para Quick Tunnels administrados (`http2`, `quic` o `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Límite de montón de Node.js en MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Entradas máximas de caché de avisos |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Entradas máximas de caché semántica |Para obtener la referencia completa de las variables de entorno, consulte [README](../README.md).---

## 📊 Available Models

<detalles>
<summary><b>Ver todos los modelos disponibles</b></summary>

**Código Claude (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilot de GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0,6/1 millón: `glm/glm-4.7`

**MiniMax (`minimax/`)**— $0,2/1 millón: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-razonamiento-rápido`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplejidad (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Juntos AI (`juntos/`)**: `juntos/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fuegos artificiales AI (`fuegos artificiales/`)**: `fuegos artificiales/cuentas/fuegos artificiales/modelos/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Agregue cualquier ID de modelo a cualquier proveedor sin esperar una actualización de la aplicación:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

O utilice el Panel de control:**Proveedores → [Proveedor] → Modelos personalizados**.

Notas:

- Los proveedores compatibles con OpenRouter y OpenAI/Anthropic se administran desde**Modelos disponibles**únicamente. La adición manual, la importación y la sincronización automática se encuentran en la misma lista de modelos disponibles, por lo que no hay una sección de Modelos personalizados separada para esos proveedores.
- La sección**Modelos personalizados**está destinada a proveedores que no exponen importaciones administradas de modelos disponibles.### Dedicated Provider Routes

Enrutar solicitudes directamente a un proveedor específico con validación de modelo:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

El prefijo del proveedor se agrega automáticamente si falta. Los modelos que no coinciden devuelven "400".### Network Proxy Configuration

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
````

**Precedencia:**Específico de clave → Específico de combo → Específico de proveedor → Global → Entorno.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Devuelve modelos agrupados por proveedor con tipos (`chat`, `incrustación`, `imagen`).### Cloud Sync

- Sincronizar proveedores, combos y configuraciones entre dispositivos
- Sincronización automática en segundo plano con tiempo de espera + falla rápida
- Prefiere `BASE_URL`/`CLOUD_URL` del lado del servidor en producción### Cloudflare Quick Tunnel

- Disponible en**Panel → Puntos finales**para Docker y otras implementaciones autohospedadas
- Crea una URL temporal `https://*.trycloudflare.com` que reenvía a su punto final actual `/v1` compatible con OpenAI
- Primero habilite instala `cloudflared` solo cuando sea necesario; más tarde se reinicia y se reutiliza el mismo binario administrado
- Los túneles rápidos no se restauran automáticamente después de reiniciar OmniRoute o un contenedor; Vuelva a habilitarlos desde el tablero cuando sea necesario.
- Las URL del túnel son efímeras y cambian cada vez que detienes o inicias el túnel.
- Los túneles rápidos administrados utilizan de forma predeterminada el transporte HTTP/2 para evitar ruidosas advertencias del buffer QUIC UDP en contenedores restringidos.
- Establezca `CLOUDFLARED_PROTOCOL=quic` o `auto` si desea anular la opción de transporte administrado
- Configure `CLOUDFLARED_BIN` si prefiere usar un binario `cloudflared` preinstalado en lugar de la descarga administrada.### LLM Gateway Intelligence (Phase 9)

-**Caché semántica**: caché automático sin transmisión, temperatura = 0 respuestas (omitir con `X-OmniRoute-No-Cache: true`) -**Request Idempotency**: deduplica solicitudes en 5 segundos a través del encabezado `Idempotency-Key` o `X-Request-Id` -**Seguimiento de progreso**: active los eventos `evento: progreso` de SSE a través del encabezado `X-OmniRoute-Progress: verdadero`---

### Translator Playground

Acceda a través de**Panel → Traductor**. Depure y visualice cómo OmniRoute traduce las solicitudes de API entre proveedores.

| Modo                       | Propósito                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Parque infantil**        | Seleccione formatos de origen/destino, pegue una solicitud y vea el resultado traducido al instante            |
| **Probador de chat**       | Envíe mensajes de chat en vivo a través del proxy e inspeccione el ciclo completo de solicitud/respuesta       |
| **Banco de pruebas**       | Ejecute pruebas por lotes en múltiples combinaciones de formatos para verificar la corrección de la traducción |
| **Monitorización en vivo** | Vea traducciones en tiempo real a medida que las solicitudes fluyen a través del proxy                         |

**Casos de uso:**

- Depurar por qué falla una combinación específica de cliente/proveedor
- Verificar que las etiquetas de pensamiento, las llamadas a herramientas y las indicaciones del sistema se traduzcan correctamente
- Compare las diferencias de formato entre los formatos OpenAI, Claude, Gemini y Responses API---

### Routing Strategies

Configure a través de**Panel → Configuración → Enrutamiento**.

| Estrategia                      | Descripción                                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Llene primero**               | Utiliza cuentas en orden de prioridad: la cuenta principal maneja todas las solicitudes hasta que no esté disponible |
| **Round Robin**                 | Recorre todas las cuentas con un límite fijo configurable (predeterminado: 3 llamadas por cuenta)                    |
| **P2C (Poder de dos opciones)** | Elige 2 cuentas al azar y ruta hacia la más saludable: los saldos se cargan con conciencia de la salud               |
| **Aleatorio**                   | Selecciona aleatoriamente una cuenta para cada solicitud mediante la reproducción aleatoria de Fisher-Yates          |
| **Menos usado**                 | Rutas a la cuenta con la marca de tiempo `lastUsedAt` más antigua, distribuyendo el tráfico de manera uniforme       |
| **Costo optimizado**            | Rutas a la cuenta con el valor de prioridad más bajo, optimizando para proveedores de menor costo                    | #### External Sticky Session Header |

Para afinidad de sesión externa (por ejemplo, agentes Claude Code/Codex detrás de servidores proxy inversos), envíe:```http
X-Session-Id: your-session-key

````

OmniRoute también acepta `x_session_id` y devuelve la clave de sesión efectiva en `X-OmniRoute-Session-Id`.

Si usa Nginx y envía encabezados de formato de guión bajo, habilite:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Cree patrones comodín para reasignar nombres de modelos:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Los comodines admiten `*` (cualquier carácter) y `?` (un solo carácter).#### Fallback Chains

Defina cadenas de respaldo globales que se apliquen a todas las solicitudes:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Configure a través de**Panel → Configuración → Resiliencia**.

OmniRoute implementa resiliencia a nivel de proveedor con cuatro componentes:

1.**Perfiles de proveedor**: configuración por proveedor para:

- Umbral de fallas (cuántas fallas antes de abrir)
- Duración del tiempo de recuperación
- Sensibilidad de detección de límite de velocidad
- Parámetros de retroceso exponencial

  2.**Límites de tarifas editables**: valores predeterminados a nivel del sistema configurables en el panel: -**Solicitudes por minuto (RPM)**: solicitudes máximas por minuto por cuenta -**Tiempo mínimo entre solicitudes**: intervalo mínimo en milisegundos entre solicitudes -**Máximo de solicitudes simultáneas**: máximo de solicitudes simultáneas por cuenta

- Haga clic en**Editar**para modificar y luego en**Guardar**o**Cancelar**. Los valores persisten a través de la API de resiliencia.

  3.**Disyuntor**: realiza un seguimiento de las fallas por proveedor y abre automáticamente el circuito cuando se alcanza un umbral: -**CERRADO**(En buen estado): las solicitudes fluyen normalmente -**ABIERTO**: el proveedor está bloqueado temporalmente después de fallas repetidas -**HALF_OPEN**— Probando si el proveedor se ha recuperado

  4.**Políticas e identificadores bloqueados**: muestra el estado del disyuntor y los identificadores bloqueados con capacidad de desbloqueo forzado.

  5.**Detección automática del límite de tasa**: monitorea los encabezados "429" y "Reintentar después" para evitar de manera proactiva alcanzar los límites de tasa del proveedor.

**Consejo profesional:**Utilice el botón**Restablecer todo**para borrar todos los disyuntores y tiempos de reutilización cuando un proveedor se recupera de una interrupción.---

### Database Export / Import

Administre las copias de seguridad de la base de datos en**Panel → Configuración → Sistema y almacenamiento**.

| Acción                      | Descripción                                                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Exportar base de datos**  | Descarga la base de datos SQLite actual como un archivo `.sqlite`                                                                                                                         |
| **Exportar todo (.tar.gz)** | Descarga un archivo de copia de seguridad completo que incluye: base de datos, configuraciones, combinaciones, conexiones de proveedores (sin credenciales), metadatos de clave API       |
| **Importar base de datos**  | Cargue un archivo `.sqlite` para reemplazar la base de datos actual. Se crea automáticamente una copia de seguridad previa a la importación a menos que `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Validación de importación:**El archivo importado se valida en cuanto a integridad (verificación de pragma de SQLite), tablas requeridas (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) y tamaño (máximo 100 MB).

**Casos de uso:**

- Migrar OmniRoute entre máquinas
- Crear copias de seguridad externas para la recuperación de desastres.
- Compartir configuraciones entre los miembros del equipo (exportar todo → compartir archivo)---

### Settings Dashboard

La página de configuración está organizada en 6 pestañas para facilitar la navegación:

| Pestaña | Contenidos |
| -------------- | ---------------------------------------------------------------------------------------------- |
|**Generalidades**| Herramientas de almacenamiento del sistema, configuraciones de apariencia, controles de temas y visibilidad de la barra lateral por elemento |
|**Seguridad**| Configuración de inicio de sesión/contraseña, control de acceso IP, autenticación API para `/models` y bloqueo de proveedores |
|**Enrutamiento**| Estrategia de enrutamiento global (6 opciones), alias de modelos comodín, cadenas de respaldo, valores predeterminados combinados |
|**Resiliencia**| Perfiles de proveedores, límites de tarifas editables, estado de los disyuntores, políticas e identificadores bloqueados |
|**IA**| Pensando en la configuración del presupuesto, inyección de avisos del sistema global, estadísticas de caché de avisos |
|**Avanzado**| Configuración de proxy global (HTTP/SOCKS5) |---

### Costs & Budget Management

Acceso a través de**Panel → Costos**.

| Pestaña | Propósito |
| ----------- | ---------------------------------------------------------------------------------------- |
|**Presupuesto**| Establezca límites de gasto por clave API con presupuestos diarios/semanales/mensuales y seguimiento en tiempo real |
|**Precios**| Ver y editar entradas de precios de modelos: costo por 1.000 tokens de entrada/salida por proveedor |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Seguimiento de costos:**Cada solicitud registra el uso del token y calcula el costo utilizando la tabla de precios. Vea desgloses en**Panel → Uso**por proveedor, modelo y clave API.---

### Audio Transcription

OmniRoute admite la transcripción de audio a través del punto final compatible con OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Proveedores disponibles:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Formatos de audio admitidos: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Configure el equilibrio por combo en**Panel → Combos → Crear/Editar → Estrategia**.

| Estrategia | Descripción |
| ------------------ | ------------------------------------------------------------------------ |
|**Todos contra todos**| Gira a través de modelos secuencialmente |
|**Prioridad**| Siempre prueba el primer modelo; retrocede sólo en caso de error |
|**Aleatorio**| Elige un modelo aleatorio del combo para cada solicitud |
|**Ponderado**| Rutas proporcionalmente en función de los pesos asignados por modelo |
|**Menos usado**| Rutas al modelo con la menor cantidad de solicitudes recientes (utiliza métricas combinadas) |
|**Optimización de costos**| Rutas al modelo más barato disponible (utiliza tabla de precios) |

Los valores predeterminados combinados globales se pueden configurar en**Panel → Configuración → Enrutamiento → Valores predeterminados combinados**.---

### Health Dashboard

Accede a través de**Panel → Salud**. Descripción general del estado del sistema en tiempo real con 6 tarjetas:

| Tarjeta | Lo que muestra |
| --------------------- | ----------------------------------------------------- |
|**Estado del sistema**| Tiempo de actividad, versión, uso de memoria, directorio de datos |
|**Salud del proveedor**| Estado del disyuntor por proveedor (cerrado/abierto/medio abierto) |
|**Límites de tarifas**| Tiempos de reutilización del límite de tasa activa por cuenta con tiempo restante |
|**Bloqueos activos**| Proveedores bloqueados temporalmente por la política de bloqueo |
|**Caché de firma**| Estadísticas de caché de deduplicación (claves activas, tasa de aciertos) |
|**Telemetría de latencia**| Agregación de latencia p50/p95/p99 por proveedor |

**Consejo profesional:**La página Salud se actualiza automáticamente cada 10 segundos. Utilice la tarjeta del disyuntor para identificar qué proveedores están experimentando problemas.---

## 🖥️ Desktop Application (Electron)

OmniRoute está disponible como aplicación de escritorio nativa para Windows, macOS y Linux.### Instalar

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Salida → `electrón/dist-electrón/`### Key Features

| Característica                         | Descripción                                                                       |
| -------------------------------------- | --------------------------------------------------------------------------------- | ------------------------- |
| **Preparación del servidor**           | Servidor de encuestas antes de mostrar la ventana (sin pantalla en blanco)        |
| **Bandeja del sistema**                | Minimizar a bandeja, cambiar puerto, salir del menú de bandeja                    |
| **Gestión Portuaria**                  | Cambiar el puerto del servidor desde la bandeja (servidor de reinicio automático) |
| **Política de seguridad de contenido** | CSP restrictivo mediante encabezados de sesión                                    |
| **Instancia única**                    | Solo se puede ejecutar una instancia de aplicación a la vez                       |
| **Modo sin conexión**                  | El servidor Next.js incluido funciona sin Internet                                | ### Environment Variables |

| Variables             | Predeterminado | Descripción                                                |
| --------------------- | -------------- | ---------------------------------------------------------- |
| `OMNIROUTE_PORT`      | `20128`        | Puerto del servidor                                        |
| `OMNIROUTE_MEMORY_MB` | `512`          | Límite de almacenamiento dinámico de Node.js (64–16384 MB) |

📖 Documentación completa: [`electron/README.md`](../electron/README.md)
