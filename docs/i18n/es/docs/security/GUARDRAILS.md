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

El registro carga automáticamente seis barreras de seguridad en orden de prioridad al importarse (ver `registry.ts` → `registerDefaultGuardrails()`):

| Prioridad | Nombre              | Etapa(s)       | Archivo               |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Los números de prioridad más bajos se ejecutan **primero**.

### Vision Bridge (`visionBridge.ts`) — Puente de Modalidad PR-1

Intercepta solicitudes que contienen imágenes dirigidas a **modelos sin capacidad de visión** y redirige la solicitud completa a un modelo con capacidad de visión o reemplaza las partes de la imagen con descripciones de texto producidas por un modelo de visión configurable antes de la llamada ascendente. Esto permite a los proveedores de solo texto manejar de forma transparente cargas útiles multimodales.

Flujo:

1.  Se omite si el modelo de destino ya soporta visión (a menos que aparezca en la lista de puentes forzados `isVisionBridgeForcedModel`).
2.  Extrae partes de la imagen a través de `extractImageParts(messages)` (`visionBridgeHelpers.ts`), que delega en el **detector de medios unificado** `detectMediaParts()` en `open-sse/utils/mediaParts.ts` — la única fuente de verdad compartida con el filtro de compatibilidad combinado. La extracción está permitida solo para las partes de nivel superior de las formas que `replaceImageParts` puede volver a insertar (el contrato extraer↔reemplazar): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, y Responses API `input_image`. Los aciertos anidados y las formas solo indicadoras son material del filtro combinado y nunca se extraen. Se omite si no se encuentra ninguno.
3.  Resuelve la configuración en tiempo de ejecución a través de `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): las nuevas claves de configuración `modalityBridge*` tienen prioridad; las claves `visionBridge*` heredadas permanecen como un **mecanismo de respaldo de un ciclo** (ventana de reversión). Se omite antes de cualquier recorrido de medios cuando el puente está deshabilitado.
4.  El selector de modo (`modalityBridgeVisionMode`, ver tabla a continuación) decide entre redirigir o describir. La redirección devuelve `modifiedPayload` con solo `model` intercambiado, más metadatos `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Ruta de descripción: limita las imágenes a `maxImages`, compone el prompt sensible a la tarea, consulta la caché de descripción, llama al modelo de visión **en paralelo** (`Promise.allSettled`), e inyecta partes de texto `[Imagen N]: <descripción>` en su lugar. Una descripción fallida produce `null` y la parte original de la imagen se **conserva** (#4012) — excepto en la ruta de descripción combinada cuando todas las descripciones fallaron, donde un upstream no-visión confirmado recibe un stub `(no disponible — no hay proveedor con capacidad de visión conectado)` en su lugar (#8430).
6.  Devuelve `modifiedPayload` + metadatos (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selector de modo (`modalityBridgeVisionMode`)

| Modo       | Predeterminado | Comportamiento                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔              | Heurística heredada, sin cambios (#6640/#7204): los modelos no combinados/`auto/` se redirigen al mejor modelo de visión a menos que el modelo original ya tenga credenciales utilizables (entonces describe); los objetivos combinados siempre describen.                                                                     |
| `describe` |                | Siempre describe — el bloque de redirección se omite por completo; el modelo elegido por el usuario siempre responde.                                                                                                                                                                                                          |
| `reroute`  |                | Fuerza la redirección: la protección del modelo con credenciales se omite. La protección de credenciales del **objetivo** de redirección aún se aplica — cuando no existe un objetivo de visión utilizable, la solicitud pasa a describir para que las imágenes sin procesar nunca lleguen a un backend de solo texto (#8430). |

Los modos forzados se cortocircuitan **antes** de que se ejecute la heurística automática; el comportamiento `auto` es idéntico byte a byte a la barrera de seguridad anterior al PR-1.

#### Prompt de descripción sensible a la tarea (`modalityBridgeVisionTaskAware`)

Predeterminado **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) añade el texto del **último mensaje del usuario** (truncado a 500 caracteres) al prompt de descripción base, dirigiendo la descripción hacia lo que el usuario realmente preguntó (patrón codex-vision-proxy) y pidiendo al modelo de visión que transcriba el texto visible. Con la bandera desactivada — o sin texto de usuario — se utiliza el prompt base sin cambios.

La solicitud compatible con OpenAI del propio bucle de descripción (`callVisionModelSingle()` en `visionBridgeHelpers.ts`) siempre solicita `image_url.detail: "high"` — incondicionalmente, para cada llamador/proveedor, sin estar supeditada a ninguna señal del cliente. El muestreo de bajo detalle degrada la precisión del OCR precisamente para la tarea de transcripción de texto que solicita este prompt, por lo que la propia llamada de descripción siempre pide un detalle alto, independientemente del nivel de detalle utilizado en la solicitud entrante original. Esto solo afecta el cuerpo de la solicitud de descripción interna; no cambia cómo OmniRoute reenvía el `image_url.detail` propio del llamador en la solicitud principal — ese valor predeterminado se aplica por separado, y solo para clientes OpenCode detectados, en `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). La rama de formato de cable de Anthropic del bucle de descripción no tiene campo `detail` y no se ve afectada por ninguno de los valores predeterminados.

#### Límite de salida de la descripción (`modalityBridgeVisionMaxChars`)

| Clave                          | Predeterminado | Rango           |
| ------------------------------ | -------------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`            | `0` o 100–50000 |

`0` (predeterminado) significa **sin límite** — la descripción devuelta por `callVisionModel()` se pasa sin modificar, preservando el comportamiento existente. Cualquier valor en el rango de 100 a 50000 trunca la descripción con un sufijo `…` antes de que se reincorpore como `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` en `src/lib/guardrails/visionBridge.ts`). Aumente este valor para tareas de OCR con mucho detalle donde el modelo posterior necesita la transcripción completa; disminúyalo para limitar el uso de tokens en modelos de visión conversacionales. El campo del panel de control se encuentra en el panel Avanzado de la pestaña Visión (`modality-bridge-max-chars` en `ModalityBridgeVisionTab.tsx`) y ajusta cualquier valor entre 1 y 99 al mínimo de 100, dejando un `0` explícito sin tocar — `0` es un valor Zod válido por derecho propio (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), no simplemente el valor predeterminado "no establecido".

#### Caché de descripción (`modalityBridge/bridgeCache.ts`)

Caché LRU + TTL en memoria para las salidas de descripción, compartida en todo el proceso. La clave es `sha256(imageRef + composedPrompt + configuredBridgeModel)` con enmarcado de prefijo de longitud (sin colisiones de límites de campo). El componente del modelo es el modelo de puente **configurado**, no el modelo que realmente respondió — `callVisionModel` puede recurrir internamente, y la clave por intento fragmentaría la caché. Las descripciones fallidas nunca se almacenan en caché. Configuración:

| Clave                           | Predeterminado | Rango   |
| ------------------------------- | -------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`         | —       |
| `modalityBridgeCacheTtlMinutes` | `60`           | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`          | 10–5000 |

#### Normalización de imágenes remotas (bucle de descripción/obtención de base64)

Cuando el puente obtiene una imagen **remota** por sí mismo — la llamada de descripción de Anthropic y la conversión a base64 en formato de cable de Claude (`ensureBase64ImagesForClaudeWire`), ambas a través de `fetchRemoteImageAsDataUri()` en `visionBridgeHelpers.ts` — el URI de datos resultante se pasa a través de `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de ser incrustado en la solicitud del modelo de visión. Las imágenes de gran tamaño se reducen a un **borde largo de 2048px** (coincidiendo con el límite de redimensionamiento que OpenAI/Anthropic ya aplican en el lado del servidor), lo que reduce los bytes/latencia de carga sin cambiar lo que ve el modelo de visión. El redimensionamiento utiliza `sharp`, cargado mediante importación dinámica: en una plataforma donde su binario nativo no se carga, `normalizeDataUri()` **nunca lanza un error** — recurre a una transferencia directa de los bytes originales, por lo que la ruta de descripción/conversión a base64 siempre sigue funcionando. Los bytes que no son de imagen (una obtención que no devolvió una imagen decodificable) también se pasan sin modificar. Esta normalización se limita a las imágenes que el puente obtiene para su propia llamada — nunca se aplica a la carga útil de transferencia directa del llamador, lo que es consistente con el principio de mutación solo por suscripción (Regla Dura #20).

#### Esquema de configuración + migración

Las nuevas claves `modalityBridge*` se validan con Zod en `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, el trío `modalityBridgeCache*` y el grupo `modalityBridgeAudio*` utilizado por el Puente de Audio. La migración `141_modality_bridge_settings.sql` copia los valores `visionBridge*` heredados existentes a las nuevas claves coincidentes (es idempotente, nunca sobrescribe un valor `modalityBridge*` establecido por el operador); las claves heredadas siguen siendo aceptadas como alternativa de lectura durante un ciclo de lanzamiento.

#### Encabezado de transparencia + estadísticas

Las respuestas transformadas por la descripción llevan `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construido por `buildModalityBridgeHeader()` en `modalityBridge/bridgeStats.ts`, sellado por `withModalityBridgeHeader()` en `src/sse/handlers/chatHelpers.ts`). Las solicitudes redirigidas **no** llevan encabezado — la carga útil no fue modificada y el cambio de modelo ya es visible en el campo `model` del cuerpo de la respuesta.

`GET /api/modality-bridge/stats` (autenticación de gestión, mismo nivel que `GET /api/settings`) devuelve los contadores por modalidad en memoria `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` y `video`. `averageLatencyMs` utiliza `latencySamples`, no todos los intentos, como su denominador; una operación sin temporización no fabrica una muestra de cero milisegundos. `bridged` sigue siendo el alias compatible con versiones anteriores para las conversiones exitosas; los intentos fallidos no lo incrementan. Los contadores se reinician al reiniciar el proceso por diseño (telemetría, no contabilidad).

#### Configuración del panel de control

La página dedicada del panel de control es
`/dashboard/settings/modality-bridge`. Sus pestañas `Vision`, `Audio`
y `Video`, direccionables por URL, conservan los parámetros de consulta al cambiar el valor de `tab`.
La pestaña Vision expone la habilitación, el modo, la selección del modelo (incluido el
predeterminado automático), la solicitud de indicaciones sensible a la tarea, los límites avanzados de tiempo de espera/imagen/longitud de descripción/caché, los contadores
de tiempo de ejecución y una solicitud de muestra protegida. La pestaña Audio también está activa: expone
la habilitación, un selector de modelo solo para STT con Auto, límites de tiempo de espera/clip máximo, contadores de audio
y una prueba de muestra `input_audio`. La pestaña Video es funcional: informa
el estado de tiempo de ejecución de FFmpeg/ffprobe — uno de cuatro estados explícitos de la interfaz de usuario (`unknown` mientras
la sonda está en curso o no pudo completarse, `restricted` en un host del panel de control que no es de bucle invertido
donde la sonda se omite del lado del cliente, `unavailable` una vez sondeada
y confirmada como faltante, o `available` con las versiones de FFmpeg/ffprobe) — persiste
la habilitación/modelo/fotograma/video/límites de tiempo de espera, filtra el selector de modelo a modelos
con capacidad de visión y expone los contadores de video.

La antigua tarjeta Vision Bridge bajo la configuración de IA es un enlace de compatibilidad a la
nueva página; ya no posee una segunda copia del formulario. Los proveedores de medios también
enlazan los flujos de trabajo de Imagen a Texto y Voz a Texto con las pestañas correspondientes de Modality
Bridge sin eliminar el entorno de pruebas de Voz a Texto existente.

**Omisión de admisión de bucle interno:** cuando la llamada de descripción se enruta a través del
bucle interno `/v1` de OmniRoute (modelo de proveedor no estándar), la subsolicitud envía
`x-omniroute-admission-bypass: internal` y se autentica con la credencial de bucle interno resuelta
— el centinela local `sk_omniroute` en modo local, o la clave de entorno `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
configurada por el operador (#1350) para que las implementaciones con `REQUIRE_API_KEY=true`
aún puedan ejecutar la llamada de descripción. La omisión solo se respeta para esas credenciales exactas,
por lo que los clientes externos no pueden usar el encabezado para omitir la admisión.

Los valores predeterminados heredados se encuentran en `src/shared/constants/visionBridgeDefaults.ts`; los
nuevos valores predeterminados de modo/sensibles a tareas/caché y el resolvedor de configuraciones se encuentran en
`src/shared/constants/modalityBridgeDefaults.ts`. La barrera de seguridad expone una
opción de constructor `deps` para que las pruebas puedan inyectar implementaciones falsas de `getSettings` y
`callVisionModel`.

### Puente de Audio (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta las solicitudes de chat que contienen audio antes de que lleguen a un destino que no
se sabe que acepte entrada de audio. Nunca redirige la solicitud de chat: las partes de audio se
transcriben a través del punto final multipart existente compatible con OpenAI y el
modelo de chat elegido continúa con las transcripciones de texto.

Flujo:

1.  Resuelve `supportsAudio` a través de `getResolvedModelCapabilities()`. Los metadatos explícitos
    del registro del proveedor tienen prioridad, luego los metadatos estáticos del modelo, luego
    `modalities_input` sincronizados. Una lista de entrada declarada sin `audio` es `false`;
    la ausencia de evidencia de capacidad permanece `null`. Tanto `false` como `null` activan el
    puente conservador, mientras que `true` lo omite.
2.  Resuelve la configuración `modalityBridgeAudio*` y extrae las partes de audio de nivel superior
    que se pueden empalmar de cada mensaje a través del detector compartido `detectMediaParts()`.
    Las formas de cable compatibles son OpenAI `input_audio`, `audio_url` y
    `source.media_type: "audio/*"`. El audio anidado se detecta para el enrutamiento, pero no
    se elimina por la ruta de empalme. El trabajo está limitado por `modalityBridgeAudioMaxClips`;
    las partes posteriores permanecen intactas.
3.  Respeta un `provider/model` configurado, o deja que `selectAudioBridgeModel()` recorra
    `AUDIO_TRANSCRIPTION_PROVIDERS` en orden de catálogo estable y seleccione el primer
    modelo con una credencial de proveedor activa utilizable.
4.  `callAudioTranscription()` convierte audio base64/data-URI en un `file` multipart,
    o descarga una `audio_url` remota a través de la guardia de salida solo pública
    con fijación de DNS y un límite de 25 MB. Luego POSTea el archivo y el modelo seleccionado
    al bucle interno local `/v1/audio/transcriptions`, autenticado con
    `resolveSelfLoopBearer()`. La ruta de transcripción existente realiza la búsqueda normal
    de credenciales, el manejo de enfriamiento/límite de velocidad y el despacho del proveedor.
5.  Las llamadas exitosas reemplazan sus partes con `[Audio N]: <transcript>`. Las llamadas
    se ejecutan con `Promise.allSettled`: un fallo individual preserva esa parte de audio
    original (contrato #4012). Si todas las llamadas fallan y se demuestra que el destino
    `supportsAudio === false`, las partes se convierten en
    `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para
    un destino desconocido (`null`), un resultado de fallo total permanece intacto. Un
    destino probado solo de texto sin credencial STT utilizable recibe el mismo
    stub explícito sin emitir una llamada de red.

Las transcripciones exitosas utilizan la caché LRU/TTL de Modality Bridge a nivel de proceso. La
clave combina la referencia de audio, la etiqueta de operación estable `audio-transcription`
y el modelo STT seleccionado; los fallos nunca se almacenan en caché. Los intentos de audio actualizan
los contadores compartidos `bridged`, `cacheHits`, `failures` y `lastUsedAt`.
Las respuestas transformadas llevan
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; las solicitudes no modificadas no reciben un segmento de Audio Bridge.

La configuración en tiempo de ejecución está respaldada por la base de datos y validada por Zod:

| Clave                         | Predeterminado | Rango            |
| ----------------------------- | -------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`         | —                |
| `modalityBridgeAudioModel`    | `""`           | Auto o ID de STT |
| `modalityBridgeAudioTimeout`  | `60000`        | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`            | 1–10             |

La caché compartida sigue siendo controlada por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` y `modalityBridgeCacheMaxEntries`.

### Puente de Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de video de nivel superior en `messages` de Chat Completions y `input` de Responses API antes de que se llame a un objetivo sin soporte nativo de video conocido.
Las formas admitidas son `input_video`, `video_url`, `video_source`, URLs HTTPS,
y URIs de datos `data:video/*;base64,...`. Los nombres de archivo simples en texto no se tratan
como video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) se encarga del recorrido de la solicitud, la
verificación de capacidad/política, la agregación por solicitud y la carga útil de la respuesta.
El trabajo por video —adquisición, la caché de resultados completos, la descripción de una secuencia de
fotogramas (que fusiona cualquier transcripción de audio declarada por el llamante) y las métricas/aborto/limpieza por intento—
está oculto detrás de `processVideoPart` en
`videoBridgePipeline.ts`, llamado una vez por parte de video dentro del bucle de `preCall`.
Ese módulo también define los límites de puerto explícitos `VideoMediaBrokerPort`
(adquisición de bytes y extracción de fotogramas muestreados), `VideoAudioTranscriptionPort`
(fusión de una transcripción de audio declarada por el llamante con los subtítulos muestreados) y
`VideoDrilldownPort` (el límite de persistencia de la exploración de fotogramas; aún no conectado
a `processVideoPart` — solo la ruta separada `/api/modality-bridge/video/drilldown`
escribe entradas de exploración hoy).

La ruta de solicitud pública `/v1` nunca importa ni invoca un subproceso. Los videos remotos
se descargan con un límite de 50 MiB; los videos base64 en línea tienen un
límite conservador de 36 MiB decodificados por video para que el modelo/mensajes/envoltorio
pueda permanecer dentro del límite de admisión de solicitudes JSON públicas de 50 MiB. La longitud en línea
y las estimaciones de tamaño decodificado se verifican antes de la asignación. Se requiere HTTPS
en la URL remota inicial y en cada redirección, utilizando el guardián de salida
existente solo público con fijación de DNS. Los bytes luego cruzan el límite exacto
interno del broker `POST /api/modality-bridge/video/extract`. Esa ruta es
`LOCAL_ONLY` y `SPAWN_CAPABLE`, acepta solo una solicitud de bucle de confianza autenticada por proceso,
y nunca acepta una URL, ruta de sistema de archivos, ejecutable o lista de argumentos.
La tubería de tamaño de cuerpo de la API y el lector de cuerpo incremental del manejador
aplican independientemente un límite de entrada del broker de 50 MiB. Su cola limitada ejecuta
una extracción a la vez, permite cuatro trabajos pendientes y limita la entrada pendiente a
100 MiB.

Dentro del broker, `ffprobe` lee un archivo local privado; la lista blanca de formato fijo
excluye los formatos de lista de reproducción y manifiesto. Para los contenedores de la familia MOV permitidos,
las referencias de datos MOV externas permanecen deshabilitadas por defecto, y el
comando fijo no las habilita. Tanto `ffprobe` como `ffmpeg` usan la
lista blanca de protocolo solo `file`, un hilo, arreglos de argumentos fijos, sin shell,
y ejecutables resueltos desde `PATH`. Las transmisiones de portada de imágenes adjuntas no
son candidatos reproducibles. Todas las transmisiones reproducibles deben satisfacer los límites, y se prefiere
una transmisión predeterminada explícita antes de la reserva determinista de índice más bajo.
Los videos están limitados a 600 segundos, 8,192 píxeles por dimensión y
33,554,432 píxeles de origen. FFmpeg muestrea 1-16 fotogramas JPEG de punto medio,
escala el borde largo a un máximo de 1,024 píxeles sin escalar entradas más pequeñas, y
nunca recibe una URL. El muestreo es `uniform` por defecto. Las políticas opcionales
`scene_aware` y la experimental `segment_aware` realizan un pase FFmpeg fijo adicional
sobre la transmisión local ya validada, seleccionan marcas de tiempo de escena `showinfo` limitadas,
y recurren determinísticamente a los mismos puntos medios uniformes en caso de falla del detector,
tiempo de espera, salida mal formada o un conjunto de candidatos vacío. El modo consciente del segmento
asigna muestras de punto medio proporcionalmente a los intervalos de escena validados;
la evidencia consciente del segmento y el comportamiento de reserva se detallan a continuación. El límite estricto de 16 fotogramas se
aplica después de la selección en cada política. Cuando una solicitud consciente de la escena tiene solo un
presupuesto de un fotograma, utiliza el punto medio uniforme de la ventana de video completo activa o de enfoque
e informa `policyEffective: uniform`: un solo fotograma de escena seleccionado no puede preservar
ambos extremos temporales. Un llamante puede proporcionar opcionalmente una
ventana de enfoque finita (`start`/`end` segundos); los límites se ajustan a la duración del medio,
las ventanas invertidas o no finitas se rechazan, y todas las políticas de muestreo se realizan
solo dentro del intervalo normalizado. La ventana resultante se incluye en los metadatos de muestreo
y en el prefijo de descripción no confiable para que los modelos posteriores puedan distinguir
un extracto enfocado de la línea de tiempo completa.

El enfoque semántico de los subtítulos es una configuración separada y explícita. El modo de análisis `full`
predeterminado conserva el mensaje de fotogramas existente y nunca reenvía el texto de la solicitud
al modelo de subtítulos. En modo `focused`, el puente lee solo el último
`text`/`input_text` no vacío y de autoría del usuario del mismo contenedor de Chat o Responses,
lo normaliza a NFC, colapsa los caracteres de control y los espacios en blanco,
y lo limita a 500 puntos de código Unicode. Un resultado vacío recurre al mensaje `full` exacto.
Una pista utilizable se serializa como JSON en un bloque dedicado de contexto de usuario no confiable
y solo puede priorizar detalles observables; no puede anular la advertencia separada
contra seguir instrucciones visibles o audibles en el medio. El enfoque textual nunca infiere
`start`/`end` ni cambia el muestreador temporal.

#### FU-07 evidencia de segmento estructural

`segment_aware` utiliza un pase de preanálisis limitado sobre la transmisión de video local ya validada.
La cadena de filtros fija primero escala a un máximo de 320 píxeles de ancho,
detecta cambios de escena e intervalos congelados, luego muestrea a 1 fotograma por segundo
para desenfoque, luma promedio e información espacial/temporal. El pase está
limitado a 600 muestras estructurales, un hilo FFmpeg/filtro, los mismos
protocolos solo `file` y listas blancas de contenedores, un límite de salida de proceso de 1 MiB,
y un máximo de 30 segundos dentro del aborto/plazo compartido del broker. Nunca
acepta un comando, filtro, ruta o URL de la solicitud.

Los valores estructurales son evidencia de muestreo determinista, no comprensión semántica de video. No infieren sujetos, acciones, subtítulos, voz o intención del usuario. Los límites de escena y de congelación forman segmentos; la cobertura de congelación, el desenfoque, la exposición, el detalle espacial y el cambio temporal solo influyen en cómo se asigna el presupuesto existente de 1 a 16 fotogramas. Un segmento completamente congelado está limitado a un fotograma, mientras que los segmentos no congelados compiten por el presupuesto restante. Cuando los límites superan el número de fotogramas, se mantiene una cobertura uniforme de la línea de tiempo para que los cortes rápidos iniciales no puedan ocultar un segmento final largo. Los límites de escena dentro de la resolución de análisis de 1 segundo de un límite de congelación se fusionan.

La falta de filtros, evidencia mal formada/vacía, un error del detector o el tiempo de espera limitado de preanálisis fallan de forma abierta a la política de punto medio uniforme exacto. Una anulación por parte del llamador o un plazo del intermediario no falla de forma abierta: termina el subproceso en curso, evita la extracción posterior de fotogramas y el árbol temporal privado se elimina en `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera accesorios FFmpeg reales deterministas para ahorros en llamadas de subtítulos post-deduplicación, asignación de presupuesto de movimiento denso, evidencia de desenfoque/exposición/SI-TI, cortes rápidos con una cola larga y falsos positivos de desvanecimiento gradual. Registra el tiempo real de preanálisis y, donde `/usr/bin/time` está disponible, la CPU del proceso hijo y el RSS máximo. Sus comprobaciones de calidad son solo oráculos estructurales. La calidad real del modelo de subtítulos permanece en `HOLD` porque este arnés no tiene un punto final autorizado ni un juez fijo. Los ahorros monetarios también permanecen en `HOLD` a menos que `--caption-cost-per-call-usd` proporcione una estimación explícita positiva por llamada; el script nunca fabrica ninguno de los dos resultados.

Cada fotograma está limitado a 4 MiB, todos los fotogramas sin procesar juntos a 23 MiB, y la respuesta serializada del intermediario a 32 MiB. Un directorio temporal privado se elimina en `finally`. OmniRoute no incluye FFmpeg y no acepta una ruta de ejecutable personalizada. Antes de la subtitulación, el puente aplica un paso conservador de deduplicación visual: cada JPEG se reduce a un búfer de escala de grises de 16×16 y se compara solo con el último fotograma retenido. Para un presupuesto de subtítulos solicitado superior a un fotograma, la extracción proporciona un grupo de candidatos limitado de hasta el doble de ese presupuesto y nunca más de 16 fotogramas. El límite solicitado se aplica solo después de la deduplicación, conservando los primeros y últimos candidatos seleccionados durante el adelgazamiento final cuando el presupuesto es de al menos dos. La política versionada `grayscale-16x16-mean-cells-v2` utiliza el mayor entre la delta de luma media y la relación de celdas de miniaturas cuya delta normalizada es de al menos 0.05. El umbral de duplicados es la constante 0.04, elegida por su previsibilidad en lugar de exponerse como una configuración en tiempo de ejecución. Esta señal secundaria de alto contraste preserva pequeños movimientos y cambios de texto visibles que una comparación solo por media puede ocultar. Los errores del comparador o del decodificador fallan de forma abierta y mantienen la cobertura. Los metadatos de salida separan los candidatos extraídos, los fotogramas utilizados con éxito y los duplicados visuales descartados.

Una parte de video marcada explícitamente puede solicitar una hoja de contacto con marcas de tiempo. El puente construye como máximo una cuadrícula JPEG de 4 columnas y 16 fotogramas. Cada celda de 512 píxeles graba su marca de tiempo de origen en una banda inferior de alto contraste, mientras que las mismas marcas de tiempo permanecen en los metadatos textuales para su asociación y auditoría posteriores. El JPEG completo permanece limitado a 32 MiB. Si `sharp` no puede decodificar o componer la cuadrícula, el puente recurre a los fotogramas JPEG individuales; una anulación del cliente aún se propaga a través de la operación de la hoja.

La evidencia de promoción está deliberadamente separada del microbenchmark de composición sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define un arnés A/B con versión de esquema para modelos de visión reales compatibles con OpenAI. Mide los tokens reportados por el proveedor, la latencia de tiempo real de extremo a extremo (incluida la composición de la hoja), el recuento de llamadas al modelo y la retención de hechos definidos en el manifiesto. Las respuestas crudas del modelo no se escriben en el informe; solo se retienen los resúmenes SHA-256 y los ID de hechos coincidentes. El arnés no realiza ninguna llamada de red o a un modelo de pago a menos que se pase `--execute-real` y se configuren `--model`, `OMNIROUTE_BASE_URL` y `OMNIROUTE_API_KEY`. Sin esa ejecución real explícita, su veredicto legible por máquina permanece en `HOLD`; las mediciones sintéticas de carga útil/recuento de llamadas por sí solas no son evidencia de promoción.

Los llamadores pueden adjuntar una matriz opcional `transcript.cues` a una parte de video compatible cuando ya poseen texto alineado. Cada señal debe contener `text`, un intervalo `start`/`end` finito dentro de la duración sondeada, y una `source` en la lista blanca (`client`, `embedded` o `audio-bridge`); `confidence` por defecto es `1` y debe permanecer entre `0` y `1`. Las señales duplicadas exactas se colapsan. OmniRoute nunca inicia la transcripción a partir de estos metadatos: las señales validadas se copian en el resultado descrito con la fuente, la confianza y el intervalo, y se presentan como observaciones no confiables junto con los subtítulos de los fotogramas. El texto inválido, fuera de rango o sin procedencia se rechaza en lugar de mezclarse en el flujo de subtítulos. El campo `source` actualmente es declarado por el llamador, no verificado por el servidor: OmniRoute asegura que el valor sea una de las tres cadenas permitidas, pero aún no confirma criptográficamente que una etiqueta `embedded` o `audio-bridge` provenga realmente de una extracción propiedad del servidor. Trate `source` como una pista no confiable hasta que se implemente esa verificación; no base decisiones de autorización en ella.

Un llamador avanzado puede proporcionar una pista `audioTranscript` ya autorizada para el mismo video. La unión de fusión ejecuta observaciones visuales y de audio bajo un mismo plazo y señal de aborto, las ordena en una línea de tiempo común, colapsa duplicados exactos e informa un resultado parcial cuando solo un lado tiene éxito. Un `audioTranscript` inválido se degrada a ese resultado parcial — se mantiene la descripción visual y la rama de audio registra un código de fallo saneado — en lugar de fallar todo el video. La disponibilidad por rama, el indicador parcial y los códigos de fallo saneados se conservan en el resultado descrito, en los metadatos del guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), en los metadatos de la caché de resultados y en los contadores de fusión del puente. La ruta predeterminada de Video Bridge no invoca la conversión de voz a texto ni descarga una segunda copia de medios; sin esa pista explícita, permanece solo como video.

**Retención de transcripciones (#12150 P1).** Esto se aplica automáticamente cada vez que el Video Bridge (que es opcional) renderiza una señal de transcripción — no hay un indicador de retención separado. Cuando una solicitud renderiza cualquier señal de transcripción (una `transcript` declarada por el llamador o una `audioTranscript` fusionada), el guardrail la marca como `videoBridgeObserved` y produce una sombra redactada de la descripción del video — una renderización idéntica en la que el cuerpo de texto libre de cada señal es reemplazado por `[redacted-video-transcript]`, construido sustituyendo el campo de señal estructurado antes de que se ensamble la cadena (nunca analizando el texto aplanado, por lo que ningún contenido de señal — adverso u ordinario, incluidos los cuerpos que contienen `]` como `[inaudible]`/`[music]` — puede sobrevivir). El cuerpo de la solicitud del registro de llamadas persistido intercambia cada parte de texto derivada del video por esa sombra redactada, coincidiendo por igualdad de contenido; el ancla `fullText` se vuelve a leer de la carga útil del guardrail pre-llamada finalizado, por lo que la coincidencia sigue siendo exitosa después de que los guardrails de cadena posteriores (los enmascaradores de PII y credenciales, prioridades 10/95) reescriban el texto de la descripción en su lugar y después de que la inyección de system-prompt/handoff/memory remodele el array de mensajes. El cuerpo enviado al modelo aguas arriba no se modifica. Una solicitud observada tampoco rellena ninguna Memory duradera (se omite la extracción derivada tanto de la solicitud como de la respuesta), por lo que la propia respuesta del modelo no puede hacer eco del texto de la transcripción en Memory.

Copias retenidas adicionales utilizan la misma señal de solicitud observada. La instantánea de la solicitud del cliente pre-guardrail en bruto, la solicitud pendiente en memoria y el registro de solicitudes rechazadas tempranas reemplazan estructuralmente los campos de transcripción en las partes de video; las indicaciones de cadena sintetizadas por las etapas de la tubería y la transferencia de contexto se redactan en el sumidero del cuerpo de la solicitud persistida. El marcador `video_content_removed` persistido hace que la continuación de `previous_response_id` falle de forma cerrada en lugar de reconstruir texto que fue descartado intencionalmente. Si una solicitud observada pierde su sombra de redacción por parte antes del registro, o incluso una de varias sombras de video no coincide después de mutaciones posteriores de la solicitud, el cuerpo de la solicitud retenida se omite por completo en lugar de retener una transcripción parcialmente redactada.

Para una solicitud observada, una respuesta del modelo podría citar cualquier porción de la transcripción sin un límite de señal estructurado. Su `responseBody` del registro de llamadas persistido es, por lo tanto, reemplazado por un marcador de omisión; el artefacto detallado de la tubería (que puede incluir cuerpos de upstream/cliente y fragmentos de flujo) no se retiene. Las cachés semánticas, de idempotencia y de reproducción de razonamiento omiten las lecturas y escrituras para esa solicitud. La solicitud del proveedor y la respuesta visible para el cliente permanecen sin cambios. Los bytes de keepalive tempranos se drenan del búfer temporal cuando se omite el artefacto detallado. La advertencia de EventStream malformado de Kiro informa solo el recuento de bytes de la carga útil, nunca su contenido o el error bruto del analizador JSON. Esto no afirma que cada diagnóstico de proveedor/plugin no relacionado haya sido auditado; el barrido más amplio de sumideros retenidos se rastrea en #11658.

El ciclo de vida interno de `/api/modality-bridge/video/drilldown` es un sustrato de caché separado, de bucle invertido/autenticado por token. Cada operación también requiere un ID de principal opaco canónico. Antes de que se habilite un llamador de producción, debe derivar ese ID del inquilino autenticado y nunca debe reenviar un valor seleccionado por el cliente. Las claves de caché vinculan ese principal a IDs de sesión y de referencia de video canónicos, almacenan solo sus claves derivadas de SHA-256, y limitan tanto las lecturas como la eliminación al mismo principal. La caché almacena un máximo de 16 fotogramas JPEG derivados por entrada, los expira después de diez minutos y admite lecturas `start`/`end` acotadas o la eliminación explícita de sesiones.

Cada principal está limitado a 16 entradas y 64 MiB de datos JPEG canónicos. Esos límites son independientes del techo global de 64 entradas/256 MiB: la presión de cuota del principal desaloja solo las entradas menos usadas recientemente de ese principal antes de considerar el desalojo global por LRU. Las entradas caducadas se eliminan de la contabilidad tanto principal como global con la actividad de la caché, mientras que la cancelación y el fallo de validación no comprometen un reemplazo parcial.

La caché rechaza Base64 no canónico, relleno excesivo, medios que no son JPEG, JPEGs malformados o truncados, y JPEGs que producen una advertencia durante una decodificación `sharp` acotada de imagen completa. Re-codifica cada imagen aceptada como un JPEG canónico, deriva el ancho y la altura de los bytes decodificados en lugar de confiar en los campos del llamador, y descarta cualquier byte políglota sobrante en lugar de retenerlos. Solo el búfer comprimido canónico acotado se carga a ambas cuotas. El límite de la trama JSON incluye la sobrecarga de Base64 para el techo de entrada decodificada de 32 MiB. Cada derivación almacenada registra su formato/resolución JPEG validado, política de muestreo, versión de derivación, tiempo de creación, hash de contenido calculado por el servidor y referencia de padre hasheada más el hash de contenido de padre del llamador de confianza. La cancelación se verifica entre las fases asíncronas de decodificación/hash antes de la confirmación atómica de la caché.

Esta sección aún no conecta un productor de producción a la ruta y no
proporciona selección de variantes de resolución múltiple. Por lo tanto, la ruta
de solicitud transparente de Video Bridge no incurre en trabajo adicional,
mientras que la derivación principal ligada al inquilino y el ciclo de vida
completo de resolución múltiple FU-08 siguen siendo un trabajo de seguimiento
explícito en lugar de documentarse como un comportamiento completo.

Los fotogramas se subtitulan secuencialmente con el modelo de Video configurado. Un
Video override vacío hereda la configuración de Vision; si ambos están vacíos, el
enrutador automático de Vision selecciona el modelo efectivo con capacidad de visión.
Los subtítulos exitosos reemplazan la parte original con un prefijo estable
`[Video description:` que también marca el texto como una observación no confiable
derivada de medios y les dice a los modelos posteriores que no sigan las
instrucciones encontradas en los medios. Las claves de caché de subtítulos de
fotogramas incluyen los bytes JPEG, el prompt, la marca de tiempo y el modelo
efectivo; solo se almacenan en caché los subtítulos exitosos. Las entradas de
caché retienen el modelo de productor exitoso real, incluido un modelo de
reserva; el puente informa `mixed` cuando diferentes fotogramas fueron
producidos por diferentes modelos. Un acierto de caché reutiliza esa identidad
de productor en lugar de reetiquetarla como el plan de enrutamiento solicitado.
La caché de resultados de video completo se indexa por cada entrada que cambia
la salida — prompt, modelo efectivo, política de muestreo, recuento de fotogramas,
modo de análisis semántico, la huella digital SHA-256 de la sugerencia de
enfoque normalizada, ventana de enfoque, `transcript`, `audioTranscript` y el
indicador de hoja de contacto — por lo que cambiar cualquiera de esas
dimensiones es un fallo de caché, nunca una reutilización obsoleta. La versión
de la política de deduplicación visual, el umbral y el recuento de fotogramas
candidatos acotados también son explícitos en la clave y los metadatos de la
caché de resultados; un cambio de política, por lo tanto, no puede reutilizar
una descripción de video completo obsoleta. Los metadatos de la caché de
resultados v4 mantienen el modo y la huella digital, nunca la tarea de usuario
sin procesar. Los metadatos de la barrera de seguridad informan tanto los modos
de análisis solicitados como los efectivos; un modo `focused` solicitado sin
texto de usuario utilizable se informa como efectivamente `full`.

La barrera de seguridad extrae cada parte de video compatible, pero describe no
más de `modalityBridgeVideoMaxVideos`. Para un objetivo que se ha demostrado
que tiene `supportsVideo === false`, los videos fallidos y los que exceden el
límite se convierten en marcadores de texto seguros explícitos para que no
sobreviva ningún video sin procesar. Cuando la capacidad es desconocida, esas
partes permanecen intactas. Los objetivos con `supportsVideo === true`
eluden el puente. La señal de aborto de la solicitud del cliente se propaga a
través de la descarga, la cola del broker, los subprocesos y las llamadas de
subtítulos; los abortos se detienen entre videos y nunca fallan abriendo a
medios sin procesar.

La configuración de tiempo de ejecución está respaldada por DB y validada por Zod:

| Clave                               | Predeterminado | Rango / comportamiento                                                                                             |
| :---------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`        | Tiempo de ejecución opcional, opt-in                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`       | `full` conserva los subtítulos genéricos; `focused` utiliza un contexto de usuario reciente acotado y no confiable |
| `modalityBridgeVideoModel`          | `""`           | Hereda el modelo de Vision Bridge                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`            | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`    | `uniform`, `scene_aware`, o `segment_aware` proporcional; el fallo del detector recurre a `uniform`                |
| `modalityBridgeVideoMaxVideos`      | `1`            | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`       | 1000–120000 ms                                                                                                     |

Los valores de tiempo de espera de Video persistidos heredados superiores a 120
segundos se ajustan al plazo del broker; las nuevas escrituras de
configuración por encima de ese límite son rechazadas. `GET
/api/modality-bridge/video/runtime` requiere localidad de bucle invertido
sellada y confiable antes de la autenticación o el sondeo en tiempo de
ejecución, luego requiere autenticación de administración. Devuelve solo
`available`, versiones sanitizadas de FFmpeg/ffprobe y una razón fija cuando
el tiempo de ejecución no está disponible. El punto final de extracción
interno no es una API de carga pública: la saturación de la cola devuelve
`503` más `Retry-After`, una desconexión del llamante devuelve `499` y el
plazo fijo del broker devuelve `504`. Las respuestas convertidas añaden
`video->text;model=<visionModel>;parts=<videos>` al encabezado central
`x-omniroute-modality-bridge` sin eliminar los segmentos de Vision o Audio.

### Enmascarador PII (`piiMasker.ts`)

Se ejecuta en **ambas** etapas.

- **`preCall`** clona la carga útil, recorre `system`, `messages`, `input` y
  `prompt` (incluidos los elementos de cadena simple), y aplica
  `processPII()` (de `@/shared/utils/inputSanitizer`) a los campos de
  cadena `content`/`text`. Cuando `PII_REDACTION_ENABLED=true`, la PII
  detectada se redacta en la carga útil saliente. Esto es independiente de
  `INPUT_SANITIZER_MODE` (que solo controla la política de inyección de
  prompts). Cuando la redacción está desactivada, la llamada registra los
  recuentos de detección sin reescribir el contenido.
- **`postCall`** clona profundamente la respuesta, ejecuta
  `sanitizePIIResponse()` más el enmascarador de forma de API de respuestas
  (`maskResponsesOutput` — cubre `output_text` y `output[].content[].text`).
  Si ocurre alguna redacción, la respuesta modificada reemplaza la original.

La barrera de seguridad nunca bloquea; solo anota (`meta.detections`,
`meta.redacted`) o reescribe.

### Inyección de Prompt (`promptInjection.ts`)

Detecta estructuras adversarias en el contenido proporcionado por el usuario y
aplica la política configurada. El comportamiento es impulsado por variables de
entorno y opciones de constructor:

| Configuración     | Variable de entorno                                                                                   | Predeterminado | Efecto                                                                                                                                                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`         | Cuando es `false`, el guardrail se cortocircuita.                                                                                                                                                                                             |
| Modo              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`         | Política de inyección: `block`, `warn` o `log`. (`redact` se acepta por compatibilidad con versiones anteriores, pero **no** elimina el texto de inyección; la solicitud de reescritura de PII se controla mediante `PII_REDACTION_ENABLED`). |
| Umbral de bloqueo | opción `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`         | Severidad mínima requerida para bloquear. "Medium" es solo de observación por defecto.                                                                                                                                                        |

**Precedencia del modo** (`getMode`): `options.mode` del llamador →
**anulación de la bandera de característica de la base de datos** `INJECTION_GUARD_MODE` (Panel de control → Configuración →
Banderas de características) → variable de entorno `INJECTION_GUARD_MODE` → variable de entorno `INPUT_SANITIZER_MODE` →
`warn`. Por lo tanto, una anulación desde el panel de control prevalece sobre las variables de entorno, de modo que la interfaz de usuario de Banderas de características controla el guardrail en ejecución en vivo (sin necesidad de reiniciar). La lectura de la base de datos es a prueba de fallos:
si hay un error, el guardrail vuelve al comportamiento basado en el entorno, y cuando no se establece ninguna anulación, el comportamiento es idéntico a la resolución solo por entorno.

Fuentes de detección:

1.  `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detectores compartidos utilizado en otras partes de la pipeline).
2.  `DEFAULT_GUARD_PATTERNS` incorporados (actualmente `system_override_inline` y
    `markdown_system_block`, ambos de severidad `high`).
3.  `customPatterns` opcionales pasados a través de las opciones del constructor (cadenas, regex,
    o registros `{ name, pattern, severity }`).

Cuando `mode === "block"` **y** al menos una detección cumple el umbral de severidad, `preCall` devuelve `{ block: true, message: "Request rejected:
suspicious content detected" }`. En los modos `warn`/`log`, el guardrail registra, pero permite la llamada. El ayudante compartido `evaluatePromptInjection()` también se exporta para los llamadores que necesitan evaluar prompts sin pasar por el registro.

**Límite de escaneo (v3.8.20):** el detector solo inspecciona los **primeros 16 KB** del texto de prompt unido — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) en
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` como
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de ejecutar
el bucle de patrones. Las directivas de inyección se encuentran cerca del principio de una entrada, por lo que esto limita el uso de CPU/GC de regex en cargas útiles de cientos de KB sin debilitar la detección (cf.
#3932, #4041).

### Enmascarador de Credenciales (`credentialMasker.ts`)

Se ejecuta en **ambas** etapas, el último en la cadena predeterminada (prioridad `95`). Redacta patrones conocidos de claves API / tokens secretos de la carga útil saliente (contenido del mensaje, argumentos de llamadas a herramientas, resultados de herramientas) **y** la respuesta del proveedor, de modo que una credencial pegada en un prompt (o devuelta por el resultado de una herramienta) no se filtre al proveedor ascendente ni al cliente.

- **Solo con activación explícita**, misma convención que la redacción de PII (Regla Dura #20-adyacente): deshabilitado a menos que `settings.credentialRedactionEnabled === true` **o**
  `CREDENTIAL_REDACTION_ENABLED=true`. Si está desactivado, el guardrail no hace nada —
  nunca bloquea y nunca reescribe.
- `redactCredentials()` recorre el árbol completo de carga útil/respuesta (`walkValue()`, seguro contra la contaminación de prototipos, seguro contra ciclos mediante `WeakSet`) y reemplaza las coincidencias con un marcador de posición `[REDACTED:<type>]`, clonando solo las ramas que realmente cambiaron.
- `CREDENTIAL_PATTERNS` cubre claves de proveedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), claves de pago (Stripe, Square),
  claves de nube (clave de acceso de AWS, Twilio, SendGrid, Mailgun), claves privadas / JWTs,
  cadenas de conexión que contienen credenciales (`mongodb://user:pass@...`, etc.), y un patrón genérico de valor de encabezado `Authorization`/`x-api-key`/`api-key`/`apikey`. Las claves con forma de encabezado (`authorization`, `x-api-key`, `api-key`, `apikey`) se redactan estructuralmente (solo el valor, el prefijo del esquema como `Bearer `/`Basic ` se conserva) en lugar de mediante la regex de texto genérica.
- El guardrail nunca bloquea; solo reescribe (`modifiedPayload` /
  `modifiedResponse`) y anota (`meta.credentialsRedacted`, `meta.count`).

Protección de regresión: `tests/unit/credential-masker-guardrail.test.ts`.

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
