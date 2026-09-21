# Delegated Context Editing (Anthropic) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

La **edición de contexto** delegada es una función de gestión de contexto exclusiva de Claude. A diferencia de los motores de compresión locales de OmniRoute (Caveman, RTK, LLMLingua, canalizaciones apiladas), que reescriben el cuerpo de la solicitud _antes_ de que salga del proxy, la edición de contexto solicita al **proveedor** que elimine los bloques obsoletos de uso de herramientas/resultados de herramientas de su propia ventana de contexto activa. OmniRoute solo adjunta un parámetro al cuerpo (`context_management.edits[]`); Claude realiza la eliminación efectiva de acuerdo con su propio tokenizador.

Por naturaleza, esta es una capacidad delegada: otros proveedores rechazan el parámetro, por lo que OmniRoute limita su uso estrictamente a Claude y a relés compatibles con Claude Code.

Fuente de referencia: `open-sse/config/contextEditing.ts` (identificadores de estrategia, inyección en el cuerpo, extracción de telemetría), `open-sse/executors/base.ts` (condición de inyección + mecanismo alternativo ante errores 400) y `open-sse/services/compression/types.ts` (estructura de configuración + valor predeterminado).

## Qué hace `clear_tool_uses`

OmniRoute inyecta una única edición en el cuerpo saliente de Anthropic Messages:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — el identificador de estrategia de Anthropic con fecha (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — una vez que los tokens de entrada de la solicitud superan este umbral, Claude comienza a eliminar los pares antiguos de uso de herramientas/resultados (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, el valor predeterminado de Anthropic).
- `keep.value: 3` — los N pares más recientes de uso de herramientas/resultados se conservan sin cambios (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

La beta se anuncia mediante el encabezado `anthropic-beta: context-management-2025-06-27`, que OmniRoute ya envía en las solicitudes a Claude.

La inyección la realiza `applyContextEditingToBody()` y es **idempotente**: si ya existe una edición `clear_tool_uses` en el cuerpo (añadida por una llamada anterior o proporcionada por el cliente), el cuerpo se deja sin cambios. Si también hay una edición `clear_thinking_20251015`, OmniRoute realiza una ordenación estable para colocar la edición `clear_thinking` al principio, ya que Anthropic exige que `clear_thinking` preceda a `clear_tool_uses` en el array `edits[]`.

## El selector de activación por combinación

La edición de contexto está **desactivada de forma predeterminada** y requiere activación explícita. El selector es un único booleano incluido en la configuración de compresión:

- Clave de configuración: `contextEditing.enabled` (camelCase; **no** `context_editing` / `context-editing`).
- Tipo: `ContextEditingConfig { enabled: boolean }` en `open-sse/services/compression/types.ts`.
- Valor predeterminado: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Esquema de Zod: `contextEditingConfigSchema` en `src/shared/validation/compressionConfigSchemas.ts`.
- Almacenamiento: se conserva junto con el resto de los ajustes de compresión (normalizados en `src/lib/db/compression.ts`).

En el panel, el selector se encuentra en el centro de compresión (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) y escribe `{ contextEditing: { enabled: … } }` mediante `saveSettings()`. Dado que forma parte del objeto de ajustes de compresión, se integra con el perfil de compresión específico de cada combinación en lugar de constituir una superficie completamente independiente: la configuración solo contiene el indicador de activación/desactivación; todos los umbrales (`trigger`, `keep`) son las constantes documentadas anteriormente.

## Control exclusivo para Claude

La inyección solo se produce para Claude genuino o relés compatibles con Claude Code. La condición en
`open-sse/executors/base.ts` es:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — clave/OAuth real de Anthropic.
- `isClaudeCodeCompatible(this.provider)` — relés cuyo id de proveedor comienza con el prefijo
  `anthropic-compatible-cc-` (anuncian compatibilidad con Claude Code, por lo que son los relés
  con mayor probabilidad de aceptar la beta). Consulta `open-sse/services/provider.ts`.

Excluidos **deliberadamente**:

- `claude-web` — un relé de navegador con un formato de solicitud `create_conversation_params` que nunca recibe
  `context_management`.
- Relés genéricos `anthropic-compatible-*` (sin el prefijo `-cc-`) — endpoints de terceros con
  compatibilidad incierta con la beta.

Los proveedores que no son Claude nunca reciben el parámetro `context_management`, incluso cuando la opción está activada.

## Cobertura del mecanismo alternativo ante errores 400 y relés

Un relé compatible con Claude puede anunciar la beta, pero aun así rechazar el parámetro `context_management`
con un HTTP 400. Para degradar el servicio de forma controlada en lugar de provocar un error en la solicitud, el ejecutor elimina el
parámetro y vuelve a intentar la misma URL **una vez**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Comportamiento:

1. Solo se activa ante un `400` mientras la edición de contexto está habilitada y el cuerpo contiene realmente
   `context_management`.
2. El cuerpo del error 400 se lee mediante `clone()` para que la respuesta original permanezca intacta en la ruta
   que no coincida.
3. El texto del error debe coincidir con `/context[_-]management|context editing/i`; un error 400 no relacionado (por ejemplo,
   `max_tokens must be >= 1`) **no** activa el mecanismo alternativo; el error original se propaga.
4. Cuando hay una coincidencia, establece `contextEditingDisabled = true` (lo que impide una nueva inyección si posteriormente se
   crea un `transformedBody` nuevo para una URL de reintento o alternativa), elimina `context_management`,
   vuelve a firmar el cuerpo para Claude o relés compatibles con Claude Code (`signRequestBody`) y reintenta
   la misma URL una vez.

Claude genuino incluye la beta en `ANTHROPIC_BETA_BASE` y no llega a esta ruta alternativa.

## Telemetría de `applied_edits`

Después de una respuesta de Claude, OmniRoute registra cuánto contexto eliminó realmente el proveedor. Esto
**no** se transmite en streaming: se extrae del cuerpo de la respuesta sin streaming, con el mejor esfuerzo posible, y nunca
afecta a la respuesta (los fallos de telemetría se ignoran).

- Extracción: `extractContextEditingTelemetry(responseBody)` en `open-sse/config/contextEditing.ts`.
  Busca `applied_edits` en tres ubicaciones (de manera defensiva ante posibles variaciones en el formato de la respuesta):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Campos de cada edición leídos en cada entrada: `cleared_input_tokens` y `cleared_tool_uses`
  (snake_case, nativo de Anthropic), con `clearedInputTokens` / `clearedToolUses` en camelCase como alternativas.
- Devuelve `null` cuando no se encuentra ningún array `applied_edits` o cuando no se eliminó nada realmente.

El formato del registro es `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
El registro se realiza en `open-sse/handlers/chatCore.ts` (limitado a `provider === "claude"`) mediante
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), que escribe una fila de analítica de
compresión etiquetada con:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = cantidad de tokens de entrada eliminados
- `request_id` con el sufijo `::context-editing`

De este modo, la eliminación delegada aparece en las analíticas de compresión junto con los motores locales, bajo la
etiqueta de motor `context-editing`, y puede distinguirse de los ahorros de RTK/Caveman/LLMLingua.

## Relación con los motores de compresión locales

| Aspecto               | Motores locales (Caveman / RTK / LLMLingua / stacked)   | Edición de contexto delegada                                           |
| --------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| Dónde se ejecuta      | En OmniRoute, antes de que la solicitud salga del proxy | En el proveedor (Claude), del lado del servidor                        |
| Qué edita             | Texto del prompt / contexto / resultado de herramienta  | Bloques antiguos de uso de herramientas / resultados de herramientas   |
| Alcance del proveedor | Todos los proveedores                                   | Solo `claude` + `anthropic-compatible-cc-*`                            |
| Activación            | Configuración del modo de compresión                    | `contextEditing.enabled`                                               |
| Modo de fallo         | Fallo abierto (texto original)                          | Alternativa ante error 400: eliminar el parámetro y reintentar una vez |
| Telemetría de ahorro  | `engine: <engine id>`                                   | `engine: "context-editing"`                                            |

Ambos enfoques son complementarios: los motores locales comprimen los bytes que envía OmniRoute; la edición de contexto permite
que Claude depure el contexto acumulado entre turnos. Se pueden habilitar conjuntamente.

## Véase también

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registro de motores y motores de compresión
  locales
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compresión de comandos/salidas de herramientas
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compresión de descripciones MCP y
  reducción de la cardinalidad de herramientas
- Código fuente: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
