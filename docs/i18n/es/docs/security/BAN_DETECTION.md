# Account-Ban / Banned-Keyword Detection (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute analiza las respuestas de error del servicio ascendente en busca de señales que indiquen que una
**cuenta del proveedor está inactiva permanentemente** (suspendida/desactivada/bloqueada por incumplir los Términos de servicio) y, cuando
encuentra una coincidencia, mueve esa conexión a un **estado terminal `banned`** para que deje de
seleccionarse para las solicitudes. Esto es lo que configura la tarjeta de ajustes **Seguridad → Palabras clave de bloqueo**
("Palabras clave adicionales que activan la detección de bloqueos permanentes de cuentas.
Las palabras clave integradas se aplican siempre.").

Esta página documenta la lista integrada, el flujo de detección, su alcance, cómo añadir
palabras clave personalizadas de forma segura y cómo recuperar una conexión marcada. El estado
terminal forma parte del modelo de resiliencia; consulte
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Estados terminales").

**Fuente de referencia:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Palabras clave integradas

Estas 8 subcadenas se aplican siempre (sin distinguir entre mayúsculas y minúsculas), independientemente de cualquier lista personalizada:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Esta lista evoluciona a medida que los proveedores cambian la redacción de sus bloqueos. La copia
> autoritativa es `ACCOUNT_DEACTIVATED_SIGNALS` en `open-sse/services/accountFallback.ts`;
> considere el bloque anterior como una instantánea.

En el mismo archivo hay dos tablas de señales contiguas e **independientes** que _no_ forman parte
de la detección de palabras clave de bloqueo:

- `CREDITS_EXHAUSTED_SIGNALS` — facturación/cuota agotada (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → estado terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **no terminal**; una actualización del token puede permitir la recuperación.

Nota: las expresiones transitorias comunes como **`rate limit`** / `429` se gestionan mediante la
ruta de limitación de frecuencia/tiempo de espera de la conexión y **no** son señales de bloqueo.

## Flujo de detección

```
respuesta de error del servicio ascendente
  → cuerpo convertido en cadena y en minúsculas
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [coincidencia de subcadena]
  → ¿coincidencia?
      → testStatus de la conexión = "banned"      (permanente: tiempo de espera de 1 año, nunca se recupera automáticamente)
      → si el ajuste `autoDisableBannedAccounts` está activado y `autoDisableBannedScope`
        incluye esta conexión (`all`, o `subscription` para OAuth/cookies/sesiones)
        → también isActive = false. Las claves de API prepagadas permanecen activas cuando el ámbito es
        `subscription`.
      → la conexión se omite durante la selección de cuentas (estados QUOTA_BLOCKING combinados)
```

- La coincidencia es una búsqueda de **subcadenas que no distingue entre mayúsculas y minúsculas** en el **cuerpo**
  de la respuesta (`isAccountDeactivated`, `accountFallback.ts`).
- La terminalización permanente como `banned` se activa cuando el cuerpo contiene una señal de bloqueo con **cualquier
  estado HTTP** (mediante `markAccountUnavailable` → `checkFallbackError`). La etiqueta más
  específica **`deactivated`** (`isActive=false` cuando la conexión no tiene
  claves de API de reserva) se escribe mediante la ruta en línea de `chatCore.ts` para **HTTP 401 / 403**
  (clasificada mediante `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Tenga en cuenta que la
  ruta `markAccountUnavailable()` escribe un estado terminal _diferente_ —
  **`expired`** — para la misma señal `ACCOUNT_DEACTIVATED` (mediante
  `resolveTerminalConnectionStatus`), por lo que el mismo bloqueo puede aparecer como
  `deactivated` o `expired` dependiendo de qué ruta haya gestionado la respuesta. (El
  comentario del código antiguo dice "cuando el cuerpo de una respuesta 401 contiene estas cadenas", lo cual
  no refleja por completo el comportamiento actual).
- Una conexión `banned` se excluye de la selección en todos los lugares donde se filtran los estados
  terminales (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` combinados).

## Alcance — qué proveedores se analizan

**Todos los proveedores.** La comprobación se ejecuta en la canalización genérica
de gestión de errores por la que pasa cada solicitud fallida al servicio upstream;
**no** está limitada a scrapers de OAuth/suscripciones. El estado terminal resultante
se aplica por **conexión**, no por proveedor.

Dicho esto, las _cadenas_ integradas están orientadas a proveedores de
suscripción/OAuth con riesgo real de bloqueo (ChatGPT Web Codex, Claude Web, Codex,
Muse Spark, Antigravity). Un proveedor con clave de API solo activará el detector si
el cuerpo de su error contiene literalmente una de las subcadenas.

`autoDisableBannedScope` (`all` | `subscription`, valor predeterminado `all`) controla
si una coincidencia también establece `isActive=false`. `subscription` se refiere a
cuentas de tipo inicio de sesión (suscripciones de pago y cuentas gratuitas,
incluidas las sesiones mediante cookies web). Se sigue registrando
`testStatus=banned` para las claves de API prepago, pero se mantienen en el grupo de
enrutamiento. El diseño duradero consiste en una anulación por proveedor y por
cuenta; la enumeración global es la primera implementación.

## Palabras clave personalizadas de bloqueo

Añada o elimine palabras clave en **Seguridad → Palabras clave de bloqueo**
(persistidas como el ajuste global `customBannedSignals` mediante
`PATCH /api/settings`). Estas se **añaden a** la lista integrada —nunca la
sustituyen— y se recargan en caliente al guardar (y durante el inicio) mediante
`setCustomBannedSignals()`. Cada palabra clave está limitada a 200 caracteres; no
hay límite para la longitud del array.

**⚠ Riesgo de falsos positivos — elija frases específicas.** La detección consiste
en una coincidencia literal de subcadenas en todo el cuerpo de la respuesta, y una
coincidencia es **permanente** (periodo de recuperación de 1 año, recuperación
manual). Una palabra clave demasiado general puede bloquear una conexión
perfectamente operativa:

- **Malo:** `quota`, `limit`, `error`, `denied` — aparecen en muchos errores transitorios.
- **Bueno:** frases completas de bloqueo, p. ej., `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Prefiera la frase inequívoca más larga que devuelva el proveedor ante un bloqueo
real. En caso de duda, observe primero el `lastError` de la conexión y, después,
añada el texto exacto.

## Recuperación de una conexión marcada

Los estados terminales `banned` / `deactivated` **nunca se recuperan
automáticamente** (se excluyen del ciclo de recuperación proactiva; solo los
periodos de recuperación de `unavailable` se resuelven por sí solos). Un operador
debe borrarlos explícitamente:

1. **Volver a probar la conexión** — la acción **Probar** del panel
   (`POST /api/providers/{id}/test`); una comprobación correcta restablece
   `testStatus` a `active` y borra los campos de error.
2. **Volver a autenticarse / editar las credenciales** — para los proveedores
   OAuth, vuelva a ejecutar el flujo de inicio de sesión / actualización; las
   rutas de creación/importación del proveedor establecen `isActive = true`.
3. **Volver a habilitar la conexión** — si la desactivación automática estableció
   `isActive = false` (alcance `all`, o `subscription` para una conexión
   OAuth/cookie/sesión), vuelva a activarla después de corregir la cuenta.

No hay un botón independiente para «borrar el indicador de bloqueo»; la recuperación
se realiza volviendo a probar, autenticarse o habilitar la conexión, de acuerdo con
la regla general de estados terminales de
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Aislamiento de comprobaciones (prueba de todos los modelos)

Un **fallo originado en una comprobación** (operaciones de prueba de todos los
modelos / comprobaciones de estado ejecutadas dentro de `runAsProbe`) nunca elimina
una conexión del grupo (#9817): se **registra para aportar visibilidad**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), pero omite
**todas** las modificaciones de enrutamiento: periodos de recuperación, estados
terminales (`banned` / `deactivated` / `credits_exhausted`), bloqueos por modelo,
el disyuntor del proveedor, la caché de cuota de 5 minutos, la actualización del
token OAuth y la desactivación automática. Solo un fallo en la ruta de una solicitud
real provoca la desactivación. El error registrado es lo que permite que una cuenta
marcada sea visible en el panel mientras sigue atendiendo tráfico.

El único punto de decisión es `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), que consulta **cada** ubicación que podría
modificar el estado de enrutamiento a partir de un fallo originado en una
comprobación:

- `markAccountUnavailable` (`auth.ts`) — solo registro (texto sin procesar de
  `lastError`, `lastErrorType`, `errorCode`, `lastErrorAt`; deliberadamente
  **sin** `backoffLevel`, ya que activaría la reducción automática durante la
  selección y borraría el registro)
- `maybeAutoDisableBannedAccount` — sin desactivación automática
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (solo registro,
  sin estado terminal `credits_exhausted`), GEO_BLOCKED (sin exclusión de 24 h),
  MODEL_NOT_FOUND (sin `lockModel`), la conmutación por error mediante rotación
  de cuenta ante el 429 de codex (sin `markCodexScopeRateLimited`, sin
  `rate_limited_until` persistido, sin borrar la afinidad de sesión),
  `persistCodexQuotaState` (sin escritura del estado de cuota ni invalidación
  de la caché), `recordKeyHealthStatus` (el rotador de estado de claves permanece
  intacto)
- Actualización de OAuth — tanto la actualización proactiva en la base del ejecutor
  (`base.ts` `execute()`, sin consumir la rotación del token de actualización)
  como la ruta reactiva para 401/403 en `chatCore` (sin desactivación por `expired`)
- `chat.ts` — el disyuntor del proveedor y la caché de cuota de 5 minutos
  (`markAccountExhaustedFrom429`) nunca se degradan

El error registrado es lo que permite que una cuenta marcada sea visible en el panel
mientras sigue atendiendo tráfico. Nota: el registro de la comprobación almacena el
texto de error **sin procesar** (sin recortar), a diferencia del truncamiento
`slice(0,100)` de la ruta real.

Los operadores que utilicen la prueba de todos los modelos como herramienta de
mantenimiento pueden restaurar el comportamiento histórico (la comprobación cuenta
como una generación real) mediante cualquiera de estas opciones:

- el ajuste `probeCanDisable` (`POST /api/settings` con
  `{"probeCanDisable": true}`, o una edición directa de la base de datos
  `key_value`), o
- el indicador de funcionalidad **`PROBE_CAN_DISABLE=true`** (variable de entorno
  o anulación en la base de datos; prevalece sobre el ajuste).

Mecanismo de seguridad: si la consulta del indicador o de los ajustes produce una
excepción, el aislamiento permanece ACTIVADO.

## Archivos fuente

| Aspecto                                                       | Archivo                                                                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tablas de señales + coincidencia                              | `open-sse/services/accountFallback.ts`                                                                        |
| Finalización / persistencia                                   | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Ámbito de desactivación automática                            | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Clasificación en línea                                        | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Exclusión de recuperación del estado terminal                 | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Carga en tiempo de ejecución de palabras clave personalizadas | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Interfaz de configuración                                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
