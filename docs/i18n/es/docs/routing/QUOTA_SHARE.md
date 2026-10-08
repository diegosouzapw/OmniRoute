# Quota Sharing Engine (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referencia del documento**: `docs/routing/QUOTA_SHARE.md`
> Parte del Grupo B (planes 16 + 22).

---

## Descripción general

El motor de reparto de cuotas distribuye equitativamente la cuota temporal de un proveedor (p. ej., la ventana de 5 horas de Codex, 1500 solicitudes/h de Kimi) entre varias claves de API que comparten la misma conexión.

**Problema que resuelve:** OmniRoute canaliza muchas claves de API a través de la misma cuenta del proveedor ascendente. Sin una lógica de reparto, una ráfaga de la clave A puede agotar la cuota del proveedor para esa hora, dejando bloqueadas las claves B y C hasta que se reinicie la ventana. El motor lo evita mediante:

1. El seguimiento del consumo acumulado de cada clave por dimensión (%, solicitudes, tokens, $).
2. La aplicación de un algoritmo equitativo con conservación del trabajo: una clave puede tomar prestadas las cuotas inactivas mientras el conjunto global no esté saturado.
3. La aplicación del resultado en la ruta crítica (`chatCore.ts`) antes de que la solicitud llegue al ejecutor ascendente.

---

## Algoritmo: reparto equitativo con conservación del trabajo

Implementado en `src/lib/quota/fairShare.ts`.

### Modos

| Condición                                  | Modo         | Comportamiento                                                                |
| ------------------------------------------ | ------------ | ----------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generoso** | La clave puede tomar prestado hasta el límite global menos el total consumido |
| `globalUsedPercent >= saturationThreshold` | **Estricto** | Aplica estrictamente la cuota equitativa individual                           |

Valor predeterminado: `saturationThreshold = 0.5` (variable de entorno `QUOTA_SATURATION_THRESHOLD`).

### Decisión por dimensión

Para cada dimensión activa del conjunto, el motor calcula:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = valor acumulado actual para esta clave (de QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Después:

- **`policy = hard`**: si `consumed > fairShareAllowed` y el modo es estricto → **bloquear**.
- **`policy = soft`**: si `consumed > fairShareAllowed` y el modo es estricto → **penalizar** (reducir la prioridad en la combinación; nunca bloquear de forma estricta).
- **`policy = burst`**: permitir mientras exista margen global, independientemente de la cuota equitativa.

### Límite absoluto

`capValue` + `capUnit` en una asignación constituyen un límite estricto independiente del modo o de la política. Cualquier dimensión en la que `consumed >= capValue` siempre **bloquea** la solicitud.

### Comprobación multidimensional

Una solicitud se bloquea si **cualquier** dimensión del conjunto la bloquearía. Las dimensiones son independientes: el agotamiento del porcentaje de 5 horas no afecta a la dimensión del porcentaje semanal.

### Préstamo

En modo generoso, una clave cuya asignación esté infrautilizada puede usar el excedente de las cuotas no utilizadas de otras claves. La fórmula es:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

donde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. El límite global (`limit` del conjunto para esa dimensión) siempre constituye el límite estricto.

---

## Contador de ventana deslizante

Implementado en `src/lib/quota/sqliteQuotaStore.ts` y `redisQuotaStore.ts`.

Dos bloques por `(apiKeyId, dimensionKey)`:

- `curr`: bloque actual (`floor(nowMs / windowMs)`)
- `prev`: bloque anterior (`curr - 1`)

Valor acumulado efectivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisión**: ~99 %. El error es, como máximo, del 1 % del tamaño de la ventana en el límite entre bloques (inherente a la aproximación de 2 bloques).

### Concurrencia

Controlador de SQLite: un mutex en memoria por clave `(apiKeyId | dimensionKey)` evita la condición de carrera de lectura-modificación-escritura. El patrón replica el mecanismo contra avalanchas de solicitudes de `src/sse/services/auth.ts`.

Controlador de Redis: script Lua EVAL para realizar incrementos atómicos; se ejecuta como un único comando de Redis.

---

## Controladores

### SQLite (predeterminado, sin instalación)

- Tabla: `quota_consumption` (consulte la migración `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Ideal para despliegues de una sola instancia.
- Toda la persistencia se encuentra en la base de datos SQLite existente de OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcional, múltiples instancias)

- Requiere el paquete npm `ioredis`.
- Los contadores se almacenan en Redis; los metadatos (grupos/asignaciones) permanecen en SQLite.
- Ideal para despliegues con múltiples réplicas donde los contadores deben compartirse.

### Cambio de controlador

Mediante la interfaz de configuración (`/dashboard/settings` → Almacén de cuotas), o mediante variables de entorno:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

La configuración de la base de datos tiene prioridad sobre las variables de entorno. Si `driver=redis`, pero falta la URL o
`ioredis` no está instalado, la factoría recurre a SQLite y registra una advertencia.

Orden de selección del controlador:

1. Configuración de la base de datos `quotaStore.driver`
2. Variable de entorno `QUOTA_STORE_DRIVER`
3. Predeterminado: `sqlite`

---

## Múltiples dimensiones

Un grupo puede tener varias dimensiones. Cada dimensión es independiente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // límite máximo global del grupo para esta dimensión
}
```

**Ejemplo: plan Codex** (5h% + semanal%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Una solicitud debe satisfacer todas las dimensiones para ser permitida.

---

## Solucionador de planes

Implementado en `src/lib/quota/planResolver.ts`.

Precedencia (de mayor a menor):

1. **Anulación manual en la base de datos** — tabla `provider_plans`, por `connectionId`.
2. **Catálogo conocido** — `src/lib/quota/planRegistry.ts` (solo datos).
3. **Plan vacío** — sin dimensiones; se requiere configuración manual.

### Catálogo conocido

| Proveedor             | Dimensiones                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, desconocido), `tokens/weekly`           |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Sin valor predeterminado — se requiere configuración manual   |

---

## Integración en la canalización

### Hook PRE (`open-sse/handlers/chatCore.ts`)

Se ejecuta antes del ejecutor del servicio de origen, después de las comprobaciones de autenticación y políticas:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() por dimensión
      → fairShare.decideFairShare()
      → si se bloquea → devolver 429 (buildErrorBody, regla estricta n.º 12)
      → si se permite + se reduce la prioridad → establecer quotaSoftPenalty=true en el candidato
  → executor.execute()
```

**Apertura ante fallos**: si `enforceQuotaShare` genera una excepción, la solicitud se permite
con un registro `pino.warn`. Esto evita que un error del motor de cuotas bloquee todo el
tráfico.

### Hook POST (registro del consumo)

Después de una respuesta correcta:

```
el ejecutor devuelve un resultado correcto
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() por dimensión
      → apertura ante fallos: los errores se registran como pino.warn y nunca se propagan al cliente
```

**Nota sobre desviaciones**: si `consume` falla después de la respuesta, el contador móvil registra un consumo inferior al real.
La señal de saturación del proveedor (p. ej., `anthropic-ratelimit-unified-5h-utilization`)
corrige la estimación global en la siguiente solicitud.

### Penalización leve de combinaciones (`open-sse/services/combo.ts`)

Cuando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // valor predeterminado: 0.7
}
```

La penalización se aplica después de todos los demás factores de puntuación. Reduce la
probabilidad de que la combinación automática seleccione una clave saturada sin bloquearla por completo.

---

## Recorrido por la interfaz de usuario

### `/dashboard/costs/quota-share` — Página principal de grupos

Componentes (todos en `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Propósito                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Tarjeta introductoria que explica el uso compartido de cuotas a nuevos usuarios                |
| `CreatePoolModal`      | Crea un nuevo grupo de cuotas (conexión + nombre + asignaciones iniciales)                     |
| `PoolCard`             | Resumen por grupo: nombre, conexión, número de asignaciones                                    |
| `DimensionBar`         | Barra apilada por dimensión: proporción de cada clave + uso global                             |
| `AllocationTable`      | Tabla con consumo, proporción justa, déficit/superávit e indicador de préstamo                 |
| `BurnRateChart`        | Gráfico de líneas de la tasa de consumo EMA (Recharts con carga diferida mediante `dynamic()`) |
| `EditAllocationsModal` | Edita los pesos, límites y políticas de asignación de un grupo                                 |

Hooks de la página:

- `usePools` — obtiene `GET /api/quota/pools` cada 30 s.
- `usePoolUsage` — obtiene `GET /api/quota/pools/[id]/usage` bajo demanda.
- `useLocalStoragePoolMigration` — se ejecuta una vez al montar para migrar datos heredados de LS.

### `/dashboard/costs/quota-share/plans` — Configuración del plan del proveedor

- `ProviderPlanConfigClient.tsx`: menú desplegable para seleccionar un proveedor, ver el
  plan resuelto (automático desde el catálogo o mediante anulación manual) y editar dimensiones.
- Los cambios se escriben en `PUT /api/quota/plans/[connectionId]`.
- La eliminación revierte al plan del catálogo o a un plan vacío.

---

## Variables de entorno

| Variable                           | Valor predeterminado | Descripción                                                              |
| ---------------------------------- | -------------------- | ------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`             | Controlador que se utilizará: `sqlite` o `redis`                         |
| `QUOTA_STORE_REDIS_URL`            | _(vacío)_            | URL de Redis, p. ej., `redis://localhost:6379`                           |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`                | 0..1; `>= threshold` activa el modo estricto                             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`                | 0..1; multiplicador de la puntuación combinada de política flexible      |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`                 | Días antes de que GC elimine los bloques antiguos de `quota_consumption` |

La configuración de la base de datos (`quotaStore.*`) prevalece sobre las variables de entorno.

---

## Solución de problemas

### Redis está configurado, pero no se conecta

Compruebe que `ioredis` esté instalado (`npm ls ioredis`) y que se pueda acceder a
`QUOTA_STORE_REDIS_URL`. Si falla la conexión, la fábrica recurre a SQLite (se registra
con el nivel `warn`).

### `peek` devuelve datos obsoletos / apertura en caso de fallo

Si `peek` genera una excepción, `enforceQuotaShare` interpreta el resultado como
"permitir" (apertura en caso de fallo). Revise los registros de `pino` para buscar
entradas de `quota:enforce` y `quota:factory` e identificar la causa raíz.

### Desviación del contador de consumo

Si el uso real del proveedor difiere de los contadores, es algo esperado: la
ventana deslizante de 2 bloques tiene un error de aproximadamente el 1 % en los límites
de la ventana, y `consume` se ejecuta tras la respuesta sin esperar a que termine.
La señal de saturación (`saturationSignals.ts`) lee la utilización real del proveedor
con un TTL de 30 s y ajusta `globalUsedPercent` en consecuencia.

### El grupo muestra "sin datos" para la tasa de consumo

`computeBurnRate` requiere al menos 2 muestras históricas. Los grupos nuevos sin llamadas
previas a `consume` mostrarán `tokensPerSecond: 0` y `timeToExhaustionMs: null`.

---

## Migración desde localStorage

Cuando `/dashboard/costs/quota-share` se carga por primera vez, el hook `useLocalStoragePoolMigration`
comprueba:

1. Que `localStorage.getItem("omniroute:quota-share:pools")` no esté vacío.
2. Que `GET /api/quota/pools` devuelva `[]` (la BD está vacía).

Si ambas condiciones se cumplen, envía cada pool heredado a `POST /api/quota/pools` por lotes
y, a continuación, elimina la clave de localStorage. La migración es idempotente: la condición 2 evita
que se vuelva a realizar la migración.

---

## Clasificación interna de la estrategia

`quota-share` es una estrategia de enrutamiento **exclusivamente interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` en
`src/shared/constants/routingStrategies.ts`). Se utiliza exclusivamente con las combinaciones de pools `qtSd/`
generadas por el sistema y se excluye deliberadamente de `ROUTING_STRATEGY_VALUES` para que nunca
aparezca como una opción seleccionable por el usuario en la interfaz de usuario o la API.

---

## Cobertura de pruebas

El motor quota-share incluye dos niveles de cobertura automatizada:

| Suite                  | Comando                                                                | Qué cubre                                                                                                                                                                                                                                            |
| :--------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitarias (29 pruebas) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Planificador DRR, control de saturación, límites de concurrencia, cálculo de fairShare, gestión de colas de trabajo pendiente                                                                                                                        |
| Matriz de integración  | `npm run test:combo:matrix`                                            | Decisión de enrutamiento integral a través del pipeline real de combinaciones; equidad DRR + pérdida de prioridad por saturación mediante puntos de integración reales (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

La matriz de integración se ejecuta en CI junto con las 19 estrategias públicas. La suite de pruebas unitarias
puede ejecutarse de forma independiente.

---

## Resumen del esquema de la BD

Tres tablas añadidas por las migraciones `078`, `079` y `085`:

- `quota_pools` + `quota_allocations`: definiciones de pools y asignaciones por clave.
- `quota_consumption`: contadores móviles de 2 buckets por `(apiKeyId, dimensionKey)`.
- `provider_plans`: anulaciones manuales de planes de proveedores (dimensiones JSON por connectionId).

Todas las tablas se añaden mediante migraciones idempotentes con `CREATE TABLE IF NOT EXISTS`.
