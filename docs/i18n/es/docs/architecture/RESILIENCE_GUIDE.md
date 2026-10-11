# Resilience Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute cuenta con tres mecanismos de resiliencia distintos pero relacionados. Cada uno tiene un alcance y propósito diferentes. Manténgalos separados al depurar el comportamiento del enrutamiento.

![Modelo de resiliencia de 3 capas](../diagrams/exported/resilience-3layers.svg)

> Fuente: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Disyuntor del proveedor

**Alcance:** proveedor completo (p. ej., `glm`, `openai`, `anthropic`).

**Propósito:** dejar de enviar tráfico a un proveedor que falla repetidamente en el nivel ascendente o del servicio.

**Implementación:**

- Clase principal: `src/shared/utils/circuitBreaker.ts`
- Integración: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado: `GET /api/monitoring/health`
- API de restablecimiento: `POST /api/resilience/reset`
- Envoltorios: `open-sse/services/accountFallback.ts`
- Tabla de BD: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — se permite el tráfico normal
- `DEGRADED` — el tráfico sigue estando permitido, pero se realiza un seguimiento del aumento de los fallos del proveedor
- `OPEN` — proveedor bloqueado temporalmente; el enrutamiento combinado lo omite
- `HALF_OPEN` — ha transcurrido el tiempo de espera de restablecimiento; se permite una solicitud de prueba

**Valores predeterminados configurables (`open-sse/config/constants.ts`, disponibles en Panel de control → Configuración → Resiliencia):**

| Clase        | Se degrada tras | Se abre tras | Tiempo de espera de restablecimiento |
| ------------ | --------------- | ------------ | ------------------------------------ |
| OAuth        | 5 fallos        | 8 fallos     | 60s                                  |
| Clave de API | 7 fallos        | 12 fallos    | 30s                                  |
| Local        | derivado        | 2 fallos     | 15s                                  |

`degradationThreshold` controla cuándo un proveedor pasa a `DEGRADED`; `failureThreshold` controla cuándo se abre y se omite. Los perfiles de proveedores locales aún no están disponibles en la página de configuración de Resiliencia.

**Códigos de activación:** solo estados de nivel de proveedor `[408, 500, 502, 503, 504]`. NO active el disyuntor por errores de nivel de cuenta (la mayoría de los 401/403/429; estos corresponden al período de enfriamiento o al bloqueo).

**Recuperación diferida:** cuando vence el estado `OPEN`, `getStatus()`, `canExecute()` y `getRetryAfterMs()` actualizan el estado a `HALF_OPEN`. No se necesita ningún temporizador en segundo plano.

---

### Período de enfriamiento global opcional del proveedor (puerta de ventana)

Una cuarta capa **opcional** (`PROVIDER_COOLDOWN_ENABLED`, desactivada de forma predeterminada) mantiene una
memoria entre solicitudes de los proveedores con fallos en
`open-sse/services/providerCooldownTracker.ts`, que se consulta durante la resolución de destinos combinados
para que las solicitudes combinadas consecutivas dejen de volver a recorrer un proveedor que acaba de
fallar. Las entradas de nivel de proveedor respetan la puerta de ventana `PROVIDER_PROFILES`:

| Perfil       | se activa tras (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | se enfría durante (`providerCooldownMs`) |
| ------------ | ------------------------------------------: | ------------------------------------: | ---------------------------------------: |
| OAuth        |                                        `10` |                               `15min` |                                   `5min` |
| Clave de API |                                        `15` |                               `30min` |                                  `10min` |

Por debajo del umbral, el proveedor **no** se considera en enfriamiento; un resultado satisfactorio borra
la ventana. En cambio, las entradas de nivel de conexión (`provider:connectionId`) mantienen el
retroceso exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Anulaciones:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Protección contra regresiones: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Tiempo de espera de la conexión

**Ámbito:** una única conexión/cuenta/clave del proveedor.

**Propósito:** omitir una clave con problemas mientras las demás conexiones del mismo proveedor continúan prestando servicio.

**Implementación:**

- Marcar como no disponible: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selección: `getProviderCredentials*` en el mismo archivo
- Cálculo del tiempo de espera: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configuración: `src/lib/resilience/settings.ts`

**Campos por conexión:**

- `rateLimitedUntil` — marca de tiempo hasta la que dura el tiempo de espera
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de espera exponencial

**Tiempos de espera predeterminados:**

- Base de OAuth: 5 s
- Base de clave de API: 3 s
- 429 de clave de API: prioriza `Retry-After`, las cabeceras de restablecimiento o el texto de restablecimiento interpretable proporcionados por el servicio ascendente
- Espera: `baseCooldownMs * 2 ** failureIndex`

**Protección contra avalanchas de solicitudes:** evita que los fallos simultáneos prolonguen excesivamente el tiempo de espera o incrementen `backoffLevel` dos veces.

**Los bloqueos del contenido del flujo no ponen la cuenta en espera.** Cuando el supervisor de bloqueos del contenido (`open-sse/utils/streamHandler.ts`) desiste de un flujo que no ha enviado ninguna salida del modelo a tiempo, `markAccountUnavailable()` registra el error en la conexión, pero no establece ningún tiempo de espera: el bloqueo pertenece a esa solicitud y, en la mayoría de los casos, se trata de un turno de razonamiento prolongado que aún no ha generado salida. Los operadores pueden volver a habilitar este comportamiento mediante `resilienceSettings.streamStallCooldown.enabled` (valor predeterminado: `false`).

**Las tramas de razonamiento reinician el límite temporal de bloqueo del contenido.** Un modelo de razonamiento puede pensar durante minutos antes de producir su primer token visible: Claude transmite tramas `thinking_delta` cuyo texto de razonamiento puede estar vacío, y la API Responses transmite un elemento de razonamiento tras otro. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconoce estas tramas, y el supervisor reinicia su límite temporal con cada una de ellas en lugar de cancelar el turno. Aun así, no constituyen una salida del modelo, por lo que un turno que termina únicamente con razonamiento sigue notificándose como vacío, y un turno que deja de razonar y solo envía señales de actividad sigue activando el supervisor.

Las tramas binarias `reasoningContentEvent` de Kiro con una firma no vacía conservan esta actividad de razonamiento durante su paso por el ejecutor como un delta `reasoning_content` vacío. La firma no se reenvía. Los metadatos, las tramas incompletas y las firmas vacías no reinician el límite temporal del contenido; el tiempo de espera independiente del flujo activo y la cancelación por parte del cliente siguen siendo aplicables (`open-sse/executors/kiro/reasoning.ts`).

**Estados terminales (NO son tiempos de espera):**

- `banned` — establecido por la detección de palabras clave prohibidas o del bloqueo de la cuenta (consulte [BAN_DETECTION](../security/BAN_DETECTION.md)), y por tres rechazos consecutivos del servicio ascendente por solicitud (`request_rejected`, p. ej., el error 403 de Anthropic OAuth "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); un único rechazo solo pone la conexión en espera
- `expired` (pasa al estado terminal después de un número limitado de reintentos — `EXPIRED_RETRY_MAX = 3` con espera exponencial — para que los errores transitorios de OAuth puedan corregirse automáticamente antes de que la cuenta se desactive de forma permanente)
- `credits_exhausted`

Estos estados persisten hasta que cambien las credenciales o un operador los restablezca. No sobrescriba los estados terminales con un estado de espera transitorio.

**Recuperación diferida:** cuando `rateLimitedUntil` ha vencido, la conexión vuelve a ser apta. Tras un uso correcto, `clearAccountError()` borra todos los campos de error.

### Límite de uso de Claude OAuth: vía de menor prioridad + restablecimiento del límite de la sesión

**Ámbito:** una conexión de suscripción de Claude (OAuth). Ambas funciones son **opcionales por conexión** (Editar conexión → sección Claude → `lowPriorityMode` / `autoLimitReset` en `providerSpecificData`; ambas están desactivadas de forma predeterminada) y reproducen los comandos `/low-priority` y `/limit-reset` de Claude Code (contrato del protocolo obtenido de Claude Code 2.1.263).

**Implementación:**

- Máquina de estados + clasificación de respuestas: `open-sse/services/claudeLowPriority.ts`
- Cliente de estado/solicitud de restablecimiento: `open-sse/services/claudeLimitReset.ts`
- Enlace del ejecutor (inyección de cabeceras + reintento con la misma cuenta): `open-sse/executors/base.ts::execute()`
- Persistencia de la activación opcional: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Desencadenante:** el límite de uso de 5 horas: una respuesta `429` cuyas cabeceras contienen `anthropic-ratelimit-unified-status: rejected` y, cuando la cuenta cumple los requisitos, `anthropic-ratelimit-unified-slow-offer: treatment`. No se envía nada antes de esa primera respuesta 429 por alcanzar el límite; una ráfaga de respuestas 429 sin cabeceras unificadas sigue la ruta normal de tiempo de espera.

**Vía de menor prioridad** (`lowPriorityMode`):

- En el 429 del límite, el ejecutor acepta la oferta y reintenta inmediatamente la **misma**
  cuenta con `anthropic-usage-limit: slow`; la vía permanece activa hasta el
  `anthropic-ratelimit-unified-reset` anunciado (+60 s de margen), y cada solicitud dentro de esa
  ventana lleva el encabezado. El 429 interceptado nunca llega a `handleChatCore`, por lo que la
  conexión **no** entra en enfriamiento ni se rota.
- `anthropic-ratelimit-unified-slow-status` en respuestas posteriores: `active` / `not_needed`
  mantienen la vía; `slot_busy` (429) o un `529` esperan el
  `anthropic-ratelimit-unified-slow-retry-after` del servidor (20 s de forma predeterminada, limitado
  a 5–600 s, con una fluctuación aleatoria de ±30 %) y reintentan, con el límite establecido por
  `anthropic-ratelimit-unified-slow-max-wait` (20 min de forma predeterminada, limitado a
  1 min–6 h); superado ese tiempo, la vía termina y un enfriamiento de 10 minutos bloquea una nueva
  aceptación. Además, la espera queda limitada por el tiempo restante del propio tiempo de espera
  de inicio ascendente de la solicitud (`resolveFetchStartTimeout`, 10 min de forma predeterminada)
  menos un margen de 5 s: sin ese límite, la espera máxima predeterminada de 20 minutos sobreviviría
  a la solicitud y la espera se cancelaría a mitad de camino, mostrando un `TimeoutError` en lugar
  de la finalización controlada por `max_wait` y el enfriamiento.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, el reinicio de una ventana de 5 h, o
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (que la finaliza como
  `extra_usage` con cualquier estado, ya que el excedente pagado cubre ahora el límite) terminan la
  vía; la respuesta pasa entonces a la ruta normal de enfriamiento. `budget_exhausted` se recuerda
  hasta el reinicio de presupuesto anunciado (≤ 8 días).
- La comprobación del límite se ejecuta después de los reintentos internos del propio ejecutor
  provocados por respuestas 400 (edición de contexto, límites de razonamiento/esfuerzo, aprendizaje
  automático de parámetros), por lo que un 429 del límite que solo aparezca en uno de esos
  reintentos sigue interceptándose en vez de llegar a la ruta de enfriamiento.
- El estado se mantiene en memoria por conexión (un reinicio implica un 429 adicional del límite
  para volver a aceptar).

**Reinicio del límite de sesión** (`autoLimitReset`, se intenta antes que la vía cuando ambos están activados):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloque `juniper_tide`;
  cuando `arm: "reset"` y `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` con
  `{ "program": "juniper_tide" }` (UUID de la organización procedente de
  `providerSpecificData.organizationUUID`, con alternativa de arranque).
- `result: reset|not_limited` → la solicitud se reintenta a máxima velocidad (sin el encabezado
  lento). `already_used` / `not_offered` memorizan `next_available_at` (una semana de forma
  predeterminada); cualquier fallo aplica una espera progresiva de 15 minutos. El reinicio solo
  puede hacerse una vez por semana y sigue contando para el límite semanal.

Protecciones contra regresiones: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinidad de sesión (#7274)

**Ámbito:** una sesión de cliente (encabezado `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) fijada a una conexión, para **cualquier** proveedor.

**Propósito:** mantener un agente de varios turnos (Claude Code, aider, agentes personalizados) en la misma cuenta entre solicitudes, reduciendo la pérdida de contexto entre cuentas y los 429 repetidos por arranque en frío en proveedores con estado de sesión por cuenta.

**Implementación:**

- Resolución del TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selección/creación de la fijación: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extracción del encabezado (genérica, para cualquier proveedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabla de fijaciones persistente: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Configuración: `sessionAffinityTtlMs` (TTL global en ms; `0` lo desactiva) — `src/lib/db/settings.ts`. Se cambió el nombre desde `codexSessionAffinityTtlMs`, exclusivo de Codex, mediante la migración `124_generic_session_affinity_ttl.sql`, que transfiere cualquier TTL de Codex configurado previamente como el nuevo valor predeterminado.

Antes de #7274, `resolveSessionAffinityTtlMs()` devolvía inmediatamente `0` para todos los proveedores excepto `codex`, por lo que la configuración del TTL (y los encabezados de sesión) no tenía efecto en ningún otro lugar, aunque el mecanismo de fijación y la extracción de encabezados ya eran independientes del proveedor. La corrección eliminó ese retorno anticipado; ahora el TTL se aplica uniformemente a todos los proveedores cuando se configura globalmente con un valor superior a `0`.

Los tres encabezados de afinidad de sesión nunca se reenvían al servidor ascendente: los ejecutores construyen desde cero sus propios encabezados ascendentes en lugar de transmitir los encabezados del cliente, por lo que siguen siendo únicamente identificadores internos de correlación.

### Arrendamientos exclusivos de conexiones de sesión administradas

**Ámbito:** un cliente/sesión HTTP administrado y activo posee una conexión de OmniRoute apta.

**Propósito:** proporcionar la propiedad exclusiva y duradera de una conexión a clientes que necesitan una barrera estricta de enrutamiento entre solicitudes. Esto difiere de la afinidad de sesión, que es una preferencia flexible de continuidad: un arrendamiento exclusivo conserva el estado del ciclo de vida en SQLite, exige la unicidad global tanto del propietario activo como de la conexión activa y rechaza una generación obsoleta antes del envío al proveedor.

La funcionalidad se habilita expresamente por clave de API. Una clave administrada debe tener el ámbito `lease:exclusive` y una lista `allowedConnections` explícita y no vacía. Cualquier cliente HTTP puede usar el punto de conexión del ciclo de vida; no se requiere ningún nombre de cliente, agente de usuario, proveedor, método OAuth ni modelo. El arrendamiento posee una conexión, no un modelo, por lo que un cambio de modelo conserva la vinculación mientras la conexión siga siendo apta en condiciones normales. Las reglas normales de modelo, cuota, estado, enfriamiento y lista de permitidos siguen teniendo prioridad y pueden trasladar la misma generación a otra conexión libre y apta.

El ciclo de vida es `POST /api/v1/session-leases` con las acciones JSON `acquire`, `renew` y `release`.
Las solicitudes de inferencia administradas presentan el valor opaco `X-OmniRoute-Lease-Owner` y la
`X-OmniRoute-Lease-Generation` exacta. El propietario utiliza `vlo_` seguido de 43 caracteres base64url; solo
se almacena su hash SHA-256. Cada barrera de envío final también vincula el ID de la clave de API autenticada y el
ID de la conexión activa. Los encabezados de control del arrendamiento se eliminan de los registros, de las instantáneas
de solicitudes conservadas y de los encabezados del ejecutor upstream.

Si el enrutamiento ordinario tiene candidatos administrados aptos, pero todos los candidatos libres están ocupados por un
arrendamiento activo ajeno, OmniRoute devuelve HTTP `429`, el código lease-capacity-unavailable, un
estado waiting-for-capacity y un `Retry-After` acotado derivado del vencimiento relevante más próximo.
La ausencia ordinaria de candidatos aptos no constituye una contención de arrendamientos y conserva la semántica de error de enrutamiento existente.

Los mecanismos relacionados permanecen separados:

- La ocupación de sesiones OAuth es una distribución flexible local al proceso para las cuentas OAuth.
- Los semáforos de cuenta conceden permisos de concurrencia de solicitudes y finalizan cuando se completa una solicitud.
- Los arrendamientos exclusivos de sesiones administradas proporcionan una propiedad de ciclo de vida duradera con una barrera de generación.

---

## 3. Bloqueo de modelos

**Ámbito:** combinación de proveedor + conexión + modelo.

**Ámbito de la clave según el estado:** el estado del fallo determina en qué clave se
escribe un bloqueo (`resolveLockoutScope()` en `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — una señal de cuota o autorización — bloquean la **familia de cuota**:
  para codex, todo el ámbito `codex` / `spark` (todos los modelos `gpt-5*` de la
  conexión); para otros proveedores, `getQuotaScopedModelForProvider()`.
- `404` bloquea el modelo básico (`getModelLockKey()` restringe `not_found`).
- Cualquier otro estado — fallos de transporte/servidor `5xx` y el `502`
  sintetizado por OmniRoute a partir de la validación de calidad — bloquea únicamente
  la combinación **exacta** de proveedor/conexión/modelo. Un flujo defectuoso en un
  modelo no constituye evidencia sobre la cuota de la cuenta; antes de esta regla,
  una respuesta vacía de `codex/gpt-5.6-luna` eliminaba del enrutamiento todos los
  modelos `gpt-5*` de esa conexión durante 2–30 min (con escalado), aunque su cuota
  no se hubiera visto afectada.
- La opción `scope` explícita de quien realiza la llamada siempre tiene prioridad (Antigravity pasa `"exact"`).

**Propósito:** evitar deshabilitar una conexión completa cuando solo un modelo no está disponible o tiene la cuota limitada.

**Ejemplos:**

- Proveedores con cuota por modelo que devuelven 429
- Proveedores locales que devuelven 404 cuando falta un modelo
- Fallos de permisos específicos del proveedor para un modo/modelo (p. ej., modos de Grok)

**Implementación:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel de tiempos de espera de modelos (v3.8.0)

IU: Configuración → Tiempos de espera de modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Enumera los bloqueos activos con: proveedor, conexión, modelo, motivo y expiresAt. Los operadores pueden volver a habilitar manualmente un modelo desde la tarjeta.

**API REST:**

- `GET /api/resilience/model-cooldowns` — enumera los bloqueos activos
- `DELETE /api/resilience/model-cooldowns` — rehabilitación manual. Cuerpo: `{provider, connection, model}`. Autenticación: management.

### Gestor de tiempos de espera

IU: Supervisión → Gestor de tiempos de espera (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Una única página para todas las conexiones que están fuera del enrutamiento por un motivo transitorio, en lugar de
abrir la página de cada proveedor. Enumera los tiempos de espera de las conexiones, los bloqueos de modelos y los estados
terminales; permite eliminarlos por conexión, para una selección o para todas las conexiones de un proveedor;
y permite editar las reglas de tiempo de espera que más se ajustan: `streamStallCooldown.enabled` y el tiempo de espera
base de `connectionCooldown` para OAuth / claves de API, así como el número máximo de pasos de retroceso (guardados mediante
`PATCH /api/resilience`). Los estados terminales (`banned`, `expired`, `credits_exhausted`) se
enumeran, pero nunca se eliminan aquí.

**API REST** (`src/lib/resilience/cooldownManager.ts`, autenticación: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexiones con su estado, tiempo de espera restante,
  nivel de retroceso, tipo del último error y bloqueos de modelos (sin credenciales)
- `POST /api/resilience/cooldowns` — cuerpo `{connectionIds: string[]}` o
  `{all: true, provider?}`; devuelve `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### IU de configuración de bloqueos + recuperación por decaimiento tras éxitos (v3.8.23)

El bloqueo de modelos pasó de ser un comportamiento fijo siempre activo a una función
completamente configurable y opcional, con su propia tarjeta de configuración y una ruta
de recuperación autorreparable.

**Tarjeta de configuración:** Configuración → Bloqueo de modelos
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Esta es **distinta** de la tarjeta de solo lectura `ModelCooldownsCard` anterior (que únicamente
_enumera_ los bloqueos activos): la nueva tarjeta _configura los parámetros_. Los valores
predeterminados se encuentran en `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Configuración           | Valor predeterminado             | Significado                                                                                |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Interruptor principal: el bloqueo de modelos está **desactivado de forma predeterminada**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Estados del servicio ascendente que cuentan como un fallo limitado al modelo.              |
| `baseCooldownMs`        | `120_000` (120 s)                | Duración inicial del bloqueo para el primer fallo.                                         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Límite máximo del tiempo de espera escalado.                                               |
| `maxBackoffSteps`       | `10`                             | Número máximo de pasos de escalado del retroceso exponencial.                              |
| `useExponentialBackoff` | `true`                           | Indica si los fallos repetidos aumentan exponencialmente el tiempo de espera.              |

La configuración persiste mediante el almacén de configuración habitual y se valida a través del
esquema de configuración de resiliencia; la tarjeta limita `baseCooldownMs`/`maxCooldownMs`
(con `maxCooldownMs ≥ baseCooldownMs`) y `maxBackoffSteps`.

**Recuperación por decaimiento tras éxitos:** la recuperación **no** depende únicamente del vencimiento del temporizador. Una
respuesta correcta reduce progresivamente el recuento de fallos del modelo, de modo que un modelo que se haya recuperado
a mitad del período deje de escalar (y se desbloquee) antes de que venza su temporizador. Cuando un objetivo combinado
responde correctamente, `open-sse/services/combo.ts` llama a `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que reduce a la **mitad** el
`failureCount` almacenado (`Math.floor(failureCount / 2)`); cuando llega a `0`, la entrada de bloqueo
se elimina por completo. La función complementaria `recordModelLockoutFailure()`
incrementa el recuento (y escala el tiempo de espera) cuando se producen fallos dentro del
período de escalado. Este decaimiento tras éxitos se suma al simple vencimiento del temporizador:
cualquiera de las dos vías puede volver a habilitar un modelo.

**Estado:** los bloqueos se mantienen **en memoria** (`Map`s por proceso de
`ModelLockoutEntry` con claves `provider:connectionId:model`; los bloqueos de ámbito exacto usan
`provider:connectionId:exact:model`) y no se conservan en
la base de datos; se pierden al reiniciar. La _configuración_ sí se conserva; el _estado_
de los bloqueos activos es efímero.

---

## 4. Control de concurrencia de cuota compartida (v3.8.36)

Las cuentas de suscripción (GLM, MiniMax, etc.) suelen aceptar solo entre ~1 y 3
solicitudes simultáneas; superar ese límite provoca errores 429 y periodos de espera. Esto resulta especialmente problemático con
combinaciones de **cuota compartida** (`qtSd/…`), donde varias claves de API comparten una misma cuenta
del proveedor. Tres capas evitan que una cuenta compartida se sature.

### Límite de concurrencia por conexión (`max_concurrent`)

Cada conexión de proveedor puede declarar un límite máximo `max_concurrent`
(`provider_connections.max_concurrent`, configurado en el cuadro de diálogo de la conexión, la API o la base de datos).
Déjelo vacío para que no haya límite. Este es el único parámetro que controla la capa de serialización
descrita a continuación; establézcalo en la concurrencia real de la cuenta (p. ej., GLM ~1, MiniMax ~2).

### Límites de concurrencia por modelo (`modelConcurrency`)

Una conexión también puede declarar límites máximos de concurrencia exactos por modelo
dentro de su mapa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Configúrelo en el cuadro de diálogo de la conexión (**Anulaciones de límites de uso → Límites de
concurrencia por modelo**, un `model=cap` por línea) o mediante
`PATCH /api/providers/[id]` con la misma estructura JSON. Semántica de las claves:

- **Por conexión frente a específico del modelo:** `maxConcurrent` sigue siendo el límite máximo
  compartido para toda la conexión. Cuando se aplican ambos, las dos barreras se adquieren
  atómicamente en la misma barrera compuesta
  (`global → provider → account → model`); el comportamiento efectivo corresponde al
  límite aplicable más restrictivo.
- **Coincidencia exacta de la clave del modelo:** la clave es la cadena del modelo pasada al
  ejecutor después de resolver el enrutamiento; normalmente, el identificador simple del modelo del proveedor
  (`glm-5`), no un alias `provider/model` del lado del cliente (`zai/glm-5` no
  coincide con `glm-5`). Los valores son límites máximos de solicitudes simultáneas expresados como enteros positivos.
- **Cola local, sin detección:** las solicitudes excedentes esperan localmente conforme a la
  semántica existente de cola y tiempo de espera (errores de admisión tipados `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute no detecta ni
  infiere la política del proveedor: aplica exactamente los límites máximos configurados por el
  operador. Una barrera de modelo saturada nunca deshabilita el proveedor ni
  crea un bloqueo permanente del modelo; el comportamiento del proveedor ante errores 429, periodos de espera o conmutación por error
  continúa siendo el mecanismo de respaldo ante errores.
- **Ámbito por conexión y por proceso:** los límites máximos se aplican por conexión de base de datos
  y se mantienen en memoria, por lo que dos conexiones que reutilicen la misma clave de API del proveedor
  no se coordinan entre sí.
- **Sin configurar significa sin cambios:** omitir el mapa (o dejar en blanco el
  campo del panel) no añade ninguna barrera de modelo. Ejemplo de configuración sin
  establecer ningún límite universal para el proveedor:

```text
glm-5=1
glm-4.7=3
```

### Serialización de solicitudes de cuota compartida

Cuando un envío de cuota compartida se dirige a una conexión que declara un valor positivo de
`max_concurrent`, las solicitudes simultáneas a esa **cuenta** se serializan mediante un
semáforo por conexión (clave `qsconn:<connectionId>`): las solicitudes excedentes **esperan en
la cola** en lugar de saturar la cuenta. Sigue una política de **apertura ante fallos**: si la
cola está saturada o se agota el tiempo de espera, la solicitud continúa sin una plaza, en lugar de rechazar jamás una solicitud
que pueda enviarse. Actívelo o desactívelo en **Configuración → Resiliencia → Concurrencia por conexión
de cuota compartida** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activado de forma
predeterminada). Sin un límite máximo `max_concurrent`, el comportamiento no cambia.

> La barrera de enrutamiento de cuota compartida (`selectQuotaShareTarget`, DRR + P2C) sigue por sí misma
> una política de apertura ante fallos y solo _reduce la prioridad_ de una conexión que ha alcanzado el límite; con un
> grupo de una sola conexión no puede imponer un límite estricto, por lo que este semáforo es el que realmente
> contiene la saturación.

### Reintento de combinaciones con reconocimiento del periodo de espera

Para cada estrategia de combinación (cuando está habilitada), una solicitud que consolidaría un error 429
debido a un periodo de espera transitorio CORTO espera a que termine y vuelve a enviarse en lugar de
devolver el error 429; esto cubre las ventanas de TPM/RPM de la clase Gemini (~60 s de `retry-after`)
en combinaciones de varios modelos, por ejemplo, cuando ambos destinos de una combinación de 2 modelos alcanzan un límite de uso
por modelo. Está limitado por `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) en **Configuración → Resiliencia**. Nunca espera por `quota_exhausted`
(bloqueado hasta medianoche) ni por motivos de autenticación o recurso no encontrado.

---

## 5. Control de admisión de la cola de solicitudes (v3.8.49 · issue #6593)

**Ámbito**: la cola local de limitación de tasa por proveedor+conexión (`open-sse/services/rateLimitManager.ts`,
respaldada por Bottleneck), un nivel por debajo de los tres mecanismos anteriores.

**`maxWaitMs` limita la espera en cola; `executionMaxWaitMs` limita la ejecución.**
Ambos límites están separados deliberadamente y ninguno influye en el otro.

`resilienceSettings.requestQueue.maxWaitMs` es el **presupuesto de espera en cola**:
abarca la espera de una ranura del proveedor y la posterior permanencia en estado QUEUED, y su temporizador se
cancela en el momento en que el trabajo deja el estado QUEUED y comienza a ejecutarse
(`rateLimitManager.ts`, `wrappedFn`). Una solicitud que lo supere nunca llega
al servicio upstream. El valor predeterminado es 30000ms, proporcionado por `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
en `src/lib/resilience/settings.ts` y fijado por
`tests/unit/ratelimit-admission-control-6593.test.ts`, de modo que cualquier cambio
hará que esa prueba falle, en lugar de dejar que este párrafo quede silenciosamente desactualizado.

`resilienceSettings.requestQueue.executionMaxWaitMs` es lo que Bottleneck
recibe como `expiration` del trabajo, cuyo temporizador comienza solo después del despacho. Sirve
como protección de último recurso para ejecutores que no tienen su propio tiempo de espera del upstream y se
aumenta hasta el tiempo de espera de inicio de fetch del propio ejecutor cuando este es mayor, por lo que
no puede interrumpir una respuesta en curso que funciona correctamente. El valor predeterminado es 600000ms (10 min).

Usar el presupuesto de cola como `expiration` era lo que antes interrumpía en mitad de la ejecución
las puertas de enlace no incrementales — legítimamente pueden ejecutarse durante minutos antes de enviar los primeros bytes —,
y por eso una expiración se expone como `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mientras que el presupuesto de cola utiliza el
código de tiempo de espera de la cola. Sobrescriba cualquiera de ellos mediante `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (variable de entorno) o desde el panel
(**Configuración → Resiliencia**). Ambos se limitan al intervalo de 1ms–24h al normalizarse.

**Precedencia, para ambos:** la variable de entorno solo proporciona el valor _predeterminado_. Un valor
persistido en `resilienceSettings.requestQueue` (panel / parche de API, almacenado
en `key_value`) tiene prioridad, y un valor por conexión de
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` tiene prioridad sobre este último. Por tanto, establecer
la variable de entorno en un despliegue que ya tenga un valor persistido
no cambia nada; en su lugar, borre o actualice el ajuste persistido.

La permanencia en la cola está limitada por `maxWaitMs`; `maxQueueDepth`, descrito a continuación, limita cuántos
solicitantes pueden estar en cola simultáneamente.

**`maxQueueDepth` — límite de admisión opcional (nuevo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita cuántas solicitudes pueden permanecer en cola (aún sin despachar) simultáneamente para una
combinación de proveedor+conexión. Cuando la cola ya contiene `maxQueueDepth`
solicitudes, una nueva solicitud se rechaza inmediatamente con un error tipado
`code: "RATE_LIMIT_QUEUE_FULL"` **antes** de llegar a `limiter.schedule()`
— por lo que el rechazo es barato y ocurre antes de cualquier trabajo posterior de
compresión / traducción del prompt para esa solicitud. El valor predeterminado es `0` =
desactivado, lo que conserva el comportamiento existente de cola sin límites; limitado a 0–100000.
Sobrescríbalo mediante `RATE_LIMIT_MAX_QUEUE_DEPTH` (variable de entorno) o
`resilienceSettings.requestQueue.maxQueueDepth` (panel/parche de API).

La propia comprobación de admisión es una función pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), por lo que
puede someterse a pruebas unitarias sin un limitador Bottleneck real.

> El RFC que dio origen a #6593 también propuso un indicador `bypassCompressionOnRateLimit`.
> La canalización `open-sse/services/compression/` de este repositorio realiza
> compresión del prompt/contexto en la solicitud saliente al LLM (`chatCore.ts`,
> alrededor del bloque `resolveCompressionSettings`/`selectCompressionStrategy`),
> no compresión de respuestas HTTP en cuerpos 429 sintetizados; no existe una
> ruta de código correspondiente para un indicador de omisión literal. Ese paso de compresión del prompt
> también se ejecuta actualmente _antes_ de `withRateLimit()` en la canalización de solicitudes, por lo que
> reordenarlo para omitirlo ante un rechazo por cola llena constituye un cambio independiente y de mayor
> alcance que el de este issue; intencionadamente **no** se implementó
> aquí y se deja como tarea de seguimiento si el ahorro de CPU compensa el
> riesgo de reordenación.

---

## 6. Vigilante de rendimiento de flujos lentos (#9709)

La protección opcional `resilienceSettings.streamRecovery.throughputWatchdog` detecta
un upstream que sigue enviando fragmentos, pero genera una salida del asistente por
debajo de la tasa configurada de salida útil. Es deliberadamente distinta del tiempo
de espera por inactividad: los latidos y los metadatos no reinician ninguno de los
temporizadores ni cuentan como progreso. También es distinta del plazo máximo
absoluto del intento (#9153), que sigue siendo un límite de seguridad absoluto,
independientemente de la calidad de la salida.

El vigilante requiere un período de calentamiento seguido de una ventana móvil
completa antes de poder abortar. Cuenta los deltas de texto de los eventos de salida
de Chat Completions y Responses API (una aproximación conservadora en bytes UTF-8),
ignora los eventos vacíos y los que solo contienen datos de uso, y suspende la
evaluación mientras haya eventos de llamadas a herramientas o de razonamiento en
curso. Está deshabilitado de forma predeterminada y puede habilitarse con
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; la ventana, el calentamiento, la tasa
mínima y la salida mínima medible están acotados por la capa normal de normalización
de la configuración de resiliencia.

Cuando está habilitado, una cancelación del vigilante se aplica únicamente al intento
upstream activo. Antes de que haya bytes visibles para el cliente, la ruta existente
de recuperación temprana dentro de la misma cuenta puede volver a abrir el intento.
Después de la confirmación, el flujo nunca se reproduce de nuevo a ciegas; solo el
contrato existente de continuación segura a mitad del flujo puede empalmar un sufijo.
La finalización sigue ejecutándose una sola vez, por lo que ni la contabilización del
uso ni la liberación del semáforo se duplican.

---

## 7. Reformulación del estado upstream (errores de cuota con estado incorrecto)

**Alcance:** un gateway upstream que informa del agotamiento temporal de la cuota con un estado HTTP incorrecto.

**Propósito:** corregir un estado engañoso ANTES de la clasificación, de modo que los consumidores downstream (el motor de fallback, la agregación combinada y la respuesta enviada al cliente) perciban la verdadera naturaleza reintentable del fallo.

Algunos gateways indican el agotamiento TEMPORAL de la cuota mediante un estado
HTTP no reintentable. `agentrouter.org` devuelve `403` (a veces `400`) con un cuerpo
en chino (`用户额度不足` / `额度不足`) en lugar del `429` estándar. Los clientes como
Claude Code tratan `403` como permanente y abortan la sesión; sin la corrección,
el motor de fallback lo clasificaría como `AUTH_ERROR` en lugar de como un evento
de cuota.

**Implementación:**

- Registro + comparador: `open-sse/config/upstreamStatusRestatement.ts` — una
  lista de reglas por proveedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), evaluadas mediante `applyStatusRestatement()`.
- Punto de llamada: el bloque `providerFailure:` de `open-sse/handlers/chatCore.ts`
  (alrededor de la línea 3654), justo después de que `parseUpstreamError()` analice
  una respuesta upstream con un estado HTTP de error (`!providerResponse.ok`) y antes
  de que se ejecute cualquier clasificación, de modo que todos los consumidores
  downstream vean el estado corregido. Los errores incrustados dentro de un flujo
  SSE `200` siguen una ruta posterior y separada de análisis del flujo y **no** están
  cubiertos actualmente por este hook; se trata de una limitación conocida, que aún
  no es necesaria para el estado incorrecto de agentrouter (que aparece como un
  estado HTTP de error).
- Elegibilidad para reintentos: `429` está incluido en `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), por lo que un error reformulado
  incluye una ventana de reintento real en lugar de presentarse como un `403` sin
  posibilidad de recuperación.
- El `60s` sintético de `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) es
  únicamente lo que la respuesta reformulada comunica al **cliente**; no constituye
  por sí mismo la duración interna de enfriamiento/bloqueo de la conexión, que se rige
  por separado mediante el mecanismo que gestione realmente el error reformulado
  (el backoff creciente de Connection Cooldown, §2, con una base de `3s` para
  proveedores de claves de API; o Model Lockout, §3, para proveedores con cuota por
  modelo como agentrouter). El router puede volver a ser elegible internamente para
  reintentar antes de la ventana de 60s que anuncia al cliente; se trata de un margen
  intencionado, no de un error.

Los errores permanentes (`无权访问模型` de agentrouter — sin acceso a este modelo)
NUNCA se reformulan: `excludeMarkers` veta la regla incluso cuando hay una
coincidencia con `textMarkers`, por lo que el error conserva su estado original y
nada intenta repetirlo indefinidamente. La regla de clasificación de proveedor
correspondiente (`agentrouter-model-access-denied` en
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`,
un enfriamiento base declarado de `6h`) es consultada por `checkFallbackError`
(`open-sse/services/accountFallback.ts`) _antes_ del retorno anticipado genérico
`FORBIDDEN` de la categoría apikey, condicionado a `honorsRuleLockScope(provider)`
(#10334 — actualmente exclusivo de agentrouter mediante la lista de permitidos
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` de `providerErrorRules.ts`). El enfriamiento
declarado de 6h de la regla se transmite como `fallbackResult.baseCooldownMs`, pero
sigue alimentando la ruta preexistente de bloqueo por cuota por modelo
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, sin cambios por
#10334 salvo por el origen del enfriamiento): se limita al valor de
`mlSettings.maxCooldownMs` del operador (de forma predeterminada,
`1_800_000ms` / 30min), como cualquier otro bloqueo de modelo, y el _motivo de
bloqueo persistido_ sigue siendo el valor preexistente codificado de forma fija
`"forbidden"`, no el valor `"auth_error"` de la regla; solo se respeta de extremo
a extremo la duración del enfriamiento, no la cadena del motivo. La propia conexión
permanece activa; los modelos hermanos de la misma conexión no se ven afectados.

Los errores de cuota reformulados (`额度不足`) alcanzan una regla de proveedor en producción
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sin un tiempo de espera declarado propio; se aplica el valor
predeterminado de retroceso escalado de la capa de persistencia). Desde #10334,
`scope` en `ProviderErrorRuleMatch` SE consume de extremo a extremo, pero
**solo** para los proveedores incluidos en la lista de permitidos
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts`; actualmente solo
`"agentrouter"`, controlado mediante `honorsRuleLockScope()`). Para cualquier
otro proveedor, `scope` sigue siendo informativo, exactamente igual que antes
de #10334. `checkFallbackError` expone el ámbito de la regla coincidente como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) es la protección compartida que confirma que un
`ruleScope` es realmente seguro de respetar como una señal autorrecuperable
para toda la conexión (ámbito `"connection"`, motivo `quota_exhausted`, nunca
`permanent`, nunca `creditsExhausted`; una defensa contra una futura regla que
combine el ámbito `"connection"` con un estado permanente de la cuenta). Dos
consumidores la invocan:

- **Persistencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  en lugar de entrar en la rama de bloqueo **por modelo** del proveedor de
  paso directo (agentrouter tiene `passthroughModels: true` →
  `hasPerModelQuota()` devuelve `true`), aplica un **tiempo de espera temporal
  de la conexión**: `testStatus: "unavailable"` + `rateLimitedUntil`, nunca un
  estado terminal (`credits_exhausted`/`banned`/`expired`), de modo que la
  conexión se recupera automáticamente una vez transcurrido el tiempo de
  espera, en vez de requerir un restablecimiento manual de las credenciales.
  Se omite para conexiones con `disableCooling: true` (#2997): esa exclusión
  voluntaria pasa en su lugar al bloqueo por modelo (una contrapartida
  documentada; consulte el comentario del código situado encima de la rama).
- **Enrutamiento combinado de la misma solicitud** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): la misma protección añade la
  conexión al conjunto en memoria `exhaustedConnections`, con la clave
  `${provider}:${connectionId}`. Esto solo omite un destino restante DE LA
  MISMA SOLICITUD que _ya contiene exactamente ese `connectionId`_ en su propio
  objeto de destino (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes de la consulta de `exhaustedConnections`); una
  combinación simple de listas de modelos, en la que los destinos hermanos no
  contienen ningún `connectionId` fijado propio y solo se resuelve uno por
  envío a partir de la cabecera `X-OmniRoute-Selected-Connection-Id` de la
  respuesta, nunca coincide con esa clave. Para ese caso habitual, la
  protección real contra la reutilización de la cuenta que acaba de agotarse
  por parte de un tramo restante NO es este conjunto, sino la capa de
  persistencia anterior (el `rateLimitedUntil` de la conexión está ahora en el
  futuro), combinada con la supresión, mediante esta misma protección, de
  `transientRateLimitedProviders` para el fallo (consulte «Diseño en dos
  etapas» y el comentario del código sobre la rama
  `isAgentrouterConnectionQuotaScope` en `targetExhaustion.ts`): al no marcarse
  ese conjunto, la autorización forzada de `allowRateLimitedConnection` en
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NO se
  activa para los tramos restantes del proveedor, por lo que el filtro
  `rateLimitedUntil` de la selección de credenciales
  (`src/sse/services/auth.ts:1238`) se respeta normalmente y un tramo restante
  selecciona otra conexión de agentrouter que siga siendo apta o falla porque
  no hay credenciales disponibles; no fuerza su regreso a la conexión que
  esta rama acaba de poner en espera.

### Diseño en dos etapas: reformulación del estado y, después, clasificación

La reformulación del estado (`upstreamStatusRestatement.ts`) y las reglas de
clasificación de proveedores (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) son registros separados que usan como claves tanto el
identificador del proveedor como marcadores de texto, pero se ejecutan en
lugares distintos y cumplen propósitos diferentes: la reformulación
reescribe el estado HTTP al principio de `chatCore.ts`; las reglas de
clasificación eligen el `reason` de respaldo y el `scope` del bloqueo
(`model` / `provider` / `connection`) dentro de `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Las reglas de clasificación solo ven el **texto** completo del error
(necesario para hacer coincidir marcadores del cuerpo como `额度不足`) en el
caso de los proveedores incluidos en la lista de permitidos
`FULL_TEXT_RULE_PROVIDERS` de `providerErrorRules.ts`; actualmente solo
`"agentrouter"`. Para cualquier otro proveedor del **catálogo integrado**,
`checkFallbackError` únicamente pasa a `getProviderErrorRuleMatch` el error
estructurado (`{code, type}`), que basta para las reglas basadas en
cabeceras/estado/código, pero no puede detectar marcadores de texto del
cuerpo. La función auxiliar `resolveRuleMatchBody()` realiza esta selección:
el texto completo del error para los proveedores incluidos en la lista de
permitidos y, para los demás, el error estructurado. Añadir un proveedor
**integrado** a `FULL_TEXT_RULE_PROVIDERS` supone una adhesión explícita por
proveedor; existe para que la ruta predeterminada de todos los proveedores
que no estén en la lista permanezca idéntica byte por byte.

El `scope` de una regla (`model` / `provider` / `connection`) constituye una
adhesión independiente de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError`
solo lo expone como `fallbackResult.ruleScope`, y los consumidores posteriores
solo lo respetan como algo distinto de una etiqueta informativa para los
proveedores incluidos en la lista de permitidos
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` del mismo archivo (controlado mediante
`honorsRuleLockScope()`; actualmente solo `"agentrouter"`). Consulte «Errores
de cuota reformulados» más arriba para saber qué hace realmente una
coincidencia con `scope: "connection"` una vez que un proveedor está incluido
en esa lista de permitidos.

**#11104 — las reglas declaradas por el operador omiten ambas listas de permitidos.** Un operador puede
declarar una regla por proveedor en tiempo de ejecución mediante `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
sin editar este archivo. Condicionar una regla del operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` —listas de permitidos
destinadas a proteger el comportamiento **predeterminado** de las reglas integradas del catálogo—
haría que el mecanismo de configuración quedara inerte para todos los proveedores salvo los que ya
figuran allí, puesto que declarar la regla ya constituye la adhesión explícita
del operador. `resolveRuleMatchBody()` y `honorsRuleLockScope()` comprueban
primero `hasOperatorRuleForProvider()`: un proveedor con una regla del operador recibe
el texto sin procesar del error y se respeta su `scope` declarado, independientemente de
si también aparece en alguna de las listas de permitidos.

**Limitación conocida — `providerRuleRegistry` nunca se consulta para HTTP 400.**
La rama `BAD_REQUEST` de `checkFallbackError` clasifica el estado 400 por completo
mediante sus propios arrays de patrones (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. en `accountFallback.ts`) y retorna antes de
alcanzar la rama `configuredRule`/`getProviderErrorRuleMatch` situada encima.
Una regla integrada del catálogo (o una regla del operador) con `status: 400` es
sintácticamente válida, pero nunca se activará. Actualmente, ninguna regla existente se aplica a 400,
por lo que nada en producción se ve afectado; pero una futura regla para 400 requerirá modificar
primero esta rama, lo cual supone un cambio mayor que añadir una regla (reclasifica el 400 para
todos los proveedores que ya dependen del comportamiento basado en arrays de patrones)
y queda fuera del alcance de añadir una regla para un único proveedor.

### Añadir un nuevo gateway que informa incorrectamente sobre la cuota

1. Registre un array de reglas en `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenga los `textMarkers`
   específicos del proveedor; nunca reutilice frases genéricas en inglés que colisionen con
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registre reglas de clasificación en
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para seleccionar
   el ámbito de bloqueo adecuado (`connection` para una cuota aplicable a toda la cuenta, `model` para
   errores por modelo). Este paso solo surte efecto en producción para
   proveedores cuyas reglas necesiten el texto completo del error (marcadores del cuerpo): añada el
   id del proveedor a `FULL_TEXT_RULE_PROVIDERS` en el mismo archivo; de lo contrario,
   `checkFallbackError` únicamente entrega a la regla el error estructurado
   `{code, type}` y una regla basada en el texto del cuerpo nunca coincidirá con el tráfico real.
   Las reglas que coinciden únicamente con `status`/`headers` (como las de Opencode o
   Minimax) no necesitan esta adhesión. Por separado, si la regla declara
   `scope: "connection"` y se pretende aplicar un periodo de espera realmente válido para toda la conexión,
   además de omitir la combinación en la misma solicitud (y no solo una etiqueta informativa), añada el
   id del proveedor a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` en el mismo archivo; esto
   es lo que habilita el consumo al estilo de `isAgentrouterConnectionQuotaScope()` en
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) y
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sin ello, `scope`
   se sigue propagando mediante `fallbackResult.ruleScope`, pero nada actúa sobre él.
3. Añada pruebas unitarias siguiendo el modelo de `tests/unit/upstream-status-restatement.test.ts`
   y `tests/unit/agentrouter-error-rules.test.ts` (incluidas las
   protecciones not-permanent / not-creditsExhausted y, si el proveedor necesita
   la lista de permitidos, una prueba que confirme que `resolveRuleMatchBody()` devuelve el
   texto completo únicamente para ese proveedor).

No es necesario realizar cambios en `chatCore.ts`, `classifyError` ni en combo.

#### Bloqueo agrupado por egreso (#10880)

Los proveedores de `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia opencode) se tratan
como proveedores ascendentes agrupados por IP (el nivel gratuito de opencode está agrupado por IP, no
por cuenta; consulte #9611): un estado 429 clasificado como `quota_exhausted`
**o** `rate_limit_exceeded` aplica un periodo de espera a todas las conexiones de la familia incluida en la lista de permitidos
cuya última IP de egreso conocida coincida con la de la conexión que presenta el fallo, antes de que
la rotación pueda probarlas,
evitando así N-1 llamadas ascendentes con fallo garantizado (la misma forma que #10460/#10525).
`rate_limit_exceeded` se incluye deliberadamente: en la ruta `markAccountUnavailable`,
las reglas específicas de opencode nunca coinciden (no se pasan encabezados ni cuerpo a
`checkFallbackError`, y opencode no está en `FULL_TEXT_RULE_PROVIDERS`), por lo que un 429
cuyo cuerpo contiene el texto de cuota de suscripción ("monthly usage limit
reached") se clasifica como `quota_exhausted` mediante el fallback de texto de cuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; periodo de espera de 1 h) antes de
alcanzar la regla `status_429`, mientras que un 429 sin texto de cuota (simple
limitación de frecuencia) se clasifica mediante la regla `status_429` como `rate_limit_exceeded`
y aun así aplica el periodo de espera a la familia de IP. Para un proveedor incluido en la lista de permitidos, un límite
de frecuencia agrupado por IP constituye la misma señal que una cuota agotada. Límites reales:

- **Mejor esfuerzo**: el bloqueo determina la última `egress_ip` conocida de la
  conexión a partir de `proxy_logs` (ventana de 24h, síncrono, sin caché). Una
  caché fría (la IP de salida nunca se sondeó) o la ausencia de una fila → la
  rama sigue aplicando el enfriamiento a la conexión que falla (registrado como
  hasta ahora), pero no se bloquea ninguna conexión hermana.
- **Nunca terminal**: el enfriamiento es una ventana de cuota renovable
  (`testStatus: "unavailable"`); nunca se deriva un estado permanente de una
  señal a nivel de IP. Las conexiones `disableCooling` omiten la rama por
  completo.
- **La granularidad del bloqueo cambia para la familia incluida en la lista de permitidos**:
  se trata de un cambio de ámbito, no solo de una optimización para conexiones
  hermanas. opencode es un proveedor `passthroughModels`, por lo que antes de
  esta rama un 429 producía un bloqueo por MODELO; ahora produce un enfriamiento
  de la conexión, incluso para un operador que ejecuta una única conexión sin
  ninguna conexión hermana. Esa es la granularidad que la tabla de reglas de
  opencode ya declara correcta (`scope: "connection"`,
  `providerErrorRules.ts`), pero que hasta ahora nunca se respetó porque
  opencode no está en `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. La rama escribe por
  sí misma el enfriamiento + `backoffLevel` de la conexión que falla, reflejando
  la rama de agentrouter con ámbito de conexión, y retorna; nunca se alcanzan
  el bloqueo por modelo ni la ruta genérica posterior.
- **Combo incluido**: al igual que la rama de agentrouter, el ámbito ignora
  deliberadamente la degradación `persistUnavailableState`/`isCombo` que un
  llamador combo aplica a un 429. Un bloqueo por modelo no es una forma más
  débil de este ámbito, sino la unidad equivocada: no dice nada sobre la IP
  agotada, por lo que la rotación combo seguiría desperdiciando una llamada con
  fallo garantizado por cada conexión hermana.
- **Seguridad de las conexiones hermanas**: nunca se sobrescribe una conexión
  hermana que ya esté en un estado terminal (banned/credits_exhausted) o en un
  enfriamiento más prolongado.
- **Lista de permitidos exclusiva**: ampliar `EGRESS_BUCKETED_LOCK_PROVIDERS` es
  una decisión explícita del responsable; no hay integración genérica (patrón
  #10334/#10419). La consulta de conexiones hermanas utiliza esa misma lista de
  permitidos en lugar de repetirla como un literal SQL, de modo que ampliarla
  siga siendo un cambio de una sola línea.
- **Rotación de la IP de salida, en ambas direcciones**: la ventana de búsqueda
  (24h) es mucho más amplia que el TTL de la caché de IP de salida (5 min), por
  lo que «última IP conocida» es información histórica, no el estado actual. Si
  el proxy de una conexión rotó dentro de la ventana, el bloqueo puede **no
  detectar** una IP realmente compartida (la IP registrada es la nueva, no
  agotada) y, simétricamente, puede **enfriar una conexión hermana que desde
  entonces ya haya rotado** y dejado de usar la IP agotada. El segundo caso le
  cuesta a esa conexión hermana una ventana de enfriamiento; ambos se aceptan
  como limitaciones de mejor esfuerzo de una búsqueda basada en el historial.
- **Coste**: dos recorridos acotados de `proxy_logs` (filtrados por ventana
  mediante `idx_pl_timestamp`), únicamente con la frecuencia de los errores 429. Sin índice nuevo (migración 134, YAGNI). Medido en una copia de tamaño
  moderado de una base de datos con tráfico real; una instancia de alto
  rendimiento conserva proporcionalmente más filas en la misma ventana.

---

## Otras funciones de resiliencia

- **19 estrategias de enrutamiento** (prioridad, ponderado, round-robin, retransmisión de contexto, llenar primero, p2c, aleatorio, menos usado, optimizado por costes, consciente del reinicio, ventana de reinicio, margen disponible, aleatorio estricto, automático, lkgp, optimizado por contexto, optimizado para caché, fusión, canalización) — consulta [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Enrutamiento consciente del reinicio** (v3.8.0) — prioriza las conexiones según el tiempo de reinicio de la cuota.
- **Degradación del modo en segundo plano** — `background: true` de la Responses API se degrada al modo síncrono con una advertencia.
- **Detección dinámica del límite de herramientas** — reduce el uso de proveedores cuando se alcanzan los límites de cantidad de herramientas.
- **Respaldo de emergencia** — controlado por `OMNIROUTE_EMERGENCY_FALLBACK`; los operadores pueden modificarlo desde la página de indicadores de funciones sin reiniciar.

---

## Depuración

- Las respuestas de combinación ponderada `503 all_targets_cooling_down` (con `Retry-After` establecido y `diagnostics.excluded` enumerando cada destino con `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → el grupo está configurado y conectado; simplemente, todos los destinos están excluidos por un temporizador de resiliencia. La advertencia `[COMBO] Weighted selection: every target excluded before dispatch — …` indica los motivos y los segundos restantes. Un `404 no_executable_targets` de la misma combinación significa que no intervino ningún temporizador de resiliencia (no hay nada que ejecutar o todas las cuentas fallaron la comprobación de disponibilidad). Implementado en `open-sse/services/combo/pinRecovery.ts` a partir de las exclusiones recopiladas en `targetResolution.ts`.
- Se omiten todas las claves de un proveedor → compruebe tanto el estado del disyuntor como `rateLimitedUntil`/`testStatus` de cada conexión.
- Proveedor excluido permanentemente después de la ventana de restablecimiento → el código lee el valor `state` sin procesar en lugar de `getStatus()`/`canExecute()`.
- Una clave falla, pero las demás deberían funcionar → priorice el tiempo de espera de la conexión sobre el disyuntor.
- Solo falla un modelo → priorice el bloqueo del modelo sobre el tiempo de espera de la conexión.
- El estado debería recuperarse automáticamente, pero no lo hace → compruebe si hay una marca de tiempo futura y una ruta de lectura que actualice el estado expirado. Los estados permanentes requieren cambios manuales.

---

## Huellas digitales TLS y sigilo

El sigilo específico de cada proveedor (JA3/JA4, CCH, ofuscación) se documenta por separado; consulta `docs/security/STEALTH_GUIDE.md` (git; no se compila en `/docs`).

---

## Pruebas de resiliencia (Fase 8 · Bloque C)

Además de las pruebas unitarias de la lógica de resiliencia, tres pruebas evalúan el entorno de ejecución bajo
condiciones reales de estrés y fallo (todas son de integración/nocturnas; ninguna bloquea los PR):

| Prueba               | Descripción                                                                                                                                                                                                                 | Ejecución                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Caos                 | Un nodo ascendente simulado inyecta latencia/restablecimientos/tiempos de espera/errores 503 reales; valida que el disyuntor se abra/recupere y que `checkFallbackError` clasifique el error 503 como respaldo recuperable. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Crecimiento del heap | ~500 flujos por `createSSEStream` con `--expose-gc`; falla si el heap supera el límite máximo (protección contra OOM #3069).                                                                                                | `npm run test:heap`                       |
| Prueba prolongada k6 | Carga sostenida contra `/api/monitoring/health`; umbrales de p95/errores.                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (nocturna) |

Orquestadas por `.github/workflows/nightly-resilience.yml` (cron + ejecución manual). En la configuración
predeterminada de `test:integration`, las pruebas de caos y heap se omiten automáticamente (sin `RUN_CHAOS_INT`/`--expose-gc`).

---

## Véase también

- [Guía de arquitectura](./ARCHITECTURE.md) — Arquitectura del sistema y funcionamiento interno
- [Guía del usuario](../guides/USER_GUIDE.md) — Proveedores, combos, integración con la CLI
- [Motor de combos automáticos](../routing/AUTO-COMBO.md) — Puntuación de 16 factores, paquetes de modos
