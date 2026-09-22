# Compliance & Audit (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Fuente de verdad:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute registra las acciones administrativas, los eventos de autenticación, los cambios en el ciclo de vida de las credenciales de proveedores y las invocaciones de herramientas MCP en tablas de auditoría respaldadas por SQLite. Esta página explica qué se registra, dónde se almacena, cuánto tiempo se conserva, cómo pueden excluirse las claves de API y cómo consultar los datos.

La implementación se encuentra en `src/lib/compliance/index.ts` (T-43 — «Controles de cumplimiento») y `src/lib/compliance/providerAudit.ts`. Las escrituras de auditoría nunca generan excepciones: ante cualquier fallo, la llamada se descarta silenciosamente para que el registro de auditoría no pueda interrumpir el flujo principal de la solicitud.

## Qué se registra

### Eventos de auditoría administrativa (`audit_log`)

Cada llamada a `logAuditEvent({ action, actor, target, details, ... })` genera una fila. Las cadenas de acciones siguen el patrón `domain.verb` (o `domain.verb.outcome`). Los tipos de acciones confirmados en el código fuente incluyen:

| Acción                               | Fuente                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Cada entrada captura `action`, `actor` (de forma predeterminada, `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` y `timestamp`. Las claves confidenciales (`apiKey`, `accessToken`, `refreshToken`, `password`, cualquier elemento que coincida con `*token`/`*secret`/`*apikey`, etc.) se censuran recursivamente como `"[redacted]"` antes de escribir la fila.

### Llamadas a herramientas MCP (`mcp_tool_audit`)

Cada invocación de una herramienta MCP escribe una fila mediante `open-sse/mcp-server/audit.ts`. Esquema (de `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Columna          | Notas                                               |
| ---------------- | --------------------------------------------------- |
| `id`             | incremento automático                               |
| `tool_name`      | identificador de la herramienta MCP                 |
| `input_hash`     | sha256 de la entrada (no se almacena la carga útil) |
| `output_summary` | resumen breve y truncado                            |
| `duration_ms`    | tiempo transcurrido                                 |
| `api_key_id`     | llamante (puede ser nulo)                           |
| `success`        | `1` / `0`                                           |
| `error_code`     | código de error final en caso de fallo              |
| `created_at`     | marca de tiempo ISO                                 |

### Registros de solicitudes/uso

Estos constituyen telemetría operativa (no son estrictamente auditorías administrativas), pero comparten el mismo proceso de retención:

- `usage_history` — resumen de uso por solicitud
- `call_logs` — registro completo por solicitud (sujeto al límite de filas; véase más abajo)
- `proxy_logs` — registro del tráfico del proxy (sujeto al límite de filas)
- `request_detail_logs` — registro detallado heredado de solicitudes (también se depura si está presente)

## Esquema de almacenamiento

`audit_log` se crea de forma diferida mediante `ensureAuditLogSchema()` la primera vez que se utiliza:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Se crean índices para `timestamp`, `action`, `actor`, `resource_type`,
`status` y `request_id`. Las columnas que falten en bases de datos heredadas se añaden mediante
`ALTER TABLE` cuando es necesario.

## Retención y limpieza

Se respetan dos períodos de retención independientes:

| Variable de entorno         | Valor predeterminado | Se aplica a                                                       |
| --------------------------- | -------------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`                  | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`                  | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`             | Recorte por límite de filas para `call_logs`                      |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`             | Recorte por límite de filas para `proxy_logs`                     |

`cleanupExpiredLogs()` ejecuta el proceso de retención. Se invoca al iniciar el servidor
desde `src/instrumentation-node.ts`. Cada ejecución registra un evento de auditoría
`compliance.cleanup` con los recuentos de eliminaciones por tabla. El recorte de los registros
de proxy y llamadas se realiza por lotes (`BATCH_SIZE = 5000`) para evitar bloqueos de escritura prolongados.

La limpieza manual del historial de solicitudes es independiente de la retención. La página Request Logs
llama a `POST /api/settings/purge-request-history`, que elimina `call_logs`,
el elemento heredado `request_detail_logs` y los artefactos de solicitudes locales ubicados en
`${DATA_DIR}/call_logs/`.

Los valores predeterminados se definen en `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Exclusión voluntaria mediante `noLog` (por clave de API)

Las claves de API pueden marcarse para que no se registre el tráfico de sus llamadas posteriores. La
marca se almacena en la tabla `api_keys` (`no_log INTEGER DEFAULT 0`) y se replica
en un conjunto en memoria para realizar consultas en rutas críticas.

```bash
# Crear una clave sin registro (se requiere autenticación de administración)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Funciones auxiliares (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — activa o desactiva la entrada en memoria
- `isNoLog(apiKeyId)` — se comprueba en la ruta de la solicitud; recurre a una lectura almacenada
  en caché durante 30 s de `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (variable de entorno, separada por comas) — se carga previamente en el conjunto
  en memoria durante el arranque; resulta útil cuando no se puede modificar la columna directamente

Los eventos de auditoría administrativos (inicio de sesión, cambios de proveedor, llamadas a herramientas MCP, etc.)
**no** se ven afectados por `noLog`; únicamente se excluye del registro el tráfico
por solicitud.

## API REST

| Endpoint                    | Método | Descripción                                                | Autenticación |
| --------------------------- | ------ | ---------------------------------------------------------- | ------------- |
| `/api/compliance/audit-log` | `GET`  | Entradas paginadas de auditoría administrativa con filtros | management    |
| `/api/mcp/audit`            | `GET`  | Entradas paginadas de auditoría de herramientas MCP        | (open-sse)    |
| `/api/mcp/audit/stats`      | `GET`  | Estadísticas agregadas de auditoría MCP                    | (open-sse)    |

Actualmente no se incluye ningún endpoint de exportación a CSV; exporte desde el panel o consulte
directamente la base de datos SQLite.

### Consulta de `/api/compliance/audit-log`

Parámetros de consulta compatibles (todos opcionales; todos usan coincidencia
`LIKE %value%` para los filtros de texto):

- `action`, `actor`, `target`, `resourceType` (o `resource_type`),
  `status`, `requestId` (o `request_id`)
- `from` / `since`, `to` / `until`: marcas de tiempo ISO
- `limit` (valor predeterminado `50`, mínimo `1`, máximo `500`)
- `offset` (valor predeterminado `0`, máximo `10_000`)

La respuesta es un array JSON. Los metadatos de paginación se devuelven en los encabezados:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Panel

El panel expone los datos de auditoría en **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). La página tiene dos pestañas:

- **Cumplimiento** (`ComplianceTab.tsx`): eventos de auditoría administrativa de
  `/api/compliance/audit-log`. Permite filtrar por tipo de evento, gravedad (info / warning
  / critical, derivada de la acción y el estado) e intervalo de fechas. La gravedad se
  calcula en el lado del cliente a partir de las cadenas de acción y estado.
- **MCP** (`McpAuditTab.tsx`): auditoría de herramientas MCP de `/api/mcp/audit`, con
  filtros por nombre de herramienta y éxito/error.

Ambas pestañas usan paginación con tamaños de página de `50` (cumplimiento) y `25` (MCP).

## Funciones auxiliares para credenciales de proveedores

`src/lib/compliance/providerAudit.ts` proporciona funciones auxiliares de estructuración utilizadas por las
rutas de gestión de proveedores cuando emiten eventos de credenciales:

- `summarizeProviderConnectionForAudit(connection)`: elimina `apiKey`,
  `accessToken`, `refreshToken`, `idToken` y
  `providerSpecificData.consoleApiKey` antes de que la instantánea de la conexión se
  escriba en `details`.
- `getProviderAuditTarget(connection)`: compone una cadena estable
  `"<provider>:<name|id>"` para el campo `target`.
- `extractProviderWarnings(...payloads)`: analiza las respuestas de los proveedores en busca de
  advertencias de políticas/seguridad (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) y
  muestra hasta 5 coincidencias, cada una truncada a 400 caracteres.

## Prácticas recomendadas

- Marque con `noLog: true` las claves de API que gestionen PII (datos legales, médicos, etc.).
- Ajuste `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` para cumplir su
  política de retención. Los valores predeterminados de 7 días son conservadores.
- Exporte la tabla de auditoría fuera de la plataforma (`sqlite3 dump`) con la frecuencia
  que requiera su programa de cumplimiento; no existe un sistema de archivado integrado.
- Supervise los recuentos de `auth.login.failed` y `auth.login.locked` para detectar
  ataques de fuerza bruta.
- Al añadir nuevos endpoints administrativos, llame a `logAuditEvent({ ... })` con una cadena de acción
  estable `domain.verb.outcome` y pase el contexto de la solicitud mediante
  `getAuditRequestContext(request)` para que la IP y el `requestId` se capturen
  automáticamente.

## Véase también

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — enmascaramiento de PII, inyección de prompts
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catálogo y ámbitos de las herramientas de MCP
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — referencia completa de variables de entorno
- Código fuente: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
