# Providers — Claude Web (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` envía solicitudes de chat con formato de OpenAI mediante una sesión autenticada del navegador de `claude.ai`. El ejecutor normaliza la cookie proporcionada, resuelve una organización autenticada, prepara el estado de la conversación, selecciona un transporte directo o mediante navegador y traduce estrictamente la respuesta SSE del servidor de origen. La orquestación se encuentra en `open-sse/executors/claude-web.ts:320`.

> **¿Es la primera vez que usa proveedores de cookies web?**
>
> Lea **`docs/getting-started/WEB-COOKIE-GUIDE.md`** para conocer el proceso general de configuración, las indicaciones de autenticación, las limitaciones y la resolución de problemas antes de seguir esta guía específica del proveedor.

### Catálogo de modelos

Actualmente, el registro de proveedores expone exactamente estos siete ID de modelo estáticos (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID del modelo               | Nombre para mostrar     |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

El descubrimiento dinámico de modelos no está implementado para este proveedor. La lista anterior constituye el catálogo en tiempo de ejecución.

### Credenciales y resolución de la organización

Proporcione el encabezado Cookie completo de `claude.ai` o un valor de sesión sin formato. Los valores sin formato se normalizan a `sessionKey`; las demás cookies se conservan si se proporcionan. El ejecutor acepta la cookie mediante `cookie` o `apiKey` y lee los valores opcionales `deviceId` y `orgId` de los datos de conexión (`open-sse/executors/claude-web.ts:72`).

Si `orgId` no está presente, el ejecutor llama a `GET https://claude.ai/api/organizations` y utiliza la primera organización devuelta por la sesión autenticada de Claude Web (`open-sse/executors/claude-web.ts:141`). Falla de forma segura cuando no se devuelve ninguna organización válida, informa como 401 cuando se rechaza la autorización de la sesión y distingue un desafío de Cloudflare de un fallo de autenticación.

### Operaciones de conversación

El objeto opcional de nivel superior `claude_web` es estricto. Los campos desconocidos se rechazan. Sus campos aceptados se definen en `open-sse/executors/claude-web/session.ts:50`:

| Campo                 | Significado                                                                      |
| --------------------- | -------------------------------------------------------------------------------- |
| `operation`           | `completion` de forma predeterminada; use `retry` para reintentar un turno       |
| `conversation_id`     | UUID explícito de una conversación existente                                     |
| `parent_message_uuid` | UUID explícito del mensaje del asistente principal                               |
| `timezone`            | Nombre válido de zona horaria IANA                                               |
| `locale`              | Configuración regional estructuralmente válida                                   |
| `tool_states`         | Matriz opcional de estados de herramientas de la cuenta, limitada a 128 entradas |

Las solicitudes preparadas utilizan uno de dos endpoints del servidor de origen (`open-sse/executors/claude-web.ts:203`):

- Un turno nuevo o de seguimiento envía una solicitud a
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Un reintento envía una solicitud a
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Un turno nuevo incluye `create_conversation_params`. Un seguimiento almacenado en caché o vinculado explícitamente incluye `parent_message_uuid` y omite `create_conversation_params`. El reintento requiere tanto el estado de la conversación como el del mensaje principal y no envía ninguna instrucción (`open-sse/executors/claude-web/session.ts:254`). Las conversaciones nuevas abren la interfaz de usuario autenticada en `/new`; los seguimientos almacenados en caché o vinculados explícitamente abren la página exacta de la conversación (`open-sse/executors/claude-web/session.ts:324`).

El estado de la conversación es una caché en memoria cuya clave se basa en un ámbito de cuenta SHA-256 y en la transcripción canónica del solicitante. Las entradas caducan después de 30 minutos y la caché tiene un límite de 5.000 entradas (`open-sse/executors/claude-web/session.ts:12`). El estado solo se confirma después de que el analizador estricto del flujo observa `message_stop`; los reinicios del proceso lo descartan. Si no se encuentra una entrada en la caché, una solicitud con varios mensajes se serializa en una única instrucción de recuperación en lugar de descartar silenciosamente los mensajes anteriores.

La configuración regional y la zona horaria usan este orden de precedencia: valor de `claude_web` de la solicitud, valor de la conexión, valor del entorno de ejecución y, por último, `en-US` para la configuración regional o `UTC` para la zona horaria (`open-sse/executors/claude-web/session.ts:218`).

### Herramientas y cargas útiles de solicitudes

Las solicitudes directas transforman únicamente las herramientas de función de OpenAI estructuralmente válidas proporcionadas por el solicitante. No existe ninguna lista estática predeterminada de herramientas generada artificialmente (`open-sse/executors/claude-web/payload.ts:102`).

En cambio, las solicitudes mediante navegador capturan la solicitud de la interfaz de usuario autenticada y conservan las herramientas de la cuenta, los estados de las herramientas y los estilos personalizados. Los campos preparados de conversación, modelo, razonamiento, instrucción y UUID de mensaje siguen teniendo prioridad sobre la solicitud capturada (`open-sse/executors/claude-web/browserTransport.ts:175`). Las plantillas del navegador se delimitan mediante un hash de la cuenta, la organización, la cookie, la configuración regional y la zona horaria, y caducan después de 30 minutos (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Cuando una solicitud directa no contiene herramientas del solicitante, puede reutilizar esa plantilla delimitada; las herramientas explícitas del solicitante tienen prioridad (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Selección del transporte

La ruta predeterminada es `sendClaudeWebDirect()`, que llama a `tlsFetchClaude()` con el perfil configurado de Chrome 146 y la cookie proporcionada (`open-sse/services/claudeTlsClient.ts:23`). No inicia un solucionador ni genera una cookie de reemplazo.

Establece `WEB_COOKIE_USE_BROWSER` en `1`, `true` u `on` para que el adaptador de navegador
con ámbito de cuenta sea el transporte principal. Establece `OMNIROUTE_BROWSER_POOL` en uno de
esos mismos valores para permitir que un desafío 403 reconocido de Cloudflare cambie del
transporte directo al adaptador de navegador (`open-sse/executors/claude-web.ts:195`). Otros
errores HTTP no activan ese mecanismo alternativo.

El adaptador de navegador mantiene las cookies dentro del mismo contexto agrupado de Playwright,
utiliza la clave hash con ámbito descrita anteriormente y envía la finalización desde ese contexto
(`open-sse/executors/claude-web/browserTransport.ts:444`). Nunca exporta una cookie resuelta por
el navegador al cliente TLS directo. Los reintentos del navegador requieren una plantilla de
interfaz de usuario no caducada vinculada al mismo contexto real de Playwright
(`open-sse/executors/claude-web/browserTransport.ts:467`). Las lecturas de respuestas del
navegador se ejecutan de forma incremental en la página autenticada, respetan la cancelación de
la solicitud y cancelan el cuerpo ascendente en cuanto supera los 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

El ejecutor devuelve una proyección de auditoría censurada al registrador de solicitudes compartido:
se excluyen los UUID de organización, conversación y mensaje, el texto del prompt, las definiciones
de herramientas, las cookies y los identificadores de dispositivo
(`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Las excepciones de transporte también devuelven un error
genérico de conexión en lugar del mensaje de la excepción lanzada.

### Comportamiento de SSE

`createClaudeWebResponse()` gestiona el enmarcado LF o CRLF y los campos `data:` multilínea. Asigna
los deltas de texto a `content`, los deltas de razonamiento a `reasoning_content` y los eventos de
metadatos conocidos a la extensión de respuesta `claude_web`. Cada evento de metadatos se proyecta
a través de su propia lista de campos permitidos (`open-sse/executors/claude-web/stream.ts:37`). Los
metadatos de conversación, mensaje principal, mensaje del asistente y operación también se devuelven
en las cabeceras `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

El analizador falla de forma segura ante JSON con formato incorrecto, eventos `error` ascendentes,
tipos de eventos desconocidos, orden no válido, discrepancias entre bloques de contenido o EOF antes
de `message_stop`. La salida en streaming emite un fragmento de finalización y un `[DONE]`; la salida
almacenada en búfer utiliza el mismo analizador. El analizador considera `message_stop` como terminal
de inmediato, cancela los datos ascendentes posteriores y propaga la cancelación descendente al lector
ascendente (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Las líneas SSE sin terminar y los eventos acumulados
están limitados a 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Archivos

| Archivo                                                  | Propósito                                   |
| -------------------------------------------------------- | ------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registro estático de modelos                |
| `open-sse/executors/claude-web.ts`                       | Orquestación del ejecutor                   |
| `open-sse/executors/claude-web/payload.ts`               | Transformación de payload y herramientas    |
| `open-sse/executors/claude-web/session.ts`               | Estado del turno y caché de transcripción   |
| `open-sse/executors/claude-web/transport.ts`             | Adaptador de transporte directo             |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adaptador de navegador con ámbito de cuenta |
| `open-sse/executors/claude-web/stream.ts`                | Traducción SSE estricta                     |
| `open-sse/services/claudeTlsClient.ts`                   | Transporte TLS nativo                       |
| `open-sse/services/browserPool.ts`                       | Contextos agrupados de Playwright           |

### Pruebas

Ejecuta la suite determinista de Claude Web sin credenciales reales:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Los casos que dependen de Playwright en `tests/unit/claude-web-auto-refresh.test.ts` se omiten
explícitamente. Actualmente, este repositorio no define un script de pruebas en vivo de Claude Web
con credenciales, por lo que esos casos omitidos no constituyen una prueba de funcionamiento en
tiempo de ejecución.

### Configuración

1. Inicia OmniRoute con `npm run dev` o desde una instalación compilada.
2. Abre Dashboard → Providers → Add Provider.
3. Selecciona la categoría Web Cookie y Claude Web.
4. Pega la cabecera Cookie completa copiada de una solicitud autenticada a `claude.ai`.
