# Guía del usuario

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Guía completa para configurar proveedores, crear combos, integrar herramientas CLI e implementar OmniRoute.

---

## Tabla de contenidos

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Precios de un vistazo

| Nivel              | Proveedor              | Costo                | Restablecer cuota             | Mejor para                  |
| ------------------ | ---------------------- | -------------------- | ----------------------------- | --------------------------- |
| **💳 SUSCRIPCIÓN** | Código Claude (Pro)    | $20/mes              | 5h + weekly                   | Ya suscrito                 |
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
|                    | Cerebras               | Pago por uso         | None                          | Velocidad a escala de oblea |
|                    | Coherir                | Pago por uso         | Ninguno                       | Comando R+ TRAPO            |
|                    | NIM de NVIDIA          | Pago por uso         | Ninguno                       | Modelos empresariales       |
| **💰 BARATO**      | GLM-4.7                | 0,6 dólares/1 millón | Todos los días a las 10 a. m. | Respaldo presupuestario     |
|                    | MiniMax M2.1           | 0,2 dólares/1 millón | 5 horas rodantes              | Opción más barata           |
|                    | Kimi K2                | $9/mes fijo          | 10 millones de tokens/mes     | Costo predecible            |
| **🆓 GRATIS**      | iFlujo                 | $0                   | Ilimitado                     | 8 modelos gratis            |
|                    | Qwen                   | $0                   | Ilimitado                     | 3 modelos gratis            |
|                    | kiro                   | $0                   | Ilimitado                     | Claudio libre               |

**💡 Consejo profesional:** Comience con el combo Gemini CLI (180 000 gratis/mes) + iFlow (ilimitado y gratis) = ¡Costo de $0!

---

## 🎯 Casos de uso

### Caso 1: "Tengo una suscripción a Claude Pro"

**Problema:** La cuota vence sin usarse, la tasa se limita durante la codificación intensa

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Caso 2: "Quiero coste cero"

**Problema:** No puedo permitirme suscripciones, necesito codificación de IA confiable

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Caso 3: "Necesito codificación 24 horas al día, 7 días a la semana, sin interrupciones"

**Problema:** Plazos, no puedo permitirme el tiempo de inactividad

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Caso 4: "Quiero IA GRATIS en OpenClaw"

**Problema:** Necesita asistente de IA en aplicaciones de mensajería, completamente gratis

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Configuración del proveedor

### 🔐 Proveedores de suscripción

#### Código Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Consejo profesional:** Utilice Opus para tareas complejas y Sonnet para mayor velocidad. ¡OmniRoute realiza un seguimiento de la cuota por modelo!

#### Códice OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (¡180K GRATIS/mes!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Mejor valor:** ¡Enorme nivel gratuito! Utilice esto antes de los niveles pagos.

#### Copiloto de GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Proveedores baratos

#### GLM-4.7 (Restablecimiento diario, $0,6/1 millón)

1. Regístrate: [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenga la clave API del plan de codificación
3. Panel de control → Agregar clave API: Proveedor: `glm`, Clave API: `your-key`

**Uso:** `glm/glm-4.7` — **Consejo profesional:** ¡El plan de codificación ofrece 3 × cuota a 1/7 de costo! Reiniciar diariamente a las 10:00 a.m.

#### MiniMax M2.1 (reinicio de 5 h, $0,20/1 millón)

1. Regístrate: [MiniMax](https://www.minimax.io/)
2. Obtener clave API → Panel → Agregar clave API

**Uso:** `minimax/MiniMax-M2.1` — **Consejo profesional:** ¡La opción más barata para contexto largo (1 millón de tokens)!

#### Kimi K2 ($9/mes fijo)

1. Suscríbete: [Moonshot AI](https://platform.moonshot.ai/)
2. Obtener clave API → Panel → Agregar clave API

**Uso:** `kimi/kimi-latest` — **Consejo profesional:** ¡Fijo $9/mes por 10 millones de tokens = $0,90/1 millón de costo efectivo!

### 🆓 Proveedores GRATIS

#### iFlow (8 modelos GRATIS)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 modelos GRATIS)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude GRATIS)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨Combinaciones

### Ejemplo 1: Maximizar la suscripción → Copia de seguridad económica

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Ejemplo 2: Solo gratuito (coste cero)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 Integración CLI

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Código Claude

Editar `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### CLI del Códice

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### Garra Abierta

Editar `~/.openclaw/openclaw.json`:

```json
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

**O use el Panel:** Herramientas CLI → OpenClaw → Configuración automática

### Cline / Continuar / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Implementación

### Implementación de VPS

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

### acoplador

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Para el modo integrado en el host con binarios CLI, consulte la sección Docker en los documentos principales.

### Variables de entorno

| Variables             | Predeterminado                              | Descripción                                                              |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `JWT_SECRET`          | `omniroute-default-secret-change-me`        | Secreto de firma de JWT (**cambio en producción**)                       |
| `INITIAL_PASSWORD`    | `123456`                                    | Primera contraseña de inicio de sesión                                   |
| `DATA_DIR`            | `~/.omniroute`                              | Directorio de datos (db, uso, registros)                                 |
| `PORT`                | marco predeterminado                        | Puerto de servicio (`20128` en ejemplos)                                 |
| `HOSTNAME`            | marco predeterminado                        | Vincular host (Docker por defecto es `0.0.0.0`)                          |
| `NODE_ENV`            | valor predeterminado de tiempo de ejecución | Establecer `production` para implementación                              |
| `BASE_URL`            | `http://localhost:20128`                    | URL base interna del lado del servidor                                   |
| `CLOUD_URL`           | `https://omniroute.dev`                     | URL base del punto final de sincronización en la nube                    |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`             | Secreto HMAC para claves API generadas                                   |
| `REQUIRE_API_KEY`     | `false`                                     | Aplicar la clave API de portador en `/v1/*`                              |
| `ENABLE_REQUEST_LOGS` | `false`                                     | Habilita registros de solicitud/respuesta                                |
| `AUTH_COOKIE_SECURE`  | `false`                                     | Forzar cookie de autenticación `Secure` (detrás del proxy inverso HTTPS) |

Para obtener la referencia completa de las variables de entorno, consulte [README](../README.md).

---

## 📊 Modelos disponibles

<details>
<summary><b>Ver todos los modelos disponibles</b></summary>

**Código Claude (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Códice (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilot de GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — 0,6 $/1 millón: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0,2/1 millón: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

** Búsqueda profunda (`ds/`) **: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplejidad (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Juntos AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fuegos artificiales AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Coherir (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Funciones avanzadas

### Modelos personalizados

Agregue cualquier ID de modelo a cualquier proveedor sin esperar una actualización de la aplicación:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

O utilice el Panel de control: **Proveedores → [Proveedor] → Modelos personalizados**.

### Rutas de proveedores dedicadas

Enrutar solicitudes directamente a un proveedor específico con validación de modelo:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

El prefijo del proveedor se agrega automáticamente si falta. Los modelos no coincidentes devuelven `400`.

### Configuración del proxy de red

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
```

**Precedencia:** Específico de clave → Específico de combo → Específico de proveedor → Global → Entorno.

### API del catálogo de modelos

```bash
curl http://localhost:20128/api/models/catalog
```

Devuelve modelos agrupados por proveedor con tipos (`chat`, `embedding`, `image`).

### Sincronización en la nube

- Sincronizar proveedores, combos y configuraciones entre dispositivos
- Sincronización automática en segundo plano con tiempo de espera + falla rápida
- Prefiere `BASE_URL`/`CLOUD_URL` del lado del servidor en producción

### LLM Gateway Intelligence (Fase 9)

- **Caché semántica**: cachés automáticos sin transmisión, temperatura = 0 respuestas (omitir con `X-OmniRoute-No-Cache: true`)
- **Idempotencia de solicitud**: deduplica solicitudes en 5 segundos a través del encabezado `Idempotency-Key` o `X-Request-Id`
- **Seguimiento del progreso**: suscripción a eventos SSE `event: progress` a través del encabezado `X-OmniRoute-Progress: true`

---

### Patio de juegos del traductor

Acceda a través de **Panel → Traductor**. Depure y visualice cómo OmniRoute traduce las solicitudes de API entre proveedores.

| Modo                       | Propósito                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Parque infantil**        | Seleccione formatos de origen/destino, pegue una solicitud y vea el resultado traducido al instante            |
| **Probador de chat**       | Envíe mensajes de chat en vivo a través del proxy e inspeccione el ciclo completo de solicitud/respuesta       |
| **Banco de pruebas**       | Ejecute pruebas por lotes en múltiples combinaciones de formatos para verificar la corrección de la traducción |
| **Monitorización en vivo** | Vea traducciones en tiempo real a medida que las solicitudes fluyen a través del proxy                         |

**Casos de uso:**

- Depurar por qué falla una combinación específica de cliente/proveedor
- Verificar que las etiquetas de pensamiento, las llamadas a herramientas y las indicaciones del sistema se traduzcan correctamente
- Compare las diferencias de formato entre los formatos OpenAI, Claude, Gemini y Responses API

---

### Estrategias de enrutamiento

Configure a través de **Panel → Configuración → Enrutamiento**.

| Estrategia                      | Descripción                                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Llene primero**               | Utiliza cuentas en orden de prioridad: la cuenta principal maneja todas las solicitudes hasta que no esté disponible |
| **Round Robin**                 | Recorre todas las cuentas con un límite fijo configurable (predeterminado: 3 llamadas por cuenta)                    |
| **P2C (Poder de dos opciones)** | Elige 2 cuentas al azar y ruta hacia la más saludable: los saldos se cargan con conciencia de la salud               |
| **Aleatorio**                   | Selecciona aleatoriamente una cuenta para cada solicitud mediante la reproducción aleatoria de Fisher-Yates          |
| **Menos usado**                 | Rutas a la cuenta con la marca de tiempo `lastUsedAt` más antigua, distribuyendo el tráfico de manera uniforme       |
| **Costo optimizado**            | Rutas a la cuenta con el valor de prioridad más bajo, optimizando para proveedores de menor costo                    |

#### Alias de modelo comodín

Cree patrones comodín para reasignar nombres de modelos:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Los comodines admiten `*` (cualquier carácter) y `?` (un solo carácter).

#### Cadenas de respaldo

Defina cadenas de respaldo globales que se apliquen a todas las solicitudes:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Resiliencia y disyuntores

Configure a través de **Panel → Configuración → Resiliencia**.

OmniRoute implementa resiliencia a nivel de proveedor con cuatro componentes:

1. **Perfiles de proveedor**: configuración por proveedor para:
   - Umbral de fallas (cuántas fallas antes de abrir)
   - Duración del tiempo de recuperación
   - Sensibilidad de detección de límite de velocidad
   - Parámetros de retroceso exponencial

2. **Límites de tarifas editables**: valores predeterminados a nivel del sistema configurables en el panel:
   - **Solicitudes por minuto (RPM)**: solicitudes máximas por minuto por cuenta
   - **Tiempo mínimo entre solicitudes**: intervalo mínimo en milisegundos entre solicitudes
   - **Máximo de solicitudes simultáneas**: máximo de solicitudes simultáneas por cuenta
   - Haga clic en **Editar** para modificar y luego en **Guardar** o **Cancelar**. Los valores persisten a través de la API de resiliencia.

3. **Disyuntor**: realiza un seguimiento de las fallas por proveedor y abre automáticamente el circuito cuando se alcanza un umbral:
   - **CERRADO** (En buen estado): las solicitudes fluyen normalmente
   - **ABIERTO**: el proveedor está bloqueado temporalmente después de fallas repetidas
   - **HALF_OPEN** — Probando si el proveedor se ha recuperado

4. **Políticas e identificadores bloqueados**: muestra el estado del disyuntor y los identificadores bloqueados con capacidad de desbloqueo forzado.

5. **Detección automática de límite de tasa**: monitorea los encabezados `429` y `Retry-After` para evitar de manera proactiva alcanzar los límites de tasa del proveedor.

**Consejo profesional:** Utilice el botón **Restablecer todo** para borrar todos los disyuntores y tiempos de reutilización cuando un proveedor se recupera de una interrupción.

---

### Exportación/Importación de base de datos

Administre las copias de seguridad de la base de datos en **Panel → Configuración → Sistema y almacenamiento**.

| Acción                      | Descripción                                                                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Exportar base de datos**  | Descarga la base de datos SQLite actual como un archivo `.sqlite`                                                                                                                   |
| **Exportar todo (.tar.gz)** | Descarga un archivo de copia de seguridad completo que incluye: base de datos, configuraciones, combinaciones, conexiones de proveedores (sin credenciales), metadatos de clave API |
| **Importar base de datos**  | Cargue un archivo `.sqlite` para reemplazar la base de datos actual. Se crea automáticamente una copia de seguridad previa a la importación                                         |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Validación de importación:** Se valida la integridad del archivo importado (verificación de pragma de SQLite), las tablas requeridas (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) y el tamaño (máximo 100 MB).

**Casos de uso:**

- Migrar OmniRoute entre máquinas
- Crear copias de seguridad externas para la recuperación de desastres.
- Compartir configuraciones entre los miembros del equipo (exportar todo → compartir archivo)

---

### Panel de configuración

La página de configuración está organizada en 5 pestañas para facilitar la navegación:

| Pestaña          | Contenidos                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Seguridad**    | Configuración de inicio de sesión/contraseña, control de acceso IP, autenticación API para `/models` y bloqueo de proveedores     |
| **Enrutamiento** | Estrategia de enrutamiento global (6 opciones), alias de modelos comodín, cadenas de respaldo, valores predeterminados combinados |
| **Resiliencia**  | Perfiles de proveedores, límites de tarifas editables, estado de los disyuntores, políticas e identificadores bloqueados          |
| **IA**           | Pensando en la configuración del presupuesto, inyección de avisos del sistema global, estadísticas de caché de avisos             |
| **Avanzado**     | Configuración de proxy global (HTTP/SOCKS5)                                                                                       |

---

### Gestión de costes y presupuesto

Acceso a través de **Panel → Costos**.

| Pestaña         | Propósito                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Presupuesto** | Establezca límites de gasto por clave API con presupuestos diarios/semanales/mensuales y seguimiento en tiempo real |
| **Precios**     | Ver y editar entradas de precios de modelos: costo por 1.000 tokens de entrada/salida por proveedor                 |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Seguimiento de costos:** Cada solicitud registra el uso del token y calcula el costo utilizando la tabla de precios. Vea desgloses en **Panel → Uso** por proveedor, modelo y clave API.

---

### Transcripción de audio

OmniRoute admite la transcripción de audio a través del punto final compatible con OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Proveedores disponibles: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Formatos de audio admitidos: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Estrategias de equilibrio combinadas

Configure el equilibrio por combo en **Panel → Combos → Crear/Editar → Estrategia**.

| Estrategia                 | Descripción                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| **Todos contra todos**     | Gira a través de modelos secuencialmente                                                     |
| **Prioridad**              | Siempre prueba el primer modelo; retrocede sólo en caso de error                             |
| **Aleatorio**              | Elige un modelo aleatorio del combo para cada solicitud                                      |
| **Ponderado**              | Rutas proporcionalmente en función de los pesos asignados por modelo                         |
| **Menos usado**            | Rutas al modelo con la menor cantidad de solicitudes recientes (utiliza métricas combinadas) |
| **Optimización de costos** | Rutas al modelo más barato disponible (utiliza tabla de precios)                             |

Los valores predeterminados combinados globales se pueden configurar en **Panel → Configuración → Enrutamiento → Valores predeterminados combinados**.

---

### Panel de salud

Accede a través de **Panel → Salud**. Descripción general del estado del sistema en tiempo real con 6 tarjetas:

| Tarjeta                    | Lo que muestra                                                                    |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Estado del sistema**     | Tiempo de actividad, versión, uso de memoria, directorio de datos                 |
| **Salud del proveedor**    | Estado del disyuntor por proveedor (cerrado/abierto/medio abierto)                |
| **Límites de tarifas**     | Tiempos de reutilización del límite de tasa activa por cuenta con tiempo restante |
| **Bloqueos activos**       | Proveedores bloqueados temporalmente por la política de bloqueo                   |
| **Caché de firma**         | Estadísticas de caché de deduplicación (claves activas, tasa de aciertos)         |
| **Telemetría de latencia** | Agregación de latencia p50/p95/p99 por proveedor                                  |

**Consejo profesional:** La página Salud se actualiza automáticamente cada 10 segundos. Utilice la tarjeta del disyuntor para identificar qué proveedores están experimentando problemas.
