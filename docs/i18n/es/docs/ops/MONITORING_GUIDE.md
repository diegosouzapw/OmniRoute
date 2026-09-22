# Monitoring & Observability Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute incluye monitorización de estado integrada, piloto automático de proveedores, seguimiento de cuotas y hooks de observabilidad. Esta guía abarca el panel, las alertas y la resolución de problemas.

**Fuentes:**

- `src/lib/monitoring/observability.ts` — instantánea de observabilidad
- `src/lib/monitoring/comboHealthAutopilot.ts` — piloto automático de estado de combos
- `src/lib/monitoring/providerHealthAutopilot.ts` — piloto automático de proveedores
- `src/lib/monitoring/providerHealthMatrix.ts` — matriz de estado de proveedores
- `src/lib/localHealthCheck.ts` — comprobación de estado local
- `src/lib/tokenHealthCheck.ts` — estado de renovación de tokens
- `src/lib/proxyHealth.ts` — caché de estado del proxy (tratada en PROXY_GUIDE.md)

---

## Descripción general

OmniRoute tiene **3 capas de monitorización**:

```
┌──────────────────────────────────────────────────────────────┐
│  Capa 1: Estado del sistema (nivel de servidor)               │
│  ├─ localHealthCheck.ts — BD, puertos, deps. nativas          │
│  ├─ db/healthCheck.ts — integridad, FK, artefactos huérfanos  │
│  └─ Panel: /dashboard/health                                  │
├──────────────────────────────────────────────────────────────┤
│  Capa 2: Estado de proveedores (resiliencia por proveedor)    │
│  ├─ providerHealthAutopilot.ts — disyuntor, enfriamientos     │
│  ├─ providerHealthMatrix.ts — puntuaciones por proveedor/modelo│
│  └─ Panel: /dashboard/providers                               │
├──────────────────────────────────────────────────────────────┤
│  Capa 3: Observabilidad en vivo (instantáneas de ejecución)   │
│  ├─ observability.ts — disyuntores, sesiones, cuota           │
│  ├─ tokenHealthCheck.ts — estado de renovación de tokens OAuth│
│  └─ Herramientas MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Páginas del panel

### `/dashboard/health` (Estado del sistema)

El panel de estado de nivel superior muestra:

| Sección                    | Qué muestra                                                |
| -------------------------- | ---------------------------------------------------------- |
| **Estado del servidor**    | Tiempo activo, versión, puerto, conexiones activas         |
| **Base de datos**          | Conexión, integridad, tamaño de WAL, migraciones recientes |
| **Resumen de proveedores** | Cantidad de activos, saludables y disyuntores abiertos     |
| **Monitores de cuota**     | Sesiones activas, en alerta y agotadas                     |
| **Errores recientes**      | Últimos 10 errores con trazas de pila                      |
| **Uso de recursos**        | Memoria, CPU, indicador de presión del heap                |

### `/dashboard/providers` (Estado de proveedores)

Panel por proveedor:

| Columna    | Descripción                                                     |
| ---------- | --------------------------------------------------------------- |
| Proveedor  | ID del proveedor + nombre para mostrar                          |
| Estado     | Estado verde/amarillo/rojo                                      |
| Circuito   | Estado abierto/cerrado/semiabierto                              |
| Conexiones | Número de conexiones, última actualización                      |
| Modelos    | Modelos disponibles, estado por modelo                          |
| Coste      | Coste de hoy, tendencia de 7 días                               |
| Errores    | Número de errores en las últimas 24 h, clase principal de error |

Haz clic en un proveedor para ver:

- Solicitudes recientes con desglose de latencia
- Puntuaciones de estado por conexión
- Bloqueos por modelo
- Recomendaciones del piloto automático

### `/dashboard/quota` (Seguimiento de cuotas)

Para cada clave de API:

- Uso actual frente al límite (barra de progreso)
- Tendencia de la cuota (gráfico de 30 días)
- Hora del próximo restablecimiento
- Historial de alertas

### `/dashboard/combos` (Estado de combos)

Por combo:

- Estrategia + destinos
- Estado por destino
- Eventos recientes de respaldo
- Tasa de éxito (24 h, 7 d, 30 d)

---

## API de comprobación de estado

OmniRoute expone **dos** superficies HTTP de comprobación de estado. No son intercambiables para los orquestadores.

| Ruta                         | Propósito                                                                             | Coste                                        | Uso                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `GET /healthz`               | Disponibilidad/actividad del ciclo de vida (`ok` / `starting` / `stopping`)           | Trivial (solo indicador de fase)             | **Disponibilidad** en Kubernetes; **actividad** flexible si debe usar HTTP                   |
| `GET /api/monitoring/health` | Resumen detallado del sistema y los proveedores (BD, heap, recuentos del catálogo, …) | Alto (trabajo síncrono de BD/monitorización) | Paneles, comprobaciones profundas de caja negra y comprobación de estado integrada de Docker |

> **Nota:** Las matrices de estado de proveedores, los problemas del piloto automático, los monitores de cuotas, el estado de los tokens y los detalles de latencia más allá de `/api/monitoring/health` están disponibles mediante la **herramienta MCP** `observability_snapshot` o las páginas del **panel**; no hay rutas REST específicas para ellos.

Ambas rutas se ejecutan en el **mismo bucle de eventos de Node** que gestiona las solicitudes. Una ruta que haga un uso intensivo de la CPU (procesamiento de un catálogo grande mediante `GET /v1/models`, compresión de contextos largos o recuento de tokens) puede retrasar **todos** los controladores HTTP, incluido `/healthz`. Un bucle de eventos ocupado ≠ un proceso inactivo. Es preferible corregir el proceso que acapara los recursos; ajustar las sondas solo reduce las finalizaciones erróneas.

### Sonda ligera para orquestadores

```bash
GET /healthz
# o HEAD /healthz
```

- **200** + cuerpo `ok` cuando la fase del ciclo de vida del servidor está lista
- **503** + `starting` / `stopping` durante el arranque o el apagado
- Implementación: `src/app/healthz/route.ts` (sin ping a la BD)

### Estado del sistema (detallado)

```bash
GET /api/monitoring/health
```

Respuesta:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: caché de sondas frente a `test_status` de SQLite

`GET /api/monitoring/health` → `credentialHealth` es el **indicador de la caché de sondas
en memoria**, no un volcado en tiempo real de `provider_connections.test_status`. Después de #12532, la
ruta de solicitudes solo lee `getCachedCredentialHealthSummary()`; las sondas en segundo plano
actualizan la caché fuera del bucle de eventos.

| Capa                            | Ubicación                                                             | Significado                                                                                                                                                                                                                   |
| ------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Indicador de la caché de sondas | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Últimos resultados de las sondas de estado de las credenciales que aún se conservan en la memoria del proceso. `source` siempre es `probe-cache`.                                                                             |
| Detalle de conexiones fallidas  | `credentialHealth.failedConnections`                                  | Presente **solo cuando `failed > 0`**. Lista acotada de filas de la caché con `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` saneados). `failedOmitted` se establece cuando la lista se ha limitado. |
| Estado persistente de SQLite    | `credentialHealth.staleDbNonOkCount`                                  | Recuento de filas de conexión **activas** (`is_active=1`) cuyo `test_status` persistido tiene un valor conocido distinto de correcto (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).       |

Las dos capas pueden diferir intencionadamente:

- Indicador `failed=0` mientras `staleDbNonOkCount>0`: SQLite aún tiene un
  `test_status` persistente (por ejemplo, `expired` o `credits_exhausted`) que la instantánea
  más reciente de la caché de sondas no contabiliza como `status=error`.
- Indicador `failed>0` mientras SQLite parece estar en buen estado: una sonda reciente falló y el
  resultado está almacenado en caché; la fila de la BD no se ha actualizado o se borró posteriormente.

No genere alertas basándose únicamente en `provider_connections.test_status` al consultar este
endpoint. Use `failed` + `failedConnections` para los fallos de sondas en tiempo real y
`staleDbNonOkCount` cuando necesite el recuento persistente de estados retenidos.

### Recomendaciones para las sondas de Kubernetes

OmniRoute es un **único proceso de Node** (un solo bucle de eventos). El `HEALTHCHECK` estándar de Docker utiliza el ligero `/healthz`. `/api/monitoring/health` es **demasiado pesado** para los intervalos de actividad de kubelet.

| Sonda                 | Objetivo recomendado                                                                               | Notas                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inicio**            | HTTP `GET /healthz` con un `failureThreshold` alto (o un `startPeriod` amplio)                     | El arranque en frío y la migración de SQLite pueden tardar más de unos segundos                                                                                                                                                                                                                                                                                                                                             |
| **Disponibilidad**    | HTTP `GET /healthz`                                                                                | Ciclo de vida `ok` / `starting` / `stopping` (200 frente a 503). Aun así, oscila si el bucle está bloqueado por la CPU. **Un 200 después de varios segundos no indica un estado saludable** (#10303): significa que el bucle de eventos estuvo saturado antes de que se ejecutara el manejador de 3 bytes                                                                                                                   |
| **Supervivencia**     | HTTP `GET /livez`, **o TCP** en el puerto principal del servicio (`PORT`, predeterminado: `20128`) | `/livez` solo indica que el proceso está activo (siempre devuelve 200 si se ejecuta el manejador). Sigue compartiendo el bucle de eventos: ocupado ≠ inactivo, y no detecta la saturación del bucle de eventos (#10303) mejor que TCP. Prefiera **TCP** si las sondas HTTP agotan el tiempo de espera bajo carga de catálogo/compresión; en cualquier caso, **no** finalice el pod por bloqueos breves del bucle de eventos |
| **Estado exhaustivo** | `GET /api/monitoring/health` desde un verificador externo                                          | No debe usarse para `livenessProbe` de kubelet ni para una `readinessProbe` con intervalos estrictos                                                                                                                                                                                                                                                                                                                        |

Ejemplo de configuración (ajuste los umbrales a la carga de arranque en frío y de compresión):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Si el bucle de eventos se bloquea, HTTP /livez aún puede agotar el tiempo de espera. TCP es la
  # alternativa conservadora:
  # tcpSocket:
  #   port: http
```

**No** dirija la sonda de **supervivencia** de kubelet a `/api/monitoring/health`. Esa ruta realiza trabajo real de base de datos/monitorización y producirá falsos positivos bajo carga.

Relacionado: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sondas mientras el bucle de eventos está ocupado), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (acaparamiento de recursos por el cálculo de precios del catálogo), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (acaparamiento de recursos por el recuento de tokens de compresión).

### Trabajo opcional en la ruta de solicitudes (memoria, habilidades, renovación de tokens)

La extracción de memoria, la inyección de habilidades y la renovación de tokens OAuth comparten el **bucle de eventos principal de Node** con `/healthz`. Son funciones que se activan o desactivan desde el panel (`memoryEnabled`, `skillsEnabled`), no un grupo de procesos de trabajo. Consulte [Entorno — coste del bucle de eventos](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Estado de los proveedores

> **No hay ningún endpoint REST.** Los datos de estado de los proveedores están disponibles mediante la herramienta MCP `observability_snapshot` o la página `/dashboard/providers` del panel.

### Detalles del proveedor

> **No hay ningún endpoint REST.** Los detalles de cada proveedor están disponibles en la página `/dashboard/providers` del panel.

---

## Piloto automático de estado de proveedores

El módulo `providerHealthAutopilot.ts` es un **sistema de autorrecuperación** que:

1. Detecta problemas de los proveedores (circuitos abiertos, periodos de espera, bloqueos y advertencias de cuota)
2. Genera **acciones recomendadas** para resolverlos
3. Opcionalmente, **ejecuta automáticamente** acciones de bajo riesgo

### Tipos de problemas detectados

| Tipo de problema             | Gravedad    | Condición de ejemplo                                 |
| ---------------------------- | ----------- | ---------------------------------------------------- |
| `provider_circuit_open`      | crítica     | Circuito abierto después de 5 fallos                 |
| `provider_circuit_half_open` | advertencia | Circuito probando su recuperación                    |
| `connection_cooldown`        | advertencia | Conexión en espera después de un error 429           |
| `stale_connection_error`     | advertencia | La última actualización falló hace más de 30 minutos |
| `terminal_connection_error`  | crítica     | OAuth revocado, clave no válida                      |
| `inactive_connection`        | informativa | Conexión deshabilitada en la configuración           |
| `model_lockout`              | advertencia | Modelo específico en cuarentena                      |
| `quota_monitor_warning`      | advertencia | Uso de la cuota igual o superior al 80 %             |

### Tipos de acciones generadas

| Acción                         | Riesgo | Descripción                                   |
| ------------------------------ | ------ | --------------------------------------------- |
| `clear_provider_breaker`       | medio  | Restablecer el disyuntor al estado cerrado    |
| `clear_connection_cooldown`    | bajo   | Eliminar el periodo de espera de una conexión |
| `clear_stale_connection_error` | bajo   | Borrar el indicador de error obsoleto         |
| `clear_model_lockout`          | bajo   | Volver a habilitar un modelo en cuarentena    |
| `reactivate_connection`        | medio  | Volver a habilitar una conexión desactivada   |
| `deactivate_connection`        | alto   | Deshabilitar una conexión problemática        |

### API

> **No existe ningún endpoint REST.** Los problemas del piloto automático están disponibles mediante la herramienta MCP `observability_snapshot` o el panel de control. El piloto automático se ejecuta internamente; su comportamiento se configura mediante la base de datos de configuración (campo `autopilotMode` de cada conexión), no mediante variables de entorno; ejecutar `grep -rn` para buscar una variable de entorno del modo de piloto automático no devuelve ninguna coincidencia.

### Modo del piloto automático

De forma predeterminada, el piloto automático funciona en **modo manual**: detecta problemas y genera acciones recomendadas, pero no las aplica automáticamente. Las acciones pueden aplicarse desde el panel de control.

---

## Piloto automático de estado de combinaciones

`comboHealthAutopilot.ts` es el equivalente **específico para combinaciones** del piloto automático de proveedores. Este:

- Detecta combinaciones con problemas
- Recomienda reordenar los destinos
- Sugiere deshabilitar los destinos defectuosos
- Elimina automáticamente los destinos inactivos después de N fallos

### Ejemplos de problemas de combinaciones

```
Combinación "always-on" (estrategia de prioridad)
├─ Destino 1: openai/gpt-5 (en buen estado)
├─ Destino 2: anthropic/claude-opus-4-6 (⚠️ modelo bloqueado hasta las 14:00)
└─ Destino 3: kiro/claude-sonnet-4-5 (en buen estado)

Acción recomendada: Reordenar — mover kiro por encima de anthropic hasta que venza el bloqueo
```

---

## Monitores de cuota

`observability.ts` expone **monitores de cuota por sesión** para proveedores de suscripción (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Significado de los estados

| Estado      | Cuándo                           | Acción de la interfaz de usuario            |
| ----------- | -------------------------------- | ------------------------------------------- |
| `starting`  | Sondeo inicial en curso          | Indicador de carga                          |
| `idle`      | Sin actividad reciente           | Oculto en el panel de control               |
| `healthy`   | Más del 50 % de cuota restante   | Punto verde                                 |
| `warning`   | Menos del 50 % de cuota restante | Alerta amarilla                             |
| `exhausted` | Cuota = 0 %                      | Bloque rojo, enrutar al siguiente proveedor |
| `error`     | El sondeo ha fallado             | Punto rojo, reintentar pronto               |

### API

> **No existe ningún endpoint REST.** Los datos del monitor de cuota están disponibles mediante la herramienta MCP `observability_snapshot` o el panel de control.

---

## Instantánea de observabilidad

La herramienta MCP `observability_snapshot` devuelve una **instantánea completa del sistema** para los agentes de IA:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* véase arriba */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Los agentes utilizan esta información para tomar **decisiones de enrutamiento**; por ejemplo, «si el circuito de openai está abierto, enrutar primero a anthropic».

---

## Comprobación del estado de los tokens

Los proveedores de OAuth (Claude Code, GitHub Copilot, Cursor) necesitan una **actualización periódica de los tokens**. `src/lib/tokenHealthCheck.ts` ejecuta un programador en segundo plano:

- **Ciclo de revisión**: cada 60 segundos (revisión en `TICK_MS = 60 * 1000` en `src/lib/tokenHealthCheck.ts:30`)
- **Intervalo de comprobación del estado por conexión**: 60 minutos de forma predeterminada (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configurable mediante la base de datos de ajustes
- **Actualización preventiva tras un error 401**: gestionada por el interceptor de cada conexión

### Estado de los tokens

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Configuración

La configuración de la comprobación del estado de los tokens se gestiona internamente mediante `tokenHealthCheck.ts`.

### Estado de los tokens

> **No hay ningún endpoint REST.** Los datos sobre el estado de los tokens están disponibles mediante el panel de control o la herramienta MCP `observability_snapshot`.

---

## Alertas

### Canales integrados

OmniRoute admite **3 canales de alerta**:

| Canal            | Configuración  | Caso de uso                             |
| ---------------- | -------------- | --------------------------------------- |
| Banner del panel | Siempre activo | Notificaciones en la aplicación         |
| Webhook          | Configurar URL | Slack, Discord, PagerDuty               |
| Registro         | Predeterminado | Para la agregación externa de registros |

### Configuración de webhooks

> **Nota:** La configuración de las alertas mediante webhooks se gestiona desde la página de Ajustes del panel de control. Consulte la interfaz de Ajustes para configurar la URL del webhook, el filtrado de eventos y la personalización de la carga útil.

### Tipos de alerta

| Alerta                       | Cuándo                                        | Gravedad predeterminada |
| ---------------------------- | --------------------------------------------- | ----------------------- |
| `provider_circuit_open`      | Se abre el circuito                           | crítica                 |
| `provider_circuit_half_open` | El circuito está probando la recuperación     | informativa             |
| `quota_warning`              | La cuota alcanza el 80 % o más                | advertencia             |
| `quota_exhausted`            | La cuota alcanza el 100 %                     | crítica                 |
| `token_refresh_failed`       | 3 o más fallos de actualización consecutivos  | advertencia             |
| `token_expired`              | El token ha superado su fecha de vencimiento  | crítica                 |
| `combo_target_unhealthy`     | El destino combinado lleva 1 h o más en pausa | advertencia             |
| `db_integrity_warning`       | Infracciones de FK > 0                        | advertencia             |
| `heap_pressure`              | Uso del heap > 80 % del umbral                | advertencia             |

---

## Métricas de rendimiento

### Métricas monitorizadas

| Métrica                 | Tipo       | Fuente                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | contador   | `services/usage.ts`             |
| `request_latency_ms`    | histograma | `services/usage.ts`             |
| `tokens_consumed`       | contador   | `services/usage.ts`             |
| `cost_usd`              | contador   | `services/usage.ts`             |
| `provider_errors`       | contador   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | contador   | `services/resilience.ts`        |
| `cache_hits`            | contador   | `services/signatureCache.ts`    |
| `compression_savings`   | histograma | `services/compression/stats.ts` |
| `quota_used`            | indicador  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | indicador  | `observability.ts`              |

### Percentiles de latencia (p50/p95/p99)

> **No hay ningún endpoint REST.** Los datos de percentiles de latencia están disponibles en la página `/dashboard/health` del panel. La exportación a Prometheus/OpenTelemetry está prevista para v3.9.

### Exportación a Prometheus / OpenTelemetry (fase 2)

Prevista para v3.9: exportación nativa a Prometheus, OpenTelemetry y Datadog.

Por ahora, consulte `/api/monitoring/health` con cualquier sistema de monitorización basado en HTTP (exportador blackbox de Prometheus, comprobación HTTP de Datadog, etc.).

---

## Recetas de alertas

### Slack

> **Nota:** Las alertas mediante webhook se configuran desde la página de Configuración del panel; no hay variables de entorno dedicadas para webhooks (`grep -rn` no devuelve ninguna coincidencia). Consulte la interfaz de Configuración para definir la URL del webhook, el filtrado de eventos y la personalización de la carga útil.

### Discord

> Las alertas mediante webhook usan el mismo flujo de la interfaz de Configuración que Slack. Discord acepta la misma estructura de carga útil JSON.

### PagerDuty

> Las alertas mediante webhook usan el mismo flujo de la interfaz de Configuración. Las claves de enrutamiento de PagerDuty Events API v2 se configuran en la interfaz de Configuración.

### Webhook personalizado (JSON)

> Funcionará cualquier endpoint HTTP que acepte solicitudes POST con un cuerpo JSON. Configure la URL en la interfaz de Configuración.

---

## Configuración del panel

### Personalizar el panel de estado

Cree un archivo `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fijar un proveedor en la parte superior

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Solución de problemas

### "El proveedor aparece como saludable, pero las solicitudes fallan"

1. Compruebe los **problemas del piloto automático**; puede que un modelo esté bloqueado
2. Consulte los **errores recientes** para ver la clase de error específica
3. Pruebe la **comprobación de conexión** en la tarjeta del proveedor
4. Compruebe si el proveedor está **sujeto a límites de frecuencia en el servicio de origen** (no es visible localmente)

### "La cuota aparece como saludable, pero veo errores 429"

- El código 429 significa que el proveedor indica que ha agotado su cuota
- El seguimiento de cuotas de OmniRoute puede estar **desactualizado**; la información válida es la del proveedor
- Los datos de cuota se actualizan automáticamente mediante el monitor interno de cuotas

### "La combinación falla, pero todos los destinos parecen saludables"

- Compruebe el panel de **estado de las combinaciones** para detectar problemas con el orden de los destinos
- Consulte los **eventos de conmutación por error**; puede que la combinación esté agotando las opciones demasiado rápido
- Verifique que la **estrategia** coincida con su caso de uso (prioridad frente a round-robin frente a automático)

### "La comprobación del estado de la base de datos falla"

- Ejecute `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Si devuelve "ok", es una falsa alarma: la comprobación de estado es demasiado estricta
- Si devuelve cualquier otra cosa, **detenga OmniRoute** y siga la [guía de recuperación ante desastres](./DATABASE_GUIDE.md#disaster-recovery)

### "La presión de memoria del heap es crítica"

```bash
# Comprobar el heap actual
node -e "console.log(process.memoryUsage())"

# Activar la recolección de basura manual (si se usa --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reducir las solicitudes simultáneas (se configura desde la página de Configuración del panel, no mediante una variable de entorno)
# No existe la variable de entorno `MAX_CONCURRENT_REQUESTS`; configúrelo en Configuración → Concurrencia.
```

---

## Véase también

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — seguimiento del uso y los costes
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — esquema de la base de datos + estado
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — estado del proxy (caché independiente)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arquitectura del sistema
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detalles del disyuntor
- Fuente: `src/lib/monitoring/` (4 archivos, 2121 líneas de código)
