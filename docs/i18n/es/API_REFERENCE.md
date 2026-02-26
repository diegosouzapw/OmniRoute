# Referencia de API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Referencia completa para todos los puntos finales de la API de OmniRoute.

---

## Tabla de contenidos

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Finalizaciones de chat

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Encabezados personalizados

| Encabezado               | Dirección | Descripción                                            |
| ------------------------ | --------- | ------------------------------------------------------ |
| `X-OmniRoute-No-Cache`   | Solicitar | Establezca en `true` para omitir el caché              |
| `X-OmniRoute-Progress`   | Solicitar | Establecer en `true` para eventos de progreso          |
| `Idempotency-Key`        | Solicitar | Clave de desduplicación (ventana 5s)                   |
| `X-Request-Id`           | Solicitar | Clave de desduplicación alternativa                    |
| `X-OmniRoute-Cache`      | Respuesta | `HIT` o `MISS` (sin transmisión)                       |
| `X-OmniRoute-Idempotent` | Respuesta | `true` si está deduplicado                             |
| `X-OmniRoute-Progress`   | Respuesta | `enabled` si el seguimiento del progreso está activado |

---

## Incrustaciones

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Proveedores disponibles: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Generación de imágenes

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Proveedores disponibles: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Listar modelos

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Puntos finales de compatibilidad

| Método   | Camino                      | Formato                  |
| -------- | --------------------------- | ------------------------ |
| PUBLICAR | `/v1/chat/completions`      | Abierta AI               |
| PUBLICAR | `/v1/messages`              | Antrópico                |
| PUBLICAR | `/v1/responses`             | Respuestas de OpenAI     |
| PUBLICAR | `/v1/embeddings`            | Abierta AI               |
| PUBLICAR | `/v1/images/generations`    | Abierta AI               |
| OBTENER  | `/v1/models`                | Abierta AI               |
| PUBLICAR | `/v1/messages/count_tokens` | Antrópico                |
| OBTENER  | `/v1beta/models`            | Géminis                  |
| PUBLICAR | `/v1beta/models/{...path}`  | Géminis genera contenido |
| PUBLICAR | `/v1/api/chat`              | Ollamá                   |

### Rutas de proveedores dedicadas

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

El prefijo del proveedor se agrega automáticamente si falta. Los modelos no coincidentes devuelven `400`.

---

## Caché semántico

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Ejemplo de respuesta:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Panel de control y gestión

### Autenticación

| Punto final                   | Método        | Descripción                         |
| ----------------------------- | ------------- | ----------------------------------- |
| `/api/auth/login`             | PUBLICAR      | Iniciar sesión                      |
| `/api/auth/logout`            | PUBLICAR      | Cerrar sesión                       |
| `/api/settings/require-login` | OBTENER/PONER | Alternar inicio de sesión requerido |

### Gestión de proveedores

| Punto final                  | Método                    | Descripción                         |
| ---------------------------- | ------------------------- | ----------------------------------- |
| `/api/providers`             | OBTENER/PUBLICAR          | Listar/crear proveedores            |
| `/api/providers/[id]`        | OBTENER/PONER/ELIMINAR    | Gestionar un proveedor              |
| `/api/providers/[id]/test`   | PUBLICAR                  | Conexión del proveedor de pruebas   |
| `/api/providers/[id]/models` | OBTENER                   | Listar modelos de proveedores       |
| `/api/providers/validate`    | PUBLICAR                  | Validar configuración del proveedor |
| `/api/provider-nodes*`       | Varios                    | Gestión de nodos de proveedores     |
| `/api/provider-models`       | OBTENER/PUBLICAR/ELIMINAR | Modelos personalizados              |

### Flujos de OAuth

| Punto final                      | Método | Descripción                    |
| -------------------------------- | ------ | ------------------------------ |
| `/api/oauth/[provider]/[action]` | Varios | OAuth específico del proveedor |

### Enrutamiento y configuración

| Punto final           | Método           | Descripción                            |
| --------------------- | ---------------- | -------------------------------------- |
| `/api/models/alias`   | OBTENER/PUBLICAR | Alias ​​de modelos                     |
| `/api/models/catalog` | OBTENER          | Todos los modelos por proveedor + tipo |
| `/api/combos*`        | Varios           | Gestión combinada                      |
| `/api/keys*`          | Varios           | Gestión de claves API                  |
| `/api/pricing`        | OBTENER          | Precios del modelo                     |

### Uso y análisis

| Punto final                 | Método  | Descripción                    |
| --------------------------- | ------- | ------------------------------ |
| `/api/usage/history`        | OBTENER | Historial de uso               |
| `/api/usage/logs`           | OBTENER | Registros de uso               |
| `/api/usage/request-logs`   | OBTENER | Registros a nivel de solicitud |
| `/api/usage/[connectionId]` | OBTENER | Uso por conexión               |

### Configuración

| Punto final                     | Método        | Descripción                             |
| ------------------------------- | ------------- | --------------------------------------- |
| `/api/settings`                 | OBTENER/PONER | Configuraciones generales               |
| `/api/settings/proxy`           | OBTENER/PONER | Configuración de proxy de red           |
| `/api/settings/proxy/test`      | PUBLICAR      | Probar conexión proxy                   |
| `/api/settings/ip-filter`       | OBTENER/PONER | Lista de IP permitidas/lista de bloqueo |
| `/api/settings/thinking-budget` | OBTENER/PONER | Presupuesto simbólico de razonamiento   |
| `/api/settings/system-prompt`   | OBTENER/PONER | Aviso del sistema global                |

### Monitoreo

| Punto final              | Método           | Descripción                    |
| ------------------------ | ---------------- | ------------------------------ |
| `/api/sessions`          | OBTENER          | Seguimiento de sesión activa   |
| `/api/rate-limits`       | OBTENER          | Límites de tasas por cuenta    |
| `/api/monitoring/health` | OBTENER          | Control de salud               |
| `/api/cache`             | OBTENER/ELIMINAR | Estadísticas de caché / borrar |

### Copia de seguridad y exportación/importación

| Punto final                 | Método   | Descripción                                                   |
| --------------------------- | -------- | ------------------------------------------------------------- |
| `/api/db-backups`           | OBTENER  | Listar copias de seguridad disponibles                        |
| `/api/db-backups`           | PONER    | Crear una copia de seguridad manual                           |
| `/api/db-backups`           | PUBLICAR | Restaurar desde una copia de seguridad específica             |
| `/api/db-backups/export`    | OBTENER  | Descargar la base de datos como archivo .sqlite               |
| `/api/db-backups/import`    | PUBLICAR | Cargue el archivo .sqlite para reemplazar la base de datos    |
| `/api/db-backups/exportAll` | OBTENER  | Descargue la copia de seguridad completa como archivo .tar.gz |

### Sincronización en la nube

| Punto final            | Método   | Descripción                              |
| ---------------------- | -------- | ---------------------------------------- |
| `/api/sync/cloud`      | Varios   | Operaciones de sincronización en la nube |
| `/api/sync/initialize` | PUBLICAR | Inicializar sincronización               |
| `/api/cloud/*`         | Varios   | Gestión de la nube                       |

### Herramientas CLI

| Punto final                        | Método  | Descripción                         |
| ---------------------------------- | ------- | ----------------------------------- |
| `/api/cli-tools/claude-settings`   | OBTENER | Estado de Claude CLI                |
| `/api/cli-tools/codex-settings`    | OBTENER | Estado de la CLI del Códice         |
| `/api/cli-tools/droid-settings`    | OBTENER | Estado de la CLI del droide         |
| `/api/cli-tools/openclaw-settings` | OBTENER | Estado de la CLI de OpenClaw        |
| `/api/cli-tools/runtime/[toolId]`  | OBTENER | Tiempo de ejecución de CLI genérico |

Las respuestas de CLI incluyen: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Resiliencia y límites de tasas

| Punto final             | Método        | Descripción                                |
| ----------------------- | ------------- | ------------------------------------------ |
| `/api/resilience`       | OBTENER/PONER | Obtener/actualizar perfiles de resiliencia |
| `/api/resilience/reset` | PUBLICAR      | Restablecer disyuntores                    |
| `/api/rate-limits`      | OBTENER       | Estado del límite de tasa por cuenta       |
| `/api/rate-limit`       | OBTENER       | Configuración del límite de tasa global    |

### Evaluaciones

| Punto final  | Método           | Descripción                                        |
| ------------ | ---------------- | -------------------------------------------------- |
| `/api/evals` | OBTENER/PUBLICAR | Listar conjuntos de evaluación/ejecutar evaluación |

### Políticas

| Punto final     | Método                    | Descripción                           |
| --------------- | ------------------------- | ------------------------------------- |
| `/api/policies` | OBTENER/PUBLICAR/ELIMINAR | Administrar políticas de enrutamiento |

### Cumplimiento

| Punto final                 | Método  | Descripción                                      |
| --------------------------- | ------- | ------------------------------------------------ |
| `/api/compliance/audit-log` | OBTENER | Registro de auditoría de cumplimiento (última N) |

### v1beta (Compatible con Gemini)

| Punto final                | Método   | Descripción                           |
| -------------------------- | -------- | ------------------------------------- |
| `/v1beta/models`           | OBTENER  | Listar modelos en formato Gemini      |
| `/v1beta/models/{...path}` | PUBLICAR | Géminis `generateContent` punto final |

Estos puntos finales reflejan el formato API de Gemini para clientes que esperan compatibilidad nativa con el SDK de Gemini.

### API internas/del sistema

| Punto final     | Método   | Descripción                                                                         |
| --------------- | -------- | ----------------------------------------------------------------------------------- |
| `/api/init`     | OBTENER  | Comprobación de inicialización de la aplicación (utilizada en la primera ejecución) |
| `/api/tags`     | OBTENER  | Etiquetas de modelo compatibles con Ollama (para clientes de Ollama)                |
| `/api/restart`  | PUBLICAR | Activar reinicio ordenado del servidor                                              |
| `/api/shutdown` | PUBLICAR | Activar el cierre ordenado del servidor                                             |

> **Nota:** Estos puntos finales se utilizan internamente por el sistema o para la compatibilidad del cliente Ollama. Por lo general, los usuarios finales no los llaman.

---

## Transcripción de audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transcribe archivos de audio usando Deepgram o AssemblyAI.

**Solicitud:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Respuesta:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Proveedores admitidos:** `deepgram/nova-3`, `assemblyai/best`.

**Formatos admitidos:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Compatibilidad con Ollama

Para clientes que utilizan el formato API de Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Las solicitudes se traducen automáticamente entre Ollama y los formatos internos.

---

## Telemetría

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Respuesta:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Presupuesto

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Disponibilidad del modelo

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Procesamiento de solicitudes

1. El cliente envía la solicitud a `/v1/*`
2. Llamadas del controlador de ruta `handleChat`, `handleEmbedding`, `handleAudioTranscription` o `handleImageGeneration`
3. Se resuelve el modelo (proveedor directo/modelo o alias/combo)
4. Credenciales seleccionadas de la base de datos local con filtrado de disponibilidad de cuenta
5. Para chat: `handleChatCore`: detección de formato, traducción, verificación de caché, verificación de idempotencia
6. El ejecutor del proveedor envía una solicitud ascendente
7. Respuesta traducida al formato del cliente (chat) o devuelta tal como está (incrustaciones/imágenes/audio)
8. Uso/registro registrado
9. El respaldo se aplica en caso de errores de acuerdo con las reglas combinadas.

Referencia de arquitectura completa: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Autenticación

- Las rutas del panel (`/dashboard/*`) utilizan la cookie `auth_token`
- El inicio de sesión utiliza el hash de contraseña guardado; recurrir a `INITIAL_PASSWORD`
- `requireLogin` conmutable a través de `/api/settings/require-login`
- Las rutas `/v1/*` opcionalmente requieren una clave API de portador cuando `REQUIRE_API_KEY=true`
