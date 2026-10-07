# ACP registry and registered CLI launchers (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute separa el **descubrimiento de CLI**, el **Agent Client Protocol nativo** y
los **adaptadores stdio heredados**. Encontrar un binario instalado no demuestra su
autenticación, compatibilidad con el modelo ni disponibilidad para gestionar un prompt.

El panel usa `GET /api/acp/agents` y `POST /api/acp/agents` para el inventario
y el registro de agentes personalizados. Estas son rutas de administración exclusivamente
locales, no una API pública para iniciar procesos o enviar prompts. El
`AcpManager` interno no se convierte automáticamente en una alternativa de proveedor HTTP.

## Contratos registrados

`config/cli-tools-manifest.json` es la fuente de referencia para los binarios de inicio,
los argumentos y los modos de backend integrados. El registro deriva sus definiciones
de ese manifiesto. La detección se almacena en caché durante 60 segundos.

- `acp`: el contrato de Gemini inicia `gemini --experimental-acp` y se comunica
  mediante ACP JSON-RPC delimitado por saltos de línea a través del SDK oficial de TypeScript.
- `stdio-adapter`: los demás contratos registrados conservan el adaptador heredado con
  entrada delimitada por saltos de línea y salida mediante stdout. Un período de inactividad
  de salida de dos segundos finaliza su respuesta. Este adaptador **no** certifica
  compatibilidad nativa con ACP para esas CLI.

Gemini documenta la opción de inicio en su [referencia de la CLI](https://geminicli.com/docs/cli/cli-reference/).
El cliente usa el [SDK oficial de ACP](https://github.com/agentclientprotocol/typescript-sdk)
para la inicialización, la creación de sesiones, las solicitudes de prompts, las notificaciones y la cancelación.

Las definiciones de agentes personalizados siguen siendo contratos de inicio controlados por el administrador.
Registrar un binario y argumentos otorga a ese proceso los privilegios de ejecución local
del usuario del servidor; el registro no es un entorno aislado. Las comprobaciones de versión
solo aceptan el ejecutable registrado y una opción de versión reconocida.

## API interna de inicio

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Pase únicamente las variables del proveedor asignadas deliberadamente a este agente.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explique este proyecto", 120_000);
  // Procese la respuesta en la aplicación que realiza la llamada.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` resuelve el ejecutable y los argumentos a partir de la
definición registrada. Las únicas opciones del invocador son `cwd` y `env`; la antigua
firma `spawn(agentId, binary, args, env)` y las sustituciones del ejecutable
se rechazan. Este gestor no admite contratos de inicio HTTP.

El proceso hijo hereda el mismo sistema operativo, terminal, configuración regional y lista
de certificados permitidos que los iniciadores de CLI. Los secretos del servidor o del proveedor
no se copian desde el entorno del proceso padre. Las credenciales necesarias para la CLI elegida
deben pasarse explícitamente o proporcionarse mediante la autenticación local propia de esa CLI.
El proceso hijo sigue teniendo los permisos del usuario local sobre el sistema de archivos y puede
leer su propia configuración.

## Ciclo de vida nativo y límites

1. Inicie el binario registrado, inicialice ACP y cree una sesión cuya raíz sea
   el directorio de trabajo seleccionado. La inicialización tiene un límite de diez segundos.
2. Envíe un prompt y recopile las notificaciones de texto únicamente para esa sesión.
   La finalización viene determinada por la respuesta RPC del prompt, no por un período de silencio en stdout.
3. Use un único plazo para el prompt, incluida cualquier inicialización sin finalizar; el valor
   predeterminado es de 120 segundos. Los prompts simultáneos en el mismo proceso se rechazan.
4. Cuando se agote el tiempo de espera nativo, intente ejecutar `session/cancel` y finalice el proceso. Una
   ventana limitada de 100 ms permite vaciar la notificación antes de la finalización.
5. Cierre el estado del transporte y elimine la sesión cuando falle la inicialización, se
   cierre la conexión, termine el proceso o el invocador lo finalice.

Las solicitudes de permisos para herramientas se rechazan. No se anuncian capacidades
de cliente para el sistema de archivos ni para el terminal. Estas restricciones no aíslan
el binario hijo ni sustituyen la configuración de autorización propia de una CLI.

Tanto el texto nativo como stdout/stderr heredados conservan como máximo 1 MiB de caracteres,
manteniendo la salida más reciente con un aviso de truncamiento. Cada trama nativa individual
está limitada a 2 MiB de bytes antes del análisis del SDK. Los búferes se restablecen con cada prompt.

`kill(sessionId)` envía SIGTERM y, después de cinco segundos, SIGKILL si el proceso
no ha terminado. Los tiempos de espera agotados de prompts heredados liberan los listeners y temporizadores,
pero dejan la sesión disponible para otro prompt; los invocadores siguen siendo responsables de
ejecutar `kill()` o `killAll()` al finalizar.

## Eventos e inspección

El gestor emite `stdout`, `stderr` y `exit`, cada uno con `sessionId`.
`sessionError` informa de un error de transporte depurado. El evento de compatibilidad `error`
solo se emite cuando tiene un suscriptor, por lo que un binario ausente no puede
provocar un error de EventEmitter no gestionado.

- `getSession(sessionId)` devuelve una sesión gestionada o `undefined`.
- `getActiveSessions()` excluye las sesiones detenidas o en proceso de detención.
- `sendInput(sessionId, input)` solo está disponible para un adaptador heredado activo;
  ACP nativo rechaza la entrada sin procesar para proteger su flujo JSON-RPC.
- `killAll()` finaliza todas las sesiones gestionadas por esa instancia.

## Límites de validación

Los fixtures deterministas cubren el protocolo de enlace nativo, la salida de texto, los permisos
rechazados, la cancelación, los prompts simultáneos, los fallos de inicialización, la finalización
del proceso, los límites de salida y el aislamiento de secretos. Las regresiones existentes de
búferes y listeners heredados siguen cubiertas. Estas pruebas no demuestran un inicio de sesión
activo en Gemini ni una inferencia correcta del proveedor; para ello se requiere una prueba de humo
autorizada por separado en el entorno de destino.

## Documentación relacionada

- [Protocolos de agentes](./AGENT_PROTOCOLS_GUIDE.md)
- [Contratos de inicio de CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Herramientas de CLI](../reference/CLI-TOOLS.md)
- [Servidor A2A](./A2A-SERVER.md)
- [Agentes en la nube](./CLOUD_AGENT.md)
