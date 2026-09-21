# Devin Claude Bridge (Español)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` permite que el entorno de ejecución real de Claude Code use el endpoint local de
Messages de Anthropic de OmniRoute, mientras que la CLI oficial de Devin proporciona respuestas del modelo mediante ACP stdio. No
modifica los proveedores existentes de Anthropic, Claude OAuth, Claude Web ni `devin-cli`.

> **Estado actual: Claude Code `2.1.258` fijado; la última validación sin conexión y en vivo se registró
> en `2.1.220`.** La versión fijada `2.1.220` completó tres escenarios aislados mediante Devin CLI
> `3000.2.17` y el modelo `swe-1-7-lightning`; esa ejecución final en vivo demostró turnos de `Read`,
> `Edit` y `Bash` controlados por el cliente, resultados satisfactorios de `npm test`, detección de
> comandos y habilidades del proyecto, enrutamiento exclusivo a Devin y cero tráfico saliente hacia Claude. Después, la versión fijada se actualizó a `2.1.258`
> (la generación de la CLI que suplanta la identidad de Claude de OmniRoute y la primera línea que incluye
> de forma nativa el nivel Fable 5.1). Con la nueva versión fijada, se verificaron la capa de instalación y
> `claude --version` en la imagen base fijada, y pasan correctamente el conjunto de pruebas unitarias del puente, `compose config` y la
> prueba de aislamiento estática; sin embargo, el escenario simulado sin conexión y el conjunto de tres escenarios
> en vivo todavía no se han vuelto a ejecutar. Vuelva a ejecutarlos (consulte «Actualización de herramientas fijadas») antes de confiar en
> el puente con esta versión fijada.

## Arquitectura

```text
Claude Code 2.1.258 (contenedor Linux aislado sin privilegios de root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (proveedor con formato Claude y sin autenticación)
  -> devin acp --agent-type summarizer (ACP stdio oficial, sin herramientas de Devin)
  -> Cuenta de Devin en el volumen dedicado devin-auth
```

El agente ACP predeterminado de la CLI oficial puede ejecutar sus propias herramientas, por lo que este puente no lo
utiliza. Inicia el agente ACP fijo `summarizer`, cuyo modo de CLI oficial no dispone de herramientas, y
estructura la solicitud serializada de Anthropic como una traza de ejecución. Cuando se necesita otra
acción controlada por Claude, la respuesta debe contener exactamente un sobre de herramienta del cliente. Cualquier
`tool_call` o `tool_call_update` de ACP se rechaza antes de que una respuesta pueda considerarse
satisfactoria.

El serializador de `open-sse/executors/devin-agentic/serializer.ts` conserva `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` y las
herramientas proporcionadas por Claude Code. Las imágenes y los bloques desconocidos generan un error explícito. Los resultados de herramientas
de gran tamaño utilizan un marcador de truncamiento visible.

El analizador acepta un sobre independiente `<tool>{...}</tool>` por turno del modelo. Comprueba
el nombre con la lista de herramientas de la solicitud, valida los argumentos con el JSON
Schema de esa herramienta, rechaza la combinación de narrativa y acciones, y permite un intento acotado de corrección. A continuación,
Claude Code ejecuta localmente el `tool_use` de Anthropic resultante y devuelve el `tool_result` a través de
OmniRoute.

## Aislamiento y modelo de amenazas

La instalación, la cuenta y la configuración de Claude del host están fuera del alcance y se consideran
prohibidas. Los servicios de Compose:

- se ejecutan con UID/GID `10001:10001`, con un sistema de archivos raíz de solo lectura, capacidades eliminadas y
  `no-new-privileges`;
- utilizan un `/home/bridge` privado, un volumen dedicado para la configuración de Claude, datos aislados de OmniRoute
  y un volumen independiente `devin-auth`;
- montan únicamente espacios de trabajo y evidencias desechables de `.sandbox`;
- no montan el directorio principal del host, Keychain, SSH, credenciales de servicios en la nube ni el socket de Docker;
- crean entornos explícitos y eliminan las variables de API/OAuth/enrutamiento de Anthropic;
- dirigen la inferencia de Claude Code únicamente a `http://omniroute:20128` con una clave exclusivamente local.

El perfil sin conexión utiliza una red interna. En el perfil en vivo, OmniRoute accede a los
endpoints oficiales de Devin únicamente a través de `network-guard`; se deniegan los destinos no relacionados.
Claude Code tiene una protección de tráfico saliente independiente que lo deniega todo y solo puede acceder al servicio local
OmniRoute mediante `NO_PROXY`. Los archivos de auditoría de la protección solo están montados por su proceso de protección. Los
scripts verifican la propiedad de los archivos, el modo, el número de enlaces y cada decisión antes de exportar
evidencias sin tokens.

Ejecute la prueba de aislamiento de forma independiente:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Valida la topología, los montajes con nombre, la configuración sin privilegios de root y de solo lectura, el enrutamiento local
explícito, la ausencia de variables de entorno sensibles, la ausencia del socket de Docker, el acceso bloqueado a
`api.anthropic.com` y `claude.ai`, la selección exclusiva de Devin como proveedor y el fallo explícito cuando
el backend ACP no está disponible.

## Configuración inicial y uso normal

Construya la imagen fijada:

```bash
./scripts/devin-bridge/build
```

Autentique únicamente el volumen aislado de Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

El comando de inicio de sesión utiliza el flujo oficial de token manual destinado a entornos
remotos o en contenedores. El valor se introduce directamente en el indicador de la CLI; no se pasa como
argumento de proceso, no se escribe en Git ni se copia desde el host.

Inicie el entorno de ejecución aislado de Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` vuelve a comprobar el aislamiento, la autenticación de Devin y el descubrimiento de modelos antes de iniciar
Claude Code en contenedor. Nunca ejecuta el ejecutable de Claude del host. Los alias de modelos se pueden
establecer en `.env.devin-bridge`; cada valor configurado debe conservar el prefijo
`devin-cli-agentic/`.

## Comandos de validación

La ruta reproducible sin conexión no requiere ninguna cuenta de Devin ni acceso a Internet durante la ejecución:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

La ruta en vivo autenticada y opcional es:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

El ejecutor en vivo espera entre escenarios para evitar abrir sesiones ACP en ráfaga y
valida los eventos estructurados del flujo de Claude en lugar de confiar en afirmaciones textuales. Sus tres
escenarios demuestran:

1. lecturas directas del proyecto y análisis de defectos;
2. una operación `Edit` real, un `Bash` `npm test` controlado por el cliente y un resultado final;
3. `/bridge-check` junto con el descubrimiento de `bridge-proof`, lecturas del proyecto, otra ejecución correcta de
   `npm test` controlada por el cliente y la finalización sin trabajo pendiente.

La verificación final también comprueba la auditoría de red de Devin y exige que la auditoría de salida de Claude
permanezca vacía.

## Actualización de las herramientas fijadas

La imagen fija las versiones de Node, Claude Code y Devin CLI en
`docker/devin-bridge/Dockerfile`. Para actualizar:

1. cambie las versiones explícitas;
2. reemplace ambas sumas de comprobación del archivo de Devin específicas de cada arquitectura por los valores del artefacto
   oficial;
3. vuelva a construir y ejecute todos los comandos de validación sin conexión;
4. confirme las versiones dentro de la imagen;
5. vuelva a ejecutar el conjunto autenticado de tres escenarios en vivo.

No instale ninguna de las dos CLI globalmente en el host ni reemplace la verificación de sumas de comprobación por una
descarga sin verificar.

## Diagnóstico y limpieza

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  muestra el enrutamiento local y los errores saneados del ejecutor.
- `.sandbox/evidence/mock-acp.jsonl` registra acciones ACP simuladas y deterministas.
- `.sandbox/evidence/claude-stream.jsonl` registra la ejecución real sin conexión de Claude Code.
- `.sandbox/evidence/live-*.jsonl` registra los tres flujos en vivo validados.
- `.sandbox/evidence/egress.jsonl` y `.sandbox/evidence/claude-egress.jsonl` son copias validadas,
  sin tokens, de las auditorías de protección.

Detenga los contenedores y las redes propios, conservando los volúmenes de inicio de sesión y configuración:

```bash
./scripts/devin-bridge/clean
```

Elimine todo el entorno perteneciente al puente, incluidos los volúmenes con nombre:

```bash
./scripts/devin-bridge/clean --all
```

## Limitaciones

- El puente depende del rol fijo sin herramientas `summarizer` porque Devin CLI `3000.2.17`
  no expone un agente ACP neutral sin herramientas. El adaptador compensa las respuestas
  intermedias con formato de resumen, pero una reparación acotada aún puede fallar explícitamente.
- Las llamadas ACP en vivo pueden devolver respuestas transitorias `502`/`504`. El entorno de pruebas
  espacia los escenarios; los fallos persistentes mantienen el cierre seguro y nunca seleccionan otro proveedor.
- El contexto ACP se reconstruye a partir de cada solicitud de Anthropic; no hay afinidad
  de proceso ni de sesión.
- Se admite una llamada a herramienta por respuesta del modelo; las llamadas paralelas se rechazan.
- Las imágenes no se admiten explícitamente. No se anuncian capacidades de visión, salida de razonamiento,
  controles de esfuerzo ni una ventana de contexto de 1M.
- SSE utiliza eventos válidos del ciclo de vida de Anthropic, pero se emite después de recopilar
  el turno ACP acotado; los fragmentos ACP no se reenvían de forma incremental.
