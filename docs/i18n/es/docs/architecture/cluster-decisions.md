# Cluster Decisions — Optional Sidecar Profiles (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Estado:** propuesta (a la espera de la revisión de @diegosouzapw)
**Fecha:** 2026-06-20
**Referencias:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Resumen

Dos perfiles opcionales de Compose (`memory`, `bifrost`) para el despliegue existente de 8 servicios en [`docker-compose.yml`](../../docker-compose.yml). El comportamiento predeterminado de `up` **no cambia**: 3 réplicas de `omniroute` + Caddy + Redis + CliproxyAPI. Los dos perfiles nuevos añaden Qdrant y Bifrost como sidecars opcionales, habilitados mediante `docker compose --profile <name> up`. **No se elimina ni sustituye ningún servicio existente.**

## Por qué este enfoque es conservador

La arquitectura de despliegue existente de OmniRoute ya es ligera y está probada:

- **`redis:7-alpine`** gestiona la carga de trabajo de limitación de solicitudes/caché a escala de producción.
- **SQLite + sqlite-vec + FTS5** cubren la memoria local, los vectores y la búsqueda de texto (consulta [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** ya actúa como balanceador de carga y terminador TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ya está integrado como enrutador de nivel 1 en [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar con interruptor de desactivación mediante la variable de entorno `BIFROST_ENABLED`; establece `=0` para omitir el sidecar y recurrir a la ruta de TS).

Los dos perfiles aquí descritos son **opciones de escalado horizontal para despliegues que alcanzan el límite de SQLite**, no migraciones. Ambos están desactivados de forma predeterminada.

## Los dos perfiles

### `memory` — Sidecar de memoria vectorial Qdrant

**Cuándo activarlo:**

- > 1 millón de embeddings por despliegue (sqlite-vec comienza a ralentizarse a escala).
- Un despliegue con varias réplicas que necesita un estado vectorial compartido entre `omniroute-1/2/3`.
- Ya dispones de un clúster Qdrant externo (Qdrant Cloud, local).

**Qué añade:**

| Servicio | Imagen                  | Puertos     | Notas                                                    |
| -------- | ----------------------- | ----------- | -------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Índice HNSW; volumen persistente `omniroute_qdrant_data` |

**Activación:** establece `qdrantEnabled = true` en la interfaz de Configuración **o** define la variable de entorno `QDRANT_HOST=qdrant`. Consulta [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) para conocer las reglas de precedencia (tabla de configuración → variable de entorno → valor predeterminado).

**Variables de entorno:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (consulta las líneas 1672-1683 de `.env.example`).

### `bifrost` — Sidecar del enrutador de nivel 1 Bifrost

**Cuándo activarlo:**

- Ejecutas ≥3 réplicas de `omniroute` y quieres centralizar la rotación de proveedores en un único proceso de Go.
- Quieres una única superficie de auditoría/registro para las solicitudes a proveedores ascendentes de todas las réplicas.
- Quieres escalar horizontalmente la capa de enrutamiento de nivel 1 con independencia de las réplicas de OmniRoute.

**Qué añade:**

| Servicio  | Imagen                            | Puertos | Notas                                                                                        |
| --------- | --------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Enrutador de nivel 1 basado en Go; volumen de registros persistente `omniroute_bifrost_logs` |

**Activación:** establece `BIFROST_BASE_URL=http://bifrost:8080` en `.env.example`. La ruta existente del proxy sidecar en [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (añadida en el PR #4381) lo detectará automáticamente.

**Variables de entorno:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (consulta las líneas 1685-1695 de `.env.example`).

## Lo que este PR explícitamente NO hace

En el hilo original del issue se planteó una reescritura más amplia del clúster. Tras auditar la forma real de la carga de trabajo, se **rechazan** los siguientes componentes por los motivos indicados:

| Componente                           | Veredicto     | Motivo                                                                                                                                   |
| ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **DESCARTAR** | `redis:7-alpine` ya es adecuado para la carga de trabajo de limitación de tasa a escala de producción; no hay ningún límite que superar. |
| **NATS**                             | **DESCARTAR** | Cada réplica de `omniroute` es un único proceso de Node.js; no existe ninguna carga de trabajo pub/sub multiproceso.                     |
| **PostgreSQL**                       | **DESCARTAR** | SQLite + sqlite-vec + FTS5 cubren los 3 casos de uso; 97 migraciones + el empaquetado de Electron impiden la migración.                  |
| **Neo4j**                            | **DESCARTAR** | El enrutamiento es una unión de 5 tablas; una CTE recursiva en SQLite es suficiente.                                                     |
| **MinIO**                            | **DESCARTAR** | No hay ninguna carga de trabajo con blobs de varios MB; las imágenes y el audio se procesan mediante proxies transparentes.              |
| **pgvector / pg_ai / pg_textsearch** | **DESCARTAR** | El mismo motivo relacionado con el límite de SQLite que para PostgreSQL; el ecosistema de pgvector está fragmentado.                     |
| **HAProxy / Envoy**                  | **DESCARTAR** | Caddy ya gestiona el balanceo de carga + TLS; ambos fueron rechazados explícitamente como routers de nivel 1 (consulta `AGENTS.md`).     |

Si un caso de uso futuro demuestra la necesidad de alguno de estos componentes, este documento es el lugar donde realizar la modificación.

## Despliegue de 4 semanas (si se aprueba)

1. **Sem. 1** — Integrar este PR + verificar los perfiles opcionales con una pila de compose de 3 réplicas.
2. **Sem. 2** — Activación completa de Bifrost para OpenAI/Claude/Gemini/Ollama (4 de más de 14 proveedores) mediante la ruta del proxy sidecar en [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (controlada por `BIFROST_ENABLED`, con interruptor de desactivación en tiempo de ejecución).
3. **Sem. 3** — Habilitar el perfil de memoria de Qdrant en un único despliegue de prueba; medir la diferencia de latencia frente a sqlite-vec.
4. **Sem. 4** — Comprobaciones de estado de observabilidad (códigos de salida de `docker compose ps` + pruebas de humo con `wget`); actualización de los 71 pilares según ADR-041.

## Archivos modificados en este PR

| Archivo                                                 | Cambio                                                                                                                                                                                                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                    | +30 líneas: perfil `memory` (Qdrant), perfil `bifrost` (Bifrost), volúmenes persistentes, comprobaciones de estado.                                                                                                                                    |
| `.env.example`                                          | +24 líneas: `QDRANT_*` (6 variables), `BIFROST_*` (4 variables).                                                                                                                                                                                       |
| `docs/reference/ENVIRONMENT.md`                         | +6 filas en la sección 25 para las variables de entorno `QDRANT_*`.                                                                                                                                                                                    |
| `src/lib/memory/qdrant.ts`                              | +33 líneas: cadena de reserva de variables de entorno (configuración → entorno → valor predeterminado) para `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | +88 líneas: 9 nuevos casos de prueba que fijan la precedencia de reserva de las variables de entorno.                                                                                                                                                  |
| `docs/architecture/cluster-decisions.md` (este archivo) | NUEVO — registro de decisiones para los perfiles opcionales.                                                                                                                                                                                           |
| `AGENTS.md`                                             | +1 línea: referencia a este documento en la tabla de documentación de referencia.                                                                                                                                                                      |

**Código afectado neto:** 4 archivos de producción (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 archivo de pruebas (`qdrant-wiring.test.ts`) y 2 archivos de documentación (`cluster-decisions.md`, `AGENTS.md`).
