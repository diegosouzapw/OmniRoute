# Embedded Services (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versión:** v3.8.44
> **Última actualización:** 2026-09-09
> **Audiencia:** Ingenieros que añaden, mantienen o depuran servicios integrados (9Router, CLIProxyAPI, Mux, Bifrost, open-wa).

Los servicios integrados son herramientas de procesos auxiliares instaladas localmente que OmniRoute instala, supervisa y
expone como destinos de enrutamiento de primera clase. A diferencia de los proveedores externos (a los que se accede a través de Internet
mediante claves de API), los servicios integrados se ejecutan en el mismo equipo que OmniRoute y se comunican a través de la interfaz de bucle invertido.

---

## Tabla de contenidos

1. [Descripción general](#1-overview)
2. [Arquitectura — 4 capas](#2-architecture--4-layers)
3. [Máquina de estados del ciclo de vida](#3-lifecycle-state-machine)
4. [Referencia de la API](#4-api-reference)
5. [Seguridad](#5-security)
6. [Añadir un nuevo servicio integrado](#6-adding-a-new-embedded-service)
7. [Solución de problemas](#7-troubleshooting)
8. [Preguntas frecuentes](#8-faq)

---

## 1. Descripción general

### ¿Por qué servicios integrados?

Se integran seis servicios:

| Servicio        | Paquete npm                                   | Puerto predeterminado | Propósito                                                                                                                                                                                                                                  |
| --------------- | --------------------------------------------- | :-------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **9Router**     | `9router`                                     |         20130         | Enrutador de IA que OmniRoute puede utilizar como subproveedor. Los modelos se exponen como `9router/{sub}/{model}`                                                                                                                        |
| **CLIProxyAPI** | Binario de una versión de GitHub (`cliproxy`) |         8317          | Adaptador de proxy local para los flujos de autenticación de la CLI de Anthropic. Proporciona enrutamiento de respaldo cuando caducan los tokens de OAuth                                                                                  |
| **Mux**         | `mux` (`mux server` sin interfaz gráfica)     |         8322          | Demonio local de orquestación de agentes (coder/mux). Solo se gestiona su ciclo de vida; no es un destino de enrutamiento (no actúa como proxy de LLM).                                                                                    |
| **Bifrost**     | `@maximhq/bifrost`                            |         8080          | Backend de retransmisión de la puerta de enlace de IA en Go. Cuando está en ejecución, la ruta de retransmisión (`/v1/relay/`) lo selecciona automáticamente                                                                               |
| **Dario**       | `@askalf/dario`                               |         3456          | Proxy de suscripción de Claude: alternativa o conmutación por error de CLIProxyAPI para el tráfico con formato de Claude Code; la clave inyectada se convierte en `DARIO_ADMIN_TOKEN`, que protege su plano de control de OAuth `/admin/*` |
| **open-wa**     | `@open-wa/wa-automate`                        |         8323          | Automatización de WhatsApp Web (Chromium sin interfaz gráfica mediante Puppeteer). Solo se gestiona su ciclo de vida; no es un destino de enrutamiento.                                                                                    |

Los seis siguen el mismo modelo de supervisión:

- OmniRoute los instala en `DATA_DIR/services/{name}/` (aislados del propio `package.json` de OmniRoute)
- OmniRoute los inicia y supervisa como procesos secundarios
- OmniRoute inyecta una clave de API efímera en el entorno del proceso secundario y la rota sin tiempo de inactividad (cuando corresponde)
- Todas las rutas de administración (`/api/services/*`) son **SOLO_LOCALES** — accesibles únicamente desde la interfaz de bucle invertido (regla estricta n.º 17)

### Decisiones clave (del plan de diseño)

| Decisión                                         | Valor                                                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Acceso del panel a la interfaz nativa de 9Router | Proxy inverso en `/dashboard/providers/services/9router/embed/*`                                    |
| Mecanismo de instalación                         | `npm install {package}` mediante `execFile` (sin interpolación del shell)                           |
| Modo de consumo                                  | Proveedor registrado como `9router/{sub}/{model}` en el motor de enrutamiento                       |
| Gestión de claves de API                         | OmniRoute las genera, las cifra en reposo (AES-256-GCM) y las inyecta mediante variables de entorno |
| Ubicación en el panel                            | `/dashboard/providers/services` (tres pestañas)                                                     |
| Inicio automático                                | Opción por servicio, desactivada de forma predeterminada                                            |

---

## 2. Arquitectura — 4 capas

```
┌────────────────────────────────────────────────────────────────────┐
│  Capa 1 — IU                                                       │
│  /dashboard/providers/services  (pestañas: CLIProxyAPI | 9Router | Mux)│
│  Registros en vivo (SSE), Iniciar/Detener/Reiniciar/Actualizar, Configuración, Instalar│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Contenedor + enrutamiento de pestañas mediante ?tab=│
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (fetch de Next.js)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Capa 2 — API (LOCAL_ONLY — solo loopback)                         │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (proxy HTTP inverso + WebSocket → servidor de origen 9Router)   │
│                                                                    │
│  Control: LOCAL_ONLY_API_PREFIXES incluye "/api/services/" y       │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ llamadas dentro del proceso
┌──────────────────────▼─────────────────────────────────────────────┐
│  Capa 3 — ServiceSupervisor (src/lib/services/)                    │
│                                                                    │
│  ServiceSupervisor.ts   Supervisor genérico (child_process.spawn)  │
│    ├── instalar:   execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── iniciar:    spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── puerto:     20130 para 9Router (configurable)               │
│    ├── registros:  búfer circular de stdio de 5 MB → eventos SSE  │
│    ├── salud:      HTTP GET /health cada 2–5 s, recuperación diferida│
│    └── ciclo de vida: SIGTERM 15 s → SIGKILL                       │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Inicializa todos los SERVICES[] al arrancar el proceso│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       GET /v1/models periódico → tabla service_models│
│  ringBuffer.ts      Búfer circular de registros (5 MB por servicio)│
│  healthCheck.ts     Sondeo HTTP periódico del estado               │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (adaptadores de instalación)                  │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP compatible con OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Capa 4 — Proveedor / Enrutamiento                                 │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Vuelve a consultar el puerto y la clave API en cada solicitud (sin caché).│
│    Elimina el prefijo "9router/" del id. del modelo antes de redirigir.│
│    Devuelve 503 service_not_running si el supervisor no está en "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entrada para "9router": isEmbeddedService: true                 │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modelos almacenados como "9router/{sub}/{model}" (con prefijo). │
│    Sincronizados cada 5 min por modelSync.ts.                      │
│                                                                    │
│  Mux SOLO gestiona el ciclo de vida (capas 1-3): es un demonio de  │
│  orquestación de agentes, no un proxy de LLM, por lo que no tiene  │
│  ejecutor ni entrada de proveedor en la capa 4 y nunca es un       │
│  destino de enrutamiento.                                         │
└────────────────────────────────────────────────────────────────────┘
```

### Archivos de código fuente clave

| Archivo                                     | Función                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Clase principal: ciclo de vida, bloqueo, estado, búfer circular        |
| `src/lib/services/bootstrap.ts`             | Registro a nivel de proceso e inicio automático                        |
| `src/lib/services/registry.ts`              | Mapa singleton `tool → supervisor`                                     |
| `src/lib/services/apiKey.ts`                | Generación de claves y cifrado AES-256-GCM en reposo                   |
| `src/lib/services/modelSync.ts`             | Sincronización periódica de modelos (5 min) y bajo demanda             |
| `src/lib/services/ringBuffer.ts`            | Búfer circular de registros de 5 MB con suscripción SSE                |
| `src/lib/services/healthCheck.ts`           | Sondeo de estado HTTP (intervalo configurable)                         |
| `src/lib/services/installers/ninerouter.ts` | Instalación/actualización/desinstalación mediante npm para 9Router     |
| `src/lib/services/installers/cliproxy.ts`   | Instalación/actualización/desinstalación mediante npm para CLIProxyAPI |
| `src/lib/services/installers/mux.ts`        | Instalación/actualización/desinstalación mediante npm para Mux         |
| `src/lib/services/installers/openwa.ts`     | Instalación/actualización/desinstalación mediante npm para open-wa     |
| `src/app/api/services/9router/_lib.ts`      | Función auxiliar `getOrInitSupervisor()`                               |
| `src/app/api/services/[name]/logs/route.ts` | Endpoint compartido de registros SSE                                   |
| `open-sse/executors/ninerouter.ts`          | Ejecutor del proveedor (capa 4)                                        |

---

## 3. Máquina de estados del ciclo de vida

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
         sondeo de estado correcto  │         fallo / SIGTERM    │
                               ┌────▼─────┐ (salida antes de 5 s)│
                               │ running  │──── fallo ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Los estados se almacenan en la tabla `version_manager` de la base de datos (columna `status`) y se reflejan
en el estado en memoria de `ServiceSupervisor`. El estado en memoria es la fuente autoritativa para
un proceso en ejecución; el estado de la base de datos es el respaldo persistente durante el arranque.

### Transiciones de estado

| Desde           | Evento                                           | Hacia                  |
| --------------- | ------------------------------------------------ | ---------------------- |
| `not_installed` | `install()` se completa correctamente            | `stopped`              |
| `stopped`       | se llama a `start()`                             | `starting`             |
| `starting`      | el sondeo de estado devuelve 200                 | `running`              |
| `starting`      | el proceso termina antes de estar en buen estado | `error`                |
| `running`       | se llama a `stop()`                              | `stopping` → `stopped` |
| `running`       | el proceso termina inesperadamente (< 5 s)       | `error` (fallo rápido) |
| `running`       | el proceso termina inesperadamente (> 5 s)       | `error`                |
| `error`         | se llama a `start()`                             | `starting`             |
| cualquiera      | `stop()` mientras está en `stopping`             | sin efecto             |

### Bloqueo de operaciones

`ServiceSupervisor` serializa las operaciones del ciclo de vida mediante un bloqueo de operaciones asíncrono
(`withLock()`). Las llamadas simultáneas a `start()` en el mismo supervisor producen exactamente
un proceso nuevo; el segundo llamante espera y devuelve el estado existente. Esto evita
condiciones de carrera cuando, por ejemplo, el inicio automático y un botón de la interfaz se activan simultáneamente.

---

## 4. Referencia de la API

Todas las rutas bajo `/api/services/` son **LOCAL_ONLY** (solo loopback, regla estricta n.º 17).
Las solicitudes que no provengan de loopback reciben `403 LOCAL_ONLY`, independientemente del token de autenticación.

### 4.1 Endpoints de 9Router (11 rutas)

#### `POST /api/services/9router/install`

Instala 9Router desde npm. Crea `DATA_DIR/services/9router/` con sus propios
`package.json` y `node_modules/`. No entra en conflicto con las dependencias de OmniRoute.

**Cuerpo de la solicitud** (todo opcional):

```json
{ "version": "latest" }
```

| Campo     | Tipo     | Valor predeterminado | Descripción                                      |
| --------- | -------- | -------------------- | ------------------------------------------------ |
| `version` | `string` | `"latest"`           | Etiqueta de versión de npm o semver que instalar |

**Respuestas:**

| Estado | Descripción                                                                       |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                            |
| `400`  | Cuerpo de solicitud no válido (fallo de validación de Zod)                        |
| `409`  | Instalación ya en curso (bloqueo adquirido)                                       |
| `500`  | Falló la instalación de npm; consulte `message` para obtener un error descriptivo |

**Notas:** Usa `execFile('npm', [...])`: sin shell ni interpolación (regla estricta n.º 13).
Los errores EACCES se presentan como mensajes descriptivos.

---

#### `POST /api/services/9router/start`

Inicia 9Router. Registra un supervisor si aún no está registrado y, a continuación, llama a
`supervisor.start()`. Es idempotente si ya está en ejecución.

**Cuerpo de la solicitud:** ninguno

**Respuestas:**

| Estado | Descripción                                               |
| ------ | --------------------------------------------------------- |
| `200`  | Objeto `ServiceStatus` (consulte el esquema siguiente)    |
| `409`  | 9Router no está instalado (`status: "not_installed"`)     |
| `503`  | Falló el inicio (error del proceso; consulte `lastError`) |

**Esquema de ServiceStatus:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Detiene 9Router de forma controlada. Envía SIGTERM, espera 15 s y, si sigue activo,
envía SIGKILL. Es idempotente si ya está detenido.

**Cuerpo de la solicitud:** ninguno

**Respuestas:**

| Estado | Descripción                        |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | La detención falló inesperadamente |

---

#### `POST /api/services/9router/restart`

Equivale a ejecutar `stop()` y luego `start()` bajo el bloqueo de operación.

**Cuerpo de la solicitud:** ninguno

**Respuestas:** las mismas que para `start` (devuelve el `ServiceStatus` final).

---

#### `POST /api/services/9router/update`

Actualiza 9Router a una versión más reciente de npm. Si el servicio está en ejecución,
primero se detiene, se ejecuta la instalación de npm (instalando la versión más reciente
en la misma ubicación) y, a continuación, se reinicia el servicio.

**Cuerpo de la solicitud** (todo opcional):

```json
{ "version": "latest" }
```

**Respuestas:**

| Estado | Descripción                                                     |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Cuerpo no válido                                                |
| `500`  | Falló la actualización de npm                                   |

---

#### `POST /api/services/9router/rotate-key`

Genera una nueva clave de API para 9Router, la cifra en reposo y reinicia el servicio
(si está en ejecución) para que obtenga la nueva clave de su entorno. La clave anterior
se invalida inmediatamente.

**Cuerpo de la solicitud:** ninguno

**Respuestas:**

| Estado | Descripción                                |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Falló la rotación                          |

**Seguridad:** La nueva clave nunca se devuelve en la respuesta (no se filtran credenciales).
Se almacena cifrada (AES-256-GCM) en la tabla `version_manager`.

---

#### `GET /api/services/9router/status`

Devuelve el estado combinado en vivo y de la base de datos, incluidos los metadatos de
versión y una vista previa de la clave de API.

**Respuestas:**

| Estado | Descripción                   |
| ------ | ----------------------------- |
| `200`  | Consulte el esquema siguiente |
| `500`  | Falló la lectura del estado   |

**Esquema de respuesta:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Alterna el indicador de inicio automático. Cuando `enabled: true`, el servicio se inicia
automáticamente la próxima vez que OmniRoute arranque (si el servicio está instalado).

**Cuerpo de la solicitud:**

```json
{ "enabled": true }
```

**Respuestas:**

| Estado | Descripción           |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Cuerpo no válido      |

---

#### `GET /api/services/9router/logs`

Flujo SSE de registros en vivo procedentes del búfer circular de stdout/stderr de 9Router.

**Parámetros de consulta:**

| Parámetro | Tipo      | Valor predeterminado | Descripción                                                                                      |
| --------- | --------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| `tail`    | `integer` | 200                  | Número de líneas históricas que enviar primero (máximo de 1000)                                  |
| `filter`  | `string`  | ninguno              | Filtro de subcadena que no distingue mayúsculas de minúsculas (sin regex; seguro frente a ReDoS) |

**Eventos SSE:**

| Evento      | Datos       | Descripción                  |
| ----------- | ----------- | ---------------------------- |
| `snapshot`  | `LogLine[]` | Segmento histórico inicial   |
| `log`       | `LogLine`   | Línea de registro en vivo    |
| `heartbeat` | `{}`        | Señal de actividad cada 15 s |

**Esquema de LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Respuestas:**

| Estado | Descripción                                           |
| ------ | ----------------------------------------------------- |
| `200`  | `text/event-stream`                                   |
| `400`  | Parámetro `filter` demasiado largo (> 200 caracteres) |
| `404`  | Servicio no encontrado (supervisor no registrado)     |

---

### 4.2 Endpoints de CLIProxyAPI (10 rutas)

CLIProxyAPI tiene la misma estructura de endpoints que 9Router, excepto `rotate-key`, e incluye además
`accounts`, `provider-expose` y `auto-restart-adopted`. Ahora recibe una
clave de API dedicada para el plano de datos, inyectada al iniciarse (`needsApiKey: true` en
`bootstrap.ts`, utilizada para la sincronización de modelos); `status` incluye menos campos.

| Método | Ruta                                | Descripción                               |
| ------ | ----------------------------------- | ----------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Instalar CLIProxyAPI desde npm            |
| `POST` | `/api/services/cliproxy/start`      | Iniciar CLIProxyAPI                       |
| `POST` | `/api/services/cliproxy/stop`       | Detener CLIProxyAPI                       |
| `POST` | `/api/services/cliproxy/restart`    | Reiniciar CLIProxyAPI                     |
| `POST` | `/api/services/cliproxy/update`     | Actualizar a una versión más reciente     |
| `GET`  | `/api/services/cliproxy/status`     | Estado en vivo + BD (sin `apiKeyMasked`)  |
| `POST` | `/api/services/cliproxy/auto-start` | Activar o desactivar el inicio automático |

El endpoint compartido `GET /api/services/{name}/logs` (véase §4.1) funciona para los
cuatro servicios mediante el segmento dinámico `[name]`.

---

### 4.3 Endpoints de Mux (8 rutas)

Mux tiene la misma estructura de endpoints que CLIProxyAPI: no hay una ruta `rotate-key` en la
superficie de la API (el token de portador se genera de la misma forma que el de 9Router mediante
`getOrCreateApiKey("mux")` y se inyecta mediante la variable de entorno `MUX_SERVER_AUTH_TOKEN`, pero
todavía no hay un endpoint dedicado para su rotación). Mux solo está gestionado a nivel de ciclo de vida: a diferencia de
9Router, no tiene un ejecutor de capa 4 y nunca se registra como proveedor de enrutamiento.

| Método | Ruta                           | Descripción                                  |
| ------ | ------------------------------ | -------------------------------------------- |
| `POST` | `/api/services/mux/install`    | Instalar Mux desde npm (`npm i mux`)         |
| `POST` | `/api/services/mux/start`      | Iniciar Mux (`mux server`)                   |
| `POST` | `/api/services/mux/stop`       | Detener Mux                                  |
| `POST` | `/api/services/mux/restart`    | Reiniciar Mux                                |
| `POST` | `/api/services/mux/update`     | Actualizar a una versión más reciente de npm |
| `GET`  | `/api/services/mux/status`     | Estado en vivo + BD                          |
| `POST` | `/api/services/mux/auto-start` | Activar o desactivar el inicio automático    |

---

### 4.4 Endpoints de Bifrost (8 rutas)

Bifrost es un backend de retransmisión de puerta de enlace de IA en Go (`@maximhq/bifrost`). Utiliza la misma
estructura de endpoints que CLIProxyAPI (sin `rotate-key`: Bifrost administra sus propias claves de
proveedores en `config.json`, dentro de su `-app-dir`).

| Método | Ruta                               | Descripción                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Instalar Bifrost desde npm (`@maximhq/bifrost`)                            |
| `POST` | `/api/services/bifrost/start`      | Iniciar Bifrost en el puerto 8080 (predeterminado)                         |
| `POST` | `/api/services/bifrost/stop`       | Detener Bifrost                                                            |
| `POST` | `/api/services/bifrost/restart`    | Reiniciar Bifrost                                                          |
| `POST` | `/api/services/bifrost/update`     | Actualizar a una versión más reciente                                      |
| `GET`  | `/api/services/bifrost/status`     | Estado en vivo + BD                                                        |
| `POST` | `/api/services/bifrost/auto-start` | Activar o desactivar el inicio automático                                  |
| `GET`  | `/api/services/bifrost/logs`       | Cola de registros SSE (mediante la ruta dinámica compartida `[name]/logs`) |

**Configuración del enrutamiento:** Cuando `BIFROST_BASE_URL` no está definida y la instancia supervisada de Bifrost
está en ejecución, `getBifrostRoutingConfig()` (en `routingBackend.ts`) utiliza automáticamente
`http://127.0.0.1:{port}` como URL base de retransmisión. La variable de entorno `BIFROST_BASE_URL` explícita
siempre tiene prioridad.

---

### 4.5 Endpoints de Dario (12 rutas)

La misma estructura de ciclo de vida que los demás servicios (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`), además de un plano de control OAuth
protegido mediante token bajo `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (todos protegidos mediante `DARIO_ADMIN_TOKEN`).

### 4.6 Endpoints de open-wa (7 rutas)

open-wa (`@open-wa/wa-automate`) controla una instancia de Chromium sin interfaz gráfica (mediante
Puppeteer) para automatizar WhatsApp Web. Utiliza la misma estructura de endpoints que Mux (todavía sin
una ruta `rotate-key`). Solo está gestionado a nivel de ciclo de vida: no es un destino de enrutamiento
y no tiene ningún ejecutor de capa 4 ni entrada de proveedor.

| Método | Ruta                              | Descripción                                                                                   |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | Instala open-wa desde npm (`@open-wa/wa-automate`)                                            |
| `POST` | `/api/services/openwa/start`      | Inicia open-wa en el puerto 8323 (predeterminado)                                             |
| `POST` | `/api/services/openwa/stop`       | Detiene open-wa                                                                               |
| `POST` | `/api/services/openwa/restart`    | Reinicia open-wa                                                                              |
| `POST` | `/api/services/openwa/update`     | Actualiza a una versión más reciente                                                          |
| `GET`  | `/api/services/openwa/status`     | Estado en vivo + BD                                                                           |
| `POST` | `/api/services/openwa/auto-start` | Activa o desactiva el inicio automático                                                       |
| `GET`  | `/api/services/openwa/logs`       | Seguimiento de registros mediante SSE (a través de la ruta dinámica compartida `[name]/logs`) |

**Clave de API:** se inyecta como `WA_KEY`; la sobrescritura genérica de variables
de entorno de open-wa con el prefijo `WA_*` la asigna a la opción de CLI
`--key`/`-k` (`dist/cli/setup.js::envArgs()`, verificado con el paquete 4.76.0
instalado). Se añade el prefijo `ow_` cuando la genera `generateServiceApiKey()`.
open-wa vuelve a leer la clave desde un encabezado HTTP `key`/`api_key` (no desde
`Authorization: Bearer`); `/api-docs*` está explícitamente exento de la
comprobación (`setupAuthenticationLayer` en `dist/cli/server.js`), por lo que la
sonda de estado no necesita ningún encabezado de autenticación.

**Vinculación:** open-wa no es oficial ni está afiliado a WhatsApp; el número
conectado corre el riesgo de ser bloqueado por los propios mecanismos de
detección de automatización de WhatsApp. En el primer inicio, el código QR de
vinculación se imprime en stdout y se muestra mediante el panel de registros y
el flujo SSE existentes; esta integración aún no dispone de un endpoint
dedicado para la imagen del código QR.

---

### 4.7 Proxy inverso (dashboard integrado de 9Router)

El dashboard integra la interfaz web de 9Router dentro de un iframe mediante un
proxy inverso interno en:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Este proxy:

- Reenvía la solicitud a `http://127.0.0.1:{port}/{path}` (solo loopback)
- Elimina los encabezados entrantes `cookie` y `authorization` (sin filtración de la sesión de OmniRoute)
- Inyecta `Authorization: Bearer {apiKey}` para la autenticación de 9Router
- Elimina `set-cookie`, `content-security-policy`, `x-frame-options` y `cross-origin-*` de la respuesta
- Reescribe las respuestas HTML para inyectar `<base href>` y normalizar las rutas absolutas (`/foo` → `/dashboard/.../embed/foo`)

Las actualizaciones de WebSocket para el dashboard integrado las gestiona un servidor
complementario en un puerto dedicado (consulta `src/lib/services/embedWsProxy.ts`).

**Seguridad:** Las rutas del proxy de integración están clasificadas bajo
`LOCAL_ONLY_API_PREFIXES` y solo son accesibles desde loopback. Un atacante que
obtenga un JWT mediante un túnel de Cloudflare/Ngrok no puede usar el proxy para
acceder a los servicios integrados.

---

## 5. Seguridad

### Aplicación de LOCAL_ONLY (regla estricta #17)

Todas las rutas bajo `/api/services/` y `/dashboard/providers/services/*/embed/` se
clasifican como LOCAL_ONLY en `src/server/authz/routeGuard.ts`. La comprobación de
loopback se ejecuta incondicionalmente antes de cualquier rama de autenticación:

```
la solicitud llega
  → isLocalOnlyPath(path)?
      → no loopback → 403 LOCAL_ONLY (siempre, antes de comprobar la autenticación)
      → loopback    → continúa con la autenticación normal
```

Esto impide que un JWT filtrado (p. ej., a través de un túnel) active `npm install` o
la creación de procesos. Consulta `docs/security/ROUTE_GUARD_TIERS.md` para ver la
matriz completa de niveles.

### Inyección de claves de API

9Router y Mux requieren una clave de API/token bearer para sus propios endpoints HTTP.
OmniRoute:

1. Genera una clave mediante `crypto.randomBytes(32).toString("base64url")` con un
   prefijo específico del servicio (`nr_` para 9Router, `mx_` para Mux).
2. La cifra en reposo mediante AES-256-GCM (el mismo cifrado utilizado para las credenciales de proveedores).
3. La descifra y la inyecta como variable de entorno al crear el proceso:
   `NINEROUTER_API_KEY` para 9Router, `MUX_SERVER_AUTH_TOKEN` para Mux (nunca como opción
   de CLI, de modo que el token nunca aparece en `ps`/listados de procesos).
4. Nunca devuelve la clave en texto sin formato en ninguna respuesta HTTP.

CLIProxyAPI recibe una clave dedicada del plano de datos que se inyecta al crear el proceso
(`needsApiKey: true`, utilizada para la sincronización de modelos con el adaptador).

### Defensa contra SSRF

El proxy HTTP inverso (`/dashboard/.../embed/[...path]`) está configurado de forma fija para reenviar
únicamente a `http://127.0.0.1:{port}`. Nunca sigue redirecciones a destinos que no sean
loopback. La biblioteca `ssrf-req-filter` se utiliza para rechazar cualquier URL ascendente que
se resuelva fuera del intervalo de loopback.

### Seguridad del shell (regla estricta #13)

`npm install` se invoca mediante `execFile('npm', ['install', pkg, '--prefix', dir])`:
sin literales de plantilla, sin shell y sin interpolación de rutas externas en la cadena
del comando. Los valores de tiempo de ejecución (puertos, claves de API) se pasan mediante el objeto `env` del proceso hijo.

### Saneamiento de errores (regla estricta #12)

Todas las respuestas de error de `/api/services/*` pasan por `buildErrorBody()` o
`sanitizeErrorMessage()`. Los valores sin procesar de `err.stack` y `err.message` nunca se devuelven
textualmente al solicitante.

---

## 6. Adición de un nuevo servicio integrado

Sigue estos 8 pasos. Consulta las implementaciones existentes en `src/lib/services/installers/`
y `src/app/api/services/` como referencia canónica.

### Paso 1 — Crear el instalador

Crea `src/lib/services/installers/{name}.ts` siguiendo el modelo de `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // elige un puerto libre

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Utiliza `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` de `installers/utils.ts`;
nunca uses `execSync` ni interpolación de shell.

### Paso 2 — Registrar en el arranque

Añade una entrada `ServiceEntry` al array `SERVICES` de `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false si no se necesita una clave de API
}
```

Amplía `buildSpawnArgsFactory()` para gestionar `cfg.tool === "myservice"`.

#### Contrato conectable de plugins de proveedor (Fase 1, #7333)

`src/lib/services/providerPlugins/` introduce un contrato `ServiceProviderPlugin` que
agrupa los campos `ServiceEntry` del `bootstrap.ts` de un backend y los campos de plantilla
del manifiesto de `serviceBackends.ts` en un solo objeto, en lugar de expresar la estructura
del mismo backend por separado en dos archivos no relacionados. En el momento de redactar
este documento, **solo se ha migrado `9router`**: `bootstrap.ts` deriva su entrada de
`SERVICES[]` de `getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`)
y genera un error de arranque si alguna vez falta el plugin. `cliproxy`, `mux` y `bifrost`
permanecen sin cambios en los literales `SERVICES[]` en línea preexistentes.

`open-sse/config/providerPluginManifest.ts` también incorporó una función auxiliar aditiva
`createServiceBackendManifestEntry(pluginId, template)` que crea una
`ProviderPluginManifestEntry` bien formada a partir de una entrada de
`SERVICE_BACKEND_MANIFEST_TEMPLATE`; **todavía no** está conectada a ninguna ruta activa de
solicitudes (ni `generateProviderPluginManifestFromRegistry()` ni
`/v1/providers/[provider]/models`). Esto queda pendiente para una tarea posterior, una vez
que el contrato se haya validado con un segundo backend.

Se aplaza para PR posteriores, con seguimiento en el issue #7333: migrar `cliproxyapi` mediante
el mismo registro, generalizar `mux`/`bifrost` en la unión `ServiceBackendPluginId`,
incorporar al contrato de plugins el tratamiento especial del enrutamiento de ejecutores
(`open-sse/executors/index.ts`, `open-sse/handlers/chatCore/executorProxy.ts`) y conectar
`createServiceBackendManifestEntry()` a una ruta activa de código de manifiestos/modelos.

### Paso 3 — Añadir la migración y los datos iniciales de la BD

Asegúrate de que el servicio tenga una fila en `version_manager` mediante una migración en
`src/lib/db/migrations/`. La fila debe tener:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Paso 4 — Crear los 7 endpoints de la API

Bajo `src/app/api/services/{name}/`:

```
_lib.ts            función auxiliar getOrInitSupervisor()
install/route.ts   POST — llama a installer.install()
start/route.ts     POST — llama a supervisor.start()
stop/route.ts      POST — llama a supervisor.stop()
restart/route.ts   POST — llama a supervisor.restart()
update/route.ts    POST — llama a installer.update()
status/route.ts    GET  — combina el estado en vivo y el de la BD
auto-start/route.ts POST — alterna el indicador auto_start
```

La ruta compartida `GET /api/services/[name]/logs` ya está conectada; no se necesitan
cambios allí.

Delega todas las respuestas de error mediante `createErrorResponse()` / `buildErrorBody()`.

### Paso 5 — Añadir a LOCAL_ONLY_API_PREFIXES

En `src/server/authz/routeGuard.ts`, verifica que `/api/services/` ya esté incluido.
Si introduces un prefijo nuevo (p. ej., `/api/tools/`), añádelo tanto a
`LOCAL_ONLY_API_PREFIXES` como, si inicia procesos, a `SPAWN_CAPABLE_PREFIXES`.
Añade una prueba en `tests/unit/authz/routeGuard.test.ts`.

### Paso 6 — Añadir la pestaña de la interfaz

Crea `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Reutiliza los componentes compartidos:

- `ServiceStatusCard` — estado en tiempo real + insignia de salud
- `ServiceLifecycleButtons` — Iniciar / Detener / Reiniciar / Actualizar
- `ServiceLogsPanel` — seguimiento de registros mediante SSE (se conecta a `/api/services/{name}/logs`)
- `ApiKeyCard` — mostrar + rotar la clave (si `needsApiKey: true`)

Registra la pestaña en `ServicesPageShell.tsx`.

### Paso 7 — Añadir la entrada del proveedor (si el servicio es un destino de enrutamiento)

Si el servicio integrado expone un endpoint `/v1/chat/completions` compatible con OpenAI:

1. Añade una entrada de proveedor en `src/shared/constants/providers.ts` con `isEmbeddedService: true`.
2. Crea `open-sse/executors/{name}.ts` que extienda `BaseExecutor`. Vuelve a consultar el puerto y
   la clave de API en cada solicitud (nunca los almacenes en caché en el constructor). Devuelve una
   respuesta `503 service_not_running` cuando el estado del supervisor no sea `"running"`.
3. Registra los modelos en `open-sse/config/providerRegistry.ts` con el prefijo del servicio
   (p. ej., `myservice/sub/model`). `modelSync.ts` los mantendrá actualizados.

### Paso 8 — Documentar y probar

1. Actualiza `docs/frameworks/EMBEDDED-SERVICES.md` (este archivo): añade el servicio a la
   tabla de §1 y cualquier endpoint nuevo a §4.
2. Añade pruebas unitarias en `tests/unit/services/` (ciclo de vida, instalador, forma de la API).
3. Añade una prueba de integración en `tests/integration/services/` (condicionada por `RUN_SERVICES_INT=1`).
4. Actualiza `docs/openapi.yaml` con los endpoints nuevos.

---

## 7. Solución de problemas

### El servicio no se inicia

**Síntomas:** El botón de inicio devuelve 503 y el estado permanece en `"error"` o `"starting"`.

**Lista de comprobación:**

1. Compruebe `GET /api/services/{name}/logs` (o el panel de registros del panel de control). Busque
   líneas como `Error: ENOENT`, `address already in use` o `Cannot find module`.
2. Verifique que `npm` esté en PATH: ejecute `which npm` desde la misma cuenta de usuario que ejecuta OmniRoute.
3. Verifique que el servicio esté instalado: compruebe `GET /api/services/{name}/status` para ver
   `installedVersion`. Si es `null`, ejecute primero la instalación.
4. Compruebe que `DATA_DIR/services/{name}/node_modules/` exista y no esté vacío.
5. Compruebe el campo `lastError` de la respuesta de estado para ver el motivo de salida saneado.

---

### El arranque en frío es lento (> 10 s para alcanzar `running`)

**Síntomas:** El estado permanece en `"starting"` durante mucho tiempo antes de cambiar a `"running"` o `"error"`.

**Explicación:** El arranque en frío de 9Router incluye la importación de grandes árboles de dependencias (DNS,
túnel y módulos MITM). El intervalo de comprobación de estado predeterminado es de 2 s, con 3 intentos antes de que el
supervisor declare un tiempo de espera agotado (aunque continúa realizando comprobaciones).

**Solución:** El intervalo `healthIntervalMs` y el tiempo de espera de `waitForHealthy`
(`healthIntervalMs * 3`) se pueden configurar en `bootstrap.ts`. Para servicios con tiempos de
inicio más largos, aumente `healthIntervalMs` a 5000 y `stopTimeoutMs` a 30 000.

---

### Conflicto de puerto (`EADDRINUSE`)

**Síntomas:** Los registros muestran `address already in use :::20130`.

**Causas:**

- Otro proceso ya está utilizando el puerto 20130.
- Un proceso anterior de 9Router no se detuvo por completo (PID zombi).

**Solución:**

1. Cambie el puerto predeterminado mediante la variable de entorno `NINEROUTER_PORT` en `.env`.
2. Busque y termine el proceso en conflicto: `lsof -ti :20130 | xargs kill -9`.
3. El puerto se puede configurar por servicio en `bootstrap.ts` mediante el campo `port`.

**Nota:** 9Router utiliza de forma predeterminada el puerto 20130 específicamente para evitar conflictos con
el puerto predeterminado 20128 de OmniRoute.

---

### Permiso denegado (EACCES) durante la instalación

**Síntomas:** La instalación devuelve 500 y los registros muestran `EACCES` o `permission denied`.

**Causas:**

- `DATA_DIR` o su directorio principal no permite la escritura al proceso de OmniRoute.
- La ejecución se realiza dentro de Docker sin privilegios de root y sin acceso de escritura al volumen asignado.

**Solución:**

1. Compruebe `DATA_DIR` (valor predeterminado: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Asegúrese de que el usuario del proceso de OmniRoute sea el propietario del directorio: `chown -R $USER ~/.omniroute/`
3. En Docker, asegúrese de que el montaje del volumen tenga los permisos correctos para el usuario del contenedor.

---

### La actualización falla (tiempo de espera agotado de `npm install` o error de red)

**Síntomas:** La actualización devuelve 500 con `InstallError` y los registros muestran un tiempo de espera de red agotado.

**Lista de comprobación:**

1. Confirme que el registro de npm sea accesible: `npm ping`.
2. Compruebe si hay un proxy corporativo: `npm config get proxy`, `npm config get https-proxy`.
3. Pruebe la instalación manualmente: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Si se encuentra en un entorno aislado de la red, descargue previamente el archivo tarball y use `npm install /path/to/tarball.tgz`.

---

### El servicio muestra el estado `"error"` inmediatamente después de iniciarse (fallo rápido)

**Síntomas:** El estado cambia de `"starting"` a `"error"` en menos de 5 segundos.
`lastError` muestra `"Fast crash (exited with code 1)"`.

**Lista de comprobación:**

1. Lea las últimas líneas completas del registro: `GET /api/services/{name}/logs?tail=500`.
2. Causa habitual: faltan variables de entorno requeridas por el servicio.
3. Para 9Router: verifique que `NINEROUTER_DISABLE_MITM=true` y
   `NINEROUTER_DISABLE_TUNNEL=true` estén en el entorno proporcionado al crear el proceso (consulte
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Preguntas frecuentes

**P: ¿Puedo exponer los endpoints de los servicios integrados a clientes que no sean de loopback?**

No. El nivel LOCAL_ONLY es intencional (regla estricta n.º 17). Las rutas que pueden ejecutar
`npm install` o generar procesos de `node` no deben ser accesibles desde tráfico que no sea de loopback,
porque, de lo contrario, un JWT filtrado a través de un túnel (Cloudflare, Ngrok, Tailscale)
permitiría generar procesos arbitrarios. No existe ninguna excepción voluntaria para
`/api/services/`; a diferencia de `/api/mcp/`, está excluida de la lista de omisión
del ámbito de administración. Consulte `docs/security/ROUTE_GUARD_TIERS.md`.

---

**P: ¿Estarán disponibles 9Router y CLIProxyAPI en despliegues de producción/en la nube?**

Sí. Ambos servicios siguen el mismo modelo que prioriza la ejecución local que OmniRoute. Se ejecutan
en la misma máquina y se comunican mediante loopback. Aquí, «producción» se refiere al VPS
o servidor local donde se despliega OmniRoute, no a un proveedor remoto de servicios en la nube.

---

**P: ¿Cómo depuro el supervisor?**

1. Siga el flujo de registros SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Compruebe los registros estructurados en la salida de pino de OmniRoute filtrados por el
   espacio de nombres `service:supervisor`.
3. Inspeccione la fila de la base de datos: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Use `GET /api/services/9router/status` para ver en una sola llamada el estado actual en tiempo real, el PID, la salud
   y `lastError`.

---

**P: El supervisor muestra `health: "degraded"` o `health: "unknown"`, pero el estado es `"running"`. ¿Es un problema?**

`"degraded"` significa que la sonda de salud devolvió una respuesta distinta de 200. `"unknown"` significa que todavía no
se ha completado ninguna sonda (condición de carrera con la primera consulta). Ambos estados son transitorios durante el arranque.
Si la salud permanece en `"degraded"` durante más de `healthIntervalMs * 3` ms después de
`"running"`, el servicio integrado está ejecutándose, pero su API HTTP no responde. Compruebe
si el puerto indicado en la respuesta de estado es correcto y si el servicio realmente
está escuchando en ese puerto.

---

**P: ¿Puedo cambiar la clave de la API de 9Router sin reiniciarlo por completo?**

No. La clave de la API se proporciona a 9Router mediante una variable de entorno en el momento de generar el proceso.
Las variables de entorno no pueden modificarse en un proceso en ejecución. `POST .../rotate-key`
detiene y reinicia automáticamente el servicio para aplicar la nueva clave. La rotación de la clave
surte efecto dentro del valor `stopTimeoutMs` del servicio (15 s de forma predeterminada), más su tiempo
de arranque.

---

**P: ¿Cuál es el límite del búfer circular y qué ocurre cuando se llena?**

Cada servicio tiene un búfer circular dedicado de 5 MB. Cuando el búfer se llena, se eliminan las líneas
de registro más antiguas para dejar espacio a las nuevas. El evento SSE `snapshot` devuelve
las líneas más recientes dentro del límite de `tail`. Los registros no se guardan en el disco a menos que
`logsBufferPath` esté establecido en la fila de la base de datos.

---

## Véase también

- `docs/security/ROUTE_GUARD_TIERS.md` — detalles del nivel LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 Asignación del módulo de servicios integrados
- `docs/architecture/ARCHITECTURE.md` — contexto a nivel del sistema
- `docs/openapi.yaml` — definiciones de endpoints legibles por máquina
- `CLAUDE.md` §"Adding a New Embedded Service" — lista de comprobación de referencia rápida
