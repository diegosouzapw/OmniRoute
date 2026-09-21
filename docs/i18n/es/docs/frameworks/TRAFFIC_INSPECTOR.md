# Traffic Inspector (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector es el depurador de tráfico HTTPS integrado de OmniRoute, una herramienta similar a Charles Proxy / mitmweb / HTTP Toolkit que es **consciente de los LLM** y **consciente de los agentes**. Se encuentra en `/dashboard/tools/traffic-inspector` y recibe tráfico en vivo de hasta 5 fuentes de captura simultáneas.

**Ubicación en el panel:** `/dashboard/tools/traffic-inspector`
**Grupo de la barra lateral:** Herramientas (después de AgentBridge)
**Véase también:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge es el modo de captura 1.

---

## §1 Descripción general

### Qué hace que Traffic Inspector sea único

| Funcionalidad                                                                                     | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
| ------------------------------------------------------------------------------------------------- | :-----: | :-----: | :-----: | :-----------------------------: |
| Basado en la web                                                                                  |    ✓    |    ✗    |    ✗    |                ✓                |
| De código abierto                                                                                 |    ✓    |    ✗    | parcial |                ✓                |
| **Consciente de los agentes** (sabe si la solicitud proviene de Antigravity/Copilot/etc.)         |    ✗    |    ✗    |    ✗    |                ✓                |
| **Consciente de los LLM** (analiza el formato, los tokens y el modelo de OpenAI/Anthropic/Gemini) |    ✗    |    ✗    |    ✗    |                ✓                |
| **Mapeo de modelos visible** (gemini-3-flash → claude-sonnet-4.7)                                 |    ✗    |    ✗    |    ✗    |                ✓                |
| **Desglose de latencia de proxy/servidor ascendente**                                             | parcial |    ✗    |    ✗    |                ✓                |
| **Integrado con el enrutamiento, la conmutación por error y los costes de OmniRoute**             |    ✗    |    ✗    |    ✗    |                ✓                |
| **Depuración del proxy en todo el sistema** (cualquier aplicación del equipo)                     |    ✓    |    ✓    |    ✓    |                ✓                |
| **Captura de hosts personalizados** (redirección DNS por host)                                    |    ✓    |    ✓    |    ✓    |                ✓                |
| **Modo de variable de entorno HTTP_PROXY**                                                        |    ✓    |    ✓    |    ✓    |                ✓                |
| **Vista de conversación** (burbujas de múltiples turnos, tool_use/tool_result)                    |    ✗    |    ✗    |    ✗    |                ✓                |
| **Combinador de flujos SSE** (reconstrucción a partir de eventos delta)                           |    ✗    |    ✗    |    ✗    |                ✓                |
| **Grabación de sesiones** (con nombre, exportable como .har/.jsonl)                               |    ✗    |    ✓    |    ✓    |                ✓                |

### Arquitectura en un párrafo

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) es un búfer circular compartido en memoria (1000 entradas de forma predeterminada, configurable mediante `INSPECTOR_BUFFER_SIZE`). Todas las fuentes de captura escriben en él mediante `push()`. El búfer clasifica cada entrada mediante `kindDetector.ts` (determina si se trata de una solicitud a un LLM), calcula una `contextKey` (huella SHA-256 del prompt del sistema) y la difunde a todos los suscriptores de WebSocket mediante `globalTrafficBuffer.subscribe()`. El panel se conecta mediante `GET /api/tools/traffic-inspector/ws` y recibe una instantánea al conectarse, seguida de eventos `new`/`update`/`clear`.

---

## §2 Modos de captura

Traffic Inspector admite **5 fuentes de captura simultáneas**. Cada una puede activarse o desactivarse de forma independiente. El campo `source` de cada `InterceptedRequest` (`src/mitm/inspector/types.ts`) es uno de `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` o `"tproxy"`.

### Modo 1 — AgentBridge (predeterminado, siempre activo)

**Fuente:** Controladores de AgentBridge (`src/mitm/handlers/base.ts`)
**Mecanismo:** Cada llamada a `intercept()` en `MitmHandlerBase` llama a `hookBufferStart()` antes de reenviar y a `hookBufferUpdate()` al finalizar. No requiere configuración adicional: funciona en cuanto AgentBridge está en ejecución.
**Alcance:** Los 9 agentes de IDE configurados en AgentBridge
**Nota:** Campo `source` en `InterceptedRequest` = `"agent-bridge"`

### Modo 2 — Hosts personalizados (redirección DNS)

**Fuente:** Lista de hosts definida por el usuario (tabla `inspector_custom_hosts`)
**Mecanismo:** Añadir un host mediante la interfaz agrega `127.0.0.1 <host>` a `/etc/hosts` (requiere sudo). El servidor MITM de AgentBridge existente (puerto 443) genera dinámicamente un certificado SNI para el nuevo host.
**Alcance:** Cualquier aplicación que utilice el host añadido; no se requiere ningún cambio en la configuración de la aplicación
**Nota:** `source` = `"custom-host"`

Ejemplos de casos de uso:

- Supervisar `api.openai.com` desde scripts de Python
- Depurar `my-internal-llm.company.com`
- Capturar tráfico de dispositivos móviles en la misma red (mediante suplantación ARP; uso avanzado)

### Modo 3 — Listener HTTP_PROXY (puerto 8080)

**Fuente:** Aplicaciones que utilizan las variables de entorno `HTTP_PROXY`/`HTTPS_PROXY`
**Mecanismo:** Listener secundario en el puerto 8080 (`src/mitm/inspector/httpProxyServer.ts`) que actúa como un proxy HTTP/HTTPS explícito estándar. Acepta túneles `CONNECT` (HTTPS) y solicitudes HTTP directas.
**Alcance:** Cualquier aplicación que respete la variable de entorno `HTTP_PROXY`; sin cambios de DNS ni sudo
**Nota:** `source` = `"http-proxy"`

```bash
# Captura rápida para un solo comando:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Captura persistente en una sesión de shell:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**Limitación de TLS:** Los túneles HTTPS `CONNECT` se capturan únicamente como metadatos (host, puerto y temporización); el cuerpo TLS no se descifra de forma predeterminada. Active la opción «Descifrar HTTPS en modo proxy» (opcional; requiere que el certificado de AgentBridge sea de confianza) para inspeccionar el cuerpo completo.

**Conflicto de puertos:** Si el puerto 8080 está en uso, AgentBridge devuelve un error 409 estructurado. Cambie el puerto mediante la variable de entorno `INSPECTOR_HTTP_PROXY_PORT`.

### Modo 4 — Proxy para todo el sistema (avanzado, opcional)

**Fuente:** Configuración de proxy del sistema operativo (se aplica a todas las aplicaciones del equipo)
**Mecanismo:** Utiliza las API del sistema operativo para redirigir todo el tráfico HTTP/HTTPS a través del listener HTTP_PROXY:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Alcance:** Todas las aplicaciones del equipo que respeten la configuración de proxy del sistema
  **Nota:** `source` = `"system-proxy"`

**Mecanismos de seguridad:**

- Temporizador de desactivación automática (30 min de forma predeterminada, configurable mediante `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- El estado anterior del proxy del sistema se guarda en la base de datos y se restaura al revertir
- El panel muestra el aviso «Revirtiendo el proxy del sistema» si el usuario abandona la página mientras está activo
- La interfaz muestra la insignia `⚠ Avanzado` y una casilla de confirmación explícita

### Modo 5 — Descifrado transparente mediante TPROXY (Linux, root, opcional)

**Fuente:** TPROXY del kernel + enrutamiento basado en políticas (`src/mitm/tproxy/`)
**Mecanismo:** Marca las nuevas conexiones TCP locales salientes hacia un puerto de destino (de forma predeterminada, `443`) en `mangle OUTPUT`; una regla `ip rule` redirige los paquetes marcados hacia la entrega local, y el destino `TPROXY` de `mangle PREROUTING` los entrega a un listener transparente (**IP_TRANSPARENT**) (puerto predeterminado `8443`). El listener finaliza TLS con un certificado de entidad final emitido **bajo demanda para cada nombre de host SNI** por una CA dinámica, captura el intercambio descifrado y reenvía la solicitud, cifrada de nuevo, al destino original.
**Alcance:** Hosts de destino **arbitrarios** en el puerto objetivo; sin suplantación mediante `/etc/hosts`, sin variable de entorno `HTTP_PROXY` y sin modificar el proxy de todo el sistema. El proceso interceptado no requiere cambios de configuración, pero debe confiar en la CA dinámica.
**Nota:** `source` = `"tproxy"`

**Requisitos:** Solo Linux (**IP_TRANSPARENT** es exclusivo de Linux), la capacidad **CAP_NET_ADMIN** (root) y un complemento N-API nativo que debe compilarse con una cadena de herramientas de C (`npm run build:native:tproxy`). Cuando no está disponible, el control del panel se desactiva y muestra la información emergente «El descifrado TPROXY requiere Linux + root + el complemento nativo». Las reglas del cortafuegos se aplican y revierten de forma transaccional (un bloqueo nunca deja una regla `mangle` residual) y se eliminan al reiniciar. Un mecanismo antibucles basado en SO_MARK evita que el reenvío cifrado de nuevo por el propio proxy vuelva a ser interceptado.

Este es un subsistema considerable con su propia guía específica para operadores; consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; no se compila en `/docs`) para obtener la configuración completa del cortafuegos, la CA dinámica por SNI y el instalador del almacén de confianza, la ruta exclusivamente local, los detalles del mecanismo antibucles y el esquema de configuración. El control se gestiona mediante `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (nota: la ruta se encuentra bajo el prefijo de AgentBridge, no bajo el prefijo de Traffic Inspector).

### Comparación de los modos de captura

| Modo                    | Configuración                                   |            ¿Sudo?             | Alcance                                | Notas                                                                                                                                            |
| ----------------------- | ----------------------------------------------- | :---------------------------: | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. AgentBridge          | Automática                                      |  Una vez (certificado+hosts)  | 9 agentes de IDE                       | Activado de forma predeterminada                                                                                                                 |
| 2. Hosts personalizados | Entrada por host                                |      Sí (archivo hosts)       | Cualquier aplicación que use ese host  | Persistido en la base de datos                                                                                                                   |
| 3. HTTP_PROXY           | `export HTTPS_PROXY=...`                        |              No               | Aplicaciones que respeten el entorno   | Puerto 8080, sin descifrado TLS de forma predeterminada                                                                                          |
| 4. En todo el sistema   | Activar/desactivar + confirmar                  |              Sí               | Todas las aplicaciones del equipo      | Se desactiva automáticamente en 30 min                                                                                                           |
| 5. Descifrado TPROXY    | Activar/desactivar (Linux + complemento nativo) | Sí (root + instalación de CA) | Cualquier host en el puerto de destino | Descifra hosts arbitrarios; desactivado de forma predeterminada — consulta `docs/security/MITM-TPROXY-DECRYPT.md` (git; no compilado en `/docs`) |

---

## §3 Interfaz de usuario

### 3.1 Diseño

```
┌─ Inspector de tráfico ─────────────────────────────────────────────────┐
│ ┌─ Barra de herramientas de fuentes de captura ────────────────────┐   │
│ │ [✓ AgentBridge] [✓ Hosts personalizados (3)] [○ HTTP_PROXY] [○ Sistema]│
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Barra de filtros/controles ─────────────────────────────────────┐   │
│ │ Perfil: (●) Solo LLM  (○) Personalizado  (○) Todo                 │   │
│ │ [⎉ Pausar] [🗑 Limpiar] [⬇ .har] [● GRABAR sesión] ● en vivo 482/1k│
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ LISTA DE SOLICITUDES (ajustable) ║ PANEL DE DETALLES                   ▲ │
│ ────────────────────────────── │ ║ [Conversación][Encabezados][Solicitud]│
│ ▎ 14:32 POST 200 12k AG openai ║ [Respuesta][Tiempos][LLM][Estadísticas]│
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 personalizado║                                 │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Lista de solicitudes (panel izquierdo)

- **Virtualizada** (`useVirtualList` + `ResizeObserver`): gestiona 1000 elementos sin bloquearse
- **Desplazamiento automático** con un control para pausarlo durante la inspección
- **Estado codificado por colores**: verde (2xx), amarillo (3xx), rojo (4xx/5xx), gris (en curso)
- **Emoji del agente**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 host personalizado
- **Barra de color de contexto**: borde izquierdo de 1px coloreado según `contextKey` (SHA-256 del prompt del sistema), que agrupa visualmente las conversaciones relacionadas
- **Cuerpo con carga diferida**: solo el cuerpo de la solicitud seleccionada se materializa en las pestañas de detalles (evita renderizar 1000 cuerpos de 1 MB cada uno)

### 3.3 Panel de detalles — 7 pestañas

| Pestaña             | Contenido                                                                                                        | Notas                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Conversación**    | Burbujas de chat de múltiples turnos (sistema/usuario/asistente + tool_use/tool_result)                          | Normalizadas desde el formato de cualquier proveedor; solo se muestran si `detectedKind === "llm"`                        |
| **Encabezados**     | Tablas de encabezados de solicitud y respuesta                                                                   | Los encabezados sensibles (Authorization, Cookie, api-key) se ocultan de forma predeterminada; control «Mostrar secretos» |
| **Solicitud**       | Cuerpo sin procesar, vista de árbol JSON, insignia del campo de modelo                                           | JSON con formato legible o texto sin procesar                                                                             |
| **Respuesta**       | Cuerpo sin procesar o lista de eventos SSE; control «Sin procesar ↔ Combinado»                                   | El combinador SSE reconstruye el mensaje final a partir de eventos delta                                                  |
| **Tiempos**         | Cascada: sobrecarga del proxy frente a latencia del servidor ascendente                                          | Total, TTFB y tamaño                                                                                                      |
| **Detalles de LLM** | Proveedor, modelo, número de mensajes, tokens de entrada/salida, coste estimado, destino asignado                | Solo se muestran para solicitudes LLM                                                                                     |
| **Estadísticas**    | Recharts: cronología de latencia, gráfico de barras de tokens, diagrama de dispersión de llamadas a herramientas | Solo se muestran cuando se carga una sesión grabada                                                                       |

### 3.4 Controles de la barra de herramientas

| Control            | Acción                                                                             |
| ------------------ | ---------------------------------------------------------------------------------- |
| ⎉ Pausar           | Detiene el renderizado de nuevas solicitudes; se acumula una insignia «X nuevas»   |
| 🗑 Limpiar          | Borra la lista de la interfaz de usuario (el búfer del servidor no se ve afectado) |
| ⬇ Exportar .har    | Descarga la lista filtrada actual como archivo HAR                                 |
| ● Grabar sesión    | Inicia una sesión de grabación con nombre                                          |
| Selector de perfil | Solo LLM / Hosts personalizados / Todo                                             |
| Filtro de host     | Coincidencia de subcadena en el campo `host`                                       |
| Filtro de agente   | Menú desplegable: Todos / por agente                                               |
| Filtro de estado   | Todos / 2xx / 3xx / 4xx / 5xx / error                                              |
| Filtro de fuente   | Todas / agent-bridge / custom-host / http-proxy / system-proxy / tproxy            |
| Filtro **En vivo** | Muestra solo las solicitudes en curso (abiertas): control `liveOnly` (véase §4.6)  |

### 3.5 Paneles redimensionables

- La lista y el panel de detalles están separados por un controlador de arrastre
- Ancho de la lista: mínimo de 280px, máximo de 720px, conservado en `localStorage` (`inspector.listWidth`)
- Se puede contraer a una barra de 48px (solo iconos); al hacer clic en una fila de la barra, se expande

---

## §4 Funcionalidades compatibles con LLM

### 4.1 Detector de tipo (`src/mitm/inspector/kindDetector.ts`)

Clasifica cada solicitud como `"llm"`, `"app"` o `"unknown"` mediante 4 señales:

1. **Registro de hosts** — aproximadamente 18 nombres de host conocidos de API de LLM (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot, etc.)
2. **Patrones de rutas** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses`, etc.
3. **Estructura del cuerpo** — detecta los campos `messages[]` (OpenAI/Claude), `contents[]` (Gemini), `prompt` e `input`
4. **Indicios del agente de usuario** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` en la cadena UA

Los hosts personalizados añadidos mediante el Modo 2 heredan su `kind` de la entrada del formulario (de forma predeterminada, `"custom"`).

### 4.2 Combinador de SSE (`src/mitm/inspector/sseMerger.ts`)

**Implementación independiente de sala limpia.** El análisis de eventos sigue el
[algoritmo de eventos enviados por el servidor de WHATWG](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream),
mientras que la reconstrucción sigue los esquemas públicos de streaming de
[OpenAI](https://platform.openai.com/docs/api-reference/chat/create),
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) y
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent).

Reconstruye el mensaje final del asistente a partir de los eventos delta SSE sin procesar:

- **Anthropic**: acumula `content_block_delta` por índice; procesa `text_delta`, `input_json_delta` (llamadas a herramientas) y `thinking_delta`
- **OpenAI**: acumula las opciones y llamadas a herramientas de Chat Completions, así como los elementos de salida de la Responses API,
  por índice
- **Gemini**: acumula `candidates[i].content.parts`
- **Desconocido**: devuelve los eventos sin procesar tal cual

La pestaña Response muestra un selector: **"Eventos sin procesar ↔ Combinados"**.

### 4.3 Normalizador de conversaciones (`src/mitm/inspector/conversationNormalizer.ts`)

**Implementación independiente de sala limpia.** La normalización se define mediante contratos locales
de caja negra y los esquemas públicos de mensajes de OpenAI, Anthropic y Gemini; no se utiliza
código fuente de implementaciones de terceros.

Convierte los formatos de mensajes de OpenAI, Anthropic y Gemini en un único `NormalizedConversation` antes de la representación:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // mensajes, contenidos o prompt del cuerpo de la solicitud
  response: NormalizedTurn[]; // respuesta del asistente (combinada mediante sseMerger)
  contextKey: string | null; // huella SHA-256 del prompt del sistema
}
```

Tipos de bloque: `text`, `tool_use`, `tool_result`. La pestaña Conversation utiliza esta estructura independientemente del proveedor.

### 4.4 Colorización de la clave de contexto (`src/mitm/inspector/contextKey.ts`)

- Calcula el `SHA-256` del prompt del sistema (el primer mensaje `role:system`, el campo `system` o `systemInstruction` de Gemini)
- Devuelve un prefijo hexadecimal de 12 caracteres (`"a3f9c2..."`)
- El frontend asigna la clave a un color HSL determinista para la barra del borde izquierdo
- **Filtro "mismo contexto"**: al hacer clic en la etiqueta `ctx #a3f`, se añade un filtro que muestra únicamente las solicitudes con la misma huella

Esto facilita distinguir visualmente diferentes «personas» o tareas que se ejecutan en la misma sesión del agente.

### 4.5 Extracción de metadatos de LLM

Para las solicitudes de LLM, la pestaña LLM Details extrae:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // del cuerpo de la solicitud o de la respuesta
  messages: number; // número de turnos
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true si la respuesta es SSE
  mappedTo: string | null; // cabecera x-omniroute-mapped
  costEstimateUsd: number | null; // coste estimado según los precios de OmniRoute
}
```

### 4.6 Filtro en directo de solicitudes en curso

El campo `status` de la solicitud es `number | "in-flight" | "error"`: se añade una entrada
como `"in-flight"` en el momento en que comienza la solicitud y se **actualiza en el mismo lugar**
cuando llega la respuesta (o el error). El selector **"En directo"** de la barra de herramientas
(`liveOnly`, clave de i18n `trafficInspector.liveOnly`) restringe la lista a las entradas
cuyo `status === "in-flight"`, lo que permite observar las conexiones abiertas en tiempo real.

El filtro es un predicado puro del lado del cliente ubicado en
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

El estado del selector reside en `useTrafficFilters` (los hooks del panel del inspector) y
se combina con los demás filtros (perfil, host, agente, origen, estado y contexto).

### 4.7 Atribución de procesos (Linux)

En Linux, cada solicitud interceptada puede atribuirse al **proceso local de
origen**. Se añaden dos campos opcionales a `InterceptedRequest`:

```ts
pid?: number;          // id del proceso de origen (solo Linux)
processName?: string;  // nombre del proceso de origen (solo Linux)
```

`src/mitm/inspector/processAttribution.ts` asigna el puerto efímero del _cliente_
de la conexión a un PID y un nombre mediante los siguientes pasos:

1. Lee `/proc/net/tcp` y `/proc/net/tcp6` para encontrar el inodo del socket correspondiente al
   puerto (`parseProcNetTcpForInode`, un analizador puro que puede probarse con fixtures).
2. Examina `/proc/<pid>/fd/` en busca de un enlace simbólico a `socket:[<inode>]`.
3. Lee el nombre del proceso desde `/proc/<pid>/comm`.

Una caché con un TTL de 1 segundo limita el coste del análisis de procfs bajo carga. La atribución se realiza
**con el mejor esfuerzo posible**: cualquier fallo devuelve `null` y nunca bloquea la captura. En
macOS/Windows, la función devuelve `null` (stub; la compatibilidad con `lsof`/`GetExtendedTcpTable`
se añadirá posteriormente).

---

## §5 Sesiones

### 5.1 Grabar una sesión

1. Haz clic en **"● Grabar sesión"** en la barra de herramientas → introduce un nombre (opcional)
2. El seguimiento en tiempo real continúa con normalidad; un indicador rojo pulsante muestra `◉ GRAB · <nombre> · 00:42 · 23 solicitudes`
3. Haz clic en **"⏹ Detener"** → la instantánea de la sesión se guarda en `inspector_sessions` + `inspector_session_requests`

### 5.2 Ver una sesión grabada

El menú desplegable **Sesiones** de la barra de herramientas muestra las sesiones guardadas. Al seleccionar una:

- Se carga la instantánea de la sesión (estado congelado)
- Un banner muestra: `Viendo la sesión grabada "<nombre>" — [Volver al modo en directo]`
- La pestaña Estadísticas pasa a estar disponible con agregaciones de Recharts

### 5.3 Formatos de exportación

Cada sesión puede exportarse como:

| Formato                    | Uso                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | Compatible con Chrome DevTools, Charles y Fiddler — impórtalo para realizar análisis sin conexión |
| **JSONL**                  | Un `InterceptedRequest` por línea — compatible con el formato de `llm-interceptor`                |

Exporta mediante `GET /api/tools/traffic-inspector/sessions/{id}/export.har` o el botón ⬇ del menú desplegable Sesiones.

---

## §6 Seguridad

Traffic Inspector muestra **todo el tráfico HTTPS interceptado**, incluidos los encabezados de autorización y los cuerpos de las solicitudes. Se aplican los siguientes controles:

| Control                             | Detalles                                                                                                                                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **LOCAL_ONLY**                      | Todas las rutas y el endpoint WebSocket solo son accesibles mediante loopback (se aplica en `routeGuard.ts` antes de la autenticación)                                                                                   |
| **Enmascaramiento de secretos**     | El analizador lineal `maskSecret()` oculta credenciales Bearer de RFC 6750, claves con prefijo de proveedor y tokens opacos largos antes de `TrafficBuffer.push()`                                                       |
| **Límite de tamaño del cuerpo**     | Los cuerpos > `INSPECTOR_MAX_BODY_KB` (valor predeterminado: 1024 KB) se truncan con el aviso `"(truncado por motivos de rendimiento)"`                                                                                  |
| **Saneamiento de encabezados**      | Los nombres se convierten a minúsculas; se eliminan los encabezados de delimitación/hop-by-hop y de autenticación de proxy; las cookies se ocultan por completo; los valores de credenciales se delegan a `maskSecret()` |
| **CSP**                             | Política de seguridad de contenido estricta en las páginas de Traffic Inspector para evitar XSS mediante cuerpos de respuesta inyectados                                                                                 |
| **Sin persistencia predeterminada** | `TrafficBuffer` se mantiene en memoria y se pierde al reiniciar el servidor. Las sesiones solo se conservan cuando se graban explícitamente                                                                              |

### Reglas estrictas aplicadas

| Regla                             | Aplicación                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Todas las respuestas de error HTTP de las rutas de Traffic Inspector se sanean                 |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` es LOCAL_ONLY + SPAWN_CAPABLE (comandos del proxy del sistema) |

### Limitaciones conocidas

- El **modo de proxy para todo el sistema** afecta a todas las aplicaciones del equipo, incluidos los clientes VPN y el SSO. Úsalo siempre con el temporizador de desactivación automática. No lo uses en equipos compartidos.
- **HTTPS mediante túnel CONNECT**: el modo 3 (HTTP_PROXY) solo captura los metadatos del túnel para destinos HTTPS, a menos que esté activada la interceptación TLS. Esto es así por diseño: la captura transparente sin que esas aplicaciones confíen en el certificado de AgentBridge interrumpiría la verificación TLS.
- **Cadenas codificadas de forma fija en algunos componentes**: algunos componentes de la interfaz de usuario (F7/F8) contienen un pequeño número de cadenas codificadas de forma fija que aún no están cubiertas por claves de i18n. Estas se documentan como una limitación conocida en el informe de carencias de i18n y se migrarán en una revisión posterior. Las cadenas afectadas son etiquetas decorativas de la interfaz de usuario que no necesitan traducción para el uso funcional.

---

## §7 Solución de problemas

### Desconexión de WebSocket

Si el seguimiento en vivo muestra "Desconectado":

1. Compruebe que el servidor siga ejecutándose: `GET /api/tools/traffic-inspector/capture-modes`
2. Recargue la página — el WebSocket volverá a conectarse y recibirá una instantánea nueva
3. Si se reinició el servidor, el búfer en memoria se habrá borrado — las entradas antiguas se habrán perdido a menos que se haya grabado una sesión

### Conflicto con el puerto 8080

Si el modo HTTP_PROXY no se inicia:

```bash
lsof -i :8080    # buscar el proceso
```

Cambie el puerto:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### El proxy del sistema no se ha revertido

Si OmniRoute falla mientras el modo de proxy para todo el sistema está activo:

**macOS:**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux (GNOME):**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows:**

```cmd
netsh winhttp reset proxy
```

El panel también ofrecerá la opción "Revertir proxy del sistema" la próxima vez que se cargue si detecta que el estado de la base de datos indica que el proxy estaba activo.

### Búfer lleno

Cuando el búfer alcanza `INSPECTOR_BUFFER_SIZE` (valor predeterminado: 1000), las entradas nuevas desplazan a las más antiguas. Si se están perdiendo solicitudes importantes:

- Aumente `INSPECTOR_BUFFER_SIZE` (p. ej., 5000) — se utiliza más memoria a cambio de una mayor retención
- Grabe una sesión para conservar en la base de datos el intervalo pertinente

---

## §8 Referencia de la API

Todas las rutas son `LOCAL_ONLY` (solo bucle invertido) y `SPAWN_CAPABLE` (comandos del proxy del sistema). Consulte `src/server/authz/routeGuard.ts`.

Ruta base: `/api/tools/traffic-inspector/`

### Gestión de solicitudes

| Método | Ruta                        | Descripción                                                                                         |
| ------ | --------------------------- | --------------------------------------------------------------------------------------------------- |
| GET    | `/requests`                 | Enumera las solicitudes (se pueden filtrar: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET    | `/requests/{id}`            | Detalles de una sola solicitud                                                                      |
| DELETE | `/requests`                 | Borra el búfer en memoria                                                                           |
| POST   | `/requests/{id}/replay`     | Vuelve a ejecutar la misma solicitud mediante el enrutador de OmniRoute                             |
| PUT    | `/requests/{id}/annotation` | Guarda o actualiza una nota de una solicitud                                                        |

### WebSocket

| Método | Ruta  | Descripción                                                                                        |
| ------ | ----- | -------------------------------------------------------------------------------------------------- |
| GET    | `/ws` | Flujo WebSocket en vivo. Envía `snapshot` al conectarse y, después, eventos `new`/`update`/`clear` |

### Exportación

| Método | Ruta          | Descripción                                   |
| ------ | ------------- | --------------------------------------------- |
| GET    | `/export.har` | Exporta como HAR 1.2 la lista filtrada actual |

### Hosts personalizados

| Método | Ruta            | Descripción                                        |
| ------ | --------------- | -------------------------------------------------- |
| GET    | `/hosts`        | Enumera los hosts personalizados                   |
| POST   | `/hosts`        | Añade un host (edita automáticamente `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Elimina un host                                    |
| PATCH  | `/hosts/{host}` | Alterna `enabled`                                  |

### Modos de captura

| Método | Ruta                           | Descripción                                                                                                              |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/capture-modes`               | Estado de los modos AgentBridge / hosts personalizados / HTTP_PROXY / proxy del sistema y del conmutador `tls-intercept` |
| POST   | `/capture-modes/http-proxy`    | Inicia/detiene el listener HTTP_PROXY (`{action: "start"\|"stop"}`)                                                      |
| POST   | `/capture-modes/system-proxy`  | Aplica/revierte el proxy para todo el sistema (`{action: "apply"\|"revert"}`)                                            |
| POST   | `/capture-modes/tls-intercept` | Alterna el descifrado del cuerpo HTTPS en modo proxy (`{enabled: boolean}`)                                              |

> El **descifrado TPROXY** (modo de captura 5) se controla mediante una ruta
> **independiente** bajo el prefijo AgentBridge — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — y no
> bajo `/api/tools/traffic-inspector/`. Consulte
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; no se compila en `/docs`).

### Sesiones

| Método | Ruta                        | Descripción                                                              |
| ------ | --------------------------- | ------------------------------------------------------------------------ |
| POST   | `/sessions`                 | Inicia la grabación (`{name?: string}`)                                  |
| PATCH  | `/sessions/{id}`            | Detiene o cambia el nombre (`{action: "stop"\|"rename", name?: string}`) |
| GET    | `/sessions`                 | Enumera todas las sesiones guardadas                                     |
| GET    | `/sessions/{id}`            | Instantánea de la sesión (todas las solicitudes)                         |
| DELETE | `/sessions/{id}`            | Elimina la sesión                                                        |
| GET    | `/sessions/{id}/export.har` | Exporta la sesión como HAR 1.2                                           |

### Ingesta interna (alternativa D4)

| Método | Ruta               | Descripción                                                                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/internal/ingest` | Acepta una solicitud interceptada desde la ruta de transferencia de `server.cjs`; requiere el encabezado `INSPECTOR_INTERNAL_INGEST_TOKEN` |

Esquemas OpenAPI completos: `docs/openapi.yaml` → etiqueta `Traffic Inspector`.
