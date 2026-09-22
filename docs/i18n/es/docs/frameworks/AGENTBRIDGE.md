# AgentBridge (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge es el proxy MITM (Man-in-the-Middle, intermediario) de OmniRoute que intercepta el tráfico HTTPS de los agentes de IA de los IDE y lo redirige a través del motor de enrutamiento unificado de OmniRoute. Es compatible con **10 agentes de IDE** — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code y Trae (en investigación) —, lo que convierte a OmniRoute en el proxy MITM con la cobertura más amplia del mercado para asistentes de programación con IA.

**Ubicación en el panel:** `/dashboard/tools/agent-bridge`
**Grupo de la barra lateral:** Herramientas (después de Agentes en la nube)
**Véase también:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — supervisa todo el tráfico interceptado en tiempo real; `docs/security/MITM-TPROXY-DECRYPT.md` (git; no se compila en `/docs`) — el modo de captura de descifrado transparente TPROXY para Linux, controlado mediante la ruta `/api/tools/agent-bridge/tproxy`.

---

## §1 Descripción general

### ¿Qué es AgentBridge?

Cuando un agente de IDE (p. ej., GitHub Copilot, Cursor o Claude Code) realiza una llamada a una API, se conecta directamente al proveedor de IA ascendente (OpenAI, Anthropic, etc.). AgentBridge intercepta esa conexión de forma transparente en la capa TLS — sin requerir ningún cambio en la configuración del agente — y reescribe la solicitud para canalizarla a través de OmniRoute.

Esto permite:

- **Redirigir cualquier agente a cualquier proveedor**: ¿Copilot se comunica con OpenAI? Redirígelo a Anthropic Claude, Gemini o cualquiera de los 352 proveedores de OmniRoute.
- **Aplicar asignaciones de modelos**: `gemini-3-flash` → `claude-sonnet-4.7` de forma transparente en el nivel del controlador.
- **Observar todo el tráfico de los agentes**: cada solicitud interceptada se publica en el [Inspector de tráfico](./TRAFFIC_INSPECTOR.md).
- **Aplicar la resiliencia de OmniRoute**: el enrutamiento combinado, los disyuntores, las alternativas y el seguimiento de costes también funcionan con el tráfico de los agentes de IDE.

### Posicionamiento frente al mercado

| Funcionalidad                     | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| --------------------------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity                       |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot                    |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)                        |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex                      |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE                        |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries                    |    —    |    ✓     |        —        |             ✓             |
| Claude Code                       |    —    |    —     |        ✓        |             ✓             |
| Open Code                         |    —    |    —     |        ✓        |             ✓             |
| Trae                              |    —    |    —     |        —        |    🔍 En investigación    |
| Interfaz del panel                |    ✓    |    ✗     |        ✗        |             ✓             |
| Inspector de tráfico              |    ✗    |    ✗     |        ✓        |             ✓             |
| Enrutamiento de OmniRoute         |    ✗    |    ✗     |        ✗        |             ✓             |
| Interfaz de asignación de modelos |    ✗    |    ✗     |        ✗        |             ✓             |
| Lista de exclusión                |    ✗    |    ✗     |        ✓        |             ✓             |
| Certificado de CA ascendente      |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Arquitectura

### 2.1 Descripción general de los componentes

```
Agente del IDE (VS Code / Cursor / etc.)
    │  HTTPS (puerto 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← redirección DNS
    │
    ▼
src/mitm/server.cjs  (puerto 443, proceso hijo CJS)
    │  resuelve el destino mediante el SNI del encabezado Host
    │  genera un certificado TLS por SNI firmado por la CA de AgentBridge
    ├── ¿Coincide con la lista de omisión? → paso directo TCP (sin descifrado)
    ├── ¿Coincide con un destino? → fetch → enrutador de OmniRoute (puerto 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() en el cuerpo/los encabezados de la solicitud
    │               ├── TrafficBuffer.push() — publica en Traffic Inspector
    │               └── fetchRouter() → /v1/chat/completions
    └── ¿Sin coincidencia? → paso directo TCP (sin descifrado)
```

### 2.2 Servidor MITM (`src/mitm/server.cjs`)

El servidor MITM principal se ejecuta como un proceso hijo CJS de Node.js (para evitar reescribir el código base CJS existente). Este:

- Escucha en el puerto 443 (requiere privilegios o `authbind`/`setcap`)
- Recibe túneles CONNECT del sistema operativo (mediante la redirección DNS de `/etc/hosts`)
- Genera certificados TLS por SNI firmados por la CA de AgentBridge (`DATA_DIR/mitm/ca.crt`)
- Resuelve el agente de destino mediante el encabezado Host a través del registro `targets/index.ts`
- Delega en la capa de controladores de TypeScript mediante HTTP hacia `http://127.0.0.1:20128`

`TARGET_HOSTS` se carga desde `DATA_DIR/mitm/targets.json` (escrito por `targets/index.ts` durante el arranque), lo que permite actualizaciones dinámicas sin reiniciar el servidor CJS.

> **Modelo de CA raíz (#6684).** La descripción anterior del certificado por SNI firmado por una CA
> corresponde al modelo persistente de CA raíz añadido en #6684 (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, que reutiliza la criptografía de CA/certificado final ya
> probada para TPROXY en `src/mitm/tproxy/dynamicCert.ts`): sustituye al
> antiguo certificado final autofirmado estático único (`src/mitm/cert/generate.ts`, todavía
> limitado únicamente a los hosts de antigravity) que indica la presencia en disco de un par
> `server.crt`/`server.key`. **Comportamiento de la migración**: una instalación nueva (sin un
> `server.crt` previo) obtiene automáticamente el modelo de CA raíz; una instalación que ya
> confiaba en el antiguo certificado final estático sigue utilizándolo hasta que el operador establece
> `MITM_ROOT_CA_ENABLED=true` y reinicia el puente (`src/mitm/cert/migration.ts`
> es la función pura de decisión; una CA MITM de confianza que puede firmar un certificado final para
> **cualquier** host es sustancialmente más potente que el antiguo certificado final con SAN fijos, por lo que el
> cambio nunca se realiza silenciosamente en una instalación que ya confía en él). El certificado de la CA se instala
> en la misma ubicación `omniroute-mitm.crt` del almacén de confianza que utilizaba el antiguo certificado final
> (`cert/install.ts::installCaCert`), por lo que no se necesita ninguna limpieza de confianza dual.

### 2.3 Controlador base (`src/mitm/handlers/base.ts`)

Todos los controladores de agentes extienden `MitmHandlerBase`:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Ayudantes protegidos: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Cada controlador llama a `hookBufferStart()` antes de actuar como proxy y a `hookBufferUpdate()` al finalizar. Estas llamadas insertan entradas `InterceptedRequest` en `globalTrafficBuffer` (véase [Traffic Inspector](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Registro de destinos (`src/mitm/targets/`)

Cada agente tiene un archivo de destino declarativo:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

El registro (`targets/index.ts`) exporta `ALL_TARGETS` y genera `DATA_DIR/mitm/targets.json` durante el arranque.

### 2.5 Paso directo y lista de omisión (`src/mitm/passthrough.ts`)

**Lista de omisión** (se comprueba primero y tiene precedencia sobre la coincidencia de destinos):

- Patrones predeterminados: hosts bancarios, `.gov.`, proveedores de OAuth/SSO (Okta, Auth0), etc.
- Patrones del usuario: almacenados en la tabla de la base de datos `agent_bridge_bypass`
- Los hosts omitidos reciben un túnel TCP transparente; el tráfico TLS **nunca se descifra**

**Paso directo predeterminado** (sin coincidencia de destino y sin pertenecer a la lista de omisión):

- También recibe un túnel TCP; las conexiones nunca se interrumpen
- Evita que AgentBridge interfiera con el tráfico HTTPS general del sistema

Precedencia de enrutamiento:

```
lista de omisión → coincidencia de destino → paso directo
```

### 2.6 Certificado de CA ascendente (`src/mitm/upstreamTrust.ts`)

Para entornos de red corporativa con una CA personalizada:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Cuando se establece, configura el despachador global de `undici` con el certificado de CA adicional, lo que permite que AgentBridge se conecte con los proveedores ascendentes a través de proxies corporativos de terminación TLS.

### 2.7 Enmascaramiento de secretos (`src/mitm/maskSecrets.ts`)

El escáner independiente de sala limpia se aplica a los cuerpos de las solicitudes y a los encabezados de credenciales
**antes** de que entren en el búfer de Traffic Inspector o en cualquier registro. Realiza una única pasada lineal:

- Tokens con los prefijos `sk-` / `ak-` / `pk-` (al estilo de OpenAI/Anthropic)
- Credenciales RFC 6750 `Authorization: Bearer <token>`, con precedencia del token completo
- Tokens opacos largos genéricos (≥40 caracteres), incluidas las formas con puntos y relleno

`sanitizeHeaders()` convierte a minúsculas los nombres conservados, une los valores de matrices de forma determinista, descarta la
lista de exclusión compartida de encabezados salto a salto/de entramado (incluida la autenticación de proxy), censura por completo `cookie` y
`set-cookie`, y delega los valores de las credenciales al escáner.

---

## §3 Configuración

### 3.1 Iniciar/detener el servidor MITM

Utilice la tarjeta del servidor AgentBridge en `/dashboard/tools/agent-bridge`:

| Acción             | Descripción                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| Iniciar servidor   | Inicia `src/mitm/server.cjs` en el puerto 443                                                 |
| Detener servidor   | Cierra correctamente el proceso secundario                                                    |
| Reiniciar servidor | Detiene e inicia el servidor (aplica los cambios en los destinos)                             |
| Confiar en cert.   | Instala `DATA_DIR/mitm/ca.crt` en el almacén de confianza del sistema operativo               |
| Descargar cert.    | Descarga `ca.crt` para su instalación manual                                                  |
| Regenerar cert.    | Crea un nuevo par de claves de CA (invalida todos los certificados existentes de cada agente) |

### 3.2 Confiar en el certificado

El sistema operativo debe confiar en el certificado de CA de AgentBridge antes de que los IDE acepten la conexión MITM.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Llavero):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

También puede utilizar el botón «Confiar en cert.» del panel (ejecuta el comando adecuado para su sistema operativo y solicita sudo si es necesario).

#### Los IDE basados en Electron ignoran el almacén de confianza del sistema operativo (`NODE_EXTRA_CA_CERTS`)

Algunos IDE — en particular **Antigravity IDE** y otras aplicaciones derivadas de Electron /
VS Code — incluyen su propio entorno de ejecución de Node.js, que **no consulta el almacén de
confianza del sistema operativo** para las conexiones salientes mediante `fetch`/HTTPS. Confiar
en la CA a nivel del sistema operativo/NSS es suficiente para el **backend** nativo del IDE
(p. ej., un servidor de lenguaje escrito en Go, que utiliza el conjunto de CA del sistema
operativo), pero el **frontend de Electron** seguirá presentando errores de TLS; esto se
manifiesta como si la aplicación hubiera _cerrado la sesión_ o mostrara un _«error de conexión»_,
aunque el registro MITM muestre que las llamadas de arranque del backend devuelven `200`. Se
requieren dos pasos, y ambos son importantes:

1. Indique explícitamente la CA al entorno de ejecución:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Inicie el IDE desde ese shell.** Si lo inicia desde el icono del escritorio, el Dock o el
   menú Inicio, **no** heredará las variables exportadas del shell, y
   `~/.config/environment.d/*.conf` solo se aplica después de un nuevo inicio de sesión gráfico.
   Primero cierre por completo el IDE: el bloqueo de instancia única de Electron hace que un
   segundo inicio simplemente enfoque el proceso existente y que se ignore el nuevo entorno.

El paso anterior de confianza en el sistema operativo + NSS sigue siendo necesario (la pila de
red de Chromium utilizada por algunos flujos de autenticación lee el almacén NSS de cada usuario
y tiene sus propios anclajes estáticos para `*.googleapis.com`, que una CA de confianza local
anula). `NODE_EXTRA_CA_CERTS` cubre adicionalmente la ruta de `fetch` de Node.

### 3.3 Enrutamiento DNS

Para cada agente que desee interceptar, sus hosts de API deben resolverse como `127.0.0.1`. AgentBridge administra automáticamente las entradas de `/etc/hosts` cuando activa o desactiva el DNS de un agente en el asistente de configuración.

Ejemplo de entradas de `/etc/hosts` para GitHub Copilot:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Asignación de modelos

Utilice la tabla de asignación de modelos de cada tarjeta de agente para definir asignaciones de origen → destino:

| Modelo de origen (nativo del agente) | Modelo de destino (OmniRoute) |
| ------------------------------------ | ----------------------------- |
| `gpt-4o`                             | `claude-sonnet-4.7`           |
| `*` (comodín)                        | `claude-haiku-4.7`            |

El comodín `*` asigna cualquier modelo no reconocido al destino especificado. Se conserva en la tabla `agent_bridge_mappings`.

> **Consejo: descubra los ID de modelo reales del agente.** Un IDE puede enviar nombres de
> modelos que difieren de las etiquetas de su interfaz y que cambian entre versiones principales.
> Por ejemplo, **Antigravity 2** envía `gemini-3.1-pro-low`, `gemini-pro-agent` y
> `gemini-3.1-flash-lite` por la red, no el `gemini-2.5-pro` que aparece en documentación
> anterior. Envíe un mensaje de chat sin una asignación coincidente: el MITM registra el valor
> exacto de `model:` recibido y deja pasar la solicitud. Asigne ese valor literal y la siguiente
> solicitud será interceptada y enrutada a su destino.

### 3.5 Aviso de riesgo

AgentBridge intercepta las credenciales (tokens de OAuth y claves de API) que utiliza el IDE para autenticarse con proveedores externos. Estas se **enmascaran antes de registrarse** (consulte §2.7), pero son visibles para la capa MITM de OmniRoute. La primera activación de cada agente muestra un cuadro de diálogo descartable con un aviso de riesgo.

### 3.6 Mantenimiento y diagnóstico

El panel incluye una tarjeta de **Mantenimiento y diagnóstico** (`AgentBridgeMaintenanceCard`, en `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`) que muestra rutas operativas de MITM que anteriormente no tenían interfaz de usuario. Su subtítulo es: _«Realice una autoprueba del proceso de captura, revierta el estado residual del sistema y traslade su configuración entre equipos»._ Las funciones auxiliares de cliente de la tarjeta se encuentran en `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Botón                | Ruta                                   | Qué hace                                                                                                                                                                                                               |
| -------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnosticar**     | `GET /api/tools/agent-bridge/diagnose` | Ejecuta la autoprueba de la canalización de captura y muestra un informe por comprobación (✓/✗ + sugerencia de corrección).                                                                                            |
| **Reparar**          | `POST /api/tools/agent-bridge/repair`  | Deshace el estado huérfano del sistema MITM (entradas de suplantación DNS, CA raíz, proxy del sistema) dejado por un fallo o SIGKILL. Es idempotente: informa «Nada que reparar» cuando el estado está limpio.         |
| **Eliminar CA**      | `DELETE /api/tools/agent-bridge/cert`  | Revoca la confianza y elimina la CA raíz MITM del almacén de confianza del SO (explícito e idempotente). Solo se muestra cuando la CA es de confianza actualmente; requiere una confirmación en línea «¿Eliminar CA?». |
| **Exportar config.** | `GET /api/tools/agent-bridge/config`   | Descarga el JSON de configuración portable (véase §3.7).                                                                                                                                                               |
| **Importar config.** | `POST /api/tools/agent-bridge/config`  | Carga un JSON de configuración exportado previamente (véase §3.7).                                                                                                                                                     |

**Comprobaciones de diagnóstico** (`summarizeDiagnostics()` en `src/mitm/inspector/diagnostics.ts`). La ruta ejecuta la prueba con efectos para cada una e introduce los valores booleanos en el resumidor puro; se devuelve un único veredicto `healthy` junto con una sugerencia para cada fallo:

| Nombre de la comprobación | Qué verifica                                                 | Sugerencia en caso de fallo                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`          | El proceso del servidor MITM está activo                     | «El servidor MITM no está en ejecución. Inícielo desde la pestaña AgentBridge».                                                                                       |
| `server-reachable`        | El servidor MITM acepta conexiones en su puerto (prueba TCP) | «El servidor MITM no acepta conexiones en su puerto. Compruebe que el puerto esté libre y que tenga privilegios para enlazarlo».                                      |
| `cert-exists`             | El certificado MITM se ha generado en el disco               | «Todavía no se ha generado ningún certificado MITM. Genere uno desde la pestaña AgentBridge».                                                                         |
| `cert-trusted`            | La CA raíz MITM está en el almacén de confianza del SO       | «El almacén del SO no confía en la CA raíz MITM, por lo que la interceptación TLS fallará. Confíe en el certificado desde la pestaña AgentBridge».                    |
| `dns-configured`          | Los nombres de host objetivo se suplantan en `/etc/hosts`    | «Los nombres de host objetivo no se suplantan en /etc/hosts, por lo que el tráfico nunca llega al proxy. Habilite DNS para los agentes cuyo tráfico quiera capturar». |

**Banner de estado huérfano:** cuando la página detecta un estado dejado por un fallo (suplantación DNS / CA / proxy del sistema), la tarjeta muestra un banner ámbar — _«Una sesión anterior dejó un estado del sistema sin limpiar (suplantación DNS, CA o proxy del sistema). Ejecute Reparar para limpiarlo»._ — y resalta el botón **Reparar**. `Repair` es el equivalente en la capa de aplicación de la opción `--cleanup` de ProxyBridge (delega en `repairMitm()` en `src/mitm/manager.ts`).

> La CA raíz MITM se mantiene instalada entre detenciones e inicios para evitar
> solicitudes de sudo repetidas (el mismo comportamiento que mitmproxy/Charles), por lo que eliminarla es una acción
> explícita de **Eliminar CA**, en lugar de algo que sucede automáticamente al detenerse.

### 3.7 Importación/exportación de configuración portable

AgentBridge puede serializar el estado **configurable por el operador** en un objeto JSON con versión para que una configuración pueda replicarse entre equipos. El serializador es `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), validado por `AgentBridgeConfigSchema`.

La exportación incluye exactamente tres elementos (los valores predeterminados integrados **NO** se exportan intencionadamente, por lo que la importación nunca los duplica ni entra en conflicto con ellos):

| Campo            | Origen                                                               | Notas                                                                             |
| ---------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `bypassPatterns` | patrones de omisión definidos por el usuario (`agent_bridge_bypass`) | se excluyen los patrones predeterminados de bancos/administraciones públicas/okta |
| `customHosts`    | hosts personalizados de Traffic Inspector (`inspector_custom_hosts`) | cada uno: `{ host, kind: "llm"\|"app"\|"custom", label? }`                        |
| `agentMappings`  | asignaciones de modelos por agente (`agent_bridge_mappings`)         | `{ [agentId]: [{ source, target }] }` para cada agente que tenga asignaciones     |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Comportamiento de la importación** (`POST /api/tools/agent-bridge/config`): los patrones de omisión y las asignaciones por agente **se sustituyen por completo**; los hosts personalizados se añaden de forma **idempotente** (`INSERT OR IGNORE`). La respuesta indica cuántos elementos de cada tipo se aplicaron:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

Lo que **NO** está en la configuración: el estado de ejecución del servidor, las rutas de los certificados, el estado de DNS de cada agente, la ruta de la CA ascendente y la configuración de TPROXY; estos son estados del host o del entorno de ejecución, no preferencias portátiles.

---

## §4 Referencia por agente

| #   | Agente             | Estado              | Hosts interceptados                                                | Tipo de autenticación |
| --- | ------------------ | ------------------- | ------------------------------------------------------------------ | --------------------- |
| 1   | **Antigravity**    | ✅ Compatible       | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth        |
| 2   | **Kiro (AWS)**     | ✅ Compatible       | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4             |
| 3   | **GitHub Copilot** | ✅ Compatible       | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth          |
| 4   | **OpenAI Codex**   | ✅ Compatible       | `api.openai.com` (rutas de Codex), `chatgpt.com`                   | Clave de OpenAI       |
| 5   | **Cursor IDE**     | ✅ Compatible       | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth          |
| 6   | **Zed Industries** | ✅ Compatible       | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth             |
| 7   | **Claude Code**    | ✅ Compatible       | `api.anthropic.com` (activación opcional)                          | Clave de Anthropic    |
| 8   | **Open Code**      | ✅ Compatible       | `openrouter.ai`, `api.openai.com` (rutas de zen)                   | Clave de API          |
| 9   | **Trae**           | 🔍 En investigación | Por determinar — consulte §8                                       | Por determinar        |

### Pasos del asistente de configuración (por agente)

Cada tarjeta de agente tiene un asistente de configuración de 3 pasos:

1. **Verificar requisitos previos** — ¿El servidor está en ejecución? ¿El certificado es de confianza? ¿El IDE está instalado (detección automática)?
2. **Habilitar DNS** — Añade entradas a `/etc/hosts` (requiere sudo). Muestra exactamente qué líneas se añadirán.
3. **Asignar modelos** — Tabla opcional de asignación de modelos. Se aceptan comodines.

### Detección de agentes

Para los agentes 1–8, AgentBridge intenta detectar automáticamente la instalación del IDE:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Devuelve: { installed: boolean, version?: string, path?: string }
```

La detección utiliza rutas específicas del sistema operativo y comprobaciones de binarios (p. ej., `code --list-extensions | grep github.copilot` para Copilot, `~/.config/antigravity/` para Antigravity).

---

## §5 Seguridad

### Reglas estrictas aplicadas

| Regla                                         | Aplicación                                                                                            |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`                | Todos los errores de los controladores se sanitizan antes de incluirlos en la respuesta o en el búfer |
| **#13** Paso de variables de entorno al shell | Las ediciones de `/etc/hosts` utilizan la opción `env`, sin interpolación de cadenas de rutas         |
| **#15 + #17** `isLocalOnlyPath()`             | `/api/tools/agent-bridge/` es LOCAL_ONLY + SPAWN_CAPABLE; se exige loopback antes de la autenticación |

### Lista de exclusión para hosts sensibles

La lista de exclusión garantiza que las instituciones financieras, los proveedores de OAuth/SSO y otros hosts sensibles **nunca se descifren**. Su tráfico TLS pasa como un túnel TCP transparente; OmniRoute nunca ve el texto sin cifrar.

Los patrones de exclusión predeterminados incluyen:

- `*.bank.*`, `*.gov.*` (entidades financieras/gubernamentales)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/identidad)
- `*.apple.com`, `*.icloud.com` (servicios del sistema de Apple)

Los patrones de exclusión añadidos por el usuario se almacenan en la tabla `agent_bridge_bypass` y tienen prioridad sobre todo lo demás.

### Enmascaramiento de secretos

Se aplica `maskSecrets()` de `src/mitm/maskSecrets.ts`:

- A cada cuerpo de solicitud antes de `TrafficBuffer.push()`
- A cada encabezado antes de registrarlo o difundirlo

Patrones: tokens con los prefijos `sk-`/`ak-`/`pk-`, tokens `Bearer` y tokens genéricos de 40 caracteres o más.

### Certificado de CA ascendente

Cuando se establece `AGENTBRIDGE_UPSTREAM_CA_CERT`, el archivo se lee al iniciar. Si la ruta existe, pero el archivo no se puede leer, AgentBridge registra un error claro y se niega a iniciarse (esto evita fallos silenciosos de TLS en entornos corporativos).

### Limitaciones conocidas

- **El puerto 443 requiere privilegios**: En Linux, AgentBridge necesita `setcap 'cap_net_bind_service=+ep'` en el binario de Node, o ejecutarse mediante `authbind`. El asistente de configuración muestra instrucciones específicas para cada sistema operativo.
- **Es necesario reiniciar el IDE**: Después de la redirección DNS, el IDE debe reiniciarse para que la nueva resolución del host surta efecto.
- **Tokens OAuth codificados de forma fija**: Algunos agentes (Kiro, Antigravity) almacenan localmente tokens de actualización de OAuth. Estos son transparentes para AgentBridge: ve el token Bearer en cada solicitud, que se enmascara antes de registrarse.
- **Las interfaces de Electron necesitan `NODE_EXTRA_CA_CERTS`**: Los IDE cuya interfaz se ejecuta en un entorno de ejecución Node/Electron incluido ignoran el almacén de confianza del sistema operativo/NSS y deben iniciarse desde un shell con `NODE_EXTRA_CA_CERTS` establecido (consulte §3.2). Síntoma cuando falta: el backend del IDE se autentica (MITM muestra respuestas `200`), pero la interfaz permanece con la sesión cerrada.
- **Las instalaciones múltiples del mismo IDE son independientes**: una instalación del sistema (p. ej., `/usr/share/antigravity/antigravity`) y una instalación «Full» local del usuario (p. ej., `~/AntigravityIDE_Full/antigravity-ide`) son procesos separados con sus propios entornos de ejecución; cada uno debe reiniciarse con la CA inyectada. Antes de reiniciarlo, identifique cuál se está ejecutando mediante la ruta de su binario.
- **La identidad la establece el prompt del sistema del agente, no el modelo enrutado**: cuando se reasigna el modelo de un agente a un proveedor diferente, la respuesta sigue afirmando la identidad nativa del agente (p. ej., Antigravity responde «Estoy impulsado por Gemini») porque el IDE la inserta en el prompt del sistema. Confirme el backend real en `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), no preguntándole al modelo quién es.

---

## §6 Solución de problemas

### Conflicto con el puerto 443

Si otro proceso ya está escuchando en el puerto 443 (servidor web, VPN, etc.):

```bash
lsof -i :443          # buscar el proceso
sudo fuser -k 443/tcp  # forzar su finalización (usar con precaución)
```

Como alternativa, configure un puerto no privilegiado en los ajustes de AgentBridge y establezca reglas de redirección con `iptables` / `pf`.

### Certificado no confiable

Si el IDE muestra errores de TLS después de iniciar AgentBridge:

1. Compruebe que el certificado se haya instalado: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) o `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Algunas aplicaciones mantienen su propio almacén de confianza (Firefox, Chrome en Linux). Vuelva a ejecutar "Confiar en el certificado" y compruebe el almacén de certificados específico de NSS/Firefox.
3. Reinicie el IDE después de confiar en el certificado; las sesiones TLS en curso utilizan el estado de confianza anterior.

### Sesión cerrada en el IDE / "error de conexión" pese a que la CA es de confianza

Síntoma: después de redirigir el DNS y confiar en la CA, un IDE basado en Electron (p. ej., Antigravity)
se abre **con la sesión cerrada** o muestra un error de autenticación/conexión, aunque el registro del MITM muestra que las
llamadas de inicialización (`loadCodeAssist`, `fetchAvailableModels`, …) devuelven `200`.

Causa: el **entorno de ejecución Node/Electron incluido en el IDE ignora el almacén de confianza del SO**. El backend
nativo (un servidor de lenguaje en Go) confía en la CA del SO y se autentica, pero el frontend de Electron
no lo hace, por lo que la interfaz cree que está sin conexión.

Solución (ambos pasos): exporte `NODE_EXTRA_CA_CERTS=<ca.crt>` **y vuelva a iniciar el IDE desde ese
shell**, no desde el icono del escritorio. Primero cierre por completo el IDE; el bloqueo de instancia única de Electron implica
que un segundo inicio simplemente pone en primer plano el proceso existente y se ignora el nuevo entorno. Consulte §3.2.
Esto coincide con un informe abierto del proyecto original en el que un agente independiente funciona a través de un MITM, pero la variante
del IDE falla con la misma configuración.

### DNS no propagado

Compruebe que `/etc/hosts` se haya actualizado:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Vacíe la caché de DNS:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE no detectado

La detección automática utiliza rutas de instalación habituales. Si la detección falla, pero el IDE está instalado:

- Compruebe si el binario del IDE se encuentra en una ubicación no estándar
- El asistente de configuración seguirá funcionando; el fallo de detección solo significa que la insignia no mostrará la ruta de instalación

### Errores del controlador (falla la solicitud al servidor de origen)

Si AgentBridge intercepta las solicitudes, pero todas fallan:

1. Compruebe que haya al menos un proveedor conectado en `/dashboard/providers`
2. Revise los registros del servidor de OmniRoute: `APP_LOG_LEVEL=debug` en `.env`
3. Compruebe que `OMNIROUTE_BASE_URL` apunte al endpoint correcto del enrutador (valor predeterminado: `http://127.0.0.1:20128`)

---

## §7 Referencia de la API

Todas las rutas son `LOCAL_ONLY` (solo accesibles mediante loopback, aplicado antes de la autenticación) y `SPAWN_CAPABLE`. Consulte `src/server/authz/routeGuard.ts`.

Ruta base: `/api/tools/agent-bridge/`

| Método              | Ruta                                           | Descripción                                                                                                                      |
| ------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | Estado global del servidor + detección/estado por agente                                                                         |
| GET                 | `/api/tools/agent-bridge/agents`               | Lista de agentes registrados (id, nombre, hosts, viabilidad, estado)                                                             |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | Estado de un agente (configuración de destino + detección + estado almacenado)                                                   |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Actualiza `setup_completed` para el agente                                                                                       |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Ejecuta una comprobación de detección para el agente (`installed`, `version?`, `path?`)                                          |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Habilita/deshabilita el DNS para el agente (`{enabled: boolean}`)                                                                |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Asignaciones de modelos para el agente                                                                                           |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Reemplaza las asignaciones de modelos                                                                                            |
| POST                | `/api/tools/agent-bridge/server`               | Inicia/detiene/reinicia el servidor (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                      |
| GET                 | `/api/tools/agent-bridge/cert`                 | Estado del certificado (`exists`, `trusted`, `path`)                                                                             |
| POST                | `/api/tools/agent-bridge/cert`                 | Confía en (instala) la CA raíz MITM                                                                                              |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Deja de confiar en (elimina) la CA raíz MITM — idempotente (véase §3.6)                                                          |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Regenera el certificado MITM autofirmado                                                                                         |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Transmite el certificado PEM para su descarga                                                                                    |
| GET                 | `/api/tools/agent-bridge/bypass`               | Lista los patrones de omisión (`default` + `user`)                                                                               |
| POST                | `/api/tools/agent-bridge/bypass`               | Reemplaza en su totalidad los patrones de omisión definidos por el usuario                                                       |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Elimina un único patrón de omisión definido por el usuario                                                                       |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Autoprueba de la canalización de captura (véase §3.6)                                                                            |
| POST                | `/api/tools/agent-bridge/repair`               | Revierte el estado huérfano del sistema MITM (véase §3.6)                                                                        |
| GET                 | `/api/tools/agent-bridge/config`               | Exporta la configuración JSON portátil (véase §3.7)                                                                              |
| POST                | `/api/tools/agent-bridge/config`               | Importa la configuración JSON portátil (véase §3.7)                                                                              |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Obtiene la ruta configurada de la CA ascendente                                                                                  |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Valida y guarda la ruta de la CA ascendente                                                                                      |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Solo valida (ejecución de prueba) una ruta de CA ascendente — no la guarda                                                       |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | Modo de captura TPROXY con descifrado transparente — véase `docs/security/MITM-TPROXY-DECRYPT.md` (git; no compilado en `/docs`) |

Esquemas completos de OpenAPI: `docs/openapi.yaml` → etiqueta `AgentBridge`.

---

## §8 Hoja de ruta

### Investigación de Trae

Trae es un asistente de programación con IA relativamente nuevo. Antes de implementar un manejador:

1. Identificar el binario o la extensión en los marketplaces de VS Code / JetBrains o como aplicación independiente
2. Capturar el tráfico con mitmproxy para descubrir los hosts de la API y la estructura de los endpoints
3. Determinar el mecanismo de autenticación
4. Evaluar si se debe proceder o no en función de los TOS y de la facilidad para descubrir la API

Hasta que finalice la investigación, la tarjeta de Trae en el panel muestra una insignia de "En investigación" con un enlace "Informar sobre la viabilidad". El esqueleto del manejador en `src/mitm/handlers/trae.ts` genera un error estructurado `Aún no implementado`.

### Agentes pendientes (requieren MITM — sin compatibilidad con una URL base personalizada)

Las siguientes herramientas no admiten URL base personalizadas en sus versiones actuales, por lo que MITM es la única vía de interceptación. La evaluación de viabilidad está pendiente:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — independiente de Kiro IDE)
- **Cowork** (aplicación de escritorio de Anthropic)

Nota: GitHub Copilot CLI ≥v1.0.19 admite `COPILOT_PROVIDER_BASE_URL`; para esa herramienta, utilice la configuración directa en lugar de MITM.
