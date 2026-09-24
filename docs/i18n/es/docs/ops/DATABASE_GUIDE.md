# Database Schema & Operations Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute utiliza **SQLite con registro WAL** como almacenamiento principal, con cifrado **AES-256-GCM** en reposo para los campos confidenciales. Esta guía abarca el esquema, las migraciones, las copias de seguridad y recuperación, y los procedimientos operativos.

**Fuentes:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tablas base)
- `src/lib/db/migrationRunner.ts` — migraciones versionadas
- `src/lib/db/migrations/` — 167 archivos SQL versionados
- `src/lib/db/encryption.ts` — funciones auxiliares de cifrado
- `src/lib/db/backup.ts` — exportación/importación de copias de seguridad
- `src/lib/db/healthCheck.ts` — diagnósticos de estado

---

## ¿Por qué SQLite?

OmniRoute eligió SQLite en lugar de PostgreSQL/MySQL por varios motivos:

| Factor                 | SQLite                                       | PostgreSQL                                           |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------- |
| **Despliegue**         | Integrado — no requiere un servidor separado | Requiere configurar un servidor                      |
| **Cifrado**            | Capa de aplicación (AES-256-GCM)             | TDE integrado                                        |
| **Rendimiento**        | Más rápido para cargas pequeñas/medianas     | Mejor para un gran volumen de escrituras simultáneas |
| **Concurrencia**       | El modo WAL permite lecturas simultáneas     | MVCC completo                                        |
| **Copia de seguridad** | Copia de un único archivo                    | `pg_dump` o instantánea del sistema de archivos      |
| **Caso de uso**        | Instalación por usuario, integrado           | SaaS multiinquilino                                  |

Para despliegues de **un solo usuario y una sola instancia** (el caso de uso principal de OmniRoute), SQLite es más sencillo y rápido.

### Registro WAL

`core.ts` abre la base de datos en **modo WAL (registro de escritura anticipada)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL permite **lecturas simultáneas** durante las escrituras, algo importante para el panel, que realiza consultas mientras se registran las solicitudes.

El tamaño predeterminado de la caché es de **65,536 KiB (64 MiB)**. SQLite interpreta un valor negativo de
`cache_size` como un límite superior aproximado en KiB y asigna páginas según sea necesario.
**Configuración > Sistema y almacenamiento > Tamaño de caché** acepta valores enteros de **1 a
1,000,000 KiB**; al guardar la configuración, esta se aplica a la conexión activa de la base de datos,
y OmniRoute restaura el valor almacenado durante el inicio.

---

## Ubicación de la base de datos

El archivo SQLite se almacena en:

| SO      | Ruta                                                          |
| ------- | ------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                 |
| macOS   | `~/.omniroute/storage.sqlite`                                 |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker  | `/app/data/storage.sqlite` (configurable mediante `DATA_DIR`) |

Archivos complementarios:

- `storage.sqlite-wal` — registro de escritura anticipada
- `storage.sqlite-shm` — archivo de memoria compartida
- `call_logs/` — artefactos de las cargas útiles de las solicitudes (si están habilitados)

**Sobrescribir la ubicación:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arquitectura de módulos de dominio

La base de datos de OmniRoute tiene **110 módulos TypeScript de nivel superior** en `src/lib/db/`. Cada módulo de dominio:

- Gestiona una o más tablas específicas
- Exporta funciones CRUD tipadas
- Nunca accede a las tablas de otro módulo
- Usa `getDbInstance()` de `core.ts` para acceder a la base de datos

### Los 110 módulos de base de datos de nivel superior

OmniRoute tiene **110 archivos TypeScript de nivel superior** en `src/lib/db/`. A continuación se muestra una selección de los módulos principales; consulta el listado del directorio para ver la lista completa:

| Módulo                  | Tablas                                                         | Responsabilidad                                                                           |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registro y credenciales de proveedores mediante OAuth/claves de API                       |
| `models.ts`             | `key_value` (datos de modelos)                                 | Definiciones, capacidades y precios de los modelos                                        |
| `combos.ts`             | `combos`                                                       | Configuraciones y orden de enrutamiento de combos                                         |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo de vida, ámbitos y seguimiento de cuotas de las claves de API                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuración del sistema y almacén KV compartido                                         |
| `backup.ts`             | —                                                              | Operaciones de exportación/importación de copias de seguridad                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configuraciones de proxy y reglas de enrutamiento                                         |
| `prompts.ts`            | `prompt_templates`                                             | Plantillas de prompts reutilizables y control de versiones                                |
| `webhooks.ts`           | `webhooks`                                                     | Suscripciones y registros de webhooks basados en eventos                                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registro de auditoría por solicitud (opcional, de gran volumen)                           |
| `domainState.ts`        | `domain_*` (5 tablas)                                          | Presupuestos de dominio, disyuntores, bloqueos, cadenas de respaldo e historial de costes |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Claves de API incluidas en la lista blanca para MCP/A2A                                   |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Uso histórico de cuotas                                                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Asignación de modelos a combos predeterminados                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Estado persistente específico de la CLI                                                   |
| `encryption.ts`         | —                                                              | Utilidades para cifrar/descifrar campos                                                   |
| `readCache.ts`          | —                                                              | Caché en memoria para operaciones con gran volumen de lecturas                            |
| `secrets.ts`            | `key_value` (entradas cifradas)                                | Almacenamiento cifrado de secretos                                                        |
| `stateReset.ts`         | —                                                              | Borrado/restablecimiento del estado de la base de datos para pruebas                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexto de sesión para la transferencia entre agentes                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Seguimiento del uso                                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuración de compresión                                                               |

### Límites entre módulos

Una regla arquitectónica fundamental: **los módulos no acceden directamente a las tablas de otros módulos**. Para trabajar con los datos de otro módulo, importa la función de ese módulo.

```ts
// ❌ INCORRECTO: SQL directo desde otro módulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRECTO: usa la función del módulo de proveedores
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Esta regla se aplica mediante la revisión de código: no existe una comprobación estática, pero las infracciones se señalan.

---

## Esquema base (17 tablas)

`core.ts` define las 17 tablas base en `SCHEMA_SQL`. Estas se crean mediante la migración `001_initial_schema.sql` y conforman el esquema principal.

### Tablas principales (creadas en la migración inicial)

| Tabla                      | Propósito                                     | Columnas clave                                                          |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenciales del proveedor (cifradas)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Información de enrutamiento de nodos          | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Almacén KV de propósito general               | `namespace`, `key`, `value`                                             |
| `combos`                   | Definiciones de combinaciones de enrutamiento | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Claves de API para la puerta de enlace        | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadatos de la base de datos                 | `key`, `value`                                                          |
| `usage_history`            | Registros de uso de solicitudes               | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Cargas útiles y respuestas de las solicitudes | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Registros de solicitudes del proxy            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Cadenas de modelos a proveedores              | `model`, `chain`                                                        |
| `domain_budgets`           | Presupuestos de gasto por dominio             | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historial de restablecimientos de presupuesto | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Seguimiento de costes por dominio             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Estado del límite de solicitudes por dominio  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Estado del disyuntor por dominio              | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Caché de respuestas del LLM                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantáneas históricas de cuotas             | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tablas adicionales (añadidas mediante migraciones posteriores)

Las migraciones posteriores añaden tablas como:

- `cli_tool_state` (migración 011) — estado de la herramienta CLI
- Tablas `mcp_*` — auditoría del servidor MCP
- Tablas `a2a_*` — estado de tareas A2A
- Tablas `usage_*` — seguimiento del uso
- Tablas `plugin_*` — sistema de complementos
- `skill_executions` — historial de ejecución de habilidades
- Tablas `memory_*` — sistema de memoria
- Tablas `compression_*` — sistema de compresión
- Tablas `webhook_*` — registro de entrega de webhooks
- Tablas `acp_*` — Protocolo de Cliente de Agente
- Tablas `oneproxy_*` — mercado de 1proxy
- `proxy_assignments` — vinculaciones de ámbito del proxy
- `detailed_call_artifacts` — metadatos de artefactos del registro de llamadas
- `quota_alert_history` — auditoría de alertas de cuota
- `command_code_auth_sessions` — sesiones OAuth de Command Code

La lista completa de más de 30 tablas se encuentra en `src/lib/db/migrations/`.

---

## Migraciones

OmniRoute utiliza **migraciones versionadas e idempotentes** en `src/lib/db/migrations/`. Cada migración es un único archivo SQL denominado `NNN_description.sql`.

### Nomenclatura de las migraciones

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Cómo se ejecutan las migraciones

Al iniciarse, `migrationRunner.ts`:

1. Crea la tabla `_omniroute_migrations` si no existe
2. Consulta las migraciones ya aplicadas
3. Aplica las migraciones nuevas en orden, cada una dentro de una transacción
4. Registra cada migración aplicada con una marca de tiempo

```ts
// src/lib/db/migrationRunner.ts (simplificado)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotencia

Las migraciones deben ser **idempotentes**: ejecutarlas dos veces no debe producir ningún cambio:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilice ampliamente las cláusulas `IF NOT EXISTS`, `IF EXISTS` y `OR IGNORE` / `OR REPLACE`.

### Añadir una nueva migración

1. **Identifique el siguiente número**: `ls src/lib/db/migrations/ | tail -1`
2. **Cree el archivo**: `NNN_my_change.sql`
3. **Utilice DDL seguro**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Complete los datos con cuidado**: utilice `UPDATE ... WHERE ...` para gestionar las filas existentes
5. **Pruébela en una copia**: nunca ejecute migraciones sin probar en producción

Ejemplo:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> Los **cambios incompatibles con versiones anteriores** (p. ej., eliminar columnas) son complicados. OmniRoute NO admite la reversión a una versión anterior; una vez aplicada una migración, el cambio del esquema es permanente. Planifique en consecuencia.

---

## Cifrado en reposo

Los campos sensibles (claves de API, tokens de OAuth y cadenas de conexión) se cifran en reposo mediante **AES-256-GCM**.

### Cómo funciona

```ts
// src/lib/db/encryption.ts (simplificado)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Dónde se utiliza

- `provider_connections.api_key`: cifrado en el nivel de la aplicación
- `provider_connections.access_token`, `refresh_token`, `id_token`: cifrados en el nivel de la aplicación
- Entradas de `key_value` con `namespace = "secrets"`: cifradas en el nivel de la aplicación
- `proxy_registry.auth`: cifrado en el nivel de la aplicación (si está presente)

### Clave de cifrado

La clave de cifrado se deriva de una **frase de contraseña** (configurada mediante la variable de entorno `STORAGE_ENCRYPTION_KEY`) y una **sal** (almacenada en la base de datos). Ambas son necesarias para descifrar los datos.

```bash
# Genere una frase de contraseña segura
openssl rand -hex 32

# Configúrela en .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Importante**: perder la clave de cifrado implica perder el acceso a todos los datos cifrados. **Realice una copia de seguridad de la clave por separado de la base de datos**.

### Qué NO está cifrado

Por motivos de rendimiento, los siguientes elementos se almacenan en texto sin formato:

- Nombres para mostrar de los proveedores
- Definiciones de modelos (ya son públicas)
- Reglas de enrutamiento
- Registros de uso (sin PII)

---

## Consideraciones sobre el cifrado (v3.8.16+)

OmniRoute utiliza **`migrateLegacyEncryptedString()`** para gestionar de forma transparente dos esquemas de cifrado:

- **Heredado** (anterior a v3.5.0): «cifrado» basado en XOR (no es criptografía real)
- **Actual**: AES-256-GCM con un IV y una etiqueta de autenticación adecuados

La función auxiliar de migración detecta el formato heredado y vuelve a cifrar los datos con el nuevo esquema durante la primera lectura. Esto significa que puede actualizar una base de datos antigua sin perder las credenciales.

---

## Caché de lectura

Para los datos que se leen con frecuencia (modelos, proveedores y ajustes), `readCache.ts` proporciona una **caché en memoria**:

```ts
// Almacenado en caché al iniciar; se invalida al escribir
const providers = await getCachedProviders(); // Rápido, en memoria
const fresh = await listProviders(); // Lento, consulta la BD
```

| Entidad almacenada en caché | Clave de caché | TTL                |
| --------------------------- | -------------- | ------------------ |
| `models`                    | `models:v1`    | Hasta la escritura |
| `provider_connections`      | `providers:v1` | Hasta la escritura |
| `settings`                  | `settings:v1`  | Hasta la escritura |
| `combos`                    | `combos:v1`    | Hasta la escritura |

La caché se invalida con cada escritura en la tabla correspondiente.

---

## Copia de seguridad y recuperación

### Copia de seguridad manual

```bash
# Utilice la CLI para crear una copia de seguridad local
omniroute backup create --name pre-migration

# O mediante la API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

El archivo de copia de seguridad incluye:

- Todas las tablas de la BD (serializadas en JSON)
- Artefactos del registro de llamadas (codificados en base64, opcionales)
- Ajustes y secretos (cifrados)
- Configuración de complementos

### Restauración

```bash
# Mediante la CLI
omniroute restore pre-migration

# Mediante la API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Advertencia**: La restauración sobrescribe toda la BD. Detenga primero todos los clientes.

### Copias de seguridad automatizadas

```bash
# Habilite las copias de seguridad diarias automatizadas mediante la CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

La programación se ejecuta en el servidor mediante una tarea en segundo plano que se activa cada 30 segundos
(de forma predeterminada) y evalúa la expresión cron según la hora local del servidor.

| Variable                                    | Valor predeterminado | Descripción                                                                                                              |
| ------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`              | Intervalo de activación en ms (mín. `5000`). Debe ser inferior a 60 s para coincidir de forma fiable con el minuto cron. |

### Copia de seguridad en caliente de SQLite

Para realizar una copia de seguridad sin tiempo de inactividad de una BD activa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Esto utiliza la API de copia de seguridad en línea de SQLite; es seguro ejecutarlo mientras OmniRoute está en funcionamiento.

---

## Ajuste del rendimiento

### Modo WAL

WAL está habilitado de forma predeterminada. Para cargas de trabajo con muchas escrituras, considere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Punto de control cada 1000 páginas
PRAGMA journal_size_limit = 67108864;  -- Límite de WAL de 64 MB
```

### Índices

Índices clave para el rendimiento (creados automáticamente mediante migraciones):

- `idx_models_provider` — búsquedas de modelos por proveedor
- `idx_combo_targets_combo_id` — expansión de destinos combinados
- `idx_usage_history_api_key_timestamp` — análisis de uso
- `idx_quota_snapshots_api_key_window` — seguimiento de cuotas
- `idx_call_logs_timestamp` — consultas de registros de llamadas

Para añadir un índice nuevo, cree una migración:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### E/S asignada en memoria

Para bases de datos muy grandes (>10 GB), la asignación de memoria se puede ajustar mediante una pragma de SQLite:

```sql
-- Configurar mediante una pragma de SQLite (ajustar en core.ts o en tiempo de ejecución)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Compactación

Las instancias de OmniRoute que se ejecutan durante largos periodos se benefician de ejecutar `VACUUM` ocasionalmente:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Ejecútelo mensualmente durante periodos de poco tráfico. (El modo WAL reduce la necesidad, pero no la elimina).

---

## Comprobación de estado

`src/lib/db/healthCheck.ts` proporciona **diagnósticos del estado de la base de datos**:

Ambos verbos requieren autenticación (de lo contrario, se devuelve `401`). `GET` solo realiza el diagnóstico; `POST` ejecuta la
misma comprobación con `autoRepair` habilitado.

```bash
GET  /api/db/health   # diagnosticar
POST /api/db/health   # diagnosticar + reparar
```

La respuesta es el `DbHealthCheckResult` generado por `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Los presupuestos de dominio hacían referencia a claves de API que ya no existen.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Campo             | Significado                                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` cuando `issues` está vacío. `driver` nunca influye en este valor.                                                                                                                                           |
| `issues[].type`   | Uno de `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                                            |
| `repairedCount`   | Filas reparadas durante esta ejecución; siempre es `0` cuando `autoRepair` es falso.                                                                                                                               |
| `backupCreated`   | Indica si se creó una copia de seguridad antes de realizar la reparación.                                                                                                                                          |
| `checkedAt`       | Marca de tiempo ISO compartida por la ejecución y por cualquier nota de reparación que esta escriba.                                                                                                               |
| `driver.name`     | Controlador de SQLite que atiende la base de datos comprobada.                                                                                                                                                     |
| `driver.degraded` | `true` cuando las escrituras no están respaldadas de forma duradera por el archivo de la base de datos: el mecanismo alternativo WASM `sql.js` (persistencia del archivo completo) o una base de datos en memoria. |

La herramienta MCP `omniroute_db_health_check` devuelve la misma carga útil.

Ejecute `PRAGMA integrity_check` para detectar daños:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Debería mostrar: ok
```

Si devuelve cualquier valor distinto de `ok`, **deje de usar la base de datos inmediatamente** y restáurela desde una copia de seguridad.

---

## Recuperación ante desastres

### Escenario 1: archivo WAL perdido

Falta el archivo `-wal`, pero `-shm` y la base de datos principal están intactos:

```bash
# Se recupera automáticamente al abrirse de nuevo
omniroute
```

Si SQLite no puede recuperarse automáticamente:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Escenario 2: archivo principal de la base de datos dañado

Restaure desde una copia de seguridad:

```bash
omniroute sync pull --merge   # o bien: omniroute backup restore <backup-id>
```

### Escenario 3: clave de cifrado perdida

**No es posible recuperar los datos** sin la clave. Los campos cifrados no se pueden leer. Vuelva a añadir manualmente todos los proveedores con credenciales nuevas.

> **Mitigación**: Haga siempre una copia de seguridad de la clave de cifrado por separado, preferiblemente en un gestor de contraseñas o KMS.

### Escenario 4: disco lleno

SQLite devolverá errores `SQLITE_FULL`. Libere espacio en disco y, a continuación:

```bash
# Cree un punto de control del WAL para liberar espacio
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operaciones comunes

### Inspeccionar una tabla

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Contar las filas de todas las tablas

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Restablecer (borrar) todos los datos

```bash
# Detenga primero OmniRoute
omniroute stop

# Elimine el archivo de la base de datos
rm ~/.omniroute/storage.sqlite*

# Reinicie (se volverá a crear una base de datos vacía)
omniroute
```

Para un restablecimiento **selectivo** (conservar los proveedores y borrar el uso):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportar una sola tabla

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Solución de problemas

### "La base de datos está bloqueada"

Otro proceso mantiene un bloqueo de escritura. Puede:

- Esperar a que finalice el otro proceso (compruebe `lsof | grep storage.sqlite`)
- Finalizar el otro proceso
- Si el problema persiste, reiniciar OmniRoute

### "Error en la restricción de clave externa"

Un módulo de dominio está infringiendo la integridad referencial. Compruebe:

- Filas huérfanas en tablas dependientes
- Eliminaciones en cascada que no se propagaron
- Alguna migración reciente que haya modificado una clave externa

Ejecute `PRAGMA foreign_key_check;` para encontrar las infracciones.

### "Memoria insuficiente"

La E/S de SQLite asignada en memoria está superando el límite del sistema operativo. Redúzcala mediante un pragma de SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB en lugar de 256MB
```

O desactívela:

```sql
PRAGMA mmap_size = 0;
```

### "La migración falló a mitad del proceso"

La migración se ejecutó dentro de una transacción, por lo que debería haberse revertido. Si no fue así:

1. **Detenga OmniRoute** (para evitar nuevos intentos)
2. **Compruebe el estado de la base de datos** con `sqlite3`
3. **Corrija manualmente** la migración parcial
4. **Vuelva a ejecutar** OmniRoute (se reintentará la migración)

Para evitarlo, pruebe siempre las migraciones primero en una copia.

---

## Véase también

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tablas de uso
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — supervisión del estado
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — flujo de publicación
- Código fuente: `src/lib/db/` (más de 80 archivos, unas 25 000 líneas de código)
