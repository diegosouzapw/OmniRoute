# Notion Context Source (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Fuente de referencia:** `src/lib/notion/api.ts` (cliente REST), `src/lib/db/notion.ts`
> (persistencia del token), `open-sse/mcp-server/tools/notionTools.ts` (6 herramientas MCP),
> `src/app/api/settings/notion/route.ts` (API de configuración). El registro de herramientas y la
> vinculación de ámbitos se encuentran en `open-sse/mcp-server/server.ts`.

## Qué es

OmniRoute puede conectarse a un espacio de trabajo de **Notion** como **fuente de contexto**:
una base de conocimiento de lectura/escritura a la que los agentes acceden mediante el servidor
MCP integrado. Una vez configurado un token de integración de Notion, las herramientas MCP
permiten que un LLM busque páginas y bases de datos, lea el contenido de las páginas y los árboles
de bloques, consulte bases de datos con filtros y criterios de ordenación, y añada nuevos bloques;
todo ello a través de OmniRoute (con reintentos, tiempo de espera y clasificación de errores),
de modo que el modelo nunca acceda directamente a la API de Notion.

La integración es un contenedor ligero y robusto sobre la API REST oficial de Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). El cliente
(`src/lib/notion/api.ts`) añade:

- **Reintentos con espera exponencial** (hasta 3 intentos) para `429` y `5xx`.
- **Tiempo de espera de solicitud de 55 segundos** mediante `AbortController`.
- **Clasificación tipada de errores**: `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respeta las indicaciones
  de `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Saneamiento de mensajes** que elimina fragmentos similares a trazas de pila antes de mostrarlos.

## Configuración

No existe **ninguna variable de entorno** para el token de Notion: se almacena en la
tabla `key_value` de SQLite (espacio de nombres `notion`, clave `integration_token`) mediante
`src/lib/db/notion.ts`. Configúralo desde la pestaña **Fuentes de contexto** del panel del
Endpoint (`NotionSourceCard`, componente hermano de `ObsidianSourceCard`) o mediante la API REST de configuración.

> [!NOTE]
> El token es un **token de integración interna de Notion**. Crea una integración en
> <https://www.notion.com/my-integrations> y, a continuación, comparte con esa integración
> las páginas/bases de datos a las que quieras que OmniRoute acceda (el modelo de permisos
> de Notion se basa en recursos compartidos, no en todo el espacio de trabajo).

### Configuración mediante REST

```bash
# Guarda y valida el token de integración (POST lo valida realizando una búsqueda de prueba)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Comprueba el estado de la conexión
curl http://localhost:20128/api/settings/notion

# Desconecta (elimina el token almacenado)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Los tres métodos requieren autenticación en el panel (`isAuthenticated`). Al realizar un `POST`,
OmniRoute guarda el token y ejecuta de inmediato una búsqueda de prueba limitada a 1 resultado;
si Notion devuelve un objeto de error, el token se elimina y la llamada falla con `400`.

## Herramientas MCP (6)

Definidas en `open-sse/mcp-server/tools/notionTools.ts`. El token se obtiene en el momento
de la llamada mediante `getNotionToken()`; si no hay ninguno configurado, la herramienta genera
el error `"Notion integration token not configured. Set it in Settings > Context Sources."`

| Herramienta                  | Ámbito         | Descripción                                                                                           |
| ---------------------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Busca páginas y bases de datos mediante una consulta de texto (devuelve títulos, ID y URL). Paginada. |
| `notion_get_page`            | `read:notion`  | Obtiene el contenido y los metadatos de una página mediante su ID.                                    |
| `notion_list_block_children` | `read:notion`  | Enumera todos los bloques secundarios de un bloque o una página (el árbol de bloques). Paginada.      |
| `notion_query_database`      | `read:notion`  | Consulta una base de datos con `filter` + `sorts` opcionales (formato de la API de Notion). Paginada. |
| `notion_get_database`        | `read:notion`  | Obtiene el esquema y los metadatos de una base de datos mediante su ID.                               |
| `notion_append_blocks`       | `write:notion` | Añade bloques secundarios a un bloque o una página existentes (máximo de 100 bloques por solicitud).  |

### Parámetros de entrada

- `notion_search`: `query` (1–500 caracteres), `pageSize` (1–100, valor predeterminado: 20),
  `startCursor` (opcional).
- `notion_get_page`: `pageId` (hexadecimal de 32 caracteres o UUID).
- `notion_list_block_children`: `blockId`, `pageSize` (1–100, valor predeterminado: 50),
  `startCursor` (opcional).
- `notion_query_database`: `databaseId`, `filter` (opcional, formato de filtro de Notion),
  `sorts` (array opcional), `pageSize` (1–100, valor predeterminado: 50), `startCursor` (opcional).
- `notion_get_database`: `databaseId`.
- `notion_append_blocks`: `blockId`, `children` (array de objetos de bloque),
  `after` (posición opcional).

### Ámbitos

Las herramientas de lectura requieren `read:notion` y la herramienta de escritura requiere
`write:notion`. `withScopeEnforcement()` aplica los ámbitos en
`open-sse/mcp-server/server.ts` únicamente cuando `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; los
ámbitos permitidos del autor de la llamada proceden de `OMNIROUTE_MCP_SCOPES` (separados por
comas) o del contexto de ámbitos de la clave de API autenticada. Consulta
[MCP-SERVER.md](./MCP-SERVER.md) para conocer el modelo de ámbitos completo.

## Endpoints

| Método   | Ruta                   | Propósito                                 |
| -------- | ---------------------- | ----------------------------------------- |
| `GET`    | `/api/settings/notion` | Devuelve `{ connected, hasToken }`.       |
| `POST`   | `/api/settings/notion` | Guarda y valida el token de integración.  |
| `DELETE` | `/api/settings/notion` | Desconecta (elimina el token almacenado). |

> Estas son rutas de configuración del panel. **No existe ningún endpoint proxy
> público `/v1` de Notion**; se accede a Notion exclusivamente mediante las herramientas MCP anteriores.

## Casos de uso

- **Respuestas basadas en conocimiento** — permite que un agente use `notion_search` en el espacio de trabajo y
  `notion_get_page` con el resultado principal antes de responder, para que las respuestas citen documentación interna real.
- **Flujos de trabajo respaldados por bases de datos** — usa `notion_query_database` en una base de datos de tareas/CRM con
  filtros y criterios de ordenación, y después resume o clasifica las filas.
- **Escritura/registro** — usa `notion_append_blocks` para añadir notas de reuniones, resúmenes
  de ejecuciones o resultados del agente a una página existente (solo anexado; sin ediciones destructivas).
- **Exploración de la estructura** — usa `notion_list_block_children` para recorrer el árbol de bloques de una página,
  o `notion_get_database` para descubrir el esquema de propiedades de una base de datos antes de consultarla.

## Relacionado

- [Servidor MCP](./MCP-SERVER.md) — transportes, aplicación del ámbito e inventario completo de herramientas.
- [Fuente de contexto de Obsidian](./OBSIDIAN_CONTEXT.md) — la otra fuente de contexto integrada.
- [Sistema de memoria](./MEMORY.md) — memoria conversacional persistente (capa de contexto
  complementaria, inyectada automáticamente en lugar de obtenerse mediante herramientas).
