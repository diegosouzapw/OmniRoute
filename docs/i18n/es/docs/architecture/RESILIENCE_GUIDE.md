# Resilience Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute tiene tres mecanismos de resiliencia distintos pero relacionados. Cada uno tiene un alcance y un propósito diferentes. Mantenlos separados al depurar el comportamiento de enrutamiento.

![modelo de resiliencia de 3 capas](../diagrams/exported/resilience-3layers.svg)

> Fuente: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker de proveedor

**Alcance:** proveedor completo (p. ej., `glm`, `openai`, `anthropic`).

**Propósito:** dejar de enviar tráfico a un proveedor que está fallando repetidamente a nivel de servicio ascendente (upstream).

**Implementación:**

- Clase principal: `src/shared/utils/circuitBreaker.ts`
- Integración: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado: `GET /api/monitoring/health`
- API de restablecimiento: `POST /api/resilience/reset`
- Envoltorios: `open-sse/services/accountFallback.ts`
- Tabla de BD: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — se permite el tráfico normal
- `DEGRADED` — el tráfico sigue permitido, pero se están rastreando fallos elevados del proveedor; vuelve a `CLOSED` tras suficientes éxitos, tras una prueba de conexión válida, o después de la retención `OPEN` más larga para el último tipo de fallo (su valor `cooldownByKind`, o en su defecto `resetTimeout`, × `maxBackoffMultiplier`, con un mínimo de un cooldown) sin un nuevo fallo
- `OPEN` — proveedor bloqueado temporalmente; el enrutamiento combo lo omite
- `HALF_OPEN` — el tiempo de espera de restablecimiento ha transcurrido; se permite una solicitud de sondeo

**Valores predeterminados configurables (`open-sse/config/constants.ts`, expuestos en Panel → Configuración → Resiliencia):**

| Clase   | Se degrada a los | Se abre a los | Tiempo de restablecimiento |
| ------- | ---------------- | ------------- | -------------------------- |
| OAuth   | 5 fallos         | 8 fallos      | 60s                        |
| API-key | 7 fallos         | 12 fallos     | 30s                        |
| Local   | derivado         | 2 fallos      | 15s                        |

`degradationThreshold` controla cuándo un proveedor entra en `DEGRADED`; `failureThreshold` controla cuándo se abre y se omite. Los perfiles de proveedor local aún no están expuestos en la página de configuración de Resiliencia.

**Códigos de disparo:** solo estados a nivel de proveedor `[408, 500, 502, 503, 504]`. NO se dispara por errores a nivel de cuenta (la mayoría de los 401/403/429 — esos pertenecen al cooldown o al bloqueo).

**Recuperación diferida:** cuando `OPEN` expira, `getStatus()`, `canExecute()`, `getRetryAfterMs()` actualizan el estado a `HALF_OPEN`. Las mismas lecturas (y el siguiente fallo) hacen decaer un `DEGRADED` obsoleto de vuelta a `CLOSED`. No se necesita ningún temporizador en segundo plano.

---

### Cooldown global de proveedor optativo (window gate)

Una cuarta capa, **optativa** (`PROVIDER_COOLDOWN_ENABLED`, predeterminada en **desactivada**), mantiene una memoria entre solicitudes de los proveedores que fallan en `open-sse/services/providerCooldownTracker.ts`, consultada por la resolución de destinos de combo para que las solicitudes combo consecutivas dejen de recorrer de nuevo un proveedor que acaba de fallar. Las entradas a nivel de proveedor respetan el window gate de `PROVIDER_PROFILES`:

| Perfil  | se dispara tras (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | se enfría durante (`providerCooldownMs`) |
| ------- | -------------------------------------------: | ------------------------------------: | ---------------------------------------: |
| OAuth   |                                         `10` |                               `15min` |                                   `5min` |
| API key |                                         `15` |                               `30min` |                                  `10min` |

Por debajo del umbral, el proveedor **no** se considera en enfriamiento; un éxito limpia la ventana. Las entradas a nivel de conexión (`provider:connectionId`) mantienen en su lugar el backoff exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Anulaciones: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Protección contra regresiones: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Enfriamiento de conexión (Connection Cooldown)

**Ámbito:** una única conexión/cuenta/clave de proveedor.

**Propósito:** omitir una clave defectuosa mientras las demás conexiones del mismo proveedor siguen atendiendo.

**Implementación:**

- Marcar como no disponible: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selección: `getProviderCredentials*` en el mismo archivo
- Cálculo del enfriamiento: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configuración: `src/lib/resilience/settings.ts`

**Campos por conexión:**

- `rateLimitedUntil` — marca de tiempo hasta que expira el enfriamiento
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de retroceso exponencial

**Enfriamientos predeterminados:**

- Base OAuth: 5 s
- Base de clave API: 3 s
- 429 de clave API: prefiere las cabeceras upstream `Retry-After`/de reinicio/texto de reinicio analizable
- Retroceso: `baseCooldownMs * 2 ** failureIndex`

**Protección contra el efecto manada (thundering herd):** evita que fallos concurrentes extiendan demasiado el enfriamiento o incrementen dos veces `backoffLevel`.

**Los 429 por límite de concurrencia no suben la escalera de retroceso.** Un `429` cuyo cuerpo
informa de un límite de concurrencia ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) significa que la cuenta está sana pero ocupada.
`checkFallbackError()` devuelve el motivo `concurrency_limited`: conmuta a la siguiente
conexión de inmediato, enfría esta durante un `CONCURRENCY_LIMIT_COOLDOWN_MS` fijo (1 s) o la
sugerencia de reintento del upstream, mantiene `backoffLevel` sin cambios y establece `skipProviderBreaker`.
Un cuerpo de cuota explícita sigue teniendo prioridad, por lo que un cuerpo que también coincida con un
patrón de cuota sigue siendo un veredicto de cuota. Detección: `looksLikeConcurrencyLimit()` en
`src/shared/utils/classify429.ts`; veredicto: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (el `FailureKind` del disyuntor) no cambia y sigue leyendo `rate_limit` para estos cuerpos.

**Los bloqueos de contenido del stream no enfrían la cuenta.** Cuando el vigilante de bloqueo de
contenido (`open-sse/utils/streamHandler.ts`) abandona un stream que no envió salida del modelo a
tiempo, `markAccountUnavailable()` registra el error en la conexión pero no establece
enfriamiento: el bloqueo pertenece a esa solicitud, la mayoría de las veces un turno de razonamiento
largo sin salida todavía. Los operadores pueden reactivarlo con
`resilienceSettings.streamStallCooldown.enabled` (predeterminado `false`).

**Las tramas de razonamiento reinician el presupuesto de bloqueo de contenido.** Un modelo de
razonamiento puede pensar durante minutos antes de su primer token visible: Claude transmite tramas
`thinking_delta` cuyo texto de pensamiento puede estar vacío, y la Responses API transmite un elemento
de razonamiento tras otro. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconoce
estas tramas, y el vigilante reinicia su presupuesto con cada una en lugar de cancelar el
turno. Siguen sin ser salida del modelo, por lo que un turno que termina solo con razonamiento sigue
informándose como vacío, y un turno que deja de razonar y solo envía heartbeats sigue activando
el vigilante.

Las tramas binarias `reasoningContentEvent` de Kiro con una firma no vacía preservan esta
actividad de razonamiento a través del ejecutor como un delta `reasoning_content` vacío. La firma
no se reenvía. Los metadatos, las tramas incompletas y las firmas vacías no reinician el
presupuesto de contenido; el tiempo de espera de stream activo independiente y la cancelación del
cliente siguen aplicándose (`open-sse/executors/kiro/reasoning.ts`).

**Estados terminales (NO son enfriamientos):**

- `banned` — establecido por la detección de palabras clave prohibidas / cuentas baneadas (véase [BAN_DETECTION](../security/BAN_DETECTION.md)), y por tres rechazos upstream consecutivos por solicitud (`request_rejected`, p. ej. el 403 "Request not allowed" de Anthropic OAuth — `open-sse/services/requestRejectedStreak.ts`); un único rechazo solo enfría la conexión
- `expired` (transita a terminal tras reintentos acotados — `EXPIRED_RETRY_MAX = 3` con retroceso exponencial — de modo que los errores transitorios de OAuth puedan autocurarse antes de que la cuenta se desactive permanentemente)
- `credits_exhausted`

Estos persisten hasta que cambian las credenciales o un operador los restablece. No sobrescribas los estados terminales con estado de enfriamiento transitorio.

**Recuperación perezosa (lazy):** cuando `rateLimitedUntil` ya pasó, la conexión vuelve a ser elegible. Tras un uso exitoso, `clearAccountError()` limpia todos los campos de error.

### Muro de uso de Claude OAuth: carril de menor prioridad + restablecimiento del límite de sesión

**Ámbito:** una conexión de suscripción de Claude (OAuth). Ambas funciones son **opt-in por
conexión** (Editar conexión → sección Claude → `lowPriorityMode` / `autoLimitReset` en
`providerSpecificData`, ambas desactivadas por defecto) y reflejan los comandos `/low-priority` y
`/limit-reset` de Claude Code (contrato de red capturado de Claude Code 2.1.263).

**Implementación:**

- Máquina de estados + clasificación de respuestas: `open-sse/services/claudeLowPriority.ts`
- Cliente de estado/reclamación de restablecimiento: `open-sse/services/claudeLimitReset.ts`
- Hook del ejecutor (inyección de cabeceras + reintento en la misma cuenta): `open-sse/executors/base.ts::execute()`
- Persistencia del opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Disparador:** el muro de uso de 5 horas — un `429` cuyas cabeceras llevan
`anthropic-ratelimit-unified-status: rejected` y, cuando la cuenta es elegible,
`anthropic-ratelimit-unified-slow-offer: treatment`. No se envía nada antes de ese primer 429 del
muro; un 429 de ráfaga sin cabeceras unificadas pasa por la ruta de enfriamiento normal.

**Carril de menor prioridad** (`lowPriorityMode`):

- Ante el 429 de muro, el ejecutor acepta la oferta y reintenta inmediatamente la **misma**
  cuenta con `anthropic-usage-limit: slow`; el carril permanece activo hasta el
  `anthropic-ratelimit-unified-reset` anunciado (+60 s de gracia) y cada solicitud en esa
  ventana lleva el encabezado. El 429 interceptado nunca llega a `handleChatCore`, por lo que
  la conexión **no** entra en cooldown ni se rota.
- `anthropic-ratelimit-unified-slow-status` en respuestas posteriores: `active` /
  `not_needed` mantienen el carril; `slot_busy` (429) o un `529` esperan el
  `anthropic-ratelimit-unified-slow-retry-after` del servidor (predeterminado 20 s, acotado a
  5–600 s, jitter de ±30 %) y reintentan, limitado por
  `anthropic-ratelimit-unified-slow-max-wait` (predeterminado 20 min, acotado a 1 min–6 h) —
  pasado ese tiempo el carril termina y un enfriamiento de 10 minutos bloquea la
  reaceptación. La espera está además limitada por lo que resta del timeout de inicio de
  upstream propio de la solicitud (`resolveFetchStartTimeout`, 10 min de forma
  predeterminada) menos un margen de 5 s: sin ese tope, la espera máxima predeterminada de
  20 minutos sobreviviría a la solicitud y la pausa se abortaría a mitad de la espera,
  mostrando un `TimeoutError` en lugar del final ordenado `max_wait` + enfriamiento.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, un reinicio de la ventana de
  5 h, o `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (que lo finaliza
  como `extra_usage` en cualquier estado, ya que el excedente de pago ahora cubre el muro)
  terminan el carril; la respuesta fluye entonces a la ruta normal de cooldown.
  `budget_exhausted` se recuerda hasta el restablecimiento del presupuesto anunciado
  (≤ 8 días).
- La comprobación del muro se ejecuta después de los reintentos internos del propio ejecutor
  provocados por errores 400 (edición de contexto, límites de thinking/effort,
  autoaprendizaje de parámetros), por lo que un 429 de muro que solo aparezca en uno de esos
  reintentos sigue siendo interceptado en lugar de llegar a la ruta de cooldown.
- El estado se mantiene en memoria por conexión (un reinicio cuesta un 429 de muro adicional
  para volver a aceptarlo).

**Restablecimiento del límite de sesión** (`autoLimitReset`, se intenta antes que el carril cuando ambos están activados):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloque
  `juniper_tide`; cuando `arm: "reset"` y `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` con
  `{ "program": "juniper_tide" }` (UUID de la organización obtenido de
  `providerSpecificData.organizationUUID`, con bootstrap como respaldo).
- `result: reset|not_limited` → la solicitud se reintenta a velocidad completa (sin el
  encabezado slow). `already_used` / `not_offered` memorizan `next_available_at`
  (predeterminado una semana); cualquier fallo aplica un retroceso de 15 minutos. El
  restablecimiento es una vez por semana y sigue contando para el límite semanal.

Guardas de regresión: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinidad de sesión (#7274)

**Ámbito:** una sesión de cliente (encabezado `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) fijada a una conexión, para **cualquier** proveedor.

**Propósito:** mantener a un agente multiturno (Claude Code, aider, agentes personalizados) en la misma cuenta a lo largo de las solicitudes, reduciendo la pérdida de contexto entre cuentas y los 429 repetidos de arranque en frío en proveedores con estado de sesión por cuenta.

**Implementación:**

- Resolución del TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selección/creación de la fijación: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extracción del encabezado (genérica, cualquier proveedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabla de fijaciones persistida: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Configuración: `sessionAffinityTtlMs` (TTL global en ms, `0` lo desactiva) — `src/lib/db/settings.ts`. Renombrado desde el `codexSessionAffinityTtlMs` exclusivo de Codex por la migración `124_generic_session_affinity_ttl.sql`, que traslada cualquier TTL de Codex configurado previamente como el nuevo valor predeterminado.

Antes de #7274, `resolveSessionAffinityTtlMs()` devolvía forzosamente `0` para todo proveedor excepto `codex`, por lo que la configuración del TTL (y los encabezados de sesión) no tenían efecto en ningún otro lugar, aunque el mecanismo de fijación y la extracción de encabezados ya eran agnósticos al proveedor. La corrección eliminó ese retorno anticipado; el TTL ahora se aplica uniformemente a todos los proveedores una vez configurado globalmente por encima de `0`.

Los tres encabezados de afinidad de sesión nunca se reenvían al upstream — los ejecutores construyen sus propios encabezados de upstream desde cero en lugar de pasar los encabezados del cliente, por lo que esto sigue siendo solo un id de correlación interno.

### Concesiones exclusivas de conexión en sesiones gestionadas

**Ámbito:** un cliente/sesión HTTP gestionado activo posee una conexión OmniRoute elegible.

**Propósito:** proporcionar propiedad exclusiva y duradera de la conexión para clientes que
necesitan una barrera de enrutamiento estricta entre solicitudes. Esto difiere de la afinidad
de sesión, que es una preferencia de continuidad blanda: una concesión exclusiva persiste el
estado del ciclo de vida en SQLite, impone la unicidad global del propietario activo y de la
conexión activa, y rechaza una generación obsoleta antes del despacho al proveedor.

La función es opt-in por clave de API. Una clave gestionada debe tener el ámbito
`lease:exclusive` y una lista `allowedConnections` explícita y no vacía. Cualquier cliente
HTTP puede usar el endpoint del ciclo de vida; no se requiere nombre de cliente, user-agent,
proveedor, método OAuth ni modelo. La concesión posee una conexión, no un modelo, por lo que
un cambio de modelo mantiene el vínculo mientras la conexión siga siendo elegible de forma
ordinaria. Las reglas normales de modelo, cuota, salud, cooldown y lista de permitidos siguen
siendo las que mandan y pueden transicionar la misma generación a otra conexión elegible
libre.

El ciclo de vida es `POST /api/v1/session-leases` con las acciones JSON `acquire`, `renew` y `release`.
Las solicitudes de inferencia gestionada presentan el valor opaco `X-OmniRoute-Lease-Owner` y el
valor exacto de `X-OmniRoute-Lease-Generation`. El propietario utiliza `vlo_` seguido de 43
caracteres base64url; solo se almacena su hash SHA-256. Cada barrera (fence) de despacho final
también vincula el ID de la clave de API autenticada y el ID de la conexión activa. Los encabezados
de control de leases se eliminan de los registros, de las instantáneas de solicitudes retenidas y de
los encabezados del ejecutor upstream.

Si el enrutamiento ordinario tiene candidatos gestionados elegibles pero todos los candidatos libres
están ocupados por un lease activo ajeno, OmniRoute devuelve HTTP `429`, un código de capacidad de
leases no disponible, un estado de espera de capacidad y un `Retry-After` acotado derivado de la
expiración relevante más próxima. La elegibilidad vacía ordinaria no es contención de leases y
mantiene su semántica de error de enrutamiento existente.

Los mecanismos relacionados permanecen separados:

- La ocupación de sesiones OAuth es una distribución suave, local al proceso, para cuentas OAuth.
- Los semáforos de cuentas otorgan permisos de concurrencia de solicitudes y finalizan cuando una solicitud se completa.
- Los leases exclusivos de sesiones gestionadas son una propiedad duradera del ciclo de vida con una barrera de generación.

---

## 3. Bloqueo de modelos

**Ámbito:** tripleta proveedor + conexión + modelo.

**Ámbito de la clave según el estado:** el estado del fallo decide a qué clave se escribe un bloqueo (`resolveLockoutScope()` en `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — una señal de cuota o de derechos de acceso — bloquean la **familia de cuota**:
  para codex, todo el ámbito `codex` / `spark` (cada modelo `gpt-5*` de la
  conexión); para otros proveedores, `getQuotaScopedModelForProvider()`.
- `404` bloquea solo el modelo en cuestión (`getModelLockKey()` reduce el ámbito de `not_found`).
- Cualquier otro estado — fallos de transporte/servidor `5xx` y el propio
  `502` sintetizado por OmniRoute a partir de la validación de calidad — bloquea
  únicamente la tupla **exacta** proveedor/conexión/modelo. Un flujo defectuoso
  en un modelo no es prueba de nada sobre la cuota de la cuenta; antes de esta
  regla, una única respuesta vacía en `codex/gpt-5.6-luna` sacaba del enrutamiento
  todos los modelos `gpt-5*` de esa conexión durante 2–30 min (de forma escalada)
  aunque su cuota no se hubiera visto afectada.
- Una opción `scope` explícita del llamante siempre prevalece (Antigravity pasa `"exact"`).

**Propósito:** evitar deshabilitar toda una conexión cuando solo un modelo no está disponible o tiene la cuota limitada.

**Ejemplos:**

- Proveedores con cuota por modelo que devuelven 429
- Proveedores locales que devuelven 404 por un modelo ausente
- Fallos de permisos de modo/modelo específicos del proveedor (p. ej., los modos de Grok)

**Implementación:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel de enfriamientos de modelos (v3.8.0)

IU: Configuración → Enfriamientos de modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Enumera los bloqueos activos con: proveedor, conexión, modelo, motivo y expiresAt. Los operadores pueden reactivar manualmente un modelo desde la tarjeta.

**API REST:**

- `GET /api/resilience/model-cooldowns` — enumera los bloqueos activos
- `DELETE /api/resilience/model-cooldowns` — reactivación manual. Cuerpo: `{provider, connection, model}`. Autenticación: management.

### Gestor de enfriamientos

IU: Supervisión → Gestor de enfriamientos (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Una única página para cada conexión que está fuera del enrutamiento por un motivo
transitorio, en lugar de abrir la página de cada proveedor. Enumera los
enfriamientos de conexión, los bloqueos de modelos y los estados terminales;
permite limpiarlos por conexión, para una selección o para todas las conexiones
de un proveedor; y edita las reglas de enfriamiento más ajustadas:
`streamStallCooldown.enabled` y el enfriamiento base `connectionCooldown` de
OAuth / clave de API, así como los pasos máximos de retroceso (se guardan mediante
`PATCH /api/resilience`). Los estados terminales (`banned`, `expired`,
`credits_exhausted`) se enumeran pero nunca se limpian aquí.

**API REST** (`src/lib/resilience/cooldownManager.ts`, autenticación: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexiones con su estado,
  enfriamiento restante, nivel de retroceso, último tipo de error y bloqueos de
  modelos (sin credenciales)
- `POST /api/resilience/cooldowns` — cuerpo `{connectionIds: string[]}` o
  `{all: true, provider?}`; devuelve `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### IU de configuración de bloqueos + recuperación por decaimiento tras éxitos (v3.8.23)

El bloqueo de modelos pasó de ser un comportamiento fijo y siempre activo a una
función opcional (opt-in) totalmente configurable, con su propia tarjeta de
configuración y una vía de recuperación autorregenerativa.

**Tarjeta de configuración:** Configuración → Bloqueo de modelos
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Es **distinta** de la tarjeta de solo lectura `ModelCooldownsCard` mencionada
arriba (que solo _enumera_ los bloqueos activos): la nueva tarjeta _configura los
parámetros_. Los valores predeterminados se definen en
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Parámetro               | Valor predeterminado             | Significado                                                                              |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interruptor maestro: el bloqueo de modelos está **desactivado de forma predeterminada**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Estados del proveedor upstream que cuentan como un fallo con ámbito de modelo.           |
| `baseCooldownMs`        | `120_000` (120 s)                | Duración inicial del bloqueo para el primer fallo.                                       |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Tope del enfriamiento escalado.                                                          |
| `maxBackoffSteps`       | `10`                             | Número máximo de pasos de escalado del retroceso exponencial.                            |
| `useExponentialBackoff` | `true`                           | Indica si los fallos repetidos escalan el enfriamiento de forma exponencial.             |

Los ajustes se conservan a través del almacén de configuración habitual y se
validan mediante el esquema de configuración de resiliencia; la tarjeta acota
`baseCooldownMs`/`maxCooldownMs`
(con `maxCooldownMs ≥ baseCooldownMs`) y `maxBackoffSteps`.

**Recuperación por decaimiento tras éxitos:** la recuperación **no** consiste
únicamente en la expiración del temporizador. Una respuesta correcta va
reduciendo el contador de fallos del modelo, de modo que un modelo que se
recuperó a mitad de la ventana deja de escalar (y se desbloquea) antes de que
expirara su temporizador. Cuando un objetivo de combo responde correctamente,
`open-sse/services/combo.ts` llama a `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que **reduce a la mitad** el
`failureCount` almacenado (`Math.floor(failureCount / 2)`); cuando llega a `0`,
la entrada de bloqueo se elimina por completo. Su contraparte,
`recordModelLockoutFailure()`, incrementa el contador (y escala el enfriamiento)
ante fallos dentro de la ventana de escalado. Este decaimiento por éxitos se suma
a la simple expiración del temporizador: cualquiera de las dos vías puede
reactivar un modelo.

**Estado:** los bloqueos se mantienen **en memoria** (`Map`s por proceso de
`ModelLockoutEntry` indexados por `provider:connectionId:model`; los bloqueos de
ámbito exacto, por `provider:connectionId:exact:model`) y no se conservan en
la base de datos: se pierden al reiniciar. Los _ajustes_ sí se conservan; el
_estado_ de los bloqueos activos es efímero.

---

## 4. Control de concurrencia en cuota compartida (v3.8.36)

Las cuentas de suscripción (GLM, MiniMax, etc.) a menudo aceptan solo ~1–3 solicitudes concurrentes; superar ese límite provoca respuestas 429 y periodos de enfriamiento. Esto es especialmente crítico en **cuota compartida** (`qtSd/…`), donde varias API keys comparten una misma cuenta upstream. Tres capas impiden que una cuenta compartida se sature.

### Límite de concurrencia por conexión (`max_concurrent`)

Cada conexión de proveedor puede declarar un `max_concurrent`
(`provider_connections.max_concurrent`, configurado en el modal de conexión / API / BD).
Déjalo vacío para no aplicar límite. Este es el único parámetro que impulsa la capa de
serialización descrita a continuación — ajústalo a la concurrencia real de la cuenta (p. ej., GLM ~1, MiniMax ~2).

Límites de concurrencia por modelo (`modelConcurrency`)

Una conexión puede además declarar límites de concurrencia exactos por modelo
dentro de su mapa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Configúralo en el modal de conexión (**Rate limit overrides → Per-model
concurrency caps**, un `model=cap` por línea) o mediante
`PATCH /api/providers/[id]` con la misma estructura JSON. Semántica clave:

- **Concurrencia a nivel de conexión vs. específica de modelo:** `maxConcurrent` sigue siendo el límite compartido
  a nivel de conexión. Cuando ambos aplican, ambas compuertas se adquieren
  de forma atómica en la misma compuerta compuesta
  (`global → provider → account → model`); el comportamiento efectivo es el
  límite aplicable más estricto.
- **Coincidencia exacta de la clave de modelo:** la clave es la cadena de modelo que se pasa al
  ejecutor tras la resolución del enrutamiento — normalmente el id de modelo upstream sin prefijos
  (`glm-5`), no un alias del lado del cliente `provider/model` (`zai/glm-5` no
  coincide con `glm-5`). Los valores son límites de solicitudes concurrentes en enteros positivos.
- **Encolamiento local, sin descubrimiento:** las solicitudes en exceso se encolan localmente con
  la semántica existente de cola/tiempo de espera (errores de admisión tipados `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute no descubre ni
  infiere la política upstream — aplica exactamente los límites que el operador
  configuró. Una compuerta de modelo saturada nunca deshabilita el proveedor ni
  crea un bloqueo permanente del modelo; el comportamiento upstream de 429/cooldown/fallback
  sigue siendo el mecanismo de contención ante errores.
- **Ámbito por conexión y por proceso:** los límites son por conexión de base de datos
  y se mantienen en memoria, por lo que dos conexiones que reutilizan la misma API key upstream
  no se coordinan entre sí.
- **Sin configurar significa sin cambios:** omitir el mapa (o dejar en blanco el campo del
  panel) no añade ninguna compuerta de modelo. Ejemplo de configuración sin
  imponer un límite universal de proveedor:

```text
glm-5=1
glm-4.7=3
```

### Serialización de solicitudes en cuota compartida

Cuando un despacho de cuota compartida se dirige a una conexión que declara un
`max_concurrent` positivo, las solicitudes concurrentes a esa **cuenta** se serializan mediante un
semáforo por conexión (clave `qsconn:<connectionId>`): las solicitudes en exceso **esperan en
la cola** en lugar de saturar la cuenta. Es **fail-open** — una cola saturada
o un tiempo de espera agotado continúa sin slot en lugar de rechazar una solicitud
despachable. Se activa en **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activado por defecto).
Sin un límite `max_concurrent`, el comportamiento no cambia.

> La compuerta de enrutamiento de cuota compartida (`selectQuotaShareTarget`, DRR + P2C) es en sí misma
> fail-open y solo _desprioriza_ una conexión que alcanzó su límite — con un
> pool de una sola conexión no puede limitar de forma estricta, por lo que este semáforo es lo que realmente
> contiene la saturación.

### Reintento consciente del cooldown en combos

Para cada estrategia de combo (cuando está habilitada), una solicitud que cristalizaría en un 429
por un cooldown transitorio CORTO espera a que pase y la vuelve a despachar en lugar de
devolver el 429 — esto cubre las ventanas TPM/RPM de la clase Gemini (~60s de retry-after)
en combos de varios modelos, p. ej., ambos objetivos de un combo de 2 modelos alcanzando un límite
de tasa por modelo. Acotado por `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) en **Settings → Resilience**. Nunca espera por `quota_exhausted`
(bloqueado hasta medianoche) ni por motivos de auth/not-found.

La misma compuerta cubre el caso previo al despacho (#16319): cuando todos los objetivos de un
combo se omiten antes de realizar cualquier intento porque su modelo se encuentra en un bloqueo
transitorio corto, la ruta de cero intentos espera a que expire el bloqueo bajo los mismos
límites y vuelve a despachar, en lugar de responder un
`503 ALL_TARGETS_SKIPPED` sin pistas. Cuando no se permite esperar (límite, intentos o presupuesto
agotados, o la función desactivada), la respuesta terminal se eleva a
`429 rate_limit_error` portando `retry_after` / `reset_at` desde la expiración de bloqueo transitorio
más temprana; los bloqueos por cuota, auth y not-found mantienen el 503 sin pistas.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Control de admisión de la cola de solicitudes (v3.8.49 · issue #6593)

**Alcance**: la cola local de limitación de tasa por proveedor+conexión (`open-sse/services/rateLimitManager.ts`, respaldada por Bottleneck), una capa por debajo de los tres mecanismos anteriores.

**`maxWaitMs` limita la espera en cola; `executionMaxWaitMs` limita la ejecución.**
Ambos están deliberadamente separados y ninguno alimenta al otro.

`resilienceSettings.requestQueue.maxWaitMs` es el **presupuesto de espera en cola**: cubre la espera por una ranura de proveedor y después la permanencia en estado QUEUED, y su temporizador se cancela en el momento en que el trabajo sale de QUEUED y comienza a ejecutarse (`rateLimitManager.ts`, `wrappedFn`). Una solicitud que lo excede nunca llega al upstream. Valor predeterminado: 30000 ms, proporcionado por `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` en `src/lib/resilience/settings.ts` y fijado por `tests/unit/ratelimit-admission-control-6593.test.ts`, de modo que un cambio en él pone esa prueba en rojo en lugar de dejar este párrafo silenciosamente desactualizado.

`resilienceSettings.requestQueue.executionMaxWaitMs` es lo que Bottleneck recibe como `expiration` del trabajo, cuyo temporizador solo se inicia después del despacho. Es una salvaguarda para ejecutores que no tienen un tiempo de espera de upstream propio, y se eleva hasta el tiempo de espera de inicio del fetch del propio ejecutor cuando este es mayor, de modo que no puede cortar una respuesta en curso saludable. Valor predeterminado: 600000 ms (10 min).

Alimentar el presupuesto de la cola en `expiration` es lo que antes mataba a los gateways no incrementales a mitad de vuelo —legítimamente funcionan durante minutos antes de los primeros bytes— y es la razón por la que una expiración se expone como `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mientras que el presupuesto de la cola lleva el código de tiempo de espera de cola. Se puede sobrescribir cualquiera de los dos mediante `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (entorno) o el panel (**Configuración → Resiliencia**). Ambos se acotan a 1 ms–24 h al normalizarse.

**Precedencia, para ambos:** la variable de entorno solo proporciona el _valor predeterminado_. Un valor persistido en `resilienceSettings.requestQueue` (panel / parche de API, almacenado en `key_value`) tiene prioridad sobre él, y un `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` por conexión tiene prioridad sobre ese. Por lo tanto, establecer la variable de entorno en un despliegue que ya tiene un valor persistido no cambia nada: borre o actualice la configuración persistida en su lugar.

La permanencia en cola está limitada por `maxWaitMs`; `maxQueueDepth`, más abajo, limita cuántos llamadores pueden estar en cola a la vez.

**Reintentos declarados en el cuerpo: espaciado frente a bloqueo.** Un cuerpo 429 puede indicar su propia espera (Gemini `RetryInfo.retryDelay`, texto "retry after Ns"), que `updateFromResponseBody` lee. Una espera que cabe en el `maxWaitMs` de la conexión es espaciado: el limitador vacía su reserva durante ese tiempo y las llamadas en cola se despachan cuando esta se rellena. Una espera más larga que `maxWaitMs` no es algo que la cola pueda aguantar: Gemini responde a una cuota diaria agotada con `retryDelay: "86399s"`. El `Retry-After` retransmitido en el 429 reconstruido (#16528) ya hace que el motor de fallback bloquee el modelo durante esa ventana, pero pausar también el limitador por ello seguiría bloqueando cualquier llamada que llegue a la clave antes de tiempo (después de un reinicio de resiliencia, por ejemplo) durante todo el `maxWaitMs`. Cuando tal espera proviene de un detalle `RetryInfo` tipado de Google (la procedencia `google_rpc_retry_info`) y el limitador de la clave ya tiene como ámbito el modelo (véase `getLimiterKey`), el 429 se convierte en su lugar en un bloqueo del modelo en esa conexión (`lockModelForLongBodyRetry` en `open-sse/services/rateLimitManager/bodyRetryPause.ts`, con un tope de 24 h), y el limitador queda sin pausar. La selección de cuenta se salta esa clave por ese bloqueo mediante `isModelLocked()`, y lo mismo hace la compuerta de pre-despacho del combo para los destinos fijados a la conexión. En antigravity, cuyo limitador es por familia de cuotas, el bloqueo recae sobre el modelo exacto, como sus otros bloqueos de cuota. El nombre que el cliente pidió también se bloquea cuando un alias lo resolvió a ese modelo, porque esas comprobaciones usan el nombre solicitado; se bloquea de forma exacta (`lockExactModel`), de modo que un alias que cruza una familia de cuotas de antigravity o un ámbito de codex nunca bloquea el suyo propio. Una pista en prosa, un `retryDelay` sin tipo o un limitador compartido por toda la conexión mantiene la pausa. Cuando el limitador que la ruta 429 acaba de reconstruir sí se pausa, un llamador cuyo tiempo restante en cola termina antes que la pausa es rechazado de inmediato con el código de tiempo de espera de cola (`checkLimiterPause`), en lugar de esperar a que ese tiempo expire; el fin registrado se ancla antes de que se construya el limitador, donde Bottleneck inicia su reloj de refresco, y cualquier cambio posterior en la reserva lo olvida. Cubierto por `tests/unit/rate-limit-long-body-retry-lockout.test.ts` y `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — límite de admisión opcional (nuevo).** `resilienceSettings.requestQueue.maxQueueDepth` limita cuántas solicitudes pueden estar en cola (aún no despachadas) para un proveedor+conexión a la vez. Cuando la cola ya contiene `maxQueueDepth` solicitudes, una nueva solicitud se rechaza rápidamente con un error tipado `code: "RATE_LIMIT_QUEUE_FULL"` **antes** de que llegue siquiera a `limiter.schedule()`, de modo que el rechazo es barato y ocurre antes de cualquier trabajo posterior de compresión de prompts / traducción para esa solicitud. Valor predeterminado `0` = desactivado, lo que preserva el comportamiento existente de cola ilimitada; acotado a 0–100000. Se sobrescribe mediante `RATE_LIMIT_MAX_QUEUE_DEPTH` (entorno) o `resilienceSettings.requestQueue.maxQueueDepth` (panel/parche de API).

La comprobación de admisión en sí es una función pura (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), por lo que se puede probar de forma unitaria sin un limitador Bottleneck real.

> El RFC que abrió #6593 también propuso un flag `bypassCompressionOnRateLimit`.
> El pipeline `open-sse/services/compression/` de este repositorio es
> compresión de prompt/contexto en la solicitud saliente al LLM (`chatCore.ts`,
> alrededor del bloque `resolveCompressionSettings`/`selectCompressionStrategy`),
> no compresión de respuestas HTTP sobre cuerpos 429 sintetizados — no existe
> una ruta de código correspondiente para un flag de bypass literal. Ese paso
> de compresión de prompt también se ejecuta actualmente _antes_ de
> `withRateLimit()` en el pipeline de solicitudes, por lo que reordenarlo para
> omitirlo ante un rechazo por cola llena es un cambio separado y mayor que el
> alcance de este issue; intencionalmente **no** se implementó aquí y se deja
> como trabajo posterior si la ganancia de ahorro de CPU justifica el riesgo
> de reordenar.

### Red de seguridad de activación automática de límite de tasa y protección de conexiones (`rateLimitProtection`)

**Red de seguridad de activación automática** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, predeterminado `true`):
De forma predeterminada, OmniRoute habilita automáticamente la protección de cola de límite de tasa para todas las conexiones activas de proveedores con clave API (`getProviderCategory(provider) === "apikey"`). Esto garantiza que las solicitudes entrantes hacia claves API ascendentes sensibles a límites de tasa se encolen y se regulen a través de Bottleneck en lugar de irrumpir en ráfagas que provocan errores 429 ascendentes. La red de seguridad puede anularse mediante la variable de entorno `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` la desactiva, `true`/`1`/`on` la fuerza a activarse), que tiene prioridad sobre la configuración persistida del panel (**Configuración → Resiliencia** / `PATCH /api/resilience`).

**Semántica de `rateLimitProtection` por conexión:**
La protección de límite de tasa por conexión se registra mediante el campo booleano `rateLimitProtection` en las conexiones de proveedores (persistido como `rate_limit_protection` en SQLite):

- **Activada explícitamente (`rateLimitProtection === true`)**: La protección de límite de tasa está explícitamente habilitada para esta conexión, independientemente de la categoría del proveedor o de si la red de seguridad de activación automática está activada.
- **Desactivada explícitamente (`rateLimitProtection === false`)**: Desactiva la protección explícita, pero **no** excluye a una conexión activa de clave API de la red de seguridad global de activación automática. En `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` y `undefined` son equivalentes: solo `rateLimitProtection === true` se trata como una anulación explícita. Si `rateLimitProtection` es `false` (o no está definido), una conexión activa de clave API aún cumple la condición de activación automática y permanece protegida por el límite de tasa.
- **Sin exclusión por conexión**: Un operador no puede expresar actualmente "esta única conexión activa de clave API debe ejecutarse sin protección de cola de límite de tasa" mientras mantiene la activación automática activa para las demás. Para ejecutar conexiones de clave API completamente sin colas de límite de tasa, la red de seguridad debe desactivarse globalmente (`RATE_LIMIT_AUTO_ENABLE=false` o `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Rutas de escritura admitidas:**

- **`POST /api/rate-limits`**: La ruta de escritura de gestión admitida para alternar `rateLimitProtection` de una conexión (`{ connectionId: string, enabled: boolean }`). Llamarla con `enabled: true` activa la protección explícita; llamarla con `enabled: false` elimina la protección explícita (aunque las conexiones activas de clave API permanecen cubiertas por la red de seguridad global si la activación automática está activada).
- **`PUT /api/providers/[id]`**: Deliberadamente **no** acepta ni modifica `rateLimitProtection` (#11278). Actualizar los metadatos de la conexión del proveedor mediante `PUT /api/providers/[id]` nunca cambiará el estado persistido de la protección de límite de tasa.

---

## 6. Vigilante de rendimiento de streams lentos (#9709)

La protección opcional `resilienceSettings.streamRecovery.throughputWatchdog` detecta
un upstream que sigue enviando chunks pero produce salida del asistente por debajo de
la tasa de salida útil configurada. Es deliberadamente distinto del timeout de inactividad:
los heartbeats y los metadatos no reinician ninguno de los dos temporizadores y no cuentan
como progreso. También es distinto del límite temporal estricto del intento (#9153), que
sigue siendo un techo de seguridad absoluto independientemente de la calidad de la salida.

El vigilante requiere un período de calentamiento seguido de una ventana deslizante completa
antes de poder abortar. Cuenta los deltas de texto de los eventos de salida de Chat Completions
y de la Responses API (una aproximación conservadora basada en bytes UTF-8), ignora los eventos
de solo uso y los eventos vacíos, y suspende la evaluación mientras hay eventos de llamada a
herramientas o de razonamiento en curso. Está desactivado por defecto y puede activarse con
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; la ventana, el calentamiento, la tasa mínima y la
salida medible mínima están acotados por la capa habitual de normalización de la configuración
de resiliencia.

Cuando está activado, un abort del vigilante se aplica únicamente al intento upstream activo.
Antes de cualquier byte visible para el cliente, la ruta existente de recuperación temprana en
la misma cuenta puede reabrir el intento. Después del commit, el stream nunca se reejecuta a
ciegas; solo el contrato existente de continuación segura a mitad de stream puede empalmar un
sufijo. La finalización sigue siendo de ejecución única, de modo que la contabilidad de uso y la
liberación del semáforo no se duplican.

---

## 7. Reexpresión del estado upstream (errores de cuota con estado incorrecto)

**Ámbito:** un gateway upstream que informa el agotamiento temporal de la cuota con el estado HTTP incorrecto.

**Propósito:** corregir un estado engañoso ANTES de la clasificación, de modo que los consumidores posteriores (el motor de fallback, la agregación de combos, la respuesta orientada al cliente) vean la verdadera naturaleza reintentable del fallo.

Algunos gateways señalan el agotamiento TEMPORAL de la cuota con un estado HTTP
no reintentable. `agentrouter.org` devuelve `403` (a veces `400`) con un cuerpo
en chino (`用户额度不足` / `额度不足`) en lugar del `429` estándar. Clientes como
Claude Code tratan el `403` como permanente y abortan la sesión, y sin corrección
el motor de fallback lo clasificaría como `AUTH_ERROR` en lugar de un evento
de cuota.

**Implementación:**

- Registro + comparador: `open-sse/config/upstreamStatusRestatement.ts` — una
  lista de reglas por proveedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), comparadas mediante `applyStatusRestatement()`.
- Punto de invocación: el bloque `providerFailure:` en `open-sse/handlers/chatCore.ts`
  (alrededor de la línea 3654), justo después de que `parseUpstreamError()` analice
  una respuesta upstream con un estado HTTP de error (`!providerResponse.ok`), y antes
  de que se ejecute cualquier clasificación, de modo que todos los consumidores
  posteriores vean el estado corregido. Los errores incrustados dentro de un flujo
  SSE `200` siguen una ruta de análisis de flujo separada y posterior, y hoy **no**
  están cubiertos por este hook: una limitación conocida, aún no necesaria para el
  estado erróneo de agentrouter (que se manifiesta como un estado HTTP de error).
- Elegibilidad de reintento: `429` está en `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), de modo que un error
  reexpresado conlleva una ventana de reintento real en lugar de aparecer como
  un `403` sin remedio.
- El `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  es solo lo que la respuesta reexpresada comunica al **cliente**; no es en sí
  mismo la duración interna de cooldown/bloqueo de la conexión — esa se rige por
  separado por el mecanismo que realmente gestione el error reexpresado (el backoff
  escalonado de Connection Cooldown, §2, base `3s` para proveedores con clave API;
  o Model Lockout, §3, para proveedores con cuota por modelo como agentrouter).
  El router puede volverse elegible para reintentar internamente antes de la ventana
  de 60 s que anuncia al cliente: margen intencional, no un bug.

Los errores permanentes (el `无权访问模型` de agentrouter — sin acceso a este modelo)
NUNCA se reexpresan: `excludeMarkers` veta la regla incluso cuando `textMarkers`
coincide, de modo que el error conserva su estado original y nada lo reintenta
indefinidamente. La regla de clasificación de proveedor correspondiente
(`agentrouter-model-access-denied` en `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, un cooldown base declarado de `6h`) es
consultada por `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_antes_ del retorno anticipado `FORBIDDEN` genérico de la categoría apikey,
condicionada por `honorsRuleLockScope(provider)` (#10334 — actualmente exclusivo
de agentrouter mediante la lista permitida `HONORS_RULE_LOCK_SCOPE_PROVIDERS` en
`providerErrorRules.ts`). El cooldown de 6 h declarado por la regla fluye como
`fallbackResult.baseCooldownMs`, pero aún alimenta la ruta de bloqueo por cuota
por modelo preexistente (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, sin cambios por #10334 salvo en la fuente del
cooldown): se limita al `mlSettings.maxCooldownMs` del operador
(por defecto `1_800_000ms` / 30 min), como cualquier otro bloqueo de modelo, y la
_razón de bloqueo persistida_ sigue siendo el valor preexistente hardcodeado
`"forbidden"`, no el `"auth_error"` de la regla — solo la duración del cooldown se
respeta de extremo a extremo, no la cadena de la razón. La conexión en sí permanece
activa; los modelos hermanos en la misma conexión no se ven afectados.

Los errores de cuota reexpresados (`额度不足`) alcanzan una regla de proveedor en
producción (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sin cooldown declarado propio — se aplica el backoff escalado por
defecto de la capa de persistencia). Desde #10334, el `scope` de
`ProviderErrorRuleMatch` SÍ se consume de extremo a extremo, pero **solo** para los
proveedores en la lista permitida `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — hoy solo `"agentrouter"`, condicionado mediante
`honorsRuleLockScope()`). Para cualquier otro proveedor, `scope` sigue siendo
informativo, exactamente igual que antes de #10334.
`checkFallbackError` expone el scope de la regla coincidente como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) es la guarda compartida que confirma que un
`ruleScope` es genuinamente seguro de respetar como una señal auto-recuperable
a nivel de conexión (scope `"connection"`, razón `quota_exhausted`, nunca `permanent`,
nunca `creditsExhausted` — una defensa contra una futura regla que empareje el
scope `"connection"` con un estado de cuenta permanente). Dos consumidores la
invocan:

- **Persistencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  en lugar de caer en la rama de bloqueo **por modelo** del proveedor de passthrough
  (agentrouter tiene `passthroughModels: true` → `hasPerModelQuota()`
  devuelve `true`), aplica un **enfriamiento temporal de la conexión** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca un estado terminal
  (`credits_exhausted`/`banned`/`expired`) — para que la conexión se recupere
  automáticamente cuando venza el enfriamiento, en lugar de requerir un
  restablecimiento manual de las credenciales.
  Se omite para las conexiones con `disableCooling: true` (#2997): esa exclusión
  voluntaria desemboca en el bloqueo por modelo (un compromiso documentado —
  consulta el comentario del código situado encima de la rama).
- **Enrutamiento de combos en la misma solicitud** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): la misma protección marca la
  conexión en el conjunto en memoria `exhaustedConnections`, cuya clave es
  `${provider}:${connectionId}`. Esto solo omite un destino restante de la misma
  solicitud que _por sí mismo ya contiene ese `connectionId` exacto_ en su propio
  objeto de destino (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes de la consulta a `exhaustedConnections`) — un combo simple
  de lista de modelos, cuyos destinos hermanos no tienen su propio `connectionId`
  fijado y uno de ellos solo se resuelve en cada despacho a partir del encabezado
  `X-OmniRoute-Selected-Connection-Id` de la respuesta, nunca coincide con esa
  clave. Para ese caso común, la protección real contra que un tramo restante
  vuelva a usar la cuenta que acaba de agotarse NO es este Set — es la capa de
  persistencia anterior (el `rateLimitedUntil` de la conexión ahora está en el
  futuro), junto con el hecho de que esta misma protección suprima
  `transientRateLimitedProviders` para el fallo (consulta "Diseño en dos etapas"
  y el comentario del código de la rama
  `isAgentrouterConnectionQuotaScope` en `targetExhaustion.ts`): al dejar ese
  Set sin marcar, la autorización forzada de `allowRateLimitedConnection` en
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NO se activa
  para los tramos restantes del proveedor, por lo que el filtro `rateLimitedUntil`
  de la selección de credenciales (`src/sse/services/auth.ts:1238`) se respeta
  normalmente y un tramo restante selecciona una conexión de agentrouter
  diferente que siga siendo elegible o falla porque no hay credenciales
  disponibles; no fuerza su regreso a la conexión que esta rama acaba de poner
  en enfriamiento.

### Diseño en dos etapas: reformulación del estado y luego clasificación

La reformulación del estado (`upstreamStatusRestatement.ts`) y las reglas de
clasificación de proveedores (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) son registros independientes que se indexan tanto por el
identificador del proveedor como por marcadores de texto, pero se ejecutan en
lugares distintos y cumplen propósitos diferentes: la reformulación reescribe el
estado HTTP al principio de `chatCore.ts`; las reglas de clasificación eligen el
`reason` de reserva y fijan el `scope`
(`model` / `provider` / `connection`) dentro de `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Las reglas de clasificación solo ven el **texto** completo del error (necesario
para buscar marcadores del cuerpo como `额度不足`) para los proveedores incluidos en
la lista de permitidos `FULL_TEXT_RULE_PROVIDERS` de `providerErrorRules.ts` —
actualmente, solo `"agentrouter"`. Para cualquier otro proveedor **del catálogo
integrado**, `checkFallbackError` solo pasa a `getProviderErrorRuleMatch` el error
estructurado (`{code, type}`), lo que basta para las reglas basadas en
encabezados/estado/código, pero no permite detectar marcadores del texto del
cuerpo. La función auxiliar `resolveRuleMatchBody()` realiza esta selección: el
texto completo del error para los proveedores incluidos en la lista de
permitidos y el error estructurado en los demás casos. Añadir un proveedor
**integrado** a `FULL_TEXT_RULE_PROVIDERS` es una habilitación explícita por
proveedor; esta lista existe para que la ruta predeterminada de todos los
proveedores que no figuran en ella permanezca idéntica byte por byte.

La habilitación del `scope` de una regla (`model` / `provider` / `connection`) es
independiente de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` solo lo expone
como `fallbackResult.ruleScope`, y los consumidores posteriores solo lo hacen
valer como algo más que una etiqueta informativa para los proveedores incluidos
en la lista de permitidos `HONORS_RULE_LOCK_SCOPE_PROVIDERS` del mismo archivo
(controlado mediante `honorsRuleLockScope()`; actualmente solo `"agentrouter"`).
Consulta "Errores de cuota reformulados" más arriba para saber qué hace realmente
una coincidencia `scope: "connection"` cuando un proveedor figura en esa lista.

**#11104 — las reglas declaradas por el operador eluden ambas listas de permitidos.** Un operador puede
declarar en tiempo de ejecución una regla por proveedor mediante `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
sin editar este archivo. Condicionar una regla del operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listas
concebidas para proteger el comportamiento **predeterminado** de las reglas del
catálogo integrado — haría que el mecanismo de configuración no tuviera efecto
para ningún proveedor salvo los que ya figuran en ellas, ya que declarar la regla
ya constituye la habilitación explícita del operador. Tanto
`resolveRuleMatchBody()` como `honorsRuleLockScope()` comprueban primero
`hasOperatorRuleForProvider()`: un proveedor con una regla del operador recibe el
texto de error sin procesar y se respeta su `scope` declarado,
independientemente de que también aparezca en cualquiera de las dos listas.

**Brecha conocida — `providerRuleRegistry` nunca se consulta para HTTP 400.**
La rama `BAD_REQUEST` de `checkFallbackError` clasifica el estado 400 por
completo mediante sus propias matrices de patrones (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. en `accountFallback.ts`) y retorna antes de
que se alcance la rama `configuredRule`/`getProviderErrorRuleMatch` que aparece
arriba. Una regla del catálogo integrado (o una regla del operador) con
`status: 400` es sintácticamente válida, pero nunca se activará. Actualmente,
ninguna regla existente apunta al 400, por lo que nada en producción se ve
afectado — pero una futura regla para 400 requiere modificar primero esta
rama, lo que supone un cambio mayor que añadir una regla (reclasifica el 400
para todos los proveedores que ya dependen del comportamiento de las matrices de
patrones) y queda fuera del alcance de añadir una regla para un único proveedor.

### Agregar un nuevo gateway que falsea la cuota

1. Registra un array de reglas en `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantén los `textMarkers`
   específicos del proveedor; nunca reutilices frases genéricas en inglés que
   colisionen con `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registra reglas de clasificación en
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para elegir
   el ámbito de bloqueo correcto (`connection` para cuota a nivel de cuenta,
   `model` para errores por modelo). Este paso solo tiene efecto en producción
   para los proveedores cuyas reglas necesitan el texto completo del error
   (marcadores del cuerpo): añade el id del proveedor a
   `FULL_TEXT_RULE_PROVIDERS` en el mismo archivo; de lo contrario,
   `checkFallbackError` solo le entrega a la regla el error estructurado
   `{code, type}` y una regla basada en el texto del cuerpo nunca coincidirá
   con el tráfico en vivo. Las reglas que coinciden únicamente por
   `status`/`headers` (como las de Opencode o Minimax) no necesitan esta
   activación. Por separado, si la regla declara `scope: "connection"` y la
   intención es un enfriamiento real a nivel de conexión más la omisión del
   combo en la misma solicitud (no solo una etiqueta informativa), añade el id
   del proveedor a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` en el mismo archivo:
   esto es lo que controla el consumo al estilo de
   `isAgentrouterConnectionQuotaScope()` en `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) y `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sin ello, `scope` sigue
   fluyendo a través de `fallbackResult.ruleScope` pero nada actúa sobre él.
3. Añade pruebas unitarias que reflejen
   `tests/unit/upstream-status-restatement.test.ts` y
   `tests/unit/agentrouter-error-rules.test.ts` (incluidas las guardas de no
   permanente / no creditsExhausted y, si el proveedor necesita la lista de
   permitidos, una prueba que verifique que `resolveRuleMatchBody()` devuelve
   el texto completo solo para ese proveedor).

No se necesitan cambios en `chatCore.ts`, `classifyError` ni en combo.

#### Bloqueo agrupado por IP de salida (#10880)

Los proveedores en `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia opencode) se
tratan como upstream agrupado por IP (el nivel gratuito de opencode está
agrupado por IP, no por cuenta — véase #9611): un 429 por código de estado
clasificado como `quota_exhausted` **o** `rate_limit_exceeded` enfría todas
las conexiones de la familia incluida en la lista de permitidos cuya última
IP de salida conocida coincide con la de la conexión que falló, antes de que
la rotación pueda intentarlas — evitando así N-1 llamadas al upstream con
fallo garantizado (misma forma que #10460/#10525).
`rate_limit_exceeded` se incluye deliberadamente: en la ruta de
`markAccountUnavailable` las reglas específicas de opencode nunca coinciden
(no se entregan headers/body a `checkFallbackError`, opencode no está en
`FULL_TEXT_RULE_PROVIDERS`), por lo que un 429 cuyo cuerpo contiene el texto
de cuota de suscripción ("monthly usage limit reached") se clasifica como
`quota_exhausted` por el fallback de texto de cuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; enfriamiento de 1 h)
antes de que se llegue a evaluar la regla `status_429` — mientras que un 429
sin texto de cuota (limitación de tasa simple) se clasifica mediante la regla
`status_429` como `rate_limit_exceeded` y aun así enfría la familia de IP.
Para un proveedor de la lista de permitidos, un límite de tasa agrupado por
IP es la misma señal que una cuota agotada. Limitaciones honestas:

- **Mejor esfuerzo**: el bloqueo resuelve la última `egress_ip` conocida de la conexión desde `proxy_logs` (ventana de 24 h, síncrono, sin caché). Caché fría (IP de salida nunca sondeada) o sin fila → la conexión fallida igualmente es enfriada por la rama (registrada como hoy), solo que no se bloquea ningún hermano.
- **Nunca terminal**: el enfriamiento es una ventana de cuota renovable (`testStatus: "unavailable"`); nunca se deriva un estado permanente de una señal a nivel de IP. Las conexiones `disableCooling` omiten la rama por completo.
- **La granularidad del bloqueo cambia para la familia incluida en la lista de permitidos**: esto es un cambio de alcance, no solo una optimización de hermanos. opencode es un proveedor `passthroughModels`, así que antes de esta rama un 429 producía un bloqueo por MODELO; ahora produce un enfriamiento de conexión — incluso para un operador que ejecuta una sola conexión sin ningún hermano. Esa es la granularidad que la tabla de reglas de opencode ya declara correcta (`scope: "connection"`, `providerErrorRules.ts`), nunca respetada hasta ahora porque opencode no está en `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. La rama escribe por sí misma el enfriamiento + `backoffLevel` de la conexión fallida, reflejando la rama de agentrouter con alcance de conexión, y retorna — el bloqueo por modelo y la ruta genérica de abajo nunca se alcanzan.
- **Combo incluido**: al igual que la rama de agentrouter, el alcance ignora deliberadamente la degradación `persistUnavailableState`/`isCombo` que un llamante combo aplica a un 429. Un bloqueo por modelo no es una forma más débil de este alcance, es la unidad equivocada: no dice nada sobre la IP agotada, así que la rotación del combo seguiría quemando una llamada con fallo garantizado por hermano.
- **Seguridad de hermanos**: un hermano ya terminal (baneado/credits_exhausted) o ya en un enfriamiento más largo nunca se sobrescribe.
- **Lista de permitidos exclusiva**: ampliar `EGRESS_BUCKETED_LOCK_PROVIDERS` es una decisión explícita del propietario; sin cableado genérico (patrón #10334/#10419). La consulta de hermanos vincula esa misma lista de permitidos en lugar de repetirla como un literal SQL, así que ampliarla sigue siendo un cambio de una línea.
- **Rotación de IP de salida, en ambas direcciones**: la ventana de búsqueda (24 h) es mucho más amplia que el TTL de la caché de IP de salida (5 min), así que "última IP conocida" es historial, no estado actual. Si el proxy de una conexión rotó dentro de la ventana, el bloqueo puede **no detectar** una IP genuinamente compartida (la IP registrada es la nueva, no agotada) — y simétricamente puede **enfriar a un hermano que desde entonces rotó fuera** de la IP agotada. El segundo caso le cuesta a ese hermano una ventana de enfriamiento; ambos son límites aceptados de mejor esfuerzo de una búsqueda basada en historial.
- **Costo**: dos escaneos acotados de `proxy_logs` (filtrados por ventana mediante `idx_pl_timestamp`), solo con la frecuencia de los 429. Sin índice nuevo (migración 134, YAGNI). Medido sobre una copia de BD con tráfico real de tamaño moderado; una instancia de alto rendimiento mantiene proporcionalmente más filas en la misma ventana.

---

## Otras funciones de resiliencia

- **21 estrategias de enrutamiento** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — consulta [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Enrutamiento sensible al reinicio (reset-aware)** (v3.8.0) — prioriza las conexiones según el momento de reinicio de la cuota.
- **Degradación del modo en segundo plano** — el `background: true` de la Responses API se degrada a síncrono con una advertencia.
- **Detección dinámica del límite de herramientas** — aplica retroceso a los proveedores cuando se alcanzan los límites de cantidad de herramientas.
- **Fallback de emergencia** — controlado por `OMNIROUTE_EMERGENCY_FALLBACK`; los operadores pueden anularlo desde la página Feature Flags sin reiniciar.

---

## Depuración

- El combo weighted responde `503 all_targets_cooling_down` (`Retry-After` establecido, `diagnostics.excluded` enumera cada objetivo con `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → el pool está configurado y conectado, simplemente cada objetivo está excluido por un temporizador de resiliencia; la advertencia `[COMBO] Weighted selection: every target excluded before dispatch — …` indica los motivos y los segundos restantes. Un `404 no_executable_targets` del mismo combo significa que no intervino ningún temporizador de resiliencia (no hay nada que ejecutar, o todas las cuentas fallaron la sonda de disponibilidad). Implementado en `open-sse/services/combo/pinRecovery.ts` a partir de las exclusiones recopiladas en `targetResolution.ts`.
- Todas las claves de un proveedor omitidas → revisa tanto el estado del circuit breaker COMO el `rateLimitedUntil`/`testStatus` de cada conexión.
- Proveedor excluido permanentemente tras la ventana de reinicio → código que lee el `state` sin procesar en lugar de `getStatus()`/`canExecute()`.
- Una clave falla, las demás deberían funcionar → prefiere el cooldown de conexión en lugar del circuit breaker.
- Solo falla un modelo → prefiere el bloqueo de modelo (model lockout) en lugar del cooldown de conexión.
- El estado debería autorrecuperarse pero no lo hace → comprueba si hay una marca de tiempo futura y una ruta de lectura que actualice el estado expirado. Los estados permanentes requieren cambios manuales.

---

## Estado en tiempo de ejecución — referencia rápida para el agente

> Trasladado literalmente desde `AGENTS.md` → "Resilience Runtime State" (PR #12743) para que la
> guía del agente se mantenga por debajo del presupuesto de contexto de 40k. Es la vista condensada,
> orientada al agente, de las secciones anteriores; las secciones numeradas siguen siendo la
> referencia completa.

OmniRoute tiene tres mecanismos de fallo temporal relacionados pero distintos. Mantén su
alcance separado al depurar el comportamiento de enrutamiento. Consulta el
[diagrama de resiliencia de 3 capas](../diagrams/exported/resilience-3layers.svg)
(fuente: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
para obtener un mapa de un vistazo.

### Circuit breaker de proveedor

**Alcance**: todo el proveedor, p. ej. `glm`, `openai`, `anthropic`.

**Propósito**: dejar de enviar tráfico a un proveedor que falla repetidamente a nivel de
upstream/servicio, de modo que un proveedor en mal estado no ralentice cada solicitud.

**Implementación**:

- Clase principal: `src/shared/utils/circuitBreaker.ts`
- Integración de la puerta de acceso/ejecución del chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado en tiempo de ejecución: `src/app/api/monitoring/health/route.ts`
- Wrappers compartidos: `open-sse/services/accountFallback.ts`
- Tabla de estado persistido: `domain_circuit_breakers`

**Estados** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: se permite el tráfico normal.
- `DEGRADED`: banda de alerta temprana — los fallos superaron el umbral de degradación pero aún
  no el umbral del breaker; el tráfico sigue fluyendo y los paneles muestran la advertencia. Una
  prueba de conexión válida o una ventana tranquila sin nuevos fallos lo devuelve a `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` indica la ventana).
- `OPEN`: el proveedor está bloqueado temporalmente; los llamadores reciben una respuesta de
  circuito de proveedor abierto o el enrutamiento de combo salta a otro objetivo.
- `HALF_OPEN`: ha transcurrido el tiempo de espera de reinicio; se permite una solicitud de sondeo.
  Si tiene éxito, el breaker se cierra; si falla, se abre de nuevo.

**Valores predeterminados** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumidos a través de
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` en `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` en `src/sse/handlers/chatHelpers.ts`). El breaker de proveedor
completo funciona con `circuitBreakerThreshold` / `circuitBreakerReset`:

| Perfil  | se degrada en | se abre en (`circuitBreakerThreshold`) | reinicio (`circuitBreakerReset`) |
| ------- | ------------: | -------------------------------------: | -------------------------------: |
| OAuth   |           `5` |                                    `8` |                            `60s` |
| API key |           `7` |                                   `12` |                            `30s` |
| Local   |    (derivado) |                                    `2` |                            `15s` |

`PROVIDER_PROFILES` también define `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) y `providerCooldownMs` (5/10/1 min): estos alimentan la
**puerta de ventana del Provider Cooldown global opcional** (`PROVIDER_COOLDOWN_ENABLED`,
desactivado por defecto): una entrada a nivel de proveedor en
`open-sse/services/providerCooldownTracker.ts` solo cuenta como en enfriamiento tras
`providerFailureThreshold` fallos dentro de `providerFailureWindowMs`, y luego se enfría durante
`providerCooldownMs`. NO son los umbrales del breaker activo — no los ajustes esperando un
comportamiento de breaker. Todos los valores predeterminados se pueden sobrescribir mediante las
variables de entorno `OMNIROUTE_PROVIDER_BREAKER_*` y `OMNIROUTE_CIRCUIT_BREAKER_*`; la tabla de
referencia precisa en tiempo de ejecución está en `docs/architecture/RESILIENCE_GUIDE.md`.

Solo los estados de fallo a nivel de proveedor deberían disparar el breaker de proveedor:

```ts
(408, 500, 502, 503, 504);
```

No dispares el breaker de proveedor completo por errores normales de cuenta/clave/modelo como la
mayoría de los casos `401`, `403` o `429`. Normalmente pertenecen al cooldown de conexión o al
bloqueo de modelo. Un `403` de un proveedor genérico con clave API debería ser recuperable a menos
que se clasifique como un error terminal de proveedor/cuenta.

El breaker usa recuperación diferida (lazy), no un temporizador en segundo plano. Cuando `OPEN` expira, las lecturas como `getStatus()`, `canExecute()` y `getRetryAfterMs()` actualizan el estado a `HALF_OPEN`, de modo que los dashboards y los constructores de candidatos de combos no sigan excluyendo indefinidamente a un proveedor expirado.

### Cooldown de conexión

**Alcance**: una conexión/cuenta/clave de proveedor.

**Objetivo**: omitir temporalmente una clave/cuenta defectuosa mientras se permite que otras conexiones del mismo proveedor sigan atendiendo solicitudes.

**Implementación**:

- Ruta de escritura/actualización: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selección/filtrado de cuentas: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo del cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configuración: `src/lib/resilience/settings.ts`

Campos importantes en las conexiones de proveedor:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante la selección de cuentas, una conexión se omite mientras:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Los cooldowns también son diferidos: cuando `rateLimitedUntil` queda en el pasado, la conexión vuelve a ser elegible. Tras un uso exitoso, `clearAccountError()` limpia `testStatus`, `rateLimitedUntil`, los campos de error y `backoffLevel`.

Comportamiento predeterminado del cooldown de conexión:

- Cooldown base de OAuth: `5s`.
- Cooldown base de clave API: `3s`.
- El `429` de clave API debería preferir las sugerencias de reintento del upstream (`Retry-After`, encabezados de reinicio o texto de reinicio interpretable) cuando estén disponibles.
- Los fallos recuperables repetidos usan backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

La protección anti-thundering-herd evita que fallos concurrentes en la misma conexión extiendan repetidamente el cooldown o incrementen dos veces `backoffLevel`.

Los estados terminales no son cooldowns. `banned`, `expired` (que solo se vuelve terminal después de N reintentos acotados mediante `EXPIRED_RETRY_MAX`) y `credits_exhausted` están pensados para permanecer no disponibles hasta que cambien las credenciales/configuración o un operador los restablezca. No sobrescribas los estados terminales con estado transitorio de cooldown.

### Bloqueo de modelo

**Alcance**: proveedor + conexión + modelo.

**Objetivo**: evitar deshabilitar una conexión completa cuando solo un modelo no está disponible o tiene la cuota limitada para esa conexión.

Ejemplos:

- Proveedores con cuota por modelo que devuelven `429`.
- Proveedores locales que devuelven `404` para un modelo faltante.
- Fallos de permisos de modo/modelo específicos del proveedor, como ciertos modos de Grok.

El bloqueo de modelo reside en `open-sse/services/accountFallback.ts` y permite que la misma conexión siga atendiendo otros modelos.

### Guía de depuración

- Si se omiten todas las claves de un proveedor, inspecciona tanto el estado del breaker del proveedor como el `rateLimitedUntil`/`testStatus` de cada conexión.
- Si un proveedor parece excluido permanentemente después de la ventana de reinicio, verifica si el código está leyendo el `state` en bruto en lugar de usar `getStatus()`/`canExecute()`.
- Si una clave de proveedor falla pero otras deberían funcionar, prefiere el cooldown de conexión sobre el breaker del proveedor.
- Si solo falla un modelo, prefiere el bloqueo de modelo sobre el cooldown de conexión.
- Si un estado debería autorrecuperarse, debe tener una marca de tiempo futura/tiempo de espera de reinicio y una ruta de lectura que actualice el estado expirado. Los estados permanentes requieren cambios manuales en las credenciales o en la configuración.

---

## Fingerprinting TLS y sigilo

El sigilo específico del proveedor (JA3/JA4, CCH, ofuscación) está documentado por separado — consulta `docs/security/STEALTH_GUIDE.md` (git; no compilado en `/docs`).

---

## Pruebas de resiliencia (Fase 8 · Bloque C)

Más allá de las pruebas unitarias de la lógica de resiliencia, tres pruebas ejercitan el runtime bajo condiciones reales de estrés/fallo (todas de integración/nocturnas — ninguna bloquea los PRs):

| Prueba      | Qué                                                                                                                                                                                    | Ejecutar                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | El nodo fake-upstream inyecta latencia/reset/timeout/503 reales; valida que el circuit breaker se abre/recupera y que `checkFallbackError` clasifica el 503 como fallback recuperable. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams por `createSSEStream` bajo `--expose-gc`; falla si el heap crece más allá del límite (protección OOM #3069).                                                              | `npm run test:heap`                      |
| k6 soak     | Carga sostenida contra `/api/monitoring/health`; umbrales de p95/errores.                                                                                                              | `k6 run tests/load/k6-soak.js` (nightly) |

Orquestado por `.github/workflows/nightly-resilience.yml` (cron + dispatch). En el `test:integration` por defecto, chaos y heap se omiten automáticamente (sin `RUN_CHAOS_INT`/`--expose-gc`).

---

## Véase también

- [Guía de arquitectura](./ARCHITECTURE.md) — Arquitectura del sistema e internos
- [Guía de usuario](../guides/USER_GUIDE.md) — Proveedores, combos, integración con la CLI
- [Motor Auto-Combo](../routing/AUTO-COMBO.md) — Puntuación de 16 factores, paquetes de modos
