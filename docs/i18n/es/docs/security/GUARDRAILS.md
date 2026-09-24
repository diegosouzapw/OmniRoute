# Guardrails (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fuente de referencia:** `src/lib/guardrails/`
> **Última actualización:** 2026-08-29 — v3.8.51 (la procedencia de la transcripción de Video Bridge es declarada por quien realiza la llamada,
> aún no está verificada por el servidor — aclarado según #11661)

Las barreras de seguridad aplican medidas de seguridad, políticas y transformaciones de contenido en el límite
entre OmniRoute y los proveedores ascendentes. Cada barrera puede inspeccionar (y
opcionalmente rechazar, transformar o anotar) las cargas útiles de las solicitudes (`preCall`) y
las respuestas ascendentes (`postCall`).

El sistema es **fail-open**: si una barrera genera una excepción durante la ejecución, el registro
guarda el error y continúa con la siguiente barrera en lugar de hacer que falle la
solicitud. El bloqueo es una decisión explícita (`block: true`), nunca un accidente.

## Barreras de seguridad integradas

El registro carga automáticamente seis barreras por orden de prioridad al importarse
(consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridad | Nombre              | Etapa(s)       | Archivo               |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Los números de prioridad más bajos se ejecutan **primero**.

### Vision Bridge (`visionBridge.ts`) — Puente de modalidad PR-1

Intercepta las solicitudes que contienen imágenes dirigidas a **modelos sin capacidad de visión** y
redirige toda la solicitud a un modelo con capacidad de visión o sustituye las partes de
imagen por descripciones de texto producidas por un modelo de visión configurable antes
de la llamada ascendente. Esto permite que los proveedores que solo admiten texto procesen de forma transparente
cargas útiles multimodales.

Flujo:

1. Omitir si el modelo de destino ya admite visión (a menos que aparezca en la
   lista de puente forzado `isVisionBridgeForcedModel`).
2. Extraer las partes de imagen mediante `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega en el **detector de contenido multimedia
   unificado** `detectMediaParts()` de `open-sse/utils/mediaParts.ts`: la
   única fuente de referencia compartida con el filtro de compatibilidad de combos.
   La extracción se limita mediante una lista de permitidos a las partes de nivel superior con las formas
   que `replaceImageParts` puede reinsertar (el contrato extracción↔sustitución): `image_url` de OpenAI,
   `source.type:"base64"` de Anthropic, `source.type:"url"` de Anthropic
   e `input_image` de la API Responses. Las coincidencias anidadas y
   las formas que solo sirven como indicadores pertenecen al filtro de combos y nunca se extraen.
   Omitir si no se encuentra ninguna.
3. Resolver la configuración en tiempo de ejecución mediante `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): las nuevas claves de configuración `modalityBridge*`
   tienen prioridad; las claves heredadas `visionBridge*` siguen siendo una **alternativa durante un ciclo
   de lanzamiento** (ventana de reversión). Omitir antes de recorrer cualquier contenido multimedia cuando el
   puente esté deshabilitado.
4. El selector de modo (`modalityBridgeVisionMode`, consulte la tabla siguiente) decide
   entre redirigir y describir. La redirección devuelve `modifiedPayload` cambiando únicamente `model`,
   además de los metadatos `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ruta de descripción: limitar las imágenes a `maxImages`, componer el prompt adaptado a la tarea,
   consultar la caché de descripciones, llamar al modelo de visión **en paralelo**
   (`Promise.allSettled`) e insertar en su lugar partes de texto con el formato `[Image N]: <description>`.
   Una descripción fallida produce `null` y se **conserva** la parte de imagen original
   (#4012), excepto en la ruta de descripción de combos cuando fallan todas las
   descripciones, donde un proveedor ascendente confirmado sin capacidad de visión recibe en su lugar un
   marcador `(unavailable — no vision-capable provider connected)` (#8430).
6. Devolver `modifiedPayload` y los metadatos (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selector de modo (`modalityBridgeVisionMode`)

| Modo       | Predeterminado | Comportamiento                                                                                                                                                                                                                                                                                                                                           |
| ---------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔              | Heurística heredada, sin cambios (#6640/#7204): los modelos que no son combos o `auto/` se redirigen al mejor modelo de visión, a menos que el modelo original ya tenga credenciales utilizables (en cuyo caso se describe); los destinos de combo siempre se describen.                                                                                 |
| `describe` |                | Describir siempre: el bloque de redirección se omite por completo; el modelo elegido por el usuario siempre responde.                                                                                                                                                                                                                                    |
| `reroute`  |                | Forzar la redirección: se omite la protección que conserva el modelo con credenciales. La protección de credenciales del **destino** de redirección sigue aplicándose: cuando no existe un destino de visión utilizable, la solicitud pasa a la descripción para que las imágenes sin procesar nunca lleguen a un backend que solo admite texto (#8430). |

Los modos forzados provocan un cortocircuito **antes** de que se ejecute la heurística automática; el comportamiento de `auto`
es idéntico byte por byte al de la barrera anterior a PR-1.

#### Prompt de descripción adaptado a la tarea (`modalityBridgeVisionTaskAware`)

El valor predeterminado es **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) añade
al prompt de descripción base el texto del **último mensaje del usuario** (truncado a 500 caracteres),
orientando la descripción hacia lo que el usuario realmente solicitó
(patrón codex-vision-proxy) y pidiendo al modelo de visión que transcriba el texto visible.
Con la opción desactivada —o si no hay texto del usuario— se utiliza el prompt base sin cambios.

La solicitud compatible con OpenAI del propio bucle interno de descripción (`callVisionModelSingle()`
en `visionBridgeHelpers.ts`) siempre solicita `image_url.detail: "high"` —
incondicionalmente, para cada llamador/proveedor, sin depender de ninguna señal del cliente.
El muestreo con bajo nivel de detalle reduce la precisión del OCR precisamente para la tarea de
transcripción de texto que solicita este prompt, por lo que la propia llamada de descripción siempre
solicita un nivel de detalle alto, independientemente del nivel de detalle utilizado por la solicitud
entrante original. Esto solo afecta al cuerpo de la solicitud interna de descripción; no cambia cómo
OmniRoute reenvía el valor `image_url.detail` propio del llamador en la solicitud principal —
ese valor predeterminado se aplica por separado, y solo para clientes OpenCode detectados, en
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). La rama con formato de
conexión de Anthropic del bucle interno de descripción no tiene ningún campo `detail`
y no se ve afectada por ninguno de los valores predeterminados.

#### Límite de salida de la descripción (`modalityBridgeVisionMaxChars`)

| Clave                          | Valor predeterminado | Intervalo       |
| ------------------------------ | -------------------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`                  | `0` o 100–50000 |

`0` (valor predeterminado) significa **sin límite**: la descripción devuelta por
`callVisionModel()` se transmite sin modificaciones, conservando el
comportamiento existente. Cualquier valor del intervalo 100–50000 trunca la descripción con un
sufijo `…` antes de insertarla de nuevo como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` en `src/lib/guardrails/visionBridge.ts`).
Aumente este valor para tareas de OCR con muchos detalles en las que el modelo posterior necesite la
transcripción completa; redúzcalo para limitar el uso de tokens de modelos de visión verbosos.
El campo del panel se encuentra en el panel Advanced de la pestaña Vision
(`modality-bridge-max-chars` en `ModalityBridgeVisionTab.tsx`) y eleva cualquier
valor entre 1 y 99 hasta el mínimo de 100, mientras deja intacto un `0`
explícito: `0` es por sí mismo un valor Zod válido
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), no simplemente
el valor predeterminado para «no establecido».

#### Caché de descripciones (`modalityBridge/bridgeCache.ts`)

Caché LRU + TTL en memoria para las salidas de descripción, compartida por todo el proceso.
Clave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` con
delimitación mediante prefijos de longitud (sin colisiones entre límites de campos). El componente del modelo es
el modelo de puente **configurado**, no el modelo que respondió realmente:
`callVisionModel` puede recurrir internamente a un modelo alternativo, y generar claves por intento
fragmentaría la caché. Las descripciones fallidas nunca se almacenan en caché. Configuración:

| Clave                           | Valor predeterminado | Intervalo |
| ------------------------------- | -------------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`               | —         |
| `modalityBridgeCacheTtlMinutes` | `60`                 | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`                | 10–5000   |

#### Normalización de imágenes remotas (descripción del bucle interno/obtención en base64)

Cuando el puente obtiene por sí mismo una imagen **remota** —la llamada interna de descripción
de Anthropic y la conversión a base64 con formato de conexión de Claude
(`ensureBase64ImagesForClaudeWire`), ambas mediante
`fetchRemoteImageAsDataUri()` en `visionBridgeHelpers.ts`—, el URI de datos
resultante se pasa por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de incorporarlo en la solicitud del
modelo de visión. Las imágenes sobredimensionadas se reducen a un **lado largo de 2048px** (lo que coincide
con el límite de redimensionamiento que OpenAI/Anthropic ya aplican del lado del servidor), lo que reduce
los bytes y la latencia de carga sin cambiar lo que ve el modelo de visión. El redimensionamiento
utiliza `sharp`, cargado mediante una importación dinámica: en una plataforma donde su binario
nativo no pueda cargarse, `normalizeDataUri()` **nunca lanza una excepción**; recurre
a transferir los bytes originales sin cambios, por lo que la ruta de descripción/conversión
a base64 continúa funcionando siempre. Los bytes que no correspondan a una imagen (una obtención que no haya devuelto una
imagen decodificable) también se transfieren sin cambios. Esta normalización
se limita a las imágenes que el puente obtiene para su propia llamada interna; nunca
se aplica a la carga útil sin procesar y transferida directamente del llamador, de acuerdo con el
principio de modificación solo mediante aceptación explícita (Regla estricta n.º 20).

#### Esquema de configuración + migración

Las nuevas claves `modalityBridge*` se validan con Zod en `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, el trío `modalityBridgeCache*` y el
grupo `modalityBridgeAudio*` utilizado por Audio Bridge. La migración
`141_modality_bridge_settings.sql` copia los valores heredados existentes de
`visionBridge*` en las nuevas claves correspondientes (es idempotente y nunca sobrescribe
un valor `modalityBridge*` establecido por un operador); las claves heredadas siguen aceptándose como
alternativa de lectura durante un ciclo de versión.

#### Encabezado de transparencia + estadísticas

Las respuestas transformadas mediante descripción incluyen
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(generado por `buildModalityBridgeHeader()` en `modalityBridge/bridgeStats.ts`,
añadido por `withModalityBridgeHeader()` en `src/sse/handlers/chatHelpers.ts`).
Las solicitudes redirigidas **no** reciben ningún encabezado: la carga útil no se modificó y el cambio
de modelo ya es visible en el campo `model` del cuerpo de la respuesta.

`GET /api/modality-bridge/stats` (autenticación de administración, mismo nivel que
`GET /api/settings`) devuelve los contadores en memoria por modalidad
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` y
`video`. `averageLatencyMs` utiliza `latencySamples`, no todos los intentos, como
denominador; una operación sin medición de tiempo no genera una muestra ficticia de cero milisegundos.
`bridged` sigue siendo el alias retrocompatible para las
conversiones correctas; los intentos fallidos no lo incrementan.
Los contadores se restablecen al reiniciar el proceso por diseño
(telemetría, no contabilidad).

#### Configuración del panel

La página dedicada del panel es
`/dashboard/settings/modality-bridge`. Sus pestañas `Vision`, `Audio` y
`Video`, accesibles mediante URL, conservan los parámetros de consulta al cambiar
el valor de `tab`. La pestaña Vision permite configurar la habilitación, el modo,
la selección de modelos (incluido el valor predeterminado automático), los prompts
adaptados a la tarea, los límites avanzados de tiempo de espera, imagen, longitud
de descripción y caché, los contadores de ejecución y una solicitud de ejemplo
protegida. La pestaña Audio también está activa: permite configurar la habilitación,
un selector de modelos exclusivos para STT con Auto, los límites de tiempo de espera
y duración máxima del clip, los contadores de audio y una prueba de ejemplo con
`input_audio`. La pestaña Video es funcional: informa del estado de ejecución de
FFmpeg/ffprobe, uno de cuatro estados explícitos de la interfaz (`unknown` mientras
la comprobación está en curso o no pudo completarse, `restricted` en un host del
panel que no sea de loopback, donde la comprobación se omite del lado del cliente,
`unavailable` una vez realizada la comprobación y confirmada la ausencia, o
`available` con las versiones de FFmpeg/ffprobe), conserva los límites de
habilitación, modelo, fotogramas, vídeo y tiempo de espera, filtra el selector de
modelos para mostrar los compatibles con visión y presenta los contadores de vídeo.

La antigua tarjeta Vision Bridge de la configuración de IA es un enlace de
compatibilidad hacia la nueva página; ya no mantiene una segunda copia del
formulario. Media Providers también enlaza los flujos de trabajo Image-to-Text y
Speech-to-Text con las pestañas correspondientes de Modality Bridge sin eliminar
el entorno de pruebas existente de Speech-to-Text.

**Omisión de admisión para el bucle propio:** cuando la llamada de descripción se
dirige a través del bucle propio `/v1` de OmniRoute (modelo de proveedor no
estándar), la solicitud secundaria envía
`x-omniroute-admission-bypass: internal` y se autentica con la credencial de bucle
propio resuelta: el centinela local `sk_omniroute` en modo local o la clave de
entorno `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada por el operador (#1350),
de modo que las implementaciones con `REQUIRE_API_KEY=true` puedan seguir
ejecutando la llamada de descripción. La omisión solo se acepta para esas
credenciales exactas, por lo que los clientes externos no pueden usar el
encabezado para omitir la admisión.

Los valores predeterminados heredados se encuentran en
`src/shared/constants/visionBridgeDefaults.ts`; los nuevos valores predeterminados
de modo, adaptación a la tarea y caché, así como el solucionador de configuración,
se encuentran en `src/shared/constants/modalityBridgeDefaults.ts`. La barrera de
protección expone una opción de constructor `deps` para que las pruebas puedan
inyectar implementaciones falsas de `getSettings` y `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta las solicitudes de chat que contienen audio antes de que lleguen a un
destino del que no se sabe que acepte entrada de audio. Nunca redirige la solicitud
de chat: las partes de audio se transcriben mediante el endpoint multipart
compatible con OpenAI existente y el modelo de chat elegido continúa con las
transcripciones de texto.

Flujo:

1. Resuelve `supportsAudio` mediante `getResolvedModelCapabilities()`. Los
   metadatos explícitos del registro de proveedores tienen prioridad, seguidos por
   los metadatos estáticos del modelo y, después, por `modalities_input`
   sincronizado. Una lista de entradas declarada sin `audio` da como resultado
   `false`; si no hay evidencias sobre la capacidad, el resultado sigue siendo
   `null`. Tanto `false` como `null` activan el puente conservador, mientras que
   `true` lo omite.
2. Resuelve la configuración `modalityBridgeAudio*` y extrae de cada mensaje las
   partes de audio reemplazables de nivel superior mediante el detector compartido
   `detectMediaParts()`. Los formatos de transmisión compatibles son
   `input_audio`, `audio_url` y `source.media_type: "audio/*"` de OpenAI. El audio
   anidado se detecta para el enrutamiento, pero no se elimina mediante la ruta de
   reemplazo. El trabajo está limitado por `modalityBridgeAudioMaxClips`; las
   partes posteriores permanecen intactas.
3. Respeta un `provider/model` configurado o permite que
   `selectAudioBridgeModel()` recorra `AUDIO_TRANSCRIPTION_PROVIDERS` siguiendo el
   orden estable del catálogo y seleccione el primer modelo con una credencial
   activa y utilizable del proveedor.
4. `callAudioTranscription()` convierte el audio base64 o con URI de datos en un
   `file` multipart, o descarga un `audio_url` remoto mediante la protección
   saliente de acceso exclusivamente público, con fijación de DNS y un límite de
   25 MB. Después, envía mediante POST el archivo y el modelo seleccionado al
   bucle propio local `/v1/audio/transcriptions`, autenticado con
   `resolveSelfLoopBearer()`. La ruta de transcripción existente realiza la
   búsqueda normal de credenciales, la gestión de periodos de espera y límites de
   tasa, y el envío al proveedor.
5. Las llamadas correctas reemplazan sus partes por
   `[Audio N]: <transcript>`. Las llamadas se ejecutan con `Promise.allSettled`:
   un error individual conserva la parte de audio original (contrato #4012). Si
   todas las llamadas fallan y se ha demostrado que el destino tiene
   `supportsAudio === false`, las partes se convierten en
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para
   un destino desconocido (`null`), el resultado permanece intacto si todas las
   llamadas fallan. Un destino del que se ha demostrado que solo admite texto y
   que no dispone de una credencial STT utilizable recibe el mismo marcador
   explícito sin realizar ninguna llamada de red.

Las transcripciones correctas utilizan la caché LRU/TTL de Modality Bridge para
todo el proceso. La clave combina la referencia de audio, la etiqueta estable de
operación `audio-transcription` y el modelo STT seleccionado; los errores nunca se
almacenan en caché. Los intentos de audio actualizan los contadores compartidos
`bridged`, `cacheHits`, `failures` y `lastUsedAt`. Las respuestas transformadas
incluyen
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; las
solicitudes intactas no reciben ningún segmento de Audio Bridge.

La configuración de ejecución se almacena en la base de datos y se valida mediante
Zod:

| Clave                         | Valor predeterminado | Intervalo     |
| ----------------------------- | -------------------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`               | —             |
| `modalityBridgeAudioModel`    | `""`                 | Auto o ID STT |
| `modalityBridgeAudioTimeout`  | `60000`              | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`                  | 1–10          |

La caché compartida sigue estando controlada por
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` y
`modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta las partes de vídeo de nivel superior en `messages` de Chat Completions y en
`input` de la API de Responses antes de invocar un destino sin compatibilidad nativa
conocida con vídeo. Las formas admitidas son `input_video`, `video_url`, `video_source`,
las URL HTTPS y los URI de datos `data:video/*;base64,...`. Los nombres de archivo sin
formato especial incluidos en texto no se tratan como vídeos.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) se encarga del recorrido de la solicitud,
la comprobación de capacidades/políticas, la agregación por solicitud y la carga útil de
la respuesta. El trabajo por vídeo —la adquisición, la caché de resultados completos, la
descripción de una secuencia de fotogramas (que combina cualquier transcripción de audio
declarada por el llamador) y las métricas, cancelación y limpieza por intento— queda
oculto tras `processVideoPart` en `videoBridgePipeline.ts`, que se invoca una vez por cada
parte de vídeo dentro del bucle de `preCall`. Ese módulo también define los límites de
puerto explícitos `VideoMediaBrokerPort` (adquisición de bytes y extracción de
fotogramas muestreados), `VideoAudioTranscriptionPort` (combinación de una transcripción
de audio declarada por el llamador con los subtítulos muestreados) y
`VideoDrilldownPort` (el límite de persistencia para el análisis detallado de fotogramas;
aún no está conectado a `processVideoPart`: actualmente, solo la ruta independiente
`/api/modality-bridge/video/drilldown` escribe entradas de análisis detallado).

La ruta pública de solicitudes `/v1` nunca importa ni invoca un subproceso. Los vídeos
remotos se descargan con un límite de 50 MiB; los vídeos base64 insertados tienen un
límite conservador por vídeo de 36 MiB una vez decodificados, de modo que la envoltura
del modelo, los mensajes y el encuadre pueda mantenerse dentro del límite de admisión
de solicitudes JSON públicas de 50 MiB. La longitud insertada y las estimaciones del
tamaño decodificado se comprueban antes de realizar la asignación. Se exige HTTPS en la
URL remota inicial y en cada redirección, mediante la protección de salida existente,
restringida a destinos públicos y con fijación de DNS. A continuación, los bytes
atraviesan exactamente el límite interno del intermediario
`POST /api/modality-bridge/video/extract`. Esa ruta es tanto `LOCAL_ONLY` como
`SPAWN_CAPABLE`, solo acepta solicitudes autenticadas por proceso y de bucle invertido
de confianza, y nunca acepta una URL, una ruta del sistema de archivos, un ejecutable ni
una lista de argumentos. La canalización de tamaño del cuerpo de la API y el lector
incremental del cuerpo del controlador aplican de forma independiente un límite de
entrada de 50 MiB para el intermediario. Su cola limitada ejecuta una extracción a la
vez, permite cuatro trabajos pendientes y limita la entrada pendiente a 100 MiB.

Dentro del intermediario, `ffprobe` lee un archivo local privado; la lista fija de
formatos permitidos excluye los formatos de listas de reproducción y manifiestos. Para
los contenedores permitidos de la familia MOV, las referencias a datos MOV externos
permanecen deshabilitadas de forma predeterminada, y el comando fijo no las habilita.
Tanto `ffprobe` como `ffmpeg` utilizan la lista blanca de protocolos limitada
exclusivamente a `file`, un hilo, matrices de argumentos fijas, ningún shell y
ejecutables resueltos desde `PATH`. Los flujos de imágenes de portada adjuntas no se
consideran candidatos reproducibles. Todos los flujos reproducibles deben cumplir los
límites, y se prefiere un flujo predeterminado explícito antes de recurrir de forma
determinista al de menor índice. Los vídeos están limitados a 600 segundos, 8.192
píxeles por dimensión y 33.554.432 píxeles de origen. FFmpeg muestrea entre 1 y 16
fotogramas JPEG en puntos medios, reduce el borde largo a un máximo de 1.024 píxeles sin
ampliar las entradas más pequeñas y nunca recibe una URL. El muestreo es `uniform` de
forma predeterminada. Las políticas opcionales `scene_aware` y la experimental
`segment_aware` realizan una pasada fija adicional de FFmpeg sobre el flujo local ya
validado, seleccionan marcas de tiempo de escenas `showinfo` limitadas y recurren de
forma determinista a los mismos puntos medios uniformes si el detector falla, se agota
el tiempo, la salida tiene un formato incorrecto o el conjunto de candidatos está
vacío. El modo sensible a segmentos asigna muestras de puntos medios proporcionalmente
a los intervalos de escena validados; la evidencia del modo sensible a segmentos y el
comportamiento alternativo se detallan a continuación. El límite estricto de 16
fotogramas se aplica después de la selección en todas las políticas. Cuando una
solicitud sensible a escenas solo dispone de un presupuesto de un fotograma, utiliza el
punto medio uniforme del vídeo completo activo o de la ventana de enfoque e informa
`policyEffective: uniform`: un único fotograma de escena seleccionado no puede conservar
ambos extremos temporales. Opcionalmente, el llamador puede proporcionar una ventana de
enfoque finita (`start`/`end` en segundos); los límites se restringen a la duración del
contenido multimedia, se rechazan las ventanas invertidas o no finitas y todas las
políticas de muestreo se aplican únicamente dentro del intervalo normalizado. La ventana
resultante se incluye en los metadatos de muestreo y en el prefijo no confiable de la
descripción, para que los modelos posteriores puedan distinguir un fragmento enfocado
de la línea temporal completa.

El enfoque semántico de los subtítulos es una configuración independiente y explícita.
El modo de análisis predeterminado `full` conserva el mensaje existente para los
fotogramas y nunca reenvía el texto de la solicitud al modelo de subtitulado. En el modo
`focused`, el puente solo lee el último `text`/`input_text` no vacío creado por el
usuario en el mismo contenedor de Chat o Responses, lo normaliza a NFC, reduce los
caracteres de control y los espacios en blanco, y lo limita a 500 puntos de código
Unicode. Un resultado vacío recurre exactamente al mensaje de `full`. Una indicación
utilizable se serializa como JSON en un bloque dedicado de contexto de usuario no
confiable y solo puede priorizar detalles observables; no puede anular la advertencia
independiente de no seguir instrucciones visibles o audibles en el contenido
multimedia. El enfoque textual nunca infiere `start`/`end` ni modifica el muestreador
temporal.

#### FU-07 evidencia estructural de segmentos

`segment_aware` utiliza una pasada limitada de preanálisis sobre el flujo de vídeo local
ya validado. La cadena fija de filtros primero reduce la escala a un máximo de 320
píxeles de ancho, detecta cambios de escena e intervalos congelados y, a continuación,
muestrea a 1 fotograma por segundo para medir el desenfoque, la luminancia media y la
información espacial/temporal. La pasada está limitada a 600 muestras estructurales, un
hilo de FFmpeg/filtros, las mismas listas de protocolos limitadas exclusivamente a
`file` y de contenedores permitidos, un límite de salida del proceso de 1 MiB y un
máximo de 30 segundos dentro del plazo/cancelación compartido del intermediario. Nunca
acepta de la solicitud un comando, filtro, ruta ni URL.

Los valores estructurales constituyen evidencia de muestreo determinista, no comprensión semántica del vídeo. No infieren sujetos, acciones, subtítulos, habla ni la intención del usuario. Los límites de escena y de congelación forman segmentos; la cobertura de congelación, el desenfoque, la exposición, el detalle espacial y el cambio temporal solo influyen en cómo se distribuye el presupuesto existente de 1–16 fotogramas. Un segmento completamente congelado se limita a un fotograma, mientras que los segmentos no congelados compiten por el presupuesto restante. Cuando hay más límites que fotogramas, se conserva una cobertura uniforme de la línea temporal para que los cortes rápidos iniciales no puedan ocultar un segmento final largo. Los límites de escena que se encuentren dentro de la resolución de análisis de 1 segundo de un límite de congelación se agrupan.

Los filtros ausentes, la evidencia malformada/vacía, un error del detector o el tiempo de espera agotado del preanálisis acotado aplican de forma abierta la política exacta y uniforme de puntos medios. Una cancelación de quien realiza la llamada o el vencimiento del plazo del bróker no se gestionan de forma abierta: terminan el subproceso en curso, impiden la extracción posterior de fotogramas y el árbol temporal privado se elimina en `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera fixtures deterministas de FFmpeg real para evaluar el ahorro de llamadas de subtitulado después de la deduplicación, la asignación del presupuesto con movimiento denso, la evidencia de desenfoque/exposición/SI-TI, los cortes rápidos con un tramo final largo y los falsos positivos de fundidos graduales. Registra el tiempo real transcurrido del preanálisis y, cuando `/usr/bin/time` está disponible, la CPU del proceso hijo y el pico de RSS. Sus comprobaciones de calidad son únicamente oráculos estructurales. La calidad de los modelos reales de subtitulado permanece en `HOLD` porque este entorno de pruebas no dispone de un endpoint autorizado ni de un evaluador congelado. El ahorro monetario también permanece en `HOLD`, salvo que `--caption-cost-per-call-usd` proporcione una estimación positiva explícita del coste por llamada; el script nunca inventa ninguno de estos resultados.

Cada fotograma está limitado a 4 MiB, el conjunto de todos los fotogramas sin procesar a 23 MiB y la respuesta serializada del bróker a 32 MiB. Un directorio temporal privado se elimina en `finally`. OmniRoute no incluye FFmpeg ni acepta una ruta personalizada al ejecutable. Antes del subtitulado, el puente aplica una pasada conservadora de deduplicación visual: cada JPEG se reduce a un búfer en escala de grises de 16×16 y se compara únicamente con el último fotograma conservado. Para un presupuesto de subtitulado solicitado superior a un fotograma, la extracción proporciona un conjunto acotado de candidatos de hasta el doble de dicho presupuesto y nunca superior a 16 fotogramas. El límite solicitado se aplica únicamente después de la deduplicación, conservando el primer y el último candidato seleccionados durante la reducción final cuando el presupuesto es de al menos dos. La política versionada `grayscale-16x16-mean-cells-v2` utiliza el mayor valor entre la diferencia media de luminancia y la proporción de celdas de la miniatura cuya diferencia normalizada es de al menos 0.05. El umbral de duplicados es la constante 0.04, elegida por su previsibilidad en lugar de exponerse como un ajuste en tiempo de ejecución. Esta señal secundaria de alto contraste conserva los movimientos pequeños y los cambios de texto visible que una comparación basada únicamente en la media puede ocultar. Los errores del comparador o del decodificador se gestionan de forma abierta y mantienen la cobertura. Los metadatos de salida distinguen entre los candidatos extraídos, los fotogramas utilizados correctamente y los duplicados visuales descartados.

Una parte de vídeo marcada explícitamente puede solicitar una hoja de contactos con marcas de tiempo. El puente crea una cuadrícula JPEG de hasta 4 columnas y 16 fotogramas. Cada celda de 512 píxeles incrusta la marca de tiempo de su fuente en una banda inferior de alto contraste, mientras que las mismas marcas de tiempo permanecen en los metadatos textuales para permitir su asociación y auditoría posteriores. El JPEG completo sigue limitado a 32 MiB. Si `sharp` no puede decodificar o componer la cuadrícula, el puente recurre a los fotogramas JPEG individuales; la cancelación de un cliente continúa propagándose durante la operación de la hoja.

La evidencia para la promoción se mantiene deliberadamente separada del microbenchmark sintético de composición. `scripts/perf/video-bridge-contact-sheet-eval.ts` define un entorno de pruebas A/B con esquema versionado para modelos de visión reales compatibles con OpenAI. Mide los tokens informados por el proveedor, la latencia real de extremo a extremo (incluida la composición de la hoja), el número de llamadas al modelo y la conservación de hechos definida en el manifiesto. Las respuestas sin procesar del modelo no se escriben en el informe; solo se conservan los resúmenes SHA-256 y los identificadores de los hechos coincidentes. El entorno de pruebas no realiza ninguna llamada de red ni a modelos de pago, salvo que se pase `--execute-real` y estén configurados `--model`, `OMNIROUTE_BASE_URL` y `OMNIROUTE_API_KEY`. Sin esa ejecución real explícita, su veredicto legible por máquina permanece en `HOLD`; las mediciones sintéticas de carga útil o número de llamadas no constituyen por sí solas evidencia para la promoción.

Quienes realizan las llamadas pueden adjuntar un array opcional `transcript.cues` a una parte de vídeo compatible cuando ya dispongan de texto alineado. Cada indicación debe incluir `text`, un intervalo finito `start`/`end` dentro de la duración detectada y un `source` incluido en la lista de permitidos (`client`, `embedded` o `audio-bridge`); `confidence` tiene como valor predeterminado `1` y debe mantenerse entre `0` y `1`. Las indicaciones exactamente duplicadas se consolidan. OmniRoute nunca inicia una transcripción a partir de estos metadatos: las indicaciones validadas se copian en el resultado descrito con su fuente, confianza e intervalo, y se presentan como observaciones no confiables junto con los subtítulos de los fotogramas. El texto no válido, fuera de rango o sin procedencia se rechaza en lugar de mezclarse con el flujo de subtítulos. Actualmente, el campo `source` lo declara quien realiza la llamada y no lo verifica el servidor: OmniRoute comprueba que el valor sea una de las tres cadenas permitidas, pero todavía no confirma criptográficamente que una etiqueta `embedded` o `audio-bridge` proceda realmente de una extracción controlada por el servidor. Trate `source` como una indicación no confiable hasta que se implemente dicha verificación; no base en ella decisiones de autorización.

Un llamador avanzado puede proporcionar una pista `audioTranscript` ya autorizada
para el mismo vídeo. La unión de fusión ejecuta las observaciones visuales y de audio
con un único plazo límite y una única señal de cancelación, las ordena en una línea
temporal común, combina los duplicados exactos e informa de un resultado parcial
cuando solo una de las partes tiene éxito. Un `audioTranscript` no válido se degrada
a ese resultado parcial —se conserva la descripción visual y la rama de audio
registra un código de error sanitizado— en lugar de provocar el fallo de todo el
vídeo. La disponibilidad por rama, el indicador de resultado parcial y los códigos
de error sanitizados se conservan en el resultado descrito, en los metadatos de
protección (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), en los metadatos de la caché de resultados y en los
contadores de fusión del puente. La ruta predeterminada de Video Bridge no invoca
la conversión de voz a texto ni descarga una segunda copia del contenido multimedia;
sin esa pista explícita, continúa procesando únicamente el vídeo.

**Retención de transcripciones (#12150 P1).** Esto se aplica automáticamente siempre
que Video Bridge (que a su vez es opcional) renderiza una indicación de transcripción:
no hay ningún indicador de retención independiente. Cuando una solicitud renderiza
cualquier indicación de transcripción (un `transcript` declarado por el llamador o
un `audioTranscript` fusionado), la protección la marca como
`videoBridgeObserved` y genera una copia paralela censurada de la descripción del
vídeo: una renderización idéntica en la que el cuerpo de texto libre de cada
indicación se sustituye por `[redacted-video-transcript]`, creada mediante la
sustitución del campo estructurado de la indicación antes de ensamblar la cadena
(nunca mediante el análisis del texto aplanado, por lo que ningún contenido de la
indicación —malicioso o normal, incluidos los cuerpos que contengan `]`, como
`[inaudible]`/`[music]`— puede conservarse). El cuerpo de la solicitud del registro
de llamadas persistido sustituye cada parte de texto derivada del vídeo por esa
copia paralela censurada, mediante una comparación por igualdad de contenido; el
ancla `fullText` se vuelve a leer de la carga útil de protección finalizada previa
a la llamada, por lo que la coincidencia sigue funcionando después de que las
protecciones posteriores de la cadena (los enmascaradores de PII y credenciales,
con prioridades 10/95) reescriban la descripción en el sitio y después de que la
inyección del mensaje del sistema, la transferencia de contexto y la memoria
modifiquen la estructura de la matriz de mensajes. El cuerpo enviado al modelo no
se modifica. Una solicitud observada tampoco rellena ninguna Memory duradera (se
omite la extracción derivada tanto de la solicitud como de la respuesta), por lo
que la propia respuesta del modelo no puede replicar el texto de la transcripción
en Memory.

Superficies de retención aún abiertas, registradas para un seguimiento (**P2**,
#12430): la instantánea sin procesar de la solicitud del cliente anterior a la
protección en el artefacto de registro detallado; el cierre preventivo de las
continuaciones de `previous_response_id`; los envíos internos de mensajes
derivados que incrustan la transcripción en un mensaje sintetizado (etapas de la
canalización, transferencia de contexto); y el cuerpo de la respuesta o la copia
en la caché semántica de una respuesta del modelo que cite la transcripción. Estas
son superficies sin procesar, de clase de respuesta u opcionales que quedan fuera
del ámbito de P1 relativo al cuerpo de solicitud persistido y Memory.

El ciclo de vida interno de `/api/modality-bridge/video/drilldown` es un sustrato
de caché independiente, de bucle invertido y autenticado mediante token. Cada
operación también requiere un ID de principal opaco y canónico. Antes de habilitar
un llamador de producción, este debe derivar ese ID del inquilino autenticado y
nunca debe reenviar un valor seleccionado por el cliente. Las claves de caché
vinculan ese principal con los ID canónicos de sesión y de referencia de vídeo,
almacenan únicamente sus claves derivadas mediante SHA-256 y limitan tanto las
lecturas como la eliminación al mismo principal. La caché almacena como máximo
16 fotogramas JPEG derivados por entrada, los hace caducar después de diez minutos
y admite lecturas delimitadas mediante `start`/`end` o la eliminación explícita
de la sesión.

Cada principal está limitado a 16 entradas y 64 MiB de datos JPEG canónicos. Esos
límites son independientes del límite global de 64 entradas/256 MiB: la presión
sobre la cuota de un principal solo desaloja las entradas usadas menos
recientemente de ese principal antes de considerar el desalojo LRU global. Las
entradas caducadas se eliminan tanto de la contabilidad del principal como de la
global durante la actividad de la caché, mientras que una cancelación o un fallo
de validación no confirma un reemplazo parcial.

La caché rechaza Base64 no canónico, relleno excesivo, contenido multimedia que no
sea JPEG, archivos JPEG mal formados o truncados y archivos JPEG que produzcan una
advertencia durante una decodificación acotada de la imagen completa mediante
`sharp`. Vuelve a codificar cada imagen aceptada como un JPEG canónico, deriva la
anchura y la altura de los bytes decodificados en lugar de confiar en los campos
del llamador y descarta cualquier byte políglota añadido al final en lugar de
conservarlo. Solo el búfer comprimido canónico y acotado se contabiliza en ambas
cuotas. El límite de transmisión JSON incluye la sobrecarga de Base64 para el
límite máximo de 32 MiB de entrada decodificada. Cada
derivación almacenada registra su formato/resolución JPEG validados, política de
muestreo, versión de derivación, hora de creación, hash de contenido calculado por
el servidor y referencia principal con hash, además del hash de contenido
principal del llamador de confianza. La cancelación se comprueba entre las fases
asíncronas de decodificación y cálculo del hash, antes de la confirmación atómica
en la caché.

Este tramo todavía no conecta ningún productor de producción con la ruta ni
proporciona selección de variantes con múltiples resoluciones. Por tanto, la ruta
transparente de solicitudes de Video Bridge no añade trabajo adicional, mientras
que la derivación del principal vinculada al inquilino y el ciclo de vida completo
de múltiples resoluciones de FU-08 siguen siendo tareas de seguimiento explícitas,
en lugar de documentarse como comportamiento completado.

Los fotogramas se subtitulan secuencialmente con el modelo de vídeo configurado. Una anulación de vídeo vacía hereda la configuración de Vision; si ambas están vacías, el enrutador automático de Vision selecciona el modelo efectivo con capacidad de visión. Los subtítulos generados correctamente reemplazan la parte original con un prefijo estable `[Video description:` que también marca el texto como una observación no confiable derivada de contenido multimedia e indica a los modelos posteriores que no sigan las instrucciones encontradas en dicho contenido. Las claves de caché de los subtítulos de fotogramas incluyen los bytes JPEG, el prompt, la marca de tiempo y el modelo efectivo; solo se almacenan en caché los subtítulos generados correctamente. Las entradas de caché conservan el modelo productor real que tuvo éxito, incluido un modelo de respaldo; el puente informa `mixed` cuando distintos fotogramas fueron producidos por modelos diferentes. Un acierto de caché reutiliza esa identidad del productor en lugar de volver a etiquetarla como el plan de enrutamiento solicitado. La caché de resultados del vídeo completo usa como clave cada entrada que modifica la salida: el prompt, el modelo efectivo, la política de muestreo, el número de fotogramas, el modo de análisis semántico, la huella SHA-256 de la indicación de enfoque normalizada, la ventana de enfoque, `transcript`, `audioTranscript` y el indicador de hoja de contactos; por tanto, cambiar cualquiera de esas dimensiones provoca un fallo de caché, nunca la reutilización de datos obsoletos. La versión, el umbral y el número limitado de fotogramas candidatos de la política de deduplicación visual también se incluyen explícitamente en la clave y en los metadatos de la caché de resultados; por consiguiente, un cambio de política no puede reutilizar una descripción obsoleta del vídeo completo. Los metadatos v4 de la caché de resultados conservan el modo y la huella, pero nunca la tarea sin procesar del usuario. Los metadatos de la barrera de protección informan tanto del modo de análisis solicitado como del efectivo; un modo `focused` solicitado sin texto de usuario utilizable se registra con `full` como modo efectivo.

La barrera de protección extrae cada parte de vídeo compatible, pero no describe más de `modalityBridgeVideoMaxVideos`. Para un destino del que se haya demostrado que tiene `supportsVideo === false`, los vídeos con errores y los que superen el límite se convierten en marcadores de texto seguros explícitos, de modo que no sobreviva ningún vídeo sin procesar. Cuando se desconoce la capacidad, esas partes permanecen intactas. Los destinos con `supportsVideo === true` omiten el puente. La señal de cancelación de la solicitud del cliente se propaga a través de la descarga, la cola del intermediario, los subprocesos y las llamadas de generación de subtítulos; las cancelaciones detienen el procesamiento entre vídeos y nunca permiten que el contenido multimedia sin procesar pase como mecanismo de tolerancia a fallos.

La configuración en tiempo de ejecución está respaldada por la base de datos y validada mediante Zod:

| Clave                               | Valor predeterminado | Intervalo/comportamiento                                                                                    |
| ----------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`              | Tiempo de ejecución opcional, activación voluntaria                                                         |
| `modalityBridgeVideoAnalysisMode`   | `"full"`             | `full` conserva subtítulos genéricos; `focused` utiliza contexto limitado y no confiable del último usuario |
| `modalityBridgeVideoModel`          | `""`                 | Hereda el modelo de Vision Bridge                                                                           |
| `modalityBridgeVideoFrameCount`     | `8`                  | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`          | `uniform`, `scene_aware` o `segment_aware` proporcional; un fallo del detector recurre a `uniform`          |
| `modalityBridgeVideoMaxVideos`      | `1`                  | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`             | 1000–120000 ms                                                                                              |

Los valores heredados y persistidos del tiempo de espera de vídeo superiores a 120 segundos se limitan al plazo máximo del intermediario; se rechazan las nuevas escrituras de configuración que superen ese límite. `GET /api/modality-bridge/video/runtime` exige una ubicación local de bucle invertido confiable y marcada antes de la autenticación o del sondeo del entorno de ejecución, y después exige autenticación de administración. Solo devuelve `available`, las versiones saneadas de FFmpeg/ffprobe y un motivo fijo cuando el entorno de ejecución no está disponible. El endpoint interno de extracción no es una API pública de carga: la saturación de la cola devuelve `503` junto con `Retry-After`, la desconexión de quien realiza la llamada devuelve `499` y el plazo máximo fijo del intermediario devuelve `504`. Las respuestas convertidas añaden `video->text;model=<visionModel>;parts=<videos>` al encabezado central `x-omniroute-modality-bridge` sin eliminar los segmentos de Vision o Audio.

### Enmascarador de PII (`piiMasker.ts`)

Se ejecuta en **ambas** etapas.

- **`preCall`** clona la carga útil, recorre `system`, `messages`, `input` y `prompt` (incluidos los elementos que son cadenas de texto simples) y aplica `processPII()` (de `@/shared/utils/inputSanitizer`) a los campos `content`/`text` de tipo cadena. Cuando `PII_REDACTION_ENABLED=true`, la PII detectada se censura en la carga útil saliente. Esto es independiente de `INPUT_SANITIZER_MODE` (que solo controla la política de inyección de prompts). Cuando la censura está desactivada, la llamada registra los recuentos de detecciones sin reescribir el contenido.
- **`postCall`** realiza una clonación profunda de la respuesta y ejecuta `sanitizePIIResponse()` junto con el enmascarador de la estructura de Responses API (`maskResponsesOutput`, que abarca `output_text` y `output[].content[].text`). Si se produce alguna censura, la respuesta modificada reemplaza a la original.

La barrera de protección nunca bloquea; solo anota (`meta.detections`, `meta.redacted`) o reescribe.

### Inyección de prompts (`promptInjection.ts`)

Detecta estructuras maliciosas en el contenido proporcionado por el usuario y aplica la política configurada. El comportamiento está determinado por las variables de entorno y las opciones del constructor:

| Configuración     | Variable de entorno                                                                                   | Valor predeterminado | Efecto                                                                                                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`               | Cuando es `false`, la barrera de protección finaliza anticipadamente.                                                                                                                                                            |
| Modo              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`               | Política de inyección: `block`, `warn` o `log`. (`redact` se acepta por compatibilidad retroactiva, pero **no** elimina texto de inyección; la reescritura de PII de la solicitud se controla mediante `PII_REDACTION_ENABLED`.) |
| Umbral de bloqueo | Opción `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`               | Gravedad mínima necesaria para bloquear. Con la configuración predeterminada, la gravedad media solo se observa.                                                                                                                 |

**Precedencia del modo** (`getMode`): `options.mode` del llamador →
**anulación mediante el indicador de función de la BD** `INJECTION_GUARD_MODE` (Panel de control → Configuración →
Indicadores de funciones) → variable de entorno `INJECTION_GUARD_MODE` → variable de entorno `INPUT_SANITIZER_MODE` →
`warn`. Por lo tanto, una anulación desde el panel de control prevalece sobre las variables de entorno, de modo que la interfaz de
Indicadores de funciones controla en vivo la barrera en ejecución (sin reiniciar). La lectura de la BD funciona de forma segura ante fallos:
si se produce un error, la barrera recurre al comportamiento basado en las variables de entorno y, cuando no se
establece ninguna anulación, el comportamiento es idéntico a la resolución basada únicamente en variables de entorno.

Fuentes de detección:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto compartido de detectores
   utilizado en otros puntos de la canalización).
2. `DEFAULT_GUARD_PATTERNS` integrados (actualmente `system_override_inline` y
   `markdown_system_block`, ambos con gravedad `high`).
3. `customPatterns` opcionales pasados mediante las opciones del constructor (cadenas, expresiones regulares
   o registros `{ name, pattern, severity }`).

Cuando `mode === "block"` **y** al menos una detección alcanza el umbral de
gravedad, `preCall` devuelve `{ block: true, message: "Request rejected:
suspicious content detected" }`. En los modos `warn`/`log`, la barrera de protección registra el evento, pero
permite la llamada. La función auxiliar compartida `evaluatePromptInjection()` también se exporta
para los llamadores que necesiten evaluar prompts sin pasar por el registro.

**Límite de análisis (v3.8.20):** el detector solo inspecciona los **primeros 16 KB** del
texto unido del prompt: `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) en
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` como
`evaluatePromptInjection()` ejecutan `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de recorrer
los patrones. Las directivas de inyección se sitúan cerca del comienzo de una entrada, por lo que esto
limita el uso de CPU/GC de las expresiones regulares en cargas de varios cientos de KB sin debilitar la detección (véanse
#3932 y #4041).

### Enmascarador de credenciales (`credentialMasker.ts`)

Se ejecuta en **ambas** etapas, en último lugar dentro de la cadena predeterminada (prioridad `95`). Censura
patrones conocidos de claves de API y tokens secretos en la carga saliente (contenido de
mensajes, argumentos de llamadas a herramientas y resultados de herramientas) **y** en la respuesta del proveedor, para que una
credencial pegada en un prompt (o reproducida en el resultado de una herramienta) no se filtre
al proveedor ascendente ni de vuelta al cliente.

- **Solo mediante activación explícita**, siguiendo la misma convención que la censura de PII (regla estricta adyacente a la n.º 20):
  está deshabilitado salvo que `settings.credentialRedactionEnabled === true` **o**
  `CREDENTIAL_REDACTION_ENABLED=true`. Cuando está desactivado, la barrera de protección no realiza ninguna acción:
  nunca bloquea ni reescribe.
- `redactCredentials()` recorre todo el árbol de la carga/respuesta (`walkValue()`,
  protegido contra la contaminación de prototipos y contra ciclos mediante `WeakSet`) y sustituye las coincidencias por
  un marcador de posición `[REDACTED:<type>]`, clonando únicamente las ramas que realmente
  hayan cambiado.
- `CREDENTIAL_PATTERNS` abarca claves de proveedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), claves de pago (Stripe, Square), claves de servicios
  en la nube (clave de acceso de AWS, Twilio, SendGrid, Mailgun), claves privadas/JWT,
  cadenas de conexión que contienen credenciales (`mongodb://user:pass@...`, etc.) y
  un patrón genérico para valores de cabeceras `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Las claves con formato de cabecera (`authorization`, `x-api-key`, `api-key`,
  `apikey`) se censuran estructuralmente (solo el valor, conservando el prefijo del esquema, como
  `Bearer `/`Basic `), en lugar de utilizar la expresión regular genérica de texto.
- La barrera de protección nunca bloquea; solo reescribe (`modifiedPayload` /
  `modifiedResponse`) y añade anotaciones (`meta.credentialsRedacted`, `meta.count`).

Protección contra regresiones: `tests/unit/credential-masker-guardrail.test.ts`.

## Contrato base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true interrumpe inmediatamente la cadena
  message?: string; // se muestra cuando se bloquea
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // devuelto por preCall para reescribir la solicitud
  modifiedResponse?: TValue; // devuelto por postCall para reescribir la respuesta
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Un mecanismo de protección indica que «no hay cambios» devolviendo `void`, `{}` o
`{ block: false }`. Devolver un `modifiedPayload`/`modifiedResponse` reemplaza
el valor que fluye por la cadena para los mecanismos de protección posteriores.
`signal?: AbortSignal` transmite el ciclo de vida del llamador a los mecanismos de protección. La cancelación de una solicitud es la excepción deliberada de apertura ante fallos: los puentes multimedia detienen el trabajo y realizan la limpieza sin restaurar los datos multimedia sin procesar en un destino que se sabe que no los admite.

## Registro (`registry.ts`)

La instancia singleton `guardrailRegistry` expone:

- `register(guardrail)` — añade un mecanismo de protección (o reemplaza uno según su nombre normalizado) y
  vuelve a ordenarlos por `priority` ascendente.
- `clear()` / `list()` — funciones auxiliares administrativas.
- `runPreCallHooks(payload, context)` — recorre los mecanismos de protección activos, pasa el
  payload a través de `modifiedPayload` y se detiene ante el primer `block: true`.
- `runPostCallHooks(response, context)` — el mismo flujo en el lado de la respuesta.
- `resetGuardrailsForTests({ registerDefaults })` — borra el estado y, opcionalmente,
  vuelve a registrar los valores predeterminados para lograr un aislamiento limpio de las pruebas.

Ambos ejecutores devuelven `{ blocked, payload|response, results, guardrail?, message? }`,
donde `results` es un array de registros `GuardrailExecutionResult` que incluyen
los campos `blocked`, `skipped`, `modified`, `error` y `meta` por cada mecanismo de protección,
útiles para el seguimiento.

### Desactivar mecanismos de protección por solicitud

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` recopila una
lista sin duplicados de nombres de mecanismos de protección que deben omitirse en la
solicitud actual. Fuentes (todas opcionales y combinadas):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` en el cuerpo de la solicitud (nivel superior)
- `metadata.disabledGuardrails` en el cuerpo de la solicitud
- Encabezado `x-omniroute-disabled-guardrails` (o el heredado
  `x-disabled-guardrails`)

Los valores pueden ser arrays de cadenas o una cadena separada por comas; los nombres se
normalizan a minúsculas en formato kebab-case (`pii_masker` → `pii-masker`). El resultado
se pasa mediante `context.disabledGuardrails` al registro, que omite
los mecanismos de protección coincidentes (`skipped: true` en `results`).

## Orden de ejecución

Para cada solicitud que pasa por `src/sse/handlers/chat.ts` y
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` crea la lista de omisiones a partir de la clave de API, el cuerpo
   y los encabezados.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` ejecuta las barreras de seguridad en orden
   ascendente de prioridad:
   - Las barreras de seguridad deshabilitadas se registran como `skipped`.
   - El método `preCall` de cada barrera de seguridad puede reescribir la carga útil mediante `modifiedPayload`.
   - El primer `block: true` interrumpe la cadena y el controlador devuelve
     una respuesta de rechazo de la barrera de seguridad.
3. La carga útil (posiblemente reescrita) pasa al enrutamiento combinado y al despacho
   ascendente.
4. Una vez creada la respuesta, `guardrailRegistry.runPostCallHooks(...)`
   ejecuta la misma cadena sobre la respuesta. En este caso, `block: true` descarta la respuesta
   ascendente.

Las barreras de seguridad que generan una excepción se registran con `error: <message>` y se anotan mediante
`logger.warn`, pero la cadena continúa; por diseño, se permite la operación en caso de fallo.

## Configuración

Variables de entorno leídas por las barreras de seguridad integradas:

| Variable                              | Utilizada por              | Efecto                                                                                                                                          |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Establézcala en `false` para deshabilitar por completo la detección.                                                                            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Política de inyección: `warn`, `block` o `log`. El valor heredado `redact` no reescribe el texto de la inyección.                               |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modo de la protección contra inyecciones; también es una marca de funcionalidad de la BD que **reemplaza** las variables de entorno (BD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Gravedad mínima que rechaza `MODE=block`: `high` (predeterminada), `medium` o `low`.                                                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias heredado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                            |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Cuando es `true`, se oculta la PII de la solicitud (independientemente del modo de inyección).                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (descendente) | Controla el comportamiento del ocultador en las respuestas.                                                                                     |

Las barreras de seguridad de Modality Bridge leen la configuración en tiempo de ejecución del almacén
de ajustes respaldado por la BD (`getSettings()`), no de las variables de entorno. Las claves principales de Vision son
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` y
`modalityBridgeCacheMaxEntries`. Las claves heredadas
`visionBridge*` solo se aceptan como mecanismo alternativo de lectura durante un ciclo, según lo documentado;
las escrituras del panel usan las claves principales. Los valores predeterminados y el
resolutor alternativo se encuentran en `src/shared/constants/modalityBridgeDefaults.ts`, mientras que las constantes
heredadas se conservan en `src/shared/constants/visionBridgeDefaults.ts`.

Audio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` y `modalityBridgeAudioMaxClips`, además de los ajustes compartidos
`modalityBridgeCache*`. Audio no tiene un mecanismo alternativo para claves heredadas porque estas
claves se introdujeron con el esquema de Modality Bridge.

Video usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` y
`modalityBridgeVideoTimeout`, además de los ajustes compartidos `modalityBridgeCache*`.
Está deshabilitado de forma predeterminada porque FFmpeg/ffprobe son dependencias operativas
opcionales y la descripción de fotogramas añade latencia y costes del modelo.

## Barreras de protección personalizadas

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Pasos:

1. Cree `src/lib/guardrails/myGuardrail.ts` extendiendo `BaseGuardrail`.
2. Implemente `preCall` y/o `postCall`.
3. Regístrela durante la importación (incorpórela desde `registerDefaultGuardrails`) o
   llame a `guardrailRegistry.register(...)` en tiempo de ejecución; el registro reemplaza
   cualquier barrera de protección anterior que tenga el mismo nombre normalizado.
4. Añada pruebas en `tests/unit/` (ejemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pruebas

Use `resetGuardrailsForTests()` entre pruebas para comenzar desde un estado conocido.
Pase `{ registerDefaults: false }` para comenzar con un registro vacío y
registrar únicamente las barreras de protección que se estén probando. Vision Bridge admite
inyección de dependencias (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge expone los
puntos de integración equivalentes para la configuración, las capacidades, la selección del modelo STT, las comprobaciones
de credenciales y la transcripción. Por lo tanto, las pruebas pueden ejercitar ambos flujos sin acceso
a la base de datos ni a la red.

## Véase también

- `src/lib/guardrails/` — implementación
- `src/shared/utils/inputSanitizer.ts` — detector compartido que permite
  detectar la inyección de prompts y enmascarar PII
- `src/shared/constants/visionBridgeDefaults.ts` — valores predeterminados de Vision Bridge y
  lista de modelos con puente forzado
- `src/shared/constants/modalityBridgeDefaults.ts` — valores predeterminados compartidos de ejecución de Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — capa ortogonal (disyuntor, períodos de espera)
- `docs/reference/ENVIRONMENT.md` — referencia completa de variables de entorno

## Cobertura de rutas y red team de la protección contra inyecciones (Fase 8 · Bloque D)

La protección contra inyecciones (`createInjectionGuard` / `withInjectionGuard`) cubre todas las rutas
que aceptan prompts de usuario. Respeta `INJECTION_GUARD_MODE` (el valor predeterminado `warn` = solo registra;
`block` = devuelve HTTP 400 `SECURITY_001`).

| Tipo              | Rutas                                                                                                                                                | Modo predeterminado |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generativas       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Datos             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

La extracción de texto (`extractMessageContents`) cubre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (nocturno, `nightly-llm-security.yml`):** promptfoo valida que cada ruta bloquee
el corpus OWASP-LLM con `INJECTION_GUARD_MODE=block`; garak ejecuta sondas (se omite si no hay un secreto).
`moderations` se incluye para mantener la coherencia; los operadores que utilicen el modo de bloqueo pueden excluirla mediante
`resolveDisabledGuardrails`.

El flujo de trabajo nocturno (`.github/workflows/nightly-llm-security.yml`, cron + ejecución
manual) tiene dos trabajos:

- **`promptfoo-guard` (bloqueante)** — ejecuta `promptfoo eval -c promptfooconfig.yaml`
  con `INJECTION_GUARD_MODE=block`. Cada caso adversario (p. ej., «ignora todas las
  instrucciones anteriores…», jailbreaks de estilo DAN) comprueba que la respuesta contenga
  `error.code === "SECURITY_001"`, es decir, que la protección haya rechazado realmente la solicitud.
- **`garak` (consultivo)** — ejecuta garak `--probes promptinject,dan,leakreplay`
  contra una instancia local de OmniRoute (`http://localhost:20128/v1`). Está condicionado a un
  secreto del proveedor (`PROMPTFOO_PROVIDER_KEY`); se omite sin errores y lleva el sufijo
  `|| true`, por lo que genera informes sin provocar fallos en CI.

La cobertura del auxiliar de protección (`createInjectionGuard` / `withInjectionGuard`)
abarca todas las rutas `/v1` que admiten prompts; el texto del prompt se obtiene de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mediante
`extractMessageContents()` en `src/shared/utils/inputSanitizer.ts`.
