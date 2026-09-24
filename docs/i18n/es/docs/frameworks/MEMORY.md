# Memory System (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Fuente de referencia:** `src/lib/memory/` y `src/app/api/memory/`
> **Última actualización:** 2026-06-28 — v3.8.40 (desactivada de forma predeterminada + puesta al día de la cuantización int8)

OmniRoute proporciona memoria conversacional persistente asociada a una clave de API (y
opcionalmente a un id de sesión). Los recuerdos se extraen automáticamente de las respuestas del LLM
mediante una correspondencia ligera de patrones con expresiones regulares y se vuelven a insertar en las
solicitudes posteriores como mensaje inicial del sistema (o como primer mensaje del usuario para los proveedores que
rechazan el rol de sistema).

> **La memoria está DESACTIVADA de forma predeterminada (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ahora es `false` (`src/lib/memory/settings.ts`). Habilitar la memoria inserta hasta
> `maxTokens` (~2k) de contexto recuperado en **cada** solicitud de chat, lo que
> se factura; esto supone un coste inesperado para las instalaciones nuevas y para los clientes que administran su
> propio contexto. Actívela explícitamente en **Configuración → Memoria** (la
> pestaña `MemorySkillsTab` muestra un aviso sobre el coste en tokens cuando la memoria está habilitada).
> Un cliente puede excluir una solicitud individual mediante el encabezado de solicitud
> `x-omniroute-no-memory` (`true`/`1`/`yes`); consulte la tabla de encabezados de solicitud en
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Una solicitud sin memoria establece
> `memoryOwnerId = null`, lo que deshabilita **tanto** la inserción de memoria como la de habilidades para
> esa solicitud (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

La memoria está **restringida por clave de API**, no por usuario: cada solicitud autenticada
con la misma clave de API comparte el mismo conjunto de memoria, con una restricción adicional opcional
por `sessionId`.

## Arquitectura

```
Cliente → /v1/chat/completions (apiKeyInfo resuelto previamente)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrae el id
    → getMemorySettings()                     # configuración almacenada en caché
    → shouldInjectMemory(body, {enabled})     # condición de acceso
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vector opcional
    → injectMemory(body, memories, provider)  # mensaje del sistema o del usuario
  → llamada al proveedor ascendente
  → al recibir la respuesta: extractFacts(text, apiKeyId, sessionId)  # sin bloqueo
    → setImmediate → createMemory(fact) por cada coincidencia
                   → embed(content) + upsertVector(id, vec)
```

Los puntos de llamada de inserción y extracción están conectados en
`open-sse/handlers/chatCore.ts` (busque `retrieveMemories`, `injectMemory`
y `extractFacts`).

## Arquitectura del motor (resolución en 3 niveles)

El motor de memoria determina la ruta de recuperación en tiempo de ejecución según la
infraestructura y la configuración disponibles. Existen tres niveles, aplicados en orden de prioridad:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEL 0 — Palabras clave (FTS5)                             │
  │  Disponibilidad determinada mediante sondeo: FTS5 cuando la  │
  │  compilación de SQLite lo admite (better-sqlite3 /           │
  │  node:sqlite / bun:sqlite); no disponible en compilaciones   │
  │  sin FTS5 (p. ej., sql.js/WASM — "no such module: fts5").    │
  │  Se usa cuando strategy = "exact" o como alternativa; el     │
  │  campo keyword de engine-status refleja el sondeo.           │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ ¿strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEL 1 — Vector integrado (sqlite-vec)                     │
  │  sqlite-vec v0.1.9 cargado mediante db.loadExtension().      │
  │  Búsqueda exhaustiva KNN sobre vectores Float32. Activo si:  │
  │   • sqlite-vec loadExtension se ejecuta correctamente        │
  │   • Hay disponible una fuente de embeddings (remote |        │
  │     static | transformers) capaz de generar un Float32Array  │
  │   • Existe la tabla vec_memories (se crea en el primer       │
  │     ready())                                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ ¿qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEL 2 — Qdrant (base de datos vectorial externa opcional) │
  │  Cuando está habilitado, sustituye a sqlite-vec para         │
  │  semantic/hybrid. Requiere una instancia de Qdrant en        │
  │  ejecución y un host/puerto configurados.                    │
  └─────────────────────────────────────────────────────────────┘
```

La degradación es automática y transparente:

- Si sqlite-vec no puede cargarse, el nivel 1 no está disponible → se recurre al nivel 0.
- Si la fuente de embeddings devuelve un error, el nivel 1 recurre al nivel 0.
- Si Qdrant no funciona correctamente, el nivel 2 recurre al nivel 1 (o al nivel 0 si el nivel 1
  tampoco está disponible).

## Fuentes de embeddings

La capa de embeddings (`src/lib/memory/embedding/`) determina qué fuente usar
en función de `MemorySettingsExtended.embeddingSource`:

| Fuente         | Descripción                                                                                           | Clave requerida | Arranque en frío    |
| -------------- | ----------------------------------------------------------------------------------------------------- | --------------- | ------------------- |
| `remote`       | Usa la API de embeddings de un proveedor configurado (OpenAI, Cohere, etc.)                           | Sí              | Ninguno             |
| `static`       | Embeddings locales mediante tabla de consulta con `potion-base-8M` (WordPiece + agrupación por media) | No              | ~200ms              |
| `transformers` | Inferencia ONNX local mediante `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                     | No              | ~3s + ~400MB de RAM |
| `auto`         | Resolución en tiempo de ejecución: remoto (si existe una clave) → estático → transformers → null      | Depende         | Depende             |

**Orden de resolución para `auto`:**

1. Busca el primer proveedor en `listEmbeddingProviders()` con `hasKey === true` → `remote`.
2. Si `settings.staticEnabled === true` → `static`.
3. Si `settings.transformersEnabled === true` → `transformers`.
4. De lo contrario → `null` (se degrada a una búsqueda por palabras clave de FTS5).

La caché de embeddings (`src/lib/memory/embedding/cache.ts`) usa un mapa LRU
en memoria cuya clave es `${source}:${model}:${dim}:${sha256(text)}`, limitado a
`MEMORY_EMBEDDING_CACHE_MAX` entradas (1000 de forma predeterminada) con un TTL de
`MEMORY_EMBEDDING_CACHE_TTL_MS` (5 min de forma predeterminada). Se comparte entre
todos los consumidores durante el ciclo de vida del proceso.

## RRF híbrido (k=60)

Cuando `strategy = "hybrid"` y el almacén vectorial está disponible, la recuperación usa
fusión de rangos recíprocos para combinar los resultados de FTS5 y vectoriales:

```
RRF(d) = Σ  1 / (k + rank_i(d))      donde k = 60 (configurable mediante MEMORY_RRF_K)
          i
```

Concretamente:

1. Ejecuta la búsqueda FTS5 → lista ordenada `R_fts` (posición 1..N).
2. Ejecuta la búsqueda vectorial KNN → lista ordenada `R_vec` (posición 1..M).
3. Para cada `memoryId` único:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 si no está en la lista).
4. Ordena por `rrf_score` DESC y aplica el recorrido según el presupuesto de tokens.

Es bien conocido que RRF es eficaz sin necesidad de normalizar las puntuaciones entre
sistemas de recuperación heterogéneos. El valor predeterminado `k=60` proviene del artículo
original de Cormack et al. y funciona bien para corpus pequeños (<10k recuerdos).

## Relleno (diferido + reindexación)

Cuando cambia el modelo de embeddings (detectado mediante `embedding_signature`), se
reconstruye el almacén vectorial y todos los recuerdos existentes se marcan con
`needs_reindex = 1` en la tabla `memories`.

**Relleno diferido**: En la siguiente recuperación, cualquier recuerdo que no tenga una
entrada vectorial se convierte en embedding y se inserta en `vec_memories` antes de ejecutar
la búsqueda. Esto amortiza el coste del relleno entre solicitudes reales sin bloquear el inicio.

**Reindexación explícita**: La pestaña Motor en `/dashboard/memory` proporciona un
botón «Reindexar ahora» que llama a `POST /api/memory/reindex`. El controlador llama a
`runReindexBatch()` desde `src/lib/memory/reindex.ts`, que procesa hasta
`limit` entradas pendientes por solicitud. El progreso puede consultarse periódicamente mediante
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

La tabla `memory_vec_meta` (migración `083_memory_vec.sql`) almacena:

- `active_dim` — dimensión vectorial actual (null = aún no calibrada).
- `embedding_signature` — `${source}:${model}:${dim}` usado para detectar cambios.
- `last_reset_at` — marca de tiempo del último reinicio completo.
- `vec_loaded` — indicador 0/1 de si sqlite-vec se cargó correctamente.

## Extensión de la configuración

Hay nueve campos de embeddings y vectores disponibles en `MemorySettingsExtended` en
`src/shared/schemas/memory.ts`, que se persisten mediante `src/lib/db/settings.ts`:

| Campo                    | Tipo                                               | Valor predeterminado | Descripción                                                      |
| ------------------------ | -------------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`             | Fuente de embeddings que se utilizará                            |
| `embeddingProviderModel` | `string \| null`                                   | `null`               | Proveedor/modelo con el formato `provider/model`                 |
| `customBaseUrl`          | `string \| null`                                   | `null`               | URL base del endpoint compatible con OpenAI solo para Memory     |
| `customModelId`          | `string \| null`                                   | `null`               | ID de modelo enviado al endpoint personalizado                   |
| `transformersEnabled`    | `boolean`                                          | `false`              | Habilitación voluntaria de Transformers.js (MiniLM, ~400MB)      |
| `staticEnabled`          | `boolean`                                          | `false`              | Habilitación voluntaria del modelo local estático potion-base-8M |
| `rerankEnabled`          | `boolean`                                          | `false`              | Habilitar el paso de reranking (añade +200-500ms/solicitud)      |
| `rerankProviderModel`    | `string \| null`                                   | `null`               | Proveedor/modelo de reranking con el formato `provider/model`    |

`rerankProviderModel` se resuelve mediante `POST /v1/rerank` (invocado a través de loopback), por lo que acepta cualquier valor admitido por esa ruta: un modelo de reranking seleccionado para la nube (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) o un nodo proveedor compatible con OpenAI con el formato `<node-prefix>/<model>` (p. ej., `skilled-mini/bge-reranker-v2-m3` para una instancia de TEI/Infinity). Los nodos de loopback siempre son aptos; un nodo ubicado en otro host (LAN, Tailscale) requiere además la marca de funcionalidad `RERANK_REMOTE_PROVIDER_NODES` y debe cumplir la política de URL salientes del proveedor; consulte [Marcas de funcionalidad](../reference/FEATURE_FLAGS.md). El selector del panel muestra los proveedores seleccionados y los nodos locales; cualquier cadena `provider/model` válida puede configurarse directamente mediante `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backend vectorial que se utilizará |

Estos campos se exponen mediante `GET /PUT /api/settings/memory` (esquema `MemorySettingsExtendedSchema`).

Para la fuente `remote`, Memory también acepta las opciones de configuración `customBaseUrl` y
`customModelId`. Juntas permiten seleccionar un endpoint `/embeddings`
compatible con OpenAI y un modelo sin modificar el registro global de embeddings. El endpoint se
normaliza antes de usarlo y se comprueba mediante la política de URL salientes del proveedor: se
requiere HTTP(S), se rechazan las credenciales incrustadas y las cadenas de consulta, y las direcciones
de metadatos de la nube siguen bloqueadas. Los valores vacíos conservan el proveedor seleccionado en el registro. Los errores
devueltos al panel se sanean y las credenciales del endpoint nunca se registran.

> **TODO (D20):** El ámbito `global` (compartir memorias entre todas las claves de API) no está
> implementado en esta versión. Requiere cambios en el esquema y una ruta de recuperación
> global. Realizar su seguimiento por separado.

## Capas de almacenamiento

### Principal: SQLite (tabla `memories`)

Creada por la migración `015_create_memories.sql`:

| Columna                     | Tipo               | Notas                                                                          |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | UUID generado mediante `crypto.randomUUID()`                                   |
| `api_key_id`                | `TEXT NOT NULL`    | Clave de API propietaria                                                       |
| `session_id`                | `TEXT`             | Ámbito opcional por conversación                                               |
| `type`                      | `TEXT NOT NULL`    | Uno de `factual`, `episodic`, `procedural`, `semantic`                         |
| `key`                       | `TEXT`             | Clave de upsert estable, p. ej., `preference:i_prefer_python`                  |
| `content`                   | `TEXT NOT NULL`    | Texto real del hecho                                                           |
| `metadata`                  | `TEXT`             | Blob JSON (categoría, extractedAt, fuente, ...)                                |
| `created_at` / `updated_at` | `TEXT`             | Cadenas ISO 8601                                                               |
| `expires_at`                | `TEXT`             | Caducidad opcional; `NULL` significa permanente                                |
| `memory_id`                 | `INTEGER UNIQUE`   | Añadido por `023_fix_memory_fts_uuid.sql` para vincular UUIDs ↔ rowids de FTS5 |

Índices: `api_key_id`, `session_id`, `type`, `expires_at`, además del índice
único `memory_id`.

**Semántica de upsert**: `createMemory()` busca una fila existente con el mismo
`(api_key_id, key)` y la actualiza en el mismo lugar cuando la encuentra (fusionando
`metadata` mediante una expansión superficial). Esto evita que la tabla crezca
sin límite debido a declaraciones de preferencias repetidas.

### Búsqueda de texto completo (tabla virtual `memory_fts`)

`022_add_memory_fts5.sql` crea una tabla virtual FTS5 sobre `content` y
`key`. `023_fix_memory_fts_uuid.sql` corrige un error real en el que la clave
primaria UUID no se vinculaba con el rowid entero de FTS5: la migración añade la
columna `memory_id`, vuelve a crear la tabla FTS y configura disparadores
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) que mantienen FTS sincronizado en
INSERT, DELETE y UPDATE.

Usada por `retrieval.ts` para las estrategias `semantic` y `hybrid` (véase a continuación).
El código de recuperación realiza una comprobación con `hasTable("memory_fts")` y recurre al
orden cronológico si falta la tabla FTS o si la consulta FTS produce un error.

### Opcional: Qdrant (almacén de vectores de nivel 2)

`src/lib/memory/qdrant.ts` implementa una integración opcional con Qdrant como almacén
de vectores de nivel 2. La recuperación solo se dirige a Qdrant cuando el selector del motor
`memoryVectorStore === "qdrant"`; el valor predeterminado `"auto"` (y `"sqlite-vec"`)
**nunca** selecciona Qdrant. El conmutador de la pestaña Engine configura **tanto**
`qdrantEnabled` como `memoryVectorStore`: al habilitarlo, Qdrant se convierte en el
almacén principal; al deshabilitarlo, se restablece a `"auto"` (#5597; antes de esa
corrección, habilitarlo no tenía efecto porque nada escribía en el selector del motor).
Si Qdrant no está accesible o no devuelve nada, la recuperación recurre a
sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — genera el embedding de `key + content` con el modelo de embeddings configurado, garantiza que la colección exista (crea vectores con distancia coseno en el primer uso) e inserta o actualiza un punto con la carga útil `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — genera el embedding de la consulta y busca en la colección aplicando el filtro `kind = "omniroute_memory"` y, opcionalmente, por `apiKeyId` / `sessionId`. Limita `topK` al intervalo `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — elimina un único punto. Es llamada por `deleteMemory()` después de eliminar la fila de SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — elimina en bloque los puntos cuyo `expiresAtUnix` ya haya vencido o cuyo `createdAtUnix` sea anterior al límite de retención. Primero los cuenta para que el panel pueda mostrar las cifras reales.
- `checkQdrantHealth()` — sonda de estado `GET /readyz` con latencia.

La interfaz de configuración permite configurar Qdrant, comprobar su estado, probar la búsqueda semántica y realizar la limpieza en la **pestaña Motor** de `/dashboard/memory`. Las rutas correspondientes bajo `src/app/api/settings/qdrant/` están todas conectadas desde la versión v3.8.6:

| Ruta                                    | Método        | Descripción                                    |
| --------------------------------------- | ------------- | ---------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Leer / actualizar la configuración de Qdrant   |
| `/api/settings/qdrant/health`           | `GET`         | Sonda de disponibilidad + latencia             |
| `/api/settings/qdrant/search`           | `POST`        | Prueba de búsqueda semántica                   |
| `/api/settings/qdrant/cleanup`          | `POST`        | Eliminar puntos caducados / antiguos           |
| `/api/settings/qdrant/embedding-models` | `GET`         | Enumerar los modelos de embeddings disponibles |

**Notas de comportamiento (qué esperar):**

- **Selección del motor** — habilitar Qdrant en la pestaña Motor lo convierte en el almacén principal (establece `memoryVectorStore="qdrant"`); deshabilitarlo restablece el valor a `"auto"` (#5597).
- **Sin carga retroactiva** — solo las memorias creadas o actualizadas **después** de habilitar Qdrant se escriben en él (escritura doble asíncrona sin esperar respuesta). Las memorias preexistentes de SQLite **no** se migran; «Reindexar ahora» solo reconstruye el índice de sqlite-vec, no el de Qdrant.
- **La dimensión del vector se detecta automáticamente** a partir del embedding real en el primer uso; no hay ningún campo de dimensión que completar. Cambiar el modelo de embeddings después de que exista una colección **no** se gestiona automáticamente: la colección existente permanece intacta, las escrituras y búsquedas con dimensiones incompatibles fallan y recurren a sqlite-vec. Vuelve a crear la colección (con un nombre nuevo o eliminándola en Qdrant) para cambiar de modelo de embeddings.
- **Métrica de distancia** — siempre **Cosine** (codificada de forma fija al crear la colección; no es configurable).
- **Autenticación** — solo mediante clave de API (enviada como cabecera `api-key`; opcional para una instancia local de Docker sin autenticación). No se utilizan JWT ni RBAC.
- **Campos de configuración** — la interfaz expone `host`, `port`, `collection`, `embeddingModel` y `apiKey`. `vectorSize` / `hnswEfConstruct` solo están disponibles mediante variables de entorno o la base de datos, y `vectorSize` no se utiliza para crear la colección (la dimensión procede del embedding).

### Cuantización de vectores (int8 — opcional, ambos backends)

Ambos backends vectoriales admiten **cuantización int8 opcional** para reducir el uso de memoria de los vectores almacenados (aproximadamente 4 veces menor que Float32), con una pequeña pérdida de exhaustividad. De forma predeterminada está **desactivada** en ambos: los vectores mantienen la precisión completa a menos que se habilite explícitamente.

| Backend    | Configuración                                   | Tipo                           | Valor predeterminado | Dónde se lee                                                |
| ---------- | ----------------------------------------------- | ------------------------------ | -------------------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (clave de BD)              | `"none" \| "int8" \| "binary"` | `"none"`             | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (variable de entorno) | `"none" \| "int8"`             | `"none"`             | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** se configura por instancia mediante la clave de configuración `qdrantQuantization` (expuesta como el campo `quantization` en `PUT /api/settings/qdrant`). Cuando su valor es `"int8"`, `buildQuantizationConfig()` solicita cuantización escalar (`always_ram`, cuantil `0.99`) y las búsquedas habilitan `rescore: true` para que los vectores de precisión completa refinen el conjunto de candidatos int8.
- La cuantización de **sqlite-vec** se configura **solo mediante una variable de entorno** (no es una configuración de la base de datos): establece `MEMORY_VEC_QUANTIZATION=int8` para almacenar los vectores locales como una columna `int8[dim]` mediante `vec_quantize_int8(?, 'unit')`. El modo elegido se incorpora a `embedding_signature` (con el sufijo `:int8`), por lo que cambiar de modo activa una reindexación completa de la tabla `vec_memories`: la misma ruta de relleno diferido que se utiliza cuando cambia el modelo de embeddings.

## Tipos de memoria

`MemoryType` (`src/lib/memory/types.ts`):

| Tipo         | Se utiliza para                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `factual`    | Preferencias, datos estables del usuario, patrones de comportamiento                               |
| `episodic`   | Decisiones vinculadas a un momento específico ("Elegí Postgres")                                   |
| `procedural` | Memoria de flujos de trabajo o procedimientos (reservada; actualmente no hay extractor automático) |
| `semantic`   | Reservada para entradas del almacén de vectores                                                    |

La estrategia de recuperación de `MemoryConfig` es una de `exact`, `semantic` o `hybrid`,
y el ámbito es uno de `session`, `apiKey` o `global`. El ámbito predeterminado de
`getMemorySettings()` es `apiKey`.

## Extracción de datos (`extraction.ts`)

La extracción está **basada en expresiones regulares**, no en un LLM; se ejecuta dentro del proceso con
`setImmediate()`, por lo que nunca bloquea el flujo de respuesta:

- **Patrones de preferencias** → `MemoryType.FACTUAL`
  (p. ej., `Prefiero …`, `Me gusta mucho …`, `mi favorito es …`, `Odio …`)
- **Patrones de decisiones** → `MemoryType.EPISODIC`
  (p. ej., `Usaré …`, `Elegí …`, `Me decidí por …`, `Voy a adoptar …`)
- **Patrones de comportamiento** → `MemoryType.FACTUAL`
  (p. ej., `Normalmente …`, `Siempre …`, `Suelo …`)

Cada coincidencia se sanea (`trim`, reducción de espacios en blanco, límite de 500 caracteres),
se deduplica dentro del lote mediante un `factKey(category, content)` estable y
se almacena mediante `createMemory()` con los metadatos
`{category, extractedAt, source: "llm_response"}`. El texto de entrada está limitado a
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`); cuando es más largo, se utiliza la **parte final** del texto
para que siempre se tenga en cuenta el contenido más reciente del asistente.

`extractFactsFromText(text)` se exporta para las pruebas y devuelve los datos estructurados
sin almacenarlos.

## Recuperación (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` es el punto de entrada principal. Esta función:

1. Normaliza y valida la configuración mediante `MemoryConfigSchema`.
2. Devuelve `[]` inmediatamente cuando `enabled` es false o `maxTokens <= 0`.
3. Limita `maxTokens` al intervalo `[1, 8000]`.
4. Detecta si existe la tabla moderna `memories` (en lugar de la tabla heredada `memory`)
   para que las bases de datos antiguas sigan funcionando.
5. Construye la consulta base con una comprobación de expiración
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), un ámbito de
   sesión opcional y un límite opcional de `retentionDays`.
6. Se bifurca según la estrategia:
   - **`exact`** (predeterminada): orden cronológico `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: si `config.query` está definido y existe `memory_fts`, realiza un `JOIN`
     con `memory_fts MATCH ?` y ordena por clasificación FTS; vuelve al orden cronológico
     cuando FTS devuelve 0 filas.
   - **`hybrid`**: unión de los resultados FTS (con mayor relevancia) y el
     conjunto cronológico, deduplicada por id.
7. Calcula una puntuación de relevancia por palabras clave (`getRelevanceScore`) sobre
   `content`, `key` y el JSON de `metadata` cuando se proporciona una consulta. Se
   filtran las filas con puntuación cero.
8. Ordena por puntuación descendente y, después, por `createdAt` descendente.
9. Recorre la lista clasificada y acepta entradas mientras el total acumulado de
   `estimateTokens(content)` (≈ `length / 4`) permanezca dentro del presupuesto. Siempre
   devuelve al menos una entrada cuando hay alguna coincidencia.

`estimateTokens` se exporta y se utiliza en la recuperación, el resumen y la herramienta MCP
`omniroute_memory_search`.

## Inyección (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Une todos los contenidos de memoria en una única cadena `Memory context: …`.
2. Elige una estrategia según el nombre del proveedor:
   - **Mensaje del sistema** (opción predeterminada para OpenAI, Anthropic, Gemini, …) — antepone
     un `{role: "system", content: memoryText}` antes de cualquier mensaje del sistema
     existente, de modo que los prompts del sistema del usuario sigan teniendo prioridad.
   - **Mensaje del usuario** (alternativa) — para los proveedores incluidos en
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Estos rechazan el rol del sistema
     y, de lo contrario, devolverían un error 400 (véase el issue #1701 para GLM/Zhipu).
3. Registra el recuento, la estrategia y el modelo en `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` se exporta para los consumidores que necesiten
tomar sus propias decisiones de enrutamiento. Los proveedores desconocidos usan `true`
de forma predeterminada (rol del sistema permitido) por seguridad.

## Configuración (`settings.ts`)

La configuración de memoria se **almacena en la tabla de configuración de la BD**, no en variables de entorno.
`getMemorySettings()` lee desde `getSettings()` y almacena en caché el resultado
en el proceso; la ruta PUT de configuración llama a `invalidateMemorySettingsCache()`
después de las escrituras.

### Campos heredados (todas las versiones)

| Clave de BD           | Tipo    | Valor predeterminado                                        | Control de la interfaz                                         |
| --------------------- | ------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (desactivado de forma predeterminada desde v3.8.30) | Activación/desactivación de la memoria                         |
| `memoryMaxTokens`     | integer | `2000` (intervalo `0–16000`)                                | Presupuesto de tokens para la inyección                        |
| `memoryRetentionDays` | integer | `30` (intervalo `1–365`)                                    | Período de retención                                           |
| `memoryStrategy`      | enum    | `"hybrid"` (uno de `recent`, `semantic`, `hybrid`)          | Estrategia de recuperación                                     |
| `skillsEnabled`       | boolean | `false`                                                     | Activa la inyección de habilidades por clave (véase SKILLS.md) |

Nota: la estrategia de la interfaz `"recent"` se asigna a la estrategia de recuperación
interna `"exact"` mediante `toMemoryRetrievalConfig()` (orden cronológico).

### Campos nuevos (v3.8.6, plan 21 D9)

Consulte también la sección «Extensión de la configuración» anterior para ver las descripciones de los campos.

| Clave de BD                 | Campo de API             | Valor predeterminado |
| --------------------------- | ------------------------ | -------------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`             |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`               |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`              |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`              |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`              |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`               |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`             |

Las claves de BD relacionadas con Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` con valor predeterminado `"omniroute_memory"`,
`qdrantEmbeddingModel` con valor predeterminado `"openai/text-embedding-3-small"`) son leídas por
`normalizeQdrantConfig()` en `qdrant.ts`.

### Variables de entorno (v3.8.6)

Seis variables de entorno opcionales ajustan el comportamiento del motor en tiempo de ejecución (documentadas en `.env.example`):

| Variable                        | Valor predeterminado       | Descripción                                                                                                                                                     |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL de la caché de embeddings (5 min)                                                                                                                           |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Número máximo de entradas en la caché LRU de embeddings                                                                                                         |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repositorio de HF para el modelo de Transformers.js                                                                                                             |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repositorio de HF para el modelo estático potion                                                                                                                |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Ubicación donde se almacenan los modelos descargados                                                                                                            |
| `MEMORY_VEC_TOP_K`              | `20`                       | Valor top-K predeterminado para la búsqueda vectorial                                                                                                           |
| `MEMORY_RRF_K`                  | `60`                       | Constante k de RRF para la búsqueda híbrida                                                                                                                     |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Establézcalo en `int8` para almacenar vectores locales de sqlite-vec cuantizados (aprox. 4 veces más pequeños; opcional). Un cambio de modo obliga a reindexar. |

## Resumen (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` compacta el
contenido antiguo cuando el total acumulado de tokens de las memorias de una
clave supera el presupuesto. Itera por las filas en orden DESC según
`created_at`, conserva las filas que caben y, para el resto, reemplaza
`content` in situ por las tres primeras frases del original. `tokensSaved` es
la diferencia de `estimateTokens` entre el contenido anterior y el nuevo.

Esta rutina está **disponible, pero no se invoca automáticamente** en el flujo
actual del chat; invóquela desde una tarea cron, una acción administrativa o
el código de integración de `MemoryConfig.autoSummarize` si necesita una
compactación continua. La pérdida de datos es irreversible: el texto original
se sobrescribe.

## API REST

Todos los endpoints requieren autenticación de administración (`requireManagementAuth`).

### Endpoints principales de memoria (existentes + actualizados)

| Método   | Ruta                 | Descripción                                                                                                                                                                                        |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Lista paginada con filtros: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. La respuesta incluye `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                 |
| `POST`   | `/api/memory`        | Crea una entrada (validada con Zod: `content`, `key` y, opcionalmente, `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Invoca `createMemory()`, que hace upsert según `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Obtiene una única entrada por UUID                                                                                                                                                                 |
| `PUT`    | `/api/memory/[id]`   | Actualiza campos de la entrada (`type`, `key`, `content`, `metadata`). Cuerpo: `MemoryUpdatePutSchema`. También sincroniza el vector si hay disponible una fuente de embeddings.                   |
| `DELETE` | `/api/memory/[id]`   | Elimina una entrada; también la elimina de `vec_memories` (D15) y, en la medida de lo posible, de Qdrant. Devuelve 404 cuando no existe.                                                           |
| `GET`    | `/api/memory/health` | Ejecuta `verifyExtractionPipeline("health-check")`: ciclo completo de crear→listar→eliminar. Devuelve `{working, latencyMs, error?}`                                                               |

### Nuevos endpoints del motor de memoria (plan 21)

| Método | Ruta                              | Descripción                                                                                                                                                                                                             |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Simulación de `retrieveMemories`: devuelve resultados clasificados con puntuación, nivel y tokens. Cuerpo: `RetrievePreviewSchema`. NO inyecta ni modifica memorias.                                                    |
| `GET`  | `/api/memory/embedding-providers` | Enumera proveedores con modelos de embeddings e indica cuáles tienen una clave de API configurada.                                                                                                                      |
| `GET`  | `/api/memory/engine-status`       | Devuelve el estado completo del motor: nivel de palabras clave, resolución de embeddings, estadísticas del almacén vectorial, estado de Qdrant y configuración de reclasificación. Formato: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Activa manualmente la compactación de memoria. Cuerpo: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Devuelve `{candidates, tokensSaved}`.                                                          |
| `POST` | `/api/memory/reindex`             | Activa la reindexación vectorial de las memorias con `needs_reindex=1`. Cuerpo: `MemoryReindexSchema` (`force`). Devuelve `{started, pending}`.                                                                         |

### Endpoints de configuración

| Método | Ruta                                    | Descripción                                                                                                               |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` normalizado actual (7 campos nuevos + heredados)                                                 |
| `PUT`  | `/api/settings/memory`                  | Actualiza cualquier campo de `MemorySettingsExtendedSchema` (12 campos en total)                                          |
| `GET`  | `/api/settings/qdrant`                  | Configuración actual de Qdrant (`QdrantSettingsSchema`)                                                                   |
| `PUT`  | `/api/settings/qdrant`                  | Actualiza la configuración de Qdrant. Cuerpo: `QdrantSettingsUpdateSchema`. `apiKey` = una cadena vacía elimina la clave. |
| `GET`  | `/api/settings/qdrant/health`           | Sondeo de disponibilidad de la instancia de Qdrant configurada. Devuelve `QdrantHealthResultSchema`.                      |
| `POST` | `/api/settings/qdrant/search`           | Prueba de búsqueda semántica en Qdrant. Cuerpo: `QdrantSearchSchema` (`query`, `topK`).                                   |
| `POST` | `/api/settings/qdrant/cleanup`          | Elimina de Qdrant los puntos correspondientes a memorias caducadas o antiguas.                                            |
| `GET`  | `/api/settings/qdrant/embedding-models` | Enumera los modelos de embeddings disponibles para Qdrant.                                                                |

La consulta de listado de `/api/memory` admite tanto paginación basada en
`page` (`parsePaginationParams`) **como** un `offset` sin procesar; cuando
`offset` está presente, tiene prioridad y se calcula un `page` derivado para
el formato de la respuesta.

## Herramientas MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Cuando el servidor MCP está habilitado, se registran tres herramientas de memoria:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → encapsula `retrieveMemories()`. Desde v3.8.6 (D16), `strategy` se obtiene
  de `getMemorySettings()` en lugar de estar codificada como `"exact"`. Si
  se proporciona `query` y `strategy` es `semantic` o `hybrid`, se utiliza el
  almacén vectorial cuando está disponible.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → encapsula `createMemory()`. Acepta únicamente los 4 tipos canónicos:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → enumera las
  entradas coincidentes, las filtra opcionalmente por una marca de tiempo de
  creación anterior y, después, elimina cada una mediante `deleteMemory()`
  (que también elimina los vectores de sqlite-vec + Qdrant).

Consulta [MCP-SERVER.md](./MCP-SERVER.md) para obtener detalles sobre el transporte y el ámbito.

## Panel de control (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` es ahora un **Studio de 3 pestañas**:

### Pestaña: Memorias

- Tarjeta conceptual (explicación desplegable «Cómo funciona»).
- Lista, búsqueda y paginación en tiempo real (con antirrebote de 300 ms).
- Filtro por tipo (`factual` / `episodic` / `procedural` / `semantic` / todos).
- Modal para añadir memoria (clave, contenido, tipo).
- Edición en línea (botón de lápiz → `PUT /api/memory/[id]`).
- Eliminación por fila (con cuadro de diálogo de confirmación).
- Exportación JSON de la página actual; importación JSON mediante selector de archivos.
- Tarjetas de estadísticas: `totalEntries`, `tokensUsed`, `hitRate`.
- Botón «Compactar antiguas» → `POST /api/memory/summarize` (primero, una
  ejecución de prueba muestra el número de candidatas y, después, solicita confirmación).
- Un indicador de estado verde/rojo controlado por `GET /api/memory/health`.

### Pestaña: Entorno de pruebas

- Campo de consulta + selector de estrategia (Exacta / Semántica / Híbrida) + presupuesto de tokens.
- «Simular» → `POST /api/memory/retrieve-preview` — muestra resultados ordenados con
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel de resolución que muestra qué fuente de embeddings / almacén vectorial se utilizó y
  si se produjo una conmutación por error.

### Pestaña: Motor

- Panel de estado del motor (indicador FTS5 de palabras clave, indicador de embeddings, indicador del almacén vectorial,
  indicador de estado de Qdrant e indicador de reordenación).
- Botón «Reindexar ahora» → `POST /api/memory/reindex`.
- Selector de fuente de embeddings (automática / remota / estática / transformers + conmutadores).
- Tarjeta de configuración de Qdrant (conmutador de activación, host/puerto/colección/clave, prueba de conexión,
  prueba de búsqueda semántica, limpieza).
- Tarjeta de configuración de reordenación (conmutador de activación, selector de proveedor/modelo).

La configuración de memoria y Qdrant también está disponible en
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) como
interfaz de configuración heredada/global.

## Almacenamiento en caché

`src/lib/memory/store.ts` mantiene una caché aproximada de tipo LRU en el proceso
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, con un 20 %
de desalojo de las entradas más antiguas) para las lecturas de `getMemory(id)`, además de una capa
genérica de memoria caché clave/valor `memoryCache` (`src/lib/memory/cache.ts`) con métodos
`get`/`set`/`invalidate`, utilizada por los consumidores que desean su propia caché con ámbito definido (LRU
de 1 000 entradas, TTL predeterminado de 5 min).

## Privacidad y ciclo de vida

- La propiedad de la memoria corresponde al id de la clave de API (`resolveMemoryOwnerId` en
  `chatCore.ts`). Sin un `apiKeyInfo.id`, no se ejecutan la recuperación, la
  inyección ni la extracción.
- Las entradas con un `expires_at` futuro se excluyen de la recuperación; las
  entradas antiguas que superan `retentionDays` se excluyen mediante la cláusula
  `created_at >= cutoff` de `retrieveMemories`.
- Para realizar una eliminación permanente, use `DELETE /api/memory/[id]` u `omniroute_memory_clear`.
- La extracción se ejecuta en segundo plano mediante `setImmediate`; los errores se registran bajo
  `memory.extraction.background.failed` y nunca se muestran al solicitante.
- Los ciclos de ida y vuelta de verificación (`verifyExtractionPipeline`) eliminan sus propias
  entradas de prueba en un bloque `finally`.

## Véase también

- [SKILLS.md](./SKILLS.md) — la configuración `skillsEnabled` inyecta definiciones de
  herramientas junto con la memoria.
- [MCP-SERVER.md](./MCP-SERVER.md) — transporte/ámbitos de MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — superficie más amplia de la API.
- Módulos fuente:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF híbrido
  - `src/lib/memory/embedding/index.ts` — capa de embeddings multifuente
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — esquemas Zod para todos los cuerpos de la API de memoria
  - `src/shared/schemas/qdrant.ts` — esquemas Zod para la configuración/operaciones de Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD para `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + subrutas
  - `src/app/(dashboard)/dashboard/memory/` — interfaz de Studio (página + componentes +
    pestañas + hooks)
  - `open-sse/handlers/chatCore.ts` (integración de inyección/extracción)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Elección de un proveedor de embeddings (v3.8.16+)

El motor de memoria de OmniRoute admite **cuatro fuentes de embeddings** (`src/lib/memory/embedding/`). Cada una presenta distintas ventajas y desventajas en cuanto a **latencia, coste, calidad del modelo y complejidad de configuración**.

### Fuentes de embeddings

| Proveedor      | Fuente                                                     | Latencia                                  | Coste                | Calidad                            | Configuración                                   |
| -------------- | ---------------------------------------------------------- | ----------------------------------------- | -------------------- | ---------------------------------- | ----------------------------------------------- |
| `transformers` | Modelo ONNX local (Xenova/all-MiniLM-L6-v2)                | ~50-150ms (CPU)                           | Gratis               | Buena                              | Solo `npm install`                              |
| `static`       | Vectores precalculados (en caché)                          | <1ms                                      | Gratis               | N/D (depende del acierto de caché) | Ninguna                                         |
| `remote`       | API de OpenAI / Cohere / Voyage                            | ~100-300ms                                | $0.02-0.10/1M tokens | Excelente                          | Clave de API                                    |
| `auto`         | Selecciona la mejor fuente disponible durante la ejecución | Igual que la fuente seleccionada          | Gratis               | Igual que la fuente seleccionada   | Ninguna                                         |
| _(caché)_      | Capa LRU en memoria sobre cualquier fuente                 | <1ms (acierto), latencia completa (fallo) | Gratis               | Igual que la subyacente            | Siempre activa (no es una fuente seleccionable) |

### Árbol de decisión

```
                  ¿Cuál es el contexto de su despliegue?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 DESARROLLO/   PRODUCCIÓN   PRODUCCIÓN    PERÍMETRO /
   PRUEBAS      PEQUEÑA       GRANDE      SIN CONEXIÓN
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratis, sin API)          (mejor calidad) (sin internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            AÑADA SIEMPRE la capa `cache` encima
            (LruCache envuelve cualquier proveedor)
```

### Configuración de la base de datos y la API

Las opciones de embeddings de memoria se configuran mediante la API/interfaz de Configuración, no mediante variables de entorno. Las claves pertinentes de la base de datos de configuración en Configuración (`normalizeMemorySettings` en `src/lib/memory/settings.ts`) son:

- `memoryEmbeddingSource`: `"transformers"` (local), `"remote"` (basada en API, p. ej., OpenAI), `"static"` (almacén externo) o `"auto"`
- `memoryEmbeddingProviderModel`: identificador del modelo para fuentes remotas/estáticas (p. ej., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` o `"auto"`

#### Modelo local (`transformers`)

Utiliza transformers.js internamente para ejecutar modelos locales:

```bash
# Variables de entorno leídas en el código (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repositorio del modelo en HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Modelo estático Potion de HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Directorio de caché
```

#### Caché LRU de embeddings

La caché está siempre activa de forma predeterminada y se configura mediante variables de entorno:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Número máximo de elementos en caché
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Cifras de rendimiento

Benchmark en un servidor x86 típico de 4 núcleos (textos de ~100 tokens cada uno):

| Proveedor            | p50   | p95   | p99   | Coste / 1 millón de embeddings     |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratis                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Depende del alojamiento de Qdrant  |
| `cache` (acierto)    | <1ms  | <1ms  | 2ms   | Gratis                             |

---

## Patrones de extracción de hechos (v3.8.16+)

El módulo `extraction.ts` (`src/lib/memory/extraction.ts`) utiliza **coincidencia de patrones mediante expresiones regulares** para extraer hechos estructurados de los mensajes de las conversaciones. Comprender estos patrones le ayudará a ajustar la calidad de la extracción para su caso de uso.

### Categorías de patrones predeterminadas

| Categoría           | Patrón de ejemplo                                   | Captura                                 |
| ------------------- | --------------------------------------------------- | --------------------------------------- |
| PREFERENCE_PATTERNS | `"Prefiero <X>"`, `"Me gusta <X>"`, `"Odio <X>"`    | Preferencias del usuario                |
| DECISION_PATTERNS   | `"Usaré <X>"`, `"Decidí <X>"`, `"Elegí <X>"`        | Decisiones del usuario (episódicas)     |
| PATTERN_PATTERNS    | `"Normalmente <X>"`, `"Siempre <X>"`, `"Nunca <X>"` | Patrones de comportamiento persistentes |

### Patrones de ejemplo (simplificados)

```ts
// De src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### Qué se extrae

Cuando un usuario dice:

> "Prefiero TypeScript. Usaré Postgres para este proyecto. Siempre hago commit antes de hacer push. No me gusta Python."
> La extracción produce 4 recuerdos:
>
> | Clave                                | Categoría  | Tipo     | Contenido                          |
> | ------------------------------------ | ---------- | -------- | ---------------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                       |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres para este proyecto"      |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "hacer commit antes de hacer push" |
> | `preference:python`                  | preference | factual  | "Python"                           |

### Límites de extracción

Para evitar una extracción descontrolada, se aplican los siguientes límites:

| Longitud mínima del contenido | 3 caracteres |
| Longitud máxima del contenido | 500 caracteres |

### Cuándo desactivar la extracción

La extracción se ejecuta automáticamente siempre que la memoria esté activada; no existe un interruptor independiente exclusivo para la extracción. Para desactivarla, desactive la memoria por completo (`enabled: false` mediante `PUT /api/settings/memory`). Considere hacerlo cuando:

- Tenga un gran volumen de mensajes y el coste de extracción no sea trivial
- Sus conversaciones sean principalmente transitorias (chat, depuración) y no tengan valor a largo plazo
- Ya esté capturando el contexto mediante plugins personalizados

---

## Ajuste de RRF híbrido (v3.8.16+)

El algoritmo **Reciprocal Rank Fusion (RRF)** combina resultados de FTS5 (palabras clave) y vectoriales (semánticos). El parámetro `k` controla cuánto peso se asigna a los resultados con una posición inferior.

### La fórmula

Para cada recuerdo candidato, la puntuación RRF es:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Donde:

- `k` es la constante (60 de forma predeterminada)
- `rank_i(d)` es la posición del documento `d` en el i-ésimo sistema de recuperación (FTS, vectorial)
- La suma se realiza sobre todos los sistemas de recuperación

### Cómo afecta `k` a los resultados

| Valor de `k`                | Efecto                                                                                                  | Ideal para                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `k=0`                       | Fusión pura de posiciones (sin suavizado)                                                               | Referencia teórica                                    |
| `k=10-30`                   | Da mucho peso a los primeros resultados; las posiciones bajas apenas contribuyen                        | Cuando los 3 primeros resultados suelen ser correctos |
| **`k=60`** (predeterminado) | Equilibrado: los 10 primeros resultados contribuyen de forma significativa                              | Recuperación de propósito general                     |
| `k=100+`                    | Más uniforme: incluso los resultados con posiciones bajas pueden dominar si aparecen en varios sistemas | Cuando la exhaustividad > precisión es fundamental    |

### Ajuste de `k` en la práctica

```bash
# Valor predeterminado
MEMORY_RRF_K=60

# Precisión agresiva (memoria pequeña, pocos documentos)
MEMORY_RRF_K=20

# Máxima exhaustividad (memoria grande, consultas variadas)
MEMORY_RRF_K=120
```

**Ejemplo con `k=20`:**

- Posición FTS 1 → contribución `1/21 = 0.048`
- Posición FTS 10 → contribución `1/30 = 0.033`
- Posición vectorial 1 → contribución `0.048`
- Máximo combinado: `0.096`

**Ejemplo con `k=60`:**

- Posición FTS 1 → contribución `1/61 = 0.016`
- Posición FTS 10 → contribución `1/70 = 0.014`
- Posición vectorial 1 → contribución `0.016`
- Máximo combinado: `0.033`

Con un valor de `k` más alto, la **diferencia relativa** entre la primera y la décima posición es menor, por lo que el algoritmo depende más del **consenso entre los sistemas de recuperación** que de la confianza en la primera posición.

### Cuándo cambiar `k`

| Síntoma                                                                | Pruebe                                                                                       |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| El primer resultado siempre gana, pero es incorrecto                   | Un valor de k **más bajo** (p. ej., 20): la confianza en la primera posición importa más     |
| La respuesta correcta está entre las 5 primeras, pero no es la primera | Un valor de k **más alto** (p. ej., 100): una puntuación más uniforme recompensa el consenso |
| La exhaustividad es alta, pero la precisión es baja                    | Un valor de k **más bajo**: haga más nítida la clasificación                                 |
| La exhaustividad es baja (faltan documentos relevantes)                | Un valor de k **más alto**: dé una oportunidad a los documentos con posiciones inferiores    |

### Ponderación de RRF

La fusión recíproca de posiciones utiliza pesos iguales para la posición vectorial semántica y la posición de búsqueda de texto completo:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

No existen variables de entorno para ajustar los pesos individuales (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` no existen).

---

## Estrategia de resumen (v3.8.16+)

El módulo `summarization.ts` (`src/lib/memory/summarization.ts`) comprime los recuerdos más antiguos para mantener pequeño el conjunto activo y, al mismo tiempo, preservar la capacidad de recuperación.

### Cuándo se activa el resumen

| Activador                      | Umbral (predeterminado) |
| ------------------------------ | ----------------------- |
| Activación manual mediante API | no aplica               |

### Qué se resume

Desde `summarization.ts` se exportan dos puntos de entrada:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — condensa los
  recuerdos de una sesión en un único texto de resumen limitado por un presupuesto de tokens.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — la compactación basada
  en la antigüedad utilizada por la API: selecciona todos los recuerdos anteriores a `days`,
  crea a partir de ellos un único recuerdo de resumen condensado y (cuando `dryRun` es `false`)
  elimina los originales. Pasa `dryRun: true` para previsualizar el conjunto candidato y el
  total de tokens sin modificar nada.

No hay ninguna pasada de agrupación por etiqueta/clave ni puntuación por recuerdo de
"principal frente a resumible": la selección se basa exclusivamente en el límite de antigüedad,
y el texto del resumen es una línea condensada con el tipo como prefijo para cada candidato.

### Activación del resumen

El resumen es **manual / opcional**: la configuración `autoSummarize` es `false` de
forma predeterminada, por lo que nada se compacta automáticamente. Actívalo mediante la API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Para mantenerlo desactivado, simplemente conserva `autoSummarize` en su valor predeterminado (`false`).

### Consejos para mejorar la calidad del resumen

- **Previsualiza primero con `dryRun`**: `summarizeMemoriesOlderThan(..., true)` devuelve
  la lista de candidatos y el recuento total de tokens para que puedas confirmar qué se
  combinaría antes de eliminar los originales.
- **Ejecuta el resumen durante las horas de poco tráfico** si tienes un corpus de recuerdos grande; la llamada al LLM es la parte lenta.

```bash
# Estilo cron: resumir diariamente a las 3 a. m.
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Patrón de proveedor MemoryBackend

> **Fuente de referencia:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Pruebas:** `src/lib/memory/__tests__/generic-backend.test.ts`

El patrón de proveedor MemoryBackend introduce una **capa de abstracción de backend conectable** sobre el motor de memoria existente. En lugar de estar vinculado a una única implementación de almacenamiento, el sistema de memoria ahora admite varios backends (SQLite, Obsidian, Notion y backends HTTP personalizados) con enrutamiento configurable de backend principal y alternativas.

### Arquitectura

```
┌──────────────────────────────────────────────────────────┐
│                    Rutas de la API                        │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orquestador singleton (manager.ts)                  │
│                                                          │
│  Principal ──► Backend A  (p. ej., SQLite)               │
│  Alternativa ─► Backend B  (p. ej., Obsidian)            │
│                Backend C  (p. ej., Notion mediante        │
│                            GenericBackend)                │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend de │ │ Backend de │ │ Backend           │
│ SQLite     │ │ Obsidian   │ │ GenericMemory     │
│            │ │            │ │ (HTTP)            │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interfaz principal (`backend.ts`)

Cada backend debe implementar la interfaz `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Búsqueda
  search(config: SearchConfig): Promise<Memory[]>;

  // Estado
  health(): Promise<HealthCheckResult>;

  // Ciclo de vida (opcional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orquestador singleton que:

- **Registra** backends mediante `register(backend)` — se llama durante el arranque desde `index.ts`
- **Configura** el backend principal y las alternativas mediante `configure(primary, fallbacks)`
- **Enruta** las operaciones CRUD y las búsquedas al backend principal, con una cadena de alternativas en caso de fallo
- **Comprueba el estado** de todos los backends periódicamente

**Comportamiento de las alternativas:**

| Operación | Principal                      | Alternativas                            |
| --------- | ------------------------------ | --------------------------------------- |
| `create`  | ✅ Solo el principal           | ❌                                      |
| `get`     | ✅ Probar primero el principal | ✅ Alternativa si devuelve null         |
| `update`  | ✅ Solo el principal           | ✅ Sincronización sin esperar respuesta |
| `delete`  | ✅ Solo el principal           | ✅ Sincronización sin esperar respuesta |
| `list`    | ✅ Solo el principal           | ❌                                      |
| `search`  | ✅ Primero el principal        | ✅ Alternativa en caso de error         |

#### GenericMemoryBackend (`genericBackend.ts`)

Un conector HTTP genérico que adapta cualquier API REST a un MemoryBackend. Resulta útil para:

- **Notion** — conexión mediante la API de Notion
- **Obsidian** — conexión mediante la API REST local de Obsidian
- **Backends personalizados** — cualquier servicio que exponga una API RESTful de memoria

**Configuración:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL base de la API del backend
  apiKey?: string;           // Token Bearer para autenticación
  headers?: Record<string, string>;  // Encabezados HTTP personalizados
  timeout?: number;          // Tiempo de espera de la solicitud (predeterminado: 30000ms)
  backendType?: string;      // Para registros

  // Sustituciones de endpoints (los valores predeterminados usan convenciones REST)
  endpoints?: {
    search?: string;   // predeterminado: "/memories/search"
    create?: string;   // predeterminado: "/memories"
    list?: string;     // predeterminado: "/memories"
    get?: string;      // predeterminado: "/memories/{id}"
    update?: string;   // predeterminado: "/memories/{id}"
    delete?: string;   // predeterminado: "/memories/{id}"
    health?: string;   // predeterminado: "/health"
  };

  // Asignaciones de nombres de parámetros de consulta
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Asignaciones de nombres de parámetros de ruta
  pathParams?: {
    id?/memoryId?
  };
}
```

Los **backends conocidos** están preconfigurados en `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend dirigido a localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend dirigido a api.notion.com/v1
```

#### Backends integrados

##### SQLiteBackend (`sqliteBackend.ts`)

El backend principal predeterminado. Encapsula el almacén de memoria existente basado en SQLite mediante `src/lib/memory/store.ts`. Se registra automáticamente durante el arranque.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Encapsula la integración existente con Obsidian (`src/lib/memory/obsidianBackend.ts`). Se conecta a un repositorio de Obsidian mediante la API REST local de Obsidian.

### Configuración

La configuración de los backends de memoria se almacena en la tabla de configuración de la aplicación y se administra mediante `src/lib/memory/settings.ts`:

| Configuración              | Clave de entorno/configuración | Valor predeterminado | Descripción                                |
| -------------------------- | ------------------------------ | -------------------- | ------------------------------------------ |
| Backend principal          | `memoryPrimaryBackend`         | `"sqlite"`           | ID del backend principal                   |
| Backends de respaldo       | `memoryFallbackBackends`       | `[]`                 | IDs ordenados de los backends de respaldo  |
| Configuraciones de backend | `memoryBackendConfigs`         | `{}`                 | Sustituciones de configuración por backend |

La configuración se normaliza mediante `normalizeMemorySettings()` y se almacena en caché en `getMemorySettings()`.

### Flujo de inicialización

```
Arranque de la aplicación
  → importaciones de index.ts (efecto secundario): registran SQLiteBackend
  → initMemoryBackends() llamado desde el ciclo de vida de la aplicación:
      1. Cargar la configuración (getMemorySettings)
      2. Configurar el backend principal y los de respaldo
      3. Inicializar todos los backends (comprobación de estado)
      4. Listo para recibir solicitudes
```

### Añadir un nuevo backend

1. **Implementa la interfaz `MemoryBackend`** en `src/lib/memory/<name>Backend.ts`
2. **Exporta** desde `src/lib/memory/index.ts`
3. **Registra** con `memoryManager.register(yourBackend)` durante el arranque
4. **Configura** mediante la configuración: establece `memoryPrimaryBackend` con el ID de tu backend
5. **Prueba** tomando como referencia `src/lib/memory/__tests__/generic-backend.test.ts`

#### Ejemplo: backend Brain

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### Verificación

#### Pruebas unitarias

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Resultado esperado: **35 pruebas, todas superadas**, que cubren:

- Constructor (2)
- Comprobación de estado (4) — éxito, error 500, error de red, latencia
- Inicialización (2) — éxito, error
- Creación (2) — endpoint predeterminado, endpoint personalizado
- Obtención (4) — éxito, 404 → null, excepción distinta de 404, parámetros de ruta personalizados
- Actualización (2) — éxito, 404 → false
- Eliminación (2) — éxito, 404 → false
- Listado (2) — parámetros de consulta, nombres de parámetros personalizados
- Búsqueda (3) — parámetros de consulta, endpoint personalizado, serialización de opciones
- Encabezados de autenticación (2) — token Bearer, encabezados personalizados
- Fábrica (1)

#### Comprobación de tipos

```bash
npm run typecheck:core
```

Resultado esperado: **0 errores**.
