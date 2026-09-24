# Playground Studio (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funcionalidad:** Playground Studio — espacio de trabajo unificado para pruebas de IA en `/dashboard/playground`.
> **Planes:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Estado:** Publicado en v3.8.6

---

## Descripción general

Playground Studio transforma `/dashboard/playground`, que pasa de ser un simple editor basado en Monaco
a un espacio de trabajo de pruebas completo. Sustituye el `page.tsx` heredado por un contenedor `PlaygroundStudio`
que muestra cuatro pestañas y un panel de configuración compartido.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Comparar] [{} API] [🔧 Crear]    142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {contenido de la pestaña activa}        │ ─ Configuración           │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Modelo    [gpt-5.4 ∨]     │
│                                          │ Sistema   [área de texto] │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Preajustes [▾ cargar]     │
│                                          │             [guardar]     │
│                                          │ [✨ Mejorar prompt]        │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Pestañas

### Pestaña Chat

Convierte `ChatPlayground.tsx` en un entorno de trabajo de streaming con múltiples turnos:

- Renderizado completo de Markdown mediante `MarkdownMessage.tsx` (bloques de código, tablas, listas y enlaces).
- Prompt del sistema obtenido del panel de Configuración compartido.
- Tokens/coste por mensaje (tokens del prompt + tokens de finalización).
- Regeneración de la última respuesta.
- Envía las solicitudes a `POST /v1/chat/completions` mediante streaming SSE.

### Pestaña Comparar

El diferenciador clave para un proxy: ejecutar 1 prompt en hasta **4 modelos en paralelo**.

- Hasta 4 columnas, cada una con streaming independiente desde `/v1/chat/completions`.
- Botón `+ Añadir modelo` (atajo Cmd+K) para añadir columnas.
- `Ejecutar todo ▶` inicia todos los streams simultáneamente mediante `Promise.all` y un `AbortController` por columna.
- La opción global **Cancelar todo** interrumpe todos los streams en curso.
- El `ProviderMetrics` de cada columna muestra el TTFT, los TPS, los tokens y el coste estimado en tiempo real.
- Métricas etiquetadas como **«estimación del lado del cliente»** (D12), medidas desde el primer fragmento SSE.

### Pestaña API

Conserva el 100 % del editor Monaco original para usuarios avanzados (D14):

- 10 endpoints: finalizaciones de chat, finalizaciones, embeddings, imágenes, audio, voz, transcripciones, moderaciones, rerank y búsqueda.
- Carga de archivos multimodales.
- Streaming SSE con salida en tiempo real.
- Encapsulado como `ApiTab.tsx` (carga diferida, `ssr: false`).

### Pestaña Crear

Interfaz de herramientas/llamada a funciones y salida estructurada:

- `ToolsBuilder.tsx`: permite añadir, editar y eliminar elementos de `tools[]`, con un editor de esquema JSON para cada herramienta.
  Valida los parámetros mediante `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx`: permite activar el modo JSON e incluye un editor de esquemas JSON.
  Valida la respuesta con el esquema mediante `StructuredOutputSchema` (Zod).
- Envía la solicitud a `/v1/chat/completions` con `tools[]` y/o `response_format`.

## Panel de configuración (compartido)

`StudioConfigPane.tsx` — siempre visible y contraíble.

| Campo              | Componente            | Notas                                                                                   |
| ------------------ | --------------------- | --------------------------------------------------------------------------------------- |
| Endpoint           | `<select>`            | 10 opciones que coinciden con `PlaygroundEndpoint`                                      |
| Modelo             | `<input>`             | texto libre, p. ej., `openai/gpt-4o`                                                    |
| Prompt del sistema | `<textarea>`          | se proporciona a todas las pestañas                                                     |
| Parámetros         | `ParamSliders`        | temperature, max_tokens, top_p, penalización por presencia/frecuencia, seed, stop       |
| Preajustes         | `PresetPicker`        | carga/guarda instantáneas de configuración con nombre (persistidas en la base de datos) |
| Mejorar prompt     | `ImprovePromptButton` | abre un modal de advertencia sobre la cuota y llama a `/api/playground/improve-prompt`  |

El estado se eleva a `PlaygroundStudio.tsx` y se pasa a todas las pestañas. Cambiar de pestaña
conserva el estado de configuración.

---

## Barra superior

`StudioTopBar.tsx`:

- Selector de pestañas (role="tablist").
- `TokenCostCounter` — visualización en tiempo real de tokens (↑/↓) y del coste estimado.
- Botón para exportar código (`</>`) — abre `ExportCodeModal`.

---

## Modal de exportación de código

`ExportCodeModal.tsx` utiliza `codeExport.ts` para generar fragmentos de curl / Python / TypeScript
a partir del `PlaygroundState` actual. El marcador de posición de la clave de API siempre es `$OMNIROUTE_API_KEY` (D11).

---

## Mejorador de prompts

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. El modal advierte que «consumirá cuota».
2. Al confirmar, envía `{ system, prompt, model, tone }` a la ruta.
3. La ruta llama internamente a `/v1/chat/completions` con `promptImprover.META_SYSTEM_PROMPT`.
4. Devuelve `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. La interfaz actualiza el prompt del sistema del panel de configuración y el prompt del usuario de la pestaña Chat.

---

## Preajustes

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Se almacenan en la tabla SQLite `playground_presets` (migración `084_playground_presets.sql`).
- Cada preajuste almacena: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` para listar, `POST` para crear, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Métricas de streaming

`useStreamMetrics.ts` + `streamMetrics.ts` (función pura):

- `start()` — registra la hora de inicio de la solicitud.
- `onFirstChunk()` — registra el TTFT.
- `onChunk(n)` — acumula el recuento de tokens de finalización.
- `finish(usage?)` — calcula las métricas finales: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Precios obtenidos de la tabla estática de `src/lib/playground/types.ts` (etiquetados como «estimados» — D13).

---

## Rutas del backend

| Método   | Ruta                             | Manejador                                                                                     |
| -------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Valida `ImprovePromptRequestSchema` con Zod; llama a `/v1/chat/completions` con el metaprompt |
| `GET`    | `/api/playground/presets`        | Devuelve `{ presets: PlaygroundPresetListItem[] }`                                            |
| `POST`   | `/api/playground/presets`        | Crea un preajuste; valida `PlaygroundPresetCreateSchema`                                      |
| `GET`    | `/api/playground/presets/:id`    | Devuelve un preajuste o un error 404                                                          |
| `PUT`    | `/api/playground/presets/:id`    | Actualización parcial                                                                         |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                           |

Autenticación: opcional (`REQUIRE_API_KEY`). Errores mediante `buildErrorBody()` (regla estricta n.º 12).

---

## Archivos clave

| Ruta                                                                       | Propósito                                                 |
| -------------------------------------------------------------------------- | --------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Componente contenedor y orquestador de pestañas           |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Pestañas + contador + botón de exportación                |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Panel de configuración compartido                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Entorno de trabajo de chat                                |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Comparación entre varios modelos                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (conservado)                                |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Herramientas + salida estructurada                        |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal de exportación de código                            |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Columna de comparación individual                         |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Visualización de TTFT/TPS                                 |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook de métricas del lado del cliente                     |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook de CRUD de preajustes                                |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook para mejorar prompts                                 |
| `src/lib/playground/codeExport.ts`                                         | Generador de curl/Python/TS (compartido con Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Generador de metaprompts                                  |
| `src/lib/playground/streamMetrics.ts`                                      | Cálculo puro de métricas                                  |
| `src/lib/db/playgroundPresets.ts`                                          | Módulo de base de datos (CRUD)                            |
| `src/app/api/playground/improve-prompt/route.ts`                           | Ruta REST para mejorar prompts                            |
| `src/app/api/playground/presets/route.ts`                                  | Listado y creación de preajustes                          |
| `src/app/api/playground/presets/[id]/route.ts`                             | Obtención/actualización/eliminación de preajustes         |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migración de la base de datos                             |

---

## Solución de problemas

| Síntoma                                               | Causa                                                 | Solución                                                                                                 |
| ----------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| El editor Monaco no se renderiza en la pestaña API    | SSR cargó Monaco                                      | Verifique que `ApiTab` use `dynamic(..., { ssr: false })`                                                |
| Los flujos de comparación se ejecutan secuencialmente | Uso incorrecto de `Promise.all`                       | Todos los inicios de flujos deben enviarse en una sola llamada a `Promise.all`                           |
| Las métricas muestran un TTFT `null`                  | El controlador del primer fragmento no está conectado | Compruebe que se llame a `useStreamMetrics.onFirstChunk()` en el bucle de lectura de SSE                 |
| El preajuste no se conserva                           | No se ejecutó la migración de la base de datos        | Ejecute `npm run db:migrate` o reinicie el servidor (la migración se ejecuta automáticamente al iniciar) |
| Mejorar el prompt devuelve 502                        | El modelo no está configurado en Config               | El usuario debe introducir un nombre de modelo en el panel Config antes de realizar la mejora            |
| El código exportado muestra `MISSING_API_KEY`         | No se insertó el marcador de posición                 | `codeExport.ts` siempre usa `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                 |

---

## Referencias

- Plan maestro: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plan de la funcionalidad: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Exportación de código: `src/lib/playground/codeExport.ts`
- Mejorador de prompts: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
